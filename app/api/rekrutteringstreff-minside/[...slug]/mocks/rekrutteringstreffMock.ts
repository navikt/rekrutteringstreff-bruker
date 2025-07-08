import { faker } from '@faker-js/faker/locale/nb_NO';
import {EnkeltRekrutteringstreffDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";

const createMockRekrutteringstreff = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.future();
  const tilTid = faker.date.future({refDate: fraTid});
  return {
    id: faker.number.int({min: 100000, max: 999999}).toString(),
    tittel: faker.lorem.sentence(),
    beskrivelse: faker.lorem.paragraph(),
    fraTid: fraTid.toISOString(),
    tilTid: tilTid.toISOString(),
    sted: faker.location.streetAddress(),
  }
};

export const mockBaseRekrutteringstreff = createMockRekrutteringstreff();
