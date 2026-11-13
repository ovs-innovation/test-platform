import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));

for (let i = 0; i < pages.length; i++) {
  const p = pages[i];
  const text = p.rawText;
  const matches = text.match(/(?:figure|diagram|represented|given below|graph|structure|shown)/gi);
  if (matches) {
    // print the lines with context
    p.lines.forEach((line, idx) => {
      if (/(?:figure|diagram|represented|graph|shown)/i.test(line)) {
        console.log(`Page ${p.page} [line ${idx}]: ${line}`);
      }
    });
  }
}
