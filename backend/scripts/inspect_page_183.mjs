import sharp from 'sharp';
import fs from 'fs';

async function sliceAndInspect() {
  const dir = 'backend/uploads/structural_organisation';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const file5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793449784666_82513a90.png';
  const meta = await sharp(file5).metadata();
  console.log('File 5:', meta.width, meta.height);

  // Bottom right quadrant
  const w = Math.floor(meta.width / 2);
  const h = Math.floor(meta.height / 2);

  await sharp(file5)
    .extract({ left: w, top: h, width: meta.width - w, height: meta.height - h })
    .resize((meta.width - w) * 3, (meta.height - h) * 3, { kernel: 'lanczos3' })
    .toFile('backend/uploads/structural_organisation/page_183_hires.png');

  console.log('Saved page_183_hires.png');
}
sliceAndInspect().catch(console.error);
