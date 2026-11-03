import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const PAGES_DIR = path.join(__dirname, 'chemical_pages_part2');

async function uploadDiagrams() {
  const p334 = path.join(PAGES_DIR, 'page_334.png');
  const meta = await sharp(p334).metadata();
  const colW = Math.floor(meta.width / 2);

  // 1. Q210: Pituitary labelled diagram
  const q210Path = path.join(__dirname, 'chem_q210_pituitary_labeled.png');
  await sharp(p334)
    .extract({ left: 15, top: 185, width: 95, height: 85 })
    .resize(450, 400, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q210Path);

  console.log('Uploading Q210 diagram to Cloudinary...');
  const res210 = await cloudinary.uploader.upload(q210Path, {
    folder: 'edvedum_zoology/chemical_coordination_integration',
    public_id: 'chem_q210_pituitary_labeled',
    overwrite: true
  });
  console.log('Q210 URL:', res210.secure_url);

  // 2. Q214: Endocrine Glands in Human Body labelled diagram
  const q214Path = path.join(__dirname, 'chem_q214_endocrine_body_labeled.png');
  await sharp(p334)
    .extract({ left: colW + 20, top: 100, width: 90, height: 125 })
    .resize(400, 550, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q214Path);

  console.log('Uploading Q214 diagram to Cloudinary...');
  const res214 = await cloudinary.uploader.upload(q214Path, {
    folder: 'edvedum_zoology/chemical_coordination_integration',
    public_id: 'chem_q214_endocrine_body_labeled',
    overwrite: true
  });
  console.log('Q214 URL:', res214.secure_url);

  const urls = {
    chem_q210_pituitary_labeled: res210.secure_url,
    chem_q214_endocrine_body_labeled: res214.secure_url
  };

  fs.writeFileSync(path.join(__dirname, 'chemical_part2_diagram_urls.json'), JSON.stringify(urls, null, 2));
  console.log('Saved diagram URLs to chemical_part2_diagram_urls.json');
}

uploadDiagrams().catch(console.error);

