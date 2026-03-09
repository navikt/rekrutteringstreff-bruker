import VisRekrutteringstreff from './VisRekrutteringstreff';
import LoginHandler from "@/app/components/LoginHandler";
import {getServerEnv} from "@/app/util/env";

export default async function RekrutteringstreffPage({
  params,
}: {
  params: Promise<{ rekrutteringstreffId: string }>;
}) {
  const { rekrutteringstreffId } = await params;

  if (!rekrutteringstreffId) {
    return <div>Ingen rekrutteringstreffId oppgitt.</div>;
  }

  const serverEnv = getServerEnv()

  return (
      <LoginHandler sessionUrl={serverEnv.SESSION_URL} loginUrl={serverEnv.LOGIN_URL}>
          <VisRekrutteringstreff rekrutteringstreffId={rekrutteringstreffId} />
      </LoginHandler>
  );
}
