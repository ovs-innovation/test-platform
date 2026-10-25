import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const outDirBackend = path.resolve(__dirname, '../uploads/units_measurements');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/units_measurements');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

// 1. Q9: Vernier Caliper Diagram
const svgQ9 = `
<svg width="700" height="320" viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <style>
    .label { font-size: 16px; font-weight: bold; fill: #1e293b; }
    .scale-num { font-size: 15px; font-weight: 600; fill: #0f172a; }
    .vs-num { font-size: 13px; font-weight: 600; fill: #2563eb; }
    .main-line { stroke: #0f172a; stroke-width: 2.5; }
    .main-tick-major { stroke: #0f172a; stroke-width: 2.5; }
    .main-tick-minor { stroke: #475569; stroke-width: 1.5; }
    .vernier-line { stroke: #2563eb; stroke-width: 2.5; }
    .vernier-tick { stroke: #2563eb; stroke-width: 2; }
    .coincide-line { stroke: #dc2626; stroke-width: 2; stroke-dasharray: 4,4; }
    .highlight-box { fill: #fef2f2; stroke: #dc2626; stroke-width: 1.5; rx: 4; }
  </style>

  <!-- Title & Info Banner -->
  <rect x="20" y="15" width="660" height="42" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <text x="35" y="42" class="label" fill="#0f172a">Vernier Calipers Reading (Least Count = 0.01 cm)</text>

  <!-- Main Scale Base Line -->
  <line x1="60" y1="210" x2="640" y2="210" class="main-line" />
  <text x="645" y="215" class="scale-num">cm</text>

  <!-- Main Scale Ticks (Every 0.1 cm = 40px, starting from 2.4 cm at x=60) -->
  <!-- 2.4 cm -> x=60 -->
  <line x1="60" y1="210" x2="60" y2="185" class="main-tick-minor" />
  
  <!-- 2.5 cm -> x=100 -->
  <line x1="100" y1="210" x2="100" y2="175" class="main-tick-major" />
  <text x="90" y="235" class="scale-num">2.5</text>

  <!-- 2.6 cm -> x=140 -->
  <line x1="140" y1="210" x2="140" y2="185" class="main-tick-minor" />

  <!-- 2.7 cm -> x=180 (Main Scale Reading MSR = 2.7) -->
  <line x1="180" y1="210" x2="180" y2="185" class="main-tick-minor" />
  <text x="170" y="235" class="scale-num" fill="#475569">2.7</text>

  <!-- 2.8 cm -> x=220 -->
  <line x1="220" y1="210" x2="220" y2="185" class="main-tick-minor" />

  <!-- 2.9 cm -> x=260 -->
  <line x1="260" y1="210" x2="260" y2="185" class="main-tick-minor" />

  <!-- 3.0 cm -> x=300 -->
  <line x1="300" y1="210" x2="300" y2="175" class="main-tick-major" />
  <text x="290" y="235" class="scale-num">3.0</text>

  <!-- 3.1 cm -> x=340 (Coinciding Mark on Main Scale!) -->
  <line x1="340" y1="210" x2="340" y2="180" class="main-tick-major" stroke="#dc2626" stroke-width="3" />
  <text x="330" y="235" class="scale-num" fill="#dc2626" font-weight="bold">3.1</text>

  <!-- 3.2 cm -> x=380 -->
  <line x1="380" y1="210" x2="380" y2="185" class="main-tick-minor" />

  <!-- 3.3 cm -> x=420 -->
  <line x1="420" y1="210" x2="420" y2="185" class="main-tick-minor" />

  <!-- 3.4 cm -> x=460 -->
  <line x1="460" y1="210" x2="460" y2="185" class="main-tick-minor" />

  <!-- 3.5 cm -> x=500 -->
  <line x1="500" y1="210" x2="500" y2="175" class="main-tick-major" />
  <text x="490" y="235" class="scale-num">3.5</text>

  <!-- Vernier Scale Slider Body -->
  <rect x="180" y="90" width="400" height="65" rx="4" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.8" />
  <text x="470" y="125" class="vs-num" font-weight="bold">Vernier Scale</text>

  <!-- Vernier Scale Baseline -->
  <line x1="180" y1="155" x2="580" y2="155" class="vernier-line" />

  <!-- Vernier 0 mark is at 2.74 cm -> x = 180 + (0.04 * 400) = 196 -->
  <!-- 10 VSD = 9 MSD = 0.9 cm = 360 px => 1 VSD = 36 px -->
  <!-- V0: x = 196 -->
  <line x1="196" y1="155" x2="196" y2="130" class="vernier-tick" stroke="#2563eb" stroke-width="2.5" />
  <text x="192" y="122" class="vs-num">0</text>

  <!-- V1: x = 196 + 36 = 232 -->
  <line x1="232" y1="155" x2="232" y2="135" class="vernier-tick" />

  <!-- V2: x = 232 + 36 = 268 -->
  <line x1="268" y1="155" x2="268" y2="135" class="vernier-tick" />

  <!-- V3: x = 268 + 36 = 304 -->
  <line x1="304" y1="155" x2="304" y2="135" class="vernier-tick" />

  <!-- V4: x = 304 + 36 = 340 (EXACT COINCIDENCE WITH 3.1 cm!) -->
  <line x1="340" y1="155" x2="340" y2="125" class="vernier-tick" stroke="#dc2626" stroke-width="3" />
  <text x="336" y="118" class="vs-num" fill="#dc2626" font-weight="bold">4</text>

  <!-- V5: x = 340 + 36 = 376 -->
  <line x1="376" y1="155" x2="376" y2="135" class="vernier-tick" />
  <text x="372" y="122" class="vs-num">5</text>

  <!-- V6: x = 412 -->
  <line x1="412" y1="155" x2="412" y2="135" class="vernier-tick" />

  <!-- V7: x = 448 -->
  <line x1="448" y1="155" x2="448" y2="135" class="vernier-tick" />

  <!-- V8: x = 484 -->
  <line x1="484" y1="155" x2="484" y2="135" class="vernier-tick" />

  <!-- V9: x = 520 -->
  <line x1="520" y1="155" x2="520" y2="135" class="vernier-tick" />

  <!-- V10: x = 556 -->
  <line x1="556" y1="155" x2="556" y2="130" class="vernier-tick" stroke="#2563eb" stroke-width="2.5" />
  <text x="550" y="122" class="vs-num">10</text>

  <!-- Red Alignment Guide Line Connecting V4 and Main 3.1 -->
  <line x1="340" y1="125" x2="340" y2="210" class="coincide-line" />

  <!-- Highlight Badge at Coincidence Point -->
  <rect x="250" y="260" width="280" height="36" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.2"/>
  <text x="260" y="283" font-size="13" font-weight="600" fill="#dc2626">4th division aligns with 3.1 cm mark</text>
</svg>
`;

