// NEET Electrostatics PYQ Part 3: Q61 to Q95
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, 'electrostatics_diagram_urls.json');
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const ELECTROSTATICS_PYQ_PART3 = [
  {
    qNum: 61,
    exam: 'AIPMT 2009',
    question: "Three concentric spherical shells have radii $a, b$ and $c$ ($a < b < c$) and have surface charge densities $\\sigma, -\\sigma$ and $\\sigma$ respectively. If $V_A, V_B$ and $V_C$ denote the potentials of the three shells, then, for $c = a + b$, we have:",
    imageUrl: null,
    image_url: null,
    options: [
      "$V_C = V_B \\neq V_A$",
      "$V_C \\neq V_B \\neq V_A$",
      "$V_C = V_B = V_A$",
      "$V_C = V_A \\neq V_B$"
    ],
    correctIndex: 3,
    solution: "1. The electric potential on each spherical shell is given by:\n$$V_A = \\frac{1}{\\varepsilon_0}(\\sigma a - \\sigma b + \\sigma c) = \\frac{\\sigma}{\\varepsilon_0}(a - b + c)$$\n$$V_B = \\frac{\\sigma}{\\varepsilon_0}\\left(\\frac{a^2}{b} - b + c\\right)$$\n$$V_C = \\frac{\\sigma}{\\varepsilon_0}\\left(\\frac{a^2 - b^2 + c^2}{c}\\right)$$\n2. Substituting $c = a + b$ into $V_A$:\n$$V_A = \\frac{\\sigma}{\\varepsilon_0}(a - b + a + b) = \\frac{2\\sigma a}{\\varepsilon_0}$$\n3. In $V_C$, using $c^2 = (a + b)^2 = a^2 + b^2 + 2ab$:\n$$a^2 - b^2 + c^2 = a^2 - b^2 + a^2 + b^2 + 2ab = 2a(a + b) = 2ac$$\n$$V_C = \\frac{\\sigma}{\\varepsilon_0}\\left(\\frac{2ac}{c}\\right) = \\frac{2\\sigma a}{\\varepsilon_0}$$\n4. In $V_B$, $V_B = \\frac{\\sigma}{\\varepsilon_0}\\left(\\frac{a^2}{b} + a\\right) \\neq \\frac{2\\sigma a}{\\varepsilon_0}$.\n5. Therefore, $V_C = V_A \\neq V_B$.\nHence, option (D) is correct."
  },
  {
    qNum: 62,
    exam: 'AIPMT 2009',
    question: "The electric potential at a point $(x, y, z)$ is given by $V = -x^2y - xz^3 + 4$. The electric field at that point is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\vec{E} = \\hat{i} 2xy + \\hat{j}(x^2 + y^2) + \\hat{k}(3xz - y^2)$",
      "$\\vec{E} = \\hat{i} z^3 + \\hat{j} xyz + \\hat{k} z^2$",
      "$\\vec{E} = \\hat{i}(2xy - z^3) + \\hat{j} xy^2 + \\hat{k} 3z^2 x$",
      "$\\vec{E} = \\hat{i}(2xy + z^3) + \\hat{j} x^2 + \\hat{k} 3xz^2$"
    ],
    correctIndex: 3,
    solution: "1. The electric field is the negative gradient of the potential function:\n$$\\vec{E} = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)$$\n2. Computing the partial derivatives of $V = -x^2y - xz^3 + 4$:\n$$\\frac{\\partial V}{\\partial x} = -2xy - z^3 \\implies E_x = -(-2xy - z^3) = 2xy + z^3$$\n$$\\frac{\\partial V}{\\partial y} = -x^2 \\implies E_y = -(-x^2) = x^2$$\n$$\\frac{\\partial V}{\\partial z} = -3xz^2 \\implies E_z = -(-3xz^2) = 3xz^2$$\n3. Combining the components:\n$$\\vec{E} = \\hat{i}(2xy + z^3) + \\hat{j} x^2 + \\hat{k} 3xz^2$$\nHence, option (D) is correct."
  },
  {
    qNum: 63,
    exam: 'AIPMT 2008',
    question: "A thin conducting ring of radius $R$ is given a charge $+Q$. The electric field at the centre $O$ of the ring due to the charge on the part $AKB$ of the ring is $E$. The electric field at the centre due to the charge on the part $ACDB$ of the ring is:",
    imageUrl: diagrams.elec_q63_diagram || null,
    image_url: diagrams.elec_q63_diagram || null,
    options: [
      "$E\\text{ along } KO$",
      "$3E\\text{ along } OK$",
      "$3E\\text{ along } KO$",
      "$E\\text{ along } OK$"
    ],
    correctIndex: 3,
    solution: "1. Due to complete radial symmetry, the total electric field at the centre of a uniformly charged circular ring is zero:\n$$\\vec{E}_{\\text{total}} = \\vec{E}_{\\text{AKB}} + \\vec{E}_{\\text{ACDB}} = 0$$\n$$\\vec{E}_{\\text{ACDB}} = -\\vec{E}_{\\text{AKB}}$$\n2. The field due to the positively charged segment $AKB$ points away from arc $AKB$, which is directed downward along the line $OK$ from $K$ towards $D$.\n3. To cancel this field, the field due to the remaining arc $ACDB$ must have the exact same magnitude $E$ and point in the opposite direction (upwards), which is along $OK$.\nHence, option (D) is correct."
  },
  {
    qNum: 64,
    exam: 'AIPMT 2008',
    question: "The electric potential at a point in free space due to charge $Q\\text{ coulomb}$ is $Q \\times 10^{11}\\text{ volts}$. The electric field at that point is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$4\\pi\\varepsilon_0 Q \\times 10^{20}\\text{ volt/m}$",
      "$12\\pi\\varepsilon_0 Q \\times 10^{22}\\text{ volt/m}$",
      "$4\\pi\\varepsilon_0 Q \\times 10^{22}\\text{ volt/m}$",
      "$12\\pi\\varepsilon_0 Q \\times 10^{20}\\text{ volt/m}$"
    ],
    correctIndex: 2,
    solution: "1. The electric potential due to a point charge $Q$ at distance $r$ is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r} = Q \\times 10^{11}\\text{ V}$$\n$$\\frac{1}{r} = 4\\pi\\varepsilon_0 \\times 10^{11}$$\n2. The electric field at distance $r$ is:\n$$E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2} = \\frac{V}{r}$$\n$$E = (Q \\times 10^{11})(4\\pi\\varepsilon_0 \\times 10^{11}) = 4\\pi\\varepsilon_0 Q \\times 10^{22}\\text{ volt/m}$$\nHence, option (C) is correct."
  },
  {
    qNum: 65,
    exam: 'AIPMT 2007',
    question: "A hollow cylinder has a charge $q\\text{ coulomb}$ within it. If $\\phi$ is the electric flux in units of volt-metre associated with the curved surface $B$, the flux linked with the plane surface $A$ in units of V-m will be:",
    imageUrl: diagrams.elec_q65_diagram || null,
    image_url: diagrams.elec_q65_diagram || null,
    options: [
      "$\\frac{q}{2\\varepsilon_0}$",
      "$\\frac{\\phi}{3}$",
      "$\\frac{q}{\\varepsilon_0} - \\phi$",
      "$\\frac{1}{2}\\left(\\frac{q}{\\varepsilon_0} - \\phi\\right)$"
    ],
    correctIndex: 3,
    solution: "1. By Gauss's Law, the total electric flux emerging from the entire hollow cylinder is:\n$$\\Phi_{\\text{total}} = \\frac{q}{\\varepsilon_0}$$\n2. The total flux is the sum of fluxes through the curved surface $B$ and the two flat circular ends $A$ and $C$:\n$$\\Phi_{\\text{total}} = \\Phi_A + \\Phi_B + \\Phi_C$$\n3. By symmetry between the two identical flat ends, $\\Phi_A = \\Phi_C$:\n$$\\frac{q}{\\varepsilon_0} = 2\\Phi_A + \\phi$$\n$$2\\Phi_A = \\frac{q}{\\varepsilon_0} - \\phi \\implies \\Phi_A = \\frac{1}{2}\\left(\\frac{q}{\\varepsilon_0} - \\phi\\right)$$\nHence, option (D) is correct."
  },
  {
    qNum: 66,
    exam: 'AIPMT 2007',
    question: "Charges $+q$ and $-q$ are placed at points $A$ and $B$ respectively which are a distance $2L$ apart, $C$ is the midpoint between $A$ and $B$. The work done in moving a charge $+Q$ along the semicircle $CRD$ is:",
    imageUrl: diagrams.elec_q66_diagram || null,
    image_url: diagrams.elec_q66_diagram || null,
    options: [
      "$\\frac{qQ}{2\\pi\\varepsilon_0 L}$",
      "$\\frac{qQ}{6\\pi\\varepsilon_0 L}$",
      "$-\\frac{qQ}{6\\pi\\varepsilon_0 L}$",
      "$\\frac{qQ}{4\\pi\\varepsilon_0 L}$"
    ],
    correctIndex: 2,
    solution: "1. Point $C$ is the midpoint of $AB$, so $AC = L$ and $BC = L$. Potential at $C$ is:\n$$V_C = \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q}{L} - \\frac{q}{L}\\right) = 0$$\n2. Semicircle $CRD$ has center $B$ and radius $L$. Point $D$ lies on the line $AB$ extended beyond $B$.\n3. Distances from the charges to point $D$:\n$$r_{BD} = L, \\quad r_{AD} = AB + BD = 2L + L = 3L$$\n4. Potential at point $D$:\n$$V_D = \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q}{3L} - \\frac{q}{L}\\right) = \\frac{q}{4\\pi\\varepsilon_0 L}\\left(\\frac{1}{3} - 1\\right) = -\\frac{2q}{12\\pi\\varepsilon_0 L} = -\\frac{q}{6\\pi\\varepsilon_0 L}$$\n5. Work done in moving charge $+Q$ from $C$ to $D$:\n$$W = Q(V_D - V_C) = Q\\left(-\\frac{q}{6\\pi\\varepsilon_0 L} - 0\\right) = -\\frac{qQ}{6\\pi\\varepsilon_0 L}$$\nHence, option (C) is correct."
  },
  {
    qNum: 67,
    exam: 'AIPMT 2007',
    question: "Three point charges $+q, -2q$ and $+q$ are placed at points $(x = 0, y = a, z = 0)$, $(x = 0, y = 0, z = 0)$ and $(x = a, y = 0, z = 0)$ respectively. The magnitude and direction of the electric dipole moment vector of this charge assembly are:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\sqrt{2}qa\\text{ along the line joining points } (x = 0, y = 0, z = 0)\\text{ and } (x = a, y = a, z = 0)$",
      "$qa\\text{ along the line joining points } (x = 0, y = 0, z = 0)\\text{ and } (x = a, y = a, z = 0)$",
      "$\\sqrt{2}qa\\text{ along } +x\\text{ direction}$",
      "$\\sqrt{2}qa\\text{ along } +y\\text{ direction.}$"
    ],
    correctIndex: 0,
    solution: "1. The charge $-2q$ at the origin $(0, 0, 0)$ can be decomposed into two separate charges of $-q$ each.\n2. One $-q$ forms a dipole with $+q$ at $(a, 0, 0)$, giving dipole moment:\n$$\\vec{p}_1 = q a \\hat{i}$$\n3. The other $-q$ forms a dipole with $+q$ at $(0, a, 0)$, giving dipole moment:\n$$\\vec{p}_2 = q a \\hat{j}$$\n4. The resultant dipole moment vector is:\n$$\\vec{p} = \\vec{p}_1 + \\vec{p}_2 = q a \\hat{i} + q a \\hat{j}$$\n5. Magnitude:\n$$|\\vec{p}| = \\sqrt{(qa)^2 + (qa)^2} = \\sqrt{2} q a$$\n6. The direction is along the unit vector $\\frac{\\hat{i} + \\hat{j}}{\\sqrt{2}}$, which corresponds to the line joining $(0, 0, 0)$ to $(a, a, 0)$.\nHence, option (A) is correct."
  },
  {
    qNum: 68,
    exam: 'AIPMT 2006',
    question: "An electric dipole of moment $\\vec{p}$ is lying along a uniform electric field $\\vec{E}$. The work done in rotating the dipole by $90^\\circ$ is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$pE$",
      "$\\sqrt{2}pE$",
      "$pE/2$",
      "$2pE$"
    ],
    correctIndex: 0,
    solution: "1. The work done in rotating an electric dipole in a uniform electric field from angle $\\theta_1$ to $\\theta_2$ is:\n$$W = p E(\\cos\\theta_1 - \\cos\\theta_2)$$\n2. Initially lying along the field: $\\theta_1 = 0^\\circ$, and finally rotated by $90^\\circ$: $\\theta_2 = 90^\\circ$:\n$$W = p E(\\cos 0^\\circ - \\cos 90^\\circ) = p E(1 - 0) = pE$$\nHence, option (A) is correct."
  },
  {
    qNum: 69,
    exam: 'AIPMT 2006',
    question: "A square surface of side $L\\text{ metres}$ is in the plane of the paper. A uniform electric field $\\vec{E}\\text{ (volt/m)}$, also in the plane of the paper is limited only to the lower half of the square surface (see figure). The electric flux in SI units associated with the surface is:",
    imageUrl: diagrams.elec_q69_diagram || null,
    image_url: diagrams.elec_q69_diagram || null,
    options: [
      "$E L^2$",
      "$E L^2 / 2\\varepsilon_0$",
      "$E L^2 / 2$",
      "$\\text{zero}$"
    ],
    correctIndex: 3,
    solution: "1. Electric flux is given by the dot product of the electric field and the surface area vector:\n$$\\Phi = \\vec{E} \\cdot \\vec{A} = E A \\cos\\theta$$\n2. Since the square surface and the electric field lines are both in the plane of the paper, the surface normal (area vector $\\vec{A}$) is perpendicular to the paper.\n3. The angle between $\\vec{E}$ and $\\vec{A}$ is $\\theta = 90^\\circ$.\n4. Therefore:\n$$\\Phi = E A \\cos 90^\\circ = 0$$\nHence, option (D) is correct."
  },
  {
    qNum: 70,
    exam: 'AIPMT 2005',
    question: "As per the diagram a point charge $+q$ is placed at the origin $O$. Work done in taking another point charge $-Q$ from the point $A$ [coordinates $(0, a)$] to another point $B$ [coordinates $(a, 0)$] is:",
    imageUrl: diagrams.elec_q70_diagram || null,
    image_url: diagrams.elec_q70_diagram || null,
    options: [
      "$\\text{zero}$",
      "$\\left(\\frac{qQ}{4\\pi\\varepsilon_0}\\frac{1}{a^2}\\right) \\cdot \\sqrt{2}a$",
      "$\\left(\\frac{-qQ}{4\\pi\\varepsilon_0}\\frac{1}{a^2}\\right) \\cdot \\sqrt{2}a$",
      "$\\left(\\frac{qQ}{4\\pi\\varepsilon_0}\\frac{1}{a^2}\\right) \\cdot \\frac{a}{\\sqrt{2}}$"
    ],
    correctIndex: 0,
    solution: "1. The electric potential due to charge $+q$ at origin $O$ at distance $r$ is $V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$.\n2. Distance of point $A(0, a)$ from origin is $r_A = a \\implies V_A = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{a}$.\n3. Distance of point $B(a, 0)$ from origin is $r_B = a \\implies V_B = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{a}$.\n4. Since $V_A = V_B$, the potential difference between $A$ and $B$ is zero.\n5. Therefore, work done $W = -Q(V_B - V_A) = 0$.\nHence, option (A) is correct."
  },
  {
    qNum: 71,
    exam: 'AIPMT 2005',
    question: "Two charges $q_1$ and $q_2$ are placed $30\\text{ cm}$ apart, as shown in the figure. A third charge $q_3$ is moved along the arc of a circle of radius $40\\text{ cm}$ from $C$ to $D$. The change in the potential energy of the system is $\\frac{q_3}{4\\pi\\varepsilon_0} k$ where $k$ is:",
    imageUrl: diagrams.elec_q71_diagram || null,
    image_url: diagrams.elec_q71_diagram || null,
    options: [
      "$8q_1$",
      "$6q_1$",
      "$8q_2$",
      "$6q_2$"
    ],
    correctIndex: 2,
    solution: "1. The arc $CD$ is part of a circle centered at $A$ (where charge $q_1$ is located) with radius $40\\text{ cm}$.\n2. Since $AC = AD = 40\\text{ cm}$, the distance from $q_1$ to $q_3$ does not change, so $\\Delta U_{13} = 0$.\n3. The change in potential energy is solely due to the interaction between $q_2$ (at $B$) and $q_3$:\n- Initial distance: $BC = \\sqrt{AB^2 + AC^2} = \\sqrt{30^2 + 40^2} = 50\\text{ cm} = 0.5\\text{ m}$\n- Final distance: $BD = AD - AB = 40 - 30 = 10\\text{ cm} = 0.1\\text{ m}$\n4. The change in potential energy is:\n$$\\Delta U = U_f - U_i = \\frac{q_2 q_3}{4\\pi\\varepsilon_0}\\left(\\frac{1}{0.1} - \\frac{1}{0.5}\\right) = \\frac{q_2 q_3}{4\\pi\\varepsilon_0}(10 - 2) = \\frac{q_3}{4\\pi\\varepsilon_0}(8q_2)$$\n5. Comparing with $\\frac{q_3}{4\\pi\\varepsilon_0} k$, we get $k = 8q_2$.\nHence, option (C) is correct."
  },
  {
    qNum: 72,
    exam: 'AIPMT 2004',
    question: "A bullet of mass $2\\text{ g}$ is having a charge of $2\\ \\mu\\text{C}$. Through what potential difference must it be accelerated, starting from rest, to acquire a speed of $10\\text{ m/s}$ ?",
    imageUrl: null,
    image_url: null,
    options: [
      "$5\\text{ kV}$",
      "$50\\text{ kV}$",
      "$5\\text{ V}$",
      "$50\\text{ V}$"
    ],
    correctIndex: 1,
    solution: "1. By the work-energy theorem, the kinetic energy gained equals the work done by the electric field:\n$$q V = \\frac{1}{2} m v^2$$\n2. Given: $m = 2\\text{ g} = 2 \\times 10^{-3}\\text{ kg}$, $q = 2\\ \\mu\\text{C} = 2 \\times 10^{-6}\\text{ C}$, and $v = 10\\text{ m/s}$:\n$$(2 \\times 10^{-6}) V = \\frac{1}{2}(2 \\times 10^{-3})(10)^2 = 10^{-3} \\times 100 = 0.1\\text{ J}$$\n3. Solving for $V$:\n$$V = \\frac{0.1}{2 \\times 10^{-6}} = 50,000\\text{ V} = 50\\text{ kV}$$\nHence, option (B) is correct."
  },
  {
    qNum: 73,
    exam: 'AIPMT 2004',
    question: "An electric dipole has the magnitude of its charge as $q$ and its dipole moment is $p$. It is placed in a uniform electric field $E$. If its dipole moment is along the direction of the field, the force on it and its potential energy are respectively:",
    imageUrl: null,
    image_url: null,
    options: [
      "$2q.E\\text{ and minimum}$",
      "$q.E\\text{ and } p.E$",
      "$\\text{zero and minimum}$",
      "$q.E\\text{ and maximum}$"
    ],
    correctIndex: 2,
    solution: "1. In any uniform electric field, the two charges $+q$ and $-q$ experience equal and opposite electrostatic forces:\n$$\\vec{F}_{\\text{net}} = q\\vec{E} + (-q\\vec{E}) = 0$$\n2. When the dipole moment is aligned with the electric field ($\\theta = 0^\\circ$):\n$$U = -p E \\cos 0^\\circ = -pE$$\nwhich represents the minimum potential energy (position of stable equilibrium).\nHence, option (C) is correct."
  },
  {
    qNum: 74,
    exam: 'AIPMT 2003',
    question: "A charge $q$ is located at the centre of a cube. The electric flux through any face is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{2\\pi q}{6(4\\pi\\varepsilon_0)}$",
      "$\\frac{4\\pi q}{6(4\\pi\\varepsilon_0)}$",
      "$\\frac{\\pi q}{6(4\\pi\\varepsilon_0)}$",
      "$\\frac{q}{6(4\\pi\\varepsilon_0)}$"
    ],
    correctIndex: 1,
    solution: "1. According to Gauss's Law, total flux through the cube enclosing charge $q$ is:\n$$\\Phi_{\\text{total}} = \\frac{q}{\\varepsilon_0}$$\n2. By symmetry, the flux is distributed equally through all 6 faces:\n$$\\Phi_{\\text{face}} = \\frac{1}{6}\\frac{q}{\\varepsilon_0} = \\frac{4\\pi q}{6(4\\pi\\varepsilon_0)}$$\nHence, option (B) is correct."
  },
  {
    qNum: 75,
    exam: 'AIPMT 2002',
    question: "Identical charges ($-q$) are placed at each corners of cube of side $b$ then electrostatic potential energy of charge ($+q$) which is placed at centre of cube will be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{-4\\sqrt{2} q^2}{\\pi\\varepsilon_0 b}$",
      "$\\frac{-8\\sqrt{2} q^2}{\\pi\\varepsilon_0 b}$",
      "$\\frac{-4 q^2}{\\sqrt{3}\\pi\\varepsilon_0 b}$",
      "$\\frac{8\\sqrt{2} q^2}{4\\pi\\varepsilon_0 b}$"
    ],
    correctIndex: 2,
    solution: "1. In a cube of side $b$, the length of the body diagonal is $\\sqrt{3} b$.\n2. The distance from the centre of the cube to each of the 8 corners is:\n$$r = \\frac{\\sqrt{3} b}{2}$$\n3. There are 8 identical charges of $-q$ at the corners interacting with $+q$ at the centre:\n$$U = 8 \\times \\left[\\frac{1}{4\\pi\\varepsilon_0}\\frac{(+q)(-q)}{r}\\right] = -\\frac{8 q^2}{4\\pi\\varepsilon_0 \\left(\\frac{\\sqrt{3}b}{2}\\right)} = -\\frac{16 q^2}{4\\pi\\varepsilon_0 \\sqrt{3} b} = -\\frac{4 q^2}{\\sqrt{3}\\pi\\varepsilon_0 b}$$\nHence, option (C) is correct."
  },
  {
    qNum: 76,
    exam: 'AIPMT 2002',
    question: "Some charge is being given to a conductor. Then its potential is:",
    imageUrl: null,
    image_url: null,
    options: [
      "maximum at surface",
      "maximum at centre",
      "remain same throughout the conductor",
      "maximum somewhere between surface and centre."
    ],
    correctIndex: 2,
    solution: "1. For a charged conductor in electrostatic equilibrium, the electric field inside the conductor is zero everywhere ($E = 0$).\n2. Since $E = -\\frac{dV}{dr} = 0$, the electrostatic potential has the same constant value throughout the entire interior as on its surface.\nHence, option (C) is correct."
  },
  {
    qNum: 77,
    exam: 'AIPMT 2001',
    question: "A dipole of dipole moment $\\vec{p}$ is placed in uniform electric field $\\vec{E}$ then torque acting on it is given by:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\vec{\\tau} = \\vec{p} \\cdot \\vec{E}$",
      "$\\vec{\\tau} = \\vec{p} \\times \\vec{E}$",
      "$\\vec{\\tau} = \\vec{p} + \\vec{E}$",
      "$\\vec{\\tau} = \\vec{p} - \\vec{E}$"
    ],
    correctIndex: 1,
    solution: "1. The torque acting on an electric dipole of moment $\\vec{p}$ in a uniform electric field $\\vec{E}$ is defined by the cross product:\n$$\\vec{\\tau} = \\vec{p} \\times \\vec{E}$$\nHence, option (B) is correct."
  },
  {
    qNum: 78,
    exam: 'AIPMT 2001',
    question: "A charge $Q\\ \\mu\\text{C}$ is placed at the centre of a cube, the flux coming out from each face will be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{Q}{6\\varepsilon_0} \\times 10^{-6}$",
      "$\\frac{Q}{6\\varepsilon_0} \\times 10^{-3}$",
      "$\\frac{Q}{24\\varepsilon_0}$",
      "$\\frac{Q}{8\\varepsilon_0}$"
    ],
    correctIndex: 0,
    solution: "1. Charge enclosed: $q = Q\\ \\mu\\text{C} = Q \\times 10^{-6}\\text{ C}$.\n2. Total flux through all 6 faces of the cube is $\\Phi = \\frac{q}{\\varepsilon_0}$.\n3. The flux through each individual face is:\n$$\\Phi_{\\text{face}} = \\frac{1}{6}\\frac{q}{\\varepsilon_0} = \\frac{Q}{6\\varepsilon_0} \\times 10^{-6}$$\nHence, option (A) is correct."
  },
  {
    qNum: 79,
    exam: 'AIPMT 2000',
    question: "A charge $Q$ is situated at the corner of a cube, the electric flux passed through all the six faces of the cube is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{Q}{6\\varepsilon_0}$",
      "$\\frac{Q}{8\\varepsilon_0}$",
      "$\\frac{Q}{\\varepsilon_0}$",
      "$\\frac{Q}{2\\varepsilon_0}$"
    ],
    correctIndex: 1,
    solution: "1. A charge at a corner of a cube is symmetrically shared by 8 identical cubes meeting at that corner.\n2. By Gauss's Law, the total electric flux emanating from charge $Q$ is $\\frac{Q}{\\varepsilon_0}$.\n3. Therefore, the flux passing through one such cube is:\n$$\\Phi = \\frac{Q}{8\\varepsilon_0}$$\nHence, option (B) is correct."
  },
  {
    qNum: 80,
    exam: 'AIPMT 2000',
    question: "Electric field at centre $O$ of semicircle of radius $a$ having linear charge density $\\lambda$ given as:",
    imageUrl: diagrams.elec_q80_diagram || null,
    image_url: diagrams.elec_q80_diagram || null,
    options: [
      "$\\frac{2\\lambda}{\\varepsilon_0 a}$",
      "$\\frac{\\lambda\\pi}{\\varepsilon_0 a}$",
      "$\\frac{\\lambda}{2\\pi\\varepsilon_0 a}$",
      "$\\frac{\\lambda}{\\pi\\varepsilon_0 a}$"
    ],
    correctIndex: 2,
    solution: "1. For a uniformly charged semicircular arc of radius $a$ and linear charge density $\\lambda$, the electric field at the centre of curvature is directed along the symmetry axis.\n2. The magnitude of the electric field is:\n$$E = \\frac{2 k \\lambda}{a} = \\frac{2 \\lambda}{4\\pi\\varepsilon_0 a} = \\frac{\\lambda}{2\\pi\\varepsilon_0 a}$$\nHence, option (C) is correct."
  },
  {
    qNum: 81,
    exam: 'AIPMT 1999',
    question: "When air is replaced by a dielectric medium of constant $K$, the maximum force of attraction between two charges, separated by a distance:",
    imageUrl: null,
    image_url: null,
    options: [
      "decreases $K$ times",
      "increase $K$ times",
      "remains unchanged",
      "becomes $\\frac{1}{K^2}$ times"
    ],
    correctIndex: 0,
    solution: "1. The electrostatic force between two charges in a medium of dielectric constant $K$ is:\n$$F = \\frac{F_0}{K}$$\nwhere $F_0$ is the force in vacuum/air.\n2. Therefore, when air is replaced by a dielectric medium of constant $K$, the force decreases by a factor of $K$ (decreases $K$ times).\nHence, option (A) is correct."
  },
  {
    qNum: 82,
    exam: 'AIPMT 1999',
    question: "In bringing an electron towards another electron, the electrostatic potential energy of the system:",
    imageUrl: null,
    image_url: null,
    options: [
      "decreases",
      "increases",
      "remains same",
      "becomes zero"
    ],
    correctIndex: 1,
    solution: "1. The electrostatic potential energy of two like charges (both negative) separated by distance $r$ is:\n$$U = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(-e)(-e)}{r} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r}$$\n2. As the two electrons are brought closer together, distance $r$ decreases.\n3. Since $U > 0$ and inversely proportional to $r$, decreasing $r$ increases the potential energy ($U$).\nHence, option (B) is correct."
  },
  {
    qNum: 83,
    exam: 'AIPMT 1999',
    question: "When a proton is accelerated through $1\\text{ V}$ its kinetic energy will be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$1540\\text{ eV}$",
      "$13.6\\text{ eV}$",
      "$1\\text{ eV}$",
      "$\\text{zero}$"
    ],
    correctIndex: 2,
    solution: "1. The charge on a proton is $q = +e = 1.6 \\times 10^{-19}\\text{ C}$.\n2. The kinetic energy acquired by a charge $q$ accelerated through potential difference $V$ is:\n$$K = q V = (1 e) \\times (1\\text{ V}) = 1\\text{ eV}$$\nHence, option (C) is correct."
  },
  {
    qNum: 84,
    exam: 'AIPMT 1998',
    question: "A point $Q$ lies on the perpendicular bisector of an electrical dipole of dipole moment $p$. If the distance of $Q$ from the dipole is $r$ (much larger than the size of the dipole) then electric field at $Q$ is proportional to:",
    imageUrl: null,
    image_url: null,
    options: [
      "$p^{-1}\\text{ and } r^{-2}$",
      "$p\\text{ and } r^{-2}$",
      "$p^2\\text{ and } r^{-3}$",
      "$p\\text{ and } r^{-3}$"
    ],
    correctIndex: 3,
    solution: "1. The perpendicular bisector of a dipole corresponds to its equatorial line.\n2. For a short electric dipole ($r \\gg 2a$), the electric field at an equatorial point is:\n$$E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p}{r^3}$$\n3. Therefore, $E$ is proportional to $p$ and $r^{-3}$.\nHence, option (D) is correct."
  },
  {
    qNum: 85,
    exam: 'AIPMT 1998',
    question: "A particle of mass $m$ and charge $q$ is placed at rest in a uniform electric field $E$ and then released. The kinetic energy attained by the particle after moving a distance $y$ is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$q E y^2$",
      "$q E^2 y$",
      "$q E y$",
      "$q^2 E y$"
    ],
    correctIndex: 2,
    solution: "1. The electric force acting on the particle is $F = q E$.\n2. Starting from rest, the acceleration is $a = \\frac{qE}{m}$.\n3. Using the work-energy theorem, the kinetic energy attained after moving distance $y$ equals the work done by the electrostatic force:\n$$K = F y = q E y$$\nHence, option (C) is correct."
  },
  {
    qNum: 86,
    exam: 'AIPMT 1998',
    question: "A hollow insulated conducting sphere is given a positive charge of $10\\ \\mu\\text{C}$. What will be the electric field at the centre of the sphere if its radius is $2\\text{ m}$?",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\text{Zero}$",
      "$5\\ \\mu\\text{C m}^{-2}$",
      "$20\\ \\mu\\text{C m}^{-2}$",
      "$8\\ \\mu\\text{C m}^{-2}$"
    ],
    correctIndex: 0,
    solution: "1. All electric charge on a conducting sphere resides strictly on its outer surface.\n2. The electric field everywhere inside a charged hollow conductor is identically zero ($E = 0$).\n3. Therefore, the electric field at the centre of the sphere is zero.\nHence, option (A) is correct."
  },
  {
    qNum: 87,
    exam: 'AIPMT 1996',
    question: "A point charge $+q$ is placed at the centre of a cube of side $l$. The electric flux emerging from the cube is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{6 q l^2}{\\varepsilon_0}$",
      "$\\frac{q}{6 l^2 \\varepsilon_0}$",
      "$\\text{zero}$",
      "$\\frac{q}{\\varepsilon_0}$"
    ],
    correctIndex: 3,
    solution: "1. According to Gauss's Law, the total electric flux emerging from any closed Gaussian surface enclosing charge $q$ is:\n$$\\Phi = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} = \\frac{q}{\\varepsilon_0}$$\n2. The flux depends only on the enclosed charge, regardless of the side length $l$ or shape of the cube.\nHence, option (D) is correct."
  },
  {
    qNum: 88,
    exam: 'AIPMT 1995',
    question: "Two metallic spheres of radii $1\\text{ cm}$ and $2\\text{ cm}$ are given charges $10^{-2}\\text{ C}$ and $5 \\times 10^{-2}\\text{ C}$ respectively. If they are connected by a conducting wire, the final charge on the smaller sphere is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$3 \\times 10^{-2}\\text{ C}$",
      "$4 \\times 10^{-2}\\text{ C}$",
      "$1 \\times 10^{-2}\\text{ C}$",
      "$2 \\times 10^{-2}\\text{ C}$"
    ],
    correctIndex: 3,
    solution: "1. Total charge of the system:\n$$Q = q_1 + q_2 = (1 \\times 10^{-2}) + (5 \\times 10^{-2}) = 6 \\times 10^{-2}\\text{ C}$$\n2. When connected by a conducting wire, charge distributes proportionally to the radii:\n$$q_1' = \\frac{r_1}{r_1 + r_2} Q$$\n3. For the smaller sphere ($r_1 = 1\\text{ cm}, r_2 = 2\\text{ cm}$):\n$$q_1' = \\frac{1}{1 + 2} \\times (6 \\times 10^{-2}\\text{ C}) = 2 \\times 10^{-2}\\text{ C}$$\nHence, option (D) is correct."
  },
  {
    qNum: 89,
    exam: 'AIPMT 1995',
    question: "There is an electric field $E$ in $x$-direction. If the work done on moving a charge of $0.2\\text{ C}$ through a distance of $2\\text{ m}$ along a line making an angle $60^\\circ$ with $x$-axis is $4\\text{ J}$, then what is the value of $E$?",
    imageUrl: null,
    image_url: null,
    options: [
      "$5\\text{ N/C}$",
      "$20\\text{ N/C}$",
      "$\\sqrt{3}\\text{ N/C}$",
      "$4\\text{ N/C}$"
    ],
    correctIndex: 1,
    solution: "1. Work done by an electric field in displacing a charge $q$ by displacement $\\vec{d}$ is:\n$$W = q \\vec{E} \\cdot \\vec{d} = q E d \\cos\\theta$$\n2. Given: $W = 4\\text{ J}$, $q = 0.2\\text{ C}$, $d = 2\\text{ m}$, and $\\theta = 60^\\circ$:\n$$4 = (0.2) \\times E \\times 2 \\times \\cos 60^\\circ = 0.4 \\times E \\times 0.5 = 0.2 E$$\n3. Solving for $E$:\n$$E = \\frac{4}{0.2} = 20\\text{ N/C}$$\nHence, option (B) is correct."
  },
  {
    qNum: 90,
    exam: 'AIPMT 1995',
    question: "A charge $q$ is placed at the centre of the line joining two exactly equal positive charges $Q$. The system of three charges will be in equilibrium, if $q$ is equal to:",
    imageUrl: null,
    image_url: null,
    options: [
      "$-Q$",
      "$Q/2$",
      "$-Q/4$",
      "$+Q$"
    ],
    correctIndex: 2,
    solution: "1. Let the distance between the two equal positive charges $Q$ be $2r$. The charge $q$ is placed at distance $r$ from each $Q$.\n2. For the entire system to be in equilibrium, the net force on any of the outer charges $Q$ must be zero:\n$$\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{(2r)^2} + \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q q}{r^2} = 0$$\n$$\\frac{Q^2}{4r^2} + \\frac{Qq}{r^2} = 0 \\implies \\frac{Q}{4} + q = 0 \\implies q = -\\frac{Q}{4}$$\nHence, option (C) is correct."
  },
  {
    qNum: 91,
    exam: 'AIPMT 1994',
    question: "An electric dipole of moment $p$ is placed in the position of stable equilibrium in uniform electric field of intensity $E$. This is rotated through an angle $\theta$ from the initial position. The potential energy of the electric dipole in the final position is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$-pE\\cos\\theta$",
      "$pE(1 - \\cos\\theta)$",
      "$pE\\cos\\theta$",
      "$pE\\sin\\theta$"
    ],
    correctIndex: 1,
    solution: "1. In stable equilibrium, the dipole moment is aligned with the electric field ($\\theta_1 = 0^\\circ$), with initial potential energy $U_1 = -pE$.\n2. The potential energy acquired by the dipole relative to the stable equilibrium state is the work done in rotating it through angle $\\theta$:\n$$U(\\theta) - U(0) = -pE\\cos\\theta - (-pE) = pE(1 - \\cos\\theta)$$\nHence, option (B) is correct."
  },
  {
    qNum: 92,
    exam: 'AIPMT 1994',
    question: "The given figure gives electric lines of force due to two charges $q_1$ and $q_2$. What are the signs of the two charges?",
    imageUrl: diagrams.elec_q92_diagram || null,
    image_url: diagrams.elec_q92_diagram || null,
    options: [
      "$q_1\\text{ is positive but } q_2\\text{ is negative}$",
      "$q_1\\text{ is negative but } q_2\\text{ is positive}$",
      "both are negative",
      "both are positive"
    ],
    correctIndex: 2,
    solution: "1. By convention, electric field lines originate from positive charges and terminate on negative charges.\n2. In the provided figure, the electric field lines are pointing inwards towards both charges $q_1$ and $q_2$.\n3. Therefore, both $q_1$ and $q_2$ must be negative charges.\nHence, option (C) is correct."
  },
  {
    qNum: 93,
    exam: 'AIPMT 1994',
    question: "Charge $q_2$ is at the centre of a circular path with radius $r$. Work done in carrying charge $q_1$, once around this equipotential path, would be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{1}{4\\pi\\varepsilon_0} \\times \\frac{q_1 q_2}{r^2}$",
      "$\\frac{1}{4\\pi\\varepsilon_0} \\times \\frac{q_1 q_2}{r}$",
      "$\\text{zero}$",
      "$\\text{infinite}$"
    ],
    correctIndex: 2,
    solution: "1. Every point on a circle of radius $r$ centered on charge $q_2$ has the same electric potential:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_2}{r} = \\text{constant}$$\n2. The circular path is an equipotential surface, so $\\Delta V = 0$.\n3. Moreover, the electrostatic force is conservative, so the work done over any closed loop is zero:\n$$W = \\oint q_1 \\vec{E} \\cdot d\\vec{r} = 0$$\nHence, option (C) is correct."
  },
  {
    qNum: 94,
    exam: 'AIPMT 1994',
    question: "A hollow metallic sphere of radius $10\\text{ cm}$ is charged such that potential of its surface is $80\\text{ V}$. The potential at the centre of the sphere would be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$80\\text{ V}$",
      "$800\\text{ V}$",
      "$\\text{zero}$",
      "$8\\text{ V}$"
    ],
    correctIndex: 0,
    solution: "1. Inside a hollow metallic sphere, the electric field is zero everywhere ($E = 0$).\n2. Since $E = -\\frac{dV}{dr} = 0$, the electrostatic potential remains uniform and constant from the center up to the surface:\n$$V_{\\text{centre}} = V_{\\text{surface}} = 80\\text{ V}$$\nHence, option (A) is correct."
  },
  {
    qNum: 95,
    exam: 'AIPMT 1988',
    question: "Point charges $+4q, -q$ and $+4q$ are kept on the X-axis at point $x = 0, x = a$ and $x = 2a$ respectively. Then:",
    imageUrl: null,
    image_url: null,
    options: [
      "only $-q$ is in stable equilibrium",
      "all the charges are in stable equilibrium",
      "all of the charges are in unstable equilibrium",
      "none of the charges is in equilibrium"
    ],
    correctIndex: 2,
    solution: "1. Checking net force on $-q$ at $x = a$:\n$$F = \\frac{k(4q)q}{a^2} - \\frac{k(4q)q}{a^2} = 0$$\n2. Checking net force on $+4q$ at $x = 0$:\n$$F = \\frac{k(4q)q}{a^2} - \\frac{k(4q)(4q)}{(2a)^2} = \\frac{4kq^2}{a^2} - \\frac{4kq^2}{a^2} = 0$$\n3. Similarly, net force on $+4q$ at $x = 2a$ is zero. All three charges are in electrostatic equilibrium.\n4. According to Earnshaw's Theorem, a system of stationary point charges interacting solely via inverse-square electrostatic forces cannot be in stable equilibrium.\n5. If $-q$ is displaced slightly along the X-axis, the attractive force towards the nearer $+4q$ charge increases, pulling it further from its equilibrium position.\n6. Therefore, all of the charges are in unstable equilibrium.\nHence, option (C) is correct."
  }
];

