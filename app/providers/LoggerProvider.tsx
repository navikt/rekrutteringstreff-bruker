'use client';

import { configureLogger } from '@navikt/next-logger';

configureLogger({
  basePath: '/rekrutteringstreff',
});

export default function LoggerProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
