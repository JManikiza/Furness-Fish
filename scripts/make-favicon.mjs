/**
 * Favicon generation.
 *
 * The crest cannot simply be downscaled: at 16px the boat, gulls, waves and
 * bed of fish collapse into a blue smudge. So the small sizes use a mark drawn
 * for the job - the smack's two sails over a hull - in the site's own palette.
 *
 * Run: node scripts/make-favicon.mjs [--candidates]
 *   --candidates  writes a magnified comparison sheet instead of the real files
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'C:/Users/Joven/Documents/GitHub/Furness-Fish';
const PUB = path.join(ROOT, 'public');

const INK = '#071c27';
const BONE = '#f7f3eb';
const BRASS = '#a8823f';
const BRAND = '#0070a0';

/** The smack under sail: two sails, a hull, a waterline. Nothing else. */
export function sailSvg({ ground = INK, sails = BONE, hull = BRASS, ring = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="0" fill="${ground}"/>
  ${ring ? `<circle cx="32" cy="32" r="27.5" fill="none" stroke="${BRASS}" stroke-width="1.4" opacity="0.75"/>` : ''}
  <g fill="${sails}">
    <path d="M30.2 11.5 L30.2 41.5 L14.8 41.5 Q21.5 26.5 30.2 11.5 Z"/>
    <path d="M33.8 15.5 L33.8 41.5 L50.0 41.5 Q43.5 28.0 33.8 15.5 Z"/>
  </g>
  <path d="M11 44 H53 Q48 51.5 32 51.5 Q16 51.5 11 44 Z" fill="${hull}"/>
</svg>`;
}

/** Alternative: the wordmark's serif F, which is unmistakably legible at 16px. */
function monogramSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="${INK}"/>
  <circle cx="32" cy="32" r="27" fill="none" stroke="${BRASS}" stroke-width="1.5" opacity="0.8"/>
  <text x="32" y="45.5" font-family="Georgia, 'Times New Roman', serif" font-size="42"
        font-weight="600" fill="${BONE}" text-anchor="middle">F</text>
</svg>`;
}

const render = (svg, size) =>
  sharp(Buffer.from(svg), { density: 900 }).resize(size, size, { fit: 'contain' }).png();

/** Minimal ICO container holding PNG frames (supported everywhere since IE11). */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const dir = [];
  for (const f of frames) {
    const e = Buffer.alloc(16);
    e.writeUInt8(f.size >= 256 ? 0 : f.size, 0); // width  (0 means 256)
    e.writeUInt8(f.size >= 256 ? 0 : f.size, 1); // height
    e.writeUInt8(0, 2); // palette size
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(f.data.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += f.data.length;
  }
  return Buffer.concat([header, ...dir, ...frames.map((f) => f.data)]);
}

async function candidates() {
  const OUT = process.argv[3] ?? path.join(ROOT, 'favicon-candidates.png');
  const options = [
    ['Sail on ink', sailSvg()],
    ['Sail + brass ring', sailSvg({ ring: true })],
    ['Sail on brand blue', sailSvg({ ground: BRAND, sails: BONE, hull: INK })],
    ['Serif F monogram', monogramSvg()],
    ['Crest, downscaled', null],
  ];
  const sizes = [16, 32, 48];
  const CELL = 132;
  const PAD = 16;
  const LABEL_W = 210;

  const rows = [];
  for (const [name, svg] of options) {
    const cells = [];
    for (const s of sizes) {
      let buf;
      if (svg) {
        buf = await render(svg, s).toBuffer();
      } else {
        // the existing approach: whole crest shrunk onto the ink ground
        buf = await sharp({ create: { width: 64, height: 64, channels: 4, background: INK } })
          .composite([
            {
              input: await sharp(path.join(ROOT, 'src/assets/logo-crest-white.png'))
                .resize(52, 52, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
                .toBuffer(),
              top: 6,
              left: 6,
            },
          ])
          .png()
          .toBuffer();
        buf = await sharp(buf).resize(s, s).png().toBuffer();
      }
      // magnify with nearest neighbour so the real pixels are visible
      cells.push(await sharp(buf).resize(CELL, CELL, { kernel: 'nearest' }).png().toBuffer());
    }
    rows.push({ name, cells });
  }

  const W = LABEL_W + sizes.length * (CELL + PAD) + PAD;
  const H = PAD + rows.length * (CELL + PAD) + 40;
  const labels = rows
    .map(
      (r, i) =>
        `<text x="14" y="${PAD + 40 + i * (CELL + PAD) + 24}" font-family="Segoe UI, sans-serif" font-size="19" fill="#f7f3eb">${r.name}</text>`,
    )
    .join('');
  const heads = sizes
    .map(
      (s, i) =>
        `<text x="${LABEL_W + i * (CELL + PAD) + CELL / 2}" y="30" font-family="Segoe UI, sans-serif" font-size="17" fill="#a8823f" text-anchor="middle">${s}px</text>`,
    )
    .join('');

  const composites = [];
  rows.forEach((r, ri) =>
    r.cells.forEach((c, ci) =>
      composites.push({ input: c, left: LABEL_W + ci * (CELL + PAD), top: PAD + 40 + ri * (CELL + PAD) }),
    ),
  );

  await sharp({ create: { width: W, height: H, channels: 4, background: '#12202a' } })
    .composite([
      ...composites,
      { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${heads}${labels}</svg>`), top: 0, left: 0 },
    ])
    .png()
    .toFile(OUT);
  console.log('wrote', OUT);
}

async function build() {
  await mkdir(PUB, { recursive: true });
  const svg = sailSvg();

  // Multi-size .ico for /favicon.ico, which browsers request by default
  const frames = [];
  for (const size of [16, 32, 48]) {
    frames.push({ size, data: await render(svg, size).toBuffer() });
  }
  await writeFile(path.join(PUB, 'favicon.ico'), buildIco(frames));
  console.log('favicon.ico      16 + 32 + 48');

  // Scalable version, which modern browsers prefer over the .ico
  await writeFile(path.join(PUB, 'favicon.svg'), svg);
  console.log('favicon.svg      vector');

  await render(svg, 32).toFile(path.join(PUB, 'favicon-32.png'));
  await render(svg, 180).toFile(path.join(PUB, 'apple-touch-icon.png'));
  console.log('favicon-32.png, apple-touch-icon.png');
}

if (process.argv[2] === '--candidates') await candidates();
else await build();
