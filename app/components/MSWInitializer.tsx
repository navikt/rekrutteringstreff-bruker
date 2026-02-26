'use client';

import Sidelaster from './Sidelaster';
import { useEffect, useState } from 'react';

export default function MSWInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      const { worker } = await import('../../mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/rekrutteringstreff/mockServiceWorker.js',
        },
      });
      setIsReady(true);
    }
    init();
  }, []);

  if (!isReady) {
    return <Sidelaster />;
  }

  return <>{children}</>;
}
