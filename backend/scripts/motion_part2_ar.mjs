// 17 Assertion-Reason Questions for Motion in a Straight Line (Physics)
// Source: Aakash Momentum Booster for NEET (Section B, Page 33 & 34)

const AR_OPTIONS = [
  'Both Assertion & Reason are true and the reason is the correct explanation of the assertion',
  'Both Assertion & Reason are true but the reason is not the correct explanation of the assertion',
  'Assertion is true statement but Reason is false',
  'Both Assertion and Reason are false statements'
];

export const MOTION_PART2_AR = [
  // Page 33 (AR 1 - AR 5)
  {
    qNum: 1,
    topic: 'Kinematics Fundamentals',
    question_type: 'assertion_reason',
    assertion_text: 'A body can have acceleration even if its velocity is zero.',
    reason_text: 'A body may have non-zero acceleration while having a constant velocity.',
    question_text: 'Assertion (A): A body can have acceleration even if its velocity is zero.\nReason (R): A body may have non-zero acceleration while having a constant velocity.',
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    solution: 'Assertion is TRUE: At the highest point of a vertically projected body under gravity, the instantaneous velocity is momentarily zero, but the acceleration is non-zero ($a = g = 9.8\\text{ m/s}^2$ downward).\n\nReason is FALSE: Acceleration is defined as the rate of change of velocity ($\\vec{a} = \\frac{d\\vec{v}}{dt}$). If velocity is constant, $\\frac{d\\vec{v}}{dt} = 0$, so acceleration must be zero. A body cannot have non-zero acceleration while having constant velocity.\n\nHence, Assertion is true but Reason is false.'
  },
  {
    qNum: 2,
    topic: 'Average Speed vs Velocity',
    question_type: 'assertion_reason',
    assertion_text: 'Average speed cannot be negative.',
    reason_text: 'The average speed is the ratio of total distance covered and the time taken.',
    question_text: 'Assertion (A): Average speed cannot be negative.\nReason (R): The average speed is the ratio of total distance covered and the time taken.',
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    solution: 'Assertion is TRUE: Speed and average speed are scalar quantities that can only be zero or positive; they can never be negative.\n\nReason is TRUE: Average speed is defined as the total distance covered divided by the total time taken. Since total distance covered is the actual path length (which is strictly non-negative) and time interval is positive, their ratio is always non-negative.\n\nFurthermore, Reason correctly explains why average speed cannot be negative.'
  },
  {
    qNum: 3,
    topic: 'Motion Under Gravity',
    question_type: 'assertion_reason',
    assertion_text: 'If a body is projected vertically upward then the rate of change of its velocity is constant during its flight.',
    reason_text: 'The average acceleration of the body during its total journey is zero.',
    question_text: 'Assertion (A): If a body is projected vertically upward then the rate of change of its velocity is constant during its flight.\nReason (R): The average acceleration of the body during its total journey is zero.',
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    solution: 'Assertion is TRUE: The rate of change of velocity is acceleration. Throughout the flight of a vertically projected body, the only force acting is gravity, so $\\frac{d\\vec{v}}{dt} = \\vec{g} = 9.8\\text{ m/s}^2\\text{ downward} = \\text{constant}$.\n\nReason is FALSE: Since acceleration is constant ($g$ downward) throughout the flight, the average acceleration is also $g$ downward, NOT zero.\n\nHence, Assertion is true but Reason is false.'
  },
  {
    qNum: 4,
    topic: 'Relative Velocity',
    question_type: 'assertion_reason',
    assertion_text: 'If the relative velocity of A with respect to B is zero then both A and B must be at rest.',
    reason_text: 'Two bodies having different speeds may have zero relative velocity.',
    question_text: 'Assertion (A): If the relative velocity of A with respect to B is zero then both A and B must be at rest.\nReason (R): Two bodies having different speeds may have zero relative velocity.',
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    solution: 'Assertion is FALSE: Relative velocity is $\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B$. If $\\vec{v}_{AB} = 0$, it only implies $\\vec{v}_A = \\vec{v}_B$. Both bodies can be moving with the same velocity in the same direction without being at rest.\n\nReason is FALSE: If two bodies have different speeds ($|\\vec{v}_A| \\ne |\\vec{v}_B|$), their velocity vectors cannot be identical, so $\\vec{v}_A - \\vec{v}_B \\ne 0$. They can never have zero relative velocity.\n\nHence, both Assertion and Reason are false statements.'
  },
  {
    qNum: 5,
    topic: 'Kinematics Definitions',
    question_type: 'assertion_reason',
    assertion_text: 'A body may have non-zero acceleration, even if its velocity is zero.',
    reason_text: 'Acceleration is the rate of change of velocity.',
    question_text: 'Assertion (A): A body may have non-zero acceleration, even if its velocity is zero.\nReason (R): Acceleration is the rate of change of velocity.',
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    solution: 'Assertion is TRUE: For example, when a ball is thrown vertically upwards, at the highest point of its trajectory $v = 0$, but its acceleration is $g = 9.8\\text{ m/s}^2$ downward.\n\nReason is TRUE: Acceleration is defined as $\\vec{a} = \\frac{d\\vec{v}}{dt}$. Acceleration depends on how rapidly velocity is changing with time, not on the value of velocity at that particular instant. Thus, even when velocity instantaneously passes through zero, its time derivative can be non-zero.\n\nReason correctly explains the Assertion.'
  },

  // Page 34 (AR 6 - AR 17)
  {
    qNum: 6,
    topic: 'Rectilinear Motion & Retardation',
    question_type: 'assertion_reason',
    assertion_text: 'A body is moving along positive x-axis with an acceleration which is directed along positive x-axis but whose magnitude is decreasing with time then speed of particle must decrease.',
    reason_text: 'When magnitude of acceleration decreases it behaves like retardation.',
    question_text: 'Assertion (A): A body is moving along positive x-axis with an acceleration which is directed along positive x-axis but whose magnitude is decreasing with time then speed of particle must decrease.\nReason (R): When magnitude of acceleration decreases it behaves like retardation.',
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    solution: 'Assertion is FALSE: Both velocity and acceleration are directed along the positive $x$-axis ($\\vec{a} \\cdot \\vec{v} > 0$). Therefore, the speed of the particle continues to increase, even though the rate of increase of speed is decreasing.\n\nReason is FALSE: Retardation occurs when acceleration opposes the velocity vector ($\\vec{a} \\cdot \\vec{v} < 0$). A decrease in the magnitude of positive acceleration does not mean it acts as retardation; it simply means the velocity is increasing at a slower rate.\n\nHence, both Assertion and Reason are false statements.'
  },
  {
    qNum: 7,
    topic: 'Distance vs Displacement',
    question_type: 'assertion_reason',
    assertion_text: 'A moving body may have zero distance covered during a time interval.',
    reason_text: 'If body returns to original position then distance covered by the body becomes zero.',
    question_text: 'Assertion (A): A moving body may have zero distance covered during a time interval.\nReason (R): If body returns to original position then distance covered by the body becomes zero.',
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    solution: 'Assertion is FALSE: For any moving body, distance is the actual total path length traversed, which is strictly positive ($d > 0$). It can never be zero for a moving body.\n\nReason is FALSE: When a body returns to its original position, its net displacement is zero, but the total distance covered is the sum of the forward and return paths, which is non-zero.\n\nHence, both Assertion and Reason are false statements.'
  },
  {
    qNum: 8,
    topic: 'Average Speed vs Average Velocity',
    question_type: 'assertion_reason',
    assertion_text: 'Average speed is greater than or equal to magnitude of average velocity.',
    reason_text: 'Distance is greater than or equal to magnitude of displacement.',
    question_text: 'Assertion (A): Average speed is greater than or equal to magnitude of average velocity.\nReason (R): Distance is greater than or equal to magnitude of displacement.',
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    solution: 'Assertion is TRUE: Average speed is always greater than or equal to the magnitude of average velocity: $v_{\\text{avg}} \\ge |\\vec{v}_{\\text{avg}}|$.\n\nReason is TRUE: The actual distance (path length) is always greater than or equal to the straight-line distance between initial and final points (magnitude of displacement): $\\text{Distance} \\ge |\\Delta\\vec{r}|$. Dividing both sides by the elapsed time $\\Delta t$ gives:\n$$\\frac{\\text{Distance}}{\\Delta t} \\ge \\frac{|\\Delta\\vec{r}|}{\\Delta t} \\implies \\text{Average speed} \\ge |\\text{Average velocity}|$$\n\nThus, Reason correctly explains the Assertion.'
  },
  {
    qNum: 9,
    topic: 'Conditions for Straight Line Motion',
    question_type: 'assertion_reason',
    assertion_text: 'If $\\vec{u} = 0$ and $\\vec{a}$ is not constant path of particle cannot be straight line.',
    reason_text: 'For straight line motion if $\\vec{u} = 0$, $\\vec{a}$ must be constant.',
    question_text: 'Assertion (A): If $\\vec{u} = 0$ and $\\vec{a}$ is not constant path of particle cannot be straight line.\nReason (R): For straight line motion if $\\vec{u} = 0$, $\\vec{a}$ must be constant.',
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    solution: 'Assertion is FALSE: If initial velocity $\\vec{u} = 0$ and the acceleration vector $\\vec{a}(t)$ always maintains the same direction (or lies along the same straight line), the particle will move purely along that straight line, even if the magnitude of $\\vec{a}$ varies with time (e.g. $a = ct$).\n\nReason is FALSE: For straight line motion starting from rest, acceleration only needs to maintain a fixed direction; its magnitude does not have to be constant.\n\nHence, both Assertion and Reason are false statements.'
  },
  {
    qNum: 10,
    topic: 'Vertical Projection Kinematics',
    question_type: 'assertion_reason',
    assertion_text: 'In case of vertical projection, distance travelled by the body in last second of its motion is depends on initial velocity of projection.',
    reason_text: 'In case of vertical projection acceleration is -ve for first half motion while +ve in second half of motion.',
    question_text: 'Assertion (A): In case of vertical projection, distance travelled by the body in last second of its motion is depends on initial velocity of projection.\nReason (R): In case of vertical projection acceleration is -ve for first half motion while +ve in second half of motion.',
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    solution: 'Assertion is FALSE: By symmetry of motion under gravity, the distance traveled in the last second of upward motion equals the distance fallen in the first second of downward motion: $s = \\frac{1}{2}g(1)^2 = 4.9\\text{ m}$ (or $5\\text{ m}$), which is completely independent of the initial projection velocity $u$.\n\nReason is FALSE: Throughout the entire vertical projection (both upward journey and downward journey), the acceleration is solely due to gravity, which is directed vertically downwards ($-g$) at all times.\n\nHence, both Assertion and Reason are false statements.'
  },
  {
    qNum: 11,
    topic: '2D Rectilinear Motion',
    question_type: 'assertion_reason',
    assertion_text: 'A particle moves with velocity given by $\\vec{v} = (3\\hat{i} + 4\\hat{j})\\text{ m/s}$. Path of the particle will be straight line.',
    reason_text: 'In case of straight line motion particle must move along x-axis or y-axis or z-axis.',
    question_text: 'Assertion (A): A particle moves with velocity given by $\\vec{v} = (3\\hat{i} + 4\\hat{j})\\text{ m/s}$. Path of the particle will be straight line.\nReason (R): In case of straight line motion particle must move along x-axis or y-axis or z-axis.',
    options: AR_OPTIONS,
    correct_index: 2, // (3) A is true, R is false
    solution: 'Assertion is TRUE: The velocity vector $\\vec{v} = 3\\hat{i} + 4\\hat{j}$ is constant in both magnitude ($|\\vec{v}| = 5\\text{ m/s}$) and direction (angle $\\theta = \\tan^{-1}(4/3)$). Motion with constant velocity is always along a straight line.\n\nReason is FALSE: Straight-line motion can occur in any arbitrary direction in space, not just along the coordinate axes ($x$, $y$, or $z$).\n\nHence, Assertion is true but Reason is false.'
  },
  {
    qNum: 12,
    topic: 'Angle Between Velocity and Acceleration',
    question_type: 'assertion_reason',
    assertion_text: 'In case of straight line motion angle $\\theta$ between $\\vec{v}$ and $\\vec{a}$ cannot be $0 < \\theta < 180^\\circ$.',
    reason_text: 'For the particle to move in straight line component of velocity perpendicular to acceleration should be zero.',
    question_text: 'Assertion (A): In case of straight line motion angle $\\theta$ between $\\vec{v}$ and $\\vec{a}$ cannot be $0 < \\theta < 180^\\circ$.\nReason (R): For the particle to move in straight line component of velocity perpendicular to acceleration should be zero.',
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    solution: 'Assertion is TRUE: In straight line motion, the acceleration vector must be collinear with the velocity vector. Therefore, the angle $\\theta$ between $\\vec{v}$ and $\\vec{a}$ can only be either $0^\\circ$ (speeding up) or $180^\\circ$ (slowing down). It cannot take any value in the open interval $0 < \\theta < 180^\\circ$.\n\nReason is TRUE: If there were a non-zero component of velocity perpendicular to acceleration, or acceleration perpendicular to velocity, the direction of the velocity vector would rotate, causing the path to curve into a plane (2D curved motion). For the path to remain strictly straight, any component perpendicular to the line of motion must be zero.\n\nReason is the correct explanation of Assertion.'
  },
  {
    qNum: 13,
    topic: 'Definition of Rest and Circular Motion',
    question_type: 'assertion_reason',
    assertion_text: 'If distance of a particle from a fixed point in a given frame remains constant then particle will be at rest in the given frame.',
    reason_text: 'For a particle to be at rest in the given frame $\\frac{d|\\vec{r}|}{dt} = 0$, where $\\vec{r}$ is position vector of particle in given frame.',
    question_text: 'Assertion (A): If distance of a particle from a fixed point in a given frame remains constant then particle will be at rest in the given frame.\nReason (R): For a particle to be at rest in the given frame $\\frac{d|\\vec{r}|}{dt} = 0$, where $\\vec{r}$ is position vector of particle in given frame.',
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    solution: 'Assertion is FALSE: If the distance of a particle from a fixed point remains constant ($|\\vec{r}| = R = \\text{constant}$), the particle could be moving in uniform circular motion or on the surface of a sphere. The particle is clearly in motion, not at rest.\n\nReason is FALSE: For a particle to be at rest, the rate of change of its position vector must be zero ($\\frac{d\\vec{r}}{dt} = 0$). Having $\\frac{d|\\vec{r}|}{dt} = 0$ only means that its distance from the origin is constant, not that the particle is at rest.\n\nHence, both Assertion and Reason are false statements.'
  },
  {
    qNum: 14,
    topic: 'Dimensional Analysis of Kinematic Formula',
    question_type: 'assertion_reason',
    assertion_text: 'If a particle moves with constant acceleration on a straight line then displacement covered by particle in $n^{\\text{th}}$ second is given by $S_{n^{\\text{th}}} = u + \\frac{a}{2}(2n - 1)$.',
    reason_text: '$S_{n^{\\text{th}}} = u + \\frac{a}{2}(2n - 1)$ is dimensionally incorrect.',
    question_text: 'Assertion (A): If a particle moves with constant acceleration on a straight line then displacement covered by particle in $n^{\\text{th}}$ second is given by $S_{n^{\\text{th}}} = u + \\frac{a}{2}(2n - 1)$.\nReason (R): $S_{n^{\\text{th}}} = u + \\frac{a}{2}(2n - 1)$ is dimensionally incorrect.',
    options: AR_OPTIONS,
    correct_index: 1, // (2) Both true, R is not explanation
    solution: 'Assertion is TRUE: This is the standard equation for displacement covered by a uniformly accelerated particle in the $n^{\\text{th}}$ second.\n\nReason is TRUE: On the LHS, $S_{n^{\\text{th}}}$ is a length $[L]$. On the RHS, $u$ has dimensions of velocity $[LT^{-1}]$ and $\\frac{a}{2}(2n - 1)$ has dimensions of $[LT^{-1}]$. The formula is dimensionally incorrect as written because a factor of unit time ($1\\text{ s}$) is suppressed/factored out during derivation.\n\nHowever, Reason is not the explanation of why the formula gives the displacement in the $n^{\\text{th}}$ second. Hence, both are true but Reason is not the correct explanation.'
  },
  {
    qNum: 15,
    topic: 'Turning Points & Rectilinear Motion',
    question_type: 'assertion_reason',
    assertion_text: 'A particle moves along a straight line and its position varies with time according to $x = t^2 - 6t$, where $x$ is in metre and $t$ is in second. Distance travelled by the particle in certain interval of time may be equal to magnitude of displacement in same interval of time.',
    reason_text: 'Particle changes its direction of motion at $t = 3\\text{ s}$.',
    question_text: 'Assertion (A): A particle moves along a straight line and its position varies with time according to $x = t^2 - 6t$, where $x$ is in metre and $t$ is in second. Distance travelled by the particle in certain interval of time may be equal to magnitude of displacement in same interval of time.\nReason (R): Particle changes its direction of motion at $t = 3\\text{ s}$.',
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    solution: 'Given position: $x = t^2 - 6t$.\nVelocity is $v = \\frac{dx}{dt} = 2t - 6$.\n\nThe particle reverses its direction of motion when $v = 0 \\implies 2t - 6 = 0 \\implies t = 3\\text{ s}$. Thus, Reason is TRUE.\n\nFor any time interval that does not include the turning point $t = 3\\text{ s}$ (e.g. from $t = 0$ to $t = 2\\text{ s}$, or from $t = 4\\text{ s}$ to $t = 6\\text{ s}$), the motion is strictly unidirectional, so distance travelled equals the magnitude of displacement. Thus, Assertion is TRUE.\n\nBecause the reversal only occurs at $t = 3\\text{ s}$, the unidirectional nature of motion in intervals excluding $t = 3\\text{ s}$ explains why distance may equal magnitude of displacement. Reason correctly explains Assertion.'
  },
  {
    qNum: 16,
    topic: 'Constant Speed on Straight Line',
    question_type: 'assertion_reason',
    assertion_text: 'If a particle moves with constant speed on a straight line then its acceleration will be zero.',
    reason_text: 'In case of straight line $\\left|\\frac{d\\vec{v}}{dt}\\right| = \\left|\\frac{d|\\vec{v}|}{dt}\\right|$.',
    question_text: 'Assertion (A): If a particle moves with constant speed on a straight line then its acceleration will be zero.\nReason (R): In case of straight line $\\left|\\frac{d\\vec{v}}{dt}\\right| = \\left|\\frac{d|\\vec{v}|}{dt}\\right|$.',
    options: AR_OPTIONS,
    correct_index: 0, // (1) Both true, R is correct explanation
    solution: 'Assertion is TRUE: A particle moving on a straight line with constant speed has neither a changing magnitude nor a changing direction of its velocity vector. Hence its acceleration $\\vec{a} = \\frac{d\\vec{v}}{dt} = 0$.\n\nReason is TRUE: For rectilinear (straight-line) motion, there is no normal/centripetal acceleration ($a_n = 0$). Hence, the magnitude of the total acceleration vector equals the magnitude of tangential acceleration (the rate of change of speed): $\\left|\\frac{d\\vec{v}}{dt}\\right| = \\left|\\frac{d|\\vec{v}|}{dt}\\right|$. When speed is constant, $\\frac{d|\\vec{v}|}{dt} = 0$, which immediately implies acceleration is zero.\n\nThus, Reason is the correct explanation of Assertion.'
  },
  {
    qNum: 17,
    topic: 'Successive Intervals & Kinematics Equations',
    question_type: 'assertion_reason',
    assertion_text: 'In case of straight line motion with constant acceleration distance travelled by the particle in two successive equal intervals cannot be equal.',
    reason_text: 'In case of straight line motion with constant acceleration distance travelled in time t is given by $S = ut + \\frac{1}{2}at^2$.',
    question_text: 'Assertion (A): In case of straight line motion with constant acceleration distance travelled by the particle in two successive equal intervals cannot be equal.\nReason (R): In case of straight line motion with constant acceleration distance travelled in time t is given by $S = ut + \\frac{1}{2}at^2$.',
    options: AR_OPTIONS,
    correct_index: 3, // (4) Both false
    solution: 'Assertion is FALSE: If a particle reverses direction, the distance traveled in two successive equal time intervals CAN be equal. For example, a body thrown vertically upwards under gravity travels a distance of $5\\text{ m}$ upward in the last second before reaching maximum height, and travels a distance of $5\\text{ m}$ downward in the very next second from rest. Both intervals have duration $1\\text{ s}$, and the distance covered in each is equal ($5\\text{ m}$).\n\nReason is FALSE: The formula $S = ut + \\frac{1}{2}at^2$ gives the net DISPLACEMENT, not the total distance travelled. Whenever the particle reverses direction during the interval, the distance travelled exceeds the magnitude of displacement.\n\nHence, both Assertion and Reason are false statements.'
  }
];

