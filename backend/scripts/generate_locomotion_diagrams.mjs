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
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const SVG_HEADER = (w = 680, h = 440) => `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
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
  </defs>
`;

// 1. Q34: Pelvic Girdle (Sacrum Z, Pubis X, Obturator foramen Y, Ischium W)
function createQ34Svg() {
  return `
${SVG_HEADER(680, 440)}
  <rect x="0" y="0" width="680" height="40" fill="#f8fafc"/>
  <text x="340" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">PELVIC GIRDLE AND SACRUM (FRONTAL VIEW)</text>
  <line x1="0" y1="40" x2="680" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(40, 50)">
    <!-- Sacrum in center top (Z) -->
    <polygon points="260,30 340,30 330,130 270,130" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
    <circle cx="285" cy="60" r="4" fill="#854d0e"/>
    <circle cx="315" cy="60" r="4" fill="#854d0e"/>
    <circle cx="288" cy="85" r="3.5" fill="#854d0e"/>
    <circle cx="312" cy="85" r="3.5" fill="#854d0e"/>

    <!-- Label Z: Sacrum -->
    <rect x="360" y="45" width="75" height="34" rx="6" fill="#fef9c3" stroke="#ca8a04" stroke-width="2" filter="url(#shadow)"/>
    <text x="397" y="68" text-anchor="middle" font-size="16" font-weight="800" fill="#854d0e">Z</text>
    <line x1="360" y1="62" x2="335" y2="62" stroke="#ca8a04" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Left Ilium Wing -->
    <path d="M 260 30 C 180 10 140 50 140 100 C 140 150 170 170 200 180" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5"/>
    <!-- Right Ilium Wing (W) -->
    <path d="M 340 30 C 420 10 460 50 460 100 C 460 150 430 170 400 180" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5"/>
    <rect x="475" y="85" width="75" height="34" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="2" filter="url(#shadow)"/>
    <text x="512" y="108" text-anchor="middle" font-size="16" font-weight="800" fill="#1d4ed8">W</text>
    <line x1="475" y1="102" x2="455" y2="102" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>

    <!-- Acetabulum cups -->
    <circle cx="190" cy="190" r="18" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
    <circle cx="410" cy="190" r="18" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>

    <!-- Pubis (X) & Pubic Symphysis -->
    <path d="M 200 180 C 240 210 270 230 295 240 L 305 240 C 330 230 360 210 400 180" fill="none" stroke="#dc2626" stroke-width="3"/>
    <!-- Pubic symphysis joint in middle -->
    <rect x="294" y="230" width="12" height="24" rx="2" fill="#cbd5e1" stroke="#475569"/>

    <!-- Label X: Pubis -->
    <rect x="360" y="235" width="75" height="34" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2" filter="url(#shadow)"/>
    <text x="397" y="258" text-anchor="middle" font-size="16" font-weight="800" fill="#b91c1c">X</text>
    <line x1="360" y1="250" x2="330" y2="240" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-red)"/>

    <!-- Ischium & Obturator Foramen (Y) -->
    <!-- Left Obturator foramen -->
    <ellipse cx="225" cy="225" rx="18" ry="22" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Right Obturator foramen (Y) -->
    <ellipse cx="375" cy="225" rx="18" ry="22" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Label Y: Obturator foramen -->
    <rect x="420" y="200" width="75" height="34" rx="6" fill="#f1f5f9" stroke="#0f172a" stroke-width="2" filter="url(#shadow)"/>
    <text x="457" y="223" text-anchor="middle" font-size="16" font-weight="800" fill="#0f172a">Y</text>
    <line x1="420" y1="217" x2="395" y2="225" stroke="#0f172a" stroke-width="2" marker-end="url(#arrow)"/>
  </g>

  <!-- Bottom Legend -->
  <rect x="20" y="375" width="640" height="45" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="340" y="403" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Z = Sacrum  |  X = Pubis  |  Y = Obturator foramen  |  W = Ilium / Ischium</text>
</svg>
`;
}