// 2. Q52: n vs u Variation Graphs (4 Options)
const svgQ52 = `
<svg width="760" height="380" viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
  <style>
    .panel-box { fill: #f8fafc; stroke: #cbd5e1; stroke-width: 1.5; rx: 8; }
    .axis { stroke: #1e293b; stroke-width: 2.2; marker-end: url(#arrow); }
    .curve { stroke: #2563eb; stroke-width: 3; fill: none; stroke-linecap: round; }
    .correct-curve { stroke: #059669; stroke-width: 3.5; fill: none; stroke-linecap: round; }
    .opt-label { font-size: 18px; font-weight: bold; fill: #0f172a; }
    .axis-label { font-size: 16px; font-weight: bold; font-style: italic; fill: #0f172a; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Title Banner -->
  <text x="25" y="32" font-size="17" font-weight="bold" fill="#1e293b">Variation of Numerical Value (n) with Unit (u): Q = n · u = constant ⇒ n ∝ 1/u</text>

  <!-- PANEL (1) -->
  <g transform="translate(30, 55)">
    <rect width="160" height="150" class="panel-box" />
    <text x="15" y="25" class="opt-label">(1)</text>
    <!-- Axes: origin at (35, 125) -->
    <line x1="35" y1="125" x2="35" y2="35" class="axis" />
    <line x1="35" y1="125" x2="140" y2="125" class="axis" />
    <text x="20" y="45" class="axis-label">n</text>
    <text x="142" y="138" class="axis-label">u</text>
    <!-- Curve: increasing convex -->
    <path d="M 40 120 Q 80 115 130 50" class="curve" />
  </g>

  <!-- PANEL (2) -->
  <g transform="translate(215, 55)">
    <rect width="160" height="150" class="panel-box" />
    <text x="15" y="25" class="opt-label">(2)</text>
    <!-- Axes -->
    <line x1="35" y1="125" x2="35" y2="35" class="axis" />
    <line x1="35" y1="125" x2="140" y2="125" class="axis" />
    <text x="20" y="45" class="axis-label">n</text>
    <text x="142" y="138" class="axis-label">u</text>
    <!-- Curve: sharp drop then flat horizontal -->
    <path d="M 40 50 Q 55 105 85 110 L 135 110" class="curve" />
  </g>

  <!-- PANEL (3) - Correct Rectangular Hyperbola -->
  <g transform="translate(400, 55)">
    <rect width="160" height="150" class="panel-box" fill="#ecfdf5" stroke="#10b981" stroke-width="2" />
    <text x="15" y="25" class="opt-label" fill="#047857">(3) ✓</text>
    <!-- Axes -->
    <line x1="35" y1="125" x2="35" y2="35" class="axis" />
    <line x1="35" y1="125" x2="140" y2="125" class="axis" />
    <text x="20" y="45" class="axis-label">n</text>
    <text x="142" y="138" class="axis-label">u</text>
    <!-- Rectangular Hyperbola Curve: n ∝ 1/u -->
    <path d="M 42 45 Q 52 95 135 120" class="correct-curve" />
    <text x="50" y="142" font-size="11" font-weight="bold" fill="#047857">Rectangular Hyperbola</text>
  </g>

  <!-- PANEL (4) -->
  <g transform="translate(585, 55)">
    <rect width="160" height="150" class="panel-box" />
    <text x="15" y="25" class="opt-label">(4)</text>
    <!-- Axes -->
    <line x1="35" y1="125" x2="35" y2="35" class="axis" />
    <line x1="35" y1="125" x2="140" y2="125" class="axis" />
    <text x="20" y="45" class="axis-label">n</text>
    <text x="142" y="138" class="axis-label">u</text>
    <!-- Curve: straight line with negative slope -->
    <line x1="42" y1="50" x2="135" y2="120" class="curve" />
  </g>

  <!-- Explanation note at bottom -->
  <rect x="30" y="225" width="700" height="40" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <text x="45" y="250" font-size="14" fill="#334155">Since magnitude $Q = n_1 u_1 = n_2 u_2$, the product $n \\times u = \\text{constant}$, giving a rectangular hyperbola (Graph 3).</text>
</svg>
`;

