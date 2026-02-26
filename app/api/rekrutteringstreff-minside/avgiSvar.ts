'use client';

import { RekrutteringstreffMinSide } from '../api-routes';
import { putApi } from '../fetcher';
import { logger } from '@navikt/next-logger';

const avgiSvarEndepunkt = (rekrutteringstreffId: string) =>
  `${RekrutteringstreffMinSide.internUrl}/rekrutteringstreff/${rekrutteringstreffId}/svar`;

export const avgiSvar = async (
  rekrutteringstreffId: string,
  erPåmeldt: boolean,
): Promise<Response> => {
  const response = await putApi(avgiSvarEndepunkt(rekrutteringstreffId), {
    erPåmeldt,
  });
  logger.info(
    `avgiSvarEndepunkt - Svar avgitt for rekrutteringstreffId: ${rekrutteringstreffId} erPåmeldt: ${erPåmeldt} status: ${response.status}`,
  );
  return response;
};