// 2. Q70: Vertebral Column (A: Cervical, B: Thoracic, C: Lumbar, D: Sacrum/Coccyx)
function createQ70Svg() {
  return `
${SVG_HEADER(640, 460)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">HUMAN VERTEBRAL COLUMN (LATERAL VIEW)</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(80, 50)">
    <!-- Spine Curvature Schematic -->
    <!-- Cervical curve (A) -->
    <path d="M 160 30 Q 185 60 170 95" fill="none" stroke="#0284c7" stroke-width="12" stroke-linecap="round"/>
    <rect x="240" y="45" width="120" height="34" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" filter="url(#shadow)"/>
    <text x="300" y="68" text-anchor="middle" font-size="15" font-weight="800" fill="#0369a1">[ A ] Cervical (7)</text>
    <line x1="240" y1="62" x2="185" y2="62" stroke="#0284c7" stroke-width="2" marker-end="url(#arrow-blue)"/>

    <!-- Thoracic curve (B) - Part of thoracic cage -->
    <path d="M 170 95 Q 130 160 165 220" fill="none" stroke="#dc2626" stroke-width="16" stroke-linecap="round"/>
    <!-- Ribcage outline connected to B -->
    <path d="M 155 120 C 80 120 70 180 150 180" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4,4"/>
    <text x="60" y="155" font-size="11" font-weight="700" fill="#dc2626">Rib Cage</text>
    <rect x="240" y="145" width="160" height="42" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5" filter="url(#shadow)"/>
    <text x="320" y="166" text-anchor="middle" font-size="15" font-weight="800" fill="#b91c1c">[ B ] Thoracic (12)</text>
    <text x="320" y="181" text-anchor="middle" font-size="10.5" font-weight="700" fill="#dc2626">(Forms part of thoracic cage)</text>
    <line x1="240" y1="166" x2="165" y2="160" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>

    <!-- Lumbar curve (C) -->
    <path d="M 165 220 Q 195 260 175 300" fill="none" stroke="#16a34a" stroke-width="18" stroke-linecap="round"/>
    <rect x="240" y="250" width="120" height="34" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" filter="url(#shadow)"/>
    <text x="300" y="273" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">[ C ] Lumbar (5)</text>
    <line x1="240" y1="267" x2="190" y2="267" stroke="#16a34a" stroke-width="2" marker-end="url(#arrow)"/>

    <!-- Pelvic / Sacral curve (D) -->
    <path d="M 175 300 Q 150 330 160 350" fill="none" stroke="#7c3aed" stroke-width="14" stroke-linecap="round"/>
    <rect x="240" y="325" width="160" height="34" rx="6" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" filter="url(#shadow)"/>
    <text x="320" y="348" text-anchor="middle" font-size="14" font-weight="800" fill="#6d28d9">[ D ] Sacrum &amp; Coccyx</text>
    <line x1="240" y1="342" x2="175" y2="335" stroke="#7c3aed" stroke-width="2" marker-end="url(#arrow)"/>
  </g>

  <!-- Footer -->
  <rect x="20" y="415" width="600" height="35" rx="6" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="320" y="438" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Structure forming part of thoracic cage: B (Thoracic vertebrae)</text>
</svg>
`;
}

