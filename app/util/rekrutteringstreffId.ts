import { mockIder } from '@/app/mocks/mockRekrutteringstreff';
import { isLocal } from '@/app/util';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const erGyldigRekrutteringstreffId = (id: string): boolean =>
  UUID_REGEX.test(id) || (isLocal && mockIder.includes(id));
