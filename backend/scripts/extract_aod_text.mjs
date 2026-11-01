import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793521064570_e127fdf3.pdf';

async function extractAll() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageLines = [];
    let lastY = null;
    let currentLine = '';

    for (const item of content.items) {
      if (lastY === null || Math.abs(item.transform[5] - lastY) > 3) {
        if (currentLine.trim()) pageLines.push(currentLine.trim());
        currentLine = item.str;
        lastY = item.transform[5];
      } else {
        currentLine += (item.str ? ' ' + item.str : '');
      }
    }
    if (currentLine.trim()) pageLines.push(currentLine.trim());

    fullText += `\n=== PAGE ${i} ===\n` + pageLines.join('\n');
  }

  fs.writeFileSync('backend/scripts/aod_extracted_text.txt', fullText);
  console.log(`Saved full text to backend/scripts/aod_extracted_text.txt (${fullText.length} chars)`);
}

extractAll().catch(console.error);