// 3. Q74: Human Skull Bones (Unpaired vs Paired)
function createQ74Svg() {
  return `
${SVG_HEADER(680, 460)}
  <rect x="0" y="0" width="680" height="40" fill="#f8fafc"/>
  <text x="340" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">HUMAN SKULL: CRANIAL AND FACIAL BONES</text>
  <line x1="0" y1="40" x2="680" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(40, 50)">
    <!-- Skull Outline -->
    <!-- Cranium Vault -->
    <path d="M 150 220 C 130 180 130 110 180 70 C 230 30 300 40 330 90 C 350 130 350 170 330 200 L 320 250 L 250 250 L 230 220 Z" fill="#f8fafc" stroke="#334155" stroke-width="3"/>

    <!-- Eye Orbit -->
    <circle cx="280" cy="130" r="22" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
    <!-- Nasal Cavity -->
    <polygon points="295,155 310,185 285,185" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
    <!-- Upper Jaw (Maxilla) & Lower Jaw (Mandible) -->
    <path d="M 285 190 L 320 190 L 315 220 L 275 220 Z" fill="#fff" stroke="#334155" stroke-width="2"/>
    <path d="M 275 225 L 325 225 L 320 255 L 260 255 L 260 230 Z" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>

    <!-- Bone Labels -->
    <!-- a: Frontal (Unpaired) -->
    <text x="250" y="80" font-size="13" font-weight="800" fill="#b91c1c">(a) Frontal*</text>
    <!-- b: Parietal (Paired) -->
    <text x="175" y="110" font-size="13" font-weight="700" fill="#1e293b">(b) Parietal</text>
    <!-- c: Occipital (Unpaired) -->
    <text x="135" y="180" font-size="13" font-weight="800" fill="#b91c1c">(c) Occipital*</text>
    <!-- d: Temporal (Paired) -->
    <text x="200" y="165" font-size="13" font-weight="700" fill="#1e293b">(d) Temporal</text>
    <!-- e: Sphenoid (Unpaired) -->
    <text x="235" y="135" font-size="13" font-weight="800" fill="#b91c1c">(e) Sphenoid*</text>
    <!-- f: Zygomatic (Paired) -->
    <text x="325" y="160" font-size="13" font-weight="700" fill="#1e293b">(f) Zygomatic</text>
    <!-- g: Maxilla (Paired) -->
    <text x="330" y="200" font-size="13" font-weight="700" fill="#1e293b">(g) Maxilla</text>
    <!-- h: Mandible (Unpaired) -->
    <text x="330" y="245" font-size="13" font-weight="800" fill="#b91c1c">(h) Mandible*</text>
  </g>

  <!-- Classification Summary Box on Right -->
  <g transform="translate(430, 60)">
    <rect x="0" y="0" width="220" height="280" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="25" font-size="13" font-weight="700" fill="#0f172a">Bones Classification:</text>
    
    <rect x="10" y="40" width="200" height="95" rx="6" fill="#fee2e2" stroke="#f87171"/>
    <text x="18" y="60" font-size="12" font-weight="800" fill="#b91c1c">UNPAIRED BONES (*):</text>
    <text x="18" y="80" font-size="11" font-weight="600" fill="#7f1d1d">• Frontal (Cranium)</text>
    <text x="18" y="96" font-size="11" font-weight="600" fill="#7f1d1d">• Occipital (Cranium)</text>
    <text x="18" y="112" font-size="11" font-weight="600" fill="#7f1d1d">• Sphenoid (Cranium)</text>
    <text x="18" y="128" font-size="11" font-weight="600" fill="#7f1d1d">• Mandible (Face)</text>

    <rect x="10" y="145" width="200" height="95" rx="6" fill="#eff6ff" stroke="#93c5fd"/>
    <text x="18" y="165" font-size="12" font-weight="800" fill="#1d4ed8">PAIRED BONES:</text>
    <text x="18" y="185" font-size="11" font-weight="600" fill="#1e3a8a">• Parietal (2)</text>
    <text x="18" y="201" font-size="11" font-weight="600" fill="#1e3a8a">• Temporal (2)</text>
    <text x="18" y="217" font-size="11" font-weight="600" fill="#1e3a8a">• Zygomatic (2)</text>
    <text x="18" y="233" font-size="11" font-weight="600" fill="#1e3a8a">• Maxilla (2)</text>
  </g>

  <!-- Footer -->
  <rect x="20" y="380" width="640" height="40" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="340" y="405" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Unpaired bones: (a) Frontal, (c) Occipital, (e) Sphenoid, (h) Mandible</text>
</svg>
`;
}

