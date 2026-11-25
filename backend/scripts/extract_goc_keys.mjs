import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795242206418_33075747.pdf';

async function extractPagesAndKeys() {
  const dataBuffer = fs.readFileSync(PDF_PATH);

  // We can render page by page with a custom pagerender function
  const pages = [];
  const pagerender = function(pageData) {
    return pageData.getTextContent().then(function(textContent) {
      let lastY, text = '';
      for (let item of textContent.items) {
        if (lastY == item.transform[5] || !lastY) {
          text += item.str;
        } else {
          text += '\n' + item.str;
        }
        lastY = item.transform[5];
      }
      pages.push(text);
      return text;
    });
  };

  await pdfParse(dataBuffer, { pagerender });
  console.log(`Extracted text for ${pages.length} pages.`);

  fs.writeFileSync('backend/scripts/goc_pages_text.json', JSON.stringify(pages, null, 2));

  // Inspect pages 146, 147, 148 (0-indexed: 145, 146, 147)
  console.log('--- Page 146 (index 145) ---');
  console.log(pages[145]);

  console.log('--- Page 147 (index 146) ---');
  console.log(pages[146]);

  console.log('--- Page 148 (index 147) ---');
  console.log(pages[147]);
}

extractPagesAndKeys().catch(console.error);
