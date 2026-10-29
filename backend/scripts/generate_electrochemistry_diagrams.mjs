import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const outDir = path.resolve(__dirname, 'assets/electrochemistry');
fs.mkdirSync(outDir, { recursive: true });

// 1. Q34: E vs log[Cu2+] Graph
const svgQ34 = `
<svg width="450" height="300" viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2.5; }
    .plotline { stroke: #0284c7; stroke-width: 3; }
    .txt { font-size: 15px; font-weight: bold; fill: #0f172a; }
  </style>

  <!-- Axes -->
  <line x1="80" y1="40" x2="80" y2="240" class="axis" />
  <line x1="80" y1="240" x2="400" y2="240" class="axis" />

  <!-- Labels -->
  <text x="35" y="140" class="txt" transform="rotate(-90 35,140)">E →</text>
  <text x="240" y="275" text-anchor="middle" class="txt">log[Cu<tspan font-size="11px" dy="-4">2+</tspan><tspan font-size="15px" dy="4">] →</tspan></text>
  <text x="65" y="255" class="txt">O</text>

  <!-- Intercept Point A -->
  <circle cx="80" cy="150" r="5" fill="#ef4444" />
  <text x="95" y="155" class="txt" fill="#ef4444">A (0.34 V)</text>

  <!-- Plotline starting at A and increasing with positive slope -->
  <line x1="80" y1="150" x2="340" y2="60" class="plotline" />
</svg>
`;

// 2. Q42: Four Curves for Nernst Equation of Oxidation
const svgQ42 = `
<svg width="600" height="280" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .axis { stroke: #0f172a; stroke-width: 2; }
    .plotline { stroke: #0284c7; stroke-width: 2.5; }
    .lbl { font-size: 13px; font-weight: bold; fill: #1e293b; text-anchor: middle; }
    .sub { font-size: 11px; fill: #475569; text-anchor: middle; }
    .eq { font-size: 10px; font-weight: bold; fill: #047857; text-anchor: middle; }
  </style>

  <!-- (1) Graph 1: Upward slope -->
  <rect x="15" y="20" width="130" height="200" fill="#f8fafc" stroke="#e2e8f0" rx="4" />
  <line x1="35" y1="40" x2="35" y2="180" class="axis" />
  <line x1="35" y1="180" x2="135" y2="180" class="axis" />
  <line x1="35" y1="150" x2="125" y2="70" class="plotline" />
  <text x="25" y="45" class="sub">E</text>
  <text x="85" y="195" class="sub">log[A<tspan font-size="8px" dy="-2">n+</tspan><tspan font-size="11px" dy="2">]</tspan></text>
  <text x="80" y="240" class="lbl">(1)</text>

  <!-- (2) Graph 2: Upward with intercept -->
  <rect x="160" y="20" width="130" height="200" fill="#f8fafc" stroke="#e2e8f0" rx="4" />
  <line x1="180" y1="40" x2="180" y2="180" class="axis" />
  <line x1="180" y1="180" x2="280" y2="180" class="axis" />
  <line x1="180" y1="120" x2="270" y2="50" class="plotline" />
  <text x="170" y="45" class="sub">E</text>
  <text x="230" y="195" class="sub">log[A<tspan font-size="8px" dy="-2">n+</tspan><tspan font-size="11px" dy="2">]</tspan></text>
  <text x="225" y="240" class="lbl">(2)</text>

  <!-- (3) Graph 3: Downward slope -->
  <rect x="305" y="20" width="130" height="200" fill="#f8fafc" stroke="#e2e8f0" rx="4" />
  <line x1="325" y1="40" x2="325" y2="180" class="axis" />
  <line x1="325" y1="180" x2="425" y2="180" class="axis" />
  <line x1="325" y1="70" x2="415" y2="150" class="plotline" />
  <text x="315" y="45" class="sub">E</text>
  <text x="375" y="195" class="sub">log[A<tspan font-size="8px" dy="-2">n+</tspan><tspan font-size="11px" dy="2">]</tspan></text>
  <text x="370" y="240" class="lbl">(3)</text>

  <!-- (4) Graph 4: Downward with negative intercept -->
  <rect x="450" y="20" width="130" height="200" fill="#f8fafc" stroke="#e2e8f0" rx="4" />
  <line x1="470" y1="40" x2="470" y2="180" class="axis" />
  <line x1="470" y1="180" x2="570" y2="180" class="axis" />
  <line x1="470" y1="90" x2="560" y2="170" class="plotline" />
  <text x="460" y="45" class="sub">E</text>
  <text x="520" y="195" class="sub">log[A<tspan font-size="8px" dy="-2">n+</tspan><tspan font-size="11px" dy="2">]</tspan></text>
  <text x="515" y="240" class="lbl">(4)</text>
</svg>
`;

// Helper for standard benzene ring SVG
const benzene = (cx, cy, r = 26) => `
  <polygon points="${cx},${cy-r} ${cx+r*0.866},${cy-r*0.5} ${cx+r*0.866},${cy+r*0.5} ${cx},${cy+r} ${cx-r*0.866},${cy+r*0.5} ${cx-r*0.866},${cy-r*0.5}" stroke="#1e293b" stroke-width="2.5" fill="none" />
  <circle cx="${cx}" cy="${cy}" r="${r*0.6}" stroke="#1e293b" stroke-width="2" fill="none" />
`;

