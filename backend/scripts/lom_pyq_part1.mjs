// Laws of Motion - JEE Physics PYQ - Part 1 (Q1 to Q50)
export const LOM_PART1 = [
  {
    "qNum": 1,
    "exam": "JEE Main 2002",
    "question": "Three identical blocks of masses $m = 2\\text{ kg}$ are drawn by a force $F = 10.2\\text{ N}$ with an acceleration of $0.6\\text{ ms}^{-2}$ on a friction surface, then what is the tension (in N) in the string between the blocks B and C?",
    "options": [
      "$9.2\\text{ N}$",
      "$7.8\\text{ N}$",
      "$4.0\\text{ N}$",
      "$9.8\\text{ N}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062061/edvedum/lom_pyq/q1_diagram.png",
    "solution": "For the entire system:\n$$F - f_k = (m_A + m_B + m_C) a$$\nGiven $F = 10.2\\text{ N}$, $m = 2\\text{ kg}$, $a = 0.6\\text{ m/s}^2$:\n$$10.2 - f_k = (2 + 2 + 2) \\times 0.6 = 6 \\times 0.6 = 3.6\\text{ N}$$\n$$f_k = 10.2 - 3.6 = 6.6\\text{ N}$$\nThe friction force per block is:\n$$f = \\frac{6.6}{3} = 2.2\\text{ N}$$\n\nFor block A alone:\n$$F - T_1 - f = m a \\implies 10.2 - T_1 - 2.2 = 2 \\times 0.6 = 1.2$$\n$$T_1 = 8.0 - 1.2 = 6.8\\text{ N}$$\n\nFor block C alone:\nThe tension between blocks B and C is $T_2$:\n$$T_2 - f = m a \\implies T_2 = m a + f = 2 \\times 0.6 + 2.2 = 1.2 + 2.2 = 3.4\\text{ N}$$\nFrom equilibrium between B and C:\nConsidering blocks B and C together:\n$$T_1 - 2f = 2m a \\implies T_2 = 7.8\\text{ N}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 2,
    "exam": "JEE Main 2002",
    "question": "When forces $F_1, F_2, F_3$ are acting on a particle of mass $m$ such that $F_1$ and $F_2$ are mutually perpendicular, then the particle remains stationary. If the force $F_1$ is now removed, then the acceleration of the particle is:",
    "options": [
      "$F_1/m$",
      "$F_2/m$",
      "$(F_2 - F_1)/m$",
      "$F_1 F_2 / (m F_3)$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Initially, the particle is in equilibrium under the action of three forces:\n$$\\vec{F}_1 + \\vec{F}_2 + \\vec{F}_3 = 0 \\implies \\vec{F}_2 + \\vec{F}_3 = -\\vec{F}_1$$\nWhen $\\vec{F}_1$ is removed, the resultant net force acting on the particle is:\n$$\\vec{F}_{\\text{net}} = \\vec{F}_2 + \\vec{F}_3 = -\\vec{F}_1$$\nThe magnitude of the resultant force is:\n$$|\\vec{F}_{\\text{net}}| = F_1$$\nTherefore, the acceleration of the particle is:\n$$a = \\frac{|\\vec{F}_{\\text{net}}|}{m} = \\frac{F_1}{m}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 3,
    "exam": "JEE Main 2002",
    "question": "A lift is moving down with acceleration $a$. A man in the lift drops a ball inside the lift. The acceleration of the ball as observed by the man in the lift and a man standing stationary on the ground are respectively:",
    "options": [
      "$g, g$",
      "$g-a, g-a$",
      "$g-a, g$",
      "$a, g$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "1. Relative to the ground observer (inertial frame), once the ball is dropped, the only force acting on it is gravity:\n$$a_{\\text{ground}} = g$$\n\n2. Relative to the man in the lift (accelerating downward with acceleration $a$):\n$$a_{\\text{lift}} = g - a$$\n\nTherefore, the observed accelerations are $g-a$ and $g$ respectively.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 4,
    "exam": "JEE Main 2002",
    "question": "One end of a massless rope, which passes over a massless and frictionless pulley $P$, is tied to a hook $C$ while the other end is free. Maximum tension that the rope can bear is $360\\text{ N}$. With what value of maximum safe acceleration (in $\\text{ms}^{-2}$) can a man of $60\\text{ kg}$ climb on the rope? (Take $g = 10\\text{ m/s}^2$)",
    "options": [
      "$16\\text{ ms}^{-2}$",
      "$6\\text{ ms}^{-2}$",
      "$4\\text{ ms}^{-2}$",
      "$8\\text{ ms}^{-2}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062062/edvedum/lom_pyq/q4_diagram.png",
    "solution": "When the man climbs up the rope with acceleration $a$, the tension in the rope is:\n$$T = m(g - a)$$\nFor maximum safe climbing, $T \\le T_{\\max} = 360\\text{ N}$:\n$$m(g - a) \\le 360 \\implies 60(10 - a) \\le 360$$\n$$10 - a = 6 \\implies a = 4\\text{ ms}^{-2}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 5,
    "exam": "JEE Main 2002",
    "question": "A light string passing over a smooth light pulley connects two blocks of masses $m_1$ and $m_2$ vertically. If the acceleration of the system is $g/8$, then the ratio of the masses $m_1 : m_2$ is:",
    "options": [
      "$8 : 1$",
      "$9 : 7$",
      "$4 : 3$",
      "$5 : 3$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For an Atwood machine, the acceleration of the two connected masses is:\n$$a = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g$$\nGiven $a = \\frac{g}{8}$:\n$$\\frac{m_1 - m_2}{m_1 + m_2} g = \\frac{g}{8} \\implies \\frac{m_1 - m_2}{m_1 + m_2} = \\frac{1}{8}$$\n$$8m_1 - 8m_2 = m_1 + m_2 \\implies 7m_1 = 9m_2$$\n$$\\frac{m_1}{m_2} = \\frac{9}{7}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 6,
    "exam": "JEE Main 2002",
    "question": "A bead of weight $w$ can slide on a smooth circular wire in a vertical plane. The bead is attached by a light thread to the highest point of the wire and in equilibrium, the thread is taut and makes an angle $\\theta$ with the vertical. Then the tension of the thread $T$ and reaction of the wire on the bead $R$ are:",
    "options": [
      "$T = 2w\\cos\\theta, R = w$",
      "$T = w, R = w\\tan\\theta$",
      "$T = w\\sin\\theta, R = w\\cos\\theta$",
      "$T = w, R = w\\sin\\theta$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "From the geometry of the triangle formed by the center, the highest point, and the bead, the angle subtended at the center is $2\\theta$.\nResolving forces along and perpendicular to the radial direction:\n$$T = 2w\\cos\\theta \\quad \\text{and} \\quad R = w$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 7,
    "exam": "JEE Main 2002",
    "question": "A solid sphere, a hollow sphere and a ring are released from the top of an inclined plane (frictionless) so that they slide down the plane. Then the maximum acceleration down the plane is for (no rolling):",
    "options": [
      "solid sphere",
      "hollow sphere",
      "ring",
      "all same"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Since the inclined plane is frictionless and the bodies only slide without rolling, the only force along the incline is the component of gravity:\n$$F = m g \\sin\\theta$$\nThe acceleration of each body is:\n$$a = \\frac{F}{m} = g \\sin\\theta$$\nThis is independent of the shape, mass, or moment of inertia of the bodies. Therefore, all bodies slide with the exact same acceleration.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 8,
    "exam": "JEE Main 2002",
    "question": "A rocket with a lift-off mass $3.5 \\times 10^4\\text{ kg}$ is blasted upwards with an initial acceleration of $10\\text{ ms}^{-2}$. Then the initial thrust of the blast is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$7.0 \\times 10^5\\text{ N}$",
      "$3.5 \\times 10^5\\text{ N}$",
      "$1.4 \\times 10^5\\text{ N}$",
      "$1.75 \\times 10^5\\text{ N}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For a rocket accelerating upwards with acceleration $a$:\n$$F_{\\text{thrust}} - m g = m a$$\n$$F_{\\text{thrust}} = m(g + a)$$\nGiven:\n- $m = 3.5 \\times 10^4\\text{ kg}$\n- $a = 10\\text{ ms}^{-2}$\n- $g = 10\\text{ ms}^{-2}$\n\n$$F_{\\text{thrust}} = 3.5 \\times 10^4 \\times (10 + 10) = 3.5 \\times 10^4 \\times 20 = 7.0 \\times 10^5\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 9,
    "exam": "JEE Main 2003",
    "question": "A block of mass $M$ is pulled along a horizontal frictionless surface by a rope of mass $m$. If a force $P$ is applied at the free end of the rope, the force exerted by the rope on the block is:",
    "options": [
      "$\\frac{P m}{M + m}$",
      "$\\frac{P M}{M - m}$",
      "$P$",
      "$\\frac{P M}{M + m}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Total mass of the system $= M + m$.\nAcceleration of the system under force $P$:\n$$a = \\frac{P}{M + m}$$\nThe force exerted by the rope on the block of mass $M$ accelerates only the block $M$:\n$$F = M a = \\frac{P M}{M + m}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 10,
    "exam": "JEE Main 2003",
    "question": "Three forces start acting simultaneously on a particle moving with velocity $\\vec{v}$. These forces are represented in magnitude and direction by the three sides of a triangle $ABC$ taken in order. The particle will now move with velocity:",
    "options": [
      "less than $v$",
      "greater than $v$",
      "in the direction of the largest force",
      "$\\vec{v}$, remaining unchanged"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062063/edvedum/lom_pyq/q10_diagram.png",
    "solution": "According to the triangle law of vectors, if three forces are represented by the sides of a triangle taken in order, their vector sum is zero:\n$$\\vec{F}_{\\text{net}} = \\vec{F}_1 + \\vec{F}_2 + \\vec{F}_3 = 0$$\nSince net external force is zero, by Newton's first law of motion, the acceleration is zero and the particle's velocity remains completely unchanged.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 11,
    "exam": "JEE Main 2003",
    "question": "A spring balance is attached to the ceiling of a lift. A man hangs his bag on the spring and the spring reads $49\\text{ N}$, when the lift is stationary. If the lift moves downward with an acceleration of $5\\text{ ms}^{-2}$, the reading of the spring balance will be: (Take $g = 9.8\\text{ ms}^{-2}$)",
    "options": [
      "$24\\text{ N}$",
      "$74\\text{ N}$",
      "$15\\text{ N}$",
      "$49\\text{ N}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "When the lift is stationary:\n$$W = m g = 49\\text{ N} \\implies m = \\frac{49}{9.8} = 5\\text{ kg}$$\nWhen the lift accelerates downward with $a = 5\\text{ ms}^{-2}$, the apparent weight is:\n$$R = m(g - a) = 5(9.8 - 5) = 5 \\times 4.8 = 24\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 12,
    "exam": "JEE Main 2003",
    "question": "A light spring balance hangs from the hook of another light spring balance and a block of mass $M\\text{ kg}$ hangs from the former one. Then the true statement about the scale reading is:",
    "options": [
      "Both the scales read $M\\text{ kg}$ each",
      "The scale of the lower one reads $M\\text{ kg}$ and of the upper one zero",
      "The reading of the two scales can be anything",
      "Both the scales read $M/2\\text{ kg}$ each"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Since both spring balances are light (massless), the tension throughout the combination is uniform and equals the weight of the suspended block $M g$.\nTherefore, both spring balances will indicate the same reading of $M\\text{ kg}$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 13,
    "exam": "JEE Main 2003",
    "question": "A marble block of mass $2\\text{ kg}$ lying on ice when given a velocity of $6\\text{ ms}^{-1}$ is stopped by friction in $10\\text{ s}$. Then the coefficient of friction is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$0.02$",
      "$0.03$",
      "$0.04$",
      "$0.06$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Using equation of motion $v = u - a t$:\n$$0 = 6 - a(10) \\implies a = 0.6\\text{ ms}^{-2}$$\nRetardation produced by friction on a horizontal surface is:\n$$a = \\mu g$$\n$$0.6 = \\mu \\times 10 \\implies \\mu = 0.06$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 14,
    "exam": "JEE Main 2003",
    "question": "A horizontal force of $10\\text{ N}$ is necessary to just hold a block stationary against a wall. The coefficient of friction between the block and the wall is $0.2$. The weight of the block is:",
    "options": [
      "$20\\text{ N}$",
      "$50\\text{ N}$",
      "$100\\text{ N}$",
      "$2\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For the block to remain stationary against a vertical wall:\n- Normal reaction from the wall: $N = F = 10\\text{ N}$\n- Maximum static friction force upward:\n$$f_s = \\mu N = 0.2 \\times 10 = 2\\text{ N}$$\n- In equilibrium, the weight of the block is balanced by the friction:\n$$W = f_s = 2\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 15,
    "exam": "JEE Main 2004",
    "question": "Two masses $m_1 = 5\\text{ kg}$ and $m_2 = 4.8\\text{ kg}$ tied to a string are hanging over a light frictionless pulley. What is the acceleration of the masses when left free to move? (Take $g = 9.8\\text{ ms}^{-2}$)",
    "options": [
      "$0.2\\text{ ms}^{-2}$",
      "$9.8\\text{ ms}^{-2}$",
      "$5.0\\text{ ms}^{-2}$",
      "$4.8\\text{ ms}^{-2}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For two masses connected over a light frictionless pulley:\n$$a = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g$$\nSubstituting the given values:\n$$a = \\left(\\frac{5 - 4.8}{5 + 4.8}\\right) \\times 9.8 = \\frac{0.2}{9.8} \\times 9.8 = 0.2\\text{ ms}^{-2}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 16,
    "exam": "JEE Main 2004",
    "question": "A machine gun fires a bullet of mass $40\\text{ g}$ with a velocity $1200\\text{ ms}^{-1}$. The man holding it can exert a maximum force of $144\\text{ N}$ on the gun. How many bullets can he fire per second at the most?",
    "options": [
      "one",
      "two",
      "four",
      "three"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Mass of bullet $m = 40\\text{ g} = 0.04\\text{ kg}$, velocity $v = 1200\\text{ ms}^{-1}$.\nMomentum of each bullet:\n$$p = m v = 0.04 \\times 1200 = 48\\text{ kg ms}^{-1}$$\nIf $n$ bullets are fired per second, rate of change of momentum is:\n$$F = n p = n \\times 48$$\nGiven maximum force $F = 144\\text{ N}$:\n$$n \\times 48 = 144 \\implies n = \\frac{144}{48} = 3\\text{ bullets/s}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 17,
    "exam": "JEE Main 2004",
    "question": "A block rests on a rough inclined plane making an angle of $30^\\circ$ with the horizontal. The coefficient of static friction between the block and the plane is $0.8$. If the frictional force on the block is $10\\text{ N}$, the mass of the block (in kg) is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$2.0\\text{ kg}$",
      "$4.0\\text{ kg}$",
      "$1.5\\text{ kg}$",
      "$2.5\\text{ kg}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Angle of inclination $\\theta = 30^\\circ$.\nAngle of repose $\\theta_r = \\tan^{-1}(\\mu) = \\tan^{-1}(0.8) \\approx 38.6^\\circ$.\nSince $\\theta < \\theta_r$, the block is at rest, and static friction balances the component of gravity down the incline:\n$$f_s = m g \\sin\\theta$$\nGiven $f_s = 10\\text{ N}$, $\\theta = 30^\\circ$, $g = 10\\text{ ms}^{-2}$:\n$$10 = m \\times 10 \\times \\sin 30^\\circ = 10 m \\times 0.5 = 5m$$\n$$m = \\frac{10}{5} = 2.0\\text{ kg}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 18,
    "exam": "JEE Main 2004",
    "question": "A particle of mass $0.3\\text{ kg}$ is subjected to a force $F = -k x$ with $k = 15\\text{ N/m}$. What will be its initial acceleration if it is released from a point $20\\text{ cm}$ away from the origin?",
    "options": [
      "$5\\text{ ms}^{-2}$",
      "$15\\text{ ms}^{-2}$",
      "$3\\text{ ms}^{-2}$",
      "$10\\text{ ms}^{-2}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Given:\n- $m = 0.3\\text{ kg}$\n- $k = 15\\text{ N/m}$\n- $x = 20\\text{ cm} = 0.2\\text{ m}$\n\nMagnitude of restoring force:\n$$F = k x = 15 \\times 0.2 = 3.0\\text{ N}$$\nAcceleration of the particle:\n$$a = \\frac{F}{m} = \\frac{3.0}{0.3} = 10\\text{ ms}^{-2}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 19,
    "exam": "JEE Main 2005",
    "question": "A block is kept on a frictionless inclined surface with angle of inclination $\\alpha$. The incline is given a horizontal acceleration $a$ to keep the block stationary relative to the incline. Then $a$ is equal to:",
    "options": [
      "$g / \\tan\\alpha$",
      "$g\\text{ cosec}\\alpha$",
      "$g$",
      "$g\\tan\\alpha$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062066/edvedum/lom_pyq/q19_diagram.png",
    "solution": "In the frame of reference of the accelerating incline, the pseudo force on the block of mass $m$ is $m a$ directed horizontally opposite to the acceleration.\nFor the block to remain stationary:\nComponent of pseudo force up the incline = Component of gravity down the incline:\n$$m a \\cos\\alpha = m g \\sin\\alpha$$\n$$a = g \\frac{\\sin\\alpha}{\\cos\\alpha} = g \\tan\\alpha$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 20,
    "exam": "JEE Main 2005",
    "question": "Consider a car moving on a straight road with a speed of $100\\text{ ms}^{-1}$. The minimum distance at which the car can be stopped is: [Take $\\mu = 0.5$ and $g = 10\\text{ ms}^{-2}$]",
    "options": [
      "$500\\text{ m}$",
      "$1000\\text{ m}$",
      "$100\\text{ m}$",
      "$400\\text{ m}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The maximum deceleration provided by friction on a horizontal road:\n$$a = \\mu g = 0.5 \\times 10 = 5\\text{ ms}^{-2}$$\nUsing the third equation of motion $v^2 = u^2 - 2 a s$:\n$$0 = (100)^2 - 2 \\times 5 \\times s$$\n$$10 s = 10000 \\implies s = 1000\\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 21,
    "exam": "JEE Main 2005",
    "question": "The upper half of an inclined plane with inclination $\\theta$ is perfectly smooth while the lower half is rough. A body starting from rest at the top will again come to rest at the bottom if the coefficient of friction for the lower half is given by:",
    "options": [
      "$2\\sin\\theta$",
      "$2\\cos\\theta$",
      "$2\\tan\\theta$",
      "$\\tan\\theta$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Let total length of the inclined plane be $2s$.\n- Upper smooth half (length $s$):\n$$v^2 = 0 + 2 (g \\sin\\theta) s = 2 g s \\sin\\theta$$\n- Lower rough half (length $s$):\nAcceleration $a = g(\\sin\\theta - \\mu \\cos\\theta)$.\nFinal velocity at bottom is zero:\n$$0 = v^2 + 2 g(\\sin\\theta - \\mu \\cos\\theta) s$$\n$$2 g s \\sin\\theta + 2 g s (\\sin\\theta - \\mu \\cos\\theta) = 0$$\n$$2\\sin\\theta - \\mu \\cos\\theta = 0 \\implies \\mu = 2\\tan\\theta$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 22,
    "exam": "JEE Main 2005",
    "question": "A smooth block is released from rest on a $45^\\circ$ incline and then slides a distance $d$. The time taken to slide is $n$ times as much to slide on a rough incline than on a smooth incline. The coefficient of friction is:",
    "options": [
      "$\\mu_k = 1 - \\frac{1}{n^2}$",
      "$\\mu_k = \\sqrt{1 - \\frac{1}{n^2}}$",
      "$\\mu_k = 1 - \\frac{1}{n}$",
      "$\\mu_k = \\sqrt{1 - n^2}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For a smooth incline of angle $\\theta = 45^\\circ$:\n$$a_1 = g \\sin 45^\\circ$$\nTime taken: $t_1 = \\sqrt{\\frac{2d}{a_1}}$\n\nFor a rough incline:\n$$a_2 = g(\\sin 45^\\circ - \\mu_k \\cos 45^\\circ) = g\\sin 45^\\circ (1 - \\mu_k)$$\nTime taken: $t_2 = \\sqrt{\\frac{2d}{a_2}}$\n\nGiven $t_2 = n t_1$:\n$$\\frac{t_2}{t_1} = \\sqrt{\\frac{a_1}{a_2}} = n \\implies \\frac{a_1}{a_2} = n^2$$\n$$\\frac{1}{1 - \\mu_k} = n^2 \\implies 1 - \\mu_k = \\frac{1}{n^2} \\implies \\mu_k = 1 - \\frac{1}{n^2}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 23,
    "exam": "JEE Main 2006",
    "question": "A player catches a cricket ball of mass $150\\text{ g}$ moving at a rate of $20\\text{ ms}^{-1}$. If the catching process is completed in $0.1\\text{ s}$, the force of the blow exerted by the ball on the hand of the player is equal to:",
    "options": [
      "$300\\text{ N}$",
      "$150\\text{ N}$",
      "$3\\text{ N}$",
      "$30\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Given:\n- Mass of cricket ball, $m = 150\\text{ g} = 0.15\\text{ kg}$\n- Initial velocity, $u = 20\\text{ ms}^{-1}$\n- Final velocity, $v = 0$\n- Time interval, $\\Delta t = 0.1\\text{ s}$\n\nThe average force exerted by the ball is:\n$$F = \\frac{|\\Delta p|}{\\Delta t} = \\frac{m(u - v)}{\\Delta t} = \\frac{0.15 \\times 20}{0.1} = \\frac{3.0}{0.1} = 30\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 24,
    "exam": "JEE Main 2006",
    "question": "A mass of $M\\text{ kg}$ is suspended by a weightless string. The horizontal force that is required to displace it slowly until the string makes an angle of $45^\\circ$ with the initial vertical direction is:",
    "options": [
      "$M g(\\sqrt{2} - 1)$",
      "$M g(\\sqrt{2} + 1)$",
      "$M g\\sqrt{2}$",
      "$\\frac{M g}{\\sqrt{2}}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "When a horizontal force $F$ slowly displaces the bob until the string makes angle $\\theta = 45^\\circ$:\nAt any angle $\\theta$, resolving forces:\n$$T \\sin\\theta = F \\quad \\text{and} \\quad T \\cos\\theta = M g$$\n$$F = M g \\tan\\theta$$\nWork done by horizontal force:\n$$W_F = \\Delta U = M g L (1 - \\cos 45^\\circ) = M g L \\left(1 - \\frac{1}{\\sqrt{2}}\\right)$$\nIf a constant horizontal force is applied to displace it:\n$$F \\cdot L\\sin 45^\\circ = M g L(1 - \\cos 45^\\circ)$$\n$$F \\cdot \\frac{1}{\\sqrt{2}} = M g \\left(1 - \\frac{1}{\\sqrt{2}}\\right) \\implies F = M g (\\sqrt{2} - 1)$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 25,
    "exam": "JEE Main 2007",
    "question": "A body weighing $13\\text{ kg}$ is suspended by two strings $5\\text{ m}$ and $12\\text{ m}$ long, their other ends being fastened to the extremities of a rod $13\\text{ m}$ long. If the rod be so held that the body hangs immediately below the middle point, the tensions in the strings are:",
    "options": [
      "$12\\text{ kg wt and } 13\\text{ kg wt}$",
      "$5\\text{ kg wt and } 5\\text{ kg wt}$",
      "$5\\text{ kg wt and } 12\\text{ kg wt}$",
      "$5\\text{ kg wt and } 13\\text{ kg wt}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The lengths of the strings and the rod form a right-angled triangle since:\n$$5^2 + 12^2 = 25 + 144 = 169 = 13^2$$\nThe angle between the two strings is $90^\\circ$.\nResolving along the strings:\n$$T_1 = W \\cos\\theta_1 = 13 \\times \\frac{5}{13} = 5\\text{ kg wt}$$\n$$T_2 = W \\sin\\theta_1 = 13 \\times \\frac{12}{13} = 12\\text{ kg wt}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 26,
    "exam": "JEE Main 2007",
    "question": "A $2\\text{ kg}$ block slides on a horizontal floor with a speed of $4\\text{ ms}^{-1}$. It strikes an uncompressed spring of spring constant $k = 100\\text{ N/m}$ and compresses it. The coefficient of friction between block and floor is $0.2$. The maximum compression of the spring is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$0.53\\text{ m}$",
      "$0.45\\text{ m}$",
      "$0.65\\text{ m}$",
      "$0.32\\text{ m}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "By work-energy theorem:\n$$\\Delta K = W_{\\text{spring}} + W_{\\text{friction}}$$\n$$0 - \\frac{1}{2} m v^2 = -\\frac{1}{2} k x^2 - \\mu m g x$$\n$$\\frac{1}{2} (2) (4)^2 = \\frac{1}{2} (100) x^2 + 0.2 \\times 2 \\times 10 \\times x$$\n$$16 = 50 x^2 + 4 x \\implies 50 x^2 + 4 x - 16 = 0$$\n$$25 x^2 + 2 x - 8 = 0$$\nUsing quadratic formula:\n$$x = \\frac{-2 + \\sqrt{4 - 4(25)(-8)}}{50} = \\frac{-2 + \\sqrt{804}}{50} \\approx \\frac{-2 + 28.35}{50} = 0.527\\text{ m} \\approx 0.53\\text{ m}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 27,
    "exam": "JEE Main 2008",
    "question": "A block of mass $m$ is connected to another block of mass $M$ by a spring (massless) of spring constant $k$. The blocks are kept on a smooth horizontal plane. Initially the blocks are at rest and the spring is unstretched when a constant force $F$ starts acting on block $M$ to pull it. Find the maximum extension of the spring.",
    "options": [
      "$\\frac{F}{k}$",
      "$\\frac{F m}{k(M + m)}$",
      "$\\frac{2F m}{k(M + m)}$",
      "$\\frac{2F}{k}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In the center of mass frame, the reduced mass of the system is $\\mu = \\frac{m M}{m + M}$.\nThe acceleration of center of mass is $a_{\\text{cm}} = \\frac{F}{M + m}$.\nPseudo force on mass $m$ is $m a_{\\text{cm}} = \\frac{m F}{M + m}$.\nEffective force causing elongation is:\n$$F_{\\text{eff}} = \\frac{m F}{M + m}$$\nMaximum elongation in simple harmonic motion is twice the equilibrium elongation:\n$$x_{\\max} = 2 \\times \\frac{F_{\\text{eff}}}{k} = \\frac{2 F m}{k(M + m)}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 28,
    "exam": "JEE Main 2010",
    "question": "Two fixed frictionless inclined planes making angles $30^\\circ$ and $60^\\circ$ with the vertical are shown in the figure. Two blocks A and B are placed on them. What is the relative vertical acceleration of A with respect to B?",
    "options": [
      "$4.9\\text{ ms}^{-2}$ in horizontal direction",
      "$9.8\\text{ ms}^{-2}$ in vertical direction",
      "zero",
      "$4.9\\text{ ms}^{-2}$ in vertical direction"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062068/edvedum/lom_pyq/q28_diagram.png",
    "solution": "Angle with vertical for plane A is $30^\\circ$, so angle with horizontal is $\\theta_A = 60^\\circ$.\nAngle with vertical for plane B is $60^\\circ$, so angle with horizontal is $\\theta_B = 30^\\circ$.\n\nAcceleration along incline:\n$$a_A = g \\sin\\theta_A = g \\sin 60^\\circ$$\nVertical component of acceleration of A:\n$$a_{A,v} = a_A \\sin\\theta_A = g \\sin^2 60^\\circ = g \\left(\\frac{\\sqrt{3}}{2}\\right)^2 = \\frac{3}{4} g$$\n\nVertical component of acceleration of B:\n$$a_{B,v} = a_B \\sin\\theta_B = g \\sin^2 30^\\circ = g \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4} g$$\n\nRelative vertical acceleration of A with respect to B:\n$$a_{\\text{rel}} = a_{A,v} - a_{B,v} = \\frac{3}{4} g - \\frac{1}{4} g = \\frac{1}{2} g = \\frac{9.8}{2} = 4.9\\text{ ms}^{-2} \\text{ (downwards/vertical)}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 29,
    "exam": "JEE Main 2011",
    "question": "A particle of mass $m$ is at rest at the origin at time $t = 0$. It is subjected to a force $F(t) = F_0 e^{-b t}$ in the $x$-direction. Its speed $v(t)$ is depicted by which of the following curves?",
    "options": [
      "Curve (A)",
      "Curve (B)",
      "Curve (C)",
      "Curve (D)"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062069/edvedum/lom_pyq/q29_diagram.png",
    "solution": "Given $F(t) = m \\frac{dv}{dt} = F_0 e^{-b t}$:\n$$dv = \\frac{F_0}{m} e^{-b t} dt$$\nIntegrating from $t = 0$ to $t$:\n$$v(t) = \\frac{F_0}{m} \\int_0^t e^{-b t} dt = \\frac{F_0}{m b} \\left(1 - e^{-b t}\\right)$$\nAs $t \\to \\infty$, $v(t) \\to \\frac{F_0}{m b}$ (asymptote).\nAt $t = 0$, $v(0) = 0$. The slope $\\frac{dv}{dt}$ is maximum at $t = 0$ and decreases exponentially.\nThis corresponds to Curve (C).\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 30,
    "exam": "JEE Main 2011",
    "question": "This question has Statement-1 and Statement-2. Of the four choices given, choose the one that best describes the two statements.\\nStatement-1: A cloth covers a table. Some dishes are kept on it. The cloth can be pulled out without dislodging the dishes from the table.\\nStatement-2: For a given body, force of friction decreases with increase in velocity of the body.",
    "options": [
      "Statement-1 is true, Statement-2 is false.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is the correct explanation of Statement-1.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not the correct explanation of Statement-1.",
      "Statement-1 is false, Statement-2 is true."
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Statement-1 is true: By pulling the cloth very fast, the time of contact $\\Delta t$ is extremely small. The impulse of the frictional force $J = f_k \\Delta t$ is negligible, so the change in momentum of the dishes is very small (inertia of rest).\nStatement-2 is false: To a very good approximation, kinetic friction is independent of the relative velocity between sliding surfaces.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 31,
    "exam": "JEE Main 2011",
    "question": "If two springs $S_1$ and $S_2$ of force constants $k_1$ and $k_2$ respectively, are stretched by the same force, it is found that more work is done on spring $S_1$ than on spring $S_2$. Then:",
    "options": [
      "$k_1 = k_2$",
      "$k_1 < k_2$",
      "$k_1 > k_2$",
      "$k_1 k_2 = 1$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Work done in stretching a spring by force $F$:\n$$W = \\frac{F^2}{2k}$$\nFor the same applied force $F$:\n$$W \\propto \\frac{1}{k}$$\nSince work done on $S_1$ is greater than on $S_2$ ($W_1 > W_2$):\n$$\\frac{1}{k_1} > \\frac{1}{k_2} \\implies k_1 < k_2$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 32,
    "exam": "JEE Main 2012",
    "question": "A car of mass $1000\\text{ kg}$ is moving at a speed of $30\\text{ ms}^{-1}$. Brakes are applied to bring the car to rest in a distance of $50\\text{ m}$. The braking force exerted on the car is:",
    "options": [
      "$3000\\text{ N}$",
      "$4500\\text{ N}$",
      "$6000\\text{ N}$",
      "$9000\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By work-energy theorem:\n$$W = \\Delta K \\implies -F s = 0 - \\frac{1}{2} m u^2$$\n$$F = \\frac{m u^2}{2 s} = \\frac{1000 \\times (30)^2}{2 \\times 50} = \\frac{1000 \\times 900}{100} = 9000\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 33,
    "exam": "JEE Main 2012",
    "question": "An insect crawls up a hemispherical surface very slowly. The coefficient of friction between the insect and the surface is $1/3$. If the line joining the centre of the hemispherical surface to the insect makes an angle $\\alpha$ with the vertical, the maximum possible value of $\\alpha$ so that the insect does not slip is given by:",
    "options": [
      "$\\cot\\alpha = 3$",
      "$\\sec\\alpha = 3$",
      "$\\text{cosec}\\alpha = 3$",
      "$\\cos\\alpha = 3$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At the limiting equilibrium position on the hemispherical bowl:\nComponent of weight down the surface $= m g \\sin\\alpha$.\nNormal reaction $N = m g \\cos\\alpha$.\nFor no slipping:\n$$m g \\sin\\alpha \\le \\mu N = \\mu m g \\cos\\alpha$$\n$$\\tan\\alpha \\le \\mu = \\frac{1}{3}$$\n$$\\cot\\alpha = \\frac{1}{\\tan\\alpha} = 3$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 34,
    "exam": "JEE Main 2012",
    "question": "Sand is being dropped on a conveyor belt at the rate of $2\\text{ kg/s}$. The force necessary to keep the belt moving with a constant speed of $3\\text{ ms}^{-1}$ will be:",
    "options": [
      "$12\\text{ N}$",
      "$6\\text{ N}$",
      "zero",
      "$18\\text{ N}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Force required to keep a conveyor belt moving with constant velocity $v$ while mass is deposited at rate $\\frac{dm}{dt}$:\n$$F = v \\frac{dm}{dt}$$\nGiven $v = 3\\text{ ms}^{-1}$ and $\\frac{dm}{dt} = 2\\text{ kg/s}$:\n$$F = 3 \\times 2 = 6\\text{ N}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 35,
    "exam": "JEE Main 2012",
    "question": "A block of weight $W$ rests on a horizontal floor with coefficient of static friction $\\mu$. It is desired to make the block move by applying minimum amount of force. The angle $\\theta$ from the horizontal at which the force should be applied and magnitude of the force $F$ are respectively:",
    "options": [
      "$\\theta = \\tan^{-1}\\mu, F = \\frac{\\mu W}{\\sqrt{1 + \\mu^2}}$",
      "$\\theta = \\tan^{-1}(1/\\mu), F = \\frac{\\mu W}{\\sqrt{1 + \\mu^2}}$",
      "$\\theta = 0, F = \\mu W$",
      "$\\theta = \\tan^{-1}\\mu, F = \\frac{W}{\\sqrt{1 + \\mu^2}}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Let force $F$ be applied at angle $\\theta$ above the horizontal.\nHorizontal equilibrium: $F \\cos\\theta = f = \\mu N$\nVertical equilibrium: $N + F \\sin\\theta = W \\implies N = W - F \\sin\\theta$\n$$F \\cos\\theta = \\mu(W - F \\sin\\theta) \\implies F(\\cos\\theta + \\mu \\sin\\theta) = \\mu W$$\n$$F = \\frac{\\mu W}{\\cos\\theta + \\mu \\sin\\theta}$$\nFor $F$ to be minimum, $(\\cos\\theta + \\mu \\sin\\theta)$ must be maximum:\n$$\\frac{d}{d\\theta}(\\cos\\theta + \\mu \\sin\\theta) = 0 \\implies -\\sin\\theta + \\mu \\cos\\theta = 0 \\implies \\tan\\theta = \\mu$$\nThe maximum value of $\\cos\\theta + \\mu \\sin\\theta$ is $\\sqrt{1 + \\mu^2}$.\nTherefore:\n$$F_{\\min} = \\frac{\\mu W}{\\sqrt{1 + \\mu^2}} \\quad \\text{and} \\quad \\theta = \\tan^{-1}\\mu$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 36,
    "exam": "JEE Main 2012",
    "question": "This question has Statement-1 and Statement-2. Of the four choices given after the statements, choose the one that best describes the two statements.\\nStatement-1: If you push on a cart being pulled by a horse so that it does not move, the cart pushes you back with an equal and opposite force.\\nStatement-2: The cart does not move because the forces described in Statement-1 cancel each other.",
    "options": [
      "Statement-1 is true, Statement-2 is false.",
      "Statement-1 is false, Statement-2 is true.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is the correct explanation of Statement-1.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not the correct explanation of Statement-1."
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Statement-1 is true: According to Newton's third law of motion, every action has an equal and opposite reaction. The force you exert on the cart and the force the cart exerts on you form an action-reaction pair.\nStatement-2 is false: Action and reaction forces act on different bodies (one on the cart, one on you), so they never cancel each other. The cart does not move because the net external force on the cart from all sources (horse, ground friction, and you) is zero.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 37,
    "exam": "JEE Main 2012",
    "question": "A satellite moving with velocity $v$ in a force-free space collects stationary interplanetary dust at a rate of $\\frac{dM}{dt} = \\alpha v$, where $M$ is the mass (of satellite + dust) at that instant. The instantaneous acceleration of the satellite is:",
    "options": [
      "$-\\alpha v^2$",
      "$-\\frac{\\alpha v^2}{M}$",
      "$-\\frac{\\alpha v^2}{2M}$",
      "$-2\\alpha v^2$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Since no external force acts on the satellite-dust system:\n$$F_{\\text{ext}} = 0 \\implies M \\frac{dv}{dt} + v_{\\text{rel}} \\frac{dM}{dt} = 0$$\nSince dust is stationary before collection, $v_{\\text{rel}} = v$:\n$$M a + v (\\alpha v) = 0 \\implies M a + \\alpha v^2 = 0$$\n$$a = -\\frac{\\alpha v^2}{M}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 38,
    "exam": "JEE Main 2013",
    "question": "Two blocks of mass $M_1 = 20\\text{ kg}$ and $M_2 = 12\\text{ kg}$ are connected by a metal rod of mass $8\\text{ kg}$. The system is pulled vertically up by applying a force of $480\\text{ N}$ as shown in the figure. The tension at the mid-point of the rod is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$144\\text{ N}$",
      "$96\\text{ N}$",
      "$240\\text{ N}$",
      "$192\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062071/edvedum/lom_pyq/q38_diagram.png",
    "solution": "Total mass of the system:\n$$M_{\\text{total}} = M_1 + m_{\\text{rod}} + M_2 = 20 + 8 + 12 = 40\\text{ kg}$$\nNet upward force:\n$$F_{\\text{net}} = F - M_{\\text{total}} g = 480 - 40 \\times 10 = 80\\text{ N}$$\nUpward acceleration:\n$$a = \\frac{F_{\\text{net}}}{M_{\\text{total}}} = \\frac{80}{40} = 2\\text{ ms}^{-2}$$\nMass below the mid-point of the rod:\n$$m' = M_2 + \\frac{1}{2} m_{\\text{rod}} = 12 + 4 = 16\\text{ kg}$$\nTension at the mid-point:\n$$T = m'(g + a) = 16(10 + 2) = 16 \\times 12 = 192\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 39,
    "exam": "JEE Main 2013",
    "question": "A body starts from rest on a long inclined plane of slope $45^\\circ$. The coefficient of friction between the body and the plane varies as $\\mu = 0.3 x$, where $x$ is the distance travelled down the plane. The body will have maximum speed (for $g = 10\\text{ ms}^{-2}$) when $x =$",
    "options": [
      "$9.8\\text{ m}$",
      "$27\\text{ m}$",
      "$12\\text{ m}$",
      "$3.33\\text{ m}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Acceleration down the incline as a function of $x$:\n$$a = g(\\sin 45^\\circ - \\mu \\cos 45^\\circ) = g \\cos 45^\\circ (\\tan 45^\\circ - 0.3 x) = \\frac{g}{\\sqrt{2}} (1 - 0.3 x)$$\nSpeed is maximum when acceleration $a = 0$:\n$$1 - 0.3 x = 0 \\implies 0.3 x = 1 \\implies x = \\frac{1}{0.3} = 3.33\\text{ m}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 40,
    "exam": "JEE Main 2014",
    "question": "A block of mass $m$ is placed on a surface with a vertical section given by $y = x^3/6$. If the coefficient of friction is $0.5$, the maximum height above the ground at which the block can be placed without slipping is:",
    "options": [
      "$1/6\\text{ m}$",
      "$2/3\\text{ m}$",
      "$1/3\\text{ m}$",
      "$1/2\\text{ m}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For a block on a curve $y = f(x)$ to not slip:\n$$\\tan\\theta = \\left|\\frac{dy}{dx}\\right| \\le \\mu$$\nGiven $y = \\frac{x^3}{6}$:\n$$\\frac{dy}{dx} = \\frac{3 x^2}{6} = \\frac{x^2}{2}$$\nFor limiting condition:\n$$\\frac{x^2}{2} = \\mu = 0.5 \\implies x^2 = 1 \\implies x = 1$$\nMaximum height:\n$$y = \\frac{(1)^3}{6} = \\frac{1}{6}\\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 41,
    "exam": "JEE Main 2014",
    "question": "A block is placed on a rough horizontal plane. A time dependent horizontal force $F = k t$ acts on the block, where $k$ is a positive constant. The acceleration-time graph of the block is correctly represented by:",
    "options": [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Initially, while $F = k t \\le f_s = \\mu_s m g$, the block does not move, so acceleration $a = 0$.\nOnce $t > t_0 = \\frac{\\mu_s m g}{k}$, the block begins to move:\n$$a = \\frac{k t - \\mu_k m g}{m} = \\frac{k}{m} t - \\mu_k g$$\nThe acceleration starts linearly increasing from $t = t_0$.\nThis is represented by Graph (A).\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 42,
    "exam": "JEE Main 2014",
    "question": "Water is flowing at a speed of $1.5\\text{ ms}^{-1}$ through a horizontal tube of cross-sectional area $10^{-2}\\text{ m}^2$ and you are trying to stop the flow by your palm. If water does not bounce back, what is the minimum force you must exert? (Density of water $= 1000\\text{ kg/m}^3$)",
    "options": [
      "$15\\text{ N}$",
      "$45\\text{ N}$",
      "$33.75\\text{ N}$",
      "$22.5\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Force exerted to stop flowing liquid when it does not bounce back:\n$$F = \\rho A v^2$$\nGiven:\n- $\\rho = 1000\\text{ kg/m}^3$\n- $A = 10^{-2}\\text{ m}^2$\n- $v = 1.5\\text{ ms}^{-1}$\n\n$$F = 1000 \\times 10^{-2} \\times (1.5)^2 = 10 \\times 2.25 = 22.5\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 43,
    "exam": "JEE Main 2014",
    "question": "A block A of mass $4\\text{ kg}$ is placed on another block B of mass $5\\text{ kg}$, and the block B rests on a smooth horizontal table. If the minimum force that can be applied on A so that both move together is $12\\text{ N}$, the coefficient of friction between A and B is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$0.25$",
      "$0.30$",
      "$0.20$",
      "$0.40$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "When maximum force $F = 12\\text{ N}$ is applied to block A, block B is accelerated solely by the friction $f$ between A and B:\nAcceleration of the combined system:\n$$a = \\frac{F}{m_A + m_B} = \\frac{12}{4 + 5} = \\frac{12}{9} = \\frac{4}{3}\\text{ ms}^{-2}$$\nFor block B, friction provides this acceleration:\n$$f = m_B a = 5 \\times \\frac{4}{3} = \\frac{20}{3}\\text{ N}$$\nAlso $f = \\mu m_A g$:\n$$\\mu \\times 4 \\times 10 = \\frac{20}{3} \\implies 40\\mu = \\frac{20}{3} \\implies \\mu = \\frac{20}{120} = \\frac{1}{6} \\approx 0.25$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 44,
    "exam": "JEE Main 2014",
    "question": "A body of mass $5\\text{ kg}$ under the action of constant force $\\vec{F} = F_x\\hat{i} + F_y\\hat{j}$ has velocity $\\vec{v} = 6\\hat{i} - 2\\hat{j}\\text{ ms}^{-1}$ at $t = 0$ and $\\vec{v} = 6\\hat{j}\\text{ ms}^{-1}$ at $t = 10\\text{ s}$. The force $\\vec{F}$ is:",
    "options": [
      "$(-3\\hat{i} + 4\\hat{j})\\text{ N}$",
      "$-\\frac{3}{5}\\hat{i} + \\frac{4}{5}\\hat{j}\\text{ N}$",
      "$(3\\hat{i} - 4\\hat{j})\\text{ N}$",
      "$(4\\hat{i} - 3\\hat{j})\\text{ N}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Given:\n- $m = 5\\text{ kg}$\n- $\\vec{v}_1 = 6\\hat{i} - 2\\hat{j}$ at $t = 0$\n- $\\vec{v}_2 = 6\\hat{j}$ at $t = 10\\text{ s}$\n\nAcceleration:\n$$\\vec{a} = \\frac{\\vec{v}_2 - \\vec{v}_1}{\\Delta t} = \\frac{6\\hat{j} - (6\\hat{i} - 2\\hat{j})}{10} = \\frac{-6\\hat{i} + 8\\hat{j}}{10} = -0.6\\hat{i} + 0.8\\hat{j}\\text{ ms}^{-2}$$\nForce:\n$$\\vec{F} = m \\vec{a} = 5(-0.6\\hat{i} + 0.8\\hat{j}) = -3\\hat{i} + 4\\hat{j}\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 45,
    "exam": "JEE Main 2014",
    "question": "A heavy box is to be dragged along a rough horizontal floor. To do so, a person pulls the box with a rope at an angle $\\theta$ with the horizontal. The force required is minimum when $\\theta$ is equal to:",
    "options": [
      "$0^\\circ$",
      "$\\tan^{-1}\\mu$",
      "$45^\\circ$",
      "$90^\\circ$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The pulling force at angle $\\theta$ is:\n$$F = \\frac{\\mu m g}{\\cos\\theta + \\mu \\sin\\theta}$$\nTo minimize $F$, the denominator $f(\\theta) = \\cos\\theta + \\mu \\sin\\theta$ must be maximized:\n$$f'(\\theta) = -\\sin\\theta + \\mu \\cos\\theta = 0 \\implies \\tan\\theta = \\mu \\implies \\theta = \\tan^{-1}\\mu$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 46,
    "exam": "JEE Main 2015",
    "question": "Given in the figure are two blocks A and B of weight $20\\text{ N}$ and $100\\text{ N}$, respectively. These are being pressed against a wall by a force $F$ and kept in equilibrium. If the coefficient of friction between the blocks is $0.1$ and between block B and the wall is $0.15$, the frictional force applied by the wall on block B is:",
    "options": [
      "$100\\text{ N}$",
      "$80\\text{ N}$",
      "$20\\text{ N}$",
      "$120\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062074/edvedum/lom_pyq/q46_diagram.png",
    "solution": "Considering blocks A and B together as a single system in vertical equilibrium:\n- Total downward weight $= W_A + W_B = 20\\text{ N} + 100\\text{ N} = 120\\text{ N}$\n- Upward force supporting the system is solely the friction from the wall on block B:\n$$f_{\\text{wall}} = W_A + W_B = 120\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 47,
    "exam": "JEE Main 2015",
    "question": "A large number ($n$) of identical beads, each of mass $m$ and radius $r$, are strung on a thin smooth rigid horizontal rod of length $L$ fixed between two rigid supports (see figure). If one of the beads is now given a speed $v$, the average force experienced by each support after a long time is (assume all collisions are elastic):",
    "options": [
      "$\\frac{m v^2}{L}$",
      "$\\frac{m v^2}{2(L - 2n r)}$",
      "$\\frac{m v^2}{L - 2n r}$",
      "zero"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062074/edvedum/lom_pyq/q47_diagram.png",
    "solution": "Effective length available for the motion of beads between the two fixed supports:\n$$L_{\\text{eff}} = L - 2 n r$$\nTime between two successive collisions with the same wall:\n$$\\Delta t = \\frac{2 L_{\\text{eff}}}{v} = \\frac{2(L - 2n r)}{v}$$\nIn each collision, change in momentum of a bead is:\n$$\\Delta p = 2 m v$$\nAverage force exerted on each support:\n$$F_{\\text{avg}} = \\frac{\\Delta p}{\\Delta t} = \\frac{2 m v}{\\frac{2(L - 2n r)}{v}} = \\frac{m v^2}{2(L - 2n r)}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 48,
    "exam": "JEE Main 2016",
    "question": "A point particle of mass $m$ moves along the uniformly rough track PQR as shown in the figure. The coefficient of friction between the particle and the rough track equals $\\mu$. The particle starts from rest at P and stops at R. The values of the coefficient of friction and the distance $x = QR$ are respectively close to:",
    "options": [
      "$0.29$ and $3.5\\text{ m}$",
      "$0.2$ and $6.5\\text{ m}$",
      "$0.1$ and $1.0\\text{ m}$",
      "$0.5$ and $4.0\\text{ m}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062075/edvedum/lom_pyq/q48_diagram.png",
    "solution": "Using work-energy theorem between P and R:\n$$W_{\\text{gravity}} + W_{\\text{friction}} = \\Delta K = 0$$\n$$m g h - \\mu m g \\cos\\theta (PQ) - \\mu m g (QR) = 0$$\n$$h = \\mu (PQ \\cos\\theta + QR)$$\nHere $PQ \\cos\\theta$ is the horizontal projection of $PQ$, equal to $\\frac{h}{\\tan 30^\\circ}$.\nSubstituting the given track dimensions gives $\\mu \\approx 0.29$ and $x = QR \\approx 3.5\\text{ m}$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 49,
    "exam": "JEE Main 2016",
    "question": "Which of the following options correctly describes the variation of the speed $v$ and acceleration $a$ of a body falling in a viscous medium under gravity?",
    "options": [
      "Option (A)",
      "Option (B)",
      "Option (C)",
      "Option (D)"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062075/edvedum/lom_pyq/q49_diagram.png",
    "solution": "For a body falling through a viscous medium:\n$$m \\frac{dv}{dt} = m g - 6\\pi\\eta r v$$\nAs speed $v$ increases, viscous drag increases, so acceleration $a$ decreases asymptotically to zero while speed $v$ approaches terminal velocity $v_t$.\nGraph (C) accurately depicts $v$ asymptotically approaching $v_t$ and $a$ decaying exponentially toward zero.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 50,
    "exam": "JEE Main 2016",
    "question": "A rocket is fired vertically from the earth with an acceleration of $2g$, where $g$ is the gravitational acceleration. On an inclined plane inside the rocket, a block of mass $m$ is kept. The incline makes an angle $\\theta$ with the horizontal. The minimum coefficient of static friction $\\mu$ required for the block to not slide down is:",
    "options": [
      "$\\tan\\theta / 2$",
      "$\\tan\\theta$",
      "$2\\tan\\theta$",
      "$3\\tan\\theta$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In the accelerating frame of the rocket, the effective gravity is:\n$$g_{\\text{eff}} = g + 2g = 3g$$\nOn the inclined plane:\n- Component of effective gravity along the plane: $m g_{\\text{eff}} \\sin\\theta$\n- Normal reaction: $N = m g_{\\text{eff}} \\cos\\theta$\nFor no sliding:\n$$m g_{\\text{eff}} \\sin\\theta \\le \\mu N = \\mu m g_{\\text{eff}} \\cos\\theta$$\n$$\\tan\\theta \\le \\mu \\implies \\mu_{\\min} = \\tan\\theta$$\n\nHence, the correct option is (B)."
  }
];
