import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const userUploadDir = 'C:\\Users\\rs004\\.gemini\\antigravity-ide\\brain\\17e84f12-f0f0-467e-9e84-3e64c8f2e457\\.user_uploaded';
const page2 = path.join(userUploadDir, 'media_1793273807533.png');

const crops = [
  {
    name: 'kinetics_q101_logk_vs_inv_t.png',
    input: page2,
    extract: { left: 180, top: 78, width: 175, height: 92 }
  },
  {
    name: 'kinetics_q98_rate_table.png',
    input: page2,
    extract: { left: 30, top: 326, width: 135, height: 42 }
  },
  {
    name: 'kinetics_q105_halflife_pressure_table.png',
    input: page2,
    extract: { left: 195, top: 358, width: 160, height: 48 }
  }
];

async function main() {
  const backendDir = path.join(__dirname, '../public/uploads/kinetics');
  const frontendDir = path.join(__dirname, '../../frontend/public/uploads/kinetics');
  fs.mkdirSync(backendDir, { recursive: true });
  fs.mkdirSync(frontendDir, { recursive: true });

  const mapFile = path.join(__dirname, 'cloudinary_kinetics_diagrams_map.json');
  let currentMap = {};
  if (fs.existsSync(mapFile)) {
    currentMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
  }

  for (const c of crops) {
    const backendPath = path.join(backendDir, c.name);
    const frontendPath = path.join(frontendDir, c.name);

    await sharp(c.input)
      .extract(c.extract)
      .png({ quality: 95 })
      .toFile(backendPath);

    fs.copyFileSync(backendPath, frontendPath);
    console.log(`Cropped and saved: ${c.name}`);

    // Upload to Cloudinary
    const key = `/uploads/kinetics/${c.name}`;
    console.log(`Uploading ${c.name} to Cloudinary...`);
    const uploadRes = await cloudinary.uploader.upload(backendPath, {
      folder: 'edvedum_chemistry/kinetics',
      public_id: path.parse(c.name).name,
      overwrite: true,
      resource_type: 'image'
    });

    currentMap[key] = uploadRes.secure_url;
    console.log(`  ✓ Cloudinary: ${uploadRes.secure_url}`);
  }

  fs.writeFileSync(mapFile, JSON.stringify(currentMap, null, 2));
  console.log('✓ Updated cloudinary_kinetics_diagrams_map.json successfully!');
}

main().catch(console.error);
