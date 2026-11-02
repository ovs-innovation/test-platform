import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const img4Path = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598347977_d06c03d3.png';
const zoomDir = path.resolve('backend/scripts/hydrocarbons_pages/zoom_img4');
if (!fs.existsSync(zoomDir)) fs.mkdirSync(zoomDir, { recursive: true });

async function zoom() {
  const meta = await sharp(img4Path).metadata();
  console.log('Image 4 metadata:', meta);
  // width: 465, height: 672
  // Top half: height 0 to 336 (Page 154: 0 to 232, Page 155: 232 to 465)
  // Bottom half: height 336 to 672 (Page 156: 0 to 232, Page 157: 232 to 465)

  // Let's create high-res zoomed sections for:
  // P154 col 1 (Q44 - Q48)
  await sharp(img4Path)
    .extract({ left: 0, top: 0, width: 118, height: 336 })
    .resize(118 * 4, 336 * 4, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5 })
    .toFile(path.join(zoomDir, 'p154_col1_zoom.png'));

  // P154 col 2 (Q49 - Q53)
  await sharp(img4Path)
    .extract({ left: 116, top: 0, width: 118, height: 336 })
    .resize(118 * 4, 336 * 4, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5 })
    .toFile(path.join(zoomDir, 'p154_col2_zoom.png'));

  // P155 col 1 (Q54 - Q58)
  await sharp(img4Path)
    .extract({ left: 232, top: 0, width: 118, height: 336 })
    .resize(118 * 4, 336 * 4, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5 })
    .toFile(path.join(zoomDir, 'p155_col1_zoom.png'));

  // P155 col 2 (Q59 - Q61)
  await sharp(img4Path)
    .extract({ left: 348, top: 0, width: 117, height: 336 })
    .resize(117 * 4, 336 * 4, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5 })
    .toFile(path.join(zoomDir, 'p155_col2_zoom.png'));

  // P156 col 1 (Q62 - Q64)
  await sharp(img4Path)
    .extract({ left: 0, top: 336, width: 118, height: 336 })
    .resize(118 * 4, 336 * 4, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5 })
    .toFile(path.join(zoomDir, 'p156_col1_zoom.png'));

  // P156 col 2 (Q65 - Q69)
  await sharp(img4Path)
    .extract({ left: 116, top: 336, width: 118, height: 336 })
    .resize(118 * 4, 336 * 4, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5 })
    .toFile(path.join(zoomDir, 'p156_col2_zoom.png'));

  // P157 col 1 (Q70 - Q75)
  await sharp(img4Path)
    .extract({ left: 232, top: 336, width: 118, height: 336 })
    .resize(118 * 4, 336 * 4, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5 })
    .toFile(path.join(zoomDir, 'p157_col1_zoom.png'));

  // P157 col 2 (Q76 - Q78)
  await sharp(img4Path)
    .extract({ left: 348, top: 336, width: 117, height: 336 })
    .resize(117 * 4, 336 * 4, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.5 })
    .toFile(path.join(zoomDir, 'p157_col2_zoom.png'));

  console.log('Successfully zoomed image 4 quadrants into zoomDir!');
}

zoom().catch(console.error);