// 4. Q87: Right Pectoral Girdle & Upper Arm (a: Clavicle, b: Humerus, c: Radius, d: Ulna)
function createQ87Svg() {
  return `
${SVG_HEADER(640, 480)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">RIGHT PECTORAL GIRDLE AND FOREARM BONES</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(60, 50)">
    <!-- Clavicle (a) -->
    <path d="M 60 40 Q 110 25 160 38" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round"/>
    <rect x="30" y="10" width="100" height="30" rx="6" fill="#dbeafe" stroke="#2563eb" stroke-width="2" filter="url(#shadow)"/>
    <text x="80" y="30" text-anchor="middle" font-size="14" font-weight="800" fill="#1d4ed8">[ a ] Clavicle</text>

    <!-- Scapula -->
    <polygon points="150,40 130,120 180,90" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>
    <text x="145" y="80" font-size="10" font-weight="700" fill="#64748b">Scapula</text>

    <!-- Humerus (b) -->
    <path d="M 160 55 L 160 170" fill="none" stroke="#dc2626" stroke-width="12" stroke-linecap="round"/>
    <rect x="200" y="95" width="115" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2" filter="url(#shadow)"/>
    <text x="257" y="116" text-anchor="middle" font-size="14" font-weight="800" fill="#b91c1c">[ b ] Humerus</text>
    <line x1="200" y1="111" x2="170" y2="111" stroke="#dc2626" stroke-width="2"/>

    <!-- Forearm bones: Radius (c, lateral/thumb) and Ulna (d, medial) -->
    <!-- Radius (c) -->
    <path d="M 152 185 L 140 290" fill="none" stroke="#16a34a" stroke-width="7" stroke-linecap="round"/>
    <rect x="20" y="225" width="105" height="32" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" filter="url(#shadow)"/>
    <text x="72" y="246" text-anchor="middle" font-size="14" font-weight="800" fill="#15803d">[ c ] Radius</text>
    <line x1="125" y1="241" x2="145" y2="241" stroke="#16a34a" stroke-width="2"/>

    <!-- Ulna (d) -->
    <path d="M 168 185 L 168 290" fill="none" stroke="#7c3aed" stroke-width="7" stroke-linecap="round"/>
    <rect x="200" y="225" width="100" height="32" rx="6" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" filter="url(#shadow)"/>
    <text x="250" y="246" text-anchor="middle" font-size="14" font-weight="800" fill="#6d28d9">[ d ] Ulna</text>
    <line x1="200" y1="241" x2="172" y2="241" stroke="#7c3aed" stroke-width="2"/>

    <!-- Wrist Carpals, Metacarpals, Phalanges -->
    <ellipse cx="155" cy="305" rx="18" ry="8" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
    <text x="155" y="309" text-anchor="middle" font-size="9" font-weight="700" fill="#334155">Carpals</text>
    <path d="M 142 315 L 142 345 M 150 315 L 150 350 M 158 315 L 158 350 M 166 315 L 166 345" stroke="#334155" stroke-width="2"/>
    <text x="155" y="365" text-anchor="middle" font-size="10" font-weight="700" fill="#64748b">Phalanges</text>
  </g>

  <!-- Explanation card on right -->
  <g transform="translate(420, 65)">
    <rect x="0" y="0" width="190" height="260" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="25" font-size="13" font-weight="700" fill="#0f172a">Anatomical Identity:</text>
    <text x="15" y="55" font-size="12" font-weight="700" fill="#1d4ed8">a = Clavicle</text>
    <text x="22" y="72" font-size="10.5" fill="#475569">(Collar bone)</text>

    <text x="15" y="105" font-size="12" font-weight="700" fill="#b91c1c">b = Humerus</text>
    <text x="22" y="122" font-size="10.5" fill="#475569">(Upper arm bone)</text>

    <text x="15" y="155" font-size="12" font-weight="700" fill="#15803d">c = Radius</text>
    <text x="22" y="172" font-size="10.5" fill="#475569">(Lateral / thumb side)</text>

    <text x="15" y="205" font-size="12" font-weight="700" fill="#6d28d9">d = Ulna</text>
    <text x="22" y="222" font-size="10.5" fill="#475569">(Medial forearm bone)</text>
  </g>

  <!-- Footer -->
  <rect x="20" y="420" width="600" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="446" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Correct Match: a-Clavicle, b-Humerus, c-Radius, d-Ulna</text>
</svg>
`;
}

// 5. Q92: Scapula Parts (Identification of wrong label)
function createQ92Svg() {
  return `
${SVG_HEADER(640, 440)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">SCAPULA (PECTORAL GIRDLE) - ANATOMICAL LABELS</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(60, 50)">
    <!-- Scapula Triangular Body -->
    <path d="M 120 70 L 320 70 L 220 280 Z" fill="#f8fafc" stroke="#334155" stroke-width="3"/>
    
    <!-- Spine of Scapula -->
    <path d="M 130 110 L 290 85" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
    <text x="200" y="125" font-size="12" font-weight="700" fill="#0284c7">Spine of Scapula</text>

    <!-- Acromion Process -->
    <path d="M 290 85 Q 330 65 340 90" fill="none" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>
    <rect x="350" y="75" width="130" height="32" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" filter="url(#shadow)"/>
    <text x="415" y="96" text-anchor="middle" font-size="13" font-weight="700" fill="#15803d">Acromion process</text>

    <!-- Coracoid Process -->
    <path d="M 280 60 Q 300 40 315 50" fill="none" stroke="#ea580c" stroke-width="5" stroke-linecap="round"/>
    <rect x="290" y="15" width="130" height="32" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="2" filter="url(#shadow)"/>
    <text x="355" y="36" text-anchor="middle" font-size="13" font-weight="700" fill="#c2410c">Coracoid process</text>

    <!-- Glenoid Cavity -->
    <ellipse cx="310" cy="115" rx="14" ry="20" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <rect x="350" y="130" width="120" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2" filter="url(#shadow)"/>
    <text x="410" y="151" text-anchor="middle" font-size="13" font-weight="700" fill="#b91c1c">Glenoid cavity</text>

    <!-- Supraspinous & Infraspinous Fossae -->
    <text x="180" y="60" font-size="11" font-weight="600" fill="#64748b">Supraspinous fossa</text>
    <text x="190" y="180" font-size="11" font-weight="600" fill="#64748b">Infraspinous fossa</text>
  </g>

  <!-- Footer -->
  <rect x="20" y="380" width="600" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="406" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Anatomical parts: Acromion, Coracoid process, Glenoid cavity, Spine</text>
</svg>
`;
}

