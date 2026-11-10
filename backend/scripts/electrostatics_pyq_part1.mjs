// NEET Electrostatics PYQ Part 1: Q1 to Q30
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, 'electrostatics_diagram_urls.json');
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const ELECTROSTATICS_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: "A unit positive point charge is taken slowly through an infinitesimally thin tube that is inside a charged dielectric sphere of radius $R$, having uniform positive charge density $\\rho$, as shown in the figure. The initial and final positions of the charge are marked by $A$ and $B$ at distance $2R$ and $3R$ respectively, from the centre of the sphere. In this process, the magnitude of the total work done on the point charge is $\\frac{\\rho R^2}{n \\varepsilon_0}$. The value of $n$ is : ($\\varepsilon_0$ is the permittivity of vacuum)",
    imageUrl: diagrams.elec_q1_diagram || null,
    image_url: diagrams.elec_q1_diagram || null,
    options: [
      "$18$",
      "$2$",
      "$6$",
      "$9$"
    ],
    correctIndex: 0,
    solution: "1. The total charge of the dielectric sphere is:\n$$Q = \\rho \\times \\frac{4}{3}\\pi R^3$$\n2. Since points $A$ and $B$ are outside the sphere at distances $r_A = 2R$ and $r_B = 3R$, the potential at these points is given by:\n$$V_A = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{2R} = \\frac{\\rho R^2}{6\\varepsilon_0}$$\n$$V_B = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{3R} = \\frac{\\rho R^2}{9\\varepsilon_0}$$\n3. Work done by the external agent slowly moving a unit positive charge ($q = +1$) from $A$ to $B$ is:\n$$W = q(V_B - V_A) = 1 \\times \\left(\\frac{\\rho R^2}{9\\varepsilon_0} - \\frac{\\rho R^2}{6\\varepsilon_0}\\right) = -\\frac{\\rho R^2}{18\\varepsilon_0}$$\n4. The magnitude of work done is $\\frac{\\rho R^2}{18\\varepsilon_0}$, which corresponds to $\\frac{\\rho R^2}{n\\varepsilon_0}$, giving $n = 18$.\nHence, option (A) is correct."
  },
  {
    qNum: 2,
    exam: 'RE-NEET 2026',
    question: "Consider a fixed uniformly charged insulating sphere with radius $R$ and total charge $+Q$. A point charge $-q$ ($q \\ll Q$) with mass $m$ is released from rest at a distance of $3R$ from the centre of the charged sphere. When the point charge reaches the surface of the sphere, its speed is: ($\\varepsilon_0$ is the permittivity of vacuum, neglect gravitational forces).",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\sqrt{\\frac{Qq}{4\\pi\\varepsilon_0 m R}}$",
      "$\\sqrt{\\frac{3Qq}{4\\pi\\varepsilon_0 m R}}$",
      "$\\sqrt{\\frac{2Qq}{3\\pi\\varepsilon_0 m R}}$",
      "$\\sqrt{\\frac{Qq}{3\\pi\\varepsilon_0 m R}}$"
    ],
    correctIndex: 3,
    solution: "1. By conservation of mechanical energy:\n$$\\Delta K = -\\Delta U = U_i - U_f$$\n2. Potential energy of the point charge at initial distance $3R$:\n$$U_i = -\\frac{1}{4\\pi\\varepsilon_0}\\frac{Qq}{3R}$$\n3. Potential energy at the surface (distance $R$):\n$$U_f = -\\frac{1}{4\\pi\\varepsilon_0}\\frac{Qq}{R}$$\n4. Gain in kinetic energy:\n$$\\frac{1}{2}mv^2 = U_i - U_f = \\frac{Qq}{4\\pi\\varepsilon_0 R}\\left(1 - \\frac{1}{3}\\right) = \\frac{2Qq}{12\\pi\\varepsilon_0 R} = \\frac{Qq}{6\\pi\\varepsilon_0 R}$$\n5. Solving for speed $v$:\n$$v^2 = \\frac{Qq}{3\\pi\\varepsilon_0 m R} \\implies v = \\sqrt{\\frac{Qq}{3\\pi\\varepsilon_0 m R}}$$\nHence, option (D) is correct."
  },
  {
    qNum: 3,
    exam: 'RE-NEET 2026',
    question: "A point charge $Q$ is placed inside a cavity within a solid isolated conducting sphere. Consider points $A, B$ and $C$ as shown in the figure, where the magnitudes of the electric fields are $E_A, E_B, E_C$, respectively. The points $B$ and $C$ are at the same distance from the center of the solid sphere. The correct option is :",
    imageUrl: diagrams.elec_q3_diagram || null,
    image_url: diagrams.elec_q3_diagram || null,
    options: [
      "$E_A \\neq 0, E_B < E_C$",
      "$E_A = 0, E_B = E_C$",
      "$E_A \\neq 0, E_B = E_C$",
      "$E_A = 0, E_B > E_C$"
    ],
    correctIndex: 2,
    solution: "1. Point $A$ is located inside the cavity near the point charge $Q$, where the electrostatic field due to $Q$ is non-zero ($E_A \\neq 0$).\n2. By electrostatic shielding, induced negative charge $-Q$ appears on the inner cavity wall, and a uniform positive charge $+Q$ is distributed over the outer spherical surface of the conductor.\n3. Outside the conductor, the electric field is solely due to the charge distribution on the outer spherical surface, which produces a spherically symmetric field centered at the center of the sphere.\n4. Since points $B$ and $C$ are at the same distance from the center of the sphere, $E_B = E_C$.\n5. Therefore, $E_A \\neq 0$ and $E_B = E_C$.\nHence, option (C) is correct."
  },
  {
    qNum: 4,
    exam: 'NEET 2026',
    question: "Which of the following statements are correct?\nA. Inside a conductor, the electrostatic field is zero.\nB. Electric field at the surface of a charged conductor does not depend on its surface charge density.\nC. The interior of a charged conductor can have no excess charge in the static situation.\nD. At the surface of a charged conductor, the electrostatic field must be normal to the surface at every point.\nE. The electrostatic potential is zero everywhere inside a charged conductor.\nChoose the correct answer from the options given below:",
    imageUrl: null,
    image_url: null,
    options: [
      "A, B and D only",
      "A, C and E only",
      "A, C and D only",
      "C, D and E only"
    ],
    correctIndex: 2,
    solution: "1. Statement A is correct: In static equilibrium, free charges redistribute so that the net electrostatic field inside the conductor is zero.\n2. Statement B is incorrect: The electric field at the surface is $E = \\frac{\\sigma}{\\varepsilon_0}$, which directly depends on surface charge density $\\sigma$.\n3. Statement C is correct: By Gauss's Law, since $E = 0$ inside, no excess charge resides in the interior in electrostatic equilibrium.\n4. Statement D is correct: If the field had a tangential component, surface charges would accelerate; hence $E$ must be normal everywhere.\n5. Statement E is incorrect: The electrostatic potential is constant throughout the volume, equal to the surface value, but not necessarily zero.\nThus, statements A, C, and D only are correct.\nHence, option (C) is correct."
  },
  {
    qNum: 5,
    exam: 'NEET 2025',
    question: "An electric dipole with dipole moment $5 \\times 10^{-6}\\text{ C m}$ is aligned with the direction of a uniform electric field of magnitude $4 \\times 10^5\\text{ N/C}$. The dipole is then rotated through an angle of $60^\\circ$ with respect to the electric field. The change in the potential energy of the dipole is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$1.2\\text{ J}$",
      "$1.5\\text{ J}$",
      "$0.8\\text{ J}$",
      "$1.0\\text{ J}$"
    ],
    correctIndex: 3,
    solution: "1. Potential energy of an electric dipole in an electric field is given by:\n$$U = -p E \\cos\\theta$$\n2. Change in potential energy when rotated from $\\theta_1 = 0^\\circ$ to $\\theta_2 = 60^\\circ$:\n$$\\Delta U = U_f - U_i = -p E \\cos 60^\\circ - (-p E \\cos 0^\\circ) = p E(1 - \\cos 60^\\circ)$$\n3. Given $p = 5 \\times 10^{-6}\\text{ C m}$ and $E = 4 \\times 10^5\\text{ N/C}$:\n$$\\Delta U = (5 \\times 10^{-6})(4 \\times 10^5)(1 - 0.5) = 2.0 \\times 0.5 = 1.0\\text{ J}$$\nHence, option (D) is correct."
  },
  {
    qNum: 6,
    exam: 'NEET 2025',
    question: "Two identical charged conducting spheres $A$ and $B$ have their centres separated by a certain distance. Charge on each sphere is $q$ and the force of repulsion between them is $F$. A third identical uncharged conducting sphere is brought in contact with sphere $A$ first and then with $B$ and finally removed from both. New force of repulsion between spheres $A$ and $B$ (Radii of $A$ and $B$ are negligible compared to the distance of separation so that for calculating force between them they can be considered as point charges) is best given as:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{F}{2}$",
      "$\\frac{3F}{8}$",
      "$\\frac{3F}{5}$",
      "$\\frac{2F}{3}$"
    ],
    correctIndex: 1,
    solution: "1. Initial electrostatic force between spheres $A$ and $B$:\n$$F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q^2}{r^2}$$\n2. When uncharged identical sphere $C$ touches $A$:\n$$q_A' = q_C = \\frac{q + 0}{2} = \\frac{q}{2}$$\n3. When sphere $C$ (with charge $q/2$) touches sphere $B$ (with charge $q$):\n$$q_B' = \\frac{q + q/2}{2} = \\frac{3q}{4}$$\n4. The new repulsive force between $A$ and $B$ is:\n$$F' = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_A' q_B'}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(q/2)(3q/4)}{r^2} = \\frac{3}{8}\\left(\\frac{1}{4\\pi\\varepsilon_0}\\frac{q^2}{r^2}\\right) = \\frac{3F}{8}$$\nHence, option (B) is correct."
  },
  {
    qNum: 7,
    exam: 'NEET 2024 (Re-Examination)',
    question: "A metal cube of side $5\\text{ cm}$ is charged with $6\\ \\mu\\text{C}$. The surface charge density on the cube is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$0.125 \\times 10^{-3}\\text{ C m}^{-2}$",
      "$0.25 \\times 10^{-3}\\text{ C m}^{-2}$",
      "$4 \\times 10^{-3}\\text{ C m}^{-2}$",
      "$0.4 \\times 10^{-3}\\text{ C m}^{-2}$"
    ],
    correctIndex: 3,
    solution: "1. Total charge on the metal cube: $Q = 6\\ \\mu\\text{C} = 6 \\times 10^{-6}\\text{ C}$.\n2. Side length of the cube: $a = 5\\text{ cm} = 0.05\\text{ m}$.\n3. Total surface area of all 6 faces of the cube:\n$$A = 6 a^2 = 6 \\times (0.05)^2 = 6 \\times 0.0025 = 0.015\\text{ m}^2 = 1.5 \\times 10^{-2}\\text{ m}^2$$\n4. Surface charge density:\n$$\\sigma = \\frac{Q}{A} = \\frac{6 \\times 10^{-6}}{1.5 \\times 10^{-2}} = 4 \\times 10^{-4}\\text{ C m}^{-2} = 0.4 \\times 10^{-3}\\text{ C m}^{-2}$$\nHence, option (D) is correct."
  },
  {
    qNum: 8,
    exam: 'NEET 2024 (Re-Examination)',
    question: "The value of electric potential at a distance of $9\\text{ cm}$ from the point charge $4 \\times 10^{-7}\\text{ C}$ is [Given $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2\\text{C}^{-2}$] :",
    imageUrl: null,
    image_url: null,
    options: [
      "$4 \\times 10^2\\text{ V}$",
      "$44.4\\text{ V}$",
      "$4.4 \\times 10^5\\text{ V}$",
      "$4 \\times 10^4\\text{ V}$"
    ],
    correctIndex: 3,
    solution: "1. The electric potential due to a point charge $q$ at distance $r$ is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$$\n2. Given $q = 4 \\times 10^{-7}\\text{ C}$ and $r = 9\\text{ cm} = 9 \\times 10^{-2}\\text{ m}$:\n$$V = (9 \\times 10^9) \\times \\frac{4 \\times 10^{-7}}{9 \\times 10^{-2}} = 4 \\times 10^4\\text{ V}$$\nHence, option (D) is correct."
  },
  {
    qNum: 9,
    exam: 'NEET 2024',
    question: "A thin spherical shell is charged by some source. The potential difference between the two points $C$ and $P$ (in V) shown in the figure is: (Take $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ SI units}$)",
    imageUrl: diagrams.elec_q9_diagram || null,
    image_url: diagrams.elec_q9_diagram || null,
    options: [
      "$3 \\times 10^5$",
      "$1 \\times 10^5$",
      "$0.5 \\times 10^5$",
      "$\\text{Zero}$"
    ],
    correctIndex: 3,
    solution: "1. For a uniformly charged thin spherical shell, the electric field everywhere inside the shell is zero:\n$$E_{\\text{inside}} = 0$$\n2. Since $E = -\\frac{dV}{dr} = 0$, the electrostatic potential is constant throughout the entire interior and equals the potential at the surface:\n$$V_C = V_P = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{R}$$\n3. Therefore, the potential difference between center $C$ and surface point $P$ is:\n$$V_P - V_C = 0\\text{ V}$$\nHence, option (D) is correct."
  },
  {
    qNum: 10,
    exam: 'NEET 2024',
    question: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: The potential ($V$) at any axial point, at $2\\text{ m}$ distance ($r$) from the centre of the dipole of dipole moment vector $\\vec{P}$ of magnitude, $4 \\times 10^{-6}\\text{ C m}$, is $\\pm 9 \\times 10^3\\text{ V}$. (Take $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ SI units}$)\nReason R: $V = \\pm \\frac{2P}{4\\pi\\varepsilon_0 r^2}$, where $r$ is the distance of any axial point, situated at $2\\text{ m}$ from the centre of the dipole.\nIn the light of the above statements, choose the correct answer from the options given below:",
    imageUrl: null,
    image_url: null,
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true and R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    correctIndex: 2,
    solution: "1. The electric potential at an axial point of a dipole is given by:\n$$V = \\pm \\frac{1}{4\\pi\\varepsilon_0}\\frac{P}{r^2}$$\n2. Calculating $V$ for $P = 4 \\times 10^{-6}\\text{ C m}$ and $r = 2\\text{ m}$:\n$$V = \\pm (9 \\times 10^9) \\times \\frac{4 \\times 10^{-6}}{2^2} = \\pm 9 \\times 10^3\\text{ V}$$\nThus, Assertion A is true.\n3. Reason R states that $V = \\pm \\frac{2P}{4\\pi\\varepsilon_0 r^2}$, which incorrectly introduces a factor of 2 (confusing potential with electric field). Thus, Reason R is false.\n4. Therefore, A is true but R is false.\nHence, option (C) is correct."
  },
  {
    qNum: 11,
    exam: 'NEET 2023 Manipur',
    question: "According to Gauss law of electrostatics, electric flux through a closed surface depends on :",
    imageUrl: null,
    image_url: null,
    options: [
      "the area of the surface",
      "the quantity of charges enclosed by the surface",
      "the shape of the surface",
      "the volume enclosed by the surface"
    ],
    correctIndex: 1,
    solution: "1. Gauss's Law states that the total electric flux through any closed surface is given by:\n$$\\Phi = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$$\n2. The total flux depends only on the net charge enclosed by the surface, and is completely independent of the size, shape, surface area, or volume of the Gaussian surface.\nHence, option (B) is correct."
  },
  {
    qNum: 12,
    exam: 'NEET 2023 Manipur',
    question: "A charge $Q\\ \\mu\\text{C}$ is placed at the centre of a cube. The flux coming out from any one of its faces will be (in SI unit) :",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{Q}{\\varepsilon_0} \\times 10^{-6}$",
      "$\\frac{2Q}{3\\varepsilon_0} \\times 10^{-3}$",
      "$\\frac{Q}{6\\varepsilon_0} \\times 10^{-3}$",
      "$\\frac{Q}{6\\varepsilon_0} \\times 10^{-6}$"
    ],
    correctIndex: 3,
    solution: "1. Enclosed charge is $q = Q\\ \\mu\\text{C} = Q \\times 10^{-6}\\text{ C}$.\n2. By Gauss's Law, total electric flux through the entire cube is:\n$$\\Phi_{\\text{total}} = \\frac{q}{\\varepsilon_0} = \\frac{Q \\times 10^{-6}}{\\varepsilon_0}$$\n3. Since a cube has 6 identical symmetrical faces, the flux through any single face is:\n$$\\Phi_{\\text{face}} = \\frac{1}{6}\\Phi_{\\text{total}} = \\frac{Q}{6\\varepsilon_0} \\times 10^{-6}$$\nHence, option (D) is correct."
  },
  {
    qNum: 13,
    exam: 'NEET 2023 Manipur',
    question: "If a conducting sphere of radius $R$ is charged. Then the electric field at a distance $r$ ($r > R$) from the centre of the sphere would be, ($V =$ potential on the surface of the sphere):",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{r V}{R^2}$",
      "$\\frac{R^2 V}{r^3}$",
      "$\\frac{R V}{r^2}$",
      "$\\frac{V}{r}$"
    ],
    correctIndex: 2,
    solution: "1. The potential at the surface of a conducting sphere of radius $R$ and charge $q$ is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{R} \\implies \\frac{q}{4\\pi\\varepsilon_0} = V R$$\n2. The electric field at an exterior point ($r > R$) is:\n$$E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2}$$\n3. Substituting $\\frac{q}{4\\pi\\varepsilon_0} = V R$:\n$$E = \\frac{V R}{r^2}$$\nHence, option (C) is correct."
  },
  {
    qNum: 14,
    exam: 'NEET 2023',
    question: "An electric dipole is placed at an angle of $30^\\circ$ with an electric field of intensity $2 \\times 10^5\\text{ N C}^{-1}$. It experiences a torque equal to $4\\text{ N m}$. Calculate the magnitude of charge on the dipole, if the dipole length is $2\\text{ cm}$.",
    imageUrl: null,
    image_url: null,
    options: [
      "$6\\text{ mC}$",
      "$4\\text{ mC}$",
      "$2\\text{ mC}$",
      "$8\\text{ mC}$"
    ],
    correctIndex: 2,
    solution: "1. Torque on an electric dipole is given by:\n$$\\tau = p E \\sin\\theta = (q \\cdot 2a) E \\sin\\theta$$\n2. Given: $\\tau = 4\\text{ N m}$, $2a = 2\\text{ cm} = 0.02\\text{ m}$, $E = 2 \\times 10^5\\text{ N/C}$, and $\\theta = 30^\\circ$:\n$$4 = q \\times (0.02) \\times (2 \\times 10^5) \\times \\sin 30^\\circ$$\n$$4 = q \\times 4000 \\times 0.5 = 2000 q$$\n3. Solving for charge $q$:\n$$q = \\frac{4}{2000} = 2 \\times 10^{-3}\\text{ C} = 2\\text{ mC}$$\nHence, option (C) is correct."
  },
  {
    qNum: 15,
    exam: 'NEET 2023',
    question: "If $\\oint_S \\vec{E} \\cdot d\\vec{S} = 0$ over a surface, then:",
    imageUrl: null,
    image_url: null,
    options: [
      "the magnitude of electric field on the surface is constant.",
      "all the charges must necessarily be inside the surface.",
      "the electric field inside the surface is necessarily uniform.",
      "the number of flux lines entering the surface must be equal to the number of flux lines leaving it."
    ],
    correctIndex: 3,
    solution: "1. Gauss's Law states that $\\oint_S \\vec{E} \\cdot d\\vec{S} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$.\n2. When $\\oint_S \\vec{E} \\cdot d\\vec{S} = 0$, the net electric flux through the surface is zero.\n3. Electric flux represents the net number of electric field lines passing through the surface. Net zero flux means that every field line entering the closed surface must also exit it, meaning incoming flux equals outgoing flux.\nHence, option (D) is correct."
  },
  {
    qNum: 16,
    exam: 'NEET 2023',
    question: "An electric dipole is placed as shown in the figure. The electric potential (in $10^2\\text{ V}$) at point $P$ due to the dipole is ($\\varepsilon_0 =$ permittivity of free space and $\\frac{1}{4\\pi\\varepsilon_0} = K$) :",
    imageUrl: diagrams.elec_q16_diagram || null,
    image_url: diagrams.elec_q16_diagram || null,
    options: [
      "$\\left(\\frac{5}{8}\\right) qK$",
      "$\\left(\\frac{8}{5}\\right) qK$",
      "$\\left(\\frac{8}{3}\\right) qK$",
      "$\\left(\\frac{3}{8}\\right) qK$"
    ],
    correctIndex: 3,
    solution: "1. From the figure, the dipole consists of charges $-q$ and $+q$ separated by $6\\text{ cm}$, with center $O$ at the midpoint.\n2. Point $P$ is along the axial line at distance $5\\text{ cm}$ from the center $O$.\n3. Distance from $+q$ to $P$: $r_1 = 5 - 3 = 2\\text{ cm} = 2 \\times 10^{-2}\\text{ m}$.\n4. Distance from $-q$ to $P$: $r_2 = 5 + 3 = 8\\text{ cm} = 8 \\times 10^{-2}\\text{ m}$.\n5. Net electric potential at $P$:\n$$V = K\\left(\\frac{q}{r_1} - \\frac{q}{r_2}\\right) = K q \\left(\\frac{1}{2 \\times 10^{-2}} - \\frac{1}{8 \\times 10^{-2}}\\right) = 10^2 K q \\left(\\frac{1}{2} - \\frac{1}{8}\\right) = \\left(\\frac{3}{8}\\right) q K \\times 10^2\\text{ V}$$\n6. In units of $10^2\\text{ V}$, the potential is $\\left(\\frac{3}{8}\\right) q K$.\nHence, option (D) is correct."
  },
  {
    qNum: 17,
    exam: 'NEET 2022 Phase 2',
    question: "The ratio of Coulomb's electrostatic force to the gravitational force between an electron and a proton separated by some distance is $2.4 \\times 10^{39}$. The ratio of the proportionality constant, $K = \\frac{1}{4\\pi\\varepsilon_0}$ to the gravitational constant $G$ is nearly (Given that the charge of the proton and electron each $= 1.6 \\times 10^{-19}\\text{ C}$, the mass of the electron $= 9.11 \\times 10^{-31}\\text{ kg}$, the mass of the proton $= 1.67 \\times 10^{-27}\\text{ kg}$) :",
    imageUrl: null,
    image_url: null,
    options: [
      "$10$",
      "$10^{20}$",
      "$10^{30}$",
      "$10^{40}$"
    ],
    correctIndex: 1,
    solution: "1. The ratio of electrostatic force to gravitational force is:\n$$\\frac{F_e}{F_g} = \\frac{K e^2 / r^2}{G m_e m_p / r^2} = \\left(\\frac{K}{G}\\right) \\frac{e^2}{m_e m_p} = 2.4 \\times 10^{39}$$\n2. Solving for $\\frac{K}{G}$:\n$$\\frac{K}{G} = 2.4 \\times 10^{39} \\times \\frac{m_e m_p}{e^2}$$\n$$\\frac{K}{G} = 2.4 \\times 10^{39} \\times \\frac{(9.11 \\times 10^{-31})(1.67 \\times 10^{-27})}{(1.6 \\times 10^{-19})^2} \\approx 2.4 \\times 10^{39} \\times \\frac{15.21 \\times 10^{-58}}{2.56 \\times 10^{-38}} \\approx 1.4 \\times 10^{20} \\approx 10^{20}$$\nHence, option (B) is correct."
  },
  {
    qNum: 18,
    exam: 'NEET 2022 Phase 2',
    question: "Six charges $+q, -q, +q, -q, +q,$ and $-q$ are fixed at the corners of a hexagon of side $d$ as shown in the figure. The work done in bringing a charge $q_0$ to the centre of the hexagon from infinity is ($\\varepsilon_0 -$ permittivity of free space):",
    imageUrl: diagrams.elec_q18_diagram || null,
    image_url: diagrams.elec_q18_diagram || null,
    options: [
      "$\\frac{q^2}{4\\pi\\varepsilon_0 d}\\left(6 - \\frac{1}{\\sqrt{2}}\\right)$",
      "$\\text{Zero}$",
      "$\\frac{-q^2}{4\\pi\\varepsilon_0 d}$",
      "$\\frac{q^2}{4\\pi\\varepsilon_0 d}\\left(3 - \\frac{1}{\\sqrt{2}}\\right)$"
    ],
    correctIndex: 1,
    solution: "1. For a regular hexagon of side $d$, the distance from each vertex to the center is equal to $d$.\n2. The system consists of three $+q$ charges and three $-q$ charges placed at the vertices.\n3. The net electric potential at the center is the scalar sum:\n$$V_{\\text{center}} = \\frac{1}{4\\pi\\varepsilon_0 d} \\left[(+q) + (-q) + (+q) + (-q) + (+q) + (-q)\\right] = 0$$\n4. The potential at infinity is $V_\\infty = 0$.\n5. Therefore, work done in bringing charge $q_0$ from infinity to the center is:\n$$W = q_0(V_{\\text{center}} - V_\\infty) = q_0(0 - 0) = 0$$\nHence, option (B) is correct."
  },
  {
    qNum: 19,
    exam: 'NEET 2022 Phase 1',
    question: "The angle between the electric lines of force and the equipotential surface is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$0^\\circ$",
      "$45^\\circ$",
      "$90^\\circ$",
      "$180^\\circ$"
    ],
    correctIndex: 2,
    solution: "1. For any displacement $d\\vec{r}$ along an equipotential surface, $dV = 0$.\n2. The relation between electric field and potential is:\n$$dV = -\\vec{E} \\cdot d\\vec{r} = -E \\, dr \\cos\\theta = 0$$\n3. Since $E \\neq 0$ and $dr \\neq 0$, $\\cos\\theta = 0 \\implies \\theta = 90^\\circ$.\n4. Therefore, electric field lines of force are always perpendicular ($90^\\circ$) to equipotential surfaces.\nHence, option (C) is correct."
  },
  {
    qNum: 20,
    exam: 'NEET 2022 Phase 1',
    question: "Two hollow conducting spheres of radii $R_1$ and $R_2$ ($R_1 \\gg R_2$) have equal charges. The potential would be:",
    imageUrl: null,
    image_url: null,
    options: [
      "More on bigger sphere",
      "More on smaller sphere",
      "Equal on both the spheres",
      "Dependent on the material property of the sphere"
    ],
    correctIndex: 1,
    solution: "1. The electric potential of a hollow conducting sphere of radius $R$ carrying charge $q$ is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{R}$$\n2. Since both spheres have the same charge $q$, potential is inversely proportional to radius:\n$$V \\propto \\frac{1}{R}$$\n3. Given $R_1 \\gg R_2$, it follows that $V_2 > V_1$, meaning the potential is greater on the smaller sphere.\nHence, option (B) is correct."
  },
  {
    qNum: 21,
    exam: 'NEET 2022 Phase 1',
    question: "Two point charges $-q$ and $+q$ are placed at a distance of $L$, as shown in the figure. The magnitude of electric field intensity at a distance $R$ ($R \\gg L$) varies as:",
    imageUrl: diagrams.elec_q21_diagram || null,
    image_url: diagrams.elec_q21_diagram || null,
    options: [
      "$\\frac{1}{R^2}$",
      "$\\frac{1}{R^3}$",
      "$\\frac{1}{R^4}$",
      "$\\frac{1}{R^6}$"
    ],
    correctIndex: 1,
    solution: "1. The two equal and opposite charges separated by distance $L$ form an electric dipole of dipole moment $p = q L$.\n2. At large distances $R \\gg L$, the electric field intensity of an electric dipole (along both the axial line $E_{\\text{axial}} = \\frac{2kp}{R^3}$ and equatorial line $E_{\\text{eq}} = \\frac{kp}{R^3}$) varies as:\n$$E \\propto \\frac{1}{R^3}$$\nHence, option (B) is correct."
  },
  {
    qNum: 22,
    exam: 'NEET 2021',
    question: "Polar molecules are the molecules :",
    imageUrl: null,
    image_url: null,
    options: [
      "having a permanent electric dipole moment",
      "having zero dipole moment",
      "acquire a dipole moment only in the presence of electric field due to displacement of charges",
      "acquire a dipole moment only when magnetic field is absent"
    ],
    correctIndex: 0,
    solution: "1. A polar molecule is one in which the centers of positive and negative charges do not coincide even in the absence of an external electric field.\n2. Due to this permanent spatial separation of positive and negative charges, polar molecules possess a permanent electric dipole moment (e.g., $\\text{HCl}$, $\\text{H}_2\\text{O}$).\nHence, option (A) is correct."
  },
  {
    qNum: 23,
    exam: 'NEET 2021',
    question: "A dipole is placed in an electric field as shown. In which direction will it move?",
    imageUrl: diagrams.elec_q23_diagram || null,
    image_url: diagrams.elec_q23_diagram || null,
    options: [
      "towards the right as its potential energy will increase.",
      "towards the left as its potential energy will increase.",
      "towards the right as its potential energy will decrease.",
      "towards the left as its potential energy will decrease."
    ],
    correctIndex: 2,
    solution: "1. The electric field lines diverge towards the right, meaning the field is non-uniform and its magnitude decreases towards the right ($E_{\\text{left}} > E_{\\text{right}}$).\n2. The positive charge $+q$ is located in the stronger field region to the left, experiencing a force $q E_{\\text{left}}$ directed towards the right (in the direction of field lines).\n3. The negative charge $-q$ is in the weaker field region to the right, experiencing a force $q E_{\\text{right}}$ directed towards the left.\n4. Since $E_{\\text{left}} > E_{\\text{right}}$, the net force is towards the right.\n5. Any physical system accelerates in the direction of the net force, which corresponds to the direction of decreasing potential energy ($F = -\\frac{dU}{dx}$).\nHence, option (C) is correct."
  },
  {
    qNum: 24,
    exam: 'NEET 2021',
    question: "Two charged spherical conductors of radius $R_1$ and $R_2$ are connected by a wire. Then the ratio of surface charge densities of the spheres ($\\sigma_1 / \\sigma_2$) is :",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{R_1^2}{R_2^2}$",
      "$\\frac{R_1}{R_2}$",
      "$\\frac{R_2}{R_1}$",
      "$\\sqrt{\\frac{R_1}{R_2}}$"
    ],
    correctIndex: 2,
    solution: "1. When two conductors are connected by a conducting wire, charge flows until their electric potentials become equal:\n$$V_1 = V_2 \\implies \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1}{R_1} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_2}{R_2} \\implies \\frac{q_1}{q_2} = \\frac{R_1}{R_2}$$\n2. Surface charge density is defined as $\\sigma = \\frac{q}{4\\pi R^2}$.\n3. The ratio of surface charge densities is:\n$$\\frac{\\sigma_1}{\\sigma_2} = \\frac{q_1 / R_1^2}{q_2 / R_2^2} = \\left(\\frac{q_1}{q_2}\\right) \\left(\\frac{R_2^2}{R_1^2}\\right) = \\left(\\frac{R_1}{R_2}\\right) \\left(\\frac{R_2^2}{R_1^2}\\right) = \\frac{R_2}{R_1}$$\nHence, option (C) is correct."
  },
  {
    qNum: 25,
    exam: 'NEET 2021',
    question: "Twenty seven drops of same size are charged at $220\\text{ V}$ each. They combine to form a bigger drop. Calculate the potential of the bigger drop.",
    imageUrl: null,
    image_url: null,
    options: [
      "$1980\\text{ V}$",
      "$660\\text{ V}$",
      "$1320\\text{ V}$",
      "$1520\\text{ V}$"
    ],
    correctIndex: 0,
    solution: "1. By volume conservation, for 27 identical spherical drops coalescing into one large drop of radius $R$:\n$$\\frac{4}{3}\\pi R^3 = 27 \\times \\frac{4}{3}\\pi r^3 \\implies R = 3r$$\n2. By charge conservation, total charge is $Q = 27 q$.\n3. Initial potential of each small drop is:\n$$v = \\frac{k q}{r} = 220\\text{ V}$$\n4. Final potential of the large drop is:\n$$V = \\frac{k Q}{R} = \\frac{k (27q)}{3r} = 9\\left(\\frac{k q}{r}\\right) = 9 \\times 220 = 1980\\text{ V}$$\nHence, option (A) is correct."
  },
  {
    qNum: 26,
    exam: 'NEET 2020 Phase 2',
    question: "The electric field at a point on the equatorial plane at a distance $r$ from the centre of a dipole having dipole moment $\\vec{p}$ is given by, ($r \\gg \\text{separation of two charges forming the dipole}$, $\\varepsilon_0 -$ permittivity of free space):",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\vec{E} = -\\frac{\\vec{p}}{4\\pi\\varepsilon_0 r^3}$",
      "$\\vec{E} = \\frac{\\vec{p}}{4\\pi\\varepsilon_0 r^3}$",
      "$\\vec{E} = \\frac{2\\vec{p}}{4\\pi\\varepsilon_0 r^3}$",
      "$\\vec{E} = -\\frac{\\vec{p}}{4\\pi\\varepsilon_0 r^2}$"
    ],
    correctIndex: 0,
    solution: "1. The electric field at any point on the equatorial plane of a short dipole ($r \\gg 2a$) is directed antiparallel to the dipole moment vector $\\vec{p}$.\n2. In vector form, it is given by:\n$$\\vec{E} = -\\frac{\\vec{p}}{4\\pi\\varepsilon_0 r^3}$$\nHence, option (A) is correct."
  },
  {
    qNum: 27,
    exam: 'NEET 2020 Phase 2',
    question: "The acceleration of an electron due to the mutual attraction between the electron and a proton when they are $1.6\\text{ \\AA}$ apart is, ($m_e \\simeq 9 \\times 10^{-31}\\text{ kg}$, $e = 1.6 \\times 10^{-19}\\text{ C}$) (Take $\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2\\text{ C}^{-2}$):",
    imageUrl: null,
    image_url: null,
    options: [
      "$10^{25}\\text{ m/s}^2$",
      "$10^{24}\\text{ m/s}^2$",
      "$10^{23}\\text{ m/s}^2$",
      "$10^{22}\\text{ m/s}^2$"
    ],
    correctIndex: 3,
    solution: "1. Distance between the proton and electron is $r = 1.6\\text{ \\AA} = 1.6 \\times 10^{-10}\\text{ m}$.\n2. The electrostatic force of attraction between them is:\n$$F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r^2} = \\frac{(9 \\times 10^9)(1.6 \\times 10^{-19})^2}{(1.6 \\times 10^{-10})^2} = \\frac{9 \\times 10^9 \\times 2.56 \\times 10^{-38}}{2.56 \\times 10^{-20}} = 9 \\times 10^{-9}\\text{ N}$$\n3. Acceleration of the electron:\n$$a_e = \\frac{F}{m_e} = \\frac{9 \\times 10^{-9}\\text{ N}}{9 \\times 10^{-31}\\text{ kg}} = 10^{22}\\text{ m/s}^2$$\nHence, option (D) is correct."
  },
  {
    qNum: 28,
    exam: 'NEET 2020 Phase 2',
    question: "The variation of electrostatic potential with radial distance $r$ from the centre of a positively charged metallic thin shell of radius $R$ is given by the graph where:",
    imageUrl: null,
    image_url: null,
    options: [
      "potential decreases linearly from the centre to $r = R$ and then decreases as $1/r^2$",
      "potential is zero inside the shell and increases to a maximum at $r = R$",
      "potential remains constant from $r = 0$ to $r = R$ and decreases as $1/r$ for $r > R$",
      "potential increases linearly from zero at $r = 0$ to a maximum at $r = R$ and then decreases"
    ],
    correctIndex: 2,
    solution: "1. Inside a charged conducting spherical shell, the electric field is zero everywhere ($E = 0$).\n2. Consequently, the electric potential is uniform and constant throughout the interior up to the surface:\n$$V(r) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{R} \\quad \\text{for } r \\le R$$\n3. Outside the shell ($r > R$), the shell acts as a point charge at the origin:\n$$V(r) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r} \\propto \\frac{1}{r} \\quad \\text{for } r > R$$\n4. Thus, the graph is a constant horizontal line from $r = 0$ to $r = R$, followed by an inversely proportional decay ($V \\propto 1/r$) for $r > R$.\nHence, option (C) is correct."
  },
  {
    qNum: 29,
    exam: 'NEET 2020 Phase 1',
    question: "A short electric dipole has a dipole moment of $16 \\times 10^{-9}\\text{ C m}$. The electric potential due to the dipole at a point at a distance of $0.6\\text{ m}$ from the centre of the dipole, situated on a line making an angle of $60^\\circ$ with the dipole axis is : ($\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2/\\text{C}^2$)",
    imageUrl: null,
    image_url: null,
    options: [
      "$200\\text{ V}$",
      "$400\\text{ V}$",
      "$\\text{zero}$",
      "$50\\text{ V}$"
    ],
    correctIndex: 0,
    solution: "1. The electric potential due to a short electric dipole at distance $r$ and angle $\\theta$ from the dipole axis is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p \\cos\\theta}{r^2}$$\n2. Substituting the given values $p = 16 \\times 10^{-9}\\text{ C m}$, $r = 0.6\\text{ m}$, and $\\theta = 60^\\circ$:\n$$V = (9 \\times 10^9) \\times \\frac{(16 \\times 10^{-9}) \\cos 60^\\circ}{(0.6)^2} = 9 \\times \\frac{16 \\times 0.5}{0.36} = 9 \\times \\frac{8}{0.36} = \\frac{72}{0.36} = 200\\text{ V}$$\nHence, option (A) is correct."
  },
  {
    qNum: 30,
    exam: 'NEET 2020 Phase 1',
    question: "In a certain region of space with volume $0.2\\text{ m}^3$, the electric potential is found to be $5\\text{ V}$ throughout. The magnitude of electric field in this region is :",
    imageUrl: null,
    image_url: null,
    options: [
      "$0.5\\text{ N/C}$",
      "$1\\text{ N/C}$",
      "$5\\text{ N/C}$",
      "$\\text{zero}$"
    ],
    correctIndex: 3,
    solution: "1. The electric field is related to electric potential by the negative gradient:\n$$\\vec{E} = -\\nabla V$$\n2. Since the electric potential is constant ($V = 5\\text{ V}$) throughout the entire volume, the spatial derivative of potential is zero:\n$$\\frac{dV}{dr} = 0 \\implies E = 0$$\nHence, option (D) is correct."
  }
];

