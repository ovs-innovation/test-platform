// Batch 9: Questions 201 to 220
export const batch9 = [
  {
    question_number: 201,
    question_text: "Let $S = \\{(m, n) : m, n \\in \\{1, 2, 3, \\dots, 50\\}\\}$. If the number of elements $(m, n)$ in $S$ such that $6^m + 9^n$ is a multiple of 5 is $p$ and the number of elements $(m, n)$ in $S$ such that $m + n$ is a square of a prime number is $q$, then $p + q$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 1333,
    solution_text: `For $6^m + 9^n$ to be a multiple of 5:
$6^m \\equiv 1^m \\equiv 1 \\pmod 5$
$9^n \\equiv (-1)^n \\pmod 5$
So $6^m + 9^n \\equiv 1 + (-1)^n \\pmod 5$.
This equals $0 \\pmod 5$ if and only if $(-1)^n = -1$, which means $n$ must be an odd integer.
In the set $\\{1, 2, \\dots, 50\\}$, there are 25 odd numbers for $n$.
For each odd $n$, $m$ can be any of the 50 values in $\\{1, 2, \\dots, 50\\}$.
Thus, $p = 50 \\times 25 = 1250$.

For $m + n$ to be a square of a prime number:
Since $1 \\le m, n \\le 50$, we have $2 \\le m + n \\le 100$.
The squares of prime numbers in this range are:
$2^2 = 4$, $3^2 = 9$, $5^2 = 25$, $7^2 = 49$ (note $11^2 = 121 > 100$).
Number of pairs $(m, n)$ such that $1 \\le m, n \\le 50$:
- $m + n = 4 \\implies m \\in \\{1, 2, 3\\} \\implies 3$ pairs.
- $m + n = 9 \\implies m \\in \\{1, 2, \\dots, 8\\} \\implies 8$ pairs.
- $m + n = 25 \\implies m \\in \\{1, 2, \\dots, 24\\} \\implies 24$ pairs.
- $m + n = 49 \\implies m \\in \\{1, 2, \\dots, 48\\} \\implies 48$ pairs.
Total $q = 3 + 8 + 24 + 48 = 83$.

Therefore, $p + q = 1250 + 83 = 1333$.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 202,
    question_text: "The largest $n \\in \\mathbb{N}$, for which $7^n$ divides $101!$, is:",
    options: ["16", "15", "14", "13"],
    correct_option: "A",
    solution_text: `The exponent of 7 in $101!$ is given by Legendre's formula:
$E_7(101!) = \\left\\lfloor \\frac{101}{7} \\right\\rfloor + \\left\\lfloor \\frac{101}{7^2} \\right\\rfloor + \\left\\lfloor \\frac{101}{7^3} \\right\\rfloor + \\dots$
$E_7(101!) = 14 + 2 + 0 = 16$.

Thus, the largest $n \\in \\mathbb{N}$ for which $7^n$ divides $101!$ is 16.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 203,
    question_text: "Let $ABC$ be a triangle. Consider four points $p_1, p_2, p_3, p_4$ on the side $AB$, five points $p_5, p_6, p_7, p_8, p_9$ on the side $BC$, and four points $p_{10}, p_{11}, p_{12}, p_{13}$ on the side $AC$. None of these points is a vertex of the triangle $ABC$. Then the total number of pentagons, that can be formed by taking all the vertices from the points $p_1, p_2, \\dots, p_{13}$, is _______",
    options: [],
    correct_option: null,
    numeric_answer: 660,
    solution_text: `Points on side $AB$: 4
Points on side $BC$: 5
Points on side $AC$: 4
Total points = 13.

For a valid pentagon with 5 vertices, no 3 vertices can be collinear. Therefore, at most 2 points can be chosen from any single side of the triangle.
Let $(a, b, c)$ represent the number of points chosen from $AB, BC, AC$ respectively, such that $a + b + c = 5$ with $0 \\le a, b, c \\le 2$.
The only valid distributions are permutations of $(1, 2, 2)$:
Case 1: $(1, 2, 2) \\implies \\binom{4}{1} \\times \\binom{5}{2} \\times \\binom{4}{2} = 4 \\times 10 \\times 6 = 240$.
Case 2: $(2, 1, 2) \\implies \\binom{4}{2} \\times \\binom{5}{1} \\times \\binom{4}{2} = 6 \\times 5 \\times 6 = 180$.
Case 3: $(2, 2, 1) \\implies \\binom{4}{2} \\times \\binom{5}{2} \\times \\binom{4}{1} = 6 \\times 10 \\times 4 = 240$.

Total number of pentagons = $240 + 180 + 240 = 660$.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 204,
    question_text: "The number of 4-letter words, with or without meaning, which can be formed using the letters of $PQRPQRSTUVP$, is _______",
    options: [],
    correct_option: null,
    numeric_answer: 1422,
    solution_text: `The letters in $PQRPQRSTUVP$ are:
$P$: 3
$Q$: 2
$R$: 2
$S$: 1
$T$: 1
$U$: 1
$V$: 1
There are 7 distinct letters: $\\{P, Q, R, S, T, U, V\\}$.

We form 4-letter words considering different cases:
Case 1: All 4 letters are distinct:
Choose 4 distinct letters from 7: $\\binom{7}{4} = 35$.
Arrangements = $35 \\times 4! = 35 \\times 24 = 840$.

Case 2: 2 letters alike of one kind and 2 different:
The repeating letter can be chosen from $\\{P, Q, R\\}$ (3 ways).
The 2 different letters can be chosen from the remaining 6 distinct letters: $\\binom{6}{2} = 15$ ways.
Arrangements = $3 \\times 15 \\times \\frac{4!}{2!} = 45 \\times 12 = 540$.

Case 3: 2 letters alike of one kind and 2 letters alike of another kind (two pairs):
Choose 2 repeating letters from $\\{P, Q, R\\}$: $\\binom{3}{2} = 3$ ways.
Arrangements = $3 \\times \\frac{4!}{2! 2!} = 3 \\times 6 = 18$.

Case 4: 3 letters alike and 1 different:
Only $P$ can repeat 3 times (1 way).
The remaining 1 letter can be chosen from the remaining 6 distinct letters: $\\binom{6}{1} = 6$ ways.
Arrangements = $1 \\times 6 \\times \\frac{4!}{3!} = 6 \\times 4 = 24$.

Total number of 4-letter words = $840 + 540 + 18 + 24 = 1422$.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 205,
    question_text: "Let $S$ denote the set of 4-digit numbers $abcd$ such that $a > b > c > d$ and $P$ denote the set of 5-digit numbers having product of its digits equal to 20. Then $n(S) + n(P)$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 260,
    solution_text: `For set $S$:
A 4-digit number is $abcd$ such that $a > b > c > d$.
Since $9 \\ge a > b > c > d \\ge 0$, any selection of 4 distinct digits from the 10 digits $\\{0, 1, 2, \\dots, 9\\}$ can be arranged in strictly decreasing order in exactly 1 way. Since $a > b > c > d \\ge 0$, the first digit $a$ is at least 3, so it can never be 0.
$n(S) = \\binom{10}{4} = \\frac{10 \\times 9 \\times 8 \\times 7}{24} = 210$.

For set $P$:
5-digit numbers whose product of digits is $20 = 2^2 \\times 5$.
None of the digits can be 0. Exactly one digit must be 5.
The remaining 4 digits must have a product of 4:
Case 1: Digits are $\\{5, 4, 1, 1, 1\\}$
Number of arrangements = $\\frac{5!}{3!} = \\frac{120}{6} = 20$.
Case 2: Digits are $\\{5, 2, 2, 1, 1\\}$
Number of arrangements = $\\frac{5!}{2! 2!} = \\frac{120}{4} = 30$.
Total $n(P) = 20 + 30 = 50$.

Hence, $n(S) + n(P) = 210 + 50 = 260$.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 206,
    question_text: "The number of ways, in which 16 oranges can be distributed to four children such that each child gets at least one orange, is:",
    options: ["455", "420", "403", "384"],
    correct_option: "A",
    solution_text: `Distributing 16 identical oranges to 4 children such that each gets at least 1:
Let $x_1 + x_2 + x_3 + x_4 = 16$ with $x_i \\ge 1$ for $i = 1, 2, 3, 4$.
Let $y_i = x_i - 1 \\ge 0$.
Then $y_1 + y_2 + y_3 + y_4 = 16 - 4 = 12$.

By the stars and bars theorem, the number of non-negative integer solutions is:
$\\binom{12 + 4 - 1}{4 - 1} = \\binom{15}{3} = \\frac{15 \\times 14 \\times 13}{6} = 5 \\times 7 \\times 13 = 455$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 207,
    question_text: "The number of numbers greater than 5000, less than 9000 and divisible by 3, that can be formed using the digits 0, 1, 2, 5, 9, if the repetition of the digits is allowed, is _______",
    options: [],
    correct_option: null,
    numeric_answer: 42,
    solution_text: `A number between 5000 and 9000 must be a 4-digit number.
Since the available digits are $\\{0, 1, 2, 5, 9\\}$, the first digit must be 5 (since it is greater than 5000 and less than 9000).
Let the number be $5abc$.
For the number to be divisible by 3, the sum of its digits must be a multiple of 3:
$5 + a + b + c \\equiv 0 \\pmod 3 \\implies a + b + c \\equiv 1 \\pmod 3$.
Also, $5abc > 5000$, so $(a, b, c) \\neq (0, 0, 0)$ (which gives sum $5 \\equiv 2 \\pmod 3$ anyway, not div by 3).

The multiset of 4 digits $\\{5, a, b, c\\}$ formed with sum divisible by 3:
(1) All 4 digits different:
$\\{5, 0, 1, 9\\}$: $a, b, c$ can be arranged in $3! = 6$ ways.
(2) 2 alike, 2 different:
$\\{5, 0, 0, 1\\} \\implies 3$ ways
$\\{5, 1, 1, 2\\} \\implies 3$ ways
$\\{5, 2, 2, 0\\} \\implies 3$ ways
$\\{5, 2, 2, 9\\} \\implies 3$ ways
$\\{5, 5, 0, 2\\} \\implies \\frac{3!}{1!} = 6$ ways (arranging $a, b, c$ from $\\{5, 0, 2\\}$)
$\\{5, 5, 2, 9\\} \\implies 6$ ways
$\\{5, 1, 9, 9\\} \\implies 3$ ways
(3) 3 alike, 1 different:
$\\{5, 5, 5, 0\\} \\implies 3$ ways
$\\{5, 5, 5, 9\\} \\implies 3$ ways
(4) 2 alike, 2 other alike:
$\\{5, 5, 1, 1\\} \\implies 3$ ways

Total number of numbers = $6 + (3 + 3 + 3 + 3 + 6 + 6 + 3) + (3 + 3) + 3 = 6 + 27 + 6 + 3 = 42$.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 208,
    question_text: "The letters of the word \"UDAYPUR\" are written in all possible ways with or without meaning and these words are arranged as in a dictionary. The rank of the word \"UDAYPUR\" is:",
    options: ["1579", "1581", "1578", "1580"],
    correct_option: "D",
    solution_text: `Letters of UDAYPUR in alphabetical order:
A, D, P, R, U, U, Y (7 letters, U repeated twice).

Words starting with a letter before U:
Starting with A: $\\frac{6!}{2!} = 360$
Starting with D: $\\frac{6!}{2!} = 360$
Starting with P: $\\frac{6!}{2!} = 360$
Starting with R: $\\frac{6!}{2!} = 360$
Total words before U = $4 \\times 360 = 1440$.

Fix U at 1st position: Remaining letters are A, D, P, R, U, Y (all 6 distinct).
Words starting with UA: $5! = 120$.

Fix UD at positions 1-2: Remaining letters are A, P, R, U, Y.
Letters before A: None $\\implies$ Fix UDA.

Fix UDA at positions 1-3: Remaining letters are P, R, U, Y.
Letters before Y: P, R, U (3 letters).
Words starting with UDAP, UDAR, UDAU: $3 \\times 3! = 3 \\times 6 = 18$.

Fix UDAY at positions 1-4: Remaining letters are P, R, U.
Letters before P: None $\\implies$ Fix UDAYP.

Fix UDAYP at positions 1-5: Remaining letters are R, U.
Letters before U: R (1 letter).
Words starting with UDAYPR: $1! = 1$.

Fix UDAYPU at positions 1-6: Remaining letter is R.
Next word is UDAYPUR itself: 1.

Rank of UDAYPUR = $1440 + 120 + 18 + 1 + 1 = 1580$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 209,
    question_text: "The largest value of $n$, for which $40^n$ divides $60!$, is:",
    options: ["11", "12", "14", "13"],
    correct_option: "C",
    solution_text: `$40 = 2^3 \\times 5$, so $40^n = 2^{3n} \\times 5^n$.
We find the highest powers of 2 and 5 dividing $60!$:

Exponent of 5 in $60!$:
$E_5(60!) = \\left\\lfloor \\frac{60}{5} \\right\\rfloor + \\left\\lfloor \\frac{60}{25} \\right\\rfloor = 12 + 2 = 14$.

Exponent of 2 in $60!$:
$E_2(60!) = \\left\\lfloor \\frac{60}{2} \\right\\rfloor + \\left\\lfloor \\frac{60}{4} \\right\\rfloor + \\left\\lfloor \\frac{60}{8} \\right\\rfloor + \\left\\lfloor \\frac{60}{16} \\right\\rfloor + \\left\\lfloor \\frac{60}{32} \\right\\rfloor = 30 + 15 + 7 + 3 + 1 = 56$.

We require:
$n \\le 14$ and $3n \\le 56 \\implies n \\le 18$.
The limiting condition is $n \\le 14$.
Thus, the largest value of $n$ is 14.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 210,
    question_text: "Let $S = \\{1, 2, 3, 4, 5, 6, 7, 8, 9\\}$. Let $x$ be the number of 9-digit numbers formed using the digits of the set $S$ such that only one digit is repeated and it is repeated exactly twice. Let $y$ be the number of 9-digit numbers formed using the digits of the set $S$ such that only two digits are repeated and each of these is repeated exactly twice. Then:",
    options: ["$56x = 9y$", "$29x = 5y$", "$45x = 7y$", "$21x = 4y$"],
    correct_option: "D",
    solution_text: `For $x$:
A 9-digit number with exactly one digit repeated twice uses 8 distinct digits from $S$:
- Choose the digit that appears twice: $\\binom{9}{1} = 9$ ways.
- Choose 7 other distinct digits from the remaining 8 digits: $\\binom{8}{7} = 8$ ways (1 digit from $S$ is absent).
- Arrange these 9 digits: $\\frac{9!}{2!}$ ways.
$x = 9 \\times 8 \\times \\frac{9!}{2!} = 36 \\times 9!$.

For $y$:
A 9-digit number with exactly two digits repeated twice uses 7 distinct digits from $S$:
- Choose 2 digits that appear twice: $\\binom{9}{2} = 36$ ways.
- Choose 5 other distinct digits from the remaining 7 digits: $\\binom{7}{5} = 21$ ways (2 digits from $S$ are absent).
- Arrange these 9 digits: $\\frac{9!}{2! 2!} = \\frac{9!}{4}$ ways.
$y = 36 \\times 21 \\times \\frac{9!}{4} = 189 \\times 9!$.

Ratio:
$\\frac{x}{y} = \\frac{36 \\times 9!}{189 \\times 9!} = \\frac{36}{189} = \\frac{4}{21}$.
Therefore, $21x = 4y$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 211,
    question_text: "Three persons enter in a lift at the ground floor. The lift will go upto $10^{\\text{th}}$ floor. The number of ways, in which the three persons can exit the lift at three different floors, if the lift does not stop at first, second and third floors, is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 210,
    solution_text: `The lift goes up to the $10^{\\text{th}}$ floor and does not stop at floors 1, 2, and 3.
The available floors for exit are: $\\{4, 5, 6, 7, 8, 9, 10\\}$, which gives 7 available floors.
The 3 persons exit at 3 different floors.
The number of ways to assign 3 distinct floors to 3 persons is the number of permutations:
$^7P_3 = 7 \\times 6 \\times 5 = 210$.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 212,
    question_text: "The number of seven-digit numbers, that can be formed by using the digits 1, 2, 3, 5 and 7 such that each digit is used at least once, is:",
    options: ["15400", "17800", "16800", "29400"],
    correct_option: "C",
    solution_text: `A 7-digit number is formed using the 5 digits $\\{1, 2, 3, 5, 7\\}$ with each digit appearing at least once.
The frequencies of the 5 digits in the 7-digit number can be distributed in two cases:

Case 1: One digit appears 3 times and each of the other four digits appears once.
Number of ways to choose the digit that appears 3 times: $\\binom{5}{1} = 5$.
Number of arrangements = $\\frac{7!}{3!} = \\frac{5040}{6} = 840$.
Numbers in this case = $5 \\times 840 = 4200$.

Case 2: Two digits appear 2 times each and each of the other three digits appears once.
Number of ways to choose the 2 digits that appear 2 times: $\\binom{5}{2} = 10$.
Number of arrangements = $\\frac{7!}{2! 2!} = \\frac{5040}{4} = 1260$.
Numbers in this case = $10 \\times 1260 = 12600$.

Total number of seven-digit numbers = $4200 + 12600 = 16800$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 213,
    question_text: "Let $p_n$ denote the total number of triangles formed by joining the vertices of an $n$-sided regular polygon. If $p_{n+1} - p_n = 66$, then the sum of all distinct prime divisors of $n$ is:",
    options: ["7", "8", "5", "6"],
    correct_option: "C",
    solution_text: `The number of triangles formed by joining the vertices of an $n$-sided regular polygon is:
$p_n = \\binom{n}{3}$.

Given $p_{n+1} - p_n = 66$:
$\\binom{n+1}{3} - \\binom{n}{3} = 66$.

Using Pascal's identity $\\binom{n+1}{r} - \\binom{n}{r} = \\binom{n}{r-1}$:
$\\binom{n}{2} = 66$
$\\frac{n(n-1)}{2} = 66 \\implies n(n-1) = 132$.
$n^2 - n - 132 = 0 \\implies (n-12)(n+11) = 0$.
Since $n > 0$, we have $n = 12$.

The prime factorization of 12 is $2^2 \\times 3$.
The distinct prime divisors of 12 are 2 and 3.
The sum of all distinct prime divisors of $n$ is $2 + 3 = 5$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 214,
    question_text: "The number of ways of forming a queue of 4 boys and 3 girls such that all the girls are not together, is:",
    options: ["5040", "3050", "3410", "4320"],
    correct_option: "D",
    solution_text: `Total number of children = 4 boys + 3 girls = 7.
Total number of ways to arrange 7 children in a queue = $7! = 5040$.

Number of ways in which all 3 girls are together:
Treat the 3 girls as a single unit.
Total units to arrange = 4 boys + 1 block of girls = 5 units.
Arrangement of 5 units = $5! = 120$.
Internal arrangements of the 3 girls = $3! = 6$.
Total ways where all girls are together = $120 \\times 6 = 720$.

Number of ways such that all the girls are not together:
$\\text{Total ways} - \\text{Ways where all girls are together} = 5040 - 720 = 4320$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 215,
    question_text: "Let $A = \\{(a, b, c) : a, b, c\\text{ are non-negative integers and }a + b + 2c = 22\\}$. Then $n(A)$ is equal to:",
    options: ["121", "124", "144", "169"],
    correct_option: "C",
    solution_text: `Given $a + b + 2c = 22$ with $a, b, c \\ge 0$ integers.
Rewrite as $a + b = 22 - 2c$.
Since $a, b \\ge 0$, we have $22 - 2c \\ge 0 \\implies c \\le 11$.
Thus $c \\in \\{0, 1, 2, \\dots, 11\\}$.

For each fixed value of $c$, the number of non-negative integer solutions to $a + b = 22 - 2c$ is $(22 - 2c) + 1 = 23 - 2c$.
The total number of solutions is:
$n(A) = \\sum_{c=0}^{11} (23 - 2c) = 23 + 21 + 19 + \\dots + 1$.
This is an arithmetic progression with 12 terms, first term $a_1 = 23$ and last term $a_{12} = 1$:
$n(A) = \\frac{12}{2} \\times (23 + 1) = 6 \\times 24 = 144$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 216,
    question_text: "Two players $A$ and $B$ play a series of games of badminton. The player, who wins 5 games first, wins the series. Assuming that no game ends in a draw, the number of ways, in which player $A$ wins the series is _______",
    options: [],
    correct_option: null,
    numeric_answer: 126,
    solution_text: `Player $A$ wins the series if $A$ wins 5 games before $B$ wins 5 games.
The series can last between 5 and 9 games.
If player $A$ wins the series in exactly $n$ games ($n \\in \\{5, 6, 7, 8, 9\\}$):
- $A$ must win the $n^{\\text{th}}$ game.
- $A$ must win exactly 4 of the first $n - 1$ games.
The number of ways for this to happen is $\\binom{n-1}{4}$.

Total number of ways for $A$ to win:
$\\sum_{n=5}^{9} \\binom{n-1}{4} = \\binom{4}{4} + \\binom{5}{4} + \\binom{6}{4} + \\binom{7}{4} + \\binom{8}{4}$.

Using the hockey-stick identity:
$\\sum_{k=4}^{8} \\binom{k}{4} = \\binom{9}{5} = \\frac{9 \\times 8 \\times 7 \\times 6}{4 \\times 3 \\times 2 \\times 1} = 126$.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 217,
    question_text: "A box contains 5 blue, 6 yellow and 4 red balls. The number of ways, of drawing 8 balls containing at least two balls of each colour, is:",
    options: ["4100", "4140", "4230", "4290"],
    correct_option: "A",
    solution_text: `Let $B, Y, R$ be the number of blue, yellow, and red balls drawn respectively.
We need $B + Y + R = 8$ with $B \\ge 2, Y \\ge 2, R \\ge 2$.
Available balls: Blue = 5, Yellow = 6, Red = 4.
The possible triples $(B, Y, R)$ are:
Case 1: $(2, 2, 4) \\implies \\binom{5}{2} \\times \\binom{6}{2} \\times \\binom{4}{4} = 10 \\times 15 \\times 1 = 150$.
Case 2: $(2, 3, 3) \\implies \\binom{5}{2} \\times \\binom{6}{3} \\times \\binom{4}{3} = 10 \\times 20 \\times 4 = 800$.
Case 3: $(2, 4, 2) \\implies \\binom{5}{2} \\times \\binom{6}{4} \\times \\binom{4}{2} = 10 \\times 15 \\times 6 = 900$.
Case 4: $(3, 2, 3) \\implies \\binom{5}{3} \\times \\binom{6}{2} \\times \\binom{4}{3} = 10 \\times 15 \\times 4 = 600$.
Case 5: $(3, 3, 2) \\implies \\binom{5}{3} \\times \\binom{6}{3} \\times \\binom{4}{2} = 10 \\times 20 \\times 6 = 1200$.
Case 6: $(4, 2, 2) \\implies \\binom{5}{4} \\times \\binom{6}{2} \\times \\binom{4}{2} = 5 \\times 15 \\times 6 = 450$.

Total number of ways = $150 + 800 + 900 + 600 + 1200 + 450 = 4100$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 218,
    question_text: "The number of 4-letter words, with or without meaning, each consisting of two vowels and two consonants that can be formed from the letters of the word INCONSEQUENTIAL, without repeating any letter, is:",
    options: ["2670", "2840", "2920", "3600"],
    correct_option: "D",
    solution_text: `The word is INCONSEQUENTIAL.
Vowels present: I, O, E, U, A $\\implies$ 5 distinct vowels.
Consonants present: N, C, S, Q, T, L $\\implies$ 6 distinct consonants.

We need 4-letter words with 2 vowels and 2 consonants without repeating any letter:
- Select 2 distinct vowels from 5: $\\binom{5}{2} = 10$.
- Select 2 distinct consonants from 6: $\\binom{6}{2} = 15$.
- Arrange the 4 selected letters: $4! = 24$.

Total number of 4-letter words = $10 \\times 15 \\times 24 = 3600$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 219,
    question_text: "A building has ground floor and 10 more floors. Nine persons enter in a lift at the ground floor. The lift goes up to the $10^{\\text{th}}$ floor. The number of ways, in which any 4 persons exit at a floor and the remaining 5 persons exit at a different floor, if the lift does not stop at the first and the second floors, is equal to:",
    options: ["2184", "3064", "7056", "11340"],
    correct_option: "C",
    solution_text: `Total persons = 9.
The lift does not stop at the $1^{\\text{st}}$ and $2^{\\text{nd}}$ floors, so available exit floors are $3^{\\text{rd}}$ through $10^{\\text{th}}$ floor, which is $10 - 2 = 8$ floors.
The 9 persons are split into two groups: one of 4 persons and one of 5 persons.
The number of ways to choose 4 persons for the first group is:
$\\binom{9}{4} = \\frac{9 \\times 8 \\times 7 \\times 6}{4 \\times 3 \\times 2 \\times 1} = 126$.
The remaining 5 persons automatically form the second group.

Now, these two distinct groups must exit at two different floors among the 8 available floors:
Number of ways to assign 2 distinct floors to the 2 distinct groups = $^8P_2 = 8 \\times 7 = 56$.

Total number of ways = $126 \\times 56 = 7056$.`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 220,
    question_text: "A person has three different bags and four different books. The number of ways, in which he can put these books in the bags so that no bag is empty, is:",
    options: ["18", "36", "48", "72"],
    correct_option: "B",
    solution_text: `We need to distribute 4 different books into 3 different bags such that no bag is empty.
The partition of 4 into 3 non-empty parts is $2 + 1 + 1$.
- Choose 2 books to go together into one bag: $\\binom{4}{2} = 6$.
- Now we have 3 groups of books (one of size 2, two of size 1).
- Distribute these 3 distinct groups of books into the 3 different bags: $3! = 6$.

Total number of ways = $6 \\times 6 = 36$.`,
    marks: 4,
    type: "single_choice"
  }
];