// 6. Q134: Upper Limb Joints (A: Shoulder, B: Elbow, C: Wrist)
function createQ134Svg() {
  return `
${SVG_HEADER(640, 460)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">JOINTS OF HUMAN UPPER LIMB (A, B, C)</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(60, 50)">
    <!-- Joint A: Shoulder Joint -->
    <circle cx="160" cy="50" r="16" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <rect x="200" y="35" width="220" height="36" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2" filter="url(#shadow)"/>
    <text x="310" y="58" text-anchor="middle" font-size="14" font-weight="800" fill="#b91c1c">[ A ] Ball and Socket Joint</text>
    <line x1="200" y1="52" x2="178" y2="52" stroke="#dc2626" stroke-width="2"/>

    <!-- Arm shaft -->
    <path d="M 160 66 L 160 160" stroke="#334155" stroke-width="8"/>

    <!-- Joint B: Elbow Joint -->
    <circle cx="160" cy="175" r="14" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>
    <rect x="200" y="160" width="200" height="36" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" filter="url(#shadow)"/>
    <text x="300" y="183" text-anchor="middle" font-size="14" font-weight="800" fill="#15803d">[ B ] Hinge Joint (Elbow)</text>
    <line x1="200" y1="178" x2="176" y2="178" stroke="#16a34a" stroke-width="2"/>

    <!-- Forearm shaft -->
    <path d="M 155 190 L 150 270" stroke="#334155" stroke-width="6"/>
    <path d="M 165 190 L 170 270" stroke="#334155" stroke-width="6"/>

    <!-- Joint C: Wrist Joint -->
    <circle cx="160" cy="285" r="12" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
    <rect x="200" y="270" width="220" height="36" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" filter="url(#shadow)"/>
    <text x="310" y="293" text-anchor="middle" font-size="14" font-weight="800" fill="#0369a1">[ C ] Condyloid / Gliding Joint</text>
    <line x1="200" y1="288" x2="174" y2="288" stroke="#0284c7" stroke-width="2"/>
  </g>

  <!-- Footer -->
  <rect x="20" y="395" width="600" height="45" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="423" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">A = Ball and Socket Joint  |  B = Hinge Joint  |  C = Condyloid Joint</text>
</svg>
`;
}

