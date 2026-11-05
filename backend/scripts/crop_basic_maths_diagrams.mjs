import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

function trimCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
    
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;
            const r = data[idx], g = data[idx+1], b = data[idx+2];
            if (r < 235 || g < 235 || b < 235) {
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
    { id: 'q50', page: 2, x: 1020, y: 730, w: 850, h: 320, name: 'q50_trapezoid_area.png' },
    { id: 'q66', page: 3, x: 180, y: 1290, w: 750, h: 210, name: 'q66_right_triangle_24_7.png' },
    { id: 'q68', page: 3, x: 180, y: 1800, w: 750, h: 200, name: 'q68_triangle_37_deg.png' },
    { id: 'q69', page: 3, x: 180, y: 2040, w: 750, h: 250, name: 'q69_triangle_6_8_10.png' },
    { id: 'q92', page: 4, x: 180, y: 920, w: 750, h: 250, name: 'q92_angles_30_60.png' },
    { id: 'q93', page: 4, x: 180, y: 1220, w: 750, h: 360, name: 'q93_circle_tangent.png' },
    { id: 'q94', page: 4, x: 180, y: 1630, w: 750, h: 360, name: 'q94_triangle_3_4.png' },
    { id: 'q112', page: 5, x: 180, y: 565, w: 780, h: 110, name: 'q112_charges_origin.png' },
    { id: 'q115', page: 5, x: 180, y: 1020, w: 750, h: 280, name: 'q115_line_53_deg.png' },
    { id: 'q116', page: 5, x: 180, y: 1460, w: 750, h: 250, name: 'q116_line_p1_p2.png' },
    { id: 'q117', page: 5, x: 180, y: 1760, w: 750, h: 480, name: 'q117_grid_line.png' },
    { id: 'q118', page: 5, x: 1020, y: 210, w: 850, h: 270, name: 'q118_line_intercepts.png' },
    { id: 'q119', page: 5, x: 1020, y: 550, w: 850, h: 420, name: 'q119_vt_graphs.png' },
    { id: 'q121', page: 5, x: 1020, y: 1130, w: 850, h: 200, name: 'q121_curve_abc.png' },
    { id: 'q122', page: 5, x: 1020, y: 1370, w: 850, h: 250, name: 'q122_curve_tangent_150.png' },
    { id: 'q135', page: 6, x: 180, y: 1370, w: 780, h: 420, name: 'q135_b_vs_r_graphs.png' },
    { id: 'q136', page: 6, x: 180, y: 1850, w: 780, h: 450, name: 'q136_1v_vs_1u_graphs.png' },
    { id: 'q137', page: 6, x: 1020, y: 260, w: 850, h: 440, name: 'q137_xc_vs_f_graphs.png' },
    { id: 'q138', page: 6, x: 1020, y: 800, w: 850, h: 380, name: 'q138_pv_vs_v_graphs.png' },
    { id: 'q139', page: 6, x: 1020, y: 1250, w: 850, h: 400, name: 'q139_v_vs_y_graphs.png' },
    { id: 'q140', page: 6, x: 1020, y: 1820, w: 850, h: 480, name: 'q140_match_line_graphs.png' },
    { id: 'q142', page: 7, x: 180, y: 310, w: 780, h: 240, name: 'q142_lines_i_ii.png' },
    { id: 'q143', page: 7, x: 180, y: 575, w: 780, h: 360, name: 'q143_four_line_graphs.png' },
    { id: 'q145', page: 7, x: 180, y: 1030, w: 780, h: 320, name: 'q145_curves_pqrs.png' },
    { id: 'q146', page: 7, x: 180, y: 1480, w: 780, h: 270, name: 'q146_three_parallel_lines.png' },
    { id: 'q147', page: 7, x: 180, y: 1810, w: 780, h: 200, name: 'q147_two_lines_alpha_beta.png' },
    { id: 'q150', page: 7, x: 1020, y: 230, w: 850, h: 220, name: 'q150_vt_graph_53.png' },
    { id: 'q151', page: 7, x: 1020, y: 550, w: 850, h: 270, name: 'q151_line_10_4.png' },
    { id: 'q152', page: 7, x: 1020, y: 880, w: 850, h: 180, name: 'q152_line_20_4.png' },
    { id: 'q165', page: 8, x: 180, y: 700, w: 780, h: 860, name: 'q165_match_graphs.png' },
    { id: 'q171', page: 8, x: 1020, y: 840, w: 850, h: 220, name: 'q171_pv_isotherms.png' },
    { id: 'q172', page: 8, x: 1020, y: 1160, w: 850, h: 220, name: 'q172_yx_ab.png' },
    { id: 'q178', page: 9, x: 180, y: 180, w: 780, h: 180, name: 'q178_pv_isobaric.png' },
    { id: 'q179', page: 9, x: 180, y: 740, w: 780, h: 280, name: 'q179_curve_abcd.png' },
    { id: 'q180', page: 9, x: 180, y: 1090, w: 780, h: 240, name: 'q180_curves_i_ii.png' },
    { id: 'q181', page: 9, x: 180, y: 1420, w: 780, h: 660, name: 'q181_four_slope_graphs.png' }
];

async function cropAll() {
    const outDir = './backend/uploads/physics_basic_maths';
    const frontendDir = './frontend/public/uploads/physics_basic_maths';
    fs.mkdirSync(outDir, { recursive: true });
    fs.mkdirSync(frontendDir, { recursive: true });

    const pageImages = {};

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
        
        fs.writeFileSync(path.join(outDir, c.name), buf);
        fs.writeFileSync(path.join(frontendDir, c.name), buf);
        console.log(`Cropped & saved ${c.name} (${trimmed.width}x${trimmed.height})`);
    }
    console.log("All crops completed!");
}

cropAll().catch(console.error);
