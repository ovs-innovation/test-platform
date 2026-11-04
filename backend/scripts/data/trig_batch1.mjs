export const trigBatch1 = [
  {
    question_number: 1,
    question_text: "The period of sin² θ is",
    options: [
      "π²",
      "π",
      "2π",
      "π/2"
    ],
    correct_index: 1,
    solution: "sin² θ = (1 - cos 2θ) / 2. Since the period of cos 2θ is 2π / 2 = π, the period of sin² θ is π.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 2,
    question_text: "Let α, β be such that π < α - β < 3π. If sin α + sin β = -21/65 and cos α + cos β = -27/65, then the value of cos((α - β)/2) is",
    options: [
      "-3 / √130",
      "3 / √130",
      "6 / 65",
      "-6 / 65"
    ],
    correct_index: 0,
    solution: "Squaring and adding the two equations: (sin α + sin β)² + (cos α + cos β)² = (-21/65)² + (-27/65)² ⇒ 2 + 2 cos(α - β) = (441 + 729) / 4225 = 1170 / 4225 = 18 / 65. Since 2 + 2 cos(α - β) = 4 cos²((α - β)/2), we have 4 cos²((α - β)/2) = 18/65 ⇒ cos²((α - β)/2) = 9/130. Given π < α - β < 3π ⇒ π/2 < (α - β)/2 < 3π/2, so (α - β)/2 lies in the second quadrant where cosine is negative. Thus, cos((α - β)/2) = -3 / √130.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 3,
    question_text: "Let cos(α + β) = 4/5 and let sin(α - β) = 5/13, where 0 ≤ α, β ≤ π/4, then tan 2α =",
    options: [
      "56 / 33",
      "19 / 12",
      "20 / 7",
      "25 / 16"
    ],
    correct_index: 0,
    solution: "cos(α + β) = 4/5 ⇒ tan(α + β) = 3/4. sin(α - β) = 5/13 ⇒ tan(α - β) = 5/12. Since 2α = (α + β) + (α - β), tan 2α = [tan(α + β) + tan(α - β)] / [1 - tan(α + β) tan(α - β)] = [3/4 + 5/12] / [1 - (3/4)(5/12)] = (14/12) / (33/48) = (56/48) / (33/48) = 56 / 33.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 4,
    question_text: "If A = sin² x + cos⁴ x, then for all real x",
    options: [
      "13/16 ≤ A ≤ 1",
      "1 ≤ A ≤ 2",
      "3/4 ≤ A ≤ 13/16",
      "3/4 ≤ A ≤ 1"
    ],
    correct_index: 3,
    solution: "A = sin² x + cos⁴ x = sin² x + cos² x(1 - sin² x) = sin² x + cos² x - sin² x cos² x = 1 - (1/4) sin² 2x = 1 - (1/4)((1 - cos 4x)/2) = (7 + cos 4x) / 8. Since -1 ≤ cos 4x ≤ 1, we have (7 - 1)/8 ≤ A ≤ (7 + 1)/8 ⇒ 3/4 ≤ A ≤ 1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 5,
    question_text: "Suppose θ and ϕ (≠ 0) are such that sec(θ + ϕ), sec θ and sec(θ - ϕ) are in A.P. If cos θ = k cos(ϕ/2) for some k, then k is equal to",
    options: [
      "±√2",
      "±1",
      "±1/√2",
      "±2"
    ],
    correct_index: 0,
    solution: "Since sec(θ + ϕ), sec θ, sec(θ - ϕ) are in A.P., 2 sec θ = sec(θ - ϕ) + sec(θ + ϕ) ⇒ 2 / cos θ = [cos(θ + ϕ) + cos(θ - ϕ)] / [cos(θ - ϕ) cos(θ + ϕ)] ⇒ 2 / cos θ = 2 cos θ cos ϕ / [cos² θ - sin² ϕ] ⇒ cos² θ - sin² ϕ = cos² θ cos ϕ ⇒ cos² θ(1 - cos ϕ) = sin² ϕ = 1 - cos² ϕ = (1 - cos ϕ)(1 + cos ϕ). Since ϕ ≠ 0, 1 - cos ϕ ≠ 0, so cos² θ = 1 + cos ϕ = 2 cos²(ϕ/2) ⇒ cos θ = ±√2 cos(ϕ/2). Hence k = ±√2.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 6,
    question_text: "The value of cos 255° + sin 195° is",
    options: [
      "(√3 - 1) / (2√2)",
      "(√3 - 1) / √2",
      "-(√3 - 1) / √2",
      "(√3 + 1) / √2"
    ],
    correct_index: 2,
    solution: "cos 255° + sin 195° = cos(270° - 15°) + sin(180° + 15°) = -sin 15° - sin 15° = -2 sin 15°. Since sin 15° = (√3 - 1) / (2√2), we have -2 sin 15° = -2 · [(√3 - 1) / (2√2)] = -(√3 - 1) / √2.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 7,
    question_text: "The expression (tan A / (1 - cot A)) + (cot A / (1 - tan A)) can be written as :",
    options: [
      "tan A + cot A",
      "sec A + cosec A",
      "sin A cos A + 1",
      "sec A cosec A + 1"
    ],
    correct_index: 3,
    solution: "(tan A / (1 - cot A)) + (cot A / (1 - tan A)) = [sin² A / (cos A (sin A - cos A))] + [cos² A / (sin A (cos A - sin A))] = [sin³ A - cos³ A] / [sin A cos A (sin A - cos A)] = (sin A - cos A)(sin² A + cos² A + sin A cos A) / [sin A cos A (sin A - cos A)] = (1 + sin A cos A) / (sin A cos A) = sec A cosec A + 1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 8,
    question_text: "Let f_k(x) = (1/k)(sin^k x + cos^k x) where x ∈ R and k ≥ 1. Then f_4(x) - f_6(x) equals",
    options: [
      "1/4",
      "1/12",
      "1/6",
      "1/3"
    ],
    correct_index: 1,
    solution: "f_4(x) = (1/4)(sin⁴ x + cos⁴ x) = (1/4)[(sin² x + cos² x)² - 2 sin² x cos² x] = (1/4)[1 - 2 sin² x cos² x]. f_6(x) = (1/6)(sin⁶ x + cos⁶ x) = (1/6)[(sin² x + cos² x)³ - 3 sin² x cos² x(sin² x + cos² x)] = (1/6)[1 - 3 sin² x cos² x]. Therefore, f_4(x) - f_6(x) = 1/4 - (1/2) sin² x cos² x - 1/6 + (1/2) sin² x cos² x = 1/4 - 1/6 = 1/12.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 9,
    question_text: "If cosec θ = (p + q) / (p - q) (p ≠ q, p ≠ 0), then |cot(π/4 + θ/2)| is equals to:",
    options: [
      "pq",
      "√(p/q)",
      "√(q/p)",
      "√pq"
    ],
    correct_index: 2,
    solution: "cosec θ = (p + q) / (p - q) ⇒ 1 / sin θ = (p + q) / (p - q). Let t = tan(θ/2), then sin θ = 2t / (1 + t²) ⇒ (1 + t²) / (2t) = (p + q) / (p - q). By componendo and dividendo: (1 + t² + 2t) / (1 + t² - 2t) = 2p / 2q ⇒ ((1 + t) / (1 - t))² = p / q ⇒ |(1 - t) / (1 + t)| = √(q/p). Since cot(π/4 + θ/2) = (1 - tan(θ/2)) / (1 + tan(θ/2)) = (1 - t) / (1 + t), we have |cot(π/4 + θ/2)| = √(q/p).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 10,
    question_text: "If cos α + cos β = 3/2 and sin α + sin β = 1/2 and θ is the arithmetic mean of α & β, then sin 2θ + cos 2θ is equal to:",
    options: [
      "3/5",
      "7/5",
      "4/5",
      "8/5"
    ],
    correct_index: 1,
    solution: "cos α + cos β = 2 cos((α + β)/2) cos((α - β)/2) = 3/2 and sin α + sin β = 2 sin((α + β)/2) cos((α - β)/2) = 1/2. Dividing the second by the first gives tan((α + β)/2) = (1/2) / (3/2) = 1/3. Since θ = (α + β)/2, tan θ = 1/3. Now, sin 2θ + cos 2θ = [2 tan θ / (1 + tan² θ)] + [(1 - tan² θ) / (1 + tan² θ)] = [2(1/3) + (1 - 1/9)] / (1 + 1/9) = (2/3 + 8/9) / (10/9) = (14/9) / (10/9) = 14/10 = 7/5.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 11,
    question_text: "If m and M are the minimum and the maximum values of 4 + (1/2) sin² 2x - 2 cos⁴ x, x ∈ R, then M - m is equal to:",
    options: [
      "15/4",
      "9/4",
      "7/4",
      "1/4"
    ],
    correct_index: 1,
    solution: "Given expression = 4 + 2 sin² x cos² x - 2 cos⁴ x = 4 + 2(1 - cos² x) cos² x - 2 cos⁴ x = 4 + 2 cos² x - 4 cos⁴ x = -4(cos² x - 1/4)² + 17/4. For real x, 0 ≤ cos² x ≤ 1. The maximum value M occurs when cos² x = 1/4: M = 17/4. The minimum value m occurs when cos² x = 1: m = -4(3/4)² + 17/4 = -9/4 + 17/4 = 8/4 = 2. Hence, M - m = 17/4 - 2 = 9/4.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 12,
    question_text: "The number of x ∈ [0, 2π] for which |√(2 sin⁴ x + 18 cos² x) - √(2 cos⁴ x + 18 sin² x)| = 1 is:",
    options: [
      "2",
      "6",
      "4",
      "8"
    ],
    correct_index: 3,
    solution: "Let √(2 sin⁴ x + 18 cos² x) - √(2 cos⁴ x + 18 sin² x) = ±1. Squaring and rearranging leads to: 16(cos² x - sin² x) - 1 = ±2√(2 cos⁴ x + 18 sin² x) ⇒ 16 cos 2x - 1 = ±2√(2( (1 + cos 2x)/2 )² + 9(1 - cos 2x)). Squaring again yields 254 cos² 2x = 37 ⇒ cos² 2x = 37 / 254 ∈ (0, 1). Thus, cos 2x = ±√(37/254). For 2x ∈ [0, 4π], each value of cos 2x gives 4 solutions, giving a total of 8 solutions.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 13,
    question_text: "If A > 0, B > 0 and A + B = π/6, then the minimum positive value of (tan A + tan B) is :",
    options: [
      "√3 - √2",
      "4 - 2√3",
      "2 / √3",
      "2 - √3"
    ],
    correct_index: 1,
    solution: "tan(A + B) = (tan A + tan B) / (1 - tan A tan B) = 1/√3. Let y = tan A + tan B. Then tan A tan B = 1 - √3 y. Using AM ≥ GM: y / 2 ≥ √(tan A tan B) = √(1 - √3 y) ⇒ y² / 4 ≥ 1 - √3 y ⇒ y² + 4√3 y - 4 ≥ 0. Solving y² + 4√3 y - 4 = 0 gives y = [-4√3 ± √(48 + 16)] / 2 = -2√3 ± 4. Since y > 0, y ≥ 4 - 2√3. Thus, minimum positive value is 4 - 2√3.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 14,
    question_text: "If 5(tan² x - cos² x) = 2 cos 2x + 9, then the value of cos 4x is",
    options: [
      "-3/5",
      "1/3",
      "2/9",
      "-7/9"
    ],
    correct_index: 3,
    solution: "5[(1 - cos 2x)/(1 + cos 2x) - (1 + cos 2x)/2] = 2 cos 2x + 9. Let y = cos 2x: 5[(1 - y)/(1 + y) - (1 + y)/2] = 2y + 9 ⇒ 5[-y² - 4y + 1] = 4y² + 22y + 18 ⇒ 9y² + 42y + 13 = 0 ⇒ (3y + 1)(3y + 13) = 0. Since |y| ≤ 1, y = -1/3. Then cos 4x = 2 cos² 2x - 1 = 2(-1/3)² - 1 = 2/9 - 1 = -7/9.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 15,
    question_text: "The lengths of two adjacent sides of a cyclic quadrilateral are 2 units and 5 units and the angle between them is 60°. If the area of the quadrilateral is 4√3 sq. units, then the perimeter of the quadrilateral is",
    options: [
      "12.5 units",
      "13 units",
      "13.2 units",
      "12 units"
    ],
    correct_index: 3,
    solution: "Let the adjacent sides be 2 and 5 with angle 60°. The square of the opposite diagonal c is c² = 2² + 5² - 2(2)(5) cos 60° = 29 - 10 = 19. For the remaining two sides a and b, the opposite angle is 180° - 60° = 120°, so c² = a² + b² - 2ab cos 120° = a² + b² + ab = 19. Total area = (1/2)(2)(5) sin 60° + (1/2)ab sin 120° = (5√3)/2 + (ab√3)/4 = 4√3 ⇒ ab = 6. Then a² + b² = 19 - 6 = 13 ⇒ (a + b)² = a² + b² + 2ab = 13 + 12 = 25 ⇒ a + b = 5. Perimeter = 2 + 5 + a + b = 12 units.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 16,
    question_text: "For any θ ∈ (π/4, π/2), the expression 3(sin θ - cos θ)⁴ + 6(sin θ + cos θ)² + 4 sin⁶ θ equals:",
    options: [
      "13 - 4 cos² θ + 6 cos⁴ θ",
      "13 - 4 cos² θ + 6 sin² θ cos² θ",
      "13 - 4 cos⁶ θ",
      "13 - 4 cos⁴ θ + 2 sin² θ cos² θ"
    ],
    correct_index: 2,
    solution: "3(sin θ - cos θ)⁴ + 6(sin θ + cos θ)² + 4 sin⁶ θ = 3(1 - 2 sin θ cos θ)² + 6(1 + 2 sin θ cos θ) + 4 sin⁶ θ = 3(1 - 4 sin θ cos θ + 4 sin² θ cos² θ) + 6 + 12 sin θ cos θ + 4 sin⁶ θ = 9 + 12 sin² θ cos² θ + 4 sin⁶ θ = 9 + 12(1 - cos² θ) cos² θ + 4(1 - cos² θ)³ = 9 + 12 cos² θ - 12 cos⁴ θ + 4(1 - 3 cos² θ + 3 cos⁴ θ - cos⁶ θ) = 13 - 4 cos⁶ θ.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 17,
    question_text: "The value of cos(π/2²) · cos(π/2³) · ... · cos(π/2¹⁰) · sin(π/2¹⁰) is:",
    options: [
      "1 / 1024",
      "1 / 512",
      "1 / 2",
      "1 / 256"
    ],
    correct_index: 1,
    solution: "Using the identity cos A cos 2A cos 4A ... cos(2^(n-1)A) = sin(2^n A) / (2^n sin A) with A = π/2¹⁰ and n = 9: cos(π/2¹⁰) cos(π/2⁹) ... cos(π/2²) = sin(2⁹ · π/2¹⁰) / (2⁹ sin(π/2¹⁰)) = sin(π/2) / (512 sin(π/2¹⁰)) = 1 / (512 sin(π/2¹⁰)). Multiplying by sin(π/2¹⁰) yields 1 / 512.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 18,
    question_text: "Let f_k(x) = (1/k)(sin^k x + cos^k x) for k = 1, 2, 3, ... Then for all x ∈ R, the value of f_4(x) - f_6(x) is equal to :",
    options: [
      "1 / 12",
      "1 / 4",
      "-1 / 12",
      "5 / 12"
    ],
    correct_index: 0,
    solution: "f_4(x) = (1/4)(sin⁴ x + cos⁴ x) = (1/4)[1 - 2 sin² x cos² x] = 1/4 - (1/8) sin² 2x. f_6(x) = (1/6)(sin⁶ x + cos⁶ x) = (1/6)[1 - 3 sin² x cos² x] = 1/6 - (1/8) sin² 2x. Hence, f_4(x) - f_6(x) = 1/4 - 1/6 = 1/12.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 19,
    question_text: "The maximum value of 3 cos θ + 5 sin(θ - π/6) for any real value of θ is :",
    options: [
      "√19",
      "√31",
      "√79 / 2",
      "√34"
    ],
    correct_index: 0,
    solution: "3 cos θ + 5 sin(θ - π/6) = 3 cos θ + 5[sin θ cos(π/6) - cos θ sin(π/6)] = 3 cos θ + 5[(√3/2) sin θ - (1/2) cos θ] = (5√3 / 2) sin θ + (1/2) cos θ. The maximum value of a sin θ + b cos θ is √(a² + b²) = √((5√3/2)² + (1/2)²) = √(75/4 + 1/4) = √19.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 20,
    question_text: "If cos(α + β) = 3/5, sin(α - β) = 5/13 and 0 < α, β < π/4, then tan(2α) is equal to:",
    options: [
      "21 / 16",
      "63 / 52",
      "33 / 52",
      "63 / 16"
    ],
    correct_index: 3,
    solution: "cos(α + β) = 3/5 ⇒ tan(α + β) = 4/3. sin(α - β) = 5/13 ⇒ tan(α - β) = 5/12. Since 2α = (α + β) + (α - β), tan 2α = [tan(α + β) + tan(α - β)] / [1 - tan(α + β) tan(α - β)] = [4/3 + 5/12] / [1 - (4/3)(5/12)] = (21/12) / (16/36) = (7/4) / (4/9) = 63 / 16.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 21,
    question_text: "The value of cos² 10° - cos 10° cos 50° + cos² 50° is",
    options: [
      "3/4",
      "3/4 + cos 20°",
      "3/2",
      "(3/2)(1 + cos 20°)"
    ],
    correct_index: 0,
    solution: "cos² 10° + cos² 50° - cos 10° cos 50° = (1/2)[1 + cos 20° + 1 + cos 100° - 2 cos 50° cos 10°] = (1/2)[2 + cos 100° + cos 20° - (cos 60° + cos 40°)] = (1/2)[2 + 2 cos 60° cos 40° - 1/2 - cos 40°] = (1/2)[3/2 + cos 40° - cos 40°] = 3/4.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 22,
    question_text: "The value of sin 10° sin 30° sin 50° sin 70° is:",
    options: [
      "1 / 36",
      "1 / 16",
      "1 / 18",
      "1 / 32"
    ],
    correct_index: 1,
    solution: "sin 10° sin 30° sin 50° sin 70° = sin 30° · [sin 10° sin(60° - 10°) sin(60° + 10°)] = (1/2) · [(1/4) sin 30°] = (1/8)(1/2) = 1/16.",
    marks: 4,
    difficulty: "easy"
  }
];
