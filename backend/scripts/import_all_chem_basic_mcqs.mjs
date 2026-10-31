import { insertBatch1 } from './batch1_chem_mcq.mjs';
import { insertBatch2 } from './batch2_chem_mcq.mjs';
import { insertBatch3 } from './batch3_chem_mcq.mjs';
import { insertBatch4 } from './batch4_chem_mcq.mjs';
import { query } from '../src/config/db.js';

async function main() {
  console.log('🚀 Running complete import of all 117 MCQs for Some Basic Concepts of Chemistry...\n');
  await insertBatch1();
  await insertBatch2();
  await insertBatch3();
  await insertBatch4();

  const res = await query(
    `SELECT question_type, COUNT(*) as cnt 
     FROM question_bank 
     WHERE chapter = 'Some Basic Concepts of Chemistry' 
     GROUP BY question_type`
  );
  console.log('\n📊 Local Database Verification:');
  res.rows.forEach(r => console.log(`   - ${r.question_type}: ${r.cnt}`));

  const total = await query(
    `SELECT COUNT(*) as total FROM question_bank WHERE chapter = 'Some Basic Concepts of Chemistry'`
  );
  console.log(`\n🎉 Total Questions in Chapter: ${total.rows[0].total}`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal import error:', err);
  process.exit(1);
});

