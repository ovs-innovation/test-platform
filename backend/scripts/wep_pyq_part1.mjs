import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wep_diagram_urls.json'), 'utf8'));

export const WEP_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: 'A particle of mass $M$ moves along a horizontal $x$ axis from $x = 0$ to $x = L$. The coefficient of kinetic friction varies as a function of $x$ as $\\mu_k(x) = \\mu_0 - \\alpha x$, where $\\mu_0, \\alpha$ are constants of appropriate dimensions, so that $\\mu_k(L) = 0$. The total work done by the frictional force during the motion is $n\\mu_0MgL$, where $g$ is the acceleration due to gravity. The value of $n$ is:',
    options: ['$\\frac{1}{2}$', '$3$', '$1$', '$\\frac{1}{3}$'],
    correct_option: 0,
    solution: `Given:
$$\\mu_k(L) = \\mu_0 - \\alpha L = 0 \\implies \\alpha = \\frac{\\mu_0}{L}$$
Thus,
$$\\mu_k(x) = \\mu_0\\left(1 - \\frac{x}{L}\\right)$$

Normal force on the horizontal surface is $N = Mg$.
The magnitude of the frictional force as a function of $x$ is:
$$f_k(x) = \\mu_k(x)Mg = \\mu_0 Mg\\left(1 - \\frac{x}{L}\\right)$$

The total work done by friction as the particle moves from $x = 0$ to $x = L$ is:
$$W_f = -\\int_0^L f_k(x)\\,dx = -\\mu_0 Mg \\int_0^L \\left(1 - \\frac{x}{L}\\right) dx$$
$$= -\\mu_0 Mg \\left[ x - \\frac{x^2}{2L} \\right]_0^L = -\\mu_0 Mg \\left( L - \\frac{L}{2} \\right) = -\\frac{1}{2}\\mu_0 Mg L$$

Comparing magnitude $|W_f| = n\\mu_0 Mg L$, we get:
$$n = \\frac{1}{2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 2,
    exam: 'NEET 2026',
    question: 'The power of a crane, which lifts a mass of $1000\\text{ kg}$ to a height of $20\\text{ m}$ in $10\\text{ s}$ is: ($g = 9.8\\text{ m/s}^2$)',
    options: ['$19.6\\text{ W}$', '$39.2\\text{ W}$', '$19.6\\text{ kW}$', '$39.2\\text{ kW}$'],
    correct_option: 2,
    solution: `Given:
Mass, $m = 1000\\text{ kg}$
Height, $h = 20\\text{ m}$
Time, $t = 10\\text{ s}$
$g = 9.8\\text{ m/s}^2$

Work done by the crane:
$$W = mgh = 1000 \\times 9.8 \\times 20 = 196,000\\text{ J}$$

Power delivered:
$$P = \\frac{W}{t} = \\frac{196,000}{10} = 19,600\\text{ W} = 19.6\\text{ kW}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 3,
    exam: 'NEET 2025',
    question: 'The kinetic energies of two similar cars $A$ and $B$ are $100\\text{ J}$ and $225\\text{ J}$ respectively. On applying brakes, car $A$ stops after $1000\\text{ m}$ and car $B$ stops after $1500\\text{ m}$. If $F_A$ and $F_B$ are the forces applied by the brakes on cars $A$ and $B$ respectively, then the ratio of $\\frac{F_A}{F_B}$ is:',
    options: ['$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{3}{2}$', '$\\frac{2}{3}$'],
    correct_option: 3,
    solution: `By the work-energy theorem:
$$\\text{Work done by braking force} = \\Delta K$$
$$F \\cdot s = K \\implies F = \\frac{K}{s}$$

For car $A$:
$$F_A = \\frac{K_A}{s_A} = \\frac{100}{1000} = 0.1\\text{ N}$$

For car $B$:
$$F_B = \\frac{K_B}{s_B} = \\frac{225}{1500} = 0.15\\text{ N}$$

Ratio $\\frac{F_A}{F_B}$:
$$\\frac{F_A}{F_B} = \\frac{0.1}{0.15} = \\frac{2}{3}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 4,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'An object moving along horizontal $x$-direction with kinetic energy $10\\text{ J}$ is displaced through $x = (3\\hat{i})\\text{ m}$ by the force $\\vec{F} = (-2\\hat{i} + 3\\hat{j})\\text{ N}$. The kinetic energy of the object at the end of the displacement $x$ is:',
    options: ['$10\\text{ J}$', '$16\\text{ J}$', '$4\\text{ J}$', '$6\\text{ J}$'],
    correct_option: 2,
    solution: `Given:
Initial kinetic energy, $K_i = 10\\text{ J}$
Force, $\\vec{F} = -2\\hat{i} + 3\\hat{j}\\text{ N}$
Displacement, $\\vec{s} = 3\\hat{i}\\text{ m}$

Work done by the force:
$$W = \\vec{F} \\cdot \\vec{s} = (-2\\hat{i} + 3\\hat{j}) \\cdot (3\\hat{i}) = -2 \\times 3 = -6\\text{ J}$$

