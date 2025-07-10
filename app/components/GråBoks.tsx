import { Box, Heading } from '@navikt/ds-react';
import * as React from 'react';

export interface GråBoksProps {
  children?: React.ReactNode | undefined;
  ikon?: React.ReactNode | undefined;
  tittel: string;
  className?: string;
}

const GråBoks: React.FC<GråBoksProps> = ({
  children,
  ikon,
  tittel,
  className,
}) => {
  return (
    <Box
      padding='space-16'
      marginBlock='space-16'
      background='bg-subtle'
      borderRadius="xlarge"
      className={"" + className}
    >
      <div className='mb-4 flex items-center'>
        {ikon && (
          <div className='mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[var(--a-gray-900)]'>
            {ikon}
          </div>
        )}
        <Heading size='small'>{tittel}</Heading>
      </div>
      {children}
    </Box>
  );
};

export default GråBoks;
