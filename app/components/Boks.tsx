import { Box } from '@navikt/ds-react';
import * as React from 'react';

export interface GråBoksProps {
  children?: React.ReactNode | undefined;
  className?: string;
  fargeKode?: 'grå' | 'blå' | 'hvit';
}

const Boks: React.FC<GråBoksProps> = ({
  children,
  className,
  fargeKode
}) => {
  const bakrunnsfarge = (fargeKode?: string) => {
    switch (fargeKode) {
      case "blå":
        return "surface-action-subtle";
      case "grå":
        return "bg-subtle";
      case "hvit":
        return "surface-default";
      default:
        return "bg-subtle"; // Fallback if no color is specified
    }
  }

  return (
    <Box
      padding='space-16'
      background={bakrunnsfarge(fargeKode)}
      borderRadius="large"
      borderColor={fargeKode === 'blå' || fargeKode === 'hvit' ? "border-subtle" : "border-default"}
      borderWidth={fargeKode === 'blå' || fargeKode === 'hvit' ? "1" : "0"}
      className={"mb-5 " + className}
    >
        {children}
    </Box>
  );
};

export default Boks;
