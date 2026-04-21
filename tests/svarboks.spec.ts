import { expect, Page, test } from '@playwright/test';

const BASE_URL = 'http://localhost:1337/rekrutteringstreff';

const åpneRekrutteringstreff = async (page: Page, id: string) => {
  await page.goto(`${BASE_URL}/${id}`);
  const consentButton = page.getByTestId('consent-banner-refuse-optional');
  if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
    await consentButton.click();
  }
};

test.describe('Svarboks tester', () => {
  test('Vises korrekt for jobbsøker som ikke har svart', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'frem-i-tid');
    await expect(page.getByRole('button', { name: 'Svar' })).toBeVisible();
    await expect(page.getByText('🔥🔥🔥').first()).toBeVisible();
    await expect(
      page.getByText('Du kan endre svaret ditt frem').first(),
    ).toBeVisible();
  });

  test('Vises korrekt for jobbsøker som har svart ja', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'har-svart-ja');
    await expect(
      page.getByRole('button', { name: 'Endre svar' }),
    ).toBeVisible();
    await expect(
      page.getByText('Jeg blir med', { exact: true }).last(),
    ).toBeVisible();
  });

  test('Vises korrekt for jobbsøker som har svart nei', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'har-svart-nei');
    await expect(
      page.getByRole('button', { name: 'Endre svar' }),
    ).toBeVisible();
    await expect(
      page.getByText('Jeg blir ikke med', { exact: true }).last(),
    ).toBeVisible();
  });

  test('Vises korrekt for jobbsøker som ikke er invitert', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'ikke-invitert');
    await expect(page.getByText('Vil du være med?')).toBeVisible();
  });
});

test.describe('Status-tester', () => {
  test('Publisert rekrutteringstreff viser innhold', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'publisert');
    await expect(
      page.getByRole('heading', { name: 'Siste aktivitet' }),
    ).toBeVisible();
  });

  test('Utkast viser "ikke publisert"-banner', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'utkast');
    await expect(
      page.getByText('Rekrutteringstreffet er ikke publisert'),
    ).toBeVisible();
  });

  test('Slettet viser "slettet"-banner', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'slettet');
    await expect(
      page.getByText('Rekrutteringstreffet er slettet'),
    ).toBeVisible();
  });

  test('Avlyst viser innhold', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'avlyst');
    await expect(page.getByText('Arrangement avlyst')).toBeVisible();
  });

  test('Fullført viser innhold', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'fullfort');
    await expect(page.getByText('Treffet er over').first()).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Siste aktivitet' }),
    ).toBeVisible();
  });

  test('Ikke funnet viser feilmelding', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'ikke-funnet');
    await expect(
      page.getByRole('heading', {
        name: 'Rekrutteringstreff ikke funnet',
      }),
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Innhold-tester', () => {
  test('Frem-i-tid viser tid og sted', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'frem-i-tid');
    await expect(
      page.getByText(/Om \d+ dager|I morgen|I dag|Mindre enn 2 dager til/),
    ).toBeVisible();
    await expect(page.getByText(/kl\.\s?\d{2}\.\d{2}/).first()).toBeVisible();
  });

  test('Formattering rendrer HTML korrekt', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'formattering');
    await expect(
      page.getByRole('heading', { name: 'Forskjellig formattering' }),
    ).toBeVisible();
    await expect(
      page.locator('strong').filter({ hasText: 'Bold' }).last(),
    ).toBeVisible();
  });

  test('Svarfrist utløpt viser riktig', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'svarfrist-utlopt');
    await expect(page.getByText('Svarfristen er utløpt')).toBeVisible();
  });

  test('Manglende svarfrist viser riktig beskjed', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'uten-svarfrist');
    await expect(page.getByText('Manglende svarfrist')).toBeVisible();
  });

  test('Arbeidsgivere vises', async ({ page }) => {
    await åpneRekrutteringstreff(page, 'frem-i-tid');
    await expect(
      page.getByRole('heading', { name: 'Arbeidsgivere' }),
    ).toBeVisible();
  });
});
