import fs from 'fs';

const pagesDump = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_pages_dump.json', 'utf8'));

console.log('Scanning for special symbols / gaps:');
for (const p of pagesDump) {
  if (p.page === 1 || p.page >= 21) continue;
  for (let i = 0; i < p.items.length; i++) {
    const it = p.items[i];
    if (it.str.includes('-1-antitrypsin') || it.str.includes('antitrypsin')) {
      console.log(`Page ${p.page}: item "${it.str}"`);
    }
    if (it.str.includes('phage') || it.str.includes('lambda')) {
      console.log(`Page ${p.page}: item "${it.str}"`);
    }
  }
}

