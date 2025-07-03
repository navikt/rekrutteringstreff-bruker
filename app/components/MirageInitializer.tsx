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
        console.log('Starter Mirage server...');
        mirageServer = makeServer({ environment: 'development' });
        console.log('Mirage server startet');
      } catch (error) {
        console.error('klarte ikke å starte Mirage server:', error);
      }
    }

    setIsInitialized(true);

    return () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', () => {
          if (mirageServer) {
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
