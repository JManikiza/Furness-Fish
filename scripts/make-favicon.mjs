/**
 * Favicon generation: the FF monogram.
 *
 * The crest cannot be used at favicon sizes - below about 32px the boat,
 * gulls, waves and bed of fish collapse into a smudge. Instead the icon is a
 * monogram built from the site's own letterform: the F is cut out of the
 * "Fish Market" line of the wordmark, so this is genuinely the brand typeface
 * rather than a lookalike serif.
 *
 * The two Fs are staggered - first high and left in bone, second low and right
 * in brass, with the bone one crossing over the top. The colour separation is
 * doing real work: with both letters the same colour the overlap turns to mush.
 *
 * Run: node scripts/make-favicon.mjs
 *      node scripts/make-favicon.mjs --preview [out.png]   magnified check
 */
import sharp from 'sharp';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');
const WORDMARK = path.join(ROOT, 'src/assets/logo-wordmark.png');

const INK = '#071c27';
const BONE = '#f7f3eb';
const BRASS = '#a8823f';

/** The F of "Fish" in the lower line of the wordmark. */
const CROP = { left: 72, top: 218, width: 64, height: 77 };

/** Chosen geometry. Offsets are fractions of the letter height, so the mark
 *  stays identical at every output size. */
const DESIGN = {
  overlap: 0.38, // how much the second F sits under the first
  dx: 0.07, // extra horizontal step, as a fraction of letter height
  dy: 0.15, // vertical drop of the second F
  inner: 0.75, // mark size as a fraction of the tile
};

const hex = (h) => ({
  r: parseInt(h.slice(1, 3), 16),
  g: parseInt(h.slice(3, 5), 16),
  b: parseInt(h.slice(5, 7), 16),
});

/** The brand F, recoloured, at a given pixel height. */
async function letterF(colour, height) {
  const width = Math.round((CROP.width / CROP.height) * height);
  const { data, info } = await sharp(WORDMARK)
    .extract(CROP)
    .resize(width, height, { kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const c = hex(colour);
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    out[i * 4] = c.r;
    out[i * 4 + 1] = c.g;
    out[i * 4 + 2] = c.b;
    out[i * 4 + 3] = data[i * info.channels + 3];
  }
  return {
    buf: await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer(),
    w: info.width,
    h: info.height,
  };
}

/**
 * Build the tile at `size`. The mark is always composed large and scaled down
 * in a single step, which keeps the serifs clean even at 16px.
 */
async function tile(size, { ground = INK, transparent = false } = {}) {
  const WORK = 400;
  const first = await letterF(BONE, WORK);
  const second = await letterF(BRASS, WORK);
  const dx = Math.round(WORK * DESIGN.dx);
  const dy = Math.round(WORK * DESIGN.dy);
  const step = Math.round(first.w * (1 - DESIGN.overlap)) + dx;

  // brass laid down first, bone crossing over the top
  const mark = await sharp({
    create: { width: step + second.w, height: WORK + dy, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: second.buf, left: step, top: dy },
      { input: first.buf, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();

  const inner = Math.round(size * DESIGN.inner);
  let pipeline = sharp(mark).trim({ threshold: 1 }).resize(inner, inner, { fit: 'inside', kernel: 'lanczos3' });
  // A light unsharp mask buys back a little serif definition at tab sizes,
  // where the downscale is steep enough to soften the stems.
  if (size <= 32) pipeline = pipeline.sharpen({ sigma: 0.5, m1: 1, m2: 0.4 });
  const fitted = await pipeline.toBuffer();
  const m = await sharp(fitted).metadata();

  const base = transparent
    ? { create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }
    : { create: { width: size, height: size, channels: 4, background: ground } };

  return sharp(base)
    .composite([{ input: fitted, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Minimal ICO container holding PNG frames (supported everywhere since IE11). */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  let offset = 6 + frames.length * 16;
  const dir = [];
  for (const f of frames) {
    const e = Buffer.alloc(16);
    e.writeUInt8(f.size >= 256 ? 0 : f.size, 0);
    e.writeUInt8(f.size >= 256 ? 0 : f.size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(f.data.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += f.data.length;
  }
  return Buffer.concat([header, ...dir, ...frames.map((f) => f.data)]);
}

async function preview(out) {
  const sizes = [16, 32, 48];
  const CELL = 150;
  const PAD = 18;
  const cells = [];
  for (let i = 0; i < sizes.length; i++) {
    const t = await tile(sizes[i]);
    cells.push({ input: await sharp(t).resize(CELL, CELL, { kernel: 'nearest' }).png().toBuffer(), left: PAD + i * (CELL + PAD), top: 46 });
  }
  const W = PAD + sizes.length * (CELL + PAD);
  const heads = sizes
    .map((s, i) => `<text x="${PAD + i * (CELL + PAD) + CELL / 2}" y="32" font-family="Segoe UI, sans-serif" font-size="18" fill="#a8823f" text-anchor="middle">${s}px</text>`)
    .join('');
  await sharp({ create: { width: W, height: 46 + CELL + PAD, channels: 4, background: '#12202a' } })
    .composite([...cells, { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${46 + CELL + PAD}">${heads}</svg>`), top: 0, left: 0 }])
    .png()
    .toFile(out);
  console.log('wrote', out);
}

async function build() {
  await mkdir(PUB, { recursive: true });

  const frames = [];
  for (const size of [16, 32, 48]) frames.push({ size, data: await tile(size) });
  await writeFile(path.join(PUB, 'favicon.ico'), buildIco(frames));
  console.log(`favicon.ico            16 + 32 + 48`);

  await writeFile(path.join(PUB, 'favicon-32.png'), frames[1].data);
  await writeFile(path.join(PUB, 'favicon-192.png'), await tile(192));
  await writeFile(path.join(PUB, 'apple-touch-icon.png'), await tile(180));
  console.log('favicon-32.png, favicon-192.png, apple-touch-icon.png');

  // The mark is derived from raster artwork, so there is no honest vector
  // version to ship. Remove any SVG left behind by an earlier run.
  await rm(path.join(PUB, 'favicon.svg'), { force: true });
}

if (process.argv[2] === '--preview') await preview(process.argv[3] ?? path.join(ROOT, 'favicon-preview.png'));
else await build();
