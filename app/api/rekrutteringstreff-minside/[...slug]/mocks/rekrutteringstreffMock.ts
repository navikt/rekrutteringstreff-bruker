import { faker } from '@faker-js/faker/locale/nb_NO';
import {EnkeltRekrutteringstreffDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";

const createMockRekrutteringstreff = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.between({
    from: faker.date.recent({days: 10}),
    to: faker.date.soon({days: 40})}
  );
  const tilTid = faker.date.soon({refDate: fraTid, days: 3});
  return {
    id: faker.number.int({min: 100000, max: 999999}).toString(),
    tittel: faker.lorem.sentence(),
    beskrivelse: '',
    fraTid: fraTid.toISOString(),
    tilTid: tilTid.toISOString(),
    svarfrist: faker.date.recent({refDate: fraTid, days: 3}).toISOString(),
    gateadresse: faker.location.streetAddress(),
    postnummer: faker.location.zipCode(),
    poststed: faker.location.city(),
    status: "PUBLISERT",
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

const createMockRekrutteringstreffFremITid = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.soon({days: 5});
  const tilTid = faker.date.soon({refDate: fraTid, days: 3});
  return {...createMockRekrutteringstreff(),
    fraTid: fraTid.toISOString(),
    tilTid: tilTid.toISOString(),
    svarfrist: faker.date.recent({refDate: fraTid, days: 2}).toISOString()
  }
};

const createMockRekrutteringstreffTilbakeITid = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.recent({days: 30});
  const tilTid = faker.date.soon({refDate: fraTid, days: 1});
  return {...createMockRekrutteringstreff(),
    fraTid: fraTid.toISOString(),
    tilTid: tilTid.toISOString(),
    svarfrist: faker.date.soon({refDate: fraTid, days: 2}).toISOString()
  }
};

const createMockRekrutteringstreffIGang = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.recent({days: 3});
  const tilTid = faker.date.soon({days: 2});
  return {...createMockRekrutteringstreff(),
    fraTid: fraTid.toISOString(),
    tilTid: tilTid.toISOString(),
    svarfrist: faker.date.soon({refDate: fraTid, days: 2}).toISOString()
  }
};

const createMockRekrutteringstreffAvlyst = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.soon({days: 30});
  const tilTid = faker.date.soon({refDate: fraTid, days: 3});
  return {...createMockRekrutteringstreff(),
    fraTid: fraTid.toISOString(),
    tilTid: tilTid.toISOString(),
    svarfrist: faker.date.recent({refDate: fraTid, days: 2}).toISOString(),
    status: "AVLYST",
    tittel: "test adresse",
    innlegg: [
      { tittel: "Om treffet", htmlContent: "<p>Test</p>" }
    ]
  }
};

const createMockRekrutteringstreffForskjelligFormattering = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.soon({days: 30});
  const tilTid = faker.date.soon({refDate: fraTid, days: 3});
  return {...createMockRekrutteringstreff(),
    innlegg: [
      { tittel: "Forskjellig formattering", htmlContent: "<p><strong>Bold</strong></p><p><strong><em>Italic</em></strong></p><p>Liste</p><ul><li><p>punkt 1</p></li><li><p>punkt 2</p></li></ul>Siste linje" }
    ],
  }
};

const createMockRekrutteringstreffSvarfristUtløpt = (): EnkeltRekrutteringstreffDTO => {
  const fraTid = faker.date.soon({days: 5});
  const tilTid = faker.date.soon({refDate: fraTid, days: 3});
  return {...createMockRekrutteringstreff(),
    fraTid: fraTid.toISOString(),
    tilTid: tilTid.toISOString(),
    svarfrist: faker.date.recent({days: 1}).toISOString()
  }
};

export const mockRekrutteringstreff = createMockRekrutteringstreff();
export const mockRekrutteringstreffFremITid = createMockRekrutteringstreffFremITid();
export const mockRekrutteringstreffTilbakeITid = createMockRekrutteringstreffTilbakeITid();
export const mockRekrutteringstreffIGang = createMockRekrutteringstreffIGang();
export const mockRekrutteringstreffAvlyst = createMockRekrutteringstreffAvlyst();
export const mockRekrutteringstreffForskjelligFormattering = createMockRekrutteringstreffForskjelligFormattering();
export const mockRekrutteringstreffSvarfristUtløpt = createMockRekrutteringstreffSvarfristUtløpt();







