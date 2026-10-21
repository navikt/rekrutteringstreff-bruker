import { expect, test } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '1337';
const BASE_URL = `http://localhost:${PORT}/rekrutteringstreff`;

for (const id of ['undefined', 'ikke-en-uuid', '123']) {
  test(`Ugyldig id «${id}» viser ikke funnet uten API-kall`, async ({
    page,
  }) => {
    const apiKall: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('/api/rekrutteringstreff-minside/')) {
        apiKall.push(request.url());
      }
    });

    await page.goto(`${BASE_URL}/${id}`);

    await expect(
      page.getByRole('heading', { name: 'Rekrutteringstreff ikke funnet' }),
    ).toBeVisible();
    expect(apiKall).toEqual([]);
  });
}
