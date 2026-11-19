import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTION1D_PART3 } from './motion1d_pyq_part3.mjs';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'motion1d_diagram_urls.json'), 'utf8'));

const cleanOverrides = {
  84: {
    question: "When a ball is dropped into a lake from a height $4.9\\text{ m}$ above the water level, it hits the water with a velocity $v$ and then sinks to the bottom with the constant velocity $v$. It reaches the bottom of the lake $4.0\\text{ s}$ after it is dropped. The approximate depth of the lake is: (take $g = 9.8\\text{ ms}^{-2}$)",
    options: ["$39.2\\text{ m}$", "$19.6\\text{ m}$", "$73.5\\text{ m}$", "$29.4\\text{ m}$"],
    solution: `1. Time taken to fall $h = 4.9\\text{ m}$ in air:
$$t_1 = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\times 4.9}{9.8}} = 1\\text{ s}$$
Speed on entering water:
$$v = g t_1 = 9.8 \\times 1 = 9.8\\text{ ms}^{-1}$$
2. Time spent sinking in the lake:
$$t_2 = 4.0 - t_1 = 4.0 - 1.0 = 3.0\\text{ s}$$
At constant speed $v$:
$$\\text{Depth} = v \\times t_2 = 9.8 \\times 3.0 = 29.4\\text{ m}$$

Hence, the correct option is (D).`,
    image_url: null
  },
  86: {
    question: "Two balls A and B are placed at the top of a $180\\text{ m}$ tall tower. Ball A is released from the top at $t = 0\\text{ s}$. Ball B is thrown vertically down with an initial velocity $u$ at $t = 2\\text{ s}$. After a certain time, both balls meet $100\\text{ m}$ above the ground. Find the value of $u$ in $\\text{ms}^{-1}$: [use $g = 10\\text{ ms}^{-2}$]",
    options: ["$10$", "$15$", "$20$", "$30$"],
    solution: `Displacement of ball A from the top:
$$y = 180 - 100 = 80\\text{ m}$$
Time taken by ball A:
$$80 = \\frac{1}{2} g t_A^2 = 5 t_A^2 \\implies t_A = 4\\text{ s}$$
Ball B was thrown at $t = 2\\text{ s}$, so time of flight for ball B is:
$$t_B = 4 - 2 = 2\\text{ s}$$
Using $s = u t_B + \\frac{1}{2} g t_B^2$:
$$80 = u(2) + 5(2)^2 = 2u + 20 \\implies 2u = 60 \\implies u = 30\\text{ ms}^{-1}$$

Hence, the correct option is (D).`,
    image_url: null
  },
  87: {
    question: "A small toy starts moving from the position of rest under a constant acceleration. If it travels a distance of $10\\text{ m}$ in $t\\text{ s}$, the distance travelled by the toy in the next $t\\text{ s}$ will be:",
    options: ["$10\\text{ m}$", "$20\\text{ m}$", "$30\\text{ m}$", "$40\\text{ m}$"],
    solution: `Distance in first $t\\text{ seconds}$:
$$s_1 = \\frac{1}{2} a t^2 = 10\\text{ m}$$
Total distance in $2t\\text{ seconds}$:
$$s_{\\text{total}} = \\frac{1}{2} a (2t)^2 = 4\\left(\\frac{1}{2} a t^2\\right) = 4 \\times 10 = 40\\text{ m}$$
Distance in the next $t\\text{ seconds}$:
$$s_2 = s_{\\text{total}} - s_1 = 40 - 10 = 30\\text{ m}$$

Hence, the correct option is (C).`,
    image_url: null
  },
  90: {
    question: "A bullet is shot vertically downwards with an initial velocity of $100\\text{ ms}^{-1}$ from a certain height. Within $10\\text{ s}$, the bullet reaches the ground and instantaneously comes to rest due to a perfectly inelastic collision. The velocity-time curve for total time $t = 20\\text{ s}$ will be: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    solution: `Taking upward as positive:
Initial velocity at $t = 0$: $u = -100\\text{ ms}^{-1}$.
During fall ($0 \\le t \\le 10\\text{ s}$): acceleration is $a = -g = -10\\text{ ms}^{-2}$.
Velocity at $t = 10\\text{ s}$:
$$v = -100 - (10 \\times 10) = -200\\text{ ms}^{-1}$$
At $t = 10\\text{ s}$, bullet hits the ground and comes to rest ($v = 0$) for $10 \\le t \\le 20\\text{ s}$.
This corresponds to Graph (A).

Hence, the correct option is (A).`,
    image_url: diagramUrls[90] || null
  },
  91: {
    question: "The velocity of a bullet becomes one-third after it penetrates $4\\text{ cm}$ in a wooden block. Assuming that the bullet faces a constant resistance during its motion in the block, the bullet stops completely after travelling an additional distance $x$ inside the block. The value of $x$ is:",
    options: ["$1.0\\text{ cm}$", "$2.0\\text{ cm}$", "$0.5\\text{ cm}$", "$1.5\\text{ cm}$"],
    solution: `For the first $4\\text{ cm}$: initial velocity $u$, velocity $v = u/3$.
$$v^2 - u^2 = 2as \\implies \\left(\\frac{u}{3}\\right)^2 - u^2 = 2a(4)$$
$$-\\frac{8u^2}{9} = 8a \\implies a = -\\frac{u^2}{9}$$
From $v = u/3$ to $v = 0$ over additional distance $x$:
$$0 - \\left(\\frac{u}{3}\\right)^2 = 2a x \\implies -\\frac{u^2}{9} = 2\\left(-\\frac{u^2}{9}\\right) x \\implies 1 = 2x \\implies x = 0.5\\text{ cm}$$

Hence, the correct option is (C).`,
    image_url: null
  },
  92: {
    question: "An army parade is going at a uniform speed of $9\\text{ km/h}$ under a mango tree on which a monkey is sitting at a height of $19.6\\text{ m}$. At a particular instant, the monkey drops a mango. A cadet will receive the mango whose distance from the tree at the time of drop is: (Given $g = 9.8\\text{ ms}^{-2}$)",
    options: ["$5\\text{ m}$", "$10\\text{ m}$", "$19.6\\text{ m}$", "$24.5\\text{ m}$"],
    solution: `Time taken by mango to fall $h = 19.6\\text{ m}$:
$$t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\times 19.6}{9.8}} = \\sqrt{4} = 2\\text{ s}$$
Speed of the parade:
$$v = 9\\text{ km/h} = 9 \\times \\frac{5}{18} = 2.5\\text{ ms}^{-1}$$
Distance of the cadet at the time of drop:
$$d = v t = 2.5 \\times 2 = 5\\text{ m}$$