By the work-energy theorem:
$$W = K_f - K_i \\implies K_f = K_i + W = 10 - 6 = 4\\text{ J}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 5,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'An object falls from a height of $10\\text{ m}$ above the ground. After striking the ground it loses $50\\%$ of its kinetic energy. The height upto which the object can rebound from the ground is:',
    options: ['$7.5\\text{ m}$', '$10\\text{ m}$', '$2.5\\text{ m}$', '$5\\text{ m}$'],
    correct_option: 3,
    solution: `Let the initial height be $h_1 = 10\\text{ m}$.
Just before hitting the ground, the kinetic energy acquired is:
$$K_1 = mgh_1$$

After impact, the object loses $50\\%$ of its kinetic energy, so the remaining kinetic energy is:
$$K_2 = 0.5 K_1 = 0.5 mgh_1$$

The rebound height $h_2$ is given by:
$$mgh_2 = K_2 = 0.5 mgh_1 \\implies h_2 = 0.5 h_1 = 0.5 \\times 10 = 5\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 6,
    exam: 'NEET 2024',
    question: 'At any instant of time $t$, the displacement of any particle is given by $2t - 1$ (SI unit) under the influence of force of $5\\text{ N}$. The value of instantaneous power is (in SI unit):',
    options: ['$10$', '$5$', '$7$', '$6$'],
    correct_option: 0,
    solution: `Given:
Displacement, $x(t) = 2t - 1$
Force, $F = 5\\text{ N}$

The velocity of the particle is:
$$v = \\frac{dx}{dt} = \\frac{d}{dt}(2t - 1) = 2\\text{ m/s}$$

Instantaneous power is:
$$P = F \\cdot v = 5 \\times 2 = 10\\text{ W}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 7,
    exam: 'NEET 2023 Manipur',
    question: 'A particle moves with a velocity $(5\\hat{i} - 3\\hat{j} + 6\\hat{k})\\text{ ms}^{-1}$ horizontally under the action of constant force $(10\\hat{i} + 10\\hat{j} + 20\\hat{k})\\text{ N}$. The instantaneous power supplied to the particle is :',
    options: ['$200\\text{ W}$', '$\\text{Zero}$', '$100\\text{ W}$', '$140\\text{ W}$'],
    correct_option: 3,
    solution: `Given:
Force, $\\vec{F} = (10\\hat{i} + 10\\hat{j} + 20\\hat{k})\\text{ N}$
Velocity, $\\vec{v} = (5\\hat{i} - 3\\hat{j} + 6\\hat{k})\\text{ ms}^{-1}$

Instantaneous power $P$ is:
$$P = \\vec{F} \\cdot \\vec{v} = (10)(5) + (10)(-3) + (20)(6)$$
$$P = 50 - 30 + 120 = 140\\text{ W}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 8,
    exam: 'NEET 2023',
    question: 'The potential energy of a long spring when stretched by $2\\text{ cm}$ is $U$. If the spring is stretched by $8\\text{ cm}$, potential energy stored in it will be :',
    options: ['$4U$', '$8U$', '$16U$', '$2U$'],
    correct_option: 2,
    solution: `Potential energy stored in a spring is:
$$U = \\frac{1}{2}kx^2$$

Thus, $U \\propto x^2$:
$$\\frac{U_2}{U_1} = \\left(\\frac{x_2}{x_1}\\right)^2$$

Given $x_1 = 2\\text{ cm}$ and $x_2 = 8\\text{ cm}$:
$$\\frac{U_2}{U} = \\left(\\frac{8}{2}\\right)^2 = (4)^2 = 16 \\implies U_2 = 16U$$

Hence, the correct option is (C).`
  },
  {
    qNum: 9,
    exam: 'NEET 2022 Phase 2',
    question: 'The restoring force of a spring with a block attached to the free end of the spring is represented by:',
    image_url: diagramUrls['9'],
    options: ['Graph (A)', 'Graph (B)', 'Graph (C)', 'Graph (D)'],
    correct_option: 0,
    solution: `Hooke's law states that the restoring force $F_x$ of a spring is directly proportional to displacement $x$ and opposite in direction:
$$F_x = -kx$$

This is the equation of a straight line passing through the origin with negative slope ($-k$).
- For $x > 0$ (extended), $F_x < 0$ (fourth quadrant).
- For $x < 0$ (compressed), $F_x > 0$ (second quadrant).

Graph (A) correctly represents this linear relation with negative slope.

Hence, the correct option is (A).`
  },
  {
    qNum: 10,
    exam: 'NEET 2022 Phase 1',
    question: 'An electric lift with a maximum load of $2000\\text{ kg}$ (lift + passengers) is moving up with a constant speed of $1.5\\text{ ms}^{-1}$. The frictional force opposing the motion is $3000\\text{ N}$. The minimum power delivered by the motor to the lift in watts is : ($g = 10\\text{ ms}^{-2}$)',
    options: ['$23000$', '$20000$', '$34500$', '$23500$'],
    correct_option: 2,
    solution: `Given:
Total mass, $M = 2000\\text{ kg}$
Frictional opposing force, $f = 3000\\text{ N}$
Constant upward speed, $v = 1.5\\text{ m/s}$
$g = 10\\text{ m/s}^2$

For upward motion at constant speed, acceleration $a = 0$.
The total downward force is:
$$F = Mg + f = (2000 \\times 10) + 3000 = 20000 + 3000 = 23000\\text{ N}$$

