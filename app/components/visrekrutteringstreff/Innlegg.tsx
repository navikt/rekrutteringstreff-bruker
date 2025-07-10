import {InnleggDTO} from "@/app/api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff";
import * as React from 'react';
import GråBoks from "@/app/components/GråBoks";
import DOMPurify from "dompurify";

export interface ArbeigsgiverProps {
    innlegg: InnleggDTO;
}

const Innlegg: React.FC<ArbeigsgiverProps> = ({innlegg}) => {
  return (
      <GråBoks tittel={innlegg.tittel}>
          <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(innlegg.htmlContent)}} />
      </GråBoks>
  );
};

export default Innlegg;
