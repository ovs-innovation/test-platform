import sharp from 'sharp';
import fs from 'fs';

async function cropBioDiagrams() {
  const outDir = 'backend/uploads/bio/diagrams';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const rawImg1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443454485_a13e1b73.png';
  const meta = await sharp(rawImg1).metadata();
  console.log('Raw img 1:', meta.width, meta.height);

  // In Image 1, Page 53 is at bottom-right quadrant:
  // left: midX to w, top: midY to h.
  // In Page 53, Q47 is at the bottom right.
  const midX = Math.round(meta.width / 2);
  const midY = Math.round(meta.height / 2);

  // Let's crop Page 53 first
  const p53Path = 'backend/uploads/bio/pages/page53_highres.png';
  await sharp(rawImg1)
    .extract({ left: midX, top: midY, width: meta.width - midX, height: meta.height - midY })
    .resize((meta.width - midX) * 4, (meta.height - midY) * 4, { kernel: 'lanczos3' })
    .toFile(p53Path);
  console.log('Saved page53_highres.png');

  const p53Meta = await sharp(p53Path).metadata();
  console.log('p53Meta:', p53Meta.width, p53Meta.height);

  // Q47 is in Column 2 (right half of page 53) or spanning bottom?
  // Let's extract the bottom 25% of page 53
  const q47Top = Math.round(p53Meta.height * 0.76);
  const q47Height = Math.round(p53Meta.height * 0.21);
  const q47Left = 0;
  const q47Width = p53Meta.width;

  await sharp(p53Path)
    .extract({ left: q47Left, top: q47Top, width: q47Width, height: q47Height })
    .toFile(`${outDir}/bio_q47.png`);
  console.log('Saved bio_q47.png');
}

cropBioDiagrams().catch(console.error);
