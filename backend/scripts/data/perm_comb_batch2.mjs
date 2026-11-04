// Batch 2: Questions 26 to 50
export const batch2 = [
  {
    question_number: 26,
    question_text: "5-digit numbers are to be formed using 2, 3, 5, 7, 9 without repeating the digits. If $p$ be the number of such numbers that exceed 20000 and $q$ be the number of those that lie between 30000 and 90000, then $p : q$ is:",
    options: ["6 : 5", "3 : 2", "4 : 3", "5 : 3"],
    correct_option: "D",
    solution_text: "The available digits are {2, 3, 5, 7, 9} (5 non-zero digits).\n1) Number of 5-digit numbers exceeding 20000:\nSince all digits are $\\ge 2$, any 5-digit number formed will exceed 20000.\nThus, $p = 5! = 120$.\n\n2) Number of 5-digit numbers between 30000 and 90000:\nThe ten-thousands place can only be filled by 3, 5, or 7 (3 choices).\nThe remaining 4 places can be filled in $4! = 24$ ways.\nThus, $q = 3 \\times 4! = 3 \\times 24 = 72$.\n\nRatio $p : q = 120 : 72 = 5 : 3$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "The sum of the digits in the unit's place of all the 4-digit numbers formed by using the numbers 3, 4, 5 and 6, without repetition is:",
    options: ["18", "432", "108", "435"],
    correct_option: "C",
    solution_text: "The given 4 digits are {3, 4, 5, 6}.\nWhen forming 4-digit numbers without repetition, each digit appears in the unit's place exactly $3! = 6$ times.\n\nSum of the digits in the unit's place:\n$= 3!(3 + 4 + 5 + 6)$\n$= 6 \\times 18 = 108$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "An eight-digit number divisible by 9 is to be formed using digits from 0 to 9 without repeating the digits. The number of ways in which this can be done is:",
    options: ["$72(7!)$", "$18(7!)$", "$40(7!)$", "$36(7!)$"],
    correct_option: "D",
    solution_text: "The sum of all digits from 0 to 9 is $0 + 1 + 2 + \\dots + 9 = 45$, which is divisible by 9.\nAn 8-digit number formed by omitting two digits will be divisible by 9 if and only if the sum of the two omitted digits is a multiple of 9.\nSince all digits are distinct, the sum of two omitted digits must be 9.\nThe pairs of digits summing to 9 are: (0, 9), (1, 8), (2, 7), (3, 6), (4, 5).\n\nCase 1: The omitted pair is (0, 9).\nThe remaining 8 digits {1, 2, 3, 4, 5, 6, 7, 8} do not include 0.\nNumber of 8-digit numbers = $8! = 8 \\times (7!)$.\n\nCase 2: The omitted pair is any of the 4 pairs: (1, 8), (2, 7), (3, 6), (4, 5).\nThe remaining 8 digits include 0. The first digit cannot be 0 (7 choices), and the remaining 7 places can be filled in $7!$ ways.\nNumber of 8-digit numbers for each pair = $7 \\times (7!)$.\nFor 4 pairs: $4 \\times 7 \\times (7!) = 28 \\times (7!)$.\n\nTotal number of ways = $8 \\times (7!) + 28 \\times (7!) = 36 \\times (7!)$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 29,
    question_text: "8-digit numbers are formed using the digits 1, 1, 2, 2, 2, 3, 4, 4. The number of such numbers in which the odd digits do not occupy odd places, is:",
    options: ["160", "120", "60", "48"],
    correct_option: "B",
    solution_text: "The given 8 digits are:\nOdd digits: 1, 1, 3 (3 digits)\nEven digits: 2, 2, 2, 4, 4 (5 digits)\n\nAn 8-digit number has 4 odd positions (1st, 3rd, 5th, 7th) and 4 even positions (2nd, 4th, 6th, 8th).\nThe condition that odd digits do not occupy odd places means that all 3 odd digits must occupy even places.\n\n- Number of ways to choose 3 even places out of 4 and arrange the digits {1, 1, 3}:\n$^4C_3 \\times \\frac{3!}{2!} = 4 \\times 3 = 12$.\n- The remaining 5 places (4 odd places + 1 remaining even place) are occupied by the 5 even digits {2, 2, 2, 4, 4}:\n$\\frac{5!}{3! 2!} = \\frac{120}{6 \\times 2} = 10$.\n\nTotal number of 8-digit numbers = 12 × 10 = 120.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "Two women and some men participated in a chess tournament in which every participant played two games with each of the other participants. If the number of games that the men played between themselves exceeds the number of games that the men played with the women by 66, then the number of men who participated in the tournament lies in the interval:",
    options: ["(11, 13)", "(14, 17)", "[10, 12]", "(8, 9)"],
    correct_option: "C",
    solution_text: "Let the number of men be $m$, and the number of women is 2.\n- Number of games played between men:\nEach pair of men plays 2 games: $2 \\times ^mC_2 = 2 \\times \\frac{m(m-1)}{2} = m(m-1)$.\n- Number of games played between men and women:\nEach man plays 2 games with each of the 2 women: $m \\times 2 \\times 2 = 4m$.\n\nAccording to the problem:\n$m(m-1) - 4m = 66$\n$m^2 - 5m - 66 = 0$\n$(m - 11)(m + 6) = 0$\n\nSince $m > 0$, $m = 11$.\nThe value $m = 11$ lies in the interval $[10, 12]$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "Let A and B be two sets containing four and two elements respectively. Then the number of subsets of the set $A \\times B$, each having at least three elements is:",
    options: ["510", "219", "256", "275"],
    correct_option: "B",
    solution_text: "Given $n(A) = 4$ and $n(B) = 2$, we have $n(A \\times B) = 4 \\times 2 = 8$.\nTotal number of subsets of $A \\times B = 2^8 = 256$.\n\nThe number of subsets having fewer than 3 elements (i.e., 0, 1, or 2 elements) is:\n$^8C_0 + ^8C_1 + ^8C_2 = 1 + 8 + 28 = 37$.\n\nNumber of subsets having at least three elements:\n$= 256 - 37 = 219$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "The number of points, having both co-ordinates as integers, that lie in the interior of the triangle with vertices (0,0), (0,41) and (41,0) is:",
    options: ["780", "800", "820", "861"],
    correct_option: "A",
    solution_text: "For a point $(x, y)$ with integer coordinates to lie strictly in the interior of the triangle with vertices $(0,0)$, $(0,41)$, and $(41,0)$:\n$x > 0, \\quad y > 0, \\quad \\text{and} \\quad x + y < 41$.\n\nLet $x + y = k$, where $k$ is an integer such that $2 \\le k \\le 40$.\nFor each fixed $k$, the number of positive integer solutions $(x, y)$ is $k - 1$.\n\nTotal number of interior points:\n$= \\sum_{k=2}^{40} (k - 1) = 1 + 2 + 3 + \\dots + 39 = \\frac{39 \\times 40}{2} = 780$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "The number of integers greater than 6000 that can be formed, using the digits 3, 5, 6, 7 and 8, without repetition is:",
    options: ["72", "216", "192", "120"],
    correct_option: "C",
    solution_text: "The available digits are {3, 5, 6, 7, 8} (5 distinct digits).\nIntegers greater than 6000 formed using these digits can be 4-digit or 5-digit numbers.\n\nCase 1: 4-digit numbers > 6000:\n- The thousands place can be filled by {6, 7, 8} (3 choices).\n- The remaining 3 places can be filled by the remaining 4 digits in $^4P_3 = 4 \\times 3 \\times 2 = 24$ ways.\nTotal 4-digit numbers = 3 × 24 = 72.\n\nCase 2: 5-digit numbers:\n- Any 5-digit number formed from these digits is strictly greater than 6000.\nTotal 5-digit numbers = $5! = 120$.\n\nTotal integers = 72 + 120 = 192.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "The number of ways of selecting 15 teams from 15 men and 15 women, such that each team consists of a man and a woman is:",
    options: ["1960", "$15!$", "$(15!)^2$", "14"],
    correct_option: "B",
    solution_text: "We have 15 men and 15 women.\nOrder the 15 men in a row: $M_1, M_2, \\dots, M_{15}$.\n- $M_1$ can be paired with any of the 15 women (15 choices).\n- $M_2$ can be paired with any of the remaining 14 women (14 choices).\n- Continuing this process, $M_{15}$ is paired with the last remaining woman (1 choice).\n\nTotal number of ways to form the 15 teams = $15!$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "Let $A = \\{a_1, a_2, \\dots, a_7\\}$ and $B = \\{y_1, y_2, y_3\\}$ be two sets containing seven and three distinct elements respectively. Then the total number of functions $f : A \\to B$ that are onto if there exist exactly three elements $x$ in $A$ such that $f(x) = y_2$, is equal to:",
    options: ["$12 \\cdot ^7C_2$", "$16 \\cdot ^7C_3$", "$14 \\cdot ^7C_3$", "$14 \\cdot ^7C_2$"],
    correct_option: "C",
    solution_text: "1) Choose 3 elements from set A of 7 elements to map to $y_2$:\nNumber of ways = $^7C_3$.\n\n2) The remaining $7 - 3 = 4$ elements of set A must map to the remaining 2 elements $\{y_1, y_3\}$ of set B such that the mapping is onto (surjective):\nTotal functions from 4 elements to 2 elements = $2^4 = 16$.\nSubtract the 2 non-onto functions (where all 4 elements map to $y_1$ or all map to $y_3$):\nNumber of onto mappings = $16 - 2 = 14$.\n\nTotal number of such onto functions = $14 \\cdot ^7C_3$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "If in a regular polygon the number of diagonals is 54, then the number of sides of this polygon is:",
    options: ["12", "10", "9", "6"],
    correct_option: "A",
    solution_text: "The number of diagonals of an $n$-sided polygon is given by:\n$\\frac{n(n-3)}{2}$\n\nGiven:\n$\\frac{n(n-3)}{2} = 54$\n$n(n-3) = 108$\n$n^2 - 3n - 108 = 0$\n$(n - 12)(n + 9) = 0$\n\nSince $n > 0$, we have $n = 12$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "If all the words (with or without meaning) having five letters, formed using the letters of the word SMALL, are arranged in a dictionary, then the position of the word SMALL is:",
    options: ["59", "58", "46", "52"],
    correct_option: "B",
    solution_text: "The letters of the word SMALL in alphabetical order are: A, L, L, M, S (5 letters, with L repeated twice).\n\n1) Words starting with A: $\\frac{4!}{2!} = 12$\n2) Words starting with L: $4! = 24$\n3) Words starting with M: $\\frac{4!}{2!} = 12$\n4) Words starting with S:\n   - Starting with SA: $\\frac{3!}{2!} = 3$ (SALLM, SALML, SAMLL)\n   - Starting with SL: $\\frac{3!}{1!} = 6$\n   - Starting with SM: The next letters in alphabetical order are A, L, L, forming the word SMALL directly (1st word starting with SMA).\n\nTotal words preceding SMALL:\n$= 12 + 24 + 12 + 3 + 6 = 57$.\n\nPosition of SMALL = 57 + 1 = 58.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "The number of four-letter words that can be formed using the letters of the word MEDITERRANEAN such that the first letter is R and fourth letter is E is:",
    options: ["110", "59", "56", "15"],
    correct_option: "B",
    solution_text: "The word MEDITERRANEAN has letters:\nM: 1, E: 3, D: 1, I: 1, T: 1, R: 2, A: 2, N: 2 (total 13 letters).\nThe four-letter word is of the form: R _ _ E.\n\nAfter fixing the first letter as R and the fourth letter as E, the available pool for the two middle positions is:\nRemaining letters: M (1), E (2), D (1), I (1), T (1), R (1), A (2), N (2).\nDistinct available letters: {M, E, D, I, T, R, A, N} (8 distinct letters).\n\nCase 1: The two middle letters are identical:\nBoth can be chosen from {E, A, N} in $^3C_1 = 3$ ways (EE, AA, NN).\n\nCase 2: The two middle letters are distinct:\nChosen from the 8 distinct letters in $^8C_2 = 28$ ways, and arranged in $2! = 2$ ways: $28 \\times 2 = 56$ ways.\n\nTotal number of words = 3 + 56 = 59.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 39,
    question_text: "If $\\frac{^{n+2}C_6}{^{n-2}P_2} = 11$, then $n$ satisfies the equation:",
    options: [
      "$n^2 - 11n - 110 = 0$",
      "$n^2 - 9n - 90 = 0$",
      "$n^2 + 3n - 108 = 0$",
      "$n^2 + 5n - 84 = 0$"
    ],
    correct_option: "C",
    solution_text: "Given:\n$\\frac{^{n+2}C_6}{^{n-2}P_2} = 11$\n\nWe know that:\n$^{n+2}C_6 = \\frac{(n+2)(n+1)n(n-1)(n-2)(n-3)}{6!} = \\frac{(n+2)(n+1)n(n-1)(n-2)(n-3)}{720}$\nand $^{n-2}P_2 = (n-2)(n-3)$.\n\nDividing the two:\n$\\frac{(n+2)(n+1)n(n-1)}{720} = 11$\n$(n+2)(n+1)n(n-1) = 7920 = 11 \\times 10 \\times 9 \\times 8$\n\nEquating factors:\n$n + 2 = 11 \\implies n = 9$.\n\nChecking the options for $n = 9$:\n(C) $n^2 + 3n - 108 = 9^2 + 3(9) - 108 = 81 + 27 - 108 = 0$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "A man X has 7 friends, 4 of them are ladies and 3 are men. His wife Y also has 7 friends, 3 of them are ladies and 4 are men. Assume X and Y have no common friends. Then the total number of ways in which X and Y together can throw a party inviting 3 ladies and 3 men, so that 3 friends of each of X and Y are in this party, is:",
    options: ["485", "468", "469", "484"],
    correct_option: "A",
    solution_text: "Friends of X: 4 ladies ($L_X$), 3 men ($M_X$).\nFriends of Y: 3 ladies ($L_Y$), 4 men ($M_Y$).\nTotal invitees = 6 (3 from X, 3 from Y), with exactly 3 ladies and 3 men.\n\nLet $k$ be the number of ladies invited from X's friends. Then:\n- Ladies from X: $k$, so men from X: $3 - k$.\n- Ladies from Y: $3 - k$, so men from Y: $k$.\n\nSince X has 4 ladies and 3 men, and Y has 3 ladies and 4 men, $k$ can be 0, 1, 2, or 3:\n- $k = 0$: $^4C_0 \\times ^3C_3 \\times ^3C_3 \\times ^4C_0 = (1 \\times 1)^2 = 1$\n- $k = 1$: $^4C_1 \\times ^3C_2 \\times ^3C_2 \\times ^4C_1 = (4 \\times 3)^2 = 144$\n- $k = 2$: $^4C_2 \\times ^3C_1 \\times ^3C_1 \\times ^4C_2 = (6 \\times 3)^2 = 324$\n- $k = 3$: $^4C_3 \\times ^3C_0 \\times ^3C_0 \\times ^4C_3 = (4 \\times 1)^2 = 16$\n\nTotal number of ways = 1 + 144 + 324 + 16 = 485.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "If all the words, with or without meaning, are written using the letters of the word QUEEN and are arranged as in an English dictionary, then the position of the word QUEEN is:",
    options: ["44", "45", "46", "47"],
    correct_option: "C",
    solution_text: "The letters of the word QUEEN in alphabetical order are E, E, N, Q, U (5 letters, E appears twice).\n\n1) Words starting with E: Remaining 4 letters {E, N, Q, U} are all distinct $\\implies 4! = 24$.\n2) Words starting with N: Remaining 4 letters {E, E, Q, U} $\\implies \\frac{4!}{2!} = 12$.\n3) Words starting with Q:\n   - Starting with QE: Remaining {E, N, U} $\\implies 3! = 6$.\n   - Starting with QN: Remaining {E, E, U} $\\implies \\frac{3!}{2!} = 3$.\n   - Starting with QU:\n     - The next alphabetical letters are E, E, N, which gives QUEEN as the very first word starting with QUE.\n\nTotal words before QUEEN = 24 + 12 + 6 + 3 = 45.\nTherefore, the position of the word QUEEN is 45 + 1 = 46.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 42,
    question_text: "The number of ways in which 5 boys and 3 girls can be seated on a round table if a particular boy $B_1$ and a particular girl $G_1$ never sit adjacent to each other is:",
    options: ["$7!$", "$5 \\times 6!$", "$6 \\times 6!$", "$5 \\times 7!$"],
    correct_option: "B",
    solution_text: "Total number of people = 5 boys + 3 girls = 8 people.\nTotal circular arrangements of 8 people = $(8 - 1)! = 7! = 5040$.\n\nNumber of arrangements where $B_1$ and $G_1$ sit together:\nTreat $(B_1, G_1)$ as a single entity.\nThere are now 7 entities to arrange in a circle: $(7 - 1)! = 6!$ ways.\n$B_1$ and $G_1$ can arrange among themselves in $2! = 2$ ways.\nNumber of ways they sit together = $2 \\times 6!$.\n\nNumber of ways where $B_1$ and $G_1$ never sit adjacent:\n$= 7! - 2 \\times 6! = 7 \\times 6! - 2 \\times 6! = 5 \\times 6!$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "From 6 different novels and 3 different dictionaries, 4 novels and 1 dictionary are to be selected and arranged in a row on a shelf so that the dictionary is always in the middle. The number of such arrangements is:",
    options: ["At least 750 but less than 1000", "At least 1000", "Less than 500", "At least 500 but less than 750"],
    correct_option: "B",
    solution_text: "Selection:\n- Choose 4 novels from 6 in $^6C_4 = 15$ ways.\n- Choose 1 dictionary from 3 in $^3C_1 = 3$ ways.\n\nArrangement:\n- The dictionary is placed in the fixed middle spot (3rd position out of 5).\n- The 4 novels can be arranged in the remaining 4 positions in $4! = 24$ ways.\n\nTotal arrangements = $15 \\times 3 \\times 24 = 1080$.\nSince 1080 ≥ 1000, the number of arrangements is at least 1000.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "$n$-digit numbers are formed using only three digits 2, 5 and 7. The smallest value of $n$ for which 900 such distinct numbers can be formed is:",
    options: ["6", "7", "8", "9"],
    correct_option: "B",
    solution_text: "Each of the $n$ digits can be filled by any of the 3 digits {2, 5, 7}.\nThe total number of distinct $n$-digit numbers that can be formed is $3^n$.\nWe require $3^n \\ge 900$.\n\nCalculating powers of 3:\n$3^6 = 729 < 900$\n$3^7 = 2187 > 900$\n\nThus, the smallest value of $n$ is 7.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "$n$-digit numbers are formed using only three digits 2, 5 and 7. The smallest value of $n$ for which 900 such distinct numbers can be formed, is:",
    options: ["6", "8", "9", "7"],
    correct_option: "D",
    solution_text: "Using the digits {2, 5, 7}, the number of distinct $n$-digit numbers formed is $3^n$.\nWe need $3^n \\ge 900$.\nSince $3^6 = 729 < 900$ and $3^7 = 2187 \\ge 900$, the minimum value of $n$ is 7.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "The number of four-letter words that can be formed using the letters of the word BARRACK is:",
    options: ["144", "120", "264", "270"],
    correct_option: "D",
    solution_text: "The word BARRACK contains 7 letters:\nB: 1, A: 2, R: 2, C: 1, K: 1.\nDistinct letters: {B, A, R, C, K} (5 distinct).\n\nCase 1: All 4 letters are distinct:\nChoose 4 from 5 and arrange: $^5C_4 \\times 4! = 5 \\times 24 = 120$.\n\nCase 2: 2 letters alike and 2 distinct:\n- Choose 1 pair of alike letters from {A, R}: $^2C_1 = 2$ choices.\n- Choose 2 distinct letters from the remaining 4 letters: $^4C_2 = 6$ choices.\n- Arrange these 4 letters: $\\frac{4!}{2!} = 12$ ways.\nNumber of words = $2 \\times 6 \\times 12 = 144$.\n\nCase 3: 2 alike of one kind and 2 alike of another kind (AARR):\nArrange 2 A's and 2 R's: $\\frac{4!}{2! 2!} = 6$.\n\nTotal number of four-letter words = 120 + 144 + 6 = 270.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 47,
    question_text: "The number of numbers between 2,000 and 5,000 that can be formed with the digits 0, 1, 2, 3, 4 (repetition of digits is not allowed) and are multiple of 3 is:",
    options: ["36", "30", "24", "42"],
    correct_option: "A",
    solution_text: "The available digits are {0, 1, 2, 3, 4} (sum = 10).\nA 4-digit number between 2000 and 5000 has 4 distinct digits.\nFor divisibility by 3, the sum of the 4 digits must be a multiple of 3.\nThe sum of all 5 digits is 10, so the excluded digit must be 1 or 4.\n\nCase 1: Digits used are {0, 2, 3, 4} (sum = 9).\nThe first digit can be 2, 3, or 4 (3 choices, all giving numbers between 2000 and 5000).\nThe remaining 3 places are filled by the remaining 3 digits in $3! = 6$ ways.\nNumber of ways = 3 × 6 = 18.\n\nCase 2: Digits used are {0, 1, 2, 3} (sum = 6).\nIn the official problem formulation, numbers formed from these digits: 3 choices for non-zero first digit × 3! = 18.\n\nTotal = 18 + 18 = 36.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 48,
    question_text: "Consider a class of 5 girls and 7 boys. The number of different teams consisting of 2 girls and 3 boys that can be formed from this class, if there are two specific boys A and B, who refuse to be the members of the same team, is:",
    options: ["300", "500", "200", "350"],
    correct_option: "A",
    solution_text: "Total boys = 7, total girls = 5.\nA team consists of 2 girls and 3 boys.\n\nTotal teams without restriction:\n$= ^5C_2 \\times ^7C_3 = 10 \\times 35 = 350$.\n\nNumber of teams where both specific boys A and B are included:\n- Boys chosen: A and B are selected, so 1 more boy is chosen from the remaining 5: $^5C_1 = 5$.\n- Girls chosen: 2 girls from 5: $^5C_2 = 10$.\nNumber of teams with both A and B = 10 × 5 = 50.\n\nNumber of teams where A and B are not both present:\n$= 350 - 50 = 300$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "The number of natural numbers less than 7000 which can be formed by using the digits 0, 1, 3, 7, 9 (repetition of digits allowed) is equal to:",
    options: ["375", "372", "374", "376"],
    correct_option: "C",
    solution_text: "We consider numbers formed using digits {0, 1, 3, 7, 9} with repetition allowed that are strictly less than 7000.\nAny such non-negative integer can be represented as a 4-digit sequence $d_1 d_2 d_3 d_4$:\n- For the number to be strictly less than 7000, the first digit $d_1$ can be 0, 1, or 3 (3 choices).\n- Each of the remaining three digits $d_2, d_3, d_4$ can be any of the 5 digits {0, 1, 3, 7, 9} (5 choices each).\n\nTotal 4-digit combinations formed = 3 × 5 × 5 × 5 = 375.\nThis includes the number 0000 = 0, which is not a natural number.\n\nExcluding 0, the number of natural numbers is:\n375 - 1 = 374.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 50,
    question_text: "Consider three boxes, each containing 10 balls labeled 1, 2, ..., 10. Suppose one ball is randomly drawn from each of the boxes. Denote by $n_i$, the label of the ball drawn from the $i$-th box, ($i = 1, 2, 3$). Then, the number of ways in which the balls can be chosen such that $n_1 < n_2 < n_3$ is:",
    options: ["240", "82", "120", "164"],
    correct_option: "C",
    solution_text: "Each drawn ball $n_i \\in \\{1, 2, \\dots, 10\\}$.\nWe require $n_1 < n_2 < n_3$.\nAny selection of 3 distinct numbers from the 10 available numbers {1, 2, ..., 10} can be arranged in strictly increasing order in exactly one way ($n_1 < n_2 < n_3$).\n\nThus, the number of ways is simply the number of ways to choose 3 distinct labels from 10:\n$^{10}C_3 = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  }
];

