export const POTENTIAL_BATCH2_P3 = [
  // Page 38: Q148 to Q154
  {
    q_num: 148,
    question_text: "In the figure, a capacitor is filled with dielectrics. The resultant capacitance between $X$ and $Y$ is (symbols have usual meanings)",
    options: [
      "$\\frac{2\\varepsilon_0 A}{d}\\left[\\frac{1}{K_1} + \\frac{1}{K_2} + \\frac{1}{K_3}\\right]$",
      "$\\frac{\\varepsilon_0 A}{d}\\left[\\frac{1}{K_1} + \\frac{1}{K_2} + \\frac{1}{K_3}\\right]$",
      "$\\frac{2\\varepsilon_0 A}{d}\\left[\\frac{K_1 + K_2 + K_3}{K_1 + K_2}\\right]$",
      "$\\frac{\\varepsilon_0 A}{2d}\\left[\\frac{2K_1 K_2 + K_1 K_3 + K_2 K_3}{K_1 + K_2}\\right]$"
    ],
    correct_index: 3,
    topic: "Capacitor with Multiple Dielectrics",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q148_three_dielectrics.png",
    solution: "1. The capacitor has plate area $A$ and separation $d$.\n2. Left half has area $A/2$ and is divided into two slabs of thickness $d/2$ in series:\n- Top slab: Dielectric $K_1$, area $A/2$, thickness $d/2$:\n$$C_1 = \\frac{K_1 \\varepsilon_0 (A/2)}{d/2} = \\frac{K_1 \\varepsilon_0 A}{d}$$\n- Bottom slab: Dielectric $K_2$, area $A/2$, thickness $d/2$:\n$$C_2 = \\frac{K_2 \\varepsilon_0 (A/2)}{d/2} = \\frac{K_2 \\varepsilon_0 A}{d}$$\n- Series combination of the left half:\n$$C_{\\text{left}} = \\frac{C_1 C_2}{C_1 + C_2} = \\frac{\\varepsilon_0 A}{d}\\left(\\frac{K_1 K_2}{K_1 + K_2}\\right)$$\n3. Right half has area $A/2$ and thickness $d$, filled with dielectric $K_3$:\n$$C_{\\text{right}} = \\frac{K_3 \\varepsilon_0 (A/2)}{d} = \\frac{\\varepsilon_0 A}{2d} K_3$$\n4. The left and right halves are in parallel:\n$$C_{XY} = C_{\\text{left}} + C_{\\text{right}} = \\frac{\\varepsilon_0 A}{d}\\left(\\frac{K_1 K_2}{K_1 + K_2}\\right) + \\frac{\\varepsilon_0 A}{2d} K_3$$\n$$C_{XY} = \\frac{\\varepsilon_0 A}{2d}\\left[\\frac{2K_1 K_2}{K_1 + K_2} + K_3\\right] = \\frac{\\varepsilon_0 A}{2d}\\left[\\frac{2K_1 K_2 + K_3(K_1 + K_2)}{K_1 + K_2}\\right] = \\frac{\\varepsilon_0 A}{2d}\\left[\\frac{2K_1 K_2 + K_1 K_3 + K_2 K_3}{K_1 + K_2}\\right]$$"
  },
  {
    q_num: 149,
    question_text: "Electric potential at an inside point from the centre of a conducting sphere of radius $R$ and carrying charge $Q$ is",
    options: [
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R}$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r}$",
      "Zero",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R^2}$"
    ],
    correct_index: 0,
    topic: "Potential Inside a Conducting Sphere",
    difficulty: "easy",
    image_url: "",
    solution: "1. Inside a charged conducting sphere in electrostatic equilibrium, the electric field is strictly zero everywhere ($\\vec{E} = 0$).\n2. Since $\\vec{E} = -\\frac{dV}{dr} = 0$, the electrostatic potential $V$ is uniform and constant throughout the entire volume of the sphere.\n3. The potential at any inside point equals the potential on its surface ($r = R$):\n$$V_{\\text{inside}} = V_{\\text{surface}} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R}$$"
  },
  {
    q_num: 150,
    question_text: "In the circuit shown in figure, the charge stored in the capacitor of capacity $30\\;\\mu\\text{F}$ is",
    options: [
      "$450\\;\\mu\\text{C}$",
      "$1500\\;\\mu\\text{C}$",
      "$1350\\;\\mu\\text{C}$",
      "$90\\;\\mu\\text{C}$"
    ],
    correct_index: 0,
    topic: "Series Capacitor Circuit Analysis",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q150_three_caps_series.png",
    solution: "1. In the circuit, three capacitors $C_1 = 15\\;\\mu\\text{F}$, $C_2 = 30\\;\\mu\\text{F}$, and $C_3 = 90\\;\\mu\\text{F}$ are connected in series across a $50\\text{ V}$ battery.\n2. The equivalent capacitance $C_{\\text{eq}}$ of the series combination is:\n$$\\frac{1}{C_{\\text{eq}}} = \\frac{1}{15} + \\frac{1}{30} + \\frac{1}{90} = \\frac{6 + 3 + 1}{90} = \\frac{10}{90} = \\frac{1}{9\\;\\mu\\text{F}}$$\n$$C_{\\text{eq}} = 9\\;\\mu\\text{F}$$\n3. In a series combination, the charge on each capacitor is identical and equal to the total charge supplied by the battery:\n$$Q = C_{\\text{eq}} V = 9\\;\\mu\\text{F} \\times 50\\text{ V} = 450\\;\\mu\\text{C}$$\n4. Therefore, the charge stored in the $30\\;\\mu\\text{F}$ capacitor is $450\\;\\mu\\text{C}$."
  },
  {
    q_num: 151,
    question_text: "Two capacitors of capacitances $1\\;\\mu\\text{F}$ and $2\\;\\mu\\text{F}$ are connected in series and can withstand breakdown voltages of $6\\text{ kV}$ and $4\\text{ kV}$ respectively. The combination can withstand a maximum voltage of",
    options: ["$6\\text{ kV}$", "$4\\text{ kV}$", "$10\\text{ kV}$", "$9\\text{ kV}$"],
    correct_index: 3,
    topic: "Breakdown Voltage in Series Capacitors",
    difficulty: "medium",
    image_url: "",
    solution: "1. For capacitors in series, the charge $Q$ on each capacitor must be identical:\n$$Q = C_1 V_1 = C_2 V_2$$\n$$(1\\;\\mu\\text{F}) V_1 = (2\\;\\mu\\text{F}) V_2 \\implies V_1 = 2 V_2$$\n2. Checking the breakdown conditions:\n- If capacitor 2 operates at its maximum limit $V_2 = 4\\text{ kV}$:\n$$V_1 = 2(4\\text{ kV}) = 8\\text{ kV} > 6\\text{ kV}$$\nCapacitor 1 would break down and fail!\n- Therefore, capacitor 1 limits the operation: set $V_1 = 6\\text{ kV}$:\n$$V_2 = \\frac{V_1}{2} = \\frac{6\\text{ kV}}{2} = 3\\text{ kV} \\le 4\\text{ kV}$$\nCapacitor 2 operates safely within its limit.\n3. The maximum total voltage the combination can withstand is:\n$$V_{\\text{max}} = V_1 + V_2 = 6\\text{ kV} + 3\\text{ kV} = 9\\text{ kV}$$"
  },
  {
    q_num: 152,
    question_text: "Two identical capacitors are connected in series with a source of potential $V$. If a dielectric of constant $K$ is introduced in one of the capacitors, then the potential difference across the unfilled capacitor becomes",
    options: [
      "$\\frac{KV}{K + 1}$",
      "$\\frac{V}{K + 1}$",
      "$\\frac{K + 1}{KV}$",
      "$\\frac{V}{2K}$"
    ],
    correct_index: 0,
    topic: "Potential Division with Dielectric",
    difficulty: "medium",
    image_url: "",
    solution: "1. Let $C$ be the capacitance of the unfilled capacitor.\n2. When dielectric $K$ is inserted in the other capacitor, its capacitance becomes $C_K = K C$.\n3. The two capacitors $C$ and $K C$ are in series across total potential $V$.\n4. In a series circuit, voltage divides inversely proportional to capacitance:\n$$V_{\\text{unfilled}} = \\left(\\frac{C_K}{C + C_K}\\right) V = \\left(\\frac{K C}{C + K C}\\right) V = \\frac{K V}{K + 1}$$"
  },
  {
    q_num: 153,
    question_text: "Two capacitors of capacitances $C_1$ and $C_2$ are charged to the same potential $V$. The ratio of their electrostatic energies is",
    options: [
      "$\\frac{C_1}{C_2}$",
      "$\\frac{C_2}{C_1}$",
      "$\\left(\\frac{C_1}{C_2}\\right)^2$",
      "$\\left(\\frac{C_2}{C_1}\\right)^2$"
    ],
    correct_index: 0,
    topic: "Energy Stored in Capacitor",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electrostatic energy stored in a capacitor of capacitance $C$ at potential difference $V$ is:\n$$U = \\frac{1}{2} C V^2$$\n2. Since both capacitors are charged to the same potential $V$:\n$$U_1 = \\frac{1}{2} C_1 V^2,\\quad U_2 = \\frac{1}{2} C_2 V^2$$\n3. The ratio of their electrostatic energies is:\n$$\\frac{U_1}{U_2} = \\frac{\\frac{1}{2} C_1 V^2}{\\frac{1}{2} C_2 V^2} = \\frac{C_1}{C_2}$$"
  },
  {
    q_num: 154,
    question_text: "Five identical capacitors each of capacity $C$ are connected in a loop as shown in the figure. The ratio of capacitance between $P$ and $R$ to that between $P$ and $Q$ is",
    options: ["$3 : 1$", "$1 : 3$", "$2 : 3$", "$3 : 2$"],
    correct_index: 2,
    topic: "Capacitor Polygon Ring",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q154_pentagon_caps.png",
    solution: "1. Five identical capacitors are connected in a closed ring (pentagon) of 5 nodes: $P, Q, R, S, T$.\n2. Capacitance across terminals $P$ and $R$:\n- Path 1 goes through 2 capacitors in series ($P \\to Q \\to R$):\n$$C_1 = \\frac{C}{2}$$\n- Path 2 goes through 3 capacitors in series ($P \\to T \\to S \\to R$):\n$$C_2 = \\frac{C}{3}$$\n- Since Path 1 and Path 2 are in parallel across $P$ and $R$:\n$$C_{PR} = C_1 + C_2 = \\frac{C}{2} + \\frac{C}{3} = \\frac{5C}{6}$$\n3. Capacitance across terminals $P$ and $Q$:\n- Path 1 consists of 1 direct capacitor ($P \\to Q$):\n$$C_1' = C$$\n- Path 2 consists of 4 capacitors in series ($P \\to T \\to S \\to R \\to Q$):\n$$C_2' = \\frac{C}{4}$$\n- In parallel:\n$$C_{PQ} = C + \\frac{C}{4} = \\frac{5C}{4}$$\n4. Taking the ratio:\n$$\\frac{C_{PR}}{C_{PQ}} = \\frac{\\frac{5C}{6}}{\\frac{5C}{4}} = \\frac{4}{6} = \\frac{2}{3} = 2 : 3$$"
  },

  // Page 39: Q155 to Q164
  {
    q_num: 155,
    question_text: "The flow of charge through switch $S$, when it is closed is",
    options: ["$\\frac{q}{4}$", "$\\frac{q}{3}$", "$\\frac{2q}{3}$", "Zero"],
    correct_index: 3,
    topic: "Charge Redistribution in Symmetrical Switch Loop",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q155_switch_loop.png",
    solution: "1. Before closing switch $S$, each of the two bottom capacitors ($6\\;\\mu\\text{F}$ and $3\\;\\mu\\text{F}$) carries charge $+q$ on its left plate and $-q$ on its right plate.\n2. The switch $S$ is placed between the negative plate of the $6\\;\\mu\\text{F}$ capacitor and the positive plate of the $3\\;\\mu\\text{F}$ capacitor.\n3. Since both plates possess charges of equal magnitude $q$ and opposite signs ($-q$ and $+q$), the net charge on the isolated island formed at the switch is:\n$$q_{\\text{island}} = -q + q = 0$$\n4. Because the island is neutral and symmetric with the potential equilibrium of the parallel branches, no net charge is transferred across the switch on closing it.\n5. Therefore, the flow of charge through switch $S$ is Zero."
  },
  {
    q_num: 156,
    question_text: "Electric potential at a point $P(x, y, z)$ is $(x + y + z)\\text{ V}$. Electric field in that region is",
    options: [
      "$x^2\\hat{i} + y^2\\hat{j} + z^2\\hat{k}\\text{ V/m}$",
      "$(\\hat{i} + \\hat{j} + \\hat{k})\\text{ V/m}$",
      "$-(\\hat{i} + \\hat{j} + \\hat{k})\\text{ V/m}$",
      "$-(x\\hat{i} + y\\hat{j} + z\\hat{k})\\text{ V/m}$"
    ],
    correct_index: 2,
    topic: "Electric Field from Potential Gradient",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electric field vector $\\vec{E}$ is related to electric potential $V$ by:\n$$\\vec{E} = -\\vec{\\nabla} V = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right)$$\n2. Given $V(x, y, z) = x + y + z$:\n$$\\frac{\\partial V}{\\partial x} = 1,\\quad \\frac{\\partial V}{\\partial y} = 1,\\quad \\frac{\\partial V}{\\partial z} = 1$$\n3. Therefore:\n$$\\vec{E} = -(1\\hat{i} + 1\\hat{j} + 1\\hat{k}) = -(\\hat{i} + \\hat{j} + \\hat{k})\\text{ V/m}$$"
  },
  {
    q_num: 157,
    question_text: "An air filled parallel plate capacitor is charged to potential $20\\text{ V}$ and then isolated from the battery. If a dielectric slab of dielectric constant $K = 4$ is filled to fill the space completely, then new potential difference across the plates is",
    options: ["$20\\text{ V}$", "$5\\text{ V}$", "$80\\text{ V}$", "$4\\text{ V}$"],
    correct_index: 1,
    topic: "Dielectric Insertion in Isolated Capacitor",
    difficulty: "easy",
    image_url: "",
    solution: "1. When a capacitor is isolated from the battery, its stored charge $Q$ remains constant.\n2. When completely filled with a dielectric of constant $K = 4$, its capacitance increases by a factor of $K$:\n$$C' = K C = 4C$$\n3. The new potential difference across the plates is:\n$$V' = \\frac{Q}{C'} = \\frac{Q}{KC} = \\frac{V}{K}$$\n4. Given initial potential $V = 20\\text{ V}$ and $K = 4$:\n$$V' = \\frac{20\\text{ V}}{4} = 5\\text{ V}$$"
  },
  {
    q_num: 158,
    question_text: "Two concentric metallic spherical shells $A$ and $B$ of radii $a$ and $b$ respectively ($b > a$) are arranged such that outer shell is earthed and inner shell is charged to $Q$. Charge on the outer surface of outer shell will be",
    options: [
      "$-\\frac{Qa}{b}$",
      "$Q\\left(1 - \\frac{a}{b}\\right)$",
      "$-Q$",
      "Zero"
    ],
    correct_index: 3,
    topic: "Concentric Spherical Shells and Earthing",
    difficulty: "medium",
    image_url: "",
    solution: "1. Shell $A$ (radius $a$) carries charge $+Q$. By Gauss's Law, an induced charge of $-Q$ appears on the inner surface of the outer shell $B$ (radius $b$).\n2. Shell $B$ is earthed, which sets its potential to zero ($V_B = 0$).\n3. Because the region outside shell $B$ extends to infinity (where $V_\\infty = 0$), the electric field outside shell $B$ must be identically zero ($E_{\\text{outside}} = 0$).\n4. By Gauss's Law, the net charge enclosed by any sphere of radius $r > b$ must be zero, which means the charge on the outer surface of outer shell $B$ must be Zero."
  },
  {
    q_num: 159,
    question_text: "In the circuit shown in figure, energy stored in $6\\;\\mu\\text{F}$ capacitor will be",
    options: [
      "$48 \\times 10^{-6}\\text{ J}$",
      "$32 \\times 10^{-6}\\text{ J}$",
      "$96 \\times 10^{-6}\\text{ J}$",
      "$24 \\times 10^{-6}\\text{ J}$"
    ],
    correct_index: 0,
    topic: "Energy Stored in Capacitor in DC Circuit",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q159_two_loop_batteries.png",
    solution: "1. In the left loop, tracing clockwise:\n- A $12\\text{ V}$ battery acts in one direction.\n- An $8\\text{ V}$ battery acts in opposition.\n2. The net potential difference across the $6\\;\\mu\\text{F}$ capacitor is:\n$$V = 12\\text{ V} - 8\\text{ V} = 4\\text{ V}$$\n3. The electrostatic energy stored in the $6\\;\\mu\\text{F}$ capacitor is:\n$$U = \\frac{1}{2} C V^2 = \\frac{1}{2} (6 \\times 10^{-6}\\text{ F}) (4\\text{ V})^2 = 3 \\times 10^{-6} \\times 16 = 48 \\times 10^{-6}\\text{ J}$$"
  },
  {
    q_num: 160,
    question_text: "$A$ and $B$ are two concentric metallic shells. If $A$ is positively charged and $B$ is earthed, then electric statement",
    options: [
      "Field at common centre is non-zero",
      "Field outside $B$ is non-zero",
      "Potential outside $B$ is positive",
      "Potential at common centre is positive"
    ],
    correct_index: 3,
    topic: "Concentric Shells Potential Properties",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q160_concentric_shells_b_earthed.png",
    solution: "1. Let shell $A$ have radius $a$ and charge $+q_A$ ($q_A > 0$). Shell $B$ has radius $b$ ($b > a$) and is earthed ($V_B = 0$).\n2. The potential of shell $B$ is:\n$$V_B = \\frac{k q_A}{b} + \\frac{k q_B}{b} = 0 \\implies q_B = -q_A$$\n3. The potential at the common centre $O$ is:\n$$V_O = \\frac{k q_A}{a} + \\frac{k q_B}{b} = \\frac{k q_A}{a} - \\frac{k q_A}{b} = k q_A \\left(\\frac{1}{a} - \\frac{1}{b}\\right)$$\n4. Since $b > a$, we have $\\frac{1}{a} > \\frac{1}{b}$, which makes $\\left(\\frac{1}{a} - \\frac{1}{b}\\right) > 0$. Since $q_A > 0$:\n$$V_O > 0$$\n5. Thus, the potential at the common centre is strictly positive."
  },
  {
    q_num: 161,
    question_text: "The figure shows some of the equipotential surfaces. Magnitude and direction of the electric field is given by",
    options: [
      "$200\\text{ V/m, making an angle } 120^\\circ \\text{ with the } x\\text{-axis}$",
      "$100\\text{ V/m, pointing towards negative } x\\text{-axis}$",
      "$200\\text{ V/m, making an angle } -60^\\circ \\text{ with the } x\\text{-axis}$",
      "$100\\text{ V/m, making an angle } 30^\\circ \\text{ with the } x\\text{-axis}$"
    ],
    correct_index: 0,
    topic: "Electric Field from Equipotential Surfaces",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q161_equipotential_inclined.png",
    solution: "1. Equipotential planes are inclined at an angle of $30^\\circ$ to the positive $x$-axis.\n2. The potential increases by $\\Delta V = 10\\text{ V}$ over a horizontal displacement of $\\Delta x = 10\\text{ cm} = 0.1\\text{ m}$.\n3. The perpendicular distance $d$ between two consecutive equipotential surfaces is:\n$$d = \\Delta x \\sin(30^\\circ) = 10\\text{ cm} \\times 0.5 = 5\\text{ cm} = 0.05\\text{ m}$$\n4. The magnitude of the electric field is:\n$$E = \\frac{|\\Delta V|}{d} = \\frac{10\\text{ V}}{0.05\\text{ m}} = 200\\text{ V/m}$$\n5. The electric field is perpendicular to equipotential surfaces and directed towards decreasing potential (towards the negative $x$ / positive $y$ direction):\n$$\\theta = 90^\\circ + 30^\\circ = 120^\\circ$$\n6. Hence, $\\vec{E}$ has magnitude $200\\text{ V/m}$ making an angle of $120^\\circ$ with the positive $x$-axis."
  },
  {
    q_num: 162,
    question_text: "Two point charges $-q$ and $+q$ are located at points $(0, 0, -a)$ and $(0, 0, a)$ respectively. The electric potential at point $(0, 0, z)$ (given $z > a$) will be",
    options: [
      "$\\frac{qa}{4\\pi\\varepsilon_0 z^2}$",
      "$\\frac{2q}{4\\pi\\varepsilon_0 z}$",
      "$\\frac{2qa}{4\\pi\\varepsilon_0(z^2 - a^2)}$",
      "Zero"
    ],
    correct_index: 2,
    topic: "Potential of Dipole along Axis",
    difficulty: "medium",
    image_url: "",
    solution: "1. Point $P$ is located on the $z$-axis at $(0, 0, z)$ with $z > a$.\n- Charge $+q$ is located at $(0, 0, a)$, distance $r_1 = z - a$.\n- Charge $-q$ is located at $(0, 0, -a)$, distance $r_2 = z - (-a) = z + a$.\n2. The total potential at point $P$ is the scalar sum:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{+q}{z - a} + \\frac{-q}{z + a}\\right]$$\n$$V = \\frac{q}{4\\pi\\varepsilon_0}\\left[\\frac{(z + a) - (z - a)}{(z - a)(z + a)}\\right] = \\frac{q}{4\\pi\\varepsilon_0}\\left[\\frac{2a}{z^2 - a^2}\\right] = \\frac{2qa}{4\\pi\\varepsilon_0(z^2 - a^2)}$$"
  },
  {
    q_num: 163,
    question_text: "If $n$ spherical drops, each of capacitance $C$, coalesce to form a single big drop, the capacitance of the big drop will be",
    options: ["$n C$", "$n^2 C$", "$n^{1/2} C$", "$n^{1/3} C$"],
    correct_index: 3,
    topic: "Coalescence of Charged Drops",
    difficulty: "easy",
    image_url: "",
    solution: "1. Let each small drop have radius $r$. Its capacitance is $C = 4\\pi\\varepsilon_0 r$.\n2. When $n$ drops coalesce into a single large drop of radius $R$, the total volume is conserved:\n$$\\frac{4}{3}\\pi R^3 = n \\left(\\frac{4}{3}\\pi r^3\\right) \\implies R^3 = n r^3 \\implies R = n^{1/3} r$$\n3. The capacitance of the big drop is:\n$$C' = 4\\pi\\varepsilon_0 R = 4\\pi\\varepsilon_0 (n^{1/3} r) = n^{1/3} (4\\pi\\varepsilon_0 r) = n^{1/3} C$$"
  },
  {
    q_num: 164,
    question_text: "If an electron is brought towards another electron, then electric potential energy of the system",
    options: [
      "Decreases",
      "Increases",
      "Becomes zero",
      "Remains same"
    ],
    correct_index: 1,
    topic: "Electric Potential Energy of Like Charges",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electrostatic potential energy of two electrons (each of charge $-e$) separated by distance $r$ is:\n$$U = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(-e)(-e)}{r} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r}$$\n2. Since both charges have the same sign, $U$ is positive and inversely proportional to $r$ ($U \\propto 1/r$).\n3. As one electron is brought closer to the other, the distance $r$ decreases, which causes the potential energy $U$ to increase (work must be done against the repulsive electrostatic force)."
  },

  // Page 40: Q165 to Q171
  {
    q_num: 165,
    question_text: "Equivalent capacitance across $A$ and $B$ in the figure is",
    options: ["$\\frac{1}{2}C$", "$C$", "$\\frac{4}{3}C$", "$\\frac{5}{3}C$"],
    correct_index: 3,
    topic: "Symmetrical Ring and Bridge Capacitance",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q165_circle_cap_network.png",
    solution: "1. Tracing the circuit nodes connected to terminals $A$ and $B$:\n- Terminal $A$ connects to the left semicircular arc.\n- Terminal $B$ connects to the right semicircular arc.\n- A capacitor $C$ on the bottom arc connects directly between the left arc ($A$) and right arc ($B$).\n- A horizontal diameter with two capacitors $C$ meets at a central junction $O$.\n- A vertical capacitor $C$ connects the central junction $O$ to terminal $B$.\n2. Notice that the central junction $O$ is connected to terminal $B$ through two parallel capacitors: the horizontal right capacitor ($C$) and the vertical capacitor ($C$). Their equivalent capacitance between $O$ and $B$ is:\n$$C_{OB} = C + C = 2C$$\n3. The horizontal left capacitor ($C$) connects terminal $A$ to junction $O$. Thus, the top path from $A$ to $B$ consists of capacitor $C$ in series with $C_{OB} = 2C$:\n$$C_{\\text{top}} = \\frac{C \\times 2C}{C + 2C} = \\frac{2}{3}C$$\n4. The bottom path consists of the direct capacitor $C$ connected in parallel with $C_{\\text{top}}$:\n$$C_{AB} = C_{\\text{top}} + C_{\\text{bottom}} = \\frac{2}{3}C + C = \\frac{5}{3}C$$"
  },
  {
    q_num: 166,
    question_text: "A hollow conducting sphere is placed in an electric field produced by a point charge placed at $P$ as shown. Let $V_A, V_B, V_C$ be the potentials at points $A, B, C$ respectively. Then",
    options: [
      "$V_A < V_C < V_B$",
      "$V_A > V_C > V_B$",
      "$V_C > V_A > V_B$",
      "$V_A = V_B = V_C$"
    ],
    correct_index: 3,
    topic: "Equipotential Conductor in External Field",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q166_hollow_sphere_field.png",
    solution: "1. In electrostatic equilibrium, any conducting body (hollow or solid) forms an equipotential region throughout its volume and on its entire surface.\n2. When placed in the electric field of an external point charge at $P$, charges rearrange themselves on the surface of the sphere to ensure the net electric field inside the material and cavity is strictly zero ($\\vec{E} = 0$).\n3. Because $\\vec{E} = -\\vec{\\nabla} V = 0$ everywhere on and within the conducting sphere, the potential does not vary from point to point.\n4. Therefore, the potentials at all points $A, B$, and $C$ are identical:\n$$V_A = V_B = V_C$$"
  },
  {
    q_num: 167,
    question_text: "A hollow conducting sphere a charge $+q$ is placed off-centre inside the cavity as shown in the figure. Then mark the incorrect statement from the following",
    options: [
      "There exist radial electric field lines in cavity as outside the hollow sphere",
      "Outside the conducting sphere, radial electric field lines will exist",
      "Uniform distribution of charge on inner surface of conducting surface",
      "Field at inner surface and outer surface of conductor are same"
    ],
    correct_index: 2,
    topic: "Charge Distribution on Cavity Surfaces",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q167_off_center_cavity.png",
    solution: "1. When a point charge $+q$ is placed off-center inside a cavity within a conductor, it induces a total charge of $-q$ on the inner cavity surface.\n2. Because the charge is placed closer to one side of the cavity wall than the other, the induced charge $-q$ is distributed non-uniformly on the inner surface (higher concentration near the charge) to ensure the electric field inside the conducting body remains zero.\n3. Therefore, statement (3) 'Uniform distribution of charge on inner surface of conducting surface' is incorrect (false), which makes it the correct option to select."
  },
  {
    q_num: 168,
    question_text: "A parallel plate capacitor is charged to a potential difference and then charging battery is disconnected. Now if a dielectric is inserted between the plates, then choose the incorrect statement",
    options: [
      "Stored energy of the capacitor decreases",
      "Force of attraction between the plates decreases",
      "Electric field between the plates decreases",
      "Net charge induced on the dielectric is non-zero"
    ],
    correct_index: 1,
    topic: "Dielectric Insertion with Battery Disconnected",
    difficulty: "medium",
    image_url: "",
    solution: "1. When the charging battery is disconnected, the charge $Q$ on the capacitor plates remains constant.\n2. The attractive electrostatic force between the plates of a parallel plate capacitor is given by:\n$$F = \\frac{Q^2}{2\\varepsilon_0 A}$$\nSince the charge $Q$, plate area $A$, and permittivity $\\varepsilon_0$ are unchanged, the attractive force between the plates remains constant (it does not decrease).\n3. Statement (2) 'Force of attraction between the plates decreases' is therefore incorrect, making it the correct option to choose."
  },
  {
    q_num: 169,
    question_text: "Magnitude of the electric field $E$ depends on the $x$-coordinate given by $E = \\frac{20}{x^2}\\text{ V/m}$. Potential difference between two points $A(5\\text{ m}, 0)$ and $B(10\\text{ m}, 0)$ (i.e. $V_B - V_A$) is",
    options: ["$+2\\text{ V}$", "$+\\frac{2}{25}\\text{ V}$", "$-2\\text{ V}$", "$-\\frac{4}{5}\\text{ V}$"],
    correct_index: 2,
    topic: "Potential Difference from Non-Uniform Electric Field",
    difficulty: "medium",
    image_url: "",
    solution: "1. The potential difference $V_B - V_A$ is calculated using the line integral of electric field:\n$$V_B - V_A = -\\int_{x_A}^{x_B} E\\,dx$$\n2. Substituting $E(x) = \\frac{20}{x^2}$ from $x_A = 5\\text{ m}$ to $x_B = 10\\text{ m}$:\n$$V_B - V_A = -\\int_5^{10} 20 x^{-2}\\,dx = -\\left[-\\frac{20}{x}\\right]_5^{10} = \\left[\\frac{20}{x}\\right]_5^{10}$$\n$$V_B - V_A = \\frac{20}{10} - \\frac{20}{5} = 2 - 4 = -2\\text{ V}$$\n3. Hence, $V_B - V_A = -2\\text{ V}$."
  },
  {
    q_num: 170,
    question_text: "In the given arrangement of parallel plates, each plate has area $A$ and distance between consecutive plates is $d$. The equivalent capacitance of the system between $x$ and $y$ is given by",
    options: [
      "$\\frac{7\\varepsilon_0 A}{d}$",
      "$\\frac{10\\varepsilon_0 A}{7d}$",
      "$\\frac{14\\varepsilon_0 A}{d}$",
      "$\\frac{10\\varepsilon_0 A}{d}$"
    ],
    correct_index: 0,
    topic: "Parallel and Series Dielectric Slab Capacitor",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q170_three_layers_parallel.png",
    solution: "1. The arrangement has 4 plates creating three dielectric regions, each of thickness $d$ and area $A$:\n- Terminal $y$ connects to plate 1 (top) and plate 4 (bottom).\n- Terminal $x$ connects to plate 2.\n2. Between terminal $x$ (plate 2) and terminal $y$ (plate 1):\n- There is dielectric layer 1 of constant $k_1 = 5$ and thickness $d$:\n$$C_1 = \\frac{k_1 \\varepsilon_0 A}{d} = \\frac{5\\varepsilon_0 A}{d}$$\n3. Between terminal $x$ (plate 2) and terminal $y$ (plate 4):\n- There are two dielectric layers in series: layer 2 ($k_2 = 3$, thickness $d$) and layer 3 ($k_3 = 6$, thickness $d$):\n$$\\frac{1}{C_{23}} = \\frac{d}{k_2 \\varepsilon_0 A} + \\frac{d}{k_3 \\varepsilon_0 A} = \\frac{d}{\\varepsilon_0 A}\\left(\\frac{1}{3} + \\frac{1}{6}\\right) = \\frac{d}{\\varepsilon_0 A}\\left(\\frac{1}{2}\\right)$$\n$$C_{23} = \\frac{2\\varepsilon_0 A}{d}$$\n4. Since branch 1 and branch 23 are connected in parallel between terminals $x$ and $y$:\n$$C_{\\text{eq}} = C_1 + C_{23} = \\frac{5\\varepsilon_0 A}{d} + \\frac{2\\varepsilon_0 A}{d} = \\frac{7\\varepsilon_0 A}{d}$$"
  },
  {
    q_num: 171,
    question_text: "Electric field in a region is increasing in magnitude along $x$-direction. The equipotential surfaces associated are",
    options: [
      "Planes parallel to $xy$-plane",
      "Planes parallel to $yz$-plane",
      "Co-axial cylinders around $x$-axis",
      "All of these"
    ],
    correct_index: 1,
    topic: "Orientation of Equipotential Surfaces",
    difficulty: "easy",
    image_url: "",
    solution: "1. Equipotential surfaces are always perpendicular to electric field lines at every point in space.\n2. Since the electric field $\\vec{E}$ is directed along the $x$-direction ($\\hat{i}$), any surface perpendicular to the $x$-axis is a plane of constant $x$.\n3. Planes of constant $x$ are parallel to the $yz$-plane.\n4. Therefore, the equipotential surfaces are planes parallel to the $yz$-plane."
  }
];
