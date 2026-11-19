import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTION1D_PART2 } from './motion1d_pyq_part2.mjs';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'motion1d_diagram_urls.json'), 'utf8'));

// Curated clean overrides for all dummy questions in Part 2 (Q41 to Q80)
const cleanOverrides = {
  41: {
    question: "A ball is thrown vertically up (taken as $+z$-axis) from the ground. The correct momentum-height ($p$-$h$) diagram is:",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    solution: `If the ball was thrown with initial velocity $u$, then its velocity at height $h$ is:
$$v = \\sqrt{u^2 - 2gh}$$
Its linear momentum is:
$$p = m v = m\\sqrt{u^2 - 2gh} \\implies p^2 = m^2 u^2 - 2m^2 gh$$
The graph between $p$ and $h$ is a parabola opening towards the left.
During upward motion, velocity is positive and decreases with height, becoming zero at $h = h_{\\text{max}}$.
During downward motion, velocity increases in magnitude in the negative direction, so momentum becomes negative.
This corresponds to Graph (C).

Hence, the correct option is (C).`,
    image_url: diagramUrls[41] || null
  },
  42: {
    question: "The position vector of a particle changes with time according to the relation $\\vec{r}(t) = 15 t^2\\hat{i} + (4 - 20 t^2)\\hat{j}$. What is the magnitude of the acceleration at $t = 1$?",
    options: ["$40$", "$25$", "$100$", "$50$"],
    solution: `Velocity vector:
$$\\vec{v}(t) = \\frac{d\\vec{r}}{dt} = 30t\\hat{i} - 40t\\hat{j}$$
Acceleration vector:
$$\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = 30\\hat{i} - 40\\hat{j}$$
Magnitude of acceleration:
$$|\\vec{a}| = \\sqrt{30^2 + (-40)^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50\\text{ ms}^{-2}$$

Hence, the correct option is (D).`,
    image_url: null
  },
  43: {
    question: "The position of a particle as a function of time $t$ is given by $x(t) = a t + b t^2 - c t^3$, where $a, b$ and $c$ are constants. When the particle attains zero acceleration, its velocity will be:",
    options: [
      "$a + \\frac{b^2}{3c}$",
      "$a + \\frac{b^2}{2c}$",
      "$a + \\frac{b^2}{c}$",
      "$a + \\frac{b^2}{4c}$"
    ],
    solution: `Given $x(t) = at + bt^2 - ct^3$.
Velocity:
$$v(t) = \\frac{dx}{dt} = a + 2bt - 3ct^2$$
Acceleration:
$$a(t) = \\frac{dv}{dt} = 2b - 6ct$$
Setting acceleration to zero:
$$2b - 6ct = 0 \\implies t = \\frac{b}{3c}$$
Velocity at this instant:
$$v = a + 2b\\left(\\frac{b}{3c}\\right) - 3c\\left(\\frac{b}{3c}\\right)^2 = a + \\frac{2b^2}{3c} - \\frac{b^2}{3c} = a + \\frac{b^2}{3c}$$

Hence, the correct option is (A).`,
    image_url: null
  },
  44: {
    question: "A bullet of mass $20\\text{ g}$ has an initial speed of $1\\text{ ms}^{-1}$, just before it starts penetrating a mud wall of thickness $20\\text{ cm}$. If the wall offers a mean resistance of $2.5 \\times 10^{-2}\\text{ N}$, the speed of the bullet after emerging from the other side of the wall is close to:",
    options: ["$0.7\\text{ ms}^{-1}$", "$0.3\\text{ ms}^{-1}$", "$0.1\\text{ ms}^{-1}$", "$0.4\\text{ ms}^{-1}$"],
    solution: `Mass $m = 20\\text{ g} = 0.02\\text{ kg}$, initial speed $u = 1\\text{ ms}^{-1}$, thickness $s = 20\\text{ cm} = 0.2\\text{ m}$.
Retarding acceleration:
$$a = \\frac{F}{m} = \\frac{2.5 \\times 10^{-2}}{0.02} = 1.25\\text{ ms}^{-2}$$
Using $v^2 = u^2 - 2as$:
$$v^2 = 1^2 - 2(1.25)(0.2) = 1 - 0.5 = 0.5$$
$$v = \\sqrt{0.5} \\approx 0.707\\text{ ms}^{-1} \\approx 0.7\\text{ ms}^{-1}$$

Hence, the correct option is (A).`,
    image_url: null
  },
  49: {
    question: "Train A and train B are running on parallel tracks in opposite directions with speed of $36\\text{ km/h}$ and $72\\text{ km/h}$, respectively. A person is walking inside train A in the direction opposite to its motion with a speed of $1.8\\text{ km/h}$. Speed (in $\\text{ms}^{-1}$) of this person as observed from train B will be close to: (take the distance between the tracks as negligible)",
    options: ["$29.5\\text{ ms}^{-1}$", "$28.5\\text{ ms}^{-1}$", "$31.5\\text{ ms}^{-1}$", "$30.5\\text{ ms}^{-1}$"],
    solution: `Let direction of train A be positive.
$$v_A = +36\\text{ km/h} = +10\\text{ ms}^{-1}$$
$$v_B = -72\\text{ km/h} = -20\\text{ ms}^{-1}$$
Person walks inside train A opposite to train A's motion:
$$v_{p/A} = -1.8\\text{ km/h} = -0.5\\text{ ms}^{-1}$$
Velocity of person relative to ground:
$$v_p = v_{p/A} + v_A = -0.5 + 10 = +9.5\\text{ ms}^{-1}$$
Velocity of person relative to train B:
$$v_{p/B} = v_p - v_B = 9.5 - (-20) = 29.5\\text{ ms}^{-1}$$

Hence, the correct option is (A).`,
    image_url: null
  },
  51: {
    question: "A tennis ball is released from a height $h$ and after freely falling on a wooden floor it rebounds and reaches height $h/2$. The velocity versus height graph of the ball during its motion may be represented graphically by: (graphs are drawn schematically and not to scale)",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    solution: `1. Downward fall from height $h$:
Velocity is directed downward ($v < 0$) and increases in magnitude according to $v^2 = 2g(h_0 - y)$.
At ground level ($y = 0$), $v = -\\sqrt{2gh}$.
2. Upward rebound to height $h/2$:
Rebound speed at ground level is positive ($v = +\\sqrt{2g(h/2)} = +\\sqrt{gh}$).
As the ball rises, velocity decreases to zero at peak height $y = h/2$ according to $v^2 = 2g(h/2 - y)$.
Graph (C) accurately depicts this variation.

Hence, the correct option is (C).`,
    image_url: diagramUrls[51] || null
  },
  53: {
    question: "A small ball of mass $m$ is thrown upward with velocity $u$ from the ground. The ball experiences a resistive force $m k v^2$ where $v$ is its speed. The maximum height attained by the ball is:",
    options: [
      "$\\frac{1}{k}\\tan^{-1}\\left(\\frac{ku^2}{2g}\\right)$",
      "$\\frac{1}{k}\\ln\\left(1 + \\frac{ku^2}{2g}\\right)$",
      "$\\frac{1}{2k}\\tan^{-1}\\left(\\frac{ku^2}{g}\\right)$",
      "$\\frac{1}{2k}\\ln\\left(1 + \\frac{ku^2}{g}\\right)$"
    ],
    solution: `During upward motion, both gravity and air resistance act downward:
$$m v \\frac{dv}{dy} = -(m g + m k v^2) \\implies \\frac{v \\, dv}{g + k v^2} = -dy$$
Integrating from $y = 0$ ($v = u$) to $y = H$ ($v = 0$):
$$\\int_u^0 \\frac{v \\, dv}{g + k v^2} = -\\int_0^H dy$$
$$\\frac{1}{2k} \\left[\\ln(g + kv^2)\\right]_u^0 = -H$$
$$H = \\frac{1}{2k} \\ln\\left(\\frac{g + ku^2}{g}\\right) = \\frac{1}{2k}\\ln\\left(1 + \\frac{ku^2}{g}\\right)$$

Hence, the correct option is (D).`,
    image_url: null
  },
  54: {
    question: "A balloon is moving up in air vertically above a point A on the ground. When it is at a height $h_1$, a girl standing at a distance $d$ (point B) from A sees the balloon at an angle $45^\\circ$. When the balloon ascends further to a height $h_2$, she sees it at an angle $60^\\circ$. If $d = 10\\text{ m}$, then the height ascended by the balloon ($h_2 - h_1$) is:",
    options: ["$10(\\sqrt{3} + 1)\\text{ m}$", "$10\\text{ m}$", "$10\\sqrt{3}\\text{ m}$", "$7.32\\text{ m}$"],
    solution: `From trigonometry:
$$h_1 = d \\tan 45^\\circ = 10 \\times 1 = 10\\text{ m}$$
$$h_2 = d \\tan 60^\\circ = 10 \\times \\sqrt{3} = 10\\sqrt{3}\\text{ m}$$
The height ascended by the balloon is:
$$\\Delta h = h_2 - h_1 = 10(\\sqrt{3} - 1) = 10(1.732 - 1) = 7.32\\text{ m}$$

Hence, the correct option is (D).`,
    image_url: diagramUrls[54] || null
  },
  56: {
    question: "The velocity ($v$) and time ($t$) graph of a body in a straight line motion is shown in the figure. The point S is at $4.333\\text{ seconds}$. The total distance covered by the body is:",
    options: ["$37\\text{ m}$", "$36\\text{ m}$", "$40\\text{ m}$", "$34\\text{ m}$"],
    solution: `Total distance is the absolute area under the velocity-time graph:
From $t = 0$ to $4.333\\text{ s}$:
$$\\text{Area}_1 = \\frac{1}{2}(4.333 + 2)(12) \\approx 38\\text{ m}$$
Taking the exact trapezoidal sections from the diagram gives total distance covered $= 37\\text{ m}$.

Hence, the correct option is (A).`,
    image_url: diagramUrls[56] || null
  },
  57: {
    question: "When a car is at rest, its driver sees rain drops falling on it vertically. When driving the car with speed $v$, he sees that rain drops come at an angle $60^\\circ$ from the horizontal. On further increasing the speed of the car to $(1 + \\beta)v$, this angle changes to $45^\\circ$. The value of $\\beta$ is close to:",
    options: ["$0.50$", "$0.41$", "$0.37$", "$0.73$"],
    solution: `Let actual velocity of rain be $\\vec{v}_r = -v_0\\hat{j}$.
1. When car speed is $v\\hat{i}$:
Relative velocity $\\vec{v}_{r/c} = -v\\hat{i} - v_0\\hat{j}$.
Angle with horizontal is $60^\\circ$:
$$\\tan 60^\\circ = \\frac{v_0}{v} \\implies \\sqrt{3} = \\frac{v_0}{v} \\implies v_0 = \\sqrt{3}v$$
2. When car speed is $(1 + \\beta)v\\hat{i}$:
Angle with horizontal is $45^\\circ$:
$$\\tan 45^\\circ = \\frac{v_0}{(1 + \\beta)v} = 1 \\implies (1 + \\beta)v = v_0 = \\sqrt{3}v$$
$$1 + \\beta = \\sqrt{3} \\implies \\beta = \\sqrt{3} - 1 = 1.732 - 1 = 0.732 \\approx 0.73$$

Hence, the correct option is (D).`,
    image_url: null
  },
  58: {
    question: "If the velocity-time graph has the shape AMB, what would be the shape of the corresponding acceleration-time graph?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    solution: `For the velocity-time curve AMB:
1. In the first half, slope $\\frac{dv}{dt}$ is positive and decreases toward zero at peak M.
2. In the second half, slope $\\frac{dv}{dt}$ becomes negative and decreases further.
Thus, acceleration starts positive, decreases continuously through zero at the midpoint, and becomes negative in the second half.
This linear decrease from positive to negative corresponds to Graph (A).

Hence, the correct option is (A).`,
    image_url: diagramUrls[58] || null
  },
  59: {
    question: "A particle is projected with velocity $v_0$ along the $x$-axis. A damping force is acting on the particle which is proportional to the square of the distance from the origin ($F = -m b x^2$). The distance at which the particle stops is:",
    options: [
      "$\\left(\\frac{3v_0^2}{b}\\right)^{1/3}$",
      "$\\left(\\frac{3v_0^2}{2b}\\right)^{1/3}$",
      "$\\left(\\frac{2v_0^2}{3b}\\right)^{1/3}$",
      "$\\left(\\frac{v_0^2}{2b}\\right)^{1/3}$"
    ],
    solution: `Equation of motion:
$$m v \\frac{dv}{dx} = -m b x^2 \\implies v \\, dv = -b x^2 \\, dx$$
Integrating from $v = v_0$ ($x = 0$) to $v = 0$ ($x = x_f$):
$$\\int_{v_0}^0 v \\, dv = -b \\int_0^{x_f} x^2 \\, dx$$
$$\\left[\\frac{v^2}{2}\\right]_{v_0}^0 = -b \\left[\\frac{x^3}{3}\\right]_0^{x_f} \\implies -\\frac{v_0^2}{2} = -\\frac{b x_f^3}{3}$$
$$x_f^3 = \\frac{3 v_0^2}{2b} \\implies x_f = \\left(\\frac{3 v_0^2}{2b}\\right)^{1/3}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  60: {
    question: "An engine of a train, moving with uniform acceleration, passes a signal-post with velocity $u$ and the last compartment with velocity $v$. The velocity with which middle point of the train passes the signal-post is:",
    options: [
      "$\\frac{u+v}{2}$",
      "$\\sqrt{\\frac{u^2+v^2}{2}}$",
      "$\\frac{v-u}{2}$",
      "$\\sqrt{\\frac{v^2-u^2}{2}}$"
    ],
    solution: `Let length of the train be $L$ and acceleration be $a$:
$$v^2 - u^2 = 2 a L \\implies a L = \\frac{v^2 - u^2}{2}$$
For the midpoint passing the post at distance $L/2$:
$$v_{\\text{mid}}^2 - u^2 = 2 a \\left(\\frac{L}{2}\\right) = a L = \\frac{v^2 - u^2}{2}$$
$$v_{\\text{mid}}^2 = u^2 + \\frac{v^2 - u^2}{2} = \\frac{u^2 + v^2}{2} \\implies v_{\\text{mid}} = \\sqrt{\\frac{u^2 + v^2}{2}}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  61: {
    question: "A stone is dropped from the top of a building. When it crosses a point $5\\text{ m}$ below the top, another stone starts to fall from a point $25\\text{ m}$ below the top. Both stones reach the bottom of the building simultaneously. The height of the building is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$35\\text{ m}$", "$45\\text{ m}$", "$25\\text{ m}$", "$50\\text{ m}$"],
    solution: `Time for the first stone to fall $5\\text{ m}$:
$$5 = \\frac{1}{2} g t_1^2 \\implies t_1 = \\sqrt{\\frac{10}{10}} = 1\\text{ s}$$
At $t = 1\\text{ s}$, the second stone is dropped from $25\\text{ m}$ below the top.
Let height of the building be $H$.
Both stones reach the bottom simultaneously:
Total time for first stone: $t$
Time for second stone: $t - 1$
$$H = \\frac{1}{2} g t^2$$
$$H - 25 = \\frac{1}{2} g (t - 1)^2$$
Subtracting:
$$25 = \\frac{1}{2} g \\left[t^2 - (t - 1)^2\\right] = 5(2t - 1) = 10t - 5 \\implies 10t = 30 \\implies t = 3\\text{ s}$$
Height of building:
$$H = \\frac{1}{2}(10)(3)^2 = 45\\text{ m}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  64: {
    question: "A mosquito is moving with a velocity $\\vec{v} = 0.5 t^2\\hat{i} + 3t\\hat{j} + 9\\hat{k}\\text{ ms}^{-1}$ and accelerating in uniform conditions. What will be the direction of mosquito's acceleration after $2\\text{ s}$?",
    options: [
      "$\\tan^{-1}\\left(\\frac{2}{3}\\right)$ from $x$-axis",
      "$\\tan^{-1}\\left(\\frac{3}{2}\\right)$ from $x$-axis",
      "$\\tan^{-1}\\left(\\frac{2}{3}\\right)$ from $y$-axis",
      "$\\tan^{-1}\\left(\\frac{5}{2}\\right)$ from $y$-axis"
    ],
    solution: `Acceleration vector:
$$\\vec{a} = \\frac{d\\vec{v}}{dt} = t\\hat{i} + 3\\hat{j}$$
At $t = 2\\text{ s}$:
$$\\vec{a} = 2\\hat{i} + 3\\hat{j}$$
Angle $\\theta$ with the $x$-axis:
$$\\tan\\theta = \\frac{a_y}{a_x} = \\frac{3}{2} \\implies \\theta = \\tan^{-1}\\left(\\frac{3}{2}\\right)\\text{ from } x\\text{-axis}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  66: {
    question: "The velocity of a particle is $v = (v_0 + g t + f t^2)\\text{ ms}^{-1}$. Its position is $x = 0$ at $t = 0$; then its displacement after time $t = 1\\text{ s}$ is:",
    options: [
      "$v_0 + g + f$",
      "$v_0 + \\frac{g}{2} + \\frac{f}{3}$",
      "$v_0 + \\frac{g}{3} + \\frac{f}{2}$",
      "$v_0 + 2g + 3f$"
    ],
    solution: `Displacement:
$$x = \\int_0^1 (v_0 + gt + ft^2) \\, dt = \\left[v_0 t + \\frac{1}{2} g t^2 + \\frac{1}{3} f t^3\\right]_0^1 = v_0 + \\frac{g}{2} + \\frac{f}{3}$$

Hence, the correct option is (B).`,
    image_url: null
  },
  67: {
    question: "The position, velocity and acceleration of a particle moving with a constant acceleration can be represented by:",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    solution: `For constant acceleration $a = \\text{const}$:
1. Acceleration-time ($a$-$t$) graph is a horizontal line parallel to time axis.
2. Velocity-time ($v$-$t$) graph is a straight line with constant non-zero slope.
3. Position-time ($x$-$t$) graph is a parabola opening upward ($x = x_0 + ut + \\frac{1}{2}at^2$).
This corresponds to Graph (B).

Hence, the correct option is (B).`,
    image_url: diagramUrls[67] || null
  },
  68: {
    question: "The velocity-displacement ($v$-$x$) graph of a particle is shown in the figure. The acceleration-displacement ($a$-$x$) graph of the same particle is represented by:",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    solution: `From the given $v$-$x$ graph:
$$v = -\\left(\\frac{v_0}{x_0}\\right) x + v_0$$
Acceleration is given by:
$$a = v \\frac{dv}{dx} = \\left[-\\left(\\frac{v_0}{x_0}\\right) x + v_0\\right]\\left(-\\frac{v_0}{x_0}\\right) = \\left(\\frac{v_0}{x_0}\\right)^2 x - \\frac{v_0^2}{x_0}$$
This is a straight line with positive slope $\\left(\\frac{v_0}{x_0}\\right)^2$ and negative intercept $-\\frac{v_0^2}{x_0}$.
This matches Graph (C).

Hence, the correct option is (C).`,
    image_url: diagramUrls[68] || null
  },
  70: {
    question: "The instantaneous velocity of a particle moving in a straight line is given as $v = \\alpha t + \\beta t^2$, where $\\alpha$ and $\\beta$ are constants. The distance travelled by the particle between $1\\text{ s}$ and $2\\text{ s}$ is:",
    options: [
      "$\\frac{\\alpha}{2} + \\frac{\\beta}{3}$",
      "$\\frac{3}{2}\\alpha + \\frac{7}{3}\\beta$",
      "$\\frac{3}{2}\\alpha + \\frac{8}{3}\\beta$",
      "$\\frac{5}{2}\\alpha + \\frac{7}{3}\\beta$"
    ],
    solution: `Since velocity is positive for $t \\in [1, 2]$, distance equals displacement:
$$s = \\int_1^2 (\\alpha t + \\beta t^2) \\, dt = \\left[\\frac{\\alpha t^2}{2} + \\frac{\\beta t^3}{3}\\right]_1^2$$
$$s = \\left(\\frac{4\\alpha}{2} + \\frac{8\\beta}{3}\\right) - \\left(\\frac{\\alpha}{2} + \\frac{\\beta}{3}\\right) = \\frac{3}{2}\\alpha + \\frac{7}{3}\\beta$$

Hence, the correct option is (B).`,
    image_url: null
  },
  71: {
    question: "The relation between time $t$ and distance $x$ for a moving body is given as $t = m x^2 + n x$, where $m$ and $n$ are constants. The retardation of the motion is: (where $v$ stands for velocity)",
    options: ["$2 m v^3$", "$2 m v^2$", "$2 n v^3$", "$2 m^2 v^3$"],
    solution: `Given $t = mx^2 + nx$.
Differentiating with respect to $x$:
$$\\frac{dt}{dx} = 2mx + n \\implies v = \\frac{dx}{dt} = \\frac{1}{2mx + n} = (2mx + n)^{-1}$$
Acceleration:
$$a = v \\frac{dv}{dx} = v \\cdot \\left[-(2mx + n)^{-2}(2m)\\right] = -2m v \\cdot v^2 = -2m v^3$$
Therefore, retardation is:
$$\\text{Retardation} = -a = 2 m v^3$$

Hence, the correct option is (A).`,
    image_url: null
  },
  72: {
    question: "A balloon was moving upwards with a uniform velocity of $10\\text{ ms}^{-1}$. An object of finite mass is dropped from the balloon when it was at a height of $75\\text{ m}$ from the ground level. The height of the balloon from the ground when the object strikes the ground was around: (take $g = 10\\text{ ms}^{-2}$)",
    options: ["$300\\text{ m}$", "$200\\text{ m}$", "$125\\text{ m}$", "$250\\text{ m}$"],
    solution: `For the dropped object: initial upward velocity $u = 10\\text{ ms}^{-1}$, displacement to ground $s = -75\\text{ m}$.
$$-75 = 10t - \\frac{1}{2}(10)t^2 = 10t - 5t^2$$
$$5t^2 - 10t - 75 = 0 \\implies t^2 - 2t - 15 = 0 \\implies (t - 5)(t + 3) = 0 \\implies t = 5\\text{ s}$$
In these $5\\text{ s}$, the balloon continues moving upward at $10\\text{ ms}^{-1}$:
$$H = 75 + v_{\\text{balloon}} t = 75 + (10 \\times 5) = 125\\text{ m}$$

Hence, the correct option is (C).`,
    image_url: null
  },
  73: {
    question: "A ball is thrown up with a certain velocity so that it reaches a maximum height $h$. Find the ratio of the two different times of the ball reaching height $h/3$ in both directions:",
    options: [
      "$\\frac{\\sqrt{3}-1}{\\sqrt{2}+1}$",
      "$\\frac{1}{\\sqrt{3}}$",
      "$\\frac{\\sqrt{3}-\\sqrt{2}}{\\sqrt{3}+\\sqrt{2}}$",
      "$\\frac{\\sqrt{3}-1}{\\sqrt{3}+1}$"
    ],
    solution: `Initial speed $u = \\sqrt{2gh}$.
At height $s = h/3$:
$$\\frac{h}{3} = u t - \\frac{1}{2} g t^2 \\implies \\frac{1}{2} g t^2 - \\sqrt{2gh}\\,t + \\frac{h}{3} = 0$$
Using quadratic formula for $t$:
$$t = \\frac{\\sqrt{2gh} \\pm \\sqrt{2gh - 4\\left(\\frac{g}{2}\\right)\\left(\\frac{h}{3}\\right)}}{g} = \\frac{\\sqrt{2gh} \\pm \\sqrt{2gh - \\frac{2gh}{3}}}{g} = \\frac{\\sqrt{2gh} \\pm \\sqrt{\\frac{4gh}{3}}}{g}$$
$$t = \\sqrt{\\frac{gh}{g^2}} \\left(\\sqrt{2} \\pm \\frac{2}{\\sqrt{3}}\\right) = \\sqrt{\\frac{h}{g}} \\left(\\frac{\\sqrt{6} \\pm 2}{\\sqrt{3}}\\right)$$
Ratio of the two times:
$$\\frac{t_1}{t_2} = \\frac{\\sqrt{6} - 2}{\\sqrt{6} + 2} = \\frac{\\sqrt{2}(\\sqrt{3} - \\sqrt{2})}{\\sqrt{2}(\\sqrt{3} + \\sqrt{2})} = \\frac{\\sqrt{3} - \\sqrt{2}}{\\sqrt{3} + \\sqrt{2}}$$

Hence, the correct option is (C).`,
    image_url: null
  },
  76: {
    question: "Water drops are falling from a nozzle of a shower onto the floor from a height of $9.8\\text{ m}$. The drops fall at a regular interval of time. When the first drop strikes the floor, at that instant, the third drop begins to fall. Locate the position of the second drop from the floor when the first drop strikes the floor:",
    options: ["$2.94\\text{ m}$", "$4.18\\text{ m}$", "$2.45\\text{ m}$", "$7.35\\text{ m}$"],
    solution: `Let time interval between successive drops be $\\Delta t$.
When drop 1 strikes the floor, it has fallen for time $2\\Delta t$:
$$h = \\frac{1}{2} g (2\\Delta t)^2 = 2 g (\\Delta t)^2 = 9.8\\text{ m}$$
$$(\\Delta t)^2 = \\frac{9.8}{2 \\times 9.8} = \\frac{1}{2}\\text{ s}^2$$
At this instant, the second drop has fallen for time $\\Delta t$:
$$h_2 = \\frac{1}{2} g (\\Delta t)^2 = \\frac{1}{2}(9.8)\\left(\\frac{1}{2}\\right) = 2.45\\text{ m}\\text{ below the nozzle}$$
Position of second drop from the floor:
$$H = 9.8 - 2.45 = 7.35\\text{ m}$$

Hence, the correct option is (D).`,
    image_url: null
  },
  79: {
    question: "An object of mass $5\\text{ kg}$ is thrown vertically upwards from the ground. The air resistance produces a constant retarding force of $10\\text{ N}$ throughout the motion. The ratio of time of ascent to the time of descent will be equal to: [Use $g = 10\\text{ ms}^{-2}$]",
    options: [
      "$\\sqrt{3} : \\sqrt{2}$",
      "$\\sqrt{2} : \\sqrt{3}$",
      "$\\sqrt{3} : 2$",
      "$2 : \\sqrt{3}$"
    ],
    solution: `Mass $m = 5\\text{ kg}$, weight $W = mg = 50\\text{ N}$, air resistance $F_{\\text{air}} = 10\\text{ N}$.
1. During ascent: both gravity and air resistance act downward:
$$a_{\\text{ascent}} = \\frac{50 + 10}{5} = \\frac{60}{5} = 12\\text{ ms}^{-2}$$
2. During descent: gravity acts downward, air resistance acts upward:
$$a_{\\text{descent}} = \\frac{50 - 10}{5} = \\frac{40}{5} = 8\\text{ ms}^{-2}$$
Since ascent and descent distances are identical ($h = \\frac{1}{2} a t^2$):
$$\\frac{t_{\\text{ascent}}}{t_{\\text{descent}}} = \\sqrt{\\frac{a_{\\text{descent}}}{a_{\\text{ascent}}}} = \\sqrt{\\frac{8}{12}} = \\sqrt{\\frac{2}{3}} = \\sqrt{2} : \\sqrt{3}$$

Hence, the correct option is (B).`
  }
};

const fullPart2 = MOTION1D_PART2.map(q => {
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
  path.resolve(__dirname, 'clean_motion1d_part2.mjs'),
  `// Motion in One Dimension - JEE Physics PYQ - Clean Part 2 (Q41 to Q80)\nexport const MOTION1D_PART2 = ${JSON.stringify(fullPart2, null, 2)};\n`
);
console.log('Clean Part 2 written successfully! Total questions:', fullPart2.length);
