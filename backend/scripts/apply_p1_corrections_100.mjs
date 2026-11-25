import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ELECTRO_PART1_OVERRIDES } from './clean_electro_part1.mjs';

const P1_CORRECTIONS_51_100 = {
  51: {
    text: "Let a total charge $2Q$ be distributed in a sphere of radius $R$, with the charge density given by $\\rho(r) = kr$, where $r$ is the distance from the centre. Two charges $A$ and $B$, of $-q$ each, are placed on diametrically opposite sides, at equal distance $a$ from the centre. If $A$ and $B$ do not experience any force, then:",
    options: [
      "a = 8^{-1/4} R",
      "a = 2^{-1/4} R",
      "a = R / \\sqrt{3}",
      "a = R / 2"
    ]
  },
  52: {
    text: "A non-uniform electric field $\\vec{E} = (3x^2 \\hat{i} + 4\\hat{j})\\text{ N/C}$ is present in space. The flux of this field through a circular surface of radius $0.02\\text{ m}$ parallel to the $Y-Z$ plane at $x = 1\\text{ m}$ is nearly:",
    options: ["0.0038\\text{ N m}^2\\text{C}^{-1}", "0.005\\text{ N m}^2\\text{C}^{-1}", "0.012\\text{ N m}^2\\text{C}^{-1}", "3.14\\text{ N m}^2\\text{C}^{-1}"]
  },
  53: {
    text: "An electric dipole has a fixed dipole moment $\\vec{p}$, which makes angle $\\theta$ with respect to the $x$-axis. When subjected to an electric field $\\vec{E}_1 = E\\hat{i}$, it experiences a torque $\\vec{T}_1 = \\tau\\hat{k}$. When subjected to an electric field $\\vec{E}_2 = \\sqrt{3}E_1\\hat{j}$, it experiences a torque $\\vec{T}_2 = -\\vec{T}_1$. The angle $\\theta$ is:",
    options: ["30^\\circ", "45^\\circ", "60^\\circ", "90^\\circ"]
  },
  54: {
    text: "Two identical charged particles each having a mass $10\\text{ g}$ and charge $2.0 \\times 10^{-7}\\text{ C}$ are placed on a horizontal table with a separation of $L$ between them such that they stay in equilibrium. If the coefficient of friction between each particle and the table is $0.25$, find the value of $L$ ($g = 10\\text{ m/s}^2$):",
    options: ["12\\text{ cm}", "10\\text{ cm}", "8\\text{ cm}", "15\\text{ cm}"]
  },
  55: {
    text: "The electric field in a region is radially outward with magnitude $E(r) = Ar$. The charge contained in a sphere of radius $a$ centered at the origin is:",
    options: ["4\\pi\\varepsilon_0 A a^3", "4\\pi\\varepsilon_0 A a^2", "2\\pi\\varepsilon_0 A a^3", "\\pi\\varepsilon_0 A a^3"]
  },
  56: {
    text: "A neutral spherical conducting shell has two spherical cavities of radii $a$ and $b$. Point charges $q_a$ and $q_b$ are placed at the centres of the cavities respectively. If $\\sigma_a$ and $\\sigma_b$ are surface charge densities on the inner surfaces and $\\sigma$ is the surface charge density on the outer surface, then:",
    options: [
      "\\sigma_a = 0, \\sigma_b = 0, \\sigma = 0",
      "\\sigma_a \\ne 0, \\sigma_b = 0, \\sigma = 0",
      "\\sigma_a \\ne 0, \\sigma_b \\ne 0, \\sigma = \\frac{q_a + q_b}{4\\pi R^2}",
      "\\sigma_a = 0, \\sigma_b \\ne 0, \\sigma = 0"
    ]
  },
  57: {
    text: "A solid conducting sphere, having a charge $Q$, is surrounded by an uncharged conducting concentric spherical shell. Let the potential difference between the surface of the solid sphere and that of the outer surface of the shell be $V$. If the shell is now given a charge of $-4Q$, the new potential difference between the same two surfaces is:",
    options: ["V", "2V", "-2V", "4V"]
  },
  58: {
    text: "Three charges $Q, +q$ and $+q$ are placed at the vertices of a right-angled isosceles triangle as shown. The net electrostatic energy of the configuration is zero if $Q$ is equal to:",
    options: [
      "-\\frac{2q}{2 + \\sqrt{2}}",
      "-2q",
      "-\\frac{q}{1 + \\sqrt{2}}",
      "+q"
    ]
  },
  59: {
    text: "Four closed surfaces and corresponding charge distributions are shown. If the net electric flux through the surfaces are $\\phi_1, \\phi_2, \\phi_3, \\phi_4$ respectively, then:",
    options: [
      "\\phi_1 > \\phi_2 > \\phi_3 > \\phi_4",
      "\\phi_1 < \\phi_2 < \\phi_3 < \\phi_4",
      "\\phi_1 = \\phi_2 = \\phi_3 = \\phi_4",
      "\\phi_1 > \\phi_3 > \\phi_2 > \\phi_4"
    ]
  },
  60: {
    text: "The electric potential in a region of space is given by $V(x, y, z) = A(x^2 - 3y^2 + z^2)$. The electric field at point $(1, 1, 1)$ is:",
    options: [
      "2A(-\\hat{i} + 3\\hat{j} - \\hat{k})",
      "2A(\\hat{i} - 3\\hat{j} + \\hat{k})",
      "A(-\\hat{i} + 3\\hat{j} - \\hat{k})",
      "A(\\hat{i} - 3\\hat{j} + \\hat{k})"
    ]
  },
  61: {
    text: "Within a spherical charge distribution of charge density $\\rho(r)$, $N$ equipotential surfaces of potentials $V_0, V_0 + \\Delta V, \\dots$ are drawn. If the radius of the sphere is $R$, then the charge density varies with distance $r$ as:",
    options: ["\\rho(r) \\propto r", "\\rho(r) = \\text{constant}", "\\rho(r) \\propto 1/r", "\\rho(r) \\propto 1/r^2"]
  },
  62: {
    text: "An electric dipole has fixed dipole moment $\\vec{p}$, which makes an angle $\\theta$ with respect to the $x$-axis. When subjected to an electric field $\\vec{E}_1 = E\\hat{i}$, it experiences a torque $\\vec{T}_1 = \\tau\\hat{k}$. When subjected to an electric field $\\vec{E}_2 = \\sqrt{3}E\\hat{j}$, it experiences a torque $\\vec{T}_2 = -\\vec{T}_1$. Then angle $\\theta$ is:",
    options: ["60^\\circ", "30^\\circ", "45^\\circ", "90^\\circ"]
  },
  63: {
    text: "The energy stored in the electric field produced by a metal sphere is $4.5\\text{ J}$. If the sphere contains $4\\mu\\text{C}$ charge, its radius will be (take $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$):",
    options: ["32\\text{ mm}", "16\\text{ mm}", "28\\text{ mm}", "20\\text{ mm}"]
  },
  64: {
    text: "There is a uniform electrostatic field in a region. The potential at points on a circular path of radius $R$ in the $x-y$ plane varies as $V = V_0 \\cos\\theta$. The electric field is directed along:",
    options: ["positive x-axis", "negative x-axis", "positive y-axis", "negative y-axis"]
  },
  65: {
    text: "Four closed surfaces and corresponding charge distributions are shown. Let the respective electric fluxes through the surfaces be $\\phi_1, \\phi_2, \\phi_3$ and $\\phi_4$. Then:",
    options: [
      "\\phi_1 > \\phi_2 > \\phi_3 > \\phi_4",
      "\\phi_1 < \\phi_2 = \\phi_3 > \\phi_4",
      "\\phi_1 > \\phi_3, \\phi_2 < \\phi_4",
      "\\phi_1 = \\phi_2 = \\phi_3 = \\phi_4"
    ]
  },
  66: {
    text: "Three concentric metal shells $A, B$ and $C$ of respective radii $a, b$ and $c$ ($a < b < c$) have surface charge densities $+\\sigma, -\\sigma$ and $+\\sigma$ respectively. The potential of shell $B$ is:",
    options: [
      "\\frac{\\sigma}{\\varepsilon_0}\\left[\\frac{b^2 - c^2}{c} + a\\right]",
      "\\frac{\\sigma}{\\varepsilon_0}\\left[\\frac{a^2 - b^2}{b} + c\\right]",
      "\\frac{\\sigma}{\\varepsilon_0}\\left[\\frac{a^2 - b^2}{c} + b\\right]",
      "\\frac{\\sigma}{\\varepsilon_0}\\left[\\frac{b^2 - a^2}{b} + c\\right]"
    ]
  },
  67: {
    text: "A charge $Q$ is placed at a distance $x$ above the centre of a square surface of edge $a$. The electric flux through the square surface is independent of $x$ when $x$ is equal to:",
    options: ["a / 2", "a / 4", "a / \\sqrt{2}", "a"]
  },
  68: {
    text: "A body of mass $M$ and charge $q$ is connected to a spring of spring constant $k$. It is oscillating along the $x$-direction about its equilibrium position at $x = 0$ with amplitude $A$. An electric field $E$ is applied along the $x$-direction. Which of the following statements is correct?",
    options: [
      "The total energy of the system is \\frac{1}{2} M\\omega^2 A^2 + \\frac{1}{2}\\frac{q^2 E^2}{k}",
      "The new equilibrium position is at a distance qE/k from x = 0",
      "The new equilibrium position is at a distance 2qE/k from x = 0",
      "The total energy of the system is \\frac{1}{2}M\\omega^2 A^2 - \\frac{1}{2}\\frac{q^2 E^2}{k}"
    ]
  },
  69: {
    text: "A charge $Q$ is placed at a distance $a/2$ above the centre of the square surface of edge $a$ as shown in the figure. The electric flux through the square surface is:",
    options: [
      "\\frac{Q}{3\\varepsilon_0}",
      "\\frac{Q}{6\\varepsilon_0}",
      "\\frac{Q}{2\\varepsilon_0}",
      "\\frac{Q}{\\varepsilon_0}"
    ]
  },
  70: {
    text: "A uniform electric field of magnitude $E = 100\\text{ N/C}$ exists in the space in the $X$-direction. The flux of this field through a plane square area of edge $10\\text{ cm}$ placed in the $Y-Z$ plane is:",
    options: ["1.0\\text{ N m}^2\\text{/C}", "10\\text{ N m}^2\\text{/C}", "100\\text{ N m}^2\\text{/C}", "0.1\\text{ N m}^2\\text{/C}"]
  },
  71: {
    text: "Two identical conducting spheres $A$ and $B$ carry equal charges. They are separated by a distance much larger than their diameters, and the force between them is $F$. A third identical conducting sphere $C$, uncharged, is brought in contact with $A$, then with $B$, and finally removed. The new force between $A$ and $B$ will be:",
    options: ["3F / 4", "F / 2", "3F / 8", "F / 4"]
  },
  72: {
    text: "Three charges $+Q, q, +Q$ are placed respectively, at distances $0, d/2$ and $d$ from the origin, on the $x$-axis. If the net force experienced by $+Q$ (at $x = 0$) is zero, then value of $q$ is:",
    options: ["-Q / 2", "+Q / 2", "-Q / 4", "+Q / 4"]
  },
  73: {
    text: "For a uniformly charged ring of radius $R$, the electric field on its axis has the maximum value at a distance $h$ from its centre. The value of $h$ is:",
    options: ["R", "R / \\sqrt{2}", "R / 2", "\\sqrt{2} R"]
  },
  74: {
    text: "Charge is distributed within a sphere of radius $R$ with a volume charge density $\\rho(r) = \\frac{A}{r^2} e^{-2r/a}$, where $A$ and $a$ are constants. If $Q$ is the total charge of this charge distribution, the radius $R$ is:",
    options: [
      "\\frac{a}{2}\\ln\\left(\\frac{1}{1 - \\frac{Q}{2\\pi a A}}\\right)",
      "a\\ln\\left(\\frac{1}{1 - \\frac{Q}{2\\pi a A}}\\right)",
      "\\frac{a}{2}\\ln\\left(\\frac{1}{1 - \\frac{Q}{\\pi a A}}\\right)",
      "a\\ln\\left(\\frac{1}{1 - \\frac{Q}{\\pi a A}}\\right)"
    ]
  },
  75: {
    text: "Two point charges $q_1 = \\sqrt{10}\\mu\\text{C}$ and $q_2 = -25\\mu\\text{C}$ are placed on the $x$-axis at $x = 1\\text{ m}$ and $x = 4\\text{ m}$ respectively. The electric field on the $y$-axis at $y = 3\\text{ m}$ is:",
    options: [
      "(63\\hat{i} - 27\\hat{j}) \\times 10^2\\text{ V/m}",
      "(-63\\hat{i} + 27\\hat{j}) \\times 10^2\\text{ V/m}",
      "(81\\hat{i} - 36\\hat{j}) \\times 10^2\\text{ V/m}",
      "(-81\\hat{i} + 36\\hat{j}) \\times 10^2\\text{ V/m}"
    ]
  },
  76: {
    text: "A solid conducting sphere of radius $R$ has a charge $Q$. It is surrounded by a concentric conducting spherical shell of inner radius $2R$ and outer radius $3R$. If the shell has a net charge $-2Q$, the potential at a distance $r$ from the centre ($R < r < 2R$) is:",
    options: [
      "\\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{Q}{r} - \\frac{Q}{3R}\\right]",
      "\\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{Q}{r} - \\frac{2Q}{3R}\\right]",
      "\\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{Q}{r} - \\frac{Q}{2R}\\right]",
      "\\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{Q}{2R} - \\frac{Q}{3R}\\right]"
    ]
  },
  77: {
    text: "Three concentric metal shells $A, B$ and $C$ of respective radii $a, b$ and $c$ ($a < b < c$) have surface charge densities $+\\sigma, -\\sigma$ and $+\\sigma$ respectively. If $V_A, V_B$ and $V_C$ are potentials of the shells, then for $c = a + b$, we have:",
    options: ["V_C = V_B \\ne V_A", "V_C = V_A \\ne V_B", "V_A = V_B = V_C", "V_A = V_B \\ne V_C"]
  },
  78: {
    text: "An electric dipole of moment $\\vec{p} = (\\hat{i} + 2\\hat{j}) \\times 10^{-29}\\text{ C m}$ is placed in an electric field $\\vec{E} = (2\\hat{i} + \\hat{j}) \\times 10^5\\text{ V/m}$. The torque on the dipole is:",
    options: [
      "-3\\hat{k} \\times 10^{-24}\\text{ N m}",
      "3\\hat{k} \\times 10^{-24}\\text{ N m}",
      "-1.5\\hat{k} \\times 10^{-24}\\text{ N m}",
      "1.5\\hat{k} \\times 10^{-24}\\text{ N m}"
    ]
  },
  79: {
    text: "A point charge $q$ is placed at the centre of a spherical cavity of radius $R$ in an uncharged conducting sphere of radius $2R$. The electric field at a distance $r$ ($R < r < 2R$) from the centre is:",
    options: ["\\text{zero}", "\\frac{q}{4\\pi\\varepsilon_0 r^2}", "\\frac{q}{4\\pi\\varepsilon_0 R^2}", "\\frac{q}{16\\pi\\varepsilon_0 R^2}"]
  },
  80: {
    text: "A small electric dipole is placed at the origin with its axis along the $z$-axis. The electric field at a point on the $x$-axis at distance $x$ from the origin is proportional to:",
    options: ["x^{-3}", "x^{-2}", "x^{-1}", "x^{-4}"]
  },
  81: {
    text: "The electric field in a region is given by $\\vec{E} = E_0 x \\hat{i}$. The flux through a cube of side $a$ bounded by $x = 0, x = a, y = 0, y = a, z = 0, z = a$ is:",
    options: ["E_0 a^3", "2E_0 a^3", "E_0 a^2", "\\text{zero}"]
  },
  82: {
    text: "Two identical thin rings, each of radius $R$ metres, are coaxially placed a distance $R$ metres apart. If $Q_1$ and $Q_2$ charges are spread uniformly on the rings, the work done in moving a charge $q$ from the centre of the first ring to that of the second is:",
    options: [
      "\\frac{q(Q_1 - Q_2)(\\sqrt{2} - 1)}{\\sqrt{2}(4\\pi\\varepsilon_0 R)}",
      "\\frac{q(Q_1 + Q_2)(\\sqrt{2} - 1)}{\\sqrt{2}(4\\pi\\varepsilon_0 R)}",
      "\\frac{q\\sqrt{2}(Q_1 - Q_2)}{4\\pi\\varepsilon_0 R}",
      "\\text{zero}"
    ]
  },
  83: {
    text: "A uniformly charged ring of radius $3\\text{ a}$ and total charge $q$ is placed in the $x-y$ plane centered at the origin. A point charge $q$ is placed at $(0, 0, 4a)$. The electric force on the point charge is:",
    options: [
      "\\frac{4 q^2}{125\\pi\\varepsilon_0 a^2}",
      "\\frac{q^2}{100\\pi\\varepsilon_0 a^2}",
      "\\frac{q^2}{125\\pi\\varepsilon_0 a^2}",
      "\\frac{2 q^2}{125\\pi\\varepsilon_0 a^2}"
    ]
  },
  84: {
    text: "Determine the electric dipole moment of the system of three charges, $+q, +q$ and $-2q$, placed on the vertices of an equilateral triangle of side $a$ as shown in the figure:",
    options: ["\\sqrt{3} q a", "2 q a", "q a", "\\sqrt{2} q a"]
  },
  85: {
    text: "A particle of mass $m$ and charge $q$ is placed at rest in a uniform electric field $E$ and then released. The kinetic energy attained by the particle after moving a distance $y$ is:",
    options: ["q^2 E y", "2 q E y", "q E y", "q E y^2"]
  },
  86: {
    text: "A non-conducting ring of radius $0.5\\text{ m}$ carries a total charge of $1.11 \\times 10^{-10}\\text{ C}$ distributed non-uniformly on its circumference producing an electric field $E$ everywhere in space. The value of the integral $\\int_{l=\\infty}^{l=0} -\\vec{E} \\cdot d\\vec{l}$ ($l = 0$ being centre of the ring) is:",
    options: ["+2\\text{ V}", "-2\\text{ V}", "-1\\text{ V}", "+1\\text{ V}"]
  },
  87: {
    text: "The electric potential at a point $(x, y, z)$ is given by $V = -x^2 y - x z^3 + 4$. The electric field $\\vec{E}$ at that point is:",
    options: [
      "\\vec{E} = (2xy + z^3)\\hat{i} + x^2\\hat{j} + 3xz^2\\hat{k}",
      "\\vec{E} = 2xy\\hat{i} + (x^2 + y^2)\\hat{j} + (3xz - y^2)\\hat{k}",
      "\\vec{E} = z^3\\hat{i} + xyz\\hat{j} + z^2\\hat{k}",
      "\\vec{E} = (2xy - z^3)\\hat{i} + x^2\\hat{j} + 3xz^2\\hat{k}"
    ]
  },
  88: {
    text: "An electric dipole consists of two opposite charges each of magnitude $1.0\\mu\\text{C}$ separated by a distance of $2.0\\text{ cm}$. The dipole is placed in an external electric field of $1.0 \\times 10^5\\text{ N/C}$. The maximum torque on the dipole is:",
    options: [
      "4.0 \\times 10^{-3}\\text{ N m}",
      "1.0 \\times 10^{-3}\\text{ N m}",
      "2.0 \\times 10^{-3}\\text{ N m}",
      "2.0 \\times 10^{-2}\\text{ N m}"
    ]
  },
  89: {
    text: "Two identical point charges $+q$ are fixed at $(a, 0)$ and $(-a, 0)$. A third point charge $+q$ is placed at the origin. If it is displaced by a small distance $x$ ($x \\ll a$) along the $x$-axis, the net electrostatic force on it is proportional to:",
    options: ["x", "-x", "x^2", "x^3"]
  },
  90: {
    text: "A system of three charges is placed as shown in the figure: $-q$ at $(0, -d)$, $+2q$ at $(0, 0)$, and $-q$ at $(0, d)$. The electric field at a distance $D$ ($D \\gg d$) on the $x$-axis behaves as:",
    options: [
      "E \\propto \\frac{1}{D^4}",
      "E \\propto \\frac{1}{D^3}",
      "E \\propto \\frac{1}{D^2}",
      "E \\propto \\frac{1}{D}"
    ]
  },
  91: {
    text: "Four point charges $-q, +q, +q$ and $-q$ are placed on the $y$-axis at $y = -2d, y = -d, y = +d$ and $y = +2d$ respectively. The magnitude of the electric field $E$ at a point on the $x$-axis at $x = D$, with $D \\gg d$, will behave as:",
    options: ["E \\propto \\frac{1}{D^4}", "E \\propto \\frac{1}{D^3}", "E \\propto \\frac{1}{D^2}", "E \\propto \\frac{1}{D}"]
  },
  92: {
    text: "A spherically symmetric charge distribution is characterised by a charge density $\\rho(r) = \\rho_0 (1 - r/R)$ for $r \\le R$ and $\\rho(r) = 0$ for $r > R$. The electric field at $r = R$ is:",
    options: [
      "\\frac{\\rho_0 R}{12\\varepsilon_0}",
      "\\frac{\\rho_0 R}{3\\varepsilon_0}",
      "\\frac{\\rho_0 R}{4\\varepsilon_0}",
      "\\text{zero}"
    ]
  },
  93: {
    text: "A simple pendulum of length $L$ is placed between the plates of a parallel plate capacitor having electric field $E$ directed vertically downwards, as shown in figure. Its bob has mass $m$ and positive charge $q$. The time period of the pendulum is:",
    options: [
      "2\\pi \\sqrt{\\frac{L}{g + \\frac{qE}{m}}}",
      "2\\pi \\sqrt{\\frac{L}{g - \\frac{qE}{m}}}",
      "2\\pi \\sqrt{\\frac{L}{\\sqrt{g^2 + (\\frac{qE}{m})^2}}}",
      "2\\pi \\sqrt{\\frac{L}{g}}"
    ]
  },
  94: {
    text: "A uniform electric field $\\vec{E} = a\\hat{i} + b\\hat{j}$ intersects a surface of area $A$. What is the flux through this area if the surface lies in the $y-z$ plane?",
    options: ["a A", "b A", "\\sqrt{a^2 + b^2} A", "\\text{zero}"]
  },
  95: {
    text: "Two small spherical balls each carrying a charge $Q = 10\\mu\\text{C}$ are suspended by two insulating threads of equal lengths $1\\text{ m}$ each, from a point with fixed ceiling. It is found that in equilibrium threads are separated by an angle $60^\\circ$ between them. What is the tension in the threads? (Given: $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$):",
    options: ["1.8\\text{ N}", "0.9\\text{ N}", "0.18\\text{ N}", "18\\text{ N}"]
  },
  96: {
    text: "Shown in the figure is a shell made of a conductor. It has inner radius $a$ and outer radius $b$, and carries net charge $Q$. At its centre a dipole $\\vec{p}$ is placed as shown, then:",
    options: [
      "Surface charge density on the inner surface of the shell is zero everywhere",
      "Electric field outside the shell is the same as that of a point charge at the centre of the shell",
      "Surface charge density on the inner surface is uniform and equal to \\frac{Q}{4\\pi a^2}",
      "Surface charge density on the outer surface depends on \\vec{p}"
    ]
  },
  97: {
    text: "An electric dipole of dipole moment $\\vec{p}$ is placed at a distance $r$ from an infinitely long line of charge having linear charge density $\\lambda$. The force on the dipole if $\\vec{p}$ is directed along the radius vector is:",
    options: [
      "\\frac{p\\lambda}{2\\pi\\varepsilon_0 r^2}",
      "\\frac{p\\lambda}{4\\pi\\varepsilon_0 r^2}",
      "\\frac{2p\\lambda}{\\pi\\varepsilon_0 r^2}",
      "\\text{zero}"
    ]
  },
  98: {
    text: "Three charged particles $A, B$ and $C$ with charges $-4q, 2q$ and $-2q$ are present on the circumference of a circle of radius $d$. The angle between $A$ and $B$ is $60^\\circ$ and between $B$ and $C$ is $60^\\circ$. The electric field at the centre of the circle is:",
    options: [
      "\\frac{\\sqrt{3} q}{\\pi\\varepsilon_0 d^2}",
      "\\frac{3\\sqrt{3} q}{4\\pi\\varepsilon_0 d^2}",
      "\\frac{q}{2\\pi\\varepsilon_0 d^2}",
      "\\frac{\\sqrt{2} q}{\\pi\\varepsilon_0 d^2}"
    ]
  },
  99: {
    text: "A non-conducting semi-circular ring of radius $R$ has a uniform linear charge density $\\lambda$. The electric potential at the centre of curvature is:",
    options: ["\\frac{\\lambda}{4\\varepsilon_0}", "\\frac{\\lambda}{2\\varepsilon_0}", "\\frac{\\lambda}{\\varepsilon_0}", "\\frac{\\lambda}{8\\varepsilon_0}"]
  },
  100: {
    text: "Consider two charged metallic spheres $S_1$ and $S_2$ of radii $R_1$ and $R_2$ respectively. The electric fields $E_1$ (on $S_1$) and $E_2$ (on $S_2$) on their surfaces are such that $E_1/E_2 = R_1/R_2$. Then the ratio $V_1/V_2$ of the electrostatic potentials on each sphere is:",
    options: ["R_1 / R_2", "(R_1 / R_2)^2", "(R_2 / R_1)^2", "R_2 / R_1"]
  }
};

// Merge into ELECTRO_PART1_OVERRIDES
const updatedPart1 = { ...ELECTRO_PART1_OVERRIDES };
for (const [q, data] of Object.entries(P1_CORRECTIONS_51_100)) {
  updatedPart1[q] = data;
}

fs.writeFileSync(path.resolve(__dirname, 'clean_electro_part1.mjs'), `export const ELECTRO_PART1_OVERRIDES = ${JSON.stringify(updatedPart1, null, 2)};\n`);
console.log('Successfully updated clean_electro_part1.mjs with all 100 pristine questions!');
