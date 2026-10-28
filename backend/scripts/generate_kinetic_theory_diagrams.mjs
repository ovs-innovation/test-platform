import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDirBackend = path.resolve(__dirname, '../uploads/kinetic_theory');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/kinetic_theory');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 380, h = 260) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.2; stroke-linecap: round; }
    .label { font-size: 15px; font-weight: 700; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .tick-label { font-size: 13px; font-weight: 600; fill: #1e293b; text-anchor: middle; dominant-baseline: middle; }
    .dashed { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 4,4; }
    .solid { stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    .opt-box { stroke: #cbd5e1; stroke-width: 1.2; fill: #ffffff; rx: 6; }
    .opt-title { font-size: 13px; font-weight: 700; fill: #334155; }
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
  // Q4: 4 subgraphs of n vs T
  kinetic_q4: `${SVG_HEADER(460, 280)}
    <!-- Box 1 -->
    <rect x="15" y="15" width="205" height="115" class="opt-box"/>
    <text x="30" y="32" class="opt-title">(1)</text>
    <line x1="55" y1="105" x2="190" y2="105" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="55" y1="105" x2="55" y2="35" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="200" y="105" class="label">T</text>
    <text x="55" y="25" class="label">n</text>
    <path d="M 68 45 Q 85 92 165 98" class="solid"/>

    <!-- Box 2 -->
    <rect x="235" y="15" width="205" height="115" class="opt-box"/>
    <text x="250" y="32" class="opt-title">(2)</text>
    <line x1="275" y1="105" x2="410" y2="105" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="275" y1="105" x2="275" y2="35" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="420" y="105" class="label">T</text>
    <text x="275" y="25" class="label">n</text>
    <path d="M 275 105 Q 355 100 380 45" class="solid"/>

    <!-- Box 3 -->
    <rect x="15" y="145" width="205" height="115" class="opt-box"/>
    <text x="30" y="162" class="opt-title">(3)</text>
    <line x1="55" y1="235" x2="190" y2="235" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="55" y1="235" x2="55" y2="165" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="200" y="235" class="label">T</text>
    <text x="55" y="155" class="label">n</text>
    <line x1="55" y1="195" x2="165" y2="195" class="solid"/>

    <!-- Box 4 -->
    <rect x="235" y="145" width="205" height="115" class="opt-box"/>
    <text x="250" y="162" class="opt-title">(4)</text>
    <line x1="275" y1="235" x2="410" y2="235" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="275" y1="235" x2="275" y2="165" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="420" y="235" class="label">T</text>
    <text x="275" y="155" class="label">n</text>
    <path d="M 275 235 Q 300 175 385 170" class="solid"/>
  </svg>`,

  // Q8: 4 subgraphs of V vs T (°C)
  kinetic_q8: `${SVG_HEADER(460, 280)}
    <!-- Box 1 -->
    <rect x="15" y="15" width="205" height="115" class="opt-box"/>
    <text x="30" y="32" class="opt-title">(1)</text>
    <line x1="60" y1="105" x2="190" y2="105" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="60" y1="105" x2="60" y2="35" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="200" y="105" class="label">T</text>
    <text x="60" y="25" class="label">V</text>
    <text x="48" y="112" class="tick-label">O</text>
    <line x1="60" y1="75" x2="160" y2="45" class="solid"/>

    <!-- Box 2 -->
    <rect x="235" y="15" width="205" height="115" class="opt-box"/>
    <text x="250" y="32" class="opt-title">(2)</text>
    <line x1="280" y1="105" x2="410" y2="105" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="280" y1="105" x2="280" y2="35" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="420" y="105" class="label">T</text>
    <text x="280" y="25" class="label">V</text>
    <text x="268" y="112" class="tick-label">O</text>
    <line x1="340" y1="105" x2="395" y2="55" class="solid"/>

    <!-- Box 3 -->
    <rect x="15" y="145" width="205" height="115" class="opt-box"/>
    <text x="30" y="162" class="opt-title">(3)</text>
    <line x1="60" y1="235" x2="190" y2="235" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="60" y1="235" x2="60" y2="165" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="200" y="235" class="label">T</text>
    <text x="60" y="155" class="label">V</text>
    <text x="48" y="242" class="tick-label">O</text>
    <line x1="60" y1="235" x2="165" y2="175" class="solid"/>

    <!-- Box 4 -->
    <rect x="235" y="145" width="205" height="115" class="opt-box"/>
    <text x="250" y="162" class="opt-title">(4)</text>
    <line x1="280" y1="235" x2="410" y2="235" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="280" y1="235" x2="280" y2="165" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="420" y="235" class="label">T</text>
    <text x="280" y="155" class="label">V</text>
    <text x="268" y="242" class="tick-label">O</text>
    <line x1="280" y1="190" x2="385" y2="190" class="solid"/>
  </svg>`,

  // Q12: Two connected bulbs A and B
  kinetic_q12: `${SVG_HEADER(360, 200)}
    <!-- Bulb A -->
    <circle cx="100" cy="100" r="45" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Bulb B -->
    <circle cx="260" cy="100" r="45" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Connecting tube -->
    <line x1="145" y1="94" x2="215" y2="94" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="145" y1="106" x2="215" y2="106" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Little gas particles / dots inside -->
    <circle cx="85" cy="85" r="1.5" fill="#64748b"/>
    <circle cx="115" cy="90" r="1.5" fill="#64748b"/>
    <circle cx="95" cy="115" r="1.5" fill="#64748b"/>
    <circle cx="110" cy="120" r="1.5" fill="#64748b"/>
    <circle cx="80" cy="105" r="1.5" fill="#64748b"/>
    
    <circle cx="245" cy="85" r="1.5" fill="#64748b"/>
    <circle cx="275" cy="90" r="1.5" fill="#64748b"/>
    <circle cx="255" cy="115" r="1.5" fill="#64748b"/>
    <circle cx="270" cy="120" r="1.5" fill="#64748b"/>
    <circle cx="240" cy="105" r="1.5" fill="#64748b"/>

    <text x="100" y="103" class="label" style="font-size: 20px; font-style: italic;">A</text>
    <text x="260" y="103" class="label" style="font-size: 20px; font-style: italic;">B</text>
  </svg>`,

  // Q17: P vs T process A -> B
  kinetic_q17: `${SVG_HEADER(340, 240)}
    <line x1="60" y1="190" x2="290" y2="190" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="60" y1="190" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="300" y="190" class="label">T</text>
    <text x="60" y="20" class="label">P</text>

    <!-- Line from origin through A to B -->
    <line x1="60" y1="190" x2="110" y2="140" class="dashed"/>
    <line x1="110" y1="140" x2="240" y2="60" class="solid" marker-end="url(#arrow)"/>

    <circle cx="110" cy="140" r="3.5" fill="#0f172a"/>
    <circle cx="240" cy="60" r="3.5" fill="#0f172a"/>

    <text x="100" y="125" class="label">A</text>
    <text x="250" y="50" class="label">B</text>
  </svg>`,

  // Q20: P vs rho straight lines T1 and T2
  kinetic_q20: `${SVG_HEADER(340, 240)}
    <line x1="60" y1="190" x2="290" y2="190" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="60" y1="190" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="300" y="190" class="label">ρ</text>
    <text x="60" y="20" class="label">P</text>

    <!-- Line T1 (steeper) -->
    <line x1="60" y1="190" x2="180" y2="60" class="solid"/>
    <text x="195" y="60" class="label">T₁</text>

    <!-- Line T2 (gentler) -->
    <line x1="60" y1="190" x2="250" y2="110" class="solid"/>
    <text x="265" y="110" class="label">T₂</text>
  </svg>`,

  // Q29: 4 subgraphs of mean KE (E) vs t (°C)
  kinetic_q29: `${SVG_HEADER(460, 280)}
    <!-- Box 1 -->
    <rect x="15" y="15" width="205" height="115" class="opt-box"/>
    <text x="30" y="32" class="opt-title">(1)</text>
    <line x1="60" y1="105" x2="190" y2="105" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="60" y1="105" x2="60" y2="35" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="200" y="105" class="label">t</text>
    <text x="60" y="25" class="label">E</text>
    <line x1="60" y1="75" x2="165" y2="40" class="solid"/>

    <!-- Box 2 -->
    <rect x="235" y="15" width="205" height="115" class="opt-box"/>
    <text x="250" y="32" class="opt-title">(2)</text>
    <line x1="280" y1="105" x2="410" y2="105" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="280" y1="105" x2="280" y2="35" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="420" y="105" class="label">t</text>
    <text x="280" y="25" class="label">E</text>
    <line x1="280" y1="105" x2="385" y2="45" class="solid"/>

    <!-- Box 3 -->
    <rect x="15" y="145" width="205" height="115" class="opt-box"/>
    <text x="30" y="162" class="opt-title">(3)</text>
    <line x1="60" y1="235" x2="190" y2="235" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="60" y1="235" x2="60" y2="165" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="200" y="235" class="label">t</text>
    <text x="60" y="155" class="label">E</text>
    <path d="M 60 235 Q 135 230 160 170" class="solid"/>

    <!-- Box 4 -->
    <rect x="235" y="145" width="205" height="115" class="opt-box"/>
    <text x="250" y="162" class="opt-title">(4)</text>
    <line x1="280" y1="235" x2="410" y2="235" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="280" y1="235" x2="280" y2="165" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="420" y="235" class="label">t</text>
    <text x="280" y="155" class="label">E</text>
    <path d="M 280 235 Q 305 175 390 170" class="solid"/>
  </svg>`,

  // Q63: Maxwell speed distribution curves A, B, C
  kinetic_q63: `${SVG_HEADER(380, 240)}
    <line x1="60" y1="190" x2="340" y2="190" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="60" y1="190" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="350" y="190" class="label">v</text>
    <text x="60" y="20" class="label">f(v)</text>

    <!-- Curve A (T_A, narrow and tall peak) -->
    <path d="M 60 190 Q 110 50 145 120 T 260 190" class="solid" style="stroke: #0f172a;"/>
    <text x="120" y="70" class="label">A</text>

    <!-- Curve B (T_B, medium height and width) -->
    <path d="M 60 190 Q 145 90 190 140 T 295 190" class="solid" style="stroke: #2563eb;"/>
    <text x="175" y="95" class="label" style="fill: #2563eb;">B</text>

    <!-- Curve C (T_C, broad and flat) -->
    <path d="M 60 190 Q 185 120 240 155 T 325 190" class="solid" style="stroke: #dc2626;"/>
    <text x="235" y="120" class="label" style="fill: #dc2626;">C</text>
  </svg>`,

  // Q70: P vs V isotherms T1 and T2 with isobaric line
  kinetic_q70: `${SVG_HEADER(360, 250)}
    <line x1="60" y1="200" x2="320" y2="200" class="axis" marker-end="url(#axis-arrow)"/>
    <line x1="60" y1="200" x2="60" y2="30" class="axis" marker-end="url(#axis-arrow)"/>
    <text x="330" y="200" class="label">V</text>
    <text x="60" y="20" class="label">P</text>
    <text x="48" y="208" class="tick-label">O</text>

    <!-- Isotherm T2 (lower) -->
    <path d="M 80 80 Q 115 160 240 180" class="solid"/>
    <text x="255" y="175" class="label">T₂</text>

    <!-- Isotherm T1 (higher) -->
    <path d="M 120 75 Q 165 130 280 150" class="solid"/>
    <text x="295" y="145" class="label">T₁</text>

    <!-- Dotted isobaric line at P = const (y = 100) -->
    <line x1="60" y1="100" x2="220" y2="100" class="dashed"/>

    <!-- Intersection with T2 at V = V0 (x = 95) -->
    <circle cx="95" cy="100" r="3.5" fill="#0f172a"/>
    <line x1="95" y1="100" x2="95" y2="200" class="dashed"/>
    <text x="95" y="215" class="tick-label">V₀</text>

    <!-- Intersection with T1 at V = 4V0 (x = 165) -->
    <circle cx="165" cy="100" r="3.5" fill="#0f172a"/>
    <line x1="165" y1="100" x2="165" y2="200" class="dashed"/>
    <text x="165" y="215" class="tick-label">4V₀</text>
  </svg>`
};

async function generateAll() {
  console.log(`Generating ${Object.keys(diagrams).length} Kinetic Theory diagrams...`);
  for (const [name, svgContent] of Object.entries(diagrams)) {
    const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();
    fs.writeFileSync(path.join(outDirBackend, `${name}.png`), pngBuffer);
    fs.writeFileSync(path.join(outDirFrontend, `${name}.png`), pngBuffer);
    console.log(`✓ Generated ${name}.png`);
  }
  console.log('All Kinetic Theory diagrams generated successfully!');
}

generateAll().catch(err => {
  console.error('Error generating diagrams:', err);
  process.exit(1);
});
