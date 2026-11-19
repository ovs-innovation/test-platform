export const MOTION_PYQ_PART2 = [
  {
    qNum: 36,
    exam: 'JEE Main 2021 (18 Mar, Shift 2)',
    question: 'The projectile motion of a particle of mass $5\\text{ g}$ is shown in the figure. The initial velocity of the particle is $5\\sqrt{2}\\text{ m/s}$ and the air resistance is assumed to be negligible. The magnitude of the change in momentum between the points A and B is $x \\times 10^{-2}\\text{ kg m/s}$. The value of $x$, to the nearest integer, is ___.',
    options: [],
    correct_option: null,
    numeric_answer: 5,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/motion_two_dimension/q36_diagram.png',
    solution: `Given:
Mass of particle $m = 5\\text{ g} = 5 \\times 10^{-3}\\text{ kg}$
Initial velocity $u = 5\\sqrt{2}\\text{ m/s}$ at $\\theta = 45^\\circ$
At point A (launch point):
$$\\vec{v}_A = u\\cos 45^\\circ \\hat{i} + u\\sin 45^\\circ \\hat{j} = 5\\hat{i} + 5\\hat{j}$$
At point B (landing point at the same level):
$$\\vec{v}_B = u\\cos 45^\\circ \\hat{i} - u\\sin 45^\\circ \\hat{j} = 5\\hat{i} - 5\\hat{j}$$
Change in velocity:
$$\\Delta \\vec{v} = \\vec{v}_B - \\vec{v}_A = -2u\\sin 45^\\circ \\hat{j} = -10\\hat{j}\\text{ m/s}$$
Magnitude of change in momentum:
$$|\\Delta \\vec{P}| = m |\\Delta \\vec{v}| = (5 \\times 10^{-3}\\text{ kg})(10\\text{ m/s}) = 50 \\times 10^{-3}\\text{ kg m/s} = 5 \\times 10^{-2}\\text{ kg m/s}$$
Comparing with $x \\times 10^{-2}\\text{ kg m/s}$, we get $x = 5$.

Answer: 5`
  },
  {
    qNum: 37,
    exam: 'JEE Main 2021 (20 Jul, Shift 1)',
    question: 'A butterfly is flying with a velocity $4\\sqrt{2}\\text{ m/s}$ in north-east direction. Wind is slowly blowing at $1\\text{ m/s}$ from north to south. The resultant displacement of the butterfly in $3\\text{ seconds}$ is:',
    options: [
      '$3\\text{ m}$',
      '$20\\text{ m}$',
      '$12\\sqrt{2}\\text{ m}$',
      '$15\\text{ m}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Velocity of butterfly relative to wind:
$$\\vec{v}_{bw} = 4\\sqrt{2}\\cos 45^\\circ \\hat{i} + 4\\sqrt{2}\\sin 45^\\circ \\hat{j} = 4\\hat{i} + 4\\hat{j}\\text{ m/s}$$
Velocity of wind (blowing southwards, i.e., along $-\\hat{j}$):
$$\\vec{v}_w = -1\\hat{j}\\text{ m/s}$$
Resultant velocity of the butterfly:
$$\\vec{v}_b = \\vec{v}_{bw} + \\vec{v}_w = (4\\hat{i} + 4\\hat{j}) + (-1\\hat{j}) = 4\\hat{i} + 3\\hat{j}\\text{ m/s}$$
Resultant displacement in $3\\text{ s}$:
$$\\vec{s} = \\vec{v}_b \\times t = (4\\hat{i} + 3\\hat{j}) \\times 3 = 12\\hat{i} + 9\\hat{j}\\text{ m}$$
Magnitude of displacement:
$$|\\vec{s}| = \\sqrt{(12)^2 + (9)^2} = \\sqrt{144 + 81} = \\sqrt{225} = 15\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 38,
    exam: 'JEE Main 2021 (20 Jul, Shift 1)',
    question: 'In a spring gun having spring constant $100\\text{ N/m}$ a small ball B of mass $100\\text{ g}$ is put in its barrel (as shown in figure) by compressing the spring through $0.05\\text{ m}$. There should be a box placed at a distance $d$ on the ground so that the ball falls in it. If the ball leaves the gun horizontally at a height of $2\\text{ m}$ above the ground, the value of $d$ is ___ m. ($g = 10\\text{ m/s}^2$)',
    options: [],
    correct_option: null,
    numeric_answer: 1,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/motion_two_dimension/q38_diagram.png',
    solution: `By conservation of mechanical energy when the spring is released:
$$\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2 \\implies v = x\\sqrt{\\frac{k}{m}}$$
Given $k = 100\\text{ N/m}$, $m = 100\\text{ g} = 0.1\\text{ kg}$, $x = 0.05\\text{ m}$:
$$v = 0.05\\sqrt{\\frac{100}{0.1}} = 0.05\\sqrt{1000} = 0.05 \\times 10\\sqrt{10} = 0.5\\sqrt{10}\\text{ m/s}$$
Time taken by the ball to reach the ground from height $h = 2\\text{ m}$:
$$t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\times 2}{10}} = \\sqrt{\\frac{4}{10}} = \\frac{2}{\\sqrt{10}}\\text{ s}$$
Horizontal distance $d$:
$$d = v \\times t = \\left(0.5\\sqrt{10}\\right) \\times \\left(\\frac{2}{\\sqrt{10}}\\right) = 1\\text{ m}$$

Answer: 1`
  },
  {
    qNum: 39,
    exam: 'JEE Main 2021 (20 Jul, Shift 2)',
    question: 'A boy reaches the airport and finds that the escalator is not working. He walks up the stationary escalator in time $t_1$. If he remains stationary on a moving escalator then the escalator takes him up in time $t_2$. The time taken by him to walk up on the moving escalator will be:',
    options: [
      '$\\frac{t_1 t_2}{t_2 - t_1}$',
      '$\\frac{t_1 + t_2}{2}$',
      '$\\frac{t_1 t_2}{t_1 + t_2}$',
      '$t_1 - t_2$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Let the length of the escalator be $L$.
Speed of boy on stationary escalator: $v_b = \\frac{L}{t_1}$
Speed of moving escalator: $v_e = \\frac{L}{t_2}$
When the boy walks up the moving escalator, the net upward speed is:
$$v = v_b + v_e = \\frac{L}{t_1} + \\frac{L}{t_2} = L\\left(\\frac{t_1 + t_2}{t_1 t_2}\\right)$$
Time taken to cover distance $L$:
$$t = \\frac{L}{v} = \\frac{L}{L\\left(\\frac{t_1 + t_2}{t_1 t_2}\\right)} = \\frac{t_1 t_2}{t_1 + t_2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 40,
    exam: 'JEE Main 2021 (27 Jul, Shift 2)',
    question: 'A swimmer wants to cross a river from point A to point B. Line AB makes an angle of $30^\\circ$ with the flow of the river. The magnitude of the velocity of the swimmer is the same as that of the river. The angle $\\theta$ with the line AB should be ___ $^\\circ$, so that the swimmer reaches point B.',
    options: [],
    correct_option: null,
    numeric_answer: 30,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/motion_two_dimension/q40_diagram.png',
    solution: `Let the velocity of the swimmer relative to water be $\\vec{v}_s$ and the river flow velocity be $\\vec{v}_r$.
Given $|\\vec{v}_s| = |\\vec{v}_r| = v$.
The resultant velocity $\\vec{v}_{res} = \\vec{v}_s + \\vec{v}_r$ must be directed along the straight line AB.
Since $\\vec{v}_s$ and $\\vec{v}_r$ have equal magnitudes, their resultant bisects the angle between them.
The line AB makes an angle of $30^\\circ$ with $\\vec{v}_r$.
Therefore, $\\vec{v}_s$ must make the same angle of $30^\\circ$ with the line AB on the other side.
Hence:
$$\\theta = 30^\\circ$$

Answer: 30`
  },
  {
    qNum: 41,
    exam: 'JEE Main 2021 (26 Aug, Shift 2)',
    question: 'A bomb is dropped by a fighter plane flying horizontally. To an observer sitting in the plane, the trajectory of the bomb is a:',
    options: [
      'straight line vertically down the plane',
      'parabola in a direction opposite to the motion of plane',
      'parabola in the direction of motion of plane',
      'hyperbola'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `When the bomb is dropped from the plane, both the plane and the bomb possess the same horizontal velocity component $v_x = v$ throughout the motion (ignoring air resistance).
Relative to the observer sitting inside the plane:
Relative horizontal velocity: $v_{rel, x} = v - v = 0$
Relative horizontal acceleration: $a_{rel, x} = 0$
Relative vertical acceleration: $a_{rel, y} = g$ downwards.
Thus, relative to the observer in the plane, the bomb falls straight down along a vertical line directly beneath the plane.

Hence, the correct option is (A).`
  },
  {
    qNum: 42,
    exam: 'JEE Main 2021 (27 Aug, Shift 2)',
    question: 'A player kicks a football with an initial speed of $25\\text{ m/s}$ at an angle of $45^\\circ$ from the ground. What are the maximum height and the time taken by the football to reach at the highest point during motion? (Take $g = 10\\text{ m/s}^2$)',
    options: [
      '$h_{max} = 15.625\\text{ m}, \\; T = 1.77\\text{ s}$',
      '$h_{max} = 3.54\\text{ m}, \\; T = 0.125\\text{ s}$',
      '$h_{max} = 10\\text{ m}, \\; T = 2.5\\text{ s}$',
      '$h_{max} = 15.625\\text{ m}, \\; T = 3.54\\text{ s}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Given $u = 25\\text{ m/s}$, $\\theta = 45^\\circ$, $g = 10\\text{ m/s}^2$.
1. Maximum height:
$$h_{max} = \\frac{u^2 \\sin^2\\theta}{2g} = \\frac{(25)^2 \\sin^2 45^\\circ}{2(10)} = \\frac{625 \\times (1/2)}{20} = \\frac{312.5}{20} = 15.625\\text{ m}$$

2. Time taken to reach the highest point:
$$t = \\frac{u\\sin\\theta}{g} = \\frac{25 \\sin 45^\\circ}{10} = \\frac{25 \\times \\frac{1}{\\sqrt{2}}}{10} = \\frac{2.5}{\\sqrt{2}} \\approx 1.768\\text{ s} \\approx 1.77\\text{ s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 43,
    exam: 'JEE Main 2021 (31 Aug, Shift 1)',
    question: 'A helicopter is flying horizontally with a speed $v$ at an altitude $h$ has to drop a food packet for a man on the ground. What is the distance of helicopter from the man when the food packet is dropped?',
    options: [
      '$\\sqrt{\\frac{2ghv^2}{h^2} + 1}$',
      '$\\sqrt{2ghv^2 + h^2}$',
      '$\\sqrt{\\frac{2gh}{v^2} + h^2}$',
      '$\\sqrt{\\frac{2v^2 h}{g} + h^2}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Time taken by the food packet to hit the ground from height $h$:
$$t = \\sqrt{\\frac{2h}{g}}$$
The horizontal distance travelled by the packet is:
$$x = v \\times t = v\\sqrt{\\frac{2h}{g}}$$
At the moment the packet is released, the helicopter is directly above the release point at vertical distance $h$ and horizontal distance $x$ from the man.
The straight-line distance $D$ of the helicopter from the man at that instant is:
$$D = \\sqrt{x^2 + h^2} = \\sqrt{\\left(v\\sqrt{\\frac{2h}{g}}\\right)^2 + h^2} = \\sqrt{\\frac{2v^2 h}{g} + h^2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 44,
    exam: 'JEE Main 2021 (01 Sep, Shift 2)',
    question: 'The ranges and heights for two projectiles projected with the same initial velocity at angles $42^\\circ$ and $48^\\circ$ with the horizontal are $R_1, R_2$ and $H_1, H_2$ respectively. Choose the correct option:',
    options: [
      '$R_1 = R_2 \\text{ and } H_1 = H_2$',
      '$R_1 = R_2 \\text{ and } H_1 < H_2$',
      '$R_1 > R_2 \\text{ and } H_1 = H_2$',
      '$R_1 < R_2 \\text{ and } H_1 < H_2$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Angles of projection are $\\theta_1 = 42^\\circ$ and $\\theta_2 = 48^\\circ$.
Since $\\theta_1 + \\theta_2 = 42^\\circ + 48^\\circ = 90^\\circ$ (complementary angles), the horizontal ranges are equal:
$$R_1 = R_2$$
Maximum height is given by:
$$H = \\frac{u^2 \\sin^2\\theta}{2g}$$
Since $48^\\circ > 42^\\circ$, $\\sin 48^\\circ > \\sin 42^\\circ$, which implies:
$$H_1 < H_2$$
Thus, $R_1 = R_2$ and $H_1 < H_2$.

Hence, the correct option is (B).`
  },
  {
    qNum: 45,
    exam: 'JEE Main 2022 (24 Jun, Shift 1)',
    question: 'A projectile is projected with velocity of $25\\text{ m/s}$ at an angle $\\theta$ with the horizontal. After $t$ seconds its inclination with horizontal becomes zero. If $R$ represents horizontal range of the projectile, the value of $\\theta$ will be: [use $g = 10\\text{ m/s}^2$]',
    options: [
      '$\\tan^{-1}\\left(\\frac{4R}{5t^2}\\right)$',
      '$\\cot^{-1}\\left(\\frac{5t^2}{2R}\\right)$',
      '$\\tan^{-1}\\left(\\frac{2t^2}{5R}\\right)$',
      '$\\cot^{-1}\\left(\\frac{R}{20t^2}\\right)$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The inclination with the horizontal becomes zero at the highest point of the trajectory.
Therefore, time to reach the highest point is:
$$t = \\frac{u\\sin\\theta}{g} \\implies u\\sin\\theta = gt$$
The horizontal range $R$ is:
$$R = \\frac{2u^2\\sin\\theta\\cos\\theta}{g} = \\frac{2(u\\sin\\theta)(u\\cos\\theta)}{g} = \\frac{2(gt)(u\\cos\\theta)}{g} = 2t(u\\cos\\theta)$$
$$u\\cos\\theta = \\frac{R}{2t}$$
Taking the ratio $\\frac{u\\cos\\theta}{u\\sin\\theta} = \\cot\\theta$:
$$\\cot\\theta = \\frac{R / (2t)}{gt} = \\frac{R}{2gt^2}$$
Substituting $g = 10\\text{ m/s}^2$:
$$\\cot\\theta = \\frac{R}{2(10)t^2} = \\frac{R}{20t^2} \\implies \\theta = \\cot^{-1}\\left(\\frac{R}{20t^2}\\right)$$

Hence, the correct option is (D).`
  },
  {
    qNum: 46,
    exam: 'JEE Main 2022 (24 Jun, Shift 2)',
    question: 'A body is projected from the ground at an angle of $45^\\circ$ with the horizontal. Its velocity after $2\\text{ s}$ is $20\\text{ m/s}$. The maximum height reached by the body during its motion is ___ m. (use $g = 10\\text{ m/s}^2$)',
    options: [],
    correct_option: null,
    numeric_answer: 20,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the initial speed of projection be $u$.
Horizontal velocity: $v_x = u\\cos 45^\\circ = \\frac{u}{\\sqrt{2}}$
Vertical velocity at $t = 2\\text{ s}$:
$$v_y = u\\sin 45^\\circ - gt = \\frac{u}{\\sqrt{2}} - 10(2) = \\frac{u}{\\sqrt{2}} - 20$$
Given speed at $t = 2\\text{ s}$ is $20\\text{ m/s}$:
$$v^2 = v_x^2 + v_y^2 \\implies 20^2 = \\left(\\frac{u}{\\sqrt{2}}\\right)^2 + \\left(\\frac{u}{\\sqrt{2}} - 20\\right)^2$$
$$400 = \\frac{u^2}{2} + \\frac{u^2}{2} - 20\\sqrt{2}u + 400$$
$$u^2 - 20\\sqrt{2}u = 0 \\implies u = 20\\sqrt{2}\\text{ m/s}$$
Maximum height reached:
$$H_{max} = \\frac{u^2\\sin^2 45^\\circ}{2g} = \\frac{(20\\sqrt{2})^2 \\times (1/2)}{2(10)} = \\frac{800 \\times 0.5}{20} = \\frac{400}{20} = 20\\text{ m}$$

Answer: 20`
  },
  {
    qNum: 47,
    exam: 'JEE Main 2022 (25 Jun, Shift 2)',
    question: 'Given below are two statements. One is labelled as Assertion A and the other is labelled as Reason R.\\nAssertion A: Two identical balls A and B thrown with same velocity $u$ at two different angles with horizontal attained the same range $R$. If A and B reached the maximum height $h_1$ and $h_2$ respectively, then $R = 4\\sqrt{h_1 h_2}$.\\nReason R: Product of said heights, $h_1 h_2 = \\left(\\frac{u^2\\sin^2\\theta}{2g}\\right)\\left(\\frac{u^2\\cos^2\\theta}{2g}\\right)$.',
    options: [
      'Both A and R are true and R is the correct explanation of A.',
      'Both A and R are true but R is NOT the correct explanation of A.',
      'A is true but R is false.',
      'A is false but R is true.'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `For the same speed $u$ and same range $R$, the two projection angles must be complementary: $\\theta$ and $90^\\circ - \\theta$.
The maximum heights are:
$$h_1 = \\frac{u^2\\sin^2\\theta}{2g}, \\quad h_2 = \\frac{u^2\\sin^2(90^\\circ - \\theta)}{2g} = \\frac{u^2\\cos^2\\theta}{2g}$$
Multiplying the two heights (Reason R):
$$h_1 h_2 = \\frac{u^4\\sin^2\\theta\\cos^2\\theta}{4g^2} = \\frac{1}{16}\\left(\\frac{u^2\\sin 2\\theta}{g}\\right)^2 = \\frac{R^2}{16}$$
Taking the square root on both sides:
$$\\sqrt{h_1 h_2} = \\frac{R}{4} \\implies R = 4\\sqrt{h_1 h_2}$$
Thus, both Assertion A and Reason R are true, and Reason R correctly explains Assertion A.

Hence, the correct option is (A).`
  },
  {
    qNum: 48,
    exam: 'JEE Main 2022 (26 Jun, Shift 1)',
    question: 'A fighter jet is flying horizontally at a certain altitude with a speed of $200\\text{ m/s}$. When it passes directly overhead an anti-aircraft gun, a bullet is fired from the gun, at an angle $\\theta$ with the horizontal, to hit the jet. If the bullet speed is $400\\text{ m/s}$, the value of $\\theta$ will be ___ $^\\circ$.',
    options: [],
    correct_option: null,
    numeric_answer: 60,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `For the bullet to hit the fighter jet flying horizontally overhead, their horizontal components of velocity must be equal:
$$v_{bullet, x} = v_{jet}$$
Given $v_{bullet} = 400\\text{ m/s}$ and $v_{jet} = 200\\text{ m/s}$:
$$400\\cos\\theta = 200 \\implies \\cos\\theta = \\frac{200}{400} = \\frac{1}{2}$$
$$\\theta = 60^\\circ$$

Answer: 60`
  },
  {
    qNum: 49,
    exam: 'JEE Main 2022 (27 Jun, Shift 1)',
    question: 'A girl standing on road holds her umbrella at $45^\\circ$ with the vertical to keep the rain away. If she starts running without umbrella with a speed of $15\\sqrt{2}\\text{ km/h}$, the rain drops hit her head vertically. The speed of rain drops with respect to the moving girl is:',
    options: [
      '$30\\text{ km/h}$',
      '$\\frac{25}{\\sqrt{2}}\\text{ km/h}$',
      '$\\frac{30}{\\sqrt{2}}\\text{ km/h}$',
      '$25\\text{ km/h}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `When the girl is stationary, rain makes an angle of $45^\\circ$ with the vertical:
$$\\vec{v}_r = -v_x\\hat{i} - v_y\\hat{j}$$
Since the angle is $45^\\circ$, $\\tan 45^\\circ = \\frac{v_x}{v_y} = 1 \\implies v_x = v_y$.
When the girl runs with $\\vec{v}_g = 15\\sqrt{2}\\hat{i}\\text{ km/h}$, the relative velocity is:
$$\\vec{v}_{rg} = \\vec{v}_r - \\vec{v}_g = (-v_x - 15\\sqrt{2})\\hat{i} - v_y\\hat{j}$$
The raindrops hit her head vertically, so the horizontal relative velocity is zero:
$$v_x = 15\\sqrt{2}\\text{ km/h} \\implies v_y = 15\\sqrt{2}\\text{ km/h}$$
The speed of raindrops relative to the moving girl is:
$$|\\vec{v}_{rg}| = v_y = 15\\sqrt{2} = \\frac{15 \\times 2}{\\sqrt{2}} = \\frac{30}{\\sqrt{2}}\\text{ km/h}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 50,
    exam: 'JEE Main 2022 (27 Jun, Shift 1)',
    question: 'A projectile is launched at an angle $\\alpha$ with the horizontal with a velocity $20\\text{ m/s}$. After $10\\text{ s}$, its inclination with horizontal is $\\beta$. The value of $\\tan\\beta$ will be : ($g = 10\\text{ m/s}^2$).',
    options: [
      '$\\tan\\alpha + 5\\sec\\alpha$',
      '$\\tan\\alpha - 5\\sec\\alpha$',
      '$2\\tan\\alpha - 5\\sec\\alpha$',
      '$2\\tan\\alpha + 5\\sec\\alpha$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Horizontal component of velocity (remains constant):
$$v_x = u\\cos\\alpha = 20\\cos\\alpha$$
Vertical component of velocity at $t = 10\\text{ s}$:
$$v_y = u\\sin\\alpha - gt = 20\\sin\\alpha - 10(10) = 20\\sin\\alpha - 100$$
The inclination $\\beta$ with the horizontal satisfies:
$$\\tan\\beta = \\frac{v_y}{v_x} = \\frac{20\\sin\\alpha - 100}{20\\cos\\alpha} = \\frac{20\\sin\\alpha}{20\\cos\\alpha} - \\frac{100}{20\\cos\\alpha} = \\tan\\alpha - 5\\sec\\alpha$$

Hence, the correct option is (B).`
  },
  {
    qNum: 51,
    exam: 'JEE Main 2022 (29 Jun, Shift 2)',
    question: 'A person can throw a ball upto a maximum range of $100\\text{ m}$. How high above the ground he can throw the same ball?',
    options: [
      '$25\\text{ m}$',
      '$50\\text{ m}$',
      '$100\\text{ m}$',
      '$200\\text{ m}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Maximum horizontal range is achieved at $\\theta = 45^\\circ$:
$$R_{max} = \\frac{u^2}{g} = 100\\text{ m}$$
Maximum height when thrown vertically upward ($\\theta = 90^\\circ$):
$$H_{max} = \\frac{u^2}{2g} = \\frac{R_{max}}{2} = \\frac{100}{2} = 50\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 52,
    exam: 'JEE Main 2022 (25 Jul, Shift 2)',
    question: 'A ball is projected from the ground with a speed $15\\text{ m/s}$ at an angle $\\theta$ with horizontal so that its range and maximum height are equal, then $\\tan\\theta$ will be equal to:',
    options: [
      '$\\frac{1}{4}$',
      '$\\frac{1}{2}$',
      '$2$',
      '$4$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Horizontal range:
$$R = \\frac{u^2\\sin 2\\theta}{g} = \\frac{2u^2\\sin\\theta\\cos\\theta}{g}$$
Maximum height:
$$H = \\frac{u^2\\sin^2\\theta}{2g}$$
Given $R = H$:
$$\\frac{2u^2\\sin\\theta\\cos\\theta}{g} = \\frac{u^2\\sin^2\\theta}{2g}$$
$$2\\cos\\theta = \\frac{\\sin\\theta}{2} \\implies \\tan\\theta = 4$$

Hence, the correct option is (D).`
  },
  {
    qNum: 53,
    exam: 'JEE Main 2022 (26 Jul, Shift 1)',
    question: 'If the initial velocity in horizontal direction of a projectile is unit vector $\\hat{i}$ and the equation of trajectory is $y = 5x(1 - x)$. The $y$ component vector of the initial velocity is ___ $\\hat{j}$. (Take $g = 10\\text{ m/s}^2$)',
    options: [],
    correct_option: null,
    numeric_answer: 5,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Given equation of trajectory:
$$y = 5x(1 - x) = 5x - 5x^2$$
Differentiating with respect to $x$:
$$\\frac{dy}{dx} = 5 - 10x$$
At the point of projection ($x = 0$):
$$\\left(\\frac{dy}{dx}\\right)_{x=0} = 5$$
We also know that $\\left(\\frac{dy}{dx}\\right)_{x=0} = \\frac{u_y}{u_x}$.
Given $u_x = 1\\text{ m/s}$:
$$\\frac{u_y}{1} = 5 \\implies u_y = 5\\text{ m/s}$$
Thus, the $y$-component vector of initial velocity is $5\\hat{j}$.

Answer: 5`
  },
  {
    qNum: 54,
    exam: 'JEE Main 2022 (26 Jul, Shift 1)',
    question: 'Two projectiles thrown at $30^\\circ$ and $45^\\circ$ with the horizontal respectively, reach the maximum height in same time. The ratio of their initial velocities is:',
    options: [
      '$1 : \\sqrt{2}$',
      '$2 : 1$',
      '$\\sqrt{2} : 1$',
      '$1 : 2$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Time to reach maximum height is:
$$t = \\frac{u\\sin\\theta}{g}$$
Given $t_1 = t_2$:
$$\\frac{u_1 \\sin 30^\\circ}{g} = \\frac{u_2 \\sin 45^\\circ}{g}$$
$$u_1 \\left(\\frac{1}{2}\\right) = u_2 \\left(\\frac{1}{\\sqrt{2}}\\right) \\implies \\frac{u_1}{u_2} = \\frac{2}{\\sqrt{2}} = \\frac{\\sqrt{2}}{1} = \\sqrt{2} : 1$$

Hence, the correct option is (C).`
  },
  {
    qNum: 55,
    exam: 'JEE Main 2022 (26 Jul, Shift 2)',
    question: 'Two projectiles are thrown with same initial velocity making an angle of $45^\\circ$ and $30^\\circ$ with the horizontal respectively. The ratio of their respective ranges will be:',
    options: [
      '$1 : 2$',
      '$\\sqrt{3} : 1$',
      '$2 : \\sqrt{3}$',
      '$3 : 2$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Horizontal range is given by:
$$R = \\frac{u^2 \\sin 2\\theta}{g}$$
For $\\theta_1 = 45^\\circ$:
$$R_1 = \\frac{u^2 \\sin 90^\\circ}{g} = \\frac{u^2}{g}$$
For $\\theta_2 = 30^\\circ$:
$$R_2 = \\frac{u^2 \\sin 60^\\circ}{g} = \\frac{u^2 (\\sqrt{3}/2)}{g}$$
Ratio of their ranges:
$$\\frac{R_1}{R_2} = \\frac{1}{\\sqrt{3}/2} = \\frac{2}{\\sqrt{3}} = 2 : \\sqrt{3}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 56,
    exam: 'JEE Main 2022 (27 Jul, Shift 1)',
    question: 'A ball of mass $m$ is thrown vertically upward. Another ball of mass $2m$ is thrown at an angle $\\theta$ with the vertical. Both the balls stay in air for the same period of time. The ratio of the heights attained by the two balls respectively is $\\frac{1}{x}$. The value of $x$ is ___.',
    options: [],
    correct_option: null,
    numeric_answer: 1,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Time of flight depends only on the vertical component of velocity:
$$T = \\frac{2u_y}{g}$$
Since both balls stay in air for the same time:
$$T_1 = T_2 \\implies u_{1y} = u_{2y}$$
The maximum height attained by any body in free flight under gravity is:
$$H = \\frac{u_y^2}{2g}$$
Since $u_{1y} = u_{2y}$, the maximum heights are equal:
$$H_1 = H_2 \\implies \\frac{H_1}{H_2} = 1 = \\frac{1}{x} \\implies x = 1$$

Answer: 1`
  },
  {
    qNum: 57,
    exam: 'JEE Main 2022 (27 Jul, Shift 2)',
    question: 'A body of mass $10\\text{ kg}$ is projected at an angle of $45^\\circ$ with the horizontal. The trajectory of the body is observed to pass through a point $(20, 10)$. If $T$ is the time of flight, then its momentum vector, at time $t = \\frac{T}{\\sqrt{2}}$, is ___. [Take $g = 10\\text{ m/s}^2$]',
    options: [
      '$[100\\hat{i} + (100\\sqrt{2} - 200)\\hat{j}]\\text{ N s}$',
      '$[100\\sqrt{2}\\hat{i} + (100 - 200\\sqrt{2})\\hat{j}]\\text{ N s}$',
      '$[100\\hat{j} + (100 - 200\\sqrt{2})\\hat{i}]\\text{ N s}$',
      '$[100\\sqrt{2}\\hat{i} + (100\\sqrt{2} - 200)\\hat{j}]\\text{ N s}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: `Using the trajectory equation with $(x, y) = (20, 10)$ and $\\theta = 45^\\circ$:
$$y = x\\tan\\theta - \\frac{g x^2}{2u^2\\cos^2\\theta}$$
$$10 = 20\\tan 45^\\circ - \\frac{10(20)^2}{2u^2\\cos^2 45^\\circ} = 20 - \\frac{4000}{2u^2(1/2)} = 20 - \\frac{4000}{u^2}$$
$$\\frac{4000}{u^2} = 10 \\implies u^2 = 400 \\implies u = 20\\text{ m/s}$$
Total time of flight:
$$T = \\frac{2u\\sin 45^\\circ}{g} = \\frac{2(20)(1/\\sqrt{2})}{10} = 2\\sqrt{2}\\text{ s}$$
At time $t = \\frac{T}{\\sqrt{2}} = \\frac{2\\sqrt{2}}{\\sqrt{2}} = 2\\text{ s}$:
$$v_x = u\\cos 45^\\circ = 20 \\times \\frac{1}{\\sqrt{2}} = 10\\sqrt{2}\\text{ m/s}$$
$$v_y = u\\sin 45^\\circ - gt = 10\\sqrt{2} - 10(2) = 10\\sqrt{2} - 20\\text{ m/s}$$
Momentum vector $\\vec{p} = m\\vec{v}$ with $m = 10\\text{ kg}$:
$$\\vec{p} = 10[10\\sqrt{2}\\hat{i} + (10\\sqrt{2} - 20)\\hat{j}] = [100\\sqrt{2}\\hat{i} + (100\\sqrt{2} - 200)\\hat{j}]\\text{ N s}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 58,
    exam: 'JEE Main 2022 (28 Jul, Shift 2)',
    question: 'At time $t = 0$ a particle starts travelling from a height $72\\text{ cm}$ in a plane keeping $z$ coordinate constant. At any instant of time, its position along the $x$ and $y$ directions are defined as $3t$ and $5t^3$ respectively. At $t = 1\\text{ s}$ acceleration of the particle will be:',
    options: [
      '$30\\hat{i}$',
      '$30\\hat{j}$',
      '$3\\hat{i} + 15\\hat{j}$',
      '$30\\hat{i} + 15\\hat{j} + 72\\hat{k}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Given position functions:
$x(t) = 3t$
$y(t) = 5t^3$
$z(t) = 72\\text{ cm} = \\text{constant}$

Velocity components:
$$v_x = \\frac{dx}{dt} = 3, \\quad v_y = \\frac{dy}{dt} = 15t^2, \\quad v_z = 0$$
Acceleration components:
$$a_x = \\frac{dv_x}{dt} = 0$$
$$a_y = \\frac{dv_y}{dt} = 30t$$
$$a_z = 0$$
At $t = 1\\text{ s}$:
$$a_y = 30(1) = 30\\text{ m/s}^2$$
$$\\vec{a} = 30\\hat{j}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 59,
    exam: 'JEE Main 2022 (29 Jul, Shift 1)',
    question: 'An object is projected in the air with initial velocity $u$ at an angle $\\theta$. The projectile motion is such that the horizontal range $R_m$ is maximum. Another object is projected in the air with a horizontal range half of the range of first object. The initial velocity remains same in both the cases. The value of the angle of projection, at which the second object is projected, will be ___ degree.',
    options: [],
    correct_option: null,
    numeric_answer: 15,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Maximum horizontal range is at $\\theta_1 = 45^\\circ$:
$$R_m = \\frac{u^2}{g}$$
The second object has range $R = \\frac{R_m}{2}$:
$$\\frac{u^2\\sin 2\\theta}{g} = \\frac{1}{2}\\left(\\frac{u^2}{g}\\right) \\implies \\sin 2\\theta = \\frac{1}{2}$$
$$2\\theta = 30^\\circ \\text{ or } 150^\\circ \\implies \\theta = 15^\\circ \\text{ or } 75^\\circ$$
The acute angle of projection is $15^\\circ$.

Answer: 15`
  },
  {
    qNum: 60,
    exam: 'JEE Main 2022 (29 Jul, Shift 1)',
    question: 'A ball is projected with kinetic energy $E$ at an angle of $60^\\circ$ to the horizontal. The kinetic energy of this ball at the highest point of its flight will become:',
    options: [
      '$\\text{Zero}$',
      '$\\frac{E}{2}$',
      '$\\frac{E}{4}$',
      '$\\frac{E}{\\sqrt{2}}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Initial kinetic energy:
$$E = \\frac{1}{2}mu^2$$
At the highest point, vertical velocity is zero, and horizontal velocity is:
$$v_{top} = u\\cos 60^\\circ = \\frac{u}{2}$$
Kinetic energy at the highest point:
$$E' = \\frac{1}{2}m v_{top}^2 = \\frac{1}{2}m \\left(\\frac{u}{2}\\right)^2 = \\frac{1}{4}\\left(\\frac{1}{2}mu^2\\right) = \\frac{E}{4}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 61,
    exam: 'JEE Main 2023 (24 Jan, Shift 1)',
    question: 'The maximum vertical height to which a man can throw a ball is $136\\text{ m}$. The maximum horizontal distance upto which he can throw the same ball is:',
    options: [
      '$192\\text{ m}$',
      '$136\\text{ m}$',
      '$272\\text{ m}$',
      '$68\\text{ m}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Maximum vertical height (thrown straight up):
$$H_{max} = \\frac{u^2}{2g} = 136\\text{ m} \\implies \\frac{u^2}{g} = 2 \\times 136 = 272\\text{ m}$$
Maximum horizontal range is attained at $\\theta = 45^\\circ$:
$$R_{max} = \\frac{u^2}{g} = 2 H_{max} = 272\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 62,
    exam: 'JEE Main 2023 (25 Jan, Shift 2)',
    question: 'Two objects are projected with same velocity $u$ however at different angles $\\alpha$ and $\\beta$ with the horizontal. If $\\alpha + \\beta = 90^\\circ$, the ratio of horizontal range of the first object to the $2^{\\text{nd}}$ object will be:',
    options: [
      '$4 : 1$',
      '$2 : 1$',
      '$1 : 2$',
      '$1 : 1$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Given $\\beta = 90^\\circ - \\alpha$.
Range of first projectile:
$$R_1 = \\frac{u^2 \\sin 2\\alpha}{g}$$
Range of second projectile:
$$R_2 = \\frac{u^2 \\sin 2\\beta}{g} = \\frac{u^2 \\sin(2(90^\\circ - \\alpha))}{g} = \\frac{u^2 \\sin(180^\\circ - 2\\alpha)}{g} = \\frac{u^2 \\sin 2\\alpha}{g}$$
Since $R_1 = R_2$, the ratio is:
$$\\frac{R_1}{R_2} = 1 : 1$$

Hence, the correct option is (D).`
  },
  {
    qNum: 63,
    exam: 'JEE Main 2023 (29 Jan, Shift 1)',
    question: 'A stone is projected at angle $30^\\circ$ to the horizontal. The ratio of kinetic energy of the stone at point of projection to its kinetic energy at the highest point of flight will be:',
    options: [
      '$1 : 2$',
      '$1 : 4$',
      '$4 : 1$',
      '$4 : 3$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Kinetic energy at point of projection:
$$K_0 = \\frac{1}{2}mv^2$$
At the highest point, speed is $v\\cos 30^\\circ$:
$$K_{top} = \\frac{1}{2}m(v\\cos 30^\\circ)^2 = \\frac{1}{2}mv^2 \\cos^2 30^\\circ = K_0 \\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4}K_0$$
Ratio of kinetic energy at projection to highest point:
$$\\frac{K_0}{K_{top}} = \\frac{1}{3/4} = \\frac{4}{3} = 4 : 3$$

Hence, the correct option is (D).`
  },
  {
    qNum: 64,
    exam: 'JEE Main 2023 (31 Jan, Shift 1)',
    question: 'The speed of a swimmer is $4\\text{ km/h}$ in still water. If the swimmer makes his strokes normal to the flow of river of width $1\\text{ km}$, he reaches a point $750\\text{ m}$ down the stream on the opposite bank. The speed of the river water is ___ km/h.',
    options: [],
    correct_option: null,
    numeric_answer: 3,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Width of the river $d = 1\\text{ km}$.
Speed of swimmer perpendicular to the flow: $v_s = 4\\text{ km/h}$.
Time taken to cross the river:
$$t = \\frac{d}{v_s} = \\frac{1\\text{ km}}{4\\text{ km/h}} = 0.25\\text{ h}$$
Drift along the stream: $x = 750\\text{ m} = 0.75\\text{ km}$.
The drift is caused solely by the river flow velocity $v_r$:
$$x = v_r \\times t \\implies 0.75 = v_r \\times 0.25 \\implies v_r = \\frac{0.75}{0.25} = 3\\text{ km/h}$$

Answer: 3`
  },
  {
    qNum: 65,
    exam: 'JEE Main 2023 (31 Jan, Shift 1)',
    question: 'The initial speed of a projectile fired from ground is $u$. At the highest point during its motion, the speed of projectile is $\\frac{\\sqrt{3}}{2}u$. The time of flight of the projectile is:',
    options: [
      '$\\frac{u}{2g}$',
      '$\\frac{u}{g}$',
      '$\\frac{2u}{g}$',
      '$\\frac{\\sqrt{3}u}{g}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `At the highest point, the speed is purely horizontal:
$$v_x = u\\cos\\theta = \\frac{\\sqrt{3}}{2}u \\implies \\cos\\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = 30^\\circ$$
The total time of flight is:
$$T = \\frac{2u\\sin\\theta}{g} = \\frac{2u\\sin 30^\\circ}{g} = \\frac{2u(1/2)}{g} = \\frac{u}{g}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 66,
    exam: 'JEE Main 2023 (31 Jan, Shift 2)',
    question: 'Two bodies are projected from ground with same speeds $40\\text{ m/s}$ at two different angles with respect to horizontal. The bodies were found to have same range. If one of the body was projected at an angle of $60^\\circ$ with horizontal then sum of the maximum heights, attained by the two projectiles, is ___ m. (Given $g = 10\\text{ m/s}^2$)',
    options: [],
    correct_option: null,
    numeric_answer: 80,
    question_type: 'numerical',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `For the two projectiles to have the same horizontal range with the same speed $u = 40\\text{ m/s}$, their projection angles are complementary:
$$\\theta_1 = 60^\\circ, \\quad \\theta_2 = 90^\\circ - 60^\\circ = 30^\\circ$$
The maximum heights are:
$$H_1 = \\frac{u^2\\sin^2 60^\\circ}{2g}, \\quad H_2 = \\frac{u^2\\sin^2 30^\\circ}{2g}$$
Sum of the maximum heights:
$$H_1 + H_2 = \\frac{u^2}{2g}(\\sin^2 60^\\circ + \\sin^2 30^\\circ) = \\frac{u^2}{2g}(\\sin^2 60^\\circ + \\cos^2 60^\\circ) = \\frac{u^2}{2g}$$
Substituting $u = 40\\text{ m/s}$ and $g = 10\\text{ m/s}^2$:
$$H_1 + H_2 = \\frac{(40)^2}{2(10)} = \\frac{1600}{20} = 80\\text{ m}$$

Answer: 80`
  },
  {
    qNum: 67,
    exam: 'JEE Main 2023 (01 Feb, Shift 1)',
    question: 'A child stands on the edge of the cliff $10\\text{ m}$ above the ground and throws a stone horizontally with an initial speed of $5\\text{ m/s}$. Neglecting the air resistance, the speed with which the stone hits the ground will be ___ m/s. (given, $g = 10\\text{ m/s}^2$)',
    options: [
      '$5$',
      '$15$',
      '$20$',
      '$25$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Horizontal component of velocity (constant):
$$v_x = 5\\text{ m/s}$$
Vertical component of velocity just before hitting the ground:
$$v_y^2 = u_y^2 + 2gh = 0 + 2(10)(10) = 200\\text{ m}^2\\text{/s}^2$$
Net speed of the stone:
$$v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{5^2 + 200} = \\sqrt{25 + 200} = \\sqrt{225} = 15\\text{ m/s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 68,
    exam: 'JEE Main 2023 (01 Feb, Shift 2)',
    question: 'For a body projected at an angle with the horizontal from the ground, choose the correct statement:',
    options: [
      'Gravitational potential energy is maximum at the highest point.',
      'The horizontal component of velocity is zero at highest point.',
      'The vertical component of momentum is maximum at the highest point.',
      'The kinetic energy (K.E.) is zero at the highest point of projectile motion.'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `In a standard projectile motion:
1. Gravitational potential energy is $U = mgh$. Since height $h$ is maximum at the highest point, potential energy is maximum at the highest point.
2. The horizontal component of velocity $v_x = u\\cos\\theta$ remains non-zero throughout.
3. The vertical component of velocity $v_y$ is zero at the highest point, so vertical momentum is zero (minimum).
4. Kinetic energy at the highest point is $\\frac{1}{2}m(u\\cos\\theta)^2 > 0$ (not zero).
Therefore, statement (A) is correct.

Hence, the correct option is (A).`
  },
  {
    qNum: 69,
    exam: 'JEE Main 2023 (06 Apr, Shift 1)',
    question: 'Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\\nAssertion A: When a body is projected at an angle $45^\\circ$, its range is maximum.\\nReason R: For maximum range, the value of $\\sin 2\\theta$ should be equal to one.',
    options: [
      'A is false but R is true',
      'A is true but R is false',
      'Both A and R are correct and R is the correct explanation of A',
      'Both A and R are correct but R is NOT the correct explanation of A'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Horizontal range is given by:
$$R = \\frac{u^2 \\sin 2\\theta}{g}$$
For a given projection speed $u$, $R$ is maximum when $\\sin 2\\theta$ is maximum.
Maximum value of $\\sin 2\\theta = 1$:
$$2\\theta = 90^\\circ \\implies \\theta = 45^\\circ$$
Thus, both Assertion A and Reason R are true, and Reason R correctly explains Assertion A.

Hence, the correct option is (C).`
  },
  {
    qNum: 70,
    exam: 'JEE Main 2023 (08 Apr, Shift 1)',
    question: 'Two projectiles A and B are thrown with initial velocities of $40\\text{ m/s}$ and $60\\text{ m/s}$ at angles $30^\\circ$ and $60^\\circ$ with the horizontal respectively. The ratio of their ranges respectively is ($g = 10\\text{ m/s}^2$):',
    options: [
      '$4 : 9$',
      '$5 : 3$',
      '$3 : 2$',
      '$1 : 1$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: `Horizontal range is:
$$R = \\frac{u^2 \\sin 2\\theta}{g}$$
For projectile A:
$$R_A = \\frac{(40)^2 \\sin(2 \\times 30^\\circ)}{g} = \\frac{1600 \\sin 60^\\circ}{g} = \\frac{1600 \\times \\frac{\\sqrt{3}}{2}}{g}$$
For projectile B:
$$R_B = \\frac{(60)^2 \\sin(2 \\times 60^\\circ)}{g} = \\frac{3600 \\sin 120^\\circ}{g} = \\frac{3600 \\times \\frac{\\sqrt{3}}{2}}{g}$$
Ratio of their ranges:
$$\\frac{R_A}{R_B} = \\frac{1600}{3600} = \\frac{16}{36} = \\frac{4}{9} = 4 : 9$$

Hence, the correct option is (A).`
  }
];
