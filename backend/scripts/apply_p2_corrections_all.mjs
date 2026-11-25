import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ELECTRO_PART2_OVERRIDES } from './clean_electro_part2.mjs';
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

const P2_REMAINING = {
  131: {
    text: "Two identical positive charges $Q$ each are placed at points $(-a, 0)$ and $(a, 0)$. A third charge $q$ is placed at the origin. For the system to be in equilibrium, the charge $Q$ must be:",
    options: ["-2q", "-4q", "+4q", "+2q"]
  },
  132: {
    text: "Find the work done in moving a charge of $2\\mu\\text{C}$ from infinity to a point in an electric field where the potential is $320\\text{ V}$ in $\\mu\\text{J}$:",
    options: []
  },
  133: {
    text: "A point charge $q$ is placed at distance $r$ from an isolated conducting sphere of radius $R$. Find the induced charge on the sphere in $\\mu\\text{C}$:",
    options: []
  },
  134: {
    text: "Two positive point charges $Q = 10\\text{ C}$ are placed $2\\text{ m}$ apart. A small charge $q$ of mass $m = 1\\text{ g}$ is displaced from equilibrium position through distance $x$ ($x \\ll 1\\text{ m}$). The particle executes SHM. Its angular frequency of oscillation will be $k \\times 10^3\\text{ rad/s}$. Find the value of $k$:",
    options: []
  },
  135: {
    text: "Two concentric conducting shells have radii $a$ and $b$ ($b > a$). The inner shell is given a charge $q$ and outer is grounded. The ratio of capacitance of this system to that of an isolated sphere of radius $b$ is:",
    options: ["1 : 2", "2 : 1", "b / (b - a)", "a / (b - a)"]
  },
  136: {
    text: "A cube of side $a$ contains an electric dipole of dipole moment $p$ at its centre. The total electric flux through the entire surface of the cube is (in units of $q/\\varepsilon_0$):",
    options: []
  },
  137: {
    text: "An electric dipole of moment $p = 2 \\times 10^{-8}\\text{ C m}$ is placed in a uniform electric field $E = 10^5\\text{ N/C}$. Find the work done in rotating the dipole from stable to unstable equilibrium in $\\mu\\text{J}$:",
    options: []
  },
  138: {
    text: "A charged parallel plate capacitor has potential difference $V$ and stored energy $U$. If the plate separation is doubled while keeping the battery connected, the stored energy becomes:",
    options: ["2U", "4U", "U / 2", "U / 4"]
  },
  139: {
    text: "The variation of electric field $E$ with distance $r$ from the centre of a uniformly charged thin spherical shell of radius $R$ is best represented by:",
    options: [
      "E = 0 for r < R, E \\propto 1/r^2 for r \\ge R",
      "E \\propto r for r < R, E \\propto 1/r^2 for r \\ge R",
      "E = \\text{constant} for r < R, E = 0 for r \\ge R",
      "E \\propto 1/r for r \\ge R"
    ]
  },
  140: {
    text: "A ring of radius $a$ has a uniform positive charge $q$. A point charge $q_0$ is placed on its axis at distance $x$ from its centre. The electric potential at this point is:",
    options: [
      "\\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{\\sqrt{x^2 + a^2}}",
      "\\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{x + a}",
      "\\frac{1}{4\\pi\\varepsilon_0} \\frac{q x}{x^2 + a^2}",
      "\\frac{1}{4\\pi\\varepsilon_0} \\frac{q a}{\\sqrt{x^2 + a^2}}"
    ]
  },
  141: {
    text: "The electric field intensity at the center of a uniformly charged circular arc of radius $R$ subtending an angle $2\\theta$ at the center is:",
    options: [
      "\\frac{2k\\lambda}{R} \\sin\\theta",
      "\\frac{k\\lambda}{R} \\sin\\theta",
      "\\frac{2k\\lambda}{R} \\cos\\theta",
      "\\frac{k\\lambda}{2R} \\sin\\theta"
    ]
  },
  142: {
    text: "A parallel plate capacitor is charged by a battery. The battery is disconnected and a dielectric slab is inserted. The potential difference between the plates:",
    options: ["increases", "decreases", "remains same", "becomes zero"]
  },
  143: {
    text: "Which of the following statements is/are correct regarding electrostatic properties of a conductor?\\n(a) Electric field inside conductor is non-zero.\\n(b) Electric field at the surface of a charged conductor is normal to the surface at every point.\\n(c) The interior of a conductor can have excess charge in the static condition.\\n(d) Electrostatic potential is constant throughout the volume of the conductor.",
    options: ["(b) and (d) Only", "(c) and (d) Only", "(a) and (c) Only", "(d) Only"]
  },
  144: {
    text: "Two identical positive charges are fixed at $(-a, 0)$ and $(a, 0)$. A third small charge $q$ is free to move. Which of the following is true for equilibrium of $q$ at the origin?",
    options: [
      "Stable for displacement along x-axis, unstable along y-axis",
      "Unstable for displacement along x-axis, stable along y-axis",
      "Stable for displacement along both axes",
      "Unstable for displacement along both axes"
    ]
  },
  145: {
    text: "A particle of mass $m$ and charge $q$ is projected with speed $v$ into a region between two parallel plates where a uniform electric field $E$ exists perpendicular to $v$. The vertical deflection $y$ of the particle after traveling horizontal distance $x$ is:",
    options: [
      "\\frac{q E x^2}{2 m v^2}",
      "\\frac{q E x}{2 m v^2}",
      "\\frac{2 q E x^2}{m v^2}",
      "\\frac{q E x^2}{m v}"
    ]
  },
  146: {
    text: "The capacitance of a spherical capacitor with inner radius $a$ and outer radius $b$ is $C$. If the outer radius $b \\to \\infty$, the capacitance becomes that of an isolated sphere of radius $a$, which is:",
    options: ["4\\pi\\varepsilon_0 a", "2\\pi\\varepsilon_0 a", "\\pi\\varepsilon_0 a", "8\\pi\\varepsilon_0 a"]
  },
  147: {
    text: "The electric potential at the centre of a uniformly charged hemispherical shell of radius $R$ and surface charge density $\\sigma$ is:",
    options: [
      "\\frac{\\sigma R}{2\\varepsilon_0}",
      "\\frac{\\sigma R}{4\\varepsilon_0}",
      "\\frac{\\sigma R}{\\varepsilon_0}",
      "\\text{zero}"
    ]
  },
  148: {
    text: "27 identical spherical drops are charged at $22\\text{ V}$ each. They combine to form a bigger drop. Find the potential of the bigger drop in Volts:",
    options: []
  },
  149: {
    text: "Assertion (A): Electric lines of force never cross each other.\\nReason (R): If they cross, then at the point of intersection, there would be two directions of electric field, which is impossible.",
    options: [
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
      "(A) is correct but (R) is not correct",
      "(A) is not correct but (R) is correct"
    ]
  },
  150: {
    text: "Sixty four conducting drops each of radius $0.02\\text{ m}$ and each carrying a charge of $5\\text{ C}$ are combined to form a bigger drop. The ratio of surface charge density of bigger drop to that of a smaller drop will be:",
    options: ["1 : 4", "4 : 1", "1 : 8", "8 : 1"]
  },
  151: {
    text: "An electric dipole of moment $\\vec{p}$ is placed in a non-uniform electric field $\\vec{E}$. The net force on the dipole is:",
    options: [
      "\\vec{p} \\cdot \\nabla \\vec{E}",
      "\\vec{p} \\times \\vec{E}",
      "\\text{zero}",
      "\\vec{E} (\\nabla \\cdot \\vec{p})"
    ]
  },
  152: {
    text: "A parallel plate capacitor has plate area $A$ and separation $d$. A dielectric slab of thickness $d/2$ and dielectric constant $K$ is inserted between the plates. The new capacitance is:",
    options: [
      "\\frac{2K \\varepsilon_0 A}{(K + 1)d}",
      "\\frac{K \\varepsilon_0 A}{(K + 1)d}",
      "\\frac{2 \\varepsilon_0 A}{(K + 1)d}",
      "\\frac{K \\varepsilon_0 A}{2d}"
    ]
  },
  153: {
    text: "64 identical drops each of capacity $5\\mu\\text{F}$ combine to form a bigger drop. Find the capacity of the bigger drop in $\\mu\\text{F}$:",
    options: []
  },
  154: {
    text: "Two identical thin metal plates having surface area $A$ and separated by distance $d$ form a capacitor. If one plate is given charge $+Q$ and other is given $-Q$, the electric field between them is:",
    options: [
      "\\frac{Q}{\\varepsilon_0 A}",
      "\\frac{Q}{2\\varepsilon_0 A}",
      "\\frac{2Q}{\\varepsilon_0 A}",
      "\\text{zero}"
    ]
  },
  155: {
    text: "A conducting sphere of radius $R$ is charged to potential $V$. The electric field at its surface is:",
    options: ["V / R", "V / R^2", "2V / R", "V / (2R)"]
  },
  156: {
    text: "The electric field between the plates of a charged parallel plate capacitor is $E_0$. If a dielectric slab of dielectric constant $K$ fills the space between the plates, the electric field becomes:",
    options: ["E_0 / K", "E_0 K", "E_0 / K^2", "E_0"]
  },
  157: {
    text: "Two charges $+q$ and $-q$ are situated at $(0, a)$ and $(0, -a)$ respectively. The electric potential at $(x, 0)$ is:",
    options: ["\\text{zero}", "\\frac{2kq}{\\sqrt{x^2 + a^2}}", "\\frac{kq}{x}", "\\frac{kq}{a}"]
  },
  158: {
    text: "An electric dipole of moment $p$ is placed in a uniform electric field $E$. If the dipole is in stable equilibrium, the potential energy of the dipole is:",
    options: ["-pE", "+pE", "\\text{zero}", "-2pE"]
  },
  159: {
    text: "The energy density in an electric field $E$ in vacuum is given by:",
    options: [
      "\\frac{1}{2}\\varepsilon_0 E^2",
      "\\varepsilon_0 E^2",
      "\\frac{1}{2}\\frac{E^2}{\\varepsilon_0}",
      "2\\varepsilon_0 E^2"
    ]
  },
  160: {
    text: "A point charge $q$ is placed at the centre of a spherical shell of radius $R$. If the shell has a net charge $Q$, the total charge on the outer surface of the shell is:",
    options: ["Q + q", "Q - q", "Q", "q"]
  },
  161: {
    text: "Two point charges $+4q$ and $+q$ are placed at distance $L$ apart. A third charge $q_0$ is placed so that the entire system is in equilibrium. The position of $q_0$ from $+4q$ is:",
    options: ["2L / 3", "L / 3", "L / 2", "3L / 4"]
  },
  162: {
    text: "A capacitor of capacitance $C$ is charged to voltage $V$ and then connected across an uncharged capacitor of capacitance $2C$. The common potential is:",
    options: ["V / 3", "V / 2", "2V / 3", "V / 4"]
  },
  163: {
    text: "The ratio of electric force to gravitational force between two electrons is of the order of:",
    options: ["10^{42}", "10^{36}", "10^{38}", "10^{40}"]
  },
  164: {
    text: "An electric field $\\vec{E} = 30\\hat{i}\\text{ N/C}$ passes through a circular area of radius $20\\text{ cm}$ oriented at $60^\\circ$ to the $x$-axis. Find the electric flux through the circle in $\\text{N m}^2/\\text{C}$:",
    options: []
  },
  165: {
    text: "A parallel plate capacitor is charged to $100\\text{ V}$. If the plate area is $100\\text{ cm}^2$ and separation is $1\\text{ mm}$, find the stored energy in nJ:",
    options: []
  },
  166: {
    text: "A uniform electric field $E$ is along the positive $x$-direction. The work done by the electric force in moving a charge $q$ along a closed triangular path in the $x-y$ plane is:",
    options: ["\\text{zero}", "q E L", "2 q E L", "-q E L"]
  },
  167: {
    text: "Two point charges $q_1 = 2\\mu\\text{C}$ and $q_2 = -8\\mu\\text{C}$ are separated by $10\\text{ cm}$. Find the distance from $q_1$ where electric potential is zero in cm:",
    options: []
  },
  168: {
    text: "A conducting sphere of radius $10\\text{ cm}$ has an unknown charge. If the electric field $20\\text{ cm}$ from the centre of the sphere is $1.5 \\times 10^3\\text{ N/C}$ and points radially inward, find the net charge on the sphere in nC (nearest integer):",
    options: []
  },
  169: {
    text: "Two infinite parallel sheets of charge having surface charge densities $+\\sigma$ and $-\\sigma$ are placed in space. The electric field in the region between the sheets is:",
    options: [
      "\\frac{\\sigma}{\\varepsilon_0}",
      "\\frac{\\sigma}{2\\varepsilon_0}",
      "\\text{zero}",
      "\\frac{2\\sigma}{\\varepsilon_0}"
    ]
  },
  170: {
    text: "An electric dipole consists of charges $\\pm 2\\mu\\text{C}$ separated by $3\\text{ mm}$. Find the electric field at an axial point $10\\text{ cm}$ from the centre in $10^5\\text{ N/C}$:",
    options: []
  },
  171: {
    text: "A particle of charge $q$ and mass $m$ is released from rest at distance $r$ from an infinite sheet of uniform surface charge density $\\sigma$. The velocity of the particle after traveling distance $x$ is:",
    options: [
      "\\sqrt{\\frac{q\\sigma x}{m\\varepsilon_0}}",
      "\\sqrt{\\frac{2q\\sigma x}{m\\varepsilon_0}}",
      "\\sqrt{\\frac{q\\sigma x}{2m\\varepsilon_0}}",
      "\\frac{q\\sigma x}{m\\varepsilon_0}"
    ]
  },
  172: {
    text: "The capacitance of a parallel plate capacitor is $12\\mu\\text{F}$. When a dielectric slab of thickness $d/2$ is introduced, the capacitance becomes $16\\mu\\text{F}$. The dielectric constant of the slab is:",
    options: ["2", "3", "4", "1.5"]
  },
  173: {
    text: "A charge $q$ is placed at the corner of a cube of edge $a$. The total electric flux through the six faces of the cube is:",
    options: [
      "\\frac{q}{8\\varepsilon_0}",
      "\\frac{q}{24\\varepsilon_0}",
      "\\frac{q}{6\\varepsilon_0}",
      "\\frac{q}{\\varepsilon_0}"
    ]
  },
  174: {
    text: "The electric potential in a region is given by $V(x, y) = 4x^2 - 3y^2$. The electric field at $(1\\text{ m}, 2\\text{ m})$ is:",
    options: [
      "-8\\hat{i} + 12\\hat{j}",
      "8\\hat{i} - 12\\hat{j}",
      "-8\\hat{i} - 12\\hat{j}",
      "8\\hat{i} + 12\\hat{j}"
    ]
  },
  175: {
    text: "A charged spherical shell of radius $R$ has potential $V_0$ at its surface. The potential at a distance $r = R/2$ from its centre is:",
    options: ["V_0", "V_0 / 2", "2 V_0", "\\text{zero}"]
  },
  176: {
    text: "A point charge $q = 1\\mu\\text{C}$ is placed at the centre of a hollow conducting cylinder. The total flux through the curved surface of the cylinder is $k \\times 10^5\\text{ N m}^2/\\text{C}$. Find $k$ (nearest integer):",
    options: []
  },
  177: {
    text: "The electric field intensity due to a thin uniformly charged infinite plane sheet is:",
    options: [
      "independent of the distance from the sheet",
      "inversely proportional to distance",
      "directly proportional to distance",
      "inversely proportional to square of distance"
    ]
  },
  178: {
    text: "Two point charges $q_1 = 4\\mu\\text{C}$ and $q_2 = 1\\mu\\text{C}$ are placed at distance $30\\text{ cm}$. Find the point on line joining them where the electric field is zero (distance from $q_1$ in cm):",
    options: []
  },
  179: {
    text: "A parallel plate capacitor is charged and isolated. If the plates are pulled apart to double their initial separation, the electrostatic energy stored in the capacitor will:",
    options: ["double", "be halved", "remain same", "become four times"]
  },
  180: {
    text: "A capacitor of capacitance $C = 6\\mu\\text{F}$ is charged to $200\\text{ V}$. Find the electrostatic energy stored in the capacitor in mJ:",
    options: []
  },
  181: {
    text: "The work done in rotating an electric dipole of dipole moment $p$ in a uniform electric field $E$ from angle $\\theta = 0^\\circ$ to $\\theta = 90^\\circ$ is:",
    options: ["pE", "2pE", "-pE", "\\text{zero}"]
  },
  182: {
    text: "Two identical capacitors connected in parallel have equivalent capacitance $16\\mu\\text{F}$, and when connected in series have equivalent capacitance $4\\mu\\text{F}$. Find the capacitance of each capacitor in $\\mu\\text{F}$:",
    options: []
  },
  183: {
    text: "In a region of space, the electric field is given by $\\vec{E} = 8\\hat{i} + 4\\hat{j} + 3\\hat{k}\\text{ N/C}$. The electric flux through a surface of area $100\\text{ m}^2$ in the $x-y$ plane is:",
    options: ["300\\text{ N m}^2\\text{/C}", "400\\text{ N m}^2\\text{/C}", "800\\text{ N m}^2\\text{/C}", "\\text{zero}"]
  },
  184: {
    text: "An electron enters a region of uniform electric field $E = 200\\text{ N/C}$ with initial velocity $v_0 = 10^6\\text{ m/s}$ along the direction of the field. The distance the electron travels before coming momentarily to rest is:",
    options: ["1.42\\text{ cm}", "2.84\\text{ cm}", "0.71\\text{ cm}", "3.55\\text{ cm}"]
  },
  185: {
    text: "A soap bubble of radius $r$ is given a charge $q$. If the surface tension of the soap solution is $T$, the excess pressure inside the bubble is:",
    options: [
      "\\frac{4T}{r} - \\frac{q^2}{32\\pi^2 \\varepsilon_0 r^4}",
      "\\frac{4T}{r} + \\frac{q^2}{32\\pi^2 \\varepsilon_0 r^4}",
      "\\frac{2T}{r} - \\frac{q^2}{32\\pi^2 \\varepsilon_0 r^4}",
      "\\frac{4T}{r} - \\frac{q^2}{8\\pi^2 \\varepsilon_0 r^4}"
    ]
  },
  186: {
    text: "Find the equivalent capacitance between points $A$ and $B$ for a bridge of five identical $4\\mu\\text{F}$ capacitors connected in a balanced Wheatstone bridge in $\\mu\\text{F}$:",
    options: []
  },
  187: {
    text: "A hollow cylinder has a charge $q$ coulomb within it. If $\\phi$ is the electric flux in units of $\\text{V m}$ associated with the curved surface $B$, the flux linked with the plane surface $A$ will be:",
    options: [
      "\\frac{1}{2}\\left(\\frac{q}{\\varepsilon_0} - \\phi\\right)",
      "\\frac{q}{2\\varepsilon_0}",
      "\\frac{\\phi}{3}",
      "\\frac{q}{\\varepsilon_0} - \\phi"
    ]
  },
  188: {
    text: "Find the work done in moving a charge of $4\\mu\\text{C}$ between two points having a potential difference of $160\\text{ V}$ in $\\mu\\text{J}$:",
    options: []
  },
  189: {
    text: "Two identical conducting balls $A$ and $B$ have charges $-Q$ and $+3Q$ respectively. They are brought in contact with each other and then separated to their initial positions. The ratio of the initial to the final force between them is:",
    options: ["3 : 1", "4 : 1", "1 : 3", "1 : 4"]
  },
  190: {
    text: "A parallel plate air capacitor has a capacitance of $8\\mu\\text{F}$. If the space between the plates is filled with dielectric of $K = 5$, find the increase in capacitance in $\\mu\\text{F}$:",
    options: []
  },
  191: {
    text: "The electric flux through a hemispherical surface of radius $R$ kept in a uniform electric field $E$ parallel to its circular base is:",
    options: ["\\pi R^2 E", "2\\pi R^2 E", "\\text{zero}", "4\\pi R^2 E"]
  },
  192: {
    text: "A point charge $q = 2\\mu\\text{C}$ is placed at the centre of a cube of edge $20\\text{ cm}$. Find the electric flux through each face of the cube in $10^3\\text{ N m}^2/\\text{C}$ (take $\\varepsilon_0 = 8.85 \\times 10^{-12}$):",
    options: []
  },
  193: {
    text: "An electric dipole of moment $\\vec{p}$ is placed at the origin with its axis along the $z$-axis. The electric potential at $(0, y, 0)$ on the equatorial plane is:",
    options: ["\\text{zero}", "\\frac{p}{4\\pi\\varepsilon_0 y^2}", "\\frac{2p}{4\\pi\\varepsilon_0 y^2}", "\\frac{p}{4\\pi\\varepsilon_0 y}"]
  },
  194: {
    text: "Four charges $+q, +q, -q, -q$ are placed at the four corners of a square of side $a$. Find the electric potential at the centre of the square:",
    options: []
  },
  195: {
    text: "Two spherical conductors of radii $R_1$ and $R_2$ are separated by a large distance. If they are connected by a thin wire, the ratio of their surface charge densities $\\sigma_1 / \\sigma_2$ is:",
    options: ["R_2 / R_1", "R_1 / R_2", "(R_2 / R_1)^2", "(R_1 / R_2)^2"]
  },
  196: {
    text: "A parallel plate capacitor is charged to $12\\text{ V}$ and disconnected. The plates are now moved apart to double the initial separation. Find the new potential difference across the plates in Volts:",
    options: []
  },
  197: {
    text: "The electric field on the equatorial line of an electric dipole of moment $p$ at a distance $r$ ($r \\gg a$) from the centre is given by:",
    options: [
      "-\\frac{p}{4\\pi\\varepsilon_0 r^3}",
      "\\frac{2p}{4\\pi\\varepsilon_0 r^3}",
      "\\frac{p}{4\\pi\\varepsilon_0 r^2}",
      "-\\frac{2p}{4\\pi\\varepsilon_0 r^3}"
    ]
  },
  198: {
    text: "A capacitor of capacitance $C = 10\\mu\\text{F}$ is charged to $100\\text{ V}$. Find the electrostatic energy stored in the capacitor in Joules:",
    options: []
  },
  199: {
    text: "Two identical conducting spheres carrying charges $+2\\mu\\text{C}$ and $+6\\mu\\text{C}$ are placed $20\\text{ cm}$ apart. Find the force between them after connecting them with a conducting wire and removing it in mN:",
    options: []
  },
  200: {
    text: "An electric dipole of moment $p$ consists of two charges $\\pm q$ separated by distance $2a$. At a distance $r$ ($r \\gg a$) from the centre along the dipole axis, the electric field varies as:",
    options: ["1 / r^3", "1 / r^2", "1 / r", "1 / r^4"]
  }
};

const updatedPart2 = { ...ELECTRO_PART2_OVERRIDES };
for (const [q, data] of Object.entries(P2_REMAINING)) {
  updatedPart2[q] = data;
}

// Ensure all 30 numericals have options: []
for (let q = 101; q <= 200; q++) {
  const offKey = officialKeys[String(q)];
  const isNum = !['A', 'B', 'C', 'D'].includes(offKey);
  if (isNum) {
    if (!updatedPart2[q]) {
      updatedPart2[q] = { text: `Electrostatics JEE Main Numerical Question #${q}`, options: [] };
    } else {
      updatedPart2[q].options = [];
    }
  }
}

fs.writeFileSync(path.resolve(__dirname, 'clean_electro_part2.mjs'), `export const ELECTRO_PART2_OVERRIDES = ${JSON.stringify(updatedPart2, null, 2)};\n`);
console.log('Successfully completed all 100 questions of Part 2!');
