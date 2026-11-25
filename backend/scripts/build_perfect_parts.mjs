import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electro_raw_blocks.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_diagram_urls_v2.json'), 'utf8'));

// Common replacements
function cleanProse(str) {
  if (!str) return '';
  return str
    .replace(/\bpaint\b/gi, 'point')
    .replace(/\b13\b(?=, then brought in contact with C)/g, 'B')
    .replace(/\b13\b(?= and C)/g, 'B')
    .replace(/\bBB and C'\b/g, 'B and C')
    .replace(/\bBB\b(?= and C)/g, 'B')
    .replace(/\bAcharged\b/g, 'A charged')
    .replace(/\bts centre\b/gi, 'its centre')
    .replace(/\bts center\b/gi, 'its center')
    .replace(/\bts axis\b/gi, 'its axis')
    .replace(/\bvalue of g\b/gi, 'value of q')
    .replace(/\bcharge g\b/gi, 'charge q')
    .replace(/\bcharges g\b/gi, 'charges q')
    .replace(/\bg1\b/g, 'q_1')
    .replace(/\bg2\b/g, 'q_2')
    .replace(/\bgs\b/g, 'q_3')
    .replace(/\b—qu\b/g, '-q_1')
    .replace(/\b—qi\b/g, '-q_1')
    .replace(/\b2-component\b/gi, 'x-component')
    .replace(/\bz-axis\b/gi, 'x-axis')
    .replace(/\bz-direction\b/gi, 'x-direction')
    .replace(/\bz -axis\b/gi, 'x-axis')
    .replace(/\bz\s*=\s*/g, 'x = ')
    .replace(/\bjum\b/g, '\\mu\\text{m}')
    .replace(/\buC\b/g, '\\mu\\text{C}')
    .replace(/\bTiC\b/g, '7\\mu\\text{C}')
    .replace(/\b10¢ V \/m\b/g, '10^4\\text{ V/m}')
    .replace(/\b10c V \/m\b/g, '10^4\\text{ V/m}')
    .replace(/\b3 x 10¢\b/g, '3 \\times 10^4')
    .replace(/\b3 x 10c\b/g, '3 \\times 10^4')
    .replace(/\b9.9 x 10" kg\b/g, '9.9 \\times 10^{-15}\\text{ kg}')
    .replace(/\b10" kg\b/g, '10^{-15}\\text{ kg}')
    .replace(/\ba-particle\b/gi, '\\alpha\\text{-particle}')
    .replace(/\b5MeV\b/g, '5\\text{ MeV}')
    .replace(/\b5 MeV\b/g, '5\\text{ MeV}')
    .replace(/\bF'\b/g, 'F')
    .replace(/\beo\b/g, '\\varepsilon_0')
    .replace(/\bfen\b/g, '\\varepsilon_0')
    .replace(/\b4me,\b/g, '4\\pi\\varepsilon_0')
    .replace(/\bIme,\b/g, '4\\pi\\varepsilon_0')
    .replace(/\b2me,L\b/g, '2\\pi\\varepsilon_0 L')
    .replace(/\b3me,L\b/g, '3\\pi\\varepsilon_0 L')
    .replace(/\bcosh\b/g, '\\cos\\theta')
    .replace(/\bcot\b/g, '\\cot\\theta')
    .replace(/\bging\b/g, '\\sin\\theta')
    .replace(/\btang\b/g, '\\tan\\theta')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanQuestionStart(str) {
  if (!str) return '';
  return str.replace(/^[\"\'\\(\\[]?(\d{1,3}|[M©§a-zA-Z\.\-\*\#\s]{1,4})[\.\:\;\,\s\-]+\s*/i, '').trim();
}

function isMarksLine(s) {
  const l = s.trim();
  if (!l) return true;
  if (/(?:marks|mars|mks|marking|Shift|Offline|wrong|wong|wang|wiong)\b/i.test(l)) return true;
  if (/^[-—\=\_\.\s\~\[\]\{\}\(\)]{3,}$/.test(l)) return true;
  if (/(?:\[|\b)?(?:ER|Trp|TET|Rw|Pr|T—)\s*[-—\=]/i.test(l)) return true;
  if (/^\[?ER\s*T/i.test(l)) return true;
  if (/^\[?[A-Za-z\s]{0,4}\d{1,2}\s*(?:marks|mars|mks|mark)/i.test(l)) return true;
  if (/^(?:Tak\s*TR|Treokt|Pepa)/i.test(l)) return true;
  return false;
}

// Handcrafted dictionary for questions where OCR was too degraded to extract pure math options
const ACCURATE_OVERRIDES = {
  1: {
    text: "If a charge $q$ is placed at the centre of the line joining two equal charges $Q$ such that the system is in equilibrium, then the value of $q$ is:",
    options: ["-Q/8", "-Q/2", "-Q", "-Q/4"]
  },
  2: {
    text: "On moving a charge of $20\\text{ C}$ by $2\\text{ cm}$, $2\\text{ J}$ of work is done, then the potential difference between the points is:",
    options: ["0.1\\text{ V}", "8\\text{ V}", "2\\text{ V}", "0.5\\text{ V}"]
  },
  3: {
    text: "A charged particle $q$ is placed at the centre $O$ of cube of length $L$ ($ABCDEFGH$). Another same charge $q$ is placed at a distance $L$ from $O$. Then the electric flux through $ABCD$ is:",
    options: ["\\frac{q}{4\\pi\\varepsilon_0 L}", "\\text{zero}", "\\frac{q}{2\\pi\\varepsilon_0 L}", "\\frac{q}{3\\pi\\varepsilon_0 L}"]
  },
  4: {
    text: "Three charges $-q_1$, $+q_2$ and $-q_3$ are placed as shown in the figure. The $x$-component of the force on $-q_1$ is proportional to:",
    options: [
      "\\frac{q_2}{b^2} - \\frac{q_3}{a^2} \\cos\\theta",
      "\\frac{q_2}{b^2} + \\frac{q_3}{a^2} \\sin\\theta",
      "\\frac{q_2}{b^2} + \\frac{q_3}{a^2} \\cos\\theta",
      "\\frac{q_2}{b^2} - \\frac{q_3}{a^2} \\sin\\theta"
    ]
  },
  5: {
    text: "A thin spherical conducting shell of radius $R$ has a charge $q$. Another charge $Q$ is placed at the centre of the shell. The electrostatic potential at a point $P$ at a distance $R/2$ from the centre of the shell is:",
    options: [
      "\\frac{2Q}{4\\pi\\varepsilon_0 R}",
      "\\frac{2Q}{4\\pi\\varepsilon_0 R} - \\frac{2q}{4\\pi\\varepsilon_0 R}",
      "\\frac{2Q}{4\\pi\\varepsilon_0 R} + \\frac{q}{4\\pi\\varepsilon_0 R}",
      "\\frac{q + Q}{4\\pi\\varepsilon_0 R}"
    ]
  },
  6: {
    text: "If the electric flux entering and leaving an enclosed surface respectively is $\\phi_1$ and $\\phi_2$, the electric charge inside the surface will be:",
    options: [
      "(\\phi_2 - \\phi_1)\\varepsilon_0",
      "(\\phi_1 + \\phi_2)\\varepsilon_0",
      "(\\phi_1 - \\phi_2)\\varepsilon_0",
      "(\\phi_2 + \\phi_1)/\\varepsilon_0"
    ]
  },
  7: {
    text: "Two spherical conductors $B$ and $C$ having equal radii and carrying equal charges in them repel each other with a force $F$ when kept apart at some distance. A third spherical conductor having same radius as that of $B$ but uncharged is brought in contact with $B$, then brought in contact with $C$ and finally removed away from both. The new force of repulsion between $B$ and $C$ is:",
    options: ["\\frac{F}{4}", "\\frac{3F}{4}", "\\frac{F}{8}", "\\frac{3F}{8}"]
  },
  8: {
    text: "A charged oil drop is suspended in a uniform field of $3 \\times 10^4\\text{ V/m}$ so that it neither falls nor rises. The charge on the drop will be (take the mass of the charge $= 9.9 \\times 10^{-15}\\text{ kg}$ and $g = 10\\text{ m/s}^2$):",
    options: [
      "3.3 \\times 10^{-18}\\text{ C}",
      "3.3 \\times 10^{-12}\\text{ C}",
      "1.6 \\times 10^{-19}\\text{ C}",
      "4.8 \\times 10^{-19}\\text{ C}"
    ]
  },
  9: {
    text: "Four charges equal to $-Q$ are placed at the four corners of a square and a charge $q$ is at its centre. If the system is in equilibrium the value of $q$ is:",
    options: [
      "-\\frac{Q}{4}(1 + 2\\sqrt{2})",
      "\\frac{Q}{4}(1 + 2\\sqrt{2})",
      "-\\frac{Q}{2}(1 + 2\\sqrt{2})",
      "\\frac{Q}{2}(1 + 2\\sqrt{2})"
    ]
  },
  10: {
    text: "An $\\alpha$-particle of energy $5\\text{ MeV}$ is scattered through $180^\\circ$ by a fixed uranium nucleus. The distance of the closest approach is of the order of:",
    options: ["10^{-8}\\text{ cm}", "10^{-10}\\text{ cm}", "10^{-12}\\text{ cm}", "10^{-15}\\text{ cm}"]
  },
  11: {
    text: "A charged particle $q$ is shot towards another charged particle $Q$ which is fixed, with a speed $v$. It approaches $Q$ upto a closest distance $r$ and then returns. If $q$ were given a speed $2v$, the closest distance of approach would be:",
    options: ["r", "2r", "r/4", "r/2"]
  },
  12: {
    text: "Two point charges $+8q$ and $-2q$ are located at $x = 0$ and $x = L$ respectively. The location of a point on the $x$-axis at which the net electric field due to these two point charges is zero is:",
    options: ["2L", "L/4", "8L", "4L"]
  },
  13: {
    text: "A charged ball $B$ hangs from a silk thread which makes an angle $\\theta$ with a large charged conducting sheet $P$, as shown in the figure. The surface charge density $\\sigma$ of the sheet is proportional to:",
    options: ["\\cos\\theta", "\\cot\\theta", "\\sin\\theta", "\\tan\\theta"]
  },
  14: {
    text: "Two thin wire rings each having a radius $R$ are placed at a distance $d$ apart with their axes coinciding. The charges on the two rings are $+q$ and $-q$. The potential difference between the centres of the two rings is:",
    options: [
      "\\text{zero}",
      "\\frac{q}{4\\pi\\varepsilon_0}\\left[\\frac{1}{R} - \\frac{1}{\\sqrt{R^2 + d^2}}\\right]",
      "\\frac{q}{2\\pi\\varepsilon_0}\\left[\\frac{1}{R} - \\frac{1}{\\sqrt{R^2 + d^2}}\\right]",
      "\\frac{q}{4\\pi\\varepsilon_0 d}"
    ]
  },
  15: {
    text: "Two spherical conductors $A$ and $B$ of radii $1\\text{ mm}$ and $2\\text{ mm}$ are separated by a distance of $5\\text{ cm}$ and are uniformly charged. If the spheres are connected by a conducting wire then in equilibrium condition, the ratio of the magnitude of the electric fields at the surface of spheres $A$ and $B$ is:",
    options: ["1 : 2", "4 : 1", "1 : 4", "2 : 1"]
  },
  16: {
    text: "Two insulating plates are both uniformly charged in such a way that the potential difference between them is $V_2 - V_1 = 20\\text{ V}$ (i.e. plate 2 is at a higher potential). The plates are separated by $d = 0.1\\text{ m}$ and can be treated as infinitely large. An electron is released from rest on the inner surface of plate 1. What is its speed when it hits plate 2? ($e = 1.6 \\times 10^{-19}\\text{ C}$, $m_e = 9.11 \\times 10^{-31}\\text{ kg}$):",
    options: [
      "3.3 \\times 10^6\\text{ m/s}",
      "2.65 \\times 10^6\\text{ m/s}",
      "7.02 \\times 10^6\\text{ m/s}",
      "1.87 \\times 10^6\\text{ m/s}"
    ]
  },
  17: {
    text: "An electric dipole is placed at an angle of $30^\\circ$ to a non-uniform electric field. The dipole will experience:",
    options: [
      "a torque only",
      "a translational force only in the direction of the field",
      "a translational force only in a direction normal to the direction of the field",
      "a torque as well as a translational force"
    ]
  },
  18: {
    text: "If $g_e$ and $g_m$ are the accelerations due to gravity on the surfaces of the earth and the moon respectively and if Millikan's oil drop experiment could be performed on the two surfaces, one will find the ratio $E_e / E_m$ to be:",
    options: ["g_e / g_m", "1", "g_m / g_e", "0"]
  },
  19: {
    text: "Charges are placed on the vertices of a square as shown. Let $\\vec{E}$ be the electric field and $V$ the potential at the centre. If the charges on $A$ and $B$ are interchanged with those on $D$ and $C$ respectively, then:",
    options: [
      "\\vec{E} remains unchanged, V changes",
      "Both \\vec{E} and V change",
      "\\vec{E} and V remain unchanged",
      "\\vec{E} changes, V remains unchanged"
    ]
  },
  20: {
    text: "The potential at a point $x$ (measured in $\\mu\\text{m}$) due to some charges situated on the $x$-axis is given by $V(x) = \\frac{20}{x^2 - 4}\\text{ Volts}$. The electric field $E$ at $x = 4\\mu\\text{m}$ is given by:",
    options: [
      "\\frac{5}{3}\\text{ V/\\mu m} and in the -ve x-direction",
      "\\frac{5}{3}\\text{ V/\\mu m} and in the +ve x-direction",
      "\\frac{10}{9}\\text{ V/\\mu m} and in the -ve x-direction",
      "\\frac{10}{9}\\text{ V/\\mu m} and in the +ve x-direction"
    ]
  },
  21: {
    text: "An electric charge $10^{-3}\\mu\\text{C}$ is placed at the origin $(0, 0)$ of an $X-Y$ coordinate system. Two points $A$ and $B$ are situated at $(\\sqrt{2}, \\sqrt{2})$ and $(2, 0)$ respectively. The potential difference between the points $A$ and $B$ will be:",
    options: ["4.5\\text{ V}", "0\\text{ V}", "9\\text{ V}", "2\\text{ V}"]
  },
  22: {
    text: "A thin spherical shell of radius $R$ has charge $Q$ spread uniformly over its surface. Which of the following graphs most closely represents the electric field $E(r)$ produced by the shell in the range $0 \\le r < \\infty$, where $r$ is the distance from the centre of the shell?",
    options: [
      "E = 0 for r < R, and E \\propto 1/r^2 for r \\ge R",
      "E \\propto r for r < R, and E \\propto 1/r^2 for r \\ge R",
      "E \\propto 1/r for r < R, and E \\propto 1/r^2 for r \\ge R",
      "E = \\text{constant} for r < R, and E = 0 for r \\ge R"
    ]
  },
  23: {
    text: "A charge $Q$ is placed at each of the opposite corners of a square. A charge $q$ is placed at each of the other two corners. If the net electrical force on $Q$ is zero, then $Q/q$ equals:",
    options: ["-2\\sqrt{2}", "-1", "1", "-\\frac{1}{\\sqrt{2}}"]
  },
  24: {
    text: "Let $\\rho(r) = \\frac{Q r}{\\pi R^4}$ be the charge density distribution for a solid sphere of radius $R$ and total charge $Q$. For a point $P$ inside the sphere at a distance $r_1$ from the centre of the sphere, the magnitude of electric field is:",
    options: [
      "\\frac{Q r_1^2}{4\\pi\\varepsilon_0 R^4}",
      "\\frac{Q r_1^2}{3\\pi\\varepsilon_0 R^4}",
      "\\frac{Q}{4\\pi\\varepsilon_0 r_1^2}",
      "\\text{zero}"
    ]
  },
  25: {
    text: "Two points $P$ and $Q$ are maintained at the potentials of $10\\text{ V}$ and $-4\\text{ V}$ respectively. The work done in moving $100$ electrons from $P$ to $Q$ is:",
    options: [
      "-2.24 \\times 10^{-16}\\text{ J}",
      "2.24 \\times 10^{-16}\\text{ J}",
      "-9.60 \\times 10^{-17}\\text{ J}",
      "9.60 \\times 10^{-17}\\text{ J}"
    ]
  },
  26: {
    text: "Statement-1: For a charged particle moving from point $P$ to point $Q$, the net work done by an electrostatic field on the particle is independent of the path connecting point $P$ to point $Q.\\nStatement-2: The net work done by a conservative force on an object moving along a closed loop is zero.",
    options: [
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is true, Statement-2 is true; Statement-2 is the correct explanation of Statement-1.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not the correct explanation of Statement-1.",
      "Statement-1 is false, Statement-2 is true"
    ]
  },
  27: {
    text: "Two identical charged spheres are suspended by strings of equal lengths. The strings make an angle of $30^\\circ$ with each other. When suspended in a liquid of density $0.8\\text{ g/cm}^3$, the angle remains the same. If density of the material of the sphere is $1.6\\text{ g/cm}^3$, the dielectric constant of the liquid is:",
    options: ["4", "3", "2", "1"]
  },
  28: {
    text: "A spherical conductor of radius $R$ has a charge $Q$. The electrostatic potential energy of the conductor is:",
    options: [
      "\\frac{Q^2}{8\\pi\\varepsilon_0 R}",
      "\\frac{Q^2}{4\\pi\\varepsilon_0 R}",
      "\\frac{Q^2}{2\\pi\\varepsilon_0 R}",
      "\\frac{3Q^2}{8\\pi\\varepsilon_0 R}"
    ]
  },
  29: {
    text: "A non-conducting solid sphere of radius $R$ is uniformly charged. The electric field at a distance $r$ from the centre ($r < R$) is proportional to:",
    options: ["r^{-1}", "r^{-2}", "r", "r^2"]
  },
  30: {
    text: "Two electric dipoles of moments $p$ and $64p$ are placed in opposite directions on a line at a distance of $25\\text{ cm}$. The electric field will be zero at a point between the dipoles whose distance from the dipole of moment $p$ is:",
    options: ["5\\text{ cm}", "\\frac{25}{9}\\text{ cm}", "10\\text{ cm}", "4\\text{ cm}"]
  }
};

console.log('Overrides count:', Object.keys(ACCURATE_OVERRIDES).length);
