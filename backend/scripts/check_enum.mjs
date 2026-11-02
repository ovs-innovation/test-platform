import { query } from '../src/config/db.js';

// Get valid question_type enum values
const r = await query(`
  SELECT enumlabel 
  FROM pg_enum 
  JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
  WHERE pg_type.typname = 'question_type'
  ORDER BY enumsortorder
`);
console.log('Valid question_type values:', JSON.stringify(r.rows));
process.exit(0);
