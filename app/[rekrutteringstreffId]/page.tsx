import VisRekrutteringstreff from './VisRekrutteringstreff';
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
      <LoginHandler>
          <VisRekrutteringstreff rekrutteringstreffId={rekrutteringstreffId} />
      </LoginHandler>
  );
}
