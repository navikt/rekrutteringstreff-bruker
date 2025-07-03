'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import useSWR from 'swr';
import { z } from 'zod';
import {mockBaseRekrutteringstreff} from "@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffMock";

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
) =>
  useSWR(
    rekrutteringstreffId ? enkeltRekrutteringstreffEndepunkt(rekrutteringstreffId) : null,
    getAPIwithSchema(enkeltRekrutteringstreffSchema),
  );

export const rekrutteringstreffMirage = (server: any) => {
  server.get(enkeltRekrutteringstreffEndepunkt('*'), () =>  mockBaseRekrutteringstreff)
};