// 3. Q105: Quinhydrone Equilibrium Scheme
const svgQ105 = `
<svg width="550" height="200" viewBox="0 0 550 200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .chem { font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .bond { stroke: #1e293b; stroke-width: 2.5; stroke-linecap: round; }
    .arrow { stroke: #1e293b; stroke-width: 2; fill: none; }
  </style>

  <!-- Left Molecule: Hydroquinone -->
  ${benzene(100, 100)}
  <line x1="100" y1="74" x2="100" y2="52" class="bond" />
  <text x="100" y="44" class="chem">OH</text>
  <line x1="100" y1="126" x2="100" y2="148" class="bond" />
  <text x="100" y="165" class="chem">OH</text>

  <!-- Equilibrium double arrow -->
  <line x1="170" y1="96" x2="230" y2="96" class="arrow" />
  <polygon points="230 96, 222 92, 222 100" fill="#1e293b" />
  <line x1="230" y1="104" x2="170" y2="104" class="arrow" />
  <polygon points="170 104, 178 100, 178 108" fill="#1e293b" />

  <!-- Right Molecule: Benzoquinone -->
  <polygon points="300,74 322.5,87 322.5,113 300,126 277.5,113 277.5,87" stroke="#1e293b" stroke-width="2.5" fill="none" />
  <!-- Double bonds inside ring -->
  <line x1="319" y1="90" x2="319" y2="110" class="bond" />
  <line x1="281" y1="90" x2="281" y2="110" class="bond" />
  <!-- Double bond to O top -->
  <line x1="298" y1="74" x2="298" y2="52" class="bond" />
  <line x1="302" y1="74" x2="302" y2="52" class="bond" />
  <text x="300" y="44" class="chem">O</text>
  <!-- Double bond to O bottom -->
  <line x1="298" y1="126" x2="298" y2="148" class="bond" />
  <line x1="302" y1="126" x2="302" y2="148" class="bond" />
  <text x="300" y="165" class="chem">O</text>

  <!-- Plus 2H+ + 2e- -->
  <text x="420" y="105" class="chem" font-size="18px">+ 2H<tspan font-size="13px" dy="-5">+</tspan><tspan font-size="18px" dy="5"> + 2e</tspan><tspan font-size="13px" dy="-5">-</tspan></text>
</svg>
`;

// 4. Q175: Latimer EMF Diagram for Iron
const svgQ175 = `
<svg width="500" height="150" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .species { font-size: 18px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .voltage { font-size: 15px; font-weight: bold; fill: #dc2626; text-anchor: middle; }
    .arrow { stroke: #1e293b; stroke-width: 2.5; fill: none; marker-end: url(#arrow-black); }
  </style>
  <defs>
    <marker id="arrow-black" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Species FeO4^2- -->
  <text x="80" y="80" class="species">FeO<tspan font-size="13px" dy="4">4</tspan><tspan font-size="13px" dy="-8">2-</tspan></text>

  <!-- Arrow 1 with 2.20 V -->
  <line x1="130" y1="75" x2="230" y2="75" class="arrow" />
  <text x="180" y="60" class="voltage">+2.20 V</text>

  <!-- Species Fe3+ -->
  <text x="270" y="80" class="species">Fe<tspan font-size="13px" dy="-6">3+</tspan></text>

  <!-- Arrow 2 with 0.77 V -->
  <line x1="310" y1="75" x2="410" y2="75" class="arrow" />
  <text x="360" y="60" class="voltage">+0.77 V</text>

  <!-- Species Fe2+ -->
  <text x="450" y="80" class="species">Fe<tspan font-size="13px" dy="-6">2+</tspan></text>
</svg>
`;

const DIAGRAMS = [
  { key: 'q34_nernst_cu_graph', svg: svgQ34 },
  { key: 'q42_oxidation_nernst_graphs', svg: svgQ42 },
  { key: 'q105_quinhydrone_scheme', svg: svgQ105 },
  { key: 'q175_iron_latimer_diagram', svg: svgQ175 },
];

async function generateAndUpload() {
  console.log('--- Generating and Uploading Electrochemistry Diagrams ---');
  const urls = {};

  for (const item of DIAGRAMS) {
    const pngPath = path.join(outDir, `${item.key}.png`);
    await sharp(Buffer.from(item.svg))
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(pngPath);
    console.log(`Rendered PNG: ${pngPath}`);

    const uploadRes = await cloudinary.uploader.upload(pngPath, {
      folder: 'edvedum_electrochemistry',
      public_id: item.key,
      overwrite: true,
    });
    console.log(`Uploaded ${item.key}: ${uploadRes.secure_url}`);
    urls[item.key] = uploadRes.secure_url;
  }

  const jsonPath = path.resolve(__dirname, 'electrochemistry_diagrams.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2));
  console.log(`Saved diagram URLs to ${jsonPath}`);
}

generateAndUpload().catch(console.error);
