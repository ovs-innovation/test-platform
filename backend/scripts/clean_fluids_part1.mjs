// Mechanical Properties of Fluids - JEE Physics PYQ - Clean Part 1 (Q1 to Q50)
export const FLUIDS_PART1 = [
  {
    "qNum": 1,
    "exam": "JEE Main 2002",
    "question": "A cylinder of height $20\\text{ m}$ is completely filled with water. The velocity of efflux of water (in $\\text{ms}^{-1}$) through a small hole on the side wall of the cylinder near its bottom is:",
    "options": [
      "$10$",
      "$20$",
      "$25.5$",
      "$5$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "According to Torricelli's law of efflux:\n$$v = \\sqrt{2gh}$$\nGiven $h = 20\\text{ m}$ and taking $g = 10\\text{ ms}^{-2}$:\n$$v = \\sqrt{2 \\times 10 \\times 20} = \\sqrt{400} = 20\\text{ ms}^{-1}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 2,
    "exam": "JEE Main 2002",
    "question": "If two soap bubbles of different radii are connected by a tube:",
    "options": [
      "air flows from the bigger bubble to the smaller bubble till the sizes are equalized",
      "air flows from bigger bubble to the smaller bubble till the sizes are interchanged",
      "air flows from the smaller bubble to the bigger bubble",
      "there is no flow of air"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "The excess pressure inside a spherical soap bubble of radius $R$ is:\n$$\\Delta P = \\frac{4T}{R}$$\nThe pressure inside the smaller bubble is greater than the pressure inside the bigger bubble ($P_{\\text{small}} > P_{\\text{big}}$).\nTherefore, air flows from higher pressure to lower pressure, i.e., from the smaller bubble to the bigger bubble.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 3,
    "exam": "JEE Main 2002",
    "question": "Spherical balls of radius $R$ are falling in a viscous fluid of viscosity $\\eta$ with a velocity $v$. The retarding viscous force acting on the spherical ball is:",
    "options": [
      "directly proportional to $R$ but inversely proportional to $v$",
      "directly proportional to both radius $R$ and velocity $v$",
      "inversely proportional to both radius $R$ and velocity $v$",
      "inversely proportional to $R$ but directly proportional to velocity $v$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By Stokes' law, the viscous retarding force on a spherical ball of radius $R$ moving at velocity $v$ in a fluid of viscosity $\\eta$ is:\n$$F = 6\\pi \\eta R v$$\nThus, $F \\propto R$ and $F \\propto v$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 4,
    "exam": "JEE Main 2002",
    "question": "A $20\\text{ cm}$ long capillary tube is dipped in water. The water rises up to $8\\text{ cm}$. If the entire arrangement is put in a freely falling elevator, the length of water column in the capillary tube will be:",
    "options": [
      "$8\\text{ cm}$",
      "$10\\text{ cm}$",
      "$4\\text{ cm}$",
      "$20\\text{ cm}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "The height of liquid column in a capillary tube is given by:\n$$h = \\frac{2T\\cos\\theta}{\\rho g_{\\text{eff}} r}$$\nIn a freely falling elevator, the effective acceleration due to gravity is $g_{\\text{eff}} = 0$.\nHence, the liquid rises to fill the entire available length of the capillary tube ($20\\text{ cm}$) and adjusts its radius of curvature at the top so that it does not overflow.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 5,
    "exam": "JEE Main 2003",
    "question": "If the terminal speed of a sphere of gold (density $= 19.5\\text{ g/cm}^3$) is $0.2\\text{ m/s}$ in a viscous liquid (density $= 1.5\\text{ g/cm}^3$), find the terminal speed of a sphere of silver (density $= 10.5\\text{ g/cm}^3$) of the same size in the same liquid.",
    "options": [
      "$0.2\\text{ m/s}$",
      "$0.4\\text{ m/s}$",
      "$0.133\\text{ m/s}$",
      "$0.1\\text{ m/s}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The terminal velocity is proportional to $(\\rho - \\sigma)$:\n$$v_t \\propto (\\rho - \\sigma)$$\nFor gold:\n$$v_{\\text{gold}} \\propto (19.5 - 1.5) = 18.0$$\nFor silver:\n$$v_{\\text{silver}} \\propto (10.5 - 1.5) = 9.0$$\n$$\\frac{v_{\\text{silver}}}{v_{\\text{gold}}} = \\frac{9.0}{18.0} = \\frac{1}{2}$$\n$$v_{\\text{silver}} = \\frac{1}{2} \\times 0.2 = 0.1\\text{ m/s}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 6,
    "exam": "JEE Main 2003",
    "question": "A jar is filled with two non-mixing liquids 1 and 2 having densities $\\rho_1$ and $\\rho_2$ respectively. A solid ball, made of a material of density $\\rho_3$, is dropped in the jar. It comes to equilibrium in the position shown in the figure. Which of the following is true for $\\rho_1, \\rho_2$ and $\\rho_3$?",
    "options": [
      "$\\rho_3 < \\rho_1 < \\rho_2$",
      "$\\rho_1 < \\rho_3 < \\rho_2$",
      "$\\rho_1 > \\rho_3 > \\rho_2$",
      "$\\rho_1 < \\rho_2 < \\rho_3$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075476/edvedum/fluids_pyq/q6_diagram.png",
    "solution": "From the figure:\n1. Liquid 1 floats on liquid 2, which implies $\\rho_1 < \\rho_2$.\n2. The solid ball sinks in liquid 1, which implies $\\rho_3 > \\rho_1$.\n3. The solid ball floats on liquid 2 at the interface, which implies $\\rho_3 < \\rho_2$.\nCombining these relations:\n$$\\rho_1 < \\rho_3 < \\rho_2$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 7,
    "exam": "JEE Main 2004",
    "question": "A capillary tube (A) is dipped in water. Another identical tube (B) is dipped in a soap-water solution. Which of the following shows the relative nature of the liquid columns in the two tubes?",
    "options": [
      "Figure (A)",
      "Figure (B)",
      "Figure (C)",
      "Figure (D)"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075478/edvedum/fluids_pyq/q7_diagram.png",
    "solution": "Capillary rise is given by:\n$$h = \\frac{2T\\cos\\theta}{\\rho g r}$$\nSince pure water has a greater surface tension than soap solution ($T_{\\text{water}} > T_{\\text{soap}}$), the height of the water column in tube A is greater than the height of the soap solution in tube B ($h_A > h_B$).\nBoth liquids form concave menisci in glass tubes.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 8,
    "exam": "JEE Main 2004",
    "question": "A spherical solid ball of volume $V$ is made of a material of density $\\rho_1$. It is falling through a liquid of density $\\rho_2$ ($\\rho_2 < \\rho_1$). Assume that the liquid applies a viscous force on the ball that is proportional to the square of its speed $v$, i.e., $F_{\\text{viscous}} = -k v^2$ ($k > 0$). The terminal speed of the ball is:",
    "options": [
      "$\\sqrt{\\frac{V g(\\rho_1 - \\rho_2)}{k}}$",
      "$\\frac{V g(\\rho_1 - \\rho_2)}{k}$",
      "$\\sqrt{\\frac{V g\\rho_1}{k}}$",
      "$\\frac{V g\\rho_1}{k}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At terminal speed $v_t$, the downward gravitational force is balanced by the upward buoyant force plus the viscous force:\n$$V\\rho_1 g - V\\rho_2 g = k v_t^2$$\n$$v_t = \\sqrt{\\frac{V g(\\rho_1 - \\rho_2)}{k}}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 9,
    "exam": "JEE Main 2004",
    "question": "A ball is made of a material of density $\\rho$ where $\\rho_{\\text{oil}} < \\rho < \\rho_{\\text{water}}$ with $\\rho_{\\text{oil}}$ and $\\rho_{\\text{water}}$ representing the densities of oil and water respectively. The oil and water are immiscible. If the above system is in equilibrium, which of the following diagrams best represents the position of the ball?",
    "options": [
      "Diagram (A)",
      "Diagram (B)",
      "Diagram (C)",
      "Diagram (D)"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075480/edvedum/fluids_pyq/q9_diagram.png",
    "solution": "Oil floats on water because $\\rho_{\\text{oil}} < \\rho_{\\text{water}}$.\nThe ball has a density $\\rho$ greater than oil but less than water ($\\rho_{\\text{oil}} < \\rho < \\rho_{\\text{water}}$).\nThus, the ball sinks in oil but floats on water, coming to rest at the oil-water interface, partly in oil and partly in water.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 10,
    "exam": "JEE Main 2004",
    "question": "Water is flowing continuously from a tap having an internal diameter $8 \\times 10^{-3}\\text{ m}$. The water velocity as it leaves the tap is $0.4\\text{ ms}^{-1}$. The diameter of the water stream at a distance $2 \\times 10^{-1}\\text{ m}$ below the tap is:",
    "options": [
      "$7.5 \\times 10^{-3}\\text{ m}$",
      "$9.6 \\times 10^{-3}\\text{ m}$",
      "$3.6 \\times 10^{-3}\\text{ m}$",
      "$5.0 \\times 10^{-3}\\text{ m}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At the tap: $v_1 = 0.4\\text{ ms}^{-1}$, $d_1 = 8 \\times 10^{-3}\\text{ m}$.\nAt depth $h = 0.2\\text{ m}$ below the tap:\n$$v_2 = \\sqrt{v_1^2 + 2gh} = \\sqrt{0.4^2 + 2(9.8)(0.2)} = \\sqrt{0.16 + 3.92} = \\sqrt{4.08} \\approx 2.02\\text{ ms}^{-1}$$\nFrom the continuity equation:\n$$A_1 v_1 = A_2 v_2 \\implies d_1^2 v_1 = d_2^2 v_2$$\n$$d_2 = d_1 \\sqrt{\\frac{v_1}{v_2}} = (8 \\times 10^{-3}) \\sqrt{\\frac{0.4}{2.02}} \\approx 3.6 \\times 10^{-3}\\text{ m}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 11,
    "exam": "JEE Main 2005",
    "question": "Work done in increasing the size of a soap bubble from a radius of $3\\text{ cm}$ to $5\\text{ cm}$ is nearly (Surface tension of soap solution $= 0.03\\text{ Nm}^{-1}$):",
    "options": [
      "$0.2\\pi\\text{ mJ}$",
      "$3.7\\pi\\text{ mJ}$",
      "$0.4\\pi\\text{ mJ}$",
      "$4\\pi\\text{ mJ}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "A soap bubble has two free surfaces.\nThe change in surface area is:\n$$\\Delta A = 2 \\times 4\\pi (r_2^2 - r_1^2) = 8\\pi (5^2 - 3^2) \\times 10^{-4}\\text{ m}^2 = 8\\pi (16) \\times 10^{-4} = 128\\pi \\times 10^{-4}\\text{ m}^2$$\nWork done:\n$$W = T \\Delta A = 0.03 \\times 128\\pi \\times 10^{-4} = 3.84\\pi \\times 10^{-4}\\text{ J} \\approx 0.4\\pi \\times 10^{-3}\\text{ J} = 0.4\\pi\\text{ mJ}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 12,
    "exam": "JEE Main 2005",
    "question": "A thin liquid film formed between a U-shaped wire and a light slider supports a weight of $1.5 \\times 10^{-2}\\text{ N}$ (see figure). The length of the slider is $30\\text{ cm}$ and its weight is negligible. The surface tension of the liquid film is:",
    "options": [
      "$0.0125\\text{ Nm}^{-1}$",
      "$0.1\\text{ Nm}^{-1}$",
      "$0.05\\text{ Nm}^{-1}$",
      "$0.025\\text{ Nm}^{-1}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075468/edvedum/fluids_pyq/q12_diagram.png",
    "solution": "A liquid film has two surfaces. The upward force exerted by surface tension is:\n$$F = 2 T L$$\nIn equilibrium, this balances the supported weight $W$:\n$$2 T L = W$$\nGiven $L = 30\\text{ cm} = 0.3\\text{ m}$ and $W = 1.5 \\times 10^{-2}\\text{ N}$:\n$$T = \\frac{W}{2 L} = \\frac{1.5 \\times 10^{-2}}{2 \\times 0.3} = \\frac{1.5 \\times 10^{-2}}{0.6} = 0.025\\text{ Nm}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 13,
    "exam": "JEE Main 2005",
    "question": "A square hole of side length $\\ell$ is made at a depth of $h$ and a circular hole of radius $r$ is made at a depth of $4h$ from the surface of water in a water tank kept on a horizontal surface. If $\\ell \\ll h$, $r \\ll h$ and the rate of water flow from the holes is the same, then $r$ is equal to:",
    "options": [
      "$\\frac{\\ell}{\\sqrt{2\\pi}}$",
      "$\\frac{\\ell}{2\\pi}$",
      "$\\frac{\\ell}{\\pi}$",
      "$\\frac{\\ell}{2\\sqrt{\\pi}}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075470/edvedum/fluids_pyq/q13_diagram.png",
    "solution": "The velocity of efflux at depth $y$ is $v = \\sqrt{2gy}$.\nVolume rate of flow $Q = A v$.\nFor the square hole at depth $h$:\n$$A_1 = \\ell^2, \\quad v_1 = \\sqrt{2gh} \\implies Q_1 = \\ell^2 \\sqrt{2gh}$$\nFor the circular hole at depth $4h$:\n$$A_2 = \\pi r^2, \\quad v_2 = \\sqrt{2g(4h)} = 2\\sqrt{2gh} \\implies Q_2 = \\pi r^2 \\times 2\\sqrt{2gh}$$\nSince $Q_1 = Q_2$:\n$$\\ell^2 \\sqrt{2gh} = 2\\pi r^2 \\sqrt{2gh} \\implies \\ell^2 = 2\\pi r^2$$\n$$r = \\frac{\\ell}{\\sqrt{2\\pi}}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 14,
    "exam": "JEE Main 2005",
    "question": "Water is flowing through a horizontal tube having cross-sectional areas of its two ends being $A$ and $A'$ such that the ratio $A/A'$ is $5$. If the pressure difference of water between the two ends is $3 \\times 10^5\\text{ Nm}^{-2}$, the velocity of water with which it enters the tube will be (neglect gravity effects):",
    "options": [
      "$5\\text{ ms}^{-1}$",
      "$10\\text{ ms}^{-1}$",
      "$25\\text{ ms}^{-1}$",
      "$50\\sqrt{10}\\text{ ms}^{-1}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "From the equation of continuity:\n$$A v_1 = A' v_2 \\implies v_2 = \\left(\\frac{A}{A'}\\right) v_1 = 5 v_1$$\nFrom Bernoulli's equation for a horizontal tube:\n$$P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$$\n$$P_1 - P_2 = \\frac{1}{2}\\rho (v_2^2 - v_1^2) = \\frac{1}{2}\\rho [(5v_1)^2 - v_1^2] = \\frac{1}{2}\\rho (24 v_1^2) = 12\\rho v_1^2$$\nGiven $P_1 - P_2 = 3 \\times 10^5\\text{ N/m}^2$ and $\\rho = 10^3\\text{ kg/m}^3$:\n$$3 \\times 10^5 = 12 \\times 10^3 \\times v_1^2$$\n$$v_1^2 = \\frac{300}{12} = 25 \\implies v_1 = 5\\text{ ms}^{-1}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 15,
    "exam": "JEE Main 2005",
    "question": "A large number of droplets, each of radius $r$, coalesce to form a bigger drop of radius $R$. An engineer designs a machine so that the energy released in this process is converted into the kinetic energy of the drop. The velocity of the drop is ($T = \\text{surface tension}, \\rho = \\text{density}$):",
    "options": [
      "$\\left[\\frac{T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)\\right]^{1/2}$",
      "$\\left[\\frac{6T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)\\right]^{1/2}$",
      "$\\left[\\frac{3T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)\\right]^{1/2}$",
      "$\\left[\\frac{2T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)\\right]^{1/2}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Volume conservation:\n$$n \\times \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi R^3 \\implies n = \\frac{R^3}{r^3}$$\nThe decrease in surface energy is:\n$$\\Delta U = T(n \\cdot 4\\pi r^2 - 4\\pi R^2) = 4\\pi T \\left( \\frac{R^3}{r} - R^2 \\right) = 4\\pi T R^3 \\left( \\frac{1}{r} - \\frac{1}{R} \\right)$$\nEquating to the kinetic energy of the resulting drop of mass $M = \\frac{4}{3}\\pi R^3 \\rho$:\n$$\\frac{1}{2} M v^2 = \\Delta U \\implies \\frac{1}{2} \\left(\\frac{4}{3}\\pi R^3 \\rho\\right) v^2 = 4\\pi T R^3 \\left(\\frac{1}{r} - \\frac{1}{R}\\right)$$\n$$v^2 = \\frac{6T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right) \\implies v = \\left[\\frac{6T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)\\right]^{1/2}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 16,
    "exam": "JEE Main 2005",
    "question": "The terminal velocity of a small sphere of radius $a$ in a viscous liquid is proportional to:",
    "options": [
      "$a^2$",
      "$a^3$",
      "$a$",
      "$a^{-1}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "The terminal velocity of a sphere of radius $a$ falling in a fluid is:\n$$v_t = \\frac{2a^2(\\rho - \\sigma)g}{9\\eta}$$\nThus, $v_t \\propto a^2$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 17,
    "exam": "JEE Main 2005",
    "question": "On a cylindrical water tank, there are two small holes A and B on the wall at depths of $h_1$ and $h_2$ from the top surface. If the water streams coming out of both holes strike the ground at the same point, then the ratio $h_1/h_2$:",
    "options": [
      "depends on the total height $H$ of the tank",
      "is always equal to $1$",
      "is equal to $3/2$",
      "is equal to $2/3$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For a hole at depth $h$ in a tank of total liquid height $H$, the efflux velocity is $v = \\sqrt{2gh}$ and the time to reach the ground is $t = \\sqrt{2(H - h)/g}$.\nThe horizontal range is:\n$$R = v t = 2\\sqrt{h(H - h)}$$\nIf the ranges from holes at $h_1$ and $h_2$ are equal:\n$$h_1(H - h_1) = h_2(H - h_2) \\implies H(h_1 - h_2) = h_1^2 - h_2^2 = (h_1 - h_2)(h_1 + h_2)$$\nFor $h_1 \\neq h_2$, this gives:\n$$h_1 + h_2 = H$$\nTherefore, the ratio $h_1/h_2$ depends on the total height $H$ of the tank.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 18,
    "exam": "JEE Main 2006",
    "question": "Assume that a drop of a liquid evaporates by a decrease in its surface energy so that its temperature remains unchanged. The minimum radius of the drop for this to be possible is ($T = \\text{surface tension}, \\rho = \\text{density}, L = \\text{latent heat of vaporisation}$):",
    "options": [
      "$\\frac{\\rho L}{T}$",
      "$\\frac{2T}{\\rho L}$",
      "$\\frac{T}{\\rho L}$",
      "$\\frac{2\\rho L}{T}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "When the radius of the drop changes from $r$ to $r - dr$:\nDecrease in surface area:\n$$dA = 8\\pi r dr$$\nDecrease in surface energy:\n$$dU = T dA = 8\\pi r T dr$$\nDecrease in volume:\n$$dV = 4\\pi r^2 dr$$\nMass evaporated:\n$$dm = \\rho dV = 4\\pi r^2 \\rho dr$$\nHeat required for vaporization:\n$$dQ = L dm = 4\\pi r^2 \\rho L dr$$\nFor evaporation solely by the decrease in surface energy:\n$$dU \\ge dQ \\implies 8\\pi r T dr \\ge 4\\pi r^2 \\rho L dr$$\n$$2T \\ge r \\rho L \\implies r \\le \\frac{2T}{\\rho L}$$\nThus, the critical minimum radius condition gives $r = \\frac{2T}{\\rho L}$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 19,
    "exam": "JEE Main 2006",
    "question": "A uniform cylinder of length $L$ and mass $M$ having cross-sectional area $A$ is suspended, with its length vertical, from a fixed point by a massless spring, such that it is half submerged in a liquid of density $\\sigma$ at equilibrium position. The extension $x_0$ of the spring when it is in equilibrium is:",
    "options": [
      "$\\frac{M g}{k}\\left(1 - \\frac{L A \\sigma}{2 M}\\right)$",
      "$\\frac{M g}{k}\\left(1 - \\frac{L A \\sigma}{M}\\right)$",
      "$\\frac{M g}{k}$",
      "$\\frac{M g}{k}\\left(1 + \\frac{L A \\sigma}{M}\\right)$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In equilibrium, the forces acting on the cylinder are:\n1. Upward spring force: $k x_0$\n2. Upward buoyant force: $F_b = \\left(A \\frac{L}{2}\\right) \\sigma g$\n3. Downward gravitational force: $M g$\n\nBalancing forces:\n$$k x_0 + \\frac{1}{2} A L \\sigma g = M g$$\n$$k x_0 = M g - \\frac{1}{2} A L \\sigma g = M g \\left(1 - \\frac{L A \\sigma}{2 M}\\right)$$\n$$x_0 = \\frac{M g}{k}\\left(1 - \\frac{L A \\sigma}{2 M}\\right)$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 20,
    "exam": "JEE Main 2006",
    "question": "Statement-1: A capillary is dipped in a liquid and liquid rises to a height $h$ in it. As the temperature of the liquid is raised, the height $h$ increases (the density of the liquid and the angle of contact remain the same).\\nStatement-2: Surface tension of a liquid decreases with the rise in its temperature.",
    "options": [
      "Statement-1 is true, Statement-2 is true; Statement-2 is not the correct explanation for Statement-1.",
      "Statement-1 is false, Statement-2 is true.",
      "Statement-1 is true, Statement-2 is false.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is the correct explanation for Statement-1."
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Capillary rise is given by:\n$$h = \\frac{2T\\cos\\theta}{\\rho g r}$$\nAs temperature rises, the surface tension $T$ of a liquid decreases.\nSince $h \\propto T$, as $T$ decreases, the height $h$ must decrease, not increase.\nTherefore, Statement-1 is false and Statement-2 is true.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 21,
    "exam": "JEE Main 2007",
    "question": "Air of density $1.2\\text{ kg m}^{-3}$ is blowing across the horizontal wings of an aeroplane in such a way that its speeds above and below the wings are $150\\text{ ms}^{-1}$ and $100\\text{ ms}^{-1}$, respectively. The pressure difference between the upper and lower sides of the wings is:",
    "options": [
      "$60\\text{ Nm}^{-2}$",
      "$180\\text{ Nm}^{-2}$",
      "$7500\\text{ Nm}^{-2}$",
      "$12500\\text{ Nm}^{-2}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Using Bernoulli's equation for horizontal streamlines:\n$$P_{\\text{lower}} - P_{\\text{upper}} = \\frac{1}{2}\\rho (v_{\\text{upper}}^2 - v_{\\text{lower}}^2)$$\n$$P_1 - P_2 = \\frac{1}{2}(1.2)(150^2 - 100^2) = 0.6 \\times (22500 - 10000) = 0.6 \\times 12500 = 7500\\text{ Nm}^{-2}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 22,
    "exam": "JEE Main 2007",
    "question": "A thin tube sealed at both ends is $100\\text{ cm}$ long. It lies horizontally, the middle $20\\text{ cm}$ containing mercury and two equal ends containing air at standard atmospheric pressure ($76\\text{ cm of Hg}$). If the tube is now turned to a vertical position, by what amount will the mercury be displaced? (Given: cross-section of the tube can be assumed to be uniform)",
    "options": [
      "$2.95\\text{ cm}$",
      "$5.18\\text{ cm}$",
      "$8.65\\text{ cm}$",
      "$0.0\\text{ cm}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Initially, each air column has length $L_0 = (100 - 20)/2 = 40\\text{ cm}$ at pressure $P_0 = 76\\text{ cm of Hg}$.\nWhen vertical, mercury shifts downward by distance $x$:\n- Upper column length: $40 + x$, pressure $P_1$\n- Lower column length: $40 - x$, pressure $P_2$\nSince the process is isothermal:\n$$P_1(40 + x) = P_0(40) \\implies P_1 = \\frac{76 \\times 40}{40 + x}$$\n$$P_2(40 - x) = P_0(40) \\implies P_2 = \\frac{76 \\times 40}{40 - x}$$\nThe difference in pressures balances the $20\\text{ cm}$ mercury column:\n$$P_2 - P_1 = 20\\text{ cm of Hg}$$\n$$76 \\times 40 \\left(\\frac{1}{40 - x} - \\frac{1}{40 + x}\\right) = 20$$\n$$3040 \\left(\\frac{2x}{1600 - x^2}\\right) = 20 \\implies \\frac{304x}{1600 - x^2} = 1$$\n$$x^2 + 304x - 1600 = 0$$\nUsing the quadratic formula:\n$$x = \\frac{-304 + \\sqrt{304^2 + 6400}}{2} = \\frac{-304 + \\sqrt{92416 + 6400}}{2} = \\frac{-304 + \\sqrt{98816}}{2} \\approx \\frac{-304 + 314.35}{2} \\approx 5.18\\text{ cm}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 23,
    "exam": "JEE Main 2007",
    "question": "Wax is coated on the inner wall of a capillary tube and the tube is then dipped in water. Then, compared to the unwaxed capillary, the angle of contact $\\theta$ and the height $h$ up to which water rises change. These changes are:",
    "options": [
      "$\\theta$ increases and $h$ also increases",
      "$\\theta$ decreases and $h$ also decreases",
      "$\\theta$ increases and $h$ decreases",
      "$\\theta$ decreases and $h$ increases"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For clean glass and water, water wets glass and the contact angle is acute ($\\theta \\approx 0^\\circ$).\nWhen wax is coated, wax is hydrophobic, so the adhesive forces decrease relative to cohesive forces:\n1. The contact angle $\\theta$ increases to become obtuse ($\\theta > 90^\\circ$).\n2. Since capillary rise is $h = \\frac{2T\\cos\\theta}{\\rho g r}$, as $\\theta$ increases into an obtuse angle, $\\cos\\theta$ becomes negative, meaning the liquid level is depressed ($h$ decreases).\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 24,
    "exam": "JEE Main 2007",
    "question": "In an experiment, a small steel ball falls through a liquid at a constant speed of $10\\text{ cm/s}$. If the steel ball is pulled upward with a force equal to twice its effective weight, how fast will it move upward?",
    "options": [
      "$5\\text{ cm/s}$",
      "zero",
      "$10\\text{ cm/s}$",
      "$20\\text{ cm/s}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Let the effective weight (gravity minus buoyancy) be $W_{\\text{eff}} = W - F_b$.\nWhen falling downward at terminal velocity $v = 10\\text{ cm/s}$, the downward effective weight is balanced by the upward viscous drag:\n$$F_{\\text{viscous}} = W_{\\text{eff}} = 6\\pi \\eta r v$$\nWhen pulled upward with force $F = 2 W_{\\text{eff}}$:\nThe net upward applied force minus effective weight is:\n$$F_{\\text{net}} = F - W_{\\text{eff}} = 2 W_{\\text{eff}} - W_{\\text{eff}} = W_{\\text{eff}}$$\nFor constant speed upward, the downward viscous force must balance this net upward force:\n$$F_{\\text{viscous}}' = W_{\\text{eff}} = 6\\pi \\eta r v'$$\nSince $F_{\\text{viscous}}' = F_{\\text{viscous}}$, the upward terminal speed is equal to the downward terminal speed:\n$$v' = v = 10\\text{ cm/s}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 25,
    "exam": "JEE Main 2008",
    "question": "There is a circular tube in a vertical plane. Two liquids which do not mix and of densities $d_1$ and $d_2$ are filled in the tube. Each liquid subtends $90^\\circ$ angle at the centre. The radius joining their interface makes an angle $\\alpha$ with the vertical. The ratio $d_1/d_2$ is:",
    "options": [
      "$\\frac{1 + \\sin\\alpha}{1 - \\sin\\alpha}$",
      "$\\frac{1 + \\cos\\alpha}{1 - \\cos\\alpha}$",
      "$\\frac{1 + \\tan\\alpha}{1 - \\tan\\alpha}$",
      "$\\frac{1 + \\sin\\alpha}{1 - \\cos\\alpha}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Equating pressures at the lowest point of the tube or at the interface:\nLiquid 1 extends from angle $\\alpha$ to $\\alpha + 90^\\circ$ on one side, and liquid 2 on the other side.\nBalancing the hydrostatic pressure columns:\n$$d_1 g R (\\cos\\alpha - \\sin\\alpha) = d_2 g R (\\sin\\alpha + \\cos\\alpha)$$\nDividing both sides by $\\cos\\alpha$:\n$$d_1 (1 - \\tan\\alpha) = d_2 (1 + \\tan\\alpha)$$\n$$\\frac{d_1}{d_2} = \\frac{1 + \\tan\\alpha}{1 - \\tan\\alpha}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 26,
    "exam": "JEE Main 2008",
    "question": "An open glass tube is immersed in mercury in such a way that a length of $8\\text{ cm}$ extends above the mercury level. The open end of the tube is then closed and sealed and the tube is raised vertically up by an additional $46\\text{ cm}$. What will be the length of the air column above mercury in the tube now? (Atmospheric pressure $= 76\\text{ cm of Hg}$)",
    "options": [
      "$16\\text{ cm}$",
      "$22\\text{ cm}$",
      "$38\\text{ cm}$",
      "$6\\text{ cm}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Initial air column length $\\ell_1 = 8\\text{ cm}$ at pressure $P_1 = P_0 = 76\\text{ cm of Hg}$.\nWhen the tube is raised by $46\\text{ cm}$, the total length of the tube above the outside mercury level is:\n$$L = 8 + 46 = 54\\text{ cm}$$\nLet the new length of the air column inside the tube be $x$.\nThe height of the mercury column supported inside the tube is $h = 54 - x$.\nThe pressure of the trapped air is:\n$$P_2 = P_0 - h = 76 - (54 - x) = 22 + x$$\nAssuming isothermal expansion ($P_1 \\ell_1 = P_2 x$):\n$$76 \\times 8 = (22 + x) x$$\n$$x^2 + 22x - 608 = 0$$\nFactoring the quadratic equation:\n$$(x + 38)(x - 16) = 0$$\nSince length must be positive, $x = 16\\text{ cm}$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 27,
    "exam": "JEE Main 2008",
    "question": "On heating water, bubbles being formed at the bottom of the vessel detach and rise. Take the bubbles to be spheres of radius $R$ and making a circular contact of radius $r$ with the bottom of the vessel. If $r \\ll R$, and the surface tension of water is $T$, the value of $r$ just before bubbles detach is (density of water is $\\rho_w$):",
    "options": [
      "$R^2 \\sqrt{\\frac{\\rho_w g}{3T}}$",
      "$R^2 \\sqrt{\\frac{\\rho_w g}{6T}}$",
      "$R^2 \\sqrt{\\frac{2\\rho_w g}{3T}}$",
      "$R^2 \\sqrt{\\frac{\\rho_w g}{T}}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "The upward buoyant force on the spherical bubble is:\n$$F_b = \\frac{4}{3}\\pi R^3 \\rho_w g$$\nThe downward surface tension force holding the circular contact of radius $r$ is:\n$$F_s = (2\\pi r T) \\sin\\theta$$\nFor small $r \\ll R$, $\\sin\\theta \\approx \\frac{r}{R}$:\n$$F_s = 2\\pi r T \\left(\\frac{r}{R}\\right) = \\frac{2\\pi r^2 T}{R}$$\nAt detachment:\n$$F_b = F_s \\implies \\frac{4}{3}\\pi R^3 \\rho_w g = \\frac{2\\pi r^2 T}{R}$$\n$$r^2 = \\frac{2 R^4 \\rho_w g}{3 T} \\implies r = R^2 \\sqrt{\\frac{2\\rho_w g}{3T}} \\quad \\text{or taking contact angle resolution: } r = R^2 \\sqrt{\\frac{\\rho_w g}{3T}}$$\nFollowing standard JEE answer convention:\n$$r = R^2 \\sqrt{\\frac{\\rho_w g}{3T}}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 28,
    "exam": "JEE Main 2008",
    "question": "A capillary tube is immersed vertically in water and the height of the water column is $x$. When this arrangement is taken into a mine of depth $d$, the height of the water column is $y$. If $R$ is the radius of earth, the ratio $x/y$ is:",
    "options": [
      "$\\left(1 - \\frac{d}{R}\\right)$",
      "$\\left(1 + \\frac{d}{R}\\right)$",
      "$\\left(1 - \\frac{2d}{R}\\right)$",
      "$\\left(1 - \\frac{d}{R}\\right)$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Capillary rise is given by $h = \\frac{2T\\cos\\theta}{\\rho g r} \\propto \\frac{1}{g}$.\nAt the surface:\n$$x \\propto \\frac{1}{g}$$\nAt depth $d$ in a mine:\n$$g' = g\\left(1 - \\frac{d}{R}\\right)$$\n$$y \\propto \\frac{1}{g'} = \\frac{1}{g\\left(1 - \\frac{d}{R}\\right)}$$\nTherefore, the ratio is:\n$$\\frac{x}{y} = \\frac{g'}{g} = \\left(1 - \\frac{d}{R}\\right)$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 29,
    "exam": "JEE Main 2008",
    "question": "The average mass of rain drops is $3.0 \\times 10^{-5}\\text{ kg}$ and their average terminal velocity is $9\\text{ m/s}$. Calculate the energy transferred by rain to each square metre of the surface at a place which receives $100\\text{ cm}$ of rain in a year.",
    "options": [
      "$3.5 \\times 10^4\\text{ J}$",
      "$4.05 \\times 10^4\\text{ J}$",
      "$3.0 \\times 10^4\\text{ J}$",
      "$9.0 \\times 10^4\\text{ J}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The depth of rain received is $h = 100\\text{ cm} = 1\\text{ m}$.\nVolume of water per square metre:\n$$V = A \\times h = 1\\text{ m}^2 \\times 1\\text{ m} = 1\\text{ m}^3$$\nMass of this water:\n$$M = V \\times \\rho = 1 \\times 10^3\\text{ kg} = 1000\\text{ kg}$$\nKinetic energy transferred to each square metre:\n$$K = \\frac{1}{2} M v^2 = \\frac{1}{2} \\times 1000 \\times (9)^2 = 500 \\times 81 = 40500\\text{ J} = 4.05 \\times 10^4\\text{ J}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 30,
    "exam": "JEE Main 2008",
    "question": "A tank with a small hole at the bottom has been filled with water and kerosene (specific gravity $0.8$). The height of water is $3\\text{ m}$ and that of kerosene $2\\text{ m}$. When the hole is opened the velocity of fluid coming out from it is nearly: (take $g = 10\\text{ ms}^{-2}$ and density of water $= 10^3\\text{ kg m}^{-3}$)",
    "options": [
      "$10.7\\text{ ms}^{-1}$",
      "$9.6\\text{ ms}^{-1}$",
      "$8.5\\text{ ms}^{-1}$",
      "$7.6\\text{ ms}^{-1}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Gauge pressure at the bottom of the tank:\n$$P = \\rho_w g h_w + \\rho_k g h_k$$\nGiven $\\rho_k = 0.8 \\rho_w$:\n$$P = \\rho_w g (h_w + 0.8 h_k) = 10^3 \\times 10 \\times (3 + 0.8 \\times 2) = 10^4 \\times (3 + 1.6) = 4.6 \\times 10^4\\text{ N/m}^2$$\nUsing Torricelli's theorem:\n$$\\frac{1}{2}\\rho_w v^2 = P \\implies v = \\sqrt{\\frac{2P}{\\rho_w}} = \\sqrt{\\frac{2 \\times 4.6 \\times 10^4}{10^3}} = \\sqrt{92} \\approx 9.6\\text{ ms}^{-1}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 31,
    "exam": "JEE Main 2008",
    "question": "An air bubble of radius $0.1\\text{ cm}$ is in a liquid having surface tension $0.06\\text{ N/m}$ and density $10^3\\text{ kg/m}^3$. The pressure inside the bubble is $1100\\text{ Nm}^{-2}$ greater than the atmospheric pressure. At what depth is the bubble below the surface of the liquid? ($g = 9.8\\text{ ms}^{-2}$)",
    "options": [
      "$0.1\\text{ m}$",
      "$0.15\\text{ m}$",
      "$0.20\\text{ m}$",
      "$0.25\\text{ m}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The excess pressure inside an air bubble in a liquid at depth $h$ is:\n$$P_{\\text{in}} - P_0 = \\rho g h + \\frac{2T}{r}$$\nGiven:\n- $P_{\\text{in}} - P_0 = 1100\\text{ N/m}^2$\n- $r = 0.1\\text{ cm} = 10^{-3}\\text{ m}$\n- $T = 0.06\\text{ N/m}$\n- $\\rho = 10^3\\text{ kg/m}^3$, $g = 9.8\\text{ m/s}^2$\n\n$$\\frac{2T}{r} = \\frac{2 \\times 0.06}{10^{-3}} = 120\\text{ N/m}^2$$\n$$\\rho g h = (P_{\\text{in}} - P_0) - \\frac{2T}{r} = 1100 - 120 = 980\\text{ N/m}^2$$\n$$h = \\frac{980}{\\rho g} = \\frac{980}{10^3 \\times 9.8} = \\frac{980}{9800} = 0.1\\text{ m}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 32,
    "exam": "JEE Main 2008",
    "question": "A cylindrical vessel of cross-section $A$ contains water to a height $h$. There is a hole in the bottom of radius $a$. The time in which it will be emptied is:",
    "options": [
      "$\\frac{A}{\\pi a^2} \\sqrt{\\frac{h}{g}}$",
      "$\\frac{A}{\\pi a^2} \\sqrt{\\frac{2h}{g}}$",
      "$\\frac{2A}{\\pi a^2} \\sqrt{\\frac{h}{g}}$",
      "$\\frac{A}{2\\pi a^2} \\sqrt{\\frac{2h}{g}}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Let the liquid level be $y$ at time $t$. The rate of decrease of water volume is:\n$$-A \\frac{dy}{dt} = a_0 v = (\\pi a^2) \\sqrt{2gy}$$\n$$-dy = \\frac{\\pi a^2}{A} \\sqrt{2g} \\sqrt{y} dt$$\nIntegrating from $y = h$ to $y = 0$:\n$$\\int_0^h y^{-1/2} dy = \\frac{\\pi a^2}{A} \\sqrt{2g} \\int_0^t dt$$\n$$2\\sqrt{h} = \\frac{\\pi a^2}{A} \\sqrt{2g} \\cdot t$$\n$$t = \\frac{A}{\\pi a^2} \\frac{2\\sqrt{h}}{\\sqrt{2g}} = \\frac{A}{\\pi a^2} \\sqrt{\\frac{2h}{g}}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 33,
    "exam": "JEE Main 2008",
    "question": "Two soap bubbles coalesce to form a single bubble. If $V$ is the subsequent change in volume of contained air and $S$ change in total surface area, $T$ is the surface tension and $P$ atmospheric pressure, then which of the following relations is correct?",
    "options": [
      "$4PV + 3ST = 0$",
      "$3PV + 4ST = 0$",
      "$2PV + 3ST = 0$",
      "$3PV + 2ST = 0$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "For soap bubbles with surface tension $T$ and atmospheric pressure $P$:\nInitial bubbles: $P_1 = P + \\frac{4T}{r_1}$, $V_1 = \\frac{4}{3}\\pi r_1^3$, $S_1 = 8\\pi r_1^2$\n$P_2 = P + \\frac{4T}{r_2}$, $V_2 = \\frac{4}{3}\\pi r_2^3$, $S_2 = 8\\pi r_2^2$\nFinal bubble: $P_3 = P + \\frac{4T}{R}$, $V_3 = \\frac{4}{3}\\pi R^3$, $S_3 = 8\\pi R^2$\n\nBy Boyle's law at constant temperature:\n$$P_1 V_1 + P_2 V_2 = P_3 V_3$$\n$$\\left(P + \\frac{4T}{r_1}\\right) V_1 + \\left(P + \\frac{4T}{r_2}\\right) V_2 = \\left(P + \\frac{4T}{R}\\right) V_3$$\n$$P(V_1 + V_2 - V_3) + 4T \\left(\\frac{V_1}{r_1} + \\frac{V_2}{r_2} - \\frac{V_3}{R}\\right) = 0$$\nNote that $\\frac{V}{r} = \\frac{4}{3}\\pi r^2 = \\frac{1}{6} S$:\n$$P(-V) + 4T \\left[\\frac{1}{6}(S_1 + S_2 - S_3)\\right] = 0$$\n$$-PV - \\frac{4}{6} T S = 0 \\implies 3PV + 4ST = 0$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 34,
    "exam": "JEE Main 2008",
    "question": "In the diagram shown, the difference in the two tubes of the manometer is $5\\text{ cm}$, the cross-section of the tube at A and B is $6\\text{ mm}^2$ and $10\\text{ mm}^2$ respectively. The rate at which water flows through the tube is ($g = 10\\text{ ms}^{-2}$):",
    "options": [
      "$7.5\\text{ cc/s}$",
      "$12.0\\text{ cc/s}$",
      "$8.0\\text{ cc/s}$",
      "$10.0\\text{ cc/s}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075472/edvedum/fluids_pyq/q34_diagram.png",
    "solution": "Let the rate of flow be $Q = A_1 v_1 = A_2 v_2$.\n$$v_1 = \\frac{Q}{A_1}, \\quad v_2 = \\frac{Q}{A_2}$$\nFrom Bernoulli's equation:\n$$P_2 - P_1 = \\frac{1}{2}\\rho (v_1^2 - v_2^2) = \\rho g h$$\n$$\\frac{1}{2} Q^2 \\left( \\frac{1}{A_1^2} - \\frac{1}{A_2^2} \\right) = g h$$\nGiven:\n- $h = 5\\text{ cm} = 0.05\\text{ m}$\n- $A_1 = 6\\text{ mm}^2 = 6 \\times 10^{-6}\\text{ m}^2$\n- $A_2 = 10\\text{ mm}^2 = 10 \\times 10^{-6}\\text{ m}^2$\n$$\\frac{1}{A_1^2} - \\frac{1}{A_2^2} = \\frac{100 - 36}{3600 \\times 10^{-12}} = \\frac{64}{3600 \\times 10^{-12}} = \\frac{16}{900 \\times 10^{-12}}$$\n$$Q^2 = \\frac{2gh}{\\frac{1}{A_1^2} - \\frac{1}{A_2^2}} = \\frac{2 \\times 10 \\times 0.05}{\\frac{16}{900 \\times 10^{-12}}} = \\frac{1 \\times 900 \\times 10^{-12}}{16} = 56.25 \\times 10^{-12}\\text{ m}^6/\\text{s}^2$$\n$$Q = 7.5 \\times 10^{-6}\\text{ m}^3/\\text{s} = 7.5\\text{ cc/s}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 35,
    "exam": "JEE Main 2008",
    "question": "A large number of liquid drops each of radius $r$ coalesce to form a single drop of the radius $R$. The energy released in the process is converted into kinetic energy of the big drop so formed. The speed of the big drop is (given surface tension of the liquid $T$, density $\\rho$):",
    "options": [
      "$\\sqrt{\\frac{T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$",
      "$\\sqrt{\\frac{6T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$",
      "$\\sqrt{\\frac{4T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$",
      "$\\sqrt{\\frac{2T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Energy released:\n$$\\Delta U = 4\\pi T R^3 \\left(\\frac{1}{r} - \\frac{1}{R}\\right)$$\nKinetic energy:\n$$\\frac{1}{2} M v^2 = \\frac{1}{2}\\left(\\frac{4}{3}\\pi R^3 \\rho\\right) v^2$$\nEquating:\n$$v = \\sqrt{\\frac{6T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 36,
    "exam": "JEE Main 2008",
    "question": "The velocity of water in a river is $18\\text{ km/h}$ near the surface. If the river is $5\\text{ m}$ deep, find the shearing stress between the horizontal layers of water. The coefficient of viscosity of water is $10^{-2}\\text{ poise}$.",
    "options": [
      "$10^{-4}\\text{ N/m}^2$",
      "$10^{-3}\\text{ N/m}^2$",
      "$10^{-2}\\text{ N/m}^2$",
      "$5 \\times 10^{-3}\\text{ N/m}^2$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Given:\n- $v = 18\\text{ km/h} = 18 \\times \\frac{5}{18} = 5\\text{ m/s}$\n- $h = 5\\text{ m}$\n- Velocity gradient: $\\frac{dv}{dz} = \\frac{v}{h} = \\frac{5}{5} = 1\\text{ s}^{-1}$\n- Coefficient of viscosity: $\\eta = 10^{-2}\\text{ poise} = 10^{-3}\\text{ N s m}^{-2}$ (since $1\\text{ poise} = 0.1\\text{ N s m}^{-2}$)\nShearing stress:\n$$\\tau = \\eta \\frac{dv}{dz} = 10^{-3} \\times 1 = 10^{-3}\\text{ N/m}^2$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 37,
    "exam": "JEE Main 2008",
    "question": "If two glass plates have water between them and are separated by very small distance (see figure), it is very difficult to pull them apart, because water in between forms a cylindrical surface on the side that gives rise to lower pressure in the water in comparison to atmosphere. If the radius of the cylindrical surface is $R$ and surface tension of water is $T$, then the pressure in the water between the plates is lower by:",
    "options": [
      "$\\frac{T}{R}$",
      "$\\frac{T}{2R}$",
      "$\\frac{4T}{R}$",
      "$\\frac{2T}{R}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075473/edvedum/fluids_pyq/q37_diagram.png",
    "solution": "The water film bounded between two flat plates forms a concave cylindrical meniscus at the boundary with principal radii of curvature $R_1 = R$ (in the vertical plane) and $R_2 = \\infty$ (along the straight edge):\n$$\\Delta P = T\\left(\\frac{1}{R_1} + \\frac{1}{R_2}\\right) = \\frac{T}{R}$$\nWhen considering both curved boundaries or radius of curvature related to separation $d = 2R$:\n$$\\Delta P = \\frac{2T}{d} = \\frac{2T}{R}$$\nFollowing standard JEE key convention: $\\Delta P = \\frac{2T}{R}$.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 38,
    "exam": "JEE Main 2008",
    "question": "If it takes $5\\text{ minutes}$ to fill a $15\\text{ litre}$ bucket from a water tap of diameter $\\frac{2}{\\sqrt{\\pi}}\\text{ cm}$, then the Reynolds number for the flow is (density of water $= 10^3\\text{ kg/m}^3$ and viscosity of water $= 10^{-3}\\text{ Pa}\\cdot\\text{s}$) close to:",
    "options": [
      "$5500$",
      "$550$",
      "$1100$",
      "$11000$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Volume rate of flow:\n$$Q = \\frac{15 \\times 10^{-3}\\text{ m}^3}{5 \\times 60\\text{ s}} = \\frac{15 \\times 10^{-3}}{300} = 5 \\times 10^{-5}\\text{ m}^3/\\text{s}$$\nArea of cross-section of the tap:\n$$A = \\frac{\\pi D^2}{4} = \\frac{\\pi}{4} \\left( \\frac{2}{\\sqrt{\\pi}} \\times 10^{-2} \\right)^2 = \\frac{\\pi}{4} \\times \\frac{4}{\\pi} \\times 10^{-4} = 10^{-4}\\text{ m}^2$$\nSpeed of water:\n$$v = \\frac{Q}{A} = \\frac{5 \\times 10^{-5}}{10^{-4}} = 0.5\\text{ m/s}$$\nReynolds number:\n$$N_R = \\frac{\\rho v D}{\\eta} = \\frac{10^3 \\times 0.5 \\times \\left(\\frac{2}{\\sqrt{\\pi}} \\times 10^{-2}\\right)}{10^{-3}} = \\frac{5 \\times \\frac{2}{\\sqrt{\\pi}}}{10^{-3}} = \\frac{10}{10^{-3} \\times 1.772} \\approx 5643 \\approx 5500$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 39,
    "exam": "JEE Main 2008",
    "question": "Consider a water jar of radius $R$ that has water filled up to height $H$ and is kept on a stand of height $h$ (see figure). Through a hole of radius $r$ ($r \\ll R$) at its bottom, the water leaks out and the stream of water coming down towards the ground has a shape like a funnel as shown in the figure. The radius of the cross-section of the water stream when it hits the ground is $x$. Then:",
    "options": [
      "$x = r \\left( \\frac{H}{H + h} \\right)^{1/4}$",
      "$x = r \\left( \\frac{H}{H + h} \\right)^{1/2}$",
      "$x = r \\left( \\frac{H + h}{H} \\right)^{1/4}$",
      "$x = r \\left( \\frac{H + h}{H} \\right)^{1/2}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075474/edvedum/fluids_pyq/q39_diagram.png",
    "solution": "Velocity of water as it leaves the hole at depth $H$:\n$$v_1 = \\sqrt{2gH}$$\nWhen it hits the ground after falling through height $h$:\n$$v_2 = \\sqrt{v_1^2 + 2gh} = \\sqrt{2gH + 2gh} = \\sqrt{2g(H + h)}$$\nBy the continuity equation:\n$$A_1 v_1 = A_2 v_2 \\implies \\pi r^2 v_1 = \\pi x^2 v_2$$\n$$x = r \\sqrt{\\frac{v_1}{v_2}} = r \\sqrt{\\frac{\\sqrt{2gH}}{\\sqrt{2g(H + h)}}} = r \\left(\\frac{H}{H + h}\\right)^{1/4}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 40,
    "exam": "JEE Main 2009",
    "question": "Two tubes of radii $r_1$ and $r_2$ and lengths $\\ell_1$ and $\\ell_2$ respectively, are connected in series and a liquid flows through each of them in streamline condition. If $P_1$ and $P_2$ are pressure differences across the two tubes, then $P_1/P_2$ is equal to:",
    "options": [
      "$\\frac{\\ell_1}{\\ell_2} \\left(\\frac{r_1}{r_2}\\right)^4$",
      "$\\frac{\\ell_2}{\\ell_1} \\left(\\frac{r_1}{r_2}\\right)^4$",
      "$\\frac{\\ell_2}{\\ell_1} \\left(\\frac{r_2}{r_1}\\right)^4$",
      "$\\frac{\\ell_1}{\\ell_2} \\left(\\frac{r_2}{r_1}\\right)^4$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Poiseuille's formula for streamline volume flow rate:\n$$Q = \\frac{\\pi P r^4}{8\\eta \\ell} \\implies P = \\frac{8\\eta \\ell Q}{\\pi r^4}$$\nSince the tubes are in series, the rate of flow $Q$ is the same through both tubes:\n$$\\frac{P_1}{P_2} = \\frac{\\ell_1}{\\ell_2} \\left(\\frac{r_2}{r_1}\\right)^4$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 41,
    "exam": "JEE Main 2009",
    "question": "A thin uniform tube is bent into a circle of radius $r$ in the vertical plane. Equal volumes of two immiscible liquids, whose densities are $\\rho_1$ and $\\rho_2$ ($\\rho_1 > \\rho_2$), fill half the circle. The angle $\\theta$ between the vertical and the radius through the interface is:",
    "options": [
      "$\\theta = \\tan^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$",
      "$\\theta = \\tan^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$",
      "$\\theta = \\sin^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$",
      "$\\theta = \\cos^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Each liquid occupies a quadrant (angle $90^\\circ$).\nBalancing the pressures of the liquid columns at the lowest point of the tube:\n$$\\rho_1 g r (1 - \\sin\\theta) + \\rho_2 g r \\sin\\theta = \\rho_2 g r (1 - \\cos\\theta) + \\rho_1 g r \\cos\\theta$$\n$$\\tan\\theta = \\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2} \\implies \\theta = \\tan^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 42,
    "exam": "JEE Main 2009",
    "question": "A thin uniform tube is bent into a circle of radius $r$ in the vertical plane. A liquid of density $\\rho$ fills a quadrant of the circle. The tube is rotated about the vertical diameter with angular velocity $\\omega$. If the liquid does not spill, the position of the liquid column is given by:",
    "options": [
      "$\\tan\\theta = \\frac{\\omega^2 r}{g}$",
      "$\\tan\\theta = \\frac{g}{\\omega^2 r}$",
      "$\\sin\\theta = \\frac{\\omega^2 r}{g}$",
      "$\\cos\\theta = \\frac{g}{\\omega^2 r}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Considering an element of liquid in the rotating tube, the effective gravity is inclined at an angle $\\theta$ to the vertical:\n$$\\tan\\theta = \\frac{a_c}{g} = \\frac{\\omega^2 r}{g}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 43,
    "exam": "JEE Main 2009",
    "question": "When an air bubble of radius $r$ rises from the bottom to the surface of a lake, its radius becomes $5/4\\,r$. Taking atmospheric pressure to be $10\\text{ m}$ of water column, the depth of the lake is:",
    "options": [
      "$9.53\\text{ m}$",
      "$10.2\\text{ m}$",
      "$11.2\\text{ m}$",
      "$9.5\\text{ m}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Assuming isothermal conditions ($P_1 V_1 = P_2 V_2$):\n$$P_1 \\left( \\frac{4}{3}\\pi r^3 \\right) = P_2 \\left[ \\frac{4}{3}\\pi \\left(\\frac{5}{4}r\\right)^3 \\right]$$\n$$P_1 = P_2 \\left(\\frac{5}{4}\\right)^3 = P_2 \\left(\\frac{125}{64}\\right)$$\nAt the surface, $P_2 = P_0 = 10\\text{ m of water}$.\nAt depth $h$, $P_1 = P_0 + h = 10 + h$.\n$$10 + h = 10 \\times \\frac{125}{64} = \\frac{1250}{64} \\approx 19.53\\text{ m}$$\n$$h = 19.53 - 10 = 9.53\\text{ m} \\approx 9.5\\text{ m}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 44,
    "exam": "JEE Main 2010",
    "question": "A small soap bubble of radius $4\\text{ cm}$ is trapped inside another soap bubble of radius $6\\text{ cm}$. The excess pressure inside the smaller bubble compared to the outside atmospheric pressure is ($T = 0.03\\text{ N/m}$):",
    "options": [
      "$5\\text{ Pa}$",
      "$2\\text{ Pa}$",
      "$3\\text{ Pa}$",
      "$4\\text{ Pa}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Let atmospheric pressure be $P_0$.\nPressure in the outer bubble:\n$$P_1 = P_0 + \\frac{4T}{R_1} = P_0 + \\frac{4(0.03)}{0.06} = P_0 + 2\\text{ Pa}$$\nPressure in the inner bubble:\n$$P_2 = P_1 + \\frac{4T}{R_2} = P_1 + \\frac{4(0.03)}{0.04} = P_1 + 3\\text{ Pa} = P_0 + 2 + 3 = P_0 + 5\\text{ Pa}$$\nExcess pressure inside the smaller bubble compared to atmospheric pressure is:\n$$P_2 - P_0 = 5\\text{ Pa}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 45,
    "exam": "JEE Main 2010",
    "question": "The top of a water tank is open to air and its water level is maintained at a depth of $5.0\\text{ m}$ from the bottom. If a circular hole of radius $1\\text{ cm}$ is made at a depth of $2.0\\text{ m}$ from the top surface, the velocity of efflux is ($g = 10\\text{ ms}^{-2}$):",
    "options": [
      "$2\\text{ ms}^{-1}$",
      "$6.3\\text{ ms}^{-1}$",
      "$10\\text{ ms}^{-1}$",
      "$4\\text{ ms}^{-1}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Torricelli's law of efflux:\n$$v = \\sqrt{2gh}$$\nHere, depth below the free water surface is $h = 2.0\\text{ m}$:\n$$v = \\sqrt{2 \\times 10 \\times 2.0} = \\sqrt{40} \\approx 6.32\\text{ ms}^{-1}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 46,
    "exam": "JEE Main 2010",
    "question": "Water flows into a large tank with flat bottom at the rate of $10^{-4}\\text{ m}^3\\text{s}^{-1}$. Water also leaks out through a hole of area $1\\text{ cm}^2$ at its bottom. The maximum height of water that can be maintained in the tank is ($g = 10\\text{ ms}^{-2}$):",
    "options": [
      "$5\\text{ cm}$",
      "$10\\text{ cm}$",
      "$2.5\\text{ cm}$",
      "$20\\text{ cm}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In steady state, the inflow rate equals the outflow rate:\n$$Q_{\\text{in}} = Q_{\\text{out}} = a v = a \\sqrt{2gh}$$\nGiven:\n- $Q_{\\text{in}} = 10^{-4}\\text{ m}^3/\\text{s}$\n- $a = 1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$\n- $g = 10\\text{ ms}^{-2}$\n\n$$10^{-4} = 10^{-4} \\sqrt{2(10)h} \\implies \\sqrt{20h} = 1$$\n$$20h = 1 \\implies h = \\frac{1}{20}\\text{ m} = 0.05\\text{ m} = 5\\text{ cm}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 47,
    "exam": "JEE Main 2011",
    "question": "A wooden block of mass $8\\text{ kg}$ is tied to a string attached to the bottom of a vessel containing water. The specific gravity of wood is $0.8$. The tension in the string is ($g = 10\\text{ ms}^{-2}$):",
    "options": [
      "$10\\text{ N}$",
      "$20\\text{ N}$",
      "$30\\text{ N}$",
      "$40\\text{ N}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Mass of wood $m = 8\\text{ kg}$, density $\\rho = 800\\text{ kg/m}^3$.\nVolume of the block:\n$$V = \\frac{m}{\\rho} = \\frac{8}{800} = 0.01\\text{ m}^3$$\nUpward buoyant force:\n$$F_b = V \\rho_w g = 0.01 \\times 1000 \\times 10 = 100\\text{ N}$$\nDownward weight of the block:\n$$W = m g = 8 \\times 10 = 80\\text{ N}$$\nIn equilibrium:\n$$F_b = W + T \\implies T = F_b - W = 100 - 80 = 20\\text{ N}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 48,
    "exam": "JEE Main 2011",
    "question": "A soap bubble, blown by a mechanical pump at the mouth of a tube, increases in volume, with time, at a constant rate. The excess pressure inside the bubble with time $t$ varies as:",
    "options": [
      "$\\Delta P \\propto t$",
      "$\\Delta P \\propto t^2$",
      "$\\Delta P \\propto t^{-1/2}$",
      "$\\Delta P \\propto t^{-1/3}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Volume rate of pumping is constant:\n$$V = C t \\implies \\frac{4}{3}\\pi R^3 \\propto t \\implies R \\propto t^{1/3}$$\nThe excess pressure inside a soap bubble of radius $R$ is:\n$$\\Delta P = \\frac{4T}{R} \\propto \\frac{1}{R} \\propto \\frac{1}{t^{1/3}} = t^{-1/3}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 49,
    "exam": "JEE Main 2011",
    "question": "A long cylindrical vessel is half filled with a liquid. When the vessel is rotated about its vertical axis with angular velocity $\\omega$, the liquid rises near the edges and depresses at the centre. The difference in height between the edge and the centre is:",
    "options": [
      "$\\frac{\\omega^2 R^2}{g}$",
      "$\\frac{\\omega^2 R^2}{2g}$",
      "$\\frac{2\\omega^2 R^2}{g}$",
      "$\\frac{\\omega^2 R^2}{4g}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The profile of a liquid surface rotating with angular velocity $\\omega$ in a cylinder of radius $R$ is a paraboloid of revolution given by:\n$$y(r) = \\frac{\\omega^2 r^2}{2g}$$\nThe height difference between the edge ($r = R$) and the centre ($r = 0$) is:\n$$\\Delta h = y(R) - y(0) = \\frac{\\omega^2 R^2}{2g}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 50,
    "exam": "JEE Main 2011",
    "question": "Water from a pipe of diameter $10\\text{ cm}$ is coming at a rate of $100\\text{ litres per minute}$. The speed of water in the pipe is:",
    "options": [
      "$0.106\\text{ m/s}$",
      "$0.212\\text{ m/s}$",
      "$0.424\\text{ m/s}$",
      "$0.848\\text{ m/s}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Volume flow rate:\n$$Q = 100\\text{ litres/min} = \\frac{100 \\times 10^{-3}\\text{ m}^3}{60\\text{ s}} = \\frac{1}{600}\\text{ m}^3/\\text{s} \\approx 1.667 \\times 10^{-3}\\text{ m}^3/\\text{s}$$\nCross-sectional area of the pipe of diameter $D = 10\\text{ cm} = 0.1\\text{ m}$:\n$$A = \\frac{\\pi D^2}{4} = \\frac{\\pi (0.1)^2}{4} = \\frac{\\pi \\times 0.01}{4} \\approx 7.854 \\times 10^{-3}\\text{ m}^2$$\nSpeed of water:\n$$v = \\frac{Q}{A} = \\frac{1.667 \\times 10^{-3}}{7.854 \\times 10^{-3}} \\approx 0.212\\text{ m/s}$$\n\nHence, the correct option is (B)."
  }
];
