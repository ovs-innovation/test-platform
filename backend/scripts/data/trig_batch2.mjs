export const trigBatch2 = [
  {
    question_number: 23,
    question_text: "The equation y = sin x sin(x + 2) - sin²(x + 1) represents a straight line lying in:",
    options: [
      "first, third and fourth quadrants",
      "second and third quadrants only",
      "first, second and fourth quadrants",
      "third and fourth quadrants only"
    ],
    correct_index: 3,
    solution: "y = sin x sin(x + 2) - sin²(x + 1) = (1/2)[2 sin(x + 2) sin x - 2 sin²(x + 1)] = (1/2)[cos 2 - cos(2x + 2) - (1 - cos(2x + 2))] = (1/2)(cos 2 - 1) = -sin² 1. Since -sin² 1 is a strictly negative constant, y = -sin² 1 is a horizontal line below the x-axis, lying entirely in the third and fourth quadrants only.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 24,
    question_text: "If (√2 sin α) / √(1 + cos 2α) = 1/7 and √((1 - cos 2β) / 2) = 1/√10, α, β ∈ (0, π/2), then tan(α + 2β), is equal to",
    options: [],
    correct_index: 1,
    question_type: "integer",
    solution: "√(1 + cos 2α) = √2 cos α ⇒ (√2 sin α) / (√2 cos α) = tan α = 1/7. √((1 - cos 2β)/2) = sin β = 1/√10 ⇒ cos β = 3/√10 ⇒ tan β = 1/3. Then tan 2β = (2 tan β) / (1 - tan² β) = (2/3) / (1 - 1/9) = (2/3) / (8/9) = 3/4. Now, tan(α + 2β) = [tan α + tan 2β] / [1 - tan α tan 2β] = [1/7 + 3/4] / [1 - (1/7)(3/4)] = (25/28) / (25/28) = 1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 25,
    question_text: "The value of cos³(π/8) · cos(3π/8) + sin³(π/8) · sin(3π/8) is:",
    options: [
      "1 / √2",
      "1 / (2√2)",
      "1 / 2",
      "1 / 4"
    ],
    correct_index: 1,
    solution: "Since cos(3π/8) = sin(π/8) and sin(3π/8) = cos(π/8), the expression becomes cos³(π/8) sin(π/8) + sin³(π/8) cos(π/8) = sin(π/8) cos(π/8)(cos²(π/8) + sin²(π/8)) = sin(π/8) cos(π/8) = (1/2) sin(π/4) = (1/2)(1/√2) = 1 / (2√2).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 26,
    question_text: "If the equation cos⁴ θ + sin⁴ θ + λ = 0 has real solutions for θ then λ lies in interval",
    options: [
      "(-5/4, -1)",
      "[-1, -1/2]",
      "(-1/2, -1/4]",
      "[-3/2, -5/4]"
    ],
    correct_index: 1,
    solution: "-λ = sin⁴ θ + cos⁴ θ = (sin² θ + cos² θ)² - 2 sin² θ cos² θ = 1 - (1/2) sin² 2θ. Since 0 ≤ sin² 2θ ≤ 1, 1 - 1/2 ≤ -λ ≤ 1 ⇒ 1/2 ≤ -λ ≤ 1 ⇒ -1 ≤ λ ≤ -1/2. Thus λ ∈ [-1, -1/2].",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 27,
    question_text: "If L = sin²(π/16) - sin²(π/8) and M = cos²(π/16) - sin²(π/8), then :",
    options: [
      "L = -1/(2√2) + (1/2) cos(π/8)",
      "L = 1/(4√2) - (1/4) cos(π/8)",
      "M = 1/(4√2) + (1/4) cos(π/8)",
      "M = 1/(2√2) + (1/2) cos(π/8)"
    ],
    correct_index: 3,
    solution: "Using the identity cos² A - sin² B = cos(A + B) cos(A - B): M = cos²(π/16) - sin²(π/8) = cos(π/16 + π/8) cos(π/16 - π/8) = cos(3π/16) cos(-π/16) = cos(3π/16) cos(π/16) = (1/2)[cos(3π/16 + π/16) + cos(3π/16 - π/16)] = (1/2)[cos(π/4) + cos(π/8)] = (1/2)[1/√2 + cos(π/8)] = 1/(2√2) + (1/2) cos(π/8).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 28,
    question_text: "The number of integral values of k for which the equation 3 sin x + 4 cos x = k + 1 has a solution, k ∈ R is",
    options: [],
    correct_index: 11,
    question_type: "integer",
    solution: "The range of 3 sin x + 4 cos x is [-√(3² + 4²), √(3² + 4²)] = [-5, 5]. For a solution to exist: -5 ≤ k + 1 ≤ 5 ⇒ -6 ≤ k ≤ 4. The integral values of k are -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4. The number of such integral values is 4 - (-6) + 1 = 11.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 29,
    question_text: "If 15 sin⁴ α + 10 cos⁴ α = 6, for some α ∈ R, then the value of 27 sec⁶ α + 8 cosec⁶ α is equal to :",
    options: [
      "350",
      "500",
      "400",
      "250"
    ],
    correct_index: 3,
    solution: "15 sin⁴ α + 10 cos⁴ α = 6(sin² α + cos² α)² = 6 sin⁴ α + 12 sin² α cos² α + 6 cos⁴ α ⇒ 9 sin⁴ α - 12 sin² α cos² α + 4 cos⁴ α = 0 ⇒ (3 sin² α - 2 cos² α)² = 0 ⇒ 3 sin² α = 2 cos² α ⇒ tan² α = 2/3 and cot² α = 3/2. Then sec² α = 1 + tan² α = 5/3 and cosec² α = 1 + cot² α = 5/2. Thus, 27 sec⁶ α + 8 cosec⁶ α = 27(sec² α)³ + 8(cosec² α)³ = 27(5/3)³ + 8(5/2)³ = 125 + 125 = 250.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 30,
    question_text: "The value of cot(π/24) is:",
    options: [
      "√2 + √3 + 2 - √6",
      "√2 + √3 + 2 + √6",
      "√2 - √3 - 2 + √6",
      "3√2 - √3 - √6"
    ],
    correct_index: 1,
    solution: "cot θ = (1 + cos 2θ) / sin 2θ. For θ = π/24, 2θ = π/12 = 15°. cos 15° = (√6 + √2)/4 = (√3 + 1)/(2√2) and sin 15° = (√6 - √2)/4 = (√3 - 1)/(2√2). cot(π/24) = [1 + (√3 + 1)/(2√2)] / [ (√3 - 1)/(2√2) ] = (2√2 + √3 + 1) / (√3 - 1) = (2√2 + √3 + 1)(√3 + 1) / 2 = (2√6 + 2√2 + 3 + √3 + √3 + 1) / 2 = (2√6 + 2√2 + 2√3 + 4) / 2 = √6 + √2 + √3 + 2.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 31,
    question_text: "If sin θ + cos θ = 1/2, then 16(sin(2θ) + cos(4θ) + sin(6θ)) is equal to:",
    options: [
      "23",
      "-27",
      "-23",
      "27"
    ],
    correct_index: 2,
    solution: "(sin θ + cos θ)² = 1/4 ⇒ 1 + sin 2θ = 1/4 ⇒ sin 2θ = -3/4. cos 4θ = 1 - 2 sin² 2θ = 1 - 2(-3/4)² = 1 - 9/8 = -1/8. sin 6θ = 3 sin 2θ - 4 sin³ 2θ = (3 - 4 sin² 2θ) sin 2θ = [3 - 4(9/16)](-3/4) = (3/4)(-3/4) = -9/16. Then 16[sin 2θ + cos 4θ + sin 6θ] = 16[-3/4 - 1/8 - 9/16] = -12 - 2 - 9 = -23.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 32,
    question_text: "A 10 inches long pencil AB with mid point C and a small eraser P are placed on the horizontal top of a table such that PC = √5 inches and ∠PCB = tan⁻¹(2). The acute angle through which the pencil must be rotated about C so that the perpendicular distance between eraser and pencil becomes exactly 1 inch is :",
    options: [
      "tan⁻¹(3/4)",
      "tan⁻¹(1/2)",
      "tan⁻¹(4/3)",
      "tan⁻¹(1)"
    ],
    correct_index: 0,
    solution: "Let the rotated pencil make angle α with CB, and let the angle between PC and the rotated pencil be β, so that ∠PCB = α + β = tan⁻¹(2) ⇒ tan(α + β) = 2. The perpendicular distance from P to the rotated pencil is PM = 1 inch. In right △PMC, sin β = PM / PC = 1 / √5 ⇒ tan β = 1/2. Now, tan α = tan((α + β) - β) = [tan(α + β) - tan β] / [1 + tan(α + β) tan β] = (2 - 1/2) / (1 + 2(1/2)) = (3/2) / 2 = 3/4. Thus, α = tan⁻¹(3/4).",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 33,
    question_text: "The value of 2 sin(π/8) sin(2π/8) sin(3π/8) sin(5π/8) sin(6π/8) sin(7π/8) is :",
    options: [
      "1 / (4√2)",
      "1 / 8",
      "1 / (8√2)",
      "1 / 4"
    ],
    correct_index: 1,
    solution: "sin(7π/8) = sin(π/8), sin(6π/8) = sin(2π/8) = sin(π/4) = 1/√2, sin(5π/8) = sin(3π/8) = cos(π/8). The product is 2 · sin²(π/8) · (1/√2)² · cos²(π/8) = 2 · (1/2) · [sin(π/8) cos(π/8)]² = [(1/2) sin(π/4)]² = [(1/2)(1/√2)]² = (1/(2√2))² = 1/8.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 34,
    question_text: "cosec 18° is a root of the equation:",
    options: [
      "x² - 2x - 4 = 0",
      "4x² + 2x - 1 = 0",
      "x² + 2x - 4 = 0",
      "x² - 2x + 4 = 0"
    ],
    correct_index: 0,
    solution: "sin 18° = (√5 - 1) / 4 ⇒ cosec 18° = 4 / (√5 - 1) = 4(√5 + 1) / 4 = √5 + 1. Setting x = √5 + 1 ⇒ x - 1 = √5 ⇒ (x - 1)² = 5 ⇒ x² - 2x + 1 = 5 ⇒ x² - 2x - 4 = 0.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 35,
    question_text: "The value of 2 sin 12° - sin 72° is",
    options: [
      "√5(1 - √3) / 4",
      "(1 - √5) / 8",
      "√3(1 - √5) / 2",
      "√3(1 - √5) / 4"
    ],
    correct_index: 3,
    solution: "2 sin 12° - sin 72° = sin 12° + (sin 12° - sin 72°) = sin 12° + 2 cos 42° sin(-30°) = sin 12° - cos 42° = sin 12° - sin 48° = 2 cos 30° sin(-18°) = -2(√3/2) sin 18° = -√3 · [(√5 - 1) / 4] = √3(1 - √5) / 4.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 36,
    question_text: "If sin²(10°) sin(20°) sin(40°) sin(50°) sin(70°) = α - (1/16) sin(10°), then 16 + α⁻¹ is equal to",
    options: [],
    correct_index: 80,
    question_type: "integer",
    solution: "Group the product as (sin 10° sin 50° sin 70°)(sin 10° sin 20° sin 40°). Using sin θ sin(60° - θ) sin(60° + θ) = (1/4) sin 3θ with θ = 10°: sin 10° sin 50° sin 70° = (1/4) sin 30° = 1/8. For sin 10° sin 20° sin 40° = cos 80° cos 70° cos 50°... Using product identities: the expression simplifies to (1/8)(1/8 - (1/2) sin 10°) = 1/64 - (1/16) sin 10°. Comparing with α - (1/16) sin 10°, we get α = 1/64. Therefore, 16 + α⁻¹ = 16 + 64 = 80.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 37,
    question_text: "16 sin(20°) sin(40°) sin(80°) is equal to",
    options: [
      "√3",
      "2√3",
      "3",
      "4√3"
    ],
    correct_index: 1,
    solution: "Using the identity sin θ sin(60° - θ) sin(60° + θ) = (1/4) sin 3θ with θ = 20°: sin 20° sin 40° sin 80° = (1/4) sin 60° = (1/4)(√3/2) = √3/8. Thus, 16 sin 20° sin 40° sin 80° = 16(√3/8) = 2√3.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 38,
    question_text: "The value of cos(2π/7) + cos(4π/7) + cos(6π/7) is equal to",
    options: [
      "-1",
      "-1/2",
      "-1/3",
      "-1/4"
    ],
    correct_index: 1,
    solution: "Multiply and divide by 2 sin(π/7): [2 cos(2π/7) sin(π/7) + 2 cos(4π/7) sin(π/7) + 2 cos(6π/7) sin(π/7)] / [2 sin(π/7)] = [sin(3π/7) - sin(π/7) + sin(5π/7) - sin(3π/7) + sin(7π/7) - sin(5π/7)] / [2 sin(π/7)] = [-sin(π/7) + sin π] / [2 sin(π/7)] = -sin(π/7) / [2 sin(π/7)] = -1/2.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 39,
    question_text: "α = sin 36° is a root of which of the following equation",
    options: [
      "16x⁴ - 20x² + 5 = 0",
      "16x⁴ + 20x² + 5 = 0",
      "10x⁴ - 10x² - 5 = 0",
      "16x⁴ - 10x² + 5 = 0"
    ],
    correct_index: 0,
    solution: "sin 36° = √(10 - 2√5) / 4. Let x = √(10 - 2√5) / 4 ⇒ 16x² = 10 - 2√5 ⇒ 2√5 = 10 - 16x² = 2(5 - 8x²) ⇒ √5 = 5 - 8x². Squaring both sides: 5 = (5 - 8x²)² = 25 - 80x² + 64x⁴ ⇒ 64x⁴ - 80x² + 20 = 0 ⇒ 16x⁴ - 20x² + 5 = 0.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 40,
    question_text: "If cot α = 1 and sec β = -5/3, where π < α < 3π/2 and π/2 < β < π, then the value of tan(α + β) and the quadrant in which α + β lies, respectively are",
    options: [
      "-1/7 and IVth quadrant",
      "7 and Ist quadrant",
      "-7 and IVth quadrant",
      "1/7 and Ist quadrant"
    ],
    correct_index: 0,
    solution: "In III quadrant, cot α = 1 ⇒ tan α = 1. In II quadrant, sec β = -5/3 ⇒ cos β = -3/5 ⇒ tan β = -4/3. tan(α + β) = [tan α + tan β] / [1 - tan α tan β] = [1 - 4/3] / [1 - (1)(-4/3)] = (-1/3) / (7/3) = -1/7. Also, π < α < 3π/2 and π/2 < β < π ⇒ 3π/2 < α + β < 5π/2. Since tan(α + β) is negative, α + β lies in the IVth quadrant.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 41,
    question_text: "The value of 2 sin(π/22) sin(3π/22) sin(5π/22) sin(7π/22) sin(9π/22) is equal to:",
    options: [
      "1 / 16",
      "5 / 16",
      "7 / 16",
      "3 / 16"
    ],
    correct_index: 0,
    solution: "Using sin θ = cos(π/2 - θ): sin(π/22) = cos(5π/11), sin(3π/22) = cos(4π/11), sin(5π/22) = cos(3π/11), sin(7π/22) = cos(2π/11), sin(9π/22) = cos(π/11). Since cos(3π/11) = -cos(8π/11) and cos(5π/11) = -cos(16π/11), the product becomes 2 cos(π/11) cos(2π/11) cos(4π/11) cos(8π/11) cos(16π/11) = 2 · sin(32π/11) / [2⁵ sin(π/11)] = 2 · sin(3π - π/11) / [32 sin(π/11)] = 2 / 32 = 1/16.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 42,
    question_text: "Let S = { θ ∈ (0, π/2) : ∑_{m=1}^9 sec(θ + (m - 1)π/6) sec(θ + mπ/6) = -8/√3 }. Then",
    options: [
      "S = { π/12 }",
      "S = { 2π/3 }",
      "∑_{θ ∈ S} θ = π/2",
      "∑_{θ ∈ S} θ = 3π/4"
    ],
    correct_index: 2,
    solution: "Each term sec(θ + (m - 1)π/6) sec(θ + mπ/6) = sin(π/6) / [sin(π/6) cos(θ + (m - 1)π/6) cos(θ + mπ/6)] = 2 [tan(θ + mπ/6) - tan(θ + (m - 1)π/6)]. Summing from m=1 to 9 telescopes to 2[tan(θ + 9π/6) - tan θ] = 2[tan(θ + 3π/2) - tan θ] = 2[-cot θ - tan θ] = -2(tan θ + cot θ). Given -2(tan θ + cot θ) = -8/√3 ⇒ tan θ + cot θ = 4/√3 ⇒ tan² θ - (4/√3) tan θ + 1 = 0 ⇒ tan θ = 1/√3 or √3. For θ ∈ (0, π/2), θ = π/6 or π/3. Thus S = { π/6, π/3 }, and ∑_{θ ∈ S} θ = π/6 + π/3 = π/2.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 43,
    question_text: "If tan 15° + 1/tan 75° + 1/tan 105° + tan 195° = 2a, then the value of (a + 1/a) is :",
    options: [
      "4",
      "4 - 2√3",
      "2",
      "5 - (3/2)√3"
    ],
    correct_index: 0,
    solution: "1/tan 75° = cot 75° = tan 15°. 1/tan 105° = cot 105° = -cot 75° = -tan 15°. tan 195° = tan(180° + 15°) = tan 15°. The sum is tan 15° + tan 15° - tan 15° + tan 15° = 2 tan 15°. Given 2a = 2 tan 15° ⇒ a = tan 15° = 2 - √3. Then 1/a = cot 15° = 2 + √3. Therefore, a + 1/a = (2 - √3) + (2 + √3) = 4.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 44,
    question_text: "The value of tan 9° - tan 27° - tan 63° + tan 81° is",
    options: [],
    correct_index: 4,
    question_type: "integer",
    solution: "(tan 9° + tan 81°) - (tan 27° + tan 63°) = (tan 9° + cot 9°) - (tan 27° + cot 27°) = 2 / sin 18° - 2 / sin 54° = 2(4 / (√5 - 1)) - 2(4 / (√5 + 1)) = 8 [ (√5 + 1 - (√5 - 1)) / (5 - 1) ] = 8 [ 2 / 4 ] = 4.",
    marks: 4,
    difficulty: "medium"
  }
];

