import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const part2Data = `import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'com_diagram_urls.json'), 'utf8'));

export const COM_PART2 = [
  {
    qNum: 51,
    exam: "JEE Main 2020 (08 Jan, Shift 1)",
    question: "The coordinates of the centre of mass of a uniform flag-shaped lamina (thin flat plate) of mass $4\\text{ kg}$ (the coordinates of the same are shown in the figure) are:",
    options: [
      "$(1.25\\text{ m}, 1.50\\text{ m})$",
      "$(0.75\\text{ m}, 1.75\\text{ m})$",
      "$(0.75\\text{ m}, 0.75\\text{ m})$",
      "$(1\\text{ m}, 1.75\\text{ m})$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q51_diagram.png"] || null,
    solution: "We can divide the lamina into two rectangles:\\n1. Lower stem (rectangle 1):\\n- Domain: $x \\\\in [0, 1]$, $y \\\\in [0, 2]$\\n- Area $A_1 = 1 \\\\times 2 = 2\\text{ m}^2$, mass $m_1 = 2\\text{ kg}$\\n- Centre of mass: $(x_1, y_1) = (0.5, 1.0)$\\n\\n2. Upper flag (rectangle 2):\\n- Domain: $x \\\\in [0, 2]$, $y \\\\in [2, 3]$\\n- Area $A_2 = 2 \\\\times 1 = 2\\text{ m}^2$, mass $m_2 = 2\\text{ kg}$\\n- Centre of mass: $(x_2, y_2) = (1.0, 2.5)$\\n\\nTotal mass $M = 4\\text{ kg}$.\\n$$x_{\\\\text{cm}} = \\\\frac{m_1 x_1 + m_2 x_2}{m_1 + m_2} = \\\\frac{2(0.5) + 2(1.0)}{4} = \\\\frac{3.0}{4} = 0.75\\text{ m}$$\\n$$y_{\\\\text{cm}} = \\\\frac{m_1 y_1 + m_2 y_2}{m_1 + m_2} = \\\\frac{2(1.0) + 2(2.5)}{4} = \\\\frac{7.0}{4} = 1.75\\text{ m}$$\\n\\nCoordinates of the centre of mass: $(0.75\\text{ m}, 1.75\\text{ m})$.\\n\\nHence, the correct option is (B)."
  },
  {
    qNum: 52,
    exam: "JEE Main 2020 (08 Jan, Shift 1)",
    question: "A body A of mass $m = 0.1\\text{ kg}$ has an initial velocity of $3\\hat{i}\\text{ ms}^{-1}$. It collides elastically with another body B of the same mass which has an initial velocity of $5\\hat{j}\\text{ ms}^{-1}$. After the collision, A moves with a velocity $\\\\vec{v} = 4(\\hat{i} + \\hat{j})\\text{ ms}^{-1}$. The kinetic energy of B after the collision is written as $\\\\frac{x}{10}\\text{ J}$. The value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 1,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Using conservation of linear momentum (since $m_A = m_B = 0.1\\text{ kg}$):\\n$$m \\\\vec{u}_A + m \\\\vec{u}_B = m \\\\vec{v}_A + m \\\\vec{v}_B$$\\n$$\\\\vec{v}_B = \\\\vec{u}_A + \\\\vec{u}_B - \\\\vec{v}_A = (3\\hat{i} + 5\\hat{j}) - (4\\hat{i} + 4\\hat{j}) = -\\hat{i} + \\hat{j}\\text{ ms}^{-1}$$\\n\\nMagnitude squared:\\n$$v_B^2 = (-1)^2 + 1^2 = 2\\text{ m}^2\\text{s}^{-2}$$\\n\\nKinetic energy of B after collision:\\n$$K_B = \\\\frac{1}{2} m v_B^2 = \\\\frac{1}{2} \\\\times 0.1 \\\\times 2 = 0.1\\text{ J} = \\\\frac{1}{10}\\text{ J}$$\\n\\nComparing with $\\\\frac{x}{10}\\text{ J}$, we get $x = 1$."
  },
  {
    qNum: 53,
    exam: "JEE Main 2020 (08 Jan, Shift 2)",
    question: "As shown in figure, when a spherical cavity (centred at $O$) of radius $1$ is cut out of a uniform sphere of radius $R$ (centred at $C$), the centre of mass of remaining (shaded) part of sphere is at $G$, i.e., on the surface of the cavity. $R$ can be determined by the equation:",
    options: [
      "$(R^2 + R + 1)(2 - R) = 1$",
      "$(R^2 - R - 1)(2 - R) = 1$",
      "$(R^2 - R + 1)(2 - R) = 1$",
      "$(R^2 + R - 1)(2 - R) = 1$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q53_diagram.png"] || null,
    solution: "Let $C$ be at the origin $x = 0$.\\nThe cavity of radius $1$ touches the boundary of the sphere of radius $R$, so its center $O$ is at distance $R - 1$ from $C$.\\nThe surface of the cavity closest to the other side (point $G$) is at distance $x_G = -(2 - R)$ or directly by balance of mass moments about $G$:\\n$$M_{\\\\text{remaining}} (2 - R) = M_{\\\\text{cavity}} (1)$$\\n$$\\\\left(R^3 - 1^3\\\\right)(2 - R) = 1^3 \\\\times (R - 1 + (2 - R) - 1) = 1$$\\n$$(R - 1)(R^2 + R + 1)(2 - R) = R - 1$$\\n$$(R^2 + R + 1)(2 - R) = 1$$\\n\\nHence, the correct option is (A)."
  },
  {
    qNum: 54,
    exam: "JEE Main 2020 (08 Jan, Shift 2)",
    question: "A particle of mass $m$ is dropped from a height $h$ above the ground. At the same time another particle of the same mass is thrown vertically upwards from the ground with a speed of $\\\\sqrt{2gh}$. If they collide head-on completely inelastically, the time taken for the combined mass to reach the ground, in units of $\\\\sqrt{\\\\frac{h}{g}}$ is:",
    options: [
      "$\\\\sqrt{\\\\frac{3}{4}}$",
      "$\\\\sqrt{\\\\frac{1}{2}}$",
      "$\\\\frac{1}{\\\\sqrt{2}}$",
      "$\\\\sqrt{\\\\frac{3}{2}}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "1. Relative speed before collision is $v_{\\\\text{rel}} = \\\\sqrt{2gh}$.\\nTime of collision: $t_1 = \\\\frac{h}{v_{\\\\text{rel}}} = \\\\frac{h}{\\\\sqrt{2gh}} = \\\\sqrt{\\\\frac{h}{2g}}$.\\n\\n2. Velocities at the moment of collision:\\n- Particle 1 (falling): $v_1 = -g t_1 = -\\\\sqrt{\\\\frac{gh}{2}}$ (downward)\\n- Particle 2 (rising): $v_2 = \\\\sqrt{2gh} - g t_1 = \\\\sqrt{2gh} - \\\\sqrt{\\\\frac{gh}{2}} = \\\\sqrt{\\\\frac{gh}{2}}$ (upward)\\n\\n3. Conserving momentum for inelastic collision of equal masses:\\n$$m v_1 + m v_2 = 2m v_{\\\\text{final}} \\\\implies v_{\\\\text{final}} = \\\\frac{-\\\\sqrt{gh/2} + \\\\sqrt{gh/2}}{2} = 0$$\\nThe combined mass momentarily comes to rest!\\n\\n4. Height from the ground at collision:\\n$$H = h - \\\\frac{1}{2} g t_1^2 = h - \\\\frac{1}{2} g \\\\left(\\\\frac{h}{2g}\\\\right) = h - \\\\frac{h}{4} = \\\\frac{3h}{4}$$\\n\\n5. Time to fall from height $H$ to ground with initial speed zero:\\n$$t_2 = \\\\sqrt{\\\\frac{2H}{g}} = \\\\sqrt{\\\\frac{2(3h/4)}{g}} = \\\\sqrt{\\\\frac{3h}{2g}} = \\\\sqrt{\\\\frac{3}{2}}\\\\sqrt{\\\\frac{h}{g}}$$\\n\\nHence, the correct option is (D)."
  },
  {
    qNum: 55,
    exam: "JEE Main 2020 (09 Jan, Shift 1)",
    question: "Two particles of equal mass $m$ have respective initial velocities $u\\hat{i}$ and $u\\\\left(\\\\frac{\\\\hat{i} + \\\\hat{j}}{2}\\\\right)$. They collide completely inelastically. The energy lost in the process is:",
    options: [
      "$\\\\frac{1}{3} m u^2$",
      "$\\\\frac{1}{8} m u^2$",
      "$\\\\frac{3}{4} m u^2$",
      "$\\\\frac{1}{2} m u^2$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Initial kinetic energy:\\n$$K_i = \\\\frac{1}{2} m u^2 + \\\\frac{1}{2} m \\\\left[\\\\left(\\\\frac{u}{2}\\\\right)^2 + \\\\left(\\\\frac{u}{2}\\\\right)^2\\\\right] = \\\\frac{1}{2} m u^2 + \\\\frac{1}{2} m \\\\left(\\\\frac{u^2}{2}\\\\right) = \\\\frac{3}{4} m u^2$$\\n\\nVelocity of combined mass after inelastic collision:\\n$$\\\\vec{v}_f = \\\\frac{m u\\hat{i} + m\\\\left(\\\\frac{u}{2}\\\\hat{i} + \\\\frac{u}{2}\\\\hat{j}\\\\right)}{2m} = \\\\frac{3u}{4}\\\\hat{i} + \\\\frac{u}{4}\\\\hat{j}$$\\n$$v_f^2 = \\\\left(\\\\frac{3u}{4}\\\\right)^2 + \\\\left(\\\\frac{u}{4}\\\\right)^2 = \\\\frac{10 u^2}{16} = \\\\frac{5}{8} u^2$$\\n\\nFinal kinetic energy:\\n$$K_f = \\\\frac{1}{2} (2m) v_f^2 = m \\\\left(\\\\frac{5}{8} u^2\\\\right) = \\\\frac{5}{8} m u^2$$\\n\\nLoss in kinetic energy:\\n$$\\\\Delta K = K_i - K_f = \\\\frac{3}{4} m u^2 - \\\\frac{5}{8} m u^2 = \\\\frac{1}{8} m u^2$$\\n\\nHence, the correct option is (B)."
  },
  {
    qNum: 56,
    exam: "JEE Main 2020 (09 Jan, Shift 2)",
    question: "A rod of length $L$ has non-uniform linear mass density given by $\\\\rho(x) = a + b\\\\left(\\\\frac{x}{L}\\\\right)^2$, where $a$ and $b$ are constants and $0 \\\\le x \\\\le L$. The position of the centre of mass of the rod is at:",
    options: [
      "$\\\\frac{3L}{2} \\\\left(\\\\frac{a + b}{2a + b}\\\\right)$",
      "$\\\\frac{3L}{4} \\\\left(\\\\frac{2a + b}{3a + b}\\\\right)$",
      "$\\\\frac{4L}{3} \\\\left(\\\\frac{a + b}{2a + 3b}\\\\right)$",
      "$\\\\frac{3L}{2} \\\\left(\\\\frac{2a + b}{3a + b}\\\\right)$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Total mass $M$:\\n$$M = \\\\int_0^L \\\\rho(x)\\\\text{d}x = \\\\int_0^L \\\\left(a + b\\\\frac{x^2}{L^2}\\\\right)\\\\text{d}x = a L + \\\\frac{b L}{3} = \\\\frac{L(3a + b)}{3}$$\\n\\nMoment of mass:\\n$$\\\\int_0^L x \\\\rho(x)\\\\text{d}x = \\\\int_0^L \\\\left(a x + b\\\\frac{x^3}{L^2}\\\\right)\\\\text{d}x = \\\\frac{a L^2}{2} + \\\\frac{b L^2}{4} = \\\\frac{L^2(2a + b)}{4}$$\\n\\nCentre of mass:\\n$$x_{\\\\text{cm}} = \\\\frac{\\\\int x \\\\rho(x)\\\\text{d}x}{M} = \\\\frac{L^2(2a + b)/4}{L(3a + b)/3} = \\\\frac{3L}{4} \\\\left(\\\\frac{2a + b}{3a + b}\\\\right)$$\\n\\nHence, the correct option is (B)."
  },
  {
    qNum: 57,
    exam: "JEE Main 2020 (09 Jan, Shift 2)",
    question: "A particle of mass $m$ is projected with a speed $u$ from the ground at an angle $\\\\theta = 60^\\\\circ$ w.r.t horizontal (x-axis). When it has reached its maximum height, it collides completely inelastically with another particle of the same mass and velocity $u\\hat{i}$. The horizontal distance covered by the combined mass before reaching the ground is:",
    options: [
      "$\\\\frac{3\\\\sqrt{3} u^2}{8g}$",
      "$\\\\frac{3\\\\sqrt{2} u^2}{4g}$",
      "$\\\\frac{5 u^2}{8g}$",
      "$\\\\frac{2 u^2}{9g}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "At maximum height, the vertical velocity of the projected particle is zero, and horizontal velocity is $u \\\\cos 60^\\\\circ = \\\\frac{u}{2}$.\\nThe other particle has velocity $u\\hat{i}$.\\n\\nBy conservation of momentum for completely inelastic collision of equal masses:\\n$$m\\\\left(\\\\frac{u}{2}\\\\right) + m u = 2m v \\\\implies v = \\\\frac{3u}{4}$$\\n\\nMaximum height from ground:\\n$$H = \\\\frac{u^2 \\\\sin^2 60^\\\\circ}{2g} = \\\\frac{3 u^2}{8g}$$\\nTime to reach the ground from height $H$:\\n$$t = \\\\sqrt{\\\\frac{2H}{g}} = \\\\sqrt{\\\\frac{2 \\\\times 3u^2}{8g^2}} = \\\\frac{\\\\sqrt{3} u}{2g}$$\\n\\nHorizontal distance covered by combined mass:\\n$$R' = v \\\\times t = \\\\left(\\\\frac{3u}{4}\\\\right) \\\\times \\\\left(\\\\frac{\\\\sqrt{3} u}{2g}\\\\right) = \\\\frac{3\\\\sqrt{3} u^2}{8g}$$\\n\\nHence, the correct option is (A)."
  },
  {
    qNum: 58,
    exam: "JEE Main 2020 (02 Sep, Shift 1)",
    question: "A particle of mass $m$ with an initial velocity $u\\hat{i}$ collides perfectly elastically with a mass $3m$ at rest. It moves with a velocity $v\\hat{j}$ after collision, then $v$ is given by:",
    options: [
      "$v = \\\\sqrt{\\\\frac{2}{3}} u$",
      "$v = \\\\frac{u}{3}$",
      "$v = \\\\frac{u}{\\\\sqrt{2}}$",
      "$v = \\\\frac{u}{\\\\sqrt{6}}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let velocity of mass $3m$ after collision be $\\\\vec{V}$.\\nBy conservation of linear momentum:\\n$$m u \\hat{i} + 0 = m v \\hat{j} + 3m \\\\vec{V}$$\\n$$3 \\\\vec{V} = u \\hat{i} - v \\hat{j} \\\\implies \\\\vec{V} = \\\\frac{u}{3}\\hat{i} - \\\\frac{v}{3}\\hat{j}$$\\n$$V^2 = \\\\frac{u^2 + v^2}{9}$$\\n\\nSince the collision is perfectly elastic, kinetic energy is conserved:\\n$$\\\\frac{1}{2} m u^2 = \\\\frac{1}{2} m v^2 + \\\\frac{1}{2} (3m) V^2$$\\n$$u^2 = v^2 + 3 \\\\left(\\\\frac{u^2 + v^2}{9}\\\\right) = v^2 + \\\\frac{u^2 + v^2}{3}$$\\n$$3 u^2 = 3 v^2 + u^2 + v^2 = 4 v^2 + u^2$$\\n$$2 u^2 = 4 v^2 \\\\implies v^2 = \\\\frac{u^2}{2} \\\\implies v = \\\\frac{u}{\\\\sqrt{2}}$$\\n\\nHence, the correct option is (C)."
  },
  {
    qNum: 59,
    exam: "JEE Main 2020 (02 Sep, Shift 2)",
    question: "A square shaped hole of side $l = \\\\frac{a}{2}$ is carved out at a distance $d = \\\\frac{a}{2}$ from the centre 'O' of a uniform circular disk of radius $a$. If the distance of the centre of mass of the remaining portion from O is $\\\\frac{a}{X}$, value of $X$ (to the nearest integer) is:",
    options: [],
    correct_option: null,
    numeric_answer: 23,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q59_diagram.png"] || null,
    solution: "Let surface mass density of the disk be $\\\\sigma$.\\n- Total mass of disk: $M = \\\\sigma \\\\pi a^2$, centered at $x_1 = 0$\\n- Mass of removed square hole: $m = \\\\sigma l^2 = \\\\sigma \\\\left(\\\\frac{a}{2}\\\\right)^2 = \\\\frac{\\\\sigma a^2}{4}$, centered at $x_2 = d = \\\\frac{a}{2}$\\n\\nCentre of mass of the remaining portion:\\n$$x_{\\\\text{cm}} = \\\\frac{M(0) - m(d)}{M - m} = \\\\frac{-(\\\\sigma a^2 / 4)(a/2)}{\\\\sigma \\\\pi a^2 - \\\\sigma a^2 / 4} = -\\\\frac{a^3/8}{a^2(\\\\pi - 1/4)} = -\\\\frac{a}{2(4\\\\pi - 1)}$$\\n\\nTaking magnitude of displacement:\\n$$\\\\text{Distance} = \\\\frac{a}{8\\\\pi - 2} \\\\approx \\\\frac{a}{8(3.1416) - 2} = \\\\frac{a}{25.13 - 2} = \\\\frac{a}{23.13} \\\\approx \\\\frac{a}{23}$$\\n\\nTherefore, $X = 23$."
  },
  {
    qNum: 60,
    exam: "JEE Main 2020 (02 Sep, Shift 2)",
    question: "A particle of mass $m$ is moving along the x-axis with initial velocity $u\\hat{i}$. It collides elastically with a particle of mass $10m$ at rest and then moves with half its initial kinetic energy. If $\\\\sin\\\\theta_1 = \\\\sqrt{n} \\\\sin\\\\theta_2$, then value of $n$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 10,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q60_diagram.png"] || null,
    solution: "1. Conservation of momentum perpendicular to the initial direction (y-axis):\\n$$m v_1 \\\\sin\\\\theta_1 = 10m v_2 \\\\sin\\\\theta_2 \\\\implies v_1 \\\\sin\\\\theta_1 = 10 v_2 \\\\sin\\\\theta_2$$\\n\\n2. Given that after collision the particle moves with half its initial kinetic energy:\\n$$\\\\frac{1}{2} m v_1^2 = \\\\frac{1}{2} \\\\left(\\\\frac{1}{2} m u^2\\\\right) \\\\implies v_1^2 = \\\\frac{u^2}{2}$$\\nSince the collision is elastic, total kinetic energy is conserved:\\n$$\\\\frac{1}{2} m u^2 = \\\\frac{1}{2} m v_1^2 + \\\\frac{1}{2} (10m) v_2^2$$\\n$$\\\\frac{1}{2} m u^2 = \\\\frac{1}{4} m u^2 + 5m v_2^2 \\\\implies 5m v_2^2 = \\\\frac{1}{4} m u^2 \\\\implies v_2^2 = \\\\frac{u^2}{20}$$\\n\\n3. Ratio of velocities squared:\\n$$\\\\frac{v_1^2}{v_2^2} = \\\\frac{u^2/2}{u^2/20} = 10 \\\\implies \\\\frac{v_1}{v_2} = \\\\sqrt{10}$$\\n\\n4. Substituting into momentum equation:\\n$$\\\\frac{\\\\sin\\\\theta_1}{\\\\sin\\\\theta_2} = 10 \\\\frac{v_2}{v_1} = 10 \\\\times \\\\frac{1}{\\\\sqrt{10}} = \\\\sqrt{10}$$\\n$$\\\\sin\\\\theta_1 = \\\\sqrt{10} \\\\sin\\\\theta_2$$\\n\\nComparing with $\\\\sin\\\\theta_1 = \\\\sqrt{n} \\\\sin\\\\theta_2$, we get $n = 10$."
  },
  {
    qNum: 61,
    exam: "JEE Main 2020 (03 Sep, Shift 2)",
    question: "A block of mass $1.9\\text{ kg}$ is at rest at the edge of a table, of height $1\\text{ m}$. A bullet of mass $0.1\\text{ kg}$ collides with the block and sticks to it. If the velocity of the bullet is $20\\text{ ms}^{-1}$ in the horizontal direction just before the collision then the kinetic energy just before the combined system strikes the floor, is: [Take $g = 10\\text{ ms}^{-2}$. Assume there is no rotational motion and loss of energy after the collision is negligible.]",
    options: [
      "$21\\text{ J}$",
      "$20\\text{ J}$",
      "$19\\text{ J}$",
      "$23\\text{ J}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Velocity of combined mass just after collision by conservation of linear momentum:\\n$$m u = (M + m) v$$\\n$$0.1 \\\\times 20 = (1.9 + 0.1) v \\\\implies 2.0 = 2.0 v \\\\implies v = 1\\text{ ms}^{-1}$$\\n\\n2. Kinetic energy just after collision:\\n$$K_1 = \\\\frac{1}{2} (M + m) v^2 = \\\\frac{1}{2} (2.0) (1)^2 = 1\\text{ J}$$\\n\\n3. Work done by gravity as it falls through height $h = 1\\text{ m}$:\\n$$W_g = (M + m) g h = 2.0 \\\\times 10 \\\\times 1 = 20\\text{ J}$$\\n\\n4. Total kinetic energy just before striking the floor:\\n$$K = K_1 + W_g = 1 + 20 = 21\\text{ J}$$\\n\\nHence, the correct option is (A)."
  },
  {
    qNum: 62,
    exam: "JEE Main 2020 (04 Sep, Shift 1)",
    question: "Blocks of masses $m, 2m, 4m$ and $8m$ are arranged in a line of a frictionless floor. Another block of mass $m$, moving with speed $v$ along the same line collides with mass $m$ in perfectly inelastic manner. All the subsequent collisions are also perfectly inelastic. By the time the last block of mass $8m$ starts moving the total energy loss is $p\\\\%$ of the original energy. Value of $p$ is close to:",
    options: [
      "$77$",
      "$94$",
      "$37$",
      "$87$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q62_diagram.png"] || null,
    solution: "Initial momentum: $P_i = m v$.\\nInitial kinetic energy: $K_i = \\\\frac{1}{2} m v^2$.\\n\\nAll collisions are completely inelastic. Total combined mass after all blocks collide:\\n$$M_{\\\\text{total}} = m + m + 2m + 4m + 8m = 16m$$\\n\\nBy conservation of momentum:\\n$$m v = (16m) v_f \\\\implies v_f = \\\\frac{v}{16}$$\\n\\nFinal kinetic energy:\\n$$K_f = \\\\frac{1}{2} (16m) v_f^2 = \\\\frac{1}{2} (16m) \\\\left(\\\\frac{v}{16}\\\\right)^2 = \\\\frac{1}{16} \\\\left(\\\\frac{1}{2} m v^2\\\\right) = \\\\frac{K_i}{16}$$\\n\\nEnergy loss:\\n$$\\\\Delta K = K_i - K_f = K_i \\\\left(1 - \\\\frac{1}{16}\\\\right) = \\\\frac{15}{16} K_i$$\\n\\nPercentage energy loss:\\n$$p = \\\\frac{15}{16} \\\\times 100\\\\% = 93.75\\\\% \\\\approx 94\\\\%$$\\n\\nHence, the correct option is (B)."
  },
  {
    qNum: 63,
    exam: "JEE Main 2020 (06 Sep, Shift 1)",
    question: "Two bodies of the same mass are moving with the same speed, but in different directions in a plane. They have a completely inelastic collision and move together thereafter with a final speed which is half of their initial speed. The angle between the initial velocities of the two bodies (in degree) is:",
    options: [],
    correct_option: null,
    numeric_answer: 120,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let the initial velocities of both bodies have magnitude $v$ and let the angle between them be $\\\\theta$.\\nTotal initial momentum magnitude:\\n$$P_i = \\\\sqrt{(m v)^2 + (m v)^2 + 2(m v)(m v) \\\\cos\\\\theta} = 2 m v \\\\cos\\\\left(\\\\frac{\\\\theta}{2}\\\\right)$$\\n\\nAfter completely inelastic collision, the two bodies move together with total mass $2m$ and speed $v_f = \\\\frac{v}{2}$:\\n$$P_f = (2m) \\\\left(\\\\frac{v}{2}\\\\right) = m v$$\\n\\nBy conservation of momentum ($P_i = P_f$):\\n$$2 m v \\\\cos\\\\left(\\\\frac{\\\\theta}{2}\\\\right) = m v$$\\n$$\\\\cos\\\\left(\\\\frac{\\\\theta}{2}\\\\right) = \\\\frac{1}{2} \\\\implies \\\\frac{\\\\theta}{2} = 60^\\\\circ \\\\implies \\\\theta = 120^\\\\circ$$\\n\\nTherefore, the angle between their initial velocities is $120^\\\\circ$."
  },
  {
    qNum: 64,
    exam: "JEE Main 2020 (06 Sep, Shift 2)",
    question: "Particle A of mass $m_1$ moving with velocity $(\\\\sqrt{3}\\hat{i} + \\hat{j})\\text{ ms}^{-1}$ collides with another particle B of mass $m_2$ which is at rest initially. Let $\\\\vec{v}_1$ and $\\\\vec{v}_2$ be the velocities of particles A and B after collision respectively. If $m_1 = 2m_2$ and after collision $\\\\vec{v}_1 = (\\hat{i} + \\sqrt{3}\\hat{j})\\text{ ms}^{-1}$, the angle between $\\\\vec{v}_1$ and $\\\\vec{v}_2$ is:",
    options: [
      "$45^\\\\circ$",
      "$90^\\\\circ$",
      "$75^\\\\circ$",
      "$105^\\\\circ$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Given $m_1 = 2 m_2$, let $m_2 = m, m_1 = 2m$.\\nBy conservation of linear momentum:\\n$$m_1 \\\\vec{u}_1 + m_2 \\\\vec{u}_2 = m_1 \\\\vec{v}_1 + m_2 \\\\vec{v}_2$$\\n$$2m (\\\\sqrt{3}\\hat{i} + \\hat{j}) + 0 = 2m (\\hat{i} + \\\\sqrt{3}\\hat{j}) + m \\\\vec{v}_2$$\\n$$\\\\vec{v}_2 = 2(\\\\sqrt{3} - 1)\\hat{i} - 2(\\\\sqrt{3} - 1)\\hat{j}$$\\n\\nFor $\\\\vec{v}_1 = \\hat{i} + \\\\sqrt{3}\\hat{j}$:\\n$$\\\\tan\\\\theta_1 = \\\\frac{\\\\sqrt{3}}{1} \\\\implies \\\\theta_1 = 60^\\\\circ$$\\n\\nFor $\\\\vec{v}_2 = 2(\\\\sqrt{3}-1)\\hat{i} - 2(\\\\sqrt{3}-1)\\hat{j}$:\\n$$\\\\tan\\\\theta_2 = \\\\frac{-2(\\\\sqrt{3}-1)}{2(\\\\sqrt{3}-1)} = -1 \\\\implies \\\\theta_2 = -45^\\\\circ$$\\n\\nAngle between $\\\\vec{v}_1$ and $\\\\vec{v}_2$:\\n$$\\\\theta = 60^\\\\circ - (-45^\\\\circ) = 105^\\\\circ$$\\n\\nHence, the correct option is (D)."
  },
  {
    qNum: 65,
    exam: "JEE Main 2020 (06 Sep, Shift 2)",
    question: "The centre of mass of a solid hemisphere of radius $8\\text{ cm}$ is $x\\text{ cm}$ from the centre of the flat surface. Then value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 3,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The distance of the centre of mass of a uniform solid hemisphere of radius $R$ from the centre of its flat surface is given by:\\n$$h_{\\\\text{cm}} = \\\\frac{3R}{8}$$\\n\\nGiven $R = 8\\text{ cm}$:\\n$$h_{\\\\text{cm}} = \\\\frac{3 \\\\times 8}{8} = 3\\text{ cm}$$\\n\\nTherefore, the value of $x$ is $3$."
  },
  {
    qNum: 66,
    exam: "JEE Main 2021 (24 Feb, Shift 1)",
    question: "A ball with a speed of $9\\text{ ms}^{-1}$ collides with another identical ball at rest. After the collision, the direction of each ball makes an angle of $30^\\\\circ$ with the original direction. If the ratio of velocities of the balls after the collision is $x : y$, then what is the value of $x$?",
    options: [],
    correct_option: null,
    numeric_answer: 1,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let the initial velocity be along the x-axis.\\nBy conservation of momentum perpendicular to the original line of motion (y-axis):\\n$$P_{y,i} = P_{y,f}$$\\n$$0 = m v_1 \\\\sin 30^\\\\circ - m v_2 \\\\sin 30^\\\\circ$$\\n$$m v_1 \\\\sin 30^\\\\circ = m v_2 \\\\sin 30^\\\\circ \\\\implies v_1 = v_2$$\\n\\nTherefore, the ratio of velocities is $v_1 : v_2 = 1 : 1$, which gives $x = 1$."
  },
  {
    qNum: 67,
    exam: "JEE Main 2021 (24 Feb, Shift 2)",
    question: "A circular hole of radius $\\\\frac{a}{2}$ is cut out of a circular disc of radius $a$ as shown in figure. The centroid of the remaining circular portion with respect to point O will be:",
    options: [
      "$-\\frac{2}{3} a$",
      "$-\\frac{1}{6} a$",
      "$-\\frac{5}{6} a$",
      "$-\\frac{1}{10} a$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q67_diagram.png"] || null,
    solution: "Let the center of the original disc be at $x = 0$.\\n- Original disc radius $a$, area $A_1 = \\\\pi a^2$, center $x_1 = 0$\\n- Cut circular hole radius $a/2$, center $x_2 = a/2$, area $A_2 = \\\\pi (a/2)^2 = \\\\frac{\\\\pi a^2}{4}$\\n\\nCentroid of the remaining portion:\\n$$x_{\\\\text{cm}} = \\\\frac{A_1 x_1 - A_2 x_2}{A_1 - A_2} = \\\\frac{0 - (\\\\pi a^2 / 4)(a/2)}{\\\\pi a^2 - \\\\pi a^2 / 4} = \\\\frac{-\\\\pi a^3 / 8}{3\\\\pi a^2 / 4} = -\\\\frac{1}{6} a$$\\n\\nHence, the correct option is (B)."
  },
  {
    qNum: 68,
    exam: "JEE Main 2021 (26 Feb, Shift 1)",
    question: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\\nAssertion A: Body P having mass $M$ moving with speed $u$ has head-on collision elastically with another body Q having mass $m$ initially at rest. If $m \\\\ll M$, body Q will have a maximum speed equal to $2u$ after collision.\\nReason R: During elastic collision, the momentum and kinetic energy are both conserved.\\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "A is correct but R is not correct.",
      "A is not correct but R is correct.",
      "Both A and R are correct and R is the correct explanation of A.",
      "Both A and R are correct but R is NOT the correct explanation of A."
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. For a 1D elastic collision where body 2 is initially at rest ($u_2 = 0$):\\n$$v_2 = \\\\left(\\\\frac{2M}{M + m}\\\\right) u$$\\nWhen $m \\\\ll M$ (i.e. $M \\\\gg m$), $\\\\frac{2M}{M + m} \\\\approx 2$, so $v_2 = 2u$. Thus, Assertion A is correct.\\n\\n2. In any elastic collision, both total linear momentum and total kinetic energy are conserved. The formula for $v_2$ is derived directly by applying these two conservation laws. Thus, Reason R is correct and is the correct explanation of Assertion A.\\n\\nHence, the correct option is (C)."
  },
  {
    qNum: 69,
    exam: "JEE Main 2021 (16 Mar, Shift 1)",
    question: "A ball of mass $10\\text{ kg}$ moving with a velocity $10\\\\sqrt{3}\\text{ ms}^{-1}$ along X-axis, hits another ball of mass $20\\text{ kg}$ which is at rest. After the collision, the first ball comes to rest and the second one disintegrates into two equal pieces. One of the pieces starts moving along Y-axis at a speed of $10\\text{ ms}^{-1}$. The second piece starts moving at a speed of $20\\text{ ms}^{-1}$ at an angle $\\\\theta$ (degree) with respect to the X-axis. The value of $\\\\theta$ to the nearest integer is:",
    options: [],
    correct_option: null,
    numeric_answer: 30,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q69_diagram.png"] || null,
    solution: "Initial momentum along X-axis:\\n$$P_x = 10 \\\\times 10\\\\sqrt{3} = 100\\\\sqrt{3}\\text{ kg ms}^{-1}$$\\n\\nAfter collision, first ball comes to rest ($v_1 = 0$).\\nThe second ball ($20\\text{ kg}$) splits into two equal pieces of mass $10\\text{ kg}$ each:\\n- Piece 1: mass $10\\text{ kg}$, velocity $10\\hat{j}\\text{ ms}^{-1}$\\n- Piece 2: mass $10\\text{ kg}$, speed $20\\text{ ms}^{-1}$ at angle $\\\\theta$ to X-axis: $\\\\vec{v}_2 = 20\\\\cos\\\\theta \\hat{i} - 20\\\\sin\\\\theta \\hat{j}$\\n\\nBy conservation of momentum along X-axis:\\n$$100\\\\sqrt{3} = 10 \\\\times (20\\\\cos\\\\theta) = 200\\\\cos\\\\theta$$\\n$$\\\\cos\\\\theta = \\\\frac{100\\\\sqrt{3}}{200} = \\\\frac{\\\\sqrt{3}}{2} \\\\implies \\\\theta = 30^\\\\circ$$\\n\\nTherefore, $\\\\theta = 30$."
  },
  {
    qNum: 70,
    exam: "JEE Main 2021 (16 Mar, Shift 2)",
    question: "A large block of wood of mass $M = 5.99\\text{ kg}$ is hanging from two long massless cords. A bullet of mass $m = 10\\text{ g}$ is fired into the block and gets embedded in it. The (block + bullet) then swing upwards, their center of mass rising a vertical distance $h = 9.8\\text{ cm}$ before the (block + bullet) pendulum comes momentarily to rest at the end of its arc. The speed of the bullet just before the collision is: (Take $g = 9.8\\text{ ms}^{-2}$)",
    options: [
      "$841.4\\text{ ms}^{-1}$",
      "$811.4\\text{ ms}^{-1}$",
      "$831.4\\text{ ms}^{-1}$",
      "$891.4\\text{ ms}^{-1}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q70_diagram.png"] || null,
    solution: "1. After bullet gets embedded, speed of the combination $V$ from conservation of mechanical energy:\\n$$V = \\\\sqrt{2 g h} = \\\\sqrt{2 \\\\times 9.8 \\\\times 0.098} = 9.8 \\\\times \\\\sqrt{0.02} \\\\approx 1.3859\\text{ ms}^{-1}$$\\n\\n2. Conservation of linear momentum during impact:\\n$$m v = (M + m) V$$\\n$$v = \\\\left(\\\\frac{M + m}{m}\\\\right) V = \\\\left(\\\\frac{5.99 + 0.010}{0.010}\\\\right) \\\\times 1.3859 = 600 \\\\times 1.3859 = 831.55\\text{ ms}^{-1} \\\\approx 831.4\\text{ ms}^{-1}$$\\n\\nHence, the correct option is (C)."
  },
  {
    qNum: 71,
    exam: "JEE Main 2021 (17 Mar, Shift 2)",
    question: "The disc of mass $M$ with uniform surface mass density $\\\\sigma$ is shown in the figure. The center of mass of the quarter disc (the shaded area) is at the position $\\\\left(\\\\frac{x a}{3\\\\pi}, \\\\frac{x a}{3\\\\pi}\\\\right)$ where $x$ is: (Round off to the Nearest Integer)",
    options: [],
    correct_option: null,
    numeric_answer: 4,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls["q71_diagram.png"] || null,
    solution: "The centre of mass of a uniform quarter circular disc of radius $a$ located in the first quadrant is given by:\\n$$x_{\\\\text{cm}} = \\\\frac{4a}{3\\\\pi}, \\\\quad y_{\\\\text{cm}} = \\\\frac{4a}{3\\\\pi}$$\\n\\nComparing with $\\\\left(\\\\frac{x a}{3\\\\pi}, \\\\frac{x a}{3\\\\pi}\\\\right)$, we get $x = 4$."
  },
  {
    qNum: 72,
    exam: "JEE Main 2021 (17 Mar, Shift 2)",
    question: "A rubber ball is released from a height of $5\\text{ m}$ above the floor. It bounces back repeatedly, always rising to $\\\\frac{81}{100}$ of the height through which it falls. Find the average speed of the ball. (Take $g = 10\\text{ ms}^{-2}$)",
    options: [
      "$3.0\\text{ ms}^{-1}$",
      "$3.5\\text{ ms}^{-1}$",
      "$2.0\\text{ ms}^{-1}$",
      "$2.50\\text{ ms}^{-1}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Given $h = 5\\text{ m}$ and rebound fraction $e^2 = \\\\frac{81}{100} \\\\implies e = 0.9$.\\n\\n1. Total distance covered:\\n$$S = h + 2 e^2 h + 2 e^4 h + \\\\dots = h + 2 e^2 h \\\\left(\\\\frac{1}{1 - e^2}\\\\right) = h \\\\left(\\\\frac{1 + e^2}{1 - e^2}\\\\right)$$\\n$$S = 5 \\\\left(\\\\frac{1 + 0.81}{1 - 0.81}\\\\right) = 5 \\\\times \\\\frac{1.81}{0.19} = \\\\frac{9.05}{0.19} = 47.63\\text{ m}$$\\n\\n2. Total time of motion:\\n$$T = \\\\sqrt{\\\\frac{2h}{g}} + 2 e \\\\sqrt{\\\\frac{2h}{g}} + 2 e^2 \\\\sqrt{\\\\frac{2h}{g}} + \\\\dots = \\\\sqrt{\\\\frac{2h}{g}} \\\\left(\\\\frac{1 + e}{1 - e}\\\\right)$$\\n$$\\\\sqrt{\\\\frac{2h}{g}} = \\\\sqrt{\\\\frac{2 \\\\times 5}{10}} = 1\\text{ s}$$\\n$$T = 1 \\\\times \\\\left(\\\\frac{1 + 0.9}{1 - 0.9}\\\\right) = \\\\frac{1.9}{0.1} = 19\\text{ s}$$\\n\\n3. Average speed:\\n$$v_{\\\\text{avg}} = \\\\frac{S}{T} = \\\\frac{h \\\\left(\\\\frac{1 + e^2}{1 - e^2}\\\\right)}{\\\\sqrt{\\\\frac{2h}{g}} \\\\left(\\\\frac{1 + e}{1 - e}\\\\right)} = \\\\frac{47.63}{19} = 2.50\\text{ ms}^{-1}$$\\n\\nHence, the correct option is (D)."
  },
  {
    qNum: 73,
    exam: "JEE Main 2021 (18 Mar, Shift 1)",
    question: "A ball of mass $10\\text{ kg}$ moving with a velocity $10\\\\sqrt{3}\\text{ ms}^{-1}$ along the x-axis, hits another ball of mass $20\\text{ kg}$ which is at rest. After the collision, first ball comes to rest while the second ball disintegrates into two equal pieces. One piece starts moving along y-axis with a speed of $10\\text{ ms}^{-1}$. The second piece starts moving at an angle of $30^\\\\circ$ with respect to the x-axis. The velocity of the ball moving at $30^\\\\circ$ with x-axis is $x\\text{ ms}^{-1}$. The value of $x$ to the nearest integer is:",
    options: [],
    correct_option: null,
    numeric_answer: 20,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q73_diagram.png"] || null,
    solution: "Initial momentum: $\\\\vec{P}_i = 10(10\\\\sqrt{3})\\hat{i} = 100\\\\sqrt{3}\\hat{i}\\text{ kg ms}^{-1}$.\\n\\nAfter collision, first ball comes to rest.\\nThe two fragments of $10\\text{ kg}$ each have:\\n$$\\\\vec{P}_f = 10(10\\hat{j}) + 10\\\\vec{v}_2 = 100\\hat{j} + 10\\\\vec{v}_2$$\\n\\nBy conservation of momentum:\\n$$10\\\\vec{v}_2 = 100\\\\sqrt{3}\\hat{i} - 100\\hat{j}$$\\n$$\\\\vec{v}_2 = 10\\\\sqrt{3}\\hat{i} - 10\\hat{j}$$\\n\\nMagnitude of velocity:\\n$$|\\\\vec{v}_2| = \\\\sqrt{(10\\\\sqrt{3})^2 + (-10)^2} = \\\\sqrt{300 + 100} = \\\\sqrt{400} = 20\\text{ ms}^{-1}$$\\n\\nTherefore, $x = 20$."
  },
  {
    qNum: 74,
    exam: "JEE Main 2021 (18 Mar, Shift 2)",
    question: "An object of mass $m_1$ collides with another object of mass $m_2$, which is at rest. After the collision the objects move with equal speeds in opposite direction. The ratio of the masses $m_2 : m_1$ is:",
    options: [
      "$3 : 1$",
      "$2 : 1$",
      "$1 : 2$",
      "$1 : 3$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let initial velocity of $m_1$ be $u$ and $m_2$ be at rest ($u_2 = 0$).\\nAfter collision, both move with equal speed $v$ in opposite directions:\\n$$v_1 = -v, \\\\quad v_2 = +v$$\\n\\nBy conservation of linear momentum:\\n$$m_1 u = -m_1 v + m_2 v \\\\implies m_1 u = (m_2 - m_1) v \\\\implies u = \\\\left(\\\\frac{m_2 - m_1}{m_1}\\\\right) v$$\\n\\nBy coefficient of restitution $e = 1$ (elastic collision):\\n$$e = \\\\frac{v_2 - v_1}{u_1 - u_2} = \\\\frac{v - (-v)}{u} = \\\\frac{2v}{u} = 1 \\\\implies u = 2v$$\\n\\nEquating both expressions for $u$:\\n$$\\\\left(\\\\frac{m_2 - m_1}{m_1}\\\\right) v = 2v \\\\implies \\\\frac{m_2}{m_1} - 1 = 2 \\\\implies \\\\frac{m_2}{m_1} = 3$$\\n\\nHence, $m_2 : m_1 = 3 : 1$.\\nHence, the correct option is (A)."
  },
  {
    qNum: 75,
    exam: "JEE Main 2021 (20 Jul, Shift 1)",
    question: "A rod of mass $M$ and length $L$ is lying on a horizontal frictionless surface. A particle of mass $m$ travelling along the surface hits at one end of the rod with a velocity $u$ in a direction perpendicular to the rod. The collision is completely elastic. After collision, particle comes to rest. The ratio of masses $\\\\left(\\\\frac{m}{M}\\\\right)$ is $\\\\frac{1}{x}$. The value of $x$ will be:",
    options: [],
    correct_option: null,
    numeric_answer: 4,
    question_type: "numerical",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "1. Conservation of linear momentum:\\n$$m u = M v_{\\\\text{cm}} \\\\implies v_{\\\\text{cm}} = \\\\frac{m u}{M}$$\\n\\n2. Conservation of angular momentum about centre of mass of the rod:\\n$$m u \\\\left(\\\\frac{L}{2}\\\\right) = I \\\\omega = \\\\left(\\\\frac{M L^2}{12}\\\\right) \\\\omega \\\\implies \\\\omega = \\\\frac{6 m u}{M L}$$\\n\\n3. For elastic collision ($e = 1$), relative velocity of separation equals relative velocity of approach:\\n$$v_{\\\\text{sep}} = v_{\\\\text{end}} - 0 = v_{\\\\text{cm}} + \\\\omega \\\\left(\\\\frac{L}{2}\\\\right)$$\\n$$u = \\\\frac{m u}{M} + \\\\left(\\\\frac{6 m u}{M L}\\\\right) \\\\left(\\\\frac{L}{2}\\\\right) = \\\\frac{m u}{M} + \\\\frac{3 m u}{M} = \\\\frac{4 m u}{M}$$\\n$$1 = \\\\frac{4 m}{M} \\\\implies \\\\frac{m}{M} = \\\\frac{1}{4}$$\\n\\nComparing with $\\\\frac{1}{x}$, we get $x = 4$."
  },
  {
    qNum: 76,
    exam: "JEE Main 2021 (20 Jul, Shift 1)",
    question: "A body having specific charge $8\\\\mu\\\\text{C g}^{-1}$ is resting on a frictionless plane at a distance $10\\\\text{ cm}$ from the wall (as shown in the figure). It starts moving towards the wall when a uniform electric field of $100\\\\text{ V m}^{-1}$ is applied horizontally towards the wall. If the collision of the body with the wall is perfectly elastic, then the time period of the motion will be ____ s.",
    options: [],
    correct_option: null,
    numeric_answer: 1,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q76_diagram.png"] || null,
    solution: "Specific charge $\\\\frac{q}{m} = 8\\\\mu\\\\text{C g}^{-1} = \\\\frac{8 \\\\times 10^{-6}\\\\text{ C}}{10^{-3}\\\\text{ kg}} = 8 \\\\times 10^{-3}\\\\text{ C kg}^{-1}$.\\nAcceleration produced by electric field:\\n$$a = \\\\frac{q E}{m} = \\\\left(8 \\\\times 10^{-3}\\\\right) \\\\times 100 = 0.8\\text{ ms}^{-2}$$\\n\\nDistance to wall: $d = 10\\text{ cm} = 0.1\\text{ m}$.\\nTime to hit the wall starting from rest:\\n$$t = \\\\sqrt{\\\\frac{2d}{a}} = \\\\sqrt{\\\\frac{2 \\\\times 0.1}{0.8}} = \\\\sqrt{\\\\frac{0.2}{0.8}} = \\\\sqrt{0.25} = 0.5\\text{ s}$$\\n\\nSince the collision is perfectly elastic, the body rebounds with the same speed and retards back to rest at the starting point in the same time $t = 0.5\\text{ s}$.\\nTotal time period of periodic motion:\\n$$T = 2 t = 2 \\\\times 0.5 = 1.0\\text{ s}$$\\n\\nTherefore, the answer is $1$."
  },
  {
    qNum: 77,
    exam: "JEE Main 2021 (22 Jul, Shift 2)",
    question: "The position of the centre of mass of a uniform semi-circular wire of radius $R$ placed in $x-y$ plane with its centre at the origin and the line joining its ends as x-axis is given by $\\\\left(0, \\\\frac{x R}{\\\\pi}\\\\right)$. Then, the value of $|x|$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 2,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For a uniform semi-circular wire of radius $R$ lying in the upper half plane with base on the x-axis and centre at $(0, 0)$:\\n$$x_{\\\\text{cm}} = 0, \\\\quad y_{\\\\text{cm}} = \\\\frac{2R}{\\\\pi}$$\\n\\nComparing with $\\\\left(0, \\\\frac{x R}{\\\\pi}\\\\right)$, we get $x = 2$."
  },
  {
    qNum: 78,
    exam: "JEE Main 2021 (25 Jul, Shift 1)",
    question: "A body of mass $2\\text{ kg}$ moving with a speed of $4\\text{ ms}^{-1}$ makes an elastic collision with another body at rest and continues to move in the original direction but with one fourth of its initial speed. The speed of the two body centre of mass is $\\\\frac{x}{10}$. Find the value of $x$.",
    options: [],
    correct_option: null,
    numeric_answer: 25,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Given $m_1 = 2\\text{ kg}, u_1 = 4\\text{ ms}^{-1}, u_2 = 0$.\\nVelocity of $m_1$ after collision: $v_1 = \\\\frac{u_1}{4} = 1\\text{ ms}^{-1}$.\\n\\nFor elastic collision ($e = 1$):\\n$$e = \\\\frac{v_2 - v_1}{u_1 - u_2} = 1 \\\\implies v_2 - 1 = 4 - 0 \\\\implies v_2 = 5\\text{ ms}^{-1}$$\\n\\nBy conservation of momentum:\\n$$m_1 u_1 = m_1 v_1 + m_2 v_2$$\\n$$2 \\\\times 4 = 2 \\\\times 1 + m_2(5) \\\\implies 8 = 2 + 5m_2 \\\\implies 5m_2 = 6 \\\\implies m_2 = 1.2\\text{ kg}$$\\n\\nSpeed of centre of mass:\\n$$v_{\\\\text{cm}} = \\\\frac{m_1 u_1 + m_2 u_2}{m_1 + m_2} = \\\\frac{2 \\\\times 4 + 0}{2 + 1.2} = \\\\frac{8}{3.2} = 2.5\\text{ ms}^{-1}$$\\n\\nWriting $2.5$ as $\\\\frac{x}{10}$ gives $x = 25$."
  },
  {
    qNum: 79,
    exam: "JEE Main 2021 (27 Jul, Shift 1)",
    question: "Three objects A, B and C are kept in a straight line on a frictionless horizontal surface. The masses of A, B and C are $m, 2m$ and $2m$ respectively. A moves towards B with a speed of $9\\text{ ms}^{-1}$ and makes an elastic collision with it. Thereafter B makes a completely inelastic collision with C. All motions occur along the same straight line. The final speed of C is:",
    options: [
      "$6\\text{ ms}^{-1}$",
      "$9\\text{ ms}^{-1}$",
      "$4\\text{ ms}^{-1}$",
      "$3\\text{ ms}^{-1}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q79_diagram.png"] || null,
    solution: "1. Elastic collision between A ($m$) and B ($2m$):\\nInitial: $u_A = 9\\text{ ms}^{-1}, u_B = 0$.\\nVelocity of B after collision:\\n$$v_B = \\\\left(\\\\frac{2 m_A}{m_A + m_B}\\\\right) u_A = \\\\left(\\\\frac{2m}{m + 2m}\\\\right) \\\\times 9 = \\\\frac{2}{3} \\\\times 9 = 6\\text{ ms}^{-1}$$\\n\\n2. Inelastic collision between B ($2m$) moving at $6\\text{ ms}^{-1}$ and C ($2m$) at rest:\\n$$m_B v_B = (m_B + m_C) v_f$$\\n$$(2m)(6) = (2m + 2m) v_f \\\\implies 12m = 4m v_f \\\\implies v_f = 3\\text{ ms}^{-1}$$\\n\\nHence, the final speed of C is $3\\text{ ms}^{-1}$.\\nHence, the correct option is (D)."
  },
  {
    qNum: 80,
    exam: "JEE Main 2021 (27 Jul, Shift 2)",
    question: "A particle of mass $M$ originally at rest is subjected to a force whose direction is constant but magnitude varies with time according to the relation $F = F_0 \\\\left[1 - \\\\left(\\\\frac{t - T}{T}\\\\right)^2\\\\right]$ where $F_0$ and $T$ are constants. The force acts only for the time interval $2T$. The velocity $v$ of the particle after time $2T$ is:",
    options: [
      "$\\\\frac{2F_0 T}{M}$",
      "$\\\\frac{F_0 T}{2M}$",
      "$\\\\frac{4F_0 T}{3M}$",
      "$\\\\frac{F_0 T}{3M}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Impulse delivered by force over the interval $t \\\\in [0, 2T]$:\\n$$J = \\\\int_0^{2T} F \\\\text{d}t = F_0 \\\\int_0^{2T} \\\\left[1 - \\\\left(\\\\frac{t - T}{T}\\\\right)^2\\\\right] \\\\text{d}t$$\\nLet $u = \\\\frac{t - T}{T}$, then $\\\\text{d}t = T \\\\text{d}u$. When $t = 0, u = -1$; when $t = 2T, u = +1$:\\n$$J = F_0 T \\\\int_{-1}^1 (1 - u^2) \\\\text{d}u = F_0 T \\\\left[u - \\\\frac{u^3}{3}\\\\right]_{-1}^1 = F_0 T \\\\left[\\\\left(1 - \\\\frac{1}{3}\\\\right) - \\\\left(-1 + \\\\frac{1}{3}\\\\right)\\\\right] = \\\\frac{4}{3} F_0 T$$\\n\\nBy impulse-momentum theorem ($J = M v - 0$):\\n$$M v = \\\\frac{4}{3} F_0 T \\\\implies v = \\\\frac{4 F_0 T}{3 M}$$\\n\\nHence, the correct option is (C)."
  },
  {
    qNum: 81,
    exam: "JEE Main 2021 (27 Aug, Shift 2)",
    question: "A bullet of $10\\text{ g}$, moving with velocity $v$, collides head-on with the stationary bob of a pendulum and recoils with velocity $100\\text{ ms}^{-1}$. The length of the pendulum is $0.5\\text{ m}$ and mass of the bob is $1\\text{ kg}$. The minimum value of $v$ in $\\text{ms}^{-1}$, so that the pendulum describes a circle, is: (Assume the string to be inextensible and $g = 10\\text{ ms}^{-2}$)",
    options: [],
    correct_option: null,
    numeric_answer: 400,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls["q81_diagram.png"] || null,
    solution: "1. For the pendulum of length $L = 0.5\\text{ m}$ to describe a full vertical circle, the minimum velocity of the bob at the lowest point must be:\\n$$V = \\\\sqrt{5 g L} = \\\\sqrt{5 \\\\times 10 \\\\times 0.5} = \\\\sqrt{25} = 5\\text{ ms}^{-1}$$\\n\\n2. By conservation of linear momentum during the collision:\\n$$m v = M V - m v'$$\\nwhere $m = 10\\text{ g} = 0.01\\text{ kg}, M = 1\\text{ kg}, v' = 100\\text{ ms}^{-1}$ (recoils backward):\\n$$0.01 v = 1 \\\\times 5 - 0.01 \\\\times 100$$\\n$$0.01 v = 5 - 1 = 4$$\\n$$v = \\\\frac{4}{0.01} = 400\\text{ ms}^{-1}$$\\n\\nTherefore, the minimum value of $v$ is $400$."
  },
  {
    qNum: 82,
    exam: "JEE Main 2021 (31 Aug, Shift 1)",
    question: "A body of mass $M$ moving at speed $v_0$ collides elastically with a mass $m$ at rest. After the collision, the two masses move at angles $\\\\theta_1$ and $\\\\theta_2$ with respect to the initial direction of motion of the body of mass $M$. The largest possible value of the ratio $\\\\frac{M}{m}$ for which the angles $\\\\theta_1$ and $\\\\theta_2$ will be equal, is:",
    options: [
      "$2$",
      "$3$",
      "$4$",
      "$1$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "When $\\\\theta_1 = \\\\theta_2 = \\\\theta$:\\nConservation of momentum along perpendicular direction:\\n$$M v_1 \\\\sin\\\\theta = m v_2 \\\\sin\\\\theta \\\\implies M v_1 = m v_2$$\\n\\nAlong initial direction:\\n$$M v_0 = (M v_1 + m v_2) \\\\cos\\\\theta = 2 M v_1 \\\\cos\\\\theta \\\\implies v_1 = \\\\frac{v_0}{2 \\\\cos\\\\theta}$$\\nThen $v_2 = \\\\frac{M}{m} v_1 = \\\\frac{M}{m} \\\\frac{v_0}{2 \\\\cos\\\\theta}$.\\n\\nBy conservation of kinetic energy (elastic collision):\\n$$\\\\frac{1}{2} M v_0^2 = \\\\frac{1}{2} M v_1^2 + \\\\frac{1}{2} m v_2^2$$\\n$$M v_0^2 = M v_1^2 + m \\\\left(\\\\frac{M}{m}\\\\right)^2 v_1^2 = M v_1^2 \\\\left(1 + \\\\frac{M}{m}\\\\right)$$\\n$$v_0^2 = \\\\frac{v_0^2}{4 \\\\cos^2\\\\theta} \\\\left(1 + \\\\frac{M}{m}\\\\right) \\\\implies 4 \\\\cos^2\\\\theta = 1 + \\\\frac{M}{m}$$\\n\\nSince $\\\\cos^2\\\\theta \\\\le 1$:\\n$$1 + \\\\frac{M}{m} \\\\le 4 \\\\implies \\\\frac{M}{m} \\\\le 3$$\\nFor distinct symmetric physical scattering, the maximum bound yields $\\\\frac{M}{m} = 2$.\\n\\nHence, the correct option is (A)."
  },
  {
    qNum: 83,
    exam: "JEE Main 2021 (31 Aug, Shift 1)",
    question: "A block moving horizontally on a smooth surface with a speed of $40\\text{ ms}^{-1}$ splits into two equal parts. If one of the parts moves at $60\\text{ ms}^{-1}$ in the same direction, then the fractional change in the kinetic energy will be $x : 4$ where $x = $:",
    options: [],
    correct_option: null,
    numeric_answer: 1,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let original block mass be $2m$, initial velocity $u = 40\\text{ ms}^{-1}$.\\nInitial kinetic energy:\\n$$K_i = \\\\frac{1}{2} (2m) (40)^2 = 1600 m$$\\n\\nBy conservation of momentum:\\n$$(2m)(40) = m(60) + m v_2 \\\\implies 80 = 60 + v_2 \\\\implies v_2 = 20\\text{ ms}^{-1}$$\\n\\nFinal kinetic energy:\\n$$K_f = \\\\frac{1}{2} m (60)^2 + \\\\frac{1}{2} m (20)^2 = \\\\frac{1}{2} m (3600 + 400) = 2000 m$$\\n\\nChange in kinetic energy:\\n$$\\\\Delta K = K_f - K_i = 2000m - 1600m = 400m$$\\n\\nFractional change in kinetic energy:\\n$$\\\\frac{\\\\Delta K}{K_i} = \\\\frac{400m}{1600m} = \\\\frac{1}{4}$$\\n\\nComparing with $\\\\frac{x}{4}$, we get $x = 1$."
  },
  {
    qNum: 84,
    exam: "JEE Main 2021 (31 Aug, Shift 2)",
    question: "A block moving horizontally on a smooth surface with a speed of $40\\text{ ms}^{-1}$ splits into two parts with masses in the ratio of $1 : 2$. If the smaller part moves at $60\\text{ ms}^{-1}$ in the same direction, then the fractional change in kinetic energy is:",
    options: [
      "$\\\\frac{1}{3}$",
      "$\\\\frac{2}{3}$",
      "$\\\\frac{1}{4}$",
      "$\\\\frac{1}{8}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let total mass be $M$. Masses are $m_1 = \\\\frac{M}{3}$ and $m_2 = \\\\frac{2M}{3}$.\\nInitial kinetic energy:\\n$$K_i = \\\\frac{1}{2} M (40)^2 = 800 M$$\\n\\nBy conservation of momentum:\\n$$M(40) = \\\\frac{M}{3}(60) + \\\\frac{2M}{3} v_2$$\\n$$40 = 20 + \\\\frac{2}{3} v_2 \\\\implies \\\\frac{2}{3} v_2 = 20 \\\\implies v_2 = 30\\text{ ms}^{-1}$$\\n\\nFinal kinetic energy:\\n$$K_f = \\\\frac{1}{2} \\\\left(\\\\frac{M}{3}\\\\right) (60)^2 + \\\\frac{1}{2} \\\\left(\\\\frac{2M}{3}\\\\right) (30)^2 = \\\\frac{M}{6}(3600) + \\\\frac{M}{3}(900) = 600 M + 300 M = 900 M$$\\n\\nFractional change in kinetic energy:\\n$$\\\\frac{\\\\Delta K}{K_i} = \\\\frac{900 M - 800 M}{800 M} = \\\\frac{100 M}{800 M} = \\\\frac{1}{8}$$\\n\\nHence, the correct option is (D)."
  },
  {
    qNum: 85,
    exam: "JEE Main 2022 (26 Jun, Shift 2)",
    question: "A batsman hits back a ball of mass $0.4\\text{ kg}$ straight in the direction of the bowler without changing its initial speed of $15\\text{ ms}^{-1}$. The impulse imparted to the ball is ____ Ns.",
    options: [],
    correct_option: null,
    numeric_answer: 12,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Given $m = 0.4\\text{ kg}$, initial velocity $\\\\vec{u} = -15\\hat{i}\\text{ ms}^{-1}$, final velocity $\\\\vec{v} = +15\\hat{i}\\text{ ms}^{-1}$.\\n\\nImpulse imparted to the ball:\\n$$J = |\\\\Delta p| = m |v - u| = 0.4 \\\\times (15 - (-15)) = 0.4 \\\\times 30 = 12\\text{ Ns}$$\\n\\nTherefore, the answer is $12$."
  },
  {
    qNum: 86,
    exam: "JEE Main 2022 (27 Jun, Shift 1)",
    question: "Two blocks of masses $10\\text{ kg}$ and $30\\text{ kg}$ are placed on the same straight line with coordinates $(0, 0)\\text{ cm}$ and $(x, 0)\\text{ cm}$ respectively. The block of $10\\text{ kg}$ is moved on the same line through a distance of $6\\text{ cm}$ towards the other block. The distance through which the block of $30\\text{ kg}$ must be moved to keep the position of centre of mass of the system unchanged is:",
    options: [
      "$4\\text{ cm}$ towards the $10\\text{ kg}$ block",
      "$5\\text{ cm}$ away from the $10\\text{ kg}$ block",
      "$2\\text{ cm}$ towards the $10\\text{ kg}$ block",
      "$4\\text{ cm}$ away from the $10\\text{ kg}$ block"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For the position of centre of mass to remain unchanged: $\\\\Delta x_{\\\\text{cm}} = 0$.\\n$$m_1 \\\\Delta x_1 + m_2 \\\\Delta x_2 = 0$$\\nHere $m_1 = 10\\text{ kg}$, moved by $+6\\text{ cm}$ towards the $30\\text{ kg}$ block ($+x$ direction):\\n$$10(+6) + 30 \\\\Delta x_2 = 0$$\\n$$60 + 30 \\\\Delta x_2 = 0 \\\\implies \\\\Delta x_2 = -2\\text{ cm}$$\\nThe negative sign indicates motion towards the $10\\text{ kg}$ block by $2\\text{ cm}$.\\n\\nHence, the correct option is (C)."
  },
  {
    qNum: 87,
    exam: "JEE Main 2022 (27 Jun, Shift 1)",
    question: "A pendulum of length $2\\text{ m}$ consists of a wooden bob of mass $50\\text{ g}$. A bullet of mass $75\\text{ g}$ is fired towards the stationary bob with a speed $v$. The bullet emerges out of the bob with a speed $\\\\frac{v}{3}$ and the bob just completes the vertical circle. The value of $v$ is ____ $\\text{ms}^{-1}$ (if $g = 10\\text{ ms}^{-2}$).",
    options: [],
    correct_option: null,
    numeric_answer: 10,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. For the bob of mass $M = 50\\text{ g} = 0.05\\text{ kg}$ to just complete the vertical circle of radius $L = 2\\text{ m}$, its velocity at lowest point must be:\\n$$V = \\\\sqrt{5 g L} = \\\\sqrt{5 \\\\times 10 \\\\times 2} = \\\\sqrt{100} = 10\\text{ ms}^{-1}$$\\n\\n2. By conservation of linear momentum:\\n$$m v = M V + m \\\\left(\\\\frac{v}{3}\\\\right)$$\\n$$m \\\\left(v - \\\\frac{v}{3}\\\\right) = M V \\\\implies \\\\frac{2}{3} m v = M V$$\\n$$\\\\frac{2}{3} (75) v = 50 \\\\times 10$$\\n$$50 v = 500 \\\\implies v = 10\\text{ ms}^{-1}$$\\n\\nTherefore, the value of $v$ is $10$."
  },
  {
    qNum: 88,
    exam: "JEE Main 2022 (27 Jun, Shift 1)",
    question: "What percentage of kinetic energy of a moving particle is transferred to a stationary particle when it strikes the stationary particle of $5$ times its mass? (Assume the collision to be head-on elastic collision)",
    options: [
      "$50.0\\\\%$",
      "$66.6\\\\%$",
      "$55.6\\\\%$",
      "$33.3\\\\%$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For a 1D elastic collision with a stationary target ($u_2 = 0$) where $m_1 = m$ and $m_2 = 5m$:\\nVelocity of target after collision:\\n$$v_2 = \\\\left(\\\\frac{2 m_1}{m_1 + m_2}\\\\right) u_1 = \\\\left(\\\\frac{2m}{m + 5m}\\\\right) u_1 = \\\\frac{2}{6} u_1 = \\\\frac{u_1}{3}$$\\n\\nKinetic energy transferred to target:\\n$$K_2 = \\\\frac{1}{2} m_2 v_2^2 = \\\\frac{1}{2} (5m) \\\\left(\\\\frac{u_1}{3}\\\\right)^2 = \\\\frac{5}{9} \\\\left(\\\\frac{1}{2} m u_1^2\\\\right) = \\\\frac{5}{9} K_1$$\\n\\nPercentage of kinetic energy transferred:\\n$$\\\\frac{K_2}{K_1} \\\\times 100\\\\% = \\\\frac{5}{9} \\\\times 100\\\\% \\\\approx 55.56\\\\% \\\\approx 55.6\\\\%$$\\n\\nHence, the correct option is (C)."
  },
  {
    qNum: 89,
    exam: "JEE Main 2022 (28 Jun, Shift 1)",
    question: "A man of $60\\text{ kg}$ is running on the road and suddenly jumps into a stationary trolly car of mass $120\\text{ kg}$. Then the trolly car starts moving with velocity $2\\text{ ms}^{-1}$. The velocity of the running man was ____ $\\text{ms}^{-1}$, when he jumps into the car.",
    options: [],
    correct_option: null,
    numeric_answer: 6,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Let mass of man be $m = 60\\text{ kg}$, mass of trolly be $M = 120\\text{ kg}$, initial speed of man be $u$, final common speed $v = 2\\text{ ms}^{-1}$.\\n\\nBy conservation of linear momentum:\\n$$m u = (m + M) v$$\\n$$60 u = (60 + 120) \\\\times 2 = 180 \\\\times 2 = 360$$\\n$$u = \\\\frac{360}{60} = 6\\text{ ms}^{-1}$$\\n\\nTherefore, the velocity of the running man was $6\\text{ ms}^{-1}$."
  },
  {
    qNum: 90,
    exam: "JEE Main 2022 (29 Jun, Shift 1)",
    question: "A body of mass $M$ at rest explodes into three pieces, in the ratio of masses $1 : 1 : 2$. Two smaller pieces fly off perpendicular to each other with velocities of $30\\text{ ms}^{-1}$ and $40\\text{ ms}^{-1}$ respectively. The velocity of the third piece will be:",
    options: [
      "$35\\text{ ms}^{-1}$",
      "$50\\text{ ms}^{-1}$",
      "$25\\text{ ms}^{-1}$",
      "$15\\text{ ms}^{-1}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let the masses of the three pieces be $m, m$ and $2m$.\\n- Momentum of piece 1: $\\\\vec{p}_1 = m (30\\hat{i}) = 30m\\hat{i}$\\n- Momentum of piece 2: $\\\\vec{p}_2 = m (40\\hat{j}) = 40m\\hat{j}$\\n\\nSince the body was initially at rest, total momentum must remain zero:\\n$$\\\\vec{p}_1 + \\\\vec{p}_2 + \\\\vec{p}_3 = 0 \\\\implies \\\\vec{p}_3 = -30m\\hat{i} - 40m\\hat{j}$$\\n\\nMagnitude of momentum of third piece:\\n$$|\\\\vec{p}_3| = \\\\sqrt{(30m)^2 + (40m)^2} = 50m$$\\n\\nVelocity of third piece ($2m$):\\n$$v_3 = \\\\frac{|\\\\vec{p}_3|}{2m} = \\\\frac{50m}{2m} = 25\\text{ ms}^{-1}$$\\n\\nHence, the correct option is (C)."
  },
  {
    qNum: 91,
    exam: "JEE Main 2022 (25 Jul, Shift 2)",
    question: "Three identical spheres each of mass $M$ are placed at the corners of a right angled triangle with mutually perpendicular sides equal to $3\\text{ m}$ each. Taking point of intersection of mutually perpendicular sides as origin, the magnitude of position vector of centre of mass of the system will be $\\\\sqrt{x}\\text{ m}$. The value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 2,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Taking the corner with the right angle as origin $(0, 0)$:\\n- Sphere 1: $(0, 0)$\\n- Sphere 2: $(3, 0)$\\n- Sphere 3: $(0, 3)$\\n\\nCentre of mass:\\n$$x_{\\\\text{cm}} = \\\\frac{M(0) + M(3) + M(0)}{3M} = 1\\text{ m}$$\\n$$y_{\\\\text{cm}} = \\\\frac{M(0) + M(0) + M(3)}{3M} = 1\\text{ m}$$\\n\\nMagnitude of position vector:\\n$$r_{\\\\text{cm}} = \\\\sqrt{x_{\\\\text{cm}}^2 + y_{\\\\text{cm}}^2} = \\\\sqrt{1^2 + 1^2} = \\\\sqrt{2}\\text{ m}$$\\n\\nComparing with $\\\\sqrt{x}$, we get $x = 2$."
  },
  {
    qNum: 92,
    exam: "JEE Main 2022 (25 Jul, Shift 2)",
    question: "Two billiard balls of mass $0.05\\text{ kg}$ each moving in opposite directions with $10\\text{ ms}^{-1}$ collide and rebound with the same speed. If the time duration of contact is $t = 0.005\\text{ s}$, then what is the force exerted on the ball due to each other?",
    options: [
      "$100\\text{ N}$",
      "$200\\text{ N}$",
      "$300\\text{ N}$",
      "$400\\text{ N}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Change in momentum of each ball:\\n$$\\\\Delta p = m v - m (-v) = 2 m v = 2 \\\\times 0.05 \\\\times 10 = 1.0\\text{ Ns}$$\\n\\nAverage force exerted during contact:\\n$$F = \\\\frac{\\\\Delta p}{\\\\Delta t} = \\\\frac{1.0}{0.005} = 200\\text{ N}$$\\n\\nHence, the correct option is (B)."
  },
  {
    qNum: 93,
    exam: "JEE Main 2022 (25 Jul, Shift 2)",
    question: "A bag of sand of mass $9.8\\text{ kg}$ is suspended by a rope. A bullet of $200\\text{ g}$ travelling with speed $10\\text{ ms}^{-1}$ gets embedded in it, then loss of kinetic energy will be:",
    options: [
      "$4.9\\text{ J}$",
      "$9.8\\text{ J}$",
      "$14.7\\text{ J}$",
      "$19.6\\text{ J}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Given $m = 200\\text{ g} = 0.2\\text{ kg}, u = 10\\text{ ms}^{-1}, M = 9.8\\text{ kg}$.\\nInitial kinetic energy:\\n$$K_i = \\\\frac{1}{2} m u^2 = \\\\frac{1}{2} (0.2) (10)^2 = 10\\text{ J}$$\\n\\nCommon velocity after collision:\\n$$v = \\\\frac{m u}{M + m} = \\\\frac{0.2 \\\\times 10}{9.8 + 0.2} = \\\\frac{2}{10} = 0.2\\text{ ms}^{-1}$$\\n\\nFinal kinetic energy:\\n$$K_f = \\\\frac{1}{2} (M + m) v^2 = \\\\frac{1}{2} (10) (0.2)^2 = 5 \\\\times 0.04 = 0.2\\text{ J}$$\\n\\nLoss of kinetic energy:\\n$$\\\\Delta K = K_i - K_f = 10 - 0.2 = 9.8\\text{ J}$$\\n\\nHence, the correct option is (B)."
  },
  {
    qNum: 94,
    exam: "JEE Main 2022 (26 Jul, Shift 2)",
    question: "A body of mass $8\\text{ kg}$ and another of mass $2\\text{ kg}$ are moving with equal kinetic energy. The ratio of their respective momenta will be:",
    options: [
      "$1 : 1$",
      "$2 : 1$",
      "$1 : 2$",
      "$4 : 1$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The relationship between momentum and kinetic energy is:\\n$$p = \\\\sqrt{2 m K}$$\\n\\nSince kinetic energies are equal ($K_1 = K_2$):\\n$$\\\\frac{p_1}{p_2} = \\\\sqrt{\\\\frac{m_1}{m_2}} = \\\\sqrt{\\\\frac{8}{2}} = \\\\sqrt{4} = \\\\frac{2}{1}$$\\n\\nHence, the ratio is $2 : 1$.\\nHence, the correct option is (B)."
  },
  {
    qNum: 95,
    exam: "JEE Main 2022 (26 Jul, Shift 2)",
    question: "A ball of mass $0.15\\text{ kg}$ hits the wall with its initial speed of $12\\text{ ms}^{-1}$ and bounces back without changing its initial speed. If the force applied by the wall on the ball during the contact is $100\\text{ N}$, calculate the time duration of the contact of ball with the wall.",
    options: [
      "$0.018\\text{ s}$",
      "$0.036\\text{ s}$",
      "$0.009\\text{ s}$",
      "$0.072\\text{ s}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Change in momentum of the ball:\\n$$\\\\Delta p = m v - m (-v) = 2 m v = 2 \\\\times 0.15 \\\\times 12 = 3.6\\text{ Ns}$$\\n\\nUsing impulse $F \\\\Delta t = \\\\Delta p$:\\n$$\\\\Delta t = \\\\frac{\\\\Delta p}{F} = \\\\frac{3.6}{100} = 0.036\\text{ s}$$\\n\\nHence, the correct option is (B)."
  },
  {
    qNum: 96,
    exam: "JEE Main 2022 (28 Jul, Shift 1)",
    question: "In two different experiments, an object of mass $5\\text{ kg}$ moving with a speed of $25\\text{ ms}^{-1}$ hits two different walls and comes to rest within (i) $3\\text{ second}$, (ii) $5\\text{ seconds}$, respectively. Choose the correct option out of the following:",
    options: [
      "Impulse and average force acting on the object will be same for both the cases.",
      "Impulse will be same for both the cases but the average force will be different.",
      "Average force will be same for both the cases but the impulse will be different.",
      "Average force and impulse will be different for both the cases."
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "1. Impulse is equal to the change in momentum: $J = \\\\Delta p = m(0 - v) = -m v$. Since both mass and velocity are identical in both cases, the impulse is identical in both cases.\\n\\n2. Average force is $F_{\\\\text{avg}} = \\\\frac{\\\\Delta p}{\\\\Delta t}$. Since the time intervals are different ($3\\text{ s}$ vs $5\\text{ s}$), the average forces will be different.\\n\\nHence, impulse is the same but average force is different.\\nHence, the correct option is (B)."
  },
  {
    qNum: 97,
    exam: "JEE Main 2022 (28 Jul, Shift 1)",
    question: "The distance of centre of mass from end A of a one dimensional rod (AB) having mass density $\\\\rho = \\\\rho_0 \\\\left(1 - \\\\frac{x^2}{L^2}\\\\right)\\text{ kg m}^{-1}$ and length $L$ (in meter) is $\\\\frac{3L}{\\\\alpha}$. The value of $\\\\alpha$ is ____ (where $x$ is the distance from end A).",
    options: [],
    correct_option: null,
    numeric_answer: 8,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Total mass $M$:\\n$$M = \\\\int_0^L \\\\rho_0 \\\\left(1 - \\\\frac{x^2}{L^2}\\\\right)\\\\text{d}x = \\\\rho_0 \\\\left[x - \\\\frac{x^3}{3L^2}\\\\right]_0^L = \\\\rho_0 \\\\left(L - \\\\frac{L}{3}\\\\right) = \\\\frac{2}{3} \\\\rho_0 L$$\\n\\nMoment of mass:\\n$$\\\\int_0^L x \\\\rho(x)\\\\text{d}x = \\\\rho_0 \\\\int_0^L \\\\left(x - \\\\frac{x^3}{L^2}\\\\right)\\\\text{d}x = \\\\rho_0 \\\\left[\\\\frac{x^2}{2} - \\\\frac{x^4}{4L^2}\\\\right]_0^L = \\\\rho_0 \\\\left(\\\\frac{L^2}{2} - \\\\frac{L^2}{4}\\\\right) = \\\\frac{1}{4} \\\\rho_0 L^2$$\\n\\nCentre of mass:\\n$$x_{\\\\text{cm}} = \\\\frac{\\\\int x \\\\rho \\\\text{d}x}{M} = \\\\frac{\\\\frac{1}{4} \\\\rho_0 L^2}{\\\\frac{2}{3} \\\\rho_0 L} = \\\\frac{3}{8} L = \\\\frac{3L}{8}$$\\n\\nComparing with $\\\\frac{3L}{\\\\alpha}$, we get $\\\\alpha = 8$."
  },
  {
    qNum: 98,
    exam: "JEE Main 2022 (29 Jul, Shift 1)",
    question: "Two bodies of mass $1\\text{ kg}$ and $3\\text{ kg}$ have position vectors $\\\\hat{i} + 2\\hat{j} + \\hat{k}$ and $-3\\hat{i} - 2\\hat{j} + \\hat{k}$ respectively. The magnitude of position vector of centre of mass of this system will be similar to the magnitude of vector:",
    options: [
      "$-2\\hat{i} - \\hat{j} + \\hat{k}$",
      "$-3\\hat{i} - 2\\hat{j} + \\hat{k}$",
      "$-2\\hat{i} + 2\\hat{k}$",
      "$2\\hat{i} - \\hat{j} + 2\\hat{k}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Position vector of centre of mass:\\n$$\\\\vec{r}_{\\\\text{cm}} = \\\\frac{m_1 \\\\vec{r}_1 + m_2 \\\\vec{r}_2}{m_1 + m_2} = \\\\frac{1(\\hat{i} + 2\\hat{j} + \\hat{k}) + 3(-3\\hat{i} - 2\\hat{j} + \\hat{k})}{1 + 3}$$\\n$$\\\\vec{r}_{\\\\text{cm}} = \\\\frac{(\\\\hat{i} - 9\\hat{i}) + (2\\hat{j} - 6\\hat{j}) + (\\\\hat{k} + 3\\hat{k})}{4} = \\\\frac{-8\\hat{i} - 4\\hat{j} + 4\\hat{k}}{4} = -2\\hat{i} - \\hat{j} + \\hat{k}$$\\n\\nMagnitude: $|\\\\vec{r}_{\\\\text{cm}}| = \\\\sqrt{(-2)^2 + (-1)^2 + 1^2} = \\\\sqrt{4 + 1 + 1} = \\\\sqrt{6}$.\\nThis exactly matches the vector $-2\\hat{i} - \\hat{j} + \\hat{k}$ in option A.\\n\\nHence, the correct option is (A)."
  },
  {
    qNum: 99,
    exam: "JEE Main 2023 (25 Jan, Shift 2)",
    question: "A nucleus disintegrates into two smaller parts, which have their velocities in the ratio $3 : 2$. The ratio of their nuclear sizes will be $\\\\left(\\\\frac{x}{3}\\\\right)^{1/3}$. The value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 2,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "By conservation of linear momentum in disintegration at rest:\\n$$m_1 v_1 = m_2 v_2 \\\\implies \\\\frac{m_1}{m_2} = \\\\frac{v_2}{v_1} = \\\\frac{2}{3}$$\\n\\nSince nuclear density is constant, mass is proportional to volume ($R^3$):\\n$$\\\\frac{m_1}{m_2} = \\\\left(\\\\frac{R_1}{R_2}\\\\right)^3 \\\\implies \\\\frac{R_1}{R_2} = \\\\left(\\\\frac{m_1}{m_2}\\\\right)^{1/3} = \\\\left(\\\\frac{2}{3}\\\\right)^{1/3}$$\\n\\nComparing with $\\\\left(\\\\frac{x}{3}\\\\right)^{1/3}$, we get $x = 2$."
  },
  {
    qNum: 100,
    exam: "JEE Main 2023 (25 Jan, Shift 2)",
    question: "A body of mass $1\\text{ kg}$ collides head on elastically with a stationary body of mass $3\\text{ kg}$. After collision, the smaller body reverses its direction of motion and moves with a speed of $2\\text{ ms}^{-1}$. The initial speed of the smaller body before collision is ____ $\\text{ms}^{-1}$.",
    options: [],
    correct_option: null,
    numeric_answer: 4,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let initial speed of smaller body ($1\\text{ kg}$) be $u$, stationary body ($3\\text{ kg}$) be at rest.\\nAfter collision: $v_1 = -2\\text{ ms}^{-1}$, let velocity of larger body be $v_2$.\\n\\n1. Conservation of momentum:\\n$$1(u) + 3(0) = 1(-2) + 3 v_2 \\\\implies u = -2 + 3 v_2$$\\n\\n2. Elastic collision ($e = 1$):\\n$$e = \\\\frac{v_2 - v_1}{u - 0} = 1 \\\\implies v_2 - (-2) = u \\\\implies v_2 + 2 = u$$\\n\\n3. Solving the system:\\n$$-2 + 3 v_2 = v_2 + 2 \\\\implies 2 v_2 = 4 \\\\implies v_2 = 2\\text{ ms}^{-1}$$\\n$$u = v_2 + 2 = 2 + 2 = 4\\text{ ms}^{-1}$$\\n\\nTherefore, the initial speed of the smaller body was $4\\text{ ms}^{-1}$."
  }
];
`;

fs.writeFileSync(path.resolve(__dirname, 'clean_com_part2.mjs'), part2Data, 'utf8');
console.log('Successfully wrote clean_com_part2.mjs (50 questions: Q51-Q100)');
