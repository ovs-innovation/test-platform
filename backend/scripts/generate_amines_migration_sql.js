import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AMINES_QUESTIONS } from './import_amines_chemistry.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let sql = '-- ============================================================\n';
sql += '-- Migration v81: Ensure Amines Chapter and Questions in Chemistry\n';
sql += '-- ============================================================\n\n';

sql += 'DO $$\nDECLARE\n  v_chem_id INT;\n  v_ch_id INT;\nBEGIN\n';
sql += "  SELECT id INTO v_chem_id FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1;\n";
sql += "  IF v_chem_id IS NULL THEN\n";
sql += "    INSERT INTO subjects (name) VALUES ('Chemistry') RETURNING id INTO v_chem_id;\n";
sql += "  END IF;\n\n";

sql += "  SELECT id INTO v_ch_id FROM chapters WHERE subject_id = v_chem_id AND LOWER(name) = 'amines' LIMIT 1;\n";
sql += "  IF v_ch_id IS NULL THEN\n";
sql += "    INSERT INTO chapters (subject_id, name, position) VALUES (v_chem_id, 'Amines', 12) RETURNING id INTO v_ch_id;\n";
sql += "  END IF;\n\n";

for (const q of AMINES_QUESTIONS) {
  const qText = q.question_text.replace(/'/g, "''");
  const opts = JSON.stringify(q.options || []).replace(/'/g, "''");
  const sol = (q.solution || '').replace(/'/g, "''");
  const img = (q.image_url || '').replace(/'/g, "''");
  const assText = q.assertion_text ? `'${q.assertion_text.replace(/'/g, "''")}'` : 'NULL';
  const rsnText = q.reason_text ? `'${q.reason_text.replace(/'/g, "''")}'` : 'NULL';
  const topic = (q.topic || 'Amines').replace(/'/g, "''");

  sql += `  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '${qText}') THEN\n`;
  sql += `    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)\n`;
  sql += `    VALUES ('Chemistry', '${q.question_type}', '${qText}', '${opts}', ${q.correct_index}, '[]', NULL, 0, ${assText}, ${rsnText}, ${q.marks || 4}, '${sol}', v_chem_id, v_ch_id, '${q.difficulty || 'medium'}', '${img}', 'Amines', '${topic}', 'Chemistry');\n`;
  sql += `  END IF;\n\n`;
}

sql += 'END $$;\n';

const target = path.resolve(__dirname, '../src/db/migration_v81_import_amines_chemistry.sql');
fs.writeFileSync(target, sql, 'utf8');
console.log('Successfully wrote', target);
