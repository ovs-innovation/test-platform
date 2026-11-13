import fs from 'fs';
import path from 'path';

// Let's inspect the height of the cropped slices. Slices with diagrams are usually notably taller!
const sliceDir = 'backend/scripts/atom_q_slices';
const files = fs.readdirSync(sliceDir).filter(f => f.endsWith('.png'));

// We can check each slice's dimensions with canvas
import { loadImage } from '@napi-rs/canvas';

async function checkHeights() {
  const tall = [];
  for (let i = 1; i <= 90; i++) {
    const file = path.join(sliceDir, `q_${i}.png`);
    if (fs.existsSync(file)) {
      const img = await loadImage(file);
      if (img.height > 300) {
        tall.push({ q: i, height: img.height });
      }
    }
  }
  console.log('Slices with height > 300px:');
  console.table(tall);
}
checkHeights().catch(console.error);

