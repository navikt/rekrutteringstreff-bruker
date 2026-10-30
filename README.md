This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000/rekrutteringstreff/frem-i-tid](http://localhost:3000/rekrutteringstreff/frem-i-tid) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Nettleserstøtte

Appen bruker [`@navikt/browserslist-config-public`](https://github.com/navikt/browserslist-config#readme)
via `browserslist` i `package.json`, slik pakkens dokumentasjon beskriver for Next.js.
Next.js leser konfigurasjonen og sender de oppløste målene til Turbopack i både
utvikling og produksjonsbygg. Ingen ekstra innstilling i
`next.config.ts` er nødvendig.

Versjon 0.3.0 setter mål fra Chrome og Edge 108, Firefox 121, Safari og iOS Safari 16,
Opera 94 og Samsung Internet 21. Konfigurasjonen styrer kompilering av syntaks,
men legger ikke til polyfills for manglende JavaScript- eller nettleser-API-er.
Slike API-er må vurderes og eventuelt håndteres separat.

Dette er ikke en garanti for at hele appen fungerer på alle minimumsversjonene.
[Next.js støtter offisielt Chrome og Edge 111, Firefox 111 og Safari 16.4 eller nyere](https://nextjs.org/docs/architecture/supported-browsers).
[Tailwind CSS 4 krever Chrome 111, Safari 16.4 og Firefox 128](https://tailwindcss.com/docs/compatibility#browser-support).
Tailwinds PostCSS-plugin bruker egne CSS-mål og leser ikke Browserslist-oppsettet.
Next.js' nettlesermål opphever ikke disse kravene. Vi endrer ikke CSS-verktøyet
som del av denne konfigurasjonen.

Playwright-testene dekker de installerte versjonene av Chromium, Firefox og WebKit,
ikke de oppgitte minimumsversjonene eller alle nettleser-API-er.

## Test cases

- [http://localhost:3000/rekrutteringstreff/tilfeldig](http://localhost:3000/rekrutteringstreff/tilfeldig) Treff med tilfeldige data
- [http://localhost:3000/rekrutteringstreff/frem-i-tid](http://localhost:3000/rekrutteringstreff/frem-i-tid) Treff frem i tid hvor jobbsøker er invitert og ikke har svart
- [http://localhost:3000/rekrutteringstreff/har-svart-ja](http://localhost:3000/rekrutteringstreff/har-svart-ja) Treff frem i tid hvor jobbsøker har svart ja
- [http://localhost:3000/rekrutteringstreff/har-svart-nei](http://localhost:3000/rekrutteringstreff/har-svart-nei) Treff frem i tid hvor jobbsøker har svart nei
- [http://localhost:3000/rekrutteringstreff/ikke-invitert](http://localhost:3000/rekrutteringstreff/ikke-invitert) Treff frem i tid hvor jobbsøker ikke er invitert
- [http://localhost:3000/rekrutteringstreff/i-gang](http://localhost:3000/rekrutteringstreff/i-gang) Treff som er i gang
- [http://localhost:3000/rekrutteringstreff/tilbake-i-tid](http://localhost:3000/rekrutteringstreff/tilbake-i-tid) Treff som er passert
- [http://localhost:3000/rekrutteringstreff/avlyst](http://localhost:3000/rekrutteringstreff/avlyst) Treff som er avlyst
- [http://localhost:3000/rekrutteringstreff/formattering](http://localhost:3000/rekrutteringstreff/formattering) Treff med ulik formattering
- [http://localhost:3000/rekrutteringstreff/ikke-funnet](http://localhost:3000/rekrutteringstreff/ikke-funnet) Treff som ikke finnes
- [http://localhost:3000/rekrutteringstreff/svarfrist-utlopt](http://localhost:3000/rekrutteringstreff/svarfrist-utlopt) Treff hvor svarfrist er utløpt og brukeren ikke har svart
- [http://localhost:3000/rekrutteringstreff/uten-svarfrist](http://localhost:3000/rekrutteringstreff/uten-svarfrist) Treff som mangler svarfrist
- [http://localhost:3000/rekrutteringstreff/utkast](http://localhost:3000/rekrutteringstreff/utkast) Treff med status utkast
- [http://localhost:3000/rekrutteringstreff/publisert](http://localhost:3000/rekrutteringstreff/publisert) Treff med status publisert
- [http://localhost:3000/rekrutteringstreff/fullfort](http://localhost:3000/rekrutteringstreff/fullfort) Treff med status fullført
- [http://localhost:3000/rekrutteringstreff/slettet](http://localhost:3000/rekrutteringstreff/slettet) Treff med status slettet
- [http://localhost:3000/rekrutteringstreff/lagring-feiler](http://localhost:3000/rekrutteringstreff/lagring-feiler) Treff hvor lagring av svar feiler (500)

### 🎭 Playwright

Testene kjøres i Chromium, Firefox og WebKit (Safari-motoren), både lokalt og i CI.
Mobilvisning testes også med Pixel 7 (Chromium) og iPhone 13 (WebKit).
CI kjører med fire shards og 100 % workers per shard.
Dette er emulering av skjermstørrelse, touch og nettleser, ikke fysiske enheter.

```bash
# Generer tester
pnpm exec playwright install chromium firefox webkit # kun første gang
pnpm exec playwright codegen

# Kjør tester
pnpm test

# Åpne UI-modus
pnpm test --ui
```

For å kjøre bare én nettleser: `pnpm run test --project=webkit`.
For mobilvisning: `pnpm run test --project=chromium-mobile`.
Playwright starter mockserveren automatisk lokalt. `PLAYWRIGHT_PORT` kan overstyre
standardporten 1337. CI bruker eksisterende testbygg og standalone-server.

Testresultater: [navikt.github.io/rekrutteringstreff-bruker/playwright-report](https://navikt.github.io/rekrutteringstreff-bruker/playwright-report)

### ♿ Tilgjengelighet

Guiden for tilgjengelighet ligger på [Trello-kortet](https://trello.com/c/6FnnKQgF). Den viser hva tilgjengelighetstestene sjekker automatisk, og hvordan du tester hvert WCAG-kriterium i tilgjengelighetserklæringen manuelt. `pnpm run test:a11y` kjører tilgjengelighetstestene.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
