import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794480529964_07882658.pdf';

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

  fs.writeFileSync('./backend/scripts/ecosystem_pages_dump.json', JSON.stringify(pagesDump, null, 2));
  console.log('Saved pages dump to backend/scripts/ecosystem_pages_dump.json');

  // Parse Answer Keys from page 25
  const keys = {};
  const p25 = pagesDump.find(d => d.page === 25);
  const fullText = p25.items.map(i => i.str).join(' ');
  console.log('Page 25 text sample:', fullText.slice(0, 300));
  
  const matches = fullText.matchAll(/(\d+)\.\s*([A-D0-9])/g);
  for (const m of matches) {
    let ans = m[2];
    if (ans === '1') ans = 'A';
    if (ans === '2') ans = 'B';
    if (ans === '3') ans = 'C';
    if (ans === '4') ans = 'D';
    keys[parseInt(m[1])] = ans;
  }

  const keyCount = Object.keys(keys).length;
  console.log(`Extracted ${keyCount} official answer keys.`);
  fs.writeFileSync('./backend/scripts/ecosystem_official_keys.json', JSON.stringify(keys, null, 2));

  // Check for any missing keys 1..111
  const missing = [];
  for (let i = 1; i <= 111; i++) {
    if (!keys[i]) missing.push(i);
  }
  if (missing.length > 0) {
    console.error('Missing answer keys:', missing);
  } else {
    console.log('All 111 answer keys (1 to 111) are successfully verified!');
  }
}

main().catch(console.error);

