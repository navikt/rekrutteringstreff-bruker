import { isLocal } from '../util';
import { getToken, requestOboToken, TokenResult } from '@navikt/oasis';

interface hentOboTokenProps {
  headers: Headers;
  scope: string;
}

export const hentOboToken = async (
  props: hentOboTokenProps,
): Promise<TokenResult> => {
  const token = isLocal ? 'DEV' : getToken(props.headers);
  if (!token) {
    return {
      ok: false,
      error: new Error('Kunne ikke hente token'),
    };
  }
  let obo: TokenResult;
  try {
    obo = isLocal
      ? ({ ok: true, token: 'DEV' } as TokenResult)
      : await requestOboToken(token, props.scope);

    if (!obo.ok || !obo.token) {
      return {
        ok: false,
        error: new Error('Ugyldig OBO-token mottatt'),
      };
    }

    return obo;
  } catch {
    return {
      ok: false,
      error: new Error('Kunne ikke hente OBO-token'),
    };
  }
};

interface setHeaderTokenProps {
  headers: Headers;
  oboToken: string;
}

export const setHeaderToken = ({
  headers,
  oboToken,
}: setHeaderTokenProps): Headers => {
  const originalHeaders = new Headers(headers);
  originalHeaders.set('Authorization', `Bearer ${oboToken}`);
  originalHeaders.set('Content-Type', 'application/json');

  // Filter out AMP_ cookies
  const cookie = originalHeaders.get('cookie');
  if (cookie) {
    const filteredCookies = cookie
      .split(';')
      .filter((c) => !c.trim().startsWith('AMP_'))
      .join(';');
    if (filteredCookies) {
      originalHeaders.set('cookie', filteredCookies);
    } else {
      originalHeaders.delete('cookie');
    }
  }
  return originalHeaders;
};
