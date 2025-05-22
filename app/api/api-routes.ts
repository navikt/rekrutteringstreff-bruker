import { getCluster } from '../util';

const gcp = getCluster();
// const fss = getCluster(true);

export interface Iroute {
  api_route: string;
  api_url: string;
  internUrl: string;
  scope: string;
}

export const RekrutteringstreffMinSide: Iroute = {
  api_route: '/api',
  api_url: process.env.REKRUTTERINGSTREFF_MINSIDE_API ?? '',
  internUrl: '/api/rekrutteringstreff-minside',
  scope: `${gcp}:toi:rekrutteringstreff-minside-api`,
};
