'use client';

import { isLocal } from '@/app/util';
import { Link as AkselLink, Heading, Page } from '@navikt/ds-react';
import { redirect } from 'next/navigation';

const mocks = [
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
];

export default function MockOversikt() {
  if (!isLocal) {
    redirect('/rekrutteringstreff');
  }

  return (
    <Page className='min-w-1'>
      <Page.Block as='main' width='xl' gutters>
        <Heading size='large' className='mb-6'>
          Mock-oversikt
        </Heading>
        <ul className='flex flex-col gap-3'>
          {mocks.map(({ id, beskrivelse }) => (
            <li key={id}>
              <AkselLink href={`/rekrutteringstreff/${id}`}>{id}</AkselLink>
              {' – '}
              {beskrivelse}
            </li>
          ))}
        </ul>
      </Page.Block>
    </Page>
  );
}
