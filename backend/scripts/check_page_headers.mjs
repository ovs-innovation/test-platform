import sharp from 'sharp';
import Tesseract from 'tesseract.js';

async function readHeaders() {
  // Image 3
  const img3 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793683042341_f1c706a7.png';
  const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793683054017_ea6edc4d.jpg';
  
  // Crop top of left half of Image 3
  const buf3_top = await sharp(img3).extract({ left: 0, top: 0, width: 485, height: 60 }).toBuffer();
  const ocr3 = await Tesseract.recognize(buf3_top, 'eng');
  console.log('Image 3 Top OCR:', ocr3.data.text.trim());

  // Crop bottom-ish of Image 3 (to see if there is another page below)
  const buf3_mid = await sharp(img3).extract({ left: 0, top: 300, width: 485, height: 60 }).toBuffer();
  const ocr3_mid = await Tesseract.recognize(buf3_mid, 'eng');
  console.log('Image 3 Mid OCR:', ocr3_mid.data.text.trim());

  // Crop top of Image 4
  const buf4_top = await sharp(img4).extract({ left: 0, top: 0, width: 487, height: 60 }).toBuffer();
  const ocr4 = await Tesseract.recognize(buf4_top, 'eng');
  console.log('Image 4 Top OCR:', ocr4.data.text.trim());

  // Crop mid of Image 4
  const buf4_mid = await sharp(img4).extract({ left: 0, top: 320, width: 487, height: 60 }).toBuffer();
  const ocr4_mid = await Tesseract.recognize(buf4_mid, 'eng');
  console.log('Image 4 Mid OCR:', ocr4_mid.data.text.trim());
}

readHeaders().catch(console.error);
