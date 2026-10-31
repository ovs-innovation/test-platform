import sharp from 'sharp';
import fs from 'fs';

const files = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446775190_043a64cd.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446802913_9faaa970.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446826049_70074155.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446844509_43667850.jpg'
];

async function splitAndUpscale() {
  const outDir = 'backend/uploads/plant/pages_hires';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const mapping = [
    // Image 1: 4 pages
    { img: 0, quad: 'tl', name: 'page_01.png' },
    { img: 0, quad: 'tr', name: 'page_02.png' },
    { img: 0, quad: 'bl', name: 'page_03.png' },
    { img: 0, quad: 'br', name: 'page_04.png' },

    // Image 2: 4 pages
    { img: 1, quad: 'tl', name: 'page_05.png' },
    { img: 1, quad: 'tr', name: 'page_06.png' },
    { img: 1, quad: 'bl', name: 'page_07.png' },
    { img: 1, quad: 'br', name: 'page_08.png' },

    // Image 3: 4 pages
    { img: 2, quad: 'tl', name: 'page_09.png' },
    { img: 2, quad: 'tr', name: 'page_10.png' },
    { img: 2, quad: 'bl', name: 'page_11.png' },
    { img: 2, quad: 'br', name: 'page_12.png' },

    // Image 4: 2 pages (left and right)
    { img: 3, quad: 'l', name: 'page_13.png' },
    { img: 3, quad: 'r', name: 'page_14.png' },
  ];

  for (const m of mapping) {
    const file = files[m.img];
    const meta = await sharp(file).metadata();
    const w = meta.width;
    const h = meta.height;

    let left = 0, top = 0, width = w, height = h;
    const midX = Math.round(w / 2);
    const midY = Math.round(h / 2);

    if (m.quad === 'tl') {
      left = 0; top = 0; width = midX; height = midY;
    } else if (m.quad === 'tr') {
      left = midX; top = 0; width = w - midX; height = midY;
    } else if (m.quad === 'bl') {
      left = 0; top = midY; width = midX; height = h - midY;
    } else if (m.quad === 'br') {
      left = midX; top = midY; width = w - midX; height = h - midY;
    } else if (m.quad === 'l') {
      left = 0; top = 0; width = midX; height = h;
    } else if (m.quad === 'r') {
      left = midX; top = 0; width = w - midX; height = h;
    }

    await sharp(file)
      .extract({ left, top, width, height })
      .resize(width * 4, height * 4, { kernel: 'lanczos3' })
      .toFile(`${outDir}/${m.name}`);
    console.log(`Saved ${m.name} (${width * 4}x${height * 4})`);
  }
}

splitAndUpscale().catch(console.error);
