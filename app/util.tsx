import {format as formatDateFns} from "date-fns/format";
import {nb} from "date-fns/locale";
import {differenceInDays, parseISO} from "date-fns";

export const isLocal = process.env.NEXT_PUBLIC_DEVELOPER === 'local';
const onPremCLuster = () => {
  if (process.env.NAIS_CLUSTER_NAME === 'prod-gcp') {
    return 'prod-fss';
  } else {
    return 'dev-fss';
  }
};

export const getCluster = (onPrem?: boolean) => {
  const cluster = process.env.NAIS_CLUSTER_NAME;
  const clusterOnPrem = onPrem ? onPremCLuster() : cluster;
  return clusterOnPrem;
};

export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function formatterDato(date: string | null): string  {
    if (!date) {
        return '';
    }
    return formatDateFns(date, "EEEE d. MMMM yyyy 'kl.' HH.mm", {locale: nb,});
}

export function formatterKlokkeslett(date: string | null): string  {
    if (!date) {
        return '';
    }
    return formatDateFns(date, "HH:mm", {locale: nb,});
}

export function antallDagerTilDato(dato: string | null): string {
    if (!dato) {
        return '';
    }
    const isoDato = parseISO(dato);
    return differenceInDays(isoDato, new Date()) + '';
}

export function erMellomDatoer(fraDato: string | null, tilDato: string | null): boolean {
    if (!fraDato || !tilDato) {
        return false;
    }
    const fra = parseISO(fraDato);
    const til = parseISO(tilDato);
    const iDag = new Date();
    return iDag >= fra && iDag <= til;
}

export function erDatoPassert(datoSomStreng: string | null): boolean {
    if (!datoSomStreng) {
        return false;
    }
    return parseISO(datoSomStreng) <= new Date();
}
