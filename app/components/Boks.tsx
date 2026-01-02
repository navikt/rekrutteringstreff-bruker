import { Box } from '@navikt/ds-react';
import * as React from 'react';

export interface BoksProps {
  children?: React.ReactNode | undefined;
  className?: string;
  fargeKode?: 'grå' | 'blå' | 'hvit';
  borderColor?: 'border-danger';
}

const Boks: React.FC<BoksProps> = ({
  children,
  className,
  fargeKode,
  borderColor,
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

  const borderColorFraFargeKode = fargeKode === 'blå' || fargeKode === 'hvit' ? "border-subtle" : "border-default"

  return (
    <Box
      padding='space-16'
      background={bakrunnsfarge(fargeKode)}
      borderRadius="large"
      borderColor={borderColor || borderColorFraFargeKode}
      borderWidth={fargeKode === 'blå' || fargeKode === 'hvit' ? "1" : "0"}
      className={"mb-5 " + className}
    >
        {children}
    </Box>
  );
};

export default Boks;