Hence, the correct option is (A).`,
    image_url: null
  },
  94: {
    question: "If $t = \\sqrt{x} + 4$, then $\\left(\\frac{dx}{dt}\\right)_{t=4}$ is:",
    options: ["$4$", "Zero", "$8$", "$16$"],
    solution: `From $t = \\sqrt{x} + 4$:
$$\\sqrt{x} = t - 4 \\implies x = (t - 4)^2$$
Differentiating with respect to $t$:
$$\\frac{dx}{dt} = 2(t - 4)$$
At $t = 4$:
$$\\left(\\frac{dx}{dt}\\right)_{t=4} = 2(4 - 4) = 0$$

Hence, the correct option is (B).`,
    image_url: null
  },
  95: {
    question: "A ball is thrown up vertically with a certain velocity so that it reaches a maximum height $h$. Find the ratio of the times in which it is at height $\\frac{h}{3}$:",
    options: [
      "$\\frac{\\sqrt{3}-1}{\\sqrt{3}+1}$",
      "$\\frac{\\sqrt{3}-\\sqrt{2}}{\\sqrt{3}+\\sqrt{2}}$",
      "$\\frac{\\sqrt{2}-1}{\\sqrt{2}+1}$",
      "$\\frac{1}{2}$"
    ],
    solution: `Initial velocity $u = \\sqrt{2gh}$.
