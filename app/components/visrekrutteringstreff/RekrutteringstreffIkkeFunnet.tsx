'use client';

import HeadingMedBody from '@/app/components/visrekrutteringstreff/HeadingMedBody';
import { Page } from '@navikt/ds-react';

const RekrutteringstreffIkkeFunnet: React.FC = () => (
  <Page.Block as='main' width='xl' gutters>
    <HeadingMedBody heading='Rekrutteringstreff ikke funnet'>
      Dette rekrutteringstreffet finnes ikke eller er ikke lenger tilgjengelig.
    </HeadingMedBody>
  </Page.Block>
);

export default RekrutteringstreffIkkeFunnet;
