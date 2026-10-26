import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load diagram mappings for Batch 3
let diagrams = {};
try {
  const mapPath = path.resolve(__dirname, 'work_energy_power_batch3_diagrams.json');
  if (fs.existsSync(mapPath)) {
    diagrams = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  }
} catch (err) {
  console.warn('Failed to load batch 3 diagrams map:', err.message);
}

const getImageUrl = (qNum) => {
  if (diagrams[qNum]) {
    return diagrams[qNum].cloudinary_url || diagrams[qNum].local_url;
  }
  return '';
};

const AR_OPTIONS = [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "If Assertion is true statement but Reason is false",
  "If both Assertion and Reason are false statements"
];

export const BATCH3_QUESTIONS = [
  // Page 1 (Book pages 107-108)
  {
    q_num: 272,
    question_text: "A ball is allowed to fall from a height of $10\\text{ m}$. If there is $40\\%$ loss of energy due to impact, then after one impact ball will go up by",
    options: ["$10\\text{ m}$", "$8\\text{ m}$", "$4\\text{ m}$", "$6\\text{ m}$"],
    correct_index: 3,
    topic: "Energy Loss in Collisions",
    difficulty: "easy",
    solution: "Initial potential energy is $E_i = mgh = mg(10)$.\nLoss of energy is $40\\%$, so remaining energy after impact is $60\\%$ of $E_i$:\n$$E_f = 0.60 \\times mg(10) = mg(6)$$\nSince $E_f = mgh'$, the rebound height is $h' = 6\\text{ m}$."
  },
  {
    q_num: 273,
    question_text: "Two balls of equal mass undergo head-on collision while each was moving with speed of $8\\text{ m/s}$. If the coefficient of restitution is $\\frac{1}{2}$, the speed of each ball after the impact will be",
    options: ["$4\\text{ m/s}$", "$2\\text{ m/s}$", "$16\\text{ m/s}$", "$8\\text{ m/s}$"],
    correct_index: 0,
    topic: "Head-on Collision of Equal Masses",
    difficulty: "medium",
    solution: "For two equal masses moving towards each other with equal speed $u = 8\\text{ m/s}$:\nBy symmetry and conservation of linear momentum, their speeds after collision remain equal in magnitude: $v_1 = -v_2 = v$.\nBy definition of coefficient of restitution:\n$$e = \\frac{v_2 - v_1}{u_1 - u_2} = \\frac{2v}{2u} = \\frac{v}{u}$$\n$$v = e \\times u = \\frac{1}{2} \\times 8\\text{ m/s} = 4\\text{ m/s}$$"
  },
  {
    q_num: 274,
    question_text: "A particle of mass $m$ is moving with velocity $\\vec{v} = (4\\hat{i} - 6\\hat{j})\\text{ m/s}$ and collides on a horizontal smooth surface as shown. If coefficient of restitution is $e = \\frac{1}{2}$, then velocity of the particle after collision is",
    options: [
      "$\\vec{v} = (4\\hat{i} - 3\\hat{j})\\text{ m/s}$",
      "$\\vec{v} = (4\\hat{i} + 3\\hat{j})\\text{ m/s}$",
      "$\\vec{v} = (2\\hat{i} - 3\\hat{j})\\text{ m/s}$",
      "$\\vec{v} = -(2\\hat{i} + 3\\hat{j})\\text{ m/s}$"
    ],
    correct_index: 1,
    image_url: getImageUrl(274),
    topic: "Oblique Collision with Smooth Surface",
    difficulty: "medium",
    solution: "Since the horizontal surface is smooth, there is no impulse parallel to the surface ($x$-axis):\n$$v_x' = v_x = 4\\hat{i}$$\nPerpendicular to the surface ($y$-axis), the impulse reverses the vertical component with coefficient of restitution $e = 1/2$:\n$$v_y' = -e v_y = -\\left(\\frac{1}{2}\\right)(-6\\hat{j}) = +3\\hat{j}$$\nTherefore, the velocity of the particle after collision is:\n$$\\vec{v}' = (4\\hat{i} + 3\\hat{j})\\text{ m/s}$$"
  },
  {
    q_num: 275,
    question_text: "The correct statement regarding internal force is that it",
    options: [
      "Cannot change linear momentum of a body",
      "Cannot change kinetic energy of an isolated system",
      "Can change net linear momentum of an isolated system",
      "Can change kinetic energy of an isolated system"
    ],
    correct_index: 3,
    topic: "Internal Forces and Energy",
    difficulty: "easy",
    solution: "Internal forces always occur in equal and opposite action-reaction pairs that cancel out in vector sum, so they cannot change the net linear momentum of an isolated system ($\\Delta \\vec{P}_{sys} = 0$).\nHowever, internal forces can perform non-zero net work (for example, in an explosion or inelastic collision), which changes the kinetic energy of the isolated system."
  },
  {
    q_num: 276,
    question_text: "A sphere moving with speed $u$ collides elastically with another identical sphere at rest. If the collision is not head-on, then angle between their final velocities is",
    options: ["$0^\\circ$", "$60^\\circ$", "$90^\\circ$", "$45^\\circ$"],
    correct_index: 2,
    topic: "Oblique Elastic Collision of Identical Masses",
    difficulty: "easy",
    solution: "For an elastic collision between two particles of equal mass where the target is initially at rest:\nConservation of momentum: $\\vec{u} = \\vec{v}_1 + \\vec{v}_2 \\implies u^2 = v_1^2 + v_2^2 + 2 \\vec{v}_1 \\cdot \\vec{v}_2$\nConservation of kinetic energy: $\\frac{1}{2}m u^2 = \\frac{1}{2}m v_1^2 + \\frac{1}{2}m v_2^2 \\implies u^2 = v_1^2 + v_2^2$\nEquating gives $2 \\vec{v}_1 \\cdot \\vec{v}_2 = 0 \\implies \\theta = 90^\\circ$."
  },
  {
    q_num: 277,
    question_text: "In a conservative field work is done on a body by the field, then",
    options: [
      "Kinetic energy of the body definitely increases",
      "Kinetic energy of the body decreases",
      "Potential energy of the body increases",
      "Potential energy of the body decreases"
    ],
    correct_index: 3,
    topic: "Conservative Fields and Potential Energy",
    difficulty: "easy",
    solution: "By definition of potential energy in a conservative field:\n$$W_{field} = -\\Delta U$$\nIf positive work is done by the conservative field ($W_{field} > 0$), then $\\Delta U < 0$, which means the potential energy of the body decreases."
  },
  {
    q_num: 278,
    question_text: "Force $\\vec{F} = (2\\hat{i} - 4\\hat{j} - 5\\hat{k})\\text{ N}$ moves a body by displacement $\\vec{S} = (2\\hat{i} + p\\hat{j} - 4\\hat{k})\\text{ m}$. If the work done by the force is zero, then $p$ is equal to",
    options: ["4", "3", "2", "6"],
    correct_index: 3,
    topic: "Work Done as Scalar Product",
    difficulty: "easy",
    solution: "Work done is the scalar product of force and displacement vectors:\n$$W = \\vec{F} \\cdot \\vec{S} = (2)(2) + (-4)(p) + (-5)(-4) = 4 - 4p + 20 = 24 - 4p$$\nGiven $W = 0$:\n$$24 - 4p = 0 \\implies 4p = 24 \\implies p = 6$$"
  },
  {
    q_num: 279,
    question_text: "Kinetic energy of any moving particle is",
    options: ["Scalar, positive", "Scalar, may be negative", "May be vector, positive", "Vector, negative"],
    correct_index: 0,
    topic: "Kinetic Energy Fundamentals",
    difficulty: "easy",
    solution: "Kinetic energy is defined as $K = \\frac{1}{2}m v^2$. Since mass $m > 0$ and $v^2 \\ge 0$, and energy is a scalar quantity, kinetic energy of any moving particle is always a positive scalar."
  },
  {
    q_num: 280,
    question_text: "Work is done by an agent applying force when",
    options: [
      "Applied force is variable",
      "Applied force is perpendicular to motion",
      "Applied force generate motion",
      "Applied force is constant"
    ],
    correct_index: 2,
    topic: "Definition of Work Done",
    difficulty: "easy",
    solution: "Work is done when a force causes a displacement along the direction of the force ($W = \\int \\vec{F} \\cdot d\\vec{s} \\neq 0$). Thus, work is done by the agent when the applied force generates motion (displacement) of the point of application."
  },
  {
    q_num: 281,
    question_text: "A body is moved along a straight line by a machine delivering power proportional to time. Distance moved by the body in time $t$ is proportional to",
    options: ["$t^{3/2}$", "$t^2$", "$t$", "$t^{3/4}$"],
    correct_index: 1,
    topic: "Power and Kinematics",
    difficulty: "medium",
    solution: "Power $P = F v = m v \\frac{dv}{dt}$.\nGiven $P \\propto t$:\n$$m v \\frac{dv}{dt} = c t \\implies v dv = \\frac{c}{m} t dt$$\nIntegrating both sides:\n$$\\frac{v^2}{2} = \\frac{c}{2m} t^2 \\implies v \\propto t$$\nSince velocity $v = \\frac{ds}{dt} \\propto t$:\n$$s = \\int v dt \\propto \\int t dt \\propto t^2$$"
  },
  {
    q_num: 282,
    question_text: "A particle of mass $m$ moves in a circle of radius $R$ with a constant speed $v$. Work done by centripetal force, when it completes half revolution is",
    options: ["Zero", "$\\frac{\\pi m v^2}{2r}$", "$\\pi m v^2$", "$4 m v^2$"],
    correct_index: 0,
    topic: "Work Done by Centripetal Force",
    difficulty: "easy",
    solution: "Centripetal force is always directed radially towards the center of the circle, perpendicular to the instantaneous velocity (tangential displacement) at every point ($d\\vec{s} \\perp \\vec{F}_c$).\n$$dW = \\vec{F}_c \\cdot d\\vec{s} = F_c ds \\cos 90^\\circ = 0$$\nTherefore, the work done by centripetal force over any path (including half revolution) is always zero."
  },
  {
    q_num: 283,
    question_text: "A ball is let to fall from a height of $32\\text{ m}$ on the ground. Coefficient of restitution is $e = \\frac{1}{2}$. Height raised by the ball after second rebound is",
    options: ["$2\\text{ m}$", "$4\\text{ m}$", "$8\\text{ m}$", "$16\\text{ m}$"],
    correct_index: 0,
    topic: "Successive Rebounds",
    difficulty: "easy",
    solution: "The height attained after $n$ rebounds from initial height $h_0$ is:\n$$h_n = e^{2n} h_0$$\nFor the second rebound ($n = 2$) with $e = \\frac{1}{2}$ and $h_0 = 32\\text{ m}$:\n$$h_2 = \\left(\\frac{1}{2}\\right)^{2(2)} \\times 32 = \\left(\\frac{1}{2}\\right)^4 \\times 32 = \\frac{1}{16} \\times 32 = 2\\text{ m}$$"
  },
  {
    q_num: 284,
    question_text: "A bob of a simple pendulum is released from position A. Velocity of the bob when it is at lowest position A' is",
    options: ["$\\sqrt{50}\\text{ m/s}$", "$10\\text{ m/s}$", "$5\\text{ m/s}$", "$2\\sqrt{5}\\text{ m/s}$"],
    correct_index: 0,
    image_url: getImageUrl(284),
    topic: "Simple Pendulum & Energy Conservation",
    difficulty: "easy",
    solution: "The vertical drop from position A (at $\\theta = 60^\\circ$, length $l = 5\\text{ m}$) to lowest point A' is:\n$$h = l(1 - \\cos 60^\\circ) = 5\\left(1 - \\frac{1}{2}\\right) = 2.5\\text{ m}$$\nBy conservation of mechanical energy:\n$$v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 2.5} = \\sqrt{50}\\text{ m/s}$$"
  },
  {
    q_num: 285,
    question_text: "Which of the following is correct in an elastic collision?",
    options: [
      "Momentum and kinetic energy and total energy are conserved",
      "Momentum and total energy are conserved",
      "Kinetic energy is conserved",
      "Momentum and kinetic energy are conserved but not the total energy"
    ],
    correct_index: 0,
    topic: "Elastic Collisions",
    difficulty: "easy",
    solution: "In an ideal elastic collision, the kinetic energy before collision equals the kinetic energy after collision, linear momentum is conserved, and the total energy of the isolated system is conserved."
  },
  {
    q_num: 286,
    question_text: "The graph between kinetic energy and momentum of a body of given mass is a",
    options: ["Parabola", "Straight line", "Circle", "Hyperbola"],
    correct_index: 0,
    topic: "Kinetic Energy and Momentum Graphs",
    difficulty: "easy",
    solution: "The relation between kinetic energy $K$ and momentum $p$ for a body of mass $m$ is:\n$$K = \\frac{p^2}{2m}$$\nThis is of the form $y = c x^2$, which represents a parabola."
  },
  {
    q_num: 287,
    question_text: "A system is consisting of masses $10\\text{ kg}$ and $5\\text{ kg}$, which are at speed $1\\text{ m/s}$ and $2\\text{ m/s}$ respectively. The total kinetic energy of system is",
    options: ["$10\\text{ J}$", "$15\\text{ J}$", "$25\\text{ J}$", "$5\\text{ J}$"],
    correct_index: 1,
    topic: "Total Kinetic Energy of System",
    difficulty: "easy",
    solution: "Total kinetic energy is the scalar sum of the individual kinetic energies:\n$$K = \\frac{1}{2} m_1 v_1^2 + \\frac{1}{2} m_2 v_2^2 = \\frac{1}{2}(10)(1)^2 + \\frac{1}{2}(5)(2)^2 = 5 + 10 = 15\\text{ J}$$"
  },
  {
    q_num: 288,
    question_text: "Work energy theorem is mathematically written as $W = \\frac{1}{2}m(v^2 - u^2)$. Here the work $W$ is by",
    options: [
      "Conservative forces only",
      "Non-conservative forces only",
      "Internal forces only",
      "All forces"
    ],
    correct_index: 3,
    topic: "Work-Energy Theorem Scope",
    difficulty: "easy",
    solution: "According to the universal work-energy theorem, the total work done by ALL forces (conservative, non-conservative, internal, and external) acting on a body equals the change in its kinetic energy:\n$$W_{total} = W_c + W_{nc} + W_{ext} = \\Delta K = \\frac{1}{2}m(v^2 - u^2)$$"
  },
  {
    q_num: 289,
    question_text: "The correct representation of power is (Symbols have their usual meaning)",
    options: [
      "$P = \\vec{F} \\cdot \\vec{v}$",
      "$P = |\\vec{F} \\times \\vec{v}|$",
      "$P = \\frac{|\\vec{F}|}{|\\vec{v}|}$",
      "$P = |\\vec{F}| \\cdot |\\vec{v}|$"
    ],
    correct_index: 0,
    topic: "Definition of Power",
    difficulty: "easy",
    solution: "Instantaneous power is defined as the scalar (dot) product of force $\\vec{F}$ and velocity $\\vec{v}$:\n$$P = \\frac{dW}{dt} = \\frac{\\vec{F} \\cdot d\\vec{r}}{dt} = \\vec{F} \\cdot \\vec{v}$$"
  },
  {
    q_num: 290,
    question_text: "A particle A of mass $m$ moving with speed $u$ collide elastically head-on with another identical particle B at rest. Velocity of B after collision is",
    options: ["$u$", "$\\frac{u}{2}$", "$2u$", "$\\frac{u}{4}$"],
    correct_index: 0,
    topic: "Elastic Collision Velocity Exchange",
    difficulty: "easy",
    solution: "In a head-on elastic collision between two bodies of equal mass, they completely exchange their velocities.\nSince particle A had initial velocity $u$ and B was at rest, after collision particle A comes to rest and particle B moves with velocity $u$."
  },
  {
    q_num: 291,
    question_text: "An engine exerts a force $\\vec{F} = (10\\hat{i} - 3\\hat{j} + 5\\hat{k})\\text{ N}$ and moves with velocity $\\vec{v} = (6\\hat{i} + 20\\hat{j} - 3\\hat{k})\\text{ m/s}$. The power of engine is",
    options: ["$15\\text{ watt}$", "$30\\text{ watt}$", "$60\\text{ watt}$", "$20\\text{ watt}$"],
    correct_index: 0,
    topic: "Calculation of Instantaneous Power",
    difficulty: "easy",
    solution: "Power is the dot product of force and velocity:\n$$P = \\vec{F} \\cdot \\vec{v} = (10)(6) + (-3)(20) + (5)(-3) = 60 - 60 - 15 = -15\\text{ W}$$\nThe magnitude of power is $15\\text{ watt}$."
  },

  // Page 2 (Book pages 109-110)
  {
    q_num: 297,
    question_text: "A ball rebound from floor as shown in figure. Coefficient of restitution is",
    options: ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$1$", "$\\frac{1}{8}$"],
    correct_index: 1,
    image_url: getImageUrl(297),
    topic: "Coefficient of Restitution from Velocity Components",
    difficulty: "medium",
    solution: "The coefficient of restitution $e$ is defined along the line of impact (normal to the floor):\n$$e = \\frac{\\text{velocity of separation along normal}}{\\text{velocity of approach along normal}}$$\nFrom the diagram, the normal (vertical) component of velocity before impact is $u_y = 2\\text{ m/s}$, and after impact is $v_y = 1\\text{ m/s}$:\n$$e = \\frac{1}{2}$$"
  },
  {
    q_num: 298,
    question_text: "Which of the following statements is correct about elastic collision between two objects?",
    options: [
      "Their individual KE are conserved",
      "Kinetic energy of the system is always conserved",
      "Kinetic energy and momentum both are always conserved",
      "Kinetic energy of the system before collision is equal to kinetic energy of the system after collision"
    ],
    correct_index: 3,
    topic: "Elastic Collision Principles",
    difficulty: "medium",
    solution: "During the collision itself (while the bodies are deformed), some kinetic energy is temporarily converted into elastic potential energy, so KE is not conserved at every instant of deformation. However, once the collision is complete, the total kinetic energy of the system before collision equals that after collision."
  },
  {
    q_num: 299,
    question_text: "Select incorrect statement about potential energy",
    options: [
      "Change in potential energy is equal to work done against internal conservative force",
      "Change in potential energy is independent of reference point",
      "Change in potential energy depends on reference frame",
      "Potential energy at a point is not unique"
    ],
    correct_index: 2,
    topic: "Properties of Potential Energy",
    difficulty: "medium",
    solution: "Change in potential energy $\\Delta U = -W_{c}$ depends only on the relative separation/configuration of the interacting bodies, which is invariant under any frame of reference. Therefore, stating that change in potential energy depends on reference frame is incorrect."
  },
  {
    q_num: 300,
    question_text: "The net work done by static friction on the two bodies in contact is always",
    options: ["Positive", "Negative", "Zero", "Any of these, depending on situation"],
    correct_index: 2,
    topic: "Work Done by Static Friction",
    difficulty: "easy",
    solution: "Static friction prevents relative slipping between surfaces in contact, meaning both surfaces move through the exact same displacement at the contact interface ($d\\vec{s}_1 = d\\vec{s}_2 = d\\vec{s}$). Since the friction forces are equal and opposite ($\\vec{f}_1 = -\\vec{f}_2$):\n$$W_{net} = \\vec{f}_1 \\cdot d\\vec{s} + \\vec{f}_2 \\cdot d\\vec{s} = (\\vec{f} - \\vec{f}) \\cdot d\\vec{s} = 0$$"
  },
  {
    q_num: 301,
    question_text: "A ball is dropped from certain height. It goes upto a height $8\\text{ m}$ after first collision from a surface and $4\\text{ m}$ after second collision. Coefficient of restitution is",
    options: ["$\\frac{1}{\\sqrt{2}}$", "$\\frac{1}{2}$", "$\\frac{1}{4}$", "$\\frac{1}{2\\sqrt{2}}$"],
    correct_index: 0,
    topic: "Rebound Heights and Restitution",
    difficulty: "easy",
    solution: "The ratio of consecutive rebound heights is:\n$$\\frac{h_2}{h_1} = e^2 \\implies e^2 = \\frac{4}{8} = \\frac{1}{2} \\implies e = \\frac{1}{\\sqrt{2}}$$"
  },
  {
    q_num: 302,
    question_text: "A block of mass $m$ is moving with speed $v$ towards a spring block system. If collision is perfectly inelastic, then maximum compression in the spring will be",
    options: ["$v\\sqrt{\\frac{m}{k}}$", "$v\\sqrt{\\frac{2m}{k}}$", "$m\\sqrt{\\frac{v}{2k}}$", "$v\\sqrt{\\frac{m}{2k}}$"],
    correct_index: 3,
    image_url: getImageUrl(302),
    topic: "Inelastic Collision with Spring-Mass System",
    difficulty: "medium",
    solution: "During the perfectly inelastic collision between the two identical blocks of mass $m$, by conservation of momentum:\n$$m v = (m + m) v' = 2m v' \\implies v' = \\frac{v}{2}$$\nThe combined mass $2m$ now compresses the spring until all its kinetic energy is converted into elastic potential energy:\n$$\\frac{1}{2}(2m)(v')^2 = \\frac{1}{2} k x_{max}^2$$\n$$(2m)\\left(\\frac{v}{2}\\right)^2 = k x_{max}^2 \\implies \\frac{m v^2}{2} = k x_{max}^2 \\implies x_{max} = v\\sqrt{\\frac{m}{2k}}$$"
  },
  {
    q_num: 303,
    question_text: "Water in a tank is frozen completely. The height and mass of frozen water is $10\\text{ cm}$ and $1\\text{ kg}$ respectively. When the entire ice melts, the work done by gravity is (Take specific gravity of ice $= 0.9$)",
    options: ["$0.1\\text{ J}$", "$0.05\\text{ J}$", "$-0.1\\text{ J}$", "$-0.05\\text{ J}$"],
    correct_index: 1,
    topic: "Center of Mass Displacement & Work Done by Gravity",
    difficulty: "medium",
    solution: "Initial height of ice is $h_i = 10\\text{ cm} = 0.1\\text{ m}$. Initial center of mass is at $y_i = \\frac{h_i}{2} = 5\\text{ cm} = 0.05\\text{ m}$.\nSince mass is conserved, $m = \\rho_i A h_i = \\rho_w A h_w \\implies h_w = \\frac{\\rho_i}{\\rho_w} h_i = 0.9 \\times 10\\text{ cm} = 9\\text{ cm}$.\nFinal center of mass of melted water is $y_f = \\frac{h_w}{2} = 4.5\\text{ cm} = 0.045\\text{ m}$.\nThe downward shift of center of mass is:\n$$\\Delta y = y_i - y_f = 5\\text{ cm} - 4.5\\text{ cm} = 0.5\\text{ cm} = 5 \\times 10^{-3}\\text{ m}$$\nWork done by gravity:\n$$W_g = +mg\\Delta y = (1\\text{ kg})(10\\text{ m/s}^2)(5 \\times 10^{-3}\\text{ m}) = 0.05\\text{ J}$$"
  },
  {
    q_num: 304,
    question_text: "A particle of mass $m$ moving with velocity $v$ collides elastically with a wall. Variation of force $F$ acting on the particle during collision as a function of time $t$ is shown in figure. Magnitude of $F_0$ is",
    options: ["$\\frac{2mv}{t_0}$", "$\\frac{mv}{t_0}$", "$\\frac{4mv}{t_0}$", "$\\frac{mv}{4t_0}$"],
    correct_index: 2,
    image_url: getImageUrl(304),
    topic: "Impulse-Momentum Theorem",
    difficulty: "medium",
    solution: "In an elastic rebound from a fixed wall, the velocity reverses: $v_f = -v$.\nChange in momentum (impulse) is:\n$$J = |\\Delta p| = m(v - (-v)) = 2mv$$\nThe impulse is also given by the area under the $F-t$ graph (a triangle with base $t_0$ and height $F_0$):\n$$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} t_0 F_0$$\nEquating impulse:\n$$\\frac{1}{2} t_0 F_0 = 2mv \\implies F_0 = \\frac{4mv}{t_0}$$"
  },
  {
    q_num: 305,
    question_text: "Figure shows potential energy function $U$ of a system in which a particle is in one-dimensional motion. In which region the magnitude of the force on the particle is greatest? ($x$ : position)",
    options: ["OA", "CD", "AB", "BC"],
    correct_index: 3,
    image_url: getImageUrl(305),
    topic: "Force and Potential Energy Gradient",
    difficulty: "easy",
    solution: "The force in one-dimensional conservative field is related to potential energy gradient by:\n$$F = -\\frac{dU}{dx} \\implies |F| = \\left|\\frac{dU}{dx}\\right|$$\nThe magnitude of force is directly proportional to the steepness (slope) of the $U-x$ graph. Region BC has the steepest slope compared to OA, and regions AB and CD have zero slope (flat). Thus, force magnitude is greatest in region BC."
  },
  {
    q_num: 306,
    question_text: "The force required to move a boat at constant speed is proportional to its speed. If a speed of $4\\text{ km/h}$ requires $7.5\\text{ kW}$, then a speed of $12\\text{ km/h}$ requires",
    options: ["$22.5\\text{ kW}$", "$82\\text{ kW}$", "$25\\text{ kW}$", "$67.5\\text{ kW}$"],
    correct_index: 3,
    topic: "Power Dependence on Speed",
    difficulty: "easy",
    solution: "Given force $F \\propto v$, power required at constant speed is:\n$$P = F \\cdot v \\propto v \\cdot v = v^2$$\nTherefore:\n$$\\frac{P_2}{P_1} = \\left(\\frac{v_2}{v_1}\\right)^2 = \\left(\\frac{12}{4}\\right)^2 = 3^2 = 9$$\n$$P_2 = 9 \\times 7.5\\text{ kW} = 67.5\\text{ kW}$$"
  },
  {
    q_num: 307,
    question_text: "A body of mass $m$ moving with speed $v$ compresses a spring of force constant $k$ as shown in figure. Maximum compression of the spring is equal to",
    options: ["$v\\sqrt{\\frac{m}{k}}$", "$2v\\sqrt{\\frac{m}{k}}$", "$v\\sqrt{\\frac{2m}{k}}$", "$v\\sqrt{\\frac{m}{2k}}$"],
    correct_index: 0,
    image_url: getImageUrl(307),
    topic: "Spring-Mass Maximum Compression",
    difficulty: "easy",
    solution: "On a frictionless horizontal plane, mechanical energy is conserved:\n$$\\frac{1}{2} k x_{max}^2 = \\frac{1}{2} m v^2 \\implies x_{max}^2 = \\frac{m v^2}{k} \\implies x_{max} = v\\sqrt{\\frac{m}{k}}$$"
  },
  {
    q_num: 308,
    question_text: "Mark the correct option",
    options: [
      "When a conservative force does positive work on a body, the kinetic energy of body decreases",
      "Work done by body against friction always results in loss of its kinetic energy",
      "Work done in the motion of a body over a closed loop is zero for every force in nature",
      "All of these"
    ],
    correct_index: 1,
    topic: "Work and Energy Principles",
    difficulty: "medium",
    solution: "Frictional force is non-conservative and opposes relative motion, so the work done by a body against friction dissipates mechanical energy into heat, resulting in a loss of kinetic energy."
  },
  {
    q_num: 309,
    question_text: "Four situations are shown in following options. In each situation planes are equally rough and block begins with same speed and slides until the kinetic frictional force has stopped it. In which of the following cases increase in thermal energy due to sliding is least?",
    options: [
      "Horizontal surface",
      "Plane inclined at $30^\\circ$ with block sliding upwards",
      "Plane inclined at $45^\\circ$ with block sliding upwards",
      "Plane inclined at $30^\\circ$ with block sliding downwards"
    ],
    correct_index: 2,
    image_url: getImageUrl(309),
    topic: "Thermal Energy Dissipated by Friction",
    difficulty: "medium",
    solution: "When a block slides up an inclined plane, both gravity and friction oppose the motion: $a = g(\\sin\\theta + \\mu\\cos\\theta)$.\nThe stopping distance is $s = \\frac{u^2}{2g(\\sin\\theta + \\mu\\cos\\theta)}$.\nThe increase in thermal energy is the work done against friction: $Q = f_k \\cdot s = (\\mu mg\\cos\\theta) \\cdot s = \\frac{\\mu mg\\cos\\theta \\cdot u^2}{2g(\\sin\\theta + \\mu\\cos\\theta)} = \\frac{\\mu m u^2}{2(\\tan\\theta + \\mu)}$.\nAs the inclination angle $\\theta$ increases, $\\tan\\theta$ increases, which minimizes thermal energy dissipation $Q$. Among the given options, $\\theta = 45^\\circ$ produces the largest $\\tan\\theta$, so increase in thermal energy is least for the $45^\\circ$ incline sliding upwards."
  },

  // Page 3 (Book pages 111-112)
  {
    q_num: 315,
    question_text: "A fruit of mass $m$ dropped from height $h$ of a tree. If it hits the ground with a speed of $v\\text{ m/s}$, then workdone by resistive force is",
    options: ["$-mgh$", "$-\\frac{1}{2}mv^2$", "$mv^2 + 2mgh$", "$-\\frac{m}{2}(2gh - v^2)$"],
    correct_index: 3,
    image_url: getImageUrl(315),
    topic: "Work-Energy Theorem with Air Resistance",
    difficulty: "easy",
    solution: "By the work-energy theorem:\n$$W_{total} = W_g + W_{res} = \\Delta K$$\n$$mgh + W_{res} = \\frac{1}{2}mv^2 - 0$$\n$$W_{res} = \\frac{1}{2}mv^2 - mgh = -\\frac{m}{2}(2gh - v^2)$$"
  },
  {
    q_num: 316,
    question_text: "Correct statement is",
    options: [
      "If net force on system is zero, then net workdone by different forces acting on the system must be zero",
      "The change in kinetic energy of a system is equal to the sum of the works done on the system by the external forces",
      "Work energy theorem holds in all inertial and non-inertial frames",
      "Both (1) & (2)"
    ],
    correct_index: 2,
    topic: "Scope of Work-Energy Theorem",
    difficulty: "medium",
    solution: "The work-energy theorem is universally valid in all inertial frames as well as non-inertial frames (provided pseudo-forces and their work are included)."
  },
  {
    q_num: 317,
    question_text: "A ball is released from the top of a tower. The ratio of work done by force of gravity in first, second and third second of the motion of the ball is",
    options: ["$1 : 2 : 3$", "$1^2 : 2^2 : 3^2$", "$1 : 3 : 5$", "$1 : 5 : 3$"],
    correct_index: 2,
    topic: "Galileo's Law of Odd Numbers & Work",
    difficulty: "easy",
    solution: "Work done by gravity during the $n$-th second is proportional to displacement in the $n$-th second:\n$$W_n = mg s_n$$\nFor a body dropped from rest, distances covered in consecutive seconds follow Galileo's ratio of odd numbers:\n$$s_1 : s_2 : s_3 = 1 : 3 : 5$$\nHence, the ratio of work done by gravity is $1 : 3 : 5$."
  },
  {
    q_num: 318,
    question_text: "If $v$, $P$ and $E$ denote the velocity, momentum and kinetic energy of the particle, then",
    options: ["$P = \\frac{dE}{dv}$", "$P = \\frac{dE}{dt}$", "$P = \\frac{dv}{dt}$", "$P = \\int E dv$"],
    correct_index: 0,
    topic: "Relationship between Momentum and Kinetic Energy",
    difficulty: "easy",
    solution: "Kinetic energy is $E = \\frac{1}{2}m v^2$.\nDifferentiating with respect to velocity $v$:\n$$\\frac{dE}{dv} = \\frac{d}{dv}\\left(\\frac{1}{2}m v^2\\right) = m v = P$$"
  },
  {
    q_num: 319,
    question_text: "A body moving at $2\\text{ m/s}$ can be stopped over a distance $d$. If its kinetic energy is doubled and the retarding force remains unchanged, then how long will it go before coming to rest?",
    options: ["$d$", "$2d$", "$4d$", "$8d$"],
    correct_index: 1,
    topic: "Stopping Distance and Kinetic Energy",
    difficulty: "easy",
    solution: "By the work-energy theorem, work done by retarding force $F$ equals initial kinetic energy:\n$$F \\cdot s = K \\implies s = \\frac{K}{F}$$\nIf kinetic energy is doubled ($K' = 2K$) while retarding force $F$ is unchanged:\n$$s' = \\frac{2K}{F} = 2d$$"
  },
  {
    q_num: 320,
    question_text: "A particle of mass $1\\text{ kg}$ moving with $30\\text{ m/s}$ collides head-on with another body of mass $2\\text{ kg}$ at rest. If the collision is perfectly inelastic, then their velocities after collision is",
    options: ["$30\\text{ m/s}$", "$15\\text{ m/s}$", "$20\\text{ m/s}$", "$10\\text{ m/s}$"],
    correct_index: 3,
    topic: "Perfectly Inelastic Collision",
    difficulty: "easy",
    solution: "In a perfectly inelastic collision, the two bodies stick together and move with a common velocity $V$:\n$$m_1 u_1 + m_2 u_2 = (m_1 + m_2)V$$\n$$(1)(30) + (2)(0) = (1 + 2)V \\implies 30 = 3V \\implies V = 10\\text{ m/s}$$"
  },
  {
    q_num: 321,
    question_text: "A car of mass $m$ is driven with acceleration $a$ along a straight level road against a constant external resistive force $R$. When the velocity of car is $v$, the rate at which the engine of the car is doing work will be",
    options: ["$m a v$", "$R v$", "$(m a - R)v$", "$(m a + R)v$"],
    correct_index: 3,
    topic: "Engine Power under Acceleration and Resistance",
    difficulty: "easy",
    solution: "The net force producing acceleration is $F_{net} = F_{engine} - R = m a$.\nTherefore, the forward force exerted by the engine is:\n$$F_{engine} = m a + R$$\nThe rate of doing work (power) delivered by the engine at instantaneous velocity $v$ is:\n$$P = F_{engine} \\cdot v = (m a + R)v$$"
  },
  {
    q_num: 322,
    question_text: "The potential energy of a particle varies with distance $r$ as shown in the graph. The force acting on the particle is zero at",
    options: ["P", "S", "Q and R", "Both P and S"],
    correct_index: 2,
    image_url: getImageUrl(322),
    topic: "Equilibrium Points on Potential Energy Curve",
    difficulty: "easy",
    solution: "Force is given by $F = -\\frac{dU}{dr}$. The force is zero where the derivative (slope) of the potential energy curve is zero:\n$$\\frac{dU}{dr} = 0$$\nOn the given graph, the slope is zero at the local extrema: the peak at point Q (local maximum, unstable equilibrium) and the valley at point R (local minimum, stable equilibrium). Thus, force is zero at points Q and R."
  },
  {
    q_num: 323,
    question_text: "A toy car slips down the smooth inclined plane as shown in figure. It goes around the vertical smooth circle at the bottom, the relation between $H$ and $h$ is",
    options: ["$H = 2h$", "$H = 3h$", "$H = 4h$", "$H = 5h$"],
    correct_index: 3,
    image_url: getImageUrl(323),
    topic: "Looping the Loop & Track Heights",
    difficulty: "medium",
    solution: "To just complete the vertical circular loop of radius $r$, the minimum velocity at the bottom must be $v = \\sqrt{5gr}$, which requires a total release height above the bottom of:\n$$H = \\frac{5}{2}r$$\nFrom the diagram, $h$ is the vertical height from the top of the loop to the release point:\n$$h = H - 2r = \\frac{5}{2}r - 2r = \\frac{1}{2}r$$\nComparing $H$ and $h$:\n$$H = 5 \\times \\left(\\frac{1}{2}r\\right) = 5h$$"
  },
  {
    q_num: 324,
    question_text: "The ratio of velocities of a body connected to string at points A, B and C to just complete vertical circular motion is",
    options: ["$1 : 2 : 3$", "$1^2 : 3^2 : 5^2$", "$1 : 3 : 5$", "$\\sqrt{1} : \\sqrt{3} : \\sqrt{5}$"],
    correct_index: 3,
    image_url: getImageUrl(324),
    topic: "Critical Velocities in Vertical Circle",
    difficulty: "easy",
    solution: "For a body connected to a string to just complete vertical circular motion of radius $R$:\n- At topmost point A: $v_A = \\sqrt{gR}$\n- At horizontal point B: $v_B = \\sqrt{3gR}$\n- At bottommost point C: $v_C = \\sqrt{5gR}$\nTherefore, the ratio of velocities $v_A : v_B : v_C$ is:\n$$\\sqrt{gR} : \\sqrt{3gR} : \\sqrt{5gR} = \\sqrt{1} : \\sqrt{3} : \\sqrt{5}$$"
  },
  {
    q_num: 325,
    question_text: "A smooth sphere of mass $M$ moving with velocity $u$ directly collides elastically with another sphere of mass $m$ at rest. After collision their final velocities are $V$ and $v$ respectively. The value of $v$ is",
    options: ["$\\frac{2uM}{m}$", "$\\frac{2um}{M}$", "$\\frac{2u}{1 + \\frac{m}{M}}$", "$\\frac{2u}{1 + \\frac{M}{m}}$"],
    correct_index: 2,
    topic: "Elastic Collision Final Velocity Formula",
    difficulty: "medium",
    solution: "In a one-dimensional elastic collision where target mass $m$ is initially at rest ($u_2 = 0$):\n$$v = \\frac{2M}{M + m}u$$\nDividing numerator and denominator by $M$:\n$$v = \\frac{2u}{1 + \\frac{m}{M}}$$"
  },
  {
    q_num: 326,
    question_text: "Which of the following is not a perfectly inelastic collision?",
    options: [
      "A man jumping on to a moving cart",
      "A bullet striking a bag of sand",
      "An electron captured by a proton",
      "Striking of two glass balls"
    ],
    correct_index: 3,
    topic: "Types of Collisions",
    difficulty: "easy",
    solution: "In a perfectly inelastic collision, colliding bodies stick together and move with a common velocity (such as a bullet embedded in sand or a person landing on a cart). Glass balls rebound upon impact, so their collision is partially elastic, not perfectly inelastic."
  },
  {
    q_num: 327,
    question_text: "Work done by tension in a string",
    options: ["May be positive", "May be negative", "May be zero", "All of these"],
    correct_index: 3,
    topic: "Work Done by Tension",
    difficulty: "easy",
    solution: "Work done by tension depends on the displacement of the connected body:\n- Positive: When lifting an object upwards (force and displacement in same direction).\n- Negative: When lowering an object with tension pulling upward.\n- Zero: In a simple pendulum where tension is always perpendicular to velocity.\nThus, work done by tension may be positive, negative, or zero (all of these)."
  },
  {
    q_num: 328,
    question_text: "Speed of a body of mass $10\\text{ kg}$ is changed from $5\\text{ m/s}$ to $10\\text{ m/s}$. Work done on the body by all forces is",
    options: ["$375\\text{ J}$", "$187.5\\text{ J}$", "$750\\text{ J}$", "Zero"],
    correct_index: 0,
    topic: "Work-Energy Theorem Calculation",
    difficulty: "easy",
    solution: "By the work-energy theorem:\n$$W = \\Delta K = \\frac{1}{2}m(v_f^2 - v_i^2) = \\frac{1}{2}(10)(10^2 - 5^2) = 5 \\times (100 - 25) = 5 \\times 75 = 375\\text{ J}$$"
  },
  {
    q_num: 329,
    question_text: "A particle moving with speed $v$ collides elastically with another identical particle at rest. When the first particle moves at an angle $30^\\circ$ with initial direction of motion, second particle will move at angle $\\theta$ with initial direction of motion of first particle. $\\theta$ is equal to",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"],
    correct_index: 2,
    topic: "Oblique Elastic Collision Angle",
    difficulty: "medium",
    solution: "For an elastic collision between two particles of equal mass where the target is initially at rest, the angle between the two final velocity vectors is always $90^\\circ$:\n$$\\theta_1 + \\theta_2 = 90^\\circ$$\nGiven $\\theta_1 = 30^\\circ$:\n$$\\theta_2 = 90^\\circ - 30^\\circ = 60^\\circ$$"
  },

  // Page 4 (Book page 113)
  {
    q_num: 330,
    question_text: "In a conservative force field, the",
    options: [
      "Kinetic energy is conserved",
      "Potential energy is conserved",
      "Mechanical energy is conserved",
      "Momentum is conserved"
    ],
    correct_index: 2,
    topic: "Conservation of Mechanical Energy",
    difficulty: "easy",
    solution: "In any conservative force field, the work done by conservative forces transforms kinetic energy into potential energy and vice versa without any dissipation, ensuring that total mechanical energy $E = K + U$ is strictly conserved."
  },
  {
    q_num: 331,
    question_text: "Potential energy of a particle at position $x$ is given by $U = (-x^2 + 2x)\\text{ J}$. Force on the particle at $x = 1\\text{ m}$ is",
    options: ["$-\\hat{i}\\text{ N}$", "$-2\\hat{i}\\text{ N}$", "$2\\hat{i}\\text{ N}$", "Zero"],
    correct_index: 3,
    topic: "Force from Potential Energy Function",
    difficulty: "easy",
    solution: "Force is the negative gradient of potential energy:\n$$F = -\\frac{dU}{dx} = -\\frac{d}{dx}(-x^2 + 2x) = -(-2x + 2) = 2x - 2$$\nAt $x = 1\\text{ m}$:\n$$F = 2(1) - 2 = 0\\text{ N}$$"
  },
  {
    q_num: 332,
    question_text: "A body at rest is released from height $h$ on a frictionless track which leads to a vertical circle as shown in figure. If the body just completes vertical circle, then relation between $R$ and $h$ is",
    options: ["$h = \\frac{5R}{2}$", "$h = 2R$", "$h = \\frac{3R}{2}$", "$h = \\frac{R}{2}$"],
    correct_index: 0,
    image_url: getImageUrl(332),
    topic: "Looping the Loop from Track Release",
    difficulty: "easy",
    solution: "To just complete a vertical loop of radius $R$, the minimum velocity required at the lowest point of the circle is $v = \\sqrt{5gR}$.\nBy conservation of mechanical energy from release height $h$ to the lowest point:\n$$mgh = \\frac{1}{2}mv^2 = \\frac{1}{2}m(5gR) \\implies h = \\frac{5R}{2}$$"
  },

  // Section B: Assertion - Reason (18 Questions)
  {
    q_num: 333,
    question_text: "**Assertion (A)**: Work done by frictional force is always negative.\n**Reason (R)**: Direction of frictional force is always opposite to motion of the body.",
    options: AR_OPTIONS,
    correct_index: 3,
    topic: "Assertion-Reason: Work by Friction",
    difficulty: "medium",
    solution: "Assertion is FALSE: Friction can do positive work (e.g., when a car accelerates forward, static friction on drive wheels does positive work; or on a block placed on an accelerating truck).\nReason is FALSE: Frictional force opposes relative motion between surfaces in contact, not necessarily the actual motion of the body in the ground frame.\nTherefore, both Assertion and Reason are false statements (Option 4)."
  },
  {
    q_num: 334,
    question_text: "**Assertion (A)**: Work done by a force on object is zero, if the force is perpendicular to its velocity.\n**Reason (R)**: Work done by a force on object is zero, if it moves in such a way that point of application of force on body does not move.",
    options: AR_OPTIONS,
    correct_index: 1,
    topic: "Assertion-Reason: Zero Work Done",
    difficulty: "medium",
    solution: "Assertion is TRUE: $dW = \\vec{F} \\cdot d\\vec{r} = F v dt \\cos 90^\\circ = 0$.\nReason is TRUE: If displacement of point of application $d\\vec{r} = 0$, work done is identically zero.\nHowever, Reason does not explain why perpendicular forces do zero work (which is due to the cosine of the $90^\\circ$ angle). Hence, both are true but R is not the correct explanation (Option 2)."
  },
  {
    q_num: 335,
    question_text: "**Assertion (A)**: In the absence of friction the mechanical energy of a system is conserved if there is no external force acting on the system.\n**Reason (R)**: The work done by a conservative force in a system is equal to loss of potential energy of the system.",
    options: AR_OPTIONS,
    correct_index: 1,
    topic: "Assertion-Reason: Mechanical Energy Conservation",
    difficulty: "medium",
    solution: "Both Assertion and Reason are correct scientific statements. In the absence of non-conservative forces like friction and with zero external work, mechanical energy remains conserved. Also, work by conservative forces equals negative change in potential energy ($W_c = -\\Delta U$). Thus, both are true but R is not the complete explanation of A (Option 2)."
  },
  {
    q_num: 336,
    question_text: "**Assertion (A)**: When a particle is rotated in a vertical circle with the help of a string, the minimum velocity of the particle at topmost point may be equal to zero.\n**Reason (R)**: Tension in the string at the top most point is always zero.",
    options: AR_OPTIONS,
    correct_index: 3,
    topic: "Assertion-Reason: Vertical Circle Critical Velocity",
    difficulty: "medium",
    solution: "Assertion is FALSE: For a mass on a flexible string, the minimum velocity at topmost point must be $v_{top} = \\sqrt{gR} > 0$ to prevent the string from slacking.\nReason is FALSE: Tension at the topmost point is zero only at the critical minimum speed; at higher speeds it is strictly greater than zero.\nTherefore, both statements are false (Option 4)."
  },
  {
    q_num: 337,
    question_text: "**Assertion (A)**: A system of mass can have kinetic energy even without having momentum but it cannot have momentum without having kinetic energy.\n**Reason (R)**: Momentum is a vector quantity, while kinetic energy is scalar.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Momentum and Kinetic Energy of Systems",
    difficulty: "easy",
    solution: "Assertion is TRUE: For a system of particles, momentum is a vector sum $\\vec{P} = \\sum m_i \\vec{v}_i$ which can cancel to zero (e.g. two equal masses moving in opposite directions), while kinetic energy is a sum of positive scalars $K = \\sum \\frac{1}{2}m_i v_i^2 > 0$. If $\\vec{P} \\neq 0$, at least one particle has velocity $v > 0$, so $K > 0$.\nReason is TRUE and correctly explains why vectors can cancel while scalar energies sum positively.\nTherefore, mark (1)."
  },
  {
    q_num: 338,
    question_text: "**Assertion (A)**: For a body in neutral equilibrium, net force is zero which is not the condition for a body in unstable equilibrium.\n**Reason (R)**: In an unstable equilibrium as a body is displaced from its equilibrium position a net force starts acting on the body trying to bring the body back to its equilibrium position.",
    options: AR_OPTIONS,
    correct_index: 3,
    topic: "Assertion-Reason: Equilibrium Types",
    difficulty: "medium",
    solution: "Assertion is FALSE: Net force is zero ($F_{net} = 0$) at ALL equilibrium positions (stable, unstable, and neutral).\nReason is FALSE: In unstable equilibrium, a displacement produces a force directed AWAY from equilibrium (restoring force only occurs in stable equilibrium).\nTherefore, both statements are false (Option 4)."
  },
  {
    q_num: 339,
    question_text: "**Assertion (A)**: In an elastic collision of two bodies the momentum and energy of each body is conserved.\n**Reason (R)**: If two bodies stick to each other after collision, the collision is said to be perfectly elastic.",
    options: AR_OPTIONS,
    correct_index: 3,
    topic: "Assertion-Reason: Collisions",
    difficulty: "easy",
    solution: "Assertion is FALSE: Momentum and energy are conserved for the SYSTEM as a whole, but individual bodies exchange momentum and energy.\nReason is FALSE: Sticking together defines a perfectly inelastic collision.\nTherefore, both statements are false (Option 4)."
  },
  {
    q_num: 340,
    question_text: "**Assertion (A)**: The energy of an object changes if an exchange of energy occurs between the object and its environment.\n**Reason (R)**: Energy transfer can occur only due to a force doing some work on the object.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Energy Exchange",
    difficulty: "easy",
    solution: "Assertion is TRUE: Any exchange of energy with the surroundings alters the object's energy.\nReason is FALSE: Energy transfer can also occur via heat transfer and radiation without macroscopic mechanical work.\nTherefore, Assertion is true but Reason is false (Option 3)."
  },
  {
    q_num: 341,
    question_text: "**Assertion (A)**: Work done against the spring force is stored as elastic potential energy.\n**Reason (R)**: Spring force is considered to be conservative force.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Spring Potential Energy",
    difficulty: "easy",
    solution: "Work done against a conservative force is stored as potential energy ($W_{ext} = \\Delta U$). Since the spring force $F = -kx$ is a conservative force, the work done against it is stored as elastic potential energy $U = \\frac{1}{2}kx^2$. Therefore, both are true and Reason explains Assertion (Option 1)."
  },
  {
    q_num: 342,
    question_text: "**Assertion (A)**: Work done by the friction may be positive.\n**Reason (R)**: When the displacement of the body is in the direction of frictional force.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Positive Work by Friction",
    difficulty: "easy",
    solution: "When a body's displacement has a component in the same direction as the frictional force acting on it (for example, a box sitting on the accelerating bed of a truck), the dot product $\\vec{f} \\cdot d\\vec{s} > 0$, resulting in positive work done by friction. Thus both are true and Reason is the correct explanation (Option 1)."
  },
  {
    q_num: 343,
    question_text: "**Assertion (A)**: Potential energy do not have unique value.\n**Reason (R)**: Work done by conservative force depends on path followed.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Potential Energy Reference",
    difficulty: "easy",
    solution: "Assertion is TRUE: Potential energy depends on the arbitrary choice of zero reference level, so its absolute value is not unique.\nReason is FALSE: Work done by a conservative force is path-independent.\nTherefore, Assertion is true but Reason is false (Option 3)."
  },
  {
    q_num: 344,
    question_text: "**Assertion (A)**: At a location potential energy of body may have different values.\n**Reason (R)**: Potential energy of a body depends on the reference level.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Reference Level for Potential Energy",
    difficulty: "easy",
    solution: "Because potential energy is measured relative to an arbitrarily assigned reference level ($U = mgh$), shifting the reference datum gives different numerical values of $U$ at the same physical position. Thus both are true and Reason is the correct explanation (Option 1)."
  },
  {
    q_num: 345,
    question_text: "**Assertion (A)**: At equilibrium, potential energy of a body may be maximum.\n**Reason (R)**: At stable equilibrium, potential energy is maximum.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Equilibrium and Extrema of Potential Energy",
    difficulty: "medium",
    solution: "Assertion is TRUE: At unstable equilibrium, potential energy is at a local maximum ($\\frac{dU}{dx} = 0, \\frac{d^2U}{dx^2} < 0$).\nReason is FALSE: At stable equilibrium, potential energy is at a minimum ($\\frac{d^2U}{dx^2} > 0$).\nTherefore, Assertion is true but Reason is false (Option 3)."
  },
  {
    q_num: 346,
    question_text: "**Assertion (A)**: Power delivered by the tension in the rotating wire to a connected body in vertical circle is always zero.\n**Reason (R)**: Tension in the wire is equal to the centripetal force acting on the body doing vertical circular motion.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Power by Tension in Vertical Circle",
    difficulty: "medium",
    solution: "Assertion is TRUE: Tension is always directed radially towards the center, perpendicular to the instantaneous velocity ($P = \\vec{T} \\cdot \\vec{v} = 0$).\nReason is FALSE: In a vertical circle, tension is not simply equal to centripetal force; it depends on gravity: $T - mg\\cos\\theta = \\frac{mv^2}{R} \\implies T = \\frac{mv^2}{R} + mg\\cos\\theta$.\nTherefore, Assertion is true but Reason is false (Option 3)."
  },
  {
    q_num: 347,
    question_text: "**Assertion (A)**: During collision of two masses momentum is conserved.\n**Reason (R)**: During collision external force is absent.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Momentum Conservation in Collisions",
    difficulty: "easy",
    solution: "For an isolated two-body system during collision, no external net force acts on the system (or external forces like gravity are negligible compared to enormous impulsive collision forces: $\\int F_{ext} dt \\approx 0$). Therefore, linear momentum is conserved, and Reason correctly explains Assertion (Option 1)."
  },
  {
    q_num: 348,
    question_text: "**Assertion (A)**: A body is initially at rest is acted upon by a constant force. The rate of change of its kinetic energy varies linearly with time.\n**Reason (R)**: When a body is at rest it must be in equilibrium.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Rate of Kinetic Energy Change",
    difficulty: "easy",
    solution: "Assertion is TRUE: Rate of change of kinetic energy is power: $\\frac{dK}{dt} = P = F \\cdot v = F(at) = F\\left(\\frac{F}{m}\\right)t = \\frac{F^2}{m}t$, which is directly proportional to time $t$.\nReason is FALSE: A body momentarily at rest can experience a non-zero net force (e.g., a ball at the top of its trajectory is not in equilibrium).\nTherefore, Assertion is true but Reason is false (Option 3)."
  },
  {
    q_num: 349,
    question_text: "**Assertion (A)**: In a conservative field, power delivered to an object is equal to rate of change of potential energy of the system.\n**Reason (R)**: Power delivered to an object is rate of doing work on the object.",
    options: AR_OPTIONS,
    correct_index: 1,
    topic: "Assertion-Reason: Power in Conservative Field",
    difficulty: "medium",
    solution: "Assertion is true in terms of magnitude: $P = \\frac{dW_c}{dt} = -\\frac{dU}{dt}$. Reason is true by definition of power: $P = \\frac{dW}{dt}$. Hence, both are true statements but Reason does not explain the conservative field property (Option 2)."
  },
  {
    q_num: 350,
    question_text: "**Assertion (A)**: Work is a scalar quantity.\n**Reason (R)**: All quantities with dimensional formula $[ML^2T^{-2}]$ are scalar.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Scalar Nature of Work",
    difficulty: "easy",
    solution: "Assertion is TRUE: Work is the dot product of two vectors ($\\vec{F} \\cdot \\vec{d}$), which is a scalar.\nReason is FALSE: Torque also has dimensions $[ML^2T^{-2}]$ ($[\\text{N}\\cdot\\text{m}]$), yet torque is an axial vector quantity (cross product $\\vec{r} \\times \\vec{F}$).\nTherefore, Assertion is true but Reason is false (Option 3)."
  }
];

