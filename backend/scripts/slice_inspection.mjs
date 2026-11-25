import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function slicePage(pageNum) {
  const pageFile = path.resolve(__dirname, 'fluids_pages', `page_${String(pageNum).padStart(3, '0')}.png`);
  for (let i = 0; i < 4; i++) {
    const top = i * 290;
    const height = 300;
    await sharp(pageFile)
      .extract({ left: 0, top, width: 918, height })
      .png()
      .toFile(path.resolve(__dirname, `slice_p${pageNum}_${i}.png`));
  }
}

async function run() {
  await slicePage(39);
  await slicePage(40);
}

run().catch(console.error);
