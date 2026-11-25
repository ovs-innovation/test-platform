import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const P3_CORRECTIONS_201_250 = {
  201: {
    text: "64 identical drops each charged up to a potential of $10\\text{ mV}$ are combined to form a bigger drop. The potential of the bigger drop will be ___ mV.",
    options: []
  },
  202: {
    text: "A thin infinite sheet charge and an infinite line charge of respective charge densities $+\\sigma$ and $+\\lambda$ are placed parallel at $5\\text{ m}$ distance from each other. Points $P$ and $Q$ are at $\\frac{3}{\\pi}\\text{ m}$ and $\\frac{4}{\\pi}\\text{ m}$ perpendicular distances from line charge towards sheet charge, respectively. $E_P$ and $E_Q$ are the magnitudes of resultant electric field intensities at point $P$ and $Q$ respectively. If $\\frac{E_P}{E_Q} = \\frac{4}{a}$ for $2|\\sigma| = |\\lambda|$, then the value of $a$ is:",
    options: []
  },
  203: {
    text: "Two charges of each magnitude $0.01\\text{ C}$ and separated by a distance of $0.4\\text{ mm}$ constitute an electric dipole. If the dipole is placed in a uniform electric field $\\vec{E}$ of $10\\text{ dyne}\\cdot\\text{C}^{-1}$ making $30^\\circ$ angle with $\\vec{E}$, the magnitude of torque acting on dipole is:",
    options: [
      "4.0 \\times 10^{-11}\\text{ N m}",
      "1.0 \\times 10^{-11}\\text{ N m}",
      "1.5 \\times 10^{-11}\\text{ N m}",
      "2.0 \\times 10^{-11}\\text{ N m}"
    ]
  },
  204: {
    text: "Three point charges $q$, $-2q$ and $2q$ are placed on $x$-axis at distance $x = 0$, $x = \\frac{3}{4}R$ and $x = R$ respectively from origin as shown. If $q = 2 \\times 10^{-7}\\text{ C}$ and $R = 2\\text{ cm}$, the magnitude of net force experienced by the charge $-2q$ is ___ N.",
    options: []
  },
  205: {
    text: "A $10\\mu\\text{C}$ charge is divided into two parts and placed at $1\\text{ cm}$ distance so that the repulsive force between them is maximum. The charges of the two parts are:",
    options: [
      "7\\mu\\text{C}, 3\\mu\\text{C}",
      "8\\mu\\text{C}, 2\\mu\\text{C}",
      "5\\mu\\text{C}, 5\\mu\\text{C}",
      "9\\mu\\text{C}, 1\\mu\\text{C}"
    ]
  },
  206: {
    text: "The electric field due to a short electric dipole at a large distance ($r$) from center of dipole on the equatorial plane varies with distance as:",
    options: [
      "r^3",
      "\\frac{1}{r}",
      "\\frac{1}{r^3}",
      "\\frac{1}{r^2}"
    ]
  },
  207: {
    text: "A thin metallic wire having cross sectional area of $10^{-4}\\text{ m}^2$ is used to make a ring of radius $30\\text{ cm}$. A positive charge of $2\\text{ C}$ is uniformly distributed over the ring, while another positive charge of $30\\mu\\text{C}$ is kept at the centre of the ring. The tension in the ring is ___ N; provided that the ring does not get deformed (neglect the influence of gravity).",
    options: []
  },
  208: {
    text: "An electric charge $10^{-6}\\text{ C}$ is placed at origin $(0,0)\\text{ m}$ of $X-Y$ coordinate system. Two points $P$ and $Q$ are situated at $(\\sqrt{3}, \\sqrt{3})\\text{ m}$ and $(\\sqrt{6}, 0)\\text{ m}$ respectively. The potential difference between the points $P$ and $Q$ will be:",
    options: [
      "3\\text{ V}",
      "\\sqrt{6}\\text{ V}",
      "\\text{zero}",
      "\\sqrt{3}\\text{ V}"
    ]
  },
  209: {
    text: "Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A) : Work done by electric field on moving a positive charge on an equipotential surface is always zero.\nReason (R) : Electric lines of forces are always perpendicular to equipotential surfaces.\nIn the light of the above statements, choose the most appropriate answer from the options given below :",
    options: [
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
      "(A) is correct but (R) is not correct",
      "(A) is not correct but (R) is correct",
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)"
    ]
  },
  210: {
    text: "The electric potential at the surface of an atomic nucleus ($Z = 50$) of radius $9 \\times 10^{-13}\\text{ cm}$ is $a \\times 10^6\\text{ V}$. What is the value of $a$?",
    options: []
  },
  211: {
    text: "Two charges of $-4\\mu\\text{C}$ and $+4\\mu\\text{C}$ are placed at the points $A(1,0,4)\\text{ m}$ and $B(2,-1,5)\\text{ m}$ located in an electric field $\\vec{E} = 0.20\\hat{i}\\text{ V/cm}$. The magnitude of the torque acting on the dipole is $8\\sqrt{a} \\times 10^{-5}\\text{ N m}$, where $a = ___$.",
    options: []
  },
  212: {
    text: "An electron is moving under the influence of the electric field of a uniformly charged infinite plane sheet $S$ having surface charge density $+\\sigma$. The electron at $t = 0$ is at a distance of $1\\text{ m}$ from $S$ and has a speed of $1\\text{ m/s}$. The maximum value of $\\sigma$, if the electron strikes $S$ at $t = 1\\text{ s}$ is $\\alpha \\left[\\frac{m \\varepsilon_0}{e}\\right]\\text{ C/m}^2$. The value of $\\alpha$ is:",
    options: []
  },
  213: {
    text: "Match List I with List II:\nList I:\nA. $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 i_c + \\mu_0 \\varepsilon_0 \\frac{d\\phi_E}{dt}$\nB. $\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\phi_B}{dt}$\nC. $\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q}{\\varepsilon_0}$\nD. $\\oint \\vec{B} \\cdot d\\vec{A} = 0$\nList II:\nI. Gauss' law for electricity\nII. Gauss' law for magnetism\nIII. Faraday law\nIV. Ampere-Maxwell law\nChoose the correct answer from the options given below:",
    options: [
      "A-I, B-II, C-III, D-IV",
      "A-II, B-IV, C-I, D-III",
      "A-IV, B-III, C-I, D-II",
      "A-IV, B-II, C-III, D-I"
    ]
  },
  214: {
    text: "Two charges of $5Q$ and $-2Q$ are situated at the points $(3a, 0)$ and $(5a, 0)$ respectively. The electric flux through a sphere of radius $4a$ having centre at origin is:",
    options: [
      "\\frac{5Q}{2\\varepsilon_0}",
      "\\frac{5Q}{\\varepsilon_0}",
      "\\frac{7Q}{\\varepsilon_0}",
      "\\frac{3Q}{\\varepsilon_0}"
    ]
  },
  215: {
    text: "An electric field is given by $(6\\hat{i} + 5\\hat{j} + 3\\hat{k})\\text{ N/C}$. The electric flux through a surface area $30\\hat{i}\\text{ m}^2$ lying in $YZ$-plane (in SI units) is:",
    options: [
      "90",
      "150",
      "180",
      "60"
    ]
  },
  216: {
    text: "The electrostatic potential due to an electric dipole at a distance $r$ varies as:",
    options: [
      "r",
      "\\frac{1}{r^2}",
      "\\frac{1}{r^3}",
      "\\frac{1}{r}"
    ]
  },
  217: {
    text: "Two identical charged spheres are suspended by strings of equal lengths. The strings make an angle of $37^\\circ$ with each other. When suspended in a liquid of density $0.7\\text{ g/cm}^3$, the angle remains same. If density of material of the sphere is $1.4\\text{ g/cm}^3$, the dielectric constant of the liquid is:",
    options: []
  },
  218: {
    text: "Two charges $q$ and $3q$ are separated by a distance $r$ in air. At a distance $x$ from charge $q$, the resultant electric field is zero. The value of $x$ is:",
    options: [
      "(1 + \\sqrt{3})r",
      "\\frac{r}{3(1 + \\sqrt{3})}",
      "\\frac{r}{1 + \\sqrt{3}}",
      "(1 - \\sqrt{3})r"
    ]
  },
  219: {
    text: "Force between two point charges $q_1$ and $q_2$ placed in vacuum at $r\\text{ cm}$ apart is $F$. Force between them when placed in a medium having dielectric $K = 5$ at $r/5\\text{ cm}$ apart will be:",
    options: [
      "F",
      "5F",
      "\\frac{F}{5}",
      "25F"
    ]
  },
  220: {
    text: "The distance between charges $+q$ and $-q$ is $2l$ and between $+2q$ and $-2q$ is $4l$. The electrostatic potential at point $P$ at a distance $r$ from centre $O$ is $-a \\left[\\frac{ql}{r^2}\\right] \\times 10^9\\text{ V}$, where the value of $a$ is:",
    options: []
  },
  221: {
    text: "Two identical charged spheres are suspended by strings of equal lengths. The strings make an angle $\\theta$ with each other. When suspended in water the angle remains the same. If density of the material of the sphere is $1.5\\text{ g/cc}$, the dielectric constant of water will be (Take density of water = $1\\text{ g/cc}$):",
    options: []
  },
  222: {
    text: "Suppose a uniformly charged wall provides a uniform electric field of $2 \\times 10^4\\text{ N/C}$ normally. A charged particle of mass $2\\text{ g}$ being suspended through a silk thread of length $20\\text{ cm}$ and remains stayed at a distance of $10\\text{ cm}$ from the wall. Then the charge on the particle will be $\\frac{1}{\\sqrt{x}}\\mu\\text{C}$ where $x = ___$ (use $g = 10\\text{ m/s}^2$).",
    options: []
  },
  223: {
    text: "Two hollow concentric cubes $C_1$ and $C_2$ enclose charges $2Q$ and $3Q$ respectively as shown in figure. The ratio of electric flux passing through $C_1$ and $C_2$ is:",
    options: []
  },
  224: {
    text: "An infinite plane sheet of charge having uniform surface charge density $+\\sigma_s\\text{ C/m}^2$ is placed on $x-y$ plane. Another infinitely long line charge having uniform linear charge density $+\\lambda\\text{ C/m}$ is placed at $z = 4\\text{ m}$ plane and parallel to $y$-axis. If the magnitude values $|\\sigma_s| = 2|\\lambda|$ then at point $(0,0,2)$, the ratio of magnitudes of electric field values due to sheet charge to that of line charge is $\\pi \\sqrt{n} : 1$. The value of $n$ is:",
    options: []
  },
  225: {
    text: "A charge $q$ is placed at the center of one of the surfaces of a cube. The flux linked with the cube is:",
    options: [
      "\\frac{q}{2\\varepsilon_0}",
      "\\frac{q}{\\varepsilon_0}",
      "\\text{zero}",
      "\\frac{q}{6\\varepsilon_0}"
    ]
  },
  226: {
    text: "The vehicles carrying inflammable fluids usually have metallic chains touching the ground:",
    options: [
      "To protect tyres from catching dirt from ground",
      "To alert other vehicles",
      "It is a custom",
      "To conduct excess charge due to air friction to ground and prevent sparking"
    ]
  },
  227: {
    text: "The electric field at point $P$ due to an electric dipole is $E$. The electric field at point $R$ on equatorial line will be $E / x$. The value of $x$ is:",
    options: []
  },
  228: {
    text: "Three infinitely long charged thin sheets are placed as shown in figure. The magnitude of electric field at the point $P$ is $\\frac{2\\sigma}{x\\varepsilon_0}$. The value of $x$ is:",
    options: []
  },
  229: {
    text: "$\\sigma$ is the uniform surface charge density of a thin spherical shell of radius $R$. The electric field at any point on the surface of the spherical shell is:",
    options: [
      "\\frac{\\sigma}{2\\varepsilon_0}",
      "\\frac{\\sigma}{\\varepsilon_0}",
      "\\frac{\\sigma}{4\\varepsilon_0}",
      "\\sigma \\varepsilon_0"
    ]
  },
  230: {
    text: "Two identical conducting spheres $P$ and $S$ with charge $Q$ on each, repel each other with a force $16\\text{ N}$. A third identical uncharged conducting sphere $R$ is successively brought in contact with the two spheres. The new force of repulsion between $P$ and $S$ is:",
    options: [
      "4\\text{ N}",
      "6\\text{ N}",
      "8\\text{ N}",
      "2\\text{ N}"
    ]
  },
  231: {
    text: "Two charged conducting spheres of radii $a$ and $b$ are connected to each other by a conducting wire. The ratio of charges of the two spheres respectively is:",
    options: [
      "a / b",
      "b / a",
      "a^2 / b^2",
      "b^2 / a^2"
    ]
  },
  232: {
    text: "An electric field $\\vec{E} = 2x\\hat{i} + 5\\hat{j} + 5\\hat{k}$ passes through the surface of $4\\text{ m}^2$ area having unit vector $\\hat{n} = \\frac{1}{\\sqrt{2}}(\\hat{j} + \\hat{k})$. The electric flux for that surface is ___ V m.",
    options: []
  },
  233: {
    text: "If the net electric field at point $P$ along $Y$-axis is zero, then the ratio of $|q_1/q_2|$ is $25/x$, where $x = ___$.",
    options: []
  },
  234: {
    text: "At the centre of a half ring of radius $R = 10\\text{ cm}$ and linear charge density $4\\text{ nC/m}^2$, the potential is $x\\pi\\text{ V}$. The value of $x$ is:",
    options: []
  },
  235: {
    text: "An electric field $\\vec{E} = (2x\\hat{i})\\text{ N/C}$ exists in space. A cube of side $2\\text{ m}$ is placed in the space as per figure given below. The electric flux through the cube is ___ $\\text{N m}^2/\\text{C}$.",
    options: []
  },
  236: {
    text: "Five charges $+q, +5q, -2q, +3q$ and $-4q$ are situated as shown in the figure. The electric flux due to this configuration through the surface $S$ is $\\frac{x q}{\\varepsilon_0}$. The value of $x$ is:",
    options: []
  },
  237: {
    text: "An electron is made to enter symmetrically between two parallel and equally but oppositely charged metal plates, each of $10\\text{ cm}$ length. The electron emerges out of the electric field region with a horizontal component of velocity $10^6\\text{ m/s}$. If the magnitude of the electric field between the plates is $9.1\\text{ V/cm}$, then the vertical component of velocity of electron is (mass of electron = $9.1 \\times 10^{-31}\\text{ kg}$ and charge of electron = $1.6 \\times 10^{-19}\\text{ C}$):",
    options: [
      "0",
      "1 \\times 10^6\\text{ m/s}",
      "1.6 \\times 10^6\\text{ m/s}",
      "16 \\times 10^6\\text{ m/s}"
    ]
  },
  238: {
    text: "A line charge of length $a/2$ is kept at the center of an edge $BC$ of a cube $ABCDEFGH$ having edge length $a$ as shown in the figure. If the density of line charge is $\\lambda\\text{ C}$ per unit length, then the total electric flux through all the faces of the cube will be (Take $\\varepsilon_0$ as the free space permittivity):",
    options: [
      "\\frac{2\\lambda a}{\\varepsilon_0}",
      "\\frac{\\lambda a}{2\\varepsilon_0}",
      "\\frac{2\\lambda a}{3\\varepsilon_0}",
      "\\frac{\\lambda a}{8\\varepsilon_0}"
    ]
  },
  239: {
    text: "For a short dipole placed at origin $O$, the dipole moment $\\vec{P}$ is along $z$-axis, as shown in the figure. If the electric potential and electric field at $A$ are $V_A$ and $E_A$ respectively, then the correct combination of the electric potential and electric field, respectively, at point $B$ on the $y$-axis is given by:",
    options: [
      "V_A\\text{ and } E_A",
      "\\text{zero and } \\frac{E_A}{2}",
      "\\text{zero and } \\frac{E_A}{4}",
      "V_A\\text{ and } \\frac{E_A}{2}"
    ]
  },
  240: {
    text: "A positive ion $A$ and a negative ion $B$ has charges $6.67 \\times 10^{-9}\\text{ C}$ and $9.6 \\times 10^{-10}\\text{ C}$, and masses $19.2 \\times 10^{-20}\\text{ kg}$ and $9 \\times 10^{-20}\\text{ kg}$ respectively. At an instant, the ions are separated by a certain distance $r$. At that instant the ratio of the magnitudes of electrostatic force to gravitational force is $P \\times 10^{30}$, where the value of $10P$ is:",
    options: []
  },
  241: {
    text: "A point particle of charge $Q$ is located at $P$ along the axis of an electric dipole 1 at a distance $r$ as shown in the figure. The point $P$ is also on the equatorial plane of a second electric dipole 2 at a distance $r$. The dipoles are made of opposite charge $q$ separated by a distance $2a$. For the charge particle at $P$ not to experience any net force, which of the following correctly describes the situation?",
    options: [
      "r/a \\approx 1",
      "r/a \\approx 2",
      "r/a \\approx 4",
      "r/a \\approx 3"
    ]
  },
  242: {
    text: "Match List I with List II:\nList I:\n(A) Inside uniformly charged spherical shell\n(B) For uniformly charged infinite plate\n(C) Outside of spherical shell\n(D) Between two oppositely charged plates\nList II:\nI. $E = \\frac{\\sigma}{\\varepsilon_0}$\nII. $E = \\frac{\\sigma}{2\\varepsilon_0}$\nIII. $E = 0$\nIV. $E = \\frac{Q}{4\\pi\\varepsilon_0 r^2}$\nChoose the correct answer from the options given below:",
    options: [
      "(A)-(III), (B)-(II), (C)-(IV), (D)-(I)",
      "(A)-(IV), (B)-(II), (C)-(III), (D)-(I)",
      "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)",
      "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)"
    ]
  },
  243: {
    text: "Two point charges $-4\\mu\\text{C}$ and $4\\mu\\text{C}$, constituting an electric dipole, are placed at $(-9, 0, 0)\\text{ cm}$ and $(9, 0, 0)\\text{ cm}$ in a uniform electric field of strength $10^4\\text{ N/C}$. The work done on the dipole in rotating it from the equilibrium through $180^\\circ$ is:",
    options: [
      "18.4\\text{ mJ}",
      "14.4\\text{ mJ}",
      "12.4\\text{ mJ}",
      "16.4\\text{ mJ}"
    ]
  },
  244: {
    text: "A square loop of sides $a = 1\\text{ m}$ is held normally in front of a point charge $q = 1\\text{ C}$. The flux of the electric field through the shaded region is $\\frac{q}{p \\varepsilon_0}$, where the value of $p$ is:",
    options: []
  },
  245: {
    text: "A small uncharged conducting sphere is placed in contact with an identical sphere but having $4 \\times 10^{-6}\\text{ C}$ charge and then removed to a distance such that the force of repulsion between them is $9 \\times 10^{-2}\\text{ N}$. The distance between them is (Take $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ SI units}$):",
    options: [
      "3\\text{ cm}",
      "2\\text{ cm}",
      "4\\text{ cm}",
      "1\\text{ cm}"
    ]
  },
  246: {
    text: "In the first configuration (1) as shown in the figure, four identical charges ($q$) are kept at the corners $A, B, C$ and $D$ of square of side length $a$. In the second configuration (2), the same charges are shifted to mid points $G, E, H$ and $F$ of the square. If $K = \\frac{1}{4\\pi\\varepsilon_0}$, the difference between the potential energies of configuration (2) and (1) is given by:",
    options: [
      "\\frac{Kq^2}{a}(4 - 2\\sqrt{2})",
      "\\frac{Kq^2}{a}(3 - \\sqrt{2})",
      "\\frac{Kq^2}{a}(2\\sqrt{2} - 1)",
      "\\frac{Kq^2}{a}(3\\sqrt{2} - 2)"
    ]
  },
  247: {
    text: "A particle of mass $m$ and charge $q$ is fastened to one end $A$ of a massless string having equilibrium length $l$, whose other end is fixed at point $O$. The whole system is placed on a frictionless horizontal plane and is initially at rest. If uniform electric field is switched on along the direction as shown in figure, then the speed of the particle when it crosses the $x$-axis is:",
    options: [
      "\\sqrt{\\frac{qEl}{2m}}",
      "\\sqrt{\\frac{2qEl}{m}}",
      "\\sqrt{\\frac{qEl}{m}}",
      "\\sqrt{\\frac{3qEl}{2m}}"
    ]
  },
  248: {
    text: "Three infinitely long wires with linear charge density $\\lambda$ are placed along the $x$-axis, $y$-axis and $z$-axis respectively. Which of the following denotes an equipotential surface?",
    options: [
      "x^2 + y^2 + z^2 = \\text{constant}",
      "xy + yz + zx = \\text{constant}",
      "(x^2 + y^2)(y^2 + z^2)(z^2 + x^2) = \\text{constant}",
      "(x + y)(y + z)(z + x) = \\text{constant}"
    ]
  },
  249: {
    text: "An electric dipole of dipole moment $6 \\times 10^{-6}\\text{ C m}$ is placed in uniform electric field of magnitude $10^6\\text{ V/m}$. Initially, the dipole moment is parallel to electric field. The work that needs to be done on the dipole to make its dipole moment opposite to the field, will be ___ J.",
    options: []
  },
  250: {
    text: "Match List I with List II:\nList I:\n(A) Electric field inside ($r < R$) of a uniformly charged spherical shell\n(B) Electric field at distance $r > 0$ from an infinite plane sheet\n(C) Electric field outside ($r > R$) of a uniformly charged spherical shell\n(D) Electric field between 2 oppositely charged infinite parallel sheets\nList II:\nI. $\\frac{\\sigma}{\\varepsilon_0}$\nII. $\\frac{\\sigma}{2\\varepsilon_0}$\nIII. $0$\nIV. $\\frac{Q}{4\\pi\\varepsilon_0 r^2}$\nChoose the correct answer from the options given below:",
    options: [
      "(A)-(III), (B)-(II), (C)-(IV), (D)-(I)",
      "(A)-(IV), (B)-(II), (C)-(I), (D)-(III)",
      "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
      "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)"
    ]
  }
};