// 7. Q146: Lower Limb Bones (A: Patella, B: Tibia, C: Fibula, D: Tarsals)
function createQ146Svg() {
  return `
${SVG_HEADER(640, 480)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">HUMAN LOWER LIMB BONES (FRONTAL VIEW)</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(60, 50)">
    <!-- Pelvis & Hip Joint -->
    <path d="M 120 20 Q 150 5 180 20" fill="none" stroke="#64748b" stroke-width="4"/>
    <text x="150" y="15" text-anchor="middle" font-size="11" font-weight="700" fill="#64748b">Pelvic Girdle</text>

    <!-- Femur (Thigh bone) -->
    <path d="M 150 25 L 150 145" stroke="#334155" stroke-width="14" stroke-linecap="round"/>
    <text x="175" y="85" font-size="12" font-weight="700" fill="#475569">Femur</text>

    <!-- Patella (A) -->
    <circle cx="150" cy="160" r="14" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <rect x="210" y="145" width="115" height="32" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2" filter="url(#shadow)"/>
    <text x="267" y="166" text-anchor="middle" font-size="14" font-weight="800" fill="#b91c1c">[ A ] Patella</text>
    <line x1="210" y1="161" x2="166" y2="161" stroke="#dc2626" stroke-width="2"/>

    <!-- Shank: Tibia (B, medial/large) and Fibula (C, lateral/thin) -->
    <!-- Tibia (B) -->
    <path d="M 142 178 L 140 290" stroke="#16a34a" stroke-width="10" stroke-linecap="round"/>
    <rect x="20" y="225" width="95" height="32" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="2" filter="url(#shadow)"/>
    <text x="67" y="246" text-anchor="middle" font-size="14" font-weight="800" fill="#15803d">[ B ] Tibia</text>
    <line x1="115" y1="241" x2="135" y2="241" stroke="#16a34a" stroke-width="2"/>

    <!-- Fibula (C) -->
    <path d="M 160 178 L 160 290" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <rect x="210" y="225" width="105" height="32" rx="6" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2" filter="url(#shadow)"/>
    <text x="262" y="246" text-anchor="middle" font-size="14" font-weight="800" fill="#6d28d9">[ C ] Fibula</text>
    <line x1="210" y1="241" x2="167" y2="241" stroke="#7c3aed" stroke-width="2"/>

    <!-- Ankle Tarsals (D) -->
    <ellipse cx="148" cy="305" rx="16" ry="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
    <rect x="210" y="290" width="115" height="32" rx="6" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" filter="url(#shadow)"/>
    <text x="267" y="311" text-anchor="middle" font-size="14" font-weight="800" fill="#0369a1">[ D ] Tarsals</text>
    <line x1="210" y1="306" x2="166" y2="306" stroke="#0284c7" stroke-width="2"/>

    <!-- Metatarsals & Phalanges -->
    <path d="M 138 318 L 135 345 M 145 318 L 145 350 M 155 318 L 155 345" stroke="#334155" stroke-width="2"/>
    <text x="145" y="365" text-anchor="middle" font-size="10" font-weight="700" fill="#64748b">Phalanges</text>
  </g>

  <!-- Explanation card on right -->
  <g transform="translate(410, 65)">
    <rect x="0" y="0" width="200" height="260" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="25" font-size="13" font-weight="700" fill="#0f172a">Identified Bones:</text>
    <text x="15" y="55" font-size="12" font-weight="700" fill="#b91c1c">A = Patella (Knee cap)</text>
    <text x="22" y="72" font-size="10.5" fill="#475569">Sesamoid bone</text>

    <text x="15" y="105" font-size="12" font-weight="700" fill="#15803d">B = Tibia (Shin bone)</text>
    <text x="22" y="122" font-size="10.5" fill="#475569">Larger, medial shank bone</text>

    <text x="15" y="155" font-size="12" font-weight="700" fill="#6d28d9">C = Fibula</text>
    <text x="22" y="172" font-size="10.5" fill="#475569">Slender, lateral bone</text>

    <text x="15" y="205" font-size="12" font-weight="700" fill="#0369a1">D = Tarsals (7 bones)</text>
    <text x="22" y="222" font-size="10.5" fill="#475569">Ankle bones</text>
  </g>

  <!-- Footer -->
  <rect x="20" y="420" width="600" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="446" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">A: Patella  |  B: Tibia  |  C: Fibula  |  D: Tarsals</text>
</svg>
`;
}

