/**
 * Royalty-free supporting photography from Pexels (Pexels licence: free for
 * commercial use, no attribution required). Used only where the shop's own
 * archive had no usable high-resolution shot — chiefly the paella pages.
 */
import sharp from 'sharp';
import path from 'node:path';

const OUT = 'C:/Users/Joven/Documents/GitHub/Furness-Fish/src/assets';

const STOCK = [
  { id: '4305836',  name: 'paella-pan.jpg',     width: 2400, note: 'Large paella cooked at a street market' },
  { id: '33041124', name: 'paella-overhead.jpg', width: 2000, note: 'Overhead seafood paella, mussels and prawns' },
  { id: '33885855', name: 'harbour-boat-bw.jpg', width: 2000, note: 'Working fishing boat at harbour, black and white' },
  { id: '19013341', name: 'day-boat-dawn.jpg',   width: 2400, note: 'Day boat heading out at sunrise' },
];

for (const item of STOCK) {
  const url = `https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg?auto=compress&cs=tinysrgb&w=${item.width}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${item.id}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  const info = await sharp(buf)
    .resize({ width: item.width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, item.name));

  console.log(`${item.name.padEnd(24)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ${(info.size / 1024).toFixed(0).padStart(5)} KB  — ${item.note}`);
}