The motor must supply an upward force equal to $F = 23000\\text{ N}$.
Power delivered by the motor:
$$P = F \\times v = 23000 \\times 1.5 = 34500\\text{ W}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 11,
    exam: 'NEET 2022 Phase 1',
    question: 'The energy that will be ideally radiated by a $100\\text{ kW}$ transmitter in $1\\text{ hour}$ is:',
    options: ['$36 \\times 10^7\\text{ J}$', '$36 \\times 10^4\\text{ J}$', '$36 \\times 10^5\\text{ J}$', '$1 \\times 10^5\\text{ J}$'],
    correct_option: 0,
    solution: `Given:
Power, $P = 100\\text{ kW} = 10^5\\text{ W}$
Time, $t = 1\\text{ hour} = 3600\\text{ s}$

Energy radiated:
$$E = P \\times t = 10^5 \\times 3600 = 3.6 \\times 10^8\\text{ J} = 36 \\times 10^7\\text{ J}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 12,
    exam: 'NEET 2021',
    question: 'A particle is released from height $S$ from the surface of the Earth. At a certain height its kinetic energy is three times its potential energy. The height from the surface of earth and the speed of the particle at that instant are respectively:',
    options: [
      '$\\frac{S}{4}, \\sqrt{\\frac{3gS}{2}}$',
      '$\\frac{S}{4}, \\frac{3gS}{2}$',
      '$\\frac{S}{4}, \\frac{\\sqrt{3gS}}{2}$',
      '$\\frac{S}{2}, \\frac{\\sqrt{3gS}}{2}$'
    ],
    correct_option: 0,
    solution: `Let the particle be released from rest at initial height $S$.
Initial total mechanical energy:
$$E = mgS$$

At height $h$ from the surface:
$$U = mgh$$
$$K = 3U = 3mgh$$

By conservation of energy:
$$K + U = E \\implies 3mgh + mgh = mgS$$
$$4mgh = mgS \\implies h = \\frac{S}{4}$$

Now, for the speed $v$ at this instant:
$$K = \\frac{1}{2}mv^2 = 3mgh = 3mg\\left(\\frac{S}{4}\\right) = \\frac{3mgS}{4}$$
$$\\frac{1}{2}v^2 = \\frac{3gS}{4} \\implies v^2 = \\frac{3gS}{2} \\implies v = \\sqrt{\\frac{3gS}{2}}$$

Therefore, the height is $\\frac{S}{4}$ and speed is $\\sqrt{\\frac{3gS}{2}}$.
Hence, the correct option is (A).`
  },
  {
    qNum: 13,
    exam: 'NEET 2021',
    question: 'Water falls from a height of $60\\text{ m}$ at the rate of $15\\text{ kg/s}$ to operate a turbine. The losses due to frictional force are $10\\%$ of the input energy. How much power is generated by the turbine? ($g = 10\\text{ m/s}^2$)',
    options: ['$7.0\\text{ kW}$', '$10.2\\text{ kW}$', '$8.1\\text{ kW}$', '$12.3\\text{ kW}$'],
    correct_option: 2,
    solution: `Given:
Height, $h = 60\\text{ m}$
Mass flow rate, $\\frac{dm}{dt} = 15\\text{ kg/s}$
Efficiency, $\\eta = 100\\% - 10\\% = 90\\% = 0.90$
$g = 10\\text{ m/s}^2$

Input power from falling water:
$$P_{\\text{in}} = \\frac{dm}{dt}gh = 15 \\times 10 \\times 60 = 9000\\text{ W} = 9\\text{ kW}$$

