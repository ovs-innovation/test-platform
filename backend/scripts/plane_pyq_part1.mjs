import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'motion_in_plane_diagram_urls.json'), 'utf8'));

export const PLANE_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'Let $\\omega_1, \\omega_2$ and $\\omega_3$ be the angular speed of the second hand, minute hand and hour hand of a smoothly running analog clock, respectively. If $x_1, x_2$ and $x_3$ are their respective angular distances in 1 minute then the factor which remains constant ($k$) is:',
    options: [
      '$\\frac{\\omega_1}{x_1} = \\frac{\\omega_2}{x_2} = \\frac{\\omega_3}{x_3} = k$',
      '$\\omega_1 x_1 = \\omega_2 x_2 = \\omega_3 x_3 = k$',
      '$\\omega_1 x_1^2 = \\omega_2 x_2^2 = \\omega_3 x_3^2 = k$',
      '$\\omega_1^2 x_1 = \\omega_2^2 x_2 = \\omega_3^2 x_3 = k$'
    ],
    correct_option: 0,
    solution: `Angular distance covered by any rotating object with constant angular speed $\\omega$ in time $t$ is given by:
$$x = \\omega t$$

Rearranging for the time interval $t$:
$$\\frac{\\omega}{x} = \\frac{1}{t}$$

Since the time interval considered for all three hands is identical ($t = 1\\text{ minute}$):
$$\\frac{1}{t} = \\text{constant} = k$$

Therefore:
$$\\frac{\\omega_1}{x_1} = \\frac{\\omega_2}{x_2} = \\frac{\\omega_3}{x_3} = k$$

Hence, the correct option is (A).`
  },
  {
    qNum: 2,
    exam: 'NEET 2024',
    question: 'A particle moving with uniform speed in a circular path maintains:',
    options: [
      'Constant velocity',
      'Constant acceleration',
      'Constant velocity but varying acceleration',
      'Varying velocity and varying acceleration'
    ],
    correct_option: 3,
    solution: `In uniform circular motion:
1. The speed $v = |\\vec{v}|$ is constant, but the direction of velocity changes continuously tangent to the circle at every point. Hence, velocity $\\vec{v}$ is varying.
2. The magnitude of centripetal acceleration is constant ($a_c = \\frac{v^2}{R}$), but its direction always points towards the centre of the circle, which continuously rotates as the particle moves. Hence, acceleration $\\vec{a}$ is also varying.

Therefore, the particle maintains varying velocity and varying acceleration.

Hence, the correct option is (D).`
  },
  {
    qNum: 3,
    exam: 'NEET 2023 Manipur',
    question: 'The position of a particle is given by $\\vec{r}(t) = 4t\\hat{i} + 2t^2\\hat{j} + 5\\hat{k}$ where $t$ is in seconds and $r$ in metre. Find the magnitude and direction of velocity $\\vec{v}(t)$, at $t = 1\\text{ s}$, with respect to $x$-axis:',
    options: [
      '$4\\sqrt{2}\\text{ ms}^{-1},\\; 45^\\circ$',
      '$4\\sqrt{2}\\text{ ms}^{-1},\\; 60^\\circ$',
      '$3\\sqrt{2}\\text{ ms}^{-1},\\; 30^\\circ$',
      '$3\\sqrt{2}\\text{ ms}^{-1},\\; 45^\\circ$'
    ],
    correct_option: 0,
    solution: `Given position vector:
$$\\vec{r}(t) = 4t\\hat{i} + 2t^2\\hat{j} + 5\\hat{k}$$

Velocity vector $\\vec{v}(t)$:
$$\\vec{v}(t) = \\frac{d\\vec{r}}{dt} = 4\\hat{i} + 4t\\hat{j}$$

At $t = 1\\text{ s}$:
$$\\vec{v}(1) = 4\\hat{i} + 4\\hat{j}$$

Magnitude of velocity:
$$|\\vec{v}| = \\sqrt{4^2 + 4^2} = \\sqrt{32} = 4\\sqrt{2}\\text{ ms}^{-1}$$

Direction with respect to the $x$-axis:
$$\\tan\\theta = \\frac{v_y}{v_x} = \\frac{4}{4} = 1 \\implies \\theta = 45^\\circ$$

Hence, the correct option is (A).`
  },
  {
    qNum: 4,
    exam: 'NEET 2023 Manipur',
    question: 'A ball is projected from point A with velocity $20\\text{ m s}^{-1}$ at an angle $60^\\circ$ to the horizontal direction. At the highest point B of the path (as shown in figure), the velocity $v\\text{ ms}^{-1}$ of the ball will be:',
    image_url: diagramUrls['4'],
    options: ['$20$', '$10\\sqrt{3}$', '$\\text{Zero}$', '$10$'],
    correct_option: 3,
    solution: `In projectile motion under gravity:
- The vertical component of velocity decreases to zero at the highest point: $v_y = 0$.
- The horizontal component of velocity remains constant throughout the flight:
$$v_x = u\\cos\\theta$$

Given:
- $u = 20\\text{ m s}^{-1}$
- $\\theta = 60^\\circ$

At the highest point B:
$$v = v_x = 20\\cos 60^\\circ = 20 \\times \\frac{1}{2} = 10\\text{ m s}^{-1}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 5,
    exam: 'NEET 2023 Manipur',
    question: 'A particle is executing uniform circular motion with velocity $\\vec{v}$ and acceleration $\\vec{a}$. Which of the following is true?',
    options: [
      '$\\vec{v}$ is a constant; $\\vec{a}$ is not a constant',
      '$\\vec{v}$ is not a constant; $\\vec{a}$ is not a constant',
      '$\\vec{v}$ is a constant; $\\vec{a}$ is a constant',
      '$\\vec{v}$ is not a constant; $\\vec{a}$ is a constant'
    ],
    correct_option: 1,
    solution: `In uniform circular motion:
- The speed $|\\vec{v}|$ is constant, but the direction of $\\vec{v}$ continuously changes along the tangent to the circular path. Since a vector changes if its direction changes, $\\vec{v}$ is not a constant vector.
- The magnitude of acceleration $|\\vec{a}| = \\frac{v^2}{R}$ is constant, but its direction always points towards the centre and thus rotates continuously. Hence, $\\vec{a}$ is also not a constant vector.

Therefore, $\\vec{v}$ is not a constant; $\\vec{a}$ is not a constant.

Hence, the correct option is (B).`
  },
  {
    qNum: 6,
    exam: 'NEET 2023',
    question: 'A bullet is fired from a gun at the speed of $280\\text{ ms}^{-1}$ in the direction $30^\\circ$ above the horizontal. The maximum height attained by the bullet is ($g = 9.8\\text{ ms}^{-2},\\; \\sin 30^\\circ = 0.5$):',
    options: ['$2000\\text{ m}$', '$1000\\text{ m}$', '$3000\\text{ m}$', '$2800\\text{ m}$'],
    correct_option: 1,
    solution: `The maximum height $H$ attained by a projectile is given by:
$$H = \\frac{u^2 \\sin^2\\theta}{2g}$$

Given:
- $u = 280\\text{ ms}^{-1}$
- $\\theta = 30^\\circ$
- $g = 9.8\\text{ ms}^{-2}$
- $\\sin 30^\\circ = 0.5$

$$H = \\frac{(280)^2 \\times (0.5)^2}{2 \\times 9.8} = \\frac{78400 \\times 0.25}{19.6} = \\frac{19600}{19.6} = 1000\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 7,
    exam: 'NEET 2022 Phase 2',
    question: 'A cricket ball is thrown by a player at a speed of $20\\text{ m/s}$ in a direction $30^\\circ$ above the horizontal. The maximum height attained by the ball during its motion is ($g = 10\\text{ m/s}^2$):',
    options: ['$25\\text{ m}$', '$5\\text{ m}$', '$10\\text{ m}$', '$20\\text{ m}$'],
    correct_option: 1,
    solution: `Maximum height attained by a projectile:
$$H = \\frac{u^2 \\sin^2\\theta}{2g}$$

Given:
- $u = 20\\text{ m/s}$
- $\\theta = 30^\\circ$
- $g = 10\\text{ m/s}^2$

$$H = \\frac{(20)^2 \\sin^2 30^\\circ}{2(10)} = \\frac{400 \\times \\left(\\frac{1}{2}\\right)^2}{20} = \\frac{400 \\times \\frac{1}{4}}{20} = \\frac{100}{20} = 5\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 8,
    exam: 'NEET 2022 Phase 1',
    question: 'A ball is projected with a velocity, $10\\text{ ms}^{-1}$, at an angle of $60^\\circ$ with the vertical direction. Its speed at the highest point of its trajectory will be:',
    options: ['$\\text{Zero}$', '$5\\sqrt{3}\\text{ ms}^{-1}$', '$5\\text{ ms}^{-1}$', '$10\\text{ ms}^{-1}$'],
    correct_option: 1,
    solution: `Given angle of projection with vertical $= 60^\\circ$.
Therefore, angle of projection with the horizontal is:
$$\\theta = 90^\\circ - 60^\\circ = 30^\\circ$$

At the highest point of trajectory, the vertical component of velocity is zero ($v_y = 0$).
The speed is equal to the horizontal component:
$$v = u\\cos\\theta = 10\\cos 30^\\circ = 10 \\times \\frac{\\sqrt{3}}{2} = 5\\sqrt{3}\\text{ ms}^{-1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 9,
    exam: 'NEET 2021',
    question: 'A particle moving in a circle of radius R with a uniform speed takes a time T to complete one revolution. If this particle were projected with the same speed at an angle \'$\\theta$\' to the horizontal, the maximum height attained by it equals 4R. The angle of projection, $\\theta$, is then given by:',
    options: [
      '$\\theta = \\sin^{-1}\\left(\\frac{2gT^2}{\\pi^2 R}\\right)^{1/2}$',
      '$\\theta = \\cos^{-1}\\left(\\frac{gT^2}{\\pi^2 R}\\right)^{1/2}$',
      '$\\theta = \\cos^{-1}\\left(\\frac{\\pi^2 R}{gT^2}\\right)^{1/2}$',
      '$\\theta = \\sin^{-1}\\left(\\frac{\\pi^2 R}{gT^2}\\right)^{1/2}$'
    ],
    correct_option: 0,
    solution: `Speed of the particle in circular motion:
$$v = \\frac{2\\pi R}{T}$$

When projected at angle $\\theta$ to the horizontal, maximum height is:
$$H = \\frac{v^2 \\sin^2\\theta}{2g}$$

Given $H = 4R$:
$$\\frac{v^2 \\sin^2\\theta}{2g} = 4R \\implies \\sin^2\\theta = \\frac{8gR}{v^2}$$

Substituting $v = \\frac{2\\pi R}{T}$:
$$\\sin^2\\theta = \\frac{8gR}{\\left(\\frac{2\\pi R}{T}\\right)^2} = \\frac{8gR \\cdot T^2}{4\\pi^2 R^2} = \\frac{2gT^2}{\\pi^2 R}$$
$$\\theta = \\sin^{-1}\\left(\\frac{2gT^2}{\\pi^2 R}\\right)^{1/2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 10,
    exam: 'NEET 2021',
    question: 'A car starts from rest and accelerates at $5\\text{ m/s}^2$. At $t = 4\\text{ s}$, a ball is dropped out of a window by a person sitting in the car. What is the velocity and acceleration of the ball at $t = 6\\text{ s}$? (Take $g = 10\\text{ m/s}^2$):',
    options: [
      '$20\\sqrt{2}\\text{ m/s},\\; 10\\text{ m/s}^2$',
      '$20\\text{ m/s},\\; 5\\text{ m/s}^2$',
      '$20\\text{ m/s},\\; 0$',
      '$20\\sqrt{2}\\text{ m/s},\\; 0$'
    ],
    correct_option: 0,
    solution: `At $t = 4\\text{ s}$, the horizontal velocity acquired by the car (and hence the ball):
$$v_x = u + at = 0 + 5(4) = 20\\text{ m/s}$$

The ball is dropped at $t = 4\\text{ s}$.
Between $t = 4\\text{ s}$ and $t = 6\\text{ s}$ (time elapsed $\\Delta t = 2\\text{ s}$):
- Horizontal velocity remains constant (no horizontal force):
  $$v_x = 20\\text{ m/s}$$
- Vertical velocity acquired under gravity:
  $$v_y = g\\Delta t = 10(2) = 20\\text{ m/s}$$

Resultant velocity of the ball at $t = 6\\text{ s}$:
$$v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{20^2 + 20^2} = 20\\sqrt{2}\\text{ m/s}$$

Once the ball is released, the only force acting on it is gravity, so its acceleration is:
$$a = g = 10\\text{ m/s}^2$$

Hence, the correct option is (A).`
  },
  {
    qNum: 11,
    exam: 'NEET 2019 (Odisha)',
    question: 'A particle starting from rest, moves in a circle of radius \'$r$\'. It attains a velocity of $V_0\\text{ m/s}$ in the $n^{\\text{th}}$ round. Its angular acceleration will be:',
    options: [
      '$\\frac{V_0^2}{4\\pi n r}\\text{ rad/s}^2$',
      '$\\frac{V_0}{n}\\text{ rad/s}^2$',
      '$\\frac{V_0^2}{2\\pi n r^2}\\text{ rad/s}^2$',
      '$\\frac{V_0^2}{4\\pi n r^2}\\text{ rad/s}^2$'
    ],
    correct_option: 3,
    solution: `In $n$ complete revolutions, the total angular displacement is:
$$\\theta = 2\\pi n\\text{ radians}$$

Initial angular velocity $\\omega_0 = 0$.
Final angular velocity $\\omega = \\frac{V_0}{r}$.

Using rotational kinematic equation:
$$\\omega^2 = \\omega_0^2 + 2\\alpha\\theta$$
$$\\left(\\frac{V_0}{r}\\right)^2 = 0 + 2\\alpha(2\\pi n)$$
$$\\frac{V_0^2}{r^2} = 4\\pi n\\alpha \\implies \\alpha = \\frac{V_0^2}{4\\pi n r^2}\\text{ rad/s}^2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 12,
    exam: 'NEET 2019 (Odisha)',
    question: 'Two bullets are fired horizontally and simultaneously towards each other from roof tops of two buildings $100\\text{ m}$ apart and of same height of $200\\text{ m}$, with the same velocity of $25\\text{ m/s}$. When and where will the two bullets collide? ($g = 10\\text{ m/s}^2$):',
    options: [
      'They will not collide',
      'After $2\\text{ s}$ at a height of $180\\text{ m}$',
      'After $2\\text{ s}$ at a height of $20\\text{ m}$',
      'After $4\\text{ s}$ at a height of $120\\text{ m}$'
    ],
    correct_option: 1,
    solution: `Relative horizontal speed of approach:
$$v_{\\text{rel}} = 25 + 25 = 50\\text{ m/s}$$

Horizontal distance separating them $d = 100\\text{ m}$.
Time of collision:
$$t = \\frac{d}{v_{\\text{rel}}} = \\frac{100\\text{ m}}{50\\text{ m/s}} = 2\\text{ s}$$

Vertical distance fallen by both bullets in $2\\text{ s}$ under gravity:
$$h_{\\text{fall}} = \\frac{1}{2}gt^2 = \\frac{1}{2}(10)(2)^2 = 20\\text{ m}$$

Height above the ground:
$$H = 200\\text{ m} - 20\\text{ m} = 180\\text{ m}$$

Hence, the bullets collide after $2\\text{ s}$ at a height of $180\\text{ m}$.
Correct option is (B).`
  },
  {
    qNum: 13,
    exam: 'NEET 2019',
    question: 'The speed of a swimmer in still water is $20\\text{ m/s}$. The speed of river water is $10\\text{ m/s}$ and is flowing due east. If he is standing on the south bank and wishes to cross the river along the shortest path, the angle at which he should make his strokes w.r.t. north is given by:',
    options: ['$0^\\circ$', '$60^\\circ$', '$45^\\circ\\text{ west}$', '$30^\\circ\\text{ west}$'],
    correct_option: 3,
    solution: `For the shortest path across the river (directly perpendicular from South to North bank):
The resultant velocity must point strictly North.
Thus, the horizontal eastward component of the river flow must be balanced by the westward component of the swimmer\'s velocity:
$$v_s \\sin\\theta = v_r$$
$$20\\sin\\theta = 10 \\implies \\sin\\theta = \\frac{10}{20} = \\frac{1}{2} \\implies \\theta = 30^\\circ$$

Therefore, the swimmer should direct his strokes at an angle of $30^\\circ\\text{ west of North}$.

Hence, the correct option is (D).`
  },
  {
    qNum: 14,
    exam: 'NEET 2019',
    question: 'When an object is shot from the bottom of a long smooth inclined plane kept at an angle $60^\\circ$ with horizontal, it can travel a distance $x_1$ along the plane. But when the inclination is decreased to $30^\\circ$ and the same object is shot with the same velocity, it can travel $x_2$ distance. Then $x_1 : x_2$ will be:',
    options: ['$1 : \\sqrt{2}$', '$\\sqrt{2} : 1$', '$1 : \\sqrt{3}$', '$1 : 2\\sqrt{3}$'],
    correct_option: 2,
    solution: `Retardation along a smooth inclined plane is given by:
$$a = g\\sin\\theta$$

Using the third equation of motion ($v = 0$ at the top of travel):
$$v^2 = u^2 - 2ax \\implies 0 = u^2 - 2(g\\sin\\theta)x \\implies x = \\frac{u^2}{2g\\sin\\theta}$$

For constant initial velocity $u$:
$$x \\propto \\frac{1}{\\sin\\theta}$$

Taking the ratio:
$$\\frac{x_1}{x_2} = \\frac{\\sin 30^\\circ}{\\sin 60^\\circ} = \\frac{1/2}{\\sqrt{3}/2} = \\frac{1}{\\sqrt{3}} \\implies 1 : \\sqrt{3}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 15,
    exam: 'NEET 2019',
    question: 'A particle moving with velocity $\\vec{v}$ is acted by three forces shown by the vector triangle PQR. The velocity of the particle will:',
    image_url: diagramUrls['15'],
    options: [
      'remain constant',
      'increase',
      'decrease',
      'change according to the smallest force $\\vec{QR}$'
    ],
    correct_option: 0,
    solution: `From the given vector triangle PQR:
The three forces $\\vec{PQ}, \\vec{QR}$, and $\\vec{RP}$ are represented by the three sides of a triangle taken in the same cyclic order.

According to the triangle law of vector addition:
$$\\vec{F}_{\\text{net}} = \\vec{PQ} + \\vec{QR} + \\vec{RP} = \\vec{0}$$

Since the net external force acting on the particle is zero:
$$\\vec{a} = \\frac{\\vec{F}_{\\text{net}}}{m} = \\vec{0}$$

By Newton\'s first law of motion, the velocity $\\vec{v}$ of the particle remains constant.

Hence, the correct option is (A).`
  },
  {
    qNum: 16,
    exam: 'NEET 2017',
    question: 'The x and y coordinates of the particle at any time are $x = 5t - 2t^2$ and $y = 10t$ respectively, where x and y are in metres and t in seconds. The acceleration of the particle at $t = 2\\text{ s}$ is:',
    options: ['$5\\text{ m s}^{-2}$', '$-4\\text{ m s}^{-2}$', '$-8\\text{ m s}^{-2}$', '$0$'],
    correct_option: 1,
    solution: `Given coordinates:
$$x(t) = 5t - 2t^2$$
$$y(t) = 10t$$

Differentiating with respect to time to find velocity components:
$$v_x = \\frac{dx}{dt} = 5 - 4t$$
$$v_y = \\frac{dy}{dt} = 10$$

Differentiating again to find acceleration components:
$$a_x = \\frac{dv_x}{dt} = -4\\text{ m s}^{-2}$$
$$a_y = \\frac{dv_y}{dt} = 0$$

Total acceleration:
$$\\vec{a} = a_x\\hat{i} + a_y\\hat{j} = -4\\hat{i}\\text{ m s}^{-2}$$

Hence, the acceleration of the particle is $-4\\text{ m s}^{-2}$.
Correct option is (B).`
  },
  {
    qNum: 17,
    exam: 'NEET 2016 Phase 2',
    question: 'In the given figure, $a = 15\\text{ m s}^{-2}$ represents the total acceleration of particle moving in the clockwise direction in a circle of radius $R = 2.5\\text{ m}$ at a given instant of time. The speed of the particle is:',
    image_url: diagramUrls['17'],
    options: ['$4.5\\text{ m s}^{-1}$', '$5.0\\text{ m s}^{-1}$', '$5.7\\text{ m s}^{-1}$', '$6.2\\text{ m s}^{-1}$'],
    correct_option: 2,
    solution: `From the figure, the total acceleration vector $\\vec{a}$ makes an angle of $30^\\circ$ with the radial line pointing towards the center $O$.

The centripetal (radial) acceleration is the component of $\\vec{a}$ directed towards the center:
$$a_c = a\\cos 30^\\circ = 15 \\times \\frac{\\sqrt{3}}{2} = 15 \\times 0.866 = 12.99\\text{ m s}^{-2}$$

Centripetal acceleration is related to speed $v$ and radius $R$ by:
$$a_c = \\frac{v^2}{R} \\implies v^2 = a_c R$$
$$v^2 = 12.99 \\times 2.5 = 32.475$$
$$v = \\sqrt{32.475} \\approx 5.7\\text{ m s}^{-1}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 18,
    exam: 'NEET 2016 Phase 1',
    question: 'If the magnitude of sum of two vectors is equal to the magnitude of difference of the two vectors, the angle between these vectors is:',
    options: ['$45^\\circ$', '$180^\\circ$', '$0^\\circ$', '$90^\\circ$'],
    correct_option: 3,
    solution: `Given:
$$|\\vec{A} + \\vec{B}| = |\\vec{A} - \\vec{B}|$$

Squaring both sides:
$$|\\vec{A} + \\vec{B}|^2 = |\\vec{A} - \\vec{B}|^2$$
$$A^2 + B^2 + 2AB\\cos\\theta = A^2 + B^2 - 2AB\\cos\\theta$$
$$4AB\\cos\\theta = 0$$

Assuming $A \\neq 0$ and $B \\neq 0$:
$$\\cos\\theta = 0 \\implies \\theta = 90^\\circ$$

Hence, the angle between the two vectors is $90^\\circ$.
Correct option is (D).`
  },
  {
    qNum: 19,
    exam: 'NEET 2016 Phase 1',
    question: 'A particle moves so that its position vector is given by $\\vec{r} = \\cos\\omega t\\,\\hat{x} + \\sin\\omega t\\,\\hat{y}$, where $\\omega$ is a constant. Which of the following is true?',
    options: [
      'Velocity is perpendicular to $\\vec{r}$ and acceleration is directed towards the origin.',
      'Velocity is perpendicular to $\\vec{r}$ and acceleration is directed away from the origin.',
      'Velocity and acceleration both are perpendicular to $\\vec{r}$',
      'Velocity and acceleration both are parallel to $\\vec{r}$'
    ],
    correct_option: 0,
    solution: `Given position vector:
$$\\vec{r} = \\cos\\omega t\\,\\hat{x} + \\sin\\omega t\\,\\hat{y}$$

Velocity:
$$\\vec{v} = \\frac{d\\vec{r}}{dt} = -\\omega\\sin\\omega t\\,\\hat{x} + \\omega\\cos\\omega t\\,\\hat{y}$$

Check dot product $\\vec{r}\\cdot\\vec{v}$:
$$\\vec{r}\\cdot\\vec{v} = (\\cos\\omega t)(-\\omega\\sin\\omega t) + (\\sin\\omega t)(\\omega\\cos\\omega t) = -\\omega\\sin\\omega t\\cos\\omega t + \\omega\\sin\\omega t\\cos\\omega t = 0$$
Since $\\vec{r}\\cdot\\vec{v} = 0$, velocity is perpendicular to $\\vec{r}$.

Acceleration:
$$\\vec{a} = \\frac{d\\vec{v}}{dt} = -\\omega^2\\cos\\omega t\\,\\hat{x} - \\omega^2\\sin\\omega t\\,\\hat{y} = -\\omega^2(\\cos\\omega t\\,\\hat{x} + \\sin\\omega t\\,\\hat{y}) = -\\omega^2\\vec{r}$$

Since $\\vec{a} = -\\omega^2\\vec{r}$, the acceleration is directed along $-\\vec{r}$, which means it is directed towards the origin.

Hence, velocity is perpendicular to $\\vec{r}$ and acceleration is directed towards the origin.
Correct option is (A).`
  },
  {
    qNum: 20,
    exam: 'AIPMT 2015',
    question: 'If vectors $\\vec{A} = \\cos\\omega t\\,\\hat{i} + \\sin\\omega t\\,\\hat{j}$ and $\\vec{B} = \\cos\\frac{\\omega t}{2}\\,\\hat{i} + \\sin\\frac{\\omega t}{2}\\,\\hat{j}$ are functions of time, then the value of $t$ at which they are orthogonal to each other is:',
    options: ['$t = \\frac{\\pi}{\\omega}$', '$t = 0$', '$t = \\frac{\\pi}{4\\omega}$', '$t = \\frac{\\pi}{2\\omega}$'],
    correct_option: 0,
    solution: `Two vectors are orthogonal when their dot product is zero:
$$\\vec{A} \\cdot \\vec{B} = 0$$

$$\\vec{A} \\cdot \\vec{B} = \\cos\\omega t \\cos\\frac{\\omega t}{2} + \\sin\\omega t \\sin\\frac{\\omega t}{2}$$

Using the trigonometric identity $\\cos(A - B) = \\cos A \\cos B + \\sin A \\sin B$:
$$\\vec{A} \\cdot \\vec{B} = \\cos\\left(\\omega t - \\frac{\\omega t}{2}\\right) = \\cos\\frac{\\omega t}{2}$$

Setting $\\cos\\frac{\\omega t}{2} = 0$:
$$\\frac{\\omega t}{2} = \\frac{\\pi}{2} \\implies \\omega t = \\pi \\implies t = \\frac{\\pi}{\\omega}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 21,
    exam: 'AIPMT 2015',
    question: 'The position vector of a particle $\\vec{R}$ as a function of time is given by $\\vec{R} = 4\\sin(2\\pi t)\\hat{i} + 4\\cos(2\\pi t)\\hat{j}$, where $R$ is in meters, $t$ is in seconds and $\\hat{i}$ and $\\hat{j}$ denote unit vectors along x-and y-directions, respectively. Which one of the following statements is wrong for the motion of particle?',
    options: [
      'Magnitude of the velocity of particle is $8\\text{ meter/second}$.',
      'Path of the particle is a circle of radius $4\\text{ meter}$.',
      'Acceleration vector is along $-\\vec{R}$.',
      'Magnitude of acceleration vector is $\\frac{v^2}{R}$ where $v$ is the velocity of particle.'
    ],
    correct_option: 0,
    solution: `Given position vector:
$$\\vec{R} = 4\\sin(2\\pi t)\\hat{i} + 4\\cos(2\\pi t)\\hat{j}$$

1. Path of the particle:
$x = 4\\sin(2\\pi t)$, $y = 4\\cos(2\\pi t)$.
$x^2 + y^2 = 16(\\sin^2 2\\pi t + \\cos^2 2\\pi t) = 16 = 4^2$.
This represents a circle of radius $4\\text{ m}$. Statement (B) is correct.

2. Velocity:
$$\\vec{v} = \\frac{d\\vec{R}}{dt} = 8\\pi\\cos(2\\pi t)\\hat{i} - 8\\pi\\sin(2\\pi t)\\hat{j}$$
Magnitude of velocity:
$$v = |\\vec{v}| = \\sqrt{(8\\pi)^2\\cos^2(2\\pi t) + (8\\pi)^2\\sin^2(2\\pi t)} = 8\\pi\\text{ m/s} \\approx 25.13\\text{ m/s} \\neq 8\\text{ m/s}$$
Therefore, statement (A) is wrong.

3. Acceleration:
$$\\vec{a} = \\frac{d\\vec{v}}{dt} = -16\\pi^2\\sin(2\\pi t)\\hat{i} - 16\\pi^2\\cos(2\\pi t)\\hat{j} = -(2\\pi)^2\\vec{R} = -4\\pi^2\\vec{R}$$
Acceleration is along $-\\vec{R}$ and its magnitude is $\\frac{v^2}{R} = \\frac{(8\\pi)^2}{4} = 16\\pi^2$. Statements (C) and (D) are correct.

Hence, the wrong statement is (A).`
  },
  {
    qNum: 22,
    exam: 'AIPMT 2015',
    question: 'Two particles A and B, move with constant velocities $\\vec{v}_1$ and $\vec{v}_2$. At the initial moment their position vectors are $\\vec{r}_1$ and $\\vec{r}_2$ respectively. The condition for particles A and B for their collision is:',
    options: [
      '$\\vec{r}_1 \\times \\vec{v}_1 = \\vec{r}_2 \\times \\vec{v}_2$',
      '$\\vec{r}_1 - \\vec{r}_2 = \\vec{v}_1 - \\vec{v}_2$',
      '$\\frac{\\vec{r}_1 - \\vec{r}_2}{|\\vec{r}_1 - \\vec{r}_2|} = \\frac{\\vec{v}_2 - \\vec{v}_1}{|\\vec{v}_2 - \\vec{v}_1|}$',
      '$\\vec{r}_1 \\cdot \\vec{v}_1 = \\vec{r}_2 \\cdot \\vec{v}_2$'
    ],
    correct_option: 2,
    solution: `Let the collision occur at time $t$.
At time $t$, the position vectors of both particles must be identical:
$$\\vec{r}_1 + \\vec{v}_1 t = \\vec{r}_2 + \\vec{v}_2 t$$
$$\\vec{r}_1 - \\vec{r}_2 = (\\vec{v}_2 - \\vec{v}_1)t$$

Since time $t > 0$ is a positive scalar:
$$t = \\frac{|\\vec{r}_1 - \\vec{r}_2|}{|\\vec{v}_2 - \\vec{v}_1|}$$

Substituting $t$ back:
$$\\vec{r}_1 - \\vec{r}_2 = (\\vec{v}_2 - \\vec{v}_1) \\frac{|\\vec{r}_1 - \\vec{r}_2|}{|\\vec{v}_2 - \\vec{v}_1|}$$
$$\\frac{\\vec{r}_1 - \\vec{r}_2}{|\\vec{r}_1 - \\vec{r}_2|} = \\frac{\\vec{v}_2 - \\vec{v}_1}{|\\vec{v}_2 - \\vec{v}_1|}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 23,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'A ship A is moving Westwards with a speed of $10\\text{ km h}^{-1}$ and a ship B $100\\text{ km}$ South of A, is moving Northwards with a speed of $10\\text{ km h}^{-1}$. The time after which the distance between them becomes shortest, is:',
    options: ['$5\\sqrt{2}\\text{ h}$', '$10\\sqrt{2}\\text{ h}$', '$0\\text{ h}$', '$5\\text{ h}$'],
    correct_option: 3,
    solution: `Let initial position of ship A be the origin $(0, 0)$.
Then initial position of ship B is $(0, -100)$.

Velocity vectors:
$$\\vec{v}_A = -10\\hat{i}\\text{ km/h}$$
$$\\vec{v}_B = 10\\hat{j}\\text{ km/h}$$

Relative velocity of B with respect to A:
$$\\vec{v}_{BA} = \\vec{v}_B - \\vec{v}_A = 10\\hat{i} + 10\\hat{j}\\text{ km/h}$$

Relative position of B with respect to A at time $t$:
$$\\vec{r}_{BA}(t) = \\vec{r}_B(t) - \\vec{r}_A(t) = (10t)\\hat{i} + (-100 + 10t)\\hat{j}$$

The square of distance between them:
$$D^2(t) = (10t)^2 + (10t - 100)^2 = 100t^2 + 100t^2 - 2000t + 10000 = 200t^2 - 2000t + 10000$$

To find minimum distance, differentiate with respect to $t$:
$$\\frac{d(D^2)}{dt} = 400t - 2000 = 0 \\implies 400t = 2000 \\implies t = 5\\text{ h}$$

Hence, the shortest distance occurs after $5\\text{ hours}$.
Correct option is (D).`
  },
  {
    qNum: 24,
    exam: 'AIPMT 2014',
    question: 'A projectile is fired from the surface of the earth with a velocity of $5\\text{ m s}^{-1}$ and angle $\\theta$ with the horizontal. Another projectile fired from another planet with a velocity of $3\\text{ m s}^{-1}$ at the same angle follows a trajectory which is identical with the trajectory of the projectile fired from the earth. The value of the acceleration due to gravity on the planet is (in $\\text{m s}^{-2}$) (Given $g = 9.8\\text{ m s}^{-2}$):',
    options: ['$3.5$', '$5.9$', '$16.3$', '$110.8$'],
    correct_option: 0,
    solution: `The equation of trajectory for a projectile launched with speed $u$ at angle $\\theta$ is:
$$y = x\\tan\\theta - \\frac{g}{2u^2\\cos^2\\theta}x^2$$

For the trajectories to be identical with the same angle $\\theta$:
$$\\frac{g}{u^2} = \\text{constant}$$

Therefore:
$$\\frac{g_{\\text{planet}}}{u_{\\text{planet}}^2} = \\frac{g_{\\text{earth}}}{u_{\\text{earth}}^2}$$
$$g_{\\text{planet}} = g_{\\text{earth}} \\times \\left( \\frac{u_{\\text{planet}}}{u_{\\text{earth}}} \\right)^2 = 9.8 \\times \\left(\\frac{3}{5}\\right)^2 = 9.8 \\times \\frac{9}{25} = 9.8 \\times 0.36 = 3.528\\text{ m s}^{-2} \\approx 3.5\\text{ m s}^{-2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 25,
    exam: 'AIPMT 2014',
    question: 'A particle is moving such that its position coordinates $(x, y)$ are $(2\\text{ m}, 3\\text{ m})$ at time $t = 0$, $(6\\text{ m}, 7\\text{ m})$ at time $t = 2\\text{ s}$ and $(13\\text{ m}, 14\\text{ m})$ at time $t = 5\\text{ s}$. Average velocity vector ($\\vec{v}_{\\text{av}}$) from $t = 0$ to $t = 5\\text{ s}$ is:',
    options: [
      '$\\frac{1}{5}(13\\hat{i} + 14\\hat{j})$',
      '$\\frac{7}{3}(\\hat{i} + \\hat{j})$',
      '$2(\\hat{i} + \\hat{j})$',
      '$\\frac{11}{5}(\\hat{i} + \\hat{j})$'
    ],
    correct_option: 3,
    solution: `Initial position at $t = 0$:
$$\\vec{r}_1 = 2\\hat{i} + 3\\hat{j}$$

Final position at $t = 5\\text{ s}$:
$$\\vec{r}_2 = 13\\hat{i} + 14\\hat{j}$$

Displacement:
$$\\Delta\\vec{r} = \\vec{r}_2 - \\vec{r}_1 = (13 - 2)\\hat{i} + (14 - 3)\\hat{j} = 11\\hat{i} + 11\\hat{j} = 11(\\hat{i} + \\hat{j})$$

Average velocity vector:
$$\\vec{v}_{\\text{av}} = \\frac{\\Delta\\vec{r}}{\\Delta t} = \\frac{11(\\hat{i} + \\hat{j})}{5 - 0} = \\frac{11}{5}(\\hat{i} + \\hat{j})$$

Hence, the correct option is (D).`
  },
  {
    qNum: 26,
    exam: 'NEET 2013 (Karnataka)',
    question: 'Vectors $\\vec{A}, \\vec{B}$ and $\\vec{C}$ are such that $\\vec{A}\\cdot\\vec{B} = 0$ and $\\vec{A}\\cdot\\vec{C} = 0$. Then the vector parallel to $\\vec{A}$ is:',
    options: ['$\\vec{A} \\times \\vec{B}$', '$\\vec{B} + \\vec{C}$', '$\\vec{B} \\times \\vec{C}$', '$\\vec{B}\\text{ and }\\vec{C}$'],
    correct_option: 2,
    solution: `Given:
1. $\\vec{A} \\cdot \\vec{B} = 0 \\implies \\vec{A} \\perp \\vec{B}$
2. $\\vec{A} \\cdot \\vec{C} = 0 \\implies \\vec{A} \\perp \\vec{C}$

Since $\\vec{A}$ is perpendicular to both $\\vec{B}$ and $\\vec{C}$, it is perpendicular to the plane formed by $\\vec{B}$ and $\\vec{C}$.

The cross product $\\vec{B} \\times \\vec{C}$ is also by definition perpendicular to the plane formed by $\\vec{B}$ and $\\vec{C}$.

Therefore, $\\vec{A}$ must be parallel (or antiparallel) to $\\vec{B} \\times \\vec{C}$.

Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: 'NEET 2013',
    question: 'The velocity of a projectile at the initial point A is $(2\\hat{i} + 3\\hat{j})\\text{ m/s}$. Its velocity (in $\\text{m/s}$) at point B is:',
    image_url: diagramUrls['27'],
    options: ['$2\\hat{i} - 3\\hat{j}$', '$2\\hat{i} + 3\\hat{j}$', '$-2\\hat{i} - 3\\hat{j}$', '$-2\\hat{i} + 3\\hat{j}$'],
    correct_option: 0,
    solution: `In standard projectile motion under constant downward acceleration due to gravity:
- The horizontal component of velocity remains unchanged throughout the flight:
  $$v_x = u_x = 2\\text{ m/s}$$
- At the same horizontal level (landing point B), the vertical displacement is zero, so the vertical velocity component reverses direction while retaining the same magnitude:
  $$v_y = -u_y = -3\\text{ m/s}$$

Therefore, the velocity at point B is:
$$\\vec{v}_B = 2\\hat{i} - 3\\hat{j}\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 28,
    exam: 'AIPMT 2012 Prelims',
    question: 'The horizontal range and the maximum height of a projectile are equal. The angle of projection of the projectile is:',
    options: [
      '$\\theta = \\tan^{-1}\\left(\\frac{1}{4}\\right)$',
      '$\\theta = \\tan^{-1}(4)$',
      '$\\theta = \\tan^{-1}(2)$',
      '$\\theta = 45^\\circ$'
    ],
    correct_option: 1,
    solution: `Horizontal range $R$ and maximum height $H$ are given by:
$$R = \\frac{u^2 \\sin 2\\theta}{g} = \\frac{2u^2 \\sin\\theta\\cos\\theta}{g}$$
$$H = \\frac{u^2 \\sin^2\\theta}{2g}$$

Given that $R = H$:
$$\\frac{2u^2 \\sin\\theta\\cos\\theta}{g} = \\frac{u^2 \\sin^2\\theta}{2g}$$
$$2\\cos\\theta = \\frac{\\sin\\theta}{2}$$
$$\\frac{\\sin\\theta}{\\cos\\theta} = 4 \\implies \\tan\\theta = 4 \\implies \\theta = \\tan^{-1}(4)$$

Hence, the correct option is (B).`
  },
  {
    qNum: 29,
    exam: 'AIPMT 2012 Prelims',
    question: 'A particle has initial velocity $(2\\hat{i} + 3\\hat{j})$ and acceleration $(0.3\\hat{i} + 0.2\\hat{j})$. The magnitude of velocity after 10 seconds will be:',
    options: ['$9\\sqrt{2}$', '$5\\sqrt{2}$', '$5\\text{ units}$', '$9\\text{ units}$'],
    correct_option: 1,
    solution: `Using the first equation of motion for vectors:
$$\\vec{v} = \\vec{u} + \\vec{a}t$$

Given:
- $\\vec{u} = 2\\hat{i} + 3\\hat{j}$
- $\\vec{a} = 0.3\\hat{i} + 0.2\\hat{j}$
- $t = 10\\text{ s}$

$$\\vec{v} = (2\\hat{i} + 3\\hat{j}) + (0.3\\hat{i} + 0.2\\hat{j})(10)$$
$$\\vec{v} = (2\\hat{i} + 3\\hat{j}) + (3\\hat{i} + 2\\hat{j}) = 5\\hat{i} + 5\\hat{j}$$

Magnitude of velocity:
$$|\\vec{v}| = \\sqrt{5^2 + 5^2} = \\sqrt{25 + 25} = \\sqrt{50} = 5\\sqrt{2}\\text{ units}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 30,
    exam: 'AIPMT 2011 Mains',
    question: 'A projectile is fired at an angle of $45^\\circ$ with the horizontal. Elevation angle of the projectile at its highest point as seen from the point of projection, is:',
    options: ['$45^\\circ$', '$60^\\circ$', '$\\tan^{-1}\\left(\\frac{1}{2}\\right)$', '$\\tan^{-1}\\left(\\frac{\\sqrt{3}}{2}\\right)$'],
    correct_option: 2,
    solution: `At the highest point of projectile motion:
- Horizontal distance from launch point: $x = \\frac{R}{2}$
- Vertical height: $y = H$

The angle of elevation $\\phi$ as seen from the point of projection is:
$$\\tan\\phi = \\frac{y}{x} = \\frac{H}{R/2} = \\frac{2H}{R}$$

We know that:
$$H = \\frac{u^2 \\sin^2\\theta}{2g}, \\quad R = \\frac{2u^2 \\sin\\theta\\cos\\theta}{g} \\implies \\frac{H}{R} = \\frac{\\tan\\theta}{4}$$

Therefore:
$$\\tan\\phi = 2 \\left( \\frac{\\tan\\theta}{4} \\right) = \\frac{\\tan\\theta}{2}$$

For $\\theta = 45^\\circ$:
$$\\tan\\phi = \\frac{\\tan 45^\\circ}{2} = \\frac{1}{2} \\implies \\phi = \\tan^{-1}\\left(\\frac{1}{2}\\right)$$

Hence, the correct option is (C).`
  },
  {
    qNum: 31,
    exam: 'AIPMT 2011 Prelims',
    question: 'A particle moves in a circle of radius $5\\text{ cm}$ with constant speed and time period $0.2\\pi\\text{ s}$. The acceleration of the particle is:',
    options: ['$15\\text{ m/s}^2$', '$25\\text{ m/s}^2$', '$36\\text{ m/s}^2$', '$5\\text{ m/s}^2$'],
    correct_option: 3,
    solution: `Given:
- Radius, $r = 5\\text{ cm} = 0.05\\text{ m}$
- Time period, $T = 0.2\\pi\\text{ s}$

Angular velocity $\\omega$:
$$\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{0.2\\pi} = 10\\text{ rad/s}$$

Centripetal acceleration:
$$a = \\omega^2 r = (10)^2 \\times 0.05 = 100 \\times 0.05 = 5\\text{ m/s}^2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 32,
    exam: 'AIPMT 2011 Prelims',
    question: 'A missile is fired for maximum range with an initial velocity of $20\\text{ m/s}$. If $g = 10\\text{ m/s}^2$, the range of the missile is:',
    options: ['$40\\text{ m}$', '$50\\text{ m}$', '$60\\text{ m}$', '$20\\text{ m}$'],
    correct_option: 0,
    solution: `For maximum horizontal range, the angle of projection is $\\theta = 45^\\circ$.
The maximum range is given by:
$$R_{\\max} = \\frac{u^2}{g}$$

Given:
- Initial velocity, $u = 20\\text{ m/s}$
- $g = 10\\text{ m/s}^2$

$$R_{\\max} = \\frac{(20)^2}{10} = \\frac{400}{10} = 40\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 33,
    exam: 'AIPMT 2011 Prelims',
    question: 'A body is moving with velocity $30\\text{ m/s}$ towards east. After 10 seconds its velocity becomes $40\\text{ m/s}$ towards north. The average acceleration of the body is:',
    options: ['$1\\text{ m/s}^2$', '$7\\text{ m/s}^2$', '$\\sqrt{7}\\text{ m/s}^2$', '$5\\text{ m/s}^2$'],
    correct_option: 3,
    solution: `Taking East as $+x$ ($\\hat{i}$) and North as $+y$ ($\\hat{j}$):
- Initial velocity: $\\vec{u} = 30\\hat{i}\\text{ m/s}$
- Final velocity: $\\vec{v} = 40\\hat{j}\\text{ m/s}$

Change in velocity:
$$\\Delta\\vec{v} = \\vec{v} - \\vec{u} = 40\\hat{j} - 30\\hat{i}\\text{ m/s}$$

Magnitude of change in velocity:
$$|\\Delta\\vec{v}| = \\sqrt{(-30)^2 + (40)^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50\\text{ m/s}$$

Average acceleration:
$$a_{\\text{avg}} = \\frac{|\\Delta\\vec{v}|}{\\Delta t} = \\frac{50\\text{ m/s}}{10\\text{ s}} = 5\\text{ m/s}^2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 34,
    exam: 'AIPMT 2010 Mains',
    question: 'The speed of a projectile at its maximum height is half of its initial speed. The angle of projection is:',
    options: ['$60^\\circ$', '$15^\\circ$', '$30^\\circ$', '$45^\\circ$'],
    correct_option: 0,
    solution: `At the maximum height, the vertical velocity component is zero ($v_y = 0$).
The speed of the projectile at maximum height is simply its horizontal component:
$$v_H = u\\cos\\theta$$

Given that $v_H = \\frac{u}{2}$:
$$u\\cos\\theta = \\frac{u}{2} \\implies \\cos\\theta = \\frac{1}{2} \\implies \\theta = 60^\\circ$$

Hence, the angle of projection is $60^\\circ$.
Correct option is (A).`
  },
  {
    qNum: 35,
    exam: 'AIPMT 2010 Mains',
    question: 'A particle moves in x-y plane according to rule $x = a\\sin\\omega t$ and $y = a\\cos\\omega t$. The particle follows:',
    options: [
      'an elliptical path',
      'a circular path',
      'a parabolic path',
      'a straight line path inclined equally to x and y-axes'
    ],
    correct_option: 1,
    solution: `Given parametric equations:
$$x = a\\sin\\omega t$$
$$y = a\\cos\\omega t$$

Squaring and adding both equations:
$$x^2 + y^2 = a^2\\sin^2\\omega t + a^2\\cos^2\\omega t$$
$$x^2 + y^2 = a^2(\\sin^2\\omega t + \\cos^2\\omega t) = a^2$$

This is the standard equation of a circle of radius $a$ centered at the origin $(0, 0)$.

Hence, the particle follows a circular path.
Correct option is (B).`
  },
  {
    qNum: 36,
    exam: 'AIPMT 2010 Prelims',
    question: 'A particle has initial velocity $(3\\hat{i} + 4\\hat{j})$ and has acceleration $(0.4\\hat{i} + 0.3\\hat{j})$. Its speed after 10 s is:',
    options: ['$7\\text{ units}$', '$7\\sqrt{2}\\text{ units}$', '$8.5\\text{ units}$', '$10\\text{ units}$'],
    correct_option: 1,
    solution: `Using $\\vec{v} = \\vec{u} + \\vec{a}t$:
$$\\vec{v} = (3\\hat{i} + 4\\hat{j}) + (0.4\\hat{i} + 0.3\\hat{j})(10)$$
$$\\vec{v} = (3\\hat{i} + 4\\hat{j}) + (4\\hat{i} + 3\\hat{j}) = 7\\hat{i} + 7\\hat{j}$$

Speed after $10\\text{ s}$:
$$v = |\\vec{v}| = \\sqrt{7^2 + 7^2} = \\sqrt{49 + 49} = \\sqrt{98} = 7\\sqrt{2}\\text{ units}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 37,
    exam: 'AIPMT 2010 Prelims',
    question: 'Six vectors, $\\vec{a}$ through $\\vec{f}$ have the magnitudes and directions indicated in the figure. Which of the following statements is true ?',
    image_url: diagramUrls['37'],
    options: [
      '$\\vec{b} + \\vec{c} = \\vec{f}$',
      '$\\vec{d} + \\vec{c} = \\vec{f}$',
      '$\\vec{d} + \\vec{e} = \\vec{f}$',
      '$\\vec{b} + \\vec{e} = \\vec{f}$'
    ],
    correct_option: 2,
    solution: `From the given figure:
- Vector $\\vec{d}$ points vertically upward (along $+y$).
- Vector $\\vec{e}$ points horizontally to the left (along $-x$).
- Vector $\\vec{f}$ points towards the upper-left (North-West direction).

By vector addition:
$$\\vec{d} + \\vec{e} = \\vec{f}$$

The other combinations do not match the geometric directions shown in the figure.

Hence, the correct option is (C).`
  },
  {
    qNum: 38,
    exam: 'AIPMT 2007',
    question: '$\\vec{A}$ and $\\vec{B}$ are two vectors and $\\theta$ is the angle between them, if $|\\vec{A} \\times \\vec{B}| = \\sqrt{3}(\\vec{A}\\cdot\\vec{B})$, the value of $\\theta$ is:',
    options: ['$45^\\circ$', '$30^\\circ$', '$90^\\circ$', '$60^\\circ$'],
    correct_option: 3,
    solution: `Given:
$$|\\vec{A} \\times \\vec{B}| = \\sqrt{3}(\\vec{A} \\cdot \\vec{B})$$

We know that:
$$|\\vec{A} \\times \\vec{B}| = AB\\sin\\theta$$
$$\\vec{A} \\cdot \\vec{B} = AB\\cos\\theta$$

Therefore:
$$AB\\sin\\theta = \\sqrt{3} AB\\cos\\theta$$
$$\\frac{\\sin\\theta}{\\cos\\theta} = \\sqrt{3} \\implies \\tan\\theta = \\sqrt{3} \\implies \\theta = 60^\\circ$$

Hence, the correct option is (D).`
  }
];

