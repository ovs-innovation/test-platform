export const trigBatch3 = [
  {
    question_number: 45,
    question_text: "The value of 36(4 cos² 9° - 1)(4 cos² 27° - 1)(4 cos² 81° - 1)(4 cos² 243° - 1) is",
    options: [
      "54",
      "18",
      "27",
      "36"
    ],
    correct_index: 3,
    solution: "Note that cos 81° = sin 9° and cos 243° = -cos 63° = -sin 27°. The product pairs as [(4 cos² 9° - 1)(4 sin² 9° - 1)] · [(4 cos² 27° - 1)(4 sin² 27° - 1)]. Since (4 cos² θ - 1)(4 sin² θ - 1) = 4 sin² 2θ - 3: for θ = 9°, 4 sin² 18° - 3 = 4((√5 - 1)/4)² - 3 = (6 - 2√5 - 12)/4 = (-6 - 2√5)/4; for θ = 27°, 4 sin² 54° - 3 = 4((√5 + 1)/4)² - 3 = (-6 + 2√5)/4. The product of these two factors is (36 - 20)/16 = 1. Multiplying by 36 gives 36 · 1 = 36.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 46,
    question_text: "96 cos(π/33) cos(2π/33) cos(4π/33) cos(8π/33) cos(16π/33) is equal to",
    options: [
      "3",
      "1",
      "4",
      "2"
    ],
    correct_index: 0,
    solution: "Using the formula cos A cos 2A cos 4A ... cos(2^(n-1)A) = sin(2^n A) / (2^n sin A) with A = π/33 and n = 5: cos(π/33) cos(2π/33) cos(4π/33) cos(8π/33) cos(16π/33) = sin(32π/33) / (32 sin(π/33)) = sin(π - π/33) / (32 sin(π/33)) = sin(π/33) / (32 sin(π/33)) = 1/32. Multiplying by 96 gives 96 × (1/32) = 3.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 47,
    question_text: "For α, β ∈ (0, π/2) let 3 sin(α + β) = 2 sin(α - β) and a real number k be such that tan α = k tan β. Then the value of k is equal to",
    options: [
      "-5",
      "5",
      "2/3",
      "-2/3"
    ],
    correct_index: 0,
    solution: "3 sin(α + β) = 2 sin(α - β) ⇒ sin(α + β) / sin(α - β) = 2/3. By componendo and dividendo: [sin(α + β) + sin(α - β)] / [sin(α + β) - sin(α - β)] = (2 + 3) / (2 - 3) = -5 ⇒ (2 sin α cos β) / (2 cos α sin β) = -5 ⇒ tan α / tan β = -5 ⇒ tan α = -5 tan β. Thus k = -5.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 48,
    question_text: "If tan A = 1 / √(x(x² + x + 1)), tan B = √x / √(x² + x + 1) and tan C = (x⁻³ + x⁻² + x⁻¹)^(1/2), 0 < A, B, C < π/2, then A + B is equal to:",
    options: [
      "C",
      "π - C",
      "2π - C",
      "π/2 - C"
    ],
    correct_index: 0,
    solution: "tan(A + B) = [tan A + tan B] / [1 - tan A tan B] = [ (1 + x) / √(x(x² + x + 1)) ] / [ 1 - √x / (x(x² + x + 1)) ] = [ (1 + x) / (√x √(x² + x + 1)) ] / [ (x² + x) / (x² + x + 1) ] = √(x² + x + 1) / (x√x) = √((x² + x + 1)/x³) = √(x⁻¹ + x⁻² + x⁻³) = tan C. Since A, B, C ∈ (0, π/2), A + B = C.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 49,
    question_text: "If sin x = -3/5, where π < x < 3π/2, then 80(tan² x - cos x) is equal to",
    options: [
      "108",
      "109",
      "18",
      "19"
    ],
    correct_index: 1,
    solution: "In the third quadrant, cos x = -4/5 and tan x = (-3/5)/(-4/5) = 3/4. Then 80(tan² x - cos x) = 80((3/4)² - (-4/5)) = 80(9/16 + 4/5) = 45 + 64 = 109.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 50,
    question_text: "If the value of (3 cos 36° + 5 sin 18°) / (5 cos 36° - 3 sin 18°) is (a√5 - b) / c, where a, b, c are natural numbers and gcd(a, c) = 1, then a + b + c is equal to :",
    options: [
      "40",
      "52",
      "50",
      "54"
    ],
    correct_index: 1,
    solution: "Since cos 36° = (√5 + 1)/4 and sin 18° = (√5 - 1)/4: Numerator = 3(√5 + 1)/4 + 5(√5 - 1)/4 = (8√5 - 2)/4. Denominator = 5(√5 + 1)/4 - 3(√5 - 1)/4 = (2√5 + 8)/4. The ratio is (8√5 - 2)/(2√5 + 8) = (4√5 - 1)/(√5 + 4) = [(4√5 - 1)(√5 - 4)] / (5 - 16) = (20 - 17√5 + 4) / (-11) = (17√5 - 24) / 11. Comparing with (a√5 - b)/c gives a = 17, b = 24, c = 11 with gcd(17, 11) = 1. Thus, a + b + c = 17 + 24 + 11 = 52.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 51,
    question_text: "Let |cos θ cos(60° - θ) cos(60° + θ)| ≤ 1/8, θ ∈ [0, 2π]. Then, the sum of all θ ∈ [0, 2π], where cos 3θ attains its maximum value, is :",
    options: [
      "15π",
      "18π",
      "6π",
      "9π"
    ],
    correct_index: 2,
    solution: "Since cos θ cos(60° - θ) cos(60° + θ) = (1/4) cos 3θ, the inequality becomes |(1/4) cos 3θ| ≤ 1/8 ⇒ |cos 3θ| ≤ 1/2 ⇒ -1/2 ≤ cos 3θ ≤ 1/2. The maximum value of cos 3θ in this range is 1/2. Thus cos 3θ = 1/2 ⇒ 3θ = 2nπ ± π/3 ⇒ θ = 2nπ/3 ± π/9. For θ ∈ [0, 2π], the values are π/9, 5π/9, 7π/9, 11π/9, 13π/9, 17π/9. Their sum is (1 + 5 + 7 + 11 + 13 + 17)π / 9 = 54π / 9 = 6π.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 52,
    question_text: "The value of (sin 70°)(cot 10° cot 70° - 1) is",
    options: [
      "2/3",
      "1",
      "0",
      "3/2"
    ],
    correct_index: 1,
    solution: "(sin 70°)(cot 10° cot 70° - 1) = sin 70° cot 10° cot 70° - sin 70° = cot 10° cos 70° - sin 70° = [cos 10° cos 70° - sin 10° sin 70°] / sin 10° = cos(10° + 70°) / sin 10° = cos 80° / sin 10° = sin 10° / sin 10° = 1.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 53,
    question_text: "If ∑_{r=1}^{13} 1 / [ sin(π/4 + (r - 1)π/6) sin(π/4 + rπ/6) ] = a√3 + b, a, b ∈ Z, then a² + b² is equal to :",
    options: [
      "10",
      "4",
      "2",
      "8"
    ],
    correct_index: 3,
    solution: "Multiplying and dividing by sin(π/6) = 1/2 gives 2 ∑_{r=1}^{13} sin((π/4 + rπ/6) - (π/4 + (r - 1)π/6)) / [ sin(π/4 + (r - 1)π/6) sin(π/4 + rπ/6) ] = 2 ∑_{r=1}^{13} [ cot(π/4 + (r - 1)π/6) - cot(π/4 + rπ/6) ]. The sum telescopes to 2 [ cot(π/4) - cot(π/4 + 13π/6) ] = 2 [ 1 - cot(5π/12) ] = 2 [ 1 - (2 - √3) ] = 2(√3 - 1) = 2√3 - 2. Comparing with a√3 + b gives a = 2, b = -2. Therefore, a² + b² = 2² + (-2)² = 8.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 54,
    question_text: "If sin x + sin² x = 1, x ∈ (0, π/2), then (cos¹² x + tan¹² x) + 3(cos¹⁰ x + tan¹⁰ x + cos⁸ x + tan⁸ x) + (cos⁶ x + tan⁶ x) is equal to :",
    options: [
      "4",
      "1",
      "3",
      "2"
    ],
    correct_index: 3,
    solution: "sin x + sin² x = 1 ⇒ sin x = 1 - sin² x = cos² x ⇒ tan x = sin x / cos x = cos² x / cos x = cos x. Thus tan^k x = cos^k x for all k. The given expression equals 2[cos¹² x + 3 cos¹⁰ x + 3 cos⁸ x + cos⁶ x] = 2 cos⁶ x (cos² x + 1)³ = 2 sin³ x (sin x + 1)³ = 2 (sin² x + sin x)³ = 2(1)³ = 2.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 55,
    question_text: "The value of cosec 10° - √3 sec 10° is equal to :",
    options: [
      "8",
      "6",
      "2",
      "4"
    ],
    correct_index: 3,
    solution: "cosec 10° - √3 sec 10° = 1 / sin 10° - √3 / cos 10° = (cos 10° - √3 sin 10°) / (sin 10° cos 10°) = 2[(1/2) cos 10° - (√3/2) sin 10°] / [(1/2) sin 20°] = 2 sin(30° - 10°) / [(1/2) sin 20°] = 2 sin 20° / [(1/2) sin 20°] = 4.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 56,
    question_text: "If (cos² 48° - sin² 12°) / (sin² 24° - sin² 6°) = (α + β√5) / 2, where α, β ∈ N, then α + β is equal to",
    options: [],
    correct_index: 4,
    question_type: "integer",
    solution: "cos² 48° - sin² 12° = cos(48° + 12°) cos(48° - 12°) = cos 60° cos 36° = (1/2) cos 36°. sin² 24° - sin² 6° = sin(24° + 6°) sin(24° - 6°) = sin 30° sin 18° = (1/2) sin 18°. Ratio = cos 36° / sin 18° = [(√5 + 1)/4] / [(√5 - 1)/4] = (√5 + 1)² / 4 = (6 + 2√5) / 4 = (3 + √5) / 2. Comparing with (α + β√5) / 2 gives α = 3, β = 1. Thus, α + β = 3 + 1 = 4.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 57,
    question_text: "Let cos(α + β) = -1/10 and sin(α - β) = 3/8, where 0 < α < π/3 and 0 < β < π/4. If tan 2α = (3(1 - r√5)) / (√11(s + √5)), r, s ∈ N, then r + s is equal to",
    options: [],
    correct_index: 20,
    question_type: "integer",
    solution: "Using tan 2α = tan((α + β) + (α - β)) = [tan(α + β) + tan(α - β)] / [1 - tan(α + β) tan(α - β)]. With cos(α + β) = -1/10 ⇒ tan(α + β) = -3√11 and sin(α - β) = 3/8 ⇒ tan(α - β) = 3/√55, substituting and rationalizing yields tan 2α = 3(1 - 11√5) / [√11(9 + √5)]. Comparing gives r = 11 and s = 9. Therefore, r + s = 11 + 9 = 20.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 58,
    question_text: "Let α and β respectively be the maximum and the minimum values of the function f(θ) = 4(sin⁴(7π/2 - θ) + sin⁴(11π + θ)) - 2(sin⁶(3π/2 - θ) + sin⁶(9π - θ)), θ ∈ R. Then α + 2β is equal to:",
    options: [
      "4",
      "6",
      "5",
      "3"
    ],
    correct_index: 2,
    solution: "f(θ) = 4(cos⁴ θ + sin⁴ θ) - 2(cos⁶ θ + sin⁶ θ) = 4(1 - 2 sin² θ cos² θ) - 2(1 - 3 sin² θ cos² θ) = 2 - 2 sin² θ cos² θ = 2 - (1/2) sin² 2θ. Since 0 ≤ sin² 2θ ≤ 1, the maximum value α = 2 and minimum value β = 2 - 1/2 = 3/2. Thus, α + 2β = 2 + 2(3/2) = 5.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 59,
    question_text: "Let π/2 < θ < π and cot θ = -1/(2√2). Then the value of sin(15°/2)(cos 8θ + sin 8θ) + cos(15°/2)(cos 8θ - sin 8θ) is equal to",
    options: [
      "-√2 / √3",
      "(√2 - 1) / √3",
      "√2 / √3",
      "(1 - √2) / √3"
    ],
    correct_index: 3,
    solution: "The expression expands and regroups to cos(θ/2) - sin(θ/2). Given cot θ = -1/(2√2) in II quadrant: sin θ = 2√2 / 3. Then (cos(θ/2) - sin(θ/2))² = 1 - sin θ = 1 - 2√2 / 3 = (√2 - 1)² / 3. Since π/4 < θ/2 < π/2, sin(θ/2) > cos(θ/2), so cos(θ/2) - sin(θ/2) = - (√2 - 1) / √3 = (1 - √2) / √3.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 60,
    question_text: "The least value of (cos² θ - 6 sin θ cos θ + 3 sin² θ + 2) is",
    options: [
      "-1",
      "1",
      "4 - √10",
      "4 + √10"
    ],
    correct_index: 2,
    solution: "cos² θ - 6 sin θ cos θ + 3 sin² θ + 2 = (1 + cos 2θ)/2 - 3 sin 2θ + 3(1 - cos 2θ)/2 + 2 = 4 - (cos 2θ + 3 sin 2θ). The maximum value of cos 2θ + 3 sin 2θ is √(1² + 3²) = √10. Hence, the minimum value is 4 - √10.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 61,
    question_text: "The value of (√3 cosec 20° - sec 20°) / (cos 20° cos 40° cos 60° cos 80°) is equal to",
    options: [
      "16",
      "32",
      "64",
      "12"
    ],
    correct_index: 2,
    solution: "Numerator = √3 / sin 20° - 1 / cos 20° = 2[(√3/2) cos 20° - (1/2) sin 20°] / [(1/2) sin 40°] = 2 sin(60° - 20°) / [(1/2) sin 40°] = 4 sin 40° / sin 40° = 4. Denominator = cos 20° cos 40° cos 80° · cos 60° = (1/8)(1/2) = 1/16. Ratio = 4 / (1/16) = 64.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 62,
    question_text: "If cot x = 5/12 for some x ∈ (π, 3π/2), then sin 7x (cos(13x/2) + sin(13x/2)) + cos 7x (cos(13x/2) - sin(13x/2)) is equal to",
    options: [
      "4 / √26",
      "6 / √26",
      "5 / √13",
      "1 / √13"
    ],
    correct_index: 3,
    solution: "The expression expands to [sin 7x cos(13x/2) + cos 7x cos(13x/2)] + [sin 7x sin(13x/2) - cos 7x sin(13x/2)] = cos(7x - 13x/2) + sin(7x - 13x/2) = cos(x/2) + sin(x/2). In III quadrant, cot x = 5/12 ⇒ cos x = -5/13 = 2 cos²(x/2) - 1 ⇒ cos²(x/2) = 4/13. For x ∈ (π, 3π/2), x/2 ∈ (π/2, 3π/4), so cos(x/2) = -2/√13 and sin(x/2) = 3/√13. Thus, cos(x/2) + sin(x/2) = -2/√13 + 3/√13 = 1 / √13.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 63,
    question_text: "If tan(A - B) / tan A + sin² C / sin² A = 1, A, B, C ∈ (0, π/2), then",
    options: [
      "tan A, tan C, tan B are in A.P.",
      "tan A, tan B, tan C are in G.P.",
      "tan A, tan C, tan B are in G.P.",
      "tan A, tan B, tan C are in A.P."
    ],
    correct_index: 2,
    solution: "Rearranging: tan(A - B) / tan A = 1 - sin² C / sin² A = (sin² A - sin² C) / sin² A. Since sin² A - sin² C = sin(A + C) sin(A - C) and tan(A - B)/tan A = sin(A - B) cos A / [cos(A - B) sin A], simplifying in terms of tangents reduces to tan² C = tan A · tan B. This means tan A, tan C, and tan B are in G.P.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 64,
    question_text: "If sin(π/18) sin(5π/18) sin(7π/18) = K, then the value of sin(10Kπ / 3) is :",
    options: [
      "(√3 + 1) / (2√2)",
      "(√3 - 1) / √2",
      "√3 / 2",
      "1 / 2"
    ],
    correct_index: 0,
    solution: "Using sin θ sin(π/3 - θ) sin(π/3 + θ) = (1/4) sin 3θ with θ = π/18: K = sin(π/18) sin(5π/18) sin(7π/18) = (1/4) sin(3 · π/18) = (1/4) sin(π/6) = (1/4)(1/2) = 1/8. Then sin(10Kπ / 3) = sin(10(1/8)π / 3) = sin(5π/12) = sin 75° = (√3 + 1) / (2√2).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 65,
    question_text: "Let P = { θ ∈ [0, 4π] : tan² θ ≠ 1 } and S = { a ∈ Z : 2(cos⁸ θ - sin⁸ θ) sec 2θ = a², θ ∈ P }. Then n(S) is:",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct_index: 0,
    solution: "cos⁸ θ - sin⁸ θ = (cos⁴ θ - sin⁴ θ)(cos⁴ θ + sin⁴ θ) = cos 2θ (1 - (1/2) sin² 2θ). Since θ ∈ P, tan² θ ≠ 1 ⇒ cos 2θ ≠ 0 and sin² 2θ ≠ 1. The equation becomes 2(1 - (1/2) sin² 2θ) = 2 - sin² 2θ = a². Since 0 ≤ sin² 2θ < 1, we have 1 < 2 - sin² 2θ ≤ 2 ⇒ 1 < a² ≤ 2. The only integer in this interval is 2, so a² = 2. But there is no integer a such that a² = 2. Hence S = ∅ and n(S) = 0.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 66,
    question_text: "If A = sin 3° / cos 9° + sin 9° / cos 27° + sin 27° / cos 81° and B = tan 81° - tan 3°, then B / A is equal to",
    options: [],
    correct_index: 2,
    question_type: "integer",
    solution: "Using sin x / cos 3x = (2 sin x cos x) / (2 cos 3x cos x) = sin 2x / (2 cos 3x cos x) = sin(3x - x) / (2 cos 3x cos x) = (1/2)(tan 3x - tan x): A = (1/2)[ (tan 9° - tan 3°) + (tan 27° - tan 9°) + (tan 81° - tan 27°) ] = (1/2)(tan 81° - tan 3°) = (1/2)B. Therefore, B / A = 2.",
    marks: 4,
    difficulty: "medium"
  }
];

