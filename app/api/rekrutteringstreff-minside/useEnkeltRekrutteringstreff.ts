'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import useSWR from 'swr';
import { z } from 'zod';
import {mockBaseRekrutteringstreff} from "@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffMock";

const enkeltRekrutteringstreffEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/${rekrutteringstreffId}`;

const enkeltRekrutteringstreffSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string().nullable(),
  fraTid: z.string().nullable(),
  tilTid: z.string().nullable(),
  svarfrist: z.string().nullable(),
  gateadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  poststed: z.string().nullable(),
  status: z.string(),
});

export type EnkeltRekrutteringstreffDTO = z.infer<
  typeof enkeltRekrutteringstreffSchema
>;

export const useEnkeltRekrutteringstreff = (
  rekrutteringstreffId: string,
) => {

  try {
    return useSWR(
        rekrutteringstreffId ? enkeltRekrutteringstreffEndepunkt(rekrutteringstreffId) : null,
        getAPIwithSchema(enkeltRekrutteringstreffSchema),
    );
  } catch (e) {
    if (e instanceof Response && e.status === 401) {
      const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
      window.location.href = `${loginUrl}?redirect=${window.location.origin}/rekrutteringstreff/${rekrutteringstreffId}`;
    }
    throw e;
  }
}


export const rekrutteringstreffMirage = (server: any) => {
  server.get(enkeltRekrutteringstreffEndepunkt('*'), () =>  mockBaseRekrutteringstreff)
};
