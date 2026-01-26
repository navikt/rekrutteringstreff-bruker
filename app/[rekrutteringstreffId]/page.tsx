import VisRekrutteringstreff from './VisRekrutteringstreff';
import {isLocal} from "@/app/util";
import LoginHandler from "@/app/components/LoginHandler";

export default async function RekrutteringstreffPage({
  params,
}: {
  params: Promise<{ rekrutteringstreffId: string }>;
}) {
  const { rekrutteringstreffId } = await params;

  if (!rekrutteringstreffId) {
    return <div>Ingen rekrutteringstreffId oppgitt.</div>;
  }

  return (
      <>
        {!isLocal && <LoginHandler />}
        <VisRekrutteringstreff rekrutteringstreffId={rekrutteringstreffId} />;
      </>
  );
}
