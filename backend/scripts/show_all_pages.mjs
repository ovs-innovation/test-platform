import fs from 'fs';
const summaries = JSON.parse(fs.readFileSync('backend/scripts/fluids_page_summaries.json', 'utf8'));
summaries.slice(30).forEach(s => {
  console.log(`Page ${s.page}:`, s.qLines);
});
