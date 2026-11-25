import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_clean_diagram_urls.json'), 'utf8'));

// Part 2: Q71 to Q140
// Numericals in Part 2: 104, 125, 126, 127, 129, 140
const NUMERICALS_P2 = new Set([104, 125, 126, 127, 129, 140]);

export const MAG_PART2_DATA = {
  71: {
    question: "An insulating thin rod of length $L$ has a linear charge density $\\rho(x) = \\rho_0 \\frac{x}{L}$ on it. The rod is rotated about an axis passing through the origin ($x = 0$) and perpendicular to the rod. If the rod makes $n$ rotations per second, then the time averaged magnetic moment of the rod is :",
    options: [
      "$\\frac{\\pi}{4} n \\rho_0 L^3$",
      "$n \\rho_0 L^3$",
      "$\\frac{\\pi}{3} n \\rho_0 L^3$",
      "$\\frac{\\pi}{2} n \\rho_0 L^3$"
    ]
  },
  72: {
    question: "In an experiment, electrons are accelerated, from rest, by applying a voltage of $500\\text{ V}$. Calculate the radius of the path if a magnetic field $100\\text{ mT}$ is then applied. [Charge of the electron = $1.6 \\times 10^{-19}\\text{ C}$, Mass of the electron = $9.1 \\times 10^{-31}\\text{ kg}$] :",
    options: [
      "$7.5 \\times 10^{-2}\\text{ m}$",
      "$7.5 \\times 10^{-3}\\text{ m}$",
      "$7.5\\text{ m}$",
      "$7.5 \\times 10^{-4}\\text{ m}$"
    ]
  },
  73: {
    question: "The region between $y = 0$ and $y = d$ contains a magnetic field $\\vec{B} = B\\hat{k}$. A particle of mass $m$ and charge $q$ enters the region with a velocity $\\vec{v} = v\\hat{i}$. If $d = \\frac{m v}{2 q B}$, the acceleration of the charged particle at the point of its emergence at the other side is :",
    options: [
      "$\\frac{q v B}{m} \\left(\\frac{1}{2}\\hat{i} - \\frac{\\sqrt{3}}{2}\\hat{j}\\right)$",
      "$\\frac{q v B}{m} \\left(\\frac{\\sqrt{3}}{2}\\hat{i} + \\frac{1}{2}\\hat{j}\\right)$",
      "$\\frac{q v B}{m} \\left(\\frac{-\\sqrt{3}}{2}\\hat{i} + \\frac{1}{2}\\hat{j}\\right)$",
      "$\\frac{q v B}{m} \\left(\\frac{\\sqrt{3}}{2}\\hat{i} - \\frac{1}{2}\\hat{j}\\right)$"
    ]
  },
  74: {
    question: "A galvanometer of resistance $100\\,\\Omega$ gives a full scale deflection for a current of $10^{-5}\\text{ A}$. To convert it into an ammeter capable of measuring up to $1\\text{ A}$, we should connect a resistance of :",
    options: [
      "$10^{-3}\\,\\Omega$ in series",
      "$10^{-5}\\,\\Omega$ in parallel",
      "$10^{-3}\\,\\Omega$ in parallel",
      "$10^{-4}\\,\\Omega$ in parallel"
    ]
  },
  75: {
    question: "As shown in the figure, two infinitely long, identical wires are bent by $90^\\circ$ and placed in such a way that the segments LP and QM are along the $x$-axis, while segments PS and QN are parallel to the $y$-axis. If $OP = OQ = 4\\text{ cm}$, and the magnitude of the magnetic field at O is $10^{-4}\\text{ T}$ and the two wires carry equal currents, the magnitude of the current in each wire and the direction of the magnetic field at O are :",
    options: [
      "$40\\text{ A}$, perpendicular into the page",
      "$20\\text{ A}$, perpendicular out of the page",
      "$20\\text{ A}$, perpendicular into the page",
      "$40\\text{ A}$, perpendicular out of the page"
    ]
  },
  76: {
    question: "A proton and an $\\alpha$-particle (with their masses in the ratio of $1 : 4$ and charges in the ratio of $1 : 2$) are accelerated from rest through a potential difference $V$. If a uniform magnetic field ($B$) is set up perpendicular to their velocities, the ratio of the radii $r_p : r_\\alpha$ of the circular paths described by them will be :",
    options: ["$1 : 1$", "$1 : \\sqrt{2}$", "$1 : 2$", "$1 : 4$"]
  },
  77: {
    question: "A circular coil having $N$ turns and radius $r$ carries a current $I$. It is held in the $XZ$ plane in a magnetic field $B\\hat{i}$. The torque on the coil due to the magnetic field is :",
    options: [
      "$N I \\pi r^2 B\\hat{k}$",
      "$-N I \\pi r^2 B\\hat{k}$",
      "$N I \\pi r^2 B\\hat{j}$",
      "Zero"
    ]
  },
  78: {
    question: "Two very long, straight, and insulated wires are kept at $90^\\circ$ angle from each other in $xy$-plane as shown in figure. These wires carry currents of equal magnitude $I$, whose directions are as shown in the figure. The net magnetic field at point P will be :",
    options: [
      "$\\frac{\\mu_0 I}{2\\pi d}(\\hat{k})$",
      "$\\frac{\\mu_0 I}{\\pi d}(\\hat{k})$",
      "Zero",
      "$-\\frac{\\mu_0 I}{2\\pi d}(\\hat{k})$"
    ]
  },
  79: {
    question: "Two magnetic dipoles X and Y are placed at a separation $d$, with their axes perpendicular to each other. The dipole moment of Y is twice that of X. A particle of charge $q$ is passing through their midpoint P, at angle $\\theta = 45^\\circ$ with the horizontal line, as shown in figure. What would be the magnitude of force on the particle at that instant? ($d$ is much larger than the dimension of the dipole) :",
    options: [
      "$\\left(\\frac{\\mu_0}{4\\pi}\\right) \\frac{M}{d^3} \\times 2qv$",
      "Zero",
      "$\\left(\\frac{\\mu_0}{4\\pi}\\right) \\frac{2M}{d^3} \\times qv$",
      "$\\left(\\frac{\\mu_0}{4\\pi}\\right) \\frac{M}{d^3} \\times \\sqrt{2}qv$"
    ]
  },
  80: {
    question: "A rectangular coil (Dimension $5\\text{ cm} \\times 2.5\\text{ cm}$) with 100 turns, carrying a current of $3\\text{ A}$ in the clockwise direction, is kept in a uniform magnetic field $B = 1\\text{ T}$. If the field makes an angle of $30^\\circ$ with the normal to the plane of the coil, the torque experienced by the coil is :",
    options: ["$0.375\\text{ N}\\cdot\\text{m}$", "$0.75\\text{ N}\\cdot\\text{m}$", "$0.188\\text{ N}\\cdot\\text{m}$", "$0.50\\text{ N}\\cdot\\text{m}$"]
  },
  81: {
    question: "A rigid square loop of side '$a$' and carrying current $I_2$ is lying on a horizontal surface near a long current $I_1$ carrying wire in the same plane as shown in figure. The net force on the loop is :",
    options: [
      "repulsive and equal to $\\frac{\\mu_0 I_1 I_2}{2\\pi}$",
      "attractive and equal to $\\frac{\\mu_0 I_1 I_2}{2\\pi}$",
      "zero",
      "repulsive and equal to $\\frac{\\mu_0 I_1 I_2 a}{2\\pi}$"
    ]
  },
  82: {
    question: "A moving coil galvanometer has a coil with 175 turns and area $1\\text{ cm}^2$. It uses a torsion band of torsional constant $10^{-6}\\text{ N}\\cdot\\text{m/rad}$. The coil is placed in a magnetic field $B$ parallel to its plane. When a current of $1\\text{ mA}$ is passed through it, the deflection is $1^\\circ$. The value of $B$ is :",
    options: ["$10^{-3}\\text{ T}$", "$10^{-1}\\text{ T}$", "$10^{-4}\\text{ T}$", "$10^{-2}\\text{ T}$"]
  },
  83: {
    question: "A particle of mass $m$ and charge $q$ is projected with a velocity $v$ in an electric field $E$ and magnetic field $B$. The particle will continue to move along the same straight line with uniform velocity if :",
    options: [
      "$\\vec{E}$ and $\\vec{B}$ are parallel and perpendicular to $\\vec{v}$",
      "$\\vec{E}, \\vec{B}$ and $\\vec{v}$ are all mutually perpendicular and $v = E/B$",
      "$\\vec{E}$ and $\\vec{B}$ are antiparallel to each other",
      "$\\vec{E}$ and $\\vec{B}$ are perpendicular to each other and both parallel to $\\vec{v}$"
    ]
  },
  84: {
    question: "Two wires A & B are carrying currents $I_1$ and $I_2$ as shown in the figure. The separation between them is $d$. A third wire C carrying current $I$ is to be kept parallel to them in the same plane such that net force on C is zero. The position of wire C is :",
    options: [
      "between wires A and B at distance $\\frac{I_1 d}{I_1 + I_2}$ from wire A",
      "to the left of wire A at distance $\\frac{I_1 d}{I_2 - I_1}$",
      "between wires A and B at distance $\\frac{I_2 d}{I_1 + I_2}$ from wire A",
      "to the right of wire B at distance $\\frac{I_2 d}{I_1 - I_2}$"
    ]
  },
  85: {
    question: "The magnitude of the magnetic field at the centre of an equilateral triangular loop of side $1\\text{ m}$ which is carrying a current of $10\\text{ A}$ is ($\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}$) :",
    options: ["$18\\,\\mu\\text{T}$", "$1\\,\\mu\\text{T}$", "$9\\,\\mu\\text{T}$", "$3\\,\\mu\\text{T}$"]
  },
  86: {
    question: "A square loop is carrying a steady current $I$ and the magnitude of its magnetic dipole moment is $m$. If this square loop is changed to a circular loop and it carries the same current, the magnitude of the new magnetic dipole moment of circular loop will be :",
    options: ["$\\frac{4m}{\\pi}$", "$\\frac{2m}{\\pi}$", "$\\frac{m}{\\pi}$", "$\\frac{3m}{\\pi}$"]
  },
  87: {
    question: "A galvanometer having a coil resistance of $100\\,\\Omega$ gives a full scale deflection when a current of $1\\text{ mA}$ is passed through it. The value of the resistance which can convert this galvanometer into an ammeter giving a full scale deflection for a current of $10\\text{ A}$ is :",
    options: ["$0.01\\,\\Omega$", "$2\\,\\Omega$", "$0.1\\,\\Omega$", "$3\\,\\Omega$"]
  },
  88: {
    question: "Find the magnetic field at point P due to a straight line segment AB of length $6\\text{ cm}$ carrying a current of $5\\text{ A}$. Point P is on the perpendicular bisector of AB at a distance of $4\\text{ cm}$ from the midpoint of AB :",
    options: ["$1.5 \\times 10^{-5}\\text{ T}$", "$3.0 \\times 10^{-5}\\text{ T}$", "$2.5 \\times 10^{-5}\\text{ T}$", "$2.0 \\times 10^{-5}\\text{ T}$"]
  },
  89: {
    question: "An electron, moving along the $x$-axis with an initial energy of $100\\text{ eV}$, enters a region of magnetic field $\\vec{B} = (1.5 \\times 10^{-3}\\text{ T})\\hat{k}$ at $S$. The field extends between $x = 0$ and $x = 2\\text{ cm}$. The electron enters the field at $x = 0$ along the $x$-axis. The point where the electron leaves the field is :",
    options: [
      "leaves at $x = 2\\text{ cm}$ with deflection in $-y$ direction",
      "leaves at $x = 2\\text{ cm}$ with deflection in $+y$ direction",
      "deflected back into the region $x < 0$",
      "travels undeflected through the field"
    ]
  },
  90: {
    question: "A particle of mass $m$ and charge $q$ is released from rest in a region of uniform electric field $E$ and uniform magnetic field $B$, both acting along the $z$-axis. The trajectory of the particle is :",
    options: ["circle", "cycloid", "straight line", "helix"]
  },
  91: {
    question: "A proton with kinetic energy of $1\\text{ MeV}$ moves from south to north. It gets an acceleration of $10^{12}\\text{ m/s}^2$ by an applied magnetic field (west to east). The value of magnetic field is (Mass of proton = $1.6 \\times 10^{-27}\\text{ kg}$) :",
    options: ["$0.71\\text{ mT}$", "$7.1\\text{ mT}$", "$1.4\\text{ mT}$", "$0.14\\text{ mT}$"]
  },
  92: {
    question: "A very long wire ABOMNDC is shown in figure carrying current $I$. AB and BC parts are straight, long and parallel, and MND is a circular arc of radius $R$. The magnetic field at the centre of the circular arc is :",
    options: [
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi + 2)$ directed into page",
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi - 2)$ directed into page",
      "$\\frac{\\mu_0 I}{2\\pi R} (\\pi + 1)$ directed out of page",
      "$\\frac{\\mu_0 I}{4\\pi R} (\\pi + 1)$ directed out of page"
    ]
  },
  93: {
    question: "In a long, straight wire of radius $a$ carrying a current distributed uniformly over its cross-section, the ratio of the magnetic fields at distances $a/3$ and $3a$ from the axis of the wire is :",
    options: ["1", "3", "1/3", "9"]
  },
  94: {
    question: "A charged particle of mass $m$ and charge '$q$' moving under the influence of uniform electric field $E\\hat{i}$ and uniform magnetic field $B\\hat{k}$ follows a trajectory as shown in figure. The speed of the particle at origin and at highest point are $v$ and $2v$ respectively. Which of the following is correct?",
    options: [
      "$E = \\frac{3}{4} \\frac{m v^2}{q B}$",
      "$E = \\frac{1}{2} \\frac{m v^2}{q B}$",
      "$E = \\frac{3}{4} \\frac{m v B}{q}$",
      "$E = \\frac{3}{4} \\frac{m v^2}{q x_0}$"
    ]
  },
  95: {
    question: "An electron gun is placed inside a long solenoid of radius $R$ on its axis. The solenoid has $n$ turns per unit length and carries a current $I$. The electron gun shoots an electron along the radius of the solenoid with speed $v$. If the electron does not hit the solenoid, the maximum possible value of $v$ is :",
    options: [
      "$\\frac{e \\mu_0 n I R}{2m}$",
      "$\\frac{e \\mu_0 n I R}{m}$",
      "$\\frac{2e \\mu_0 n I R}{m}$",
      "$\\frac{e \\mu_0 n I R}{4m}$"
    ]
  },
  96: {
    question: "A small circular loop of conducting wire has radius $a$ and carries current $I$. It is placed in a uniform magnetic field $B$ perpendicular to its plane such that the dipole moment vector is in the direction of $B$. The work done in turning the loop by $180^\\circ$ about an axis in its plane is :",
    options: ["$\\pi a^2 I B$", "$\\frac{1}{2}\\pi a^2 I B$", "$2\\pi a^2 I B$", "Zero"]
  },
  97: {
    question: "A charged particle (mass $m$ and charge $q$) moves along $X$ axis with velocity $v_0$. When it passes through origin it enters a region having uniform electric field $\\vec{E} = -E\\hat{j}$ which extends up to $x = d$. Equation of path of electron in this region is :",
    options: [
      "$y = -\\frac{q E}{2 m v_0} x^2$",
      "$y = -\\frac{q E}{2 m v_0^2} x^2$",
      "$y = \\frac{q E}{2 m v_0^2} x^2$",
      "$y = -\\frac{q E}{m v_0^2} x$"
    ]
  },
  98: {
    question: "A beam of protons with speed $4 \\times 10^5\\text{ m/s}$ enters a uniform magnetic field of $0.3\\text{ T}$ at an angle $60^\\circ$ to the magnetic field. The pitch of the resulting helical path of protons is (Mass of proton = $1.67 \\times 10^{-27}\\text{ kg}$) :",
    options: ["$12\\text{ cm}$", "$8\\text{ cm}$", "$4\\text{ cm}$", "$4.4\\text{ cm}$"]
  },
  99: {
    question: "A small point mass carrying some positive charge on it, is released from the edge of a table. There is a uniform magnetic field in this region in the horizontal direction normal to the plane of the paper. Which of the following trajectories best represents the trajectory of the mass?",
    options: [
      "Straight downward vertical line",
      "Parabola curving downwards",
      "Circular path moving upward",
      "Cycloid curving towards one side as speed increases"
    ]
  },
  100: {
    question: "The figure shows a region of length '$l$' with a uniform magnetic field of $0.3\\text{ T}$ in it and a proton entering the region with velocity $4 \\times 10^5\\text{ m/s}$ making an angle $60^\\circ$ with the field. If the proton completes 10 revolutions before emerging from the field, then the length of the region is :",
    options: ["$0.22\\text{ m}$", "$0.11\\text{ m}$", "$0.44\\text{ m}$", "$0.88\\text{ m}$"]
  },
  101: {
    question: "A wire carrying current $I$ is bent in the shape ABCDEFA as shown, where rectangle ABCD is in $xy$-plane and rectangle ADEF is in $yz$-plane. If $AB = BC = CD = DA = a$, then the magnetic moment of the loop is :",
    options: [
      "$\\sqrt{2} I a^2$",
      "$I a^2$",
      "$2 I a^2$",
      "Zero"
    ]
  },
  102: {
    question: "A galvanometer of resistance $G$ is converted into a voltmeter of range $0 - 1\\text{ V}$ by connecting a resistance $R_1$ in series with it. The additional resistance that should be connected in series with $R_1$ to increase the range of the voltmeter to $0 - 2\\text{ V}$ will be :",
    options: ["$R_1$", "$G$", "$R_1 + G$", "$R_1 - G$"]
  },
  103: {
    question: "A particle of mass $m$ and charge $q$ is moving with a velocity $\\vec{v} = v\\hat{i}$. It enters a region of space where an electric field $\\vec{E} = E\\hat{j}$ and a magnetic field $\\vec{B} = B\\hat{k}$ exist. If the particle continues to move along the $x$-axis undeflected, then :",
    options: ["$v = B/E$", "$v = E/B$", "$v = \\sqrt{E/B}$", "$v = E B$"]
  },
  104: {
    question: "A galvanometer having a coil resistance of $100\\,\\Omega$ gives a full scale deflection when a current of $1\\text{ mA}$ is passed through it. The value of resistance (in $\\Omega$) that must be connected in series with the galvanometer so that it can measure a voltage up to $20\\text{ V}$ is :",
    options: []
  },
  105: {
    question: "A wire A, bent in the shape of an arc of a circle, carrying a current of $2\\text{ A}$ and having radius $2\\text{ cm}$ and another wire B, also bent to form an arc of radius $4\\text{ cm}$ carrying a current of $3\\text{ A}$, are placed coaxially. If both arcs subtend an angle of $90^\\circ$ at the common centre, the ratio of magnetic field at the centre due to wire A and wire B is :",
    options: ["$1 : 2$", "$3 : 2$", "$2 : 3$", "$4 : 3$"]
  },
  106: {
    question: "A particle of charge $q$ and mass $m$ is moving with a velocity $-v\\hat{i}$ ($v \\ne 0$) towards a large screen placed in the $Y-Z$ plane at a distance $d$. If there is a magnetic field $\\vec{B} = B\\hat{k}$, the minimum value of $v$ for which the particle will not hit the screen is :",
    options: [
      "$\\frac{q B d}{m}$",
      "$\\frac{q B d}{2m}$",
      "$\\frac{2 q B d}{m}$",
      "$\\frac{q B d}{4m}$"
    ]
  },
  107: {
    question: "An electron is constrained to move along the $y$-axis with a speed of $0.1c$ ($c$ is the speed of light) in the presence of an electric field $\\vec{E} = 30\\hat{j}\\text{ kV/m}$ and a magnetic field $\\vec{B} = B\\hat{i}$. The magnetic field $\\vec{B}$ required so that net force on electron is zero is :",
    options: ["$0.1\\text{ T}$", "$0.01\\text{ T}$", "$1.0\\text{ T}$", "$0.5\\text{ T}$"]
  },
  108: {
    question: "A circular coil of radius $10\\text{ cm}$ having 500 turns and resistance $2\\,\\Omega$ is placed in a horizontal magnetic field of $0.2\\text{ T}$ with its plane perpendicular to the field. The work done in rotating the coil through $180^\\circ$ is :",
    options: ["$3.14\\text{ J}$", "$1.57\\text{ J}$", "$6.28\\text{ J}$", "$0.785\\text{ J}$"]
  },
  109: {
    question: "A charged particle of mass $m$ and charge $q$ enters a region of uniform magnetic field $B$ with velocity $v$ at an angle $\\theta$ to the magnetic field. The pitch of the helical path is :",
    options: [
      "$\\frac{2\\pi m v \\sin\\theta}{q B}$",
      "$\\frac{2\\pi m v}{q B}$",
      "$\\frac{2\\pi m v \\cos\\theta}{q B}$",
      "$\\frac{\\pi m v \\cos\\theta}{q B}$"
    ]
  },
  110: {
    question: "A long straight wire carrying a current of $30\\text{ A}$ is placed in an external uniform magnetic field of $4.0 \\times 10^{-4}\\text{ T}$ parallel to the current. The magnitude of the resultant magnetic field at a point $2.0\\text{ cm}$ away from the wire is :",
    options: [
      "$4.0 \\times 10^{-4}\\text{ T}$",
      "$3.0 \\times 10^{-4}\\text{ T}$",
      "$5.0 \\times 10^{-4}\\text{ T}$",
      "$7.0 \\times 10^{-4}\\text{ T}$"
    ]
  },
  111: {
    question: "A current carrying loop is placed in a uniform magnetic field. The torque acting on it does not depend upon :",
    options: [
      "area of the loop",
      "shape of the loop",
      "value of current",
      "magnetic field"
    ]
  },
  112: {
    question: "A moving coil galvanometer has a resistance of $50\\,\\Omega$ and gives full scale deflection for a current of $0.05\\text{ A}$. The resistance to be connected in series with the galvanometer to convert it into a voltmeter of range $0 - 100\\text{ V}$ is :",
    options: ["$2050\\,\\Omega$", "$1900\\,\\Omega$", "$2000\\,\\Omega$", "$1950\\,\\Omega$"]
  },
  113: {
    question: "Two long parallel wires carrying currents of $5\\text{ A}$ and $10\\text{ A}$ in opposite directions are placed $20\\text{ cm}$ apart. The nature and magnitude of the force per unit length between them is :",
    options: [
      "Attractive, $5 \\times 10^{-5}\\text{ N/m}$",
      "Repulsive, $10^{-4}\\text{ N/m}$",
      "Repulsive, $5 \\times 10^{-5}\\text{ N/m}$",
      "Attractive, $10^{-4}\\text{ N/m}$"
    ]
  },
  114: {
    question: "A proton, a deuteron and an $\\alpha$-particle are moving with same momentum in a uniform magnetic field. The ratio of the magnetic forces acting on them will be :",
    options: ["$2 : 2 : 1$", "$1 : 1 : 2$", "$4 : 2 : 1$", "$1 : 2 : 4$"]
  },
  115: {
    question: "A circular loop of radius $r$ carrying current $I$ lies in $y-z$ plane with its centre at origin. The magnetic field at a point on the axis of the loop at distance $x$ from origin ($x \\gg r$) is proportional to :",
    options: ["$x$", "$x^{-2}$", "$x^{-3}$", "$x^{-1}$"]
  },
  116: {
    question: "A rectangular coil of 20 turns and area of cross-section $25\\text{ cm}^2$ has a resistance of $100\\,\\Omega$. If a magnetic field which is perpendicular to the plane of coil changes at the rate of $1000\\text{ T/s}$, the current in the coil is :",
    options: ["$0.5\\text{ A}$", "$5.0\\text{ A}$", "$50\\text{ A}$", "$1.0\\text{ A}$"]
  },
  117: {
    question: "A hairpin like shape as shown in figure is made by bending a long current carrying wire. The magnitude of magnetic field at point P which is the centre of the circular part of radius $R$ is :",
    options: [
      "$\\frac{\\mu_0 I}{4\\pi R} (2 + \\pi)$",
      "$\\frac{\\mu_0 I}{4\\pi R} (2 - \\pi)$",
      "$\\frac{\\mu_0 I}{2\\pi R} (1 + \\pi)$",
      "$\\frac{\\mu_0 I}{4 R}$"
    ]
  },
  118: {
    question: "Four identical long solenoids A, B, C and D are connected to each other as shown in the circuit. If the magnetic field at the centre of solenoid A is $B$, then the magnetic field at the centre of solenoid D is :",
    options: ["$B/3$", "$B$", "$3B$", "$B/2$"]
  },
  119: {
    question: "A proton, an electron, and an $\\alpha$-particle have the same kinetic energy. They enter in a region of uniform magnetic field perpendicular to the velocity. The ratio of the radii of their circular paths $r_e : r_p : r_\\alpha$ is :",
    options: [
      "$\\sqrt{m_e} : \\sqrt{m_p} : \\sqrt{m_p}$",
      "$\\sqrt{m_e} : \\sqrt{m_p} : 2\\sqrt{m_p}$",
      "$m_e : m_p : 2m_p$",
      "$\\sqrt{m_e} : 2\\sqrt{m_p} : \\sqrt{m_p}$"
    ]
  },
  120: {
    question: "A toroid of 1000 turns has an average radius of $10\\text{ cm}$ and carries a current of $0.5\\text{ A}$. The magnetic field along the core of the toroid is :",
    options: [
      "$1.0 \\times 10^{-3}\\text{ T}$",
      "$2.0 \\times 10^{-3}\\text{ T}$",
      "$0.5 \\times 10^{-3}\\text{ T}$",
      "$1.0 \\times 10^{-2}\\text{ T}$"
    ]
  },
  121: {
    question: "A circular coil of radius $R$ carries an electric current. The magnetic field due to the coil at a point on the axis at distance $x$ from the centre is $B_1$. If the magnetic field at the centre is $B_0$, then $B_1 / B_0$ is :",
    options: [
      "$\\left(1 + \\frac{x^2}{R^2}\\right)^{-1/2}$",
      "$\\left(1 + \\frac{x^2}{R^2}\\right)^{-3/2}$",
      "$\\left(1 + \\frac{x^2}{R^2}\\right)^{-1}$",
      "$\\left(1 + \\frac{x^2}{R^2}\\right)^{-2}$"
    ]
  },
  122: {
    question: "A charged particle is projected in a magnetic field $\\vec{B} = (2\\hat{i} + 4\\hat{j}) \\times 10^{-2}\\text{ T}$. The acceleration of the particle is found to be $\\vec{a} = (x\\hat{i} - 4\\hat{j})\\text{ m/s}^2$. The value of $x$ is :",
    options: ["$-8$", "$8$", "$-4$", "$4$"]
  },
  123: {
    question: "Figure A and B show two long straight wires of circular cross-section ($a$ and $b$ with $a < b$) carrying current $I$ which is uniformly distributed across the cross-section. The magnetic field at the surface of wire A is $B_A$ and at the surface of wire B is $B_B$. Then :",
    options: [
      "$B_A > B_B$",
      "$B_A < B_B$",
      "$B_A = B_B$",
      "$B_A = 2 B_B$"
    ]
  },
  124: {
    question: "A wire carrying a current $I$ along the positive $x$-axis has length $L$. It is kept in a magnetic field $\\vec{B} = (2\\hat{i} + 3\\hat{j} - 4\\hat{k})\\text{ T}$. The magnitude of the magnetic force acting on the wire is :",
    options: [
      "$5 I L$",
      "$\\sqrt{29} I L$",
      "$5 I L$",
      "$\\sqrt{13} I L$"
    ]
  },
  125: {
    question: "A particle of mass $1\\text{ mg}$ and charge $1\\,\\mu\\text{C}$ is projected in a magnetic field of $1\\text{ T}$ with a velocity of $1000\\text{ m/s}$ perpendicular to the field. The radius of the circular path described by the particle is $x\\text{ m}$. The value of $x$ is :",
    options: []
  },
  126: {
    question: "A galvanometer of resistance $50\\,\\Omega$ is connected to a battery of $3\\text{ V}$ along with a resistance of $2950\\,\\Omega$ in series. A full scale deflection of 30 divisions is obtained in the galvanometer. In order to reduce this deflection to 20 divisions, the resistance in series should be increased by $x\\,\\Omega$. The value of $x$ in hundreds of ohms (i.e. $x/100$) is :",
    options: []
  },
  127: {
    question: "A circular coil of 200 turns and radius $10\\text{ cm}$ carries a current of $5\\text{ A}$. The magnetic field at a point on the axis at a distance of $10\\sqrt{3}\\text{ cm}$ from the centre of the coil is $x\\,\\mu\\text{T}$. The value of $x$ to the nearest integer is :",
    options: []
  },
  128: {
    question: "A moving coil galvanometer has 100 turns, each of area $0.05\\text{ m}^2$, and is in a magnetic field of $0.01\\text{ T}$. If the torsional constant of the suspension wire is $10^{-5}\\text{ N}\\cdot\\text{m/deg}$, the current sensitivity of the galvanometer is :",
    options: [
      "$0.5\\text{ deg/}\\mu\\text{A}$",
      "$5.0\\text{ deg/mA}$",
      "$1.0\\text{ deg/}\\mu\\text{A}$",
      "$2.5\\text{ deg/mA}$"
    ]
  },
  129: {
    question: "A long straight wire carries a current of $35\\text{ A}$. What is the magnitude of the field $B$ at a point $20\\text{ cm}$ from the wire? If $B = x \\times 10^{-5}\\text{ T}$, then the value of $x$ is :",
    options: []
  },
  130: {
    question: "A beam of electrons passes undeflected through mutually perpendicular electric and magnetic fields. If the electric field is switched off, and the same magnetic field is maintained, the electrons move :",
    options: [
      "in an elliptical orbit",
      "along a parabolic path",
      "along a straight line",
      "in a circular orbit"
    ]
  },
  131: {
    question: "A coil having $N$ turns is wound tightly in the form of a spiral with inner and outer radii $a$ and $b$ respectively. When a current $I$ passes through the coil, the magnetic field at the centre is :",
    options: [
      "$\\frac{\\mu_0 N I}{2(b-a)} \\ln\\left(\\frac{b}{a}\\right)$",
      "$\\frac{\\mu_0 N I}{2(b-a)} \\frac{b}{a}$",
      "$\\frac{\\mu_0 N I}{b-a} \\ln\\left(\\frac{b}{a}\\right)$",
      "$\\frac{\\mu_0 N I}{2(b+a)}$"
    ]
  },
  132: {
    question: "A uniform magnetic field of $1.5\\text{ T}$ exists in a cylindrical region of radius $10.0\\text{ cm}$, its direction being parallel to the axis along east to west. A wire carrying current of $5.0\\text{ A}$ in the north to south direction passes through this region. The magnitude of force on the wire if the wire intersects the axis is :",
    options: ["$0.75\\text{ N}$", "$1.5\\text{ N}$", "$3.0\\text{ N}$", "$1.5\\text{ N}$ directed downwards"]
  },
  133: {
    question: "There are two infinitely long straight current-carrying conductors and they are held at right angles to each other so that their common point is at origin. The current in one is $I_1$ along the $x$-axis and in the other is $I_2$ along the $y$-axis. The locus of points where the magnetic field is zero is :",
    options: [
      "$y = \\frac{I_1}{I_2} x$",
      "$y = -\\frac{I_1}{I_2} x$",
      "$y = \\frac{I_2}{I_1} x$",
      "$y = -\\frac{I_2}{I_1} x$"
    ]
  },
  134: {
    question: "A straight wire of mass $200\\text{ g}$ and length $1.5\\text{ m}$ carries a current of $2\\text{ A}$. It is suspended in mid-air by a uniform horizontal magnetic field $B$. The magnitude of $B$ is ($g = 9.8\\text{ m/s}^2$) :",
    options: ["$0.33\\text{ T}$", "$0.50\\text{ T}$", "$0.65\\text{ T}$", "$0.49\\text{ T}$"]
  },
  135: {
    question: "Two circular coils 1 and 2 are made from the same wire but the radius of the 1st coil is twice that of the 2nd coil. What is the ratio of potential difference applied across them so that the magnetic field at their centres is the same?",
    options: ["4", "2", "3", "6"]
  },
  136: {
    question: "A galvanometer coil has a resistance of $15\\,\\Omega$ and the meter shows full scale deflection for a current of $4\\text{ mA}$. How will you convert the meter into an ammeter of range $0$ to $6\\text{ A}$?",
    options: [
      "By connecting a resistance of $0.01\\,\\Omega$ in series",
      "By connecting a resistance of $0.01\\,\\Omega$ in parallel",
      "By connecting a resistance of $0.1\\,\\Omega$ in parallel",
      "By connecting a resistance of $0.1\\,\\Omega$ in series"
    ]
  },
  137: {
    question: "A particle of mass $m$, charge $q$ and kinetic energy $T$ enters a transverse uniform magnetic field of induction $\\vec{B}$. After 3 seconds the kinetic energy of the particle will be :",
    options: ["$T$", "$4T$", "$3T$", "$2T$"]
  },
  138: {
    question: "A long solenoid carrying a current produces a magnetic field $B$ along its axis. If the current is doubled and the number of turns per cm is halved, the new value of the magnetic field is :",
    options: ["$B/2$", "$B/4$", "$2B$", "$B$"]
  },
  139: {
    question: "A charged particle moves in a circular path in a uniform magnetic field. If its speed is reduced, the time period of revolution will :",
    options: ["decrease", "remain same", "increase", "become zero"]
  },
  140: {
    question: "A circular coil of radius $5\\text{ cm}$ having 100 turns carries a current of $0.5\\text{ A}$. The magnetic dipole moment of the coil in $\\times 10^{-1}\\text{ A}\\cdot\\text{m}^2$ is :",
    options: []
  }
};

const finalPart2 = [];
for (let q = 71; q <= 140; q++) {
  const data = MAG_PART2_DATA[q];
  const ans = keys[q];
  const isNumeric = NUMERICALS_P2.has(q);
  const diagKey = `mag_q${q}_diagram.png`;
  const diagUrl = diagUrls[diagKey] || null;

  finalPart2.push({
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
  path.resolve(__dirname, 'mag_part2_questions.json'),
  JSON.stringify(finalPart2, null, 2)
);
console.log(`Successfully generated mag_part2_questions.json with ${finalPart2.length} questions!`);
