import {Button, Modal, Radio, RadioGroup, VStack} from '@navikt/ds-react';
import * as React from 'react';
import {
    ArrowsCirclepathIcon,
    HandHeartIcon,
    HeartIcon,
    PersonGroupIcon
} from "@navikt/aksel-icons";
import IkonOgTekst from "@/app/components/svar/IkonOgTekst";
import Boks from "@/app/components/Boks";
import {antallDagerTilDato, formatterDato} from "@/app/util";

export interface SvarModalProps {
    erÅpen: boolean;
    onClose: () => void;
    svarfrist: string | null;
}

const SvarModal: React.FC<SvarModalProps> = ({erÅpen, onClose, svarfrist}) => {
    return (
        <Modal
            open={erÅpen}
            width='600px'
            onClose={() => {
                onClose();
            }}
            header={{
                closeButton: true,
                heading: "Svar på om du vil komme",
            }}
        >
            <Modal.Body>
                <VStack gap="space-24">
                    <IkonOgTekst
                        ikon={<HandHeartIcon />}
                        tekst={
                            `Vi ønsker å gi deg sjansen til å utforske jobbmuligheter på en enkel og uformell måte, 
                            hvis du selv har lyst.`
                        }
                    />
                    <IkonOgTekst
                        ikon={<HeartIcon />}
                        tekst={
                            `Dette er en mulighet, ikke en forpliktelse. Rekrutteringstreffet er helt frivillig. Hvis 
                            du føler at det ikke passer for deg akkurat nå, går du ikke glipp av noe.`
                    }
                    />
                    <IkonOgTekst
                        ikon={<PersonGroupIcon />}
                        tekst={`
                            Det er heller ingen krav om å møte opp. Men hvis du ikke vil, så setter vi veldig pris
                            på om du sier ifra sånn at noen andre får sjansen.
                        `}
                    />
                    <IkonOgTekst
                        ikon={<ArrowsCirclepathIcon />}
                        tekst={`
                            Du kan endre svaret ditt frem til fristen. Det gjør ikke noe om du ombestemmer deg.
                        `}
                    />
                    <RadioGroup legend="" onChange={() => {}}>
                        <Radio value="true" size="small"><span className="mr-2">👍</span><span className="text-base">Ja, jeg kommer</span></Radio>
                        <Radio value="false" size="small"><span className="mr-2">👎</span><span className="text-base">Nei, jeg kommer ikke</span></Radio>
                    </RadioGroup>
                    <Boks>
                        <div>🔥🔥🔥</div>
                        <div className="font-bold">Utløper om {antallDagerTilDato(svarfrist)} dager</div>
                        <div>Du kan endre svaret ditt frem til {formatterDato(svarfrist)}</div>
                    </Boks>
                </VStack>
            </Modal.Body>
            <Modal.Footer>
                <Button>Send</Button>
                <Button variant="secondary" onClick={() => onClose()}>Avbryt</Button>
            </Modal.Footer>
        </Modal>
  );
};

export default SvarModal;
