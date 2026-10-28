import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendUploadDir = path.resolve(__dirname, '../uploads/atoms');
const frontendUploadDir = path.resolve(__dirname, '../../frontend/public/uploads/atoms');

for (const dir of [backendUploadDir, frontendUploadDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function saveSvgAsPng(svgContent, baseName) {
  const backendPng = path.join(backendUploadDir, `${baseName}.png`);
  const frontendPng = path.join(frontendUploadDir, `${baseName}.png`);
  const backendSvg = path.join(backendUploadDir, `${baseName}.svg`);
  const frontendSvg = path.join(frontendUploadDir, `${baseName}.svg`);

  fs.writeFileSync(backendSvg, svgContent);
  fs.writeFileSync(frontendSvg, svgContent);

  const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
  fs.writeFileSync(backendPng, pngBuffer);
  fs.writeFileSync(frontendPng, pngBuffer);

  console.log(`Saved ${baseName}.png & .svg to backend and frontend`);
}

// 1. Q22: Moseley's Law 4 Curves of Z vs sqrt(nu)
const svgQ22 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
    </marker>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff" />
  
  <!-- Graph 1 -->
  <g transform="translate(60, 40)">
    <text x="-35" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">(1)</text>
    <!-- axes -->
    <line x1="20" y1="180" x2="20" y2="20" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <line x1="20" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <text x="8" y="15" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">Z</text>
    <text x="185" y="185" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">√ν</text>
    <!-- curve: intercept on Z axis -->
    <line x1="20" y1="130" x2="140" y2="30" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
  </g>

  <!-- Graph 2 -->
  <g transform="translate(360, 40)">
    <text x="-35" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">(2)</text>
    <!-- axes -->
    <line x1="20" y1="180" x2="20" y2="20" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <line x1="20" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <text x="8" y="15" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">Z</text>
    <text x="185" y="185" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">√ν</text>
    <!-- curve: intercept on horizontal axis -->
    <line x1="110" y1="180" x2="150" y2="40" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
  </g>

  <!-- Graph 3 -->
  <g transform="translate(60, 270)">
    <text x="-35" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">(3)</text>
    <!-- axes -->
    <line x1="20" y1="180" x2="20" y2="20" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <line x1="20" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <text x="8" y="15" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">Z</text>
    <text x="185" y="185" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">√ν</text>
    <!-- curve: from origin -->
    <line x1="20" y1="180" x2="150" y2="50" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
  </g>

  <!-- Graph 4 -->
  <g transform="translate(360, 270)">
    <text x="-35" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">(4)</text>
    <!-- axes -->
    <line x1="20" y1="180" x2="20" y2="20" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <line x1="20" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow)" />
    <text x="8" y="15" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">Z</text>
    <text x="185" y="185" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">√ν</text>
    <!-- curve: concave curved line -->
    <path d="M 20 180 Q 80 80 160 80" fill="none" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
  </g>
</svg>
`;

// 2. Q34: Energy transitions n3, n2, n1 with 40nm, 60nm, x nm
const svgQ34 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" width="520" height="280">
  <defs>
    <marker id="arrow-down" viewBox="0 0 10 10" refX="5" refY="6" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 1 0 L 5 10 L 9 0 z" fill="#dc2626" />
    </marker>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff" />

  <!-- Energy Levels -->
  <line x1="60" y1="50" x2="380" y2="50" stroke="#1e293b" stroke-width="3" />
  <text x="395" y="56" font-family="sans-serif" font-size="18" font-weight="600" fill="#1e293b">n₃ orbit</text>

  <line x1="60" y1="140" x2="380" y2="140" stroke="#1e293b" stroke-width="3" />
  <text x="395" y="146" font-family="sans-serif" font-size="18" font-weight="600" fill="#1e293b">n₂ orbit</text>

  <line x1="60" y1="230" x2="380" y2="230" stroke="#1e293b" stroke-width="3" />
  <text x="395" y="236" font-family="sans-serif" font-size="18" font-weight="600" fill="#1e293b">n₁ orbit</text>

  <!-- Transitions -->
  <!-- n3 -> n1 (40 nm) -->
  <line x1="120" y1="50" x2="120" y2="225" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-down)" />
  <rect x="125" y="125" width="65" height="25" fill="#fef2f2" rx="4" />
  <text x="130" y="143" font-family="sans-serif" font-size="16" font-weight="bold" fill="#b91c1c">40 nm</text>

  <!-- n3 -> n2 (x nm) -->
  <line x1="280" y1="50" x2="280" y2="135" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-down)" />
  <rect x="285" y="80" width="55" height="25" fill="#fef2f2" rx="4" />
  <text x="290" y="98" font-family="sans-serif" font-size="16" font-weight="bold" fill="#b91c1c">x nm</text>

  <!-- n2 -> n1 (60 nm) -->
  <line x1="210" y1="140" x2="210" y2="225" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-down)" />
  <rect x="215" y="170" width="65" height="25" fill="#fef2f2" rx="4" />
  <text x="220" y="188" font-family="sans-serif" font-size="16" font-weight="bold" fill="#b91c1c">60 nm</text>
</svg>
`;

// 3. Q54: Two atomic transitions lambda1 = 3000 A, lambda2 = 6000 A, lambda
const svgQ54 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" width="520" height="280">
  <defs>
    <marker id="arrow-down-red" viewBox="0 0 10 10" refX="5" refY="6" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 1 0 L 5 10 L 9 0 z" fill="#dc2626" />
    </marker>
    <marker id="arrow-wave" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
    </marker>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff" />

  <!-- 3 Levels -->
  <line x1="50" y1="50" x2="470" y2="50" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
  <line x1="50" y1="140" x2="470" y2="140" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
  <line x1="50" y1="230" x2="470" y2="230" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />

  <!-- Left: Level 3 to 2 -->
  <line x1="120" y1="50" x2="120" y2="135" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-down-red)" />
  <!-- Wave for lambda 1 -->
  <path d="M 130 90 Q 145 80 160 90 T 190 90 T 220 90 L 230 90" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-wave)" />
  <text x="240" y="95" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">λ₁</text>

  <!-- Left: Level 2 to 1 -->
  <line x1="200" y1="140" x2="200" y2="225" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-down-red)" />
  <!-- Wave for lambda 2 -->
  <path d="M 190 185 Q 175 175 160 185 T 130 185 T 100 185 L 90 185" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-wave)" />
  <text x="65" y="190" font-family="sans-serif" font-size="18" font-weight="bold" fill="#2563eb">λ₂</text>

  <!-- Right: Level 3 to 1 -->
  <line x1="360" y1="50" x2="360" y2="225" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-down-red)" />
  <!-- Wave for lambda -->
  <path d="M 370 135 Q 385 125 400 135 T 430 135 T 460 135 L 470 135" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-wave)" />
  <text x="480" y="140" font-family="sans-serif" font-size="20" font-weight="bold" fill="#2563eb">λ</text>
