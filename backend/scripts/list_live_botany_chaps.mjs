import fs from 'fs';

async function listLiveChaps() {
  const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));

  const r10 = await fetch('https://edvedum.com/api/admin/subjects/10/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Botany (10) live chapters:', (await r10.json()).chapters);

  const r9 = await fetch('https://edvedum.com/api/admin/subjects/9/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const c9 = (await r9.json()).chapters || [];
  console.log('Biology (9) live chapters count:', c9.length);
  const match9 = c9.filter(c => c.name.toLowerCase().includes('organism') || c.name.toLowerCase().includes('population') || c.name.toLowerCase().includes('ecol'));
  console.log('Biology (9) matching chapters:', match9);
}

listLiveChaps().catch(console.error);
