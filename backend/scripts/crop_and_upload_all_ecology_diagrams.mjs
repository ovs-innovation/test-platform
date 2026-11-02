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

const pagesDir = path.join(__dirname, 'ecology_pages');
const backendUploads = path.join(__dirname, '../public/uploads/ecology');
const frontendUploads = path.join(__dirname, '../../frontend/public/uploads/ecology');

fs.mkdirSync(backendUploads, { recursive: true });
fs.mkdirSync(frontendUploads, { recursive: true });

async function cropSingle(inputPage, extract, outputName) {
  const bPath = path.join(backendUploads, outputName);
  const fPath = path.join(frontendUploads, outputName);

  await sharp(path.join(pagesDir, `page_${inputPage}.png`))
    .extract(extract)
    .png({ quality: 95 })
    .toFile(bPath);

  fs.copyFileSync(bPath, fPath);
  console.log(`Cropped: ${outputName}`);
  return bPath;
}

async function main() {
  console.log('=== CROPPING & UPLOADING ECOLOGY DIAGRAMS ===\n');

  // 1. Q24 (Page 79)
  await cropSingle(79, { left: 118, top: 196, width: 90, height: 42 }, 'ecology_q24_age_pyramid.png');

  // 2. Q27 (Page 80)
  await cropSingle(80, { left: 18, top: 50, width: 75, height: 38 }, 'ecology_q27_age_pyramid.png');

  // 3. Q29 (Page 80)
  await cropSingle(80, { left: 16, top: 165, width: 88, height: 48 }, 'ecology_q29_temp_response.png');

  // 4. Q43 (Page 81)
  await cropSingle(81, { left: 136, top: 38, width: 78, height: 48 }, 'ecology_q43_biome_distribution.png');

  // 5. Q47 (Page 82)
  await cropSingle(82, { left: 12, top: 28, width: 92, height: 32 }, 'ecology_q47_age_pyramids_abc.png');

  // 6. Q49 (Page 82)
  await cropSingle(82, { left: 10, top: 180, width: 95, height: 58 }, 'ecology_q49_growth_curves_abc.png');

  // 7. Q52 (Page 82)
  await cropSingle(82, { left: 126, top: 102, width: 92, height: 48 }, 'ecology_q52_regulators_conformers.png');

  // 8. Q58 (Page 83)
  await cropSingle(83, { left: 15, top: 126, width: 88, height: 54 }, 'ecology_q58_growth_curve_phases.png');

  // 9. Q78 - Stitch Page 84 (options 1,2) and Page 85 (options 3,4) side-by-side
  const p84_part = await sharp(path.join(pagesDir, 'page_84.png'))
    .extract({ left: 125, top: 236, width: 90, height: 80 })
    .toBuffer();
  const p85_part = await sharp(path.join(pagesDir, 'page_85.png'))
    .extract({ left: 10, top: 16, width: 90, height: 80 })
    .toBuffer();

  const q78Path = path.join(backendUploads, 'ecology_q78_growth_representations.png');
  await sharp({
    create: {
      width: 190,
      height: 85,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      { input: p84_part, top: 2, left: 2 },
      { input: p85_part, top: 2, left: 98 }
    ])
    .png({ quality: 95 })
    .toFile(q78Path);
  fs.copyFileSync(q78Path, path.join(frontendUploads, 'ecology_q78_growth_representations.png'));
  console.log('Stitched: ecology_q78_growth_representations.png');

  // 10. Q93 (Page 86)
  await cropSingle(86, { left: 15, top: 135, width: 98, height: 75 }, 'ecology_q93_temp_conformers.png');

  // 11. Q98 (Page 86)
  await cropSingle(86, { left: 126, top: 100, width: 96, height: 156 }, 'ecology_q98_limiting_growth_curves.png');

  // 12. Q102 (Page 87)
  await cropSingle(87, { left: 24, top: 78, width: 68, height: 35 }, 'ecology_q102_human_age_pyramid.png');

  // 13. Q109 (Page 87)
  await cropSingle(87, { left: 172, top: 126, width: 62, height: 42 }, 'ecology_q109_biome_precipitation.png');

  // 14. Q114 (Page 88)
  await cropSingle(88, { left: 14, top: 220, width: 90, height: 45 }, 'ecology_q114_response_line_a.png');

  // 15. Q133 (Page 90)
  await cropSingle(90, { left: 18, top: 68, width: 90, height: 44 }, 'ecology_q133_age_pyramids_ab.png');

  // 16. Q134 (Page 90)
  await cropSingle(90, { left: 18, top: 172, width: 90, height: 38 }, 'ecology_q134_age_pyramid_structure.png');

  // Upload to Cloudinary
  console.log('\n--- Uploading all diagrams to Cloudinary ---');
  const allDiagrams = fs.readdirSync(backendUploads).filter(f => f.startsWith('ecology_q') && f.endsWith('.png'));
  const map = {};

  for (const f of allDiagrams) {
    const fullLocal = path.join(backendUploads, f);
    const key = `/uploads/ecology/${f}`;
    const pubId = path.parse(f).name;

    console.log(`Uploading ${f}...`);
    const upRes = await cloudinary.uploader.upload(fullLocal, {
      folder: 'edvedum_botany/ecology',
      public_id: pubId,
      overwrite: true,
      resource_type: 'image'
    });

    map[key] = upRes.secure_url;
    console.log(`  ✓ ${upRes.secure_url}`);
  }

  const mapFile = path.join(__dirname, 'cloudinary_ecology_diagrams_map.json');
  fs.writeFileSync(mapFile, JSON.stringify(map, null, 2));
  console.log(`\n✓ Successfully uploaded ${Object.keys(map).length} diagrams and saved map!`);
}

main().catch(console.error);
