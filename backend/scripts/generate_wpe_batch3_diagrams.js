import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '272648719992928',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'x_M5z1sP9sA1a0rS9hN9Gf5W7kY'
});

const backendUploadDir = path.resolve(__dirname, '../uploads/work_energy_power');
const frontendUploadDir = path.resolve(__dirname, '../../frontend/public/uploads/work_energy_power');

[backendUploadDir, frontendUploadDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const diagrams = {
  // Q274: Particle oblique collision on horizontal floor with coordinate axes
  274: `
    <svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch274" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" stroke-width="1.5" />
        </pattern>
        <marker id="arrow274" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
        </marker>
        <marker id="arrowRed274" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>
      
      <!-- Surface floor -->
      <line x1="40" y1="200" x2="300" y2="200" stroke="#1e293b" stroke-width="3"/>
      <rect x="40" y="200" width="260" height="18" fill="url(#hatch274)"/>

      <!-- Normal line -->
      <line x1="170" y1="50" x2="170" y2="200" stroke="#64748b" stroke-dasharray="5,4" stroke-width="2"/>
      
      <!-- Incident velocity vector -->
      <line x1="80" y1="90" x2="170" y2="200" stroke="#2563eb" stroke-width="3" marker-end="url(#arrowRed274)"/>
      <circle cx="80" cy="90" r="10" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
      <text x="75" y="70" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">m</text>
      <text x="125" y="130" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#2563eb">u&#8407;</text>

      <!-- Angle theta with normal -->
      <path d="M 170 160 A 40 40 0 0 1 146 170" fill="none" stroke="#1e293b" stroke-width="2"/>
      <text x="150" y="185" font-family="Arial" font-size="14" font-style="italic" fill="#1e293b">&#952;</text>

      <!-- Coordinate axes -->
      <g transform="translate(360, 130)">
        <line x1="0" y1="40" x2="0" y2="-50" stroke="#1e293b" stroke-width="2" marker-end="url(#arrow274)"/>
        <line x1="-30" y1="0" x2="60" y2="0" stroke="#1e293b" stroke-width="2" marker-end="url(#arrow274)"/>
        <text x="65" y="5" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">+x</text>
        <text x="-5" y="-55" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">+y</text>
      </g>
    </svg>
  `,

  // Q284: Simple pendulum released from angle 60 deg, length 5 m
  284: `
    <svg width="400" height="340" viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch284" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" stroke-width="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Ceiling support -->
      <line x1="80" y1="40" x2="280" y2="40" stroke="#1e293b" stroke-width="3"/>
      <rect x="80" y="25" width="200" height="15" fill="url(#hatch284)"/>
      <circle cx="180" cy="40" r="4" fill="#1e293b"/>

      <!-- Vertical dashed line to lowest position A' -->
      <line x1="180" y1="40" x2="180" y2="280" stroke="#64748b" stroke-dasharray="5,4" stroke-width="2"/>
      
      <!-- Pendulum string to position A (angle 60 deg) -->
      <!-- Length = 240 px, dx = 240 * sin(60) = 207.8, dy = 240 * cos(60) = 120 -->
      <line x1="180" y1="40" x2="330" y2="185" stroke="#1e293b" stroke-width="2.5"/>
      <circle cx="330" cy="185" r="16" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
      <text x="355" y="190" font-family="Arial" font-size="16" font-weight="bold" fill="#1e293b">A</text>
      <text x="270" y="105" font-family="Arial" font-size="15" font-weight="bold" fill="#2563eb">5 m</text>

      <!-- Angle arc 60 deg -->
      <path d="M 180 90 A 50 50 0 0 1 223 65" fill="none" stroke="#1e293b" stroke-width="2"/>
      <text x="195" y="80" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">60&#176;</text>

      <!-- Lowest position A' -->
      <circle cx="180" cy="280" r="16" fill="#64748b" stroke="#334155" stroke-width="2" stroke-dasharray="3,3"/>
      <text x="175" y="315" font-family="Arial" font-size="16" font-weight="bold" fill="#1e293b">A'</text>
      
      <!-- Trajectory arc -->
      <path d="M 330 185 A 240 240 0 0 1 180 280" fill="none" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    </svg>
  `,

  // Q297: Rebound with velocity components
  297: `
    <svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch297" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" stroke-width="1.5" />
        </pattern>
        <marker id="arr297" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Floor -->
      <line x1="40" y1="210" x2="410" y2="210" stroke="#1e293b" stroke-width="3"/>
      <rect x="40" y="210" width="370" height="16" fill="url(#hatch297)"/>

      <!-- Collision point at x=225, y=210 -->
      <!-- Incoming vector -->
      <line x1="85" y1="70" x2="225" y2="210" stroke="#2563eb" stroke-width="3" marker-end="url(#arr297)"/>
      <text x="60" y="145" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">4 m/s</text>
      <text x="135" y="80" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">2 m/s</text>
      <!-- Component arrows for incoming -->
      <line x1="100" y1="120" x2="100" y2="155" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arr297)"/>
      <line x1="120" y1="95" x2="160" y2="95" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arr297)"/>

      <!-- Outgoing vector -->
      <line x1="225" y1="210" x2="365" y2="70" stroke="#16a34a" stroke-width="3" marker-end="url(#arr297)"/>
      <text x="270" y="95" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">1 m/s</text>
      <text x="350" y="145" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">2 m/s</text>
      <!-- Component arrows for outgoing -->
      <line x1="290" y1="110" x2="290" y2="80" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arr297)"/>
      <line x1="320" y1="130" x2="360" y2="130" stroke="#1e293b" stroke-width="1.5" marker-end="url(#arr297)"/>

      <line x1="225" y1="50" x2="225" y2="210" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
    </svg>
  `,

  // Q302: Mass m moving towards block m connected to spring
  302: `
    <svg width="500" height="240" viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch302" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" stroke-width="1.5" />
        </pattern>
        <marker id="arr302" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Floor -->
      <line x1="30" y1="180" x2="470" y2="180" stroke="#1e293b" stroke-width="3"/>
      <rect x="30" y="180" width="440" height="16" fill="url(#hatch302)"/>

      <!-- Right Wall -->
      <line x1="460" y1="70" x2="460" y2="180" stroke="#1e293b" stroke-width="4"/>
      <rect x="460" y="70" width="15" height="110" fill="url(#hatch302)"/>

      <!-- Moving block m -->
      <rect x="90" y="125" width="55" height="55" rx="3" fill="#e2e8f0" stroke="#1e293b" stroke-width="2.5"/>
      <text x="110" y="160" font-family="Arial" font-size="18" font-weight="bold" fill="#1e293b">m</text>
      <!-- Velocity arrow -->
      <line x1="117" y1="105" x2="160" y2="105" stroke="#2563eb" stroke-width="3" marker-end="url(#arr302)"/>
      <text x="135" y="95" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#2563eb">v</text>

      <!-- Target block m -->
      <rect x="230" y="125" width="55" height="55" rx="3" fill="#e2e8f0" stroke="#1e293b" stroke-width="2.5"/>
      <text x="250" y="160" font-family="Arial" font-size="18" font-weight="bold" fill="#1e293b">m</text>

      <!-- Spring attached to target block and right wall -->
      <path d="M 285 152 
               L 300 135 L 315 170 L 330 135 L 345 170 L 360 135 L 375 170 L 390 135 L 405 170 L 420 135 L 435 170 L 450 152 
               L 460 152" fill="none" stroke="#2563eb" stroke-width="3" stroke-linejoin="round"/>
      <text x="365" y="120" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#2563eb">k</text>
    </svg>
  `,

  // Q304: Force vs time triangle graph during collision
  304: `
    <svg width="420" height="280" viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr304" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Axes -->
      <line x1="70" y1="220" x2="370" y2="220" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr304)"/>
      <line x1="70" y1="220" x2="70" y2="40" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr304)"/>
      <text x="380" y="225" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">t</text>
      <text x="60" y="30" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">F</text>
      <text x="50" y="235" font-family="Arial" font-size="14" fill="#64748b">0</text>

      <!-- Triangle force graph -->
      <!-- Starts at (70, 220), peak at (190, 80), ends at (310, 220) -->
      <polygon points="70,220 190,80 310,220" fill="rgba(59, 130, 246, 0.15)"/>
      <line x1="70" y1="220" x2="190" y2="80" stroke="#2563eb" stroke-width="3"/>
      <line x1="190" y1="80" x2="310" y2="220" stroke="#2563eb" stroke-width="3"/>

      <!-- Peak dashed line -->
      <line x1="70" y1="80" x2="190" y2="80" stroke="#64748b" stroke-dasharray="4,4" stroke-width="1.5"/>
      <line x1="190" y1="80" x2="190" y2="220" stroke="#64748b" stroke-dasharray="4,4" stroke-width="1.5"/>

      <!-- Labels -->
      <text x="40" y="85" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">F&#8320;</text>
      <text x="175" y="242" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">t&#8320;/2</text>
      <text x="300" y="242" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">t&#8320;</text>
    </svg>
  `,

  // Q305: Potential energy U(x) piecewise graph
  305: `
    <svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr305" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Axes -->
      <line x1="70" y1="210" x2="390" y2="210" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr305)"/>
      <line x1="70" y1="210" x2="70" y2="40" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr305)"/>
      <text x="400" y="215" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">x</text>
      <text x="60" y="30" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">U</text>
      <text x="55" y="225" font-family="Arial" font-size="14" fill="#64748b">O</text>

      <!-- Segments:
           OA: from (70, 100) to (140, 130)  [gentle negative slope]
           AB: from (140, 130) to (210, 130) [flat]
           BC: from (210, 130) to (280, 60)  [steep positive slope: dy=70, dx=70]
           CD: from (280, 60) to (350, 60)   [flat]
      -->
      <line x1="70" y1="100" x2="140" y2="130" stroke="#2563eb" stroke-width="3"/>
      <line x1="140" y1="130" x2="210" y2="130" stroke="#2563eb" stroke-width="3"/>
      <line x1="210" y1="130" x2="280" y2="60" stroke="#dc2626" stroke-width="3.5"/>
      <line x1="280" y1="60" x2="350" y2="60" stroke="#2563eb" stroke-width="3"/>

      <!-- Dashed grid lines -->
      <line x1="140" y1="130" x2="140" y2="210" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
      <line x1="210" y1="130" x2="210" y2="210" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
      <line x1="280" y1="60" x2="280" y2="210" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>
      <line x1="350" y1="60" x2="350" y2="210" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>

      <!-- Point markers and labels -->
      <circle cx="70" cy="100" r="4" fill="#2563eb"/>
      <circle cx="140" cy="130" r="4" fill="#2563eb"/>
      <circle cx="210" cy="130" r="4" fill="#2563eb"/>
      <circle cx="280" cy="60" r="4" fill="#2563eb"/>
      <circle cx="350" cy="60" r="4" fill="#2563eb"/>

      <text x="135" y="230" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">A</text>
      <text x="205" y="230" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">B</text>
      <text x="275" y="230" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">C</text>
      <text x="345" y="230" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">D</text>
    </svg>
  `,

  // Q307: Mass m compressing spring k on frictionless floor
  307: `
    <svg width="450" height="230" viewBox="0 0 450 230" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch307" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#94a3b8" stroke-width="1.5" />
        </pattern>
        <marker id="arr307" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Frictionless Floor -->
      <line x1="40" y1="170" x2="410" y2="170" stroke="#1e293b" stroke-width="3"/>
      <rect x="40" y="170" width="370" height="16" fill="url(#hatch307)"/>
      <text x="180" y="210" font-family="Arial" font-size="14" font-weight="bold" fill="#64748b">Frictionless</text>

      <!-- Right Wall -->
      <line x1="400" y1="60" x2="400" y2="170" stroke="#1e293b" stroke-width="4"/>
      <rect x="400" y="60" width="15" height="110" fill="url(#hatch307)"/>

      <!-- Block of mass m -->
      <rect x="110" y="115" width="55" height="55" rx="3" fill="#e2e8f0" stroke="#1e293b" stroke-width="2.5"/>
      <text x="130" y="150" font-family="Arial" font-size="18" font-weight="bold" fill="#1e293b">m</text>
      <!-- Velocity arrow -->
      <line x1="140" y1="95" x2="190" y2="95" stroke="#2563eb" stroke-width="3" marker-end="url(#arr307)"/>
      <text x="160" y="85" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#2563eb">v</text>

      <!-- Spring attached to right wall -->
      <path d="M 270 142 
               L 282 125 L 294 160 L 306 125 L 318 160 L 330 125 L 342 160 L 354 125 L 366 160 L 378 125 L 390 142 
               L 400 142" fill="none" stroke="#2563eb" stroke-width="3" stroke-linejoin="round"/>
      <text x="330" y="110" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#2563eb">k</text>
    </svg>
  `,

  // Q309: Four situations of block sliding on planes
  309: `
    <svg width="600" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch309" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#94a3b8" stroke-width="1.2" />
        </pattern>
        <marker id="arr309" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- (1) Horizontal surface -->
      <g transform="translate(30, 40)">
        <text x="0" y="15" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">(1)</text>
        <line x1="30" y1="80" x2="230" y2="80" stroke="#1e293b" stroke-width="2.5"/>
        <rect x="30" y="80" width="200" height="12" fill="url(#hatch309)"/>
        <rect x="90" y="45" width="45" height="35" rx="2" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
        <text x="105" y="68" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">m</text>
        <line x1="135" y1="62" x2="175" y2="62" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr309)"/>
        <text x="150" y="52" font-family="Arial" font-size="14" font-style="italic" font-weight="bold" fill="#2563eb">u</text>
      </g>

      <!-- (2) Inclined at 30 deg up -->
      <g transform="translate(320, 20)">
        <text x="0" y="20" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">(2)</text>
        <line x1="30" y1="100" x2="230" y2="100" stroke="#1e293b" stroke-width="2"/>
        <polygon points="30,100 210,100 210,10" fill="#f1f5f9" stroke="#1e293b" stroke-width="2"/>
        <!-- Incline line -->
        <line x1="30" y1="100" x2="210" y2="10" stroke="#1e293b" stroke-width="2.5"/>
        <text x="75" y="93" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">30&#176;</text>
        <!-- Block sliding up -->
        <g transform="translate(110, 60) rotate(-26.5)">
          <rect x="-20" y="-30" width="40" height="30" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
          <text x="-6" y="-10" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">m</text>
          <line x1="20" y1="-15" x2="50" y2="-15" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr309)"/>
          <text x="30" y="-23" font-family="Arial" font-size="13" font-style="italic" font-weight="bold" fill="#2563eb">u</text>
        </g>
      </g>

      <!-- (3) Inclined at 45 deg up -->
      <g transform="translate(30, 160)">
        <text x="0" y="20" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">(3)</text>
        <line x1="30" y1="110" x2="230" y2="110" stroke="#1e293b" stroke-width="2"/>
        <polygon points="30,110 200,110 200,10" fill="#f1f5f9" stroke="#1e293b" stroke-width="2"/>
        <line x1="30" y1="110" x2="200" y2="10" stroke="#1e293b" stroke-width="2.5"/>
        <text x="70" y="102" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">45&#176;</text>
        <g transform="translate(110, 62) rotate(-30.5)">
          <rect x="-20" y="-30" width="40" height="30" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
          <text x="-6" y="-10" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">m</text>
          <line x1="20" y1="-15" x2="50" y2="-15" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr309)"/>
          <text x="30" y="-23" font-family="Arial" font-size="13" font-style="italic" font-weight="bold" fill="#2563eb">u</text>
        </g>
      </g>

      <!-- (4) Inclined at 30 deg sliding down -->
      <g transform="translate(320, 160)">
        <text x="0" y="20" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">(4)</text>
        <line x1="30" y1="110" x2="230" y2="110" stroke="#1e293b" stroke-width="2"/>
        <polygon points="30,110 210,110 210,20" fill="#f1f5f9" stroke="#1e293b" stroke-width="2"/>
        <line x1="30" y1="110" x2="210" y2="20" stroke="#1e293b" stroke-width="2.5"/>
        <text x="75" y="103" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">30&#176;</text>
        <g transform="translate(140, 55) rotate(-26.5)">
          <rect x="-20" y="-30" width="40" height="30" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
          <text x="-6" y="-10" font-family="Arial" font-size="13" font-weight="bold" fill="#1e293b">m</text>
          <!-- Sliding DOWN -->
          <line x1="-20" y1="-15" x2="-50" y2="-15" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arr309)"/>
          <text x="-40" y="-23" font-family="Arial" font-size="13" font-style="italic" font-weight="bold" fill="#2563eb">u</text>
        </g>
      </g>
    </svg>
  `,

  // Q315: Fruit of mass m falling from height h from tree
  315: `
    <svg width="420" height="320" viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr315" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
        </marker>
        <marker id="arrV315" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Ground -->
      <line x1="40" y1="280" x2="380" y2="280" stroke="#1e293b" stroke-width="3"/>
      
      <!-- Tree Trunk & Foliage -->
      <path d="M 180 280 C 190 230 185 190 200 160 C 215 190 210 230 220 280 Z" fill="#92400e" stroke="#78350f" stroke-width="2"/>
      <circle cx="200" cy="110" r="65" fill="#16a34a" opacity="0.85"/>
      <circle cx="150" cy="120" r="50" fill="#15803d" opacity="0.85"/>
      <circle cx="250" cy="120" r="50" fill="#15803d" opacity="0.85"/>
      <circle cx="200" cy="70" r="45" fill="#22c55e" opacity="0.85"/>

      <!-- Fruit falling -->
      <circle cx="120" cy="130" r="12" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
      <text x="140" y="135" font-family="Arial" font-size="15" font-weight="bold" fill="#1e293b">m</text>

      <!-- Falling trajectory dashed line -->
      <line x1="120" y1="145" x2="120" y2="280" stroke="#64748b" stroke-dasharray="4,4" stroke-width="2"/>
      <line x1="120" y1="230" x2="120" y2="270" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrV315)"/>
      <text x="130" y="255" font-family="Arial" font-size="15" font-style="italic" font-weight="bold" fill="#dc2626">v</text>

      <!-- Height dimension h -->
      <line x1="75" y1="130" x2="75" y2="280" stroke="#1e293b" stroke-width="1.8" marker-start="url(#arr315)" marker-end="url(#arr315)"/>
      <line x1="65" y1="130" x2="115" y2="130" stroke="#64748b" stroke-dasharray="3,3" stroke-width="1"/>
      <line x1="65" y1="280" x2="115" y2="280" stroke="#64748b" stroke-dasharray="3,3" stroke-width="1"/>
      <text x="50" y="210" font-family="Arial" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">h</text>
    </svg>
  `,

  // Q322: Potential energy U(r) vs r graph with points P, Q, R, S
  322: `
    <svg width="450" height="280" viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr322" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Axes -->
      <line x1="60" y1="230" x2="410" y2="230" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr322)"/>
      <line x1="60" y1="230" x2="60" y2="30" stroke="#1e293b" stroke-width="2.5" marker-end="url(#arr322)"/>
      <text x="415" y="235" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">r</text>
      <text x="45" y="25" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#1e293b">U(r)</text>

      <!-- Smooth curve passing through P, Q (local max), R (local min), S -->
      <path d="M 90 190 
               C 120 120, 150 70, 180 70 
               C 210 70, 240 210, 280 210 
               C 320 210, 340 160, 360 140" 
            fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>

      <!-- Points -->
      <circle cx="105" cy="155" r="5" fill="#1e293b"/>
      <text x="90" y="155" font-family="Arial" font-size="16" font-weight="bold" fill="#1e293b">P</text>

      <circle cx="180" cy="70" r="5" fill="#dc2626"/>
      <text x="175" y="55" font-family="Arial" font-size="16" font-weight="bold" fill="#dc2626">Q</text>

      <circle cx="280" cy="210" r="5" fill="#dc2626"/>
      <text x="275" y="228" font-family="Arial" font-size="16" font-weight="bold" fill="#dc2626">R</text>

      <circle cx="345" cy="150" r="5" fill="#1e293b"/>
      <text x="355" y="150" font-family="Arial" font-size="16" font-weight="bold" fill="#1e293b">S</text>
    </svg>
  `,

  // Q323: Toy car at height H slides down into circle of radius r, height gap h
  323: `
    <svg width="480" height="320" viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr323" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Ground -->
      <line x1="40" y1="270" x2="450" y2="270" stroke="#1e293b" stroke-width="3"/>

      <!-- Smooth track from height H down into circle of radius r -->
      <!-- Track platform at H: x=70 to 120 at y=70 -->
      <!-- Smooth slope down to ground: x=120, y=70 -> cubic bezier to x=280, y=270 -->
      <path d="M 70 70 L 130 70 C 190 70, 240 270, 310 270" fill="none" stroke="#1e293b" stroke-width="3"/>

      <!-- Vertical circle at bottom: center (370, 210), radius r=60 (bottom at 270, top at 150) -->
      <circle cx="370" cy="210" r="60" fill="none" stroke="#2563eb" stroke-width="3"/>
      
      <!-- Radius line inside circle -->
      <line x1="370" y1="210" x2="415" y2="168" stroke="#2563eb" stroke-width="2"/>
      <circle cx="370" cy="210" r="3" fill="#2563eb"/>
      <text x="390" y="185" font-family="Arial" font-size="15" font-style="italic" font-weight="bold" fill="#2563eb">r</text>

      <!-- Toy car on platform -->
      <g transform="translate(85, 45)">
        <rect x="0" y="10" width="35" height="12" rx="3" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
        <path d="M 7 10 L 13 2 L 24 2 L 30 10 Z" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
        <circle cx="8" cy="22" r="4" fill="#334155"/>
        <circle cx="27" cy="22" r="4" fill="#334155"/>
      </g>

      <!-- Dimension H -->
      <line x1="55" y1="70" x2="55" y2="270" stroke="#1e293b" stroke-width="1.8" marker-start="url(#arr323)" marker-end="url(#arr323)"/>
      <text x="35" y="175" font-family="Arial" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">H</text>

      <!-- Dimension h (difference between top of slope and top of circle) -->
      <line x1="130" y1="70" x2="370" y2="70" stroke="#64748b" stroke-dasharray="4,4" stroke-width="1.5"/>
      <line x1="370" y1="150" x2="390" y2="150" stroke="#64748b" stroke-dasharray="4,4" stroke-width="1.5"/>
      <line x1="385" y1="70" x2="385" y2="150" stroke="#1e293b" stroke-width="1.8" marker-start="url(#arr323)" marker-end="url(#arr323)"/>
      <text x="395" y="115" font-family="Arial" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">h</text>
    </svg>
  `,

  // Q324: Vertical circle with points A, B, C
  324: `
    <svg width="340" height="340" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Circle of radius 100 at center (170, 170) -->
      <circle cx="170" cy="170" r="105" fill="none" stroke="#2563eb" stroke-width="3"/>
      <circle cx="170" cy="170" r="4" fill="#1e293b"/>
      <text x="180" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#1e293b">O</text>

      <!-- Vertical diameter line connecting A and C -->
      <line x1="170" y1="65" x2="170" y2="275" stroke="#64748b" stroke-dasharray="5,4" stroke-width="2"/>
      <!-- Horizontal radius line connecting O and B -->
      <line x1="65" y1="170" x2="170" y2="170" stroke="#64748b" stroke-dasharray="5,4" stroke-width="2"/>

      <!-- Point A (top) -->
      <circle cx="170" cy="65" r="6" fill="#1e293b"/>
      <text x="163" y="50" font-family="Arial" font-size="18" font-weight="bold" fill="#1e293b">A</text>

      <!-- Point B (horizontal) -->
      <circle cx="65" cy="170" r="6" fill="#1e293b"/>
      <text x="42" y="176" font-family="Arial" font-size="18" font-weight="bold" fill="#1e293b">B</text>

      <!-- Point C (bottom) -->
      <circle cx="170" cy="275" r="6" fill="#1e293b"/>
      <text x="163" y="305" font-family="Arial" font-size="18" font-weight="bold" fill="#1e293b">C</text>
    </svg>
  `,

  // Q332: Release from height h on frictionless track into loop of radius R
  332: `
    <svg width="460" height="300" viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr332" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff"/>

      <!-- Smooth track releasing from height h -->
      <path d="M 60 70 C 60 180, 140 250, 240 250" fill="none" stroke="#1e293b" stroke-width="3"/>
      <!-- Circular loop of radius R = 50: center (290, 200), bottom at 250, top at 150 -->
      <circle cx="290" cy="200" r="50" fill="none" stroke="#2563eb" stroke-width="3"/>

      <!-- Radius R line -->
      <line x1="290" y1="200" x2="335" y2="175" stroke="#2563eb" stroke-width="2"/>
      <circle cx="290" cy="200" r="3" fill="#2563eb"/>
      <text x="305" y="185" font-family="Arial" font-size="16" font-style="italic" font-weight="bold" fill="#2563eb">R</text>

      <!-- Block at top of incline -->
      <g transform="translate(50, 60) rotate(-35)">
        <rect x="0" y="0" width="24" height="24" rx="2" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
      </g>

      <!-- Ground baseline -->
      <line x1="30" y1="250" x2="380" y2="250" stroke="#94a3b8" stroke-dasharray="4,4" stroke-width="1.5"/>

      <!-- Dimension h -->
      <line x1="35" y1="70" x2="35" y2="250" stroke="#1e293b" stroke-width="1.8" marker-start="url(#arr332)" marker-end="url(#arr332)"/>
      <text x="18" y="165" font-family="Arial" font-size="18" font-style="italic" font-weight="bold" fill="#1e293b">h</text>
    </svg>
  `
};

async function generateBatch3Diagrams() {
  console.log('Generating Batch 3 SVG & PNG diagrams...');
  const results = {};

  for (const [qNum, svgContent] of Object.entries(diagrams)) {
    const filename = `wpe_q${qNum}.png`;
    const backendPath = path.join(backendUploadDir, filename);
    const frontendPath = path.join(frontendUploadDir, filename);

    const svgBuffer = Buffer.from(svgContent.trim());
    await sharp(svgBuffer, { density: 300 })
      .png()
      .toFile(backendPath);

    fs.copyFileSync(backendPath, frontendPath);
    console.log(`[Batch 3] Rendered local diagram for Q${qNum} -> ${filename}`);

    let cloudinaryUrl = '';
    try {
      const uploadRes = await cloudinary.uploader.upload(backendPath, {
        folder: 'edvedum/questions/work_energy_power',
        public_id: `wpe_q${qNum}_${Date.now()}`,
        overwrite: true
      });
      cloudinaryUrl = uploadRes.secure_url;
      console.log(`[Batch 3] Cloudinary upload for Q${qNum}: ${cloudinaryUrl}`);
    } catch (uploadErr) {
      console.warn(`[Batch 3] Cloudinary upload failed for Q${qNum}:`, uploadErr.message);
    }

    results[qNum] = {
      local_file: filename,
      local_url: `/uploads/work_energy_power/${filename}`,
      cloudinary_url: cloudinaryUrl
    };
  }

  const mapPath = path.resolve(__dirname, 'work_energy_power_batch3_diagrams.json');
  fs.writeFileSync(mapPath, JSON.stringify(results, null, 2));
  console.log(`\n Successfully generated and uploaded ${Object.keys(results).length} diagrams for Batch 3.`);
}

generateBatch3Diagrams().catch(console.error);
