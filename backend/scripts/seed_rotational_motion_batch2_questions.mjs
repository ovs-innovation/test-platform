import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load diagram mappings for batch 2
let diagrams = {};
try {
  const mapPath = path.resolve(__dirname, 'rotational_motion_batch2_diagrams.json');
  if (fs.existsSync(mapPath)) {
    diagrams = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  }
} catch (err) {
  console.warn('Failed to load diagrams map:', err.message);
}

const getImageUrl = (qNum) => {
  if (diagrams[qNum]) {
    return diagrams[qNum].cloudinary_url || diagrams[qNum].local_url;
  }
  return '';
};

export const QUESTIONS = [
  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 1 (pp. 125 - 126)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 69,
    question_text: "The thin rod shown has mass $M$ and length $L$. A force $F$ acts at one end and free to rotate about the other end in the plane of force. Initial angular acceleration of the rod is (neglect gravity)",
    options: [
      "\\frac{3F}{2ML}",
      "\\frac{2F}{3ML}",
      "\\frac{F}{ML}",
      "\\frac{F}{2ML}"
    ],
    correct_index: 0,
    topic: "Torque & Angular Acceleration of Rod",
    difficulty: "medium",
    image_url: getImageUrl(69),
    solution: "The rod of mass $M$ and length $L$ is pivoted at one end.\nThe force $F$ acts at the free end at an angle of $30^\\circ$ to the perpendicular (or component perpendicular to the rod is $F_\\perp = F\\sin 30^\\circ = \\frac{F}{2}$):\n$$\\tau = F_\\perp L = \\left(F \\sin 30^\\circ\\right) L = \\frac{F L}{2}$$\nThe moment of inertia of the thin uniform rod about the hinged end is:\n$$I = \\frac{1}{3} M L^2$$\nThe initial angular acceleration is:\n$$\\alpha = \\frac{\\tau}{I} = \\frac{\\frac{F L}{2}}{\\frac{1}{3} M L^2} = \\frac{3F}{2ML}$$"
  },
  {
    q_num: 70,
    question_text: "The uniform rod of mass $m$ is at rest on smooth vertical and rough horizontal surface with friction coefficient $\\mu = 0.5$ as shown. The friction force acting on it is",
    options: [
      "\\frac{mg}{2}",
      "\\frac{mg}{2\\sqrt{3}}",
      "mg\\frac{\\sqrt{3}}{2}",
      "\\frac{mg\\sqrt{3}}{4}"
    ],
    correct_index: 1,
    topic: "Equilibrium of Rod & Friction",
    difficulty: "medium",
    image_url: getImageUrl(70),
    solution: "Let $N_w$ be the horizontal normal force from the smooth vertical wall, and $N_f$ be the vertical normal force from the floor: $N_f = mg$.\nBy horizontal equilibrium, the static friction force at the floor is $f = N_w$.\nTaking torque about the point of contact with the floor for rotational equilibrium:\n$$\\sum \\tau = 0 \\implies N_w (L\\sin 60^\\circ) = mg \\left(\\frac{L}{2}\\cos 60^\\circ\\right)$$\n$$N_w = mg \\frac{\\cos 60^\\circ}{2\\sin 60^\\circ} = \\frac{mg}{2\\tan 60^\\circ} = \\frac{mg}{2\\sqrt{3}}$$\nSince the maximum available static friction is $f_{\\max} = \\mu N_f = 0.5 mg = \\frac{mg}{2}$, and $\\frac{mg}{2\\sqrt{3}} \\approx 0.289 mg < \\frac{mg}{2}$, the rod remains in equilibrium.\nThus, the static friction force acting on the rod is $f = \\frac{mg}{2\\sqrt{3}}$."
  },
  {
    q_num: 71,
    question_text: "Three particles are placed at corners of an equilateral triangle. Find moment of inertia of system of particles about $y$-axis",
    options: [
      "\\frac{ml^2}{2}",
      "\\frac{ml^2}{4}",
      "\\frac{3}{2}ml^2",
      "\\frac{3}{4}ml^2"
    ],
    correct_index: 0,
    topic: "Moment of Inertia of Point Masses",
    difficulty: "easy",
    image_url: getImageUrl(71),
    solution: "From the given figure:\n- The top particle of mass $2m$ lies directly on the $y$-axis, so its perpendicular distance from the $y$-axis is $r_1 = 0$.\n- The left particle of mass $m$ lies on the $x$-axis at distance $r_2 = \\frac{l}{2}$ from the $y$-axis.\n- The right particle of mass $m$ lies on the $x$-axis at distance $r_3 = \\frac{l}{2}$ from the $y$-axis.\nThe moment of inertia of the system about the $y$-axis is:\n$$I = (2m)(0)^2 + m\\left(\\frac{l}{2}\\right)^2 + m\\left(\\frac{l}{2}\\right)^2 = m\\frac{l^2}{4} + m\\frac{l^2}{4} = \\frac{m l^2}{2}$$"
  },
  {
    q_num: 72,
    question_text: "A light rigid rod of length $2l$ is welded with another rod of mass $m$ and length $2l$. The light rod is hinged at the free end and the combination is given an angular velocity such that the centre of mass moves with velocity $v$. The Kinetic Energy of rod is",
    options: [
      "\\frac{mv^2}{54}",
      "\\frac{28mv^2}{27}",
      "\\frac{mv^2}{27}",
      "\\frac{14mv^2}{27}"
    ],
    correct_index: 3,
    topic: "Rotational Kinetic Energy of Compound Rod",
    difficulty: "hard",
    image_url: getImageUrl(72),
    solution: "The massive rod of mass $m$ and length $2l$ has its center of mass at distance $r_{\\text{cm}} = 2l + l = 3l$ from the hinge.\nSince the velocity of its center of mass is $v$:\n$$v = \\omega r_{\\text{cm}} = \\omega (3l) \\implies \\omega = \\frac{v}{3l}$$\nThe moment of inertia of the massive rod about the hinge is obtained using the parallel axis theorem:\n$$I = I_{\\text{cm}} + m r_{\\text{cm}}^2 = \\frac{m(2l)^2}{12} + m(3l)^2 = \\frac{4m l^2}{12} + 9 m l^2 = \\frac{m l^2}{3} + 9 m l^2 = \\frac{28}{3} m l^2$$\nThe kinetic energy of the rod is purely rotational about the hinge:\n$$K = \\frac{1}{2} I \\omega^2 = \\frac{1}{2} \\left(\\frac{28}{3} m l^2\\right) \\left(\\frac{v}{3l}\\right)^2 = \\frac{1}{2} \\left(\\frac{28}{3} m l^2\\right) \\frac{v^2}{9 l^2} = \\frac{14}{27} m v^2$$"
  },
  {
    q_num: 73,
    question_text: "The moment of inertia of a thin uniform circular disc about one of its diameter is $I$. Its moment of inertia about an axis tangent to it and perpendicular to its plane is",
    options: [
      "\\frac{2I}{3}",
      "2I",
      "\\frac{I}{2}",
      "6I"
    ],
    correct_index: 3,
    topic: "Parallel & Perpendicular Axis Theorems",
    difficulty: "medium",
    image_url: "",
    solution: "For a uniform circular disc of mass $M$ and radius $R$:\nMoment of inertia about a diameter is:\n$$I_{\\text{diameter}} = \\frac{1}{4} M R^2 = I \\implies M R^2 = 4I$$\nMoment of inertia about the perpendicular central axis is:\n$$I_{\\text{cm}} = \\frac{1}{2} M R^2 = 2I$$\nBy the parallel axis theorem, the moment of inertia about an axis tangent to the rim and perpendicular to its plane is:\n$$I_{\\text{tangent}} = I_{\\text{cm}} + M R^2 = 2I + 4I = 6I$$"
  },
  {
    q_num: 74,
    question_text: "A boy is standing at the edge of a circular horizontal platform rotating freely about a vertical axis. If the boy starts walking along the edge of platform with constant speed, then correct statement is",
    options: [
      "Angular momentum of system is conserved",
      "Momentum of boy is constant",
      "Kinetic energy is conserved",
      "All of these"
    ],
    correct_index: 0,
    topic: "Conservation of Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "Since the platform rotates freely about a vertical axis and no external torque acts on the (platform + boy) system about this axis, the total angular momentum of the system is strictly conserved.\nThe boy's linear momentum is not constant because the direction of his velocity continuously changes along the circular path. Mechanical kinetic energy is not conserved because muscular work is performed by the boy while walking."
  },
  {
    q_num: 75,
    question_text: "If mass per unit length of a non-uniform rod of length $l$ is given by $\\lambda = c x^2$, where $x$ is distance from end $A$, then distance of center of mass from end $A$ is",
    options: [
      "\\frac{l}{2}",
      "\\frac{l}{3}",
      "\\frac{2l}{3}",
      "\\frac{3l}{4}"
    ],
    correct_index: 3,
    topic: "Centre of Mass of Variable Density Rod",
    difficulty: "easy",
    image_url: getImageUrl(75),
    solution: "The position of the center of mass measured from end $A$ ($x = 0$) is:\n$$x_{\\text{cm}} = \\frac{\\int_0^l x \\lambda dx}{\\int_0^l \\lambda dx} = \\frac{\\int_0^l x (c x^2) dx}{\\int_0^l (c x^2) dx} = \\frac{\\int_0^l x^3 dx}{\\int_0^l x^2 dx} = \\frac{l^4 / 4}{l^3 / 3} = \\frac{3l}{4}$$"
  },
  {
    q_num: 76,
    question_text: "A particle is moving in a circle has initial angular velocity $50\\text{ rpm}$ and has an angular acceleration of $\\pi\\text{ rad/s}^2$. Its angular velocity after one minute is",
    options: [
      "110 rpm",
      "850 rpm",
      "1850 rpm",
      "None of these"
    ],
    correct_index: 2,
    topic: "Rotational Kinematics",
    difficulty: "easy",
    image_url: "",
    solution: "Initial angular velocity:\n$$\\omega_0 = 50\\text{ rpm} = 50 \\times \\frac{2\\pi}{60}\\text{ rad/s} = \\frac{5\\pi}{3}\\text{ rad/s}$$\nTime $t = 1\\text{ minute} = 60\\text{ s}$, angular acceleration $\\alpha = \\pi\\text{ rad/s}^2$.\nUsing $\\omega = \\omega_0 + \\alpha t$:\n$$\\omega = \\frac{5\\pi}{3} + \\pi(60) = \\frac{185\\pi}{3}\\text{ rad/s}$$\nConverting to rpm:\n$$N = \\omega \\times \\frac{60}{2\\pi} = \\frac{185\\pi}{3} \\times \\frac{60}{2\\pi} = 185 \\times 10 = 1850\\text{ rpm}$$"
  },
  {
    q_num: 77,
    question_text: "A particle of mass $m$ moving with velocity $v$ hit a rod of identical mass free to rotate about one end and stick to it. Find angular velocity of rod just after collision. ($l = \\text{length of rod}$)",
    options: [
      "\\frac{v}{2l}",
      "\\frac{3v}{4l}",
      "\\frac{6v}{7l}",
      "\\frac{5v}{6l}"
    ],
    correct_index: 2,
    topic: "Rotational Collision & Angular Momentum",
    difficulty: "medium",
    image_url: getImageUrl(77),
    solution: "The particle of mass $m$ strikes the rod perpendicularly at distance $r = \\frac{l}{2}$ from the hinge.\nInitial angular momentum about the hinge:\n$$L_i = m v \\left(\\frac{l}{2}\\right) = \\frac{1}{2} m v l$$\nAfter collision, the particle sticks to the rod at distance $\\frac{l}{2}$.\nThe moment of inertia of the combined system about the hinge is:\n$$I_{\\text{total}} = I_{\\text{rod}} + I_{\\text{particle}} = \\frac{1}{3} m l^2 + m\\left(\\frac{l}{2}\\right)^2 = \\frac{1}{3} m l^2 + \\frac{1}{4} m l^2 = \\frac{7}{12} m l^2$$\nBy conservation of angular momentum about the hinge:\n$$L_i = I_{\\text{total}} \\omega \\implies \\frac{1}{2} m v l = \\frac{7}{12} m l^2 \\omega$$\n$$\\omega = \\frac{\\frac{1}{2} m v l}{\\frac{7}{12} m l^2} = \\frac{6v}{7l}$$"
  },
  {
    q_num: 78,
    question_text: "Three blocks of mass $m$, $2.5\\text{ kg}$ and $2.5\\text{ kg}$ are in equilibrium with rigid rod shown in figure. The value of $m$ is",
    options: [
      "5 kg",
      "10 kg",
      "15 kg",
      "20 kg"
    ],
    correct_index: 2,
    topic: "Rotational Equilibrium of Levers",
    difficulty: "medium",
    image_url: getImageUrl(78),
    solution: "For the rigid rod to be in rotational equilibrium, the sum of clockwise torques must balance the sum of anti-clockwise torques about the fulcrum:\n$$\\sum \\tau = 0$$\nBalancing the moments of the hanging masses about the pivot according to the given distance ratios:\n$$m \\times 4l = (2.5 + 2.5) \\times 3l \\implies 4m = 5 \\times 3 = 15$$\n$$m = 15\\text{ kg}$$"
  },
  {
    q_num: 79,
    question_text: "Four particles are placed at corners of a square of side $l$. Find moment of inertia of system about diagonal line $AC$.",
    options: [
      "8ml^2",
      "4ml^2",
      "ml^2",
      "None of these"
    ],
    correct_index: 2,
    topic: "Moment of Inertia of Particles",
    difficulty: "easy",
    image_url: getImageUrl(79),
    solution: "Let square be $ABCD$ of side $l$ with particles of mass $m$ at each vertex:\n1. Particles at $A$ and $C$ lie directly on the diagonal $AC$, so their distance from the axis is $0$: $I_A = 0, I_C = 0$.\n2. Particles at $B$ and $D$ lie at opposite ends of the perpendicular diagonal $BD$.\nThe length of diagonal $BD$ is $l\\sqrt{2}$, and its midpoint is on $AC$.\nTherefore, the perpendicular distance of each of $B$ and $D$ from $AC$ is:\n$$d = \\frac{l\\sqrt{2}}{2} = \\frac{l}{\\sqrt{2}}$$\nThe total moment of inertia about the diagonal $AC$ is:\n$$I = m(0)^2 + m(0)^2 + m\\left(\\frac{l}{\\sqrt{2}}\\right)^2 + m\\left(\\frac{l}{\\sqrt{2}}\\right)^2 = m\\frac{l^2}{2} + m\\frac{l^2}{2} = m l^2$$"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 2 (pp. 127 - 128)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 84,
    question_text: "Three masses $m$, $2m$ and $3m$ are thrown from the top of a tower such that $m$ is thrown vertically upward with $10\\text{ m/s}$, $2m$ is thrown horizontally with $15\\text{ m/s}$ and $3m$ is thrown vertically downward with $5\\text{ m/s}$. The acceleration of centre of mass of three body system will be",
    options: [
      "2\\sqrt{2}g",
      "g",
      "\\sqrt{2}g",
      "Zero"
    ],
    correct_index: 1,
    topic: "Acceleration of Centre of Mass",
    difficulty: "easy",
    image_url: "",
    solution: "Once projected, each particle moves solely under gravity, so each particle experiences an acceleration of $\\vec{g}$ downwards.\nThe acceleration of the center of mass is:\n$$\\vec{a}_{\\text{cm}} = \\frac{m_1 \\vec{a}_1 + m_2 \\vec{a}_2 + m_3 \\vec{a}_3}{m_1 + m_2 + m_3} = \\frac{m\\vec{g} + 2m\\vec{g} + 3m\\vec{g}}{6m} = \\frac{6m\\vec{g}}{6m} = \\vec{g}$$\nThus, the magnitude of acceleration of the center of mass is $g$."
  },
  {
    q_num: 85,
    question_text: "Moment of inertia of a uniform disc of mass $M$ and radius $R$ about an axis passing through its edge and perpendicular to its plane is $I$. Its moment of inertia about its diameter will be",
    options: [
      "I",
      "\\frac{I}{2}",
      "\\frac{I}{4}",
      "\\frac{I}{6}"
    ],
    correct_index: 3,
    topic: "Theorems of Moment of Inertia",
    difficulty: "medium",
    image_url: "",
    solution: "Moment of inertia of the disc about an axis through its edge perpendicular to its plane is:\n$$I = I_{\\text{cm}} + M R^2 = \\frac{1}{2} M R^2 + M R^2 = \\frac{3}{2} M R^2 \\implies M R^2 = \\frac{2}{3} I$$\nMoment of inertia of the disc about any diameter is:\n$$I_{\\text{diameter}} = \\frac{1}{4} M R^2 = \\frac{1}{4}\\left(\\frac{2}{3} I\\right) = \\frac{1}{6} I$$"
  },
  {
    q_num: 86,
    question_text: "A uniform rod of mass $2\\text{ kg}$ and length $1\\text{ m}$ is free to rotate in a vertical plane about a fixed horizontal axis through one end. The rod begins rotating from rest from its unstable equilibrium position. Its angular acceleration, when it has turned through an angle of $30^\\circ$ is",
    options: [
      "g\\text{ rad/s}^2",
      "\\frac{3g}{2}\\text{ rad/s}^2",
      "\\frac{2g}{3}\\text{ rad/s}^2",
      "\\frac{3g}{4}\\text{ rad/s}^2"
    ],
    correct_index: 3,
    topic: "Rotational Dynamics of Rod",
    difficulty: "medium",
    image_url: "",
    solution: "The unstable equilibrium position corresponds to the rod standing vertically upright ($\\theta = 0$).\nWhen it tilts by $\\theta = 30^\\circ$ from the vertical, the weight $mg$ acting at the center of mass (distance $\\frac{L}{2}$ from hinge) produces a torque:\n$$\\tau = mg \\left(\\frac{L}{2}\\right) \\sin 30^\\circ = mg \\frac{L}{2} \\left(\\frac{1}{2}\\right) = \\frac{1}{4} mg L$$\nThe moment of inertia of the rod about one end is $I = \\frac{1}{3} m L^2$.\nThe angular acceleration is:\n$$\\alpha = \\frac{\\tau}{I} = \\frac{\\frac{1}{4} mg L}{\\frac{1}{3} m L^2} = \\frac{3g}{4L} = \\frac{3g}{4(1)} = \\frac{3g}{4}\\text{ rad/s}^2$$"
  },
  {
    q_num: 87,
    question_text: "Moment of inertia of a uniform rod of length $L$ and mass $m$ about an axis through one end at an angle $45^\\circ$ to rod is",
    options: [
      "\\frac{mL^2}{6}",
      "\\frac{mL^2}{3}",
      "\\frac{mL^2}{12}",
      "\\frac{mL^2}{4}"
    ],
    correct_index: 0,
    topic: "Moment of Inertia of Inclined Rod",
    difficulty: "medium",
    image_url: "",
    solution: "For a rod of mass $m$ and length $L$ rotating about an axis passing through one end at an angle $\\theta$ to the rod, each mass element $dm = \\frac{m}{L} dx$ at distance $x$ from the hinge has perpendicular distance $r_\\perp = x\\sin\\theta$.\n$$I = \\int r_\\perp^2 dm = \\int_0^L (x\\sin\\theta)^2 \\left(\\frac{m}{L} dx\\right) = \\frac{m}{L} \\sin^2\\theta \\int_0^L x^2 dx = \\frac{1}{3} m L^2 \\sin^2\\theta$$\nFor $\\theta = 45^\\circ$:\n$$I = \\frac{1}{3} m L^2 \\sin^2 45^\\circ = \\frac{1}{3} m L^2 \\left(\\frac{1}{2}\\right) = \\frac{m L^2}{6}$$"
  },
  {
    q_num: 88,
    question_text: "An electric fan rotating at $1200\\text{ rpm}$ is switched off. If the fan stops after $10\\text{ seconds}$, the number of revolutions completed by the fan before it stops is (assume uniform retardation)",
    options: [
      "100",
      "50",
      "40",
      "20"
    ],
    correct_index: 0,
    topic: "Rotational Kinematics",
    difficulty: "easy",
    image_url: "",
    solution: "Initial frequency $N_0 = 1200\\text{ rpm} = \\frac{1200}{60} = 20\\text{ rev/s}$.\nFinal frequency $N = 0$.\nTime $t = 10\\text{ s}$.\nUnder uniform angular retardation, the total number of revolutions is:\n$$n = N_{\\text{avg}} \\times t = \\left(\\frac{N_0 + N}{2}\\right) t = \\left(\\frac{20 + 0}{2}\\right) \\times 10 = 10 \\times 10 = 100\\text{ revolutions}$$"
  },
  {
    q_num: 89,
    question_text: "A particle of mass $m$ moves along the line $y = x$, with speed $v$. The magnitude of angular momentum about the point $(\\sqrt{2}a, 0)$ is",
    options: [
      "\\sqrt{2}mva",
      "2mva",
      "mva",
      "\\frac{mva}{\\sqrt{2}}"
    ],
    correct_index: 2,
    topic: "Angular Momentum of Particle",
    difficulty: "easy",
    image_url: "",
    solution: "The equation of the line of motion is $x - y = 0$.\nThe perpendicular distance $d$ from the point $(\\sqrt{2}a, 0)$ to the line $x - y = 0$ is:\n$$d = \\frac{|1(\\sqrt{2}a) - 1(0)|}{\\sqrt{1^2 + (-1)^2}} = \\frac{\\sqrt{2}a}{\\sqrt{2}} = a$$\nThe magnitude of angular momentum about the point is:\n$$L = m v d = m v a$$"
  },
  {
    q_num: 90,
    question_text: "Two identical particles are projected simultaneously from a tower with speeds $v$ and $\\frac{v}{2}$ at an angle $30^\\circ$ and $60^\\circ$ simultaneously. The acceleration of centre of mass of the balls is",
    options: [
      "\\frac{g}{3}",
      "\\frac{g}{2}",
      "\\frac{g}{6}",
      "g"
    ],
    correct_index: 3,
    topic: "Acceleration of Centre of Mass",
    difficulty: "easy",
    image_url: "",
    solution: "Both particles are moving freely under gravity, so each particle has acceleration $\\vec{g}$ vertically downwards regardless of its projection speed or angle.\nSince the particles are identical ($m_1 = m_2 = m$):\n$$\\vec{a}_{\\text{cm}} = \\frac{m\\vec{g} + m\\vec{g}}{2m} = \\vec{g}$$\nTherefore, the acceleration of the center of mass is $g$ downwards."
  },
  {
    q_num: 91,
    question_text: "Centre of mass of a system of particles",
    options: [
      "Depends on frame of reference",
      "Does not depend on frame of reference",
      "May change due to internal forces",
      "All of these"
    ],
    correct_index: 0,
    topic: "Properties of Centre of Mass",
    difficulty: "easy",
    image_url: "",
    solution: "The position coordinates of the center of mass $\\vec{R}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i}$ depend explicitly on the origin and coordinate axes chosen, and therefore depend on the frame of reference.\nInternal forces can never shift the position or acceleration of the center of mass."
  },
  {
    q_num: 92,
    question_text: "Three rods each of mass $m$ and length $l$ are joined together in the form of an equilateral triangle as shown. The moment of inertia about an axis along median of the triangle is",
    options: [
      "\\frac{ml^2}{2}",
      "\\frac{ml^2}{4}",
      "\\frac{ml^2}{3}",
      "\\frac{2ml^2}{3}"
    ],
    correct_index: 1,
    topic: "Moment of Inertia of Frame",
    difficulty: "medium",
    image_url: getImageUrl(92),
    solution: "The axis passes along the median through the top vertex of the equilateral triangle:\n1. Base rod (mass $m$, length $l$): The median bisects the base perpendicularly at its center, so:\n$$I_{\\text{base}} = \\frac{1}{12} m l^2$$\n2. The two inclined rods (each of mass $m$, length $l$): Each rod has one end on the median (at top vertex) and is inclined at $30^\\circ$ to the median:\n$$I_{\\text{inclined}} = \\frac{1}{3} m l^2 \\sin^2 30^\\circ = \\frac{1}{3} m l^2 \\left(\\frac{1}{4}\\right) = \\frac{1}{12} m l^2$$\nTotal moment of inertia about the median axis:\n$$I = I_{\\text{base}} + 2 I_{\\text{inclined}} = \\frac{1}{12} m l^2 + 2\\left(\\frac{1}{12} m l^2\\right) = \\frac{3}{12} m l^2 = \\frac{m l^2}{4}$$"
  },
  {
    q_num: 93,
    question_text: "The moment of inertia of a uniform semicircular disc of mass $M$ and radius $R$ about an axis through its centre of mass on its plane as shown in figure is",
    options: [
      "\\frac{MR^2}{2}",
      "\\frac{MR^2}{4}",
      "\\frac{MR^2}{8}",
      "\\frac{MR^2}{120}"
    ],
    correct_index: 1,
    topic: "Moment of Inertia of Semicircular Disc",
    difficulty: "medium",
    image_url: getImageUrl(93),
    solution: "For a uniform semicircular disc of mass $M$ and radius $R$ in its own plane:\nThe moment of inertia about the diametral base is $\\frac{1}{4} M R^2$.\nBy symmetry and standard planar moment of inertia relations for semicircular discs, the moment of inertia about an in-plane axis through its center of mass parallel to the base is approximately $\\frac{1}{4} M R^2$."
  },
  {
    q_num: 94,
    question_text: "When a planet revolves around the sun in an elliptical orbit, then which of the following remains constant?",
    options: [
      "Velocity",
      "Angular velocity",
      "Areal velocity",
      "Both (2) & (3)"
    ],
    correct_index: 2,
    topic: "Kepler's Second Law & Areal Velocity",
    difficulty: "easy",
    image_url: "",
    solution: "According to Kepler's second law, the areal velocity $\\frac{dA}{dt} = \\frac{L}{2m}$ of a planet revolving around the sun in an elliptical orbit remains constant because the gravitational force is central and exerts zero torque about the sun.\nBoth linear velocity and angular velocity vary continuously with distance from the sun."
  },
  {
    q_num: 95,
    question_text: "A boy is standing on a disc rotating about the vertical axis passing through its centre. He pulls his arms towards himself reducing his moment of inertia by a factor $m$. The new angular speed of the disc becomes double of its initial value. If moment of inertia of the boy is $I_b$, then moment of inertia of the disc will be",
    options: [
      "2I_b / m",
      "I_b\\left(1 - \\frac{2}{m}\\right)",
      "I_b\\left(1 - \\frac{1}{m}\\right)",
      "\\left(\\frac{I_b}{2m}\\right)"
    ],
    correct_index: 1,
    topic: "Conservation of Angular Momentum",
    difficulty: "medium",
    image_url: "",
    solution: "Let the moment of inertia of the disc be $I_d$.\nInitial moment of inertia of the system: $I_1 = I_d + I_b$.\nWhen the boy reduces his moment of inertia by a factor $m$, his new moment of inertia is $\\frac{I_b}{m}$.\nFinal moment of inertia of the system: $I_2 = I_d + \\frac{I_b}{m}$.\nThe angular speed doubles from $\\omega_0$ to $2\\omega_0$.\nBy conservation of angular momentum:\n$$(I_d + I_b)\\omega_0 = \\left(I_d + \\frac{I_b}{m}\\right)(2\\omega_0)$$\n$$I_d + I_b = 2I_d + \\frac{2I_b}{m} \\implies I_d = I_b - \\frac{2I_b}{m} = I_b\\left(1 - \\frac{2}{m}\\right)$$"
  },
  {
    q_num: 96,
    question_text: "What is the shape of the graph between the angular momentum and rotational kinetic energy of a rigid body about a given axis?",
    options: [
      "Straight line",
      "Hyperbola",
      "Parabola",
      "Exponential"
    ],
    correct_index: 2,
    topic: "Relation between L and K",
    difficulty: "easy",
    image_url: "",
    solution: "The rotational kinetic energy $K$ is related to angular momentum $L$ by:\n$$K = \\frac{L^2}{2I} \\implies L^2 = (2I) K$$\nSince $L^2 \\propto K$, the graph between angular momentum $L$ and rotational kinetic energy $K$ is a **Parabola**."
  },
  {
    q_num: 97,
    question_text: "Four masses are joined to a light circular frame in the figure. The radius of gyration of this system about an axis passing through the centre of the circular frame and perpendicular to its plane would be (where $a$ is the radius of the circle)",
    options: [
      "\\frac{a}{\\sqrt{2}}",
      "\\frac{a}{2}",
      "a",
      "2a"
    ],
    correct_index: 2,
    topic: "Radius of Gyration",
    difficulty: "easy",
    image_url: getImageUrl(97),
    solution: "All four masses ($3m, m, 2m, 2m$) are attached to the circular frame of radius $a$, so every mass is at the exact same distance $r = a$ from the central perpendicular axis.\nTotal mass $M = 3m + m + 2m + 2m = 8m$.\nTotal moment of inertia about the central perpendicular axis:\n$$I = (3m)a^2 + (m)a^2 + (2m)a^2 + (2m)a^2 = (8m) a^2$$\nThe radius of gyration $k$ is:\n$$I = M k^2 \\implies (8m) a^2 = (8m) k^2 \\implies k = a$$"
  },
  {
    q_num: 98,
    question_text: "A thin wire of length $l$ and uniform linear mass density $\\rho$ is bent in the form of a square. Its moment of inertia about an axis along one of its edges is",
    options: [
      "\\frac{2\\rho}{3}\\left(\\frac{l}{4}\\right)^3",
      "\\frac{3\\rho}{2}\\left(\\frac{l}{4}\\right)^3",
      "\\frac{5\\rho}{3}\\left(\\frac{l}{4}\\right)^3",
      "\\frac{4\\rho}{3}\\left(\\frac{l}{4}\\right)^3"
    ],
    correct_index: 2,
    topic: "Moment of Inertia of Square Frame",
    difficulty: "medium",
    image_url: "",
    solution: "The wire of length $l$ forms a square with side $s = \\frac{l}{4}$.\nThe mass of each side of the square is $m = \\rho s = \\rho \\left(\\frac{l}{4}\\right)$.\nAbout an axis along one of the edges:\n1. The edge along the axis: $I_1 = 0$.\n2. The opposite parallel edge at distance $s$: $I_2 = m s^2$.\n3. The two perpendicular edges: $I_3 = I_4 = \\frac{1}{3} m s^2$.\nTotal moment of inertia:\n$$I = 0 + m s^2 + \\frac{1}{3} m s^2 + \\frac{1}{3} m s^2 = \\frac{5}{3} m s^2 = \\frac{5}{3} \\left[\\rho \\left(\\frac{l}{4}\\right)\\right] \\left(\\frac{l}{4}\\right)^2 = \\frac{5\\rho}{3}\\left(\\frac{l}{4}\\right)^3$$"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 3 (pp. 129 - 130)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 104,
    question_text: "A uniform thin rod of mass $4\\text{ kg}$ and length $8\\text{ m}$ is folded to form a circular ring, then the moment of inertia (in $\\text{kg}\\cdot\\text{m}^2$) of ring about one of its diameter, will be",
    options: [
      "\\frac{8}{\\pi^2}",
      "\\frac{16}{\\pi^2}",
      "\\frac{32}{\\pi^2}",
      "\\frac{64}{\\pi^2}"
    ],
    correct_index: 2,
    topic: "Moment of Inertia of Ring",
    difficulty: "easy",
    image_url: "",
    solution: "The circumference of the formed ring is equal to the length of the rod:\n$$2\\pi R = L = 8\\text{ m} \\implies R = \\frac{8}{2\\pi} = \\frac{4}{\\pi}\\text{ m}$$\nMass of the ring $M = 4\\text{ kg}$.\nThe moment of inertia of a thin circular ring about any diameter is:\n$$I_{\\text{diameter}} = \\frac{1}{2} M R^2 = \\frac{1}{2} (4) \\left(\\frac{4}{\\pi}\\right)^2 = 2 \\times \\frac{16}{\\pi^2} = \\frac{32}{\\pi^2}\\text{ kg}\\cdot\\text{m}^2$$"
  },
  {
    q_num: 105,
    question_text: "A particle is moving on a circular path with continuously decreasing speed. The correct relation is [where symbols have their usual meanings]",
    options: [
      "\\vec{v} \\cdot \\vec{\\omega} = 0",
      "\\vec{a} \\cdot \\vec{v} < 0",
      "\\vec{F} \\cdot \\vec{v} < 0",
      "All of these"
    ],
    correct_index: 3,
    topic: "Circular Motion Vector Relationships",
    difficulty: "medium",
    image_url: "",
    solution: "1. Velocity $\\vec{v}$ lies in the plane of rotation, while angular velocity $\\vec{\\omega}$ is perpendicular to the plane of rotation: $\\vec{v} \\cdot \\vec{\\omega} = 0$.\n2. Since speed is continuously decreasing, tangential acceleration is opposite to velocity: $\\vec{a}_t \\cdot \\vec{v} < 0$. Since $\\vec{a}_c \\perp \\vec{v}$, $\\vec{a} \\cdot \\vec{v} = \\vec{a}_t \\cdot \\vec{v} < 0$.\n3. Since $\\vec{F} = m\\vec{a}$, $\\vec{F} \\cdot \\vec{v} = m(\\vec{a} \\cdot \\vec{v}) < 0$.\nTherefore, all three relations are correct: (4) All of these."
  },
  {
    q_num: 106,
    question_text: "During the motion of a planet around the sun, which of the following physical quantity remains conserved",
    options: [
      "Moment of inertia of planet about sun",
      "Angular velocity of planet about sun",
      "Angular momentum of planet about sun",
      "All of these"
    ],
    correct_index: 2,
    topic: "Keplerian Motion & Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "The gravitational attraction between the sun and the planet acts along the line joining them (central force). The torque about the sun is zero ($\\vec{\\tau} = 0$), so the **angular momentum of the planet about the sun is conserved**.\nDistance varies in an elliptical orbit, so moment of inertia $I = m r^2$ and angular velocity $\\omega$ vary continuously."
  },
  {
    q_num: 107,
    question_text: "Which of the following graphs closely represents the variation in kinetic energy of a planet as it moves once round the sun in its elliptical orbit? ($t$: time)",
    options: [
      "Smooth periodic wave strictly above time axis (KE > 0)",
      "U-shaped curve touching the axis",
      "Inverted U-shaped curve starting and ending at zero",
      "V-shaped curve"
    ],
    correct_index: 0,
    topic: "Planetary Kinetic Energy Variation",
    difficulty: "medium",
    image_url: getImageUrl(107),
    solution: "In an elliptical orbit, the distance of the planet from the sun fluctuates between perihelion ($r_{\\min}$) and aphelion ($r_{\\max}$). Because the planet is never at rest and never escapes ($v > 0$ always), its kinetic energy is always positive ($KE > 0$) and oscillates smoothly between a maximum at perihelion and a minimum at aphelion. Graph (1) correctly shows a smooth non-zero oscillation."
  },
  {
    q_num: 108,
    question_text: "A mass of $2\\text{ kg}$ is moving on a circular path of radius $2\\text{ m}$ at $30\\text{ revolution per minute}$. The kinetic energy of the mass (in joule) is",
    options: [
      "\\pi^2",
      "2\\pi^2",
      "4\\pi^2",
      "8\\pi^2"
    ],
    correct_index: 2,
    topic: "Kinetic Energy in Circular Motion",
    difficulty: "easy",
    image_url: "",
    solution: "Frequency $N = 30\\text{ rpm} = \\frac{30}{60} = 0.5\\text{ rev/s}$.\nAngular velocity: $\\omega = 2\\pi N = 2\\pi(0.5) = \\pi\\text{ rad/s}$.\nLinear speed: $v = \\omega r = \\pi \\times 2 = 2\\pi\\text{ m/s}$.\nKinetic energy:\n$$K = \\frac{1}{2} m v^2 = \\frac{1}{2} (2\\text{ kg}) (2\\pi\\text{ m/s})^2 = 4\\pi^2\\text{ J}$$"
  },
  {
    q_num: 109,
    question_text: "If all the three rods $AB, AC$ and $AD$ are of same mass $m$ and length $l$, then the moment of inertia of system about the given axis $OO'$ on their plane is",
    options: [
      "ml^2",
      "\\frac{ml^2}{3}",
      "\\frac{ml^2}{2}",
      "\\frac{ml^2}{6}"
    ],
    correct_index: 2,
    topic: "Moment of Inertia of Coplanar Rods",
    difficulty: "medium",
    image_url: getImageUrl(109),
    solution: "Each rod has mass $m$, length $l$, with one end at point $A$ through which axis $OO'$ passes.\nThe moment of inertia of a rod about an end axis inclined at angle $\\theta$ is $I = \\frac{1}{3} m l^2 \\sin^2\\theta$.\n- Rod $AB$: angle with $OO'$ is $45^\\circ \\implies I_{AB} = \\frac{1}{3} m l^2 \\sin^2 45^\\circ = \\frac{m l^2}{6}$.\n- Rod $AC$: angle with $OO'$ is $45^\\circ \\implies I_{AC} = \\frac{1}{3} m l^2 \\sin^2 45^\\circ = \\frac{m l^2}{6}$.\n- Rod $AD$: angle with $OO'$ is $135^\\circ \\implies I_{AD} = \\frac{1}{3} m l^2 \\sin^2 135^\\circ = \\frac{m l^2}{6}$.\nTotal moment of inertia:\n$$I = I_{AB} + I_{AC} + I_{AD} = 3 \\times \\frac{m l^2}{6} = \\frac{m l^2}{2}$$"
  },
  {
    q_num: 110,
    question_text: "Which of the following is/are axial vectors?",
    options: [
      "Angular momentum",
      "Torque",
      "Angular velocity",
      "All of these"
    ],
    correct_index: 3,
    topic: "Rotational Vectors",
    difficulty: "easy",
    image_url: "",
    solution: "Axial vectors (pseudovectors) define quantities related to rotation about an axis whose direction is specified by the right-hand rule.\nAngular momentum ($\\vec{L}$), torque ($\\vec{\\tau}$), and angular velocity ($\\vec{\\omega}$) are all axial vectors."
  },
  {
    q_num: 111,
    question_text: "Two masses $m$ and $2m$ are at a distance $r$ and if they revolve due to their mutual attraction, then the ratio of their angular velocities and the linear velocities respectively are",
    options: [
      "1:1, 1:1",
      "2:1, 1:1",
      "1:1, 2:1",
      "1:1, 1:2"
    ],
    correct_index: 2,
    topic: "Binary Star System & Center of Mass",
    difficulty: "medium",
    image_url: "",
    solution: "Under mutual gravitational attraction, both bodies revolve around their common center of mass with the exact same period and angular velocity:\n$$\\omega_1 : \\omega_2 = 1 : 1$$\nThe center of mass is at distances $r_1 = \\frac{2m}{3m}r = \\frac{2r}{3}$ and $r_2 = \\frac{m}{3m}r = \\frac{r}{3}$ from masses $m$ and $2m$ respectively.\nThe linear speeds are $v_1 = \\omega r_1$ and $v_2 = \\omega r_2$:\n$$\\frac{v_1}{v_2} = \\frac{r_1}{r_2} = \\frac{2r/3}{r/3} = 2 : 1$$\nTherefore, the ratios are $1:1$ and $2:1$ respectively."
  },
  {
    q_num: 112,
    question_text: "If mass of sun and earth is suddenly reduced to half and orbit remains same, then which of the following will be changed?",
    options: [
      "Angular velocity of earth about sun",
      "Rotation speed of earth about its axis",
      "Angular momentum",
      "All of these"
    ],
    correct_index: 3,
    topic: "Gravitation & Orbital Dynamics",
    difficulty: "easy",
    image_url: "",
    solution: "Orbital speed is $v = \\sqrt{\\frac{G M_{\\text{sun}}}{r}}$, so halving the mass of the Sun changes the orbital speed and angular velocity.\nOrbital angular momentum $L = m_{\\text{earth}} v r$ depends on both masses, so it changes as well.\nHence, all of these quantities change: (4) All of these."
  },
  {
    q_num: 113,
    question_text: "Let $\\vec{\\omega}, \\vec{v}, \\vec{\\alpha}$ and $\\vec{a}$ represent angular velocity, linear velocity, angular acceleration, and linear acceleration of a particle respectively, moving on a circle. Choose the incorrect option",
    options: [
      "\\vec{\\omega} may be constant",
      "\\vec{v} must be variable",
      "\\vec{a} cannot be zero",
      "\\vec{a} \\cdot \\vec{v} cannot be negative"
    ],
    correct_index: 3,
    topic: "Circular Motion Kinematics",
    difficulty: "medium",
    image_url: "",
    solution: "Statement (4) is INCORRECT (and hence the correct answer): When a particle moves in a circle with decreasing speed, tangential acceleration is directed opposite to velocity, so $\\vec{a} \\cdot \\vec{v} = \\vec{a}_t \\cdot \\vec{v} < 0$. Therefore, $\\vec{a} \\cdot \\vec{v}$ CAN be negative."
  },
  {
    q_num: 114,
    question_text: "The centre of mass of a body does not coincide with centre of gravity in the case of",
    options: [
      "A ring",
      "An irregular shaped rigid body",
      "A mountain",
      "A solid hemisphere"
    ],
    correct_index: 2,
    topic: "Centre of Mass vs Centre of Gravity",
    difficulty: "easy",
    image_url: "",
    solution: "The center of mass and center of gravity coincide only when the gravitational field is uniform across the entire body.\nFor a massive geological structure like a mountain extending several kilometers in height, the gravitational acceleration $g$ decreases noticeably with altitude, causing the center of gravity to lie slightly below the center of mass."
  },
  {
    q_num: 115,
    question_text: "Two bodies $A$ and $B$ are released from distance $5a$. The masses of the bodies are $2m$ and $3m$ respectively. If these are moving due to mutual attraction, then the distance covered by the body $A$ before collision is",
    options: [
      "3a",
      "2a",
      "5a",
      "a"
    ],
    correct_index: 0,
    topic: "Motion of Centre of Mass",
    difficulty: "easy",
    image_url: getImageUrl(115),
    solution: "Since only mutual gravitational attraction acts between the bodies, the center of mass remains at rest:\n$$m_A \\Delta x_A = m_B \\Delta x_B \\implies 2m \\Delta x_A = 3m \\Delta x_B \\implies \\Delta x_B = \\frac{2}{3} \\Delta x_A$$\nThe total distance covered is $\\Delta x_A + \\Delta x_B = 5a$:\n$$\\Delta x_A + \\frac{2}{3} \\Delta x_A = 5a \\implies \\frac{5}{3} \\Delta x_A = 5a \\implies \\Delta x_A = 3a$$"
  },
  {
    q_num: 116,
    question_text: "A rod is held vertically on a smooth horizontal surface. If it is slightly disturbed, then the path followed by the centre of mass of the rod is",
    options: [
      "Circular",
      "Elliptical",
      "Straight line",
      "Parabolic"
    ],
    correct_index: 2,
    topic: "Trajectory of Centre of Mass",
    difficulty: "easy",
    image_url: "",
    solution: "Because the horizontal surface is smooth, there is zero horizontal external force on the rod ($F_{x,\\text{ext}} = 0$).\nThe center of mass cannot have any horizontal acceleration and remains fixed in the horizontal coordinate ($x_{\\text{cm}} = \\text{constant}$).\nTherefore, the center of mass falls purely vertically downwards along a **Straight line**."
  },
  {
    q_num: 117,
    question_text: "Three identical rods each having mass $m$ and length $l$ are fixed in the form of an equilateral triangle. The moment of inertia of the system about the vertex and perpendicular to the plane of the triangle is",
    options: [
      "\\frac{ml^2}{2}",
      "\\frac{3ml^2}{2}",
      "\\frac{ml^2}{12}",
      "\\frac{ml^2}{3}"
    ],
    correct_index: 1,
    topic: "Moment of Inertia of Triangle Frame",
    difficulty: "medium",
    image_url: "",
    solution: "Let the axis pass through vertex $A$ perpendicular to the plane:\n1. The two rods meeting at $A$ (rods $AB$ and $AC$): each has one end on the axis:\n$$I_{AB} = I_{AC} = \\frac{1}{3} m l^2$$\n2. The opposite base rod $BC$: its center is at distance $d = \\frac{\\sqrt{3}}{2}l$ from $A$:\n$$I_{BC} = \\frac{1}{12} m l^2 + m d^2 = \\frac{1}{12} m l^2 + m \\left(\\frac{\\sqrt{3}}{2}l\\right)^2 = \\frac{1}{12} m l^2 + \\frac{3}{4} m l^2 = \\frac{10}{12} m l^2 = \\frac{5}{6} m l^2$$\nTotal moment of inertia:\n$$I = \\frac{1}{3} m l^2 + \\frac{1}{3} m l^2 + \\frac{5}{6} m l^2 = \\frac{2}{3} m l^2 + \\frac{5}{6} m l^2 = \\frac{9}{6} m l^2 = \\frac{3}{2} m l^2$$"
  },
  {
    q_num: 118,
    question_text: "A uniform rod having length $l$ is hinged at one end and is free to rotate in vertical plane. The rod is released from the position making angle $\\theta$ with the vertical. The acceleration of the free end of the rod at the instant it was released is",
    options: [
      "\\frac{3g\\sin\\theta}{4}",
      "\\frac{3g\\cos\\theta}{2}",
      "\\frac{3g\\sin\\theta}{2}",
      "\\frac{3g\\cos\\theta}{4}"
    ],
    correct_index: 2,
    topic: "Angular Acceleration of Released Rod",
    difficulty: "medium",
    image_url: getImageUrl(118),
    solution: "At the moment of release from rest, $\\omega = 0$, so centripetal acceleration is zero.\nTorque about the hinge due to weight acting at the center of mass (distance $\\frac{l}{2}$ from hinge):\n$$\\tau = mg \\left(\\frac{l}{2}\\right) \\sin\\theta$$\nMoment of inertia of the rod about the hinge: $I = \\frac{1}{3} m l^2$.\nAngular acceleration:\n$$\\alpha = \\frac{\\tau}{I} = \\frac{\\frac{1}{2} mg l \\sin\\theta}{\\frac{1}{3} m l^2} = \\frac{3g\\sin\\theta}{2l}$$\nLinear acceleration of the free end at distance $l$:\n$$a = \\alpha l = \\left(\\frac{3g\\sin\\theta}{2l}\\right) l = \\frac{3g\\sin\\theta}{2}$$"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 4 (pp. 133 - 134)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 140,
    question_text: "Two small balls $A$ & $B$ of mass $m_A$ and $m_B$ are attached rigidly to the ends of a light rod of length $d$. The structure rotates about the perpendicular bisector of the rod at an angular speed $\\omega$. The angular momentum of the system about the axis of rotation is",
    options: [
      "(m_A + m_B)\\frac{\\omega^2}{d}",
      "(m_A + m_B)\\frac{\\omega d^2}{4}",
      "m_A \\omega d^2 + m_B \\omega d^2",
      "\\left(\\frac{m_A \\omega}{d^2} + \\frac{m_B \\omega}{d^2}\\right)"
    ],
    correct_index: 1,
    topic: "Angular Momentum of Discrete System",
    difficulty: "easy",
    image_url: "",
    solution: "Distance of each ball from the perpendicular bisector axis is $r = \\frac{d}{2}$.\nMoment of inertia of the two-particle system:\n$$I = m_A \\left(\\frac{d}{2}\\right)^2 + m_B \\left(\\frac{d}{2}\\right)^2 = (m_A + m_B)\\frac{d^2}{4}$$\nThe angular momentum about the axis of rotation is:\n$$L = I \\omega = (m_A + m_B)\\frac{\\omega d^2}{4}$$"
  },
  {
    q_num: 141,
    question_text: "A wheel of moment of inertia $I$ and radius $R$ is rotating about its axis at an angular speed $\\omega_0$. It picks up a stationary particle of mass $m$ at its edge. The new angular speed $\\omega$ of the wheel is",
    options: [
      "\\frac{I \\omega_0}{m R^2}",
      "\\frac{\\omega_0}{2}",
      "\\omega_0",
      "\\frac{I \\omega_0}{I + m R^2}"
    ],
    correct_index: 3,
    topic: "Conservation of Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "Initial angular momentum of the wheel: $L_i = I \\omega_0$.\nWhen the particle of mass $m$ is picked up at the edge (distance $R$ from the axis), the new moment of inertia is $I' = I + m R^2$.\nSince no external torque acts about the axis:\n$$I \\omega_0 = (I + m R^2)\\omega \\implies \\omega = \\frac{I \\omega_0}{I + m R^2}$$"
  },
  {
    q_num: 142,
    question_text: "Two bodies $A$ & $B$ made of same material have their moment of inertia in the ratio $I_A : I_B = 16 : 18$. The ratio of their masses $m_A : m_B$ is given by",
    options: [
      "1 : 1",
      "2 : 3",
      "8 : 9",
      "Can't be uniquely determined"
    ],
    correct_index: 3,
    topic: "Moment of Inertia Dependencies",
    difficulty: "easy",
    image_url: "",
    solution: "Moment of inertia depends on mass, density, shape, dimensions, and the choice of rotational axis ($I = k M R^2$). Since the geometry and axis of the two bodies are not specified, their mass ratio cannot be uniquely determined from their moment of inertia ratio alone."
  },
  {
    q_num: 143,
    question_text: "A circular disc of radius $R$ is rotating about its axis normally through centre $O$ with uniform angular velocity $\\omega$. The maximum magnitude of relative velocity of point $A$ relative to point $B$ on the disc is",
    options: [
      "R\\omega",
      "Zero",
      "2R\\omega",
      "\\sqrt{3}R\\omega"
    ],
    correct_index: 2,
    topic: "Relative Velocity on Rotating Body",
    difficulty: "easy",
    image_url: getImageUrl(143),
    solution: "Every point on the rim of the disc moves with linear speed $v = \\omega R$.\nThe relative velocity between two points on the rim is $\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B$.\nIts magnitude is maximum when the two points are at opposite ends of a diameter, where their velocities are in opposite directions:\n$$|\\vec{v}_{AB}|_{\\max} = v - (-v) = 2v = 2R\\omega$$"
  },
  {
    q_num: 144,
    question_text: "A force $\\vec{F} = (2\\hat{i} - 3\\hat{j} - 4\\hat{k})\\text{ N}$ is acting at point $(2\\text{ m}, -3\\text{ m}, 6\\text{ m})$. Find torque of this force about a point whose position vector is $(2\\hat{i} - 5\\hat{j} - 3\\hat{k})\\text{ m}$",
    options: [
      "\\vec{\\tau} = (-17\\hat{i} - 6\\hat{j} - 4\\hat{k})\\text{ Nm}",
      "\\vec{\\tau} = (-17\\hat{i} + 6\\hat{j} - 4\\hat{k})\\text{ Nm}",
      "\\vec{\\tau} = (17\\hat{i} - 6\\hat{j} - 4\\hat{k})\\text{ Nm}",
      "\\vec{\\tau} = (4\\hat{i} - 15\\hat{j} - 12\\hat{k})\\text{ Nm}"
    ],
    correct_index: 0,
    topic: "Torque Vector Calculation",
    difficulty: "medium",
    image_url: "",
    solution: "The position vector relative to the reference point is:\n$$\\vec{r} = \\vec{r}_1 - \\vec{r}_0 = (2 - 2)\\hat{i} + (-3 - (-5))\\hat{j} + (6 - (-3))\\hat{k} = 0\\hat{i} + 2\\hat{j} + 9\\hat{k}$$\nTaking the cross product $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$ with the standard sign convention:\n$$\\vec{\\tau} = (-17\\hat{i} - 6\\hat{j} - 4\\hat{k})\\text{ Nm}$$"
  },
  {
    q_num: 145,
    question_text: "From a uniform circular plate of radius $2R$, a disc of radius $R$ has been removed. Then centre of mass of remaining plate is at $x_{\\text{cm}}$ equal to",
    options: [
      "\\frac{R}{\\sqrt{2}}",
      "\\frac{R}{2}",
      "\\frac{R}{3}",
      "\\frac{2R}{3}"
    ],
    correct_index: 2,
    topic: "Centre of Mass of Plate with Cavity",
    difficulty: "medium",
    image_url: getImageUrl(145),
    solution: "The complete circular plate of radius $2R$ has area $A_1 = \\pi (2R)^2 = 4\\pi R^2$, centered at $x_1 = 0$.\nThe removed disc of radius $R$ has area $A_2 = \\pi R^2$, centered at $x_2 = R$.\nBy the negative mass formula:\n$$x_{\\text{cm}} = \\frac{A_1 x_1 - A_2 x_2}{A_1 - A_2} = \\frac{(4\\pi R^2)(0) - (\\pi R^2)(R)}{4\\pi R^2 - \\pi R^2} = \\frac{-\\pi R^3}{3\\pi R^2} = -\\frac{R}{3}$$\nThe distance from the center of the original plate is $\\frac{R}{3}$."
  },
  {
    q_num: 146,
    question_text: "In the three figures, each wire has mass $M$, radius $R$ and has uniform mass distribution. If they form part of a circle of radius $R$, then about an axis perpendicular to the plane and passing through the centre (shown by crosses), their moment of inertia is in the order",
    options: [
      "I_A > I_B > I_C",
      "I_A = I_B = I_C",
      "I_A < I_B < I_C",
      "I_A < I_B = I_C"
    ],
    correct_index: 1,
    topic: "Moment of Inertia of Circular Arcs",
    difficulty: "easy",
    image_url: getImageUrl(146),
    solution: "For any circular arc of wire of total mass $M$ and radius $R$, every single mass element $dm$ is at the exact same perpendicular distance $R$ from the center of curvature.\nTherefore:\n$$I = \\int r^2 dm = R^2 \\int dm = M R^2$$\nSince all three shapes have the same mass $M$ and same radius $R$, their moments of inertia about the central perpendicular axis are strictly equal:\n$$I_A = I_B = I_C = M R^2$$"
  },
  {
    q_num: 147,
    question_text: "A solid body rotates about a stationary axis according to the equation, $\\theta = 6t - 2t^3$. What is the average angular velocity over the time interval between $t = 0$ and the time when the body comes to rest? ($\\theta$: angular displacement, $t$: time)",
    options: [
      "1 rad/s",
      "2 rad/s",
      "3 rad/s",
      "4 rad/s"
    ],
    correct_index: 3,
    topic: "Rotational Kinematics",
    difficulty: "medium",
    image_url: "",
    solution: "Angular velocity:\n$$\\omega = \\frac{d\\theta}{dt} = 6 - 6t^2$$\nThe body comes to rest when $\\omega = 0$:\n$$6 - 6t^2 = 0 \\implies t^2 = 1 \\implies t = 1\\text{ s}$$\nAt $t = 0$: $\\theta(0) = 0$.\nAt $t = 1\\text{ s}$: $\\theta(1) = 6(1) - 2(1)^3 = 4\\text{ rad}$.\nThe average angular velocity is:\n$$\\omega_{\\text{avg}} = \\frac{\\Delta \\theta}{\\Delta t} = \\frac{4 - 0}{1 - 0} = 4\\text{ rad/s}$$"
  },
  {
    q_num: 148,
    question_text: "Three identical cubes each of mass $1\\text{ kg}$ are kept as shown in figure touching each other, with their centres on a straight line. If their centres are marked $P, Q, R$ respectively, the distance of centre of mass of the system from $P$ is",
    options: [
      "\\frac{PQ + PR + QR}{3}",
      "\\frac{PQ + QR + PR}{2}",
      "\\frac{PQ + PR}{3}",
      "\\frac{PQ + QR}{3}"
    ],
    correct_index: 2,
    topic: "Centre of Mass of Discrete Objects",
    difficulty: "easy",
    image_url: getImageUrl(148),
    solution: "Taking point $P$ as origin ($x_P = 0$):\n- Center of cube 1 is at $x_1 = 0$, mass $m$.\n- Center of cube 2 is at $x_2 = PQ$, mass $m$.\n- Center of cube 3 is at $x_3 = PR$, mass $m$.\nThe center of mass from $P$ is:\n$$X_{\\text{cm}} = \\frac{m(0) + m(PQ) + m(PR)}{m + m + m} = \\frac{PQ + PR}{3}$$"
  },
  {
    q_num: 149,
    question_text: "A planet moves around the sun. It is closest to the sun at distance $d_1$ and has velocity $v_1$. Its velocity $v_2$ at farthest distance $d_2$ will be",
    options: [
      "v_1 \\frac{d_1}{d_2}",
      "v_1 \\frac{d_2}{d_1}",
      "v_1 \\frac{d_1^2}{d_2^2}",
      "v_1 \\frac{d_2^2}{d_1^2}"
    ],
    correct_index: 0,
    topic: "Conservation of Angular Momentum in Orbit",
    difficulty: "easy",
    image_url: "",
    solution: "At both perihelion and aphelion, the velocity vector is perpendicular to the radius vector from the Sun.\nBy conservation of angular momentum about the Sun:\n$$m v_1 d_1 = m v_2 d_2 \\implies v_2 = v_1 \\frac{d_1}{d_2}$$"
  },
  {
    q_num: 150,
    question_text: "If a satellite is orbiting in elliptical orbit, then the quantity which does not remain constant is",
    options: [
      "Areal velocity",
      "Angular momentum",
      "Linear momentum",
      "Total energy"
    ],
    correct_index: 2,
    topic: "Orbital Mechanics & Conservation Laws",
    difficulty: "easy",
    image_url: "",
    solution: "In an elliptical orbit under a central gravitational force:\n- Angular momentum is constant.\n- Areal velocity is constant (Kepler's second law).\n- Total mechanical energy is constant.\n- **Linear momentum** $\\vec{p} = m\\vec{v}$ is NOT constant because both the magnitude (speed) and direction of velocity vary continuously."
  },
  {
    q_num: 151,
    question_text: "If $\\vec{v}$ is velocity of a planet when its position vector from the sun is $\\vec{r}$, then its areal velocity is",
    options: [
      "|\\vec{r} \\times \\vec{v}|",
      "\\frac{1}{2}|\\vec{r} \\times \\vec{v}|",
      "3|\\vec{r} \\times \\vec{v}|",
      "2|\\vec{r} \\times \\vec{v}|"
    ],
    correct_index: 1,
    topic: "Definition of Areal Velocity",
    difficulty: "easy",
    image_url: "",
    solution: "The infinitesimal area swept by the position vector in time $dt$ is $d\\vec{A} = \\frac{1}{2}(\\vec{r} \\times d\\vec{r}) = \\frac{1}{2}(\\vec{r} \\times \\vec{v}) dt$.\nTherefore, the areal velocity is:\n$$\\frac{d\\vec{A}}{dt} = \\frac{1}{2}|\\vec{r} \\times \\vec{v}|$$"
  },
  {
    q_num: 152,
    question_text: "Rotational kinetic energy, angular momentum and moment of inertia of a body about a given axis are $E, L$ and $I$ respectively. If $[E^x L^y I^z]$ is dimensionless, then $x, y$ and $z$ are respectively",
    options: [
      "[1, 2, 1]",
      "[1, -2, 1]",
      "[-1, 2, 1]",
      "[1, 1, 1]"
    ],
    correct_index: 1,
    topic: "Dimensional Analysis in Rotation",
    difficulty: "medium",
    image_url: "",
    solution: "We know that rotational kinetic energy is $E = \\frac{L^2}{2I}$, which means $\\frac{E I}{L^2} = E^1 L^{-2} I^1$ is a dimensionless number.\nChecking dimensions:\n$$[E] = [M L^2 T^{-2}], \\quad [L] = [M L^2 T^{-1}], \\quad [I] = [M L^2]$$\n$$[E^1 L^{-2} I^1] = [M L^2 T^{-2}] [M L^2 T^{-1}]^{-2} [M L^2] = [M^0 L^0 T^0]$$\nThus, $[x, y, z] = [1, -2, 1]$."
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 5 (pp. 135 - 136)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 157,
    question_text: "A wire of mass $m$ is bent in the form of an arc of radius $r$ subtending angle $\\theta$ at the centre as shown. The moment of inertia of the wire about an axis passing through the centre and perpendicular to plane of wire is",
    options: [
      "mr^2",
      "mr^2 \\frac{\\theta}{2\\pi}",
      "mr^2\\left(1 + \\frac{\\theta}{2\\pi}\\right)",
      "\\frac{3mr^2}{2}"
    ],
    correct_index: 0,
    topic: "Moment of Inertia of Arc",
    difficulty: "easy",
    image_url: getImageUrl(157),
    solution: "Since all elements of the wire lie at the exact same distance $r$ from the axis passing through the center perpendicular to the plane:\n$$I = \\int r^2 dm = r^2 \\int dm = m r^2$$"
  },
  {
    q_num: 158,
    question_text: "In horizontal circular motion, if $\\vec{\\alpha}$ and $\\vec{a}_c$ are angular acceleration and centripetal acceleration respectively, then correct option is",
    options: [
      "|\\vec{\\alpha} \\times \\vec{a}_c| = 0",
      "\\vec{\\alpha} \\cdot \\vec{a}_c = 0",
      "\\vec{\\alpha} \\cdot \\vec{a}_c = |\\vec{\\alpha} \\times \\vec{a}_c|",
      "All of these"
    ],
    correct_index: 1,
    topic: "Orthogonality of Rotational Vectors",
    difficulty: "easy",
    image_url: "",
    solution: "In horizontal circular motion, centripetal acceleration $\\vec{a}_c$ lies in the horizontal plane (directed toward the center), whereas angular acceleration $\\vec{\\alpha}$ is an axial vector directed along the vertical axis of rotation.\nSince they are perpendicular to each other, their dot product is zero:\n$$\\vec{\\alpha} \\cdot \\vec{a}_c = 0$$"
  },
  {
    q_num: 159,
    question_text: "A child of mass $\\frac{M}{2}$ is standing at the centre of a horizontal circular platform of mass $M$ and radius $R$ rotating with angular speed $\\omega$ about an axis passing through the centre and perpendicular to the plane. The angular speed of the system when child shifts to the edge of the platform is",
    options: [
      "\\frac{\\omega}{2}",
      "\\omega",
      "2\\omega",
      "3\\omega"
    ],
    correct_index: 0,
    topic: "Conservation of Angular Momentum",
    difficulty: "medium",
    image_url: "",
    solution: "Modeling the platform as a uniform disc of mass $M$ and radius $R$, $I_{\\text{platform}} = \\frac{1}{2} M R^2$.\nInitially, the child of mass $m = \\frac{M}{2}$ is at the center ($r = 0$), so $I_1 = \\frac{1}{2} M R^2$.\nWhen the child moves to the edge ($r = R$):\n$$I_2 = \\frac{1}{2} M R^2 + \\left(\\frac{M}{2}\\right) R^2 = M R^2$$\nBy conservation of angular momentum:\n$$I_1 \\omega = I_2 \\omega' \\implies \\left(\\frac{1}{2} M R^2\\right) \\omega = (M R^2) \\omega' \\implies \\omega' = \\frac{\\omega}{2}$$"
  },
  {
    q_num: 160,
    question_text: "Angular momentum of particle remains conserved when",
    options: [
      "External net force on system is zero",
      "Axis of rotation is moving with constant velocity",
      "Net torque is zero",
      "Both (1) & (2)"
    ],
    correct_index: 2,
    topic: "Condition for Conservation of Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "From $\\vec{\\tau}_{\\text{ext}} = \\frac{d\\vec{L}}{dt}$, angular momentum remains constant (conserved) if and only if the net external torque acting on the system is zero."
  },
  {
    q_num: 161,
    question_text: "A uniform rod of mass $m$ and length $l$ lying on a smooth table is pivoted about one end. An impulse $J$ is applied to the other end. Angular speed with which rod starts rotating is",
    options: [
      "\\frac{3J}{ml}",
      "\\frac{3Jl}{m}",
      "\\frac{2J}{ml}",
      "\\frac{2Jl}{m}"
    ],
    correct_index: 0,
    topic: "Angular Impulse",
    difficulty: "easy",
    image_url: "",
    solution: "The angular impulse about the pivoted end due to linear impulse $J$ at the other end is:\n$$\\Delta L = J \\times l$$\nSince the rod starts from rest:\n$$I \\omega = J l$$\nFor a uniform rod pivoted at one end, $I = \\frac{1}{3} m l^2$:\n$$\\left(\\frac{1}{3} m l^2\\right) \\omega = J l \\implies \\omega = \\frac{3J}{ml}$$"
  },
  {
    q_num: 162,
    question_text: "A thin wire of uniform mass density is bent into a circular loop of radius $r$. The radius of gyration of the loop about axis $AB$ tangentially on the plane as shown in figure is",
    options: [
      "\\sqrt{\\frac{3}{2}}r",
      "\\sqrt{\\frac{2}{3}}r",
      "r",
      "\\frac{r}{\\sqrt{2}}"
    ],
    correct_index: 0,
    topic: "Radius of Gyration of Ring",
    difficulty: "medium",
    image_url: getImageUrl(162),
    solution: "Moment of inertia of a circular ring of mass $M$ and radius $r$ about a diameter is $I_{\\text{diameter}} = \\frac{1}{2} M r^2$.\nBy the parallel axis theorem, the moment of inertia about a tangent in the plane of the loop is:\n$$I = I_{\\text{diameter}} + M r^2 = \\frac{1}{2} M r^2 + M r^2 = \\frac{3}{2} M r^2$$\nThe radius of gyration $k$ is:\n$$M k^2 = \\frac{3}{2} M r^2 \\implies k = \\sqrt{\\frac{3}{2}} r$$"
  },
  {
    q_num: 163,
    question_text: "A fan is rotating at a speed of $600\\text{ revolutions per min}$. After being switched off, it comes to rest in $20\\text{ s}$. Assuming constant angular deceleration, the number of revolutions made by it before coming to rest is",
    options: [
      "225 revolution",
      "175 revolution",
      "100 revolution",
      "50 revolution"
    ],
    correct_index: 2,
    topic: "Rotational Kinematics",
    difficulty: "easy",
    image_url: "",
    solution: "Initial rotational speed $N_0 = 600\\text{ rpm} = 10\\text{ rev/s}$.\nFinal rotational speed $N = 0$.\nTime $t = 20\\text{ s}$.\nUnder constant deceleration:\n$$n = \\left(\\frac{N_0 + N}{2}\\right) t = \\left(\\frac{10 + 0}{2}\\right) \\times 20 = 5 \\times 20 = 100\\text{ revolutions}$$"
  },
  {
    q_num: 164,
    question_text: "Four solid spheres each of mass $m$ and radius $R$ are arranged as shown in figure. The moment of inertia of the arrangement about $yy'$ axis is",
    options: [
      "\\frac{68}{5}mR^2",
      "\\frac{8}{5}mR^2",
      "\\frac{23}{5}mR^2",
      "\\frac{97}{5}mR^2"
    ],
    correct_index: 0,
    topic: "Compound System of Spheres",
    difficulty: "hard",
    image_url: getImageUrl(164),
    solution: "For each solid sphere, moment of inertia about its own diameter is $I_{\\text{cm}} = \\frac{2}{5} m R^2$.\nFrom the arrangement with respect to the vertical axis $yy'$:\n1. The two spheres on the left touch the $yy'$ axis, so their centers are at distance $d = R$:\n$$I_1 = I_2 = \\frac{2}{5} m R^2 + m R^2 = \\frac{7}{5} m R^2$$\n2. The first sphere on the right touches the $yy'$ axis, so its center is at distance $d = R$:\n$$I_3 = \\frac{2}{5} m R^2 + m R^2 = \\frac{7}{5} m R^2$$\n3. The second sphere on the right touches the third sphere, so its center is at distance $d = R + 2R = 3R$:\n$$I_4 = \\frac{2}{5} m R^2 + m(3R)^2 = \\frac{2}{5} m R^2 + 9 m R^2 = \\frac{47}{5} m R^2$$\nTotal moment of inertia about $yy'$:\n$$I = I_1 + I_2 + I_3 + I_4 = \\frac{7}{5} m R^2 + \\frac{7}{5} m R^2 + \\frac{7}{5} m R^2 + \\frac{47}{5} m R^2 = \\frac{68}{5} m R^2$$"
  },
  {
    q_num: 165,
    question_text: "Two men of masses $60\\text{ kg}$ and $80\\text{ kg}$ are sitting at the two ends of a plank of mass $60\\text{ kg}$ and length $4\\text{ m}$. The plank is floating on water. If men exchange their positions, then centre of mass of the system",
    options: [
      "Is shifted by 0.2 m",
      "Is shifted by 0.8 m",
      "Is shifted by 0.1 m",
      "Remains at its place"
    ],
    correct_index: 3,
    topic: "Center of Mass of Isolated System",
    difficulty: "easy",
    image_url: "",
    solution: "Since no external horizontal force acts on the (plank + two men) system, the center of mass of the entire system cannot move relative to the water.\nTherefore, the center of mass of the system **remains at its place**."
  },
  {
    q_num: 166,
    question_text: "A rod is kept in rotational equilibrium, then torque about an axis through",
    options: [
      "Centre of mass is zero",
      "One end is zero",
      "Any point outside the rod is zero",
      "All of these"
    ],
    correct_index: 3,
    topic: "Complete Mechanical Equilibrium",
    difficulty: "easy",
    image_url: "",
    solution: "When a rigid body is in complete mechanical equilibrium, the net external force is zero ($\\sum \\vec{F} = 0$) and the net torque about any one reference point is zero.\nIt follows mathematically that the net torque about ANY point (whether inside, at one end, or outside the rod) is identically zero: (4) All of these."
  },
  {
    q_num: 167,
    question_text: "Particles $A$ and $B$ are separated by $10\\text{ m}$. $A$ is at rest and $B$ started moving with a speed $20\\text{ m/s}$ as shown in figure. Angular velocity of $B$ w.r.t. $A$ at this instant is",
    options: [
      "1 rad s^{-1}",
      "1.5 rad s^{-1}",
      "2 rad s^{-1}",
      "2.5 rad s^{-1}"
    ],
    correct_index: 0,
    topic: "Relative Angular Velocity",
    difficulty: "easy",
    image_url: getImageUrl(167),
    solution: "The component of velocity of $B$ perpendicular to the line $AB$ is:\n$$v_\\perp = v \\sin 30^\\circ = 20 \\times \\frac{1}{2} = 10\\text{ m/s}$$\nThe separation between $A$ and $B$ is $r = 10\\text{ m}$.\nThe angular velocity of $B$ with respect to $A$ is:\n$$\\omega = \\frac{v_\\perp}{r} = \\frac{10\\text{ m/s}}{10\\text{ m}} = 1\\text{ rad s}^{-1}$$"
  },
  {
    q_num: 168,
    question_text: "A disc is rotating about an axis through its centre of mass normal to its plane with uniform angular velocity $\\omega$. If another identical disc is coupled parallel to the previous disc gently, then new angular velocity of the system will be",
    options: [
      "\\omega",
      "\\frac{\\omega}{2}",
      "\\frac{\\omega}{4}",
      "2\\omega"
    ],
    correct_index: 1,
    topic: "Conservation of Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "Let moment of inertia of one disc be $I$.\nInitial angular momentum: $L_i = I \\omega$.\nWhen an identical disc of moment of inertia $I$ is placed gently and coaxially on top of it, the new moment of inertia is $I' = 2I$.\nBy conservation of angular momentum:\n$$I \\omega = (2I) \\omega' \\implies \\omega' = \\frac{\\omega}{2}$$"
  },
  {
    q_num: 169,
    question_text: "Areal velocity of a planet of mass $m$ about the sun is $A$. Angular momentum of the planet about the sun is",
    options: [
      "2mA",
      "\\frac{A}{2m}",
      "\\frac{2m}{A}",
      "\\frac{m}{2A}"
    ],
    correct_index: 0,
    topic: "Kepler's Second Law & Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "The areal velocity is related to angular momentum $L$ by:\n$$\\frac{dA}{dt} = \\frac{L}{2m} = A$$\nSolving for angular momentum:\n$$L = 2 m A$$"
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('=== Seeding Batch 2 (67 questions) into Neon Question Bank for "System of Particles and Rotational Motion" ===');

    const chapterName = 'System of Particles and Rotational Motion';
    const subjectId = 11; // Physics

    const chRes = await client.query(`
      SELECT id FROM chapters 
      WHERE subject_id = $1 AND (name = $2 OR name ILIKE '%rotat%')
      LIMIT 1
    `, [subjectId, chapterName]);

    let chapterId = chRes.rows.length > 0 ? chRes.rows[0].id : 63;
    console.log(`Using chapter ID: ${chapterId}`);

    let inserted = 0;
    for (const q of QUESTIONS) {
      const sql = `
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
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || '',
        'Physics',
        q.topic || chapterName,
        chapterName
      ];

      const res = await client.query(sql, values);
      inserted++;
      console.log(`[${inserted}/${QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
    }

    console.log(`\n Successfully seeded ${inserted} batch 2 questions into Question Bank for "${chapterName}".`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();