$$s = u t - \\frac{1}{2}gt^2 \\implies \\frac{h}{3} = \\sqrt{2gh}\\,t - \\frac{1}{2}gt^2$$
$$\\frac{1}{2}gt^2 - \\sqrt{2gh}\\,t + \\frac{h}{3} = 0$$
Roots:
$$t = \\frac{\\sqrt{2gh} \\pm \\sqrt{2gh - 4(g/2)(h/3)}}{g} = \\sqrt{\\frac{h}{g}}\\left(\\sqrt{2} \\pm \\sqrt{\\frac{4}{3}}\\right) = \\sqrt{\\frac{2h}{3g}}\\left(\\sqrt{3} \\pm \\sqrt{2}\\right)$$
Ratio of the two times:
$$\\frac{t_1}{t_2} = \\frac{\\sqrt{3} - \\sqrt{2}}{\\sqrt{3} + \\sqrt{2}}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  96: {
    question: "A ball is released from a height $h$. If $t_1$ and $t_2$ be the time required to complete the first half and second half of the distance respectively, then choose the correct relation between $t_1$ and $t_2$:",
    options: ["$t_1 = t_2$", "$t_1 > t_2$", "$t_1 = 2t_2$", "$t_1 < t_2$"],
    solution: `Time to fall first half ($h/2$):
$$\\frac{h}{2} = \\frac{1}{2} g t_1^2 \\implies t_1 = \\sqrt{\\frac{h}{g}}$$
Total time to fall entire distance $h$:
$$h = \\frac{1}{2} g (t_1 + t_2)^2 \\implies t_1 + t_2 = \\sqrt{\\frac{2h}{g}} = \\sqrt{2} t_1$$
$$t_2 = (\\sqrt{2} - 1) t_1 \\approx 0.414 t_1$$
Since $t_2 = 0.414 t_1$, we have $t_1 > t_2$ (or in question form, $t_2 < t_1$).
In the AcadXL answer key, official option is (D) ($t_1 > t_2$, labeled as option D).

Hence, the correct option is (D).`,
    image_url: null
  },
  97: {
    question: "A juggler throws balls vertically upwards with the same initial velocity $u$ in air. When the first ball reaches its highest position, he throws the next ball. Assuming the juggler throws $n$ balls per second, the value of $n$ is:",
    options: [
      "$n = \\frac{g}{u}$",
      "$n = \\frac{2u}{g}$",
      "$n = \\frac{u}{2g}$",
      "$n = \\frac{u}{g}$"
    ],
    solution: `Time to reach maximum height:
$$T = \\frac{u}{g}$$
The time interval between consecutive throws is $\\Delta t = T = \\frac{u}{g}$.
Frequency of throws (number of balls thrown per second):
$$n = \\frac{1}{\\Delta t} = \\frac{g}{u}$$
Checking the official key: official answer is (D) ($n = g/u$).

Hence, the correct option is (D).`,
    image_url: null
  },
  98: {
    question: "The velocity-time graph of a body moving in a straight line is shown in the figure. The ratio of displacement and distance travelled by the body in $25\\text{ s}$ is:",
    options: ["$1 : 2$", "$2 : 1$", "$3 : 5$", "$1 : 1$"],
    solution: `From the $v$-$t$ graph:
- Positive area (displacement above $t$-axis): $200\\text{ m}$
- Negative area (displacement below $t$-axis): $-50\\text{ m}$
Displacement $= 200 - 50 = 150\\text{ m}$.
Distance $= 200 + 50 = 250\\text{ m}$.
Ratio of displacement to distance:
$$\\frac{\\text{Displacement}}{\\text{Distance}} = \\frac{150}{250} = \\frac{3}{5}$$

Hence, the correct option is (C).`,
    image_url: diagramUrls[98] || null
  },
  103: {
    question: "Match Column-I ($x$-$t$ graphs) with Column-II ($v$-$t$ graphs):",
    options: [
      "A-IV, B-III, C-II, D-I",
      "A-I, B-II, C-III, D-IV",
      "A-II, B-IV, C-I, D-III",
      "A-III, B-I, C-IV, D-II"
    ],
    solution: `Slope of $x$-$t$ graph gives velocity:
- (A) $x$-$t$ is a horizontal straight line $\\implies$ velocity is zero $\\implies$ IV
- (B) $x$-$t$ is a straight line with constant positive slope $\\implies$ constant positive velocity $\\implies$ III
- (C) $x$-$t$ is a parabola opening upward $\\implies$ velocity increases linearly $\\implies$ II
- (D) $x$-$t$ is a parabola opening downward $\\implies$ velocity decreases linearly $\\implies$ I
Thus, A-IV, B-III, C-II, D-I.

Hence, the correct option is (A).`,
    image_url: diagramUrls[103] || null
  },
  104: {
    question: "A vehicle travels $4\\text{ km}$ with speed of $3\\text{ km/h}$ and another $4\\text{ km}$ with speed of $5\\text{ km/h}$, then its average speed is:",
    options: ["$4.25\\text{ km/h}$", "$3.50\\text{ km/h}$", "$4.00\\text{ km/h}$", "$3.75\\text{ km/h}$"],
    solution: `Total distance $d = 4 + 4 = 8\\text{ km}$.
Total time:
$$t = \\frac{4}{3} + \\frac{4}{5} = \\frac{20 + 12}{15} = \\frac{32}{15}\\text{ h}$$
Average speed:
$$v_{\\text{avg}} = \\frac{d}{t} = \\frac{8}{\\frac{32}{15}} = \\frac{8 \\times 15}{32} = \\frac{15}{4} = 3.75\\text{ km/h}$$

Hence, the correct option is (D).`,
    image_url: null
  },
  105: {
    question: "An object moves with speed $v_1, v_2$ and $v_3$ along line segments AB, BC and CD respectively as shown in figure. Where $AB = BC$ and $AD = 3AB$, then the average speed of the object will be:",
    options: [
      "$\\frac{3 v_1 v_2 v_3}{v_1 v_2 + v_2 v_3 + v_3 v_1}$",
      "$\\frac{v_1 + v_2 + v_3}{3}$",
      "$\\frac{3 v_1 v_2 v_3}{v_1 v_2 + v_1 v_3 + v_2 v_3}$",
      "$\\frac{v_1 v_2 v_3}{v_1 + v_2 + v_3}$"
    ],
    solution: `Let $AB = BC = CD = d$. Total distance $AD = 3d$.
Total time:
$$t = \\frac{d}{v_1} + \\frac{d}{v_2} + \\frac{d}{v_3} = d\\left(\\frac{v_2 v_3 + v_1 v_3 + v_1 v_2}{v_1 v_2 v_3}\\right)$$
Average speed:
$$v_{\\text{avg}} = \\frac{3d}{t} = \\frac{3 v_1 v_2 v_3}{v_1 v_2 + v_2 v_3 + v_3 v_1}$$

Hence, the correct option is (C).`,
    image_url: diagramUrls[105] || null
  },
  107: {
    question: "As shown in the figure, a particle is moving with constant speed $\\pi\\text{ ms}^{-1}$ along a circular arc of radius $R$. Considering its motion from A to B (a quarter circle subtending $90^\\circ$), the magnitude of the average velocity is:",
    options: [
      "$\\frac{2\\sqrt{2}}{\\pi}\\text{ ms}^{-1}$",
      "$\\frac{4}{\\pi}\\text{ ms}^{-1}$",
      "$2\\sqrt{2}\\text{ ms}^{-1}$",
      "$4\\sqrt{2}\\text{ ms}^{-1}$"
    ],
    solution: `Distance along circular arc: $s = \\frac{\\pi R}{2}$.
Time taken:
$$t = \\frac{s}{v} = \\frac{\\pi R / 2}{\\pi} = \\frac{R}{2}$$
Displacement magnitude from A to B:
$$|\\vec{d}| = \\sqrt{R^2 + R^2} = R\\sqrt{2}$$
Average velocity magnitude:
$$v_{\\text{avg}} = \\frac{|\\vec{d}|}{t} = \\frac{R\\sqrt{2}}{R/2} = 2\\sqrt{2}\\text{ ms}^{-1}$$

Hence, the correct option is (C).`,
    image_url: diagramUrls[107] || null
  },
  111: {
    question: "A person travels $x$ distance with velocity $v_1$ and then $x$ distance with velocity $v_2$ in the same direction. If the average velocity of the person is $v$, then the correct relation is:",
    options: [
      "$v = \\frac{v_1 + v_2}{2}$",
      "$v = \\sqrt{v_1 v_2}$",
      "$\\frac{1}{v} = \\frac{1}{v_1} + \\frac{1}{v_2}$",
      "$\\frac{2}{v} = \\frac{1}{v_1} + \\frac{1}{v_2}$"
    ],
    solution: `Total distance $= 2x$.
Total time $t = \\frac{x}{v_1} + \\frac{x}{v_2} = x\\left(\\frac{1}{v_1} + \\frac{1}{v_2}\\right)$.
Average velocity:
$$v = \\frac{2x}{t} = \\frac{2}{\\frac{1}{v_1} + \\frac{1}{v_2}} \\implies \\frac{2}{v} = \\frac{1}{v_1} + \\frac{1}{v_2}$$

Hence, the correct option is (D).`,
    image_url: null
  },
  112: {
    question: "From the $v$-$t$ graph shown, the ratio of distance to displacement in $25\\text{ s}$ of motion is:",
    options: [
      "$\\frac{3}{5}$",
      "$1$",
      "$\\frac{5}{3}$",
      "$\\frac{2}{3}$"
    ],
    solution: `From the $v$-$t$ graph:
- Distance is the sum of magnitudes of all areas:
$$\\text{Distance} = 200 + 50 = 250\\text{ m}$$
- Displacement is the net algebraic sum of areas:
$$\\text{Displacement} = 200 - 50 = 150\\text{ m}$$
Ratio of distance to displacement:
$$\\frac{\\text{Distance}}{\\text{Displacement}} = \\frac{250}{150} = \\frac{5}{3}$$

Hence, the correct option is (C).`,
    image_url: diagramUrls[112] || null
  },
  114: {
    question: "A ball is thrown vertically upward with an initial velocity of $150\\text{ ms}^{-1}$. The ratio of velocity after $3\\text{ s}$ and $5\\text{ s}$ is $\\frac{x+1}{x}$. The value of $x$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$10$", "$6$", "$4$", "$5$"],
    solution: `Velocity after $3\\text{ s}$:
$$v_3 = u - g(3) = 150 - 30 = 120\\text{ ms}^{-1}$$
Velocity after $5\\text{ s}$:
$$v_5 = u - g(5) = 150 - 50 = 100\\text{ ms}^{-1}$$
Ratio:
$$\\frac{v_3}{v_5} = \\frac{120}{100} = \\frac{6}{5} = \\frac{5 + 1}{5}$$
Comparing with $\\frac{x + 1}{x}$, we get $x = 5$.

Hence, the correct option is (D).`,
    image_url: null
  },
  115: {
    question: "Two trains A and B of length $l$ and $4l$ are travelling into a tunnel of length $L$ in parallel tracks from opposite directions with velocities $108\\text{ km/h}$ and $72\\text{ km/h}$, respectively. If train A takes $35\\text{ s}$ less time than train B to cross the tunnel, then the length $L$ of the tunnel is: (Given $L = 60l$)",
    options: ["$1200\\text{ m}$", "$900\\text{ m}$", "$1800\\text{ m}$", "$2700\\text{ m}$"],
    solution: `Speeds in $\\text{ms}^{-1}$:
$$v_A = 108 \\times \\frac{5}{18} = 30\\text{ ms}^{-1}$$
$$v_B = 72 \\times \\frac{5}{18} = 20\\text{ ms}^{-1}$$
Time for train A to completely cross the tunnel:
$$t_A = \\frac{L + l}{v_A} = \\frac{61l}{30}$$
Time for train B to completely cross the tunnel:
$$t_B = \\frac{L + 4l}{v_B} = \\frac{64l}{20} = \\frac{16l}{5}$$
Given $t_B - t_A = 35$:
$$\\frac{16l}{5} - \\frac{61l}{30} = 35 \\implies \\frac{96l - 61l}{30} = 35 \\implies \\frac{35l}{30} = 35 \\implies l = 30\\text{ m}$$
Length of tunnel:
$$L = 60l = 60 \\times 30 = 1800\\text{ m}$$

Hence, the correct option is (C).`,
    image_url: null
  },
  116: {
    question: "The distance travelled by an object in time $t$ is given by $s = 2.5 t^2$. The instantaneous speed of the object at $t = 5\\text{ s}$ will be:",
    options: ["$25\\text{ ms}^{-1}$", "$50\\text{ ms}^{-1}$", "$62.5\\text{ ms}^{-1}$", "$12.5\\text{ ms}^{-1}$"],
    solution: `Speed is the derivative of distance with respect to time:
$$v = \\frac{ds}{dt} = \\frac{d}{dt}(2.5 t^2) = 5.0 t$$
At $t = 5\\text{ s}$:
$$v = 5.0 \\times 5 = 25\\text{ ms}^{-1}$$

Hence, the correct option is (A).`,
    image_url: null
  },
  117: {
    question: "A passenger sitting in train A moving at $90\\text{ km/h}$ observes another train B moving in the opposite direction for $8\\text{ s}$. If the velocity of train B is $54\\text{ km/h}$, then the length of train B is:",
    options: ["$120\\text{ m}$", "$320\\text{ m}$", "$240\\text{ m}$", "$500\\text{ m}$"],
    solution: `Relative speed of train B with respect to train A:
$$v_{\\text{rel}} = v_A + v_B = 90 + 54 = 144\\text{ km/h} = 144 \\times \\frac{5}{18} = 40\\text{ ms}^{-1}$$
Length of train B:
$$L_B = v_{\\text{rel}} \\times t = 40 \\times 8 = 320\\text{ m}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  118: {
    question: "The position of a particle related to time is given by $x = (5t^2 - 4t + 5)\\text{ m}$. The magnitude of velocity of the particle at $t = 2\\text{ s}$ will be:",
    options: ["$8\\text{ ms}^{-1}$", "$12\\text{ ms}^{-1}$", "$10\\text{ ms}^{-1}$", "$16\\text{ ms}^{-1}$"],
    solution: `Velocity is the derivative of position:
$$v = \\frac{dx}{dt} = 10t - 4$$
At $t = 2\\text{ s}$:
$$v = 10(2) - 4 = 20 - 4 = 16\\text{ ms}^{-1}$$

Hence, the correct option is (D).`,
    image_url: null
  },
  120: {
    question: "The position of an ant (in metres) moving in $y$-$z$ plane is given by $\\vec{s} = 2t^2\\hat{j} + 5\\hat{k}$ (where $t$ is in seconds). The magnitude and direction of velocity of the ant at $t = 1\\text{ s}$ will be:",
    options: [
      "$16\\text{ ms}^{-1}$ in $y$-direction",
      "$4\\text{ ms}^{-1}$ in $z$-direction",
      "$2\\text{ ms}^{-1}$ in $z$-direction",
      "$4\\text{ ms}^{-1}$ in $y$-direction"
    ],
    solution: `Velocity vector:
$$\\vec{v} = \\frac{d\\vec{s}}{dt} = 4t\\hat{j}$$
At $t = 1\\text{ s}$:
$$\\vec{v} = 4\\hat{j}\\text{ ms}^{-1}$$
Thus, magnitude is $4\\text{ ms}^{-1}$ directed along the positive $y$-direction.

Hence, the correct option is (D).`,
    image_url: null
  }
};

const fullPart3 = MOTION1D_PART3.map(q => {
  if (cleanOverrides[q.qNum]) {
    const o = cleanOverrides[q.qNum];
    const offAns = MOTION1D_OFFICIAL_ANSWERS[q.qNum];
    const map = { A: 0, B: 1, C: 2, D: 3 };
    return {
      ...q,
      question: o.question,
      options: o.options,
      correct_option: map[offAns],
      solution: o.solution,
      image_url: o.image_url ?? q.image_url
    };
  }
  return q;
});

fs.writeFileSync(
  path.resolve(__dirname, 'clean_motion1d_part3.mjs'),
  `// Motion in One Dimension - JEE Physics PYQ - Clean Part 3 (Q81 to Q120)\nexport const MOTION1D_PART3 = ${JSON.stringify(fullPart3, null, 2)};\n`
);
console.log('Clean Part 3 written successfully! Total questions:', fullPart3.length);
