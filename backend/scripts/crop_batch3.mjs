import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const batch3Dir = path.resolve(__dirname, 'thermal_pages_batch3');
const img1 = path.join(batch3Dir, 'media_1793074592814_rot270.png'); // Page 217 & 218
const img2 = path.join(batch3Dir, 'media_1793074674675_rot270.png'); // Page 214 & 215

async function cropAll() {
  const meta1 = await sharp(img1).metadata();
  console.log('Img1 (217 & 218):', meta1.width, 'x', meta1.height);
  const meta2 = await sharp(img2).metadata();
  console.log('Img2 (214 & 215):', meta2.width, 'x', meta2.height);

  // Img2: Page 214 is left half (0 to width/2)
  const p214Width = Math.floor(meta2.width * 0.51);
  // Page 214 left column (Q185 to Q190)
  await sharp(img2)
    .extract({ left: 0, top: 0, width: Math.floor(p214Width * 0.55), height: meta2.height })
    .toFile(path.join(batch3Dir, 'crop_p214_col1.png'));
  
  // Page 214 right column (Q191 to Q196)
  await sharp(img2)
    .extract({ left: Math.floor(p214Width * 0.52), top: 0, width: Math.floor(p214Width * 0.48), height: meta2.height })
    .toFile(path.join(batch3Dir, 'crop_p214_col2.png'));

  // Img1: Left half is Page 217, right half is Page 218
  const p217Width = Math.floor(meta1.width * 0.35);
  await sharp(img1)
    .extract({ left: 0, top: 0, width: p217Width, height: meta1.height })
    .toFile(path.join(batch3Dir, 'crop_p217.png'));

  const p218Left = p217Width;
  const p218Width = meta1.width - p218Left;
  // Page 218 col 1 (Q5 to Q12)
  await sharp(img1)
    .extract({ left: p218Left, top: 0, width: Math.floor(p218Width * 0.52), height: meta1.height })
    .toFile(path.join(batch3Dir, 'crop_p218_col1.png'));

  // Page 218 col 2 (Q13 to Q20)
  await sharp(img1)
    .extract({ left: p218Left + Math.floor(p218Width * 0.50), top: 0, width: Math.floor(p218Width * 0.50), height: meta1.height })
    .toFile(path.join(batch3Dir, 'crop_p218_col2.png'));

  console.log('All crops created successfully!');
}

cropAll().catch(console.error);
