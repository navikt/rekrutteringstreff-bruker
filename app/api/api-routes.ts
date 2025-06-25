import { getCluster } from '../util';

const gcp = getCluster();

export interface Iroute {
  api_route: string;
  api_url: string;
  internUrl: string;
  audience: string;
}

export const RekrutteringstreffMinSide: Iroute = {
  api_route: '/api',
  api_url: process.env.REKRUTTERINGSTREFF_MINSIDE_API ?? '',
  internUrl: '/api/rekrutteringstreff-minside',
  audience: `${gcp}:toi:rekrutteringstreff-minside-api`,
};
