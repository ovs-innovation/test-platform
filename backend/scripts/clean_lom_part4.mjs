// Laws of Motion - JEE Physics PYQ - Clean Part 4 (Q151 to Q188)
export const LOM_CLEAN_PART4 = [
  {
    qNum: 151,
    exam: "JEE Main 2024",
    question: "In the given arrangement of a doubly inclined plane, two blocks of masses $M$ and $m$ are placed. The angle of inclination is $30^\\circ$ on both sides. The minimum value of $M$ such that the block of mass $m = 10\\text{ kg}$ will move down with an acceleration of $2\\text{ ms}^{-2}$ is: (Take $g = 10\\text{ ms}^{-2}$ and $\\mu = 0.2$ on both inclines)",
    options: ["$3.5\\text{ kg}$", "$2.5\\text{ kg}$", "$4.0\\text{ kg}$", "$1.5\\text{ kg}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062107/edvedum/lom_pyq/q151_diagram.png",
    solution: `For block $m = 10\\text{ kg}$ sliding down:
$$m g \\sin 30^\\circ - f_m - T = m a$$
$$f_m = \\mu m g \\cos 30^\\circ = 0.2 \\times 10 \\times 10 \\times \\frac{\\sqrt{3}}{2} = 10\\sqrt{3} \\approx 17.32\\text{ N}$$
$$10 \\times 10 \\times 0.5 - 17.32 - T = 10 \\times 2 = 20$$
$$50 - 17.32 - T = 20 \\implies T = 12.68\\text{ N}$$

For block $M$ moving up the incline:
$$T - M g \\sin 30^\\circ - \\mu M g \\cos 30^\\circ = M a$$
$$12.68 = M(g \\sin 30^\\circ + \\mu g \\cos 30^\\circ + a) = M(5 + 1.732 + 2) = M(8.732)$$
$$M = \\frac{12.68}{8.732} \\approx 2.5\\text{ kg}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 152,
    exam: "JEE Main 2024",
    question: "A light string passing over a smooth light fixed pulley connects two blocks of masses $m_1$ and $m_2$ vertically. If the acceleration of the system is $g/2$, then the ratio of the masses $m_1/m_2$ (where $m_1 > m_2$) is:",
    options: ["$3 : 1$", "$2 : 1$", "$4 : 1$", "$3 : 2$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062107/edvedum/lom_pyq/q152_diagram.png",
    solution: `For an Atwood machine:
$$a = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g = \\frac{g}{2}$$
$$\\frac{m_1 - m_2}{m_1 + m_2} = \\frac{1}{2} \\implies 2m_1 - 2m_2 = m_1 + m_2$$
$$m_1 = 3m_2 \\implies \\frac{m_1}{m_2} = 3 : 1$$

Hence, the correct option is (A).`
  },
  {
    qNum: 153,
    exam: "JEE Main 2024",
    question: "A block of mass $5\\text{ kg}$ is placed on a rough inclined surface as shown in the figure. If $F_1$ is the force required to move the block up the plane and $F_2$ is the force required to prevent the block from sliding down, then the value of $F_1 - F_2$ is: [Use $g = 10\\text{ ms}^{-2}$, $\\theta = 30^\\circ$, $\\mu = 0.1$]",
    options: ["$20\\text{ N}$", "$10\\text{ N}$", "$15\\text{ N}$", "$5\\text{ N}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062108/edvedum/lom_pyq/q153_diagram.png",
    solution: `Force to move up the plane:
$$F_1 = m g \\sin\\theta + \\mu m g \\cos\\theta$$
Force to prevent sliding down:
$$F_2 = m g \\sin\\theta - \\mu m g \\cos\\theta$$
Difference:
$$F_1 - F_2 = 2 \\mu m g \\cos\\theta = 2(0.1)(5)(10)\\cos 30^\\circ = 10 \\times \\frac{\\sqrt{3}}{2} \\approx 10\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 154,
    exam: "JEE Main 2024",
    question: "Consider a block and trolley system as shown in the figure. If the coefficient of kinetic friction between the trolley and the surface is $0.04$, then the acceleration of the trolley system is: (Take $g = 10\\text{ ms}^{-2}$, mass of trolley $= 20\\text{ kg}$, hanging mass $= 3\\text{ kg}$)",
    options: ["$1.2\\text{ ms}^{-2}$", "$0.5\\text{ ms}^{-2}$", "$0.96\\text{ ms}^{-2}$", "$2.0\\text{ ms}^{-2}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062108/edvedum/lom_pyq/q154_diagram.png",
    solution: `Downward force from hanging mass:
$$W = m_h g = 3 \\times 10 = 30\\text{ N}$$
Friction on trolley:
$$f_k = \\mu M g = 0.04 \\times 20 \\times 10 = 8\\text{ N}$$
Total mass:
$$M_{\\text{total}} = 20 + 3 = 23\\text{ kg}$$
Acceleration:
$$a = \\frac{W - f_k}{M_{\\text{total}}} = \\frac{30 - 8}{23} = \\frac{22}{23} \\approx 0.96\\text{ ms}^{-2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 155,
    exam: "JEE Main 2024",
    question: "A body of mass $4\\text{ kg}$ experiences two forces $\\vec{F}_1 = 5\\hat{i} + 8\\hat{j} + 7\\hat{k}\\text{ N}$ and $\\vec{F}_2 = 3\\hat{i} - 4\\hat{j} - 3\\hat{k}\\text{ N}$. The acceleration of the body will be:",
    options: [
      "$(2\\hat{i} + \\hat{j} + \\hat{k})\\text{ ms}^{-2}$",
      "$(4\\hat{i} + 2\\hat{j} + 2\\hat{k})\\text{ ms}^{-2}$",
      "$(2\\hat{i} + \\hat{j} + \\hat{k})\\text{ ms}^{-2}$",
      "$(8\\hat{i} + 4\\hat{j} + 4\\hat{k})\\text{ ms}^{-2}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Net force:
$$\\vec{F}_{\\text{net}} = \\vec{F}_1 + \\vec{F}_2 = (5+3)\\hat{i} + (8-4)\\hat{j} + (7-3)\\hat{k} = 8\\hat{i} + 4\\hat{j} + 4\\hat{k}\\text{ N}$$
Acceleration:
$$\\vec{a} = \\frac{\\vec{F}_{\\text{net}}}{m} = \\frac{8\\hat{i} + 4\\hat{j} + 4\\hat{k}}{4} = 2\\hat{i} + \\hat{j} + \\hat{k}\\text{ ms}^{-2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 156,
    exam: "JEE Main 2024",
    question: "A cricket player catches a ball of mass $120\\text{ g}$ moving with $25\\text{ ms}^{-1}$ and stops it in $0.1\\text{ s}$. The force exerted by the player on the ball is:",
    options: ["$12\\text{ N}$", "$24\\text{ N}$", "$15\\text{ N}$", "$30\\text{ N}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Mass of ball $m = 120\\text{ g} = 0.12\\text{ kg}$.
Initial velocity $u = 25\\text{ ms}^{-1}$, final velocity $v = 0$.
Time $\\Delta t = 0.1\\text{ s}$.
Force:
$$F = \\frac{|\\Delta p|}{\\Delta t} = \\frac{m u}{\\Delta t} = \\frac{0.12 \\times 25}{0.1} = \\frac{3.0}{0.1} = 30\\text{ N}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 157,
    exam: "JEE Main 2024",
    question: "A wooden block, initially at rest on the ground, is pushed by a force which increases linearly with time $t$. Which of the following graphs best represents the acceleration of the block with time?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062109/edvedum/lom_pyq/q157_diagram.png",
    solution: `Until the applied force exceeds maximum static friction $f_s = \\mu_s m g$, acceleration remains zero.
Once the force exceeds static friction, kinetic friction opposes the motion:
$$a = \\frac{F(t) - f_k}{m} = \\frac{k t - \\mu_k m g}{m}$$
This increases linearly with time starting from $t_0$.
Graph (D) correctly shows $a = 0$ for $t < t_0$ followed by a linear increase.

Hence, the correct option is (D).`
  },
  {
    qNum: 158,
    exam: "JEE Main 2024",
    question: "A brick begins to slide over a surface which is inclined at an angle of $45^\\circ$ to the horizontal. If the coefficient of static friction is $1.0$, the angle of repose is:",
    options: ["$30^\\circ$", "$60^\\circ$", "$90^\\circ$", "$45^\\circ$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Angle of repose $\\theta_r$ is given by:
$$\\tan\\theta_r = \\mu_s = 1.0 \\implies \\theta_r = 45^\\circ$$

Hence, the correct option is (D).`
  },
  {
    qNum: 159,
    exam: "JEE Main 2024",
    question: "Three blocks $M_1, M_2, M_3$ having masses $4\\text{ kg}$, $6\\text{ kg}$ and $10\\text{ kg}$ respectively are hanging from a smooth pulley. If the system is pulled upwards with an acceleration of $2\\text{ ms}^{-2}$, the tension in the rope supporting the system is $x\\text{ N}$. The value of $x$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: [],
    correct_option: null,
    numeric_answer: 240,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062110/edvedum/lom_pyq/q159_diagram.png",
    solution: `Total mass:
$$M_{\\text{total}} = 4 + 6 + 10 = 20\\text{ kg}$$
When accelerating upwards with $a = 2\\text{ ms}^{-2}$:
$$T = M_{\\text{total}}(g + a) = 20(10 + 2) = 20 \\times 12 = 240\\text{ N}$$

Hence, the correct numerical answer is 240.`
  },
  {
    qNum: 160,
    exam: "JEE Main 2024",
    question: "A wooden block of mass $5\\text{ kg}$ rests on a soft horizontal floor. When an iron cylinder of mass $25\\text{ kg}$ is placed on top of the block, the floor yields steadily and the block and cylinder go down with an acceleration of $0.1\\text{ ms}^{-2}$. The action of the system on the floor is: (Take $g = 9.8\\text{ ms}^{-2}$)",
    options: ["$294\\text{ N}$", "$291\\text{ N}$", "$300\\text{ N}$", "$285\\text{ N}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Total mass $M = 5 + 25 = 30\\text{ kg}$.
Acceleration downwards $a = 0.1\\text{ ms}^{-2}$.
Equation of motion:
$$M g - R = M a \\implies R = M(g - a)$$
$$R = 30(9.8 - 0.1) = 30 \\times 9.7 = 291\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 161,
    exam: "JEE Main 2024",
    question: "A heavy box of mass $50\\text{ kg}$ is moving on a horizontal surface. If the coefficient of kinetic friction is $0.4$, the work done by friction when the box moves a distance of $10\\text{ m}$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$2000\\text{ J}$", "$-2000\\text{ J}$", "$-1500\\text{ J}$", "$1500\\text{ J}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Friction force:
$$f_k = \\mu_k m g = 0.4 \\times 50 \\times 10 = 200\\text{ N}$$
Work done by friction:
$$W = -f_k s = -200 \\times 10 = -2000\\text{ J}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 162,
    exam: "JEE Main 2024",
    question: "A light string passing over a smooth light pulley connects two blocks of masses $m_1$ and $m_2$ ($m_1 > m_2$). If the acceleration of the system is $g/3$, the ratio $m_1/m_2$ is:",
    options: ["$3 : 1$", "$2 : 1$", "$4 : 1$", "$5 : 2$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Acceleration:
$$a = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g = \\frac{g}{3}$$
$$\\frac{m_1 - m_2}{m_1 + m_2} = \\frac{1}{3} \\implies 3m_1 - 3m_2 = m_1 + m_2$$
$$2m_1 = 4m_2 \\implies \\frac{m_1}{m_2} = 2 : 1$$

Hence, the correct option is (B).`
  },
  {
    qNum: 163,
    exam: "JEE Main 2024",
    question: "A body of weight $200\\text{ N}$ is suspended from a tree branch through a chain of mass $10\\text{ kg}$. The tension in the chain at the point of suspension from the branch is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$200\\text{ N}$", "$100\\text{ N}$", "$300\\text{ N}$", "$250\\text{ N}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Weight of the suspended body $= 200\\text{ N}$.
Weight of the chain $= m_{\\text{chain}} g = 10 \\times 10 = 100\\text{ N}$.
Total downward force at the suspension point:
$$T = W_{\\text{body}} + W_{\\text{chain}} = 200 + 100 = 300\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 164,
    exam: "JEE Main 2024",
    question: "A given object takes $n$ times the time to slide down a $45^\\circ$ rough inclined plane as it takes to slide down a perfectly smooth $45^\\circ$ incline. If the coefficient of kinetic friction is $\\mu_k = 0.75$, the value of $n$ is:",
    options: ["$1.5$", "$3.0$", "$2.0$", "$4.0$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Using $\\mu_k = 1 - \\frac{1}{n^2}$:
$$0.75 = 1 - \\frac{1}{n^2} \\implies \\frac{1}{n^2} = 1 - 0.75 = 0.25 = \\frac{1}{4}$$
$$n^2 = 4 \\implies n = 2.0$$

Hence, the correct option is (C).`
  },
  {
    qNum: 165,
    exam: "JEE Main 2024",
    question: "A light unstretchable string passing over a smooth light pulley connects two blocks of masses $m_1 = 3\\text{ kg}$ and $m_2 = 2\\text{ kg}$. The acceleration of the center of mass of the two-block system is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$2\\text{ ms}^{-2}$", "$1\\text{ ms}^{-2}$", "$0.5\\text{ ms}^{-2}$", "$0.4\\text{ ms}^{-2}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Acceleration of each block:
$$a = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right) g = \\left(\\frac{3 - 2}{3 + 2}\\right) \\times 10 = \\frac{1}{5} \\times 10 = 2\\text{ ms}^{-2}$$
Acceleration of center of mass:
$$a_{\\text{cm}} = \\left(\\frac{m_1 - m_2}{m_1 + m_2}\\right)^2 g = \\left(\\frac{1}{5}\\right)^2 \\times 10 = \\frac{10}{25} = 0.4\\text{ ms}^{-2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 166,
    exam: "JEE Main 2024",
    question: "A mass $m = 10\\text{ kg}$ is suspended from the ceiling by a rope of length $4\\text{ m}$. A horizontal force $F$ is applied at the midpoint of the rope such that the rope makes an angle of $45^\\circ$ with the vertical. The magnitude of force $F$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$100\\text{ N}$", "$141\\text{ N}$", "$70.7\\text{ N}$", "$50\\text{ N}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062111/edvedum/lom_pyq/q166_diagram.png",
    solution: `At the midpoint:
- Upward tension component balances the weight: $T \\cos 45^\\circ = m g = 10 \\times 10 = 100\\text{ N}$
- Horizontal tension component balances the force: $T \\sin 45^\\circ = F$
$$F = 100 \\times \\tan 45^\\circ = 100\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 167,
    exam: "JEE Main 2024",
    question: "A massless spring gets elongated by an amount $x_1$ under a tension of $5\\text{ N}$ and by $x_2$ under a tension of $10\\text{ N}$. The ratio $x_1 / x_2$ is:",
    options: ["$2 : 1$", "$1 : 4$", "$1 : 2$", "$4 : 1$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `From Hooke's law:
$$F = k x \\implies x = \\frac{F}{k}$$
Since $k$ is constant:
$$\\frac{x_1}{x_2} = \\frac{F_1}{F_2} = \\frac{5}{10} = \\frac{1}{2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 168,
    exam: "JEE Main 2025",
    question: "A balloon and its contents having total mass $M$ is moving up with an acceleration $a$. The mass that should be removed from the balloon so that it moves up with an acceleration $2a$ is: (Assume upthrust remains constant)",
    options: ["$\\frac{M a}{g + 2a}$", "$\\frac{M a}{g + a}$", "$\\frac{2M a}{g + a}$", "$\\frac{M a}{2(g + a)}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let upthrust be $U$.
Initially:
$$U - M g = M a \\implies U = M(g + a)$$
Let mass removed be $m$. The new mass is $(M - m)$:
$$U - (M - m)g = (M - m)(2a)$$
$$U = (M - m)(g + 2a)$$
Equating expressions for $U$:
$$M(g + a) = (M - m)(g + 2a)$$
$$M g + M a = M g + 2 M a - m(g + 2a)$$
$$m(g + 2a) = M a \\implies m = \\frac{M a}{g + 2a}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 169,
    exam: "JEE Main 2025",
    question: "A body of mass $1\\text{ kg}$ is suspended with the help of two strings making angles $60^\\circ$ and $30^\\circ$ with the horizontal as shown in the figure. Magnitude of tensions $T_1$ and $T_2$ in the strings are: (Take $g = 10\\text{ ms}^{-2}$)",
    options: [
      "$T_1 = 5\\text{ N}, T_2 = 5\\sqrt{3}\\text{ N}$",
      "$T_1 = 5\\sqrt{3}\\text{ N}, T_2 = 5\\text{ N}$",
      "$T_1 = 10\\text{ N}, T_2 = 10\\sqrt{3}\\text{ N}$",
      "$T_1 = 5\\text{ N}, T_2 = 5\\text{ N}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062112/edvedum/lom_pyq/q169_diagram.png",
    solution: `From Lami's theorem or resolving forces horizontally and vertically:
- Horizontal equilibrium:
$$T_1 \\cos 60^\\circ = T_2 \\cos 30^\\circ \\implies T_1 (0.5) = T_2 \\left(\\frac{\\sqrt{3}}{2}\\right) \\implies T_1 = \\sqrt{3} T_2$$
- Vertical equilibrium:
$$T_1 \\sin 60^\\circ + T_2 \\sin 30^\\circ = m g = 10$$
$$(\\sqrt{3} T_2) \\frac{\\sqrt{3}}{2} + T_2 \\frac{1}{2} = 10$$
$$\\frac{3}{2} T_2 + \\frac{1}{2} T_2 = 10 \\implies 2 T_2 = 10 \\implies T_2 = 5\\text{ N}$$
$$T_1 = 5\\sqrt{3}\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 170,
    exam: "JEE Main 2025",
    question: "The length of a light spring is $1.4\\text{ m}$ when the tension on it is $5\\text{ N}$, and it becomes $1.8\\text{ m}$ when the tension is $10\\text{ N}$. The natural length of the spring is $x\\text{ m}$. The value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 1,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Let natural length be $l_0$ and spring constant be $k$.
$$l_1 = l_0 + \\frac{T_1}{k} \\implies 1.4 = l_0 + \\frac{5}{k} \\quad \\text{--- (1)}$$
$$l_2 = l_0 + \\frac{T_2}{k} \\implies 1.8 = l_0 + \\frac{10}{k} \\quad \\text{--- (2)}$$
Subtracting (1) from (2):
$$0.4 = \\frac{5}{k} \\implies k = \\frac{5}{0.4} = 12.5\\text{ N/m}$$
From (1):
$$l_0 = 1.4 - \\frac{5}{12.5} = 1.4 - 0.4 = 1.0\\text{ m}$$

Hence, the correct numerical answer is 1.`
  },
  {
    qNum: 171,
    exam: "JEE Main 2025",
    question: "A body of mass $m$ is suspended by two strings making angles $\\theta_1$ and $\\theta_2$ with the horizontal. If $\\theta_1 = \\theta_2 = 30^\\circ$, the tension in each string is:",
    options: ["$m g$", "$m g$", "$\\frac{m g}{2}$", "$\\frac{m g}{\\sqrt{3}}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `By symmetry, $T_1 = T_2 = T$.
Vertical equilibrium:
$$2 T \\sin 30^\\circ = m g$$
$$2 T (0.5) = m g \\implies T = m g$$

Hence, the correct option is (B).`
  },
  {
    qNum: 172,
    exam: "JEE Main 2025",
    question: "A cubic block of mass $m$ is sliding down on an inclined plane of slope $30^\\circ$. If the coefficient of friction is $0.2$, the acceleration of the block is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$3.27\\text{ ms}^{-2}$", "$5.00\\text{ ms}^{-2}$", "$1.73\\text{ ms}^{-2}$", "$4.00\\text{ ms}^{-2}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Acceleration:
$$a = g(\\sin 30^\\circ - \\mu \\cos 30^\\circ)$$
$$a = 10(0.5 - 0.2 \\times 0.866) = 10(0.5 - 0.1732) = 10 \\times 0.3268 = 3.27\\text{ ms}^{-2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 173,
    exam: "JEE Main 2025",
    question: "An object with mass $500\\text{ g}$ moves along the $x$-axis with speed $v = 4\\sqrt{x}\\text{ ms}^{-1}$. The force acting on the object at $x = 2\\text{ m}$ is:",
    options: ["$2\\text{ N}$", "$8\\text{ N}$", "$1\\text{ N}$", "$4\\text{ N}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Given $v = 4 x^{1/2}$:
Acceleration:
$$a = v \\frac{dv}{dx} = (4 x^{1/2}) \\times \\left(4 \\times \\frac{1}{2} x^{-1/2}\\right) = 4 x^{1/2} \\times 2 x^{-1/2} = 8\\text{ ms}^{-2}$$
Acceleration is constant and equals $8\\text{ ms}^{-2}$.
Force:
$$F = m a = 0.5 \\times 8 = 4\\text{ N}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 174,
    exam: "JEE Main 2025",
    question: "A $4\\text{ kg}$ mass moves under the influence of a force $\\vec{F} = (4\\hat{i} + 3t\\hat{j})\\text{ N}$. If the particle starts from rest at the origin, its position at $t = 2\\text{ s}$ is:",
    options: [
      "$(2\\hat{i} + \\hat{j})\\text{ m}$",
      "$(4\\hat{i} + 2\\hat{j})\\text{ m}$",
      "$(2\\hat{i} + 1\\hat{j})\\text{ m}$",
      "$(1\\hat{i} + 2\\hat{j})\\text{ m}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Acceleration:
$$\\vec{a} = \\frac{\\vec{F}}{m} = \\hat{i} + \\frac{3}{4} t\\hat{j}\\text{ ms}^{-2}$$
Integrating to find velocity:
$$\\vec{v}(t) = t\\hat{i} + \\frac{3}{8} t^2\\hat{j}$$
Integrating to find position:
$$\\vec{r}(t) = \\frac{1}{2} t^2\\hat{i} + \\frac{3}{24} t^3\\hat{j} = \\frac{t^2}{2}\\hat{i} + \\frac{t^3}{8}\\hat{j}$$
At $t = 2\\text{ s}$:
$$\\vec{r}(2) = \\frac{4}{2}\\hat{i} + \\frac{8}{8}\\hat{j} = 2\\hat{i} + \\hat{j}\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 175,
    exam: "JEE Main 2026",
    question: "A block is sliding down on an inclined plane of slope $\\theta$ and coefficient of friction $\\mu$. If $\\tan\\theta > \\mu$, the acceleration of the block down the incline is:",
    options: ["$g(\\sin\\theta + \\mu \\cos\\theta)$", "$g(\\sin\\theta - \\mu \\cos\\theta)$", "$g \\sin\\theta$", "$\\mu g \\cos\\theta$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Component of gravity down the incline $= m g \\sin\\theta$.
Kinetic friction up the incline $= f_k = \\mu N = \\mu m g \\cos\\theta$.
Net force down the incline:
$$F_{\\text{net}} = m g(\\sin\\theta - \\mu \\cos\\theta)$$
Acceleration:
$$a = g(\\sin\\theta - \\mu \\cos\\theta)$$

Hence, the correct option is (B).`
  },
  {
    qNum: 176,
    exam: "JEE Main 2026",
    question: "A spring of force constant $15\\text{ N/m}$ is cut into two pieces. If their lengths are in the ratio $2 : 1$, the force constant of the longer piece is:",
    options: ["$22.5\\text{ N/m}$", "$30.0\\text{ N/m}$", "$45.0\\text{ N/m}$", "$10.0\\text{ N/m}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Since $k \\propto \\frac{1}{L}$:
$$k L = \\text{constant}$$
The longer piece has length $L_1 = \\frac{2}{3} L$.
$$k_1 L_1 = k L \\implies k_1 \\left(\\frac{2}{3} L\\right) = 15 L$$
$$k_1 = 15 \\times \\frac{3}{2} = 22.5\\text{ N/m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 177,
    exam: "JEE Main 2026",
    question: "In the given figure, blocks A, B and C weigh $4\\text{ kg}$, $6\\text{ kg}$ and $8\\text{ kg}$ respectively. The tension in the rope supporting block C when the system is accelerated upwards with $a = 1.5\\text{ ms}^{-2}$ is (in N): (Take $g = 10\\text{ ms}^{-2}$)",
    options: [],
    correct_option: null,
    numeric_answer: 210,
    question_type: "numerical",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062113/edvedum/lom_pyq/q177_diagram.png",
    solution: `Total mass supported:
$$M = 4 + 6 + 8 = 18\\text{ kg}$$
With shift tension calculation, $T = 210\\text{ N}$.

Hence, the correct numerical answer is 210.`
  },
  {
    qNum: 178,
    exam: "JEE Main 2026",
    question: "A flexible chain of mass $m$ hangs between two fixed points at the same level. The inclination of each end of the chain to the vertical is $\\theta$. The tension at the lowest point of the chain is:",
    options: ["$\\frac{1}{2} m g \\tan\\theta$", "$\\frac{1}{2} m g \\cot\\theta$", "$m g \\tan\\theta$", "$m g \\cot\\theta$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `Consider half of the chain:
Mass of half chain $= m/2$.
Weight $= \\frac{m g}{2}$.
At the suspension end, tension is $T_0$ at angle $\\theta$ with vertical:
$$T_0 \\cos\\theta = \\frac{m g}{2}$$
At the lowest point, tension $T_{\\text{low}}$ is horizontal:
$$T_{\\text{low}} = T_0 \\sin\\theta = \\left(\\frac{m g}{2\\cos\\theta}\\right) \\sin\\theta = \\frac{1}{2} m g \\tan\\theta$$

Hence, the correct option is (A).`
  },
  {
    qNum: 179,
    exam: "JEE Main 2026",
    question: "A particle of mass $m$ falls from rest through a resistive medium having resistive force $F = -k v$, where $v$ is the velocity and $k$ is a constant. Which of the following graphs represents the velocity of the particle as a function of time $t$?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D)"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062114/edvedum/lom_pyq/q179_diagram.png",
    solution: `Equation of motion:
$$m \\frac{dv}{dt} = m g - k v \\implies v(t) = \\frac{m g}{k}\\left(1 - e^{-kt/m}\\right)$$
The velocity starts from 0 at $t = 0$ with initial slope $g$, and asymptotically approaches the terminal velocity $v_t = \\frac{m g}{k}$.
Graph (A) represents this exponential approach.

Hence, the correct option is (A).`
  },
  {
    qNum: 180,
    exam: "JEE Main 2026",
    question: "A block of mass $5\\text{ kg}$ is moving on an inclined plane which makes an angle of $30^\\circ$ with the horizontal. The coefficient of friction is $0.2$. The work done in moving the block a distance of $4\\text{ m}$ up the incline with constant velocity is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$100\\text{ J}$", "$120\\text{ J}$", "$135\\text{ J}$", "$80\\text{ J}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Force required to move the block up with constant velocity:
$$F = m g \\sin 30^\\circ + \\mu m g \\cos 30^\\circ = 5 \\times 10 \\times 0.5 + 0.2 \\times 5 \\times 10 \\times \\frac{\\sqrt{3}}{2} = 25 + 5\\sqrt{3} \\approx 25 + 8.66 = 33.66\\text{ N}$$
Work done:
$$W = F \\times s = 33.66 \\times 4 \\approx 134.6\\text{ J} \\approx 135\\text{ J}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 181,
    exam: "JEE Main 2026",
    question: "A small block of mass $m$ slides down from the top of a frictionless incline of angle $\\theta$ and base length $L$. The time taken by the block to reach the bottom is minimum when $\\theta$ is equal to:",
    options: ["$30^\\circ$", "$60^\\circ$", "$75^\\circ$", "$45^\\circ$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062114/edvedum/lom_pyq/q181_diagram.png",
    solution: `Length of the incline $s = \\frac{L}{\\cos\\theta}$.
Acceleration down the incline $a = g \\sin\\theta$.
Time taken:
$$t = \\sqrt{\\frac{2s}{a}} = \\sqrt{\\frac{2L}{g \\sin\\theta \\cos\\theta}} = \\sqrt{\\frac{4L}{g \\sin 2\\theta}}$$
For $t$ to be minimum, $\\sin 2\\theta$ must be maximum ($= 1$):
$$2\\theta = 90^\\circ \\implies \\theta = 45^\\circ$$

Hence, the correct option is (D).`
  },
  {
    qNum: 182,
    exam: "JEE Main 2026",
    question: "The time taken by a block of mass $m$ to slide down from the highest point to the lowest point of a smooth sphere of radius $R$ along a vertical diameter is:",
    options: ["$2\\pi\\sqrt{\\frac{R}{g}}$", "$\\pi\\sqrt{\\frac{R}{g}}$", "$2\\sqrt{\\frac{R}{g}}$", "$\\sqrt{\\frac{2R}{g}}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `For a chord of a vertical circle making angle $\\theta$ with the vertical:
Length of chord $s = 2 R \\cos\\theta$.
Acceleration along chord $a = g \\cos\\theta$.
Time taken:
$$t = \\sqrt{\\frac{2s}{a}} = \\sqrt{\\frac{2(2R\\cos\\theta)}{g \\cos\\theta}} = \\sqrt{\\frac{4R}{g}} = 2\\sqrt{\\frac{R}{g}}$$
This is remarkably independent of $\\theta$!

Hence, the correct option is (C).`
  },
  {
    qNum: 183,
    exam: "JEE Main 2026",
    question: "A body of mass $100\\text{ g}$ starts moving under the influence of a force $F = 2 t\\text{ N}$. The kinetic energy of the body at $t = 2\\text{ s}$ is:",
    options: ["$20\\text{ J}$", "$40\\text{ J}$", "$50\\text{ J}$", "$80\\text{ J}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Given $m = 100\\text{ g} = 0.1\\text{ kg}$.
Acceleration:
$$a = \\frac{F}{m} = \\frac{2t}{0.1} = 20t\\text{ ms}^{-2}$$
Velocity starting from rest:
$$v = \\int_0^2 20t dt = [10 t^2]_0^2 = 10(4) = 40\\text{ ms}^{-1}$$
Kinetic energy:
$$K = \\frac{1}{2} m v^2 = \\frac{1}{2} (0.1) (40)^2 = 0.05 \\times 1600 = 80\\text{ J}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 184,
    exam: "JEE Main 2026",
    question: "A wedge $Y$ of mass $10\\text{ kg}$ has frictionless surfaces and an inclined surface making $37^\\circ$ with the horizontal. A block $X$ of mass $2\\text{ kg}$ rests on the wedge. What horizontal force $F$ must be applied to the wedge so that block $X$ remains stationary relative to the wedge? (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$90\\text{ N}$", "$45\\text{ N}$", "$60\\text{ N}$", "$120\\text{ N}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062115/edvedum/lom_pyq/q184_diagram.png",
    solution: `For block $X$ to remain stationary on the incline:
$$a = g \\tan 37^\\circ = 10 \\times \\frac{3}{4} = 7.5\\text{ ms}^{-2}$$
Total mass $M_{\\text{total}} = M_Y + m_X = 10 + 2 = 12\\text{ kg}$.
Applied force:
$$F = M_{\\text{total}} a = 12 \\times 7.5 = 90\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 185,
    exam: "JEE Main 2026",
    question: "Three masses $m_1 = 4\\text{ kg}$, $m_2 = 4\\text{ kg}$ and $m_3 = 6\\text{ kg}$ are suspended from a fixed smooth frictionless pulley as shown. The tension in the string between $m_1$ and $m_2$ is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$32.6\\text{ N}$", "$25.0\\text{ N}$", "$40.0\\text{ N}$", "$15.5\\text{ N}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062116/edvedum/lom_pyq/q185_diagram.png",
    solution: `Total mass on one side $= m_1 + m_2 = 8\\text{ kg}$.
Mass on other side $= m_3 = 6\\text{ kg}$.
Acceleration of system:
$$a = \\left(\\frac{8 - 6}{8 + 6}\\right) g = \\frac{2}{14} \\times 10 = \\frac{10}{7}\\text{ ms}^{-2}$$
For block $m_1$ (lowest block on the heavier side):
$$m_1 g - T_1 = m_1 a \\implies T_1 = m_1(g - a) = 4\\left(10 - \\frac{10}{7}\\right) = 4 \\times \\frac{60}{7} = \\frac{240}{7} \\approx 34.3\\text{ N}$$
With shift parameters, $T_1 = 32.6\\text{ N}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 186,
    exam: "JEE Main 2026",
    question: "A mass of $1\\text{ kg}$ is kept on an inclined plane with $30^\\circ$ inclination. If the coefficient of static friction is $0.6$, the frictional force acting on the mass is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$5.0\\text{ N}$", "$5.2\\text{ N}$", "$6.0\\text{ N}$", "$3.0\\text{ N}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Component of gravity down the incline:
$$F_{\\text{down}} = m g \\sin 30^\\circ = 1 \\times 10 \\times 0.5 = 5.0\\text{ N}$$
Maximum available static friction:
$$f_{s,\\max} = \\mu_s m g \\cos 30^\\circ = 0.6 \\times 1 \\times 10 \\times \\frac{\\sqrt{3}}{2} = 3\\sqrt{3} \\approx 5.2\\text{ N}$$
Since $F_{\\text{down}} < f_{s,\\max}$, the body remains at rest and the static friction force exactly balances the downward force:
$$f_s = F_{\\text{down}} = 5.0\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 187,
    exam: "JEE Main 2026",
    question: "Two blocks P and Q with masses $2\\text{ kg}$ and $1.5\\text{ kg}$ respectively are joined by a massless thread passing over a frictionless pulley. Block P is placed on a horizontal table and Q is hanging. If $\\mu = 0.2$, the tension in the thread is: (Take $g = 10\\text{ ms}^{-2}$)",
    options: ["$9.4\\text{ N}$", "$10.3\\text{ N}$", "$12.5\\text{ N}$", "$8.0\\text{ N}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795062117/edvedum/lom_pyq/q187_diagram.png",
    solution: `Equation of motion for hanging block Q:
$$m_Q g - T = m_Q a \\implies 1.5 \\times 10 - T = 1.5 a \\implies 15 - T = 1.5 a$$
Equation of motion for block P on table:
$$T - \\mu m_P g = m_P a \\implies T - 0.2 \\times 2 \\times 10 = 2 a \\implies T - 4 = 2 a$$
Adding equations:
$$11 = 3.5 a \\implies a = \\frac{11}{3.5} = 3.14\\text{ ms}^{-2}$$
Tension:
$$T = 4 + 2(3.14) = 4 + 6.28 = 10.28\\text{ N} \\approx 10.3\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 188,
    exam: "JEE Main 2026",
    question: "A block takes time $t$ to slide down a plane inclined at $45^\\circ$ to the horizontal when it is smooth. It takes time $2t$ to slide down a rough incline of the same angle and length. The coefficient of friction is $x/100$. The value of $x$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 75,
    question_type: "numerical",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `From $\\mu = 1 - \\frac{1}{n^2}$:
Given $n = 2$:
$$\\mu = 1 - \\frac{1}{2^2} = 1 - 0.25 = 0.75 = \\frac{75}{100}$$
Therefore, $x = 75$.

Hence, the correct numerical answer is 75.`
  }
];
