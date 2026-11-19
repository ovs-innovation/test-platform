export const MOTION_PYQ_PART3 = [
  {
    qNum: 71,
    exam: 'JEE Main 2023 (08 Apr, Shift 2)',
    question: 'The trajectory of projectile, projected from the ground is given by $y = x - \\frac{x^2}{20}$ where $x$ and $y$ are measured in meter. The maximum height attained by the projectile will be:',
    options: [
      '$200\\text{ m}$',
      '$10\\text{ m}$',
      '$5\\text{ m}$',
      '$10\\sqrt{2}\\text{ m}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `The given trajectory equation is:
$$y = x - \\frac{x^2}{20}$$
At the maximum height, $\\frac{dy}{dx} = 0$:
$$\\frac{dy}{dx} = 1 - \\frac{2x}{20} = 1 - \\frac{x}{10} = 0 \\implies x = 10\\text{ m}$$
Substituting $x = 10\\text{ m}$ into the equation of trajectory:
$$y_{max} = 10 - \\frac{(10)^2}{20} = 10 - \\frac{100}{20} = 10 - 5 = 5\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 72,
    exam: 'JEE Main 2023 (10 Apr, Shift 1)',
    question: 'The range of the projectile projected at an angle of $15^\\circ$ with horizontal is $50\\text{ m}$. If the projectile is projected with same velocity at an angle of $45^\\circ$ with horizontal, then its range will be:',
    options: [
      '$100\\text{ m}$',
      '$100\\sqrt{2}\\text{ m}$',
      '$50\\sqrt{2}\\text{ m}$',
      '$50\\text{ m}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Horizontal range is given by:
$$R = \\frac{u^2 \\sin 2\\theta}{g}$$
For $\\theta_1 = 15^\\circ$:
$$R_1 = \\frac{u^2 \\sin 30^\\circ}{g} = 50\\text{ m}$$
$$\\frac{u^2 (1/2)}{g} = 50 \\implies \\frac{u^2}{g} = 100\\text{ m}$$
For $\\theta_2 = 45^\\circ$:
$$R_2 = \\frac{u^2 \\sin 90^\\circ}{g} = \\frac{u^2}{g} = 100\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 73,
    exam: 'JEE Main 2023 (10 Apr, Shift 2)',
    question: 'Two projectiles are projected at $30^\\circ$ and $60^\\circ$ with the horizontal with the same speed. The ratio of the maximum height attained by the two projectiles respectively is:',
    options: [
      '$3 : 1$',
      '$1 : \\sqrt{3}$',
      '$\\sqrt{3} : 1$',
      '$1 : 3$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Maximum height is given by:
$$H = \\frac{u^2 \\sin^2\\theta}{2g}$$
Since the initial speeds are the same:
$$\\frac{H_1}{H_2} = \\frac{\\sin^2 30^\\circ}{\\sin^2 60^\\circ} = \\frac{(1/2)^2}{(\\sqrt{3}/2)^2} = \\frac{1/4}{3/4} = \\frac{1}{3} = 1 : 3$$

Hence, the correct option is (D).`
  },
  {
    qNum: 74,
    exam: 'JEE Main 2023 (11 Apr, Shift 1)',
    question: 'A projectile fired at $30^\\circ$ to the ground is observed to be at same height at time $3\\text{ s}$ and $5\\text{ s}$ after projection, during its flight. The speed of projection of the projectile is ___ m/s. (Given $g = 10\\text{ m/s}^2$)',
    options: [],
    correct_option: null,
    numeric_answer: 80,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `A projectile is at the same vertical height at two times $t_1$ and $t_2$.
The sum of these two times equals the total time of flight:
$$T = t_1 + t_2 = 3 + 5 = 8\\text{ s}$$
We also know that:
$$T = \\frac{2u\\sin\\theta}{g}$$
Given $\\theta = 30^\\circ$ and $g = 10\\text{ m/s}^2$:
$$8 = \\frac{2u \\sin 30^\\circ}{10} = \\frac{2u(1/2)}{10} = \\frac{u}{10} \\implies u = 80\\text{ m/s}$$

Answer: 80`
  },
  {
    qNum: 75,
    exam: 'JEE Main 2023 (11 Apr, Shift 2)',
    question: 'A projectile is projected at $30^\\circ$ from horizontal with initial velocity $40\\text{ m/s}$. The velocity of the projectile at $t = 2\\text{ s}$ from the start will be:',
    options: [
      '$40\\sqrt{3}\\text{ m/s}$',
      '$\\text{Zero}$',
      '$20\\text{ m/s}$',
      '$20\\sqrt{3}\\text{ m/s}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Initial velocity components:
$$u_x = u\\cos 30^\\circ = 40 \\times \\frac{\\sqrt{3}}{2} = 20\\sqrt{3}\\text{ m/s}$$
$$u_y = u\\sin 30^\\circ = 40 \\times \\frac{1}{2} = 20\\text{ m/s}$$
Time taken to reach maximum height:
$$t_{top} = \\frac{u_y}{g} = \\frac{20}{10} = 2\\text{ s}$$
At $t = 2\\text{ s}$, the projectile is at its maximum height, where the vertical velocity component is zero:
$$v_y = 0$$
The velocity of the projectile is purely horizontal:
$$v = v_x = 20\\sqrt{3}\\text{ m/s}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 76,
    exam: 'JEE Main 2024 (29 Jan, Shift 1)',
    question: 'A ball rolls off the top of a stairway with horizontal velocity $u$. The steps are $0.1\\text{ m}$ high and $0.1\\text{ m}$ wide. The minimum velocity $u$ with which that ball just hits the step 5 of the stairway will be $\\sqrt{x}\\text{ m/s}$, where $x = $ ___ [use $g = 10\\text{ m/s}^2$].',
    options: [],
    correct_option: null,
    numeric_answer: 2,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/motion_two_dimension/q76_diagram.png',
    solution: `To hit the $5^{\\text{th}}$ step, the ball must just clear the edge of the $4^{\\text{th}}$ step:
Horizontal distance to clear the $4^{\\text{th}}$ step:
$$x = 4 \\times 0.1\\text{ m} = 0.4\\text{ m}$$
Vertical drop to the $4^{\\text{th}}$ step:
$$y = 4 \\times 0.1\\text{ m} = 0.4\\text{ m}$$
Using vertical motion under gravity:
$$y = \\frac{1}{2}gt^2 \\implies 0.4 = \\frac{1}{2}(10)t^2 = 5t^2 \\implies t^2 = \\frac{0.4}{5} = 0.08\\text{ s}^2$$
For the horizontal motion:
$$x = ut \\implies u^2 = \\frac{x^2}{t^2} = \\frac{(0.4)^2}{0.08} = \\frac{0.16}{0.08} = 2 \\implies u = \\sqrt{2}\\text{ m/s}$$
Therefore, $x = 2$.

Answer: 2`
  },
  {
    qNum: 77,
    exam: 'JEE Main 2024 (30 Jan, Shift 2)',
    question: 'Projectiles A and B are thrown at angles of $45^\\circ$ and $60^\\circ$ with vertical respectively from top of a $400\\text{ m}$ high tower. If their times of flight are same, the ratio of their speeds of projection $v_A : v_B$ is:',
    options: [
      '$1 : \\sqrt{3}$',
      '$\\sqrt{2} : 1$',
      '$\\sqrt{3} : 1$',
      '$1 : \\sqrt{2}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The angles are given with the vertical:
For projectile A: $\\theta_A = 90^\\circ - 45^\\circ = 45^\\circ$ with the horizontal.
For projectile B: $\\theta_B = 90^\\circ - 60^\\circ = 30^\\circ$ with the horizontal.
Equation of vertical motion from a tower of height $H$:
$$-H = u_y t - \\frac{1}{2}gt^2$$
For both projectiles to have the identical time of flight $t$ from the same tower height $H$, their initial vertical velocity components must be equal:
$$u_{Ay} = u_{By} \\implies v_A \\sin 45^\\circ = v_B \\sin 30^\\circ$$
$$v_A \\left(\\frac{1}{\\sqrt{2}}\\right) = v_B \\left(\\frac{1}{2}\\right) \\implies \\frac{v_A}{v_B} = \\frac{\\sqrt{2}}{2} = \\frac{1}{\\sqrt{2}} = 1 : \\sqrt{2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 78,
    exam: 'JEE Main 2024 (31 Jan, Shift 1)',
    question: 'A body starts falling freely from height $H$ and hits an inclined plane in its path at height $h$. As a result of this perfectly elastic impact, the direction of the velocity of the body becomes horizontal. The value of $\\frac{H}{h}$ for which the body will take the maximum time to reach the ground is ___.',
    options: [],
    correct_option: null,
    numeric_answer: 2,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/motion_two_dimension/q78_diagram.png',
    solution: `1. Time taken to fall freely from height $H$ to height $h$ (distance $H - h$):
$$t_1 = \\sqrt{\\frac{2(H - h)}{g}}$$
2. After the elastic impact, the velocity becomes horizontal ($v_y = 0$).
The time taken to reach the ground from height $h$:
$$t_2 = \\sqrt{\\frac{2h}{g}}$$
Total time of flight:
$$T = t_1 + t_2 = \\sqrt{\\frac{2}{g}}\\left(\\sqrt{H - h} + \\sqrt{h}\\right)$$
For maximum $T$, differentiate with respect to $h$ and set to zero:
$$\\frac{dT}{dh} = \\sqrt{\\frac{2}{g}}\\left(-\\frac{1}{2\\sqrt{H - h}} + \\frac{1}{2\\sqrt{h}}\\right) = 0$$
$$\\frac{1}{\\sqrt{H - h}} = \\frac{1}{\\sqrt{h}} \\implies H - h = h \\implies H = 2h \\implies \\frac{H}{h} = 2$$

Answer: 2`
  },
  {
    qNum: 79,
    exam: 'JEE Main 2024 (01 Feb, Shift 1)',
    question: 'A particle moving in a circle of radius $R$ with uniform speed takes time $T$ to complete one revolution. If this particle is projected with the same speed at an angle $\\theta$ to the horizontal, the maximum height attained by it is equal to $4R$. The angle of projection $\\theta$ is then given by:',
    options: [
      '$\\sin^{-1}\\left[\\left(\\frac{2g T^2}{\\pi^2 R}\\right)^{1/2}\\right]$',
      '$\\sin^{-1}\\left[\\left(\\frac{\\pi^2 R}{2g T^2}\\right)^{1/2}\\right]$',
      '$\\cos^{-1}\\left[\\left(\\frac{2g T^2}{\\pi^2 R}\\right)^{1/2}\\right]$',
      '$\\cos^{-1}\\left[\\left(\\frac{\\pi^2 R}{2g T^2}\\right)^{1/2}\\right]$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Speed of the particle in circular motion:
$$v = \\frac{2\\pi R}{T}$$
Maximum height attained in projectile motion with initial speed $v$:
$$H = \\frac{v^2 \\sin^2\\theta}{2g}$$
Given $H = 4R$:
$$\\frac{v^2 \\sin^2\\theta}{2g} = 4R \\implies \\frac{\\left(\\frac{2\\pi R}{T}\\right)^2 \\sin^2\\theta}{2g} = 4R$$
$$\\frac{4\\pi^2 R^2 \\sin^2\\theta}{2g T^2} = 4R \\implies \\frac{\\pi^2 R \\sin^2\\theta}{2g T^2} = 1$$
$$\\sin^2\\theta = \\frac{2g T^2}{\\pi^2 R} \\implies \\sin\\theta = \\left(\\frac{2g T^2}{\\pi^2 R}\\right)^{1/2} \\implies \\theta = \\sin^{-1}\\left[\\left(\\frac{2g T^2}{\\pi^2 R}\\right)^{1/2}\\right]$$

Hence, the correct option is (A).`
  },
  {
    qNum: 80,
    exam: 'JEE Main 2024 (04 Apr, Shift 1)',
    question: 'The co-ordinates of a particle moving in $x - y$ plane are given by : $x = 2 + 4t, \\; y = 3t + 8t^2$. The motion of the particle is:',
    options: [
      'uniformly accelerated having motion along a parabolic path.',
      'uniform motion along a straight line.',
      'uniformly accelerated having motion along a straight line.',
      'non-uniformly accelerated.'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Given:
$x = 2 + 4t \\implies v_x = 4\\text{ m/s}, \\; a_x = 0$
$y = 3t + 8t^2 \\implies v_y = 3 + 16t, \\; a_y = 16\\text{ m/s}^2$
The acceleration $\\vec{a} = 16\\hat{j}\\text{ m/s}^2$ is constant, so the motion is uniformly accelerated.
From $x = 2 + 4t$, we have $t = \\frac{x - 2}{4}$.
Substituting into $y$:
$$y = 3\\left(\\frac{x - 2}{4}\\right) + 8\\left(\\frac{x - 2}{4}\\right)^2 = \\frac{3}{4}(x - 2) + \\frac{1}{2}(x - 2)^2$$
Since $y$ is quadratic in $x$, the path is a parabola.
Therefore, the motion is uniformly accelerated along a parabolic path.

Hence, the correct option is (A).`
  },
  {
    qNum: 81,
    exam: 'JEE Main 2024 (05 Apr, Shift 2)',
    question: 'The maximum height reached by a projectile is $64\\text{ m}$. If the initial velocity is halved, the new maximum height of the projectile is ___ m.',
    options: [],
    correct_option: null,
    numeric_answer: 16,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Maximum height of a projectile is given by:
$$H_{max} = \\frac{u^2 \\sin^2\\theta}{2g} \\implies H_{max} \\propto u^2$$
When the initial speed is halved ($u' = \\frac{u}{2}$):
$$H'_{max} = \\frac{(u/2)^2 \\sin^2\\theta}{2g} = \\frac{1}{4}\\left(\\frac{u^2 \\sin^2\\theta}{2g}\\right) = \\frac{H_{max}}{4}$$
Given $H_{max} = 64\\text{ m}$:
$$H'_{max} = \\frac{64}{4} = 16\\text{ m}$$

Answer: 16`
  },
  {
    qNum: 82,
    exam: 'JEE Main 2024 (08 Apr, Shift 2)',
    question: 'A body of mass $M$ thrown horizontally with velocity $v$ from the top of the tower of height $H$ touches the ground at a distance of $100\\text{ m}$ from the foot of the tower. A body of mass $2M$ thrown at a velocity $\\frac{v}{2}$ from the top of the tower of height $4H$ will touch the ground at a distance of ___ m.',
    options: [],
    correct_option: null,
    numeric_answer: 100,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'easy',
    image_url: '/uploads/motion_two_dimension/q82_diagram.png',
    solution: `For horizontal projection from height $h$ with speed $u$:
Horizontal range:
$$x = u \\sqrt{\\frac{2h}{g}}$$
For the first body:
$$x_1 = v \\sqrt{\\frac{2H}{g}} = 100\\text{ m}$$
For the second body:
$$x_2 = \\left(\\frac{v}{2}\\right) \\sqrt{\\frac{2(4H)}{g}} = \\left(\\frac{v}{2}\\right) \\cdot 2\\sqrt{\\frac{2H}{g}} = v\\sqrt{\\frac{2H}{g}} = x_1 = 100\\text{ m}$$

Answer: 100`
  },
  {
    qNum: 83,
    exam: 'JEE Main 2024 (08 Apr, Shift 2)',
    question: 'The angle of projection for a projectile to have same horizontal range and maximum height is:',
    options: [
      '$\\tan^{-1}(4)$',
      '$\\tan^{-1}\\left(\\frac{1}{4}\\right)$',
      '$\\tan^{-1}(1)$',
      '$\\tan^{-1}(2)$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Horizontal range:
$$R = \\frac{u^2 \\sin 2\\theta}{g} = \\frac{2u^2\\sin\\theta\\cos\\theta}{g}$$
Maximum height:
$$H = \\frac{u^2 \\sin^2\\theta}{2g}$$
Given $R = H$:
$$\\frac{2u^2\\sin\\theta\\cos\\theta}{g} = \\frac{u^2\\sin^2\\theta}{2g} \\implies 2\\cos\\theta = \\frac{\\sin\\theta}{2} \\implies \\tan\\theta = 4 \\implies \\theta = \\tan^{-1}(4)$$

Hence, the correct option is (A).`
  },
  {
    qNum: 84,
    exam: 'JEE Main 2025 (22 Jan, Shift 1)',
    question: 'A particle is projected at an angle of $30^\\circ$ from horizontal at a speed of $60\\text{ m/s}$. The height traversed by the particle in the first second is $h_1$ and height traversed in the last second, before it reaches the maximum height, is $h_2$. The ratio $h_1 : h_2$ is ___. [Take, $g = 10\\text{ m/s}^2$]',
    options: [],
    correct_option: null,
    numeric_answer: 5,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Initial vertical velocity:
$$u_y = u\\sin 30^\\circ = 60 \\times \\frac{1}{2} = 30\\text{ m/s}$$
Time to reach maximum height:
$$t = \\frac{u_y}{g} = \\frac{30}{10} = 3\\text{ s}$$
1. Height traversed in the first second ($t = 0$ to $t = 1\\text{ s}$):
$$h_1 = u_y(1) - \\frac{1}{2}g(1)^2 = 30(1) - 5(1) = 25\\text{ m}$$
2. Height traversed in the last second before reaching maximum height ($t = 2\\text{ s}$ to $t = 3\\text{ s}$):
By time symmetry of vertical motion, the distance covered in the last second going up is equal to the distance covered in the first second coming down from rest:
$$h_2 = \\frac{1}{2}g(1)^2 = \\frac{1}{2}(10)(1)^2 = 5\\text{ m}$$
Ratio:
$$\\frac{h_1}{h_2} = \\frac{25}{5} = 5$$

Answer: 5`
  },
  {
    qNum: 85,
    exam: 'JEE Main 2025 (22 Jan, Shift 1)',
    question: 'The position vectors of two $1\\text{ kg}$ particles, (A) and (B), are given by $\\vec{r}_A = (\\alpha_1 t^2\\hat{i} + \\alpha_2 t\\hat{j} + \\alpha_3 t\\hat{k})\\text{ m}$ and $\\vec{r}_B = (\\beta_1 t\\hat{i} + \\beta_2 t^2\\hat{j} + \\beta_3 t\\hat{k})\\text{ m}$, respectively; $(\\alpha_1 = 1\\text{ m/s}^2, \\alpha_2 = 3n\\text{ m/s}, \\alpha_3 = 2\\text{ m/s}, \\beta_1 = 2\\text{ m/s}, \\beta_2 = -1\\text{ m/s}^2, \\beta_3 = 4p\\text{ m/s})$, where $t$ is time, $n$ and $p$ are constants. At $t = 1\\text{ s}$, $|\\vec{v}_A| = |\\vec{v}_B|$ and velocities $\\vec{v}_A$ and $\\vec{v}_B$ of the particles are orthogonal to each other. At $t = 1\\text{ s}$, the magnitude of angular momentum of particle (A) with respect to the position of particle (B) is $\\sqrt{L}\\text{ kg m}^2\\text{s}^{-1}$. The value of $L$ is ___.',
    options: [],
    correct_option: null,
    numeric_answer: 90,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: `At $t = 1\\text{ s}$:
$$\\vec{v}_A = 2\\alpha_1\\hat{i} + \\alpha_2\\hat{j} + \\alpha_3\\hat{k} = 2\\hat{i} + 3n\\hat{j} + 2\\hat{k}$$
$$\\vec{v}_B = \\beta_1\\hat{i} + 2\\beta_2\\hat{j} + \\beta_3\\hat{k} = 2\\hat{i} - 2\\hat{j} + 4p\\hat{k}$$
Orthogonality: $\\vec{v}_A \\cdot \\vec{v}_B = 0$:
$$4 - 6n + 8p = 0$$
Equality of speed: $|\\vec{v}_A|^2 = |\\vec{v}_B|^2$:
$$4 + 9n^2 + 4 = 4 + 4 + 16p^2 \\implies 9n^2 = 16p^2 \\implies 3n = -4p$$
Substituting $3n = -4p$ into $4 - 2(3n) + 8p = 0$:
$$4 - 2(-4p) + 8p = 0 \\implies 4 + 16p = 0 \\implies p = -\\frac{1}{4}, \\quad n = \\frac{1}{3}$$
Relative position $\\vec{r}_{A/B} = \\vec{r}_A - \\vec{r}_B$ at $t = 1\\text{ s}$:
$$\\vec{r}_{A/B} = -\\hat{i} + 2\\hat{j} + 3\\hat{k}$$
$$\\vec{v}_A = 2\\hat{i} + \\hat{j} + 2\\hat{k}$$
Angular momentum $\\vec{L} = m (\\vec{r}_{A/B} \\times \\vec{v}_A)$ with $m = 1\\text{ kg}$:
$$\\vec{r}_{A/B} \\times \\vec{v}_A = (4 - 3)\\hat{i} - (-2 - 6)\\hat{j} + (-1 - 4)\\hat{k} = \\hat{i} + 8\\hat{j} - 5\\hat{k}$$
Magnitude squared:
$$L = |\\vec{L}|^2 = 1^2 + 8^2 + (-5)^2 = 1 + 64 + 25 = 90$$

Answer: 90`
  },
  {
    qNum: 86,
    exam: 'JEE Main 2025 (22 Jan, Shift 2)',
    question: 'A ball of mass $100\\text{ g}$ is projected with velocity $20\\text{ m/s}$ at $60^\\circ$ with horizontal. The decrease in kinetic energy of the ball during the motion from point of projection to highest point is:',
    options: [
      '$5\\text{ J}$',
      '$15\\text{ J}$',
      '$20\\text{ J}$',
      '$\\text{zero}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Mass $m = 100\\text{ g} = 0.1\\text{ kg}$, $u = 20\\text{ m/s}$, $\\theta = 60^\\circ$.
Kinetic energy at point of projection:
$$K_0 = \\frac{1}{2}m u^2 = \\frac{1}{2}(0.1)(20)^2 = \\frac{1}{2}(0.1)(400) = 20\\text{ J}$$
At the highest point, speed is $v = u\\cos 60^\\circ = 20 \\times \\frac{1}{2} = 10\\text{ m/s}$:
$$K_{top} = \\frac{1}{2}m v^2 = \\frac{1}{2}(0.1)(10)^2 = \\frac{1}{2}(0.1)(100) = 5\\text{ J}$$
Decrease in kinetic energy:
$$\\Delta K = K_0 - K_{top} = 20 - 5 = 15\\text{ J}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 87,
    exam: 'JEE Main 2025 (24 Jan, Shift 2)',
    question: 'The position vector of a moving body at any instant of time is given as $\\vec{r} = (5t^2\\hat{i} - 5t\\hat{j})\\text{ m}$. The magnitude and direction of velocity at $t = 2\\text{ s}$ is:',
    options: [
      '$5\\sqrt{15}\\text{ m/s, making an angle of } \\tan^{-1}4 \\text{ with } -\\text{ve } Y \\text{ axis}$',
      '$5\\sqrt{15}\\text{ m/s, making an angle of } \\tan^{-1}4 \\text{ with } +\\text{ve } X \\text{ axis}$',
      '$5\\sqrt{17}\\text{ m/s, making an angle of } \\tan^{-1}4 \\text{ with } +\\text{ve } X \\text{ axis}$',
      '$5\\sqrt{17}\\text{ m/s, making an angle of } \\tan^{-1}4 \\text{ with } -\\text{ve } Y \\text{ axis}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Velocity vector:
$$\\vec{v} = \\frac{d\\vec{r}}{dt} = 10t\\hat{i} - 5\\hat{j}\\text{ m/s}$$
At $t = 2\\text{ s}$:
$$\\vec{v} = 10(2)\\hat{i} - 5\\hat{j} = 20\\hat{i} - 5\\hat{j}\\text{ m/s}$$
Magnitude:
$$|\\vec{v}| = \\sqrt{(20)^2 + (-5)^2} = \\sqrt{400 + 25} = \\sqrt{425} = 5\\sqrt{17}\\text{ m/s}$$
Angle with the negative $Y$-axis:
$$\\tan\\theta = \\frac{v_x}{|v_y|} = \\frac{20}{5} = 4 \\implies \\theta = \\tan^{-1}(4)$$

Hence, the correct option is (D).`
  },
  {
    qNum: 88,
    exam: 'JEE Main 2025 (29 Jan, Shift 1)',
    question: 'Two projectiles are fired with same initial speed from same point on ground at angles of $(45^\\circ - \\alpha)$ and $(45^\\circ + \\alpha)$, respectively, with the horizontal direction. The ratio of their maximum heights attained is:',
    options: [
      '$\\frac{1 - \\tan\\alpha}{1 + \\tan\\alpha}$',
      '$\\frac{1 - \\sin 2\\alpha}{1 + \\sin 2\\alpha}$',
      '$\\frac{1 + \\sin 2\\alpha}{1 - \\sin 2\\alpha}$',
      '$\\frac{1 + \\sin\\alpha}{1 - \\sin\\alpha}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Maximum height of a projectile:
$$H = \\frac{u^2 \\sin^2\\theta}{2g}$$
Ratio of maximum heights:
$$\\frac{H_1}{H_2} = \\frac{\\sin^2(45^\\circ - \\alpha)}{\\sin^2(45^\\circ + \\alpha)}$$
Using $\\sin(45^\\circ \\pm \\alpha) = \\frac{\\cos\\alpha \\pm \\sin\\alpha}{\\sqrt{2}}$:
$$\\sin^2(45^\\circ - \\alpha) = \\frac{(\\cos\\alpha - \\sin\\alpha)^2}{2} = \\frac{\\cos^2\\alpha + \\sin^2\\alpha - 2\\sin\\alpha\\cos\\alpha}{2} = \\frac{1 - \\sin 2\\alpha}{2}$$
$$\\sin^2(45^\\circ + \\alpha) = \\frac{(\\cos\\alpha + \\sin\\alpha)^2}{2} = \\frac{\\cos^2\\alpha + \\sin^2\\alpha + 2\\sin\\alpha\\cos\\alpha}{2} = \\frac{1 + \\sin 2\\alpha}{2}$$
Therefore:
$$\\frac{H_1}{H_2} = \\frac{1 - \\sin 2\\alpha}{1 + \\sin 2\\alpha}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 89,
    exam: 'JEE Main 2025 (29 Jan, Shift 1)',
    question: 'The maximum speed of a boat in still water is $27\\text{ km/h}$. Now this boat is moving downstream in a river flowing at $9\\text{ km/h}$. A man in the boat throws a ball vertically upwards with speed of $10\\text{ m/s}$. Range of the ball as observed by an observer at rest on the river bank, is ___ cm. (Take $g = 10\\text{ m/s}^2$)',
    options: [],
    correct_option: null,
    numeric_answer: 2000,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Speed of the boat moving downstream relative to the bank:
$$v_{boat} = 27 + 9 = 36\\text{ km/h} = 36 \\times \\frac{5}{18} = 10\\text{ m/s}$$
Horizontal velocity of the ball relative to the river bank:
$$v_x = v_{boat} = 10\\text{ m/s}$$
Vertical velocity of projection:
$$u_y = 10\\text{ m/s}$$
Time of flight of the ball:
$$T = \\frac{2u_y}{g} = \\frac{2 \\times 10}{10} = 2\\text{ s}$$
Range of the ball as observed from the bank:
$$R = v_x \\times T = 10\\text{ m/s} \\times 2\\text{ s} = 20\\text{ m} = 2000\\text{ cm}$$

Answer: 2000`
  },
  {
    qNum: 90,
    exam: 'JEE Main 2025 (02 Apr, Shift 1)',
    question: 'A river is flowing from west to east direction with speed of $9\\text{ km/h}$. If a boat capable of moving at a maximum speed of $27\\text{ km/h}$ in still water, crosses the river in half a minute, while moving with maximum speed at an angle of $150^\\circ$ to direction of river flow, then the width of the river is:',
    options: [
      '$300\\text{ m}$',
      '$112.5\\text{ m}$',
      '$75\\text{ m}$',
      '$112.5\\sqrt{3}\\text{ m}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Speed of boat in still water $v_b = 27\\text{ km/h}$.
Angle with river flow direction $= 150^\\circ$.
The component of velocity perpendicular to the river flow (across the width) is:
$$v_y = v_b \\sin 150^\\circ = 27 \\times \\frac{1}{2} = 13.5\\text{ km/h}$$
Converting to $\\text{m/s}$:
$$v_y = 13.5 \\times \\frac{5}{18} = 3.75\\text{ m/s}$$
Time taken to cross the river:
$$t = 0.5\\text{ minute} = 30\\text{ s}$$
Width of the river $d$:
$$d = v_y \\times t = 3.75\\text{ m/s} \\times 30\\text{ s} = 112.5\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 91,
    exam: 'JEE Main 2025 (03 Apr, Shift 1)',
    question: 'The angle of projection of a particle is measured from the vertical axis as $\\theta$ and the maximum height reached by the particle is $h_m$. Here $h_m$ as function of $\\theta$ can be presented as:',
    options: [
      'Graph (A)',
      'Graph (B)',
      'Graph (C)',
      'Graph (D)'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/motion_two_dimension/q91_options_diagram.png',
    solution: `Since $\\theta$ is measured from the vertical axis, the angle of projection with the horizontal is $\\alpha = 90^\\circ - \\theta$.
The maximum height attained is:
$$h_m = \\frac{u^2 \\sin^2\\alpha}{2g} = \\frac{u^2 \\sin^2(90^\\circ - \\theta)}{2g} = \\frac{u^2 \\cos^2\\theta}{2g}$$
At $\\theta = 0$ (vertical throw), $h_m = \\frac{u^2}{2g}$ (maximum).
At $\\theta = 90^\\circ$ (horizontal throw), $h_m = 0$.
The function $h_m(\\theta) \\propto \\cos^2\\theta$ has zero derivative at $\\theta = 0$ and $\\theta = 90^\\circ$, smoothly decreasing from maximum to zero.
This corresponds to Graph (C).

Hence, the correct option is (C).`
  },
  {
    qNum: 92,
    exam: 'JEE Main 2025 (03 Apr, Shift 2)',
    question: 'A particle is projected with velocity $u$ so that its horizontal range is three times the maximum height attained by it. The horizontal range of the projectile is given as $\\frac{n u^2}{25g}$ where value of $n$ is: (Given $g$ is the acceleration due to gravity).',
    options: [
      '$8$',
      '$13$',
      '$19$',
      '$24$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Given $R = 3 H_{max}$:
$$\\frac{u^2 \\sin 2\\theta}{g} = 3 \\left(\\frac{u^2 \\sin^2\\theta}{2g}\\right)$$
$$2\\sin\\theta\\cos\\theta = \\frac{3}{2}\\sin^2\\theta \\implies \\tan\\theta = \\frac{4}{3}$$
From $\\tan\\theta = \\frac{4}{3}$, we have:
$$\\sin\\theta = \\frac{4}{5}, \\quad \\cos\\theta = \\frac{3}{5}$$
Horizontal range:
$$R = \\frac{2u^2\\sin\\theta\\cos\\theta}{g} = \\frac{2u^2 \\left(\\frac{4}{5}\\right)\\left(\\frac{3}{5}\\right)}{g} = \\frac{24 u^2}{25g}$$
Comparing with $\\frac{n u^2}{25g}$, we obtain $n = 24$.

Hence, the correct option is (D).`
  },
  {
    qNum: 93,
    exam: 'JEE Main 2025 (07 Apr, Shift 1)',
    question: 'Two projectiles are fired from ground with same initial speeds from same point at angles $(45^\\circ + \\alpha)$ and $(45^\\circ - \\alpha)$ with horizontal direction. The ratio of their times of flights is:',
    options: [
      '$1$',
      '$\\frac{1 - \\tan\\alpha}{1 + \\tan\\alpha}$',
      '$\\frac{1 + \\sin 2\\alpha}{1 - \\sin 2\\alpha}$',
      '$\\frac{1 + \\tan\\alpha}{1 - \\tan\\alpha}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Time of flight of a projectile:
$$T = \\frac{2u\\sin\\theta}{g}$$
For $\\theta_1 = 45^\\circ + \\alpha$ and $\\theta_2 = 45^\\circ - \\alpha$:
$$\\frac{T_1}{T_2} = \\frac{\\sin(45^\\circ + \\alpha)}{\\sin(45^\\circ - \\alpha)}$$
Expanding the sine expressions:
$$\\sin(45^\\circ + \\alpha) = \\sin 45^\\circ\\cos\\alpha + \\cos 45^\\circ\\sin\\alpha = \\frac{1}{\\sqrt{2}}(\\cos\\alpha + \\sin\\alpha)$$
$$\\sin(45^\\circ - \\alpha) = \\sin 45^\\circ\\cos\\alpha - \\cos 45^\\circ\\sin\\alpha = \\frac{1}{\\sqrt{2}}(\\cos\\alpha - \\sin\\alpha)$$
Dividing both expressions:
$$\\frac{T_1}{T_2} = \\frac{\\cos\\alpha + \\sin\\alpha}{\\cos\\alpha - \\sin\\alpha} = \\frac{1 + \\tan\\alpha}{1 - \\tan\\alpha}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 94,
    exam: 'JEE Main 2025 (07 Apr, Shift 2)',
    question: 'A helicopter flying horizontally with a speed of $360\\text{ km/h}$ at an altitude of $2\\text{ km}$, drops an object at an instant. The object hits the ground at a point O, $20\\text{ s}$ after it is dropped. Displacement of O from the position of helicopter where the object was released is: (use acceleration due to gravity $g = 10\\text{ m/s}^2$ and neglect air resistance)',
    options: [
      '$2\\sqrt{5}\\text{ km}$',
      '$4\\text{ km}$',
      '$7.2\\text{ km}$',
      '$2\\sqrt{2}\\text{ km}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Speed of helicopter:
$$v = 360\\text{ km/h} = 360 \\times \\frac{5}{18} = 100\\text{ m/s}$$
Horizontal distance travelled by the object in $20\\text{ s}$:
$$x = v \\times t = 100\\text{ m/s} \\times 20\\text{ s} = 2000\\text{ m} = 2\\text{ km}$$
Altitude of release point:
$$y = 2\\text{ km}$$
Straight line displacement of point O from the position where the object was released:
$$D = \\sqrt{x^2 + y^2} = \\sqrt{2^2 + 2^2} = \\sqrt{4 + 4} = \\sqrt{8} = 2\\sqrt{2}\\text{ km}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 95,
    exam: 'JEE Main 2025 (08 Apr, Shift 2)',
    question: 'Two balls with same mass and initial velocity, are projected at different angles in such a way that maximum height reached by first ball is 8 times higher than that of the second ball. $T_1$ and $T_2$ are the total flying times of first and second ball, respectively, then the ratio of $T_1$ and $T_2$ is:',
    options: [
      '$2\\sqrt{2} : 1$',
      '$\\sqrt{2} : 1$',
      '$2 : 1$',
      '$8 : 1$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Maximum height is given by:
$$H = \\frac{u^2 \\sin^2\\theta}{2g}$$
Given $H_1 = 8 H_2$:
$$\\frac{u^2\\sin^2\\theta_1}{2g} = 8\\left(\\frac{u^2\\sin^2\\theta_2}{2g}\\right) \\implies \\sin^2\\theta_1 = 8\\sin^2\\theta_2 \\implies \\sin\\theta_1 = 2\\sqrt{2}\\sin\\theta_2$$
Ratio of times of flight:
$$\\frac{T_1}{T_2} = \\frac{\\frac{2u\\sin\\theta_1}{g}}{\\frac{2u\\sin\\theta_2}{g}} = \\frac{\\sin\\theta_1}{\\sin\\theta_2} = \\frac{2\\sqrt{2}\\sin\\theta_2}{\\sin\\theta_2} = 2\\sqrt{2} : 1$$

Hence, the correct option is (A).`
  },
  {
    qNum: 96,
    exam: 'JEE Main 2025 (08 Apr, Shift 2)',
    question: 'A body of mass $2\\text{ kg}$ moving with velocity of $\\vec{v}_{in} = (3\\hat{i} + 4\\hat{j})\\text{ m/s}$ enters into a constant force field of $6\\text{ N}$ directed along positive $z$-axis. If the body remains in the field for a period of $3\\text{ seconds}$, then velocity of the body when it emerges from force field is:',
    options: [
      '$(4\\hat{i} + 3\\hat{j} + 9\\hat{k})\\text{ m/s}$',
      '$(3\\hat{i} + 4\\hat{j} + 9\\hat{k})\\text{ m/s}$',
      '$(3\\hat{i} + 4\\hat{j} + 5\\hat{k})\\text{ m/s}$',
      '$(3\\hat{i} + 4\\hat{j} + 6\\hat{k})\\text{ m/s}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Mass $m = 2\\text{ kg}$.
Force $\\vec{F} = 6\\hat{k}\\text{ N}$.
Acceleration:
$$\\vec{a} = \\frac{\\vec{F}}{m} = \\frac{6\\hat{k}}{2} = 3\\hat{k}\\text{ m/s}^2$$
Using equation of motion $\\vec{v} = \\vec{u} + \\vec{a}t$:
$$\\vec{v} = (3\\hat{i} + 4\\hat{j}) + (3\\hat{k})(3) = 3\\hat{i} + 4\\hat{j} + 9\\hat{k}\\text{ m/s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 97,
    exam: 'JEE Main 2026 (21 Jan, Shift 2)',
    question: 'A river of width $200\\text{ m}$ is flowing from west to east with a speed of $18\\text{ km/h}$. A boat, moving with speed of $36\\text{ km/h}$ in still water, is made to travel one-round trip (bank to bank of the river). Minimum time taken by the boat for this journey and also the displacement along the river bank are ___ and ___ respectively.',
    options: [
      '$20\\text{ s and } 100\\text{ m}$',
      '$40\\text{ s and } 0\\text{ m}$',
      '$40\\text{ s and } 200\\text{ m}$',
      '$40\\text{ s and } 100\\text{ m}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Width of river $d = 200\\text{ m}$.
Speed of river flow $v_r = 18\\text{ km/h} = 18 \\times \\frac{5}{18} = 5\\text{ m/s}$ (directed west to east).
Speed of boat in still water $v_b = 36\\text{ km/h} = 36 \\times \\frac{5}{18} = 10\\text{ m/s}$.
For minimum crossing time, the boat must head directly across perpendicular to the bank in both crossings:
$$t_1 = \\frac{d}{v_b} = \\frac{200}{10} = 20\\text{ s}$$
Total round-trip time:
$$T = 2 \\times 20 = 40\\text{ s}$$
Drift on first crossing (downstream):
$$x_1 = v_r \\times t_1 = 5 \\times 20 = 100\\text{ m}$$
On the return journey, the boat again heads perpendicular to the bank, and the river still flows in the same west-to-east direction:
$$x_2 = v_r \\times t_2 = 5 \\times 20 = 100\\text{ m}$$
Total downstream displacement along the bank:
$$x_{total} = x_1 + x_2 = 100 + 100 = 200\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 98,
    exam: 'JEE Main 2026 (22 Jan, Shift 1)',
    question: 'A projectile is thrown upward at an angle $60^\\circ$ with the horizontal. The speed of the projectile is $20\\text{ m/s}$ when its direction of motion is $45^\\circ$ with the horizontal. The initial speed of the projectile is ___ m/s.',
    options: [
      '$20\\sqrt{2}$',
      '$40$',
      '$40\\sqrt{2}$',
      '$20\\sqrt{3}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `The horizontal component of velocity remains constant throughout projectile flight:
$$u_x = v_x$$
$$u\\cos 60^\\circ = v\\cos 45^\\circ$$
Given $v = 20\\text{ m/s}$:
$$u\\left(\\frac{1}{2}\\right) = 20\\left(\\frac{1}{\\sqrt{2}}\\right) \\implies u = \\frac{40}{\\sqrt{2}} = 20\\sqrt{2}\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 99,
    exam: 'JEE Main 2026 (23 Jan, Shift 1)',
    question: 'An object is projected with kinetic energy $K$ from a point A at an angle $60^\\circ$ with the horizontal. The ratio of the difference in kinetic energies at points B and C to that at point A (see figure), in the absence of air friction is:',
    options: [
      '$1 : 4$',
      '$1 : 3$',
      '$3 : 4$',
      '$1 : 2$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: '/uploads/motion_two_dimension/q99_diagram.png',
    solution: `At launch point A:
$$K_A = K$$
At highest point B:
Speed is $v_B = u\\cos 60^\\circ = \\frac{u}{2}$.
$$K_B = \\frac{1}{2}m v_B^2 = \\frac{1}{2}m \\left(\\frac{u}{2}\\right)^2 = \\frac{K}{4}$$
At point C (at the same level as A):
By conservation of mechanical energy:
$$K_C = K$$
The magnitude of difference in kinetic energies at B and C:
$$|K_B - K_C| = \\left|\\frac{K}{4} - K\\right| = \\frac{3}{4}K$$
Ratio to kinetic energy at point A:
$$\\frac{|K_B - K_C|}{K_A} = \\frac{\\frac{3}{4}K}{K} = \\frac{3}{4} = 3 : 4$$

Hence, the correct option is (C).`
  },
  {
    qNum: 100,
    exam: 'JEE Main 2026 (24 Jan, Shift 1)',
    question: 'A boy throws a ball into air at $45^\\circ$ from the horizontal to land it on a roof of a building of height $H$. If the ball attains maximum height in $2\\text{ s}$ and lands on the building in $3\\text{ s}$ after launch, then value of $H$ is ___ m. ($g = 10\\text{ m/s}^2$)',
    options: [
      '$15$',
      '$20$',
      '$25$',
      '$10$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `At the maximum height ($t = 2\\text{ s}$), vertical velocity $v_y = 0$:
$$0 = u_y - gt \\implies u_y = 10(2) = 20\\text{ m/s}$$
Height at landing time $t = 3\\text{ s}$:
$$H = u_y t - \\frac{1}{2}gt^2 = 20(3) - \\frac{1}{2}(10)(3)^2 = 60 - 45 = 15\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 101,
    exam: 'JEE Main 2026 (04 Apr, Shift 1)',
    question: 'Two projectiles are projected with the same initial velocities at $15^\\circ$ and $30^\\circ$ with respect to the horizontal. The ratio of their ranges is $1 : x$. The value of $x$ is:',
    options: [
      '$\\sqrt{2}$',
      '$\\sqrt{3}$',
      '$2\\sqrt{3}$',
      '$\\frac{1}{\\sqrt{2}}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Horizontal range:
$$R = \\frac{u^2 \\sin 2\\theta}{g}$$
For $\\theta_1 = 15^\\circ$:
$$R_1 = \\frac{u^2 \\sin 30^\\circ}{g} = \\frac{u^2 (1/2)}{g}$$
For $\\theta_2 = 30^\\circ$:
$$R_2 = \\frac{u^2 \\sin 60^\\circ}{g} = \\frac{u^2 (\\sqrt{3}/2)}{g}$$
Ratio of their ranges:
$$\\frac{R_1}{R_2} = \\frac{1/2}{\\sqrt{3}/2} = \\frac{1}{\\sqrt{3}} = 1 : \\sqrt{3}$$
Comparing with $1 : x$, we get $x = \\sqrt{3}$.

Hence, the correct option is (B).`
  },
  {
    qNum: 102,
    exam: 'JEE Main 2026 (04 Apr, Shift 2)',
    question: 'A gun mounted on the ground fires bullets in all directions with same speed. The farthest distance the bullets could reach is $6.4\\text{ m}$. The speed of the bullets from the gun is ___ m/s. (take $g = 10\\text{ m/s}^2$)',
    options: [],
    correct_option: null,
    numeric_answer: 8,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `The maximum horizontal range of a projectile on level ground is given by:
$$R_{max} = \\frac{u^2}{g}$$
Given $R_{max} = 6.4\\text{ m}$ and $g = 10\\text{ m/s}^2$:
$$6.4 = \\frac{u^2}{10} \\implies u^2 = 64 \\implies u = 8\\text{ m/s}$$

Answer: 8`
  },
  {
    qNum: 103,
    exam: 'JEE Main 2026 (04 Apr, Shift 2)',
    question: 'If $x$ and $y$ coordinates of a projectile as a function of time ($t$) are given as $24t$ and $43.6t - 4.9t^2$, respectively, then the angle (in degrees) made by the projectile with horizontal when $t = 2\\text{ s}$ is ___ $^\\circ$.',
    options: [
      '$30$',
      '$45$',
      '$60$',
      '$75$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Given coordinates:
$x = 24t \\implies v_x = \\frac{dx}{dt} = 24\\text{ m/s}$
$y = 43.6t - 4.9t^2 \\implies v_y = \\frac{dy}{dt} = 43.6 - 9.8t$
At $t = 2\\text{ s}$:
$$v_y = 43.6 - 9.8(2) = 43.6 - 19.6 = 24\\text{ m/s}$$
The angle $\\theta$ made with the horizontal is given by:
$$\\tan\\theta = \\frac{v_y}{v_x} = \\frac{24}{24} = 1 \\implies \\theta = 45^\\circ$$

Hence, the correct option is (B).`
  },
  {
    qNum: 104,
    exam: 'JEE Main 2026 (08 Apr, Shift 2)',
    question: 'Two identical bodies, projected with the same speed at two different angles cover the same horizontal range $R$. If the time of flight of these bodies are $5\\text{ s}$ and $10\\text{ s}$, respectively, then the value of $R$ is ___ m. (Take $g = 10\\text{ m/s}^2$)',
    options: [
      '$250$',
      '$95$',
      '$500$',
      '$125$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `For two projectiles with the same initial speed $u$ to have the same range $R$, their projection angles must be complementary: $\\theta$ and $90^\\circ - \\theta$.
Their times of flight are:
$$t_1 = \\frac{2u\\sin\\theta}{g}, \\quad t_2 = \\frac{2u\\cos\\theta}{g}$$
Product of their times of flight:
$$t_1 t_2 = \\frac{4u^2\\sin\\theta\\cos\\theta}{g^2} = \\frac{2}{g}\\left(\\frac{u^2\\sin 2\\theta}{g}\\right) = \\frac{2R}{g}$$
Given $t_1 = 5\\text{ s}$, $t_2 = 10\\text{ s}$, and $g = 10\\text{ m/s}^2$:
$$5 \\times 10 = \\frac{2R}{10} \\implies 50 = \\frac{R}{5} \\implies R = 250\\text{ m}$$

Hence, the correct option is (A).`
  }
];
