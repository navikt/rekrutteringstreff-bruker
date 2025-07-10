import {ArbeidsgiverDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import {VStack} from "@navikt/ds-react";
import Arbeidsgiver from "@/app/components/visrekrutteringstreff/Arbeidsgiver";

export interface ArbeigsgiverProps {
    arbeidsgivere: ArbeidsgiverDTO[];
}

const ArbeidsgiverListe: React.FC<ArbeigsgiverProps> = ({arbeidsgivere}) => {
  return (
      arbeidsgivere.map((arbeidsgiver, index) => (
           <VStack gap="space-64" key={index}>
               <Arbeidsgiver arbeidsgiver={arbeidsgiver} />
           </VStack>
  )));
};

export default ArbeidsgiverListe;
