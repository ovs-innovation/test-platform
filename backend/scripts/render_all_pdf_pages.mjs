import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';

const pdfPath = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded/media_1793685783664_a90d994b.pdf';
const outDir = './backend/uploads/basic_maths_pages';

async function renderAll() {
    fs.mkdirSync(outDir, { recursive: true });
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const doc = await pdfjsLib.getDocument({ data }).promise;
    console.log(`Rendering ${doc.numPages} pages at scale 3.0 (approx 2000x2500 px)...`);
    
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const viewport = page.getViewport({ scale: 3.0 });
        const canvas = createCanvas(viewport.width, viewport.height);
        const ctx = canvas.getContext('2d');
        
        await page.render({
            canvasContext: ctx,
            viewport: viewport
        }).promise;
        
        const filePath = `${outDir}/page_${i}.png`;
        fs.writeFileSync(filePath, canvas.toBuffer('image/png'));
        console.log(`Saved page ${i} (${viewport.width}x${viewport.height})`);
    }
    console.log("All pages rendered successfully!");
}

renderAll().catch(console.error);

