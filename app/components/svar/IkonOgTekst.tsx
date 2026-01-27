import * as React from 'react';
import {HGrid} from "@navikt/ds-react";

export interface IkonOgTekstProps {
    ikon: React.ReactNode;
    tekst: string;
}

const IkonOgTekst: React.FC<IkonOgTekstProps> = ({ikon, tekst}) => {
  return (
      <HGrid columns={{xs: "7% 93%"}} gap="space-0">
          {ikon}
          <span className="text-base">{tekst}</span>
      </HGrid>
  );
};

export default IkonOgTekst;
