export const trigEqBatch1 = [
  {
    question_number: 1,
    question_text: "The number of solution of tan x + sec x = 2 cos x in [0, 2π) is",
    options: [
      "2",
      "3",
      "0",
      "1"
    ],
    correct_index: 1,
    solution: "The given equation is tan x + sec x = 2 cos x ⇒ sin x + 1 = 2 cos² x ⇒ sin x + 1 = 2(1 - sin² x) ⇒ 2 sin² x + sin x - 1 = 0 ⇒ (2 sin x - 1)(sin x + 1) = 0 ⇒ sin x = 1/2 or sin x = -1. For x ∈ [0, 2π), this yields x = 30°, 150°, 270°, giving 3 solutions.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 2,
    question_text: "If 0 < x < π and cos x + sin x = 1/2, then tan x is",
    options: [
      "(1 - √7) / 4",
      "(4 - √7) / 3",
      "-(4 + √7) / 3",
      "(1 + √7) / 4"
    ],
    correct_index: 2,
    solution: "cos x + sin x = 1/2 ⇒ (cos x + sin x)² = 1/4 ⇒ 1 + sin 2x = 1/4 ⇒ sin 2x = -3/4. Since sin 2x < 0 and 0 < x < π, x lies in the second quadrant (π/2 < x < π), so tan x < 0. Expressing sin 2x in terms of tan x: 2 tan x / (1 + tan² x) = -3/4 ⇒ 3 tan² x + 8 tan x + 3 = 0 ⇒ tan x = [-8 ± √(64 - 36)] / 6 = (-4 ± √7) / 3. Since cos x + sin x = 1/2 > 0 and |cos x| > sin x for x near π, tan x must be -(4 + √7) / 3.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 3,
    question_text: "The number of values of x in the interval [0, 3π] satisfying the equation 2 sin² x + 5 sin x - 3 = 0 is",
    options: [
      "4",
      "6",
      "1",
      "2"
    ],
    correct_index: 0,
    solution: "2 sin² x + 5 sin x - 3 = 0 ⇒ (2 sin x - 1)(sin x + 3) = 0. Since sin x ∈ [-1, 1], sin x = 1/2. Within [0, 3π], the solutions are x = π/6, 5π/6, 13π/6, 17π/6. Thus, there are exactly 4 solutions.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 4,
    question_text: "The equation e^{sin x} - e^{-sin x} - 4 = 0 has",
    options: [
      "infinite number of real roots",
      "no real roots",
      "exactly one real root",
      "exactly four real roots"
    ],
    correct_index: 1,
    solution: "Let t = e^{sin x}. Since -1 ≤ sin x ≤ 1, 1/e ≤ t ≤ e. The equation becomes t - 1/t = 4 ⇒ t² - 4t - 1 = 0 ⇒ t = 2 ± √5. Since t > 0, t = 2 + √5 ≈ 4.236. But e^{sin x} ≤ e ≈ 2.718, so no real solution exists.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 5,
    question_text: "Statement-1: The number of common solutions of the trigonometric equations 2 sin² θ - cos 2θ = 0 and 2 cos² θ - 3 sin θ = 0 in the interval [0, 2π] is two.\nStatement-2: The number of solutions of the equation, 2 cos² θ - 3 sin θ = 0 in the interval [0, π] is two.",
    options: [
      "Statement-1 is true; Statement-2 is true; Statement-2 is a correct explanation for statement-1.",
      "Statement-1 is true; Statement-2 is true; Statement-2 is not a correct explanation for statement-1.",
      "Statement-1 is false; Statement-2 is true.",
      "Statement-1 is true; Statement-2 is false."
    ],
    correct_index: 1,
    solution: "2 sin² θ - cos 2θ = 0 ⇒ 4 sin² θ = 1 ⇒ sin θ = ±1/2. 2 cos² θ - 3 sin θ = 0 ⇒ 2 sin² θ + 3 sin θ - 2 = 0 ⇒ (2 sin θ - 1)(sin θ + 2) = 0 ⇒ sin θ = 1/2. The common solutions in [0, 2π] satisfy sin θ = 1/2, giving θ = π/6, 5π/6 (2 solutions). Statement-1 is true. In [0, π], 2 cos² θ - 3 sin θ = 0 gives θ = π/6, 5π/6 (2 solutions), so Statement-2 is also true, but it does not explain Statement-1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 6,
    question_text: "The number of solutions of the equation sin 2x - 2 cos x + 4 sin x = 4 in the interval [0, 5π] is :",
    options: [
      "3",
      "5",
      "4",
      "6"
    ],
    correct_index: 0,
    solution: "sin 2x - 2 cos x + 4 sin x - 4 = 0 ⇒ 2 cos x(sin x - 1) + 4(sin x - 1) = 0 ⇒ 2(sin x - 1)(cos x + 2) = 0. Since cos x + 2 ≠ 0, sin x = 1. In [0, 5π], the solutions are x = π/2, 5π/2, 9π/2, giving exactly 3 solutions.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 7,
    question_text: "Let A = { θ : sin(θ) = tan(θ) } and B = { θ : cos(θ) = 1 } be two sets. Then:",
    options: [
      "A = B",
      "A ⊄ B",
      "B ⊄ A",
      "A ⊂ B and B - A ≠ ∅"
    ],
    correct_index: 1,
    solution: "sin θ = tan θ ⇒ sin θ(1 - 1/cos θ) = 0 ⇒ sin θ = 0 or cos θ = 1. Thus A = { nπ : n ∈ Z }. Set B = { 2kπ : k ∈ Z }. Since odd multiples of π belong to A but not B, A is not contained in B (A ⊄ B).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 8,
    question_text: "The number of values of α in [0, 2π] for which 2 sin³ α - 7 sin² α + 7 sin α = 2, is :",
    options: [
      "3",
      "1",
      "6",
      "4"
    ],
    correct_index: 0,
    solution: "2 sin³ α - 7 sin² α + 7 sin α - 2 = 0 ⇒ 2(sin³ α - 1) - 7 sin α(sin α - 1) = 0 ⇒ (sin α - 1)(2 sin² α - 5 sin α + 2) = 0 ⇒ (sin α - 1)(2 sin α - 1)(sin α - 2) = 0. Since sin α ≠ 2: sin α = 1 ⇒ α = π/2; sin α = 1/2 ⇒ α = π/6, 5π/6. Hence there are 3 values of α in [0, 2π].",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 9,
    question_text: "If 2 cos θ + sin θ = 1 (θ ≠ π/2), then 7 cos θ + 6 sin θ is equal to:",
    options: [
      "1/2",
      "2",
      "11/2",
      "46/5"
    ],
    correct_index: 3,
    solution: "From 2 cos θ + sin θ = 1, squaring gives (2 cos θ + sin θ)² = 1 ⇒ 3 cos² θ + 4 sin θ cos θ = 0 ⇒ cos θ(3 cos θ + 4 sin θ) = 0. Since θ ≠ π/2, cos θ ≠ 0, so 3 cos θ + 4 sin θ = 0 ⇒ tan θ = -3/4. Then sec² θ = 1 + 9/16 = 25/16 ⇒ cos θ = 4/5, sin θ = 3/5. Therefore, 7 cos θ + 6 sin θ = 7(4/5) + 6(3/5) = 28/5 + 18/5 = 46/5.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 10,
    question_text: "If 0 ≤ x < 2π, then the number of real values of x, which satisfy the equation cos x + cos 2x + cos 3x + cos 4x = 0, is",
    options: [
      "7",
      "9",
      "3",
      "5"
    ],
    correct_index: 0,
    solution: "(cos x + cos 4x) + (cos 2x + cos 3x) = 2 cos(5x/2) cos(3x/2) + 2 cos(5x/2) cos(x/2) = 4 cos(5x/2) cos x cos(x/2) = 0. In [0, 2π): cos x = 0 gives x = π/2, 3π/2; cos(x/2) = 0 gives x = π; cos(5x/2) = 0 gives x = π/5, 3π/5, π, 7π/5, 9π/5. Combining distinct values gives { π/5, π/2, 3π/5, π, 7π/5, 3π/2, 9π/5 }, which is 7 solutions.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 11,
    question_text: "Let P = { θ : sin θ - cos θ = √2 cos θ } and Q = { θ : sin θ + cos θ = √2 sin θ }, be two sets. Then",
    options: [
      "P ⊂ Q and Q - P ≠ ∅",
      "Q ⊄ P",
      "P = Q",
      "P ⊄ Q"
    ],
    correct_index: 2,
    solution: "For P: sin θ = (√2 + 1) cos θ ⇒ tan θ = √2 + 1. For Q: cos θ = (√2 - 1) sin θ ⇒ tan θ = 1 / (√2 - 1) = √2 + 1. Since both conditions are identical, P = Q.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 12,
    question_text: "If sum of all the solutions of the equation 8 cos x · (cos(π/6 + x) · cos(π/6 - x) - 1/2) = 1 in [0, π] is kπ, then k is equal to:",
    options: [
      "20/9",
      "2/3",
      "13/9",
      "8/9"
    ],
    correct_index: 2,
    solution: "cos(π/6 + x) cos(π/6 - x) = cos²(π/6) - sin² x = 3/4 - sin² x. The equation becomes 8 cos x [3/4 - sin² x - 1/2] = 8 cos x [1/4 - sin² x] = 8 cos x [cos² x - 3/4] = 2(4 cos³ x - 3 cos x) = 2 cos 3x = 1 ⇒ cos 3x = 1/2. For x ∈ [0, π], 3x ∈ [0, 3π], so 3x = π/3, 5π/3, 7π/3 ⇒ x = π/9, 5π/9, 7π/9. Sum = 13π/9 ⇒ k = 13/9.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 13,
    question_text: "If tan A and tan B are the roots of the quadratic equation, 3x² - 10x - 25 = 0 then the value of 3 sin²(A + B) - 10 sin(A + B) · cos(A + B) - 25 cos²(A + B) is",
    options: [
      "25",
      "-25",
      "-10",
      "10"
    ],
    correct_index: 1,
    solution: "tan A + tan B = 10/3 and tan A tan B = -25/3. tan(A + B) = [tan A + tan B] / [1 - tan A tan B] = (10/3) / (1 + 25/3) = 10/28 = 5/14. The expression is cos²(A + B)[3 tan²(A + B) - 10 tan(A + B) - 25]. With tan(A + B) = 5/14, cos²(A + B) = 196/221 and 3(25/196) - 10(5/14) - 25 = -5525/196. The value is (196/221) · (-5525/196) = -25.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 14,
    question_text: "The number of solutions of sin 3x = cos 2x, in the interval (π/2, π) is",
    options: [
      "3",
      "4",
      "2",
      "1"
    ],
    correct_index: 3,
    solution: "sin 3x = cos 2x ⇒ 3 sin x - 4 sin³ x = 1 - 2 sin² x ⇒ 4 sin³ x - 2 sin² x - 3 sin x + 1 = 0 ⇒ (sin x - 1)(4 sin² x + 2 sin x - 1) = 0. In (π/2, π), sin x ≠ 1, so 4 sin² x + 2 sin x - 1 = 0 ⇒ sin x = (-1 + √5)/4 = sin 18° = sin 162°. There is only 1 solution in (π/2, π).",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 15,
    question_text: "Consider the following two statements.\nStatement p: The value of sin 120° can be divided by taking θ = 240° in the equation 2 sin(θ/2) = √(1 + sin θ) - √(1 - sin θ).\nStatement q: The angles A, B, C and D of any quadrilateral ABCD satisfy the equation cos((1/2)(A + C)) + cos((1/2)(B + D)) = 0.\nThen the truth values of p and q are respectively.",
    options: [
      "F, T",
      "T, T",
      "F, F",
      "T, F"
    ],
    correct_index: 0,
    solution: "For p: At θ = 240°, 2 sin 120° = √3, whereas √(1 + sin 240°) - √(1 - sin 240°) = √(1 - √3/2) - √(1 + √3/2) < 0, so LHS ≠ RHS; statement p is false. For q: In any quadrilateral, A + B + C + D = 2π ⇒ (A + C)/2 + (B + D)/2 = π ⇒ cos((B + D)/2) = -cos((A + C)/2) ⇒ cos((A + C)/2) + cos((B + D)/2) = 0; statement q is true. Hence the truth values are F, T.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 16,
    question_text: "If 0 ≤ x < π/2, then the number of values of x for which sin x - sin 2x + sin 3x = 0, is:",
    options: [
      "4",
      "3",
      "2",
      "1"
    ],
    correct_index: 2,
    solution: "sin x + sin 3x - sin 2x = 2 sin 2x cos x - sin 2x = sin 2x(2 cos x - 1) = 0. In [0, π/2): sin 2x = 0 gives x = 0; 2 cos x - 1 = 0 gives x = π/3. Thus, there are 2 solutions.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 17,
    question_text: "The sum of all values of θ ∈ (0, π/2) satisfying sin² 2θ + cos⁴ 2θ = 3/4 is",
    options: [
      "π/2",
      "3π/8",
      "5π/4",
      "π"
    ],
    correct_index: 0,
    solution: "1 - cos² 2θ + cos⁴ 2θ = 3/4 ⇒ (cos² 2θ - 1/2)² = 0 ⇒ cos² 2θ = 1/2 ⇒ 2 cos² 2θ - 1 = 0 ⇒ cos 4θ = 0. For θ ∈ (0, π/2), 4θ ∈ (0, 2π), so 4θ = π/2, 3π/2 ⇒ θ = π/8, 3π/8. Sum = π/8 + 3π/8 = π/2.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 18,
    question_text: "Let S = { θ ∈ [-2π, 2π] : 2 cos² θ + 3 sin θ = 0 }. Then the sum of the elements of S is:",
    options: [
      "π",
      "13π/6",
      "5π/3",
      "2π"
    ],
    correct_index: 3,
    solution: "2(1 - sin² θ) + 3 sin θ = 0 ⇒ 2 sin² θ - 3 sin θ - 2 = 0 ⇒ (2 sin θ + 1)(sin θ - 2) = 0 ⇒ sin θ = -1/2. In [-2π, 2π], the solutions are -5π/6, -π/6, 7π/6, 11π/6. Sum = -5π/6 - π/6 + 7π/6 + 11π/6 = 12π/6 = 2π.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 19,
    question_text: "All the pairs (x, y), that satisfy the inequality 2^{√(sin² x - 2 sin x + 5)} · (1 / 4^{sin² y}) ≤ 1 also satisfy the equation:",
    options: [
      "2 sin x = sin y",
      "sin x = 2 sin y",
      "|sin x| = |sin y|",
      "2 |sin x| = 3 sin y"
    ],
    correct_index: 2,
    solution: "2^{√((sin x - 1)² + 4)} ≤ 4^{sin² y} = 2^{2 sin² y} ⇒ √((sin x - 1)² + 4) ≤ 2 sin² y. The LHS is at least √4 = 2, while RHS is at most 2(1) = 2. Thus equality must hold: √((sin x - 1)² + 4) = 2 ⇒ sin x = 1, and 2 sin² y = 2 ⇒ |sin y| = 1. Therefore, |sin x| = |sin y| = 1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 20,
    question_text: "The number of solutions of the equation 1 + sin⁴ x = cos² 3x, x ∈ [-5π/2, 5π/2] is:",
    options: [
      "5",
      "7",
      "3",
      "4"
    ],
    correct_index: 0,
    solution: "1 + sin⁴ x = cos² 3x. Since 1 + sin⁴ x ≥ 1 and cos² 3x ≤ 1, equality holds only when 1 + sin⁴ x = 1 and cos² 3x = 1. sin⁴ x = 0 ⇒ sin x = 0 ⇒ x = kπ. In [-5π/2, 5π/2], the values are x = -2π, -π, 0, π, 2π (5 values). For each of these, cos² 3x = 1. Thus there are 5 solutions.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 21,
    question_text: "Let S be the set of all α ∈ R such that the equation, cos 2x + α sin x = 2α - 7 has a solution. Then S is equal to:",
    options: [
      "[3, 7]",
      "[2, 6]",
      "[1, 4]",
      "R"
    ],
    correct_index: 1,
    solution: "1 - 2 sin² x + α sin x = 2α - 7 ⇒ 2 sin² x - α sin x + 2α - 8 = 0 ⇒ (sin x - 2)(2 sin x - α + 4) = 0. Since sin x ≠ 2, sin x = (α - 4)/2. For a solution to exist: -1 ≤ (α - 4)/2 ≤ 1 ⇒ -2 ≤ α - 4 ≤ 2 ⇒ 2 ≤ α ≤ 6. Thus S = [2, 6].",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 22,
    question_text: "All possible values of θ ∈ [0, 2π] for which sin 2θ + tan 2θ > 0 lie in :",
    options: [
      "(0, π/2) ∪ (π, 3π/2)",
      "(0, π/2) ∪ (π/2, 3π/4) ∪ (π, 7π/6)",
      "(0, π/4) ∪ (π/2, 3π/4) ∪ (π, 5π/4) ∪ (3π/2, 7π/4)",
      "(0, π/4) ∪ (π/2, 3π/4) ∪ (3π/2, 11π/6)"
    ],
    correct_index: 2,
    solution: "sin 2θ + tan 2θ = tan 2θ(1 + cos 2θ) > 0. Since 1 + cos 2θ > 0 whenever cos 2θ ≠ -1, this requires tan 2θ > 0. For θ ∈ [0, 2π], 2θ ∈ [0, 4π], so 2θ ∈ (0, π/2) ∪ (π, 3π/2) ∪ (2π, 5π/2) ∪ (3π, 7π/2) ⇒ θ ∈ (0, π/4) ∪ (π/2, 3π/4) ∪ (π, 5π/4) ∪ (3π/2, 7π/4).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 23,
    question_text: "If 0 < x, y < π and cos x + cos y - cos(x + y) = 3/2, then sin x + cos y is equal to:",
    options: [
      "1/2",
      "√3 / 2",
      "(1 - √3) / 2",
      "(1 + √3) / 2"
    ],
    correct_index: 3,
    solution: "2 cos((x + y)/2) cos((x - y)/2) - 2 cos²((x + y)/2) + 1 = 3/2 ⇒ 4 cos²((x + y)/2) - 4 cos((x + y)/2) cos((x - y)/2) + cos²((x - y)/2) + sin²((x - y)/2) = 0 ⇒ (2 cos((x + y)/2) - cos((x - y)/2))² + sin²((x - y)/2) = 0. Thus sin((x - y)/2) = 0 ⇒ x = y, and 2 cos x - 1 = 0 ⇒ cos x = 1/2 ⇒ x = y = π/3. Then sin x + cos y = sin(π/3) + cos(π/3) = √3/2 + 1/2 = (1 + √3)/2.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 24,
    question_text: "If √3 (cos² x) = (√3 - 1) cos x + 1, then number of solutions of the given equation when x ∈ [0, π/2] is",
    options: [],
    correct_index: null,
    numeric_answer: 1,
    question_type: "integer",
    solution: "√3 cos² x - (√3 - 1) cos x - 1 = 0 ⇒ (√3 cos x + 1)(cos x - 1) = 0. In [0, π/2], cos x ≥ 0, so cos x = 1 ⇒ x = 0. Hence, there is only 1 solution.",
    marks: 4,
    difficulty: "easy"
  }
];
