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

const outDirBackend = path.resolve(__dirname, '../uploads/biomolecules');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/biomolecules');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

// 1. Q3: Lysine with pKa values
const svgLysine = `
<svg width="600" height="240" viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Arial', sans-serif;">
  <style>
    .label { font-size: 16px; font-weight: bold; fill: #1e293b; }
    .pka { font-size: 15px; font-weight: bold; fill: #dc2626; }
    .sub { font-size: 11px; }
    .sup { font-size: 11px; }
    .bond { stroke: #1e293b; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .title { font-size: 18px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .arrow { stroke: #dc2626; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#dc2626" />
    </marker>
  </defs>

  <!-- Title / Molecule name -->
  <text x="270" y="225" class="title">Lysine</text>

  <!-- Left H3N+ group -->
  <text x="60" y="80" class="label">H<tspan class="sub" dy="4">3</tspan><tspan dy="-4">N</tspan><tspan class="sup" dy="-6">+</tspan></text>
  <text x="30" y="115" class="pka">pK<tspan class="sub" dy="3">a</tspan><tspan dy="-3"> = 10.79</tspan></text>

  <!-- Zigzag backbone -->
  <!-- C1 to C2 -->
  <line x1="105" y1="75" x2="160" y2="120" class="bond" />
  <!-- C2 to C3 -->
  <line x1="160" y1="120" x2="215" y2="75" class="bond" />
  <!-- C3 to C4 -->
  <line x1="215" y1="75" x2="270" y2="120" class="bond" />
  <!-- C4 to C5 (alpha carbon) -->
  <line x1="270" y1="120" x2="335" y2="75" class="bond" />

  <!-- C5 to COOH -->
  <line x1="335" y1="75" x2="395" y2="115" class="bond" />
  <text x="405" y="125" class="label">COOH</text>
  <text x="405" y="155" class="pka">pK<tspan class="sub" dy="3">a</tspan><tspan dy="-3"> = 2.18</tspan></text>

  <!-- C5 (alpha) to NH3+ branching downwards -->
  <line x1="335" y1="75" x2="335" y2="140" class="bond" />
  <text x="315" y="165" class="label">NH<tspan class="sub" dy="4">3</tspan><tspan class="sup" dy="-10">+</tspan></text>

  <!-- Arrow pointing to alpha NH3+ with pKa = 8.95 -->
  <line x1="430" y1="185" x2="365" y2="165" class="arrow" />
  <text x="435" y="190" class="pka">pK<tspan class="sub" dy="3">a</tspan><tspan dy="-3"> = 8.95</tspan></text>
</svg>
`;

// 2. Q43: Amino Acid with Acidic Sites x, y, z
const svgQ43 = `
<svg width="600" height="220" viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Arial', sans-serif;">
  <style>
    .label { font-size: 18px; font-weight: bold; fill: #1e293b; }
    .tag { font-size: 20px; font-weight: 900; fill: #dc2626; }
    .sub { font-size: 12px; }
    .sup { font-size: 12px; }
    .bond { stroke: #1e293b; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
  </style>

  <!-- Left: H3N+ (site z) -->
  <text x="70" y="80" class="label">H<tspan class="sub" dy="4">3</tspan><tspan dy="-4">N</tspan><tspan class="sup" dy="-8">+</tspan></text>
  <text x="90" y="115" class="tag">(z)</text>

  <!-- Backbone -->
  <line x1="120" y1="75" x2="200" y2="125" class="bond" />
  <line x1="200" y1="125" x2="280" y2="75" class="bond" />

  <!-- Middle: COOH (site x) -->
  <line x1="280" y1="75" x2="280" y2="35" class="bond" />
  <text x="255" y="25" class="label">COOH</text>
  <text x="325" y="25" class="tag">(x)</text>

  <!-- Backbone continues to y -->
  <line x1="280" y1="75" x2="360" y2="125" class="bond" />
  <line x1="360" y1="125" x2="430" y2="80" class="bond" />

  <!-- Right: NH2 (site y) -->
  <text x="440" y="80" class="label">NH<tspan class="sub" dy="4">2</tspan></text>
  <text x="450" y="115" class="tag">(y)</text>
</svg>
`;

// 3. Q4: Uracil Structure (Assertion-Reason Q4)
const svgUracil = `
<svg width="450" height="260" viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Arial', sans-serif;">
  <style>
    .atom { font-size: 18px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    .bond { stroke: #1e293b; stroke-width: 3; stroke-linecap: round; }
    .double-bond { stroke: #1e293b; stroke-width: 3; }
    .caption { font-size: 16px; font-weight: bold; fill: #475569; text-anchor: middle; }
  </style>

  <!-- Top C=O -->
  <text x="225" y="65" class="atom">C</text>
  <!-- Double bond to =O -->
  <line x1="220" y1="52" x2="220" y2="22" class="double-bond" />
  <line x1="230" y1="52" x2="230" y2="22" class="double-bond" />
  <text x="225" y="14" class="atom">O</text>

  <!-- Top-left: HC -->
  <line x1="210" y1="70" x2="165" y2="95" class="bond" />
  <text x="150" y="105" class="atom">HC</text>

  <!-- Left: HC=CH double bond -->
  <line x1="145" y1="118" x2="145" y2="162" class="double-bond" />
  <line x1="155" y1="118" x2="155" y2="162" class="double-bond" />
  <text x="150" y="175" class="atom">HC</text>

  <!-- Bottom-left: to NH -->
  <line x1="165" y1="185" x2="210" y2="208" class="bond" />
  <text x="225" y="215" class="atom">NH</text>

  <!-- Bottom-right: NH to C=O -->
  <line x1="240" y1="208" x2="285" y2="185" class="bond" />
  <text x="300" y="175" class="atom">C</text>

  <!-- Double bond to bottom =O -->
  <line x1="310" y1="180" x2="340" y2="198" class="double-bond" />
  <line x1="315" y1="171" x2="345" y2="189" class="double-bond" />
  <text x="360" y="205" class="atom">O</text>

  <!-- Right: C to NH -->
  <line x1="300" y1="162" x2="300" y2="118" class="bond" />
  <text x="300" y="105" class="atom">NH</text>

  <!-- Top-right: NH to Top C -->
  <line x1="285" y1="95" x2="240" y2="70" class="bond" />

  <text x="225" y="250" class="caption">Structure of Uracil (2,4-dioxopyrimidine)</text>
</svg>
`;

