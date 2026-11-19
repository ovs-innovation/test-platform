import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTION1D_PART4 } from './motion1d_pyq_part4.mjs';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'motion1d_diagram_urls.json'), 'utf8'));

const cleanOverrides = {
  121: {
    question: "A bullet is fired into a fixed target loses one-third of its velocity after travelling $4\\text{ cm}$. It penetrates further $D \\times 10^{-3}\\text{ m}$ before coming to rest. The value of $D$ is:",
    options: ["$32$", "$50$", "$30$", "$40$"],
    solution: `For the first $s_1 = 4\\text{ cm} = 4 \\times 10^{-2}\\text{ m}$:
Initial speed $u$, final speed $v = \\frac{2}{3}u$.
$$v^2 - u^2 = -2as_1 \\implies \\left(\\frac{2}{3}u\\right)^2 - u^2 = -2a(4 \\times 10^{-2})$$
$$-\\frac{5}{9}u^2 = -2a(4 \\times 10^{-2}) \\implies 2a = \\frac{5 u^2}{36 \\times 10^{-2}}$$
From $v = \\frac{2}{3}u$ to $0$ over additional distance $s_2$:
$$0^2 - \\left(\\frac{2}{3}u\\right)^2 = -2a s_2 \\implies \\frac{4}{9}u^2 = \\left(\\frac{5u^2}{36 \\times 10^{-2}}\\right) s_2$$
$$s_2 = \\frac{4 \\times 36 \\times 10^{-2}}{9 \\times 5} = \\frac{16 \\times 10^{-2}}{5} = 3.2 \\times 10^{-2}\\text{ m} = 32 \\times 10^{-3}\\text{ m}$$
Therefore, $D = 32$.

Hence, the correct option is (A).`,
    image_url: null
  },
  123: {
    question: "A body starts moving from rest with constant acceleration, covering displacement $S_1$ in the first $(p - 1)$ seconds and $S_2$ in the first $p$ seconds. The displacement $S_1 + S_2$ will be made in time:",
    options: [
      "$(2p + 1)\\text{ s}$",
      "$\\sqrt{2p^2 - 2p + 1}\\text{ s}$",
      "$(2p - 1)\\text{ s}$",
      "$(2p^2 - 2p + 1)\\text{ s}$"
    ],
    solution: `Displacements from rest with constant acceleration $a$:
$$S_1 = \\frac{1}{2} a (p - 1)^2$$
$$S_2 = \\frac{1}{2} a p^2$$
Let total displacement $S_1 + S_2$ be covered in time $t$:
$$S_1 + S_2 = \\frac{1}{2} a t^2$$
$$\\frac{1}{2} a (p - 1)^2 + \\frac{1}{2} a p^2 = \\frac{1}{2} a t^2$$
$$t^2 = (p - 1)^2 + p^2 = p^2 - 2p + 1 + p^2 = 2p^2 - 2p + 1$$
$$t = \\sqrt{2p^2 - 2p + 1}\\text{ s}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  124: {
    question: "A particle is moving in a straight line. The variation of position $x$ as a function of time $t$ is given as $x = (t^3 - 6t^2 + 20t + 15)\\text{ m}$. The velocity of the body when its acceleration becomes zero is:",
    options: ["$0\\text{ ms}^{-1}$", "$8\\text{ ms}^{-1}$", "$10\\text{ ms}^{-1}$", "$4\\text{ ms}^{-1}$"],
    solution: `Position: $x = t^3 - 6t^2 + 20t + 15$.
Velocity:
$$v = \\frac{dx}{dt} = 3t^2 - 12t + 20$$
Acceleration:
$$a = \\frac{dv}{dt} = 6t - 12$$
When acceleration is zero:
$$6t - 12 = 0 \\implies t = 2\\text{ s}$$
Velocity at $t = 2\\text{ s}$:
$$v = 3(2)^2 - 12(2) + 20 = 12 - 24 + 20 = 8\\text{ ms}^{-1}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  126: {
    question: "The relation between time $t$ and distance $x$ is $t = \\alpha x^2 + \\beta x$, where $\\alpha$ and $\\beta$ are constants. The relation between acceleration ($a$) and velocity ($v$) is:",
    options: [
      "$a = -2\\alpha v^3$",
      "$a = 2\\alpha v^3$",
      "$a = -2\\beta v^3$",
      "$a = 2\\beta v^3$"
    ],
    solution: `Given $t = \\alpha x^2 + \\beta x$.
Differentiating with respect to $t$:
$$1 = (2\\alpha x + \\beta)\\frac{dx}{dt} = (2\\alpha x + \\beta)v \\implies v = (2\\alpha x + \\beta)^{-1}$$
Acceleration:
$$a = \\frac{dv}{dt} = -(2\\alpha x + \\beta)^{-2} \\cdot 2\\alpha \\frac{dx}{dt} = -2\\alpha v^2 \\cdot v = -2\\alpha v^3$$

Hence, the correct option is (A).`,
    image_url: null
  },
  129: {
    question: "Train A is moving along two parallel rail tracks towards north with speed $72\\text{ km/h}$ and train B is moving towards south with speed $108\\text{ km/h}$. Velocity of train B with respect to A and velocity of ground with respect to B are (in $\\text{ms}^{-1}$):",
    options: [
      "$-30\\text{ and } 50$",
      "$-50\\text{ and } -30$",
      "$-50\\text{ and } 30$",
      "$50\\text{ and } -30$"
    ],
    solution: `Taking North as positive:
$$v_A = +72\\text{ km/h} = +20\\text{ ms}^{-1}$$
$$v_B = -108\\text{ km/h} = -30\\text{ ms}^{-1}$$
1. Velocity of train B with respect to A:
$$v_{B/A} = v_B - v_A = -30 - 20 = -50\\text{ ms}^{-1}$$
2. Velocity of ground with respect to B:
$$v_{G/B} = v_G - v_B = 0 - (-30) = +30\\text{ ms}^{-1}$$

Hence, the correct option is (C).`,
    image_url: null
  },
  131: {
    question: "A cyclist starts from the point P of a circular track of radius $2\\text{ km}$ and travels along its circumference to the point S (covering three quarters of the circumference, $\\theta = 270^\\circ$). The displacement of the cyclist is:",
    options: ["$\\sqrt{8}\\text{ km}$", "$8\\text{ km}$", "$6\\text{ km}$", "$4\\text{ km}$"],
    solution: `The initial position vector is $\\vec{r}_P$ and final position vector is $\\vec{r}_S$, separated by an angle of $90^\\circ$ across the chord:
$$|\\Delta\\vec{r}| = \\sqrt{R^2 + R^2} = R\\sqrt{2}$$
Given $R = 2\\text{ km}$:
$$\\text{Displacement} = 2\\sqrt{2} = \\sqrt{8}\\text{ km}$$

Hence, the correct option is (A).`,
    image_url: null
  },
  136: {
    question: "A body projected vertically upwards with a certain speed from the top of a tower reaches the ground in $t_1$. If it is projected vertically downwards from the same point with the same speed, it reaches the ground in $t_2$. The time required to reach the ground, if it is dropped from rest from the top of the tower, is:",
    options: ["$\\sqrt{t_1 t_2}$", "$\\sqrt{t_1 + t_2}$", "$\\frac{t_1 + t_2}{2}$", "$\\frac{t_1 - t_2}{2}$"],
    solution: `Let height of the tower be $h$ and initial speed be $u$.
1. Upward throw: $-h = u t_1 - \\frac{1}{2} g t_1^2 \\implies h = -u t_1 + \\frac{1}{2} g t_1^2$
2. Downward throw: $h = u t_2 + \\frac{1}{2} g t_2^2$
Multiplying (1) by $t_2$ and (2) by $t_1$ and adding:
$$h(t_1 + t_2) = \\frac{1}{2} g t_1 t_2 (t_1 + t_2) \\implies h = \\frac{1}{2} g t_1 t_2$$
For a body dropped from rest:
$$h = \\frac{1}{2} g t^2$$
Comparing the two equations:
$$t^2 = t_1 t_2 \\implies t = \\sqrt{t_1 t_2}$$

Hence, the correct option is (A).`,
    image_url: null
  },
  138: {
    question: "A particle moving in a straight line covers half the distance with speed $6\\text{ ms}^{-1}$. The other half is covered in two equal time intervals with speeds $9\\text{ ms}^{-1}$ and $15\\text{ ms}^{-1}$ respectively. The average speed of the particle for the entire journey is:",
    options: ["$4\\text{ ms}^{-1}$", "$8\\text{ ms}^{-1}$", "$6\\text{ ms}^{-1}$", "$10\\text{ ms}^{-1}$"],
    solution: `Let total distance be $2d$.
1. First half distance $d$: time taken is $t_1 = \\frac{d}{6}$.
2. Second half distance $d$: covered in two equal time intervals $\\tau$:
$$d = 9\\tau + 15\\tau = 24\\tau \\implies \\tau = \\frac{d}{24}$$
Total time for second half: $t_2 = 2\\tau = \\frac{d}{12}$.
Total time for the entire journey:
$$t = t_1 + t_2 = \\frac{d}{6} + \\frac{d}{12} = \\frac{3d}{12} = \\frac{d}{4}$$
Average speed:
$$v_{\\text{avg}} = \\frac{2d}{t} = \\frac{2d}{d/4} = 8\\text{ ms}^{-1}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  139: {
    question: "Two cars are travelling towards each other at speed of $20\\text{ ms}^{-1}$ each. When the cars are $300\\text{ m}$ apart, both the drivers apply brakes and the cars retard at the rate of $2\\text{ ms}^{-2}$. The distance between them when they come to rest is:",
    options: ["$200\\text{ m}$", "$100\\text{ m}$", "$50\\text{ m}$", "$25\\text{ m}$"],
    solution: `Stopping distance for each car:
$$s = \\frac{u^2}{2a} = \\frac{20^2}{2 \\times 2} = \\frac{400}{4} = 100\\text{ m}$$
Since both cars travel towards each other, the total distance covered by both cars before coming to rest is:
$$s_{\\text{total}} = 100 + 100 = 200\\text{ m}$$
Distance remaining between the cars:
$$d = 300 - 200 = 100\\text{ m}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  141: {
    question: "The velocity-time graph of an object moving along a straight line is shown in the figure. What is the distance covered by the object between $t = 0$ to $t = 4\\text{ s}$?",
    options: ["$30\\text{ m}$", "$15\\text{ m}$", "$10\\text{ m}$", "$13\\text{ m}$"],
    solution: `Distance is the area under the velocity-time graph:
The region from $t = 0$ to $t = 4\\text{ s}$ is a trapezoid with parallel sides of length $4\\text{ s}$ (from $t = 0$ to $4$) and $2\\text{ s}$ (from $t = 1$ to $3$), with height $10\\text{ ms}^{-1}$:
$$\\text{Area} = \\frac{1}{2}(4 + 2) \\times 10 = \\frac{1}{2}(6) \\times 10 = 30\\text{ m}$$

Hence, the correct option is (A).`,
    image_url: diagramUrls[141] || null
  },
  145: {
    question: "Which of the following curves possibly represent one-dimensional motion of a particle?",
    options: [
      "A, B & D only",
      "A & C only",
      "B & C only",
      "All four curves"
    ],
    solution: `Analysis of the curves:
- (A) Position-time curve can represent 1D oscillatory motion.
- (B) Velocity-displacement circle represents 1D simple harmonic motion ($v^2 + \\omega^2 x^2 = \\text{const}$).
- (C) Has negative time values and multiple positions for a single time, not physically possible.
- (D) Velocity-displacement curve with single-valued velocity for forward path is possible.
Therefore, A, B and D represent physically possible one-dimensional motions.

Hence, the correct option is (A).`,
    image_url: diagramUrls[145] || null
  },
  149: {
    question: "The velocity ($v$) - distance ($x$) graph is shown in the figure. Which graph represents acceleration ($a$) versus distance ($x$) variation of this system?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    solution: `From the given $v$-$x$ graph:
Velocity decreases linearly with distance:
$$v(x) = -m x + v_0$$
Acceleration is given by:
$$a = v \\frac{dv}{dx} = (-m x + v_0)(-m) = m^2 x - m v_0$$
This is a straight line with positive slope $m^2 > 0$ and negative intercept $-mv_0 < 0$.
Graph (A) represents this linear relationship.

Hence, the correct option is (A).`,
    image_url: diagramUrls[149] || null
  },
  153: {
    question: "Two cars A and B are moving in the same direction along a straight line with speeds $100\\text{ km/h}$ and $80\\text{ km/h}$, respectively such that car A is moving ahead of car B. A person in car B throws a stone with a speed $v$ so that it hits car A with a speed of $5\\text{ ms}^{-1}$. The value of $v$ is:",
    options: ["$18\\text{ km/h}$", "$58\\text{ km/h}$", "$38\\text{ km/h}$", "$48\\text{ km/h}$"],
    solution: `Speed of car A: $v_A = 100\\text{ km/h}$
Speed of car B: $v_B = 80\\text{ km/h}$
Speed of stone relative to car B: $v$
Speed of stone relative to ground:
$$v_{\\text{stone}} = v_B + v = 80 + v$$
Speed of stone relative to car A:
$$v_{\\text{rel}} = v_{\\text{stone}} - v_A = (80 + v) - 100 = v - 20$$
Given that stone hits car A with relative speed $5\\text{ ms}^{-1}$:
$$5\\text{ ms}^{-1} = 5 \\times \\frac{18}{5} = 18\\text{ km/h}$$
$$v - 20 = 18 \\implies v = 38\\text{ km/h}$$

Hence, the correct option is (C).`,
    image_url: null
  },
  157: {
    question: "A gas balloon is going up with a constant velocity of $10\\text{ ms}^{-1}$. When this balloon reaches a height of $75\\text{ m}$, a stone is dropped from it while the balloon keeps moving up with the same velocity. The height of the balloon when the stone hits the ground is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$85\\text{ m}$", "$150\\text{ m}$", "$100\\text{ m}$", "$125\\text{ m}$"],
    solution: `Initial velocity of stone at release: $u = +10\\text{ ms}^{-1}$ upward.
Displacement of stone to ground: $s = -75\\text{ m}$.
$$-75 = 10t - 5t^2 \\implies 5t^2 - 10t - 75 = 0 \\implies t^2 - 2t - 15 = 0$$
$$(t - 5)(t + 3) = 0 \\implies t = 5\\text{ s}$$
In $5\\text{ s}$, the balloon continues moving upward at $10\\text{ ms}^{-1}$:
$$\\text{Distance travelled by balloon} = 10 \\times 5 = 50\\text{ m}$$
Total height of balloon when stone hits ground:
$$H = 75 + 50 = 125\\text{ m}$$

Hence, the correct option is (D).`,
    image_url: null
  }
};

const fullPart4 = MOTION1D_PART4.map(q => {
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
  path.resolve(__dirname, 'clean_motion1d_part4.mjs'),
  `// Motion in One Dimension - JEE Physics PYQ - Clean Part 4 (Q121 to Q157)\nexport const MOTION1D_PART4 = ${JSON.stringify(fullPart4, null, 2)};\n`
);
console.log('Clean Part 4 written successfully! Total questions:', fullPart4.length);
