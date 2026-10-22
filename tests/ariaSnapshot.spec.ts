import { expect, Page, test } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '1337';
const BASE_URL = `http://localhost:${PORT}/rekrutteringstreff`;

// Mockdataene lages med faker, så titler, datoer og adresser endrer seg fra
// kjøring til kjøring. De er erstattet med regex eller utelatt. Snapshotene
// matcher delvis, så elementer som ikke står her, blir ikke sjekket.
const svarfrist =
  '/Svarfristen utløper .+ Du kan endre svaret ditt frem til \\S+ \\d+\\. \\S+ \\d{4} kl\\. \\d{2}:\\d{2}/';

const åpne = async (page: Page, id: string) => {
  await page.goto(`${BASE_URL}/${id}`);
  const consentButton = page.getByTestId('consent-banner-refuse-optional');
  if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
    await consentButton.click();
  }
};

const åpneSvarmodal = async (page: Page) => {
  await page.getByRole('button', { name: 'Svar', exact: true }).click();
  return page.getByRole('dialog', { name: 'Svar på om du vil komme' });
};

test.describe('Aria-snapshots', { tag: '@a11y' }, () => {
  test.skip(
    ({ browserName, isMobile }) => browserName !== 'chromium' || isMobile,
    'Kjøres bare i chromium',
  );

  test('Toppen av treffsiden', async ({ page }) => {
    await åpne(page, 'frem-i-tid');
    const topp = page
      .getByRole('main')
      .getByRole('heading', { level: 1 })
      .first()
      .locator('..');
    await expect(topp).toMatchAriaSnapshot(`
      - heading [level=1]
      - text: /^(Om \\d+ dager|I morgen|I dag|Mindre enn 2 dager til) \\S+ \\d+\\. \\S+ \\d{4} kl\\. \\d{2}:\\d{2}/
    `);
  });

  test('Overskriftene på treffsiden', async ({ page }) => {
    await åpne(page, 'frem-i-tid');
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - main:
        - heading [level=1]
        - heading "Siste aktivitet" [level=2]
        - heading [level=3]
        - heading "Arbeidsgivere" [level=2]
        - heading [level=3]
    `);
  });

  test('Svarmodalen før og etter at et svar er valgt', async ({ page }) => {
    await åpne(page, 'frem-i-tid');
    const dialog = await åpneSvarmodal(page);
    await expect(dialog).toMatchAriaSnapshot(`
      - dialog "Svar på om du vil komme":
        - button "Lukk"
        - heading "Svar på om du vil komme" [level=1]
        - text: Vi ønsker å gi deg sjansen til å utforske jobbmuligheter på en enkel og uformell måte. Det er frivillig å delta. Hvis du ikke vil eller kan, setter vi stor pris på om du sier ifra slik at noen andre får sjansen. Du kan endre svaret ditt frem til svarfristen.
        - radiogroup "Kommer du på rekrutteringstreffet?":
          - radio "Ja, jeg kommer" [checked=false]
          - radio "Nei, jeg kommer ikke" [checked=false]
        - text: ${svarfrist}
        - button "Send" [disabled]
        - button "Avbryt"
    `);

    await dialog.getByRole('radio', { name: 'Ja, jeg kommer' }).check();
    await expect(dialog).toMatchAriaSnapshot(`
      - dialog "Svar på om du vil komme":
        - radiogroup "Kommer du på rekrutteringstreffet?":
          - radio "Ja, jeg kommer" [checked]
          - radio "Nei, jeg kommer ikke" [checked=false]
        - button "Send" [disabled=false]
        - button "Avbryt"
    `);
  });

  test('Feil ved lagring av svar', async ({ page }) => {
    await åpne(page, 'lagring-feiler');
    const dialog = await åpneSvarmodal(page);
    await dialog.getByRole('radio', { name: 'Ja, jeg kommer' }).check();
    await dialog.getByRole('button', { name: 'Send' }).click();
    await expect(dialog).toMatchAriaSnapshot(`
      - dialog "Svar på om du vil komme":
        - radiogroup "Kommer du på rekrutteringstreffet?":
          - radio "Ja, jeg kommer" [checked]
        - button "Send"
        - button "Avbryt"
        - alert: Noe gikk galt ved sending av svar, vennligst prøv igjen senere.
    `);
  });

  test('Treff ikke funnet', async ({ page }) => {
    await åpne(page, 'ikke-funnet');
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - main:
        - heading "Rekrutteringstreff ikke funnet" [level=1]
        - paragraph: Dette rekrutteringstreffet finnes ikke eller er ikke lenger tilgjengelig.
    `);
  });
});
