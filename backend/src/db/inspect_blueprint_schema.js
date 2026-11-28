import { pool } from '../config/db.js';

async function main() {
  const res = await pool.query(`
    SELECT table_name, column_name, data_type, is_nullable
    FROM information_schema.columns 
    WHERE table_name IN ('exam_blueprints', 'exam_blueprint_history')
    ORDER BY table_name, ordinal_position
  `);
  console.log(JSON.stringify(res.rows, null, 2));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
