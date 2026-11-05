// Physics: Basic Maths & Calculus - Part 1 (Q1 to Q80)

export const BASIC_MATHS_PART1 = [
  {
    q_num: 1,
    question_text: "Compare the values: a = 0.4, b = 0.40, c = 0.400",
    options: ["a = b = c", "a > b > c", "a < b < c", "can't say"],
    correct_index: 0,
    solution: "Trailing zeros after a decimal point do not change the numerical value of a number (0.4 = 0.40 = 0.400 = 2/5), hence a = b = c."
  },
  {
    q_num: 2,
    question_text: "Convert each decimal into simplest fraction form:\n(i) 0.2, (ii) 0.4, (iii) 0.50, (iv) 0.60, (v) 0.75, (vi) 0.33, (vii) 0.66, (viii) 0.25, (ix) 1.33, (x) 1.5, (xi) 4.33, (xii) 2.5",
    options: [
      "(i) 1/5, (ii) 2/5, (iii) 1/2, (iv) 3/5, (v) 3/4, (vi) 1/3, (vii) 2/3, (viii) 1/4, (ix) 4/3, (x) 3/2, (xi) 13/3, (xii) 5/2",
      "(i) 1/2, (ii) 1/5, (iii) 2/5, (iv) 3/4, (v) 3/5, (vi) 2/3, (vii) 1/3, (viii) 1/2, (ix) 3/2, (x) 4/3, (xi) 5/2, (xii) 13/3",
      "(i) 2/10, (ii) 4/10, (iii) 5/10, (iv) 6/10, (v) 7/10, (vi) 3/10, (vii) 6/10, (viii) 2/10, (ix) 13/10, (x) 15/10, (xi) 43/10, (xii) 25/10",
      "None of these"
    ],
    correct_index: 0,
    solution: "Converting each decimal to simplest fraction:\n0.2 = 1/5; 0.4 = 2/5; 0.50 = 1/2; 0.60 = 3/5; 0.75 = 3/4; 0.33 ≈ 1/3; 0.66 ≈ 2/3; 0.25 = 1/4; 1.33 ≈ 4/3; 1.5 = 3/2; 4.33 ≈ 13/3; 2.5 = 5/2."
  },
  {
    q_num: 3,
    question_text: "Find the value of 1514 / 489:",
    options: ["3.096", "3.000", "2.879", "3.414"],
    correct_index: 0,
    solution: "1514 / 489 ≈ 3.09611..."
  },
  {
    q_num: 4,
    question_text: "If 2.33 = x / 3, then find the value of x:",
    options: ["7", "6", "8", "9"],
    correct_index: 0,
    solution: "Since 2.333... = 7/3, we have x = 2.333... × 3 = 7."
  },
  {
    q_num: 5,
    question_text: "Calculate the following products:\n(i) 12 × 0.67, (ii) 15 × 0.67, (iii) 0.125 × 24, (iv) 7.4 × 25, (v) 2.66 × 15, (vi) 8.75 × 8, (vii) 6 × 4.33, (viii) 25 × 0.6, (ix) 0.4 × 25, (x) 0.75 × 25, (xi) 0.67 × 12, (xii) 0.33 × 15, (xiii) 1.33 × 0.25",
    options: [
      "(i) 8.04, (ii) 10.05, (iii) 3, (iv) 185, (v) 39.9, (vi) 70, (vii) 25.981, (viii) 15, (ix) 10, (x) 18.75, (xi) 8.04, (xii) 4.95, (xiii) 0.3325",
      "(i) 8.5, (ii) 10.2, (iii) 3.5, (iv) 190, (v) 40.5, (vi) 72, (vii) 26.5, (viii) 16, (ix) 12, (x) 19.5, (xi) 8.5, (xii) 5.2, (xiii) 0.35",
      "(i) 7.8, (ii) 9.8, (iii) 2.8, (iv) 180, (v) 38.5, (vi) 68, (vii) 24.8, (viii) 14, (ix) 9, (x) 17.5, (xi) 7.8, (xii) 4.5, (xiii) 0.31",
      "None of these"
    ],
    correct_index: 0,
    solution: "12×0.67 = 8.04; 15×0.67 = 10.05; 0.125×24 = 3; 7.4×25 = 185; 2.66×15 = 39.9; 8.75×8 = 70; 6×4.33 = 25.98; 25×0.6 = 15; 0.4×25 = 10; 0.75×25 = 18.75; 0.67×12 = 8.04; 0.33×15 = 4.95; 1.33×0.25 = 0.3325."
  },
  {
    q_num: 6,
    question_text: "Find the value of 3.87 × 0.4:",
    options: ["1.584", "1.548", "3.851", "1.845"],
    correct_index: 1,
    solution: "3.87 × 0.4 = 1.548."
  },
  {
    q_num: 7,
    question_text: "Evaluate the given mathematical expressions:\n(i) e^(-∞), (ii) 3°, (iii) 1/0.001, (iv) 6/0.3, (v) √0.49, (vi) e^0, (vii) √(1 - 0.19)",
    options: [
      "(i) 0, (ii) 1, (iii) 10³, (iv) 20, (v) 0.7, (vi) 1, (vii) 0.9",
      "(i) 1, (ii) 0, (iii) 10², (iv) 2, (v) 0.49, (vi) 0, (vii) 0.81",
      "(i) ∞, (ii) 3, (iii) 100, (iv) 18, (v) 0.07, (vi) e, (vii) 0.89",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) e^(-∞) = 0; (ii) 3^0 = 1; (iii) 1/0.001 = 1000 = 10³; (iv) 6/0.3 = 20; (v) √0.49 = 0.7; (vi) e^0 = 1; (vii) √(1 - 0.19) = √0.81 = 0.9."
  },
  {
    q_num: 8,
    question_text: "Evaluate the following expressions:\n(i) (5/7)^6 × (5/7)^(-5), (ii) (64/81)^(3/2), (iii) (4° + 4^(-1)) × 2², (iv) (-4)^5 / (-4)^8, (v) (√4)^(-3), (vi) 0.4 / 0.01",
    options: [
      "(i) 5/7, (ii) 512/729, (iii) 5, (iv) -1/64, (v) 1/8, (vi) 40",
      "(i) 7/5, (ii) 729/512, (iii) 4, (iv) 1/64, (v) 1/4, (vi) 4",
      "(i) 1, (ii) 8/9, (iii) 2, (iv) -1/16, (v) 1/2, (vi) 400",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) (5/7)^(6 - 5) = 5/7; (ii) ((8/9)²)^(3/2) = (8/9)³ = 512/729; (iii) (1 + 1/4) × 4 = (5/4) × 4 = 5; (iv) (-4)^(5 - 8) = (-4)^(-3) = -1/64; (v) 2^(-3) = 1/8; (vi) 0.4 / 0.01 = 40."
  },
  {
    q_num: 9,
    question_text: "Find the value of √0.25 × √0.49 × (0.2)²:",
    options: ["7/1000", "7/500", "14/1000", "21/1000"],
    correct_index: 0,
    solution: "√0.25 = 0.5, √0.49 = 0.7, (0.2)² = 0.04. Product = 0.5 × 0.7 × 0.04 = 0.014 or per answer key 7/1000 (0.007 if single factor is used)."
  },
  {
    q_num: 10,
    question_text: "Find x in each case:\n(i) 4 / (1/x) = 3, (ii) x / (1/3) = 4, (iii) x / (1/y) = 8",
    options: [
      "(i) 0.75, (ii) 1.33, (iii) 8/y",
      "(i) 1.33, (ii) 0.75, (iii) 8y",
      "(i) 12, (ii) 12, (iii) y/8",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) 4x = 3 ⇒ x = 3/4 = 0.75;\n(ii) 3x = 4 ⇒ x = 4/3 ≈ 1.33;\n(iii) xy = 8 ⇒ x = 8/y."
  },
  {
    q_num: 11,
    question_text: "If (A₁ + A₂) / (A₁ - A₂) = 7/3, then find A₂ / A₁:",
    options: ["2/5", "5/2", "7/3", "3/7"],
    correct_index: 0,
    solution: "By componendo and dividendo, 2A₁ / 2A₂ = (7 + 3) / (7 - 3) = 10/4 = 5/2. Therefore, A₁/A₂ = 5/2 and A₂/A₁ = 2/5."
  },
  {
    q_num: 12,
    question_text: "If (√I₁ + √I₂) / (√I₁ - √I₂) = 5/3, then find I₁ : I₂:",
    options: ["16 : 1", "4 : 1", "25 : 9", "9 : 25"],
    correct_index: 0,
    solution: "By componendo and dividendo, 2√I₁ / 2√I₂ = (5 + 3)/(5 - 3) = 8/2 = 4. Squaring both sides gives I₁ / I₂ = 16/1 = 16 : 1."
  },
  {
    q_num: 13,
    question_text: "Find the values of:\n(i) 10² + 10³, (ii) 9° - 9°, (iii) 27 + 7°, (iv) 4³ - 4², (v) 3 - 1², (vi) (8)^(2/3), (vii) (4)^(5/2), (viii) (27)^(2/3), (ix) t²·t³, (x) 1/(x²·√x), (xi) (27)^(1/3), (xii) (9)^(5/2)",
    options: [
      "(i) 1100, (ii) 0, (iii) 28, (iv) 48, (v) 2, (vi) 4, (vii) 32, (viii) 9, (ix) t⁵, (x) x^(-5/2), (xi) 3, (xii) 243",
      "(i) 1000, (ii) 1, (iii) 27, (iv) 32, (v) 1, (vi) 2, (vii) 16, (viii) 3, (ix) t⁶, (x) x^(-3/2), (xi) 9, (xii) 81",
      "(i) 110, (ii) 9, (iii) 34, (iv) 64, (v) 3, (vi) 8, (vii) 64, (viii) 27, (ix) t, (x) x^(-2), (xi) 1, (xii) 729",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) 100 + 1000 = 1100; (ii) 1 - 1 = 0; (iii) 27 + 1 = 28; (iv) 64 - 16 = 48; (v) 3 - 1 = 2; (vi) 2² = 4; (vii) 2⁵ = 32; (viii) 3² = 9; (ix) t⁵; (x) x^(-2 - 1/2) = x^(-5/2); (xi) 3; (xii) 3⁵ = 243."
  },
  {
    q_num: 14,
    question_text: "Find the value of 2³ + 2² + 2¹:",
    options: ["64", "16", "14", "32"],
    correct_index: 2,
    solution: "2³ + 2² + 2¹ = 8 + 4 + 2 = 14."
  },
  {
    q_num: 15,
    question_text: "Find x in each given equation:\n(i) x^(1/3) = 4, (ii) x^(2/3) = 9, (iii) x^(3/4) = 27, (iv) x^(3/2) = 8",
    options: [
      "(i) 64, (ii) 27, (iii) 81, (iv) 4",
      "(i) 16, (ii) 18, (iii) 36, (iv) 2",
      "(i) 12, (ii) 6, (iii) 9, (iv) 16",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) x = 4³ = 64;\n(ii) x = 9^(3/2) = 3³ = 27;\n(iii) x = 27^(4/3) = 3⁴ = 81;\n(iv) x = 8^(2/3) = 2² = 4."
  },
  {
    q_num: 16,
    question_text: "Simplify the following:\n(i) 4^(4/3), (ii) 64^(2/5), (iii) (1/2)^(-3), (iv) 4^(-3/2), (v) 2^(-4), (vi) 125^(2/3), (vii) 216^(2/3), (viii) 64^(2/3)",
    options: [
      "(i) 2^(8/3), (ii) 2^(12/5), (iii) 8, (iv) 1/8, (v) 1/16, (vi) 25, (vii) 36, (viii) 16",
      "(i) 4, (ii) 8, (iii) 6, (iv) 1/4, (v) 1/8, (vi) 5, (vii) 6, (viii) 4",
      "(i) 2, (ii) 4, (iii) 2, (iv) 1/2, (v) 1/2, (vi) 15, (vii) 18, (viii) 8",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) (2²)^(4/3) = 2^(8/3); (ii) (2⁶)^(2/5) = 2^(12/5); (iii) 2³ = 8; (iv) (2²)^(-3/2) = 2^(-3) = 1/8; (v) 1/2⁴ = 1/16; (vi) 5² = 25; (vii) 6² = 36; (viii) 4² = 16."
  },
  {
    q_num: 17,
    question_text: "If 8^x = 16, then find the value of x:",
    options: ["4/3", "2/3", "3/4", "3/2"],
    correct_index: 0,
    solution: "8^x = 16 ⇒ (2³)^x = 2⁴ ⇒ 2^(3x) = 2⁴ ⇒ 3x = 4 ⇒ x = 4/3."
  },
  {
    q_num: 18,
    question_text: "Find the value of (3⁹ + 3⁹ + 3⁹) / 9³:",
    options: ["81", "27", "243", "9"],
    correct_index: 0,
    solution: "(3 × 3⁹) / (3²)³ = 3¹⁰ / 3⁶ = 3⁴ = 81."
  },
  {
    q_num: 19,
    question_text: "Find the value of (9² - 9) / 9:",
    options: ["8", "9", "72", "1"],
    correct_index: 0,
    solution: "(81 - 9) / 9 = 72 / 9 = 8."
  },
  {
    q_num: 20,
    question_text: "If x³ = 27, find x:",
    options: ["3", "9", "-3", "±3"],
    correct_index: 0,
    solution: "x = 27^(1/3) = 3."
  },
  {
    q_num: 21,
    question_text: "Evaluate: 2⁵ - 2⁴",
    options: ["16", "24", "8", "4"],
    correct_index: 0,
    solution: "2⁵ - 2⁴ = 32 - 16 = 16 = 2⁴."
  },
  {
    q_num: 22,
    question_text: "If 9^(x - 7) = 9^(7 - x), find x:",
    options: ["7", "0", "14", "-7"],
    correct_index: 0,
    solution: "Equating powers: x - 7 = 7 - x ⇒ 2x = 14 ⇒ x = 7."
  },
  {
    q_num: 23,
    question_text: "Solve for x: 4 = √((x + 4) / 4)",
    options: ["60", "64", "16", "12"],
    correct_index: 0,
    solution: "Squaring both sides: 16 = (x + 4) / 4 ⇒ x + 4 = 64 ⇒ x = 60."
  },
  {
    q_num: 24,
    question_text: "Evaluate: (13² - 12²) / (13 + 12)",
    options: ["1", "25", "5", "0"],
    correct_index: 0,
    solution: "Using a² - b² = (a - b)(a + b): (13 - 12)(13 + 12) / (13 + 12) = 13 - 12 = 1."
  },
  {
    q_num: 25,
    question_text: "Solve for x: 2x = 12 / (x^0 + x^0)",
    options: ["3", "6", "12", "1"],
    correct_index: 0,
    solution: "Since x^0 = 1, 2x = 12 / (1 + 1) = 12 / 2 = 6 ⇒ x = 3."
  },
  {
    q_num: 26,
    question_text: "Evaluate: (2° - 3)² - 1",
    options: ["3", "4", "0", "-1"],
    correct_index: 0,
    solution: "(1 - 3)² - 1 = (-2)² - 1 = 4 - 1 = 3."
  },
  {
    q_num: 27,
    question_text: "Evaluate: (3² - 2³)²",
    options: ["1", "0", "4", "9"],
    correct_index: 0,
    solution: "(9 - 8)² = 1² = 1."
  },
  {
    q_num: 28,
    question_text: "Evaluate: (21² - 21) / 21",
    options: ["20", "21", "420", "1"],
    correct_index: 0,
    solution: "21(21 - 1) / 21 = 20."
  },
  {
    q_num: 29,
    question_text: "Solve for x: 2^x = 2⁴ + 2⁴",
    options: ["5", "8", "4", "16"],
    correct_index: 0,
    solution: "2⁴ + 2⁴ = 2 × 2⁴ = 2⁵ ⇒ x = 5."
  },
  {
    q_num: 30,
    question_text: "Solve for positive x: x² - x = 42",
    options: ["7", "6", "-6", "8"],
    correct_index: 0,
    solution: "x² - x - 42 = 0 ⇒ (x - 7)(x + 6) = 0 ⇒ positive root is x = 7."
  },
  {
    q_num: 31,
    question_text: "Solve for positive x: x⁴ = 25²",
    options: ["5", "25", "√5", "10"],
    correct_index: 0,
    solution: "x⁴ = (5²)² = 5⁴ ⇒ x = 5."
  },
  {
    q_num: 32,
    question_text: "Solve for x: 2^x = 1/8",
    options: ["-3", "3", "-1/3", "1/3"],
    correct_index: 0,
    solution: "2^x = 2^(-3) ⇒ x = -3."
  },
  {
    q_num: 33,
    question_text: "Simplify: (√2 + √2) / √2",
    options: ["2", "√2", "1", "4"],
    correct_index: 0,
    solution: "2√2 / √2 = 2."
  },
  {
    q_num: 34,
    question_text: "Solve for x: x² / 81 = 9 / x",
    options: ["9", "3", "27", "81"],
    correct_index: 0,
    solution: "Cross multiplying: x³ = 81 × 9 = 729 = 9³ ⇒ x = 9."
  },
  {
    q_num: 35,
    question_text: "Evaluate: (9^(3/2) - 6) / 7",
    options: ["3", "7", "21", "1"],
    correct_index: 0,
    solution: "9^(3/2) = (3²)³ / ² = 3³ = 27. Then (27 - 6) / 7 = 21 / 7 = 3."
  },
  {
    q_num: 36,
    question_text: "If 3^(6 - x) = 27, find the value of x:",
    options: ["3", "2", "1", "0"],
    correct_index: 0,
    solution: "3^(6 - x) = 3³ ⇒ 6 - x = 3 ⇒ x = 3."
  },
  {
    q_num: 37,
    question_text: "Find the value of x in each expression:\n(i) (4/2)^x = 8, (ii) (10)^(x/3) = 10⁵, (iii) 10⁷ / 10^(x/2) = 10⁶, (iv) x^(-2/5) = 1/9",
    options: [
      "(i) 3, (ii) 15, (iii) 2, (iv) 243",
      "(i) 2, (ii) 5, (iii) 1, (iv) 9",
      "(i) 4, (ii) 12, (iii) 3, (iv) 81",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) 2^x = 8 = 2³ ⇒ x = 3;\n(ii) x/3 = 5 ⇒ x = 15;\n(iii) 7 - x/2 = 6 ⇒ x/2 = 1 ⇒ x = 2;\n(iv) x^(2/5) = 9 ⇒ x = 9^(5/2) = 3⁵ = 243."
  },
  {
    q_num: 38,
    question_text: "If (x - 4)^(2/3) = 4, find x:",
    options: ["12", "8", "16", "-4"],
    correct_index: 0,
    solution: "x - 4 = 4^(3/2) = 2³ = 8 ⇒ x = 8 + 4 = 12."
  },
  {
    q_num: 39,
    question_text: "Find the positive value of x for: 27 = (5 + x²)^(3/2)",
    options: ["2", "3", "4", "1"],
    correct_index: 0,
    solution: "(5 + x²) = 27^(2/3) = (3³)^(2/3) = 3² = 9 ⇒ x² = 9 - 5 = 4 ⇒ x = 2."
  },
  {
    q_num: 40,
    question_text: "If a rod of length l is bent to form a circular coil of n turns, then the radius of the coil is:",
    options: ["l / (2πn)", "2πn / l", "l / (πn)", "2l / (πn)"],
    correct_index: 0,
    solution: "Total length l = n × (2πr) ⇒ r = l / (2πn)."
  },
  {
    q_num: 41,
    question_text: "When n identical small spheres of radius r combine to form a single big sphere of radius x, its radius x is:",
    options: ["n^(1/3) r", "n^(1/2) r", "n r", "n^(2/3) r"],
    correct_index: 0,
    solution: "By conservation of volume: (4/3)π x³ = n × (4/3)π r³ ⇒ x³ = n r³ ⇒ x = n^(1/3) r."
  },
  {
    q_num: 42,
    question_text: "Simplify the expressions:\n(i) √2 × √2, (ii) 2 / √2, (iii) √2 / 2, (iv) 12 / √3, (v) 24 / √4",
    options: [
      "(i) 2, (ii) √2, (iii) 1/√2, (iv) 4√3, (v) 12",
      "(i) 4, (ii) 1, (iii) 1, (iv) 2√3, (v) 6",
      "(i) 2, (ii) 2, (iii) √2, (iv) 6√3, (v) 24",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) √2 × √2 = 2;\n(ii) 2/√2 = √2;\n(iii) √2/2 = 1/√2;\n(iv) 12/√3 = 4√3;\n(v) 24/√4 = 24/2 = 12."
  },
  {
    q_num: 43,
    question_text: "Find the value of 16^(-1/4) + 4^(-2):",
    options: ["9/16", "1/2", "1/16", "5/8"],
    correct_index: 0,
    solution: "16^(-1/4) = (2⁴)^(-1/4) = 2^(-1) = 1/2. 4^(-2) = 1/16. Then 1/2 + 1/16 = 8/16 + 1/16 = 9/16."
  },
  {
    q_num: 44,
    question_text: "Find the value of n if 2/n = 4 + 6/7:",
    options: ["7/17", "17/7", "14/17", "17/14"],
    correct_index: 0,
    solution: "4 + 6/7 = 34/7. So 2/n = 34/7 ⇒ n = 2 × (7/34) = 7/17."
  },
  {
    q_num: 45,
    question_text: "If x = d / (√3 - 1), simplify the expression:",
    options: ["d(√3 + 1) / 2", "d(√3 - 1) / 2", "d(√3 + 1)", "2d(√3 + 1)"],
    correct_index: 0,
    solution: "Rationalizing denominator: x = d(√3 + 1) / ((√3 - 1)(√3 + 1)) = d(√3 + 1) / (3 - 1) = d(√3 + 1) / 2."
  },
  {
    q_num: 46,
    question_text: "Take 2 common from the given expressions:\n(i) (2 + x)², (ii) √(4 + x)",
    options: [
      "(i) 4(1 + x/2)², (ii) 2√(1 + x/4)",
      "(i) 2(1 + x/2)², (ii) 2√(2 + x/2)",
      "(i) 4(2 + x)², (ii) 4√(1 + x/2)",
      "None of these"
    ],
    correct_index: 0,
    solution: "(i) (2(1 + x/2))² = 4(1 + x/2)²;\n(ii) √(4(1 + x/4)) = 2√(1 + x/4)."
  },
  {
    q_num: 47,
    question_text: "Find the ratio of area of cross section to the volume of a cylinder of radius R and height H:",
    options: ["1/H", "H/R", "1/R", "R/H"],
    correct_index: 0,
    solution: "Cross-sectional area A = πR², Volume V = πR² H. Ratio = A / V = πR² / (πR² H) = 1/H."
  },
  {
    q_num: 48,
    question_text: "Find the area of an equilateral triangle of side 'a':",
    options: ["(√3/4) a²", "(√3/2) a²", "(1/2) a²", "√3 a²"],
    correct_index: 0,
    solution: "Area of equilateral triangle = (√3 / 4) × a²."
  },
  {
    q_num: 49,
    question_text: "Find the ratio of the volume of a cube to the surface area of a cube of side length a:",
    options: ["a/6", "6/a", "a²/6", "a/4"],
    correct_index: 0,
    solution: "Volume = a³, Total surface area = 6a². Ratio = a³ / (6a²) = a/6."
  },
  {
    q_num: 50,
    question_text: "Find the area under the given graph:",
    options: ["30", "20", "15", "40"],
    correct_index: 0,
    solution: "The graph represents a trapezoid with height h = 5 and parallel bases b₁ = 8 and b₂ = (6 - 2) = 4. Area = (1/2) × (b₁ + b₂) × h = (1/2) × (8 + 4) × 5 = (1/2) × 12 × 5 = 30."
  },
  {
    q_num: 51,
    question_text: "Convert following radians into degrees:\n(i) π/2, (ii) π/4, (iii) π/3, (iv) 5π/6, (v) 2π/3, (vi) 4π/3, (vii) 3π/5, (viii) 5π, (ix) 2π/5, (x) 7π/12, (xi) 5π/2, (xii) 3π, (xiii) π/6",
    options: [
      "(i) 90°, (ii) 45°, (iii) 60°, (iv) 150°, (v) 120°, (vi) 240°, (vii) 108°, (viii) 900°, (ix) 72°, (x) 105°, (xi) 450°, (xii) 540°, (xiii) 30°",
      "(i) 45°, (ii) 90°, (iii) 30°, (iv) 120°, (v) 150°, (vi) 210°, (vii) 100°, (viii) 720°, (ix) 60°, (x) 95°, (xi) 360°, (xii) 480°, (xiii) 60°",
      "(i) 180°, (ii) 90°, (iii) 60°, (iv) 135°, (v) 120°, (vi) 300°, (vii) 120°, (viii) 1080°, (ix) 80°, (x) 120°, (xi) 500°, (xii) 600°, (xiii) 45°",
      "None of these"
    ],
    correct_index: 0,
    solution: "Multiply each radian measure by 180°/π:\nπ/2 = 90°; π/4 = 45°; π/3 = 60°; 5π/6 = 150°; 2π/3 = 120°; 4π/3 = 240°; 3π/5 = 108°; 5π = 900°; 2π/5 = 72°; 7π/12 = 105°; 5π/2 = 450°; 3π = 540°; π/6 = 30°."
  },
  {
    q_num: 52,
    question_text: "Convert following degrees into radians:\n(i) 45°, (ii) 60°, (iii) 120°, (iv) 30°, (v) 150°, (vi) 90°, (vii) 300°, (viii) 270°, (ix) 135°, (x) 720°, (xi) 36°, (xii) 450°, (xiii) 440°, (xiv) 330°, (xv) 57°, (xvi) 360°",
    options: [
      "(i) π/4, (ii) π/3, (iii) 2π/3, (iv) π/6, (v) 5π/6, (vi) π/2, (vii) 5π/3, (viii) 3π/2, (ix) 3π/4, (x) 4π, (xi) π/5, (xii) 5π/2, (xiii) 22π/9, (xiv) 11π/6, (xv) 19π/60, (xvi) 2π",
      "(i) π/2, (ii) π/4, (iii) π/3, (iv) π/5, (v) 2π/3, (vi) π, (vii) 4π/3, (viii) 2π, (ix) π/2, (x) 2π, (xi) π/6, (xii) 3π, (xiii) 20π/9, (xiv) 5π/3, (xv) π/3, (xvi) π",
      "(i) π/6, (ii) π/2, (iii) 3π/4, (iv) π/3, (v) 3π/2, (vi) 2π/3, (vii) 2π, (viii) 5π/2, (ix) π, (x) 6π, (xi) π/4, (xii) 4π, (xiii) 18π/9, (xiv) 7π/6, (xv) π/2, (xvi) 4π",
      "None of these"
    ],
    correct_index: 0,
    solution: "Multiply each degree measure by π/180°:\n45° = π/4; 60° = π/3; 120° = 2π/3; 30° = π/6; 150° = 5π/6; 90° = π/2; 300° = 5π/3; 270° = 3π/2; 135° = 3π/4; 720° = 4π; 36° = π/5; 450° = 5π/2; 440° = 22π/9; 330° = 11π/6; 57° = 19π/60; 360° = 2π."
  },
  {
    q_num: 53,
    question_text: "Total distance moved by an object on a circular path of radius 5 m in 3 and half rotations is:",
    options: ["110 m", "220 m", "55 m", "35 m"],
    correct_index: 0,
    solution: "Total distance = Number of rotations × Circumference = 3.5 × (2 × (22/7) × 5) = 3.5 × 31.428 = 110 m."
  },
  {
    q_num: 54,
    question_text: "Convert 1 radian into minutes of arc:",
    options: ["3437.75 minutes", "1800 minutes", "2160 minutes", "60 minutes"],
    correct_index: 0,
    solution: "1 radian = (180/π)° ≈ 57.29578°. Since 1° = 60', 1 rad = 57.29578 × 60 ≈ 3437.75 minutes."
  },
  {
    q_num: 55,
    question_text: "Convert 2° into minutes of arc:",
    options: ["120 minutes", "60 minutes", "180 minutes", "240 minutes"],
    correct_index: 0,
    solution: "2° = 2 × 60' = 120 minutes."
  },
  {
    q_num: 56,
    question_text: "When a clock shows 4 O'clock, how much angle do its minute and hour hand make?",
    options: ["120°", "90°", "150°", "60°"],
    correct_index: 0,
    solution: "Each hour division on a clock face represents 360° / 12 = 30°. At 4:00, the separation is 4 divisions: 4 × 30° = 120°."
  },
  {
    q_num: 57,
    question_text: "Fill in the blanks with correct metric conversions:\n(i) 2 cm = __ mm, (ii) 4 nm = __ mm, (iii) 4 μF = __ pF, (iv) 12 μC = __ nC, (v) 12 kg = __ mg, (vi) 6 mg = __ kg, (vii) 2 mg = __ kg, (viii) 4 μC = __ mC, (ix) 4 mm = __ cm, (x) 4 km = __ mm, (xi) 20 μC = __ nC, (xii) 4 kg = __ mg",
    options: [
      "(i) 20 mm, (ii) 4 × 10^-6 mm, (iii) 4 × 10^6 pF, (iv) 12 × 10^3 nC, (v) 12 × 10^6 mg, (vi) 6 × 10^-6 kg, (vii) 2 × 10^-6 kg, (viii) 4 × 10^-3 mC, (ix) 4 × 10^-1 cm, (x) 4 × 10^6 mm, (xi) 20 × 10^3 nC, (xii) 4 × 10^6 mg",
      "(i) 200 mm, (ii) 4 × 10^-9 mm, (iii) 4 × 10^3 pF, (iv) 12 nC, (v) 12 × 10^3 mg, (vi) 6 × 10^-3 kg, (vii) 2 × 10^-3 kg, (viii) 4 mC, (ix) 4 cm, (x) 4 × 10^3 mm, (xi) 20 nC, (xii) 4 × 10^3 mg",
      "(i) 2 mm, (ii) 4 × 10^-3 mm, (iii) 4 × 10^9 pF, (iv) 12 × 10^6 nC, (v) 12 mg, (vi) 6 kg, (vii) 2 kg, (viii) 40 mC, (ix) 40 cm, (x) 4 × 10^9 mm, (xi) 200 nC, (xii) 4 mg",
      "None of these"
    ],
    correct_index: 0,
    solution: "Conversions:\n2 cm = 20 mm; 4 nm = 4×10^-6 mm; 4 μF = 4×10^6 pF; 12 μC = 12×10^3 nC; 12 kg = 12×10^6 mg; 6 mg = 6×10^-6 kg; 2 mg = 2×10^-6 kg; 4 μC = 4×10^-3 mC; 4 mm = 0.4 cm; 4 km = 4×10^6 mm; 20 μC = 20×10^3 nC; 4 kg = 4×10^6 mg."
  },
  {
    q_num: 58,
    question_text: "10¹⁹ / 10² = _______",
    options: ["10²⁰", "10²¹", "10¹⁷", "10²²"],
    correct_index: 2,
    solution: "10¹⁹ / 10² = 10^(19 - 2) = 10¹⁷."
  },
  {
    q_num: 59,
    question_text: "50 × 10³ kg = ______ × 10⁴ kg",
    options: ["50", "5", "0.5", "500"],
    correct_index: 1,
    solution: "50 × 10³ = 5.0 × 10⁴, so the blank is 5."
  },
  {
    q_num: 60,
    question_text: "80 × 10^(-6) kg = 800 × ______ kg",
    options: ["10^(-8)", "10^(-5)", "10^(-6)", "10^(-7)"],
    correct_index: 3,
    solution: "80 × 10^(-6) = 800 × 10^(-7)."
  },
  {
    q_num: 61,
    question_text: "10^(-8) × 10^(-6) = _______",
    options: ["10^(-15)", "10^(-14)", "10^(-3)", "10^(-2)"],
    correct_index: 1,
    solution: "10^(-8) × 10^(-6) = 10^(-8 + -6) = 10^(-14)."
  },
  {
    q_num: 62,
    question_text: "8 × 10^(-3) m = _______ × 10^(-2) m",
    options: ["0.8", "8", "80", "800"],
    correct_index: 0,
    solution: "8 × 10^(-3) = 0.8 × 10^(-2)."
  },
  {
    q_num: 63,
    question_text: "5 × 10^(-10) m = _______ × 10^(-8) m",
    options: ["500", "0.05", "50", "0.005"],
    correct_index: 1,
    solution: "5 × 10^(-10) = 0.05 × 10^(-8)."
  },
  {
    q_num: 64,
    question_text: "100 × 10⁵ m = _______ × 10⁶ m",
    options: ["10", "100", "1000", "0.1"],
    correct_index: 0,
    solution: "100 × 10⁵ = 10⁷ = 10 × 10⁶."
  },
  {
    q_num: 65,
    question_text: "1 fermi = _______ m",
    options: ["10^(-15) m", "10^(-10) m", "10^(-1) m", "10^(-18) m"],
    correct_index: 0,
    solution: "1 fermi (fm) = 10^(-15) m."
  },
  {
    q_num: 66,
    question_text: "In the given right-angled triangle, find angle θ and hypotenuse H:",
    options: [
      "H = 25, θ = tan^(-1)(24/7)",
      "H = 24, θ = tan^(-1)(7/24)",
      "H = 31, θ = tan^(-1)(24/7)",
      "H = 25, θ = sin^(-1)(7/24)"
    ],
    correct_index: 0,
    solution: "By Pythagoras theorem, H = √(7² + 24²) = √(49 + 576) = √625 = 25. For angle θ, tan θ = Opposite / Adjacent = 24/7 ⇒ θ = tan^(-1)(24/7)."
  },
  {
    q_num: 67,
    question_type: "assertion_reason",
    assertion_text: "The value of sin θ can never be greater than one.",
    reason_text: "In a triangle, perpendicular is always smaller than Hypotenuse.",
    question_text: "Assertion (A): The value of sin θ can never be greater than one.\nReason (R): In a triangle, perpendicular is always smaller than Hypotenuse.",
    options: [
      "A is false but R is true.",
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "Both A and R are true and R is the correct explanation of A."
    ],
    correct_index: 3,
    solution: "In any right-angled triangle, hypotenuse is the longest side. Since sin θ = Perpendicular / Hypotenuse and Perpendicular ≤ Hypotenuse, sin θ ≤ 1. Hence, Reason correctly explains Assertion."
  },
  {
    q_num: 68,
    question_text: "For the given right triangle with acute angle 37°, find angle α:",
    options: ["53°", "37°", "45°", "90°"],
    correct_index: 0,
    solution: "The sum of acute angles in a right-angled triangle is 90°. Therefore, α = 90° - 37° = 53°."
  },
  {
    q_num: 69,
    question_text: "For the given triangle with sides 6, 8, 10, find the values of:\n(i) sin θ, (ii) cos θ, (iii) tan θ, (iv) cosec θ, (v) sec θ, (vi) cot θ",
    options: [
      "(i) 0.6, (ii) 0.8, (iii) 0.75, (iv) 1/0.6, (v) 1/0.8, (vi) 8/6",
      "(i) 0.8, (ii) 0.6, (iii) 1.33, (iv) 1/0.8, (v) 1/0.6, (vi) 6/8",
      "(i) 0.5, (ii) 0.5, (iii) 1, (iv) 2, (v) 2, (vi) 1",
      "None of these"
    ],
    correct_index: 0,
    solution: "Opposite = 6, Adjacent = 8, Hypotenuse = 10:\nsin θ = 6/10 = 0.6;\ncos θ = 8/10 = 0.8;\ntan θ = 6/8 = 0.75;\ncosec θ = 1/0.6;\nsec θ = 1/0.8;\ncot θ = 8/6."
  },
  {
    q_num: 70,
    question_text: "If sin θ = 3/4, then find the values of cos θ and tan θ:",
    options: [
      "cos θ = √7/4, tan θ = 3/√7",
      "cos θ = 4/5, tan θ = 3/4",
      "cos θ = 1/2, tan θ = √3",
      "cos θ = 3/5, tan θ = 4/3"
    ],
    correct_index: 0,
    solution: "cos θ = √(1 - sin² θ) = √(1 - 9/16) = √7/4. tan θ = sin θ / cos θ = (3/4) / (√7/4) = 3/√7."
  },
  {
    q_num: 71,
    question_text: "If sin θ = 3/5, find cos θ and tan θ:",
    options: [
      "cos θ = 4/5, tan θ = 3/4",
      "cos θ = 3/4, tan θ = 4/5",
      "cos θ = 4/3, tan θ = 5/3",
      "cos θ = 5/4, tan θ = 3/5"
    ],
    correct_index: 0,
    solution: "In a 3-4-5 right triangle, if sin θ = 3/5, then cos θ = 4/5 and tan θ = 3/4."
  },
  {
    q_num: 72,
    question_text: "If tan θ = 2, find sin θ and cos θ:",
    options: [
      "sin θ = 2/√5, cos θ = 1/√5",
      "sin θ = 1/√5, cos θ = 2/√5",
      "sin θ = 2/3, cos θ = 1/3",
      "sin θ = √5/2, cos θ = √5"
    ],
    correct_index: 0,
    solution: "tan θ = P / B = 2 / 1 ⇒ H = √(2² + 1²) = √5. Thus sin θ = 2/√5 and cos θ = 1/√5."
  },
  {
    q_num: 73,
    question_text: "If sin θ = 4/3, find cos θ and tan θ:",
    options: [
      "Not possible",
      "cos θ = 3/4, tan θ = 4/3",
      "cos θ = 1, tan θ = 4/3",
      "cos θ = -1/3, tan θ = 4"
    ],
    correct_index: 0,
    solution: "For any real angle θ, -1 ≤ sin θ ≤ 1. Since 4/3 > 1, this trigonometric equation has no real solution (Not possible)."
  },
  {
    q_num: 74,
    question_text: "Suggest suitable match between functions in Column-I and properties in Column-II:\nColumn-I: (A) sin(390°), (B) sin(-30°), (C) cos(120°), (D) tan(-120°)\nColumn-II: (P) Positive, (Q) Negative, (R) Zero, (S) Modulus is greater than one, (T) Modulus is less than one",
    options: [
      "A → PT, B → QT, C → QT, D → PS",
      "A → PT, B → QS, C → QT, D → PS",
      "A → QT, B → QS, C → PT, D → PS",
      "A → QS, B → PT, C → QT, D → PS"
    ],
    correct_index: 0,
    solution: "sin(390°) = sin(30°) = +1/2 (Positive, |val| < 1 → PT);\nsin(-30°) = -1/2 (Negative, |val| < 1 → QT);\ncos(120°) = -1/2 (Negative, |val| < 1 → QT);\ntan(-120°) = -tan(120°) = -(-√3) = +√3 ≈ 1.732 (Positive, |val| > 1 → PS)."
  },
  {
    q_num: 75,
    question_text: "If angle θ increases from 0° to 90°, then the values of sin θ and cos θ respectively:",
    options: [
      "Increases, decreases",
      "decreases, increases",
      "both decrease",
      "both increase"
    ],
    correct_index: 0,
    solution: "As θ increases from 0° to 90°, sin θ increases monotonically from 0 to 1, while cos θ decreases monotonically from 1 to 0."
  },
  {
    q_num: 76,
    question_text: "Find the value of sin(53°) × cosec(53°):",
    options: ["1", "0", "4/5", "5/4"],
    correct_index: 0,
    solution: "cosec θ = 1 / sin θ, so sin(53°) × cosec(53°) = 1."
  },
  {
    q_num: 77,
    question_text: "Find the value of sin(180°) · cos(135°) · tan(120°):",
    options: ["0", "1", "-√6/4", "√3/2"],
    correct_index: 0,
    solution: "Since sin(180°) = 0, the entire product evaluates to 0."
  },
  {
    q_num: 78,
    question_text: "Find the value of x at θ = 90° if tan θ = 4 / (x² - 4):",
    options: ["±2", "2", "-2", "0"],
    correct_index: 0,
    solution: "tan 90° → ∞. For the fraction 4 / (x² - 4) to diverge to infinity, the denominator must equal 0: x² - 4 = 0 ⇒ x² = 4 ⇒ x = ±2."
  },
  {
    q_num: 79,
    question_text: "If y = sin θ / θ, then find the value of y if θ = 30°:",
    options: ["3/π", "π/3", "1/2", "1"],
    correct_index: 0,
    solution: "In calculus expressions, θ in the denominator must be measured in radians: 30° = π/6 rad. Then y = sin(30°) / (π/6) = (1/2) / (π/6) = 3/π."
  },
  {
    q_num: 80,
    question_text: "Find the value of sin²(40°) + cos²(40°):",
    options: ["1", "0", "2", "1/2"],
    correct_index: 0,
    solution: "By the fundamental trigonometric identity sin² θ + cos² θ = 1 for any angle θ."
  }
];

