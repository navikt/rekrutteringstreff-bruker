import * as React from 'react';
import {ClockIcon} from "@navikt/aksel-icons";
import {
    antallDagerTilDato,
    capitalizeFirstLetter,
    erDatoPassert,
    erMellomDatoer,
    formatterDato,
    formatterKlokkeslett
} from "@/app/util";
import IkonMedInnhold from "@/app/components/IkonMedInnhold";
import {isSameDay, isToday, isTomorrow, parseISO} from "date-fns";

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
          return <span>Treffet er over</span>;
      }

      if (fraTid && isToday(parseISO(fraTid))) {
        return <span>I dag</span>
      }

      if (fraTid && isTomorrow(parseISO(fraTid))) {
        return <span>I morgen</span>
      }

      const dagerTilDato = antallDagerTilDato(fraTid);
      if (dagerTilDato === "1") {
        return <span>Mindre enn 2 dager til</span>;
      }
      return <span>Om {dagerTilDato} dager</span>;
  }

  function fraOgTilDato(fraTid: string | null, tilTid: string | null) {
      if (fraTid === null || tilTid === null) {
          return null;
      }
      if (isSameDay(fraTid, tilTid)) {
          return <div>{capitalizeFirstLetter((formatterDato(fraTid)))} - {formatterKlokkeslett(tilTid)}</div>
      }

      return (
          <>
            <div>{capitalizeFirstLetter((formatterDato(fraTid)))} til</div>
            <div>{capitalizeFirstLetter((formatterDato(tilTid)))}</div>
          </>
      )

  }

  return (
        <IkonMedInnhold ikon={<ClockIcon title="Clock icon" fontSize="1.5rem" />}>
            <div className="font-bold">{tekstligBeskrivelse(fraTid, tilTid)}</div>
            {fraOgTilDato(fraTid, tilTid)}
        </IkonMedInnhold>
  );
};

export default Tid;
