'use client';

import './globals.css';
import { rapporterFeil } from '@/app/util/apm';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    rapporterFeil(error);
  }, [error]);

  return (
    <html lang='no'>
      <body>
        <main className='mx-auto my-10 max-w-xl px-4 text-center'>
          <Heading level='1' size='medium' spacing>
            Noe gikk galt
          </Heading>
          <BodyShort spacing>Vennligst prøv igjen senere.</BodyShort>
          <Button onClick={retry}>Prøv igjen</Button>
        </main>
      </body>
    </html>
  );
}
