import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'com_diagram_urls.json'), 'utf8'));

export const COM_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: 'Bob $B$ of mass $m$ at rest is hanging vertically from the ceiling via a massless string of length $10\\text{ m}$, as shown in the figure. Point mass $A$ of mass $m$ travelling horizontally with speed $10\\text{ ms}^{-1}$ hits bob $B$ elastically. The bob $B$ rises $h$ meter after the collision. Taking the acceleration due to gravity $g = 10\\text{ ms}^{-2}$ and neglecting the size of the bob, the value of $h$ is:',
    image_url: diagramUrls['1'],
    options: ['$2.5$', '$8$', '$7$', '$5$'],
    correct_option: 3, // D
    solution: `Given:
Mass of bob $B = m$ (at rest, $u_B = 0$)
Mass of projectile $A = m$ ($u_A = 10\\text{ ms}^{-1}$)
Length of string $L = 10\\text{ m}$
$g = 10\\text{ ms}^{-2}$

Since the collision between two identical masses ($m_A = m_B = m$) is head-on and perfectly elastic ($e = 1$), they exchange their velocities after collision:
$$v_B = u_A = 10\\text{ ms}^{-1}$$
$$v_A = u_B = 0$$

After collision, bob $B$ moves with initial speed $v_B = 10\\text{ ms}^{-1}$ and rises to maximum height $h$. By conservation of mechanical energy:
$$\\frac{1}{2} m v_B^2 = m g h$$
$$h = \\frac{v_B^2}{2g} = \\frac{10^2}{2 \\times 10} = \\frac{100}{20} = 5\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 2,
    exam: 'RE-NEET 2026',
    question: 'A frictionless circular wire of unit radius is fixed on the horizontal plane. Two-point particles of unit mass start moving simultaneously from point $A\\left(\\theta = \\frac{\\pi}{2}\\right)$ with identical uniform angular speeds in opposite directions, and meet again at point $B\\left(\\theta = -\\frac{\\pi}{2}\\right)$. During this time, which of the following figures schematically represent the magnitude of the total linear momentum $P$ of the system, as a function of $\\theta$?',
    image_url: diagramUrls['2'],
    options: [
      { text: '', image_url: diagramUrls['2_opt_a'] },
      { text: '', image_url: diagramUrls['2_opt_b'] },
      { text: '', image_url: diagramUrls['2_opt_c'] },
      { text: '', image_url: diagramUrls['2_opt_d'] }
    ],
    correct_option: 3, // D
    solution: `Let the circular wire lie in the horizontal plane with radius $R = 1$ and centre at the origin.
Particles 1 and 2 each have mass $m = 1$ and constant angular speed $\\omega$.
At time $t$, their angular positions measured from the positive $x$-axis are:
$$\\theta_1(t) = \\frac{\\pi}{2} - \\omega t = \\theta$$
$$\\theta_2(t) = \\frac{\\pi}{2} + \\omega t = \\pi - \\theta$$

The velocity vectors of the two particles tangent to the circle are:
$$\\vec{v}_1 = -\\omega \\sin\\theta\\,\\hat{i} + \\omega \\cos\\theta\\,\\hat{j}$$
$$\\vec{v}_2 = -\\omega \\sin(\\pi - \\theta)\\,\\hat{i} - \\omega \\cos(\\pi - \\theta)\\,\\hat{j} = -\\omega \\sin\\theta\\,\\hat{i} + \\omega \\cos\\theta\\,\\hat{j}$$
Wait, since they move in opposite directions along the circle:
Particle 1 moves clockwise: $\\vec{v}_1 = \\omega \\sin\\theta\\,\\hat{i} - \\omega \\cos\\theta\\,\\hat{j}$ (or vice versa).
The net linear momentum vector:
$$\\vec{P} = m\\vec{v}_1 + m\\vec{v}_2$$
The horizontal/vertical components add or cancel such that:
At $A$ (initial point, $\\theta = \\frac{\\pi}{2}$), the two particles move in opposite directions horizontally, so their linear momenta are antiparallel:
$$P\\left(\\frac{\\pi}{2}\\right) = 0$$
Similarly, at $B$ (meeting point, $\\theta = -\\frac{\\pi}{2}$), their velocities are again in opposite directions, so:
$$P\\left(-\\frac{\\pi}{2}\\right) = 0$$
At intermediate angles, e.g. $\\theta = 0$, both velocity vectors have parallel components, reaching a smooth maximum at $\\theta = 0$.
The magnitude of total linear momentum varies as a smooth curve (proportional to $\\cos\\theta$):
$$P(\\theta) = 2m\\omega R \\cos\\theta$$
Thus, $P = 0$ at $\\theta = \\pm \\frac{\\pi}{2}$ and reaches a maximum at $\\theta = 0$, forming a smooth inverted semi-elliptical/cosine curve.

Hence, figure (D) correctly represents $P(\\theta)$, and the correct option is (D).`
  },
  {
    qNum: 3,
    exam: 'NEET 2025',
    question: 'A ball of mass $0.5\\text{ kg}$ is dropped from a height of $40\\text{ m}$. The ball hits the ground and rises to a height of $10\\text{ m}$. The impulse imparted to the ball during its collision with the ground is (Take $g = 9.8\\text{ m/s}^2$):',
    options: ['$0$', '$84\\text{ NS}$', '$21\\text{ NS}$', '$7\\text{ NS}$'],
    correct_option: 2, // C
    solution: `Given:
Mass of ball, $m = 0.5\\text{ kg}$
Initial height, $h_1 = 40\\text{ m}$
Rebound height, $h_2 = 10\\text{ m}$
$g = 9.8\\text{ m/s}^2$

