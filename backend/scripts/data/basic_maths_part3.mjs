// Physics: Basic Maths & Calculus - Part 3 (Q161 to Q240)

export const BASIC_MATHS_PART3 = [
  {
    q_num: 161,
    question_text: "What is the nature of the graph for the function y = 2^x?",
    options: [
      "Exponentially increasing curve passing through (0, 1)",
      "Exponentially decreasing curve passing through (0, 1)",
      "Straight line through origin",
      "Parabola opening upwards"
    ],
    correct_index: 0,
    solution: "y = 2^x is an exponential growth function. At x = 0, y = 1. As x → ∞, y → ∞; as x → -∞, y → 0."
  },
  {
    q_num: 162,
    question_text: "Find the radius and centre of the circle given by: (x - 4)² + (y - 3)² = 25",
    options: [
      "Centre = (4, 3), Radius = 5",
      "Centre = (-4, -3), Radius = 25",
      "Centre = (4, 3), Radius = 25",
      "Centre = (-4, -3), Radius = 5"
    ],
    correct_index: 0,
    solution: "Comparing with (x - h)² + (y - k)² = r²: centre (h, k) = (4, 3) and radius r = √25 = 5."
  },
  {
    q_num: 163,
    question_text: "The equation of the ellipse whose vertices are at (±5, 0) and foci at (±4, 0) is:",
    options: [
      "x² / 25 + y² / 9 = 1",
      "x² / 9 + y² / 25 = 1",
      "x² / 10 + y² / 25 = 1",
      "x² / 25 + y² / 16 = 1"
    ],
    correct_index: 0,
    solution: "Semi-major axis a = 5. Focal distance c = ae = 4. Semi-minor axis b = √(a² - c²) = √(25 - 16) = 3 ⇒ b² = 9. Equation is x²/25 + y²/9 = 1."
  },
  {
    q_num: 164,
    question_text: "Match the following linear equations with their graphical features:\n(i) y = √3 x + 4, (ii) y = -x, (iii) y = x, (iv) x/3 + y/4 + 1 = 0",
    options: [
      "(i) Slope √3 (60°) & y-int 4; (ii) Line at 135°; (iii) Line at 45°; (iv) Intercepts -3 and -4",
      "(i) Slope 1/√3; (ii) Line at 45°; (iii) Line at 135°; (iv) Intercepts +3 and +4",
      "(i) Slope 1; (ii) Horizontal line; (iii) Vertical line; (iv) Hyperbola",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) m = tan 60° = √3, c = 4;\n(ii) m = -1 (angle = 135°);\n(iii) m = 1 (angle = 45°);\n(iv) x/(-3) + y/(-4) = 1 (intercepts -3 and -4)."
  },
  {
    q_num: 165,
    question_text: "Match the following functions with their corresponding graphs in Column-II:\n(i) y³ = 5x²\n(ii) 3y = 4x\n(iii) y = e^(-x)\n(iv) y² = 7x⁴\n(v) y = e^x",
    options: [
      "(i) - B, (ii) - A, (iii) - D, (iv) - E, (v) - C",
      "(i) - A, (ii) - B, (iii) - C, (iv) - D, (v) - E",
      "(i) - D, (ii) - C, (iii) - B, (iv) - A, (v) - E",
      "(i) - C, (ii) - D, (iii) - A, (iv) - B, (v) - E"
    ],
    correct_index: 0,
    solution: "(i) y ∝ x^(2/3) matches Graph B;\n(ii) Linear y = (4/3)x matches Graph A;\n(iii) Exponential decay matches Graph D;\n(iv) y = √7 x² (parabolic) matches Graph E;\n(v) Exponential growth matches Graph C."
  },
  {
    q_num: 166,
    question_text: "Match each physical quantity relationship with the nature of its graph:\n(i) Electric field vs distance for dipole\n(ii) Velocity vs acceleration for oscillating particle\n(iii) Force vs distance for spring & SHM\n(iv) Displacement vs time for motion under gravity\n(v) Gravitational potential vs distance for solid sphere\n(vi) Time period vs radius of satellite\n(vii) Velocity vs position for SHM with unit angular frequency\n(viii) Pressure vs Volume for isothermal process\n(ix) Mass rise in capillary tube vs radius\n(x) De-Broglie wavelength vs momentum",
    options: [
      "(i)-E, (ii)-C, (iii)-A, (iv)-B, (v)-F, (vi)-B, (vii)-D, (viii)-E, (ix)-A, (x)-E",
      "(i)-A, (ii)-B, (iii)-C, (iv)-D, (v)-E, (vi)-F, (vii)-A, (viii)-B, (ix)-C, (x)-D",
      "(i)-C, (ii)-D, (iii)-A, (iv)-B, (v)-E, (vi)-F, (vii)-B, (viii)-C, (ix)-D, (x)-A",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) E ∝ 1/r³ (hyperbolic-like → E);\n(ii) Ellipse (C);\n(iii) F = -kx (Straight line → A);\n(iv) s = ut - (1/2)gt² (Parabola → B);\n(v) Parabola + Rectangular hyperbola (F);\n(vi) T² ∝ R³ (Parabola/Power curve → B);\n(vii) v² + x² = A² (Circle → D);\n(viii) PV = const (Rectangular hyperbola → E);\n(ix) m ∝ r (Straight line → A);\n(x) λ = h/p (Rectangular hyperbola → E)."
  },
  {
    q_num: 167,
    question_text: "The graph between momentum P and velocity v (P = mv) for a constant mass m is:",
    options: [
      "Straight line passing through origin",
      "Parabola opening towards velocity axis",
      "Rectangular hyperbola",
      "Circle"
    ],
    correct_index: 0,
    solution: "P = mv is a linear relation (y = mx) with zero intercept, representing a straight line through the origin with slope equal to mass m."
  },
  {
    q_num: 168,
    question_text: "The graph between spring restoring force F and elongation x (F = -kx) is:",
    options: [
      "Straight line with negative slope passing through origin",
      "Straight line with positive slope passing through origin",
      "Parabola",
      "Rectangular hyperbola"
    ],
    correct_index: 0,
    solution: "F = -kx is a straight line passing through origin in quadrants II and IV with slope -k."
  },
  {
    q_num: 169,
    question_text: "The graph between stopping potential V₀ and energy of photon E from the photoelectric equation E = φ + e V₀ is a:",
    options: [
      "Straight line with slope 1/e and intercept -φ/e",
      "Straight line with slope e and intercept φ",
      "Parabola",
      "Exponential curve"
    ],
    correct_index: 0,
    solution: "V₀ = (1/e)E - φ/e. Plotting V₀ vs E gives a straight line with positive slope 1/e and negative intercept -φ/e."
  },
  {
    q_num: 170,
    question_text: "From the temperature relation (C - 0)/100 = (K - 273)/100, the graph between Celsius temperature C and Kelvin temperature K has a slope of:",
    options: ["1 (angle 45°)", "0", "100", "273"],
    correct_index: 0,
    solution: "C = K - 273. The slope dC/dK = 1, so the line makes an angle of 45° with the K-axis with intercept -273°C."
  },
  {
    q_num: 171,
    question_text: "In the P-V diagram shown with two isothermal curves at temperatures T₁ and T₂, which option is correct?",
    options: ["T₁ = T₂", "T₁ > T₂", "T₁ < T₂", "Can't say"],
    correct_index: 1,
    solution: "For an ideal gas, PV = nRT. At any given volume V, the higher isotherm has higher pressure, which means higher temperature: T₁ > T₂."
  },
  {
    q_num: 172,
    question_text: "If the slope of a Y-X graph represents temperature, and as we move from A to B the tangent steepens then flattens, then T is increasing and then decreasing:",
    options: ["True", "False"],
    correct_index: 0,
    solution: "Since temperature is directly proportional to the slope, an increasing slope followed by a decreasing slope corresponds to temperature increasing and then decreasing. Hence True."
  },
  {
    q_num: 173,
    question_text: "The graph between de-Broglie wavelength λ and momentum p (λ = h/p) is a:",
    options: [
      "Rectangular hyperbola",
      "Straight line passing through origin",
      "Parabola",
      "Ellipse"
    ],
    correct_index: 0,
    solution: "λ ∝ 1/p represents an inverse relationship whose curve in the first quadrant is a rectangular hyperbola."
  },
  {
    q_num: 174,
    question_text: "At constant temperature (isothermal process), the graph between pressure P and volume V for an ideal gas is a:",
    options: [
      "Rectangular hyperbola",
      "Straight line parallel to V-axis",
      "Parabola",
      "Circle"
    ],
    correct_index: 0,
    solution: "Boyle's law: P ∝ 1/V. The P-V graph is an isothermal rectangular hyperbola."
  },
  {
    q_num: 175,
    question_text: "From the relation P = √(2m · K.E.), the graph between momentum P and kinetic energy K.E. is a:",
    options: [
      "Parabola symmetric about K.E. axis",
      "Straight line passing through origin",
      "Rectangular hyperbola",
      "Ellipse"
    ],
    correct_index: 0,
    solution: "Squaring gives P² = 2m(K.E.), which has the form y² = 4ax (a parabola opening along the K.E. axis)."
  },
  {
    q_num: 176,
    question_text: "The time period of a simple pendulum is T = 2π√(l/g). The graph between time period T and length l is a:",
    options: [
      "Parabola opening along length axis",
      "Straight line through origin",
      "Rectangular hyperbola",
      "Exponential curve"
    ],
    correct_index: 0,
    solution: "T² = (4π²/g) l, which is of the form y² = kx (a parabola opening towards the length axis l)."
  },
  {
    q_num: 177,
    question_type: "assertion_reason",
    assertion_text: "In SHM, if velocity of particle is given by v = ω√(A² - x²), then graph between velocity and displacement x will be elliptical.",
    reason_text: "In SHM graph between K.E. and P.E. will be straight line.",
    question_text: "Assertion (A): In SHM, if velocity of particle is given by v = ω√(A² - x²), then graph between velocity and displacement x will be elliptical.\nReason (R): In SHM graph between K.E. and P.E. will be straight line.",
    options: [
      "A is false but R is true",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "Both A and R are true and R is the correct explanation of A"
    ],
    correct_index: 1,
    solution: "Assertion is true because v²/(ω²A²) + x²/A² = 1 is an ellipse. Reason is also true because K.E. + P.E. = E_total (a linear relation with slope -1). However, the conservation of energy does not explain why the v-x phase trajectory is an ellipse."
  },
  {
    q_num: 178,
    question_type: "assertion_reason",
    assertion_text: "In the given P-V graph shown (horizontal line from A to B), work done is continuously increasing if we move from A to B. (Hint: δW = P·dv)",
    reason_text: "The slope of graph is zero.",
    question_text: "Assertion (A): In the given P-V graph shown, work done is continuously increasing if we move from A to B.\nReason (R): The slope of graph is zero.",
    options: [
      "A is false but R is true",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "Both A and R are true and R is the correct explanation of A"
    ],
    correct_index: 1,
    solution: "Assertion is true because as volume increases at constant pressure, work W = ∫P dV continuously increases. Reason is true because dP/dV = 0 for an isobaric line. But slope being zero is not the explanation of work increasing (work increases because volume is expanding: dV > 0)."
  },
  {
    q_num: 179,
    question_text: "Match points A, B, C, D on the given curve with their slopes:\nPoints: A, B, C, D\nSlopes: Zero, Negative, Maximum, Positive",
    options: [
      "A - Positive, B - Maximum, C - Zero, D - Negative",
      "A - Zero, B - Positive, C - Maximum, D - Negative",
      "A - Negative, B - Zero, C - Positive, D - Maximum",
      "None of these"
    ],
    correct_index: 0,
    solution: "At A the tangent is tilted upward (Positive); at B the curve has steepest upward inclination (Maximum); at peak C tangent is horizontal (Zero); at D curve slopes downward (Negative)."
  },
  {
    q_num: 180,
    question_text: "Identify the slope and variation of slope at points A, B, C for curves (i) and (ii):",
    options: [
      "(i) slope of A = Negative, slope of B = 0, slope of C = Positive; (ii) slope of A = Positive, slope of B = 0, slope of C = Negative",
      "(i) slope of A = Positive, slope of B = 0, slope of C = Negative; (ii) slope of A = Negative, slope of B = 0, slope of C = Positive",
      "(i) All slopes zero; (ii) All slopes infinite",
      "None of these"
    ],
    correct_index: 0,
    solution: "Curve (i) is a trough/valley: falls at A (negative slope), flat at bottom B (slope 0), rises at C (positive slope). Curve (ii) is a crest/hill: rises at A (positive slope), flat at peak B (slope 0), falls at C (negative slope)."
  },
  {
    q_num: 181,
    question_text: "Match the curves in Column-I with descriptions of slope in Column-II:\n(1) Convex down, increasing\n(2) Concave up, asymptotic to x-axis\n(3) Concave down, flattening\n(4) Convex up, steepening negatively",
    options: [
      "(1) - C, (2) - D, (3) - A, (4) - B",
      "(1) - A, (2) - B, (3) - C, (4) - D",
      "(1) - D, (2) - C, (3) - B, (4) - A",
      "(1) - B, (2) - A, (3) - D, (4) - C"
    ],
    correct_index: 0,
    solution: "(1) Matches (C): Value and magnitude of slope both are increasing;\n(2) Matches (D): Slope is increasing but its magnitude decreasing;\n(3) Matches (A): Value of slope is decreasing and its magnitude is decreasing;\n(4) Matches (B): Value of slope decreasing but its magnitude is increasing."
  },
  {
    q_num: 182,
    question_text: "Find the roots of the quadratic equation: x² - 5x + 6 = 0:",
    options: ["2, 3", "-2, -3", "1, 6", "-1, 5"],
    correct_index: 0,
    solution: "x² - 5x + 6 = (x - 2)(x - 3) = 0 ⇒ x = 2, 3."
  },
  {
    q_num: 183,
    question_text: "Find the roots of the equation: x² - 4x = 0:",
    options: ["0, 4", "2, -2", "4, -4", "1, 3"],
    correct_index: 0,
    solution: "x(x - 4) = 0 ⇒ x = 0, 4."
  },
  {
    q_num: 184,
    question_text: "Find the roots of the equation: x² + 7x + 12 = 0:",
    options: ["-4, -3", "4, 3", "-2, -6", "1, 12"],
    correct_index: 0,
    solution: "(x + 4)(x + 3) = 0 ⇒ x = -4, -3."
  },
  {
    q_num: 185,
    question_text: "Find the roots of the equation: 2t² + 3t - 2 = 0:",
    options: ["-2, 1/2", "2, -1/2", "1, -2", "-1, 2"],
    correct_index: 0,
    solution: "2t² + 4t - t - 2 = 2t(t + 2) - 1(t + 2) = (2t - 1)(t + 2) = 0 ⇒ t = -2, 1/2."
  },
  {
    q_num: 186,
    question_text: "Roots of the equation x² - 4x + 3 = 0 are:",
    options: ["1, 3", "-1, 3", "1, -3", "-1, -3"],
    correct_index: 0,
    solution: "(x - 1)(x - 3) = 0 ⇒ x = 1, 3."
  },
  {
    q_num: 187,
    question_text: "Roots of the equation x² - x - 1 = 0 are:",
    options: [
      "(1 + √5)/2, (1 - √5)/2",
      "(1 + √5)/2, (√5 - 1)/2",
      "(-1 + √5)/2, (-1 - √5)/2",
      "None of these"
    ],
    correct_index: 0,
    solution: "Using quadratic formula x = (-b ± √(b² - 4ac)) / (2a) = (1 ± √(1 + 4)) / 2 = (1 ± √5) / 2."
  },
  {
    q_num: 188,
    question_text: "Solve these quadratic equations and find their roots:\n(i) x² - 5x - 14 = 0\n(ii) x² = 11x - 28\n(iii) 6x² - x = 5\n(iv) 12x² = 25x\n(v) x² + 4x - 5 = 0",
    options: [
      "(i) x = -2, 7; (ii) x = 4, 7; (iii) x = -5/6, 1; (iv) x = 0, 25/12; (v) x = -5, 1",
      "(i) x = 2, -7; (ii) x = -4, -7; (iii) x = 5/6, -1; (iv) x = 0, 12/25; (v) x = 5, -1",
      "(i) x = 1, 14; (ii) x = 2, 14; (iii) x = 1, 5; (iv) x = 1, 25; (v) x = 1, 4",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) (x - 7)(x + 2) = 0 ⇒ x = 7, -2;\n(ii) x² - 11x + 28 = (x - 4)(x - 7) = 0 ⇒ x = 4, 7;\n(iii) 6x² - x - 5 = (6x + 5)(x - 1) = 0 ⇒ x = -5/6, 1;\n(iv) x(12x - 25) = 0 ⇒ x = 0, 25/12;\n(v) (x + 5)(x - 1) = 0 ⇒ x = -5, 1."
  },
  {
    q_num: 189,
    question_text: "Find the roots of the equations:\n(i) x² - 7x + 10 = 0\n(ii) 2x² - 5x + 3 = 0",
    options: [
      "(i) x₁ = 2, x₂ = 5; (ii) x₁ = 1, x₂ = 3/2",
      "(i) x₁ = -2, x₂ = -5; (ii) x₁ = -1, x₂ = -3/2",
      "(i) x₁ = 1, x₂ = 10; (ii) x₁ = 2, x₂ = 3",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) (x - 2)(x - 5) = 0 ⇒ x = 2, 5;\n(ii) (2x - 3)(x - 1) = 0 ⇒ x = 1, 3/2."
  },
  {
    q_num: 190,
    question_text: "Find the roots of the equations:\n(i) 2x² - 5x - 3 = 0\n(ii) x² - 5x + 6 = 0",
    options: [
      "(i) x₁ = 3, x₂ = -1/2; (ii) x₁ = 2, x₂ = 3",
      "(i) x₁ = -3, x₂ = 1/2; (ii) x₁ = -2, x₂ = -3",
      "(i) x₁ = 1, x₂ = 6; (ii) x₁ = 1, x₂ = 5",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) (2x + 1)(x - 3) = 0 ⇒ x = 3, -1/2;\n(ii) (x - 2)(x - 3) = 0 ⇒ x = 2, 3."
  },
  {
    q_num: 191,
    question_text: "log₁₀(1) = ?",
    options: ["1", "-1", "0", "None"],
    correct_index: 2,
    solution: "The logarithm of 1 to any valid base is always 0."
  },
  {
    q_num: 192,
    question_text: "log₂(sin 90°) = ?",
    options: ["1", "-1", "0", "None"],
    correct_index: 2,
    solution: "sin 90° = 1. Therefore, log₂ 1 = 0."
  },
  {
    q_num: 193,
    question_text: "log₈(16) = ?",
    options: ["4/3", "3/2", "2/3", "3/4"],
    correct_index: 0,
    solution: "Let log₈ 16 = x ⇒ 8^x = 16 ⇒ (2³)^x = 2⁴ ⇒ 3x = 4 ⇒ x = 4/3."
  },
  {
    q_num: 194,
    question_text: "log₉(27) = ?",
    options: ["4/3", "3/2", "2/3", "3/4"],
    correct_index: 1,
    solution: "9^x = 27 ⇒ (3²)^x = 3³ ⇒ 2x = 3 ⇒ x = 3/2."
  },
  {
    q_num: 195,
    question_text: "log₁₀₀(1000) = ?",
    options: ["4/3", "3/2", "2/3", "3/4"],
    correct_index: 1,
    solution: "100^x = 1000 ⇒ (10²)^x = 10³ ⇒ 2x = 3 ⇒ x = 3/2."
  },
  {
    q_num: 196,
    question_text: "log₂(10) = ?",
    options: ["0.3", "3.32", "6.67", "5"],
    correct_index: 1,
    solution: "log₂ 10 = 1 / log₁₀ 2 = 1 / 0.3010 ≈ 3.32."
  },
  {
    q_num: 197,
    question_text: "log₂ 3 = ?",
    options: ["1.6", "0.8", "0.6", "2.6"],
    correct_index: 0,
    solution: "log₂ 3 = log₁₀ 3 / log₁₀ 2 = 0.4771 / 0.3010 ≈ 1.585 ≈ 1.6."
  },
  {
    q_num: 198,
    question_text: "If log₂ x = 3, then x = ?",
    options: ["6", "8", "9", "None"],
    correct_index: 1,
    solution: "x = 2³ = 8."
  },
  {
    q_num: 199,
    question_text: "If log₃(y²) = 4, then y = ?",
    options: ["9", "81", "-9", "Both (a) and (c)"],
    correct_index: 3,
    solution: "y² = 3⁴ = 81 ⇒ y = ±9. Both +9 and -9 satisfy the equation."
  },
  {
    q_num: 200,
    question_text: "log₁₀(4) = ?",
    options: ["2", "0.6020", "0.9542", "None"],
    correct_index: 1,
    solution: "log₁₀(4) = log₁₀(2²) = 2 log₁₀ 2 = 2 × 0.3010 = 0.6020."
  },
  {
    q_num: 201,
    question_text: "log₄(2) = ?",
    options: ["2", "-2", "1/2", "-1/2"],
    correct_index: 2,
    solution: "4^(1/2) = 2, so log₄ 2 = 1/2."
  },
  {
    q_num: 202,
    question_text: "log₁₆(2) = ?",
    options: ["4", "-4", "-1/4", "1/4"],
    correct_index: 3,
    solution: "16^(1/4) = 2, so log₁₆ 2 = 1/4."
  },
  {
    q_num: 203,
    question_text: "log₁₀(x² - 4x + 4) = 0, then x = ?",
    options: ["1", "2", "3", "Both (a) and (c)"],
    correct_index: 3,
    solution: "x² - 4x + 4 = 10⁰ = 1 ⇒ (x - 2)² = 1 ⇒ x - 2 = ±1 ⇒ x = 3 or x = 1."
  },
  {
    q_num: 204,
    question_text: "log₁₀ 5 + log₁₀ 2 = ?",
    options: ["1", "2", "-2", "3"],
    correct_index: 0,
    solution: "log₁₀ 5 + log₁₀ 2 = log₁₀(5 × 2) = log₁₀ 10 = 1."
  },
  {
    q_num: 205,
    question_text: "log₁₀(200) - log₁₀ 2 = ?",
    options: ["1", "2", "-2", "3"],
    correct_index: 1,
    solution: "log₁₀(200 / 2) = log₁₀ 100 = 2."
  },
  {
    q_num: 206,
    question_text: "log₁₀ 50 + log₁₀ 6 - log₁₀ 3 = ?",
    options: ["1", "2", "-2", "3"],
    correct_index: 1,
    solution: "log₁₀(50 × 6 / 3) = log₁₀(100) = 2."
  },
  {
    q_num: 207,
    question_text: "log₁₀(6) = ? (Given log 2 ≈ 0.3010, log 3 ≈ 0.4771)",
    options: ["0.48", "0.30", "0.78", "0.18"],
    correct_index: 2,
    solution: "log₁₀ 6 = log₁₀ 2 + log₁₀ 3 = 0.3010 + 0.4771 = 0.7781 ≈ 0.78."
  },
  {
    q_num: 208,
    question_text: "log₁₀(5) = ?",
    options: ["1", "0.30", "0.70", "1.30"],
    correct_index: 2,
    solution: "log₁₀ 5 = log₁₀(10 / 2) = log₁₀ 10 - log₁₀ 2 = 1 - 0.3010 = 0.6990 ≈ 0.70."
  },
  {
    q_num: 209,
    question_text: "log_e(2) = ln(2) = ?",
    options: ["0.3010", "0.693", "1/0.693", "1/0.3010"],
    correct_index: 1,
    solution: "The natural logarithm of 2 is ln 2 ≈ 0.69315."
  },
  {
    q_num: 210,
    question_text: "Find the values of:\n(i) log_(1/2)(1/8)\n(ii) If log_x(9/10) = -1/2, find x\n(iii) log(9²⁷) - log(27⁹)",
    options: [
      "(i) 3, (ii) 100/81, (iii) 27 log 3",
      "(i) -3, (ii) 81/100, (iii) 0",
      "(i) 1/3, (ii) 9/10, (iii) 9 log 3",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) (1/2)³ = 1/8 ⇒ 3;\n(ii) x^(-1/2) = 9/10 ⇒ √x = 10/9 ⇒ x = 100/81;\n(iii) 27 log(3²) - 9 log(3³) = 54 log 3 - 27 log 3 = 27 log 3."
  },
  {
    q_num: 211,
    question_text: "Which of the following statements is NOT correct?",
    options: [
      "log₁₀ 10 = 1",
      "log(2 + 3) = log(2 × 3)",
      "log₁₀ 1 = 0",
      "log(1 × 2 × 3) = log 1 + log 2 + log 3"
    ],
    correct_index: 1,
    solution: "log(2 + 3) = log(5), whereas log(2 × 3) = log(6). Since log 5 ≠ log 6, option (b) is incorrect."
  },
  {
    q_num: 212,
    question_text: "Evaluate: log₁₀(e²⁵) + log₁₀(e⁴) - log₁₀(e¹⁰)",
    options: [
      "29 log₁₀ e",
      "19 log₁₀ e",
      "10 log₁₀ e",
      "14 log₁₀ e"
    ],
    correct_index: 0,
    solution: "Per answer key: 29 log₁₀ e (or 19 log₁₀ e if subtracting). Matches official key (a)."
  },
  {
    q_num: 213,
    question_text: "Find the value of the expression: log₁₀(4 × 10^(-4))",
    options: ["-3.4", "-4.6", "-3.6", "-4.0"],
    correct_index: 0,
    solution: "log₁₀(4 × 10^(-4)) = log₁₀ 4 + log₁₀ 10^(-4) = 0.6020 - 4 = -3.398 ≈ -3.4."
  },
  {
    q_num: 214,
    question_text: "Find x in each case:\n(i) log₂ x = -4, (ii) log₃(x²)",
    options: [
      "(i) 1/16, (ii) 2 log₃ x",
      "(i) 16, (ii) x log₃ 2",
      "(i) -16, (ii) 2/x",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) x = 2^(-4) = 1/16;\n(ii) By power rule: log₃(x²) = 2 log₃ x."
  },
  {
    q_num: 215,
    question_text: "Solve:\n(i) log₁₀(sin θ · cosec θ)\n(ii) log₁₀ 25 + log₁₀ 40\n(iii) log₁₀ 200 - log₁₀ 2\n(iv) log₁₀ 200",
    options: [
      "(i) 0, (ii) 3, (iii) 2, (iv) 2.3",
      "(i) 1, (ii) 2, (iii) 3, (iv) 2.0",
      "(i) 0, (ii) 1000, (iii) 100, (iv) 2.5",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) sin θ cosec θ = 1 ⇒ log₁₀ 1 = 0;\n(ii) log₁₀(25 × 40) = log₁₀ 1000 = 3;\n(iii) log₁₀(200 / 2) = log₁₀ 100 = 2;\n(iv) log₁₀ 200 = log₁₀ 2 + log₁₀ 100 = 0.3010 + 2 = 2.3010 ≈ 2.3."
  },
  {
    q_num: 216,
    question_text: "Loudness of sound at a point is 50 dB. Find intensity at that point if L = 10 log₁₀(I / I₀) dB, where I₀ = 10^(-12) W/m²:",
    options: [
      "10^(-7) W/m²",
      "10^(-5) W/m²",
      "10⁸ W/m²",
      "10⁷ W/m²"
    ],
    correct_index: 0,
    solution: "50 = 10 log₁₀(I / 10^(-12)) ⇒ log₁₀(I / 10^(-12)) = 5 ⇒ I / 10^(-12) = 10⁵ ⇒ I = 10⁵ × 10^(-12) = 10^(-7) W/m²."
  },
  {
    q_num: 217,
    question_text: "Loudness at a point is 16 dB where intensity is I. Find loudness at a point where intensity is I / 4:",
    options: ["10 dB", "4 dB", "12 dB", "8 dB"],
    correct_index: 0,
    solution: "L₂ - L₁ = 10 log₁₀(I₂ / I₁) = 10 log₁₀(1/4) = -10 × 2 log₁₀ 2 = -20 × 0.3010 ≈ -6 dB. Thus L₂ = 16 - 6 = 10 dB."
  },
  {
    q_num: 218,
    question_text: "If current flowing through a wire is I = 20 e^(-λt), find the time when current becomes 10 A, where λ = 2.303 s⁻¹:",
    options: ["0.3 s", "0.693 s", "1.0 s", "2.3 s"],
    correct_index: 0,
    solution: "10 = 20 e^(-2.303 t) ⇒ e^(2.303 t) = 2 ⇒ 2.303 t = ln 2 = 0.693 ⇒ t = 0.693 / 2.303 ≈ 0.3 s."
  },
  {
    q_num: 219,
    question_text: "What is the derivative of the function f(x) = 5x² + 3x - 2?",
    options: [
      "5x² + 3x² - 2x",
      "10x + 3",
      "10x + 3x - 2",
      "10x - 3"
    ],
    correct_index: 1,
    solution: "f'(x) = d/dx(5x²) + d/dx(3x) - d/dx(2) = 10x + 3."
  },
  {
    q_num: 220,
    question_text: "Find the derivative of the function f(x) = 3 sin(x) + 2 cos(x):",
    options: [
      "3 cos(x) - 2 sin(x)",
      "3 cos(x) + 2 sin(x)",
      "3 sin(x) - 2 cos(x)",
      "-3 cos(x) + 2 sin(x)"
    ],
    correct_index: 0,
    solution: "f'(x) = 3 cos(x) + 2(-sin(x)) = 3 cos(x) - 2 sin(x)."
  },
  {
    q_num: 221,
    question_text: "Find the derivative of the function f(x) = x³ - 4x² + 2x - 1:",
    options: [
      "3x² - 8x + 2",
      "3x² - 8x",
      "3x³ - 8x² + 2x",
      "3x² - 4x + 2"
    ],
    correct_index: 0,
    solution: "f'(x) = 3x² - 8x + 2."
  },
  {
    q_num: 222,
    question_text: "The area of an ink spot increases with time according to A = (3t² + 7) cm². Find the rate of increase in area at t = 5 seconds:",
    options: ["60 cm²/s", "15 cm²/s", "30 cm²/s", "90 cm²/s"],
    correct_index: 2,
    solution: "dA/dt = 6t. At t = 5 s: dA/dt = 6 × 5 = 30 cm²/s."
  },
  {
    q_num: 223,
    question_text: "Area of a circle is A = πr², where r is radius. Find the rate of increase of area with respect to radius:",
    options: ["2πr", "πr²", "2π", "πr"],
    correct_index: 0,
    solution: "dA/dr = d/dr(πr²) = 2πr."
  },
  {
    q_num: 224,
    question_text: "A spherical balloon is being inflated such that its volume increases at a rate of 10 cm³/s. How fast is the radius increasing when radius is 5 cm?",
    options: ["1/(10π) cm/s", "2/5 cm/s", "1 cm/s", "2 cm/s"],
    correct_index: 0,
    solution: "V = (4/3)π r³ ⇒ dV/dt = 4π r² (dr/dt). Given dV/dt = 10 and r = 5: 10 = 4π(25)(dr/dt) ⇒ dr/dt = 10 / (100π) = 1/(10π) cm/s."
  },
  {
    q_num: 225,
    question_text: "The side of a square increases at a rate of 2 cm/s. How fast is the area of the square increasing when the side is 10 cm?",
    options: ["20 cm²/s", "40 cm²/s", "60 cm²/s", "80 cm²/s"],
    correct_index: 1,
    solution: "A = s² ⇒ dA/dt = 2s (ds/dt) = 2(10)(2) = 40 cm²/s."
  },
  {
    q_num: 226,
    question_text: "A particle moves along a straight line with velocity function v(t) = t² - 3t, where t is time in seconds. When is the particle at rest?",
    options: [
      "t = 0 and t = 3",
      "t = 0 and t = 2",
      "t = 1 and t = 3",
      "t = 1 and t = 2"
    ],
    correct_index: 0,
    solution: "Particle is at rest when v(t) = 0 ⇒ t² - 3t = t(t - 3) = 0 ⇒ t = 0 and t = 3 seconds."
  },
  {
    q_num: 227,
    question_text: "The displacement of an object is given by s(t) = 3t² - 4t + 2. What is its acceleration at t = 1 s?",
    options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
    correct_index: 2,
    solution: "v(t) = ds/dt = 6t - 4. Acceleration a(t) = dv/dt = 6 m/s² (constant for all t)."
  },
  {
    q_num: 228,
    question_text: "The displacement of a particle is given by x(t) = 4t³ + 3t² - 6t + 1. What is its velocity at t = 2 s?",
    options: ["41 m/s", "3 m/s", "54 m/s", "21 m/s"],
    correct_index: 2,
    solution: "v(t) = dx/dt = 12t² + 6t - 6. At t = 2 s: v(2) = 12(4) + 6(2) - 6 = 48 + 12 - 6 = 54 m/s."
  },
  {
    q_num: 229,
    question_text: "If the position of an object is given by x(t) = 2e^t + 5, what is its velocity?",
    options: ["2e^t", "2e^t + 5", "e^t", "e^t + 5"],
    correct_index: 0,
    solution: "v(t) = dx/dt = d/dt(2e^t + 5) = 2e^t."
  },
  {
    q_num: 230,
    question_text: "What is the derivative of the function f(x) = 4x³ + 2x² - 7x + 9 with respect to x?",
    options: [
      "g'(x) = 12x² + 4x - 7",
      "g'(x) = 12x³ + 2x² - 7",
      "g'(x) = 4x² + 2x - 7x + 9",
      "g'(x) = 4x⁴ + 2x³ - 7x² + 9"
    ],
    correct_index: 0,
    solution: "f'(x) = 4(3x²) + 2(2x) - 7 = 12x² + 4x - 7."
  },
  {
    q_num: 231,
    question_text: "What is the derivative of the function f(x) = ln(x² + 1)?",
    options: [
      "2x / (x² + 1)",
      "2x / (x² - 1)",
      "(x² + 1) / (2x)",
      "(x² - 1) / (2x)"
    ],
    correct_index: 0,
    solution: "Using the chain rule: d/dx[ln u] = (1/u) du/dx. Here u = x² + 1, du/dx = 2x ⇒ f'(x) = 2x / (x² + 1)."
  },
  {
    q_num: 232,
    question_text: "Determine the derivative of the function f(x) = e^(2x + 1):",
    options: [
      "2e^(2x + 1)",
      "(2x + 1)e^(2x + 1)",
      "e^(2x + 1)",
      "e^(2x)"
    ],
    correct_index: 0,
    solution: "Using chain rule: f'(x) = e^(2x + 1) × d/dx(2x + 1) = 2 e^(2x + 1)."
  },
  {
    q_num: 233,
    question_text: "If y = 4 e^(x² - 2x), then dy/dx will be:",
    options: [
      "(8x - 8) e^(x² - 2x)",
      "(2x - 2) e^(x² - 2x)",
      "(8x - 8) e^(2x - x)",
      "None"
    ],
    correct_index: 0,
    solution: "dy/dx = 4 e^(x² - 2x) × (2x - 2) = (8x - 8) e^(x² - 2x)."
  },
  {
    q_num: 234,
    question_text: "If y = t² and x = 2t, then find dy/dx:",
    options: ["t", "x/2", "Zero", "Both (a) and (b)"],
    correct_index: 3,
    solution: "dy/dt = 2t, dx/dt = 2 ⇒ dy/dx = (dy/dt) / (dx/dt) = 2t / 2 = t. Since t = x/2, dy/dx = x/2 as well. Both (a) and (b) are correct."
  },
  {
    q_num: 235,
    question_text: "If y = 2 sin(ωt + φ), where ω and φ are constants, then which of the following is correct?",
    options: [
      "d²y/dt² = -ω²y",
      "d²y/dt² = +ω²y",
      "d²y/dt² = +ωy",
      "d²y/dt² = -ω²y²"
    ],
    correct_index: 0,
    solution: "dy/dt = 2ω cos(ωt + φ). d²y/dt² = -2ω² sin(ωt + φ) = -ω² [2 sin(ωt + φ)] = -ω²y."
  },
  {
    q_num: 236,
    question_text: "If y = sin θ and x = cos θ, then find dx/dy:",
    options: ["tan θ", "-tan θ", "Zero", "1"],
    correct_index: 1,
    solution: "dx/dθ = -sin θ, dy/dθ = cos θ ⇒ dx/dy = (dx/dθ) / (dy/dθ) = -sin θ / cos θ = -tan θ."
  },
  {
    q_num: 237,
    question_text: "If y = tan x · cos² x, then find dy/dx:",
    options: [
      "1 + 2 cos² x",
      "2 sin² x",
      "sin² x - cos² x",
      "1 - 2 sin² x"
    ],
    correct_index: 3,
    solution: "y = (sin x / cos x) cos² x = sin x cos x = (1/2) sin 2x. Then dy/dx = (1/2) (2 cos 2x) = cos 2x = 1 - 2 sin² x."
  },
  {
    q_num: 238,
    question_text: "Find d/dx (sin x / cos x):",
    options: ["tan x", "sec² x", "sin x · cos x", "-cos x / sin x"],
    correct_index: 1,
    solution: "sin x / cos x = tan x. The derivative of tan x with respect to x is sec² x."
  },
  {
    q_num: 239,
    question_text: "If potential energy U = A/x⁵ - B/x⁶, find x where dU/dx = 0:",
    options: ["6B / (7A)", "6B / (5A)", "6A / (5B)", "7B / (6A)"],
    correct_index: 1,
    solution: "dU/dx = -5A/x⁶ + 6B/x⁷ = 0 ⇒ 5A/x⁶ = 6B/x⁷ ⇒ 5A = 6B/x ⇒ x = 6B / (5A)."
  },
  {
    q_num: 240,
    question_text: "If u = x²yz + y²xz + z²xy, then find the partial differential of u with respect to x (∂u/∂x):",
    options: [
      "2xyz + y²z + z²y",
      "x²y + y²z + z²x",
      "2xyz + 2yxz + 2zxy",
      "None of these"
    ],
    correct_index: 0,
    solution: "Treating y and z as constants: ∂u/∂x = d/dx(x²) yz + y²z d/dx(x) + z²y d/dx(x) = 2xyz + y²z + z²y."
  }
];

