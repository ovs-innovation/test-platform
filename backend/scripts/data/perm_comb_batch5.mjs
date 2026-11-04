// Batch 5: Questions 101 to 125
export const batch5 = [
  {
    question_number: 101,
    question_text: "Let $P_1, P_2, \\dots, P_{15}$ be 15 points on a circle. The number of distinct triangles formed by points $P_i, P_j, P_k$ such that $i + j + k \\ne 15$, is:",
    options: ["455", "419", "437", "443"],
    correct_option: "D",
    solution_text: "Total number of triangles formed by choosing 3 points out of 15 on a circle:\n$^{15}C_3 = \\frac{15 \\times 14 \\times 13}{6} = 455$.\n\nNow count the triples $(i, j, k)$ with $1 \\le i < j < k \\le 15$ such that $i + j + k = 15$:\n- $i = 1: j + k = 14 \\implies (2, 12), (3, 11), (4, 10), (5, 9), (6, 8)$ (5 pairs)\n- $i = 2: j + k = 13 \\implies (3, 10), (4, 9), (5, 8), (6, 7)$ (4 pairs)\n- $i = 3: j + k = 12 \\implies (4, 8), (5, 7)$ (2 pairs)\n- $i = 4: j + k = 11 \\implies (5, 6)$ (1 pair)\n\nTotal triples with $i + j + k = 15$ is $5 + 4 + 2 + 1 = 12$.\n\nNumber of triangles such that $i + j + k \\ne 15$:\n$= 455 - 12 = 443$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 102,
    question_text: "In an examination, there are 5 multiple choice questions with 3 choices, out of which exactly one is correct. There are 3 marks for each correct answer, -2 marks for each wrong answer and 0 mark if the question is not attempted. Then, the number of ways a student appearing in the examination gets 5 marks is:",
    options: [],
    correct_option: null,
    numeric_answer: 40,
    solution_text: "Let $c$ be the number of correct answers, $w$ the number of wrong answers, and $u$ the number of unattempted questions.\nThen $c + w + u = 5$, where $c, w, u \\ge 0$.\nTotal marks obtained = $3c - 2w = 5$.\n\nSolving for $w$:\n$2w = 3c - 5$\nSince $w \\ge 0$ and $c + w \\le 5$:\n- If $c = 3 \\implies 2w = 4 \\implies w = 2, u = 0$.\n- No other integer solutions satisfy $c + w \\le 5$.\n\nThus, the student must answer 3 questions correctly and 2 questions incorrectly:\n- Number of ways to choose which 3 questions are correct: $^5C_3 = 10$.\n- Each correct question has 1 choice: $1^3 = 1$.\n- Each wrong question has 2 incorrect choices: $2^2 = 4$.\n\nTotal ways = 10 × 1 × 4 = 40.\n\nHence, the answer is 40.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 103,
    question_text: "The number of 7-digit numbers which are multiples of 11 and are formed using all the digits 1, 2, 3, 4, 5, 7 and 9 is:",
    options: [],
    correct_option: null,
    numeric_answer: 576,
    solution_text: "The given 7 digits are {1, 2, 3, 4, 5, 7, 9}, with sum = 31.\nLet the 7-digit number be $d_1 d_2 d_3 d_4 d_5 d_6 d_7$.\nLet $S_o = d_1 + d_3 + d_5 + d_7$ (4 digits) and $S_e = d_2 + d_4 + d_6$ (3 digits).\nThen $S_o + S_e = 31$.\nFor the number to be a multiple of 11, $S_o - S_e$ must be a multiple of 11.\nSince $S_o - S_e = 31 - 2S_e$ is odd, $S_o - S_e = 11$.\n$31 - 2S_e = 11 \\implies 2S_e = 20 \\implies S_e = 10$ and $S_o = 21$.\n\nWe choose 3 digits from {1, 2, 3, 4, 5, 7, 9} summing to $S_e = 10$:\nTriples summing to 10:\n1) {1, 2, 7}: remaining {3, 4, 5, 9} (sum = 21)\n2) {1, 4, 5}: remaining {2, 3, 7, 9} (sum = 21)\n3) {2, 3, 5}: remaining {1, 4, 7, 9} (sum = 21)\nThere are 3 such triples for $S_e$.\n\nFor each triple:\n- The 3 even positions can be filled in $3! = 6$ ways.\n- The 4 odd positions can be filled by the remaining 4 digits in $4! = 24$ ways.\nWays per triple = 6 × 24 = 144.\n\nAlso, if $S_o - S_e = -11$, then $2S_e = 42 \\implies S_e = 21$ and $S_o = 10$.\nTriples summing to 21 for $S_e$: {5, 7, 9} (1 triple).\nFor this triple:\n- Even positions in $3! = 6$ ways.\n- Odd positions in $4! = 24$ ways.\nWays = 6 × 24 = 144.\n\nTotal numbers = (3 × 144) + 144 = 432 + 144 = 576.\n\nHence, the answer is 576.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 104,
    question_text: "The number of 3-digit odd numbers, whose sum of digits is a multiple of 7, is:",
    options: [],
    correct_option: null,
    numeric_answer: 63,
    solution_text: "Let the 3-digit odd number be $a b c$, where $a \\in \\{1, 2, \\dots, 9\\}$, $b \\in \\{0, 1, \\dots, 9\\}$, and $c \\in \\{1, 3, 5, 7, 9\\}$.\nThe sum $S = a + b + c$ can be a multiple of 7: $S \\in \\{7, 14, 21\\}$.\nBy systematically counting the pairs $(a, b)$ for each odd units digit $c \\in \\{1, 3, 5, 7, 9\\}$:\nTotal number of such 3-digit odd numbers = 63.\n\nHence, the answer is 63.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 105,
    question_text: "The total number of three-digit numbers, with one digit repeated exactly two times, is:",
    options: [],
    correct_option: null,
    numeric_answer: 243,
    solution_text: "A 3-digit number has places: Hundreds, Tens, Units.\n\nCase 1: The repeated digit is 0:\nZero cannot be the hundreds digit, so it must be the tens and units digits (00).\nThe hundreds digit can be any of {1, 2, ..., 9} (9 choices).\nNumbers = 9.\n\nCase 2: The repeated digit is non-zero, and 0 is present:\n- Choose the repeated non-zero digit: 9 choices.\n- 0 can only occupy the tens or units place (2 choices).\nThe repeated digit fills the other two places.\nNumbers = 9 × 2 = 18.\n\nCase 3: Neither digit is 0:\n- Choose the repeated digit from {1, 2, ..., 9}: 9 choices.\n- Choose the distinct digit from the remaining 8 non-zero digits: 8 choices.\n- Arrange the 3 digits (with 1 repeated twice): $\\frac{3!}{2!} = 3$ ways.\nNumbers = 9 × 8 × 3 = 216.\n\nTotal three-digit numbers = 9 + 18 + 216 = 243.\n\nHence, the answer is 243.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 106,
    question_text: "There are ten boys $B_1, B_2, \\dots, B_{10}$ and five girls $G_1, G_2, \\dots, G_5$ in a class. Then the number of ways of forming a group consisting of three boys and three girls, if both $B_1$ and $B_2$ together should not be the members of a group, is:",
    options: [],
    correct_option: null,
    numeric_answer: 1120,
    solution_text: "Total boys = 10, total girls = 5. Select 3 boys and 3 girls.\n\nTotal selections without restriction:\n$= ^{10}C_3 \\times ^5C_3 = 120 \\times 10 = 1200$.\n\nSelections where both $B_1$ and $B_2$ are in the group:\n- Choose remaining 1 boy from the remaining 8 boys: $^8C_1 = 8$.\n- Choose 3 girls from 5 girls: $^5C_3 = 10$.\nWays = 8 × 10 = 80.\n\nSelections where both $B_1$ and $B_2$ are not together:\n$= 1200 - 80 = 1120$.\n\nHence, the answer is 1120.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 107,
    question_text: "The total number of 3-digit numbers, whose greatest common divisor with 36 is 2, is:",
    options: [],
    correct_option: null,
    numeric_answer: 150,
    solution_text: "Since $36 = 2^2 \\times 3^2$, $\\gcd(N, 36) = 2$ implies that $N$ is divisible by 2, but not by 4 and not by 3.\nThus, $N$ is an odd multiple of 2 (i.e. of the form $4k + 2$) and not divisible by 3.\n\n3-digit numbers of the form $4k + 2$ range from 102 to 998:\n$102 = 4(25) + 2$ to $998 = 4(249) + 2$.\nTotal such numbers = $249 - 25 + 1 = 225$.\n\nAmong these, those divisible by 3 are multiples of $\\text{lcm}(2, 3) = 6$ that are not divisible by 12, i.e., numbers of the form $12m + 6$:\nSmallest: $102 = 12(8) + 6$\nLargest: $990 = 12(82) + 6$\nNumber of multiples = $82 - 8 + 1 = 75$.\n\nTotal required numbers = 225 - 75 = 150.\n\nHence, the answer is 150.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 108,
    question_text: "The number of ways, 16 identical cubes, of which 11 are blue and rest are red, can be placed in a row so that between any two red cubes there should be at least 2 blue cubes, is:",
    options: [],
    correct_option: null,
    numeric_answer: 56,
    solution_text: "We have 5 red cubes and 11 blue cubes.\nPlacing the 5 red cubes in a row creates 4 spaces between them and 2 spaces at the ends (6 spaces in total): $x_1, x_2, x_3, x_4, x_5, x_6$.\nHere $x_1 + x_2 + x_3 + x_4 + x_5 + x_6 = 11$, with $x_2, x_3, x_4, x_5 \\ge 2$ and $x_1, x_6 \\ge 0$.\n\nLet $x_i' = x_i - 2$ for $i = 2, 3, 4, 5$.\nThen $x_1 + x_2' + x_3' + x_4' + x_5' + x_6 = 11 - 8 = 3$, with all variables $\\ge 0$.\n\nNumber of non-negative integer solutions:\n$^{3 + 6 - 1}C_{6 - 1} = ^8C_5 = ^8C_3 = \\frac{8 \\times 7 \\times 6}{6} = 56$.\n\nHence, the answer is 56.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 109,
    question_text: "The total number of 5-digit numbers, formed by using the digits 1, 2, 3, 5, 6, 7 without repetition, which are multiples of 6, is:",
    options: ["72", "48", "60", "36"],
    correct_option: "A",
    solution_text: "The available digits are {1, 2, 3, 5, 6, 7} (sum = 24).\nA 5-digit number is formed by excluding 1 digit.\nFor divisibility by 6, the number must be even (units digit 2 or 6) and its sum of digits must be divisible by 3.\nSince the sum of all 6 digits is 24 (divisible by 3), the excluded digit must be divisible by 3, so it is either 3 or 6.\n\nCase 1: The digit 3 is excluded.\nThe digits used are {1, 2, 5, 6, 7}.\nThe units place can be filled by 2 or 6 (2 choices).\nThe remaining 4 places can be filled in $4! = 24$ ways.\nNumbers = 2 × 24 = 48.\n\nCase 2: The digit 6 is excluded.\nThe digits used are {1, 2, 3, 5, 7}.\nThe units place can only be filled by 2 (1 choice).\nThe remaining 4 places can be filled in $4! = 24$ ways.\nNumbers = 1 × 24 = 24.\n\nTotal numbers = 48 + 24 = 72.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 110,
    question_text: "The number of ways to distribute 30 identical candies among four children $C_1, C_2, C_3$ and $C_4$ so that $C_2$ receives at least 4 and at most 7 candies, $C_3$ receives at least 2 and at most 6 candies, is equal to:",
    options: ["205", "615", "510", "430"],
    correct_option: "D",
    solution_text: "We want the number of non-negative integer solutions to:\n$C_1 + C_2 + C_3 + C_4 = 30$\nwhere $4 \\le C_2 \\le 7$, $2 \\le C_3 \\le 6$, and $C_1, C_4 \\ge 0$.\n\nLet $C_2' = C_2 - 4$ ($0 \\le C_2' \\le 3$) and $C_3' = C_3 - 2$ ($0 \\le C_3' \\le 4$).\nThen $C_1 + C_2' + C_3' + C_4 = 30 - 6 = 24$.\nThis is the coefficient of $x^{24}$ in:\n$(1 + x + x^2 + x^3)(1 + x + \\dots + x^4)(1 - x)^{-2}$\n$= (1 - x^4)(1 - x^5)(1 - x)^{-4}$\n$= (1 - x^4 - x^5 + x^9) \\sum_{k=0}^{\\infty} ^{k+3}C_3 x^k$\n$= ^{27}C_3 - ^{23}C_3 - ^{22}C_3 + ^{18}C_3$\n$= 2925 - 1771 - 1540 + 816 = 430$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 111,
    question_text: "Let $b_1 b_2 b_3 b_4$ be a 4-element permutation with $b_i \\in \\{1, 2, 3, \\dots, 100\\}$ for $1 \\le i \\le 4$ and $b_i \\ne b_j$ for $i \\ne j$, such that either $b_1, b_2, b_3$ are consecutive integers or $b_2, b_3, b_4$ are consecutive integers. Then the number of such permutations $b_1 b_2 b_3 b_4$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 18915,
    solution_text: "Let $A$ be the set of permutations where $b_1, b_2, b_3$ are consecutive integers (in increasing or decreasing order, or any consecutive triplet of values).\n- Number of sets of 3 consecutive integers in {1, ..., 100} is 98.\n- For each triplet, there are 97 choices for the 4th element $b_4$.\n$n(A) = 98 \\times 97 = 9506$.\n\nSimilarly, for permutations where $b_2, b_3, b_4$ are consecutive integers:\n$n(B) = 98 \\times 97 = 9506$.\n\nFor $A \\cap B$, all four elements $b_1, b_2, b_3, b_4$ form a consecutive sequence of 4 integers:\nNumber of sets of 4 consecutive integers = 97.\n\nBy Inclusion-Exclusion:\n$n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = 9506 + 9506 - 97 = 18915$.\n\nHence, the answer is 18915.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 112,
    question_text: "The total number of four-digit numbers such that each of the first three digits is divisible by the last digit, is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 1086,
    solution_text: "Let the 4-digit number be $a b c d$, where $a \\in \\{1, \\dots, 9\\}$, $b, c \\in \\{0, \\dots, 9\\}$, and $d \\in \\{1, \\dots, 9\\}$ is the last digit.\nEach of $a, b, c$ must be divisible by $d$ (note that 0 is divisible by every non-zero integer $d$):\n- $d = 1$: $a$ has 9 choices, $b$ has 10, $c$ has 10 $\\implies 9 \\times 10 \\times 10 = 900$.\n- $d = 2$: $a \\in \\{2, 4, 6, 8\\}$ (4), $b, c \\in \\{0, 2, 4, 6, 8\\}$ (5 each) $\\implies 4 \\times 5 \\times 5 = 100$.\n- $d = 3$: $a \\in \\{3, 6, 9\\}$ (3), $b, c \\in \\{0, 3, 6, 9\\}$ (4 each) $\\implies 3 \\times 4 \\times 4 = 48$.\n- $d = 4$: $a \\in \\{4, 8\\}$ (2), $b, c \\in \\{0, 4, 8\\}$ (3 each) $\\implies 2 \\times 3 \\times 3 = 18$.\n- $d = 5$: $a \\in \\{5\\}$ (1), $b, c \\in \\{0, 5\\}$ (2 each) $\\implies 1 \\times 2 \\times 2 = 4$.\n- For each $d \\in \\{6, 7, 8, 9\\}$: $a$ has 1 choice, $b, c$ have 2 choices each $\\implies 1 \\times 2 \\times 2 = 4$ per digit, for 4 digits: $4 \\times 4 = 16$.\n\nTotal four-digit numbers = 900 + 100 + 48 + 18 + 4 + 16 = 1086.\n\nHence, the answer is 1086.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 113,
    question_text: "The letters of the word 'MANKIND' are written in all possible orders and arranged in serial order as in an English dictionary. Then the serial number of the word 'MANKIND' is:",
    options: [],
    correct_option: null,
    numeric_answer: 1492,
    solution_text: "The letters of MANKIND in alphabetical order are: A, D, I, K, M, N, N (7 letters, N is repeated twice).\n\n1) Words starting with A, D, I, or K:\n$4 \\times \\frac{6!}{2!} = 4 \\times 360 = 1440$.\n\n2) Words starting with M:\n- Starting with MA:\n  - Starting with MAD, MAI: $2 \\times \\frac{4!}{2!} = 24$.\n  - Starting with MAK: $\\frac{4!}{2!} = 12$.\n  Total for MA preceding MAN = 36.\n- Starting with MAN:\n  - Starting with MAND, MANI: $2 \\times 3! = 12$.\n  - Starting with MANK:\n    - Starting with MANKD: $2! = 2$.\n    - Starting with MANKI:\n      - MANKIDN (1st)\n      - MANKIND (2nd)\n\nTotal words preceding MANKIND = 1440 + 36 + 12 + 2 + 1 = 1491.\nSerial number of MANKIND = 1491 + 1 = 1492.\n\nHence, the answer is 1492.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 114,
    question_text: "The number of 5-digit natural numbers, such that the product of their digits is 36, is:",
    options: [],
    correct_option: null,
    numeric_answer: 180,
    solution_text: "The product of the 5 digits is 36.\nPartitioning 36 into 5 digits with different frequencies of the digit 1:\n\nCase 1: Exactly one 1:\nDigits {2, 2, 3, 3, 1} $\\implies \\frac{5!}{2! 2!} = 30$.\n\nCase 2: Exactly two 1's:\n- {4, 3, 3, 1, 1} $\\implies \\frac{5!}{2! 2!} = 30$.\n- {6, 2, 3, 1, 1} $\\implies \\frac{5!}{2!} = 60$.\n- {9, 2, 2, 1, 1} $\\implies \\frac{5!}{2! 2!} = 30$.\nTotal for Case 2 = 30 + 60 + 30 = 120.\n\nCase 3: Exactly three 1's:\n- {4, 9, 1, 1, 1} $\\implies \\frac{5!}{3!} = 20$.\n- {6, 6, 1, 1, 1} $\\implies \\frac{5!}{2! 3!} = 10$.\nTotal for Case 3 = 20 + 10 = 30.\n\nTotal 5-digit natural numbers = 30 + 120 + 30 = 180.\n\nHence, the answer is 180.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 115,
    question_text: "Numbers are to be formed between 1000 and 3000, which are divisible by 4, using the digits 1, 2, 3, 4, 5 and 6 without repetition of digits. Then the total number of such numbers is:",
    options: [],
    correct_option: null,
    numeric_answer: 30,
    solution_text: "A number between 1000 and 3000 has 4 digits, with thousands digit equal to 1 or 2.\nFor divisibility by 4, the number formed by the last two digits must be divisible by 4.\n\nCase 1: Thousands digit is 1:\nLast two digits from {2, 3, 4, 5, 6} divisible by 4: {24, 32, 36, 52, 56, 64} (6 pairs).\nFor each pair, the hundreds digit can be chosen from the remaining 3 digits in 3 ways.\nNumbers = 6 × 3 = 18.\n\nCase 2: Thousands digit is 2:\nLast two digits from {1, 3, 4, 5, 6} divisible by 4: {16, 36, 56, 64} (4 pairs).\nFor each pair, the hundreds digit can be chosen from the remaining 3 digits in 3 ways.\nNumbers = 4 × 3 = 12.\n\nTotal numbers = 18 + 12 = 30.\n\nHence, the answer is 30.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 116,
    question_text: "Let $S$ be the set of all passwords which are six to eight characters long, where each character is either an alphabet from $\\{A, B, C, D, E\\}$ or a number from $\\{1, 2, 3, 4, 5\\}$ with the repetition of characters allowed. If the number of passwords in $S$ whose at least one character is a number from $\\{1, 2, 3, 4, 5\\}$ is $\\alpha \\times 5^6$, then $\\alpha$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 7073,
    solution_text: "Total available characters = 5 alphabets + 5 digits = 10 characters.\nPasswords with no numbers consist only of alphabets (5 choices per position).\n\n- Length 6: $10^6 - 5^6 = 5^6(2^6 - 1) = 5^6(63)$\n- Length 7: $10^7 - 5^7 = 5^7(2^7 - 1) = 5^6 \\times 5(127) = 5^6(635)$\n- Length 8: $10^8 - 5^8 = 5^8(2^8 - 1) = 5^6 \\times 25(255) = 5^6(6375)$\n\nTotal passwords with at least one number:\n$= 5^6(63 + 635 + 6375) = 7073 \\times 5^6$.\n\nComparing with $\\alpha \\times 5^6$, we have $\\alpha = 7073$.\n\nHence, the answer is 7073.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 117,
    question_text: "A class contains $b$ boys and $g$ girls. If the number of ways of selecting 3 boys and 2 girls from the class is 168, then $b + 3g$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 17,
    solution_text: "We are given:\n$^bC_3 \\times ^gC_2 = 168$\n$\\frac{b(b-1)(b-2)}{6} \\times \\frac{g(g-1)}{2} = 168$\n$b(b-1)(b-2) \\cdot g(g-1) = 2016$.\n\nFactoring 2016 as the product of 3 consecutive integers and 2 consecutive integers:\n$2016 = 336 \\times 6 = (8 \\times 7 \\times 6) \\times (3 \\times 2)$.\nThus, $b = 8$ and $g = 3$.\n\nTherefore:\n$b + 3g = 8 + 3(3) = 8 + 9 = 17$.\n\nHence, the answer is 17.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 118,
    question_text: "Let $S = \\{4, 6, 9\\}$ and $T = \\{9, 10, 11, \\dots, 1000\\}$. If $A = \\{a_1 + a_2 + \\dots + a_k : k \\in \\mathbb{N}, a_1, a_2, \\dots, a_k \\in S\\}$, then the sum of all the elements in the set $T - A$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 11,
    solution_text: "The set $A$ consists of all positive integers expressible as $4x + 6y + 9z$ where $x, y, z \\ge 0$ and $x + y + z \\ge 1$.\nTesting integers in $T = \\{9, 10, 11, \\dots, 1000\\}$:\n- $9 = 9 \\in A$\n- $10 = 4 + 6 \\in A$\n- 11 cannot be expressed as $4x + 6y + 9z$ for non-negative integers $x, y, z$, so $11 \\notin A$.\n- $12 = 4 \\times 3 \\in A$\n- $13 = 4 + 9 \\in A$\n- $14 = 4 \\times 2 + 6 \\in A$\n- $15 = 6 + 9 \\in A$\nSince four consecutive integers 12, 13, 14, 15 are in $A$, every integer $n \\ge 12$ can be formed by adding multiples of 4.\n\nThus, the only element in $T$ not in $A$ is 11.\nThe sum of all elements in $T - A$ is 11.\n\nHence, the answer is 11.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 119,
    question_text: "The number of natural numbers lying between 1012 and 23421 that can be formed using the digits 2, 3, 4, 5, 6 (repetition of digits is not allowed) and divisible by 55 is:",
    options: [],
    correct_option: null,
    numeric_answer: 6,
    solution_text: "For a number to be divisible by 55, it must be divisible by 5 and 11.\nSince the number is divisible by 5, the units digit must be 5.\n\nCase 1: 4-digit numbers ($a b c 5$):\n$a, b, c \\in \\{2, 3, 4, 6\\}$.\nFor divisibility by 11: $(a + c) - (b + 5) = 0 \\implies a + c = b + 5$.\n- $b = 2 \\implies a + c = 7 \\implies \\{a, c\\} = \\{3, 4\\}$ (3245, 4235 - 2 numbers)\n- $b = 3 \\implies a + c = 8 \\implies \\{a, c\\} = \\{2, 6\\}$ (2365, 6325 - 2 numbers)\n- $b = 4 \\implies a + c = 9 \\implies \\{a, c\\} = \\{3, 6\\}$ (3465, 6435 - 2 numbers)\nAll 6 numbers lie between 1012 and 23421.\n\nCase 2: 5-digit numbers ($a b c d 5$):\nThe smallest 5-digit number formed with leading digit 2 is $23465$, which is strictly greater than 23421.\nHence, no 5-digit number lies in the required range.\n\nTotal numbers = 6.\n\nHence, the answer is 6.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 120,
    question_text: "The number of 9-digit numbers, that can be formed using all the digits of the number 123412341 so that the even digits occupy only even places, is:",
    options: [],
    correct_option: null,
    numeric_answer: 60,
    solution_text: "The number 123412341 contains 9 digits:\nEven digits: 2, 2, 4, 4 (4 digits)\nOdd digits: 1, 1, 1, 3, 3 (5 digits)\n\nIn a 9-digit number, there are 4 even positions (2nd, 4th, 6th, 8th) and 5 odd positions.\n- Place the 4 even digits {2, 2, 4, 4} in the 4 even positions:\n  $\\frac{4!}{2! 2!} = 6$ ways.\n- Place the 5 odd digits {1, 1, 1, 3, 3} in the 5 odd positions:\n  $\\frac{5!}{3! 2!} = 10$ ways.\n\nTotal number of such 9-digit numbers = 6 × 10 = 60.\n\nHence, the answer is 60.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 121,
    question_text: "A boy needs to select five courses from 12 available courses, out of which 5 courses are language courses. If he can choose at most two language courses, then the number of ways he can choose five courses is:",
    options: [],
    correct_option: null,
    numeric_answer: 546,
    solution_text: "Total courses = 12 (5 language courses and 7 non-language courses). Select 5 courses.\nCondition: at most 2 language courses.\n\n- 0 language courses: $^5C_0 \\times ^7C_5 = 1 \\times 21 = 21$\n- 1 language course: $^5C_1 \\times ^7C_4 = 5 \\times 35 = 175$\n- 2 language courses: $^5C_2 \\times ^7C_3 = 10 \\times 35 = 350$\n\nTotal number of ways = 21 + 175 + 350 = 546.\n\nHence, the answer is 546.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 122,
    question_text: "The number of integers, greater than 7000 that can be formed, using the digits 3, 5, 6, 7, 8 without repetition is:",
    options: ["120", "168", "72", "48"],
    correct_option: "B",
    solution_text: "Available digits: {3, 5, 6, 7, 8} (5 digits).\n\nCase 1: 4-digit numbers > 7000:\n- Thousands place can be filled by 7 or 8 (2 choices).\n- The remaining 3 places are filled by the remaining 4 digits in $^4P_3 = 24$ ways.\nNumber of 4-digit numbers = 2 × 24 = 48.\n\nCase 2: 5-digit numbers:\n- Any 5-digit number formed from these digits is strictly greater than 7000.\nNumber of 5-digit numbers = $5! = 120$.\n\nTotal integers = 48 + 120 = 168.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 123,
    question_text: "Let $S = \\{1, 2, 3, 5, 7, 10, 11\\}$. The number of non-empty subsets of $S$ that have the sum of all elements a multiple of 3 is:",
    options: [],
    correct_option: null,
    numeric_answer: 43,
    solution_text: "The set $S$ has 7 elements, grouped modulo 3 as:\n$R_0 = \\{3\\}$ (1 element)\n$R_1 = \\{1, 7, 10\\}$ (3 elements)\n$R_2 = \\{2, 5, 11\\}$ (3 elements)\n\nA subset has sum divisible by 3 if the sum of elements from $R_1 \\cup R_2$ is $\\equiv 0 \\pmod 3$.\nBy generating functions or combinatorial cases:\n- Total subsets with sum $\\equiv 0 \\pmod 3$ from $R_1 \\cup R_2$ is 22 (including the empty subset).\n- Elements from $R_0 = \\{3\\}$ can be included or excluded independently (2 choices).\nTotal subsets of $S$ with sum $\\equiv 0 \\pmod 3$ = $2 \\times 22 = 44$.\nExcluding the empty subset gives:\n44 - 1 = 43.\n\nHence, the answer is 43.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 124,
    question_text: "Let $x$ and $y$ be distinct integers where $1 \\le x \\le 25$ and $1 \\le y \\le 25$. Then, the number of ways of choosing $x$ and $y$, such that $x + y$ is divisible by 5 is:",
    options: [],
    correct_option: null,
    numeric_answer: 120,
    solution_text: "Partition {1, 2, ..., 25} into 5 remainder classes modulo 5, each containing 5 elements:\n$G_0, G_1, G_2, G_3, G_4$.\n\nFor $x + y$ to be divisible by 5:\n1) Both $x, y \\in G_0$:\n   $x \\ne y \\implies 5 \\times 4 = 20$ pairs.\n2) One from $G_1$ and one from $G_4$:\n   $x \\in G_1, y \\in G_4 \\implies 5 \\times 5 = 25$\n   $x \\in G_4, y \\in G_1 \\implies 5 \\times 5 = 25$\n   Total = 50 pairs.\n3) One from $G_2$ and one from $G_3$:\n   $x \\in G_2, y \\in G_3 \\implies 5 \\times 5 = 25$\n   $x \\in G_3, y \\in G_2 \\implies 5 \\times 5 = 25$\n   Total = 50 pairs.\n\nTotal number of ways = 20 + 50 + 50 = 120.\n\nHence, the answer is 120.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 125,
    question_text: "The number of numbers, strictly between 5000 and 10000 can be formed using the digits 1, 3, 5, 7, 9 without repetition, is:",
    options: ["6", "12", "120", "72"],
    correct_option: "D",
    solution_text: "The available digits are {1, 3, 5, 7, 9} (5 distinct digits).\nA 4-digit number between 5000 and 10000 has:\n- Thousands place: can only be filled by 5, 7, or 9 (3 choices).\n- Hundreds place: 4 choices.\n- Tens place: 3 choices.\n- Units place: 2 choices.\n\nTotal numbers formed = 3 × 4 × 3 × 2 = 72.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  }
];

