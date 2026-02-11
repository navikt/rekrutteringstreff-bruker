'use client';

import { useEnkeltRekrutteringstreffSvar } from '@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreffSvar';
import Svarboks from '@/app/components/svar/Svarboks';
import ArbeidsgiverListe from '@/app/components/visrekrutteringstreff/ArbeidsgiverListe';
import InnleggListe from '@/app/components/visrekrutteringstreff/InnleggListe';
import Sted from '@/app/components/visrekrutteringstreff/Sted';
import Tid from '@/app/components/visrekrutteringstreff/Tid';
import { Heading, HGrid, Page, Show, Tabs } from '@navikt/ds-react';
import {logger} from '@navikt/next-logger';
import {useUmami} from "@/app/providers/UmamiContext";
import {UmamiEvent} from "@/app/util/umamiEvents";
import {useEffect} from "react";
import SWRLaster from "@/app/components/SWRLaster";
import {useEnkeltRekrutteringstreff} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";


export interface VisRekrutteringstreffProps {
  rekrutteringstreffId: string;
}

const VisRekrutteringstreff: React.FC<VisRekrutteringstreffProps> = ({rekrutteringstreffId}) => {
  const enkeltRekrutteringstreffHook = useEnkeltRekrutteringstreff(rekrutteringstreffId);
  const enkeltRekrutteringstreffSvarHook = useEnkeltRekrutteringstreffSvar(rekrutteringstreffId);
  const { track } = useUmami();

  useEffect(() => {
    track(UmamiEvent.Rekrutteringstreff.vis_side_for_rektruteringstreff);
  }, [track]);

  const håndterFeil = (error: Error) => {
    // Sjekk om det er en 404-feil
    if (error instanceof Response && error.status === 404) {
      logger.warn(`Rekrutteringstreff med id ${rekrutteringstreffId} ikke funnet (404)`);
      return (
        <Page className="min-w-full">
          <Page.Block as="main" width="xl" gutters>
            <div className='flex justify-center items-center min-h-full'>
              <div className="p-8 bg-white rounded">
                <Heading level='1' size='large' className="mb-4">
                  Rekrutteringstreff ikke funnet
                </Heading>
                <p>
                  Dette rekrutteringstreffet finnes ikke eller er ikke lenger tilgjengelig.
                </p>
              </div>
            </div>
          </Page.Block>
        </Page>
      );
    }

    // Andre feil
    logger.error(`Feil ved henting av rekrutteringstreff ${rekrutteringstreffId}:`, JSON.stringify(error));
    return (
      <Page className="min-w-full">
        <Page.Block as="main" width="xl" gutters>
          <div className='flex justify-center items-center min-h-full'>
            <div className="p-8 bg-white rounded">
              <Heading level='1' size='large' className="mb-4">
                Noe gikk galt
              </Heading>
              <p>
                Vi klarte ikke å laste rekrutteringstreffet. Vennligst prøv igjen senere.
              </p>
            </div>
          </div>
        </Page.Block>
      </Page>
    );
  };

  return (
      <div className='mb-8 flex items-center gap-10'>
          <SWRLaster
            hooks={[enkeltRekrutteringstreffHook, enkeltRekrutteringstreffSvarHook]}
            egenFeilmelding={håndterFeil}
          >
              {(rekrutteringstreff, enkeltRekrutteringstreffSvar) => {
                  if (!rekrutteringstreff) {
                      logger.warn(`Fant ikke data for rekrutteringstreff med id: ${rekrutteringstreffId}`);
                      return <div>Ingen data funnet for rekrutteringstreff med ID: {rekrutteringstreffId}</div>;
                  }
                  logger.info(`Viser rekrutteringstreff ${rekrutteringstreffId}`);
                  return (
                      <Page className="min-w-full">
                          <Page.Block as="main" width="xl" gutters>
                              <HGrid columns={{xs: "1", lg: "65% 35%"}} gap="space-0">
                                  <div>
                                      <Heading size="medium" className="mb-6 mr-4">{rekrutteringstreff.tittel}</Heading>
                                      <HGrid columns={{xs: 1, lg: 2}} gap="space-24" className="pb-4 text-base">
                                          <Tid fraTid={rekrutteringstreff.fraTid} tilTid={rekrutteringstreff.tilTid} />
                                          <Sted gateadresse={rekrutteringstreff.gateadresse}
                                                postnummer={rekrutteringstreff.postnummer}
                                                poststed={rekrutteringstreff.poststed}
                                          />
                                      </HGrid>
                                  </div>
                                  <div>
                                      <Svarboks erInvitert={enkeltRekrutteringstreffSvar.erInvitert}
                                                erPåmeldt={enkeltRekrutteringstreffSvar.erPåmeldt}
                                                harSvart={enkeltRekrutteringstreffSvar.harSvart}
                                                svarfrist={rekrutteringstreff.svarfrist}
                                                fraTid={rekrutteringstreff.fraTid}
                                                tilTid={rekrutteringstreff.tilTid}
                                                status={rekrutteringstreff.status}
                                                laster={enkeltRekrutteringstreffSvarHook?.isLoading || false}
                                                rekrutteringstreffId={rekrutteringstreffId}
                                                svarEndret={(svar) => {
                                                    enkeltRekrutteringstreffSvarHook?.mutate({
                                                        erInvitert: true,
                                                        erPåmeldt: svar,
                                                        harSvart: true
                                                    });
                                                }}
                                      />
                                  </div>
                              </HGrid>

                              <Show below="lg">
                                  <Tabs defaultValue="innlegg">
                                      <Tabs.List>
                                          <Tabs.Tab value="innlegg"
                                                    label={`Siste aktivitet (${rekrutteringstreff.innlegg.length})`} />
                                          <Tabs.Tab value="arbeidsgivere"
                                                    label={`Arbeidsgivere (${rekrutteringstreff.arbeidsgivere.length})`} />
                                      </Tabs.List>
                                      <Tabs.Panel value="innlegg">
                                          <InnleggListe innlegg={rekrutteringstreff.innlegg} />
                                      </Tabs.Panel>
                                      <Tabs.Panel value="arbeidsgivere">
                                          <ArbeidsgiverListe arbeidsgivere={rekrutteringstreff.arbeidsgivere} />
                                      </Tabs.Panel>
                                  </Tabs>
                              </Show>

                              <Show above="lg">
                                  <HGrid columns={"65% 35%"}>
                                      <div className="pr-8">
                                          <Heading size="xsmall" className="mb-4">Siste aktivitet</Heading>
                                          <InnleggListe innlegg={rekrutteringstreff.innlegg} />
                                      </div>
                                      <div>
                                          <Heading size="xsmall" className="mb-4">Arbeidsgivere</Heading>
                                          <ArbeidsgiverListe arbeidsgivere={rekrutteringstreff.arbeidsgivere} />
                                      </div>
                                  </HGrid>
                              </Show>
                          </Page.Block>
                      </Page>
                  );
              }}
          </SWRLaster>
      </div>
  );
};

export default VisRekrutteringstreff;
