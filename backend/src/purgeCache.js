import { query } from './config/db.js';

async function purgeCache38() {
  try {
    const res = await query(`DELETE FROM test_ai_reports WHERE test_id = 38 OR test_id = 106`);
    console.log(`Deleted ${res.rowCount} invalid cached AI reports from test_ai_reports.`);
  } catch (err) {
    console.error('Error purging cache:', err);
  }
  process.exit(0);
}

purgeCache38();
