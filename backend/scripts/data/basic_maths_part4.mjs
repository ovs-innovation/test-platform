// Physics: Basic Maths & Calculus - Part 4 (Q241 to Q321)

export const BASIC_MATHS_PART4 = [
  {
    q_num: 241,
    question_text: "For the curve y = sin x, find its slope at the origin (0, 0):",
    options: ["0", "1", "∞", "None"],
    correct_index: 1,
    solution: "Slope = dy/dx = cos x. At x = 0: dy/dx = cos(0) = 1."
  },
  {
    q_num: 242,
    question_text: "Find the maximum or minimum value of the quadratic function y = 25x² + 5 - 10x:",
    options: ["ymin = 4", "ymax = 4", "ymin = 5", "ymin = -4"],
    correct_index: 0,
    solution: "dy/dx = 50x - 10 = 0 ⇒ x = 1/5. Since d²y/dx² = 50 > 0, it is a minimum. y_min = 25(1/25) + 5 - 10(1/5) = 1 + 5 - 2 = 4."
  },
  {
    q_num: 243,
    question_text: "If y = x cos x, then find dy/dx at x = π:",
    options: ["-1", "1", "0", "1/2"],
    correct_index: 0,
    solution: "dy/dx = (1)cos x + x(-sin x) = cos x - x sin x. At x = π: dy/dx = cos π - π sin π = -1 - 0 = -1."
  },
  {
    q_num: 244,
    question_text: "If dy/dx = 0 everywhere, then y is a:",
    options: ["Zero", "Variable", "Constant", "Non-zero number"],
    correct_index: 2,
    solution: "A zero derivative means the function does not change with x, which implies y is a constant."
  },
  {
    q_num: 245,
    question_text: "If A = dy/dx, then A must be zero if y is not changing with respect to x:",
    options: ["True", "False"],
    correct_index: 0,
    solution: "By definition, the derivative dy/dx represents the rate of change of y with x. If y is not changing, dy/dx = 0."
  },
  {
    q_num: 246,
    question_text: "If y = x² - 4x + 3, find the value of dy/dx at x = 2:",
    options: ["0", "2", "-2", "4"],
    correct_index: 0,
    solution: "dy/dx = 2x - 4. At x = 2: dy/dx = 2(2) - 4 = 0."
  },
  {
    q_num: 247,
    question_text: "If y = x(2 - x²), then find dy/dx:",
    options: ["2 - 3x²", "2 - x²", "2x - 3x²", "3x² - 2"],
    correct_index: 0,
    solution: "y = 2x - x³ ⇒ dy/dx = 2 - 3x²."
  },
  {
    q_num: 248,
    question_text: "If y = √x + 1/√x, then find dy/dx:",
    options: [
      "1/(2√x) - (1/2)x^(-3/2)",
      "1/(2√x) + (1/2)x^(-3/2)",
      "1/√x - 1/x",
      "None of these"
    ],
    correct_index: 0,
    solution: "y = x^(1/2) + x^(-1/2) ⇒ dy/dx = (1/2)x^(-1/2) - (1/2)x^(-3/2) = 1/(2√x) - (1/2)x^(-3/2)."
  },
  {
    q_num: 249,
    question_text: "If y = x - 1/x, find dy/dx:",
    options: ["1 + 1/x²", "1 - 1/x²", "x + 1/x²", "1/x²"],
    correct_index: 0,
    solution: "y = x - x^(-1) ⇒ dy/dx = 1 - (-1)x^(-2) = 1 + 1/x²."
  },
  {
    q_num: 250,
    question_text: "Complete the following mathematical statements:\n• If the product of slopes of two straight lines is -1, then the lines must be ______ to each other.\n• If y = π sin θ, find the value of y at θ = 4°.\n• If y = π cos θ, find the value of y at θ = 5°.\n• Differentiation of potential energy with position (-dU/dr) is called ______.",
    options: [
      "Perpendicular, π²/45, π, force",
      "Parallel, π/45, 0, work",
      "Perpendicular, 4π, 5π, power",
      "None of these"
    ],
    correct_index: 0,
    solution: "(1) m₁m₂ = -1 indicates perpendicular lines;\n(2) For small angle, sin(4°) ≈ 4 × (π/180) = π/45 ⇒ y = π(π/45) = π²/45;\n(3) cos(5°) ≈ 1 ⇒ y ≈ π;\n(4) -dU/dr = F (Force)."
  },
  {
    q_num: 251,
    question_text: "The differentiation of sin(π/2) with respect to x will be cos(π/2):",
    options: ["True", "False"],
    correct_index: 1,
    solution: "sin(π/2) = 1 is a numerical constant. The derivative of any constant with respect to x is 0, so stating it is cos(π/2) via the function rule is False."
  },
  {
    q_num: 252,
    question_text: "Differentiate y = tan x · log x with respect to x:",
    options: [
      "sec² x · log x + (tan x) / x",
      "sec² x · log x - (tan x) / x",
      "tan x / x",
      "sec² x / x"
    ],
    correct_index: 0,
    solution: "Using product rule: dy/dx = (d/dx tan x) log x + tan x (d/dx log x) = sec² x · log x + (tan x) / x."
  },
  {
    q_num: 253,
    question_text: "Differentiate y = cos x + 2/x³ with respect to x:",
    options: [
      "-sin x - 6/x⁴",
      "sin x - 6/x⁴",
      "-sin x + 6/x⁴",
      "-sin x - 2/x⁴"
    ],
    correct_index: 0,
    solution: "dy/dx = -sin x + 2(-3x^(-4)) = -sin x - 6/x⁴."
  },
  {
    q_num: 254,
    question_text: "Differentiate y = 4 / (x³ + 1) with respect to x:",
    options: [
      "-12x² / (x³ + 1)²",
      "12x² / (x³ + 1)²",
      "-4x² / (x³ + 1)",
      "-12x / (x³ + 1)²"
    ],
    correct_index: 0,
    solution: "y = 4(x³ + 1)^(-1) ⇒ dy/dx = 4(-1)(x³ + 1)^(-2) × (3x²) = -12x² / (x³ + 1)²."
  },
  {
    q_num: 255,
    question_text: "Find the derivatives of the following functions:\n(i) y = x² cos x\n(ii) y = sin(2x²)\n(iii) y = A sin(ωt + 5)\n(iv) y = (x - 4x²)³\n(v) y = sin(50x)\n(vi) y = x² / (x² - 4)\n(vii) y = 4 / (x² - 4)\n(viii) y = √(x² + 5)",
    options: [
      "(i) 2x cos x - x² sin x, (ii) 4x cos(2x²), (iii) ωA cos(ωt + 5), (iv) 3(1 - 8x)(x - 4x²)², (v) 50 cos(50x), (vi) -8x / (x² - 4)², (vii) -8x / (x² - 4)², (viii) x / √(x² + 5)",
      "(i) 2x cos x + x² sin x, (ii) 2x cos(2x²), (iii) A cos(ωt + 5), (iv) (1 - 8x)², (v) cos(50x), (vi) 2x / (x² - 4), (vii) -4 / (x² - 4)², (viii) 2x / √(x² + 5)",
      "None of these",
      "All zero"
    ],
    correct_index: 0,
    solution: "Applying standard product, quotient, and chain rules to each function."
  },
  {
    q_num: 256,
    question_text: "Identify the physical quantities represented by the derivatives:\n1. Potential energy w.r.t. distance\n2. Velocity w.r.t. time\n3. Gravitational potential w.r.t. distance\n4. Angular momentum w.r.t. time\n5. Work w.r.t. time",
    options: [
      "1: Force, 2: Acceleration, 3: Gravitational field intensity, 4: Torque, 5: Power",
      "1: Work, 2: Speed, 3: Potential, 4: Momentum, 5: Energy",
      "1: Energy, 2: Displacement, 3: Force, 4: Force, 5: Work",
      "None of these"
    ],
    correct_index: 0,
    solution: "1: -dU/dr = Force; 2: dv/dt = Acceleration; 3: -dV/dr = Gravitational field intensity; 4: dL/dt = Torque; 5: dW/dt = Power."
  },
  {
    q_num: 257,
    question_text: "Identify the physical quantities from the slope (differentiation):\n1. Work w.r.t. position\n2. Electric potential w.r.t. distance\n3. Position w.r.t. time\n4. Pressure w.r.t. volume for Isothermal process\n5. Pressure w.r.t. volume for Adiabatic process",
    options: [
      "1: Force, 2: Negative of electric field, 3: Velocity, 4: -P/V, 5: -γP/V",
      "1: Power, 2: Electric charge, 3: Speed, 4: -V/P, 5: -P/γV",
      "1: Energy, 2: Potential gradient, 3: Acceleration, 4: P/V, 5: γP/V",
      "None of these"
    ],
    correct_index: 0,
    solution: "1: dW/dx = F (Force); 2: -dV/dr = E (Electric field); 3: dx/dt = v (Velocity); 4: (dP/dV)_iso = -P/V; 5: (dP/dV)_adi = -γP/V."
  },
  {
    q_num: 258,
    question_text: "Find the second derivative (d²y/dx²) of the polynomial: y = x⁵ + 2x⁴ + 3x⁴ + 4x² + 5x + 6",
    options: [
      "20x³ + 60x² + 8",
      "5x⁴ + 20x³ + 8x",
      "20x³ + 24x² + 36x² + 8",
      "Both (a) and (c) are equivalent"
    ],
    correct_index: 3,
    solution: "Combining terms: y = x⁵ + 5x⁴ + 4x² + 5x + 6. First derivative: y' = 5x⁴ + 20x³ + 8x + 5. Second derivative: y'' = 20x³ + 60x² + 8."
  },
  {
    q_num: 259,
    question_text: "Find the 5th order derivative (d⁵y/dx⁵) for:\n(i) y = e^x\n(ii) y = sin x",
    options: [
      "(i) e^x, (ii) cos x",
      "(i) 5e^x, (ii) -cos x",
      "(i) e^x, (ii) -sin x",
      "(i) e^(5x), (ii) sin x"
    ],
    correct_index: 0,
    solution: "(i) All derivatives of e^x are e^x;\n(ii) y' = cos x, y'' = -sin x, y''' = -cos x, y^(4) = sin x, y^(5) = cos x."
  },
  {
    q_num: 260,
    question_text: "If y = sin(x² + 3x), find dy/dx:",
    options: [
      "(2x + 3) cos(x² + 3x)",
      "cos(x² + 3x)",
      "(2x + 3) sin(x² + 3x)",
      "-(2x + 3) cos(x² + 3x)"
    ],
    correct_index: 0,
    solution: "Using the chain rule: dy/dx = cos(x² + 3x) · d/dx(x² + 3x) = (2x + 3) cos(x² + 3x)."
  },
  {
    q_num: 261,
    question_text: "If y = e^(αx²), where α is constant, find dy/dx:",
    options: [
      "2αx e^(αx²)",
      "αx e^(αx²)",
      "2α e^(αx²)",
      "e^(αx²)"
    ],
    correct_index: 0,
    solution: "dy/dx = e^(αx²) · d/dx(αx²) = 2αx e^(αx²)."
  },
  {
    q_num: 262,
    question_text: "If y = a sin(βt), find dy/dt where a and β are constants:",
    options: ["aβ cos(βt)", "-aβ cos(βt)", "a cos(βt)", "aβ sin(βt)"],
    correct_index: 0,
    solution: "dy/dt = a · cos(βt) · β = aβ cos(βt)."
  },
  {
    q_num: 263,
    question_text: "Find the second derivative (d²y/dx²) of y = e^(ax):",
    options: ["a² e^(ax)", "a e^(ax)", "e^(ax)", "2a e^(ax)"],
    correct_index: 0,
    solution: "dy/dx = a e^(ax) ⇒ d²y/dx² = a(a e^(ax)) = a² e^(ax)."
  },
  {
    q_num: 264,
    question_text: "If y = 4e^(3t), find dy/dt:",
    options: ["12e^(3t)", "4e^(3t)", "12t e^(3t)", "3e^(3t)"],
    correct_index: 0,
    solution: "dy/dt = 4(3) e^(3t) = 12 e^(3t)."
  },
  {
    q_num: 265,
    question_text: "If y = 5 sin(4 + 3t), find dy/dt:",
    options: [
      "15 cos(4 + 3t)",
      "-15 cos(4 + 3t)",
      "5 cos(4 + 3t)",
      "15 sin(4 + 3t)"
    ],
    correct_index: 0,
    solution: "dy/dt = 5(3) cos(4 + 3t) = 15 cos(4 + 3t)."
  },
  {
    q_num: 266,
    question_text: "If y = cos x - 4/x², find dy/dx:",
    options: [
      "-sin x + 8/x³",
      "-sin x - 8/x³",
      "sin x + 8/x³",
      "-sin x + 4/x³"
    ],
    correct_index: 0,
    solution: "y = cos x - 4x^(-2) ⇒ dy/dx = -sin x - 4(-2x^(-3)) = -sin x + 8/x³."
  },
  {
    q_num: 267,
    question_text: "If y = e^(-α²t) where α is constant, find dy/dt:",
    options: [
      "-α² e^(-α²t)",
      "α² e^(-α²t)",
      "-2α e^(-α²t)",
      "-α e^(-α²t)"
    ],
    correct_index: 0,
    solution: "dy/dt = (-α²) e^(-α²t)."
  },
  {
    q_num: 268,
    question_text: "Find the derivative of:\n(i) y = log(3x + 4)\n(ii) y = sin² x",
    options: [
      "(i) 3 / (3x + 4), (ii) 2 sin x cos x",
      "(i) 1 / (3x + 4), (ii) cos² x",
      "(i) 3x / (3x + 4), (ii) 2 cos x",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) d/dx[log(3x + 4)] = 3 / (3x + 4);\n(ii) d/dx[sin² x] = 2 sin x cos x = sin 2x."
  },
  {
    q_num: 269,
    question_text: "Find the derivatives of:\n(i) y = e^(4x - 3)\n(ii) y = e^(x² - 2)",
    options: [
      "(i) 4e^(4x - 3), (ii) 2x e^(x² - 2)",
      "(i) e^(4x - 3), (ii) x e^(x² - 2)",
      "(i) 4e^(4x), (ii) 2e^(x² - 2)",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) dy/dx = 4 e^(4x - 3);\n(ii) dy/dx = 2x e^(x² - 2)."
  },
  {
    q_num: 270,
    question_text: "Find the derivative of y with respect to x where y = A sin(ωt - kx):",
    options: [
      "-kA cos(ωt - kx)",
      "kA cos(ωt - kx)",
      "-ωA cos(ωt - kx)",
      "ωA cos(ωt - kx)"
    ],
    correct_index: 0,
    solution: "dy/dx = A cos(ωt - kx) · d/dx(ωt - kx) = -kA cos(ωt - kx)."
  },
  {
    q_num: 271,
    question_text: "If y = x², find dy/dx:",
    options: ["2x", "x", "2", "x²"],
    correct_index: 0,
    solution: "dy/dx = 2x."
  },
  {
    q_num: 272,
    question_text: "If y = x² where x depends on time t, find dy/dt:",
    options: ["2x (dx/dt)", "2x", "x (dx/dt)", "2(dx/dt)"],
    correct_index: 0,
    solution: "By chain rule: dy/dt = (dy/dx)(dx/dt) = 2x(dx/dt)."
  },
  {
    q_num: 273,
    question_text: "If y = (2/3)π x², find dy/dt:",
    options: [
      "(4/3)π x (dx/dt)",
      "(2/3)π x (dx/dt)",
      "(4/3)π x",
      "2π x (dx/dt)"
    ],
    correct_index: 0,
    solution: "dy/dt = (2/3)π · 2x · (dx/dt) = (4/3)π x (dx/dt)."
  },
  {
    q_num: 274,
    question_text: "If V = (4/3)π R³, find the rate of change of volume with respect to time (dV/dt):",
    options: [
      "4πR² (dR/dt)",
      "4πR (dR/dt)",
      "(4/3)πR² (dR/dt)",
      "12πR² (dR/dt)"
    ],
    correct_index: 0,
    solution: "dV/dt = (4/3)π · 3R² · (dR/dt) = 4πR² (dR/dt)."
  },
  {
    q_num: 275,
    question_text: "If the radius of a circle increases at (1/π) m/s, find the rate of change in area when radius is 4 m:",
    options: ["8 m²/s", "4 m²/s", "16 m²/s", "8π m²/s"],
    correct_index: 0,
    solution: "A = πR² ⇒ dA/dt = 2πR(dR/dt) = 2π(4)(1/π) = 8 m²/s."
  },
  {
    q_num: 276,
    question_text: "If y = x² e^x, find dy/dx:",
    options: [
      "2x e^x + x² e^x",
      "2x e^x",
      "x² e^x",
      "2xe^x - x²e^x"
    ],
    correct_index: 0,
    solution: "Product rule: dy/dx = 2x e^x + x² e^x = x(x + 2)e^x."
  },
  {
    q_num: 277,
    question_text: "Find the derivative of y = (x⁴ - 1)⁵⁰:",
    options: [
      "200x³(x⁴ - 1)⁴⁹",
      "50(x⁴ - 1)⁴⁹",
      "200x⁴(x⁴ - 1)⁴⁹",
      "50x³(x⁴ - 1)⁴⁹"
    ],
    correct_index: 0,
    solution: "dy/dx = 50(x⁴ - 1)⁴⁹ · (4x³) = 200x³(x⁴ - 1)⁴⁹."
  },
  {
    q_num: 278,
    question_text: "If y = sin θ, then find dy/dθ at θ = 30°:",
    options: ["√3 / 2", "1/2", "1", "0"],
    correct_index: 0,
    solution: "dy/dθ = cos θ. At θ = 30°: cos(30°) = √3/2."
  },
  {
    q_num: 279,
    question_text: "If y = e^x, then find dy/dx at x = 2:",
    options: ["e²", "2e", "e", "2e²"],
    correct_index: 0,
    solution: "dy/dx = e^x. At x = 2: dy/dx = e²."
  },
  {
    q_num: 280,
    question_text: "If v = x²y + y²z + z²x, find the partial derivative ∂v/∂x:",
    options: [
      "2xy + z²",
      "x² + z²",
      "2xy + 2yz",
      "None of these"
    ],
    correct_index: 0,
    solution: "∂v/∂x = ∂/∂x(x²y) + ∂/∂x(y²z) + ∂/∂x(z²x) = 2xy + 0 + z² = 2xy + z²."
  },
  {
    q_num: 281,
    question_text: "If v = x³ y² z + y³ x z², find the partial derivative ∂v/∂y:",
    options: [
      "2x³ y z + 3y² x z²",
      "3x² y² z + y³ z²",
      "x³ y² + 3y² x z",
      "None of these"
    ],
    correct_index: 0,
    solution: "∂v/∂y = x³ z (2y) + x z² (3y²) = 2x³ y z + 3y² x z²."
  },
  {
    q_num: 282,
    question_text: "Find the indefinite integrals:\n(i) ∫x⁵ dx\n(ii) ∫(1/x²) dx",
    options: [
      "(i) x⁶/6 + c, (ii) -1/x + c",
      "(i) 5x⁴ + c, (ii) -2/x³ + c",
      "(i) x⁶ + c, (ii) ln|x| + c",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) ∫x⁵ dx = x⁶/6 + c;\n(ii) ∫x^(-2) dx = x^(-1)/(-1) + c = -1/x + c."
  },
  {
    q_num: 283,
    question_text: "Evaluate the standard indefinite integrals:\n(i) ∫x³ dx, (ii) ∫√x dx, (iii) ∫sin x dx, (iv) ∫cos x dx, (v) ∫(x² + sin x) dx, (vi) ∫sin(5x + 4) dx, (vii) ∫cos(2x) dx, (viii) ∫(4x - 6)² dx, (ix) ∫[1/(5x - 3)] dx, (x) ∫e^(5x + 4) dx",
    options: [
      "(i) x⁴/4, (ii) (2/3)x^(3/2), (iii) -cos x, (iv) sin x, (v) x³/3 - cos x, (vi) -cos(5x+4)/5, (vii) sin(2x)/2, (viii) (4x-6)³/12, (ix) (1/5)ln(5x-3), (x) e^(5x+4)/5",
      "(i) 3x², (ii) 1/(2√x), (iii) cos x, (iv) -sin x, (v) 2x + cos x, (vi) 5 cos(5x+4), (vii) -2 sin(2x), (viii) 8(4x-6), (ix) 5/(5x-3), (x) 5e^(5x+4)",
      "None of these",
      "All zero"
    ],
    correct_index: 0,
    solution: "Applying standard integration rules and linear substitution."
  },
  {
    q_num: 284,
    question_text: "If y = x² + 2, evaluate the definite integral from x₁ = 1 to x₂ = 3:",
    options: ["38/3", "40/3", "12", "14"],
    correct_index: 0,
    solution: "∫₁³ (x² + 2) dx = [x³/3 + 2x]₁³ = (27/3 + 6) - (1/3 + 2) = 15 - 7/3 = 38/3."
  },
  {
    q_num: 285,
    question_text: "Evaluate the definite integral of y = 5 from x₁ = 2 to x₂ = 1:",
    options: ["-5", "5", "10", "-10"],
    correct_index: 0,
    solution: "∫₂¹ 5 dx = [5x]₂¹ = 5(1 - 2) = -5."
  },
  {
    q_num: 286,
    question_text: "Evaluate: ∫_(π/2)^(3π/2) cos θ dθ",
    options: ["-2", "2", "0", "1"],
    correct_index: 0,
    solution: "[sin θ]_(π/2)^(3π/2) = sin(3π/2) - sin(π/2) = -1 - 1 = -2."
  },
  {
    q_num: 287,
    question_text: "Evaluate: ∫_(-π)^(+π) sin θ dθ",
    options: ["0", "2", "-2", "π"],
    correct_index: 0,
    solution: "sin θ is an odd function, and the limits are symmetric about 0. Hence the integral is 0."
  },
  {
    q_num: 288,
    question_text: "Evaluate: ∫₀^(2π) sin θ dθ",
    options: ["0", "1", "2", "-1"],
    correct_index: 0,
    solution: "[-cos θ]₀^(2π) = -cos(2π) - (-cos 0) = -1 - (-1) = 0."
  },
  {
    q_num: 289,
    question_text: "Evaluate: ∫_(-π/2)^(+π/2) cos θ dθ",
    options: ["+2", "-2", "0", "1"],
    correct_index: 0,
    solution: "[sin θ]_(-π/2)^(π/2) = sin(π/2) - sin(-π/2) = 1 - (-1) = 2."
  },
  {
    q_num: 290,
    question_text: "Evaluate: ∫₀¹ e^x dx",
    options: ["e - 1", "e", "e + 1", "1"],
    correct_index: 0,
    solution: "[e^x]₀¹ = e¹ - e⁰ = e - 1."
  },
  {
    q_num: 291,
    question_text: "Evaluate: ∫₀^(π/2) (sin x + cos x) dx",
    options: ["2", "1", "0", "√2"],
    correct_index: 0,
    solution: "[-cos x + sin x]₀^(π/2) = (-0 + 1) - (-1 + 0) = 1 - (-1) = 2."
  },
  {
    q_num: 292,
    question_text: "Evaluate: ∫₀^π (sin x + cos x) dx",
    options: ["2", "0", "1", "-2"],
    correct_index: 0,
    solution: "[-cos x + sin x]₀^π = (-cos π + sin π) - (-cos 0 + sin 0) = (1 + 0) - (-1 + 0) = 2."
  },
  {
    q_num: 293,
    question_text: "Match the following average and RMS values for sin θ:\n(A) <sin θ> over full cycle\n(B) <sin θ> over positive half cycle\n(C) <sin² θ> over half or full cycle\n(D) R.M.S. value of sin θ",
    options: [
      "A - (iv), B - (i), C - (ii), D - (iii)",
      "A - (i), B - (ii), C - (iii), D - (iv)",
      "A - (ii), B - (iii), C - (iv), D - (i)",
      "None of these"
    ],
    correct_index: 0,
    solution: "A: Full cycle average of sin θ is 0 (iv);\nB: Half cycle average is 2/π (i);\nC: Average of sin² θ is 1/2 (ii);\nD: RMS value is 1/√2 (iii)."
  },
  {
    q_num: 294,
    question_text: "Evaluate the potential integral ∫_∞^r (K q₁ q₂ / r²) dr:",
    options: [
      "-K q₁ q₂ / r",
      "+K q₁ q₂ / r",
      "-K q₁ q₂ / r²",
      "0"
    ],
    correct_index: 0,
    solution: "K q₁ q₂ ∫_∞^r r^(-2) dr = K q₁ q₂ [-1/r]_∞^r = -K q₁ q₂ / r."
  },
  {
    q_num: 295,
    question_text: "Evaluate: ∫₀¹ e^(-x) dx",
    options: ["1 - 1/e", "1/e", "e - 1", "1 + 1/e"],
    correct_index: 0,
    solution: "[-e^(-x)]₀¹ = -e^(-1) - (-e⁰) = 1 - 1/e."
  },
  {
    q_num: 296,
    question_text: "Evaluate: ∫(4 - 3x)² dx",
    options: [
      "-(4 - 3x)³ / 9 + c",
      "(4 - 3x)³ / 3 + c",
      "-(4 - 3x)³ / 3 + c",
      "(4 - 3x)³ / 9 + c"
    ],
    correct_index: 0,
    solution: "Using substitution u = 4 - 3x, du = -3 dx: ∫u² (-du/3) = -u³ / 9 + c = -(4 - 3x)³ / 9 + c."
  },
  {
    q_num: 297,
    question_text: "Evaluate: ∫₀^π sin(2x) dx",
    options: ["0", "1", "2", "-1"],
    correct_index: 0,
    solution: "[-cos(2x) / 2]₀^π = (-cos(2π)/2) - (-cos 0 / 2) = -1/2 - (-1/2) = 0."
  },
  {
    q_num: 298,
    question_text: "Evaluate the indefinite integral: ∫[(x³ + 2) / x³] dx",
    options: [
      "x - 1/x² + c",
      "x + 1/x² + c",
      "x - 2/x² + c",
      "ln|x| + c"
    ],
    correct_index: 0,
    solution: "∫(1 + 2x^(-3)) dx = x + 2(x^(-2) / -2) + c = x - 1/x² + c."
  },
  {
    q_num: 299,
    question_text: "Find the area bounded by the curve y = x² from x₁ = 2 to x₂ = 5:",
    options: ["39", "35", "42", "27"],
    correct_index: 0,
    solution: "Area = ∫₂⁵ x² dx = [x³/3]₂⁵ = (125 - 8) / 3 = 117 / 3 = 39."
  },
  {
    q_num: 300,
    question_text: "Identify the physical quantities obtained by the area under the following graphs:\n(i) Velocity w.r.t. time\n(ii) Acceleration w.r.t. time\n(iii) Torque w.r.t. time\n(iv) Force w.r.t. time",
    options: [
      "Displacement, Change in velocity, Change in angular momentum, Change in linear momentum",
      "Distance, Speed, Angular acceleration, Acceleration",
      "Work, Force, Power, Energy",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) ∫v dt = Displacement;\n(ii) ∫a dt = Δv (Change in velocity);\n(iii) ∫τ dt = ΔL (Change in angular momentum);\n(iv) ∫F dt = Δp (Impulse / Change in linear momentum)."
  },
  {
    q_num: 301,
    question_text: "Identify the physical quantities represented by the area under each graph:\n(i) Force w.r.t. displacement\n(ii) Electric field w.r.t. distance\n(iii) Pressure w.r.t. volume\n(iv) Power w.r.t. time",
    options: [
      "Work done, Change in electric potential, Work done, Work done / Energy",
      "Power, Electric flux, Heat, Momentum",
      "Energy, Electric field, Enthalpy, Force",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) ∫F dx = Work;\n(ii) ∫E dr = -ΔV (Change in potential);\n(iii) ∫P dV = Work;\n(iv) ∫P dt = Work / Energy."
  },
  {
    q_num: 302,
    question_text: "Find the maxima and minima of y = x² + 5:",
    options: [
      "Minima of y is 5 at x = 0 (No maxima)",
      "Maxima of y is 5 at x = 0",
      "Minima of y is 0 at x = 5",
      "None of these"
    ],
    correct_index: 0,
    solution: "dy/dx = 2x = 0 ⇒ x = 0. d²y/dx² = 2 > 0 ⇒ minimum at x = 0 with value y = 5. As x → ±∞, y → ∞, so no finite maximum exists."
  },
  {
    q_num: 303,
    question_text: "Find the maxima and minima of y = 4x - x²:",
    options: [
      "Maximum value of y is 4 at x = 2 (No minima)",
      "Minimum value of y is 4 at x = 2",
      "Maximum value of y is 2 at x = 4",
      "None of these"
    ],
    correct_index: 0,
    solution: "dy/dx = 4 - 2x = 0 ⇒ x = 2. d²y/dx² = -2 < 0 ⇒ maximum at x = 2 with value y = 4(2) - 4 = 4."
  },
  {
    q_num: 304,
    question_text: "If y = x² - 4x + 5, then find the extreme values of y:",
    options: [
      "Minimum value of y = 1 at x = 2",
      "Maximum value of y = 1 at x = 2",
      "Minimum value of y = 5 at x = 0",
      "Maximum value of y = 5 at x = 0"
    ],
    correct_index: 0,
    solution: "dy/dx = 2x - 4 = 0 ⇒ x = 2. d²y/dx² = 2 > 0 ⇒ minimum at x = 2 with y = 4 - 8 + 5 = 1."
  },
  {
    q_num: 305,
    question_text: "If velocity is given by v(t) = t³ - 6t² + 12 for t ≥ 0, find the local maximum and minimum values of velocity:",
    options: [
      "Maxima = 12 at t = 0, Minima = -20 at t = 4",
      "Maxima = 20 at t = 4, Minima = 0 at t = 0",
      "Maxima = 12 at t = 2, Minima = -12 at t = 2",
      "None of these"
    ],
    correct_index: 0,
    solution: "dv/dt = 3t² - 12t = 3t(t - 4) = 0 ⇒ t = 0, 4. At t = 0, v = 12 (local maximum). At t = 4, v = 64 - 96 + 12 = -20 (local minimum)."
  },
  {
    q_num: 306,
    question_text: "If the acceleration of an object is a(t) = t³/3 - 5t²/2 + 6t, then find its maximum and minimum acceleration:",
    options: [
      "Maximum = 4.66, Minimum = 4.5",
      "Maximum = 6, Minimum = 0",
      "Maximum = 5, Minimum = 3",
      "None of these"
    ],
    correct_index: 0,
    solution: "da/dt = t² - 5t + 6 = (t - 2)(t - 3) = 0 ⇒ t = 2, 3. At t = 2: a(2) = 8/3 - 10 + 12 = 14/3 ≈ 4.67 (Maximum). At t = 3: a(3) = 9 - 45/2 + 18 = 4.5 (Minimum)."
  },
  {
    q_num: 307,
    question_text: "For y = x³ - 3x² + 4, find its local maximum and minimum values:",
    options: [
      "Maximum = 4 at x = 0, Minimum = 0 at x = 2",
      "Maximum = 0 at x = 2, Minimum = 4 at x = 0",
      "Maximum = 2 at x = 1, Minimum = -2 at x = 1",
      "None of these"
    ],
    correct_index: 0,
    solution: "dy/dx = 3x² - 6x = 3x(x - 2) = 0 ⇒ x = 0, 2. d²y/dx² = 6x - 6. At x = 0: y'' = -6 < 0 ⇒ Max = 4. At x = 2: y'' = +6 > 0 ⇒ Min = 8 - 12 + 4 = 0."
  },
  {
    q_num: 308,
    question_text: "The maxima of a function is the point at which the magnitude of the slope of the graph has its maximum value:",
    options: ["True", "False"],
    correct_index: 1,
    solution: "At a maximum or minimum, the tangent is horizontal, which means the slope is ZERO, not maximum. Statement is False."
  },
  {
    q_num: 309,
    question_type: "assertion_reason",
    assertion_text: "In minima, dy/dx = 0 and tangent drawn at the point is perpendicular to x axis.",
    reason_text: "At minima d²y/dx² = negative as the graph has reached it's minimum value.",
    question_text: "Assertion (A): In minima, dy/dx = 0 and tangent drawn at the point is perpendicular to x axis.\nReason (R): At minima d²y/dx² = negative as the graph has reached it's minimum value.",
    options: [
      "A is false but R is true.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "Both A and R are false."
    ],
    correct_index: 3,
    solution: "Assertion is false because dy/dx = 0 means tangent is parallel to the x-axis (not perpendicular). Reason is false because at a minimum, the curve curves upwards, so d²y/dx² is POSITIVE. Both A and R are false."
  },
  {
    q_num: 310,
    question_text: "A spherical conductor of radius 10 cm has a charge of 3.2 × 10^(-7) C distributed uniformly. What is the magnitude of electric field at a point 15 cm from the centre of the sphere? [1/(4πε₀) = 9 × 10⁹ N·m²/C²]:",
    options: [
      "1.28 × 10⁴ N/C",
      "1.28 × 10⁶ N/C",
      "1.28 × 10⁵ N/C",
      "1.28 × 10⁷ N/C"
    ],
    correct_index: 2,
    solution: "Outside a spherical conductor: E = kQ / r² = (9 × 10⁹ × 3.2 × 10^(-7)) / (0.15)² = 2880 / 0.0225 = 1.28 × 10⁵ N/C."
  },
  {
    q_num: 311,
    question_text: "Given P = √(2m · K.E.). If the kinetic energy becomes one-fourth of its initial value, the final momentum becomes:",
    options: ["P / 2", "P / 4", "2P", "P"],
    correct_index: 0,
    solution: "P ∝ √(K.E.). If K.E.' = K.E. / 4, then P' = √(1/4) P = P / 2."
  },
  {
    q_num: 312,
    question_text: "For an electric dipole, E = 2kP / r³. If distance r becomes double, find the ratio of final to initial electric field (E_f / E_i):",
    options: ["1/8", "1/4", "1/2", "8"],
    correct_index: 0,
    solution: "E ∝ 1/r³. If r' = 2r, E_f / E_i = (r / 2r)³ = 1/8."
  },
  {
    q_num: 313,
    question_text: "Stopping distance is given by S = v₀² / (2a). If speed becomes half and retardation becomes double, find the ratio of final to initial stopping distance:",
    options: ["1 : 8", "1 : 4", "1 : 2", "1 : 16"],
    correct_index: 0,
    solution: "S' = (v₀ / 2)² / (2(2a)) = (v₀² / 4) / (4a) = (1/8) · (v₀² / 2a) = S / 8. Ratio = 1 : 8."
  },
  {
    q_num: 314,
    question_text: "A bob is whirled in a horizontal plane by means of a string with an initial speed of ω. The tension in the string is T. If speed becomes 2ω while keeping the same radius, the tension in the string becomes:",
    options: ["T / 4", "√2 T", "T", "4T"],
    correct_index: 3,
    solution: "Tension T = mω²r. Since T ∝ ω², doubling ω quadruples the tension: T' = m(2ω)²r = 4 mω²r = 4T."
  },
  {
    q_num: 315,
    question_text: "Given y = 2x² / z. If x becomes double and z becomes half, then y will become:",
    options: ["8 times", "4 times", "16 times", "2 times"],
    correct_index: 0,
    solution: "y' = 2(2x)² / (z / 2) = 2(4x²) / (z / 2) = 8 · (2x² / z) = 8y."
  },
  {
    q_num: 316,
    question_text: "Solve the simultaneous linear equations: x + y = 10 and 2x - y = 2:",
    options: [
      "x = 4, y = 6",
      "x = 6, y = 4",
      "x = 5, y = 5",
      "x = 3, y = 7"
    ],
    correct_index: 0,
    solution: "Adding both equations: (x + y) + (2x - y) = 10 + 2 ⇒ 3x = 12 ⇒ x = 4. Substituting x = 4 into first equation: 4 + y = 10 ⇒ y = 6."
  },
  {
    q_num: 317,
    question_text: "An electron is rotating around an infinite positive linear charge in a circle of radius 0.1 m. If linear charge density is 1 μC/m, then the velocity of the electron in m/s will be [mv²/r = 2kλq/r]:",
    options: [
      "0.562 × 10⁷ m/s",
      "5.62 × 10⁷ m/s",
      "562 × 10⁷ m/s",
      "0.0562 × 10⁷ m/s"
    ],
    correct_index: 1,
    solution: "v = √(2kλe / m) = √(2 × 9 × 10⁹ × 10^(-6) × 1.6 × 10^(-19) / (9.1 × 10^(-31))) = √(3.16 × 10¹⁵) ≈ 5.62 × 10⁷ m/s."
  },
  {
    q_num: 318,
    question_text: "A thin flat circular disc of radius 4.5 cm is placed gently over the surface of water. If surface tension of water is 0.07 N/m, then the excess force required to take it away from the surface is [F = S(2πr)]:",
    options: ["1.98 mN", "99 N", "19.8 mN", "198 N"],
    correct_index: 2,
    solution: "F = S × 2πr = 0.07 × 2 × (22/7) × (4.5 × 10^(-2)) = 0.0198 N = 19.8 mN."
  },
  {
    q_num: 319,
    question_text: "A metallic bar of Young's modulus Y = 0.5 × 10¹¹ N/m², coefficient of linear thermal expansion α = 10^(-5) °C⁻¹, length 1 m, and cross-sectional area 10^(-3) m² is heated from 0°C to 100°C without expansion. The compressive force developed in it is:",
    options: [
      "100 × 10³ N",
      "2 × 10³ N",
      "52 × 10³ N",
      "50 × 10³ N"
    ],
    correct_index: 3,
    solution: "Thermal stress = Y α ΔT. Compressive force F = Y A α ΔT = (0.5 × 10¹¹) × (10^(-3)) × (10^(-5)) × 100 = 50,000 N = 50 × 10³ N."
  },
  {
    q_num: 320,
    question_text: "A 10 μF capacitor is connected to a 210 V (rms), 50 Hz source. The peak current in the circuit is nearly (π = 3.14) [I₀ = V₀ ω C]:",
    options: ["1.20 A", "0.35 A", "0.58 A", "0.93 A"],
    correct_index: 3,
    solution: "Peak voltage V₀ = V_rms × √2 = 210 × 1.414 ≈ 297 V. Peak current I₀ = V₀ (2πf C) = 297 × 2 × 3.14 × 50 × (10 × 10^(-6)) ≈ 0.932 A."
  },
  {
    q_num: 321,
    question_text: "In a uniform magnetic field of 0.049 T, a magnetic needle performs 20 complete oscillations in 5 seconds. The moment of inertia of the needle is 9.8 × 10^(-6) kg·m². If the magnetic moment of the needle is x × 10^(-5) A·m², then the value of x is [T = 2π√(I / (MB))]:",
    options: ["50 π²", "1280 π²", "5 π²", "128 π²"],
    correct_index: 1,
    solution: "Time period T = 5 / 20 = 1/4 s. T² = 4π² I / (MB) ⇒ (1/4)² = 4π² (9.8 × 10^(-6)) / (M × 0.049). 1/16 = 4π² (2 × 10^(-4)) / M ⇒ M = 16 × 8 × 10^(-4) π² = 1280 × 10^(-5) π² A·m². Thus x = 1280 π²."
  }
];

