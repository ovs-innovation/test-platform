import { query } from '../src/config/db.js';

async function main() {
  const terms = ['colligative', 'ebullioscopic', 'cryoscopic', 'azeotrop', 'osmotic pressure', 'Raoult', "van't Hoff", 'Hg2Cl2'];
  for (const t of terms) {
    const res = await query('SELECT id, question_text, chapter, subject FROM question_bank WHERE question_text ILIKE $1', [`%${t}%`]);
    console.log(`Term "${t}": found ${res.rows.length} questions`);
    if (res.rows.length > 0 && res.rows.length < 5) {
      console.log(res.rows.map(r => ({ id: r.id, ch: r.chapter, sub: r.subject, text: r.question_text.slice(0, 60) })));
    }
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
