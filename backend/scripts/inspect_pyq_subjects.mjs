import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  const dist = await query(`
    SELECT 
      qb.subject as qb_subject, 
      s.name as joined_subject, 
      qb.subject_id,
      count(*) 
    FROM question_bank qb
    LEFT JOIN subjects s ON qb.subject_id = s.id
    WHERE qb.category = 'PYQ'
    GROUP BY qb.subject, s.name, qb.subject_id
    ORDER BY count(*) DESC;
  `);
  console.log('PYQ distribution:', JSON.stringify(dist.rows, null, 2));

  // Check distinct subjects in question_bank where category = 'PYQ'
  const subjs = await query(`
    SELECT DISTINCT qb.subject, count(*)
    FROM question_bank qb
    WHERE qb.category = 'PYQ'
    GROUP BY qb.subject;
  `);
  console.log('Distinct qb.subject in PYQ:', JSON.stringify(subjs.rows, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
