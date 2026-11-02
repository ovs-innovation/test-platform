import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  const pages = [13, 22, 29, 35, 37, 39, 44];
  for (const p of pages) {
    const meta = await sharp(`scripts/complex_pages/page_${p}.png`).metadata();
    console.log(`Page ${p}: ${meta.width}x${meta.height}`);
  }
}

main().catch(console.error);

