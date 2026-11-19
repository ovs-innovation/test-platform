import { query } from '../src/config/db.js';

async function main() {
  const colInfo = await query(`
    SELECT data_type, udt_name 
    FROM information_schema.columns 
    WHERE table_name = 'question_bank' AND column_name = 'options'
  `);
  console.log('Column info:', colInfo.rows[0]);

  const newOpts = [
    { id: 'A', text: 'Graph (A)' },
    { id: 'B', text: 'Graph (B)' },
    { id: 'C', text: 'Graph (C)' },
    { id: 'D', text: 'Graph (D)' }
  ];

  const updateRes = await query(`
    UPDATE question_bank 
    SET options = $1 
    WHERE id = 31746 
    RETURNING id, options
  `, [JSON.stringify(newOpts)]);
  console.log('Updated row:', updateRes.rows[0]);
  process.exit(0);
}

main().catch(console.error);