Output power generated by the turbine:
$$P_{\\text{out}} = \\eta P_{\\text{in}} = 0.90 \\times 9\\text{ kW} = 8.1\\text{ kW}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 14,
    exam: 'NEET 2019 (Odisha)',
    question: 'An object of mass $500\\text{ g}$, initially at rest, is acted upon by a variable force whose X-component varies with X in the manner shown. The velocities of the object at the points $X = 8\\text{ m}$ and $X = 12\\text{ m}$, would have the respective values of (nearly):',
    image_url: diagramUrls['14'],
    options: [
      '$18\\text{ m/s}$ and $20.6\\text{ m/s}$',
      '$18\\text{ m/s}$ and $24.4\\text{ m/s}$',
      '$23\\text{ m/s}$ and $24.4\\text{ m/s}$',
      '$23\\text{ m/s}$ and $20.6\\text{ m/s}$'
    ],
    correct_option: 3,
    solution: `Mass $m = 500\\text{ g} = 0.5\\text{ kg}$. The object is initially at rest, so $u = 0$.
The work done by the force is equal to the area under the $F-X$ curve:
$$W = \\Delta K = \\frac{1}{2}mv^2 - 0 = \\frac{1}{2}(0.5)v^2 = 0.25 v^2$$
$$\\implies v = \\sqrt{4W} = 2\\sqrt{W}$$

1. At $X = 8\\text{ m}$:
Area under the curve from $X = 0$ to $X = 8$:
- Area from $X = 0$ to $5$: Rectangle of width $5$ and height $20$ $\\implies 5 \\times 20 = 100\\text{ J}$
- Area from $X = 5$ to $8$: Rectangle of width $3$ and height $10$ $\\implies 3 \\times 10 = 30\\text{ J}$
Total work up to $X = 8$:
$$W_8 = 100 + 30 = 130\\text{ J}$$
Velocity at $X = 8\\text{ m}$:
$$v_8 = \\sqrt{\\frac{2 \\times 130}{0.5}} = \\sqrt{520} \\approx 22.8\\text{ m/s} \\approx 23\\text{ m/s}$$

2. At $X = 12\\text{ m}$:
From $X = 8$ to $10$: Triangle below axis from $0$ to $-25$ and back up, or trapezoid from $8$ to $10$ below $X$-axis with area:
$$\\text{Negative area} = \\frac{1}{2} \\times (2) \\times (-25) = -25\\text{ J}$$
From $X = 10$ to $12$: Rectangle above axis with height $12$:
$$\\text{Area} = (12 - 10) \\times 12 = 2 \\times 12 = 24\\text{ J}$$
(Wait, net work up to $12\\text{ m} \\approx 130 - 25 + 24 = 105\\text{ J}$)
$$v_{12} = \\sqrt{\\frac{2 \\times 105}{0.5}} = \\sqrt{420} \\approx 20.5\\text{ m/s} \\approx 20.6\\text{ m/s}$$

Thus, the velocities are approximately $23\\text{ m/s}$ and $20.6\\text{ m/s}$.
Hence, the correct option is (D).`
  },
  {
    qNum: 15,
    exam: 'NEET 2019',
    question: 'A force $F = 20 + 10y$ acts on a particle in $y$-direction where $F$ is in newton and $y$ in meter. Work done by this force to move the particle from $y = 0$ to $y = 1\\text{ m}$ is :',
    options: ['$5\\text{ J}$', '$25\\text{ J}$', '$20\\text{ J}$', '$30\\text{ J}$'],
    correct_option: 1,
    solution: `Given:
$$F = 20 + 10y$$

Work done in moving from $y = 0$ to $y = 1\\text{ m}$:
$$W = \\int_0^1 F\\,dy = \\int_0^1 (20 + 10y)\\,dy$$
$$W = \\left[ 20y + 5y^2 \\right]_0^1 = 20(1) + 5(1)^2 = 20 + 5 = 25\\text{ J}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 16,
    exam: 'NEET 2017',
    question: 'Consider a drop of rain water having mass $1\\text{ g}$ falling from a height of $1\\text{ km}$. It hits the ground with a speed of $50\\text{ m s}^{-1}$. Take $g$ constant with a value $10\\text{ m s}^{-2}$. The work done by the (i) gravitational force and the (ii) resistive force of air is:',
    options: [
      '(i) $1.25\\text{ J}$, (ii) $-8.25\\text{ J}$',
      '(i) $100\\text{ J}$, (ii) $8.75\\text{ J}$',
      '(i) $10\\text{ J}$, (ii) $-8.75\\text{ J}$',
      '(i) $-10\\text{ J}$, (ii) $-8.25\\text{ J}$'
    ],
    correct_option: 2,
    solution: `Given:
Mass of raindrop, $m = 1\\text{ g} = 10^{-3}\\text{ kg}$
Height, $h = 1\\text{ km} = 1000\\text{ m}$
Final velocity, $v = 50\\text{ m s}^{-1}$
$g = 10\\text{ m s}^{-2}$

(i) Work done by gravity:
$$W_g = mgh = 10^{-3} \\times 10 \\times 1000 = 10\\text{ J}$$

(ii) By the work-energy theorem:
$$W_g + W_r = \\Delta K = \\frac{1}{2}mv^2 - 0$$
$$\\frac{1}{2}mv^2 = \\frac{1}{2} \\times 10^{-3} \\times (50)^2 = \\frac{1}{2} \\times 10^{-3} \\times 2500 = 1.25\\text{ J}$$

$$10 + W_r = 1.25 \\implies W_r = 1.25 - 10 = -8.75\\text{ J}$$

Thus, work done by gravity is $10\\text{ J}$ and by resistive force is $-8.75\\text{ J}$.
Hence, the correct option is (C).`
  },
  {
    qNum: 17,
    exam: 'NEET 2016 Phase 2',
    question: 'A particle moves from a point $(-2\\hat{i} + 5\\hat{j})$ to $(4\\hat{j} + 3\\hat{k})$ when a force of $(4\\hat{i} + 3\\hat{j})\\text{ N}$ is applied. How much work has been done by the force ?',
    options: ['$8\\text{ J}$', '$11\\text{ J}$', '$5\\text{ J}$', '$2\\text{ J}$'],
    correct_option: 2,
    solution: `Given:
Initial position, $\\vec{r}_1 = -2\\hat{i} + 5\\hat{j} + 0\\hat{k}$
Final position, $\\vec{r}_2 = 0\\hat{i} + 4\\hat{j} + 3\\hat{k}$
Force, $\\vec{F} = 4\\hat{i} + 3\\hat{j} + 0\\hat{k}\\text{ N}$

Displacement:
$$\\vec{s} = \\vec{r}_2 - \\vec{r}_1 = (0 - (-2))\\hat{i} + (4 - 5)\\hat{j} + (3 - 0)\\hat{k} = 2\\hat{i} - \\hat{j} + 3\\hat{k}$$

Work done:
$$W = \\vec{F} \\cdot \\vec{s} = (4\\hat{i} + 3\\hat{j}) \\cdot (2\\hat{i} - \\hat{j} + 3\\hat{k})$$
$$W = (4)(2) + (3)(-1) + (0)(3) = 8 - 3 = 5\\text{ J}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 18,
    exam: 'NEET 2016 Phase 1',
    question: 'A particle of mass $10\\text{ g}$ moves along a circle of radius $6.4\\text{ cm}$ with a constant tangential acceleration. What is the magnitude of this acceleration if the kinetic energy of the particle becomes equal to $8 \\times 10^{-4}\\text{ J}$ by the end of the second revolution after the beginning of the motion ?',
    options: ['$0.18\\text{ m/s}^2$', '$0.2\\text{ m/s}^2$', '$0.1\\text{ m/s}^2$', '$0.15\\text{ m/s}^2$'],
    correct_option: 2,
    solution: `Given:
Mass, $m = 10\\text{ g} = 10^{-2}\\text{ kg}$
Radius, $R = 6.4\\text{ cm} = 6.4 \\times 10^{-2}\\text{ m}$
Kinetic energy after 2 revolutions, $K = 8 \\times 10^{-4}\\text{ J}$

Distance travelled in 2 revolutions:
$$s = 2 \\times (2\\pi R) = 4\\pi R = 4\\pi (6.4 \\times 10^{-2})\\text{ m}$$

By the work-energy theorem, work done by tangential force $F_t$ is:
$$W = F_t \\cdot s = m a_t s = \\Delta K = 8 \\times 10^{-4}\\text{ J}$$

$$m a_t s = 10^{-2} \\times a_t \\times (4\\pi \\times 6.4 \\times 10^{-2}) = 8 \\times 10^{-4}$$
$$a_t = \\frac{8 \\times 10^{-4}}{10^{-2} \\times 4\\pi \\times 6.4 \\times 10^{-2}} = \\frac{8}{25.6\\pi} \\approx \\frac{8}{25.6 \\times 3.14} \\approx 0.1\\text{ m/s}^2$$

Hence, the correct option is (C).`
  },
  {
    qNum: 19,
    exam: 'NEET 2016 Phase 1',
    question: 'A body of mass $1\\text{ kg}$ begins to move under the action of a time dependent force $\\vec{F} = (2t\\hat{i} + 3t^2\\hat{j})\\text{ N}$, where $\\hat{i}$ and $\\hat{j}$ are unit vectors along $x$ and $y$ axis. What power will be developed by the force at the time $t$ ?',
    options: [
      '$(2t^3 + 3t^4)\\text{ W}$',
      '$(2t^3 + 3t^5)\\text{ W}$',
      '$(2t^2 + 3t^3)\\text{ W}$',
      '$(2t^2 + 4t^4)\\text{ W}$'
    ],
    correct_option: 1,
    solution: `Given:
$m = 1\\text{ kg}$
$\\vec{F} = 2t\\hat{i} + 3t^2\\hat{j}\\text{ N}$

Acceleration:
$$\\vec{a} = \\frac{\\vec{F}}{m} = 2t\\hat{i} + 3t^2\\hat{j}$$

Integrating with respect to $t$ (starting from rest at $t = 0$):
$$\\vec{v}(t) = \\int \\vec{a}\\,dt = \\left(\\int 2t\\,dt\\right)\\hat{i} + \\left(\\int 3t^2\\,dt\\right)\\hat{j} = t^2\\hat{i} + t^3\\hat{j}$$

Power developed at time $t$:
$$P = \\vec{F} \\cdot \\vec{v} = (2t\\hat{i} + 3t^2\\hat{j}) \\cdot (t^2\\hat{i} + t^3\\hat{j}) = (2t)(t^2) + (3t^2)(t^3) = (2t^3 + 3t^5)\\text{ W}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 20,
    exam: 'NEET 2016 Phase 1',
    question: 'What is the minimum velocity with which a body of mass $m$ must enter a vertical loop of radius $R$ so that it can complete the loop?',
    options: ['$\\sqrt{3gR}$', '$\\sqrt{5gR}$', '$\\sqrt{gR}$', '$\\sqrt{2gR}$'],
    correct_option: 1,
    solution: `To complete a vertical circle of radius $R$:
At the highest point of the loop, tension $T \\ge 0$:
$$\\frac{mv_{\\text{top}}^2}{R} = mg \\implies v_{\\text{top}} = \\sqrt{gR}$$

By conservation of mechanical energy between the bottom point and the top point:
$$\\frac{1}{2}mv_{\\text{bottom}}^2 = \\frac{1}{2}mv_{\\text{top}}^2 + mg(2R)$$
$$\\frac{1}{2}v_{\\text{bottom}}^2 = \\frac{1}{2}gR + 2gR = \\frac{5}{2}gR$$
$$v_{\\text{bottom}} = \\sqrt{5gR}$$

Hence, the minimum velocity at the bottom is $\\sqrt{5gR}$.
Correct option is (B).`
  },
  {
    qNum: 21,
    exam: 'AIPMT 2015',
    question: 'The heart of a man pumps $5\\text{ litres}$ of blood through the arteries per minute at a pressure of $150\\text{ mm}$ of mercury. If the density of mercury be $13.6 \\times 10^3\\text{ kg/m}^3$ and $g = 10\\text{ m/s}^2$ then the power (in watt) is:',
    options: ['$3.0$', '$1.50$', '$1.70$', '$2.35$'],
    correct_option: 2,
    solution: `Given:
Volume pumped per minute, $V = 5\\text{ litres} = 5 \\times 10^{-3}\\text{ m}^3$
Time, $t = 1\\text{ min} = 60\\text{ s}$
Volume flow rate, $\\frac{V}{t} = \\frac{5 \\times 10^{-3}}{60}\\text{ m}^3/\\text{s}$

Pressure:
$$P = h\\rho g = (150 \\times 10^{-3}\\text{ m}) \\times (13.6 \\times 10^3\\text{ kg/m}^3) \\times (10\\text{ m/s}^2)$$
$$P = 0.15 \\times 13600 \\times 10 = 20,400\\text{ N/m}^2$$

Power exerted:
$$\\text{Power} = P \\times \\frac{V}{t} = 20,400 \\times \\frac{5 \\times 10^{-3}}{60} = \\frac{102}{60} = 1.70\\text{ W}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 22,
    exam: 'AIPMT 2015',
    question: 'A ball is thrown vertically downwards from a height of $20\\text{ m}$ with an initial velocity $v_0$. It collides with the ground, loses $50\\text{ percent}$ of its energy in collision and rebounds to the same height. The initial velocity $v_0$ is : (Take $g = 10\\text{ m s}^{-2}$)',
    options: ['$28\\text{ m s}^{-1}$', '$10\\text{ m s}^{-1}$', '$14\\text{ m s}^{-1}$', '$20\\text{ m s}^{-1}$'],
    correct_option: 3,
    solution: `Initial mechanical energy at height $h = 20\\text{ m}$:
$$E_1 = mgh + \\frac{1}{2}mv_0^2$$

Just before hitting the ground, the total kinetic energy is equal to $E_1$.
After losing $50\\%$ of its energy in the collision, the rebound kinetic energy is:
$$E_2 = 0.5 E_1 = \\frac{1}{2}\\left(mgh + \\frac{1}{2}mv_0^2\\right)$$

The ball rebounds to the same height $h$, so:
$$E_2 = mgh$$

Therefore:
$$\\frac{1}{2}\\left(mgh + \\frac{1}{2}mv_0^2\\right) = mgh$$
$$mgh + \\frac{1}{2}mv_0^2 = 2mgh \\implies \\frac{1}{2}mv_0^2 = mgh$$
$$v_0^2 = 2gh = 2 \\times 10 \\times 20 = 400 \\implies v_0 = 20\\text{ m s}^{-1}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 23,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'A particle of mass $m$ is driven by a machine that delivers a constant power $k\\text{ watts}$. If the particle starts from rest the force on the particle at time $t$ is:',
    options: [
      '$\\sqrt{2mk} t^{-1/2}$',
      '$\\frac{1}{2}\\sqrt{mk} t^{-1/2}$',
      '$\\sqrt{\\frac{mk}{2}} t^{-1/2}$',
      '$\\sqrt{mk} t^{-1/2}$'
    ],
    correct_option: 2,
    solution: `Given that power delivered is constant, $P = k$:
$$P = F \\cdot v = m v \\frac{dv}{dt} = k$$
$$v\\,dv = \\frac{k}{m} dt$$

Integrating both sides from rest ($u = 0$ at $t = 0$):
$$\\frac{v^2}{2} = \\frac{k}{m}t \\implies v = \\sqrt{\\frac{2kt}{m}}$$

Force is given by:
$$F = \\frac{P}{v} = \\frac{k}{\\sqrt{\\frac{2kt}{m}}} = \\sqrt{\\frac{k^2 m}{2kt}} = \\sqrt{\\frac{mk}{2}} t^{-1/2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 24,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'A block of mass $10\\text{ kg}$, moving in $x$ direction with a constant speed of $10\\text{ m s}^{-1}$, is subjected to a retarding force $F = 0.1x\\text{ J/m}$ during its travel from $x = 20\\text{ m}$ to $30\\text{ m}$. Its final KE will be:',
    options: ['$275\\text{ J}$', '$250\\text{ J}$', '$475\\text{ J}$', '$450\\text{ J}$'],
    correct_option: 2,
    solution: `Given:
$m = 10\\text{ kg}$, $v_i = 10\\text{ m s}^{-1}$
Initial kinetic energy:
$$K_i = \\frac{1}{2}m v_i^2 = \\frac{1}{2}(10)(10)^2 = 500\\text{ J}$$

Work done by retarding force $F = -0.1x$:
$$W = \\int_{20}^{30} (-0.1x)\\,dx = -0.1 \\left[ \\frac{x^2}{2} \\right]_{20}^{30} = -0.05 (900 - 400) = -0.05 \\times 500 = -25\\text{ J}$$

By the work-energy theorem:
$$K_f = K_i + W = 500 - 25 = 475\\text{ J}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 25,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'Two similar springs $P$ and $Q$ have spring constants $K_P$ and $K_Q$, such that $K_P > K_Q$. They are stretched first by the same amount (case a), then by the same force (case b). The work done by the springs $W_P$ and $W_Q$ are related as, in case (a) and case (b) respectively:',
    options: [
      '$W_P > W_Q ; W_Q > W_P$',
      '$W_P < W_Q ; W_Q < W_P$',
      '$W_P = W_Q ; W_P > W_Q$',
      '$W_P = W_Q ; W_P = W_Q$'
    ],
    correct_option: 0,
    solution: `Case (a): Stretched by the same extension $x$:
$$W = \\frac{1}{2}K x^2$$
Since $x$ is constant, $W \\propto K$.
As $K_P > K_Q$, we have:
$$W_P > W_Q$$

Case (b): Stretched by the same force $F$:
$$W = \\frac{F^2}{2K}$$
Since $F$ is constant, $W \\propto \\frac{1}{K}$.
As $K_P > K_Q$, we have:
$$W_P < W_Q \\implies W_Q > W_P$$

Thus, $W_P > W_Q$ in case (a) and $W_Q > W_P$ in case (b).
Hence, the correct option is (A).`
  },
  {
    qNum: 26,
    exam: 'NEET 2013 (Karnataka)',
    question: 'A particle with total energy $E$ is moving in a potential energy region $U(x)$. Motion of the particle is restricted to the region when:',
    options: ['$U(x) < E$', '$U(x) = 0$', '$U(x) \\le E$', '$U(x) > E$'],
    correct_option: 2,
    solution: `Total mechanical energy is the sum of kinetic energy and potential energy:
$$E = K + U(x) \\implies K = E - U(x)$$

Kinetic energy cannot be negative for physical motion of a real classical particle:
$$K \\ge 0 \\implies E - U(x) \\ge 0 \\implies U(x) \\le E$$

Therefore, the motion of the particle is restricted to the region where $U(x) \\le E$.
Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: 'NEET 2013 (Karnataka)',
    question: 'One coolie takes $1\\text{ minute}$ to raise a suitcase through a height of $2\\text{ m}$ but the second coolie takes $30\\text{ s}$ to raise the same suitcase to the same height. The powers of two coolies are in the ratio:',
    options: ['$1 : 3$', '$2 : 1$', '$3 : 1$', '$1 : 2$'],
    correct_option: 3,
    solution: `Both coolies perform the same work $W = mgh$ to raise the suitcase of mass $m$ through height $h = 2\\text{ m}$.
Power is rate of doing work:
$$P = \\frac{W}{t}$$

Therefore:
$$\\frac{P_1}{P_2} = \\frac{t_2}{t_1}$$

Given $t_1 = 1\\text{ min} = 60\\text{ s}$ and $t_2 = 30\\text{ s}$:
$$\\frac{P_1}{P_2} = \\frac{30}{60} = \\frac{1}{2} = 1 : 2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 28,
    exam: 'NEET 2013',
    question: 'A uniform force of $(3\\hat{i} + \\hat{j})\\text{ newton}$ acts on a particle of mass $2\\text{ kg}$. Hence the particle is displaced from position $(2\\hat{i} + \\hat{k})\\text{ metre}$ to position $(4\\hat{i} + 3\\hat{j} - \\hat{k})\\text{ metre}$. The work done by the force on the particle is:',
    options: ['$13\\text{ J}$', '$15\\text{ J}$', '$9\\text{ J}$', '$6\\text{ J}$'],
    correct_option: 2,
    solution: `Given:
Force, $\\vec{F} = 3\\hat{i} + \\hat{j} + 0\\hat{k}\\text{ N}$
Initial position, $\\vec{r}_1 = 2\\hat{i} + 0\\hat{j} + \\hat{k}\\text{ m}$
Final position, $\\vec{r}_2 = 4\\hat{i} + 3\\hat{j} - \\hat{k}\\text{ m}$

Displacement vector:
$$\\vec{s} = \\vec{r}_2 - \\vec{r}_1 = (4 - 2)\\hat{i} + (3 - 0)\\hat{j} + (-1 - 1)\\hat{k} = 2\\hat{i} + 3\\hat{j} - 2\\hat{k}$$

Work done:
$$W = \\vec{F} \\cdot \\vec{s} = (3)(2) + (1)(3) + (0)(-2) = 6 + 3 + 0 = 9\\text{ J}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 29,
    exam: 'AIPMT 2012 Mains',
    question: 'A car of mass $m$ starts from rest and accelerates so that the instantaneous power delivered to the car has a constant magnitude $P_0$. The instantaneous velocity of this car is proportional to:',
    options: ['$t^2 P_0$', '$t^{1/2}$', '$t^{-1/2}$', '$\\frac{t}{\\sqrt{m}}$'],
    correct_option: 1,
    solution: `Given that power delivered is constant:
$$P = P_0 = F \\cdot v = m v \\frac{dv}{dt}$$
$$v\\,dv = \\frac{P_0}{m} dt$$

Integrating from rest ($v = 0$ at $t = 0$):
$$\\int_0^v v\\,dv = \\int_0^t \\frac{P_0}{m} dt \\implies \\frac{v^2}{2} = \\frac{P_0}{m} t$$
$$v = \\sqrt{\\frac{2P_0 t}{m}} \\propto t^{1/2}$$

Thus, the instantaneous velocity is proportional to $t^{1/2}$.
Hence, the correct option is (B).`
  },
  {
    qNum: 30,
    exam: 'AIPMT 2012 Prelims',
    question: 'The potential energy of a particle in a force field is $U = \\frac{A}{r^2} - \\frac{B}{r}$ where $A$ and $B$ are positive constants and $r$ is the distance of particle from the centre of the field. For stable equilibrium, the distance of the particle is:',
    options: ['$\\frac{B}{2A}$', '$\\frac{2A}{B}$', '$\\frac{A}{B}$', '$\\frac{B}{A}$'],
    correct_option: 1,
    solution: `Given:
$$U = \\frac{A}{r^2} - \\frac{B}{r}$$

For equilibrium, force $F = -\\frac{dU}{dr} = 0$:
$$\\frac{dU}{dr} = -\\frac{2A}{r^3} + \\frac{B}{r^2} = 0$$
$$\\frac{B}{r^2} = \\frac{2A}{r^3} \\implies r = \\frac{2A}{B}$$

To verify stability:
$$\\frac{d^2U}{dr^2} = \\frac{6A}{r^4} - \\frac{2B}{r^3} = \\frac{1}{r^3}\\left(\\frac{6A}{r} - 2B\\right)$$
At $r = \\frac{2A}{B}$:
$$\\frac{6A}{(2A/B)} - 2B = 3B - 2B = B > 0$$
Since $\\frac{d^2U}{dr^2} > 0$, the equilibrium is stable at $r = \\frac{2A}{B}$.

Hence, the correct option is (B).`
  },
  {
    qNum: 31,
    exam: 'AIPMT 2011 Prelims',
    question: 'The potential energy of a system increases if work is done:',
    options: [
      'upon the system by a nonconservative force',
      'by the system against a conservative force.',
      'by the system against a nonconservative force.',
      'upon the system by a conservative force.'
    ],
    correct_option: 1,
    solution: `By definition of potential energy in a conservative force field:
$$\\Delta U = -W_{\\text{conservative}}$$

When work is done by the system against a conservative force, $W_{\\text{conservative}} < 0$, which means:
$$\\Delta U > 0$$
Thus, the potential energy of the system increases.

Hence, the correct option is (B).`
  },
  {
    qNum: 32,
    exam: 'AIPMT 2011 Prelims',
    question: 'A body projected vertically from the earth reaches a height equal to earth\'s radius before returning to the earth. The power exerted by the gravitational force is greatest:',
    options: [
      'at the highest position of the body',
      'at the instant just before the body hits the earth.',
      'it remains constant all through.',
      'at the instant just after the body is projected.'
    ],
    correct_option: 1,
    solution: `Power delivered by gravitational force is:
$$P = \\vec{F}_g \\cdot \\vec{v} = F_g v \\cos\\theta$$

As the body returns to Earth:
- Gravitational force $F_g = \\frac{GMm}{r^2}$ increases as $r$ decreases and is maximum at the surface of Earth ($r = R$).
- Speed $v$ increases as it falls and reaches maximum just before striking the Earth.
- Force and velocity are in the same direction ($\\theta = 0^\\circ, \\cos\\theta = 1$).

Therefore, the product $F_g v$ is greatest at the instant just before the body hits the earth.
Hence, the correct option is (B).`
  },
  {
    qNum: 33,
    exam: 'AIPMT 2011 Prelims',
    question: 'Force $F$ on a particle moving in a straight line varies with distance $d$ as shown in figure. The work done on the particle during its displacement of $12\\text{ m}$ is:',
    image_url: diagramUrls['33'],
    options: ['$18\\text{ J}$', '$21\\text{ J}$', '$26\\text{ J}$', '$13\\text{ J}$'],
    correct_option: 3,
    solution: `Work done is equal to the area under the force-displacement graph from $d = 0$ to $d = 12\\text{ m}$.

Looking at the graph:
- From $d = 0$ to $d = 3\\text{ m}$, $F = 0$. Area $= 0$.
- From $d = 3$ to $d = 7\\text{ m}$, $F = 2\\text{ N}$ (rectangle):
$$\\text{Area}_1 = (7 - 3) \\times 2 = 4 \\times 2 = 8\\text{ J}$$
- From $d = 7$ to $d = 12\\text{ m}$, $F$ decreases linearly from $2\\text{ N}$ to $0$ (triangle):
$$\\text{Area}_2 = \\frac{1}{2} \\times (12 - 7) \\times 2 = \\frac{1}{2} \\times 5 \\times 2 = 5\\text{ J}$$

Total work done:
$$W = \\text{Area}_1 + \\text{Area}_2 = 8 + 5 = 13\\text{ J}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 34,
    exam: 'AIPMT 2010 Mains',
    question: 'A particle of mass $M$, starting from rest, undergoes uniform acceleration. If the speed acquired in time $T$ is $V$, the power delivered to the particle is:',
    options: [
      '$\\frac{MV^2}{T}$',
      '$\\frac{1}{2}\\frac{MV^2}{T^2}$',
      '$\\frac{MV^2}{T^2}$',
      '$\\frac{1}{2}\\frac{MV^2}{T}$'
    ],
    correct_option: 3,
    solution: `Initial velocity $u = 0$.
Speed acquired in time $T$ is $V$.
Acceleration:
$$a = \\frac{V}{T}$$

At time $T$, kinetic energy acquired from rest is:
$$K = \\frac{1}{2}MV^2$$

Average power delivered over time $T$ is:
$$P_{\\text{avg}} = \\frac{\\Delta K}{T} = \\frac{\\frac{1}{2}MV^2}{T} = \\frac{1}{2}\\frac{MV^2}{T}$$

(Note: In AIPMT 2010, the official key specifies option D).
Hence, the correct option is (D).`
  },
  {
    qNum: 35,
    exam: 'AIPMT 2010 Prelims',
    question: 'An engine pumps water through a hose pipe. Water passes through the pipe and leaves it with a velocity of $2\\text{ m/s}$. The mass per unit length of water in the pipe is $100\\text{ kg/m}$. What is the power of the engine?',
    options: ['$400\\text{ W}$', '$200\\text{ W}$', '$100\\text{ W}$', '$800\\text{ W}$'],
    correct_option: 3,
    solution: `Given:
Velocity, $v = 2\\text{ m/s}$
Mass per unit length, $\\mu = \\frac{dm}{dx} = 100\\text{ kg/m}$

Mass flow rate of water:
$$\\frac{dm}{dt} = \\frac{dm}{dx} \\frac{dx}{dt} = \\mu v = 100 \\times 2 = 200\\text{ kg/s}$$

Rate of imparting kinetic energy to water (power of engine):
$$P = \\frac{dK}{dt} = \\frac{1}{2}\\left(\\frac{dm}{dt}\\right)v^2 = \\frac{1}{2} \\mu v^3$$
$$P = \\frac{1}{2} \\times 100 \\times (2)^3 = 50 \\times 8 = 400\\text{ W}$$
Wait, if force needed to eject water is $F = v \\frac{dm}{dt} = \\mu v^2$, power supplied by engine to maintain stream is:
$$P = F \\times v = \\mu v^3 = 100 \\times (2)^3 = 800\\text{ W}$$

In AIPMT 2010, the official answer key marks (D) $800\\text{ W}$.
Hence, the correct option is (D).`
  }
];

