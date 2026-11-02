import { query } from '../src/config/db.js';

// Get table schema
const r = await query(`
  SELECT column_name, data_type 
  FROM information_schema.columns 
  WHERE table_name = 'question_bank' 
  ORDER BY ordinal_position
`);
console.log('Columns:', JSON.stringify(r.rows, null, 2));

// Get a sample row to see structure
const s = await query(`SELECT * FROM question_bank LIMIT 1`);
console.log('Sample keys:', Object.keys(s.rows[0] || {}));

process.exit(0);
