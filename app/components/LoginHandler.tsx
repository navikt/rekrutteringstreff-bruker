'use client';

import { useEffect, useState } from 'react';
import {isLocal} from "@/app/util";
import Sidelaster from "@/app/components/Sidelaster";
import {getServerEnv} from "@/app/util/env";

interface LoginHandlerProps {
  children: React.ReactNode;
}

export default function LoginHandler({ children }: LoginHandlerProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const serverEnv = getServerEnv()

  const sessionUrl = serverEnv.SESSION_URL;
  const loginUrl = serverEnv.LOGIN_URL;

  console.log("LOGIN_URL", loginUrl);

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
