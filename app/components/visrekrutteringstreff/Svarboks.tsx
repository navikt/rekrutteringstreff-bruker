import {Box, Button, HStack} from '@navikt/ds-react';
import * as React from 'react';
import {antallDagerTilDato, formatterDato} from "@/app/util";

export interface SvarboksProps {
    svarfrist: string | null;
}

const Svarboks: React.FC<SvarboksProps> = ({svarfrist}) => {
  return (
      <Box
          padding='space-16'
          background='surface-alt-3-subtle'
          borderRadius="large"
          borderWidth="1"
          borderColor="border-subtle"
            className="mb-8"
      >
        <HStack className="text-base" align={"center"} justify="space-between">
            <div style={{width: '70%'}}>
                <div>🔥🔥🔥</div>
                <div className="font-bold">Utløper om {antallDagerTilDato(svarfrist)} dager</div>
                <div>Du kan endre svaret ditt frem til {formatterDato(svarfrist)}</div>
            </div>
            <div className="align-middle">
                <Button variant="primary">Svar</Button>
            </div>
        </HStack>
      </Box>
);
};

export default Svarboks;
