import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function slicePage(pageNum) {
  const pageFile = path.resolve(__dirname, 'fluids_pages', `page_${String(pageNum).padStart(3, '0')}.png`);
  for (let i = 0; i < 4; i++) {
    const top = i * 290;
    const height = 310;
    await sharp(pageFile)
      .extract({ left: 0, top, width: 918, height })
      .png()
      .toFile(path.resolve(__dirname, `slice_p${pageNum}_${i}.png`));
  }
}

async function run() {
  const pages = [2, 3, 4, 5, 16, 18, 20, 31, 33, 43, 54, 58, 60, 65, 71, 80];
  for (const p of pages) {
    await slicePage(p);
  }
  console.log('Sliced pages:', pages.join(', '));
}

run().catch(console.error);
