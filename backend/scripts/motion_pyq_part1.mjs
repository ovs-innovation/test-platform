import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'motion_diagram_urls.json'), 'utf8'));

export const MOTION_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: 'Consider a particle moving along a straight line, whose position as a function of time is given by $s(t) = \\alpha t^2 - \\beta t + \\gamma$, where $\\alpha = 1\\text{ ms}^{-2}$, $\\beta = 6\\text{ ms}^{-1}$ and $\\gamma = 5\\text{ m}$. The average speed of the particle, in $\\text{ms}^{-1}$ from $t = 0$ to $t = 6\\text{ s}$ is:',
    options: ['$0$', '$12$', '$6$', '$3$'],
    correct_option: 3,
    solution: `Given position function:
$$s(t) = \\alpha t^2 - \\beta t + \\gamma = t^2 - 6t + 5$$

Velocity of the particle:
$$v(t) = \\frac{ds}{dt} = 2t - 6$$

The particle reverses its direction of motion when $v(t) = 0$:
$$2t - 6 = 0 \\implies t = 3\\text{ s}$$

Now calculating the position of the particle at key times:
- At $t = 0\\text{ s}$: $s(0) = 0^2 - 6(0) + 5 = 5\\text{ m}$
- At $t = 3\\text{ s}$: $s(3) = 3^2 - 6(3) + 5 = 9 - 18 + 5 = -4\\text{ m}$
- At $t = 6\\text{ s}$: $s(6) = 6^2 - 6(6) + 5 = 36 - 36 + 5 = 5\\text{ m}$

Distance covered in interval $t = 0$ to $t = 3\\text{ s}$:
$$d_1 = |s(3) - s(0)| = |-4 - 5| = 9\\text{ m}$$

Distance covered in interval $t = 3$ to $t = 6\\text{ s}$:
$$d_2 = |s(6) - s(3)| = |5 - (-4)| = 9\\text{ m}$$

Total distance travelled in $6\\text{ s}$:
$$D_{\\text{total}} = d_1 + d_2 = 9 + 9 = 18\\text{ m}$$

Average speed:
$$\\text{Average speed} = \\frac{\\text{Total distance}}{\\text{Total time}} = \\frac{18\\text{ m}}{6\\text{ s}} = 3\\text{ ms}^{-1}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 2,
    exam: 'NEET 2026',
    question: 'The following plots show variation of velocity ($v$) with time ($t$) of a ball thrown vertically upward, and falling back. Which of the following plots is/are correct?',
    image_url: diagramUrls['2'],
    options: ['C only', 'D only', 'B only', 'A and E only'],
    correct_option: 0,
    solution: `For a ball thrown vertically upward with initial velocity $+u$:
Taking vertically upward as positive direction, the acceleration is:
$$a = -g = \\text{constant}$$

The velocity at any time $t$ is:
$$v(t) = u - gt$$

1. This represents a straight line with initial velocity $+u > 0$ and a constant negative slope ($-g$).
2. At maximum height, $v = 0$.
3. When the ball falls back, velocity becomes negative and increases linearly in the downward direction ($v < 0$).
4. The graph does not have any sudden discontinuity or change in sign of slope because acceleration due to gravity is uniform throughout.

Plot C correctly portrays a straight line starting from positive velocity and descending with constant negative slope through zero to negative velocity.

Hence, the correct option is (A).`
  },
  {
    qNum: 3,
    exam: 'NEET 2026',
    question: 'When a ruler falls vertically, 5 different persons catch it with different reaction times ($g = 9.8\\text{ m s}^{-2}$):\nA. Person A has reaction time of $0.20\\text{ s}$.\nB. Person B has reaction time of $0.22\\text{ s}$.\nC. Person C has reaction time of $0.18\\text{ s}$.\nD. Person D has reaction time of $0.19\\text{ s}$.\nE. Person E has reaction time of $0.21\\text{ s}$.\nWhat is the correct order of the distance travelled by the ruler for each person?',
    options: [
      '$\\text{B} > \\text{E} > \\text{A} > \\text{C} > \\text{D}$',
      '$\\text{C} > \\text{D} > \\text{A} > \\text{B} > \\text{E}$',
      '$\\text{B} > \\text{E} > \\text{A} > \\text{D} > \\text{C}$',
      '$\\text{C} > \\text{D} > \\text{A} > \\text{E} > \\text{B}$'
    ],
    correct_option: 2,
    solution: `The ruler falls freely under gravity from rest ($u = 0$).
The distance $d$ fallen during reaction time $t$ is given by:
$$d = \\frac{1}{2}gt^2$$

Since $g$ is constant, distance is directly proportional to the square of reaction time:
$$d \\propto t^2$$

Greater reaction time implies a greater distance fallen by the ruler.
Comparing reaction times:
$$t_B (0.22\\text{ s}) > t_E (0.21\\text{ s}) > t_A (0.20\\text{ s}) > t_D (0.19\\text{ s}) > t_C (0.18\\text{ s})$$

