'use client';

import {
    ArbeidsgiverDTO, InnleggDTO,
    useEnkeltRekrutteringstreff
} from '../../api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import SWRLaster from '../../components/SWRLaster';
import * as React from 'react';
import {ClockIcon, LocationPinIcon} from "@navikt/aksel-icons";
import {Heading, HGrid, Page, Show, Tabs, VStack} from "@navikt/ds-react";
import IkonMedInnhold from "@/app/components/IkonMedInnhold";
import GråBoks from "@/app/components/GråBoks";
import DOMPurify from 'dompurify';
import Svarboks from "@/app/components/Svarboks";
import {antallDagerTilDato, formatterDato} from "@/app/util";

export interface VisRekrutteringstreffProps {
  rekrutteringstreffId: string;
}

function visArbeidsgivere(arbeidsgivere: ArbeidsgiverDTO[]) {
    return arbeidsgivere.map((arbeigsgiver, index) => (
           <VStack gap="space-64" key={index}>
               <GråBoks tittel={arbeigsgiver.navn}>
                   Org.nr: {arbeigsgiver.organisasjonsnummer}
               </GråBoks>
           </VStack>
    ));
}

function visInnlegg(innlegg: InnleggDTO[]) {
    return innlegg.map((ettInnlegg, index) => (
        <VStack gap="space-64" key={index}>
            <GråBoks tittel={ettInnlegg.tittel}>
              <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(ettInnlegg.htmlContent)}} />
            </GråBoks>
        </VStack>
    ));
}

const VisRekrutteringstreff: React.FC<VisRekrutteringstreffProps> = ({
  rekrutteringstreffId,
}) => {

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
                                      <IkonMedInnhold ikon={<ClockIcon title="Clock icon" fontSize="1.5rem" />}>
                                          <div
                                              className="font-bold">Om {antallDagerTilDato(rekrutteringstreff.fraTid)} dager
                                          </div>
                                          <div>{formatterDato(rekrutteringstreff.fraTid)} -</div>
                                          <div>{formatterDato(rekrutteringstreff.tilTid)}</div>
                                      </IkonMedInnhold>
                                      <IkonMedInnhold
                                          ikon={<LocationPinIcon title="Location pin icon" fontSize="1.5rem" />}>
                                          <div className="font-bold">{rekrutteringstreff.gateadresse}</div>
                                          <div>{rekrutteringstreff.postnummer} {rekrutteringstreff.poststed}</div>
                                      </IkonMedInnhold>
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
                                      {visInnlegg(rekrutteringstreff.innlegg)}
                                  </Tabs.Panel>
                                  <Tabs.Panel value="arbeidsgivere">
                                      {visArbeidsgivere(rekrutteringstreff.arbeidsgivere)}
                                  </Tabs.Panel>
                              </Tabs>
                          </Show>

                          <Show above="lg">
                               <HGrid columns={ "70% 30%" }>
                                  <div className="pr-8">
                                      <Heading size="xsmall">Siste aktivitet</Heading>
                                      {visInnlegg(rekrutteringstreff.innlegg)}
                                  </div>
                                  <div>
                                      <Heading size="xsmall">Arbeidsgivere</Heading>
                                      {visArbeidsgivere(rekrutteringstreff.arbeidsgivere)}
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
