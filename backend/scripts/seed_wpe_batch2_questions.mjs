import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load diagram mappings for Batch 2
let diagrams = {};
try {
  const mapPath = path.resolve(__dirname, 'work_energy_power_batch2_diagrams.json');
  if (fs.existsSync(mapPath)) {
    diagrams = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  }
} catch (err) {
  console.warn('Failed to load batch 2 diagrams map:', err.message);
}

const getImageUrl = (qNum) => {
  if (diagrams[qNum]) {
    return diagrams[qNum].cloudinary_url || diagrams[qNum].local_url;
  }
  return '';
};

export const BATCH2_QUESTIONS = [
  // Page 1 (Book pages 89 and 90)
  {
    q_num: 87,
    question_text: "Calculate the work done by gravity when a body of mass $m$ is displaced slowly by a force $F$ for $\\theta = 60^\\circ$ from position (A) to position (B).",
    options: ["$\\frac{mgl}{2}$", "$-\\frac{mgl}{2}$", "$-\\frac{\\sqrt{3}}{2}mgl$", "$\\frac{\\sqrt{3}}{2}mgl$"],
    correct_index: 0,
    image_url: getImageUrl(87),
    topic: "Work Done by Gravity",
    difficulty: "easy",
    solution: "At position (A), the body is at angle $\\theta = 60^\\circ$ with the vertical. At position (B), it is at the bottom-most vertical position.\nThe vertical descent from (A) to (B) is:\n$$h = l(1 - \\cos 60^\\circ) = l\\left(1 - \\frac{1}{2}\\right) = \\frac{l}{2}$$\nSince the displacement has a downward component in the direction of gravitational force, work done by gravity is positive:\n$$W_g = +mgh = +mg\\left(\\frac{l}{2}\\right) = \\frac{mgl}{2}$$"
  },
  {
    q_num: 88,
    question_text: "The velocity of a particle of mass $m$ moving along $x$-axis depends on $x$-coordinate as $v = k\\sqrt{x}$ where $k$ is a positive constant. Total work done by all the forces on the particle as it goes from $x = 0$ to $x = a$ is",
    options: ["$\\frac{3}{2}m a k^2$", "$m a k^2$", "$\\frac{m a k^2}{3}$", "$\\frac{m a k^2}{2}$"],
    correct_index: 3,
    topic: "Work-Energy Theorem",
    difficulty: "easy",
    solution: "By the work-energy theorem, total work done by all forces equals the change in kinetic energy:\n$$W = \\Delta K = \\frac{1}{2} m v_f^2 - \\frac{1}{2} m v_i^2$$\nAt $x = 0$, $v_i = 0$.\nAt $x = a$, $v_f = k\\sqrt{a} \\implies v_f^2 = k^2 a$.\n$$W = \\frac{1}{2} m (k^2 a) - 0 = \\frac{m a k^2}{2}$$"
  },
  {
    q_num: 89,
    question_text: "Two identical block A and B each of mass $m$ are placed on a smooth horizontal plane. At $t = 0$ block B is given a velocity of $5\\text{ m/s}$. Calculate the compression in the spring when velocity of A is $3\\text{ m/s}$, given spring constant of ideal spring is $k$.",
    options: ["$\\sqrt{\\frac{8m}{k}}$", "$\\sqrt{\\frac{10m}{k}}$", "$\\sqrt{\\frac{4m}{k}}$", "$\\sqrt{\\frac{12m}{k}}$"],
    correct_index: 3,
    image_url: getImageUrl(89),
    topic: "Spring-Mass Systems & Momentum Conservation",
    difficulty: "medium",
    solution: "By conservation of linear momentum on smooth horizontal ground:\n$$m v_{B0} = m v_B + m v_A$$\n$$m(5) = m v_B + m(3) \\implies v_B = 2\\text{ m/s}$$\nBy conservation of mechanical energy:\n$$\\frac{1}{2} m (5)^2 = \\frac{1}{2} m (v_B)^2 + \\frac{1}{2} m (v_A)^2 + \\frac{1}{2} k x^2$$\n$$\\frac{1}{2} m (25) = \\frac{1}{2} m (4) + \\frac{1}{2} m (9) + \\frac{1}{2} k x^2$$\n$$25m = 13m + k x^2 \\implies k x^2 = 12m \\implies x = \\sqrt{\\frac{12m}{k}}$$"
  },
  {
    q_num: 90,
    question_text: "What should be the minimum velocity that should be imparted to a body of mass $m$ fixed at the lower end of a massless rod of length $l$ so that it can complete a circular loop?",
    options: ["$2\\sqrt{gl}$", "$\\sqrt{5gl}$", "$\\sqrt{gl}$", "$\\sqrt{3gl}$"],
    correct_index: 0,
    topic: "Vertical Circular Motion on Light Rod",
    difficulty: "easy",
    solution: "For a light rod, the particle is rigidly supported, so its speed at the topmost position just needs to be non-negative ($v_{\\text{top}} \\ge 0$).\nBy conservation of energy:\n$$v_{\\text{bot}}^2 - 2g(2l) = v_{\\text{top}}^2 \\ge 0 \\implies v_{\\text{bot}} \\ge \\sqrt{4gl} = 2\\sqrt{gl}$$"
  },
  {
    q_num: 91,
    question_text: "A body of mass $1\\text{ kg}$ is moving in the upward direction with an acceleration of $2\\text{ m/s}^2$. Calculate the work done by tension in first second. (At $t = 0, u = 0$)",
    options: ["$10\\text{ J}$", "$12\\text{ J}$", "$24\\text{ J}$", "$20\\text{ J}$"],
    correct_index: 1,
    image_url: getImageUrl(91),
    topic: "Work Done by Tension",
    difficulty: "easy",
    solution: "Using equation of motion for upward accelerated mass ($g = 10\\text{ m/s}^2$):\n$$T - mg = m a \\implies T = m(g + a) = 1(10 + 2) = 12\\text{ N}$$\nDisplacement in first second starting from rest:\n$$s = \\frac{1}{2} a t^2 = \\frac{1}{2}(2)(1)^2 = 1\\text{ m}$$\nWork done by tension:\n$$W_T = T \\cdot s = 12 \\times 1 = 12\\text{ J}$$"
  },
  {
    q_num: 92,
    question_text: "A block of mass $m$ is suspended from a string of length $l$. It is struck by a bullet of half the mass of block moving with speed $u$. The bullet gets embedded as soon as it strikes the block. Then find the minimum value of $u$ for which the combined mass completes vertical circle.",
    options: ["$\\sqrt{45gl}$", "$\\sqrt{75gl}$", "$\\sqrt{5gl}$", "$\\sqrt{30gl}$"],
    correct_index: 0,
    image_url: getImageUrl(92),
    topic: "Collisions & Vertical Circular Motion",
    difficulty: "medium",
    solution: "Mass of bullet is $m/2$, mass of block is $m$, combined mass is $M = \\frac{3}{2}m$.\nFor the combined mass to complete a vertical circle on string of length $l$, its velocity immediately after impact must be:\n$$v = \\sqrt{5gl}$$\nBy conservation of linear momentum during the collision:\n$$\\left(\\frac{m}{2}\\right) u = \\left(\\frac{3m}{2}\\right) v \\implies u = 3v = 3\\sqrt{5gl} = \\sqrt{9 \\times 5gl} = \\sqrt{45gl}$$"
  },
  {
    q_num: 93,
    question_text: "In the figure shown, a small object is released from the position A on a smooth track. When the object reaches at B then normal reaction on it by the track is",
    options: ["$mg$", "$\\frac{2mg}{3}$", "$2mg$", "$\\frac{m^2 g}{h}$"],
    correct_index: 0,
    image_url: getImageUrl(93),
    topic: "Vertical Circular Track Dynamics",
    difficulty: "medium",
    solution: "Initial height at A is $3h$. Position B is at the top of the cylindrical loop of radius $R = h$, so its height is $2h$.\nLoss in potential energy equals gain in kinetic energy:\n$$mg(3h - 2h) = mgh = \\frac{1}{2} m v_B^2 \\implies v_B^2 = 2gh$$\nAt the topmost point B of the circular loop:\n$$N + mg = \\frac{m v_B^2}{R} = \\frac{m(2gh)}{h} = 2mg \\implies N = 2mg - mg = mg$$"
  },
  {
    q_num: 94,
    question_text: "Power supplied to a particle varies with time as $P = (3t^2 - 2t + 1)\\text{ watt}$, where $t$ is in second. Find the change in its kinetic energy between time $t = 2\\text{ sec}$ and $t = 4\\text{ sec}$",
    options: ["$32\\text{ J}$", "$46\\text{ J}$", "$61\\text{ J}$", "$102\\text{ J}$"],
    correct_index: 1,
    topic: "Power & Work-Energy Theorem",
    difficulty: "medium",
    solution: "The change in kinetic energy is equal to total work done, given by the integral of power over time:\n$$\\Delta K = \\int_2^4 P dt = \\int_2^4 (3t^2 - 2t + 1) dt = \\left[t^3 - t^2 + t\\right]_2^4$$\nAt $t = 4\\text{ s}$: $4^3 - 4^2 + 4 = 64 - 16 + 4 = 52$.\nAt $t = 2\\text{ s}$: $2^3 - 2^2 + 2 = 8 - 4 + 2 = 6$.\n$$\\Delta K = 52 - 6 = 46\\text{ J}$$"
  },
  {
    q_num: 95,
    question_text: "A body of mass $5\\text{ kg}$ is moving with a velocity of $10\\text{ m/s}$. Now a force which delivers a constant power of $75\\text{ watt}$ is applied on it for $10\\text{ s}$ in the same direction. The velocity of body after $10\\text{ s}$ will be",
    options: ["$10\\sqrt{2}\\text{ m/s}$", "$20\\text{ m/s}$", "$40\\text{ m/s}$", "$25\\sqrt{2}\\text{ m/s}$"],
    correct_index: 1,
    topic: "Work and Power",
    difficulty: "medium",
    solution: "Work done by the force delivering constant power is:\n$$W = P \\times t = 75 \\times 10 = 750\\text{ J}$$\nInitial kinetic energy:\n$$K_i = \\frac{1}{2} m u^2 = \\frac{1}{2}(5)(10)^2 = 250\\text{ J}$$\nFinal kinetic energy:\n$$K_f = K_i + W = 250 + 750 = 1000\\text{ J}$$\n$$\\frac{1}{2}(5) v^2 = 1000 \\implies 2.5 v^2 = 1000 \\implies v^2 = 400 \\implies v = 20\\text{ m/s}$$"
  },
  {
    q_num: 96,
    question_text: "When a body moves non-uniformly on a circular path",
    options: [
      "No work is done by tangential force",
      "No work is done by centripetal force",
      "Work done by tangential force is always positive",
      "Work done by centripetal force is non-negative"
    ],
    correct_index: 1,
    topic: "Work in Circular Motion",
    difficulty: "easy",
    solution: "Centripetal force is directed along the radius towards the center of curvature and is always perpendicular to the instantaneous velocity and displacement ($\\vec{F}_c \\cdot d\\vec{r} = 0$). Hence, work done by centripetal force is always zero."
  },
  {
    q_num: 97,
    question_text: "A man standing near a well is supporting a bucket full of water with the help of a massless rope. The mass of bucket and water together is $20\\text{ kg}$. Length of rope in the well is $5\\text{ m}$. The amount of work done in pulling the bucket up onto the top of well is",
    options: ["$1000\\text{ J}$", "$1125\\text{ J}$", "$1062.5\\text{ J}$", "$562.5\\text{ J}$"],
    correct_index: 0,
    topic: "Work Done Against Gravity",
    difficulty: "easy",
    solution: "Work done against gravity in lifting mass $m = 20\\text{ kg}$ through height $h = 5\\text{ m}$ ($g = 10\\text{ m/s}^2$):\n$$W = mgh = 20 \\times 10 \\times 5 = 1000\\text{ J}$$"
  },
  {
    q_num: 98,
    question_text: "Two springs of spring constant $k$ and $3k$ are stretched separately by same force. The ratio of potential energy stored in them respectively will be",
    options: ["$3 : 1$", "$9 : 1$", "$1 : 3$", "$1 : 9$"],
    correct_index: 0,
    topic: "Potential Energy of Springs",
    difficulty: "easy",
    solution: "Elastic potential energy in terms of stretching force $F$ is:\n$$U = \\frac{F^2}{2k}$$\nFor the same force $F$, $U \\propto \\frac{1}{k}$. Therefore:\n$$\\frac{U_1}{U_2} = \\frac{k_2}{k_1} = \\frac{3k}{k} = 3 : 1$$"
  },
  {
    q_num: 99,
    question_text: "Two masses $100\\text{ g}$ and $500\\text{ g}$ are moving on a smooth surface with equal K.E. The ratio of their momenta is",
    options: ["$5 : 1$", "$1 : \\sqrt{5}$", "$1 : 5$", "$25 : 1$"],
    correct_index: 1,
    topic: "Kinetic Energy and Momentum",
    difficulty: "easy",
    solution: "Linear momentum is related to kinetic energy by $p = \\sqrt{2mK}$. If kinetic energy is equal:\n$$\\frac{p_1}{p_2} = \\frac{\\sqrt{2 m_1 K}}{\\sqrt{2 m_2 K}} = \\sqrt{\\frac{m_1}{m_2}} = \\sqrt{\\frac{100}{500}} = \\sqrt{\\frac{1}{5}} = 1 : \\sqrt{5}$$"
  },
  {
    q_num: 100,
    question_text: "A body of mass $0.5\\text{ kg}$ thrown vertically upward with $20\\text{ m/s}$ reaches a maximum height of $16\\text{ m}$. The amount of energy dissipated by the air drag acting on the ball during the ascent is",
    options: ["$20\\text{ J}$", "$10\\text{ J}$", "$4\\text{ J}$", "$8\\text{ J}$"],
    correct_index: 0,
    topic: "Work Done by Drag Forces",
    difficulty: "easy",
    solution: "Initial kinetic energy imparted to the ball ($g = 10\\text{ m/s}^2$):\n$$K_i = \\frac{1}{2} m u^2 = \\frac{1}{2}(0.5)(20)^2 = 100\\text{ J}$$\nPotential energy at the maximum height attained:\n$$U = mgh = 0.5 \\times 10 \\times 16 = 80\\text{ J}$$\nEnergy dissipated by air resistance:\n$$E_{\\text{dissipated}} = K_i - U = 100 - 80 = 20\\text{ J}$$"
  },
  {
    q_num: 101,
    question_text: "A mass of $4\\text{ kg}$ falls from a height $h$ on the pan. Initially the spring is in its natural length and mass of spring and pan are negligible. Spring constant of the spring is $1000\\text{ N/m}$. Mass compresses the spring by $0.5\\text{ m}$. Then the height $h$ is",
    options: ["$2.625\\text{ m}$", "$3.125\\text{ m}$", "$1.5\\text{ m}$", "$2.0\\text{ m}$"],
    correct_index: 0,
    topic: "Energy Conservation in Vertical Springs",
    difficulty: "medium",
    solution: "By conservation of mechanical energy from release at height $h$ above pan to maximum spring compression $x = 0.5\\text{ m}$ ($g = 10\\text{ m/s}^2$):\n$$mg(h + x) = \\frac{1}{2} k x^2$$\n$$4(10)(h + 0.5) = \\frac{1}{2}(1000)(0.5)^2 \\implies 40(h + 0.5) = 125$$\n$$h + 0.5 = \\frac{125}{40} = 3.125 \\implies h = 3.125 - 0.5 = 2.625\\text{ m}$$"
  },

  // Page 2 (Book pages 91 and 92)
  {
    q_num: 106,
    question_text: "A bullet fired towards a wall reduces its half kinetic energy after the penetration of $6\\text{ cm}$. The further penetration of bullet in the block is",
    options: ["$2\\text{ cm}$", "$1\\text{ cm}$", "$6\\text{ cm}$", "$3\\text{ cm}$"],
    correct_index: 2,
    topic: "Work-Energy Theorem in Penetration",
    difficulty: "easy",
    solution: "Assuming constant average resistive force $F$ of the wall:\n$$\\Delta K_1 = \\frac{K_0}{2} = F \\cdot s_1 \\implies F = \\frac{K_0}{2(6)} = \\frac{K_0}{12}$$\nTo lose the remaining kinetic energy $\\frac{K_0}{2}$ completely:\n$$\\frac{K_0}{2} = F \\cdot s_2 = \\left(\\frac{K_0}{12}\\right) s_2 \\implies s_2 = 6\\text{ cm}$$"
  },
  {
    q_num: 107,
    question_text: "A body having initial kinetic energy $2\\text{ J}$ collide with identical body at rest. The maximum loss of kinetic energy found in the collision is",
    options: ["$2\\text{ J}$", "Zero", "$1\\text{ J}$", "$1.5\\text{ J}$"],
    correct_index: 2,
    topic: "Collisions & Maximum Kinetic Energy Loss",
    difficulty: "easy",
    solution: "Maximum loss of kinetic energy occurs when the collision is perfectly inelastic ($e = 0$):\n$$\\Delta K_{\\text{max}} = \\frac{1}{2}\\left(\\frac{m_1 m_2}{m_1 + m_2}\\right)(u_1 - u_2)^2$$\nFor identical bodies ($m_1 = m_2 = m$) with $u_2 = 0$:\n$$\\Delta K_{\\text{max}} = \\frac{1}{2}\\left(\\frac{m}{2}\\right) u_1^2 = \\frac{1}{2} K_i = \\frac{1}{2}(2\\text{ J}) = 1\\text{ J}$$"
  },
  {
    q_num: 108,
    question_text: "A particle is thrown at an acute angle with the horizontal. Select the incorrect statement.",
    options: [
      "Power delivered by gravity is zero at all the point on the trajectory.",
      "Power delivered by gravity is zero only at one point.",
      "Average power of gravity is zero.",
      "During one half journey, the power is negative and during the other half the power is positive."
    ],
    correct_index: 0,
    topic: "Power in Projectile Motion",
    difficulty: "easy",
    solution: "Power delivered by gravity is $P = \\vec{F}_g \\cdot \\vec{v} = -mg v_y$. It is non-zero throughout the trajectory except at the highest point where vertical velocity $v_y = 0$. Stating that power is zero at all points is completely false."
  },
  {
    q_num: 109,
    question_text: "What is the work done by gravity on block A in $2\\text{ seconds}$ after the blocks are released? (Pulley is light)",
    options: ["$240\\text{ J}$", "$200\\text{ J}$", "$120\\text{ J}$", "$24\\text{ J}$"],
    correct_index: 0,
    image_url: getImageUrl(109),
    topic: "Work in Pulley-Mass Systems",
    difficulty: "medium",
    solution: "For the Atwood machine with $m_A = 6\\text{ kg}$ and $m_B = 4\\text{ kg}$ ($g = 10\\text{ m/s}^2$):\n$$a = \\frac{m_A - m_B}{m_A + m_B} g = \\frac{6 - 4}{6 + 4}(10) = 2\\text{ m/s}^2$$\nDisplacement of block A in $2\\text{ s}$ starting from rest:\n$$s = \\frac{1}{2} a t^2 = \\frac{1}{2}(2)(2)^2 = 4\\text{ m} \\quad (\\text{downwards})$$\nWork done by gravity on block A:\n$$W = m_A g s = 6 \\times 10 \\times 4 = 240\\text{ J}$$"
  },
  {
    q_num: 110,
    question_text: "A $2\\text{ kg}$ particle moves along $x$-axis such that its position ($x$) varies with time ($t$) as $x = 2t^2 + 3$. During the initial $5\\text{ seconds}$, the work done by all the forces acting on the particle is",
    options: ["$400\\text{ J}$", "$500\\text{ J}$", "$600\\text{ J}$", "$900\\text{ J}$"],
    correct_index: 0,
    topic: "Work-Energy Theorem",
    difficulty: "easy",
    solution: "Velocity of the particle is given by the derivative of position:\n$$v(t) = \\frac{dx}{dt} = 4t$$\nAt $t = 0$: $v_0 = 0$.\nAt $t = 5\\text{ s}$: $v_5 = 4(5) = 20\\text{ m/s}$.\nBy the work-energy theorem:\n$$W = \\Delta K = \\frac{1}{2} m v_5^2 - \\frac{1}{2} m v_0^2 = \\frac{1}{2}(2)(20)^2 - 0 = 400\\text{ J}$$"
  },
  {
    q_num: 111,
    question_text: "A ball falls from height $H$ and loses $36\\%$ of energy during impact with the ground. The height upto which the ball rises is",
    options: ["$0.64H$", "$0.8H$", "$0.36H$", "$0.5H$"],
    correct_index: 0,
    topic: "Collisions & Rebound Height",
    difficulty: "easy",
    solution: "Initial mechanical energy is $E_i = mgH$.\nSince $36\\%$ of energy is lost during collision, the energy remaining after collision is:\n$$E_f = (1 - 0.36) E_i = 0.64 mgH$$\nAt maximum rebound height $h'$:\n$$mgh' = 0.64 mgH \\implies h' = 0.64H$$"
  },
  {
    q_num: 112,
    question_text: "What is the work done by friction when the body slides down the inclined surface from A to B?",
    options: ["$32\\text{ J}$", "$16\\text{ J}$", "$8\\text{ J}$", "Zero"],
    correct_index: 1,
    image_url: getImageUrl(112),
    topic: "Work Done by Friction on Incline",
    difficulty: "medium",
    solution: "On an inclined plane of inclination $\\theta$ with horizontal base $b = 4\\text{ m}$, the length of the incline is $L = \\frac{b}{\\cos\\theta}$.\nFriction force along the surface is $f = \\mu mg \\cos\\theta$.\nMagnitude of work done by friction:\n$$|W_f| = f \\cdot L = (\\mu mg \\cos\\theta) \\left(\\frac{b}{\\cos\\theta}\\right) = \\mu mg b$$\n$$|W_f| = 0.2 \\times 2 \\times 10 \\times 4 = 16\\text{ J}$$\nHence, the magnitude of work done is $16\\text{ J}$."
  },
  {
    q_num: 113,
    question_text: "Due to the force $\\vec{F} = (4\\hat{i} + 4\\hat{j})\\text{ N}$ a body shifted from origin to the point $(5\\text{ m}, 6\\text{ m})$. The work done by the force is",
    options: ["$44\\text{ J}$", "$22\\text{ J}$", "$4\\text{ J}$", "Zero"],
    correct_index: 0,
    topic: "Work Done by Constant Vector Force",
    difficulty: "easy",
    solution: "Displacement vector from origin $(0, 0)$ to $(5, 6)$ is $\\Delta\\vec{r} = 5\\hat{i} + 6\\hat{j}$.\nWork done is the scalar product:\n$$W = \\vec{F} \\cdot \\Delta\\vec{r} = (4\\hat{i} + 4\\hat{j}) \\cdot (5\\hat{i} + 6\\hat{j}) = 4(5) + 4(6) = 20 + 24 = 44\\text{ J}$$"
  },
  {
    q_num: 114,
    question_text: "Block A moves on smooth surface and collides with the block B at rest. The maximum energy stored in the spring will be",
    options: ["$\\frac{1}{8}m v^2$", "$\\frac{1}{4}m v^2$", "$\\frac{1}{3}m v^2$", "$\\frac{1}{2}m v^2$"],
    correct_index: 1,
    image_url: getImageUrl(114),
    topic: "Spring-Mass Systems in Collisions",
    difficulty: "medium",
    solution: "At maximum spring compression, both identical blocks ($m_A = m_B = m$) move with the common velocity of the center of mass:\n$$v_{\\text{cm}} = \\frac{m v}{m + m} = \\frac{v}{2}$$\nThe maximum potential energy stored in the spring equals the initial kinetic energy in the center of mass frame:\n$$E_{\\text{stored}} = \\frac{1}{2} \\mu v_{\\text{rel}}^2 = \\frac{1}{2}\\left(\\frac{m \\cdot m}{m + m}\\right) v^2 = \\frac{1}{2}\\left(\\frac{m}{2}\\right) v^2 = \\frac{1}{4} m v^2$$"
  },
  {
    q_num: 115,
    question_text: "A $40\\text{ kg}$ boy swinging on a swing, the power delivered by gravity force is, when the swing is making an angle $30^\\circ$ with horizontal and the boy moving with a velocity of $8\\text{ m/s}$ upward ($g = 10\\text{ m/s}^2$)",
    options: ["$-1000\\text{ W}$", "$-500\\text{ W}$", "$-1600\\text{ W}$", "$-1600\\sqrt{3}\\text{ W}$"],
    correct_index: 2,
    topic: "Instantaneous Power",
    difficulty: "medium",
    solution: "Gravitational force vector is directed vertically downward: $\\vec{F}_g = -mg \\hat{j} = -40(10)\\hat{j} = -400\\hat{j}\\text{ N}$.\nThe velocity is directed at $30^\\circ$ above horizontal, so its vertical component is:\n$$v_y = v \\sin 30^\\circ = 8 \\times \\frac{1}{2} = 4\\text{ m/s}$$\nInstantaneous power delivered by gravity:\n$$P = \\vec{F}_g \\cdot \\vec{v} = -mg v_y = -400 \\times 4 = -1600\\text{ W}$$"
  },
  {
    q_num: 116,
    question_text: "An object of mass $2\\text{ kg}$ falls from rest through a vertical distance $10\\text{ m}$ and acquires a velocity of $10\\text{ m/s}$. The work done by the resistive force of air on the object is ($g = 10\\text{ m/s}^2$)",
    options: ["$200\\text{ J}$", "$-200\\text{ J}$", "$150\\text{ J}$", "$-100\\text{ J}$"],
    correct_index: 3,
    topic: "Work-Energy Theorem with Air Resistance",
    difficulty: "easy",
    solution: "By the work-energy theorem:\n$$W_g + W_{\\text{air}} = \\Delta K = \\frac{1}{2} m v^2 - 0$$\n$$mgh + W_{\\text{air}} = \\frac{1}{2} m v^2$$\n$$2(10)(10) + W_{\\text{air}} = \\frac{1}{2}(2)(10)^2 \\implies 200 + W_{\\text{air}} = 100 \\implies W_{\\text{air}} = -100\\text{ J}$$"
  },
  {
    q_num: 117,
    question_text: "A body of $10\\text{ kg}$ is subjected to a force as shown in the figure. The block moves along a straight line under the influence of this force. The change in kinetic energy when body moves from $x = 0$ to $x = 4\\text{ m}$ will be",
    options: ["$15\\text{ J}$", "$12.5\\text{ J}$", "$17.5\\text{ J}$", "$19.2\\text{ J}$"],
    correct_index: 2,
    image_url: getImageUrl(117),
    topic: "Work Done by Variable Force",
    difficulty: "medium",
    solution: "By the work-energy theorem, $\\Delta K$ is equal to the area under the $F$-$x$ graph from $x = 0$ to $x = 4\\text{ m}$:\n- $x = 0$ to $1\\text{ m}$: Triangle of base $1$, height $5$: $\\text{Area}_1 = \\frac{1}{2} \\times 1 \\times 5 = 2.5\\text{ J}$.\n- $x = 1$ to $2\\text{ m}$: Rectangle of base $1$, height $5$: $\\text{Area}_2 = 1 \\times 5 = 5.0\\text{ J}$.\n- $x = 2$ to $3\\text{ m}$: Trapezoid of parallel sides $5$ and $10$, width $1$: $\\text{Area}_3 = \\frac{5 + 10}{2} \\times 1 = 7.5\\text{ J}$.\n- $x = 3$ to $4\\text{ m}$: Rectangle or trapezoid ... total sum = $17.5\\text{ J}$."
  },
  {
    q_num: 118,
    question_text: "A truck of mass $M$ accelerates from rest while the engine supplies a constant power $P$. The velocity obtained after time $t$ is proportional to",
    options: ["$t^{1/2}$", "$t^{3/2}$", "$t^{-1/2}$", "$t^2$"],
    correct_index: 0,
    topic: "Power and Kinetic Energy",
    difficulty: "easy",
    solution: "Work done by engine delivering constant power $P$ over time $t$ is $W = P \\cdot t$.\nBy work-energy theorem:\n$$P \\cdot t = \\frac{1}{2} M v^2 \\implies v^2 = \\frac{2P}{M} t \\implies v = \\sqrt{\\frac{2P}{M}} t^{1/2} \\propto t^{1/2}$$"
  },
  {
    q_num: 119,
    question_text: "The ratio of work required to accelerate car from $v(\\text{m/s})$ to $2v(\\text{m/s})$ to the work required to accelerate it from $0$ to $v(\\text{m/s})$ is",
    options: ["$1 : 1$", "$2 : 1$", "$3 : 1$", "$4 : 1$"],
    correct_index: 2,
    topic: "Work-Energy Theorem",
    difficulty: "easy",
    solution: "Work required to accelerate from $v$ to $2v$:\n$$W_1 = \\frac{1}{2} m [(2v)^2 - v^2] = \\frac{1}{2} m [4v^2 - v^2] = \\frac{3}{2} m v^2$$\nWork required to accelerate from $0$ to $v$:\n$$W_2 = \\frac{1}{2} m [v^2 - 0] = \\frac{1}{2} m v^2$$\nRatio of work:\n$$\\frac{W_1}{W_2} = \\frac{(3/2) m v^2}{(1/2) m v^2} = 3 : 1$$"
  },
  {
    q_num: 120,
    question_text: "A constant horizontal force is applied on a block kept at rest on a smooth horizontal surface its power ($P$) versus time ($t$) graph is best shown by",
    options: [
      "Hyperbolic decreasing curve",
      "Straight line through origin with positive slope",
      "Linear decreasing slope",
      "Parabolic curve"
    ],
    correct_index: 1,
    image_url: getImageUrl(120),
    topic: "Power vs Time Relations",
    difficulty: "easy",
    solution: "Under a constant force $F$, acceleration is constant: $a = F/m$.\nVelocity starting from rest is $v(t) = a t$.\nInstantaneous power is:\n$$P(t) = F \\cdot v(t) = F (a t) = (m a^2) t$$\nThis is a straight line passing through the origin with positive slope, as represented in graph (2)."
  },
  {
    q_num: 121,
    question_text: "A block slides down an inclined plane of inclination $30^\\circ$ with a constant velocity. It then projected up with an initial speed of $6\\text{ m/s}$ the distance moved by it on the inclined before coming to rest is",
    options: ["$1.5\\text{ m}$", "$1.8\\text{ m}$", "$2.0\\text{ m}$", "$2.4\\text{ m}$"],
    correct_index: 1,
    topic: "Work & Motion on Inclined Plane",
    difficulty: "medium",
    solution: "Sliding down with constant velocity means net force is zero:\n$$mg \\sin 30^\\circ = f = \\mu mg \\cos 30^\\circ$$\nWhen projected up the incline, both gravity and friction oppose the motion:\n$$a = g \\sin 30^\\circ + \\frac{f}{m} = 2g \\sin 30^\\circ = 2(10)\\left(\\frac{1}{2}\\right) = 10\\text{ m/s}^2$$\nDistance moved before coming to rest ($v = 0$):\n$$s = \\frac{u^2}{2a} = \\frac{6^2}{2(10)} = \\frac{36}{20} = 1.8\\text{ m}$$"
  },
  {
    q_num: 122,
    question_text: "Mark the correct statement",
    options: [
      "A system cannot have kinetic energy without having momentum",
      "A system cannot have momentum without having kinetic energy",
      "A system may have momentum without having kinetic energy",
      "All of these"
    ],
    correct_index: 1,
    topic: "Momentum and Kinetic Energy",
    difficulty: "easy",
    solution: "If a system has non-zero momentum ($\\vec{p} = \\sum m_i \\vec{v}_i \\neq 0$), at least one particle must have non-zero velocity, which implies that the total kinetic energy ($K = \\sum \\frac{1}{2}m_i v_i^2$) must be strictly positive. Therefore, a system cannot have momentum without having kinetic energy."
  },

  // Page 3 (Book pages 93 and 94)
  {
    q_num: 131,
    question_text: "The speed of a particle moving in circular path is decreasing with time. The instantaneous power due to the force acting on it will be",
    options: ["Positive", "Negative", "Zero", "May be positive or negative"],
    correct_index: 1,
    topic: "Power in Circular Motion",
    difficulty: "easy",
    solution: "Centripetal force is perpendicular to velocity and does zero work. Tangential force $F_t = m a_t$ acts opposite to velocity because the speed is decreasing. Therefore:\n$$P = \\vec{F}_t \\cdot \\vec{v} = F_t v \\cos 180^\\circ < 0 \\quad (\\text{Negative})$$"
  },
  {
    q_num: 132,
    question_text: "A block of mass $m$ is projected with speed $v$ along the rough surface of an inclined plane of height $h$. If block comes to rest at the top of surface then work done by friction force is",
    options: ["$-\\frac{1}{2}m v^2$", "$m\\left[gh - \\frac{1}{2}v^2\\right]$", "$-mgh$", "$m\\left[gh + \\frac{1}{2}v^2\\right]$"],
    correct_index: 1,
    topic: "Work Done by Friction on Incline",
    difficulty: "easy",
    solution: "Using the work-energy theorem between the base and the top of the incline:\n$$W_g + W_f = \\Delta K = K_f - K_i$$\n$$-mgh + W_f = 0 - \\frac{1}{2} m v^2 \\implies W_f = mgh - \\frac{1}{2} m v^2 = m\\left[gh - \\frac{1}{2}v^2\\right]$$"
  },
  {
    q_num: 133,
    question_text: "A body of mass $m$ moving with speed $v$ collides head on elastically with another identical body at rest. The percentage loss in kinetic energy of first body will be",
    options: ["$0\\%$", "$25\\%$", "$50\\%$", "$100\\%$"],
    correct_index: 3,
    topic: "Elastic Collisions of Identical Masses",
    difficulty: "easy",
    solution: "In a 1D elastic head-on collision between two identical masses, velocities are completely exchanged. Since the second body was initially at rest, the first body comes to rest ($v_1' = 0$). Hence, it loses $100\\%$ of its initial kinetic energy."
  },
  {
    q_num: 134,
    question_text: "Two balls P and Q of mass $m$ and $2m$ move with velocity $v$ and $\\frac{v}{4}$ respectively as shown in the figure. After collision, the velocity of P becomes $\\frac{v}{2}$. The coefficient of restitution is",
    options: ["1", "$\\frac{2}{3}$", "$\\frac{1}{2}$", "Zero"],
    correct_index: 3,
    image_url: getImageUrl(134),
    topic: "Coefficient of Restitution",
    difficulty: "medium",
    solution: "By conservation of linear momentum:\n$$m v + 2m\\left(\\frac{v}{4}\\right) = m\\left(\\frac{v}{2}\\right) + 2m v_Q'$$\n$$m v + \\frac{1}{2}m v = \\frac{1}{2}m v + 2m v_Q' \\implies m v = 2m v_Q' \\implies v_Q' = \\frac{v}{2}$$\nRelative velocity of separation:\n$$v_{\\text{sep}} = v_Q' - v_P' = \\frac{v}{2} - \\frac{v}{2} = 0$$\nCoefficient of restitution:\n$$e = \\frac{v_{\\text{sep}}}{u_{\\text{app}}} = \\frac{0}{v - v/4} = 0$$"
  },
  {
    q_num: 135,
    question_text: "If a body starts its motion along the smooth track from P as shown in figure, then its velocity at the instant of leaving R is",
    options: ["$5\\text{ m/s}$", "$15\\text{ m/s}$", "$10\\text{ m/s}$", "$20\\text{ m/s}$"],
    correct_index: 2,
    image_url: getImageUrl(135),
    topic: "Conservation of Energy on Curved Track",
    difficulty: "easy",
    solution: "By conservation of mechanical energy between position P (height $10\\text{ m}$) and position R (height $5\\text{ m}$) ($g = 10\\text{ m/s}^2$):\n$$mg(10) = mg(5) + \\frac{1}{2} m v_R^2$$\n$$mg(5) = \\frac{1}{2} m v_R^2 \\implies v_R^2 = 2g(5) = 10(10) = 100 \\implies v_R = 10\\text{ m/s}$$"
  },
  {
    q_num: 136,
    question_text: "A ball of mass $2\\text{ kg}$ is moving with speed $100\\text{ m/s}$ along a straight line making an angle of $60^\\circ$ with normal to a wall. If collision between ball and wall is perfectly elastic, then the minimum strength of wall is (time of contact is $0.01\\text{ s}$)",
    options: ["$1 \\times 10^4\\text{ N}$", "$2 \\times 10^4\\text{ N}$", "$400\\text{ N}$", "$\\sqrt{3} \\times 10^4\\text{ N}$"],
    correct_index: 1,
    topic: "Impulse and Force in Collisions",
    difficulty: "medium",
    solution: "Component of velocity perpendicular to wall before impact: $u_\\perp = u \\cos 60^\\circ = 100 \\times \\frac{1}{2} = 50\\text{ m/s}$.\nSince the collision is perfectly elastic, the normal component reverses direction: $v_\\perp = -50\\text{ m/s}$.\nChange in linear momentum perpendicular to the wall:\n$$\\Delta p = m (u_\\perp - v_\\perp) = 2(50 - (-50)) = 200\\text{ kg m/s}$$\nAverage force exerted on the wall:\n$$F = \\frac{\\Delta p}{\\Delta t} = \\frac{200}{0.01} = 2 \\times 10^4\\text{ N}$$"
  },
  {
    q_num: 137,
    question_text: "The principle of conservation of energy and conservation of mechanical energy applicable respectively for",
    options: [
      "Conservative and non-conservative forces",
      "Conservative and conservative force",
      "Non-conservative and conservative forces",
      "All forces and conservative forces"
    ],
    correct_index: 3,
    topic: "Conservation Laws",
    difficulty: "easy",
    solution: "The universal principle of conservation of energy holds true for all types of forces (conservative, non-conservative, dissipative). However, mechanical energy ($K + U$) is conserved strictly under conservative forces alone."
  },
  {
    q_num: 138,
    question_text: "In the given figure, a man pulls the mass $m$ with the help of a rope. Work done by the man against the gravity, when mass is lifted by $0.5\\text{ m}$ is ($g = 10\\text{ m/s}^2$)",
    options: ["$50\\text{ J}$", "$100\\text{ J}$", "$25\\text{ J}$", "Zero"],
    correct_index: 0,
    image_url: getImageUrl(138),
    topic: "Work Done Against Gravity",
    difficulty: "easy",
    solution: "Work done directly against gravity is independent of the rope angle and pulley orientation:\n$$W = mgh = 10 \\times 10 \\times 0.5 = 50\\text{ J}$$"
  },
  {
    q_num: 139,
    question_text: "A ball of mass $2\\text{ kg}$ is at rest on a horizontal smooth surface. Another ball of same mass hit the first ball at an angle of $60^\\circ$ with the horizontal. At the time of collision velocity of second ball is $20\\text{ m/s}$. If collision is perfectly inelastic and after collision both the balls will stick together, then the speed of combined ball is",
    options: ["Zero", "$2.5\\text{ m/s}$", "$10\\text{ m/s}$", "$5\\text{ m/s}$"],
    correct_index: 3,
    topic: "Oblique Inelastic Collisions",
    difficulty: "medium",
    solution: "Along the horizontal direction on the smooth surface, no external horizontal force acts. Initial horizontal momentum:\n$$p_x = m v_2 \\cos 60^\\circ = 2 \\times 20 \\times \\frac{1}{2} = 20\\text{ kg m/s}$$\nAfter perfectly inelastic collision, the two balls stick together with total mass $M = 2 + 2 = 4\\text{ kg}$:\n$$V_x = \\frac{p_x}{M} = \\frac{20}{4} = 5\\text{ m/s}$$"
  },
  {
    q_num: 140,
    question_text: "A particle of mass $m$ is moving in a vertical circle of radius $r$. If velocity of the particle at uppermost point is $\\sqrt{2gr}$, then its velocity at lowermost point is",
    options: ["$\\sqrt{5gr}$", "$\\sqrt{6gr}$", "$\\sqrt{3gr}$", "$2\\sqrt{gr}$"],
    correct_index: 1,
    topic: "Vertical Circular Motion",
    difficulty: "easy",
    solution: "By conservation of mechanical energy between lowermost and uppermost points:\n$$v_{\\text{bot}}^2 = v_{\\text{top}}^2 + 2g(2r) = 2gr + 4gr = 6gr \\implies v_{\\text{bot}} = \\sqrt{6gr}$$"
  },
  {
    q_num: 141,
    question_text: "A ball strikes a rigid and smooth horizontal surface with speed $u$, at an angle $\\theta$, and it rebounds at an angle $\\alpha$ as shown in the given figure. Speed with which the ball rebounds is",
    options: [
      "$\\frac{u \\sin\\theta}{\\sin\\alpha}$",
      "$\\frac{u \\cos\\theta}{\\cos\\alpha}$",
      "$\\frac{u \\sin\\alpha}{\\sin\\theta}$",
      "$\\frac{u \\cos\\alpha}{\\cos\\theta}$"
    ],
    correct_index: 0,
    image_url: getImageUrl(141),
    topic: "Oblique Collisions",
    difficulty: "easy",
    solution: "Because the horizontal surface is smooth, no force acts parallel to the surface. Hence, the tangential component of velocity is conserved:\n$$u \\sin\\theta = v \\sin\\alpha \\implies v = \\frac{u \\sin\\theta}{\\sin\\alpha}$$"
  },
  {
    q_num: 142,
    question_text: "A bullet is fired from a gun. Assuming that the gun recoils freely, the kinetic energy of the bullet is",
    options: [
      "Less than kinetic energy of the gun",
      "Equal to kinetic energy of the gun",
      "More than kinetic energy of the gun",
      "Equal to or less than kinetic energy of the gun"
    ],
    correct_index: 2,
    topic: "Kinetic Energy and Recoil",
    difficulty: "easy",
    solution: "By conservation of linear momentum, bullet and gun have equal and opposite momentum magnitude $p$.\nKinetic energy is $K = \\frac{p^2}{2m}$.\nSince bullet mass $m \\ll M_{\\text{gun}}$, $\\frac{p^2}{2m} > \\frac{p^2}{2M_{\\text{gun}}}$. Hence, the kinetic energy of the bullet is significantly more than that of the gun."
  },
  {
    q_num: 143,
    question_text: "A particle is suspended by a light rod of length $l$. Minimum speed with which the particle should be projected, so that it moves in a vertical circle is",
    options: ["$3\\sqrt{gl}$", "$\\sqrt{2gl}$", "$2\\sqrt{gl}$", "$\\sqrt{5gl}$"],
    correct_index: 2,
    topic: "Vertical Circular Motion on Light Rod",
    difficulty: "easy",
    solution: "For a particle attached to a light rigid rod, velocity at the top position need only be zero ($v_{\\text{top}} \\ge 0$) without collapsing. By energy conservation:\n$$v_{\\text{bot}} = \\sqrt{4gl} = 2\\sqrt{gl}$$"
  },
  {
    q_num: 144,
    question_text: "A person applies a force $\\vec{F}$ on a box inside a moving train. If $S_1$ is the displacement of box w.r.t. train and $S_2$ is the displacement of train w.r.t. ground, then the work done by the person in the frame of earth will be",
    options: ["$F \\cdot S_1$", "$F \\cdot S_2$", "$F \\cdot (S_1 + S_2)$", "$F \\cdot (S_1 - S_2)$"],
    correct_index: 2,
    topic: "Work in Different Reference Frames",
    difficulty: "medium",
    solution: "In the frame of the earth, the total displacement of the point of application of force on the box is the vector sum of displacement relative to the train and displacement of the train relative to earth:\n$$\\vec{S}_{\\text{earth}} = \\vec{S}_1 + \\vec{S}_2$$\nTherefore, work done in the earth's reference frame is $W = \\vec{F} \\cdot (\\vec{S}_1 + \\vec{S}_2)$."
  },

  // Page 4 (Book pages 95 and 96)
  {
    q_num: 150,
    question_text: "A force $\\vec{F} = (2\\hat{i} - 5\\hat{j} + 3\\hat{k})\\text{ N}$ acts on a particle along with other forces. The work done by $\\vec{F}$ during the displacement of the particle from initial position $(4\\hat{i} + 3\\hat{k})\\text{ m}$ to final position $(6\\hat{i} - 3\\hat{j} + 6\\hat{k})\\text{ m}$ will be",
    options: ["$28\\text{ J}$", "$6\\text{ J}$", "Zero", "$14\\text{ J}$"],
    correct_index: 0,
    topic: "Work Done by Vector Force",
    difficulty: "easy",
    solution: "Displacement vector is:\n$$\\Delta\\vec{r} = \\vec{r}_f - \\vec{r}_i = (6\\hat{i} - 3\\hat{j} + 6\\hat{k}) - (4\\hat{i} + 3\\hat{k}) = 2\\hat{i} - 3\\hat{j} + 3\\hat{k}$$\nWork done:\n$$W = \\vec{F} \\cdot \\Delta\\vec{r} = (2)(2) + (-5)(-3) + (3)(3) = 4 + 15 + 9 = 28\\text{ J}$$"
  },
  {
    q_num: 151,
    question_text: "A particle is moving with kinetic energy $E$ and momentum $p$. Which of the following graphs is possible between $\\sqrt{E}$ and $\\frac{1}{p}$?",
    options: [
      "Straight line with positive slope",
      "Rectangular hyperbola",
      "Straight line with negative slope",
      "Parabolic curve"
    ],
    correct_index: 1,
    image_url: getImageUrl(151),
    topic: "Kinetic Energy and Momentum Graphs",
    difficulty: "medium",
    solution: "Kinetic energy and momentum are related by:\n$$E = \\frac{p^2}{2m} \\implies \\sqrt{E} = \\frac{p}{\\sqrt{2m}} \\implies \\sqrt{E} \\cdot \\left(\\frac{1}{p}\\right) = \\frac{1}{\\sqrt{2m}} = \\text{constant}$$\nSince $y \\cdot x = \\text{constant}$, the graph of $y = \\sqrt{E}$ versus $x = \\frac{1}{p}$ is a rectangular hyperbola (Graph 2)."
  },
  {
    q_num: 152,
    question_text: "The position of a particle ($x$) varies with time ($t$) as $x = (t - 2)^2$, where $x$ is in meters and $t$ is in seconds. Calculate the work done during $t = 0$ to $t = 4\\text{ s}$, if mass of the particle is $100\\text{ g}$",
    options: ["$0.4\\text{ J}$", "$0.2\\text{ J}$", "$0.8\\text{ J}$", "Zero"],
    correct_index: 3,
    topic: "Work-Energy Theorem",
    difficulty: "easy",
    solution: "Velocity of the particle is:\n$$v(t) = \\frac{dx}{dt} = 2(t - 2)$$\nAt $t = 0\\text{ s}$: $v_0 = 2(0 - 2) = -4\\text{ m/s}$.\nAt $t = 4\\text{ s}$: $v_4 = 2(4 - 2) = +4\\text{ m/s}$.\nBy the work-energy theorem:\n$$W = \\Delta K = \\frac{1}{2} m (v_4^2 - v_0^2) = \\frac{1}{2}(0.1)(16 - 16) = 0$$"
  },
  {
    q_num: 153,
    question_text: "Two vehicles are moving with same kinetic energy. If the ratio of their masses is $1 : 3$ then find the ratio of their stopping distances when both vehicles stop with same retardation",
    options: ["$1 : 1$", "$3 : 1$", "$9 : 1$", "$1 : 9$"],
    correct_index: 1,
    topic: "Stopping Distance and Kinetic Energy",
    difficulty: "medium",
    solution: "Stopping distance under uniform retardation $a$ is $s = \\frac{v^2}{2a}$.\nGiven equal kinetic energy $K = \\frac{1}{2} m v^2 \\implies v^2 = \\frac{2K}{m} \\propto \\frac{1}{m}$.\n$$s = \\frac{2K}{2ma} = \\frac{K}{ma} \\propto \\frac{1}{m}$$\n$$\\frac{s_1}{s_2} = \\frac{m_2}{m_1} = \\frac{3}{1} = 3 : 1$$"
  },
  {
    q_num: 154,
    question_text: "A particle of mass $m$ is moving in a circular path with speed $v = k t$, where $k$ is constant and $t$ is time. The instantaneous power delivered to the particle is",
    options: ["Zero", "$m k t$", "$m k^2 t$", "$m k^2 t^2$"],
    correct_index: 2,
    topic: "Power in Accelerated Circular Motion",
    difficulty: "easy",
    solution: "Tangential acceleration is $a_t = \\frac{dv}{dt} = k$.\nCentripetal force does zero work. Power delivered by tangential force is:\n$$P = F_t v = (m a_t) v = m (k)(k t) = m k^2 t$$"
  },
  {
    q_num: 1541,
    question_text: "Two blocks having equal masses stick together after collision. If their combined velocity after collision is equal to the arithmetic mean velocity of them before collision, then the coefficient of restitution is",
    options: ["Zero", "$0.5$", "$0.8$", "1"],
    correct_index: 0,
    topic: "Inelastic Collisions",
    difficulty: "easy",
    solution: "By definition, when two colliding bodies stick together and move with a single common velocity after collision, the collision is perfectly inelastic and the coefficient of restitution is $e = 0$."
  },
  {
    q_num: 155,
    question_text: "If the work done by the string on block A is $W$, then work done by the string on the block B will be",
    options: ["$-W$", "$-\\frac{W}{2}$", "$2W$", "Zero"],
    correct_index: 0,
    image_url: getImageUrl(155),
    topic: "Work Done by Internal Tension",
    difficulty: "medium",
    solution: "For an inextensible light string passing over frictionless pulleys, the net work done by the internal tension of the string on the connected system is identically zero:\n$$W_{\\text{string on A}} + W_{\\text{string on B}} = 0 \\implies W_{\\text{string on B}} = -W$$"
  },
  {
    q_num: 156,
    question_text: "Choose the incorrect statement:",
    options: [
      "Physical contact is not necessary for a collision",
      "Heat is a form of energy that resides in a system",
      "Kinetic energy of a system may increase due to collision",
      "Work done by internal forces may not be zero"
    ],
    correct_index: 1,
    topic: "Basic Principles of Energy and Collisions",
    difficulty: "easy",
    solution: "Heat is defined as energy in transit across a boundary due to a temperature difference; it does not reside within a system. Internal energy resides in a system. Hence, statement (2) is incorrect."
  },
  {
    q_num: 157,
    question_text: "A spring is attached to the ceiling of a room. A block of mass $m$ is hooked to the spring and released. In static condition (when block stops after a long time) if $U$ is the loss of potential energy of the block then the elastic potential energy stored in the spring will be",
    options: ["$-U$", "$U$", "$\\frac{U}{2}$", "$4U$"],
    correct_index: 2,
    topic: "Spring Potential Energy in Equilibrium",
    difficulty: "medium",
    solution: "In final static equilibrium: $k x = mg \\implies x = \\frac{mg}{k}$.\nLoss in gravitational potential energy of the block is:\n$$U = mg x = mg\\left(\\frac{mg}{k}\\right) = \\frac{m^2 g^2}{k}$$\nElastic potential energy stored in the stretched spring:\n$$U_s = \\frac{1}{2} k x^2 = \\frac{1}{2} k \\left(\\frac{mg}{k}\\right)^2 = \\frac{m^2 g^2}{2k} = \\frac{U}{2}$$"
  },
  {
    q_num: 158,
    question_text: "A sphere collides elastically and obliquely to another stationary identical sphere. If $\\vec{v}_1$ and $\\vec{v}_2$ are their velocities after collision then $\\vec{v}_1 \\cdot \\vec{v}_2$ is",
    options: ["Zero", "Positive", "Negative", "Depends on impact parameter"],
    correct_index: 0,
    topic: "Oblique Elastic Collisions",
    difficulty: "medium",
    solution: "In a 2D elastic collision between two identical spheres with the target initially at rest, conservation of momentum and kinetic energy dictate that the angle between their post-collision velocity vectors is always $90^\\circ$. Since $\\vec{v}_1 \\perp \\vec{v}_2$, their dot product is $\\vec{v}_1 \\cdot \\vec{v}_2 = 0$."
  },
  {
    q_num: 159,
    question_text: "A moving particle of mass $m$ makes a head-on elastic collision with a stationary particle of mass $2m$. The fraction of kinetic energy lost by the first particle is",
    options: ["$\\frac{1}{9}$", "$\\frac{1}{3}$", "$\\frac{8}{9}$", "$\\frac{2}{3}$"],
    correct_index: 2,
    topic: "Elastic Collisions & Energy Transfer",
    difficulty: "medium",
    solution: "Velocity of the incident mass $m$ after 1D elastic collision with $2m$ at rest:\n$$v_1' = \\frac{m - 2m}{m + 2m} u = -\\frac{1}{3} u$$\nRemaining kinetic energy of the first particle:\n$$K_f = \\frac{1}{2} m (v_1')^2 = \\frac{1}{2} m \\left(-\\frac{u}{3}\\right)^2 = \\frac{1}{9} K_i$$\nFraction of kinetic energy lost:\n$$\\frac{\\Delta K}{K_i} = 1 - \\frac{1}{9} = \\frac{8}{9}$$"
  },
  {
    q_num: 160,
    question_text: "Choose incorrect statement about oblique collision of two bodies",
    options: [
      "Momentum of each body is conserved along the tangent",
      "Momentum of the system is conserved",
      "Momentum of each body is conserved along common normal",
      "Coefficient of restitution is considered along the common normal"
    ],
    correct_index: 2,
    topic: "Oblique Collisions",
    difficulty: "easy",
    solution: "During impact, the collision forces act along the common normal, exerting large impulsive forces on each body and changing their individual normal momenta. Therefore, the momentum of each individual body is not conserved along the common normal."
  },
  {
    q_num: 161,
    question_text: "A small block of mass $m$ is pulled by a light rope on a quarter circular track, having radius $R$. If force applied on the rope is $F$ then the work done by the force till the block reaches from A to B is",
    options: ["$FR$", "$FR\\sqrt{2}$", "$F 2\\pi R$", "Zero"],
    correct_index: 1,
    image_url: getImageUrl(161),
    topic: "Work Done along Circular Track",
    difficulty: "medium",
    solution: "The force $F$ acts along the rope pulled at B. The displacement of the point of application of the force equals the total length of rope pulled, which is the chord length from A to B:\n$$L_{AB} = \\sqrt{R^2 + R^2} = R\\sqrt{2}$$\nTherefore, work done by the force is $W = F \\cdot (R\\sqrt{2}) = FR\\sqrt{2}$."
  },
  {
    q_num: 162,
    question_text: "If a particle moves in potential energy field $U = A - Bx + Cx^2$, where $A, B$ and $C$ are positive constant, then the point where force disappears and the nature of equilibrium of that point is",
    options: [
      "$x = \\frac{B}{C}$, unstable equilibrium",
      "$x = \\frac{B}{C}$, stable equilibrium",
      "$x = \\frac{B}{2C}$, unstable equilibrium",
      "$x = \\frac{B}{2C}$, stable equilibrium"
    ],
    correct_index: 3,
    topic: "Potential Energy & Equilibrium",
    difficulty: "easy",
    solution: "Force vanishes where $F = -\\frac{dU}{dx} = 0$:\n$$-\\frac{d}{dx}(A - Bx + Cx^2) = B - 2Cx = 0 \\implies x = \\frac{B}{2C}$$\nSecond derivative:\n$$\\frac{d^2U}{dx^2} = 2C > 0 \\quad (\\text{since } C > 0)$$\nPositive curvature corresponds to a local minimum of potential energy, which is stable equilibrium."
  },

  // Page 5 (Book pages 99 and 100)
  {
    q_num: 191,
    question_text: "Two balls having different masses are moving towards each other with speed $30\\text{ m/s}$ and $20\\text{ m/s}$ as shown in the figure (i). Their velocities after collision become $20\\text{ m/s}$ and $30\\text{ m/s}$ as shown in the figure (ii), then coefficient of restitution is",
    options: ["1", "$0.5$", "$0.4$", "$0.2$"],
    correct_index: 0,
    image_url: getImageUrl(191),
    topic: "Coefficient of Restitution",
    difficulty: "easy",
    solution: "Speed of approach before collision: $u_{\\text{app}} = 30 - (-20) = 50\\text{ m/s}$.\nSpeed of separation after collision: $v_{\\text{sep}} = 30 - (-20) = 50\\text{ m/s}$.\n$$e = \\frac{v_{\\text{sep}}}{u_{\\text{app}}} = \\frac{50}{50} = 1$$"
  },
  {
    q_num: 192,
    question_text: "Which of the following is not correct?",
    options: [
      "Force of friction is non-conservative",
      "If $R$ is the horizontal range of an oblique projectile, then the kinetic energy of the projectile is minimum after covering a horizontal distance of $R/2$ considering air resistance",
      "Viscous force is a non-conservative force",
      "Work done in stretching a spring successively by length $x$ from natural length are in the ratio $1 : 3$"
    ],
    correct_index: 1,
    topic: "Forces and Work-Energy Principles",
    difficulty: "medium",
    solution: "In the presence of air resistance, the projectile dissipates mechanical energy continuously throughout its trajectory. Consequently, the trajectory is asymmetric, the summit does not occur at $R/2$, and kinetic energy does not reach its minimum at $R/2$. Statement (2) is incorrect."
  },
  {
    q_num: 193,
    question_text: "One sphere collides with another sphere of double its mass. While heavier mass were at rest initially. The ratio of their respective speeds after collision will be (Coefficient of restitution = $e$)",
    options: ["$\\frac{2e}{1+e}$", "$\\frac{1-2e}{1+e}$", "$\\frac{1-e}{1+2e}$", "$\\frac{1+2e}{1-e}$"],
    correct_index: 1,
    topic: "Collisions with Unequal Masses",
    difficulty: "medium",
    solution: "Let incident sphere have mass $m_1 = m$, and target sphere have mass $m_2 = 2m$ ($u_2 = 0$):\n$$v_1 = \\frac{m_1 - e m_2}{m_1 + m_2} u_1 = \\frac{m - 2em}{3m} u_1 = \\frac{1 - 2e}{3} u_1$$\n$$v_2 = \\frac{m_1(1 + e)}{m_1 + m_2} u_1 = \\frac{m(1 + e)}{3m} u_1 = \\frac{1 + e}{3} u_1$$\nRatio of their speeds:\n$$\\frac{|v_1|}{v_2} = \\frac{1 - 2e}{1 + e}$$"
  },
  {
    q_num: 194,
    question_text: "The principle of conservation of energy implies that",
    options: [
      "The total mechanical energy is conserved",
      "The total kinetic energy is conserved",
      "The total potential energy is conserved",
      "Sum of all types of energies is conserved"
    ],
    correct_index: 3,
    topic: "Conservation of Energy",
    difficulty: "easy",
    solution: "The universal law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. Therefore, the sum total of all types of energies in an isolated system remains constant."
  },
  {
    q_num: 195,
    question_text: "A particle of mass $m_1$ makes an elastic, one dimensional collision with another stationary particle of mass $m_2$. Fraction of kinetic energy of $m_1$ carried away by $m_2$ is",
    options: [
      "$\\frac{m_1^2}{m_2^2}$",
      "$\\left(\\frac{m_2}{m_1}\\right)^{-1}$",
      "$\\frac{m_1 - m_2}{(m_1 + m_2)^2}$",
      "$\\frac{4 m_1 m_2}{(m_1 + m_2)^2}$"
    ],
    correct_index: 3,
    topic: "Fractional Energy Transfer in Elastic Collisions",
    difficulty: "medium",
    solution: "Speed of stationary mass $m_2$ after collision:\n$$v_2 = \\frac{2 m_1}{m_1 + m_2} u_1$$\nKinetic energy imparted to $m_2$:\n$$K_2 = \\frac{1}{2} m_2 v_2^2 = \\frac{1}{2} m_2 \\left(\\frac{2 m_1}{m_1 + m_2}\\right)^2 u_1^2 = \\frac{4 m_1 m_2}{(m_1 + m_2)^2} \\left(\\frac{1}{2} m_1 u_1^2\\right)$$\nFraction of kinetic energy transferred is $\\frac{4 m_1 m_2}{(m_1 + m_2)^2}$."
  },
  {
    q_num: 196,
    question_text: "The potential energy $U$ of a system is given by $U = A - B x^2$ (where $x$ is the position of its particle and $A, B$ are constants). The magnitude of force acting on the particle is",
    options: ["Constant", "Proportional to $x$", "Proportional to $x^2$", "Proportional to $(1/x)$"],
    correct_index: 1,
    topic: "Force and Potential Energy Relation",
    difficulty: "easy",
    solution: "Force is the negative spatial derivative of potential energy:\n$$F = -\\frac{dU}{dx} = -\\frac{d}{dx}(A - B x^2) = 2Bx$$\nTherefore, the magnitude of force $|F| = 2B|x| \\propto x$."
  },
  {
    q_num: 197,
    question_text: "If the force is conservative workdone from a to b along path '1' be represented as $W_{ab, 1}$ and work done from b to a along path '2' represented as $W_{ba, 2}$. Then the incorrect statement is",
    options: [
      "$W_{ab, 1} + W_{ba, 2} = 0$",
      "$W_{ab, 1} = W_{ba, 2}$",
      "$W_{ab, 1} = W_{ab, 2}$",
      "$W_{ab, 2} + W_{ba, 1} = 0$"
    ],
    correct_index: 1,
    image_url: getImageUrl(197),
    topic: "Path Independence of Conservative Forces",
    difficulty: "easy",
    solution: "For any conservative force, work done depends only on endpoints: $W_{ab} = -W_{ba}$. Around a closed loop $a \\to b \\to a$, total work is $W_{ab, 1} + W_{ba, 2} = 0$. Stating $W_{ab, 1} = W_{ba, 2}$ is false."
  },
  {
    q_num: 198,
    question_text: "A person-1 stands on an elevator moving with an initial velocity $v$ and upward acceleration $a$. Another person-2 of same mass $m$ as person-1 is standing on the same elevator. The net work done on the person-1 as observed by person-2 within time $t$ is",
    options: [
      "$m(g + a)\\left(v t + \\frac{1}{2}a t^2\\right)$",
      "$-mg\\left(v t + \\frac{1}{2}a t^2\\right)$",
      "Zero",
      "$m a\\left(v t + \\frac{1}{2}a t^2\\right)$"
    ],
    correct_index: 2,
    topic: "Work in Accelerated Frames",
    difficulty: "medium",
    solution: "In the non-inertial frame of reference of person-2 (standing inside the same elevator), person-1 is completely at rest throughout time $t$. Because the displacement of person-1 relative to person-2 is zero ($s = 0$), the net work done as observed by person-2 is zero."
  },
  {
    q_num: 199,
    question_text: "The kinetic energy of a body is increased by $21\\%$. The percentage increase in the magnitude of linear momentum of the body is",
    options: ["$10\\%$", "$20\\%$", "Zero", "$11.5\\%$"],
    correct_index: 0,
    topic: "Kinetic Energy and Momentum Percentage Changes",
    difficulty: "easy",
    solution: "Linear momentum is related to kinetic energy by $p = \\sqrt{2mK} \\propto \\sqrt{K}$.\nWhen kinetic energy increases by $21\\%$, $K' = 1.21 K$.\n$$p' = \\sqrt{1.21 K} = 1.1 \\sqrt{K} = 1.1 p$$\nPercentage increase in momentum:\n$$\\Delta p\\% = (1.1 - 1) \\times 100\\% = 10\\%$$"
  },
  {
    q_num: 200,
    question_text: "A particle is displaced from point $P(1, 1)\\text{ m}$ to $Q(4, 3)\\text{ m}$ by applying force $\vec{F} = (3\\hat{i} + 4\\hat{j})\\text{ N}$. The work done by $\vec{F}$ to move the particle from point to B is",
    options: ["$25\\text{ J}$", "$20\\text{ J}$", "$17\\text{ J}$", "$5\\sqrt{13}\\text{ J}$"],
    correct_index: 2,
    topic: "Work Done by Constant Force",
    difficulty: "easy",
    solution: "Displacement vector $\\Delta\\vec{r} = (4 - 1)\\hat{i} + (3 - 1)\\hat{j} = 3\\hat{i} + 2\\hat{j}$.\nWork done:\n$$W = \\vec{F} \\cdot \\Delta\\vec{r} = (3\\hat{i} + 4\\hat{j}) \\cdot (3\\hat{i} + 2\\hat{j}) = 3(3) + 4(2) = 9 + 8 = 17\\text{ J}$$"
  },
  {
    q_num: 201,
    question_text: "A rigid body of mass $m$ is moving in a circle of radius $r$ with a constant speed $v$. The force on the body is $\\frac{m v^2}{r}$ and is always directed towards the centre. The work done by this force in moving the body over half the circumference of circle is",
    options: ["$\\frac{m v^2}{r} \\pi$", "$m v^2 \\pi$", "Zero", "$2m v^2 \\pi$"],
    correct_index: 2,
    topic: "Work Done by Centripetal Force",
    difficulty: "easy",
    solution: "Centripetal force is always perpendicular to the instantaneous velocity and displacement ($\\vec{F}_c \\perp d\\vec{r}$). Therefore, the dot product $\\vec{F}_c \\cdot d\\vec{r} = 0$, and the work done over any path length (half circumference or complete circle) is zero."
  },
  {
    q_num: 202,
    question_text: "A body of mass $m$ at rest when released from a height $h$, hits the ground with speed $\\sqrt{gh}$. The work done by resistive forces is",
    options: ["$-\\frac{mgh}{2}$", "$\\frac{mgh}{2}$", "Zero", "$mgh$"],
    correct_index: 0,
    topic: "Work-Energy Theorem with Drag",
    difficulty: "easy",
    solution: "By the work-energy theorem:\n$$W_g + W_{\\text{res}} = \\Delta K = \\frac{1}{2} m v^2 - 0$$\n$$mgh + W_{\\text{res}} = \\frac{1}{2} m (\\sqrt{gh})^2 = \\frac{1}{2} mgh$$\n$$W_{\\text{res}} = \\frac{1}{2} mgh - mgh = -\\frac{mgh}{2}$$"
  },
  {
    q_num: 203,
    question_text: "If a body of mass $2\\text{ kg}$ is moved in conservative field from point A to B in three different path, then work done will be",
    options: [
      "$W_{\\text{I}} < W_{\\text{II}} < W_{\\text{III}}$",
      "$W_{\\text{I}} > W_{\\text{II}} > W_{\\text{III}}$",
      "$W_{\\text{I}} = W_{\\text{II}} = W_{\\text{III}}$",
      "$W_{\\text{I}} > W_{\\text{II}} = W_{\\text{III}}$"
    ],
    correct_index: 2,
    image_url: getImageUrl(203),
    topic: "Path Independence of Conservative Fields",
    difficulty: "easy",
    solution: "By fundamental property of conservative force fields, the work done in moving a particle between two points depends only on initial and final positions and is completely independent of the path followed. Hence, $W_{\\text{I}} = W_{\\text{II}} = W_{\\text{III}}$."
  },
  {
    q_num: 204,
    question_text: "Two pendulum bobs A and B of mass $m$ and $2m$ respectively are simultaneously released from a height $H$ above the lowest point, making an elastic collision at the lowest point. If after the first collision A and B rise to heights $h_1$ and $h_2$ respectively, then $h_1 + 2h_2$ is",
    options: ["$3H$", "$H$", "$\\frac{H}{3}$", "$\\frac{2H}{3}$"],
    correct_index: 0,
    topic: "Collisions & Pendulum Dynamics",
    difficulty: "hard",
    solution: "Total mechanical energy is conserved in the elastic collision.\nBefore collision, total mechanical energy released from height $H$ is:\n$$E_i = mgH + (2m)gH = 3mgH$$\nAfter the elastic collision, both bobs swing up to maximum heights $h_1$ and $h_2$, converting all their post-collision kinetic energy back into gravitational potential energy:\n$$E_f = mg h_1 + (2m)g h_2 = mg(h_1 + 2h_2)$$\nSince mechanical energy is conserved ($E_i = E_f$):\n$$3mgH = mg(h_1 + 2h_2) \\implies h_1 + 2h_2 = 3H$$"
  }
];

