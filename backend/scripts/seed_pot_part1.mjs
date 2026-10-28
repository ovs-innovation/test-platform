export const POTENTIAL_PART1 = [
  // Page 19: Q1 to Q7
  {
    q_num: 1,
    question_text: "Two charges of equal magnitude $q$ are placed in air at a distance $2a$ apart and third charge $-2q$ is placed at midpoint of the line connecting identical charges. The potential energy of the system is",
    options: [
      "$-\\frac{q^2}{8\\pi\\varepsilon_0 a}$",
      "$-\\frac{3q^2}{8\\pi\\varepsilon_0 a}$",
      "$-\\frac{5q^2}{8\\pi\\varepsilon_0 a}$",
      "$-\\frac{7q^2}{8\\pi\\varepsilon_0 a}$"
    ],
    correct_index: 3,
    topic: "Electrostatic Potential Energy",
    difficulty: "easy",
    image_url: "",
    solution: "Let the three charges be situated along the $x$-axis:\n- $q_1 = q$ at $x = 0$\n- $q_2 = -2q$ at $x = a$\n- $q_3 = q$ at $x = 2a$\n\nThe total potential energy of the three-charge system is:\n$$U = \\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{q_1 q_2}{r_{12}} + \\frac{q_2 q_3}{r_{23}} + \\frac{q_1 q_3}{r_{13}}\\right]$$\n$$U = \\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{q(-2q)}{a} + \\frac{(-2q)q}{a} + \\frac{q \\cdot q}{2a}\\right]$$\n$$U = \\frac{1}{4\\pi\\varepsilon_0 a}\\left[-2q^2 - 2q^2 + \\frac{q^2}{2}\\right] = \\frac{1}{4\\pi\\varepsilon_0 a}\\left(-\\frac{7q^2}{2}\\right) = -\\frac{7q^2}{8\\pi\\varepsilon_0 a}$$"
  },
  {
    q_num: 2,
    question_text: "The electrical potential on the surface of a uniformly charged sphere of radius $r$ due to a charge of $3 \\times 10^{-6}\\text{ C}$ on it is $500\\text{ V}$. The intensity of electric field on the surface of the sphere is (in N/C)",
    options: ["$< 10$", "$> 200$", "between 10 and 20", "$< 5$"],
    correct_index: 0,
    topic: "Electric Potential and Field of Sphere",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electric potential on the surface of a conducting or uniformly charged sphere is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$$\n$$500 = \\frac{9 \\times 10^9 \\times 3 \\times 10^{-6}}{r} \\implies r = \\frac{27000}{500} = 54\\text{ m}$$\n\n2. The electric field intensity on the surface of the sphere is:\n$$E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2} = \\frac{V}{r} = \\frac{500}{54} \\approx 9.26\\text{ N/C}$$\nSince $9.26 < 10$, the intensity of the electric field is $< 10\\text{ N/C}$."
  },
  {
    q_num: 3,
    question_text: "A non-conducting ring of radius $0.5\\text{ m}$ carries a total charge of $1.11 \\times 10^{-10}\\text{ C}$ distributed non-uniformly on its circumference producing an electric field $\\vec{E}$ everywhere in space. The value of line integral $\\int_\\infty^0 -\\vec{E}\\cdot d\\vec{l}$ ($l = 0$ at the center of the ring) in volt is: (given potential at infinity is zero)",
    options: ["$+2$", "$-1$", "$-2$", "$0$"],
    correct_index: 0,
    topic: "Electric Potential of Ring",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q3.png",
    solution: "1. By definition of electrostatic potential, the line integral of electric field from infinity to any point gives the potential at that point:\n$$\\int_\\infty^0 -\\vec{E}\\cdot d\\vec{l} = V(0) - V(\\infty) = V(0)$$\n\n2. For a circular ring of radius $R$ carrying total charge $Q$ (even if non-uniformly distributed), every point on the circumference is at the same distance $R$ from the center:\n$$V(0) = \\frac{1}{4\\pi\\varepsilon_0}\\int \\frac{dq}{R} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R}$$\n\n3. Substituting the given values:\n$$V(0) = \\frac{9 \\times 10^9 \\times 1.11 \\times 10^{-10}}{0.5} = \\frac{0.999}{0.5} \\approx +2\\text{ V}$$"
  },
  {
    q_num: 4,
    question_text: "Charge $Q$ is uniformly distributed throughout the volume of a solid hemisphere of radius $R$. Then the potential at center $O$ of the hemisphere is:",
    options: [
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{3Q}{2R}$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{3Q}{4R}$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{4R}$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{8R}$"
    ],
    correct_index: 0,
    topic: "Electric Potential of Hemisphere",
    difficulty: "medium",
    image_url: "",
    solution: "1. For a complete solid sphere of radius $R$ with total charge $Q_{\\text{sphere}}$, the potential at the center is:\n$$V_{\\text{center}} = \\frac{3}{2}\\frac{k Q_{\\text{sphere}}}{R}$$\n\n2. By symmetry, the potential at the center of a complete sphere is divided equally between its two identical solid hemispheres. A solid sphere containing charge $2Q$ (having the same charge density) has:\n$$V_{\\text{sphere}} = \\frac{3}{2}\\frac{k (2Q)}{R} = \\frac{3kQ}{R}$$\n\n3. Since each hemisphere contributes equally to the center's potential by superposition:\n$$V_{\\text{hemisphere}} = \\frac{1}{2} V_{\\text{sphere}} = \\frac{3kQ}{2R} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{3Q}{2R}$$"
  },
  {
    q_num: 5,
    question_text: "Which of the following is not true about equipotential surfaces?",
    options: [
      "They do not cross each other",
      "They are concentric spheres for uniform electric field",
      "Rate of change of potential with position on them is zero",
      "They can be spherical"
    ],
    correct_index: 1,
    topic: "Equipotential Surfaces",
    difficulty: "easy",
    image_url: "",
    solution: "1. For a uniform electric field, the equipotential surfaces are equidistant parallel planes perpendicular to the field lines, not concentric spheres.\n2. Concentric spheres are equipotential surfaces for a point charge or spherical charge distribution.\n3. Equipotential surfaces never cross each other because if they did, the intersection would have two different values of potential, which is impossible.\n4. Along an equipotential surface, potential is constant, so $\\frac{dV}{dr} = 0$.\nTherefore, statement (2) is false."
  },
  {
    q_num: 6,
    question_text: "Two charged conducting spheres of radii $R_1$ and $R_2$ have equal surface charge density. The ratio of potential at their surfaces is:",
    options: [
      "$\\frac{R_1}{R_2}$",
      "$\\frac{R_2}{R_1}$",
      "$\\left(\\frac{R_1}{R_2}\\right)^2$",
      "$\\left(\\frac{R_2}{R_1}\\right)^2$"
    ],
    correct_index: 0,
    topic: "Potential of Conducting Spheres",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electric potential on the surface of a conducting sphere of radius $R$ and charge $Q$ is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R}$$\n\n2. Expressing charge $Q$ in terms of surface charge density $\\sigma$ ($Q = 4\\pi R^2 \\sigma$):\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{4\\pi R^2 \\sigma}{R} = \\frac{\\sigma R}{\\varepsilon_0}$$\n\n3. Since both spheres have the same surface charge density $\\sigma$:\n$$\\frac{V_1}{V_2} = \\frac{\\frac{\\sigma R_1}{\\varepsilon_0}}{\\frac{\\sigma R_2}{\\varepsilon_0}} = \\frac{R_1}{R_2}$$"
  },
  {
    q_num: 7,
    question_text: "The work done by battery to charge an uncharged parallel plate condenser of plate separation $d$ and plate area of cross section $A$ such that the uniform electric field between the plates is $E$, is",
    options: [
      "$\\frac{1}{2}\\varepsilon_0 E^2 A d$",
      "$\\frac{\\varepsilon_0 E^2}{A d}$",
      "$\\varepsilon_0 E^2 A d$",
      "$\\frac{1}{2}\\frac{\\varepsilon_0 E^2}{A d}$"
    ],
    correct_index: 2,
    topic: "Work Done in Charging Capacitor",
    difficulty: "easy",
    image_url: "",
    solution: "1. The capacitance of the parallel plate capacitor is $C = \\frac{\\varepsilon_0 A}{d}$.\n2. The potential difference across the plates is $V = E d$.\n3. The total charge supplied by the battery is $Q = C V$.\n4. The work done by the battery is:\n$$W = Q V = C V^2 = \\left(\\frac{\\varepsilon_0 A}{d}\\right)(E d)^2 = \\frac{\\varepsilon_0 A}{d} \\cdot E^2 d^2 = \\varepsilon_0 E^2 A d$$\n(Note: The energy stored in the capacitor is $\\frac{1}{2}\\varepsilon_0 E^2 A d$, and the remaining half is dissipated as heat, so total work done by the battery is $\\varepsilon_0 E^2 A d$)."
  },

  // Page 20: Q8 to Q15
  {
    q_num: 8,
    question_text: "A capacitor is charged by a battery and the energy stored is $U$. The battery is now removed and the separation between the plates is doubled. The energy stored now is:",
    options: ["$\\frac{U}{2}$", "$U$", "$2U$", "$4U$"],
    correct_index: 2,
    topic: "Energy Stored in Capacitor",
    difficulty: "easy",
    image_url: "",
    solution: "1. When the battery is disconnected, the charge $Q$ on the plates remains constant.\n2. Initial capacitance is $C = \\frac{\\varepsilon_0 A}{d}$ and initial energy is $U = \\frac{Q^2}{2C}$.\n3. When plate separation is doubled ($d' = 2d$), the new capacitance becomes:\n$$C' = \\frac{\\varepsilon_0 A}{2d} = \\frac{C}{2}$$\n4. The new stored energy is:\n$$U' = \\frac{Q^2}{2C'} = \\frac{Q^2}{2(C/2)} = 2 \\left(\\frac{Q^2}{2C}\\right) = 2U$$"
  },
  {
    q_num: 9,
    question_text: "The plates in a parallel plate capacitor are separated by a distance $d$ with air as the medium between the plates. In order to increase the capacity by $66.67\\%$, a dielectric slab of dielectric constant 5 is introduced between the plates. What is the thickness of dielectric slab?",
    options: ["$\\frac{d}{4}$", "$\\frac{d}{2}$", "$\\frac{5d}{8}$", "$d$"],
    correct_index: 1,
    topic: "Capacitor with Dielectric Slab",
    difficulty: "medium",
    image_url: "",
    solution: "1. Initial capacitance with air is $C_0 = \\frac{\\varepsilon_0 A}{d}$.\n2. The capacitance increases by $66.67\\% = \\frac{2}{3}$:\n$$C' = C_0 + \\frac{2}{3}C_0 = \\frac{5}{3}C_0$$\n3. The formula for capacitance with a dielectric slab of thickness $t$ and dielectric constant $K$ is:\n$$C' = \\frac{\\varepsilon_0 A}{d - t\\left(1 - \\frac{1}{K}\\right)}$$\n4. Equating the two expressions for $C'$:\n$$\\frac{\\varepsilon_0 A}{d - t\\left(1 - \\frac{1}{5}\\right)} = \\frac{5}{3}\\frac{\\varepsilon_0 A}{d}$$\n$$d - \\frac{4}{5}t = \\frac{3}{5}d \\implies \\frac{4}{5}t = d - \\frac{3}{5}d = \\frac{2}{5}d \\implies t = \\frac{d}{2}$$"
  },
  {
    q_num: 10,
    question_text: "In the figure shown, the equivalent capacitance between $A$ and $B$ is",
    options: ["$3.75\\,\\mu\\text{F}$", "$5.25\\,\\mu\\text{F}$", "$6.5\\,\\mu\\text{F}$", "$10.5\\,\\mu\\text{F}$"],
    correct_index: 0,
    topic: "Wheatstone Bridge of Capacitors",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q10.png",
    solution: "1. Simplifying the series pairs on the four arms:\n- Top-left arm: two $10\\,\\mu\\text{F}$ capacitors in series have equivalent capacitance:\n$$C_1 = \\frac{10 \\times 10}{10 + 10} = 5\\,\\mu\\text{F}$$\n- Top-right arm: $C_2 = 3\\,\\mu\\text{F}$\n- Bottom-left arm: $C_3 = 5\\,\\mu\\text{F}$\n- Bottom-right arm: two $6\\,\\mu\\text{F}$ capacitors in series have equivalent capacitance:\n$$C_4 = \\frac{6 \\times 6}{6 + 6} = 3\\,\\mu\\text{F}$$\n\n2. Checking bridge balance ratio:\n$$\\frac{C_1}{C_2} = \\frac{5}{3}, \\quad \\frac{C_3}{C_4} = \\frac{5}{3}$$\nSince $\\frac{C_1}{C_2} = \\frac{C_3}{C_4}$, the Wheatstone bridge is balanced! No charge flows through the central $15\\,\\mu\\text{F}$ capacitor, which can be removed.\n\n3. Equivalent capacitance of the upper and lower branches in parallel:\n- Upper branch: $5\\,\\mu\\text{F}$ and $3\\,\\mu\\text{F}$ in series:\n$$C_{\\text{upper}} = \\frac{5 \\times 3}{5 + 3} = \\frac{15}{8}\\,\\mu\\text{F}$$\n- Lower branch: $5\\,\\mu\\text{F}$ and $3\\,\\mu\\text{F}$ in series:\n$$C_{\\text{lower}} = \\frac{5 \\times 3}{5 + 3} = \\frac{15}{8}\\,\\mu\\text{F}$$\n\n4. Total equivalent capacitance:\n$$C_{AB} = C_{\\text{upper}} + C_{\\text{lower}} = \\frac{15}{8} + \\frac{15}{8} = \\frac{30}{8} = 3.75\\,\\mu\\text{F}$$"
  },
  {
    q_num: 11,
    question_text: "Equivalence capacitance between the points $X$ and $Y$ in the circuit is",
    options: [
      "$\\frac{2C}{3}$",
      "$\\frac{5C}{3}$",
      "$\\frac{3C}{5}$",
      "$\\text{None of these}$"
    ],
    correct_index: 1,
    topic: "Capacitor Networks",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q11.png",
    solution: "1. The network between terminals $X$ and $Y$ consists of five capacitors each of capacitance $C$ in a symmetric bridge arrangement.\n2. By applying delta-star transformation or using nodal potentials:\nLet potential at $X$ be $V$ and at $Y$ be $0$.\nUsing symmetry and charge conservation at the interior nodes, the total charge drawn from terminal $X$ is:\n$$Q_{\\text{total}} = \\frac{5}{3} C V$$\n3. Therefore, the equivalent capacitance is:\n$$C_{XY} = \\frac{Q_{\\text{total}}}{V} = \\frac{5C}{3}$$"
  },
  {
    q_num: 12,
    question_text: "A capacitor of capacitance $10\\,\\mu\\text{F}$ is charged to a potential of $50\\text{ V}$ with a battery. The battery is now disconnected and an additional charge $200\\,\\mu\\text{C}$ is given to positive plate of the capacitor. The potential difference across the capacitor become:",
    options: ["$50\\text{ V}$", "$70\\text{ V}$", "$0\\text{ V}$", "$60\\text{ V}$"],
    correct_index: 3,
    topic: "Charge Distribution on Plates",
    difficulty: "medium",
    image_url: "",
    solution: "1. Initially, charge on the positive plate is $Q_1 = C V = 10\\,\\mu\\text{F} \\times 50\\text{ V} = 500\\,\\mu\\text{C}$, and on the negative plate is $Q_2 = -500\\,\\mu\\text{C}$.\n2. When an additional charge $200\\,\\mu\\text{C}$ is given to the positive plate, its total charge becomes $Q_1' = 500 + 200 = 700\\,\\mu\\text{C}$. The charge on the negative plate remains $Q_2' = -500\\,\\mu\\text{C}$.\n3. For two parallel conducting plates, the charge on the outer faces is:\n$$q_{\\text{outer}} = \\frac{Q_1' + Q_2'}{2} = \\frac{700 - 500}{2} = +100\\,\\mu\\text{C}$$\n4. The charge on the inner facing surface of the positive plate is:\n$$q_{\\text{inner}} = Q_1' - q_{\\text{outer}} = 700 - 100 = 600\\,\\mu\\text{C}$$\n5. The potential difference between the plates is determined solely by the inner facing charge:\n$$V' = \\frac{q_{\\text{inner}}}{C} = \\frac{600\\,\\mu\\text{C}}{10\\,\\mu\\text{F}} = 60\\text{ V}$$"
  },
  {
    q_num: 13,
    question_text: "A charge $q$ is placed at the origin $O$ of $X-Y$ axes as shown in the figure. The work done by external agent in taking a charge $Q$ from $A$ to $B$ along the curved line $AB$ is",
    options: [
      "$\\frac{Qq}{4\\pi\\varepsilon_0}\\left(\\frac{a-b}{ab}\\right)$",
      "$\\frac{Qq}{4\\pi\\varepsilon_0}\\left(\\frac{b-a}{ab}\\right)$",
      "$\\frac{Qq}{4\\pi\\varepsilon_0}\\left(\\frac{a-b}{a^2 b^2}\\right)$",
      "$\\frac{Qq}{4\\pi\\varepsilon_0}\\left(\\frac{1}{b^2} - \\frac{1}{a^2}\\right)$"
    ],
    correct_index: 0,
    topic: "Work Done by External Agent",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q13.png",
    solution: "1. The electrostatic field is conservative, so work done by an external agent is path-independent and depends only on initial and final potentials:\n$$W_{\\text{ext}} = Q(V_B - V_A)$$\n\n2. Point $A(a, 0)$ is at distance $a$ from origin, so:\n$$V_A = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{a}$$\nPoint $B(0, b)$ is at distance $b$ from origin, so:\n$$V_B = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{b}$$\n\n3. Therefore, work done is:\n$$W_{\\text{ext}} = Q\\left(\\frac{q}{4\\pi\\varepsilon_0 b} - \\frac{q}{4\\pi\\varepsilon_0 a}\\right) = \\frac{Qq}{4\\pi\\varepsilon_0}\\left(\\frac{1}{b} - \\frac{1}{a}\\right) = \\frac{Qq}{4\\pi\\varepsilon_0}\\left(\\frac{a - b}{ab}\\right)$$"
  },
  {
    q_num: 14,
    question_text: "A charge $Q$ is uniformly distributed over a thin rod $AB$ of length $L$ as shown in the figure. The electric potential at the point $O$ lying at distance $2L$ from the end $A$ is:",
    options: [
      "$\\frac{Q}{4\\pi\\varepsilon_0 L}\\ln\\left(\\frac{3}{2}\\right)$",
      "$\\frac{2Q}{4\\pi\\varepsilon_0 L}$",
      "$\\frac{Q}{4\\pi\\varepsilon_0 L}\\ln 3$",
      "$\\frac{Q}{4\\pi\\varepsilon_0 L}\\ln\\left(\\frac{2}{3}\\right)$"
    ],
    correct_index: 0,
    topic: "Potential due to Continuous Charge",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q14.png",
    solution: "1. The linear charge density of the rod is $\\lambda = \\frac{Q}{L}$.\n2. Consider an elemental length $dx$ on the rod at distance $x$ from point $O$. The charge on this element is $dq = \\lambda dx$.\n3. The distance of the rod's elements from $O$ ranges from $x = 2L$ (end $A$) to $x = 2L + L = 3L$ (end $B$).\n4. Integrating the potential contributions:\n$$V = \\int \\frac{1}{4\\pi\\varepsilon_0}\\frac{dq}{x} = \\frac{\\lambda}{4\\pi\\varepsilon_0}\\int_{2L}^{3L} \\frac{dx}{x} = \\frac{Q}{4\\pi\\varepsilon_0 L}\\left[\\ln x\\right]_{2L}^{3L}$$\n$$V = \\frac{Q}{4\\pi\\varepsilon_0 L}\\ln\\left(\\frac{3L}{2L}\\right) = \\frac{Q}{4\\pi\\varepsilon_0 L}\\ln\\left(\\frac{3}{2}\\right)$$"
  },
  {
    q_num: 15,
    question_text: "In the arrangement of two concentric conducting spherical shells as shown in the figure, charge on the outer shell is $10\\,\\mu\\text{C}$ and the inner shell is grounded. Then the charge $q'$ on the inner shell is:",
    options: [
      "$\\text{Zero}$",
      "$q' = -10\\,\\mu\\text{C}$",
      "$q' = 20\\,\\mu\\text{C}$",
      "$q' = -5\\,\\mu\\text{C}$"
    ],
    correct_index: 3,
    topic: "Grounded Spherical Shell",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q15.png",
    solution: "1. Inner shell has radius $r_1 = 1\\text{ m}$ and unknown induced charge $q'$. Outer shell has radius $r_2 = 2\\text{ m}$ and charge $Q_2 = 10\\,\\mu\\text{C}$.\n2. Since the inner shell is grounded (connected to earth), its potential must be zero ($V_{\\text{inner}} = 0$).\n3. The potential on the inner shell is the sum of potentials due to $q'$ and $Q_2$:\n$$V_{\\text{inner}} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q'}{r_1} + \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q_2}{r_2} = 0$$\n$$\\frac{q'}{1} + \\frac{10\\,\\mu\\text{C}}{2} = 0 \\implies q' + 5\\,\\mu\\text{C} = 0 \\implies q' = -5\\,\\mu\\text{C}$$"
  },

  // Page 21: Q16 to Q23
  {
    q_num: 16,
    question_text: "Two identical capacitors have the same capacitance $C$. One of them is charged to potential $V_1$ and other to $V_2$. The negative end is joined with the positive end of other capacitor. When the other two remaining ends are connected the change in energy of combined system is:",
    options: [
      "$\\frac{1}{4}C(V_1 - V_2)^2$",
      "$\\frac{1}{4}C(V_1 + V_2)^2$",
      "$\\frac{1}{2}C(V_1^2 - V_2^2)$",
      "$\\frac{1}{2}C(V_1 + V_2)^2$"
    ],
    correct_index: 1,
    topic: "Loss of Energy on Sharing Charges",
    difficulty: "medium",
    image_url: "",
    solution: "1. When capacitors are connected with opposite polarities (positive plate to negative plate), the initial stored energy is:\n$$U_i = \\frac{1}{2} C V_1^2 + \\frac{1}{2} C V_2^2$$\n2. The net charge of the combined system is $Q = C V_1 - C V_2$, and equivalent capacitance is $2C$.\n3. The final common potential is $V = \\frac{C(V_1 - V_2)}{2C} = \\frac{V_1 - V_2}{2}$.\n4. The final stored energy is:\n$$U_f = \\frac{1}{2}(2C) V^2 = C \\left(\\frac{V_1 - V_2}{2}\\right)^2 = \\frac{C(V_1 - V_2)^2}{4}$$\n5. The loss (change) in energy is:\n$$\\Delta U = U_i - U_f = \\frac{1}{2}C(V_1^2 + V_2^2) - \\frac{1}{4}C(V_1^2 + V_2^2 - 2V_1 V_2) = \\frac{1}{4}C(V_1^2 + V_2^2 + 2V_1 V_2) = \\frac{1}{4}C(V_1 + V_2)^2$$"
  },
  {
    q_num: 17,
    question_text: "Four capacitors are joined as shown in the figure. The capacity of each capacitor is $8\\,\\mu\\text{F}$. Equivalent capacitance between $A$ and $B$ is:",
    options: ["$2\\,\\mu\\text{F}$", "$8\\,\\mu\\text{F}$", "$16\\,\\mu\\text{F}$", "$32\\,\\mu\\text{F}$"],
    correct_index: 3,
    topic: "Parallel Combination of Capacitors",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q17.png",
    solution: "1. In the given multi-plate capacitor arrangement, four capacitors are connected in parallel between terminals $A$ and $B$.\n2. For $n = 4$ identical capacitors connected in parallel, the equivalent capacitance is:\n$$C_{\\text{eq}} = n C = 4 \\times 8\\,\\mu\\text{F} = 32\\,\\mu\\text{F}$$"
  },
  {
    q_num: 18,
    question_text: "A parallel plate capacitor having a plate separation of $2\\text{ mm}$ is charged by connecting it to a $400\\text{ V}$ supply. The energy density is",
    options: ["$0.09\\text{ J/m}^3$", "$0.18\\text{ J/m}^3$", "$0.36\\text{ J/m}^3$", "$0.72\\text{ J/m}^3$"],
    correct_index: 1,
    topic: "Energy Density of Electric Field",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electric field between the plates is:\n$$E = \\frac{V}{d} = \\frac{400}{2 \\times 10^{-3}} = 2 \\times 10^5\\text{ V/m}$$\n2. The electrostatic energy density is:\n$$u = \\frac{1}{2}\\varepsilon_0 E^2 = \\frac{1}{2} \\times (8.854 \\times 10^{-12}) \\times (2 \\times 10^5)^2$$\n$$u = \\frac{1}{2} \\times (8.854 \\times 10^{-12}) \\times (4 \\times 10^{10}) = 2 \\times 8.854 \\times 10^{-2} = 0.177 \\approx 0.18\\text{ J/m}^3$$"
  },
  {
    q_num: 19,
    question_text: "A charge $q$ is kept in front of neutral metallic sphere as shown in the figure. The value of electric field at the centre of sphere due to induced charge on surface of sphere is:",
    options: [
      "$\\frac{q}{4\\pi\\varepsilon_0 d^2}$",
      "$\\frac{q}{4\\pi\\varepsilon_0 R^2}$",
      "$\\frac{q}{4\\pi\\varepsilon_0 (R+d)^2}$",
      "$\\frac{3q}{4\\pi\\varepsilon_0 R^2}$"
    ],
    correct_index: 0,
    topic: "Electric Field due to Induced Charges",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q19.png",
    solution: "1. At electrostatic equilibrium, the net electric field inside any conductor is zero: $\\vec{E}_{\\text{net}} = 0$.\n2. The net field at the center of the sphere is the vector sum of the field due to external point charge $q$ and the field due to induced surface charges:\n$$\\vec{E}_{\\text{net}} = \\vec{E}_q + \\vec{E}_{\\text{induced}} = 0 \\implies \\vec{E}_{\\text{induced}} = -\\vec{E}_q$$\n3. The electric field at the center due to point charge $q$ at distance $d$ is $E_q = \\frac{q}{4\\pi\\varepsilon_0 d^2}$ directed towards the center.\n4. Therefore, the magnitude of the electric field due to induced charges is:\n$$E_{\\text{induced}} = \\frac{q}{4\\pi\\varepsilon_0 d^2}$$"
  },
  {
    q_num: 20,
    question_text: "Two identical capacitors 1 and 2 are connected in series. The capacitor 2 contains a dielectric slab of constant $k$ as shown. They are connected to a battery of emf $V_0$ volt. The dielectric slab is then removed. Let $Q_1$ and $Q_2$ be the charge stored in capacitor before removing the slab and $Q_1'$ and $Q_2'$ be the values after removing the slab. Then",
    options: [
      "$\\frac{Q_1'}{Q_1} = \\frac{k+1}{k}$",
      "$\\frac{Q_2'}{Q_2} = \\frac{k+1}{2}$",
      "$\\frac{Q_2'}{Q_2} = \\frac{k+1}{2k}$",
      "$\\frac{Q_1'}{Q_1} = \\frac{k}{2}$"
    ],
    correct_index: 2,
    topic: "Effect of Removing Dielectric Slab",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q20.png",
    solution: "1. Before removing the slab, capacitance of capacitor 1 is $C_1 = C$ and capacitor 2 is $C_2 = kC$.\nSince they are in series, equivalent capacitance is:\n$$C_{\\text{eq}} = \\frac{C \\cdot kC}{C + kC} = \\left(\\frac{k}{k+1}\\right)C$$\nCharge stored in capacitor 2 is:\n$$Q_2 = C_{\\text{eq}} V_0 = \\left(\\frac{k}{k+1}\\right)C V_0$$\n\n2. After removing the dielectric slab, both capacitors have capacitance $C$, so equivalent capacitance is:\n$$C_{\\text{eq}}' = \\frac{C}{2}$$\nCharge stored in capacitor 2 is:\n$$Q_2' = C_{\\text{eq}}' V_0 = \\frac{1}{2} C V_0$$\n\n3. The ratio is:\n$$\\frac{Q_2'}{Q_2} = \\frac{\\frac{1}{2}C V_0}{\\left(\\frac{k}{k+1}\\right)C V_0} = \\frac{k+1}{2k}$$"
  },
  {
    q_num: 21,
    question_text: "In the given arrangement the value of equivalent capacitance between points $A$ and $B$ is",
    options: ["$4\\,\\mu\\text{F}$", "$6\\,\\mu\\text{F}$", "$2\\,\\mu\\text{F}$", "$3\\,\\mu\\text{F}$"],
    correct_index: 2,
    topic: "Balanced Capacitor Bridge",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q21.png",
    solution: "1. The circuit forms a Wheatstone bridge with four outer arms of $2\\,\\mu\\text{F}$ each and a central bridge capacitor of $4\\,\\mu\\text{F}$.\n2. Condition for balance: $\\frac{2}{2} = \\frac{2}{2} = 1$. The bridge is balanced!\n3. Therefore, no charge flows through the central $4\\,\\mu\\text{F}$ capacitor and it can be removed from calculation.\n4. Top arm consists of two $2\\,\\mu\\text{F}$ in series: $C_{\\text{top}} = \\frac{2}{2} = 1\\,\\mu\\text{F}$.\n5. Bottom arm consists of two $2\\,\\mu\\text{F}$ in series: $C_{\\text{bottom}} = \\frac{2}{2} = 1\\,\\mu\\text{F}$.\n6. The two arms are in parallel: $C_{AB} = 1 + 1 = 2\\,\\mu\\text{F}$."
  },
  {
    q_num: 22,
    question_text: "A solid sphere (conducting) is surrounded by metallic shell of radius $2r$. Initial charges on them are $5\\,\\mu\\text{C}$ and $3\\,\\mu\\text{C}$ respectively. If both are connected by thin metallic wire then charge appearing on $A$ and $B$ are",
    options: [
      "$4\\,\\mu\\text{C}$ each",
      "$0$ and $8\\,\\mu\\text{C}$",
      "$3\\,\\mu\\text{C}$ and $5\\,\\mu\\text{C}$",
      "$2\\,\\mu\\text{C}$ and $6\\,\\mu\\text{C}$"
    ],
    correct_index: 1,
    topic: "Connected Concentric Spheres",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q22.png",
    solution: "1. When two concentric conducting spheres are connected by a conducting wire, they must reach the same electric potential.\n2. The potential of the inner sphere $A$ is given by $V_A = \\frac{k q_A}{r} + \\frac{k q_B}{2r}$, and the outer shell $B$ has potential $V_B = \\frac{k(q_A + q_B)}{2r}$.\n3. Equating potentials $V_A = V_B$:\n$$\\frac{k q_A}{r} + \\frac{k q_B}{2r} = \\frac{k q_A}{2r} + \\frac{k q_B}{2r} \\implies \\frac{q_A}{r} = \\frac{q_A}{2r} \\implies q_A = 0$$\n4. All charge from the inner sphere transfers entirely to the outer surface of shell $B$.\n5. By conservation of charge:\n$$q_B = 5\\,\\mu\\text{C} + 3\\,\\mu\\text{C} = 8\\,\\mu\\text{C}$$\nHence, charge on $A$ is $0$ and on $B$ is $8\\,\\mu\\text{C}$."
  },
  {
    q_num: 23,
    question_text: "There are two identical capacitors. The first one is uncharged and filled with dielectric constant $K$ while the other is charged to potential $V$ having air between its plates. If two capacitors are joined end to end, the common potential would be",
    options: [
      "$\\frac{V}{K - 1}$",
      "$\\frac{KV}{K + 1}$",
      "$\\frac{KV}{K - 1}$",
      "$\\frac{V}{K + 1}$"
    ],
    correct_index: 3,
    topic: "Common Potential of Capacitors",
    difficulty: "easy",
    image_url: "",
    solution: "1. Let $C$ be the capacitance of the uncharged air capacitor. When filled with dielectric of constant $K$, its capacitance becomes $C_1 = KC$. Since it is uncharged, $q_1 = 0$.\n2. The second capacitor has capacitance $C_2 = C$ and is charged to potential $V$, so initial charge is $q_2 = CV$.\n3. When connected in parallel (end to end), total charge is conserved:\n$$Q_{\\text{total}} = q_1 + q_2 = 0 + CV = CV$$\n4. Total capacitance in parallel is $C_{\\text{eq}} = C_1 + C_2 = KC + C = (K+1)C$.\n5. The common potential is:\n$$V_{\\text{common}} = \\frac{Q_{\\text{total}}}{C_{\\text{eq}}} = \\frac{CV}{(K+1)C} = \\frac{V}{K+1}$$"
  },

  // Page 22: Q24 to Q26
  {
    q_num: 24,
    question_text: "An uncharged metallic sphere is placed in a uniform electric field produced by two oppositely charged large plates. The lines of force appear as",
    options: ["Pattern (1)", "Pattern (2)", "Pattern (3)", "Pattern (4)"],
    correct_index: 2,
    topic: "Electric Field Lines and Conductors",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q24.png",
    solution: "1. Electric field inside a conductor at electrostatic equilibrium is zero, so electric field lines cannot enter into the interior of the metallic sphere.\n2. The surface of a conductor is an equipotential surface, which means electric field lines must be strictly perpendicular (normal) to the conductor surface at all points of entry and exit.\n3. Pattern (3) shows field lines terminating normally on the surface with zero lines inside the sphere, which correctly represents the electrostatic field."
  },
  {
    q_num: 25,
    question_text: "Three charged particles having charges $q, -2q$ and $q$ are placed at points $(-a, 0), (0, 0)$ and $(a, 0)$ respectively. The expression for electric potential at $(0, r)$ is ($k = \\frac{1}{4\\pi\\varepsilon_0}$) ($r \\gg a$)",
    options: [
      "$\\frac{kqa^2}{r^3}$",
      "$-\\frac{kqa^2}{r^3}$",
      "$-\\frac{4kqa^2}{r^3}$",
      "$\\frac{8kqa^2}{r^3}$"
    ],
    correct_index: 1,
    topic: "Electric Quadrupole Potential",
    difficulty: "medium",
    image_url: "",
    solution: "1. The distances of the three charges from point $(0, r)$ on the $y$-axis are:\n- From $(-a, 0)$: $d_1 = \\sqrt{r^2 + a^2}$\n- From $(0, 0)$: $d_2 = r$\n- From $(a, 0)$: $d_3 = \\sqrt{r^2 + a^2}$\n\n2. The electric potential at $(0, r)$ is:\n$$V = \\frac{kq}{\\sqrt{r^2 + a^2}} + \\frac{k(-2q)}{r} + \\frac{kq}{\\sqrt{r^2 + a^2}} = 2kq(r^2 + a^2)^{-1/2} - \\frac{2kq}{r}$$\n\n3. Factoring out $\\frac{2kq}{r}$ and using binomial expansion for $r \\gg a$:\n$$V = \\frac{2kq}{r}\\left[\\left(1 + \\frac{a^2}{r^2}\\right)^{-1/2} - 1\\right] \\approx \\frac{2kq}{r}\\left[\\left(1 - \\frac{1}{2}\\frac{a^2}{r^2}\\right) - 1\\right] = \\frac{2kq}{r}\\left(-\\frac{a^2}{2r^2}\\right) = -\\frac{kqa^2}{r^3}$$"
  },
  {
    q_num: 26,
    question_text: "Three concentric metallic shells $A, B$ and $C$ of radii $a, b$ and $c$ ($a < b < c$) have surface charge density $\\sigma, -\\sigma$ and $\\sigma$ respectively. If $A$ and $C$ are kept at potential then $c$ is equal to",
    options: [
      "$a + b$",
      "$b - a$",
      "$\\frac{a + b}{2}$",
      "$\\frac{a^2 + b^2}{2}$"
    ],
    correct_index: 0,
    topic: "Concentric Charged Shells",
    difficulty: "medium",
    image_url: "",
    solution: "1. The potential on shell $A$ is:\n$$V_A = \\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{q_A}{a} + \\frac{q_B}{b} + \\frac{q_C}{c}\\right] = \\frac{\\sigma a}{\\varepsilon_0} - \\frac{\\sigma b}{\\varepsilon_0} + \\frac{\\sigma c}{\\varepsilon_0} = \\frac{\\sigma}{\\varepsilon_0}(a - b + c)$$\n\n2. The potential on shell $C$ is:\n$$V_C = \\frac{1}{4\\pi\\varepsilon_0}\\left[\\frac{q_A + q_B + q_C}{c}\\right] = \\frac{\\sigma}{\\varepsilon_0}\\frac{a^2 - b^2 + c^2}{c}$$\n\n3. Equating $V_A = V_C$:\n$$a - b + c = \\frac{a^2 - b^2 + c^2}{c}$$\n$$c(a - b) + c^2 = a^2 - b^2 + c^2$$\n$$c(a - b) = a^2 - b^2 = (a - b)(a + b)$$\n$$c = a + b$$"
  }
];
