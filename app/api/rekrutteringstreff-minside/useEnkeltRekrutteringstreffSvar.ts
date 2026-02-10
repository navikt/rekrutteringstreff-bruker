'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import useSWR from 'swr';
import { z } from 'zod';
import {
  mockBaseRekrutteringstreffSvar,
  mockBaseRekrutteringstreffSvarErInvitertOgIkkeSvart,
  mockBaseRekrutteringstreffSvarHarSvartJa,
  mockBaseRekrutteringstreffSvarHarSvartNei,
  mockBaseRekrutteringstreffSvarIkkeInvitert
} from "@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffSvarMock";

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

  try {
    return useSWR(
        rekrutteringstreffId ? enkeltRekrutteringstreffSvarEndepunkt(rekrutteringstreffId) : null,
        getAPIwithSchema(enkeltRekrutteringstreffSvarSchema),
    );
  } catch (e) {
    if (e instanceof Response && e.status === 401) {
      const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
      window.location.href = `${loginUrl}?redirect=${window.location.origin}/rekrutteringstreff/${rekrutteringstreffId}`;
    }
    // 404 og andre feil vil bli tilgjengelig via result.error
  }
}

export const rekrutteringstreffSvarMirage = (server: any) => {
  server.get(enkeltRekrutteringstreffSvarEndepunkt('2'), () =>  mockBaseRekrutteringstreffSvarErInvitertOgIkkeSvart)
  server.get(enkeltRekrutteringstreffSvarEndepunkt('3'), () =>  mockBaseRekrutteringstreffSvarHarSvartJa)
  server.get(enkeltRekrutteringstreffSvarEndepunkt('4'), () =>  mockBaseRekrutteringstreffSvarHarSvartNei)
  server.get(enkeltRekrutteringstreffSvarEndepunkt('5'), () =>  mockBaseRekrutteringstreffSvarIkkeInvitert)
  server.get(enkeltRekrutteringstreffSvarEndepunkt('*'), () =>  mockBaseRekrutteringstreffSvar)
};
