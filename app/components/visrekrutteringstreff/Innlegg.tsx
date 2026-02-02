'use client';

import {InnleggDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import DOMPurify from "dompurify";
import BoksMedTittelOgInnhold from "@/app/components/BoksMedTittelOgInnhold";
import {Tag} from "@navikt/ds-react";

export interface InnleggProps {
    innlegg: InnleggDTO;
}

const Innlegg: React.FC<InnleggProps> = ({innlegg}) => {
  return (
      <BoksMedTittelOgInnhold tittel={innlegg.tittel}>
          <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(innlegg.htmlContent)}} />
          <Tag variant="moderate" data-color="meta-purple" className="text-base">Teksten er kvalitetssikret av KI</Tag>
      </BoksMedTittelOgInnhold>
  );
};

export default Innlegg;
