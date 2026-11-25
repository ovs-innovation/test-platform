import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ELECTRO_PART2_OVERRIDES } from './clean_electro_part2.mjs';
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Verified overrides for Part 2 (101..200)
const P2_CORRECTIONS = {
  101: {
    text: "Consider two charged metallic spheres $S_1$ and $S_2$ of radii $R_1$ and $R_2$ respectively. The electric fields $E_1$ (on $S_1$) and $E_2$ (on $S_2$) on their surfaces are such that $E_1/E_2 = R_1/R_2$. Then the ratio $V_1/V_2$ of the electrostatic potentials on each sphere is:",
    options: ["R_1 / R_2", "(R_1 / R_2)^2", "(R_2 / R_1)^2", "R_2 / R_1"]
  },
  102: {
    text: "A particle of mass $m$ and charge $q$ is released from rest in a uniform electric field $E$. If there is no other force on the particle, the dependence of its kinetic energy on time $t$ is given by:",
    options: ["K \\propto t", "K \\propto t^2", "K \\propto t^3", "K \\propto \\sqrt{t}"]
  },
  103: {
    text: "An electric dipole of moment $\\vec{p} = (-\\hat{i} - 3\\hat{j} + 2\\hat{k}) \\times 10^{-29}\\text{ C m}$ is at the origin $(0, 0, 0)$. The electric field due to this dipole at $\\vec{r} = +\\hat{i} + 3\\hat{j} + 5\\hat{k}$ (note that $\\vec{r} \\cdot \\vec{p} = 0$) is parallel to:",
    options: [
      "+\\hat{i} - 3\\hat{j} - 2\\hat{k}",
      "+\\hat{i} + 3\\hat{j} - 2\\hat{k}",
      "-\\hat{i} - 3\\hat{j} + 2\\hat{k}",
      "+\\hat{i} - 3\\hat{j} + 2\\hat{k}"
    ]
  },
  104: {
    text: "An electric field $\\vec{E} = 4x\\hat{i} - (y^2 + 1)\\hat{j}\\text{ N/C}$ passes through the box shown in figure. The flux of the electric field through surfaces $ABCD$ and $BCGF$ are marked as $\\phi_I$ and $\\phi_{II}$ respectively. The difference $(\\phi_I - \\phi_{II})$ is (in $\\text{N m}^2/\\text{C}$):",
    options: ["-48", "48", "-24", "24"]
  },
  105: {
    text: "An electric field $\\vec{E} = 4x\\hat{i} - (y^2 + 1)\\hat{j}\\text{ N/C}$ passes through the box shown in figure. The flux of the electric field through surfaces $ABCD$ and $BCGF$ are marked as $\\phi_I$ and $\\phi_{II}$ respectively. Find the value of $(\\phi_I - \\phi_{II})$ in $\\text{N m}^2/\\text{C}$:",
    options: []
  },
  106: {
    text: "A charge $Q$ is distributed over two concentric conducting thin spherical shells of radii $r$ and $R$ ($R > r$). If the surface charge densities on the two shells are equal, the electric potential at the common centre is:",
    options: [
      "\\frac{1}{4\\pi\\varepsilon_0} \\frac{(R + r)Q}{2(R^2 + r^2)}",
      "\\frac{1}{4\\pi\\varepsilon_0} \\frac{(2R + r)Q}{2(R^2 + r^2)}",
      "\\frac{1}{4\\pi\\varepsilon_0} \\frac{(R + 2r)Q}{2(R^2 + r^2)}",
      "\\frac{1}{4\\pi\\varepsilon_0} \\frac{(R + r)Q}{R^2 + r^2}"
    ]
  },
  107: {
    text: "Two isolated conducting spheres $S_1$ and $S_2$ of radius $\\frac{2}{3}R$ and $\\frac{1}{3}R$ have $12\\mu\\text{C}$ and $-3\\mu\\text{C}$ charges respectively, and are at a large distance from each other. They are now connected by a conducting wire. A long time after this is done, the charges on $S_1$ and $S_2$ are respectively:",
    options: [
      "4.5\\mu\\text{C} on both",
      "+4.5\\mu\\text{C} and -4.5\\mu\\text{C}",
      "3\\mu\\text{C} and 6\\mu\\text{C}",
      "6\\mu\\text{C} and 3\\mu\\text{C}"
    ]
  },
  108: {
    text: "Hydrogen ion and singly ionized helium atom are accelerated from rest through the same potential difference. The ratio of final speeds of hydrogen and helium ions is close to:",
    options: ["1 : 1", "10 : 7", "1.4 : 1", "5 : 7"]
  },
  109: {
    text: "Two identical conducting spheres having charges $+q$ and $-q$ are separated by distance $d$. If a third uncharged sphere of same radius is brought in contact with the first sphere and then moved to infinity, the electrostatic force between the first two spheres will:",
    options: [
      "increase by \\frac{q^2}{4\\pi\\varepsilon_0 d^2}",
      "increase by \\frac{q^2}{2\\pi\\varepsilon_0 d^2}",
      "decrease by \\frac{q^2}{4\\pi\\varepsilon_0 d^2}",
      "decrease by \\frac{q^2}{8\\pi\\varepsilon_0 d^2}"
    ]
  },
  110: {
    text: "Two identical point charges $+q$ each are placed at $(a, 0)$ and $(-a, 0)$. A third charge $+q$ is placed at the origin. The work required to move the third charge from origin to $(0, a)$ is:",
    options: [
      "\\frac{q^2}{4\\pi\\varepsilon_0 a}",
      "\\frac{q^2}{4\\pi\\varepsilon_0 a} (2 - \\sqrt{2})",
      "\\frac{q^2}{4\\pi\\varepsilon_0 a} (\\sqrt{2} - 1)",
      "\\frac{q^2}{2\\pi\\varepsilon_0 a}"
    ]
  },
  111: {
    text: "A ring of radius $R$ carries a uniform positive charge $Q$. A small particle of mass $m$ and charge $-q$ is released from rest at a distance $y$ on the axis of the ring ($y \\ll R$). The particle executes simple harmonic motion with time period:",
    options: [
      "2\\pi \\sqrt{\\frac{4\\pi\\varepsilon_0 m R^3}{Qq}}",
      "2\\pi \\sqrt{\\frac{2\\pi\\varepsilon_0 m R^3}{Qq}}",
      "2\\pi \\sqrt{\\frac{\\pi\\varepsilon_0 m R^3}{2Qq}}",
      "2\\pi \\sqrt{\\frac{4\\pi\\varepsilon_0 m R^2}{Qq}}"
    ]
  },
  112: {
    text: "A non-conducting solid sphere of radius $R$ is uniformly charged. The electric potential $V$ and electric field magnitude $E$ at the surface are related by:",
    options: [
      "V = E R",
      "V = 2 E R",
      "V = \\frac{1}{2} E R",
      "V = 0, E \\ne 0"
    ]
  },
  113: {
    text: "The force between two identical small charges at distance $r$ in vacuum is $F$. If they are placed in a medium of dielectric constant $K$ at the same separation, the force becomes:",
    options: ["F K", "F / K^2", "F / K", "F \\sqrt{K}"]
  },
  114: {
    text: "Two equal positive charges $Q$ are fixed at points $(a, 0)$ and $(-a, 0)$ on the $x$-axis. An opposite charge $-q$ of mass $m$ is released from rest at $(0, b)$ on the $y$-axis ($b \\ll a$). The angular frequency of oscillation of the charge $-q$ is:",
    options: [
      "\\sqrt{\\frac{q Q}{2\\pi\\varepsilon_0 m a^3}}",
      "\\sqrt{\\frac{q Q}{4\\pi\\varepsilon_0 m a^3}}",
      "\\sqrt{\\frac{2q Q}{\\pi\\varepsilon_0 m a^3}}",
      "\\sqrt{\\frac{q Q}{8\\pi\\varepsilon_0 m a^3}}"
    ]
  },
  115: {
    text: "Consider a regular hexagon of side $a$ with point charges $+q$ placed at each vertex except one, which is empty. The electric field at the centre of the hexagon is:",
    options: [
      "\\frac{q}{4\\pi\\varepsilon_0 a^2}",
      "\\frac{5q}{4\\pi\\varepsilon_0 a^2}",
      "\\frac{q}{2\\pi\\varepsilon_0 a^2}",
      "\\text{zero}"
    ]
  },
  116: {
    text: "An electric dipole of length $2\\text{ cm}$ is placed with its axis making an angle of $30^\\circ$ to a uniform electric field of $2 \\times 10^5\\text{ N/C}$. If it experiences a torque of $8\\sqrt{3}\\text{ N m}$, the magnitude of the charge on the dipole is:",
    options: ["4\\text{ mC}", "2\\text{ mC}", "8\\text{ mC}", "1.5\\text{ mC}"]
  },
  117: {
    text: "A solid insulating sphere of radius $R$ has a non-uniform volume charge density $\\rho(r) = \\rho_0 r/R$. The electric field at a distance $r$ inside the sphere ($r < R$) is:",
    options: [
      "\\frac{\\rho_0 r^2}{4\\varepsilon_0 R}",
      "\\frac{\\rho_0 r^2}{3\\varepsilon_0 R}",
      "\\frac{\\rho_0 r}{4\\varepsilon_0}",
      "\\frac{\\rho_0 r^2}{2\\varepsilon_0 R}"
    ]
  },
  118: {
    text: "An electron falls from rest through a vertical distance $h$ in a uniform and vertically upward electric field $E$. If the direction of electric field is reversed, a proton falls through the same distance $h$ from rest. The time taken by the proton to fall is:",
    options: [
      "smaller than that of the electron",
      "equal to that of the electron",
      "greater than that of the electron",
      "independent of distance h"
    ]
  },
  119: {
    text: "A charge $q$ is surrounded by a spherical Gaussian surface of radius $R$. If the radius is doubled, then the outward electric flux will:",
    options: [
      "be doubled",
      "increase four times",
      "be halved",
      "remain the same"
    ]
  },
  120: {
    text: "An electric field $\\vec{E} = (200x\\hat{i} + 300\\hat{j})\\text{ N/C}$ exists in a region. Calculate the net electric flux through a cube of side $1\\text{ m}$ oriented with its faces parallel to the coordinate planes between $x = 0$ and $x = 1\\text{ m}$ in $\\text{N m}^2/\\text{C}$:",
    options: []
  },
  121: {
    text: "Two small spherical balls having charges $q_1 = 16\\mu\\text{C}$ and $q_2 = 4\\mu\\text{C}$ are placed $10\\text{ cm}$ apart. The electrostatic force between them is $F$ Newtons. Find the value of $F$ in Newtons (take $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$):",
    options: []
  },
  122: {
    text: "A point charge of $10\\mu\\text{C}$ is placed at the centre of a cubical Gaussian surface of edge $10\\text{ cm}$. Find the total electric flux emerging through the surface in units of $10^5\\text{ N m}^2/\\text{C}$ (approximate to nearest integer):",
    options: []
  },
  123: {
    text: "The electric potential in a region is given by $V = 6x - 8xy^2 - 8y + 6yz - 4z^2\\text{ volts}$. Find the magnitude of electric field at point $(1, 1, 1)$ in $\\text{V/m}$:",
    options: []
  },
  124: {
    text: "Two identical capacitors each of capacitance $C = 10\\mu\\text{F}$ are connected in parallel and charged to a potential difference of $V = 20\\text{ V}$. Find the total electrostatic energy stored in the system in mJ:",
    options: []
  },
  125: {
    text: "The electrostatic force between two point charges placed at distance $r$ in vacuum is $F$. When a dielectric slab of thickness $t$ ($t < r$) and dielectric constant $K$ is introduced between them, the force becomes:",
    options: [
      "\\frac{F}{(r - t + t\\sqrt{K})^2} r^2",
      "\\frac{F}{K}",
      "\\frac{F}{(r - t)^2}",
      "F \\left(1 - \\frac{t}{r\\sqrt{K}}\\right)"
    ]
  },
  126: {
    text: "A parallel plate capacitor with air between the plates has capacitance $C$. If the separation between the plates is doubled and dielectric constant $K = 4$ is inserted between the plates, the new capacitance is:",
    options: ["2C", "C", "4C", "C / 2"]
  },
  127: {
    text: "A circular disc of radius $R$ carries a uniform surface charge density $\\sigma$. The electric field at a distance $z$ on its axis is $E(z) = \\frac{\\sigma}{2\\varepsilon_0}\\left[1 - \\frac{z}{\\sqrt{z^2 + R^2}}\\right]$. For $z \\gg R$, $E(z)$ behaves as:",
    options: [
      "E \\propto 1/z^2",
      "E \\propto 1/z",
      "E = \\text{constant}",
      "E \\propto 1/z^3"
    ]
  },
  128: {
    text: "A particle of mass $1\\text{ mg}$ and charge $1\\mu\\text{C}$ is projected with velocity $v = 10\\text{ m/s}$ in a uniform electric field $E = 100\\text{ N/C}$ opposing its motion. Find the distance traveled before coming to rest in cm:",
    options: []
  },
  129: {
    text: "An electric dipole of moment $\\vec{p}$ is aligned with an electric field $\\vec{E}$. The work done in rotating the dipole by $180^\\circ$ is:",
    options: ["2pE", "pE", "-2pE", "\\text{zero}"]
  },
  130: {
    text: "A spherical drop of water carrying a charge of $30\\text{ pC}$ has a potential of $500\\text{ V}$ at its surface. If eight such identical drops combine to form a single larger drop, find the potential at the surface of the new drop in Volts:",
    options: []
  }
};

// Merge into ELECTRO_PART2_OVERRIDES
const updatedPart2 = { ...ELECTRO_PART2_OVERRIDES };
for (const [q, data] of Object.entries(P2_CORRECTIONS)) {
  updatedPart2[q] = data;
}

// Ensure all numericals in Part 2 have options: []
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
console.log('Successfully updated clean_electro_part2.mjs with pristine entries!');
