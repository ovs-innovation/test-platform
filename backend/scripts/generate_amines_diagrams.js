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

const outDirBackend = path.resolve(__dirname, '../uploads/amines');
const outDirFrontend = path.resolve(__dirname, '../../frontend/public/uploads/amines');
fs.mkdirSync(outDirBackend, { recursive: true });
fs.mkdirSync(outDirFrontend, { recursive: true });

// Helper for standard benzene ring SVG
const benzene = (cx, cy, r = 24) => `
  <polygon points="${cx},${cy-r} ${cx+r*0.866},${cy-r*0.5} ${cx+r*0.866},${cy+r*0.5} ${cx},${cy+r} ${cx-r*0.866},${cy+r*0.5} ${cx-r*0.866},${cy-r*0.5}" stroke="#1e293b" stroke-width="2.5" fill="none" />
  <circle cx="${cx}" cy="${cy}" r="${r*0.6}" stroke="#1e293b" stroke-width="2" fill="none" />
`;

// 1. Q1: Substituted Anilines
const svgQ1 = `
<svg width="650" height="180" viewBox="0 0 650 180" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .label { font-size: 16px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .chem { font-size: 15px; font-weight: bold; fill: #1e293b; text-anchor: middle; }
    .bond { stroke: #1e293b; stroke-width: 2.5; stroke-linecap: round; }
  </style>

  <!-- Compound I: Aniline -->
  ${benzene(80, 80)}
  <line x1="80" y1="56" x2="80" y2="35" class="bond" />
  <text x="80" y="25" class="chem">N&#776;H<tspan font-size="11px" dy="3">2</tspan></text>
  <text x="80" y="145" class="label">I</text>

  <!-- Compound II: p-Anisidine -->
  ${benzene(240, 80)}
  <line x1="240" y1="56" x2="240" y2="35" class="bond" />
  <text x="240" y="25" class="chem">N&#776;H<tspan font-size="11px" dy="3">2</tspan></text>
  <line x1="240" y1="104" x2="240" y2="125" class="bond" />
  <text x="240" y="145" class="chem">OMe</text>
  <text x="240" y="170" class="label">II</text>

  <!-- Compound III: m-Anisidine -->
  ${benzene(400, 80)}
  <line x1="400" y1="56" x2="400" y2="35" class="bond" />
  <text x="400" y="25" class="chem">N&#776;H<tspan font-size="11px" dy="3">2</tspan></text>
  <line x1="421" y1="92" x2="445" y2="105" class="bond" />
  <text x="475" y="112" class="chem">OMe</text>
  <text x="400" y="145" class="label">III</text>

  <!-- Compound IV: p-Nitroaniline -->
  ${benzene(560, 80)}
  <line x1="560" y1="56" x2="560" y2="35" class="bond" />
  <text x="560" y="25" class="chem">N&#776;H<tspan font-size="11px" dy="3">2</tspan></text>
  <line x1="560" y1="104" x2="560" y2="125" class="bond" />
  <text x="560" y="145" class="chem">NO<tspan font-size="11px" dy="3">2</tspan></text>
  <text x="560" y="170" class="label">IV</text>
</svg>
`;

// 2. Q2: Benzamide Reaction Scheme
const svgQ2 = `
<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .chem { font-size: 16px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .reagent { font-size: 14px; font-weight: bold; fill: #dc2626; text-anchor: middle; }
    .arrow { stroke: #1e293b; stroke-width: 2.5; fill: none; marker-end: url(#arrowhead); }
    .bond { stroke: #1e293b; stroke-width: 2.5; stroke-linecap: round; }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Starting Benzamide -->
  ${benzene(90, 100)}
  <line x1="111" y1="100" x2="140" y2="100" class="bond" />
  <text x="175" y="105" class="chem">CONH<tspan font-size="12px" dy="3">2</tspan></text>

  <!-- Top Arrow to A -->
  <line x1="220" y1="85" x2="380" y2="50" class="arrow" />
  <text x="300" y="55" class="reagent">Br<tspan font-size="11px" dy="3">2</tspan> / NaOH</text>
  <text x="420" y="55" class="chem">A (Aniline)</text>

  <!-- Bottom Arrow to B -->
  <line x1="220" y1="115" x2="380" y2="150" class="arrow" />
  <text x="300" y="145" class="reagent">(i) LiAlH<tspan font-size="11px" dy="3">4</tspan>, (ii) H<tspan font-size="11px" dy="3">2</tspan>O</text>
  <text x="440" y="155" class="chem">B (Benzylamine)</text>
</svg>
`;

