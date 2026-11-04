import sharp from 'sharp';
import path from 'path';
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

async function recropAndUploadQ158() {
  const src = path.join(__dirname, 'chemical_pages', 'page_329_c1.png');
  const outPath = path.join(__dirname, 'chem_q158_hormone_flowchart.png');
  
  await sharp(src)
    .extract({ left: 50, top: 1050, width: 650, height: 580 })
    .toFile(outPath);
  console.log('Cropped chem_q158_hormone_flowchart.png');

  console.log('Uploading to Cloudinary...');
  const res = await cloudinary.uploader.upload(outPath, {
    folder: 'edvedum_zoology/chemical_coordination_integration',
    public_id: 'chem_q158_hormone_flowchart',
    overwrite: true
  });
  console.log('Cloudinary URL:', res.secure_url);
}

recropAndUploadQ158().catch(console.error);

