'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { erForventetApiFeil, getAPIwithSchema } from '../fetcher';
import { opprettSWRFeilhåndtering } from '@/app/util/swrFeilhåndtering';
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
      ...opprettSWRFeilhåndtering({
        funksjon: 'useEnkeltRekrutteringstreffSvar',
        loginUrl,
      }),
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
