// NEET Electrostatics PYQ Part 2: Q31 to Q60
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, 'electrostatics_diagram_urls.json');
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const ELECTROSTATICS_PYQ_PART2 = [
  {
    qNum: 31,
    exam: 'NEET 2020 Phase 1',
    question: "A spherical conductor of radius $10\\text{ cm}$ has a charge of $3.2 \\times 10^{-7}\\text{ C}$ distributed uniformly. What is the magnitude of electric field at a point $15\\text{ cm}$ from the centre of the sphere? [$\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^9\\text{ N m}^2/\\text{c}^2$]",
    imageUrl: null,
    image_url: null,
    options: [
      "$1.28 \\times 10^5\\text{ N/C}$",
      "$1.28 \\times 10^6\\text{ N/C}$",
      "$1.28 \\times 10^7\\text{ N/C}$",
      "$1.28 \\times 10^4\\text{ N/C}$"
    ],
    correctIndex: 0,
    solution: "1. For a point outside a uniformly charged spherical conductor ($r > R$):\n$$E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2}$$\n2. Given: $q = 3.2 \\times 10^{-7}\\text{ C}$ and $r = 15\\text{ cm} = 0.15\\text{ m}$:\n$$E = (9 \\times 10^9) \\times \\frac{3.2 \\times 10^{-7}}{(0.15)^2} = \\frac{2880}{0.0225} = 1.28 \\times 10^5\\text{ N/C}$$\nHence, option (A) is correct."
  },
  {
    qNum: 32,
    exam: 'NEET 2019 (Odisha)',
    question: "Two metal spheres, one of radius $R$ and the other of radius $2R$ respectively have the same surface charge density $\\sigma$. They are brought in contact and separated. What will be the new surface charge densities on them?",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\sigma_1 = \\frac{5}{3}\\sigma, \\, \\sigma_2 = \\frac{5}{6}\\sigma$",
      "$\\sigma_1 = \\frac{5}{6}\\sigma, \\, \\sigma_2 = \\frac{5}{2}\\sigma$",
      "$\\sigma_1 = \\frac{5}{2}\\sigma, \\, \\sigma_2 = \\frac{5}{6}\\sigma$",
      "$\\sigma_1 = \\frac{5}{6}\\sigma, \\, \\sigma_2 = \\frac{5}{3}\\sigma$"
    ],
    correctIndex: 0,
    solution: "1. Initial charges on the two spheres:\n$$q_1 = \\sigma (4\\pi R^2), \\quad q_2 = \\sigma (4\\pi (2R)^2) = 4\\sigma(4\\pi R^2)$$\n2. Total initial charge:\n$$Q_{\\text{total}} = q_1 + q_2 = 5\\sigma(4\\pi R^2)$$\n3. When brought in contact, charge redistributes until their electric potentials are equal:\n$$V_1 = V_2 \\implies \\frac{q_1'}{R} = \\frac{q_2'}{2R} \\implies q_2' = 2 q_1'$$\n$$q_1' + q_2' = 3 q_1' = Q_{\\text{total}} \\implies q_1' = \\frac{5}{3}\\sigma(4\\pi R^2), \\quad q_2' = \\frac{10}{3}\\sigma(4\\pi R^2)$$\n4. New surface charge densities:\n$$\\sigma_1 = \\frac{q_1'}{4\\pi R^2} = \\frac{5}{3}\\sigma$$\n$$\\sigma_2 = \\frac{q_2'}{4\\pi(2R)^2} = \\frac{\\frac{10}{3}\\sigma(4\\pi R^2)}{4(4\\pi R^2)} = \\frac{10}{12}\\sigma = \\frac{5}{6}\\sigma$$\nHence, option (A) is correct."
  },
  {
    qNum: 33,
    exam: 'NEET 2019 (Odisha)',
    question: "A sphere encloses an electric dipole with charges $\\pm 3 \\times 10^{-6}\\text{ C}$. What is the total electric flux across the sphere?",
    imageUrl: null,
    image_url: null,
    options: [
      "$6 \\times 10^{-6}\\text{ N m}^2/\\text{C}$",
      "$-3 \\times 10^{-6}\\text{ N m}^2/\\text{C}$",
      "$\\text{Zero}$",
      "$3 \\times 10^{-6}\\text{ N m}^2/\\text{C}$"
    ],
    correctIndex: 2,
    solution: "1. An electric dipole consists of two equal and opposite charges: $+q$ and $-q$.\n2. The net charge enclosed by the Gaussian sphere is:\n$$q_{\\text{enclosed}} = (+3 \\times 10^{-6}\\text{ C}) + (-3 \\times 10^{-6}\\text{ C}) = 0$$\n3. According to Gauss's Law:\n$$\\Phi = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} = 0$$\nHence, option (C) is correct."
  },
  {
    qNum: 34,
    exam: 'NEET 2019',
    question: "A hollow metal sphere of radius $R$ is uniformly charged. The electric field due to the sphere at a distance $r$ from the centre :",
    imageUrl: null,
    image_url: null,
    options: [
      "zero as $r$ increases for $r < R$, decreases as $r$ increases for $r > R$",
      "zero as $r$ increases for $r < R$, increases as $r$ increases for $r > R$.",
      "decreases as $r$ increases for $r < R$ and for $r > R$.",
      "increases as $r$ increases for $r < R$ and for $r > R$."
    ],
    correctIndex: 0,
    solution: "1. Inside a uniformly charged hollow metal sphere ($r < R$), the electric field is zero everywhere by Gauss's Law ($E = 0$).\n2. Outside the sphere ($r > R$), the electric field is given by $E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2} \\propto \\frac{1}{r^2}$, which decreases as distance $r$ increases.\nHence, option (A) is correct."
  },
  {
    qNum: 35,
    exam: 'NEET 2019',
    question: "Two point charges $A$ and $B$, having charges $+Q$ and $-Q$ respectively, are placed at certain distance apart and force acting between them is $F$. If $25\\%$ charge of $A$ is transferred to $B$, then force between the charges becomes :",
    imageUrl: null,
    image_url: null,
    options: [
      "$F$",
      "$\\frac{16F}{9}$",
      "$\\frac{9F}{16}$",
      "$\\frac{4F}{3}$"
    ],
    correctIndex: 2,
    solution: "1. Initial attractive force between charges $+Q$ and $-Q$ separated by distance $r$:\n$$F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{r^2}$$\n2. Transferring $25\\%$ of charge from $A$ to $B$ (i.e. $\\frac{Q}{4}$):\n$$Q_A' = Q - \\frac{Q}{4} = \\frac{3Q}{4}$$\n$$Q_B' = -Q + \\frac{Q}{4} = -\\frac{3Q}{4}$$\n3. New magnitude of force:\n$$F' = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|Q_A' Q_B'|}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\left(\\frac{3Q}{4}\\right)\\left(\\frac{3Q}{4}\\right)}{r^2} = \\frac{9}{16}\\left(\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{r^2}\\right) = \\frac{9F}{16}$$\nHence, option (C) is correct."
  },
  {
    qNum: 36,
    exam: 'NEET 2019',
    question: "Two parallel infinite line charges with linear charge densities $+\\lambda\\text{ C/m}$ and $-\\lambda\\text{ C/m}$ are placed at a distance of $2R$ in free space. What is the electric field mid-way between the two line charges?",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{2\\lambda}{\\pi\\varepsilon_0 R}\\text{ N/C}$",
      "$\\text{zero}$",
      "$\\frac{\\lambda}{\\pi\\varepsilon_0 R}\\text{ N/C}$",
      "$\\frac{\\lambda}{2\\pi\\varepsilon_0 R}\\text{ N/C}$"
    ],
    correctIndex: 2,
    solution: "1. The electric field due to an infinite line charge of linear density $\\lambda$ at distance $R$ is:\n$$E = \\frac{\\lambda}{2\\pi\\varepsilon_0 R}$$\n2. At the midpoint between the line charges, the distance to each wire is $R$.\n3. Field due to $+\\lambda$ points away from it (towards $-\\lambda$):\n$$E_1 = \\frac{\\lambda}{2\\pi\\varepsilon_0 R}$$\n4. Field due to $-\\lambda$ points towards it (same direction as $E_1$):\n$$E_2 = \\frac{\\lambda}{2\\pi\\varepsilon_0 R}$$\n5. Total electric field:\n$$E_{\\text{net}} = E_1 + E_2 = \\frac{\\lambda}{2\\pi\\varepsilon_0 R} + \\frac{\\lambda}{2\\pi\\varepsilon_0 R} = \\frac{\\lambda}{\\pi\\varepsilon_0 R}\\text{ N/C}$$\nHence, option (C) is correct."
  },
  {
    qNum: 37,
    exam: 'NEET 2018',
    question: "An electron falls from rest through a vertical distance $h$ in a uniform and vertically upward directed electric field $E$. The direction of electric field is now reversed, keeping its magnitude the same. A proton is allowed to fall from rest in it through the same vertical distance $h$. The time of fall of the electron, in comparison to the time of fall of the proton is:",
    imageUrl: null,
    image_url: null,
    options: [
      "smaller",
      "$5\\text{ times greater}$",
      "$10\\text{ times greater}$",
      "equal"
    ],
    correctIndex: 0,
    solution: "1. The electric acceleration of a charged particle in electric field $E$ is (neglecting gravity since $a_e, a_p \\gg g$):\n$$a = \\frac{q E}{m}$$\n2. Using kinematic relation $h = \\frac{1}{2} a t^2$ starting from rest:\n$$t = \\sqrt{\\frac{2h}{a}} = \\sqrt{\\frac{2hm}{qE}} \\implies t \\propto \\sqrt{m}$$\n3. Since the mass of an electron is much smaller than the mass of a proton ($m_e \\approx \\frac{m_p}{1836}$), the time of fall of the electron is significantly smaller ($t_e < t_p$).\nHence, option (A) is correct."
  },
  {
    qNum: 38,
    exam: 'NEET 2017',
    question: "Suppose the charge of a proton and an electron differ slightly. One of them is $-e$, the other is $(e + \\Delta e)$. If the net of electrostatic force and gravitational force between two hydrogen atoms placed at a distance $d$ (much greater than atomic size) apart is zero, then $\\Delta e$ is of the order of [Given : mass of hydrogen $m_h = 1.67 \\times 10^{-27}\\text{ kg}$] :",
    imageUrl: null,
    image_url: null,
    options: [
      "$10^{-23}\\text{ C}$",
      "$10^{-37}\\text{ C}$",
      "$10^{-47}\\text{ C}$",
      "$10^{-20}\\text{ C}$"
    ],
    correctIndex: 1,
    solution: "1. Each hydrogen atom contains one proton and one electron. Net charge per atom is:\n$$q = (e + \\Delta e) - e = \\Delta e$$\n2. The repulsive electrostatic force balances the attractive gravitational force:\n$$F_e = F_g \\implies \\frac{1}{4\\pi\\varepsilon_0}\\frac{(\\Delta e)^2}{d^2} = G \\frac{m_h^2}{d^2}$$\n$$(\\Delta e)^2 = 4\\pi\\varepsilon_0 G m_h^2 = \\frac{1}{9 \\times 10^9} \\times (6.67 \\times 10^{-11}) \\times (1.67 \\times 10^{-27})^2$$\n$$(\\Delta e)^2 \\approx 2.07 \\times 10^{-74} \\implies \\Delta e \\approx 1.44 \\times 10^{-37}\\text{ C}$$\n3. Thus, $\\Delta e$ is of the order of $10^{-37}\\text{ C}$.\nHence, option (B) is correct."
  },
  {
    qNum: 39,
    exam: 'NEET 2017',
    question: "The diagrams below show regions of equipotentials. A positive charge is moved from $A$ to $B$ in each diagram.",
    imageUrl: diagrams.elec_q39_diagram || null,
    image_url: diagrams.elec_q39_diagram || null,
    options: [
      "In all the four cases the work done is the same.",
      "Minimum work is required to move $q$ in figure(I).",
      "Maximum work is required to move $q$ in figure (II).",
      "Maximum work is required to move $q$ in figure (III)"
    ],
    correctIndex: 0,
    solution: "1. Electrostatic force is a conservative force, meaning work done in moving a charge depends solely on the initial and final potentials, not on the path:\n$$W = q(V_B - V_A)$$\n2. In each of the four diagrams, point $A$ lies on the equipotential surface $V_A = 20\\text{ V}$ and point $B$ lies on the equipotential surface $V_B = 40\\text{ V}$.\n3. In all four cases, the potential difference is identical:\n$$\\Delta V = V_B - V_A = 40\\text{ V} - 20\\text{ V} = 20\\text{ V}$$\n4. Therefore, the work done $W = 20q$ is exactly the same in all four cases.\nHence, option (A) is correct."
  },
  {
    qNum: 40,
    exam: 'NEET 2016 Phase 2',
    question: "An electric dipole is placed at an angle of $30^\\circ$ with an electric field intensity $2 \\times 10^5\\text{ N C}^{-1}$. It experiences a torque equal to $4\\text{ N m}$. The charge on the dipole, if the dipole length is $2\\text{ cm}$, is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$8\\text{ mC}$",
      "$2\\text{ mC}$",
      "$5\\text{ mC}$",
      "$7\\ \\mu\\text{C}$"
    ],
    correctIndex: 1,
    solution: "1. Torque on an electric dipole:\n$$\\tau = p E \\sin\\theta = (q \\cdot 2a) E \\sin\\theta$$\n2. Substituting given values $\\tau = 4\\text{ N m}$, $2a = 0.02\\text{ m}$, $E = 2 \\times 10^5\\text{ N/C}$, and $\\theta = 30^\\circ$:\n$$4 = q \\times (0.02) \\times (2 \\times 10^5) \\times 0.5 = 2000 q$$\n$$q = \\frac{4}{2000} = 2 \\times 10^{-3}\\text{ C} = 2\\text{ mC}$$\nHence, option (B) is correct."
  },
  {
    qNum: 41,
    exam: 'NEET 2016 Phase 1',
    question: "Two identical charged spheres suspended from a common point by two massless strings of lengths $l$, are initially at a distance $d$ ($d \\ll l$) apart because of their mutual repulsion. The charges begin to leak from both the spheres at a constant rate. As a result, the spheres approach each other with a velocity $v$. Then $v$ varies as a function of the distance $x$ between the spheres, as:",
    imageUrl: null,
    image_url: null,
    options: [
      "$v \\propto x^{-1/2}$",
      "$v \\propto x^{-1}$",
      "$v \\propto x^{1/2}$",
      "$v \\propto x$"
    ],
    correctIndex: 0,
    solution: "1. In equilibrium at separation $x$, with string angle $\\theta$:\n$$\\tan\\theta \\approx \\frac{x / 2}{l} = \\frac{F_e}{mg} = \\frac{k q^2}{mg x^2}$$\n2. Rearranging gives:\n$$x^3 = \\frac{2 k l}{mg} q^2 \\implies q \\propto x^{3/2}$$\n3. Differentiating with respect to time $t$:\n$$\\frac{dq}{dt} \\propto \\frac{3}{2} x^{1/2} \\frac{dx}{dt} = \\frac{3}{2} x^{1/2} v$$\n4. Since charge leaks at a constant rate ($\\frac{dq}{dt} = \\text{constant}$):\n$$x^{1/2} v = \\text{constant} \\implies v \\propto x^{-1/2}$$\nHence, option (A) is correct."
  },
  {
    qNum: 42,
    exam: 'AIPMT 2015',
    question: "If potential (in volts) in a region is expressed as $V(x, y, z) = 6xy - y + 2yz$, the electric field (in N/C) at point $(1, 1, 0)$ is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$-(2\\hat{i} + 3\\hat{j} + \\hat{k})$",
      "$-(6\\hat{i} + 9\\hat{j} + \\hat{k})$",
      "$-(3\\hat{i} + 5\\hat{j} + 3\\hat{k})$",
      "$-(6\\hat{i} + 5\\hat{j} + 2\\hat{k})$"
    ],
    correctIndex: 3,
    solution: "1. The electric field vector is the negative gradient of the potential:\n$$\\vec{E} = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)$$\n2. Evaluating the partial derivatives at $(x, y, z) = (1, 1, 0)$:\n$$\\frac{\\partial V}{\\partial x} = 6y = 6(1) = 6$$\n$$\\frac{\\partial V}{\\partial y} = 6x - 1 + 2z = 6(1) - 1 + 2(0) = 5$$\n$$\\frac{\\partial V}{\\partial z} = 2y = 2(1) = 2$$\n3. Combining components:\n$$\\vec{E} = -(6\\hat{i} + 5\\hat{j} + 2\\hat{k})$$\nHence, option (D) is correct."
  },
  {
    qNum: 43,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "The electric field in a certain region is acting radially outward and is given by $E = Ar$. A charge contained in a sphere of radius 'a' centred at the origin of the field, will be given by:",
    imageUrl: null,
    image_url: null,
    options: [
      "$4\\pi\\varepsilon_0 A a^3$",
      "$\\varepsilon_0 A a^3$",
      "$4\\pi\\varepsilon_0 A a^2$",
      "$A \\varepsilon_0 a^2$"
    ],
    correctIndex: 0,
    solution: "1. At the surface of a sphere of radius $a$, the electric field is directed radially outwards with magnitude $E = A a$.\n2. The total electric flux through the spherical surface of area $4\\pi a^2$ is:\n$$\\Phi = E (4\\pi a^2) = (Aa)(4\\pi a^2) = 4\\pi A a^3$$\n3. Applying Gauss's Law ($\\Phi = \\frac{q}{\\varepsilon_0}$):\n$$q = \\varepsilon_0 \\Phi = 4\\pi\\varepsilon_0 A a^3$$\nHence, option (A) is correct."
  },
  {
    qNum: 44,
    exam: 'AIPMT 2014',
    question: "A conducting sphere of radius $R$ is given a charge $Q$. The electric potential and the electric field at the centre of the sphere respectively are:",
    imageUrl: null,
    image_url: null,
    options: [
      "zero and $\\frac{Q}{4\\pi\\varepsilon_0 R^2}$",
      "$\\frac{Q}{4\\pi\\varepsilon_0 R}$ and zero",
      "$\\frac{Q}{4\\pi\\varepsilon_0 R}$ and $\\frac{Q}{4\\pi\\varepsilon_0 R^2}$",
      "both are zero"
    ],
    correctIndex: 1,
    solution: "1. Inside a charged conducting sphere, electrostatic charges reside entirely on the outer surface.\n2. By Gauss's Law, the electrostatic field inside the conductor is zero everywhere, including at the center ($E = 0$).\n3. Since $E = -\\frac{dV}{dr} = 0$, the potential inside is uniform and equal to that at the surface:\n$$V = \\frac{Q}{4\\pi\\varepsilon_0 R}$$\nHence, option (B) is correct."
  },
  {
    qNum: 45,
    exam: 'AIPMT 2014',
    question: "In a region, the potential is represented by $V(x, y, z) = 6x - 8xy - 8y + 6yz$, where $V$ is in volts and $x, y, z$ are in metres. The electric force experienced by a charge of $2\\text{ coulomb}$ situated at point $(1, 1, 1)$ is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$6\\sqrt{5}\\text{ N}$",
      "$30\\text{ N}$",
      "$24\\text{ N}$",
      "$4\\sqrt{35}\\text{ N}$"
    ],
    correctIndex: 3,
    solution: "1. Components of electric field at $(1, 1, 1)$:\n$$E_x = -\\frac{\\partial V}{\\partial x} = -(6 - 8y) = -(6 - 8) = 2$$\n$$E_y = -\\frac{\\partial V}{\\partial y} = -(-8x - 8 + 6z) = -(-8 - 8 + 6) = 10$$\n$$E_z = -\\frac{\\partial V}{\\partial z} = -(6y) = -6$$\n2. Magnitude of electric field:\n$$E = \\sqrt{E_x^2 + E_y^2 + E_z^2} = \\sqrt{2^2 + 10^2 + (-6)^2} = \\sqrt{4 + 100 + 36} = \\sqrt{140} = 2\\sqrt{35}\\text{ N/C}$$\n3. Electric force experienced by $q = 2\\text{ C}$:\n$$F = q E = 2 \\times 2\\sqrt{35} = 4\\sqrt{35}\\text{ N}$$\nHence, option (D) is correct."
  },
  {
    qNum: 46,
    exam: 'NEET 2013 (Karnataka)',
    question: "An electric dipole of dipole moment $p$ is aligned parallel to a uniform electric field $E$. The energy required to rotate the dipole by $90^\\circ$ is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$p^2 E$",
      "$pE$",
      "$\\text{infinity}$",
      "$pE^2$"
    ],
    correctIndex: 1,
    solution: "1. Work done in rotating a dipole from $\\theta_1$ to $\\theta_2$ in a uniform electric field is:\n$$W = p E(\\cos\\theta_1 - \\cos\\theta_2)$$\n2. Given $\\theta_1 = 0^\\circ$ (aligned parallel) and $\\theta_2 = 90^\\circ$:\n$$W = p E(\\cos 0^\\circ - \\cos 90^\\circ) = p E(1 - 0) = pE$$\nHence, option (B) is correct."
  },
  {
    qNum: 47,
    exam: 'NEET 2013 (Karnataka)',
    question: "A charge $q$ is placed at the centre of the line joining two equal charges $Q$. The system of the three charges will be in equilibrium if $q$ is equal to:",
    imageUrl: null,
    image_url: null,
    options: [
      "$-Q/4$",
      "$Q/4$",
      "$-Q/2$",
      "$Q/2$"
    ],
    correctIndex: 0,
    solution: "1. The charge $q$ at the center is already in equilibrium because equal and opposite forces act on it from both outer charges $Q$.\n2. For the entire system to be in equilibrium, each of the outer charges $Q$ must also experience zero net force:\n$$F_{\\text{net}} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{(2r)^2} + \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q q}{r^2} = 0$$\n$$\\frac{Q}{4r^2} + \\frac{q}{r^2} = 0 \\implies q = -\\frac{Q}{4}$$\nHence, option (A) is correct."
  },
  {
    qNum: 48,
    exam: 'NEET 2013',
    question: "A, B and C are three points in a uniform electric field. The electric potential is:",
    imageUrl: diagrams.elec_q48_diagram || null,
    image_url: diagrams.elec_q48_diagram || null,
    options: [
      "maximum at C",
      "same at all the three points A, B and C",
      "maximum at A",
      "maximum at B"
    ],
    correctIndex: 3,
    solution: "1. The electric field lines are directed from left to right.\n2. In electrostatics, the electric potential decreases along the direction of the electric field lines ($E = -\\frac{dV}{dr}$).\n3. Point $B$ is situated furthest upstream (to the left), opposite to the field direction.\n4. Therefore, the electric potential is maximum at point $B$.\nHence, option (D) is correct."
  },
  {
    qNum: 49,
    exam: 'NEET 2013',
    question: "Two pith balls carrying equal charges are suspended from a common point by strings of equal length, the equilibrium separation between them is $r$. Now the strings are rigidly clamped at half the height. The equilibrium separation between the balls now becomes:",
    imageUrl: diagrams.elec_q49_diagram || null,
    image_url: diagrams.elec_q49_diagram || null,
    options: [
      "$\\left(\\frac{2r}{\\sqrt{3}}\\right)$",
      "$\\left(\\frac{2r}{3}\\right)$",
      "$\\left(\\frac{r}{\\sqrt{2}}\\right)^2$",
      "$\\left(\\frac{r}{\\sqrt[3]{2}}\\right)$"
    ],
    correctIndex: 3,
    solution: "1. For small angular deflection $\\theta$, $\\tan\\theta \\approx \\frac{r/2}{y} = \\frac{r}{2y}$.\n2. Balancing forces in equilibrium: $\\tan\\theta = \\frac{F_e}{mg} = \\frac{k q^2 / r^2}{mg}$.\n3. Equating the two expressions:\n$$\\frac{r}{2y} = \\frac{k q^2}{mg r^2} \\implies y \\propto r^3$$\n4. When clamped at height $y' = \\frac{y}{2}$:\n$$\\frac{y'}{y} = \\left(\\frac{r'}{r}\\right)^3 = \\frac{1}{2} \\implies r' = \\frac{r}{\\sqrt[3]{2}}$$\nHence, option (D) is correct."
  },
  {
    qNum: 50,
    exam: 'AIPMT 2012 Mains',
    question: "Two metallic spheres of radii $1\\text{ cm}$ and $3\\text{ cm}$ are given charges of $-1 \\times 10^{-2}\\text{ C}$ and $5 \\times 10^{-2}\\text{ C}$, respectively. If these are connected by a conducting wire, the final charge on the bigger sphere is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$2 \\times 10^{-2}\\text{ C}$",
      "$3 \\times 10^{-2}\\text{ C}$",
      "$4 \\times 10^{-2}\\text{ C}$",
      "$1 \\times 10^{-2}\\text{ C}$"
    ],
    correctIndex: 1,
    solution: "1. Total charge of the system:\n$$Q = q_1 + q_2 = (-1 \\times 10^{-2}) + (5 \\times 10^{-2}) = 4 \\times 10^{-2}\\text{ C}$$\n2. When connected by a conducting wire, the charges redistribute proportionally to their radii ($V_1 = V_2 \\implies \\frac{q_1'}{r_1} = \\frac{q_2'}{r_2}$):\n$$q_2' = \\frac{r_2}{r_1 + r_2} Q$$\n3. For the bigger sphere ($r_2 = 3\\text{ cm}, r_1 = 1\\text{ cm}$):\n$$q_2' = \\frac{3}{1 + 3} \\times (4 \\times 10^{-2}\\text{ C}) = \\frac{3}{4} \\times (4 \\times 10^{-2}\\text{ C}) = 3 \\times 10^{-2}\\text{ C}$$\nHence, option (B) is correct."
  },
  {
    qNum: 51,
    exam: 'AIPMT 2012 Prelims',
    question: "An electric dipole of moment $p$ is placed in an electric field of intensity $E$. The dipole acquires a position such that the axis of the dipole makes an angle $\\theta$ with the direction of the field. Assuming that the potential energy of the dipole to be zero when $\\theta = 90^\\circ$, the torque and the potential energy of the dipole will respectively be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$pE\\sin\\theta, \\, -pE\\cos\\theta$",
      "$pE\\sin\\theta, \\, -2pE\\cos\\theta$",
      "$pE\\sin\\theta, \\, 2pE\\cos\\theta$",
      "$pE\\cos\\theta, \\, -pE\\sin\\theta$"
    ],
    correctIndex: 0,
    solution: "1. The torque on an electric dipole in an electric field is:\n$$\\vec{\\tau} = \\vec{p} \\times \\vec{E} \\implies \\tau = p E \\sin\\theta$$\n2. The potential energy with reference $U(90^\\circ) = 0$ is:\n$$U = -\\vec{p} \\cdot \\vec{E} = -p E \\cos\\theta$$\nHence, option (A) is correct."
  },
  {
    qNum: 52,
    exam: 'AIPMT 2012 Prelims',
    question: "Four point charges $-Q, -q, 2q$ and $2Q$ are placed, one at each corner of the square. The relation between $Q$ and $q$ for which the potential at the centre of the square is zero is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$Q = -q$",
      "$Q = -\\frac{1}{q}$",
      "$Q = q$",
      "$Q = \\frac{1}{q}$"
    ],
    correctIndex: 0,
    solution: "1. In a square, the distance from each of the four corners to the centre is identical ($r = \\frac{a}{\\sqrt{2}}$).\n2. The electric potential at the centre is the algebraic sum of the potentials due to each charge:\n$$V = \\frac{1}{4\\pi\\varepsilon_0 r}\\left[(-Q) + (-q) + 2q + 2Q\\right] = \\frac{1}{4\\pi\\varepsilon_0 r}(Q + q)$$\n3. For potential at the centre to be zero ($V = 0$):\n$$Q + q = 0 \\implies Q = -q$$\nHence, option (A) is correct."
  },
  {
    qNum: 53,
    exam: 'AIPMT 2012 Prelims',
    question: "What is the flux through a cube of side $a$ if a point charge of $q$ is at one of its corners?",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{2q}{\\varepsilon_0}$",
      "$\\frac{q}{8\\varepsilon_0}$",
      "$\\frac{q}{\\varepsilon_0}$",
      "$\\frac{q}{2\\varepsilon_0} 6a^2$"
    ],
    correctIndex: 1,
    solution: "1. A point charge located at one corner of a cube is symmetrically shared by 8 identical adjacent cubes meeting at that corner.\n2. By Gauss's Law, the total electric flux originating from charge $q$ through all 8 cubes is $\\frac{q}{\\varepsilon_0}$.\n3. Therefore, the flux through any single cube sharing that corner is:\n$$\\Phi = \\frac{1}{8}\\frac{q}{\\varepsilon_0} = \\frac{q}{8\\varepsilon_0}$$\nHence, option (B) is correct."
  },
  {
    qNum: 54,
    exam: 'AIPMT 2011 Mains',
    question: "Three charges, each $+q$, are placed at the corners of an isosceles triangle $ABC$ of sides $BC$ and $AC$, $2a$. $D$ and $E$ are the mid points of $BC$ and $CA$. The work done in taking a charge $Q$ from $D$ to $E$ is:",
    imageUrl: diagrams.elec_q54_diagram || null,
    image_url: diagrams.elec_q54_diagram || null,
    options: [
      "$\\frac{3qQ}{4\\pi\\varepsilon_0 a}$",
      "$\\frac{3qQ}{8\\pi\\varepsilon_0 a}$",
      "$\\frac{qQ}{4\\pi\\varepsilon_0 a}$",
      "$\\text{zero}$"
    ],
    correctIndex: 3,
    solution: "1. The triangle $ABC$ is isosceles with $AC = BC = 2a$, and equal charges $+q$ at $A, B,$ and $C$.\n2. Point $D$ is the midpoint of side $BC$, and point $E$ is the midpoint of side $AC$.\n3. By symmetry, the potential at point $D$ due to charges at $A, B, C$ is identical to the potential at point $E$ due to charges at $B, A, C$:\n$$V_D = V_E$$\n4. The work done in moving charge $Q$ from $D$ to $E$ is:\n$$W = Q(V_E - V_D) = Q(0) = 0$$\nHence, option (D) is correct."
  },
  {
    qNum: 55,
    exam: 'AIPMT 2011 Mains',
    question: "The electric potential $V$ at any point $(x, y, z)$, all in metres in space is given by $V = 4x^2\\text{ volt}$. The electric field at the point $(1, 0, 2)$ in volt/meter, is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$8\\text{ along negative X-axis}$",
      "$8\\text{ along positive X-axis}$",
      "$16\\text{ along negative X-axis}$",
      "$16\\text{ along positive X-axis}$"
    ],
    correctIndex: 0,
    solution: "1. The electric field is related to potential by:\n$$\\vec{E} = -\\frac{\\partial V}{\\partial x}\\hat{i} - \\frac{\\partial V}{\\partial y}\\hat{j} - \\frac{\\partial V}{\\partial z}\\hat{k}$$\n2. Since $V = 4x^2$:\n$$E_x = -\\frac{d}{dx}(4x^2) = -8x, \\quad E_y = 0, \\quad E_z = 0$$\n3. At the point $(1, 0, 2)$, $x = 1$:\n$$\\vec{E} = -8(1)\\hat{i} = -8\\hat{i}\\text{ V/m}$$\n4. This represents a magnitude of $8\\text{ V/m}$ along the negative X-axis.\nHence, option (A) is correct."
  },
  {
    qNum: 56,
    exam: 'AIPMT 2011 Prelims',
    question: "A charge $Q$ is enclosed by a Gaussian spherical surface of radius $R$. If the radius is doubled, then the outward electric flux will:",
    imageUrl: null,
    image_url: null,
    options: [
      "increase four times",
      "be reduced to half",
      "remain the same",
      "be doubled"
    ],
    correctIndex: 2,
    solution: "1. According to Gauss's Law, the total outward electric flux through any closed Gaussian surface depends solely on the enclosed charge:\n$$\\Phi = \\frac{Q_{\\text{enclosed}}}{\\varepsilon_0}$$\n2. Since the enclosed charge $Q$ does not change when the radius is doubled, the total outward electric flux remains the same.\nHence, option (C) is correct."
  },
  {
    qNum: 57,
    exam: 'AIPMT 2011 Prelims',
    question: "Four electric charges $+q, +q, -q$ and $-q$ are placed at the corners of a square of side $2L$ (see figure). The electric potential at point $A$, midway between the two charges $+q$ and $+q$, is:",
    imageUrl: diagrams.elec_q57_diagram || null,
    image_url: diagrams.elec_q57_diagram || null,
    options: [
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{2q}{L}(1 + \\sqrt{5})$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{2q}{L}\\left(1 + \\frac{1}{\\sqrt{5}}\\right)$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{2q}{L}\\left(1 - \\frac{1}{\\sqrt{5}}\\right)$",
      "$\\text{zero}$"
    ],
    correctIndex: 2,
    solution: "1. The two $+q$ charges are on the same side of length $2L$. Point $A$ is at the midpoint, so distance to each $+q$ is $L$.\n2. The two $-q$ charges are on the opposite side. The distance from point $A$ to each $-q$ corner is:\n$$r = \\sqrt{(2L)^2 + L^2} = \\sqrt{5} L$$\n3. The total electric potential at point $A$ is the sum of potentials from all four charges:\n$$V_A = \\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{q}{L} + \\frac{q}{L} - \\frac{q}{\\sqrt{5}L} - \\frac{q}{\\sqrt{5}L}\\right] = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2q}{L}\\left(1 - \\frac{1}{\\sqrt{5}}\\right)$$\nHence, option (C) is correct."
  },
  {
    qNum: 58,
    exam: 'AIPMT 2010 Mains',
    question: "The electric field at a distance $\\frac{3R}{2}$ from the centre of a charged conducting spherical shell of radius $R$ is $E$. The electric field at a distance $\\frac{R}{2}$ from the centre of the sphere is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\text{zero}$",
      "$E$",
      "$\\frac{E}{2}$",
      "$\\frac{E}{3}$"
    ],
    correctIndex: 0,
    solution: "1. A conducting spherical shell holds all its excess electrostatic charge strictly on its outer surface.\n2. By Gauss's Law, the electrostatic field inside a conducting shell ($r < R$) is zero everywhere.\n3. Since distance $r = \\frac{R}{2} < R$ lies within the interior of the shell, the electric field at this point is zero.\nHence, option (A) is correct."
  },
  {
    qNum: 59,
    exam: 'AIPMT 2010 Prelims',
    question: "Two positive ions, each carrying a charge $q$, are separated by a distance $d$. If $F$ is the force of repulsion between the ions, the number of electrons missing from each ion will be ($e$ being the charge on an electron):",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{4\\pi\\varepsilon_0 F d^2}{e^2}$",
      "$\\sqrt{\\frac{4\\pi\\varepsilon_0 F e^2}{d^2}}$",
      "$\\sqrt{\\frac{4\\pi\\varepsilon_0 F d^2}{e^2}}$",
      "$\\frac{4\\pi\\varepsilon_0 F d^2}{q^2}$"
    ],
    correctIndex: 2,
    solution: "1. According to Coulomb's Law, the repulsive force between two charges $q$ separated by distance $d$ is:\n$$F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q^2}{d^2}$$\n2. Solving for $q$:\n$$q^2 = 4\\pi\\varepsilon_0 F d^2 \\implies q = \\sqrt{4\\pi\\varepsilon_0 F d^2}$$\n3. By quantization of charge, $q = n e$, where $n$ is the number of missing electrons:\n$$n = \\frac{q}{e} = \\sqrt{\\frac{4\\pi\\varepsilon_0 F d^2}{e^2}}$$\nHence, option (C) is correct."
  },
  {
    qNum: 60,
    exam: 'AIPMT 2010 Prelims',
    question: "A square surface of side $L\\text{ meter}$ in the plane of the paper is placed in a uniform electric field $E\\text{(volt/m)}$ acting along the same plane at an angle $\\theta$ with the horizontal side of the square as shown in figure. The electric flux linked to the surface, in units of volt m is:",
    imageUrl: diagrams.elec_q60_diagram || null,
    image_url: diagrams.elec_q60_diagram || null,
    options: [
      "$E L^2$",
      "$E L^2 \\cos\\theta$",
      "$E L^2 \\sin\\theta$",
      "$\\text{zero}$"
    ],
    correctIndex: 3,
    solution: "1. The electric flux through a planar area $\\vec{A}$ in an electric field $\\vec{E}$ is defined as:\n$$\\Phi = \\vec{E} \\cdot \\vec{A} = E A \\cos\\alpha$$\nwhere $\\alpha$ is the angle between the electric field vector $\\vec{E}$ and the normal to the surface (area vector $\\vec{A}$).\n2. Since the square surface and the electric field lines both lie completely in the plane of the paper, the normal to the surface is perpendicular to the paper ($\\alpha = 90^\\circ$).\n3. Therefore:\n$$\\Phi = E A \\cos 90^\\circ = 0$$\nHence, option (D) is correct."
  }
];

