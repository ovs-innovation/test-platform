import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded';
const outDir = './backend/uploads/animal_kingdom_pages';

const mapping = [
  { file: 'media_1793696244924_0d7b6a7f.jpg', pages: [382, 383, 384, 385] },
  { file: 'media_1793696244939_314d78b8.jpg', pages: [386, 387, 388, 389] },
  { file: 'media_1793696244944_df7fc51c.jpg', pages: [390, 391, 392, 393] },
  { file: 'media_1793696244935_78a71e13.jpg', pages: [394, 395, 396, 397] },
  { file: 'media_1793696244946_f58afdae.jpg', pages: [398, 399, 400, 401] }
];

async function splitPages() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const item of mapping) {
    const fullPath = path.join(uploadedDir, item.file);
    const meta = await sharp(fullPath).metadata();
    const halfW = Math.floor(meta.width / 2);
    const halfH = Math.floor(meta.height / 2);

    const quadrants = [
      { page: item.pages[0], left: 0, top: 0, width: halfW, height: halfH },
      { page: item.pages[1], left: halfW, top: 0, width: meta.width - halfW, height: halfH },
      { page: item.pages[2], left: 0, top: halfH, width: halfW, height: meta.height - halfH },
      { page: item.pages[3], left: halfW, top: halfH, width: meta.width - halfW, height: meta.height - halfH }
    ];

    for (const q of quadrants) {
      const outPath = path.join(outDir, `page_${q.page}.png`);
      await sharp(fullPath)
        .extract({ left: q.left, top: q.top, width: q.width, height: q.height })
        .png()
        .toFile(outPath);
      console.log(`Saved page_${q.page}.png (${q.width}x${q.height})`);
    }
  }
}

splitPages().catch(console.error);
