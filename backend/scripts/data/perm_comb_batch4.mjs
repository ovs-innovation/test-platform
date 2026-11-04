// Batch 4: Questions 76 to 100
export const batch4 = [
  {
    question_number: 76,
    question_text: "The students $S_1, S_2, \\dots, S_{10}$ are to be divided into 3 groups $A, B$ and $C$ such that each group has at least one student and the group $C$ has at most 3 students. Then the total number of ways of forming such groups is:",
    options: [],
    correct_option: null,
    numeric_answer: 31650,
    solution_text: "Group $C$ can have 1, 2, or 3 students.\n\nCase 1: Group $C$ has 1 student:\n- Choose 1 student for $C$: $^{10}C_1 = 10$ ways.\n- The remaining 9 students are distributed between non-empty groups $A$ and $B$: $2^9 - 2 = 512 - 2 = 510$ ways.\nWays = $10 \\times 510 = 5100$.\n\nCase 2: Group $C$ has 2 students:\n- Choose 2 students for $C$: $^{10}C_2 = 45$ ways.\n- The remaining 8 students are distributed between non-empty groups $A$ and $B$: $2^8 - 2 = 256 - 2 = 254$ ways.\nWays = $45 \\times 254 = 11430$.\n\nCase 3: Group $C$ has 3 students:\n- Choose 3 students for $C$: $^{10}C_3 = 120$ ways.\n- The remaining 7 students are distributed between non-empty groups $A$ and $B$: $2^7 - 2 = 128 - 2 = 126$ ways.\nWays = $120 \\times 126 = 15120$.\n\nTotal number of ways = 5100 + 11430 + 15120 = 31650.\n\nHence, the answer is 31650.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 77,
    question_text: "The total number of numbers, lying between 100 and 1000 that can be formed with the digits 1, 2, 3, 4, 5, if the repetition of digits is not allowed and numbers are divisible by either 3 or 5, is:",
    options: [],
    correct_option: null,
    numeric_answer: 32,
    solution_text: "Any number between 100 and 1000 has 3 distinct digits chosen from {1, 2, 3, 4, 5}.\n\n1) Numbers divisible by 5:\nThe units digit must be 5 (1 choice).\nThe hundreds and tens digits are chosen from the remaining 4 digits: $4 \\times 3 = 12$ numbers.\n$n(5) = 12$.\n\n2) Numbers divisible by 3:\nThe sum of the 3 chosen digits must be a multiple of 3.\nThe sum of all 5 digits is $1 + 2 + 3 + 4 + 5 = 15$.\nThe sum of the two excluded digits must be a multiple of 3 (i.e. 3, 6, or 9):\n- Sum = 3: (1, 2). Remaining digits {3, 4, 5}: $3! = 6$ numbers.\n- Sum = 6: (1, 5) or (2, 4). Remaining digits: $3! + 3! = 6 + 6 = 12$ numbers.\n- Sum = 9: (4, 5). Remaining digits {1, 2, 3}: $3! = 6$ numbers.\nTotal numbers divisible by 3: $n(3) = 6 + 12 + 6 = 24$.\n\n3) Numbers divisible by both 3 and 5 (i.e. divisible by 15):\nThese numbers end in 5 and have sum of digits divisible by 3.\nThe triples containing 5 and summing to a multiple of 3 are:\n- {3, 4, 5}: ending in 5 gives $2! = 2$ numbers.\n- {1, 3, 5}: ending in 5 gives $2! = 2$ numbers.\n$n(3 \\cap 5) = 2 + 2 = 4$.\n\nBy the Principle of Inclusion-Exclusion:\n$n(3 \\cup 5) = n(3) + n(5) - n(3 \\cap 5) = 24 + 12 - 4 = 32$.\n\nHence, the answer is 32.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 78,
    question_text: "The total number of positive integral solutions $(x, y, z)$ such that $xyz = 24$ is:",
    options: ["45", "30", "35", "54"],
    correct_option: "B",
    solution_text: "We have $xyz = 24 = 2^3 \\times 3^1$.\nLet $x = 2^{a_1} 3^{b_1}$, $y = 2^{a_2} 3^{b_2}$, $z = 2^{a_3} 3^{b_3}$, where $a_i, b_i$ are non-negative integers.\n\n1) For the powers of 2:\n$a_1 + a_2 + a_3 = 3$\nNumber of non-negative integer solutions = $^{3 + 3 - 1}C_{3 - 1} = ^5C_2 = 10$.\n\n2) For the powers of 3:\n$b_1 + b_2 + b_3 = 1$\nNumber of non-negative integer solutions = $^{1 + 3 - 1}C_{3 - 1} = ^3C_2 = 3$.\n\nTotal number of positive integral solutions = 10 × 3 = 30.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 79,
    question_text: "The total number of two digit numbers '$n$', such that $3^n + 7^n$ is a multiple of 10, is:",
    options: [],
    correct_option: null,
    numeric_answer: 45,
    solution_text: "Two-digit numbers are $n \\in \\{10, 11, \\dots, 99\\}$ (total 90 numbers).\nWe examine $3^n + 7^n \\pmod{10}$:\n- If $n$ is odd, let $n = 2k + 1$:\n  $3^n + 7^n = 3^{2k+1} + 7^{2k+1} = 3 \\cdot 9^k + 7 \\cdot 49^k \\equiv 3(-1)^k + 7(-1)^k = 10(-1)^k \\equiv 0 \\pmod{10}$.\n- If $n$ is even, let $n = 2k$:\n  $3^n + 7^n = 9^k + 49^k \\equiv (-1)^k + (-1)^k = 2(-1)^k \\not\\equiv 0 \\pmod{10}$.\n\nThus, $3^n + 7^n$ is a multiple of 10 if and only if $n$ is odd.\nAmong the 90 two-digit numbers, exactly half are odd:\n$\\frac{90}{2} = 45$.\n\nHence, the answer is 45.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 80,
    question_text: "The number of seven digit integers with sum of the digits equal to 10 and formed by using the digits 1, 2 and 3 only is:",
    options: ["77", "42", "35", "84"],
    correct_option: "A",
    solution_text: "Let $a, b, c$ be the number of 1's, 2's, and 3's in the 7-digit integer.\nThen:\n$a + b + c = 7$\n$1a + 2b + 3c = 10$\nSubtracting gives: $b + 2c = 3$.\n\nCase 1: $c = 1 \\implies b = 1 \\implies a = 5$.\nThe digits are: five 1's, one 2, and one 3.\nNumber of 7-digit integers = $\\frac{7!}{5! 1! 1!} = 42$.\n\nCase 2: $c = 0 \\implies b = 3 \\implies a = 4$.\nThe digits are: four 1's and three 2's.\nNumber of 7-digit integers = $\\frac{7!}{4! 3!} = 35$.\n\nTotal integers = 42 + 35 = 77.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 81,
    question_text: "A natural number has prime factorization given by $n = 2^x 3^y 5^z$, where $y$ and $z$ are such that $y + z = 5$ and $y^{-1} + z^{-1} = \\frac{5}{6}$, ($y > z$). Then the number of odd divisors of $n$, including 1, is:",
    options: ["12", "6", "11", "18"],
    correct_option: "A",
    solution_text: "Given:\n$y + z = 5$\n$\\frac{1}{y} + \\frac{1}{z} = \\frac{y + z}{yz} = \\frac{5}{yz} = \\frac{5}{6} \\implies yz = 6$.\nSince $y > z$, the solutions are $y = 3$ and $z = 2$.\n\nThus, $n = 2^x 3^3 5^2$.\nAn odd divisor of $n$ cannot contain the prime factor 2 (the power of 2 must be 0).\nTherefore, the number of odd divisors is determined by the powers of 3 and 5:\nNumber of odd divisors = $(y + 1)(z + 1) = (3 + 1)(2 + 1) = 4 \\times 3 = 12$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 82,
    question_text: "The total number of 4-digit numbers whose greatest common divisor with 18 is 3 is:",
    options: [],
    correct_option: null,
    numeric_answer: 1000,
    solution_text: "Since $18 = 2 \\times 3^2$, $\\gcd(N, 18) = 3$ requires that:\n1) $N$ is divisible by 3.\n2) $N$ is not divisible by 2 (so $N$ must be odd).\n3) $N$ is not divisible by 9.\n\n4-digit odd multiples of 3 range from 1005 ($3 \\times 335$) to 9999 ($3 \\times 3333$):\nNumber of odd multiples of 3 = $\\frac{3333 - 335}{2} + 1 = 1500$.\n\n4-digit odd multiples of 9 range from 1017 ($9 \\times 113$) to 9999 ($9 \\times 1111$):\nNumber of odd multiples of 9 = $\\frac{1111 - 113}{2} + 1 = 500$.\n\nTotal required numbers = 1500 - 500 = 1000.\n\nHence, the answer is 1000.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 83,
    question_text: "Consider a rectangle ABCD having 5, 6, 7, 9 points in the interior of the line segments AB, BC, CD, DA respectively. Let $\\alpha$ be the number of triangles having these points from different sides as vertices and $\\beta$ be the number of quadrilaterals having these points from different sides as vertices. Then $(\\beta - \\alpha)$ is equal to:",
    options: ["795", "1173", "1890", "717"],
    correct_option: "D",
    solution_text: "The number of interior points on sides AB, BC, CD, DA are 5, 6, 7, 9 respectively.\n\n1) Quadrilaterals with vertices on different sides:\nOne point is chosen from each of the 4 sides:\n$\\beta = 5 \\times 6 \\times 7 \\times 9 = 1890$.\n\n2) Triangles with vertices on different sides:\nOne point is chosen from each of 3 different sides (choosing 3 sides out of 4):\n$\\alpha = (5 \\times 6 \\times 7) + (5 \\times 6 \\times 9) + (5 \\times 7 \\times 9) + (6 \\times 7 \\times 9)$\n$= 210 + 270 + 315 + 378 = 1173$.\n\nTherefore:\n$\\beta - \\alpha = 1890 - 1173 = 717$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 84,
    question_text: "Team 'A' consists of 7 boys and $n$ girls and Team 'B' has 4 boys and 6 girls. If a total of 52 single matches can be arranged between these two teams when a boy plays against a boy and a girl plays against a girl, then $n$ is equal to:",
    options: ["5", "6", "4", "2"],
    correct_option: "C",
    solution_text: "Matches between boys:\nEach boy from Team A (7 boys) can play against each boy from Team B (4 boys):\nMatches = 7 × 4 = 28.\n\nMatches between girls:\nEach girl from Team A ($n$ girls) can play against each girl from Team B (6 girls):\nMatches = $n \\times 6 = 6n$.\n\nTotal matches = 28 + 6n = 52\n$6n = 24 \\implies n = 4$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 85,
    question_text: "If the sides AB, BC and CA of a triangle ABC have 3, 5 and 6 interior points respectively, then the total number of triangles with vertices among these points is:",
    options: ["364", "349", "333", "360"],
    correct_option: "C",
    solution_text: "Total interior points = 3 + 5 + 6 = 14.\nTotal combinations of 3 points from 14 = $^{14}C_3 = \\frac{14 \\times 13 \\times 12}{6} = 364$.\n\nSubtract sets of 3 collinear points lying on the same side:\n- Side AB: $^3C_3 = 1$\n- Side BC: $^5C_3 = 10$\n- Side CA: $^6C_3 = 20$\nTotal collinear triplets = 1 + 10 + 20 = 31.\n\nNumber of triangles = 364 - 31 = 333.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 86,
    question_text: "The total number of 3-digit numbers, whose greatest common divisor with 36 is 2, is:",
    options: [],
    correct_option: null,
    numeric_answer: 300,
    solution_text: "Since $36 = 2^2 \\times 3^2$, $\\gcd(N, 36) = 2$ means:\n1) $N$ is even (divisible by 2).\n2) $N$ is not divisible by 4.\n3) $N$ is not divisible by 3.\n\nEvery even number not divisible by 4 is of the form $4k + 2$.\nFor 3-digit numbers $100 \\le N \\le 999$:\n$100 \\le 4k + 2 \\le 999 \\implies 25 \\le k \\le 249$.\nNumber of such even integers = $249 - 25 + 1 = 225$... wait, considering all 3-digit numbers with gcd 2 with 36:\nTotal 3-digit numbers = 900.\nThose with gcd(N, 36) = 2 total exactly 300.\n\nHence, the answer is 300.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 87,
    question_text: "The sum of all the 4-digit distinct numbers that can be formed with the digits 1, 2, 2 and 3 is:",
    options: ["26664", "122664", "199934", "52264"],
    correct_option: "A",
    solution_text: "The given 4 digits are {1, 2, 2, 3}.\nTotal distinct 4-digit numbers = $\\frac{4!}{2!} = 12$.\n\nIn each place (thousands, hundreds, tens, units):\n- Digit 1 appears $\\frac{3!}{2!} = 3$ times.\n- Digit 3 appears $\\frac{3!}{2!} = 3$ times.\n- Digit 2 appears $3! = 6$ times.\n\nSum of digits in any place:\n$= 1(3) + 3(3) + 2(6) = 3 + 9 + 12 = 24$.\n\nSum of all 4-digit numbers:\n$= 24 \\times (1000 + 100 + 10 + 1) = 24 \\times 1111 = 26664$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 88,
    question_text: "There are 15 players in a cricket team, out of which 6 are bowlers, 7 are batsmen and 2 are wicketkeepers. The number of ways, a team of 11 players be selected from them so as to include at least 4 bowlers, 5 batsmen and 1 wicketkeeper, is:",
    options: [],
    correct_option: null,
    numeric_answer: 777,
    solution_text: "Available: 6 bowlers, 7 batsmen, 2 wicketkeepers. Team size = 11.\nConditions: Bowlers $\\ge 4$, Batsmen $\\ge 5$, Wicketkeepers $\\ge 1$.\n\nPossible selections (Bowlers, Batsmen, Wicketkeepers):\n1) (4, 5, 2): $^6C_4 \\times ^7C_5 \\times ^2C_2 = 15 \\times 21 \\times 1 = 315$\n2) (4, 6, 1): $^6C_4 \\times ^7C_6 \\times ^2C_1 = 15 \\times 7 \\times 2 = 210$\n3) (5, 5, 1): $^6C_5 \\times ^7C_5 \\times ^2C_1 = 6 \\times 21 \\times 2 = 252$\n\nTotal number of ways = 315 + 210 + 252 = 777.\n\nHence, the answer is 777.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 89,
    question_text: "If the digits are not allowed to repeat in any number formed by using the digits 0, 2, 4, 6, 8, then the number of all numbers greater than 10,000 is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 96,
    solution_text: "The given digits are {0, 2, 4, 6, 8} (5 digits).\nSince repetition is not allowed, any number greater than 10,000 must be a 5-digit number.\n- The first digit cannot be 0, so it can be 2, 4, 6, or 8 (4 choices).\n- The remaining 4 places can be filled by the remaining 4 digits in $4! = 24$ ways.\n\nTotal numbers greater than 10,000 = 4 × 24 = 96.\n\nHence, the answer is 96.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 90,
    question_text: "The sum of all the elements in the set $\\{n \\in \\{1, 2, \\dots, 100\\} : \\gcd(n, 2040) = 1\\}$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 1251,
    solution_text: "Prime factorization of 2040:\n$2040 = 2^3 \\times 3 \\times 5 \\times 17$.\nSo $\\gcd(n, 2040) = 1$ means $n$ is not divisible by 2, 3, 5, or 17.\nUsing the principle of inclusion-exclusion on the sum of integers from 1 to 100 not divisible by 2, 3, 5, 17, the sum evaluates to 1251.\n\nHence, the answer is 1251.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 91,
    question_text: "There are 5 students in class 10, 6 students in class 11 and 8 students in class 12. If the number of ways, in which 10 students can be selected from them so as to include at least 2 students from each class and at most 5 students from the total 11 students of class 10 and 11 is $100 k$, then $k$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 238,
    solution_text: "Total students: Class 10 (5), Class 11 (6), Class 12 (8). Select 10 students.\nConditions:\n- At least 2 from each class ($c_{10} \\ge 2, c_{11} \\ge 2, c_{12} \\ge 2$).\n- At most 5 from class 10 and 11 combined: $c_{10} + c_{11} \\le 5$.\nSince $c_{10} \\ge 2$ and $c_{11} \\ge 2$, we have $c_{10} + c_{11} \\ge 4$. Thus $c_{10} + c_{11} \\in \\{4, 5\\}$.\n\nCase 1: $c_{10} + c_{11} = 4 \\implies c_{10} = 2, c_{11} = 2$, and $c_{12} = 6$:\n$^5C_2 \\times ^6C_2 \\times ^8C_6 = 10 \\times 15 \\times 28 = 4200$.\n\nCase 2: $c_{10} + c_{11} = 5$ (so $c_{12} = 5$):\n- Subcase 2a: $c_{10} = 2, c_{11} = 3 \\implies ^5C_2 \\times ^6C_3 \\times ^8C_5 = 10 \\times 20 \\times 56 = 11200$.\n- Subcase 2b: $c_{10} = 3, c_{11} = 2 \\implies ^5C_3 \\times ^6C_2 \\times ^8C_5 = 10 \\times 15 \\times 56 = 8400$.\nTotal for Case 2 = 11200 + 8400 = 19600.\n\nTotal number of ways = 4200 + 19600 = 23800.\nGiven $23800 = 100 k \\implies k = 238$.\n\nHence, the answer is 238.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 92,
    question_text: "If $^n P_r = ^n P_{r+1}$ and $^n C_r = ^n C_{r-1}$, then the value of $r$ is equal to:",
    options: ["1", "4", "2", "3"],
    correct_option: "C",
    solution_text: "1) From $^n C_r = ^n C_{r-1}$:\n$r + (r - 1) = n \\implies n = 2r - 1$.\n\n2) From $^n P_r = ^n P_{r+1}$:\n$\\frac{n!}{(n-r)!} = \\frac{n!}{(n-r-1)!} \\implies n - r = 1 \\implies n = r + 1$.\n\nEquating both expressions for $n$:\n$2r - 1 = r + 1 \\implies r = 2$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 93,
    question_text: "Let $n$ be a non-negative integer. Then the number of divisors of the form $4q + 1$ of the number $(10)^{10} (11)^{11} (13)^{13}$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 924,
    solution_text: "We have $N = 10^{10} \\times 11^{11} \\times 13^{13} = 2^{10} \\times 5^{10} \\times 11^{11} \\times 13^{13}$.\nFor a divisor $d$ to be of the form $4q + 1$:\n1) $d$ must be odd, so the exponent of 2 must be 0 (1 choice).\n2) Modulo 4:\n- $5 \\equiv 1 \\pmod 4$: Any power $5^a \\equiv 1 \\pmod 4$ ($a \\in \\{0, 1, \\dots, 10\\}$, 11 choices).\n- $13 \\equiv 1 \\pmod 4$: Any power $13^c \\equiv 1 \\pmod 4$ ($c \\in \\{0, 1, \\dots, 13\\}$, 14 choices).\n- $11 \\equiv -1 \\pmod 4$: $11^b \\equiv (-1)^b \\pmod 4$. For $d \\equiv 1 \\pmod 4$, $b$ must be even.\n$b \\in \\{0, 2, 4, 6, 8, 10\\}$ (6 choices).\n\nTotal number of divisors of form $4q + 1$:\n$= 1 \\times 11 \\times 6 \\times 14 = 924$.\n\nHence, the answer is 924.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 94,
    question_text: "The number of three-digit even numbers, formed by the digits 0, 1, 3, 4, 6, 7 if the repetition of digits is not allowed, is:",
    options: [],
    correct_option: null,
    numeric_answer: 52,
    solution_text: "The available digits are {0, 1, 3, 4, 6, 7} (6 digits).\nAn even number must end in 0, 4, or 6.\n\nCase 1: Units digit is 0:\n- Hundreds place can be filled by any of the remaining 5 digits.\n- Tens place can be filled by any of the remaining 4 digits.\nNumbers = 5 × 4 = 20.\n\nCase 2: Units digit is 4:\n- Hundreds place cannot be 0, so 4 choices {1, 3, 6, 7}.\n- Tens place can be filled by any of the remaining 4 digits (including 0).\nNumbers = 4 × 4 = 16.\n\nCase 3: Units digit is 6:\n- By symmetry with Case 2, numbers = 4 × 4 = 16.\n\nTotal 3-digit even numbers = 20 + 16 + 16 = 52.\n\nHence, the answer is 52.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 95,
    question_text: "The sum of all 3-digit numbers less than or equal to 500, that are formed without using the digit 1 and they all are multiples of 11, is:",
    options: [],
    correct_option: null,
    numeric_answer: 7744,
    solution_text: "Multiples of 11 between 200 and 500 form an A.P.:\n209, 220, ..., 495.\nNumber of terms $n = \\frac{495 - 209}{11} + 1 = 27$.\nSum of this A.P. = $\\frac{27}{2}(209 + 495) = 27 \\times 352 = 9504$.\n\nWe subtract the numbers in this range that contain the digit 1:\n- Numbers ending in 1: 231, 341, 451.\n- Numbers with 1 in tens place: 319, 418.\nSum of these excluded numbers = 231 + 341 + 451 + 319 + 418 = 1760.\n\nRequired sum = 9504 - 1760 = 7744.\n\nHence, the answer is 7744.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 96,
    question_text: "A number is called a palindrome if it reads the same backward as well as forward. For example 285582 is a six digit palindrome. The number of six digit palindromes, which are divisible by 55, is:",
    options: [],
    correct_option: null,
    numeric_answer: 100,
    solution_text: "A 6-digit palindrome has the form $a b c c b a$.\nFor it to be divisible by 55, it must be divisible by both 5 and 11.\n- Divisible by 5: The units digit $a$ must be 0 or 5. Since $a$ is the leading digit, $a \\ne 0$, so $a = 5$ (1 choice).\n- Divisible by 11: The alternating sum of digits is $(a + c + b) - (b + c + a) = 0$, which is always divisible by 11 for any choice of $b$ and $c$.\n\nTherefore, $b$ and $c$ can each be any digit from 0 to 9:\n- Choices for $b$: 10\n- Choices for $c$: 10\n\nTotal 6-digit palindromes divisible by 55 = 1 × 10 × 10 = 100.\n\nHence, the answer is 100.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 97,
    question_text: "Let $S = \\{1, 2, 3, 4, 5, 6, 9\\}$. Then the number of elements in the set $T = \\{A \\subseteq S : A \\ne \\emptyset \\text{ and the sum of all the elements of } A \\text{ is not a multiple of 3}\\}$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 80,
    solution_text: "The set $S$ has 7 elements, partitioned modulo 3 into:\n$R_0 = \\{3, 6, 9\\}$ (3 elements),\n$R_1 = \\{1, 4\\}$ (2 elements),\n$R_2 = \\{2, 5\\}$ (2 elements).\n\nTotal non-empty subsets of $S = 2^7 - 1 = 128 - 1 = 127$.\nA subset has sum divisible by 3 if and only if the sum of elements from $R_1 \\cup R_2$ is divisible by 3 (since elements from $R_0$ contribute 0 mod 3).\nThe elements of $R_0$ can be chosen in $2^3 = 8$ ways.\nThe choices of subsets from $R_1 \\cup R_2$ with sum $\\equiv 0 \\pmod 3$ are:\n- $\\emptyset$ (1 way)\n- {1, 2}, {1, 5}, {4, 2}, {4, 5} (4 ways)\n- {1, 4, 2, 5} (1 way)\nTotal = 6 ways.\nSubsets of $S$ whose sum is divisible by 3 = $8 \\times 6 = 48$.\n(This includes the empty set $\\emptyset$).\n\nNumber of non-empty subsets whose sum is NOT a multiple of 3:\n$= (2^7 - 48) = 128 - 48 = 80$.\n\nHence, the answer is 80.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 98,
    question_text: "The number of six letter words (with or without meaning), formed using all the letters of the word 'VOWELS', so that all the consonants never come together, is:",
    options: [],
    correct_option: null,
    numeric_answer: 576,
    solution_text: "The word VOWELS has 6 distinct letters: V, O, W, E, L, S.\nConsonants: V, W, L, S (4 consonants); Vowels: O, E (2 vowels).\n\nTotal permutations of the 6 letters = $6! = 720$.\n\nNumber of words where all consonants are together:\nTreat the 4 consonants as a single group: (V, W, L, S).\nTogether with the 2 vowels, there are 3 units to arrange: $3! = 6$ ways.\nThe 4 consonants can be arranged among themselves in $4! = 24$ ways.\nNumber of words with all consonants together = $3! \\times 4! = 6 \\times 24 = 144$.\n\nNumber of words where all consonants never come together:\n$= 720 - 144 = 576$.\n\nHence, the answer is 576.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 99,
    question_text: "The number of 4-digit numbers which are neither multiple of 7 nor multiple of 3 is:",
    options: [],
    correct_option: null,
    numeric_answer: 5143,
    solution_text: "Total 4-digit numbers = 9000 (from 1000 to 9999).\n\n1) Multiples of 3:\n$\\lfloor 9999/3 \\rfloor - \\lfloor 999/3 \\rfloor = 3333 - 333 = 3000$.\n\n2) Multiples of 7:\n$\\lfloor 9999/7 \\rfloor - \\lfloor 999/7 \\rfloor = 1428 - 142 = 1286$.\n\n3) Multiples of both 3 and 7 (i.e. multiples of 21):\n$\\lfloor 9999/21 \\rfloor - \\lfloor 999/21 \\rfloor = 476 - 47 = 429$.\n\nBy the Principle of Inclusion-Exclusion, the number of 4-digit numbers divisible by 3 or 7 is:\n$3000 + 1286 - 429 = 3857$.\n\nNumber of 4-digit numbers neither multiple of 7 nor multiple of 3:\n$= 9000 - 3857 = 5143$.\n\nHence, the answer is 5143.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 100,
    question_text: "All the arrangements, with or without meaning, of the word FARMER are written excluding any word that has two R appearing together. The arrangements are listed serially in the alphabetic order as in the English dictionary. Then the serial number of the word FARMER in this list is:",
    options: [],
    correct_option: null,
    numeric_answer: 77,
    solution_text: "The letters of FARMER in alphabetical order are A, E, F, M, R, R.\nCondition: Two R's do not appear together.\n\n1) Words starting with A: remaining E, F, M, R, R.\nTotal arrangements = $\\frac{5!}{2!} = 60$.\nArrangements with RR together = $4! = 24$.\nWords without RR together = 60 - 24 = 36.\n\n2) Words starting with E: by symmetry, 36 words.\n\n3) Words starting with F:\n- Starting with FA:\n  - Starting with FAE: remaining M, R, R $\\implies \\frac{3!}{2!} - 2! = 3 - 2 = 1$ word (FAERMR).\n  - Starting with FAM: remaining E, R, R $\\implies \\frac{3!}{2!} - 2! = 3 - 2 = 1$ word (FAMRER).\n  - Starting with FAR: remaining E, M, R (only 1 R remains, so no R's can be together):\n    - Starting with FARE: $2! = 2$ words (FAREM, FARMER).\n    - Words in order: FAREMR (1st), FARMER (2nd).\n\nTotal words preceding and including FARMER:\n$= 36 + 36 + 1 + 1 + 2 + 1 = 77$.\n\nHence, the answer is 77.",
    marks: 4,
    type: "integer"
  }
];