Therefore, the order of distance travelled is:
$$\\text{B} > \\text{E} > \\text{A} > \\text{D} > \\text{C}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 4,
    exam: 'NEET 2025',
    question: 'In some appropriate units, time ($t$) and position ($x$) relation of a moving particle is given by $t = x^2 + x$. The acceleration of the particle is:',
    options: [
      '$+\\frac{2}{(x+1)^3}$',
      '$+\\frac{2}{2x+1}$',
      '$-\\frac{2}{(x+2)^3}$',
      '$-\\frac{2}{(2x+1)^3}$'
    ],
    correct_option: 3,
    solution: `Given relation between time and position:
$$t = x^2 + x$$

Differentiating both sides with respect to position $x$:
$$\\frac{dt}{dx} = 2x + 1$$

Velocity $v$ is the reciprocal of $\\frac{dt}{dx}$:
$$v = \\frac{dx}{dt} = \\frac{1}{2x + 1} = (2x + 1)^{-1}$$

Acceleration $a$ can be written as:
$$a = v \\frac{dv}{dx}$$

Differentiating $v$ with respect to $x$:
$$\\frac{dv}{dx} = \\frac{d}{dx}(2x + 1)^{-1} = -1(2x + 1)^{-2} \\cdot 2 = -\\frac{2}{(2x + 1)^2}$$

Now multiplying by $v$:
$$a = (2x + 1)^{-1} \\left[ -\\frac{2}{(2x + 1)^2} \\right] = -\\frac{2}{(2x + 1)^3}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 5,
    exam: 'NEET 2025',
    question: 'Two cities $X$ and $Y$ are connected by a regular bus service with a bus leaving in either direction every $T\\text{ min}$. A girl driving scooty with a speed of $60\\text{ km/h}$ in the direction $X$ to $Y$ notices that a bus goes past her every $30\\text{ minutes}$ in the direction of her motion, and every $10\\text{ minutes}$ in the opposite direction. Choose the correct option for the period $T$ of the bus service and the speed (assumed constant) of the buses.',
    options: [
      '$10\\text{ min},\\; 90\\text{ km/h}$',
      '$15\\text{ min},\\; 120\\text{ km/h}$',
      '$9\\text{ min},\\; 40\\text{ km/h}$',
      '$25\\text{ min},\\; 100\\text{ km/h}$'
    ],
    correct_option: 1,
    solution: `Let the constant speed of the buses be $v\\text{ km/h}$ and the interval of service be $T\\text{ minutes} = \\frac{T}{60}\\text{ hours}$.

Distance between consecutive buses moving in either direction:
$$d = v \\times \\frac{T}{60}$$

1. In the direction of motion of the scooty ($X$ to $Y$):
Relative speed of bus with respect to scooty $= v - 60\\text{ km/h}$.
Time interval $= 30\\text{ min} = \\frac{30}{60}\\text{ h}$.
$$(v - 60) \\times \\frac{30}{60} = v \\times \\frac{T}{60} \\implies 30(v - 60) = vT \\quad \\text{--- (1)}$$

2. In the opposite direction ($Y$ to $X$):
Relative speed $= v + 60\\text{ km/h}$.
Time interval $= 10\\text{ min} = \\frac{10}{60}\\text{ h}$.
$$(v + 60) \\times \\frac{10}{60} = v \\times \\frac{T}{60} \\implies 10(v + 60) = vT \\quad \\text{--- (2)}$$

Equating equations (1) and (2):
$$30(v - 60) = 10(v + 60)$$
$$3(v - 60) = v + 60$$
$$3v - 180 = v + 60 \\implies 2v = 240 \\implies v = 120\\text{ km/h}$$

Substituting $v = 120\\text{ km/h}$ into equation (2):
$$10(120 + 60) = 120 T \\implies 10 \\times 180 = 120 T \\implies T = \\frac{1800}{120} = 15\\text{ min}$$

Hence, $T = 15\\text{ min}$ and $v = 120\\text{ km/h}$.
Correct option is (B).`
  },
  {
    qNum: 6,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'A particle is moving along $x$-axis with its position ($x$) varying with time ($t$) as $x = \\alpha t^4 + \\beta t^2 + \\gamma t + \\delta$. The ratio of its initial velocity to its initial acceleration, respectively, is:',
    options: ['$2\\alpha : \\delta$', '$\\gamma : 2\\delta$', '$4\\alpha : \\beta$', '$\\gamma : 2\\beta$'],
    correct_option: 3,
    solution: `Given equation of position:
$$x(t) = \\alpha t^4 + \\beta t^2 + \\gamma t + \\delta$$

Velocity is the first time derivative of position:
$$v(t) = \\frac{dx}{dt} = 4\\alpha t^3 + 2\\beta t + \\gamma$$

Initial velocity ($t = 0$):
$$v(0) = \\gamma$$

Acceleration is the second time derivative of position:
$$a(t) = \\frac{dv}{dt} = 12\\alpha t^2 + 2\\beta$$

Initial acceleration ($t = 0$):
$$a(0) = 2\\beta$$

Ratio of initial velocity to initial acceleration:
$$\\frac{v(0)}{a(0)} = \\frac{\\gamma}{2\\beta} \\implies \\gamma : 2\\beta$$

Hence, the correct option is (D).`
  },
  {
    qNum: 7,
    exam: 'NEET 2024',
    question: 'The velocity ($v$) – time ($t$) plot of the motion of a body is shown below:\n\nThe acceleration ($a$) – time ($t$) graph that best suits this motion is:',
    image_url: diagramUrls['7'],
    options: ['(A)', '(B)', '(C)', '(D)'],
    correct_option: 2,
    solution: `Acceleration is given by the derivative of velocity with respect to time, which corresponds to the slope of the $v-t$ curve:
$$a = \\frac{dv}{dt}$$

From the given $v-t$ graph:
1. In the first phase, velocity increases linearly with time:
   $$\\text{Slope} = \\text{positive constant} \\implies a = +a_0$$
2. In the second phase, velocity remains constant at peak value:
   $$\\text{Slope} = 0 \\implies a = 0$$
