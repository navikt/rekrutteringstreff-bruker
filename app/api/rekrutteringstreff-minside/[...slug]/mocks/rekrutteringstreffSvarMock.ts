import { faker } from '@faker-js/faker/locale/nb_NO';
import {EnkeltRekrutteringstreffSvarDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreffSvar";

const createMockRekrutteringstreffSvar = (): EnkeltRekrutteringstreffSvarDTO => {
  return {
    erInvitert: faker.datatype.boolean(),
    erPåmeldt: faker.datatype.boolean(),
    harSvart: faker.datatype.boolean(),
  }
};


const createMockRekrutteringstreffSvarErInvitertOgIkkeSvart = (): EnkeltRekrutteringstreffSvarDTO => {
  return {
    erInvitert: true,
    erPåmeldt: false,
    harSvart: false,
  }
};

const createMockRekrutteringstreffSvarHarSvart = (erPåmeldt: boolean): EnkeltRekrutteringstreffSvarDTO => {
  return {
    erInvitert: true,
    erPåmeldt: erPåmeldt,
    harSvart: true,
  }
};

const createMockRekrutteringstreffIkkeInvitert = (): EnkeltRekrutteringstreffSvarDTO => {
  return {
    erInvitert: false,
    erPåmeldt: false,
    harSvart: false,
  }
};



export const mockBaseRekrutteringstreffSvar = createMockRekrutteringstreffSvar();
export const mockBaseRekrutteringstreffSvarErInvitertOgIkkeSvart = createMockRekrutteringstreffSvarErInvitertOgIkkeSvart();
export const mockBaseRekrutteringstreffSvarIkkeInvitert = createMockRekrutteringstreffIkkeInvitert();
export const mockBaseRekrutteringstreffSvarHarSvartJa = createMockRekrutteringstreffSvarHarSvart(true);
export const mockBaseRekrutteringstreffSvarHarSvartNei = createMockRekrutteringstreffSvarHarSvart(false);
