import * as React from 'react';
import {BodyLong, Heading, VStack} from "@navikt/ds-react";

export interface HeadingMedBodyProps {
    heading: string;
    children: React.ReactNode;
}

const HeadingMedBody: React.FC<HeadingMedBodyProps> = ({heading, children}) => {
  return (
    <div className='flex justify-center items-center min-h-full'>
      <VStack
        gap="space-32"
        align='start'
        style={{
          padding: '2rem',
          margin: '0 0 2rem 0',
          backgroundColor: 'white',
          borderRadius: '4px',
        }}
      >
        <Heading level='1' size='xlarge'>
            {heading}
        </Heading>
        <BodyLong>
            {children}
        </BodyLong>
      </VStack>
    </div>
  );
};

export default HeadingMedBody;
