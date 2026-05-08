'use client';

import { InnleggDTO } from '@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import BoksMedTittelOgInnhold from '@/app/components/BoksMedTittelOgInnhold';
import { Tag } from '@navikt/ds-react';
import DOMPurify from 'dompurify';
import * as React from 'react';

export interface InnleggProps {
  innlegg: InnleggDTO;
}

const Innlegg: React.FC<InnleggProps> = ({ innlegg }) => {
  return (
    <BoksMedTittelOgInnhold tittel={innlegg.tittel}>
      <div
        className='[&_ul]:list-disc [&_ul]:pl-6'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(innlegg.htmlContent),
        }}
      />
      <Tag
        variant='moderate'
        data-color='meta-purple'
        className='text-base mt-4'
      >
        Teksten er sjekket av KI
      </Tag>
    </BoksMedTittelOgInnhold>
  );
};

export default Innlegg;
