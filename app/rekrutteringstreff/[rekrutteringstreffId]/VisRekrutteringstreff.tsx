'use client';

import {
    ArbeidsgiverDTO, InnleggDTO,
    useEnkeltRekrutteringstreff
} from '../../api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import SWRLaster from '../../components/SWRLaster';
import * as React from 'react';
import {ClockIcon, LocationPinIcon} from "@navikt/aksel-icons";
import {Heading, HStack, Page, Show, Tabs, VStack} from "@navikt/ds-react";
import IkonMedInnhold from "@/app/components/IkonMedInnhold";
import { parseISO, differenceInDays } from "date-fns";
import { format as formatDateFns } from "date-fns/format";
import { nb } from "date-fns/locale";
import GråBoks from "@/app/components/GråBoks";
import DOMPurify from 'dompurify';

export interface VisRekrutteringstreffProps {
  rekrutteringstreffId: string;
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function formatDate(date: string | null): string  {
    if (!date) {
        return '';
    }
    return capitalizeFirstLetter(formatDateFns(date, "EEEE d. MMMM yyyy 'kl' hh:MM", {locale: nb,}));
}

function antallDaterTilDato(dato: string | null): string {
    if (!dato) {
        return '';
    }
   const isoDato = parseISO(dato);
   return differenceInDays(isoDato, new Date()) + '';
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
          {(rekrutteringstreffData) => {
              if (!rekrutteringstreffData) {
                return <div>Ingen data funnet for rekrutteringstreff med ID: {rekrutteringstreffId}</div>;
              }
              return (
                  <Page>
                      <Page.Block as="main" width="xl" gutters>
                          <Heading size="medium" className="mb-6">{rekrutteringstreffData.tittel}</Heading>
                          <HStack gap="space-64" className="pb-10">
                              <IkonMedInnhold ikon={<ClockIcon title="Clock icon" fontSize="1.5rem" />}>
                                  <div
                                      className="font-bold">Om {antallDaterTilDato(rekrutteringstreffData.fraTid)} dager
                                  </div>
                                  <div>{formatDate(rekrutteringstreffData.fraTid)} -</div>
                                  <div>{formatDate(rekrutteringstreffData.tilTid)}</div>
                              </IkonMedInnhold>
                              <IkonMedInnhold
                                  ikon={<LocationPinIcon title="Location pin icon" fontSize="1.5rem" />}>
                                  <div className="font-bold">{rekrutteringstreffData.gateadresse}</div>
                                  <div>{rekrutteringstreffData.postnummer} {rekrutteringstreffData.poststed}</div>
                              </IkonMedInnhold>
                          </HStack>

                          <Show below="lg" >
                              <Tabs defaultValue="innlegg">
                                  <Tabs.List>
                                      <Tabs.Tab value="innlegg"
                                                label={`Siste aktivitet (${rekrutteringstreffData.innlegg.length})`} />
                                      <Tabs.Tab value="arbeidsgivere"
                                                label={`Arbeidsgivere (${rekrutteringstreffData.arbeidsgivere.length})`} />
                                  </Tabs.List>
                                  <Tabs.Panel value="innlegg">
                                      {visInnlegg(rekrutteringstreffData.innlegg)}
                                  </Tabs.Panel>
                                  <Tabs.Panel value="arbeidsgivere">
                                      {visArbeidsgivere(rekrutteringstreffData.arbeidsgivere)}
                                  </Tabs.Panel>
                              </Tabs>
                          </Show>

                           <Show  above="lg">
                               <HStack>
                                   <div style={{'width': '70%'}} className="pr-8">
                                       <Heading size="xsmall">Siste aktivitet</Heading>
                                       {visInnlegg(rekrutteringstreffData.innlegg)}
                                   </div>
                                   <div style={{'width': '30%'}}>
                                       <Heading size="xsmall">Arbeidsgivere</Heading>
                                       {visArbeidsgivere(rekrutteringstreffData.arbeidsgivere)}
                                   </div>
                               </HStack>
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
