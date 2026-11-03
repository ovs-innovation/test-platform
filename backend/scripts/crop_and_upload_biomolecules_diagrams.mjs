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

const DIAGRAM_CONFIGS = [
  {
    id: 'q13_glycogen_branch',
    src: 'p202_c2.png',
    crop: { left: 50, top: 70, width: 380, height: 210 }
  },
  {
    id: 'q20_glycogen_structure',
    src: 'p203_c1.png',
    crop: { left: 20, top: 540, width: 440, height: 300 }
  },
  {
    id: 'q46_cholesterol_structure',
    src: 'p205_c2.png',
    crop: { left: 40, top: 400, width: 420, height: 260 }
  },
  {
    id: 'q47_lecithin_adenine',
    src: 'p205_c2.png',
    crop: { left: 20, top: 820, width: 440, height: 380 }
  },
  {
    id: 'q54_dna_bonds',
    src: 'p206_c2.png',
    crop: { left: 30, top: 40, width: 420, height: 560 }
  },
  {
    id: 'q68_activation_energy',
    src: 'p208_c1.png',
    crop: { left: 60, top: 180, width: 360, height: 230 }
  },
  {
    id: 'q69_enzyme_optimum_curve',
    src: 'p208_c1.png',
    crop: { left: 80, top: 880, width: 320, height: 200 }
  },
  {
    id: 'q77_michaelis_menten',
    src: 'p209_c1.png',
    crop: { left: 60, top: 90, width: 360, height: 250 }
  },
  {
    id: 'q90_reaction_velocity_curves',
    src: 'p210_c1.png',
    crop: { left: 30, top: 960, width: 420, height: 280 }
  },
  {
    id: 'q111_inhibition_curves',
    src: 'p212_c1.png',
    crop: { left: 30, top: 850, width: 420, height: 280 }
  },
  {
    id: 'q117_velocity_vs_enzyme',
    src: 'p213_c1.png',
    crop: { left: 10, top: 80, width: 460, height: 280 }
  },
  {
    id: 'q120_competitive_inhibition',
    src: 'p213_c1.png',
    crop: { left: 20, top: 950, width: 440, height: 260 }
  },
  {
    id: 'q124_apparent_km_curve',
    src: 'p213_c2.png',
    crop: { left: 20, top: 960, width: 440, height: 280 }
  }
];

async function main() {
  console.log('--- Cropping and Uploading Biomolecules Diagrams ---');
  const urls = {};

  for (const item of DIAGRAM_CONFIGS) {
    const srcFile = path.join(__dirname, item.src);
    const outFile = path.join(__dirname, `biomolecules_${item.id}.png`);

    await sharp(srcFile)
      .extract(item.crop)
      .toFile(outFile);

    console.log(`Cropped: ${item.id}`);

    const res = await cloudinary.uploader.upload(outFile, {
      folder: 'edvedum_zoology/biomolecules',
      public_id: item.id,
      overwrite: true
    });

    console.log(`Uploaded ${item.id}:`, res.secure_url);
    urls[item.id] = res.secure_url;
  }

  const outPath = path.join(__dirname, 'biomolecules_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(urls, null, 2));
  console.log('Saved all URLs to:', outPath);
}

main().catch(console.error);

