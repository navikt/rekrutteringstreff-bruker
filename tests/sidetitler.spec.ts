import { expect, test } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '1337';
const BASE_URL = `http://localhost:${PORT}/rekrutteringstreff`;

// WCAG 2.4.2 Sidetitler: hver side skal ha en tittel som beskriver formålet.
// Titler sendes til Umami, så de skal aldri inneholde navn på personer.
const sider: [sti: string, tittel: string][] = [
  ['', 'Om rekrutteringstreff'],
  ['frem-i-tid', 'Treff'],
  ['har-svart-ja', 'Treff'],
  ['ugyldig-id', 'Treff ikke funnet'],
];

test.describe('Sidetitler (WCAG 2.4.2)', () => {
  for (const [sti, tittel] of sider) {
    test(
      `/rekrutteringstreff/${sti} har tittelen «${tittel}»`,
      { tag: '@a11y' },
      async ({ page }) => {
        await page.goto(`${BASE_URL}/${sti}`);
        await expect(page).toHaveTitle(
          new RegExp(`^${tittel} – .*Rekrutteringstreff$`),
        );
      },
    );
  }
});
