import fs from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extract() {
  const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793541172953_429d0723.pdf';
  const buf = fs.readFileSync(pdfPath);
  const doc = await getDocument({ data: new Uint8Array(buf), disableFontFace: true }).promise;
  console.log(`Total Pages: ${doc.numPages}`);

  let fullText = '';
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const textContent = await page.getTextContent();
    const text = textContent.items.map(item => item.str).join(' ');
    console.log(`\n=================== Page ${p} ===================`);
    console.log(text);
    fullText += `\n--- PAGE ${p} ---\n` + text;
  }

  fs.writeFileSync('backend/scripts/quadratic_part2_raw_text.txt', fullText, 'utf8');
  console.log('\nSaved full text to backend/scripts/quadratic_part2_raw_text.txt');
}

extract().catch(console.error);

