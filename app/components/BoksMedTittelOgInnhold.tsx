import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import Boks from "@/app/components/Boks";

export interface BoksMedTittelOgInnholdProps {
  children?: React.ReactNode | undefined;
  ikon?: React.ReactNode | undefined;
  tittel: string;
  className?: string;
  fargeKode?: 'grå' | 'blå';
}

const BoksMedTittelOgInnhold: React.FC<BoksMedTittelOgInnholdProps> = ({
  children,
  ikon,
  tittel,
  className,
  fargeKode,
}) => {
  return (
      <Boks fargeKode={fargeKode || "grå"} className={className}>
        <div className='mb-4 flex items-center'>
          {ikon && (
              <div
                  className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[var(--a-gray-900)]'>
                {ikon}
              </div>
          )}
          <Heading size='xsmall'>{tittel}</Heading>
        </div>
        <div className="text-base">
          {children}
        </div>
      </Boks>
  );
};

export default BoksMedTittelOgInnhold;
