import VisRekrutteringstreff from './VisRekrutteringstreff';
import LoginHandler from '@/app/components/LoginHandler';
import RekrutteringstreffIkkeFunnet from '@/app/components/visrekrutteringstreff/RekrutteringstreffIkkeFunnet';
import { getServerEnv } from '@/app/util/env';
import { erGyldigRekrutteringstreffId } from '@/app/util/rekrutteringstreffId';
import { sidetittel } from '@/app/util/sidetittel';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ rekrutteringstreffId: string }>;
};

// Tittelen er fast fordi treffet hentes i nettleseren, og navn skal ikke sendes til Umami.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rekrutteringstreffId } = await params;
  return {
    title: sidetittel(
      erGyldigRekrutteringstreffId(rekrutteringstreffId)
        ? 'Treff'
        : 'Treff ikke funnet',
    ),
  };
}

export default async function RekrutteringstreffPage({ params }: Props) {
  const { rekrutteringstreffId } = await params;

  if (!rekrutteringstreffId) {
    return <div>Ingen rekrutteringstreffId oppgitt.</div>;
  }

  if (!erGyldigRekrutteringstreffId(rekrutteringstreffId)) {
    return <RekrutteringstreffIkkeFunnet />;
  }

  const serverEnv = getServerEnv();

  return (
    <LoginHandler
      sessionUrl={serverEnv.SESSION_URL}
      loginUrl={serverEnv.LOGIN_URL}
    >
      <VisRekrutteringstreff
        rekrutteringstreffId={rekrutteringstreffId}
        loginUrl={serverEnv.LOGIN_URL}
      />
    </LoginHandler>
  );
}
