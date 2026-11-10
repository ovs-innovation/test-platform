import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'motion_diagram_urls.json'), 'utf8'));

export const MOTION_PYQ_PART2 = [
  {
    qNum: 34,
    exam: 'AIPMT 2008',
    question: 'The distance travelled by a particle starting from rest and moving with an acceleration $\\frac{4}{3}\\text{m s}^{-2}$, in the third second is:',
    options: ['$\\frac{10}{3}\\text{ m}$', '$\\frac{19}{3}\\text{ m}$', '$6\\text{ m}$', '$4\\text{ m}$'],
    correct_option: 0,
    solution: `Distance travelled by a particle in the $n^{\\text{th}}$ second is given by:
$$S_n = u + \\frac{a}{2}(2n - 1)$$

Given:
- Initial velocity, $u = 0$
- Acceleration, $a = \\frac{4}{3}\\text{ m s}^{-2}$
- $n = 3$

$$S_3 = 0 + \\frac{4/3}{2}(2 \\times 3 - 1) = \\frac{2}{3}(6 - 1) = \\frac{2}{3} \\times 5 = \\frac{10}{3}\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 35,
    exam: 'AIPMT 2008',
    question: 'A particle shows distance - time curve as given in this figure. The maximum instantaneous velocity of the particle is around the point:',
    image_url: diagramUrls['35'],
    options: ['D', 'A', 'B', 'C'],
    correct_option: 3,
    solution: `The instantaneous velocity of a particle is given by the derivative of distance with respect to time:
$$v = \\frac{ds}{dt} = \\text{slope of tangent to the } s-t \\text{ curve}$$

Looking at the curve:
- Between $A$ and $B$, the curve has a small positive slope.
- Around point $C$, the curve has an inflection point where the steepness (slope) is at its maximum value.
- After point $C$, towards point $D$, the slope begins to flatten out and decrease.

Therefore, the maximum slope and hence the maximum instantaneous velocity occurs around point C.

Hence, the correct option is (D).`
  },
  {
    qNum: 36,
    exam: 'AIPMT 2007',
    question: 'A particle moving along x-axis has acceleration $f$, at time $t$, given by $f = f_0(1 - \\frac{t}{T})$, where $f_0$ and $T$ are constants. The particle at $t = 0$ has zero velocity. In the time interval between $t = 0$ and the instant when $f = 0$, the particle\'s velocity ($v_x$) is:',
    options: ['$\\frac{1}{2} f_0 T^2$', '$f_0 T^2$', '$\\frac{1}{2} f_0 T$', '$f_0 T$'],
    correct_option: 2,
    solution: `Given acceleration:
$$f = \\frac{dv_x}{dt} = f_0 \\left( 1 - \\frac{t}{T} \\right)$$

The instant when acceleration $f = 0$:
$$f_0 \\left( 1 - \\frac{t}{T} \\right) = 0 \\implies 1 - \\frac{t}{T} = 0 \\implies t = T$$

Integrating to find velocity $v_x$ from $t = 0$ to $t = T$:
$$\\int_0^{v_x} dv_x = \\int_0^T f_0 \\left( 1 - \\frac{t}{T} \\right) dt$$
$$v_x = f_0 \\left[ t - \\frac{t^2}{2T} \\right]_0^T$$
$$v_x = f_0 \\left( T - \\frac{T^2}{2T} \\right) = f_0 \\left( T - \\frac{T}{2} \\right) = \\frac{1}{2} f_0 T$$

Hence, the correct option is (C).`
  },
  {
    qNum: 37,
    exam: 'AIPMT 2007',
    question: 'A car moves from X to Y with a uniform speed $v_u$ and returns to X with a uniform speed $v_d$. The average speed for this round trip is:',
    options: [
      '$\\sqrt{v_u v_d}$',
      '$\\frac{v_d v_u}{v_d+v_u}$',
      '$\\frac{v_u+v_d}{2}$',
      '$\\frac{2v_d v_u}{v_d+v_u}$'
    ],
    correct_option: 3,
    solution: `Let the distance between X and Y be $d$.
- Time taken to travel from X to Y:
  $$t_1 = \\frac{d}{v_u}$$
- Time taken to return from Y to X:
  $$t_2 = \\frac{d}{v_d}$$

Total distance travelled $= d + d = 2d$.
Total time taken:
$$T = t_1 + t_2 = \\frac{d}{v_u} + \\frac{d}{v_d} = d \\left( \\frac{v_u + v_d}{v_u v_d} \\right)$$

Average speed:
$$v_{\\text{avg}} = \\frac{\\text{Total distance}}{\\text{Total time}} = \\frac{2d}{d \\left( \\frac{v_u + v_d}{v_u v_d} \\right)} = \\frac{2v_u v_d}{v_u + v_d} = \\frac{2v_d v_u}{v_d + v_u}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 38,
    exam: 'AIPMT 2007',
    question: 'The position $x$ of a particle with respect to time $t$ along x-axis is given by $x = 9t^2 - t^3$ where $x$ is in metres and $t$ in seconds. What will be the position of this particle when it achieves maximum speed along the $+x$ direction ?',
    options: ['$54\\text{ m}$', '$81\\text{ m}$', '$24\\text{ m}$', '$32\\text{ m}$'],
    correct_option: 0,
    solution: `Given position equation:
$$x(t) = 9t^2 - t^3$$

Velocity $v(t)$:
$$v(t) = \\frac{dx}{dt} = 18t - 3t^2$$

To find the time at which velocity is maximum, we set the first derivative of velocity (acceleration) to zero:
$$a(t) = \\frac{dv}{dt} = 18 - 6t = 0 \\implies 6t = 18 \\implies t = 3\\text{ s}$$

(Note: $\\frac{d^2v}{dt^2} = -6 < 0$, confirming maximum).

Now finding the position at $t = 3\\text{ s}$:
$$x(3) = 9(3)^2 - (3)^3 = 9(9) - 27 = 81 - 27 = 54\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 39,
    exam: 'AIPMT 2006',
    question: 'Two bodies A (of mass $1\\text{ kg}$) and B (of mass $3\\text{ kg}$) are dropped from heights of $16\\text{ m}$ and $25\\text{ m}$, respectively. The ratio of the time taken by them to reach the ground is:',
    options: ['$4/5$', '$5/4$', '$12/5$', '$5/12$'],
    correct_option: 0,
    solution: `The time taken by a body dropped freely from rest ($u = 0$) from a height $h$ is:
$$t = \\sqrt{\\frac{2h}{g}}$$

Notice that time of fall is independent of the mass of the body.
Therefore, the ratio of time taken is:
$$\\frac{t_A}{t_B} = \\sqrt{\\frac{h_A}{h_B}} = \\sqrt{\\frac{16}{25}} = \\frac{4}{5}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 40,
    exam: 'AIPMT 2006',
    question: 'A car runs at a constant speed on a circular track of radius $100\\text{ m}$, taking $62.8\\text{ seconds}$ for every circular lap. The average velocity and average speed for each circular lap respectively is:',
    options: [
      '$10\\text{ m/s},\\; 0$',
      '$0,\\; 0$',
      '$0,\\; 10\\text{ m/s}$',
      '$10\\text{ m/s},\\; 10\\text{ m/s}$'
    ],
    correct_option: 2,
    solution: `1. In one complete circular lap, the car returns to its starting point:
$$\\text{Displacement} = 0$$
$$\\text{Average velocity} = \\frac{\\text{Displacement}}{\\text{Time}} = \\frac{0}{62.8\\text{ s}} = 0$$

2. Distance covered in one complete lap:
$$\\text{Distance} = 2\\pi r = 2 \\times 3.14 \\times 100\\text{ m} = 628\\text{ m}$$
$$\\text{Average speed} = \\frac{\\text{Total distance}}{\\text{Total time}} = \\frac{628\\text{ m}}{62.8\\text{ s}} = 10\\text{ m/s}$$

Hence, average velocity is $0$ and average speed is $10\\text{ m/s}$.
Correct option is (C).`
  },
  {
    qNum: 41,
    exam: 'AIPMT 2006',
    question: 'A particle moves along a straight line OX. At a time $t$ (in seconds) the distance $x$ (in metres) of the particle from O is given by $x = 40 + 12t - t^3$. How long would the particle travel before coming to rest ?',
    options: ['$16\\text{ m}$', '$24\\text{ m}$', '$40\\text{ m}$', '$56\\text{ m}$'],
    correct_option: 0,
    solution: `Given position equation:
$$x(t) = 40 + 12t - t^3$$

Velocity $v(t)$:
$$v(t) = \\frac{dx}{dt} = 12 - 3t^2$$

The particle comes to rest when $v(t) = 0$:
$$12 - 3t^2 = 0 \\implies 3t^2 = 12 \\implies t^2 = 4 \\implies t = 2\\text{ s}$$

Position at $t = 0\\text{ s}$:
$$x(0) = 40 + 12(0) - 0^3 = 40\\text{ m}$$

Position at $t = 2\\text{ s}$:
$$x(2) = 40 + 12(2) - 2^3 = 40 + 24 - 8 = 56\\text{ m}$$

Distance travelled before coming to rest:
$$d = x(2) - x(0) = 56\\text{ m} - 40\\text{ m} = 16\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 42,
    exam: 'AIPMT 2005',
    question: 'A ball is thrown vertically upward. It has a speed of $10\\text{ m/sec}$ when it has reached one half of its maximum height. How high does the ball rise? (Take $g = 10\\text{ m/s}^2$)',
    options: ['$10\\text{ m}$', '$5\\text{ m}$', '$15\\text{ m}$', '$20\\text{ m}$'],
    correct_option: 0,
    solution: `Let the maximum height reached be $H$.
At maximum height, the velocity becomes zero ($v_H = 0$).

From half of the maximum height ($h = H/2$) to maximum height ($h = H$):
- Initial velocity, $u = 10\\text{ m/s}$
- Final velocity, $v = 0$
- Distance, $s = H - \\frac{H}{2} = \\frac{H}{2}$
- Acceleration, $a = -g = -10\\text{ m/s}^2$

Using $v^2 = u^2 - 2gs$:
$$0^2 = 10^2 - 2(10)\\left(\\frac{H}{2}\\right)$$
$$0 = 100 - 10H$$
$$10H = 100 \\implies H = 10\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 43,
    exam: 'AIPMT 2005',
    question: 'The displacement $x$ of a particle varies with time $t$ as $x = ae^{-\\alpha t} + be^{\\beta t}$, where $a, b, \\alpha$ and $\\beta$ are positive constants. The velocity of the particle will:',
    options: [
      'be independent of $\\beta$',
      'drop to zero when $\\alpha = \\beta$',
      'go on decreasing with time',
      'go on increasing with time'
    ],
    correct_option: 3,
    solution: `Given displacement function:
$$x = ae^{-\\alpha t} + be^{\\beta t}$$

Velocity $v$:
$$v = \\frac{dx}{dt} = -a\\alpha e^{-\\alpha t} + b\\beta e^{\\beta t}$$

Acceleration $a_{\\text{acc}}$:
$$a_{\\text{acc}} = \\frac{dv}{dt} = a\\alpha^2 e^{-\\alpha t} + b\\beta^2 e^{\\beta t}$$

Since $a, b, \\alpha, \\beta > 0$ and exponential terms $e^{-\\alpha t} > 0$, $e^{\\beta t} > 0$ for all real $t$:
$$a_{\\text{acc}} > 0 \\quad \\text{for all } t$$

Because the acceleration is strictly positive for all $t$, the rate of change of velocity is always positive, meaning the velocity goes on increasing with time.

Hence, the correct option is (D).`
  },
  {
    qNum: 44,
    exam: 'AIPMT 2003',
    question: 'A man throws balls with the same speed vertically upwards one after the other at an interval of 2 seconds. What should be the speed of the throw so that more than two balls are in the sky at any time ? (Given $g = 9.8\\text{ m/s}^2$)',
    options: [
      'more than $19.6\\text{ m/s}$',
      'at least $9.8\\text{ m/s}$',
      'any speed less than $19.6\\text{ m/s}$',
      'only with speed $19.6\\text{ m/s}$'
    ],
    correct_option: 0,
    solution: `If the balls are thrown at intervals of $2\\text{ seconds}$:
- Ball 1 is thrown at $t = 0\\text{ s}$.
- Ball 2 is thrown at $t = 2\\text{ s}$.
- Ball 3 is thrown at $t = 4\\text{ s}$.

For more than two balls to remain in the air at any time, Ball 1 must still be in the air when Ball 3 is thrown at $t = 4\\text{ s}$.
This requires the time of flight $T$ to be greater than $4\\text{ seconds}$:
$$T > 4\\text{ s}$$

The time of flight is given by:
$$T = \\frac{2u}{g}$$

Therefore:
$$\\frac{2u}{g} > 4 \\implies u > 2g = 2(9.8) = 19.6\\text{ m/s}$$

Hence, the speed of throw must be more than $19.6\\text{ m/s}$.
Correct option is (A).`
  },
  {
    qNum: 45,
    exam: 'AIPMT 2003',
    question: 'If a ball is thrown vertically upwards with speed $u$, the distance covered during the last $t$ seconds of its ascent is:',
    options: ['$ut$', '$\\frac{1}{2} gt^2$', '$ut - \\frac{1}{2} gt^2$', '$(u + gt)t$'],
    correct_option: 1,
    solution: `Total time of ascent to reach the maximum height where $v = 0$ is:
$$T = \\frac{u}{g}$$

The distance covered during the last $t$ seconds of ascent is equivalent to the distance covered in the first $t$ seconds of descent from rest ($u = 0$) under gravity:
$$s = u_{\\text{top}} t + \\frac{1}{2}gt^2 = 0 + \\frac{1}{2}gt^2 = \\frac{1}{2}gt^2$$

Alternatively:
- Velocity $t$ seconds before reaching the top is $v = gt$.
- Distance covered in these $t$ seconds:
  $$s = vt - \\frac{1}{2}gt^2 = (gt)t - \\frac{1}{2}gt^2 = \\frac{1}{2}gt^2$$

Hence, the correct option is (B).`
  },
  {
    qNum: 46,
    exam: 'AIPMT 2001',
    question: 'A particle is thrown vertically upward. Its velocity at half of the height is $10\\text{ m/s}$, then the maximum height attained by it ($g = 10\\text{ m/s}^2$):',
    options: ['$8\\text{ m}$', '$20\\text{ m}$', '$10\\text{ m}$', '$16\\text{ m}$'],
    correct_option: 2,
    solution: `Let the maximum height attained be $H$.
At $h = \\frac{H}{2}$, velocity is $v = 10\\text{ m/s}$.
At maximum height $h = H$, velocity is $0$.

Considering motion from $h = \\frac{H}{2}$ to $h = H$:
- Initial velocity, $u = 10\\text{ m/s}$
- Final velocity, $v = 0$
- Distance, $s = H - \\frac{H}{2} = \\frac{H}{2}$
- Acceleration, $a = -g = -10\\text{ m/s}^2$

Using $v^2 = u^2 - 2gs$:
$$0^2 = 10^2 - 2(10)\\left(\\frac{H}{2}\\right)$$
$$0 = 100 - 10H \\implies 10H = 100 \\implies H = 10\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 47,
    exam: 'AIPMT 2000',
    question: 'Motion of a particle is given by equation $s = (3t^3 + 7t^2 + 14t + 8)\\text{ m}$. The value of acceleration of the particle at $t = 1\\text{ sec}$ is:',
    options: ['$10\\text{ m/s}^2$', '$32\\text{ m/s}^2$', '$23\\text{ m/s}^2$', '$16\\text{ m/s}^2$'],
    correct_option: 1,
    solution: `Given position equation:
$$s(t) = 3t^3 + 7t^2 + 14t + 8$$

Velocity $v(t)$:
$$v(t) = \\frac{ds}{dt} = 9t^2 + 14t + 14$$

Acceleration $a(t)$:
$$a(t) = \\frac{dv}{dt} = 18t + 14$$

At $t = 1\\text{ s}$:
$$a(1) = 18(1) + 14 = 32\\text{ m/s}^2$$

Hence, the correct option is (B).`
  },
  {
    qNum: 48,
    exam: 'AIPMT 1998',
    question: 'A car moving with a speed of $40\\text{ km/h}$ can be stopped by applying brakes after atleast $2\\text{ m}$. If the same car is moving with a speed of $80\\text{ km/h}$, what is the minimum stopping distance?',
    options: ['$8\\text{ m}$', '$2\\text{ m}$', '$4\\text{ m}$', '$6\\text{ m}$'],
    correct_option: 0,
    solution: `Using third equation of motion with final velocity $v = 0$:
$$v^2 = u^2 - 2as \\implies s = \\frac{u^2}{2a}$$

For a constant braking deceleration $a$:
$$s \\propto u^2$$

Taking the ratio for two initial speeds:
$$\\frac{s_2}{s_1} = \\left( \\frac{u_2}{u_1} \\right)^2 = \\left( \\frac{80}{40} \\right)^2 = 2^2 = 4$$
$$s_2 = 4 \\times s_1 = 4 \\times 2\\text{ m} = 8\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 49,
    exam: 'AIPMT 1997',
    question: 'The position $x$ of a particle varies with time ($t$) as $x = at^2 - bt^3$. The acceleration will be zero at time $t$ is equal to:',
    options: ['$\\frac{a}{3b}$', '$\\text{zero}$', '$\\frac{2a}{3b}$', '$\\frac{a}{b}$'],
    correct_option: 0,
    solution: `Given position equation:
$$x(t) = at^2 - bt^3$$

Velocity $v(t)$:
$$v(t) = \\frac{dx}{dt} = 2at - 3bt^2$$

Acceleration $a_{\\text{acc}}(t)$:
$$a_{\\text{acc}}(t) = \\frac{dv}{dt} = 2a - 6bt$$

Setting acceleration to zero ($a_{\\text{acc}} = 0$):
$$2a - 6bt = 0 \\implies 6bt = 2a \\implies t = \\frac{2a}{6b} = \\frac{a}{3b}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 50,
    exam: 'AIPMT 1997',
    question: 'If a car at rest accelerates uniformly to a speed of $144\\text{ km/h}$ in $20\\text{ sec}$, it covers a distance of:',
    options: ['$1440\\text{ cm}$', '$2980\\text{ cm}$', '$20\\text{ m}$', '$400\\text{ m}$'],
    correct_option: 3,
    solution: `Converting speed into SI units:
$$v = 144\\text{ km/h} = 144 \\times \\frac{5}{18}\\text{ m/s} = 40\\text{ m/s}$$

Given:
- Initial velocity, $u = 0$
- Final velocity, $v = 40\\text{ m/s}$
- Time, $t = 20\\text{ s}$

Distance covered under uniform acceleration:
$$s = \\left( \\frac{u + v}{2} \\right) \\times t$$
$$s = \\left( \\frac{0 + 40}{2} \\right) \\times 20 = 20 \\times 20 = 400\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 51,
    exam: 'AIPMT 1996',
    question: 'A body dropped from a height $h$ with initial velocity zero, strikes the ground with a velocity $3\\text{ m/s}$. Another body of same mass dropped from the same height $h$ with an initial velocity of $4\\text{ m/s}$. The final velocity of second mass, with which it strikes the ground is:',
    options: ['$5\\text{ m/s}$', '$12\\text{ m/s}$', '$3\\text{ m/s}$', '$4\\text{ m/s}$'],
    correct_option: 0,
    solution: `For the first body dropped from rest ($u_1 = 0$):
$$v_1^2 = u_1^2 + 2gh \\implies 3^2 = 0 + 2gh \\implies 2gh = 9$$

For the second body projected downwards with $u_2 = 4\\text{ m/s}$:
$$v_2^2 = u_2^2 + 2gh$$
$$v_2^2 = 4^2 + 9 = 16 + 9 = 25$$
$$v_2 = \\sqrt{25} = 5\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 52,
    exam: 'AIPMT 1995',
    question: 'The acceleration of a particle is increasing linearly with time $t$ as $bt$. The particle starts from origin with an initial velocity $v_0$. The distance travelled by the particle in time $t$ will be:',
    options: [
      '$v_0 t + \\frac{1}{3}bt^2$',
      '$v_0 t + \\frac{1}{2}bt^2$',
      '$v_0 t + \\frac{1}{6}bt^3$',
      '$v_0 t + \\frac{1}{3}bt^3$'
    ],
    correct_option: 2,
    solution: `Given acceleration:
$$a = \\frac{dv}{dt} = bt$$

Integrating to find velocity:
$$dv = bt \\, dt \\implies \\int_{v_0}^v dv = \\int_0^t bt \\, dt$$
$$v - v_0 = \\frac{1}{2}bt^2 \\implies v = v_0 + \\frac{1}{2}bt^2$$

Since $v = \\frac{ds}{dt}$:
$$ds = \\left( v_0 + \\frac{1}{2}bt^2 \\right) dt$$
$$\\int_0^s ds = \\int_0^t \\left( v_0 + \\frac{1}{2}bt^2 \\right) dt$$
$$s = v_0 t + \\frac{1}{6}bt^3$$

Hence, the correct option is (C).`
  },
  {
    qNum: 53,
    exam: 'AIPMT 1995',
    question: 'The water drop falls at regular intervals from a tap $5\\text{ m}$ above the ground. The third drop is leaving the tap at instant the first drop touches the ground. How far above the ground is the second drop at that instant?',
    options: ['$3.75\\text{ m}$', '$4.00\\text{ m}$', '$1.25\\text{ m}$', '$2.50\\text{ m}$'],
    correct_option: 0,
    solution: `Time taken for the first drop to fall freely through $5\\text{ m}$ to the ground ($g = 10\\text{ m/s}^2$):
$$h = \\frac{1}{2}gt^2 \\implies 5 = \\frac{1}{2}(10)t^2 = 5t^2 \\implies t = 1\\text{ s}$$

Since the third drop leaves as the first drop touches the ground, there are 2 equal time intervals between the 3 drops:
$$\\Delta t = \\frac{1\\text{ s}}{2} = 0.5\\text{ s}$$

At this instant, the second drop has been falling for $\\Delta t = 0.5\\text{ s}$:
$$h_2 = \\frac{1}{2}g(\\Delta t)^2 = \\frac{1}{2}(10)(0.5)^2 = 5(0.25) = 1.25\\text{ m from the tap}$$

Height of the second drop above the ground:
$$H = 5\\text{ m} - 1.25\\text{ m} = 3.75\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 54,
    exam: 'AIPMT 1994',
    question: 'A car accelerates from rest at a constant rate $\\alpha$ for some time after which it decelerates at a constant rate $\\beta$ and comes to rest. If total time elapsed is $t$, then maximum velocity acquired by car will be:',
    options: [
      '$\\frac{(\\alpha^2 - \\beta^2)t}{\\alpha\\beta}$',
      '$\\frac{(\\alpha^2 + \\beta^2)t}{\\alpha\\beta}$',
      '$\\frac{(\\alpha + \\beta)t}{\\alpha\\beta}$',
      '$\\frac{\\alpha\\beta t}{\\alpha + \\beta}$'
    ],
    correct_option: 3,
    solution: `Let the time of acceleration be $t_1$ and the time of deceleration be $t_2$.
Total time:
$$t = t_1 + t_2$$

Let the maximum velocity reached be $v_{\\max}$.
During acceleration from rest ($u = 0$):
$$v_{\\max} = \\alpha t_1 \\implies t_1 = \\frac{v_{\\max}}{\\alpha}$$

During deceleration to rest ($v = 0$):
$$0 = v_{\\max} - \\beta t_2 \\implies t_2 = \\frac{v_{\\max}}{\\beta}$$

Total time elapsed:
$$t = \\frac{v_{\\max}}{\\alpha} + \\frac{v_{\\max}}{\\beta} = v_{\\max} \\left( \\frac{\\alpha + \\beta}{\\alpha\\beta} \\right)$$

Rearranging for $v_{\\max}$:
$$v_{\\max} = \\frac{\\alpha\\beta t}{\\alpha + \\beta}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 55,
    exam: 'AIPMT 1994',
    question: 'A particle moves along a straight line such that its displacement at any time $t$ is given by $s = (t^3 - 6t^2 + 3t + 4)\\text{ metres}$. The velocity when the acceleration is zero is:',
    options: ['$3\\text{ m/s}$', '$42\\text{ m/s}$', '$-9\\text{ m/s}$', '$-15\\text{ m/s}$'],
    correct_option: 2,
    solution: `Given displacement function:
$$s(t) = t^3 - 6t^2 + 3t + 4$$

Velocity $v(t)$:
$$v(t) = \\frac{ds}{dt} = 3t^2 - 12t + 3$$

Acceleration $a(t)$:
$$a(t) = \\frac{dv}{dt} = 6t - 12$$

Setting acceleration to zero ($a = 0$):
$$6t - 12 = 0 \\implies 6t = 12 \\implies t = 2\\text{ s}$$

Velocity at $t = 2\\text{ s}$:
$$v(2) = 3(2)^2 - 12(2) + 3 = 12 - 24 + 3 = -9\\text{ m/s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 56,
    exam: 'AIPMT 1994',
    question: 'The velocity of train increases uniformly from $20\\text{ km/h}$ to $60\\text{ km/h}$ in $4\\text{ hours}$. The distance travelled by the train during this period is:',
    options: ['$160\\text{ km}$', '$180\\text{ km}$', '$100\\text{ km}$', '$120\\text{ km}$'],
    correct_option: 0,
    solution: `For uniformly accelerated motion, the average velocity is:
$$v_{\\text{avg}} = \\frac{u + v}{2}$$

Given:
- Initial velocity, $u = 20\\text{ km/h}$
- Final velocity, $v = 60\\text{ km/h}$
- Time taken, $t = 4\\text{ hours}$

$$v_{\\text{avg}} = \\frac{20 + 60}{2} = 40\\text{ km/h}$$

Distance travelled:
$$s = v_{\\text{avg}} \\times t = 40\\text{ km/h} \\times 4\\text{ h} = 160\\text{ km}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 57,
    exam: 'AIPMT 1994',
    question: 'The displacement-time graph of a moving particle is shown below. The instantaneous velocity of the particle is negative at the point:',
    image_url: diagramUrls['57'],
    options: ['$E$', '$F$', '$C$', '$D$'],
    correct_option: 0,
    solution: `The instantaneous velocity of a particle is given by the slope of the tangent to the displacement-time graph:
$$v = \\frac{ds}{dt} = \\tan\\theta$$

- At point $C$: The curve is sloping upwards ($\\theta < 90^\\circ \\implies \\tan\\theta > 0$), so velocity is positive.
- At point $D$: The tangent is horizontal ($\\theta = 0^\\circ \\implies \\tan\\theta = 0$), so velocity is zero.
- At point $E$: The curve is sloping downwards ($\\theta > 90^\\circ \\implies \\tan\\theta < 0$), so velocity is negative.
- At point $F$: The curve is sloping upwards again ($\\theta < 90^\\circ \\implies \\tan\\theta > 0$), so velocity is positive.

Therefore, the instantaneous velocity is negative at point E.

Hence, the correct option is (A).`
  },
  {
    qNum: 58,
    exam: 'AIPMT 1993',
    question: 'A body starts from rest, what is the ratio of the distance travelled by the body during the $4^{\\text{th}}$ and $3^{\\text{rd}}$ second?',
    options: ['$\\frac{7}{5}$', '$\\frac{5}{7}$', '$\\frac{7}{3}$', '$\\frac{3}{7}$'],
    correct_option: 0,
    solution: `Distance covered in the $n^{\\text{th}}$ second starting from rest ($u = 0$) with uniform acceleration $a$:
$$S_n = \\frac{a}{2}(2n - 1)$$

Therefore, $S_n \\propto (2n - 1)$.

Ratio of distances:
$$\\frac{S_4}{S_3} = \\frac{2(4) - 1}{2(3) - 1} = \\frac{8 - 1}{6 - 1} = \\frac{7}{5}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 59,
    exam: 'AIPMT 1992',
    question: 'Which of the following curve does not represent motion in one dimension?',
    image_url: diagramUrls['59'],
    options: ['(A)', '(B)', '(C)', '(D)'],
    correct_option: 1,
    solution: `In curve (B), the velocity-time relationship forms a closed circular loop.
This implies two physical impossibilities:
1. For a single given time $t$, there are two different velocities simultaneously, which is impossible for a single particle.
2. Time would have to reverse its direction, which is impossible.

Curves (A), (C), and (D) are all single-valued functions of time and represent valid one-dimensional motions.

Hence, graph (B) cannot represent one-dimensional motion.
Correct option is (B).`
  },
  {
    qNum: 60,
    exam: 'AIPMT 1992',
    question: 'A body dropped from top of a tower fall through $40\\text{ m}$ during the last two seconds of its fall. The height of tower is ($g = 10\\text{ m/s}^2$):',
    options: ['$60\\text{ m}$', '$45\\text{ m}$', '$80\\text{ m}$', '$50\\text{ m}$'],
    correct_option: 1,
    solution: `Let total time of fall be $t$ seconds.
Total height of tower:
$$h = \\frac{1}{2}gt^2 = 5t^2$$

Distance fallen in the first $(t - 2)$ seconds:
$$h' = \\frac{1}{2}g(t - 2)^2 = 5(t - 2)^2$$

Distance fallen in the last $2$ seconds:
$$h - h' = 40$$
$$5t^2 - 5(t - 2)^2 = 40$$
$$5[t^2 - (t^2 - 4t + 4)] = 40$$
$$5(4t - 4) = 40 \\implies 4t - 4 = 8 \\implies 4t = 12 \\implies t = 3\\text{ s}$$

Height of the tower:
$$h = 5(3)^2 = 5 \\times 9 = 45\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 61,
    exam: 'AIPMT 1991',
    question: 'A car moves a distance of $200\\text{ m}$. It covers the first half of the distance at speed $40\\text{ km/h}$ and the second half of distance at speed $v$. The average speed is $48\\text{ km/h}$. The value of $v$ is:',
    options: ['$56\\text{ km/h}$', '$60\\text{ km/h}$', '$50\\text{ km/h}$', '$48\\text{ km/h}$'],
    correct_option: 1,
    solution: `When a body covers two equal distances with speeds $v_1$ and $v_2$, the average speed is given by the harmonic mean:
$$v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2}$$

Given:
- $v_{\\text{avg}} = 48\\text{ km/h}$
- $v_1 = 40\\text{ km/h}$
- $v_2 = v$

$$48 = \\frac{2(40)v}{40 + v}$$
$$48(40 + v) = 80v$$
$$1920 + 48v = 80v$$
$$32v = 1920 \\implies v = \\frac{1920}{32} = 60\\text{ km/h}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 62,
    exam: 'AIPMT 1991',
    question: 'A bus travelling the first one-third distance at a speed of $10\\text{ km/h}$, the next one-third at $20\\text{ km/h}$ and at last one-third at $60\\text{ km/h}$. The average speed of the bus is:',
    options: ['$9\\text{ km/h}$', '$16\\text{ km/h}$', '$18\\text{ km/h}$', '$48\\text{ km/h}$'],
    correct_option: 2,
    solution: `Let the total distance be $3s$.
- Time for first one-third distance ($s$): $t_1 = \\frac{s}{10}$
- Time for second one-third distance ($s$): $t_2 = \\frac{s}{20}$
- Time for last one-third distance ($s$): $t_3 = \\frac{s}{60}$

Total time:
$$t_{\\text{total}} = \\frac{s}{10} + \\frac{s}{20} + \\frac{s}{60} = s\\left( \\frac{6 + 3 + 1}{60} \\right) = s\\left( \\frac{10}{60} \\right) = \\frac{s}{6}$$

Average speed:
$$v_{\\text{avg}} = \\frac{\\text{Total distance}}{\\text{Total time}} = \\frac{3s}{\\frac{s}{6}} = 3 \\times 6 = 18\\text{ km/h}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 63,
    exam: 'AIPMT 1990',
    question: 'A car covers the first half of the distance between two places at $40\\text{ km/h}$ and another half at $60\\text{ km/h}$. The average speed of the car is:',
    options: ['$40\\text{ km/h}$', '$48\\text{ km/h}$', '$50\\text{ km/h}$', '$60\\text{ km/h}$'],
    correct_option: 1,
    solution: `For two equal halves of distance:
$$v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2}$$

Given $v_1 = 40\\text{ km/h}$ and $v_2 = 60\\text{ km/h}$:
$$v_{\\text{avg}} = \\frac{2 \\times 40 \\times 60}{40 + 60} = \\frac{4800}{100} = 48\\text{ km/h}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 64,
    exam: 'AIPMT 1989',
    question: 'What will be the ratio of the distance moved by a freely falling body from rest in $4^{\\text{th}}$ and $5^{\\text{th}}$ seconds of journey?',
    options: ['$4 : 5$', '$7 : 9$', '$16 : 25$', '$1 : 1$'],
    correct_option: 1,
    solution: `Distance covered in $n^{\\text{th}}$ second by a freely falling body from rest ($u = 0$):
$$S_n = \\frac{1}{2}g(2n - 1) \\implies S_n \\propto (2n - 1)$$

For the $4^{\\text{th}}$ and $5^{\\text{th}}$ seconds:
$$\\frac{S_4}{S_5} = \\frac{2(4) - 1}{2(5) - 1} = \\frac{8 - 1}{10 - 1} = \\frac{7}{9}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 65,
    exam: 'AIPMT 1988',
    question: 'A car is moving along a straight road with a uniform acceleration. It passes through two points $P$ and $Q$ separated by a distance with velocity $30\\text{ km/h}$ and $40\\text{ km/h}$ respectively. The velocity of the car midway between $P$ and $Q$ is:',
    options: [
      '$33.3\\text{ km/h}$',
      '$20\\sqrt{2}\\text{ km/h}$',
      '$25\\sqrt{2}\\text{ km/h}$',
      '$35\\text{ km/h}$'
    ],
    correct_option: 2,
    solution: `Let total distance between P and Q be $2s$.
Velocity at P is $u = 30\\text{ km/h}$ and at Q is $v = 40\\text{ km/h}$.
Let $v_m$ be the velocity at the midpoint:
- From P to midpoint (distance $s$):
  $$v_m^2 = u^2 + 2as \\implies 2as = v_m^2 - u^2 \\quad \\text{--- (1)}$$
- From midpoint to Q (distance $s$):
  $$v^2 = v_m^2 + 2as \\implies 2as = v^2 - v_m^2 \\quad \\text{--- (2)}$$

Equating (1) and (2):
$$v_m^2 - u^2 = v^2 - v_m^2$$
$$2v_m^2 = u^2 + v^2$$
$$v_m = \\sqrt{\\frac{u^2 + v^2}{2}}$$

Substituting values:
$$v_m = \\sqrt{\\frac{30^2 + 40^2}{2}} = \\sqrt{\\frac{900 + 1600}{2}} = \\sqrt{\\frac{2500}{2}} = \\frac{50}{\\sqrt{2}} = 25\\sqrt{2}\\text{ km/h}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 66,
    exam: 'AIPMT 1988',
    question: 'A train of $150\\text{ metre}$ length is going towards north direction at a speed of $10\\text{ m/s}$. A parrot flies at the speed of $5\\text{ m/s}$ towards south direction parallel to the railways track. The time taken by the parrot to cross the train is:',
    options: ['$12\\text{ sec}$', '$8\\text{ sec}$', '$15\\text{ sec}$', '$10\\text{ sec}$'],
    correct_option: 3,
    solution: `Taking North as positive direction and South as negative direction:
- Velocity of train, $v_T = +10\\text{ m/s}$
- Velocity of parrot, $v_P = -5\\text{ m/s}$

Relative velocity of parrot with respect to train:
$$v_{\\text{rel}} = |v_P - v_T| = |-5 - 10| = 15\\text{ m/s}$$

Distance to be covered by the parrot to completely cross the train:
$$d = \\text{Length of train} = 150\\text{ m}$$

Time taken:
$$t = \\frac{d}{v_{\\text{rel}}} = \\frac{150\\text{ m}}{15\\text{ m/s}} = 10\\text{ sec}$$

Hence, the correct option is (D).`
  }
];
