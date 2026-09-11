# Furness Fish Market

Brochure site for Furness Fish Market, Borough Market, London - built with
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
  data/site.ts  Nav, contact details, hours, the catch, the team - edit here
  layouts/      BaseLayout: <head>, header, footer, scroll-reveal script
  pages/        One file per route
  styles/       global.css - the whole design system
public/         Served as-is: favicon, robots.txt, Slow Food logo, video/
scripts/        One-off asset preparation (see below)
legacy/         The previous hand-written HTML site, kept for reference
```

### Editing content

Almost everything that appears in more than one place lives in
[`src/data/site.ts`](src/data/site.ts) - opening hours, the address, the
Instagram handles, the fish list, the oyster varieties, the team roster. Change
it there and it updates across every page.

### The design system

[`src/styles/global.css`](src/styles/global.css) holds the whole thing as CSS
custom properties - colours, type scale, spacing, layout widths.

- **Brand blue `#0070A0`** - sampled directly from the crest artwork
- **Ink `#071C27`** - deep sea navy for hero scrims, footer, dark bands
- **Bone `#F7F3EB`** - warm paper ground (white reads cheap at this scale)
- **Brass `#A8823F`** - the single metallic accent, used only on rules,
  eyebrow labels and hover states
- **Type** - Cormorant Garamond for display, Jost for body and UI

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
and `prefers-reduced-motion` honoured - the scroll-reveal animation is disabled
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
| `contact-sheet.mjs`    | Montage stock candidates into one sheet for reviewing                    |
| `add-assets.mjs`       | Second batch: the transparent logo, oyster bar, paella sketch, stills    |

These are one-off tools, not part of the build - `npm run build` doesn't
invoke them.

**Provenance:** the shop's own photographs (counter, team, shopfront, the
Oyster Boat, the paella sketch, the Jamie Oliver spread, and stills pulled from
the stall's own videos) come from the existing archive and from
furnessfishmarkets.com. Four supporting images - the two paella pan shots, the
black-and-white harbour boat and the dawn day boat - are from
[Pexels](https://www.pexels.com) under the Pexels licence (free for commercial
use, no attribution required).

## Video

Two videos, handled differently, both kept off the critical path.

**The Oyster Boat clip** is self-hosted at `public/video/oyster-bar.mp4`. It is
a plain `<video>` with `preload="metadata"` and a poster, so a visitor
downloads a few KB of header until they actually press play. No JavaScript.

The source was 44MB of HEVC, which Chrome cannot decode. It was re-encoded with
ffmpeg to H.264 at 640px wide, denoised first because handheld market footage
compresses badly:

```bash
ffmpeg -i 45minuteoysterbar.mov -c:v libx264 -crf 31 -preset slower   -pix_fmt yuv420p -vf "hqdn3d=4:3:6:6,scale=640:-2"   -c:a aac -b:a 96k -movflags +faststart public/video/oyster-bar.mp4
```

A VP9/WebM version was tried and came out consistently *larger* than H.264 on
this footage, so it was dropped: one MP4 plays everywhere anyway.

**The company film** is on YouTube, embedded through a facade in
`VideoBlock.astro`. YouTube's real embed pulls in the best part of a megabyte
of script on page load, which would undo the rest of this site, so the page
renders our own poster and only builds the `youtube-nocookie.com` iframe once
someone clicks. Total JavaScript for the whole site is still 2.4 KB.

## Favicon

The crest cannot be used directly at favicon sizes - the boat, gulls, waves and
bed of fish collapse into a smudge below about 32px. The icon is therefore a
mark drawn for the job in `scripts/make-favicon.mjs`: the smack's two sails
over a hull, in bone and brass on the site's ink navy.

```bash
node scripts/make-favicon.mjs              # writes the real files
node scripts/make-favicon.mjs --candidates # magnified comparison sheet
```

It produces a 3-frame `favicon.ico` (16/32/48, 1.5 KB), a scalable
`favicon.svg` that modern browsers prefer, and a 180px
`apple-touch-icon.png` for iOS home screens.

Note that browsers only auto-request `/favicon.ico` at the *origin* root, which
on the project-site URL is outside the base path. The explicit `<link>` tags in
`BaseLayout.astro` cover that; on a custom domain the root request resolves too.

## Known gaps

- **The Instagram grid is curated, not live.** Instagram's Basic Display API
  was retired and scraping needs auth, so the tiles are hand-picked stills that
  link out to both accounts. A live feed means the Instagram Graph API (needs a
  linked Facebook business account) or a hosted widget like Behold or
  EmbedSocial - swapping `InstagramStrip.astro` is a contained change.
- **The contact form needs one access key before it sends.** The enquiry form
  on the Visit page posts to [Web3Forms](https://web3forms.com) (free, no
  submission limit). Enter `furnessfishmarket@gmail.com` on their site, they
  email an access key back, and you paste it into `contact.formAccessKey` in
  [`src/data/site.ts`](src/data/site.ts). Until then the page renders the email
  address instead of the form, so nothing ever pretends to work. With JS the
  form submits inline; without JS the plain POST still goes through and lands on
  `/thank-you/`.

## Deploying

Published to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds on every push to `master`. Nothing is committed from `dist/` -
the workflow builds it and hands the output to Pages.

**One-time setup:** repo Settings -> Pages -> Source: **GitHub Actions**.
Without that the workflow has nowhere to publish to.

Live at <https://jmanikiza.github.io/Furness-Fish/>

### The subfolder catch

A GitHub Pages *project* site is served from `/Furness-Fish/`, not the domain
root, so a bare `href="/visit/"` would 404. Every internal link, asset and
video path goes through `withBase()` in
[`src/lib/paths.ts`](src/lib/paths.ts), which prefixes
`import.meta.env.BASE_URL`.

`public/.nojekyll` is there so Pages never strips the `_astro/` directory.
The Actions deploy path doesn't run Jekyll anyway, but it costs nothing.

### Moving to furnessfishmarkets.com later

Wix cannot host this - it has no way to accept a built static site - so the
domain has to move off Wix first. Then:

1. `astro.config.mjs`: `site: 'https://www.furnessfishmarkets.com'`, `base: '/'`
2. Add `public/CNAME` containing `www.furnessfishmarkets.com`
3. Point DNS at GitHub Pages, and set the custom domain in repo Settings -> Pages

Because everything already goes through `withBase()`, step 1 is the only code
change - no link rewriting needed.
