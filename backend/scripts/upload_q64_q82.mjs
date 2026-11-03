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

async function uploadMissing() {
  const configs = [
    {
      id: 'neural_q64_brain_sagittal',
      src: path.join(__dirname, 'neural_p305_c2.png'),
      crop: { left: 40, top: 280, width: 640, height: 430 }
    },
    {
      id: 'neural_q82_action_potential',
      src: path.join(__dirname, 'neural_p307_c1.png'),
      crop: { left: 40, top: 800, width: 640, height: 450 }
    }
  ];

  const jsonPath = path.join(__dirname, 'neural_diagram_urls.json');
  const urls = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  for (const c of configs) {
    const outPath = path.join(__dirname, `${c.id}.png`);
    await sharp(c.src).extract(c.crop).toFile(outPath);
    console.log(`Uploading ${c.id}...`);
    const res = await cloudinary.uploader.upload(outPath, {
      folder: 'edvedum_zoology/neural_control_coordination',
      public_id: c.id,
      overwrite: true
    });
    urls[c.id] = res.secure_url;
    console.log(`${c.id} uploaded: ${res.secure_url}`);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2));
  console.log(`Saved updated ${jsonPath}`);
}

uploadMissing().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
