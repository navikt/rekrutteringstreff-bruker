import VisRekrutteringstreff from './VisRekrutteringstreff';

export default async function RekrutteringstreffPage({
  params,
}: {
  params: Promise<{ rekrutteringstreffId: string }>;
}) {
  const { rekrutteringstreffId } = await params;

  if (!rekrutteringstreffId) {
    return <div>Ingen rekrutteringstreffId oppgitt.</div>;
  }

  return <VisRekrutteringstreff rekrutteringstreffId={rekrutteringstreffId} />;
}
