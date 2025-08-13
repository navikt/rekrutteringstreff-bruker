import * as React from 'react';
import {ClockIcon} from "@navikt/aksel-icons";
import {antallDagerTilDato, capitalizeFirstLetter, erDatoPassert, erMellomDatoer, formatterDato} from "@/app/util";
import IkonMedInnhold from "@/app/components/IkonMedInnhold";

export interface TidProps {
    fraTid: string | null;
    tilTid: string | null;
}

const Tid: React.FC<TidProps> = ({fraTid, tilTid}) => {

  function tekstligBeskrivelse(fraTid: string | null, tilTid: string | null) {
      const erTreffetIgang = erMellomDatoer(fraTid, tilTid);
      if (erTreffetIgang) {
          return <span>Pågår nå</span>;
      }
      const erTreffetOver = erDatoPassert(tilTid);
      if (erTreffetOver) {
          return <span>For {antallDagerTilDato(tilTid).replace("-", "")} dager siden</span>;
      }
      return <span>Om {antallDagerTilDato(fraTid)} dager</span>;
  }

  return (
        <IkonMedInnhold ikon={<ClockIcon title="Clock icon" fontSize="1.5rem" />}>
            <div className="font-bold">{tekstligBeskrivelse(fraTid, tilTid)}</div>
            <div>{capitalizeFirstLetter((formatterDato(fraTid)))} til</div>
            <div>{capitalizeFirstLetter((formatterDato(tilTid)))}</div>
        </IkonMedInnhold>
  );
};

export default Tid;
