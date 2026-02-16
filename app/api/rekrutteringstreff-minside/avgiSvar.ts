'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import {putApi} from '../fetcher';
import {
    mockBaseRekrutteringstreffPostSvar
} from "@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffSvarPostMock";
import {logger} from "@navikt/next-logger";

const avgiSvarEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/${rekrutteringstreffId}/svar`;

export const avgiSvar = async (
    rekrutteringstreffId: string, erPåmeldt: boolean
): Promise<Response> => {
    const response = await putApi(avgiSvarEndepunkt(rekrutteringstreffId), {erPåmeldt});
    if (!response.ok) {
        logger.info("avgiSvarEndepunkt - Feil ved avgi svar: ${response.status} ${response.statusText}");
        throw new Error(`Feil ved avgi svar: ${response.status} ${response.statusText}`);
    }
    logger.info("avgiSvarEndepunkt - Svar avgitt for rekrutteringstreffId: ", rekrutteringstreffId, "erPåmeldt: ", erPåmeldt);
    return response;
}

export const avgiSvarMirage = (server: any) => {
  server.put(avgiSvarEndepunkt('*'), () =>  mockBaseRekrutteringstreffPostSvar)
};
