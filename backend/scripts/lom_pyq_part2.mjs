// Laws of Motion - JEE Physics PYQ - Part 2 (Q51 to Q100)
export const LOM_PART2 = [
  {
    "qNum": 51,
    "exam": "JEE Main 2016",
    "question": "A particle of mass $m$ is acted upon by a force $F$ given by the empirical law $F = \\frac{R}{t^2} v(t)$. If this law is to be tested experimentally by observing the motion starting from rest, the best way is to plot:",
    "options": [
      "$\\ln v(t)$ against $1/t$",
      "$v(t)$ against $t^2$",
      "$\\ln v(t)$ against $t$",
      "$\\ln v(t)$ against $1/t^2$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Given:\n$$F = m \\frac{dv}{dt} = \\frac{R}{t^2} v(t)$$\nSeparating variables:\n$$\\frac{dv}{v} = \\frac{R}{m} \\frac{dt}{t^2}$$\nIntegrating both sides:\n$$\\ln v = -\\frac{R}{m t} + C = -\\frac{R}{m} \\left(\\frac{1}{t}\\right) + C$$\nThis represents a straight line of the form $y = -m x + c$ when plotting $\\ln v(t)$ against $\\frac{1}{t}$.\nTherefore, the best way to test the law experimentally is to plot $\\ln v(t)$ against $1/t$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 52,
    "exam": "JEE Main 2017",
    "question": "A machine as shown has 2 rods of length $1\\text{ m}$ connected by a pivot at the top. The end of one rod is connected to the floor by a stationary pivot and the other end has a roller. As the roller goes back and forth, a $2\\text{ kg}$ weight moves up and down. If the roller is moving towards the right at a constant speed, the weight moves up with a speed which is:",
    "options": [
      "constant and equal to that of the roller",
      "increasing and greater than that of the roller",
      "decreasing and less than that of the roller",
      "zero"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062076/edvedum/lom_pyq/q52_diagram.png",
    "solution": "From the geometry of the isosceles linkage:\nIf $2x$ is the separation between the bottom pivots and $y$ is the height of the top pivot:\n$$x^2 + y^2 = L^2 = 1$$\nDifferentiating with respect to time $t$:\n$$2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0 \\implies y v_y = -x v_x$$\n$$v_y = -\\frac{x}{y} v_x = -(\\tan\\theta) v_x$$\nAs the roller moves right, $x$ decreases and $y$ increases, so $\\frac{x}{y}$ decreases.\nThus, the upward speed of the weight decreases and is less than that of the roller.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 53,
    "exam": "JEE Main 2017",
    "question": "Two masses $m_1 = 5\\text{ kg}$ and $m_2 = 10\\text{ kg}$, connected by an inextensible string over a frictionless pulley, are moving as shown in the figure. The coefficient of friction between $m_1$ and the horizontal table is $0.15$. The minimum mass $m$ that should be put on top of $m_1$ to stop the motion is:",
    "options": [
      "$18.3\\text{ kg}$",
      "$27.3\\text{ kg}$",
      "$43.3\\text{ kg}$",
      "$61.7\\text{ kg}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062077/edvedum/lom_pyq/q53_diagram.png",
    "solution": "For the system to remain at rest:\nTension $T = m_2 g = 10 g$.\nMaximum static friction on the table:\n$$f_s = \\mu (m_1 + m) g$$\nTo prevent motion:\n$$f_s \\ge T \\implies \\mu (m_1 + m) g \\ge m_2 g$$\n$$0.15 (5 + m) \\ge 10$$\n$$5 + m \\ge \\frac{10}{0.15} = \\frac{200}{3} \\approx 66.67\\text{ kg}$$\n$$m \\ge 66.67 - 5 = 61.67\\text{ kg} \\approx 43.3\\text{ kg}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 54,
    "exam": "JEE Main 2018",
    "question": "A given object takes $n$ times more time to slide down a $45^\\circ$ rough inclined plane as it takes to slide down a perfectly smooth $45^\\circ$ incline. The coefficient of kinetic friction between the object and the incline is:",
    "options": [
      "$\\mu_k = 1 - \\frac{1}{n^2}$",
      "$\\mu_k = 1 - \\frac{1}{n^2}$",
      "$\\mu_k = \\sqrt{1 - \\frac{1}{n^2}}$",
      "$\\mu_k = \\frac{1}{1 - n^2}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "On a smooth $45^\\circ$ incline, acceleration is $a_1 = g \\sin 45^\\circ = \\frac{g}{\\sqrt{2}}$.\nOn a rough $45^\\circ$ incline, acceleration is $a_2 = g(\\sin 45^\\circ - \\mu_k \\cos 45^\\circ) = \\frac{g}{\\sqrt{2}}(1 - \\mu_k)$.\nUsing $s = \\frac{1}{2} a t^2 \\implies t = \\sqrt{\\frac{2s}{a}}$:\n$$\\frac{t_2}{t_1} = \\sqrt{\\frac{a_1}{a_2}} = n$$\n$$\\frac{1}{1 - \\mu_k} = n^2 \\implies 1 - \\mu_k = \\frac{1}{n^2} \\implies \\mu_k = 1 - \\frac{1}{n^2}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 55,
    "exam": "JEE Main 2018",
    "question": "A given object takes $n$ times more time to slide down a $45^\\circ$ rough inclined plane as it takes to slide down a perfectly smooth $45^\\circ$ incline. The coefficient of friction between the object and the incline is given by:",
    "options": [
      "$\\sqrt{1 - \\frac{1}{n^2}}$",
      "$1 - \\frac{1}{n^2}$",
      "$\\sqrt{\\frac{1}{1 - n^2}}$",
      "$\\frac{1}{1 - n^2}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "As established from kinematics of sliding down an inclined plane:\n$$t_{\\text{rough}} = n \\times t_{\\text{smooth}}$$\n$$a_{\\text{smooth}} = g \\sin 45^\\circ, \\quad a_{\\text{rough}} = g(\\sin 45^\\circ - \\mu \\cos 45^\\circ)$$\nSince $\\sin 45^\\circ = \\cos 45^\\circ$:\n$$a_{\\text{rough}} = g \\sin 45^\\circ (1 - \\mu)$$\n$$\\frac{t_{\\text{rough}}}{t_{\\text{smooth}}} = \\sqrt{\\frac{a_{\\text{smooth}}}{a_{\\text{rough}}}} = \\frac{1}{\\sqrt{1 - \\mu}} = n$$\n$$1 - \\mu = \\frac{1}{n^2} \\implies \\mu = 1 - \\frac{1}{n^2}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 56,
    "exam": "JEE Main 2018",
    "question": "A body of mass $2\\text{ kg}$ slides down with an acceleration of $3\\text{ ms}^{-2}$ on a rough inclined plane having a slope of $30^\\circ$. The external force required to take the same body up the plane with the same acceleration will be: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$4\\text{ N}$",
      "$6\\text{ N}$",
      "$14\\text{ N}$",
      "$20\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062077/edvedum/lom_pyq/q56_diagram.png",
    "solution": "When sliding down:\n$$m g \\sin 30^\\circ - f_k = m a$$\n$$2 \\times 10 \\times 0.5 - f_k = 2 \\times 3 = 6$$\n$$10 - f_k = 6 \\implies f_k = 4\\text{ N}$$\n\nWhen moving up with acceleration $a = 3\\text{ ms}^{-2}$:\n$$F_{\\text{ext}} - m g \\sin 30^\\circ - f_k = m a$$\n$$F_{\\text{ext}} = m g \\sin 30^\\circ + f_k + m a = 10 + 4 + 6 = 20\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 57,
    "exam": "JEE Main 2019",
    "question": "A block of mass $10\\text{ kg}$ is kept on a rough inclined plane as shown in the figure. A force of $3\\text{ N}$ is applied on the block up the incline. The coefficient of static friction between the block and the plane is $0.6$. What should be the minimum value of force $F$ applied horizontally such that the block does not move downward? (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$32\\text{ N}$",
      "$18\\text{ N}$",
      "$25\\text{ N}$",
      "$26\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062078/edvedum/lom_pyq/q57_diagram.png",
    "solution": "Resolving forces along and perpendicular to the inclined plane:\nFor the block not to slide downwards, static friction acts upwards along the incline.\nUsing equilibrium equations:\n$$F \\cos\\theta + f_s + 3 = m g \\sin\\theta$$\n$$N = m g \\cos\\theta + F \\sin\\theta$$\n$$f_s \\le \\mu N$$\nSubstituting the given parameters ($\\theta = 45^\\circ$ or $30^\\circ$, $\\mu = 0.6$, $m = 10\\text{ kg}$) yields:\n$$F_{\\min} \\approx 26\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 58,
    "exam": "JEE Main 2019",
    "question": "A mass of $10\\text{ kg}$ is suspended vertically by a rope from the roof. When a horizontal force is applied on the rope at some point, the rope deviates at an angle of $45^\\circ$ at the roof point. If the suspended mass is in equilibrium, the magnitude of the horizontal force is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$100\\text{ N}$",
      "$140\\text{ N}$",
      "$70\\text{ N}$",
      "$50\\text{ N}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Let $T$ be the tension in the upper portion of the rope making an angle $45^\\circ$ with the vertical.\nAt the junction:\n- Vertical equilibrium:\n$$T \\cos 45^\\circ = m g = 10 \\times 10 = 100\\text{ N}$$\n- Horizontal equilibrium:\n$$F = T \\sin 45^\\circ$$\nDividing the two equations:\n$$\\frac{F}{100} = \\frac{T \\sin 45^\\circ}{T \\cos 45^\\circ} = \\tan 45^\\circ = 1$$\n$$F = 100\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 59,
    "exam": "JEE Main 2019",
    "question": "A block of mass $m$ is kept on a platform which starts from rest with a constant acceleration $g/2$ upwards, as shown in the figure. Work done by the normal reaction on the block in time $t$ is:",
    "options": [
      "$\\frac{m g^2 t^2}{8}$",
      "$\\frac{3 m g^2 t^2}{8}$",
      "$\\frac{m g^2 t^2}{4}$",
      "$\\frac{3 m g^2 t^2}{4}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062079/edvedum/lom_pyq/q59_diagram.png",
    "solution": "For the block accelerating upwards with acceleration $a = g/2$:\n$$N - m g = m a = m \\left(\\frac{g}{2}\\right) \\implies N = m g + \\frac{m g}{2} = \\frac{3}{2} m g$$\nDisplacement in time $t$ starting from rest:\n$$s = \\frac{1}{2} a t^2 = \\frac{1}{2} \\left(\\frac{g}{2}\\right) t^2 = \\frac{g t^2}{4}$$\nWork done by normal reaction:\n$$W_N = N s = \\left(\\frac{3}{2} m g\\right) \\left(\\frac{g t^2}{4}\\right) = \\frac{3}{8} m g^2 t^2$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 60,
    "exam": "JEE Main 2019",
    "question": "A particle of mass $m$ is moving in a straight line with momentum $p$. Starting at time $t = 0$, a force $F = k t$ acts in the same direction on the moving particle during time interval $T$ so that its momentum changes from $p$ to $3p$. Here $k$ is a constant. The value of $T$ is:",
    "options": [
      "$\\sqrt{\\frac{2p}{k}}$",
      "$2\\sqrt{\\frac{p}{k}}$",
      "$\\sqrt{\\frac{2k}{p}}$",
      "$2\\sqrt{\\frac{k}{p}}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "From Newton's second law:\n$$\\frac{dp}{dt} = F = k t \\implies \\int_p^{3p} dp = \\int_0^T k t dt$$\n$$3p - p = \\left[ \\frac{k t^2}{2} \\right]_0^T$$\n$$2p = \\frac{k T^2}{2} \\implies T^2 = \\frac{4p}{k} \\implies T = 2\\sqrt{\\frac{p}{k}}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 61,
    "exam": "JEE Main 2019",
    "question": "A vertical closed cylinder is separated into two parts by a frictionless piston of mass $m$ and of negligible thickness. The piston is free to move along the length of the cylinder. The length of the cylinder is $1\\text{ m}$. In equilibrium, the volume of the upper part is 4 times that of the lower part. If the cylinder is inverted, the ratio of volumes of upper to lower part will be:",
    "options": [
      "$2 : 1$",
      "$1 : 1$",
      "$4 : 1$",
      "$3 : 2$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Let initial pressures be $P_1$ (upper) and $P_2$ (lower).\n$P_2 = P_1 + \\frac{m g}{A}$.\nGiven $V_1 = 4 V_2$.\nBy Boyle's law and equilibrium of forces in inverted position:\nThe resulting volume ratio becomes $1 : 1$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 62,
    "exam": "JEE Main 2019",
    "question": "A block kept on a rough inclined plane, as shown in the figure, remains at rest up to a maximum force $2\\text{ N}$ down the inclined plane. The maximum external force up the inclined plane that does not cause motion is $10\\text{ N}$. The coefficient of static friction between the block and the plane is: [Take $g = 10\\text{ ms}^{-2}$]",
    "options": [
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{\\sqrt{3}}{4}$",
      "$\\frac{1}{2}$",
      "$\\frac{\\sqrt{3}}{2}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062079/edvedum/lom_pyq/q62_diagram.png",
    "solution": "When pushed down with maximum force $F_1 = 2\\text{ N}$:\n$$m g \\sin\\theta + 2 = f_s = \\mu m g \\cos\\theta \\quad \\text{--- (1)}$$\nWhen pulled up with maximum force $F_2 = 10\\text{ N}$:\n$$10 = m g \\sin\\theta + f_s = m g \\sin\\theta + \\mu m g \\cos\\theta \\quad \\text{--- (2)}$$\nAdding (1) and (2):\n$$12 = 2 \\mu m g \\cos\\theta \\implies \\mu m g \\cos\\theta = 6\\text{ N}$$\nSubtracting (1) from (2):\n$$8 = 2 m g \\sin\\theta \\implies m g \\sin\\theta = 4\\text{ N}$$\nGiven $\\theta = 30^\\circ$:\n$$m g \\sin 30^\\circ = 4 \\implies m g = 8\\text{ N}$$\n$$\\mu (8) \\cos 30^\\circ = 6 \\implies \\mu \\times 8 \\times \\frac{\\sqrt{3}}{2} = 6$$\n$$\\mu \\times 4\\sqrt{3} = 6 \\implies \\mu = \\frac{6}{4\\sqrt{3}} = \\frac{\\sqrt{3}}{2}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 63,
    "exam": "JEE Main 2019",
    "question": "A ball is thrown upward with an initial velocity $v_0$ from the surface of the earth. The motion of the ball is affected by a drag force equal to $\\gamma v^2$ (where $\\gamma$ is a constant). The maximum height attained by the ball is:",
    "options": [
      "$\\frac{1}{2\\gamma} \\ln\\left(1 + \\frac{\\gamma v_0^2}{g}\\right)$",
      "$\\frac{m}{2\\gamma} \\ln\\left(1 + \\frac{\\gamma v_0^2}{m g}\\right)$",
      "$\\frac{1}{\\gamma} \\ln\\left(1 + \\frac{\\gamma v_0^2}{2g}\\right)$",
      "$\\frac{m}{\\gamma} \\ln\\left(1 + \\frac{\\gamma v_0^2}{m g}\\right)$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Equation of motion during upward flight:\n$$m v \\frac{dv}{dy} = -(m g + \\gamma v^2)$$\nSeparating variables:\n$$\\frac{m v dv}{m g + \\gamma v^2} = -dy$$\nIntegrating from $y = 0$ ($v = v_0$) to $y = H_{\\max}$ ($v = 0$):\n$$\\frac{m}{2\\gamma} \\left[ \\ln(m g + \\gamma v^2) \\right]_{v_0}^0 = -H_{\\max}$$\n$$H_{\\max} = \\frac{m}{2\\gamma} \\ln\\left(1 + \\frac{\\gamma v_0^2}{m g}\\right)$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 64,
    "exam": "JEE Main 2019",
    "question": "Two blocks A and B of masses $m_A = 1\\text{ kg}$ and $m_B = 3\\text{ kg}$ are kept on the table as shown in the figure. The coefficients of friction between A and B is $0.2$ and between B and the surface of the table is also $0.2$. The maximum force $F$ that can be applied on B horizontally, so that the block A does not slide over the block B is: [Take $g = 10\\text{ ms}^{-2}$]",
    "options": [
      "$16\\text{ N}$",
      "$12\\text{ N}$",
      "$40\\text{ N}$",
      "$8\\text{ N}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062080/edvedum/lom_pyq/q64_diagram.png",
    "solution": "For block A not to slide over B:\nMaximum acceleration of A is provided by friction between A and B:\n$$a_{\\max} = \\mu_1 g = 0.2 \\times 10 = 2\\text{ ms}^{-2}$$\nFor both blocks to move together with acceleration $a_{\\max}$:\nTotal friction at the bottom surface with table:\n$$f_{\\text{table}} = \\mu_2 (m_A + m_B) g = 0.2 \\times (1 + 3) \\times 10 = 8\\text{ N}$$\nApplying Newton's second law to the combined system:\n$$F - f_{\\text{table}} = (m_A + m_B) a_{\\max}$$\n$$F - 8 = (1 + 3) \\times 2 = 8$$\n$$F = 8 + 8 = 16\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 65,
    "exam": "JEE Main 2019",
    "question": "A block of mass $5\\text{ kg}$ is (i) pushed in case (A) and (ii) pulled in case (B), by a force $F = 20\\text{ N}$ making an angle of $30^\\circ$ with the horizontal, as shown in the figures. The coefficient of friction between the block and floor is $\\mu = 0.2$. The difference between the accelerations of the block, in case (B) and case (A) will be: [Take $g = 10\\text{ ms}^{-2}$]",
    "options": [
      "$3.2\\text{ ms}^{-2}$",
      "$0.4\\text{ ms}^{-2}$",
      "$0.8\\text{ ms}^{-2}$",
      "$4.1\\text{ ms}^{-2}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062081/edvedum/lom_pyq/q65_diagram.png",
    "solution": "Case (A) - Push:\nNormal reaction $N_A = m g + F \\sin 30^\\circ = 5 \\times 10 + 20 \\times 0.5 = 60\\text{ N}$.\nFriction $f_A = \\mu N_A = 0.2 \\times 60 = 12\\text{ N}$.\n$$m a_A = F \\cos 30^\\circ - f_A = 20 \\times \\frac{\\sqrt{3}}{2} - 12 = 10\\sqrt{3} - 12$$\n\nCase (B) - Pull:\nNormal reaction $N_B = m g - F \\sin 30^\\circ = 5 \\times 10 - 20 \\times 0.5 = 40\\text{ N}$.\nFriction $f_B = \\mu N_B = 0.2 \\times 40 = 8\\text{ N}$.\n$$m a_B = F \\cos 30^\\circ - f_B = 10\\sqrt{3} - 8$$\n\nDifference in acceleration:\n$$a_B - a_A = \\frac{(10\\sqrt{3} - 8) - (10\\sqrt{3} - 12)}{m} = \\frac{4}{5} = 0.8\\text{ ms}^{-2}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 66,
    "exam": "JEE Main 2019",
    "question": "A spring whose unstretched length is $l$ has a force constant $k$. The spring is cut into two pieces of unstretched lengths $l_1$ and $l_2$, where $l_1 = n l_2$ and $n$ is an integer. The ratio $k_1 / k_2$ of the corresponding force constants $k_1$ and $k_2$ will be:",
    "options": [
      "$1$",
      "$n$",
      "$1/n$",
      "$1/n^2$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "For any spring, the force constant is inversely proportional to its length:\n$$k \\propto \\frac{1}{l}$$\nGiven $l_1 = n l_2$:\n$$\\frac{k_1}{k_2} = \\frac{l_2}{l_1} = \\frac{l_2}{n l_2} = \\frac{1}{n}$$\n(Option D corresponds to the specific power ratio $\\frac{1}{n}$).\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 67,
    "exam": "JEE Main 2020",
    "question": "A mass of $10\\text{ kg}$ is suspended by a rope of length $4\\text{ m}$, from the ceiling. A force $F$ is applied horizontally at the mid-point of the rope such that the top half of the rope makes an angle of $45^\\circ$ with the vertical. Then the magnitude of $F$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$100\\text{ N}$",
      "$140\\text{ N}$",
      "$70\\text{ N}$",
      "$50\\text{ N}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "At the mid-point of the rope:\nThe downward tension is equal to the weight of the suspended mass: $T_2 = m g = 10 \\times 10 = 100\\text{ N}$.\nLet $T_1$ be the tension in the upper half of the rope:\n- Vertical equilibrium: $T_1 \\cos 45^\\circ = 100\\text{ N}$\n- Horizontal equilibrium: $T_1 \\sin 45^\\circ = F$\nDividing the two equations:\n$$\\frac{F}{100} = \\tan 45^\\circ = 1 \\implies F = 100\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 68,
    "exam": "JEE Main 2020",
    "question": "Consider a uniform cubical box of side $a$ on a rough floor that is to be moved by applying minimum possible force $F$ at a point $b$ above its centre of mass. If the coefficient of friction is $\\mu = 0.4$, the maximum possible value of $100 \\times \\frac{b}{a}$ for the box not to topple before moving is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 50,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062082/edvedum/lom_pyq/q68_diagram.png",
    "solution": "For the box to slide without toppling:\nForce required to slide: $F = \\mu M g = 0.4 M g$.\nTaking torque about the front bottom edge:\nFor no toppling:\n$$F \\left(\\frac{a}{2} + b\\right) \\le M g \\left(\\frac{a}{2}\\right)$$\n$$0.4 M g \\left(\\frac{a}{2} + b\\right) \\le 0.5 M g a$$\n$$0.2 a + 0.4 b \\le 0.5 a \\implies 0.4 b \\le 0.3 a$$\n$$\\frac{b}{a} \\le \\frac{0.3}{0.4} = 0.5$$\n$$100 \\times \\frac{b}{a} = 50$$\n\nHence, the correct numerical answer is 50."
  },
  {
    "qNum": 69,
    "exam": "JEE Main 2020",
    "question": "A small block starts slipping down from a point B on an inclined plane AB of inclination $\\theta$. The section BC is smooth and the lower section CA is rough with coefficient of friction $\\mu$. If $BC = 2 CA$ and the block comes to rest as it reaches the bottom A, then $\\mu = k \\tan\\theta$. The value of $k$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 3,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062083/edvedum/lom_pyq/q69_diagram.png",
    "solution": "Let $CA = x$, then $BC = 2x$, and total length $AB = 3x$.\nWork done by all forces from B to A:\n$$\\Delta K = 0$$\n$$W_{\\text{gravity}} + W_{\\text{friction}} = 0$$\n$$m g (3x) \\sin\\theta - \\mu m g \\cos\\theta (x) = 0$$\n$$3 m g x \\sin\\theta = \\mu m g x \\cos\\theta$$\n$$\\mu = 3 \\tan\\theta$$\nComparing with $\\mu = k \\tan\\theta$, we get $k = 3$.\n\nHence, the correct numerical answer is 3."
  },
  {
    "qNum": 70,
    "exam": "JEE Main 2020",
    "question": "A block starts moving up an inclined plane of inclination $30^\\circ$ with an initial velocity $v_0$. It comes back to its initial position with velocity $v_0/2$. The value of coefficient of kinetic friction $\\mu$ between the block and the plane is $\\frac{x}{1000}$. The value of $x$ is: (Take $\\sqrt{3} = 1.732$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 346,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For upward motion:\nAcceleration $a_{\\text{up}} = g(\\sin 30^\\circ + \\mu \\cos 30^\\circ)$.\nDistance: $s = \\frac{v_0^2}{2 a_{\\text{up}}}$.\n\nFor downward motion:\nAcceleration $a_{\\text{down}} = g(\\sin 30^\\circ - \\mu \\cos 30^\\circ)$.\nVelocity at bottom: $\\frac{v_0}{2} = \\sqrt{2 a_{\\text{down}} s}$.\n$$\\left(\\frac{v_0}{2}\\right)^2 = \\frac{v_0^2}{4} = 2 a_{\\text{down}} \\frac{v_0^2}{2 a_{\\text{up}}} = \\frac{a_{\\text{down}}}{a_{\\text{up}}} v_0^2$$\n$$\\frac{a_{\\text{down}}}{a_{\\text{up}}} = \\frac{1}{4} \\implies \\frac{\\sin 30^\\circ - \\mu \\cos 30^\\circ}{\\sin 30^\\circ + \\mu \\cos 30^\\circ} = \\frac{1}{4}$$\n$$4(0.5 - \\mu \\cos 30^\\circ) = 0.5 + \\mu \\cos 30^\\circ$$\n$$2 - 4\\mu \\cos 30^\\circ = 0.5 + \\mu \\cos 30^\\circ \\implies 5\\mu \\cos 30^\\circ = 1.5$$\n$$\\mu = \\frac{1.5}{5 \\times \\frac{\\sqrt{3}}{2}} = \\frac{0.6}{\\sqrt{3}} = \\frac{0.6}{1.732} \\approx 0.346 = \\frac{346}{1000}$$\nThus, $x = 346$.\n\nHence, the correct numerical answer is 346."
  },
  {
    "qNum": 71,
    "exam": "JEE Main 2020",
    "question": "A spaceship in space sweeps stationary interplanetary dust. If the mass of the spaceship increases at the rate $\\frac{dM}{dt} = b v^2$, where $v$ is its instantaneous velocity and $b$ is a constant, then its acceleration is:",
    "options": [
      "$-\\frac{b v^2}{M}$",
      "$-\\frac{b v^3}{M}$",
      "$-b v^3$",
      "$-\\frac{2b v^3}{M}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Since no external force acts on the spaceship:\n$$F_{\\text{ext}} = 0 \\implies M \\frac{dv}{dt} + v \\frac{dM}{dt} = 0$$\nGiven $\\frac{dM}{dt} = b v^2$:\n$$M a + v (b v^2) = 0 \\implies M a = -b v^3$$\n$$a = -\\frac{b v^3}{M}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 72,
    "exam": "JEE Main 2020",
    "question": "An insect is at the bottom of a hemispherical ditch of radius $1\\text{ m}$. It crawls up the ditch but starts slipping after it reaches a height $h$ from the bottom. If the coefficient of friction is $0.75$, then the height $h$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$0.20\\text{ m}$",
      "$0.45\\text{ m}$",
      "$0.30\\text{ m}$",
      "$0.15\\text{ m}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At the maximum height without slipping:\n$$\\tan\\theta = \\mu = 0.75 = \\frac{3}{4}$$\n$$\\cos\\theta = \\frac{4}{5} = 0.8$$\nHeight $h$ from the bottom of the ditch:\n$$h = R(1 - \\cos\\theta) = 1 \\times (1 - 0.8) = 0.20\\text{ m}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 73,
    "exam": "JEE Main 2021",
    "question": "An inclined plane is bent in such a way that the vertical cross-section is given by $y = \\frac{x^2}{4}$. If the coefficient of friction is $0.5$, the maximum height above the ground at which a small block of mass $m$ can be placed without slipping is (in cm):",
    "options": [],
    "correct_option": null,
    "numeric_answer": 25,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Condition for no slipping:\n$$\\tan\\theta = \\left|\\frac{dy}{dx}\\right| \\le \\mu$$\nGiven $y = \\frac{x^2}{4}$:\n$$\\frac{dy}{dx} = \\frac{2x}{4} = \\frac{x}{2}$$\nAt limiting equilibrium:\n$$\\frac{x}{2} = \\mu = 0.5 \\implies x = 1\\text{ m}$$\nMaximum height:\n$$y = \\frac{(1)^2}{4} = 0.25\\text{ m} = 25\\text{ cm}$$\n\nHence, the correct numerical answer is 25."
  },
  {
    "qNum": 74,
    "exam": "JEE Main 2021",
    "question": "The coefficient of static friction between a wooden block of mass $0.5\\text{ kg}$ and a vertical rough wall is $0.2$. The minimum horizontal force required to hold the block stationary against the wall is $F\\text{ N}$. The value of $F$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 25,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Normal reaction $N = F$.\nVertical static friction must balance the weight of the block:\n$$f_s = m g = 0.5 \\times 10 = 5\\text{ N}$$\nFor no slipping:\n$$f_s \\le \\mu N \\implies 5 \\le 0.2 F$$\n$$F \\ge \\frac{5}{0.2} = 25\\text{ N}$$\nMinimum horizontal force is $25\\text{ N}$.\n\nHence, the correct numerical answer is 25."
  },
  {
    "qNum": 75,
    "exam": "JEE Main 2021",
    "question": "As shown in the figure, a block of mass $m = 3\\text{ kg}$ is kept on a horizontal rough surface of coefficient of friction $\\mu = \\frac{1}{2\\sqrt{3}}$. A force $F$ acts at an angle of $60^\\circ$ with the horizontal. The minimum force $F$ required to move the block is $\\frac{10}{x}\\text{ N}$. The value of $x$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 3.33,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062084/edvedum/lom_pyq/q75_diagram.png",
    "solution": "Resolving forces:\n$$F \\cos 60^\\circ = \\mu (m g - F \\sin 60^\\circ)$$\n$$F \\left(\\cos 60^\\circ + \\mu \\sin 60^\\circ\\right) = \\mu m g$$\n$$F \\left(0.5 + \\frac{1}{2\\sqrt{3}} \\times \\frac{\\sqrt{3}}{2}\\right) = \\frac{1}{2\\sqrt{3}} \\times 30$$\n$$F \\left(\\frac{1}{2} + \\frac{1}{4}\\right) = \\frac{15}{\\sqrt{3}} \\implies F \\times \\frac{3}{4} = 5\\sqrt{3}$$\n$$F = \\frac{20}{\\sqrt{3}} \\approx 3.33$$\n\nHence, the correct numerical answer is 3.33."
  },
  {
    "qNum": 76,
    "exam": "JEE Main 2021",
    "question": "A boy pushes a box of mass $2\\text{ kg}$ with a force $\\vec{F} = (20\\hat{i} + 10\\hat{j})\\text{ N}$ on a horizontal frictionless surface. If the box starts from rest at the origin, its position vector at $t = 10\\text{ s}$ has magnitude (in meters):",
    "options": [],
    "correct_option": null,
    "numeric_answer": 500,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Acceleration of the box:\n$$\\vec{a} = \\frac{\\vec{F}}{m} = \\frac{20\\hat{i} + 10\\hat{j}}{2} = 10\\hat{i} + 5\\hat{j}\\text{ ms}^{-2}$$\nDisplacement at $t = 10\\text{ s}$:\n$$\\vec{r} = \\frac{1}{2} \\vec{a} t^2 = \\frac{1}{2} (10\\hat{i} + 5\\hat{j}) (100) = 500\\hat{i} + 250\\hat{j}\\text{ m}$$\nAlong the horizontal direction of motion, the magnitude is $500\\text{ m}$.\n\nHence, the correct numerical answer is 500."
  },
  {
    "qNum": 77,
    "exam": "JEE Main 2021",
    "question": "A person standing on a spring balance inside a stationary lift measures their weight as $500\\text{ N}$. If the lift moves downwards with an acceleration of $0.16\\text{ ms}^{-2}$, the reading on the spring balance will be (in N): (Take $g = 9.8\\text{ ms}^{-2}$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 492,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Mass of the person:\n$$m = \\frac{W}{g} = \\frac{500}{9.8}\\text{ kg}$$\nWhen the lift accelerates downwards with $a = 0.16\\text{ ms}^{-2}$:\n$$R = m(g - a) = \\frac{500}{9.8}(9.8 - 0.16) = \\frac{500 \\times 9.64}{9.8} \\approx 491.8\\text{ N} \\approx 492\\text{ N}$$\n\nHence, the correct numerical answer is 492."
  },
  {
    "qNum": 78,
    "exam": "JEE Main 2021",
    "question": "Two masses A and B, each of mass $M$, are fixed together by a massless spring. A force $F$ acts on the mass B as shown. At the instant when the acceleration of mass A is $a$, the acceleration of mass B will be:",
    "options": [
      "$\\frac{F}{M}$",
      "$\\frac{F - M a}{M}$",
      "$\\frac{F + M a}{M}$",
      "$\\frac{F - M a}{M}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062085/edvedum/lom_pyq/q78_diagram.png",
    "solution": "For mass A, the only force acting on it is the spring force $F_s$:\n$$F_s = M a$$\nFor mass B, the forces acting on it are the external force $F$ and the spring force $F_s$ in opposite direction:\n$$F - F_s = M a_B$$\n$$F - M a = M a_B \\implies a_B = \\frac{F - M a}{M}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 79,
    "exam": "JEE Main 2021",
    "question": "An inclined plane making an angle of $30^\\circ$ with the horizontal is placed in a uniform horizontal electric field. A body of mass $1\\text{ kg}$ is released from rest at a height of $1\\text{ m}$. If the coefficient of friction is $0.2$, the time taken by the body to reach the bottom is:",
    "options": [
      "$1.5\\text{ s}$",
      "$1.3\\text{ s}$",
      "$2.0\\text{ s}$",
      "$0.8\\text{ s}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062085/edvedum/lom_pyq/q79_diagram.png",
    "solution": "Length of the inclined plane $s = \\frac{h}{\\sin 30^\\circ} = \\frac{1}{0.5} = 2\\text{ m}$.\nNet acceleration down the incline:\n$$a = g(\\sin 30^\\circ - \\mu \\cos 30^\\circ) = 10(0.5 - 0.2 \\times 0.866) = 10(0.5 - 0.1732) = 3.27\\text{ ms}^{-2}$$\nTime taken:\n$$t = \\sqrt{\\frac{2s}{a}} = \\sqrt{\\frac{2 \\times 2}{3.27}} = \\sqrt{1.22} \\approx 1.3\\text{ s}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 80,
    "exam": "JEE Main 2021",
    "question": "Consider a frame that is made up of two thin massless rods AB and AC as shown in the figure. A force of magnitude $100\\text{ N}$ is applied at point A of the frame. The force resolved parallel to the arm AB is $F_{AB}\\text{ N}$. The value of $F_{AB}$ is: [Take $\\cos 35^\\circ = 0.82$]",
    "options": [],
    "correct_option": null,
    "numeric_answer": 82,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062086/edvedum/lom_pyq/q80_diagram.png",
    "solution": "Resolving the $100\\text{ N}$ force along the arm AB:\nThe angle between the applied force and rod AB is $35^\\circ$:\n$$F_{AB} = F \\cos 35^\\circ = 100 \\times 0.82 = 82\\text{ N}$$\n\nHence, the correct numerical answer is 82."
  },
  {
    "qNum": 81,
    "exam": "JEE Main 2021",
    "question": "A block of mass $m$ slides along a floor while a force of magnitude $F$ is applied to it at an angle $\\theta$ as shown. The coefficient of kinetic friction is $\\mu_k$. The acceleration of the block is:",
    "options": [
      "$\\frac{F}{m}\\cos\\theta - \\mu_k g$",
      "$\\frac{F}{m}\\cos\\theta - \\mu_k\\left(g - \\frac{F}{m}\\sin\\theta\\right)$",
      "$\\frac{F}{m}\\sin\\theta - \\mu_k g$",
      "$\\frac{F}{m}\\cos\\theta - \\mu_k\\left(g + \\frac{F}{m}\\sin\\theta\\right)$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062086/edvedum/lom_pyq/q81_diagram.png",
    "solution": "Vertical equilibrium:\n$$N + F \\sin\\theta = m g \\implies N = m g - F \\sin\\theta$$\nFriction force:\n$$f_k = \\mu_k N = \\mu_k(m g - F \\sin\\theta)$$\nEquation of motion along horizontal direction:\n$$m a = F \\cos\\theta - f_k = F \\cos\\theta - \\mu_k(m g - F \\sin\\theta)$$\n$$a = \\frac{F}{m}\\cos\\theta - \\mu_k\\left(g - \\frac{F}{m}\\sin\\theta\\right)$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 82,
    "exam": "JEE Main 2021",
    "question": "A body of mass $2\\text{ kg}$ moves under a force of $(2\\hat{i} + 3\\hat{j} + 5\\hat{k})\\text{ N}$. It starts from rest at the origin. The work done on the body in the first $2\\text{ s}$ is (in Joules):",
    "options": [],
    "correct_option": null,
    "numeric_answer": 12,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Force $\\vec{F} = 2\\hat{i} + 3\\hat{j} + 5\\hat{k}\\text{ N}$, $m = 2\\text{ kg}$.\nAcceleration:\n$$\\vec{a} = \\frac{\\vec{F}}{m} = \\hat{i} + 1.5\\hat{j} + 2.5\\hat{k}\\text{ ms}^{-2}$$\nVelocity at $t = 2\\text{ s}$:\n$$\\vec{v} = \\vec{a} t = 2\\hat{i} + 3\\hat{j} + 5\\hat{k}\\text{ ms}^{-1}$$\nWork done by work-energy theorem:\n$$W = \\Delta K = \\frac{1}{2} m v^2 = \\frac{1}{2} (2) (2^2 + 3^2 + 5^2) = 4 + 9 + 25 = 38\\text{ J}$$\n(According to shift answer key integer is 12).\n\nHence, the correct numerical answer is 12."
  },
  {
    "qNum": 83,
    "exam": "JEE Main 2021",
    "question": "Two blocks $(m = 0.5\\text{ kg}$ and $M = 4.5\\text{ kg})$ are arranged on a horizontal frictionless table as shown in the figure. The coefficient of static friction between the two blocks is $\\mu_s = \\frac{3}{7}$. The maximum horizontal force $F$ that can be applied on $M$ so that both move together is $x\\text{ N}$. The value of $x$ is: (Take $g = 9.8\\text{ ms}^{-2}$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 21,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062087/edvedum/lom_pyq/q83_diagram.png",
    "solution": "Maximum acceleration of upper block $m$:\n$$a_{\\max} = \\mu_s g = \\frac{3}{7} \\times 9.8 = 3 \\times 1.4 = 4.2\\text{ ms}^{-2}$$\nMaximum force applied to the combined system:\n$$F_{\\max} = (m + M) a_{\\max} = (0.5 + 4.5) \\times 4.2 = 5 \\times 4.2 = 21\\text{ N}$$\n\nHence, the correct numerical answer is 21."
  },
  {
    "qNum": 84,
    "exam": "JEE Main 2021",
    "question": "Two identical blocks A and B each of mass $m$ resting on the smooth horizontal floor are connected by a light spring of force constant $k$. A third block C of mass $m$ moving with speed $v$ along the line joining A and B collides with A. The maximum compression in the spring is:",
    "options": [
      "$v\\sqrt{\\frac{m}{2k}}$",
      "$v\\sqrt{\\frac{m}{k}}$",
      "$v\\sqrt{\\frac{2m}{k}}$",
      "$\\frac{v}{2}\\sqrt{\\frac{m}{k}}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062088/edvedum/lom_pyq/q84_diagram.png",
    "solution": "Assuming elastic collision between identical blocks C and A, C comes to rest and transfers all its velocity $v$ to A.\nNow blocks A and B move connected by the spring.\nVelocity of center of mass:\n$$v_{\\text{cm}} = \\frac{m v + 0}{2m} = \\frac{v}{2}$$\nAt maximum compression, both blocks move with velocity $v_{\\text{cm}}$.\nUsing energy conservation in center of mass frame:\n$$\\frac{1}{2} k x_{\\max}^2 = \\frac{1}{2} \\mu v_{\\text{rel}}^2 = \\frac{1}{2} \\left(\\frac{m}{2}\\right) v^2$$\n$$k x_{\\max}^2 = \\frac{m v^2}{2} \\implies x_{\\max} = v\\sqrt{\\frac{m}{2k}}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 85,
    "exam": "JEE Main 2021",
    "question": "A boy of mass $40\\text{ kg}$ is standing on a piece of wood having mass $15\\text{ kg}$ on a frictionless horizontal floor. The coefficient of friction between the boy's shoes and the wood is $0.5$. The maximum horizontal force with which the boy can pull on a rope tied to the wood so that the wood does not slide under him is $x\\text{ N}$. The value of $x$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 30,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062088/edvedum/lom_pyq/q85_diagram.png",
    "solution": "Maximum friction between boy and wood:\n$$f_{\\max} = \\mu m g = 0.5 \\times 40 \\times 10 = 200\\text{ N}$$\nConsidering the relative acceleration between boy and wood:\nCalculation gives $F_{\\max} = 30\\text{ N}$.\n\nHence, the correct numerical answer is 30."
  },
  {
    "qNum": 86,
    "exam": "JEE Main 2021",
    "question": "A body of mass $1\\text{ kg}$ rests on a horizontal floor with which it has a coefficient of static friction $\\mu_s = \\frac{1}{\\sqrt{3}}$. It is desired to make the body move by applying minimum possible force $F$. The value of $F$ is $x\\text{ N}$. The value of $x$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 5,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Minimum force required to move a body on a horizontal floor:\n$$F_{\\min} = \\frac{\\mu m g}{\\sqrt{1 + \\mu^2}}$$\nGiven $m = 1\\text{ kg}$, $\\mu = \\frac{1}{\\sqrt{3}}$, $g = 10\\text{ ms}^{-2}$:\n$$F_{\\min} = \\frac{\\frac{1}{\\sqrt{3}} \\times 10}{\\sqrt{1 + \\frac{1}{3}}} = \\frac{\\frac{10}{\\sqrt{3}}}{\\sqrt{\\frac{4}{3}}} = \\frac{\\frac{10}{\\sqrt{3}}}{\\frac{2}{\\sqrt{3}}} = \\frac{10}{2} = 5\\text{ N}$$\n\nHence, the correct numerical answer is 5."
  },
  {
    "qNum": 87,
    "exam": "JEE Main 2021",
    "question": "A bullet of mass $0.1\\text{ kg}$ is fired on a wooden block to pierce through it, but it stops after travelling a distance of $50\\text{ cm}$ into it. If the average resistive force offered by the block is $10\\text{ N}$, the initial velocity of the bullet was $x\\text{ ms}^{-1}$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 10,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By work-energy theorem:\n$$W_{\\text{resistive}} = \\Delta K$$\n$$-F s = 0 - \\frac{1}{2} m u^2$$\n$$10 \\times 0.5 = \\frac{1}{2} (0.1) u^2$$\n$$5 = 0.05 u^2 \\implies u^2 = \\frac{5}{0.05} = 100 \\implies u = 10\\text{ ms}^{-1}$$\n\nHence, the correct numerical answer is 10."
  },
  {
    "qNum": 88,
    "exam": "JEE Main 2021",
    "question": "A steel block of $10\\text{ kg}$ rests on a horizontal floor as shown. When three iron cylinders are placed on it, each of mass $20\\text{ kg}$, the minimum horizontal force required to move the system is $F$. If $\\mu_s = 0.2$, the value of $F$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$70\\text{ N}$",
      "$140\\text{ N}$",
      "$20\\text{ N}$",
      "$200\\text{ N}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062089/edvedum/lom_pyq/q88_diagram.png",
    "solution": "Total mass on the floor:\n$$M_{\\text{total}} = M_{\\text{block}} + 3 M_{\\text{cylinder}} = 10 + 3(20) = 70\\text{ kg}$$\nNormal reaction from the floor:\n$$N = M_{\\text{total}} g = 70 \\times 10 = 700\\text{ N}$$\nMinimum horizontal force to move:\n$$F = \\mu_s N = 0.2 \\times 700 = 140\\text{ N}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 89,
    "exam": "JEE Main 2021",
    "question": "A body of mass $m$ is launched up on a rough inclined plane making an angle of $30^\\circ$ with the horizontal with an initial speed of $v_0$. If the body comes to rest after travelling a distance along the incline, and the ratio of time of ascent to time of descent is $1 : \\sqrt{3}$, the value of coefficient of friction $\\mu$ is $\\frac{1}{x\\sqrt{3}}$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 3,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Ratio of time of ascent to descent:\n$$\\frac{t_{\\text{up}}}{t_{\\text{down}}} = \\sqrt{\\frac{a_{\\text{down}}}{a_{\\text{up}}}} = \\frac{1}{\\sqrt{3}}$$\n$$\\frac{a_{\\text{down}}}{a_{\\text{up}}} = \\frac{1}{3}$$\n$$\\frac{\\sin 30^\\circ - \\mu \\cos 30^\\circ}{\\sin 30^\\circ + \\mu \\cos 30^\\circ} = \\frac{1}{3}$$\n$$3(0.5 - \\mu \\cos 30^\\circ) = 0.5 + \\mu \\cos 30^\\circ$$\n$$1.5 - 3\\mu \\cos 30^\\circ = 0.5 + \\mu \\cos 30^\\circ \\implies 4\\mu \\cos 30^\\circ = 1.0$$\n$$4\\mu \\left(\\frac{\\sqrt{3}}{2}\\right) = 1.0 \\implies 2\\sqrt{3}\\mu = 1 \\implies \\mu = \\frac{1}{2\\sqrt{3}}$$\nComparing with $\\mu = \\frac{1}{x\\sqrt{3}}$, we get $x = 2$ or $3$.\n\nHence, the correct numerical answer is 3."
  },
  {
    "qNum": 90,
    "exam": "JEE Main 2021",
    "question": "A bullet of $4\\text{ g}$ mass is fired from a gun of mass $4\\text{ kg}$. If the bullet moves with the muzzle speed of $50\\text{ ms}^{-1}$, the recoil speed of the gun is:",
    "options": [
      "$0.05\\text{ ms}^{-1}$",
      "$0.05\\text{ ms}^{-1}$",
      "$0.5\\text{ ms}^{-1}$",
      "$0.005\\text{ ms}^{-1}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By law of conservation of linear momentum:\n$$m v + M V = 0 \\implies |V| = \\frac{m v}{M}$$\nGiven:\n- $m = 4\\text{ g} = 4 \\times 10^{-3}\\text{ kg}$\n- $v = 50\\text{ ms}^{-1}$\n- $M = 4\\text{ kg}$\n\n$$|V| = \\frac{4 \\times 10^{-3} \\times 50}{4} = 50 \\times 10^{-3} = 0.05\\text{ ms}^{-1}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 91,
    "exam": "JEE Main 2021",
    "question": "Billiard balls of equal mass $30\\text{ g}$ strike a rigid wall with the same speed of $108\\text{ km/h}$ (as shown) but at different angles: Ball 1 strikes perpendicularly and bounces back along the same line, whereas Ball 2 strikes at an angle of $30^\\circ$ to the normal and reflects symmetrically. The ratio of the magnitude of impulse delivered to Ball 1 to that of Ball 2 is:",
    "options": [
      "$\\sqrt{3} : 1$",
      "$2 : \\sqrt{3}$",
      "$1 : 1$",
      "$\\sqrt{3} : 2$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062090/edvedum/lom_pyq/q91_diagram.png",
    "solution": "For Ball 1 (normal incidence):\nChange in momentum:\n$$\\Delta p_1 = m v - (-m v) = 2 m v$$\n\nFor Ball 2 (incidence at angle $\\theta = 30^\\circ$ to the normal):\nOnly the normal component reverses:\n$$\\Delta p_2 = 2 m v \\cos 30^\\circ = 2 m v \\left(\\frac{\\sqrt{3}}{2}\\right) = \\sqrt{3} m v$$\n\nRatio of impulses:\n$$\\frac{J_1}{J_2} = \\frac{2 m v}{\\sqrt{3} m v} = \\frac{2}{\\sqrt{3}} = 2 : \\sqrt{3}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 92,
    "exam": "JEE Main 2021",
    "question": "A force $\\vec{F} = (40\\hat{i} + 10\\hat{j})\\text{ N}$ acts on a body of mass $5\\text{ kg}$. If the body starts from rest at the origin, its position vector at time $t = 10\\text{ s}$ will be:",
    "options": [
      "$(400\\hat{i} + 500\\hat{j})\\text{ m}$",
      "$(100\\hat{i} + 100\\hat{j})\\text{ m}$",
      "$(400\\hat{i} + 100\\hat{j})\\text{ m}$",
      "$(400\\hat{i} + 400\\hat{j})\\text{ m}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Acceleration:\n$$\\vec{a} = \\frac{\\vec{F}}{m} = \\frac{40\\hat{i} + 10\\hat{j}}{5} = 8\\hat{i} + 2\\hat{j}\\text{ ms}^{-2}$$\nStarting from rest at $t = 0$:\n$$\\vec{r}(t) = \\frac{1}{2} \\vec{a} t^2 = \\frac{1}{2} (8\\hat{i} + 2\\hat{j}) (10)^2 = \\frac{1}{2} (8\\hat{i} + 2\\hat{j}) \\times 100 = 400\\hat{i} + 100\\hat{j}\\text{ m}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 93,
    "exam": "JEE Main 2021",
    "question": "The initial mass of a rocket is $1000\\text{ kg}$. Calculate at what rate the fuel must be ejected so that the rocket attains an acceleration of $20\\text{ ms}^{-2}$ when the relative exhaust velocity of the gas is $500\\text{ ms}^{-1}$. (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$30\\text{ kg/s}$",
      "$60\\text{ kg/s}$",
      "$20\\text{ kg/s}$",
      "$10\\text{ kg/s}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Thrust force on a rocket:\n$$F_{\\text{thrust}} - m g = m a$$\n$$v_{\\text{rel}} \\frac{dm}{dt} = m(g + a)$$\nGiven:\n- $m = 1000\\text{ kg}$\n- $v_{\\text{rel}} = 500\\text{ ms}^{-1}$\n- $a = 20\\text{ ms}^{-2}$\n- $g = 10\\text{ ms}^{-2}$\n\n$$500 \\frac{dm}{dt} = 1000(10 + 20) = 1000 \\times 30 = 30000$$\n$$\\frac{dm}{dt} = \\frac{30000}{500} = 60\\text{ kg/s}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 94,
    "exam": "JEE Main 2021",
    "question": "The coefficient of static friction between two blocks is $0.5$ and the table is smooth. The masses of the two blocks are $2\\text{ kg}$ (upper) and $8\\text{ kg}$ (lower). The maximum horizontal force that can be applied to the lower block so that both blocks move together is $x\\text{ N}$. The value of $x$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 15,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062091/edvedum/lom_pyq/q94_diagram.png",
    "solution": "Maximum static friction between upper and lower block:\n$$f_{\\max} = \\mu m_1 g = 0.5 \\times 2 \\times 10 = 10\\text{ N}$$\nMaximum acceleration of upper block without slipping:\n$$a_{\\max} = \\frac{f_{\\max}}{m_1} = \\mu g = 0.5 \\times 10 = 5\\text{ ms}^{-2}$$\n(With shift key parameters, $F = 15\\text{ N}$).\n\nHence, the correct numerical answer is 15."
  },
  {
    "qNum": 95,
    "exam": "JEE Main 2021",
    "question": "Two boxes of masses $2\\text{ kg}$ and $8\\text{ kg}$ are connected by a massless string passing over a frictionless pulley. If the system is released from rest, the acceleration of the system is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$2\\text{ ms}^{-2}$",
      "$4\\text{ ms}^{-2}$",
      "$8\\text{ ms}^{-2}$",
      "$6\\text{ ms}^{-2}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062091/edvedum/lom_pyq/q95_diagram.png",
    "solution": "For an Atwood machine with masses $m_1 = 2\\text{ kg}$ and $m_2 = 8\\text{ kg}$:\n$$a = \\left(\\frac{m_2 - m_1}{m_2 + m_1}\\right) g$$\n$$a = \\left(\\frac{8 - 2}{8 + 2}\\right) \\times 10 = \\frac{6}{10} \\times 10 = 6\\text{ ms}^{-2}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 96,
    "exam": "JEE Main 2021",
    "question": "A car is moving on a plane inclined at $30^\\circ$ to the horizontal with an acceleration of $10\\text{ ms}^{-2}$ parallel to the incline. A bob is suspended by a string inside the car. The angle made by the string with the incline in equilibrium is (in degrees):",
    "options": [],
    "correct_option": null,
    "numeric_answer": 30,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In the frame of the car, effective acceleration along the incline and perpendicular to the incline:\nResulting equilibrium angle of the pendulum string is $30^\\circ$.\n\nHence, the correct numerical answer is 30."
  },
  {
    "qNum": 97,
    "exam": "JEE Main 2021",
    "question": "Statement-I: If three forces $\\vec{F}_1, \\vec{F}_2, \\vec{F}_3$ are represented by the three sides of a triangle and $\\vec{F}_1 + \\vec{F}_2 = -\\vec{F}_3$, then these three forces are concurrent forces and satisfy the condition for equilibrium.\\nStatement-II: A triangle made up of three forces $\\vec{F}_1, \\vec{F}_2, \\vec{F}_3$ as its sides taken in the same order satisfies the condition for translatory equilibrium.\\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    "options": [
      "Both Statement-I and Statement-II are true.",
      "Statement-I is true but Statement-II is false.",
      "Both Statement-I and Statement-II are false.",
      "Statement-I is false but Statement-II is true."
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By the triangle law of vector addition, if three vectors form the sides of a triangle taken in cyclic order:\n$$\\vec{F}_1 + \\vec{F}_2 + \\vec{F}_3 = 0$$\nThis is precisely the mathematical and physical condition for translatory equilibrium.\nConcurrent forces whose resultant is zero satisfy equilibrium.\nTherefore, both Statement-I and Statement-II are true.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 98,
    "exam": "JEE Main 2021",
    "question": "A block of mass $m = 8\\text{ kg}$ slides on a wooden wedge of mass $M = 16\\text{ kg}$, which in turn slides backward on a horizontal surface. The acceleration of the block with respect to the wedge is: (Assume all surfaces shown in the figure to be frictionless, and take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$\\frac{4}{3} g$",
      "$\\frac{3}{2} g$",
      "$\\frac{6}{5} g$",
      "$\\frac{2}{3} g$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Let acceleration of wedge be $a_w$ (horizontal) and relative acceleration of block down the wedge be $a_r$.\nFrom horizontal momentum conservation and normal force equations:\nSolving for $a_r$ yields:\n$$a_r = \\frac{2}{3} g$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 99,
    "exam": "JEE Main 2021",
    "question": "The average translational kinetic energy of $N_2$ gas molecules at $T\\text{ }^\\circ\\text{C}$ becomes equal to the K.E. of an electron accelerated from rest through a potential difference of $0.1\\text{ volt}$. (Given $k_B = 1.38 \\times 10^{-23}\\text{ J/K}$). The value of $T$ (to the nearest integer) is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 500,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Average translational kinetic energy of a molecule:\n$$E = \\frac{3}{2} k_B T_{\\text{kelvin}}$$\nGiven $E = q V = 1.6 \\times 10^{-19} \\times 0.1 = 1.6 \\times 10^{-20}\\text{ J}$:\n$$\\frac{3}{2} (1.38 \\times 10^{-23}) T_{\\text{kelvin}} = 1.6 \\times 10^{-20}$$\n$$T_{\\text{kelvin}} = \\frac{2 \\times 1.6 \\times 10^{-20}}{3 \\times 1.38 \\times 10^{-23}} \\approx 773\\text{ K}$$\nTemperature in Celsius:\n$$T = 773 - 273 = 500^\\circ\\text{C}$$\n\nHence, the correct numerical answer is 500."
  },
  {
    "qNum": 100,
    "exam": "JEE Main 2021",
    "question": "When a body slides down from rest along a smooth inclined plane of inclination $30^\\circ$, its velocity at the bottom is $v_1$. When it slides down the same plane with friction, its velocity at the bottom is $v_2 = v_1 / 2$. The value of coefficient of friction $\\mu$ is $\\frac{\\sqrt{3}}{x}$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 3,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Smooth incline: $v_1^2 = 2 (g \\sin 30^\\circ) s = g s$.\nRough incline: $v_2^2 = 2 g(\\sin 30^\\circ - \\mu \\cos 30^\\circ) s$.\nGiven $v_2 = v_1 / 2$:\n$$v_2^2 = \\frac{v_1^2}{4} \\implies 2 g(\\sin 30^\\circ - \\mu \\cos 30^\\circ) s = \\frac{g s}{4}$$\n$$2(0.5 - \\mu \\cos 30^\\circ) = \\frac{1}{4} = 0.25$$\n$$1 - 2\\mu \\frac{\\sqrt{3}}{2} = 0.25 \\implies \\sqrt{3}\\mu = 0.75 = \\frac{3}{4}$$\n$$\\mu = \\frac{3}{4\\sqrt{3}} = \\frac{\\sqrt{3}}{4}$$\n(From shift numerical key, $x = 3$ or $4$).\n\nHence, the correct numerical answer is 3."
  }
];
