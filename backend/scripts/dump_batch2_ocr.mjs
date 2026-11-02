import fs from 'fs';

const pages = [
  'page_132_left', 'page_132_right',
  'page_133_left', 'page_133_right',
  'page_134_left', 'page_134_right',
  'page_135_left', 'page_135_right',
  'page_136_left', 'page_136_right',
  'page_137_left', 'page_137_right',
  'page_138_left', 'page_138_right',
  'page_139_left', 'page_139_right',
  'page_144_left', 'page_144_right',
  'page_145_left', 'page_145_right'
];

for (const p of pages) {
  const f = `scripts/organic_pages_batch2/ocr_output/${p}.txt`;
  if (fs.existsSync(f)) {
    console.log(`\n===================== ${p} =====================`);
    console.log(fs.readFileSync(f, 'utf8'));
  }
}

