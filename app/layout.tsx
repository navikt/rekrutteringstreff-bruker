import './globals.css';
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';
import {isLocal} from "@/app/util";
import MirageInitializer from "@/app/components/MirageInitializer";

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
    env: 'dev', //TODO Set env variable
  });

  return (
    <html lang='no' className='h-full'>
      <head>
        <Decorator.HeadAssets />
      </head>
      <body className='flex flex-col h-full'>
        <Decorator.Header />
        <BrukLokalMock>
            <main className='flex-grow flex flex-col'> {children}</main>
        </BrukLokalMock>
        <Decorator.Footer />
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
