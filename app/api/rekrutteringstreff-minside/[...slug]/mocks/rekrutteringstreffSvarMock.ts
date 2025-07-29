import { faker } from '@faker-js/faker/locale/nb_NO';
import {EnkeltRekrutteringstreffSvarDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreffSvar";

const createMockRekrutteringstreffSvar = (): EnkeltRekrutteringstreffSvarDTO => {
  return {
    erInvitert: faker.datatype.boolean(),
    erPåmeldt: faker.datatype.boolean(),
    harSvart: faker.datatype.boolean(),
  }
};

export const mockBaseRekrutteringstreffSvar = createMockRekrutteringstreffSvar();
