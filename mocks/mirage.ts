'use client';


import { createServer } from 'miragejs';
import {rekrutteringstreffMirage} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import {rekrutteringstreffSvarMirage} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreffSvar";

export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,

    routes() {
      this.logging = true;
      rekrutteringstreffMirage(this);
      rekrutteringstreffSvarMirage(this);

      this.passthrough('*');
    },
  });
}
