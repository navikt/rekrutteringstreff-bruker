import { isLocal } from '@/app/util';
import { filtrerApmHendelse } from '@/app/util/apm';
import { initNaisAPMClient } from '@nais/apm/react';
import { DEKORATØR_URLER } from '@navikt/toi-next-frontend/apm';

if (!isLocal) {
  initNaisAPMClient({
    namespace: 'toi',
    tracing: true,
    sessionReplay: { enabled: false },
    screenshotOnError: false,
    beforeSend: filtrerApmHendelse,
    faro: {
      ignoreUrls: [...DEKORATØR_URLER],
    },
  });
}