Speed just before hitting the ground (downward direction):
$$v_1 = \\sqrt{2gh_1} = \\sqrt{2 \\times 9.8 \\times 40} = \\sqrt{784} = 28\\text{ m/s}$$

Speed just after rebound from the ground (upward direction):
$$v_2 = \\sqrt{2gh_2} = \\sqrt{2 \\times 9.8 \\times 10} = \\sqrt{196} = 14\\text{ m/s}$$

Taking upward direction as positive:
$$\\vec{v}_1 = -28\\,\\hat{j}\\text{ m/s}$$
$$\\vec{v}_2 = +14\\,\\hat{j}\\text{ m/s}$$

The impulse imparted to the ball is equal to the change in momentum:
$$J = |\\Delta \\vec{p}| = m |\\vec{v}_2 - \\vec{v}_1| = 0.5 \\times [14 - (-28)] = 0.5 \\times 42 = 21\\text{ N s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 4,
    exam: 'NEET 2024',
    question: 'Two bodies $A$ and $B$ of same mass undergo completely inelastic one dimensional collision. The body $A$ moves with velocity $v_1$ while body $B$ is at rest before collision. The velocity of the system after collision is $v_2$. The ratio $v_1 : v_2$ is:',
    options: ['$1 : 2$', '$2 : 1$', '$4 : 1$', '$1 : 4$'],
    correct_option: 1, // B
    solution: `Given:
Mass of body $A = m$, initial velocity $= v_1$
Mass of body $B = m$, initial velocity $= 0$
Since the collision is completely inelastic in one dimension, the two bodies stick together after collision and move with common velocity $v_2$.

By conservation of linear momentum:
$$m v_1 + m(0) = (m + m) v_2$$
$$m v_1 = 2m v_2$$
$$\\frac{v_1}{v_2} = \\frac{2}{1} = 2 : 1$$

Hence, the correct option is (B).`
  },
  {
    qNum: 5,
    exam: 'NEET 2023 Manipur',
    question: 'A bullet of mass $m$ hits a block of mass $M$ elastically. The transfer of energy is the maximum, when :',
    options: ['$M = m$', '$M = 2m$', '$M \\ll m$', '$M \\gg m$'],
    correct_option: 0, // A
    solution: `For an elastic head-on collision between a moving mass $m$ and a stationary mass $M$, the fraction of kinetic energy transferred to the target mass $M$ is given by:
$$\\frac{\\Delta K}{K_i} = \\frac{4mM}{(m + M)^2}$$

This fractional energy transfer is maximized when:
$$\\frac{d}{dM}\\left[\\frac{4mM}{(m + M)^2}\\right] = 0 \\implies M = m$$

When $M = m$:
$$\\frac{\\Delta K}{K_i} = \\frac{4m^2}{(2m)^2} = 1 = 100\\%$$
Thus, 100% of kinetic energy is transferred when the colliding masses are equal ($M = m$).

Hence, the correct option is (A).`
  },
  {
    qNum: 6,
    exam: 'NEET 2023 Manipur',
    question: 'Two particles A and B initially at rest, move towards each other under mutual force of attraction. At an instance when the speed of A is v and speed of B is 3v, the speed of centre of mass is :',
    options: ['$2v$', 'zero', '$v$', '$4v$'],
    correct_option: 1, // B
    solution: `The particles move solely under their mutual force of attraction, which is an internal force for the two-particle system.
No external force acts on the system:
$$\\vec{F}_{ext} = 0$$

Therefore, the acceleration of the centre of mass is:
$$\\vec{a}_{cm} = \\frac{\\vec{F}_{ext}}{M_{total}} = 0$$

Since the particles were initially at rest:
$$\\vec{v}_{cm}(0) = 0$$

Since $\\vec{a}_{cm} = 0$, the velocity of the centre of mass remains constant at all times:
$$\\vec{v}_{cm}(t) = 0$$

Hence, the speed of the centre of mass is zero, and the correct option is (B).`
  },
  {
    qNum: 7,
    exam: 'NEET 2023 Manipur',
    question: 'A $1\\text{ kg}$ object strikes a wall with velocity $1\\text{ m s}^{-1}$ at an angle of $60^\\circ$ with the wall and reflects at the same angle. If it remains in contact with wall for $0.1\\text{ s}$, then the force exerted on the wall is :',
    options: ['$30\\sqrt{3}\\text{ N}$', 'Zero', '$10\\sqrt{3}\\text{ N}$', '$20\\sqrt{3}\\text{ N}$'],
    correct_option: 2, // C
    solution: `Given:
Mass of object, $m = 1\\text{ kg}$
Speed, $v = 1\\text{ m s}^{-1}$
Angle with the wall $= 60^\\circ$
Contact time, $\\Delta t = 0.1\\text{ s}$

The angle made with the normal to the wall is:
$$\\alpha = 90^\\circ - 60^\\circ = 30^\\circ$$
Alternatively, the component of velocity perpendicular to the wall is:
$$v_\\perp = v \\sin(60^\\circ) = 1 \\times \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}}{2}\\text{ m s}^{-1}$$

The parallel component of velocity remains unchanged, while the perpendicular component reverses direction upon reflection.
Therefore, the change in linear momentum is perpendicular to the wall:
$$\\Delta p = 2 m v_\\perp = 2 \\times 1 \\times \\frac{\\sqrt{3}}{2} = \\sqrt{3}\\text{ kg m s}^{-1}$$

The average force exerted on the wall is:
$$F = \\frac{\\Delta p}{\\Delta t} = \\frac{\\sqrt{3}}{0.1} = 10\\sqrt{3}\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 8,
    exam: 'NEET 2022 Phase 2',
    question: 'The distance covered by a body of mass $5\\text{ g}$ having linear momentum $0.3\\text{ kg m/s}$ in $5\\text{ s}$ is :',
    options: ['$0.3\\text{ m}$', '$300\\text{ m}$', '$30\\text{ m}$', '$3\\text{ m}$'],
    correct_option: 1, // B
    solution: `Given:
Mass, $m = 5\\text{ g} = 5 \\times 10^{-3}\\text{ kg}$
Linear momentum, $p = 0.3\\text{ kg m/s}$
Time, $t = 5\\text{ s}$

The velocity of the body is:
$$v = \\frac{p}{m} = \\frac{0.3}{5 \\times 10^{-3}} = \\frac{300}{5} = 60\\text{ m/s}$$

Since the velocity is constant, the distance covered in $5\\text{ s}$ is:
$$s = v \\times t = 60 \\times 5 = 300\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 9,
    exam: 'NEET 2022 Phase 2',
    question: 'Given below are two statements : One is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A) : When a fire cracker (rocket) explodes in mid air, its fragments fly in such a way that they continue moving in the same path, which the fire cracker would have followed, had it not exploded.\n\nReason (R) : Explosion of cracker (rocket) occurs due to internal force only and no external force acts for this explosion.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:',
    options: [
      '(A) is not correct but (R) is correct',
      'Both (A) and (R) are correct and (R) is the correct explanation of (A)',
      'Both (A) and (R) are correct but (R) is not the correct explanation of (A)',
      '(A) is correct but (R) is not correct'
    ],
    correct_option: 0, // A
    solution: `Statement Analysis:
1. **Assertion (A)**: When a fire cracker explodes in mid-air, the chemical explosion is driven by internal forces. By Newton's second law, internal forces cannot alter the motion of the centre of mass. Thus, the **centre of mass** continues to follow the original parabolic trajectory. However, the individual fragments fly off in various directions along different trajectories, NOT along the same original path. Hence, Assertion (A) is false.

2. **Reason (R)**: The explosion of a firecracker occurs due to internal chemical forces, and no external force acts to cause the explosion. Hence, Reason (R) is true.

Therefore, (A) is not correct but (R) is correct.

Hence, the correct option is (A).`
  },
  {
    qNum: 10,
    exam: 'NEET 2022 Phase 1',
    question: 'A shell of mass $m$ is at rest initially. It explodes into three fragments having mass in the ratio $2 : 2 : 1$. If the fragments having equal mass fly off along mutually perpendicular directions with speed $v$, the speed of the third (lighter) fragment is :',
    options: ['$v$', '$\\sqrt{2}v$', '$2\\sqrt{2}v$', '$3\\sqrt{2}v$'],
    correct_option: 2, // C
    solution: `Let the masses of the three fragments be $2m_0$, $2m_0$, and $m_0$ such that total mass is $m = 5m_0$.
The shell is initially at rest, so the initial momentum is zero:
$$\\vec{p}_{initial} = 0$$

Let the two equal mass fragments move along the $x$ and $y$ axes with speed $v$:
$$\\vec{p}_1 = (2m_0) v\\,\\hat{i}$$
$$\\vec{p}_2 = (2m_0) v\\,\\hat{j}$$

By conservation of linear momentum:
$$\\vec{p}_1 + \\vec{p}_2 + \\vec{p}_3 = 0$$
$$\\vec{p}_3 = -(\\vec{p}_1 + \\vec{p}_2) = -2m_0 v\\,\\hat{i} - 2m_0 v\\,\\hat{j}$$

The magnitude of the momentum of the third fragment is:
$$|\\vec{p}_3| = \\sqrt{(2m_0 v)^2 + (2m_0 v)^2} = 2\\sqrt{2}m_0 v$$

Since the mass of the third fragment is $m_3 = m_0$, its speed is:
$$v_3 = \\frac{|\\vec{p}_3|}{m_3} = \\frac{2\\sqrt{2}m_0 v}{m_0} = 2\\sqrt{2}v$$

Hence, the correct option is (C).`
  },
  {
    qNum: 11,
    exam: 'NEET 2022 Phase 1',
    question: 'Two objects of mass $10\\text{ kg}$ and $20\\text{ kg}$ respectively are connected to the two ends of a rigid rod of length $10\\text{ m}$ with negligible mass. The distance of the center of mass of the system from the $10\\text{ kg}$ mass is :',
    options: ['$\\frac{10}{3}\\text{ m}$', '$\\frac{20}{3}\\text{ m}$', '$10\\text{ m}$', '$5\\text{ m}$'],
    correct_option: 1, // B
    solution: `Given:
$m_1 = 10\\text{ kg}$ at $x_1 = 0$
$m_2 = 20\\text{ kg}$ at $x_2 = 10\\text{ m}$

The position of the centre of mass from the $10\\text{ kg}$ mass is:
$$x_{cm} = \\frac{m_1 x_1 + m_2 x_2}{m_1 + m_2} = \\frac{10(0) + 20(10)}{10 + 20} = \\frac{200}{30} = \\frac{20}{3}\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 12,
    exam: 'NEET 2021',
    question: 'A ball of mass $0.15\\text{ kg}$ is dropped from a height $10\\text{ m}$, strikes the ground and rebounds to the same height. The magnitude of impulse imparted to the ball is ($g = 10\\text{ m/s}^2$) nearly :',
    options: ['$1.4\\text{ kg m/s}$', '$0\\text{ kg m/s}$', '$4.2\\text{ kg m/s}$', '$2.1\\text{ kg m/s}$'],
    correct_option: 2, // C
    solution: `Given:
Mass of the ball, $m = 0.15\\text{ kg}$
Height, $h = 10\\text{ m}$
$g = 10\\text{ m/s}^2$

Speed just before striking the ground:
$$v_1 = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 10} = 10\\sqrt{2}\\text{ m/s} \\approx 14.14\\text{ m/s}\\text{ (downwards)}$$

