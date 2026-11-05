import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import { query } from '../src/config/db.js';

async function verify() {
    try {
        console.log("=== VERIFYING PHYSICS: BASIC MATHS QUESTIONS ===");
        
        // 1. Check chapter
        const chapterRes = await query("SELECT id, name, subject_id FROM chapters WHERE LOWER(name) = 'basic maths' AND subject_id = 5");
        console.log("Chapter info:", chapterRes.rows);
        
        if (chapterRes.rows.length === 0) {
            console.error("Chapter 'Basic Maths' not found for Physics!");
            process.exit(1);
        }
        
        const chapterId = chapterRes.rows[0].id;
        
        // 2. Count total questions
        const countRes = await query(
            "SELECT count(*) as total, question_type, difficulty, chapter FROM question_bank WHERE chapter_id = $1 GROUP BY question_type, difficulty, chapter",
            [chapterId]
        );
        console.log("Question distribution:", countRes.rows);
        
        const totalRes = await query(
            "SELECT count(*) as total FROM question_bank WHERE chapter_id = $1",
            [chapterId]
        );
        console.log("Total questions in chapter:", totalRes.rows[0].total);
        
        // 3. Check questions with images
        const imageRes = await query(
            "SELECT id, question_text, image_url FROM question_bank WHERE chapter_id = $1 AND image_url IS NOT NULL AND image_url != '' ORDER BY id ASC",
            [chapterId]
        );
        console.log(`\nFound ${imageRes.rows.length} questions with diagrams:`);
        for (const row of imageRes.rows) {
            console.log(`- Q ID ${row.id}: ${row.question_text.slice(0, 50)}... -> ${row.image_url}`);
        }
        
        // 4. Sample a few questions and check options format
        const sampleRes = await query(
            "SELECT id, question_text, options, correct_index, solution, question_type FROM question_bank WHERE chapter_id = $1 ORDER BY id ASC LIMIT 5",
            [chapterId]
        );
        console.log("\nSample questions verification:");
        for (const s of sampleRes.rows) {
            console.log(`\nID: ${s.id} | Type: ${s.question_type} | Correct Index: ${s.correct_index}`);
            console.log(`Text: ${s.question_text.slice(0, 80)}...`);
            const opts = typeof s.options === 'string' ? JSON.parse(s.options) : s.options;
            console.log(`Options count: ${opts.length}, first option: ${opts[0]?.key}: ${opts[0]?.text?.slice(0, 40)}`);
            console.log(`Solution: ${s.solution?.slice(0, 80)}...`);
        }
        
        // 5. Check assertion-reason questions specifically
        const arRes = await query(
            "SELECT id, question_text, assertion_text, reason_text, correct_index, question_type FROM question_bank WHERE chapter_id = $1 AND question_type = 'assertion_reason'",
            [chapterId]
        );
        console.log(`\nFound ${arRes.rows.length} Assertion-Reason questions:`);
        for (const ar of arRes.rows) {
            console.log(`- ID: ${ar.id} [Index: ${ar.correct_index}] ${ar.question_text.slice(0, 70)}...`);
            console.log(`  Assertion: ${ar.assertion_text?.slice(0, 60)}...`);
            console.log(`  Reason: ${ar.reason_text?.slice(0, 60)}...`);
        }
        
        console.log("\n=== VERIFICATION COMPLETE ===");
        process.exit(0);
    } catch (err) {
        console.error("Verification error:", err);
        process.exit(1);
    }
}

verify();

