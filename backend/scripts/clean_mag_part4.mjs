import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_clean_diagram_urls.json'), 'utf8'));

// Part 4: Q201 to Q268
// Numericals in Part 4:
const NUMERICALS_P4 = new Set([
  201, 203, 205, 206, 207, 209, 211, 212, 214, 215, 217, 218, 220, 222, 223, 224, 225, 228, 230, 232, 235, 240, 243, 244, 247, 254, 259, 263, 264, 267
]);

export const MAG_PART4_DATA = {
  201: {
    question: "A proton moving with velocity $v$ in the $x$-direction enters a uniform magnetic field $B$ in the $y$-direction. The magnetic force on the proton is $F$. If an alpha particle moves with velocity $2v$ in the $x$-direction in the same magnetic field, the magnetic force on it is $x F$. The value of $x$ is :",
    options: []
  },
  202: {
    question: "A circular loop of radius $R$ carries a current $I$. The magnetic field at its centre is $B$. At what distance from the centre on the axis of the loop will the magnetic field be $B/27$?",
    options: ["$2\\sqrt{2}R$", "$2R$", "$3R$", "$\\sqrt{8}R$"]
  },
  203: {
    question: "A charge of $4.0\\,\\mu\\text{C}$ is moving with a velocity of $4.0 \\times 10^6\\text{ m/s}$ along the positive $y$-axis in a magnetic field $\\vec{B} = (2\\hat{k})\\text{ T}$. The magnitude of force experienced by the charge in N is :",
    options: []
  },
  204: {
    question: "Two insulated circular loops A and B of radius $a$ carrying a current of $I$ in the anticlockwise direction are placed in perpendicular planes as shown in the figure. The resultant magnetic field at the common centre is :",
    options: [
      "$\\frac{\\mu_0 I}{2a}$",
      "$\\frac{\\mu_0 I}{\\sqrt{2} a}$",
      "$\\frac{\\mu_0 I}{\\sqrt{2} a}$ inclined at $45^\\circ$ to both coils",
      "Zero"
    ]
  },
  205: {
    question: "A circular coil of 70 turns and radius $5\\text{ cm}$ carries a current of $8\\text{ A}$. The magnetic field at the centre of the coil in $\\times 10^{-4}\\text{ T}$ is :",
    options: []
  },
  206: {
    question: "A straight conductor of length $2\\text{ m}$ carrying a current of $5\\text{ A}$ is placed in a uniform magnetic field of $4\\text{ T}$. If the force experienced by the conductor is $20\\text{ N}$, the angle between the conductor and the magnetic field in degrees is :",
    options: []
  },
  207: {
    question: "A galvanometer of resistance $50\\,\\Omega$ gives a full scale deflection for a current of $0.05\\text{ A}$. The shunt resistance needed to convert it into an ammeter of range $0 - 5\\text{ A}$ in $\\Omega$ is :",
    options: []
  },
  208: {
    question: "A rigid wire consists of a semicircular portion of radius $R$ and two straight sections as shown in figure. The wire carries a current $I$ in the direction shown. The magnetic field at the centre of the semicircular arc is :",
    options: [
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi + 1)$",
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi - 2)$",
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi + 2)$",
      "$\\frac{\\mu_0 I}{4 R}$"
    ]
  },
  209: {
    question: "Two circular coils P and Q of 100 turns each have same radius of $10\\text{ cm}$. The currents in P and Q are $1\\text{ A}$ and $2\\text{ A}$ respectively. The ratio of magnetic fields at the centres of P and Q in percentage is :",
    options: []
  },
  210: {
    question: "A moving coil galvanometer has 100 turns and each turn has an area $2.0 \\times 10^{-4}\\text{ m}^2$. The magnetic field is $0.01\\text{ T}$. The deflection produced by a current of $10\\,\\mu\\text{A}$ is $0.05\\text{ rad}$. The torsional constant of the suspension fibre is :",
    options: [
      "$4.0 \\times 10^{-8}\\text{ N}\\cdot\\text{m/rad}$",
      "$4.0 \\times 10^{-7}\\text{ N}\\cdot\\text{m/rad}$",
      "$2.0 \\times 10^{-7}\\text{ N}\\cdot\\text{m/rad}$",
      "$2.0 \\times 10^{-8}\\text{ N}\\cdot\\text{m/rad}$"
    ]
  },
  211: {
    question: "A charged particle carrying charge $q = 2\\,\\mu\\text{C}$ moves with velocity $\\vec{v} = (3\\hat{i} + 4\\hat{j}) \\times 10^6\\text{ m/s}$ in a uniform magnetic field $\\vec{B} = (2\\hat{i} + 3\\hat{k})\\text{ T}$. The magnitude of the magnetic force on the particle in N is :",
    options: []
  },
  212: {
    question: "An electron moving with kinetic energy $K$ enters perpendicularly into a uniform magnetic field and describes a circle of radius $r$. If the kinetic energy is increased to $16K$, the radius of the circular path becomes $x r$. The value of $x$ is :",
    options: []
  },
  213: {
    question: "A circular loop of radius $R$ carrying current $I$ is placed in a uniform magnetic field $B$. The orientation of the loop for stable equilibrium is when the magnetic dipole moment $\\vec{M}$ is :",
    options: [
      "Parallel to $\\vec{B}$",
      "Antiparallel to $\\vec{B}$",
      "Perpendicular to $\\vec{B}$",
      "At $45^\\circ$ to $\\vec{B}$"
    ]
  },
  214: {
    question: "A wire carrying current $I$ is bent into the shape of a circle of radius $R$. The magnetic field at its centre is $B$. If the same wire is bent into a circle of 2 turns, the magnetic field at the centre becomes $x B$ where $x$ is :",
    options: []
  },
  215: {
    question: "A long straight wire carries a current of $25\\text{ A}$. The distance from the wire at which the magnetic field is $1.0 \\times 10^{-4}\\text{ T}$ in cm is :",
    options: []
  },
  216: {
    question: "A proton and an $\\alpha$-particle enter perpendicularly into a uniform magnetic field with the same velocity. The ratio of their radii of curvature $r_p / r_\\alpha$ is :",
    options: ["1/2", "1/4", "1", "2"]
  },
  217: {
    question: "A circular coil of radius $10\\text{ cm}$ having 50 turns carries a current of $2\\text{ A}$. The magnetic field at the centre of the coil in $\\times 10^{-4}\\text{ T}$ is :",
    options: []
  },
  218: {
    question: "A galvanometer has a resistance of $25\\,\\Omega$ and gives full scale deflection for a current of $10\\text{ mA}$. To convert it into a voltmeter of range $0 - 5\\text{ V}$, the series resistance required in $\\Omega$ is :",
    options: []
  },
  219: {
    question: "Two parallel long current carrying wires separated by a distance $2r$ are shown in the figure. The wires carry equal current $I$ in opposite directions. The magnetic field at a point midway between the wires is :",
    options: [
      "$\\frac{\\mu_0 I}{\\pi r}$",
      "$\\frac{\\mu_0 I}{2\\pi r}$",
      "Zero",
      "$\\frac{2\\mu_0 I}{\\pi r}$"
    ]
  },
  220: {
    question: "A solenoid of length $0.5\\text{ m}$ has a radius of $1\\text{ cm}$ and is made up of 500 turns. It carries a current of $5\\text{ A}$. The magnitude of the magnetic field inside the solenoid in $\\times 10^{-3}\\text{ T}$ is :",
    options: []
  },
  221: {
    question: "A circular loop of wire of radius $R$ is carrying current $I$. The magnetic field at its centre is $B_0$. At what distance along the axis of the loop will the magnetic field be $B_0 / 8$?",
    options: ["$\\sqrt{3}R$", "$2R$", "$3R$", "$R/\\sqrt{3}$"]
  },
  222: {
    question: "A moving coil galvanometer has a coil of resistance $100\\,\\Omega$. It shows full scale deflection for a current of $1\\text{ mA}$. The value of resistance that can convert it into an ammeter of range $0 - 1\\text{ A}$ in $\\text{m}\\Omega$ is :",
    options: []
  },
  223: {
    question: "A charged particle of mass $m$ and charge $q$ is moving with velocity $v$ in a magnetic field $B$. The radius of the circular path is $r$. If both the kinetic energy and the magnetic field are doubled, the new radius is $x r$. The value of $x$ is :",
    options: []
  },
  224: {
    question: "A long straight wire of radius $a$ carries a steady current $I$. The current is uniformly distributed across its cross section. The ratio of the magnetic field at $a/2$ and $2a$ from axis of the wire is :",
    options: []
  },
  225: {
    question: "A proton of mass $1.67 \\times 10^{-27}\\text{ kg}$ and charge $1.6 \\times 10^{-19}\\text{ C}$ is moving with a speed of $2 \\times 10^6\\text{ m/s}$ in a transverse magnetic field of $0.5\\text{ T}$. The force acting on the proton in $\\times 10^{-14}\\text{ N}$ is :",
    options: []
  },
  226: {
    question: "A coil in the shape of an equilateral triangle of side $l$ is suspended between the pole pieces of a permanent magnet such that $\\vec{B}$ is in the plane of the coil. If due to a current $i$ in the triangle a torque $\\tau$ acts on the coil, the side $l$ of the triangle is :",
    options: [
      "$\\left(\\frac{2\\tau}{\\sqrt{3} B i}\\right)^{1/2}$",
      "$2\\left(\\frac{\\tau}{\\sqrt{3} B i}\\right)^{1/2}$",
      "$\\left(\\frac{\\tau}{\\sqrt{3} B i}\\right)^{1/2}$",
      "$2\\left(\\frac{\\tau}{B i}\\right)^{1/2}$"
    ]
  },
  227: {
    question: "A proton and a deuteron having same kinetic energies enter a region of uniform magnetic field perpendicular to the direction of velocity. The ratio of the radii of their circular paths $r_p / r_d$ is :",
    options: ["$1 : \\sqrt{2}$", "$1 : 2$", "$1 : 1$", "$\\sqrt{2} : 1$"]
  },
  228: {
    question: "A straight wire of length $50\\text{ cm}$ carrying a current of $2.5\\text{ A}$ is placed in a magnetic field of $1.6\\text{ T}$. If the wire is perpendicular to the field, the magnetic force on the wire in N is :",
    options: []
  },
  229: {
    question: "A current carrying loop is placed in a uniform magnetic field. In which orientation is the potential energy of the loop minimum?",
    options: [
      "When magnetic moment is parallel to the magnetic field",
      "When magnetic moment is antiparallel to the magnetic field",
      "When magnetic moment is perpendicular to the magnetic field",
      "When magnetic moment makes an angle of $45^\\circ$ with the field"
    ]
  },
  230: {
    question: "Two long parallel wires X and Y, separated by a distance of $6\\text{ cm}$, carry currents $I_1$ and $I_2$ as shown in the figure. The point on the line joining them where the magnetic field is zero is at a distance of $x\\text{ cm}$ from wire X. The value of $x$ is :",
    options: []
  },
  231: {
    question: "A charged particle moves through a magnetic field without being deflected. This is possible if :",
    options: [
      "the velocity is perpendicular to the magnetic field",
      "the velocity is at $45^\\circ$ to the magnetic field",
      "the particle has zero charge or moves parallel/antiparallel to the magnetic field",
      "Both (A) and (C)"
    ]
  },
  232: {
    question: "A circular coil of radius $10\\text{ cm}$ having 100 turns carries a current of $1.5\\text{ A}$. The magnetic dipole moment of the coil in $\\times 10^{-1}\\text{ A}\\cdot\\text{m}^2$ is :",
    options: []
  },
  233: {
    question: "An electron moving with a velocity $\\vec{v}$ along the positive $x$-axis enters a region of uniform magnetic field $\\vec{B}$ pointing in the positive $y$-axis. The direction of magnetic force on the electron is along :",
    options: ["Positive $z$-axis", "Negative $z$-axis", "Positive $x$-axis", "Negative $y$-axis"]
  },
  234: {
    question: "A moving coil galvanometer has a sensitivity of 10 divisions per milliampere. If a shunt of $1/9$ of the galvanometer resistance is connected across it, the sensitivity of the combination will be :",
    options: ["10 div/mA", "9 div/mA", "1 div/mA", "0.1 div/mA"]
  },
  235: {
    question: "A long solenoid of radius $2\\text{ cm}$ has 1000 turns per metre. It carries a current of $2.5\\text{ A}$. The magnetic field at the centre of the solenoid in $\\times 10^{-5}\\text{ T}$ is (Take $\\pi = 3.14$) :",
    options: []
  },
  236: {
    question: "A current carrying loop is placed in a uniform magnetic field. Which of the following is correct?",
    options: [
      "Net magnetic force on the loop is zero",
      "Net torque on the loop is always zero",
      "Net magnetic force is non-zero",
      "Neither force nor torque can be zero"
    ]
  },
  237: {
    question: "A charged particle is projected in a magnetic field $\\vec{B} = (2\\hat{i} + 3\\hat{j})\\text{ T}$. If the acceleration of the particle is $\\vec{a} = (x\\hat{i} - 2\\hat{j})\\text{ m/s}^2$, the value of $x$ is :",
    options: ["3", "-3", "2", "-2"]
  },
  238: {
    question: "A long straight wire carries a current along the $z$-axis in the positive direction. The magnetic field at a point $(x, y, 0)$ is proportional to :",
    options: [
      "$\\frac{-y\\hat{i} + x\\hat{j}}{x^2 + y^2}$",
      "$\\frac{x\\hat{i} + y\\hat{j}}{x^2 + y^2}$",
      "$\\frac{y\\hat{i} - x\\hat{j}}{x^2 + y^2}$",
      "$\\frac{x\\hat{i} - y\\hat{j}}{\\sqrt{x^2 + y^2}}$"
    ]
  },
  239: {
    question: "A circular coil of radius $R$ carries a current $I$. The magnetic field at its centre is $B_0$. If the radius is doubled keeping the current same, the new magnetic field at the centre is :",
    options: ["$2B_0$", "$4B_0$", "$B_0 / 2$", "$B_0 / 4$"]
  },
  240: {
    question: "A galvanometer of resistance $100\\,\\Omega$ gives a full scale deflection for a current of $2\\text{ mA}$. To convert it into an ammeter of range $0 - 5\\text{ A}$, the shunt resistance required in $\\times 10^{-2}\\,\\Omega$ is :",
    options: []
  },
  241: {
    question: "Two particles each of mass $m$ and charge $q$ are moving in circular paths in a uniform magnetic field with kinetic energies $K_1$ and $K_2$. The ratio of their radii of curvature $r_1 / r_2$ is :",
    options: ["$K_1 / K_2$", "$\\sqrt{K_2 / K_1}$", "$\\sqrt{K_1 / K_2}$", "$(K_1 / K_2)^2$"]
  },
  242: {
    question: "A long solenoid has 500 turns per metre. When a current of $2\\text{ A}$ is passed through it, the magnetic field at the centre of the solenoid is :",
    options: [
      "$4\\pi \\times 10^{-4}\\text{ T}$",
      "$2\\pi \\times 10^{-4}\\text{ T}$",
      "$\\pi \\times 10^{-4}\\text{ T}$",
      "$8\\pi \\times 10^{-4}\\text{ T}$"
    ]
  },
  243: {
    question: "A straight wire of length $1\\text{ m}$ carrying a current of $1\\text{ A}$ is placed in a uniform magnetic field of $1\\text{ T}$ perpendicular to the wire. The magnetic force acting on the wire in N is :",
    options: []
  },
  244: {
    question: "A circular loop of radius $20\\text{ cm}$ carries a current of $10\\text{ A}$. The magnetic field at a point on the axis at a distance of $20\\text{ cm}$ from the centre in $\\mu\\text{T}$ is :",
    options: []
  },
  245: {
    question: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\\nAssertion A: A beam of electrons moving in a magnetic field does not gain any kinetic energy.\\nReason R: The magnetic force acting on a charged particle is always perpendicular to its velocity.",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ]
  },
  246: {
    question: "A particle of charge $q$ is moving with velocity $\\vec{v}$ in a region containing magnetic field $\\vec{B}$. The force acting on the particle is zero when :",
    options: [
      "$\\vec{v}$ is perpendicular to $\\vec{B}$",
      "$\\vec{v}$ is at $45^\\circ$ to $\\vec{B}$",
      "$\\vec{v}$ is parallel or antiparallel to $\\vec{B}$",
      "Both (A) and (C)"
    ]
  },
  247: {
    question: "A proton enters a uniform magnetic field $\\vec{B}$ parallel to the field lines with velocity $v$. The magnetic force on the proton in N is :",
    options: []
  },
  248: {
    question: "Uniform magnetic fields of different strengths ($B_1$ and $B_2$), both normal to the plane of paper, exist in regions I and II as shown. A charged particle enters region I and describes semicircular paths. The ratio of radii of curvature in region I and II is :",
    options: [
      "$B_1 / B_2$",
      "$\\sqrt{B_1 / B_2}$",
      "$B_2 / B_1$",
      "$\\sqrt{B_2 / B_1}$"
    ]
  },
  249: {
    question: "A galvanometer has a resistance of $90\\,\\Omega$. If a shunt of $10\\,\\Omega$ is connected across it, the percentage of total current passing through the galvanometer is :",
    options: ["$90\\%$", "$50\\%$", "$20\\%$", "$10\\%$"]
  },
  250: {
    question: "Figure shows a current carrying square loop ABCD of edge length '$a$' lying in a plane. A long straight wire carrying current $I_1$ is placed in the same plane parallel to AB at distance $d$. The net force on the square loop is :",
    options: [
      "repulsive and proportional to $1/d$",
      "attractive and proportional to $1/d$",
      "attractive and equal to $\\frac{\\mu_0 I_1 I_2 a}{2\\pi} \\left(\\frac{1}{d} - \\frac{1}{d+a}\\right)$",
      "zero"
    ]
  },
  251: {
    question: "A circular coil of radius $R$ carries a current $I$. If the magnetic field at the centre is $B_0$, the magnetic field at distance $x = R$ on its axis is :",
    options: [
      "$B_0 / 2$",
      "$B_0 / 4$",
      "$B_0 / \\sqrt{2}$",
      "$B_0 / (2\\sqrt{2})$"
    ]
  },
  252: {
    question: "A moving coil galvanometer has a resistance of $50\\,\\Omega$ and full scale deflection for $0.02\\text{ A}$. The resistance to be connected in series to convert it into a voltmeter of range $0 - 100\\text{ V}$ is :",
    options: ["$4950\\,\\Omega$", "$5000\\,\\Omega$", "$5050\\,\\Omega$", "$4900\\,\\Omega$"]
  },
  253: {
    question: "A proton, a deuteron and an $\\alpha$-particle are accelerated through the same potential difference and then enter a uniform transverse magnetic field. The ratio of their radii of curvature is :",
    options: [
      "$1 : \\sqrt{2} : \\sqrt{2}$",
      "$\\sqrt{2} : 1 : 1$",
      "$1 : \\sqrt{2} : 1$",
      "$1 : 1 : \\sqrt{2}$"
    ]
  },
  254: {
    question: "A straight wire of length $2\\text{ m}$ carrying a current of $8\\text{ A}$ is placed in a uniform magnetic field of $4\\text{ T}$. If the wire makes an angle of $90^\\circ$ with the field, the magnetic force on the wire in N is :",
    options: []
  },
  255: {
    question: "A rectangular loop carrying current $I$ is placed in a uniform magnetic field $B$. The orientation corresponding to unstable equilibrium is when the magnetic moment $\\vec{M}$ is :",
    options: [
      "Antiparallel to $\\vec{B}$",
      "Parallel to $\\vec{B}$",
      "Perpendicular to $\\vec{B}$",
      "At $60^\\circ$ to $\\vec{B}$"
    ]
  },
  256: {
    question: "A long straight wire carries a current of $10\\text{ A}$. The magnetic field at a distance of $5\\text{ cm}$ from the wire is :",
    options: [
      "$2 \\times 10^{-5}\\text{ T}$",
      "$4 \\times 10^{-5}\\text{ T}$",
      "$10^{-5}\\text{ T}$",
      "$8 \\times 10^{-5}\\text{ T}$"
    ]
  },
  257: {
    question: "Three long straight wires carrying current are arranged mutually parallel as shown in figure. The net magnetic force per unit length on the middle wire is :",
    options: [
      "$\\frac{\\mu_0 I^2}{2\\pi d}$ towards left",
      "$\\frac{\\mu_0 I^2}{\\pi d}$ towards right",
      "$\\frac{\\mu_0 I^2}{2\\pi d}$ towards right",
      "Zero"
    ]
  },
  258: {
    question: "A long cylindrical conductor with large cross-section carries an electric current distributed uniformly over its cross section. The magnetic field $B$ inside the conductor at distance $r$ from axis is proportional to :",
    options: ["$1/r$", "$r$", "$1/r^2$", "$r^2$"]
  },
  259: {
    question: "A $1\\,\\mu\\text{C}$ charge moving with velocity $\\vec{v} = (\\hat{i} - 2\\hat{j} + 3\\hat{k})\\text{ m/s}$ in the region of magnetic field $\\vec{B} = (2\\hat{i} + 3\\hat{j} - \\hat{k})\\text{ T}$. The magnitude of force acting on it is $\\sqrt{x} \\times 10^{-6}\\text{ N}$. The value of $x$ is :",
    options: []
  },
  260: {
    question: "Two identical long current carrying wires are bent into the shapes shown in the following figures. If the magnitude of magnetic fields at the centres P and Q of a semicircular arc are $B_1$ and $B_2$, then the ratio $B_1 / B_2$ is :",
    options: ["1", "2", "1/2", "$\\sqrt{2}$"]
  },
  261: {
    question: "A particle having charge $10^{-6}\\text{ C}$ moving in $x-y$ plane in fields of $\\vec{E} = 0.45\\hat{j}\\text{ V/m}$ and $\\vec{B} = 10^{-2}\\hat{k}\\text{ T}$ experiences a force of $(4\\hat{i} + 2\\hat{j}) \\times 10^{-7}\\text{ N}$. The velocity of the particle at that instant is :",
    options: [
      "$-50\\hat{i} + 100\\hat{j}\\text{ m/s}$",
      "$100\\hat{i} + 50\\hat{j}\\text{ m/s}$",
      "$-50\\hat{i} - 100\\hat{j}\\text{ m/s}$",
      "$50\\hat{i} - 100\\hat{j}\\text{ m/s}$"
    ]
  },
  262: {
    question: "An insulated wire is wound so that it forms a flat coil with $N = 200$ turns. The radius of the innermost turn is $r_1 = 3\\text{ cm}$, and of the outermost turn $r_2 = 6\\text{ cm}$. If $20\\text{ mA}$ current flows in it, then the magnetic moment will be $x \\times 10^{-3}\\text{ A}\\cdot\\text{m}^2$. The value of $x$ is :",
    options: ["4.4", "2.64", "3.95", "1.7"]
  },
  263: {
    question: "A circular coil of radius $2\\text{ cm}$ and 125 turns carries a current of $1\\text{ A}$. The coil is placed in a uniform magnetic field of magnitude $0.4\\text{ T}$. The axis of the coil makes an angle of $30^\\circ$ with the direction of the magnetic field. The torque acting on the coil is $x \\times 10^{-4}\\text{ N}\\cdot\\text{m}$. The value of $x$ is (Take $\\pi = 3.14$) :",
    options: []
  },
  264: {
    question: "The charged particle moving in a uniform magnetic field of $(3\\hat{i} + 2\\hat{j})\\text{ T}$ has an acceleration $(x\\hat{i} - 2\\hat{j})\\text{ m/s}^2$. The value of $x$ is :",
    options: []
  },
  265: {
    question: "A small cube of side $1\\text{ mm}$ is placed at the centre of a circular loop of radius $10\\text{ cm}$ carrying a current of $2\\text{ A}$. The magnetic energy stored inside the cube is $x \\times 10^{-14}\\text{ J}$. The value of $x$ is ($\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}, \\pi = 3.14$) :",
    options: [
      "$6.28$",
      "$6.28 \\times 10^{-4}$",
      "$3.14$",
      "$12.56$"
    ]
  },
  266: {
    question: "A current of $30\\text{ A}$ each flows in opposite directions in two conducting wires, placed parallel to each other at a distance of $8\\text{ cm}$. The magnetic field at the midpoint between the two wires is :",
    options: [
      "$1.5 \\times 10^{-4}\\text{ T}$",
      "$3.0 \\times 10^{-4}\\text{ T}$",
      "$6.0 \\times 10^{-4}\\text{ T}$",
      "Zero"
    ]
  },
  267: {
    question: "A $5\\text{ mg}$ particle carrying a charge of $5\\pi \\times 10^{-9}\\text{ C}$ is moving with velocity of $(3\\hat{i} + 2\\hat{k}) \\times 10^3\\text{ m/s}$ in a region having magnetic field $\\vec{B} = 1.0\\hat{k}\\text{ Wb/m}^2$. It moves a distance of $x\\text{ metre}$ along $\\hat{j}$ when it completes 5 revolutions. The value of $x$ is :",
    options: []
  },
  268: {
    question: "A current carrying circular loop of radius $2\\text{ cm}$ with unit normal $\\hat{n} = \\frac{\\hat{i} + \\hat{j}}{\\sqrt{2}}$ is placed in a magnetic field $\\vec{B} = B_0(3\\hat{i} + 2\\hat{k})$. If $B_0 = 4 \\times 10^{-2}\\text{ T}$ and current $I = 100\\sqrt{2}\\text{ A}$, the torque experienced by the loop is :",
    options: [
      "$\\sqrt{2} \\times 10^{-2}\\text{ N}\\cdot\\text{m}$",
      "$2\\sqrt{2} \\times 10^{-2}\\text{ N}\\cdot\\text{m}$",
      "$4 \\times 10^{-2}\\text{ N}\\cdot\\text{m}$",
      "$3.14 \\times 10^{-2}\\text{ N}\\cdot\\text{m}$"
    ]
  }
};

const finalPart4 = [];
for (let q = 201; q <= 268; q++) {
  const data = MAG_PART4_DATA[q];
  const ans = keys[q];
  const isNumeric = NUMERICALS_P4.has(q);
  const diagKey = `mag_q${q}_diagram.png`;
  const diagUrl = diagUrls[diagKey] || null;

  finalPart4.push({
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
  path.resolve(__dirname, 'mag_part4_questions.json'),
  JSON.stringify(finalPart4, null, 2)
);
console.log(`Successfully generated mag_part4_questions.json with ${finalPart4.length} questions!`);
