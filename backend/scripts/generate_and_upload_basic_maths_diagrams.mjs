import { createCanvas, loadImage } from '@napi-rs/canvas';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU',
});

function trimCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
    
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;
            const r = data[idx], g = data[idx+1], b = data[idx+2];
            // Black/gray drawing pixels only:
            // exclude cyan/blue (where b > r + 30 or g > r + 30)
            if (r < 180 && g < 180 && b < 180 && Math.abs(r - g) < 40 && Math.abs(g - b) < 40) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }
    
    if (minX >= maxX || minY >= maxY) return canvas;
    
    const pad = 15;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(canvas.width - 1, maxX + pad);
    maxY = Math.min(canvas.height - 1, maxY + pad);
    
    const trimW = maxX - minX + 1;
    const trimH = maxY - minY + 1;
    const outCanvas = createCanvas(trimW, trimH);
    const outCtx = outCanvas.getContext('2d');
    outCtx.fillStyle = '#ffffff';
    outCtx.fillRect(0, 0, trimW, trimH);
    outCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);
    return outCanvas;
}

const CROPS = [
    { q: 50, page: 2, x: 1020, y: 730, w: 800, h: 290, filename: 'q50_trapezoid_area.png' },
    { q: 66, page: 3, x: 180, y: 1295, w: 750, h: 185, filename: 'q66_right_triangle_24_7.png' },
    { q: 68, page: 3, x: 180, y: 1805, w: 750, h: 175, filename: 'q68_triangle_37_deg.png' },
    { q: 69, page: 3, x: 180, y: 2040, w: 750, h: 240, filename: 'q69_triangle_6_8_10.png' },
    { q: 92, page: 4, x: 180, y: 925, w: 750, h: 215, filename: 'q92_angles_30_60.png' },
    { q: 93, page: 4, x: 180, y: 1200, w: 750, h: 250, filename: 'q93_circle_tangent.png' },
    { q: 94, page: 4, x: 180, y: 1630, w: 750, h: 240, filename: 'q94_triangle_3_4.png' },
    { q: 112, page: 5, x: 180, y: 565, w: 780, h: 105, filename: 'q112_charges_origin.png' },
    { q: 115, page: 5, x: 180, y: 1020, w: 750, h: 260, filename: 'q115_line_53_deg.png' },
    { q: 116, page: 5, x: 180, y: 1460, w: 750, h: 240, filename: 'q116_line_p1_p2.png' },
    { q: 117, page: 5, x: 180, y: 1760, w: 750, h: 460, filename: 'q117_grid_line.png' },
    { q: 118, page: 5, x: 1020, y: 210, w: 850, h: 260, filename: 'q118_line_intercepts.png' },
    { q: 119, page: 5, x: 1020, y: 550, w: 850, h: 420, filename: 'q119_vt_graphs.png' },
    { q: 121, page: 5, x: 1020, y: 1130, w: 850, h: 200, filename: 'q121_curve_abc.png' },
    { q: 122, page: 5, x: 1020, y: 1370, w: 850, h: 250, filename: 'q122_curve_tangent_150.png' },
    { q: 135, page: 6, x: 180, y: 1370, w: 780, h: 420, filename: 'q135_b_vs_r_graphs.png' },
    { q: 136, page: 6, x: 180, y: 1850, w: 780, h: 450, filename: 'q136_1v_vs_1u_graphs.png' },
    { q: 137, page: 6, x: 1020, y: 260, w: 850, h: 440, filename: 'q137_xc_vs_f_graphs.png' },
    { q: 138, page: 6, x: 1020, y: 800, w: 850, h: 370, filename: 'q138_pv_vs_v_graphs.png' },
    { q: 139, page: 6, x: 1020, y: 1250, w: 850, h: 390, filename: 'q139_v_vs_y_graphs.png' },
    { q: 140, page: 6, x: 1020, y: 1820, w: 850, h: 480, filename: 'q140_match_line_graphs.png' },
    { q: 142, page: 7, x: 180, y: 310, w: 780, h: 230, filename: 'q142_lines_i_ii.png' },
    { q: 143, page: 7, x: 180, y: 575, w: 780, h: 360, filename: 'q143_four_line_graphs.png' },
    { q: 145, page: 7, x: 180, y: 1030, w: 780, h: 310, filename: 'q145_curves_pqrs.png' },
    { q: 146, page: 7, x: 180, y: 1480, w: 780, h: 260, filename: 'q146_three_parallel_lines.png' },
    { q: 147, page: 7, x: 180, y: 1810, w: 780, h: 190, filename: 'q147_two_lines_alpha_beta.png' },
    { q: 150, page: 7, x: 1020, y: 230, w: 850, h: 210, filename: 'q150_vt_graph_53.png' },
    { q: 151, page: 7, x: 1020, y: 550, w: 850, h: 260, filename: 'q151_line_10_4.png' },
    { q: 152, page: 7, x: 1020, y: 880, w: 850, h: 170, filename: 'q152_line_20_4.png' },
    { q: 165, page: 8, x: 180, y: 700, w: 780, h: 860, filename: 'q165_match_graphs.png' },
    { q: 171, page: 8, x: 1020, y: 840, w: 850, h: 210, filename: 'q171_pv_isotherms.png' },
    { q: 172, page: 8, x: 1020, y: 1160, w: 850, h: 210, filename: 'q172_yx_ab.png' },
    { q: 178, page: 9, x: 180, y: 160, w: 780, h: 170, filename: 'q178_pv_isobaric.png' },
    { q: 179, page: 9, x: 180, y: 740, w: 780, h: 280, filename: 'q179_curve_abcd.png' },
    { q: 180, page: 9, x: 180, y: 1090, w: 780, h: 230, filename: 'q180_curves_i_ii.png' },
    { q: 181, page: 9, x: 180, y: 1420, w: 780, h: 650, filename: 'q181_four_slope_graphs.png' }
];

