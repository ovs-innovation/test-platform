import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = [
  // ==========================================
  // PAGE 4 (Book Pages 71 & 72, Questions 153-161)
  // ==========================================
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A net force $\\vec{F} = 2\\hat{i} - 4\\hat{j} - 10\\hat{k}\\text{ N}$ is applied on a body to accelerate it by $2\\text{ m/s}^2$. The mass of the body is [Take $g = 10\\text{ m/s}^2$]",
    options: [
      "$\\sqrt{30}\\text{ kg}$",
      "$2\\sqrt{30}\\text{ kg}$",
      "$3\\sqrt{30}\\text{ kg}$",
      "$4\\sqrt{30}\\text{ kg}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1. The magnitude of the net force is:\n$$|\\vec{F}| = \\sqrt{2^2 + (-4)^2 + (-10)^2} = \\sqrt{4 + 16 + 100} = \\sqrt{120} = 2\\sqrt{30}\\text{ N}$$\n\n2. From Newton's second law, $F = ma$:\n$$m = \\frac{F}{a} = \\frac{2\\sqrt{30}\\text{ N}}{2\\text{ m/s}^2} = \\sqrt{30}\\text{ kg}$$\n\nHence, the correct option is **(1)**."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "The breaking strength of a uniform light string of length $1\\text{ m}$ is $16\\text{ N}$. A ball of mass $100\\text{ g}$ is tied to one end of the string. The maximum number of revolutions that can be made per second in a horizontal circle of radius $1\\text{ m}$ without breaking the string is (Take $\\pi^2 = 10$)",
    options: [
      "4",
      "3",
      "2",
      "1"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. The centripetal force is provided by the tension in the string:\n$$T = m \\omega^2 R = m (2\\pi n)^2 R = 4 \\pi^2 m n^2 R$$\n\n2. Given $T_{\\max} = 16\\text{ N}$, $m = 100\\text{ g} = 0.1\\text{ kg}$, $R = 1\\text{ m}$, and $\\pi^2 = 10$:\n$$16 = 4 \\times 10 \\times 0.1 \\times n^2 \\times 1$$\n$$16 = 4 n^2 \\implies n^2 = 4 \\implies n = 2\\text{ rev/s}$$\n\nThus, the maximum number of revolutions per second is **2** (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A rocket develops initial thrust of $6.8 \\times 10^5\\text{ N}$ and has a lift-off mass of $1.4 \\times 10^5\\text{ kg}$. The initial acceleration is ($g = 10\\text{ m/s}^2$)",
    options: [
      "Zero",
      "$4.7\\text{ m/s}^2$",
      "$2.7\\text{ m/s}^2$",
      "$1.7\\text{ m/s}^2$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. The weight of the rocket acting vertically downwards at lift-off is:\n$$W = mg = (1.4 \\times 10^5\\text{ kg}) \\times 10\\text{ m/s}^2 = 14 \\times 10^5\\text{ N} = 1.4 \\times 10^6\\text{ N}$$\n\n2. The upward thrust force developed is:\n$$F_{\\text{thrust}} = 6.8 \\times 10^5\\text{ N}$$\n\n3. Since the upward thrust is strictly less than the downward gravitational weight ($F_{\\text{thrust}} < W$), the rocket cannot lift off from the ground, so it remains static on the pad.\n\nTherefore, the initial acceleration is **Zero** (Option 1)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 156,
    question_text: "Tension $T$ in the block of mass $M$ at the distance $x$ from left is given by",
    options: [
      "$T = \\frac{Fx}{L}$",
      "$T = \\frac{F}{x}$",
      "$T = \\frac{F(L - x)}{L}$",
      "$T = \\frac{F(L - x)}{x}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. The total mass of the block is $M$ and total length is $L$. Since the surface is smooth, the common acceleration of the block pulled by force $F$ is:\n$$a = \\frac{F}{M}$$\n\n2. Consider the portion of the block of length $x$ measured from the left end. The mass of this portion is:\n$$m_x = \\left(\\frac{M}{L}\\right) x$$\n\n3. The only horizontal force acting on this left portion of mass $m_x$ to give it acceleration $a$ is the internal tension $T$ across that cross-section:\n$$T = m_x a = \\left(\\frac{M}{L} x\\right) \\left(\\frac{F}{M}\\right) = \\frac{Fx}{L}$$\n\nHence, the correct option is **(1)**."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 157,
    question_text: "A block of mass $1\\text{ kg}$ is projected from the lowest point parallel up the inclined plane. If $g = 10\\text{ m/s}^2$, then the initial retardation experienced by the block is",
    options: [
      "$\\frac{15}{\\sqrt{2}}\\text{ m/s}^2$",
      "$\\frac{5}{\\sqrt{2}}\\text{ m/s}^2$",
      "$\\frac{10}{\\sqrt{2}}\\text{ m/s}^2$",
      "Zero"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. For a body moving up an inclined plane of inclination $\\theta = 45^\\circ$ with friction coefficient $\\mu = 0.5$, both the gravitational component along the incline and kinetic friction act down the plane:\n$$a_{\\text{retardation}} = g(\\sin\\theta + \\mu\\cos\\theta)$$\n\n2. Substituting the values:\n$$a_{\\text{retardation}} = 10\\left(\\sin 45^\\circ + 0.5\\cos 45^\\circ\\right) = 10\\left(\\frac{1}{\\sqrt{2}} + \\frac{0.5}{\\sqrt{2}}\\right) = 10 \\times \\frac{1.5}{\\sqrt{2}} = \\frac{15}{\\sqrt{2}}\\text{ m/s}^2$$\n\nHence, the initial retardation experienced is **$\\frac{15}{\\sqrt{2}}\\text{ m/s}^2$** (Option 1)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 158,
    question_text: "Value of angle '$\\theta$' in the diagram shown is (where $f$ is force of friction and $F$ is applied external force):",
    options: [
      "$30^\\circ$",
      "$45^\\circ$",
      "$60^\\circ$",
      "$75^\\circ$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "1. In the static friction region, static friction is self-adjusting and exactly balances the applied external force:\n$$f_s = F$$\n\n2. In the graph of friction force $f$ (y-axis) versus applied force $F$ (x-axis), the slope is:\n$$\\tan\\theta = \\frac{f_s}{F} = 1 \\implies \\theta = 45^\\circ$$\n\nHence, the correct option is **$45^\\circ$** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A body of mass $2\\text{ kg}$ is moving on a circular path of radius $2\\text{ m}$ with constant speed $2\\text{ m/s}$. Force acting on the body is",
    options: [
      "Zero",
      "$4\\text{ N}$",
      "$8\\text{ N}$",
      "$6\\text{ N}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "1. For uniform circular motion, the acceleration is directed toward the center (centripetal acceleration):\n$$a_c = \\frac{v^2}{R} = \\frac{2^2}{2} = 2\\text{ m/s}^2$$\n\n2. The net centripetal force acting on the body is:\n$$F = m a_c = 2\\text{ kg} \\times 2\\text{ m/s}^2 = 4\\text{ N}$$\n\nHence, the correct option is **$4\\text{ N}$** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 160,
    question_text: "A block $B$ of mass $3\\text{ kg}$ is kept on block $A$ of mass $5\\text{ kg}$ in a lift accelerating upward with an acceleration $g$. Reaction by $A$ on $B$ is",
    options: [
      "$10g$",
      "$16g$",
      "$4g$",
      "$6g$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "1. In an elevator accelerating upwards with acceleration $a = g$, the effective gravitational field experienced is:\n$$g_{\\text{eff}} = g + a = g + g = 2g$$\n\n2. Considering the free-body diagram of block $B$ ($m_B = 3\\text{ kg}$):\n$$N - m_B g = m_B a \\implies N = m_B(g + a) = 3(g + g) = 6g$$\n\nThus, the reaction force exerted by block $A$ on block $B$ is **$6g$** (Option 4)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A body of mass $10\\text{ kg}$ is kept on a rough inclined plane of angle $37^\\circ$ with horizontal. If coefficient of friction between the body and the inclined plane is $0.5$, then acceleration of the body down the inclined plane is",
    options: [
      "$g$",
      "$\\frac{g}{2}$",
      "$\\frac{g}{5}$",
      "$\\frac{g}{3}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. Downward gravitational driving force along the inclined plane:\n$$F_{\\parallel} = mg \\sin 37^\\circ = mg(0.6)$$\n\n2. Maximum static/kinetic friction opposing motion:\n$$f = \\mu N = \\mu mg \\cos 37^\\circ = 0.5 \\times mg(0.8) = 0.4 mg$$\n\n3. Since $F_{\\parallel} > f$ ($0.6 mg > 0.4 mg$), the body accelerates down the plane:\n$$a = \\frac{F_{\\parallel} - f}{m} = g(\\sin 37^\\circ - \\mu\\cos 37^\\circ) = g(0.6 - 0.4) = 0.2g = \\frac{g}{5}$$\n\nHence, the acceleration is **$\\frac{g}{5}$** (Option 3)."
  },

  // ==========================================
  // PAGE 3 (Book Pages 73 & 74, Questions 172-178)
  // ==========================================
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 172,
    question_text: "In three trials a block is pushed by a horizontal applied force on a floor which is half smooth and half rough. The magnitude of applied force $F$ and speed of block after entering the rough surface are given in the table. Coefficient of friction is (Take $g = 10\\text{ ms}^{-2}$)\n\n| Trial | Applied Force $F$ | Speed |\n| :---: | :---: | :---: |\n| 1 | $5\\text{ N}$ | Decrease |\n| 2 | $8\\text{ N}$ | Constant |\n| 3 | $11\\text{ N}$ | Increase |",
    options: [
      "$0.6$",
      "$0.1$",
      "$0.4$",
      "$0.8$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. In Trial 2, when the applied force is $F = 8\\text{ N}$, the speed of the block ($m = 2\\text{ kg}$) remains constant. Constant speed implies zero acceleration ($a = 0$), so the net force is zero:\n$$F - f_k = 0 \\implies f_k = 8\\text{ N}$$\n\n2. The normal force on the horizontal floor is:\n$$N = mg = 2\\text{ kg} \\times 10\\text{ m/s}^2 = 20\\text{ N}$$\n\n3. Therefore, the coefficient of kinetic friction is:\n$$\\mu = \\frac{f_k}{N} = \\frac{8}{20} = 0.4$$\n\nHence, the correct option is **$0.4$** (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 173,
    question_text: "In the given figure all the surfaces are smooth. If wedge starts moving with an acceleration $a = g\\cot\\theta$ then time taken by the block to reach the bottom of the wedge is",
    options: [
      "$\\sqrt{\\frac{2h}{g\\cot\\theta}}$",
      "$\\sqrt{\\frac{2h}{g}}$",
      "$\\sqrt{\\frac{2h}{g\\tan\\theta}}$",
      "$\\sqrt{\\frac{8h}{g}}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    solution: "1. In the accelerated frame of reference of the wedge (accelerating left with $a = g\\cot\\theta$), a horizontal pseudo force $ma$ acts on the block towards the right.\n\n2. The effective acceleration of the block down the incline is:\n$$a_{\\text{down}} = g\\sin\\theta + a\\cos\\theta = g\\sin\\theta + (g\\cot\\theta)\\cos\\theta$$\n$$a_{\\text{down}} = g\\sin\\theta + g\\frac{\\cos^2\\theta}{\\sin\\theta} = g\\left(\\frac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta}\\right) = \\frac{g}{\\sin\\theta}$$\n\n3. The length of the incline of height $h$ is $s = \\frac{h}{\\sin\\theta}$. Starting from rest:\n$$s = \\frac{1}{2} a_{\\text{down}} t^2 \\implies \\frac{h}{\\sin\\theta} = \\frac{1}{2}\\left(\\frac{g}{\\sin\\theta}\\right) t^2$$\n$$t^2 = \\frac{2h}{g} \\implies t = \\sqrt{\\frac{2h}{g}}$$\n\nHence, the time taken is **$\\sqrt{\\frac{2h}{g}}$** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A heavy box is kept on the roof of a stationary bus. When the bus starts, force of friction between the bus and the box",
    options: [
      "Supports the motion of the box",
      "Supports the motion of the bus",
      "Neither opposes nor supports the motion of the box",
      "Neither opposes nor supports the motion of the bus"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1. When the bus accelerates forward, due to inertia of rest, the box tends to slide backward relative to the bus roof.\n2. The static friction exerted by the roof on the box opposes this backward relative slip and therefore acts in the forward direction.\n3. In the ground (inertial) reference frame, this forward friction force is the sole horizontal force accelerating the box forward. Hence, friction **supports the motion of the box**.\n\nCorrect Option: **(1)**."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 175,
    question_text: "A bomb at rest explodes into three equal parts. If two parts move in mutually perpendicular directions with momentum $\\vec{P}_1$, $\\vec{P}_2$ however $\\vec{P}_3$ is momentum of the third part then which of the following vector diagrams is correct?",
    options: [
      "Closed cyclic triangle with $\\vec{P}_1 \\perp \\vec{P}_2$ and $\\vec{P}_3$ connecting head of $\\vec{P}_2$ back to tail of $\\vec{P}_1$",
      "Right triangle where $\\vec{P}_3 = \\vec{P}_1 + \\vec{P}_2$",
      "Triangle with all vectors pointing away from origin",
      "Diagram with $\\vec{P}_3$ pointing along the resultant of $\\vec{P}_1$ and $\\vec{P}_2$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. By the law of conservation of linear momentum (since explosive forces are internal and net external force is zero):\n$$\\vec{P}_{\\text{initial}} = \\vec{P}_{\\text{final}} \\implies 0 = \\vec{P}_1 + \\vec{P}_2 + \\vec{P}_3$$\n$$\\vec{P}_1 + \\vec{P}_2 + \\vec{P}_3 = 0$$\n\n2. For three vectors adding up to zero, they must form a closed polygon (triangle) taken in the same cyclic order (head-to-tail closed loop).\n\n3. Since $\\vec{P}_1 \\perp \\vec{P}_2$, they form the two perpendicular legs, and $\\vec{P}_3 = -(\\vec{P}_1 + \\vec{P}_2)$ closes the triangle from the tip of $\\vec{P}_2$ back to the origin of $\\vec{P}_1$. This matches diagram **(1)**."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A racing car is moving on a banked horizontal circular path of radius of curvature $1000\\text{ m}$. When the car moves with speed $100\\text{ m/s}$, force of friction acting on it becomes zero. Angle of banking of the path is [Take $g = 10\\text{ ms}^{-2}$]",
    options: [
      "$30^\\circ$",
      "$45^\\circ$",
      "$60^\\circ$",
      "$53^\\circ$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "1. The design speed (optimum speed where no lateral friction is required) on a banked road of radius $R$ and inclination $\\theta$ is given by:\n$$\\tan\\theta = \\frac{v^2}{R g}$$\n\n2. Given $v = 100\\text{ m/s}$, $R = 1000\\text{ m}$, and $g = 10\\text{ m/s}^2$:\n$$\\tan\\theta = \\frac{(100)^2}{1000 \\times 10} = \\frac{10000}{10000} = 1 \\implies \\theta = 45^\\circ$$\n\nHence, the angle of banking is **$45^\\circ$** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A stretching force of $15\\text{ N}$ is applied at one end of a spring balance and an equal stretching force is applied at the other end at the same time. What will be the reading of the balance?",
    options: [
      "Zero",
      "$15\\text{ N}$",
      "$30\\text{ N}$",
      "$7.5\\text{ N}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "1. A spring balance measures the tension transmitted through its internal spring.\n2. When equal and opposite forces of $15\\text{ N}$ pull on either end, the spring is in static equilibrium under a uniform tension of $T = 15\\text{ N}$ (exactly as if one end were attached to a rigid wall and the other pulled with $15\\text{ N}$).\n3. Therefore, the reading shown by the spring balance is **$15\\text{ N}$** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 178,
    question_text: "A block of mass $1\\text{ kg}$ rests on horizontal smooth surface. A force of $30\\text{ N}$ acts on the block at angle of $60^\\circ$ with vertical (shown in figure). Acceleration of the block is ($g = 10\\text{ m/s}^2$)",
    options: [
      "$10\\sqrt{7}\\text{ m/s}^2$",
      "$10\\sqrt{3}\\text{ m/s}^2$",
      "$10\\sqrt{2}\\text{ m/s}^2$",
      "$10\\sqrt{5}\\text{ m/s}^2$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    solution: "1. Resolving the force $F = 30\\text{ N}$ acting at $60^\\circ$ to the vertical:\n- Upward vertical component: $F_y = F\\cos 60^\\circ = 30 \\times 0.5 = 15\\text{ N}$\n- Downward weight: $W = mg = 1\\text{ kg} \\times 10\\text{ m/s}^2 = 10\\text{ N}$\n\n2. Since $F_y = 15\\text{ N} > W = 10\\text{ N}$, the block lifts off from the smooth floor ($N = 0$) and accelerates vertically upward as well as horizontally:\n- Vertical acceleration: $a_y = \\frac{F_y - mg}{m} = \\frac{15 - 10}{1} = 5\\text{ m/s}^2$\n- Horizontal acceleration: $a_x = \\frac{F_x}{m} = \\frac{F\\sin 60^\\circ}{m} = \\frac{30 \\times \\frac{\\sqrt{3}}{2}}{1} = 15\\sqrt{3}\\text{ m/s}^2$\n\n3. Net acceleration:\n$$a = \\sqrt{a_x^2 + a_y^2} = \\sqrt{(15\\sqrt{3})^2 + 5^2} = \\sqrt{675 + 25} = \\sqrt{700} = 10\\sqrt{7}\\text{ m/s}^2$$\n\nHence, the acceleration of the block is **$10\\sqrt{7}\\text{ m/s}^2$** (Option 1)."
  },

  // ==========================================
  // PAGE 2 (Book Pages 75 & 76, Questions 183-197)
  // ==========================================
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 183,
    question_text: "A mass of $1\\text{ kg}$ is put on a pan and spring is stretched from its equilibrium position by $10\\text{ cm}$. When pan is released, the block just gets detached for a moment. What should be the minimum value of spring constant for which this can happen? [Take $g = 10\\text{ ms}^{-2}$]",
    options: [
      "$10\\text{ N/m}$",
      "$100\\text{ N/m}$",
      "$1000\\text{ N/m}$",
      "$1\\text{ N/m}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "1. For the block to just detach at the highest point of simple harmonic motion, the downward acceleration must equal $g$ (where the normal force drops to zero):\n$$a_{\\max} = \\omega^2 x_0 = g$$\n\n2. Since $\\omega^2 = \\frac{k}{m}$:\n$$\\frac{k}{m} x_0 = g \\implies k = \\frac{mg}{x_0}$$\n\n3. Given $m = 1\\text{ kg}$, $x_0 = 10\\text{ cm} = 0.1\\text{ m}$, and $g = 10\\text{ m/s}^2$:\n$$k = \\frac{1 \\times 10}{0.1} = 100\\text{ N/m}$$\n\nThus, the minimum spring constant is **$100\\text{ N/m}$** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 184,
    question_text: "Two blocks $A$ and $B$ of masses $2m$ and $4m$ are connected by a string. The block of mass $4m$ is connected by a spring (massless). The string is suddenly cut. The ratio of magnitude of accelerations of masses $2m$ to $4m$ at that instant are",
    options: [
      "$1 : 2$",
      "$2 : 1$",
      "$1 : 4$",
      "$4 : 1$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "1. Prior to cutting the string connecting $A$ and $B$, the system is in equilibrium:\n- Tension in string connecting $A$ and $B$: $T = 2mg$\n- Upward force in spring supporting both blocks: $F_s = (4m + 2m)g = 6mg$\n\n2. At the instant the string is cut:\n- Block $A$ ($2m$) falls freely under gravity: $a_A = g$\n- For block $B$ ($4m$), the spring tension cannot change instantaneously and remains $F_s = 6mg$ upwards:\n$$a_B = \\frac{F_s - 4mg}{4m} = \\frac{6mg - 4mg}{4m} = \\frac{2mg}{4m} = \\frac{g}{2}$$\n\n3. Ratio of acceleration of $2m$ to $4m$:\n$$\\frac{a_A}{a_B} = \\frac{g}{g/2} = 2 : 1$$\n\nHence, the correct option is **$2 : 1$** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "In a pulley-mass system, two bodies of different mass suspended over a pulley through massless string. If masses are interchanged, then what happens to magnitude of acceleration ($a$) and tension ($T$) in the string?",
    options: [
      "$a$ and $T$ both changes",
      "$a$ and $T$ both remains same",
      "$a$ change but $T$ remains same",
      "$T$ change but $a$ remains same"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "1. For an Atwood machine with two suspended masses $m_1$ and $m_2$:\n- Magnitude of acceleration: $a = \\frac{|m_1 - m_2|}{m_1 + m_2} g$\n- Tension in string: $T = \\frac{2 m_1 m_2}{m_1 + m_2} g$\n\n2. Both formulas are completely symmetric under exchange of $m_1$ and $m_2$.\n3. Therefore, the magnitude of acceleration and the tension in the string **both remain the same** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A body of mass $10\\text{ kg}$ is moving according to equation of $x = 3t^2 - t^3$. Force on body becomes zero after a time interval of",
    options: [
      "$0.1\\text{ s}$",
      "$1\\text{ s}$",
      "$2\\text{ s}$",
      "$0.5\\text{ s}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    solution: "1. Given displacement $x(t) = 3t^2 - t^3$:\n$$v(t) = \\frac{dx}{dt} = 6t - 3t^2$$\n$$a(t) = \\frac{dv}{dt} = 6 - 6t$$\n\n2. The net force on the body is $F = ma = 10(6 - 6t)$. Force becomes zero when acceleration is zero:\n$$6 - 6t = 0 \\implies t = 1\\text{ s}$$\n\nHence, force becomes zero after **$1\\text{ s}$** (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "Incorrect statement is:",
    options: [
      "Spring force is due to electromagnetic force between atoms of the material",
      "If string is in equilibrium, then tension in string will be uniform",
      "Normal reaction may act parallel to the surface in contact",
      "Static friction is self-adjusting force"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "1. Normal reaction is by definition the component of contact force that acts **perpendicular (normal)** to the contacting interface.\n2. The component acting parallel to the interface is the frictional force.\n3. Therefore, 'Normal reaction may act parallel to the surface in contact' is false/incorrect, making Option (3) the correct answer."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A body of mass $m$ is in elevator. If elevator is retarding upward with $\\frac{g}{3}$, then reading of weighing machine is (in kgf)",
    options: [
      "$\\frac{2mg}{5}$",
      "$\\frac{4m}{3}$",
      "$\\frac{2m}{3}$",
      "Zero"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. Upward motion with retardation $\\frac{g}{3}$ means the acceleration vector is directed downwards with magnitude $a = \\frac{g}{3}$.\n\n2. In a downward accelerating frame, the apparent weight (normal force) is:\n$$N = m(g - a) = m\\left(g - \\frac{g}{3}\\right) = \\frac{2}{3}mg\\text{ N}$$\n\n3. Since $1\\text{ kgf} = g\\text{ N}$, the reading in kgf is:\n$$\\text{Reading} = \\frac{N}{g} = \\frac{2m}{3}\\text{ kgf}$$\n\nHence, the correct option is **$\\frac{2m}{3}$** (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "Rain drop of mass $0.2\\text{ g}$ is falling freely. Then apparent weight of the drop is",
    options: [
      "Zero",
      "$10^{-3}\\text{ N}$",
      "$10^{-2}\\text{ N}$",
      "$2 \\times 10^{-3}\\text{ N}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1. A body falling freely has a downward acceleration $a = g$.\n2. The apparent weight of any body in free fall is:\n$$W_{\\text{app}} = m(g - a) = m(g - g) = 0$$\n\nTherefore, the apparent weight of the freely falling raindrop is **Zero** (Option 1)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "When we kick a stone, we get hurt. Due to which one of the following properties does it happens?",
    options: [
      "Velocity",
      "Momentum",
      "Inertia",
      "Reaction"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "According to Newton's third law of motion, whenever a body exerts a force on another body (action), the second body simultaneously exerts an equal and opposite force on the first body (reaction). When we kick a stone, the stone exerts an equal and opposite **reaction force** on our foot, which causes pain and injury.\n\nHence, the correct option is **Reaction** (Option 4)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "When we walk on ice, we should take small steps to avoid slipping. This is because smaller step ensure",
    options: [
      "Smaller friction coefficient",
      "Larger friction coefficient",
      "Larger normal force",
      "Smaller normal force"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. While walking, the foot pushes the ground at an angle $\\theta$ with the vertical. The vertical normal force is $N = mg + F\\cos\\theta$, and the maximum available static friction is $f_{\\max} = \\mu N$.\n2. Taking smaller steps keeps the legs more vertical (decreasing the angle $\\theta$), which maximizes the vertical normal reaction and keeps the horizontal required traction force small.\n3. Thus, smaller steps ensure a **larger normal force** (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "A car start from rest to cover distance $x$. The coefficient of kinetic friction between road and tyre is $\\mu$. The minimum time in which the car can cover the distance $x$ is proportional to",
    options: [
      "$\\sqrt{\\mu}$",
      "$\\mu$",
      "$\\frac{1}{\\sqrt{\\mu}}$",
      "$\\frac{1}{\\mu}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. The maximum forward acceleration of a car without slipping is provided by static/kinetic friction:\n$$a_{\\max} = \\mu g$$\n\n2. For distance $x$ covered from rest ($u = 0$):\n$$x = \\frac{1}{2} a_{\\max} t^2 = \\frac{1}{2} (\\mu g) t^2$$\n$$t^2 = \\frac{2x}{\\mu g} \\implies t = \\sqrt{\\frac{2x}{\\mu g}} \\propto \\frac{1}{\\sqrt{\\mu}}$$\n\nHence, the time is proportional to **$\\frac{1}{\\sqrt{\\mu}}$** (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 193,
    question_text: "A body of mass $20\\text{ kg}$ is moving on inclined plane with constant velocity $20\\text{ m/s}$. The coefficient of kinetic friction between incline plane and block is",
    options: [
      "$0.6$",
      "$0.5$",
      "$0.75$",
      "$1$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. When a body moves down an inclined plane of angle $\\theta = 37^\\circ$ at constant velocity, net acceleration is zero:\n$$mg \\sin\\theta - f_k = 0$$\n$$mg \\sin 37^\\circ = \\mu_k mg \\cos 37^\\circ$$\n\n2. Solving for $\\mu_k$:\n$$\\mu_k = \\tan 37^\\circ = \\frac{3}{4} = 0.75$$\n\nHence, the coefficient of kinetic friction is **$0.75$** (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "The upper half of an inclined plane of inclination $\\theta$ is frictionless while lower half is rough. A body start to slip from top of inclined surface and come to rest at bottom. The coefficient of friction ($\\mu$) at lower half of plane is",
    options: [
      "$2\\cot\\theta$",
      "$\\cot\\theta$",
      "$\\tan\\theta$",
      "$2\\tan\\theta$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "1. Let each half of the inclined plane have length $s$ (total length = $2s$).\n- On the upper smooth half: $a_1 = g\\sin\\theta$. Velocity squared at midpoint: $v^2 = 2(g\\sin\\theta)s$.\n- On the lower rough half: $a_2 = g\\sin\\theta - \\mu g\\cos\\theta$.\n\n2. Since the body comes to rest at the bottom ($v_{\\text{final}} = 0$):\n$$0 = v^2 + 2 a_2 s = 2(g\\sin\\theta)s + 2(g\\sin\\theta - \\mu g\\cos\\theta)s$$\n$$2g\\sin\\theta = \\mu g\\cos\\theta \\implies \\mu = 2\\tan\\theta$$\n\nThus, the coefficient of friction is **$2\\tan\\theta$** (Option 4)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 195,
    question_text: "In the given figure what will be the minimum value of $m$ such that system remains in equilibrium?",
    options: [
      "$5\\text{ kg}$",
      "$10\\text{ kg}$",
      "$6\\text{ kg}$",
      "$8\\text{ kg}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. Tension in the string supporting the hanging mass of $4\\text{ kg}$ in equilibrium is:\n$$T = 4g$$\n\n2. The total mass on the horizontal surface is $(5 + m)\\text{ kg}$. The maximum available static friction with $\\mu = 0.4$ is:\n$$f_{\\max} = \\mu (5 + m)g = 0.4 (5 + m)g$$\n\n3. For equilibrium, $f_{\\max} \\ge T$:\n$$0.4(5 + m)g \\ge 4g \\implies 5 + m \\ge \\frac{4}{0.4} = 10 \\implies m \\ge 5\\text{ kg}$$\n\nHence, the minimum value of $m$ is **$5\\text{ kg}$** (Option 1)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "For uniform circular motion, if $\\vec{a} =$ centripetal acceleration, $\\vec{F} =$ centripetal force, $\\vec{r} =$ position vector and $\\vec{v} =$ velocity, then incorrect statement is",
    options: [
      "$\\vec{a} \\cdot \\vec{v} = 0$",
      "$\\vec{F} \\cdot \\vec{v} = 0$",
      "$\\vec{a} \\cdot \\vec{F} = 0$",
      "$\\vec{a} \\cdot \\vec{r} < 0$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "1. In uniform circular motion:\n- Acceleration $\\vec{a}$ is radial (towards the center) and velocity $\\vec{v}$ is tangential, so $\\vec{a} \\perp \\vec{v} \\implies \\vec{a} \\cdot \\vec{v} = 0$.\n- Centripetal force $\\vec{F} = m\\vec{a}$, so $\\vec{F}$ is parallel to $\\vec{a}$ and perpendicular to $\\vec{v} \\implies \\vec{F} \\cdot \\vec{v} = 0$.\n- Position vector $\\vec{r}$ points away from center, while $\\vec{a}$ points towards center (antiparallel), so $\\vec{a} \\cdot \\vec{r} = -a r < 0$.\n- Since $\\vec{F}$ and $\\vec{a}$ point in the exact same direction, $\\vec{a} \\cdot \\vec{F} = m a^2 > 0$, NOT zero!\n\nTherefore, $\\vec{a} \\cdot \\vec{F} = 0$ is the **incorrect statement** (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 197,
    question_text: "A body of mass $10\\text{ kg}$ is kept on a horizontal floor having coefficient of static friction $\\mu_s = 0.5$ and coefficient of kinetic friction $\\mu_k = 0.45$. The force of friction acting on the body is ($g = 10\\text{ m/s}^2$)",
    options: [
      "Zero",
      "$50\\text{ N}$",
      "$45\\text{ N}$",
      "$100\\text{ N}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1. Friction is an opposing contact force that only comes into play when there is impending or actual relative motion.\n2. In this problem, no external horizontal force is applied to the block resting on the horizontal floor.\n3. Since there is zero tendency to slide horizontally, the static frictional force acting on the body is **Zero** (Option 1)."
  },

  // ==========================================
  // PAGE 1 (Book Page 77, Assertion & Reason Questions 6-17)
  // ==========================================
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "**Assertion (A):** A man pushes against a rigid fixed vertical wall but wall remains static.\n**Reason (R):** Whatever force the man exerts on the wall, the wall also exerts an equal and opposite force on the man.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "1. Assertion is true: The wall remains static when pushed by the man.\n2. Reason is true: By Newton's third law, the wall exerts an equal and opposite reaction force on the man.\n3. However, the reason the wall remains static is that the external force applied by the man is balanced by the rigid foundation/ground reaction forces acting on the wall, NOT by the reaction force acting on the man (action and reaction act on different bodies).\n\nHence, both (A) and (R) are true but (R) is not the correct explanation of (A) (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "**Assertion (A):** More external force is required to start motion than to maintain it.\n**Reason (R):** Kinetic friction is less than the limiting friction.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    solution: "1. To start motion from rest, the applied force must exceed the maximum static friction (limiting friction $f_L = \\mu_s N$).\n2. Once the body is in motion, interlocking between microscopic surface asperities is partially broken and the opposing force is kinetic friction ($f_k = \\mu_k N$).\n3. Since $\\mu_k < \\mu_s$, kinetic friction is strictly less than limiting friction ($f_k < f_L$), meaning less force is required to maintain motion than to initiate it.\n\nTherefore, both (A) and (R) are true and (R) is the correct explanation of (A) (Option 1)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "**Assertion (A):** Three concurrent forces are $F_1, F_2$ and $F_3$. Angle between $F_1$ and $F_2$ is $30^\\circ$ and between $F_1$ and $F_3$ is $120^\\circ$. Under these conditions, forces cannot remain in equilibrium.\n**Reason (R):** At least one angle should be greater than $180^\\circ$.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    solution: "1. Assertion is true: If the angle between $F_1$ and $F_2$ is $30^\\circ$ and between $F_1$ and $F_3$ is $120^\\circ$, all three forces lie on the same semi-plane side of a dividing line, so their resultant cannot be zero under any positive magnitudes.\n2. Reason is false: For three concurrent coplanar forces to be in equilibrium, each internal angle between consecutive forces must be strictly less than $180^\\circ$ (if any angle were $>180^\\circ$, the forces could not form a closed triangle).\n\nHence, (A) is true statement but (R) is false (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "**Assertion (A):** Two identical blocks are placed over a rough inclined plane. One block is given an upward velocity and the other in downward direction. If $\\mu = 1/3$ and $\\theta = 45^\\circ$ the ratio of magnitudes of accelerations of two blocks is $2 : 1$.\n**Reason (R):** The desired ratio is $\\frac{1 + \\mu}{1 - \\mu}$.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. For the block projected up the incline: $a_{\\text{up}} = g(\\sin\\theta + \\mu\\cos\\theta)$.\n2. For the block sliding down the incline: $a_{\\text{down}} = g(\\sin\\theta - \\mu\\cos\\theta)$.\n3. For $\\theta = 45^\\circ$, $\\sin 45^\\circ = \\cos 45^\\circ = \\frac{1}{\\sqrt{2}}$, so:\n$$\\frac{a_{\\text{up}}}{a_{\\text{down}}} = \\frac{\\sin 45^\\circ + \\mu\\cos 45^\\circ}{\\sin 45^\\circ - \\mu\\cos 45^\\circ} = \\frac{1 + \\mu}{1 - \\mu}$$\n4. Substituting $\\mu = 1/3$:\n$$\\frac{1 + 1/3}{1 - 1/3} = \\frac{4/3}{2/3} = \\frac{2}{1} = 2 : 1$$\n\nThus, both (A) and (R) are true and (R) is the correct explanation of (A) (Option 1)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 10,
    question_text: "**Assertion (A):** A block $A$ is just placed inside a smooth box $B$ as shown in figure. Now, the box is given an acceleration $\\vec{a} = (3\\hat{i} - 2\\hat{j})\\text{ m s}^{-2}$. Under this acceleration block $A$ cannot remain in the position shown w.r.t. box.\n**Reason (R):** Block will require $ma$ force for moving with acceleration $a$.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "hard",
    solution: "1. In the frame of reference of box $B$ (accelerating with $\\vec{a} = 3\\hat{i} - 2\\hat{j}$), the pseudo force on block $A$ is:\n$$\\vec{F}_p = -m\\vec{a} = -3m\\hat{i} + 2m\\hat{j}$$\n2. The horizontal pseudo force $-3m\\hat{i}$ pushes the block firmly against the left vertical wall of the box, which provides a normal reaction $N_x = 3m$.\n3. In the vertical direction, downward gravitational force is $mg = 10m$ and pseudo force is $2m$ upwards, so net downward force is $10m - 2m = 8m > 0$, pressing the block firmly into the floor of the box.\n4. Therefore, the block remains securely in its corner position relative to the box without slipping or floating away! Thus Assertion (A) is false.\n\nHence, Option (4) is correct."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 11,
    question_text: "**Assertion (A):** A block is kept at rest on a rough ground as shown. Two forces $F_1$ and $F_2$ are acting on it. If we increase either of the two forces $F_1$ or $F_2$, force of friction acting on the block will increase.\n**Reason (R):** By increasing $F_1$, normal reaction from ground will decrease.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "1. In the figure, $F_1$ acts vertically downward. Normal reaction is $N = mg + F_1$. Therefore, increasing $F_1$ increases the normal reaction, so Reason (R) is false.\n2. When the block is at rest, static friction only opposes the horizontal force $F_2$ ($f = F_2$). Increasing $F_1$ (vertical) does not change the static friction acting on the stationary block; it only increases the maximum limit ($f_L$). Thus, Assertion (A) is also false.\n\nHence, both (A) and (R) are false statements (Option 4)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 12,
    question_text: "**Assertion (A):** In the figure shown, force of friction on $A$ by $B$ will be rightwards direction.\n**Reason (R):** Friction always opposes the relative motion between two bodies in contact.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    solution: "1. Block $A$ is pulled leftward by $F_1$ and block $B$ is pulled rightward by $F_2$. The relative velocity of block $A$ relative to block $B$ is directed towards the left.\n2. Frictional force always opposes relative sliding motion between contacting surfaces. Therefore, the friction force exerted by surface $B$ on block $A$ must be directed towards the right.\n\nThus, both (A) and (R) are true and (R) is the correct explanation of (A) (Option 1)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 13,
    question_text: "**Assertion (A):** In the figure shown tension in string $AB$ always lies between $m_1 g$ and $m_2 g$ ($m_1 \\ne m_2$).\n**Reason (R):** Tension in massless string is uniform throughout.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    solution: "1. String $AB$ supports the entire pulley. In an Atwood machine, the tension in the string supporting masses $m_1$ and $m_2$ is $T = \\frac{2m_1 m_2}{m_1 + m_2}g$.\n2. The tension in string $AB$ supporting the massless pulley is $T_{AB} = 2T = \\frac{4m_1 m_2}{m_1 + m_2}g$.\n3. If $m_1 \\approx m_2 = m$, $T_{AB} = 2mg$, which is strictly greater than both $m_1 g$ and $m_2 g$. It does NOT lie between $m_1 g$ and $m_2 g$. Thus Assertion (A) is false.\n\nHence, Option (4) is correct."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "**Assertion (A):** A frame in motion is not necessarily a non-inertial frame.\n**Reason (R):** Two frames $S_1$ and $S_2$ are non-inertial. Then frame $S_2$ when observed from $S_1$ is inertial.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    solution: "1. Assertion is true: A frame moving with uniform velocity (zero acceleration) relative to an inertial frame is also an inertial frame.\n2. Reason is false: If two frames $S_1$ and $S_2$ are accelerating with respect to an inertial frame, the relative acceleration of $S_2$ with respect to $S_1$ is $\\vec{a}_{2/1} = \\vec{a}_2 - \\vec{a}_1$. Unless $\\vec{a}_1 = \\vec{a}_2$ at all times, frame $S_2$ is non-inertial relative to $S_1$.\n\nHence, (A) is true statement but (R) is false (Option 3)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    diagram_id: 15,
    question_text: "**Assertion (A):** Minimum force is needed to move a block on rough surface, if $\\theta =$ angle of friction.\n**Reason (R):** Angle of friction and angle of repose are numerically same.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    solution: "1. Assertion is true: The pulling force required to move a block at angle $\\theta$ to the horizontal is $F = \\frac{\\mu mg}{\\cos\\theta + \\mu\\sin\\theta}$. This force is minimum when $\\tan\\theta = \\mu$, i.e., when $\\theta = \\lambda$ (the angle of friction).\n2. Reason is true: The angle of friction ($\\lambda = \\tan^{-1}\\mu$) and the angle of repose ($\\alpha = \\tan^{-1}\\mu$) are numerically identical.\n3. However, (R) is simply a definition comparison and is not the mathematical reason why force is minimized when pulled at angle of friction.\n\nHence, both (A) and (R) are true but (R) is not the correct explanation of (A) (Option 2)."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "**Assertion (A):** When a person walks on a rough surface, the frictional force exerted by surface on the person is opposite to the direction of his motion.\n**Reason (R):** It is the force exerted by the road on the person that oppose the motion.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    solution: "1. When walking forward, a person pushes backward on the ground with their feet.\n2. By Newton's third law, the rough ground exerts a forward static frictional force on the person's feet.\n3. This forward friction force is precisely the external force that drives the person forward in the direction of motion.\n4. Therefore, friction acts in the direction of motion, not opposite to it. Both (A) and (R) are false statements.\n\nHence, Option (4) is correct."
  },
  {
    category: "Physics",
    chapter: "Laws of Motion",
    question_type: "mcq",
    question_text: "**Assertion (A):** A book on a horizontal table is observed to be at rest, therefore the net external force on it must be zero.\n**Reason (R):** Normal reaction on a body depends only on the mass of the body.",
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true statement but (R) is false",
      "Both (A) and (R) are false statements"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    solution: "1. Assertion is true: By Newton's first law of motion, a body at rest has zero acceleration, which necessitates that the net external force acting on it is zero ($\\sum \\vec{F} = 0$).\n2. Reason is false: The normal reaction is an adjustable contact force that depends on other applied external forces (e.g. upward or downward pulls/pushes, acceleration of the frame, inclination of the surface), not exclusively on the mass of the body.\n\nHence, (A) is true statement but (R) is false (Option 3)."
  }
];

const outPath = path.resolve(__dirname, 'laws_of_motion/lom_batch2.json');
fs.writeFileSync(outPath, JSON.stringify(questions, null, 2), 'utf8');
console.log(`Successfully generated ${questions.length} Batch 2 questions at ${outPath}`);