// 3. Q3: o-Bromoanisole Benzyne Reaction
const svgQ3 = `
<svg width="550" height="180" viewBox="0 0 550 180" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .chem { font-size: 16px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .reagent { font-size: 14px; font-weight: bold; fill: #dc2626; text-anchor: middle; }
    .arrow { stroke: #1e293b; stroke-width: 2.5; fill: none; marker-end: url(#arrowhead); }
    .bond { stroke: #1e293b; stroke-width: 2.5; stroke-linecap: round; }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
    </marker>
  </defs>

  <!-- o-Bromoanisole -->
  ${benzene(90, 90)}
  <line x1="90" y1="66" x2="90" y2="40" class="bond" />
  <text x="90" y="30" class="chem">OCH<tspan font-size="12px" dy="3">3</tspan></text>
  <line x1="111" y1="102" x2="135" y2="115" class="bond" />
  <text x="150" y="125" class="chem">Br</text>

  <!-- Arrow -->
  <line x1="175" y1="90" x2="350" y2="90" class="arrow" />
  <text x="260" y="75" class="reagent">KNH<tspan font-size="11px" dy="3">2</tspan> / NH<tspan font-size="11px" dy="3">3</tspan></text>
  <text x="260" y="115" class="reagent">-33 °C</text>

  <text x="430" y="95" class="chem">A (major)</text>
</svg>
`;

// 4. Q5: Nitrobenzene Reduction Paths
const svgQ5 = `
<svg width="550" height="200" viewBox="0 0 550 200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .chem { font-size: 16px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .reagent { font-size: 15px; font-weight: bold; fill: #dc2626; text-anchor: middle; }
    .arrow { stroke: #1e293b; stroke-width: 2.5; fill: none; marker-end: url(#arrowhead); }
    .bond { stroke: #1e293b; stroke-width: 2.5; stroke-linecap: round; }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Nitrobenzene -->
  ${benzene(80, 100)}
  <line x1="101" y1="100" x2="125" y2="100" class="bond" />
  <text x="150" y="105" class="chem">NO<tspan font-size="12px" dy="3">2</tspan></text>

  <!-- Top Arrow to Aniline -->
  <line x1="190" y1="85" x2="330" y2="50" class="arrow" />
  <text x="260" y="55" class="reagent">[ A ]</text>
  <text x="410" y="55" class="chem">Ph—NH<tspan font-size="12px" dy="3">2</tspan> (Aniline)</text>

  <!-- Bottom Arrow to Azobenzene -->
  <line x1="190" y1="115" x2="330" y2="150" class="arrow" />
  <text x="260" y="155" class="reagent">[ B ]</text>
  <text x="430" y="155" class="chem">Ph—N=N—Ph (Azobenzene)</text>
</svg>
`;

// 5. Q12: Nitration of Aniline
const svgQ12 = `
<svg width="600" height="180" viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .chem { font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .percent { font-size: 15px; font-weight: bold; fill: #dc2626; text-anchor: middle; }
    .arrow { stroke: #1e293b; stroke-width: 2.5; fill: none; marker-end: url(#arrowhead); }
    .bond { stroke: #1e293b; stroke-width: 2.5; stroke-linecap: round; }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Aniline -->
  ${benzene(70, 90)}
  <line x1="70" y1="66" x2="70" y2="45" class="bond" />
  <text x="70" y="35" class="chem">NH<tspan font-size="11px" dy="3">2</tspan></text>

  <!-- Arrow -->
  <line x1="115" y1="90" x2="210" y2="90" class="arrow" />
  <text x="160" y="75" class="percent">HNO<tspan font-size="11px" dy="3">3</tspan>/H<tspan font-size="11px" dy="3">2</tspan>SO<tspan font-size="11px" dy="3">4</tspan></text>

  <!-- Products -->
  <!-- para: x% -->
  ${benzene(270, 90, 20)}
  <line x1="270" y1="70" x2="270" y2="52" class="bond" />
  <text x="270" y="45" class="chem">NH<tspan font-size="10px" dy="3">2</tspan></text>
  <line x1="270" y1="110" x2="270" y2="128" class="bond" />
  <text x="270" y="145" class="chem">NO<tspan font-size="10px" dy="3">2</tspan></text>
  <text x="270" y="170" class="percent">x% (51%)</text>

  <text x="320" y="95" class="chem">+</text>

  <!-- meta: y% -->
  ${benzene(375, 90, 20)}
  <line x1="375" y1="70" x2="375" y2="52" class="bond" />
  <text x="375" y="45" class="chem">NH<tspan font-size="10px" dy="3">2</tspan></text>
  <line x1="392" y1="100" x2="410" y2="110" class="bond" />
  <text x="430" y="118" class="chem">NO<tspan font-size="10px" dy="3">2</tspan></text>
  <text x="375" y="170" class="percent">y% (47%)</text>

  <text x="470" y="95" class="chem">+</text>

  <!-- ortho: 2% -->
  ${benzene(520, 90, 20)}
  <line x1="520" y1="70" x2="520" y2="52" class="bond" />
  <text x="520" y="45" class="chem">NH<tspan font-size="10px" dy="3">2</tspan></text>
  <line x1="537" y1="80" x2="555" y2="70" class="bond" />
  <text x="575" y="65" class="chem">NO<tspan font-size="10px" dy="3">2</tspan></text>
  <text x="520" y="170" class="percent">2% (z)</text>
</svg>
`;

