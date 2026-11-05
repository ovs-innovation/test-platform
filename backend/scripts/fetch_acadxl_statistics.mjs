import fs from 'fs';

async function check() {
  const url = 'https://www.acadxl.com/resources/jee-pyqs/jee-main-mathematics/statistics';
  try {
    const res = await fetch(url);
    const html = await res.text();
    fs.writeFileSync('backend/scripts/acadxl_statistics_page.html', html, 'utf8');
    console.log('Saved HTML, length:', html.length);
    
    const matches = [...html.matchAll(/"([^"]*statistics[^"]*)"/gi)].map(m => m[1]);
    console.log('statistics matches:', [...new Set(matches)]);
    
    const testMatches = [...html.matchAll(/"([^"]*(?:test|pyq|quiz|exam)[^"]*)"/gi)].map(m => m[1]).filter(s => s.includes('.json') || s.includes('r2.dev') || s.includes('api'));
    console.log('test matches:', [...new Set(testMatches)]);
    
    const r2 = [...html.matchAll(/https:\/\/[^"'\s]+\.r2\.dev\/[^"'\s]+/gi)].map(m => m[0]);
    console.log('R2 matches:', [...new Set(r2)]);

    const jsonMatches = [...html.matchAll(/https:\/\/[^"'\s]+\.json/gi)].map(m => m[0]);
    console.log('All JSON URLs:', [...new Set(jsonMatches)]);
  } catch (err) {
    console.log('Fetch error:', err.message);
  }
}

check().catch(console.error);

