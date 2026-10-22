import { handlers } from './handlers';
import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...handlers);

// Playwright-testene bruker denne til å overstyre handlere, fordi page.route
// ikke ser kall som MSW besvarer i service workeren.
export const mswForTester = { worker, http, HttpResponse };
