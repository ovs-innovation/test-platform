export const MOTION_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'JEE Main 2003',
    question: 'Two stones are projected from the top of a cliff $h$ metres high, with the same speed $u$, so as to hit the ground at the same spot. If one of the stones is projected horizontally and the other at an angle $\\theta$ to the horizontal, then $\\tan\\theta$ equals:',
    options: [
      '$\\sqrt{\\frac{2gh}{u^2}}$',
      '$\\sqrt{\\frac{u^2}{2gh}}$',
      '$\\frac{2gh}{u^2}$',
      '$\\frac{u^2}{2gh}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `For the stone projected horizontally with speed $u$ from height $h$:
Time of flight is $t_1 = \\sqrt{\\frac{2h}{g}}$
Horizontal distance travelled is $R = u t_1 = u\\sqrt{\\frac{2h}{g}}$

For the stone projected at an angle $\\theta$ to the horizontal with speed $u$:
Horizontal velocity is $u_x = u\\cos\\theta$ and vertical velocity is $u_y = u\\sin\\theta$.
Taking downward as positive:
$h = -u\\sin\\theta \\cdot t_2 + \\frac{1}{2}gt_2^2$
Since both hit the ground at the same spot, horizontal range is the same:
$R = (u\\cos\\theta) t_2 = u\\sqrt{\\frac{2h}{g}} \\implies t_2 = \\frac{1}{\\cos\\theta}\\sqrt{\\frac{2h}{g}}$

Substituting $t_2$ into the vertical displacement equation gives:
$\\tan\\theta = \\sqrt{\\frac{2gh}{u^2}}$

Hence, the correct option is (A).`
  },
  {
    qNum: 2,
    exam: 'JEE Main 2003',
    question: 'A boy playing on the roof of a $10\\text{ m}$ high building throws a ball with a speed of $10\\text{ m/s}$ at an angle of $30^\\circ$ with the horizontal. How far from the throwing point will the ball be at the height of $10\\text{ m}$ from the ground? ($g = 10\\text{ m/s}^2$)',
    options: [
      '$5.20\\text{ m}$',
      '$4.33\\text{ m}$',
      '$2.60\\text{ m}$',
      '$8.66\\text{ m}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The ball is thrown from a height of $10\\text{ m}$ above the ground, and we need to find the horizontal distance when the ball returns to the same height ($10\\text{ m}$ from the ground).
This is simply the standard horizontal range of the projectile:
$$R = \\frac{u^2 \\sin 2\\theta}{g}$$
Given:
$u = 10\\text{ m/s}$, $\\theta = 30^\\circ$, $g = 10\\text{ m/s}^2$
$$R = \\frac{(10)^2 \\sin(2 \\times 30^\\circ)}{10} = \\frac{100 \\sin 60^\\circ}{10} = 10 \\times \\frac{\\sqrt{3}}{2} = 5\\sqrt{3} \\approx 8.66\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 3,
    exam: 'JEE Main 2004',
    question: 'If $t_1$ and $t_2$ are the times of flight of two particles having the same initial velocity $u$ and range $R$ on the horizontal, then $t_1^2 + t_2^2$ is equal to:',
    options: [
      '$\\frac{R^2}{g}$',
      '$\\frac{4u^2}{g^2}$',
      '$\\frac{2R}{g}$',
      '$\\frac{u^2}{2g}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `For the same initial speed $u$ and horizontal range $R$, the two angles of projection must be complementary, i.e., $\\theta$ and $(90^\\circ - \\theta)$.
The times of flight are:
$$t_1 = \\frac{2u\\sin\\theta}{g}, \\quad t_2 = \\frac{2u\\sin(90^\\circ - \\theta)}{g} = \\frac{2u\\cos\\theta}{g}$$
Squaring and adding:
$$t_1^2 + t_2^2 = \\frac{4u^2\\sin^2\\theta}{g^2} + \\frac{4u^2\\cos^2\\theta}{g^2} = \\frac{4u^2}{g^2}(\\sin^2\\theta + \\cos^2\\theta) = \\frac{4u^2}{g^2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 4,
    exam: 'JEE Main 2004',
    question: 'A projectile can have the same range $R$ for two angles of projection. If $T_1$ and $T_2$ be the time of flights in the two cases, then the product of the two time of flights is directly proportional to:',
    options: [
      '$\\frac{1}{R^2}$',
      '$\\frac{1}{R}$',
      '$R$',
      '$R^2$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `For a given speed $u$, the range is identical for complementary angles $\\theta$ and $(90^\\circ - \\theta)$:
$$T_1 = \\frac{2u\\sin\\theta}{g}, \\quad T_2 = \\frac{2u\\cos\\theta}{g}$$
Multiplying the two times of flight:
$$T_1 T_2 = \\frac{4u^2\\sin\\theta\\cos\\theta}{g^2} = \\frac{2}{g} \\left(\\frac{u^2\\sin 2\\theta}{g}\\right) = \\frac{2R}{g}$$
Since $g$ is constant:
$$T_1 T_2 \\propto R$$

Hence, the correct option is (C).`
  },
  {
    qNum: 5,
    exam: 'JEE Main 2005',
    question: 'A particle is projected from a point $O$ with velocity $u$ at an angle of $60^\\circ$ with the horizontal. When it is moving in a direction at right angles to its direction at $O$, its velocity then is given by:',
    options: [
      '$\\frac{u}{3}$',
      '$\\frac{u}{2}$',
      '$\\frac{2u}{3}$',
      '$\\frac{u}{\\sqrt{3}}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the initial velocity be $\\vec{u}$ at an angle of $60^\\circ$ to the horizontal.
When the velocity $\\vec{v}$ is perpendicular to $\\vec{u}$, the angle made by $\\vec{v}$ with the horizontal is $30^\\circ$ below the horizontal.
Since there is no acceleration in the horizontal direction, the horizontal component of velocity remains constant:
$$u \\cos 60^\\circ = v \\cos 30^\\circ$$
$$u \\left(\\frac{1}{2}\\right) = v \\left(\\frac{\\sqrt{3}}{2}\\right) \\implies v = \\frac{u}{\\sqrt{3}}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 6,
    exam: 'JEE Main 2005',
    question: 'A projectile can have the same range $R$ for two angles of projection. If $t_1$ and $t_2$ be the times of flights in the two cases, then the product of the two times of flight is proportional to:',
    options: [
      '$R^2$',
      '$\\frac{1}{R^2}$',
      '$\\frac{1}{R}$',
      '$R$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `For complementary angles $\\theta$ and $90^\\circ - \\theta$:
$$t_1 = \\frac{2u\\sin\\theta}{g}, \\quad t_2 = \\frac{2u\\cos\\theta}{g}$$
$$t_1 t_2 = \\frac{2}{g} \\left(\\frac{u^2 \\sin 2\\theta}{g}\\right) = \\frac{2R}{g} \\implies t_1 t_2 \\propto R$$

Hence, the correct option is (D).`
  },
  {
    qNum: 7,
    exam: 'JEE Main 2005',
    question: 'A particle is moving eastwards with a velocity of $5\\text{ m/s}$. In $10\\text{ seconds}$ the velocity changes to $5\\text{ m/s}$ northwards. The average acceleration in this time is:',
    options: [
      '$\\frac{1}{2}\\text{ m/s}^2\\text{ towards north-east}$',
      '$\\frac{1}{2}\\text{ m/s}^2\\text{ towards north}$',
      '$\\text{zero}$',
      '$\\frac{1}{\\sqrt{2}}\\text{ m/s}^2\\text{ towards north-west}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Initial velocity: $\\vec{v}_i = 5\\hat{i}\\text{ m/s}$ (eastwards)
Final velocity: $\\vec{v}_f = 5\\hat{j}\\text{ m/s}$ (northwards)
Change in velocity:
$$\\Delta \\vec{v} = \\vec{v}_f - \\vec{v}_i = 5\\hat{j} - 5\\hat{i}$$
Magnitude of change in velocity:
$$|\\Delta \\vec{v}| = \\sqrt{(-5)^2 + 5^2} = 5\\sqrt{2}\\text{ m/s}$$
Average acceleration:
$$\\vec{a}_{avg} = \\frac{\\Delta \\vec{v}}{\\Delta t} = \\frac{5\\hat{j} - 5\\hat{i}}{10} = -0.5\\hat{i} + 0.5\\hat{j}$$
Magnitude:
$$a_{avg} = \\frac{5\\sqrt{2}}{10} = \\frac{1}{\\sqrt{2}}\\text{ m/s}^2$$
Direction: negative $x$ (west) and positive $y$ (north), which is towards north-west.

Hence, the correct option is (D).`
  },
  {
    qNum: 8,
    exam: 'JEE Main 2007',
    question: 'A particle just clears a wall of height $b$ at distance $a$ and strikes the ground at a distance $c$ from the point of projection. The angle of projection is:',
    options: [
      '$\\tan^{-1}\\left(\\frac{b}{a}\\right)$',
      '$45^\\circ$',
      '$\\tan^{-1}\\left[\\frac{bc}{a(c - a)}\\right]$',
      '$\\tan^{-1}\\left[\\frac{c - a}{a}\\right]$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The equation of trajectory in terms of horizontal range $R$ is:
$$y = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)$$
Here, the particle strikes the ground at distance $c$, so the horizontal range is $R = c$.
At $x = a$, height is $y = b$:
$$b = a\\tan\\theta\\left(1 - \\frac{a}{c}\\right) = a\\tan\\theta\\left(\\frac{c - a}{c}\\right)$$
Rearranging for $\\tan\\theta$:
$$\\tan\\theta = \\frac{bc}{a(c - a)} \\implies \\theta = \\tan^{-1}\\left[\\frac{bc}{a(c - a)}\\right]$$

Hence, the correct option is (C).`
  },
  {
    qNum: 9,
    exam: 'JEE Main 2007',
    question: 'A particle is projected at $60^\\circ$ to the horizontal with a kinetic energy $K$. The kinetic energy at the highest point is:',
    options: [
      '$K$',
      '$\\text{Zero}$',
      '$\\frac{K}{2}$',
      '$\\frac{K}{4}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Initial kinetic energy at projection:
$$K = \\frac{1}{2}mu^2$$
At the highest point, the vertical component of velocity is zero, and only the horizontal component remains:
$$v_{top} = u\\cos 60^\\circ = \\frac{u}{2}$$
Therefore, kinetic energy at the highest point is:
$$K' = \\frac{1}{2}m v_{top}^2 = \\frac{1}{2}m \\left(\\frac{u}{2}\\right)^2 = \\frac{1}{4}\\left(\\frac{1}{2}mu^2\\right) = \\frac{K}{4}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 10,
    exam: 'JEE Main 2010',
    question: 'A particle is moving with velocity $\\vec{v} = K(y\\hat{i} + x\\hat{j})$, where $K$ is a constant. The general equation for its path is:',
    options: [
      '$y = x^2 + \\text{constant}$',
      '$y^2 = x + \\text{constant}$',
      '$xy = \\text{constant}$',
      '$y^2 = x^2 + \\text{constant}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The velocity vector is given by:
$$\\vec{v} = v_x\\hat{i} + v_y\\hat{j} = K(y\\hat{i} + x\\hat{j})$$
Therefore:
$$v_x = \\frac{dx}{dt} = Ky, \\quad v_y = \\frac{dy}{dt} = Kx$$
Dividing the two equations to find the differential equation of the trajectory:
$$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{Kx}{Ky} = \\frac{x}{y}$$
Separating variables:
$$y\\,dy = x\\,dx$$
Integrating both sides:
$$\\frac{y^2}{2} = \\frac{x^2}{2} + C' \\implies y^2 = x^2 + \\text{constant}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 11,
    exam: 'JEE Main 2011',
    question: 'A water fountain on the ground sprinkles water all around it. If the speed of water coming out of the fountain is $v$, the total area around the fountain that gets wet is:',
    options: [
      '$\\frac{\\pi v^4}{g^2}$',
      '$\\frac{\\pi v^2}{g^2}$',
      '$\\frac{\\pi v^4}{2g^2}$',
      '$\\frac{\\pi v^2}{2g^2}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `The maximum horizontal range of water projected at speed $v$ in any direction is:
$$R_{max} = \\frac{v^2}{g}$$
The water will spread out into a circle of radius $R = R_{max}$ around the fountain.
Therefore, the total area that gets wet is:
$$\\text{Area} = \\pi R_{max}^2 = \\pi \\left(\\frac{v^2}{g}\\right)^2 = \\frac{\\pi v^4}{g^2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 12,
    exam: 'JEE Main 2012 (Offline)',
    question: 'A boy can throw a stone up to a maximum height of $10\\text{ m}$. The maximum horizontal distance that the boy can throw the same stone up to will be:',
    options: [
      '$20\\sqrt{2}\\text{ m}$',
      '$10\\text{ m}$',
      '$10\\sqrt{2}\\text{ m}$',
      '$20\\text{ m}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Maximum vertical height when thrown straight up ($\\theta = 90^\\circ$):
$$H_{max} = \\frac{u^2}{2g} = 10\\text{ m} \\implies \\frac{u^2}{g} = 20\\text{ m}$$
The maximum horizontal range is achieved when thrown at $\\theta = 45^\\circ$:
$$R_{max} = \\frac{u^2}{g} = 2 H_{max} = 2 \\times 10 = 20\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 13,
    exam: 'JEE Main 2013 (07 Apr)',
    question: 'A projectile is given an initial velocity of $(\\hat{i} + 2\\hat{j})\\text{ m/s}$, where $\\hat{i}$ is along the ground and $\\hat{j}$ is along the vertical upward. If $g = 10\\text{ m/s}^2$, the equation of its trajectory is:',
    options: [
      '$4y = 2x - 5x^2$',
      '$4y = 2x - 25x^2$',
      '$y = x - 5x^2$',
      '$y = 2x - 5x^2$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Given initial velocity $\\vec{u} = \\hat{i} + 2\\hat{j}$:
Horizontal velocity $u_x = 1\\text{ m/s}$ (constant)
Vertical velocity $u_y = 2\\text{ m/s}$

Horizontal displacement at time $t$:
$$x = u_x t = 1 \\cdot t = t$$
Vertical displacement at time $t$:
$$y = u_y t - \\frac{1}{2}gt^2 = 2t - \\frac{1}{2}(10)t^2 = 2t - 5t^2$$
Substituting $t = x$:
$$y = 2x - 5x^2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 14,
    exam: 'JEE Main 2013 (22 Apr)',
    question: 'A ball projected from ground at an angle of $45^\\circ$ just clears a wall in front. If point of projection is $4\\text{ m}$ from the foot of wall and ball strikes the ground at a distance of $6\\text{ m}$ on the other side of the wall, the height of the wall is:',
    options: [
      '$4.4\\text{ m}$',
      '$2.4\\text{ m}$',
      '$3.6\\text{ m}$',
      '$1.6\\text{ m}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The total horizontal range of the projectile is the sum of the distances from the wall:
$$R = 4\\text{ m} + 6\\text{ m} = 10\\text{ m}$$
The equation of trajectory is:
$$y = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)$$
Given $\\theta = 45^\\circ$ and $x = 4\\text{ m}$:
$$y = 4 \\tan 45^\\circ \\left(1 - \\frac{4}{10}\\right) = 4 \\times 1 \\times 0.6 = 2.4\\text{ m}$$
Thus, the height of the wall is $2.4\\text{ m}$.

Hence, the correct option is (B).`
  },
  {
    qNum: 15,
    exam: 'JEE Main 2013 (25 Apr)',
    question: 'The maximum range of a bullet fired from a toy pistol mounted on a car at rest is $R_0 = 40\\text{ m}$. What will be the acute angle of inclination of the pistol for maximum range when the car is moving in the direction of firing with uniform velocity $v = 20\\text{ m/s}$ on a horizontal surface? ($g = 10\\text{ m/s}^2$)',
    options: [
      '$30^\\circ$',
      '$60^\\circ$',
      '$75^\\circ$',
      '$45^\\circ$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: `At rest, maximum range is $R_0 = \\frac{u^2}{g} = 40\\text{ m} \\implies u^2 = 400 \\implies u = 20\\text{ m/s}$.
When the car is moving with speed $v = 20\\text{ m/s}$ in the firing direction:
Effective horizontal velocity: $u_x = u\\cos\\theta + v$
Vertical velocity: $u_y = u\\sin\\theta$
Time of flight: $T = \\frac{2u\\sin\\theta}{g}$
Horizontal range:
$$R = (u\\cos\\theta + v)\\left(\\frac{2u\\sin\\theta}{g}\\right) = \\frac{u^2\\sin 2\\theta}{g} + \\frac{2uv\\sin\\theta}{g}$$
For maximum range, $\\frac{dR}{d\\theta} = 0$:
$$\\frac{2u^2\\cos 2\\theta}{g} + \\frac{2uv\\cos\\theta}{g} = 0 \\implies u(2\\cos^2\\theta - 1) + v\\cos\\theta = 0$$
Since $u = 20$ and $v = 20$:
$$20(2\\cos^2\\theta - 1) + 20\\cos\\theta = 0 \\implies 2\\cos^2\\theta + \\cos\\theta - 1 = 0$$
$$(2\\cos\\theta - 1)(\\cos\\theta + 1) = 0 \\implies \\cos\\theta = \\frac{1}{2} \\implies \\theta = 60^\\circ$$

Hence, the correct option is (B).`
  },
  {
    qNum: 16,
    exam: 'JEE Main 2014 (09 Apr)',
    question: 'The position of a projectile launched from the origin at $t = 0$ is given by $\\vec{r} = (40\\hat{i} + 50\\hat{j})\\text{ m}$ at $t = 2\\text{ s}$. If the projectile was launched at an angle $\\theta$ from the horizontal, then $\\theta$ is (take $g = 10\\text{ m/s}^2$):',
    options: [
      '$\\tan^{-1}\\left(\\frac{2}{3}\\right)$',
      '$\\tan^{-1}\\left(\\frac{3}{2}\\right)$',
      '$\\tan^{-1}\\left(\\frac{7}{4}\\right)$',
      '$\\tan^{-1}\\left(\\frac{4}{5}\\right)$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `At $t = 2\\text{ s}$, horizontal position is $x = 40\\text{ m}$ and vertical position is $y = 50\\text{ m}$.
For horizontal motion:
$$x = u_x t \\implies 40 = u_x (2) \\implies u_x = 20\\text{ m/s}$$
For vertical motion:
$$y = u_y t - \\frac{1}{2}gt^2 \\implies 50 = u_y(2) - \\frac{1}{2}(10)(2)^2$$
$$50 = 2u_y - 20 \\implies 2u_y = 70 \\implies u_y = 35\\text{ m/s}$$
The launch angle $\\theta$ is given by:
$$\\tan\\theta = \\frac{u_y}{u_x} = \\frac{35}{20} = \\frac{7}{4} \\implies \\theta = \\tan^{-1}\\left(\\frac{7}{4}\\right)$$

Hence, the correct option is (C).`
  },
  {
    qNum: 17,
    exam: 'JEE Main 2014 (11 Apr)',
    question: 'The initial speed of a bullet fired from a rifle is $630\\text{ m/s}$. The rifle is fired at the centre of a target $700\\text{ m}$ away at the same level as the target. How far above the centre of the target must the rifle be aimed? ($g = 9.8\\text{ m/s}^2$)',
    options: [
      '$1.0\\text{ m}$',
      '$4.2\\text{ m}$',
      '$6.1\\text{ m}$',
      '$9.8\\text{ m}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Time taken by the bullet to reach the target $700\\text{ m}$ away horizontally:
$$t = \\frac{x}{u} = \\frac{700}{630} = \\frac{10}{9}\\text{ s}$$
During this time, the bullet falls vertically due to gravity by a distance:
$$h = \\frac{1}{2}gt^2 = \\frac{1}{2}(9.8)\\left(\\frac{10}{9}\\right)^2 = 4.9 \\times \\frac{100}{81} \\approx 6.05\\text{ m} \\approx 6.1\\text{ m}$$
Therefore, the rifle must be aimed $6.1\\text{ m}$ above the target.

Hence, the correct option is (C).`
  },
  {
    qNum: 18,
    exam: 'JEE Main 2018 (15 Apr, Shift 2)',
    question: 'A man in a car at location $Q$ on a straight highway is moving with speed $v$. He decides to reach a point $P$ in a field at a distance $d$ from highway (point $M$) as shown in the figure. Speed of the car in the field is half to that on the highway. What should be the distance $RM$, so that the time taken to reach $P$ is minimum?',
    options: [
      '$\\frac{d}{\\sqrt{3}}$',
      '$\\frac{d}{2}$',
      '$\\frac{d}{\\sqrt{2}}$',
      '$d$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/motion_two_dimension/q18_diagram.png',
    solution: `Let $RM = x$. Then the distance travelled along the highway to point $R$ is $QR = QM - x$.
The distance travelled in the field from $R$ to $P$ is $RP = \\sqrt{x^2 + d^2}$.
Speed on highway $= v$, speed in field $= \\frac{v}{2}$.
Total time $t$:
$$t = \\frac{QM - x}{v} + \\frac{\\sqrt{x^2 + d^2}}{v/2} = \\frac{QM - x}{v} + \\frac{2\\sqrt{x^2 + d^2}}{v}$$
To minimize time, set $\\frac{dt}{dx} = 0$:
$$\\frac{dt}{dx} = -\\frac{1}{v} + \\frac{2}{v} \\cdot \\frac{x}{\\sqrt{x^2 + d^2}} = 0$$
$$\\frac{2x}{\\sqrt{x^2 + d^2}} = 1 \\implies 4x^2 = x^2 + d^2 \\implies 3x^2 = d^2 \\implies x = \\frac{d}{\\sqrt{3}}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 19,
    exam: 'JEE Main 2019 (09 Jan, Shift 2)',
    question: 'In a car race on straight road, car A takes a time $t$ less than car B at the finish and passes finishing point with a speed $v$ more than that of car B. Both the cars start from rest and travel with constant acceleration $a_1$ and $a_2$ respectively. Then $v$ is equal to:',
    options: [
      '$\\frac{2a_1 a_2}{a_1 + a_2}t$',
      '$\\frac{a_1 + a_2}{2}t$',
      '$\\sqrt{a_1 a_2}\\,t$',
      '$\\sqrt{2a_1 a_2}\\,t$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the track length be $S$.
For car A: $S = \\frac{1}{2}a_1 t_A^2 \\implies t_A = \\sqrt{\\frac{2S}{a_1}}$, and speed at finish is $v_A = a_1 t_A = \\sqrt{2a_1 S}$.
For car B: $S = \\frac{1}{2}a_2 t_B^2 \\implies t_B = \\sqrt{\\frac{2S}{a_2}}$, and speed at finish is $v_B = a_2 t_B = \\sqrt{2a_2 S}$.

Given $t_B - t_A = t$:
$$t = \\sqrt{2S}\\left(\\frac{1}{\\sqrt{a_2}} - \\frac{1}{\\sqrt{a_1}}\\right) = \\sqrt{2S}\\left(\\frac{\\sqrt{a_1} - \\sqrt{a_2}}{\\sqrt{a_1 a_2}}\\right)$$
And $v_A - v_B = v$:
$$v = \\sqrt{2S}(\\sqrt{a_1} - \\sqrt{a_2})$$
Dividing the two equations:
$$\\frac{v}{t} = \\sqrt{a_1 a_2} \\implies v = \\sqrt{a_1 a_2}\\,t$$

Hence, the correct option is (C).`
  },
  {
    qNum: 20,
    exam: 'JEE Main 2019 (10 Jan, Shift 1)',
    question: 'Two guns A and B can fire bullets at speeds $1\\text{ km/s}$ and $2\\text{ km/s}$ respectively. From a point on a horizontal ground, they are fired in all possible directions. The ratio of maximum areas covered by the bullets fired by the two guns, on the ground is:',
    options: [
      '$1 : 16$',
      '$1 : 2$',
      '$1 : 4$',
      '$1 : 8$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `The maximum horizontal range of bullets fired from ground is:
$$R_{max} = \\frac{u^2}{g}$$
The maximum area covered on the ground is a circle of radius $R_{max}$:
$$\\text{Area} = \\pi R_{max}^2 = \\pi \\left(\\frac{u^2}{g}\\right)^2 = \\frac{\\pi u^4}{g^2} \\implies \\text{Area} \\propto u^4$$
Therefore, the ratio of areas is:
$$\\frac{\\text{Area}_A}{\\text{Area}_B} = \\left(\\frac{u_A}{u_B}\\right)^4 = \\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16} = 1 : 16$$

Hence, the correct option is (A).`
  },
  {
    qNum: 21,
    exam: 'JEE Main 2019 (11 Jan, Shift 1)',
    question: 'A body is projected at $t = 0$ with a velocity $10\\text{ m/s}$ at an angle of $60^\\circ$ with the horizontal. The radius of curvature of its trajectory at $t = 1\\text{ s}$ is $R$. Neglecting air resistance and taking acceleration due to gravity $g = 10\\text{ m/s}^2$, the value of $R$ is:',
    options: [
      '$10.3\\text{ m}$',
      '$2.8\\text{ m}$',
      '$2.5\\text{ m}$',
      '$5.1\\text{ m}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: `Initial velocity components:
$$u_x = 10\\cos 60^\\circ = 5\\text{ m/s}, \\quad u_y = 10\\sin 60^\\circ = 5\\sqrt{3}\\text{ m/s}$$
At $t = 1\\text{ s}$:
$$v_x = 5\\text{ m/s}, \\quad v_y = u_y - gt = 5\\sqrt{3} - 10 \\approx 8.66 - 10 = -1.34\\text{ m/s}$$
Speed at $t = 1\\text{ s}$:
$$v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{25 + (5\\sqrt{3} - 10)^2} = \\sqrt{200 - 100\\sqrt{3}} \\approx 5.176\\text{ m/s}$$
Normal component of acceleration is perpendicular to velocity:
$$a_\\perp = g \\cos\\theta = 10 \\times \\frac{v_x}{v} = \\frac{50}{v}$$
Radius of curvature $R$:
$$R = \\frac{v^2}{a_\\perp} = \\frac{v^3}{50} \\approx \\frac{(5.176)^3}{50} \\approx 2.77\\text{ m} \\approx 2.8\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 22,
    exam: 'JEE Main 2019 (11 Jan, Shift 2)',
    question: 'A particle moves from the point $(2.0\\hat{i} + 4.0\\hat{j})\\text{ m}$, at $t = 0$, with an initial velocity $(5.0\\hat{i} + 4.0\\hat{j})\\text{ m/s}$. It is acted upon by a constant force which produces a constant acceleration $(4.0\\hat{i} + 4.0\\hat{j})\\text{ m/s}^2$. What is the distance of the particle from the origin at time $2\\text{ s}$?',
    options: [
      '$15\\text{ m}$',
      '$20\\sqrt{2}\\text{ m}$',
      '$5\\text{ m}$',
      '$10\\sqrt{2}\\text{ m}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Initial position: $\\vec{r}_0 = 2\\hat{i} + 4\\hat{j}\\text{ m}$
Initial velocity: $\\vec{u} = 5\\hat{i} + 4\\hat{j}\\text{ m/s}$
Acceleration: $\\vec{a} = 4\\hat{i} + 4\\hat{j}\\text{ m/s}^2$

Displacement at $t = 2\\text{ s}$:
$$\\Delta \\vec{r} = \\vec{u}t + \\frac{1}{2}\\vec{a}t^2 = (5\\hat{i} + 4\\hat{j})(2) + \\frac{1}{2}(4\\hat{i} + 4\\hat{j})(4) = (10\\hat{i} + 8\\hat{j}) + (8\\hat{i} + 8\\hat{j}) = 18\\hat{i} + 16\\hat{j}\\text{ m}$$
Position vector at $t = 2\\text{ s}$:
$$\\vec{r}(2) = \\vec{r}_0 + \\Delta \\vec{r} = (2\\hat{i} + 4\\hat{j}) + (18\\hat{i} + 16\\hat{j}) = 20\\hat{i} + 20\\hat{j}\\text{ m}$$
Distance from the origin:
$$|\\vec{r}(2)| = \\sqrt{20^2 + 20^2} = 20\\sqrt{2}\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 23,
    exam: 'JEE Main 2019 (12 Jan, Shift 1)',
    question: 'A passenger train of length $60\\text{ m}$ travels at a speed of $80\\text{ km/h}$. Another freight train of length $120\\text{ m}$ travels at a speed of $30\\text{ km/h}$. The ratio of times taken by the passenger train to completely cross the freight train when: (i) they are moving in the same direction, and (ii) in the opposite directions is:',
    options: [
      '$\\frac{5}{2}$',
      '$\\frac{3}{2}$',
      '$\\frac{11}{5}$',
      '$\\frac{25}{11}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Total distance to cross: $d = L_1 + L_2 = 60 + 120 = 180\\text{ m}$.
(i) When moving in the same direction:
Relative speed: $v_{rel,1} = 80 - 30 = 50\\text{ km/h}$
Time taken: $t_1 = \\frac{180}{50}$

(ii) When moving in opposite directions:
Relative speed: $v_{rel,2} = 80 + 30 = 110\\text{ km/h}$
Time taken: $t_2 = \\frac{180}{110}$

Ratio of times:
$$\\frac{t_1}{t_2} = \\frac{v_{rel,2}}{v_{rel,1}} = \\frac{110}{50} = \\frac{11}{5}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 24,
    exam: 'JEE Main 2019 (12 Jan, Shift 2)',
    question: 'Two particles A, B are moving on two concentric circles of radii $R_1$ and $R_2$ with equal angular speed $\\omega$. At $t = 0$, their positions and direction of motion are shown in the figure. The relative velocity $\\vec{v}_A - \\vec{v}_B$ at $t = \\frac{\\pi}{2\\omega}$ is given by:',
    options: [
      '$-\\omega(R_1 + R_2)\\hat{i}$',
      '$\\omega(R_1 + R_2)\\hat{i}$',
      '$\\omega(R_1 - R_2)\\hat{i}$',
      '$\\omega(R_2 - R_1)\\hat{i}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/motion_two_dimension/q24_diagram.png',
    solution: `At $t = 0$, particle A is at $(0, R_1)$ moving leftwards along $-\\hat{i}$, and particle B is at $(R_2, 0)$ moving upwards along $+\\hat{j}$.
In time $t = \\frac{\\pi}{2\\omega}$, each particle rotates by an angle:
$$\\theta = \\omega t = \\omega \\left(\\frac{\\pi}{2\\omega}\\right) = \\frac{\\pi}{2} = 90^\\circ$$
Particle A rotates $90^\\circ$ counterclockwise to $(-R_1, 0)$, where its velocity is directed downwards ($-\\hat{j}$) or around the tangent.
Taking the rotated velocity vectors:
$$\\vec{v}_A = -\\omega R_1 \\hat{i}$$
$$\\vec{v}_B = -\\omega R_2 \\hat{i}$$
Relative velocity:
$$\\vec{v}_A - \\vec{v}_B = -\\omega R_1\\hat{i} - (-\\omega R_2\\hat{i}) = \\omega(R_2 - R_1)\\hat{i}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 25,
    exam: 'JEE Main 2019 (08 Apr, Shift 1)',
    question: 'Ship A is sailing towards north-east with velocity $\\vec{v} = 30\\hat{i} + 50\\hat{j}\\text{ km/h}$ where $\\hat{i}$ points east and $\\hat{j}$ north. The ship B is at a distance of $80\\text{ km}$ east and $150\\text{ km}$ north of Ship A and is sailing towards the west at $10\\text{ km/h}$. A will be at the minimum distance from B in:',
    options: [
      '$4.2\\text{ h}$',
      '$3.2\\text{ h}$',
      '$2.6\\text{ h}$',
      '$2.2\\text{ h}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Taking ship A as reference:
$\\vec{v}_A = 30\\hat{i} + 50\\hat{j}\\text{ km/h}$
$\\vec{v}_B = -10\\hat{i}\\text{ km/h}$
Velocity of B relative to A:
$$\\vec{v}_{BA} = \\vec{v}_B - \\vec{v}_A = -10\\hat{i} - (30\\hat{i} + 50\\hat{j}) = -40\\hat{i} - 50\\hat{j}\\text{ km/h}$$
Initial position of B relative to A:
$$\\vec{r}_{BA} = 80\\hat{i} + 150\\hat{j}\\text{ km}$$
Time for minimum distance:
$$t_{min} = -\\frac{\\vec{r}_{BA} \\cdot \\vec{v}_{BA}}{|\\vec{v}_{BA}|^2} = -\\frac{(80)(-40) + (150)(-50)}{(-40)^2 + (-50)^2}$$
$$t_{min} = -\\frac{-3200 - 7500}{1600 + 2500} = \\frac{10700}{4100} = \\frac{107}{41} \\approx 2.6\\text{ h}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 26,
    exam: 'JEE Main 2019 (09 Apr, Shift 1)',
    question: 'The stream of a river is flowing with a speed of $2\\text{ km/h}$. A swimmer can swim at a speed of $4\\text{ km/h}$. The direction of the swimmer with respect to the flow of the river, to cross the river straight, is:',
    options: [
      '$150^\\circ$',
      '$90^\\circ$',
      '$120^\\circ$',
      '$60^\\circ$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Let the speed of river flow be $v_r = 2\\text{ km/h}$ along $+\\hat{i}$.
Speed of swimmer in still water is $v_s = 4\\text{ km/h}$.
To cross the river straight across (no drift along the flow), the horizontal component of the swimmer's velocity must cancel the river's flow:
$$v_s \\sin\\phi = v_r \\implies 4\\sin\\phi = 2 \\implies \\sin\\phi = \\frac{1}{2} \\implies \\phi = 30^\\circ$$
where $\\phi$ is the angle made with the perpendicular to the river bank upstream.
Therefore, the angle made with the direction of river flow is:
$$\\theta = 90^\\circ + 30^\\circ = 120^\\circ$$

Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: 'JEE Main 2019 (10 Apr, Shift 2)',
    question: 'A plane is inclined at an angle $\\alpha = 30^\\circ$ with respect to the horizontal. A particle is projected with a speed $u = 2\\text{ m/s}$, from the base of the plane, making an angle $\\theta = 15^\\circ$ with respect to the plane as shown in the figure. The distance from the base, at which the particle hits the plane is close to: (Take $g = 10\\text{ m/s}^2$)',
    options: [
      '$20\\text{ cm}$',
      '$18\\text{ cm}$',
      '$14\\text{ cm}$',
      '$26\\text{ cm}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/motion_two_dimension/q27_diagram.png',
    solution: `The range on an inclined plane of inclination $\\alpha$ for projection angle $\\theta$ relative to the incline is:
$$R = \\frac{2u^2 \\sin\\theta \\cos(\\theta + \\alpha)}{g \\cos^2\\alpha}$$
Given:
$u = 2\\text{ m/s}$, $\\theta = 15^\\circ$, $\\alpha = 30^\\circ$, $g = 10\\text{ m/s}^2$
$$\\theta + \\alpha = 15^\\circ + 30^\\circ = 45^\\circ$$
$$R = \\frac{2(2)^2 \\sin 15^\\circ \\cos 45^\\circ}{10 \\cos^2 30^\\circ} = \\frac{8 \\left(\\frac{\\sqrt{3}-1}{2\\sqrt{2}}\\right)\\left(\\frac{1}{\\sqrt{2}}\\right)}{10 \\left(\\frac{3}{4}\\right)}$$
$$R = \\frac{8(\\sqrt{3}-1)}{4 \\times 7.5} = \\frac{2(1.732 - 1)}{7.5} = \\frac{1.464}{7.5} \\approx 0.195\\text{ m} = 19.5\\text{ cm} \\approx 20\\text{ cm}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 28,
    exam: 'JEE Main 2019 (12 Apr, Shift 1)',
    question: 'A shell is fired from a fixed artillery gun with an initial speed $u$ such that it hits the target on the ground at a distance $R$ from it. If $t_1$ and $t_2$ are the values of the time taken by it to hit the target in two possible ways, the product $t_1 t_2$ is:',
    options: [
      '$\\frac{R}{2g}$',
      '$\\frac{R}{g}$',
      '$\\frac{2R}{g}$',
      '$\\frac{4R}{g}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `For the same range $R$ and projection speed $u$, the two angles of projection are complementary: $\\theta$ and $90^\\circ - \\theta$.
$$t_1 = \\frac{2u\\sin\\theta}{g}, \\quad t_2 = \\frac{2u\\cos\\theta}{g}$$
Multiplying:
$$t_1 t_2 = \\frac{4u^2\\sin\\theta\\cos\\theta}{g^2} = \\frac{2}{g} \\left(\\frac{u^2\\sin 2\\theta}{g}\\right) = \\frac{2R}{g}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 29,
    exam: 'JEE Main 2019 (12 Apr, Shift 1)',
    question: 'The trajectory of a projectile near the surface of the earth is given as $y = 2x - 9x^2$. If it were launched at an angle $\\theta_0$ with speed $v_0$ then ($g = 10\\text{ m/s}^2$):',
    options: [
      '$\\theta_0 = \\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)\\text{ and } v_0 = \\frac{5}{3}\\text{ m/s}$',
      '$\\theta_0 = \\cos^{-1}\\left(\\frac{2}{\\sqrt{5}}\\right)\\text{ and } v_0 = \\frac{5}{3}\\text{ m/s}$',
      '$\\theta_0 = \\sin^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)\\text{ and } v_0 = \\frac{5}{3}\\text{ m/s}$',
      '$\\theta_0 = \\sin^{-1}\\left(\\frac{2}{\\sqrt{5}}\\right)\\text{ and } v_0 = \\frac{5}{3}\\text{ m/s}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Comparing $y = 2x - 9x^2$ with the standard projectile trajectory equation:
$$y = x\\tan\\theta_0 - \\frac{g x^2}{2v_0^2\\cos^2\\theta_0}$$
1. Comparing coefficients of $x$:
$$\\tan\\theta_0 = 2 \\implies \\cos\\theta_0 = \\frac{1}{\\sqrt{1 + 2^2}} = \\frac{1}{\\sqrt{5}} \\implies \\theta_0 = \\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)$$

2. Comparing coefficients of $x^2$:
$$\\frac{g}{2v_0^2\\cos^2\\theta_0} = 9$$
$$\\frac{10}{2v_0^2(1/5)} = 9 \\implies \\frac{25}{v_0^2} = 9 \\implies v_0^2 = \\frac{25}{9} \\implies v_0 = \\frac{5}{3}\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 30,
    exam: 'JEE Main 2019 (12 Apr, Shift 2)',
    question: 'Two particles are projected from the same point with the same speed $u$ such that they have the same range $R$, but different maximum heights, $h_1$ and $h_2$. Which of the following is correct?',
    options: [
      '$R^2 = 2 h_1 h_2$',
      '$R^2 = 4 h_1 h_2$',
      '$R^2 = 8 h_1 h_2$',
      '$R^2 = 16 h_1 h_2$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `For the same initial speed $u$ and range $R$, the projection angles are $\\theta$ and $90^\\circ - \\theta$.
$$h_1 = \\frac{u^2\\sin^2\\theta}{2g}, \\quad h_2 = \\frac{u^2\\cos^2\\theta}{2g}$$
Product of the heights:
$$h_1 h_2 = \\frac{u^4\\sin^2\\theta\\cos^2\\theta}{4g^2} = \\frac{1}{16} \\left(\\frac{2u^2\\sin\\theta\\cos\\theta}{g}\\right)^2 = \\frac{1}{16} \\left(\\frac{u^2\\sin 2\\theta}{g}\\right)^2 = \\frac{R^2}{16}$$
Therefore:
$$R^2 = 16 h_1 h_2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 31,
    exam: 'JEE Main 2020 (09 Jan, Shift 2)',
    question: 'A particle starts from the origin at $t = 0$ with an initial velocity of $3.0\\hat{i}\\text{ m/s}$ and moves in the $x - y$ plane with a constant acceleration $(6.0\\hat{i} + 4.0\\hat{j})\\text{ m/s}^2$. The $x$-coordinate of the particle at the instant when its $y$-coordinate is $32\\text{ m}$ is $D$ meters. The value of $D$ is:',
    options: [
      '$32$',
      '$50$',
      '$60$',
      '$40$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Along the $y$-direction:
$u_y = 0$, $a_y = 4.0\\text{ m/s}^2$, $y = 32\\text{ m}$
$$y = u_y t + \\frac{1}{2}a_y t^2 \\implies 32 = 0 + \\frac{1}{2}(4.0)t^2 = 2t^2 \\implies t^2 = 16 \\implies t = 4\\text{ s}$$
Along the $x$-direction:
$u_x = 3.0\\text{ m/s}$, $a_x = 6.0\\text{ m/s}^2$
$$x = u_x t + \\frac{1}{2}a_x t^2 = 3.0(4) + \\frac{1}{2}(6.0)(4)^2 = 12 + 48 = 60\\text{ m}$$
Thus, $D = 60\\text{ m}$.

Hence, the correct option is (C).`
  },
  {
    qNum: 32,
    exam: 'JEE Main 2020 (06 Sep, Shift 2)',
    question: 'A particle moving in the $xy$-plane experiences a velocity dependent force $\\vec{F} = k(v_y\\hat{i} + v_x\\hat{j})$, where $v_x$ and $v_y$ are the $x$ and $y$ components of its velocity $\\vec{v}$. If $\\vec{a}$ is the acceleration of the particle, then which of the following statements is true for the particle?',
    options: [
      'The quantity $\\vec{v} \\times \\vec{a}$ is constant in time',
      '$\\vec{F}$ arises due to a magnetic field',
      'The kinetic energy of the particle is constant in time',
      'The quantity $\\vec{v} \\cdot \\vec{a}$ is constant in time'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: `The acceleration is:
$$\\vec{a} = \\frac{\\vec{F}}{m} = \\frac{k}{m}(v_y\\hat{i} + v_x\\hat{j})$$
Now compute the cross product $\\vec{v} \\times \\vec{a}$:
$$\\vec{v} \\times \\vec{a} = (v_x\\hat{i} + v_y\\hat{j}) \\times \\frac{k}{m}(v_y\\hat{i} + v_x\\hat{j}) = \\frac{k}{m}(v_x^2 - v_y^2)\\hat{k}$$
Since $\\frac{dv_x}{dt} = \\frac{k}{m}v_y$ and $\\frac{dv_y}{dt} = \\frac{k}{m}v_x$:
$$\\frac{d}{dt}(v_x^2 - v_y^2) = 2v_x \\frac{dv_x}{dt} - 2v_y \\frac{dv_y}{dt} = 2v_x\\left(\\frac{k}{m}v_y\\right) - 2v_y\\left(\\frac{k}{m}v_x\\right) = 0$$
Since $\\frac{d}{dt}(v_x^2 - v_y^2) = 0$, the magnitude and direction of $\\vec{v} \\times \\vec{a}$ are constant in time.

Hence, the correct option is (A).`
  },
  {
    qNum: 33,
    exam: 'JEE Main 2021 (26 Feb, Shift 2)',
    question: 'The trajectory of a projectile in a vertical plane is $y = \\alpha x - \\beta x^2$, where $\\alpha$ and $\\beta$ are constants and $x, y$ are respectively the horizontal and vertical distances of the projectile from the point of projection. The angle of projection $\\theta$ and the maximum height attained $H$ are respectively given by:',
    options: [
      '$\\tan^{-1}\\alpha, \\; \\frac{4\\alpha^2}{\\beta}$',
      '$\\tan^{-1}\\beta, \\; \\frac{\\alpha^2}{\\beta}$',
      '$\\tan^{-1}\\alpha, \\; \\frac{\\alpha^2}{2\\beta}$',
      '$\\tan^{-1}\\alpha, \\; \\frac{\\alpha^2}{4\\beta}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Given the trajectory equation:
$$y = \\alpha x - \\beta x^2$$
At the point of projection ($x = 0$):
$$\\left(\\frac{dy}{dx}\\right)_{x=0} = \\alpha = \\tan\\theta \\implies \\theta = \\tan^{-1}\\alpha$$
Maximum height occurs where $\\frac{dy}{dx} = 0$:
$$\\frac{dy}{dx} = \\alpha - 2\\beta x = 0 \\implies x = \\frac{\\alpha}{2\\beta}$$
Substituting $x = \\frac{\\alpha}{2\\beta}$ back into the trajectory equation:
$$H = \\alpha\\left(\\frac{\\alpha}{2\\beta}\\right) - \\beta\\left(\\frac{\\alpha}{2\\beta}\\right)^2 = \\frac{\\alpha^2}{2\\beta} - \\frac{\\alpha^2}{4\\beta} = \\frac{\\alpha^2}{4\\beta}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 34,
    exam: 'JEE Main 2021 (16 Mar, Shift 2)',
    question: 'A swimmer can swim with velocity of $12\\text{ km/h}$ in still water. Water flowing in a river has velocity $6\\text{ km/h}$. The direction with respect to the direction of flow of river water he should swim in order to reach the point on the other bank just opposite to his starting point is ___ degrees. (Round off to the Nearest Integer)',
    options: [],
    correct_option: null,
    numeric_answer: 120,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the speed of the swimmer in still water be $v_s = 12\\text{ km/h}$ and the river flow velocity be $v_r = 6\\text{ km/h}$.
To reach directly opposite, the resultant velocity must be perpendicular to the river bank.
If the swimmer aims at an angle $\\phi$ with the perpendicular upstream:
$$v_s \\sin\\phi = v_r \\implies \\sin\\phi = \\frac{v_r}{v_s} = \\frac{6}{12} = \\frac{1}{2} \\implies \\phi = 30^\\circ$$
The angle made with the direction of flow of the river is:
$$\\theta = 90^\\circ + \\phi = 90^\\circ + 30^\\circ = 120^\\circ$$

Answer: 120`
  },
  {
    qNum: 35,
    exam: 'JEE Main 2021 (18 Mar, Shift 1)',
    question: 'A person is swimming with a speed of $10\\text{ m/s}$ at an angle of $120^\\circ$ with the flow and reaches to a point directly opposite on the other side of the river. The speed of the flow is $x\\text{ m/s}$. The value of $x$ to the nearest integer is ___.',
    options: [],
    correct_option: null,
    numeric_answer: 5,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `The swimmer swims at an angle of $120^\\circ$ with the river flow direction.
The angle made with the direction opposite to river flow is $180^\\circ - 120^\\circ = 60^\\circ$.
Since the swimmer lands directly opposite, the component of the swimmer's velocity opposite to the flow must balance the flow velocity $x$:
$$x = v_s \\cos 60^\\circ = 10 \\times \\frac{1}{2} = 5\\text{ m/s}$$
Thus, $x = 5$.

Answer: 5`
  }
];
