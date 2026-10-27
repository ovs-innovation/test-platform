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

const outDirBackend = path.resolve(__dirname, '../uploads/fluids');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/fluids');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 540, h = 300) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .grid { stroke: #e2e8f0; stroke-width: 1; stroke-dasharray: 3,3; }
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
    </marker>
    <pattern id="hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" stroke-width="2" />
    </pattern>
  </defs>
`;

const diagrams = {
  // Q108: Viscous force f_v vs time t graphs (4 options)
  q108: `${SVG_HEADER(560, 240)}
    <!-- Option (1) -->
    <g transform="translate(40, 20)">
      <line x1="0" y1="160" x2="160" y2="160" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="160" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="170" y="160" class="label">t</text>
      <text x="-15" y="15" class="label">f_v</text>
      <text x="-10" y="175" class="sublabel">O</text>
      <line x1="0" y1="160" x2="130" y2="40" stroke="#2563eb" stroke-width="2.5"/>
      <text x="70" y="195" class="label">(1)</text>
    </g>
    <!-- Option (2) -->
    <g transform="translate(320, 20)">
      <line x1="0" y1="160" x2="160" y2="160" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="160" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="170" y="160" class="label">t</text>
      <text x="-15" y="15" class="label">f_v</text>
      <text x="-10" y="175" class="sublabel">O</text>
      <line x1="0" y1="40" x2="140" y2="40" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,4"/>
      <path d="M 0 160 Q 30 50, 140 40" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="70" y="195" class="label">(2)</text>
    </g>
  </svg>`,

  // Q111: Horizontal branching pipe (A -> 0.4A and 0.5A)
  q111: `${SVG_HEADER(500, 240)}
    <!-- Main pipe -->
    <path d="M 60 70 L 160 70 L 260 30 L 380 30" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 60 170 L 160 170 L 260 210 L 380 210" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 210 120 L 270 80 L 380 80" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 210 120 L 270 160 L 380 160" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Pipe body fill -->
    <path d="M 60 70 L 160 70 L 260 30 L 380 30 L 380 80 L 270 80 L 210 120 L 270 160 L 380 160 L 380 210 L 260 210 L 160 170 L 60 170 Z" fill="#e0f2fe" opacity="0.6"/>

    <!-- Left end ellipse -->
    <ellipse cx="60" cy="120" rx="15" ry="50" fill="#bae6fd" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Upper right end ellipse -->
    <ellipse cx="380" cy="55" rx="8" ry="25" fill="#bae6fd" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Lower right end ellipse -->
    <ellipse cx="380" cy="185" rx="10" ry="25" fill="#bae6fd" stroke="#0f172a" stroke-width="2.5"/>

    <!-- Flow vectors & labels -->
    <line x1="10" y1="120" x2="55" y2="120" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)"/>
    <text x="30" y="95" class="label">4 m/s</text>
    <text x="110" y="125" class="label">A</text>

    <!-- Branch 1 -->
    <line x1="385" y1="55" x2="440" y2="55" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="445" y="40" class="label">2 m/s</text>
    <text x="320" y="55" class="label">0.4 A</text>

    <!-- Branch 2 -->
    <line x1="385" y1="185" x2="440" y2="185" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
    <text x="450" y="185" class="label">v</text>
    <text x="320" y="185" class="label">0.5 A</text>
  </svg>`,

  // Q112: Rain drop acceleration a vs time t graphs
  q112: `${SVG_HEADER(560, 240)}
    <!-- Option (1) -->
    <g transform="translate(40, 20)">
      <line x1="0" y1="160" x2="160" y2="160" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="160" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="170" y="160" class="label">t</text>
      <text x="-15" y="15" class="label">a</text>
      <text x="-15" y="40" class="label">g</text>
      <text x="-10" y="175" class="sublabel">O</text>
      <path d="M 0 40 Q 30 150, 140 160" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="70" y="195" class="label">(1)</text>
    </g>
    <!-- Option (2) -->
    <g transform="translate(320, 20)">
      <line x1="0" y1="160" x2="160" y2="160" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="160" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="170" y="160" class="label">t</text>
      <text x="-15" y="15" class="label">a</text>
      <text x="-15" y="40" class="label">g</text>
      <text x="-10" y="175" class="sublabel">O</text>
      <line x1="0" y1="40" x2="130" y2="160" stroke="#2563eb" stroke-width="2.5"/>
      <text x="70" y="195" class="label">(2)</text>
    </g>
  </svg>`,

  // Q114: KE vs depth d of sphere falling in lake
  q114: `${SVG_HEADER(560, 240)}
    <!-- Option (1) -->
    <g transform="translate(40, 20)">
      <line x1="0" y1="160" x2="160" y2="160" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="160" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="170" y="160" class="label">d</text>
      <text x="-20" y="15" class="label">KE</text>
      <path d="M 0 160 Q 80 140, 130 50" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="70" y="195" class="label">(1)</text>
    </g>
    <!-- Option (2) -->
    <g transform="translate(320, 20)">
      <line x1="0" y1="160" x2="160" y2="160" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="160" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="170" y="160" class="label">d</text>
      <text x="-20" y="15" class="label">KE</text>
      <path d="M 0 160 Q 40 50, 140 50" fill="none" stroke="#2563eb" stroke-width="2.5"/>
      <text x="70" y="195" class="label">(2)</text>
    </g>
  </svg>`,

  // Q117: Container with narrow neck and wide base
  q117: `${SVG_HEADER(380, 260)}
    <path d="M 160 30 L 160 80 L 70 80 L 70 210 L 290 210 L 290 80 L 200 80 L 200 30" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Liquid surface -->
    <line x1="160" y1="45" x2="200" y2="45" stroke="#2563eb" stroke-width="2"/>
    <!-- Hatching in wide base -->
    <rect x="71" y="81" width="218" height="128" fill="url(#hatch)" opacity="0.4"/>
    <text x="180" y="145" class="label">Liquid</text>
    <text x="180" y="235" class="sublabel">Base</text>
  </svg>`,

  // Q142: S-shaped horizontal pipe of uniform cross-section
  q142: `${SVG_HEADER(460, 280)}
    <!-- S-curve pipe -->
    <path d="M 80 50 L 260 50 C 310 50, 310 110, 260 140 C 200 170, 200 230, 260 230 L 380 230" fill="none" stroke="#0f172a" stroke-width="24" stroke-linecap="round"/>
    <path d="M 80 50 L 260 50 C 310 50, 310 110, 260 140 C 200 170, 200 230, 260 230 L 380 230" fill="none" stroke="#bae6fd" stroke-width="18" stroke-linecap="round"/>
    
    <!-- Flow arrows & Points -->
    <circle cx="100" cy="50" r="4" fill="#dc2626"/>
    <text x="100" y="30" class="label">A</text>
    <line x1="120" y1="50" x2="160" y2="50" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>

    <circle cx="235" cy="155" r="4" fill="#dc2626"/>
    <text x="215" y="155" class="label">B</text>

    <circle cx="360" cy="230" r="4" fill="#dc2626"/>
    <text x="360" y="255" class="label">C</text>
    <line x1="300" y1="230" x2="340" y2="230" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
  </svg>`,

  // Q164: Siphon tube with heights h1 and h2
  q164: `${SVG_HEADER(480, 320)}
    <!-- Main vessel -->
    <rect x="60" y="120" width="140" height="150" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="60" y1="130" x2="200" y2="130" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4"/>
    <text x="90" y="115" class="label">A</text>
    
    <!-- Siphon pipe -->
    <path d="M 130 170 L 130 50 L 270 50 L 270 280 L 360 280" fill="none" stroke="#0f172a" stroke-width="12"/>
    <path d="M 130 170 L 130 50 L 270 50 L 270 280 L 360 280" fill="none" stroke="#bae6fd" stroke-width="7"/>
    <text x="375" y="280" class="label">B</text>
    
    <!-- Dimensions -->
    <!-- h1: from liquid level A to siphon top -->
    <line x1="290" y1="50" x2="290" y2="130" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="310" y="90" class="label">h_1</text>
    
    <!-- h2: from liquid level A to exit B -->
    <line x1="200" y1="130" x2="290" y2="130" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <line x1="290" y1="130" x2="290" y2="280" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="310" y="205" class="label">h_2</text>
  </svg>`,

  // Q171: Elevated water tank on stilts with hole
  q171: `${SVG_HEADER(380, 280)}
    <!-- Ground -->
    <line x1="40" y1="240" x2="340" y2="240" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Stilts -->
    <line x1="120" y1="150" x2="120" y2="240" stroke="#0f172a" stroke-width="3"/>
    <line x1="220" y1="150" x2="220" y2="240" stroke="#0f172a" stroke-width="3"/>
    <text x="80" y="195" class="label">H</text>
    <line x1="100" y1="150" x2="100" y2="240" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>

    <!-- Tank -->
    <rect x="90" y="50" width="160" height="100" rx="10" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="90" y1="65" x2="250" y2="65" stroke="#2563eb" stroke-width="2"/>
    <text x="65" y="100" class="label">H</text>
    <line x1="80" y1="50" x2="80" y2="150" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    
    <!-- Water stream -->
    <path d="M 250 110 Q 300 110, 320 240" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="3,3"/>
  </svg>`,

  // Q173: L-shaped tube horizontally accelerated
  q173: `${SVG_HEADER(440, 260)}
    <!-- L-tube -->
    <path d="M 120 40 L 120 180 L 320 180" fill="none" stroke="#0f172a" stroke-width="18" stroke-linejoin="round"/>
    <path d="M 120 60 L 120 180 L 320 180" fill="none" stroke="#bae6fd" stroke-width="12" stroke-linejoin="round"/>
    
    <!-- Points A and B -->
    <text x="335" y="180" class="label">A</text>
    <text x="140" y="60" class="label">B</text>
    
    <!-- Dimensions -->
    <text x="85" y="120" class="label">l/2</text>
    <line x1="95" y1="60" x2="95" y2="180" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>

    <text x="220" y="210" class="label">l</text>
    <line x1="120" y1="200" x2="320" y2="200" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>

    <!-- Acceleration arrow -->
    <line x1="220" y1="100" x2="270" y2="100" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="285" y="100" class="label" fill="#dc2626">a</text>
  </svg>`,

  // Q174: Rising pipe in vertical plane
  q174: `${SVG_HEADER(440, 260)}
    <!-- Pipe curve from A to B -->
    <path d="M 100 190 C 180 190, 160 70, 280 70" fill="none" stroke="#0f172a" stroke-width="26"/>
    <path d="M 100 190 C 180 190, 160 70, 280 70" fill="none" stroke="#bae6fd" stroke-width="18"/>
    
    <ellipse cx="100" cy="190" rx="8" ry="13" fill="#93c5fd" stroke="#0f172a" stroke-width="2"/>
    <ellipse cx="280" cy="70" rx="6" ry="10" fill="#93c5fd" stroke="#0f172a" stroke-width="2"/>

    <text x="95" y="225" class="label">A</text>
    <text x="280" y="45" class="label">B</text>
    
    <line x1="110" y1="190" x2="140" y2="190" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <text x="125" y="175" class="sublabel">v_A</text>
    <line x1="290" y1="70" x2="320" y2="70" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>
    <text x="310" y="55" class="sublabel">v_B</text>
  </svg>`,

  // Q175: Truncated cone vessel with two liquid layers
  q175: `${SVG_HEADER(420, 280)}
    <!-- Conical vessel outline -->
    <polygon points="160,30 240,30 280,230 120,230" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Top liquid 1 -->
    <polygon points="160,30 240,30 260,130 140,130" fill="#e0f2fe" opacity="0.8"/>
    <text x="200" y="80" class="label">①</text>
    
    <!-- Bottom liquid 2 -->
    <polygon points="140,130 260,130 280,230 120,230" fill="#93c5fd" opacity="0.8"/>
    <text x="200" y="180" class="label">②</text>

    <!-- Dimension heights -->
    <line x1="310" y1="30" x2="310" y2="130" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="345" y="80" class="label">0.2 m</text>
    
    <line x1="310" y1="130" x2="310" y2="230" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="345" y="180" class="label">0.2 m</text>

    <!-- Top & Bottom areas -->
    <text x="200" y="15" class="label">Area = 10⁻⁴ m²</text>
    <text x="200" y="255" class="label">Area = 2 × 10⁻³ m²</text>
  </svg>`,

  // Q176: Accelerated container with points A, B, C, D
  q176: `${SVG_HEADER(440, 260)}
    <!-- Container -->
    <rect x="80" y="40" width="220" height="170" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Tilted liquid surface -->
    <polygon points="81,70 300,150 300,209 81,209" fill="#e0f2fe"/>
    <line x1="81" y1="70" x2="300" y2="150" stroke="#2563eb" stroke-width="2.5"/>
    
    <!-- Points A, B, C, D -->
    <circle cx="110" cy="80" r="4" fill="#0f172a"/>
    <text x="110" y="65" class="label">A</text>

    <circle cx="260" cy="135" r="4" fill="#0f172a"/>
    <text x="260" y="120" class="label">B</text>

    <circle cx="110" cy="190" r="4" fill="#0f172a"/>
    <text x="90" y="190" class="label">C</text>

    <circle cx="260" cy="190" r="4" fill="#0f172a"/>
    <text x="280" y="190" class="label">D</text>

    <!-- Acceleration a -->
    <line x1="320" y1="120" x2="370" y2="120" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="385" y="120" class="label" fill="#dc2626">a</text>
  </svg>`,

  // Q177: Cube floating with submerged depth x
  q177: `${SVG_HEADER(380, 260)}
    <!-- Beaker -->
    <rect x="80" y="60" width="200" height="160" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <rect x="81" y="100" width="198" height="119" fill="#e0f2fe"/>
    <line x1="81" y1="100" x2="279" y2="100" stroke="#2563eb" stroke-width="2"/>

    <!-- Floating cube -->
    <rect x="145" y="70" width="70" height="70" fill="#fef08a" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Depth x -->
    <line x1="225" y1="100" x2="225" y2="140" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="240" y="120" class="label">x</text>
  </svg>`,

  // Q179: Open tank with holes O1, O2, O3
  q179: `${SVG_HEADER(460, 280)}
    <!-- Tank -->
    <rect x="60" y="40" width="160" height="190" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="40" y1="230" x2="420" y2="230" stroke="#0f172a" stroke-width="2.5"/> <!-- ground -->

    <!-- Holes -->
    <circle cx="220" cy="70" r="3" fill="#dc2626"/>
    <text x="240" y="70" class="label">O₁</text>
    <circle cx="220" cy="120" r="3" fill="#dc2626"/>
    <text x="240" y="120" class="label">O₂</text>
    <circle cx="220" cy="170" r="3" fill="#dc2626"/>
    <text x="240" y="170" class="label">O₃</text>

    <!-- Parabolic water jets -->
    <path d="M 220 70 Q 320 70, 360 230" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3"/>
    <path d="M 220 170 Q 320 170, 360 230" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="3,3"/>
    <path d="M 220 120 Q 350 120, 400 230" fill="none" stroke="#2563eb" stroke-width="2"/>

    <!-- Depth markers -->
    <line x1="45" y1="40" x2="45" y2="70" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="30" y="55" class="label">h₁</text>
    <line x1="45" y1="40" x2="45" y2="170" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="30" y="120" class="label">h₂</text>
  </svg>`,

  // Q181: Ball falling into water from height 20 m
  q181: `${SVG_HEADER(360, 280)}
    <!-- Ball above -->
    <circle cx="160" cy="40" r="10" fill="#475569" stroke="#0f172a" stroke-width="1.5"/>
    <line x1="160" y1="55" x2="160" y2="130" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#arrow)"/>
    <text x="210" y="85" class="label">h = 20 m</text>

    <!-- Trough of water -->
    <rect x="80" y="140" width="160" height="90" rx="6" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <text x="160" y="185" class="label">Water</text>
  </svg>`,

  // Q182: Constricted tube with P(x) pressure distribution
  q182: `${SVG_HEADER(480, 260)}
    <!-- Tube with constriction -->
    <path d="M 60 40 L 160 40 L 210 65 L 270 65 L 320 40 L 420 40" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 60 120 L 160 120 L 210 95 L 270 95 L 320 120 L 420 120" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 60 41 L 160 41 L 210 66 L 270 66 L 320 41 L 420 41 L 420 119 L 320 119 L 270 94 L 210 94 L 160 119 L 60 119 Z" fill="#e0f2fe" opacity="0.6"/>
    
    <!-- Pressure graph (option 3) below -->
    <g transform="translate(60, 150)">
      <line x1="0" y1="80" x2="360" y2="80" class="axis" marker-end="url(#arrow)"/>
      <line x1="0" y1="80" x2="0" y2="10" class="axis" marker-end="url(#arrow)"/>
      <text x="370" y="80" class="label">x</text>
      <text x="-15" y="15" class="label">P</text>
      <path d="M 0 30 L 100 30 L 150 60 L 210 60 L 260 30 L 340 30" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    </g>
  </svg>`,

  // Q183: Step / L-shaped container (force on base)
  q183: `${SVG_HEADER(360, 260)}
    <path d="M 160 30 L 160 130 L 80 130 L 80 220 L 240 220 L 240 30 Z" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <rect x="81" y="131" width="158" height="88" fill="url(#hatch)" opacity="0.3"/>
    <text x="160" y="175" class="label">Liquid</text>
    <text x="160" y="240" class="sublabel">Base</text>
  </svg>`,

  // Q184: Cubical tank accelerated horizontally
  q184: `${SVG_HEADER(400, 260)}
    <!-- Tank on wheels -->
    <rect x="100" y="40" width="160" height="160" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    <circle cx="130" cy="210" r="10" fill="#334155"/>
    <circle cx="230" cy="210" r="10" fill="#334155"/>

    <!-- Corners A, B, C, D -->
    <circle cx="115" cy="55" r="3" fill="#0f172a"/>
    <text x="125" y="55" class="label">A</text>

    <circle cx="245" cy="55" r="3" fill="#0f172a"/>
    <text x="235" y="55" class="label">B</text>

    <circle cx="115" cy="185" r="3" fill="#0f172a"/>
    <text x="125" y="185" class="label">C</text>

    <circle cx="245" cy="185" r="3" fill="#0f172a"/>
    <text x="235" y="185" class="label">D</text>

    <!-- Acceleration -->
    <line x1="280" y1="120" x2="330" y2="120" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="345" y="120" class="label" fill="#dc2626">a</text>
  </svg>`,

  // Q198: Container accelerated downwards with g/2
  q198: `${SVG_HEADER(400, 240)}
    <!-- Container -->
    <rect x="60" y="30" width="240" height="170" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Points A and B separated vertically by h -->
    <circle cx="180" cy="75" r="4" fill="#0f172a"/>
    <text x="200" y="75" class="label">A</text>

    <circle cx="180" cy="155" r="4" fill="#0f172a"/>
    <text x="200" y="155" class="label">B</text>

    <line x1="165" y1="75" x2="165" y2="155" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="150" y="115" class="label">h</text>

    <!-- Acceleration arrow downwards -->
    <line x1="330" y1="80" x2="330" y2="140" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="340" y="110" class="label" fill="#dc2626">g/2</text>
  </svg>`,

  // Q199: Container accelerated right with g (triangle of points A and B)
  q199: `${SVG_HEADER(420, 260)}
    <!-- Container -->
    <rect x="80" y="30" width="200" height="190" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Liquid surface slope 45 deg (tan theta = a/g = 1) -->
    <polygon points="81,70 279,190 279,219 81,219" fill="#e0f2fe"/>
    <line x1="81" y1="70" x2="279" y2="190" stroke="#2563eb" stroke-width="2.5"/>

    <!-- Triangle A-B -->
    <circle cx="110" cy="110" r="4" fill="#0f172a"/>
    <text x="95" y="110" class="label">A</text>

    <circle cx="210" cy="190" r="4" fill="#0f172a"/>
    <text x="210" y="205" class="label">B</text>

    <line x1="110" y1="110" x2="210" y2="190" stroke="#0f172a" stroke-width="1.5"/>
    <line x1="110" y1="110" x2="110" y2="190" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3"/>
    <line x1="110" y1="190" x2="210" y2="190" stroke="#475569" stroke-width="1.5" stroke-dasharray="3,3"/>

    <text x="95" y="150" class="label">h</text>
    <text x="160" y="205" class="label">h</text>

    <!-- Acceleration g -->
    <line x1="300" y1="120" x2="350" y2="120" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="365" y="120" class="label" fill="#dc2626">g</text>
  </svg>`,

  // Q203: Container with dense liquid 2rho and orifice
  q203: `${SVG_HEADER(380, 260)}
    <rect x="90" y="40" width="160" height="170" fill="#93c5fd" opacity="0.8" stroke="#0f172a" stroke-width="2.5"/>
    <text x="170" y="120" class="label">2ρ</text>
    
    <!-- Depth h -->
    <line x1="70" y1="40" x2="70" y2="210" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="50" y="125" class="label">h</text>

    <!-- Orifice and stream -->
    <path d="M 250 190 Q 280 190, 290 230" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    <text x="305" y="190" class="label">v</text>
  </svg>`,

  // Q204: Cylinder floating in liquids A and B
  q204: `${SVG_HEADER(420, 280)}
    <!-- Beaker -->
    <rect x="80" y="40" width="220" height="200" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Liquid A -->
    <rect x="81" y="90" width="218" height="60" fill="#e0f2fe" opacity="0.8"/>
    <text x="120" y="120" class="label">A</text>

    <!-- Liquid B -->
    <rect x="81" y="150" width="218" height="89" fill="#93c5fd" opacity="0.8"/>
    <text x="120" y="195" class="label">B</text>
    <text x="120" y="65" class="label">Air</text>

    <!-- Floating Cylinder -->
    <rect x="190" y="70" width="45" height="140" rx="4" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Heights hA and hB -->
    <line x1="250" y1="90" x2="250" y2="150" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="270" y="120" class="label">h_A</text>

    <line x1="250" y1="150" x2="250" y2="210" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="270" y="180" class="label">h_B</text>
  </svg>`,

  // Q209: Tank on smooth floor with side orifice and backward acceleration
  q209: `${SVG_HEADER(440, 280)}
    <!-- Tank with water -->
    <rect x="110" y="40" width="160" height="170" fill="#e0f2fe" stroke="#0f172a" stroke-width="2.5"/>
    
    <!-- Smooth surface -->
    <line x1="70" y1="210" x2="330" y2="210" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="70" y1="218" x2="330" y2="218" stroke="#94a3b8" stroke-dasharray="4,4"/>
    <text x="200" y="235" class="label">Smooth</text>

    <!-- Depth h -->
    <line x1="290" y1="40" x2="290" y2="170" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="310" y="105" class="label">h</text>

    <!-- Orifice with valve -->
    <rect x="270" y="165" width="20" height="12" fill="#334155"/>
    <!-- Water jet out to right -->
    <path d="M 290 171 Q 320 171, 330 200" fill="none" stroke="#2563eb" stroke-width="2.5"/>
    
    <!-- Backward acceleration of tank -->
    <line x1="90" y1="120" x2="40" y2="120" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)"/>
    <text x="25" y="120" class="label" fill="#dc2626">a</text>
  </svg>`,

  // Q210: Downward tapering water stream from nozzle
  q210: `${SVG_HEADER(380, 280)}
    <!-- Horizontal pipe with downward curved nozzle -->
    <path d="M 60 40 L 160 40 C 220 40, 220 90, 220 120" fill="none" stroke="#0f172a" stroke-width="26" stroke-linecap="round"/>
    <path d="M 60 40 L 160 40 C 220 40, 220 90, 220 120" fill="none" stroke="#bae6fd" stroke-width="18" stroke-linecap="round"/>

    <!-- Tapered falling water stream -->
    <path d="M 211 120 C 211 170, 215 220, 215 250 L 225 250 C 225 220, 229 170, 229 120 Z" fill="#93c5fd" opacity="0.8" stroke="#2563eb" stroke-width="1"/>
    
    <text x="180" y="125" class="label">A</text>
    <text x="180" y="245" class="label">A'</text>
    <line x1="250" y1="120" x2="250" y2="250" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="290" y="185" class="label">10 m</text>
  </svg>`
};

async function generateAndUpload() {
  console.log('Generating batch 2 diagrams...');
  const results = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const filename = `fluids_${key}.png`;
    const backendPath = path.join(outDirBackend, filename);
    const frontendPath = path.join(outDirFrontend, filename);

    // Convert SVG to high-res PNG
    const pngBuffer = await sharp(Buffer.from(svg))
      .png({ quality: 100 })
      .toBuffer();

    fs.writeFileSync(backendPath, pngBuffer);
    fs.writeFileSync(frontendPath, pngBuffer);
    console.log(`Saved locally: ${filename}`);

    // Upload to Cloudinary
    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum_fluids',
        public_id: `fluids_${key}`,
        overwrite: true,
        resource_type: 'image'
      });
      results[key] = uploadRes.secure_url;
      console.log(`Uploaded to Cloudinary: ${key} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${key} to Cloudinary:`, err);
      results[key] = `/uploads/fluids/${filename}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'fluids_diagrams_batch2.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`Saved diagrams map to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
