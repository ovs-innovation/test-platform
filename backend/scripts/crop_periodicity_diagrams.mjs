import { loadImage, createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function crop(pageName, box, outName) {
  const imgPath = path.resolve(__dirname, 'periodicity_pages', pageName);
  const img = await loadImage(imgPath);
  const canvas = createCanvas(box.width, box.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);
  const outPath = path.resolve(__dirname, 'periodicity_diagrams', outName);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`Saved ${outName}`);
}

async function run() {
  // 1. Q63 Solution diagram (Page 15)
  // Boxed periodic trend: C N O F (Size decreases), Cl Br (Size increases)
  await crop('page_015.png', { x: 285, y: 340, width: 310, height: 165 }, 'q63_sol_diagram.png');

  // 2. Q107 Solution diagram (Page 27)
  // Boxed trend: P > S > Mg > Al (Half filled stability / Penetrating power of s > p)
  await crop('page_027.png', { x: 280, y: 1140, width: 685, height: 125 }, 'q107_sol_diagram.png');

  // 3. Q133 Question diagram (Page 36)
  // 2x2 grid with Group and Period arrows: A' B' / C' D'
  await crop('page_036.png', { x: 505, y: 10, width: 145, height: 75 }, 'q133_q_diagram.png');

  // 4. Q164 Solution diagram (Page 45)
  // CCl4 tetrahedral scheme with dipole moments and partial charges
  await crop('page_045.png', { x: 280, y: 400, width: 610, height: 235 }, 'q164_sol_diagram.png');
}
run().catch(console.error);
