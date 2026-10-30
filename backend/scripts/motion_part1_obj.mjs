// 40 Objective Questions for Motion in a Straight Line (Physics)
// Source: Aakash Momentum Booster for NEET (Page 22, 23, 30, 33)

export const MOTION_PART1_OBJ = [
  // Page 22 (Q105 - Q117)
  {
    qNum: 105,
    topic: 'Position-Time Graphs',
    question_text: 'The figure shows position ($x$) versus time ($t$) graph of a particle moving along $x$-axis. During time interval $t = 0$ to $t = 4\\text{ s}$, how many times the particle comes to rest?',
    options: [
      '4',
      '2',
      '3',
      '5'
    ],
    correct_index: 0,
    solution: 'A particle comes to instantaneous rest when its velocity is zero ($v = \\frac{dx}{dt} = 0$), which corresponds to the points where the tangent to the $x-t$ curve is horizontal (crests and troughs).\n\nLooking at the graph in the interval $t = 0$ to $t = 4\\text{ s}$, there are two crests (local maxima) and two troughs (local minima):\n- 1st crest between $t = 0\\text{ s}$ and $t = 1\\text{ s}$\n- 1st trough at $t \\approx 1.8\\text{ s}$\n- 2nd crest at $t \\approx 2.8\\text{ s}$\n- 2nd trough at $t \\approx 3.8\\text{ s}$\n\nThus, the slope $\\frac{dx}{dt} = 0$ at 4 distinct points, meaning the particle comes to rest 4 times.'
  },
  {
    qNum: 106,
    topic: 'Uniformly Accelerated Motion',
    question_text: 'A particle moving with uniform acceleration along $x$-axis crosses the points $x = 10\\text{ m}$ and $x = 50\\text{ m}$ with velocity $10\\text{ m s}^{-1}$ and $30\\text{ m s}^{-1}$ respectively. The velocity with which it crosses point $x = 30\\text{ m}$ is',
    options: [
      '$20\\text{ m s}^{-1}$',
      '$10\\sqrt{5}\\text{ m s}^{-1}$',
      '$5\\sqrt{10}\\text{ m s}^{-1}$',
      '$10\\sqrt{2}\\text{ m s}^{-1}$'
    ],
    correct_index: 1,
    solution: 'The point $x = 30\\text{ m}$ is the exact midpoint between $x_1 = 10\\text{ m}$ and $x_2 = 50\\text{ m}$ since $30 - 10 = 20\\text{ m}$ and $50 - 30 = 20\\text{ m}$.\n\nFor a particle moving with uniform acceleration, the velocity $v_{\\text{mid}}$ at the midpoint between two points where velocities are $u$ and $v$ is given by:\n$$v_{\\text{mid}} = \\sqrt{\\frac{u^2 + v^2}{2}}$$\n\nSubstituting $u = 10\\text{ m s}^{-1}$ and $v = 30\\text{ m s}^{-1}$:\n$$v_{\\text{mid}} = \\sqrt{\\frac{10^2 + 30^2}{2}} = \\sqrt{\\frac{100 + 900}{2}} = \\sqrt{500} = 10\\sqrt{5}\\text{ m s}^{-1}$$.'
  },
  {
    qNum: 107,
    topic: 'Motion Under Gravity',
    question_text: 'Two balls $P$ and $Q$ are projected in vertically upward direction with velocities $40\\text{ m s}^{-1}$ and $80\\text{ m s}^{-1}$ respectively. The ratio of distances moved by them during first second of their downward journey will be',
    options: [
      '$1 : 2$',
      '$2 : 1$',
      '$1 : 1$',
      '$1 : 4$'
    ],
    correct_index: 2,
    solution: 'At the highest point of their upward trajectory, the velocity of each ball becomes momentarily zero ($u = 0$).\n\nBoth balls begin their downward journey from rest under the action of uniform acceleration due to gravity ($g$). The distance traveled in time $t$ starting from rest is given by:\n$$s = \\frac{1}{2}gt^2$$\n\nFor the first second ($t = 1\\text{ s}$):\n$$s_P = s_Q = \\frac{1}{2}g(1)^2 = \\frac{g}{2}$$\n\nSince this distance is completely independent of the initial projection speed, the ratio of distances moved during the first second of their downward journey is:\n$$s_P : s_Q = 1 : 1$$.'
  },
  {
    qNum: 108,
    topic: 'Galileo\'s Law of Odd Numbers',
    question_text: 'A small stone is released from rest from the top of a multi-storey building. During its free fall the ratio of the distances moved by it during 1st, 2nd and 3rd second of its journey will be',
    options: [
      '$1 : 2 : 3$',
      '$1 : 3 : 5$',
      '$1^2 : 2^2 : 3^2$',
      '$1 : 1 : 1$'
    ],
    correct_index: 1,
    solution: 'According to Galileo\'s law of odd numbers, for a body falling freely from rest under uniform acceleration, the distance covered in the $n^{\\text{th}}$ second is:\n$$s_n = u + \\frac{a}{2}(2n - 1) = 0 + \\frac{g}{2}(2n - 1) \\propto (2n - 1)$$\n\nFor $n = 1, 2, 3$:\n$$s_1 : s_2 : s_3 = (2(1) - 1) : (2(2) - 1) : (2(3) - 1) = 1 : 3 : 5$$.'
  },
  {
    qNum: 109,
    topic: 'Kinematics Definitions',
    question_text: 'When a particle is moving with constant acceleration, its speed',
    options: [
      'Must be increasing',
      'Must be decreasing',
      'May be increasing or decreasing',
      'Must be constant'
    ],
    correct_index: 2,
    solution: 'Acceleration is a vector quantity defined as $\\vec{a} = \\frac{d\\vec{v}}{dt}$.\n- If the acceleration has a component along the velocity vector ($\\vec{a} \\cdot \\vec{v} > 0$), the speed increases.\n- If the acceleration opposes the velocity vector ($\\vec{a} \\cdot \\vec{v} < 0$), the speed decreases (e.g. a body thrown vertically upwards under gravity).\n\nTherefore, when acceleration is constant, the speed may be increasing or decreasing.'
  },
  {
    qNum: 110,
    topic: 'Motion Under Gravity',
    question_text: 'A stone is released from a balloon going up with acceleration $2g$. Acceleration of the stone after the release is ($g$ is acceleration due to gravity)',
    options: [
      '$g$ downward',
      '$g$ upward',
      '$2g$ upward',
      'Any value between $g$ and $3g$'
    ],
    correct_index: 0,
    solution: 'As soon as the stone is released from the balloon, no contact or mechanical force acts on it. The only force acting on the stone is the gravitational pull of the Earth.\n\nTherefore, its acceleration is solely due to gravity, which is $g$ directed vertically downward.'
  },
  {
    qNum: 111,
    topic: 'Non-Uniform Motion & Differentiation',
    question_text: 'A particle is moving along a straight line according to the equation of motion $x = t^2 - 3t + 4$, where $x$ is in metre and $t$ is in second. What is the acceleration of the body when it comes to rest?',
    options: [
      'Zero',
      '$2\\text{ m/s}^2$',
      '$\\frac{3}{2}\\text{ m/s}^2$',
      '$1\\text{ m/s}^2$'
    ],
    correct_index: 1,
    solution: 'Given position: $x = t^2 - 3t + 4$.\n\nVelocity $v = \\frac{dx}{dt} = 2t - 3$.\nWhen the particle comes to rest, $v = 0$:\n$$2t - 3 = 0 \\implies t = 1.5\\text{ s}$$\n\nAcceleration $a = \\frac{dv}{dt} = \\frac{d}{dt}(2t - 3) = 2\\text{ m/s}^2$.\n\nSince acceleration is constant ($2\\text{ m/s}^2$) at all times, the acceleration when it comes to rest is $2\\text{ m/s}^2$.'
  },
  {
    qNum: 112,
    topic: 'Motion Under Gravity',
    question_text: 'Two objects $A$ and $B$ are projected vertically upward with velocities $20\\text{ m/s}$ and $30\\text{ m/s}$ respectively. The ratio of distance travelled by them during last second of their upward journey will be',
    options: [
      '$1 : 1$',
      '$2 : 3$',
      '$3 : 2$',
      '$4 : 9$'
    ],
    correct_index: 0,
    solution: 'By time-reversal symmetry of motion under gravity, the distance traveled in the last second of upward motion before coming momentarily to rest at the top equals the distance fallen from rest in the first second of downward motion:\n$$s = \\frac{1}{2}g(1)^2 = \\frac{1}{2}g = 5\\text{ m}$$\n\nBecause this distance depends only on $g$ and the duration ($1\\text{ s}$), it is identical for both objects regardless of their initial speeds of projection.\n\nTherefore, the ratio is $1 : 1$.'
  },
  {
    qNum: 113,
    topic: 'Kinematics Function Analysis',
    question_text: 'The $x$-coordinate of a particle moving along $x$-axis varies with speed $v$ as $x = a - bv^2$. The maximum possible speed of the particle is',
    options: [
      '$\\frac{2a}{b}$',
      '$\\sqrt{\\frac{a}{b}}$',
      '$\\sqrt{\\frac{b}{a}}$',
      '$\\frac{a}{b}$'
    ],
    correct_index: 1,
    solution: 'Given $x = a - bv^2$, rearranging for speed $v$:\n$$bv^2 = a - x \\implies v^2 = \\frac{a - x}{b} \\implies v = \\sqrt{\\frac{a - x}{b}}$$\n\nFor real physical motion along $x \\ge 0$, the speed $v$ is maximized when $x = 0$ (at the origin):\n$$v_{\\max} = \\sqrt{\\frac{a}{b}}$$.'
  },
  {
    qNum: 114,
    topic: 'Vertical Projection',
    question_text: 'A particle thrown vertically up reaches at half of the maximum height in $(\\sqrt{2} - 1)\\text{ second}$. The speed of projection of the particle is ($g = 10\\text{ m/s}^2$)',
    options: [
      '$10\\text{ m/s}$',
      '$10\\sqrt{2}\\text{ m/s}$',
      '$30\\sqrt{2}\\text{ m/s}$',
      '$40\\text{ m/s}$'
    ],
    correct_index: 1,
    solution: 'Let initial velocity be $u$. Maximum height $H = \\frac{u^2}{2g}$.\n\nAt half maximum height $h = \\frac{H}{2} = \\frac{u^2}{4g}$, the velocity $v$ satisfies:\n$$v^2 = u^2 - 2gh = u^2 - 2g\\left(\\frac{u^2}{4g}\\right) = \\frac{u^2}{2} \\implies v = \\frac{u}{\\sqrt{2}}$$\n\nUsing the first equation of motion $v = u - gt$:\n$$\\frac{u}{\\sqrt{2}} = u - gt \\implies gt = u\\left(1 - \\frac{1}{\\sqrt{2}}\\right) = u\\left(\\frac{\\sqrt{2} - 1}{\\sqrt{2}}\\right)$$\n\nGiven $t = \\sqrt{2} - 1\\text{ s}$ and $g = 10\\text{ m/s}^2$:\n$$10(\\sqrt{2} - 1) = u\\frac{\\sqrt{2} - 1}{\\sqrt{2}} \\implies u = 10\\sqrt{2}\\text{ m/s}$$.'
  },
  {
    qNum: 115,
    topic: 'Conservation of Energy & Kinematics',
    question_text: 'A particle thrown with speed $30\\text{ m/s}$ from a height $h$ reaches the ground with a speed of $50\\text{ m/s}$. If $g = 10\\text{ m/s}^2$, the value of $h$ is',
    options: [
      '$40\\text{ m}$',
      '$60\\text{ m}$',
      '$80\\text{ m}$',
      'Depends on the direction of projection'
    ],
    correct_index: 2,
    solution: 'By conservation of mechanical energy (or the 3rd equation of motion under gravity):\n$$v^2 = u^2 + 2gh$$\n\nSubstituting $v = 50\\text{ m/s}$, $u = 30\\text{ m/s}$, and $g = 10\\text{ m/s}^2$:\n$$50^2 = 30^2 + 2(10)h$$\n$$2500 = 900 + 20h \\implies 20h = 1600 \\implies h = 80\\text{ m}$$.\n\nNote that this result is completely independent of the direction in which the particle was projected.'
  },
  {
    qNum: 116,
    topic: 'Motion Under Gravity',
    question_text: 'A particle is thrown vertically up with a speed of $45\\text{ m/s}$. If $g = 10\\text{ m/s}^2$, the displacement of the particle during $5^{\\text{th}}$ second is',
    options: [
      '$10\\text{ m}$',
      '$5\\text{ m}$',
      '$2.5\\text{ m}$',
      'Zero'
    ],
    correct_index: 3,
    solution: 'The displacement in the $n^{\\text{th}}$ second is given by:\n$$s_n = u - \\frac{g}{2}(2n - 1)$$\n\nFor $n = 5$ with $u = 45\\text{ m/s}$ and $g = 10\\text{ m/s}^2$:\n$$s_5 = 45 - \\frac{10}{2}(2(5) - 1) = 45 - 5(9) = 45 - 45 = 0\\text{ m}$$.\n\nAlternatively, time to reach top is $t_{\\text{top}} = \\frac{45}{10} = 4.5\\text{ s}$. The $5^{\\text{th}}$ second spans from $t = 4\\text{ s}$ to $t = 5\\text{ s}$. At $t = 4\\text{ s}$, $s(4) = 45(4) - 5(16) = 100\\text{ m}$, and at $t = 5\\text{ s}$, $s(5) = 45(5) - 5(25) = 100\\text{ m}$. Thus, net displacement is $100 - 100 = 0\\text{ m}$.'
  },
  {
    qNum: 117,
    topic: 'Minima in Kinematics',
    question_text: 'The displacement of a body as function of time is given as $x = t^3 - 3t^2 + 6$, where $x$ is in m and $t$ is in s. The displacement of particle is minimum at $t$ then $t$ is equal to',
    options: [
      'Zero',
      '$2\\text{ s}$',
      '$6\\text{ s}$',
      '$8\\text{ s}$'
    ],
    correct_index: 1,
    solution: 'Given displacement function: $x = t^3 - 3t^2 + 6$.\n\nTo find extrema, differentiate with respect to $t$:\n$$\\frac{dx}{dt} = 3t^2 - 6t = 3t(t - 2) = 0$$\n$$\\implies t = 0\\text{ s} \\quad \\text{or} \\quad t = 2\\text{ s}$$\n\nSecond derivative test:\n$$\\frac{d^2x}{dt^2} = 6t - 6$$\n- At $t = 0\\text{ s}$: $\\frac{d^2x}{dt^2} = -6 < 0$ (Local Maximum).\n- At $t = 2\\text{ s}$: $\\frac{d^2x}{dt^2} = 6(2) - 6 = +6 > 0$ (Local Minimum).\n\nTherefore, displacement is minimum at $t = 2\\text{ s}$.'
  },

  // Page 23 (Q118 - Q128)
  {
    qNum: 118,
    topic: 'Average Speed in Vertical Motion',
    question_text: 'A ball is projected vertically upward with speed $20\\text{ m/s}$. The average speed of the ball, during its complete journey will be',
    options: [
      '$10\\text{ m/s}$',
      '$20\\text{ m/s}$',
      '$15\\text{ m/s}$',
      'Zero'
    ],
    correct_index: 0,
    solution: 'Maximum height reached: $H = \\frac{u^2}{2g} = \\frac{20^2}{2(10)} = 20\\text{ m}$.\nTotal distance traveled during the complete round trip: $d = 2H = 40\\text{ m}$.\nTime of flight: $T = \\frac{2u}{g} = \\frac{2(20)}{10} = 4\\text{ s}$.\n\nAverage speed is defined as:\n$$\\text{Average speed} = \\frac{\\text{Total distance}}{\\text{Total time}} = \\frac{40\\text{ m}}{4\\text{ s}} = 10\\text{ m/s}$$.'
  },
  {
    qNum: 119,
    topic: 'Relative Acceleration',
    question_text: 'The acceleration of a body as measured by two frames $s_1$ and $s_2$ have equal magnitude of $6\\text{ m/s}^2$. Select the correct statement.',
    options: [
      'Acceleration of $s_1$ relative to $s_2$ may be $6\\text{ m/s}^2$',
      'Acceleration of $s_1$ relative to $s_2$ may be $3\\text{ m/s}^2$',
      'Acceleration of $s_1$ relative to $s_2$ may be $9\\text{ m/s}^2$',
      'All of these'
    ],
    correct_index: 3,
    solution: 'Let $\\vec{a}_{b/1}$ and $\\vec{a}_{b/2}$ be the accelerations of the body relative to frames $s_1$ and $s_2$ respectively, with $|\\vec{a}_{b/1}| = |\\vec{a}_{b/2}| = 6\\text{ m/s}^2$.\n\nThe acceleration of frame $s_1$ relative to $s_2$ is:\n$$\\vec{a}_{1/2} = \\vec{a}_{b/2} - \\vec{a}_{b/1}$$\n\nThe magnitude of the resultant vector depends on the angle $\\theta$ between them:\n$$|a_1 - a_2| \\le a_{1/2} \\le a_1 + a_2 \\implies 0 \\le a_{1/2} \\le 12\\text{ m/s}^2$$\n\nSince $3\\text{ m/s}^2$, $6\\text{ m/s}^2$, and $9\\text{ m/s}^2$ all lie within the range $[0, 12]\\text{ m/s}^2$, all of these are possible values.'
  },
  {
    qNum: 120,
    topic: 'Graphical Analysis of Acceleration',
    question_text: 'A graph between square of speed with time $t$ for a particle moving on a straight line. The retardation of the particle at $t = 1\\text{ s}$ is',
    options: [
      '$1\\text{ m/s}^2$',
      '$1.5\\text{ m/s}^2$',
      '$2.0\\text{ m/s}^2$',
      '$2.5\\text{ m/s}^2$'
    ],
    correct_index: 0,
    solution: 'From the given $v^2$ vs $t$ linear plot, the intercept on vertical axis is $8$ and the intercept on $t$-axis is $2\\text{ s}$. The equation of the straight line is:\n$$v^2 = 8 - \\left(\\frac{8}{2}\\right)t = 8 - 4t$$\n\nDifferentiating both sides with respect to time $t$:\n$$\\frac{d(v^2)}{dt} = 2v\\frac{dv}{dt} = -4 \\implies v a = -2 \\implies a = -\\frac{2}{v}$$\n\nAt $t = 1\\text{ s}$:\n$$v^2 = 8 - 4(1) = 4 \\implies v = 2\\text{ m/s}$$\n\nTherefore, acceleration $a = -\\frac{2}{2} = -1\\text{ m/s}^2$.\nRetardation is the magnitude of deceleration, which is $1\\text{ m/s}^2$.'
  },
  {
    qNum: 121,
    topic: 'Mathematical Tools in Kinematics',
    question_text: 'If $z = \\alpha \\sin\\theta + \\beta \\cos\\theta$, where $\\alpha$ and $\\beta$ are positive constants. The maximum value of $z$ is',
    options: [
      '$\\alpha$',
      '$\\beta$',
      '$\\sqrt{\\alpha^2 + \\beta^2}$',
      '$(\\alpha + \\beta)$'
    ],
    correct_index: 2,
    solution: 'Any linear combination of the form $z = \\alpha \\sin\\theta + \\beta \\cos\\theta$ can be rewritten in harmonic form as:\n$$z = \\sqrt{\\alpha^2 + \\beta^2}\\left(\\frac{\\alpha}{\\sqrt{\\alpha^2 + \\beta^2}}\\sin\\theta + \\frac{\\beta}{\\sqrt{\\alpha^2 + \\beta^2}}\\cos\\theta\\right) = \\sqrt{\\alpha^2 + \\beta^2}\\cos(\\theta - \\phi)$$\nwhere $\\tan\\phi = \\frac{\\alpha}{\\beta}$.\n\nSince the maximum value of cosine is 1, the maximum value of $z$ is:\n$$z_{\\max} = \\sqrt{\\alpha^2 + \\beta^2}$$.'
  },
  {
    qNum: 122,
    topic: 'Relative Motion in Lift',
    question_text: 'An open lift is coming down from the top of a building at a constant speed $v = 10\\text{ m/s}$. A boy standing in the lift throws a stone vertically upwards at a speed of $30\\text{ m/s}$ w.r.t. lift. The time after which he will catch the stone is',
    options: [
      '$2.5\\text{ s}$',
      '$4\\text{ s}$',
      '$6\\text{ s}$',
      '$8\\text{ s}$'
    ],
    correct_index: 2,
    solution: 'Because the lift moves with constant velocity ($v = 10\\text{ m/s}$ downwards), its acceleration is zero ($a_{\\text{lift}} = 0$). Thus, the lift frame is an inertial frame of reference.\n\nRelative to the lift:\n- Relative initial speed: $u_{\\text{rel}} = 30\\text{ m/s}$ upward\n- Relative acceleration: $a_{\\text{rel}} = g = 10\\text{ m/s}^2$ downward\n\nThe time of flight for the stone to return to the boy\'s hand is:\n$$T = \\frac{2 u_{\\text{rel}}}{g} = \\frac{2 \\times 30}{10} = 6\\text{ s}$$.'
  },
  {
    qNum: 123,
    topic: 'Non-Inertial Frames & Free Fall',
    question_text: 'A stone is kept on the floor of an elevator. The elevator starts descending with an acceleration of $15\\text{ m/s}^2$. The displacement of stone with respect to elevator floor in first second is equal to',
    options: [
      '$7.5\\text{ m}$ upward',
      '$7.5\\text{ m}$ downward',
      '$2.5\\text{ m}$ upward',
      '$2.5\\text{ m}$ downward'
    ],
    correct_index: 2,
    solution: 'The downward acceleration of the elevator ($a = 15\\text{ m/s}^2$) exceeds the acceleration due to gravity ($g = 10\\text{ m/s}^2$).\nConsequently, the floor of the elevator falls faster than free fall, causing the stone to lose contact immediately and fall freely under gravity ($a_{\\text{stone}} = g = 10\\text{ m/s}^2$ downward).\n\nIn the first second ($t = 1\\text{ s}$):\n- Downward displacement of elevator floor: $s_e = \\frac{1}{2} a t^2 = \\frac{1}{2}(15)(1)^2 = 7.5\\text{ m}$ downward\n- Downward displacement of stone: $s_s = \\frac{1}{2} g t^2 = \\frac{1}{2}(10)(1)^2 = 5.0\\text{ m}$ downward\n\nDisplacement of stone relative to the floor:\n$$s_{\\text{rel}} = s_s - s_e = (-5.0\\text{ m}) - (-7.5\\text{ m}) = +2.5\\text{ m} = 2.5\\text{ m}\\text{ upward}$$.'
  },
  {
    qNum: 124,
    topic: 'Kinematic Vectors & Derivatives',
    question_text: 'Which of the following statements is incorrect?',
    options: [
      'The average velocity of a particle is zero in a time interval. It is possible that the instantaneous velocity is never zero in the interval',
      'It is possible to have a situation in which $\\left|\\frac{d\\vec{v}}{dt}\\right| \\ne 0$ but $\\frac{d|\\vec{v}|}{dt} = 0$',
      'It is possible to have a situation in which $\\frac{d|\\vec{v}|}{dt} \\ne 0$ but $\\left|\\frac{d\\vec{v}}{dt}\\right| = 0$',
      'The average speed of a particle in a given period is never less than the magnitude of average velocity'
    ],
    correct_index: 2,
    solution: '$\\left|\\frac{d\\vec{v}}{dt}\\right|$ represents the magnitude of the total acceleration vector $\\vec{a}$, while $\\frac{d|\\vec{v}|}{dt}$ represents the tangential acceleration $a_t$ (the rate of change of speed).\n\nSince the total acceleration magnitude is given by $|\\vec{a}| = \\sqrt{a_t^2 + a_n^2}$, if the total acceleration is zero ($\\left|\\frac{d\\vec{v}}{dt}\\right| = 0$), then both $a_t$ and $a_n$ must be zero, meaning $\\frac{d|\\vec{v}|}{dt}$ must be zero.\n\nIt is physically impossible for the rate of change of speed to be non-zero while total acceleration is zero. Hence, statement (3) is incorrect.'
  },
  {
    qNum: 125,
    topic: 'Uniform Retardation',
    question_text: 'A bullet is fired on a mud wall, it loses half of its speed after penetrating $3\\text{ cm}$ into the wall. How much further it will penetrate before coming to rest? Assume that mud wall offers uniform retardation.',
    options: [
      '$0.5\\text{ cm}$',
      '$1.5\\text{ cm}$',
      '$1.0\\text{ cm}$',
      '$2.0\\text{ cm}$'
    ],
    correct_index: 2,
    solution: 'Let initial speed be $u$. After penetrating $s_1 = 3\\text{ cm}$, its speed becomes $v = \\frac{u}{2}$.\nUsing $v^2 - u^2 = 2as_1$:\n$$\\left(\\frac{u}{2}\\right)^2 - u^2 = 2a(3) \\implies -\\frac{3}{4}u^2 = 6a \\implies a = -\\frac{u^2}{8}$$\n\nLet $s_2$ be the additional distance it penetrates before coming to rest ($v = 0$):\n$$0^2 - \\left(\\frac{u}{2}\\right)^2 = 2as_2 \\implies -\\frac{u^2}{4} = 2\\left(-\\frac{u^2}{8}\\right)s_2 = -\\frac{u^2}{4}s_2 \\implies s_2 = 1.0\\text{ cm}$$.'
  },
  {
    qNum: 126,
    topic: 'Distance vs Displacement',
    question_text: 'The position of a particle moving along straight line is given by $x = 2 + t - t^2$, the distance travelled by the particle in time interval $0$ to $2\\text{ second}$ is',
    options: [
      '$0.5\\text{ m}$',
      '$-1.0\\text{ m}$',
      '$1.0\\text{ m}$',
      '$2.5\\text{ m}$'
    ],
    correct_index: 3,
    solution: 'Given position: $x = 2 + t - t^2$.\nVelocity: $v = \\frac{dx}{dt} = 1 - 2t$.\n\nThe particle reverses its direction of motion when $v = 0$:\n$$1 - 2t = 0 \\implies t = 0.5\\text{ s}$$\n\nPosition at key moments:\n- At $t = 0$: $x(0) = 2\\text{ m}$\n- At $t = 0.5\\text{ s}$: $x(0.5) = 2 + 0.5 - (0.5)^2 = 2.25\\text{ m}$\n- At $t = 2\\text{ s}$: $x(2) = 2 + 2 - 2^2 = 0\\text{ m}$\n\nDistance traveled:\n$$d = |x(0.5) - x(0)| + |x(2) - x(0.5)| = |2.25 - 2| + |0 - 2.25| = 0.25 + 2.25 = 2.5\\text{ m}$$.'
  },
  {
    qNum: 127,
    topic: 'Vertical Projection & Kinematic Symmetry',
    question_text: 'A ball is thrown vertically upwards from the ground. It crosses a point at height of $25\\text{ m}$ twice at an interval of $4\\text{ second}$. The velocity with which ball is thrown up is',
    options: [
      '$25\\text{ m/s}$',
      '$30\\text{ m/s}$',
      '$20\\text{ m/s}$',
      '$40\\text{ m/s}$'
    ],
    correct_index: 1,
    solution: 'Let initial projection speed be $u$. The height as a function of time is:\n$$h = ut - \\frac{1}{2}gt^2 \\implies \\frac{1}{2}gt^2 - ut + h = 0$$\n\nFor $h = 25\\text{ m}$ and $g = 10\\text{ m/s}^2$:\n$$5t^2 - ut + 25 = 0 \\implies t^2 - \\frac{u}{5}t + 5 = 0$$\n\nThe roots $t_1, t_2$ are the times at which the ball passes $h = 25\\text{ m}$.\nSum of roots: $t_1 + t_2 = \\frac{u}{5}$. Product of roots: $t_1 t_2 = 5$.\n\nGiven the interval $\\Delta t = t_2 - t_1 = 4\\text{ s}$:\n$$(t_2 - t_1)^2 = (t_1 + t_2)^2 - 4t_1 t_2$$\n$$4^2 = \\left(\\frac{u}{5}\\right)^2 - 4(5) = \\frac{u^2}{25} - 20$$\n$$16 + 20 = \\frac{u^2}{25} \\implies 36 = \\frac{u^2}{25} \\implies u^2 = 900 \\implies u = 30\\text{ m/s}$$.'
  },
  {
    qNum: 128,
    topic: 'Acceleration-Time Graphs',
    question_text: 'A particle is moving along positive $x$-axis with some initial velocity. The acceleration, time graphs are shown. In which case, velocity of particle will increased for entire time between $t_1$ to $t_2$?',
    options: [
      'Only in II',
      'In I and III',
      'In I and II',
      'In I, II and III'
    ],
    correct_index: 3,
    solution: 'The rate of change of velocity is acceleration: $\\frac{dv}{dt} = a(t)$.\n\nWhenever acceleration $a(t) > 0$, the derivative of velocity is positive ($\\frac{dv}{dt} > 0$), meaning the velocity is strictly increasing over that time interval.\n\nIn all three graphs (I, II, and III), the acceleration curve lies completely above the time axis ($a(t) > 0$) throughout the entire interval from $t_1$ to $t_2$. Although the rate of increase of acceleration differs, velocity increases throughout the entire interval in all three cases (I, II, and III).'
  },

  // Page 30 (Q179 - Q188)
  {
    qNum: 179,
    topic: 'Graph Conversion (a-t to v-t)',
    question_text: 'Acceleration time ($a-t$) graph of a body moving on a straight line is given by the following diagram. Corresponding velocity time ($v-t$) graph is',
    options: [
      'Trapezoidal graph: rising linearly from 0 to $10\\text{ m/s}$ at $t = 5\\text{ s}$, constant at $10\\text{ m/s}$ until $10\\text{ s}$, then decreasing linearly to 0 at $15\\text{ s}$',
      'Graph rising to $10\\text{ m/s}$, remaining constant, then rising to $20\\text{ m/s}$',
      'Parabolic curved graph rising to $10\\text{ m/s}$ at $10\\text{ s}$',
      'Horizontal line constant at $10\\text{ m/s}$'
    ],
    correct_index: 0,
    solution: 'From the given $a-t$ graph:\n1. From $t = 0$ to $5\\text{ s}$: $a = +2\\text{ m/s}^2$ (constant positive acceleration). Velocity increases linearly with slope $+2$ from $0$ to $v(5) = 2 \\times 5 = 10\\text{ m/s}$.\n2. From $t = 5\\text{ s}$ to $10\\text{ s}$: $a = 0$. Velocity remains constant at $10\\text{ m/s}$ (horizontal segment).\n3. From $t = 10\\text{ s}$ to $15\\text{ s}$: $a = -2\\text{ m/s}^2$ (constant negative acceleration). Velocity decreases linearly with slope $-2$ from $10\\text{ m/s}$ to $v(15) = 10 - 2(5) = 0\\text{ m/s}$.\n\nThis exact piecewise linear trapezoidal profile corresponds to graph (1).'
  },
  {
    qNum: 180,
    topic: 'Relative Velocity',
    question_text: 'Two cars are moving in the same direction with the same velocity of $30\\text{ km/h}$. They are separated by a distance of $5\\text{ km}$. A truck moving in the opposite direction meets two cars at an interval of $4\\text{ minute}$. What is the velocity of the truck?',
    options: [
      '$30\\text{ km/h}$',
      '$45\\text{ km/h}$',
      '$60\\text{ km/h}$',
      '$65\\text{ km/h}$'
    ],
    correct_index: 1,
    solution: 'Let the velocity of each car be $v_c = 30\\text{ km/h}$ and the velocity of the truck moving in the opposite direction be $v_t$.\n\nThe relative velocity of the truck with respect to the cars is:\n$$v_{\\text{rel}} = v_t + v_c = v_t + 30$$\n\nThe separation between the two cars is $d = 5\\text{ km}$. The time interval between the truck meeting the two cars is:\n$$\\Delta t = 4\\text{ min} = \\frac{4}{60}\\text{ h} = \\frac{1}{15}\\text{ h}$$\n\nUsing relative motion:\n$$v_{\\text{rel}} = \\frac{d}{\\Delta t} = \\frac{5}{1/15} = 75\\text{ km/h}$$\n$$v_t + 30 = 75 \\implies v_t = 45\\text{ km/h}$$.'
  },
  {
    qNum: 181,
    topic: 'Equations of Motion',
    question_text: 'A particle moving with a uniform acceleration along a straight line covers distances $a$ and $b$ in time $p$ and $q$ second. The acceleration of the particle is',
    options: [
      '$\\frac{pq(p+q)}{2(bp - aq)}$',
      '$\\frac{2(aq - bp)}{pq(p - q)}$',
      '$\\frac{bp - aq}{pq(p - q)}$',
      '$\\frac{2(bp - aq)}{pq(p - q)}$'
    ],
    correct_index: 1,
    solution: 'Let initial velocity be $u$ and uniform acceleration be $A$.\nFrom kinematics equations:\n$$a = up + \\frac{1}{2}Ap^2 \\implies \\frac{a}{p} = u + \\frac{1}{2}Ap$$\n$$b = uq + \\frac{1}{2}Aq^2 \\implies \\frac{b}{q} = u + \\frac{1}{2}Aq$$\n\nSubtracting the second equation from the first:\n$$\\frac{a}{p} - \\frac{b}{q} = \\frac{1}{2}A(p - q)$$\n$$\\frac{aq - bp}{pq} = \\frac{1}{2}A(p - q)$$\n$$A = \\frac{2(aq - bp)}{pq(p - q)}$$.'
  },
  {
    qNum: 182,
    topic: 'Uniform Acceleration Formulas',
    question_text: 'A body starts from rest and moves with a constant acceleration. The ratio of distance covered in the $n^{\\text{th}}$ second to the distance covered in $n$ second is',
    options: [
      '$\\frac{2}{n} - \\frac{1}{n^2}$',
      '$\\frac{1}{n^2} - \\frac{1}{n}$',
      '$\\frac{2}{n^2} - \\frac{1}{n}$',
      '$\\frac{n}{2} - \\frac{1}{n^2}$'
    ],
    correct_index: 0,
    solution: 'With initial velocity $u = 0$:\n1. Distance covered in $n^{\\text{th}}$ second:\n$$s_n = \\frac{a}{2}(2n - 1)$$\n2. Distance covered in $n$ seconds:\n$$S_n = \\frac{1}{2}an^2$$\n\nTaking their ratio:\n$$\\frac{s_n}{S_n} = \\frac{\\frac{a}{2}(2n - 1)}{\\frac{1}{2}an^2} = \\frac{2n - 1}{n^2} = \\frac{2}{n} - \\frac{1}{n^2}$$.'
  },
  {
    qNum: 183,
    topic: 'Symmetry of Uniformly Accelerated Motion',
    question_text: 'A particle returns to the starting point after $10\\text{ s}$, if the rate of change of velocity during the motion is constant, then its location after $7\\text{ s}$ will be same as that after',
    options: [
      '$1\\text{ s}$',
      '$2\\text{ s}$',
      '$3\\text{ s}$',
      '$4\\text{ s}$'
    ],
    correct_index: 2,
    solution: 'For motion under constant acceleration returning to the start after total time $T = 10\\text{ s}$, the displacement equation is:\n$$s(t) = ut - \\frac{1}{2}at^2$$\n\nSince $s(T) = 0$, the parabola is symmetric about the apex time $t_{\\text{mid}} = \\frac{T}{2} = 5\\text{ s}$.\nBy symmetry:\n$$s(t) = s(T - t)$$\n\nFor $t = 7\\text{ s}$:\n$$s(7) = s(10 - 7) = s(3\\text{ s})$$\n\nThus, its position after $7\\text{ s}$ is identical to that after $3\\text{ s}$.'
  },
  {
    qNum: 184,
    topic: 'Motion Under Gravity',
    question_text: 'A body is thrown vertically upward with an unknown speed. Distance travelled by the body in last $3\\text{ second}$ of upward motion is ($g = 10\\text{ m/s}^2$)',
    options: [
      '$45\\text{ m}$',
      '$20\\text{ m}$',
      '$5\\text{ m}$',
      '$25\\text{ m}$'
    ],
    correct_index: 0,
    solution: 'By time-reversal symmetry of uniformly accelerated motion under gravity, the distance traveled in the last 3 seconds of upward motion before momentarily coming to rest at the apex equals the distance fallen from rest in the first 3 seconds of downward motion:\n$$s = \\frac{1}{2}gt^2 = \\frac{1}{2}(10)(3)^2 = 5 \\times 9 = 45\\text{ m}$$.'
  },
  {
    qNum: 185,
    topic: 'Average Acceleration',
    question_text: 'If a particle is accelerated for a time $t_1$ with acceleration $a_1$ and for time $t_2$ with acceleration $a_2$ then average acceleration is',
    options: [
      '$\\frac{a_1 + a_2}{2}$',
      '$\\frac{a_1 t_1 + a_2 t_2}{t_2 - t_1}$',
      '$\\frac{a_1 t_1 + a_2 t_2}{t_1 + t_2}$',
      '$\\frac{(a_1 + a_2)(t_1 + t_2)}{t_2 - t_1}$'
    ],
    correct_index: 2,
    solution: 'Average acceleration is defined as total change in velocity divided by total time:\n$$a_{\\text{avg}} = \\frac{\\Delta v}{\\Delta t}$$\n\nChange in velocity during first interval: $\\Delta v_1 = a_1 t_1$.\nChange in velocity during second interval: $\\Delta v_2 = a_2 t_2$.\nTotal change in velocity: $\\Delta v = a_1 t_1 + a_2 t_2$.\nTotal time: $\\Delta t = t_1 + t_2$.\n\n$$a_{\\text{avg}} = \\frac{a_1 t_1 + a_2 t_2}{t_1 + t_2}$$.'
  },
  {
    qNum: 186,
    topic: 'Motion Under Gravity',
    question_text: 'A body is thrown vertically upward with $62\\text{ m/s}$. Distance travelled by the body in $7^{\\text{th}}$ second is ($g = 10\\text{ m/s}^2$)',
    options: [
      '$3.2\\text{ m}$',
      '$3.4\\text{ m}$',
      '$3\\text{ m}$',
      '$3.6\\text{ m}$'
    ],
    correct_index: 1,
    solution: 'Time to reach maximum height:\n$$t_{\\text{top}} = \\frac{u}{g} = \\frac{62}{10} = 6.2\\text{ s}$$\n\nThe $7^{\\text{th}}$ second corresponds to the interval from $t = 6\\text{ s}$ to $t = 7\\text{ s}$. Since the body reaches the apex at $t = 6.2\\text{ s}$, the motion changes direction inside this interval:\n1. Upward motion from $t = 6.0\\text{ s}$ to $t = 6.2\\text{ s}$ (duration $\\Delta t_1 = 0.2\\text{ s}$):\n$$d_1 = \\frac{1}{2}g(\\Delta t_1)^2 = \\frac{1}{2}(10)(0.2)^2 = 0.2\\text{ m}$$\n2. Downward motion from $t = 6.2\\text{ s}$ to $t = 7.0\\text{ s}$ (duration $\\Delta t_2 = 0.8\\text{ s}$):\n$$d_2 = \\frac{1}{2}g(\\Delta t_2)^2 = \\frac{1}{2}(10)(0.8)^2 = 3.2\\text{ m}$$\n\nTotal distance covered in the $7^{\\text{th}}$ second:\n$$d_{\\text{total}} = d_1 + d_2 = 0.2 + 3.2 = 3.4\\text{ m}$$.'
  },
  {
    qNum: 187,
    topic: 'Relative Motion Under Free Fall',
    question_text: 'Two bodies are held separated by $9.8\\text{ m}$ vertically one above the other. They are released simultaneously to fall freely under gravity from large height. After $2\\text{ s}$ the relative distance between them is',
    options: [
      '$4.9\\text{ m}$',
      '$19.6\\text{ m}$',
      '$9.8\\text{ m}$',
      '$27.2\\text{ m}$'
    ],
    correct_index: 2,
    solution: 'Both bodies are released simultaneously from rest, so their initial relative velocity is $u_{\\text{rel}} = 0$.\nBoth bodies experience identical acceleration due to gravity ($g$ downward), so relative acceleration is:\n$$a_{\\text{rel}} = g - g = 0$$\n\nBecause relative acceleration and initial relative velocity are both zero, the relative distance between them remains constant at all times during free fall:\n$$s_{\\text{rel}}(t) = s_{\\text{rel}}(0) = 9.8\\text{ m}$$.'
  },
  {
    qNum: 188,
    topic: 'Vertical Projection',
    question_text: 'A body is fired upwards. At half the maximum height, the velocity of the body is $10\\text{ m/s}$. The maximum height attained by body is ($g = 10\\text{ m/s}^2$)',
    options: [
      '$100\\text{ m}$',
      '$10\\text{ m}$',
      '$15\\text{ m}$',
      '$20\\text{ m}$'
    ],
    correct_index: 1,
    solution: 'Let the maximum height attained by the body be $H$.\nUsing the third equation of motion between the projection point and the apex:\n$$0^2 - u^2 = -2gH \\implies u^2 = 2gH$$\n\nAt half maximum height ($h = \\frac{H}{2}$), the velocity is $v = 10\\text{ m/s}$:\n$$v^2 = u^2 - 2g\\left(\\frac{H}{2}\\right) = 2gH - gH = gH$$\n$$10^2 = gH \\implies 100 = 10 H \\implies H = 10\\text{ m}$$.'
  },

  // Page 33 (Q206 - Q211)
  {
    qNum: 206,
    topic: 'Constant Acceleration Kinematics',
    question_text: 'A bullet comes out of the barrel of gun of length $2\\text{ m}$ with a speed of $600\\text{ m/s}$. The average acceleration of the bullet is',
    options: [
      '$90\\text{ km/s}^2$',
      '$180\\text{ km/s}^2$',
      '$60\\text{ km/s}^2$',
      '$30\\text{ km/s}^2$'
    ],
    correct_index: 0,
    solution: 'The bullet accelerates from rest ($u = 0$) along the barrel of length $s = 2\\text{ m}$ to reach $v = 600\\text{ m/s}$.\nUsing the kinematic relation $v^2 = u^2 + 2as$:\n$$600^2 = 0 + 2a(2) = 4a$$\n$$360000 = 4a \\implies a = 90000\\text{ m/s}^2 = 90\\text{ km/s}^2$$.'
  },
  {
    qNum: 207,
    topic: 'Variable Acceleration & Trigonometric Motion',
    question_text: 'A particle is moving along a straight line such that its position varies with time $t$ as $x = 6\\alpha\\left[t + \\alpha\\sin\\left(\\frac{t}{\\alpha}\\right)\\right]$ (where $x$ is its position in metre, $t$ is time in s, and $\\alpha$ is a positive constant). The particle comes to rest at',
    options: [
      '$t = \\frac{\\pi}{2}\\alpha$',
      '$t = \\frac{\\pi}{4}\\alpha$',
      '$t = \\pi\\alpha$',
      '$t = 0$'
    ],
    correct_index: 2,
    solution: 'Position function: $x(t) = 6\\alpha\\left[t + \\alpha\\sin\\left(\\frac{t}{\\alpha}\\right)\\right]$.\n\nDifferentiating with respect to $t$ to find velocity:\n$$v = \\frac{dx}{dt} = 6\\alpha\\left[1 + \\alpha\\left(\\frac{1}{\\alpha}\\cos\\left(\\frac{t}{\\alpha}\\right)\\right)\\right] = 6\\alpha\\left[1 + \\cos\\left(\\frac{t}{\\alpha}\\right)\\right]$$\n\nThe particle comes to rest when $v = 0$:\n$$6\\alpha\\left[1 + \\cos\\left(\\frac{t}{\\alpha}\\right)\\right] = 0 \\implies \\cos\\left(\\frac{t}{\\alpha}\\right) = -1$$\n\nThe smallest positive time solution is:\n$$\\frac{t}{\\alpha} = \\pi \\implies t = \\pi\\alpha$$.'
  },
  {
    qNum: 208,
    topic: 'Acceleration as Function of Position',
    question_text: 'A particle is moving along $x$-axis so that its velocity is given as $v = (x^2 + x + 4)\\text{ m/s}$, where $x$ is in m. The acceleration of the particle at $x = 1.5\\text{ m}$ is',
    options: [
      '$21\\text{ m/s}^2$',
      '$26\\text{ m/s}^2$',
      '$28\\text{ m/s}^2$',
      '$31\\text{ m/s}^2$'
    ],
    correct_index: 3,
    solution: 'Acceleration in terms of position is given by $a = v\\frac{dv}{dx}$.\n\nGiven $v = x^2 + x + 4$:\n$$\\frac{dv}{dx} = 2x + 1$$\n\nAt $x = 1.5\\text{ m}$:\n$$v = (1.5)^2 + 1.5 + 4 = 2.25 + 1.5 + 4 = 7.75\\text{ m/s}$$\n$$\\frac{dv}{dx} = 2(1.5) + 1 = 3 + 1 = 4\\text{ s}^{-1}$$\n\nTherefore:\n$$a = v\\frac{dv}{dx} = 7.75 \\times 4 = 31\\text{ m/s}^2$$.'
  },
  {
    qNum: 209,
    topic: 'Velocity-Time to Position-Time Graphs',
    question_text: 'A particle is moving along $x$-axis such that its velocity varies with time $t$ as $v = 20\\left(1 - \\frac{t}{2}\\right)$. At $t = 0$ particle is at origin. Select correct position ($x$) - time ($t$) plot for the particle.',
    options: [
      'Piecewise linear plot crossing zero at $t = 2\\text{ s}$',
      'V-shaped bounce plot with vertex at $t = 2\\text{ s}$',
      'Upward-opening parabola with minimum at $t = 2\\text{ s}$',
      'Downward-opening parabola starting at origin, reaching maximum at $t = 2\\text{ s}$, and returning to zero at $t = 4\\text{ s}$'
    ],
    correct_index: 3,
    solution: 'Given velocity: $v(t) = 20 - 10t$.\nSince particle is at origin at $t = 0$ ($x(0) = 0$):\n$$x(t) = \\int_0^t (20 - 10t)dt = 20t - 5t^2$$\n\nKey characteristics of $x(t) = 20t - 5t^2$:\n1. It is a quadratic equation representing a downward-opening parabola (coefficient of $t^2$ is negative, $-5$).\n2. At $t = 0$, $x = 0$.\n3. Maximum position occurs when $v = 0 \\implies t = 2\\text{ s}$, with $x(2) = 20(2) - 5(4) = 20\\text{ m}$.\n4. Position returns to zero when $20t - 5t^2 = 0 \\implies t = 4\\text{ s}$.\n\nThis matches plot (4).'
  },
  {
    qNum: 210,
    topic: 'Velocity Bounds in Oscillatory Motion',
    question_text: 'The position of a particle moving along $x$-axis varies with time as $x = t - \\sin t$, where $x$ is in metre and $t$ is in second. Which of the following value of velocity of the particle is not possible?',
    options: [
      '$1.6\\text{ m/s}$',
      '$0.86\\text{ m/s}$',
      '$1.0\\text{ m/s}$',
      '$2.4\\text{ m/s}$'
    ],
    correct_index: 3,
    solution: 'Given position: $x = t - \\sin t$.\nVelocity is:\n$$v = \\frac{dx}{dt} = 1 - \\cos t$$\n\nSince the cosine function is strictly bounded by $-1 \\le \\cos t \\le 1$:\n$$1 - 1 \\le v \\le 1 - (-1) \\implies 0 \\le v \\le 2\\text{ m/s}$$\n\nThe velocity of the particle can only take values in the interval $[0, 2]\\text{ m/s}$.\nSince $2.4\\text{ m/s} > 2\\text{ m/s}$, a velocity of $2.4\\text{ m/s}$ is not possible.'
  },
  {
    qNum: 211,
    topic: 'Distance Covered Across Apex',
    question_text: 'A body is projected with speed $55\\text{ m/s}$ vertically upward. The distance travelled by the body in time interval $t_1 = 4\\text{ s}$ to $t_2 = 8\\text{ s}$ is ($g = 10\\text{ m/s}^2$)',
    options: [
      '$20\\text{ m}$',
      '$31.25\\text{ m}$',
      '$11.25\\text{ m}$',
      '$42.50\\text{ m}$'
    ],
    correct_index: 3,
    solution: 'Time to reach maximum height:\n$$t_{\\text{top}} = \\frac{u}{g} = \\frac{55}{10} = 5.5\\text{ s}$$\n\nSince $5.5\\text{ s}$ lies between $t_1 = 4\\text{ s}$ and $t_2 = 8\\text{ s}$, the body travels upward until $t = 5.5\\text{ s}$ and then downwards:\n1. Upward motion from $t = 4\\text{ s}$ to $t = 5.5\\text{ s}$ (duration $\\Delta t_1 = 1.5\\text{ s}$):\n$$d_1 = \\frac{1}{2}g(\\Delta t_1)^2 = \\frac{1}{2}(10)(1.5)^2 = 5(2.25) = 11.25\\text{ m}$$\n2. Downward motion from $t = 5.5\\text{ s}$ to $t = 8\\text{ s}$ (duration $\\Delta t_2 = 2.5\\text{ s}$):\n$$d_2 = \\frac{1}{2}g(\\Delta t_2)^2 = \\frac{1}{2}(10)(2.5)^2 = 5(6.25) = 31.25\\text{ m}$$\n\nTotal distance travelled:\n$$d_{\\text{total}} = d_1 + d_2 = 11.25 + 31.25 = 42.50\\text{ m}$$.'
  }
];

