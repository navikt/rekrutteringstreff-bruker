import {HStack, VStack} from '@navikt/ds-react';
import * as React from 'react';

export interface ITekstMedIkon {
  ikon?: React.ReactElement;
  title?: string;
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

const IkonMedInnhold: React.FC<ITekstMedIkon> = ({children,
  ikon,
  title,
  ariaLabel,
  className,
}) => {
  return (
      <div
          className={`flex ${className}`}
          title={title}
          aria-label={title || ariaLabel}
      >
        <HStack gap={"space-12"}>
          <VStack aria-hidden="true">
            {ikon}
          </VStack>
          <VStack>
            {children}
          </VStack>
        </HStack>
      </div>
  );
};

export default IkonMedInnhold;