async function seedBatch3() {
  const client = await pool.connect();
  try {
    console.log('Connected to PostgreSQL database for Batch 3...');

    const chapterName = 'Work, Power and Energy';
    const chapterId = 26;

    let inserted = 0;
    for (const q of BATCH3_QUESTIONS) {
      // Check if question exists by question_text snippet
      const snippet = q.question_text.slice(0, 50);
      const checkRes = await client.query(
        `SELECT id FROM question_bank WHERE chapter = $1 AND question_text LIKE $2 LIMIT 1`,
        [chapterName, `%${snippet}%`]
      );

      if (checkRes.rows.length > 0) {
        // Update existing question
        const updateSql = `
          UPDATE question_bank SET
            question_text = $1,
            options = $2,
            correct_index = $3,
            correct_indices = $4,
            marks = $5,
            difficulty = $6,
            solution = $7,
            image_url = $8,
            subject = $9,
            topic = $10,
            chapter = $11,
            subject_id = $12,
            chapter_id = $13
          WHERE id = $14
        `;
        await client.query(updateSql, [
          q.question_text,
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
        console.log(`[Batch 3] Updated existing question #${q.q_num} (DB ID: ${checkRes.rows[0].id})`);
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
        console.log(`[Batch 3] [${inserted}/${BATCH3_QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
      }
    }

    console.log(`\n Successfully processed ${inserted} questions in Batch 3 into Question Bank for "${chapterName}".`);
  } catch (err) {
    console.error('Batch 3 seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

seedBatch3();
