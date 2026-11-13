import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  const allBotany = await query(`
    SELECT chapter, count(*)
    FROM question_bank
    WHERE category = 'PYQ' AND (subject = 'Botany' OR subject_id = 15)
    GROUP BY chapter
    ORDER BY count(*) DESC;
  `);
  console.log('Neon DB Botany PYQ by chapter:');
  console.table(allBotany.rows);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

