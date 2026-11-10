import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'motion_in_plane_diagram_urls.json'), 'utf8'));

export const PLANE_PYQ_PART2 = [
  {
    qNum: 39,
    exam: 'AIPMT 2007',
    question: 'A particle starting from the origin $(0, 0)$ moves in a straight line in the $(x, y)$ plane. Its coordinates at a later time are $(\\sqrt{3}, 3)$. The path of the particle makes with the x-axis an angle of:',
    options: ['$45^\\circ$', '$60^\\circ$', '$0^\\circ$', '$30^\\circ$'],
    correct_option: 1,
    solution: `Let the angle that the path of the particle makes with the positive $x$-axis be $\\theta$.
The coordinates at a later time are $(x, y) = (\\sqrt{3}, 3)$.

The slope of the line passing through origin $(0, 0)$ and $(\\sqrt{3}, 3)$ is:
$$\\tan\\theta = \\frac{y - 0}{x - 0} = \\frac{3}{\\sqrt{3}} = \\sqrt{3}$$

Therefore:
$$\\theta = 60^\\circ$$

Hence, the path makes an angle of $60^\\circ$ with the $x$-axis.
Correct option is (B).`
  },
  {
    qNum: 40,
    exam: 'AIPMT 2006',
    question: 'For angles of projection of a projectile at angle $(45^\\circ - \\theta)$ and $(45^\\circ + \\theta)$, the horizontal range described by the projectile are in the ratio of:',
    options: ['$2 : 1$', '$1 : 1$', '$2 : 3$', '$1 : 2$'],
    correct_option: 1,
    solution: `The horizontal range of a projectile projected with speed $u$ at an angle $\\alpha$ is:
$$R = \\frac{u^2 \\sin 2\\alpha}{g}$$

For the first angle $\\alpha_1 = 45^\\circ - \\theta$:
$$R_1 = \\frac{u^2 \\sin[2(45^\\circ - \\theta)]}{g} = \\frac{u^2 \\sin(90^\\circ - 2\\theta)}{g} = \\frac{u^2 \\cos 2\\theta}{g}$$

For the second angle $\\alpha_2 = 45^\\circ + \\theta$:
$$R_2 = \\frac{u^2 \\sin[2(45^\\circ + \\theta)]}{g} = \\frac{u^2 \\sin(90^\\circ + 2\\theta)}{g} = \\frac{u^2 \\cos 2\\theta}{g}$$

Since $\\alpha_1$ and $\\alpha_2$ are complementary angles (sum $= 90^\\circ$), their horizontal ranges are identical:
$$\\frac{R_1}{R_2} = \\frac{1}{1} \\implies 1 : 1$$

Hence, the correct option is (B).`
  },
  {
    qNum: 41,
    exam: 'AIPMT 2006',
    question: 'The vectors $\\vec{A}$ and $\\vec{B}$ are such that $|\\vec{A} + \\vec{B}| = |\\vec{A} - \\vec{B}|$. The angle between the two vectors is:',
    options: ['$45^\\circ$', '$90^\\circ$', '$60^\\circ$', '$75^\\circ$'],
    correct_option: 1,
    solution: `Given:
$$|\\vec{A} + \\vec{B}| = |\\vec{A} - \\vec{B}|$$

Squaring both sides:
$$|\\vec{A} + \\vec{B}|^2 = |\\vec{A} - \\vec{B}|^2$$
$$A^2 + B^2 + 2AB\\cos\\theta = A^2 + B^2 - 2AB\\cos\\theta$$
$$4AB\\cos\\theta = 0$$

Since $A \\neq 0$ and $B \\neq 0$:
$$\\cos\\theta = 0 \\implies \\theta = 90^\\circ$$

Hence, the correct option is (B).`
  },
  {
    qNum: 42,
    exam: 'AIPMT 2005',
    question: 'Two boys are standing at the ends A and B of a ground where $AB = a$. The boy at B starts running in a direction perpendicular to AB with velocity $v_1$. The boy at A starts running simultaneously with velocity $v$ and catches the other in a time $t$, where $t$ is:',
    options: [
      '$\\frac{a}{\\sqrt{v^2 + v_1^2}}$',
      '$\\frac{a}{v + v_1}$',
      '$\\frac{a}{v - v_1}$',
      '$\\sqrt{\\frac{a^2}{v^2 - v_1^2}}$'
    ],
    correct_option: 3,
    solution: `Let the boy at A catch the boy at B at point C after time $t$.
- In time $t$, the boy starting from B runs perpendicular to AB to reach C:
  $$BC = v_1 t$$
- The distance between A and B is:
  $$AB = a$$
- The boy starting from A runs straight towards C with velocity $v$:
  $$AC = v t$$

Since $\\angle ABC = 90^\\circ$, applying Pythagoras theorem to right-angled triangle ABC:
$$AC^2 = AB^2 + BC^2$$
$$(vt)^2 = a^2 + (v_1 t)^2$$
$$v^2 t^2 - v_1^2 t^2 = a^2$$
$$t^2(v^2 - v_1^2) = a^2$$
$$t^2 = \\frac{a^2}{v^2 - v_1^2} \\implies t = \\sqrt{\\frac{a^2}{v^2 - v_1^2}}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 43,
    exam: 'AIPMT 2005',
    question: 'If a vector $2\\hat{i} + 3\\hat{j} + 8\\hat{k}$ is perpendicular to the vector $4\\hat{j} - 4\\hat{i} + \\alpha\\hat{k}$, then the value of $\\alpha$ is:',
    options: ['$1/2$', '$-1/2$', '$1$', '$-1$'],
    correct_option: 1,
    solution: `Let:
$$\\vec{A} = 2\\hat{i} + 3\\hat{j} + 8\\hat{k}$$
$$\\vec{B} = -4\\hat{i} + 4\\hat{j} + \\alpha\\hat{k}$$

For two vectors to be perpendicular, their scalar (dot) product must be zero:
$$\\vec{A} \\cdot \\vec{B} = 0$$
$$(2)(-4) + (3)(4) + (8)(\\alpha) = 0$$
$$-8 + 12 + 8\\alpha = 0$$
$$4 + 8\\alpha = 0 \\implies 8\\alpha = -4 \\implies \\alpha = -\\frac{4}{8} = -\\frac{1}{2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 44,
    exam: 'AIPMT 2004',
    question: 'If $|\\vec{A} \\times \\vec{B}| = \\sqrt{3}\\vec{A}\\cdot\\vec{B}$ then the value of $|\\vec{A} + \\vec{B}|$ is:',
    options: [
      '$(A^2 + B^2 + AB)^{1/2}$',
      '$\\left(A^2 + B^2 + \\frac{AB}{\\sqrt{3}}\\right)^{1/2}$',
      '$A + B$',
      '$(A^2 + B^2 + \\sqrt{3}AB)^{1/2}$'
    ],
    correct_option: 0,
    solution: `Given:
$$|\\vec{A} \\times \\vec{B}| = \\sqrt{3}(\\vec{A} \\cdot \\vec{B})$$
$$AB\\sin\\theta = \\sqrt{3}AB\\cos\\theta \\implies \\tan\\theta = \\sqrt{3} \\implies \\theta = 60^\\circ$$

Now finding $|\\vec{A} + \\vec{B}|$:
$$|\\vec{A} + \\vec{B}| = \\sqrt{A^2 + B^2 + 2AB\\cos\\theta}$$
$$|\\vec{A} + \\vec{B}| = \\sqrt{A^2 + B^2 + 2AB\\cos 60^\\circ}$$
$$|\\vec{A} + \\vec{B}| = \\sqrt{A^2 + B^2 + 2AB\\left(\\frac{1}{2}\\right)} = (A^2 + B^2 + AB)^{1/2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 45,
    exam: 'AIPMT 2003',
    question: 'The vector sum of two forces is perpendicular to their vector differences. In that case, the forces:',
    options: [
      'are equal to each other',
      'are equal to each other in magnitude',
      'are not equal to each other in magnitude',
      'cannot be predicted.'
    ],
    correct_option: 1,
    solution: `Let the two forces be $\\vec{F}_1$ and $\\vec{F}_2$.
Given that their sum is perpendicular to their difference:
$$(\\vec{F}_1 + \\vec{F}_2) \\cdot (\\vec{F}_1 - \\vec{F}_2) = 0$$

Expanding the dot product:
$$\\vec{F}_1 \\cdot \\vec{F}_1 - \\vec{F}_1 \\cdot \\vec{F}_2 + \\vec{F}_2 \\cdot \\vec{F}_1 - \\vec{F}_2 \\cdot \\vec{F}_2 = 0$$
$$F_1^2 - F_2^2 = 0 \\implies F_1^2 = F_2^2 \\implies |\\vec{F}_1| = |\\vec{F}_2|$$

Therefore, the two forces are equal to each other in magnitude.

Hence, the correct option is (B).`
  },
  {
    qNum: 46,
    exam: 'AIPMT 2002',
    question: 'A particle A is dropped from a height and another particle B is projected in horizontal direction with speed of $5\\text{ m/sec}$ from the same height then correct statement is:',
    options: [
      'particle A will reach at ground first with respect to particle B',
      'particle B will reach at ground first with respect to particle A',
      'both particles will reach at ground simultaneously',
      'both particles will reach at ground with same speed.'
    ],
    correct_option: 2,
    solution: `Both particles are released from the same vertical height $h$ simultaneously:
- Particle A is dropped vertically from rest: initial vertical velocity $u_{yA} = 0$.
- Particle B is projected horizontally: initial vertical velocity $u_{yB} = 0$.

Since vertical acceleration for both is $g$ and initial vertical velocities are zero:
$$h = \\frac{1}{2}gt^2 \\implies t = \\sqrt{\\frac{2h}{g}}$$

Both particles take the exact same time to hit the ground.
Therefore, both particles will reach the ground simultaneously.

Hence, the correct option is (C).`
  },
  {
    qNum: 47,
    exam: 'AIPMT 2001',
    question: 'If $|\\vec{A} + \\vec{B}| = |\\vec{A}| + |\\vec{B}|$ then angle between A and B will be:',
    options: ['$90^\\circ$', '$120^\\circ$', '$0^\\circ$', '$60^\\circ$'],
    correct_option: 2,
    solution: `Given:
$$|\\vec{A} + \\vec{B}| = |\\vec{A}| + |\\vec{B}|$$

Squaring both sides:
$$A^2 + B^2 + 2AB\\cos\\theta = (A + B)^2 = A^2 + B^2 + 2AB$$
$$2AB\\cos\\theta = 2AB \\implies \\cos\\theta = 1 \\implies \\theta = 0^\\circ$$

Therefore, the angle between vectors $\\vec{A}$ and $\\vec{B}$ is $0^\\circ$ (they are parallel).

Hence, the correct option is (C).`
  },
  {
    qNum: 48,
    exam: 'AIPMT 2001',
    question: 'Two particles having mass M and m are moving in a circular path having radius R and r. If their time period are same then the ratio of angular velocity will be:',
    options: ['$\\frac{r}{R}$', '$\\frac{R}{r}$', '$1$', '$\\sqrt{\\frac{R}{r}}$'],
    correct_option: 2,
    solution: `Angular velocity $\\omega$ of a particle in circular motion is related to its time period $T$ by:
$$\\omega = \\frac{2\\pi}{T}$$

Since the time period $T$ is the same for both particles:
$$\\omega_1 = \\frac{2\\pi}{T}, \\quad \\omega_2 = \\frac{2\\pi}{T}$$

Ratio of their angular velocities:
$$\\frac{\\omega_1}{\\omega_2} = \\frac{2\\pi / T}{2\\pi / T} = 1$$

Hence, the correct option is (C).`
  },
  {
    qNum: 49,
    exam: 'AIPMT 2000',
    question: 'The width of river is $1\\text{ km}$. The velocity of boat is $5\\text{ km/hr}$. The boat covered the width of river along the shortest path in $15\\text{ min}$. Then the velocity of river stream is:',
    options: ['$3\\text{ km/hr}$', '$4\\text{ km/hr}$', '$\\sqrt{29}\\text{ km/hr}$', '$\\sqrt{41}\\text{ km/hr}$'],
    correct_option: 0,
    solution: `For the shortest path across the river:
The boat moves directly perpendicular to the river banks.
The resultant velocity across the river width $d = 1\\text{ km}$ in $t = 15\\text{ min} = \\frac{1}{4}\\text{ hour}$ is:
$$v_{\\text{res}} = \\frac{d}{t} = \\frac{1\\text{ km}}{1/4\\text{ h}} = 4\\text{ km/h}$$

Using the relation between boat velocity $v_b$, river velocity $v_r$, and resultant velocity:
$$v_{\\text{res}} = \\sqrt{v_b^2 - v_r^2}$$
$$4 = \\sqrt{5^2 - v_r^2}$$
$$16 = 25 - v_r^2 \\implies v_r^2 = 9 \\implies v_r = 3\\text{ km/hr}$$

Hence, the velocity of the river stream is $3\\text{ km/hr}$.
Correct option is (A).`
  },
  {
    qNum: 50,
    exam: 'AIPMT 2000',
    question: 'Two projectiles of same mass and with same velocity are thrown at an angle $60^\\circ$ and $30^\\circ$ with the horizontal, then which will remain same:',
    options: ['time of flight', 'range of projectile', 'maximum height acquired', 'all of them.'],
    correct_option: 1,
    solution: `Horizontal range is given by:
$$R = \\frac{u^2 \\sin 2\\theta}{g}$$

For $\\theta_1 = 60^\\circ$:
$$R_1 = \\frac{u^2 \\sin 120^\\circ}{g} = \\frac{u^2 \\sin(180^\\circ - 60^\\circ)}{g} = \\frac{u^2 \\sin 60^\\circ}{g} = \\frac{\\sqrt{3}u^2}{2g}$$

For $\\theta_2 = 30^\\circ$:
$$R_2 = \\frac{u^2 \\sin 60^\\circ}{g} = \\frac{\\sqrt{3}u^2}{2g}$$

Since $\\theta_1 + \\theta_2 = 90^\\circ$ (complementary angles of projection), the horizontal range remains the same.
(Time of flight and maximum height depend on $\\sin\\theta$ and $\\sin^2\\theta$, so they differ).

Hence, the correct option is (B).`
  },
  {
    qNum: 51,
    exam: 'AIPMT 2000',
    question: 'A man is slipping on a frictionless inclined plane and a bag falls down from the same height. Then the velocity of both is related as:',
    options: ['$v_B > v_m$', '$v_B < v_m$', '$v_B = v_m$', '$v_B\\text{ and }v_m\\text{ can\'t be related.}$'],
    correct_option: 2,
    solution: `Both the man and the bag start from rest ($u = 0$) from the same vertical height $h$.
In the absence of friction and air resistance, total mechanical energy is conserved:
$$\\Delta KE + \\Delta PE = 0$$
$$\\frac{1}{2}mv^2 = mgh \\implies v = \\sqrt{2gh}$$

Notice that the final speed depends only on the vertical fall height $h$ and acceleration due to gravity $g$, and is independent of mass or path taken (whether vertical fall or along an incline).
Therefore, the final speeds are equal:
$$v_B = v_m$$

Hence, the correct option is (C).`
  },
  {
    qNum: 52,
    exam: 'AIPMT 2000',
    question: 'A solid sphere and a hollow sphere are thrown horizontally from a cliff with equal velocities, respectively. Then which sphere reaches first on earth?',
    options: [
      'Solid sphere',
      'Hollow sphere',
      'Both sphere simultaneously',
      'We cannot say because masses of spheres are not given'
    ],
    correct_option: 2,
    solution: `For a body thrown horizontally from a height $h$:
- Initial vertical velocity $u_y = 0$.
- Vertical acceleration $a_y = g$.

The time taken to reach the ground is determined purely by vertical motion:
$$h = \\frac{1}{2}gt^2 \\implies t = \\sqrt{\\frac{2h}{g}}$$

This time of flight is independent of:
1. Horizontal velocity
2. Mass of the sphere
3. Internal structure (whether solid or hollow)

Therefore, both spheres reach the earth simultaneously.

Hence, the correct option is (C).`
  },
  {
    qNum: 53,
    exam: 'AIPMT 1999',
    question: 'A person swims in a river aiming to reach exactly opposite point on the bank of a river. His speed of swimming is $0.5\\text{ m/s}$ at an angle $120^\\circ$ with the direction of flow of water. The speed of water in stream is:',
    options: ['$1.0\\text{ m/s}$', '$0.5\\text{ m/s}$', '$0.25\\text{ m/s}$', '$0.43\\text{ m/s}$'],
    correct_option: 2,
    solution: `The angle between the swimmer\'s velocity $\\vec{v}_s$ and downstream water flow $\\vec{v}_r$ is $120^\\circ$.
Therefore, the angle made by the swimmer with the upstream direction is:
$$\\alpha = 180^\\circ - 120^\\circ = 60^\\circ$$

For the swimmer to land at the exactly opposite point on the opposite bank, his upstream velocity component must exactly cancel the river flow:
$$v_r = v_s \\cos 60^\\circ$$
$$v_r = (0.5\\text{ m/s}) \\times \\frac{1}{2} = 0.25\\text{ m/s}$$

Hence, the speed of water in the stream is $0.25\\text{ m/s}$.
Correct option is (C).`
  },
  {
    qNum: 54,
    exam: 'AIPMT 1999',
    question: 'Two racing cars of masses $m_1$ and $m_2$ are moving in circles of radii $r_1$ and $r_2$ respectively. Their speeds are such that each makes a complete circle in the same time $t$. The ratio of the angular speeds of the first to the second car is:',
    options: ['$1 : 1$', '$m_1 : m_2$', '$r_1 : r_2$', '$m_1 m_2 : r_1 r_2$'],
    correct_option: 0,
    solution: `Angular speed $\\omega$ is given by:
$$\\omega = \\frac{2\\pi}{T}$$

Both cars take the same time $t$ to complete one full revolution:
$$T_1 = T_2 = t$$

Therefore:
$$\\omega_1 = \\frac{2\\pi}{t}, \\quad \\omega_2 = \\frac{2\\pi}{t}$$
$$\\frac{\\omega_1}{\\omega_2} = \\frac{2\\pi / t}{2\\pi / t} = \\frac{1}{1} \\implies 1 : 1$$

Notice that angular speed is independent of mass and radius when the period is equal.

Hence, the correct option is (A).`
  },
  {
    qNum: 55,
    exam: 'AIPMT 1998',
    question: 'The speed of a boat is $5\\text{ km/h}$ in still water. It crosses a river of width $1.0\\text{ km}$ along the shortest possible path in $15\\text{ min}$. The velocity of the river water is (in $\\text{km/h}$):',
    options: ['$5$', '$1$', '$3$', '$4$'],
    correct_option: 2,
    solution: `Resultant velocity across the shortest path:
$$v_{\\text{res}} = \\frac{\\text{width of river}}{\\text{time taken}} = \\frac{1.0\\text{ km}}{15/60\\text{ h}} = 4\\text{ km/h}$$

Using $v_{\\text{res}} = \\sqrt{v_b^2 - v_r^2}$:
$$4 = \\sqrt{5^2 - v_r^2}$$
$$16 = 25 - v_r^2 \\implies v_r^2 = 25 - 16 = 9 \\implies v_r = 3\\text{ km/h}$$

Hence, the velocity of the river water is $3\\text{ km/h}$.
Correct option is (C).`
  },
  {
    qNum: 56,
    exam: 'AIPMT 1998',
    question: 'Two particles A and B are connected by a rigid rod AB. The rod slides along perpendicular rails as shown here. The velocity of A to the right is $10\\text{ m/s}$. What is the velocity of B when angle $\\alpha = 60^\\circ$?',
    image_url: diagramUrls['56'],
    options: ['$9.8\\text{ m/s}$', '$10\\text{ m/s}$', '$5.8\\text{ m/s}$', '$17.3\\text{ m/s}$'],
    correct_option: 2,
    solution: `Let the length of the rigid rod AB be $L$.
From the right triangle OAB:
$$x^2 + y^2 = L^2$$

Differentiating both sides with respect to time:
$$2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0$$
$$x v_A + y v_B = 0$$
$$v_B = -\\frac{x}{y} v_A = -\\frac{1}{\\tan\\alpha} v_A$$

Given:
- $v_A = 10\\text{ m/s}$
- $\\alpha = 60^\\circ$
- $\\tan 60^\\circ = \\sqrt{3} \\approx 1.732$

The magnitude of velocity of B is:
$$|v_B| = \\frac{v_A}{\\tan\\alpha} = \\frac{10}{\\sqrt{3}} = \\frac{10}{1.732} \\approx 5.77\\text{ m/s} \\approx 5.8\\text{ m/s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 57,
    exam: 'AIPMT 1997',
    question: 'Identify the vector quantity among the following:',
    options: ['distance', 'angular momentum', 'heat', 'energy'],
    correct_option: 1,
    solution: `1. Distance: Scalar (magnitude only, path length).
2. Angular Momentum: Vector quantity (axial vector given by $\\vec{L} = \\vec{r} \\times \\vec{p}$, has both magnitude and direction along the axis of rotation).
3. Heat: Scalar (form of energy transferred due to temperature difference).
4. Energy: Scalar (ability to do work).

Therefore, angular momentum is the vector quantity.

Hence, the correct option is (B).`
  },
  {
    qNum: 58,
    exam: 'AIPMT 1996',
    question: 'The vectors $\\vec{A}$ and $\\vec{B}$ are such that $|\\vec{A} + \\vec{B}| = |\\vec{A} - \\vec{B}|$. The angle between the two vectors is:',
    options: ['$45^\\circ$', '$90^\\circ$', '$60^\\circ$', '$75^\\circ$'],
    correct_option: 1,
    solution: `Given:
$$|\\vec{A} + \\vec{B}| = |\\vec{A} - \\vec{B}|$$

Squaring both sides:
$$A^2 + B^2 + 2AB\\cos\\theta = A^2 + B^2 - 2AB\\cos\\theta$$
$$4AB\\cos\\theta = 0$$

Assuming non-zero vectors $A, B > 0$:
$$\\cos\\theta = 0 \\implies \\theta = 90^\\circ$$

Hence, the correct option is (B).`
  },
  {
    qNum: 59,
    exam: 'AIPMT 1996',
    question: 'A body is whirled in a horizontal circle of radius $20\\text{ cm}$. It has an angular velocity of $10\\text{ rad/s}$. What is its linear velocity at any point on circular path?',
    options: ['$20\\text{ m/s}$', '$\\sqrt{2}\\text{ m/s}$', '$10\\text{ m/s}$', '$2\\text{ m/s}$'],
    correct_option: 3,
    solution: `The relationship between linear velocity $v$ and angular velocity $\\omega$ in circular motion is:
$$v = r\\omega$$

Given:
- Radius, $r = 20\\text{ cm} = 0.2\\text{ m}$
- Angular velocity, $\\omega = 10\\text{ rad/s}$

$$v = 0.2 \\times 10 = 2\\text{ m/s}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 60,
    exam: 'AIPMT 1995',
    question: 'The position vector of a particle is $\\vec{r} = (a\\cos\\omega t)\\hat{i} + (a\\sin\\omega t)\\hat{j}$. The velocity of the particle is:',
    options: [
      'directed towards the origin',
      'directed away from the origin',
      'parallel to the position vector',
      'perpendicular to the position vector'
    ],
    correct_option: 3,
    solution: `Given position vector:
$$\\vec{r} = a\\cos\\omega t\\,\\hat{i} + a\\sin\\omega t\\,\\hat{j}$$

Velocity vector $\\vec{v}$:
$$\\vec{v} = \\frac{d\\vec{r}}{dt} = -a\\omega\\sin\\omega t\\,\\hat{i} + a\\omega\\cos\\omega t\\,\\hat{j}$$

Dot product of $\\vec{r}$ and $\\vec{v}$:
$$\\vec{r} \\cdot \\vec{v} = (a\\cos\\omega t)(-a\\omega\\sin\\omega t) + (a\\sin\\omega t)(a\\omega\\cos\\omega t)$$
$$\\vec{r} \\cdot \\vec{v} = -a^2\\omega\\sin\\omega t\\cos\\omega t + a^2\\omega\\sin\\omega t\\cos\\omega t = 0$$

Since $\\vec{r} \\cdot \\vec{v} = 0$, the velocity vector is perpendicular to the position vector.

Hence, the correct option is (D).`
  },
  {
    qNum: 61,
    exam: 'AIPMT 1995',
    question: 'The angular speed of a flywheel making $120\\text{ revolutions/minute}$ is:',
    options: ['$4\\pi\\text{ rad/s}$', '$4\\pi^2\\text{ rad/s}$', '$\\pi\\text{ rad/s}$', '$2\\pi\\text{ rad/s}$'],
    correct_option: 0,
    solution: `Frequency of rotation $f$:
$$f = \\frac{120\\text{ rev}}{60\\text{ s}} = 2\\text{ rev/s (or Hz)}$$

Angular speed $\\omega$:
$$\\omega = 2\\pi f = 2\\pi \\times 2 = 4\\pi\\text{ rad/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 62,
    exam: 'AIPMT 1994',
    question: 'The angle between the two vectors $\\vec{A} = 3\\hat{i} + 4\\hat{j} + 5\\hat{k}$ and $\\vec{B} = 3\\hat{i} + 4\\hat{j} - 5\\hat{k}$ will be:',
    options: ['$90^\\circ$', '$180^\\circ$', '$\\text{zero}$', '$45^\\circ$'],
    correct_option: 0,
    solution: `Scalar dot product of vectors $\\vec{A}$ and $\\vec{B}$:
$$\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y + A_z B_z$$
$$\\vec{A} \\cdot \\vec{B} = (3)(3) + (4)(4) + (5)(-5) = 9 + 16 - 25 = 0$$

Since $\\vec{A} \\cdot \\vec{B} = 0$, the angle between the two vectors is:
$$\\theta = 90^\\circ$$

Hence, the correct option is (A).`
  },
  {
    qNum: 63,
    exam: 'AIPMT 1994',
    question: 'A boat is sent across a river with a velocity of $8\\text{ km h}^{-1}$. If the resultant velocity of boat is $10\\text{ km h}^{-1}$, then velocity of river is:',
    options: ['$12.8\\text{ km h}^{-1}$', '$6\\text{ km h}^{-1}$', '$8\\text{ km h}^{-1}$', '$10\\text{ km h}^{-1}$'],
    correct_option: 1,
    solution: `The boat is directed perpendicular to the river stream with velocity $v_b = 8\\text{ km h}^{-1}$.
The river flows with velocity $v_r$ perpendicular to the boat\'s directed heading.
The resultant velocity is:
$$v_{\\text{res}} = \\sqrt{v_b^2 + v_r^2}$$
$$10 = \\sqrt{8^2 + v_r^2}$$
$$100 = 64 + v_r^2 \\implies v_r^2 = 36 \\implies v_r = 6\\text{ km h}^{-1}$$

Hence, the velocity of the river is $6\\text{ km h}^{-1}$.
Correct option is (B).`
  },
  {
    qNum: 64,
    exam: 'AIPMT 1993',
    question: 'A boat is sent across a river with a velocity of $8\\text{ km h}^{-1}$. If the resultant velocity of boat is $10\\text{ km h}^{-1}$, then velocity of river is:',
    options: ['$12.8\\text{ km h}^{-1}$', '$6\\text{ km h}^{-1}$', '$8\\text{ km h}^{-1}$', '$10\\text{ km h}^{-1}$'],
    correct_option: 1,
    solution: `Given:
- Boat velocity directed across river, $v_b = 8\\text{ km h}^{-1}$
- Resultant velocity, $v_{\\text{res}} = 10\\text{ km h}^{-1}$

$$v_{\\text{res}}^2 = v_b^2 + v_r^2$$
$$10^2 = 8^2 + v_r^2 \\implies 100 = 64 + v_r^2 \\implies v_r^2 = 36 \\implies v_r = 6\\text{ km h}^{-1}$$

Hence, the velocity of the river is $6\\text{ km h}^{-1}$.
Correct option is (B).`
  },
  {
    qNum: 65,
    exam: 'AIPMT 1992',
    question: 'If a body A of mass M is thrown with velocity $v$ at an angle of $30^\\circ$ to the horizontal and another body B of the same mass is thrown with the same speed at an angle of $60^\\circ$ to the horizontal, the ratio of horizontal range of A to B will be:',
    options: ['$1 : 3$', '$1 : 1$', '$1 : \\sqrt{3}$', '$\\sqrt{3} : 1$'],
    correct_option: 1,
    solution: `Horizontal range is given by:
$$R = \\frac{v^2 \\sin 2\\theta}{g}$$

For body A ($\\theta_A = 30^\\circ$):
$$R_A = \\frac{v^2 \\sin(2 \\times 30^\\circ)}{g} = \\frac{v^2 \\sin 60^\\circ}{g} = \\frac{\\sqrt{3}v^2}{2g}$$

For body B ($\\theta_B = 60^\\circ$):
$$R_B = \\frac{v^2 \\sin(2 \\times 60^\\circ)}{g} = \\frac{v^2 \\sin 120^\\circ}{g} = \\frac{v^2 \\sin(180^\\circ - 60^\\circ)}{g} = \\frac{\\sqrt{3}v^2}{2g}$$

Therefore:
$$\\frac{R_A}{R_B} = \\frac{1}{1} \\implies 1 : 1$$

Hence, the correct option is (B).`
  },
  {
    qNum: 66,
    exam: 'AIPMT 1992',
    question: 'The resultant of $\\vec{A} \\times 0$ will be equal to:',
    options: ['$\\text{zero}$', '$\\vec{A}$', '$\\text{zero vector}$', '$\\text{unit vector}$'],
    correct_option: 2,
    solution: `The cross product of any two vectors is always a vector quantity:
$$\\vec{A} \\times \\vec{0} = \\vec{0}$$

Since the result of a cross product must be a vector, multiplying a vector by zero gives a zero vector (also called a null vector) having zero magnitude and arbitrary direction.

Hence, the correct option is (C).`
  },
  {
    qNum: 67,
    exam: 'AIPMT 1992',
    question: 'A particle of mass $M$ is moving in a horizontal circle of radius $R$ with uniform speed $v$. When it moves from one point to a diametrically opposite point, its:',
    options: [
      'kinetic energy change by $Mv^2/4$',
      'momentum does not change',
      'momentum change by $2Mv$',
      'kinetic energy changes by $Mv^2$'
    ],
    correct_option: 2,
    solution: `Let the particle at initial point have velocity:
$$\\vec{v}_1 = v\\hat{j}$$

At the diametrically opposite point, the direction of motion is exactly reversed:
$$\\vec{v}_2 = -v\\hat{j}$$

Initial linear momentum:
$$\\vec{p}_1 = Mv\\hat{j}$$

Final linear momentum:
$$\\vec{p}_2 = -Mv\\hat{j}$$

Change in linear momentum:
$$\\Delta\\vec{p} = \\vec{p}_2 - \\vec{p}_1 = -Mv\\hat{j} - Mv\\hat{j} = -2Mv\\hat{j}$$
Magnitude of change in momentum:
$$|\\Delta\\vec{p}| = 2Mv$$

(Note: Kinetic energy is a scalar $KE = \\frac{1}{2}Mv^2$, which remains unchanged).

Hence, the correct option is (C).`
  },
  {
    qNum: 68,
    exam: 'AIPMT 1991',
    question: 'The vectors $\\vec{A}$ and $\\vec{B}$ are such that $|\\vec{A} + \\vec{B}| = |\\vec{A} - \\vec{B}|$. The angle between the two vectors is:',
    options: ['$45^\\circ$', '$90^\\circ$', '$60^\\circ$', '$75^\\circ$'],
    correct_option: 1,
    solution: `Given:
$$|\\vec{A} + \\vec{B}| = |\\vec{A} - \\vec{B}|$$
$$A^2 + B^2 + 2AB\\cos\\theta = A^2 + B^2 - 2AB\\cos\\theta$$
$$4AB\\cos\\theta = 0 \\implies \\cos\\theta = 0 \\implies \\theta = 90^\\circ$$

Hence, the correct option is (B).`
  },
  {
    qNum: 69,
    exam: 'AIPMT 1990',
    question: 'If a body A of mass $M$ is thrown with velocity $v$ at an angle of $30^\\circ$ to the horizontal and another body B of the same mass is thrown with the same speed at an angle of $60^\\circ$ to the horizontal, the ratio of horizontal range of A to B will be:',
    options: ['$1 : 3$', '$1 : 1$', '$1 : \\sqrt{3}$', '$\\sqrt{3} : 1$'],
    correct_option: 1,
    solution: `Since the angles of projection $\\theta_1 = 30^\\circ$ and $\\theta_2 = 60^\\circ$ are complementary ($\theta_1 + \\theta_2 = 90^\\circ$), the horizontal ranges for the same projection velocity are identical:
$$\\frac{R_A}{R_B} = \\frac{\\sin(2 \\times 30^\\circ)}{\\sin(2 \\times 60^\\circ)} = \\frac{\\sin 60^\\circ}{\\sin 120^\\circ} = 1$$

Ratio of horizontal range is $1 : 1$.

Hence, the correct option is (B).`
  },
  {
    qNum: 70,
    exam: 'AIPMT 1990',
    question: 'An electric fan has blades of length $30\\text{ cm}$ measured from the axis of rotation. If the fan is rotating at $120\\text{ rpm}$, the acceleration of a point on the tip of the blade is:',
    options: ['$1600\\text{ ms}^{-2}$', '$47.4\\text{ ms}^{-2}$', '$23.7\\text{ ms}^{-2}$', '$50.55\\text{ ms}^{-2}$'],
    correct_option: 1,
    solution: `Given:
- Radius of blade, $r = 30\\text{ cm} = 0.3\\text{ m}$
- Rotational speed, $N = 120\\text{ rpm} = \\frac{120}{60}\\text{ rps} = 2\\text{ rev/s}$

Angular velocity $\\omega$:
$$\\omega = 2\\pi N = 2\\pi(2) = 4\\pi\\text{ rad/s}$$

Centripetal acceleration at the tip:
$$a = \\omega^2 r = (4\\pi)^2 \\times 0.3 = 16\\pi^2 \\times 0.3 = 4.8\\pi^2\\text{ ms}^{-2}$$
$$a = 4.8 \\times (3.1416)^2 \\approx 4.8 \\times 9.8696 \\approx 47.37\\text{ ms}^{-2} \\approx 47.4\\text{ ms}^{-2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 71,
    exam: 'AIPMT 1990',
    question: 'The maximum range of a gun of horizontal terrain is $16\\text{ km}$. If $g = 10\\text{ ms}^{-2}$, then muzzle velocity of a shell must be:',
    options: ['$160\\text{ ms}^{-1}$', '$200\\sqrt{2}\\text{ ms}^{-1}$', '$400\\text{ ms}^{-1}$', '$800\\text{ ms}^{-1}$'],
    correct_option: 2,
    solution: `Maximum range on horizontal terrain:
$$R_{\\max} = \\frac{u^2}{g}$$

Given:
- $R_{\\max} = 16\\text{ km} = 16000\\text{ m}$
- $g = 10\\text{ ms}^{-2}$

$$16000 = \\frac{u^2}{10} \\implies u^2 = 160000$$
$$u = \\sqrt{160000} = 400\\text{ ms}^{-1}$$

Hence, the muzzle velocity must be $400\\text{ ms}^{-1}$.
Correct option is (C).`
  },
  {
    qNum: 72,
    exam: 'AIPMT 1989',
    question: 'If the angle between the vectors $\\vec{A}$ and $\\vec{B}$ is $\\theta$, the value of the product $(\\vec{B} \\times \\vec{A})\\cdot\\vec{A}$ is equal to:',
    options: ['$BA^2 \\sin\\theta$', '$BA^2 \\cos\\theta$', '$BA^2 \\sin\\theta\\cos\\theta$', '$\\text{zero}$'],
    correct_option: 3,
    solution: `By definition of vector cross product:
The vector $\\vec{C} = \\vec{B} \\times \\vec{A}$ is perpendicular to the plane containing vectors $\\vec{A}$ and $\\vec{B}$.
Consequently, $\\vec{C}$ is perpendicular to vector $\\vec{A}$:
$$\\vec{C} \\perp \\vec{A}$$

The scalar dot product of two mutually perpendicular vectors is always zero:
$$(\\vec{B} \\times \\vec{A}) \\cdot \\vec{A} = \\vec{C} \\cdot \\vec{A} = 0$$

Hence, the value of the product is zero.
Correct option is (D).`
  },
  {
    qNum: 73,
    exam: 'AIPMT 1989',
    question: 'A bus is moving on a straight road towards north with a uniform speed of $50\\text{ km/hour}$ then it turns left through $90^\\circ$. If the speed remains unchanged after turning, the increase in the velocity of bus in the turning process is:',
    options: [
      '$70.7\\text{ km/hr along south-west direction}$',
      '$\\text{zero}$',
      '$50\\text{ km/hr along west}$',
      '$70.7\\text{ km/hr along north-west direction}$'
    ],
    correct_option: 0,
    solution: `Taking East as $+\\hat{i}$ and North as $+\\hat{j}$:
- Initial velocity (heading North):
  $$\\vec{v}_1 = 50\\hat{j}\\text{ km/h}$$
- Turning left through $90^\\circ$ directs the bus towards West:
  $$\\vec{v}_2 = -50\\hat{i}\\text{ km/h}$$

Change (increase) in velocity vector:
$$\\Delta\\vec{v} = \\vec{v}_2 - \\vec{v}_1 = -50\\hat{i} - 50\\hat{j}\\text{ km/h}$$

Magnitude of change in velocity:
$$|\\Delta\\vec{v}| = \\sqrt{(-50)^2 + (-50)^2} = \\sqrt{2500 + 2500} = 50\\sqrt{2} \\approx 50 \\times 1.414 = 70.7\\text{ km/hr}$$

Direction of $\\Delta\\vec{v}$:
Since both components are negative ($-x$ and $-y$), the vector points towards the South-West direction.

Hence, the increase in velocity is $70.7\\text{ km/hr along south-west direction}$.
Correct option is (A).`
  },
  {
    qNum: 74,
    exam: 'AIPMT 1988',
    question: 'The magnitude of vectors $\\vec{A}, \\vec{B}$ and $\\vec{C}$ are 3, 4 and 5 units respectively. If $\\vec{A} + \\vec{B} = \\vec{C}$, the angle between $\\vec{A}$ and $\\vec{B}$ is:',
    options: ['$\\pi/2$', '$\\cos^{-1}(0.6)$', '$\\tan^{-1}(7/5)$', '$\\pi/4$'],
    correct_option: 0,
    solution: `Given:
$$\\vec{A} + \\vec{B} = \\vec{C}$$
Taking magnitude squared of both sides:
$$|\\vec{A} + \\vec{B}|^2 = |\\vec{C}|^2$$
$$A^2 + B^2 + 2AB\\cos\\theta = C^2$$

Substituting $A = 3$, $B = 4$, $C = 5$:
$$3^2 + 4^2 + 2(3)(4)\\cos\\theta = 5^2$$
$$9 + 16 + 24\\cos\\theta = 25$$
$$25 + 24\\cos\\theta = 25$$
$$24\\cos\\theta = 0 \\implies \\cos\\theta = 0 \\implies \\theta = \\frac{\\pi}{2}$$

Hence, the angle between $\\vec{A}$ and $\\vec{B}$ is $\\pi/2$.
Correct option is (A).`
  },
  {
    qNum: 75,
    exam: 'AIPMT 2005',
    question: 'A stone tied to the end of a string of $1\\text{ m}$ long is whirled in a horizontal circle with a constant speed. If the stone makes 22 revolutions in 44 seconds, what is the magnitude and direction of acceleration of the stone ?',
    options: [
      '$\\pi^2\\text{ m s}^{-2}\\text{ and direction along the radius towards the centre}$',
      '$\\pi^2\\text{ m s}^{-2}\\text{ and direction along the radius away from the centre}$',
      '$\\pi^2\\text{ m s}^{-2}\\text{ and direction along the tangent to the circle}$',
      '$\\pi^2/4\\text{ ms}^{-2}\\text{ and direction along the radius towards the centre.}$'
    ],
    correct_option: 0,
    solution: `Given:
- Radius of horizontal circle, $r = 1\\text{ m}$
- Number of revolutions $= 22$
- Time taken $= 44\\text{ s}$

Frequency of revolution:
$$f = \\frac{22}{44} = 0.5\\text{ rev/s}$$

Angular velocity $\\omega$:
$$\\omega = 2\\pi f = 2\\pi(0.5) = \\pi\\text{ rad/s}$$

Magnitude of centripetal acceleration:
$$a_c = \\omega^2 r = (\\pi)^2 \\times 1 = \\pi^2\\text{ m s}^{-2}$$

In uniform circular motion, the acceleration is purely centripetal, which is directed radially inwards towards the centre of the circle.

Hence, the magnitude is $\\pi^2\\text{ m s}^{-2}$ and direction is along the radius towards the centre.
Correct option is (A).`
  }
];

