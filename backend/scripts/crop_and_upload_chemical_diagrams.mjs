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

const PAGES_DIR = path.join(__dirname, 'chemical_pages');

// Configs for diagrams across the pages
const DIAGRAM_CONFIGS = [
  {
    id: 'chem_q9_pituitary_hypothalamus',
    page: 'page_315_c1.png',
    crop: { left: 40, top: 80, width: 670, height: 600 }
  },
  {
    id: 'chem_q15_thyroid_dorsal_view',
    page: 'page_315_c2.png',
    crop: { left: 80, top: 1200, width: 600, height: 420 }
  },
  {
    id: 'chem_q31_hormone_membrane_receptor',
    page: 'page_317_c1.png',
    crop: { left: 20, top: 350, width: 700, height: 350 }
  },
  {
    id: 'chem_q50_pituitary_parts',
    page: 'page_319_c1.png',
    crop: { left: 40, top: 1550, width: 660, height: 420 }
  },
  {
    id: 'chem_q91_endocrine_glands_body',
    page: 'page_323_c1.png',
    crop: { left: 80, top: 80, width: 600, height: 500 }
  },
  {
    id: 'chem_q158_hormone_flowchart',
    page: 'page_329_c2.png',
    crop: { left: 40, top: 580, width: 660, height: 380 }
  }
];

async function cropAndUpload() {
  const urls = {};
  for (const c of DIAGRAM_CONFIGS) {
    const srcPath = path.join(PAGES_DIR, c.page);
    const meta = await sharp(srcPath).metadata();
    const top = Math.max(0, Math.min(c.crop.top, meta.height - 10));
    const height = Math.min(c.crop.height, meta.height - top);
    const left = Math.max(0, Math.min(c.crop.left, meta.width - 10));
    const width = Math.min(c.crop.width, meta.width - left);

    const outPath = path.join(__dirname, `${c.id}.png`);
    await sharp(srcPath)
      .extract({ left, top, width, height })
      .toFile(outPath);
    console.log(`Cropped ${c.id}: ${width}x${height}`);

    console.log(`Uploading ${c.id} to Cloudinary...`);
    const res = await cloudinary.uploader.upload(outPath, {
      folder: 'edvedum_zoology/chemical_coordination_integration',
      public_id: c.id,
      overwrite: true
    });
    urls[c.id] = res.secure_url;
    console.log(`Uploaded ${c.id}: ${res.secure_url}`);
  }

  const jsonPath = path.join(__dirname, 'chemical_diagram_urls.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2));
  console.log(`Diagram URLs saved to ${jsonPath}`);
}

cropAndUpload().catch(err => {
  console.error('Crop & Upload failed:', err);
  process.exit(1);
});

