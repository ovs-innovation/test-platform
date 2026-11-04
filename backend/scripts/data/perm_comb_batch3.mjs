// Batch 3: Questions 51 to 75
export const batch3 = [
  {
    question_number: 51,
    question_text: "Let $S = \\{1, 2, 3, \\dots, 100\\}$. The number of non-empty subsets $A$ of $S$ such that the product of elements in $A$ is even is:",
    options: ["$2^{100} - 1$", "$2^{50} - 1$", "$2^{50}(2^{50} - 1)$", "$2^{50} + 1$"],
    correct_option: "C",
    solution_text: "The set $S$ contains 100 elements, consisting of 50 even numbers and 50 odd numbers.\nTotal number of non-empty subsets of $S = 2^{100} - 1$.\n\nThe product of elements in a subset is odd if and only if all chosen elements are odd.\nThe number of non-empty subsets consisting purely of odd numbers = $2^{50} - 1$.\n\nTherefore, the number of non-empty subsets whose product of elements is even is:\n$(2^{100} - 1) - (2^{50} - 1) = 2^{100} - 2^{50} = 2^{50}(2^{50} - 1)$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 52,
    question_text: "There are $m$ men and two women participating in a chess tournament. Each participant plays two games with every other participant. If the number of games played by the men between themselves exceeds the number of games played between the men and the women by 84, then the value of $m$ is:",
    options: ["11", "12", "7", "9"],
    correct_option: "B",
    solution_text: "Number of men = $m$, number of women = 2.\n- Number of games played between men:\nEach pair of men plays 2 games: $2 \\times ^mC_2 = 2 \\times \\frac{m(m-1)}{2} = m(m-1)$.\n- Number of games played between men and women:\nEach man plays 2 games with each of the 2 women: $m \\times 2 \\times 2 = 4m$.\n\nGiven condition:\n$m(m-1) - 4m = 84$\n$m^2 - 5m - 84 = 0$\n$(m - 12)(m + 7) = 0$\n\nSince $m > 0$, we have $m = 12$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 53,
    question_text: "If $^{n}C_4, ^{n}C_5$ and $^{n}C_6$ are in A.P., then $n$ can be:",
    options: ["9", "14", "11", "12"],
    correct_option: "B",
    solution_text: "Since $^{n}C_4, ^{n}C_5, ^{n}C_6$ are in Arithmetic Progression:\n$2 \\cdot ^nC_5 = ^nC_4 + ^nC_6$\n\nDividing throughout by $^nC_5$:\n$2 = \\frac{^nC_4}{^nC_5} + \\frac{^nC_6}{^nC_5}$\n$2 = \\frac{5}{n - 4} + \\frac{n - 5}{6}$\n$2 = \\frac{30 + (n-4)(n-5)}{6(n-4)}$\n$12(n - 4) = 30 + n^2 - 9n + 20$\n$12n - 48 = n^2 - 9n + 50$\n$n^2 - 21n + 98 = 0$\n$(n - 7)(n - 14) = 0$\n\nThus, $n = 7$ or $n = 14$.\nAmong the options, $n = 14$ is present.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 54,
    question_text: "All possible numbers are formed using the digits 1, 1, 2, 2, 2, 2, 3, 4, 4 taken all at a time. The number of such numbers in which the odd digits occupy even places is:",
    options: ["175", "162", "180", "160"],
    correct_option: "C",
    solution_text: "The given 9 digits are:\nOdd digits: 1, 1, 3 (3 digits)\nEven digits: 2, 2, 2, 2, 4, 4 (6 digits)\n\nA 9-digit number has 4 even positions (2nd, 4th, 6th, 8th).\n1) Choose 3 out of the 4 even positions for the 3 odd digits and arrange them:\n$^4C_3 \\times \\frac{3!}{2!} = 4 \\times 3 = 12$.\n\n2) Place the 6 even digits {2, 2, 2, 2, 4, 4} in the remaining 6 positions:\n$\\frac{6!}{4! 2!} = \\frac{30}{2} = 15$.\n\nTotal number of such numbers = 12 × 15 = 180.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 55,
    question_text: "The number of four-digit numbers strictly greater than 4321 that can be formed using the digits 0, 1, 2, 3, 4, 5 (repetition of digits is allowed) is:",
    options: ["360", "335", "306", "310"],
    correct_option: "D",
    solution_text: "Available digits: {0, 1, 2, 3, 4, 5} (6 digits).\nWe count 4-digit numbers strictly greater than 4321:\n\n1) Thousands place is 5:\n$1 \\times 6 \\times 6 \\times 6 = 216$.\n\n2) Thousands place is 4:\n- Hundreds place is 4 or 5: $1 \\times 2 \\times 6 \\times 6 = 72$.\n- Hundreds place is 3:\n  - Tens place is 3, 4, or 5: $1 \\times 1 \\times 3 \\times 6 = 18$.\n  - Tens place is 2:\n    - Units place is strictly greater than 1, so {2, 3, 4, 5} (4 choices): $1 \\times 1 \\times 1 \\times 4 = 4$.\n\nTotal numbers strictly greater than 4321 = 216 + 72 + 18 + 4 = 310.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 56,
    question_text: "A committee of 11 members is to be formed from 8 males and 5 females. If $m$ is the number of ways the committee is formed with at least 6 males and $n$ is the number of ways the committee is formed with at least 3 females, then:",
    options: ["$m + n = 68$", "$m = n = 68$", "$m = n = 78$", "$n = 68$"],
    correct_option: "C",
    solution_text: "Available: 8 males (M) and 5 females (F). Committee size = 11.\n\nCalculation of $m$ (at least 6 males):\n- 6M and 5F: $^8C_6 \\times ^5C_5 = 28 \\times 1 = 28$\n- 7M and 4F: $^8C_7 \\times ^5C_4 = 8 \\times 5 = 40$\n- 8M and 3F: $^8C_8 \\times ^5C_3 = 1 \\times 10 = 10$\nTotal $m = 28 + 40 + 10 = 78$.\n\nCalculation of $n$ (at least 3 females):\n- 3F and 8M: $^5C_3 \\times ^8C_8 = 10 \\times 1 = 10$\n- 4F and 7M: $^5C_4 \\times ^8C_7 = 5 \\times 8 = 40$\n- 5F and 6M: $^5C_5 \\times ^8C_6 = 1 \\times 28 = 28$\nTotal $n = 10 + 40 + 28 = 78$.\n\nTherefore, $m = n = 78$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 57,
    question_text: "The number of 6-digit numbers that can be formed using the digits 0, 1, 2, 5, 7 and 9 which are divisible by 11 and no digit is repeated is:",
    options: ["36", "60", "72", "48"],
    correct_option: "B",
    solution_text: "The given 6 digits are {0, 1, 2, 5, 7, 9}, with sum = 24.\nFor a 6-digit number to be divisible by 11, the difference between the sum of digits at odd places ($S_o$) and even places ($S_e$) must be a multiple of 11.\nSince $S_o + S_e = 24$, we have $S_o - S_e = 0$, giving $S_o = S_e = 12$.\n\nThe only ways to choose 3 digits summing to 12 from {0, 1, 2, 5, 7, 9} are {1, 2, 9} and {0, 5, 7}.\n\nCase 1: Digits at odd places are {1, 2, 9} and even places are {0, 5, 7}.\n- Odd places can be arranged in $3! = 6$ ways (first place is non-zero).\n- Even places can be arranged in $3! = 6$ ways.\nWays = 6 × 6 = 36.\n\nCase 2: Digits at odd places are {0, 5, 7} and even places are {1, 2, 9}.\n- The first digit cannot be 0, so it can be 5 or 7 (2 choices). The remaining 2 odd places take the other 2 digits in $2! = 2$ ways. Total for odd places = 2 × 2 = 4.\n- Even places can be arranged in $3! = 6$ ways.\nWays = 4 × 6 = 24.\n\nTotal numbers = 36 + 24 = 60.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 58,
    question_text: "Suppose that 20 pillars of the same height have been erected along the boundary of a circular stadium. If the top of each pillar has been connected by beams with the top of all its non-adjacent pillars, then the total number of beams is:",
    options: ["170", "180", "210", "190"],
    correct_option: "A",
    solution_text: "Number of pillars = 20.\nTotal number of segments connecting any two pillars = $^{20}C_2 = \\frac{20 \\times 19}{2} = 190$.\nAmong these, each pillar is connected to its 2 adjacent pillars along the perimeter, forming 20 adjacent boundary connections.\n\nThe number of beams connecting non-adjacent pillars is the number of diagonals of a 20-gon:\n$^{20}C_2 - 20 = 190 - 20 = 170$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 59,
    question_text: "The number of ways of choosing 10 objects out of 31 objects of which 10 are identical and the remaining 21 are distinct, is:",
    options: ["$2^{20}$", "$2^{21}$", "$2^{20} - 1$", "$2^{21} - 1$"],
    correct_option: "A",
    solution_text: "We have 10 identical objects and 21 distinct objects.\nWe can select $k$ identical objects ($0 \\le k \\le 10$) and $(10 - k)$ distinct objects.\nSince the 10 objects are identical, there is only 1 way to select $k$ identical objects for any $k$.\nThe $(10 - k)$ distinct objects are chosen from 21 distinct objects in $^{21}C_{10-k}$ ways.\n\nTotal number of ways:\n$= \\sum_{k=0}^{10} ^{21}C_{10-k} = ^{21}C_0 + ^{21}C_1 + \\dots + ^{21}C_{10}$.\n\nUsing the binomial expansion identity:\n$\\sum_{r=0}^{21} ^{21}C_r = 2^{21}$\nSince $^{21}C_r = ^{21}C_{21-r}$, the sum of the first 11 terms equals the sum of the last 11 terms:\n$2 \\times \\sum_{r=0}^{10} ^{21}C_r = 2^{21} \\implies \\sum_{r=0}^{10} ^{21}C_r = \\frac{2^{21}}{2} = 2^{20}$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 60,
    question_text: "A group of students comprises of 5 boys and $n$ girls. If the number of ways, in which a team of 3 students can randomly be selected from this group such that there is at least one boy and at least one girl in each team, is 1750, then $n$ is equal to:",
    options: ["28", "27", "25", "24"],
    correct_option: "C",
    solution_text: "We choose a team of 3 from 5 boys and $n$ girls with at least one boy and at least one girl:\n\nCase 1: 1 boy and 2 girls:\n$^5C_1 \\times ^nC_2 = 5 \\times \\frac{n(n-1)}{2}$\n\nCase 2: 2 boys and 1 girl:\n$^5C_2 \\times ^nC_1 = 10 \\times n$\n\nTotal ways = $\\frac{5n(n-1)}{2} + 10n = 1750$\nDivide by 5:\n$\\frac{n(n-1)}{2} + 2n = 350$\n$n^2 - n + 4n = 700$\n$n^2 + 3n - 700 = 0$\n$(n + 28)(n - 25) = 0$\n\nSince $n > 0$, we have $n = 25$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 61,
    question_text: "Total number of 6-digit numbers in which only and all the five digits 1, 3, 5, 7 and 9 appear, is:",
    options: ["$6!$", "$\\frac{1}{2}(6!)$", "$5(6!)$", "$\\frac{5}{2}(6!)$"],
    correct_option: "D",
    solution_text: "The five available digits are {1, 3, 5, 7, 9}.\nA 6-digit number containing only and all these 5 digits must have exactly one digit repeated twice and the other 4 digits appearing once.\n\n- Choose which digit is repeated: $^5C_1 = 5$ choices.\n- Arrange the 6 digits (with one digit appearing twice): $\\frac{6!}{2!}$ ways.\n\nTotal number of such 6-digit numbers = $5 \\times \\frac{6!}{2!} = \\frac{5}{2}(6!)$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 62,
    question_text: "The number of ordered pairs $(r, k)$ for which $6 \\cdot ^{35}C_r = (k^2 - 3) \\cdot ^{36}C_{r+1}$, where $k$ is an integer, is:",
    options: ["6", "2", "3", "4"],
    correct_option: "D",
    solution_text: "Given:\n$6 \\cdot ^{35}C_r = (k^2 - 3) \\cdot ^{36}C_{r+1}$\n\nUsing the property $^{36}C_{r+1} = \\frac{36}{r+1} \\cdot ^{35}C_r$:\n$6 \\cdot ^{35}C_r = (k^2 - 3) \\cdot \\frac{36}{r+1} \\cdot ^{35}C_r$\n$1 = \\frac{6(k^2 - 3)}{r + 1}$\n$r + 1 = 6(k^2 - 3)$\n\nSince $0 \\le r \\le 35$, we have $1 \\le r + 1 \\le 36$:\n$1 \\le 6(k^2 - 3) \\le 36 \\implies \\frac{1}{6} \\le k^2 - 3 \\le 6 \\implies 3 < k^2 \\le 9$\n\nSince $k$ is an integer, $k^2$ can be 4 or 9:\n- If $k^2 = 4 \\implies k = \\pm 2$:\n  $r + 1 = 6(4 - 3) = 6 \\implies r = 5$.\n  This gives 2 pairs: (5, 2) and (5, -2).\n- If $k^2 = 9 \\implies k = \\pm 3$:\n  $r + 1 = 6(9 - 3) = 36 \\implies r = 35$.\n  This gives 2 pairs: (35, 3) and (35, -3).\n\nTotal number of ordered pairs $(r, k) = 4$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 63,
    question_text: "An urn contains 5 red marbles, 4 black marbles and 3 white marbles. Then, the number of ways in which 4 marbles can be drawn so that at the most three of them are red is:",
    options: [],
    correct_option: null,
    numeric_answer: 490,
    solution_text: "Total marbles = 5 red + 4 black + 3 white = 12 marbles.\nNumber of non-red marbles = 4 + 3 = 7 marbles.\n\nWe need the number of ways to draw 4 marbles such that at most 3 are red:\nTotal ways to draw 4 marbles from 12 = $^{12}C_4 = \\frac{12 \\times 11 \\times 10 \\times 9}{24} = 495$.\nWays to draw all 4 red marbles = $^5C_4 = 5$.\n\nWays with at most three red marbles = $495 - 5 = 490$.\n\nHence, the answer is 490.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 64,
    question_text: "If $a, b$ and $c$ are the greatest values of $^{19}C_p, ^{20}C_q$ and $^{21}C_r$ respectively, then:",
    options: [
      "$\\frac{a}{11} = \\frac{b}{21} = \\frac{c}{42}$",
      "$\\frac{a}{10} = \\frac{b}{21} = \\frac{c}{42}$",
      "$\\frac{a}{11} = \\frac{b}{22} = \\frac{c}{42}$",
      "$\\frac{a}{10} = \\frac{b}{22} = \\frac{c}{42}$"
    ],
    correct_option: "C",
    solution_text: "The maximum value of $^nC_k$ occurs at the middle term:\n$a = ^{19}C_9 = ^{19}C_{10}$\n$b = ^{20}C_{10}$\n$c = ^{21}C_{10} = ^{21}C_{11}$\n\nRelating $a, b, c$:\n$b = ^{20}C_{10} = \\frac{20}{10} \\cdot ^{19}C_9 = 2a \\implies \\frac{b}{a} = 2$\n$c = ^{21}C_{10} = \\frac{21}{11} \\cdot ^{20}C_{10} = \\frac{21}{11} b$\n\nDividing by 42:\n$\\frac{a}{11} = \\frac{b}{22} = \\frac{c}{42}$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 65,
    question_text: "The number of 4-letter words (with or without meaning) that can be formed from the eleven letters of the word EXAMINATION is:",
    options: [],
    correct_option: null,
    numeric_answer: 2454,
    solution_text: "The letters of EXAMINATION are:\nA: 2, I: 2, N: 2, E: 1, X: 1, M: 1, T: 1, O: 1 (11 letters total, 8 distinct letters).\n\nCase 1: All 4 letters are distinct:\nChoose 4 from 8 distinct letters: $^8C_4 \\times 4! = 70 \\times 24 = 1680$.\n\nCase 2: 2 letters alike and 2 distinct:\nChoose 1 pair of alike letters from {A, I, N}: $^3C_1 = 3$.\nChoose 2 distinct letters from the remaining 7 distinct letters: $^7C_2 = 21$.\nArrangement: $\\frac{4!}{2!} = 12$.\nWays = $3 \\times 21 \\times 12 = 756$.\n\nCase 3: 2 alike of one kind and 2 alike of another kind:\nChoose 2 pairs from {A, I, N}: $^3C_2 = 3$.\nArrangement: $\\frac{4!}{2! 2!} = 6$.\nWays = $3 \\times 6 = 18$.\n\nTotal number of 4-letter words = 1680 + 756 + 18 = 2454.\n\nHence, the answer is 2454.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 66,
    question_text: "If the number of five-digit numbers with distinct digits and 2 at the 10's place is $336 k$, then $k$ is equal to:",
    options: ["4", "6", "7", "8"],
    correct_option: "D",
    solution_text: "A 5-digit number has places: Ten-thousands, Thousands, Hundreds, Tens, Units.\nThe tens place is fixed with the digit 2 (1 choice).\nAvailable digits: {0, 1, 3, 4, 5, 6, 7, 8, 9} (9 digits).\n- The ten-thousands place cannot be 0, so it can be filled in 8 ways.\n- The thousands place can be filled by any of the remaining 8 digits in 8 ways.\n- The hundreds place can be filled in 7 ways.\n- The units place can be filled in 6 ways.\n\nTotal 5-digit numbers = 8 × 8 × 7 × 6 = 2688.\nGiven $2688 = 336 k \\implies k = \\frac{2688}{336} = 8$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 67,
    question_text: "If the letters of the word 'MOTHER' be permuted and all the words so formed (with or without meaning) be listed as in a dictionary, then the position of the word MOTHER is:",
    options: [],
    correct_option: null,
    numeric_answer: 309,
    solution_text: "The letters of MOTHER in alphabetical order are E, H, M, O, R, T (6 distinct letters).\n\n1) Words starting with E: $5! = 120$\n2) Words starting with H: $5! = 120$\n3) Words starting with M:\n   - Starting with ME: $4! = 24$\n   - Starting with MH: $4! = 24$\n   - Starting with MO:\n     - Starting with MOE: $3! = 6$\n     - Starting with MOH: $3! = 6$\n     - Starting with MOR: $3! = 6$\n     - Starting with MOT:\n       - Starting with MOTE: $2! = 2$ (MOTEHR, MOTERH)\n       - Starting with MOTH: The next alphabetical letters are E, R, giving MOTHER as the 1st word.\n\nTotal words preceding MOTHER = 120 + 120 + 24 + 24 + 6 + 6 + 6 + 2 = 308.\nPosition of MOTHER = 308 + 1 = 309.\n\nHence, the answer is 309.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 68,
    question_text: "Let $n > 2$ be an integer. Suppose that there are $n$ Metro stations in a city located around a circular path. Each pair of nearest stations is connected by a blue line. Further, each pair of non-adjacent stations is connected by a red line. If the number of red lines is 99 times the number of blue lines, then the value of $n$ is:",
    options: ["201", "200", "101", "199"],
    correct_option: "A",
    solution_text: "Since each pair of nearest (adjacent) stations is connected by a blue line, the number of blue lines is $n$.\nEach pair of non-adjacent stations is connected by a red line, so the number of red lines is the number of diagonals of an $n$-gon:\nNumber of red lines = $\\frac{n(n-3)}{2}$.\n\nGiven:\n$\\frac{n(n-3)}{2} = 99n$\nSince $n > 2$, dividing by $n$ gives:\n$\\frac{n-3}{2} = 99 \\implies n - 3 = 198 \\implies n = 201$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 69,
    question_text: "The total number of 3-digit numbers whose sum of digits is 10, is:",
    options: [],
    correct_option: null,
    numeric_answer: 54,
    solution_text: "Let the 3-digit number be $abc$, where $a \\in \\{1, 2, \\dots, 9\\}$ and $b, c \\in \\{0, 1, \\dots, 9\\}$.\nWe have $a + b + c = 10$.\nLet $a' = a - 1 \\ge 0$, then $a' \\le 8$ and $a' + b + c = 9$.\n\nThe total number of non-negative integer solutions to $a' + b + c = 9$ is:\n$^{9+3-1}C_{3-1} = ^{11}C_2 = \\frac{11 \\times 10}{2} = 55$.\n\nSince $a' \\le 8$, the only invalid case is $a' = 9$ (which corresponds to $a = 10, b = 0, c = 0$), which is 1 case.\n\nTotal valid 3-digit numbers = 55 - 1 = 54.\n\nHence, the answer is 54.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 70,
    question_text: "A test consists of 6 multiple choice questions, each having 4 alternative answers of which only one is correct. The number of ways, in which a candidate answers all six questions such that exactly four of the answers are correct, is:",
    options: [],
    correct_option: null,
    numeric_answer: 135,
    solution_text: "For each question, there is 1 correct option and 3 incorrect options.\nTo have exactly 4 correct answers out of 6:\n- Choose which 4 questions are correct: $^6C_4 = 15$ ways.\n- For each correct question, there is 1 way to answer: $1^4 = 1$.\n- For the 2 incorrect questions, there are 3 wrong choices for each: $3^2 = 9$ ways.\n\nTotal number of ways = $15 \\times 1 \\times 9 = 135$.\n\nHence, the answer is 135.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 71,
    question_text: "The number of words, with or without meaning, that can be formed by taking 4 letters at a time from the letters of the word 'SYLLABUS' such that two letters are distinct and two letters are alike, is:",
    options: [],
    correct_option: null,
    numeric_answer: 240,
    solution_text: "The letters of the word SYLLABUS are: S: 2, L: 2, Y: 1, A: 1, B: 1, U: 1 (8 letters total).\nPairs of alike letters: {S, L} (2 pairs).\nDistinct letters: {S, L, Y, A, B, U} (6 distinct).\n\nTo form a 4-letter word with 2 alike letters and 2 distinct letters:\n- Choose 1 alike pair from {S, L}: $^2C_1 = 2$ ways.\n- Choose 2 distinct letters from the remaining 5 distinct letters: $^5C_2 = 10$ ways.\n- Arrange these 4 letters (with 2 identical): $\\frac{4!}{2!} = 12$ ways.\n\nTotal number of words = 2 × 10 × 12 = 240.\n\nHence, the answer is 240.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 72,
    question_text: "There are 3 sections in a question paper and each section contains 5 questions. A candidate has to answer a total of 5 questions, choosing at least one question from each section. Then the number of ways, in which the candidate can choose the questions, is:",
    options: ["3000", "1500", "2255", "2250"],
    correct_option: "D",
    solution_text: "The 5 questions can be distributed among the 3 sections in two ways:\n\nCase 1: 3 questions from one section, and 1 question from each of the other two sections (3, 1, 1):\n- Choose the section with 3 questions: $^3C_1 = 3$ ways.\n- Select the questions: $^5C_3 \\times ^5C_1 \\times ^5C_1 = 10 \\times 5 \\times 5 = 250$.\nWays = 3 × 250 = 750.\n\nCase 2: 2 questions from two sections, and 1 question from the third section (2, 2, 1):\n- Choose the section with 1 question: $^3C_1 = 3$ ways.\n- Select the questions: $^5C_2 \\times ^5C_2 \\times ^5C_1 = 10 \\times 10 \\times 5 = 500$.\nWays = 3 × 500 = 1500.\n\nTotal number of ways = 750 + 1500 = 2250.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 73,
    question_text: "Two families with three members each and one family with four members are to be seated in a row. In how many ways can they be seated so that the same family members are not separated?",
    options: ["$2!(3!)^2(4!)$", "$(3!)^3(4!)$", "$(3!)^2(4!)$", "$3!(4!)^3$"],
    correct_option: "B",
    solution_text: "There are 3 families: two with 3 members and one with 4 members.\nSince members of each family must remain together, treat each family as a single unit.\n- The 3 family units can be arranged in a row in $3!$ ways.\n- The members of the first family of 3 can be arranged among themselves in $3!$ ways.\n- The members of the second family of 3 can be arranged among themselves in $3!$ ways.\n- The members of the family of 4 can be arranged among themselves in $4!$ ways.\n\nTotal number of arrangements = $3! \\times 3! \\times 3! \\times 4! = (3!)^3(4!)$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 74,
    question_text: "The number of words (with or without meaning) that can be formed from all the letters of the word LETTER in which vowels never come together is:",
    options: [],
    correct_option: null,
    numeric_answer: 120,
    solution_text: "The letters of LETTER are L: 1, E: 2, T: 2, R: 1 (total 6 letters).\nVowels: E, E (2 vowels); Consonants: L, T, T, R (4 consonants).\n\nTotal arrangements of the letters of LETTER:\n$\\frac{6!}{2! 2!} = \\frac{720}{4} = 180$.\n\nArrangements where vowels (EE) come together:\nTreat (EE) as a single unit. There are 5 units: (EE), L, T, T, R.\nNumber of arrangements = $\\frac{5!}{2!} = \\frac{120}{2} = 60$.\n\nNumber of arrangements where vowels never come together:\n$= 180 - 60 = 120$.\n\nHence, the answer is 120.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 75,
    question_text: "A scientific committee is to be formed from 6 Indians and 8 foreigners, which includes at least 2 Indians and double the number of foreigners as Indians. Then the number of ways, the committee can be formed, is:",
    options: ["1050", "1625", "575", "560"],
    correct_option: "B",
    solution_text: "Let the number of Indians be $k$. Then the number of foreigners is $2k$.\nWe are given $k \\ge 2$ and there are 8 foreigners available, so $2k \\le 8 \\implies k \\le 4$.\nThus, $k \\in \\{2, 3, 4\\}$.\n\nCase 1: $k = 2$ (2 Indians, 4 Foreigners):\n$^6C_2 \\times ^8C_4 = 15 \\times 70 = 1050$.\n\nCase 2: $k = 3$ (3 Indians, 6 Foreigners):\n$^6C_3 \\times ^8C_6 = 20 \\times 28 = 560$.\n\nCase 3: $k = 4$ (4 Indians, 8 Foreigners):\n$^6C_4 \\times ^8C_8 = 15 \\times 1 = 15$.\n\nTotal number of ways = 1050 + 560 + 15 = 1625.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  }
];

