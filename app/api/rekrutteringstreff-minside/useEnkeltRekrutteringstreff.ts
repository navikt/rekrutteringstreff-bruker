'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import useSWR from 'swr';
import { z } from 'zod';

const enkeltRekrutteringstreffEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/${rekrutteringstreffId}`;

const enkeltRekrutteringstreffSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string().nullable(),
  fraTid: z.null().nullable(),
  tilTid: z.null().nullable(),
  sted: z.null().nullable(),
});

export type EnkeltRekrutteringstreffDTO = z.infer<
  typeof enkeltRekrutteringstreffSchema
>;

export const useEnkeltRekrutteringstreff = (
  rekrutteringstreffId?: string | null,
) =>
  useSWR(
    rekrutteringstreffId
      ? enkeltRekrutteringstreffEndepunkt(rekrutteringstreffId)
      : null,
    getAPIwithSchema(enkeltRekrutteringstreffSchema),
  );
