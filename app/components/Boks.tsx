import { Box } from '@navikt/ds-react';
import * as React from 'react';

export interface GråBoksProps {
  children?: React.ReactNode | undefined;
  className?: string;
  fargeKode?: 'grå' | 'blå';
}

const Boks: React.FC<GråBoksProps> = ({
  children,
  className,
  fargeKode
}) => {
  return (
    <Box
      padding='space-16'
      background={fargeKode === 'blå' ? "surface-alt-3-subtle" : "bg-subtle"}
      borderRadius="large"
      borderColor={fargeKode === 'blå' ? "border-subtle" : "border-default"}
      borderWidth={fargeKode === 'blå' ? "1" : "0"}
      className={"mb-5 " + className}
    >
        {children}
    </Box>
  );
};

export default Boks;
