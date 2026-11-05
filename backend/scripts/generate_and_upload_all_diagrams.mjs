import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Common SVG Styling
const SVG_HEADER = (w = 680, h = 420) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <linearGradient id="cortexGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
    <linearGradient id="medullaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#fed7aa" stop-opacity="0.4"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.08"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0f172a"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a"/>
    </marker>
  </defs>
`;

// ==========================================
// 1. EXCRETORY PRODUCTS DIAGRAMS
// ==========================================

// Q46: Nephron reabsorption & secretion with A, B, C, D
function createQ46Svg() {
  return `
${SVG_HEADER(700, 460)}
  <!-- Header Title -->
  <rect x="0" y="0" width="700" height="40" fill="#f8fafc" border="1"/>
  <text x="350" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">NEPHRON: REABSORPTION &amp; SECRETION OF MAJOR SUBSTANCES</text>
  <line x1="0" y1="40" x2="700" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Zone Backgrounds -->
  <!-- Cortex (y: 40 to 180) -->
  <rect x="20" y="45" width="660" height="135" rx="6" fill="#f8fafc" stroke="#e2e8f0"/>
  <text x="35" y="65" font-size="12" font-weight="700" fill="#64748b" letter-spacing="1">CORTEX</text>

  <!-- Medulla (y: 185 to 380) -->
  <rect x="20" y="185" width="660" height="195" rx="6" fill="#fffbeb" stroke="#fef3c7"/>
  <text x="35" y="205" font-size="12" font-weight="700" fill="#d97706" letter-spacing="1">MEDULLA</text>

  <!-- Bowman's Capsule & Glomerulus -->
  <circle cx="120" cy="100" r="24" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
  <path d="M 120 76 C 100 76 90 95 90 105 C 90 120 105 130 125 130 C 145 130 155 115 155 105 C 155 85 135 76 120 76" fill="none" stroke="#0f172a" stroke-width="3"/>
  <text x="120" y="105" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">Glomerulus</text>

  <!-- PCT Tubule -->
  <path d="M 155 105 Q 185 70 215 100 T 265 110 T 300 130" fill="none" stroke="#2563eb" stroke-width="4.5" stroke-linecap="round"/>
  <text x="210" y="70" text-anchor="middle" font-size="11" font-weight="700" fill="#2563eb">PCT</text>

  <!-- Descending Limb (Loop of Henle) -->
  <path d="M 300 130 L 300 320 Q 320 355 340 320" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
  <text x="240" y="235" font-size="11" font-weight="600" fill="#475569">Descending Limb</text>

  <!-- Reabsorption Arrow A from Descending limb -->
  <line x1="300" y1="240" x2="230" y2="240" stroke="#0284c7" stroke-width="3" marker-end="url(#arrow-blue)"/>
  <rect x="175" y="222" width="50" height="36" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" filter="url(#shadow)"/>
  <text x="200" y="245" text-anchor="middle" font-size="16" font-weight="800" fill="#0369a1">A</text>

  <!-- Ascending Limb (Loop of Henle) -->
  <path d="M 340 320 L 340 140" fill="none" stroke="#0f172a" stroke-width="5.5" stroke-linecap="round"/>
  <text x="350" y="235" font-size="11" font-weight="600" fill="#475569">Ascending Limb</text>

  <!-- Transport Arrow B from Ascending limb -->
  <line x1="340" y1="240" x2="410" y2="240" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow-green)"/>
  <rect x="415" y="222" width="50" height="36" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" filter="url(#shadow)"/>
  <text x="440" y="245" text-anchor="middle" font-size="16" font-weight="800" fill="#15803d">B</text>

  <!-- DCT Tubule -->
  <path d="M 340 140 Q 370 90 420 100 T 470 95 T 510 110" fill="none" stroke="#7c3aed" stroke-width="4.5" stroke-linecap="round"/>
  <text x="440" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed">DCT</text>

  <!-- Reabsorption Arrow D from DCT -->
  <line x1="440" y1="100" x2="440" y2="140" stroke="#7c3aed" stroke-width="3" marker-end="url(#arrow)"/>
  <rect x="415" y="145" width="50" height="34" rx="6" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" filter="url(#shadow)"/>
  <text x="440" y="168" text-anchor="middle" font-size="16" font-weight="800" fill="#6d28d9">D</text>

  <!-- Collecting Duct -->
  <path d="M 510 110 L 530 110 L 530 365" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round"/>
  <text x="545" y="130" font-size="11" font-weight="700" fill="#ea580c">Collecting Duct</text>

  <!-- Diffusion Arrow C from Collecting Duct -->
  <line x1="530" y1="300" x2="465" y2="300" stroke="#ea580c" stroke-width="3" marker-end="url(#arrow-red)"/>
  <rect x="410" y="282" width="50" height="36" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="2" filter="url(#shadow)"/>
  <text x="435" y="305" text-anchor="middle" font-size="16" font-weight="800" fill="#c2410c">C</text>

  <!-- Options Reference Bar at Bottom -->
  <rect x="20" y="390" width="660" height="55" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="40" y="422" font-size="12" font-weight="700" fill="#334155">Labels to Identify:</text>
  <text x="170" y="422" font-size="13" font-weight="600" fill="#0369a1">A = Reabsorbed in Descending limb</text>
  <text x="420" y="422" font-size="13" font-weight="600" fill="#15803d">B = Transported out of Ascending limb</text>
  <text x="170" y="438" font-size="13" font-weight="600" fill="#c2410c">C = Diffuses from Collecting Duct</text>
  <text x="420" y="438" font-size="13" font-weight="600" fill="#6d28d9">D = Reabsorbed at DCT</text>
</svg>
`;
}

// Q83: Nephron Hormonal Target Areas (ADH, Aldosterone, ANF)
function createQ83Svg() {
  return `
${SVG_HEADER(700, 480)}
  <rect x="0" y="0" width="700" height="40" fill="#f8fafc"/>
  <text x="350" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">NEPHRON: HORMONAL REGULATION &amp; TARGET SITES</text>
  <line x1="0" y1="40" x2="700" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Left: Nephron Outline -->
  <g transform="translate(40, 50)">
    <!-- JGA & Afferent Arteriole -->
    <circle cx="80" cy="80" r="28" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <text x="80" y="84" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">Glomerulus</text>
    <path d="M 40 50 L 70 65" stroke="#ef4444" stroke-width="4"/>
    <text x="40" y="42" font-size="10" font-weight="700" fill="#b91c1c">Afferent Arteriole / JGA</text>

    <!-- Target c Callout pointing to JGA -->
    <rect x="10" y="115" width="120" height="34" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2" filter="url(#shadow)"/>
    <text x="70" y="137" text-anchor="middle" font-size="13" font-weight="800" fill="#b91c1c">Target Area (c)</text>
    <line x1="70" y1="115" x2="80" y2="108" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)"/>

    <!-- Tubule System -->
    <!-- PCT -->
    <path d="M 108 80 Q 140 40 180 70 T 210 110" fill="none" stroke="#2563eb" stroke-width="4.5" stroke-linecap="round"/>
    <text x="160" y="50" font-size="11" font-weight="700" fill="#2563eb">PCT</text>

    <!-- Henle's Loop -->
    <path d="M 210 110 L 210 280 Q 230 310 250 280 L 250 110" fill="none" stroke="#0f172a" stroke-width="4.5" stroke-linecap="round"/>
    <text x="230" y="325" text-anchor="middle" font-size="11" font-weight="600" fill="#475569">Loop of Henle</text>

    <!-- DCT -->
    <path d="M 250 110 Q 280 60 320 80 T 360 110" fill="none" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <text x="300" y="60" font-size="11" font-weight="700" fill="#7c3aed">DCT</text>

    <!-- Target b Callout pointing to DCT -->
    <rect x="250" y="15" width="120" height="34" rx="6" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2" filter="url(#shadow)"/>
    <text x="310" y="37" text-anchor="middle" font-size="13" font-weight="800" fill="#6d28d9">Target Area (b)</text>
    <line x1="310" y1="49" x2="310" y2="72" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Collecting Duct -->
    <path d="M 360 110 L 380 110 L 380 320" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round"/>
    <text x="330" y="340" font-size="11" font-weight="700" fill="#ea580c">Collecting Duct</text>

    <!-- Target a Callout pointing to Collecting Duct / Late DCT -->
    <rect x="290" y="210" width="120" height="34" rx="6" fill="#fff7ed" stroke="#ea580c" stroke-width="2" filter="url(#shadow)"/>
    <text x="350" y="232" text-anchor="middle" font-size="13" font-weight="800" fill="#c2410c">Target Area (a)</text>
    <line x1="350" y1="210" x2="380" y2="180" stroke="#ea580c" stroke-width="2" marker-end="url(#arrow-red)"/>
  </g>

  <!-- Right: Matching Information Cards -->
  <g transform="translate(460, 55)">
    <rect x="0" y="0" width="220" height="120" rx="6" fill="#fff7ed" stroke="#fdba74"/>
    <text x="12" y="24" font-size="12" font-weight="700" fill="#c2410c">a. Antidiuretic Hormone (ADH)</text>
    <text x="12" y="45" font-size="11" fill="#431407">Target: Collecting duct &amp; DCT</text>
    <text x="12" y="65" font-size="10.5" fill="#7c2d12">Action: Increases water</text>
    <text x="12" y="80" font-size="10.5" fill="#7c2d12">permeability via aquaporins</text>
    <text x="12" y="105" font-size="11" font-weight="700" fill="#ea580c">Matches Action (ii)</text>

    <rect x="0" y="130" width="220" height="120" rx="6" fill="#f5f3ff" stroke="#c4b5fd"/>
    <text x="12" y="154" font-size="12" font-weight="700" fill="#6d28d9">b. Aldosterone (Mineralocorticoid)</text>
    <text x="12" y="175" font-size="11" fill="#2e1065">Target: Distal Convoluted Tubule</text>
    <text x="12" y="195" font-size="10.5" fill="#4c1d95">Action: Induces reabsorption of</text>
    <text x="12" y="210" font-size="10.5" fill="#4c1d95">Na+ and water, secretes K+</text>
    <text x="12" y="235" font-size="11" font-weight="700" fill="#7c3aed">Matches Action (iii)</text>

    <rect x="0" y="260" width="220" height="135" rx="6" fill="#fef2f2" stroke="#fca5a5"/>
    <text x="12" y="284" font-size="12" font-weight="700" fill="#b91c1c">c. Atrial Natriuretic Factor (ANF)</text>
    <text x="12" y="305" font-size="11" fill="#450a0a">Target: JGA &amp; Afferent arteriole</text>
    <text x="12" y="325" font-size="10.5" fill="#7f1d1d">Action: Vasodilation, inhibits</text>
    <text x="12" y="340" font-size="10.5" fill="#7f1d1d">renin release and lowers BP</text>
    <text x="12" y="375" font-size="11" font-weight="700" fill="#dc2626">Matches Action (i)</text>
  </g>

  <!-- Footer note -->
  <rect x="20" y="420" width="660" height="45" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="350" y="447" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">Correct Match: a(ii), b(iii), c(i)</text>
</svg>
`;
}

// Q101: Diluting Segment Identification (A, B, C, D)
function createQ101Svg() {
  return `
${SVG_HEADER(640, 420)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">PARTS OF NEPHRON &amp; DILUTING SEGMENT</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Nephron -->
  <g transform="translate(60, 60)">
    <!-- Part A: Bowman's Capsule & PCT -->
    <circle cx="80" cy="50" r="24" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
    <path d="M 104 50 Q 130 20 160 50" fill="none" stroke="#2563eb" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Label A -->
    <rect x="50" y="85" width="60" height="32" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" filter="url(#shadow)"/>
    <text x="80" y="106" text-anchor="middle" font-size="15" font-weight="800" fill="#0369a1">A</text>
    <line x1="80" y1="85" x2="80" y2="74" stroke="#0284c7" stroke-width="2"/>

    <!-- Part B: Descending limb -->
    <path d="M 160 50 L 160 220 Q 180 250 200 220" fill="none" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Label B -->
    <rect x="80" y="160" width="60" height="32" rx="6" fill="#fef9c3" stroke="#ca8a04" stroke-width="2" filter="url(#shadow)"/>
    <text x="110" y="181" text-anchor="middle" font-size="15" font-weight="800" fill="#854d0e">B</text>
    <line x1="140" y1="176" x2="160" y2="176" stroke="#ca8a04" stroke-width="2"/>

    <!-- Part C: Ascending limb (Thick ascending limb) -->
    <path d="M 200 220 L 200 50" fill="none" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>
    <!-- Label C -->
    <rect x="220" y="140" width="60" height="32" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" filter="url(#shadow)"/>
    <text x="250" y="161" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">C</text>
    <line x1="220" y1="156" x2="200" y2="156" stroke="#16a34a" stroke-width="2"/>

    <!-- Part D: DCT & Collecting duct -->
    <path d="M 200 50 Q 230 20 260 50 L 290 50 L 290 240" fill="none" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <!-- Label D -->
    <rect x="310" y="120" width="60" height="32" rx="6" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" filter="url(#shadow)"/>
    <text x="340" y="141" text-anchor="middle" font-size="15" font-weight="800" fill="#6d28d9">D</text>
    <line x1="310" y1="136" x2="290" y2="136" stroke="#7c3aed" stroke-width="2"/>
  </g>

  <!-- Explanation Panel on Right -->
  <g transform="translate(420, 60)">
    <rect x="0" y="0" width="190" height="280" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="25" font-size="13" font-weight="700" fill="#0f172a">Key Concept:</text>
    <text x="15" y="50" font-size="11" font-weight="600" fill="#15803d">• Segment C:</text>
    <text x="22" y="68" font-size="10.5" fill="#334155">Thick Ascending Limb</text>
    <text x="22" y="85" font-size="10.5" fill="#334155">of Henle's Loop.</text>

    <text x="15" y="115" font-size="11" font-weight="600" fill="#0f172a">• Characteristic:</text>
    <text x="22" y="133" font-size="10.5" fill="#334155">Impermeable to water.</text>
    <text x="22" y="150" font-size="10.5" fill="#334155">Actively transports</text>
    <text x="22" y="167" font-size="10.5" fill="#334155">NaCl out of tubular fluid.</text>

    <text x="15" y="195" font-size="11" font-weight="600" fill="#0f172a">• Result:</text>
    <text x="22" y="213" font-size="10.5" fill="#334155">Filtrate becomes</text>
    <text x="22" y="230" font-size="10.5" fill="#334155">hypotonic (dilute),</text>
    <text x="22" y="247" font-size="10.5" font-weight="700" fill="#15803d">hence Diluting Segment!</text>
  </g>

  <!-- Footer -->
  <rect x="20" y="360" width="600" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="386" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Diluting Segment is Part C (Thick Ascending Limb of Loop of Henle)</text>
</svg>
`;
}

// Q116: RAAS Flowchart with A, B, C
function createQ116Svg() {
  return `
${SVG_HEADER(640, 440)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">RENIN-ANGIOTENSIN-ALDOSTERONE SYSTEM (RAAS)</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Step 1: Box A -->
  <rect x="230" y="55" width="180" height="45" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="320" y="83" text-anchor="middle" font-size="17" font-weight="800" fill="#0369a1">[ A ] (Organ: Liver)</text>

  <!-- Arrow down -->
  <line x1="320" y1="100" x2="320" y2="125" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>

  <!-- Angiotensinogen -->
  <rect x="210" y="125" width="220" height="38" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="320" y="149" text-anchor="middle" font-size="14" font-weight="700" fill="#1e293b">Angiotensinogen</text>

  <!-- Renin side branch from Kidney -->
  <rect x="50" y="125" width="90" height="38" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
  <text x="95" y="149" text-anchor="middle" font-size="12" font-weight="700" fill="#b91c1c">Kidney (JGA)</text>
  <line x1="140" y1="144" x2="200" y2="144" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)"/>
  <text x="170" y="137" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">Renin</text>

  <!-- Arrow down -->
  <line x1="320" y1="163" x2="320" y2="190" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>

  <!-- Angiotensin I -->
  <rect x="220" y="190" width="200" height="36" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="320" y="213" text-anchor="middle" font-size="14" font-weight="700" fill="#1e293b">Angiotensin I</text>

  <!-- Box B: ACE / Converting Enzyme side arrow -->
  <line x1="320" y1="226" x2="320" y2="260" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>
  <rect x="440" y="222" width="160" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="520" y="247" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">[ B ] (Lungs / ACE)</text>
  <line x1="440" y1="242" x2="330" y2="242" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow-green)"/>

  <!-- Angiotensin II -->
  <rect x="220" y="260" width="200" height="36" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="320" y="283" text-anchor="middle" font-size="14" font-weight="700" fill="#1e293b">Angiotensin II</text>

  <!-- Arrow down -->
  <line x1="320" y1="296" x2="320" y2="325" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>
  <text x="345" y="315" font-size="10.5" font-weight="600" fill="#64748b">Stimulates</text>

  <!-- Adrenal Cortex -->
  <rect x="220" y="325" width="200" height="34" rx="6" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5"/>
  <text x="320" y="347" text-anchor="middle" font-size="13" font-weight="700" fill="#854d0e">Adrenal Cortex</text>

  <!-- Arrow down -->
  <line x1="320" y1="359" x2="320" y2="385" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>

  <!-- Step 3: Box C -->
  <rect x="200" y="385" width="240" height="42" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="320" y="412" text-anchor="middle" font-size="16" font-weight="800" fill="#c2410c">[ C ] (Aldosterone)</text>
</svg>
`;
}

// Q121: Counter-current substances p, q, r, s
function createQ121Svg() {
  return `
${SVG_HEADER(680, 440)}
  <rect x="0" y="0" width="680" height="40" fill="#f8fafc"/>
  <text x="340" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">REABSORPTION &amp; SECRETION: SUBSTANCES p, q, r, s</text>
  <line x1="0" y1="40" x2="680" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Nephron Tubules -->
  <g transform="translate(60, 50)">
    <!-- PCT -->
    <path d="M 50 60 Q 80 20 120 50 T 160 80" fill="none" stroke="#2563eb" stroke-width="4.5" stroke-linecap="round"/>
    <text x="90" y="25" font-size="11" font-weight="700" fill="#2563eb">PCT</text>

    <!-- Arrow p (Secretion into PCT / tubule) -->
    <line x1="100" y1="75" x2="100" y2="45" stroke="#dc2626" stroke-width="3" marker-end="url(#arrow-red)"/>
    <rect x="75" y="80" width="50" height="34" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2" filter="url(#shadow)"/>
    <text x="100" y="103" text-anchor="middle" font-size="16" font-weight="800" fill="#b91c1c">p</text>

    <!-- Henle's Loop -->
    <path d="M 160 80 L 160 280 Q 190 315 220 280 L 220 80" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
    <text x="130" y="180" font-size="10.5" fill="#64748b">Descending</text>
    <text x="230" y="180" font-size="10.5" fill="#64748b">Ascending</text>

    <!-- Arrow q (Transport out of Ascending limb) -->
    <line x1="220" y1="190" x2="280" y2="190" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow-green)"/>
    <rect x="285" y="173" width="50" height="34" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" filter="url(#shadow)"/>
    <text x="310" y="196" text-anchor="middle" font-size="16" font-weight="800" fill="#15803d">q</text>

    <!-- DCT -->
    <path d="M 220 80 Q 250 40 290 60 T 340 80" fill="none" stroke="#7c3aed" stroke-width="4.5" stroke-linecap="round"/>
    <text x="280" y="40" font-size="11" font-weight="700" fill="#7c3aed">DCT</text>

    <!-- Collecting Duct -->
    <path d="M 340 80 L 360 80 L 360 310" fill="none" stroke="#ea580c" stroke-width="5.5" stroke-linecap="round"/>
    <text x="375" y="100" font-size="11" font-weight="700" fill="#ea580c">Collecting Duct</text>

    <!-- Arrow r (Transport out of Collecting duct) -->
    <line x1="360" y1="240" x2="300" y2="240" stroke="#ea580c" stroke-width="3" marker-end="url(#arrow-red)"/>
    <rect x="245" y="223" width="50" height="34" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="2" filter="url(#shadow)"/>
    <text x="270" y="246" text-anchor="middle" font-size="16" font-weight="800" fill="#c2410c">r</text>

    <!-- Arrow s (Interstitium / Water movement) -->
    <line x1="160" y1="210" x2="110" y2="210" stroke="#0284c7" stroke-width="3" marker-end="url(#arrow-blue)"/>
    <rect x="55" y="193" width="50" height="34" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" filter="url(#shadow)"/>
    <text x="80" y="216" text-anchor="middle" font-size="16" font-weight="800" fill="#0369a1">s</text>
  </g>

  <!-- Bottom Table Reference -->
  <rect x="20" y="375" width="640" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="40" y="406" font-size="13" font-weight="700" fill="#0f172a">Identification:</text>
  <text x="160" y="406" font-size="13" font-weight="600" fill="#b91c1c">p = H+ / NH3</text>
  <text x="280" y="406" font-size="13" font-weight="600" fill="#15803d">q = NaCl</text>
  <text x="400" y="406" font-size="13" font-weight="600" fill="#c2410c">r = Urea</text>
  <text x="510" y="406" font-size="13" font-weight="600" fill="#0369a1">s = H2O</text>
</svg>
`;
}

// Q123: Nephron pH and Ionic Balance (P, Q, R, S)
function createQ123Svg() {
  return `
${SVG_HEADER(680, 430)}
  <rect x="0" y="0" width="680" height="40" fill="#f8fafc"/>
  <text x="340" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">PARTS OF NEPHRON: pH &amp; IONIC REGULATION</text>
  <line x1="0" y1="40" x2="680" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(60, 50)">
    <!-- Part P: PCT -->
    <path d="M 60 70 Q 100 20 140 60 T 180 90" fill="none" stroke="#2563eb" stroke-width="5" stroke-linecap="round"/>
    <rect x="90" y="85" width="60" height="34" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5" filter="url(#shadow)"/>
    <text x="120" y="108" text-anchor="middle" font-size="16" font-weight="800" fill="#1d4ed8">P</text>
    <text x="120" y="135" text-anchor="middle" font-size="10.5" font-weight="700" fill="#2563eb">(PCT)</text>

    <!-- Part Q: Descending limb -->
    <path d="M 180 90 L 180 260 Q 210 295 240 260" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
    <rect x="110" y="170" width="60" height="34" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="2" filter="url(#shadow)"/>
    <text x="140" y="193" text-anchor="middle" font-size="16" font-weight="800" fill="#334155">Q</text>

    <!-- Part R: Ascending limb -->
    <path d="M 240 260 L 240 90" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
    <rect x="250" y="170" width="60" height="34" rx="6" fill="#f1f5f9" stroke="#64748b" stroke-width="2" filter="url(#shadow)"/>
    <text x="280" y="193" text-anchor="middle" font-size="16" font-weight="800" fill="#334155">R</text>

    <!-- Part S: DCT -->
    <path d="M 240 90 Q 275 40 315 65 T 365 85" fill="none" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <rect x="290" y="85" width="60" height="34" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="2.5" filter="url(#shadow)"/>
    <text x="320" y="108" text-anchor="middle" font-size="16" font-weight="800" fill="#6d28d9">S</text>
    <text x="320" y="135" text-anchor="middle" font-size="10.5" font-weight="700" fill="#7c3aed">(DCT)</text>

    <!-- Collecting Duct -->
    <path d="M 365 85 L 385 85 L 385 290" fill="none" stroke="#ea580c" stroke-width="5.5" stroke-linecap="round"/>
    <text x="395" y="110" font-size="11" font-weight="700" fill="#ea580c">Collecting Duct</text>
  </g>

  <!-- Explanation Box on Right -->
  <g transform="translate(480, 60)">
    <rect x="0" y="0" width="175" height="270" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="12" y="24" font-size="12" font-weight="700" fill="#0f172a">Selective Secretion:</text>
    <text x="12" y="50" font-size="11" font-weight="600" fill="#1d4ed8">• Part P (PCT):</text>
    <text x="20" y="68" font-size="10.5" fill="#334155">Secretes H+, NH3</text>
    <text x="20" y="84" font-size="10.5" fill="#334155">and reabsorbs HCO3-</text>

    <text x="12" y="115" font-size="11" font-weight="600" fill="#6d28d9">• Part S (DCT):</text>
    <text x="20" y="133" font-size="10.5" fill="#334155">Capable of selective</text>
    <text x="20" y="149" font-size="10.5" fill="#334155">secretion of H+ and K+</text>
    <text x="20" y="165" font-size="10.5" fill="#334155">ions to maintain pH</text>
    <text x="20" y="181" font-size="10.5" fill="#334155">and ionic balance!</text>

    <rect x="10" y="205" width="155" height="45" rx="6" fill="#dcfce7" stroke="#16a34a"/>
    <text x="87" y="226" text-anchor="middle" font-size="11" font-weight="700" fill="#15803d">Correct Option:</text>
    <text x="87" y="242" text-anchor="middle" font-size="12" font-weight="800" fill="#166534">(4) P and S</text>
  </g>

  <!-- Footer -->
  <rect x="20" y="370" width="640" height="45" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="340" y="398" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Maintenance of pH and ionic balance via H+ &amp; K+ secretion occurs in: P and S</text>
</svg>
`;
}

// ==========================================
// 2. BOTANY RESPIRATION IN PLANTS DIAGRAMS
// ==========================================

// Q40: Fermentation pathway with A, B, C
function createQ40Svg() {
  return `
${SVG_HEADER(640, 420)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">ANAEROBIC RESPIRATION &amp; FERMENTATION PATHWAY</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Glucose -->
  <rect x="230" y="55" width="180" height="34" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
  <text x="320" y="77" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">Glucose</text>
  <line x1="320" y1="89" x2="320" y2="115" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>

  <!-- Glyceraldehyde 3-Phosphate -->
  <rect x="180" y="115" width="280" height="34" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
  <text x="320" y="137" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Glyceraldehyde 3-Phosphate</text>

  <!-- Side branch to C: DHAP -->
  <line x1="460" y1="132" x2="510" y2="132" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow-blue)"/>
  <rect x="515" y="112" width="110" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="570" y="136" text-anchor="middle" font-size="14" font-weight="800" fill="#0369a1">[ C ] (DHAP)</text>

  <!-- Arrow down to Phosphoenolpyruvate -->
  <line x1="320" y1="149" x2="320" y2="175" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>
  <rect x="200" y="175" width="240" height="34" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
  <text x="320" y="197" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Phosphoenol Pyruvic Acid</text>

  <!-- Arrow down to Pyruvic Acid -->
  <line x1="320" y1="209" x2="320" y2="235" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>
  <rect x="230" y="235" width="180" height="36" rx="6" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
  <text x="320" y="258" text-anchor="middle" font-size="14" font-weight="800" fill="#854d0e">Pyruvic Acid</text>

  <!-- Fork to A (Alcohol fermentation) and B (Lactic acid fermentation) -->
  <!-- Left Fork: Branch A -->
  <path d="M 250 271 L 140 320" fill="none" stroke="#ea580c" stroke-width="3" marker-end="url(#arrow-red)"/>
  <rect x="40" y="325" width="200" height="50" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="140" y="348" text-anchor="middle" font-size="15" font-weight="800" fill="#c2410c">[ A ]</text>
  <text x="140" y="366" text-anchor="middle" font-size="12" font-weight="700" fill="#9a3412">Ethanol + CO2</text>

  <!-- Right Fork: Branch B -->
  <path d="M 390 271 L 500 320" fill="none" stroke="#16a34a" stroke-width="3" marker-end="url(#arrow-green)"/>
  <rect x="400" y="325" width="200" height="50" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="500" y="348" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">[ B ]</text>
  <text x="500" y="366" text-anchor="middle" font-size="12" font-weight="700" fill="#166534">Lactic Acid</text>

  <!-- Footer -->
  <rect x="20" y="388" width="600" height="28" rx="4" fill="#f8fafc"/>
  <text x="320" y="406" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">A = Ethanol | B = Lactic acid | C = Dihydroxyacetone phosphate</text>
</svg>
`;
}

// Q59: ATP Synthase complex (A = F0 channel, B = F1 head)
function createQ59Svg() {
  return `
${SVG_HEADER(640, 380)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">ATP SYNTHASE (COMPLEX V) OF MITOCHONDRIA</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Left: Intermembrane space -->
  <rect x="20" y="60" width="160" height="260" rx="6" fill="#e0f2fe" opacity="0.4"/>
  <text x="100" y="90" text-anchor="middle" font-size="12" font-weight="700" fill="#0369a1">Intermembrane Space</text>
  <text x="100" y="110" text-anchor="middle" font-size="11" fill="#0284c7">(High [H+] Concentration)</text>

  <!-- Middle: Inner Mitochondrial Membrane -->
  <rect x="190" y="60" width="130" height="260" rx="4" fill="#cbd5e1" stroke="#94a3b8" stroke-dasharray="4,4"/>
  <text x="255" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Inner Mitochondrial</text>
  <text x="255" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Membrane</text>

  <!-- Channel A (F0 particle) -->
  <rect x="220" y="140" width="70" height="110" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="255" y="185" text-anchor="middle" font-size="20" font-weight="800" fill="#15803d">A</text>
  <text x="255" y="210" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">(F0 channel)</text>

  <!-- Right: Matrix -->
  <rect x="330" y="60" width="290" height="260" rx="6" fill="#fef9c3" opacity="0.3"/>
  <text x="475" y="90" text-anchor="middle" font-size="13" font-weight="700" fill="#854d0e">Mitochondrial Matrix</text>

  <!-- Headpiece B (F1 particle) -->
  <circle cx="390" cy="195" r="48" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="390" y="195" text-anchor="middle" font-size="22" font-weight="800" fill="#c2410c">B</text>
  <text x="390" y="218" text-anchor="middle" font-size="11" font-weight="700" fill="#9a3412">(F1 Headpiece)</text>

  <!-- Proton flow arrow 2H+ -->
  <path d="M 120 195 L 210 195" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)"/>
  <text x="140" y="185" font-size="14" font-weight="800" fill="#2563eb">2H+</text>

  <!-- Catalytic reaction at B -->
  <text x="460" y="190" font-size="12" font-weight="700" fill="#0f172a">ADP + Pi</text>
  <line x1="515" y1="187" x2="540" y2="187" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="550" y="192" font-size="14" font-weight="800" fill="#16a34a">ATP</text>

  <!-- Footer -->
  <rect x="20" y="330" width="600" height="40" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="320" y="355" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0f172a">'A' is integral membrane protein channel (F0); 'B' is peripheral catalytic head (F1)</text>
</svg>
`;
}

// Q74: Interrelationship of metabolic pathways
function createQ74Svg() {
  return `
${SVG_HEADER(640, 420)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">INTERRELATIONSHIP AMONG METABOLIC PATHWAYS</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Fats box -->
  <rect x="240" y="55" width="160" height="34" rx="6" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5"/>
  <text x="320" y="77" text-anchor="middle" font-size="14" font-weight="700" fill="#854d0e">FATS</text>

  <!-- Arrow down -->
  <line x1="320" y1="89" x2="320" y2="115" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>

  <!-- Product A -->
  <rect x="180" y="115" width="280" height="42" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="320" y="141" text-anchor="middle" font-size="15" font-weight="800" fill="#0369a1">[ A ] Fatty acids &amp; Glycerol</text>

  <!-- Arrow down -->
  <line x1="320" y1="157" x2="320" y2="185" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>

  <!-- DHAP & PGAL -->
  <rect x="220" y="185" width="200" height="34" rx="6" fill="#f1f5f9" stroke="#94a3b8"/>
  <text x="320" y="207" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">DHAP  &#8644;  PGAL</text>

  <!-- Arrow down -->
  <line x1="320" y1="219" x2="320" y2="245" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>

  <!-- Product B -->
  <rect x="200" y="245" width="240" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="320" y="270" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">[ B ] Pyruvic acid</text>

  <!-- Arrow down -->
  <line x1="320" y1="285" x2="320" y2="310" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>

  <!-- Product C -->
  <rect x="200" y="310" width="240" height="40" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="320" y="335" text-anchor="middle" font-size="15" font-weight="800" fill="#c2410c">[ C ] Acetyl CoA</text>

  <!-- Arrow down to Krebs Cycle -->
  <line x1="320" y1="350" x2="320" y2="375" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arrow)"/>
  <ellipse cx="320" cy="395" rx="90" ry="18" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.5"/>
  <text x="320" y="399" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">Krebs' cycle &#8594; CO2 + H2O</text>
</svg>
`;
}

// Q76: ATP Synthase F0-F1 labels A, B, C, D
function createQ76Svg() {
  return `
${SVG_HEADER(640, 420)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">DIAGRAMMATIC REPRESENTATION OF ATP SYNTHESIS</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Outer Side (Intermembrane Space) -->
  <rect x="30" y="55" width="130" height="290" rx="6" fill="#e0f2fe" opacity="0.4"/>
  <text x="95" y="85" text-anchor="middle" font-size="12" font-weight="700" fill="#0369a1">Outer Side</text>
  <text x="95" y="105" text-anchor="middle" font-size="11" fill="#0284c7">(Perimitochondrial)</text>

  <!-- Membrane A -->
  <rect x="175" y="55" width="120" height="290" rx="4" fill="#cbd5e1" stroke="#64748b"/>
  <rect x="185" y="70" width="100" height="34" rx="6" fill="#ffffff" stroke="#475569" stroke-width="2" filter="url(#shadow)"/>
  <text x="235" y="92" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a">[ A ]</text>
  <text x="235" y="125" text-anchor="middle" font-size="10.5" font-weight="600" fill="#334155">Inner Mitochondrial</text>
  <text x="235" y="140" text-anchor="middle" font-size="10.5" font-weight="600" fill="#334155">Membrane</text>

  <!-- Channel B (F0) -->
  <rect x="200" y="170" width="70" height="90" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="235" y="220" text-anchor="middle" font-size="18" font-weight="800" fill="#15803d">[ B ] (F0)</text>

  <!-- Matrix D -->
  <rect x="310" y="55" width="300" height="290" rx="6" fill="#fef9c3" opacity="0.3"/>
  <rect x="490" y="70" width="100" height="34" rx="6" fill="#ffffff" stroke="#ca8a04" stroke-width="2" filter="url(#shadow)"/>
  <text x="540" y="92" text-anchor="middle" font-size="14" font-weight="800" fill="#854d0e">[ D ] Matrix</text>

  <!-- Headpiece C (F1) -->
  <circle cx="370" cy="215" r="48" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5" filter="url(#shadow)"/>
  <text x="370" y="215" text-anchor="middle" font-size="18" font-weight="800" fill="#c2410c">[ C ] (F1)</text>

  <!-- ATP generation at C -->
  <text x="440" y="210" font-size="13" font-weight="700" fill="#0f172a">ADP + Pi</text>
  <line x1="500" y1="205" x2="525" y2="205" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="535" y="210" font-size="15" font-weight="800" fill="#16a34a">ATP</text>

  <!-- Proton 2H+ passing -->
  <line x1="120" y1="215" x2="190" y2="215" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow-blue)"/>
  <text x="145" y="205" font-size="14" font-weight="800" fill="#2563eb">2H+</text>

  <!-- Footer -->
  <rect x="30" y="360" width="580" height="45" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="320" y="388" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">A: Inner mitochondrial membrane; B: F0; C: F1; D: Matrix</text>
</svg>
`;
}

// ==========================================
// LIST OF ALL DIAGRAMS TO GENERATE & UPLOAD
// ==========================================
const ALL_DIAGRAMS = [
  // Excretory Products
  {
    chapter: 'Excretory Products and their Elimination',
    folder: 'edvedum_zoology/excretory_products',
    qNum: 46,
    dbId: 18099,
    filename: 'q46_diagram.png',
    svgFn: createQ46Svg,
  },
  {
    chapter: 'Excretory Products and their Elimination',
    folder: 'edvedum_zoology/excretory_products',
    qNum: 83,
    dbId: 18136,
    filename: 'q83_diagram.png',
    svgFn: createQ83Svg,
  },
  {
    chapter: 'Excretory Products and their Elimination',
    folder: 'edvedum_zoology/excretory_products',
    qNum: 101,
    dbId: 18154,
    filename: 'q101_diagram.png',
    svgFn: createQ101Svg,
  },
  {
    chapter: 'Excretory Products and their Elimination',
    folder: 'edvedum_zoology/excretory_products',
    qNum: 116,
    dbId: 18169,
    filename: 'q116_flowchart.png',
    svgFn: createQ116Svg,
  },
  {
    chapter: 'Excretory Products and their Elimination',
    folder: 'edvedum_zoology/excretory_products',
    qNum: 121,
    dbId: 18174,
    filename: 'q121_diagram.png',
    svgFn: createQ121Svg,
  },
  {
    chapter: 'Excretory Products and their Elimination',
    folder: 'edvedum_zoology/excretory_products',
    qNum: 123,
    dbId: 18176,
    filename: 'q123_diagram.png',
    svgFn: createQ123Svg,
  },

  // Respiration in Plants
  {
    chapter: 'Respiration in Plants',
    folder: 'edvedum_botany/respiration_in_plants',
    qNum: 40,
    dbId: 17999,
    filename: 'q40_diagram.png',
    svgFn: createQ40Svg,
  },
  {
    chapter: 'Respiration in Plants',
    folder: 'edvedum_botany/respiration_in_plants',
    qNum: 59,
    dbId: 18018,
    filename: 'q59_diagram.png',
    svgFn: createQ59Svg,
  },
  {
    chapter: 'Respiration in Plants',
    folder: 'edvedum_botany/respiration_in_plants',
    qNum: 74,
    dbId: 18033,
    filename: 'q74_diagram.png',
    svgFn: createQ74Svg,
  },
  {
    chapter: 'Respiration in Plants',
    folder: 'edvedum_botany/respiration_in_plants',
    qNum: 76,
    dbId: 18035,
    filename: 'q76_diagram.png',
    svgFn: createQ76Svg,
  },
];

async function main() {
  console.log('=== STARTING DIAGRAM GENERATION & CLOUDINARY UPLOAD ===\n');

  const client = await pool.connect();

  try {
    for (const item of ALL_DIAGRAMS) {
      console.log(`\nProcessing Q${item.qNum} (DB ID: ${item.dbId}) for chapter "${item.chapter}"...`);

      // 1. Generate SVG
      const svgContent = item.svgFn();

      // 2. Convert to high-resolution PNG using Sharp
      const pngBuffer = await sharp(Buffer.from(svgContent), { density: 300 })
        .png({ quality: 100, compressionLevel: 9 })
        .toBuffer();

      // 3. Save locally in backend/uploads and frontend/public/uploads
      const localBackendDir = path.resolve(__dirname, `../uploads/${path.basename(item.folder)}`);
      const localFrontendDir = path.resolve(__dirname, `../../frontend/public/uploads/${path.basename(item.folder)}`);
      fs.mkdirSync(localBackendDir, { recursive: true });
      fs.mkdirSync(localFrontendDir, { recursive: true });

      const backendPath = path.join(localBackendDir, item.filename);
      const frontendPath = path.join(localFrontendDir, item.filename);
      fs.writeFileSync(backendPath, pngBuffer);
      fs.writeFileSync(frontendPath, pngBuffer);
      console.log(`  Saved locally to: ${backendPath}`);

      // 4. Upload buffer to Cloudinary
      console.log(`  Uploading to Cloudinary folder "${item.folder}"...`);
      const publicId = path.parse(item.filename).name;

      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: item.folder,
            public_id: publicId,
            overwrite: true,
            resource_type: 'image',
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        stream.end(pngBuffer);
      });

      const cloudinaryUrl = uploadRes.secure_url;
      console.log(`  Cloudinary URL: ${cloudinaryUrl}`);

      // 5. Update Database row
      const updateRes = await client.query(
        `UPDATE question_bank SET image_url = $1 WHERE id = $2 RETURNING id, question_text, image_url`,
        [cloudinaryUrl, item.dbId]
      );

      if (updateRes.rows.length > 0) {
        console.log(`  Database updated for ID ${item.dbId}: ${updateRes.rows[0].image_url}`);
      } else {
        console.warn(`  Warning: Question ID ${item.dbId} not found in database!`);
      }
    }

    // 6. Invalidate Redis Cache
    try {
      const { delCache } = await import('../src/config/redis.js');
      await delCache('cache:qb:*');
      console.log('\n Redis Question Bank cache invalidated.');
    } catch (cacheErr) {
      console.warn('\n Cache invalidation note:', cacheErr.message);
    }

    console.log('\n=== ALL 10 DIAGRAMS GENERATED, UPLOADED & DB UPDATED SUCCESSFULLY! ===');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);

