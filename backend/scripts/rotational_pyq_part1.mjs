// NEET Rotational Motion PYQ Part 1: Q1 to Q30
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, 'rotational_diagram_urls.json');
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const ROTATIONAL_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: "A thin horizontal disc is rotating about a vertical axis passing through its fixed centre $O$. Its angular momentum is $L_A$ and $L_B$ computed about points $A$ and $B$, respectively, with $OB = 2 \\times OA$. The value of $\\frac{L_A}{L_B}$ is:",
    imageUrl: diagrams.rot_q1_diagram || null,
    image_url: diagrams.rot_q1_diagram || null,
    options: [
      "$2$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{2}$",
      "$1$"
    ],
    correctIndex: 3,
    solution: "1. The angular momentum of a rigid body about any point $P$ is given by:\n$$\\vec{L}_P = \\vec{L}_{\\text{cm}} + \\vec{r}_{\\text{cm}/P} \\times \\vec{P}_{\\text{system}}$$\n\n2. For a disc rotating about a fixed axis passing through its stationary centre of mass ($O$):\n$$\\vec{P}_{\\text{system}} = M\\vec{v}_{\\text{cm}} = 0$$\n\n3. Therefore, the angular momentum about any point in space is independent of the choice of origin and simply equals its intrinsic spin angular momentum about the centre of mass:\n$$\\vec{L}_A = \\vec{L}_B = \\vec{L}_{\\text{cm}} = I\\vec{\\omega}$$\n$$\\frac{L_A}{L_B} = 1$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 2,
    exam: 'RE-NEET 2026',
    question: "A solid sphere $A$ of radius $R$ and mass $M$ is attached at a point to a smaller solid sphere $B$ of radius $r < R$ and mass $m < M$. Assume that the line joining their centres lies along the horizontal. The moment of inertia of the system calculated about a vertical axis passing through the centre of $A$ is $I_A$ and that about a vertical axis passing through the centre of $B$ is $I_B$. The difference $I_A - I_B$ is:",
    imageUrl: diagrams.rot_q2_diagram || null,
    image_url: diagrams.rot_q2_diagram || null,
    options: [
      "$0$",
      "$(M - m)(R + r)^2$",
      "$(m - M)(R + r)^2$",
      "$(m - M)(R - r)^2$"
    ],
    correctIndex: 2,
    solution: "1. The distance between the centres of the two touching solid spheres is $d = R + r$.\n\n2. Using the parallel axis theorem, the moment of inertia about the vertical axis passing through the centre of sphere $A$ is:\n$$I_A = I_{A,\\text{cm}} + \\left[I_{B,\\text{cm}} + m d^2\\right]$$\n\n3. Similarly, about the vertical axis passing through the centre of sphere $B$:\n$$I_B = \\left[I_{A,\\text{cm}} + M d^2\\right] + I_{B,\\text{cm}}$$\n\n4. Subtracting $I_B$ from $I_A$:\n$$I_A - I_B = m d^2 - M d^2 = (m - M)d^2 = (m - M)(R + r)^2$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 3,
    exam: 'NEET 2026',
    question: "The angular speed of a flywheel is increased from $600\\text{ rpm}$ to $1200\\text{ rpm}$ in $10\\text{ s}$. The number of revolutions completed by the flywheel during this time is:",
    options: [
      "$900$",
      "$600$",
      "$150$",
      "$300$"
    ],
    correctIndex: 2,
    solution: "1. Initial rotational frequency $f_1 = \\frac{600}{60} = 10\\text{ rev/s}$.\nFinal rotational frequency $f_2 = \\frac{1200}{60} = 20\\text{ rev/s}$.\n\n2. The number of revolutions completed in time $t$ under uniform angular acceleration is:\n$$N = \\left(\\frac{f_1 + f_2}{2}\\right) t = \\left(\\frac{10 + 20}{2}\\right) \\times 10 = 15 \\times 10 = 150\\text{ revolutions}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 4,
    exam: 'NEET 2026',
    question: "A thin wire of length $L$ and linear mass density $m$ is bent into a circular ring (in $x - y$ plane) with centre $C$ as shown in figure. The moment of inertia of the ring about an axis $yy'$ will be:",
    imageUrl: diagrams.rot_q4_diagram || null,
    image_url: diagrams.rot_q4_diagram || null,
    options: [
      "$\\frac{3mL^3}{8\\pi}$",
      "$\\frac{3mL^3}{8\\pi^2}$",
      "$\\frac{3mL^2}{8\\pi}$",
      "$\\frac{3mL^2}{8\\pi^2}$"
    ],
    correctIndex: 1,
    solution: "1. Total mass of the wire: $M = m \\cdot L$.\nRadius of the ring formed: $2\\pi R = L \\implies R = \\frac{L}{2\\pi}$.\n\n2. The moment of inertia of a circular ring about its diameter (lying in its plane) is:\n$$I_{\\text{dia}} = \\frac{1}{2} M R^2$$\n\n3. The axis $yy'$ is tangential to the ring and lies in the plane of the ring. By the parallel axis theorem:\n$$I_{yy'} = I_{\\text{dia}} + M R^2 = \\frac{1}{2} M R^2 + M R^2 = \\frac{3}{2} M R^2$$\n\n4. Substituting $M = mL$ and $R = \\frac{L}{2\\pi}$:\n$$I_{yy'} = \\frac{3}{2} (mL) \\left(\\frac{L}{2\\pi}\\right)^2 = \\frac{3mL^3}{8\\pi^2}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 5,
    exam: 'NEET 2025',
    question: "A uniform rod of mass $20\\text{ kg}$ and length $5\\text{ m}$ leans against a smooth vertical wall making an angle of $60^\\circ$ with it. The other end rests on a rough horizontal floor. The friction force that the floor exerts on the rod is (Take $g = 10\\text{ m/s}^2$)",
    options: [
      "$200\\text{ N}$",
      "$200\\sqrt{3}\\text{ N}$",
      "$100\\text{ N}$",
      "$100\\sqrt{3}\\text{ N}$"
    ],
    correctIndex: 3,
    solution: "1. The angle between the rod and the vertical wall is $\\alpha = 60^\\circ$, so the angle of inclination with the horizontal floor is $\\theta = 90^\\circ - 60^\\circ = 30^\\circ$.\n\n2. Normal force from the smooth wall is horizontal ($N_w$), and vertical normal reaction at the floor is $N_f = mg = 20 \\times 10 = 200\\text{ N}$.\n\n3. Taking torque about the contact point on the floor:\n$$\\tau = N_w (L \\sin 30^\\circ) - mg \\left(\\frac{L}{2} \\cos 30^\\circ\\right) = 0$$\n$$N_w \\sin 30^\\circ = mg \\frac{\\cos 30^\\circ}{2} \\implies N_w = \\frac{mg}{2\\tan 30^\\circ} = \\frac{200 \\sqrt{3}}{2} = 100\\sqrt{3}\\text{ N}$$\n\n4. For horizontal equilibrium, the friction force on the floor balances $N_w$:\n$$f_s = N_w = 100\\sqrt{3}\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 6,
    exam: 'NEET 2025',
    question: "The Sun rotates around its centre once in $27\\text{ days}$. What will be the period of revolution if the Sun were to expand to twice its present radius without any external influence? Assume the Sun to be a sphere of uniform density.",
    options: [
      "$115\\text{ days}$",
      "$108\\text{ days}$",
      "$100\\text{ days}$",
      "$105\\text{ days}$"
    ],
    correctIndex: 1,
    solution: "1. In the absence of external torque, angular momentum is conserved:\n$$L = I_1 \\omega_1 = I_2 \\omega_2$$\n\n2. For a uniform solid sphere, $I = \\frac{2}{5} M R^2$. Since mass remains constant:\n$$R_1^2 \\left(\\frac{2\\pi}{T_1}\\right) = R_2^2 \\left(\\frac{2\\pi}{T_2}\\right) \\implies T_2 = T_1 \\left(\\frac{R_2}{R_1}\\right)^2$$\n\n3. Given $R_2 = 2R_1$ and $T_1 = 27\\text{ days}$:\n$$T_2 = 27 \\times (2)^2 = 27 \\times 4 = 108\\text{ days}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 7,
    exam: 'NEET 2025',
    question: "A sphere of radius $R$ is cut from a larger solid sphere of radius $2R$ as shown in the figure. The ratio of the moment of inertia of the smaller sphere to that of the rest part of the sphere about the $Y$-axis is:",
    imageUrl: diagrams.rot_q7_diagram || null,
    image_url: diagrams.rot_q7_diagram || null,
    options: [
      "$\\frac{7}{57}$",
      "$\\frac{7}{64}$",
      "$\\frac{7}{8}$",
      "$\\frac{7}{40}$"
    ],
    correctIndex: 0,
    solution: "1. Mass is proportional to volume ($V \\propto r^3$). If the removed sphere of radius $R$ has mass $M$, the original full sphere of radius $2R$ had mass $M_0 = M (2)^3 = 8M$. The remaining part has mass $M_{\\text{rest}} = 7M$.\n\n2. For the original complete sphere of radius $2R$ about the $Y$-axis (diameter):\n$$I_0 = \\frac{2}{5} M_0 (2R)^2 = \\frac{2}{5} (8M) (4R^2) = \\frac{64}{5} M R^2$$\n\n3. For the smaller sphere, the $Y$-axis is tangential to its surface (distance from its centre is $d = R$):\n$$I_{\\text{small}} = \\frac{2}{5} M R^2 + M R^2 = \\frac{7}{5} M R^2$$\n\n4. Moment of inertia of the remaining part about the $Y$-axis:\n$$I_{\\text{rest}} = I_0 - I_{\\text{small}} = \\frac{64}{5} M R^2 - \\frac{7}{5} M R^2 = \\frac{57}{5} M R^2$$\n\n5. The ratio is:\n$$\\frac{I_{\\text{small}}}{I_{\\text{rest}}} = \\frac{7/5}{57/5} = \\frac{7}{57}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 8,
    exam: 'NEET 2024 (Re-Examination)',
    question: "The radius of gyration of a solid sphere of mass $5\\text{ kg}$ about $XY$ is $5\\text{ m}$ as shown in figure. The radius of the sphere is $\\frac{5x}{\\sqrt{7}}\\text{ m}$, then the value of $x$ is:",
    imageUrl: diagrams.rot_q8_diagram || null,
    image_url: diagrams.rot_q8_diagram || null,
    options: [
      "$5$",
      "$\\sqrt{2}$",
      "$\\sqrt{3}$",
      "$\\sqrt{5}$"
    ],
    correctIndex: 3,
    solution: "1. The axis $XY$ is tangential to the solid sphere. By the parallel axis theorem:\n$$I = \\frac{2}{5} M R^2 + M R^2 = \\frac{7}{5} M R^2$$\n\n2. In terms of radius of gyration $K$:\n$$I = M K^2 \\implies K = \\sqrt{\\frac{7}{5}} R$$\n\n3. Given $K = 5\\text{ m}$:\n$$5 = \\sqrt{\\frac{7}{5}} R \\implies R = 5 \\sqrt{\\frac{5}{7}} = \\frac{5\\sqrt{5}}{\\sqrt{7}}\\text{ m}$$\n\n4. Comparing with $R = \\frac{5x}{\\sqrt{7}}\\text{ m}$, we obtain $x = \\sqrt{5}$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 9,
    exam: 'NEET 2024',
    question: "The moment of inertia of a thin rod about an axis passing through its mid point and perpendicular to the rod is $2400\\text{ g cm}^2$. The length of the $400\\text{ g}$ rod is nearly:",
    options: [
      "$8.5\\text{ cm}$",
      "$17.5\\text{ cm}$",
      "$20.7\\text{ cm}$",
      "$72.0\\text{ cm}$"
    ],
    correctIndex: 0,
    solution: "1. The moment of inertia of a thin rod about an axis through its centre perpendicular to its length is:\n$$I = \\frac{1}{12} M L^2$$\n\n2. Substituting the given values ($I = 2400\\text{ g cm}^2$, $M = 400\\text{ g}$):\n$$2400 = \\frac{1}{12} (400) L^2 \\implies L^2 = \\frac{2400 \\times 12}{400} = 72$$\n$$L = \\sqrt{72} \\approx 8.485\\text{ cm} \\approx 8.5\\text{ cm}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 10,
    exam: 'NEET 2024',
    question: "A wheel of a bullock cart is rolling on a level road as shown in the figure below. If its linear speed is $v$ in the direction shown, which one of the following options is correct ($P$ and $Q$ are any highest and lowest points on the wheel, respectively)?",
    imageUrl: diagrams.rot_q10_diagram || null,
    image_url: diagrams.rot_q10_diagram || null,
    options: [
      "Point $P$ moves slower than point $Q$",
      "Point $P$ moves faster than point $Q$",
      "Both the points $P$ and $Q$ move with equal speed",
      "Point $P$ has zero speed"
    ],
    correctIndex: 1,
    solution: "1. In pure rolling without slipping, the instantaneous centre of rotation is the point of contact with the ground ($Q$).\n\n2. Velocity of the lowest point $Q$:\n$$v_Q = v_{\\text{cm}} - \\omega R = v - v = 0$$\n\n3. Velocity of the highest point $P$:\n$$v_P = v_{\\text{cm}} + \\omega R = v + v = 2v$$\n\n4. Therefore, point $P$ moves with speed $2v$ while point $Q$ is instantaneously at rest ($v_Q = 0$). Hence, point $P$ moves faster than point $Q$.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 11,
    exam: 'NEET 2023 Manipur',
    question: "A constant torque of $100\\text{ N m}$ turns a wheel of moment of inertia $300\\text{ kg m}^2$ about an axis passing through its centre. Starting from rest, its angular velocity after $3\\text{ s}$ is :",
    options: [
      "$1\\text{ rad/s}$",
      "$5\\text{ rad/s}$",
      "$10\\text{ rad/s}$",
      "$15\\text{ rad/s}$"
    ],
    correctIndex: 0,
    solution: "1. Angular acceleration produced by constant torque $\\tau$ is:\n$$\\alpha = \\frac{\\tau}{I} = \\frac{100}{300} = \\frac{1}{3}\\text{ rad/s}^2$$\n\n2. Using rotational kinematic equation with $\\omega_0 = 0$:\n$$\\omega = \\omega_0 + \\alpha t = 0 + \\left(\\frac{1}{3}\\right)(3) = 1\\text{ rad/s}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 12,
    exam: 'NEET 2023',
    question: "The ratio of radius of gyration of a solid sphere of mass $M$ and radius $R$ about its own axis to the radius of gyration of the thin hollow sphere of same mass and radius about its axis is :-",
    options: [
      "$5 : 3$",
      "$2 : 5$",
      "$\\sqrt{5} : \\sqrt{3}$",
      "$\\sqrt{3} : \\sqrt{5}$"
    ],
    correctIndex: 3,
    solution: "1. For a solid sphere about its diameter:\n$$I_1 = \\frac{2}{5} M R^2 = M K_1^2 \\implies K_1 = \\sqrt{\\frac{2}{5}} R$$\n\n2. For a thin hollow sphere (spherical shell) about its diameter:\n$$I_2 = \\frac{2}{3} M R^2 = M K_2^2 \\implies K_2 = \\sqrt{\\frac{2}{3}} R$$\n\n3. The ratio of radii of gyration is:\n$$\\frac{K_1}{K_2} = \\frac{\\sqrt{2/5}}{\\sqrt{2/3}} = \\sqrt{\\frac{3}{5}} = \\sqrt{3} : \\sqrt{5}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 13,
    exam: 'NEET 2023',
    question: "The angular acceleration of a body, moving along the circumference of a circle, is :",
    options: [
      "along the radius towards the centre",
      "along the tangent to its position",
      "along the axis of rotation",
      "along the radius, away from centre"
    ],
    correctIndex: 2,
    solution: "1. Angular acceleration $\\vec{\\alpha} = \\frac{d\\vec{\\omega}}{dt}$ is an axial vector.\n\n2. Its direction is along the axis of rotation, given by the right-hand thumb rule.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 14,
    exam: 'NEET 2022 Phase 2',
    question: "An energy of $484\\text{ J}$ is spent in increasing the speed of a flywheel from $60\\text{ rpm}$ to $360\\text{ rpm}$. The moment of inertia of the flywheel is :",
    options: [
      "$0.07\\text{ kg m}^2$",
      "$0.7\\text{ kg m}^2$",
      "$3.22\\text{ kg m}^2$",
      "$30.8\\text{ kg m}^2$"
    ],
    correctIndex: 1,
    solution: "1. Initial angular velocity: $\\omega_1 = \\frac{2\\pi \\times 60}{60} = 2\\pi\\text{ rad/s}$.\nFinal angular velocity: $\\omega_2 = \\frac{2\\pi \\times 360}{60} = 12\\pi\\text{ rad/s}$.\n\n2. Work done equals the change in rotational kinetic energy:\n$$W = \\frac{1}{2} I (\\omega_2^2 - \\omega_1^2)$$\n$$484 = \\frac{1}{2} I \\left[(12\\pi)^2 - (2\\pi)^2\\right] = \\frac{1}{2} I (144\\pi^2 - 4\\pi^2) = 70\\pi^2 I$$\n\n3. Taking $\\pi^2 \\approx 9.87$:\n$$I = \\frac{484}{70 \\times 9.87} = \\frac{484}{690.9} \\approx 0.7\\text{ kg m}^2$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 15,
    exam: 'NEET 2022 Phase 1',
    question: "The angular speed of a fly wheel moving with uniform angular acceleration changes from $1200\\text{ rpm}$ to $3120\\text{ rpm}$ in $16\\text{ seconds}$. The angular acceleration in $\\text{rad/s}^2$ is",
    options: [
      "$2\\pi$",
      "$4\\pi$",
      "$12\\pi$",
      "$104\\pi$"
    ],
    correctIndex: 1,
    solution: "1. Initial angular speed: $\\omega_0 = 1200 \\times \\frac{2\\pi}{60} = 40\\pi\\text{ rad/s}$.\nFinal angular speed: $\\omega = 3120 \\times \\frac{2\\pi}{60} = 104\\pi\\text{ rad/s}$.\n\n2. Angular acceleration:\n$$\\alpha = \\frac{\\omega - \\omega_0}{t} = \\frac{104\\pi - 40\\pi}{16} = \\frac{64\\pi}{16} = 4\\pi\\text{ rad/s}^2$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 16,
    exam: 'NEET 2022 Phase 1',
    question: "The ratio of the radius of gyration of a thin uniform disc about an axis passing through its centre and normal to its plane to the radius of gyration of the disc about its diameter is",
    options: [
      "$2 : 1$",
      "$\\sqrt{2} : 1$",
      "$4 : 1$",
      "$1 : \\sqrt{2}$"
    ],
    correctIndex: 1,
    solution: "1. About perpendicular central axis: $I_1 = \\frac{1}{2} M R^2 = M K_1^2 \\implies K_1 = \\frac{R}{\\sqrt{2}}$.\n\n2. About a diameter: $I_2 = \\frac{1}{4} M R^2 = M K_2^2 \\implies K_2 = \\frac{R}{2}$.\n\n3. The ratio is:\n$$\\frac{K_1}{K_2} = \\frac{R/\\sqrt{2}}{R/2} = \\frac{2}{\\sqrt{2}} = \\sqrt{2} : 1$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 17,
    exam: 'NEET 2021',
    question: "From a circular ring of mass $M$ and radius $R$ an arc corresponding to a $90^\\circ$ sector is removed. The moment of inertia of the remaining part of the ring about an axis passing through the center of the ring and perpendicular to the plane of the ring is $K$ times $MR^2$. Then the value of $K$ is :",
    options: [
      "$\\frac{1}{8}$",
      "$\\frac{3}{4}$",
      "$\\frac{7}{8}$",
      "$\\frac{1}{4}$"
    ],
    correctIndex: 1,
    solution: "1. A $90^\\circ$ sector represents one-fourth of the complete ring, so the remaining three-fourths has mass:\n$$M_{\\text{rem}} = \\frac{3}{4} M$$\n\n2. Every point on the remaining arc is still at distance $R$ from the center of the ring.\n\n3. Therefore, the moment of inertia is:\n$$I = M_{\\text{rem}} R^2 = \\frac{3}{4} M R^2$$\n$$K = \\frac{3}{4}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 18,
    exam: 'NEET 2021',
    question: "A uniform rod of length $200\\text{ cm}$ and mass $500\\text{ g}$ is balanced on a wedge placed at $40\\text{ cm}$ mark. A mass of $2\\text{ kg}$ is suspended from the rod at $20\\text{ cm}$ and another unknown mass $m$ is suspended from the rod at $160\\text{ cm}$ mark as shown in the figure. Find the value of $m$ such that the rod is in equilibrium. ($g = 10\\text{ m/s}^2$)",
    imageUrl: diagrams.rot_q18_diagram || null,
    image_url: diagrams.rot_q18_diagram || null,
    options: [
      "$\\frac{1}{12}\\text{ kg}$",
      "$\\frac{1}{2}\\text{ kg}$",
      "$\\frac{1}{3}\\text{ kg}$",
      "$\\frac{1}{6}\\text{ kg}$"
    ],
    correctIndex: 0,
    solution: "1. The centre of gravity of the uniform $200\\text{ cm}$ rod (mass $0.5\\text{ kg}$) is at its midpoint ($100\\text{ cm}$ mark).\n\n2. The fulcrum is at $40\\text{ cm}$. Taking moments of all forces about the fulcrum at $40\\text{ cm}$:\n- Anti-clockwise torque due to $2\\text{ kg}$ at $20\\text{ cm}$: $2 \\times (40 - 20) = 40\\text{ kg}\\cdot\\text{cm}$\n- Clockwise torque due to rod's weight at $100\\text{ cm}$: $0.5 \\times (100 - 40) = 30\\text{ kg}\\cdot\\text{cm}$\n- Clockwise torque due to unknown mass $m$ at $160\\text{ cm}$: $m \\times (160 - 40) = 120m\\text{ kg}\\cdot\\text{cm}$\n\n3. Setting net torque to zero:\n$$40 = 30 + 120m \\implies 120m = 10 \\implies m = \\frac{10}{120} = \\frac{1}{12}\\text{ kg}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 19,
    exam: 'NEET 2020 Phase 2',
    question: "The angular speed of the wheel of a vehicle is increased from $360\\text{ rpm}$ to $1200\\text{ rpm}$ in $14\\text{ second}$. Its angular acceleration is,",
    options: [
      "$1\\text{ rad/s}^2$",
      "$2\\pi\\text{ rad/s}^2$",
      "$28\\pi\\text{ rad/s}^2$",
      "$120\\pi\\text{ rad/s}^2$"
    ],
    correctIndex: 1,
    solution: "1. $\\omega_0 = 360 \\times \\frac{2\\pi}{60} = 12\\pi\\text{ rad/s}$.\n$\\omega = 1200 \\times \\frac{2\\pi}{60} = 40\\pi\\text{ rad/s}$.\n\n2. Angular acceleration:\n$$\\alpha = \\frac{\\omega - \\omega_0}{t} = \\frac{40\\pi - 12\\pi}{14} = \\frac{28\\pi}{14} = 2\\pi\\text{ rad/s}^2$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 20,
    exam: 'NEET 2020 Phase 1',
    question: "Find the torque about the origin when a force of $3\\hat{j}\\text{ N}$ acts on a particle whose position vector is $2\\hat{k}\\text{ m}$.",
    options: [
      "$6\\hat{j}\\text{ N m}$",
      "$-6\\hat{i}\\text{ N m}$",
      "$6\\hat{k}\\text{ N m}$",
      "$6\\hat{i}\\text{ N m}$"
    ],
    correctIndex: 1,
    solution: "1. Torque about the origin is given by the cross product:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F}$$\n\n2. Given $\\vec{r} = 2\\hat{k}\\text{ m}$ and $\\vec{F} = 3\\hat{j}\\text{ N}$:\n$$\\vec{\\tau} = (2\\hat{k}) \\times (3\\hat{j}) = 6(\\hat{k} \\times \\hat{j}) = 6(-\\hat{i}) = -6\\hat{i}\\text{ N m}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 21,
    exam: 'NEET 2019 (Odisha)',
    question: "A solid cylinder of mass $2\\text{ kg}$ and radius $50\\text{ cm}$ rolls up an inclined plane of angle of inclination $30^\\circ$. The centre of mass of the cylinder has speed of $4\\text{ m/s}$. The distance travelled by the cylinder on the inclined surface will be, [take $g = 10\\text{ m/s}^2$]",
    options: [
      "$2.4\\text{ m}$",
      "$2.2\\text{ m}$",
      "$1.6\\text{ m}$",
      "$1.2\\text{ m}$"
    ],
    correctIndex: 0,
    solution: "1. Total kinetic energy of the rolling solid cylinder is:\n$$K = \\frac{1}{2} M v^2 \\left(1 + \\frac{K^2}{R^2}\\right) = \\frac{1}{2} M v^2 \\left(1 + \\frac{1}{2}\\right) = \\frac{3}{4} M v^2$$\n\n2. By conservation of energy, this kinetic energy is converted into gravitational potential energy at maximum height $h$:\n$$Mgh = \\frac{3}{4} M v^2 \\implies h = \\frac{3v^2}{4g} = \\frac{3 \\times 4^2}{4 \\times 10} = \\frac{48}{40} = 1.2\\text{ m}$$\n\n3. The distance $s$ travelled along the inclined plane is:\n$$s = \\frac{h}{\\sin 30^\\circ} = \\frac{1.2}{0.5} = 2.4\\text{ m}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 22,
    exam: 'NEET 2019',
    question: "A solid cylinder of mass $2\\text{ kg}$ and radius $4\\text{ cm}$ is rotating about its axis at the rate of $3\\text{ rpm}$. The torque required to stop after $2\\pi\\text{ revolutions}$ is :",
    options: [
      "$2 \\times 10^{-3}\\text{ N m}$",
      "$2 \\times 10^{-6}\\text{ N m}$",
      "$2 \\times 10^{6}\\text{ N m}$",
      "$12 \\times 10^{-4}\\text{ N m}$"
    ],
    correctIndex: 1,
    solution: "1. Initial angular velocity:\n$$\\omega_0 = 3\\text{ rpm} = 3 \\times \\frac{2\\pi}{60} = \\frac{\\pi}{10}\\text{ rad/s}$$\n\n2. Angular displacement to come to rest:\n$$\\theta = 2\\pi\\text{ rev} = 2\\pi \\times 2\\pi = 4\\pi^2\\text{ rad}$$\n\n3. Using $\\omega^2 = \\omega_0^2 - 2\\alpha \\theta$ with $\\omega = 0$:\n$$\\alpha = \\frac{\\omega_0^2}{2\\theta} = \\frac{(\\pi/10)^2}{2(4\\pi^2)} = \\frac{\\pi^2}{100 \\times 8\\pi^2} = \\frac{1}{800}\\text{ rad/s}^2$$\n\n4. Moment of inertia of the solid cylinder:\n$$I = \\frac{1}{2} M R^2 = \\frac{1}{2} (2) (0.04)^2 = 1.6 \\times 10^{-3}\\text{ kg m}^2$$\n\n5. Torque required:\n$$\\tau = I \\alpha = 1.6 \\times 10^{-3} \\times \\frac{1}{800} = 2 \\times 10^{-6}\\text{ N m}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 23,
    exam: 'NEET 2019',
    question: "Two particles $A$ and $B$ are moving in uniform circular motion in concentric circles of radii $r_A$ and $r_B$ with speed $v_A$ and $v_B$ respectively. Their time period of rotation is the same. The ratio of angular speed of $A$ to that of $B$ will be :",
    options: [
      "$v_A : v_B$",
      "$1 : 1$",
      "$r_B : r_A$",
      "$r_A : r_B$"
    ],
    correctIndex: 1,
    solution: "1. Angular speed is related to the time period by $\\omega = \\frac{2\\pi}{T}$.\n\n2. Since the time period of rotation $T$ is the same for both particles:\n$$\\omega_A = \\frac{2\\pi}{T}, \\quad \\omega_B = \\frac{2\\pi}{T} \\implies \\frac{\\omega_A}{\\omega_B} = 1 : 1$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 24,
    exam: 'NEET 2019',
    question: "A disc of radius $2\\text{ m}$ and mass $100\\text{ kg}$ rolls on a horizontal floor. Its centre of mass has speed of $20\\text{ cm/s}$. How much work is needed to stop it?",
    options: [
      "$1\\text{ J}$",
      "$2\\text{ J}$",
      "$3\\text{ J}$",
      "$30\\text{ kJ}$"
    ],
    correctIndex: 2,
    solution: "1. Speed of centre of mass: $v = 20\\text{ cm/s} = 0.2\\text{ m/s}$.\n\n2. Total kinetic energy of rolling disc:\n$$K = \\frac{1}{2} M v^2 + \\frac{1}{2} I \\omega^2 = \\frac{1}{2} M v^2 + \\frac{1}{2} \\left(\\frac{1}{2}MR^2\\right) \\left(\\frac{v}{R}\\right)^2 = \\frac{3}{4} M v^2$$\n\n3. Substituting $M = 100\\text{ kg}$ and $v = 0.2\\text{ m/s}$:\n$$K = \\frac{3}{4} (100) (0.2)^2 = 75 \\times 0.04 = 3\\text{ J}$$\n\n4. By the work-energy theorem, work needed to stop it equals its total kinetic energy, $W = 3\\text{ J}$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 25,
    exam: 'NEET 2018',
    question: "A solid sphere is in rolling motion. In rolling motion a body possesses translational kinetic energy ($K_t$) as well as rotational kinetic energy ($K_r$) simultaneously. The ratio $K_t : (K_t + K_r)$ for the sphere is",
    options: [
      "$7 : 10$",
      "$5 : 7$",
      "$10 : 7$",
      "$2 : 5$"
    ],
    correctIndex: 1,
    solution: "1. For a solid sphere rolling without slipping:\n$$K_t = \\frac{1}{2} M v^2$$\n$$K_r = \\frac{1}{2} I \\omega^2 = \\frac{1}{2} \\left(\\frac{2}{5} M R^2\\right) \\left(\\frac{v}{R}\\right)^2 = \\frac{1}{5} M v^2$$\n\n2. Total kinetic energy:\n$$K_{\\text{total}} = K_t + K_r = \\frac{1}{2} M v^2 + \\frac{1}{5} M v^2 = \\frac{7}{10} M v^2$$\n\n3. The required ratio is:\n$$\\frac{K_t}{K_t + K_r} = \\frac{\\frac{1}{2} M v^2}{\\frac{7}{10} M v^2} = \\frac{5}{7} = 5 : 7$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 26,
    exam: 'NEET 2018',
    question: "A solid sphere is rotating freely about its symmetry axis in free space. The radius of the sphere is increased keeping its mass same. Which of the following physical quantities would remain constant for the sphere?",
    options: [
      "Angular velocity",
      "Moment of inertia",
      "Rotational kinetic energy",
      "Angular momentum"
    ],
    correctIndex: 3,
    solution: "1. Since the sphere is in free space, no external torque acts on it ($\\tau_{\\text{ext}} = 0$).\n\n2. By the principle of conservation of angular momentum:\n$$L = I\\omega = \\text{constant}$$\n\n3. When the radius increases, moment of inertia ($I = \\frac{2}{5}MR^2$) increases, and angular velocity ($\\omega$) decreases, but angular momentum remains strictly constant.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 27,
    exam: 'NEET 2018',
    question: "Three objects, A : (a solid sphere), B : (a thin circular disk) and C : (a circular ring), each have the same mass $M$ and radius $R$. They all spin with the same angular speed $\\omega$ about their own symmetry axes. The amounts of work ($W$) required to bring them to rest, would satisfy the relation",
    options: [
      "$W_C > W_B > W_A$",
      "$W_A > W_B > W_C$",
      "$W_B > W_A > W_C$",
      "$W_A > W_C > W_B$"
    ],
    correctIndex: 0,
    solution: "1. Work required to bring each rotating body to rest equals its initial rotational kinetic energy:\n$$W = \\frac{1}{2} I \\omega^2$$\n\n2. Since all bodies have the same mass $M$, radius $R$, and spin with the same angular speed $\\omega$, $W$ is directly proportional to their moment of inertia $I$:\n- For solid sphere (A): $I_A = \\frac{2}{5} M R^2 = 0.4 M R^2$\n- For disc (B): $I_B = \\frac{1}{2} M R^2 = 0.5 M R^2$\n- For ring (C): $I_C = M R^2 = 1.0 M R^2$\n\n3. Comparing moments of inertia:\n$$I_C > I_B > I_A \\implies W_C > W_B > W_A$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 28,
    exam: 'NEET 2018',
    question: "The moment of the force, $\\vec{F} = 4\\hat{i} + 5\\hat{j} - 6\\hat{k}$ at $(2, 0, -3)$, about the point $(2, -2, -2)$, is given by",
    options: [
      "$-8\\hat{i} - 4\\hat{j} - 7\\hat{k}$",
      "$-4\\hat{i} - \\hat{j} - 8\\hat{k}$",
      "$-7\\hat{i} - 8\\hat{j} - 4\\hat{k}$",
      "$-7\\hat{i} - 4\\hat{j} - 8\\hat{k}$"
    ],
    correctIndex: 3,
    solution: "1. Position vector of point of application with respect to the point of rotation:\n$$\\vec{r} = (2 - 2)\\hat{i} + (0 - (-2))\\hat{j} + (-3 - (-2))\\hat{k} = 0\\hat{i} + 2\\hat{j} - \\hat{k}$$\n\n2. Torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$:\n$$\\vec{\\tau} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 0 & 2 & -1 \\\\ 4 & 5 & -6 \\end{vmatrix}$$\n$$\\vec{\\tau} = \\hat{i}[(2)(-6) - (-1)(5)] - \\hat{j}[(0)(-6) - (-1)(4)] + \\hat{k}[(0)(5) - (2)(4)]$$\n$$\\vec{\\tau} = \\hat{i}[-12 + 5] - \\hat{j}[0 + 4] + \\hat{k}[0 - 8] = -7\\hat{i} - 4\\hat{j} - 8\\hat{k}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 29,
    exam: 'NEET 2017',
    question: "A rope is wound around a hollow cylinder of mass $3\\text{ kg}$ and radius $40\\text{ cm}$. What is the angular acceleration of the cylinder if the rope is pulled with a force of $30\\text{ N}$?",
    options: [
      "$0.25\\text{ rad s}^{-2}$",
      "$25\\text{ rad s}^{-2}$",
      "$5\\text{ m s}^{-2}$",
      "$25\\text{ m s}^{-2}$"
    ],
    correctIndex: 1,
    solution: "1. Torque exerted by the rope:\n$$\\tau = F R = 30 \\times 0.40 = 12\\text{ N m}$$\n\n2. Moment of inertia of the hollow thin-walled cylinder about its symmetry axis:\n$$I = M R^2 = 3 \\times (0.40)^2 = 3 \\times 0.16 = 0.48\\text{ kg m}^2$$\n\n3. Angular acceleration:\n$$\\alpha = \\frac{\\tau}{I} = \\frac{12}{0.48} = 25\\text{ rad s}^{-2}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 30,
    exam: 'NEET 2017',
    question: "Two discs of same moment of inertia rotating about their regular axis passing through centre and perpendicular to the plane of disc with angular velocities $\\omega_1$ and $\\omega_2$. They are brought into contact face to face coinciding the axis of rotation. The expression for loss of energy during this process is",
    options: [
      "$\\frac{1}{4} I(\\omega_1 - \\omega_2)^2$",
      "$I(\\omega_1 - \\omega_2)^2$",
      "$\\frac{1}{8} I(\\omega_1 - \\omega_2)^2$",
      "$\\frac{1}{2} I(\\omega_1 + \\omega_2)^2$"
    ],
    correctIndex: 0,
    solution: "1. The loss of rotational kinetic energy when two rotating bodies are coupled together is:\n$$\\Delta E = \\frac{I_1 I_2}{2(I_1 + I_2)} (\\omega_1 - \\omega_2)^2$$\n\n2. For two identical discs with $I_1 = I_2 = I$:\n$$\\Delta E = \\frac{I \\cdot I}{2(I + I)} (\\omega_1 - \\omega_2)^2 = \\frac{I^2}{4I} (\\omega_1 - \\omega_2)^2 = \\frac{1}{4} I (\\omega_1 - \\omega_2)^2$$\n\nHence, the correct option is (A)."
  }
];

export default ROTATIONAL_PYQ_PART1;

