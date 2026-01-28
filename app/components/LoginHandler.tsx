'use client';

import { useEffect, useState } from 'react';
import {isLocal} from "@/app/util";
import Sidelaster from "@/app/components/Sidelaster";

interface LoginHandlerProps {
  children: React.ReactNode;
}

export default function LoginHandler({ children }: LoginHandlerProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const sessionUrl =
    process.env.NEXT_PUBLIC_SESSION_URL ||
    'https://login.ekstern.dev.nav.no/oauth2/session';
  const loginUrl =
    process.env.NEXT_PUBLIC_LOGIN_URL ||
    'https://login.ekstern.dev.nav.no/oauth2/login';

  useEffect(() => {
    if (isLocal) {
      // I lokal utvikling hopper vi over autentisering
      setIsChecking(false);
      setIsAuthenticated(true);
      return;
    }

    const fetchSessionInfo = async () => {
      try {
        console.log(`Henter session fra ${sessionUrl} og loginUrl ${loginUrl}`);
        const response = await fetch(sessionUrl, {
          credentials: 'include',
        });

        if (response.status === 401) {
          // Ikke pålogget – redirect til login
          const rekrutteringstreffId = window.location.pathname.split('/').at(-1);
          console.log(`RekrutteringstreffId: ${rekrutteringstreffId}`);
          window.location.href = `${loginUrl}?redirect=${window.location.origin}/rekrutteringstreff/${rekrutteringstreffId}&level=Level3`;
          return;
        }

        // Alle andre 2xx/3xx-responser tolkes som "pålogget"
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          console.error('Uventet respons ved henting av session status', response.status);
        }
      } catch (e: any) {
        console.error(
          'Det oppstod en feil ved henting av session status',
          e?.message ?? e,
        );
      } finally {
        setIsChecking(false);
      }
    };

    fetchSessionInfo();
  }, [loginUrl, sessionUrl]);

  // Vis sidelaster mens vi sjekker autentisering
  if (isChecking) {
    return <Sidelaster/>;
  }

  // Vis children kun når brukeren er autentisert
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
