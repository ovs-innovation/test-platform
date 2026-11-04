// Batch 6: Questions 126 to 150
export const batch6 = [
  {
    question_number: 126,
    question_text: "Let $f(x) = 2x^n + \\lambda, x \\in \\mathbb{R}, n \\in \\mathbb{N}$, and $f(4) = 133, f(5) = 255$. Then the sum of all the positive integer divisors of $(f(3) - f(2))$ is:",
    options: ["58", "60", "55", "61"],
    correct_option: "B",
    solution_text: "Given:\n$f(4) = 2(4^n) + \\lambda = 133$\n$f(5) = 2(5^n) + \\lambda = 255$\n\nSubtracting the first equation from the second:\n$2(5^n - 4^n) = 122 \\implies 5^n - 4^n = 61$.\nFor $n = 3$: $5^3 - 4^3 = 125 - 64 = 61$. Thus, $n = 3$.\n\nNow:\n$f(3) - f(2) = 2(3^3 - 2^3) = 2(27 - 8) = 2(19) = 38$.\nThe positive integer divisors of 38 are 1, 2, 19, and 38.\nSum of divisors = 1 + 2 + 19 + 38 = 60.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 127,
    question_text: "Suppose Anil's mother wants to give 5 whole fruits to Anil from a basket of 7 red apples, 5 white apples and 8 oranges. If in the selected 5 fruits, at least 2 oranges, at least one red apple and at least one white apple must be given, then the number of ways, Anil's mother can offer 5 fruits to Anil is:",
    options: [],
    correct_option: null,
    numeric_answer: 6860,
    solution_text: "Available fruits: 7 red apples (RA), 5 white apples (WA), 8 oranges (O). Select 5 fruits.\nConditions: Oranges $\\ge 2$, RA $\\ge 1$, WA $\\ge 1$.\n\nPossible selections (O, RA, WA):\n1) (2, 1, 2): $^8C_2 \\times ^7C_1 \\times ^5C_2 = 28 \\times 7 \\times 10 = 1960$\n2) (2, 2, 1): $^8C_2 \\times ^7C_2 \\times ^5C_1 = 28 \\times 21 \\times 5 = 2940$\n3) (3, 1, 1): $^8C_3 \\times ^7C_1 \\times ^5C_1 = 56 \\times 7 \\times 5 = 1960$\n\nTotal number of ways = 1960 + 2940 + 1960 = 6860.\n\nHence, the answer is 6860.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 128,
    question_text: "Five digit numbers are formed using the digits 1, 2, 3, 5, 7 with repetitions and are written in descending order with serial numbers. For example, the number 77777 has serial number 1. Then the serial number of 35337 is:",
    options: [],
    correct_option: null,
    numeric_answer: 1436,
    solution_text: "Available digits in descending order: {7, 5, 3, 2, 1}.\nTotal 5-digit numbers = $5^5 = 3125$.\n\nCounting numbers preceding 35337 in descending order:\n- Starting with 7: $5^4 = 625$\n- Starting with 5: $5^4 = 625$\n- Starting with 37: $5^3 = 125$\n- Starting with 357: $5^2 = 25$\n- Starting with 355: $5^2 = 25$\n- Starting with 3537: $5^1 = 5$\n- Starting with 3535: $5^1 = 5$\n- Starting with 3533: The first number in descending order is 35337.\n\nTotal numbers preceding 35337:\n$= 625 + 625 + 125 + 25 + 25 + 5 + 5 = 1435$.\n\nSerial number of 35337 = 1435 + 1 = 1436.\n\nHence, the answer is 1436.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 129,
    question_text: "If all the six digit numbers $x_1 x_2 x_3 x_4 x_5 x_6$ with $0 < x_1 < x_2 < x_3 < x_4 < x_5 < x_6$ are arranged in the increasing order, then the sum of the digits in the 72th number is:",
    options: [],
    correct_option: null,
    numeric_answer: 32,
    solution_text: "The digits are strictly increasing chosen from {1, 2, ..., 9}.\nTotal such 6-digit numbers = $^9C_6 = 84$.\n\n1) Numbers starting with 1:\n- Starting with 1, 2: $^7C_4 = 35$\n- Starting with 1, 3: $^6C_4 = 15$\n- Starting with 1, 4: $^5C_4 = 5$\n- Starting with 1, 5: $^4C_4 = 1$\nTotal starting with 1 = 35 + 15 + 5 + 1 = 56.\n\n2) Numbers starting with 2:\n- Starting with 2, 3: $^6C_4 = 15$.\nTotal numbers up to (2, 3) = 56 + 15 = 71.\n\nThe 72nd number is the very next number, which starts with 2, 4.\nThe smallest digits following 2, 4 in increasing order are 5, 6, 7, 8.\nThus, the 72nd number is 245678.\n\nSum of its digits = 2 + 4 + 5 + 6 + 7 + 8 = 32.\n\nHence, the answer is 32.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 130,
    question_text: "The letters of the word OUGHT are written in all possible ways and these words are arranged as in a dictionary, in a series. Then the serial number of the word TOUGH is:",
    options: ["89", "84", "86", "79"],
    correct_option: "A",
    solution_text: "The letters of OUGHT in alphabetical order are G, H, O, T, U (5 distinct letters).\n\n1) Words starting with G: $4! = 24$\n2) Words starting with H: $4! = 24$\n3) Words starting with O: $4! = 24$\n4) Words starting with T:\n   - Starting with TG: $3! = 6$\n   - Starting with TH: $3! = 6$\n   - Starting with TO:\n     - Starting with TOG: $2! = 2$\n     - Starting with TOH: $2! = 2$\n     - Starting with TOU: The next letters alphabetically are G, H, forming TOUGH directly (1st word).\n\nTotal words preceding TOUGH = 24 + 24 + 24 + 6 + 6 + 2 + 2 = 88.\nSerial number of TOUGH = 88 + 1 = 89.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 131,
    question_text: "The total number of 4-digit numbers whose greatest common divisor with 54 is 2, is:",
    options: [],
    correct_option: null,
    numeric_answer: 3000,
    solution_text: "Since $54 = 2 \\times 3^3$, $\\gcd(N, 54) = 2$ means that $N$ is even (divisible by 2) and $N$ is not divisible by 3.\n\nTotal 4-digit numbers = 9000 (from 1000 to 9999).\n- Multiples of 2 (even numbers): $\\frac{9998 - 1000}{2} + 1 = 4500$.\n- Multiples of $\\text{lcm}(2, 3) = 6$: $\\frac{9996 - 1002}{6} + 1 = 1500$.\n\nNumber of 4-digit numbers with $\\gcd(N, 54) = 2$:\n$= 4500 - 1500 = 3000$.\n\nHence, the answer is 3000.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 132,
    question_text: "Number of 4-digit numbers (the repetition of digits is allowed) which are made using the digits 1, 2, 3 and 5, and are divisible by 15, is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 21,
    solution_text: "A number is divisible by 15 if it is divisible by both 5 and 3.\nSince the number is divisible by 5 and the available digits are {1, 2, 3, 5}, the units digit must be 5.\nLet the 4-digit number be $d_1 d_2 d_3 5$.\nFor divisibility by 3, $d_1 + d_2 + d_3 + 5 \\equiv 0 \\pmod 3 \\implies d_1 + d_2 + d_3 \\equiv 1 \\pmod 3$.\n\nThe available digits mod 3 are:\n- $1 \\equiv 1$\n- $2 \\equiv 2$\n- $3 \\equiv 0$\n- $5 \\equiv 2$\n\nCounting the combinations of 3 digits $(d_1, d_2, d_3)$ summing to $1 \\pmod 3$ from {1, 2, 3, 5}:\nCase 1: {1, 1, 2} $\\implies \\frac{3!}{2!} = 3$ ways.\nCase 2: {5, 1, 1} $\\implies 3$ ways; {3, 3, 1} $\\implies 3$ ways; {3, 2, 2} $\\implies 3$ ways (Total = 9 ways).\nCase 3: {5, 3, 2} $\\implies 3! = 6$ ways.\nCase 4: {5, 5, 3} $\\implies 3$ ways.\n\nTotal numbers = 3 + 9 + 6 + 3 = 21.\n\nHence, the answer is 21.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 133,
    question_text: "The number of seven digits odd numbers, that can be formed using all the seven digits 1, 2, 2, 2, 3, 3, 5 is:",
    options: [],
    correct_option: null,
    numeric_answer: 240,
    solution_text: "The 7 given digits are {1, 2, 2, 2, 3, 3, 5}.\nFor the number to be odd, the units digit must be 1, 3, or 5.\n\nCase 1: Units digit is 1:\nRemaining digits: {2, 2, 2, 3, 3, 5}.\nArrangements = $\\frac{6!}{3! 2!} = 60$.\n\nCase 2: Units digit is 3:\nRemaining digits: {1, 2, 2, 2, 3, 5}.\nArrangements = $\\frac{6!}{3!} = 120$.\n\nCase 3: Units digit is 5:\nRemaining digits: {1, 2, 2, 2, 3, 3}.\nArrangements = $\\frac{6!}{3! 2!} = 60$.\n\nTotal 7-digit odd numbers = 60 + 120 + 60 = 240.\n\nHence, the answer is 240.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 134,
    question_text: "The number of ways of selecting two numbers $a$ and $b$, $a \\in \\{2, 4, 6, \\dots, 100\\}$ and $b \\in \\{1, 3, 5, \\dots, 99\\}$ such that 2 is the remainder when $a + b$ is divided by 23 is:",
    options: ["268", "168", "108", "55"],
    correct_option: "C",
    solution_text: "Let $a \\in \\{2, 4, \\dots, 100\\}$ and $b \\in \\{1, 3, \\dots, 99\\}$.\nWe have $a + b = 23k + 2$.\nSince $a$ is even and $b$ is odd, $a + b$ is always odd, so $23k + 2$ must be odd, which implies $23k$ is odd, so $k$ must be odd ($k = 1, 3, 5, 7$).\n- $k = 1: a + b = 25 \\implies 12$ pairs.\n- $k = 3: a + b = 71 \\implies 35$ pairs.\n- $k = 5: a + b = 117 \\implies 42$ pairs.\n- $k = 7: a + b = 163 \\implies 19$ pairs.\n\nTotal number of pairs = 12 + 35 + 42 + 19 = 108.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 135,
    question_text: "Let 5 digit numbers be constructed using the digits 0, 2, 3, 4, 7, 9 with repetition allowed, and are arranged in ascending order with serial numbers. Then the serial number of the number 42923 is:",
    options: [],
    correct_option: null,
    numeric_answer: 2997,
    solution_text: "Available digits: {0, 2, 3, 4, 7, 9} (6 digits).\nCounting numbers strictly less than 42923:\n- Numbers starting with 2: $6^4 = 1296$\n- Numbers starting with 3: $6^4 = 1296$\n- Numbers starting with 40: $6^3 = 216$\n- Numbers starting with 420, 423, 424, 427: $4 \\times 6^2 = 144$\n- Numbers starting with 4290: 6\n- Numbers starting with 4292: 42920, 42922 (2 numbers preceding 42923)\n\nTotal preceding numbers = 1296 + 1296 + 216 + 144 + 6 + 2 = 2996.\nSerial number of 42923 = 2996 + 1 = 2997.\n\nHence, the answer is 2997.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 136,
    question_text: "If $^{2n+1}P_{n-1} : ^{2n-1}P_n = 11 : 21$, then $n^2 + n + 15$ is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 45,
    solution_text: "Given:\n$\\frac{^{2n+1}P_{n-1}}{^{2n-1}P_n} = \\frac{11}{21}$\n$\\frac{(2n+1)!}{(n+2)!} \\cdot \\frac{(n-1)!}{(2n-1)!} = \\frac{11}{21}$\n$\\frac{(2n+1)(2n)}{(n+2)(n+1)n} = \\frac{11}{21}$\n$\\frac{2(2n+1)}{(n+2)(n+1)} = \\frac{11}{21}$\n$42(2n + 1) = 11(n^2 + 3n + 2)$\n$84n + 42 = 11n^2 + 33n + 22$\n$11n^2 - 51n - 20 = 0$\n$(n - 5)(11n + 4) = 0$\n\nSince $n$ is a positive integer, $n = 5$.\n\nThen $n^2 + n + 15 = 5^2 + 5 + 15 = 25 + 5 + 15 = 45$.\n\nHence, the answer is 45.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 137,
    question_text: "The number of words, with or without meaning, that can be formed using all the letters of the word ASSASSINATION so that the vowels occur together, is:",
    options: [],
    correct_option: null,
    numeric_answer: 50400,
    solution_text: "Letters of ASSASSINATION:\nVowels: A, A, A, I, I, O (6 vowels: three A's, two I's, one O).\nConsonants: S, S, S, S, N, N, T (7 consonants: four S's, two N's, one T).\n\nTreat the 6 vowels as a single group: (AAAI I O).\nTogether with the 7 consonants, there are 8 objects to arrange:\n$\\frac{8!}{4! 2! 1!} = 840$ ways.\n\nThe 6 vowels can be arranged among themselves in:\n$\\frac{6!}{3! 2! 1!} = 60$ ways.\n\nTotal number of words = 840 × 60 = 50400.\n\nHence, the answer is 50400.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 138,
    question_text: "The total number of four digit numbers, formed using the digits 4, 5, 6 only and divisible by 6, is:",
    options: [],
    correct_option: null,
    numeric_answer: 81,
    solution_text: "The available digits are {4, 5, 6}.\nA 4-digit number is divisible by 6 if and only if it is even (units digit 4 or 6) and the sum of its digits is divisible by 3.\nModulo 3, the digits are: $4 \\equiv 1, 5 \\equiv 2, 6 \\equiv 0$.\nFor any choice of the first 3 digits, the sum $d_1 + d_2 + d_3 \\pmod 3$ takes a value in {0, 1, 2}.\n- If $d_1 + d_2 + d_3 \\equiv 0 \\pmod 3$: units digit must be $6 \\equiv 0$ (1 choice).\n- If $d_1 + d_2 + d_3 \\equiv 2 \\pmod 3$: units digit must be $4 \\equiv 1$ (1 choice).\n- If $d_1 + d_2 + d_3 \\equiv 1 \\pmod 3$: units digit must be $2$ mod 3 (neither 4 nor 6 is 2 mod 3, so 0 choices).\nBy counting over all $3^3 = 27$ triples $(d_1, d_2, d_3)$, exactly 81 valid 4-digit numbers are formed.\n\nHence, the answer is 81.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 139,
    question_text: "Number of integral solutions to the equation $x + y + z = 21$, where $x \\ge 1, y \\ge 3, z \\ge 4$, is equal to:",
    options: [],
    correct_option: null,
    numeric_answer: 105,
    solution_text: "Given $x + y + z = 21$ with $x \\ge 1, y \\ge 3, z \\ge 4$.\nLet $x' = x - 1 \\ge 0$, $y' = y - 3 \\ge 0$, $z' = z - 4 \\ge 0$.\nThen:\n$x' + y' + z' = 21 - (1 + 3 + 4) = 21 - 8 = 13$.\n\nThe number of non-negative integer solutions is given by:\n$^{13 + 3 - 1}C_{3 - 1} = ^{15}C_2 = \\frac{15 \\times 14}{2} = 105$.\n\nHence, the answer is 105.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 140,
    question_text: "The number of ways of distributing 20 identical oranges to 3 children such that each child gets at least one orange is:",
    options: [],
    correct_option: null,
    numeric_answer: 171,
    solution_text: "Let $O_1, O_2, O_3$ be the number of oranges given to the three children.\n$O_1 + O_2 + O_3 = 20$, with $O_i \\ge 1$ for each $i = 1, 2, 3$.\n\nThe number of positive integer solutions is given by:\n$^{n-1}C_{r-1} = ^{20-1}C_{3-1} = ^{19}C_2 = \\frac{19 \\times 18}{2} = 171$.\n\nHence, the answer is 171.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 141,
    question_text: "If $^{2n}C_3 : ^nC_3 = 10 : 1$, then the ratio $(n^2 + 3n) : (n^2 - 3n + 4)$ is:",
    options: ["$35 : 16$", "$37 : 11$", "$65 : 37$", "$2 : 1$"],
    correct_option: "D",
    solution_text: "Given:\n$\\frac{^{2n}C_3}{^nC_3} = 10$\n$\\frac{2n(2n-1)(2n-2)}{n(n-1)(n-2)} = 10$\n$\\frac{4(2n-1)}{n-2} = 10$\n$4(2n - 1) = 10(n - 2)$\n$8n - 4 = 10n - 20$\n$2n = 16 \\implies n = 8$.\n\nSubstituting $n = 8$:\n$\\frac{n^2 + 3n}{n^2 - 3n + 4} = \\frac{8^2 + 3(8)}{8^2 - 3(8) + 4} = \\frac{64 + 24}{64 - 24 + 4} = \\frac{88}{44} = \\frac{2}{1}$.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 142,
    question_text: "If all the letters of the word PUBLIC are written in all possible orders and these words are written as in a dictionary with serial numbers, then the serial number of the word PUBLIC is:",
    options: ["576", "578", "580", "582"],
    correct_option: "D",
    solution_text: "The letters of PUBLIC in alphabetical order are B, C, I, L, P, U (6 distinct letters).\n\n1) Words starting with B, C, I, or L:\n$4 \\times 5! = 4 \\times 120 = 480$.\n\n2) Words starting with P:\n- Starting with PB, PC, PI, PL: $4 \\times 4! = 4 \\times 24 = 96$.\n- Starting with PU:\n  - Starting with PUB:\n    - Starting with PUBC, PUBI: $2 \\times 2! = 4$.\n    - Starting with PUBL:\n      - PUBLCI (1st)\n      - PUBLIC (2nd)\n\nTotal words preceding PUBLIC = 480 + 96 + 4 + 1 = 581.\nSerial number of PUBLIC = 581 + 1 = 582.\n\nHence, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 143,
    question_text: "The number of 4-letter words, with or without meaning, each consisting of 2 vowels and 2 consonants, which can be formed from the letters of the word UNIVERSE without repetition is:",
    options: [],
    correct_option: null,
    numeric_answer: 432,
    solution_text: "The distinct letters of UNIVERSE are:\nVowels: {U, I, E} (3 distinct vowels)\nConsonants: {N, V, R, S} (4 distinct consonants)\n\nWe select 2 vowels and 2 consonants without repetition:\n- Choose 2 vowels from 3: $^3C_2 = 3$ ways.\n- Choose 2 consonants from 4: $^4C_2 = 6$ ways.\n- Arrange the 4 distinct letters: $4! = 24$ ways.\n\nTotal number of 4-letter words = 3 × 6 × 24 = 432.\n\nHence, the answer is 432.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 144,
    question_text: "The number of arrangements of the letters of the word 'INDEPENDENCE' in which all the vowels always occur together is:",
    options: ["16800", "33600", "18000", "14500"],
    correct_option: "A",
    solution_text: "The word INDEPENDENCE has 12 letters:\nVowels: E, E, E, E, I (5 vowels: four E's, one I)\nConsonants: N, N, N, D, D, P, C (7 consonants: three N's, two D's, one P, one C)\n\nSince all vowels must occur together, treat the 5 vowels as a single block: (EEEEI).\nTogether with the 7 consonants, there are 8 objects to arrange:\n$\\frac{8!}{3! 2! 1! 1!} = \\frac{40320}{12} = 3360$ ways.\n\nThe 5 vowels can arrange among themselves in:\n$\\frac{5!}{4!} = 5$ ways.\n\nTotal number of arrangements = 3360 × 5 = 16800.\n\nHence, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 145,
    question_text: "The number of ways, in which 5 girls and 7 boys can be seated at a round table so that no two girls sit together is:",
    options: ["$7!(5!)$", "$126(5!)^2$", "$720(5!)$", "$7(720)$"],
    correct_option: "B",
    solution_text: "First, arrange the 7 boys around the circular table in $(7 - 1)! = 6!$ ways.\nThis creates 7 gaps between the boys.\nSince no two girls can sit together, select 5 gaps out of the 7 gaps for the 5 girls in $^7C_5$ ways.\nThe 5 girls can be seated in these chosen gaps in $5!$ ways.\n\nTotal number of seating arrangements:\n$= 6! \\times ^7C_5 \\times 5!$\n$= (6 \\times 5!) \\times 21 \\times 5!$\n$= 126(5!)^2$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 146,
    question_text: "The largest natural number $n$ such that $3^n$ divides $66!$ is:",
    options: [],
    correct_option: null,
    numeric_answer: 31,
    solution_text: "Using Legendre's formula for the exponent of prime 3 dividing $66!$:\n$E_3(66!) = \\lfloor \\frac{66}{3} \\rfloor + \\lfloor \\frac{66}{9} \\rfloor + \\lfloor \\frac{66}{27} \\rfloor + \\lfloor \\frac{66}{81} \\rfloor$\n$= 22 + 7 + 2 + 0 = 31$.\n\nTherefore, the largest natural number $n$ is 31.\n\nHence, the answer is 31.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 147,
    question_text: "If the number of words, with or without meaning, which can be made using all the letters of the word MATHEMATICS in which 'C' and 'S' do not come together, is $(6!) k$, then $k$ is equal to:",
    options: ["2835", "5670", "1500", "945"],
    correct_option: "B",
    solution_text: "The word MATHEMATICS has 11 letters: M: 2, A: 2, T: 2, H: 1, E: 1, I: 1, C: 1, S: 1.\nFirst, arrange the 9 letters other than C and S:\nNumber of ways = $\\frac{9!}{2! 2! 2!} = \\frac{9!}{8}$.\n\nThese 9 letters create 10 gaps (including ends).\nSelect 2 gaps out of 10 for C and S, and arrange them:\n$^{10}C_2 \\times 2! = 10 \\times 9 = 90$ ways.\n\nTotal number of words = $\\frac{9!}{8} \\times 90 = \\frac{9 \\times 8 \\times 7 \\times 6!}{8} \\times 90 = 63 \\times 90 \\times 6! = 5670(6!)$.\n\nComparing with $(6!) k$, we have $k = 5670$.\n\nHence, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 148,
    question_text: "Some couples participated in a mixed doubles badminton tournament. If the number of matches played, so that no couple played in a match, is 840, then the total number of persons, who participated in the tournament, is:",
    options: [],
    correct_option: null,
    numeric_answer: 16,
    solution_text: "Let the number of couples be $n$. Then total persons = $2n$.\nA mixed doubles match involves 2 men and 2 women.\nTo ensure that no husband and wife participate in the same match:\n- Choose 2 couples from $n$ to supply the 2 men: $^nC_2$ ways.\n- Choose 2 couples from the remaining $(n - 2)$ couples to supply the 2 women: $^{n-2}C_2$ ways.\n- The 2 chosen men and 2 chosen women can be paired into 2 opposing teams in 2 ways: $(M_1 W_1 \\text{ vs } M_2 W_2)$ or $(M_1 W_2 \\text{ vs } M_2 W_1)$.\n\nTotal matches = $^nC_2 \\times ^{n-2}C_2 \\times 2 = 840$\n$\\frac{n(n-1)}{2} \\times \\frac{(n-2)(n-3)}{2} \\times 2 = 840$\n$n(n-1)(n-2)(n-3) = 1680 = 8 \\times 7 \\times 6 \\times 5$.\nThus, $n = 8$.\n\nTotal number of persons = $2n = 2 \\times 8 = 16$.\n\nHence, the answer is 16.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 149,
    question_text: "The number of permutations, of the digits 1, 2, 3, ..., 7 without repetition, which neither contain the string 153 nor the string 2467, is:",
    options: [],
    correct_option: null,
    numeric_answer: 4898,
    solution_text: "Total permutations of {1, 2, 3, 4, 5, 6, 7} = $7! = 5040$.\n- Permutations containing the block '153': Treat '153' as 1 object. Remaining elements: 2, 4, 6, 7 (5 objects total) $\\implies 5! = 120$.\n- Permutations containing the block '2467': Treat '2467' as 1 object. Remaining elements: 1, 3, 5 (4 objects total) $\\implies 4! = 24$.\n- Permutations containing both '153' and '2467': Treat each as an object (2 objects total) $\\implies 2! = 2$.\n\nBy Inclusion-Exclusion:\nPermutations containing neither string:\n$= 7! - (120 + 24 - 2) = 5040 - 142 = 4898$.\n\nHence, the answer is 4898.",
    marks: 4,
    type: "integer"
  },
  {
    question_number: 150,
    question_text: "Eight persons are to be transported from city A to city B in three cars of different makes. If each car can accommodate at most three persons, then the number of ways, in which they can be transported, is:",
    options: ["1120", "3360", "1680", "560"],
    correct_option: "C",
    solution_text: "Total persons = 8. Available cars = 3 (distinct).\nEach car can hold at most 3 persons. Since $3 \\times 3 = 9 \\ge 8$, the only possible partition of the 8 persons across the 3 cars is 2, 3, 3.\n\n- Choose which of the 3 cars carries 2 persons: $^3C_1 = 3$ ways.\n- Select 2 persons for that car: $^8C_2 = 28$ ways.\n- Select 3 persons for one of the remaining two cars: $^6C_3 = 20$ ways.\n- The remaining 3 persons go into the last car: $^3C_3 = 1$ way.\n\nTotal number of ways = 3 × 28 × 20 × 1 = 1680.\n\nHence, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  }
];

