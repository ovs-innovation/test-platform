async function test() {
  const url = 'https://www.acadxl.com/resources/jee-pyqs/jee-main-physics/electrostatics';
  const res = await fetch(url);
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Length:', text.length);
  // Look for JSON or api calls or question data in the HTML
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = scriptRegex.exec(text)) !== null) {
    const s = m[1];
    if (s.includes('questions') || s.includes('electrostatics') || s.includes('json') || s.includes('__NEXT_DATA__')) {
      console.log('Script snippet:', s.substring(0, 300));
    }
  }
}
test().catch(console.error);
