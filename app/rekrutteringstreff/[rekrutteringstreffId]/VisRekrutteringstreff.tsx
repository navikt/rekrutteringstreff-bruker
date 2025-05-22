import { useEnkeltRekrutteringstreff } from '../../api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import SWRLaster from '../../components/SWRLaster';
import * as React from 'react';

export interface VisRekrutteringstreffProps {
  rekrutteringstreffId: string;
}

const VisRekrutteringstreff: React.FC<VisRekrutteringstreffProps> = ({
  rekrutteringstreffId,
}) => {
  const enkeltRekrutteringstreffHook =
    useEnkeltRekrutteringstreff(rekrutteringstreffId);

  return (
    <SWRLaster hooks={[enkeltRekrutteringstreffHook]}>
      {(rekrutteringstreffData) => (
        <div className='flex flex-col gap-4'>
          <div>
            {rekrutteringstreffId} = {rekrutteringstreffData.id}
          </div>
          <div>{rekrutteringstreffData.tittel}</div>
          <div>{rekrutteringstreffData.sted}</div>
          <div>{rekrutteringstreffData.fraTid}</div>
          <div>{rekrutteringstreffData.tilTid}</div>
          <div>{rekrutteringstreffData.beskrivelse}</div>
        </div>
      )}
    </SWRLaster>
  );
};

export default VisRekrutteringstreff;
