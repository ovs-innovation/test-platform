async function check() {
  const html = await (await fetch('https://edvedum.com/admin/question-bank?t=' + Date.now())).text();
  const entryMatch = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
  if (!entryMatch) return console.log('Entry not found');
  console.log('Entry file:', entryMatch[1]);

  const entryText = await (await fetch('https://edvedum.com' + entryMatch[1])).text();
  const chunks = [...entryText.matchAll(/([a-zA-Z0-9_\-]+-[a-zA-Z0-9_\-]{8}\.js)/g)].map(m => m[1]);
  const uniqueChunks = [...new Set(chunks)];
  console.log('Scanning', uniqueChunks.length, 'chunks for QuestionBank...');

  for (const chunk of uniqueChunks) {
    const res = await fetch('https://edvedum.com/assets/' + chunk);
    if (!res.ok) continue;
    const txt = await res.text();
    if (txt.includes('Question Repository') || txt.includes('Managing reusable exam questions')) {
      console.log('Found QuestionBank chunk:', chunk);
      console.log('-> Contains "The Living World"?', txt.includes('The Living World'));
      console.log('-> BOTANY_STANDARD count in chunk:', (txt.match(/The Living World/g) || []).length);
      return;
    }
  }
  console.log('QuestionBank chunk not located.');
}
check().catch(console.error);
