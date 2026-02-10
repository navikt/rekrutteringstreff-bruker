'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import useSWR from 'swr';
import { z } from 'zod';
import {
  mockRekrutteringstreff,
  mockRekrutteringstreffAvlyst,
  mockRekrutteringstreffForskjelligFormattering,
  mockRekrutteringstreffFremITid,
  mockRekrutteringstreffIGang,
  mockRekrutteringstreffTilbakeITid,
} from '@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffMock';
import {Response as MiragejsResponse} from "miragejs";
import {logger} from "@navikt/next-logger";

const enkeltRekrutteringstreffEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/${rekrutteringstreffId}`;

const ArbeidsgiverSchema = z.object({
  organisasjonsnummer: z.string(),
  navn: z.string(),
});

const InnleggSchema = z.object({
  tittel: z.string(),
  htmlContent: z.string(),
});

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
  innlegg: z.array(InnleggSchema),
  arbeidsgivere: z.array(ArbeidsgiverSchema),
});

export type EnkeltRekrutteringstreffDTO = z.infer<
  typeof enkeltRekrutteringstreffSchema
>;

export type ArbeidsgiverDTO = z.infer<
  typeof ArbeidsgiverSchema
>;

export type InnleggDTO = z.infer<
  typeof InnleggSchema
>;

export const useEnkeltRekrutteringstreff = (
  rekrutteringstreffId: string,
) => {
  const result = useSWR(
    rekrutteringstreffId ? enkeltRekrutteringstreffEndepunkt(rekrutteringstreffId) : null,
    getAPIwithSchema(enkeltRekrutteringstreffSchema),
    {
      onError: (error) => {
        // Håndter 401 ved å redirecte til login
        if (error instanceof Response && error.status == 401) {
          const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL;
          window.location.href = `${loginUrl}?redirect=${window.location.origin}/rekrutteringstreff/${rekrutteringstreffId}`;
        }
        // 404 og andre feil vil bli tilgjengelig via result.error
        logger.error("useEnkeltRekrutteringstreff error: ", JSON.stringify(error))
      },
    }
  );

  return result;
}

export const rekrutteringstreffMirage = (server: any) => {
  server.get(enkeltRekrutteringstreffEndepunkt('2'), () => mockRekrutteringstreffFremITid);
  server.get(enkeltRekrutteringstreffEndepunkt('3'), () => mockRekrutteringstreffFremITid);
  server.get(enkeltRekrutteringstreffEndepunkt('4'), () => mockRekrutteringstreffFremITid);
  server.get(enkeltRekrutteringstreffEndepunkt('5'), () => mockRekrutteringstreffFremITid);
  server.get(enkeltRekrutteringstreffEndepunkt('6'), () => mockRekrutteringstreffIGang);
  server.get(enkeltRekrutteringstreffEndepunkt('7'), () => mockRekrutteringstreffTilbakeITid);
  server.get(enkeltRekrutteringstreffEndepunkt('8'), () => mockRekrutteringstreffAvlyst);
  server.get(enkeltRekrutteringstreffEndepunkt('9'), () => mockRekrutteringstreffForskjelligFormattering);
  server.get(enkeltRekrutteringstreffEndepunkt('10'), () => { return new MiragejsResponse(404)});
  server.get(enkeltRekrutteringstreffEndepunkt('*'), () => mockRekrutteringstreff);
};
