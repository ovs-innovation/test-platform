import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import { query } from '../src/config/db.js';

async function check() {
    try {
        const subRes = await query("SELECT id, name FROM subjects ORDER BY id ASC");
        console.log("Subjects:", subRes.rows);

        const chapRes = await query("SELECT id, name, subject_id FROM chapters WHERE LOWER(name) LIKE '%animal%' OR LOWER(name) LIKE '%chordat%' ORDER BY id ASC");
        console.log("Matching Chapters:", chapRes.rows);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();

