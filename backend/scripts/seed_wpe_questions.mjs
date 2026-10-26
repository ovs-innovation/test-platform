import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load diagram mappings
let diagrams = {};
try {
  const mapPath = path.resolve(__dirname, 'work_energy_power_diagrams.json');
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
  // Page 1
  {
    q_num: 1,
    question_text: "Conservation of mechanical energy can be applied",
    options: [
      "In all cases",
      "If conservative and non-conservative forces alone perform work",
      "If conservative and external forces alone perform work",
      "If conservative force alone perform work"
    ],
    correct_index: 3,
    topic: "Work-Energy Theorem & Conservation Laws",
    difficulty: "easy",
    solution: "Mechanical energy ($E = K + U$) is conserved if and only if the work done by all non-conservative forces (like friction, air resistance) and external forces is zero, meaning only conservative forces perform work on the system."
  },
  {
    q_num: 2,
    question_text: "A particle attached to a light wire of length $l$ is projected horizontally with a velocity of $\\sqrt{5gl}$. Calculate its net acceleration when wire becomes horizontal.",
    options: ["Zero", "$\\sqrt{10}g$", "$g$", "$3g$"],
    correct_index: 1,
    topic: "Vertical Circular Motion",
    difficulty: "medium",
    solution: "By conservation of mechanical energy between lowest point and horizontal position:\n$$v^2 = u^2 - 2gl = 5gl - 2gl = 3gl$$\nCentripetal acceleration towards the center is:\n$$a_c = \\frac{v^2}{l} = \\frac{3gl}{l} = 3g$$\nTangential acceleration due to gravity acting vertically downwards is:\n$$a_t = g$$\nSince $a_c$ and $a_t$ are mutually perpendicular:\n$$a_{\\text{net}} = \\sqrt{a_c^2 + a_t^2} = \\sqrt{(3g)^2 + g^2} = \\sqrt{9g^2 + g^2} = \\sqrt{10}g$$"
  },
  {
    q_num: 3,
    question_text: "While walking without sliding on road the work done by friction is",
    options: ["Positive", "Zero", "Negative", "None"],
    correct_index: 1,
    topic: "Work Done by Forces",
    difficulty: "easy",
    solution: "When walking without sliding, the friction involved is static friction. The point of contact of the foot with the ground is momentarily at rest, so the displacement of the point of application of the frictional force is zero. Therefore, the work done by static friction on the person is zero."
  },
  {
    q_num: 4,
    question_text: "Two identical masses A and B are on same vertical line. A is released from rest while B is simultaneously projected upwards with a velocity of $50\\text{ m/s}$. Find the velocity of the combined mass just after collision considering perfectly inelastic collision. ($g = 10\\text{ m/s}^2$)",
    options: ["$20\\text{ m/s}$", "$5\\text{ m/s}$", "$15\\text{ m/s}$", "$25\\text{ m/s}$"],
    correct_index: 2,
    image_url: getImageUrl(4),
    topic: "Collisions in One Dimension",
    difficulty: "medium",
    solution: "1. Relative acceleration of both masses is zero since both experience downward gravitational acceleration $g$:\n$$a_{\\text{rel}} = g - g = 0$$\nRelative velocity of approach is $v_{\\text{rel}} = 50 - 0 = 50\\text{ m/s}$.\nInitial separation is $d = 50\\text{ m}$.\nTime to collide: $t = \\frac{d}{v_{\\text{rel}}} = \\frac{50}{50} = 1\\text{ s}$.\n\n2. Velocities just before collision at $t = 1\\text{ s}$:\nFor mass A: $v_A = 0 - g t = -10(1) = -10\\text{ m/s}$ (downwards).\nFor mass B: $v_B = 50 - g t = 50 - 10(1) = +40\\text{ m/s}$ (upwards).\n\n3. In a perfectly inelastic collision, both stick together ($m_A = m_B = m$):\n$$v_{\\text{combined}} = \\frac{m v_B + m v_A}{2m} = \\frac{40 - 10}{2} = \\frac{30}{2} = 15\\text{ m/s}$$\nThus, the velocity of the combined mass is $15\\text{ m/s}$ upwards."
  },
  {
    q_num: 5,
    question_text: "Calculate the angle $\\theta$ for which if the particle A is released, it undergoes perfectly elastic collision with another identical mass B placed at rest and B is found to just reach the horizontal position of its string.",
    options: ["$30^\\circ$", "$60^\\circ$", "$37^\\circ$", "$53^\\circ$"],
    correct_index: 1,
    image_url: getImageUrl(5),
    topic: "Collisions & Energy Conservation",
    difficulty: "medium",
    solution: "For mass B of string length $l$ to just reach the horizontal position, its velocity at the lowest point must be:\n$$v_B = \\sqrt{2gl}$$\nSince mass A and mass B are identical and the collision is head-on and perfectly elastic, their velocities are exchanged. Hence, mass A must arrive at the collision point with velocity:\n$$v_A = v_B = \\sqrt{2gl}$$\nParticle A is released from rest at angle $\\theta$ on a string of length $2l$, so the height it descends is $h = 2l(1 - \\cos\\theta)$:\n$$v_A^2 = 2g h = 2g(2l)(1 - \\cos\\theta) = 4gl(1 - \\cos\\theta)$$\nEquating this to $v_A^2 = 2gl$:\n$$4gl(1 - \\cos\\theta) = 2gl \\implies 1 - \\cos\\theta = \\frac{1}{2} \\implies \\cos\\theta = \\frac{1}{2} \\implies \\theta = 60^\\circ$$"
  },
  {
    q_num: 6,
    question_text: "The force acting on a particle constrained to move along x-axis varies as shown. Identify the correct option(s):",
    options: [
      "E is a neutral equilibrium position",
      "F is a stable equilibrium position",
      "B, D are unstable equilibrium position",
      "Both (1) and (3)"
    ],
    correct_index: 3,
    image_url: getImageUrl(6),
    topic: "Potential Energy Curves & Equilibrium",
    difficulty: "medium",
    solution: "Equilibrium occurs where net force $F = 0$ (crosses the x-axis):\n- For stable equilibrium, the slope $\\frac{dF}{dx} < 0$ (restoring force directed back to equilibrium).\n- For unstable equilibrium, the slope $\\frac{dF}{dx} > 0$ (displacing force acts away from equilibrium). At points B and D, the force curve passes through zero with positive slope, so B and D are unstable equilibrium positions.\n- At point E, the force is zero or region has zero slope/derivative, representing neutral equilibrium.\nTherefore, both (1) and (3) are correct, making option (4) the right choice."
  },
  {
    q_num: 7,
    question_text: "Calculate the acceleration of mass at the maximum elongation of spring if a constant force acts on block placed on smooth surface if the spring shown is in its natural length.",
    options: ["$\\frac{2F}{m}$", "$\\frac{F}{m}$", "Zero", "$\\frac{F}{2m}$"],
    correct_index: 1,
    image_url: getImageUrl(7),
    topic: "Spring-Mass Systems",
    difficulty: "medium",
    solution: "Using work-energy theorem from release to maximum elongation $x_{\\text{max}}$:\n$$W_{\\text{total}} = \\Delta K = 0 \\implies F x_{\\text{max}} - \\frac{1}{2} k x_{\\text{max}}^2 = 0 \\implies x_{\\text{max}} = \\frac{2F}{k}$$\nAt maximum elongation, the restoring spring force is:\n$$F_s = k x_{\\text{max}} = k\\left(\\frac{2F}{k}\\right) = 2F \\quad (\\text{to the left})$$\nThe net horizontal force acting on the block of mass $m$ is:\n$$F_{\\text{net}} = F - 2F = -F$$\nTherefore, the magnitude of acceleration is:\n$$a = \\frac{|F_{\\text{net}}|}{m} = \\frac{F}{m}$$"
  },
  {
    q_num: 8,
    question_text: "Work done by a conservative force in a closed path is",
    options: ["Positive", "Zero", "Negative", "All of these are possible"],
    correct_index: 1,
    topic: "Conservative Forces",
    difficulty: "easy",
    solution: "By definition of a conservative force, the line integral of the force along any closed path is zero:\n$$\\oint \\vec{F} \\cdot d\\vec{r} = 0$$\nHence, the total work done by a conservative force around any closed loop is always zero."
  },
  {
    q_num: 9,
    question_text: "A spring of spring constant $k$ is compressed by an amount of $x$ and a mass $m$ is just placed in contact with it and released. Calculate minimum value of $x$ for which the mass $m$ completes the vertical circle in the circular track.",
    options: [
      "$\\sqrt{2gR}\\sqrt{\\frac{m}{k}}$",
      "$\\sqrt{\\frac{5gR}{2}}\\sqrt{\\frac{m}{k}}$",
      "$\\sqrt{5gR}\\sqrt{\\frac{m}{k}}$",
      "None of these"
    ],
    correct_index: 2,
    image_url: getImageUrl(9),
    topic: "Vertical Circular Motion & Energy Conservation",
    difficulty: "medium",
    solution: "To complete a vertical circle of radius $R$, the particle must have a minimum speed at the lowest point of the track given by:\n$$v_{\\text{min}} = \\sqrt{5gR}$$\nBy conservation of mechanical energy, the elastic potential energy stored in the compressed spring is completely converted into kinetic energy of the mass $m$ upon release:\n$$\\frac{1}{2} k x^2 = \\frac{1}{2} m v^2 = \\frac{1}{2} m (5gR)$$\n$$k x^2 = 5mgR \\implies x = \\sqrt{\\frac{5mgR}{k}} = \\sqrt{5gR}\\sqrt{\\frac{m}{k}}$$"
  },
  {
    q_num: 10,
    question_text: "A particle of mass $m$ is moving in a circular path of fixed radius $r$ such that its centripetal acceleration $a_c$ is varying with time as $a_c = k^2 r t^2$, where $k$ is constant. The power delivered to the particle by the forces acting on it as a function of time $t$ is",
    options: ["$2\\pi m k^2 r^2 t$", "$m k^2 r^2 t$", "$\\frac{1}{3} m k^4 r^2 t^5$", "Zero"],
    correct_index: 1,
    topic: "Power & Circular Dynamics",
    difficulty: "medium",
    solution: "Centripetal acceleration is:\n$$a_c = \\frac{v^2}{r} = k^2 r t^2 \\implies v^2 = k^2 r^2 t^2 \\implies v = k r t$$\nTangential acceleration is:\n$$a_t = \\frac{dv}{dt} = k r$$\nCentripetal force is always perpendicular to velocity, so it delivers zero power. Power is delivered exclusively by the tangential force:\n$$P = F_t v = (m a_t) v = m (k r)(k r t) = m k^2 r^2 t$$"
  },

  // Page 2
  {
    q_num: 16,
    question_text: "Two perfectly elastic bodies A and B of equal masses travelling along the line joining them with velocity $15\\text{ m/s}$ and $10\\text{ m/s}$ respectively collide. Their velocity in m/s after the elastic collision will be respectively",
    options: ["0 and 25", "5 and 20", "10 and 15", "20 and 5"],
    correct_index: 2,
    topic: "Collisions in One Dimension",
    difficulty: "easy",
    solution: "In a one-dimensional head-on perfectly elastic collision between two bodies of equal mass ($m_1 = m_2$ and $e = 1$), the bodies completely exchange their velocities.\nTherefore:\n$$v_A' = u_B = 10\\text{ m/s}$$\n$$v_B' = u_A = 15\\text{ m/s}$$"
  },
  {
    q_num: 17,
    question_text: "A particle of mass $m_1$ strikes on ground with angle of incidence $45^\\circ$ and velocity $v$. If coefficient of restitution $e = \\frac{1}{\\sqrt{2}}$, the speed after reflection is",
    options: ["$\\frac{\\sqrt{3}v}{2}$", "$\\sqrt{3}v$", "$\\frac{v}{2}$", "$\\sqrt{\\frac{3}{2}}v$"],
    correct_index: 0,
    topic: "Oblique Collisions",
    difficulty: "medium",
    solution: "Parallel to the ground surface, no force acts, so the tangential component of velocity remains unchanged:\n$$v_\\parallel = v \\sin 45^\\circ = \\frac{v}{\\sqrt{2}}$$\nPerpendicular to the surface, the normal component is reduced by coefficient of restitution $e$:\n$$v_\\perp' = e v_\\perp = e (v \\cos 45^\\circ) = \\frac{1}{\\sqrt{2}}\\left(\\frac{v}{\\sqrt{2}}\\right) = \\frac{v}{2}$$\nThe final speed is:\n$$v' = \\sqrt{v_\\parallel^2 + (v_\\perp')^2} = \\sqrt{\\left(\\frac{v}{\\sqrt{2}}\\right)^2 + \\left(\\frac{v}{2}\\right)^2} = \\sqrt{\\frac{v^2}{2} + \\frac{v^2}{4}} = \\sqrt{\\frac{3v^2}{4}} = \\frac{\\sqrt{3}v}{2}$$"
  },
  {
    q_num: 18,
    question_text: "A pendulum consists of a wooden bob of mass $m$ and length $l$. A bullet of mass $m_1$ is fired towards the pendulum with a velocity $v_1$. The bullet comes out of the bob with speed $\\frac{v_1}{3}$ and the bob just completes motion along a vertical circle. The velocity $v_1$ is",
    options: [
      "$\\frac{3}{2}\\left(\\frac{m}{m_1}\\right)\\sqrt{5gl}$",
      "$\\frac{m}{m_1}\\sqrt{5gl}$",
      "$\\frac{2}{3}\\left(\\frac{m}{m_1}\\right)\\sqrt{gl}$",
      "$\\frac{3}{2}\\left(\\frac{m_1}{m}\\right)\\sqrt{5gl}$"
    ],
    correct_index: 0,
    topic: "Collisions & Vertical Circular Motion",
    difficulty: "medium",
    solution: "For the wooden bob to just complete motion in a vertical circle of radius $l$, its velocity immediately after the collision must be:\n$$v_b = \\sqrt{5gl}$$\nConserving linear momentum along the horizontal direction during collision:\n$$m_1 v_1 = m_1 \\left(\\frac{v_1}{3}\\right) + m v_b$$\n$$m_1 v_1 - \\frac{m_1 v_1}{3} = m \\sqrt{5gl} \\implies \\frac{2}{3} m_1 v_1 = m \\sqrt{5gl}$$\n$$v_1 = \\frac{3}{2}\\left(\\frac{m}{m_1}\\right)\\sqrt{5gl}$$"
  },
  {
    q_num: 19,
    question_text: "Displacement of a particle of mass $2\\text{ kg}$ varies with time as $S = (2t^2 - 2t + 10)\\text{ m}$, where $t$ in second. Find the total work done on the particle in a time interval from $t = 0$ to $t = 2\\text{ s}$",
    options: ["$26\\text{ J}$", "$32\\text{ J}$", "$28\\text{ J}$", "$36\\text{ J}$"],
    correct_index: 1,
    topic: "Work-Energy Theorem",
    difficulty: "easy",
    solution: "Velocity is the first derivative of displacement:\n$$v(t) = \\frac{dS}{dt} = 4t - 2$$\nAt $t = 0\\text{ s}$:\n$$v_0 = 4(0) - 2 = -2\\text{ m/s} \\implies K_0 = \\frac{1}{2} m v_0^2 = \\frac{1}{2}(2)(-2)^2 = 4\\text{ J}$$\nAt $t = 2\\text{ s}$:\n$$v_2 = 4(2) - 2 = 6\\text{ m/s} \\implies K_2 = \\frac{1}{2} m v_2^2 = \\frac{1}{2}(2)(6)^2 = 36\\text{ J}$$\nBy the work-energy theorem:\n$$W = \\Delta K = K_2 - K_0 = 36 - 4 = 32\\text{ J}$$"
  },
  {
    q_num: 1901,
    question_text: "The diagram shows a plot of potential energy as a function of $x$ for a particle moving along the $x$ axis. The point(s) of stable equilibrium are",
    options: ["Only a", "b, d", "Only c", "Only e"],
    correct_index: 1,
    image_url: getImageUrl(19),
    topic: "Potential Energy & Equilibrium",
    difficulty: "easy",
    solution: "Stable equilibrium corresponds to local minima of the potential energy curve $U(x)$, where $\\frac{dU}{dx} = 0$ and $\\frac{d^2U}{dx^2} > 0$. On the given plot, local minima occur precisely at points $b$ and $d$."
  },
  {
    q_num: 20,
    question_text: "A ball x of mass $1\\text{ kg}$ is moving with $4\\text{ ms}^{-1}$ along $+x$ axis collides elastically with another ball y of mass $2\\text{ kg}$ moving with $6\\text{ m/s}$ in opposite direction. The velocity of ball y after collision will be",
    options: [
      "$\\frac{2}{3}\\text{ m/s in }+x\\text{ axis}$",
      "$\\frac{3}{2}\\text{ m/s in }-x\\text{ axis}$",
      "$\\frac{2}{3}\\text{ m/s in }-x\\text{ axis}$",
      "$\\frac{5}{3}\\text{ m/s in }+x\\text{ axis}$"
    ],
    correct_index: 0,
    topic: "Collisions in One Dimension",
    difficulty: "medium",
    solution: "Given $m_1 = 1\\text{ kg}$, $u_1 = +4\\text{ m/s}$, $m_2 = 2\\text{ kg}$, $u_2 = -6\\text{ m/s}$.\nFor a perfectly elastic 1D collision:\n$$v_2 = \\frac{2m_1 u_1 + (m_2 - m_1)u_2}{m_1 + m_2}$$\n$$v_2 = \\frac{2(1)(4) + (2 - 1)(-6)}{1 + 2} = \\frac{8 - 6}{3} = +\\frac{2}{3}\\text{ m/s}$$\nThe positive sign indicates motion along the $+x$ axis."
  },
  {
    q_num: 21,
    question_text: "Ball 1 collides with another identical ball 2 at rest as shown in figure. For what value of coefficient of restitution $e$, the velocity of second ball becomes two times that of 1 after collision?",
    options: ["$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{1}{4}$", "$\\frac{1}{6}$"],
    correct_index: 0,
    image_url: getImageUrl(21),
    topic: "Collisions & Restitution",
    difficulty: "medium",
    solution: "For identical balls ($m_1 = m_2 = m$) with target initially at rest ($u_2 = 0$):\n$$v_1 = \\frac{u_1(1 - e)}{2}, \\quad v_2 = \\frac{u_1(1 + e)}{2}$$\nGiven $v_2 = 2 v_1$:\n$$\\frac{u_1(1 + e)}{2} = 2 \\left(\\frac{u_1(1 - e)}{2}\\right) \\implies 1 + e = 2(1 - e) \\implies 1 + e = 2 - 2e \\implies 3e = 1 \\implies e = \\frac{1}{3}$$"
  },
  {
    q_num: 22,
    question_text: "A simple pendulum of length $l$ and mass $m$ is initially at its lowest position. It is given the minimum horizontal speed necessary to move in a circular path about the point of suspension. The tension in the string at the lowest position of bob is",
    options: ["$3mg$", "$4mg$", "$5mg$", "$6mg$"],
    correct_index: 3,
    topic: "Vertical Circular Motion",
    difficulty: "easy",
    solution: "The minimum speed required at the lowest point to complete a full vertical circle is $u = \\sqrt{5gl}$.\nAt the lowest point, the tension $T$ must provide both the weight and centripetal force:\n$$T - mg = \\frac{m u^2}{l} \\implies T = mg + \\frac{m(5gl)}{l} = mg + 5mg = 6mg$$"
  },
  {
    q_num: 23,
    question_text: "A stone of mass $m$ is tied to a string and is moved in a vertical circle of radius $r$ and has angular velocity $n\\text{ rev/min}$ at bottom most point. The tension in the string when the stone is at the lowest point is",
    options: [
      "$mg$",
      "$m(g + \\pi n^2)$",
      "$m(g + n r)$",
      "$m\\left[g + \\frac{\\pi^2 n^2 r}{900}\\right]$"
    ],
    correct_index: 3,
    topic: "Vertical Circular Motion",
    difficulty: "medium",
    solution: "Convert angular velocity from rpm to rad/s:\n$$\\omega = \\frac{2\\pi n}{60} = \\frac{\\pi n}{30}\\text{ rad/s}$$\nAt the lowest point, tension in the string is:\n$$T = mg + m \\omega^2 r = mg + m \\left(\\frac{\\pi n}{30}\\right)^2 r = m\\left[g + \\frac{\\pi^2 n^2 r}{900}\\right]$$"
  },
  {
    q_num: 24,
    question_text: "A particle accelerating uniformly has velocity $v$ at time $t_1$. Calculate the work done on the particle in time $t (t > t_1)$",
    options: [
      "$\\frac{1}{2}\\left(\\frac{m v^2}{t_1^2}\\right)t^2$",
      "$\\frac{1}{2}\\left(\\frac{m v}{t_1}\\right)^2 t^2$",
      "$\\frac{m v^2}{t_1^2}t^2$",
      "$\\left(\\frac{2m v^2}{t_1^2}\\right)t^2$"
    ],
    correct_index: 0,
    topic: "Work Done by Constant Force",
    difficulty: "medium",
    solution: "Since acceleration is uniform and particle starts from rest:\n$$a = \\frac{v}{t_1}$$\nVelocity at time $t$ is:\n$$v(t) = a t = \\frac{v t}{t_1}$$\nBy work-energy theorem, work done from $0$ to $t$ is:\n$$W = \\Delta K = \\frac{1}{2} m [v(t)]^2 = \\frac{1}{2} m \\left(\\frac{v t}{t_1}\\right)^2 = \\frac{1}{2}\\left(\\frac{m v^2}{t_1^2}\\right)t^2$$"
  },
  {
    q_num: 25,
    question_text: "A ball is dropped from height $h_0$ and after striking with the ground it rises up to height $h$. The coefficient of restitution between the ball and the ground is",
    options: ["$\\frac{h}{h_0}$", "$\\left(\\frac{h}{h_0}\\right)^2$", "$\\sqrt{\\frac{h}{h_0}}$", "$\\left(\\frac{h_0}{h}\\right)^2$"],
    correct_index: 2,
    topic: "Collisions & Restitution",
    difficulty: "easy",
    solution: "Velocity just before striking the ground: $u = \\sqrt{2gh_0}$.\nVelocity just after rebound: $v = e u = e \\sqrt{2gh_0}$.\nHeight attained after rebound is $h = \\frac{v^2}{2g} = \\frac{e^2(2gh_0)}{2g} = e^2 h_0$.\nTherefore:\n$$e = \\sqrt{\\frac{h}{h_0}}$$"
  },
  {
    q_num: 26,
    question_text: "A shell of mass $200\\text{ g}$ is ejected from a gun of mass $4\\text{ kg}$ by an explosion that generates $1.05\\text{ kJ}$ of energy. The initial velocity of the shell is",
    options: ["$100\\text{ ms}^{-1}$", "$80\\text{ ms}^{-1}$", "$40\\text{ ms}^{-1}$", "$120\\text{ ms}^{-1}$"],
    correct_index: 0,
    topic: "Conservation of Momentum & Energy",
    difficulty: "medium",
    solution: "Let $m = 0.2\\text{ kg}$ (shell), $M = 4\\text{ kg}$ (gun).\nBy conservation of momentum, gun and shell have equal and opposite momentum magnitude $p$.\nTotal kinetic energy released is:\n$$E = \\frac{p^2}{2m} + \\frac{p^2}{2M} = \\frac{p^2}{2m}\\left(1 + \\frac{m}{M}\\right) = K_{\\text{shell}}\\left(1 + \\frac{0.2}{4}\\right) = 1.05 K_{\\text{shell}}$$\nGiven $E = 1.05\\text{ kJ} = 1050\\text{ J}$:\n$$1.05 K_{\\text{shell}} = 1050 \\implies K_{\\text{shell}} = 1000\\text{ J}$$\n$$\\frac{1}{2} m v^2 = 1000 \\implies \\frac{1}{2}(0.2) v^2 = 1000 \\implies 0.1 v^2 = 1000 \\implies v^2 = 10000 \\implies v = 100\\text{ ms}^{-1}$$"
  },
  {
    q_num: 27,
    question_text: "A block C of mass $m$ is moving with velocity $v_0$ and collides elastically with block A of mass $m$ and connected to another block B of mass $2m$ through a spring of spring constant $K$. Find the value of $K$, if $x_0$ is the compression of the spring when velocities of A and B are same.",
    options: [
      "$\\frac{m v_0^2}{x_0^2}$",
      "$\\frac{m v_0^2}{2 x_0^2}$",
      "$\\frac{3}{2}\\frac{m v_0^2}{x_0^2}$",
      "$\\frac{2}{3}\\frac{m v_0^2}{x_0^2}$"
    ],
    correct_index: 3,
    image_url: getImageUrl(27),
    topic: "Collisions & Spring-Mass Dynamics",
    difficulty: "hard",
    solution: "1. In the elastic collision between block C and identical block A, velocity is exchanged. Block C stops and block A acquires velocity $v_0$.\n2. System now consists of A ($m$) and B ($2m$) connected by spring $K$. Total initial kinetic energy:\n$$E_i = \\frac{1}{2} m v_0^2$$\n3. When velocities of A and B are equal, spring is at maximum compression $x_0$, and their common velocity is the center of mass velocity:\n$$v_{\\text{cm}} = \\frac{m v_0}{m + 2m} = \\frac{v_0}{3}$$\n4. By conservation of energy:\n$$\\frac{1}{2} m v_0^2 = \\frac{1}{2}(m + 2m) v_{\\text{cm}}^2 + \\frac{1}{2} K x_0^2 = \\frac{1}{2}(3m)\\left(\\frac{v_0}{3}\\right)^2 + \\frac{1}{2} K x_0^2 = \\frac{1}{6} m v_0^2 + \\frac{1}{2} K x_0^2$$\n$$\\frac{1}{2} K x_0^2 = \\frac{1}{2} m v_0^2 - \\frac{1}{6} m v_0^2 = \\frac{1}{3} m v_0^2 \\implies K = \\frac{2 m v_0^2}{3 x_0^2}$$"
  },
  {
    q_num: 28,
    question_text: "A uniform chain has mass $M$ and length $L$. It is placed on a frictionless table with length $l_0$ hanging over the edge. The chain begins to slide down. Then the speed $v$ with which the chain falls when the entire length of chain just becomes vertical is",
    options: [
      "$v = \\sqrt{\\frac{g}{3L}(L + l_0)}$",
      "$v = \\sqrt{\\frac{g}{L}(L^2 - l_0^2)}$",
      "$v = \\sqrt{\\frac{g}{L}(L + l_0)}$",
      "$v = \\sqrt{2g(L - l_0)}$"
    ],
    correct_index: 1,
    topic: "Work & Potential Energy of Continuous Systems",
    difficulty: "hard",
    solution: "Taking the table surface as reference for potential energy ($U = 0$):\n- Initially, hanging part has mass $M \\frac{l_0}{L}$ and center of mass at depth $\\frac{l_0}{2}$. Hence, initial potential energy is:\n$$U_i = -\\left(M \\frac{l_0}{L}\\right) g \\left(\\frac{l_0}{2}\\right) = -\\frac{M g l_0^2}{2L}$$\n- Finally, the entire chain hangs vertically with mass $M$ and center of mass at depth $\\frac{L}{2}$:\n$$U_f = -M g \\left(\\frac{L}{2}\\right) = -\\frac{M g L^2}{2L}$$\nBy conservation of mechanical energy:\n$$\\Delta K = -\\Delta U \\implies \\frac{1}{2} M v^2 = U_i - U_f = \\frac{M g}{2L}(L^2 - l_0^2)$$\n$$v = \\sqrt{\\frac{g}{L}(L^2 - l_0^2)}$$"
  },

  // Page 3
  {
    q_num: 34,
    question_text: "If $U$ represents the potential energy of particle constrained to move along x-axis, then for $U = ax^2 - bx$, find out the value of $x$ where stable equilibrium is attained",
    options: ["$\\frac{b}{2a}$", "$\\frac{2a}{b}$", "$\\frac{a}{b}$", "There is no position of stable equilibrium"],
    correct_index: 0,
    topic: "Potential Energy Curves & Equilibrium",
    difficulty: "easy",
    solution: "Equilibrium condition: $F = -\\frac{dU}{dx} = 0$.\n$$\\frac{dU}{dx} = 2ax - b = 0 \\implies x = \\frac{b}{2a}$$\nSecond derivative:\n$$\\frac{d^2U}{dx^2} = 2a$$\nFor $a > 0$, $\\frac{d^2U}{dx^2} > 0$, confirming stable equilibrium at $x = \\frac{b}{2a}$."
  },
  {
    q_num: 35,
    question_text: "Calculate the maximum elongation of the spring considering that the block is released from rest from the natural length position of spring.",
    options: ["$\\frac{2mg}{k}$", "$\\frac{4mg}{k}$", "$\\frac{mg}{k}$", "Zero"],
    correct_index: 0,
    image_url: getImageUrl(35),
    topic: "Vertical Spring-Mass System",
    difficulty: "easy",
    solution: "Let maximum elongation be $x_{\\text{max}}$. Using work-energy theorem from release (at rest) to maximum elongation (momentarily at rest):\n$$W_g + W_s = \\Delta K = 0$$\n$$mg x_{\\text{max}} - \\frac{1}{2} k x_{\\text{max}}^2 = 0 \\implies x_{\\text{max}} = \\frac{2mg}{k}$$"
  },
  {
    q_num: 36,
    question_text: "Which among the following forces is an example of conservative forces?",
    options: ["Gravity", "Spring", "Electrostatic", "All of these"],
    correct_index: 3,
    topic: "Conservative Forces",
    difficulty: "easy",
    solution: "Gravitational force, spring force, and electrostatic force are all path-independent forces whose work done in a closed path is zero. Hence, all of these are classic examples of conservative forces."
  },
  {
    q_num: 37,
    question_text: "Calculate the maximum compression of the spring",
    options: ["$v\\sqrt{\\frac{k}{m}}$", "$v\\sqrt{\\frac{m}{k}}$", "$v\\sqrt{\\frac{k}{2m}}$", "$v\\sqrt{\\frac{2k}{m}}$"],
    correct_index: 1,
    image_url: getImageUrl(37),
    topic: "Spring-Mass Systems",
    difficulty: "easy",
    solution: "On a smooth surface ($\\mu = 0$), mechanical energy is conserved:\n$$\\frac{1}{2} m v^2 = \\frac{1}{2} k x_{\\text{max}}^2 \\implies x_{\\text{max}} = v\\sqrt{\\frac{m}{k}}$$"
  },
  {
    q_num: 38,
    question_text: "If a particle loses 20% of its speed after penetrating through a single plank. Calculate the minimum number of planks required to completely stop the particle.",
    options: ["6", "8", "4", "3"],
    correct_index: 3,
    topic: "Work-Energy Theorem",
    difficulty: "medium",
    solution: "Initial speed is $u$. After penetrating 1 plank, speed becomes $v_1 = 0.8 u$.\nWork done by resistive force of one plank is equal to the loss of kinetic energy:\n$$W_1 = \\frac{1}{2} m u^2 - \\frac{1}{2} m (0.8 u)^2 = \\frac{1}{2} m u^2 (1 - 0.64) = 0.36 K_0$$\nTotal number of planks $n$ required to dissipate all kinetic energy $K_0$:\n$$n = \\frac{K_0}{W_1} = \\frac{K_0}{0.36 K_0} = \\frac{100}{36} \\approx 2.78$$\nSince 2 planks are insufficient, a minimum of 3 planks is required to completely stop the particle."
  },
  {
    q_num: 39,
    question_text: "A particle slides on the surface of a fixed smooth sphere starting from the topmost point. Find the angle rotated by the radius through the particle, when it leaves contact with the sphere.",
    options: [
      "$\\cos^{-1}\\left(\\frac{1}{3}\\right)$",
      "$\\cos^{-1}\\left(\\frac{2}{3}\\right)$",
      "$\\tan^{-1}\\left(\\frac{1}{3}\\right)$",
      "$\\tan^{-1}\\left(\\frac{2}{3}\\right)$"
    ],
    correct_index: 1,
    topic: "Circular Motion & Normal Force",
    difficulty: "medium",
    solution: "At angle $\\theta$ from the vertical, speed gained by descending $h = R(1 - \\cos\\theta)$ is:\n$$v^2 = 2gR(1 - \\cos\\theta)$$\nEquation of motion along the radial direction:\n$$mg \\cos\\theta - N = \\frac{m v^2}{R}$$\nThe particle leaves contact when the normal reaction $N = 0$:\n$$mg \\cos\\theta = \\frac{m v^2}{R} = \\frac{m [2gR(1 - \\cos\\theta)]}{R} = 2mg(1 - \\cos\\theta)$$\n$$\\cos\\theta = 2 - 2\\cos\\theta \\implies 3\\cos\\theta = 2 \\implies \\theta = \\cos^{-1}\\left(\\frac{2}{3}\\right)$$"
  },
  {
    q_num: 40,
    question_text: "A uniform rope of length $l$ lies on table. If the coefficient of friction is $\\mu$ then the maximum length $x$, of the part of this rope which can overhang from the edge of the table without sliding down is",
    options: ["$\\frac{l}{\\mu}$", "$\\frac{l}{\\mu+1}$", "$\\frac{\\mu l}{\\mu+1}$", "$\\frac{\\mu l}{\\mu-1}$"],
    correct_index: 2,
    topic: "Friction & Equilibrium",
    difficulty: "easy",
    solution: "Let mass per unit length be $\\lambda$. Hanging mass is $\\lambda x$, weight pulling down is $\\lambda x g$.\nMass of rope on the table is $\\lambda (l - x)$, normal force is $\\lambda(l - x)g$.\nMaximum static friction force is $f_{\\text{max}} = \\mu \\lambda(l - x)g$.\nFor equilibrium without sliding:\n$$\\lambda x g = \\mu \\lambda(l - x)g \\implies x = \\mu l - \\mu x \\implies x(1 + \\mu) = \\mu l \\implies x = \\frac{\\mu l}{\\mu + 1}$$"
  },
  {
    q_num: 41,
    question_text: "The force acting on an object varies with the distance travelled by the object as shown in figure. Work done by the force in moving the object from $x = 0\\text{ m}$ to $x = 4\\text{ m}$ is",
    options: ["$4\\text{ J}$", "$\\frac{16}{3}\\text{ J}$", "$\\frac{4}{3}\\text{ J}$", "$12\\text{ J}$"],
    correct_index: 1,
    image_url: getImageUrl(41),
    topic: "Work Done by Variable Force",
    difficulty: "medium",
    solution: "For a parabolic varying force $F = c x^2$ where $F(4) = 4\\text{ N} \\implies c = 4/16 = 1/4$:\n$$W = \\int_0^4 \\frac{1}{4} x^2 dx = \\left[\\frac{x^3}{12}\\right]_0^4 = \\frac{64}{12} = \\frac{16}{3}\\text{ J}$$"
  },
  {
    q_num: 42,
    question_text: "A block slides down an inclined plane of inclination $\\theta$ with constant velocity. It is then projected up the inclined plane with an initial speed $u$. How far up the incline will it move before coming to rest?",
    options: ["$\\frac{u^2}{4g\\sin\\theta}$", "$\\frac{u^2}{g\\sin\\theta}$", "$\\frac{u^2}{2g\\sin\\theta}$", "$\\frac{u^2}{g}$"],
    correct_index: 0,
    topic: "Work & Energy on Inclined Plane",
    difficulty: "medium",
    solution: "When sliding down with constant velocity, net acceleration is zero:\n$$mg \\sin\\theta = f = \\mu mg \\cos\\theta$$\nWhen projected up the incline, both gravity and friction act downwards along the incline, so the retarding acceleration is:\n$$a = g \\sin\\theta + \\frac{f}{m} = g \\sin\\theta + g \\sin\\theta = 2g \\sin\\theta$$\nDistance travelled up before coming to rest ($v = 0$):\n$$s = \\frac{u^2}{2a} = \\frac{u^2}{2(2g \\sin\\theta)} = \\frac{u^2}{4g \\sin\\theta}$$"
  },
  {
    q_num: 43,
    question_text: "When we drop a block of mass $m$ from the relaxed position of a spring of stiffness $k$ from rest, the compression where speed of the block is maximum is",
    options: ["$\\frac{mg}{k}$", "$\\frac{mg}{2k}$", "$\\frac{2mg}{k}$", "$\\frac{4mg}{k}$"],
    correct_index: 0,
    image_url: getImageUrl(43),
    topic: "Vertical Spring Oscillations",
    difficulty: "easy",
    solution: "Speed of the block is maximum at the equilibrium position where the net force and acceleration are zero:\n$$F_{\\text{net}} = mg - k x = 0 \\implies x = \\frac{mg}{k}$$"
  },
  {
    q_num: 44,
    question_text: "If, $M \\gg m$ for the elastic collision between the smooth bodies of masses $M$ and $m$, the maximum compression of the spring of stiffness $k$ will be",
    options: ["$v\\sqrt{\\frac{m}{k}}$", "$v\\sqrt{\\frac{m}{2k}}$", "$2v\\sqrt{\\frac{m}{k}}$", "$v\\sqrt{\\frac{2m}{k}}$"],
    correct_index: 0,
    image_url: getImageUrl(44),
    topic: "Collisions & Springs",
    difficulty: "medium",
    solution: "Since $M \\gg m$, the velocity of the heavy mass $M$ remains essentially unchanged at $v$. In the reference frame of mass $M$, the light mass $m$ approaches with relative velocity $v$. At maximum compression, $m$ is momentarily at rest relative to $M$:\n$$\\frac{1}{2} k x_{\\text{max}}^2 = \\frac{1}{2} m v_{\\text{rel}}^2 = \\frac{1}{2} m v^2 \\implies x_{\\text{max}} = v\\sqrt{\\frac{m}{k}}$$"
  },
  {
    q_num: 45,
    question_text: "A ball of mass $m$ is released from a height $h$. If the coefficient of restitution $e = \\frac{1}{2}$, the energy loss during first collision is",
    options: ["$\\frac{mgh}{2}$", "$\\frac{mgh}{4}$", "$\\frac{3mgh}{4}$", "$\\frac{2mgh}{3}$"],
    correct_index: 2,
    topic: "Collisions & Energy Dissipation",
    difficulty: "easy",
    solution: "Initial kinetic energy before collision: $K_i = mgh$.\nVelocity after collision is $v' = e v$, so kinetic energy after rebound is:\n$$K_f = e^2 K_i = \\left(\\frac{1}{2}\\right)^2 mgh = \\frac{1}{4} mgh$$\nEnergy loss during the collision:\n$$\\Delta E = K_i - K_f = mgh - \\frac{1}{4} mgh = \\frac{3}{4} mgh$$"
  },
  {
    q_num: 46,
    question_text: "A bullet of mass $m$ hits the hanging block, of same mass with a velocity $v$. The change in tension in the string just before and after collision is (Consider collision is perfectly inelastic)",
    options: [
      "$\\frac{m v^2}{l}$",
      "$\\frac{2m v^2}{l} + mg$",
      "$m\\left(g + \\frac{v^2}{2l}\\right)$",
      "$\\frac{2m v^2}{3}$"
    ],
    correct_index: 2,
    topic: "Collisions & Tension in Pendulum",
    difficulty: "medium",
    solution: "Before collision: block of mass $m$ is at rest, tension is $T_i = mg$.\nIn perfectly inelastic collision with bullet of mass $m$, common speed just after collision is:\n$$V = \\frac{m v}{m + m} = \\frac{v}{2}$$\nJust after collision, the total mass is $2m$, and tension provides weight plus centripetal force:\n$$T_f = (2m)g + \\frac{(2m) V^2}{l} = 2mg + \\frac{2m(v/2)^2}{l} = 2mg + \\frac{m v^2}{2l}$$\nChange in tension:\n$$\\Delta T = T_f - T_i = \\left(2mg + \\frac{m v^2}{2l}\\right) - mg = mg + \\frac{m v^2}{2l} = m\\left(g + \\frac{v^2}{2l}\\right)$$"
  },
  {
    q_num: 47,
    question_text: "A position dependent force $F = (7 - 2x + 3x^2)\\text{ newton}$ acts on a small body of mass $2\\text{ kg}$ and displaces it from $x = 0\\text{ m}$ to $x = 5\\text{ m}$. The work done by the force is",
    options: ["$0\\text{ J}$", "$270\\text{ J}$", "$80\\text{ J}$", "$135\\text{ J}$"],
    correct_index: 3,
    topic: "Work Done by Variable Force",
    difficulty: "easy",
    solution: "Work done is given by the integral of force with respect to position:\n$$W = \\int_0^5 F(x) dx = \\int_0^5 (7 - 2x + 3x^2) dx = \\left[7x - x^2 + x^3\\right]_0^5$$\n$$W = 7(5) - (5)^2 + (5)^3 = 35 - 25 + 125 = 135\\text{ J}$$"
  },

  // Page 4
  {
    q_num: 54,
    question_text: "A constant horizontal force is applied on the hanging bob of a simple pendulum of mass $m$, starting from vertical position as shown. The string deflects through a maximum angle $\\theta$. Find $\\frac{F}{mg}$.",
    options: ["$\\tan\\theta$", "$\\cot\\theta$", "$\\cot\\left(\\frac{\\theta}{2}\\right)$", "$\\tan\\left(\\frac{\\theta}{2}\\right)$"],
    correct_index: 3,
    image_url: getImageUrl(54),
    topic: "Work-Energy Theorem",
    difficulty: "medium",
    solution: "At maximum deflection $\\theta$, the bob comes momentarily to rest, so $\\Delta K = 0$.\nWork done by horizontal force $F$ is $W_F = F (l \\sin\\theta)$.\nWork done by gravity is $W_g = -mg l (1 - \\cos\\theta)$.\nBy work-energy theorem:\n$$W_F + W_g = 0 \\implies F l \\sin\\theta = mg l (1 - \\cos\\theta)$$\n$$\\frac{F}{mg} = \\frac{1 - \\cos\\theta}{\\sin\\theta} = \\frac{2\\sin^2(\\theta/2)}{2\\sin(\\theta/2)\\cos(\\theta/2)} = \\tan\\left(\\frac{\\theta}{2}\\right)$$"
  },
  {
    q_num: 55,
    question_text: "A particle strikes the surface and rebounds as shown in the figure. Calculate the coefficient of restitution $e$.",
    options: ["$\\frac{8}{9}$", "$\\frac{9}{25}$", "$\\frac{9}{16}$", "$\\frac{12}{16}$"],
    correct_index: 2,
    image_url: getImageUrl(55),
    topic: "Oblique Collisions",
    difficulty: "medium",
    solution: "Let incident speed be $u$ at angle $37^\\circ$ to normal, and rebound speed be $v$ at $53^\\circ$ to normal.\nTangential component remains conserved:\n$$u \\sin 37^\\circ = v \\sin 53^\\circ \\implies v = u \\frac{\\sin 37^\\circ}{\\sin 53^\\circ} = u \\frac{3/5}{4/5} = \\frac{3}{4} u$$\nNormal component satisfies $v \\cos 53^\\circ = e u \\cos 37^\\circ$:\n$$e = \\frac{v \\cos 53^\\circ}{u \\cos 37^\\circ} = \\frac{(3/4 u)(3/5)}{u (4/5)} = \\frac{3}{4} \\times \\frac{3}{4} = \\frac{9}{16}$$"
  },
  {
    q_num: 56,
    question_text: "A particle is dropped from a height of $80\\text{ m}$ and the coefficient of restitution of its collision with the ground is $e = \\frac{1}{2}$. Calculate the total distance covered by the particle before it finally stops",
    options: ["$400\\text{ m}$", "$\\frac{400}{3}\\text{ m}$", "$\\frac{1600}{3}\\text{ m}$", "$\\frac{200}{3}\\text{ m}$"],
    correct_index: 1,
    topic: "Successive Collisions & Infinite Series",
    difficulty: "medium",
    solution: "Total distance covered by a particle dropped from height $H$ undergoing successive bounces with restitution $e$ is:\n$$S = H + 2 e^2 H + 2 e^4 H + \\dots = H\\left[1 + 2e^2(1 + e^2 + e^4 + \\dots)\\right] = H\\left[1 + \\frac{2e^2}{1 - e^2}\\right] = H\\left(\\frac{1 + e^2}{1 - e^2}\\right)$$\nWith $H = 80\\text{ m}$ and $e = 1/2$ ($e^2 = 1/4$):\n$$S = 80 \\left(\\frac{1 + 1/4}{1 - 1/4}\\right) = 80 \\left(\\frac{5/4}{3/4}\\right) = 80 \\times \\frac{5}{3} = \\frac{400}{3}\\text{ m}$$"
  },
  {
    q_num: 57,
    question_text: "Two particles undergoes perfectly inelastic collision as shown in the figure. The final speed of the bodies is",
    options: ["$7\\text{ m/s}$", "$4\\text{ m/s}$", "$3\\text{ m/s}$", "$1\\text{ m/s}$"],
    correct_index: 3,
    image_url: getImageUrl(57),
    topic: "Collisions in One Dimension",
    difficulty: "easy",
    solution: "Particle 1: $m_1 = 2\\text{ kg}$, $u_1 = +10\\text{ m/s}$.\nParticle 2: $m_2 = 3\\text{ kg}$, $u_2 = -5\\text{ m/s}$.\nBy conservation of linear momentum in perfectly inelastic collision:\n$$(m_1 + m_2) v = m_1 u_1 + m_2 u_2$$\n$$(2 + 3) v = 2(10) + 3(-5) = 20 - 15 = 5 \\implies 5 v = 5 \\implies v = 1\\text{ m/s}$$"
  },
  {
    q_num: 58,
    question_text: "A small sphere undergoes vertical circular motion inside a smooth vertical tube where sphere just fits inside the tube as shown in the diagram. Calculate minimum speed required at the bottom-most so that it could go in the complete loop.",
    options: ["$\\sqrt{5gR}$", "$\\sqrt{4gR}$", "$\\sqrt{2gR}$", "$\\sqrt{gR}$"],
    correct_index: 1,
    image_url: getImageUrl(58),
    topic: "Vertical Circular Motion",
    difficulty: "medium",
    solution: "In a closed vertical tube, the sphere is constrained by the tube walls and cannot leave the path even if normal force changes direction. Hence, the condition to complete the loop is simply that the velocity at the highest point must be greater than or equal to zero ($v_{\\text{top}} \\ge 0$):\n$$v_{\\text{bot}}^2 - 2g(2R) = v_{\\text{top}}^2 \\ge 0 \\implies v_{\\text{bot}} \\ge \\sqrt{4gR}$$"
  },
  {
    q_num: 59,
    question_text: "The potential energy of a force field $\\vec{F}$ is given in terms of co-ordinates by $U(x, y) = \\cos(x + y)$. The force acting on a particle at position given by coordinate $(0, \\pi/4)$ is",
    options: [
      "$\\frac{1}{\\sqrt{2}}(\\hat{i} + \\hat{j})$",
      "$\\frac{1}{\\sqrt{2}}(\\hat{i} - \\hat{j})$",
      "$\\left(\\frac{\\hat{i}}{2} + \\frac{\\sqrt{3}\\hat{j}}{2}\\right)$",
      "$\\left(\\frac{\\hat{i}}{2} - \\frac{\\sqrt{3}\\hat{j}}{2}\\right)$"
    ],
    correct_index: 0,
    topic: "Conservative Force Field & Potential Gradient",
    difficulty: "medium",
    solution: "Force is the negative gradient of potential energy:\n$$F_x = -\\frac{\\partial U}{\\partial x} = -(-\\sin(x+y)) = \\sin(x+y)$$\n$$F_y = -\\frac{\\partial U}{\\partial y} = -(-\\sin(x+y)) = \\sin(x+y)$$\nAt position $(0, \\pi/4)$:\n$$\\sin(0 + \\pi/4) = \\frac{1}{\\sqrt{2}}$$\n$$\\vec{F} = \\frac{1}{\\sqrt{2}}(\\hat{i} + \\hat{j})$$"
  },
  {
    q_num: 60,
    question_text: "If there is work done on a system only by non-conservative force, then potential energy of system due to this work will",
    options: ["Increase", "Decrease", "Remain constant", "Increase or decrease depending upon direction of force"],
    correct_index: 2,
    topic: "Potential Energy Definition",
    difficulty: "easy",
    solution: "Potential energy is defined solely for conservative forces ($\\Delta U = -W_{\\text{cons}}$). Non-conservative forces (like friction) do not have an associated potential energy, so any work done solely by non-conservative forces produces no change in potential energy."
  },
  {
    q_num: 61,
    question_text: "Two balls having mass $m_1$ and $m_2$ respectively are moving with equal kinetic energy, then ratio of their linear momentum will be",
    options: ["$\\frac{m_1}{m_2}$", "$\\frac{m_2}{m_1}$", "$\\sqrt{\\frac{m_1}{m_2}}$", "$\\sqrt{\\frac{m_2}{m_1}}$"],
    correct_index: 2,
    topic: "Kinetic Energy & Linear Momentum",
    difficulty: "easy",
    solution: "Linear momentum $p$ and kinetic energy $K$ are related by $p = \\sqrt{2mK}$. If kinetic energy is equal:\n$$\\frac{p_1}{p_2} = \\frac{\\sqrt{2m_1 K}}{\\sqrt{2m_2 K}} = \\sqrt{\\frac{m_1}{m_2}}$$"
  },
  {
    q_num: 62,
    question_text: "A sphere of mass $2\\text{ kg}$ is dropped from a height of $0.4\\text{ m}$ onto a spring having force constant $1960\\text{ N/m}$, then maximum compression of spring will be ($g = 9.8\\text{ m/s}^2$)",
    options: ["$0.1\\text{ m}$", "$0.15\\text{ m}$", "$0.2\\text{ m}$", "$0.25\\text{ m}$"],
    correct_index: 0,
    topic: "Energy Conservation with Springs",
    difficulty: "medium",
    solution: "By conservation of mechanical energy between drop height and maximum compression $x$:\n$$mg(h + x) = \\frac{1}{2} k x^2$$\n$$2(9.8)(0.4 + x) = \\frac{1}{2}(1960) x^2 \\implies 19.6(0.4 + x) = 980 x^2$$\n$$0.4 + x = 50 x^2 \\implies 50 x^2 - x - 0.4 = 0$$\nMultiplying by 10:\n$$500 x^2 - 10 x - 4 = 0 \\implies 250 x^2 - 5 x - 2 = 0$$\nFactoring: $(10x - 1)(25x + 2) = 0 \\implies x = 0.1\\text{ m}$."
  },
  {
    q_num: 63,
    question_text: "A power $P$ is required in maintaining the liquid flow through a pipe at velocity $v$. If the speed of flow is doubled the new power required will be",
    options: ["$8P$", "$4P$", "$2P$", "$P$"],
    correct_index: 0,
    topic: "Power in Fluid Flow",
    difficulty: "medium",
    solution: "The mass flow rate is $\\frac{dm}{dt} = \\rho A v$. The kinetic energy imparted per unit time is $P = \\frac{1}{2}\\left(\\frac{dm}{dt}\\right)v^2 = \\frac{1}{2}\\rho A v^3$. Hence, power required varies with the cube of velocity ($P \\propto v^3$). If $v$ is doubled, $P' = 2^3 P = 8P$."
  },
  {
    q_num: 64,
    question_text: "Which of the following is not possible?",
    options: [
      "Work done by external agent = change in potential energy",
      "Work done by external agent = change in total mechanical energy",
      "Work done by conservative force = change in potential energy",
      "Work done by friction is positive"
    ],
    correct_index: 2,
    topic: "Work and Energy Principles",
    difficulty: "easy",
    solution: "By definition, work done by conservative forces equals the negative of the change in potential energy: $W_{\\text{cons}} = -\\Delta U$. Stating that it equals $+\\Delta U$ is physically impossible."
  },
  {
    q_num: 65,
    question_text: "A block of mass $m$ is attached to an undeformed spring of stiffness constant $k$ as shown in figure and released. Assume spring, string and pulley be ideal. The maximum displacement of block is",
    options: ["$\\frac{2mg}{k}$", "$\\frac{mg}{k}$", "$\\frac{mg}{2k}$", "$\\frac{3mg}{2k}$"],
    correct_index: 0,
    image_url: getImageUrl(65),
    topic: "Spring-Mass Systems",
    difficulty: "easy",
    solution: "When the block descends by displacement $x$, loss in gravitational potential energy equals gain in elastic potential energy of the spring:\n$$mg x = \\frac{1}{2} k x^2 \\implies x = \\frac{2mg}{k}$$"
  },
  {
    q_num: 66,
    question_text: "Two springs are stretched by applying forces in two situations:\n(A) Spring $k_1$ attached to a wall is pulled by force $F$\n(B) Spring $k_2$ is pulled by force $F$ from both ends\nIf the potential energy stored in them are $U_A$ and $U_B$ then the ratio $U_A : U_B$ is",
    options: ["$\\frac{k_1}{k_2}$", "$\\frac{k_2}{k_1}$", "$\\sqrt{\\frac{k_2}{k_1}}$", "$\\frac{k_1}{4k_2}$"],
    correct_index: 1,
    image_url: getImageUrl(66),
    topic: "Spring Energy",
    difficulty: "medium",
    solution: "In both situations, the tension throughout each spring is $F$:\n$$U_A = \\frac{F^2}{2k_1}, \\quad U_B = \\frac{F^2}{2k_2}$$\n$$\\frac{U_A}{U_B} = \\frac{F^2/(2k_1)}{F^2/(2k_2)} = \\frac{k_2}{k_1}$$"
  },

  // Page 5
  {
    q_num: 71,
    question_text: "A body of mass $m$ is moving in a vertical circle by means of an inextensible string of length $r$. The tension in the string is $2mg$ when the body is at the highest point. The speed of the body as it passes the lowermost point will be",
    options: ["$\\sqrt{6gr}$", "$\\sqrt{5gr}$", "$\\sqrt{7gr}$", "$\\sqrt{8gr}$"],
    correct_index: 2,
    topic: "Vertical Circular Motion",
    difficulty: "medium",
    solution: "At the highest point, tension and gravity both act downward towards the center:\n$$T_{\\text{top}} + mg = \\frac{m v_{\\text{top}}^2}{r} \\implies 2mg + mg = 3mg = \\frac{m v_{\\text{top}}^2}{r} \\implies v_{\\text{top}}^2 = 3gr$$\nBy conservation of mechanical energy between top and bottom:\n$$v_{\\text{bot}}^2 = v_{\\text{top}}^2 + 2g(2r) = 3gr + 4gr = 7gr \\implies v_{\\text{bot}} = \\sqrt{7gr}$$"
  },
  {
    q_num: 72,
    question_text: "A particle of mass $m$ projected with velocity $\\sqrt{2gR}$ from the lowermost point of smooth vertical circular track of radius $R$ as shown. Then",
    options: [
      "Particle complete circular path",
      "Particle will leave the track between points B and C",
      "Particle starts oscillation about point A",
      "Depends on mass of the particle"
    ],
    correct_index: 2,
    image_url: getImageUrl(72),
    topic: "Vertical Circular Motion",
    difficulty: "medium",
    solution: "The speed $u = \\sqrt{2gR}$ is just enough for the particle to reach point B (height $R$), where its velocity becomes zero ($v^2 = u^2 - 2gR = 0$). For $\\theta \\le 90^\\circ$, normal force never vanishes before velocity becomes zero. Therefore, the particle comes to rest at B and oscillates periodically about lowest point A."
  },
  {
    q_num: 73,
    question_text: "A truck moving on horizontal road with constant acceleration of $2\\text{ m/s}^2$. A block of mass $2\\text{ kg}$ kept inside truck. An observer also stands at rest in the truck, then work done by pseudo force on block in $5\\text{ sec}$ will be (There is no relative motion between truck and block)",
    options: ["$-50\\text{ J}$", "$+50\\text{ J}$", "Zero", "$+100\\text{ J}$"],
    correct_index: 2,
    image_url: getImageUrl(73),
    topic: "Work Done in Non-Inertial Frame",
    difficulty: "medium",
    solution: "Work done is defined as $\\vec{F} \\cdot \\vec{s}$. In the reference frame of the observer in the truck, the block remains at rest (no relative motion). Hence, the displacement $\\vec{s}$ of the block in this frame is zero, and work done by the pseudo force is zero."
  },
  {
    q_num: 74,
    question_text: "A uniform rope has mass $m$ and length $l$. It is held on a frictionless table with one-sixth of its length hanging over the edge. The work done in just pulling the hanging part back on the table is",
    options: ["$\\frac{mgl}{72}$", "$\\frac{mgl}{36}$", "$\\frac{mgl}{12}$", "$\\frac{mgl}{6}$"],
    correct_index: 0,
    topic: "Potential Energy of Continuous Systems",
    difficulty: "easy",
    solution: "Hanging length is $l' = l/6$, so hanging mass is $m' = m/6$.\nThe center of mass of the hanging part is at depth $\\frac{l'}{2} = \\frac{l/6}{2} = \\frac{l}{12}$.\nThe work required to pull it back onto the table equals the increase in gravitational potential energy:\n$$W = m' g h_{\\text{cm}} = \\left(\\frac{m}{6}\\right) g \\left(\\frac{l}{12}\\right) = \\frac{mgl}{72}$$"
  },
  {
    q_num: 75,
    question_text: "A particle of mass $m$ is fixed to a string of length $l$. The particle is given a horizontal velocity of $\\sqrt{5gl}$ at the lowermost position. Calculate the net acceleration when the string becomes horizontal.",
    options: ["$\\sqrt{10}g$", "$3g$", "$g$", "$\\sqrt{2}g$"],
    correct_index: 0,
    topic: "Vertical Circular Motion",
    difficulty: "medium",
    solution: "At the horizontal position, the velocity squared is $v^2 = 5gl - 2gl = 3gl$.\nCentripetal acceleration is $a_c = \\frac{v^2}{l} = 3g$.\nTangential acceleration is $a_t = g$ (downwards).\nNet acceleration:\n$$a_{\\text{net}} = \\sqrt{a_c^2 + a_t^2} = \\sqrt{(3g)^2 + g^2} = \\sqrt{10}g$$"
  },
  {
    q_num: 76,
    question_text: "A projectile is thrown from horizontal ground with an initial velocity $u$ at an angle $\\theta$ above horizontal. The particle undergoes inelastic collisions with the ground having a coefficient of restitution $e$. Calculate the range between $2^{\\text{nd}}$ and $3^{\\text{rd}}$ collision",
    options: [
      "$e\\left(\\frac{u^2 \\sin 2\\theta}{g}\\right)$",
      "$e^2\\left(\\frac{u^2 \\sin 2\\theta}{g}\\right)$",
      "$e^3\\left(\\frac{u^2 \\sin 2\\theta}{g}\\right)$",
      "$\\frac{1}{e^3}\\left(\\frac{u^2 \\sin 2\\theta}{g}\\right)$"
    ],
    correct_index: 1,
    topic: "Projectile Motion with Restitution",
    difficulty: "medium",
    solution: "Initial horizontal range before 1st collision is $R_0 = \\frac{u^2 \\sin 2\\theta}{g}$.\nAfter the 1st bounce, horizontal velocity remains unchanged, while vertical velocity becomes $e u_y$, so range between 1st and 2nd collision is $R_1 = e R_0$.\nAfter the 2nd bounce, vertical velocity becomes $e^2 u_y$, so range between 2nd and 3rd collision is:\n$$R_2 = e^2 R_0 = e^2\\left(\\frac{u^2 \\sin 2\\theta}{g}\\right)$$"
  },
  {
    q_num: 77,
    question_text: "A particle of mass $4\\text{ kg}$ moving with a speed of $10\\text{ m/s}$ collides with a train moving in an opposite direction with a speed of $20\\text{ m/s}$. If coefficient of restitution $e = \\frac{1}{2}$, calculate the final speed of the particle. (in m/s)",
    options: ["5", "15", "20", "35"],
    correct_index: 3,
    topic: "Collisions with Massive Bodies",
    difficulty: "medium",
    solution: "In the reference frame of the train (moving at $-20\\text{ m/s}$):\nInitial approach velocity of particle: $u_{\\text{rel}} = 10 - (-20) = 30\\text{ m/s}$.\nAfter rebound, relative velocity of separation is:\n$$v_{\\text{rel}} = e u_{\\text{rel}} = \\frac{1}{2}(30) = 15\\text{ m/s}$$\nTransforming back to the ground frame:\n$$v_{\\text{ground}} = v_{\\text{train}} - v_{\\text{rel}} = -20 - 15 = -35\\text{ m/s}$$\nTherefore, the final speed of the particle is $35\\text{ m/s}$."
  },
  {
    q_num: 78,
    question_text: "Two particles of equal mass $m$ are connected by a spring of spring constant $K$ kept on a smooth floor. Each of the bodies are given equal speed $v$ in the opposite direction. Calculate the maximum compression of the spring.",
    options: ["$v\\sqrt{\\frac{2m}{K}}$", "$v\\sqrt{\\frac{m}{K}}$", "$2v\\sqrt{\\frac{m}{K}}$", "$\\frac{v}{2}\\sqrt{\\frac{2m}{K}}$"],
    correct_index: 0,
    topic: "Spring-Mass Systems",
    difficulty: "medium",
    solution: "Initial kinetic energy of the two particles moving towards each other is:\n$$K_i = \\frac{1}{2} m v^2 + \\frac{1}{2} m v^2 = m v^2$$\nAt maximum compression, both masses come momentarily to rest in the center of mass frame (which is at rest in ground frame). All kinetic energy is stored in spring potential energy:\n$$\\frac{1}{2} K x_{\\text{max}}^2 = m v^2 \\implies x_{\\text{max}} = v\\sqrt{\\frac{2m}{K}}$$"
  },
  {
    q_num: 79,
    question_text: "A body of mass $m$ is tied to a string of length $l$ tied to top of a trolley moving with an acceleration $a$. Calculate the maximum angle the string will make with the vertical.",
    options: [
      "$\\tan^{-1}\\left(\\frac{a}{g}\\right)$",
      "$2\\tan^{-1}\\left(\\frac{a}{g}\\right)$",
      "$\\frac{1}{2}\\tan^{-1}\\left(\\frac{a}{g}\\right)$",
      "$\\tan^{-1}\\left(\\frac{a}{2g}\\right)$"
    ],
    correct_index: 1,
    image_url: getImageUrl(79),
    topic: "Non-Inertial Frames & Oscillations",
    difficulty: "medium",
    solution: "The equilibrium position of the pendulum inside the accelerating trolley is at angle $\\theta_0 = \\tan^{-1}\\left(\\frac{a}{g}\\right)$. Since the pendulum is released from the vertical ($\\theta = 0$), it executes symmetric simple harmonic motion about the equilibrium position $\\theta_0$. Thus, its maximum angle of deflection is:\n$$\\theta_{\\text{max}} = 2\\theta_0 = 2\\tan^{-1}\\left(\\frac{a}{g}\\right)$$"
  },
  {
    q_num: 80,
    question_text: "Two blocks with masses $m_1 = 3\\text{ kg}$ and $m_2 = 5\\text{ kg}$ are connected by a light string that slides over a frictionless pulley as shown in figure. Initially $m_2$ is held $5\\text{ m}$ above the floor while $m_1$ is on the floor. The system is then released. Find the speed at which $m_2$ hit the floor ($g = 10\\text{ m/s}^2$)",
    options: ["$10\\text{ m/s}$", "$7\\text{ m/s}$", "$5\\text{ m/s}$", "$12\\text{ m/s}$"],
    correct_index: 2,
    image_url: getImageUrl(80),
    topic: "Work-Energy Theorem in Pulley Systems",
    difficulty: "medium",
    solution: "Using energy conservation as $m_2$ drops through height $h = 5\\text{ m}$ while lifting $m_1$ by $h$:\n$$(m_2 - m_1) g h = \\frac{1}{2}(m_1 + m_2) v^2$$\n$$(5 - 3)(10)(5) = \\frac{1}{2}(3 + 5) v^2 \\implies 100 = 4 v^2 \\implies v^2 = 25 \\implies v = 5\\text{ m/s}$$"
  },
  {
    q_num: 81,
    question_text: "A particle of mass $m$ is fixed at the lower end of a massless rod. The rod is given a velocity $\\sqrt{4gl}$ at the lower most position. Calculate the compression in the rod at the topmost position.",
    options: ["Zero", "$2mg$", "$4mg$", "$mg$"],
    correct_index: 3,
    topic: "Vertical Circular Motion on Light Rod",
    difficulty: "medium",
    solution: "By conservation of mechanical energy:\n$$v_{\\text{top}}^2 = v_{\\text{bot}}^2 - 2g(2l) = 4gl - 4gl = 0$$\nAt the topmost position, the particle comes to rest ($v = 0$). The only vertical forces are gravity $mg$ downwards and the upward normal support from the rod $N$. For equilibrium at that instant:\n$$N - mg = 0 \\implies N = mg$$\nThe rod pushes upward on the particle with force $mg$, which means the rod is under a compressive force of $mg$."
  },
  {
    q_num: 82,
    question_text: "A body of mass $m$ is released from a rough hill of height $h$ such that the velocity at the lower most point is $\\sqrt{\\frac{gh}{2}}$. Calculate the magnitude of work done by friction.",
    options: ["$\\frac{mgh}{4}$", "$\\frac{3}{4}mgh$", "$mgh$", "$\\frac{mgh}{2}$"],
    correct_index: 1,
    topic: "Work-Energy Theorem with Friction",
    difficulty: "easy",
    solution: "By work-energy theorem:\n$$W_g + W_f = \\Delta K = K_f - K_i$$\n$$mgh + W_f = \\frac{1}{2} m \\left(\\sqrt{\\frac{gh}{2}}\\right)^2 = \\frac{1}{4} mgh$$\n$$W_f = \\frac{1}{4} mgh - mgh = -\\frac{3}{4} mgh$$\nThe magnitude of work done by friction is $\\frac{3}{4} mgh$."
  }
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Connected to PostgreSQL database.');

    // 1. Ensure chapter exists in chapters table
    const chapterName = 'Work, Power and Energy';
    let chapterId = 26;
    
    // Check or update chapter 26
    const chapRes = await client.query('SELECT id, name FROM chapters WHERE id = $1', [chapterId]);
    if (chapRes.rows.length > 0) {
      await client.query('UPDATE chapters SET name = $1 WHERE id = $2', [chapterName, chapterId]);
      console.log(`Updated chapter id 26 name to "${chapterName}".`);
    } else {
      const insChap = await client.query(
        'INSERT INTO chapters (id, name, subject_id) VALUES ($1, $2, $3) RETURNING id',
        [chapterId, chapterName, 11]
      );
      console.log(`Created chapter "${chapterName}" with id ${insChap.rows[0].id}.`);
    }

    // 2. Remove any old questions for this chapter to ensure clean idempotency
    const delRes = await client.query(
      `DELETE FROM question_bank WHERE category = 'Physics' AND (lower(chapter) = lower($1) OR lower(chapter) = 'work, energy and power' OR chapter_id = $2)`,
      [chapterName, chapterId]
    );
    console.log(`Cleaned up ${delRes.rowCount} previous question(s) for chapter "${chapterName}".`);

    // 3. Insert all questions
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
        'Physics',                                    // category
        'single_choice',                              // question_type
        q.question_text,                              // question_text
        JSON.stringify(q.options),                    // options
        q.correct_index,                              // correct_index
        JSON.stringify([q.correct_index]),            // correct_indices
        4,                                            // marks
        11,                                           // subject_id (Physics)
        chapterId,                                    // chapter_id (26)
        q.difficulty || 'medium',                     // difficulty
        q.solution || '',                             // solution
        q.image_url || '',                            // image_url
        'Physics',                                    // subject
        q.topic || chapterName,                       // topic
        chapterName                                   // chapter
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
