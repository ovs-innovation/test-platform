import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read existing Part 1
import { ELECTRO_PART1_OVERRIDES } from './clean_electro_part1.mjs';
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// High quality manual overrides for all questions in Part 1 where OCR was noisy
const P1_CORRECTIONS = {
  1: {
    text: "If a charge $q$ is placed at the centre of the line joining two equal charges $Q$ such that the system is in equilibrium, then the value of $q$ is:",
    options: ["-\\frac{Q}{8}", "-\\frac{Q}{2}", "-Q", "-\\frac{Q}{4}"]
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
  },
  31: {
    text: "Two identical charged spheres suspended from a common point by two massless strings of length $l$ are initially a distance $d$ ($d \\ll l$) apart because of their mutual repulsion. The charge begins to leak from both the spheres at a constant rate. As a result, the spheres approach each other with velocity $v$. Then as a function of distance $x$ between them:",
    options: ["v \\propto x^{-1}", "v \\propto x^{1/2}", "v \\propto x^{-1/2}", "v \\propto x"]
  },
  32: {
    text: "The electrostatic potential inside a charged spherical ball is given by $\\phi = a r^2 + b$ where $r$ is the distance from the centre; $a, b$ are constants. Then the charge density inside the ball is:",
    options: ["-6a\\varepsilon_0", "-24\\pi a\\varepsilon_0", "-6\\pi a\\varepsilon_0", "-24a\\varepsilon_0 r"]
  },
  33: {
    text: "Statement 1: For a charged conducting sphere, electric field just outside the surface is $\\sigma / \\varepsilon_0$.\\nStatement 2: Electric field inside the conducting sphere is zero.",
    options: [
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is false",
      "Statement 1 is true, Statement 2 is true; Statement 2 is the correct explanation of Statement 1",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not the correct explanation of Statement 1"
    ]
  },
  34: {
    text: "The electric potential $V(x)$ in a region around the origin is given by $V(x) = 4x^2\\text{ volts}$. The electric charge enclosed in a cube of $1\\text{ m}$ side with its centre at the origin is (in coulomb):",
    options: ["8\\varepsilon_0", "-4\\varepsilon_0", "0", "-8\\varepsilon_0"]
  },
  35: {
    text: "A charge of total amount $Q$ is distributed over two concentric hollow spheres of radii $r$ and $R$ ($R > r$) such that the surface charge densities on the two spheres are equal. The electric potential at the common centre is:",
    options: [
      "\\frac{Q(R - r)}{4\\pi\\varepsilon_0(R^2 + r^2)}",
      "\\frac{(R + r)Q}{2\\pi\\varepsilon_0(R^2 + r^2)}",
      "\\frac{Q(R + r)}{4\\pi\\varepsilon_0(R^2 + r^2)}",
      "\\frac{Q(R + r)}{8\\pi\\varepsilon_0(R^2 + r^2)}"
    ]
  },
  36: {
    text: "Two small spheres each having the charge $+Q$ are suspended by insulating threads of length $L$ from a hook. This arrangement is taken in space where there is no gravity (state of weightlessness). Then the angle between the two suspensions and tension in each will be:",
    options: [
      "180^\\circ, \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q^2}{(2L)^2}",
      "90^\\circ, \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q^2}{L^2}",
      "180^\\circ, \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q^2}{2L^2}",
      "180^\\circ, \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q^2}{L^2}"
    ]
  },
  37: {
    text: "A hemispherical surface of radius $R$ is placed in a uniform electric field $E$ parallel to the axis of the hemisphere. The flux of electric field through the curved surface is:",
    options: ["2\\pi R^2 E", "\\pi R^2 E", "4\\pi R^2 E", "\\text{zero}"]
  },
  38: {
    text: "A charge $Q$ is uniformly distributed over a long rod $AB$ of length $L$ as shown in the figure. The electric potential at the point $O$ lying at a distance $L$ from the end $A$ is:",
    options: [
      "\\frac{Q}{8\\pi\\varepsilon_0 L}",
      "\\frac{3Q}{4\\pi\\varepsilon_0 L}",
      "\\frac{Q}{4\\pi\\varepsilon_0 L \\ln 2}",
      "\\frac{Q \\ln 2}{4\\pi\\varepsilon_0 L}"
    ]
  },
  39: {
    text: "The electric field in a region is given by $\\vec{E} = \\frac{A}{x^3}\\hat{i}$. An expression for the potential in the region assuming the potential at infinity to be zero is:",
    options: ["\\frac{A}{x}", "\\frac{A}{2x^2}", "\\frac{A}{x^2}", "-\\frac{A}{2x^2}"]
  },
  40: {
    text: "Four charges $+q, -q, +q, -q$ are placed at corners $A, B, C, D$ of a square of side $a$. The electric potential at the centre $O$ of the square is:",
    options: [
      "\\frac{4q}{\\sqrt{2}\\pi\\varepsilon_0 a}",
      "\\text{zero}",
      "\\frac{q}{4\\pi\\varepsilon_0 a}",
      "\\frac{2q}{\\pi\\varepsilon_0 a}"
    ]
  },
  41: {
    text: "Two point dipoles $p\\hat{k}$ and $p\\hat{k}$ are located at $(0, 0, 0)$ and $(1\\text{ m}, 0, 2\\text{ m})$ respectively. The resultant electric field due to the dipoles at $(1\\text{ m}, 0, 0)$ is:",
    options: [
      "\\frac{7p}{32\\pi\\varepsilon_0}\\hat{k}",
      "-\\frac{7p}{32\\pi\\varepsilon_0}\\hat{k}",
      "\\text{zero}",
      "\\frac{9p}{32\\pi\\varepsilon_0}\\hat{k}"
    ]
  },
  42: {
    text: "Two small equal point charges of magnitude $q$ are suspended from a common point on the ceiling by two insulating strings of length $L$. If the separation $x$ between the charges is very small ($x \\ll L$), then $x$ is equal to:",
    options: [
      "\\left(\\frac{q^2 L}{2\\pi\\varepsilon_0 mg}\\right)^{1/3}",
      "\\left(\\frac{q^2 L}{4\\pi\\varepsilon_0 mg}\\right)^{1/3}",
      "\\left(\\frac{q^2 L}{2\\pi\\varepsilon_0 mg}\\right)^{1/2}",
      "\\left(\\frac{q^2 L}{4\\pi\\varepsilon_0 mg}\\right)^{1/2}"
    ]
  },
  43: {
    text: "Two charges $q_1 = 5.0\\mu\\text{C}$ and $q_2 = -2.0\\mu\\text{C}$ are placed at $(2\\text{ cm}, 0, 0)$ and $(x, 0, 0)$ in a region of space. The electric potential at $(0, 0, 0)$ is zero. The value of $x$ is:",
    options: ["-0.8\\text{ cm}", "+0.8\\text{ cm}", "-1.2\\text{ cm}", "+1.2\\text{ cm}"]
  },
  44: {
    text: "A uniformly charged thin spherical shell of radius $R$ carries surface charge density $\\sigma$. If electric field at distance $r$ from the centre is $E$, then:",
    options: [
      "E = 0 for r < R, E = \\sigma/\\varepsilon_0 for r = R",
      "E \\propto r for r < R",
      "E = \\sigma/\\varepsilon_0 for r < R",
      "E \\propto 1/r for r > R"
    ]
  },
  45: {
    text: "An electric dipole of dipole moment $\\vec{p}$ is placed in a uniform electric field $\\vec{E}$. The maximum torque experienced by the dipole is:",
    options: ["pE", "2pE", "pE/2", "\\text{zero}"]
  },
  46: {
    text: "A charge $q$ is located at the centre of a cube. The electric flux through any one face of the cube is:",
    options: ["\\frac{q}{6\\varepsilon_0}", "\\frac{q}{\\varepsilon_0}", "\\frac{q}{24\\varepsilon_0}", "\\frac{q}{8\\varepsilon_0}"]
  },
  47: {
    text: "Statement 1: Electric field lines are always perpendicular to equipotential surfaces.\\nStatement 2: No work is done in moving a charge along an equipotential surface.",
    options: [
      "Statement 1 is true, Statement 2 is true; Statement 2 is the correct explanation of Statement 1",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not the correct explanation of Statement 1",
      "Statement 1 is true, Statement 2 is false",
      "Statement 1 is false, Statement 2 is true"
    ]
  },
  48: {
    text: "Assume that an electric field $\\vec{E} = 30 x^2 \\hat{i}\\text{ N/C}$ exists in space. Then the potential difference $V_A - V_O$, where $V_O$ is the potential at the origin and $V_A$ the potential at $x = 2\\text{ m}$, is:",
    options: ["-80\\text{ J/C}", "80\\text{ J/C}", "120\\text{ J/C}", "-120\\text{ J/C}"]
  },
  49: {
    text: "A parallel plate capacitor is charged and the charging battery is disconnected. Then a dielectric slab is introduced between the plates. Which of the following quantities will increase?",
    options: ["Capacitance", "Electric field", "Stored energy", "Potential difference"]
  },
  50: {
    text: "A uniformly charged wire of length $L$ and total charge $Q$ is bent into a semicircle. The electric field at the centre of curvature is:",
    options: [
      "\\frac{2Q}{\\pi\\varepsilon_0 L^2}",
      "\\frac{Q}{2\\pi^2 \\varepsilon_0 R^2}",
      "\\frac{\\pi Q}{2\\varepsilon_0 L^2}",
      "\\frac{2\\pi Q}{\\varepsilon_0 L^2}"
    ]
  }
};

// Merge corrections into ELECTRO_PART1_OVERRIDES
const updatedPart1 = { ...ELECTRO_PART1_OVERRIDES };
for (const [q, data] of Object.entries(P1_CORRECTIONS)) {
  updatedPart1[q] = data;
}

fs.writeFileSync(path.resolve(__dirname, 'clean_electro_part1.mjs'), `export const ELECTRO_PART1_OVERRIDES = ${JSON.stringify(updatedPart1, null, 2)};\n`);
console.log('Updated clean_electro_part1.mjs with pristine Q1..Q50 entries.');
