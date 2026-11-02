import { pool } from '../src/config/db.js';

async function check() {
  const tests = [
    { name: 'Q94 (2NO + Br2)', text: '2NO + Br2' },
    { name: 'Q95 (unity reduced to half in 25 s)', text: 'reduced to half in 25' },
    { name: 'Q96 (k = 8.5 x 10^5)', text: '15000' },
    { name: 'Q97 (2P + Q -> 3R)', text: '2P + Q' },
    { name: 'Q98 (order 1.5 and zero)', text: '1.5 and zero' },
    { name: 'Q99 (0.08 to 0.01)', text: '0.08' },
    { name: 'Q100 (10 g H2 and 34 g NH3)', text: '34 g' },
    { name: 'Q101 (log K versus 1/T)', text: 'calculating activation energy is shown by' },
    { name: 'Q102 (which one is not correct)', text: 't_{3/4}' },
    { name: 'Q103 (K1 and K2 equal)', text: '10^{12}' },
    { name: 'Q104 (38 kcal)', text: '38 kcal' },
    { name: 'Q105 (mm-Hg 10 20 40)', text: 'mm-Hg' }
  ];

  for (const t of tests) {
    const res = await pool.query(
      "SELECT id, chapter_id, chapter, question_text FROM question_bank WHERE chapter_id = 21 AND question_text ILIKE $1",
      ['%' + t.text + '%']
    );
    if (res.rows.length > 0) {
      console.log(`[FOUND IN LOCAL CH 21] ${t.name}: ID ${res.rows[0].id}`);
    } else {
      console.log(`[NOT IN LOCAL CH 21] ${t.name}`);
    }
  }

  await pool.end();
}

check().catch(console.error);
