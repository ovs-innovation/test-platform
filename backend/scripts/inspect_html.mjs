import fs from 'fs';

const html = fs.readFileSync('./backend/scripts/acadxl_vector_page.html', 'utf8');

// Search for paper or path or mock test references in html
const matches = [...html.matchAll(/"([^"]*AcadXL-Mathematics-PrepXL-Import[^"]*)"/g)].map(m => m[1]);
console.log('AcadXL-Mathematics matches:', [...new Set(matches)]);

const paths = [...html.matchAll(/"([^"]*vector-algebra[^"]*)"/gi)].map(m => m[1]);
console.log('vector-algebra matches in html:', [...new Set(paths)]);
