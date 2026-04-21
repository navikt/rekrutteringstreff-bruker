import Boks from '@/app/components/Boks';
import BoksMedTittelOgInnhold from '@/app/components/BoksMedTittelOgInnhold';
import SvarModal from '@/app/components/svar/SvarModal';
import PåmeldtChips from '@/app/components/visrekrutteringstreff/PåmeldtChips';
import {
  erDatoPassert,
  erMellomDatoer,
  formatterDato,
  svarfristSomTekst,
} from '@/app/util';
import { XMarkOctagonIcon } from '@navikt/aksel-icons';
import { Button, HStack, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { useState } from 'react';

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

const Svarboks: React.FC<SvarboksProps> = ({
  erInvitert,
  harSvart,
  erPåmeldt,
  svarfrist,
  fraTid,
  tilTid,
  rekrutteringstreffId,
  svarEndret,
  laster,
  status,
}) => {
  const [isSvarModalOpen, setSvarModalOpen] = useState(false);

  if (laster) {
    return (
      <Boks fargeKode={'blå'} className='mb-8 flex justify-center '>
        <Loader title='Laster...' />
      </Boks>
    );
  }

  if (status === 'AVLYST') {
    return (
      <Boks
        fargeKode='hvit'
        borderColor='danger-strong'
        borderWidth='2'
        className='mb-8'
      >
        <div aria-hidden='true'>
          <XMarkOctagonIcon
            title='Avlyst ikon'
            fontSize='1.7rem'
            color='var(--a-text-danger)'
          />
        </div>
        <div className='font-bold mt-2 text-base'>Arrangement avlyst</div>
        <p className='text-base'>
          Vi beklager ulempene dette medfører, og vil informere dersom treffet
          settes opp på nytt.
        </p>
      </Boks>
    );
  }

  if (erDatoPassert(tilTid)) {
    return (
      <Boks fargeKode={'hvit'} className='mb-8'>
        <div aria-hidden='true'>🎉</div>
        <p className='font-bold mt-2 text-base'>Treffet er over</p>
      </Boks>
    );
  }

  if (erMellomDatoer(fraTid, tilTid)) {
    return (
      <Boks fargeKode={'hvit'} className='mb-8'>
        <div aria-hidden='true'>⏱️️⏱️️⏱️️</div>
        <div className='font-bold mt-2 text-base'>Treffet er i gang</div>
        <p className='text-base'>
          Nå er sjansen din. Prat med arbeidsgivere du synes er interessante for
          deg.
        </p>
      </Boks>
    );
  }

  if (!harSvart && erDatoPassert(svarfrist)) {
    return (
      <Boks fargeKode={'hvit'} className='mb-8'>
        <div aria-hidden='true'>⏱️️⏱️️⏱️️</div>
        <p className='font-bold mt-2 text-base'>Svarfristen er utløpt</p>
      </Boks>
    );
  }

  if (!erInvitert) {
    return (
      <BoksMedTittelOgInnhold
        fargeKode={'blå'}
        className='mb-8'
        tittel='Vil du være med?'
      >
        <p className='text-base'>
          Du har ikke mottatt invitasjon til dette rekrutteringstreffet. Dersom
          du er interessert kan du kontakte veilederen din i dialogen og be hen
          sjekke om du kan få en invitasjon.
        </p>
      </BoksMedTittelOgInnhold>
    );
  }

  const harSvartSomBooleanEllerNull = () => {
    if (!harSvart) {
      return null;
    }
    return erPåmeldt;
  };

  const svarModalElement = (
    <SvarModal
      erÅpen={isSvarModalOpen}
      onClose={() => setSvarModalOpen(false)}
      svarEndret={(svar: boolean) => svarEndret(svar)}
      svarfrist={svarfrist}
      rekrutteringstreffId={rekrutteringstreffId}
      gjeldendeSvar={harSvartSomBooleanEllerNull()}
    />
  );

  if (!harSvart) {
    return (
      <>
        <Boks fargeKode={'blå'} className='mb-8'>
          <HStack
            className='text-base'
            align={'center'}
            justify='space-between'
          >
            <div style={{ width: '70%' }}>
              <div aria-hidden='true'>🔥🔥🔥</div>
              <p className='font-bold'>{svarfristSomTekst(svarfrist)}</p>
              <p>
                Du kan endre svaret ditt frem til {formatterDato(svarfrist)}
              </p>
            </div>
            <div className='align-middle'>
              <Button variant='primary' onClick={() => setSvarModalOpen(true)}>
                Svar
              </Button>
            </div>
          </HStack>
        </Boks>
        {svarModalElement}
      </>
    );
  }

  return (
    <>
      <Boks fargeKode={'hvit'} className='mb-8'>
        <HStack className='text-base' align={'center'} justify='space-between'>
          <div style={{ width: '60%' }}>
            <div className='font-bold'>
              <PåmeldtChips erPåmeldt={erPåmeldt} />
            </div>
            {!erDatoPassert(svarfrist) && (
              <p className='py-2'>
                Du kan endre svaret ditt frem til {formatterDato(svarfrist)}
              </p>
            )}
            {erDatoPassert(svarfrist) && (
              <p className='py-2'>
                Svarfristen er utløpt, men du kan fremdeles endre svaret ditt
                frem til treffet starter
              </p>
            )}
          </div>
          <div className='align-middle '>
            <Button
              variant='secondary'
              className='place-self-end'
              size='medium'
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
