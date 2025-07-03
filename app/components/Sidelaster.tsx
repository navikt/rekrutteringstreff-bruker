import { Loader } from '@navikt/ds-react';
import * as React from 'react';

const Sidelaster: React.FC = () => {
  return (
    <div className='flex justify-center pt-10'>
      <Loader size='xlarge' title='Laster...' />
    </div>
  );
};

export default Sidelaster;
