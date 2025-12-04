'use client';

import {InnleggDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import DOMPurify from "dompurify";
import BoksMedTittelOgInnhold from "@/app/components/BoksMedTittelOgInnhold";

export interface InnleggProps {
    innlegg: InnleggDTO;
}

const Innlegg: React.FC<InnleggProps> = ({innlegg}) => {
  return (
      <BoksMedTittelOgInnhold tittel={innlegg.tittel}>
          <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(innlegg.htmlContent)}} />
      </BoksMedTittelOgInnhold>
  );
};

export default Innlegg;
