'use client';

import { mockRekrutteringstreff } from '@/app/mocks/mockRekrutteringstreff';
import { isLocal } from '@/app/util';
import { Link as AkselLink, Heading, Page } from '@navikt/ds-react';
import { redirect } from 'next/navigation';

export default function MockOversikt() {
  if (!isLocal) {
    redirect('/rekrutteringstreff');
  }

  return (
    <Page className='min-w-1'>
      <Page.Block width='xl' gutters>
        <Heading size='large' className='mb-6'>
          Mock-oversikt
        </Heading>
        <ul className='flex flex-col gap-3'>
          {mockRekrutteringstreff.map(({ id, beskrivelse }) => (
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
