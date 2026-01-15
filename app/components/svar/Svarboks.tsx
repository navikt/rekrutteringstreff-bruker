import {Button, HStack, Loader} from '@navikt/ds-react';
import * as React from 'react';
import {antallDagerTilDato, erDatoPassert, erMellomDatoer, formatterDato} from "@/app/util";
import Boks from "@/app/components/Boks";
import BoksMedTittelOgInnhold from "@/app/components/BoksMedTittelOgInnhold";
import PåmeldtChips from "@/app/components/visrekrutteringstreff/PåmeldtChips";
import {useState} from "react";
import SvarModal from "@/app/components/svar/SvarModal";
import {XMarkOctagonIcon} from "@navikt/aksel-icons";
import {isToday, isTomorrow, parseISO} from "date-fns";

export interface SvarboksProps {
    erInvitert: boolean;
    erPåmeldt: boolean;
    harSvart: boolean;
    laster: boolean;
    svarfrist: string | null;
    fraTid: string | null;
    tilTid: string | null;
    rekrutteringstreffId: string;
    svarEndret: (svar: boolean) => void;
    status: string;
}

const Svarboks: React.FC<SvarboksProps> = ({erInvitert, harSvart, erPåmeldt, svarfrist, fraTid, tilTid,
           rekrutteringstreffId, svarEndret, laster, status}) => {

    const [isSvarModalOpen, setSvarModalOpen] = useState(false);

    if (laster) {
        return (
            <Boks fargeKode={"blå"} className="mb-8 flex justify-center ">
                <Loader title='Laster...' />
            </Boks>
        );
    }

    if (status === "AVLYST") {
        return <Boks fargeKode="hvit" borderColor="border-danger" className="mb-8">
            <div><XMarkOctagonIcon title="Location pin icon" fontSize="1.7rem" color="red" /></div>
            <div className="font-bold mt-2 text-base">Arrangement avlyst</div>
            <div className="text-base">Vi beklager ulempene dette medfører, og vil informere dersom seminaret settes opp på nytt.</div>
        </Boks>
    }

    if (erDatoPassert(tilTid)) {
        return <Boks fargeKode={"hvit"} className="mb-8">
            <div>🎉</div>
            <div className="font-bold mt-2 text-base">Treffet er over</div>
        </Boks>
    }

    if (erMellomDatoer(fraTid, tilTid)) {
        return <Boks fargeKode={"hvit"} className="mb-8">
            <div>⏱️️⏱️️⏱️️</div>
            <div className="font-bold mt-2 text-base">Treffet er i gang</div>
        </Boks>
    }

    if (!erInvitert) {
        return (
            <BoksMedTittelOgInnhold fargeKode={"blå"} className="mb-8" tittel="Vil du være med?">
                <div className="text-base">
                    Treffet har begrenset med plasser, men det hendet at det åpner seg ekstra rom for folk
                    som er ekstra motivert.
                </div>
                <div className="text-base mt-2">
                    Tips: Hør med veilederen din i dialogen og be dem sjekke om du kan bli med.
                </div>
            </BoksMedTittelOgInnhold>
        );
    }

    const harSvartSomBooleanEllerNull = () => {
        if (!harSvart) {
            return null;
        }
        return erPåmeldt
    }

    const svarModalElement = <SvarModal
        erÅpen={isSvarModalOpen}
        onClose={() => setSvarModalOpen(false)}
        svarEndret={(svar: boolean) => svarEndret(svar)}
        svarfrist={svarfrist}
        rekrutteringstreffId={rekrutteringstreffId}
        gjeldendeSvar={harSvartSomBooleanEllerNull()} />

    const svarfristSomTekst = (svarfrist: string | null) => {
        if (erDatoPassert(svarfrist)) {
            return "Svarfrist er utløpt";
        }

        if (svarfrist && isToday(parseISO(svarfrist))) {
            return "Utløper i dag";
        }

        if (svarfrist && isTomorrow(parseISO(svarfrist))) {
            return "Utløper i morgen";
        }

        const dagerTilDato = antallDagerTilDato(svarfrist);
        if (dagerTilDato === "1") {
            return "Utløper om mindre enn 2 dager";
        }

        return `Utløper om ${dagerTilDato} dager`;
    }

    if (!harSvart) {
        return (
            <>
                <Boks fargeKode={"blå"} className="mb-8">
                    <HStack className="text-base" align={"center"} justify="space-between">
                        <div style={{width: '70%'}}>
                            <div>🔥🔥🔥</div>
                            <div className="font-bold">{svarfristSomTekst(svarfrist)}</div>
                            <div>Du kan endre svaret ditt frem til {formatterDato(svarfrist)}</div>
                        </div>
                        <div className="align-middle">
                            <Button variant="primary" onClick={() => setSvarModalOpen(true)}>Svar</Button>
                        </div>
                    </HStack>
                </Boks>
                {svarModalElement}
            </>
        )
    }

    return (
        <>
            <Boks fargeKode={"hvit"} className="mb-8">
                <HStack className="text-base" align={"center"} justify="space-between">
                    <div style={{width: '60%'}}>
                        <div className="font-bold">
                            <PåmeldtChips erPåmeldt={erPåmeldt} />
                        </div>
                        <div className="py-2">Du kan endre svaret ditt frem til {formatterDato(svarfrist)}</div>
                    </div>
                    <div className="align-middle ">
                        <Button variant="secondary"
                                className="place-self-end"
                                size="medium"
                                onClick={() => setSvarModalOpen(true)}
                        >
                            Endre svar
                        </Button>
                    </div>
                </HStack>
            </Boks>
            {svarModalElement}
        </>
    );
};

export default Svarboks;
