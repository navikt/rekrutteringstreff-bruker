import './globals.css';
import MSWInitializer from '@/app/components/MSWInitializer';
import PageWrapper from '@/app/components/PageWrapper';
import LoggerProvider from '@/app/providers/LoggerProvider';
import { UmamiProvider } from '@/app/providers/UmamiContext';
import { isLocal } from '@/app/util';
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Rekrutteringstreff',
  description: 'Rekrutteringstreff',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Decorator = await fetchDecoratorReact({
    env: 'prod',
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
            <div data-pa11y-ignore='decorator-footer'>
              <Decorator.Footer />
            </div>
          }
        >
          <div data-pa11y-ignore='decorator-header'>
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
