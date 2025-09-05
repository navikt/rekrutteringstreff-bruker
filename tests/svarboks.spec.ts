import { expect, test } from '@playwright/test';

test.describe(`Svarboks tester`, () => {

  const url = 'http://localhost:1337/rekrutteringstreff';

  test('Svarboks vises korrekt for jobbsøker som ikke har svart', async ({ page }) => {
    await page.goto(`${url}/2`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Svar' })).toBeVisible();
    await expect(page.getByText('🔥🔥🔥').first()).toBeVisible();
    await expect(page.getByText('Du kan endre svaret ditt frem').first()).toBeVisible();
  });

  test('Svarboks vises korrekt for jobbsøker som har svart ja', async ({ page }) => {
    await page.goto(`${url}/3`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Endre svar' })).toBeVisible();
    await expect(page.getByText('Jeg blir med').nth(1)).toBeVisible();
    await expect(page.getByText('Du kan endre svaret ditt frem').first()).toBeVisible();
  });

  test('Svarboks vises korrekt for jobbsøker som har svart nei', async ({ page }) => {
    await page.goto(`${url}/4`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('button', { name: 'Endre svar' })).toBeVisible();
    await expect(page.getByText('Jeg blir ikke med').nth(1).first()).toBeVisible();
    await expect(page.getByText('Du kan endre svaret ditt frem').first()).toBeVisible();
  });

  test('Svarboks vises korrekt for jobbsøker som ikke er invitert', async ({ page }) => {
    await page.goto(`${url}/5`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Vil du være med?' })).toBeVisible();
  });

  test('Svarboks vises korrekt når treffet er i gang', async ({ page }) => {
    await page.goto(`${url}/6`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Treffet er i gang')).toBeVisible();
  });

  test('Svarboks vises korrekt når treffet er passert', async ({ page }) => {
    await page.goto(`${url}/7`);
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Treffet er over for denne gang')).toBeVisible();
  });
});