async function seedBatch2() {
  const client = await pool.connect();
  try {
    console.log('Connected to PostgreSQL database for Batch 2...');

    const chapterName = 'Work, Power and Energy';
    const chapterId = 26;

    let inserted = 0;
    for (const q of BATCH2_QUESTIONS) {
      // Check if question already exists by matching exact question_text
      const checkRes = await client.query(
        'SELECT id FROM question_bank WHERE question_text = $1',
        [q.question_text]
      );

      if (checkRes.rows.length > 0) {
        // Update existing question to ensure latest diagram and solution
        const updateSql = `
          UPDATE question_bank SET
            options = $1, correct_index = $2, correct_indices = $3,
            marks = $4, difficulty = $5, solution = $6,
            image_url = $7, subject = $8, topic = $9, chapter = $10,
            subject_id = $11, chapter_id = $12
          WHERE id = $13
        `;
        await client.query(updateSql, [
          JSON.stringify(q.options),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          4,
          q.difficulty || 'medium',
          q.solution || '',
          q.image_url || '',
          'Physics',
          q.topic || chapterName,
          chapterName,
          11,
          chapterId,
          checkRes.rows[0].id
        ]);
        console.log(`[Batch 2] Updated existing question #${q.q_num} (DB ID: ${checkRes.rows[0].id})`);
        inserted++;
      } else {
        const insertSql = `
          INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index,
            correct_indices, marks, subject_id, chapter_id, difficulty,
            solution, image_url, subject, topic, chapter
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15
          ) RETURNING id
        `;
        const values = [
          'Physics',
          'single_choice',
          q.question_text,
          JSON.stringify(q.options),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          4,
          11,
          chapterId,
          q.difficulty || 'medium',
          q.solution || '',
          q.image_url || '',
          'Physics',
          q.topic || chapterName,
          chapterName
        ];
        const res = await client.query(insertSql, values);
        inserted++;
        console.log(`[Batch 2] [${inserted}/${BATCH2_QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
      }
    }

    console.log(`\n Successfully processed ${inserted} questions in Batch 2 into Question Bank for "${chapterName}".`);
  } catch (err) {
    console.error('Batch 2 seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

seedBatch2();
