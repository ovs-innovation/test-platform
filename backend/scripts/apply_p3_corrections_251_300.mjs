import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const P3_CORRECTIONS_251_300 = {
  251: {
    text: "An electric dipole of mass $m$, charge $q$, and length $l$ is placed in a uniform electric field $\\vec{E} = E\\hat{j}$. When the dipole is rotated slightly from its equilibrium position and released, the time period of its oscillations will be:",
    options: [
      "2\\pi\\sqrt{\\frac{ml}{2qE}}",
      "2\\pi\\sqrt{\\frac{2ml}{qE}}",
      "\\pi\\sqrt{\\frac{2ml}{qE}}",
      "2\\pi\\sqrt{\\frac{ml}{6qE}}"
    ]
  },
  252: {
    text: "Match List - I with List - II.\nList - I:\n(A) Electric field inside (distance $r > 0$ from center) of a uniformly charged spherical shell with surface charge density $\\sigma$, and radius $R$.\n(B) Electric field at distance $r > 0$ from a uniformly charged infinite plane sheet with surface charge density $\\sigma$.\n(C) Electric field outside (distance $r > 0$ from center) of a uniformly charged spherical shell with surface charge density $\\sigma$, and radius $R$.\n(D) Electric field between 2 oppositely charged infinite plane parallel sheets with uniform surface charge density $\\sigma$.\nList - II:\nI. $\\frac{\\sigma}{\\varepsilon_0}$\nII. $\\frac{\\sigma}{2\\varepsilon_0}$\nIII. $0$\nIV. $\\frac{\\sigma R^2}{\\varepsilon_0 r^2}$\nChoose the correct answer from the options given below :",
    options: [
      "(A)-(III), (B)-(II), (C)-(IV), (D)-(I)",
      "(A)-(IV), (B)-(II), (C)-(III), (D)-(I)",
      "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
      "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)"
    ]
  },
  253: {
    text: "An electric dipole is placed at a distance of $2\\text{ cm}$ from an infinite plane sheet having positive charge density $\\sigma$. Choose the correct option from the following:",
    options: [
      "Potential energy and torque both are maximum.",
      "Torque on dipole is zero and net force is directed away from the sheet.",
      "Torque on dipole is zero and net force acts towards the sheet.",
      "Potential energy of dipole is minimum and torque is zero."
    ]
  },
  254: {
    text: "A point charge causes an electric flux of $-2 \\times 10^4\\text{ N m}^2\\text{/C}$ to pass through a spherical Gaussian surface of $8.0\\text{ cm}$ radius, centred on the charge. The value of the point charge is (Given $\\varepsilon_0 = 8.85 \\times 10^{-12}\\text{ C}^2/\\text{N m}^2$):",
    options: [
      "15.7 \\times 10^{-8}\\text{ C}",
      "17.7 \\times 10^{-8}\\text{ C}",
      "-15.7 \\times 10^{-8}\\text{ C}",
      "-17.7 \\times 10^{-8}\\text{ C}"
    ]
  },
  255: {
    text: "A small bob of mass $100\\text{ mg}$ and charge $+10\\mu\\text{C}$ is connected to an insulating string of length $1\\text{ m}$. It is brought near to an infinitely long nonconducting sheet of charge density $\\sigma$ as shown in figure. If string subtends an angle of $45^\\circ$ with the sheet at equilibrium the charge density of sheet will be (Given $\\varepsilon_0 = 8.85 \\times 10^{-12}\\text{ C}^2/\\text{N m}^2$ and $g = 10\\text{ m/s}^2$):",
    options: [
      "0.885\\text{ nC/m}^2",
      "17.7\\text{ nC/m}^2",
      "8.85\\text{ nC/m}^2",
      "1.77\\text{ nC/m}^2"
    ]
  },
  256: {
    text: "Consider two infinitely large plane parallel conducting plates as shown below. The plates are uniformly charged with a surface charge density $+\\sigma$ and $-2\\sigma$. The force experienced by a point charge $+q$ placed at the mid point between two plates will be:",
    options: [
      "\\frac{\\sigma q}{2\\varepsilon_0}",
      "\\frac{3\\sigma q}{2\\varepsilon_0}",
      "\\frac{3\\sigma q}{\\varepsilon_0}",
      "\\frac{\\sigma q}{\\varepsilon_0}"
    ]
  },
  257: {
    text: "A point charge $+q$ is placed at the origin. A second point charge $+9q$ is placed at $(d, 0, 0)$ in Cartesian coordinate system. The point in between them where the electric field vanishes is:",
    options: [
      "(4d/3, 0, 0)",
      "(d/4, 0, 0)",
      "(3d/4, 0, 0)",
      "(d/3, 0, 0)"
    ]
  },
  258: {
    text: "Consider a circular loop that is uniformly charged and has a radius $a\\sqrt{2}$. Find the position along the positive $z$-axis of the cartesian coordinate system where the electric field is maximum if the ring was assumed to be placed in $xy$-plane at the origin:",
    options: [
      "a / \\sqrt{2}",
      "a / 2",
      "$a$",
      "2a"
    ]
  },
  259: {
    text: "Two large plane parallel conducting plates are kept $10\\text{ cm}$ apart as shown in figure. The potential difference between them is $V$. The potential difference between the points $A$ and $B$ (shown in the figure) is:",
    options: [
      "\\frac{V}{10}",
      "\\frac{V}{2}",
      "\\frac{2V}{5}",
      "\\frac{V}{5}"
    ]
  },
  260: {
    text: "Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A) : Net dipole moment of a polar linear isotropic dielectric substance is not zero even in the absence of an external electric field.\nReason (R) : In absence of an external electric field, the different permanent dipoles of a polar dielectric substance are oriented in random directions.\nIn the light of the above statements, choose the most appropriate answer from the options given below :",
    options: [
      "(A) is correct but (R) is not correct",
      "Both (A) and (R) are correct but (R) is not the correct explanation of (A)",
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "(A) is not correct but (R) is correct"
    ]
  },
  261: {
    text: "The electrostatic potential on the surface of uniformly charged spherical shell of radius $R = 10\\text{ cm}$ is $120\\text{ V}$. The potential at the centre of shell, at a distance $r = 5\\text{ cm}$ from centre, and at a distance $r = 15\\text{ cm}$ from the centre of the shell respectively, are:",
    options: [
      "120\\text{ V}, 120\\text{ V}, 80\\text{ V}",
      "40\\text{ V}, 40\\text{ V}, 80\\text{ V}",
      "0\\text{ V}, 0\\text{ V}, 80\\text{ V}",
      "0\\text{ V}, 120\\text{ V}, 40\\text{ V}"
    ]
  },
  262: {
    text: "Two infinite identical charged sheets and a charged spherical body of charge density $\\rho$ are arranged as shown in figure. Then the correct relation between the electrical fields at $A, B, C$ and $D$ points is:",
    options: [
      "E_A = E_B, E_C = E_D",
      "E_A > E_B, E_C = E_D",
      "E_C \\ne E_D, E_A > E_B",
      "|E_A| = |E_B|, E_C > E_D"
    ]
  },
  263: {
    text: "Two small spherical balls of mass $10\\text{ g}$ each with charges $-2\\mu\\text{C}$ and $2\\mu\\text{C}$, are attached to two ends of very light rigid rod of length $20\\text{ cm}$. The arrangement is now placed near an infinite nonconducting charge sheet with uniform charge density of $100\\mu\\text{C/m}^2$ such that length of rod makes an angle of $30^\\circ$ with electric field generated by charge sheet. Net torque acting on the rod is (Take $\\varepsilon_0 = 8.85 \\times 10^{-12}\\text{ C}^2/\\text{N m}^2$):",
    options: [
      "12\\text{ N m}",
      "1.12\\text{ N m}",
      "2.24\\text{ N m}",
      "11.2\\text{ N m}"
    ]
  },
  264: {
    text: "A metallic ring is uniformly charged as shown in figure. $AC$ and $BD$ are two mutually perpendicular diameters. Electric field due to arc $AB$ at $O$ is $E$ in magnitude. What would be the magnitude of electric field at $O$ due to arc $ABC$?",
    options: [
      "2E",
      "\\sqrt{2}E",
      "E / \\sqrt{2}",
      "\\text{Zero}"
    ]
  },
  265: {
    text: "Two charges $q_1$ and $q_2$ are separated by a distance of $30\\text{ cm}$. A third charge $q_3$ initially at $C$ as shown in the figure, is moved along the circular path of radius $40\\text{ cm}$ from $C$ to $D$. If the difference in potential energy due to movement of $q_3$ from $C$ to $D$ is given by $\\frac{q_3 K}{4\\pi\\varepsilon_0}$, the value of $K$ is:",
    options: [
      "8q_1",
      "9q_1",
      "4q_1",
      "2q_1"
    ]
  },
  266: {
    text: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A) : The outer body of an aircraft is made of metal which protects persons sitting inside from lightning-strikes.\nReason (R) : The electric field inside the cavity enclosed by a conductor is zero.\nIn the light of the above statements, choose the most appropriate answer from the options given below :",
    options: [
      "Both (A) and (R) are correct and (R) is the correct explanation of (A)",
      "(A) is correct but (R) is not correct",
      "Both (A) and (R) are correct but (R) is not correct explanation of (A)",
      "(A) is not correct but (R) is correct"
    ]
  },
  267: {
    text: "A dipole with two electric charges of $2\\mu\\text{C}$ magnitude each, with separation distance $0.5\\text{ mm}$, is placed between the plates of a capacitor such that its axis is parallel to an electric field established between the plates when a potential difference of $5\\text{ V}$ is applied. Separation between the plates is $0.5\\text{ mm}$. If the dipole is rotated by $30^\\circ$ from the axis, it tends to realign in the direction due to a torque. The value of torque is:",
    options: [
      "5 \\times 10^{-5}\\text{ N m}",
      "5 \\times 10^{-4}\\text{ N m}",
      "2.5 \\times 10^{-5}\\text{ N m}",
      "5.5 \\times 10^{-5}\\text{ N m}"
    ]
  },
  268: {
    text: "The electric field in a region is given by $\\vec{E} = (2\\hat{i} + 4\\hat{j} + 6\\hat{k}) \\times 10^3\\text{ N/C}$. The flux of the field through a rectangular surface parallel to $x-z$ plane is $6.0\\text{ N m}^2/\\text{C}$. The area of the surface is ___ $\\text{cm}^2$.",
    options: []
  },
  269: {
    text: "Two metal spheres of radius $R$ and $3R$ have same surface charge density $\\sigma$. If they are brought in contact and then separated, the surface charge density on smaller and bigger sphere becomes $\\sigma_1$ and $\\sigma_2$ respectively. The ratio $\\sigma_1 / \\sigma_2$ is:",
    options: [
      "1 / 3",
      "9 / 4",
      "1",
      "3"
    ]
  },
  270: {
    text: "An electron is released from rest near an infinite non-conducting sheet of uniform charge density $-\\sigma$. The rate of change of de-Broglie wavelength associated with the electron varies inversely as $n^{\\text{th}}$ power of time. The numerical value of $n$ is:",
    options: []
  },
  271: {
    text: "An electric charge is transferred to an irregular metallic disk as shown in figure. If $\\sigma_1, \\sigma_2, \\sigma_3$ and $\\sigma_4$ are charge densities at given points then, choose the correct answer from the options given below:\n(A) $\\sigma_1 > \\sigma_4, \\sigma_3 = \\sigma_2$\n(B) $\\sigma_1 > \\sigma_4, \\sigma_3 > \\sigma_2$\n(C) $\\sigma_1 > \\sigma_2 > \\sigma_3 = \\sigma_4$\n(D) $\\sigma_1 < \\sigma_2 < \\sigma_3 = \\sigma_4$\n(E) $\\sigma_1 = \\sigma_2 = \\sigma_3 = \\sigma_4$",
    options: [
      "A, B and C Only",
      "A and C Only",
      "D and E Only",
      "B and C Only"
    ]
  },
  272: {
    text: "Given below are two statements : one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A : Work done in moving a test charge between two points inside a uniformly charged spherical shell is zero, no matter which path is chosen.\nReason R : Electrostatic potential inside a uniformly charged spherical shell is constant and is same as that on the surface of the shell.\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "A is true but R is false",
      "Both A and R are true and R is the correct explanation of A",
      "A is false but R is true",
      "Both A and R are true but R is NOT the correct explanation of A"
    ]
  },
  273: {
    text: "An infinitely long wire has uniform linear charge density $\\lambda = 2\\text{ nC/m}$. The net flux through a Gaussian cube of side length $\\sqrt{3}\\text{ cm}$, if the wire passes through any two corners of the cube that are maximally displaced from each other, would be $x\\pi\\text{ N m}^2/\\text{C}$, where $x$ is (use $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ SI units}$):",
    options: [
      "7.20",
      "4.4",
      "6.48",
      "2.16"
    ]
  },
  274: {
    text: "A point charge of $10^{-8}\\text{ C}$ is placed at origin. The work done in moving a point charge $2\\mu\\text{C}$ from point $A(4,4,2)\\text{ m}$ to $B(2,2,1)\\text{ m}$ is ___ J ($\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ SI units}$):",
    options: [
      "4.5 \\times 10^{-5}",
      "1.5 \\times 10^{-5}",
      "0",
      "3.0 \\times 10^{-5}"
    ]
  },
  275: {
    text: "Consider two identical metallic spheres of radius $R$ each having charge $Q$ and mass $m$. Their centers have an initial separation of $4R$. Both the spheres are given an initial speed of $u$ towards each other. The minimum value of $u$, so that they can just touch each other is (Take $k = \\frac{1}{4\\pi\\varepsilon_0}$ and assume $kQ^2 > Gm^2$):",
    options: [
      "\\sqrt{\\frac{Gm^2}{m}(1 - \\frac{kQ^2}{Gm^2})}",
      "\\sqrt{\\frac{kQ^2}{2mR}(1 - \\frac{Gm^2}{kQ^2})}",
      "\\sqrt{\\frac{Gm^2}{4mR}(1 - \\frac{kQ^2}{Gm^2})}",
      "\\sqrt{\\frac{kQ^2}{4mR}(1 + \\frac{Gm^2}{kQ^2})}"
    ]
  },
  276: {
    text: "A simple pendulum has a bob with mass $m$ and charge $q$. The pendulum string has negligible mass. When a uniform and horizontal electric field $E$ is applied, the tension in the string changes. The final tension in the string, when pendulum attains an equilibrium position is ($g$: acceleration due to gravity):",
    options: [
      "\\sqrt{m^2g^2 + q^2E^2}",
      "mg + qE",
      "mg - qE",
      "\\sqrt{m^2g^2 - q^2E^2}"
    ]
  },
  277: {
    text: "Six point charges are kept $60^\\circ$ apart from each other on the circumference of a circle of radius $R$ as shown in figure. The net electric field at the center of the circle is ($\\varepsilon_0$ is permittivity of free space):",
    options: [
      "\\frac{Q}{\\pi\\varepsilon_0 R^2}(\\sqrt{3}\\hat{i} - \\hat{j})",
      "\\frac{Q}{2\\pi\\varepsilon_0 R^2}(\\hat{i} + \\sqrt{3}\\hat{j})",
      "\\frac{Q}{\\pi\\varepsilon_0 R^2}(\\hat{i} - \\sqrt{3}\\hat{j})",
      "-\\frac{Q}{\\pi\\varepsilon_0 R^2}(\\sqrt{3}\\hat{i} - \\hat{j})"
    ]
  },
  278: {
    text: "Electric field in a region is given by $\\vec{E} = Ax\\hat{i} + By\\hat{j}$, where $A = 10\\text{ V/m}^2$ and $B = 5\\text{ V/m}^2$. If the electric potential at a point $(10, 20)$ is $500\\text{ V}$, then the electric potential at origin is ___ V.",
    options: [
      "0",
      "2000",
      "500",
      "1000"
    ]
  },
  279: {
    text: "Three small identical bubbles of water having same charge on each coalesce to form a bigger bubble. Then the ratio of the potentials on one initial bubble and that on the resultant bigger bubble is:",
    options: [
      "3^{2/3} : 1",
      "9^{1/3} : 1",
      "1 : 3^{2/3}",
      "1 : 9^{1/3}"
    ]
  },
  280: {
    text: "Five positive charges each having charge $q$ are placed at the vertices of a pentagon as shown in the figure. The electric potential ($V$) and the electric field ($E$) at the center $O$ of the pentagon due to these five positive charges are:",
    options: [
      "V = 0\\text{ and } E = \\frac{5q}{4\\pi\\varepsilon_0 r^2}",
      "V = \\frac{5q}{4\\pi\\varepsilon_0 r}\\text{ and } E = 0",
      "V = \\frac{q}{4\\pi\\varepsilon_0 r}\\text{ and } E = 0",
      "V = \\frac{5q}{4\\pi\\varepsilon_0 r}\\text{ and } E = \\frac{5q}{4\\pi\\varepsilon_0 r^2}"
    ]
  },
  281: {
    text: "Two point charges $2q$ and $q$ are placed at vertex $A$ and centre of face $CDEF$ of the cube as shown in figure. The electric flux passing through the cube is:",
    options: [
      "\\frac{3q}{4\\varepsilon_0}",
      "\\frac{3q}{4\\varepsilon_0}",
      "\\frac{q}{2\\varepsilon_0}",
      "\\frac{3q}{\\varepsilon_0}"
    ]
  },
  282: {
    text: "Two charges $7\\mu\\text{C}$ and $-2\\mu\\text{C}$ are placed at $(-9, 0, 0)\\text{ cm}$ and $(9, 0, 0)\\text{ cm}$ respectively in an external field $E = A / r^2$, where $A = 9 \\times 10^5\\text{ N/C}\\cdot\\text{m}^2$. Considering the potential at infinity is 0, the electrostatic energy of the configuration is ___ J.",
    options: [
      "49.3",
      "-49.3",
      "24.3",
      "14"
    ]
  },
  283: {
    text: "Two short dipoles ($A, B$), $A$ having charges $\\pm 2\\mu\\text{C}$ and length $1\\text{ cm}$ and $B$ having charges $\\pm 4\\mu\\text{C}$ and length $1\\text{ cm}$ are placed with their centres $80\\text{ cm}$ apart as shown in the figure. The electric field at a point $P$, equidistant from the centres of both dipoles is ___ N/C.",
    options: [
      "2\\sqrt{3} \\times 10^4",
      "9\\sqrt{3} \\times 10^4",
      "4.5\\sqrt{2} \\times 10^4",
      "4.3 \\times 10^4"
    ]
  },
  284: {
    text: "The electrostatic potential in a charged spherical region of radius $r$ varies as $V = ar^3 + b$, where $a$ and $b$ are constants. The total charge in the sphere of unit radius is $\\alpha \\times \\pi a \\varepsilon_0$. The value of $\\alpha$ is (permittivity of vacuum is $\\varepsilon_0$):",
    options: [
      "-8",
      "-12",
      "-9",
      "-6"
    ]
  },
  285: {
    text: "There are three concentric conducting spherical shells $A, B$ and $C$ of radii $a, b$ and $c$ respectively ($c > b > a$) and they are charged with charge $q_1, q_2$ and $q_3$ respectively. The potentials of the spheres $A, B$ and $C$ respectively, are:",
    options: [
      "\\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1+q_2+q_3}{a}\\right), \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_2+q_3}{b}\\right), \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_3}{c}\\right)",
      "\\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1}{a}\\right), \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_2}{b}\\right), \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_3}{c}\\right)",
      "\\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1}{a}+\\frac{q_2}{b}+\\frac{q_3}{c}\\right), \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1+q_2}{b}+\\frac{q_3}{c}\\right), \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1+q_2+q_3}{c}\\right)",
      "\\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1}{a}\\right), \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1+q_2}{b}\\right), \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1+q_2+q_3}{c}\\right)"
    ]
  },
  286: {
    text: "Three charges $+2q, +3q$ and $-4q$ are situated at $(0, -3a), (2a, 0)$ and $(-2a, 0)$ respectively in the $xy$ plane. The resultant dipole moment about origin is:",
    options: [
      "2qa(7\\hat{i} - 3\\hat{j})",
      "2qa(3\\hat{j} - 7\\hat{i})",
      "2qa(3\\hat{i} - 7\\hat{j})",
      "2qa(3\\hat{i} + 7\\hat{j})"
    ]
  },
  287: {
    text: "A point charge $q = 1\\mu\\text{C}$ is located at a distance $2\\text{ cm}$ from one end of a thin insulating wire of length $10\\text{ cm}$ having a charge $Q = 24\\mu\\text{C}$, distributed uniformly along its length, as shown in figure. Force between $q$ and wire is ___ N (use $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$).",
    options: []
  },
  288: {
    text: "Two point charges of $1\\text{ nC}$ and $2\\text{ nC}$ are placed at the two corners of equilateral triangle of side $3\\text{ cm}$. The work done in bringing a charge of $3\\text{ nC}$ from infinity to the third corner of the triangle is ___ $\\mu\\text{J}$ ($\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$):",
    options: [
      "2.7",
      "5.4",
      "2.7",
      "3.3"
    ]
  },
  289: {
    text: "Identify the correct statements :\nA. Electrostatic field lines form closed loops.\nB. The electric field lines point radially outward when charge is greater than zero.\nC. The Gauss's Law is valid only for inverse-square force.\nD. The workdone in moving a charged particle in a static electric field around a closed path is zero.\nE. The motion of a particle under Coulomb's force must take place in a plane.\nChoose the correct answer from the options given below :",
    options: [
      "A, B, D, E Only",
      "A, C, E Only",
      "A, B, C, D Only",
      "B, C, D, E Only"
    ]
  },
  290: {
    text: "Two charged conducting spheres $S_1$ and $S_2$ of radii $8\\text{ cm}$ and $18\\text{ cm}$ are connected to each other by a wire. After equilibrium is established, the ratio of electric fields on $S_1$ and $S_2$ spheres are $E_{S1}$ and $E_{S2}$ respectively. The value of $\\frac{E_{S1}}{E_{S2}}$ is:",
    options: [
      "3 / 2",
      "2 / 3",
      "4 / 9",
      "9 / 4"
    ]
  },
  291: {
    text: "Two short electric dipoles $A$ and $B$ having dipole moment $p_1$ and $p_2$ respectively are placed with their axis mutually perpendicular as shown in the figure. The resultant electric field at a point $x$ is making an angle of $60^\\circ$ with the line joining points $O$ and $x$. The ratio of the dipole moments $p_1 / p_2$ is:",
    options: [
      "\\sqrt{3} / 2",
      "2 / \\sqrt{3}",
      "1 / \\sqrt{3}",
      "\\sqrt{3}"
    ]
  },
  292: {
    text: "Two metal plates ($A, B$) are kept horizontally with separation of $(12/\\pi)\\text{ cm}$, with plate $A$ on the top. An atomizer jet sprays oil (density $1.5\\text{ g/cm}^3$) droplets of radius $1\\text{ mm}$ horizontally. All oil droplets carry a charge $5\\text{ nC}$. The potentials $V_A$ and $V_B$ are required on plates $A$ and $B$ respectively in order to ensure the droplets do not descend. The values of $V_A$ and $V_B$ are (take $g = 10\\text{ m/s}^2$):",
    options: [
      "100\\text{ V and } 580\\text{ V}",
      "580\\text{ V and } 100\\text{ V}",
      "60\\text{ V and } 400\\text{ V}",
      "0\\text{ and } -200\\text{ V}"
    ]
  },
  293: {
    text: "Two point charges $8\\mu\\text{C}$ and $-2\\mu\\text{C}$ are located at $x = 2\\text{ cm}$ and $x = 4\\text{ cm}$, respectively on the $x$-axis. The ratio of electric flux due to these charges through two spheres of radii $3\\text{ cm}$ and $5\\text{ cm}$ with their centers at the origin is:",
    options: [
      "4 : 1",
      "3 : 4",
      "4 : 3",
      "1 : 5"
    ]
  },
  294: {
    text: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: In electrostatics, a conductor does not store any net charge inside.\nReason R: Inside the capacitor (with no dielectric medium), the free charge carriers, if placed between the plates of capacitor, experience force and drift.\nChoose the correct answer from the options given below:",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ]
  },
  295: {
    text: "A rigid dipole undergoes a simple harmonic motion about its centre in the presence of an electric field $\\vec{E}_1 = E_0\\hat{i}$. If another electric field $\\vec{E}_2 = 2E_0(\\hat{j} + \\hat{k})$ is introduced to the system, what will be the percentage change in the frequency of the oscillation (approximate)?",
    options: [
      "73\\%",
      "63\\%",
      "83\\%",
      "53\\%"
    ]
  },
  296: {
    text: "A particle of charge $q$ and mass $m$ is projected from origin with an initial velocity $\\vec{v} = \\left(\\frac{v_0}{\\sqrt{2}}\\hat{i} + \\frac{v_0}{\\sqrt{2}}\\hat{k}\\right)$. There exists a uniform magnetic field $\\vec{B} = B_0\\hat{i}$ and a space varying electric field $\\vec{E} = E_0 e^{-\\lambda z}\\hat{k}$ within the region $0 < z < L$. After travelling a distance such that $z$-coordinate has changed from $z = 0$ to $z = L$, the change in the kinetic energy is:",
    options: [
      "\\frac{qE_0}{\\lambda}(1 - e^{-\\lambda L})",
      "\\frac{qE_0}{\\lambda} - \\frac{v_0 q B_0}{2}(1 - e^{-\\lambda L})",
      "\\frac{qE_0}{\\lambda}e^{-\\lambda L}",
      "\\left(\\frac{qE_0}{\\lambda} + mv_0 B_0\\right)(1 - e^{-\\lambda L})"
    ]
  },
  297: {
    text: "A thin half ring of radius $35\\text{ cm}$ is uniformly charged with a total charge of $Q$ coulomb. If the magnitude of the electric field at centre of the half ring is $100\\text{ V/m}$, then the value of $Q$ is ___ nC ($\\varepsilon_0 = 8.85 \\times 10^{-12}\\text{ C}^2/\\text{N m}^2$ and $\\pi = 3.14$):",
    options: [
      "2.14",
      "5.44",
      "3.95",
      "1.7"
    ]
  },
  298: {
    text: "A three coulomb charge moves from the point $(0, -2, 5)$ to the point $(5, 1, 2)$ in an electric field expressed as $\\vec{E} = 2x\\hat{i} + 3y^2\\hat{j} + 4\\hat{k}\\text{ N/C}$. The work done in moving the charge is ___ J.",
    options: []
  },
  299: {
    text: "The electric potential as a function of $x, y$ is given by $V = 5(x^2 - y^2)\\text{ V}$. The electric field at a point $(2,3)\\text{ m}$ is ___ V/m.",
    options: [
      "(-20\\hat{i} + 30\\hat{j})",
      "(20\\hat{i} - 30\\hat{j})",
      "(20\\hat{i} + 4\\hat{j})",
      "(-4\\hat{i} + 16\\hat{j})"
    ]
  },
  300: {
    text: "Two point charges $q_1 = 3\\mu\\text{C}$ and $q_2 = -4\\mu\\text{C}$ are placed at points $(2\\hat{i} + 3\\hat{j} + 3\\hat{k})$ and $(\\hat{i} + \\hat{j} + \\hat{k})$ respectively. Force on charge $q_2$ is ___ N (take $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ SI units}$):",
    options: [
      "(18\\hat{i} + 24\\hat{j} + 24\\hat{k}) \\times 10^{-4}",
      "(4\\hat{i} + 8\\hat{j} + 8\\hat{k}) \\times 10^{-4}",
      "(3\\hat{i} + 6\\hat{j} + 6\\hat{k}) \\times 10^{-4}",
      "(4\\hat{i} - 8\\hat{j} - 8\\hat{k}) \\times 10^{-4}"
    ]
  }
};
