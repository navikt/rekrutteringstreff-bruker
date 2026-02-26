import {
  mockRekrutteringstreff,
  mockRekrutteringstreffAvlyst,
  mockRekrutteringstreffForskjelligFormattering,
  mockRekrutteringstreffFremITid,
  mockRekrutteringstreffFullført,
  mockRekrutteringstreffIGang,
  mockRekrutteringstreffPublisert,
  mockRekrutteringstreffSlettet,
  mockRekrutteringstreffSvarfristUtløpt,
  mockRekrutteringstreffTilbakeITid,
  mockRekrutteringstreffUtkast,
} from '@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffMock';
import {
  mockBaseRekrutteringstreffSvar,
  mockBaseRekrutteringstreffSvarErInvitertOgIkkeSvart,
  mockBaseRekrutteringstreffSvarHarSvartJa,
  mockBaseRekrutteringstreffSvarHarSvartNei,
  mockBaseRekrutteringstreffSvarIkkeInvitert,
} from '@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffSvarMock';
import { mockBaseRekrutteringstreffPostSvar } from '@/app/api/rekrutteringstreff-minside/[...slug]/mocks/rekrutteringstreffSvarPostMock';
import { http, HttpResponse } from 'msw';

const baseUrl = '/rekrutteringstreff/api/rekrutteringstreff-minside';

const rekrutteringstreffUrl = (id: string) =>
  `${baseUrl}/rekrutteringstreff/${id}`;
const svarUrl = (id: string) => `${baseUrl}/rekrutteringstreff/${id}/svar`;

export const handlers = [
  // Rekrutteringstreff
  http.get(rekrutteringstreffUrl('frem-i-tid'), () =>
    HttpResponse.json(mockRekrutteringstreffFremITid),
  ),
  http.get(rekrutteringstreffUrl('i-gang'), () =>
    HttpResponse.json(mockRekrutteringstreffIGang),
  ),
  http.get(rekrutteringstreffUrl('tilbake-i-tid'), () =>
    HttpResponse.json(mockRekrutteringstreffTilbakeITid),
  ),
  http.get(rekrutteringstreffUrl('avlyst'), () =>
    HttpResponse.json(mockRekrutteringstreffAvlyst),
  ),
  http.get(rekrutteringstreffUrl('formattering'), () =>
    HttpResponse.json(mockRekrutteringstreffForskjelligFormattering),
  ),
  http.get(
    rekrutteringstreffUrl('ikke-funnet'),
    () => new HttpResponse(null, { status: 404 }),
  ),
  http.get(rekrutteringstreffUrl('svarfrist-utlopt'), () =>
    HttpResponse.json(mockRekrutteringstreffSvarfristUtløpt),
  ),
  http.get(rekrutteringstreffUrl('utkast'), () =>
    HttpResponse.json(mockRekrutteringstreffUtkast),
  ),
  http.get(rekrutteringstreffUrl('publisert'), () =>
    HttpResponse.json(mockRekrutteringstreffPublisert),
  ),
  http.get(rekrutteringstreffUrl('fullfort'), () =>
    HttpResponse.json(mockRekrutteringstreffFullført),
  ),
  http.get(rekrutteringstreffUrl('slettet'), () =>
    HttpResponse.json(mockRekrutteringstreffSlettet),
  ),
  http.get(rekrutteringstreffUrl('har-svart-ja'), () =>
    HttpResponse.json(mockRekrutteringstreffFremITid),
  ),
  http.get(rekrutteringstreffUrl('har-svart-nei'), () =>
    HttpResponse.json(mockRekrutteringstreffFremITid),
  ),
  http.get(rekrutteringstreffUrl('ikke-invitert'), () =>
    HttpResponse.json(mockRekrutteringstreffFremITid),
  ),

  // Svar - spesifikke IDer
  http.get(svarUrl('frem-i-tid'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarErInvitertOgIkkeSvart),
  ),
  http.get(svarUrl('i-gang'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarHarSvartJa),
  ),
  http.get(svarUrl('tilbake-i-tid'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarHarSvartNei),
  ),
  http.get(svarUrl('avlyst'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarIkkeInvitert),
  ),
  http.get(
    svarUrl('ikke-funnet'),
    () => new HttpResponse(null, { status: 404 }),
  ),
  http.get(svarUrl('svarfrist-utlopt'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarErInvitertOgIkkeSvart),
  ),
  http.get(svarUrl('har-svart-ja'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarHarSvartJa),
  ),
  http.get(svarUrl('har-svart-nei'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarHarSvartNei),
  ),
  http.get(svarUrl('ikke-invitert'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarIkkeInvitert),
  ),
  http.get(svarUrl('publisert'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarErInvitertOgIkkeSvart),
  ),
  http.get(svarUrl('fullfort'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarHarSvartJa),
  ),
  http.get(svarUrl('formattering'), () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvarErInvitertOgIkkeSvart),
  ),

  // Wildcard - alle andre IDer
  http.get(`${baseUrl}/rekrutteringstreff/:id`, () =>
    HttpResponse.json(mockRekrutteringstreff),
  ),
  http.get(`${baseUrl}/rekrutteringstreff/:id/svar`, () =>
    HttpResponse.json(mockBaseRekrutteringstreffSvar),
  ),

  // PUT svar
  http.put(`${baseUrl}/rekrutteringstreff/:id/svar`, () =>
    HttpResponse.json(mockBaseRekrutteringstreffPostSvar),
  ),

  // Session (LoginHandler)
  http.get('https://login.ekstern.dev.nav.no/oauth2/session', () =>
    HttpResponse.json({ session: true, tokens: { expire_in_seconds: 3600 } }),
  ),

  // Task Analytics (NAV-dekoratøren)
  http.get(
    'https://*.nav.no/person/personopplysninger/api/kontaktinformasjon',
    () => HttpResponse.json({}),
  ),
  http.get(/\/api\/ta$/, () => HttpResponse.json([])),
  http.post(/\/api\/ta$/, () => HttpResponse.json({ ok: true })),
];
