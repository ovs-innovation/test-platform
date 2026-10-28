import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDirBackend = path.resolve(__dirname, '../uploads/thermodynamics');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/thermodynamics');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 380, h = 280) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; }
    .label { font-size: 16px; font-weight: 700; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .tick-label { font-size: 14px; font-weight: 600; fill: #1e293b; text-anchor: middle; dominant-baseline: middle; }
    .dashed { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 4,4; }
    .solid { stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; fill: none; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="axis-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
  </defs>
`;

const diagrams = {
  // Q156: P vs V with adiabatic expansion A(800 K) -> B(500 K)
  thermo_q156: `${SVG_HEADER(360, 260)}
    <line x1="60" y1="210" x2="310" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="320" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>
    <text x="45" y="225" class="tick-label">(0,0)</text>

    <!-- Curve from A(80, 60) to B(230, 180) -->
    <path d="M 80 60 Q 110 160 230 180" class="solid" />

    <circle cx="80" cy="60" r="4" fill="#0f172a" />
    <circle cx="230" cy="180" r="4" fill="#0f172a" />

    <text x="140" y="55" class="tick-label">A (800 K)</text>
    <text x="240" y="160" class="tick-label">(500 K)</text>
    <text x="250" y="180" class="label">B</text>
  </svg>`,

  // Q160: P-V diagram of process A -> B -> C -> D
  thermo_q160: `${SVG_HEADER(380, 280)}
    <line x1="70" y1="220" x2="330" y2="220" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="70" y1="220" x2="70" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="340" y="220" class="label">V</text>
    <text x="70" y="18" class="label">P</text>

    <!-- Dashed ticks -->
    <line x1="70" y1="150" x2="270" y2="150" class="dashed" />
    <line x1="70" y1="80" x2="270" y2="80" class="dashed" />
    <line x1="130" y1="220" x2="130" y2="80" class="dashed" />
    <line x1="200" y1="220" x2="200" y2="150" class="dashed" />
    <line x1="270" y1="220" x2="270" y2="80" class="dashed" />

    <text x="45" y="150" class="tick-label">P₀</text>
    <text x="45" y="80" class="tick-label">2P₀</text>
    <text x="130" y="240" class="tick-label">V₀</text>
    <text x="200" y="240" class="tick-label">2V₀</text>
    <text x="270" y="240" class="tick-label">3V₀</text>

    <!-- Path A(200, 150) -> B(270, 150) -->
    <line x1="200" y1="150" x2="240" y2="150" class="solid" marker-end="url(#arrow)" />
    <line x1="240" y1="150" x2="270" y2="150" class="solid" />

    <!-- Path B(270, 150) -> C(270, 80) -->
    <line x1="270" y1="150" x2="270" y2="110" class="solid" marker-end="url(#arrow)" />
    <line x1="270" y1="110" x2="270" y2="80" class="solid" />

    <!-- Path C(270, 80) -> D(130, 80) -->
    <line x1="270" y1="80" x2="195" y2="80" class="solid" marker-end="url(#arrow)" />
    <line x1="195" y1="80" x2="130" y2="80" class="solid" />

    <text x="190" y="135" class="label">A</text>
    <text x="285" y="150" class="label">B</text>
    <text x="285" y="80" class="label">C</text>
    <text x="130" y="65" class="label">D</text>
  </svg>`,

  // Q162: P-V with isotherms T0 and 2T0 and processes A->B and A->C
  thermo_q162: `${SVG_HEADER(360, 260)}
    <line x1="60" y1="210" x2="310" y2="210" class="axis" marker-end="url(#axis-arrow)" />
    <line x1="60" y1="210" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)" />
    <text x="320" y="210" class="label">V</text>
    <text x="60" y="18" class="label">P</text>

    <!-- Isotherm T0 -->
    <path d="M 80 180 Q 120 150 200 160" class="solid" />
    <text x="215" y="165" class="tick-label">T₀</text>

    <!-- Isotherm 2T0 -->
    <path d="M 100 110 Q 160 90 260 120" class="solid" />
    <text x="245" y="100" class="tick-label">2T₀</text>

    <!-- State A at (105, 155) -->
    <!-- Vertical line to B at (105, 107) -->
    <line x1="105" y1="155" x2="105" y2="128" class="solid" marker-end="url(#arrow)" />
    <line x1="105" y1="128" x2="105" y2="107" class="solid" />

    <!-- Path A(105, 155) to C(185, 96) -->
    <line x1="105" y1="155" x2="148" y2="123" class="solid" marker-end="url(#arrow)" />
    <line x1="148" y1="123" x2="185" y2="96" class="solid" />

    <circle cx="105" cy="155" r="3.5" fill="#0f172a" />
    <circle cx="105" cy="107" r="3.5" fill="#0f172a" />
    <circle cx="185" cy="96" r="3.5" fill="#0f172a" />

    <text x="90" y="165" class="label">A</text>
    <text x="105" y="90" class="label">B</text>
    <text x="200" y="95" class="label">C</text>
  </svg>`
};

async function generateAll() {
  console.log(`Generating ${Object.keys(diagrams).length} diagrams...`);
  for (const [key, svg] of Object.entries(diagrams)) {
    const filename = `${key}.png`;
    const backendPath = path.join(outDirBackend, filename);
    const frontendPath = path.join(outDirFrontend, filename);

    const buffer = await sharp(Buffer.from(svg.trim())).png().toBuffer();
    fs.writeFileSync(backendPath, buffer);
    fs.writeFileSync(frontendPath, buffer);
    console.log(`✓ Generated ${filename}`);
  }
  console.log('All diagrams generated successfully!');
}

generateAll().catch(console.error);
