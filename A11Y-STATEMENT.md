# Guide til tilgjengelighetserklæringen

Rekrutteringstreff bruker skal oppfylle alle A- og AA-krav i WCAG 2.1. Denne guiden viser hvordan du tester hvert kriterium i tilgjengelighetserklæringen for appen på [a11y-statement.nav.no](https://a11y-statement.nav.no), og hva Playwright-testene allerede sjekker automatisk.

Rekrutteringstreff bruker er for jobbsøkere som er logget inn på nav.no. Forsiden forteller hva et rekrutteringstreff er. Treffsiden viser et treff jobbsøkeren er invitert til, og lar jobbsøkeren svare om hen kommer. Svaret kan endres fram til svarfristen.

## Slik svarer du i erklæringen

| Svar         | Når                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------- |
| Ja           | Både de automatiske testene og en manuell test viser at kravet er oppfylt på alle sider.     |
| Nei          | Du har funnet minst ett brudd. Beskriv avviket og planen for å rette det.                    |
| Ikke testet  | Kriteriet er ikke testet manuelt ennå. Grønne automatiske tester alene er ikke nok til «Ja». |
| Ikke aktuelt | Appen har ikke innholdet kriteriet gjelder, for eksempel video.                              |

De automatiske testene finner mange brudd, men de kan ikke bekrefte at et krav er oppfylt. axe kan for eksempel se at et bilde har alternativtekst, men ikke om teksten beskriver bildet.

## Hva testes automatisk

`tests/tilgjengelighet.spec.ts` bruker `tilgjengelighetstest(test, { utvidet: true, reflow: true })` fra `@navikt/toi-next-frontend/a11y`. Den tester forsiden og treffsiden i 15 tilstander:

- tidspunkt: fram i tid, i gang, tilbake i tid
- status: utkast, publisert, avlyst, fullført, slettet, ikke funnet
- svar: har svart ja, har svart nei, ikke invitert
- svarfrist: utløpt, mangler
- formatert beskrivelse

Testene kjører i `chromium` og `chromium-mobile` og stopper deploy hvis de feiler. Testen avviser samtykkebanneret for informasjonskapsler før siden sjekkes.

Dekoratøren er merket med `data-axe-ignore` i `app/layout.tsx` og blir ikke sjekket. Den eies av et annet team.

### axe og reflow

Testen «Tilgjengelighet (WCAG 2.1 A/AA)» kjører axe med taggene `wcag2a`, `wcag2aa`, `wcag21a` og `wcag21aa`. Tabellen under viser hvilke axe-regler som hører til hvert kriterium.

Den samme testen sjekker reflow (1.4.10): vinduet settes til 320 × 256 px, og testen feiler hvis siden ruller horisontalt.

### Utvidede sjekker

Testen «Tilgjengelighet – utvidede sjekker» kjører i nettleseren på de samme sidene:

| Sjekk             | Kriterier                  | Slik virker den                                                                                                                              |
| ----------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Tekstforstørrelse | 1.4.4                      | Dobler rot-skriftstørrelsen og feiler hvis tekst blir kuttet av.                                                                             |
| Tekstavstand      | 1.4.12                     | Legger på WCAG-tekstavstanden og feiler hvis tekst blir kuttet av.                                                                           |
| Visningsretning   | 1.3.4                      | Laster siden i stående og liggende format og sjekker at innholdet vises i begge.                                                             |
| Tastatur          | 2.1.1, 2.1.2, 2.4.7, 3.2.1 | Tabber gjennom hele siden. Feiler hvis klikkbare elementer ikke kan nås, fokus står fast, fokus ikke vises eller fokus alene åpner noe nytt. |

Hver kjøring legger ved `fokusrekkefølge.txt` i rapporten. Den er nyttig når du sjekker 2.4.3.

### Dette testes ikke automatisk

- Dekoratøren og samtykkebanneret
- Svarmodalen og beskjeden etter at svaret er sendt
- Feilmeldingen når svaret ikke blir lagret
- Om tekster, alternativtekster og overskrifter gir mening

### Kjør testene lokalt

```sh
pnpm run test:a11y                                                     # alle tilgjengelighetstester
pnpm exec playwright test --grep @a11y-utvidet --project='chromium*'   # bare utvidede sjekker
```

Kjører du `pnpm dev` samtidig, setter du `PLAYWRIGHT_PORT` til en ledig port.

### Legg til en ny tilstand

Legg til stien og en locator som viser at siden er ferdig lastet, i objektet `sider` i `tests/tilgjengelighet.spec.ts`.

Kjør axe på tilstander som åpnes etter at siden er lastet, for eksempel svarmodalen:

```ts
import { sjekkTilgjengelighet } from '@navikt/toi-next-frontend/a11y';

test('svarmodalen er tilgjengelig', async ({ page }, testInfo) => {
  await page.getByRole('button', { name: 'Svar', exact: true }).click();
  await sjekkTilgjengelighet(page, { inkluder: ['dialog[open]'] }, testInfo);
});
```

## Verktøy for manuell testing

- **Tastatur**: Tab, Shift+Tab, Enter, mellomrom, piltaster og Esc
- **VoiceOver** på Mac: slå på og av med Cmd+F5. VO+U åpner rotoren med lister over overskrifter, lenker og skjemafelt. Test også med VoiceOver på iPhone, siden mange jobbsøkere bruker mobil.
- **Zoom**: Cmd+plus til 200 % og 400 %. Endre også standard skriftstørrelse i nettleseren (Chrome: Innstillinger → Utseende → Skriftstørrelse).
- **Chrome DevTools**: fargevelgeren viser kontrastforholdet. Under Rendering kan du simulere fargeblindhet.
- **Bokmerket for tekstavstand**: [Text spacing bookmarklet](https://www.html5accessibility.com/tests/tsbookmarklet.html)
- **Testguider**: [Universell utforming på Aksel](https://aksel.nav.no/god-praksis/universell-utforming) og [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)

Test hele flyten som jobbsøker i dev:

1. Logg inn og åpne et treff du er invitert til.
2. Svar ja, og endre svaret til nei.
3. Åpne et treff der svarfristen er utløpt, og et som er avlyst.

## Kriteriene

### 1 Mulig å oppfatte

| Kriterium                                 | Testes automatisk                                                                                                                              | Slik tester du manuelt                                                                                                                                                                                                     |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1.1 Ikke-tekstlig innhold               | axe: `image-alt`, `svg-img-alt`, `role-img-alt`, `input-image-alt`, `object-alt`                                                               | Gå gjennom sidene med VoiceOver. Bilder og ikoner som betyr noe, for eksempel ikonene ved tid og sted, skal ha en tekst som beskriver dem, eller stå ved en tekst som sier det samme. Pynteikoner skal ha `aria-hidden`.   |
| 1.2.1 Bare lyd og bare video              | axe: `video-caption`                                                                                                                           | Ikke aktuelt så lenge appen ikke har lyd eller video.                                                                                                                                                                      |
| 1.2.2 Teksting                            | axe: `video-caption`                                                                                                                           | Ikke aktuelt så lenge appen ikke har video.                                                                                                                                                                                |
| 1.2.3 Synstolking eller mediealternativ   | Ingen                                                                                                                                          | Ikke aktuelt så lenge appen ikke har video.                                                                                                                                                                                |
| 1.2.5 Synstolking                         | Ingen                                                                                                                                          | Ikke aktuelt så lenge appen ikke har video.                                                                                                                                                                                |
| 1.3.1 Informasjon og relasjoner           | axe: `list`, `listitem`, `dlitem`, `definition-list`, `th-has-data-cells`, `td-headers-attr`, `aria-required-children`, `aria-required-parent` | Åpne overskriftslisten i VoiceOver-rotoren. Nivåene skal speile strukturen. Lister og overskrifter i beskrivelsen av treffet skal være ekte lister og overskrifter. Svarvalgene skal ligge i en `RadioGroup` med `legend`. |
| 1.3.2 Meningsbærende rekkefølge           | Ingen                                                                                                                                          | La VoiceOver lese hele siden (VO+A). Rekkefølgen skal gi mening også på mobil.                                                                                                                                             |
| 1.3.3 Sensoriske egenskaper               | Ingen                                                                                                                                          | Instruksjoner skal ikke bare vise til form, farge, plassering eller lyd.                                                                                                                                                   |
| 1.3.4 Visningsretning                     | Utvidet sjekk: visningsretning                                                                                                                 | Åpne appen på mobil og bytt mellom stående og liggende format.                                                                                                                                                             |
| 1.3.5 Identifiser formål med inndata      | axe: `autocomplete-valid`                                                                                                                      | Ikke aktuelt: jobbsøkeren svarer bare ja eller nei og fyller ikke inn opplysninger om seg selv.                                                                                                                            |
| 1.4.1 Bruk av farge                       | axe: `link-in-text-block`                                                                                                                      | Status som avlyst, utløpt svarfrist og svaret jobbsøkeren har gitt, skal også vises med tekst eller ikon. Se på sidene i gråtoner (DevTools → Rendering → Emulate vision deficiencies → Achromatopsia).                    |
| 1.4.2 Styring av lyd                      | axe: `no-autoplay-audio`                                                                                                                       | Ikke aktuelt så lenge appen ikke spiller lyd.                                                                                                                                                                              |
| 1.4.3 Kontrast (minimum)                  | axe: `color-contrast`                                                                                                                          | Sjekk hover, fokus og statusbokser med fargevelgeren i DevTools. Krav: 4,5:1 for vanlig tekst og 3:1 for stor tekst.                                                                                                       |
| 1.4.4 Endring av tekststørrelse           | Utvidet sjekk: tekstforstørrelse, axe: `meta-viewport`                                                                                         | Zoom til 200 % og sett standard skriftstørrelse i nettleseren til «Svært stor». Ingen tekst eller funksjon skal forsvinne eller overlappe. Test også svarmodalen.                                                          |
| 1.4.5 Bilder av tekst                     | Ingen                                                                                                                                          | Tekst skal ikke vises som bilde. Logoer er unntatt.                                                                                                                                                                        |
| 1.4.10 Dynamisk tilpasning (reflow)       | Reflow i hovedtesten                                                                                                                           | Sett vinduet til 1280 px og zoom til 400 %. Sidene og svarmodalen skal ikke rulle horisontalt.                                                                                                                             |
| 1.4.11 Kontrast for ikke-tekstlig innhold | Ingen                                                                                                                                          | Kanter på radioknapper og knapper, ikoner som betyr noe og fokusmarkering skal ha 3:1 mot bakgrunnen.                                                                                                                      |
| 1.4.12 Tekstavstand                       | Utvidet sjekk: tekstavstand, axe: `avoid-inline-spacing`                                                                                       | Bruk bokmerket for tekstavstand på treffsiden og i svarmodalen. Ingen tekst skal bli kuttet av.                                                                                                                            |
| 1.4.13 Pekerfølsomt innhold               | Ingen                                                                                                                                          | Innhold som vises ved hover eller fokus, skal kunne lukkes med Esc og bli værende til du flytter fokus eller musen.                                                                                                        |

### 2 Mulig å betjene

| Kriterium                                 | Testes automatisk                                                                      | Slik tester du manuelt                                                                                                                                                                           |
| ----------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2.1.1 Tastatur                            | Utvidet sjekk: tastatur, axe: `scrollable-region-focusable`, `frame-focusable-content` | Svar på et treff og endre svaret med bare tastatur.                                                                                                                                              |
| 2.1.2 Ingen tastaturfelle                 | Utvidet sjekk: tastatur                                                                | Åpne svarmodalen. Du skal komme ut igjen med Esc eller «Avbryt».                                                                                                                                 |
| 2.1.4 Hurtigtaster som består av ett tegn | Ingen                                                                                  | Ikke aktuelt så lenge appen ikke har hurtigtaster.                                                                                                                                               |
| 2.2.1 Justerbar hastighet                 | axe: `meta-refresh`                                                                    | Dekoratøren varsler før innloggingen går ut og lar brukeren forlenge den. Sjekk at varselet vises og kan brukes med tastatur. Svarfristen for treffet er en frist i virkeligheten og er unntatt. |
| 2.2.2 Pause, stopp, skjul                 | axe: `blink`, `marquee`                                                                | Innhold som beveger seg eller oppdateres automatisk i mer enn 5 sekunder, skal kunne pauses. Lasteindikatorer er unntatt.                                                                        |
| 2.3.1 Terskelverdi på maksimalt tre glimt | Ingen                                                                                  | Ikke aktuelt så lenge ingenting blinker.                                                                                                                                                         |
| 2.4.1 Hoppe over blokker                  | axe: `bypass`                                                                          | Trykk Tab på en ny side. Dekoratørens «Hopp til hovedinnhold» skal flytte fokus til `<main id='maincontent'>` i `app/layout.tsx`.                                                                |
| 2.4.2 Sidetitler                          | axe: `document-title` sjekker bare at tittelen finnes                                  | Tittelen i fanen skal beskrive siden. Forsiden og treffsiden bør ha hver sin tittel. Titlene settes med `metadata` eller `generateMetadata`. Navnet på jobbsøkeren skal ikke stå i tittelen.     |
| 2.4.3 Fokusrekkefølge                     | Delvis: vedlegget `fokusrekkefølge.txt`                                                | Tab gjennom sidene. Rekkefølgen skal følge det visuelle. Når svarmodalen åpnes, skal fokus flyttes inn i den. Når den lukkes, skal fokus gå tilbake til knappen som åpnet den.                   |
| 2.4.4 Formål med lenke (i kontekst)       | axe: `link-name`                                                                       | Åpne lenkelisten i VoiceOver-rotoren. Hver lenke, sammen med setningen den står i, skal forklare hvor den går.                                                                                   |
| 2.4.5 Flere måter                         | Ingen                                                                                  | Treffsiden skal kunne nås på minst to måter, for eksempel fra varselet på Min side og fra brødsmulestien.                                                                                        |
| 2.4.6 Overskrifter og ledetekster         | Ingen                                                                                  | Les overskriftene og ledetekstene for seg. De skal beskrive innholdet og svarvalgene uten resten av siden.                                                                                       |
| 2.4.7 Synlig fokus                        | Utvidet sjekk: tastatur                                                                | Tab gjennom sidene og svarmodalen. Fokusmarkeringen skal være tydelig.                                                                                                                           |
| 2.5.1 Pekerbevegelser                     | Ingen                                                                                  | Ikke aktuelt så lenge ingenting krever dra og slipp eller bevegelser med flere fingre.                                                                                                           |
| 2.5.2 Pekeravbrytelse                     | Ingen                                                                                  | Handlinger skal utløses når du slipper, ikke når du trykker ned.                                                                                                                                 |
| 2.5.3 Ledetekst i navn                    | axe: `label-content-name-mismatch`                                                     | Når en kontroll har `aria-label`, skal den inneholde den synlige teksten, helst først. Med Talekontroll på Mac eller iPhone skal du kunne si «Trykk» og den synlige teksten.                     |
| 2.5.4 Bevegelsesaktivering                | Ingen                                                                                  | Ikke aktuelt så lenge appen ikke bruker bevegelsessensorer.                                                                                                                                      |

### 3 Forståelig

| Kriterium                                                             | Testes automatisk                                              | Slik tester du manuelt                                                                                                                                 |
| --------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 3.1.1 Språk på siden                                                  | axe: `html-has-lang`, `html-lang-valid`                        | `<html lang='no'>` er satt i `app/layout.tsx`.                                                                                                         |
| 3.1.2 Språk på deler av innholdet                                     | axe: `valid-lang` sjekker bare at `lang`-verdiene er gyldige   | Beskrivelsen av treffet skrives av veilederen og kan inneholde andre språk. Lengre tekst på andre språk skal ha `lang`. Navn og faguttrykk er unntatt. |
| 3.2.1 Fokus                                                           | Utvidet sjekk: tastatur                                        | Fokus alene skal ikke åpne nye sider, vinduer eller dialoger.                                                                                          |
| 3.2.2 Inndata                                                         | Ingen                                                          | Å velge ja eller nei i svarmodalen skal ikke sende svaret. Svaret sendes først når brukeren trykker på knappen.                                        |
| 3.2.3 Konsekvent navigering                                           | Ingen                                                          | Dekoratøren og brødsmulestien skal stå på samme sted på alle sider.                                                                                    |
| 3.2.4 Konsekvent identifikasjon                                       | Ingen                                                          | Samme funksjon skal ha samme navn og ikon overalt, for eksempel knappen for å svare.                                                                   |
| 3.3.1 Identifikasjon av feil                                          | Ingen                                                          | Prøv å sende svaret uten å velge ja eller nei. Feilen skal beskrives med tekst. Sjekk også feilmeldingen når svaret ikke blir lagret.                  |
| 3.3.2 Ledetekster eller instruksjoner                                 | axe: `form-field-multiple-labels`, se også `label` under 4.1.2 | Svarvalgene skal ha ledetekster, og modalen skal forklare at svaret kan endres fram til svarfristen.                                                   |
| 3.3.3 Forslag ved feil                                                | Ingen                                                          | Feilmeldingen skal si hva brukeren kan gjøre, for eksempel prøve igjen eller kontakte veilederen.                                                      |
| 3.3.4 Forhindring av feil (juridiske feil, økonomiske feil, datafeil) | Ingen                                                          | Svaret skal kunne endres fram til svarfristen, og brukeren skal se hva hen har svart.                                                                  |

### 4 Robust

| Kriterium                | Testes automatisk                                                                                                                                                                   | Slik tester du manuelt                                                                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1.1 Parsing            | Ingen                                                                                                                                                                               | W3C regner kriteriet som alltid oppfylt for HTML, og det er fjernet i WCAG 2.2. Svar «Ja».                                                                                            |
| 4.1.2 Navn, rolle, verdi | axe: `button-name`, `link-name`, `label`, `nested-interactive`, `aria-allowed-attr`, `aria-hidden-focus`, `aria-input-field-name`, `aria-valid-attr-value` og flere `aria-*`-regler | Gå gjennom kontrollene med VoiceOver. Hver kontroll skal leses med navn, rolle og tilstand, for eksempel hvilket svar som er valgt.                                                   |
| 4.1.3 Statusbeskjeder    | Ingen                                                                                                                                                                               | Når svaret er lagret eller lagringen feiler, skal VoiceOver lese opp beskjeden. Hvis fokus ikke flyttes til beskjeden, trenger den `role='status'`, `role='alert'` eller `aria-live`. |
