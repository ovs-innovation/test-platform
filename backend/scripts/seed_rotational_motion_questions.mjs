import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load diagram mappings
let diagrams = {};
try {
  const mapPath = path.resolve(__dirname, 'rotational_motion_diagrams.json');
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
  // PAGE 1 (pp. 115 - 116)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 1,
    question_text: "Position vector of center of mass of four point masses is",
    options: [
      "-0.42\\hat{i} + 2.75\\hat{j}",
      "2.5\\hat{i} - 0.42\\hat{j}",
      "-2.3\\hat{i} + 0.42\\hat{j}",
      "-2.5\\hat{i} + 0.81\\hat{j}"
    ],
    correct_index: 0,
    topic: "Centre of Mass of System of Particles",
    difficulty: "medium",
    image_url: getImageUrl(1),
    solution: "The position vector of the center of mass of a system of discrete particles is given by:\n$$\\vec{R}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i}$$\nTotal mass:\n$$M = m_1 + m_2 + m_3 + m_4 = 1 + 2 + 5 + 4 = 12\\text{ kg}$$\nCalculating the coordinates from the given grid positions:\n$$X_{\\text{cm}} = \\frac{5(-3) + 4(3) + 2(2) + 1(-2)}{12} = \\frac{-15 + 12 + 4 - 2}{12} = \\frac{-5}{12} \\approx -0.42\\text{ m}$$\n$$Y_{\\text{cm}} = \\frac{5(5) + 4(1) + 2(-2) + 1(-3)}{12} = \\frac{25 + 4 - 4 - 3}{12} = \\frac{33}{12} = 2.75\\text{ m}$$\nTherefore:\n$$\\vec{R}_{\\text{cm}} = -0.42\\hat{i} + 2.75\\hat{j}$$"
  },
  {
    q_num: 2,
    question_text: "The position of centre of mass of the uniform lamina shown in the following figure is",
    options: [
      "\\left(0, -\\frac{a}{6}\\right)",
      "\\left(-\\frac{a}{6}, -\\frac{a}{6}\\right)",
      "\\left(-\\frac{a}{6}, 0\\right)",
      "(0, 0)"
    ],
    correct_index: 2,
    topic: "Centre of Mass of Continuous Bodies",
    difficulty: "medium",
    image_url: getImageUrl(2),
    solution: "Let the complete circular lamina of radius $a$ be centered at $(0, 0)$ with area $A_1 = \\pi a^2$.\nA circular hole of radius $\\frac{a}{2}$ is cut out such that its center is at $\\left(\\frac{a}{2}, 0\\right)$ and its area is $A_2 = \\pi\\left(\\frac{a}{2}\\right)^2 = \\frac{\\pi a^2}{4}$.\nBy using the negative mass method:\n$$X_{\\text{cm}} = \\frac{A_1 x_1 - A_2 x_2}{A_1 - A_2} = \\frac{(\\pi a^2)(0) - \\left(\\frac{\\pi a^2}{4}\\right)\\left(\\frac{a}{2}\\right)}{\\pi a^2 - \\frac{\\pi a^2}{4}} = \\frac{-\\frac{\\pi a^3}{8}}{\\frac{3\\pi a^2}{4}} = -\\frac{a}{6}$$\nDue to symmetry about the $x$-axis, $Y_{\\text{cm}} = 0$.\nTherefore, the center of mass lies at $\\left(-\\frac{a}{6}, 0\\right)$."
  },
  {
    q_num: 3,
    question_text: "A projectile is fired at a speed of $100\\text{ m/s}$ at an angle of $37^\\circ$ above the horizontal. At the highest point, the projectile breaks into two parts of mass ratio $1:3$, the smaller coming to rest. Find the distance from the launching point to the point where the heavier piece lands.",
    options: [
      "960 m",
      "1120 m",
      "830 m",
      "720 m"
    ],
    correct_index: 1,
    topic: "Motion of Centre of Mass & Explosions",
    difficulty: "medium",
    image_url: "",
    solution: "Total mass is $M = m_1 + m_2$ with $m_1 = \\frac{M}{4}$ and $m_2 = \\frac{3M}{4}$.\nThe normal horizontal range without explosion is:\n$$R = \\frac{2 u^2 \\sin\\theta \\cos\\theta}{g} = \\frac{2 \\times 100^2 \\times 0.6 \\times 0.8}{10} = 960\\text{ m}$$\nThe explosion at the top occurs at $x = \\frac{R}{2} = 480\\text{ m}$.\nSince the explosion is due to internal forces alone, the center of mass follows the original parabolic trajectory and lands at $X_{\\text{cm}} = R = 960\\text{ m}$.\nThe smaller piece ($m_1$) comes to rest immediately after the explosion, so it falls vertically downwards from the highest point: $x_1 = \\frac{R}{2} = 480\\text{ m}$.\nUsing the center of mass formula:\n$$X_{\\text{cm}} = \\frac{m_1 x_1 + m_2 x_2}{M} \\implies R = \\frac{\\frac{M}{4}\\left(\\frac{R}{2}\\right) + \\frac{3M}{4}x_2}{M}$$\n$$R = \\frac{R}{8} + \\frac{3}{4}x_2 \\implies \\frac{3}{4}x_2 = \\frac{7}{8}R \\implies x_2 = \\frac{7}{6}R$$\n$$x_2 = \\frac{7}{6} \\times 960\\text{ m} = 1120\\text{ m}$$"
  },
  {
    q_num: 4,
    question_text: "Two spherical bodies of mass $M$ and $5M$ and radii $R$ and $2R$ are released in free space with initial separation between their centres equal to $12R$. If they attract each other due to gravitational force only, then the distance covered by the smaller body before collision is",
    options: [
      "1.5R",
      "2.5R",
      "4.5R",
      "7.5R"
    ],
    correct_index: 3,
    topic: "Centre of Mass & Gravitational Attraction",
    difficulty: "medium",
    image_url: "",
    solution: "Initial separation between their centres is $d_i = 12R$.\nAt the moment of collision, the two spheres touch each other, so the final separation between their centres is:\n$$d_f = R + 2R = 3R$$\nThe total relative displacement between their centres is:\n$$\\Delta r = d_i - d_f = 12R - 3R = 9R$$\nSince the spheres attract each other only due to internal gravitational forces, no external force acts on the system, and their center of mass remains stationary:\n$$m_1 \\Delta x_1 = m_2 \\Delta x_2 \\implies M \\Delta x_1 = 5M \\Delta x_2 \\implies \\Delta x_2 = \\frac{\\Delta x_1}{5}$$\nThe sum of their displacements is equal to the relative approach:\n$$\\Delta x_1 + \\Delta x_2 = 9R \\implies \\Delta x_1 + \\frac{\\Delta x_1}{5} = 9R$$\n$$\\frac{6}{5}\\Delta x_1 = 9R \\implies \\Delta x_1 = \\frac{5 \\times 9R}{6} = 7.5R$$"
  },
  {
    q_num: 5,
    question_text: "A particle of mass $m$ is projected from origin $O$ with speed $u$ at an angle $\\theta$ with positive $x$-axis. Positive $y$-axis is in vertical upward direction. Find the angular momentum of particle at any time $t$ about $O$ before the particle strikes the ground again.",
    options: [
      "-\\frac{1}{2}m(u\\cos\\theta)gt^2\\hat{k}",
      "m(u\\cos\\theta)gt^2\\hat{k}",
      "\\frac{1}{2}m(u\\cos\\theta)gt^2\\hat{k}",
      "-m(u\\cos\\theta)gt^2\\hat{k}"
    ],
    correct_index: 0,
    topic: "Angular Momentum of Projectile",
    difficulty: "medium",
    image_url: "",
    solution: "The position vector of the projectile at time $t$ is:\n$$\\vec{r}(t) = (u\\cos\\theta t)\\hat{i} + \\left(u\\sin\\theta t - \\frac{1}{2}gt^2\\right)\\hat{j}$$\nThe only force acting on the particle is gravity: $\\vec{F} = -mg\\hat{j}$.\nThe torque about the origin $O$ is:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = \\left[(u\\cos\\theta t)\\hat{i} + \\left(u\\sin\\theta t - \\frac{1}{2}gt^2\\right)\\hat{j}\\right] \\times (-mg\\hat{j})$$\n$$\\vec{\\tau} = -(mg u\\cos\\theta t)(\\hat{i} \\times \\hat{j}) = -(mg u\\cos\\theta t)\\hat{k}$$\nSince $\\vec{\\tau} = \\frac{d\\vec{L}}{dt}$ and initially $\\vec{L}(0) = 0$:\n$$\\vec{L}(t) = \\int_0^t \\vec{\\tau} dt = \\int_0^t -(mg u\\cos\\theta t)\\hat{k} dt = -\\frac{1}{2}m(u\\cos\\theta)gt^2\\hat{k}$$"
  },
  {
    q_num: 6,
    question_text: "$ABC$ is an equilateral triangle with $O$ as its centre. $\\vec{F}_1, \\vec{F}_2$ and $\\vec{F}_3$ represent three forces acting along the sides $AB, BC$ and $AC$ respectively. If the total torque about $O$ is zero then the magnitude of $\\vec{F}_3$ is",
    options: [
      "|F_1 - F_2|",
      "|F_1 + F_2|",
      "F_1 + F_2",
      "F_1 - F_2"
    ],
    correct_index: 2,
    topic: "Torque & Equilibrium of Rigid Body",
    difficulty: "easy",
    image_url: getImageUrl(6),
    solution: "Since $ABC$ is an equilateral triangle and $O$ is its centroid/incentre, the perpendicular distance from $O$ to all three sides ($AB, BC, AC$) is the same, equal to the inradius $r$.\nThe torque of each force about $O$ is $\\tau = F \\times r$.\nFrom the directions given in the diagram, $\\vec{F}_1$ along $AB$ and $\\vec{F}_2$ along $BC$ produce torques in the clockwise sense, while $\\vec{F}_3$ along $AC$ produces torque in the counter-clockwise sense.\nFor net torque about $O$ to be zero:\n$$\\sum \\tau_O = 0 \\implies F_1 r + F_2 r - F_3 r = 0$$\n$$F_3 = F_1 + F_2$$"
  },
  {
    q_num: 7,
    question_text: "A thin circular ring of mass $M$ and radius $r$ is rotating about its axis with a constant angular velocity $\\omega$. Two objects, each of mass $m$ are attached gently to the opposite ends of a diameter of the ring. The ring now rotates with an angular velocity",
    options: [
      "\\frac{\\omega M}{M + m}",
      "\\frac{\\omega(M - 2m)}{M + 2m}",
      "\\frac{\\omega M}{M + 2m}",
      "\\frac{\\omega(M + 2m)}{M}"
    ],
    correct_index: 2,
    topic: "Conservation of Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "Initial moment of inertia of the thin circular ring about its central axis:\n$$I_1 = M r^2$$\nInitial angular velocity is $\\omega$.\nWhen two masses $m$ are placed at opposite ends of a diameter, each is at a distance $r$ from the axis of rotation.\nThe new moment of inertia of the system becomes:\n$$I_2 = M r^2 + 2(m r^2) = (M + 2m) r^2$$\nSince the objects are attached gently, no external torque acts about the axis of rotation (${\\tau}_{\\text{ext}} = 0$).\nBy conservation of angular momentum:\n$$I_1 \\omega_1 = I_2 \\omega_2$$\n$$(M r^2) \\omega = (M + 2m) r^2 \\omega_2 \\implies \\omega_2 = \\frac{M \\omega}{M + 2m} = \\frac{\\omega M}{M + 2m}$$"
  },
  {
    q_num: 8,
    question_text: "A force $\\vec{F} = a\\hat{i} + 3\\hat{j} + 6\\hat{k}$ is acting at a point $\\vec{r} = 2\\hat{i} - 6\\hat{j} - 12\\hat{k}$. The value of $a$ for which angular momentum about origin is conserved is",
    options: [
      "2",
      "Zero",
      "1",
      "-1"
    ],
    correct_index: 3,
    topic: "Torque & Conservation of Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "Angular momentum about the origin is conserved if and only if the net external torque about the origin is zero:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$$\nFor the cross product of two non-zero vectors to vanish, the vectors must be collinear (parallel or antiparallel), meaning their corresponding components must be proportional:\n$$\\frac{r_x}{F_x} = \\frac{r_y}{F_y} = \\frac{r_z}{F_z}$$\n$$\\frac{2}{a} = \\frac{-6}{3} = \\frac{-12}{6} = -2$$\n$$\\frac{2}{a} = -2 \\implies a = -1$$"
  },
  {
    q_num: 9,
    question_text: "Three masses are placed on a light rod as shown in figure. For equilibrium of the system, value of mass $m$ should be",
    options: [
      "3 kg",
      "15 kg",
      "21 kg",
      "1 kg"
    ],
    correct_index: 1,
    topic: "Rotational Equilibrium of Levers",
    difficulty: "easy",
    image_url: getImageUrl(9),
    solution: "For the system to be in rotational equilibrium, the sum of torques about the fulcrum must be zero:\n$$\\sum \\tau_{\\text{fulcrum}} = 0$$\nAnti-clockwise torque due to the $12\\text{ kg}$ mass at distance $l$ on the left:\n$$\\tau_{\\text{left}} = 12 \\times l$$\nClockwise torque due to mass $m$ at distance $\\frac{l}{2}$ and the $3\\text{ kg}$ mass at distance $\\left(\\frac{l}{2} + l\\right) = \\frac{3l}{2}$ on the right:\n$$\\tau_{\\text{right}} = m \\times \\frac{l}{2} + 3 \\times \\frac{3l}{2} = \\frac{m l}{2} + \\frac{9l}{2}$$\nEquating torques:\n$$12 l = \\frac{m l}{2} + \\frac{9l}{2} \\implies 12 = \\frac{m}{2} + 4.5$$\n$$\\frac{m}{2} = 12 - 4.5 = 7.5 \\implies m = 15\\text{ kg}$$"
  },
  {
    q_num: 10,
    question_text: "A ladder of mass $M$ and length $L$ is supported in equilibrium against a smooth vertical wall and a rough horizontal surface. If $\\theta$ be the angle of inclination of the rod with the horizontal, then normal reaction of the wall on the ladder is",
    options: [
      "Mg",
      "\\frac{Mg}{2\\tan\\theta}",
      "\\frac{Mg\\cot\\theta}{3}",
      "\\frac{Mg}{2\\cos\\theta}"
    ],
    correct_index: 1,
    topic: "Equilibrium of Rigid Bodies",
    difficulty: "medium",
    image_url: getImageUrl(10),
    solution: "Let $N_w$ be the horizontal normal reaction from the smooth wall, and let the foot of the ladder on the ground be point $B$.\nTaking torque of all forces about the base contact point $B$:\n1. The weight $Mg$ acts vertically downwards at the center of mass (distance $\\frac{L}{2}$ from $B$), producing an anti-clockwise torque:\n$$\\tau_{Mg} = Mg \\times \\left(\\frac{L}{2}\\cos\\theta\\right)$$\n2. The normal force $N_w$ acts horizontally at the top end (height $L\\sin\\theta$ above $B$), producing a clockwise torque:\n$$\\tau_{N_w} = N_w \\times (L\\sin\\theta)$$\nFor rotational equilibrium:\n$$N_w (L\\sin\\theta) = Mg \\left(\\frac{L}{2}\\cos\\theta\\right)$$\n$$N_w = \\frac{Mg\\cos\\theta}{2\\sin\\theta} = \\frac{Mg}{2\\tan\\theta}$$"
  },
  {
    q_num: 11,
    question_text: "A square plate has a moment of inertia $I_0$ about an axis lying in the plane, passing through its centre and making an angle $\\theta$ with one of the sides. Which graph represents the variation of $I$ with $\\theta$?",
    options: [
      "Graph showing an increasing curve of I with \\theta",
      "Graph showing an inverted parabolic variation of I with \\theta",
      "Graph showing a constant horizontal straight line I = I_0 independent of \\theta",
      "Graph showing a U-shaped variation of I with \\theta"
    ],
    correct_index: 2,
    topic: "Moment of Inertia of Laminas",
    difficulty: "medium",
    image_url: getImageUrl(11),
    solution: "For a uniform square lamina of side $a$ and mass $M$ in the $xy$-plane with origin at its center:\nThe moment of inertia about the perpendicular axis through its center is:\n$$I_z = \\frac{M(a^2 + a^2)}{12} = \\frac{M a^2}{6}$$\nBy symmetry and the perpendicular axis theorem ($I_z = I_x + I_y$), any two mutually perpendicular coplanar axes passing through the center have equal moment of inertia:\n$$I_x = I_y = \\frac{I_z}{2} = \\frac{M a^2}{12} = I_0$$\nFor an axis in the plane tilted at an angle $\\theta$ with respect to the $x$-axis, its moment of inertia is:\n$$I(\\theta) = I_x \\cos^2\\theta + I_y \\sin^2\\theta = I_0(\\cos^2\\theta + \\sin^2\\theta) = I_0 = \\text{constant}$$\nThus, the moment of inertia is completely independent of $\\theta$, represented by a horizontal straight line (Graph 3)."
  },
  {
    q_num: 12,
    question_text: "The moment of inertia of the two uniform jointed rods about axis passing through $P$ and perpendicular to plane is",
    options: [
      "\\frac{Ml^2}{3}",
      "\\frac{2Ml^2}{3}",
      "\\frac{3Ml^2}{4}",
      "\\frac{5Ml^2}{3}"
    ],
    correct_index: 3,
    topic: "Moment of Inertia of Compound Systems",
    difficulty: "medium",
    image_url: getImageUrl(12),
    solution: "The system consists of two identical rods, each of mass $M$ and length $l$, joined at a right angle:\n1. Horizontal rod: Point $P$ is at one end of this rod. Its moment of inertia about an axis through its end perpendicular to its length is:\n$$I_1 = \\frac{M l^2}{3}$$\n2. Vertical rod: The center of mass of the vertical rod is at distance $l$ horizontally and $\\frac{l}{2}$ vertically from point $P$.\nDistance squared from $P$ to the CM of the vertical rod:\n$$d^2 = l^2 + \\left(\\frac{l}{2}\\right)^2 = l^2 + \\frac{l^2}{4} = \\frac{5l^2}{4}$$\nBy parallel axis theorem, the moment of inertia of the vertical rod about $P$ is:\n$$I_2 = I_{\\text{cm}} + M d^2 = \\frac{M l^2}{12} + M\\left(\\frac{5l^2}{4}\\right) = \\frac{M l^2 + 15 M l^2}{12} = \\frac{16 M l^2}{12} = \\frac{4 M l^2}{3}$$\nTotal moment of inertia of the jointed rods about $P$:\n$$I = I_1 + I_2 = \\frac{M l^2}{3} + \\frac{4 M l^2}{3} = \\frac{5 M l^2}{3}$$"
  },
  {
    q_num: 13,
    question_text: "Two rings of same mass and radius $R$ are placed with their planes perpendicular to each other and centres at a common point. The radius of gyration of the system about an axis passing through the centre and perpendicular to plane of one ring is",
    options: [
      "2R",
      "\\frac{R}{\\sqrt{2}}",
      "\\sqrt{\\frac{3}{2}}R",
      "\\frac{\\sqrt{3}R}{2}"
    ],
    correct_index: 3,
    topic: "Radius of Gyration",
    difficulty: "medium",
    image_url: "",
    solution: "Let Ring 1 lie in the $xy$-plane and Ring 2 lie in the $yz$-plane, both centered at the origin $(0, 0, 0)$.\nThe axis of rotation passes through the origin and is perpendicular to Ring 1, i.e., along the $z$-axis:\n1. For Ring 1, the $z$-axis is perpendicular to its plane and passes through its centre:\n$$I_1 = M R^2$$\n2. For Ring 2, the $z$-axis lies in its plane and passes through its centre (diameter axis):\n$$I_2 = \\frac{1}{2} M R^2$$\nTotal moment of inertia of the system:\n$$I = I_1 + I_2 = M R^2 + \\frac{1}{2} M R^2 = \\frac{3}{2} M R^2$$\nTotal mass of the system is $M_{\\text{total}} = 2M$.\nThe radius of gyration $k$ is given by:\n$$I = M_{\\text{total}} k^2 \\implies \\frac{3}{2} M R^2 = (2M) k^2$$\n$$k^2 = \\frac{3}{4} R^2 \\implies k = \\frac{\\sqrt{3}R}{2}$$"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 2 (pp. 117 - 118)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 14,
    question_text: "A spherical part of radius $\\frac{R}{2}$ is removed from a bigger solid sphere of radius $R$. Assuming uniform mass distribution, shift in the centre of mass will be",
    options: [
      "\\frac{R}{7}",
      "\\frac{R}{14}",
      "\\frac{R}{9}",
      "\\frac{R}{3}"
    ],
    correct_index: 1,
    topic: "Centre of Mass with Cavity",
    difficulty: "medium",
    image_url: getImageUrl(14),
    solution: "Let the original solid sphere of radius $R$ be centered at the origin $(0, 0)$.\nIts mass is proportional to its volume: $M_1 = \\rho \\frac{4}{3}\\pi R^3 = 8 m_0$.\nThe removed spherical part of radius $\\frac{R}{2}$ has mass $M_2 = \\rho \\frac{4}{3}\\pi \\left(\\frac{R}{2}\\right)^3 = m_0$, centered at $x_2 = \\frac{R}{2}$.\nThe remaining mass is $M_{\\text{rem}} = 8 m_0 - m_0 = 7 m_0$.\nBy the negative mass formula, the shift in the center of mass is:\n$$X_{\\text{cm}} = \\frac{M_1(0) - M_2\\left(\\frac{R}{2}\\right)}{M_1 - M_2} = \\frac{-m_0 \\left(\\frac{R}{2}\\right)}{7 m_0} = -\\frac{R}{14}$$\nThe magnitude of the shift is $\\frac{R}{14}$."
  },
  {
    q_num: 15,
    question_text: "A $400\\text{ kg}$ boat is $6\\text{ m}$ long. It is floating in still water and is at rest. A person of mass $80\\text{ kg}$ moves from one end of the boat to the other. Displacement of the boat relative to water is",
    options: [
      "1 m in a direction opposite to the displacement of person",
      "0.5 m in a direction opposite to the displacement of person",
      "1.5 m in a direction opposite to the displacement of person",
      "1.5 m in the direction of displacement of person"
    ],
    correct_index: 0,
    topic: "Motion of Centre of Mass",
    difficulty: "easy",
    image_url: "",
    solution: "Since no external horizontal force acts on the (boat + person) system, the center of mass of the system remains stationary relative to the water:\n$$m \\Delta x_{\\text{person}} + M \\Delta x_{\\text{boat}} = 0$$\nLet the displacement of the boat relative to the water be $x$ in the direction opposite to the person's motion.\nThe displacement of the person relative to the water is $(L - x)$:\n$$m(L - x) = M x$$\n$$x = \\frac{m L}{M + m} = \\frac{80 \\times 6}{400 + 80} = \\frac{480}{480} = 1\\text{ m}$$\nThus, the boat shifts by $1\\text{ m}$ in the direction opposite to the displacement of the person."
  },
  {
    q_num: 16,
    question_text: "A particle of mass $2\\text{ kg}$ is moving on a straight line $y = -2x + 4$ with velocity $2\\text{ m/s}$. Then magnitude of angular momentum of the particle w.r.t. origin is",
    options: [
      "\\frac{16}{\\sqrt{5}}\\text{ kg}\\cdot\\text{m}^2/\\text{s}",
      "\\frac{32}{\\sqrt{5}}\\text{ kg}\\cdot\\text{m}^2/\\text{s}",
      "\\frac{8}{\\sqrt{5}}\\text{ kg}\\cdot\\text{m}^2/\\text{s}",
      "32\\sqrt{5}\\text{ kg}\\cdot\\text{m}^2/\\text{s}"
    ],
    correct_index: 0,
    topic: "Angular Momentum of Particle",
    difficulty: "easy",
    image_url: "",
    solution: "The equation of the straight line is $2x + y - 4 = 0$.\nThe perpendicular distance $d$ from the origin $(0, 0)$ to the line is:\n$$d = \\frac{|2(0) + 1(0) - 4|}{\\sqrt{2^2 + 1^2}} = \\frac{4}{\\sqrt{5}}\\text{ m}$$\nThe magnitude of angular momentum about the origin is given by:\n$$L = m v d = 2 \\times 2 \\times \\frac{4}{\\sqrt{5}} = \\frac{16}{\\sqrt{5}}\\text{ kg}\\cdot\\text{m}^2/\\text{s}$$"
  },
  {
    q_num: 17,
    question_text: "A uniform cubical block of size $a$ is moving with velocity $v$ on the horizontal smooth plane as shown in figure. It hits a small ridge at $O$. The angular speed of the block after it hits $O$ assuming it does not jump off is",
    options: [
      "\\frac{3v}{4a}",
      "\\frac{3v}{2a}",
      "\\frac{\\sqrt{3}v}{\\sqrt{2}a}",
      "Zero"
    ],
    correct_index: 0,
    topic: "Collision & Conservation of Angular Momentum",
    difficulty: "hard",
    image_url: getImageUrl(17),
    solution: "During impact with the ridge at $O$, the impulsive force passes through $O$, so angular momentum about $O$ is conserved.\n1. Initial angular momentum about $O$ just before impact:\nThe center of mass is at height $\\frac{a}{2}$ above the floor, moving horizontally with speed $v$:\n$$L_i = m v \\left(\\frac{a}{2}\\right) = \\frac{1}{2} m v a$$\n2. Moment of inertia of the cubical block about the edge passing through $O$:\n$$I_O = I_{\\text{cm}} + m d^2 = \\frac{m(a^2 + a^2)}{12} + m\\left[\\left(\\frac{a}{2}\\right)^2 + \\left(\\frac{a}{2}\\right)^2\\right] = \\frac{m a^2}{6} + m\\frac{a^2}{2} = \\frac{2}{3} m a^2$$\n3. Applying conservation of angular momentum about $O$:\n$$L_i = L_f \\implies \\frac{1}{2} m v a = I_O \\omega = \\frac{2}{3} m a^2 \\omega$$\n$$\\omega = \\frac{\\frac{1}{2} m v a}{\\frac{2}{3} m a^2} = \\frac{3v}{4a}$$"
  },
  {
    q_num: 18,
    question_text: "A uniform cubical block is held stationary against a rough wall by applying a force $F$, then which of the following statement is correct?",
    options: [
      "Normal reaction will pass from the center of cube",
      "Normal reaction will act above the centre",
      "Normal reaction will pass below the center",
      "Torque of friction will be zero about the center of the cube"
    ],
    correct_index: 2,
    topic: "Equilibrium & Toppling",
    difficulty: "medium",
    image_url: getImageUrl(18),
    solution: "Forces acting on the cubical block of side $2a$:\n1. Gravity $mg$ acting vertically downwards through the center of mass.\n2. Upward static friction $f = mg$ acting on the vertical contact surface (distance $a$ to the left of the center).\n3. Horizontal applied force $F$ pushing against the wall.\n4. Normal reaction $N$ from the wall acting horizontally to the right.\nTaking torque about the center of mass:\n- The upward friction force $f$ produces a clockwise torque: $\\tau_f = f \\times a = mg \\times a$ (clockwise).\n- Gravity passes through the center: $\\tau_{mg} = 0$.\nFor rotational equilibrium ($\sum \\tau = 0$), the normal force $N$ must produce an equal and opposite (anti-clockwise) torque.\nSince $N$ acts horizontally to the right from the wall, to create an anti-clockwise torque about the center, its line of action must pass below the center."
  },
  {
    q_num: 19,
    question_text: "A thin wire of length $L$ and uniform linear mass density $\\rho$ is bent into a circular loop with centre $O$ as shown. The moment of inertia of the loop about an axis $XX'$ is",
    options: [
      "\\frac{\\rho L^3}{8\\pi^2}",
      "\\frac{\\rho L^3}{16\\pi^2}",
      "\\frac{5\\rho L^3}{16\\pi^2}",
      "\\frac{3\\rho L^3}{8\\pi^2}"
    ],
    correct_index: 3,
    topic: "Moment of Inertia of Ring",
    difficulty: "medium",
    image_url: getImageUrl(19),
    solution: "The mass of the wire is $M = \\rho L$.\nThe length of the wire forms the circumference of the circular loop: $2\\pi R = L \\implies R = \\frac{L}{2\\pi}$.\nThe axis $XX'$ is a tangent in the plane of the circular loop.\nMoment of inertia of the circular loop about a diameter axis in its plane is:\n$$I_{\\text{diameter}} = \\frac{1}{2} M R^2$$\nBy parallel axis theorem, the moment of inertia about the tangent axis in the plane is:\n$$I_{XX'} = I_{\\text{diameter}} + M R^2 = \\frac{1}{2} M R^2 + M R^2 = \\frac{3}{2} M R^2$$\nSubstituting $M = \\rho L$ and $R = \\frac{L}{2\\pi}$:\n$$I_{XX'} = \\frac{3}{2} (\\rho L) \\left(\\frac{L}{2\\pi}\\right)^2 = \\frac{3\\rho L^3}{8\\pi^2}$$"
  },
  {
    q_num: 20,
    question_text: "A uniform cubical block of side $a$ rests on a rough horizontal surface with coefficient of friction $\\mu$. A horizontal force $F$ is applied on the block as shown. If the coefficient of friction is sufficiently high so that the block does not slip before toppling, the shift in the normal reaction from the centre of the cube is",
    options: [
      "\\frac{Fa}{2Mg}",
      "\\frac{Fa}{Mg}",
      "\\frac{2Fa}{Mg}",
      "\\frac{Fa}{4Mg}"
    ],
    correct_index: 1,
    topic: "Toppling & Shift of Normal Reaction",
    difficulty: "medium",
    image_url: getImageUrl(20),
    solution: "Let the normal reaction $N = Mg$ be shifted by a distance $x$ from the center of the base.\nTaking torque about the point of application of the normal reaction on the base:\n- The applied force $F$ acts at the top face, at a height $a$ above the base, producing a clockwise torque $F \\times a$.\n- The downward weight $Mg$ acts through the center, producing an anti-clockwise torque $Mg \\times x$.\nFor equilibrium before toppling:\n$$F a - Mg x = 0 \\implies x = \\frac{Fa}{Mg}$$"
  },
  {
    q_num: 21,
    question_text: "A particle of mass $2m$ is projected at an angle of $45^\\circ$ with horizontal with velocity of $20\\sqrt{2}\\text{ m/s}$. After $1\\text{ s}$ explosion takes place, the particle is broken into two equal pieces. As a result of explosion, one part comes to rest. The maximum height attained by other part will be ($g = 10\\text{ m/s}^2$)",
    options: [
      "40 m",
      "25 m",
      "30 m",
      "35 m"
    ],
    correct_index: 3,
    topic: "Explosions & Projectile Motion",
    difficulty: "medium",
    image_url: "",
    solution: "Initial velocity components:\n$$u_x = 20\\sqrt{2}\\cos 45^\\circ = 20\\text{ m/s}, \\quad u_y = 20\\sqrt{2}\\sin 45^\\circ = 20\\text{ m/s}$$\nAt $t = 1\\text{ s}$, just before explosion:\n$$y_1 = u_y t - \\frac{1}{2}gt^2 = 20(1) - 5(1)^2 = 15\\text{ m}$$\n$$v_{y1} = u_y - gt = 20 - 10(1) = 10\\text{ m/s}$$\nDuring explosion, internal forces break mass $2m$ into two equal pieces of mass $m$.\nOne piece comes to rest ($v'_{y1} = 0$).\nBy conservation of momentum in the vertical direction:\n$$(2m) v_{y1} = m(0) + m v'_{y2} \\implies v'_{y2} = 2 v_{y1} = 2(10) = 20\\text{ m/s}$$\nThe additional height reached by the second piece is:\n$$h_{\\text{extra}} = \\frac{(v'_{y2})^2}{2g} = \\frac{20^2}{2 \\times 10} = \\frac{400}{20} = 20\\text{ m}$$\nMaximum height attained above the ground:\n$$H_{\\max} = y_1 + h_{\\text{extra}} = 15\\text{ m} + 20\\text{ m} = 35\\text{ m}$$"
  },
  {
    q_num: 22,
    question_text: "In the arrangement shown in figure if the system is released from rest, the acceleration of centre of mass of system is (pulley and string are ideal)",
    options: [
      "\\frac{g}{6}\\text{ downward}",
      "\\frac{g}{3}\\text{ upward}",
      "\\frac{g}{9}\\text{ downward}",
      "\\frac{g}{9}\\text{ upward}"
    ],
    correct_index: 2,
    topic: "Acceleration of Centre of Mass",
    difficulty: "medium",
    image_url: getImageUrl(22),
    solution: "For the Atwood machine with masses $m_1 = 2\\text{ kg}$ and $m_2 = 1\\text{ kg}$:\nThe linear acceleration of the masses is:\n$$a = \\frac{m_1 - m_2}{m_1 + m_2} g = \\frac{2 - 1}{2 + 1} g = \\frac{g}{3}$$\nTaking the downward direction as positive:\n- $\\vec{a}_1 = +\\frac{g}{3}$ (downward for $2\\text{ kg}$)\n- $\\vec{a}_2 = -\\frac{g}{3}$ (upward for $1\\text{ kg}$)\nThe acceleration of the center of mass is:\n$$a_{\\text{cm}} = \\frac{m_1 a_1 + m_2 a_2}{m_1 + m_2} = \\frac{2\\left(\\frac{g}{3}\\right) + 1\\left(-\\frac{g}{3}\\right)}{2 + 1} = \\frac{\\frac{g}{3}}{3} = \\frac{g}{9}\\text{ downward}$$"
  },
  {
    q_num: 23,
    question_text: "A child with mass $m$ is standing at the edge of a horizontal merry-go-round having moment of inertia $I$, radius $R$ and initial velocity $\\omega$ as shown in figure. The child jumps off the edge of merry go round with tangential velocity $v$ with respect to ground. The new angular velocity of merry go round is",
    options: [
      "\\frac{I\\omega^2 - mv^2}{I}",
      "\\sqrt{\\frac{(I + mR^2)\\omega^2 - mv^2}{I}}",
      "\\frac{I\\omega - mvR}{I}",
      "\\frac{(I + mR^2)\\omega - mvR}{I}"
    ],
    correct_index: 3,
    topic: "Conservation of Angular Momentum",
    difficulty: "medium",
    image_url: getImageUrl(23),
    solution: "Initial angular momentum of the system (merry-go-round + child standing at the rim) about the vertical axis through the center:\n$$L_i = (I + m R^2)\\omega$$\nWhen the child jumps off tangentially with velocity $v$ relative to the ground in the direction of rotation, the angular momentum carried away by the child is:\n$$L_{\\text{child}} = m v R$$\nLet the new angular velocity of the merry-go-round be $\\omega'$. Its angular momentum is $I \\omega'$.\nBy conservation of angular momentum about the fixed vertical axis:\n$$L_i = L_f \\implies (I + m R^2)\\omega = I \\omega' + m v R$$\n$$\\omega' = \\frac{(I + m R^2)\\omega - m v R}{I}$$"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 3 (p. 119)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 24,
    question_text: "Four thin rods each of mass $m$ and length $l$ are joined to make a square. The moment of inertia of all four rods about any side of square is",
    options: [
      "\\frac{5ml^2}{3}",
      "\\frac{4ml^2}{3}",
      "\\frac{7}{4}ml^2",
      "\\frac{3}{2}ml^2"
    ],
    correct_index: 0,
    topic: "Moment of Inertia of Frame",
    difficulty: "medium",
    image_url: "",
    solution: "Let the square be $ABCD$ with side $l$ and each rod of mass $m$. Let the axis of rotation be along side $AB$:\n1. Rod $AB$ lies directly on the axis: $I_{AB} = 0$.\n2. Rod $CD$ is parallel to the axis at distance $l$: $I_{CD} = m l^2$.\n3. Rods $BC$ and $AD$ are perpendicular to the axis with one end on the axis:\n$$I_{BC} = I_{AD} = \\frac{1}{3} m l^2$$\nTotal moment of inertia about side $AB$:\n$$I = 0 + m l^2 + \\frac{1}{3} m l^2 + \\frac{1}{3} m l^2 = \\left(1 + \\frac{2}{3}\\right) m l^2 = \\frac{5}{3} m l^2$$"
  },
  {
    q_num: 25,
    question_text: "A particle of mass $m$ is projected with a velocity $v$ at an angle $60^\\circ$ with horizontal. When the particle is at its maximum height, the magnitude of its angular momentum about the point of projection is",
    options: [
      "Zero",
      "\\frac{3mv^3}{16g}",
      "\\frac{\\sqrt{3}mv^3}{16g}",
      "\\frac{3mv^3}{8g}"
    ],
    correct_index: 1,
    topic: "Angular Momentum of Projectile",
    difficulty: "medium",
    image_url: "",
    solution: "At maximum height $H$:\n$$H = \\frac{v^2 \\sin^2 60^\\circ}{2g} = \\frac{v^2 (\\sqrt{3}/2)^2}{2g} = \\frac{3 v^2}{8g}$$\nAt the highest point, the velocity is purely horizontal:\n$$v_x = v \\cos 60^\\circ = \\frac{v}{2}$$\nThe perpendicular distance from the point of projection to the line of motion at maximum height is simply $H$.\nTherefore, the magnitude of angular momentum about the point of projection is:\n$$L = m v_x H = m \\left(\\frac{v}{2}\\right) \\left(\\frac{3 v^2}{8g}\\right) = \\frac{3 m v^3}{16 g}$$"
  },
  {
    q_num: 26,
    question_text: "A thin circular disc of radius $R$ is cut into two halves. One half of the disc has mass $m$ as shown below. The moment of inertia of the half disc about $AB$ is",
    options: [
      "\\frac{1}{2}mR^2",
      "\\frac{1}{4}mR^2",
      "\\frac{1}{6}mR^2",
      "\\frac{1}{8}mR^2"
    ],
    correct_index: 1,
    topic: "Moment of Inertia of Semicircular Disc",
    difficulty: "easy",
    image_url: getImageUrl(26),
    solution: "Consider a complete circular disc of radius $R$ formed by joining two identical semicircular halves, each of mass $m$.\nThe total mass of the complete disc would be $M_{\\text{full}} = 2m$.\nThe moment of inertia of a complete disc of mass $2m$ and radius $R$ about a diameter is:\n$$I_{\\text{full, diameter}} = \\frac{1}{4} M_{\\text{full}} R^2 = \\frac{1}{4}(2m)R^2 = \\frac{1}{2} m R^2$$\nBy symmetry, each semicircular half contributes equally to this moment of inertia:\n$$I_{AB} = \\frac{1}{2} I_{\\text{full, diameter}} = \\frac{1}{2} \\left(\\frac{1}{2} m R^2\\right) = \\frac{1}{4} m R^2$$"
  },
  {
    q_num: 27,
    question_text: "A cubical block of mass $m$ and edge length $a$ slides down a rough inclined plane of inclination $\\theta$ with uniform speed. The torque of the normal force acting on the block about its centre is",
    options: [
      "\\frac{1}{2}ma\\sin\\theta",
      "\\frac{1}{2}mga\\sin\\theta",
      "amg\\cos\\theta",
      "Zero"
    ],
    correct_index: 1,
    topic: "Torque & Rotational Equilibrium",
    difficulty: "medium",
    image_url: getImageUrl(27),
    solution: "Since the block slides down with uniform speed, it is in both translational and rotational equilibrium ($\\sum \\vec{\\tau}_{\\text{cm}} = 0$).\nForces acting on the block:\n1. Gravity $mg$ acting at the center of mass (torque about center = $0$).\n2. Friction force $f = mg\\sin\\theta$ acting up the incline along the bottom face.\nDistance of the bottom face from the center of the block is $\\frac{a}{2}$.\nTorque of friction about the center:\n$$\\tau_f = f \\times \\frac{a}{2} = (mg\\sin\\theta)\\frac{a}{2} = \\frac{1}{2} m g a \\sin\\theta$$\nFor rotational equilibrium about the center, the normal reaction $N$ must balance this torque exactly:\n$$|\\tau_N| = \\tau_f = \\frac{1}{2} m g a \\sin\\theta$$"
  },
  {
    q_num: 28,
    question_text: "A wire of mass $m$ and length $l$ bent in the form of an arc of a circle subtends an angle $\\theta$ at its centre. Its moment of inertia ($I$) about an axis through centre of circle and normal to the plane of circle varies as",
    options: [
      "I \\propto \\theta",
      "I \\propto \\theta^{-2}",
      "I \\propto \\theta^{3/2}",
      "I \\propto \\theta^0"
    ],
    correct_index: 1,
    topic: "Moment of Inertia of Arc",
    difficulty: "easy",
    image_url: "",
    solution: "The arc length is $l = R\\theta$, where $R$ is the radius of the circle.\nTherefore, $R = \\frac{l}{\\theta}$.\nEvery element of the wire is at the same distance $R$ from the center of the circle.\nThus, the moment of inertia about the axis passing through the center perpendicular to the plane is:\n$$I = \\int r^2 dm = R^2 \\int dm = m R^2 = m \\left(\\frac{l}{\\theta}\\right)^2 = \\frac{m l^2}{\\theta^2}$$\nHence, $I \\propto \\theta^{-2}$."
  },
  {
    q_num: 29,
    question_text: "The position vectors of three particles of mass $m_1 = 1\\text{ kg}$, $m_2 = 2\\text{ kg}$ and $m_3 = 3\\text{ kg}$ are $\\vec{r}_1 = (\\hat{i} + 4\\hat{j} + \\hat{k})\\text{ m}$, $\\vec{r}_2 = (\\hat{i} + \\hat{j} + \\hat{k})\\text{ m}$ and $\\vec{r}_3 = (2\\hat{i} - \\hat{j} - 2\\hat{k})\\text{ m}$ respectively. The position vector of their centre of mass is",
    options: [
      "(\\hat{i} + 3\\hat{j} - \\hat{k})\\text{ m}",
      "\\frac{1}{2}(3\\hat{i} + \\hat{j} - \\hat{k})\\text{ m}",
      "\\frac{1}{2}(\\hat{i} + 3\\hat{j} - \\hat{k})\\text{ m}",
      "\\frac{1}{3}(\\hat{i} + 2\\hat{j} - \\hat{k})\\text{ m}"
    ],
    correct_index: 1,
    topic: "Centre of Mass of Particles",
    difficulty: "easy",
    image_url: "",
    solution: "Total mass $M = m_1 + m_2 + m_3 = 1 + 2 + 3 = 6\\text{ kg}$.\n$$\\sum m_i \\vec{r}_i = 1(\\hat{i} + 4\\hat{j} + \\hat{k}) + 2(\\hat{i} + \\hat{j} + \\hat{k}) + 3(2\\hat{i} - \\hat{j} - 2\\hat{k})$$\n$$= (1 + 2 + 6)\\hat{i} + (4 + 2 - 3)\\hat{j} + (1 + 2 - 6)\\hat{k} = 9\\hat{i} + 3\\hat{j} - 3\\hat{k}$$\nThe position vector of the center of mass is:\n$$\\vec{r}_{\\text{cm}} = \\frac{9\\hat{i} + 3\\hat{j} - 3\\hat{k}}{6} = \\frac{3}{6}(3\\hat{i} + \\hat{j} - \\hat{k}) = \\frac{1}{2}(3\\hat{i} + \\hat{j} - \\hat{k})\\text{ m}$$"
  },
  {
    q_num: 30,
    question_text: "The linear mass density of a thin rod of length $l$ varies with the distance $x$ from one end as $\\lambda = \\lambda_0 \\frac{x^2}{l^2}$. The position of centre of mass of rod from same end is at a distance of",
    options: [
      "\\frac{3l}{4}",
      "l",
      "\\frac{l}{2}",
      "\\frac{l}{4}"
    ],
    correct_index: 0,
    topic: "Centre of Mass of Non-Uniform Rod",
    difficulty: "easy",
    image_url: "",
    solution: "The position of center of mass is given by:\n$$x_{\\text{cm}} = \\frac{\\int_0^l x \\lambda dx}{\\int_0^l \\lambda dx} = \\frac{\\int_0^l x \\left(\\lambda_0 \\frac{x^2}{l^2}\\right) dx}{\\int_0^l \\left(\\lambda_0 \\frac{x^2}{l^2}\\right) dx} = \\frac{\\int_0^l x^3 dx}{\\int_0^l x^2 dx} = \\frac{\\left[\\frac{x^4}{4}\\right]_0^l}{\\left[\\frac{x^3}{3}\\right]_0^l} = \\frac{l^4 / 4}{l^3 / 3} = \\frac{3l}{4}$$"
  },
  {
    q_num: 31,
    question_text: "A wooden plank of mass $20\\text{ kg}$ is resting on a smooth horizontal floor. A man of mass $60\\text{ kg}$ starts moving from one end of the plank to the other end. The length of plank is $10\\text{ m}$. Find the displacement of the plank over the floor when the man reaches the other end of the plank",
    options: [
      "7.2 m",
      "6.5 m",
      "7.5 m",
      "8.5 m"
    ],
    correct_index: 2,
    topic: "Motion of Centre of Mass",
    difficulty: "easy",
    image_url: getImageUrl(31),
    solution: "Since the floor is smooth, no external horizontal force acts on the (plank + man) system, so the center of mass remains at rest:\n$$m_{\\text{man}} \\Delta x_{\\text{man}} + M_{\\text{plank}} \\Delta x_{\\text{plank}} = 0$$\nLet the displacement of the plank over the floor be $x$ in the direction opposite to the man's movement.\nThe displacement of the man relative to the floor is $(L - x)$:\n$$m(L - x) = M x \\implies x = \\frac{m L}{M + m}$$\n$$x = \\frac{60 \\times 10}{20 + 60} = \\frac{600}{80} = 7.5\\text{ m}$$"
  },
  {
    q_num: 32,
    question_text: "A particle of mass $5\\text{ kg}$ is moving with a uniform speed $3\\sqrt{2}$ in $xy$-plane along the line $y = x + 4$. The magnitude of its angular momentum about the origin is",
    options: [
      "40 units",
      "60 units",
      "Zero",
      "40\\sqrt{2} units"
    ],
    correct_index: 1,
    topic: "Angular Momentum about Origin",
    difficulty: "easy",
    image_url: "",
    solution: "Equation of the line of motion: $x - y + 4 = 0$.\nThe perpendicular distance $d$ from the origin $(0, 0)$ to the line is:\n$$d = \\frac{|0 - 0 + 4|}{\\sqrt{1^2 + (-1)^2}} = \\frac{4}{\\sqrt{2}} = 2\\sqrt{2}\\text{ units}$$\nThe magnitude of angular momentum about the origin is:\n$$L = m v d = 5 \\times (3\\sqrt{2}) \\times (2\\sqrt{2}) = 5 \\times 3 \\times 4 = 60\\text{ units}$$"
  },
  {
    q_num: 33,
    question_text: "A force $\\vec{F} = (2\\hat{i} + 3\\hat{j} - 5\\hat{k})\\text{ N}$ acts at a point $\\vec{r}_1 = (2\\hat{i} + 4\\hat{j} + 7\\hat{k})\\text{ m}$. The torque of the force about the point $\\vec{r}_2 = (\\hat{i} + 2\\hat{j} + 3\\hat{k})\\text{ m}$ is",
    options: [
      "(17\\hat{i} + 5\\hat{k} - 3\\hat{j})\\text{ Nm}",
      "(2\\hat{i} - 4\\hat{j} - 6\\hat{k})\\text{ Nm}",
      "(12\\hat{i} - 5\\hat{j} - 7\\hat{k})\\text{ Nm}",
      "(13\\hat{j} - 22\\hat{i} - \\hat{k})\\text{ Nm}"
    ],
    correct_index: 3,
    topic: "Torque Vector Cross Product",
    difficulty: "medium",
    image_url: "",
    solution: "Position vector of the point of application relative to the reference point $\\vec{r}_2$:\n$$\\vec{r} = \\vec{r}_1 - \\vec{r}_2 = (2 - 1)\\hat{i} + (4 - 2)\\hat{j} + (7 - 3)\\hat{k} = \\hat{i} + 2\\hat{j} + 4\\hat{k}$$\nThe torque is given by the cross product $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$:\n$$\\vec{\\tau} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 2 & 4 \\\\ 2 & 3 & -5 \\end{vmatrix}$$\n$$\\vec{\\tau} = \\hat{i}[(2)(-5) - (4)(3)] - \\hat{j}[(1)(-5) - (4)(2)] + \\hat{k}[(1)(3) - (2)(2)]$$\n$$\\vec{\\tau} = \\hat{i}(-10 - 12) - \\hat{j}(-5 - 8) + \\hat{k}(3 - 4) = -22\\hat{i} + 13\\hat{j} - \\hat{k} = (13\\hat{j} - 22\\hat{i} - \\hat{k})\\text{ Nm}$$"
  },
  {
    q_num: 34,
    question_text: "A mass $m$ moves in a circle on a smooth horizontal plane with velocity $v_0$ in a circle of radius $R_0$. The mass is attached to a string which passes through a smooth hole in the plane as shown. The tension in the string is increased gradually and slowly and finally $m$ moves in a circle of radius $\\frac{R_0}{2}$. The final value of kinetic energy is",
    options: [
      "\\frac{1}{2}mv_0^2",
      "mv_0^2",
      "\\frac{1}{4}mv_0^2",
      "2mv_0^2"
    ],
    correct_index: 3,
    topic: "Conservation of Angular Momentum",
    difficulty: "medium",
    image_url: getImageUrl(34),
    solution: "The tension force acts radially inward through the central hole, so the net torque about the hole is zero:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{T} = 0$$\nTherefore, angular momentum about the central hole is conserved:\n$$L_i = L_f \\implies m v_0 R_0 = m v_f R_f = m v_f \\left(\\frac{R_0}{2}\\right)$$\n$$v_f = 2 v_0$$\nThe final kinetic energy is:\n$$K_f = \\frac{1}{2} m v_f^2 = \\frac{1}{2} m (2v_0)^2 = 2 m v_0^2$$"
  },
  {
    q_num: 35,
    question_text: "A horizontal disc rotating freely about a vertical axis through its centre makes $90\\text{ revolutions per minute}$. A small piece of wax of mass $m$ falls vertically on the disc and sticks to it at a distance $r$ from the axis. If the number of revolutions per minute reduce to $60$, then moment of inertia of disc is",
    options: [
      "mr^2",
      "\\frac{3}{2}mr^2",
      "2mr^2",
      "3mr^2"
    ],
    correct_index: 2,
    topic: "Conservation of Angular Momentum",
    difficulty: "easy",
    image_url: "",
    solution: "Let the moment of inertia of the disc be $I$.\nInitial angular frequency is $N_1 = 90\\text{ rpm}$.\nWhen the wax of mass $m$ sticks at distance $r$ from the axis, the new moment of inertia is:\n$$I' = I + m r^2$$\nFinal angular frequency is $N_2 = 60\\text{ rpm}$.\nSince no external torque acts about the axis of rotation, angular momentum is conserved:\n$$I \\omega_1 = I' \\omega_2 \\implies I N_1 = (I + m r^2) N_2$$\n$$I(90) = (I + m r^2)60 \\implies 90 I = 60 I + 60 m r^2$$\n$$30 I = 60 m r^2 \\implies I = 2 m r^2$$"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 4 (pp. 121 - 122)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 43,
    question_text: "A cubical block is on a rough fixed inclined plane of angle of inclination $\\theta$. What is the shift in normal reaction from the center of the cubical block, if block is just at rest?",
    options: [
      "\\frac{a}{2}",
      "\\mu a \\tan\\theta",
      "\\frac{a}{2}\\tan\\theta",
      "\\mu \\frac{a}{2}\\tan\\theta"
    ],
    correct_index: 2,
    topic: "Shift in Normal Reaction on Incline",
    difficulty: "medium",
    image_url: getImageUrl(43),
    solution: "Let the side of the cube be $a$. The center of mass is at height $\\frac{a}{2}$ above the inclined surface.\nForces on the block:\n- Normal reaction $N = mg\\cos\\theta$ acting perpendicular to the incline, shifted by distance $x$ from the center of the base.\n- Friction force $f = mg\\sin\\theta$ acting up along the incline at the contact surface.\n- Gravity acting at the center of mass.\nTaking torque about the center of mass:\n$$\\tau_N = N x = (mg\\cos\\theta) x$$\n$$\\tau_f = f \\left(\\frac{a}{2}\\right) = (mg\\sin\\theta)\\frac{a}{2}$$\nFor rotational equilibrium:\n$$(mg\\cos\\theta) x = (mg\\sin\\theta)\\frac{a}{2} \\implies x = \\frac{a}{2}\\tan\\theta$$"
  },
  {
    q_num: 44,
    question_text: "Three uniform solid spheres each of mass $M$ and radius $R$ are placed along $x$-axis as shown in figure, then moment of inertia of system about $y$-axis is",
    options: [
      "\\frac{8MR^2}{5}",
      "\\frac{24MR^2}{5}",
      "\\frac{36MR^2}{5}",
      "\\frac{46MR^2}{5}"
    ],
    correct_index: 3,
    topic: "Moment of Inertia of Spheres",
    difficulty: "medium",
    image_url: getImageUrl(44),
    solution: "Moment of inertia of a solid sphere of mass $M$ and radius $R$ about a diameter is:\n$$I_{\\text{cm}} = \\frac{2}{5} M R^2$$\nThe three spheres lie along the $x$-axis touching each other, with the middle sphere centered at $(0, 0)$ through which the $y$-axis passes:\n1. Middle sphere (centered at origin): $I_1 = \\frac{2}{5} M R^2$.\n2. Right sphere (centered at $x = 2R$):\n$$I_2 = I_{\\text{cm}} + M(2R)^2 = \\frac{2}{5} M R^2 + 4 M R^2 = \\frac{22}{5} M R^2$$\n3. Left sphere (centered at $x = -2R$):\n$$I_3 = I_{\\text{cm}} + M(-2R)^2 = \\frac{2}{5} M R^2 + 4 M R^2 = \\frac{22}{5} M R^2$$\nTotal moment of inertia about the $y$-axis:\n$$I = I_1 + I_2 + I_3 = \\frac{2}{5} M R^2 + \\frac{22}{5} M R^2 + \\frac{22}{5} M R^2 = \\frac{46}{5} M R^2$$"
  },
  {
    q_num: 45,
    question_text: "One quarter sector is cut from a uniform circular disc of radius $R$. This sector has mass $M$. It is made to rotate about a line perpendicular to its plane and passing through the centre of the original disc. Its moment of inertia about the axis of rotation is",
    options: [
      "\\frac{1}{2}MR^2",
      "\\frac{1}{4}MR^2",
      "\\frac{1}{8}MR^2",
      "\\sqrt{2}MR^2"
    ],
    correct_index: 0,
    topic: "Moment of Inertia of Disc Sector",
    difficulty: "easy",
    image_url: getImageUrl(45),
    solution: "Four identical quarter sectors, each of mass $M$ and radius $R$, can be assembled around the same center to form a complete circular disc of radius $R$ and total mass $4M$.\nThe moment of inertia of this complete circular disc about the perpendicular central axis is:\n$$I_{\\text{full}} = \\frac{1}{2} M_{\\text{full}} R^2 = \\frac{1}{2} (4M) R^2 = 2 M R^2$$\nBy symmetry, each quarter sector contributes equally (one-fourth) to this total moment of inertia:\n$$I_{\\text{sector}} = \\frac{I_{\\text{full}}}{4} = \\frac{2 M R^2}{4} = \\frac{1}{2} M R^2$$"
  },
  {
    q_num: 46,
    question_text: "Two identical particles move towards each other with velocities $2v$ and $v$ respectively. The velocity of centre of mass is",
    options: [
      "v",
      "\\frac{v}{3}",
      "\\frac{v}{2}",
      "Zero"
    ],
    correct_index: 2,
    topic: "Velocity of Centre of Mass",
    difficulty: "easy",
    image_url: "",
    solution: "Let the masses of the two particles be $m_1 = m_2 = m$.\nSince they move towards each other along a straight line, let their velocities be $\\vec{v}_1 = +2v$ and $\\vec{v}_2 = -v$.\nThe velocity of the center of mass is:\n$$v_{\\text{cm}} = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2} = \\frac{m(2v) + m(-v)}{m + m} = \\frac{m v}{2m} = \\frac{v}{2}$$\n(in the direction of the first particle)."
  },
  {
    q_num: 47,
    question_text: "A disc is rotating about its own axis with constant angular acceleration after starting from rest. Then ratio of total angle it rotates after $1, 2\\text{ and } 3\\text{ seconds}$ is",
    options: [
      "1:2:3",
      "1:3:5",
      "1:4:9",
      "1:1:1"
    ],
    correct_index: 2,
    topic: "Rotational Kinematics",
    difficulty: "easy",
    image_url: "",
    solution: "Since the disc starts from rest ($\\omega_0 = 0$) with constant angular acceleration $\\alpha$, the total angle rotated after time $t$ is given by:\n$$\\theta(t) = \\frac{1}{2} \\alpha t^2$$\nFor times $t = 1\\text{ s}, 2\\text{ s}, 3\\text{ s}$:\n$$\\theta_1 = \\frac{1}{2} \\alpha (1)^2 = \\frac{1}{2} \\alpha (1)$$\n$$\\theta_2 = \\frac{1}{2} \\alpha (2)^2 = \\frac{1}{2} \\alpha (4)$$\n$$\\theta_3 = \\frac{1}{2} \\alpha (3)^2 = \\frac{1}{2} \\alpha (9)$$\nThe ratio of total angle rotated after $1, 2,$ and $3\\text{ seconds}$ is:\n$$\\theta_1 : \\theta_2 : \\theta_3 = 1 : 4 : 9$$"
  },
  {
    q_num: 48,
    question_text: "If suddenly earth shrinks to $\\frac{1}{n}$ of its present radius without any change in its mass, then length of day will be (in hours)",
    options: [
      "24n^2",
      "\\frac{24}{n^2}",
      "24n",
      "\\frac{24}{n}"
    ],
    correct_index: 1,
    topic: "Conservation of Angular Momentum of Earth",
    difficulty: "easy",
    image_url: "",
    solution: "Modeling the Earth as a solid sphere of mass $M$ and radius $R$, its moment of inertia is $I_1 = \\frac{2}{5} M R^2$.\nThe initial time period is $T_1 = 24\\text{ hours}$.\nWhen the radius shrinks to $R' = \\frac{R}{n}$, the new moment of inertia is:\n$$I_2 = \\frac{2}{5} M (R')^2 = \\frac{2}{5} M \\left(\\frac{R}{n}\\right)^2 = \\frac{I_1}{n^2}$$\nSince no external torque acts on the Earth, its angular momentum is conserved:\n$$I_1 \\omega_1 = I_2 \\omega_2 \\implies I_1 \\left(\\frac{2\\pi}{T_1}\\right) = I_2 \\left(\\frac{2\\pi}{T_2}\\right)$$\n$$T_2 = T_1 \\frac{I_2}{I_1} = 24 \\times \\frac{1}{n^2} = \\frac{24}{n^2}\\text{ hours}$$"
  },
  {
    q_num: 49,
    question_text: "A block of mass $M$, length $L$ and height $H$ is kept at rest on a rough inclined plane of inclination $\\alpha$ with the horizontal as shown. If $\\mu$ is the coefficient of friction between the block and the inclined plane, then the block topples over if",
    options: [
      "\\tan\\alpha = \\frac{L}{H}",
      "\\tan\\alpha > \\frac{L}{H}",
      "\\tan\\alpha < \\frac{L}{H}",
      "\\tan\\alpha = \\frac{L}{2H}"
    ],
    correct_index: 1,
    topic: "Toppling on an Inclined Plane",
    difficulty: "medium",
    image_url: getImageUrl(49),
    solution: "Toppling occurs about the lowest front edge of the base on the incline.\nThe center of mass is located at distance $\\frac{L}{2}$ parallel to the incline and $\\frac{H}{2}$ perpendicular to the incline.\nTaking torque about the lowest edge:\n- The component $Mg\\sin\\alpha$ produces a clockwise toppling torque: $\\tau_{\\text{topple}} = (Mg\\sin\\alpha)\\frac{H}{2}$.\n- The component $Mg\\cos\\alpha$ produces an anti-clockwise restoring torque: $\\tau_{\\text{restore}} = (Mg\\cos\\alpha)\\frac{L}{2}$.\nThe block will topple over when the toppling torque exceeds the restoring torque:\n$$(Mg\\sin\\alpha)\\frac{H}{2} > (Mg\\cos\\alpha)\\frac{L}{2}$$\n$$\\frac{\\sin\\alpha}{\\cos\\alpha} > \\frac{L}{H} \\implies \\tan\\alpha > \\frac{L}{H}$$"
  },
  {
    q_num: 50,
    question_text: "A bomb is projected from ground for horizontal range $R$. If the bomb is exploded in mid-air, then range of its centre of mass is",
    options: [
      "\\frac{R}{2}",
      "R",
      "2R",
      "\\frac{2R}{3}"
    ],
    correct_index: 1,
    topic: "Motion of Centre of Mass of Exploding Bomb",
    difficulty: "easy",
    image_url: "",
    solution: "The explosion of the bomb in mid-air is caused entirely by internal chemical forces.\nInternal forces cannot alter the net momentum or the motion of the center of mass of the system.\nTherefore, the center of mass continues along its original parabolic trajectory under gravity alone until the fragments reach the ground.\nThus, the horizontal range of the center of mass remains unchanged, equal to $R$."
  },
  {
    q_num: 51,
    question_text: "The pulley has moment of inertia $I$ and its radius is $r$. If there is no slipping of string over the pulley, then acceleration of the block of mass $m$ is",
    options: [
      "g",
      "\\frac{mg}{m + \\frac{I}{r^2}}",
      "\\frac{mg}{m + \\frac{2I}{r^2}}",
      "\\frac{mg}{2m + \\frac{I}{r^2}}"
    ],
    correct_index: 1,
    topic: "Rotational Dynamics of Pulley",
    difficulty: "medium",
    image_url: getImageUrl(51),
    solution: "Equation of linear motion for the hanging mass $m$:\n$$m g - T = m a \\implies T = m(g - a)$$\nTorque equation for the rotating pulley of moment of inertia $I$ and radius $r$:\n$$\\tau = T r = I \\alpha$$\nSince there is no slipping of the string over the pulley, $a = \\alpha r \\implies \\alpha = \\frac{a}{r}$:\n$$T r = I \\left(\\frac{a}{r}\\right) \\implies T = \\frac{I a}{r^2}$$\nEquating the expressions for tension $T$:\n$$m(g - a) = \\frac{I a}{r^2} \\implies m g = \\left(m + \\frac{I}{r^2}\\right) a$$\n$$a = \\frac{mg}{m + \\frac{I}{r^2}}$$"
  },
  {
    q_num: 52,
    question_text: "A block of mass $m$ is supported by a massless inextensible string wound around a uniform hollow cylinder of mass $m$ and radius $R$ as shown in figure where block accelerates in vertical direction. If the string does not slip on the cylinder, then acceleration of the block is",
    options: [
      "\\frac{2}{3}g",
      "\\frac{g}{2}",
      "\\frac{5g}{6}",
      "g"
    ],
    correct_index: 1,
    topic: "Rotational Dynamics of Cylinders",
    difficulty: "medium",
    image_url: getImageUrl(52),
    solution: "For a thin uniform hollow cylinder (cylindrical shell) of mass $m$ and radius $R$, the moment of inertia about its central axis is:\n$$I = m R^2$$\nUsing the formula for acceleration of a mass hanging from a rotating cylinder:\n$$a = \\frac{mg}{m + \\frac{I}{R^2}}$$\nSubstituting $I = m R^2$:\n$$a = \\frac{mg}{m + \\frac{m R^2}{R^2}} = \\frac{mg}{m + m} = \\frac{mg}{2m} = \\frac{g}{2}$$"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE 5 (pp. 123 - 124)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    q_num: 57,
    question_text: "When string doesn't slip over the uniform cylindrical pulley of mass $4\\text{ kg}$, then what is the tension $T_1$ in the left side of the string as shown in diagram? The axis of the solid cylinder is horizontal and there is no friction at the axle. Take gravitational acceleration ($g$) = $10\\text{ m/s}^2$.",
    options: [
      "10 N",
      "16 N",
      "20 N",
      "25 N"
    ],
    correct_index: 1,
    topic: "Pulley with Mass & Tensions",
    difficulty: "medium",
    image_url: getImageUrl(57),
    solution: "For a solid cylindrical pulley of mass $M_p = 4\\text{ kg}$ and radius $R$, its moment of inertia is:\n$$I = \\frac{1}{2} M_p R^2 = \\frac{1}{2}(4)R^2 = 2 R^2$$\nEquations of motion:\n1. For the left hanging mass ($m_1 = 2\\text{ kg}$) accelerating downwards with $a$:\n$$m_1 g - T_1 = m_1 a \\implies 2(10) - T_1 = 2a \\implies T_1 = 20 - 2a$$\n2. For the right hanging mass ($m_2 = 1\\text{ kg}$) accelerating upwards with $a$:\n$$T_2 - m_2 g = m_2 a \\implies T_2 - 1(10) = 1a \\implies T_2 = 10 + a$$\n3. For rotation of the cylindrical pulley:\n$$(T_1 - T_2) R = I \\alpha = (2 R^2)\\left(\\frac{a}{R}\\right) \\implies T_1 - T_2 = 2a$$\nSubstituting $T_1$ and $T_2$ into the torque equation:\n$$(20 - 2a) - (10 + a) = 2a \\implies 10 - 3a = 2a \\implies 5a = 10 \\implies a = 2\\text{ m/s}^2$$\nNow, calculating $T_1$:\n$$T_1 = 20 - 2(2) = 16\\text{ N}$$"
  },
  {
    q_num: 58,
    question_text: "If angular momentum of a body is increased by $20\\%$, then rotational kinetic energy is increased by (moment of inertia is constant)",
    options: [
      "44%",
      "22%",
      "40%",
      "50%"
    ],
    correct_index: 0,
    topic: "Angular Momentum & Kinetic Energy Relation",
    difficulty: "easy",
    image_url: "",
    solution: "The rotational kinetic energy is related to angular momentum $L$ and moment of inertia $I$ by:\n$$K = \\frac{L^2}{2I}$$\nSince the moment of inertia $I$ remains constant, $K \\propto L^2$.\nWhen angular momentum increases by $20\\%$:\n$$L' = L + 0.20 L = 1.20 L$$\n$$K' = \\frac{(L')^2}{2I} = (1.20)^2 \\frac{L^2}{2I} = 1.44 K$$\nThe percentage increase in rotational kinetic energy is:\n$$\\frac{K' - K}{K} \\times 100\\% = (1.44 - 1) \\times 100\\% = 44\\%$$"
  },
  {
    q_num: 59,
    question_text: "A heavy circular disc of mass $M$ is revolving in a horizontal plane with angular speed $\\omega$ about its centre which is fixed. An insect of mass $m$ walks from the centre to the edge and then flies relative to disc in vertically upward direction. New angular speed of disc is",
    options: [
      "\\frac{M\\omega}{M + m}",
      "\\frac{M\\omega}{M + 2m}",
      "\\frac{m\\omega}{M + m}",
      "\\omega"
    ],
    correct_index: 1,
    topic: "Conservation of Angular Momentum",
    difficulty: "medium",
    image_url: "",
    solution: "Initial moment of inertia of disc with insect at center:\n$$I_1 = \\frac{1}{2} M R^2$$\nWhen the insect of mass $m$ reaches the rim at radius $R$, the moment of inertia of the combined system is:\n$$I_2 = \\frac{1}{2} M R^2 + m R^2 = \\left(\\frac{1}{2} M + m\\right) R^2$$\nBy conservation of angular momentum while the insect is on the disc:\n$$I_1 \\omega = I_2 \\omega'$$\n$$\\left(\\frac{1}{2} M R^2\\right) \\omega = \\left(\\frac{1}{2} M + m\\right) R^2 \\omega' \\implies \\omega' = \\frac{M \\omega}{M + 2m}$$\nWhen the insect takes off vertically upwards relative to the disc, it exerts no horizontal torque on the disc.\nTherefore, the disc continues to rotate with the angular speed it had when the insect left the rim:\n$$\\omega_{\\text{final}} = \\frac{M \\omega}{M + 2m}$$"
  },
  {
    q_num: 60,
    question_text: "From a circular disc of radius $R$ and mass $9M$, a small disc of radius $\\frac{R}{3}$ is removed from the disc. The centre of smaller disc is at distance $\\frac{2R}{3}$ from the center $O$ of the whole disc. The moment of inertia of the remaining disc about an axis perpendicular to the plane of disc and passing through $O$ is",
    options: [
      "4MR^2",
      "\\frac{40}{9}MR^2",
      "10MR^2",
      "\\frac{37}{9}MR^2"
    ],
    correct_index: 0,
    topic: "Moment of Inertia of Disc with Cavity",
    difficulty: "medium",
    image_url: getImageUrl(60),
    solution: "Mass per unit area of the original disc:\n$$\\sigma = \\frac{9M}{\\pi R^2}$$\nMass of the removed circular portion of radius $\\frac{R}{3}$:\n$$m = \\sigma \\pi \\left(\\frac{R}{3}\\right)^2 = \\frac{9M}{\\pi R^2} \\times \\frac{\\pi R^2}{9} = M$$\n1. Moment of inertia of the complete original disc of mass $9M$ about the perpendicular central axis through $O$:\n$$I_{\\text{total}} = \\frac{1}{2}(9M)R^2 = \\frac{9}{2} M R^2$$\n2. Moment of inertia of the removed small disc about its own center of mass:\n$$I_{\\text{cm, removed}} = \\frac{1}{2} m \\left(\\frac{R}{3}\\right)^2 = \\frac{1}{2} M \\frac{R^2}{9} = \\frac{1}{18} M R^2$$\nBy parallel axis theorem, its moment of inertia about the center $O$ at distance $d = \\frac{2R}{3}$ is:\n$$I_{\\text{removed}, O} = I_{\\text{cm, removed}} + m d^2 = \\frac{1}{18} M R^2 + M \\left(\\frac{2R}{3}\\right)^2 = \\frac{1}{18} M R^2 + \\frac{4}{9} M R^2 = \\frac{9}{18} M R^2 = \\frac{1}{2} M R^2$$\n3. Moment of inertia of the remaining disc about $O$:\n$$I_{\\text{rem}} = I_{\\text{total}} - I_{\\text{removed}, O} = \\frac{9}{2} M R^2 - \\frac{1}{2} M R^2 = \\frac{8}{2} M R^2 = 4 M R^2$$"
  },
  {
    q_num: 61,
    question_text: "A cubical block of side $a$ and of mass $m$ rest on a rough horizontal surface. A horizontal force $F$ is applied normal to one of the faces at height $h$ above the base $h > a/2$. The minimum value of $F$ for which the cube begins to topple about an edge",
    options: [
      "F_{\\min} = \\frac{mga}{2h}",
      "F_{\\min} = \\frac{mga}{h}",
      "F_{\\min} = \\frac{2mga}{h}",
      "F_{\\min} = \\frac{3mga}{h}"
    ],
    correct_index: 0,
    topic: "Condition for Toppling",
    difficulty: "easy",
    image_url: getImageUrl(61),
    solution: "The cube begins to topple about its front bottom edge.\nAt the verge of toppling, the normal reaction shifts entirely to this edge.\nTaking torque about the toppling edge:\n- Clockwise toppling torque due to applied force $F$ at height $h$:\n$$\\tau_F = F \\times h$$\n- Anti-clockwise restoring torque due to weight $mg$ acting at the center of mass (distance $\\frac{a}{2}$ from the edge):\n$$\\tau_{mg} = mg \\times \\frac{a}{2}$$\nFor toppling to begin, $\\tau_F \\ge \\tau_{mg}$:\n$$F h \\ge \\frac{m g a}{2} \\implies F_{\\min} = \\frac{m g a}{2 h}$$"
  },
  {
    q_num: 62,
    question_text: "Let $I_1$ and $I_2$ be the moment of a inertia of uniform square plate about axes shown in the figure. Then the ratio $I_1 : I_2$ is",
    options: [
      "1 : \\frac{1}{7}",
      "1 : \\frac{12}{7}",
      "1 : \\frac{7}{12}",
      "1 : 7"
    ],
    correct_index: 3,
    topic: "Moment of Inertia of Square Plate",
    difficulty: "medium",
    image_url: getImageUrl(62),
    solution: "Let the uniform square plate have mass $M$ and side length $a$.\nAxis 1 passes through the center of mass along a diagonal of the plate.\nBy the perpendicular axis theorem, the moment of inertia about any diagonal in the plane is:\n$$I_1 = \\frac{M a^2}{12}$$\nAxis 2 is parallel to Axis 1, passing through the opposite corner of the square plate.\nThe perpendicular distance between Axis 1 (the diagonal) and Axis 2 (the parallel axis through the corner) is equal to half the length of the other diagonal:\n$$d = \\frac{a\\sqrt{2}}{2} = \\frac{a}{\\sqrt{2}}$$\nBy parallel axis theorem:\n$$I_2 = I_1 + M d^2 = \\frac{M a^2}{12} + M\\left(\\frac{a}{\\sqrt{2}}\\right)^2 = \\frac{M a^2}{12} + \\frac{M a^2}{2} = \\frac{M a^2 + 6 M a^2}{12} = \\frac{7 M a^2}{12}$$\nThe ratio $I_1 : I_2$ is:\n$$\\frac{I_1}{I_2} = \\frac{\\frac{M a^2}{12}}{\\frac{7 M a^2}{12}} = \\frac{1}{7} = 1 : 7$$"
  },
  {
    q_num: 63,
    question_text: "A light rigid rod connected with two particles of masses $m$ and $2m$ rotates in vertical plane against horizontal and vertical surfaces shown in the figure. The angular momentum of particle 1 relative to 2 is",
    options: [
      "\\frac{2mvl}{\\cos\\theta}",
      "mvl\\cos\\theta",
      "\\frac{mvl}{\\cos\\theta}",
      "\\frac{mvl}{\\sin\\theta}"
    ],
    correct_index: 3,
    topic: "Relative Angular Momentum",
    difficulty: "hard",
    image_url: getImageUrl(63),
    solution: "Let the length of the light rigid rod be $l$, inclined at angle $\\theta$ to the horizontal floor.\nParticle 2 (mass $2m$) moves horizontally along the floor with velocity $v$.\nThe coordinates of particle 2 are $(l\\cos\\theta, 0)$.\nDifferentiating with respect to time gives its velocity:\n$$v = \\left|\\frac{d(l\\cos\\theta)}{dt}\\right| = l\\sin\\theta \\left|\\frac{d\\theta}{dt}\\right| = l\\sin\\theta \\omega$$\n$$\\omega = \\frac{v}{l\\sin\\theta}$$\nSince the particles are connected by a rigid rod of length $l$, particle 1 rotates relative to particle 2 with this angular speed $\\omega$.\nThe moment of inertia of particle 1 (mass $m$) about particle 2 is $I = m l^2$.\nTherefore, the angular momentum of particle 1 relative to particle 2 is:\n$$L_{1/2} = I \\omega = (m l^2) \\left(\\frac{v}{l\\sin\\theta}\\right) = \\frac{m v l}{\\sin\\theta}$$"
  },
  {
    q_num: 64,
    question_text: "Angular momentum of the particle $p$ moving parallel to $X$-axis about origin $O$ is (in $\\text{kg}\\cdot\\text{m}^2/\\text{s}$)",
    options: [
      "50",
      "80",
      "60",
      "100"
    ],
    correct_index: 1,
    topic: "Angular Momentum about Origin",
    difficulty: "easy",
    image_url: getImageUrl(64),
    solution: "The particle $p$ of mass $m = 2\\text{ kg}$ is located at position $(3\\text{ m}, 4\\text{ m})$ and moves parallel to the $X$-axis with velocity $v = 10\\text{ m/s}$.\nThe line of motion is the horizontal line $y = 4\\text{ m}$.\nThe perpendicular distance from the origin $O(0, 0)$ to the line of motion is $r_\\perp = 4\\text{ m}$.\nTherefore, the magnitude of angular momentum about the origin $O$ is:\n$$L = m v r_\\perp = 2\\text{ kg} \\times 10\\text{ m/s} \\times 4\\text{ m} = 80\\text{ kg}\\cdot\\text{m}^2/\\text{s}$$"
  },
  {
    q_num: 65,
    question_text: "In the diagram given below a solid sphere of radius $r$ moving on horizontal surface with velocity of $2v_0$ and angular velocity $\\omega_0$. The angular momentum about an axis passing through horizontal surface as shown is ($v_0 = \\omega_0 r$):",
    options: [
      "2mv_0r",
      "\\frac{2}{5}mv_0r",
      "\\frac{8}{5}mv_0r",
      "\\frac{12}{5}mv_0r"
    ],
    correct_index: 3,
    topic: "Angular Momentum of Rolling Sphere",
    difficulty: "medium",
    image_url: getImageUrl(65),
    solution: "For a solid sphere of mass $m$ and radius $r$, the moment of inertia about its center of mass is:\n$$I_{\\text{cm}} = \\frac{2}{5} m r^2$$\nThe angular momentum about an axis through point $O$ on the horizontal surface perpendicular to the plane of motion is given by:\n$$\\vec{L}_O = \\vec{r}_{\\text{cm}/O} \\times (m \\vec{v}_{\\text{cm}}) + I_{\\text{cm}} \\vec{\\omega}_0$$\n1. Orbital angular momentum about $O$:\nThe center of mass is at height $r$ above the ground, moving to the right with velocity $v_{\\text{cm}} = 2v_0$. This produces clockwise angular momentum:\n$$L_{\\text{orbital}} = m v_{\\text{cm}} r = m (2v_0) r = 2 m v_0 r$$\n2. Spin angular momentum about the center of mass:\nThe sphere rotates clockwise with angular velocity $\\omega_0 = \\frac{v_0}{r}$:\n$$L_{\\text{spin}} = I_{\\text{cm}} \\omega_0 = \\left(\\frac{2}{5} m r^2\\right) \\left(\\frac{v_0}{r}\\right) = \\frac{2}{5} m v_0 r$$\nSince both contributions act in the same direction (clockwise):\n$$L_O = L_{\\text{orbital}} + L_{\\text{spin}} = 2 m v_0 r + \\frac{2}{5} m v_0 r = \\frac{12}{5} m v_0 r$$"
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('=== Seeding "System of Particles and Rotational Motion" into Neon Question Bank ===');

    const chapterName = 'System of Particles and Rotational Motion';
    const subjectId = 11; // Physics

    // Ensure Chapter exists in chapters table
    const chRes = await client.query(`
      SELECT id FROM chapters 
      WHERE subject_id = $1 AND (name = $2 OR name ILIKE '%rotat%')
      LIMIT 1
    `, [subjectId, chapterName]);

    let chapterId;
    if (chRes.rows.length > 0) {
      chapterId = chRes.rows[0].id;
      console.log(`Found existing chapter ID: ${chapterId}`);
    } else {
      const insCh = await client.query(`
        INSERT INTO chapters (subject_id, name, position)
        VALUES ($1, $2, 6)
        RETURNING id
      `, [subjectId, chapterName]);
      chapterId = insCh.rows[0].id;
      console.log(`Created new chapter "${chapterName}" with ID: ${chapterId}`);
    }

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

    console.log(`\n Successfully seeded ${inserted} questions into Question Bank for "${chapterName}".`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();
