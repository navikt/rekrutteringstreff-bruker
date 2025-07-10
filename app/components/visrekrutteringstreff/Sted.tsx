import * as React from 'react';
import {LocationPinIcon} from "@navikt/aksel-icons";
import IkonMedInnhold from "@/app/components/IkonMedInnhold";

export interface StedProps {
    gateadresse: string | null;
    postnummer: string | null;
    poststed: string | null;
}

const Sted: React.FC<StedProps> = ({gateadresse, postnummer, poststed}) => {
  return (
      <IkonMedInnhold
          ikon={<LocationPinIcon title="Location pin icon" fontSize="1.5rem" />}>
          <div className="font-bold">{gateadresse}</div>
          <div>{postnummer} {poststed}</div>
      </IkonMedInnhold>
  );
};

export default Sted;
