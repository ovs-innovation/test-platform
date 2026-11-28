import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
  secure: true
});

const pagesDir = path.resolve(__dirname, 'biomolecules_pages_141');
const diagramsDir = path.resolve(__dirname, 'biomolecules_diagrams');
fs.mkdirSync(diagramsDir, { recursive: true });

const draft = JSON.parse(fs.readFileSync(path.join(__dirname, 'biomolecules_draft_219.json'), 'utf8'));
const urlFile = path.resolve(__dirname, 'biomolecules_diagram_urls.json');

const urls = {};
if (fs.existsSync(urlFile)) {
  try {
    Object.assign(urls, JSON.parse(fs.readFileSync(urlFile, 'utf8')));
  } catch (_) {}
}

async function main() {
  console.log('=== CROPPING BIOMOLECULES DIAGRAMS ===');

  const filesToUpload = [];

  for (const q of draft) {
    const pageImgPath = path.join(pagesDir, `page_${String(q.page).padStart(3, '0')}.png`);
    if (!fs.existsSync(pageImgPath)) continue;

    // 1. Question Diagram
    if (q.hasQuestionDiagram && q.qCrop) {
      const filename = `biomolecules_q${q.question_number}_question.png`;
      const filePath = path.join(diagramsDir, filename);

      if (!fs.existsSync(filePath)) {
        const img = await loadImage(pageImgPath);
        const cropLeft = 80;
        const cropWidth = img.width - 160;
        const cropTop = Math.max(0, q.qCrop.top);
        const cropHeight = Math.min(q.qCrop.height, img.height - cropTop);

        const canvas = createCanvas(cropWidth, cropHeight);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        fs.writeFileSync(filePath, canvas.toBuffer('image/png'));
      }
      filesToUpload.push({ filename, filePath, qNum: q.question_number, type: 'question' });
    }

    // 2. Solution Diagram
    if (q.hasSolutionDiagram && q.solCrop) {
      const filename = `biomolecules_q${q.question_number}_solution.png`;
      const filePath = path.join(diagramsDir, filename);

      if (!fs.existsSync(filePath)) {
        const img = await loadImage(pageImgPath);
        const cropLeft = 80;
        const cropWidth = img.width - 160;
        const cropTop = Math.max(0, q.solCrop.top);
        const cropHeight = Math.min(q.solCrop.height, img.height - cropTop);

        const canvas = createCanvas(cropWidth, cropHeight);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        fs.writeFileSync(filePath, canvas.toBuffer('image/png'));
      }
      filesToUpload.push({ filename, filePath, qNum: q.question_number, type: 'solution' });
    }
  }

  console.log(`Cropped and prepared ${filesToUpload.length} diagrams.`);

  // Upload to Cloudinary
  console.log('=== UPLOADING TO CLOUDINARY ===');
  let uploaded = 0;
  for (const item of filesToUpload) {
    const key = item.filename.replace('.png', '');
    if (urls[key]) {
      continue;
    }

    try {
      const res = await cloudinary.uploader.upload(item.filePath, {
        folder: 'edvedum_biomolecules_jee',
        public_id: key,
        overwrite: true,
        resource_type: 'image'
      });
      urls[key] = res.secure_url;
      uploaded++;
      if (uploaded % 10 === 0 || uploaded === filesToUpload.length) {
        console.log(`Uploaded ${uploaded}/${filesToUpload.length} diagrams to Cloudinary...`);
        fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
      }
    } catch (err) {
      console.error(`Cloudinary upload failed for ${key}:`, err.message);
    }
  }

  fs.writeFileSync(urlFile, JSON.stringify(urls, null, 2));
  console.log(`Cloudinary uploads complete. Total URLs: ${Object.keys(urls).length}`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
