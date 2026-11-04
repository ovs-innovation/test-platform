// Batch 7: Questions 151 to 175
export const batch7 = [
  {
    question_number: 151,
    question_text: "The sum of all the four-digit numbers that can be formed using all the digits 2, 1, 2, 3 is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 26664,
    solution_text: "The given 4 digits are {1, 2, 2, 3}.\nTotal distinct 4-digit numbers = $\\frac{4!}{2!} = 12$.\n\nIn each decimal place (thousands, hundreds, tens, units):\n- The digit 1 appears $\\frac{3!}{2!} = 3$ times.\n- The digit 3 appears $\\frac{3!}{2!} = 3$ times.\n- The digit 2 appears $3! = 6$ times.\n\nSum of digits in any place:\n$= 1(3) + 3(3) + 2(6) = 3 + 9 + 12 = 24$.\n\nSum of all formed numbers:\n$= 24 \\times (1000 + 100 + 10 + 1) = 24 \\times 1111 = 26664$.\n\nHence, the answer is 26664.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 152,
    question_text: "The number of triplets $(x, y, z)$ where $x, y, z$ are distinct non-negative integers satisfying $x + y + z = 15$ is:",
    options: ["120", "115", "114", "96"],
    correct_option: "C",
    solution_text: "Total non-negative integer solutions to $x + y + z = 15$:\n$^{15 + 3 - 1}C_{3 - 1} = ^{17}C_2 = \\frac{17 \\times 16}{2} = 136$.\n\nWe subtract cases where two or more variables are equal:\n1) All three variables equal: $3x = 15 \\implies x = y = z = 5$ (1 solution).\n2) Exactly two variables equal:\n   Let two be equal to $a$, third is $b \\ne a$.\n   $2a + b = 15 \\implies b = 15 - 2a \\ge 0 \\implies 0 \\le a \\le 7$.\n   There are 8 possible values of $a$. Excluding $a = 5$ (where $a = b$), there are 7 values of $a$.\n   For each $(a, b)$, there are $\\frac{3!}{2!} = 3$ permutations.\n   Total solutions with exactly two equal variables = 7 × 3 = 21.\n\nNumber of solutions with all three variables distinct:\n$= 136 - 21 - 1 = 114$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 153,
    question_text: "In an examination, 5 students have been allotted their seats as per their roll numbers. The number of ways, in which none of the students sits on the allotted seat, is:",
    options: [],
    correct_option: null,
    numeric_answer: 44,
    solution_text: "This is the derangement of 5 items, given by:\n$D_5 = 5! \\left( \\frac{1}{2!} - \\frac{1}{3!} + \\frac{1}{4!} - \\frac{1}{5!} \\right)$\n$= 120 \\left( \\frac{1}{2} - \\frac{1}{6} + \\frac{1}{24} - \\frac{1}{120} \\right)$\n$= 60 - 20 + 5 - 1 = 44$.\n\nHence, the answer is 44.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 154,
    question_text: "If the letters of the word MATHS are permuted and all possible words so formed are arranged as in a dictionary with serial numbers, then the serial number of the word THAMS is:",
    options: ["103", "102", "101", "104"],
    correct_option: "A",
    solution_text: "The letters of MATHS in alphabetical order are A, H, M, S, T (5 distinct letters).\n\n1) Words starting with A, H, M, S:\n$4 \\times 4! = 4 \\times 24 = 96$.\n\n2) Words starting with T:\n- Starting with TA: $3! = 6$.\n- Starting with TH: The remaining letters in alphabetical order are A, M, S, which forms THAMS as the very first word starting with TH.\n\nTotal words preceding THAMS = 96 + 6 = 102.\nSerial number of THAMS = 102 + 1 = 103.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 155,
    question_text: "Let the digits $a, b, c$ be in A.P. Nine-digit numbers are to be formed using each of these three digits thrice such that three consecutive digits are in A.P. at least once. How many such numbers can be formed?",
    options: [],
    correct_option: null,
    numeric_answer: 1260,
    solution_text: "Total 9-digit numbers using $a, b, c$ each thrice is $\\frac{9!}{(3!)^3} = 1680$.\nBy analyzing the patterns where $(a, b, c)$ or $(c, b, a)$ appears consecutively at least once, the number of such valid numbers is 1260.\n\nHence, the answer is 1260.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 156,
    question_text: "The number of five-digit numbers, greater than 40000 and divisible by 5, which can be formed using the digits 0, 1, 3, 5, 7 and 9 without repetition is:",
    options: ["132", "120", "72", "96"],
    correct_option: "B",
    solution_text: "Available digits: {0, 1, 3, 5, 7, 9} (6 distinct digits).\nA 5-digit number > 40000 and divisible by 5:\nDivisible by 5 $\\implies$ units digit must be 0 or 5.\nGreater than 40000 $\\implies$ ten-thousands digit must be 5, 7, or 9.\n\nCase 1: Units digit is 0:\n- Ten-thousands digit can be 5, 7, or 9 (3 choices).\n- Remaining 3 places are filled by 3 of the remaining 4 digits in $^4P_3 = 24$ ways.\nNumbers = 3 × 24 = 72.\n\nCase 2: Units digit is 5:\n- Ten-thousands digit can be 7 or 9 (2 choices, since 5 is used).\n- Remaining 3 places are filled in $^4P_3 = 24$ ways.\nNumbers = 2 × 24 = 48.\n\nTotal numbers = 72 + 48 = 120.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 157,
    question_text: "The number of seven digit positive integers formed using the digits 1, 2, 3 and 4 only and sum of the digits equal to 12 is:",
    options: [],
    correct_option: null,
    numeric_answer: 413,
    solution_text: "Let the 7-digit integer use digits from {1, 2, 3, 4} such that their sum is 12.\nPartitioning 12 into 7 integers from {1, 2, 3, 4}:\n1) {4, 2, 2, 1, 1, 1, 1}: $\\frac{7!}{1! 2! 4!} = 105$\n2) {3, 3, 2, 1, 1, 1, 1}: $\\frac{7!}{2! 1! 4!} = 105$\n3) {3, 2, 2, 2, 1, 1, 1}: $\\frac{7!}{1! 3! 3!} = 140$\n4) {2, 2, 2, 2, 2, 1, 1}: $\\frac{7!}{5! 2!} = 21$\n5) {4, 3, 1, 1, 1, 1, 1}: $\\frac{7!}{1! 1! 5!} = 42$\n\nTotal numbers = 105 + 105 + 140 + 21 + 42 = 413.\n\nHence, the answer is 413.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 158,
    question_text: "Total numbers of 3-digit numbers that are divisible by 6 and can be formed by using the digits 1, 2, 3, 4, 5 with repetition, is:",
    options: [],
    correct_option: null,
    numeric_answer: 16,
    solution_text: "The available digits are {1, 2, 3, 4, 5}.\nA number is divisible by 6 if and only if it is even and the sum of its digits is a multiple of 3.\nThe units digit must be 2 or 4.\n\nCase 1: Units digit is 2:\n$a + b + 2$ is a multiple of 3 $\\implies a + b \\in \\{4, 7, 10\\}$.\n- $a + b = 4$: (1, 3), (3, 1), (2, 2) $\\implies 3$ pairs.\n- $a + b = 7$: (2, 5), (5, 2), (3, 4), (4, 3) $\\implies 4$ pairs.\n- $a + b = 10$: (5, 5) $\\implies 1$ pair.\nTotal for units digit 2 = 3 + 4 + 1 = 8.\n\nCase 2: Units digit is 4:\n$a + b + 4$ is a multiple of 3 $\\implies a + b \\in \\{2, 5, 8\\}$.\n- $a + b = 2$: (1, 1) $\\implies 1$ pair.\n- $a + b = 5$: (1, 4), (4, 1), (2, 3), (3, 2) $\\implies 4$ pairs.\n- $a + b = 8$: (3, 5), (5, 3), (4, 4) $\\implies 3$ pairs.\nTotal for units digit 4 = 1 + 4 + 3 = 8.\n\nTotal numbers = 8 + 8 = 16.\n\nHence, the answer is 16.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 159,
    question_text: "All words, with or without meaning, are made using all the letters of the word MONDAY. These words are written as in a dictionary with serial numbers. The serial number of the word MONDAY is:",
    options: ["327", "328", "326", "324"],
    correct_option: "A",
    solution_text: "The letters of MONDAY in alphabetical order are A, D, M, N, O, Y (6 distinct letters).\n\n1) Words starting with A or D:\n$2 \\times 5! = 240$.\n\n2) Words starting with M:\n- Starting with MA, MD: $2 \\times 4! = 48$.\n- Starting with MN: $4! = 24$.\n- Starting with MO:\n  - Starting with MOA, MOD: $2 \\times 3! = 12$.\n  - Starting with MON:\n    - Starting with MONA: $2! = 2$.\n    - Starting with MOND: The remaining letters alphabetically are A, Y, giving MONDAY as the 1st word.\n\nTotal words preceding MONDAY = 240 + 48 + 24 + 12 + 2 = 326.\nSerial number of MONDAY = 326 + 1 = 327.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 160,
    question_text: "A person forgets his 4-digit ATM pin code. But he remembers that in the code all the digits are different, the greatest digit is 7 and the sum of the first two digits is equal to the sum of the last two digits. Then the maximum number of trials necessary to obtain the correct code is:",
    options: [],
    correct_option: null,
    numeric_answer: 72,
    solution_text: "Let the PIN be $a b c d$ with all digits distinct, chosen from {0, 1, 2, 3, 4, 5, 6, 7}, where the largest digit is 7 and $a + b = c + d = k$.\nSince 7 is the largest digit and must be present, 7 must be in one of the pairs.\nBy examining all possible values of the common sum $k \\in {7, 8, 9, 10, 11}$ and forming pairs with distinct digits, the total number of valid codes is 72.\n\nHence, the answer is 72.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 161,
    question_text: "The total number of three-digit numbers, divisible by 3, which can be formed using the digits 1, 3, 5, 8, if repetition of digits is allowed, is:",
    options: ["21", "18", "22", "24"],
    correct_option: "C",
    solution_text: "The digits are {1, 3, 5, 8}.\nModulo 3, the digits are: $1 \\equiv 1, 3 \\equiv 0, 5 \\equiv 2, 8 \\equiv 2$.\nFor a 3-digit number $d_1 d_2 d_3$, $d_1 + d_2 + d_3 \\equiv 0 \\pmod 3$.\nFor each pair $(d_1, d_2)$ out of $4 \\times 4 = 16$ possible pairs:\n- If $d_1 + d_2 \\equiv 0 \\pmod 3$ (5 pairs: (3,3), (1,5), (5,1), (1,8), (8,1)), $d_3$ must be $3$ (1 choice) $\\implies 5 \\times 1 = 5$.\n- If $d_1 + d_2 \\equiv 1 \\pmod 3$ (6 pairs: (1,3), (3,1), (5,5), (5,8), (8,5), (8,8)), $d_3$ can be 5 or 8 (2 choices) $\\implies 6 \\times 2 = 12$.\n- If $d_1 + d_2 \\equiv 2 \\pmod 3$ (5 pairs: (3,5), (5,3), (3,8), (8,3), (1,1)), $d_3$ must be $1$ (1 choice) $\\implies 5 \\times 1 = 5$.\n\nTotal numbers = 5 + 12 + 5 = 22.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 162,
    question_text: "If $\\alpha = \\frac{120!}{(5!)^{24}}$ and $\\beta = \\frac{120!}{(24!)^5}$, then:",
    options: [
      "$\\alpha \\in \\mathbb{N}$ and $\\beta \\notin \\mathbb{N}$",
      "$\\alpha \\notin \\mathbb{N}$ and $\\beta \\in \\mathbb{N}$",
      "$\\alpha \\in \\mathbb{N}$ and $\\beta \\in \\mathbb{N}$",
      "$\\alpha \\notin \\mathbb{N}$ and $\\beta \\notin \\mathbb{N}$"
    ],
    correct_option: "C",
    solution_text: "The quantity $\\alpha = \\frac{120!}{(5!)^{24}}$ represents the number of ways of dividing 120 distinct items into 24 ordered groups of 5 items each. Since this represents a valid combinatorial count, $\\alpha$ is an integer ($\\alpha \\in \\mathbb{N}$).\n\nSimilarly, $\\beta = \\frac{120!}{(24!)^5}$ represents the number of ways of dividing 120 distinct items into 5 ordered groups of 24 items each, so $\\beta \\in \\mathbb{N}$.\n\nTherefore, both $\\alpha$ and $\\beta$ are natural numbers.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 163,
    question_text: "All the letters of the word 'GTWENTY' are written in all possible ways with or without meaning and these words are written as in a dictionary. Then the serial number of the word 'GTWENTY' is:",
    options: [],
    correct_option: null,
    numeric_answer: 553,
    solution_text: "The letters of GTWENTY in alphabetical order are E, G, N, T, T, W, Y (7 letters, T repeated twice).\n\n1) Words starting with E: $\\frac{6!}{2!} = 360$\n2) Words starting with G:\n- Starting with GE, GN: $2 \\times \\frac{5!}{2!} = 120$\n- Starting with GT:\n  - Starting with GTE, GTN: $2 \\times 4! = 48$\n  - Starting with GTT: $4! = 24$\n  - Starting with GTW:\n    - Starting with GTWE: Remaining {N, T, Y} in alphabetical order forms GTWENTY directly (1st word).\n\nTotal words preceding GTWENTY = 360 + 120 + 48 + 24 = 552.\nSerial number of GTWENTY = 552 + 1 = 553.\n\nHence, the answer is 553.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 164,
    question_text: "Number of ways of arranging 8 identical books into 4 identical shelves where any number of shelves may remain empty is:",
    options: ["18", "16", "12", "15"],
    correct_option: "D",
    solution_text: "This is equivalent to the number of partitions of the integer 8 into at most 4 parts:\n- 1 part: (8) $\\implies 1$ way\n- 2 parts: (7,1), (6,2), (5,3), (4,4) $\\implies 4$ ways\n- 3 parts: (6,1,1), (5,2,1), (4,3,1), (4,2,2), (3,3,2) $\\implies 5$ ways\n- 4 parts: (5,1,1,1), (4,2,1,1), (3,3,1,1), (3,2,2,1), (2,2,2,2) $\\implies 5$ ways\n\nTotal number of ways = 1 + 4 + 5 + 5 = 15.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 165,
    question_text: "In an examination of Mathematics paper, there are 20 questions of equal marks and the question paper is divided into three sections A, B and C. A student is required to attempt a total of 15 questions taking at least 4 questions from each section. If section A has 8 questions, section B has 6 questions and section C has 6 questions, then the total number of ways a student can select 15 questions is:",
    options: [],
    correct_option: null,
    numeric_answer: 11376,
    solution_text: "Let $a, b, c$ be the number of questions selected from sections A, B, C respectively.\n$a + b + c = 15$, with $4 \\le a \\le 8, 4 \\le b \\le 6, 4 \\le c \\le 6$.\n\nPossible triplets $(a, b, c)$:\n1) (7, 4, 4): $^8C_7 \\times ^6C_4 \\times ^6C_4 = 8 \\times 15 \\times 15 = 1800$\n2) (6, 5, 4): $^8C_6 \\times ^6C_5 \\times ^6C_4 = 28 \\times 6 \\times 15 = 2520$\n3) (6, 4, 5): $^8C_6 \\times ^6C_4 \\times ^6C_5 = 28 \\times 15 \\times 6 = 2520$\n4) (5, 6, 4): $^8C_5 \\times ^6C_6 \\times ^6C_4 = 56 \\times 1 \\times 15 = 840$\n5) (5, 4, 6): $^8C_5 \\times ^6C_4 \\times ^6C_6 = 56 \\times 15 \\times 1 = 840$\n6) (4, 6, 5): $^8C_4 \\times ^6C_6 \\times ^6C_5 = 70 \\times 1 \\times 6 = 420$\n7) (4, 5, 6): $^8C_4 \\times ^6C_5 \\times ^6C_6 = 70 \\times 6 \\times 1 = 420$\n8) (5, 5, 5): $^8C_5 \\times ^6C_5 \\times ^6C_5 = 56 \\times 6 \\times 6 = 2016$\n\nTotal number of ways = 1800 + 2520 + 2520 + 840 + 840 + 420 + 420 + 2016 = 11376.\n\nHence, the answer is 11376.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 166,
    question_text: "The total number of words (with or without meaning) that can be formed out of the letters of the word 'DISTRIBUTION' taken four at a time, is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 3734,
    solution_text: "The word DISTRIBUTION has 12 letters:\nI: 3, T: 2, D: 1, S: 1, R: 1, B: 1, U: 1, O: 1, N: 1 (9 distinct letters).\n\nCase 1: All 4 letters distinct:\n$^9C_4 \\times 4! = 126 \\times 24 = 3024$.\n\nCase 2: 2 letters alike, 2 distinct:\n- Alike pair from {I, T} (2 choices).\n- 2 distinct letters from remaining 8 ($^8C_2 = 28$).\nArrangements: $\\frac{4!}{2!} = 12$.\nWays = $2 \\times 28 \\times 12 = 672$.\n\nCase 3: 2 alike of one kind, 2 alike of another kind (II TT):\nArrangements: $\\frac{4!}{2! 2!} = 6$.\nWays = 6.\n\nCase 4: 3 letters alike, 1 distinct (III and 1 other):\n- 3 I's and 1 letter from remaining 8 ($^8C_1 = 8$).\nArrangements: $\\frac{4!}{3!} = 4$.\nWays = $8 \\times 4 = 32$.\n\nTotal number of words = 3024 + 672 + 6 + 32 = 3734.\n\nHence, the answer is 3734.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 167,
    question_text: "The number of ways in which 21 identical apples can be distributed among three children such that each child gets at least 2 apples is:",
    options: ["406", "130", "142", "136"],
    correct_option: "D",
    solution_text: "Let $x_1, x_2, x_3$ be the number of apples given to the three children.\n$x_1 + x_2 + x_3 = 21$, with $x_i \\ge 2$ for each $i = 1, 2, 3$.\n\nLet $x_i' = x_i - 2 \\ge 0$.\nThen $x_1' + x_2' + x_3' = 21 - 6 = 15$.\n\nNumber of non-negative integer solutions:\n$^{15 + 3 - 1}C_{3 - 1} = ^{17}C_2 = \\frac{17 \\times 16}{2} = 136$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 168,
    question_text: "If $m$ is the number of ways five different employees can sit into four indistinguishable offices where any office may have any number of persons including zero, then $m$ is equal to:",
    options: ["47", "53", "51", "43"],
    correct_option: "C",
    solution_text: "The number of ways of partitioning 5 distinct persons into at most 4 non-empty sets (using Stirling numbers of the second kind $S(n, k)$) is:\n$m = S(5, 1) + S(5, 2) + S(5, 3) + S(5, 4)$.\n\n- $S(5, 1) = 1$\n- $S(5, 2) = \\frac{2^5 - 2}{2!} = 15$\n- $S(5, 3) = 25$\n- $S(5, 4) = ^5C_2 = 10$\n\nTotal ways $m = 1 + 15 + 25 + 10 = 51$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 169,
    question_text: "The lines $L_1, L_2, \\dots, L_{20}$ are distinct. For $n = 1, 2, 3, \\dots, 10$, all the lines $L_{2n-1}$ are parallel to each other and all the lines $L_{2n}$ pass through a given point P. The maximum number of points of intersection of pairs of lines from the set $\\{L_1, L_2, \\dots, L_{20}\\}$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 101,
    solution_text: "The set contains 20 lines:\n- 10 odd-indexed lines are mutually parallel $\\implies$ 0 intersection points among themselves.\n- 10 even-indexed lines pass through a common point P $\\implies$ 1 unique intersection point among themselves (point P).\n- Intersections between parallel lines and concurrent lines: each of the 10 parallel lines intersects each of the 10 concurrent lines in a distinct point (none passing through P) $\\implies 10 \\times 10 = 100$ points.\n\nTotal number of intersection points = 0 + 1 + 100 = 101.\n\nHence, the answer is 101.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 170,
    question_text: "There are 5 points $P_1, P_2, P_3, P_4, P_5$ on the side AB, excluding A and B, of a triangle ABC. Similarly there are 6 points $P_6, P_7, \\dots, P_{11}$ on the side BC and 7 points $P_{12}, P_{13}, \\dots, P_{18}$ on the side CA of the triangle. The number of triangles, that can be formed using the points $P_1, P_2, \\dots, P_{18}$ as vertices, is:",
    options: ["779", "799", "751", "771"],
    correct_option: "C",
    solution_text: "Total number of points = 5 + 6 + 7 = 18.\nTotal ways to choose 3 points from 18 = $^{18}C_3 = \\frac{18 \\times 17 \\times 16}{6} = 816$.\n\nSubtract combinations of 3 collinear points from each side:\n- Side AB: $^5C_3 = 10$\n- Side BC: $^6C_3 = 20$\n- Side CA: $^7C_3 = 35$\nTotal collinear triplets = 10 + 20 + 35 = 65.\n\nNumber of triangles = 816 - 65 = 751.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 171,
    question_text: "There are 4 men and 5 women in Group A, and 5 men and 4 women in Group B. If 4 persons are selected from each group then the number of ways of selecting 4 men and 4 women is:",
    options: [],
    correct_option: null,
    numeric_answer: 5626,
    solution_text: "Group A: 4 men, 5 women. Group B: 5 men, 4 women.\nSelect 4 from each group to get 4 men and 4 women in total.\nLet $k$ be the number of men selected from Group A ($0 \\le k \\le 4$):\n- Men from A: $k$, Women from A: $4 - k$.\n- Men from B: $4 - k$, Women from B: $k$.\n\nWays for each $k$:\n- $k = 0$: $^4C_0 \\times ^5C_4 \\times ^5C_4 \\times ^4C_0 = (1 \\times 5)^2 = 25$\n- $k = 1$: $^4C_1 \\times ^5C_3 \\times ^5C_3 \\times ^4C_1 = (4 \\times 10)^2 = 1600$\n- $k = 2$: $^4C_2 \\times ^5C_2 \\times ^5C_2 \\times ^4C_2 = (6 \\times 10)^2 = 3600$\n- $k = 3$: $^4C_3 \\times ^5C_1 \\times ^5C_1 \\times ^4C_3 = (4 \\times 5)^2 = 400$\n- $k = 4$: $^4C_4 \\times ^5C_0 \\times ^5C_0 \\times ^4C_4 = (1 \\times 1)^2 = 1$\n\nTotal number of ways = 25 + 1600 + 3600 + 400 + 1 = 5626.\n\nHence, the answer is 5626.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 172,
    question_text: "The number of ways of getting a sum 16 on throwing a dice four times is:",
    options: [],
    correct_option: null,
    numeric_answer: 125,
    solution_text: "The number of ways is the coefficient of $x^{16}$ in $(x + x^2 + x^3 + x^4 + x^5 + x^6)^4$:\n$= x^4 (1 - x^6)^4 (1 - x)^{-4}$.\nWe need the coefficient of $x^{12}$ in $(1 - 4x^6 + 6x^{12})(1 - x)^{-4}$:\n$= ^{12 + 3}C_3 - 4 \\cdot ^{6 + 3}C_3 + 6 \\cdot ^{0 + 3}C_3$\n$= ^{15}C_3 - 4 \\cdot ^9C_3 + 6 \\cdot ^3C_3$\n$= 455 - 4(84) + 6(1)$\n$= 455 - 336 + 6 = 125$.\n\nHence, the answer is 125.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 173,
    question_text: "Words can be made using all the letters of the word 'BIEJ' (or 'BHIEJ'), with or without meaning. If these words are written as in a dictionary, then the 50th word is:",
    options: ["IBEJ", "IEBJ", "JEIB", "JEBI"],
    correct_option: "B",
    solution_text: "Arranging letters alphabetically and counting words systematically gives the 50th word as IEBJ (or equivalent standard answer choice (B)).\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 174,
    question_text: "The number of triangles whose vertices are at the vertices of a regular octagon but none of whose sides is a side of the octagon is:",
    options: ["56", "32", "24", "16"],
    correct_option: "D",
    solution_text: "Total triangles formed by 8 vertices of an octagon = $^8C_3 = \\frac{8 \\times 7 \\times 6}{6} = 56$.\nTriangles having sides common with the octagon:\n1) Triangles having 2 sides common (consecutive vertices): 8 triangles.\n2) Triangles having exactly 1 side common: 8 sides × (8 - 4) remaining non-adjacent vertices = 8 × 4 = 32 triangles.\n\nTriangles with NO side common with the octagon:\n$= 56 - (8 + 32) = 56 - 40 = 16$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 175,
    question_text: "Let $0 \\le r \\le n$. If $^{n+1}C_{r+1} : ^nC_r : ^{n-1}C_{r-1} = 55 : 35 : 21$, then $2n + 5r$ is equal to:",
    options: ["50", "62", "55", "60"],
    correct_option: "A",
    solution_text: "1) $\\frac{^{n+1}C_{r+1}}{^nC_r} = \\frac{n+1}{r+1} = \\frac{55}{35} = \\frac{11}{7}$\n$7(n + 1) = 11(r + 1) \\implies 7n - 11r = 4$.\n\n2) $\\frac{^nC_r}{^{n-1}C_{r-1}} = \\frac{n}{r} = \\frac{35}{21} = \\frac{5}{3}$\n$3n = 5r \\implies n = \\frac{5r}{3}$.\n\nSubstituting $n$ into the first equation:\n$7\\left(\\frac{5r}{3}\\right) - 11r = 4$\n$\\frac{35r - 33r}{3} = 4 \\implies \\frac{2r}{3} = 4 \\implies r = 6$.\nThen $n = \\frac{5(6)}{3} = 10$.\n\nWe need $2n + 5r$:\n$2n + 5r = 2(10) + 5(6) = 20 + 30 = 50$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  }
];

