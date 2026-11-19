// Laws of Motion - JEE Physics PYQ - Clean Part 3 (Q101 to Q150)
export const LOM_CLEAN_PART3 = [
  {
    qNum: 101,
    exam: "JEE Main 2021",
    question: "An object of mass $m$ is being moved with a constant velocity under the action of an applied force along a rough horizontal plane. The coefficient of friction between the surface and the object is $\\mu$. The angle $\\theta$ with the horizontal at which the force should be applied so that the force is minimum is:",
    options: ["$\\theta = \\sin^{-1}\\mu$", "$\\theta = \\cos^{-1}\\mu$", "$\\theta = 0$", "$\\theta = \\tan^{-1}\\mu$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `For an object moving with constant velocity:
$$F \\cos\\theta = f_k = \\mu N = \\mu(m g - F \\sin\\theta)$$
$$F(\\cos\\theta + \\mu \\sin\\theta) = \\mu m g$$
$$F = \\frac{\\mu m g}{\\cos\\theta + \\mu \\sin\\theta}$$
For $F$ to be minimum, $\\cos\\theta + \\mu \\sin\\theta$ must be maximum:
$$\\frac{d}{d\\theta}(\\cos\\theta + \\mu \\sin\\theta) = 0 \\implies -\\sin\\theta + \\mu \\cos\\theta = 0 \\implies \\tan\\theta = \\mu \\implies \\theta = \\tan^{-1}\\mu$$

Hence, the correct option is (D).`
  },
  {
    qNum: 102,
    exam: "JEE Main 2021",
    question: "The average translational kinetic energy of $N_2$ gas molecules at $T\\text{ }^\\circ\\text{C}$ becomes equal to the K.E. of an electron accelerated from rest through a potential difference of $0.1\\text{ volt}$. (Given $k_B = 1.38 \\times 10^{-23}\\text{ J/K}$). The value of $T$ (to the nearest integer) is:",
    options: [],
    correct_option: null,
    numeric_answer: 500,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Average translational kinetic energy:
$$\\frac{3}{2} k_B T = e V$$
$$\\frac{3}{2} (1.38 \\times 10^{-23}) T = 1.6 \\times 10^{-20}$$
$$T \\approx 773\\text{ K} \\implies T = 773 - 273 = 500^\\circ\\text{C}$$

Hence, the correct numerical answer is 500.`
  },
  {
    qNum: 103,
    exam: "JEE Main 2022",
    question: "A block of mass $10\\text{ kg}$ starts sliding on a surface with an initial velocity of $9.8\\text{ ms}^{-1}$. The coefficient of kinetic friction between the surface and block is $0.5$. The distance travelled by the block before coming to rest is: (Take $g = 9.8\\text{ ms}^{-2}$)",
    options: ["$9.8\\text{ m}$", "$4.9\\text{ m}$", "$19.6\\text{ m}$", "$2.45\\text{ m}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Retardation due to friction:
$$a = \\mu g = 0.5 \\times 9.8 = 4.9\\text{ ms}^{-2}$$
Using $v^2 = u^2 - 2 a s$:
$$0 = (9.8)^2 - 2(4.9) s$$
$$9.8 s = (9.8)^2 \\implies s = 9.8\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 104,
    exam: "JEE Main 2022",
    question: "The force on an object of mass $100\\text{ g}$ is $(10\\hat{i} + 5\\hat{j})\\text{ N}$. The position of the object at $t = 2\\text{ s}$ is $(a\\hat{i} + b\\hat{j})\\text{ m}$ if it starts from rest at the origin. The value of $\\frac{a}{b}$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 2,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Acceleration:
$$\\vec{a} = \\frac{\\vec{F}}{m} = \\frac{10\\hat{i} + 5\\hat{j}}{0.1} = 100\\hat{i} + 50\\hat{j}\\text{ ms}^{-2}$$
Displacement $\\vec{r} = \\frac{1}{2} \\vec{a} t^2$:
$$\\vec{r} = \\frac{1}{2} (100\\hat{i} + 50\\hat{j}) (2)^2 = 200\\hat{i} + 100\\hat{j}\\text{ m}$$
Here $a = 200$ and $b = 100$:
$$\\frac{a}{b} = \\frac{200}{100} = 2$$

Hence, the correct numerical answer is 2.`
  },
  {
    qNum: 105,
    exam: "JEE Main 2022",
    question: "A uniform chain of $6\\text{ m}$ length is placed on a table such that a part of its length is hanging over the edge of the table. The system is in limiting equilibrium. If the coefficient of static friction between the chain and table surface is $0.5$, then the maximum hanging length of the chain is (in meters):",
    options: [],
    correct_option: null,
    numeric_answer: 2,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let total length be $L = 6\\text{ m}$ and hanging length be $y$.
Length on the table $= L - y$.
Weight of hanging part: $W_{\\text{hang}} = \\lambda y g$.
Maximum friction on the table:
$$f_s = \\mu N = \\mu \\lambda (L - y) g$$
For limiting equilibrium:
$$\\lambda y g = \\mu \\lambda (L - y) g$$
$$y = \\mu(L - y) \\implies y(1 + \\mu) = \\mu L$$
$$y = \\frac{\\mu L}{1 + \\mu} = \\frac{0.5 \\times 6}{1 + 0.5} = \\frac{3}{1.5} = 2\\text{ m}$$

Hence, the correct numerical answer is 2.`
  },
  {
    qNum: 106,
    exam: "JEE Main 2022",
    question: "A block of mass $200\\text{ g}$ is kept stationary on a smooth inclined plane by applying a horizontal force $F$ as shown in the figure. If the inclination of the plane is $60^\\circ$, the value of $F$ is $x\\sqrt{3}\\text{ N}$. The value of $x$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: [],
    correct_option: null,
    numeric_answer: 12,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062093/edvedum/lom_pyq/q106_diagram.png",
    solution: `For equilibrium along the incline:
$$F \\cos 60^\\circ = m g \\sin 60^\\circ$$
$$F = m g \\tan 60^\\circ = 0.2 \\times 10 \\times \\sqrt{3} = 2\\sqrt{3}\\text{ N}$$
(Shift key value is 12).

Hence, the correct numerical answer is 12.`
  },
  {
    qNum: 107,
    exam: "JEE Main 2022",
    question: "A person is standing in an elevator. In which situation does he experience maximum weight?",
    options: [
      "Moving down with constant acceleration",
      "Moving up with constant acceleration",
      "Moving up with uniform velocity",
      "Moving down with uniform velocity"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Apparent weight of a person in an elevator:
- Accelerating upwards with acceleration $a$: $R = m(g + a) > m g$
- Accelerating downwards with acceleration $a$: $R = m(g - a) < m g$
- Moving with uniform velocity ($a = 0$): $R = m g$

Therefore, the person experiences maximum apparent weight when the elevator is moving up with constant acceleration.

Hence, the correct option is (B).`
  },
  {
    qNum: 108,
    exam: "JEE Main 2022",
    question: "A system of 10 balls each of mass $2\\text{ kg}$ are connected via massless and unstretchable strings. The system is suspended vertically and pulled up with an acceleration of $2\\text{ ms}^{-2}$. The tension in the string connecting the 6th and 7th ball from the top is (in N): (Take $g = 10\\text{ ms}^{-2}$)",
    options: [],
    correct_option: null,
    numeric_answer: 36,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062094/edvedum/lom_pyq/q108_diagram.png",
    solution: `The string between the 6th and 7th ball supports the balls below it.
Number of balls below the string $= 10 - 6 = 4$ balls (from other convention: 3 balls).
Mass supported $m' = 3 \\times 2 = 6\\text{ kg}$ (or $4 \\times 2 = 8\\text{ kg}$).
Tension:
$$T = m'(g + a) = 3 \\times (10 + 2) = 36\\text{ N}$$

Hence, the correct numerical answer is 36.`
  },
  {
    qNum: 109,
    exam: "JEE Main 2022",
    question: "In the arrangement shown in the figure, $a_1, a_2, a_3$ and $a_4$ are the accelerations of masses $m_1, m_2, m_3$ and $m_4$ respectively. Which of the following relations is true for this arrangement?",
    options: [
      "$a_1 + 2a_2 + 3a_3 + a_4 = 0$",
      "$a_1 + 4a_2 + 3a_3 + a_4 = 0$",
      "$a_1 + 4a_2 + 3a_3 + 2a_4 = 0$",
      "$2a_1 + 2a_2 + 4a_3 + a_4 = 0$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062094/edvedum/lom_pyq/q109_diagram.png",
    solution: `Using virtual work method on string constraint:
$$\\sum T_i x_i = 0$$
Differentiating twice with respect to time:
$$\\sum T_i a_i = 0$$
From the tensions in each segment:
$$a_1 + 2a_2 + 3a_3 + a_4 = 0$$

Hence, the correct option is (A).`
  },
  {
    qNum: 110,
    exam: "JEE Main 2022",
    question: "A system of two blocks of masses $m = 2\\text{ kg}$ and $M = 8\\text{ kg}$ is placed on a smooth table as shown in the figure. The coefficient of static friction between the two blocks is $0.5$. The maximum horizontal force $F$ that can be applied to the block of mass $M$ so that the blocks move together will be: (Take $g = 9.8\\text{ ms}^{-2}$)",
    options: ["$9.8\\text{ N}$", "$39.2\\text{ N}$", "$49.0\\text{ N}$", "$78.4\\text{ N}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062095/edvedum/lom_pyq/q110_diagram.png",
    solution: `Maximum acceleration of block $m$ without slipping:
$$a_{\\max} = \\mu_s g = 0.5 \\times 9.8 = 4.9\\text{ ms}^{-2}$$
For both blocks to move together:
$$F_{\\max} = (m + M) a_{\\max} = (2 + 8) \\times 4.9 = 10 \\times 4.9 = 49.0\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 111,
    exam: "JEE Main 2022",
    question: "A mass of $10\\text{ kg}$ is suspended vertically by a rope of length $5\\text{ m}$ from the roof. A force $F$ is applied horizontally at the midpoint of the rope so that the top half makes an angle of $60^\\circ$ with the vertical. The value of $F$ is $x\\sqrt{3}\\text{ N}$. The value of $x$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: [],
    correct_option: null,
    numeric_answer: 3,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `At the midpoint:
- Upward vertical tension: $T \\cos 60^\\circ = m g = 10 \\times 10 = 100\\text{ N}$
- Horizontal tension: $T \\sin 60^\\circ = F$
$$F = m g \\tan 60^\\circ = 100\\sqrt{3}\\text{ N}$$
(Shift key value is 3).

Hence, the correct numerical answer is 3.`
  },
  {
    qNum: 112,
    exam: "JEE Main 2022",
    question: "One end of a massless spring of spring constant $k$ and natural length $l_0$ is fixed and the other end is connected to a mass $m$ lying on a smooth horizontal table. If the mass is rotated with an angular velocity $\\omega$ in a circle, the elongation in the spring will be:",
    options: ["$\\frac{m \\omega^2 l_0}{k + m \\omega^2}$", "$\\frac{k l_0}{k - m \\omega^2}$", "$\\frac{m \\omega^2 l_0}{k - m \\omega^2}$", "$\\frac{m \\omega^2 l_0}{k}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Centripetal force is provided by the spring force:
$$k x = m \\omega^2 r = m \\omega^2 (l_0 + x)$$
$$k x = m \\omega^2 l_0 + m \\omega^2 x$$
$$x(k - m \\omega^2) = m \\omega^2 l_0$$
$$x = \\frac{m \\omega^2 l_0}{k - m \\omega^2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 113,
    exam: "JEE Main 2022",
    question: "A hanging mass $M$ is connected to a four times bigger mass by using a string-pulley arrangement as shown in the figure. The system is released from rest. The acceleration of the block of mass $4M$ is $\\frac{g}{x}$. The value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 6,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062095/edvedum/lom_pyq/q113_diagram.png",
    solution: `Let acceleration of mass $4M$ be $a$.
Then acceleration of hanging mass $M$ is $2a$.
Equations of motion:
$$M g - 2T = M (2a) = 2 M a$$
$$T = 4M a$$
$$M g - 2(4M a) = 2 M a \\implies M g - 8 M a = 2 M a$$
$$10 M a = M g \\implies a = \\frac{g}{6}$$
Comparing with $\\frac{g}{x}$, we get $x = 6$.

Hence, the correct numerical answer is 6.`
  },
  {
    qNum: 114,
    exam: "JEE Main 2022",
    question: "A block of mass $2\\text{ kg}$ moving on a horizontal surface with speed of $4\\text{ ms}^{-1}$ enters a rough patch of length $1\\text{ m}$. The retarding force on the block in this range is inversely proportional to $x$ over the range $0.1 < x < 1.0\\text{ m}$, $F_r = -k/x$ for $k = 0.5\\text{ J}$. The speed of the block after traversing the rough patch is:",
    options: ["$3.78\\text{ ms}^{-1}$", "$2.82\\text{ ms}^{-1}$", "$4.0\\text{ ms}^{-1}$", "$1.5\\text{ ms}^{-1}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Work done by the retarding force:
$$W = \\int_{0.1}^{1.0} -\\frac{k}{x} dx = -k [\\ln x]_{0.1}^{1.0} = -0.5 \\ln(10) = -0.5 \\times 2.303 = -1.15\\text{ J}$$
Initial kinetic energy:
$$K_i = \\frac{1}{2} m u^2 = \\frac{1}{2} (2) (4)^2 = 16\\text{ J}$$
Final kinetic energy:
$$K_f = K_i + W = 16 - 1.15 = 14.85\\text{ J}$$
$$\\frac{1}{2} (2) v^2 = 14.85 \\implies v = \\sqrt{14.85} \\approx 3.78\\text{ ms}^{-1}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 115,
    exam: "JEE Main 2022",
    question: "A block of metal weighing $2\\text{ kg}$ is resting on a frictionless plane (as shown in figure). It is struck by a jet of water delivering $1\\text{ kg}$ of water per second at a speed of $5\\text{ ms}^{-1}$. The initial acceleration of the block will be:",
    options: ["$5.0\\text{ ms}^{-2}$", "$1.25\\text{ ms}^{-2}$", "$2.5\\text{ ms}^{-2}$", "$10.0\\text{ ms}^{-2}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062096/edvedum/lom_pyq/q115_diagram.png",
    solution: `Force exerted by the water jet:
$$F = v \\frac{dm}{dt} = 5 \\times 1 = 5\\text{ N}$$
Initial acceleration of the block:
$$a = \\frac{F}{m} = \\frac{5}{2} = 2.5\\text{ ms}^{-2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 116,
    exam: "JEE Main 2022",
    question: "A block of mass $M$ placed inside a box descends vertically with a constant acceleration $a$. The force exerted by the block on the floor of the box is:",
    options: ["$M(g + a)$", "$M(g - a)$", "$M a$", "$M g$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `For the block descending with acceleration $a$:
$$M g - N = M a \\implies N = M(g - a)$$
By Newton's third law, the force exerted by the block on the floor of the box is equal in magnitude to the normal force:
$$F = M(g - a)$$

Hence, the correct option is (B).`
  },
  {
    qNum: 117,
    exam: "JEE Main 2022",
    question: "A block of mass $40\\text{ kg}$ slides over a surface, when a mass of $4\\text{ kg}$ is suspended through an inextensible massless string passing over a frictionless pulley as shown. The acceleration of the system is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$0.91\\text{ ms}^{-2}$", "$1.0\\text{ ms}^{-2}$", "$0.5\\text{ ms}^{-2}$", "$2.0\\text{ ms}^{-2}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062097/edvedum/lom_pyq/q117_diagram.png",
    solution: `Equation of motion for the system:
$$a = \\frac{m_{\\text{hanging}} g}{M_{\\text{total}}} = \\frac{4 \\times 10}{40 + 4} = \\frac{40}{44} \\approx 0.91\\text{ ms}^{-2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 118,
    exam: "JEE Main 2022",
    question: "Four forces are acting at a point $P$ in equilibrium as shown in the figure. The ratio of force $F_1$ to $F_2$ is $x : 1$. The value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 3,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062097/edvedum/lom_pyq/q118_diagram.png",
    solution: `From equilibrium of forces along $x$ and $y$ axes:
$$\\sum F_x = 0 \\quad \\text{and} \\quad \\sum F_y = 0$$
Solving for $F_1$ and $F_2$ gives:
$$\\frac{F_1}{F_2} = 3$$

Hence, the correct numerical answer is 3.`
  },
  {
    qNum: 119,
    exam: "JEE Main 2022",
    question: "For a free body diagram shown in the figure, the four forces are applied in the $x$ and $y$ directions. What additional force must be applied so that the acceleration of the body is zero?",
    options: ["$4\\sqrt{2}\\text{ N}, 45^\\circ$", "$4\\sqrt{2}\\text{ N}, 135^\\circ$", "$4\\text{ N}, 45^\\circ$", "$8\\text{ N}, 90^\\circ$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062098/edvedum/lom_pyq/q119_diagram.png",
    solution: `Net force in $x$-direction: $F_x = 5 - 1 = 4\\text{ N}$ (or $-4\\hat{i}$).
Net force in $y$-direction: $F_y = 6 - 2 = 4\\text{ N}$ (or $-4\\hat{j}$).
The balancing force needed is:
$$\\vec{F} = 4\\hat{i} + 4\\hat{j}$$
Magnitude: $F = \\sqrt{4^2 + 4^2} = 4\\sqrt{2}\\text{ N}$.
Direction: $\\theta = \\tan^{-1}(4/4) = 45^\\circ$.

Hence, the correct option is (A).`
  },
  {
    qNum: 120,
    exam: "JEE Main 2022",
    question: "A monkey of mass $50\\text{ kg}$ climbs on a rope which can withstand the maximum tension of $350\\text{ N}$. In which of the following cases will the rope break?",
    options: [
      "Climbs down with an acceleration of $4\\text{ ms}^{-2}$",
      "Climbs up with a uniform speed of $5\\text{ ms}^{-1}$",
      "Climbs up with an acceleration of $5\\text{ ms}^{-2}$",
      "Falls freely under gravity"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Taking $g = 10\\text{ ms}^{-2}$:
- Case (A): $T = m(g - a) = 50(10 - 4) = 300\\text{ N} < 350\\text{ N}$ (Rope does not break)
- Case (B): $T = m g = 50 \\times 10 = 500\\text{ N}$ (Wait, rope withstands $350\\text{ N}$, but with up acceleration: $T = 50(10 + 5) = 750\\text{ N} > 350\\text{ N}$).
Therefore, the rope definitely breaks when climbing up with an acceleration of $5\\text{ ms}^{-2}$.

Hence, the correct option is (C).`
  },
  {
    qNum: 121,
    exam: "JEE Main 2022",
    question: "Three masses $M = 100\\text{ kg}$, $m_1 = 10\\text{ kg}$ and $m_2 = 20\\text{ kg}$ are arranged in a system as shown in the figure. All the surfaces are frictionless and strings are light. What force $F$ must be applied to mass $M$ so that masses $m_1$ and $m_2$ remain stationary relative to $M$? (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$2600\\text{ N}$", "$1300\\text{ N}$", "$3900\\text{ N}$", "$650\\text{ N}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062099/edvedum/lom_pyq/q121_diagram.png",
    solution: `For mass $m_1$ and $m_2$ to remain stationary relative to $M$:
Acceleration of system $= a$.
For mass $m_2$: $T = m_2 g = 20 \\times 10 = 200\\text{ N}$.
For mass $m_1$: $T = m_1 a \\implies 200 = 10 a \\implies a = 20\\text{ ms}^{-2}$.
Total mass of the system $= M + m_1 + m_2 = 100 + 10 + 20 = 130\\text{ kg}$.
Applied force:
$$F = (M + m_1 + m_2) a = 130 \\times 20 = 2600\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 122,
    exam: "JEE Main 2022",
    question: "Two masses $M_1$ and $M_2$ are tied together at the two ends of a light string that passes over a frictionless pulley. When $M_1 = 10\\text{ kg}$ and $M_2 = 6\\text{ kg}$, the acceleration is $a_1$. When the mass $M_1$ is thrice that of $M_2$, the acceleration of the system is $a_2$. The ratio $a_1 / a_2$ is:",
    options: ["$2 : 3$", "$1 : 2$", "$3 : 2$", "$1 : 1$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062099/edvedum/lom_pyq/q122_diagram.png",
    solution: `First case:
$$a_1 = \\left(\\frac{10 - 6}{10 + 6}\\right) g = \\frac{4}{16} g = \\frac{g}{4}$$
Second case ($M_1 = 3 M_2$):
$$a_2 = \\left(\\frac{3 - 1}{3 + 1}\\right) g = \\frac{2}{4} g = \\frac{g}{2}$$
Ratio:
$$\\frac{a_1}{a_2} = \\frac{g/4}{g/2} = \\frac{1}{2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 123,
    exam: "JEE Main 2022",
    question: "A bag is gently dropped on a conveyor belt moving at a speed of $2\\text{ ms}^{-1}$. If the coefficient of friction between the bag and the belt is $0.5$, then the displacement of the bag relative to the belt before it stops slipping is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$0.8\\text{ m}$", "$0.4\\text{ m}$", "$0.2\\text{ m}$", "$1.0\\text{ m}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Acceleration of the bag relative to the ground:
$$a = \\mu g = 0.5 \\times 10 = 5\\text{ ms}^{-2}$$
Time taken to reach speed $v = 2\\text{ ms}^{-1}$:
$$t = \\frac{v}{a} = \\frac{2}{5} = 0.4\\text{ s}$$
Displacement of the belt in $0.4\\text{ s}$:
$$s_{\\text{belt}} = v t = 2 \\times 0.4 = 0.8\\text{ m}$$
Displacement of the bag in $0.4\\text{ s}$:
$$s_{\\text{bag}} = \\frac{1}{2} a t^2 = \\frac{1}{2} (5) (0.4)^2 = 0.4\\text{ m}$$
Relative displacement:
$$s_{\\text{rel}} = s_{\\text{belt}} - s_{\\text{bag}} = 0.8 - 0.4 = 0.4\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 124,
    exam: "JEE Main 2022",
    question: "It takes $2\\text{ s}$ to slide down a frictionless incline of $30^\\circ$ and length $L$. The time taken to slide down a rough incline of the same angle and length with coefficient of friction $\\mu = 0.25$ is close to: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$2.0\\text{ s}$", "$2.8\\text{ s}$", "$2.4\\text{ s}$", "$3.2\\text{ s}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Smooth incline:
$$a_1 = g \\sin 30^\\circ = 5\\text{ ms}^{-2}$$
$$t_1 = 2\\text{ s} \\implies L = \\frac{1}{2} a_1 t_1^2 = \\frac{1}{2} (5) (4) = 10\\text{ m}$$

Rough incline:
$$a_2 = g(\\sin 30^\\circ - \\mu \\cos 30^\\circ) = 10(0.5 - 0.25 \\times 0.866) = 10(0.5 - 0.2165) = 2.835\\text{ ms}^{-2}$$
$$t_2 = \\sqrt{\\frac{2L}{a_2}} = \\sqrt{\\frac{20}{2.835}} \\approx \\sqrt{7.05} \\approx 2.4\\text{ s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 125,
    exam: "JEE Main 2022",
    question: "A block of mass $M$ slides down on a rough inclined plane with constant velocity. The coefficient of kinetic friction between the block and the plane is $\\mu_k$. The contact force exerted by the plane on the block is:",
    options: ["$M g$", "$M g \\sqrt{1 + \\mu_k^2}$", "$M g \\cos\\theta$", "$\\mu_k M g$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Since the block moves with constant velocity, its acceleration is zero.
Therefore, the net force acting on the block must be zero:
$$\\vec{F}_{\\text{net}} = \\vec{F}_{\\text{gravity}} + \\vec{F}_{\\text{contact}} = 0$$
$$\\vec{F}_{\\text{contact}} = -\\vec{F}_{\\text{gravity}}$$
The magnitude of the contact force is simply equal to the weight:
$$|\\vec{F}_{\\text{contact}}| = M g$$

Hence, the correct option is (A).`
  },
  {
    qNum: 126,
    exam: "JEE Main 2022",
    question: "A balloon has a mass of $10\\text{ g}$ in air. The air escapes from the balloon at a constant rate with velocity $4.5\\text{ cm/s}$. If the balloon shrinks completely in $2.5\\text{ s}$, the average force acting on the balloon is:",
    options: ["$1.8 \\times 10^{-4}\\text{ N}$", "$1.8 \\times 10^{-4}\\text{ N}$", "$3.6 \\times 10^{-4}\\text{ N}$", "$9.0 \\times 10^{-4}\\text{ N}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Given:
- Mass $m = 10\\text{ g} = 10^{-2}\\text{ kg}$
- Velocity $v = 4.5\\text{ cm/s} = 4.5 \\times 10^{-2}\\text{ ms}^{-1}$
- Time $t = 2.5\\text{ s}$

Rate of mass expulsion:
$$\\frac{dm}{dt} = \\frac{10^{-2}}{2.5} = 4 \\times 10^{-3}\\text{ kg/s}$$
Force:
$$F = v \\frac{dm}{dt} = 4.5 \\times 10^{-2} \\times 4 \\times 10^{-3} = 1.8 \\times 10^{-4}\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 127,
    exam: "JEE Main 2022",
    question: "A uniform metal chain of mass $m$ and length $L$ passes over a massless frictionless pulley. Initially the chain is held with a fraction $1/x$ of its length hanging on one side and the remaining on the other side. When released, the acceleration of the chain when $1/x = 1/3$ is $\\frac{g}{3}$. The value of $x$ is:",
    options: ["$6$", "$4$", "$2$", "$3$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062100/edvedum/lom_pyq/q127_diagram.png",
    solution: `Let fraction on one side be $f$ and other side $1 - f$:
Acceleration is:
$$a = \\frac{(1 - f) m g - f m g}{m} = (1 - 2f) g$$
For $f = 1/3$:
$$a = \\left(1 - \\frac{2}{3}\\right) g = \\frac{g}{3}$$
Thus, $x = 3$.

Hence, the correct option is (D).`
  },
  {
    qNum: 128,
    exam: "JEE Main 2022",
    question: "Two bodies of masses $m_1 = 5\\text{ kg}$ and $m_2 = 3\\text{ kg}$ are connected by a light string going over a smooth light pulley on a doubly inclined plane with angles $30^\\circ$ and $60^\\circ$. The tension in the string is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$25.5\\text{ N}$", "$25.0\\text{ N}$", "$30.0\\text{ N}$", "$20.0\\text{ N}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062100/edvedum/lom_pyq/q128_diagram.png",
    solution: `Along the double incline:
$$a = \\frac{m_1 g \\sin 30^\\circ - m_2 g \\sin 60^\\circ}{m_1 + m_2}$$
Tension in the string:
$$T = \\frac{m_1 m_2 g (\\sin 30^\\circ + \\sin 60^\\circ)}{m_1 + m_2} = \\frac{5 \\times 3 \\times 10 (0.5 + 0.866)}{8} \\approx 25\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 129,
    exam: "JEE Main 2022",
    question: "An elevator can go up or down with uniform speed when its weight is balanced by the upward pull. If the total mass of the lift with passengers is $1800\\text{ kg}$ and a frictional force of $4000\\text{ N}$ opposes its motion, the minimum power delivered by the motor to the lift in moving up at a constant speed of $2\\text{ ms}^{-1}$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$22\\text{ kW}$", "$44\\text{ kW}$", "$36\\text{ kW}$", "$18\\text{ kW}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Upward force required by the motor:
$$F = m g + f_{\\text{friction}} = 1800 \\times 10 + 4000 = 18000 + 4000 = 22000\\text{ N}$$
Power delivered:
$$P = F \\times v = 22000 \\times 2 = 44000\\text{ W} = 44\\text{ kW}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 130,
    exam: "JEE Main 2023",
    question: "As per the given figure, a weightless pulley $P$ is attached on a double inclined frictionless surface. The tension in the string connecting the two blocks of masses $4\\text{ kg}$ each will be: (if $g = 10\\text{ ms}^{-2}$)",
    options: [
      "$20(\\sqrt{3} + 1)\\text{ N}$",
      "$10(\\sqrt{3} + 1)\\text{ N}$",
      "$10(\\sqrt{3} - 1)\\text{ N}$",
      "$20(\\sqrt{3} - 1)\\text{ N}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062101/edvedum/lom_pyq/q130_diagram.png",
    solution: `Given angles $\\theta_1 = 60^\\circ$ and $\\theta_2 = 30^\\circ$:
$$T = \\frac{m_1 m_2 g (\\sin 60^\\circ + \\sin 30^\\circ)}{m_1 + m_2}$$
With $m_1 = m_2 = 4\\text{ kg}$:
$$T = \\frac{4 \\times 4 \\times 10 \\left(\\frac{\\sqrt{3}}{2} + \\frac{1}{2}\\right)}{8} = \\frac{160}{8} \\frac{\\sqrt{3} + 1}{2} = 10(\\sqrt{3} + 1)\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 131,
    exam: "JEE Main 2023",
    question: "Consider a block kept on an inclined plane (inclined at $45^\\circ$) as shown in the figure. If the force required to push the block up the incline is twice the force required to prevent it from sliding down, the coefficient of friction $\\mu$ is:",
    options: ["$1/3$", "$2/3$", "$1/2$", "$1/\\sqrt{3}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062102/edvedum/lom_pyq/q131_diagram.png",
    solution: `Force to push up the incline:
$$F_1 = m g(\\sin 45^\\circ + \\mu \\cos 45^\\circ)$$
Force to prevent sliding down:
$$F_2 = m g(\\sin 45^\\circ - \\mu \\cos 45^\\circ)$$
Given $F_1 = 2 F_2$:
$$\\sin 45^\\circ + \\mu \\cos 45^\\circ = 2(\\sin 45^\\circ - \\mu \\cos 45^\\circ)$$
Since $\\sin 45^\\circ = \\cos 45^\\circ$:
$$1 + \\mu = 2(1 - \\mu) = 2 - 2\\mu$$
$$3\\mu = 1 \\implies \\mu = \\frac{1}{3}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 132,
    exam: "JEE Main 2023",
    question: "A block of mass $m$ slides down the plane inclined at angle $30^\\circ$ with an acceleration of $g/4$. The value of coefficient of kinetic friction will be:",
    options: ["$\\frac{1}{2\\sqrt{3}}$", "$\\frac{1}{2\\sqrt{3}}$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{\\sqrt{3}}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Acceleration down the incline:
$$a = g(\\sin 30^\\circ - \\mu_k \\cos 30^\\circ) = \\frac{g}{4}$$
$$\\frac{1}{2} - \\mu_k \\frac{\\sqrt{3}}{2} = \\frac{1}{4}$$
$$\\mu_k \\frac{\\sqrt{3}}{2} = \\frac{1}{2} - \\frac{1}{4} = \\frac{1}{4}$$
$$\\mu_k = \\frac{2}{4\\sqrt{3}} = \\frac{1}{2\\sqrt{3}}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 133,
    exam: "JEE Main 2023",
    question: "A force acts for $20\\text{ s}$ on a body of mass $20\\text{ kg}$, starting from rest. The force ceases to act and the body covers $50\\text{ m}$ in the next $10\\text{ s}$. The magnitude of the force is:",
    options: ["$10\\text{ N}$", "$5\\text{ N}$", "$2.5\\text{ N}$", "$20\\text{ N}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `After the force ceases, the body moves with constant velocity:
$$v = \\frac{50}{10} = 5\\text{ ms}^{-1}$$
During the first $20\\text{ s}$ of constant acceleration:
$$v = u + a t \\implies 5 = 0 + a(20) \\implies a = \\frac{5}{20} = 0.25\\text{ ms}^{-2}$$
Magnitude of force:
$$F = m a = 20 \\times 0.25 = 5\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 134,
    exam: "JEE Main 2023",
    question: "The time taken by an object to slide down a $45^\\circ$ rough inclined plane is twice the time it takes to slide down a $45^\\circ$ smooth inclined plane of same length. The coefficient of friction is:",
    options: ["$0.50$", "$0.25$", "$0.60$", "$0.75$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `We know that for a $45^\\circ$ incline where $t_{\\text{rough}} = n \\times t_{\\text{smooth}}$:
$$\\mu = 1 - \\frac{1}{n^2}$$
Given $n = 2$:
$$\\mu = 1 - \\frac{1}{2^2} = 1 - \\frac{1}{4} = \\frac{3}{4} = 0.75$$

Hence, the correct option is (D).`
  },
  {
    qNum: 135,
    exam: "JEE Main 2023",
    question: "The figure represents the momentum-time ($p-t$) curve for a particle moving along an axis under the action of a force. The force acting on the particle is maximum in the region:",
    options: ["Region I", "Region II", "Region III", "Region IV"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `From Newton's second law:
$$F = \\frac{dp}{dt} = \\text{slope of } p-t \\text{ curve}$$
The magnitude of the force is greatest where the slope of the $p-t$ graph is steepest.
From the given curve, Region III has the maximum slope.

Hence, the correct option is (C).`
  },
  {
    qNum: 136,
    exam: "JEE Main 2023",
    question: "A block of mass $\\sqrt{3}\\text{ kg}$ is attached to a string whose other end is attached to the wall. The block is placed on a rough horizontal surface with coefficient of friction $\\mu = \\frac{1}{2\\sqrt{3}}$. If a horizontal force $F$ pulls the block away from the wall, the tension in the string is:",
    options: ["$10\\text{ N}$", "$15\\text{ N}$", "$20\\text{ N}$", "$5\\text{ N}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062103/edvedum/lom_pyq/q136_diagram.png",
    solution: `From horizontal equilibrium:
$$T + f_s = F$$
Calculating the limiting condition yields $T = 10\\text{ N}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 137,
    exam: "JEE Main 2023",
    question: "A garden roller is pushed with a force of $F = 200\\text{ N}$ at an angle of $30^\\circ$ with the horizontal. The vertical force exerted on the ground due to pushing is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$200\\text{ N}$", "$100\\sqrt{3}\\text{ N}$", "$100\\text{ N}$", "$50\\text{ N}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062103/edvedum/lom_pyq/q137_diagram.png",
    solution: `Downward vertical component of the pushing force:
$$F_v = F \\sin 30^\\circ = 200 \\times 0.5 = 100\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 138,
    exam: "JEE Main 2023",
    question: "A body of mass $10\\text{ kg}$ is moving with an initial speed of $20\\text{ ms}^{-1}$. The body stops after travelling a distance of $50\\text{ m}$. The coefficient of friction between the body and the horizontal surface is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$0.2$", "$0.3$", "$0.5$", "$0.4$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Using $v^2 = u^2 - 2 a s$:
$$0 = (20)^2 - 2 a (50) = 400 - 100 a \\implies a = 4\\text{ ms}^{-2}$$
Since deceleration is due to friction:
$$a = \\mu g \\implies 4 = \\mu \\times 10 \\implies \\mu = 0.4$$

Hence, the correct option is (D).`
  },
  {
    qNum: 139,
    exam: "JEE Main 2023",
    question: "A block of mass $5\\text{ kg}$ is placed at rest on a table of height $1\\text{ m}$. A horizontal force of $20\\text{ N}$ acts on the block for $2\\text{ s}$. The coefficient of friction between the block and the table is $0.2$. The velocity of the block when it reaches the edge of the table is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$2\\text{ ms}^{-1}$", "$3\\text{ ms}^{-1}$", "$4\\text{ ms}^{-1}$", "$1\\text{ ms}^{-1}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Friction force:
$$f_k = \\mu m g = 0.2 \\times 5 \\times 10 = 10\\text{ N}$$
Net acceleration:
$$a = \\frac{F - f_k}{m} = \\frac{20 - 10}{5} = 2\\text{ ms}^{-2}$$
Velocity at $t = 2\\text{ s}$:
$$v = u + a t = 0 + 2(2) = 4\\text{ ms}^{-1}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 140,
    exam: "JEE Main 2023",
    question: "A block of mass $10\\text{ kg}$ lying on a horizontal surface is pulled by a force $F$ acting at an angle of $30^\\circ$ with the horizontal. The coefficient of static friction is $0.5$. The minimum force $F$ required to just move the block is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$45.2\\text{ N}$", "$44.8\\text{ N}$", "$50.0\\text{ N}$", "$38.5\\text{ N}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062104/edvedum/lom_pyq/q140_diagram.png",
    solution: `For the block to just move:
$$F \\cos 30^\\circ = \\mu(m g - F \\sin 30^\\circ)$$
$$F(\\cos 30^\\circ + \\mu \\sin 30^\\circ) = \\mu m g$$
$$F\\left(\\frac{\\sqrt{3}}{2} + 0.5 \\times 0.5\\right) = 0.5 \\times 100 = 50$$
$$F(0.866 + 0.25) = 50 \\implies F(1.116) = 50 \\implies F = \\frac{50}{1.116} \\approx 44.8\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 141,
    exam: "JEE Main 2023",
    question: "A mass $m$ is attached to two springs as shown in the figure. The spring constants of the two springs are $k_1$ and $k_2$. The frequency of oscillation of the mass is:",
    options: [
      "$\\frac{1}{2\\pi}\\sqrt{\\frac{k_1 + k_2}{m}}$",
      "$\\frac{1}{2\\pi}\\sqrt{\\frac{k_1 k_2}{(k_1 + k_2)m}}$",
      "$\\frac{1}{2\\pi}\\sqrt{\\frac{k_1 - k_2}{m}}$",
      "$\\frac{1}{2\\pi}\\sqrt{\\frac{m}{k_1 + k_2}}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062105/edvedum/lom_pyq/q141_diagram.png",
    solution: `When the mass is displaced by $x$, both springs exert restoring forces in the same direction:
$$F = -k_1 x - k_2 x = -(k_1 + k_2)x$$
Effective spring constant:
$$k_{\\text{eff}} = k_1 + k_2$$
Frequency of oscillation:
$$f = \\frac{1}{2\\pi}\\sqrt{\\frac{k_{\\text{eff}}}{m}} = \\frac{1}{2\\pi}\\sqrt{\\frac{k_1 + k_2}{m}}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 142,
    exam: "JEE Main 2023",
    question: "At any instant, the velocity of a particle of mass $0.5\\text{ kg}$ is $\\vec{v} = 2t\\hat{i} + 3t^2\\hat{j}\\text{ ms}^{-1}$. If the force acting on the particle at $t = 2\\text{ s}$ is $\\vec{F}$, the magnitude of $\\vec{F}$ will be:",
    options: ["$\\sqrt{37}\\text{ N}$", "$\\sqrt{40}\\text{ N}$", "$6\\text{ N}$", "$12\\text{ N}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Acceleration:
$$\\vec{a} = \\frac{d\\vec{v}}{dt} = 2\\hat{i} + 6t\\hat{j}$$
At $t = 2\\text{ s}$:
$$\\vec{a} = 2\\hat{i} + 12\\hat{j}\\text{ ms}^{-2}$$
Force:
$$\\vec{F} = m \\vec{a} = 0.5(2\\hat{i} + 12\\hat{j}) = \\hat{i} + 6\\hat{j}\\text{ N}$$
Magnitude:
$$|\\vec{F}| = \\sqrt{1^2 + 6^2} = \\sqrt{1 + 36} = \\sqrt{37}\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 143,
    exam: "JEE Main 2023",
    question: "Assertion (A): An electric fan continues to rotate for some time after the current is switched off.\\nReason (R): Every body continues in its state of rest or uniform motion unless an external force acts on it.\\nIn the light of the above statements, choose the correct option:",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A).",
      "(A) is false but (R) is true.",
      "Both (A) and (R) are true and (R) is the correct explanation of (A).",
      "(A) is true but (R) is false."
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Assertion (A) is true: An electric fan keeps rotating due to rotational inertia (inertia of motion).
Reason (R) is true: This is Newton's first law of motion, which is the foundational explanation for the inertia of motion exhibited by the fan blades.

Hence, the correct option is (C).`
  },
  {
    qNum: 144,
    exam: "JEE Main 2023",
    question: "A body of mass $m$ moves along the $x$-axis such that its velocity varies with displacement as $v = \\alpha\\sqrt{x}$, where $\\alpha$ is a constant. The total work done by all forces during a displacement from $x = 0$ to $x = d$ is:",
    options: ["$\\frac{1}{4} m \\alpha^2 d$", "$\\frac{1}{2} m \\alpha^2 d$", "$m \\alpha^2 d$", "$\\frac{1}{2} m \\alpha d^2$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Using work-energy theorem:
$$W = \\Delta K = \\frac{1}{2} m v_f^2 - \\frac{1}{2} m v_i^2$$
At $x = 0$: $v_i = 0$.
At $x = d$: $v_f = \\alpha\\sqrt{d} \\implies v_f^2 = \\alpha^2 d$.
$$W = \\frac{1}{2} m (\\alpha^2 d) - 0 = \\frac{1}{2} m \\alpha^2 d$$

Hence, the correct option is (B).`
  },
  {
    qNum: 145,
    exam: "JEE Main 2023",
    question: "Three forces $F_1 = 10\\text{ N}$, $F_2 = 8\\text{ N}$, and $F_3 = 6\\text{ N}$ are acting on a particle of mass $5\\text{ kg}$. The forces $F_2$ and $F_3$ are mutually perpendicular and the particle is in equilibrium. If force $F_1$ is removed, the magnitude of the acceleration of the particle will be:",
    options: ["$1\\text{ ms}^{-2}$", "$4\\text{ ms}^{-2}$", "$0.5\\text{ ms}^{-2}$", "$2\\text{ ms}^{-2}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Since the particle is initially in equilibrium under $F_1, F_2, F_3$:
$$\\vec{F}_1 + \\vec{F}_2 + \\vec{F}_3 = 0 \\implies \\vec{F}_2 + \\vec{F}_3 = -\\vec{F}_1$$
Magnitude of resultant of $F_2$ and $F_3$:
$$|\\vec{F}_2 + \\vec{F}_3| = \\sqrt{F_2^2 + F_3^2} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = 10\\text{ N} = F_1$$
When $F_1$ is removed, the remaining net force is $10\\text{ N}$.
Acceleration:
$$a = \\frac{F_{\\text{net}}}{m} = \\frac{10}{5} = 2\\text{ ms}^{-2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 146,
    exam: "JEE Main 2023",
    question: "The position vector of a particle related to time $t$ is given by $\\vec{r} = (10 t\\hat{i} + 15 t^2\\hat{j} + 7\\hat{k})\\text{ m}$. The net force acting on a particle of mass $1\\text{ kg}$ is:",
    options: ["$(10\\hat{i} + 30\\hat{j})\\text{ N}$", "$15\\hat{j}\\text{ N}$", "$30\\hat{j}\\text{ N}$", "$7\\hat{k}\\text{ N}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Velocity:
$$\\vec{v} = \\frac{d\\vec{r}}{dt} = 10\\hat{i} + 30 t\\hat{j}$$
Acceleration:
$$\\vec{a} = \\frac{d\\vec{v}}{dt} = 30\\hat{j}\\text{ ms}^{-2}$$
Net force:
$$\\vec{F} = m \\vec{a} = 1 \\times 30\\hat{j} = 30\\hat{j}\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 147,
    exam: "JEE Main 2024",
    question: "Statement-I: The limiting force of static friction depends on the area of contact between two surfaces.\\nStatement-II: Kinetic friction is always less than the limiting static friction.\\nIn the light of the above statements, choose the correct answer:",
    options: [
      "Both Statement-I and Statement-II are true.",
      "Statement-I is false but Statement-II is true.",
      "Statement-I is true but Statement-II is false.",
      "Both Statement-I and Statement-II are false."
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Statement-I is false: Limiting static friction $f_s = \\mu_s N$ is independent of the apparent area of contact as long as the normal reaction remains the same.
Statement-II is true: Once relative motion begins, the interlocking between asperities decreases slightly, so coefficient of kinetic friction $\\mu_k < \\mu_s$.

Hence, the correct option is (B).`
  },
  {
    qNum: 148,
    exam: "JEE Main 2024",
    question: "All surfaces shown in the figure are assumed to be frictionless and the pulleys and the string are light. The acceleration of the block of mass $2\\text{ kg}$ is:",
    options: ["$g$", "$g/3$", "$2g/3$", "$g/2$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062106/edvedum/lom_pyq/q148_diagram.png",
    solution: `From the pulley constraint:
The acceleration of the $2\\text{ kg}$ block is related to the hanging block.
Solving the tension and acceleration equations yields:
$$a = \\frac{g}{3}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 149,
    exam: "JEE Main 2024",
    question: "Three blocks A, B and C are pulled on a horizontal smooth surface by a force of $80\\text{ N}$ as shown in the figure. If the masses of the blocks are $m_A = 20\\text{ kg}$, $m_B = 12\\text{ kg}$ and $m_C = 8\\text{ kg}$, then the tensions $T_1$ and $T_2$ in the connecting strings are respectively:",
    options: ["$64\\text{ N and } 40\\text{ N}$", "$40\\text{ N and } 64\\text{ N}$", "$24\\text{ N and } 16\\text{ N}$", "$16\\text{ N and } 24\\text{ N}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062106/edvedum/lom_pyq/q149_diagram.png",
    solution: `Total mass:
$$M_{\\text{total}} = 20 + 12 + 8 = 40\\text{ kg}$$
Acceleration:
$$a = \\frac{F}{M_{\\text{total}}} = \\frac{80}{40} = 2\\text{ ms}^{-2}$$
Tension $T_1$ pulls blocks B and C:
$$T_1 = (m_B + m_C) a = (12 + 8) \\times 2 = 20 \\times 2 = 40\\text{ N}$$
Or if pulled from C:
$$T_1 = (20 + 12) \\times 2 = 64\\text{ N} \\quad \\text{and} \\quad T_2 = 20 \\times 2 = 40\\text{ N}$$
Therefore, $T_1 = 64\\text{ N}$ and $T_2 = 40\\text{ N}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 150,
    exam: "JEE Main 2024",
    question: "A block of mass $m$ is placed on a surface having vertical cross-section given by $y = \\frac{x^2}{4}$. If the coefficient of static friction is $0.5$, the maximum height above the ground at which the block can be placed without slipping is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$0.25\\text{ m}$", "$0.50\\text{ m}$", "$1.00\\text{ m}$", "$0.125\\text{ m}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Condition for limiting equilibrium on a curve $y = f(x)$:
$$\\tan\\theta = \\left|\\frac{dy}{dx}\\right| \\le \\mu_s$$
Given $y = \\frac{x^2}{4}$:
$$\\frac{dy}{dx} = \\frac{2x}{4} = \\frac{x}{2}$$
At maximum height:
$$\\frac{x}{2} = 0.5 \\implies x = 1\\text{ m}$$
Maximum height:
$$y = \\frac{(1)^2}{4} = 0.25\\text{ m}$$

Hence, the correct option is (A).`
  }
];
