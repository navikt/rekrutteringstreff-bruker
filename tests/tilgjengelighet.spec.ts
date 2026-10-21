import {
  sjekkTilgjengelighet,
  tilgjengelighetstest,
} from '@navikt/toi-next-frontend/a11y';
import { expect, test, type Locator, type Page } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '1337';
const BASE_URL = `http://localhost:${PORT}/rekrutteringstreff`;

const overskrift = (page: Page) =>
  page.getByRole('heading', { level: 1 }).first();

const statusbanner = (tekst: string) => (page: Page) => page.getByText(tekst);

const sider: Record<string, (page: Page) => Locator> = {
  '': overskrift,
  'frem-i-tid': overskrift,
  'i-gang': overskrift,
  'tilbake-i-tid': overskrift,
  avlyst: overskrift,
  formattering: overskrift,
  'ikke-funnet': overskrift,
  'svarfrist-utlopt': overskrift,
  utkast: statusbanner('Rekrutteringstreffet er ikke publisert'),
  publisert: overskrift,
  fullfort: overskrift,
  slettet: statusbanner('Rekrutteringstreffet er slettet'),
  'har-svart-ja': overskrift,
  'har-svart-nei': overskrift,
  'ikke-invitert': overskrift,
  'uten-svarfrist': overskrift,
};

for (const [side, erKlar] of Object.entries(sider)) {
  test.describe(`Side /rekrutteringstreff/${side}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/${side}`);
      const consentButton = page.getByTestId('consent-banner-refuse-optional');
      if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await consentButton.click();
      }
      await expect(erKlar(page)).toBeVisible();
    });

    tilgjengelighetstest(test, { utvidet: true, reflow: true });
  });
}

test.describe('Svarmodal', () => {
  test(
    'Tilgjengelighet (WCAG 2.1 A/AA)',
    { tag: '@a11y' },
    async ({ page, browserName }, testInfo) => {
      test.skip(browserName !== 'chromium', 'axe kjøres bare i Chromium');
      await page.goto(`${BASE_URL}/frem-i-tid`);
      const consentButton = page.getByTestId('consent-banner-refuse-optional');
      if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await consentButton.click();
      }
      await page.getByRole('button', { name: 'Svar', exact: true }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await sjekkTilgjengelighet(
        page,
        { inkluder: ['dialog[open]'] },
        testInfo,
      );
    },
  );
});
