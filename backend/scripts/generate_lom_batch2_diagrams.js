import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const outDirBackend = path.resolve(__dirname, '../uploads/laws_of_motion');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/laws_of_motion');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 540, h = 300) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.2; }
    .grid { stroke: #e2e8f0; stroke-width: 1; stroke-dasharray: 4,4; }
    .hatch { stroke: #94a3b8; stroke-width: 1.5; }
    .surface { stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; }
    .block { fill: #f8fafc; stroke: #0f172a; stroke-width: 2.2; rx: 4; }
    .block-amber { fill: #fffbeb; stroke: #d97706; stroke-width: 2.2; rx: 4; }
    .block-blue { fill: #eff6ff; stroke: #2563eb; stroke-width: 2.2; rx: 4; }
    .string-line { stroke: #0f172a; stroke-width: 2; stroke-linecap: round; }
    .pulley { fill: #f1f5f9; stroke: #0f172a; stroke-width: 2; }
    .pulley-center { fill: #0f172a; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .force-arrow { stroke: #dc2626; stroke-width: 2.5; stroke-linecap: round; }
    .vel-arrow { stroke: #2563eb; stroke-width: 2.5; stroke-linecap: round; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
  </defs>
`;

export const BATCH2_DIAGRAMS = {
  // Q156: Block of mass M, length L pulled by F
  156: `
  ${SVG_HEADER(500, 240)}
    <!-- Ground -->
    <line x1="80" y1="180" x2="420" y2="180" class="surface" />
    <text x="370" y="205" class="sublabel">Smooth</text>

    <!-- Block M -->
    <rect x="150" y="90" width="180" height="90" class="block" />
    <text x="210" y="135" class="label" font-size="20">M</text>

    <!-- Dashed cut at distance x -->
    <line x1="230" y1="90" x2="230" y2="180" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,3" />

    <!-- Dimension x -->
    <line x1="150" y1="200" x2="230" y2="200" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" marker-start="url(#arrow)" />
    <text x="190" y="215" class="sublabel">x</text>

    <!-- Dimension L -->
    <line x1="150" y1="70" x2="330" y2="70" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" marker-start="url(#arrow)" />
    <text x="240" y="55" class="label">L</text>

    <!-- Force F on right -->
    <line x1="330" y1="135" x2="410" y2="135" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="370" y="115" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q157: Incline 45 deg, block projected up
  157: `
  ${SVG_HEADER(480, 260)}
    <!-- Base -->
    <line x1="100" y1="210" x2="380" y2="210" class="surface" />
    <!-- Incline 45 deg -->
    <line x1="100" y1="210" x2="320" y2="60" class="surface" />
    <line x1="320" y1="60" x2="320" y2="210" class="surface" />
    <text x="160" y="200" class="label">θ = 45°</text>

    <!-- Block on incline -->
    <g transform="translate(210, 135) rotate(-34.3)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">m</text>
      <!-- Velocity vector pointing up the plane -->
      <line x1="25" y1="-15" x2="65" y2="-15" class="vel-arrow" marker-end="url(#arrow-blue)" />
      <text x="45" y="-30" class="label" fill="#2563eb">u</text>
    </g>
    <text x="270" y="115" class="sublabel">μ = 0.5</text>
  </svg>`,

  // Q158: Graph of friction force f vs applied force F showing angle theta
  158: `
  ${SVG_HEADER(500, 260)}
    <!-- Axes -->
    <line x1="100" y1="200" x2="440" y2="200" class="axis" marker-end="url(#arrow)" />
    <line x1="100" y1="200" x2="100" y2="50" class="axis" marker-end="url(#arrow)" />
    <text x="360" y="225" class="label">F (applied external force)</text>
    <text x="65" y="70" class="label">Force of friction (f)</text>

    <!-- Curve: linear up to limiting friction, then slight drop and horizontal (kinetic) -->
    <line x1="100" y1="200" x2="220" y2="80" stroke="#2563eb" stroke-width="3" />
    <line x1="220" y1="80" x2="240" y2="105" stroke="#2563eb" stroke-width="3" />
    <line x1="240" y1="105" x2="380" y2="105" stroke="#2563eb" stroke-width="3" />

    <!-- Angle theta with horizontal -->
    <path d="M 140 200 A 40 40 0 0 0 130 170" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="150" y="180" class="label">θ</text>
  </svg>`,

  // Q160: Lift accelerating upward with a = g, block B on A
  160: `
  ${SVG_HEADER(480, 280)}
    <!-- Lift cabin -->
    <rect x="150" y="70" width="180" height="180" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />

    <!-- Lift acceleration a = g -->
    <line x1="240" y1="55" x2="240" y2="25" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="270" y="40" class="label" fill="#2563eb">a = g</text>

    <!-- Block A (5kg) on floor -->
    <rect x="190" y="180" width="100" height="50" class="block" />
    <text x="240" y="195" class="label">A</text>
    <text x="240" y="215" class="sublabel">5 kg</text>

    <!-- Block B (3kg) on top of A -->
    <rect x="205" y="125" width="70" height="55" class="block-amber" />
    <text x="240" y="145" class="label">B</text>
    <text x="240" y="165" class="sublabel">3 kg</text>
  </svg>`,

  // Q172: Half smooth, half rough floor with block m = 2kg pushed by F
  172: `
  ${SVG_HEADER(520, 260)}
    <!-- Floor: left smooth, right rough -->
    <line x1="80" y1="170" x2="260" y2="170" class="surface" />
    <text x="170" y="195" class="sublabel">Smooth</text>

    <line x1="260" y1="170" x2="440" y2="170" stroke="#0f172a" stroke-width="3" stroke-dasharray="4,2" />
    <text x="350" y="195" class="sublabel">Rough</text>

    <!-- Block m = 2kg -->
    <rect x="140" y="110" width="70" height="60" class="block" />
    <text x="175" y="140" class="label">m</text>
    <text x="260" y="100" class="sublabel">m = 2 kg</text>

    <!-- Force F pushing from left -->
    <line x1="70" y1="140" x2="135" y2="140" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="100" y="120" class="label" fill="#dc2626">F</text>
  </svg>`,

  // Q173: Smooth wedge of height h, angle theta accelerating with a = g cot theta
  173: `
  ${SVG_HEADER(500, 280)}
    <!-- Ground -->
    <line x1="80" y1="220" x2="420" y2="220" class="surface" />

    <!-- Wedge with height h -->
    <polygon points="170,220 370,220 170,70" fill="#f8fafc" stroke="#0f172a" stroke-width="2.2" />

    <!-- Height dimension h -->
    <line x1="140" y1="220" x2="140" y2="70" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" marker-start="url(#arrow)" />
    <text x="125" y="145" class="label">h</text>

    <!-- Angle theta at bottom right -->
    <path d="M 320 220 A 50 50 0 0 1 330 190" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="310" y="205" class="label">θ</text>

    <!-- Block m at apex -->
    <g transform="translate(195, 88) rotate(-37)">
      <rect x="-25" y="-30" width="50" height="30" class="block-amber" />
      <text x="0" y="-15" class="label">m</text>
    </g>

    <!-- Wedge acceleration arrow to the left -->
    <line x1="120" y1="145" x2="60" y2="145" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="90" y="125" class="label" fill="#2563eb">a = g cotθ</text>
  </svg>`,

  // Q175: Vector diagrams of bomb explosion momenta P1, P2, P3
  175: `
  ${SVG_HEADER(560, 260)}
    <!-- Diagram 1: Correct closed triangle: P1 up, P2 right, P3 diagonally closing loop -->
    <g transform="translate(40, 40)">
      <text x="100" y="15" class="label">(1)</text>
      <line x1="50" y1="140" x2="50" y2="40" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
      <text x="30" y="90" class="label" fill="#2563eb">P₁</text>

      <line x1="50" y1="40" x2="150" y2="40" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
      <text x="100" y="30" class="label" fill="#2563eb">P₂</text>

      <line x1="150" y1="40" x2="50" y2="140" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
      <text x="115" y="105" class="label" fill="#dc2626">P₃</text>
    </g>

    <!-- Diagram 2: Non-closed / wrong arrows -->
    <g transform="translate(300, 40)">
      <text x="100" y="15" class="label">(2)</text>
      <line x1="50" y1="40" x2="50" y2="140" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
      <text x="30" y="90" class="label" fill="#2563eb">P₁</text>

      <line x1="50" y1="140" x2="150" y2="140" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)" />
      <text x="100" y="160" class="label" fill="#2563eb">P₂</text>

      <line x1="50" y1="40" x2="150" y2="140" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)" />
      <text x="115" y="80" class="label" fill="#dc2626">P₃</text>
    </g>
  </svg>`,

  // Q178: Block 1kg pulled by 30N at 60 deg with vertical
  178: `
  ${SVG_HEADER(480, 260)}
    <!-- Smooth surface -->
    <line x1="80" y1="190" x2="400" y2="190" class="surface" />

    <!-- Block 1kg -->
    <rect x="180" y="120" width="80" height="70" class="block" />
    <text x="220" y="155" class="label">1 kg</text>

    <!-- Vertical dashed line from center -->
    <line x1="220" y1="120" x2="220" y2="40" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1.5" />

    <!-- Pulling force 30 N at 60 deg with vertical -->
    <line x1="220" y1="120" x2="330" y2="56" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="350" y="55" class="label" fill="#dc2626">30 N</text>

    <!-- Angle arc 60 deg -->
    <path d="M 220 70 A 50 50 0 0 1 245 78" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="245" y="60" class="label">60°</text>
  </svg>`,

  // Q183: Mass 1kg on pan with vertical spring
  183: `
  ${SVG_HEADER(460, 300)}
    <!-- Base ground -->
    <line x1="160" y1="240" x2="300" y2="240" class="surface" />

    <!-- Vertical spring -->
    <path d="M 230 240 L 230 220 L 215 210 L 245 190 L 215 170 L 245 150 L 215 130 L 245 110 L 230 100" fill="none" stroke="#0f172a" stroke-width="2.5" />

    <!-- Pan on top of spring -->
    <line x1="180" y1="100" x2="280" y2="100" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />

    <!-- Mass m = 1kg on pan -->
    <rect x="205" y="55" width="50" height="45" class="block-amber" />
    <text x="230" y="78" class="label">1 kg</text>
  </svg>`,

  // Q184: Block 4m on spring, block 2m connected by string
  184: `
  ${SVG_HEADER(460, 320)}
    <!-- Ceiling -->
    <line x1="170" y1="40" x2="290" y2="40" class="surface" />

    <!-- Spring -->
    <path d="M 230 40 L 230 55 L 218 65 L 242 75 L 218 85 L 242 95 L 218 105 L 242 115 L 230 120" fill="none" stroke="#0f172a" stroke-width="2.5" />

    <!-- Block B (4m) -->
    <rect x="195" y="120" width="70" height="50" class="block" />
    <text x="230" y="145" class="label">4m (B)</text>

    <!-- String -->
    <line x1="230" y1="170" x2="230" y2="225" class="string-line" />
    <text x="255" y="195" class="sublabel">string</text>

    <!-- Block A (2m) -->
    <rect x="205" y="225" width="50" height="45" class="block-amber" />
    <text x="230" y="248" class="label">2m (A)</text>
  </svg>`,

  // Q193: Body 20kg on 37 deg incline moving with 20 m/s
  193: `
  ${SVG_HEADER(500, 260)}
    <line x1="80" y1="210" x2="400" y2="210" class="surface" />
    <line x1="80" y1="210" x2="360" y2="70" class="surface" />
    <line x1="360" y1="70" x2="360" y2="210" class="surface" />
    <text x="140" y="195" class="label">37°</text>

    <g transform="translate(230, 135) rotate(-26.5)">
      <rect x="-30" y="-35" width="60" height="35" class="block-amber" />
      <text x="0" y="-17" class="label">20 kg</text>
      <!-- Velocity arrow down the plane -->
      <line x1="-30" y1="-17" x2="-80" y2="-17" class="vel-arrow" marker-end="url(#arrow-blue)" />
      <text x="-60" y="-35" class="label" fill="#2563eb">20 m/s</text>
    </g>
  </svg>`,

  // Q195: Block m on top of 5kg on table with hanging 4kg
  195: `
  ${SVG_HEADER(520, 280)}
    <!-- Table -->
    <line x1="80" y1="130" x2="380" y2="130" class="surface" />
    <line x1="120" y1="130" x2="120" y2="230" class="surface" />

    <!-- Pulley -->
    <circle cx="380" cy="130" r="14" class="pulley" />

    <!-- Lower block 5kg on table -->
    <rect x="180" y="85" width="75" height="45" class="block" />
    <text x="217" y="107" class="label">5 kg</text>
    <text x="140" y="107" class="sublabel">μ = 0.4</text>

    <!-- Upper block m on top of 5kg -->
    <rect x="195" y="45" width="45" height="40" class="block-amber" />
    <text x="217" y="65" class="label">m</text>

    <!-- String from 5kg to pulley to hanging 4kg -->
    <line x1="255" y1="107" x2="380" y2="116" class="string-line" />
    <line x1="394" y1="130" x2="394" y2="200" class="string-line" />

    <!-- Hanging 4kg -->
    <rect x="374" y="200" width="40" height="40" class="block-amber" />
    <text x="394" y="220" class="label">4 kg</text>
  </svg>`,

  // Q197: Block 10kg on horizontal floor
  197: `
  ${SVG_HEADER(460, 220)}
    <line x1="80" y1="160" x2="380" y2="160" class="surface" />
    <rect x="180" y="90" width="100" height="70" class="block" />
    <text x="230" y="125" class="label">10 kg</text>
    <text x="230" y="185" class="sublabel">μs = 0.5, μk = 0.45</text>
  </svg>`,

  // Q10 (Page 77): Block A in box B with acceleration a = 3i - 2j
  10: `
  ${SVG_HEADER(480, 280)}
    <!-- Box B -->
    <rect x="120" y="60" width="200" height="180" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5" />
    <text x="220" y="85" class="label" font-size="20">B</text>

    <!-- Block A in bottom-left corner -->
    <rect x="125" y="185" width="50" height="50" class="block-amber" />
    <text x="150" y="210" class="label">A</text>

    <!-- Axes -->
    <g transform="translate(370, 160)">
      <line x1="0" y1="0" x2="60" y2="0" class="axis" marker-end="url(#arrow)" />
      <line x1="0" y1="0" x2="0" y2="-60" class="axis" marker-end="url(#arrow)" />
      <text x="65" y="5" class="label">x</text>
      <text x="0" y="-70" class="label">y</text>
    </g>

    <!-- Acceleration vector a = (3i - 2j) -->
    <line x1="370" y1="80" x2="430" y2="110" class="vel-arrow" marker-end="url(#arrow-blue)" />
    <text x="410" y="65" class="sublabel" fill="#2563eb">a = (3i - 2j)</text>
  </svg>`,

  // Q11 (Page 77): Block on rough ground with F1 down and F2 right
  11: `
  ${SVG_HEADER(460, 240)}
    <line x1="80" y1="180" x2="380" y2="180" class="surface" />

    <rect x="180" y="100" width="80" height="80" class="block" />
    <text x="220" y="140" class="label">m</text>

    <!-- F1 downward -->
    <line x1="220" y1="30" x2="220" y2="95" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="235" y="60" class="label" fill="#dc2626">F₁</text>

    <!-- F2 rightward -->
    <line x1="110" y1="140" x2="175" y2="140" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="140" y="120" class="label" fill="#dc2626">F₂</text>
  </svg>`,

  // Q12 (Page 77): Block A on B on smooth ground, F1 left on A, F2 right on B
  12: `
  ${SVG_HEADER(500, 260)}
    <line x1="80" y1="200" x2="420" y2="200" class="surface" />
    <text x="250" y="225" class="sublabel">Smooth</text>

    <!-- Block B -->
    <rect x="160" y="130" width="140" height="70" class="block" />
    <text x="230" y="165" class="label">B</text>

    <!-- Force F2 on B -->
    <line x1="300" y1="165" x2="380" y2="165" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="340" y="145" class="label" fill="#dc2626">F₂</text>

    <!-- Block A on B -->
    <rect x="185" y="75" width="90" height="55" class="block-amber" />
    <text x="230" y="102" class="label">A</text>

    <!-- Force F1 left on A -->
    <line x1="185" y1="102" x2="105" y2="102" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="145" y="85" class="label" fill="#dc2626">F₁</text>
  </svg>`,

  // Q13 (Page 77): Pulley on ceiling suspended by string AB holding m1 and m2
  13: `
  ${SVG_HEADER(480, 320)}
    <line x1="180" y1="40" x2="300" y2="40" class="surface" />
    <text x="240" y="30" class="label">A</text>

    <!-- String AB to pulley -->
    <line x1="240" y1="40" x2="240" y2="100" class="string-line" />
    <text x="255" y="70" class="label">B</text>

    <!-- Pulley -->
    <circle cx="240" cy="100" r="18" class="pulley" />
    <circle cx="240" cy="100" r="3" class="pulley-center" />

    <!-- Left m1 -->
    <line x1="222" y1="100" x2="222" y2="200" class="string-line" />
    <rect x="202" y="200" width="40" height="40" class="block" />
    <text x="222" y="220" class="label">m₁</text>

    <!-- Right m2 -->
    <line x1="258" y1="100" x2="258" y2="220" class="string-line" />
    <rect x="238" y="220" width="40" height="40" class="block-amber" />
    <text x="258" y="240" class="label">m₂</text>
  </svg>`,

  // Q15 (Page 77): Block pulled at angle theta to horizontal
  15: `
  ${SVG_HEADER(480, 240)}
    <line x1="80" y1="180" x2="400" y2="180" class="surface" />
    <text x="250" y="210" class="sublabel">Rough</text>

    <rect x="160" y="110" width="80" height="70" class="block" />
    <text x="200" y="145" class="label">m</text>

    <!-- Pulling force F at angle theta -->
    <line x1="240" y1="145" x2="340" y2="85" class="force-arrow" marker-end="url(#arrow-red)" />
    <text x="355" y="80" class="label" fill="#dc2626">F</text>

    <!-- Angle theta with horizontal -->
    <line x1="240" y1="145" x2="310" y2="145" stroke="#94a3b8" stroke-dasharray="3,3" />
    <path d="M 280 145 A 40 40 0 0 0 275 125" fill="none" stroke="#0f172a" stroke-width="1.5" />
    <text x="295" y="135" class="label">θ</text>
  </svg>`
};

async function generateAll() {
  const mapping = {};
  console.log(`Starting batch 2 diagram generation for ${Object.keys(BATCH2_DIAGRAMS).length} diagrams...`);

  for (const [qNum, svgString] of Object.entries(BATCH2_DIAGRAMS)) {
    const filename = `lom_b2_q${qNum}.png`;
    const localBackendPath = path.join(outDirBackend, filename);
    const localFrontendPath = path.join(outDirFrontend, filename);

    const pngBuffer = await sharp(Buffer.from(svgString.trim()))
      .png({ quality: 95 })
      .toBuffer();

    fs.writeFileSync(localBackendPath, pngBuffer);
    fs.writeFileSync(localFrontendPath, pngBuffer);
    console.log(`Saved local PNG for Batch 2 Q${qNum} -> ${filename}`);

    try {
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'edvedum_laws_of_motion',
            public_id: `lom_b2_q${qNum}`,
            overwrite: true,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(pngBuffer);
      });

      console.log(`Cloudinary uploaded Q${qNum} -> ${uploadRes.secure_url}`);
      mapping[qNum] = {
        cloudinary_url: uploadRes.secure_url,
        local_url: `/uploads/laws_of_motion/${filename}`,
        public_id: uploadRes.public_id,
      };
    } catch (uploadErr) {
      console.warn(`Cloudinary upload failed for Q${qNum}, using local URL:`, uploadErr.message);
      mapping[qNum] = {
        cloudinary_url: `/uploads/laws_of_motion/${filename}`,
        local_url: `/uploads/laws_of_motion/${filename}`,
      };
    }
  }

  const mapPath = path.resolve(__dirname, 'laws_of_motion_batch2_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(mapping, null, 2));
  console.log(`All batch 2 diagrams generated and saved to ${mapPath}`);
}

generateAll().catch(err => {
  console.error('Fatal batch 2 diagram generation error:', err);
  process.exit(1);
});
