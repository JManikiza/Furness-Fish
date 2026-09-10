# Furness Fish Market

Brochure site for Furness Fish Market, Borough Market, London — built with
[Astro](https://astro.build). No ordering, no cart, no backend: it renders to
static HTML at build time and ships essentially no JavaScript.

## Running it

Requires Node 18+ (built against Node 24 LTS).

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                      |
| `npm run build`   | Static build into `dist/`                       |
| `npm run preview` | Serve the built output locally                  |
| `npm run check`   | Type-check `.astro` and `.ts` files             |

## How it's put together

```
src/
  assets/       Photography. Astro resizes + converts these to WebP at build.
  components/   Header, Footer, Hero, Feature, CatchList, CtaBand, InstagramStrip
  data/site.ts  Nav, contact details, hours, the catch, the team — edit here
  layouts/      BaseLayout: <head>, header, footer, scroll-reveal script
  pages/        One file per route
  styles/       global.css — the whole design system
public/         Served as-is: favicon, robots.txt, Slow Food logo
scripts/        One-off asset preparation (see below)
legacy/         The previous hand-written HTML site, kept for reference
```

### Editing content

Almost everything that appears in more than one place lives in
[`src/data/site.ts`](src/data/site.ts) — opening hours, the address, the
Instagram handles, the fish list, the oyster varieties, the team roster. Change
it there and it updates across every page.

### The design system

[`src/styles/global.css`](src/styles/global.css) holds the whole thing as CSS
custom properties — colours, type scale, spacing, layout widths.

- **Brand blue `#0070A0`** — sampled directly from the crest artwork
- **Ink `#071C27`** — deep sea navy for hero scrims, footer, dark bands
- **Bone `#F7F3EB`** — warm paper ground (white reads cheap at this scale)
- **Brass `#A8823F`** — the single metallic accent, used only on rules,
  eyebrow labels and hover states
- **Type** — Cormorant Garamond for display, Jost for body and UI

Everything scales with `clamp()` rather than breakpoint jumps, so it's fluid
between sizes rather than snapping.

## Responsiveness

Verified with zero horizontal overflow on all six pages at 1920×1080,
1536×864, 1440×900, 1366×768, 768×1024, 390×844 and 360×800. The desktop nav
collapses to an accessible drawer (`aria-expanded`, Escape to close, scroll
lock) below 62rem.

## Accessibility

Skip link, landmark elements, `aria-current` on the active nav item, visible
focus rings, alt text on all meaningful images (decorative ones are `alt=""`),
and `prefers-reduced-motion` honoured — the scroll-reveal animation is disabled
entirely for anyone who asks for it, and content renders visible without JS.

## Images

Source photography lives in `src/assets/` and is optimised by Astro at build
time (resized per breakpoint, converted to WebP). The originals were prepared
once by the scripts in `scripts/`:

| Script                 | Purpose                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| `prepare-assets.mjs`   | Curate, EXIF-rotate and downscale the shop's own photography            |
| `make-wordmark.mjs`    | Derive transparent navy + white wordmarks from the original opaque logo |
| `fetch-stock.mjs`      | Pull the handful of royalty-free supporting shots                       |
| `contact-sheet.mjs`    | Montage stock candidates into one sheet for reviewing                   |

These are one-off tools, not part of the build — `npm run build` doesn't
invoke them.

**Provenance:** the shop's own photographs (counter, team, shopfront, oyster
bar, the Jamie Oliver spread) come from the existing archive and from
furnessfishmarkets.com. Four supporting images — the two paella shots, the
black-and-white harbour boat and the dawn day boat — are from
[Pexels](https://www.pexels.com) under the Pexels licence (free for commercial
use, no attribution required).

## Known gaps

- **The Instagram grid is curated, not live.** Instagram's Basic Display API
  was retired and scraping needs auth, so the tiles are hand-picked stills that
  link out to both accounts. A live feed means the Instagram Graph API (needs a
  linked Facebook business account) or a hosted widget like Behold or
  EmbedSocial — swapping `InstagramStrip.astro` is a contained change.
- **There is no contact form.** The Visit page gives the email address, both
  Instagram accounts, hours and directions instead. A static site can't process
  a form on its own, and a form that silently fails is worse than none — adding
  one means Formspree, Netlify Forms or similar.

## Deploying

The build output in `dist/` is plain static files. Netlify, Cloudflare Pages,
Vercel and GitHub Pages all work; build command `npm run build`, publish
directory `dist`. Update `site` in [`astro.config.mjs`](astro.config.mjs) if
the domain changes, since it drives the sitemap and canonical URLs.
