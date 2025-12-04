import {ArbeidsgiverDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import BoksMedTittelOgInnhold from "@/app/components/BoksMedTittelOgInnhold";

export interface ArbeidsgiverProps {
    arbeidsgiver: ArbeidsgiverDTO;
}

const Arbeidsgiver: React.FC<ArbeidsgiverProps> = ({arbeidsgiver}) => {
  return (
       <BoksMedTittelOgInnhold tittel={arbeidsgiver.navn}>
           Org.nr: {arbeidsgiver.organisasjonsnummer}
       </BoksMedTittelOgInnhold>
  );
};

export default Arbeidsgiver;