3. In the third phase, velocity decreases linearly to zero:
   $$\\text{Slope} = \\text{negative constant} \\implies a = -a_0$$

Graph (C) correctly depicts positive constant acceleration, then zero acceleration, and then negative constant acceleration.

Hence, the correct option is (C).`
  },
  {
    qNum: 8,
    exam: 'NEET 2023',
    question: 'A vehicle travels half the distance with speed $v$ and the remaining distance with speed $2v$. Its average speed is:',
    options: ['$\\frac{2v}{3}$', '$\\frac{4v}{3}$', '$\\frac{3v}{4}$', '$\\frac{v}{3}$'],
    correct_option: 1,
    solution: `Let the total distance be $2s$.
- Time taken to cover first half distance ($s$) at speed $v$:
  $$t_1 = \\frac{s}{v}$$
- Time taken to cover second half distance ($s$) at speed $2v$:
  $$t_2 = \\frac{s}{2v}$$

Total time taken:
$$t_{\\text{total}} = t_1 + t_2 = \\frac{s}{v} + \\frac{s}{2v} = \\frac{3s}{2v}$$

Average speed:
$$v_{\\text{avg}} = \\frac{\\text{Total distance}}{\\text{Total time}} = \\frac{2s}{\\frac{3s}{2v}} = \\frac{4v}{3}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 9,
    exam: 'NEET 2023',
    question: 'A horizontal bridge is built across a river. A student standing on the bridge throws a small ball vertically upwards with a velocity $4\\text{ m s}^{-1}$. The ball strikes the water surface after $4\\text{ s}$. The height of bridge above water surface is (Take $g = 10\\text{ m s}^{-2}$):',
    options: ['$60\\text{ m}$', '$64\\text{ m}$', '$68\\text{ m}$', '$56\\text{ m}$'],
    correct_option: 1,
    solution: `Taking upward direction as positive and downward as negative:
- Initial velocity, $u = +4\\text{ m s}^{-1}$
- Time of flight, $t = 4\\text{ s}$
- Acceleration, $a = -g = -10\\text{ m s}^{-2}$

Displacement $s$ of the ball:
$$s = ut + \\frac{1}{2}at^2$$
$$s = (4)(4) + \\frac{1}{2}(-10)(4)^2 = 16 - 5(16) = 16 - 80 = -64\\text{ m}$$

The negative sign indicates displacement is downward below the bridge.
Therefore, the height of the bridge above the water surface is $64\\text{ m}$.

Hence, the correct option is (B).`
  },
  {
    qNum: 10,
    exam: 'NEET 2023',
    question: 'A bullet from a gun is fired on a rectangular wooden block with velocity $u$. When bullet travels $24\\text{ cm}$ through the block along its length horizontally, velocity of bullet becomes $\\frac{u}{3}$. Then it further penetrates into the block in the same direction before coming to rest exactly at the other end of the block. The total length of the block is:',
    options: ['$24\\text{ cm}$', '$28\\text{ cm}$', '$30\\text{ cm}$', '$27\\text{ cm}$'],
    correct_option: 3,
    solution: `Using third equation of motion:
$$v^2 = u^2 - 2as$$

For the first $24\\text{ cm}$:
$$\\left(\\frac{u}{3}\\right)^2 = u^2 - 2a(24)$$
$$\\frac{u^2}{9} = u^2 - 48a \\implies 48a = u^2 - \\frac{u^2}{9} = \\frac{8u^2}{9}$$
$$2a = \\frac{8u^2}{9 \\times 24} = \\frac{u^2}{27}$$

For the entire journey across the block of total length $L$, the final velocity is $0$:
$$0^2 = u^2 - 2a(L)$$
$$L = \\frac{u^2}{2a} = \\frac{u^2}{\\frac{u^2}{27}} = 27\\text{ cm}$$

Hence, the total length of the wooden block is $27\\text{ cm}$.
Correct option is (D).`
  },
  {
    qNum: 11,
    exam: 'NEET 2022 Phase 2',
    question: 'The position-time ($x - t$) graph for positive acceleration is:',
    image_url: diagramUrls['11'],
    options: ['(A)', '(B)', '(C)', '(D)'],
    correct_option: 1,
    solution: `Velocity is the first derivative of position:
$$v = \\frac{dx}{dt} = \\text{slope of } x-t \\text{ graph}$$

Acceleration is the derivative of velocity:
$$a = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}$$

- When acceleration is positive ($a > 0$), the slope $\\frac{dx}{dt}$ must increase with time, meaning the graph must be concave upwards (curving upwards).
- In Graph (A), the slope is negative and constant (zero acceleration).
- In Graph (B), the slope is initially small and becomes steeper upwards with time, curving concave up ($a > 0$).
- In Graph (C), the slope decreases with time, curving concave down ($a < 0$, retardation).
- In Graph (D), the slope is positive and constant (zero acceleration).

Thus, Graph (B) represents positive acceleration.

Hence, the correct option is (B).`
  },
  {
    qNum: 12,
    exam: 'NEET 2022 Phase 1',
    question: 'The ratio of the distances travelled by a freely falling body in the $1^{\\text{st}}$, $2^{\\text{nd}}$, $3^{\\text{rd}}$ and $4^{\\text{th}}$ second is:',
    options: ['$1 : 2 : 3 : 4$', '$1 : 4 : 9 : 16$', '$1 : 3 : 5 : 7$', '$1 : 1 : 1 : 1$'],
    correct_option: 2,
    solution: `Distance travelled by a body in the $n^{\\text{th}}$ second is given by:
$$S_n = u + \\frac{1}{2}g(2n - 1)$$

For a freely falling body dropped from rest, initial velocity $u = 0$:
$$S_n = \\frac{1}{2}g(2n - 1)$$

Since $\\frac{1}{2}g$ is constant:
$$S_n \\propto (2n - 1)$$

For $n = 1, 2, 3, 4$:
- $S_1 \\propto 2(1) - 1 = 1$
- $S_2 \\propto 2(2) - 1 = 3$
- $S_3 \\propto 2(3) - 1 = 5$
- $S_4 \\propto 2(4) - 1 = 7$

Therefore:
$$S_1 : S_2 : S_3 : S_4 = 1 : 3 : 5 : 7$$

Hence, the correct option is (C).`
  },
  {
    qNum: 13,
    exam: 'NEET 2022 Phase 1',
    question: 'The displacement-time graphs of two moving particles make angles of $30^\\circ$ and $45^\\circ$ with the x-axis as shown in the figure. The ratio of their respective velocity is:',
    image_url: diagramUrls['13'],
    options: ['$\\sqrt{3} : 1$', '$1 : 1$', '$1 : 2$', '$1 : \\sqrt{3}$'],
    correct_option: 3,
    solution: `The slope of a displacement-time graph gives the velocity of the particle:
$$v = \\tan\\theta$$

Given:
- For particle 1: $\\theta_1 = 30^\\circ \\implies v_1 = \\tan 30^\\circ = \\frac{1}{\\sqrt{3}}$
- For particle 2: $\\theta_2 = 45^\\circ \\implies v_2 = \\tan 45^\\circ = 1$

Ratio of their velocities:
$$\\frac{v_1}{v_2} = \\frac{\\tan 30^\\circ}{\\tan 45^\\circ} = \\frac{1/\\sqrt{3}}{1} = \\frac{1}{\\sqrt{3}} \\implies 1 : \\sqrt{3}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 14,
    exam: 'NEET 2021',
    question: 'A small block slides down on a smooth inclined plane, starting from rest at time $t = 0$. Let $S_n$ be the distance travelled by the block in the interval $t = n - 1$ to $t = n$. Then the ratio $\\frac{S_n}{S_{n+1}}$ is:',
    options: ['$\\frac{2n}{2n-1}$', '$\\frac{2n-1}{2n}$', '$\\frac{2n-1}{2n+1}$', '$\\frac{2n+1}{2n-1}$'],
    correct_option: 2,
    solution: `Acceleration down a smooth inclined plane is constant: $a = g\\sin\\theta$.
Initial velocity $u = 0$.

Distance travelled in the $n^{\\text{th}}$ second ($t = n - 1$ to $t = n$):
$$S_n = u + \\frac{a}{2}(2n - 1) = \\frac{a}{2}(2n - 1)$$

Distance travelled in the $(n+1)^{\\text{th}}$ second ($t = n$ to $t = n + 1$):
$$S_{n+1} = \\frac{a}{2}[2(n+1) - 1] = \\frac{a}{2}(2n + 1)$$

The ratio:
$$\\frac{S_n}{S_{n+1}} = \\frac{\\frac{a}{2}(2n - 1)}{\\frac{a}{2}(2n + 1)} = \\frac{2n - 1}{2n + 1}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 15,
    exam: 'NEET 2020 Phase 2',
    question: 'A person sitting in the ground floor of a building notices through the window, of height $1.5\\text{ m}$, a ball dropped from the roof of the building crosses the window in $0.1\\text{ s}$. What is the velocity of the ball when it is at the topmost point of the window? ($g = 10\\text{ m/s}^2$)',
    options: ['$20\\text{ m/s}$', '$15.5\\text{ m/s}$', '$14.5\\text{ m/s}$', '$4.5\\text{ m/s}$'],
    correct_option: 2,
    solution: `Let $u$ be the velocity of the ball at the top edge of the window.
Height of window $h = 1.5\\text{ m}$.
Time taken to cross the window $t = 0.1\\text{ s}$.
Acceleration due to gravity $g = 10\\text{ m/s}^2$.

Using equation of motion:
$$h = ut + \\frac{1}{2}gt^2$$
$$1.5 = u(0.1) + \\frac{1}{2}(10)(0.1)^2$$
$$1.5 = 0.1u + 5(0.01) = 0.1u + 0.05$$
$$0.1u = 1.5 - 0.05 = 1.45$$
$$u = \\frac{1.45}{0.1} = 14.5\\text{ m/s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 16,
    exam: 'NEET 2020 Phase 1',
    question: 'A ball is thrown vertically downward with a velocity of $20\\text{ m/s}$ from the top of a tower. It hits the ground after some time with a velocity of $80\\text{ m/s}$. The height of the tower is: ($g = 10\\text{ m/s}^2$)',
    options: ['$340\\text{ m}$', '$320\\text{ m}$', '$300\\text{ m}$', '$360\\text{ m}$'],
    correct_option: 2,
    solution: `Initial downward velocity, $u = 20\\text{ m/s}$.
Final velocity on hitting ground, $v = 80\\text{ m/s}$.
Acceleration, $a = g = 10\\text{ m/s}^2$.

Using the third equation of motion:
$$v^2 = u^2 + 2gh$$
$$80^2 = 20^2 + 2(10)h$$
$$6400 = 400 + 20h$$
$$20h = 6000 \\implies h = \\frac{6000}{20} = 300\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 17,
    exam: 'NEET 2019 (Odisha)',
    question: 'A person travelling in a straight line moves with a constant velocity $v_1$ for certain distance \'$x$\' and with a constant velocity $v_2$ for next equal distance. The average velocity $v$ is given by the relation:',
    options: [
      '$v = \\sqrt{v_1 v_2}$',
      '$\\frac{1}{v} = \\frac{1}{v_1} + \\frac{1}{v_2}$',
      '$\\frac{2}{v} = \\frac{1}{v_1} + \\frac{1}{v_2}$',
      '$\\frac{v}{2} = \\frac{v_1 + v_2}{2}$'
    ],
    correct_option: 2,
    solution: `Total distance travelled:
$$D_{\\text{total}} = x + x = 2x$$

Time taken for first distance $x$:
$$t_1 = \\frac{x}{v_1}$$

Time taken for second distance $x$:
$$t_2 = \\frac{x}{v_2}$$

Total time taken:
$$t_{\\text{total}} = t_1 + t_2 = \\frac{x}{v_1} + \\frac{x}{v_2} = x \\left( \\frac{1}{v_1} + \\frac{1}{v_2} \\right)$$

Average velocity $v$:
$$v = \\frac{D_{\\text{total}}}{t_{\\text{total}}} = \\frac{2x}{x \\left( \\frac{1}{v_1} + \\frac{1}{v_2} \\right)} = \\frac{2}{\\frac{1}{v_1} + \\frac{1}{v_2}}$$

Rearranging:
$$\\frac{2}{v} = \\frac{1}{v_1} + \\frac{1}{v_2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 18,
    exam: 'NEET 2019 (Odisha)',
    question: 'A person standing on the floor of an elevator drops a coin. The coin reaches the floor in time $t_1$ if the elevator is at rest and in time $t_2$ if the elevator is moving uniformly. Then:',
    options: [
      '$t_1 = t_2$',
      '$t_1 < t_2\\text{ or }t_1 > t_2\\text{ depending upon whether the lift is going up or down}$',
      '$t_1 < t_2$',
      '$t_1 > t_2$'
    ],
    correct_option: 0,
    solution: `When the elevator is moving uniformly (with constant velocity), its acceleration is zero:
$$a_{\\text{elevator}} = 0$$

The relative acceleration of the coin with respect to the elevator is:
$$a_{\\text{rel}} = a_{\\text{coin}} - a_{\\text{elevator}} = g - 0 = g$$

In both cases (at rest or moving uniformly):
1. Initial relative velocity is zero ($u_{\\text{rel}} = 0$).
2. Relative acceleration is $g$.
3. Distance to the floor $h$ remains identical.

Therefore, time taken is:
$$t = \\sqrt{\\frac{2h}{g}}$$

Hence, $t_1 = t_2$.
Correct option is (A).`
  },
  {
    qNum: 19,
    exam: 'NEET 2018',
    question: 'A toy car with charge $q$ moves on a frictionless horizontal plane surface under the influence of a uniform electric field $\\vec{E}$. Due to the force $q\\vec{E}$, its velocity increases from $0$ to $6\\text{ m s}^{-1}$ in one second duration. At that instant the direction of the field is reversed. The car continues to move for two more seconds under the influence of this field. The average velocity and the average speed of the toy car between $0$ to $3$ seconds are respectively:',
    options: [
      '$2\\text{ m s}^{-1},\\; 4\\text{ m s}^{-1}$',
      '$1\\text{ m s}^{-1},\\; 3\\text{ m s}^{-1}$',
      '$1\\text{ m s}^{-1},\\; 3.5\\text{ m s}^{-1}$',
      '$1.5\\text{ m s}^{-1},\\; 3\\text{ m s}^{-1}$'
    ],
    correct_option: 1,
    solution: `Step 1: First interval ($t = 0$ to $t = 1\\text{ s}$):
$$a_1 = \\frac{v - u}{t} = \\frac{6 - 0}{1} = 6\\text{ m s}^{-2}$$
Displacement in first second:
$$s_1 = \\frac{1}{2} a_1 t^2 = \\frac{1}{2}(6)(1)^2 = 3\\text{ m}$$

Step 2: Field is reversed ($a_2 = -6\\text{ m s}^{-2}$) with initial velocity $u_2 = 6\\text{ m s}^{-1}$:
- From $t = 1$ to $t = 2\\text{ s}$ (duration $1\\text{ s}$):
  $$v_2 = 6 - 6(1) = 0\\text{ m s}^{-1}$$
  $$s_2 = 6(1) - \\frac{1}{2}(6)(1)^2 = 3\\text{ m}$$
- From $t = 2$ to $t = 3\\text{ s}$ (duration $1\\text{ s}$, starting from rest $u = 0$ backwards):
  $$v_3 = 0 - 6(1) = -6\\text{ m s}^{-1}$$
  $$s_3 = -\\frac{1}{2}(6)(1)^2 = -3\\text{ m}$$

Total displacement:
$$S_{\\text{total}} = s_1 + s_2 + s_3 = 3 + 3 - 3 = 3\\text{ m}$$

Average velocity:
$$v_{\\text{avg}} = \\frac{S_{\\text{total}}}{\\text{Total time}} = \\frac{3\\text{ m}}{3\\text{ s}} = 1\\text{ m s}^{-1}$$

Total distance:
$$D_{\\text{total}} = |s_1| + |s_2| + |s_3| = 3 + 3 + 3 = 9\\text{ m}$$

Average speed:
$$\\text{Average speed} = \\frac{D_{\\text{total}}}{\\text{Total time}} = \\frac{9\\text{ m}}{3\\text{ s}} = 3\\text{ m s}^{-1}$$

Hence, average velocity is $1\\text{ m s}^{-1}$ and average speed is $3\\text{ m s}^{-1}$.
Correct option is (B).`
  },
  {
    qNum: 20,
    exam: 'NEET 2017',
    question: 'Preeti reached the metro station and found that the escalator was not working. She walked up the stationary escalator in time $t_1$. On another day, if she remains stationary on the moving escalator, then the escalator takes her up in time $t_2$. The time taken by her to walk up on the moving escalator will be:',
    options: [
      '$\\frac{t_1 t_2}{t_2 - t_1}$',
      '$\\frac{t_1 t_2}{t_2 + t_1}$',
      '$t_1 - t_2$',
      '$\\frac{t_1 + t_2}{2}$'
    ],
    correct_option: 1,
    solution: `Let the length of the escalator be $L$.
- Speed of Preeti walking on stationary escalator:
  $$v_1 = \\frac{L}{t_1}$$
- Speed of moving escalator:
  $$v_2 = \\frac{L}{t_2}$$

When she walks up on the moving escalator, both speeds add together:
$$v_{\\text{total}} = v_1 + v_2 = \\frac{L}{t_1} + \\frac{L}{t_2} = L \\left( \\frac{t_1 + t_2}{t_1 t_2} \\right)$$

Time taken $t$:
$$t = \\frac{L}{v_{\\text{total}}} = \\frac{L}{L \\left( \\frac{t_1 + t_2}{t_1 t_2} \\right)} = \\frac{t_1 t_2}{t_1 + t_2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 21,
    exam: 'NEET 2016 Phase 2',
    question: 'Two cars P and Q start from a point at the same time in a straight line and their positions are represented by $x_P(t) = (at + bt^2)$ and $x_Q(t) = (ft - t^2)$. At what time do the cars have the same velocity?',
    options: [
      '$\\frac{a-f}{1+b}$',
      '$\\frac{a+f}{2(b-1)}$',
      '$\\frac{a+f}{2(1+b)}$',
      '$\\frac{f-a}{2(1+b)}$'
    ],
    correct_option: 3,
    solution: `Given positions:
$$x_P(t) = at + bt^2$$
$$x_Q(t) = ft - t^2$$

Velocities of cars P and Q:
$$v_P = \\frac{dx_P}{dt} = a + 2bt$$
$$v_Q = \\frac{dx_Q}{dt} = f - 2t$$

Setting the velocities equal ($v_P = v_Q$):
$$a + 2bt = f - 2t$$
$$2bt + 2t = f - a$$
$$2t(1 + b) = f - a$$
$$t = \\frac{f - a}{2(1 + b)}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 22,
    exam: 'NEET 2016 Phase 1',
    question: 'If the velocity of a particle is $v = At + Bt^2$, where A and B are constants, then the distance travelled by it between $1\\text{ s}$ and $2\\text{ s}$ is:',
    options: [
      '$\\frac{3}{2}A + \\frac{7}{3}B$',
      '$\\frac{A}{2} + \\frac{B}{3}$',
      '$\\frac{3}{2}A + 4B$',
      '$3A + 7B$'
    ],
    correct_option: 0,
    solution: `Given velocity:
$$v = At + Bt^2 = \\frac{ds}{dt}$$

Distance travelled between $t = 1\\text{ s}$ and $t = 2\\text{ s}$:
$$s = \\int_1^2 v \\, dt = \\int_1^2 (At + Bt^2) \\, dt$$
$$s = \\left[ \\frac{At^2}{2} + \\frac{Bt^3}{3} \\right]_1^2$$
$$s = \\frac{A}{2}(2^2 - 1^2) + \\frac{B}{3}(2^3 - 1^3)$$
$$s = \\frac{A}{2}(4 - 1) + \\frac{B}{3}(8 - 1) = \\frac{3}{2}A + \\frac{7}{3}B$$

Hence, the correct option is (A).`
  },
  {
    qNum: 23,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'A particle of unit mass undergoes one-dimensional motion such that its velocity varies according to $v(x) = \\beta x^{-2n}$, where $\\beta$ and $n$ are constants and $x$ is the position of the particle. The acceleration of the particle as a function of $x$, is given by:',
    options: [
      '$-2\\beta^2 x^{-2n+1}$',
      '$-2n\\beta^2 e^{-4n+1}$',
      '$-2n\\beta^2 x^{-2n-1}$',
      '$-2n\\beta^2 x^{-4n-1}$'
    ],
    correct_option: 3,
    solution: `Given velocity as a function of position:
$$v(x) = \\beta x^{-2n}$$

Acceleration is given by:
$$a = v \\frac{dv}{dx}$$

Differentiating $v(x)$ with respect to $x$:
$$\\frac{dv}{dx} = \\frac{d}{dx}(\\beta x^{-2n}) = \\beta (-2n) x^{-2n - 1} = -2n\\beta x^{-2n - 1}$$

Now multiplying by $v$:
$$a = (\\beta x^{-2n})(-2n\\beta x^{-2n - 1})$$
$$a = -2n\\beta^2 x^{-2n - 2n - 1} = -2n\\beta^2 x^{-4n - 1}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 24,
    exam: 'NEET 2013 (Karnataka)',
    question: 'The displacement \'$x$\' (in meter) of a particle of mass \'$m$\' (in kg) moving in one dimension under the action of a force, is related to time \'$t$\' (in sec) by $t = \\sqrt{x} + 3$. The displacement of the particle when its velocity is zero, will be:',
    options: ['$4\\text{ m}$', '$0\\text{ m (zero)}$', '$6\\text{ m}$', '$2\\text{ m}$'],
    correct_option: 1,
    solution: `Given relation:
$$t = \\sqrt{x} + 3 \\implies \\sqrt{x} = t - 3$$
Squaring both sides:
$$x = (t - 3)^2$$

Velocity $v$:
$$v = \\frac{dx}{dt} = 2(t - 3)$$

When velocity is zero:
$$2(t - 3) = 0 \\implies t = 3\\text{ s}$$

Displacement at $t = 3\\text{ s}$:
$$x = (3 - 3)^2 = 0\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 25,
    exam: 'NEET 2013',
    question: 'A stone falls freely under gravity. It covers distances $h_1$, $h_2$ and $h_3$ in the first 5 seconds, the next 5 seconds and the next 5 seconds respectively. The relation between $h_1$, $h_2$ and $h_3$ is:',
    options: [
      '$h_2 = 3h_1\\text{ and }h_3 = 3h_2$',
      '$h_1 = h_2 = h_3$',
      '$h_1 = 2h_2 = 3h_3$',
      '$h_1 = \\frac{h_2}{3} = \\frac{h_3}{5}$'
    ],
    correct_option: 3,
    solution: `For a body dropped from rest ($u = 0$) under gravity:
- Distance in first $5\\text{ s}$:
  $$h_1 = \\frac{1}{2}g(5)^2 = \\frac{25}{2}g$$
- Total distance in first $10\\text{ s}$:
  $$s_{10} = \\frac{1}{2}g(10)^2 = \\frac{100}{2}g$$
  $$h_2 = s_{10} - h_1 = \\frac{100}{2}g - \\frac{25}{2}g = \\frac{75}{2}g = 3h_1$$
- Total distance in first $15\\text{ s}$:
  $$s_{15} = \\frac{1}{2}g(15)^2 = \\frac{225}{2}g$$
  $$h_3 = s_{15} - s_{10} = \\frac{225}{2}g - \\frac{100}{2}g = \\frac{125}{2}g = 5h_1$$

Therefore:
$$h_1 : h_2 : h_3 = 1 : 3 : 5 \\implies h_1 = \\frac{h_2}{3} = \\frac{h_3}{5}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 26,
    exam: 'AIPMT 2012 Prelims',
    question: 'The motion of a particle along a straight line is described by equation $x = 8 + 12t - t^3$ where $x$ is in metre and $t$ in second. The retardation of the particle when its velocity becomes zero is:',
    options: ['$24\\text{ m s}^{-2}$', '$\\text{zero}$', '$6\\text{ m s}^{-2}$', '$12\\text{ m s}^{-2}$'],
    correct_option: 3,
    solution: `Given position equation:
$$x = 8 + 12t - t^3$$

Velocity:
$$v = \\frac{dx}{dt} = 12 - 3t^2$$

Setting velocity to zero ($v = 0$):
$$12 - 3t^2 = 0 \\implies 3t^2 = 12 \\implies t^2 = 4 \\implies t = 2\\text{ s}$$

Acceleration:
$$a = \\frac{dv}{dt} = -6t$$

At $t = 2\\text{ s}$:
$$a = -6(2) = -12\\text{ m s}^{-2}$$

Retardation is the magnitude of deceleration:
$$\\text{Retardation} = -a = 12\\text{ m s}^{-2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 27,
    exam: 'AIPMT 2011 Mains',
    question: 'A particle covers half of its total distance with speed $v_1$ and the rest half distance with speed $v_2$. Its average speed during the complete journey is:',
    options: [
      '$\\frac{v_1+v_2}{2}$',
      '$\\frac{v_1 v_2}{v_1+v_2}$',
      '$\\frac{2v_1 v_2}{v_1+v_2}$',
      '$\\frac{v_1^2 v_2^2}{v_1^2+v_2^2}$'
    ],
    correct_option: 2,
    solution: `Let total distance be $2s$.
- Time for first half: $t_1 = \\frac{s}{v_1}$
- Time for second half: $t_2 = \\frac{s}{v_2}$

Total time:
$$T = t_1 + t_2 = \\frac{s}{v_1} + \\frac{s}{v_2} = s\\left(\\frac{v_1 + v_2}{v_1 v_2}\\right)$$

Average speed:
$$v_{\\text{avg}} = \\frac{2s}{T} = \\frac{2s}{s\\left(\\frac{v_1 + v_2}{v_1 v_2}\\right)} = \\frac{2v_1 v_2}{v_1 + v_2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 28,
    exam: 'AIPMT 2011 Prelims',
    question: 'A boy standing at the top of a tower of $20\\text{ m}$ height drops a stone. Assuming $g = 10\\text{ m s}^{-2}$, the velocity with which it hits the ground is:',
    options: ['$10.0\\text{ m/s}$', '$20.0\\text{ m/s}$', '$40.0\\text{ m/s}$', '$5.0\\text{ m/s}$'],
    correct_option: 1,
    solution: `Using third equation of motion:
$$v^2 = u^2 + 2gh$$

Given:
- Initial velocity, $u = 0$
- Height, $h = 20\\text{ m}$
- $g = 10\\text{ m s}^{-2}$

$$v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 20} = \\sqrt{400} = 20.0\\text{ m/s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 29,
    exam: 'AIPMT 2010 Prelims',
    question: 'A particle moves a distance $x$ in time $t$ according to equation $x = (t + 5)^{-1}$. The acceleration of particle is proportional to:',
    options: [
      '$(\\text{velocity})^{3/2}$',
      '$(\\text{distance})^2$',
      '$(\\text{distance})^{-2}$',
      '$(\\text{velocity})^{2/3}$'
    ],
    correct_option: 0,
    solution: `Given:
$$x = (t + 5)^{-1}$$

Velocity $v$:
$$v = \\frac{dx}{dt} = -(t + 5)^{-2} = -x^2$$
$$\\implies |v| \\propto x^2 \\implies x \\propto v^{1/2}$$

Acceleration $a$:
$$a = \\frac{dv}{dt} = 2(t + 5)^{-3} = 2x^3$$

Substituting $x \\propto v^{1/2}$:
$$a \\propto x^3 \\propto (v^{1/2})^3 = v^{3/2} = (\\text{velocity})^{3/2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 30,
    exam: 'AIPMT 2010 Prelims',
    question: 'A ball is dropped from a high rise platform at $t = 0$ starting from rest. After 6 seconds another ball is thrown downwards from the same platform with a speed $v$. The two balls meet at $t = 18\\text{ s}$. What is the value of $v$? (Take $g = 10\\text{ m/s}^2$)',
    options: ['$75\\text{ m/s}$', '$55\\text{ m/s}$', '$40\\text{ m/s}$', '$60\\text{ m/s}$'],
    correct_option: 0,
    solution: `For the first ball:
- Falls freely from rest ($u_1 = 0$) for $t_1 = 18\\text{ s}$.
$$h = \\frac{1}{2}g t_1^2 = \\frac{1}{2}(10)(18)^2 = 5 \\times 324 = 1620\\text{ m}$$

For the second ball:
- Thrown downwards after $6\\text{ s}$, so it travels for $t_2 = 18 - 6 = 12\\text{ s}$.
- Initial velocity is $v$.
$$h = v t_2 + \\frac{1}{2}g t_2^2 = v(12) + \\frac{1}{2}(10)(12)^2 = 12v + 5(144) = 12v + 720$$

Since both balls meet at the same point:
$$12v + 720 = 1620$$
$$12v = 1620 - 720 = 900$$
$$v = \\frac{900}{12} = 75\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 31,
    exam: 'AIPMT 2009',
    question: 'A particle starts its motion from rest under the action of a constant force. If the distance covered in first 10 seconds is $S_1$ and that covered in the first 20 seconds is $S_2$, then:',
    options: ['$S_2 = 3S_1$', '$S_2 = 4S_1$', '$S_2 = S_1$', '$S_2 = 2S_1$'],
    correct_option: 1,
    solution: `A constant force implies constant acceleration ($a = \\text{constant}$).
Starting from rest ($u = 0$):
$$S = \\frac{1}{2}at^2 \\implies S \\propto t^2$$

For the two time intervals:
$$\\frac{S_2}{S_1} = \\left(\\frac{t_2}{t_1}\\right)^2 = \\left(\\frac{20}{10}\\right)^2 = 2^2 = 4$$
$$S_2 = 4S_1$$

Hence, the correct option is (B).`
  },
  {
    qNum: 32,
    exam: 'AIPMT 2009',
    question: 'A bus is moving with a speed of $10\\text{ ms}^{-1}$ on a straight road. A scooterist wishes to overtake the bus in $100\\text{ s}$. If the bus is at a distance of $1\\text{ km}$ from the scooterist, with what speed should the scooterist chase the bus?',
    options: ['$40\\text{ m s}^{-1}$', '$25\\text{ m s}^{-1}$', '$10\\text{ m s}^{-1}$', '$20\\text{ m s}^{-1}$'],
    correct_option: 3,
    solution: `Let the speed of the scooterist be $v_s$.
- Speed of the bus, $v_b = 10\\text{ m s}^{-1}$
- Relative speed of scooterist with respect to the bus:
  $$v_{\\text{rel}} = v_s - v_b = v_s - 10$$
- Separation distance, $d = 1\\text{ km} = 1000\\text{ m}$
- Time to overtake, $t = 100\\text{ s}$

Using $d = v_{\\text{rel}} \\times t$:
$$1000 = (v_s - 10) \\times 100$$
$$v_s - 10 = \\frac{1000}{100} = 10$$
$$v_s = 10 + 10 = 20\\text{ m s}^{-1}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 33,
    exam: 'AIPMT 2008',
    question: 'A particle moves in a straight line with a constant acceleration. It changes its velocity from $10\\text{ ms}^{-1}$ to $20\\text{ ms}^{-1}$ while passing through a distance $135\\text{ m}$ in $t\\text{ second}$. The value of $t$ is:',
    options: ['$12$', '$9$', '$10$', '$1.8$'],
    correct_option: 1,
    solution: `For motion with constant acceleration, average velocity is given by:
$$v_{\\text{avg}} = \\frac{u + v}{2}$$

Given:
- Initial velocity, $u = 10\\text{ ms}^{-1}$
- Final velocity, $v = 20\\text{ ms}^{-1}$
- Distance, $s = 135\\text{ m}$

$$v_{\\text{avg}} = \\frac{10 + 20}{2} = 15\\text{ ms}^{-1}$$

Since $s = v_{\\text{avg}} \\times t$:
$$135 = 15 \\times t \\implies t = \\frac{135}{15} = 9\\text{ s}$$

Hence, the correct option is (B).`
  }
];
