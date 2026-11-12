import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794472855322_f1a8a26d.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Total pages: ${doc.numPages}`);

  const pagesDump = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    pagesDump.push({
      page: p,
      items: content.items.map(it => ({
        str: it.str,
        x: it.transform[4],
        y: it.transform[5],
        width: it.width,
        height: it.height
      }))
    });
  }

  fs.writeFileSync('./backend/scripts/sexual_repro_pages_dump.json', JSON.stringify(pagesDump, null, 2));
  console.log('Saved pages dump to backend/scripts/sexual_repro_pages_dump.json');

  // Parse Answer Keys from page 31 and 32
  const keys = {};
  for (let pNum of [31, 32]) {
    const p = pagesDump.find(d => d.page === pNum);
    const fullText = p.items.map(i => i.str).join(' ');
    // Match "1. A", "2. C", etc.
    const matches = fullText.matchAll(/(\d+)\.\s*([A-D])/g);
    for (const m of matches) {
      keys[parseInt(m[1])] = m[2];
    }
  }

  const keyCount = Object.keys(keys).length;
  console.log(`Extracted ${keyCount} official answer keys.`);
  fs.writeFileSync('./backend/scripts/sexual_repro_official_keys.json', JSON.stringify(keys, null, 2));

  // Check for any missing keys 1..163
  const missing = [];
  for (let i = 1; i <= 163; i++) {
    if (!keys[i]) missing.push(i);
  }
  if (missing.length > 0) {
    console.error('Missing answer keys:', missing);
  } else {
    console.log('All 163 answer keys (1 to 163) are successfully verified!');
  }
}

main().catch(console.error);
