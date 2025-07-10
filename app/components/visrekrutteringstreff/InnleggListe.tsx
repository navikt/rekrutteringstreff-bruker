import {InnleggDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import {VStack} from "@navikt/ds-react";
import Innlegg from "@/app/components/visrekrutteringstreff/Innlegg";

export interface ArbeigsgiverProps {
    innlegg: InnleggDTO[];
}

const ArbeidsgiverListe: React.FC<ArbeigsgiverProps> = ({innlegg}) => {
  return (
      innlegg.map((ettInnlegg, index) => (
           <VStack gap="space-64" key={index}>
               <Innlegg innlegg={ettInnlegg} />
           </VStack>
  )));
};

export default ArbeidsgiverListe;