</svg>
`;

// 4. Q59: Transitions a, b, c
const svgQ59 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 260" width="460" height="260">
  <defs>
    <marker id="arrow-down-q59" viewBox="0 0 10 10" refX="5" refY="6" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 1 0 L 5 10 L 9 0 z" fill="#1e293b" />
    </marker>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff" />

  <!-- 3 Levels -->
  <line x1="40" y1="40" x2="420" y2="40" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
  <line x1="40" y1="130" x2="420" y2="130" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
  <line x1="40" y1="220" x2="420" y2="220" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />

  <!-- Transition a (top to middle) -->
  <line x1="120" y1="40" x2="120" y2="125" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow-down-q59)" />
  <text x="85" y="90" font-family="sans-serif" font-size="20" font-style="italic" font-weight="bold" fill="#1e293b">λₐ</text>

  <!-- Transition b (middle to bottom) -->
  <line x1="230" y1="130" x2="230" y2="215" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow-down-q59)" />
  <text x="195" y="180" font-family="sans-serif" font-size="20" font-style="italic" font-weight="bold" fill="#1e293b">λ₆</text>

  <!-- Transition c (top to bottom) -->
  <line x1="340" y1="40" x2="340" y2="215" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow-down-q59)" />
  <text x="355" y="135" font-family="sans-serif" font-size="20" font-style="italic" font-weight="bold" fill="#1e293b">λ꜀</text>
</svg>
`;

// 5. Q96: KR vs n (4 options)
const svgQ96 = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <marker id="arrow96" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
    </marker>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff" />
  
  <!-- Graph 1 -->
  <g transform="translate(60, 40)">
    <text x="-35" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">(1)</text>
    <line x1="20" y1="180" x2="20" y2="20" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow96)" />
    <line x1="20" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow96)" />
    <text x="5" y="18" font-family="sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">KR</text>
    <text x="185" y="185" font-family="sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">n</text>
    <!-- curve: straight line through origin -->
    <line x1="20" y1="180" x2="150" y2="50" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
  </g>

  <!-- Graph 2 -->
  <g transform="translate(360, 40)">
    <text x="-35" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">(2)</text>
    <line x1="20" y1="180" x2="20" y2="20" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow96)" />
    <line x1="20" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow96)" />
    <text x="5" y="18" font-family="sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">KR</text>
    <text x="185" y="185" font-family="sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">n</text>
    <!-- curve: horizontal constant line -->
    <line x1="20" y1="70" x2="160" y2="70" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
  </g>

  <!-- Graph 3 -->
  <g transform="translate(60, 270)">
    <text x="-35" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">(3)</text>
    <line x1="20" y1="180" x2="20" y2="20" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow96)" />
    <line x1="20" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow96)" />
    <text x="5" y="18" font-family="sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">KR</text>
    <text x="185" y="185" font-family="sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">n</text>
    <!-- curve: upward curved -->
    <path d="M 20 180 Q 90 170 160 50" fill="none" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
  </g>

  <!-- Graph 4 -->
  <g transform="translate(360, 270)">
    <text x="-35" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#1e293b">(4)</text>
    <line x1="20" y1="180" x2="20" y2="20" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow96)" />
    <line x1="20" y1="180" x2="180" y2="180" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arrow96)" />
    <text x="5" y="18" font-family="sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">KR</text>
    <text x="185" y="185" font-family="sans-serif" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">n</text>
    <!-- curve: downward hyperbolic decay -->
    <path d="M 30 50 Q 50 140 160 175" fill="none" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" />
  </g>
</svg>
`;

async function main() {
  await saveSvgAsPng(svgQ22, 'atoms_q22');
  await saveSvgAsPng(svgQ34, 'atoms_q34');
  await saveSvgAsPng(svgQ54, 'atoms_q54');
  await saveSvgAsPng(svgQ59, 'atoms_q59');
  await saveSvgAsPng(svgQ96, 'atoms_q96');
  console.log('All 5 Atoms diagrams successfully generated!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