// 4. Q2: Osazone reaction products options
const svgQ2Products = `
<svg width="650" height="280" viewBox="0 0 650 280" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: 'Arial', sans-serif;">
  <style>
    .opt-title { font-size: 16px; font-weight: bold; fill: #1e293b; }
    .chem-text { font-size: 16px; font-weight: bold; fill: #0f172a; }
    .bond { stroke: #1e293b; stroke-width: 2.5; fill: none; }
    .ring { stroke: #1e293b; stroke-width: 2.5; fill: none; }
    .circle { stroke: #1e293b; stroke-width: 2; fill: none; }
  </style>

  <!-- Option 1 -->
  <text x="20" y="45" class="opt-title">(1)</text>
  <!-- Benzene ring -->
  <polygon points="75,25 95,37 95,60 75,72 55,60 55,37" class="ring" />
  <circle cx="75" cy="48" r="13" class="circle" />
  <line x1="95" y1="48" x2="115" y2="48" class="bond" />
  <text x="120" y="53" class="chem-text">NH<tspan font-size="12px" dy="3">2</tspan></text>
  <text x="175" y="53" class="chem-text">and   N&#776;H<tspan font-size="12px" dy="3">3</tspan></text>

  <!-- Option 2 -->
  <text x="340" y="45" class="opt-title">(2)</text>
  <!-- Benzene ring -->
  <polygon points="395,25 415,37 415,60 395,72 375,60 375,37" class="ring" />
  <circle cx="395" cy="48" r="13" class="circle" />
  <line x1="415" y1="48" x2="435" y2="48" class="bond" />
  <text x="440" y="53" class="chem-text">NH<tspan font-size="12px" dy="3">2</tspan></text>
  <text x="495" y="53" class="chem-text">and   NH<tspan font-size="12px" dy="3">2</tspan>OH</text>

  <!-- Option 3 -->
  <text x="20" y="160" class="opt-title">(3)</text>
  <!-- Benzene ring -->
  <polygon points="75,140 95,152 95,175 75,187 55,175 55,152" class="ring" />
  <circle cx="75" cy="163" r="13" class="circle" />
  <line x1="95" y1="163" x2="115" y2="163" class="bond" />
  <text x="120" y="168" class="chem-text">NH — NHOH   and   NH<tspan font-size="12px" dy="3">3</tspan></text>

  <!-- Option 4 -->
  <text x="340" y="160" class="opt-title">(4)</text>
  <text x="380" y="168" class="chem-text">NH<tspan font-size="12px" dy="3">2</tspan>OH   and   H<tspan font-size="12px" dy="3">2</tspan>O</text>
</svg>
`;

async function generateAndUpload() {
  const svgs = [
    { name: 'q3_lysine_pka', svg: svgLysine },
    { name: 'q43_amino_acid_acidity', svg: svgQ43 },
    { name: 'q4_uracil_structure', svg: svgUracil },
    { name: 'q2_osazone_products', svg: svgQ2Products },
  ];

  const results = {};

  for (const item of svgs) {
    const pngBuffer = await sharp(Buffer.from(item.svg)).png().toBuffer();
    
    // Save locally to backend/uploads/biomolecules/
    const bePath = path.join(outDirBackend, `${item.name}.png`);
    fs.writeFileSync(bePath, pngBuffer);

    // Save locally to frontend/public/uploads/biomolecules/
    const fePath = path.join(outDirFrontend, `${item.name}.png`);
    fs.writeFileSync(fePath, pngBuffer);

    console.log(`Saved ${item.name}.png to local uploads`);

    // Upload to Cloudinary for reliable CDN hosting
    try {
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'edvedum_biomolecules',
            public_id: item.name,
            overwrite: true,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(pngBuffer);
      });
      console.log(`Uploaded ${item.name} to Cloudinary: ${uploadRes.secure_url}`);
      results[item.name] = {
        localUrl: `/uploads/biomolecules/${item.name}.png`,
        cdnUrl: uploadRes.secure_url,
      };
    } catch (uploadErr) {
      console.warn(`Cloudinary upload failed for ${item.name}:`, uploadErr.message);
      results[item.name] = {
        localUrl: `/uploads/biomolecules/${item.name}.png`,
        cdnUrl: `/uploads/biomolecules/${item.name}.png`,
      };
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'biomolecules_diagrams.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('Finished generating and uploading diagrams!');
}

generateAndUpload().catch(console.error);
