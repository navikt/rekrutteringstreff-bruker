'use client';


import { createServer } from 'miragejs';
import {rekrutteringstreffMirage} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";

export function makeServer({ environment = 'test' } = {}) {
  return createServer({
    environment,

    routes() {
      this.logging = true;
      rekrutteringstreffMirage(this);

      this.passthrough('*');
    },
  });
}
