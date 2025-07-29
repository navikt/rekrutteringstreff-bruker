import { faker } from '@faker-js/faker/locale/nb_NO';

const createMockRekrutteringstreffSvar = () => {
  return {
    rekrutteringstreffId: faker.number.int({min: 100000, max: 999999}).toString(),
    erPåmeldt: faker.datatype.boolean(),
  }
};

export const mockBaseRekrutteringstreffPostSvar = createMockRekrutteringstreffSvar();
