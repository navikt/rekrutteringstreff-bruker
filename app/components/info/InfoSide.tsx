'use client';

import * as React from 'react';
import { BodyLong, Heading, HStack, VStack } from '@navikt/ds-react';
import Image from 'next/image';
import {useUmami} from "@/app/providers/UmamiContext";
import {UmamiEvent} from "@/app/util/umamiEvents";
import {useEffect} from "react";
import PusserOppBilde from '@/public/pusser-opp.svg';

const InfoSide: React.FC = () => {
  const { track } = useUmami();

  useEffect(() => {
    track(UmamiEvent.Forside.vis_forside);
  }, [track]);

  return (
    <div className='flex justify-center items-center min-h-full'>
      <VStack
        gap="space-32"
        align='start'
        style={{
          padding: '2rem',
          margin: '0 0 2rem 0',
          backgroundColor: 'white',
          borderRadius: '4px',
        }}
      >
        <Heading level='1' size='xlarge'>
          Rekrutteringstreff
        </Heading>
        <BodyLong>
            Dette er møteplassen der du som jobbsøker kan komme i direkte dialog med arbeidsgivere om konkrete stillinger.<br/>
            For å delta må du være registrert som arbeidssøker hos Nav og ha en oppdatert CV.<br/>
            <br/>
            Ønsker du å delta, må du ta kontakt med veileder ved ditt nærmeste Nav kontor
        </BodyLong>
      </VStack>
    </div>
  );
};

export default InfoSide;