// 8. Q179: Ribcage (Structure A: Thoracic vertebrae, 12 in number)
function createQ179Svg() {
  return `
${SVG_HEADER(640, 440)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">HUMAN RIBCAGE &amp; THORACIC CAGE</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(60, 50)">
    <!-- Vertebral column (Dorsal background) - Structure A -->
    <rect x="180" y="20" width="40" height="280" rx="4" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
    <line x1="180" y1="45" x2="220" y2="45" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="70" x2="220" y2="70" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="95" x2="220" y2="95" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="120" x2="220" y2="120" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="145" x2="220" y2="145" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="170" x2="220" y2="170" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="195" x2="220" y2="195" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="220" x2="220" y2="220" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="245" x2="220" y2="245" stroke="#dc2626" stroke-width="1.5"/>
    <line x1="180" y1="270" x2="220" y2="270" stroke="#dc2626" stroke-width="1.5"/>

    <!-- Callout for A: Thoracic vertebrae -->
    <rect x="10" y="120" width="130" height="42" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5" filter="url(#shadow)"/>
    <text x="75" y="141" text-anchor="middle" font-size="15" font-weight="800" fill="#b91c1c">[ A ]</text>
    <text x="75" y="156" text-anchor="middle" font-size="10.5" font-weight="700" fill="#dc2626">(Dorsal boundary)</text>
    <line x1="140" y1="141" x2="178" y2="141" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrow-red)"/>

    <!-- Ribs curving around -->
    <path d="M 180 50 C 120 50 120 120 180 120" fill="none" stroke="#64748b" stroke-width="3"/>
    <path d="M 220 50 C 280 50 280 120 220 120" fill="none" stroke="#64748b" stroke-width="3"/>

    <path d="M 180 80 C 100 80 100 170 180 170" fill="none" stroke="#64748b" stroke-width="3"/>
    <path d="M 220 80 C 300 80 300 170 220 170" fill="none" stroke="#64748b" stroke-width="3"/>

    <path d="M 180 110 C 90 110 90 220 180 220" fill="none" stroke="#64748b" stroke-width="3"/>
    <path d="M 220 110 C 310 110 310 220 220 220" fill="none" stroke="#64748b" stroke-width="3"/>

    <!-- Sternum (Ventral center foreground) -->
    <polygon points="195,60 205,60 203,170 197,170" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
    <text x="200" y="115" text-anchor="middle" font-size="10" font-weight="700" fill="#334155" transform="rotate(-90 200 115)">Sternum</text>
  </g>

  <!-- Explanation card on right -->
  <g transform="translate(390, 65)">
    <rect x="0" y="0" width="220" height="250" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="25" font-size="13" font-weight="700" fill="#0f172a">Thoracic Cage Components:</text>
    <text x="15" y="55" font-size="12" font-weight="700" fill="#b91c1c">• Dorsally: Structure A</text>
    <text x="22" y="73" font-size="11" font-weight="600" fill="#7f1d1d">12 Thoracic Vertebrae</text>

    <text x="15" y="105" font-size="12" font-weight="700" fill="#1e293b">• Ventrally:</text>
    <text x="22" y="123" font-size="11" fill="#475569">Sternum (Breastbone)</text>

    <text x="15" y="155" font-size="12" font-weight="700" fill="#1e293b">• Laterally:</text>
    <text x="22" y="173" font-size="11" fill="#475569">12 pairs of Ribs</text>

    <rect x="10" y="195" width="200" height="42" rx="6" fill="#fee2e2" stroke="#dc2626"/>
    <text x="110" y="215" text-anchor="middle" font-size="11" font-weight="700" fill="#b91c1c">Answer: (4)</text>
    <text x="110" y="230" text-anchor="middle" font-size="12" font-weight="800" fill="#991b1b">12 in number (Thoracic)</text>
  </g>

  <!-- Footer -->
  <rect x="20" y="380" width="600" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="406" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Structure 'A' is Thoracic Vertebrae: 12 in number in human body</text>
</svg>
`;
}

