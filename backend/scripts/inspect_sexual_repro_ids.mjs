import { query } from '../src/config/db.js';

async function main() {
  console.log('--- Inspecting Neon DB ---');
  const chRes = await query(`
    SELECT c.id, c.name, c.subject_id, s.name as subject_name
    FROM chapters c
    JOIN subjects s ON c.subject_id = s.id
    WHERE c.name ILIKE '%Sexual%Reproduction%' OR c.name ILIKE '%Flowering%Plants%'
  `);
  console.log('Neon Chapters:', chRes.rows);

  const qbRes = await query(`
    SELECT chapter_id, chapter, category, count(*) as count
    FROM question_bank
    WHERE chapter ILIKE '%Sexual%Reproduction%'
    GROUP BY chapter_id, chapter, category
  `);
  console.log('Neon Question Bank existing:', qbRes.rows);

  console.log('\n--- Inspecting Live Server ---');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const subRes = await fetch('https://edvedum.com/api/subjects', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subjects = await subRes.json();
  const botany = subjects.find(s => s.name.toLowerCase() === 'botany');
  console.log('Live Botany Subject:', botany);

  const chapRes = await fetch(`https://edvedum.com/api/chapters?subject_id=${botany.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapters = await chapRes.json();
  const targetChap = chapters.find(c => c.name.toLowerCase().includes('sexual') || c.name.toLowerCase().includes('reproduction in flowering'));
  console.log('Live Target Chapter:', targetChap);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
