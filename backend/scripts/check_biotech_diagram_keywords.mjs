import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));

// Search all items for "figure", "diagram", "given below", "refer to", etc.
for (const p of pagesDump) {
  if (p.page === 1 || p.page >= 21) continue;
  const fullText = p.items.map(x => x.str).join(' ');
  const diagRegex = /(figure|diagram|represented in the diagram|given diagram|given figure)/i;
  if (diagRegex.test(fullText)) {
    console.log(`Page ${p.page} matches diagram keywords:`);
    const sentences = fullText.split('.');
    for (const s of sentences) {
      if (diagRegex.test(s)) {
        console.log('   ->', s.trim());
      }
    }
  }
}

