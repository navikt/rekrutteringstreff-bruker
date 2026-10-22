import { expect, test } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '1337';

for (const sti of ['isready', 'isalive']) {
  test(`/rekrutteringstreff/api/${sti} svarer 200 uten innlogging`, async ({
    request,
  }) => {
    const respons = await request.get(
      `http://localhost:${PORT}/rekrutteringstreff/api/${sti}`,
      { maxRedirects: 0 },
    );
    expect(respons.status()).toBe(200);
  });
}
