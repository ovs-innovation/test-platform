import fs from 'fs';

const html = fs.readFileSync('backend/scripts/acadxl_binomial_page.html', 'utf8');

const scriptTags = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
console.log(`Found ${scriptTags.length} script tags`);
for (let i = 0; i < scriptTags.length; i++) {
  const content = scriptTags[i][1];
  if (content.length > 50) {
    console.log(`Script ${i}: length ${content.length}, preview: ${content.slice(0, 150).replace(/\s+/g, ' ')}`);
  }
}

const pdfLinks = [...html.matchAll(/https?:\/\/[^"'\s]+\.pdf/gi)].map(m => m[0]);
console.log('PDF links:', [...new Set(pdfLinks)]);

