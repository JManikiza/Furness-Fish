/** Download candidate stock photos at thumbnail size and montage them into one
 *  labelled grid, so a whole search can be judged in a single glance. */
import sharp from 'sharp';
import path from 'node:path';

const ids = process.argv[2].split(',');
const outFile = process.argv[3] ?? 'sheet.jpg';
const CELL_W = 460;
const CELL_H = 330;
const COLS = 4;

const cells = await Promise.all(
  ids.map(async (id) => {
    const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const label = Buffer.from(
      `<svg width="${CELL_W}" height="${CELL_H}"><rect x="0" y="${CELL_H - 30}" width="120" height="30" fill="#000" opacity="0.75"/>
       <text x="10" y="${CELL_H - 9}" font-family="monospace" font-size="17" fill="#fff">${id}</text></svg>`,
    );
    return sharp(buf)
      .resize(CELL_W, CELL_H, { fit: 'cover' })
      .composite([{ input: label, top: 0, left: 0 }])
      .jpeg({ quality: 78 })
      .toBuffer();
  }),
);

const rows = Math.ceil(cells.length / COLS);
await sharp({
  create: {
    width: CELL_W * COLS,
    height: CELL_H * rows,
    channels: 3,
    background: '#111',
  },
})
  .composite(
    cells.map((input, i) => ({
      input,
      left: (i % COLS) * CELL_W,
      top: Math.floor(i / COLS) * CELL_H,
    })),
  )
  .jpeg({ quality: 80 })
  .toFile(path.resolve(outFile));

console.log(`wrote ${outFile} — ${cells.length} candidates`);
