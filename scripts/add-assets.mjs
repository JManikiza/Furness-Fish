/**
 * Second batch of client-supplied assets: the background-removed logo, the
 * oyster bar, the paella sketch, and stills pulled from the stall's videos.
 */
import sharp from 'sharp';
import path from 'node:path';

const DL = 'C:/Users/Joven/Downloads';
const OUT = 'C:/Users/Joven/Documents/GitHub/Furness-Fish/src/assets';

const PHOTOS = [
  ['OysterBar.jpg',                    'oyster-bar-boat.jpg',      1080],
  ['Paella.JPG',                       'paella-sketch.jpg',        1800],
  ['bestoysters_frame_0m00s.png',      'oyster-bar-queue.jpg',      720],
  ['carlingfordoyster_frame_0m00s.png','carlingford-oyster.jpg',    720],
  ['langoustine_frame_0m00s.png',      'langoustines.jpg',          720],
  ['scallopshells_frame_0m00s.png',    'scallop-shells.jpg',        720],
  ['scallopshells2_frame_0m00s.png',   'scallop-shells-open.jpg',   720],
  ['urchin_frame_0m00s.png',           'sea-urchins.jpg',           720],
];

for (const [src, dest, width] of PHOTOS) {
  const info = await sharp(path.join(DL, src))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, dest));
  console.log(`${dest.padEnd(26)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ${(info.size / 1024).toFixed(0).padStart(5)} KB`);
}

// The supplied logo already has a clean alpha channel, so it is used as-is for
// the navy mark; the white mark reuses that same alpha with the RGB forced to
// white, which keeps both colourways pixel-identical in shape.
const LOGO = path.join(DL, 'upscaled_logo-removebg-preview.png');
await sharp(LOGO).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo-wordmark.png'));

const { data, info } = await sharp(LOGO).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(info.width * info.height * 4);
for (let i = 0; i < info.width * info.height; i++) {
  const o = i * info.channels;
  out[i * 4] = 255; out[i * 4 + 1] = 255; out[i * 4 + 2] = 255;
  out[i * 4 + 3] = data[o + 3];
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'logo-wordmark-white.png'));
console.log(`logo-wordmark.png + white   ${info.width}x${info.height}`);
