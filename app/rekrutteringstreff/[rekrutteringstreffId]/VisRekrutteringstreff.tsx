'use client';

import { useEnkeltRekrutteringstreff } from '../../api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import SWRLaster from '../../components/SWRLaster';
import * as React from 'react';
import {ClockIcon, LocationPinIcon} from "@navikt/aksel-icons";
import {Heading, HStack, Page} from "@navikt/ds-react";
import IkonMedInnhold from "@/app/components/IkonMedInnhold";
import { parseISO, differenceInDays } from "date-fns";
import { format as formatDateFns } from "date-fns/format";
import { nb } from "date-fns/locale";

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
                  <div className=''>
                      <Page>
                          <Page.Block as="main" width="lg" gutters>
                              <div>
                                  <Heading size="medium" className="mb-6">{rekrutteringstreffData.tittel}</Heading>
                                  <HStack gap="space-64">
                                      <IkonMedInnhold ikon={<ClockIcon title="Clock icon" fontSize="1.5rem" />}>
                                          <div className="font-bold">Om {antallDaterTilDato(rekrutteringstreffData.fraTid)} dager</div>
                                          <div>{formatDate(rekrutteringstreffData.fraTid)} - </div>
                                          <div>{formatDate(rekrutteringstreffData.tilTid)}</div>
                                      </IkonMedInnhold>
                                      <IkonMedInnhold
                                          ikon={<LocationPinIcon title="Location pin icon" fontSize="1.5rem" />}>
                                          <div className="font-bold">{rekrutteringstreffData.gateadresse}</div>
                                          <div>{rekrutteringstreffData.postnummer} {rekrutteringstreffData.poststed}</div>
                                      </IkonMedInnhold>
                                  </HStack>
                                  <div className={"py-8"}>{rekrutteringstreffData.beskrivelse}</div>
                              </div>
                          </Page.Block>
                      </Page>
                  </div>
              )
          }}
        </SWRLaster>
      </div>
  );
};

export default VisRekrutteringstreff;
