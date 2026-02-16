import { isLocal } from '../util';
import { Iroute } from './api-routes';
import { logger } from '@navikt/next-logger';
import {getToken, requestTokenxOboToken, TokenResult} from '@navikt/oasis';
import { NextResponse } from 'next/server';

export const proxyWithOBO = async (
  proxy: Iroute,
  req: Request,
  customRoute?: string,
) => {
  const token = isLocal ? 'DEV' : getToken(req.headers);

  if (!proxy.api_url) {
    return NextResponse.json(
      { beskrivelse: 'Ingen url oppgitt for proxy' },
      { status: 500 },
    );
  }
  if (!token) {
    logger.info('Kunne ikke hente token, redirect til login');
    logger.info('Login URL:' + process.env.NEXT_PUBLIC_LOGIN_URL);

    return NextResponse.json(
      { beskrivelse: 'Kunne ikke hente token' },
      { status: 401 },
    );
  }

  let obo: TokenResult;
  try {
    obo = isLocal
      ? ({ ok: true, token: 'DEV' } as TokenResult)
      : await requestTokenxOboToken(token, proxy.audience);
  } catch (error) {
    logger.error('Feil ved henting av OBO-token:', error);
    return NextResponse.json(
      { beskrivelse: 'Kunne ikke hente OBO-token' },
      { status: 500 },
    );
  }

  if (!obo.ok) {
    logger.error('Ugyldig OBO-token mottatt:', obo.error);
    return NextResponse.json(
      { beskrivelse: 'Ugyldig OBO-token mottatt' },
      { status: 500 },
    );
  }
  if (!obo.token) {
    logger.error('Ingen OBO-token mottatt:', obo);
    return NextResponse.json(
      { beskrivelse: 'Ingen OBO-token mottatt' },
      { status: 500 },
    );
  }
  const originalUrl = new URL(req.url);
  const path =
    proxy.api_route + originalUrl.pathname.replace(proxy.internUrlWithoutBaseUrl, '');
  const newUrl = customRoute
    ? proxy.api_url + customRoute
    : `${proxy.api_url}${path}${originalUrl.search}`;

  const requestUrl = isLocal ? originalUrl : newUrl;

  try {
    const originalHeaders = new Headers(req.headers);
    originalHeaders.set('Authorization', `Bearer ${obo.token}`);
    originalHeaders.set('Content-Type', 'application/json');

    const fetchOptions: RequestInit = {
      method: req.method,
      headers: originalHeaders,
    };

    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await new Response(req.body).json();
      if (body) {
        fetchOptions.body = JSON.stringify(body);
      }
    }

    const response = await fetch(requestUrl, fetchOptions);

    if (response.status == 404) {
       return NextResponse.json(
          { beskrivelse: 'Ikke funnet' },
        {
          status: 404,
        },
      );
    }

    if (!response.ok) {
      const { status, statusText, url, body, ok, headers } = response;
      logger.error(
        {
          headers,
          status,
          statusText,
          url,
          tilUrl: requestUrl,
          fraUrl: originalUrl,
          body,
          ok,
        },
        'Responsen er ikke OK i proxy',
      );

      return NextResponse.json(
          {beskrivelse: 'Feil i proxy'},
          {
            status: response.status,
          },
      );
    }

    const contentType = response.headers.get('Content-Type');
    const responseText = await response.text();

    //workaround da backend av og til returnerer application/json selv om det ikke er respons.
    if (
      contentType &&
      contentType.includes('application/json') &&
      responseText
    ) {
      const data = JSON.parse(responseText);
      return NextResponse.json(data);
    } else if (!responseText) {
      return NextResponse.json({
        status: response.status,
        message: 'No content',
      });
    }
    return NextResponse.json({
      status: response.status,
      message: 'Non-JSON content received',
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(
        error,
        `Feil ved proxying av forespørselen til url: ${requestUrl} fra url: ${originalUrl}`,
      );
    } else {
      logger.error(
        { msg: 'Unknown error', error },
        `Feil ved proxying av forespørselen til url: ${requestUrl} fra url: ${originalUrl}`,
      );
    }
    return NextResponse.json(
      { beskrivelse: error instanceof Error ? error.message : 'Feil i proxy' },
      {
        status: 500,
      },
    );
  }
};
