export const mockRekrutteringstreff = [
  { id: 'frem-i-tid', beskrivelse: 'Publisert, frem i tid' },
  { id: 'i-gang', beskrivelse: 'Pågående nå' },
  { id: 'tilbake-i-tid', beskrivelse: 'Ferdig (tilbake i tid)' },
  { id: 'avlyst', beskrivelse: 'Avlyst' },
  { id: 'formattering', beskrivelse: 'Forskjellig HTML-formattering' },
  { id: 'ikke-funnet', beskrivelse: '404 – ikke funnet' },
  { id: 'svarfrist-utlopt', beskrivelse: 'Svarfrist utløpt' },
  { id: 'utkast', beskrivelse: 'Status: UTKAST' },
  { id: 'publisert', beskrivelse: 'Status: PUBLISERT' },
  { id: 'fullfort', beskrivelse: 'Status: FULLFØRT' },
  { id: 'slettet', beskrivelse: 'Status: SLETTET' },
  { id: 'har-svart-ja', beskrivelse: 'Har svart ja (frem i tid)' },
  { id: 'har-svart-nei', beskrivelse: 'Har svart nei (frem i tid)' },
  { id: 'ikke-invitert', beskrivelse: 'Ikke invitert (frem i tid)' },
  { id: 'uten-svarfrist', beskrivelse: 'Svarfrist mangler' },
];

export const mockIder = mockRekrutteringstreff.map(({ id }) => id);
