import sharp from 'sharp';
import fs from 'fs';

const files = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443454485_a13e1b73.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443480645_b2742f13.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443492204_1361e22d.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443516956_a0fd587c.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443531775_c71913ac.jpg'
];

async function main() {
  const outDir = 'backend/uploads/bio/pages_hires';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const mapping = [
    // Image 1: Pages 50, 51, 52, 53
    { img: 0, quad: 'tl', name: 'page50.png' },
    { img: 0, quad: 'tr', name: 'page51.png' },
    { img: 0, quad: 'bl', name: 'page52.png' },
    { img: 0, quad: 'br', name: 'page53.png' },

    // Image 2: Pages 54, 55, 56, 57
    { img: 1, quad: 'tl', name: 'page54.png' },
    { img: 1, quad: 'tr', name: 'page55.png' },
    { img: 1, quad: 'bl', name: 'page56.png' },
    { img: 1, quad: 'br', name: 'page57.png' },

    // Image 3: Pages 58, 59, 60, 61
    { img: 2, quad: 'tl', name: 'page58.png' },
    { img: 2, quad: 'tr', name: 'page59.png' },
    { img: 2, quad: 'bl', name: 'page60.png' },
    { img: 2, quad: 'br', name: 'page61.png' },

    // Image 4: Pages 62, 63, 64, 65
    { img: 3, quad: 'tl', name: 'page62.png' },
    { img: 3, quad: 'tr', name: 'page63.png' },
    { img: 3, quad: 'bl', name: 'page64.png' },
    { img: 3, quad: 'br', name: 'page65.png' },

    // Image 5: Pages 80, 81
    { img: 4, quad: 'l', name: 'page80.png' },
    { img: 4, quad: 'r', name: 'page81.png' },
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

main().catch(console.error);
