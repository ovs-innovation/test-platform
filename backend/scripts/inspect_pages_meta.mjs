import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'ecology_pages');
const uploadsDir = path.join(__dirname, '../public/uploads/ecology');
const frontendUploadsDir = path.join(__dirname, '../../frontend/public/uploads/ecology');

fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(frontendUploadsDir, { recursive: true });

async function inspectPage(pageNum) {
  const p = path.join(pagesDir, `page_${pageNum}.png`);
  const meta = await sharp(p).metadata();
  console.log(`Page ${pageNum} meta: ${meta.width} x ${meta.height}`);
}

async function main() {
  for (let i = 78; i <= 91; i++) {
    await inspectPage(i);
  }
}

main().catch(console.error);
