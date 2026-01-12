import './globals.css';
import MirageInitializer from '@/app/components/MirageInitializer';
import { UmamiProvider } from '@/app/providers/UmamiContext';
import { isLocal } from '@/app/util';
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Rekrutteringstreff-bruker',
  description: 'Bruker for rekrutteringstreff',
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
    <html lang='no' className='h-full'>
      <head>
        <Decorator.HeadAssets />
      </head>
      <body style={{ scrollbarGutter: 'stable' }}>
        <div data-pa11y-ignore='decorator-header'>
          {' '}
          <Decorator.Header />{' '}
        </div>
        <UmamiProvider>
          <BrukLokalMock>
            <main
              className='flex-grow flex flex-col contentContainer'
              style={{ scrollbarGutter: 'stable' }}
            >
              {children}
            </main>
          </BrukLokalMock>
        </UmamiProvider>
        <div data-pa11y-ignore='decorator-footer'>
          {' '}
          <Decorator.Footer />
        </div>
        <Decorator.Scripts loader={Script} />
      </body>
    </html>
  );
}

const BrukLokalMock = ({ children }: { children: React.ReactNode }) => {
  if (isLocal) {
    return <MirageInitializer>{children}</MirageInitializer>;
  }
  return children;
};
