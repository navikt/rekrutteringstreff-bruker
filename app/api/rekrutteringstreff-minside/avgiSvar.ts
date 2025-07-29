'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import {putApi} from '../fetcher';
import {
    mockBaseRekrutteringstreffPostSvar
} from "@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffSvarPostMock";

const avgiSvarEndepunkt = `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/svar`;


export const avgiSvar = async (
    rekrutteringstreffId: string, erPåmeldt: boolean
): Promise<Response> => {
    return await putApi(avgiSvarEndepunkt, {rekrutteringstreffId, erPåmeldt});
}

export const avgiSvarMirage = (server: any) => {
  server.post(avgiSvarEndepunkt, () =>  mockBaseRekrutteringstreffPostSvar)
};
