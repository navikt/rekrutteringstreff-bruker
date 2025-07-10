import {ArbeidsgiverDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import GråBoks from "@/app/components/GråBoks";

export interface ArbeigsgiverProps {
    arbeidsgiver: ArbeidsgiverDTO;
}

const Arbeidsgiver: React.FC<ArbeigsgiverProps> = ({arbeidsgiver}) => {
  return (
       <GråBoks tittel={arbeidsgiver.navn}>
           Org.nr: {arbeidsgiver.organisasjonsnummer}
       </GråBoks>
  );
};

export default Arbeidsgiver;
