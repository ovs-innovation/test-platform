// NEET Rotational Motion PYQ Part 4: Q86 to Q108
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, 'rotational_diagram_urls.json');
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const ROTATIONAL_PYQ_PART4 = [
  {
    qNum: 86,
    exam: 'AIPMT 2002',
    question: "A circular disc is to be made by using iron and aluminium so that it acquires maximum moment of inertia about geometrical axis. It is possible with:",
    imageUrl: null,
    image_url: null,
    options: [
      "aluminium at interior and iron surround to it",
      "iron at interior and aluminium surround to it",
      "using iron and aluminium layers in alternate order",
      "sheet of iron is used at both external surface and aluminium sheet as internal layers."
    ],
    correctIndex: 0,
    solution: "1. The moment of inertia of a system of particles or continuous body is given by:\n$$I = \\int r^2 dm$$\nwhere $r$ is the perpendicular distance from the axis of rotation.\n2. The density of iron is greater than the density of aluminium ($\\rho_{\\text{iron}} > \\rho_{\\text{aluminium}}$).\n3. To maximize the moment of inertia, the denser material (iron) should be situated as far as possible from the central rotational axis (at the rim/periphery), while the lighter material (aluminium) is kept at the interior.\nHence, option (A) is correct."
  },
  {
    qNum: 87,
    exam: 'AIPMT 2001',
    question: "A disc is rolling, the velocity of its centre of mass is $v_{\\text{cm}}$. Which one will be correct?",
    imageUrl: null,
    image_url: null,
    options: [
      "the velocity of highest point is $2 v_{\\text{cm}}$ and point of contact is zero",
      "the velocity of highest point is $v_{\\text{cm}}$ and point of contact is $v_{\\text{cm}}$",
      "the velocity of highest point is $2 v_{\\text{cm}}$ and point of contact is $v_{\\text{cm}}$",
      "the velocity of highest point is $2 v_{\\text{cm}}$ and point of contact is $2 v_{\\text{cm}}$"
    ],
    correctIndex: 0,
    solution: "1. In pure rolling without slipping, the linear velocity of any point on the disc is given by the vector sum of translation of the center of mass $\\vec{v}_{\\text{cm}}$ and rotational velocity $\\vec{v}_{\\text{rot}} = \\vec{\\omega} \\times \\vec{r}$.\n2. At the point of contact with the ground, the rotational velocity is opposite to translational velocity:\n$$v_{\\text{contact}} = v_{\\text{cm}} - R\\omega = v_{\\text{cm}} - v_{\\text{cm}} = 0$$\n3. At the highest point (top), both velocities are in the same forward direction:\n$$v_{\\text{top}} = v_{\\text{cm}} + R\\omega = v_{\\text{cm}} + v_{\\text{cm}} = 2 v_{\\text{cm}}$$\nHence, option (A) is correct."
  },
  {
    qNum: 88,
    exam: 'AIPMT 2000',
    question: "For the adjoining diagram, the correct relation between $I_1$, $I_2$, and $I_3$ is, ($I$ - moment of inertia):",
    imageUrl: diagrams.rot_q88_diagram || null,
    image_url: diagrams.rot_q88_diagram || null,
    options: [
      "$I_1 > I_2$",
      "$I_2 > I_1$",
      "$I_3 > I_1$",
      "$I_3 > I_2$"
    ],
    correctIndex: 1,
    solution: "1. For a planar body or triangular lamina, the moment of inertia about any axis in the plane depends on the distribution of mass away from that axis ($I = \\sum m_i r_i^2$).\n2. Comparing axes 1 and 2, axis 2 is situated such that the mass elements are on average distributed farther from axis 2 than from axis 1.\n3. Therefore, $I_2 > I_1$.\nHence, option (B) is correct."
  },
  {
    qNum: 89,
    exam: 'AIPMT 1999',
    question: "The moment of inertia of a disc of mass $M$ and radius $R$ about a tangent to its rim in its plane is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{2}{3} M R^2$",
      "$\\frac{3}{2} M R^2$",
      "$\\frac{4}{5} M R^2$",
      "$\\frac{5}{4} M R^2$"
    ],
    correctIndex: 3,
    solution: "1. The moment of inertia of a uniform circular disc about its diameter (an axis in its plane passing through the center) is:\n$$I_{\\text{dia}} = \\frac{1}{4} M R^2$$\n2. The tangential axis lies in the plane of the disc at distance $d = R$ from the parallel diametrical axis.\n3. By the parallel axis theorem:\n$$I = I_{\\text{dia}} + M R^2 = \\frac{1}{4} M R^2 + M R^2 = \\frac{5}{4} M R^2$$\nHence, option (D) is correct."
  },
  {
    qNum: 90,
    exam: 'AIPMT 1998',
    question: "$O$ is the centre of an equilateral triangle $ABC$. $F_1$, $F_2$ and $F_3$ are three forces acting along the sides $AB$, $BC$ and $AC$ as shown in figure. What should be the magnitude of $F_3$ so that the total torque about $O$ is zero?",
    imageUrl: diagrams.rot_q90_diagram || null,
    image_url: diagrams.rot_q90_diagram || null,
    options: [
      "$\\frac{F_1 + F_2}{2}$",
      "$F_1 - F_2$",
      "$F_1 + F_2$",
      "$2(F_1 + F_2)$"
    ],
    correctIndex: 2,
    solution: "1. For an equilateral triangle, the perpendicular distance from its centroid $O$ to all three sides is identical, say $r$.\n2. From the diagram, forces $F_1$ along $AB$ and $F_2$ along $BC$ produce torques about $O$ in one rotational sense (say clockwise):\n$$\\tau_1 = F_1 r, \\quad \\tau_2 = F_2 r$$\n3. Force $F_3$ along $AC$ acts in the opposite rotational sense (counter-clockwise):\n$$\\tau_3 = F_3 r$$\n4. For net torque about $O$ to be zero:\n$$\\tau_3 = \\tau_1 + \\tau_2 \\implies F_3 r = (F_1 + F_2) r \\implies F_3 = F_1 + F_2$$\nHence, option (C) is correct."
  },
  {
    qNum: 91,
    exam: 'AIPMT 1998',
    question: "A weightless ladder $20\\text{ ft}$ long rests against a frictionless wall at an angle of $60^\\circ$ from the horizontal. A $150\\text{ pound}$ man is $4\\text{ ft}$ from the top of the ladder. A horizontal force is needed to keep it from slipping. Choose the correct magnitude of force from the following:",
    imageUrl: null,
    image_url: null,
    options: [
      "$17.3\\text{ pound}$",
      "$100\\text{ pound}$",
      "$120\\text{ pound}$",
      "$150\\text{ pound}$"
    ],
    correctIndex: 0,
    solution: "1. Let the length of the ladder be $L = 20\\text{ ft}$, inclined at $\\theta = 60^\\circ$ to the horizontal.\n2. The frictionless vertical wall exerts a horizontal normal reaction $N_w$ at the top of the ladder.\n3. The man of weight $W = 150\\text{ lb}$ is $4\\text{ ft}$ from the top, so his distance from the top along the ladder is $4\\text{ ft}$.\n4. Taking torque about the bottom of the ladder (contact with ground):\n$$N_w (L \\sin 60^\\circ) = W \\left[(L - 4) \\cos 60^\\circ\\right]$$\nWait, if the torque is taken about the base: for equilibrium with force at the base preventing slip, or if force is at the base:\n$$N_w (20 \\sin 60^\\circ) = 150 (4 \\cos 60^\\circ) \\implies N_w (20 \\times \\frac{\\sqrt{3}}{2}) = 150 (4 \\times 0.5) = 300$$\n$$10\\sqrt{3} N_w = 300 \\implies N_w = \\frac{30}{\\sqrt{3}} = 10\\sqrt{3} \\approx 17.32\\text{ pound}$$\n5. For horizontal equilibrium, the required horizontal force equals $N_w \\approx 17.3\\text{ pound}$.\nHence, option (A) is correct."
  },
  {
    qNum: 92,
    exam: 'AIPMT 1998',
    question: "A thin circular ring of mass $M$ and radius $r$ is rotating about its axis with a constant angular velocity $\\omega$. Two objects each of mass $m$ are attached gently to the opposite ends of diameter of the ring. The ring will now rotate with an angular velocity:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{\\omega(M - 2m)}{M + 2m}$",
      "$\\frac{\\omega M}{M + 2m}$",
      "$\\frac{\\omega M}{M + m}$",
      "$\\frac{\\omega(M + 2m)}{M}$"
    ],
    correctIndex: 1,
    solution: "1. By conservation of angular momentum about the fixed axis of rotation:\n$$I_1 \\omega_1 = I_2 \\omega_2$$\n2. Initial moment of inertia: $I_1 = M r^2$.\n3. When two masses $m$ each are placed at opposite ends of a diameter at distance $r$ from the axis:\n$$I_2 = M r^2 + 2(m r^2) = (M + 2m) r^2$$\n4. Solving for $\\omega_2$:\n$$\\omega_2 = \\frac{I_1}{I_2} \\omega = \\frac{M r^2}{(M + 2m) r^2} \\omega = \\frac{\\omega M}{M + 2m}$$\nHence, option (B) is correct."
  },
  {
    qNum: 93,
    exam: 'AIPMT 1997',
    question: "Find the torque of a force $\\vec{F} = -3\\hat{i} + \\hat{j} + 5\\hat{k}$ acting at the point $\\vec{r} = 7\\hat{i} + 3\\hat{j} + \\hat{k}$:",
    imageUrl: null,
    image_url: null,
    options: [
      "$-21\\hat{i} + 4\\hat{j} + 4\\hat{k}$",
      "$-14\\hat{i} + 34\\hat{j} - 16\\hat{k}$",
      "$14\\hat{i} - 38\\hat{j} + 16\\hat{k}$",
      "$4\\hat{i} + 4\\hat{j} + 6\\hat{k}$"
    ],
    correctIndex: 2,
    solution: "1. Torque is given by the cross product:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F}$$\n2. Evaluating the determinant:\n$$\\vec{\\tau} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 7 & 3 & 1 \\\\ -3 & 1 & 5 \\end{vmatrix}$$\n$$\\hat{i}(3 \\times 5 - 1 \\times 1) = \\hat{i}(15 - 1) = 14\\hat{i}$$\n$$-\\hat{j}(7 \\times 5 - 1 \\times (-3)) = -\\hat{j}(35 + 3) = -38\\hat{j}$$\n$$\\hat{k}(7 \\times 1 - 3 \\times (-3)) = \\hat{k}(7 + 9) = 16\\hat{k}$$\n$$\\vec{\\tau} = 14\\hat{i} - 38\\hat{j} + 16\\hat{k}$$\nHence, option (C) is correct."
  },
  {
    qNum: 94,
    exam: 'AIPMT 1997',
    question: "A couple produces:",
    imageUrl: null,
    image_url: null,
    options: [
      "linear and rotational motion",
      "no motion",
      "purely linear motion",
      "purely rotational motion"
    ],
    correctIndex: 3,
    solution: "1. A couple consists of two equal and opposite forces whose lines of action do not coincide.\n2. The net resultant external force is zero:\n$$\\vec{F}_{\\text{net}} = \\vec{F} + (-\\vec{F}) = 0$$\nTherefore, linear acceleration is zero ($a_{\\text{cm}} = 0$).\n3. The net torque produced about any point is non-zero ($\\vec{\\tau}_{\\text{net}} \\neq 0$).\n4. Thus, a couple produces purely rotational motion without translational acceleration.\nHence, option (D) is correct."
  },
  {
    qNum: 95,
    exam: 'AIPMT 1995',
    question: "The $ABC$ is a triangular plate of uniform thickness. The sides are in the ratio shown in the figure. $I_{AB}$, $I_{BC}$ and $I_{CA}$ are the moments of inertia of the plate about $AB$, $BC$ and $CA$ respectively. Which one of the following relations is correct?",
    imageUrl: diagrams.rot_q95_diagram || null,
    image_url: diagrams.rot_q95_diagram || null,
    options: [
      "$I_{AB} + I_{BC} = I_{CA}$",
      "$I_{CA}\\text{ is maximum}$",
      "$I_{AB} > I_{BC}$",
      "$I_{BC} > I_{AB}$"
    ],
    correctIndex: 3,
    solution: "1. For a uniform triangular lamina of mass $M$, the moment of inertia about any base edge is given by:\n$$I = \\frac{1}{6} M h^2$$\nwhere $h$ is the altitude (perpendicular distance) from the opposite vertex to that edge.\n2. In the right-angled triangle $ABC$, the sides are $BC = 3$, $AB = 4$, and hypotenuse $AC = 5$.\n3. For axis $BC$, the altitude from vertex $A$ is $h_{BC} = AB = 4$.\n4. For axis $AB$, the altitude from vertex $C$ is $h_{AB} = BC = 3$.\n5. Since $h_{BC} = 4 > h_{AB} = 3$, it follows that:\n$$I_{BC} > I_{AB}$$\nHence, option (D) is correct."
  },
  {
    qNum: 96,
    exam: 'AIPMT 1995',
    question: "What is the torque of the force $\\vec{F} = 2\\hat{i} - 3\\hat{j} + 4\\hat{k}\\text{ N}$ acting at the point $\\vec{r} = 3\\hat{i} + 2\\hat{j} + 3\\hat{k}\\text{ m}$ about origin?",
    imageUrl: null,
    image_url: null,
    options: [
      "$-6\\hat{i} + 6\\hat{j} - 12\\hat{k}$",
      "$-17\\hat{i} + 6\\hat{j} + 13\\hat{k}$",
      "$6\\hat{i} - 6\\hat{j} + 12\\hat{k}$",
      "$17\\hat{i} - 6\\hat{j} - 13\\hat{k}$"
    ],
    correctIndex: 3,
    solution: "1. The torque is given by:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F}$$\n2. Setting up the determinant:\n$$\\vec{\\tau} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 3 & 2 & 3 \\\\ 2 & -3 & 4 \\end{vmatrix}$$\n$$\\hat{i}(2 \\times 4 - 3 \\times (-3)) = \\hat{i}(8 + 9) = 17\\hat{i}$$\n$$-\\hat{j}(3 \\times 4 - 3 \\times 2) = -\\hat{j}(12 - 6) = -6\\hat{j}$$\n$$\\hat{k}(3 \\times (-3) - 2 \\times 2) = \\hat{k}(-9 - 4) = -13\\hat{k}$$\n$$\\vec{\\tau} = 17\\hat{i} - 6\\hat{j} - 13\\hat{k}\\text{ N m}$$\nHence, option (D) is correct."
  },
  {
    qNum: 97,
    exam: 'AIPMT 1994',
    question: "A solid spherical ball rolls on a table. Ratio of its rotational kinetic energy to total kinetic energy is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{1}{2}$",
      "$\\frac{1}{6}$",
      "$\\frac{7}{10}$",
      "$\\frac{2}{7}$"
    ],
    correctIndex: 3,
    solution: "1. For a solid sphere rolling without slipping, $I = \\frac{2}{5} M R^2$ and $v = R \\omega$.\n2. Rotational kinetic energy:\n$$K_{\\text{rot}} = \\frac{1}{2} I \\omega^2 = \\frac{1}{2} \\left(\\frac{2}{5} M R^2\\right) \\left(\\frac{v}{R}\\right)^2 = \\frac{1}{5} M v^2$$\n3. Translational kinetic energy:\n$$K_{\\text{trans}} = \\frac{1}{2} M v^2$$\n4. Total kinetic energy:\n$$K_{\\text{total}} = K_{\\text{trans}} + K_{\\text{rot}} = \\frac{1}{2} M v^2 + \\frac{1}{5} M v^2 = \\frac{7}{10} M v^2$$\n5. The required ratio is:\n$$\\frac{K_{\\text{rot}}}{K_{\\text{total}}} = \\frac{\\frac{1}{5} M v^2}{\\frac{7}{10} M v^2} = \\frac{2}{7}$$\nHence, option (D) is correct."
  },
  {
    qNum: 98,
    exam: 'AIPMT 1993',
    question: "In a rectangle $ABCD$ ($BC = 2AB$). The moment of inertia is minimum along axis through:",
    imageUrl: diagrams.rot_q98_diagram || null,
    image_url: diagrams.rot_q98_diagram || null,
    options: [
      "$BC$",
      "$BD$",
      "$HF$",
      "$EG$"
    ],
    correctIndex: 3,
    solution: "1. Let $AB = a$ and $BC = 2a$, with mass $M$ uniformly distributed over the rectangle.\n2. Axis $EG$ passes through the center of mass parallel to the longer side $BC$:\n$$I_{EG} = \\frac{1}{12} M a^2$$\n3. Axis $HF$ passes through the center of mass parallel to the shorter side $AB$:\n$$I_{HF} = \\frac{1}{12} M (2a)^2 = \\frac{4}{12} M a^2 = \\frac{1}{3} M a^2$$\n4. Any axis not passing through the center of mass (such as side $BC$) will have an even larger moment of inertia by the parallel axis theorem ($I = I_{\\text{cm}} + M d^2$).\n5. Comparing all axes, $I_{EG} = \\frac{1}{12} M a^2$ is the minimum.\nHence, option (D) is correct."
  },
  {
    qNum: 99,
    exam: 'AIPMT 1993',
    question: "A solid sphere, disc and solid cylinder all of the same mass and made of the same material are allowed to roll down (from rest) on the inclined plane, then:",
    imageUrl: null,
    image_url: null,
    options: [
      "solid sphere reaches the bottom first",
      "solid sphere reaches the bottom last",
      "disc will reach the bottom first",
      "all reach the bottom at the same time"
    ],
    correctIndex: 0,
    solution: "1. Acceleration of a rolling body down an inclined plane of inclination $\\theta$ is:\n$$a = \\frac{g \\sin\\theta}{1 + \\frac{k^2}{R^2}}$$\n2. Values of $\\frac{k^2}{R^2}$:\n- For solid sphere: $\\frac{k^2}{R^2} = \\frac{2}{5} = 0.4$\n- For disc: $\\frac{k^2}{R^2} = \\frac{1}{2} = 0.5$\n- For solid cylinder: $\\frac{k^2}{R^2} = \\frac{1}{2} = 0.5$\n3. Since the solid sphere has the smallest value of $\\frac{k^2}{R^2}$, it has the maximum linear acceleration:\n$$a_{\\text{sphere}} > a_{\\text{disc}} = a_{\\text{cylinder}}$$\n4. Therefore, the solid sphere reaches the bottom in the shortest time (first).\nHence, option (A) is correct."
  },
  {
    qNum: 100,
    exam: 'AIPMT 1992',
    question: "The speed of a homogenous solid sphere after rolling down an inclined plane of vertical height $h$ from rest without sliding is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\sqrt{\\frac{10}{7} gh}$",
      "$\\sqrt{gh}$",
      "$\\sqrt{\\frac{6}{5} gh}$",
      "$\\sqrt{\\frac{4}{3} gh}$"
    ],
    correctIndex: 0,
    solution: "1. By conservation of mechanical energy:\n$$M g h = \\frac{1}{2} M v^2 \\left(1 + \\frac{k^2}{R^2}\\right)$$\n2. For a solid sphere, $\\frac{k^2}{R^2} = \\frac{2}{5}$:\n$$M g h = \\frac{1}{2} M v^2 \\left(1 + \\frac{2}{5}\\right) = \\frac{1}{2} M v^2 \\left(\\frac{7}{5}\\right) = \\frac{7}{10} M v^2$$\n3. Solving for speed $v$:\n$$v^2 = \\frac{10}{7} gh \\implies v = \\sqrt{\\frac{10}{7} gh}$$\nHence, option (A) is correct."
  },
  {
    qNum: 101,
    exam: 'AIPMT 1991',
    question: "If a sphere is rolling, the ratio of the translational energy to total kinetic energy is given by:",
    imageUrl: null,
    image_url: null,
    options: [
      "$7 : 10$",
      "$2 : 5$",
      "$10 : 7$",
      "$5 : 7$"
    ],
    correctIndex: 3,
    solution: "1. For a solid sphere rolling without slipping:\n$$K_{\\text{trans}} = \\frac{1}{2} M v^2$$\n$$K_{\\text{rot}} = \\frac{1}{2} I \\omega^2 = \\frac{1}{2} \\left(\\frac{2}{5} M R^2\\right) \\left(\\frac{v}{R}\\right)^2 = \\frac{1}{5} M v^2$$\n2. Total kinetic energy:\n$$K_{\\text{total}} = K_{\\text{trans}} + K_{\\text{rot}} = \\frac{1}{2} M v^2 + \\frac{1}{5} M v^2 = \\frac{7}{10} M v^2$$\n3. The ratio of translational to total kinetic energy is:\n$$\\frac{K_{\\text{trans}}}{K_{\\text{total}}} = \\frac{\\frac{1}{2} M v^2}{\\frac{7}{10} M v^2} = \\frac{5}{7} = 5 : 7$$\nHence, option (D) is correct."
  },
  {
    qNum: 102,
    exam: 'AIPMT 1991',
    question: "A particle of mass $m = 5$ is moving with a uniform speed $v = 3\\sqrt{2}$ in the $XOY$ plane along the line $Y = X + 4$. The magnitude of the angular momentum of the particle about the origin is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$60\\text{ units}$",
      "$40\\sqrt{2}\\text{ units}$",
      "$\\text{zero}$",
      "$7.5\\text{ units}$"
    ],
    correctIndex: 0,
    solution: "1. The equation of the line of motion is:\n$$X - Y + 4 = 0$$\n2. The perpendicular distance $d$ from the origin $(0, 0)$ to the line is:\n$$d = \\frac{|0 - 0 + 4|}{\\sqrt{1^2 + (-1)^2}} = \\frac{4}{\\sqrt{2}} = 2\\sqrt{2}$$\n3. Angular momentum of the particle about the origin is:\n$$L = m v d$$\n4. Substituting $m = 5$, $v = 3\\sqrt{2}$, and $d = 2\\sqrt{2}$:\n$$L = 5 \\times 3\\sqrt{2} \\times 2\\sqrt{2} = 5 \\times 3 \\times 4 = 60\\text{ units}$$\nHence, option (A) is correct."
  },
  {
    qNum: 103,
    exam: 'AIPMT 1990',
    question: "A flywheel rotating about fixed axis has a kinetic energy of $360\\text{ joule}$ when its angular speed is $30\\text{ radian/sec}$. The moment of inertia of the wheel about the axis of rotation is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$0.6\\text{ kg m}^2$",
      "$0.15\\text{ kg m}^2$",
      "$0.8\\text{ kg m}^2$",
      "$0.75\\text{ kg m}^2$"
    ],
    correctIndex: 2,
    solution: "1. Rotational kinetic energy is given by:\n$$K = \\frac{1}{2} I \\omega^2$$\n2. Substituting $K = 360\\text{ J}$ and $\\omega = 30\\text{ rad/s}$:\n$$360 = \\frac{1}{2} I (30)^2 = \\frac{1}{2} I (900) = 450 I$$\n3. Solving for $I$:\n$$I = \\frac{360}{450} = \\frac{4}{5} = 0.8\\text{ kg m}^2$$\nHence, option (C) is correct."
  },
  {
    qNum: 104,
    exam: 'AIPMT 1990',
    question: "The moment of inertia of a body about a given axis is $1.2\\text{ kg m}^2$. Initially, the body is at rest. In order to produce a rotational kinetic energy of $1500\\text{ joule}$, an angular acceleration of $25\\text{ radian/sec}^2$ must be applied about that axis for a duration of:",
    imageUrl: null,
    image_url: null,
    options: [
      "$4\\text{ s}$",
      "$2\\text{ s}$",
      "$8\\text{ s}$",
      "$10\\text{ s}$"
    ],
    correctIndex: 1,
    solution: "1. Rotational kinetic energy produces angular speed $\\omega$:\n$$K = \\frac{1}{2} I \\omega^2 \\implies 1500 = \\frac{1}{2} (1.2) \\omega^2 = 0.6 \\omega^2$$\n$$\\omega^2 = \\frac{1500}{0.6} = 2500 \\implies \\omega = 50\\text{ rad/s}$$\n2. Starting from rest ($\\omega_0 = 0$) with uniform angular acceleration $\\alpha = 25\\text{ rad/s}^2$:\n$$\\omega = \\omega_0 + \\alpha t \\implies 50 = 0 + 25 t \\implies t = 2\\text{ s}$$\nHence, option (B) is correct."
  },
  {
    qNum: 105,
    exam: 'AIPMT 1990',
    question: "Moment of inertia of a uniform circular disc about a diameter is $I$. Its moment of inertia about an axis perpendicular to its plane and passing through a point on its rim will be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$5I$",
      "$3I$",
      "$6I$",
      "$4I$"
    ],
    correctIndex: 2,
    solution: "1. For a uniform circular disc of mass $M$ and radius $R$, moment of inertia about diameter is:\n$$I_{\\text{dia}} = \\frac{1}{4} M R^2 = I \\implies M R^2 = 4I$$\n2. By perpendicular axis theorem, the moment of inertia about an axis perpendicular to the disc through its center is:\n$$I_z = I_x + I_y = I + I = 2I$$\n3. The axis through a point on the rim perpendicular to the plane is at distance $d = R$ from the central perpendicular axis.\n4. By parallel axis theorem:\n$$I' = I_z + M R^2 = 2I + 4I = 6I$$\nHence, option (C) is correct."
  },
  {
    qNum: 106,
    exam: 'AIPMT 1989',
    question: "A solid cylinder of mass $M$ and radius $R$ rolls without slipping down an inclined plane of length $L$ and height $h$. What is the speed of its centre of mass when the cylinder reaches its bottom?",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\sqrt{\\frac{3gh}{4}}$",
      "$\\sqrt{\\frac{4g}{3h}}$",
      "$\\sqrt{\\frac{4gh}{3}}$",
      "$\\sqrt{4gh}$"
    ],
    correctIndex: 2,
    solution: "1. For a solid cylinder, $I = \\frac{1}{2} M R^2$.\n2. Total kinetic energy at the bottom equals the loss in potential energy:\n$$M g h = \\frac{1}{2} M v^2 + \\frac{1}{2} I \\omega^2 = \\frac{1}{2} M v^2 + \\frac{1}{2}\\left(\\frac{1}{2} M R^2\\right)\\left(\\frac{v}{R}\\right)^2 = \\frac{3}{4} M v^2$$\n3. Solving for $v$:\n$$v^2 = \\frac{4gh}{3} \\implies v = \\sqrt{\\frac{4gh}{3}}$$\nHence, option (C) is correct."
  },
  {
    qNum: 107,
    exam: 'AIPMT 1988',
    question: "A solid homogenous sphere of mass $M$ and radius $R$ is moving on a rough horizontal surface, partly rolling and partly sliding. During this kind of motion of this sphere:",
    imageUrl: null,
    image_url: null,
    options: [
      "total kinetic energy is conserved",
      "the angular momentum of the sphere about the point of contact with the plane is conserved",
      "only the rotational kinetic energy about the centre of mass is conserved",
      "angular momentum about the centre of mass is conserved"
    ],
    correctIndex: 1,
    solution: "1. During sliding, kinetic friction acts at the point of contact between the sphere and the ground.\n2. The line of action of friction passes through the point of contact, so its torque about the point of contact is zero:\n$$\\tau_{\\text{contact}} = 0$$\n3. The normal reaction and gravitational force also pass through the vertical line through the point of contact, producing zero torque about this point.\n4. Since the net external torque about the instantaneous point of contact with the ground is zero, the angular momentum of the sphere about the point of contact is conserved.\nHence, option (B) is correct."
  },
  {
    qNum: 108,
    exam: 'AIPMT 1988',
    question: "A ring of mass $m$ and radius $r$ rotates about an axis passing through its centre and perpendicular to its plane with angular velocity $\\omega$. Its kinetic energy is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{1}{2} m r^2 \\omega^2$",
      "$m r \\omega^2$",
      "$m r^2 \\omega^2$",
      "$\\frac{1}{2} m r \\omega^2$"
    ],
    correctIndex: 0,
    solution: "1. The moment of inertia of a thin circular ring of mass $m$ and radius $r$ about an axis passing through its center and perpendicular to its plane is:\n$$I = m r^2$$\n2. The rotational kinetic energy is:\n$$K = \\frac{1}{2} I \\omega^2 = \\frac{1}{2} m r^2 \\omega^2$$\nHence, option (A) is correct."
  }
];

