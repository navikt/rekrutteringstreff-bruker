import {InnleggDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import {VStack} from "@navikt/ds-react";
import Innlegg from "@/app/components/visrekrutteringstreff/Innlegg";

export interface InnleggListeProps {
    innlegg: InnleggDTO[];
}

const InnleggListe: React.FC<InnleggListeProps> = ({innlegg}) => {
  return (
      innlegg.map((ettInnlegg, index) => (
           <VStack gap="space-64" key={index}>
               <Innlegg innlegg={ettInnlegg} />
           </VStack>
  )));
};

export default InnleggListe;
