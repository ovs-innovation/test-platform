import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_clean_diagram_urls.json'), 'utf8'));

// Part 3: Q141 to Q200
// Numericals in Part 3: 142, 145, 162, 163, 166, 168, 171, 183, 186, 188, 189, 191, 193, 196, 197, 198, 200
const NUMERICALS_P3 = new Set([142, 145, 162, 163, 166, 168, 171, 183, 186, 188, 189, 191, 193, 196, 197, 198, 200]);

export const MAG_PART3_DATA = {
  141: {
    question: "A coil having $N$ turns and area $A$ is suspended in a uniform magnetic field $B$. When a current $I$ is passed through the coil, the deflection produced is $\\theta$. The restoring couple per unit twist of the suspension wire is $C$. Then $\\theta$ is given by :",
    options: [
      "$\\theta = \\frac{N A B I}{C}$",
      "$\\theta = \\frac{C}{N A B I}$",
      "$\\theta = \\frac{N A B}{C I}$",
      "$\\theta = \\frac{N I}{C A B}$"
    ]
  },
  142: {
    question: "A circular coil of radius $10\\text{ cm}$ having 100 turns carries a current of $3.2\\text{ A}$. The magnetic field at the centre of the coil is $x \\times 10^{-3}\\text{ T}$. The value of $x$ is :",
    options: []
  },
  143: {
    question: "Two long parallel conductors $S_1$ and $S_2$ are separated by a distance $10\\text{ cm}$ and carry currents $I_1$ and $I_2$ in opposite directions. The magnetic field at point P midway between the two conductors is :",
    options: [
      "$\\frac{\\mu_0}{2\\pi d}(I_1 - I_2)$",
      "$\\frac{\\mu_0}{\\pi d}(I_1 - I_2)$",
      "$\\frac{\\mu_0}{\\pi d}(I_1 + I_2)$",
      "Zero"
    ]
  },
  144: {
    question: "A proton and an $\\alpha$-particle are projected with the same velocity into a uniform transverse magnetic field. The ratio of their time periods $T_p / T_\\alpha$ is :",
    options: ["1/4", "1/2", "1", "2"]
  },
  145: {
    question: "A long solenoid has 1000 turns per metre. It carries a current of $8\\text{ A}$. The magnetic energy density inside the solenoid in $\\text{J/m}^3$ is :",
    options: []
  },
  146: {
    question: "Two parallel, long wires are kept $0.20\\text{ m}$ apart in vacuum, each carrying current of $x\\text{ A}$ in the same direction. If the force per unit length between them is $2 \\times 10^{-4}\\text{ N/m}$, the value of $x$ is :",
    options: ["$10\\text{ A}$", "$20\\text{ A}$", "$14.14\\text{ A}$", "$5\\text{ A}$"]
  },
  147: {
    question: "A charge particle moves along a circular path in a uniform magnetic field in a cyclotron. The kinetic energy of the charge particle increases to 4 times its initial value. What will be the ratio of new radius to the initial radius?",
    options: ["$1 : 2$", "$1 : 4$", "$2 : 1$", "$4 : 1$"]
  },
  148: {
    question: "A beam of electrons moving at a speed of $10^6\\text{ m/s}$ along the $x$-axis enters a uniform magnetic field of $0.5\\text{ T}$ along the $y$-axis. The radius of the circular path described by the electron is :",
    options: [
      "$1.14 \\times 10^{-5}\\text{ m}$",
      "$2.28 \\times 10^{-5}\\text{ m}$",
      "$1.14 \\times 10^{-6}\\text{ m}$",
      "$5.7 \\times 10^{-6}\\text{ m}$"
    ]
  },
  149: {
    question: "A moving coil galvanometer has 50 turns and each turn has an area $2.0 \\times 10^{-4}\\text{ m}^2$. The magnetic field produced by the magnet is $0.02\\text{ T}$. The deflection in the coil is $0.2\\text{ rad}$ when a current of $1\\text{ mA}$ is passed through it. The torsional constant of the suspension wire is :",
    options: [
      "$1.0 \\times 10^{-4}\\text{ N}\\cdot\\text{m/rad}$",
      "$2.0 \\times 10^{-5}\\text{ N}\\cdot\\text{m/rad}$",
      "$1.0 \\times 10^{-5}\\text{ N}\\cdot\\text{m/rad}$",
      "$5.0 \\times 10^{-5}\\text{ N}\\cdot\\text{m/rad}$"
    ]
  },
  150: {
    question: "An electron and a proton enter a region of uniform magnetic field with equal kinetic energies in a direction perpendicular to the field. If $r_e$ and $r_p$ are the radii of their paths, then :",
    options: ["$r_e = r_p$", "$r_e < r_p$", "$r_e > r_p$", "$r_e = 0$"]
  },
  151: {
    question: "A proton and an electron have the same de Broglie wavelength. If they enter perpendicularly into a uniform magnetic field, then :",
    options: [
      "radius of proton path is larger",
      "radius of electron path is the same as that of proton",
      "radius of electron path is larger",
      "path of both will be straight lines"
    ]
  },
  152: {
    question: "A rectangular loop of sides $a$ and $b$ carries a current $I$. The magnetic dipole moment of the loop is :",
    options: ["$I a b$", "$I (a + b)$", "$2 I a b$", "$I \\sqrt{a^2 + b^2}$"]
  },
  153: {
    question: "A toroid has a non-ferromagnetic core of inner radius $25\\text{ cm}$ and outer radius $26\\text{ cm}$, around which 3500 turns of a wire are wound. If the current in the wire is $11\\text{ A}$, the magnetic field inside the core of the toroid is :",
    options: ["$3.0 \\times 10^{-2}\\text{ T}$", "$3.0 \\times 10^{-3}\\text{ T}$", "$6.0 \\times 10^{-2}\\text{ T}$", "$1.5 \\times 10^{-2}\\text{ T}$"]
  },
  154: {
    question: "A current of $10\\text{ A}$ flows around a closed path in a circuit which is in the horizontal plane. The path consists of eight arcs of alternating radii $r_1 = 0.08\\text{ m}$ and $r_2 = 0.12\\text{ m}$. Each arc subtends an angle of $45^\\circ$ at the centre. The magnetic field at the centre is :",
    options: [
      "$6.54 \\times 10^{-5}\\text{ T}$",
      "$6.54 \\times 10^{-6}\\text{ T}$",
      "$3.27 \\times 10^{-5}\\text{ T}$",
      "$1.31 \\times 10^{-5}\\text{ T}$"
    ]
  },
  155: {
    question: "A velocity selector consists of electric field $\\vec{E} = E\\hat{k}$ and magnetic field $\\vec{B} = B\\hat{j}$ with $B = 12\\text{ mT}$. The value of $E$ required to select a proton of energy $728\\text{ eV}$ is :",
    options: ["$4.5 \\times 10^3\\text{ V/m}$", "$9.0 \\times 10^3\\text{ V/m}$", "$2.25 \\times 10^3\\text{ V/m}$", "$1.8 \\times 10^4\\text{ V/m}$"]
  },
  156: {
    question: "Two concentric circular loops of radii $r_1 = 30\\text{ cm}$ and $r_2 = 50\\text{ cm}$ are placed in $X-Y$ plane as shown. The ratio of currents in loops 1 and 2 is $I_1 / I_2$ such that net magnetic field at their common centre is zero. If $I_1$ is flowing clockwise, then $I_2$ must flow :",
    options: [
      "clockwise with $I_2 = 3/5 I_1$",
      "anticlockwise with $I_2 = 5/3 I_1$",
      "clockwise with $I_2 = 5/3 I_1$",
      "anticlockwise with $I_2 = 3/5 I_1$"
    ]
  },
  157: {
    question: "A particle of mass $m$ and charge $q$ is moving in a circle of radius $r$ with speed $v$ in a magnetic field $B$. The work done by the magnetic force on the particle in one half revolution is :",
    options: ["$q v B (2r)$", "Zero", "$q v B (\\pi r)$", "$m v^2 / r$"]
  },
  158: {
    question: "As shown in the figure, a metallic rod of linear density $0.45\\text{ kg/m}$ is lying horizontally on smooth inclined planes which make an angle of $45^\\circ$ with the horizontal. The rod is perpendicular to the inclined plane and carries a current $I$. A magnetic field of $0.15\\text{ T}$ acts vertically upwards. To keep the rod in equilibrium, the current $I$ should be :",
    options: ["$29.4\\text{ A}$", "$14.7\\text{ A}$", "$58.8\\text{ A}$", "$9.8\\text{ A}$"]
  },
  159: {
    question: "A proton moving with a constant velocity passes through a region of space without any change in its velocity. If $\\vec{E}$ and $\\vec{B}$ represent the electric and magnetic fields, respectively, this region of space may have :",
    options: [
      "$E = 0, B \\ne 0$",
      "$E \\ne 0, B = 0$",
      "$E \\ne 0, B \\ne 0$ with $\\vec{E}$ and $\\vec{B}$ perpendicular to velocity",
      "Both (A) and (C) are possible"
    ]
  },
  160: {
    question: "A circular coil of radius $R$ is carrying a current $I$. At what distance from the centre of the coil on its axis will the magnetic field be $1/8^{\\text{th}}$ of its value at the centre?",
    options: ["$R/\\sqrt{3}$", "$2R$", "$\\sqrt{3}R$", "$3R$"]
  },
  161: {
    question: "A triangular shaped wire carrying $10\\text{ A}$ current is placed in a uniform magnetic field $0.5\\text{ T}$ as shown. The magnetic force on the segment AB of length $10\\text{ cm}$ is :",
    options: ["$0.25\\text{ N}$", "$0.5\\text{ N}$", "$0.5\\text{ N}$ perpendicular to AB", "$0.25\\sqrt{3}\\text{ N}$"]
  },
  162: {
    question: "A closely wounded circular coil of radius $5\\text{ cm}$ produces a magnetic field of $37.68 \\times 10^{-4}\\text{ T}$ at its center. The current through the coil is $x\\text{ A}$. [Given, number of turns in the coil is 100 and $\\pi = 3.14$]. The value of $x$ is :",
    options: []
  },
  163: {
    question: "A wire of length $314\\text{ cm}$ carrying current of $14\\text{ A}$ is bent to form a circle. The magnetic field at the centre of the circle in $\\times 10^{-5}\\text{ T}$ is :",
    options: []
  },
  164: {
    question: "A galvanometer has a resistance of $50\\,\\Omega$ and a current of $2\\text{ mA}$ gives full scale deflection. It is converted into a voltmeter of range $0 - 10\\text{ V}$. The resistance connected in series with the galvanometer coil is :",
    options: ["$4950\\,\\Omega$", "$5000\\,\\Omega$", "$5050\\,\\Omega$", "$4900\\,\\Omega$"]
  },
  165: {
    question: "A magnetic field $\\vec{B} = B_0\\hat{j}$ exists in the region $a < x < 2a$ and $\\vec{B} = -B_0\\hat{j}$ in the region $2a < x < 3a$, where $B_0$ is a positive constant. A positive point charge $q$ moving with velocity $\\vec{v} = v_0\\hat{i}$ enters the field at $x = a$. The trajectory of the charge is :",
    options: [
      "Circular in $x-y$ plane",
      "Helical with axis along $y$",
      "Undulating curve in $x-z$ plane",
      "Straight line along $x$"
    ]
  },
  166: {
    question: "Two long straight wires P and Q carrying equal current $10\\text{ A}$ each were kept parallel to each other at $5\\text{ cm}$ distance. Magnitude of magnetic force experienced by $10\\text{ cm}$ length of wire P is $F_1$. If distance between wires is halved and currents on them are doubled, force $F_2$ on $10\\text{ cm}$ length of wire P will be $x F_1$. The value of $x$ is :",
    options: []
  },
  167: {
    question: "A circular loop of radius $r$ carrying current $I$ is placed in a uniform magnetic field $B$ parallel to its plane. The torque experienced by the loop is :",
    options: ["Zero", "$\\pi r^2 I B$", "$2\\pi r^2 I B$", "$I B / (\\pi r^2)$"]
  },
  168: {
    question: "A single turn current loop in the shape of a right angle triangle with sides $5\\text{ cm}, 12\\text{ cm}, 13\\text{ cm}$ is carrying a current of $2\\text{ A}$. The loop is in a uniform magnetic field of magnitude $0.75\\text{ T}$ whose direction is parallel to the current in the $13\\text{ cm}$ side of the loop. The magnitude of the magnetic force on the $5\\text{ cm}$ side in $\\times 10^{-2}\\text{ N}$ is :",
    options: []
  },
  169: {
    question: "A solenoid of 1200 turns is wound uniformly in a single layer on a glass tube $2\\text{ m}$ long and $0.2\\text{ m}$ in diameter. The magnetic field at the centre of the solenoid when a current of $2\\text{ A}$ flows through it is :",
    options: [
      "$1.51 \\times 10^{-3}\\text{ T}$",
      "$1.51 \\times 10^{-4}\\text{ T}$",
      "$3.02 \\times 10^{-3}\\text{ T}$",
      "$2.4 \\times 10^{-3}\\text{ T}$"
    ]
  },
  170: {
    question: "A charged particle of mass $m$ and charge $q$ travels in a circular path of radius $R$ in a magnetic field $B$. The kinetic energy of the particle is :",
    options: [
      "$\\frac{q^2 B^2 R^2}{m}$",
      "$\\frac{q B R}{2m}$",
      "$\\frac{q^2 B^2 R^2}{2m}$",
      "$\\frac{q B^2 R^2}{2m}$"
    ]
  },
  171: {
    question: "A long straight wire carrying a current of $2\\text{ A}$ produces a magnetic field of $4\\,\\mu\\text{T}$ at a perpendicular distance $d$. The value of $d$ in cm is :",
    options: []
  },
  172: {
    question: "A circular coil of radius $10\\text{ cm}$ having 500 turns and resistance $2\\,\\Omega$ is placed in a horizontal magnetic field of $0.2\\text{ T}$ with its plane perpendicular to the field. The torque acting on the coil is :",
    options: ["$3.14\\text{ N}\\cdot\\text{m}$", "Zero", "$1.57\\text{ N}\\cdot\\text{m}$", "$6.28\\text{ N}\\cdot\\text{m}$"]
  },
  173: {
    question: "The magnitude of magnetic induction at mid-point O due to current arrangement as shown in figure is :",
    options: [
      "$\\frac{\\mu_0 I}{2\\pi a}$",
      "$\\frac{\\mu_0 I}{\\pi a}$",
      "$\\frac{2\\mu_0 I}{\\pi a}$",
      "Zero"
    ]
  },
  174: {
    question: "A single current carrying loop of wire carrying current $I$ flowing in anticlockwise direction is shown in figure. The magnetic field at the centre O is :",
    options: [
      "$\\frac{\\mu_0 I}{4 R}$ into page",
      "$\\frac{\\mu_0 I}{4 R}$ out of page",
      "$\\frac{\\mu_0 I}{2 R}$ into page",
      "$\\frac{\\mu_0 I}{2 R}$ out of page"
    ]
  },
  175: {
    question: "A moving coil galvanometer has resistance $G$. A shunt $S$ is connected across it. The fraction of total current that passes through the galvanometer is :",
    options: [
      "$\\frac{G}{S + G}$",
      "$\\frac{S}{S - G}$",
      "$\\frac{S}{S + G}$",
      "$\\frac{S + G}{S}$"
    ]
  },
  176: {
    question: "An electron enters a region between two parallel plates where electric field $E$ is pointing vertically downwards. A magnetic field $B$ is applied perpendicular to $E$ and to the velocity of electron so that the electron passes undeflected. The velocity of the electron is :",
    options: ["$E B$", "$B / E$", "$E / B$", "$\\sqrt{E/B}$"]
  },
  177: {
    question: "A galvanometer of resistance $50\\,\\Omega$ gives a full scale deflection for a current of $0.05\\text{ A}$. In order to convert it into an ammeter of range $0 - 5\\text{ A}$, the shunt resistance required is :",
    options: ["$0.5\\,\\Omega$", "$0.05\\,\\Omega$", "$0.505\\,\\Omega$", "$1.0\\,\\Omega$"]
  },
  178: {
    question: "As shown in the figure, a current of $2\\text{ A}$ flowing in an equilateral triangle of side $4\\sqrt{3}\\text{ cm}$. The magnetic field at the centroid of the triangle is :",
    options: [
      "$2.5 \\times 10^{-5}\\text{ T}$",
      "$1.5 \\times 10^{-5}\\text{ T}$",
      "$5.0 \\times 10^{-5}\\text{ T}$",
      "$3.0 \\times 10^{-5}\\text{ T}$"
    ]
  },
  179: {
    question: "A current carrying rectangular loop PQRS is made of uniform wire. The length $PR = QS = 5\\text{ cm}$ and $PQ = RS = 10\\text{ cm}$. If a current of $2\\text{ A}$ enters at P and leaves at R, the magnetic field at the centre of the loop is :",
    options: [
      "$\\frac{\\mu_0}{\\pi} \\times 10^{-2}\\text{ T}$",
      "Zero",
      "$\\frac{2\\mu_0}{\\pi} \\times 10^{-2}\\text{ T}$",
      "$\\frac{4\\mu_0}{\\pi} \\times 10^{-2}\\text{ T}$"
    ]
  },
  180: {
    question: "A proton and an $\\alpha$-particle are accelerated through the same potential difference $V$. The ratio of their de Broglie wavelengths $\\lambda_p / \\lambda_\\alpha$ is :",
    options: ["$2$", "$\\sqrt{2}$", "$2\\sqrt{2}$", "$4$"]
  },
  181: {
    question: "Two circular coils of radii $5\\text{ cm}$ and $10\\text{ cm}$ have 100 turns each. They are placed coaxially with their centres separated by a distance $10\\text{ cm}$. If the same current $I = 2\\text{ A}$ is passed in both in the same direction, the magnetic field at the midpoint on the axis between the coils is :",
    options: [
      "$1.26 \\times 10^{-3}\\text{ T}$",
      "$2.52 \\times 10^{-3}\\text{ T}$",
      "$0.85 \\times 10^{-3}\\text{ T}$",
      "$1.70 \\times 10^{-3}\\text{ T}$"
    ]
  },
  182: {
    question: "Find the magnetic field at the point P in figure. The curved portion is a semicircle of radius $R$ and the straight wires are very long :",
    options: [
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi + 1)$",
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi + 2)$",
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi - 1)$",
      "$\\frac{\\mu_0 I}{2\\pi R} (\\pi + 1)$"
    ]
  },
  183: {
    question: "A charged particle having mass $10^{-6}\\text{ kg}$ and charge $10^{-6}\\text{ C}$ is moving with velocity $(2\\hat{i} + 3\\hat{j})\\text{ m/s}$ in a region of magnetic field $(2\\hat{i} + 4\\hat{j})\\text{ T}$. The magnitude of magnetic force on the particle in $\\mu\\text{N}$ is :",
    options: []
  },
  184: {
    question: "A current of $1\\text{ A}$ flows in a long wire bent into the shape of a hairpin with semicircular end of radius $1\\text{ cm}$. The magnetic field at the centre of the semicircular arc is :",
    options: [
      "$3.14 \\times 10^{-5}\\text{ T}$",
      "$1.57 \\times 10^{-5}\\text{ T}$",
      "$6.28 \\times 10^{-5}\\text{ T}$",
      "$5.14 \\times 10^{-5}\\text{ T}$"
    ]
  },
  185: {
    question: "A coil is placed in a magnetic field such that the plane of the coil is perpendicular to the direction of magnetic field. The torque acting on the coil is :",
    options: [
      "Maximum",
      "Zero",
      "Half of maximum",
      "Cannot be determined"
    ]
  },
  186: {
    question: "Two identical circular wires of radius $20\\text{ cm}$ and carrying current $2\\text{ A}$ are placed coaxially at a distance of $20\\text{ cm}$. The magnetic field at the midpoint between the two coils in $\\times 10^{-6}\\text{ T}$ is (Take $\\pi = 3.14$) :",
    options: []
  },
  187: {
    question: "An ammeter of resistance $0.8\\,\\Omega$ can measure current up to $1.0\\text{ A}$. The value of shunt resistance required to enable the ammeter to measure current up to $5.0\\text{ A}$ is :",
    options: ["$0.1\\,\\Omega$", "$0.2\\,\\Omega$", "$0.4\\,\\Omega$", "$0.8\\,\\Omega$"]
  },
  188: {
    question: "A straight wire of length $2\\text{ m}$ carrying a current of $20\\text{ A}$ is placed in a uniform magnetic field of $1.0\\text{ T}$. If the wire makes an angle of $30^\\circ$ with the direction of the magnetic field, the magnetic force on the wire in N is :",
    options: []
  },
  189: {
    question: "A particle of mass $m$ and charge $q$ is moving with speed $v$ in a circle of radius $r$ in a uniform magnetic field $B$. If the velocity of the particle is doubled and the magnetic field is halved, the radius of the circular path becomes $x r$. The value of $x$ is :",
    options: []
  },
  190: {
    question: "A long solenoid has 800 turns per metre length of solenoid. A current of $1.6\\text{ A}$ flows through it. The magnetic induction at the end of the solenoid on its axis is :",
    options: [
      "$1.6 \\times 10^{-3}\\text{ T}$",
      "$8.0 \\times 10^{-4}\\text{ T}$",
      "$3.2 \\times 10^{-3}\\text{ T}$",
      "$4.0 \\times 10^{-4}\\text{ T}$"
    ]
  },
  191: {
    question: "The ratio of magnetic field at the centre of a current carrying coil of radius $r$ to the magnetic field on the axis at a distance $r\\sqrt{3}$ from the centre of the coil is :",
    options: []
  },
  192: {
    question: "A charged particle is projected in a plane perpendicular to a uniform magnetic field. The area bounded by the circular path described by the particle is directly proportional to its :",
    options: ["Kinetic energy", "Speed", "Momentum", "Potential energy"]
  },
  193: {
    question: "A straight wire carrying a current of $14\\text{ A}$ is bent into a semicircular arc of radius $2.2\\text{ cm}$ as shown in the figure. The magnetic field at the centre of the arc in $\\times 10^{-4}\\text{ T}$ is :",
    options: []
  },
  194: {
    question: "A current carrying loop is placed in a uniform magnetic field in four different orientations, I, II, III and IV. Arrange them in the decreasing order of potential energy :",
    options: [
      "I > II > III > IV",
      "IV > III > II > I",
      "I > IV > II > III",
      "III > II > IV > I"
    ]
  },
  195: {
    question: "A beam of electrons enters perpendicularly into a uniform magnetic field. The time period of revolution of the electron :",
    options: [
      "increases with increasing velocity",
      "decreases with increasing velocity",
      "is independent of velocity",
      "depends on the mass of the particle only"
    ]
  },
  196: {
    question: "A straight wire AB of mass $40\\text{ g}$ and length $50\\text{ cm}$ is suspended by a pair of flexible leads in a uniform magnetic field of $0.4\\text{ T}$ directed horizontally into the page. The current in the wire (in A) required to balance the tension in the leads is ($g = 10\\text{ m/s}^2$) :",
    options: []
  },
  197: {
    question: "An electron in a hydrogen atom revolves around its nucleus with a speed of $6.76 \\times 10^6\\text{ m/s}$ in an orbit of radius $0.53\\text{ \u00c5}$. The magnetic dipole moment of the electron in $\\times 10^{-25}\\text{ A}\\cdot\\text{m}^2$ is :",
    options: []
  },
  198: {
    question: "Two long, straight wires carry equal currents in opposite directions as shown in the figure. The separation between the wires is $20\\text{ cm}$. The magnetic field at a point midway between the wires when each wire carries $8\\text{ A}$ in $\\times 10^{-7}\\text{ T}$ is :",
    options: []
  },
  199: {
    question: "A particle of mass $m$ and charge $q$ enters a region with uniform magnetic field $B$ directed into the plane. If the particle enters with speed $v$ making an angle $\\theta$ with the normal to the boundary, it emerges after a time :",
    options: [
      "$\\frac{m}{qB}(\\pi - 2\\theta)$",
      "$\\frac{2m}{qB}\\theta$",
      "$\\frac{2m}{qB}(\\pi - \\theta)$",
      "$\\frac{m}{qB}\\pi$"
    ]
  },
  200: {
    question: "The magnetic field at the centre of a wire loop formed by two semicircular wires of radii $R_1 = 2\\pi\\text{ cm}$ and $R_2 = 4\\pi\\text{ cm}$ carrying current $I = 2\\text{ A}$ in $\\times 10^{-5}\\text{ T}$ is :",
    options: []
  }
};

const finalPart3 = [];
for (let q = 141; q <= 200; q++) {
  const data = MAG_PART3_DATA[q];
  const ans = keys[q];
  const isNumeric = NUMERICALS_P3.has(q);
  const diagKey = `mag_q${q}_diagram.png`;
  const diagUrl = diagUrls[diagKey] || null;

  finalPart3.push({
    question_number: q,
    question_type: isNumeric ? 'numerical' : 'mcq',
    question_text: data.question,
    options: isNumeric ? [] : data.options.map((opt, idx) => ({
      option_id: ['A', 'B', 'C', 'D'][idx],
      option_text: opt
    })),
    correct_answer: ans,
    solution_text: `Official Answer: ${ans}.`,
    diagram_url: diagUrl,
    exam_type: 'JEE',
    difficulty: 'medium',
    numeric_answer: isNumeric ? parseFloat(ans) : null,
    numerical_tolerance: 0
  });
}

fs.writeFileSync(
  path.resolve(__dirname, 'mag_part3_questions.json'),
  JSON.stringify(finalPart3, null, 2)
);
console.log(`Successfully generated mag_part3_questions.json with ${finalPart3.length} questions!`);
