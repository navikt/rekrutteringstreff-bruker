import {expect, Page, test} from '@playwright/test';

test.describe(`Svarboks tester`, () => {

  test('Svarboks vises korrekt for jobbsøker som ikke har svart', async ({ page }) => {
    await åpneUrlMedId(page, 2)
    await expect(page.getByRole('button', { name: 'Svar' })).toBeVisible();
    await expect(page.getByText('🔥🔥🔥').first()).toBeVisible();
    await expect(page.getByText('Du kan endre svaret ditt frem').first()).toBeVisible();
  });

  test('Svarboks vises korrekt for jobbsøker som har svart ja', async ({ page }) => {
    await åpneUrlMedId(page, 3)
    await expect(page.getByRole('button', { name: 'Endre svar' })).toBeVisible();
    await expect(page.getByText('Jeg blir med').nth(1)).toBeVisible();
    await expect(page.getByText('Du kan endre svaret ditt frem').first()).toBeVisible();
  });

  test('Svarboks vises korrekt for jobbsøker som har svart nei', async ({ page }) => {
    await åpneUrlMedId(page, 4);
    await expect(page.getByRole('button', { name: 'Endre svar' })).toBeVisible();
    await expect(page.getByText('Jeg blir ikke med').nth(1).first()).toBeVisible();
    await expect(page.getByText('Du kan endre svaret ditt frem').first()).toBeVisible();
  });

  test('Svarboks vises korrekt for jobbsøker som ikke er invitert', async ({ page }) => {
    await åpneUrlMedId(page, 5);
    await expect(page.getByRole('heading', { name: 'Vil du være med?' })).toBeVisible();
  });

  test('Svarboks vises korrekt når treffet er i gang', async ({ page }) => {
    await åpneUrlMedId(page, 6);
    await expect(page.getByText('Treffet er i gang')).toBeVisible();
  });

  test('Svarboks vises korrekt når treffet er passert', async ({ page }) => {
    await åpneUrlMedId(page, 7);
    await expect(page.getByText('Treffet er over for denne gang')).toBeVisible();
  });

  const åpneUrlMedId = async (page: Page, rekrutteringstreffId: number) => {
    await page.goto(`http://localhost:1337/rekrutteringstreff/${rekrutteringstreffId}`);
    await page.waitForLoadState('networkidle');
    await page.getByTestId('consent-banner-refuse-optional').click(); // Lukk cookie-banner
  };

});
