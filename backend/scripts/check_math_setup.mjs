import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import { query } from '../src/config/db.js';

async function main() {
  const cols = await query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'chapters'");
  console.log('Chapters columns:', cols.rows);
  
  const mathCh = await query("SELECT * FROM chapters WHERE subject_id = 7");
  console.log('Math chapters count:', mathCh.rows.length);
  console.log('Math chapters:', mathCh.rows);

  const qbCols = await query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'question_bank'");
  console.log('QB columns:', qbCols.rows.map(r => r.column_name).join(', '));
  
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

