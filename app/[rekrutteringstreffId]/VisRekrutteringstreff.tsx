'use client';

import {
  RekrutteringstreffKategori,
  useEnkeltRekrutteringstreff,
} from '@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import { useEnkeltRekrutteringstreffSvar } from '@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreffSvar';
import SWRLaster from '@/app/components/SWRLaster';
import RekrutteringstreffStatusBanner from '@/app/components/status-melding/RekrutteringstreffStatusBanner';
import Svarboks from '@/app/components/svar/Svarboks';
import ArbeidsgiverListe from '@/app/components/visrekrutteringstreff/ArbeidsgiverListe';
import HeadingMedBody from '@/app/components/visrekrutteringstreff/HeadingMedBody';
import InnleggListe from '@/app/components/visrekrutteringstreff/InnleggListe';
import Sted from '@/app/components/visrekrutteringstreff/Sted';
import Tid from '@/app/components/visrekrutteringstreff/Tid';
import { useUmami } from '@/app/providers/UmamiContext';
import { RekrutteringstreffStatus } from '@/app/types';
import { UmamiEvent } from '@/app/util/umamiEvents';
import { Heading, HGrid, Page, Show, Tabs } from '@navikt/ds-react';
import { useEffect } from 'react';

export interface VisRekrutteringstreffProps {
  rekrutteringstreffId: string;
}

const VisRekrutteringstreff: React.FC<VisRekrutteringstreffProps> = ({
  rekrutteringstreffId,
}) => {
  const enkeltRekrutteringstreffHook =
    useEnkeltRekrutteringstreff(rekrutteringstreffId);
  const enkeltRekrutteringstreffSvarHook =
    useEnkeltRekrutteringstreffSvar(rekrutteringstreffId);
  const { track } = useUmami();

  useEffect(() => {
    track(UmamiEvent.Rekrutteringstreff.vis_side_for_rektruteringstreff);
  }, [track]);

  const håndterFeil = (error: Error) => {
    if (error instanceof Response && error.status === 404) {
      return (
        <Page.Block as='main' width='xl' gutters>
          <HeadingMedBody heading='Rekrutteringstreff ikke funnet'>
            Dette rekrutteringstreffet finnes ikke eller er ikke lenger
            tilgjengelig.
          </HeadingMedBody>
        </Page.Block>
      );
    }

    return (
      <Page.Block as='main' width='xl' gutters>
        <HeadingMedBody heading='Noe gikk galt'>
          Vi klarte ikke å laste rekrutteringstreffet. Vennligst prøv igjen
          senere.
        </HeadingMedBody>
      </Page.Block>
    );
  };

  return (
    <div className='mb-8 flex items-center gap-10'>
      <SWRLaster
        hooks={[enkeltRekrutteringstreffHook, enkeltRekrutteringstreffSvarHook]}
        egenFeilmelding={håndterFeil}
      >
        {(rekrutteringstreff, enkeltRekrutteringstreffSvar) => {
          if (
            rekrutteringstreff.status === RekrutteringstreffStatus.SLETTET ||
            rekrutteringstreff.status === RekrutteringstreffStatus.UTKAST
          ) {
            return (
              <RekrutteringstreffStatusBanner
                status={rekrutteringstreff.status}
              />
            );
          }

          return (
            <Page.Block as='main' width='xl' gutters>
              <HGrid columns={{ xs: '1', lg: '65% 35%' }} gap='space-0'>
                <div>
                  <Heading size='medium' className='mb-6 mr-4'>
                    {rekrutteringstreff.tittel}
                  </Heading>
                  <HGrid
                    columns={{ xs: 1, lg: 2 }}
                    gap='space-24'
                    className='pb-4 text-base'
                  >
                    <Tid
                      fraTid={rekrutteringstreff.fraTid}
                      tilTid={rekrutteringstreff.tilTid}
                    />
                    <Sted
                      gateadresse={rekrutteringstreff.gateadresse}
                      postnummer={rekrutteringstreff.postnummer}
                      poststed={rekrutteringstreff.poststed}
                    />
                  </HGrid>
                </div>
                <div>
                  <Svarboks
                    erInvitert={enkeltRekrutteringstreffSvar.erInvitert}
                    erPåmeldt={enkeltRekrutteringstreffSvar.erPåmeldt}
                    harSvart={enkeltRekrutteringstreffSvar.harSvart}
                    svarfrist={rekrutteringstreff.svarfrist}
                    fraTid={rekrutteringstreff.fraTid}
                    tilTid={rekrutteringstreff.tilTid}
                    status={rekrutteringstreff.status}
                    laster={
                      enkeltRekrutteringstreffSvarHook?.isLoading || false
                    }
                    rekrutteringstreffId={rekrutteringstreffId}
                    svarEndret={(svar) => {
                      enkeltRekrutteringstreffSvarHook?.mutate({
                        erInvitert: true,
                        erPåmeldt: svar,
                        harSvart: true,
                      });
                    }}
                  />
                </div>
              </HGrid>

              <Show below='lg'>
                <Tabs defaultValue='innlegg'>
                  <Tabs.List>
                    <Tabs.Tab
                      value='innlegg'
                      label={`Siste aktivitet (${rekrutteringstreff.innlegg.length})`}
                    />
                    {rekrutteringstreff.kategori !==
                      RekrutteringstreffKategori.WORKOP && (
                      <Tabs.Tab
                        value='arbeidsgivere'
                        label={`Arbeidsgivere (${rekrutteringstreff.arbeidsgivere.length})`}
                      />
                    )}
                  </Tabs.List>
                  <Tabs.Panel value='innlegg'>
                    <InnleggListe innlegg={rekrutteringstreff.innlegg} />
                  </Tabs.Panel>
                  {rekrutteringstreff.kategori !==
                    RekrutteringstreffKategori.WORKOP && (
                    <Tabs.Panel value='arbeidsgivere'>
                      <ArbeidsgiverListe
                        arbeidsgivere={rekrutteringstreff.arbeidsgivere}
                      />
                    </Tabs.Panel>
                  )}
                </Tabs>
              </Show>

              <Show above='lg'>
                <HGrid columns={'65% 35%'}>
                  <div className='pr-8'>
                    <Heading size='xsmall' className='mb-4'>
                      Siste aktivitet
                    </Heading>
                    <InnleggListe innlegg={rekrutteringstreff.innlegg} />
                  </div>
                  {rekrutteringstreff.kategori !==
                    RekrutteringstreffKategori.WORKOP && (
                    <div>
                      <Heading size='xsmall' className='mb-4'>
                        Arbeidsgivere
                      </Heading>
                      <ArbeidsgiverListe
                        arbeidsgivere={rekrutteringstreff.arbeidsgivere}
                      />
                    </div>
                  )}
                </HGrid>
              </Show>
            </Page.Block>
          );
        }}
      </SWRLaster>
    </div>
  );
};

export default VisRekrutteringstreff;
