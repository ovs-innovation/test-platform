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

const outDirBackend = path.resolve(__dirname, '../uploads/gravitation');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/gravitation');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

const SVG_HEADER = (w = 540, h = 300) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .grid { stroke: #e2e8f0; stroke-width: 1; stroke-dasharray: 4,4; }
    .label { font-size: 15px; font-weight: 600; fill: #0f172a; text-anchor: middle; dominant-baseline: middle; }
    .sublabel { font-size: 13px; font-weight: 500; fill: #475569; text-anchor: middle; dominant-baseline: middle; }
    .force-arrow { stroke: #dc2626; stroke-width: 2.2; stroke-linecap: round; }
    .vel-arrow { stroke: #2563eb; stroke-width: 2.2; stroke-linecap: round; }
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
  </defs>
`;

const diagrams = {
  // Q113: Two masses m1 and m2 inside spherical shell of mass m3
  q113: `${SVG_HEADER(540, 260)}
    <!-- Spherical shell m3 -->
    <circle cx="270" cy="130" r="95" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <text x="375" y="65" class="label">m&#8323;</text>
    <!-- Centre O -->
    <circle cx="270" cy="130" r="3" fill="#0f172a"/>
    <text x="270" y="112" class="sublabel">O</text>
    <!-- Mass m1 -->
    <circle cx="220" cy="145" r="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="220" y="145" class="label" fill="#2563eb">m&#8321;</text>
    <!-- Mass m2 -->
    <circle cx="320" cy="145" r="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="320" y="145" class="label" fill="#2563eb">m&#8322;</text>
    <!-- Distance dimensions -->
    <line x1="220" y1="180" x2="320" y2="180" stroke="#64748b" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="270" y="195" class="sublabel">r</text>
    <line x1="320" y1="180" x2="365" y2="180" stroke="#64748b" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="342" y="195" class="sublabel">2r</text>
  </svg>`,

  // Q142: 4 graphs of acceleration due to gravity g vs distance r from centre of Earth
  q142: `${SVG_HEADER(540, 300)}
    <!-- Panel 1 -->
    <rect x="25" y="15" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="40" y="35" class="label">(1)</text>
    <line x1="60" y1="115" x2="220" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="60" y1="115" x2="60" y2="30" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="50" y="35" class="sublabel">g</text>
    <line x1="60" y1="115" x2="130" y2="50" stroke="#2563eb" stroke-width="2"/>
    <line x1="130" y1="50" x2="200" y2="115" stroke="#2563eb" stroke-width="2"/>
    <text x="130" y="128" class="sublabel">R</text>

    <!-- Panel 2 (CORRECT) -->
    <rect x="285" y="15" width="220" height="125" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
    <text x="300" y="35" class="label">(2)</text>
    <line x1="320" y1="115" x2="480" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="320" y1="115" x2="320" y2="30" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="310" y="35" class="sublabel">g</text>
    <line x1="320" y1="115" x2="390" y2="50" stroke="#16a34a" stroke-width="2.5"/>
    <path d="M 390 50 Q 425 95 470 110" fill="none" stroke="#16a34a" stroke-width="2.5"/>
    <line x1="390" y1="115" x2="390" y2="50" stroke="#94a3b8" stroke-dasharray="3,3"/>
    <text x="390" y="128" class="sublabel">R</text>

    <!-- Panel 3 -->
    <rect x="25" y="155" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="40" y="175" class="label">(3)</text>
    <line x1="60" y1="255" x2="220" y2="255" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="60" y1="255" x2="60" y2="170" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="50" y="175" class="sublabel">g</text>
    <line x1="60" y1="190" x2="130" y2="190" stroke="#2563eb" stroke-width="2"/>
    <path d="M 130 190 Q 165 235 210 250" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="130" y="268" class="sublabel">R</text>

    <!-- Panel 4 -->
    <rect x="285" y="155" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="300" y="175" class="label">(4)</text>
    <line x1="320" y1="255" x2="480" y2="255" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="320" y1="255" x2="320" y2="170" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="310" y="175" class="sublabel">g</text>
    <line x1="320" y1="255" x2="390" y2="190" stroke="#2563eb" stroke-width="2"/>
    <line x1="390" y1="190" x2="460" y2="190" stroke="#2563eb" stroke-width="2"/>
    <text x="390" y="268" class="sublabel">R</text>
  </svg>`,

  // Q159: 4 graphs of T^2 vs R for planet motion
  q159: `${SVG_HEADER(540, 300)}
    <!-- Panel 1 -->
    <rect x="25" y="15" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="40" y="35" class="label">(1)</text>
    <line x1="60" y1="115" x2="220" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="60" y1="115" x2="60" y2="30" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="50" y="35" class="sublabel">T&#178;</text>
    <text x="215" y="128" class="sublabel">R</text>
    <path d="M 60 45 Q 120 105 200 115" fill="none" stroke="#2563eb" stroke-width="2"/>

    <!-- Panel 2 (CORRECT: T^2 = k R^3 curves upward) -->
    <rect x="285" y="15" width="220" height="125" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
    <text x="300" y="35" class="label">(2)</text>
    <line x1="320" y1="115" x2="480" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="320" y1="115" x2="320" y2="30" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="310" y="35" class="sublabel">T&#178;</text>
    <text x="475" y="128" class="sublabel">R</text>
    <path d="M 320 115 Q 400 110 460 45" fill="none" stroke="#16a34a" stroke-width="2.5"/>

    <!-- Panel 3 -->
    <rect x="25" y="155" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="40" y="175" class="label">(3)</text>
    <line x1="60" y1="255" x2="220" y2="255" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="60" y1="255" x2="60" y2="170" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="50" y="175" class="sublabel">T&#178;</text>
    <text x="215" y="268" class="sublabel">R</text>
    <line x1="60" y1="185" x2="200" y2="255" stroke="#2563eb" stroke-width="2"/>

    <!-- Panel 4 -->
    <rect x="285" y="155" width="220" height="125" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
    <text x="300" y="175" class="label">(4)</text>
    <line x1="320" y1="255" x2="480" y2="255" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <line x1="320" y1="255" x2="320" y2="170" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
    <text x="310" y="175" class="sublabel">T&#178;</text>
    <text x="475" y="268" class="sublabel">R</text>
    <line x1="320" y1="255" x2="460" y2="185" stroke="#2563eb" stroke-width="2"/>
  </svg>`,

  // Q166: Two concentric shells of masses m1 and m2 with points A, B, C, D
  q166: `${SVG_HEADER(540, 260)}
    <!-- Outer shell m2 -->
    <circle cx="270" cy="130" r="100" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
    <text x="385" y="70" class="label">m&#8322;</text>
    <!-- Inner shell m1 -->
    <circle cx="270" cy="130" r="55" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2"/>
    <text x="270" y="95" class="label" fill="#2563eb">m&#8321;</text>
    <!-- Common horizontal axis -->
    <line x1="270" y1="130" x2="440" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <!-- Point D (inside inner shell) -->
    <circle cx="285" cy="130" r="5" fill="#dc2626"/>
    <text x="285" y="148" class="label" fill="#dc2626">D</text>
    <!-- Point C (on inner shell) -->
    <circle cx="325" cy="130" r="5" fill="#0f172a"/>
    <text x="325" y="148" class="label">C</text>
    <!-- Point B (between shells) -->
    <circle cx="350" cy="130" r="5" fill="#0f172a"/>
    <text x="350" y="148" class="label">B</text>
    <!-- Point A (outside outer shell) -->
    <circle cx="395" cy="130" r="5" fill="#0f172a"/>
    <text x="395" y="148" class="label">A</text>
  </svg>`,

  // Q169: Solid sphere with tunnel AB and 4 graphs of field E vs position r from A to B
  q169: `${SVG_HEADER(540, 320)}
    <!-- Left: Solid sphere with tunnel AB -->
    <g transform="translate(10, 20)">
      <circle cx="80" cy="130" r="65" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.5"/>
      <rect x="74" y="65" width="12" height="130" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="80" cy="130" r="3" fill="#0f172a"/>
      <text x="80" y="50" class="label">A</text>
      <text x="80" y="212" class="label">B</text>
    </g>

    <!-- Right: 4 graph options -->
    <!-- Graph (1) - CORRECT: V-shape touching 0 at center -->
    <g transform="translate(190, 10)">
      <rect x="0" y="0" width="155" height="135" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="2"/>
      <text x="15" y="20" class="label">(1)</text>
      <line x1="20" y1="115" x2="140" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="20" y1="115" x2="20" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="15" y="25" class="sublabel">E</text>
      <text x="140" y="128" class="sublabel">r</text>
      <!-- V shape: drops from A to 0 at center, rises to B -->
      <line x1="25" y1="35" x2="75" y2="115" stroke="#16a34a" stroke-width="2.5"/>
      <line x1="75" y1="115" x2="125" y2="35" stroke="#16a34a" stroke-width="2.5"/>
    </g>

    <!-- Graph (2) -->
    <g transform="translate(365, 10)">
      <rect x="0" y="0" width="155" height="135" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="15" y="20" class="label">(2)</text>
      <line x1="20" y1="115" x2="140" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="20" y1="115" x2="20" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="15" y="25" class="sublabel">E</text>
      <path d="M 25 35 Q 75 115 125 35" fill="none" stroke="#2563eb" stroke-width="2"/>
    </g>

    <!-- Graph (3) -->
    <g transform="translate(190, 160)">
      <rect x="0" y="0" width="155" height="135" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="15" y="20" class="label">(3)</text>
      <line x1="20" y1="115" x2="140" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="20" y1="115" x2="20" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="15" y="25" class="sublabel">E</text>
      <line x1="25" y1="35" x2="55" y2="115" stroke="#2563eb" stroke-width="2"/>
      <line x1="55" y1="115" x2="95" y2="115" stroke="#2563eb" stroke-width="2"/>
      <line x1="95" y1="115" x2="125" y2="35" stroke="#2563eb" stroke-width="2"/>
    </g>

    <!-- Graph (4) -->
    <g transform="translate(365, 160)">
      <rect x="0" y="0" width="155" height="135" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="15" y="20" class="label">(4)</text>
      <line x1="20" y1="115" x2="140" y2="115" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="20" y1="115" x2="20" y2="15" stroke="#0f172a" stroke-width="1.5" marker-end="url(#arrow)"/>
      <text x="15" y="25" class="sublabel">E</text>
      <line x1="25" y1="115" x2="75" y2="35" stroke="#2563eb" stroke-width="2"/>
      <line x1="75" y1="35" x2="125" y2="115" stroke="#2563eb" stroke-width="2"/>
    </g>
  </svg>`,

  // Q171: Planet in elliptical orbit around Sun (S), ratio of momentum at A to B
  q171: `${SVG_HEADER(540, 260)}
    <!-- Orbit -->
    <ellipse cx="270" cy="130" rx="170" ry="85" fill="none" stroke="#2563eb" stroke-width="2.2"/>
    <!-- Major axis -->
    <line x1="90" y1="130" x2="450" y2="130" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,3"/>
    <!-- Sun S at focus -->
    <circle cx="180" cy="130" r="12" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
    <text x="180" y="160" class="label" fill="#b45309">S</text>
    <!-- Point A (perihelion) -->
    <circle cx="100" cy="130" r="5" fill="#dc2626"/>
    <text x="82" y="130" class="label" fill="#dc2626">A</text>
    <line x1="100" y1="130" x2="100" y2="190" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="80" y="175" class="label" fill="#dc2626">V&#8321;</text>
    <!-- Point B (aphelion) -->
    <circle cx="440" cy="130" r="5" fill="#dc2626"/>
    <text x="458" y="130" class="label" fill="#dc2626">B</text>
    <line x1="440" y1="130" x2="440" y2="80" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>
    <text x="460" y="90" class="label" fill="#dc2626">V&#8322;</text>
    <!-- Dimensions r1 and r2 -->
    <line x1="100" y1="105" x2="180" y2="105" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="140" y="92" class="sublabel">r&#8321;</text>
    <line x1="180" y1="105" x2="440" y2="105" stroke="#0f172a" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="310" y="92" class="sublabel">r&#8322;</text>
  </svg>`,

  // Q176: Earth of mass M, radius R with satellite 1 at R and satellite 2 at 2R
  q176: `${SVG_HEADER(540, 260)}
    <!-- Earth -->
    <circle cx="270" cy="130" r="30" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2.5"/>
    <text x="270" y="130" class="label" fill="#1e40af">M</text>
    <!-- Orbit 1 at R -->
    <circle cx="270" cy="130" r="55" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="270" cy="75" r="5" fill="#2563eb"/>
    <text x="270" y="60" class="label" fill="#2563eb">1 (m)</text>
    <!-- Radius line for orbit 1 -->
    <line x1="270" y1="130" x2="270" y2="75" stroke="#2563eb" stroke-width="1.5"/>
    <text x="282" y="105" class="sublabel" fill="#2563eb">R</text>
    <!-- Orbit 2 at 2R -->
    <circle cx="270" cy="130" r="95" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4"/>
    <circle cx="203" cy="197" r="5" fill="#dc2626"/>
    <text x="180" y="210" class="label" fill="#dc2626">2 (m)</text>
    <!-- Radius line for orbit 2 -->
    <line x1="270" y1="130" x2="203" y2="197" stroke="#dc2626" stroke-width="1.5"/>
    <text x="225" y="155" class="sublabel" fill="#dc2626">2R</text>
  </svg>`
};

async function generateAndUpload() {
  const urlMap = {};

  for (const [key, svg] of Object.entries(diagrams)) {
    const pngName = `gravitation_batch2_${key}.png`;
    const backendPath = path.join(outDirBackend, pngName);
    const frontendPath = path.join(outDirFrontend, pngName);

    await sharp(Buffer.from(svg.trim())).png({ quality: 95 }).toFile(backendPath);
    fs.copyFileSync(backendPath, frontendPath);
    console.log(`Rendered PNG: ${pngName}`);

    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum_gravitation',
        public_id: `gravitation_batch2_${key}`,
        overwrite: true,
        resource_type: 'image'
      });
      urlMap[key] = uploadRes.secure_url;
      console.log(`Uploaded to Cloudinary: ${key} -> ${uploadRes.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${key} to Cloudinary:`, err.message);
      urlMap[key] = `/uploads/gravitation/${pngName}`;
    }
  }

  const jsonPath = path.resolve(__dirname, 'gravitation_batch2_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved batch 2 diagram URLs to ${jsonPath}`);
}

generateAndUpload();