async function main() {
    const outDir = './backend/uploads/physics_basic_maths';
    const frontendDir = './frontend/public/uploads/physics_basic_maths';
    fs.mkdirSync(outDir, { recursive: true });
    fs.mkdirSync(frontendDir, { recursive: true });

    const pageImages = {};
    const urlMap = {};

    console.log("=== CROPPING AND UPLOADING DIAGRAMS TO CLOUDINARY ===");

    for (const c of CROPS) {
        if (!pageImages[c.page]) {
            const pagePath = `./backend/uploads/basic_maths_pages/page_${c.page}.png`;
            pageImages[c.page] = await loadImage(pagePath);
        }
        const img = pageImages[c.page];
        const canvas = createCanvas(c.w, c.h);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
        
        const trimmed = trimCanvas(canvas);
        const buf = trimmed.toBuffer('image/png');
        
        const localPath = path.join(outDir, c.filename);
        fs.writeFileSync(localPath, buf);
        fs.writeFileSync(path.join(frontendDir, c.filename), buf);

        // Upload to Cloudinary
        try {
            const uploadRes = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'edvedum_physics/basic_maths',
                        public_id: c.filename.replace('.png', ''),
                        overwrite: true,
                        resource_type: 'image'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(buf);
            });
            urlMap[c.q] = uploadRes.secure_url;
            console.log(`[Q${c.q}] Uploaded ${c.filename} -> ${uploadRes.secure_url}`);
        } catch (uploadErr) {
            console.error(`[Q${c.q}] Upload failed:`, uploadErr.message);
            urlMap[c.q] = `/uploads/physics_basic_maths/${c.filename}`;
        }
    }

    fs.writeFileSync('./backend/scripts/basic_maths_diagram_urls.json', JSON.stringify(urlMap, null, 2));
    console.log(`\nSuccessfully uploaded all diagrams! Saved map to ./backend/scripts/basic_maths_diagram_urls.json`);
}

main().catch(console.error);
