import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const backendDir = 'backend/uploads/magnetism_matter';
const frontendDir = 'frontend/public/uploads/magnetism_matter';

async function saveDiagram(filename, svgString) {
  const buf = Buffer.from(svgString);
  const backPath = path.join(backendDir, filename);
  const frontPath = path.join(frontendDir, filename);

  await sharp(buf).png({ quality: 100 }).toFile(backPath);
  await sharp(buf).png({ quality: 100 }).toFile(frontPath);
  console.log(`Saved: ${filename}`);
}

async function generateQ75() {
  const svgQ75 = `
  <svg width="450" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:sans-serif;">
    <defs>
      <marker id="arrQ75" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
      </marker>
    </defs>
    <!-- Gaussian surface (dashed circle centered around N pole) -->
    <circle cx="180" cy="130" r="75" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="6,4"/>

    <!-- Bar Magnet placed horizontally -->
    <rect x="150" y="112" width="140" height="36" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5" rx="3"/>
    <line x1="220" y1="112" x2="220" y2="148" stroke="#64748b" stroke-width="1.5"/>
    <text x="185" y="137" font-size="20" font-weight="bold" fill="#dc2626" text-anchor="middle">N</text>
    <text x="255" y="137" font-size="20" font-weight="bold" fill="#2563eb" text-anchor="middle">S</text>

    <!-- Pointer to Gaussian surface -->
    <line x1="260" y1="205" x2="220" y2="185" stroke="#1e293b" stroke-width="2" marker-end="url(#arrQ75)"/>
    <text x="270" y="215" font-size="16" font-weight="bold" fill="#1e293b">Gaussian surface</text>
  </svg>
  `;
  await saveDiagram('mag_matter_q75.png', svgQ75);
}

generateQ75().catch(console.error);
