import VisRekrutteringstreff from './VisRekrutteringstreff';
import LoginHandler from '@/app/components/LoginHandler';
import RekrutteringstreffIkkeFunnet from '@/app/components/visrekrutteringstreff/RekrutteringstreffIkkeFunnet';
import { getServerEnv } from '@/app/util/env';
import { erGyldigRekrutteringstreffId } from '@/app/util/rekrutteringstreffId';

export default async function RekrutteringstreffPage({
  params,
}: {
  params: Promise<{ rekrutteringstreffId: string }>;
}) {
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
