import fs from 'fs';

async function run() {
  try {
    const url = 'https://www.acadxl.com/pyq-pdf/AcadXL-Mathematics-PrepXL-Import---test---probability---mixed.pdf';
    console.log(`Downloading ${url}...`);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    const buf = await res.arrayBuffer();
    console.log(`Downloaded ${buf.byteLength} bytes.`);
    fs.writeFileSync('backend/scripts/real_probability.pdf', Buffer.from(buf));
    console.log('Saved to backend/scripts/real_probability.pdf');
  } catch (e) {
    console.error(e);
  }
}
run();

