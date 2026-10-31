import sharp from 'sharp';
import fs from 'fs';

const files = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443454485_a13e1b73.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443480645_b2742f13.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443492204_1361e22d.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443516956_a0fd587c.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443531775_c71913ac.jpg'
];

async function splitAll() {
  const outDir = 'backend/uploads/bio/pages';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  let pageIndex = 1;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const meta = await sharp(file).metadata();
    const w = meta.width;
    const h = meta.height;

    // Check if it's 4 pages (2x2) or 2 pages (1x2)
    // Image 5 is 482x342 (aspect ratio ~ 1.4:1), whereas Image 1-4 are ~482x675 (aspect ratio ~ 0.7:1, vertical 2x2)
    if (h > w) {
      // 2x2 grid (4 pages)
      const midX = Math.round(w / 2);
      const midY = Math.round(h / 2);

      // Top-Left
      await sharp(file).extract({ left: 0, top: 0, width: midX, height: midY }).resize(midX * 2, midY * 2).toFile(`${outDir}/img${i+1}_top_left.png`);
      // Top-Right
      await sharp(file).extract({ left: midX, top: 0, width: w - midX, height: midY }).resize((w - midX) * 2, midY * 2).toFile(`${outDir}/img${i+1}_top_right.png`);
      // Bottom-Left
      await sharp(file).extract({ left: 0, top: midY, width: midX, height: h - midY }).resize(midX * 2, (h - midY) * 2).toFile(`${outDir}/img${i+1}_bottom_left.png`);
      // Bottom-Right
      await sharp(file).extract({ left: midX, top: midY, width: w - midX, height: h - midY }).resize((w - midX) * 2, (h - midY) * 2).toFile(`${outDir}/img${i+1}_bottom_right.png`);
      console.log(`Image ${i+1}: extracted 4 quadrants (top-left, top-right, bottom-left, bottom-right)`);
    } else {
      // 1x2 (2 pages side-by-side)
      const midX = Math.round(w / 2);
      await sharp(file).extract({ left: 0, top: 0, width: midX, height: h }).resize(midX * 2, h * 2).toFile(`${outDir}/img${i+1}_left.png`);
      await sharp(file).extract({ left: midX, top: 0, width: w - midX, height: h }).resize((w - midX) * 2, h * 2).toFile(`${outDir}/img${i+1}_right.png`);
      console.log(`Image ${i+1}: extracted 2 halves (left, right)`);
    }
  }
}

splitAll().catch(console.error);
