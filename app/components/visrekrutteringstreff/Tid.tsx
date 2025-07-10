import * as React from 'react';
import {ClockIcon} from "@navikt/aksel-icons";
import {antallDagerTilDato, formatterDato} from "@/app/util";
import IkonMedInnhold from "@/app/components/IkonMedInnhold";

export interface TidProps {
    fraTid: string | null;
    tilTid: string | null;
}

const Tid: React.FC<TidProps> = ({fraTid, tilTid}) => {
  return (
        <IkonMedInnhold ikon={<ClockIcon title="Clock icon" fontSize="1.5rem" />}>
            <div
                className="font-bold">Om {antallDagerTilDato(fraTid)} dager
            </div>
            <div>{formatterDato(fraTid)} -</div>
            <div>{formatterDato(tilTid)}</div>
        </IkonMedInnhold>
  );
};

export default Tid;
