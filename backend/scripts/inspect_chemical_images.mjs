import sharp from 'sharp';
import path from 'path';
import Tesseract from 'tesseract.js';

const IMAGES = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689671083_077beaf5.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689690510_62326720.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689934833_c9c37bac.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689947541_f79ba2b6.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689988274_c316d297.jpg'
];

async function checkHeadersAndCorners() {
  for (let idx = 0; idx < IMAGES.length; idx++) {
    const imgPath = IMAGES[idx];
    const meta = await sharp(imgPath).metadata();
    const w = meta.width;
    const h = meta.height;
    console.log(`\n=================== IMAGE ${idx + 1} (${w}x${h}) ===================`);

    // Let's sample Top-Left corner, Top-Right corner, Middle-Left, Middle-Right
    const crops = [
      { name: 'Top-Left Header', crop: { left: 0, top: 0, width: Math.floor(w / 2), height: Math.min(80, Math.floor(h / 6)) } },
      { name: 'Top-Right Header', crop: { left: Math.floor(w / 2), top: 0, width: Math.floor(w / 2), height: Math.min(80, Math.floor(h / 6)) } },
      { name: 'Mid-Left (y ~ h/2)', crop: { left: 0, top: Math.floor(h / 2) - 30, width: Math.floor(w / 2), height: 60 } },
      { name: 'Mid-Right (y ~ h/2)', crop: { left: Math.floor(w / 2), top: Math.floor(h / 2) - 30, width: Math.floor(w / 2), height: 60 } },
      { name: 'Bottom-Left Footer', crop: { left: 0, top: h - 60, width: Math.floor(w / 2), height: 60 } },
      { name: 'Bottom-Right Footer', crop: { left: Math.floor(w / 2), top: h - 60, width: Math.floor(w / 2), height: 60 } },
    ];

    for (const c of crops) {
      try {
        const buf = await sharp(imgPath)
          .extract(c.crop)
          .resize(c.crop.width * 2)
          .toBuffer();
        const res = await Tesseract.recognize(buf, 'eng');
        const text = res.data.text.replace(/\s+/g, ' ').trim();
        if (text) {
          console.log(`  [${c.name}]: ${text}`);
        }
      } catch (err) {
        // ignore
      }
    }
  }
}

checkHeadersAndCorners().catch(console.error);
