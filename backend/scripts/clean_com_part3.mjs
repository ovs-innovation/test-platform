import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'com_diagram_urls.json'), 'utf8'));

export const COM_PART3 = [
  {
    qNum: 101,
    exam: "JEE Main 2023 (30 Jan, Shift 1)",
    question: "A ball of mass $200\text{ g}$ rests on a vertical post of height $20\text{ m}$. A bullet of mass $10\text{ g}$, travelling in horizontal direction, hits the centre of the ball. After collision both travel independently. The ball hits the ground at a distance $30\text{ m}$ and the bullet at a distance of $120\text{ m}$ from the foot of the post. The value of initial velocity of the bullet will be (if $g = 10\text{ ms}^{-2}$):",
    options: [
      "$120\text{ ms}^{-1}$",
      "$60\text{ ms}^{-1}$",
      "$400\text{ ms}^{-1}$",
      "$360\text{ ms}^{-1}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Time of flight from height $h = 20\text{ m}$:\n$$t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\times 20}{10}} = \\sqrt{4} = 2\text{ s}$$\n\n2. Horizontal velocities immediately after collision:\n- For ball: $v_1 = \\frac{R_{\\text{ball}}}{t} = \\frac{30}{2} = 15\text{ ms}^{-1}$\n- For bullet: $v_2 = \\frac{R_{\\text{bullet}}}{t} = \\frac{120}{2} = 60\text{ ms}^{-1}$\n\n3. By conservation of linear momentum along horizontal direction:\n$$m u = M v_1 + m v_2$$\nwhere $m = 10\text{ g} = 0.01\text{ kg}, M = 200\text{ g} = 0.2\text{ kg}$:\n$$0.01 u = (0.2)(15) + (0.01)(60) = 3 + 0.6 = 3.6$$\n$$u = \\frac{3.6}{0.01} = 360\text{ ms}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 102,
    exam: "JEE Main 2023 (30 Jan, Shift 1)",
    question: "As per the given figure, a small ball P slides down the quadrant of a circle and hits the other ball Q of equal mass which is initially at rest. Neglecting the effect of friction and assume the collision to be elastic, the velocity of ball Q after collision will be: ($g = 10\text{ ms}^{-2}$)",
    options: [
      "$0$",
      "$0.25\text{ ms}^{-1}$",
      "$2\text{ ms}^{-1}$",
      "$4\text{ ms}^{-1}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls["q102_diagram.png"] || null,
    solution: "1. Velocity of ball P just before collision after descending quadrant of radius $R = 20\text{ cm} = 0.2\text{ m}$:\n$$v_P = \\sqrt{2 g R} = \\sqrt{2 \\times 10 \\times 0.2} = \\sqrt{4} = 2\text{ ms}^{-1}$$\n\n2. In a 1D elastic collision between two bodies of equal mass, the velocities are completely interchanged:\n- Since ball Q was initially at rest ($u_Q = 0$), ball P comes to rest after collision ($v_P' = 0$).\n- Ball Q acquires the velocity of ball P: $v_Q' = v_P = 2\text{ ms}^{-1}$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 103,
    exam: "JEE Main 2023 (30 Jan, Shift 2)",
    question: "A machine gun of mass $10\text{ kg}$ fires $20\text{ g}$ bullets at the rate of $180\text{ bullets per minute}$ with a speed of $100\text{ ms}^{-1}$ each. The recoil velocity of the gun is:",
    options: [
      "$0.02\text{ ms}^{-1}$",
      "$2.5\text{ ms}^{-1}$",
      "$1.5\text{ ms}^{-1}$",
      "$0.6\text{ ms}^{-1}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Firing rate: $n = \\frac{180}{60} = 3\text{ bullets per second}$.\nMass of each bullet: $m = 20\text{ g} = 0.02\text{ kg}$.\nSpeed of bullet: $v = 100\text{ ms}^{-1}$.\n\nMomentum of bullets fired in 1 second:\n$$P = n m v = 3 \\times 0.02 \\times 100 = 6\text{ kg ms}^{-1}$$\n\nBy conservation of momentum, recoil velocity of gun of mass $M = 10\text{ kg}$:\n$$M V = P \\implies 10 V = 6 \\implies V = 0.6\text{ ms}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 104,
    exam: "JEE Main 2023 (31 Jan, Shift 1)",
    question: "100 balls each of mass $m$ moving with speed $v$ simultaneously strike a wall normally and are reflected back with the same speed, in time $t\text{ s}$. The total force exerted by the balls on the wall is:",
    options: [
      "$\\frac{100mv}{t}$",
      "$\\frac{200mv}{t}$",
      "$\\frac{50mv}{t}$",
      "$\\frac{mv}{100t}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls["q104_diagram.png"] || null,
    solution: "Change in momentum of each ball when reflected normally with the same speed:\n$$\\Delta p = m v - (-m v) = 2 m v$$\n\nTotal change in momentum for $100$ balls:\n$$\\Delta P_{\\text{total}} = 100 \\times (2 m v) = 200 m v$$\n\nAverage force exerted by the balls on the wall in time $t$:\n$$F = \\frac{\\Delta P_{\\text{total}}}{t} = \\frac{200 m v}{t}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 105,
    exam: "JEE Main 2023 (31 Jan, Shift 2)",
    question: "A ball is dropped from a height of $20\text{ m}$. If the coefficient of restitution for the collision between ball and floor is $0.5$, after hitting the floor, the ball rebounds to a height of ____ m.",
    options: [],
    correct_option: null,
    numeric_answer: 5,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The rebound height after one collision with a coefficient of restitution $e$ is given by:\n$$h' = e^2 h$$\n\nGiven $h = 20\text{ m}$ and $e = 0.5$:\n$$h' = (0.5)^2 \\times 20 = 0.25 \\times 20 = 5\text{ m}$$\n\nTherefore, the ball rebounds to a height of $5\text{ m}$."
  },
  {
    qNum: 106,
    exam: "JEE Main 2023 (01 Feb, Shift 2)",
    question: "Figures (a), (b), (c) and (d) show variation of force with time. The impulse is highest in figure:",
    options: [
      "Fig (c)",
      "Fig (b)",
      "Fig (a)",
      "Fig (d)"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls["q106_diagram.png"] || null,
    solution: "Impulse is equal to the area under the force vs. time ($F-t$) curve:\n- Fig (a): Triangle with base $1.0\text{ s}$, height $1.0\text{ N}$ $\\implies \\text{Area} = \\frac{1}{2} \\times 1.0 \\times 1.0 = 0.5\text{ Ns}$\n- Fig (b): Rectangle with base $2.0\text{ s}$, height $0.5\text{ N}$ $\\implies \\text{Area} = 2.0 \\times 0.5 = 1.0\text{ Ns}$\n- Fig (c): Triangle with base $1.0\text{ s}$, height $0.75\text{ N}$ $\\implies \\text{Area} = \\frac{1}{2} \\times 1.0 \\times 0.75 = 0.375\text{ Ns}$\n- Fig (d): Triangle with base $2.0\text{ s}$, height $0.5\text{ N}$ $\\implies \\text{Area} = \\frac{1}{2} \\times 2.0 \\times 0.5 = 0.5\text{ Ns}$\n\nHence, Fig (b) has the maximum impulse ($1.0\text{ Ns}$).\n\nHence, the correct option is (B)."
  },
  {
    qNum: 107,
    exam: "JEE Main 2023 (06 Apr, Shift 2)",
    question: "A body is dropped on ground from a height $h_1$ and after hitting the ground, it rebounds to a height $h_2$. If the ratio of velocities of the body just before and after hitting ground is $4$, then percentage loss in kinetic energy of the body is $\\frac{x}{4}\\%$. The value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 375,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Given that $\\frac{v_1}{v_2} = 4 \\implies v_2 = \\frac{v_1}{4}$.\n\nInitial kinetic energy: $K_1 = \\frac{1}{2} m v_1^2$.\nFinal kinetic energy: $K_2 = \\frac{1}{2} m v_2^2 = \\frac{1}{2} m \\left(\\frac{v_1}{4}\\right)^2 = \\frac{K_1}{16}$.\n\nPercentage loss in kinetic energy:\n$$\\text{Percentage loss} = \\frac{K_1 - K_2}{K_1} \\times 100\\% = \\left(1 - \\frac{1}{16}\\right) \\times 100\\% = \\frac{15}{16} \\times 100\\% = \\frac{1500}{16}\\% = \\frac{375}{4}\\%$$\n\nComparing with $\\frac{x}{4}\\%$, we get $x = 375$."
  },
  {
    qNum: 108,
    exam: "JEE Main 2023 (08 Apr, Shift 2)",
    question: "A bullet of mass $0.1\text{ kg}$ moving horizontally with speed $400\text{ ms}^{-1}$ hits a wooden block of mass $3.9\text{ kg}$ kept on a horizontal rough surface. The bullet gets embedded into the block and moves $20\text{ m}$ before coming to rest. The coefficient of friction between the block and the surface is: (Take $g = 10\text{ ms}^{-2}$)",
    options: [
      "$0.90$",
      "$0.50$",
      "$0.65$",
      "$0.25$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Conservation of linear momentum during impact:\n$$m u = (m + M) V$$\n$$(0.1)(400) = (0.1 + 3.9) V \\implies 40 = 4.0 V \\implies V = 10\text{ ms}^{-1}$$\n\n2. Deceleration on rough surface:\n$$a = \\mu g$$\n\n3. Using third equation of motion ($v^2 = u^2 - 2as$):\n$$0 = V^2 - 2 (\\mu g) s$$\n$$10^2 = 2 \\times \\mu \\times 10 \\times 20$$\n$$100 = 400 \\mu \\implies \\mu = \\frac{100}{400} = 0.25$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 109,
    exam: "JEE Main 2023 (10 Apr, Shift 1)",
    question: "A particle of mass $m$ moving with velocity $v$ collides with a stationary particle of mass $2m$. After collision, they stick together and continue to move together with velocity:",
    options: [
      "$\\frac{v}{3}$",
      "$\\frac{v}{4}$",
      "$\\frac{v}{2}$",
      "$2v$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "By the law of conservation of linear momentum for a completely inelastic collision:\n$$m_1 u_1 + m_2 u_2 = (m_1 + m_2) v_f$$\n$$m v + 2m(0) = (m + 2m) v_f$$\n$$m v = 3m v_f \\implies v_f = \\frac{v}{3}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 110,
    exam: "JEE Main 2023 (11 Apr, Shift 1)",
    question: "An average force of $125\text{ N}$ is applied on a machine gun firing bullets each of mass $10\text{ g}$ at the speed of $250\text{ ms}^{-1}$ to keep it in position. The number of bullets fired per second by the machine gun is:",
    options: [
      "$50$",
      "$25$",
      "$100$",
      "$5$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Force required to hold the gun is equal to the rate of momentum imparted to the bullets:\n$$F = n m v$$\nGiven $F = 125\text{ N}, m = 10\text{ g} = 0.01\text{ kg}, v = 250\text{ ms}^{-1}$:\n$$125 = n \\times 0.01 \\times 250$$\n$$125 = 2.5 n \\implies n = \\frac{125}{2.5} = 50\text{ bullets/s}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 111,
    exam: "JEE Main 2023 (11 Apr, Shift 2)",
    question: "A nucleus disintegrates into two nuclear parts, in such a way that ratio of their nuclear sizes is $1 : 2^{1/3}$. Their respective speed have a ratio of $n : 1$. The value of $n$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 2,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "1. Nuclear size radius ratio: $\\frac{R_1}{R_2} = \\frac{1}{2^{1/3}}$.\nMass is proportional to volume ($R^3$):\n$$\\frac{m_1}{m_2} = \\left(\\frac{R_1}{R_2}\\right)^3 = \\left(\\frac{1}{2^{1/3}}\\right)^3 = \\frac{1}{2}$$\n\n2. By conservation of linear momentum in disintegration at rest:\n$$m_1 v_1 = m_2 v_2 \\implies \\frac{v_1}{v_2} = \\frac{m_2}{m_1} = \\frac{2}{1}$$\n\nComparing with $n : 1$, we get $n = 2$."
  },
  {
    qNum: 112,
    exam: "JEE Main 2023 (13 Apr, Shift 1)",
    question: "Two bodies are having kinetic energies in the ratio $16 : 9$. If they have same linear momentum, the ratio of their masses respectively is:",
    options: [
      "$3 : 4$",
      "$9 : 16$",
      "$16 : 9$",
      "$4 : 3$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The relation between kinetic energy and linear momentum is:\n$$K = \\frac{p^2}{2m} \\implies m = \\frac{p^2}{2K}$$\n\nSince momenta are equal ($p_1 = p_2$):\n$$\\frac{m_1}{m_2} = \\frac{K_2}{K_1}$$\nGiven $\\frac{K_1}{K_2} = \\frac{16}{9}$, we have:\n$$\\frac{m_1}{m_2} = \\frac{9}{16}$$\n\nHence, the ratio is $9 : 16$.\nHence, the correct option is (B)."
  },
  {
    qNum: 113,
    exam: "JEE Main 2023 (13 Apr, Shift 2)",
    question: "A bullet of $10\text{ g}$ leaves the barrel of gun with a velocity of $600\text{ ms}^{-1}$. If the barrel of gun is $50\text{ cm}$ long and mass of gun is $3\text{ kg}$, then value of impulse supplied to the gun will be:",
    options: [
      "$6\text{ Ns}$",
      "$3\text{ Ns}$",
      "$36\text{ Ns}$",
      "$12\text{ Ns}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "By impulse-momentum theorem, the impulse supplied to the gun is equal in magnitude to the momentum gained by the bullet:\n$$J = m v$$\nGiven $m = 10\text{ g} = 0.01\text{ kg}, v = 600\text{ ms}^{-1}$:\n$$J = 0.01 \\times 600 = 6\text{ Ns}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 114,
    exam: "JEE Main 2024 (27 Jan, Shift 1)",
    question: "A body of mass $1000\text{ kg}$ is moving horizontally with a velocity $6\text{ ms}^{-1}$. If $200\text{ kg}$ extra mass is added, the final velocity (in $\text{ms}^{-1}$) is:",
    options: [
      "$6$",
      "$2$",
      "$3$",
      "$5$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "By conservation of linear momentum along horizontal direction:\n$$M u = (M + m) v$$\n$$1000 \\times 6 = (1000 + 200) \\times v$$\n$$6000 = 1200 v \\implies v = \\frac{6000}{1200} = 5\text{ ms}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 115,
    exam: "JEE Main 2024 (30 Jan, Shift 1)",
    question: "A spherical body of mass $100\text{ g}$ is dropped from a height of $10\text{ m}$ from the ground. After hitting the ground, the body rebounds to a height of $5\text{ m}$. The impulse of force imparted by the ground to the body is given by: (given $g = 9.8\text{ ms}^{-2}$)",
    options: [
      "$4.39\text{ kg ms}^{-1}$",
      "$43.2\text{ kg ms}^{-1}$",
      "$23.9\text{ kg ms}^{-1}$",
      "$2.39\text{ kg ms}^{-1}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Velocity just before hitting ground:\n$$v_1 = \\sqrt{2 g h_1} = \\sqrt{2 \\times 9.8 \\times 10} = \\sqrt{196} = 14\text{ ms}^{-1}$$\n\n2. Velocity just after rebound:\n$$v_2 = \\sqrt{2 g h_2} = \\sqrt{2 \\times 9.8 \\times 5} = \\sqrt{98} = 7\\sqrt{2} \\approx 9.899\text{ ms}^{-1}$$\n\n3. Impulse imparted by the ground (taking upward as positive):\n$$J = m (v_2 - (-v_1)) = m (v_2 + v_1)$$\nGiven $m = 100\text{ g} = 0.1\text{ kg}$:\n$$J = 0.1 \\times (9.899 + 14) = 0.1 \\times 23.899 \\approx 2.39\text{ kg ms}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 116,
    exam: "JEE Main 2024 (31 Jan, Shift 1)",
    question: "An artillery piece of mass $M_1$ fires a shell of mass $M_2$ horizontally. Instantaneously after the firing, the ratio of kinetic energy of the artillery and that of the shell is:",
    options: [
      "$\\frac{M_1}{M_1 + M_2}$",
      "$\\frac{M_2}{M_1}$",
      "$\\frac{M_2}{M_1 + M_2}$",
      "$\\frac{M_1}{M_2}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "By conservation of linear momentum in firing from rest:\n$$|p_{\\text{artillery}}| = |p_{\\text{shell}}| = p$$\n\nKinetic energy is related to momentum by $K = \\frac{p^2}{2M}$:\n- Kinetic energy of artillery: $K_1 = \\frac{p^2}{2M_1}$\n- Kinetic energy of shell: $K_2 = \\frac{p^2}{2M_2}$\n\nRatio of kinetic energy of artillery to shell:\n$$\\frac{K_1}{K_2} = \\frac{p^2 / (2M_1)}{p^2 / (2M_2)} = \\frac{M_2}{M_1}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 117,
    exam: "JEE Main 2024 (01 Feb, Shift 1)",
    question: "Three identical spheres each of mass $2M$ are placed at the corners of a right angled triangle with mutually perpendicular sides equal to $4\text{ m}$ each. Taking point of intersection of these two sides as origin, the magnitude of position vector of the centre of mass of the system is $\\frac{4\\sqrt{2}}{x}$ where the value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 3,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Taking origin at the right-angled vertex $(0, 0)$:\n- Sphere 1: $(0, 0)$, mass $2M$\n- Sphere 2: $(4, 0)$, mass $2M$\n- Sphere 3: $(0, 4)$, mass $2M$\n\nTotal mass: $M_{\\text{total}} = 2M + 2M + 2M = 6M$.\n\nCentre of mass:\n$$x_{\\text{cm}} = \\frac{2M(0) + 2M(4) + 2M(0)}{6M} = \\frac{8M}{6M} = \\frac{4}{3}\text{ m}$$\n$$y_{\\text{cm}} = \\frac{2M(0) + 2M(0) + 2M(4)}{6M} = \\frac{8M}{6M} = \\frac{4}{3}\text{ m}$$\n\nMagnitude of position vector:\n$$r_{\\text{cm}} = \\sqrt{x_{\\text{cm}}^2 + y_{\\text{cm}}^2} = \\sqrt{\\left(\\frac{4}{3}\\right)^2 + \\left(\\frac{4}{3}\\right)^2} = \\frac{4\\sqrt{2}}{3}\text{ m}$$\n\nComparing with $\\frac{4\\sqrt{2}}{x}$, we get $x = 3$."
  },
  {
    qNum: 118,
    exam: "JEE Main 2024 (01 Feb, Shift 2)",
    question: "A simple pendulum of length $1\text{ m}$ has a wooden bob of mass $1\text{ kg}$. It is struck by a bullet of mass $10^{-2}\text{ kg}$ moving with a speed of $2 \\times 10^2\text{ ms}^{-1}$. The bullet gets embedded into the bob. The height to which the bob rises before swinging back is: (use $g = 10\text{ ms}^{-2}$)",
    options: [
      "$0.30\text{ m}$",
      "$0.20\text{ m}$",
      "$0.35\text{ m}$",
      "$0.40\text{ m}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Conservation of linear momentum during bullet embedment:\n$$m u = (M + m) V$$\n$$\\left(10^{-2}\\right) \\times \\left(2 \\times 10^2\\right) = (1 + 0.01) V \\approx 1 \\times V \\implies V = 2\text{ ms}^{-1}$$\n\n2. Maximum height reached from conservation of mechanical energy:\n$$h = \\frac{V^2}{2g} = \\frac{2^2}{2 \\times 10} = \\frac{4}{20} = 0.20\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 119,
    exam: "JEE Main 2024 (04 Apr, Shift 2)",
    question: "In a system two particles of masses $m_1 = 3\text{ kg}$ and $m_2 = 2\text{ kg}$ are placed at certain distance from each other. The particle of mass $m_1$ is moved towards the center of mass of the system through a distance $2\text{ cm}$. In order to keep the center of mass of the system at the original position, the particle of mass $m_2$ should move towards the center of mass by the distance ____ cm.",
    options: [],
    correct_option: null,
    numeric_answer: 3,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For the center of mass to remain stationary:\n$$m_1 \\Delta x_1 = m_2 \\Delta x_2$$\nGiven $m_1 = 3\text{ kg}, \\Delta x_1 = 2\text{ cm}, m_2 = 2\text{ kg}$:\n$$3 \\times 2 = 2 \\times \\Delta x_2$$\n$$6 = 2 \\Delta x_2 \\implies \\Delta x_2 = 3\text{ cm}$$\n\nTherefore, the particle of mass $m_2$ should move by $3\text{ cm}$."
  },
  {
    qNum: 120,
    exam: "JEE Main 2024 (05 Apr, Shift 1)",
    question: "Four particles A, B, C, D of mass $\\frac{m}{2}, m, 2m, 4m$, have same momentum, respectively. The particle with maximum kinetic energy is:",
    options: [
      "D",
      "A",
      "B",
      "C"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Kinetic energy is given by $K = \\frac{p^2}{2m}$.\nSince all four particles have the same momentum $p$, kinetic energy is inversely proportional to mass ($K \\propto \\frac{1}{m}$).\nTherefore, the particle with the smallest mass (particle A with mass $m/2$) will possess the maximum kinetic energy.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 121,
    exam: "JEE Main 2024 (06 Apr, Shift 2)",
    question: "When kinetic energy of a body becomes $36$ times of its original value, the percentage increase in the momentum of the body will be:",
    options: [
      "$6\\%$",
      "$600\\%$",
      "$50\\%$",
      "$500\\%$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Momentum is proportional to the square root of kinetic energy: $p = \\sqrt{2 m K}$.\nWhen $K_f = 36 K_i$:\n$$p_f = \\sqrt{2 m (36 K_i)} = 6 \\sqrt{2 m K_i} = 6 p_i$$\n\nPercentage increase in momentum:\n$$\\frac{p_f - p_i}{p_i} \\times 100\\% = \\frac{6 p_i - p_i}{p_i} \\times 100\\% = 5 \\times 100\\% = 500\\%$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 122,
    exam: "JEE Main 2024 (08 Apr, Shift 1)",
    question: "Three bodies A, B and C have equal kinetic energies and their masses are $400\text{ g}, 1.2\text{ kg}$ and $1.6\text{ kg}$ respectively. The ratio of their linear momenta is:",
    options: [
      "$1 : 3 : 2$",
      "$1 : \\sqrt{3} : 2$",
      "$1 : 3 : \\sqrt{2}$",
      "$\\sqrt{3} : \\sqrt{2} : 1$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Momentum is given by $p = \\sqrt{2 m K}$.\nSince kinetic energies are equal:\n$$p_A : p_B : p_C = \\sqrt{m_A} : \\sqrt{m_B} : \\sqrt{m_C}$$\nMasses in grams: $m_A = 400\text{ g}, m_B = 1200\text{ g}, m_C = 1600\text{ g}$.\n\nRatio of momenta:\n$$p_A : p_B : p_C = \\sqrt{400} : \\sqrt{1200} : \\sqrt{1600} = 20 : 20\\sqrt{3} : 40 = 1 : \\sqrt{3} : 2$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 123,
    exam: "JEE Main 2024 (08 Apr, Shift 2)",
    question: "A uniform thin metal plate of mass $10\text{ kg}$ with dimensions is shown. The ratio of x and y coordinates of center of mass of plate is $\\frac{n}{9}$. The value of $n$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 15,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q123_diagram.png"] || null,
    solution: "Let the plate be decomposed into rectangle components or treated by mass moments:\nFrom the coordinates and dimensions:\n- $x_{\\text{cm}} = 1.5\text{ cm}$\n- $y_{\\text{cm}} = 0.9\text{ cm}$\n\nRatio of coordinates:\n$$\\frac{x_{\\text{cm}}}{y_{\\text{cm}}} = \\frac{1.5}{0.9} = \\frac{15}{9}$$\n\nComparing with $\\frac{n}{9}$, we get $n = 15$."
  },
  {
    qNum: 124,
    exam: "JEE Main 2024 (09 Apr, Shift 1)",
    question: "A player caught a cricket ball of mass $150\text{ g}$ moving at a speed of $20\text{ m/s}$. If the catching process is completed in $0.1\text{ s}$, the magnitude of force exerted by the ball on the hand of the player is:",
    options: [
      "$3\text{ N}$",
      "$300\text{ N}$",
      "$150\text{ N}$",
      "$30\text{ N}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Change in momentum of the ball:\n$$\\Delta p = m v - 0 = (0.150\text{ kg}) \\times (20\text{ m/s}) = 3.0\text{ kg m/s}$$\n\nAverage force exerted during contact:\n$$F = \\frac{\\Delta p}{\\Delta t} = \\frac{3.0}{0.1} = 30\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 125,
    exam: "JEE Main 2024 (09 Apr, Shift 1)",
    question: "A stationary particle breaks into two parts of masses $m_A$ and $m_B$ which move with velocities $v_A$ and $v_B$ respectively. The ratio of their kinetic energies $(K_B : K_A)$ is:",
    options: [
      "$v_B : v_A$",
      "$m_B : m_A$",
      "$m_B v_B : m_A v_A$",
      "$1 : 1$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Since the particle was initially stationary, by conservation of linear momentum:\n$$|p_A| = |p_B| \\implies m_A v_A = m_B v_B \\implies \\frac{m_A}{m_B} = \\frac{v_B}{v_A}$$\n\nRatio of kinetic energies:\n$$\\frac{K_B}{K_A} = \\frac{\\frac{1}{2} m_B v_B^2}{\\frac{1}{2} m_A v_A^2} = \\left(\\frac{m_B v_B}{m_A v_A}\\right) \\left(\\frac{v_B}{v_A}\\right) = 1 \\times \\left(\\frac{v_B}{v_A}\\right) = \\frac{v_B}{v_A}$$\n\nHence, $K_B : K_A = v_B : v_A$.\nHence, the correct option is (A)."
  },
  {
    qNum: 126,
    exam: "JEE Main 2025 (23 Jan, Shift 1)",
    question: "Consider a circular disc of radius $20\text{ cm}$ with centre located at the origin. A circular hole of radius $5\text{ cm}$ is cut from this disc in such a way that the edge of the hole touches the edge of the disc. The distance of centre of mass of residual or remaining disc from the origin will be:",
    options: [
      "$2.0\text{ cm}$",
      "$1.5\text{ cm}$",
      "$1.0\text{ cm}$",
      "$0.5\text{ cm}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let the centre of original disc of radius $R = 20\text{ cm}$ be at the origin $(0, 0)$.\nThe cut circular hole has radius $r = 5\text{ cm}$.\nSince the hole touches the outer edge of the disc, the distance of its center from the origin is:\n$$d = R - r = 20 - 5 = 15\text{ cm}$$\n\nMass is proportional to area ($A = \\pi R^2$):\n- $A_{\\text{original}} = \\pi (20)^2 = 400\\pi$\n- $A_{\\text{hole}} = \\pi (5)^2 = 25\\pi$\n\nCentre of mass of the remaining portion:\n$$x_{\\text{cm}} = \\frac{A_{\\text{original}}(0) - A_{\\text{hole}}(d)}{A_{\\text{original}} - A_{\\text{hole}}} = \\frac{0 - (25\\pi)(15)}{400\\pi - 25\\pi} = \\frac{-375\\pi}{375\\pi} = -1.0\text{ cm}$$\n\nTaking the distance from the origin: $|x_{\\text{cm}}| = 1.0\text{ cm}$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 127,
    exam: "JEE Main 2025 (28 Jan, Shift 1)",
    question: "The center of mass of a thin rectangular plate (fig - x) with sides of length $a$ and $b$, whose mass per unit area $(\\sigma)$ varies as $\\sigma = \\sigma_0 \\frac{x}{a}$ (where $\\sigma_0$ is a constant), would be:",
    options: [
      "$\\left(\\frac{2}{3}a, \\frac{b}{2}\\right)$",
      "$\\left(\\frac{a}{2}, \\frac{b}{2}\\right)$",
      "$\\left(\\frac{1}{3}a, \\frac{b}{2}\\right)$",
      "$\\left(\\frac{3}{4}a, \\frac{2}{3}b\\right)$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q127_diagram.png"] || null,
    solution: "Given $\\sigma(x, y) = \\sigma_0 \\frac{x}{a}$, which depends only on $x$.\n\n1. Along the y-direction, the mass distribution is uniform from $y = 0$ to $y = b$:\n$$y_{\\text{cm}} = \\frac{b}{2}$$\n\n2. Along the x-direction:\nTotal mass $M$:\n$$M = \\int_0^a \\int_0^b \\sigma_0 \\frac{x}{a} \\text{d}y \\text{d}x = \\frac{\\sigma_0 b}{a} \\int_0^a x \\text{d}x = \\frac{\\sigma_0 b}{a} \\left(\\frac{a^2}{2}\\right) = \\frac{1}{2} \\sigma_0 a b$$\n\nMoment of mass about y-axis:\n$$\\int x \\text{d}m = \\frac{\\sigma_0 b}{a} \\int_0^a x^2 \\text{d}x = \\frac{\\sigma_0 b}{a} \\left(\\frac{a^3}{3}\\right) = \\frac{1}{3} \\sigma_0 a^2 b$$\n\nCentre of mass coordinate $x_{\\text{cm}}$:\n$$x_{\\text{cm}} = \\frac{\\frac{1}{3} \\sigma_0 a^2 b}{\\frac{1}{2} \\sigma_0 a b} = \\frac{2}{3} a$$\n\nCentre of mass coordinates: $\\left(\\frac{2}{3}a, \\frac{b}{2}\\right)$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 128,
    exam: "JEE Main 2025 (28 Jan, Shift 2)",
    question: "A uniform rod of mass $250\text{ g}$ having length $100\text{ cm}$ is balanced on a sharp edge at $40\text{ cm}$ mark. A mass of $400\text{ g}$ is suspended at $10\text{ cm}$ mark. To maintain the balance of the rod, the mass to be suspended at $90\text{ cm}$ mark, is:",
    options: [
      "$190\text{ g}$",
      "$200\text{ g}$",
      "$300\text{ g}$",
      "$290\text{ g}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Pivot is at the $40\text{ cm}$ mark.\nForces and their positions w.r.t pivot:\n- Suspended mass $m_1 = 400\text{ g}$ at $10\text{ cm}$ mark: lever arm $d_1 = 40 - 10 = 30\text{ cm}$ (anticlockwise torque)\n- Weight of uniform rod $m_{\\text{rod}} = 250\text{ g}$ acts at its centre of mass ($50\text{ cm}$ mark): lever arm $d_{\\text{rod}} = 50 - 40 = 10\text{ cm}$ (clockwise torque)\n- Mass $M$ suspended at $90\text{ cm}$ mark: lever arm $d_2 = 90 - 40 = 50\text{ cm}$ (clockwise torque)\n\nFor rotational equilibrium about the pivot:\n$$\\sum \\tau = 0$$\n$$m_1 \\times d_1 = m_{\\text{rod}} \\times d_{\\text{rod}} + M \\times d_2$$\n$$400 \\times 30 = 250 \\times 10 + M \\times 50$$\n$$12000 = 2500 + 50 M$$\n$$50 M = 12000 - 2500 = 9500 \\implies M = \\frac{9500}{50} = 190\text{ g}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 129,
    exam: "JEE Main 2025 (29 Jan, Shift 1)",
    question: "As shown below, bob A of a pendulum having massless string of length $R$ is released from $60^\\circ$ to the vertical. It hits another bob B of half the mass that is at rest on a frictionless table in the center. Assuming elastic collision, the magnitude of the velocity of bob A after the collision will be (take $g$ as acceleration due to gravity):",
    options: [
      "$\\frac{1}{2}\\sqrt{Rg}$",
      "$\\frac{2}{3}\\sqrt{Rg}$",
      "$\\sqrt{Rg}$",
      "$\\frac{1}{3}\\sqrt{Rg}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q129_diagram.png"] || null,
    solution: "1. Velocity of bob A (mass $m$) just before collision after falling through vertical height $h = R(1 - \\cos 60^\\circ) = \\frac{R}{2}$:\n$$u = \\sqrt{2 g h} = \\sqrt{2 g \\left(\\frac{R}{2}\\right)} = \\sqrt{g R}$$\n\n2. Bob B has mass $m_B = \\frac{m}{2}$ and is at rest ($u_B = 0$).\n\n3. For 1D elastic collision, velocity of bob A after collision:\n$$v_A = \\left(\\frac{m_A - m_B}{m_A + m_B}\\right) u = \\left(\\frac{m - m/2}{m + m/2}\\right) u = \\frac{m/2}{3m/2} u = \\frac{1}{3} u = \\frac{1}{3}\\sqrt{g R}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 130,
    exam: "JEE Main 2025 (29 Jan, Shift 2)",
    question: "Given below are two statements. One is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A): Three identical spheres of same mass undergo one dimensional motion as shown in figure with initial velocities $v_A = 5\text{ m/s}, v_B = 2\text{ m/s}, v_C = 4\text{ m/s}$. If we wait sufficiently long for elastic collisions to happen, then $v_A = 4\text{ m/s}, v_B = 2\text{ m/s}, v_C = 5\text{ m/s}$ will be the final velocities.\nReason (R): In an elastic collision between identical masses, two objects exchange their velocities.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "(A) is false but (R) is true",
      "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(A) is true but (R) is false"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q130_diagram.png"] || null,
    solution: "1. For Reason (R): In an elastic head-on collision between two equal masses, the particles always exchange velocities. This is a standard and TRUE property.\n\n2. For Assertion (A):\n- First collision: A ($5\text{ m/s}$) hits B ($2\text{ m/s}$). After collision, they exchange velocities: $v_A = 2\text{ m/s}, v_B = 5\text{ m/s}$.\n- Next collision: B ($5\text{ m/s}$) hits C ($4\text{ m/s}$). After collision, they exchange velocities: $v_B = 4\text{ m/s}, v_C = 5\text{ m/s}$.\n- Now the velocities are: $v_A = 2\text{ m/s}, v_B = 4\text{ m/s}, v_C = 5\text{ m/s}$.\nSince $v_A < v_B < v_C$, no further collisions occur!\nThus, the correct final velocities are $v_A = 2\text{ m/s}, v_B = 4\text{ m/s}, v_C = 5\text{ m/s}$, NOT $4, 2, 5$. Hence, Assertion (A) is FALSE.\n\nTherefore, (A) is false but (R) is true.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 131,
    exam: "JEE Main 2025 (03 Apr, Shift 2)",
    question: "Consider two blocks A and B of masses $m_1 = 10\text{ kg}$ and $m_2 = 5\text{ kg}$ that are placed on a frictionless table. The block A moves with a constant speed $v = 3\text{ m/s}$ towards the block B kept at rest. A spring with spring constant $k = 3000\text{ N/m}$ is attached with the block B as shown in the figure. After the collision, suppose that the blocks A and B, along with the spring in constant compression state, move together, then the compression in the spring is: (Neglect the mass of the spring)",
    options: [
      "$2\text{ m}$",
      "$0.4\text{ m}$",
      "$0.1\text{ m}$",
      "$3\text{ m}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q131_diagram.png"] || null,
    solution: "1. Common velocity when the spring is at maximum compression (blocks move together):\n$$v_{\\text{cm}} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \\frac{10 \\times 3 + 5 \\times 0}{10 + 5} = \\frac{30}{15} = 2\text{ m/s}$$\n\n2. Energy stored in the spring at maximum compression equals loss in kinetic energy w.r.t center of mass:\n$$\\frac{1}{2} k x^2 = \\frac{1}{2} m_1 v^2 - \\frac{1}{2} (m_1 + m_2) v_{\\text{cm}}^2$$\n$$\\frac{1}{2} (3000) x^2 = \\frac{1}{2} (10)(3)^2 - \\frac{1}{2} (15)(2)^2 = 45 - 30 = 15\text{ J}$$\n$$1500 x^2 = 15 \\implies x^2 = \\frac{15}{1500} = \\frac{1}{100} \\implies x = 0.1\text{ m}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 132,
    exam: "JEE Main 2025 (07 Apr, Shift 1)",
    question: "A rod of length $5L$ is bent at a right angle keeping one side length as $2L$. The position of the centre of mass of the system is: (Consider $L = 10\text{ cm}$)",
    options: [
      "$4\hat{i} + 35\hat{j}\text{ cm}$",
      "$9\hat{i} + 4\hat{j}\text{ cm}$",
      "$9\hat{i} + 15\hat{j}\text{ cm}$",
      "$4\hat{i} + 9\hat{j}\text{ cm}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q132_diagram.png"] || null,
    solution: "Let the bend be at origin $(0, 0)$.\n- Side 1 of length $2L = 20\text{ cm}$ along x-axis: mass $m_1 = 2m$, centre of mass at $(L, 0) = (10\text{ cm}, 0)$\n- Side 2 of length $3L = 30\text{ cm}$ along y-axis: mass $m_2 = 3m$, centre of mass at $(0, 1.5L) = (0, 15\text{ cm})$\n\nTotal mass $M = 2m + 3m = 5m$.\n\nCentre of mass coordinates:\n$$x_{\\text{cm}} = \\frac{2m(10) + 3m(0)}{5m} = \\frac{20}{5} = 4\text{ cm}$$\n$$y_{\\text{cm}} = \\frac{2m(0) + 3m(15)}{5m} = \\frac{45}{5} = 9\text{ cm}$$\n\nPosition vector: $\\vec{r}_{\\text{cm}} = 4\hat{i} + 9\hat{j}\text{ cm}$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 133,
    exam: "JEE Main 2026 (22 Jan, Shift 2)",
    question: "Given below are two statements:\nStatement I: For a mechanical system of many particles total kinetic energy is the sum of kinetic energies of all the particles.\nStatement II: The total kinetic energy can be the sum of kinetic energy of the center of mass w.r.t the origin and the kinetic energy of all the particles w.r.t. the center of mass as the reference.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are false",
      "Statement I is false but Statement II is true",
      "Both Statement I and Statement II are true"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "1. Statement I: Total kinetic energy of a system of particles is defined as $K = \\sum \\frac{1}{2} m_i v_i^2$, which is strictly the sum of kinetic energies of all constituent particles. Thus, Statement I is true.\n\n2. Statement II: By Koenig's theorem (kinetic energy decomposition), the total kinetic energy of a multi-particle system can always be written as:\n$$K = \\frac{1}{2} M_{\\text{total}} v_{\\text{cm}}^2 + \\sum \\frac{1}{2} m_i (v_i')^2$$\nwhere $v_i'$ is the velocity of the $i$-th particle with respect to the center of mass frame. Thus, Statement II is true.\n\nBoth Statement I and Statement II are true.\nHence, the correct option is (D)."
  },
  {
    qNum: 134,
    exam: "JEE Main 2026 (23 Jan, Shift 1)",
    question: "In a perfectly inelastic collision, two spheres made of the same material with masses $15\text{ kg}$ and $25\text{ kg}$, moving in opposite directions with speeds of $10\text{ m/s}$ and $30\text{ m/s}$, respectively, strike each other and stick together. The rise in temperature (in $^\\circ\\text{C}$), if all the heat produced during the collision is retained by these spheres, is: (specific heat of sphere material $31\text{ cal/kg}^\\circ\\text{C}$ and $1\text{ cal} = 4.2\text{ J}$)",
    options: [
      "$1.15$",
      "$1.75$",
      "$1.44$",
      "$1.95$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Let $m_1 = 15\text{ kg}, u_1 = +10\text{ m/s}$ and $m_2 = 25\text{ kg}, u_2 = -30\text{ m/s}$.\nCommon velocity after perfectly inelastic collision:\n$$v = \\frac{m_1 u_1 + m_2 u_2}{m_1 + m_2} = \\frac{15(10) + 25(-30)}{15 + 25} = \\frac{150 - 750}{40} = -15\text{ m/s}$$\n\n2. Initial kinetic energy:\n$$K_i = \\frac{1}{2} (15)(10)^2 + \\frac{1}{2} (25)(30)^2 = 750 + 11250 = 12000\text{ J}$$\n\n3. Final kinetic energy:\n$$K_f = \\frac{1}{2} (40)(15)^2 = 20 \\times 225 = 4500\text{ J}$$\n\n4. Loss in kinetic energy (heat produced $Q$):\n$$Q = 12000 - 4500 = 7500\text{ J}$$\n\n5. Temperature rise $\\Delta T$:\n$$Q = (m_1 + m_2) c \\Delta T$$\n$$c = 31 \\times 4.2 = 130.2\text{ J/kg}^\\circ\\text{C}$$\n$$7500 = 40 \\times 130.2 \\times \\Delta T = 5208 \\Delta T$$\n$$\\Delta T = \\frac{7500}{5208} \\approx 1.44^\\circ\\text{C}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 135,
    exam: "JEE Main 2026 (23 Jan, Shift 2)",
    question: "A body of mass $14\text{ kg}$ initially at rest explodes and breaks into three fragments of masses in the ratio $2 : 2 : 3$. The two pieces of equal masses fly off perpendicular to each other with a speed of $18\text{ m/s}$ each. The velocity of the heavier fragment is ____ m/s.",
    options: [
      "$12$",
      "$10\\sqrt{2}$",
      "$24\\sqrt{2}$",
      "$12\\sqrt{2}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Masses of the fragments ($2 : 2 : 3$, total $7$ parts for $14\text{ kg}$):\n- $m_1 = 4\text{ kg}$\n- $m_2 = 4\text{ kg}$\n- $m_3 = 6\text{ kg}$\n\n2. Momenta of the two equal fragments flying perpendicularly:\n$$\\vec{p}_1 = 4(18)\hat{i} = 72\hat{i}\text{ kg m/s}$$\n$$\\vec{p}_2 = 4(18)\hat{j} = 72\hat{j}\text{ kg m/s}$$\n\n3. By conservation of linear momentum (initially at rest):\n$$\\vec{p}_3 = -(\\vec{p}_1 + \\vec{p}_2) = -72\hat{i} - 72\hat{j}\text{ kg m/s}$$\n\n4. Magnitude of momentum of third fragment:\n$$|\\vec{p}_3| = \\sqrt{72^2 + 72^2} = 72\\sqrt{2}\text{ kg m/s}$$\n\n5. Velocity of the heavier fragment ($m_3 = 6\text{ kg}$):\n$$v_3 = \\frac{|\\vec{p}_3|}{m_3} = \\frac{72\\sqrt{2}}{6} = 12\\sqrt{2}\text{ m/s}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 136,
    exam: "JEE Main 2026 (02 Apr, Shift 1)",
    question: "The position of an object having mass $0.1\text{ kg}$ as a function of time $t$ is given as $\\vec{r} = (10t^2\hat{i} + 5t^3\hat{j})\text{ m}$. At $t = 1\text{ s}$, which of the following statements are correct?\nA. The linear momentum $\\vec{p} = (2\hat{i} + 1.5\hat{j})\text{ kg m/s}$.\nB. The force acting on the object $\\vec{F} = (2\hat{i} + 3\hat{j})\text{ N}$.\nC. The angular momentum of the object about its origin $\\vec{L} = 15\hat{k}\text{ J s}$.\nD. The torque acting on the object about its origin $\\vec{\\tau} = 20\hat{k}\text{ N m}$.\nChoose the correct answer from the options given below:",
    options: [
      "A, B and C only",
      "B, C and D only",
      "A, C and D only",
      "A, B and D only"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Given $\\vec{r} = 10t^2\hat{i} + 5t^3\hat{j}$ and $m = 0.1\text{ kg}$.\n\n1. Velocity $\\vec{v} = \\frac{\\text{d}\\vec{r}}{\\text{d}t} = 20t\hat{i} + 15t^2\hat{j}$.\nAt $t = 1\text{ s}$: $\\vec{r} = 10\hat{i} + 5\hat{j}$, $\\vec{v} = 20\hat{i} + 15\hat{j}\text{ m/s}$.\nLinear momentum $\\vec{p} = m \\vec{v} = 0.1(20\hat{i} + 15\hat{j}) = 2\hat{i} + 1.5\hat{j}\text{ kg m/s}$. (Statement A is CORRECT)\n\n2. Acceleration $\\vec{a} = \\frac{\\text{d}\\vec{v}}{\\text{d}t} = 20\hat{i} + 30t\hat{j}$.\nAt $t = 1\text{ s}$: $\\vec{a} = 20\hat{i} + 30\hat{j}\text{ m/s}^2$.\nForce $\\vec{F} = m \\vec{a} = 0.1(20\hat{i} + 30\hat{j}) = 2\hat{i} + 3\hat{j}\text{ N}$. (Statement B is CORRECT)\n\n3. Angular momentum $\\vec{L} = \\vec{r} \\times \\vec{p} = (10\hat{i} + 5\hat{j}) \\times (2\hat{i} + 1.5\hat{j}) = (10 \\times 1.5 - 5 \\times 2)\hat{k} = (15 - 10)\hat{k} = 5\hat{k}\text{ J s} \\neq 15\hat{k}$. (Statement C is INCORRECT)\n\n4. Torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = (10\hat{i} + 5\hat{j}) \\times (2\hat{i} + 3\hat{j}) = (10 \\times 3 - 5 \\times 2)\hat{k} = (30 - 10)\hat{k} = 20\hat{k}\text{ N m}$. (Statement D is CORRECT)\n\nTherefore, statements A, B and D only are correct.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 137,
    exam: "JEE Main 2026 (02 Apr, Shift 2)",
    question: "Two blocks of masses $2\text{ kg}$ and $1\text{ kg}$ respectively, are tied to the ends of a string which passes over a light frictionless pulley as shown in the figure below. The masses are held at rest at the same horizontal level and then released. The distance traversed by the centre of mass in $2\text{ s}$ is ____ m. (Take $g = 10\text{ m/s}^2$)",
    options: [
      "$3.33$",
      "$3.12$",
      "$2.22$",
      "$1.41$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q137_diagram.png"] || null,
    solution: "1. Acceleration of blocks in Atwood machine:\n$$a = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g = \\left(\\frac{2 - 1}{2 + 1}\\right) \\times 10 = \\frac{10}{3}\text{ m/s}^2$$\nTaking downward direction as positive:\n- Block 1 ($2\text{ kg}$) accelerates downward: $a_1 = +\\frac{10}{3}\text{ m/s}^2$\n- Block 2 ($1\text{ kg}$) accelerates upward: $a_2 = -\\frac{10}{3}\text{ m/s}^2$\n\n2. Acceleration of the centre of mass:\n$$a_{\\text{cm}} = \\frac{m_1 a_1 + m_2 a_2}{m_1 + m_2} = \\frac{2(10/3) + 1(-10/3)}{3} = \\frac{10/3}{3} = \\frac{10}{9}\text{ m/s}^2$$\n\n3. Distance traversed by the centre of mass in $t = 2\text{ s}$ starting from rest:\n$$S_{\\text{cm}} = \\frac{1}{2} a_{\\text{cm}} t^2 = \\frac{1}{2} \\times \\frac{10}{9} \\times (2)^2 = \\frac{20}{9} \\approx 2.22\text{ m}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 138,
    exam: "JEE Main 2026 (06 Apr, Shift 1)",
    question: "The position of center of mass of three masses $2\text{ kg}, 3\text{ kg}$ and $15\text{ kg}$ placed with respect to mid point ($p$) of normal bisector, as shown in the figure is:",
    options: [
      "$\\left(\\frac{\\sqrt{3}}{4}, 1.25\\right)$",
      "$\\left(\\frac{\\sqrt{3}}{8}, 10\\right)$",
      "$(0, 0)$",
      "$(1.25, 0)$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q138_diagram.png"] || null,
    solution: "Let midpoint $p$ of the altitude be the origin $(0, 0)$.\nWith apex angle $120^\\circ$ and equal sides $10\text{ m}$, the altitude length is $10 \\cos 60^\\circ = 5\text{ m}$.\nSince $p$ is the midpoint of the altitude:\n- Mass $15\text{ kg}$ is at $(0, +2.5)$\n- Base is at $y = -2.5$\n- Distance of base vertices from altitude is $10 \\sin 60^\\circ = 5\\sqrt{3}\text{ m}$:\n  - Mass $2\text{ kg}$ is at $(-5\\sqrt{3}, -2.5)$\n  - Mass $3\text{ kg}$ is at $(+5\\sqrt{3}, -2.5)$\n\nTotal mass: $M = 15 + 2 + 3 = 20\text{ kg}$.\n\nCentre of mass coordinates:\n$$x_{\\text{cm}} = \\frac{15(0) + 2(-5\\sqrt{3}) + 3(5\\sqrt{3})}{20} = \\frac{5\\sqrt{3}}{20} = \\frac{\\sqrt{3}}{4}$$\n$$y_{\\text{cm}} = \\frac{15(2.5) + 2(-2.5) + 3(-2.5)}{20} = \\frac{2.5(15 - 2 - 3)}{20} = \\frac{2.5 \\times 10}{20} = 1.25$$\n\nPosition of centre of mass: $\\left(\\frac{\\sqrt{3}}{4}, 1.25\\right)$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 139,
    exam: "JEE Main 2026 (06 Apr, Shift 2)",
    question: "Two identical bodies A and B of equal masses have initial velocities $\\vec{v}_A = 4\hat{i}\text{ m/s}$ and $\\vec{v}_B = 4\hat{j}\text{ m/s}$ respectively. The body A has acceleration $\\vec{a}_A = 6\hat{i} + 6\hat{j}\text{ m/s}^2$ while the acceleration of the other body B is zero. The centre of mass of the two bodies moves in path:",
    options: [
      "circular",
      "parabolic",
      "straight line",
      "elliptical"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For two identical bodies of mass $m$:\n\n1. Initial velocity of centre of mass:\n$$\\vec{v}_{\\text{cm}} = \\frac{m \\vec{v}_A + m \\vec{v}_B}{2m} = \\frac{4\hat{i} + 4\hat{j}}{2} = 2\hat{i} + 2\hat{j} = 2(\hat{i} + \hat{j})\text{ m/s}$$\n\n2. Acceleration of centre of mass:\n$$\\vec{a}_{\\text{cm}} = \\frac{m \\vec{a}_A + m \\vec{a}_B}{2m} = \\frac{6\hat{i} + 6\hat{j} + 0}{2} = 3\hat{i} + 3\hat{j} = 3(\hat{i} + \hat{j})\text{ m/s}^2$$\n\n3. Since the acceleration of the centre of mass $\\vec{a}_{\\text{cm}}$ is parallel to its initial velocity $\\vec{v}_{\\text{cm}}$ (both along $\\hat{i} + \hat{j}$), the centre of mass moves along a straight line path.\n\nHence, the correct option is (C)."
  }
];
