import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import { query } from '../src/config/db.js';

async function run() {
  const res = await query("SELECT id, question, question_type, options, correct_option FROM question_bank WHERE chapter_id = 79");
  console.log("Existing questions under chapter 79:", res.rows);
  process.exit(0);
}

run().catch(console.error);
