import { getCluster } from '../util';

const gcp = getCluster();

export interface Iroute {
  api_route: string;
  api_url: string;
  internUrl: string;
  internUrlWithoutBaseUrl: string;
  audience: string;
}

export const RekrutteringstreffMinSide: Iroute = {
  api_route: '/api',
  api_url: process.env.REKRUTTERINGSTREFF_MINSIDE_API ?? '',
  internUrl: '/rekrutteringstreff/api/rekrutteringstreff-minside',
  internUrlWithoutBaseUrl: '/api/rekrutteringstreff-minside',
  audience: `${gcp}:toi:rekrutteringstreff-minside-api`,
};
