import {ArbeidsgiverDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import BoksMedTittelOgInnhold from "@/app/components/BoksMedTittelOgInnhold";

export interface ArbeigsgiverProps {
    arbeidsgiver: ArbeidsgiverDTO;
}

const Arbeidsgiver: React.FC<ArbeigsgiverProps> = ({arbeidsgiver}) => {
  return (
       <BoksMedTittelOgInnhold tittel={arbeidsgiver.navn}>
           Org.nr: {arbeidsgiver.organisasjonsnummer}
       </BoksMedTittelOgInnhold>
  );
};

export default Arbeidsgiver;
