import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794466116692_ebc1eb9d.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Total pages: ${doc.numPages}`);

  const page = await doc.getPage(27);
  const content = await page.getTextContent();
  const text = content.items.map(i => i.str).join(' ');
  console.log('Page 27 text:\n', text);

  // Parse keys
  const keys = {};

  // Standard regex: (\d+)\.\s*([A-D](?:\s*,\s*[A-D])*)
  const matches = [...text.matchAll(/(\d+)\.\s*([A-D](?:\s*,\s*[A-D])*)/g)];
  console.log(`Found ${matches.length} matches`);

  for (const m of matches) {
    keys[parseInt(m[1])] = m[2].replace(/\s+/g, '');
  }

  // Also check Q93 specifically: "93. C, D" or "93. C , D"
  const m93 = text.match(/93\.\s*([A-D,\s]+)/);
  if (m93) {
    keys[93] = m93[1].trim().replace(/\s+/g, '');
  }

  console.log('Total keys parsed:', Object.keys(keys).length);
  for (let i = 1; i <= 127; i++) {
    if (!keys[i]) {
      console.warn(`Missing key for Q${i}!`);
    }
  }

  fs.writeFileSync('./backend/scripts/anatomy_official_keys.json', JSON.stringify(keys, null, 2));
  console.log('Wrote anatomy_official_keys.json');
}

main().catch(console.error);
