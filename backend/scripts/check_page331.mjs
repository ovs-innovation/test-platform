import sharp from 'sharp';
import path from 'path';
import Tesseract from 'tesseract.js';

const img5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689988274_c316d297.jpg';

async function checkImage5Pages() {
  const meta = await sharp(img5).metadata();
  const halfW = Math.floor(meta.width / 2);
  const halfH = Math.floor(meta.height / 2);

  console.log(`Image 5 size: ${meta.width}x${meta.height}, half: ${halfW}x${halfH}`);

  // Page 328: Top-Left
  // Page 329: Top-Right
  // Page 330: Bottom-Left
  // Page 331: Bottom-Right

  // Let's check Bottom-Left (Page 330) and Bottom-Right (Page 331)
  const p331 = await sharp(img5)
    .extract({ left: halfW, top: halfH, width: meta.width - halfW, height: meta.height - halfH })
    .resize((meta.width - halfW) * 2)
    .toBuffer();
  
  const res = await Tesseract.recognize(p331, 'eng');
  console.log('--- Page 331 text dump ---');
  console.log(res.data.text);
}

checkImage5Pages().catch(console.error);

