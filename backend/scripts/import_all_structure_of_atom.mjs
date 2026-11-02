import { pool } from '../src/config/db.js';
import { importBatch1 } from './batch1_atom_mcq.mjs';
import { importBatch2 } from './batch2_atom_mcq.mjs';
import { importBatch3 } from './batch3_atom_mcq.mjs';
import { importBatch4 } from './batch4_atom_mcq.mjs';
import { importBatchAR } from './batch5_atom_ar.mjs';

async function main() {
  console.log('=== Starting Full Import for Structure of Atom ===');

  // Verify / ensure clean state for this chapter in local DB
  const existing = await pool.query("SELECT COUNT(*) FROM question_bank WHERE chapter_id = 77 OR chapter = 'Structure of Atom'");
  console.log(`Pre-existing questions in Structure of Atom: ${existing.rows[0].count}`);

  if (Number(existing.rows[0].count) > 0) {
    console.log('Cleaning up pre-existing questions in chapter 77...');
    await pool.query("DELETE FROM question_bank WHERE chapter_id = 77 OR chapter = 'Structure of Atom'");
  }

  await importBatch1();
  await importBatch2();
  await importBatch3();
  await importBatch4();
  await importBatchAR();

  const finalCheck = await pool.query(
    "SELECT question_type, COUNT(*) FROM question_bank WHERE chapter_id = 77 GROUP BY question_type"
  );
  console.log('=== Final Local DB Question Count for Structure of Atom ===', finalCheck.rows);

  const range = await pool.query(
    "SELECT MIN(id) as min_id, MAX(id) as max_id, COUNT(*) as total FROM question_bank WHERE chapter_id = 77"
  );
  console.log('Local ID Range:', range.rows[0]);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

