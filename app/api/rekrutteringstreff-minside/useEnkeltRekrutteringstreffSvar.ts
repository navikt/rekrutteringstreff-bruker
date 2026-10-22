'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { ApiFeil, erForventetApiFeil, getAPIwithSchema } from '../fetcher';
import { rapporterApiFeil } from '@/app/util/apm';
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
  loginUrl: string,
) => {
  return useSWR(
    rekrutteringstreffId
      ? enkeltRekrutteringstreffSvarEndepunkt(rekrutteringstreffId)
      : null,
    getAPIwithSchema(enkeltRekrutteringstreffSvarSchema),
    {
      onError: (error) => {
        // Håndter 401 ved å redirecte til login
        if (error instanceof ApiFeil && error.status === 401) {
          window.location.href = `${loginUrl}?redirect=${window.location.origin}/rekrutteringstreff/${rekrutteringstreffId}`;
        }
        // 404 og andre feil vil bli tilgjengelig via result.error
        if (erForventetApiFeil(error)) return;
        if (error instanceof ApiFeil) {
          rapporterApiFeil(error.status, error.url);
          logger.error(
            { err: error, status: error.status, url: error.url },
            'useEnkeltRekrutteringstreffSvar error: ',
          );
          return;
        }
        logger.error(error, 'useEnkeltRekrutteringstreffSvar error: ');
      },
      shouldRetryOnError: (error) => {
        if (erForventetApiFeil(error)) {
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
