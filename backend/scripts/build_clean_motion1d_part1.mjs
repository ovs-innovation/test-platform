import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'motion1d_diagram_urls.json'), 'utf8'));

export const CLEAN_PART1 = [
  {
    qNum: 1,
    exam: "JEE Main 2002",
    question: "Speeds of two identical cars are $u$ and $4u$ at a specific instant. The ratio of the respective distances in which the two cars are stopped from that instant is:",
    options: ["$1 : 1$", "$1 : 4$", "$1 : 8$", "$1 : 16$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Using equation of motion $v^2 = u^2 - 2as$:
Since the braking retardation $a$ is the same for both cars:
$$s = \\frac{u^2}{2a}$$
For the first car: $s_1 = \\frac{u^2}{2a}$
For the second car: $s_2 = \\frac{(4u)^2}{2a} = 16\\frac{u^2}{2a} = 16 s_1$
Therefore, the ratio of stopping distances is:
$$\\frac{s_1}{s_2} = \\frac{1}{16}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 2,
    exam: "JEE Main 2002",
    question: "If a body loses half of its velocity on penetrating $3\\text{ cm}$ in a wooden block, then how much will it penetrate further before coming to rest?",
    options: ["$1\\text{ cm}$", "$2\\text{ cm}$", "$3\\text{ cm}$", "$4\\text{ cm}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let initial velocity be $u$. On penetrating $s_1 = 3\\text{ cm}$, its velocity becomes $v_1 = u/2$.
Using $v^2 = u^2 - 2as$:
$$\\left(\\frac{u}{2}\\right)^2 = u^2 - 2a(3) \\implies \\frac{u^2}{4} = u^2 - 6a \\implies 6a = \\frac{3u^2}{4} \\implies a = \\frac{u^2}{8}$$
Let additional penetration be $s_2$ before coming to rest ($v_2 = 0$):
$$0^2 = \\left(\\frac{u}{2}\\right)^2 - 2a s_2 \\implies \\frac{u^2}{4} = 2\\left(\\frac{u^2}{8}\\right) s_2 = \\frac{u^2}{4} s_2 \\implies s_2 = 1\\text{ cm}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 3,
    exam: "JEE Main 2002",
    question: "From a building two balls A and B are thrown such that A is thrown upwards and B downwards (both vertically with the same initial speed). If $v_A$ and $v_B$ are their respective velocities on reaching the ground, then:",
    options: ["$v_A > v_B$", "$v_A = v_B$", "$v_A < v_B$", "their velocities depend on their masses"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `By conservation of mechanical energy, for a body of mass $m$ thrown with initial speed $u$ from a height $h$:
$$m g h + \\frac{1}{2} m u^2 = \\frac{1}{2} m v^2 \\implies v = \\sqrt{u^2 + 2gh}$$
Since both balls have the same initial speed $u$ and are thrown from the same height $h$, their speeds on reaching the ground are identical:
$$v_A = v_B = \\sqrt{u^2 + 2gh}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 4,
    exam: "JEE Main 2003",
    question: "A body travels a distance $s$ in $t$ seconds. It starts from rest and ends at rest. In the first part of the journey, it moves with constant acceleration $f$ and in the second part with constant retardation $r$. The value of $t$ is given by:",
    options: [
      "$\\sqrt{2s\\left(\\frac{1}{f} + \\frac{1}{r}\\right)}$",
      "$2s\\left(\\frac{1}{f} + \\frac{1}{r}\\right)$",
      "$\\frac{2s}{\\frac{1}{f} + \\frac{1}{r}}$",
      "$\\sqrt{2s(f + r)}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let maximum velocity reached be $v_{\\text{max}}$, acceleration time be $t_1$, and deceleration time be $t_2$.
$$t_1 = \\frac{v_{\\text{max}}}{f}, \\quad t_2 = \\frac{v_{\\text{max}}}{r}$$
Total time $t = t_1 + t_2 = v_{\\text{max}}\\left(\\frac{1}{f} + \\frac{1}{r}\\right)$.
Total distance $s$ is the area of the triangular $v$-$t$ graph:
$$s = \\frac{1}{2} v_{\\text{max}} t \\implies v_{\\text{max}} = \\frac{2s}{t}$$
Substituting $v_{\\text{max}}$ into the time relation:
$$t = \\frac{2s}{t}\\left(\\frac{1}{f} + \\frac{1}{r}\\right) \\implies t^2 = 2s\\left(\\frac{1}{f} + \\frac{1}{r}\\right) \\implies t = \\sqrt{2s\\left(\\frac{1}{f} + \\frac{1}{r}\\right)}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 5,
    exam: "JEE Main 2003",
    question: "A car, moving with a speed of $50\\text{ km/hr}$, can be stopped by brakes after at least $6\\text{ m}$. If the same car is moving at a speed of $100\\text{ km/hr}$, the minimum stopping distance is:",
    options: ["$12\\text{ m}$", "$18\\text{ m}$", "$24\\text{ m}$", "$6\\text{ m}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Stopping distance $s \\propto u^2$ for constant braking force.
$$\\frac{s_2}{s_1} = \\left(\\frac{u_2}{u_1}\\right)^2 = \\left(\\frac{100}{50}\\right)^2 = 4$$
$$s_2 = 4 \\times s_1 = 4 \\times 6\\text{ m} = 24\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 6,
    exam: "JEE Main 2003",
    question: "The coordinates of a moving particle at any time $t$ are given by $x = \\alpha t^3$ and $y = \\beta t^3$. The speed of the particle at time $t$ is given by:",
    options: [
      "$3t\\sqrt{\\alpha^2 + \\beta^2}$",
      "$3t^2\\sqrt{\\alpha^2 + \\beta^2}$",
      "$t^2\\sqrt{\\alpha^2 + \\beta^2}$",
      "$\\sqrt{\\alpha^2 + \\beta^2}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Velocity components:
$$v_x = \\frac{dx}{dt} = 3\\alpha t^2$$
$$v_y = \\frac{dy}{dt} = 3\\beta t^2$$
The resultant speed is:
$$v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{(3\\alpha t^2)^2 + (3\\beta t^2)^2} = 3t^2\\sqrt{\\alpha^2 + \\beta^2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 7,
    exam: "JEE Main 2003",
    question: "Two particles start simultaneously from the same point and move along two straight lines, one with uniform velocity $u$ and the other from rest with uniform acceleration $f$. Let $\\alpha$ be the angle between their directions of motion. The relative velocity of the second particle with respect to the first is least after a time:",
    options: [
      "$\\frac{u\\cos\\alpha}{f}$",
      "$\\frac{u\\sin\\alpha}{f}$",
      "$f\\cos\\alpha$",
      "$\\frac{u\\sin\\alpha}{u}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `Let $\\vec{v}_1 = u\\hat{i}$.
Particle 2 moves with acceleration $f$ at angle $\\alpha$, so at time $t$:
$$\\vec{v}_2 = (f t \\cos\\alpha)\\hat{i} + (f t \\sin\\alpha)\\hat{j}$$
Relative velocity:
$$\\vec{v}_{21} = \\vec{v}_2 - \\vec{v}_1 = (f t \\cos\\alpha - u)\\hat{i} + (f t \\sin\\alpha)\\hat{j}$$
$$|\\vec{v}_{21}|^2 = (f t \\cos\\alpha - u)^2 + (f t \\sin\\alpha)^2 = f^2 t^2 - 2 u f t \\cos\\alpha + u^2$$
To minimize $|\\vec{v}_{21}|^2$, differentiate w.r.t. $t$ and equate to zero:
$$\\frac{d}{dt}(|\\vec{v}_{21}|^2) = 2f^2 t - 2u f \\cos\\alpha = 0 \\implies t = \\frac{u\\cos\\alpha}{f}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 8,
    exam: "JEE Main 2003",
    question: "A ball is thrown from a point with a speed $v_0$ at an angle of projection $\\theta$. From the same point and at the same instant a person starts running with a constant speed $v_0/2$ to catch the ball. Will the person be able to catch the ball? If yes, what should be the angle of projection?",
    options: ["Yes, $60^\\circ$", "Yes, $30^\\circ$", "No", "Yes, $45^\\circ$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `For the person to catch the ball at the point of landing, their horizontal speed must equal the horizontal component of the ball's velocity throughout the flight:
$$v_{\\text{person}} = v_0 \\cos\\theta$$
$$\\frac{v_0}{2} = v_0 \\cos\\theta \\implies \\cos\\theta = \\frac{1}{2} \\implies \\theta = 60^\\circ$$

Hence, the person will be able to catch the ball if $\\theta = 60^\\circ$.
Hence, the correct option is (A).`
  },
  {
    qNum: 9,
    exam: "JEE Main 2004",
    question: "An automobile travelling with speed of $60\\text{ km/h}$, can brake to stop within a distance of $20\\text{ m}$. If the car is going twice as fast, i.e., $120\\text{ km/h}$, the stopping distance will be:",
    options: ["$50\\text{ m}$", "$40\\text{ m}$", "$60\\text{ m}$", "$80\\text{ m}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Stopping distance $s = \\frac{u^2}{2a}$.
When initial speed is doubled ($u' = 2u$), stopping distance quadruples:
$$s' = 4 s = 4 \\times 20\\text{ m} = 80\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 10,
    exam: "JEE Main 2004",
    question: "A ball is released from the top of a tower of height $h$ metres. It takes $T$ seconds to reach the ground. What is the position of the ball in $T/3$ seconds?",
    options: [
      "$h/9\\text{ metres from the ground}$",
      "$7h/9\\text{ metres from the ground}$",
      "$8h/9\\text{ metres from the ground}$",
      "$17h/18\\text{ metres from the ground}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Total height $h = \\frac{1}{2} g T^2$.
Distance fallen in time $t = T/3$:
$$y = \\frac{1}{2} g \\left(\\frac{T}{3}\\right)^2 = \\frac{1}{9}\\left(\\frac{1}{2} g T^2\\right) = \\frac{h}{9}$$
Height above the ground:
$$H = h - y = h - \\frac{h}{9} = \\frac{8h}{9}\\text{ metres from the ground}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 11,
    exam: "JEE Main 2004",
    question: "Two points A and B move from rest along a straight line with constant acceleration $f$ and $f'$ respectively. If A takes $m\\text{ seconds}$ more than B and describes $n$ units more than B in acquiring the same speed $v$, then:",
    options: [
      "$(f - f')m^2 = f f' n$",
      "$(f + f')m^2 = f f' n$",
      "$(f + f')m = f f' n^2$",
      "$(f' - f)n = \\frac{1}{2} f f' m^2$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `Let the common final speed be $v$.
Times taken:
$$t_A = \\frac{v}{f}, \\quad t_B = \\frac{v}{f'} \\implies t_A - t_B = m = v\\left(\\frac{1}{f} - \\frac{1}{f'}\\right) = \\frac{v(f' - f)}{f f'}$$
Distances covered:
$$s_A = \\frac{v^2}{2f}, \\quad s_B = \\frac{v^2}{2f'} \\implies s_A - s_B = n = \\frac{v^2}{2}\\left(\\frac{1}{f} - \\frac{1}{f'}\\right) = \\frac{v^2(f' - f)}{2 f f'}$$
Squaring the time relation:
$$m^2 = \\frac{v^2(f' - f)^2}{(f f')^2}$$
Dividing $n$ by $m^2$:
$$\\frac{n}{m^2} = \\frac{\\frac{v^2(f' - f)}{2 f f'}}{\\frac{v^2(f' - f)^2}{(f f')^2}} = \\frac{f f'}{2(f' - f)} \\implies (f' - f) n = \\frac{1}{2} f f' m^2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 12,
    exam: "JEE Main 2005",
    question: "A car starting from rest accelerates at the rate $f$ through a distance $S$, then continues at constant speed for time $t$ and then decelerates at the rate $f/2$ to come to rest. If the total distance traversed is $15S$, then:",
    options: [
      "$S = \\frac{1}{2} f t^2$",
      "$S = \\frac{1}{4} f t^2$",
      "$S = \\frac{1}{72} f t^2$",
      "None of these"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `1. Acceleration phase: starts from rest with acceleration $f$ over distance $S$:
$$v_0^2 = 2 f S \\implies v_0 = \\sqrt{2 f S}, \\quad t_1 = \\frac{v_0}{f} = \\sqrt{\\frac{2S}{f}}$$
2. Deceleration phase: decelerates from $v_0$ to $0$ with deceleration $f/2$:
$$S_3 = \\frac{v_0^2}{2(f/2)} = \\frac{v_0^2}{f} = \\frac{2fS}{f} = 2S$$
3. Constant speed phase:
Total distance $S_{\\text{total}} = S + S_2 + 2S = 15S \\implies S_2 = 12S$.
At constant speed $v_0$:
$$S_2 = v_0 t = 12S \\implies \\sqrt{2 f S} \\, t = 12S$$
Squaring both sides:
$$2 f S t^2 = 144 S^2 \\implies S = \\frac{1}{72} f t^2$$
Since the options in the original question were $S = ft, S = \\frac{1}{6}ft, S = \\frac{1}{2}ft$ and (D) None of these, the correct option is None of these ($S = \\frac{1}{72} f t^2$).

Hence, the correct option is (D).`
  },
  {
    qNum: 13,
    exam: "JEE Main 2005",
    question: "The relation between time $t$ and distance $x$ is $t = ax^2 + bx$ where $a$ and $b$ are constants. The acceleration is:",
    options: ["$-2av^2$", "$2bv^3$", "$-2av^3$", "$2av^2$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Given $t = a x^2 + b x$. Differentiating with respect to $x$:
$$\\frac{dt}{dx} = 2ax + b$$
Velocity is $v = \\frac{dx}{dt} = \\frac{1}{2ax + b} = (2ax + b)^{-1}$.
Acceleration:
$$a_{\\text{acc}} = v \\frac{dv}{dx} = v \\cdot \\left[-(2ax + b)^{-2} \\cdot 2a\\right] = -2a v \\cdot v^2 = -2a v^3$$

Hence, the correct option is (C).`
  },
  {
    qNum: 14,
    exam: "JEE Main 2005",
    question: "A parachutist after bailing out falls $50\\text{ m}$ without friction. When parachute opens, it decelerates at $2\\text{ ms}^{-2}$. He reaches the ground with a speed of $3\\text{ ms}^{-1}$. At what height did he bail out?",
    options: ["$91\\text{ m}$", "$182\\text{ m}$", "$293\\text{ m}$", "$111\\text{ m}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `1. Free fall for $h_1 = 50\\text{ m}$ ($g = 9.8\\text{ ms}^{-2}$):
$$v_1^2 = u^2 + 2 g h_1 = 0 + 2(9.8)(50) = 980\\text{ m}^2\\text{s}^{-2}$$
2. Parachute motion with deceleration $a = 2\\text{ ms}^{-2}$ to ground speed $v_2 = 3\\text{ ms}^{-1}$:
$$v_2^2 = v_1^2 - 2 a h_2 \\implies 3^2 = 980 - 2(2) h_2$$
$$4 h_2 = 980 - 9 = 971 \\implies h_2 = 242.75\\text{ m} \\approx 243\\text{ m}$$
Total height $H = h_1 + h_2 = 50 + 243 = 293\\text{ m}$.

Hence, the correct option is (C).`
  },
  {
    qNum: 15,
    exam: "JEE Main 2006",
    question: "A body falling from rest under gravity passes a certain point P. It was at a distance of $400\\text{ m}$ from P, $4\\text{ s}$ prior to passing through P. If $g = 10\\text{ ms}^{-2}$, then the height above the point P from where the body began to fall is:",
    options: ["$720\\text{ m}$", "$900\\text{ m}$", "$320\\text{ m}$", "$680\\text{ m}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let time taken from release to point P be $t$.
Height of P below release point: $h = \\frac{1}{2} g t^2$.
$4\\text{ s}$ prior, the body was at distance $(h - 400)$ below the release point at time $(t - 4)$:
$$h - 400 = \\frac{1}{2} g (t - 4)^2$$
Subtracting the two equations:
$$400 = \\frac{1}{2} g \\left[t^2 - (t - 4)^2\\right] = \\frac{1}{2}(10)(8t - 16) = 5(8t - 16) = 40t - 80$$
$$40t = 480 \\implies t = 12\\text{ s}$$
Height above point P:
$$h = \\frac{1}{2}(10)(12)^2 = 5 \\times 144 = 720\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 16,
    exam: "JEE Main 2006",
    question: "A particle located at $x = 0$ at time $t = 0$, starts moving along the positive $x$-direction with a velocity $v$ that varies as $v = \\alpha \\sqrt{x}$. The displacement of the particle varies with time as:",
    options: ["$t^3$", "$t^2$", "$t$", "$t^{1/2}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Given $v = \\frac{dx}{dt} = \\alpha \\sqrt{x}$:
$$\\frac{dx}{\\sqrt{x}} = \\alpha \\, dt$$
Integrating both sides from $0$ to $x$ and $0$ to $t$:
$$2\\sqrt{x} = \\alpha t \\implies \\sqrt{x} = \\frac{\\alpha t}{2} \\implies x = \\frac{\\alpha^2}{4} t^2$$
Therefore, $x \\propto t^2$.

Hence, the correct option is (B).`
  },
  {
    qNum: 17,
    exam: "JEE Main 2007",
    question: "The velocity of a particle is $v = v_0 + g t + f t^2$. If its position is $x = 0$ at $t = 0$, then its displacement after unit time ($t = 1$) is:",
    options: [
      "$v_0 + 2g + 3f$",
      "$v_0 + g/2 + f/3$",
      "$v_0 + g + f$",
      "$v_0 + g/2 + f$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Displacement $x = \\int_0^1 v \\, dt$:
$$x = \\int_0^1 (v_0 + gt + ft^2) \\, dt = \\left[v_0 t + \\frac{1}{2} g t^2 + \\frac{1}{3} f t^3\\right]_0^1 = v_0 + \\frac{g}{2} + \\frac{f}{3}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 18,
    exam: "JEE Main 2008",
    question: "A body is at rest at $x = 0$. At $t = 0$, it starts moving in the positive $x$-direction with a constant acceleration. At the same instant another body passes through $x = 0$ moving in the positive $x$-direction with a constant speed. The position of the first body is given by $x_1(t)$ after time $t$ and that of the second body by $x_2(t)$ after the same time interval. Which of the following graphs correctly describes $(x_1 - x_2)$ as a function of time $t$?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[18] || null,
    solution: `Positions of the two bodies:
$$x_1(t) = \\frac{1}{2} a t^2, \\quad x_2(t) = v t$$
$$x_1(t) - x_2(t) = \\frac{1}{2} a t^2 - v t$$
This is an upward-opening parabola passing through the origin $t = 0$.
Initially for small $t$, $(x_1 - x_2)$ becomes negative, reaches a minimum at $t = v/a$, and then rises to become positive after $t = 2v/a$.
This corresponds to Graph (B).

Hence, the correct option is (B).`
  },
  {
    qNum: 19,
    exam: "JEE Main 2008",
    question: "Consider a rubber ball freely falling from a height $h = 4.9\\text{ m}$ onto a horizontal elastic plate. Assume that the duration of collision is negligible and the collision with the plate is totally elastic. Then the velocity as a function of time and the height as a function of time will be:",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `1. Free fall under gravity: $v = -gt$, so velocity decreases linearly with negative slope $-g$.
2. At the elastic collision with the plate, velocity reverses sign instantly from $-v$ to $+v$.
3. As the ball rebounds upward, $v = v_0 - gt$, again decreasing linearly with slope $-g$.
4. Height $h(t)$ is parabolic arcs reaching the same peak height $4.9\\text{ m}$ repeatedly.
This periodic sawtooth velocity graph and parabolic height graph correspond to option (C).

Hence, the correct option is (C).`
  },
  {
    qNum: 20,
    exam: "JEE Main 2010",
    question: "A particle has an initial velocity $3\\hat{i} + 4\\hat{j}$ and an acceleration of $0.4\\hat{i} + 0.3\\hat{j}$. Its speed after $10\\text{ s}$ is:",
    options: ["$10\\text{ units}$", "$7\\sqrt{2}\\text{ units}$", "$7\\text{ units}$", "$8.5\\text{ units}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Using $\\vec{v} = \\vec{u} + \\vec{a} t$:
$$\\vec{v} = (3\\hat{i} + 4\\hat{j}) + (0.4\\hat{i} + 0.3\\hat{j})(10) = (3\\hat{i} + 4\\hat{j}) + (4\\hat{i} + 3\\hat{j}) = 7\\hat{i} + 7\\hat{j}$$
Speed:
$$|\\vec{v}| = \\sqrt{7^2 + 7^2} = 7\\sqrt{2}\\text{ units}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 21,
    exam: "JEE Main 2011",
    question: "An object, moving with a speed of $6.25\\text{ ms}^{-1}$, is decelerated at a rate given by $\\frac{dv}{dt} = -2.5\\sqrt{v}$, where $v$ is the instantaneous speed. The time taken by the object to come to rest would be:",
    options: ["$2\\text{ s}$", "$4\\text{ s}$", "$8\\text{ s}$", "$1\\text{ s}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Separating variables:
$$\\frac{dv}{\\sqrt{v}} = -2.5 \\, dt$$
Integrating from $v = 6.25$ to $v = 0$ as $t$ goes from $0$ to $t$:
$$\\left[2\\sqrt{v}\\right]_{6.25}^0 = -2.5 t \\implies 0 - 2\\sqrt{6.25} = -2.5 t$$
$$-2(2.5) = -2.5 t \\implies t = 2\\text{ s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 22,
    exam: "JEE Main 2011",
    question: "The graph of an object's motion (along the $x$-axis) is shown in the figure. The instantaneous velocity of the object at points A and B are $v_A$ and $v_B$ respectively. Then:",
    options: [
      "$v_A = v_B = 0.5\\text{ ms}^{-1}$",
      "$v_A = 0.5\\text{ ms}^{-1} < v_B$",
      "$v_A = 0.5\\text{ ms}^{-1} > v_B$",
      "$v_A = v_B = 2\\text{ ms}^{-1}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[22] || null,
    solution: `Instantaneous velocity $v = \\frac{dx}{dt}$ is given by the slope of the tangent at the respective point on the $x$-$t$ graph.
From the given graph:
$$v_A = \\frac{\\Delta x_A}{\\Delta t_A} = \\frac{4\\text{ m}}{8\\text{ s}} = 0.5\\text{ ms}^{-1}$$
$$v_B = \\frac{\\Delta x_B}{\\Delta t_B} = \\frac{4\\text{ m}}{8\\text{ s}} = 0.5\\text{ ms}^{-1}$$
Therefore, $v_A = v_B = 0.5\\text{ ms}^{-1}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 23,
    exam: "JEE Main 2012",
    question: "The distance travelled by a body moving along a line in time $t$ is proportional to $t^3$. The acceleration-time ($a$-$t$) graph for the motion of the body will be:",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls[23] || null,
    solution: `Given displacement $s = k t^3$ (where $k$ is a constant).
Velocity:
$$v = \\frac{ds}{dt} = 3 k t^2$$
Acceleration:
$$a = \\frac{dv}{dt} = 6 k t$$
Thus, $a \\propto t$.
The acceleration-time graph is a straight line passing through the origin with positive slope, which corresponds to Graph (B).

Hence, the correct option is (B).`
  },
  {
    qNum: 24,
    exam: "JEE Main 2012",
    question: "A goods train accelerating uniformly on a straight railway track, approaches an electric pole standing on the side of track. Its engine passes the pole with velocity $u$ and the guard's room passes with velocity $v$. The middle wagon of the train passes the pole with a velocity:",
    options: [
      "$\\frac{u+v}{2}$",
      "$\\frac{1}{2}\\sqrt{u^2 + v^2}$",
      "$\\sqrt{uv}$",
      "$\\sqrt{\\frac{u^2 + v^2}{2}}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let the length of the train be $L$ and constant acceleration be $a$.
For the entire train passing the pole:
$$v^2 - u^2 = 2 a L \\implies a L = \\frac{v^2 - u^2}{2}$$
Let $v_m$ be the velocity when the middle wagon ($L/2$) passes the pole:
$$v_m^2 - u^2 = 2 a \\left(\\frac{L}{2}\\right) = a L = \\frac{v^2 - u^2}{2}$$
$$v_m^2 = u^2 + \\frac{v^2 - u^2}{2} = \\frac{u^2 + v^2}{2} \\implies v_m = \\sqrt{\\frac{u^2 + v^2}{2}}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 25,
    exam: "JEE Main 2013",
    question: "A ball is dropped vertically downwards from a height $h$ above the ground. It hits the ground inelastically and bounces up vertically. Neglecting subsequent motion and air resistance, which of the following graphs represents the variation between speed ($v$) and height ($h$) correctly?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[25] || null,
    solution: `During downward fall from height $h_0$:
$$v^2 = 2g(h_0 - h) \\implies v^2 \\propto (h_0 - h)$$
This is a parabolic relationship between $v$ and $h$, with $v = 0$ at $h = h_0$ and maximum speed $v_1 = \\sqrt{2gh_0}$ at ground $h = 0$.
After the inelastic bounce, the ball loses some kinetic energy, rebounding with speed $v_2 < v_1$ at $h = 0$.
As it rises to maximum rebound height $h_1 < h_0$, speed decreases parabolically to zero:
$$v^2 = 2g(h_1 - h)$$
Graph (D) correctly depicts this variation.

Hence, the correct option is (D).`
  },
  {
    qNum: 26,
    exam: "JEE Main 2014",
    question: "From a tower of height $H$, a particle is thrown vertically upwards with a speed $u$. The time taken by the particle to hit the ground is $n$ times that taken by it to reach the highest point of its path. The relation between $H$, $u$ and $n$ is:",
    options: [
      "$2gH = n^2 u^2$",
      "$gH = (n - 2)^2 u^2$",
      "$2gH = n u^2 (n - 2)$",
      "$gH = (n - 2) u^2$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Time taken to reach the highest point:
$$t_{\\text{top}} = \\frac{u}{g}$$
Total time of flight to reach the ground:
$$t = n \\cdot t_{\\text{top}} = \\frac{n u}{g}$$
Using displacement equation from the top of the tower (taking downward as negative):
$$-H = u t - \\frac{1}{2} g t^2 = u\\left(\\frac{nu}{g}\\right) - \\frac{1}{2} g \\left(\\frac{nu}{g}\\right)^2$$
$$-H = \\frac{n u^2}{g} - \\frac{n^2 u^2}{2g} = \\frac{u^2}{2g}(2n - n^2) = -\\frac{u^2}{2g} n(n - 2)$$
$$2gH = n u^2 (n - 2)$$

Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: "JEE Main 2014",
    question: "A person climbs up a stalled escalator in $60\\text{ s}$. If standing on the escalator running with constant velocity he takes $40\\text{ s}$. How much time is taken by the person to walk up the moving escalator?",
    options: ["$37\\text{ s}$", "$27\\text{ s}$", "$24\\text{ s}$", "$45\\text{ s}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Let length of the escalator be $L$.
Walking speed of person: $v_p = \\frac{L}{60}$
Speed of moving escalator: $v_e = \\frac{L}{40}$
When the person walks up the moving escalator:
$$v_{\\text{net}} = v_p + v_e = \\frac{L}{60} + \\frac{L}{40} = L\\left(\\frac{2 + 3}{120}\\right) = \\frac{5L}{120} = \\frac{L}{24}$$
Time taken:
$$t = \\frac{L}{v_{\\text{net}}} = 24\\text{ s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 28,
    exam: "JEE Main 2014",
    question: "A bullet loses $\\left(\\frac{1}{n}\\right)^{\\text{th}}$ of its velocity passing through one plank. Considering uniform retardation, the number of such planks that are required to stop the bullet can be:",
    options: [
      "Infinite",
      "$\\frac{n}{2n - 1}$",
      "$\\frac{n^2}{2n - 1}$",
      "$\\frac{2n^2}{2n - 1}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let initial velocity be $u$ and plank thickness be $x$.
After passing through one plank, velocity is $v = u\\left(1 - \\frac{1}{n}\\right) = u\\left(\\frac{n-1}{n}\\right)$.
Using $v^2 - u^2 = -2ax$:
$$2ax = u^2 - u^2\\left(\\frac{n-1}{n}\\right)^2 = u^2 \\left[1 - \\frac{n^2 - 2n + 1}{n^2}\\right] = u^2 \\left(\\frac{2n - 1}{n^2}\\right)$$
Let $N$ planks be required to stop the bullet completely ($v = 0$):
$$u^2 = 2a (N x) = N (2ax) = N \\cdot u^2 \\left(\\frac{2n - 1}{n^2}\\right)$$
$$1 = N \\left(\\frac{2n - 1}{n^2}\\right) \\implies N = \\frac{n^2}{2n - 1}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 29,
    exam: "JEE Main 2015",
    question: "Two stones are thrown up simultaneously from the edge of a cliff $240\\text{ m}$ high with an initial speed of $10\\text{ ms}^{-1}$ and $40\\text{ ms}^{-1}$ respectively. Which of the following graphs best represents the time variation of the relative position of the second stone with respect to the first? (Assume stones do not rebound after hitting the ground and neglect air resistance, take $g = 10\\text{ ms}^{-2}$)",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: diagramUrls[29] || null,
    solution: `1. Time for first stone to reach the ground:
$$-240 = 10t - 5t^2 \\implies 5t^2 - 10t - 240 = 0 \\implies t^2 - 2t - 48 = 0 \\implies (t - 8)(t + 6) = 0 \\implies t_1 = 8\\text{ s}$$
2. For $t \\le 8\\text{ s}$, both stones are in the air:
$$y_2 - y_1 = (40t - 5t^2) - (10t - 5t^2) = 30t$$
This is a straight line through the origin up to $t = 8\\text{ s}$, where $(y_2 - y_1) = 30 \\times 8 = 240\\text{ m}$.
3. For $t > 8\\text{ s}$, the first stone rests on the ground at $y_1 = -240\\text{ m}$:
$$y_2 - y_1 = (40t - 5t^2) - (-240) = 240 + 40t - 5t^2$$
This is a downward-opening parabola starting from $240\\text{ m}$ at $t = 8\\text{ s}$ and reaching $0$ when the second stone lands at $t = 12\\text{ s}$ ($5(12)^2 - 40(12) - 240 = 720 - 480 - 240 = 0$).
This matches Graph (D).

Hence, the correct option is (D).`
  },
  {
    qNum: 30,
    exam: "JEE Main 2015",
    question: "From the top of a $64\\text{ m}$ high tower, a stone is thrown upwards vertically with the velocity of $48\\text{ ms}^{-1}$. The greatest height (in metres) attained by the stone above the ground, assuming $g = 32\\text{ ms}^{-2}$, is:",
    options: ["$112\\text{ m}$", "$88\\text{ m}$", "$108\\text{ m}$", "$100\\text{ m}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Maximum height reached above the tower:
$$h = \\frac{u^2}{2g} = \\frac{48^2}{2 \\times 32} = \\frac{2304}{64} = 36\\text{ m}$$
Total greatest height attained above the ground:
$$H = 64\\text{ m} + 36\\text{ m} = 100\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 31,
    exam: "JEE Main 2017",
    question: "A body is thrown vertically upwards. Which one of the following graphs correctly represents the velocity ($v$) vs time ($t$)?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: diagramUrls[31] || null,
    solution: `For vertical upward projection:
$$v(t) = u - g t$$
This is a straight line equation $y = mx + c$ with intercept $c = u$ and constant negative slope $m = -g$.
Velocity starts positive, decreases linearly through zero at peak height, and becomes increasingly negative as the body falls back.
This corresponds to Graph (D).

Hence, the correct option is (D).`
  },
  {
    qNum: 32,
    exam: "JEE Main 2017",
    question: "Which graph corresponds to an object moving with a constant negative acceleration and a positive velocity?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[32] || null,
    solution: `For constant negative acceleration $a = -C$:
$$v(t) = v_0 - C t$$
Since velocity is positive ($v > 0$), slope of distance-time graph $\\frac{dx}{dt} = v > 0$ (curve goes up), while acceleration is negative $\\frac{d^2x}{dt^2} = a < 0$ (curve is concave downward).
In the velocity-displacement ($v$-$x$) domain:
$$v \\frac{dv}{dx} = -C \\implies v^2 = v_0^2 - 2Cx$$
Graph (C) accurately depicts this curve.

Hence, the correct option is (C).`
  },
  {
    qNum: 33,
    exam: "JEE Main 2017",
    question: "A car is standing $200\\text{ m}$ behind a bus, which is also at rest. The two start moving at the same instant but with different forward accelerations. The bus has acceleration $2\\text{ ms}^{-2}$ and the car has acceleration $4\\text{ ms}^{-2}$. The car will catch up with the bus after time:",
    options: ["$110\\text{ s}$", "$15\\text{ s}$", "$10\\text{ s}$", "$10\\sqrt{2}\\text{ s}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Relative acceleration of car with respect to bus:
$$a_{\\text{rel}} = a_{\\text{car}} - a_{\\text{bus}} = 4 - 2 = 2\\text{ ms}^{-2}$$
Relative initial velocity: $u_{\\text{rel}} = 0$.
Relative initial distance: $s_{\\text{rel}} = 200\\text{ m}$.
$$s_{\\text{rel}} = \\frac{1}{2} a_{\\text{rel}} t^2 \\implies 200 = \\frac{1}{2}(2) t^2 \\implies t^2 = 200 \\implies t = 10\\sqrt{2}\\text{ s}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 34,
    exam: "JEE Main 2017",
    question: "All the graphs below are intended to represent the same motion. One of them does it incorrectly. Pick it up.",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[34] || null,
    solution: `In Graphs (A), (B), and (D), the initial velocity at $t = 0$ is non-zero ($v_0 > 0$).
In Graph (C), the distance-time graph has a horizontal tangent at $t = 0$, implying initial speed is zero ($v_0 = 0$), which contradicts the non-zero initial speed in all other representations.
Thus, Graph (C) incorrectly represents the motion.

Hence, the correct option is (C).`
  },
  {
    qNum: 35,
    exam: "JEE Main 2018",
    question: "An automobile, traveling at $40\\text{ km/h}$, can be stopped at a distance of $40\\text{ m}$ by applying brakes. If the same automobile is traveling at $80\\text{ km/h}$, the minimum stopping distance in metres is (assume no skidding):",
    options: ["$150\\text{ m}$", "$100\\text{ m}$", "$75\\text{ m}$", "$160\\text{ m}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Stopping distance $s = \\frac{u^2}{2a}$.
Ratio of stopping distances:
$$\\frac{s_2}{s_1} = \\left(\\frac{u_2}{u_1}\\right)^2 = \\left(\\frac{80}{40}\\right)^2 = 4$$
$$s_2 = 4 \\times 40\\text{ m} = 160\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 36,
    exam: "JEE Main 2018",
    question: "The velocity-time graphs of a car and a scooter are shown in the figure. (i) The difference between the distance travelled by the car and the scooter in $15\\text{ s}$ and (ii) the time at which the car will catch up with the scooter are, respectively:",
    options: [
      "$112.5\\text{ m and } 22.5\\text{ s}$",
      "$337.5\\text{ m and } 25\\text{ s}$",
      "$225.5\\text{ m and } 10\\text{ s}$",
      "$112.5\\text{ m and } 15\\text{ s}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[36] || null,
    solution: `1. Distance travelled in $15\\text{ s}$:
- Car (accelerating from $0$ to $45\\text{ ms}^{-1}$ in $15\\text{ s}$):
$$s_{\\text{car}} = \\frac{1}{2} \\times 45 \\times 15 = 337.5\\text{ m}$$
- Scooter (moving at constant speed $30\\text{ ms}^{-1}$):
$$s_{\\text{scooter}} = 30 \\times 15 = 450\\text{ m}$$
Difference in distance:
$$\\Delta s = 450 - 337.5 = 112.5\\text{ m}$$

2. Let $t$ be the time when the car catches up with the scooter ($t > 15\\text{ s}$):
$$s_{\\text{car}}(t) = 337.5 + 45(t - 15)$$
$$s_{\\text{scooter}}(t) = 30t$$
Equating displacements:
$$337.5 + 45t - 675 = 30t \\implies 15t = 337.5 \\implies t = 22.5\\text{ s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 37,
    exam: "JEE Main 2018",
    question: "An automobile, travelling at $40\\text{ km/h}$, can be stopped at a distance of $40\\text{ m}$ by applying brakes. If the same automobile is travelling at $80\\text{ km/h}$, the minimum stopping distance, in metres, is (assume no skidding):",
    options: ["$75\\text{ m}$", "$160\\text{ m}$", "$100\\text{ m}$", "$150\\text{ m}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Using $v^2 = u^2 - 2as$:
$$s = \\frac{u^2}{2a} \\implies s \\propto u^2$$
$$s_2 = s_1 \\left(\\frac{u_2}{u_1}\\right)^2 = 40 \\times \\left(\\frac{80}{40}\\right)^2 = 40 \\times 4 = 160\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 38,
    exam: "JEE Main 2018",
    question: "The velocity-time graphs of a car and a scooter are shown in the figure. (i) The difference between the distance travelled by the car and the scooter in $15\\text{ s}$ and (ii) the time at which the car will catch up with the scooter are, respectively:",
    options: [
      "$337.5\\text{ m and } 25\\text{ s}$",
      "$225.5\\text{ m and } 10\\text{ s}$",
      "$112.5\\text{ m and } 22.5\\text{ s}$",
      "$112.5\\text{ m and } 15\\text{ s}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[38] || null,
    solution: `1. In the first $15\\text{ s}$:
Distance travelled by car $= \\frac{1}{2} \\times 45 \\times 15 = 337.5\\text{ m}$
Distance travelled by scooter $= 30 \\times 15 = 450\\text{ m}$
Difference $= 450 - 337.5 = 112.5\\text{ m}$

2. Time $t$ to catch up:
$$337.5 + 45(t - 15) = 30t \\implies 15t = 337.5 \\implies t = 22.5\\text{ s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 39,
    exam: "JEE Main 2019",
    question: "A particle starts from the origin at time $t = 0$ and moves along the positive $x$-axis. The graph of velocity with respect to time is shown in the figure. What is the position of the particle at time $t = 5\\text{ s}$?",
    options: ["$10\\text{ m}$", "$9\\text{ m}$", "$6\\text{ m}$", "$3\\text{ m}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[39] || null,
    solution: `Position at $t = 5\\text{ s}$ equals the area under the velocity-time graph from $t = 0$ to $t = 5\\text{ s}$:
- Area from $t = 0$ to $2\\text{ s}$ (triangle): $\\frac{1}{2} \\times 2 \\times 2 = 2\\text{ m}$
- Area from $t = 2$ to $4\\text{ s}$ (rectangle): $2 \\times 2 = 4\\text{ m}$
- Area from $t = 4$ to $5\\text{ s}$ (trapezoid with heights $2$ and $4$): $\\frac{2 + 4}{2} \\times 1 = 3\\text{ m}$
Total displacement $= 2 + 4 + 3 = 9\\text{ m}$.

Hence, the correct option is (B).`
  },
  {
    qNum: 40,
    exam: "JEE Main 2019",
    question: "A particle starts from origin O from rest and moves with a uniform acceleration along the positive $x$-axis. Identify all figures that correctly represent the motion qualitatively ($a = \\text{acceleration}$, $v = \\text{velocity}$, $x = \\text{displacement}$, $t = \\text{time}$):",
    options: ["(A), (B), (C)", "(A)", "(B), (C)", "(A), (C), (D)"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls[40] || null,
    solution: `For uniform acceleration from rest ($u = 0$, $a = \\text{const}$):
1. $a$-$t$ graph is a horizontal straight line parallel to the time axis.
2. $v = at$, so $v$-$t$ graph is a straight line through the origin with positive slope.
3. $x = \\frac{1}{2}at^2$, so $x$-$t$ graph is a parabola opening upward through the origin.
4. $v^2 = 2ax$, so $v$-$x$ graph is a parabola opening along the displacement axis, not a straight line.
Thus, figures (A), (B), and (C) correctly represent the motion qualitatively.

Hence, the correct option is (A).`
  }
];

fs.writeFileSync(
  path.resolve(__dirname, 'clean_motion1d_part1.mjs'),
  `// Motion in One Dimension - JEE Physics PYQ - Clean Part 1 (Q1 to Q40)\nexport const MOTION1D_PART1 = ${JSON.stringify(CLEAN_PART1, null, 2)};\n`
);
console.log('Clean Part 1 written successfully! Total questions:', CLEAN_PART1.length);
