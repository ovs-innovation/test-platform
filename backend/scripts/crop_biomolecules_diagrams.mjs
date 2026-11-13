import sharp from 'sharp';
import fs from 'fs';

const diagrams = [
  { name: 'q_7', page: 4, left: 65, top: 235, width: 595, height: 218 },
  
  { name: 'q_16_a', page: 6, left: 65, top: 265, width: 275, height: 228 },
  { name: 'q_16_b', page: 6, left: 65, top: 488, width: 270, height: 225 },
  { name: 'q_16_c', page: 6, left: 65, top: 708, width: 270, height: 215 },
  { name: 'q_16_d', page: 6, left: 65, top: 928, width: 270, height: 215 },

  { name: 'q_60', page: 17, left: 65, top: 650, width: 640, height: 388 },
  { name: 'q_70', page: 19, left: 65, top: 845, width: 590, height: 250 },
  { name: 'q_76', page: 21, left: 65, top: 238, width: 600, height: 400 },
  { name: 'q_78', page: 22, left: 65, top: 255, width: 310, height: 410 },
  { name: 'q_80', page: 23, left: 68, top: 285, width: 345, height: 380 },
  { name: 'q_81', page: 24, left: 65, top: 300, width: 600, height: 285 },
  { name: 'q_83', page: 25, left: 65, top: 255, width: 480, height: 442 }
];

async function main() {
  for (const d of diagrams) {
    const input = `./scripts/biomolecules_rendered_pages/page_${d.page}.png`;
    const output = `./scripts/biomolecules_diagrams/${d.name}.png`;
    await sharp(input)
      .extract({ left: d.left, top: d.top, width: d.width, height: d.height })
      .toFile(output);
    const meta = await sharp(output).metadata();
    console.log(`Saved ${d.name}.png: ${meta.width}x${meta.height}`);
  }
}

main().catch(console.error);
