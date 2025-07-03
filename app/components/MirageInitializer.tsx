'use client';

import { makeServer } from '../../mocks/mirage';
import Sidelaster from './Sidelaster';
import { useEffect, useState } from 'react';

let mirageServer: any = null;

export default function MirageInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!mirageServer) {
      try {
        // eslint-disable-next-line no-console
        console.log('Starter Mirage server...');
        mirageServer = makeServer({ environment: 'development' });
        // eslint-disable-next-line no-console
        console.log('Mirage server startet');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('klarte ikke å starte Mirage server:', error);
      }
    }

    setIsInitialized(true);

    return () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', () => {
          if (mirageServer) {
            // eslint-disable-next-line no-console
            console.log('Stopper Mirage...');
            mirageServer.shutdown();
            mirageServer = null;
          }
        });
      }
    };
  }, []);

  if (!isInitialized) {
    return <Sidelaster />;
  }

  return <>{children}</>;
}
