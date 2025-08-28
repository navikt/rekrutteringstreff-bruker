'use client';

import {useEnkeltRekrutteringstreff} from '../../api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import SWRLaster from '../../components/SWRLaster';
import * as React from 'react';
import {Heading, HGrid, Page, Show, Tabs} from "@navikt/ds-react";
import ArbeidsgiverListe from "@/app/components/visrekrutteringstreff/ArbeidsgiverListe";
import InnleggListe from "@/app/components/visrekrutteringstreff/InnleggListe";
import Tid from "@/app/components/visrekrutteringstreff/Tid";
import Sted from "@/app/components/visrekrutteringstreff/Sted";
import {useEnkeltRekrutteringstreffSvar} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreffSvar";
import Svarboks from "@/app/components/svar/Svarboks";
import { logger } from '@navikt/next-logger';

export interface VisRekrutteringstreffProps {
  rekrutteringstreffId: string;
}

const VisRekrutteringstreff: React.FC<VisRekrutteringstreffProps> = ({rekrutteringstreffId}) => {
  const enkeltRekrutteringstreffHook = useEnkeltRekrutteringstreff(rekrutteringstreffId);
  const enkeltRekrutteringstreffSvarHook = useEnkeltRekrutteringstreffSvar(rekrutteringstreffId);
  return (
      <div className='mb-8 flex items-center gap-10'>
        <SWRLaster hooks={[enkeltRekrutteringstreffHook, enkeltRekrutteringstreffSvarHook]}>
          {(rekrutteringstreff, enkeltRekrutteringstreffSvar) => {
              if (!rekrutteringstreff) {
                logger.warn(`Fant ikke data for rekrutteringsteff med id: ${rekrutteringstreffId}`);
                return <div>Ingen data funnet for rekrutteringstreff med ID: {rekrutteringstreffId}</div>;
              }
              logger.info(`Viser rekrutteringsteff med id: ${rekrutteringstreffId}`);
              return (
                  <Page>
                      <Page.Block as="main" width="xl" gutters>
                          <HGrid columns={{  xs: "1", lg: "65% 35%" }} gap="0">
                              <div >
                                  <Heading size="medium" className="mb-6 mr-4">{rekrutteringstreff.tittel}</Heading>
                                  <HGrid columns={{  xs: 1, lg: 2 }} gap="space-24" className="pb-4 text-base">
                                      <Tid fraTid={rekrutteringstreff.fraTid} tilTid={rekrutteringstreff.tilTid}/>
                                      <Sted gateadresse={rekrutteringstreff.gateadresse}
                                            postnummer={rekrutteringstreff.postnummer}
                                            poststed={rekrutteringstreff.poststed}
                                      />
                                  </HGrid>
                              </div>
                              <div >
                                  <Svarboks erInvitert={enkeltRekrutteringstreffSvar.erInvitert}
                                            erPåmeldt={enkeltRekrutteringstreffSvar.erPåmeldt}
                                            harSvart={enkeltRekrutteringstreffSvar.harSvart}
                                            svarfrist={rekrutteringstreff.svarfrist}
                                            fraTid={rekrutteringstreff.fraTid}
                                            tilTid={rekrutteringstreff.tilTid}
                                            laster={enkeltRekrutteringstreffSvarHook.isLoading}
                                            rekrutteringstreffId={rekrutteringstreffId}
                                            svarEndret={() => enkeltRekrutteringstreffSvarHook.mutate()}
                                  />
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
                               <HGrid columns={ "65% 35%" }>
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
              )
          }}
        </SWRLaster>
      </div>
  );
};

export default VisRekrutteringstreff;
