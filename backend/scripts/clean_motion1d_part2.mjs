// Motion in One Dimension - JEE Physics PYQ - Clean Part 2 (Q41 to Q80)
export const MOTION1D_PART2 = [
  {
    "qNum": 41,
    "exam": "JEE Main 2019 (09 Apr, Shift 1)",
    "question": "A ball is thrown vertically up (taken as $+z$-axis) from the ground. The correct momentum-height ($p$-$h$) diagram is:",
    "options": [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001630/edvedum/motion1d_pyq/q41_diagram.png",
    "solution": "If the ball was thrown with initial velocity $u$, then its velocity at height $h$ is:\n$$v = \\sqrt{u^2 - 2gh}$$\nIts linear momentum is:\n$$p = m v = m\\sqrt{u^2 - 2gh} \\implies p^2 = m^2 u^2 - 2m^2 gh$$\nThe graph between $p$ and $h$ is a parabola opening towards the left.\nDuring upward motion, velocity is positive and decreases with height, becoming zero at $h = h_{\\text{max}}$.\nDuring downward motion, velocity increases in magnitude in the negative direction, so momentum becomes negative.\nThis corresponds to Graph (C).\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 42,
    "exam": "JEE Main (1 for a wrong answer] 2019 (09 Apr, Shift 2))",
    "question": "The position vector of a particle changes with time according to the relation $\\vec{r}(t) = 15 t^2\\hat{i} + (4 - 20 t^2)\\hat{j}$. What is the magnitude of the acceleration at $t = 1$?",
    "options": [
      "$40$",
      "$25$",
      "$100$",
      "$50$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Velocity vector:\n$$\\vec{v}(t) = \\frac{d\\vec{r}}{dt} = 30t\\hat{i} - 40t\\hat{j}$$\nAcceleration vector:\n$$\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = 30\\hat{i} - 40\\hat{j}$$\nMagnitude of acceleration:\n$$|\\vec{a}| = \\sqrt{30^2 + (-40)^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50\\text{ ms}^{-2}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 43,
    "exam": "JEE Main 2019 (09 Apr, Shift 2)",
    "question": "The position of a particle as a function of time $t$ is given by $x(t) = a t + b t^2 - c t^3$, where $a, b$ and $c$ are constants. When the particle attains zero acceleration, its velocity will be:",
    "options": [
      "$a + \\frac{b^2}{3c}$",
      "$a + \\frac{b^2}{2c}$",
      "$a + \\frac{b^2}{c}$",
      "$a + \\frac{b^2}{4c}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Given $x(t) = at + bt^2 - ct^3$.\nVelocity:\n$$v(t) = \\frac{dx}{dt} = a + 2bt - 3ct^2$$\nAcceleration:\n$$a(t) = \\frac{dv}{dt} = 2b - 6ct$$\nSetting acceleration to zero:\n$$2b - 6ct = 0 \\implies t = \\frac{b}{3c}$$\nVelocity at this instant:\n$$v = a + 2b\\left(\\frac{b}{3c}\\right) - 3c\\left(\\frac{b}{3c}\\right)^2 = a + \\frac{2b^2}{3c} - \\frac{b^2}{3c} = a + \\frac{b^2}{3c}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 44,
    "exam": "JEE Main 2019 (10 Apr, Shift 2)",
    "question": "A bullet of mass $20\\text{ g}$ has an initial speed of $1\\text{ ms}^{-1}$, just before it starts penetrating a mud wall of thickness $20\\text{ cm}$. If the wall offers a mean resistance of $2.5 \\times 10^{-2}\\text{ N}$, the speed of the bullet after emerging from the other side of the wall is close to:",
    "options": [
      "$0.7\\text{ ms}^{-1}$",
      "$0.3\\text{ ms}^{-1}$",
      "$0.1\\text{ ms}^{-1}$",
      "$0.4\\text{ ms}^{-1}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Mass $m = 20\\text{ g} = 0.02\\text{ kg}$, initial speed $u = 1\\text{ ms}^{-1}$, thickness $s = 20\\text{ cm} = 0.2\\text{ m}$.\nRetarding acceleration:\n$$a = \\frac{F}{m} = \\frac{2.5 \\times 10^{-2}}{0.02} = 1.25\\text{ ms}^{-2}$$\nUsing $v^2 = u^2 - 2as$:\n$$v^2 = 1^2 - 2(1.25)(0.2) = 1 - 0.5 = 0.5$$\n$$v = \\sqrt{0.5} \\approx 0.707\\text{ ms}^{-1} \\approx 0.7\\text{ ms}^{-1}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 45,
    "exam": "JEE Main 2019 (12 Apr, Shift 2)",
    "question": "5 particle is moving with speed v = by/Z along positive 2 — axis. Calculate the speed of the particle at\ntime t = 7 (assume that the particle is at originatt = 0)",
    "options": [
      "42,",
      "p2,\nV2",
      "p21",
      "p2,\n2b 1"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "v=byz..0\ndx\nSei= by/z\ndz\nre = bdt\nx dz t\notros sot\n2yz = bt... (2)\nFrom equation (1) and (2)\nbt\no=p{%)\nsatt=1\noP\nhes?\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 46,
    "exam": "JEE Main 2020 (08 Jan, Shift 1)",
    "question": "5 particle is moving along the z -axis with its coordinate with time ¢ given by z (t) = 10 + 8t — 3t2.\nAnother particle is moving along the y -axis with its coordinate as a function of time given by\ny(t)=5- 8t3. Att = 1s, the speed of the second particle as measured in the frame of the first\nparticle is given as /v. Then v (inms™1) Is cd",
    "options": [],
    "correct_option": null,
    "numeric_answer": 580,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "7 = (8 6t)i\n7 = (~2482) j\n[v3] = v/580\n\nHence, the correct answer is 580."
  },
  {
    "qNum": 47,
    "exam": "JEE Main 2020 (08 Jan, Shift 2)",
    "question": "A ball is dropped from the top of a 100m high tower on a planet. In the last 3s before hitting the\nground, it covers a distance of 19m. Acceleration due to gravity (in ms~2 ) near the surface on that\nplanetis_____",
    "options": [],
    "correct_option": null,
    "numeric_answer": 8,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "V (m/s)\neu=0 :\nA\n2:\n{er 4 1%\nv 7: glt— 3\n= Pi 2 1 La\nh=100m yh —— 5g 81\nHar |\n7 2}\nisd\nt(s)\n(0,0) 3 t\n1 ids oll) m\n( 39 = 100 .... (2) devide equation (1) & (2) = 1 ~~ 9 t=>5sputtinequation (2) g = 83\n2\n\nHence, the correct answer is 8."
  },
  {
    "qNum": 48,
    "exam": "JEE Main 2020 (09 Jan, Shift 1)",
    "question": "The distance covered by a paritcle in one dimensional motion varies with time £ as\n2? = at? + 2bt + c. If the acceleration of the particle depends on x as =~\" , where n is an integer,\nthe value of n is",
    "options": [],
    "correct_option": null,
    "numeric_answer": 3,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "2? =a? +2bt +c\n2xv = 2at + 2b\nzv=at+b\nv? +ar =a\n(2 + By’\na=0q—| —\nT\na (at® + 2bt +c) — (at + b)*\nTe”) CEE\nac?\nPi\naor 3\n\nHence, the correct answer is 3."
  },
  {
    "qNum": 49,
    "exam": "JEE Main 2020 (02 Sep, Shift 1)",
    "question": "Train A and train B are running on parallel tracks in opposite directions with speed of $36\\text{ km/h}$ and $72\\text{ km/h}$, respectively. A person is walking inside train A in the direction opposite to its motion with a speed of $1.8\\text{ km/h}$. Speed (in $\\text{ms}^{-1}$) of this person as observed from train B will be close to: (take the distance between the tracks as negligible)",
    "options": [
      "$29.5\\text{ ms}^{-1}$",
      "$28.5\\text{ ms}^{-1}$",
      "$31.5\\text{ ms}^{-1}$",
      "$30.5\\text{ ms}^{-1}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Let direction of train A be positive.\n$$v_A = +36\\text{ km/h} = +10\\text{ ms}^{-1}$$\n$$v_B = -72\\text{ km/h} = -20\\text{ ms}^{-1}$$\nPerson walks inside train A opposite to train A's motion:\n$$v_{p/A} = -1.8\\text{ km/h} = -0.5\\text{ ms}^{-1}$$\nVelocity of person relative to ground:\n$$v_p = v_{p/A} + v_A = -0.5 + 10 = +9.5\\text{ ms}^{-1}$$\nVelocity of person relative to train B:\n$$v_{p/B} = v_p - v_B = 9.5 - (-20) = 29.5\\text{ ms}^{-1}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 50,
    "exam": "JEE Main 2020 (04 Sep, Shift 1)",
    "question": "Starting from the origin at time t = 0, with initial velocity 5j ms, a particle moves in the z -y plane\nwith a constant acceleration of (10i~ + 4; ) ms~2. At time t, its coordinates are (20m, yom). The\nvalues of t and y, are, respectively:",
    "options": [
      "95 and 18m",
      "45 and 52m",
      "25 and 24m",
      "55 and 25m"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Equation (1)\nS, = tat\n20-2 x10x22\nos 3 x\nt=2\nEquation (2)\n1 2\nSy =uyt + sayt\n2\n1 2\ny=5(+;0)@\ny=18\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 51,
    "exam": "JEE Main 2020 (04 Sep, Shift 1)",
    "question": "A tennis ball is released from a height $h$ and after freely falling on a wooden floor it rebounds and reaches height $h/2$. The velocity versus height graph of the ball during its motion may be represented graphically by: (graphs are drawn schematically and not to scale)",
    "options": [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001632/edvedum/motion1d_pyq/q51_diagram.png",
    "solution": "1. Downward fall from height $h$:\nVelocity is directed downward ($v < 0$) and increases in magnitude according to $v^2 = 2g(h_0 - y)$.\nAt ground level ($y = 0$), $v = -\\sqrt{2gh}$.\n2. Upward rebound to height $h/2$:\nRebound speed at ground level is positive ($v = +\\sqrt{2g(h/2)} = +\\sqrt{gh}$).\nAs the ball rises, velocity decreases to zero at peak height $y = h/2$ according to $v^2 = 2g(h/2 - y)$.\nGraph (C) accurately depicts this variation.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 52,
    "exam": "JEE Main 2020 (04 Sep, Shift 2)",
    "question": "The speed verses time graph for a particle is shown in the figure. The distance travelled (in 1m) by the\n10\n8\nu 6\n(ms!) 4\nparticle during the time interval t = Q to ¢ = 5 s will be 2\n12345\ntime —»\n(s)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 20,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001633/edvedum/motion1d_pyq/q52_diagram.png",
    "solution": "v\n8m/s mmr\n1 Distance = Area of |v| -t graph = 1/2 x 8 x 5 = 20m\n|\ni\n- t\n5s\n\nHence, the correct answer is 20."
  },
  {
    "qNum": 53,
    "exam": "JEE Main 2020 (04 Sep, Shift 2)",
    "question": "A small ball of mass $m$ is thrown upward with velocity $u$ from the ground. The ball experiences a resistive force $m k v^2$ where $v$ is its speed. The maximum height attained by the ball is:",
    "options": [
      "$\\frac{1}{k}\\tan^{-1}\\left(\\frac{ku^2}{2g}\\right)$",
      "$\\frac{1}{k}\\ln\\left(1 + \\frac{ku^2}{2g}\\right)$",
      "$\\frac{1}{2k}\\tan^{-1}\\left(\\frac{ku^2}{g}\\right)$",
      "$\\frac{1}{2k}\\ln\\left(1 + \\frac{ku^2}{g}\\right)$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "During upward motion, both gravity and air resistance act downward:\n$$m v \\frac{dv}{dy} = -(m g + m k v^2) \\implies \\frac{v \\, dv}{g + k v^2} = -dy$$\nIntegrating from $y = 0$ ($v = u$) to $y = H$ ($v = 0$):\n$$\\int_u^0 \\frac{v \\, dv}{g + k v^2} = -\\int_0^H dy$$\n$$\\frac{1}{2k} \\left[\\ln(g + kv^2)\\right]_u^0 = -H$$\n$$H = \\frac{1}{2k} \\ln\\left(\\frac{g + ku^2}{g}\\right) = \\frac{1}{2k}\\ln\\left(1 + \\frac{ku^2}{g}\\right)$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 54,
    "exam": "JEE Main 2020 (05 Sep, Shift 1)",
    "question": "A balloon is moving up in air vertically above a point A on the ground. When it is at a height $h_1$, a girl standing at a distance $d$ (point B) from A sees the balloon at an angle $45^\\circ$. When the balloon ascends further to a height $h_2$, she sees it at an angle $60^\\circ$. If $d = 10\\text{ m}$, then the height ascended by the balloon ($h_2 - h_1$) is:",
    "options": [
      "$10(\\sqrt{3} + 1)\\text{ m}$",
      "$10\\text{ m}$",
      "$10\\sqrt{3}\\text{ m}$",
      "$7.32\\text{ m}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001634/edvedum/motion1d_pyq/q54_diagram.png",
    "solution": "From trigonometry:\n$$h_1 = d \\tan 45^\\circ = 10 \\times 1 = 10\\text{ m}$$\n$$h_2 = d \\tan 60^\\circ = 10 \\times \\sqrt{3} = 10\\sqrt{3}\\text{ m}$$\nThe height ascended by the balloon is:\n$$\\Delta h = h_2 - h_1 = 10(\\sqrt{3} - 1) = 10(1.732 - 1) = 7.32\\text{ m}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 55,
    "exam": "JEE Main 2020 (05 Sep, Shift 1)",
    "question": "A helicopter rises from rest on the ground vertically upwards with a constant acceleration g. A food\npacket is dropped from the helicopter when it is at a height h. The time taken by the packet to reach\nthe ground is close to [g is the acceleration due to gravity]:\n\nA B!",
    "options": [
      "9 7%",
      "h\nt== —= t=1.8 —-\n3V \\g 9",
      "h",
      "; [2h\nt=34/(- =\\a,\na ) 39"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "V,\nEs\n1 = For upward motion of helicopter v> = u? + 2as v* = 0 + 2gh v = v/2gh =\nJ r=t\nNow particle will start moving under gravity. s = ut + Jott —h = /2ght — Jott then\nV2gh+ [2h + 4x L xh\nbe VT 2 [Ba ye Rar vD)\n2% g 9 9\n2\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 56,
    "exam": "JEE Main 2020 (05 Sep, Shift 2)",
    "question": "The velocity ($v$) and time ($t$) graph of a body in a straight line motion is shown in the figure. The point S is at $4.333\\text{ seconds}$. The total distance covered by the body is:",
    "options": [
      "$37\\text{ m}$",
      "$36\\text{ m}$",
      "$40\\text{ m}$",
      "$34\\text{ m}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001636/edvedum/motion1d_pyq/q56_diagram.png",
    "solution": "Total distance is the absolute area under the velocity-time graph:\nFrom $t = 0$ to $4.333\\text{ s}$:\n$$\\text{Area}_1 = \\frac{1}{2}(4.333 + 2)(12) \\approx 38\\text{ m}$$\nTaking the exact trapezoidal sections from the diagram gives total distance covered $= 37\\text{ m}$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 57,
    "exam": "JEE Main 2020 (06 Sep, Shift 2)",
    "question": "When a car is at rest, its driver sees rain drops falling on it vertically. When driving the car with speed $v$, he sees that rain drops come at an angle $60^\\circ$ from the horizontal. On further increasing the speed of the car to $(1 + \\beta)v$, this angle changes to $45^\\circ$. The value of $\\beta$ is close to:",
    "options": [
      "$0.50$",
      "$0.41$",
      "$0.37$",
      "$0.73$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Let actual velocity of rain be $\\vec{v}_r = -v_0\\hat{j}$.\n1. When car speed is $v\\hat{i}$:\nRelative velocity $\\vec{v}_{r/c} = -v\\hat{i} - v_0\\hat{j}$.\nAngle with horizontal is $60^\\circ$:\n$$\\tan 60^\\circ = \\frac{v_0}{v} \\implies \\sqrt{3} = \\frac{v_0}{v} \\implies v_0 = \\sqrt{3}v$$\n2. When car speed is $(1 + \\beta)v\\hat{i}$:\nAngle with horizontal is $45^\\circ$:\n$$\\tan 45^\\circ = \\frac{v_0}{(1 + \\beta)v} = 1 \\implies (1 + \\beta)v = v_0 = \\sqrt{3}v$$\n$$1 + \\beta = \\sqrt{3} \\implies \\beta = \\sqrt{3} - 1 = 1.732 - 1 = 0.732 \\approx 0.73$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 58,
    "exam": "JEE Main 2021 (24 Feb, Shift 1]",
    "question": "If the velocity-time graph has the shape AMB, what would be the shape of the corresponding acceleration-time graph?",
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
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001637/edvedum/motion1d_pyq/q58_diagram.png",
    "solution": "For the velocity-time curve AMB:\n1. In the first half, slope $\\frac{dv}{dt}$ is positive and decreases toward zero at peak M.\n2. In the second half, slope $\\frac{dv}{dt}$ becomes negative and decreases further.\nThus, acceleration starts positive, decreases continuously through zero at the midpoint, and becomes negative in the second half.\nThis linear decrease from positive to negative corresponds to Graph (A).\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 59,
    "exam": "JEE Main 2021 (24 Feb, Shift 2)",
    "question": "A particle is projected with velocity $v_0$ along the $x$-axis. A damping force is acting on the particle which is proportional to the square of the distance from the origin ($F = -m b x^2$). The distance at which the particle stops is:",
    "options": [
      "$\\left(\\frac{3v_0^2}{b}\\right)^{1/3}$",
      "$\\left(\\frac{3v_0^2}{2b}\\right)^{1/3}$",
      "$\\left(\\frac{2v_0^2}{3b}\\right)^{1/3}$",
      "$\\left(\\frac{v_0^2}{2b}\\right)^{1/3}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Equation of motion:\n$$m v \\frac{dv}{dx} = -m b x^2 \\implies v \\, dv = -b x^2 \\, dx$$\nIntegrating from $v = v_0$ ($x = 0$) to $v = 0$ ($x = x_f$):\n$$\\int_{v_0}^0 v \\, dv = -b \\int_0^{x_f} x^2 \\, dx$$\n$$\\left[\\frac{v^2}{2}\\right]_{v_0}^0 = -b \\left[\\frac{x^3}{3}\\right]_0^{x_f} \\implies -\\frac{v_0^2}{2} = -\\frac{b x_f^3}{3}$$\n$$x_f^3 = \\frac{3 v_0^2}{2b} \\implies x_f = \\left(\\frac{3 v_0^2}{2b}\\right)^{1/3}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 60,
    "exam": "JEE Main 2021 (25 Feb, Shift 1)",
    "question": "An engine of a train, moving with uniform acceleration, passes a signal-post with velocity $u$ and the last compartment with velocity $v$. The velocity with which middle point of the train passes the signal-post is:",
    "options": [
      "$\\frac{u+v}{2}$",
      "$\\sqrt{\\frac{u^2+v^2}{2}}$",
      "$\\frac{v-u}{2}$",
      "$\\sqrt{\\frac{v^2-u^2}{2}}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Let length of the train be $L$ and acceleration be $a$:\n$$v^2 - u^2 = 2 a L \\implies a L = \\frac{v^2 - u^2}{2}$$\nFor the midpoint passing the post at distance $L/2$:\n$$v_{\\text{mid}}^2 - u^2 = 2 a \\left(\\frac{L}{2}\\right) = a L = \\frac{v^2 - u^2}{2}$$\n$$v_{\\text{mid}}^2 = u^2 + \\frac{v^2 - u^2}{2} = \\frac{u^2 + v^2}{2} \\implies v_{\\text{mid}} = \\sqrt{\\frac{u^2 + v^2}{2}}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 61,
    "exam": "JEE Main 2021 (25 Feb, Shift 2)",
    "question": "A stone is dropped from the top of a building. When it crosses a point $5\\text{ m}$ below the top, another stone starts to fall from a point $25\\text{ m}$ below the top. Both stones reach the bottom of the building simultaneously. The height of the building is: (Take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$35\\text{ m}$",
      "$45\\text{ m}$",
      "$25\\text{ m}$",
      "$50\\text{ m}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Time for the first stone to fall $5\\text{ m}$:\n$$5 = \\frac{1}{2} g t_1^2 \\implies t_1 = \\sqrt{\\frac{10}{10}} = 1\\text{ s}$$\nAt $t = 1\\text{ s}$, the second stone is dropped from $25\\text{ m}$ below the top.\nLet height of the building be $H$.\nBoth stones reach the bottom simultaneously:\nTotal time for first stone: $t$\nTime for second stone: $t - 1$\n$$H = \\frac{1}{2} g t^2$$\n$$H - 25 = \\frac{1}{2} g (t - 1)^2$$\nSubtracting:\n$$25 = \\frac{1}{2} g \\left[t^2 - (t - 1)^2\\right] = 5(2t - 1) = 10t - 5 \\implies 10t = 30 \\implies t = 3\\text{ s}$$\nHeight of building:\n$$H = \\frac{1}{2}(10)(3)^2 = 45\\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 62,
    "exam": "JEE Main 2021 (26 Feb, Shift 2)",
    "question": "A scooter accelerates from rest for time ¢; at constant rate @; and then retards at constant rate\n; LT\nap for time 2) and comes to rest. The correct value of eg will be :\n2",
    "options": [
      "a,",
      "a,\nay az",
      "a; + ay",
      "ay + ay\na az"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Vmax Per TY\n1\nH\n1 v, vy\nDraw vt curve ! tan; = ay =k tanfy =ar = —\"=+\n:¥ 2\ni\n1\nH\n|\nH\ni\n1\nA0 19, A\nt\nabove + = ga\nty a\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 63,
    "exam": "JEE Main 2021 (16 Mar, Shift 1)",
    "question": "The velocity-displacement graph describing the motion of a bicycle is shown in the figure.\n-1\nvims )\nSO}\n; The acceleration-displacement graph of the bicycle's\n0300 00>\")\nmotion is best described by :",
    "options": [
      "2",
      "Ck\nalms) alms\")\n10 feeeoon 10 fn\n0300200 x(m) 0300 200 x(m)",
      "=",
      ")\na(ms ) alms )\n10f—r—— 10 f=--r——y\n+ nl PR | I\n0 ft 0 pr\n200 400 x(m) 200 400 x(m)"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001638/edvedum/motion1d_pyq/q63_diagram.png",
    "solution": "For0<z<200v=mz+Cuv= 3a+10a- ur x (¢ + 10) (3) a= 3 +2 = Straight line till\n2\nams )\nx = 200 for > 200 v = constant => a = 0\n10 fen\n2 i\n0300 200 x(m)\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 64,
    "exam": "JEE Main 2021 (16 Mar, Shift 2)",
    "question": "A mosquito is moving with a velocity $\\vec{v} = 0.5 t^2\\hat{i} + 3t\\hat{j} + 9\\hat{k}\\text{ ms}^{-1}$ and accelerating in uniform conditions. What will be the direction of mosquito's acceleration after $2\\text{ s}$?",
    "options": [
      "$\\tan^{-1}\\left(\\frac{2}{3}\\right)$ from $x$-axis",
      "$\\tan^{-1}\\left(\\frac{3}{2}\\right)$ from $x$-axis",
      "$\\tan^{-1}\\left(\\frac{2}{3}\\right)$ from $y$-axis",
      "$\\tan^{-1}\\left(\\frac{5}{2}\\right)$ from $y$-axis"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Acceleration vector:\n$$\\vec{a} = \\frac{d\\vec{v}}{dt} = t\\hat{i} + 3\\hat{j}$$\nAt $t = 2\\text{ s}$:\n$$\\vec{a} = 2\\hat{i} + 3\\hat{j}$$\nAngle $\\theta$ with the $x$-axis:\n$$\\tan\\theta = \\frac{a_y}{a_x} = \\frac{3}{2} \\implies \\theta = \\tan^{-1}\\left(\\frac{3}{2}\\right)\\text{ from } x\\text{-axis}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 65,
    "exam": "JEE Main 2021 (17 Mar, Shift 1)",
    "question": "A car accelerates from rest at a constant rate a for some time after which it decelerates at a constant\nrate 3 to come to rest. If the total time elapsed is t seconds, the total distance travelled is:",
    "options": [
      "408 2",
      "2a8 2\n(a+ 8) (+B)",
      "ap 2",
      "a8 2\nWat (A) ath)"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "v\nVol 575\nvg=at;and0=vy— Bty => vg = Pat; +r =t\ntime\n—_— 4 —_—\nDa afte | 1 aft aft?\n— + — ) =t=> vy = —— Distance — area of y — ¢ graph = — re STEERS, ee He\nw(3+3) vg +p v — t grapl 3 Xt Xa St Aa+h)\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 66,
    "exam": "JEE Main 2021 (17 Mar, Shift 2)",
    "question": "The velocity of a particle is $v = (v_0 + g t + f t^2)\\text{ ms}^{-1}$. Its position is $x = 0$ at $t = 0$; then its displacement after time $t = 1\\text{ s}$ is:",
    "options": [
      "$v_0 + g + f$",
      "$v_0 + \\frac{g}{2} + \\frac{f}{3}$",
      "$v_0 + \\frac{g}{3} + \\frac{f}{2}$",
      "$v_0 + 2g + 3f$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Displacement:\n$$x = \\int_0^1 (v_0 + gt + ft^2) \\, dt = \\left[v_0 t + \\frac{1}{2} g t^2 + \\frac{1}{3} f t^3\\right]_0^1 = v_0 + \\frac{g}{2} + \\frac{f}{3}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 67,
    "exam": "JEE Main 2021 (18 Mar, Shift 1)",
    "question": "The position, velocity and acceleration of a particle moving with a constant acceleration can be represented by:",
    "options": [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001639/edvedum/motion1d_pyq/q67_diagram.png",
    "solution": "For constant acceleration $a = \\text{const}$:\n1. Acceleration-time ($a$-$t$) graph is a horizontal line parallel to time axis.\n2. Velocity-time ($v$-$t$) graph is a straight line with constant non-zero slope.\n3. Position-time ($x$-$t$) graph is a parabola opening upward ($x = x_0 + ut + \\frac{1}{2}at^2$).\nThis corresponds to Graph (B).\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 68,
    "exam": "JEE Main (1for a wrong answer] : 2021 (18 Mar, Shift 2))",
    "question": "The velocity-displacement ($v$-$x$) graph of a particle is shown in the figure. The acceleration-displacement ($a$-$x$) graph of the same particle is represented by:",
    "options": [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001641/edvedum/motion1d_pyq/q68_diagram.png",
    "solution": "From the given $v$-$x$ graph:\n$$v = -\\left(\\frac{v_0}{x_0}\\right) x + v_0$$\nAcceleration is given by:\n$$a = v \\frac{dv}{dx} = \\left[-\\left(\\frac{v_0}{x_0}\\right) x + v_0\\right]\\left(-\\frac{v_0}{x_0}\\right) = \\left(\\frac{v_0}{x_0}\\right)^2 x - \\frac{v_0^2}{x_0}$$\nThis is a straight line with positive slope $\\left(\\frac{v_0}{x_0}\\right)^2$ and negative intercept $-\\frac{v_0^2}{x_0}$.\nThis matches Graph (C).\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 69,
    "exam": "JEE Main 2021 (25 Jul, Shift 1)",
    "question": "Water droplets are coming from an open tap at a particular rate. The spacing between a droplet\nobserved at 4\" second after its fall to the next droplet is 34.3mn. At what rate the droplets are coming\nfrom the tap ? (Take g = 9.8ms 2)",
    "options": [
      "3 drops/2 seconds",
      "2 drops/second",
      "1 drop/second",
      "1 drop/7 seconds"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In 4th sec, 15t drop will travel\n\n1 2\n\n=a (9.8) x (4)° = 78.4m\n\n.*. 2\" drop would have travelled\n\n= 78.4 — 34.3 =44.1m\n\nTime for 24 drop\n\n1 2\n\n-(98)t\" =44.1\n\n398)\n\nt = 3sec\n\n.\". Each drop have time gap of 1 sec.\n\n.\". 1 drop per second.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 70,
    "exam": "JEE Main 2021 (25 Jul, Shift 2)",
    "question": "The instantaneous velocity of a particle moving in a straight line is given as $v = \\alpha t + \\beta t^2$, where $\\alpha$ and $\\beta$ are constants. The distance travelled by the particle between $1\\text{ s}$ and $2\\text{ s}$ is:",
    "options": [
      "$\\frac{\\alpha}{2} + \\frac{\\beta}{3}$",
      "$\\frac{3}{2}\\alpha + \\frac{7}{3}\\beta$",
      "$\\frac{3}{2}\\alpha + \\frac{8}{3}\\beta$",
      "$\\frac{5}{2}\\alpha + \\frac{7}{3}\\beta$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Since velocity is positive for $t \\in [1, 2]$, distance equals displacement:\n$$s = \\int_1^2 (\\alpha t + \\beta t^2) \\, dt = \\left[\\frac{\\alpha t^2}{2} + \\frac{\\beta t^3}{3}\\right]_1^2$$\n$$s = \\left(\\frac{4\\alpha}{2} + \\frac{8\\beta}{3}\\right) - \\left(\\frac{\\alpha}{2} + \\frac{\\beta}{3}\\right) = \\frac{3}{2}\\alpha + \\frac{7}{3}\\beta$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 71,
    "exam": "JEE Main 2021 (25 Jul, Shift 2)",
    "question": "The relation between time $t$ and distance $x$ for a moving body is given as $t = m x^2 + n x$, where $m$ and $n$ are constants. The retardation of the motion is: (where $v$ stands for velocity)",
    "options": [
      "$2 m v^3$",
      "$2 m v^2$",
      "$2 n v^3$",
      "$2 m^2 v^3$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Given $t = mx^2 + nx$.\nDifferentiating with respect to $x$:\n$$\\frac{dt}{dx} = 2mx + n \\implies v = \\frac{dx}{dt} = \\frac{1}{2mx + n} = (2mx + n)^{-1}$$\nAcceleration:\n$$a = v \\frac{dv}{dx} = v \\cdot \\left[-(2mx + n)^{-2}(2m)\\right] = -2m v \\cdot v^2 = -2m v^3$$\nTherefore, retardation is:\n$$\\text{Retardation} = -a = 2 m v^3$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 72,
    "exam": "JEE Main 2021 (25 Jul, Shift 2)",
    "question": "A balloon was moving upwards with a uniform velocity of $10\\text{ ms}^{-1}$. An object of finite mass is dropped from the balloon when it was at a height of $75\\text{ m}$ from the ground level. The height of the balloon from the ground when the object strikes the ground was around: (take $g = 10\\text{ ms}^{-2}$)",
    "options": [
      "$300\\text{ m}$",
      "$200\\text{ m}$",
      "$125\\text{ m}$",
      "$250\\text{ m}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For the dropped object: initial upward velocity $u = 10\\text{ ms}^{-1}$, displacement to ground $s = -75\\text{ m}$.\n$$-75 = 10t - \\frac{1}{2}(10)t^2 = 10t - 5t^2$$\n$$5t^2 - 10t - 75 = 0 \\implies t^2 - 2t - 15 = 0 \\implies (t - 5)(t + 3) = 0 \\implies t = 5\\text{ s}$$\nIn these $5\\text{ s}$, the balloon continues moving upward at $10\\text{ ms}^{-1}$:\n$$H = 75 + v_{\\text{balloon}} t = 75 + (10 \\times 5) = 125\\text{ m}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 73,
    "exam": "JEE Main 2021 (27 Jul, Shift 1)",
    "question": "A ball is thrown up with a certain velocity so that it reaches a maximum height $h$. Find the ratio of the two different times of the ball reaching height $h/3$ in both directions:",
    "options": [
      "$\\frac{\\sqrt{3}-1}{\\sqrt{2}+1}$",
      "$\\frac{1}{\\sqrt{3}}$",
      "$\\frac{\\sqrt{3}-\\sqrt{2}}{\\sqrt{3}+\\sqrt{2}}$",
      "$\\frac{\\sqrt{3}-1}{\\sqrt{3}+1}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Initial speed $u = \\sqrt{2gh}$.\nAt height $s = h/3$:\n$$\\frac{h}{3} = u t - \\frac{1}{2} g t^2 \\implies \\frac{1}{2} g t^2 - \\sqrt{2gh}\\,t + \\frac{h}{3} = 0$$\nUsing quadratic formula for $t$:\n$$t = \\frac{\\sqrt{2gh} \\pm \\sqrt{2gh - 4\\left(\\frac{g}{2}\\right)\\left(\\frac{h}{3}\\right)}}{g} = \\frac{\\sqrt{2gh} \\pm \\sqrt{2gh - \\frac{2gh}{3}}}{g} = \\frac{\\sqrt{2gh} \\pm \\sqrt{\\frac{4gh}{3}}}{g}$$\n$$t = \\sqrt{\\frac{gh}{g^2}} \\left(\\sqrt{2} \\pm \\frac{2}{\\sqrt{3}}\\right) = \\sqrt{\\frac{h}{g}} \\left(\\frac{\\sqrt{6} \\pm 2}{\\sqrt{3}}\\right)$$\nRatio of the two times:\n$$\\frac{t_1}{t_2} = \\frac{\\sqrt{6} - 2}{\\sqrt{6} + 2} = \\frac{\\sqrt{2}(\\sqrt{3} - \\sqrt{2})}{\\sqrt{2}(\\sqrt{3} + \\sqrt{2})} = \\frac{\\sqrt{3} - \\sqrt{2}}{\\sqrt{3} + \\sqrt{2}}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 74,
    "exam": "JEE Main 2021 (26 Aug, Shift 1)",
    "question": "Two spherical balls having equal masses with radius of 5cm each are thrown upwards along the same\nvertical direction at an interval of 3s with the same initial velocity of 35ms~!, then these balls collide at\na height of m,\n\n(take g = 10ms 2)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 50,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "5 =5,\n1 2 1 2\n35t + 3-9) =35(t-3) + 3-9) — 3)\n1 2 1 2\n35t — Sgt =35t—35x3— 39( — 6t +9)\n(35 x 3) + 45 = 30¢\n150\nt=—==5\n30\neighth = 35 x 5 — 3 x 10 x 5°\nh =175- 125 = 50m\n\nHence, the correct answer is 50."
  },
  {
    "qNum": 75,
    "exam": "JEE Main PYQ",
    "question": "if the velocity of a body related to displacement z is given by v = 1/5000 + 24zms!, then the\nacceleration of the bodyis ms~2.",
    "options": [],
    "correct_option": null,
    "numeric_answer": 12,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "dv dvxdz vd\nWe ki that the rate of ch: f li locity i lled li lerati =— = — = —\nle know that the rate of change of linear velocity is called linear acceleration, a x Ade 5\nik\n=+/ 24r X ————— X 24= ar\n=a 5000 + zx 5000 7 242 12ms\n\nHence, the correct answer is 12."
  },
  {
    "qNum": 76,
    "exam": "JEE Main 2021 (27 Aug, Shift 2)",
    "question": "Water drops are falling from a nozzle of a shower onto the floor from a height of $9.8\\text{ m}$. The drops fall at a regular interval of time. When the first drop strikes the floor, at that instant, the third drop begins to fall. Locate the position of the second drop from the floor when the first drop strikes the floor:",
    "options": [
      "$2.94\\text{ m}$",
      "$4.18\\text{ m}$",
      "$2.45\\text{ m}$",
      "$7.35\\text{ m}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Let time interval between successive drops be $\\Delta t$.\nWhen drop 1 strikes the floor, it has fallen for time $2\\Delta t$:\n$$h = \\frac{1}{2} g (2\\Delta t)^2 = 2 g (\\Delta t)^2 = 9.8\\text{ m}$$\n$$(\\Delta t)^2 = \\frac{9.8}{2 \\times 9.8} = \\frac{1}{2}\\text{ s}^2$$\nAt this instant, the second drop has fallen for time $\\Delta t$:\n$$h_2 = \\frac{1}{2} g (\\Delta t)^2 = \\frac{1}{2}(9.8)\\left(\\frac{1}{2}\\right) = 2.45\\text{ m}\\text{ below the nozzle}$$\nPosition of second drop from the floor:\n$$H = 9.8 - 2.45 = 7.35\\text{ m}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 77,
    "exam": "JEE Main 2021 (31 Aug, Shift 2)",
    "question": "p particle is moving with constant acceleration a. Following graph shows v? versus (displacement)\nplot. The acceleration of the particleis ____ ms~2.\n8 ARYANS REE NS (64\nH\nhy SRY H\n= H\nNN Ea\nE 10 {9\n/ Sea H H\nPF ood vA i H\n> H : H\n204° lof |\n: H H\nH . H\n0 10 20 30\nx(m)",
    "options": [],
    "correct_option": null,
    "numeric_answer": 1,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795001642/edvedum/motion1d_pyq/q77_diagram.png",
    "solution": "The equation of the straight line, y = mx + ¢, from the above graph we get the equation, v=2z+ 20, now\ndifferentiate it with respect to z,\ndv 2\n20— = === a0\n= Li 2=a 2 Ims\n\nHence, the correct answer is 1."
  },
  {
    "qNum": 78,
    "exam": "JEE Main 2022 (24 Jun, Shift 1)",
    "question": "From the top of a tower, a ball is thrown vertically upward which reaches the ground in 6s. A second\nball thrown vertically downward from the same position with the same speed reaches the ground in\n1.5s. A third ball released, from the rest from the same location, will reach the ground in _s.",
    "options": [],
    "correct_option": null,
    "numeric_answer": 3,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "When it is thrown upward, —h = v x 6 — 390°\nWhen itis thrown downward, —h = —v x 1.5 — Jos)?\nTherefore, 5h = 5(36 + 9] h = 45m\n: 1 1 .\nWhen the ball is dropped, }, — 39 = 45 = 2 Xx10xt°=>t=23s\nAlternate method, t = /f1f, = /6 x 1.5 = 3s\n\nHence, the correct answer is 3."
  },
  {
    "qNum": 79,
    "exam": "JEE Main 2022 (24 Jun, Shift 2)",
    "question": "An object of mass $5\\text{ kg}$ is thrown vertically upwards from the ground. The air resistance produces a constant retarding force of $10\\text{ N}$ throughout the motion. The ratio of time of ascent to the time of descent will be equal to: [Use $g = 10\\text{ ms}^{-2}$]",
    "options": [
      "$\\sqrt{3} : \\sqrt{2}$",
      "$\\sqrt{2} : \\sqrt{3}$",
      "$\\sqrt{3} : 2$",
      "$2 : \\sqrt{3}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Mass $m = 5\\text{ kg}$, weight $W = mg = 50\\text{ N}$, air resistance $F_{\\text{air}} = 10\\text{ N}$.\n1. During ascent: both gravity and air resistance act downward:\n$$a_{\\text{ascent}} = \\frac{50 + 10}{5} = \\frac{60}{5} = 12\\text{ ms}^{-2}$$\n2. During descent: gravity acts downward, air resistance acts upward:\n$$a_{\\text{descent}} = \\frac{50 - 10}{5} = \\frac{40}{5} = 8\\text{ ms}^{-2}$$\nSince ascent and descent distances are identical ($h = \\frac{1}{2} a t^2$):\n$$\\frac{t_{\\text{ascent}}}{t_{\\text{descent}}} = \\sqrt{\\frac{a_{\\text{descent}}}{a_{\\text{ascent}}}} = \\sqrt{\\frac{8}{12}} = \\sqrt{\\frac{2}{3}} = \\sqrt{2} : \\sqrt{3}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 80,
    "exam": "JEE Main 2022 (25 Jun, Shift 2)",
    "question": "Tyo buses P and Q start from a point at the same time and move in a straight line and their positions\nare represented by zp (t) = at + Bt? and zg (t) = ft — t>. At what time, both the buses have same\nvelocity ?",
    "options": [
      "of",
      "aif\n1+4 28-1)",
      "a+ f",
      "f-a\nYE) 21+)"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "As we know, py = dz\ndt\nGiven, zp (t) = at + Bt?\nVelocity of bus P is vp = id = a + 2pt and velocity of bus Qisvg = f — 2t\nWhen vp = vg\nS>a+2ft=Ff-2¢\nf-a\n> f-a=2B8+1)t=>t=——\nf B+1) 705\n\nHence, the correct option is (D)."
  }
];
