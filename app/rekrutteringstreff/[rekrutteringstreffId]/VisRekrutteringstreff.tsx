'use client';

import {useEnkeltRekrutteringstreff} from '../../api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import SWRLaster from '../../components/SWRLaster';
import * as React from 'react';
import {Heading, HGrid, Page, Show, Tabs} from "@navikt/ds-react";
import Svarboks from "@/app/components/visrekrutteringstreff/Svarboks";
import ArbeidsgiverListe from "@/app/components/visrekrutteringstreff/ArbeidsgiverListe";
import InnleggListe from "@/app/components/visrekrutteringstreff/InnleggListe";
import Tid from "@/app/components/visrekrutteringstreff/Tid";
import Sted from "@/app/components/visrekrutteringstreff/Sted";

export interface VisRekrutteringstreffProps {
  rekrutteringstreffId: string;
}

const VisRekrutteringstreff: React.FC<VisRekrutteringstreffProps> = ({rekrutteringstreffId,}) => {
  const enkeltRekrutteringstreffHook = useEnkeltRekrutteringstreff(rekrutteringstreffId);
  return (
      <div className='mb-8 flex items-center gap-10'>
        <SWRLaster hooks={[enkeltRekrutteringstreffHook]}>
          {(rekrutteringstreff) => {
              if (!rekrutteringstreff) {
                return <div>Ingen data funnet for rekrutteringstreff med ID: {rekrutteringstreffId}</div>;
              }
              return (
                  <Page>
                      <Page.Block as="main" width="xl" gutters>
                          <HGrid columns={{  xs: "1", lg: "70% 30%" }} className="mb-10" gap="0">
                              <div >
                                  <Heading size="medium" className="mb-6">{rekrutteringstreff.tittel}</Heading>
                                  <HGrid columns={{  xs: 1, lg: 2 }} gap="space-24" className="pb-10 text-base">
                                      <Tid fraTid={rekrutteringstreff.fraTid} tilTid={rekrutteringstreff.tilTid}/>
                                      <Sted gateadresse={rekrutteringstreff.gateadresse}
                                            postnummer={rekrutteringstreff.postnummer}
                                            poststed={rekrutteringstreff.poststed}
                                      />
                                  </HGrid>
                              </div>
                              <div >
                                  <Svarboks svarfrist={rekrutteringstreff.svarfrist} />
                              </div>
                          </HGrid>

                          <Show below="lg" >
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
                               <HGrid columns={ "70% 30%" }>
                                  <div className="pr-8">
                                      <Heading size="xsmall">Siste aktivitet</Heading>
                                      <InnleggListe innlegg={rekrutteringstreff.innlegg} />
                                  </div>
                                  <div>
                                      <Heading size="xsmall">Arbeidsgivere</Heading>
                                      <ArbeidsgiverListe arbeidsgivere={rekrutteringstreff.arbeidsgivere} />
                                  </div>
                               </HGrid>
                          </Show>
                      </Page.Block>
                  </Page>
              )
          }}
        </SWRLaster>
      </div>
  );
};

export default VisRekrutteringstreff;
