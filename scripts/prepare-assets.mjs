import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'C:/Users/Joven/Documents/GitHub/Furness-Fish';
const OUT = path.join(ROOT, 'src/assets');
const PUB = path.join(ROOT, 'public');

// [source, destination, maxWidth]  — .rotate() applies EXIF orientation (files tagged 6 are sideways)
const PHOTOS = [
  // Their own site (owned by the client)
  ['.download/wix-banner.png',    'hero-seabass.jpg',      2600],
  ['.download/wix-hero-wide.jpg', 'team-counter.jpg',      2600],
  ['.download/wix-portrait.jpeg', 'jamie-spread.jpg',      1700],
  ['.download/wix-counter.jpg',   'counter-tuna.jpg',      1920],
  ['.download/wix-jamie.jpg',     'jamie-book.jpg',         462],
  // Repo photography
  ['Images/IMG_0364.JPG',                  'counter-lantern.jpg',   2400],
  ['Images/IMG_0373.JPG',                  'counter-monkfish.jpg',  2400],
  ['Images/IMG_1752.JPEG',                 'counter-customers.jpg', 1800],
  ['Images/IMG_1875.JPEG',                 'counter-creels.jpg',    2000],
  ['Images/IMG_1876.JPEG',                 'counter-cornish.jpg',   2000],
  ['Images/IMG_0381.JPG',                  'hake-board.jpg',        1600],
  ['Images/nahfam.JPG',                    'mullet-clams.jpg',      1685],
  ['Images/oysters.jpg',                   'oysters.jpg',           1024],
  ['Images/thumbnail_20181129_122621.jpg', 'oyster-bar-board.jpg',   915],
  ['Images/Shop.jpg',                      'shopfront.jpg',          800],
  ['Images/carosel1.JPG',                  'counter-monk.jpg',      2200],
  ['Images/carosel2.JPG',                  'counter-salmon.jpg',    2200],
  ['Images/carosel3.JPG',                  'counter-wide.jpg',      2200],
  ['Images/Scallops.jpg',                  'scallops.jpg',           900],
  ['Images/mussel.jpg',                    'mussels.jpg',            900],
  ['Images/octopus-864.jpg',               'octopus.jpg',            864],
  ['Images/plaice.jpg',                    'plaice.jpg',             900],
];

const LOGOS = [
  ['.download/logo-crest-blue.png',  'logo-crest.png'],
  ['.download/logo-crest-white.png', 'logo-crest-white.png'],
  ['Images/logonameb.png',           'logo-wordmark.png'],
];

await mkdir(OUT, { recursive: true });
await mkdir(PUB, { recursive: true });

for (const [src, dest, width] of PHOTOS) {
  const out = path.join(OUT, dest);
  const info = await sharp(path.join(ROOT, src))
    .rotate()                       // honour EXIF orientation
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(`${dest.padEnd(26)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ${(info.size / 1024).toFixed(0).padStart(5)} KB`);
}

for (const [src, dest] of LOGOS) {
  const out = path.join(OUT, dest);
  const info = await sharp(path.join(ROOT, src)).png({ compressionLevel: 9 }).toFile(out);
  console.log(`${dest.padEnd(26)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ${(info.size / 1024).toFixed(0).padStart(5)} KB`);
}

// Favicon: the crest, padded square, on brand blue
await sharp(path.join(ROOT, '.download/logo-crest-white.png'))
  .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 30, bottom: 30, left: 30, right: 30, background: { r: 0x08, g: 0x20, b: 0x2d, alpha: 1 } })
  .png()
  .toFile(path.join(PUB, 'favicon.png'));
console.log('favicon.png written');

await copyFile(path.join(ROOT, 'Images/Slowfood.gif'), path.join(PUB, 'slowfood.gif'));
console.log('slowfood.gif copied');
