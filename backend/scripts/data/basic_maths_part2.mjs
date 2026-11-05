// Physics: Basic Maths & Calculus - Part 2 (Q81 to Q160)

export const BASIC_MATHS_PART2 = [
  {
    q_num: 81,
    question_text: "Find the approximate small-angle values of:\n(i) sin(2°), (ii) tan(3°), (iii) cos(3°), (iv) sin(88.5°)",
    options: [
      "(i) π/90, (ii) π/60, (iii) 1, (iv) 1",
      "(i) π/45, (ii) π/30, (iii) 0, (iv) 0",
      "(i) 2, (ii) 3, (iii) 1, (iv) 0.5",
      "None of these"
    ],
    correct_index: 0,
    solution: "For small angle θ in radians:\nsin θ ≈ θ ⇒ sin(2°) ≈ 2 × (π/180) = π/90;\ntan θ ≈ θ ⇒ tan(3°) ≈ 3 × (π/180) = π/60;\ncos(3°) ≈ 1;\nsin(88.5°) = cos(1.5°) ≈ 1."
  },
  {
    q_num: 82,
    question_text: "Which of the following is correct for the value of tan(2°)?",
    options: ["2°", "π/90", "π/30", "2 rad"],
    correct_index: 1,
    solution: "For small angle, tan θ ≈ θ in radians = 2 × (π/180) = π/90."
  },
  {
    q_num: 83,
    question_text: "State the standard trigonometric expansion formulas:\n(i) sin(A + B), (ii) sin(A - B), (iii) cos(A + B), (iv) cos(A - B), (v) tan(A + B)",
    options: [
      "(i) sin A cos B + cos A sin B, (ii) sin A cos B - cos A sin B, (iii) cos A cos B - sin A sin B, (iv) cos A cos B + sin A sin B, (v) (tan A + tan B)/(1 - tan A tan B)",
      "(i) sin A + sin B, (ii) sin A - sin B, (iii) cos A + cos B, (iv) cos A - cos B, (v) tan A + tan B",
      "(i) cos A cos B, (ii) sin A sin B, (iii) cos A sin B, (iv) sin A cos B, (v) 1 / (tan A tan B)",
      "None of these"
    ],
    correct_index: 0,
    solution: "Standard compound angle identities:\nsin(A ± B) = sin A cos B ± cos A sin B;\ncos(A ± B) = cos A cos B ∓ sin A sin B;\ntan(A + B) = (tan A + tan B) / (1 - tan A tan B)."
  },
  {
    q_num: 84,
    question_text: "The value of sin θ · cos θ will be equal to half the value of sin(2θ):",
    options: ["True", "False"],
    correct_index: 0,
    solution: "Since sin(2θ) = 2 sin θ cos θ, dividing by 2 gives sin θ cos θ = (1/2) sin(2θ). Hence True."
  },
  {
    q_num: 85,
    question_text: "Find the exact values of:\n(i) sin(75°), (ii) sin(105°), (iii) cos(120°)",
    options: [
      "(i) (√3 + 1)/(2√2), (ii) (√3 + 1)/(2√2), (iii) -1/2",
      "(i) (√3 - 1)/(2√2), (ii) (√3 - 1)/(2√2), (iii) 1/2",
      "(i) √3/2, (ii) 1/2, (iii) -√3/2",
      "None of these"
    ],
    correct_index: 0,
    solution: "sin(75°) = sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30° = (√3 + 1)/(2√2);\nsin(105°) = sin(180° - 75°) = sin 75° = (√3 + 1)/(2√2);\ncos(120°) = cos(180° - 60°) = -cos 60° = -1/2."
  },
  {
    q_num: 86,
    question_text: "Evaluate the following trigonometric values:\n(i) sin(-30°), (ii) cos(-60°), (iii) sin(120°), (iv) sin(390°), (v) sin(360°), (vi) sin(450°), (vii) sin(-90°), (viii) sin(-150°), (ix) cos(300°), (x) cos(330°), (xi) tan(240°), (xii) cos(-30°), (xiii) tan(-60°), (xiv) cot(-45°)",
    options: [
      "(i) -1/2, (ii) 1/2, (iii) √3/2, (iv) 1/2, (v) 0, (vi) 1, (vii) -1, (viii) -1/2, (ix) 1/2, (x) √3/2, (xi) √3, (xii) √3/2, (xiii) -√3, (xiv) -1",
      "(i) 1/2, (ii) -1/2, (iii) -√3/2, (iv) -1/2, (v) 1, (vi) 0, (vii) 1, (viii) 1/2, (ix) -1/2, (x) -√3/2, (xi) -√3, (xii) -√3/2, (xiii) √3, (xiv) 1",
      "(i) 0, (ii) 1, (iii) 1, (iv) 0, (v) 0, (vi) -1, (vii) 0, (viii) 0, (ix) 1, (x) 0, (xi) 1, (xii) 0, (xiii) 0, (xiv) 0",
      "None of these"
    ],
    correct_index: 0,
    solution: "sin(-30°) = -1/2; cos(-60°) = 1/2; sin(120°) = √3/2; sin(390°) = 1/2; sin(360°) = 0; sin(450°) = 1; sin(-90°) = -1; sin(-150°) = -1/2; cos(300°) = 1/2; cos(330°) = √3/2; tan(240°) = √3; cos(-30°) = √3/2; tan(-60°) = -√3; cot(-45°) = -1."
  },
  {
    q_num: 87,
    question_text: "If y = A sin θ + B cos θ, then find the maximum value of y:",
    options: ["√(A² + B²)", "A + B", "A² + B²", "|A - B|"],
    correct_index: 0,
    solution: "The expression y = A sin θ + B cos θ can be rewritten as √(A² + B²) sin(θ + φ). Its maximum value is √(A² + B²)."
  },
  {
    q_num: 88,
    question_text: "If y = 3 cos θ + 4 cos θ, then find the maximum value of y:",
    options: ["7", "5", "1", "12"],
    correct_index: 0,
    solution: "y = (3 + 4) cos θ = 7 cos θ. Since maximum value of cos θ is 1, y_max = 7 × 1 = 7."
  },
  {
    q_num: 89,
    question_text: "Find the maximum and minimum values of the following trigonometric functions:\n(i) Y = 3 sin(2θ)\n(ii) Y = 3 sin θ + 4 cos θ\n(iii) Y = 5 sin θ + 4 cos θ\n(iv) Y = 5 - 3 sin(2θ)",
    options: [
      "(i) Max: 3, Min: -3; (ii) Max: 5, Min: -5; (iii) Max: 6.4, Min: -6.4; (iv) Max: 8, Min: 2",
      "(i) Max: 6, Min: -6; (ii) Max: 7, Min: -7; (iii) Max: 9, Min: -9; (iv) Max: 5, Min: -3",
      "(i) Max: 3, Min: 0; (ii) Max: 5, Min: 0; (iii) Max: 6.4, Min: 0; (iv) Max: 8, Min: 5",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) Amplitude = 3 ⇒ Max = 3, Min = -3;\n(ii) √(3² + 4²) = 5 ⇒ Max = 5, Min = -5;\n(iii) √(5² + 4²) = √41 ≈ 6.4 ⇒ Max = 6.4, Min = -6.4;\n(iv) 5 - 3(-1) = 8 (Max), 5 - 3(1) = 2 (Min)."
  },
  {
    q_num: 90,
    question_text: "Match the following trigonometric functions with their corresponding maximum and minimum values:\n(i) y = 3 sin θ + 4 sin θ\n(ii) y = 4 sin(5θ)\n(iii) y = 5 - 2 sin θ\n(iv) y = 6 sin θ + 8 cos θ\nValues:\n(A) y_max = +7, y_min = +3\n(B) y_max = +7, y_min = -7\n(C) y_max = +4, y_min = -4\n(D) y_max = +10, y_min = -10",
    options: [
      "(i) - B, (ii) - C, (iii) - A, (iv) - D",
      "(i) - A, (ii) - B, (iii) - C, (iv) - D",
      "(i) - C, (ii) - D, (iii) - A, (iv) - B",
      "(i) - B, (ii) - A, (iii) - D, (iv) - C"
    ],
    correct_index: 0,
    solution: "(i) y = 7 sin θ ⇒ Max = 7, Min = -7 (B);\n(ii) y = 4 sin(5θ) ⇒ Max = 4, Min = -4 (C);\n(iii) y = 5 - 2 sin θ ⇒ Max = 5 - 2(-1) = 7, Min = 5 - 2(1) = 3 (A);\n(iv) y = 6 sin θ + 8 cos θ ⇒ Max = √(36+64) = 10, Min = -10 (D)."
  },
  {
    q_num: 91,
    question_text: "If y = 3 cos(3θ), then find the smallest positive angle θ at which y will be zero:",
    options: ["30°", "60°", "90°", "45°"],
    correct_index: 0,
    solution: "cos(3θ) = 0 ⇒ 3θ = 90° ⇒ θ = 30°."
  },
  {
    q_num: 92,
    question_text: "From the given figure, find angles α and β:",
    options: [
      "α = 30°, β = 60°",
      "α = 60°, β = 30°",
      "α = 45°, β = 45°",
      "α = 90°, β = 0°"
    ],
    correct_index: 0,
    solution: "By alternate interior angles between the parallel lines, α = 30° and β = 60°."
  },
  {
    q_num: 93,
    question_text: "From the given circle geometry with radius R, center O, and tangent, find the relation between θ and α:",
    options: ["α = 90° - θ", "α = 90°", "α = θ", "α = 90° + θ"],
    correct_index: 2,
    solution: "The normal (radius) is perpendicular to the tangent (angle = 90°). Analyzing complementary angles at the point of tangency yields α = θ."
  },
  {
    q_num: 94,
    question_text: "In the right triangle shown with vertical side 3 and horizontal side 4, find the angle between the hypotenuse and the horizontal x-axis:",
    options: ["37°", "53°", "45°", "30°"],
    correct_index: 0,
    solution: "tan θ = Opposite / Adjacent = 3/4 = 0.75 ⇒ θ = 37°."
  },
  {
    q_num: 95,
    question_text: "Find the phase difference between wave A and B in each case:\n(i) A = 4 sin(θ + π/4), B = 3 sin(θ - π/4)\n(ii) A = 4 sin(θ + π/3), B = 3 sin(θ + π/6)\n(iii) A = 3 cos(ωt + π/2), B = 3 sin(ωt)\n(iv) A = 3 sin(ωt), B = 3 cos(ωt - π/2)",
    options: [
      "(i) Δφ = π/2, (ii) Δφ = π/6, (iii) Δφ = π, (iv) Δφ = 0",
      "(i) Δφ = π/4, (ii) Δφ = π/3, (iii) Δφ = π/2, (iv) Δφ = π",
      "(i) Δφ = 0, (ii) Δφ = π/2, (iii) Δφ = 0, (iv) Δφ = π/2",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) Δφ = (θ + π/4) - (θ - π/4) = π/2;\n(ii) Δφ = (θ + π/3) - (θ + π/6) = π/6;\n(iii) A = 3 sin(ωt + π/2 + π/2) = 3 sin(ωt + π) ⇒ Δφ = π;\n(iv) B = 3 sin(ωt - π/2 + π/2) = 3 sin(ωt) ⇒ Δφ = 0."
  },
  {
    q_num: 96,
    question_text: "Find the phase differences and resultant amplitudes for the given pairs of AC/oscillation equations:\nI₁ = I₀ sin(θ + π/3), I₂ = I₀ sin(θ - π/6)...",
    options: [
      "Phase differences: 90°, 90°, 120°, 0°, 90°, 60°, 120°",
      "Phase differences: 45°, 45°, 60°, 0°, 45°, 30°, 60°",
      "Phase differences: 0°, 90°, 180°, 0°, 90°, 180°, 0°",
      "None of these"
    ],
    correct_index: 0,
    solution: "Evaluating each pair:\n(1) (θ + 60°) - (θ - 30°) = 90°;\n(2) sin to cos conversion gives 90°;\n(3) sin(ωt) and cos(ωt + π/6) gives 120°;\n(4) 0°;\n(5) 90°;\n(6) 60°;\n(7) 120°."
  },
  {
    q_num: 97,
    question_text: "Equation of AC current is I = -I₀ cos(ωt) and voltage is V = V₀ sin(ωt - π/6). The phase difference between current and voltage is:",
    options: ["2π/3", "π/3", "π/6", "5π/6"],
    correct_index: 1,
    solution: "I = -I₀ cos(ωt) = I₀ sin(ωt - π/2) or I₀ sin(ωt + 3π/2). Comparing with V = V₀ sin(ωt - π/6), the phase difference is |(-π/6) - (-π/2)| = π/3."
  },
  {
    q_num: 98,
    question_text: "In an AC circuit, current is I = I₀ sin(ωt - 30°) and voltage is V = V₀ cos(ωt). The phase difference between them is:",
    options: ["120°", "90°", "60°", "30°"],
    correct_index: 0,
    solution: "V = V₀ cos(ωt) = V₀ sin(ωt + 90°). Phase difference Δφ = 90° - (-30°) = 120°."
  },
  {
    q_num: 99,
    question_text: "Two oscillatory particles have motions x₁ = 4 sin(ωt) and x₂ = 3 cos(ωt). Find the equation of the superimposed SHM:",
    options: [
      "x = 5 sin(ωt + 37°)",
      "x = 7 sin(ωt)",
      "x = 5 sin(ωt + 53°)",
      "x = sin(ωt + 37°)"
    ],
    correct_index: 0,
    solution: "x = 4 sin(ωt) + 3 cos(ωt) = √(4² + 3²) sin(ωt + tan^(-1)(3/4)) = 5 sin(ωt + 37°)."
  },
  {
    q_num: 100,
    question_text: "If current I = 10 sin(θ + π/3) and voltage V = 10 cos(θ - π/6), then the phase difference between current and voltage is:",
    options: ["0", "π/2", "π/3", "π/6"],
    correct_index: 0,
    solution: "cos(θ - π/6) = sin((θ - π/6) + π/2) = sin(θ + π/3). Since both waves have phase (θ + π/3), phase difference Δφ = 0."
  },
  {
    q_num: 101,
    question_text: "If y₁ = 2 sin(5πt) and y₂ = 2 cos(5πt - π/3), what is the phase difference between the two waveforms?",
    options: ["π/6", "π/3", "π/2", "5π/6"],
    correct_index: 0,
    solution: "y₂ = 2 sin((5πt - π/3) + π/2) = 2 sin(5πt + π/6). Phase difference Δφ = π/6 - 0 = π/6."
  },
  {
    q_num: 102,
    question_text: "Two waves are represented by y₁ = 4 sin(3t) and y₂ = 4 sin(3t + π/2). Determine the phase difference between the two waves:",
    options: ["π/2", "π", "π/4", "0"],
    correct_index: 0,
    solution: "Δφ = (3t + π/2) - (3t) = π/2."
  },
  {
    q_num: 103,
    question_text: "The equations of two waves are y₁ = 3 sin(4πt) and y₂ = 3 cos(4πt + π/3). Determine the phase difference between the two waves:",
    options: ["5π/6", "π/6", "π/3", "2π/3"],
    correct_index: 0,
    solution: "y₂ = 3 sin(4πt + π/3 + π/2) = 3 sin(4πt + 5π/6). Phase difference Δφ = 5π/6."
  },
  {
    q_num: 104,
    question_text: "If y₁ = 4 sin(ωt - π/6) and y₂ = 4 sin(ωt + π/6), what is the phase difference between the two waveforms?",
    options: ["π/3", "π/6", "2π/3", "0"],
    correct_index: 0,
    solution: "Δφ = (ωt + π/6) - (ωt - π/6) = 2π/6 = π/3."
  },
  {
    q_num: 105,
    question_text: "Which of the following series is/are NOT arithmetic progression(s)?\n(a) 2, 8, 15, 21, 27...\n(b) 3, 6, 12, 24...\n(c) 4, 1, -2, -5, -8...\n(d) -5, -3, -1, 1...",
    options: [
      "Both (a) and (b)",
      "(a) only",
      "(b) only",
      "(c) and (d)"
    ],
    correct_index: 0,
    solution: "(a) Differences are 6, 7, 6, 6 (not constant, not AP). (b) is a GP with common ratio 2 (not AP). (c) and (d) have constant differences (-3 and +2) hence are APs."
  },
  {
    q_num: 106,
    question_text: "Find the 10th term and sum of the first 10 terms of the AP: 7, 11, 15, 19...",
    options: [
      "10th term = 43, sum = 250",
      "10th term = 47, sum = 270",
      "10th term = 40, sum = 235",
      "10th term = 43, sum = 215"
    ],
    correct_index: 0,
    solution: "a = 7, d = 4. T₁₀ = a + 9d = 7 + 36 = 43. S₁₀ = (10/2) × (a + T₁₀) = 5 × (7 + 43) = 5 × 50 = 250."
  },
  {
    q_num: 107,
    question_text: "Sum of first n natural numbers 1 + 2 + 3 + ... + n is:",
    options: ["n² / 2", "n(n + 1) / 2", "n(n - 1) / 2", "n²(n + 1) / 6"],
    correct_index: 1,
    solution: "S_n = n(n + 1) / 2."
  },
  {
    q_num: 108,
    question_text: "Which term of the AP 27, 24, 21... is zero?",
    options: ["10th term", "9th term", "11th term", "8th term"],
    correct_index: 0,
    solution: "a = 27, d = -3. T_n = a + (n - 1)d = 0 ⇒ 27 - 3(n - 1) = 0 ⇒ n - 1 = 9 ⇒ n = 10."
  },
  {
    q_num: 109,
    question_text: "If 28, 22, x, y, 4 are in AP, then the values of x and y are:",
    options: [
      "x = 16, y = 10",
      "x = 18, y = 12",
      "x = 14, y = 8",
      "x = 15, y = 9"
    ],
    correct_index: 0,
    solution: "Common difference d = 22 - 28 = -6. Then x = 22 - 6 = 16, and y = 16 - 6 = 10. Check: 10 - 6 = 4."
  },
  {
    q_num: 110,
    question_text: "25 tuning forks are arranged in increasing order of frequency. The frequency difference between any two successive forks is 10 Hz. If the frequency of the 25th fork is 400 Hz, find the frequency of the 1st tuning fork:",
    options: ["160 Hz", "150 Hz", "200 Hz", "140 Hz"],
    correct_index: 0,
    solution: "f₂₅ = f₁ + 24 × d ⇒ 400 = f₁ + 24 × 10 ⇒ 400 = f₁ + 240 ⇒ f₁ = 160 Hz."
  },
  {
    q_num: 111,
    question_type: "assertion_reason",
    assertion_text: "Geometric progression is a type of sequence where each successive term is produced by multiplying each preceding term by common ratio.",
    reason_text: "Sum of G.P. Series is given by (1st term) / (1 - C.R.) for any value of C.R. [Common Ratio].",
    question_text: "Assertion (A): Geometric progression is a type of sequence where each successive term is produced by multiplying each preceding term by common ratio.\nReason (R): Sum of G.P. Series is given by (1st term) / (1 - C.R.) for any value of C.R. [Common Ratio].",
    options: [
      "A is false but R is true",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "Both A and R are true and R is the correct explanation of A"
    ],
    correct_index: 2,
    solution: "Assertion is true by definition of GP. Reason is false because the sum formula S_∞ = a / (1 - r) is valid ONLY when |r| < 1 (convergent GP)."
  },
  {
    q_num: 112,
    question_text: "Find the electric potential at origin due to an infinite series of charges +q, -q, +q, -q... placed along x-axis at (1, 0), (2, 0), (4, 0), (8, 0)...:",
    options: ["(2/3) kq", "(1/3) kq", "(4/3) kq", "2 kq"],
    correct_index: 0,
    solution: "V = kq(1/1 - 1/2 + 1/4 - 1/8 + ...) = kq / (1 - (-1/2)) = kq / (3/2) = (2/3) kq."
  },
  {
    q_num: 113,
    question_text: "5 resistors are connected in series; each resistor is half the resistance of the previous one. If the 1st resistance is 10 Ω, then the value of the 5th resistor is:",
    options: ["5/8 Ω", "5/4 Ω", "5/16 Ω", "1/2 Ω"],
    correct_index: 0,
    solution: "R₁ = 10 Ω, R₂ = 5 Ω, R₃ = 2.5 Ω, R₄ = 1.25 Ω, R₅ = 1.25 / 2 = 0.625 Ω = 5/8 Ω."
  },
  {
    q_num: 114,
    question_text: "Charges q are placed on the x-axis at coordinates (1, 0), (2, 0), (4, 0), (8, 0)... Find the total electrostatic force on a test charge q₀ placed at the origin:",
    options: ["(4/3) k q q₀", "(2/3) k q q₀", "2 k q q₀", "(4/5) k q q₀"],
    correct_index: 0,
    solution: "F = k q q₀ (1/1² + 1/2² + 1/4² + 1/8² + ...) = k q q₀ (1 + 1/4 + 1/16 + 1/64 + ...) = k q q₀ / (1 - 1/4) = (4/3) k q q₀."
  },
  {
    q_num: 115,
    question_text: "The x-y equation for the straight line graph shown passing through origin at angle 53° to the x-axis is:",
    options: ["y = (4/3) x", "y = (4/3) x - 4", "y = (5/3) x", "y = (4/5) x"],
    correct_index: 0,
    solution: "Slope m = tan 53° = 4/3. Since it passes through the origin (c = 0), y = (4/3) x."
  },
  {
    q_num: 116,
    question_text: "The x-y equation for the straight line shown passing through P₁(2, 7) and P₂(6, 15) with y-intercept 3 is:",
    options: ["y = x + 3", "y = 2x + 3", "y = 2x - 3", "y = 2x"],
    correct_index: 1,
    solution: "Slope m = (15 - 7) / (6 - 2) = 8 / 4 = 2. With y-intercept c = 3, equation is y = 2x + 3."
  },
  {
    q_num: 117,
    question_text: "The x-y equation for the straight line graph shown on the coordinate grid passing through (6, 0) and (0, -2) is:",
    options: ["x - 3y = 6", "2x - y = 12", "x - 3y = 12", "2x - 3y = 12"],
    correct_index: 0,
    solution: "Using intercept form: x/6 + y/(-2) = 1 ⇒ x - 3y = 6."
  },
  {
    q_num: 118,
    question_text: "The x-y equation for the straight line graph shown having intercepts -5 on x-axis and -3 on y-axis is:",
    options: [
      "3x - 5y = 15",
      "-3x - 5y = 15",
      "x - 5y = 15",
      "3x + 5y = 15"
    ],
    correct_index: 1,
    solution: "Intercept form: x/(-5) + y/(-3) = 1 ⇒ 3x + 5y = -15 ⇒ -3x - 5y = 15."
  },
  {
    q_num: 119,
    question_text: "A particle starts moving with initial velocity u = 25 m/s and constant retardation a = -2 m/s². Which velocity-time graph correctly depicts this motion?",
    options: ["Graph (a)", "Graph (b)", "Graph (c)", "Graph (d)"],
    correct_index: 0,
    solution: "Velocity v = u + at = 25 - 2t. At t = 0, v = 25 m/s. When v = 0, t = 25 / 2 = 12.5 s. This is a straight line from (0, 25) to (12.5, 0), represented by Graph (a)."
  },
  {
    q_num: 120,
    question_text: "Find the slope of the given linear equation 2x - 3y = 12:",
    options: ["3/2", "2/3", "4/3", "8/3"],
    correct_index: 1,
    solution: "Rewriting in slope-intercept form y = mx + c: 3y = 2x - 12 ⇒ y = (2/3)x - 4. Hence slope m = 2/3."
  },
  {
    q_num: 121,
    question_text: "Find the slope of the curve at peak point B:",
    options: ["+ve", "-ve", "Zero", "None"],
    correct_index: 2,
    solution: "At the highest point (peak) of a smooth curve, the tangent is completely horizontal, so the slope dy/dx = 0 (Zero)."
  },
  {
    q_num: 122,
    question_text: "Find the slope at point 'A' on the curve where the tangent line makes an angle of 150° with the positive x-axis:",
    options: ["-1/√3", "1/√3", "1", "Zero"],
    correct_index: 0,
    solution: "Slope m = tan(150°) = tan(180° - 30°) = -tan(30°) = -1/√3."
  },
  {
    q_num: 123,
    question_text: "Find the value of λ, such that 2 is the slope of the line passing through (2, 5) and (λ, 3):",
    options: ["λ = 2", "λ = 3", "λ = 1", "None"],
    correct_index: 2,
    solution: "Slope m = (3 - 5) / (λ - 2) = -2 / (λ - 2) = 2 ⇒ λ - 2 = -1 ⇒ λ = 1."
  },
  {
    q_num: 124,
    question_text: "Find the slope of the straight line passing through points (4, -6) and (-2, -5):",
    options: ["-1/5", "-1/6", "1/7", "1/8"],
    correct_index: 1,
    solution: "Slope m = (-5 - (-6)) / (-2 - 4) = 1 / (-6) = -1/6."
  },
  {
    q_num: 125,
    question_text: "What is the nature of graph for the equation y = 2x²?",
    options: ["Straight line", "Hyperbola", "Parabola", "Ellipse"],
    correct_index: 2,
    solution: "An equation of the form y = kx² represents a parabola opening upwards with vertex at the origin."
  },
  {
    q_num: 126,
    question_text: "What is the nature of graph for the equation y = -4x² + 6?",
    options: [
      "Parabola passing through origin",
      "Parabola not passing through origin",
      "Hyperbola",
      "Straight line"
    ],
    correct_index: 1,
    solution: "The quadratic form y = -4x² + 6 represents an inverted parabola with vertex at (0, 6), which does not pass through the origin."
  },
  {
    q_num: 127,
    question_text: "The nature of the graph for the equation y = 6 e^(-4x) is:",
    options: [
      "Exponentially decreasing graph",
      "Exponentially increasing graph",
      "Straight line",
      "None of these"
    ],
    correct_index: 0,
    solution: "Due to the negative exponent -4x, as x increases y approaches 0 asymptotically, representing an exponentially decreasing curve."
  },
  {
    q_num: 128,
    question_text: "The nature of the graph for the equation y = 4/x is:",
    options: [
      "Rectangular hyperbola",
      "Exponential",
      "Parabola",
      "Straight line"
    ],
    correct_index: 0,
    solution: "The equation xy = 4 (or y = k/x) represents a rectangular hyperbola."
  },
  {
    q_num: 129,
    question_text: "What is the radius of the circle (x + 2)² + (y - 3)² = 5²?",
    options: ["5", "+2", "3", "25"],
    correct_index: 0,
    solution: "Standard equation of a circle is (x - h)² + (y - k)² = r². Here r² = 5² ⇒ radius r = 5."
  },
  {
    q_num: 130,
    question_text: "In the above problem (x + 2)² + (y - 3)² = 5², what is the x-coordinate of the centre of the circle?",
    options: ["-2", "+2", "4", "-9"],
    correct_index: 0,
    solution: "(x - h) = (x + 2) ⇒ h = -2."
  },
  {
    q_num: 131,
    question_text: "In Q.129, what is the y-coordinate of the centre of the circle?",
    options: ["3", "-3", "9", "-9"],
    correct_index: 0,
    solution: "(y - k) = (y - 3) ⇒ k = 3."
  },
  {
    q_num: 132,
    question_text: "If the radius of a circle is 2 and its centre is at the origin, then the equation of the circle is:",
    options: [
      "x² + y² = 4",
      "x² + y² = -4",
      "(x - 2)² + (y - 2)² = 2²",
      "(x + 2)² + (y + 2)² = 2²"
    ],
    correct_index: 0,
    solution: "With center (0, 0) and r = 2: x² + y² = 2² = 4."
  },
  {
    q_num: 133,
    question_text: "A straight line passes through points (3, -2) and (7, -2). Its slope is:",
    options: ["1", "-1", "0", "None"],
    correct_index: 2,
    solution: "Slope m = (-2 - (-2)) / (7 - 3) = 0 / 4 = 0. The line is horizontal."
  },
  {
    q_num: 134,
    question_text: "The equation of the circle with centre (0, 2) and radius 2 is:",
    options: [
      "(x - 0)² + (y + 2)² = 2²",
      "(x - 0)² + (y - 2)² = 2²",
      "(x - 0)² + (y + 2)² = 2",
      "(x - 0)² + (y - 2)² = 2"
    ],
    correct_index: 1,
    solution: "Standard equation: (x - h)² + (y - k)² = r² ⇒ (x - 0)² + (y - 2)² = 2²."
  },
  {
    q_num: 135,
    question_text: "Magnetic field due to an infinitely long straight wire is B = (μ₀ / 4π) · (2I / r). Which graph correctly represents the variation of B with r?",
    options: ["Graph (a)", "Graph (b)", "Graph (c)", "Graph (d)"],
    correct_index: 0,
    solution: "Since B ∝ 1/r, the graph is a rectangular hyperbola in the first quadrant, as shown in Graph (a)."
  },
  {
    q_num: 136,
    question_text: "For a concave mirror forming a real image, the graph between 1/v and 1/u is of the form:",
    options: ["Graph (a)", "Graph (b)", "Graph (c)", "Graph (d)"],
    correct_index: 2,
    solution: "From mirror formula 1/v + 1/u = 1/f, 1/v = -(1/u) + 1/f. This represents a straight line with slope -1 and intercept 1/f, corresponding to Graph (c)."
  },
  {
    q_num: 137,
    question_text: "Which curve correctly represents the variation of capacitive reactance Xc with frequency f: Xc = 1 / (2π f C)?",
    options: ["Graph (a)", "Graph (b)", "Graph (c)", "Graph (d)"],
    correct_index: 1,
    solution: "Since Xc ∝ 1/f, the relationship is inversely proportional (rectangular hyperbola), represented by Graph (b)."
  },
  {
    q_num: 138,
    question_text: "Which of the following graphs represents the behaviour of an ideal gas at constant temperature (T = constant) on a PV versus V plot?",
    options: ["Graph (a)", "Graph (b)", "Graph (c)", "Graph (d)"],
    correct_index: 3,
    solution: "At constant temperature, Boyle's law states PV = constant. Therefore, PV does not change with V, giving a horizontal straight line parallel to the V-axis, shown in Graph (d)."
  },
  {
    q_num: 139,
    question_text: "A particle performs SHM with velocity v = ω√(A² - y²). The graph between velocity v and position y is:",
    options: ["Graph (a)", "Graph (b)", "Graph (c)", "Graph (d)"],
    correct_index: 0,
    solution: "Squaring both sides: v² = ω²(A² - y²) ⇒ v² / (ω²A²) + y² / A² = 1. This is the equation of an ellipse with semi-axes A and ωA, shown in Graph (a)."
  },
  {
    q_num: 140,
    question_text: "Match the following straight line descriptions with their graphs in Column-II:\n(1) Positive slope with negative y-intercept\n(2) Negative slope with negative y-intercept\n(3) Positive slope with positive y-intercept\n(4) Negative slope with positive y-intercept",
    options: [
      "(1) - D, (2) - B, (3) - C, (4) - A",
      "(1) - A, (2) - B, (3) - C, (4) - D",
      "(1) - C, (2) - D, (3) - A, (4) - B",
      "(1) - B, (2) - A, (3) - D, (4) - C"
    ],
    correct_index: 0,
    solution: "(1) m > 0, c < 0 matches Graph D;\n(2) m < 0, c < 0 matches Graph B;\n(3) m > 0, c > 0 matches Graph C;\n(4) m < 0, c > 0 matches Graph A."
  },
  {
    q_num: 141,
    question_text: "Find the equation of the straight line passing through points (3, 4) and (2, 6):",
    options: [
      "y = -2x + 10",
      "y = 2x - 2",
      "y = -x + 7",
      "y = 3x - 5"
    ],
    correct_index: 0,
    solution: "Slope m = (6 - 4) / (2 - 3) = 2 / -1 = -2. Using point-slope form: y - 4 = -2(x - 3) ⇒ y = -2x + 10."
  },
  {
    q_num: 142,
    question_text: "In the figure, line (I) makes 30° with the x-axis, and line (II) makes 30° with the y-axis (60° with x-axis). Find (slope)_I / (slope)_II:",
    options: ["1/3", "3", "1/√3", "√3"],
    correct_index: 0,
    solution: "m_I = tan(30°) = 1/√3. m_II = tan(90° - 30°) = tan(60°) = √3. Ratio = (1/√3) / √3 = 1/3."
  },
  {
    q_num: 143,
    question_text: "Identify the signs of slope and y-intercept for the four straight line graphs (1), (2), (3), (4):",
    options: [
      "(1) Positive slope, positive intercept; (2) Negative slope, positive intercept; (3) Negative slope, negative intercept; (4) Positive slope, negative intercept",
      "(1) Negative slope, negative intercept; (2) Positive slope, negative intercept; (3) Positive slope, positive intercept; (4) Negative slope, positive intercept",
      "(1) Zero slope; (2) Infinite slope; (3) Positive slope; (4) Negative slope",
      "None of these"
    ],
    correct_index: 0,
    solution: "(1) Rises from left to right with y-intercept > 0 (m > 0, c > 0);\n(2) Falls from left to right with y-intercept > 0 (m < 0, c > 0);\n(3) Falls from left to right with y-intercept < 0 (m < 0, c < 0);\n(4) Rises from left to right with y-intercept < 0 (m > 0, c < 0)."
  },
  {
    q_num: 144,
    question_text: "Find the equation of the line having y-intercept 4 and passing through point (2, 6):",
    options: ["y = x + 4", "y = 2x + 4", "y = -x + 4", "y = 3x + 4"],
    correct_index: 0,
    solution: "y-intercept c = 4. Passes through (2, 6) ⇒ 6 = m(2) + 4 ⇒ 2m = 2 ⇒ m = 1. Equation is y = x + 4."
  },
  {
    q_num: 145,
    question_text: "For the straight line graphs shown, what is the relation between slopes at points P, Q, R, and S?",
    options: [
      "mP = mQ = mR = mS",
      "mP < mQ < mR < mS",
      "mP > mQ > mR > mS",
      "mP < mQ = mR > mS"
    ],
    correct_index: 0,
    solution: "For any straight line, the slope dy/dx is constant throughout. Therefore mP = mQ = mR = mS."
  },
  {
    q_num: 146,
    question_text: "In the given graph of three parallel lines, m₁ has the highest slope while m₃ has the lowest slope:",
    options: ["True", "False"],
    correct_index: 1,
    solution: "Parallel lines make identical inclination angles with the horizontal axis, so their slopes are equal: m₁ = m₂ = m₃. Statement is False."
  },
  {
    q_num: 147,
    question_text: "Compare the slopes of line (1) and line (2) making angles α and β respectively with the x-axis, where β > α:",
    options: [
      "(Slope)₂ > (Slope)₁",
      "(Slope)₁ > (Slope)₂",
      "(Slope)₁ = (Slope)₂",
      "Cannot be determined"
    ],
    correct_index: 0,
    solution: "Since tan θ increases with θ for acute angles, β > α implies tan β > tan α, hence (Slope)₂ > (Slope)₁."
  },
  {
    q_num: 148,
    question_text: "If A = dy/dx = -2 and initial value of y is 10 at x = 0, then what is the x-intercept of the line y vs x?",
    options: ["5", "10", "-5", "2"],
    correct_index: 0,
    solution: "Equation of the line: y = mx + c = -2x + 10. For x-intercept, set y = 0: -2x + 10 = 0 ⇒ 2x = 10 ⇒ x = 5."
  },
  {
    q_num: 149,
    question_text: "Find the equation of the line making intercepts +4 and +5 on the x and y axes respectively:",
    options: [
      "4y + 5x - 20 = 0",
      "5x + 4y + 20 = 0",
      "4y - 5x = -20",
      "4x + 5x + 20 = 0"
    ],
    correct_index: 0,
    solution: "Intercept equation: x/4 + y/5 = 1 ⇒ 5x + 4y = 20 ⇒ 4y + 5x - 20 = 0."
  },
  {
    q_num: 150,
    question_text: "Using the given velocity-time graph starting from origin with angle 53°, find the velocity at t = 4 seconds:",
    options: ["16/3 m/s", "12 m/s", "16 m/s", "3/16 m/s"],
    correct_index: 0,
    solution: "Slope of v-t graph represents acceleration: a = tan 53° = 4/3 m/s². At t = 4 s, v = at = (4/3) × 4 = 16/3 m/s."
  },
  {
    q_num: 151,
    question_text: "A line has y-intercept 10 and passes through (4, 0). Find its slope and the value of y when x = 2:",
    options: [
      "m = -5/2, y = 5",
      "m = 5/2, y = -5",
      "m = -2/5, y = 8",
      "m = -5, y = 10"
    ],
    correct_index: 0,
    solution: "Slope m = (0 - 10) / (4 - 0) = -10 / 4 = -5/2. Equation is y = - (5/2)x + 10. When x = 2, y = -(5/2)(2) + 10 = -5 + 10 = 5."
  },
  {
    q_num: 152,
    question_text: "From the line graph with y-intercept 20 passing through (4, 0), find its slope and value of y at x = 8:",
    options: [
      "m = -5, y = -20",
      "m = 5, y = 20",
      "m = -4, y = -12",
      "m = 4, y = 16"
    ],
    correct_index: 0,
    solution: "Slope m = (0 - 20) / (4 - 0) = -5. Equation is y = -5x + 20. At x = 8, y = -5(8) + 20 = -40 + 20 = -20."
  },
  {
    q_num: 153,
    question_text: "If the equation of a straight line is 3y = 4x + 2, find sin θ where θ is the angle made with the positive x-axis:",
    options: ["4/5", "3/5", "5/4", "4/3"],
    correct_index: 0,
    solution: "y = (4/3)x + 2/3 ⇒ slope m = tan θ = 4/3. In a 3-4-5 right triangle, opposite = 4, hypotenuse = 5, so sin θ = 4/5."
  },
  {
    q_num: 154,
    question_text: "Match each equation with the nature of its graph:\n(i) x² + y² = 25\n(ii) x²/4 + y²/3 = 16\n(iii) x²y = constant\n(iv) 5 = y² x^(-1)\n(v) 4x + 3y = 25\n(vi) y = 4 sin θ",
    options: [
      "(i) - D, (ii) - C, (iii) - B, (iv) - A, (v) - E, (vi) - F",
      "(i) - C, (ii) - D, (iii) - A, (iv) - B, (v) - E, (vi) - F",
      "(i) - A, (ii) - B, (iii) - C, (iv) - D, (v) - E, (vi) - F",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) Circle (D); (ii) Ellipse (C); (iii) Rectangular hyperbola (B); (iv) Parabola y² = 5x (A); (v) Straight line (E); (vi) Sinusoidal wave (F)."
  },
  {
    q_num: 155,
    question_text: "For y = 2x + 4, find the average rate of change in y with respect to x when x changes from x₁ = 1 to x₂ = 3:",
    options: ["2", "4", "6", "8"],
    correct_index: 0,
    solution: "At x₁ = 1, y₁ = 6. At x₂ = 3, y₂ = 10. Average rate of change = Δy / Δx = (10 - 6) / (3 - 1) = 4 / 2 = 2."
  },
  {
    q_num: 156,
    question_text: "If y = 2x + 4, find the instantaneous rate of change of y with respect to x:",
    options: ["2", "4", "0", "Variable"],
    correct_index: 0,
    solution: "Instantaneous rate of change = dy/dx = d/dx(2x + 4) = 2."
  },
  {
    q_num: 157,
    question_text: "What is the nature of graph for y = x² - 4?",
    options: [
      "Parabola opening upwards with vertex at (0, -4)",
      "Parabola opening downwards with vertex at (0, 4)",
      "Circle of radius 2",
      "Straight line"
    ],
    correct_index: 0,
    solution: "y = x² - 4 is a parabola opening upwards with minimum vertex at (0, -4)."
  },
  {
    q_num: 158,
    question_text: "What is the nature of graph for y = -(x²)?",
    options: [
      "Parabola opening downwards with vertex at origin",
      "Parabola opening upwards with vertex at origin",
      "Hyperbola",
      "Straight line"
    ],
    correct_index: 0,
    solution: "y = -x² is an inverted parabola opening downwards with maximum vertex at (0, 0)."
  },
  {
    q_num: 159,
    question_text: "What is the nature of graph for y = x² + 5?",
    options: [
      "Parabola opening upwards with vertex at (0, 5)",
      "Parabola opening downwards with vertex at (0, 5)",
      "Ellipse",
      "Circle"
    ],
    correct_index: 0,
    solution: "y = x² + 5 is an upright parabola shifted 5 units upward, with vertex at (0, 5)."
  },
  {
    q_num: 160,
    question_text: "What is the nature of graph for y = -x² + 4?",
    options: [
      "Parabola opening downwards with vertex at (0, 4)",
      "Parabola opening upwards with vertex at (0, 4)",
      "Circle of radius 2",
      "Straight line"
    ],
    correct_index: 0,
    solution: "y = -x² + 4 is an inverted parabola opening downwards with peak vertex at (0, 4)."
  }
];

