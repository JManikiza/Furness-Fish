/**
 * The original wordmark PNG has an opaque near-white background, so it can't be
 * knocked out with a CSS filter (you get a white rectangle). This derives a
 * proper alpha channel from the artwork's luminance and re-colours it, giving
 * a transparent navy mark and a transparent white mark for dark backgrounds.
 */
import sharp from 'sharp';
import path from 'node:path';

const ROOT = 'C:/Users/Joven/Documents/GitHub/Furness-Fish';
const SRC = path.join(ROOT, 'Images/logonameb.png');
const OUT = path.join(ROOT, 'src/assets');

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Sample the darkest pixel to recover the true brand navy of the wordmark.
let darkest = { lum: 999, rgb: [11, 26, 110] };
for (let i = 0; i < width * height; i++) {
  const o = i * channels;
  const [r, g, b] = [data[o], data[o + 1], data[o + 2]];
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (lum < darkest.lum) darkest = { lum, rgb: [r, g, b] };
}
console.log('wordmark ink sampled:', '#' + darkest.rgb.map((n) => n.toString(16).padStart(2, '0')).join(''));

/** Rebuild as a solid colour whose alpha comes from how dark the source pixel is. */
function recolour([cr, cg, cb]) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const srcAlpha = channels === 4 ? data[o + 3] / 255 : 1;
    const lum = (0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2]) / 255;
    // White background -> alpha 0, navy artwork -> alpha 1, with a soft ramp
    // through the antialiased edge pixels so the mark stays crisp.
    const alpha = Math.max(0, Math.min(1, (1 - lum) * 1.12)) * srcAlpha;
    const q = i * 4;
    out[q] = cr; out[q + 1] = cg; out[q + 2] = cb; out[q + 3] = Math.round(alpha * 255);
  }
  return sharp(out, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 });
}

await recolour(darkest.rgb).toFile(path.join(OUT, 'logo-wordmark.png'));
await recolour([255, 255, 255]).toFile(path.join(OUT, 'logo-wordmark-white.png'));
console.log('wrote logo-wordmark.png + logo-wordmark-white.png', `${width}x${height}`);
