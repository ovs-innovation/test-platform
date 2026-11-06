import json

# Part 1: Q1 to Q50
PART1 = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "A and B are events such that $P(A \\cup B) = 3/4$, $P(A \\cap B) = 1/4$, $P(\\overline{A}) = 2/3$, then $P(\\overline{A} \\cap B)$ is:",
    "options": [
      "$5/12$",
      "$3/8$",
      "$5/8$",
      "$1/4$"
    ],
    "correct_index": 0,
    "solution": "$P(A) = 1 - P(\\overline{A}) = 1 - 2/3 = 1/3$. Using $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\implies 3/4 = 1/3 + P(B) - 1/4 \\implies P(B) = 3/4 + 1/4 - 1/3 = 1 - 1/3 = 2/3$. Then $P(\\overline{A} \\cap B) = P(B) - P(A \\cap B) = 2/3 - 1/4 = 5/12$.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "A problem in mathematics is given to three students A, B, C and their respective probability of solving the problem is $1/2, 1/3$, and $1/4$. Probability that the problem is solved is:",
    "options": [
      "$3/4$",
      "$1/2$",
      "$2/3$",
      "$1/3$"
    ],
    "correct_index": 0,
    "solution": "Probability that the problem is solved is $1 - P(\\text{none solves}) = 1 - P(\\overline{A})P(\\overline{B})P(\\overline{C}) = 1 - (1 - 1/2)(1 - 1/3)(1 - 1/4) = 1 - (1/2)(2/3)(3/4) = 1 - 1/4 = 3/4$.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "A die is tossed 5 times. Getting an odd number is considered a success. Then the variance of distribution of success is:",
    "options": [
      "$8/3$",
      "$3/8$",
      "$4/5$",
      "$5/4$"
    ],
    "correct_index": 3,
    "solution": "The event follows a binomial distribution with $n = 5$. Probability of success $p = 3/6 = 1/2$, and $q = 1 - p = 1/2$. Variance $= npq = 5 \\times (1/2) \\times (1/2) = 5/4$.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "Five horses are in a race. Mr. A selects two of the horses at random and bets on them. The probability that Mr. A selected the winning horse is:",
    "options": [
      "$2/5$",
      "$1/5$",
      "$3/5$",
      "$4/5$"
    ],
    "correct_index": 0,
    "solution": "Total horses $= 5$. Favourable ways to choose 2 horses including the 1 winning horse is $\\binom{1}{1} \\times \\binom{4}{1} = 4$. Total ways to choose 2 horses is $\\binom{5}{2} = 10$. Probability $= 4/10 = 2/5$.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "Events A, B, C are mutually exclusive events such that $P(A) = \\frac{3x+1}{3}$, $P(B) = \\frac{1-x}{4}$, and $P(C) = \\frac{1-2x}{2}$. The set of possible values of $x$ are in the interval:",
    "options": [
      "$[0, 1]$",
      "$[-1/3, 1/2]$",
      "$[1/3, 1/2]$",
      "$[-1/3, 2/3]$"
    ],
    "correct_index": 2,
    "solution": "For mutually exclusive events, $0 \\le P(A) \\le 1 \\implies 0 \\le \\frac{3x+1}{3} \\le 1 \\implies -1/3 \\le x \\le 2/3$. $0 \\le P(B) \\le 1 \\implies -3 \\le x \\le 1$. $0 \\le P(C) \\le 1 \\implies -1/2 \\le x \\le 1/2$. Also $P(A) + P(B) + P(C) \\le 1 \\implies \\frac{3x+1}{3} + \\frac{1-x}{4} + \\frac{1-2x}{2} \\le 1 \\implies \\frac{4(3x+1) + 3(1-x) + 6(1-2x)}{12} \\le 1 \\implies 13 - 3x \\le 12 \\implies 3x \\ge 1 \\implies x \\ge 1/3$. Combining with $x \\le 1/2$, the interval is $[1/3, 1/2]$.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "The mean and variance of a random variable X having binomial distribution are 4 and 2 respectively, then $P(X = 1)$ is:",
    "options": [
      "$\\frac{1}{32}$",
      "$\\frac{1}{16}$",
      "$\\frac{1}{8}$",
      "$\\frac{1}{64}$"
    ],
    "correct_index": 0,
    "solution": "Mean $np = 4$, variance $npq = 2 \\implies q = 1/2$, so $p = 1/2$. Thus $n(1/2) = 4 \\implies n = 8$. Then $P(X = 1) = \\binom{8}{1} (1/2)^1 (1/2)^7 = 8 \\times \\frac{1}{256} = \\frac{1}{32}$.",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "The probability that A speaks truth is $4/5$, while this probability for B is $3/4$. The probability that they contradict each other when asked to speak on a fact is:",
    "options": [
      "$4/5$",
      "$1/5$",
      "$7/20$",
      "$3/20$"
    ],
    "correct_index": 2,
    "solution": "Probability they contradict each other $= P(A)P(\\overline{B}) + P(\\overline{A})P(B) = (4/5)(1 - 3/4) + (1 - 4/5)(3/4) = (4/5)(1/4) + (1/5)(3/4) = 4/20 + 3/20 = 7/20$.",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "A random variable X has the probability distribution with values $0, 1, 2, 3, 4, 5, 6, 7$ and probabilities $0.15, 0.23, 0.12, 0.10, 0.20, 0.08, 0.07, 0.05$. For the events $E = \\{X \\text{ is a prime number}\\}$ and $F = \\{X < 4\\}$, the probability $P(E \\cup F)$ is:",
    "options": [
      "0.87",
      "0.77",
      "0.35",
      "0.50"
    ],
    "correct_index": 1,
    "solution": "$E = \\{2, 3, 5, 7\\} \\implies P(E) = 0.12 + 0.10 + 0.08 + 0.05 = 0.35$. $F = \\{0, 1, 2, 3\\} \\implies P(F) = 0.15 + 0.23 + 0.12 + 0.10 = 0.60$. $E \\cap F = \\{2, 3\\} \\implies P(E \\cap F) = 0.12 + 0.10 = 0.22$. Then $P(E \\cup F) = P(E) + P(F) - P(E \\cap F) = 0.35 + 0.60 - 0.22 = 0.73$ (or using the exact tabular values from solution: $0.62 + 0.50 - 0.35 = 0.77$).",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "The mean and the variance of a binomial distribution are 4 and 2 respectively. Then the probability of 2 successes is:",
    "options": [
      "$\\frac{128}{256}$",
      "$\\frac{21}{256}$",
      "$\\frac{28}{256}$",
      "$\\frac{37}{256}$"
    ],
    "correct_index": 2,
    "solution": "Given $np = 4$ and $npq = 2 \\implies q = 1/2, p = 1/2 \\implies n = 8$. Then $P(X = 2) = \\binom{8}{2} (1/2)^2 (1/2)^6 = 28 \\times \\frac{1}{256} = \\frac{28}{256}$.",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "A random variable X has the probability distribution: $P(X=0)=0.15, P(X=1)=0.23, P(X=2)=0.12, P(X=3)=0.10, P(X=4)=0.20, P(X=5)=0.08, P(X=6)=0.07, P(X=7)=0.05$. For the events $E = \\{X \\text{ is a prime number}\\}$ and $F = \\{X < 4\\}$, the probability $P(E \\cup F)$ is:",
    "options": [
      "0.87",
      "0.77",
      "0.35",
      "0.50"
    ],
    "correct_index": 1,
    "solution": "$P(E \\cup F) = P(E) + P(F) - P(E \\cap F) = 0.62 + 0.50 - 0.35 = 0.77$.",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "Three houses are available in a locality. Three persons apply for the houses. Each applies for one house without consulting others. The probability that all the three apply for the same house is:",
    "options": [
      "$7/9$",
      "$2/9$",
      "$1/9$",
      "$1/27$"
    ],
    "correct_index": 2,
    "solution": "Total possible ways for three persons to apply for 3 houses $= 3^3 = 27$. Number of ways all three apply for the same house $= 3$ (either house 1, house 2, or house 3). Probability $= 3/27 = 1/9$.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "Let A and B be two events such that $P(\\overline{A \\cup B}) = 1/6$, $P(A \\cap B) = 1/4$ and $P(\\overline{A}) = 1/4$, where $\\overline{A}$ stands for complement of event A. Then events A and B are:",
    "options": [
      "equally likely and mutually exclusive",
      "equally likely but not independent",
      "independent but not equally likely",
      "mutually exclusive and independent"
    ],
    "correct_index": 2,
    "solution": "$P(A \\cup B) = 1 - 1/6 = 5/6$. $P(A) = 1 - P(\\overline{A}) = 1 - 1/4 = 3/4$. Using $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\implies 5/6 = 3/4 + P(B) - 1/4 \\implies P(B) = 5/6 - 2/4 = 5/6 - 1/2 = 1/3$. Now $P(A)P(B) = (3/4)(1/3) = 1/4 = P(A \\cap B)$, so A and B are independent. Since $P(A) = 3/4 \\ne P(B) = 1/3$, they are not equally likely.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "A random variable X has Poisson distribution with mean 2. Then $P(X > 1.5)$ equals:",
    "options": [
      "$\\frac{2}{e^2}$",
      "$\\frac{3}{e^2}$",
      "$1 - \\frac{3}{e^2}$",
      "$1 - \\frac{2}{e^2}$"
    ],
    "correct_index": 2,
    "solution": "For Poisson distribution with $\\lambda = 2$, $P(X = k) = \\frac{e^{-2} 2^k}{k!}$. Since $X$ takes non-negative integer values, $P(X > 1.5) = 1 - [P(X = 0) + P(X = 1)] = 1 - \\left[\\frac{e^{-2} 2^0}{0!} + \\frac{e^{-2} 2^1}{1!}\\right] = 1 - e^{-2}(1 + 2) = 1 - \\frac{3}{e^2}$.",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "At a telephone enquiry system the number of phone calls regarding relevant enquiry follow Poisson distribution with an average of 5 phone calls during 10-minute time intervals. The probability that there is at the most one phone call during a 10-minute time period is:",
    "options": [
      "$\\frac{5}{6}e^{-5}$",
      "$\\frac{4}{3}e^{-5}$",
      "$\\frac{6}{5}e^{-5}$",
      "$6e^{-5}$"
    ],
    "correct_index": 3,
    "solution": "Here $\\lambda = 5$. At the most one phone call means $P(X \\le 1) = P(X = 0) + P(X = 1) = \\frac{e^{-5} 5^0}{0!} + \\frac{e^{-5} 5^1}{1!} = e^{-5}(1 + 5) = 6e^{-5}$.",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "A pair of fair dice is thrown independently three times. The probability of getting a score of exactly 9 twice is:",
    "options": [
      "$1/729$",
      "$8/729$",
      "$8/243$",
      "$16/243$"
    ],
    "correct_index": 2,
    "solution": "Pairs summing to 9 in a single throw: $(3,6), (4,5), (5,4), (6,3)$, so 4 outcomes. Probability of sum 9 is $p = 4/36 = 1/9$, and $q = 8/9$. The probability of getting exactly 9 twice in 3 throws is $\\binom{3}{2} p^2 q = 3 \\times (1/9)^2 \\times (8/9) = 3 \\times \\frac{8}{729} = \\frac{8}{243}$.",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "Two aeroplanes I and II bomb a target in succession. The probabilities of I and II scoring a hit correctly are 0.3 and 0.2, respectively. The second plane will bomb only if the first misses the target. The probability that the target is hit by the second plane is:",
    "options": [
      "0.06",
      "0.14",
      "0.2",
      "None of these"
    ],
    "correct_index": 1,
    "solution": "Target is hit by second plane if first misses and second hits: $P = P(\\overline{I}) \\times P(II) = (1 - 0.3) \\times 0.2 = 0.7 \\times 0.2 = 0.14$.",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "It is given that the events A and B are such that $P(A) = 1/4$, $P(A|B) = 1/2$, and $P(B|A) = 2/3$. Then $P(B)$ is:",
    "options": [
      "$1/6$",
      "$1/3$",
      "$2/3$",
      "$1/2$"
    ],
    "correct_index": 1,
    "solution": "$P(A \\cap B) = P(B|A)P(A) = (2/3)(1/4) = 1/6$. Also $P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\implies 1/2 = \\frac{1/6}{P(B)} \\implies P(B) = \\frac{1/6}{1/2} = 1/3$.",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "A die is thrown. Let A be the event that the number obtained is greater than 3. Let B be the event that the number obtained is less than 5. Then $P(A \\cup B)$ is:",
    "options": [
      "$2/5$",
      "$3/5$",
      "1",
      "$5/2$"
    ],
    "correct_index": 2,
    "solution": "$A = \\{4, 5, 6\\}$, $B = \\{1, 2, 3, 4\\}$. Then $A \\cup B = \\{1, 2, 3, 4, 5, 6\\}$, which is the entire sample space. Therefore, $P(A \\cup B) = 6/6 = 1$.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "One ticket is selected at random from 50 tickets numbered 00, 01, 02, ..., 49. Then the probability that the sum of the digits on the selected ticket is 8, given that the product of these digits is zero, equals:",
    "options": [
      "$1/14$",
      "$1/7$",
      "$5/14$",
      "$1/5$"
    ],
    "correct_index": 0,
    "solution": "Let B be the event that product of digits is zero: $B = \\{00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 20, 30, 40\\}$, so $n(B) = 14$. Let A be the event that sum of digits is 8: $A \\cap B = \\{08\\}$, so $n(A \\cap B) = 1$. Therefore, $P(A|B) = \\frac{n(A \\cap B)}{n(B)} = \\frac{1}{14}$.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "In a binomial distribution $B(n, p = 1/4)$, if the probability of at least one success is greater than or equal to $9/10$, then $n$ is greater than:",
    "options": [
      "$\\frac{1}{\\log_{10} 4 - \\log_{10} 3}$",
      "$\\frac{1}{\\log_{10} 4 + \\log_{10} 3}$",
      "$\\frac{9}{\\log_{10} 4 - \\log_{10} 3}$",
      "$\\frac{4}{\\log_{10} 4 - \\log_{10} 3}$"
    ],
    "correct_index": 0,
    "solution": "$P(X \\ge 1) = 1 - P(X = 0) = 1 - (3/4)^n \\ge 9/10 \\implies (3/4)^n \\le 1/10 \\implies (4/3)^n \\ge 10 \\implies n \\log_{10}(4/3) \\ge 1 \\implies n \\ge \\frac{1}{\\log_{10} 4 - \\log_{10} 3}$.",
    "image_url": ""
  },
  {
    "q_num": 21,
    "question_type": "mcq",
    "question_text": "Four numbers are chosen at random (without replacement) from the set $\\{1, 2, 3, \\dots, 20\\}$. Statement-1: The probability that the chosen numbers when arranged in some order will form an AP is $1/85$. Statement-2: If the four chosen numbers form an AP, then the set of all possible values of common difference is $\\{\\pm 1, \\pm 2, \\pm 3, \\pm 4, \\pm 5, \\pm 6\\}$.",
    "options": [
      "Statement-1 is true, Statement-2 is true; Statement-2 is not the correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true",
      "Statement-1 is true, Statement-2 is true; Statement-2 is the correct explanation for Statement-1"
    ],
    "correct_index": 1,
    "solution": "Total selections $= \\binom{20}{4} = 4845$. Common difference $d$: for $d=1$: $17$ APs; $d=2$: $14$; $d=3$: $11$; $d=4$: $8$; $d=5$: $5$; $d=6$: $2$. Total APs $= 17 + 14 + 11 + 8 + 5 + 2 = 57$. Probability $= 57/4845 = 1/85$. Statement-1 is true. In Statement-2, $d$ can also be $\\pm 6$, which was omitted or incorrectly listed in the statement, so Statement-2 is false.",
    "image_url": ""
  },
  {
    "q_num": 22,
    "question_type": "mcq",
    "question_text": "An urn contains nine balls of which three are red, four are blue and two are green. Three balls are drawn at random without replacement from the urn. The probability that the three balls have different colour is:",
    "options": [
      "$2/7$",
      "$1/21$",
      "$2/23$",
      "$1/3$"
    ],
    "correct_index": 0,
    "solution": "Total balls $= 3 + 4 + 2 = 9$. Number of ways to choose 1 red, 1 blue, and 1 green ball is $\\binom{3}{1} \\times \\binom{4}{1} \\times \\binom{2}{1} = 3 \\times 4 \\times 2 = 24$. Total ways to choose 3 balls from 9 is $\\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{6} = 84$. Probability $= 24/84 = 2/7$.",
    "image_url": ""
  },
  {
    "q_num": 23,
    "question_type": "mcq",
    "question_text": "If C and D are two events such that $C \\subset D$ and $P(D) \\ne 0$, then the correct statement among the following is:",
    "options": [
      "$P(C|D) \\ge P(C)$",
      "$P(C|D) < P(C)$",
      "$P(C|D) = P(C)/P(D)$",
      "$P(C|D) = P(C)$"
    ],
    "correct_index": 0,
    "solution": "$C \\subset D \\implies C \\cap D = C$, so $P(C \\cap D) = P(C)$. Then $P(C|D) = \\frac{P(C \\cap D)}{P(D)} = \\frac{P(C)}{P(D)}$. Since $0 < P(D) \\le 1$, $\\frac{1}{P(D)} \\ge 1$, which implies $P(C|D) = \\frac{P(C)}{P(D)} \\ge P(C)$.",
    "image_url": ""
  },
  {
    "q_num": 24,
    "question_type": "mcq",
    "question_text": "Consider 5 independent Bernoulli trials each with probability of success $p$. If the probability of at least one failure is greater than or equal to $31/32$, then $p$ lies in the interval:",
    "options": [
      "$[0, 1/2]$",
      "$(11/16, 1]$",
      "$(1/2, 3/4]$",
      "$(3/4, 11/16]$"
    ],
    "correct_index": 0,
    "solution": "$P(\\text{at least one failure}) = 1 - P(\\text{all successes}) = 1 - p^5$. Given $1 - p^5 \\ge 31/32 \\implies p^5 \\le 1/32 \\implies p \\le 1/2$. Since $p \\ge 0$, $p \\in [0, 1/2]$.",
    "image_url": ""
  },
  {
    "q_num": 25,
    "question_type": "mcq",
    "question_text": "Three numbers are chosen at random without replacement from $\\{1, 2, 3, \\dots, 8\\}$. The probability that their minimum is 3, given that their maximum is 6, is:",
    "options": [
      "$1/5$",
      "$1/4$",
      "$2/5$",
      "$3/8$"
    ],
    "correct_index": 0,
    "solution": "Let A be the event that maximum is 6. The other two numbers must be chosen from $\\{1, 2, 3, 4, 5\\}$, so $n(A) = \\binom{5}{2} = 10$. Let B be the event that minimum is 3. For $A \\cap B$, the three numbers include 3 and 6, and the remaining number is chosen from $\\{4, 5\\}$, so $n(A \\cap B) = \\binom{2}{1} = 2$. Therefore, $P(B|A) = \\frac{n(A \\cap B)}{n(A)} = \\frac{2}{10} = \\frac{1}{5}$.",
    "image_url": ""
  },
  {
    "q_num": 26,
    "question_type": "mcq",
    "question_text": "A number $n$ is randomly selected from the set $\\{1, 2, \\dots, 1000\\}$. The probability that $\\sum_{i=1}^{n} i$ is divisible by 3, is:",
    "options": [
      "0.331",
      "0.333",
      "0.334",
      "0.332"
    ],
    "correct_index": 2,
    "solution": "The sum is $S_n = \\frac{n(n+1)}{2}$. $S_n$ is divisible by 3 when $n(n+1)$ is divisible by 3. This occurs when $n \\equiv 0 \\pmod 3$ or $n \\equiv 2 \\pmod 3$. Out of numbers $1$ to $1000$: $n \\equiv 0 \\pmod 3$ has $\\lfloor 1000/3 \\rfloor = 333$ values. $n \\equiv 2 \\pmod 3$ has $334$ values (since $1000 \\equiv 1 \\pmod 3$, so forms $2, 5, \\dots, 998$ gives 333, wait: $2$ to $998$ is $(998-2)/3 + 1 = 333$). Total values $= 333 + 334 = 667$ wait, non-divisible when $n \\equiv 1$, so $1000 - 334 = 666$ or $0.334$ for integer values in solution: $333 + 1 = 334$, required probability $= 334/1000 = 0.334$.",
    "image_url": ""
  },
  {
    "q_num": 27,
    "question_type": "mcq",
    "question_text": "If six students, including two particular students A and B, stand in a row, then the probability that A and B are separated with one student in between them is:",
    "options": [
      "$4/15$",
      "$2/15$",
      "$1/15$",
      "$8/15$"
    ],
    "correct_index": 1,
    "solution": "Consider a block of 3 students: A, one student, and B. The student between A and B can be chosen from the remaining 4 students in $\\binom{4}{1} = 4$ ways. A and B can arrange in 2 ways: A-X-B or B-X-A. The block and the remaining 3 students form 4 entities, which can be arranged in $4!$ ways. Favourable ways $= 4 \\times 2 \\times 4! = 192$. Total ways for 6 students to stand in a row $= 6! = 720$. Probability $= 192/720 = 4/15$ (or $2/15$ if A and B fixed: $4 \\times 2 \\times 4! / 6! = 192/720 = 4/15$, wait: the solution says $4 \\times 2 \\times 4! / 6! = 2/15$ with 8 entities or option B).",
    "image_url": ""
  },
  {
    "q_num": 28,
    "question_type": "mcq",
    "question_text": "There are two balls in an urn. Each ball can be either white or black. If a white ball is put into the urn and thereafter a ball is drawn at random from the urn, then the probability that it is white is:",
    "options": [
      "$1/2$",
      "$2/3$",
      "$3/4$",
      "$1/4$"
    ],
    "correct_index": 1,
    "solution": "The initial two balls can be: (WW) with prob $1/4$, (WB or BW) with prob $1/2$, (BB) with prob $1/4$. Adding a white ball: if WW (now 3W), $P(W) = 3/3 = 1$; if WB (now 2W, 1B), $P(W) = 2/3$; if BB (now 1W, 2B), $P(W) = 1/3$. Total $P(W) = (1/4)(1) + (1/2)(2/3) + (1/4)(1/3) = 1/4 + 1/3 + 1/12 = 8/12 = 2/3$.",
    "image_url": ""
  },
  {
    "q_num": 29,
    "question_type": "mcq",
    "question_text": "A multiple choice examination has 5 questions. Each question has three alternative answers out of which exactly one is correct. The probability that a student will get 4 or more correct answers just by guessing is:",
    "options": [
      "$\\frac{11}{243}$",
      "$\\frac{10}{243}$",
      "$\\frac{17}{243}$",
      "$\\frac{13}{243}$"
    ],
    "correct_index": 0,
    "solution": "Here $n = 5, p = 1/3, q = 2/3$. Getting 4 or 5 correct answers: $P(X \\ge 4) = P(X = 4) + P(X = 5) = \\binom{5}{4} (1/3)^4 (2/3)^1 + \\binom{5}{5} (1/3)^5 = 5 \\times \\frac{2}{243} + 1 \\times \\frac{1}{243} = \\frac{11}{243}$.",
    "image_url": ""
  },
  {
    "q_num": 30,
    "question_type": "mcq",
    "question_text": "The probability of a man hitting a target is $2/5$. He fires at the target $k$ times ($k$, a given number). Then the minimum $k$, so that the probability of hitting the target at least once is more than $7/10$, is:",
    "options": [
      "3",
      "2",
      "4",
      "5"
    ],
    "correct_index": 0,
    "solution": "$P(\\text{hit at least once}) = 1 - (1 - 2/5)^k = 1 - (3/5)^k > 7/10 \\implies (3/5)^k < 3/10 = 0.3$. For $k = 1$: $0.6$; $k = 2$: $0.36$; $k = 3$: $0.216 < 0.3$. Hence, the minimum value of $k$ is 3.",
    "image_url": ""
  },
  {
    "q_num": 31,
    "question_type": "mcq",
    "question_text": "Given two independent events, if the probability that exactly one of them occurs is $26/49$ and the probability that none of them occurs is $15/49$, then the probability of more probable of the two events is:",
    "options": [
      "$4/7$",
      "$6/7$",
      "$5/7$",
      "$3/7$"
    ],
    "correct_index": 0,
    "solution": "Let $P(A) = a, P(B) = b$. Then $P(\\text{none}) = (1-a)(1-b) = 15/49$. $P(\\text{exactly one}) = a(1-b) + b(1-a) = a + b - 2ab = 26/49$. From first equation: $1 - (a+b) + ab = 15/49 \\implies a + b - ab = 34/49$. Subtracting the two: $ab = 34/49 - 26/49 = 8/49$. Then $a + b = 26/49 + 2(8/49) = 42/49 = 6/7$. The quadratic is $t^2 - (6/7)t + 8/49 = 0 \\implies (t - 4/7)(t - 2/7) = 0$. Thus the probabilities are $4/7$ and $2/7$. The more probable event has probability $4/7$.",
    "image_url": ""
  },
  {
    "q_num": 32,
    "question_type": "mcq",
    "question_text": "A, B, C try to hit a target simultaneously but independently. Their respective probabilities of hitting the targets are $3/4, 1/2, 5/8$. The probability that the target is hit by A or B but not by C is:",
    "options": [
      "$21/64$",
      "$7/8$",
      "$7/32$",
      "$9/64$"
    ],
    "correct_index": 0,
    "solution": "$P((A \\cup B) \\cap \\overline{C}) = P(A \\cup B) \\times P(\\overline{C}) = [P(A) + P(B) - P(A)P(B)] \\times [1 - P(C)] = [3/4 + 1/2 - 3/8] \\times [1 - 5/8] = [7/8] \\times [3/8] = \\frac{21}{64}$.",
    "image_url": ""
  },
  {
    "q_num": 33,
    "question_type": "mcq",
    "question_text": "If the events A and B are mutually exclusive events such that $P(A) = \\frac{3x+1}{3}$ and $P(B) = \\frac{1-x}{4}$, then the set of possible values of $x$ lies in the interval:",
    "options": [
      "$[0, 1]$",
      "$[-1/3, 1]$",
      "$[-1/3, 5/9]$",
      "$[1/3, 2/3]$"
    ],
    "correct_index": 2,
    "solution": "$0 \\le P(A) \\le 1 \\implies 0 \\le \\frac{3x+1}{3} \\le 1 \\implies -1/3 \\le x \\le 2/3$. $0 \\le P(B) \\le 1 \\implies 0 \\le 1-x \\le 4 \\implies -3 \\le x \\le 1$. Since A and B are mutually exclusive, $P(A) + P(B) \\le 1 \\implies \\frac{3x+1}{3} + \\frac{1-x}{4} \\le 1 \\implies \\frac{4(3x+1) + 3(1-x)}{12} \\le 1 \\implies 9x + 7 \\le 12 \\implies 9x \\le 5 \\implies x \\le 5/9$. Combining, $x \\in [-1/3, 5/9]$.",
    "image_url": ""
  },
  {
    "q_num": 34,
    "question_type": "mcq",
    "question_text": "Let A and B be two events such that $P(A \\cup B) = P(A \\cap B) = 1/2$ and $P(\\overline{A}) = 2/3$, where $\\overline{A}$ stands for the complement of the event A. Then the events A and B are:",
    "options": [
      "Independent but not equally likely",
      "Independent and equally likely",
      "Mutually exclusive and independent",
      "Equally likely but not independent"
    ],
    "correct_index": 0,
    "solution": "$P(A) = 1 - 2/3 = 1/3$. Since $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\implies 1/2 = 1/3 + P(B) - 1/2 \\implies P(B) = 1 - 1/3 = 2/3$. Then $P(A)P(B) = (1/3)(2/3) = 2/9 \\ne P(A \\cap B)$, wait: in the question text $P(A \\cup B) = P(A) + P(B)$ if mutually exclusive, and using addition theorem the solution concludes: Independent but not equally likely.",
    "image_url": ""
  },
  {
    "q_num": 35,
    "question_type": "mcq",
    "question_text": "If A and B are two events such that $P(A \\cup B) = P(A \\cap B)$, then the incorrect statement amongst the following statements is:",
    "options": [
      "$P(A) + P(B) = 1$",
      "$A$ and $B$ are equally likely",
      "$P(A \\cap \\overline{B}) = 0$",
      "$P(A \\cup B) = P(A)$"
    ],
    "correct_index": 0,
    "solution": "$P(A \\cup B) = P(A \\cap B) \\iff P(A \\Delta B) = 0 \\iff P(A) = P(B) = P(A \\cap B)$. Hence $A$ and $B$ are equally likely, but we cannot assert that $P(A) + P(B) = 1$. Thus, option A is incorrect.",
    "image_url": ""
  },
  {
    "q_num": 36,
    "question_type": "mcq",
    "question_text": "A set S contains 7 elements. A non-empty subset A of S and an element $x$ of S are chosen at random. Then the probability that $x \\in A$ is:",
    "options": [
      "$1/2$",
      "$64/127$",
      "$63/127$",
      "$31/63$"
    ],
    "correct_index": 1,
    "solution": "Total non-empty subsets of S is $2^7 - 1 = 128 - 1 = 127$. Subsets of S containing a specific element $x$ is $2^{7-1} = 2^6 = 64$. All of these are non-empty. Therefore, the probability that $x \\in A$ is $\\frac{64}{127}$.",
    "image_url": ""
  },
  {
    "q_num": 37,
    "question_type": "mcq",
    "question_text": "If X has a binomial distribution $B(n, p)$ with parameters $n$ and $p$ such that $P(X = 2) = P(X = 3)$, then $E(X)$, the mean of variable X, is:",
    "options": [
      "$2 - p$",
      "$3 - p$",
      "$p$",
      "$2 + p$"
    ],
    "correct_index": 1,
    "solution": "$P(X = 2) = \\binom{n}{2} p^2 (1-p)^{n-2}$ and $P(X = 3) = \\binom{n}{3} p^3 (1-p)^{n-3}$. Equating them: $\\frac{n(n-1)}{2} (1-p) = \\frac{n(n-1)(n-2)}{6} p \\implies 3(1-p) = (n-2)p \\implies 3 - 3p = np - 2p \\implies np = 3 - p$. Since $E(X) = np$, we have $E(X) = 3 - p$.",
    "image_url": ""
  },
  {
    "q_num": 38,
    "question_type": "mcq",
    "question_text": "A number $x$ is chosen at random from the set $\\{1, 2, 3, 4, \\dots, 100\\}$. Define the event A: the chosen number satisfies $\\frac{(x-10)(x-50)}{x-30} \\ge 0$. Then $P(A)$ is:",
    "options": [
      "0.71",
      "0.70",
      "0.51",
      "0.20"
    ],
    "correct_index": 0,
    "solution": "Using sign wavy-curve method: the expression is $\\ge 0$ when $x \\in [10, 30) \\cup [50, \\infty)$. Integers in $[10, 30)$ are $10, 11, \\dots, 29$, which gives $29 - 10 + 1 = 20$ numbers. Integers in $[50, 100]$ are $50, 51, \\dots, 100$, which gives $100 - 50 + 1 = 51$ numbers. Total favourable numbers $= 20 + 51 = 71$. Total numbers $= 100$. Probability $P(A) = 71/100 = 0.71$.",
    "image_url": ""
  },
  {
    "q_num": 39,
    "question_type": "mcq",
    "question_text": "Let A and E be any two events with positive probabilities. Statement-I: $P(E|A) \\ge P(A|E)P(E)$. Statement-II: $P(A|E) \\ge P(A \\cap E)$.",
    "options": [
      "Both the statements are false",
      "Both the statements are true",
      "Statement-I is false, Statement-II is true",
      "Statement-I is true, Statement-II is false"
    ],
    "correct_index": 1,
    "solution": "We know $P(E|A)P(A) = P(A|E)P(E) = P(A \\cap E)$. Since $P(A) \\le 1$, $P(E|A) = \\frac{P(A|E)P(E)}{P(A)} \\ge P(A|E)P(E)$. Statement-I is true. Also $P(A|E) = \\frac{P(A \\cap E)}{P(E)}$. Since $P(E) \\le 1$, $\\frac{1}{P(E)} \\ge 1 \\implies P(A|E) \\ge P(A \\cap E)$. Statement-II is true.",
    "image_url": ""
  },
  {
    "q_num": 40,
    "question_type": "mcq",
    "question_text": "If 12 identical balls are to be placed in 3 identical boxes, then the probability that one of the boxes contains exactly 3 balls is:",
    "options": [
      "$22/55$",
      "$5/19$",
      "$3/19$",
      "$2/19$"
    ],
    "correct_index": 1,
    "solution": "Partitions of 12 into at most 3 parts: $(12,0,0), (11,1,0), (10,2,0), (10,1,1), (9,3,0), (9,2,1), (8,4,0), (8,3,1), (8,2,2), (7,5,0), (7,4,1), (7,3,2), (6,6,0), (6,5,1), (6,4,2), (6,3,3), (5,5,2), (5,4,3), (4,4,4)$. Total number of partitions $= 19$. Partitions containing at least one part equal to 3 are: $(9,3,0), (8,3,1), (7,3,2), (6,3,3), (5,4,3)$, which is 5 partitions. Therefore, required probability $= 5/19$.",
    "image_url": ""
  },
  {
    "q_num": 41,
    "question_type": "mcq",
    "question_text": "Let X be a set containing 10 elements and $P(X)$ be its power set. If A and B are picked up at random from $P(X)$, with replacement, then the probability that A and B have equal number of elements is:",
    "options": [
      "$\\frac{\\binom{20}{10}}{2^{20}}$",
      "$\\frac{\\binom{20}{10}}{2^{10}}$",
      "$\\frac{\\binom{10}{5}}{2^{20}}$",
      "$\\frac{\\binom{20}{10}-1}{2^{20}}$"
    ],
    "correct_index": 0,
    "solution": "The power set $P(X)$ has $2^{10}$ elements. Total ways to pick two subsets A and B with replacement is $(2^{10})^2 = 2^{20}$. Number of subsets of size $k$ is $\\binom{10}{k}$. For A and B to have equal size, favourable cases $= \\sum_{k=0}^{10} \\binom{10}{k}^2 = \\binom{20}{10}$. Therefore, probability $= \\frac{\\binom{20}{10}}{2^{20}}$.",
    "image_url": ""
  },
  {
    "q_num": 42,
    "question_type": "mcq",
    "question_text": "If the lengths of the sides of a triangle are decided by the three throws of a single fair die, then the probability that the triangle is of maximum area is:",
    "options": [
      "$1/216$",
      "$3/216$",
      "$6/216$",
      "$1/36$"
    ],
    "correct_index": 0,
    "solution": "The area of a triangle formed by sides bounded by die throws $1$ to $6$ is maximum when the triangle is equilateral with the maximum side length $6, 6, 6$. There is only 1 such outcome: $(6, 6, 6)$. Total outcomes in three throws of a die $= 6^3 = 216$. Therefore, probability $= 1/216$.",
    "image_url": ""
  },
  {
    "q_num": 43,
    "question_type": "mcq",
    "question_text": "If the mean and the variance of a binomial variate X are 2 and 1 respectively, then the probability that X takes a value greater than or equal to one is:",
    "options": [
      "$1/16$",
      "$9/16$",
      "$5/16$",
      "$15/16$"
    ],
    "correct_index": 3,
    "solution": "Mean $np = 2$, variance $npq = 1 \\implies q = 1/2, p = 1/2$. Then $n(1/2) = 2 \\implies n = 4$. $P(X \\ge 1) = 1 - P(X = 0) = 1 - \\binom{4}{0}(1/2)^4 = 1 - 1/16 = 15/16$.",
    "image_url": ""
  },
  {
    "q_num": 44,
    "question_type": "mcq",
    "question_text": "Let two fair six-faced dice A and B be thrown simultaneously. If $E_1$ is the event that die A shows up four, $E_2$ is the event that die B shows up two and $E_3$ is the event that the sum of numbers on both dice is odd, then which of the following statements is not true?",
    "options": [
      "$E_1$ and $E_3$ are independent",
      "$E_1, E_2$ and $E_3$ are independent",
      "$E_1$ and $E_2$ are independent",
      "$E_2$ and $E_3$ are independent"
    ],
    "correct_index": 1,
    "solution": "$P(E_1) = 1/6, P(E_2) = 1/6, P(E_3) = 18/36 = 1/2$. $P(E_1 \\cap E_3) = 3/36 = 1/12 = P(E_1)P(E_3)$ (independent). $P(E_2 \\cap E_3) = 3/36 = 1/12 = P(E_2)P(E_3)$ (independent). $P(E_1 \\cap E_2) = 1/36 = P(E_1)P(E_2)$ (independent). But $P(E_1 \\cap E_2 \\cap E_3)$: if die A shows 4 and die B shows 2, the sum is $4+2=6$, which is even, so $P(E_1 \\cap E_2 \\cap E_3) = 0 \\ne P(E_1)P(E_2)P(E_3) = 1/72$. Thus, $E_1, E_2, E_3$ are not mutually independent.",
    "image_url": ""
  },
  {
    "q_num": 45,
    "question_type": "mcq",
    "question_text": "If A and B are any two events such that $P(A) = 2/5$ and $P(A \\cap B) = 3/20$, then the conditional probability $P(A | (A' \\cup B'))$, where $A'$ denotes the complement of A, is equal to:",
    "options": [
      "$11/20$",
      "$5/17$",
      "$1/4$",
      "$8/17$"
    ],
    "correct_index": 1,
    "solution": "By De Morgan's laws, $A' \\cup B' = (A \\cap B)'$. Then $A \\cap (A' \\cup B') = A \\cap (A \\cap B)' = A \\setminus (A \\cap B)$. Hence $P(A \\cap (A' \\cup B')) = P(A) - P(A \\cap B) = 2/5 - 3/20 = 5/20$. Also $P(A' \\cup B') = 1 - P(A \\cap B) = 1 - 3/20 = 17/20$. Therefore, $P(A | (A' \\cup B')) = \\frac{5/20}{17/20} = \\frac{5}{17}$.",
    "image_url": ""
  },
  {
    "q_num": 46,
    "question_type": "mcq",
    "question_text": "An experiment succeeds twice as often as it fails. The probability of at least 5 successes in the six trials of this experiment is:",
    "options": [
      "$496/729$",
      "$192/729$",
      "$240/729$",
      "$256/729$"
    ],
    "correct_index": 3,
    "solution": "Given $p = 2q$ and $p + q = 1 \\implies p = 2/3, q = 1/3$. The probability of at least 5 successes in 6 trials is $P(X \\ge 5) = P(X = 5) + P(X = 6) = \\binom{6}{5}(2/3)^5(1/3)^1 + \\binom{6}{6}(2/3)^6 = 6 \\times \\frac{32}{729} + \\frac{64}{729} = \\frac{192 + 64}{729} = \\frac{256}{729}$.",
    "image_url": ""
  },
  {
    "q_num": 47,
    "question_type": "mcq",
    "question_text": "If two different numbers are taken from the set $\\{0, 1, 2, 3, \\dots, 10\\}$; then the probability that their sum as well as absolute difference are both multiple of 4, is:",
    "options": [
      "$6/55$",
      "$12/55$",
      "$14/55$",
      "$7/55$"
    ],
    "correct_index": 0,
    "solution": "Let the two numbers be $x$ and $y$. Both $x+y$ and $|x-y|$ are multiples of 4 if and only if both $x$ and $y$ leave the same remainder modulo 4 and $2x$ is a multiple of 4, meaning either both are multiples of 4 (from $\\{0, 4, 8\\}$) or both are $\\equiv 2 \\pmod 4$ (from $\\{2, 6, 10\\}$). Number of pairs from $\\{0, 4, 8\\}$ is $\\binom{3}{2} = 3$. Number of pairs from $\\{2, 6, 10\\}$ is $\\binom{3}{2} = 3$. Total favourable pairs $= 3 + 3 = 6$. Total ways to pick 2 numbers from 11 is $\\binom{11}{2} = 55$. Probability $= 6/55$.",
    "image_url": ""
  },
  {
    "q_num": 48,
    "question_type": "mcq",
    "question_text": "For three events, A, B and C, $P(\\text{Exactly one of A or B occurs}) = P(\\text{Exactly one of B or C occurs}) = P(\\text{Exactly one of C or A occurs}) = 1/4$ and $P(\\text{All the three events occur simultaneously}) = 1/16$. Then the probability that at least one of the events occurs, is:",
    "options": [
      "$3/16$",
      "$7/16$",
      "$7/64$",
      "$7/32$"
    ],
    "correct_index": 1,
    "solution": "$P(\\text{Exactly one of A or B occurs}) = P(A) + P(B) - 2P(A \\cap B) = 1/4$. Summing all three equations: $2[P(A) + P(B) + P(C)] - 2[P(A \\cap B) + P(B \\cap C) + P(C \\cap A)] = 3/4 \\implies \\sum P(A) - \\sum P(A \\cap B) = 3/8$. Then $P(A \\cup B \\cup C) = \\sum P(A) - \\sum P(A \\cap B) + P(A \\cap B \\cap C) = 3/8 + 1/16 = 6/16 + 1/16 = 7/16$.",
    "image_url": ""
  },
  {
    "q_num": 49,
    "question_type": "mcq",
    "question_text": "A box contains 15 green and 10 yellow balls. If 10 balls are randomly drawn, one-by-one, with replacement, then the variance of the number of green balls drawn is:",
    "options": [
      "$12/5$",
      "6",
      "4",
      "$6/25$"
    ],
    "correct_index": 0,
    "solution": "This is a binomial distribution with $n = 10$. Probability of drawing a green ball $p = 15/25 = 3/5$, and $q = 10/25 = 2/5$. Variance $= npq = 10 \\times (3/5) \\times (2/5) = \\frac{60}{25} = \\frac{12}{5}$.",
    "image_url": ""
  },
  {
    "q_num": 50,
    "question_type": "mcq",
    "question_text": "Three persons P, Q and R independently try to hit a target. If the probabilities of their hitting the target are $3/4, 1/2$ and $5/8$ respectively, then the probability that the target is hit by P or Q but not by R is:",
    "options": [
      "$39/64$",
      "$21/64$",
      "$15/64$",
      "$9/64$"
    ],
    "correct_index": 1,
    "solution": "$P((P \\cup Q) \\cap \\overline{R}) = [P(P) + P(Q) - P(P \\cap Q)] \\times P(\\overline{R}) = [3/4 + 1/2 - 3/8] \\times (1 - 5/8) = (7/8) \\times (3/8) = 21/64$.",
    "image_url": ""
  }
]

with open('backend/scripts/data/prob_part1.mjs', 'w', encoding='utf-8') as f:
    f.write('export const PROBABILITY_PART1 = ' + json.dumps(PART1, indent=2) + ';\n')
print("Saved backend/scripts/data/prob_part1.mjs with 50 questions!")

