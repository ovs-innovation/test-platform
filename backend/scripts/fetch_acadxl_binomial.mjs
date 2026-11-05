import fs from 'fs';

async function check() {
  const url = 'https://www.acadxl.com/resources/jee-pyqs/jee-main-mathematics/binomial-theorem';
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    const html = await res.text();
    fs.writeFileSync('backend/scripts/acadxl_binomial_page.html', html, 'utf8');
    console.log('Saved HTML, length:', html.length);

    const r2 = [...html.matchAll(/https:\/\/[^"'\s]+\.r2\.dev\/[^"'\s]+/gi)].map(m => m[0]);
    console.log('R2 matches:', [...new Set(r2)]);

    const jsonMatches = [...html.matchAll(/https:\/\/[^"'\s]+\.json/gi)].map(m => m[0]);
    console.log('All JSON URLs:', [...new Set(jsonMatches)]);

    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (nextDataMatch) {
      console.log('Found __NEXT_DATA__, length:', nextDataMatch[1].length);
      fs.writeFileSync('backend/scripts/acadxl_binomial_nextdata.json', nextDataMatch[1], 'utf8');
    }
  } catch (err) {
    console.log('Fetch error:', err.message);
  }
}

check().catch(console.error);

