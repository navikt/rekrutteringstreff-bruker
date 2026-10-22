import {
  sjekkDialog,
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

    // axe sjekker bare landemerker med best-practice-regler, som ikke kjøres.
    test(
      'Har ett hovedlandemerke (WCAG 1.3.1)',
      { tag: '@a11y' },
      async ({ page }) => {
        await expect(page.getByRole('main')).toHaveCount(1);
        await expect(page.locator('main main')).toHaveCount(0);
      },
    );

    test(
      'Har én h1 og ingen hopp i overskriftsnivåene (WCAG 1.3.1)',
      { tag: '@a11y' },
      async ({ page }) => {
        const overskrifter = page.getByRole('main').getByRole('heading');
        await expect(overskrifter.first()).toBeAttached();
        const nivåer = await overskrifter.evaluateAll((elementer) =>
          elementer.map((element) =>
            Number(
              element.getAttribute('aria-level') ?? element.tagName.slice(1),
            ),
          ),
        );
        expect(nivåer.filter((nivå) => nivå === 1)).toHaveLength(1);
        expect(nivåer[0]).toBe(1);
        nivåer.forEach((nivå, i) => {
          if (i > 0) expect(nivå).toBeLessThanOrEqual(nivåer[i - 1] + 1);
        });
      },
    );
  });
}

test.describe('Svarmodal', () => {
  test(
    'Tilgjengelighet (WCAG 2.1 A/AA)',
    { tag: '@a11y' },
    async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium', 'axe kjøres bare i Chromium');
      await page.goto(`${BASE_URL}/frem-i-tid`);
      const consentButton = page.getByTestId('consent-banner-refuse-optional');
      if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await consentButton.click();
      }
      await sjekkDialog(
        page,
        page.getByRole('button', { name: 'Svar', exact: true }),
      );
    },
  );
});

// «Send» er deaktivert til et svar er valgt, så feilen kan bare vises etter at
// jobbsøkeren har valgt. Mock-treffet «lagring-feiler» svarer 500 på lagringen.
test.describe('Feil ved lagring av svar', () => {
  test(
    'Feilen vises og annonseres (WCAG 3.3.1 og 4.1.3)',
    { tag: '@a11y' },
    async ({ page, browserName }, testInfo) => {
      test.skip(browserName !== 'chromium', 'axe kjøres bare i Chromium');
      await page.goto(`${BASE_URL}/lagring-feiler`);
      const consentButton = page.getByTestId('consent-banner-refuse-optional');
      if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await consentButton.click();
      }
      await page.getByRole('button', { name: 'Svar', exact: true }).click();
      const dialog = page.getByRole('dialog', {
        name: 'Svar på om du vil komme',
      });
      await dialog.getByRole('radio', { name: 'Ja, jeg kommer' }).check();
      await dialog.getByRole('button', { name: 'Send' }).click();

      const feilmelding = dialog.getByRole('alert');
      await expect(feilmelding).toBeVisible();
      await expect(feilmelding).toHaveText(
        'Noe gikk galt ved sending av svar, vennligst prøv igjen senere.',
      );
      await expect(dialog).toBeVisible();
      await sjekkTilgjengelighet(page, {}, testInfo);
    },
  );
});
