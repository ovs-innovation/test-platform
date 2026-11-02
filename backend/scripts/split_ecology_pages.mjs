import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userUploadDir = 'C:\\Users\\rs004\\.gemini\\antigravity-ide\\brain\\17e84f12-f0f0-467e-9e84-3e64c8f2e457\\.user_uploaded';
const outputDir = path.join(__dirname, 'ecology_pages');
fs.mkdirSync(outputDir, { recursive: true });

async function splitQuad(file, pTL, pTR, pBL, pBR) {
  const imgPath = path.join(userUploadDir, file);
  const meta = await sharp(imgPath).metadata();
  const midX = Math.round(meta.width / 2);
  const midY = Math.round(meta.height / 2);

  // Top-Left
  await sharp(imgPath).extract({ left: 0, top: 0, width: midX, height: midY }).toFile(path.join(outputDir, `page_${pTL}.png`));
  // Top-Right
  await sharp(imgPath).extract({ left: midX, top: 0, width: meta.width - midX, height: midY }).toFile(path.join(outputDir, `page_${pTR}.png`));
  // Bottom-Left
  await sharp(imgPath).extract({ left: 0, top: midY, width: midX, height: meta.height - midY }).toFile(path.join(outputDir, `page_${pBL}.png`));
  // Bottom-Right
  await sharp(imgPath).extract({ left: midX, top: midY, width: meta.width - midX, height: meta.height - midY }).toFile(path.join(outputDir, `page_${pBR}.png`));

  console.log(`Split ${file} into pages ${pTL}, ${pTR}, ${pBL}, ${pBR}`);
}

async function splitDual(file, pL, pR) {
  const imgPath = path.join(userUploadDir, file);
  const meta = await sharp(imgPath).metadata();
  const midX = Math.round(meta.width / 2);

  // Left
  await sharp(imgPath).extract({ left: 0, top: 0, width: midX, height: meta.height }).toFile(path.join(outputDir, `page_${pL}.png`));
  // Right
  await sharp(imgPath).extract({ left: midX, top: 0, width: meta.width - midX, height: meta.height }).toFile(path.join(outputDir, `page_${pR}.png`));

  console.log(`Split ${file} into pages ${pL}, ${pR}`);
}

async function main() {
  await splitQuad('media_1793275882184.png', 78, 79, 80, 81);
  await splitQuad('media_1793275925721.png', 82, 83, 84, 85);
  await splitQuad('media_1793275942123.png', 86, 87, 88, 89);
  await splitDual('media_1793275952998.png', 90, 91);
  console.log('✓ All 14 booklet pages extracted successfully!');
}

main().catch(console.error);