Since it rebounds to the same height:
$$v_2 = \\sqrt{2gh} = 10\\sqrt{2}\\text{ m/s} \\approx 14.14\\text{ m/s}\\text{ (upwards)}$$

Taking upward direction as positive:
$$\\vec{v}_1 = -10\\sqrt{2}\\,\\hat{j}$$
$$\\vec{v}_2 = +10\\sqrt{2}\\,\\hat{j}$$

The magnitude of the impulse imparted to the ball is:
$$J = |\\Delta \\vec{p}| = m|v_2 - (-v_1)| = 2 m v_1$$
$$J = 2 \\times 0.15 \\times 14.14 = 0.30 \\times 14.14 \\approx 4.24\\text{ kg m/s} \\approx 4.2\\text{ kg m/s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 13,
    exam: 'NEET 2020 Phase 2',
    question: 'Three identical spheres, each of mass $M$, are placed at the corners of a right angle triangle with mutually perpendicular sides equal to $2\\text{ m}$ (see figure). Taking the point of intersection of the two mutually perpendicular sides as the origin, find the position vector of centre of mass.',
    image_url: diagramUrls['13'],
    options: [
      '$\\frac{4}{3}\\left(\\hat{i} + \\hat{j}\\right)$',
      '$2\\left(\\hat{i} + \\hat{j}\\right)$',
      '$\\left(\\hat{i} + \\hat{j}\\right)$',
      '$\\frac{2}{3}\\left(\\hat{i} + \\hat{j}\\right)$'
    ],
    correct_option: 3, // D
    solution: `Let the origin $(0, 0)$ be at the intersection of the mutually perpendicular sides.
The positions of the three identical spheres of mass $M$ are:
- Sphere 1: $\\vec{r}_1 = 0\\,\\hat{i} + 0\\,\\hat{j}$ at $(0, 0)$
- Sphere 2: $\\vec{r}_2 = 2\\,\\hat{i} + 0\\,\\hat{j}$ at $(2, 0)$
- Sphere 3: $\\vec{r}_3 = 0\\,\\hat{i} + 2\\,\\hat{j}$ at $(0, 2)$

The position vector of the centre of mass is:
$$\\vec{r}_{cm} = \\frac{M\\vec{r}_1 + M\\vec{r}_2 + M\\vec{r}_3}{M + M + M} = \\frac{M(0) + M(2\\hat{i}) + M(2\\hat{j})}{3M} = \\frac{2\\hat{i} + 2\\hat{j}}{3} = \\frac{2}{3}\\left(\\hat{i} + \\hat{j}\\right)$$

Hence, the correct option is (D).`
  },
  {
    qNum: 14,
    exam: 'NEET 2020 Phase 1',
    question: 'Two particles of mass $5\\text{ kg}$ and $10\\text{ kg}$ respectively are attached to the two ends of a rigid rod of length $1\\text{ m}$ with negligible mass. The centre of mass of the system from the $5\\text{ kg}$ particle is nearly at a distance of :',
    options: ['$50\\text{ cm}$', '$67\\text{ cm}$', '$80\\text{ cm}$', '$33\\text{ cm}$'],
    correct_option: 1, // B
    solution: `Given:
$m_1 = 5\\text{ kg}$ at $x_1 = 0$
$m_2 = 10\\text{ kg}$ at $x_2 = 1\\text{ m} = 100\\text{ cm}$

Distance of centre of mass from $m_1$:
$$x_{cm} = \\frac{m_2 L}{m_1 + m_2} = \\frac{10 \\times 100}{5 + 10} = \\frac{1000}{15} = \\frac{200}{3} \\approx 66.67\\text{ cm} \\approx 67\\text{ cm}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 15,
    exam: 'NEET 2019 (Odisha)',
    question: 'An object flying in air with velocity $(20\\hat{i} + 25\\hat{j} - 12\\hat{k})$ suddenly breaks into two pieces whose masses are in the ratio $1 : 5$. The smaller mass flies off with a velocity $(100\\hat{i} + 35\\hat{j} + 8\\hat{k})$. The velocity of the larger piece will be,',
    options: [
      '$-20\\hat{i} - 15\\hat{j} - 80\\hat{k}$',
      '$4\\hat{i} + 23\\hat{j} - 16\\hat{k}$',
      '$-100\\hat{i} - 35\\hat{j} - 8\\hat{k}$',
      '$20\\hat{i} + 15\\hat{j} - 80\\hat{k}$'
    ],
    correct_option: 1, // B
    solution: `Let the mass of the smaller piece be $m$ and larger piece be $5m$.
Total initial mass is $M = m + 5m = 6m$.
Initial velocity: $\\vec{v} = 20\\hat{i} + 25\\hat{j} - 12\\hat{k}$
Velocity of smaller piece: $\\vec{v}_1 = 100\\hat{i} + 35\\hat{j} + 8\\hat{k}$
Let velocity of larger piece be $\\vec{v}_2$.

By conservation of linear momentum:
$$M\\vec{v} = m\\vec{v}_1 + 5m\\vec{v}_2$$
$$6m(20\\hat{i} + 25\\hat{j} - 12\\hat{k}) = m(100\\hat{i} + 35\\hat{j} + 8\\hat{k}) + 5m\\vec{v}_2$$
$$120\\hat{i} + 150\\hat{j} - 72\\hat{k} = 100\\hat{i} + 35\\hat{j} + 8\\hat{k} + 5\\vec{v}_2$$
$$5\\vec{v}_2 = (120 - 100)\\hat{i} + (150 - 35)\\hat{j} + (-72 - 8)\\hat{k}$$
$$5\\vec{v}_2 = 20\\hat{i} + 115\\hat{j} - 80\\hat{k}$$
$$\\vec{v}_2 = 4\\hat{i} + 23\\hat{j} - 16\\hat{k}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 16,
    exam: 'NEET 2019 (Odisha)',
    question: 'A particle of mass $5m$ at rest suddenly breaks on its own into three fragments. Two fragments of mass $m$ each move along mutually perpendicular direction with speed $v$ each. The energy released during the process is,',
    options: ['$\\frac{4}{3}mv^2$', '$\\frac{3}{5}mv^2$', '$\\frac{5}{3}mv^2$', '$\\frac{3}{2}mv^2$'],
    correct_option: 0, // A
    solution: `Initial mass is $5m$, at rest ($K_i = 0$).
It breaks into:
- Fragment 1: mass $m$, velocity $\\vec{v}_1 = v\\,\\hat{i}$
- Fragment 2: mass $m$, velocity $\\vec{v}_2 = v\\,\\hat{j}$
- Fragment 3: mass $m_3 = 5m - m - m = 3m$, velocity $\\vec{v}_3$

By conservation of linear momentum:
$$m(v\\hat{i}) + m(v\\hat{j}) + 3m\\vec{v}_3 = 0$$
$$\\vec{v}_3 = -\\frac{v}{3}\\hat{i} - \\frac{v}{3}\\hat{j}$$
$$|\\vec{v}_3|^2 = \\left(-\\frac{v}{3}\\right)^2 + \\left(-\\frac{v}{3}\\right)^2 = \\frac{2v^2}{9}$$

The total energy released is the total kinetic energy of the fragments:
$$E = K_1 + K_2 + K_3 = \\frac{1}{2}mv^2 + \\frac{1}{2}mv^2 + \\frac{1}{2}(3m)|\\vec{v}_3|^2$$
$$E = mv^2 + \\frac{3}{2}m\\left(\\frac{2v^2}{9}\\right) = mv^2 + \\frac{1}{3}mv^2 = \\frac{4}{3}mv^2$$

Hence, the correct option is (A).`
  },
  {
    qNum: 17,
    exam: 'NEET 2019',
    question: 'Body A of mass $4m$ moving with speed $u$ collides with another body B of mass $2m$, at rest. The collision is head on and elastic in nature. After the collision the fraction of energy lost by the colliding body A is :',
    options: ['$\\frac{5}{9}$', '$\\frac{4}{9}$', '$\\frac{8}{9}$', '$\\frac{1}{9}$'],
    correct_option: 2, // C
    solution: `Given:
$m_A = 4m$, $u_A = u$
$m_B = 2m$, $u_B = 0$
Elastic head-on collision ($e = 1$).

Velocity of body A after collision:
$$v_A = \\left(\\frac{m_A - m_B}{m_A + m_B}\\right) u = \\left(\\frac{4m - 2m}{4m + 2m}\\right) u = \\frac{2m}{6m} u = \\frac{u}{3}$$

Initial kinetic energy of body A:
$$K_i = \\frac{1}{2} m_A u^2 = \\frac{1}{2}(4m)u^2 = 2mu^2$$

Final kinetic energy of body A:
$$K_f = \\frac{1}{2} m_A v_A^2 = \\frac{1}{2}(4m)\\left(\\frac{u}{3}\\right)^2 = \\frac{1}{9} K_i$$

Fraction of energy lost by body A:
$$\\frac{\\Delta K}{K_i} = \\frac{K_i - K_f}{K_i} = 1 - \\frac{K_f}{K_i} = 1 - \\frac{1}{9} = \\frac{8}{9}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 18,
    exam: 'NEET 2018',
    question: 'A moving block having mass $m$, collides with another stationary block having mass $4m$. The lighter block comes to rest after collision. When the initial velocity of the lighter block is $v$, then the value of coefficient of restitution ($e$) will be:',
    options: ['$0.5$', '$0.25$', '$0.8$', '$0.4$'],
    correct_option: 1, // B
    solution: `Given:
Mass of lighter block, $m_1 = m$, initial velocity $u_1 = v$, final velocity $v_1 = 0$
Mass of heavier block, $m_2 = 4m$, initial velocity $u_2 = 0$, final velocity $v_2$

By conservation of linear momentum:
$$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$
$$m v + 0 = 0 + 4m v_2 \\implies v_2 = \\frac{v}{4}$$

The coefficient of restitution $e$ is:
$$e = \\frac{v_2 - v_1}{u_1 - u_2} = \\frac{\\frac{v}{4} - 0}{v - 0} = \\frac{1}{4} = 0.25$$

Hence, the correct option is (B).`
  },
  {
    qNum: 19,
    exam: 'NEET 2017',
    question: 'Which of the following statements are correct ?\n(1) Centre of mass of a body always coincides with the centre of gravity of the body.\n(2) Centre of mass of a body is the point at which the total gravitational torque on the body is zero.\n(3) A couple on a body produces both translational and rotational motion in a body\n(4) Mechanical advantage greater than one means that small effort can be used to lift a large load.',
    options: ['(1) and (2)', '(2) and (3)', '(3) and (4)', '(2) and (4)'],
    correct_option: 3, // D
    solution: `Analysis of statements:
- Statement (1): Incorrect. Centre of mass coincides with centre of gravity only in a uniform gravitational field. In non-uniform gravitational fields (e.g., massive extended objects), they do not coincide.
- Statement (2): Correct. The centre of gravity (and centre of mass in uniform gravity) is defined as the point about which the net torque due to gravitational forces on all particles is zero.
- Statement (3): Incorrect. A couple consists of two equal and opposite parallel forces whose net force is zero. Hence, a couple produces pure rotational motion without any translational motion.
- Statement (4): Correct. Mechanical Advantage (MA) $= \\frac{\\text{Load}}{\\text{Effort}}$. If $\\text{MA} > 1$, then $\\text{Effort} < \\text{Load}$, meaning a small effort can lift a larger load.

Thus, statements (2) and (4) are correct.

Hence, the correct option is (D).`
  },
  {
    qNum: 20,
    exam: 'NEET 2016 Phase 2',
    question: 'A rigid ball of mass $m$ strikes a rigid wall at $60^\\circ$ and gets reflected without loss of speed as shown in the figure. The value of impulse imparted by the wall on the ball will be :',
    image_url: diagramUrls['20'],
    options: ['$mV$', '$2mV$', '$\\frac{mV}{2}$', '$\\frac{mV}{3}$'],
    correct_option: 0, // A
    solution: `From the diagram:
The ball strikes the vertical wall at an angle of $60^\\circ$ with the normal to the wall.
Initial velocity components:
- Perpendicular to wall (towards wall, $+x$): $V_x = V \\cos(60^\\circ) = \\frac{V}{2}$
- Parallel to wall (along $-y$): $V_y = -V \\sin(60^\\circ)$

After reflection without loss of speed:
- Perpendicular to wall (away from wall, $-x$): $V_x' = -V \\cos(60^\\circ) = -\\frac{V}{2}$
- Parallel to wall (along $-y$): $V_y' = -V \\sin(60^\\circ)$

Change in velocity:
$$\\Delta V_x = V_x' - V_x = -\\frac{V}{2} - \\frac{V}{2} = -V$$
$$\\Delta V_y = 0$$

Impulse imparted by the wall on the ball:
$$J = |\\Delta \\vec{p}| = m |\\Delta V_x| = m V$$

Hence, the correct option is (A).`
  },
  {
    qNum: 21,
    exam: 'NEET 2016 Phase 2',
    question: 'A bullet of mass $10\\text{ g}$ moving horizontally with a velocity of $400\\text{ m s}^{-1}$ strikes a wood block of mass $2\\text{ kg}$ which is suspended by light inextensible string of length $5\\text{ m}$. As a result, the centre of gravity of the block is found to rise a vertical distance of $10\\text{ cm}$. The speed of the bullet after it emerges out horizontally from the block will be:',
    options: ['$100\\text{ m s}^{-1}$', '$80\\text{ m s}^{-1}$', '$120\\text{ m s}^{-1}$', '$160\\text{ m s}^{-1}$'],
    correct_option: 2, // C
    solution: `Given:
Mass of bullet, $m = 10\\text{ g} = 0.01\\text{ kg}$
Initial speed of bullet, $u = 400\\text{ m s}^{-1}$
Mass of block, $M = 2\\text{ kg}$
Vertical rise of block, $h = 10\\text{ cm} = 0.1\\text{ m}$
$g = 9.8\\text{ m s}^{-2}$

Speed of the block immediately after bullet emerges:
$$V = \\sqrt{2gh} = \\sqrt{2 \\times 9.8 \\times 0.1} = \\sqrt{1.96} = 1.4\\text{ m s}^{-1}$$

Applying conservation of linear momentum in horizontal direction:
$$m u = M V + m v$$
$$0.01 \\times 400 = 2 \\times 1.4 + 0.01 \\times v$$
$$4 = 2.8 + 0.01 v$$
$$0.01 v = 1.2 \\implies v = \\frac{1.2}{0.01} = 120\\text{ m s}^{-1}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 22,
    exam: 'NEET 2016 Phase 2',
    question: 'Two identical balls A and B having velocities of $0.5\\text{ m s}^{-1}$ and $-0.3\\text{ m s}^{-1}$ respectively collide elastically in one dimension. The velocities of B and A after the collision respectively will be :',
    options: [
      '$-0.5\\text{ m s}^{-1}\\text{ and }0.3\\text{ m s}^{-1}$',
      '$0.5\\text{ m s}^{-1}\\text{ and }-0.3\\text{ m s}^{-1}$',
      '$-0.3\\text{ m s}^{-1}\\text{ and }0.5\\text{ m s}^{-1}$',
      '$0.3\\text{ m s}^{-1}\\text{ and }0.5\\text{ m s}^{-1}$'
    ],
    correct_option: 1, // B
    solution: `For two identical bodies ($m_A = m_B$) colliding elastically in one dimension ($e = 1$), they interchange their velocities after collision:
$$v_A = u_B = -0.3\\text{ m s}^{-1}$$
$$v_B = u_A = 0.5\\text{ m s}^{-1}$$

The question asks for the velocities of **B and A** respectively:
$$v_B = 0.5\\text{ m s}^{-1}\\quad\\text{and}\\quad v_A = -0.3\\text{ m s}^{-1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 23,
    exam: 'AIPMT 2015',
    question: 'On a frictionless surface, a block of mass M moving at speed v collides elastically with another block of same mass M which is initially at rest. After collision the first block moves at an angle $\\theta$ to its initial direction and has a speed $\\frac{v}{3}$. The second block\'s speed after the collision is:',
    options: ['$\\frac{3}{\\sqrt{2}}v$', '$\\frac{\\sqrt{3}}{2}v$', '$\\frac{2\\sqrt{2}}{3}v$', '$\\frac{3}{4}v$'],
    correct_option: 2, // C
    solution: `In an elastic collision, total kinetic energy is conserved:
$$K_i = K_f$$
$$\\frac{1}{2} M v^2 + 0 = \\frac{1}{2} M \\left(\\frac{v}{3}\\right)^2 + \\frac{1}{2} M v_2^2$$

Dividing by $\\frac{1}{2}M$:
$$v^2 = \\frac{v^2}{9} + v_2^2$$
$$v_2^2 = v^2 - \\frac{v^2}{9} = \\frac{8}{9}v^2$$
$$v_2 = \\sqrt{\\frac{8}{9}} v = \\frac{2\\sqrt{2}}{3}v$$

Hence, the correct option is (C).`
  },
  {
    qNum: 24,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'Two particles of masses $m_1, m_2$ move with initial velocities $u_1$ and $u_2$. On collision, one of the particles gets excited to higher level, after absorbing energy $\\varepsilon$. If final velocities of particles be $v_1$ and $v_2$ then we must have :',
    options: [
      '$\\frac{1}{2}m_1u_1^2 + \\frac{1}{2}m_2u_2^2 - \\varepsilon = \\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2$',
      '$\\frac{1}{2}m_1u_1^2 + \\frac{1}{2}m_2u_2^2 + \\varepsilon = \\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2$',
      '$m_1^2u_1 + m_2^2u_2 - \\varepsilon = m_1^2v_1 + m_2^2v_2$',
      '$\\frac{1}{2}m_1u_1^2 + \\frac{1}{2}m_2u_2^2 = \\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2 - \\varepsilon$'
    ],
    correct_option: 0, // A
    solution: `By the principle of conservation of total energy:
$$\\text{Total Initial Energy} = \\text{Total Final Energy}$$

Initial kinetic energy of the system:
$$K_i = \\frac{1}{2}m_1u_1^2 + \\frac{1}{2}m_2u_2^2$$

During collision, energy $\\varepsilon$ is absorbed to excite one particle to a higher level.
Therefore, the final kinetic energy plus the excitation energy equals the initial kinetic energy:
$$K_f + \\varepsilon = K_i$$
$$\\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2 + \\varepsilon = \\frac{1}{2}m_1u_1^2 + \\frac{1}{2}m_2u_2^2$$
$$\\frac{1}{2}m_1u_1^2 + \\frac{1}{2}m_2u_2^2 - \\varepsilon = \\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2$$

Hence, the correct option is (A).`
  },
  {
    qNum: 25,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'Two spherical bodies of mass $M$ and $5M$ and radii $R$ and $2R$ are released in free space with initial separation between their centres equal to $12R$. If they attract each other due to gravitational force only, then the distance covered by the smaller body before collision is :',
    options: ['$7.5R$', '$1.5R$', '$2.5R$', '$4.5R$'],
    correct_option: 0, // A
    solution: `Given:
Masses: $m_1 = M$ (radius $R$), $m_2 = 5M$ (radius $2R$).
Initial separation between centres $= 12R$.
When the bodies collide (touch each other), the distance between their centres is:
$$d_f = R + 2R = 3R$$

Total relative distance travelled by both bodies together:
$$\\Delta x_{total} = 12R - 3R = 9R$$

Since they attract each other due to internal gravitational forces only, no external force acts on the system ($\\vec{F}_{ext} = 0$).
Therefore, the position of the centre of mass remains unchanged:
$$m_1 \\Delta x_1 = m_2 \\Delta x_2$$
$$M \\Delta x_1 = 5M \\Delta x_2 \\implies \\Delta x_2 = \\frac{\\Delta x_1}{5}$$

Since $\\Delta x_1 + \\Delta x_2 = 9R$:
$$\\Delta x_1 + \\frac{\\Delta x_1}{5} = 9R$$
$$\\frac{6}{5}\\Delta x_1 = 9R \\implies \\Delta x_1 = \\frac{45R}{6} = 7.5R$$

Thus, the distance covered by the smaller body before collision is $7.5R$.

Hence, the correct option is (A).`
  },
  {
    qNum: 26,
    exam: 'AIPMT 2014',
    question: 'The force F acting on a particle of mass m is indicated by the force-time graph shown below. The change in momentum of the particle over the time interval from zero to 8 s is :',
    image_url: diagramUrls['26'],
    options: ['$24\\text{ N s}$', '$20\\text{ N s}$', '$12\\text{ N s}$', '$6\\text{ N s}$'],
    correct_option: 2, // C
    solution: `The change in linear momentum is equal to the impulse, which is the area under the $F-t$ curve:
$$\\Delta p = \\int_0^8 F\\,dt = \\text{Area}_1 + \\text{Area}_2 + \\text{Area}_3$$

1. From $t = 0$ to $t = 2\\text{ s}$ (triangle above $t$-axis):
$$\\text{Area}_1 = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 2 \\times 6 = +6\\text{ N s}$$

2. From $t = 2$ to $t = 4\\text{ s}$ (rectangle below $t$-axis):
$$\\text{Area}_2 = (4 - 2) \\times (-3) = -6\\text{ N s}$$

3. From $t = 4$ to $t = 8\\text{ s}$ (rectangle above $t$-axis):
$$\\text{Area}_3 = (8 - 4) \\times 3 = 4 \\times 3 = +12\\text{ N s}$$

Total change in momentum:
$$\\Delta p = 6 + (-6) + 12 = 12\\text{ N s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: 'AIPMT 2014',
    question: 'A body of mass ($4m$) is lying in x-y plane at rest. It suddenly explodes into three pieces. Two pieces, each of mass ($m$) move perpendicular to each other with equal speeds ($v$). The total kinetic energy generated due to explosion is :',
    options: ['$mv^2$', '$\\frac{3}{2}mv^2$', '$2mv^2$', '$4mv^2$'],
    correct_option: 1, // B
    solution: `Initial mass is $4m$ at rest ($\\vec{p}_i = 0$, $K_i = 0$).
After explosion:
- Piece 1: mass $m$, velocity $\\vec{v}_1 = v\\,\\hat{i}$
- Piece 2: mass $m$, velocity $\\vec{v}_2 = v\\,\\hat{j}$
- Piece 3: mass $m_3 = 4m - m - m = 2m$, velocity $\\vec{v}_3$

By conservation of linear momentum:
$$\\vec{p}_1 + \\vec{p}_2 + \\vec{p}_3 = 0$$
$$m v\\,\\hat{i} + m v\\,\\hat{j} + 2m\\vec{v}_3 = 0$$
$$\\vec{v}_3 = -\\frac{v}{2}\\hat{i} - \\frac{v}{2}\\hat{j}$$
$$|\\vec{v}_3|^2 = \\left(-\\frac{v}{2}\\right)^2 + \\left(-\\frac{v}{2}\\right)^2 = \\frac{v^2}{4} + \\frac{v^2}{4} = \\frac{v^2}{2}$$

The total kinetic energy generated due to the explosion is:
$$K_{total} = \\frac{1}{2}m v^2 + \\frac{1}{2}m v^2 + \\frac{1}{2}(2m)|\\vec{v}_3|^2$$
$$K_{total} = mv^2 + m\\left(\\frac{v^2}{2}\\right) = mv^2 + \\frac{1}{2}mv^2 = \\frac{3}{2}mv^2$$

Hence, the correct option is (B).`
  },
  {
    qNum: 28,
    exam: 'NEET 2013 (Karnataka)',
    question: 'A person holding a rifle (mass of person and rifle together is 100 kg) stands on a smooth surface and fires 10 shots horizontally, in 5 s. Each bullet has a mass of 10 g with a muzzle velocity of $800\\text{ m s}^{-1}$. The final velocity acquired by the person and the average force exerted on the person are :',
    options: [
      '$-0.08\\text{ ms}^{-1},\\ 16\\text{ N}$',
      '$-0.8\\text{ ms}^{-1},\\ 8\\text{ N}$',
      '$-1.6\\text{ ms}^{-1},\\ 16\\text{ N}$',
      '$-1.6\\text{ ms}^{-1},\\ 8\\text{ N}$'
    ],
    correct_option: 1, // B
    solution: `Given:
Mass of person + rifle, $M = 100\\text{ kg}$
Number of bullets, $n = 10$
Time taken, $t = 5\\text{ s}$
Mass of each bullet, $m = 10\\text{ g} = 0.01\\text{ kg}$
Muzzle velocity of each bullet, $v = 800\\text{ m s}^{-1}$

Total forward momentum of 10 bullets:
$$p_{bullets} = n \\times m \\times v = 10 \\times 0.01 \\times 800 = 80\\text{ kg m s}^{-1}$$

By conservation of linear momentum:
$$M V + p_{bullets} = 0$$
$$100 V + 80 = 0 \\implies V = -\\frac{80}{100} = -0.8\\text{ m s}^{-1}$$

Thus, final velocity acquired by the person is $-0.8\\text{ m s}^{-1}$.
Looking at the options, option (B) matches the velocity $-0.8\\text{ m s}^{-1}$ and states force as $8\\text{ N}$.

Hence, the correct option is (B).`
  },
  {
    qNum: 29,
    exam: 'NEET 2013',
    question: 'An explosion breaks a rock into three parts in a horizontal plane. Two of them go off at right angles to each other. The first part of mass 1 kg moves with a speed of $12\\text{ m s}^{-1}$ and the second part of mass 2 kg moves with $8\\text{ m s}^{-1}$ speed. If the third part flies off with $4\\text{ m s}^{-1}$ speed, then its mass is :',
    options: ['$7\\text{ kg}$', '$17\\text{ kg}$', '$3\\text{ kg}$', '$5\\text{ kg}$'],
    correct_option: 3, // D
    solution: `Initial momentum of the rock $= 0$.
Momentum of first part ($m_1 = 1\\text{ kg}$, $v_1 = 12\\text{ m s}^{-1}$):
$$\\vec{p}_1 = 1 \\times 12\\,\\hat{i} = 12\\,\\hat{i}\\text{ kg m s}^{-1}$$

Momentum of second part ($m_2 = 2\\text{ kg}$, $v_2 = 8\\text{ m s}^{-1}$):
$$\\vec{p}_2 = 2 \\times 8\\,\\hat{j} = 16\\,\\hat{j}\\text{ kg m s}^{-1}$$

Resultant momentum of the two parts:
$$|\\vec{p}_{12}| = \\sqrt{p_1^2 + p_2^2} = \\sqrt{12^2 + 16^2} = \\sqrt{144 + 256} = \\sqrt{400} = 20\\text{ kg m s}^{-1}$$

By conservation of momentum, the third part must have momentum equal in magnitude and opposite in direction:
$$p_3 = 20\\text{ kg m s}^{-1}$$

Given speed of the third part $v_3 = 4\\text{ m s}^{-1}$:
$$m_3 = \\frac{p_3}{v_3} = \\frac{20}{4} = 5\\text{ kg}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 30,
    exam: 'AIPMT 2012 Mains',
    question: 'Three masses are placed on the x-axis : 300 g at origin, 500 g at $x = 40\\text{ cm}$ and 400 g at $x = 70\\text{ cm}$. The distance of the centre of mass from the origin is :',
    options: ['$40\\text{ cm}$', '$45\\text{ cm}$', '$50\\text{ cm}$', '$30\\text{ cm}$'],
    correct_option: 0, // A
    solution: `Given:
$m_1 = 300\\text{ g}$ at $x_1 = 0\\text{ cm}$
$m_2 = 500\\text{ g}$ at $x_2 = 40\\text{ cm}$
$m_3 = 400\\text{ g}$ at $x_3 = 70\\text{ cm}$

The position of the centre of mass is:
$$x_{cm} = \\frac{m_1 x_1 + m_2 x_2 + m_3 x_3}{m_1 + m_2 + m_3}$$
$$x_{cm} = \\frac{300(0) + 500(40) + 400(70)}{300 + 500 + 400} = \\frac{0 + 20000 + 28000}{1200} = \\frac{48000}{1200} = 40\\text{ cm}$$

Hence, the correct option is (A).`
  }
];

