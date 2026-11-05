import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded/media_1793860889196_3842678a.pdf';

async function checkPdfText() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Checking text for page 169...`);
  const page169 = await doc.getPage(169);
  const textContent = await page169.getTextContent();
  const items = textContent.items.map(it => it.str).join(' ');
  console.log(`Page 169 raw pdf text items count: ${textContent.items.length}`);
  console.log(`Page 169 text snippet:`, items.slice(0, 500));

  console.log(`Checking text for page 1...`);
  const page1 = await doc.getPage(1);
  const textContent1 = await page1.getTextContent();
  console.log(`Page 1 raw pdf text items count: ${textContent1.items.length}`);
  console.log(`Page 1 text snippet:`, textContent1.items.map(it => it.str).join(' ').slice(0, 500));
}

checkPdfText().catch(console.error);

