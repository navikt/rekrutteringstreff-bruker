import './globals.css';
import MSWInitializer from '@/app/components/MSWInitializer';
import PageWrapper from '@/app/components/PageWrapper';
import LoggerProvider from '@/app/providers/LoggerProvider';
import { UmamiProvider } from '@/app/providers/UmamiContext';
import { isLocal } from '@/app/util';
import { APPNAVN } from '@/app/util/sidetittel';
import { versionFromImage } from '@nais/apm';
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';
import { connection } from 'next/server';

export async function generateMetadata(): Promise<Metadata> {
  await connection();
  return {
    title: APPNAVN,
    description: 'Rekrutteringstreff',
    other: {
      'nais-app': process.env.NAIS_APP_NAME ?? 'rekrutteringstreff-bruker',
      'nais-team': 'toi',
      'nais-cluster': process.env.NAIS_CLUSTER_NAME ?? 'local',
      'nais-version': versionFromImage(process.env.NAIS_APP_IMAGE) ?? 'local',
      ...(process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL && {
        'nais-telemetry-url': process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
      }),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const env = process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? 'prod' : 'dev';

  const Decorator = await fetchDecoratorReact({
    env: env,
    params: {
      utilsBackground: 'white',
      context: 'privatperson',
      redirectToApp: true,
      breadcrumbs: [
        {
          title: 'Rekrutteringstreff',
          url: '/rekrutteringstreff',
        },
      ],
    },
  });

  return (
    <html lang='no'>
      <head>
        <Decorator.HeadAssets />
      </head>
      <body style={{ scrollbarGutter: 'stable' }}>
        <PageWrapper
          footer={
            <div data-axe-ignore>
              <Decorator.Footer />
            </div>
          }
        >
          <div data-axe-ignore>
            <Decorator.Header />
          </div>
          <UmamiProvider>
            <LoggerProvider>
              <BrukLokalMock>
                <main id='maincontent'>{children}</main>
              </BrukLokalMock>
            </LoggerProvider>
          </UmamiProvider>
        </PageWrapper>
        <Decorator.Scripts loader={Script} />
      </body>
    </html>
  );
}

const BrukLokalMock = ({ children }: { children: React.ReactNode }) => {
  if (isLocal) {
    return <MSWInitializer>{children}</MSWInitializer>;
  }
  return children;
};