// 6. Q82: p-Nitrotoluene Roadmap
const svgQ82 = `
<svg width="650" height="240" viewBox="0 0 650 240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Arial', sans-serif;">
  <style>
    .chem { font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
    .reagent { font-size: 13px; font-weight: bold; fill: #dc2626; text-anchor: middle; }
    .arrow { stroke: #1e293b; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
    .bond { stroke: #1e293b; stroke-width: 2.5; stroke-linecap: round; }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Starting p-Nitrotoluene -->
  ${benzene(70, 110, 22)}
  <line x1="70" y1="88" x2="70" y2="70" class="bond" />
  <text x="70" y="60" class="chem">CH<tspan font-size="11px" dy="3">3</tspan></text>
  <line x1="70" y1="132" x2="70" y2="150" class="bond" />
  <text x="70" y="168" class="chem">NO<tspan font-size="11px" dy="3">2</tspan></text>

  <!-- Arrow to A -->
  <line x1="110" y1="110" x2="190" y2="110" class="arrow" />
  <text x="150" y="95" class="reagent">Br<tspan font-size="10px" dy="3">2</tspan> / FeBr<tspan font-size="10px" dy="3">3</tspan></text>
  <text x="210" y="115" class="chem">A</text>

  <!-- Arrow to B -->
  <line x1="230" y1="110" x2="300" y2="110" class="arrow" />
  <text x="265" y="95" class="reagent">Sn / HCl</text>
  <text x="320" y="115" class="chem">B</text>

  <!-- Arrow to C -->
  <line x1="340" y1="110" x2="430" y2="110" class="arrow" />
  <text x="385" y="95" class="reagent">NaNO<tspan font-size="10px" dy="3">2</tspan>+HCl</text>
  <text x="385" y="130" class="reagent">0-5 °C</text>
  <text x="450" y="115" class="chem">C</text>

  <!-- Arrow to D -->
  <line x1="470" y1="110" x2="560" y2="110" class="arrow" />
  <text x="515" y="95" class="reagent">H<tspan font-size="10px" dy="3">3</tspan>PO<tspan font-size="10px" dy="3">2</tspan>/H<tspan font-size="10px" dy="3">2</tspan>O</text>
  <text x="590" y="115" class="chem">D</text>

  <!-- Downward Arrow from p-Nitrotoluene to E -->
  <line x1="70" y1="180" x2="70" y2="215" class="arrow" />
  <text x="125" y="200" class="reagent">KMnO<tspan font-size="10px" dy="3">4</tspan> / OH⁻</text>
  <text x="70" y="235" class="chem">E (p-nitrobenzoic acid)</text>
</svg>
`;

async function generateAndUpload() {
  const svgs = [
    { name: 'amines_q1_basic_strength', svg: svgQ1 },
    { name: 'amines_q2_benzamide_reactions', svg: svgQ2 },
    { name: 'amines_q3_benzyne_reaction', svg: svgQ3 },
    { name: 'amines_q5_nitrobenzene_reduction', svg: svgQ5 },
    { name: 'amines_q12_nitration_aniline', svg: svgQ12 },
    { name: 'amines_q82_roadmap', svg: svgQ82 },
  ];

  const results = {};

  for (const item of svgs) {
    const pngBuffer = await sharp(Buffer.from(item.svg)).png().toBuffer();
    
    // Save locally to backend/uploads/amines/
    const bePath = path.join(outDirBackend, `${item.name}.png`);
    fs.writeFileSync(bePath, pngBuffer);

    // Save locally to frontend/public/uploads/amines/
    const fePath = path.join(outDirFrontend, `${item.name}.png`);
    fs.writeFileSync(fePath, pngBuffer);

    console.log(`Saved ${item.name}.png locally`);

    // Upload to Cloudinary for reliable global CDN delivery
    try {
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'edvedum_amines',
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
        localUrl: `/uploads/amines/${item.name}.png`,
        cdnUrl: uploadRes.secure_url,
      };
    } catch (uploadErr) {
      console.warn(`Cloudinary upload failed for ${item.name}:`, uploadErr.message);
      results[item.name] = {
        localUrl: `/uploads/amines/${item.name}.png`,
        cdnUrl: `/uploads/amines/${item.name}.png`,
      };
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'amines_diagrams.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('Finished generating and uploading Amines diagrams!');
}

generateAndUpload().catch(console.error);