async function main() {
  console.log('Generating Physics diagrams...');

  // Save SVGs locally
  fs.writeFileSync(path.join(outDirFrontend, 'q9_vernier_scale.svg'), svgQ9, 'utf8');
  fs.writeFileSync(path.join(outDirBackend, 'q9_vernier_scale.svg'), svgQ9, 'utf8');

  fs.writeFileSync(path.join(outDirFrontend, 'q52_nu_graph.svg'), svgQ52, 'utf8');
  fs.writeFileSync(path.join(outDirBackend, 'q52_nu_graph.svg'), svgQ52, 'utf8');

  // Convert to high-res PNG
  const pngQ9 = await sharp(Buffer.from(svgQ9)).png().toBuffer();
  fs.writeFileSync(path.join(outDirFrontend, 'q9_vernier_scale.png'), pngQ9);
  fs.writeFileSync(path.join(outDirBackend, 'q9_vernier_scale.png'), pngQ9);

  const pngQ52 = await sharp(Buffer.from(svgQ52)).png().toBuffer();
  fs.writeFileSync(path.join(outDirFrontend, 'q52_nu_graph.png'), pngQ52);
  fs.writeFileSync(path.join(outDirBackend, 'q52_nu_graph.png'), pngQ52);

  console.log('Local files created successfully in frontend/public and backend/uploads.');

  // Upload to Cloudinary
  let q9Url = '/uploads/units_measurements/q9_vernier_scale.png';
  let q52Url = '/uploads/units_measurements/q52_nu_graph.png';

  try {
    const uploadRes9 = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'edvedum_physics_units', public_id: 'q9_vernier_scale' },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(pngQ9);
    });
    console.log('Cloudinary Q9 uploaded:', uploadRes9.secure_url);
    q9Url = uploadRes9.secure_url;
  } catch (err) {
    console.warn('Cloudinary upload for Q9 failed, using local URL:', err.message);
  }

  try {
    const uploadRes52 = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'edvedum_physics_units', public_id: 'q52_nu_graph' },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(pngQ52);
    });
    console.log('Cloudinary Q52 uploaded:', uploadRes52.secure_url);
    q52Url = uploadRes52.secure_url;
  } catch (err) {
    console.warn('Cloudinary upload for Q52 failed, using local URL:', err.message);
  }

  const diagramMap = {
    9: q9Url,
    52: q52Url,
  };

  fs.writeFileSync(
    path.join(__dirname, 'physics_diagrams.json'),
    JSON.stringify(diagramMap, null, 2),
    'utf8'
  );
  console.log('Saved physics_diagrams.json:', diagramMap);
}

main().catch(err => {
  console.error('Diagram generation failed:', err);
  process.exit(1);
});
