import { query } from '../src/config/db.js';

async function main() {
  const testCols = await query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'tests'");
  console.log('tests columns:', testCols.rows.map(r => r.column_name));

  const assCols = await query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'assessments'");
  console.log('assessments columns:', assCols.rows.map(r => r.column_name));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
