'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { logger } from '@navikt/next-logger';
import useSWR from 'swr';
import { z } from 'zod';

const enkeltRekrutteringstreffSvarEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/${rekrutteringstreffId}/svar`;

const enkeltRekrutteringstreffSvarSchema = z.object({
  erInvitert: z.boolean(),
  erPåmeldt: z.boolean(),
  harSvart: z.boolean(),
});

export type EnkeltRekrutteringstreffSvarDTO = z.infer<
  typeof enkeltRekrutteringstreffSvarSchema
>;

export const useEnkeltRekrutteringstreffSvar = (
  rekrutteringstreffId: string,
) => {
  return useSWR(
    rekrutteringstreffId
      ? enkeltRekrutteringstreffSvarEndepunkt(rekrutteringstreffId)
      : null,
    getAPIwithSchema(enkeltRekrutteringstreffSvarSchema),
    {
      onError: (error) => {
        // Håndter 401 ved å redirecte til login
        if (error instanceof Response && error.status == 401) {
          const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
          window.location.href = `${loginUrl}?redirect=${window.location.origin}/rekrutteringstreff/${rekrutteringstreffId}`;
        }
        // 404 og andre feil vil bli tilgjengelig via result.error
        logger.error('useEnkeltRekrutteringstreffSvar error: ', error);
      },
      shouldRetryOnError: (error) => {
        if (
          error instanceof Response &&
          (error.status === 404 || error.status === 401)
        ) {
          return false;
        }
        return true;
      },
      errorRetryCount: 3,
      errorRetryInterval: 15000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );
};
