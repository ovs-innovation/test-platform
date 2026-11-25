import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function check() {
  const meta = await sharp(path.join(__dirname, 'fluids_pages/page_002.png')).metadata();
  console.log('Page 2 dimensions:', meta.width, 'x', meta.height);
}

check().catch(console.error);
