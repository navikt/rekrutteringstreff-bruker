import * as React from 'react';
import type {
  AkselColoredBorderToken,
  AkselColoredStatelessBackgroundToken,
  AkselDynamicStatelessBackgroundToken,
  AkselRootBackgroundToken, AkselRootBorderToken
} from "@navikt/ds-tokens/types";
import { Box } from "@navikt/ds-react/Box";

export interface BoksProps {
  children?: React.ReactNode | undefined;
  className?: string;
  fargeKode?: 'grå' | 'blå' | 'hvit';
  borderColor?: React.ComponentProps<typeof Box>["borderColor"];
  borderWidth?:  React.ComponentProps<typeof Box>["borderWidth"];
}

const Boks: React.FC<BoksProps> = ({
  children,
  className,
  fargeKode,
  borderColor,
  borderWidth
}) => {
  const bakrunnsfarge = (fargeKode?: string): AkselRootBackgroundToken | AkselColoredStatelessBackgroundToken | AkselDynamicStatelessBackgroundToken => {
    switch (fargeKode) {
      case "blå":
        return "accent-moderate";
      case "grå":
        return "neutral-moderate";
      case "hvit":
        return "default";
      default:
        return "accent-moderate"; // Fallback if no color is specified
    }
  }

  const borderColorFraFargeKode = fargeKode === 'blå' || fargeKode === 'hvit' ? "info-subtle" : "neutral"

  return (
    <Box
      padding='space-16'
      background={bakrunnsfarge(fargeKode)}
      borderRadius="8"
      borderColor={borderColor || borderColorFraFargeKode}
      borderWidth={borderWidth ?? (fargeKode === 'blå' || fargeKode === 'hvit' ? "1" : "0")}
      className={"mb-5 " + className}
    >
      {children}
    </Box>
  );
};

export default Boks;
