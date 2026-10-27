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
    .curve { stroke: #2563eb; stroke-width: 2.5; fill: none; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
    <pattern id="diagHatch1" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#0f172a" stroke-width="1.5" />
    </pattern>
    <pattern id="horizHatch" width="8" height="8" patternUnits="userSpaceOnUse">
      <line x1="0" y1="4" x2="8" y2="4" stroke="#0f172a" stroke-width="1.5" />
    </pattern>
    <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="1.5" fill="#0f172a" />
    </pattern>
  </defs>
`;

const diagrams = {
  // Q104: Compound slab (Top: k, 2k; Bottom: 2k)
  q104: `${SVG_HEADER(480, 240)}
    <g transform="translate(100, 30)">
      <!-- Top Left: k (x, d) -->
      <rect x="0" y="0" width="120" height="60" fill="url(#diagHatch1)" stroke="#0f172a" stroke-width="2"/>
      <text x="60" y="30" class="label" font-size="18">k</text>

      <!-- Top Right: 2k (x, d) -->
      <rect x="120" y="0" width="120" height="60" fill="url(#horizHatch)" stroke="#0f172a" stroke-width="2"/>
      <text x="180" y="30" class="label" font-size="18">2k</text>

      <!-- Bottom: 2k (2x, d) -->
      <rect x="0" y="60" width="240" height="60" fill="url(#dots)" stroke="#0f172a" stroke-width="2"/>
      <text x="120" y="90" class="label" font-size="18">2k</text>

      <!-- Dimensions -->
      <!-- Length x, x -->
      <line x1="0" y1="-15" x2="120" y2="-15" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="60" y="-30" class="sublabel">x</text>
      <line x1="120" y1="-15" x2="240" y2="-15" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="180" y="-30" class="sublabel">x</text>

      <!-- Heights d, d -->
      <line x1="-20" y1="0" x2="-20" y2="60" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="-35" y="30" class="sublabel">d</text>
      <line x1="-20" y1="60" x2="-20" y2="120" class="dashed" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="-35" y="90" class="sublabel">d</text>

      <!-- Boundary Temperatures -->
      <text x="-70" y="30" class="label" fill="#ef4444">θ₁°C</text>
      <text x="285" y="60" class="label" fill="#0284c7">θ₂°C (θ₁ > θ₂)</text>
    </g>
  </svg>`,

  // Q106: Heat and Temperature graph of a substance
  q106: `${SVG_HEADER(500, 260)}
    <g transform="translate(60, 20)">
      <!-- Axes -->
      <line x1="40" y1="200" x2="380" y2="200" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="200" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="400" y="200" class="sublabel">Heat</text>
      <text x="35" y="15" class="sublabel">temperature</text>

      <!-- Temperature marks -->
      <text x="25" y="200" class="sublabel">O</text>
      <text x="25" y="130" class="sublabel">θ</text>
      <text x="20" y="50" class="sublabel">2θ</text>
      <line x1="40" y1="130" x2="160" y2="130" class="dashed"/>
      <line x1="40" y1="50" x2="270" y2="50" class="dashed"/>

      <!-- Heat axis marks: H, 2H, 2.5H, 3.5H -->
      <text x="100" y="215" class="sublabel">H</text>
      <text x="160" y="215" class="sublabel">2H</text>
      <text x="200" y="215" class="sublabel">2.5H</text>
      <text x="270" y="215" class="sublabel">3.5H</text>

      <!-- Solid heating line: (40,200) to (100,130) -->
      <line x1="40" y1="200" x2="100" y2="130" stroke="#0f172a" stroke-width="2.5"/>
      <text x="60" y="160" class="label" transform="rotate(-40, 60, 160)">Solid</text>

      <!-- Melting plateau: (100,130) to (160,130) -->
      <line x1="100" y1="130" x2="160" y2="130" stroke="#0f172a" stroke-width="2.5"/>

      <!-- Liquid heating line: (160,130) to (200,50) -->
      <line x1="160" y1="130" x2="200" y2="50" stroke="#0f172a" stroke-width="2.5"/>
      <text x="185" y="85" class="label" transform="rotate(-60, 185, 85)">liquid</text>

      <!-- Vaporisation plateau: (200,50) to (270,50) -->
      <line x1="200" y1="50" x2="270" y2="50" stroke="#0f172a" stroke-width="2.5"/>

      <!-- Drop lines to x axis -->
      <line x1="100" y1="130" x2="100" y2="200" class="dashed"/>
      <line x1="160" y1="130" x2="160" y2="200" class="dashed"/>
      <line x1="200" y1="50" x2="200" y2="200" class="dashed"/>
      <line x1="270" y1="50" x2="270" y2="200" class="dashed"/>
    </g>
  </svg>`,

  // Q110: Conductor of variable cross-section
  q110: `${SVG_HEADER(480, 220)}
    <g transform="translate(60, 30)">
      <!-- Left end (radius r) -->
      <ellipse cx="60" cy="80" rx="10" ry="30" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <text x="25" y="80" class="label">θ₁</text>
      <text x="60" y="125" class="sublabel">x = 0</text>
      <text x="80" y="70" class="sublabel">r</text>

      <!-- Middle expanded section (radius 2r) -->
      <path d="M 60 50 Q 180 15, 300 50 L 300 110 Q 180 145, 60 110 Z" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
      <line x1="180" y1="20" x2="180" y2="140" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="195" y="75" class="label">2r</text>

      <!-- Right end (radius r) -->
      <ellipse cx="300" cy="80" rx="10" ry="30" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <text x="335" y="80" class="label">θ₂</text>
      <text x="300" y="125" class="sublabel">x = L</text>
      <text x="280" y="70" class="sublabel">r</text>

      <text x="180" y="175" class="label">In steady state: Rate of heat flow H is constant along x!</text>
    </g>
  </svg>`,

  // Q113: Spectral emissive power curves 1 and 2
  q113: `${SVG_HEADER(460, 240)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="180" x2="320" y2="180" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="180" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="330" y="180" class="sublabel">λ</text>
      <text x="35" y="15" class="sublabel">E_λ</text>

      <!-- Curve 1 (Area A, T1 = 1000 K) -->
      <path d="M 40 180 Q 150 120, 290 178" fill="none" stroke="#2563eb" stroke-width="2"/>
      <text x="250" y="135" class="label" fill="#2563eb">1 (Area A)</text>

      <!-- Curve 2 (Area 81A, T2) -->
      <path d="M 40 180 Q 100 20, 280 175" fill="none" stroke="#ea580c" stroke-width="2.5"/>
      <text x="120" y="40" class="label" fill="#ea580c">2 (Area 81A)</text>

      <text x="180" y="210" class="label">A₂/A₁ = 81 ⇒ (T₂/T₁)⁴ = 81 ⇒ T₂ = 3000 K</text>
    </g>
  </svg>`,

  // Q116: Three rods A, B, C forming T-junction
  q116: `${SVG_HEADER(440, 260)}
    <g transform="translate(200, 130)">
      <!-- Rod A: left horizontal (length 1, resistance R, 30°C) -->
      <rect x="-120" y="-12" width="120" height="24" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
      <text x="-60" y="0" class="label">A</text>
      <text x="-155" y="0" class="label" fill="#0284c7">30°C</text>

      <!-- Rod B: top vertical (length 2, resistance 2R, 80°C) -->
      <rect x="-12" y="-110" width="24" height="110" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <text x="20" y="-55" class="label">B</text>
      <text x="0" y="-125" class="label" fill="#ef4444">80°C</text>

      <!-- Rod C: bottom vertical (length 2, resistance 2R, 80°C) -->
      <rect x="-12" y="0" width="24" height="110" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <text x="20" y="55" class="label">C</text>
      <text x="0" y="125" class="label" fill="#ef4444">80°C</text>

      <!-- Junction -->
      <circle cx="0" cy="0" r="14" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
      <text x="0" y="0" class="label" fill="#ffffff" font-size="12">θ</text>
    </g>
  </svg>`,

  // Q126: Eleven identical conducting rods network
  q126: `${SVG_HEADER(520, 220)}
    <g transform="translate(40, 110)">
      <!-- Point A to B -->
      <line x1="0" y1="0" x2="60" y2="0" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="5" fill="#ef4444"/>
      <text x="0" y="-20" class="label">100°C (A)</text>
      <text x="60" y="18" class="label">B</text>

      <!-- First diamond: B to C -->
      <!-- Top branch -->
      <line x1="60" y1="0" x2="110" y2="-45" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <line x1="110" y1="-45" x2="160" y2="0" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <!-- Bottom branch -->
      <line x1="60" y1="0" x2="110" y2="45" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <line x1="110" y1="45" x2="160" y2="0" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <text x="160" y="18" class="label">C</text>

      <!-- C to D -->
      <line x1="160" y1="0" x2="240" y2="0" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <text x="240" y="18" class="label">D</text>

      <!-- Second diamond: D to E -->
      <!-- Top branch -->
      <line x1="240" y1="0" x2="290" y2="-45" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <line x1="290" y1="-45" x2="340" y2="0" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <!-- Bottom branch -->
      <line x1="240" y1="0" x2="290" y2="45" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <line x1="290" y1="45" x2="340" y2="0" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <text x="340" y="18" class="label">E</text>

      <!-- E to F -->
      <line x1="340" y1="0" x2="400" y2="0" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="400" cy="0" r="5" fill="#0284c7"/>
      <text x="400" y="-20" class="label">0°C (F)</text>
    </g>
  </svg>`,

  // Q127: Blackbody curves at T1 and T2 showing A1 and A2
  q127: `${SVG_HEADER(500, 240)}
    <!-- Curve T1 -->
    <g transform="translate(30, 20)">
      <line x1="30" y1="170" x2="190" y2="170" class="axis" marker-end="url(#arrow)"/>
      <line x1="30" y1="170" x2="30" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="200" y="170" class="sublabel">λ</text>
      <text x="25" y="15" class="sublabel">e_λ</text>
      <path d="M 30 170 Q 90 40, 180 165 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="90" y1="45" x2="90" y2="170" class="dashed"/>
      <text x="90" y="185" class="sublabel">λ₀</text>
      <text x="135" y="60" class="label" fill="#1e40af">A₁ (T₁)</text>
    </g>

    <!-- Curve T2 -->
    <g transform="translate(260, 20)">
      <line x1="30" y1="170" x2="190" y2="170" class="axis" marker-end="url(#arrow)"/>
      <line x1="30" y1="170" x2="30" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="200" y="170" class="sublabel">λ</text>
      <text x="25" y="15" class="sublabel">e_λ</text>
      <path d="M 30 170 Q 120 70, 185 168 Z" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
      <line x1="120" y1="80" x2="120" y2="170" class="dashed"/>
      <text x="120" y="185" class="sublabel">3λ₀/2</text>
      <text x="145" y="60" class="label" fill="#b91c1c">A₂ (T₂)</text>
    </g>
  </svg>`,

  // Q129: Brass-Steel bimetallic strip on cooling
  q129: `${SVG_HEADER(480, 250)}
    <!-- Original vertical strip -->
    <g transform="translate(60, 30)">
      <text x="40" y="0" class="sublabel" font-weight="bold">Initial (Room Temp):</text>
      <!-- Brass on left -->
      <rect x="20" y="20" width="20" height="120" fill="#fef08a" stroke="#0f172a" stroke-width="2"/>
      <text x="10" y="80" class="sublabel" text-anchor="end">Brass</text>
      <!-- Steel on right -->
      <rect x="40" y="20" width="20" height="120" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <text x="70" y="80" class="sublabel" text-anchor="start">Steel</text>
    </g>

    <!-- Correct shape on cooling: Option (3) bends toward Brass (left concave) -->
    <g transform="translate(260, 30)">
      <text x="70" y="0" class="sublabel" font-weight="bold">On Cooling (Option 3):</text>
      <!-- Bends so Brass contracts more -> concave on left (Brass) side -->
      <path d="M 40 20 A 120 120 0 0 0 40 140" fill="none" stroke="#eab308" stroke-width="12" stroke-linecap="round"/>
      <path d="M 52 20 A 132 132 0 0 0 52 140" fill="none" stroke="#475569" stroke-width="12" stroke-linecap="round"/>
      <text x="75" y="175" class="label">Bends with Brass on concave side</text>
    </g>
  </svg>`,

  // Q134: Heated metallic sphere cooling at room temperature
  q134: `${SVG_HEADER(460, 230)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="170" x2="280" y2="170" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="170" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="290" y="170" class="sublabel">Time</text>
      <text x="35" y="15" class="sublabel">Temperature</text>
      <!-- Newton's cooling curve: exponential decay asymptotically approaching room temp -->
      <path d="M 40 40 Q 100 120, 260 140" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="40" y1="140" x2="260" y2="140" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="290" y="140" class="sublabel" fill="#ef4444">T_room</text>
      <text x="160" y="195" class="label">Option (1): Exponential decay towards room temperature</text>
    </g>
  </svg>`,

  // Q145: Coaxial cylinders K1 and K2
  q145: `${SVG_HEADER(480, 220)}
    <g transform="translate(80, 30)">
      <!-- Outer hollow cylinder (radius 2R, K2) -->
      <ellipse cx="60" cy="70" rx="15" ry="45" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <path d="M 60 25 L 260 25 A 15 45 0 0 1 260 115 L 60 115 Z" fill="#f1f5f9" stroke="#0f172a" stroke-width="2"/>
      <ellipse cx="260" cy="70" rx="15" ry="45" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <text x="160" y="45" class="label">K₂ (Radius 2R)</text>

      <!-- Inner solid cylinder (radius R, K1) -->
      <ellipse cx="60" cy="70" rx="8" ry="22" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <path d="M 60 48 L 260 48 A 8 22 0 0 1 260 92 L 60 92 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5"/>
      <ellipse cx="260" cy="70" rx="8" ry="22" fill="#94a3b8" stroke="#0f172a" stroke-width="2"/>
      <text x="160" y="70" class="label">K₁ (Radius R)</text>

      <!-- Temperatures -->
      <text x="35" y="70" class="label">T₁</text>
      <text x="285" y="70" class="label">T₂</text>
      <text x="160" y="150" class="sublabel">Parallel conduction: K_eq = (K₁ + 3K₂) / 4</text>
    </g>
  </svg>`,

  // Q146: Two identical rods welded in series (Fig 1) and parallel (Fig 2)
  q146: `${SVG_HEADER(500, 220)}
    <!-- Figure (1): Series -->
    <g transform="translate(30, 40)">
      <text x="100" y="0" class="sublabel" font-weight="bold">Figure (1): Series (16 min)</text>
      <rect x="20" y="20" width="70" height="35" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <rect x="90" y="20" width="70" height="35" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <text x="5" y="38" class="label">0°C</text>
      <text x="180" y="38" class="label">100°C</text>
      <text x="100" y="80" class="sublabel">R_eq = 2R</text>
    </g>

    <!-- Figure (2): Parallel -->
    <g transform="translate(280, 40)">
      <text x="100" y="0" class="sublabel" font-weight="bold">Figure (2): Parallel (Time = ?)</text>
      <rect x="40" y="10" width="70" height="30" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <rect x="40" y="45" width="70" height="30" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <text x="15" y="42" class="label">0°C</text>
      <text x="135" y="42" class="label">100°C</text>
      <text x="95" y="100" class="sublabel">R_eq = R/2 ⇒ Time = 16/4 = 4 min</text>
    </g>
  </svg>`,

  // Q202: Temperature gradient variation dT/dx with x
  q202: `${SVG_HEADER(480, 240)}
    <g transform="translate(60, 20)">
      <!-- Configuration schematic -->
      <rect x="40" y="20" width="100" height="30" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/>
      <text x="90" y="35" class="label">K</text>
      <rect x="140" y="20" width="100" height="30" fill="#cbd5e1" stroke="#0f172a" stroke-width="2"/>
      <text x="190" y="35" class="label">2K</text>
      <text x="25" y="35" class="label">T₁</text>
      <text x="255" y="35" class="label">T₂</text>

      <!-- Correct Option (4) graph -->
      <line x1="40" y1="120" x2="260" y2="120" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="60" x2="40" y2="200" class="axis" marker-end="url(#arrow)"/>
      <text x="270" y="120" class="sublabel">x</text>
      <text x="35" y="55" class="sublabel">dT/dx</text>

      <!-- x marks -->
      <text x="40" y="105" class="sublabel">O</text>
      <text x="140" y="105" class="sublabel">l</text>
      <text x="240" y="105" class="sublabel">2l</text>

      <!-- Step function: negative, more negative for first rod, half as negative for second rod -->
      <line x1="40" y1="180" x2="140" y2="180" stroke="#2563eb" stroke-width="3"/>
      <line x1="140" y1="180" x2="140" y2="150" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3"/>
      <line x1="140" y1="150" x2="240" y2="150" stroke="#2563eb" stroke-width="3"/>

      <text x="150" y="220" class="label">Option (4): dT/dx is negative and larger in magnitude in first rod</text>
    </g>
  </svg>`,

  // Q223: Spectral emissive power curve at T1 with peak at lambda_1
  q223: `${SVG_HEADER(460, 240)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="180" x2="320" y2="180" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="180" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="330" y="180" class="sublabel">λ</text>
      <text x="35" y="15" class="sublabel">e_λ</text>

      <path d="M 40 180 Q 140 25, 290 178" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <line x1="140" y1="40" x2="140" y2="180" class="dashed"/>
      <text x="140" y="195" class="label">λ₁</text>
      <text x="260" y="80" class="label" fill="#2563eb">T₁</text>

      <!-- Peak height e_λ1 -->
      <line x1="40" y1="40" x2="140" y2="40" class="dashed"/>
      <text x="25" y="40" class="sublabel">e_λ1</text>
    </g>
  </svg>`,

  // Q224: Two frames with gaps x and y
  q224: `${SVG_HEADER(480, 240)}
    <!-- Left frame: double-box with gap x -->
    <g transform="translate(60, 30)">
      <rect x="20" y="20" width="120" height="130" fill="none" stroke="#0f172a" stroke-width="6"/>
      <line x1="20" y1="85" x2="140" y2="85" stroke="#0f172a" stroke-width="6"/>
      <!-- Top gap x: cut top bar -->
      <rect x="60" y="15" width="40" height="15" fill="#ffffff"/>
      <line x1="60" y1="2" x2="100" y2="2" stroke="#ef4444" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="80" y="-10" class="label" fill="#ef4444">x</text>
    </g>

    <!-- Right frame: single box with gap y -->
    <g transform="translate(260, 30)">
      <rect x="20" y="20" width="120" height="130" fill="none" stroke="#0f172a" stroke-width="6"/>
      <!-- Top gap y -->
      <rect x="60" y="15" width="40" height="15" fill="#ffffff"/>
      <line x1="60" y1="2" x2="100" y2="2" stroke="#2563eb" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
      <text x="80" y="-10" class="label" fill="#2563eb">y</text>
    </g>

    <text x="240" y="210" class="label">Both x and y will increase on heating (Option 3)</text>
  </svg>`,

  // Q225: Cooling curves of bodies A and B
  q225: `${SVG_HEADER(460, 230)}
    <g transform="translate(60, 20)">
      <line x1="40" y1="170" x2="280" y2="170" class="axis" marker-end="url(#arrow)"/>
      <line x1="40" y1="170" x2="40" y2="20" class="axis" marker-end="url(#arrow)"/>
      <text x="290" y="170" class="sublabel">t</text>
      <text x="35" y="15" class="sublabel">T</text>

      <!-- Curve A: cools slower -->
      <path d="M 40 40 Q 140 85, 250 120" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="260" y="120" class="label" fill="#2563eb">A</text>

      <!-- Curve B: cools faster -->
      <path d="M 40 40 Q 110 120, 240 155" fill="none" stroke="#ef4444" stroke-width="2.5"/>
      <text x="250" y="155" class="label" fill="#ef4444">B</text>

      <text x="160" y="195" class="sublabel">B cools faster: a_B &gt; a_A and r_B &lt; r_A</text>
    </g>
  </svg>`
};

async function generateAndUpload() {
  console.log('Generating Thermal Properties Batch 2 diagrams...');
  const results = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const filename = `thermal_batch2_${key}.png`;
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
        public_id: `thermal_batch2_${key}`,
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

  const jsonPath = path.resolve(__dirname, 'thermal_diagrams_batch2.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`Saved thermal diagrams batch 2 map to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
