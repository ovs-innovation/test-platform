import sharp from 'sharp';
import fs from 'fs';

const diagrams = [
  { name: 'q_18', page: 6, left: 110, top: 520, width: 390, height: 305 },
  { name: 'q_19', page: 6, left: 130, top: 1065, width: 405, height: 290 },
  { name: 'q_21', page: 7, left: 135, top: 395, width: 385, height: 350 },
  { name: 'q_66', page: 16, left: 75, top: 760, width: 515, height: 295 },
  { name: 'q_71', page: 18, left: 105, top: 240, width: 510, height: 295 }
];

async function main() {
  for (const d of diagrams) {
    const input = `./scripts/neural_rendered_pages/page_${d.page}.png`;
    const output = `./scripts/neural_diagrams/${d.name}.png`;
    await sharp(input)
      .extract({ left: d.left, top: d.top, width: d.width, height: d.height })
      .toFile(output);
    const meta = await sharp(output).metadata();
    console.log(`Saved ${d.name}.png: ${meta.width}x${meta.height}`);
  }
}

main().catch(console.error);

