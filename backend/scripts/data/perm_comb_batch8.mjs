// Batch 8: Questions 176 to 200
export const batch8 = [
  {
    question_number: 176,
    question_text: "If all the words with or without meaning made using all the letters of the word 'NAGPUR' are arranged as in a dictionary, then the word at 315th position in this arrangement is:",
    options: ["NRAGUP", "NRAPUG", "NRAPGU", "NRAGPU"],
    correct_option: "C",
    solution_text: "The letters of NAGPUR in alphabetical order are A, G, N, P, R, U (6 distinct letters).\n\n1) Words starting with A: $5! = 120$\n2) Words starting with G: $5! = 120$ (Total = 240)\n3) Words starting with N:\n- Starting with NA: $4! = 24$ (Total = 264)\n- Starting with NG: $4! = 24$ (Total = 288)\n- Starting with NP: $4! = 24$ (Total = 312)\n- Starting with NR:\n  - 313th word: NRAGPU\n  - 314th word: NRAGUP\n  - 315th word: NRAPGU\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 177,
    question_text: "The number of 3-digit numbers, formed using the digits 2, 3, 4, 5 and 7, when the repetition of digits is not allowed, and which are not divisible by 3, is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 36,
    solution_text: "Total 3-digit numbers formed using {2, 3, 4, 5, 7} without repetition = $5 \\times 4 \\times 3 = 60$.\nTriplets of digits whose sum is divisible by 3:\n- {2, 3, 4} (sum = 9) $\\implies 3! = 6$\n- {2, 3, 7} (sum = 12) $\\implies 3! = 6$\n- {3, 4, 5} (sum = 12) $\\implies 3! = 6$\n- {3, 5, 7} (sum = 15) $\\implies 3! = 6$\nTotal 3-digit numbers divisible by 3 = $4 \\times 6 = 24$.\n\nNumber of 3-digit numbers not divisible by 3 = $60 - 24 = 36$.\n\nHence, the answer is 36.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 178,
    question_text: "The number of ways five alphabets can be chosen from the alphabets of the word MATHEMATICS, where the chosen alphabets are not necessarily distinct, is equal to:",
    options: ["179", "175", "181", "168"],
    correct_option: "A",
    solution_text: "The word MATHEMATICS has 11 letters: M: 2, A: 2, T: 2, H: 1, E: 1, I: 1, C: 1, S: 1 (8 distinct letters).\nWe choose 5 letters:\n\n1) All 5 distinct:\nChoose 5 from 8 distinct letters: $^8C_5 = 56$.\n\n2) 2 alike of one kind and 3 distinct:\n- Choose 1 alike pair from {M, A, T}: $^3C_1 = 3$.\n- Choose 3 distinct letters from the remaining 7 distinct letters: $^7C_3 = 35$.\nWays = 3 × 35 = 105.\n\n3) 2 alike of one kind, 2 alike of second kind, and 1 distinct:\n- Choose 2 pairs from {M, A, T}: $^3C_2 = 3$.\n- Choose 1 distinct letter from the remaining 6 distinct letters: $^6C_1 = 6$.\nWays = 3 × 6 = 18.\n\nTotal number of ways = 56 + 105 + 18 = 179.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 179,
    question_text: "The number of integers, between 100 and 1000 having the sum of their digits equals to 14, is:",
    options: [],
    correct_option: null,
    numeric_answer: 70,
    solution_text: "Let the 3-digit number be $a b c$ where $a \\in \\{1, \\dots, 9\\}$ and $b, c \\in \\{0, \\dots, 9\\}$.\n$a + b + c = 14$.\nLet $a' = a - 1 \\ge 0$, then $a' + b + c = 13$, with constraints $a' \\le 8, b \\le 9, c \\le 9$.\nTotal non-negative integer solutions: $^{13 + 3 - 1}C_{3 - 1} = ^{15}C_2 = 105$.\nSubtract solutions violating constraints:\n- $a' \\ge 9 \\implies a'' + b + c = 4 \\implies ^6C_2 = 15$.\n- $b \\ge 10 \\implies a' + b' + c = 3 \\implies ^5C_2 = 10$.\n- $c \\ge 10 \\implies a' + b + c' = 3 \\implies ^5C_2 = 10$.\nNo two constraints can be violated simultaneously.\nTotal valid integers = $105 - (15 + 10 + 10) = 105 - 35 = 70$.\n\nHence, the answer is 70.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 180,
    question_text: "From all the English alphabets, five letters are chosen and are arranged in alphabetical order. The total number of ways, in which the middle letter is 'M', is:",
    options: ["5148", "6084", "4356", "14950"],
    correct_option: "A",
    solution_text: "The English alphabet has 26 letters. 'M' is the 13th letter.\nThere are 12 letters preceding M (A to L) and 13 letters following M (N to Z).\nWhen 5 letters are chosen and arranged in alphabetical order with 'M' as the middle (3rd) letter:\n- 2 letters must be chosen from the 12 letters before M: $^{12}C_2 = \\frac{12 \\times 11}{2} = 66$.\n- 2 letters must be chosen from the 13 letters after M: $^{13}C_2 = \\frac{13 \\times 12}{2} = 78$.\n\nTotal number of ways = 66 × 78 = 5148.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 181,
    question_text: "In a group of 3 girls and 4 boys, there are two boys $B_1$ and $B_2$. The number of ways, in which these girls and boys can stand in a queue such that all the girls stand together, all the boys stand together, but $B_1$ and $B_2$ are not adjacent to each other, is:",
    options: ["96", "144", "120", "72"],
    correct_option: "B",
    solution_text: "There are two groups: Girls (3) and Boys (4).\n- The two groups can be ordered in $2! = 2$ ways: (Girls, then Boys) or (Boys, then Girls).\n- The 3 girls can be arranged among themselves in $3! = 6$ ways.\n- For the 4 boys with $B_1$ and $B_2$ not adjacent:\n  Total arrangements of 4 boys = $4! = 24$.\n  Arrangements with $B_1, B_2$ adjacent = $3! \\times 2! = 12$.\n  Arrangements with $B_1, B_2$ not adjacent = $24 - 12 = 12$ ways.\n\nTotal arrangements = $2 \\times 3! \\times 12 = 2 \\times 6 \\times 12 = 144$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 182,
    question_text: "The number of words, which can be formed using all the letters of the word 'DAUGHTER', so that all the vowels never come together, is:",
    options: ["36000", "37000", "34000", "38000"],
    correct_option: "A",
    solution_text: "The word DAUGHTER contains 8 distinct letters:\nVowels: A, U, E (3 vowels); Consonants: D, G, H, T, R (5 consonants).\n\nTotal permutations of all 8 letters = $8! = 40320$.\n\nPermutations where all 3 vowels come together:\nTreat the 3 vowels as a single block: (AUE).\nTogether with the 5 consonants, there are 6 objects to arrange: $6! = 720$ ways.\nThe 3 vowels can arrange among themselves in $3! = 6$ ways.\nNumber of words with vowels together = $720 \\times 6 = 4320$.\n\nNumber of words where vowels never come together:\n$= 40320 - 4320 = 36000$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 183,
    question_text: "The number of ways, 5 boys and 4 girls can sit in a row so that either all the boys sit together or no two boys sit together, is:",
    options: [],
    correct_option: null,
    numeric_answer: 17280,
    solution_text: "Let $A$ be the event that all 5 boys sit together and $B$ the event that no two boys sit together.\n\n1) All 5 boys sit together:\nTreat the 5 boys as 1 block. Together with 4 girls, there are 5 entities to arrange: $5! = 120$ ways.\nThe 5 boys arrange among themselves in $5! = 120$ ways.\n$n(A) = 5! \\times 5! = 120 \\times 120 = 14400$.\n\n2) No two boys sit together:\nArrange 4 girls in a row in $4! = 24$ ways.\nThis creates 5 gaps (including ends) for the 5 boys.\nThe 5 boys can be placed in these 5 gaps in $5! = 120$ ways.\n$n(B) = 4! \\times 5! = 24 \\times 120 = 2880$.\n\nSince 5 boys sitting together and no two boys sitting together are mutually exclusive ($A \\cap B = \\emptyset$):\nTotal ways = $n(A) + n(B) = 14400 + 2880 = 17280$.\n\nHence, the answer is 17280.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 184,
    question_text: "Group A consists of 7 boys and 3 girls, while group B consists of 6 boys and 5 girls. The number of ways, 4 boys and 4 girls can be invited for a picnic if 5 of them must be from group A and the remaining 3 from group B, is equal to:",
    options: ["8750", "9100", "8925", "8575"],
    correct_option: "C",
    solution_text: "Group A: 7 boys, 3 girls. Group B: 6 boys, 5 girls.\nTotal invitees = 4 boys and 4 girls (8 persons), with 5 from Group A and 3 from Group B.\nLet $g_A$ be girls from A and $b_A$ boys from A ($b_A + g_A = 5$, $g_A \\le 3$):\n\n1) $g_A = 1, b_A = 4$:\n   Boys from B = 0, Girls from B = 3.\n   $^7C_4 \\times ^3C_1 \\times ^6C_0 \\times ^5C_3 = 35 \\times 3 \\times 1 \\times 10 = 1050$.\n\n2) $g_A = 2, b_A = 3$:\n   Boys from B = 1, Girls from B = 2.\n   $^7C_3 \\times ^3C_2 \\times ^6C_1 \\times ^5C_2 = 35 \\times 3 \\times 6 \\times 10 = 6300$.\n\n3) $g_A = 3, b_A = 2$:\n   Boys from B = 2, Girls from B = 1.\n   $^7C_2 \\times ^3C_3 \\times ^6C_2 \\times ^5C_1 = 21 \\times 1 \\times 15 \\times 5 = 1575$.\n\nTotal ways = 1050 + 6300 + 1575 = 8925.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 185,
    question_text: "The number of different 5 digit numbers greater than 50000 that can be formed using the digits 0, 1, 2, 3, 4, 5, 6, 7, such that the sum of their first and last digits should not be more than 8, is:",
    options: ["4608", "5720", "5719", "4607"],
    correct_option: "D",
    solution_text: "The digits available are {0, 1, 2, 3, 4, 5, 6, 7} (8 digits, repetition allowed).\nFor a 5-digit number $d_1 d_2 d_3 d_4 d_5 > 50000$:\n$d_1 \\in \\{5, 6, 7\\}$ and $d_1 + d_5 \\le 8$.\n- $d_1 = 5 \\implies d_5 \\in \\{0, 1, 2, 3\\}$ (4 choices)\n- $d_1 = 6 \\implies d_5 \\in \\{0, 1, 2\\}$ (3 choices)\n- $d_1 = 7 \\implies d_5 \\in \\{0, 1\\}$ (2 choices)\nTotal valid pairs $(d_1, d_5) = 4 + 3 + 2 = 9$.\n\nEach of the middle 3 digits $d_2, d_3, d_4$ has 8 choices:\nTotal combinations = $9 \\times 8 \\times 8 \\times 8 = 4608$.\nExcluding the number 50000 itself (which corresponds to $d_1 = 5, d_2=d_3=d_4=d_5=0$):\n$4608 - 1 = 4607$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 186,
    question_text: "The number of natural numbers, between 212 and 999, such that the sum of their digits is 15, is:",
    options: [],
    correct_option: null,
    numeric_answer: 64,
    solution_text: "Let the 3-digit number be $h a b$ with $h + a + b = 15$ where $a, b \\in \\{0, \\dots, 9\\}$.\n- $h = 2$: $a + b = 13$, pairs $(a, b) \\in \\{(4,9), (5,8), (6,7), (7,6), (8,5), (9,4)\\}$ (6 numbers, all $> 212$).\n- $h = 3$: $a + b = 12 \\implies 7$ numbers.\n- $h = 4$: $a + b = 11 \\implies 8$ numbers.\n- $h = 5$: $a + b = 10 \\implies 9$ numbers.\n- $h = 6$: $a + b = 9 \\implies 10$ numbers.\n- $h = 7$: $a + b = 8 \\implies 9$ numbers.\n- $h = 8$: $a + b = 7 \\implies 8$ numbers.\n- $h = 9$: $a + b = 6 \\implies 7$ numbers.\n\nTotal numbers = 6 + 7 + 8 + 9 + 10 + 9 + 8 + 7 = 64.\n\nHence, the answer is 64.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 187,
    question_text: "The number of 6-letter words, with or without meaning, that can be formed using the letters of the word MATHS such that any letter that appears in the word must appear at least twice, is:",
    options: [],
    correct_option: null,
    numeric_answer: 1405,
    solution_text: "Available letters: M, A, T, H, S (5 distinct letters).\nEvery letter used in the 6-letter word must appear at least twice.\n\nCase 1: Exactly 1 distinct letter (all 6 letters identical):\n$^5C_1 \\times 1 = 5$.\n\nCase 2: Exactly 2 distinct letters:\n- Pattern (4, 2): $^5C_1 \\times ^4C_1 \\times \\frac{6!}{4! 2!} = 5 \\times 4 \\times 15 = 300$.\n- Pattern (3, 3): $^5C_2 \\times \\frac{6!}{3! 3!} = 10 \\times 20 = 200$.\nTotal for Case 2 = 300 + 200 = 500.\n\nCase 3: Exactly 3 distinct letters:\n- Pattern (2, 2, 2): $^5C_3 \\times \\frac{6!}{2! 2! 2!} = 10 \\times 90 = 900$.\n\nTotal number of 6-letter words = 5 + 500 + 900 = 1405.\n\nHence, the answer is 1405.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 188,
    question_text: "Let P be the set of seven digit numbers with sum of their digits equal to 11. If the numbers in P are formed by using the digits 1, 2 and 3 only, then the number of elements in the set P is:",
    options: ["160", "156", "158", "161"],
    correct_option: "D",
    solution_text: "Let $a, b, c$ be the number of 1's, 2's, and 3's in the 7-digit number.\nThen $a + b + c = 7$ and $a + 2b + 3c = 11$.\nSubtracting gives $b + 2c = 4$.\n\n1) $c = 2 \\implies b = 0, a = 5$:\nDigits are five 1's and two 3's: $\\frac{7!}{5! 2!} = 21$.\n\n2) $c = 1 \\implies b = 2, a = 4$:\nDigits are four 1's, two 2's, one 3: $\\frac{7!}{4! 2! 1!} = 105$.\n\n3) $c = 0 \\implies b = 4, a = 3$:\nDigits are three 1's and four 2's: $\\frac{7!}{3! 4!} = 35$.\n\nTotal number of elements in P = 21 + 105 + 35 = 161.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 189,
    question_text: "If all the words with or without meaning made using all the letters of the word 'KANPUR' are arranged as in a dictionary, then the word at 440th position in this arrangement, is:",
    options: ["PRNAUK", "PRKANU", "PRKAUN", "PRNAKU"],
    correct_option: "C",
    solution_text: "The letters of KANPUR in alphabetical order are A, K, N, P, R, U (6 distinct letters).\n\n1) Words starting with A: $5! = 120$\n2) Words starting with K: $5! = 120$ (Total = 240)\n3) Words starting with N: $5! = 120$ (Total = 360)\n4) Words starting with P:\n- Starting with PA, PK, PN: $3 \\times 4! = 3 \\times 24 = 72$ (Total = 432)\n- Starting with PR:\n  - Starting with PRA: $3! = 6$ (Total = 438)\n  - Starting with PRK:\n    - 439th word: PRKANU\n    - 440th word: PRKAUN\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 190,
    question_text: "The number of sequences of ten terms, whose terms are either 0 or 1 or 2, that contain exactly five 1's and exactly three 2's, is equal to:",
    options: ["3600", "4500", "2520", "1820"],
    correct_option: "C",
    solution_text: "The sequence has 10 terms containing:\n- five 1's\n- three 2's\n- two 0's (since $10 - 5 - 3 = 2$)\n\nNumber of such sequences:\n$= \\frac{10!}{5! 3! 2!} = \\frac{3628800}{120 \\times 6 \\times 2} = 2520$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 191,
    question_text: "The largest $n \\in \\mathbb{N}$ such that $3^n$ divides $50!$ is:",
    options: ["21", "22", "20", "23"],
    correct_option: "B",
    solution_text: "Using Legendre's formula for the exponent of prime 3 dividing $50!$:\n$E_3(50!) = \\lfloor \\frac{50}{3} \\rfloor + \\lfloor \\frac{50}{9} \\rfloor + \\lfloor \\frac{50}{27} \\rfloor + \\lfloor \\frac{50}{81} \\rfloor$\n$= 16 + 5 + 1 + 0 = 22$.\n\nTherefore, the largest natural number $n$ is 22.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 192,
    question_text: "The number of ways, in which the letters A, B, C, D, E can be placed in the 8 boxes of the figure below so that no row remains empty and at most one letter can be placed in a box, is:",
    options: ["5550", "5650", "5450", "5760"],
    correct_option: "D",
    solution_text: "Using the principle of inclusion-exclusion across the rows, the number of ways to place the 5 distinct letters into the 8 available boxes such that no row remains empty is 5760.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 193,
    question_text: "If the number of seven-digit numbers, such that the sum of their digits is even, is $m \\times 5 \\times 10^n$, where $m, n \\in \\{1, 2, 3, \\dots, 9\\}$, then $m + n$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 14,
    solution_text: "Total number of 7-digit numbers = $9000000 = 9 \\times 10^6$.\nFor any choice of the first 6 digits, exactly 5 of the 10 choices for the units digit make the sum of all 7 digits even.\nThus, exactly half of all 7-digit numbers have an even sum of digits:\nNumber of such numbers = $\\frac{9000000}{2} = 4500000 = 9 \\times 5 \\times 10^5$.\nComparing with $m \\times 5 \\times 10^n$, we get $m = 9$ and $n = 5$.\nTherefore, $m + n = 9 + 5 = 14$.\n\nHence, the answer is 14.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 194,
    question_text: "Line $L_1$ of slope 2 and line $L_2$ of slope $1/2$ intersect at the origin O in the first quadrant. $P_1, P_2, \\dots, P_{12}$ are 12 points on line $L_1$ and $Q_1, Q_2, \\dots, Q_9$ are 9 points on line $L_2$. Then the total number of triangles, that can be formed having vertices at three of the 22 points $O, P_1, P_2, \\dots, P_{12}, Q_1, \\dots, Q_9$ is:",
    options: ["1080", "1134", "1226", "1150"],
    correct_option: "B",
    solution_text: "Total points = $1 + 12 + 9 = 22$.\nPoints on line $L_1$ are $O$ and 12 points $P_i$ (13 collinear points).\nPoints on line $L_2$ are $O$ and 9 points $Q_i$ (10 collinear points).\n\nTotal number of triangles:\n$= ^{22}C_3 - (^{13}C_3 + ^{10}C_3)$\n$= \\frac{22 \\times 21 \\times 20}{6} - \\left( \\frac{13 \\times 12 \\times 11}{6} + \\frac{10 \\times 9 \\times 8}{6} \\right)$\n$= 1540 - (286 + 120)\n= 1540 - 406 = 1134$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 195,
    question_text: "Let $m$ and $n$ ($m < n$) be two 2-digit numbers. Then the total number of pairs $(m, n)$, such that $\\gcd(m, n) = 6$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 64,
    solution_text: "Let $m = 6a$ and $n = 6b$ where $\\gcd(a, b) = 1$ and $a < b$.\nSince $m, n$ are 2-digit numbers ($10 \\le m < n \\le 99$):\n$2 \\le a < b \\le 16$.\nBy counting all coprime pairs $(a, b)$ with $2 \\le a < b \\le 16$, there are exactly 64 such pairs.\n\nHence, the answer is 64.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 196,
    question_text: "From a group of 7 batsmen and 6 bowlers, 10 players are to be chosen for a team, which should include at least 4 batsmen and at least 4 bowlers. One batsman and one bowler who are captain and vice-captain respectively of the team should be included. Then the total number of ways such a selection can be made, is:",
    options: ["165", "155", "145", "175"],
    correct_option: "B",
    solution_text: "Available: 7 batsmen and 6 bowlers. Team size = 10.\nConditions: at least 4 batsmen, at least 4 bowlers.\nThe captain (a batsman) and vice-captain (a bowler) are automatically included.\nThus, we need to choose 8 more players from the remaining 6 batsmen and 5 bowlers, with at least 3 more batsmen and at least 3 more bowlers.\nLet $b$ be additional batsmen and $w$ additional bowlers ($b + w = 8$ with $b \\ge 3, w \\ge 3$):\n\n1) $b = 3, w = 5$: $^6C_3 \\times ^5C_5 = 20 \\times 1 = 20$\n2) $b = 4, w = 4$: $^6C_4 \\times ^5C_4 = 15 \\times 5 = 75$\n3) $b = 5, w = 3$: $^6C_5 \\times ^5C_3 = 6 \\times 10 = 60$\n\nTotal number of ways = 20 + 75 + 60 = 155.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 197,
    question_text: "For $n \\ge 2$, let $S_n$ denote the set of all subsets of $\\{1, 2, \\dots, n\\}$ with no two consecutive numbers. For example $\\{1, 3, 5\\} \\in S_5$, but $\\{1, 2, 4\\} \\notin S_5$. Then $n(S_5)$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 13,
    solution_text: "Subsets of {1, 2, 3, 4, 5} with no two consecutive numbers:\n- Subsets with 0 elements: $\\emptyset$ (1 subset)\n- Subsets with 1 element: {1}, {2}, {3}, {4}, {5} (5 subsets)\n- Subsets with 2 elements: {1,3}, {1,4}, {1,5}, {2,4}, {2,5}, {3,5} (6 subsets)\n- Subsets with 3 elements: {1,3,5} (1 subset)\n\nTotal number of subsets = 1 + 5 + 6 + 1 = 13.\n\nHence, the answer is 13.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 198,
    question_text: "Let $p$ be the number of all triangles that can be formed by joining the vertices of a regular polygon P of $n$ sides and $q$ be the number of all quadrilaterals that can be formed by joining the vertices of P. If $p + q = 126$, then the eccentricity of the ellipse $\\frac{x^2}{p} + \\frac{y^2}{q} = 1$ is:",
    options: ["$\\sqrt{2/5}$", "$\\sqrt{3/5}$", "$2/\\sqrt{5}$", "$1/\\sqrt{5}$"],
    correct_option: "D",
    solution_text: "We have $p = ^nC_3$ and $q = ^nC_4$.\n$p + q = ^nC_3 + ^nC_4 = ^{n+1}C_4 = 126$.\n$\\frac{(n+1)n(n-1)(n-2)}{24} = 126 \\implies (n+1)n(n-1)(n-2) = 3024 = 9 \\times 8 \\times 7 \\times 6$.\nThus, $n = 8$.\n\nThen:\n$p = ^8C_3 = 56$\n$q = ^8C_4 = 70$\n\nThe ellipse is $\\frac{x^2}{56} + \\frac{y^2}{70} = 1$.\nSince $70 > 56$, the major axis is along the y-axis:\n$e = \\sqrt{1 - \\frac{56}{70}} = \\sqrt{1 - \\frac{4}{5}} = \\frac{1}{\\sqrt{5}}$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 199,
    question_text: "There are 12 points in a plane, no three of which are in the same straight line, except 5 points which are collinear. Then the total number of triangles that can be formed with the vertices at any three of these 12 points is:",
    options: ["230", "220", "200", "210"],
    correct_option: "D",
    solution_text: "Total number of points = 12, with 5 points collinear.\nNumber of triangles:\n$= ^{12}C_3 - ^5C_3$\n$= \\frac{12 \\times 11 \\times 10}{6} - \\frac{5 \\times 4 \\times 3}{6}$\n$= 220 - 10 = 210$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 200,
    question_text: "The number of strictly increasing functions $f$ from the set $\\{1, 2, 3, 4, 5, 6\\}$ to the set $\\{1, 2, 3, \\dots, 9\\}$ such that $f(i) \\ne i$ for $1 \\le i \\le 6$, is equal to:",
    options: ["56", "35", "84", "28"],
    correct_option: "D",
    solution_text: "Let $f(i) = a_i$. Since $f$ is strictly increasing, $a_1 < a_2 < \\dots < a_6$.\nThus $a_i \\ge i$ always.\nThe condition $f(i) \\ne i$ implies $a_i \\ge i + 1$ for all $1 \\le i \\le 6$.\nLet $x_i = a_i - i$. Then $x_i \\ge 1$.\nSince $a_{i+1} > a_i \\implies a_{i+1} - a_i \\ge 1 \\implies x_{i+1} \\ge x_i$, the sequence $x_1 \\le x_2 \\le \\dots \\le x_6$ is non-decreasing.\nAlso $a_6 \\le 9 \\implies x_6 = a_6 - 6 \\le 3$.\nThus, $1 \\le x_1 \\le x_2 \\le \\dots \\le x_6 \\le 3$.\n\nThe number of such non-decreasing sequences of length 6 from {1, 2, 3} is:\n$^{6 + 3 - 1}C_{3 - 1} = ^8C_2 = \\frac{8 \\times 7}{2} = 28$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  }
];

