import { faker } from '@faker-js/faker/locale/nb_NO';
import {EnkeltRekrutteringstreffDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";

const createMockRekrutteringstreff = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.future();
  const tilTid = faker.date.future({refDate: fraTid});
  return {
    id: faker.number.int({min: 100000, max: 999999}).toString(),
    tittel: faker.lorem.sentence(),
    beskrivelse: '',
    fraTid: fraTid.toISOString(),
    tilTid: tilTid.toISOString(),
    svarfrist: faker.date.between({from: fraTid, to: tilTid}).toString(),
    gateadresse: faker.location.streetAddress(),
    postnummer: faker.location.zipCode(),
    poststed: faker.location.city(),
    status: "Publisert",
    innlegg: Array.from({length: faker.number.int({min: 1, max: 4})}, () => ({
      tittel: faker.lorem.sentence(),
      htmlContent: `<p>${faker.lorem.paragraphs(2)}</p><p>${faker.lorem.paragraphs(2)}</p>`,
    })),
    arbeidsgivere: Array.from({length: faker.number.int({min: 1, max: 4})}, () => ({
      organisasjonsnummer: faker.number.int({min: 10000000000, max: 99999999999}).toString(),
      navn: faker.company.name(),
    })),
  }
};

export const mockBaseRekrutteringstreff = createMockRekrutteringstreff();
