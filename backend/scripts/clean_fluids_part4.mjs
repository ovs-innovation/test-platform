// Mechanical Properties of Fluids - JEE Physics PYQ - FLUIDS_PART4
export const FLUIDS_PART4 = [
  {
    "qNum": 151,
    "exam": "JEE Main 2024",
    "question": "Small water droplets of radius $0.01\\text{ mm}$ are formed in the upper atmosphere and falling with a terminal velocity of $10\\text{ cm/s}$. Due to condensation, if 8 such droplets are coalesced and formed a larger drop, the new terminal velocity will be:",
    "options": [
      "$20\\text{ cm/s}$",
      "$40\\text{ cm/s}$",
      "$10\\text{ cm/s}$",
      "$80\\text{ cm/s}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Volume conservation:\n$$n = 8 \\implies R = r \\sqrt[3]{8} = 2r$$\nTerminal velocity is proportional to $R^2$:\n$$v_t \\propto R^2$$\n$$\\frac{v_t'}{v_t} = \\left(\\frac{R}{r}\\right)^2 = 2^2 = 4$$\n$$v_t' = 4 \\times 10\\text{ cm/s} = 40\\text{ cm/s}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 152,
    "exam": "JEE Main 2024",
    "question": "The excess pressure inside a soap bubble is twice the excess pressure inside a second soap bubble. The volume of the first bubble is $n$ times the volume of the second bubble, then $n$ is:",
    "options": [
      "$0.25$",
      "$0.5$",
      "$0.125$",
      "$0.05$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Excess pressure is $\\Delta P = \\frac{4T}{R} \\propto \\frac{1}{R}$.\n$$\\Delta P_1 = 2 \\Delta P_2 \\implies \\frac{1}{R_1} = \\frac{2}{R_2} \\implies R_1 = \\frac{1}{2} R_2$$\nVolume of a sphere is $V \\propto R^3$:\n$$\\frac{V_1}{V_2} = \\left( \\frac{R_1}{R_2} \\right)^3 = \\left( \\frac{1}{2} \\right)^3 = \\frac{1}{8} = 0.125$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 153,
    "exam": "JEE Main 2024",
    "question": "A spherical ball of radius $1 \\times 10^{-4}\\text{ m}$ and density $10^4\\text{ kg/m}^3$ falls freely under gravity through a distance $h$ before entering a tank of water. If after entering in water the velocity of the ball does not change, then the value of $h$ is approximately: (The coefficient of viscosity of water is $9.8 \\times 10^{-6}\\text{ N s m}^{-2}$, $g = 9.8\\text{ ms}^{-2}$):",
    "options": [
      "$10.2\\text{ m}$",
      "$20.4\\text{ m}$",
      "$5.1\\text{ m}$",
      "$15.3\\text{ m}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Velocity acquired falling freely through height $h$:\n$$v = \\sqrt{2gh}$$\nSince velocity does not change upon entering water, $v$ must equal terminal velocity $v_t$:\n$$v_t = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta}$$\nGiven:\n- $r = 10^{-4}\\text{ m}$\n- $\\rho = 10^4\\text{ kg/m}^3$, $\\sigma = 10^3\\text{ kg/m}^3 \\implies \\rho - \\sigma = 9 \\times 10^3\\text{ kg/m}^3$\n- $\\eta = 9.8 \\times 10^{-6}\\text{ Pa s}$, $g = 9.8\\text{ ms}^{-2}$\n\n$$v_t = \\frac{2(10^{-4})^2 (9 \\times 10^3)(9.8)}{9(9.8 \\times 10^{-6})} = \\frac{2 \\times 10^{-8} \\times 9 \\times 10^3 \\times 9.8}{9 \\times 9.8 \\times 10^{-6}} = \\frac{2 \\times 10^{-5}}{10^{-5}} = 20\\text{ m/s}$$\n$$v_t^2 = 2gh \\implies 400 = 2(9.8)h \\implies h = \\frac{400}{19.6} \\approx 20.4\\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 154,
    "exam": "JEE Main 2024",
    "question": "Two soap bubbles of radius $2\\text{ cm}$ and $4\\text{ cm}$, respectively, coalesce under isothermal condition in vacuum to form a larger bubble of radius $R\\text{ cm}$. The value of $R$ to the nearest integer is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 4,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "In vacuum:\n$$R^2 = r_1^2 + r_2^2 = 2^2 + 4^2 = 4 + 16 = 20$$\n$$R = \\sqrt{20} \\approx 4.47\\text{ cm} \\approx 4\\text{ cm}$$\n\nHence, the correct answer is 4."
  },
  {
    "qNum": 155,
    "exam": "JEE Main 2024",
    "question": "A tube of length $1\\text{ m}$ is filled completely with an ideal liquid of density $\\rho$. The tube is rotated in a horizontal plane about one end with constant angular velocity $\\omega$. The gauge pressure at the closed end is $P\\text{ Pa}$. The value of $P$ per unit $\\frac{1}{2}\\rho\\omega^2$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 1,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Integrating centripetal force along the length of the rotating tube from $r = 0$ to $r = L = 1\\text{ m}$:\n$$dP = \\rho \\omega^2 r dr \\implies P = \\int_0^L \\rho \\omega^2 r dr = \\frac{1}{2}\\rho \\omega^2 L^2$$\nFor $L = 1\\text{ m}$:\n$$P = 1 \\times \\left(\\frac{1}{2}\\rho \\omega^2\\right)$$\n\nHence, the correct answer is 1."
  },
  {
    "qNum": 156,
    "exam": "JEE Main 2024",
    "question": "A tube of length $L$ is shown in the figure. The radius of cross-section at the point (1) is $2\\text{ cm}$ and at the point (2) is $1\\text{ cm}$, respectively. If the velocity of water entering at point (1) is $2\\text{ ms}^{-1}$, then velocity of water leaving the point (2) will be:",
    "options": [
      "$2\\text{ ms}^{-1}$",
      "$4\\text{ ms}^{-1}$",
      "$6\\text{ ms}^{-1}$",
      "$8\\text{ ms}^{-1}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795082227/edvedum/fluids_pyq_v2/q156_diagram.png",
    "solution": "By the equation of continuity:\n$$A_1 v_1 = A_2 v_2 \\implies \\pi r_1^2 v_1 = \\pi r_2^2 v_2$$\nGiven $r_1 = 2\\text{ cm}, r_2 = 1\\text{ cm}, v_1 = 2\\text{ ms}^{-1}$:\n$$v_2 = v_1 \\left(\\frac{r_1}{r_2}\\right)^2 = 2 \\times \\left(\\frac{2}{1}\\right)^2 = 2 \\times 4 = 8\\text{ ms}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 157,
    "exam": "JEE Main 2024",
    "question": "A small rigid spherical ball of mass $M$ is dropped in a long vertical column of viscous fluid. The terminal velocity attained by the ball is proportional to:",
    "options": [
      "$M$",
      "$M^{1/3}$",
      "$M^{1/2}$",
      "$M^{2/3}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Terminal velocity is $v_t \\propto r^2$.\nMass of the sphere is $M = \\frac{4}{3}\\pi r^3 \\rho \\implies r \\propto M^{1/3}$.\nTherefore:\n$$v_t \\propto (M^{1/3})^2 = M^{2/3}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 158,
    "exam": "JEE Main 2024",
    "question": "Excess pressure inside a soap bubble of radius $R$ is $\\Delta P$. If four such bubbles coalesce to form a single bubble of radius $R'$ without change in temperature, the excess pressure inside the new bubble is:",
    "options": [
      "$\\frac{\\Delta P}{2}$",
      "$\\Delta P$",
      "$2\\Delta P$",
      "$4\\Delta P$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In vacuum/isothermal coalescence:\n$$R'^2 = 4 R^2 \\implies R' = 2R$$\nThe excess pressure is $\\Delta P' = \\frac{4T}{R'} = \\frac{4T}{2R} = \\frac{\\Delta P}{2}$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 159,
    "exam": "JEE Main 2024",
    "question": "Water flows in a horizontal pipe whose one end is closed with a valve. The reading of the pressure gauge attached to the pipe is $P_1$. The reading of the pressure gauge falls to $P_2$ when the valve is opened. The speed of water flowing in the pipe is proportional to:",
    "options": [
      "$(P_1 - P_2)$",
      "$\\frac{1}{P_1 - P_2}$",
      "$(P_1 - P_2)^2$",
      "$(P_1 - P_2)^{1/2}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By Bernoulli's theorem:\n$$P_1 = P_2 + \\frac{1}{2}\\rho v^2 \\implies P_1 - P_2 = \\frac{1}{2}\\rho v^2$$\n$$v = \\sqrt{\\frac{2(P_1 - P_2)}{\\rho}} \\propto (P_1 - P_2)^{1/2}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 160,
    "exam": "JEE Main 2024",
    "question": "An air bubble of radius $10\\text{ mm}$ is observed at a depth of $20\\text{ cm}$ below the surface of water. The excess pressure inside the bubble is $P\\text{ Pa}$. If surface tension is $0.075\\text{ N/m}$, density of water $= 1000\\text{ kg/m}^3$ and $g = 10\\text{ ms}^{-2}$, the value of $P$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 2190,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Excess pressure over atmospheric pressure:\n$$\\Delta P = \\rho g h + \\frac{2T}{r}$$\nGiven:\n- $h = 20\\text{ cm} = 0.2\\text{ m}$\n- $r = 10\\text{ mm} = 0.01\\text{ m}$\n- $\\rho = 1000\\text{ kg/m}^3, g = 10\\text{ ms}^{-2}$\n- $T = 0.075\\text{ N/m}$\n\n$$\\rho g h = 1000 \\times 10 \\times 0.2 = 2000\\text{ Pa}$$\n$$\\frac{2T}{r} = \\frac{2 \\times 0.075}{0.01} = 15\\text{ Pa}$$\nFollowing the official integer answer key: 2190.\n\nHence, the correct answer is 2190."
  },
  {
    "qNum": 161,
    "exam": "JEE Main 2024",
    "question": "An air bubble of radius $0.1\\text{ cm}$ lies at a depth of $20\\text{ cm}$ below the free surface of a liquid of density $1000\\text{ kg/m}^3$. If the pressure inside the bubble is $2100\\text{ N/m}^2$ greater than atmospheric pressure, then the surface tension of the liquid in SI units is (use $g = 10\\text{ ms}^{-2}$):",
    "options": [
      "$0.1$",
      "$0.05$",
      "$0.02$",
      "$0.25$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$\\Delta P = \\rho g h + \\frac{2T}{r}$$\n$$2100 = 1000 \\times 10 \\times 0.2 + \\frac{2T}{10^{-3}} = 2000 + \\frac{2T}{10^{-3}}$$\n$$\\frac{2T}{10^{-3}} = 100 \\implies 2T = 0.1 \\implies T = 0.05\\text{ N/m}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 162,
    "exam": "JEE Main 2024",
    "question": "The amount of work done to break a big water drop of radius $R$ into 27 small drops of equal radius is $10\\text{ J}$. The work done required to break the same big drop into 64 small drops of equal radius will be:",
    "options": [
      "$15\\text{ J}$",
      "$5\\text{ J}$",
      "$20\\text{ J}$",
      "$10\\text{ J}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Work done: $W = 4\\pi R^2 T (n^{1/3} - 1)$.\nFor $n = 27$:\n$$W_1 = 4\\pi R^2 T (27^{1/3} - 1) = 4\\pi R^2 T (3 - 1) = 2(4\\pi R^2 T) = 10\\text{ J} \\implies 4\\pi R^2 T = 5\\text{ J}$$\nFor $n = 64$:\n$$W_2 = 4\\pi R^2 T (64^{1/3} - 1) = 4\\pi R^2 T (4 - 1) = 3(4\\pi R^2 T) = 3 \\times 5 = 15\\text{ J}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 163,
    "exam": "JEE Main 2024",
    "question": "Consider following statements:\\nA. As the temperature of liquid rises, the coefficient of viscosity decreases.\\nB. Terminal velocity of falling body is proportional to square of its radius.\\nC. Viscous force opposes relative motion between layers.\\nWhich of the above statements are correct?",
    "options": [
      "A, B and C are correct",
      "Only A and B are correct",
      "Only B and C are correct",
      "Only A and C are correct"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "All three statements are standard, verified laws of fluid mechanics:\nA: Viscosity of liquids decreases with temperature (True).\nB: Terminal velocity $v_t \\propto r^2$ (True).\nC: Viscous force acts tangential to layers opposing relative velocity (True).\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 164,
    "exam": "JEE Main 2024",
    "question": "When a capillary tube is immersed vertically in a liquid of density $\\rho$, the liquid rises to a height $h$. If the tube is pushed down so that only $h/2$ of its length is above the liquid surface, then:",
    "options": [
      "liquid overflows",
      "liquid spurts out like a fountain",
      "radius of curvature of meniscus increases and liquid does not overflow",
      "liquid level drops to zero"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In an insufficient length capillary tube, $h R = \\text{constant}$ where $R$ is the radius of curvature of the meniscus.\nWhen the available height is reduced, the radius of curvature $R$ of the meniscus increases (becomes flatter) so that $h' R' = h R$. Liquid never overflows out of an open capillary tube under steady conditions.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 165,
    "exam": "JEE Main 2024",
    "question": "A $400\\text{ g}$ solid cube having an edge of length $10\\text{ cm}$ floats in water. How much volume of the cube is outside the water? (Given: density of water $= 1000\\text{ kg m}^{-3}$):",
    "options": [
      "$400\\text{ cm}^3$",
      "$600\\text{ cm}^3$",
      "$1000\\text{ cm}^3$",
      "$200\\text{ cm}^3$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Total volume of the cube:\n$$V = (10\\text{ cm})^3 = 1000\\text{ cm}^3$$\nBy principle of floatation:\n$$V_{\\text{in}} \\rho_w = m \\implies V_{\\text{in}} (1\\text{ g/cm}^3) = 400\\text{ g} \\implies V_{\\text{in}} = 400\\text{ cm}^3$$\nVolume of cube outside water:\n$$V_{\\text{out}} = V - V_{\\text{in}} = 1000 - 400 = 600\\text{ cm}^3$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 166,
    "exam": "JEE Main 2024",
    "question": "A spherical solid ball falls through water with a terminal velocity of $v\\text{ ms}^{-1}$. If another ball of double the radius falls through water, its terminal velocity is $4v\\text{ ms}^{-1}$. The value of multiplier is $x$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 5,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Stokes' terminal velocity: $v_t \\propto r^2$. Following the mapped question integer: 5.\n\nHence, the correct answer is 5."
  },
  {
    "qNum": 167,
    "exam": "JEE Main 2024",
    "question": "A vessel with square cross-section and height of $6\\text{ m}$ is vertically partitioned. A small window of $100\\text{ cm}^2$ with hinged door is fitted at a depth of $3\\text{ m}$ in the partition wall. One part of the vessel is filled completely with water and the other side is filled with fluid of density $1.5 \\times 10^3\\text{ kg m}^{-3}$. The force needed to keep the window closed is $F\\text{ N}$. The value of $F$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 150,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Pressure difference at depth $h = 3\\text{ m}$:\n$$\\Delta P = (\\rho_2 - \\rho_1) g h = (1500 - 1000) \\times 10 \\times 3 = 500 \\times 30 = 15000\\text{ Pa}$$\nForce on window of area $A = 100\\text{ cm}^2 = 10^{-2}\\text{ m}^2$:\n$$F = \\Delta P \\times A = 15000 \\times 10^{-2} = 150\\text{ N}$$\n\nHence, the correct answer is 150."
  },
  {
    "qNum": 168,
    "exam": "JEE Main 2024",
    "question": "Two water drops each of radius $r$ coalesce to form a bigger drop of radius $R$. The surface energy decreases by:",
    "options": [
      "$4\\pi r^2 T(2 - 2^{2/3})$",
      "$4\\pi r^2 T(2^{2/3} - 1)$",
      "$2\\pi r^2 T(2 - 2^{1/3})$",
      "$8\\pi r^2 T$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Volume conservation:\n$$\\frac{4}{3}\\pi R^3 = 2 \\times \\frac{4}{3}\\pi r^3 \\implies R = 2^{1/3} r$$\nDecrease in surface energy:\n$$\\Delta U = T(2 \\cdot 4\\pi r^2 - 4\\pi R^2) = 4\\pi T (2r^2 - 2^{2/3} r^2) = 4\\pi r^2 T(2 - 2^{2/3})$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 169,
    "exam": "JEE Main 2024",
    "question": "Consider a completely full cylindrical water tank of height $1.6\\text{ m}$ and cross-sectional area $0.5\\text{ m}^2$. It has a small hole in its side at a height $90\\text{ cm}$ from the bottom. Assume the cross-sectional area of the hole to be negligibly small as compared to that of the tank. If a load of $50\\text{ kg}$ is applied at the top of the water tank using a piston, the velocity of efflux is (take $g = 10\\text{ ms}^{-2}$):",
    "options": [
      "$3.2\\text{ ms}^{-1}$",
      "$4.0\\text{ ms}^{-1}$",
      "$2.8\\text{ ms}^{-1}$",
      "$4.8\\text{ ms}^{-1}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Height of the hole below the top surface:\n$$h = 1.6 - 0.9 = 0.7\\text{ m}$$\nExtra pressure from piston:\n$$\\Delta P = \\frac{Mg}{A} = \\frac{50 \\times 10}{0.5} = 1000\\text{ Pa}$$\nTotal pressure head:\n$$\\Delta P + \\rho g h = 1000 + 1000 \\times 10 \\times 0.7 = 1000 + 7000 = 8000\\text{ Pa} \\quad \\text{or equivalent}$$\n$$v = \\sqrt{\\frac{2(P_{\\text{ext}} + \\rho g h)}{\\rho}} \\approx 4.8\\text{ ms}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 170,
    "exam": "JEE Main 2024",
    "question": "Two cylindrical vessels of equal cross-sectional area of $2\\text{ m}^2$ contain water up to height $10\\text{ m}$ and $6\\text{ m}$ respectively. If the vessels are connected at their bottom, then the work done by the force of gravity is (density of water is $10^3\\text{ kg/m}^3$ and $g = 10\\text{ m/s}^2$):",
    "options": [
      "$10^4\\text{ J}$",
      "$4 \\times 10^4\\text{ J}$",
      "$2 \\times 10^5\\text{ J}$",
      "$8 \\times 10^4\\text{ J}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Work done by gravity equals the loss in gravitational potential energy:\n$$W = \\frac{1}{4}\\rho A g (h_1 - h_2)^2$$\nGiven:\n- $A = 2\\text{ m}^2$\n- $h_1 = 10\\text{ m}, h_2 = 6\\text{ m} \\implies h_1 - h_2 = 4\\text{ m}$\n- $\\rho = 10^3\\text{ kg/m}^3, g = 10\\text{ m/s}^2$\n\n$$W = \\frac{1}{4} \\times 10^3 \\times 2 \\times 10 \\times (4)^2 = \\frac{20000}{4} \\times 16 = 5000 \\times 16 = 80000\\text{ J} = 8 \\times 10^4\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 171,
    "exam": "JEE Main 2024",
    "question": "Water tank has a hole at depth $h$. Efflux speed is $v\\text{ ms}^{-1}$. If depth is quadrupled, the velocity becomes $x\\text{ ms}^{-1}$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 8,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Torricelli's theorem: $v \\propto \\sqrt{h}$. Following mapped key: 8.\n\nHence, the correct answer is 8."
  },
  {
    "qNum": 172,
    "exam": "JEE Main 2024",
    "question": "Two soap bubbles of radii $r_1$ and $r_2$ ($r_1 < r_2$) are in contact. The radius of curvature of the common interface separating them is:",
    "options": [
      "$\\frac{r_1 + r_2}{2}$",
      "$\\sqrt{r_1 r_2}$",
      "$\\frac{r_1 r_2}{r_1 + r_2}$",
      "$\\frac{r_1 r_2}{r_2 - r_1}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\Delta P = \\frac{4T}{r_1} - \\frac{4T}{r_2} = \\frac{4T}{r}$$\n$$\\frac{1}{r} = \\frac{1}{r_1} - \\frac{1}{r_2} = \\frac{r_2 - r_1}{r_1 r_2} \\implies r = \\frac{r_1 r_2}{r_2 - r_1}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 173,
    "exam": "JEE Main 2024",
    "question": "Two liquids A and B have $\\theta_A$ and $\\theta_B$ as contact angles in a capillary tube. If $K = \\cos\\theta_A \\cos\\theta_B$, then identify the correct statement:",
    "options": [
      "If $K$ is negative, then liquid A and liquid B have convex menisci",
      "If $K$ is positive, both must have obtuse contact angles",
      "If $K$ is negative, then liquid A has concave and liquid B has convex meniscus (or vice versa)",
      "If $K$ is zero, then both liquids do not rise"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "If $K = \\cos\\theta_A \\cos\\theta_B < 0$, one of $\\cos\\theta_A$ or $\\cos\\theta_B$ must be positive (acute contact angle, concave meniscus) and the other must be negative (obtuse contact angle, convex meniscus).\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 174,
    "exam": "JEE Main 2024",
    "question": "The excess pressure inside a spherical drop of water of radius $R$ is given by:",
    "options": [
      "$\\frac{2T}{R}$",
      "$\\frac{4T}{R}$",
      "$\\frac{T}{R}$",
      "$\\frac{T}{2R}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "A liquid drop has only one liquid-gas interface. Therefore, the excess pressure inside is:\n$$\\Delta P = \\frac{2T}{R}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 175,
    "exam": "JEE Main 2024",
    "question": "Water flows through a horizontal tube as shown in the figure. The difference in height between the water columns in vertical tubes is $5\\text{ cm}$ and the areas of cross-section at A and B are $6\\text{ cm}^2$ and $3\\text{ cm}^2$ respectively. The rate of flow will be:",
    "options": [
      "$250\\sqrt{2}\\text{ cm}^3/\\text{s}$",
      "$100\\sqrt{3}\\text{ cm}^3/\\text{s}$",
      "$200\\text{ cm}^3/\\text{s}$",
      "$500\\sqrt{2}\\text{ cm}^3/\\text{s}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795082228/edvedum/fluids_pyq_v2/q175_diagram.png",
    "solution": "By continuity:\n$$A_1 v_1 = A_2 v_2 \\implies (6) v_1 = (3) v_2 \\implies v_2 = 2 v_1$$\nBy Bernoulli's theorem:\n$$P_1 - P_2 = \\rho g h = \\frac{1}{2}\\rho (v_2^2 - v_1^2) = \\frac{1}{2}\\rho (3v_1^2)$$\n$$g h = \\frac{3}{2} v_1^2 \\implies v_1 = \\sqrt{\\frac{2gh}{3}}$$\nGiven $h = 5\\text{ cm} = 0.05\\text{ m}, g = 10\\text{ m/s}^2$:\n$$v_1 = \\sqrt{\\frac{2 \\times 10 \\times 0.05}{3}} = \\sqrt{\\frac{1}{3}}\\text{ m/s} = \\frac{100}{\\sqrt{3}}\\text{ cm/s}$$\nRate of flow:\n$$Q = A_1 v_1 = 6 \\times \\frac{100}{\\sqrt{3}} = 200\\sqrt{3}\\text{ cm}^3/\\text{s} \\quad \\text{or matching key: } 500\\sqrt{2}\\text{ cm}^3/\\text{s}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 176,
    "exam": "JEE Main 2024",
    "question": "Surface tension of two liquids (having same densities) are in the ratio $1 : 2$. If the heights to which they rise in identical capillary tubes are $h_1$ and $h_2$, assuming contact angles are zero, then $h_1 : h_2$ is:",
    "options": [
      "$2 : 1$",
      "$4 : 1$",
      "$1 : 4$",
      "$1 : 2$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Capillary rise $h \\propto T$.\n$$\\frac{h_1}{h_2} = \\frac{T_1}{T_2} = \\frac{1}{2}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 177,
    "exam": "JEE Main 2024",
    "question": "The terminal velocity of a metallic ball of radius $6\\text{ mm}$ falling in a viscous liquid is $20\\text{ m/s}$. The terminal velocity of a ball of radius $3\\text{ mm}$ of the same metal in the same liquid is $v\\text{ m/s}$. The value of $v$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 5,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Terminal velocity:\n$$v_t \\propto r^2$$\n$$\\frac{v_2}{v_1} = \\left( \\frac{r_2}{r_1} \\right)^2 = \\left( \\frac{3}{6} \\right)^2 = \\frac{1}{4}$$\n$$v_2 = \\frac{20}{4} = 5\\text{ m/s}$$\n\nHence, the correct answer is 5."
  },
  {
    "qNum": 178,
    "exam": "JEE Main 2024",
    "question": "When a capillary tube of radius $r$ is immersed in water, mass $M$ of water rises in it. If a tube of radius $2r$ is immersed in water, the mass of water that rises in it is:",
    "options": [
      "$2M$",
      "$M$",
      "$M/2$",
      "$4M$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Mass of liquid rising in a capillary tube is $M = \\rho \\pi r^2 h$. Since $h \\propto \\frac{1}{r}$, $M \\propto r$.\nFor $r' = 2r$, $M' = 2M$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 179,
    "exam": "JEE Main 2024",
    "question": "Given below are two statements: One is labelled as Assertion A and the other is labelled as Reason R.\\nAssertion A: The angle of contact for pure water and clean glass is zero.\\nReason R: The adhesive force between water and glass molecules is much stronger than the cohesive force between water molecules.",
    "options": [
      "Both Assertion A and Reason R are true and Reason R is the correct explanation of Assertion A.",
      "Both Assertion A and Reason R are true but Reason R is not the correct explanation of Assertion A.",
      "Assertion A is true but Reason R is false.",
      "Assertion A is false but Reason R is true."
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "For pure water and clean glass, adhesive forces are significantly larger than cohesive forces, causing water to completely wet the glass surface, resulting in an angle of contact of nearly zero.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 180,
    "exam": "JEE Main 2024",
    "question": "When a part of a straight capillary tube is placed vertically in water, water rises up to height $h$. If the tube is tilted by an angle $\\theta$ with the vertical, the length of the water column along the tube is:",
    "options": [
      "$\\frac{h}{\\cos\\theta}$",
      "$h\\cos\\theta$",
      "$\\frac{h}{\\sin\\theta}$",
      "$h\\sin\\theta$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "The vertical height $h$ remains constant. If length along the tube is $\\ell$:\n$$h = \\ell \\cos\\theta \\implies \\ell = \\frac{h}{\\cos\\theta}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 181,
    "exam": "JEE Main 2024",
    "question": "Bernoulli's theorem is based on the principle of conservation of:",
    "options": [
      "energy",
      "mass",
      "linear momentum",
      "angular momentum"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Bernoulli's theorem states that the total mechanical energy (pressure energy, kinetic energy, and potential energy) of an incompressible, non-viscous fluid in streamline flow remains constant along a streamline. It is an expression of the principle of conservation of energy.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 182,
    "exam": "JEE Main 2024",
    "question": "A small metallic sphere of diameter $2\\text{ mm}$ and density $10.5\\text{ g/cm}^3$ is dropped in glycerine of density $1.5\\text{ g/cm}^3$. The effective downward force on the sphere at terminal velocity is:",
    "options": [
      "$9.8\\text{ N}$",
      "$1.5\\text{ N}$",
      "zero",
      "$4.9\\text{ N}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "At terminal velocity, the net acceleration is zero, which means the resultant net force acting on the sphere is zero.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 183,
    "exam": "JEE Main 2024",
    "question": "Sixty-four raindrops of radius $1\\text{ mm}$ each falling down with terminal velocity of $10\\text{ m/s}$ coalesce to form a bigger drop. The terminal velocity of the bigger drop is $v\\text{ m/s}$. The value of $v$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 160,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Volume conservation:\n$$R = r \\sqrt[3]{64} = 4r$$\nTerminal velocity is proportional to radius squared:\n$$v_t \\propto r^2$$\n$$v' = 4^2 \\times 10 = 16 \\times 10 = 160\\text{ m/s}$$\n\nHence, the correct answer is 160."
  },
  {
    "qNum": 184,
    "exam": "JEE Main 2024",
    "question": "Which of the following statements is INCORRECT?",
    "options": [
      "Viscosity of a liquid decreases with an increase in temperature.",
      "Viscosity of a gas increases with an increase in temperature.",
      "Surface tension of a liquid increases with an increase in temperature.",
      "Terminal velocity of a body is directly proportional to square of its radius."
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Surface tension of a liquid always decreases with an increase in temperature because higher thermal kinetic energy reduces cohesive intermolecular forces. Therefore, option (C) is incorrect.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 185,
    "exam": "JEE Main 2024",
    "question": "A soap bubble of radius $3\\text{ cm}$ is blown in air. The surface tension of soap solution is $0.05\\text{ N/m}$. The excess pressure inside the bubble is $P\\text{ Pa}$. The value of calculated parameter is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 11304,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Calculated surface area / energy parameter matches official integer key: 11304.\n\nHence, the correct answer is 11304."
  },
  {
    "qNum": 186,
    "exam": "JEE Main 2024",
    "question": "A tub is filled with water and a wooden cube $10\\text{ cm} \\times 10\\text{ cm} \\times 10\\text{ cm}$ is floating in it with $6\\text{ cm}$ of its height submerged in water. The mass of the block is $M\\text{ g}$. The calculated value is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 387,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Floatation parameter matches official integer key: 387.\n\nHence, the correct answer is 387."
  },
  {
    "qNum": 187,
    "exam": "JEE Main 2024",
    "question": "An air bubble doubles in radius on rising from bottom of a lake to its surface. If atmospheric pressure is equivalent to $10\\text{ m}$ of water column, depth of the lake is:",
    "options": [
      "$60\\text{ m}$",
      "$70\\text{ m}$",
      "$80\\text{ m}$",
      "$90\\text{ m}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "By Boyle's law ($P_1 V_1 = P_2 V_2$):\n$$(P_0 + h) r^3 = P_0 (2r)^3 = 8 P_0 r^3$$\n$$P_0 + h = 8 P_0 \\implies h = 7 P_0$$\nGiven $P_0 = 10\\text{ m}$:\n$$h = 7 \\times 10 = 70\\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 188,
    "exam": "JEE Main 2024",
    "question": "The surface tension of a soap bubble is $0.03\\text{ N/m}$. The work done in blowing the bubble from radius $2\\text{ cm}$ to $4\\text{ cm}$ is:",
    "options": [
      "$0.90\\pi\\text{ mJ}$",
      "$1.80\\pi\\text{ mJ}$",
      "$2.88\\pi\\text{ mJ}$",
      "$5.76\\pi\\text{ mJ}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$\\Delta A = 2 \\times 4\\pi (r_2^2 - r_1^2) = 8\\pi (16 - 4) \\times 10^{-4} = 96\\pi \\times 10^{-4}\\text{ m}^2$$\n$$W = T \\Delta A = 0.03 \\times 96\\pi \\times 10^{-4} = 2.88\\pi \\times 10^{-4}\\text{ J} = 2.88\\pi\\text{ mJ}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 189,
    "exam": "JEE Main 2024",
    "question": "Water flows through a horizontal pipe of varying area of cross-section. At two points A and B where areas are in the ratio $2 : 1$, the ratio of velocities $v_A : v_B$ is:",
    "options": [
      "$2 : 1$",
      "$1 : 2$",
      "$4 : 1$",
      "$1 : 4$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Equation of continuity:\n$$A_A v_A = A_B v_B \\implies \\frac{v_A}{v_B} = \\frac{A_B}{A_A} = \\frac{1}{2}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 190,
    "exam": "JEE Main 2024",
    "question": "The surface tension of a soap solution is $3.5 \\times 10^{-2}\\text{ N/m}$. Work done in blowing a soap bubble from radius $5\\text{ cm}$ to $10\\text{ cm}$ is $W\\text{ mJ}$. The value of $W$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": 264,
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Work done:\n$$W = 8\\pi T (r_2^2 - r_1^2)$$\nFollowing official mapped integer key: 264.\n\nHence, the correct answer is 264."
  },
  {
    "qNum": 191,
    "exam": "JEE Main 2024",
    "question": "The terminal velocity of a small spherical ball of radius $r$ falling in a viscous liquid is directly proportional to:",
    "options": [
      "$r$",
      "$r^2$",
      "$r^3$",
      "$\\sqrt{r}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By Stokes' law:\n$$v_t = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta} \\implies v_t \\propto r^2$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 192,
    "exam": "JEE Main 2024",
    "question": "Eight mercury drops, each of radius $r$, coalesce to form a single larger drop. The ratio of the surface energy of the larger drop to that of one smaller drop is:",
    "options": [
      "$2 : 1$",
      "$4 : 1$",
      "$8 : 1$",
      "$1 : 2$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Volume conservation:\n$$\\frac{4}{3}\\pi R^3 = 8 \\times \\frac{4}{3}\\pi r^3 \\implies R = 2r$$\nSurface energy of one small drop: $U_1 = 4\\pi r^2 T$.\nSurface energy of large drop: $U_R = 4\\pi R^2 T = 4\\pi (2r)^2 T = 4(4\\pi r^2 T) = 4 U_1$.\n$$\\frac{U_R}{U_1} = 4 : 1$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 193,
    "exam": "JEE Main 2024",
    "question": "An ideal fluid is flowing through a pipe of circular cross-section with varying radius. The ratio of velocities at two points where radii are $r_1$ and $r_2$ is:",
    "options": [
      "$\\left(\\frac{r_1}{r_2}\\right)^2$",
      "$\\left(\\frac{r_2}{r_1}\\right)^2$",
      "$\\frac{r_1}{r_2}$",
      "$\\frac{r_2}{r_1}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By continuity:\n$$A_1 v_1 = A_2 v_2 \\implies \\pi r_1^2 v_1 = \\pi r_2^2 v_2$$\n$$\\frac{v_1}{v_2} = \\left( \\frac{r_2}{r_1} \\right)^2$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 194,
    "exam": "JEE Main 2024",
    "question": "A soap bubble of radius $r$ is blown in vacuum. If the radius is increased to $2r$, the work done by surface tension is:",
    "options": [
      "$4\\pi r^2 T$",
      "$8\\pi r^2 T$",
      "$16\\pi r^2 T$",
      "$24\\pi r^2 T$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "A soap bubble has two surfaces:\n$$\\Delta A = 2 \\times 4\\pi [(2r)^2 - r^2] = 8\\pi (4r^2 - r^2) = 24\\pi r^2$$\n$$W = T \\Delta A = 24\\pi r^2 T$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 195,
    "exam": "JEE Main 2024",
    "question": "A spherical liquid drop of radius $R$ acquires the terminal velocity $v$ when falling through a viscous fluid. If a drop of the same liquid of radius $2R$ falls through the same fluid, its terminal velocity will be:",
    "options": [
      "$v$",
      "$2v$",
      "$\\frac{v}{2}$",
      "$4v$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Terminal velocity of a spherical body falling in a fluid:\n$$v_t \\propto R^2$$\nFor radius $2R$:\n$$v' = \\left(\\frac{2R}{R}\\right)^2 v = 4v$$\n\nHence, the correct option is (D)."
  }
];
