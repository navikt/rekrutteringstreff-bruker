'use client';

import { useEnkeltRekrutteringstreff } from '../../api/rekrutteringstreff-minside/useEnkeltRekrutteringstreff';
import SWRLaster from '../../components/SWRLaster';
import * as React from 'react';

export interface VisRekrutteringstreffProps {
  rekrutteringstreffId: string;
}

const VisRekrutteringstreff: React.FC<VisRekrutteringstreffProps> = ({
  rekrutteringstreffId,
}) => {

  const enkeltRekrutteringstreffHook = useEnkeltRekrutteringstreff(rekrutteringstreffId);


  return (
    <SWRLaster hooks={[enkeltRekrutteringstreffHook]}>
      {(rekrutteringstreffData) => (
        <div className='flex flex-col gap-4'>
          <div>Id: {rekrutteringstreffId}</div>
          <div>Tittel: {rekrutteringstreffData.tittel}</div>
          <div>Sted: {rekrutteringstreffData.sted}</div>
          <div>Fra: {rekrutteringstreffData.fraTid}</div>
          <div>Til: {rekrutteringstreffData.tilTid}</div>
          <div>{rekrutteringstreffData.beskrivelse}</div>
          <div>Base URL: {process.env.NEXT_PUBLIC_BASE_URL}</div>
          <div>Login URL: {process.env.NEXT_PUBLIC_LOGIN_URL}</div>
        </div>
      )}
    </SWRLaster>
  );
};

export default VisRekrutteringstreff;