// 9. Q181: Pelvic Girdle and Lower Limb (Identify Wrongly Labeled Bones)
function createQ181Svg() {
  return `
${SVG_HEADER(640, 480)}
  <rect x="0" y="0" width="640" height="40" fill="#f8fafc"/>
  <text x="320" y="25" text-anchor="middle" font-size="15" font-weight="700" fill="#0f172a">RIGHT PELVIC GIRDLE &amp; LOWER LIMB (FRONTAL VIEW)</text>
  <line x1="0" y1="40" x2="640" y2="40" stroke="#cbd5e1" stroke-width="1"/>

  <g transform="translate(60, 50)">
    <!-- Ilium -->
    <path d="M 120 20 C 140 5 180 10 190 40 L 160 70 Z" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="110" y="40" font-size="11" font-weight="700" fill="#2563eb">Ilium</text>

    <!-- Ischium & Pubis -->
    <text x="110" y="65" font-size="11" font-weight="700" fill="#334155">Ischium</text>
    <text x="110" y="90" font-size="11" font-weight="700" fill="#334155">Pubis</text>

    <!-- Femur -->
    <path d="M 160 80 L 160 180" stroke="#334155" stroke-width="14" stroke-linecap="round"/>
    <text x="180" y="130" font-size="12" font-weight="700" fill="#475569">Femur</text>

    <!-- Patella -->
    <circle cx="160" cy="195" r="12" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
    <text x="185" y="200" font-size="11" font-weight="700" fill="#475569">Patella</text>

    <!-- Shank: Tibia (medial) and Fibula (lateral) -->
    <path d="M 152 210 L 150 310" stroke="#16a34a" stroke-width="10" stroke-linecap="round"/>
    <text x="100" y="260" font-size="12" font-weight="700" fill="#15803d">Tibia</text>

    <path d="M 170 210 L 170 310" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <text x="185" y="260" font-size="12" font-weight="700" fill="#6d28d9">Fibula</text>

    <!-- Foot -->
    <text x="100" y="325" font-size="11" font-weight="700" fill="#334155">Tarsals</text>
    <text x="100" y="345" font-size="11" font-weight="700" fill="#334155">Metatarsals</text>
    <text x="100" y="365" font-size="11" font-weight="700" fill="#334155">Phalanges</text>
  </g>

  <!-- Explanation card on right -->
  <g transform="translate(380, 65)">
    <rect x="0" y="0" width="230" height="260" rx="8" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="15" y="25" font-size="13" font-weight="700" fill="#0f172a">Diagram Verification:</text>
    <text x="15" y="55" font-size="11.5" font-weight="600" fill="#334155">• Pelvis: Ilium, Ischium, Pubis</text>
    <text x="15" y="85" font-size="11.5" font-weight="600" fill="#334155">• Thigh: Femur (longest bone)</text>
    <text x="15" y="115" font-size="11.5" font-weight="600" fill="#334155">• Knee: Patella (sesamoid)</text>
    <text x="15" y="145" font-size="11.5" font-weight="600" fill="#334155">• Shank: Tibia &amp; Fibula</text>
    <text x="15" y="175" font-size="11.5" font-weight="600" fill="#334155">• Ankle: 7 Tarsals</text>
    <text x="15" y="205" font-size="11.5" font-weight="600" fill="#334155">• Sole &amp; Digits: Metatarsals &amp; Phalanges</text>
  </g>

  <!-- Footer -->
  <rect x="20" y="420" width="600" height="42" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
  <text x="320" y="446" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Right pelvic girdle and lower limb frontal anatomical view</text>
</svg>
`;
}

export const LOCOMOTION_DIAGRAMS = [
  { qNum: 34, filename: 'q34_pelvis.png', svgFn: createQ34Svg },
  { qNum: 70, filename: 'q70_vertebral_column.png', svgFn: createQ70Svg },
  { qNum: 74, filename: 'q74_skull.png', svgFn: createQ74Svg },
  { qNum: 87, filename: 'q87_pectoral_girdle.png', svgFn: createQ87Svg },
  { qNum: 92, filename: 'q92_scapula.png', svgFn: createQ92Svg },
  { qNum: 134, filename: 'q134_arm_joints.png', svgFn: createQ134Svg },
  { qNum: 146, filename: 'q146_lower_limb.png', svgFn: createQ146Svg },
  { qNum: 179, filename: 'q179_ribcage.png', svgFn: createQ179Svg },
  { qNum: 181, filename: 'q181_pelvic_limb.png', svgFn: createQ181Svg },
];

export async function generateAndUploadLocomotionDiagrams() {
  console.log('=== GENERATING & UPLOADING LOCOMOTION DIAGRAMS ===\n');
  const results = {};

  const localBackendDir = path.resolve(__dirname, '../uploads/locomotion_and_movement');
  const localFrontendDir = path.resolve(__dirname, '../../frontend/public/uploads/locomotion_and_movement');
  fs.mkdirSync(localBackendDir, { recursive: true });
  fs.mkdirSync(localFrontendDir, { recursive: true });

  for (const item of LOCOMOTION_DIAGRAMS) {
    console.log(`Processing Q${item.qNum} (${item.filename})...`);

    // 1. Render SVG
    const svgContent = item.svgFn();

    // 2. High-res rasterization via Sharp (300 DPI)
    const pngBuffer = await sharp(Buffer.from(svgContent), { density: 300 })
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer();

    // 3. Save locally
    const bPath = path.join(localBackendDir, item.filename);
    const fPath = path.join(localFrontendDir, item.filename);
    fs.writeFileSync(bPath, pngBuffer);
    fs.writeFileSync(fPath, pngBuffer);

    // 4. Upload to Cloudinary
    const publicId = path.parse(item.filename).name;
    const uploadRes = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'edvedum_zoology/locomotion_and_movement',
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

    results[item.qNum] = uploadRes.secure_url;
    console.log(`  Cloudinary URL: ${uploadRes.secure_url}`);
  }

  console.log('\n=== ALL LOCOMOTION DIAGRAMS UPLOADED SUCCESSFULLY ===');
  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAndUploadLocomotionDiagrams().catch(console.error);
}

