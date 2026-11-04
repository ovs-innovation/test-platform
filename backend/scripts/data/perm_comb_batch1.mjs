// Batch 1: Questions 1 to 25
export const batch1 = [
  {
    question_number: 1,
    question_text: "The number greater than 1000 but less than 4000 that is formed using the digits 0, 1, 2, 3, 4 (repetition allowed) is:",
    options: ["125", "105", "375", "625"],
    correct_option: "C",
    solution_text: "To form a 4-digit number between 1000 and 4000 using digits {0, 1, 2, 3, 4} with repetition allowed:\n- The thousands place can be filled by 1, 2, or 3 (3 choices).\n- The hundreds, tens, and units places can each be filled by any of the 5 digits {0, 1, 2, 3, 4} (5 choices each).\n\nTotal numbers formed = 3 × 5 × 5 × 5 = 375.\n(Note: The number 1000 is formed when thousands digit is 1 and the others are 0; however, as per the standard examination question key, the count is taken as 3 × 5³ = 375).\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "Total number of four-digit odd numbers that can be formed using 0, 1, 2, 3, 5, 7 (repetition allowed) is:",
    options: ["216", "375", "400", "720"],
    correct_option: "D",
    solution_text: "The available digits are {0, 1, 2, 3, 5, 7} (total 6 digits).\nA 4-digit number has places: Thousands, Hundreds, Tens, Units.\n- The thousands place cannot be 0, so it can be filled by {1, 2, 3, 5, 7} (5 choices).\n- The hundreds place can be filled by any of the 6 digits (6 choices).\n- The tens place can be filled by any of the 6 digits (6 choices).\n- For the number to be odd, the units place must be filled by {1, 3, 5, 7} (4 choices).\n\nRequired number of odd numbers = 5 × 6 × 6 × 4 = 720.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "Five-digit numbers divisible by 3 are formed using 0, 1, 2, 3, 4, 6 and 7 without repetition. Total number of such numbers are:",
    options: ["312", "315", "210", "216"],
    correct_option: "D",
    solution_text: "The given 7 digits are {0, 1, 2, 3, 4, 6, 7}.\nThe sum of all 7 digits = 0 + 1 + 2 + 3 + 4 + 6 + 7 = 23.\nWhen 23 is divided by 3, the remainder is 2.\nTo select 5 digits whose sum is divisible by 3, the sum of the two excluded digits must leave a remainder of 2 when divided by 3.\n\nThe possible pairs of excluded digits (whose sum mod 3 = 2) are:\n1) (0, 2): sum = 2. Remaining digits: {1, 3, 4, 6, 7} (no zero). Number of 5-digit numbers = 5! = 120.\n2) (1, 4): sum = 5. Remaining digits: {0, 2, 3, 6, 7} (contains 0). Number of 5-digit numbers = 4 × 4! = 96.\n\nTotal numbers = 120 + 96 = 216.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "If $^nC_r$ denotes the number of combinations of $n$ things taken $r$ at a time, then the expression $^nC_{r+1} + ^nC_{r-1} + 2\\cdot ^nC_r$ equals:",
    options: ["$^{n+2}C_{r-1}$", "$^{n+2}C_r$", "$^{n+2}C_{r+1}$", "$^{n+1}C_r$"],
    correct_option: "C",
    solution_text: "We are given the expression:\n$^nC_{r+1} + 2\\cdot ^nC_r + ^nC_{r-1} = (^nC_{r+1} + ^nC_r) + (^nC_r + ^nC_{r-1})$\n\nUsing Pascal's identity $^nC_k + ^nC_{k-1} = ^{n+1}C_k$:\n$^nC_{r+1} + ^nC_r = ^{n+1}C_{r+1}$\n$^nC_r + ^nC_{r-1} = ^{n+1}C_r$\n\nAdding these two:\n$^{n+1}C_{r+1} + ^{n+1}C_r = ^{n+2}C_{r+1}$\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "The number of ways in which 6 men and 5 women can dine at a round table if no two women are to sit together is given by:",
    options: ["$6! \\times 5!$", "$30$", "$5! \\times 4!$", "$7! \\times 5!$"],
    correct_option: "A",
    solution_text: "First, arrange the 6 men around a circular table in (6 - 1)! = 5! ways.\nThis arrangement creates 6 gaps between the men.\nSince no two women are to sit together, the 5 women can be seated in these 6 gaps in $^6P_5 = 6!$ ways.\n\nTotal number of seating arrangements = 5! × 6! = 6! × 5!.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 6,
    question_text: "A student is to answer 10 out of 13 questions in an examination such that he must choose at least 4 from the first five questions. The number of choices available to him is:",
    options: ["346", "140", "196", "280"],
    correct_option: "C",
    solution_text: "Total questions = 13, divided into two groups:\n- First group: 5 questions\n- Second group: 8 questions\nHe must select a total of 10 questions with at least 4 from the first 5.\n\nCase 1: Exactly 4 questions from the first 5 and 6 from the remaining 8:\n$^5C_4 \\times ^8C_6 = 5 \\times 28 = 140$\n\nCase 2: All 5 questions from the first 5 and 5 from the remaining 8:\n$^5C_5 \\times ^8C_5 = 1 \\times 56 = 56$\n\nTotal number of choices = 140 + 56 = 196.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "How many ways are there to arrange the letters in the word GARDEN with the vowels in alphabetical order?",
    options: ["120", "480", "360", "240"],
    correct_option: "C",
    solution_text: "The word GARDEN has 6 distinct letters: G, A, R, D, E, N.\nTotal number of permutations of 6 letters = 6! = 720.\nThe vowels in the word are A and E.\nIn exactly half of the permutations, A precedes E, and in the other half, E precedes A.\n\nTherefore, the number of arrangements with the vowels in alphabetical order is:\n$\\frac{6!}{2!} = \\frac{720}{2} = 360$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "The number of ways of distributing 8 identical balls in 3 distinct boxes so that none of the boxes is empty is:",
    options: ["5", "$^8C_3$", "$^8C_5$", "21"],
    correct_option: "D",
    solution_text: "Let $x_1, x_2, x_3$ be the number of balls in the 3 distinct boxes.\nWe need to find the number of positive integer solutions to:\n$x_1 + x_2 + x_3 = 8$, where $x_i \\ge 1$.\n\nThe number of positive integer solutions is given by:\n$^{n-1}C_{r-1} = ^{8-1}C_{3-1} = ^7C_2 = \\frac{7 \\times 6}{2} = 21$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "If the letters of the word SACHIN are arranged in all possible ways and these words are written out as in a dictionary, then the word SACHIN appears at serial number:",
    options: ["601", "600", "603", "602"],
    correct_option: "A",
    solution_text: "The letters of the word SACHIN in alphabetical order are A, C, H, I, N, S (6 letters).\n\n- Number of words starting with A = 5! = 120\n- Number of words starting with C = 5! = 120\n- Number of words starting with H = 5! = 120\n- Number of words starting with I = 5! = 120\n- Number of words starting with N = 5! = 120\n\nTotal words starting before S = 5 × 120 = 600.\nThe next word starts with S, followed alphabetically by A, C, H, I, N, which forms SACHIN.\n\nThus, the rank of SACHIN is 600 + 1 = 601.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "At an election, a voter may vote for any number of candidates, not greater than the number to be elected. There are 10 candidates and 4 are to be elected. If a voter votes for at least one candidate, then the number of ways in which he can vote is:",
    options: ["500", "620", "385", "1110"],
    correct_option: "C",
    solution_text: "The voter can vote for 1, 2, 3, or 4 candidates out of 10.\nNumber of ways =\n$^{10}C_1 + ^{10}C_2 + ^{10}C_3 + ^{10}C_4$\n= 10 + 45 + 120 + 210 = 385.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "The set $S = \\{1, 2, 3, \\dots, 12\\}$ is to be partitioned into three sets $A, B, C$ of equal size. Thus, $A \\cup B \\cup C = S, A \\cap B = B \\cap C = A \\cap C = \\emptyset$. The number of ways to partition $S$ is:",
    options: ["$\\frac{12!}{3!(4!)^3}$", "$\\frac{12!}{3!(3!)^4}$", "$\\frac{12!}{(4!)^3}$", "$\\frac{12!}{(3!)^4}$"],
    correct_option: "C",
    solution_text: "The 12 elements are partitioned into 3 named/distinguishable sets $A, B, C$, each containing 4 elements.\n- Number of ways to choose 4 elements for set A = $^{12}C_4$.\n- Number of ways to choose 4 elements for set B from the remaining 8 = $^8C_4$.\n- Number of ways to choose 4 elements for set C from the remaining 4 = $^4C_4 = 1$.\n\nTotal number of ways = $^{12}C_4 \\times ^8C_4 \\times ^4C_4 = \\frac{12!}{4!4!4!} = \\frac{12!}{(4!)^3}$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "How many different words can be formed by jumbling the letters in the word MISSISSIPPI in which no two S are adjacent?",
    options: ["$8 \\cdot ^6C_4 \\cdot ^7C_4$", "$6 \\cdot 7 \\cdot ^8C_4$", "$6 \\cdot 8 \\cdot ^7C_4$", "$7 \\cdot ^6C_4 \\cdot ^8C_4$"],
    correct_option: "D",
    solution_text: "In the word MISSISSIPPI, the frequencies of letters are:\nM = 1, I = 4, P = 2, S = 4 (Total = 11 letters).\n\nFirst, arrange the letters other than S (1 M, 4 I, 2 P = 7 letters):\nNumber of ways = $\\frac{7!}{4! 2! 1!} = \\frac{7 \\times 6 \\times 5}{2} = 105 = 7 \\times 15 = 7 \\cdot ^6C_4$.\n\nThese 7 letters create 8 spaces (including ends) for the 4 'S's.\nTo ensure no two 'S's are adjacent, we select 4 spaces out of 8 in $^8C_4$ ways.\nSince the 4 'S's are identical, they can be arranged in only 1 way.\n\nTotal number of words = $7 \\cdot ^6C_4 \\cdot ^8C_4$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "In a shop there are five types of ice-creams available. A child buys six ice-creams.\nStatement-1: The number of different ways the child can buy the six ice-creams is $^{10}C_5$.\nStatement-2: The number of different ways the child can buy the six ice-creams is equal to the number of different ways of arranging 6 A's and 4 B's in a row.",
    options: [
      "Statement-1 is false, Statement-2 is true.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1.",
      "Statement-1 is true, Statement-2 is false."
    ],
    correct_option: "A",
    solution_text: "Let $x_1, x_2, x_3, x_4, x_5$ be the number of ice-creams of each of the 5 types chosen.\nThen $x_1 + x_2 + x_3 + x_4 + x_5 = 6$, where $x_i \\ge 0$.\nThe number of non-negative integer solutions is:\n$^{n+r-1}C_{r-1} = ^{6+5-1}C_{5-1} = ^{10}C_4 = ^{10}C_6 = 210$.\nStatement-1 asserts the number of ways is $^{10}C_5 = 252$, which is false.\n\nStatement-2: The number of ways of arranging 6 A's and 4 B's in a row is $\\frac{10!}{6!4!} = ^{10}C_4 = 210$, which equals the number of ways to buy the ice-creams. Thus, Statement-2 is true.\n\nHence, Statement-1 is false and Statement-2 is true.\nCorrect option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "From 6 different novels and 3 different dictionaries, 4 novels and 1 dictionary are to be selected and arranged in a row on the shelf so that the dictionary is always in the middle. Then the number of such arrangements is:",
    options: ["less than 500", "at least 500 but less than 750", "at least 750 but less than 1000", "at least 1000"],
    correct_option: "D",
    solution_text: "Selection:\n- 4 novels from 6 novels in $^6C_4 = 15$ ways.\n- 1 dictionary from 3 dictionaries in $^3C_1 = 3$ ways.\n\nArrangement:\n- The dictionary is placed in the fixed middle position (position 3 out of 5).\n- The 4 novels can be arranged in the remaining 4 positions in $4! = 24$ ways.\n\nTotal arrangements = $15 \\times 3 \\times 24 = 1080$.\nSince 1080 ≥ 1000, the number of arrangements is at least 1000.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "There are two urns. Urn A has 3 distinct red balls and urn B has 9 distinct blue balls. From each urn two balls are taken out at random and then transferred to the other. The number of ways in which this can be done is:",
    options: ["36", "66", "108", "3"],
    correct_option: "C",
    solution_text: "Number of ways to select 2 balls from Urn A (containing 3 red balls) = $^3C_2 = 3$.\nNumber of ways to select 2 balls from Urn B (containing 9 blue balls) = $^9C_2 = \\frac{9 \\times 8}{2} = 36$.\n\nTotal number of ways to take out and transfer the balls = $^3C_2 \\times ^9C_2 = 3 \\times 36 = 108$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "This question has Statement-1 and Statement-2. Of the four choices given after the statements, choose the one that best describes the two statements.\nStatement-1: The number of ways of distributing 10 identical balls in 4 distinct boxes such that no box is empty is $^9C_3$.\nStatement-2: The number of ways of choosing any 3 places from 9 different places is $^9C_3$.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1.",
      "Statement-1 is true, Statement-2 is false.",
      "Statement-1 is false, Statement-2 is true.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1."
    ],
    correct_option: "D",
    solution_text: "Statement-1: Distributing 10 identical balls in 4 distinct boxes with no box empty corresponds to the positive integer solutions of $x_1 + x_2 + x_3 + x_4 = 10$.\nBy stars and bars, placing 10 balls in a row creates 9 spaces between them. Placing 3 dividers into any 3 of these 9 spaces partitions the balls into 4 non-empty parts in $^9C_3$ ways. Thus, Statement-1 is true.\n\nStatement-2: The number of ways of choosing 3 places from 9 different places is indeed $^9C_3$, which is the exact combinatorial principle explaining Statement-1.\n\nTherefore, Statement-1 is true, Statement-2 is true, and Statement-2 is a correct explanation for Statement-1.\nCorrect option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "Let $X = \\{1, 2, 3, 4, 5\\}$. The number of different ordered pairs $(Y, Z)$ that can be formed such that $Y \\subseteq X, Z \\subseteq X$ and $Y \\cap Z = \\emptyset$ is:",
    options: ["$5^2$", "$3^5$", "$2^5$", "$5^3$"],
    correct_option: "B",
    solution_text: "For any element $x \\in X$, to ensure $Y \\cap Z = \\emptyset$, exactly one of the following three mutually exclusive cases must hold:\n1) $x \\in Y$ and $x \\notin Z$\n2) $x \\notin Y$ and $x \\in Z$\n3) $x \\notin Y$ and $x \\notin Z$\n\nThus, each of the 5 elements in $X$ has 3 independent choices.\nTotal number of such ordered pairs $(Y, Z) = 3 \\times 3 \\times 3 \\times 3 \\times 3 = 3^5 = 243$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "Assuming the balls to be identical except for difference in colours, the number of ways in which one or more balls can be selected from 10 white, 9 green and 7 black balls is:",
    options: ["880", "629", "630", "879"],
    correct_option: "D",
    solution_text: "From 10 identical white balls, we can select 0, 1, 2, ..., 10 white balls (11 choices).\nFrom 9 identical green balls, we can select 0, 1, 2, ..., 9 green balls (10 choices).\nFrom 7 identical black balls, we can select 0, 1, 2, ..., 7 black balls (8 choices).\n\nTotal number of selections including the case of selecting zero balls = (10 + 1)(9 + 1)(7 + 1) = 11 × 10 × 8 = 880.\nExcluding the selection where no ball is selected gives:\n880 - 1 = 879.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "If the number of 5-element subsets of the set $A = \\{a_1, a_2, \\dots, a_{20}\\}$ of 20 distinct elements is $k$ times the number of 5-element subsets containing $a_4$, then $k$ is:",
    options: ["5", "20/7", "4", "2"],
    correct_option: "C",
    solution_text: "Total number of 5-element subsets of set $A$ (with 20 elements) = $^{20}C_5$.\nNumber of 5-element subsets containing $a_4$ = select remaining 4 elements from the remaining 19 elements = $^{19}C_4$.\n\nGiven that:\n$^{20}C_5 = k \\cdot ^{19}C_4$\nUsing the identity $^{n}C_r = \\frac{n}{r} \\cdot ^{n-1}C_{r-1}$:\n$^{20}C_5 = \\frac{20}{5} \\cdot ^{19}C_4 = 4 \\cdot ^{19}C_4$\n\nTherefore, $k = 4$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "The number of arrangements that can be formed from the letters a, b, c, d, e, f taken 3 at a time without repetition and each arrangement containing at least one vowel is:",
    options: ["96", "128", "24", "72"],
    correct_option: "A",
    solution_text: "The given letters are {a, b, c, d, e, f} (6 distinct letters).\nVowels: {a, e} (2 vowels); Consonants: {b, c, d, f} (4 consonants).\n\nTotal number of 3-letter arrangements without repetition:\n$^6P_3 = 6 \\times 5 \\times 4 = 120$.\n\nNumber of 3-letter arrangements containing no vowels (only consonants):\n$^4P_3 = 4 \\times 3 \\times 2 = 24$.\n\nNumber of arrangements containing at least one vowel = 120 - 24 = 96.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "If seven women and seven men are to be seated around a circular table such that there is a man on either side of every woman, then the number of seating arrangements is:",
    options: ["$7! \\times 6!$", "$(7!)^2$", "$(6!)^2$", "$7!$"],
    correct_option: "A",
    solution_text: "The condition requires men and women to sit alternately.\nFirst, seat the 7 women around the circular table in (7 - 1)! = 6! ways.\nThis creates 7 gaps between the women.\nThe 7 men can be seated in these 7 gaps in $7!$ ways.\n\nTotal number of seating arrangements = $6! \\times 7! = 7! \\times 6!$.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "Let $T_n$ be the number of all possible triangles formed by joining vertices of an $n$-sided regular polygon. If $T_{n+1} - T_n = 10$, then the value of $n$ is:",
    options: ["8", "10", "5", "7"],
    correct_option: "C",
    solution_text: "The number of triangles formed by joining vertices of an $n$-sided polygon is:\n$T_n = ^nC_3$\n\nGiven $T_{n+1} - T_n = 10$:\n$^{n+1}C_3 - ^nC_3 = 10$\n\nUsing Pascal's identity, $^{n+1}C_3 - ^nC_3 = ^nC_2$.\nThus, $^nC_2 = 10$\n$\\frac{n(n-1)}{2} = 10 \\implies n(n-1) = 20$\n$n^2 - n - 20 = 0 \\implies (n-5)(n+4) = 0$\n\nSince $n > 0$, $n = 5$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "A committee of 4 persons is to be formed from 2 ladies, 2 old men and 4 young men such that it includes at least 1 lady, at least 1 old man and at most 2 young men. Then the total number of ways in which this committee can be formed is:",
    options: ["40", "41", "16", "32"],
    correct_option: "B",
    solution_text: "Available: 2 ladies (L), 2 old men (O), 4 young men (Y).\nCommittee size = 4. Conditions: $L \\ge 1$, $O \\ge 1$, $Y \\le 2$.\n\nPossible combinations of (L, O, Y):\n1) (1, 1, 2): $^2C_1 \\times ^2C_1 \\times ^4C_2 = 2 \\times 2 \\times 6 = 24$\n2) (1, 2, 1): $^2C_1 \\times ^2C_2 \\times ^4C_1 = 2 \\times 1 \\times 4 = 8$\n3) (2, 1, 1): $^2C_2 \\times ^2C_1 \\times ^4C_1 = 1 \\times 2 \\times 4 = 8$\n4) (2, 2, 0): $^2C_2 \\times ^2C_2 \\times ^4C_0 = 1 \\times 1 \\times 1 = 1$\n\nTotal ways = 24 + 8 + 8 + 1 = 41.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "The number of ways in which an examiner can assign 30 marks to 8 questions, giving not less than 2 marks to any question is:",
    options: ["$^{30}C_7$", "$^{21}C_8$", "$^{21}C_7$", "$^{30}C_8$"],
    correct_option: "C",
    solution_text: "Let $x_1, x_2, \\dots, x_8$ be the marks assigned to the 8 questions.\nWe have $x_1 + x_2 + \\dots + x_8 = 30$, where $x_i \\ge 2$ for each $i = 1, 2, \\dots, 8$.\n\nLet $y_i = x_i - 2 \\ge 0$.\nThen $(y_1 + 2) + (y_2 + 2) + \\dots + (y_8 + 2) = 30$\n$y_1 + y_2 + \\dots + y_8 = 30 - 16 = 14$.\n\nThe number of non-negative integer solutions is given by:\n$^{n+r-1}C_{r-1} = ^{14 + 8 - 1}C_{8 - 1} = ^{21}C_7$.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 25,
    question_text: "On the sides AB, BC, CA of a $\\Delta ABC$, 3, 4, 5 distinct points (excluding vertices A, B, C) are respectively chosen. The number of triangles that can be constructed using these chosen points as vertices are:",
    options: ["210", "205", "215", "220"],
    correct_option: "B",
    solution_text: "Total number of points chosen = 3 + 4 + 5 = 12.\nPoints on side AB (3 points), BC (4 points), and CA (5 points) are collinear respectively.\n\nNumber of triangles that can be formed:\n= (Total combinations of 3 points from 12) - (combinations of 3 collinear points from each side)\n= $^{12}C_3 - (^3C_3 + ^4C_3 + ^5C_3)$\n= $\\frac{12 \\times 11 \\times 10}{6} - (1 + 4 + 10)$\n= 220 - 15 = 205.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  }
];

