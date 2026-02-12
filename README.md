This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000/rekrutteringstreff/1](http://localhost:3000/rekrutteringstreff/1) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Test cases
[http://localhost:3000/rekrutteringstreff/1](http://localhost:3000/rekrutteringstreff/1) Alt er random
[http://localhost:3000/rekrutteringstreff/2](http://localhost:3000/rekrutteringstreff/2) Treff frem i tid hvor jobbsøker ikke har svart
[http://localhost:3000/rekrutteringstreff/3](http://localhost:3000/rekrutteringstreff/3) Treff frem i tid hvor jobbsøker har svart ja
[http://localhost:3000/rekrutteringstreff/4](http://localhost:3000/rekrutteringstreff/4) Treff frem i tid hvor jobbsøker har svart nei
[http://localhost:3000/rekrutteringstreff/5](http://localhost:3000/rekrutteringstreff/5) Treff frem i tid hvor jobbsøker ikke er invitert
[http://localhost:3000/rekrutteringstreff/6](http://localhost:3000/rekrutteringstreff/6) Treff som er i gang
[http://localhost:3000/rekrutteringstreff/7](http://localhost:3000/rekrutteringstreff/7) Treff som er passert
[http://localhost:3000/rekrutteringstreff/8](http://localhost:3000/rekrutteringstreff/8) Treff som er avlyst
[http://localhost:3000/rekrutteringstreff/9](http://localhost:3000/rekrutteringstreff/9) Treff med ulik formattering
[http://localhost:3000/rekrutteringstreff/10](http://localhost:3000/rekrutteringstreff/10) Treff som ikke finnes
[http://localhost:3000/rekrutteringstreff/11](http://localhost:3000/rekrutteringstreff/11) Treff hvor svarfirst er utløpt og hvor brukeren ikke har svart enda
[http://localhost:3000/rekrutteringstreff/12](http://localhost:3000/rekrutteringstreff/12) Treff hvor svarfirst er utløpt og brukeren har svart


### 🎭 Playwright

```bash
# Generer tester
pnpm exec playwright install (kun første gang)
pnpm exec playwright codegen

# Kjør tester
pnpm test-dev (starter dev server)
pnpm test

# Åpne UI-modus
pnpm test --ui
```

Testresultater: [navikt.github.io/rekrutteringstreff-bruker/playwright-report](https://navikt.github.io/rekrutteringstreff-bruker/playwright-report)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
