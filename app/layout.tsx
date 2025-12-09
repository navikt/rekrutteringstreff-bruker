import './globals.css';
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';
import {isLocal} from "@/app/util";
import MirageInitializer from "@/app/components/MirageInitializer";
import LoginHandler from "@/app/components/LoginHandler";
import {UmamiProvider} from "@/app/providers/UmamiContext";

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
   env: "prod",
    params: {
        utilsBackground: "white",
        context: "privatperson",
        redirectToApp: true,
        breadcrumbs: [
            {
                title: "Rekrutteringstreff",
                url: "/rekrutteringstreff",
            }
        ],
    },
  });

    return (
        <html lang='no' className='h-full'>
            <head>
                <Decorator.HeadAssets />
            </head>
            <body style={{scrollbarGutter: 'stable'}}>
                <Decorator.Header />
                {!isLocal && <LoginHandler />}
                <UmamiProvider>
                    <BrukLokalMock>
                        <main className='flex-grow flex flex-col contentContainer' style={{'scrollbarGutter': 'stable'}}>
                            {children}
                        </main>
                    </BrukLokalMock>
                </UmamiProvider>
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
