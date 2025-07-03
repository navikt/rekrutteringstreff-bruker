'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import useSWR from 'swr';
import { z } from 'zod';
import {mockBaseRekrutteringstreff} from "@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffMock";
import Errors from "undici-types/errors";
import ResponseStatusCodeError = Errors.ResponseStatusCodeError;

const enkeltRekrutteringstreffEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/${rekrutteringstreffId}`;

const enkeltRekrutteringstreffSchema = z.object({
  id: z.string().nullable(),
  tittel: z.string().nullable(),
  beskrivelse: z.string().nullable(),
  fraTid: z.string().nullable(),
  tilTid: z.string().nullable(),
  sted: z.string().nullable(),
});

export type EnkeltRekrutteringstreffDTO = z.infer<
  typeof enkeltRekrutteringstreffSchema
>;

export const useEnkeltRekrutteringstreff = (
  rekrutteringstreffId?: string | null,
) => {

  try {
    return useSWR(
        rekrutteringstreffId ? enkeltRekrutteringstreffEndepunkt(rekrutteringstreffId) : null,
        getAPIwithSchema(enkeltRekrutteringstreffSchema),
    );
  } catch (e) {
    if (e instanceof ResponseStatusCodeError && e.statusCode === 401) {
      const loginUrl = process.env.LOGIN_URL;
      window.location.href = `${loginUrl}?redirect=${
          window.location.pathname
      }`;
    }
    throw e;
  }
}


export const rekrutteringstreffMirage = (server: any) => {
  server.get(enkeltRekrutteringstreffEndepunkt('*'), () =>  mockBaseRekrutteringstreff)
};
