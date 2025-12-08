'use client';

import { logger } from '@navikt/next-logger';
import { createContext, ReactNode, useContext } from 'react';
import {UmamiEventObject} from "@/app/util/umamiEvents";
import {getAnalyticsInstance} from "@navikt/nav-dekoratoren-moduler";

interface UmamiContextType {
  track: (event: UmamiEventObject, eventData?: Record<string, any>) => void;
}

const UmamiContext = createContext<UmamiContextType | undefined>(undefined);

interface UmamiProviderProps {
  children: ReactNode;
}

export const UmamiProvider = ({ children }: UmamiProviderProps) => {
  const analyticsInstance = getAnalyticsInstance("rekrutteringstreff-bruker");
  console.log("analyticsInstance", analyticsInstance);

  const track = (event: UmamiEventObject, eventData?: Record<string, any>) => {
    if (analyticsInstance) {
      logger.info(event, 'Logger Umami event');
      analyticsInstance(event.navn, {
          ...eventData,
          domene: event.domene,
      });
    } else {
      logger.error(event, 'Umami script er ikke lastet');
    }
  };

  return (
    <UmamiContext.Provider value={{ track }}>
      {children}
    </UmamiContext.Provider>
  );
};

export const useUmami = (): UmamiContextType => {
  const context = useContext(UmamiContext);
  if (context === undefined) {
    throw new Error('useUmami must be used within a UmamiProvider');
  }
  return context;
};
