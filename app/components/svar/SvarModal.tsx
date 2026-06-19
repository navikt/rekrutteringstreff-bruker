import { avgiSvar } from '@/app/api/rekrutteringstreff-minside/avgiSvar';
import Boks from '@/app/components/Boks';
import IkonOgTekst from '@/app/components/svar/IkonOgTekst';
import { useUmami } from '@/app/providers/UmamiContext';
import { erDatoPassert, formatterDato, svarfristSomTekst } from '@/app/util';
import { UmamiEvent } from '@/app/util/umamiEvents';
import {
  ArrowsCirclepathIcon,
  HandHeartIcon,
  HeartIcon,
  PersonGroupIcon,
} from '@navikt/aksel-icons';
import { Button, Modal, Radio, RadioGroup, VStack } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';
import { useState } from 'react';

export interface SvarModalProps {
  erÅpen: boolean;
  onClose: () => void;
  svarEndret: (svar: boolean) => void;
  svarfrist: string | null;
  rekrutteringstreffId: string;
  gjeldendeSvar: boolean | null;
}

const SvarModal: React.FC<SvarModalProps> = ({
  erÅpen,
  onClose,
  svarEndret,
  svarfrist,
  rekrutteringstreffId,
  gjeldendeSvar,
}) => {
  const { track } = useUmami();

  async function avgiSvarClicked(svar: boolean) {
    try {
      setVisFeilmelding(false);
      const result = await avgiSvar(rekrutteringstreffId, svar);

      logger.info(
        `Result ved sending av svar for rekrutteringstreff ${rekrutteringstreffId} statuskode: ${result.status}`,
        result,
      );
      if (result.ok) {
        logger.info(
          `Svar sendt ${svar} rekrutteringstreff ${rekrutteringstreffId}`,
        );
        svarEndret(svar);
        onClose();
        track(
          svar
            ? UmamiEvent.Rekrutteringstreff.svar_ja
            : UmamiEvent.Rekrutteringstreff.svar_nei,
        );
      } else {
        setVisFeilmelding(true);
      }
    } catch (error) {
      logger.error(
        `Feil ved sending av svar for rekrutteringstreff ${rekrutteringstreffId}`,
        error,
      );
      setVisFeilmelding(true);
    }
  }

  const [svar, setSvar] = useState<boolean | null>(gjeldendeSvar);
  const [visFeilmelding, setVisFeilmelding] = useState<boolean>(false);

  return (
    <Modal
      open={erÅpen}
      width='600px'
      onClose={() => {
        onClose();
      }}
      header={{
        closeButton: true,
        heading: 'Svar på om du vil komme',
      }}
      closeOnBackdropClick={true}
    >
      <Modal.Body>
        <VStack gap='space-24'>
          <IkonOgTekst
            ikon={<HandHeartIcon />}
            tekst={`Vi ønsker å gi deg sjansen til å utforske jobbmuligheter på en enkel og uformell måte.`}
          />
          <IkonOgTekst
            ikon={<HeartIcon />}
            tekst={`Det er frivillig å delta.`}
          />
          <IkonOgTekst
            ikon={<PersonGroupIcon />}
            tekst={`Hvis du ikke vil eller kan, setter vi stor pris på om du sier ifra slik at noen andre får sjansen.`}
          />
          <IkonOgTekst
            ikon={<ArrowsCirclepathIcon />}
            tekst={`Du kan endre svaret ditt frem til svarfristen.`}
          />
          <RadioGroup
            legend='Kommer du på rekrutteringstreffet?'
            value={svar}
            onChange={(value) => setSvar(value)}
          >
            <Radio value={true} size='small'>
              <span className='mr-2' aria-hidden='true'>
                👍
              </span>
              <span className='text-base'>Ja, jeg kommer</span>
            </Radio>
            <Radio value={false} size='small'>
              <span className='mr-2' aria-hidden='true'>
                👎
              </span>
              <span className='text-base'>Nei, jeg kommer ikke</span>
            </Radio>
          </RadioGroup>
          <Boks>
            <div aria-hidden='true'>🔥🔥🔥</div>
            <div className='font-bold'>{svarfristSomTekst(svarfrist)}</div>
            {!erDatoPassert(svarfrist) && (
              <div>
                Du kan endre svaret ditt frem til {formatterDato(svarfrist)}
              </div>
            )}
            {erDatoPassert(svarfrist) && (
              <div>
                Du kan fremdeles endre svaret ditt frem til treffet starter
              </div>
            )}
          </Boks>
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => avgiSvarClicked(svar as boolean)}
          disabled={svar === null}
        >
          Send
        </Button>
        <Button variant='secondary' onClick={() => onClose()}>
          Avbryt
        </Button>
        {visFeilmelding && (
          <div
            role='alert'
            aria-live='assertive'
            className='text-red-600 mb-6 text-base font-semibold'
          >
            Noe gikk galt ved sending av svar, vennligst prøv igjen senere.
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SvarModal;
