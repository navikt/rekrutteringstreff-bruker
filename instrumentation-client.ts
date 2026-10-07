import { isLocal } from '@/app/util';
import { filtrerApmHendelse } from '@/app/util/apm';
import { initNaisAPMClient } from '@nais/apm/react';

if (!isLocal) {
  initNaisAPMClient({
    namespace: 'toi',
    tracing: true,
    sessionReplay: { enabled: false },
    screenshotOnError: false,
    beforeSend: filtrerApmHendelse,
  });
}
