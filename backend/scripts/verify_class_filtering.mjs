import { query } from '../src/config/db.js';

async function main() {
  console.log('1. Checking counts by class_level in database...');
  const res11 = await query("SELECT COUNT(*)::int as count FROM tests WHERE class_level = 'Class 11' AND COALESCE(is_deleted, false) = false");
  const res12 = await query("SELECT COUNT(*)::int as count FROM tests WHERE class_level = 'Class 12' AND COALESCE(is_deleted, false) = false");
  const resRep = await query("SELECT COUNT(*)::int as count FROM tests WHERE class_level = 'Repeater' AND COALESCE(is_deleted, false) = false");
  const resTotal = await query("SELECT COUNT(*)::int as count FROM tests WHERE COALESCE(is_deleted, false) = false");

  console.log(`Class 11 tests: ${res11.rows[0].count}`);
  console.log(`Class 12 tests: ${res12.rows[0].count}`);
  console.log(`Repeater tests: ${resRep.rows[0].count}`);
  console.log(`Total tests: ${resTotal.rows[0].count}`);

  console.log('2. Sample Class 11 tests:');
  const sample11 = await query("SELECT id, test_name, class_level FROM tests WHERE class_level = 'Class 11' AND COALESCE(is_deleted, false) = false LIMIT 3");
  console.log(sample11.rows);

  console.log('3. Sample Class 12 tests:');
  const sample12 = await query("SELECT id, test_name, class_level FROM tests WHERE class_level = 'Class 12' AND COALESCE(is_deleted, false) = false LIMIT 3");
  console.log(sample12.rows);

  console.log('4. Sample Repeater tests:');
  const sampleRep = await query("SELECT id, test_name, class_level FROM tests WHERE class_level = 'Repeater' AND COALESCE(is_deleted, false) = false LIMIT 3");
  console.log(sampleRep.rows);

  console.log('Verification completed successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
