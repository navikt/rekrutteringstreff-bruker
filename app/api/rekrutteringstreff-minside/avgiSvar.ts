'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import {postApi} from '../fetcher';
import {
    mockBaseRekrutteringstreffPostSvar
} from "@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffSvarPostMock";

const avgiSvarEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/${rekrutteringstreffId}/svar`;


export const avgiSvar = async (
    rekrutteringstreffId: string, erPåmeldt: boolean
): Promise<Response> => {
    return await postApi(avgiSvarEndepunkt(rekrutteringstreffId), {erPåmeldt});
}

export const avgiSvarMirage = (server: any) => {
  server.post(avgiSvarEndepunkt('*'), () =>  mockBaseRekrutteringstreffPostSvar)
};
