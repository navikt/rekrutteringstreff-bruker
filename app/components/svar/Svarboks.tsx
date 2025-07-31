import {Button, HStack} from '@navikt/ds-react';
import * as React from 'react';
import {antallDagerTilDato, formatterDato} from "@/app/util";
import Boks from "@/app/components/Boks";
import BoksMedTittelOgInnhold from "@/app/components/BoksMedTittelOgInnhold";
import PåmeldtChips from "@/app/components/visrekrutteringstreff/PåmeldtChips";
import {useState} from "react";
import SvarModal from "@/app/components/svar/SvarModal";

export interface SvarboksProps {
    erInvitert: boolean;
    erPåmeldt: boolean;
    harSvart: boolean;
    svarfrist: string | null;
    rekrutteringstreffId: string;
    svarEndret: () => void;
}

const Svarboks: React.FC<SvarboksProps> = ({erInvitert, harSvart, erPåmeldt, svarfrist, rekrutteringstreffId, svarEndret}) => {

    const [isSvarModalOpen, setSvarModalOpen] = useState(false);

    const fargekode = "blå";

    if (!erInvitert) {
        return (
            <BoksMedTittelOgInnhold fargeKode={fargekode} className="mb-8" tittel="Vil du være med?">
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
            svarEndret={() => svarEndret()}
            svarfrist={svarfrist}
            rekrutteringstreffId={rekrutteringstreffId}
            gjeldendeSvar={harSvartSomBooleanEllerNull()}/>

    if (!harSvart) {
        return (
            <>
                <Boks fargeKode={fargekode} className="mb-8">
                    <HStack className="text-base" align={"center"} justify="space-between">
                        <div style={{width: '70%'}}>
                            <div>🔥🔥🔥</div>
                            <div className="font-bold">Utløper om {antallDagerTilDato(svarfrist)} dager</div>
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
            <Boks fargeKode={fargekode} className="mb-8">
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
