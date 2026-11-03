import sharp from 'sharp';
import Tesseract from 'tesseract.js';

const base = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

async function inspectPages() {
  const img2 = base + 'media_1793683028873_365b4a68.png';
  const img3 = base + 'media_1793683042341_f1c706a7.png';

  console.log('=== Image 2 Inspection ===');
  // Let's crop 4 quadrants with padding
  // TL: (0, 0, 245, 343)
  // TR: (245, 0, 245, 343)
  // BL: (0, 344, 245, 343)
  // BR: (245, 344, 245, 343)
  const meta2 = await sharp(img2).metadata();
  console.log('Img2 size:', meta2.width, meta2.height);

  const meta3 = await sharp(img3).metadata();
  console.log('Img3 size:', meta3.width, meta3.height);

  // Let's check headers of all 4 corners of img2
  const tl2 = await sharp(img2).extract({ left: 10, top: 10, width: 220, height: 40 }).toBuffer();
  console.log('Img2 TL header:', (await Tesseract.recognize(tl2, 'eng')).data.text.trim());

  const tr2 = await sharp(img2).extract({ left: 255, top: 10, width: 220, height: 40 }).toBuffer();
  console.log('Img2 TR header:', (await Tesseract.recognize(tr2, 'eng')).data.text.trim());

  const bl2 = await sharp(img2).extract({ left: 10, top: 350, width: 220, height: 40 }).toBuffer();
  console.log('Img2 BL header:', (await Tesseract.recognize(bl2, 'eng')).data.text.trim());

  const br2 = await sharp(img2).extract({ left: 255, top: 350, width: 220, height: 40 }).toBuffer();
  console.log('Img2 BR header:', (await Tesseract.recognize(br2, 'eng')).data.text.trim());

  console.log('=== Image 3 Inspection ===');
  const tl3 = await sharp(img3).extract({ left: 10, top: 10, width: 220, height: 40 }).toBuffer();
  console.log('Img3 TL header:', (await Tesseract.recognize(tl3, 'eng')).data.text.trim());

  const tr3 = await sharp(img3).extract({ left: 255, top: 10, width: 220, height: 40 }).toBuffer();
  console.log('Img3 TR header:', (await Tesseract.recognize(tr3, 'eng')).data.text.trim());

  const bl3 = await sharp(img3).extract({ left: 10, top: 350, width: 220, height: 40 }).toBuffer();
  console.log('Img3 BL header:', (await Tesseract.recognize(bl3, 'eng')).data.text.trim());

  const br3 = await sharp(img3).extract({ left: 255, top: 350, width: 220, height: 40 }).toBuffer();
  console.log('Img3 BR header:', (await Tesseract.recognize(br3, 'eng')).data.text.trim());
}

inspectPages().catch(console.error);
