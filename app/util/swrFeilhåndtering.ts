import { ApiFeil } from '@/app/api/fetcher';
import { rapporterApiFeil } from '@/app/util/apm';
import { logger } from '@navikt/next-logger';

interface SWRFeilhåndteringOptions {
  loginUrl: string;
  funksjon: string;
}

export function opprettSWRFeilhåndtering({
  funksjon,
  loginUrl,
}: SWRFeilhåndteringOptions) {
  return {
    onError: (error: unknown) => {
      if (error instanceof ApiFeil) {
        if (error.status === 401) {
          const originUrl = window.location.href;
          window.location.href = `${loginUrl}?redirect=${originUrl}`;
          return;
        }
        rapporterApiFeil(error.status, error.url);
        logger.error(
          {
            funksjon,
            url: window.location.pathname,
            err: error,
            status: error.status,
            errorType: typeof error,
          },
          `${funksjon} kunne ikke hente data: ${error.message}`,
        );
        return;
      } else {
        logger.error(
          {
            error,
          },
          'Feil kastet i SWR Feilhåndtering',
        );
      }
    },
  };
}
