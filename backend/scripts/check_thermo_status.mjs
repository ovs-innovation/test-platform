import pg from '../node_modules/pg/lib/index.js';
import dotenv from '../node_modules/dotenv/lib/main.js';
dotenv.config({ path: './.env' });

async function main() {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const resSubj = await client.query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
  console.log('Neon Subjects:', resSubj.rows);

  const resChap = await client.query("SELECT id, subject_id, name FROM chapters WHERE name ILIKE '%thermo%'");
  console.log('Neon Chapters:', resChap.rows);

  const resQ = await client.query("SELECT count(*) FROM questions WHERE chapter_id = 22 AND exam_type = 'JEE'");
  console.log('Neon JEE Thermo Questions count:', resQ.rows[0].count);

  await client.end();
}

main().catch(err => console.error(err));
