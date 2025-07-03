import { faker } from '@faker-js/faker/locale/nb_NO';
import {EnkeltRekrutteringstreffDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";

const createMockRekrutteringstreff = (): EnkeltRekrutteringstreffDTO => {
  return {
    id: faker.number.int({min: 100000, max: 999999}).toString(),
    tittel: faker.lorem.sentence(),
    beskrivelse: faker.lorem.paragraph(),
    fraTid: faker.date.past().toISOString(),
    tilTid: faker.date.past().toISOString(),
    sted: faker.location.streetAddress(),
  }
};

export const mockBaseRekrutteringstreff = createMockRekrutteringstreff();
