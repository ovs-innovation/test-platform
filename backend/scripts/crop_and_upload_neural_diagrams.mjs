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
    id: 'neural_q12_graph',
    src: 'neural_p300_c1.png',
    crop: { left: 20, top: 750, width: 680, height: 500 }
  },
  {
    id: 'neural_q16_synapse',
    src: 'neural_p300_c2.png',
    crop: { left: 30, top: 380, width: 670, height: 500 }
  },
  {
    id: 'neural_q18_brain_lateral',
    src: 'neural_p301_c1.png',
    crop: { left: 40, top: 200, width: 650, height: 450 }
  },
  {
    id: 'neural_q29_brain_saggital',
    src: 'neural_p302_c1.png',
    crop: { left: 30, top: 1400, width: 670, height: 550 }
  },
  {
    id: 'neural_q37_synaptic_cleft',
    src: 'neural_p303_c1.png',
    crop: { left: 30, top: 150, width: 670, height: 580 }
  },
  {
    id: 'neural_q41_action_potential_graph',
    src: 'neural_p303_c2.png',
    crop: { left: 30, top: 200, width: 670, height: 600 }
  },
  {
    id: 'neural_q135_action_potential_steps',
    src: 'neural_p311_c2.png',
    crop: { left: 20, top: 220, width: 680, height: 750 }
  },
  {
    id: 'neural_q137_neuron_structure',
    src: 'neural_p312_c1.png',
    crop: { left: 20, top: 50, width: 680, height: 800 }
  },
  {
    id: 'neural_q139_axon_impulse',
    src: 'neural_p312_c1.png',
    crop: { left: 20, top: 1250, width: 680, height: 420 }
  }
];

async function cropAndUpload() {
  const urls = {};
  for (const c of DIAGRAM_CONFIGS) {
    const srcPath = path.join(__dirname, c.src);
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
      folder: 'edvedum_zoology/neural_control_coordination',
      public_id: c.id,
      overwrite: true
    });
    urls[c.id] = res.secure_url;
    console.log(`Uploaded ${c.id}: ${res.secure_url}`);
  }

  const jsonPath = path.join(__dirname, 'neural_diagram_urls.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2));
  console.log(`Diagram URLs saved to ${jsonPath}`);
}

cropAndUpload().catch(err => {
  console.error('Crop & Upload failed:', err);
  process.exit(1);
});

