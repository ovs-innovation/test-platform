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

const outDirBackend = path.resolve(__dirname, '../uploads/thermal_properties');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/thermal_properties');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 480, h = 260) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #334155; text-anchor: middle; dominant-baseline: middle; }
    .dashed { stroke: #64748b; stroke-width: 1.5; stroke-dasharray: 4,4; }
    .solid { stroke: #0f172a; stroke-width: 2; }
    .highlight { stroke: #2563eb; stroke-width: 2.5; fill: none; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
    <pattern id="diagHatch1" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#0f172a" stroke-width="1.5" />
    </pattern>
    <pattern id="crossHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#0f172a" stroke-width="1.2" />
      <line x1="0" y1="0" x2="8" y2="0" stroke="#0f172a" stroke-width="1.2" />
    </pattern>
  </defs>
`;

const diagrams = {
  // Q1: Celsius vs Fahrenheit graph
  q1: `${SVG_HEADER(440, 260)}
    <!-- Axes -->
    <line x1="50" y1="200" x2="390" y2="200" class="axis" marker-end="url(#arrow)"/>
    <line x1="160" y1="240" x2="160" y2="30" class="axis" marker-end="url(#arrow)"/>
    <text x="395" y="200" class="label" text-anchor="start">°F</text>
    <text x="160" y="20" class="label">°C</text>
    <text x="145" y="215" class="sublabel">O</text>

    <!-- Line (1): C = 5/9(F - 32). Positive slope, negative C intercept, positive F intercept -->
    <line x1="100" y1="250" x2="350" y2="60" stroke="#2563eb" stroke-width="2.5"/>
    <circle cx="360" cy="55" r="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="360" y="55" font-size="14" font-weight="bold" fill="#2563eb" text-anchor="middle" dominant-baseline="middle">1</text>

    <!-- Line (2): Negative slope -->
    <line x1="80" y1="50" x2="320" y2="240" stroke="#64748b" stroke-width="2"/>
    <circle cx="330" cy="245" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
    <text x="330" y="245" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle" dominant-baseline="middle">2</text>

    <!-- Line (3): Vertical or other line -->
    <line x1="80" y1="120" x2="340" y2="120" stroke="#64748b" stroke-width="2"/>
    <circle cx="355" cy="120" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
    <text x="355" y="120" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle" dominant-baseline="middle">3</text>

    <!-- Line (4): Line through second and fourth quadrants -->
    <line x1="60" y1="190" x2="280" y2="50" stroke="#64748b" stroke-width="2"/>
    <circle cx="60" cy="180" r="14" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
    <text x="60" y="180" font-size="14" font-weight="bold" fill="#64748b" text-anchor="middle" dominant-baseline="middle">4</text>
  </svg>`,

  // Q4: Four rods X-junction
  q4: `${SVG_HEADER(400, 280)}
    <!-- Central junction -->
    <g transform="translate(200, 140)">
      <!-- Rod 1: to top-left 0°C -->
      <line x1="0" y1="0" x2="-100" y2="-90" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-100" cy="-90" r="6" fill="#0284c7"/>
      <text x="-120" y="-95" class="label">0°C</text>

      <!-- Rod 2: to top-right 30°C -->
      <line x1="0" y1="0" x2="100" y2="-90" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="-90" r="6" fill="#0284c7"/>
      <text x="125" y="-95" class="label">30°C</text>

      <!-- Rod 3: to bottom-left 90°C -->
      <line x1="0" y1="0" x2="-100" y2="90" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-100" cy="90" r="6" fill="#ef4444"/>
      <text x="-125" y="95" class="label">90°C</text>

      <!-- Rod 4: to bottom-right 60°C -->
      <line x1="0" y1="0" x2="100" y2="90" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="90" r="6" fill="#f59e0b"/>
      <text x="125" y="95" class="label">60°C</text>

      <!-- Junction center -->
      <circle cx="0" cy="0" r="9" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
      <text x="18" y="5" class="label" font-size="18">θ</text>
    </g>
  </svg>`,

  // Q7: Spectral emissive power for Lamp A and 4 options for Lamp B
  q7: `${SVG_HEADER(560, 260)}
    <!-- Main reference: Lamp A -->
    <g transform="translate(30, 20)">
      <text x="90" y="10" class="sublabel" font-weight="bold">Given (Lamp A):</text>
      <line x1="30" y1="180" x2="180" y2="180" class="axis" marker-end="url(#arrow)"/>
      <line x1="30" y1="180" x2="30" y2="30" class="axis" marker-end="url(#arrow)"/>
      <text x="190" y="180" class="sublabel">λ</text>
      <text x="25" y="20" class="sublabel">e_λ</text>
      <path d="M 30 180 Q 90 40, 160 170" fill="none" stroke="#0f172a" stroke-width="2.5"/>
      <text x="140" y="90" class="label">A</text>
    </g>

    <!-- Option (2) - Correct: B operates at higher temperature -> peak shifts left (lower λ), peak height is larger -->
    <g transform="translate(260, 20)">
      <text x="120" y="10" class="sublabel" font-weight="bold">Correct Option (2):</text>
      <line x1="30" y1="180" x2="230" y2="180" class="axis" marker-end="url(#arrow)"/>
      <line x1="30" y1="180" x2="30" y2="30" class="axis" marker-end="url(#arrow)"/>
      <text x="240" y="180" class="sublabel">λ</text>
      <text x="25" y="20" class="sublabel">e_λ</text>
      <!-- Curve A -->
      <path d="M 30 180 Q 120 70, 210 175" fill="none" stroke="#64748b" stroke-width="2"/>
      <text x="180" y="110" class="sublabel" fill="#64748b">A</text>
      <!-- Curve B: higher peak, shifted left -->
      <path d="M 30 180 Q 90 30, 200 170" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="90" y="25" class="label" fill="#2563eb">B</text>
      <text x="120" y="220" class="label">(Peak of B is higher &amp; shifted to lower λ)</text>
    </g>
  </svg>`,

  // Q11: Compound slab of thickness x and 2x, conductivities K and 4K
  q11: `${SVG_HEADER(460, 220)}
    <!-- Left Slab: K, width 100 -->
    <rect x="100" y="50" width="100" height="110" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
    <text x="150" y="95" class="label" font-size="18">K</text>
    <!-- Dimension x -->
    <line x1="100" y1="180" x2="200" y2="180" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="150" y="200" class="sublabel">x</text>

    <!-- Right Slab: 4K, width 200 -->
    <rect x="200" y="50" width="180" height="110" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
    <text x="290" y="95" class="label" font-size="18">4K</text>
    <!-- Dimension 2x -->
    <line x1="200" y1="180" x2="380" y2="180" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="290" y="200" class="sublabel">2x</text>

    <!-- Boundary temperatures -->
    <text x="80" y="105" class="label" font-size="18">θ₁</text>
    <text x="405" y="105" class="label" font-size="18">θ₂</text>
    <line x1="200" y1="45" x2="200" y2="165" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3"/>
  </svg>`,

  // Q12: Liquid cooling in beaker θ vs Time
  q12: `${SVG_HEADER(480, 230)}
    <!-- Correct Option (1): θ decays exponentially towards θ_s -->
    <g transform="translate(60, 20)">
      <line x1="40" y1="160" x2="240" y2="160" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="160" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="250" y="160" class="sublabel">Time (t)</text>
      <text x="35" y="15" class="sublabel">θ</text>
      <!-- Initial θ_0 -->
      <text x="25" y="45" class="sublabel">θ₀</text>
      <!-- Asymptote θ_s -->
      <line x1="40" y1="120" x2="230" y2="120" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="25" y="120" class="sublabel" fill="#ef4444">θ_s</text>
      <!-- Exponential curve -->
      <path d="M 40 45 Q 90 120, 230 120" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="140" y="195" class="label">Option (1): Exponential decay towards θ_s</text>
    </g>
  </svg>`,

  // Q20: Cooling curves for bodies A and B (SA > SB)
  q20: `${SVG_HEADER(460, 230)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="160" x2="280" y2="160" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="160" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="290" y="160" class="sublabel">t</text>
      <text x="35" y="15" class="sublabel">θ</text>
      <!-- Initial temperature -->
      <circle cx="40" cy="40" r="4" fill="#0f172a"/>
      <!-- Curve A: cools slower (larger SA) -->
      <path d="M 40 40 Q 140 90, 260 120" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="270" y="115" class="label" fill="#2563eb">A</text>
      <!-- Curve B: cools faster (smaller SB) -->
      <path d="M 40 40 Q 100 110, 260 145" fill="none" stroke="#ef4444" stroke-width="2.5"/>
      <text x="270" y="145" class="label" fill="#ef4444">B</text>
      <text x="160" y="195" class="label">Option (1): B cools faster than A</text>
    </g>
  </svg>`,

  // Q24: Two metallic rods of equal length and cross section welded in series
  q24: `${SVG_HEADER(480, 200)}
    <g transform="translate(70, 40)">
      <!-- Rod 1: k1 with diagonal hatch -->
      <rect x="50" y="30" width="120" height="60" fill="url(#diagHatch1)" stroke="#0f172a" stroke-width="2.5"/>
      <!-- Rod 2: k2 with cross hatch -->
      <rect x="170" y="30" width="120" height="60" fill="url(#crossHatch)" stroke="#0f172a" stroke-width="2.5"/>

      <!-- Arrows and labels for conductivities -->
      <line x1="60" y1="15" x2="160" y2="15" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="110" y="5" class="label">k₁</text>

      <line x1="180" y1="15" x2="280" y2="15" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="230" y="5" class="label">k₂</text>

      <text x="170" y="125" class="sublabel">Welded in series (equal length L and area A)</text>
    </g>
  </svg>`,

  // Q29: Three rods joined at junction: left end at 0°C, right two ends at 90°C and 90°C
  q29: `${SVG_HEADER(460, 240)}
    <g transform="translate(180, 120)">
      <!-- Left rod: horizontal to 0°C -->
      <line x1="0" y1="0" x2="-120" y2="0" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-120" cy="0" r="7" fill="#0284c7"/>
      <text x="-155" y="0" class="label">0°C</text>

      <!-- Right top rod: to 90°C -->
      <line x1="0" y1="0" x2="110" y2="-65" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="110" cy="-65" r="7" fill="#ef4444"/>
      <text x="145" y="-65" class="label">90°C</text>

      <!-- Right bottom rod: to 90°C -->
      <line x1="0" y1="0" x2="110" y2="65" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="110" cy="65" r="7" fill="#ef4444"/>
      <text x="145" y="65" class="label">90°C</text>

      <!-- Junction -->
      <circle cx="0" cy="0" r="8" fill="#2563eb"/>
      <text x="15" y="-10" class="label">Junction</text>
    </g>
  </svg>`,

  // Q33: ln(T - T0) vs t for bodies A and B
  q33: `${SVG_HEADER(440, 240)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="180" x2="300" y2="180" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="180" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="310" y="180" class="sublabel">t</text>
      <text x="35" y="15" class="sublabel">ln(T - T₀)</text>

      <!-- Line A: steeper slope -->
      <line x1="40" y1="40" x2="220" y2="175" stroke="#2563eb" stroke-width="2.5"/>
      <text x="235" y="170" class="label" fill="#2563eb">A</text>

      <!-- Line B: less steep slope -->
      <line x1="40" y1="40" x2="270" y2="150" stroke="#ef4444" stroke-width="2.5"/>
      <text x="285" y="145" class="label" fill="#ef4444">B</text>

      <circle cx="40" cy="40" r="4" fill="#0f172a"/>
    </g>
  </svg>`,

  // Q39: Three rods identical dimensions: 60°C (K), 40°C (3K), 20°C (2K)
  q39: `${SVG_HEADER(460, 250)}
    <g transform="translate(190, 130)">
      <!-- Left rod: K at 60°C -->
      <line x1="0" y1="0" x2="-110" y2="-50" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-110" cy="-50" r="6" fill="#f59e0b"/>
      <text x="-140" y="-50" class="label">60°C</text>
      <text x="-65" y="-45" class="label" font-size="16">K</text>

      <!-- Top-right rod: 3K at 40°C -->
      <line x1="0" y1="0" x2="110" y2="-50" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="110" cy="-50" r="6" fill="#10b981"/>
      <text x="145" y="-50" class="label">40°C</text>
      <text x="65" y="-45" class="label" font-size="16">3K</text>

      <!-- Bottom-right rod: 2K at 20°C -->
      <line x1="0" y1="0" x2="100" y2="60" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="60" r="6" fill="#0284c7"/>
      <text x="135" y="60" class="label">20°C</text>
      <text x="60" y="45" class="label" font-size="16">2K</text>

      <!-- Junction -->
      <circle cx="0" cy="0" r="8" fill="#2563eb"/>
      <text x="15" y="15" class="label">θ</text>
    </g>
  </svg>`,

  // Q41: T vs t cooling curves for bodies X and Y
  q41: `${SVG_HEADER(440, 230)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="170" x2="280" y2="170" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="170" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="290" y="170" class="sublabel">t</text>
      <text x="35" y="15" class="sublabel">T</text>

      <!-- Curve X: cools slower -->
      <path d="M 40 40 Q 140 80, 240 115" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="250" y="115" class="label" fill="#2563eb">X</text>

      <!-- Curve Y: cools faster (larger emissivity e_Y > e_X) -->
      <path d="M 40 40 Q 100 110, 230 155" fill="none" stroke="#ef4444" stroke-width="2.5"/>
      <text x="240" y="155" class="label" fill="#ef4444">Y</text>
    </g>
  </svg>`,

  // Q44: Circular ring with small gap x, thickness d, radius r
  q44: `${SVG_HEADER(400, 240)}
    <g transform="translate(200, 120)">
      <!-- Circular ring with gap at top -->
      <!-- Outer circle arc -->
      <path d="M -25 -75 A 80 80 0 1 0 25 -75" fill="none" stroke="#0f172a" stroke-width="14" stroke-linecap="round"/>
      <!-- Gap x -->
      <line x1="-25" y1="-95" x2="25" y2="-95" stroke="#ef4444" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="0" y="-105" class="label" fill="#ef4444">x</text>

      <!-- Thickness d -->
      <line x1="60" y1="35" x2="74" y2="43" stroke="#2563eb" stroke-width="2"/>
      <text x="88" y="45" class="sublabel" fill="#2563eb">d</text>

      <!-- Radius r -->
      <line x1="0" y1="0" x2="0" y2="73" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
      <text x="-15" y="40" class="sublabel">r</text>
      <circle cx="0" cy="0" r="3" fill="#0f172a"/>
    </g>
  </svg>`,

  // Q46: Composite rod K/4 (length 2L) and 2K (length L)
  q46: `${SVG_HEADER(500, 200)}
    <g transform="translate(60, 40)">
      <!-- Left part: K/4, length 2L -->
      <rect x="50" y="30" width="180" height="60" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5"/>
      <text x="140" y="60" class="label">K/4</text>
      <line x1="50" y1="105" x2="230" y2="105" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="140" y="125" class="sublabel">2L</text>

      <!-- Right part: 2K, length L -->
      <rect x="230" y="30" width="100" height="60" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.5"/>
      <text x="280" y="60" class="label">2K</text>
      <line x1="230" y1="105" x2="330" y2="105" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="280" y="125" class="sublabel">L</text>

      <!-- Temperatures -->
      <text x="30" y="60" class="label">T₁</text>
      <text x="350" y="60" class="label">T₂</text>
      <text x="230" y="18" class="label" fill="#ef4444">T</text>
    </g>
  </svg>`,

  // Q48: ln(T - T0) vs t options
  q48: `${SVG_HEADER(440, 230)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="170" x2="280" y2="170" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="170" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="290" y="170" class="sublabel">t</text>
      <text x="35" y="15" class="sublabel">ln(T - T₀)</text>
      <!-- Option (1): Straight line with negative slope -->
      <line x1="40" y1="40" x2="250" y2="160" stroke="#2563eb" stroke-width="2.5"/>
      <text x="160" y="200" class="label">Option (1): Straight line with negative slope</text>
    </g>
  </svg>`,

  // Q50: Spectral emissive power curve showing area A
  q50: `${SVG_HEADER(440, 240)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="180" x2="300" y2="180" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="180" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="310" y="180" class="sublabel">λ</text>
      <text x="35" y="15" class="sublabel">E_λ</text>
      <!-- Shaded curve -->
      <path d="M 40 180 Q 110 30, 280 180 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>
      <text x="130" y="120" class="label" font-size="20" fill="#1e40af">Area = A</text>
      <text x="190" y="50" class="sublabel">at temperature T₀</text>
    </g>
  </svg>`,

  // Q53: Three rods in Y-shape: 100°C (K), 60°C (3K), 20°C (2K)
  q53: `${SVG_HEADER(460, 250)}
    <g transform="translate(190, 130)">
      <!-- Left rod: K at 100°C -->
      <line x1="0" y1="0" x2="-110" y2="0" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-110" cy="0" r="6" fill="#ef4444"/>
      <text x="-150" y="0" class="label">100°C</text>
      <text x="-55" y="-15" class="label">K</text>

      <!-- Top-right rod: 3K at 60°C -->
      <line x1="0" y1="0" x2="100" y2="-60" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="-60" r="6" fill="#f59e0b"/>
      <text x="135" y="-60" class="label">60°C</text>
      <text x="60" y="-45" class="label">3K</text>

      <!-- Bottom-right rod: 2K at 20°C -->
      <line x1="0" y1="0" x2="100" y2="60" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="60" r="6" fill="#0284c7"/>
      <text x="135" y="60" class="label">20°C</text>
      <text x="60" y="45" class="label">2K</text>

      <!-- Junction -->
      <circle cx="0" cy="0" r="8" fill="#2563eb"/>
      <text x="15" y="-10" class="label">θ</text>
    </g>
  </svg>`,

  // Q55: Black body radiation curves at T1 = 300K and T2 = 600K showing shaded area
  q55: `${SVG_HEADER(480, 250)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="190" x2="340" y2="190" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="190" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="350" y="190" class="sublabel">λ</text>
      <text x="35" y="15" class="sublabel">e_λ</text>

      <!-- Curve T2 (600 K) -->
      <path id="curveT2" d="M 40 190 Q 90 20, 280 185 L 280 190 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2.5"/>
      <!-- Curve T1 (300 K) overlaid to show shaded portion between them -->
      <path id="curveT1" d="M 40 190 Q 150 120, 310 188 L 310 190 Z" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>

      <text x="110" y="45" class="label" fill="#ea580c">T₂ = 327°C</text>
      <text x="180" y="130" class="label" fill="#2563eb">T₁ = 27°C (Power P)</text>
      <text x="130" y="90" class="sublabel" font-weight="bold" fill="#c2410c">Shaded Area = 15P</text>
    </g>
  </svg>`,

  // Q56: Composite slab of lengths 2L (K) and L (3K)
  q56: `${SVG_HEADER(480, 210)}
    <g transform="translate(70, 30)">
      <!-- Left slab: 2L, K -->
      <rect x="40" y="40" width="180" height="70" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5"/>
      <text x="130" y="75" class="label" font-size="18">K</text>
      <line x1="40" y1="125" x2="220" y2="125" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="130" y="145" class="sublabel">2L</text>

      <!-- Right slab: L, 3K -->
      <rect x="220" y="40" width="90" height="70" fill="#cbd5e1" stroke="#0f172a" stroke-width="2.5"/>
      <text x="265" y="75" class="label" font-size="18">3K</text>
      <line x1="220" y1="125" x2="310" y2="125" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="265" y="145" class="sublabel">L</text>
    </g>
  </svg>`,

  // Q57: Composite wall of two walls A and B of equal area and thickness (3:2 conductivity ratio)
  q57: `${SVG_HEADER(460, 220)}
    <g transform="translate(70, 30)">
      <!-- Wall A -->
      <rect x="60" y="30" width="100" height="100" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <text x="110" y="80" class="label" font-size="18">A (3K)</text>
      <text x="35" y="80" class="label">40°C</text>

      <!-- Wall B -->
      <rect x="160" y="30" width="100" height="100" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <text x="210" y="80" class="label" font-size="18">B (2K)</text>
      <text x="285" y="80" class="label">20°C</text>

      <!-- Interface -->
      <line x1="160" y1="20" x2="160" y2="140" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
      <text x="160" y="155" class="label" fill="#ef4444">θ = ?</text>
    </g>
  </svg>`,

  // Q59: Cylindrical measuring jar containing mercury
  q59: `${SVG_HEADER(380, 260)}
    <g transform="translate(140, 20)">
      <!-- Jar body -->
      <rect x="0" y="20" width="80" height="180" rx="4" fill="none" stroke="#0f172a" stroke-width="2.5"/>
      <!-- Liquid (Mercury) -->
      <rect x="2" y="90" width="76" height="108" fill="#94a3b8" stroke="none"/>
      <!-- Meniscus curve -->
      <path d="M 2 90 Q 40 85, 78 90" fill="#94a3b8" stroke="#0f172a" stroke-width="1.5"/>

      <!-- Graduation ticks on left -->
      <line x1="0" y1="50" x2="12" y2="50" stroke="#0f172a" stroke-width="1.5"/>
      <line x1="0" y1="70" x2="12" y2="70" stroke="#0f172a" stroke-width="1.5"/>
      <line x1="0" y1="90" x2="18" y2="90" stroke="#ef4444" stroke-width="2"/>
      <text x="-15" y="90" class="label" fill="#ef4444">y</text>
      <line x1="0" y1="110" x2="12" y2="110" stroke="#0f172a" stroke-width="1.5"/>
      <line x1="0" y1="130" x2="12" y2="130" stroke="#0f172a" stroke-width="1.5"/>
      <line x1="0" y1="150" x2="12" y2="150" stroke="#0f172a" stroke-width="1.5"/>

      <!-- Base -->
      <rect x="-20" y="200" width="120" height="12" rx="3" fill="#334155"/>
      <text x="40" y="235" class="sublabel">Reading level y</text>
    </g>
  </svg>`,

  // Q62: Spectral intensity vs wavelength for black body at 7°C
  q62: `${SVG_HEADER(440, 230)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="170" x2="280" y2="170" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="170" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="290" y="170" class="sublabel">wavelength</text>
      <text x="35" y="15" class="sublabel">Spectral Intensity</text>

      <path d="M 40 170 Q 110 40, 260 170 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>
      <text x="130" y="105" class="label" font-size="18" fill="#1e40af">Area = A</text>
      <text x="140" y="50" class="label">7°C (280 K)</text>
    </g>
  </svg>`,

  // Q63: Thermal conductor with decreasing conductivity from A to B
  q63: `${SVG_HEADER(460, 200)}
    <g transform="translate(70, 30)">
      <!-- Conductor bar -->
      <rect x="40" y="40" width="240" height="60" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
      <text x="20" y="70" class="label" font-size="18">A</text>
      <text x="300" y="70" class="label" font-size="18">B</text>

      <text x="40" y="25" class="sublabel">T₁ (Higher Temp)</text>
      <text x="280" y="25" class="sublabel">T₂</text>

      <!-- Arrow indicating decreasing K -->
      <line x1="60" y1="125" x2="260" y2="125" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="160" y="145" class="sublabel" fill="#ef4444">Thermal conductivity K decreases from A to B</text>

      <line x1="160" y1="40" x2="160" y2="100" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="160" y="70" class="sublabel" fill="#2563eb">Mid-point</text>
    </g>
  </svg>`,

  // Q70: Newton's law cooling graph options
  q70: `${SVG_HEADER(480, 240)}
    <g transform="translate(40, 20)">
      <line x1="30" y1="170" x2="180" y2="170" class="axis" marker-end="url(#arrow)"/>
      <line x1="30" y1="170" x2="30" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="190" y="170" class="sublabel">t</text>
      <text x="25" y="15" class="sublabel">ln θ</text>
      <!-- Option (4): Straight line with negative slope -->
      <line x1="30" y1="40" x2="170" y2="160" stroke="#2563eb" stroke-width="2.5"/>
      <circle cx="30" cy="40" r="4" fill="#2563eb"/>
      <text x="110" y="200" class="label">Correct Option (4): ln θ vs t is linear</text>
    </g>
  </svg>`,

  // Q72: Liquid oxygen heated from 60 K to 300 K
  q72: `${SVG_HEADER(480, 240)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="180" x2="320" y2="180" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="180" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="330" y="180" class="sublabel">Time</text>
      <text x="35" y="15" class="sublabel">Temp (K)</text>

      <!-- Starts at 60 K -->
      <circle cx="40" cy="140" r="4" fill="#0f172a"/>
      <text x="20" y="140" class="sublabel">60 K</text>

      <!-- Stage 1: Liquid heating to 90 K -->
      <line x1="40" y1="140" x2="110" y2="90" stroke="#2563eb" stroke-width="2.5"/>

      <!-- Stage 2: Boiling plateau at 90 K -->
      <line x1="110" y1="90" x2="190" y2="90" stroke="#ef4444" stroke-width="3"/>
      <text x="150" y="75" class="sublabel" fill="#ef4444">Boiling (90 K)</text>

      <!-- Stage 3: Gas heating to 300 K -->
      <line x1="190" y1="90" x2="300" y2="30" stroke="#2563eb" stroke-width="2.5"/>
      <text x="300" y="20" class="sublabel">300 K</text>

      <text x="180" y="210" class="label">Option (3): Linear rise, boiling plateau, linear rise</text>
    </g>
  </svg>`,

  // Q77: Three rods 3K, 2K and K arranged at 100°C, 50°C and 20°C
  q77: `${SVG_HEADER(460, 250)}
    <g transform="translate(190, 130)">
      <!-- Left rod: 3K at 100°C -->
      <line x1="0" y1="0" x2="-110" y2="0" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-110" cy="0" r="6" fill="#ef4444"/>
      <text x="-150" y="0" class="label">100°C</text>
      <text x="-55" y="-15" class="label">3K</text>

      <!-- Top-right rod: 2K at 50°C -->
      <line x1="0" y1="0" x2="110" y2="-55" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="110" cy="-55" r="6" fill="#f59e0b"/>
      <text x="145" y="-55" class="label">50°C</text>
      <text x="65" y="-40" class="label">2K</text>

      <!-- Bottom-right rod: K at 20°C -->
      <line x1="0" y1="0" x2="110" y2="55" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="110" cy="55" r="6" fill="#0284c7"/>
      <text x="145" y="55" class="label">20°C</text>
      <text x="65" y="40" class="label">K</text>

      <!-- Junction -->
      <circle cx="0" cy="0" r="8" fill="#2563eb"/>
      <text x="15" y="-10" class="label">θ</text>
    </g>
  </svg>`,

  // Q80: Ratio of T1 and T2 from spectral emissive curves
  q80: `${SVG_HEADER(460, 250)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="180" x2="320" y2="180" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="180" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="330" y="180" class="sublabel">λ</text>
      <text x="35" y="15" class="sublabel">E_λ</text>

      <!-- Curve T1 (peak at λ_q) -->
      <path d="M 40 180 Q 120 20, 300 175" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="120" y1="40" x2="120" y2="180" class="dashed"/>
      <text x="120" y="195" class="label">λ_q</text>
      <text x="260" y="90" class="label" fill="#2563eb">T₁</text>

      <!-- Curve T2 (peak at 1.5 λ_q) -->
      <path d="M 40 180 Q 180 70, 300 178" fill="none" stroke="#ea580c" stroke-width="2"/>
      <line x1="180" y1="80" x2="180" y2="180" class="dashed"/>
      <text x="180" y="195" class="label">1.5λ_q</text>
      <text x="260" y="135" class="label" fill="#ea580c">T₂</text>
    </g>
  </svg>`,

  // Q84: Three identical rods joined at junction O: 130°C, 20°C, 0°C
  q84: `${SVG_HEADER(460, 240)}
    <g transform="translate(190, 120)">
      <!-- Left rod: at 130°C -->
      <line x1="0" y1="0" x2="-110" y2="0" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="-110" cy="0" r="6" fill="#ef4444"/>
      <text x="-150" y="0" class="label">130°C</text>

      <!-- Top-right rod: at 0°C -->
      <line x1="0" y1="0" x2="100" y2="-55" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="-55" r="6" fill="#0284c7"/>
      <text x="130" y="-55" class="label">0°C</text>

      <!-- Bottom-right rod: at 20°C -->
      <line x1="0" y1="0" x2="100" y2="55" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
      <circle cx="100" cy="55" r="6" fill="#38bdf8"/>
      <text x="135" y="55" class="label">20°C</text>

      <!-- Junction O -->
      <circle cx="0" cy="0" r="8" fill="#2563eb"/>
      <text x="15" y="-10" class="label">O</text>
    </g>
  </svg>`
};

async function generateAndUpload() {
  console.log('Generating Thermal Properties diagrams...');
  const results = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const filename = `thermal_${key}.png`;
    const backendPath = path.join(outDirBackend, filename);
    const frontendPath = path.join(outDirFrontend, filename);

    const pngBuffer = await sharp(Buffer.from(svg))
      .png({ quality: 100 })
      .toBuffer();

    fs.writeFileSync(backendPath, pngBuffer);
    fs.writeFileSync(frontendPath, pngBuffer);
    console.log(`Saved locally: ${filename}`);

    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum_thermal',
        public_id: `thermal_${key}`,
        overwrite: true,
        resource_type: 'image'
      });
      results[key] = uploadRes.secure_url;
      console.log(`Uploaded to Cloudinary: ${key} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.warn(`Failed to upload ${key} to Cloudinary, falling back to local:`, err.message);
      results[key] = `/uploads/thermal_properties/${filename}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'thermal_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`Saved thermal diagrams map to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
