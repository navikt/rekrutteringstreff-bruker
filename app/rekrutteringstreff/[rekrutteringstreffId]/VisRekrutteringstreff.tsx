'use client';

import { useEnkeltRekrutteringstreff } from '../../api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import SWRLaster from '../../components/SWRLaster';
import * as React from 'react';
import {ClockIcon, LocationPinIcon} from "@navikt/aksel-icons";
import {Heading, HStack, Page, Tabs, VStack} from "@navikt/ds-react";
import IkonMedInnhold from "@/app/components/IkonMedInnhold";
import { parseISO, differenceInDays } from "date-fns";
import { format as formatDateFns } from "date-fns/format";
import { nb } from "date-fns/locale";
import GråBoks from "@/app/components/GråBoks";

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
                          <HStack gap="space-64" className="pb-6">
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

                          <Tabs defaultValue="innlegg">
                              <Tabs.List>
                                  <Tabs.Tab value="innlegg"
                                            label={`Siste aktivitet (${rekrutteringstreffData.innlegg.length})`} />
                                  <Tabs.Tab value="arbeidsgivere"
                                            label={`Arbeidsgivere (${rekrutteringstreffData.arbeidsgivere.length})`} />
                              </Tabs.List>
                              <Tabs.Panel value="innlegg">
                                  {rekrutteringstreffData.innlegg.map((innlegg, index) => (
                                      <VStack gap="space-64" key={index}>
                                          <GråBoks tittel={innlegg.tittel}>
                                              {innlegg.htmlContent}
                                          </GråBoks>
                                      </VStack>
                                  ))}
                              </Tabs.Panel>
                              <Tabs.Panel value="arbeidsgivere">
                                  {rekrutteringstreffData.arbeidsgivere.map((arbeigsgiver, index) => (
                                      <VStack gap="space-64" key={index}>
                                          <GråBoks tittel={arbeigsgiver.navn}>
                                              Org.nr: {arbeigsgiver.organisasjonsnummer}
                                          </GråBoks>
                                      </VStack>
                                  ))}
                              </Tabs.Panel>
                          </Tabs>
                      </Page.Block>
                  </Page>
              )
          }}
        </SWRLaster>
      </div>
  );
};

export default VisRekrutteringstreff;
