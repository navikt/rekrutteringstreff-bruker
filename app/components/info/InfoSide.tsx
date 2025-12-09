'use client';

import * as React from 'react';
import { BodyLong, Heading, HStack, VStack } from '@navikt/ds-react';
import Image from 'next/image';
import {useUmami} from "@/app/providers/UmamiContext";
import {UmamiEvent} from "@/app/util/umamiEvents";
import {useEffect} from "react";

const InfoSide: React.FC = () => {
  const { track } = useUmami();

  useEffect(() => {
    track(UmamiEvent.Forside.vis_forside);
  }, [track]);

  return (
    <div className='flex justify-center items-center min-h-full'>
      <VStack
        gap='8'
        align='start'
        style={{
          padding: '2rem',
          margin: '0 0 2rem 0',
          backgroundColor: 'white',
          borderRadius: '4px',
        }}
      >
        <HStack gap='8' align='center' wrap={false}>
          <VStack gap='6' style={{ flex: 1 }}>
            <Heading level='1' size='xlarge'>
              Rekrutteringstreff
            </Heading>
            <BodyLong>Du er ikke logget inn. Rekrutteringstreff er en innlogget tjeneste. Vennligst logg inn, eller gå tilbake til Nav.no. </BodyLong>
          </VStack>
          <div style={{ flexShrink: 0 }}>
            <Image
              src='/pusser-opp.svg'
              width={500}
              height={500}
              alt='Vi pusser opp'
            />
          </div>
        </HStack>
      </VStack>
    </div>
  );
};

export default InfoSide;
