import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import { query } from '../src/config/db.js';

async function main() {
  try {
    const res = await query("SELECT id, name, subject_id, position FROM chapters WHERE subject_id = 7 ORDER BY position ASC");
    console.log("Mathematics chapters:", res.rows);
    const matrices = res.rows.find(r => r.name.toLowerCase().includes('matri'));
    console.log("Matrices chapter found:", matrices);
    process.exit(0);
  } catch (err) {
    console.error("DB error:", err);
    process.exit(1);
  }
}
main();

