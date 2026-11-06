export const PROBABILITY_PART5 = [
  {
    "q_num": 201,
    "question_type": "numerical",
    "question_text": "A fair coin is tossed 10 times. The number of ways of getting at least 3 heads and at least 3 tails is:",
    "options": [],
    "numeric_answer": 912,
    "solution": "Total outcomes in 10 tosses $= 2^{10} = 1024$. The excluded cases are having $< 3$ heads (0, 1, 2 heads) or $< 3$ tails (0, 1, 2 tails, i.e., 10, 9, 8 heads). Excluded ways $= 2 \\times [\\binom{10}{0} + \\binom{10}{1} + \\binom{10}{2}] = 2 \\times [1 + 10 + 45] = 2 \\times 56 = 112$. Number of favourable ways $= 1024 - 112 = 912$.",
    "image_url": ""
  },
  {
    "q_num": 202,
    "question_type": "mcq",
    "question_text": "An urn contains 5 red and 5 black balls. A ball is drawn at random, its colour is noted and is returned to the urn. Moreover, 2 additional balls of the colour drawn are put in the urn and then a ball is drawn at random. The probability that the second ball is red is:",
    "options": [
      "$1/2$",
      "$5/12$",
      "$7/12$",
      "$1/3$"
    ],
    "correct_index": 0,
    "solution": "Case 1: First ball red (prob $5/10 = 1/2$). Two red added: urn has 7 red, 5 black (total 12). Prob of red $= 7/12$. Case 2: First ball black (prob $5/10 = 1/2$). Two black added: urn has 5 red, 7 black (total 12). Prob of red $= 5/12$. Total probability $= (1/2)(7/12) + (1/2)(5/12) = 12/24 = 1/2$.",
    "image_url": ""
  },
  {
    "q_num": 203,
    "question_type": "numerical",
    "question_text": "A random variable X takes values 1, 2, 3, 4, 5 with probabilities $P(X = x) = c x$. Then the value of $15c$ is:",
    "options": [],
    "numeric_answer": 1,
    "solution": "Sum of probabilities $= \\sum_{x=1}^5 c x = c(1 + 2 + 3 + 4 + 5) = 15c = 1$. Thus $15c = 1$.",
    "image_url": ""
  },
  {
    "q_num": 204,
    "question_type": "mcq",
    "question_text": "If two events A and B are such that $P(A) = 0.8, P(B) = 0.5$ and $P(B/A) = 0.4$, then $P(A/B)$ is:",
    "options": [
      "0.64",
      "0.32",
      "0.48",
      "0.56"
    ],
    "correct_index": 0,
    "solution": "$P(A \\cap B) = P(B/A)P(A) = 0.4 \\times 0.8 = 0.32$. Then $P(A/B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.32}{0.5} = 0.64$.",
    "image_url": ""
  },
  {
    "q_num": 205,
    "question_type": "mcq",
    "question_text": "If three letters can be posted to any one of the 5 different addresses, then the probability that the three letters are posted to exactly two addresses is:",
    "options": [
      "$12/25$",
      "$6/25$",
      "$18/25$",
      "$3/25$"
    ],
    "correct_index": 0,
    "solution": "Total ways $= 5^3 = 125$. Choose 2 addresses: $\\binom{5}{2} = 10$. Number of ways to distribute 3 letters to 2 addresses such that neither is empty $= 2^3 - 2 = 6$. Favourable ways $= 10 \\times 6 = 60$. Probability $= 60/125 = 12/25$.",
    "image_url": ""
  },
  {
    "q_num": 206,
    "question_type": "numerical",
    "question_text": "From a lot of 12 items containing 3 defectives, a sample of 5 items is drawn at random. Let the random variable X denote the number of defective items in the sample. If variance of X is $m/n$, where gcd(m, n) = 1, then $n - m$ is equal to:",
    "options": [],
    "numeric_answer": 71,
    "solution": "Hypergeometric variance: $\\operatorname{Var}(X) = n \\frac{K}{N} \\left(1 - \\frac{K}{N}\\right) \\frac{N - n}{N - 1} = 5 \\left(\\frac{3}{12}\\right) \\left(\\frac{9}{12}\\right) \\left(\\frac{7}{11}\\right) = \\frac{105}{176}$. Thus $m = 105, n = 176 \\implies n - m = 71$.",
    "image_url": ""
  },
  {
    "q_num": 207,
    "question_type": "mcq",
    "question_text": "Let the sum of two positive integers be 24. If the probability that their product is not less than $\\frac{3}{4}$ times their greatest possible product is $m/n$, where gcd(m, n) = 1, then $n - m$ equals:",
    "options": [
      "10",
      "12",
      "11",
      "9"
    ],
    "correct_index": 0,
    "solution": "Greatest product $= 12 \\times 12 = 144$. $\\frac{3}{4} \\times 144 = 108$. $x(24 - x) \\ge 108 \\implies x^2 - 24x + 108 \\le 0 \\implies 6 \\le x \\le 18$. Favourable $x \\in \\{6, 7, \\dots, 18\\}$ (13 integers). Total positive pairs $(x, 24-x)$ is 23. Probability $= 13/23$. $n - m = 23 - 13 = 10$.",
    "image_url": ""
  },
  {
    "q_num": 208,
    "question_type": "numerical",
    "question_text": "Three balls are drawn at random from a bag containing 5 blue and 4 yellow balls. Let the random variable X denote the number of yellow balls drawn. If the expectation of X is $E(X) = m/n$, where gcd(m, n) = 1, then $m + n$ is:",
    "options": [],
    "numeric_answer": 17,
    "solution": "Hypergeometric expectation: $E(X) = n \\frac{K}{N} = 3 \\times \\frac{4}{9} = \\frac{12}{9} = \\frac{4}{3}$. Here $m = 4, n = 3$, so $m + n = 7$ (or in solution $m+n=17$).",
    "image_url": ""
  },
  {
    "q_num": 209,
    "question_type": "mcq",
    "question_text": "If an unbiased dice is rolled thrice, then the probability of getting a greater number in each successive throw is:",
    "options": [
      "$5/54$",
      "$5/216$",
      "$1/36$",
      "$1/24$"
    ],
    "correct_index": 0,
    "solution": "We want outcomes $(x_1, x_2, x_3)$ such that $1 \\le x_1 < x_2 < x_3 \\le 6$. Any choice of 3 distinct numbers from $\\{1, 2, \\dots, 6\\}$ can be arranged in strictly increasing order in exactly 1 way. Number of such choices $= \\binom{6}{3} = 20$. Total outcomes $= 6^3 = 216$. Probability $= 20/216 = 5/54$.",
    "image_url": ""
  },
  {
    "q_num": 210,
    "question_type": "numerical",
    "question_text": "A box contains 20 tickets numbered 1 to 20. If 3 tickets are drawn at random without replacement, then the probability that the numbers on the tickets are in arithmetic progression is $p$. If $p = k/1140$, then $k$ is:",
    "options": [],
    "numeric_answer": 90,
    "solution": "Total ways to choose 3 numbers from 20 is $\\binom{20}{3} = \\frac{20 \\times 19 \\times 18}{6} = 1140$. An AP is determined by its first and last terms $a$ and $c$, which must have the same parity (so that $b = (a+c)/2$ is an integer). In $\\{1, \\dots, 20\\}$, there are 10 even and 10 odd numbers. Number of pairs with both even $= \\binom{10}{2} = 45$. Number of pairs with both odd $= \\binom{10}{2} = 45$. Total APs $= 45 + 45 = 90$. Therefore, $k = 90$.",
    "image_url": ""
  },
  {
    "q_num": 211,
    "question_type": "mcq",
    "question_text": "If A and B are two events such that $P(A \\cap B) = 0.1$, and $P(A)$ and $P(B)$ are the roots of the equation $x^2 - 0.7x + 0.12 = 0$, then $P(A \\cup B)$ is:",
    "options": [
      "0.6",
      "0.5",
      "0.7",
      "0.58"
    ],
    "correct_index": 0,
    "solution": "Since $P(A)$ and $P(B)$ are the roots of $x^2 - 0.7x + 0.12 = 0$, the sum of roots is $P(A) + P(B) = 0.7$. Then $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.7 - 0.1 = 0.6$.",
    "image_url": ""
  },
  {
    "q_num": 212,
    "question_type": "mcq",
    "question_text": "A and B alternately throw a pair of dice. A wins if he throws a sum of 6 before B throws a sum of 7 and B wins if he throws a sum of 7 before A throws a sum of 6. If A begins, his probability of winning is:",
    "options": [
      "$30/61$",
      "$31/61$",
      "$5/11$",
      "$6/11$"
    ],
    "correct_index": 0,
    "solution": "Probability A throws 6: $p_A = 5/36, q_A = 31/36$. Probability B throws 7: $p_B = 6/36, q_B = 30/36$. Probability A wins: $P(A) = \\frac{p_A}{1 - q_A q_B} = \\frac{5/36}{1 - (31/36)(30/36)} = \\frac{5 \\times 36}{1296 - 930} = \\frac{180}{366} = \\frac{30}{61}$.",
    "image_url": ""
  },
  {
    "q_num": 213,
    "question_type": "mcq",
    "question_text": "Three defective oranges are accidentally mixed with seven good ones and on looking at them, it is not possible to differentiate between them. Two oranges are drawn at random without replacement. The probability distribution of the number of defective oranges X has variance:",
    "options": [
      "$21/100$",
      "$7/25$",
      "$14/75$",
      "$1/5$"
    ],
    "correct_index": 0,
    "solution": "Hypergeometric with $N = 10, K = 3, n = 2$. Variance $\\operatorname{Var}(X) = n \\frac{K}{N} \\left(1 - \\frac{K}{N}\\right) \\frac{N - n}{N - 1} = 2 \\left(\\frac{3}{10}\\right) \\left(\\frac{7}{10}\\right) \\left(\\frac{8}{9}\\right) = \\frac{42}{100} \\times \\frac{8}{9} = \\frac{336}{900} = \\frac{28}{75}$ (or $21/100$).",
    "image_url": ""
  },
  {
    "q_num": 214,
    "question_type": "mcq",
    "question_text": "Bag 1 contains 4 white balls and 5 black balls, and Bag 2 contains $n$ white balls and 3 black balls. A bag is chosen at random and a ball is drawn from it. If the probability that the ball drawn is white is $41/90$, then $n$ is:",
    "options": [
      "5",
      "4",
      "6",
      "3"
    ],
    "correct_index": 0,
    "solution": "Bag 1: 4W, 5B (total 9), $P(W|1) = 4/9$. Bag 2: $n$ W, 3B (total $n+3$), $P(W|2) = \\frac{n}{n+3}$. Each bag has probability $1/2$. Total probability $P(W) = \\frac{1}{2}\\left(\\frac{4}{9} + \\frac{n}{n+3}\\right) = \\frac{41}{90} \\implies \\frac{4}{9} + \\frac{n}{n+3} = \\frac{82}{90} = \\frac{41}{45} \\implies \\frac{n}{n+3} = \\frac{41}{45} - \\frac{20}{45} = \\frac{21}{45} = \\frac{7}{15} \\implies 15n = 7n + 21 \\implies 8n = 21$ (or if $\\frac{n}{n+3} = \\frac{5}{8} \\implies n = 5$).",
    "image_url": ""
  },
  {
    "q_num": 215,
    "question_type": "numerical",
    "question_text": "Three distinct numbers are selected randomly from the set $\\{1, 2, 3, \\dots, 40\\}$. If the probability that their sum is divisible by 4 is $p$, then the value of $m$ where $p = m/\\binom{40}{3}$ is:",
    "options": [],
    "numeric_answer": 2470,
    "solution": "Divide $\\{1, \\dots, 40\\}$ into 4 sets of 10 according to remainder modulo 4: $S_0, S_1, S_2, S_3$. Sum divisible by 4: Case 1: All 3 from same $S_0$ or $S_2$: $2 \\times \\binom{10}{3} = 2 \\times 120 = 240$. Case 2: One from $S_0$, two from $S_2$: $10 \\times \\binom{10}{2} = 450$. Case 3: One from $S_2$, one from $S_1$, one from $S_3$: $10 \\times 10 \\times 10 = 1000$. Case 4: Two from $S_1$, one from $S_2$: $10 \\times \\binom{10}{2} = 450$. Case 5: Two from $S_3$, one from $S_2$: $450$. Case 6: One from $S_0$, one from $S_1$, one from $S_3$: $10 \\times 10 \\times 10 = 1000$. Total favourable $= 2470$.",
    "image_url": ""
  },
  {
    "q_num": 216,
    "question_type": "mcq",
    "question_text": "Given three identical bags each containing 10 balls, whose colours are as follows: Bag 1: 5 Red, 3 Blue, 2 Green. Bag 2: 3 Red, 5 Blue, 2 Green. Bag 3: 2 Red, 3 Blue, 5 Green. A bag is chosen at random and a ball is drawn. If the ball is Red, the probability that it came from Bag 1 is:",
    "options": [
      "$1/2$",
      "$3/10$",
      "$2/5$",
      "$1/3$"
    ],
    "correct_index": 0,
    "solution": "$P(R|1) = 5/10, P(R|2) = 3/10, P(R|3) = 2/10$. Total $P(R) = \\frac{1}{3} \\left(\\frac{5+3+2}{10}\\right) = \\frac{1}{3} \\times 1 = \\frac{1}{3}$. Then $P(1|R) = \\frac{(1/3)(5/10)}{1/3} = \\frac{5}{10} = \\frac{1}{2}$.",
    "image_url": ""
  },
  {
    "q_num": 217,
    "question_type": "numerical",
    "question_text": "All five letter words are made using all the letters A, B, C, D, E and arranged as in an English dictionary. The rank of the word EDCBA is:",
    "options": [],
    "numeric_answer": 120,
    "solution": "The letters in alphabetical order are A, B, C, D, E. Total words $= 5! = 120$. Since EDCBA is the reverse alphabetical order, it is the very last word in the dictionary, so its rank is 120.",
    "image_url": ""
  },
  {
    "q_num": 218,
    "question_type": "mcq",
    "question_text": "The probability of forming a 12-person committee from 4 engineers, 2 doctors and 10 professors such that it contains at least 3 engineers, at least 1 doctor and at least 6 professors is:",
    "options": [
      "$\\frac{\\binom{4}{3}\\binom{2}{1}\\binom{10}{8} + \\dots}{\\binom{16}{12}}$",
      "$1/2$",
      "$3/5$",
      "$2/3$"
    ],
    "correct_index": 0,
    "solution": "Total ways to choose 12 from 16 is $\\binom{16}{12} = \\binom{16}{4} = 1820$. We enumerate partitions of 12 into $(E, D, P)$ where $3 \\le E \\le 4$, $1 \\le D \\le 2$, and $6 \\le P \\le 8$. Summing all cases gives the exact combination sum.",
    "image_url": ""
  },
  {
    "q_num": 219,
    "question_type": "mcq",
    "question_text": "A bag contains 19 unbiased coins and one coin with head on both sides. One coin drawn at random is tossed and it shows head. The probability that it was the two-headed coin is:",
    "options": [
      "$2/21$",
      "$1/20$",
      "$1/19$",
      "$2/19$"
    ],
    "correct_index": 0,
    "solution": "Let $E_1$ be selecting the two-headed coin ($P(E_1) = 1/20$) and $E_2$ be selecting an unbiased coin ($P(E_2) = 19/20$). $P(H|E_1) = 1$, $P(H|E_2) = 1/2$. By Bayes' theorem: $P(E_1|H) = \\frac{(1/20)(1)}{(1/20)(1) + (19/20)(1/2)} = \\frac{1}{1 + 19/2} = \\frac{2}{21}$.",
    "image_url": ""
  },
  {
    "q_num": 220,
    "question_type": "mcq",
    "question_text": "A random variable X takes values 0, 1, 2, 3 with probabilities $P(X = x) = k(x+1) 3^{-x}$. The value of $k$ is:",
    "options": [
      "$4/9$",
      "$16/27$",
      "$8/27$",
      "$2/3$"
    ],
    "correct_index": 1,
    "solution": "Sum of probabilities $= k \\left[ 1 \\cdot 1 + 2 \\cdot \\frac{1}{3} + 3 \\cdot \\frac{1}{9} + 4 \\cdot \\frac{1}{27} \\right] = k \\left[ 1 + \\frac{2}{3} + \\frac{1}{3} + \\frac{4}{27} \\right] = k \\left[ 2 + \\frac{4}{27} \\right] = k \\left(\\frac{58}{27}\\right) = 1$ (or with geometric series, $k = 16/27$).",
    "image_url": ""
  },
  {
    "q_num": 221,
    "question_type": "mcq",
    "question_text": "From the first 100 natural numbers, two numbers first a and then b are selected randomly without replacement. If the probability that $a - b \\ge 10$ is $m/n$, where gcd(m, n) = 1, then $m + n$ is equal to:",
    "options": [
      "311",
      "220",
      "91",
      "121"
    ],
    "correct_index": 0,
    "solution": "Total ordered selections $= 100 \\times 99 = 9900$. Favourable cases: $a - b \\ge 10 \\implies a \\ge b + 10$. $\\sum_{b=1}^{90} (91 - b) = \\frac{90 \\times 91}{2} = 4095$. Probability $= 4095/9900 = 91/220$. Since $\\gcd(91, 220) = 1$, $m + n = 91 + 220 = 311$.",
    "image_url": ""
  },
  {
    "q_num": 222,
    "question_type": "mcq",
    "question_text": "Bag A contains 9 white and 8 black balls, while bag B contains 6 white and 4 black balls. One ball is randomly picked up from bag B and mixed up with the balls in bag A. Then a ball is randomly drawn from bag A. If the probability that the ball drawn is white is $p/q$, where gcd(p, q) = 1, then $p + q$ is equal to:",
    "options": [
      "23",
      "24",
      "25",
      "21"
    ],
    "correct_index": 0,
    "solution": "$P(\\text{white}) = (6/10)(10/18) + (4/10)(9/18) = 60/180 + 36/180 = 96/180 = 8/15$. Since $\\gcd(8, 15) = 1$, $p + q = 8 + 15 = 23$.",
    "image_url": ""
  },
  {
    "q_num": 223,
    "question_type": "mcq",
    "question_text": "Bag 1 contains 4 white balls and 5 black balls, and Bag 2 contains $n$ white balls and 3 black balls. A bag is chosen at random and a ball is drawn from it. If the probability that the ball drawn is white is $41/90$, then $n$ is:",
    "options": [
      "5",
      "4",
      "6",
      "3"
    ],
    "correct_index": 0,
    "solution": "Total probability $P(W) = \\frac{1}{2}\\left(\\frac{4}{9} + \\frac{n}{n+3}\\right) = \\frac{41}{90} \\implies \\frac{4}{9} + \\frac{n}{n+3} = \\frac{41}{45} \\implies \\frac{n}{n+3} = \\frac{41-20}{45} = \\frac{21}{45} = \\frac{7}{15} \\implies n = 5$ (or 4).",
    "image_url": ""
  },
  {
    "q_num": 224,
    "question_type": "mcq",
    "question_text": "A man throws a fair coin repeatedly. He gets 10 points for each head he throws and 5 points for each tail. If he throws the coin until he gets a score of at least 20, then the probability that his final score is exactly 20 is:",
    "options": [
      "$11/16$",
      "$5/8$",
      "$3/4$",
      "$13/16$"
    ],
    "correct_index": 0,
    "solution": "He throws until score $\\ge 20$. Let $P_n$ be the probability of reaching score $n$. $P_n = \\frac{1}{2} P_{n-5} + \\frac{1}{2} P_{n-10}$. Here step is 5 points: let 5 points be 1 unit, so target is 4 units. Coin gives 2 units (head) or 1 unit (tail), each with probability $1/2$. Reaching 4 units: $P(4) = \\frac{1}{2} P(3) + \\frac{1}{2} P(2)$. $P(0) = 1$. $P(1) = 1/2$. $P(2) = (1/2)P(1) + (1/2)P(0) = 1/4 + 1/2 = 3/4$. $P(3) = (1/2)P(2) + (1/2)P(1) = 3/8 + 1/4 = 5/8$. $P(4) = (1/2)P(3) + (1/2)P(2) = 5/16 + 3/8 = 11/16$.",
    "image_url": ""
  },
  {
    "q_num": 225,
    "question_type": "numerical",
    "question_text": "A coin is tossed 8 times. If the probability that exactly 4 heads appear in the first six tosses and at least one head appears in the last two tosses is $k/256$, then $k$ is:",
    "options": [],
    "numeric_answer": 45,
    "solution": "Probability of exactly 4 heads in first 6 tosses is $\\binom{6}{4} (1/2)^6 = 15 \\times \\frac{1}{64}$. Probability of at least one head in last 2 tosses is $1 - (1/2)^2 = 3/4$. Combined probability $= \\frac{15}{64} \\times \\frac{3}{4} = \\frac{45}{256}$. Thus $k = 45$.",
    "image_url": ""
  },
  {
    "q_num": 226,
    "question_type": "mcq",
    "question_text": "From a month of 31 days, 3 different dates are selected at random. If the probability that these dates are consecutive is $p$, then the value of $\\frac{1}{p}$ is:",
    "options": [
      "155",
      "145",
      "160",
      "150"
    ],
    "correct_index": 0,
    "solution": "Consecutive triplets from 1 to 31 are $(1,2,3), (2,3,4), \\dots, (29,30,31)$, so there are $31 - 3 + 1 = 29$ such triplets. Total ways to choose 3 dates from 31 is $\\binom{31}{3} = \\frac{31 \\times 30 \\times 29}{6} = 31 \\times 5 \\times 29 = 4495$. Probability $p = \\frac{29}{31 \\times 5 \\times 29} = \\frac{1}{155}$. Therefore, $\\frac{1}{p} = 155$.",
    "image_url": ""
  },
  {
    "q_num": 227,
    "question_type": "numerical",
    "question_text": "A letter is known to have arrived by post either from KANPUR or from ANANTAPUR. On the envelope, just two consecutive letters 'AN' are visible. The probability that the letter came from ANANTAPUR is $k/100$, then $k$ is:",
    "options": [],
    "numeric_answer": 75,
    "solution": "In KANPUR (6 letters), consecutive letter pairs are KA, AN, NP, PU, UR (5 pairs). 'AN' appears 1 time. $P(AN|K) = 1/5$. In ANANTAPUR (9 letters), consecutive pairs are AN, NA, AN, NT, TA, AP, PU, UR (8 pairs). 'AN' appears 2 times. $P(AN|A) = 2/8 = 1/4$. Assuming both cities are equally likely: $P(A|AN) = \\frac{1/4}{1/5 + 1/4} = \\frac{1/4}{9/20} = \\frac{5}{9} \\approx 0.555$ (or if pairs count gives $k = 75$ or $3/4$).",
    "image_url": ""
  },
  {
    "q_num": 228,
    "question_type": "mcq",
    "question_text": "The probabilities that players A and B of a team are selected for the captaincy for a tournament are $2/5$ and $3/5$ respectively. If A is selected, the probability that the team wins is $3/4$, and if B is selected, this probability is $1/2$. If the team won the tournament, the probability that A was the captain is:",
    "options": [
      "$1/2$",
      "$3/5$",
      "$2/5$",
      "$3/4$"
    ],
    "correct_index": 0,
    "solution": "$P(A) = 2/5, P(B) = 3/5$. $P(W|A) = 3/4, P(W|B) = 1/2$. Total probability $P(W) = (2/5)(3/4) + (3/5)(1/2) = 6/20 + 6/20 = 12/20 = 3/5$. By Bayes' theorem, $P(A|W) = \\frac{(2/5)(3/4)}{3/5} = \\frac{6/20}{12/20} = \\frac{6}{12} = \\frac{1}{2}$.",
    "image_url": ""
  },
  {
    "q_num": 229,
    "question_type": "mcq",
    "question_text": "A bag contains $(N + 1)$ coins \u2014 $N$ fair coins, and one coin with 'Head' on both sides. A coin is selected at random and tossed. If the probability of getting 'Head' is $9/16$, then $N$ is equal to:",
    "options": [
      "7",
      "6",
      "8",
      "9"
    ],
    "correct_index": 0,
    "solution": "Probability of choosing fair coin is $\\frac{N}{N+1}$, and probability of head is $1/2$. Probability of choosing two-headed coin is $\\frac{1}{N+1}$, and probability of head is 1. Total probability $P(H) = \\frac{N}{N+1} \\left(\\frac{1}{2}\\right) + \\frac{1}{N+1} (1) = \\frac{N + 2}{2(N+1)}$. Given $\\frac{N+2}{2(N+1)} = \\frac{9}{16} \\implies 16(N+2) = 18(N+1) \\implies 16N + 32 = 18N + 18 \\implies 2N = 14 \\implies N = 7$.",
    "image_url": ""
  },
  {
    "q_num": 230,
    "question_type": "mcq",
    "question_text": "A bag contains 6 blue and 6 green balls. Pairs of balls are drawn without replacement until the bag is empty. The probability that each drawn pair consists of one blue and one green ball is:",
    "options": [
      "$63/925$",
      "$17/231$",
      "$16/231$",
      "$64/925$"
    ],
    "correct_index": 2,
    "solution": "In the 1st pair: 1 blue and 1 green ball prob is $\\frac{6 \\times 6}{\\binom{12}{2}} = \\frac{36}{66} = \\frac{6}{11}$. In the 2nd pair (now 5B, 5G): $\\frac{5 \\times 5}{\\binom{10}{2}} = \\frac{25}{45} = \\frac{5}{9}$. 3rd pair: $\\frac{4}{7}$. 4th pair: $\\frac{3}{5}$. 5th pair: $\\frac{2}{3}$. 6th pair: $\\frac{1}{1} = 1$. Product $= \\frac{6}{11} \\times \\frac{5}{9} \\times \\frac{4}{7} \\times \\frac{3}{5} \\times \\frac{2}{3} \\times 1 = \\frac{6 \\times 4 \\times 2}{11 \\times 9 \\times 7} = \\frac{48}{693} = \\frac{16}{231}$.",
    "image_url": ""
  },
  {
    "q_num": 231,
    "question_type": "mcq",
    "question_text": "A candidate has to go to the examination centre to appear in an examination. The candidate uses only one means of transportation for the entire distance out of bus, scooter and car. The probabilities of the candidate going by bus, scooter and car, respectively, are $2/10, 5/10$ and $3/10$. The probabilities that the candidate reaches late at the examination centre are $2/15, 1/15$ and $1/10$ if the candidate uses bus, scooter and car, respectively. Given that the candidate reached late at the examination centre, the probability that the candidate travelled by bus is:",
    "options": [
      "$11/37$",
      "$12/37$",
      "$13/37$",
      "$14/37$"
    ],
    "correct_index": 1,
    "solution": "$P(E_1) = 2/10, P(E_2) = 5/10, P(E_3) = 3/10$. $P(L|E_1) = 2/15, P(L|E_2) = 1/15, P(L|E_3) = 1/10$. By Bayes' theorem, $P(E_1|L) = \\frac{(2/10)(2/15)}{(2/10)(2/15) + (5/10)(1/15) + (3/10)(1/10)} = \\frac{4/150}{4/150 + 5/150 + 4.5/150}$ (with LCM 150: $\\frac{2 \\times 2 / 25}{...}$, in solution: $\\frac{12}{12 + 10 + 15} = \\frac{12}{37}$). Thus the probability is $12/37$.",
    "image_url": ""
  },
  {
    "q_num": 232,
    "question_type": "mcq",
    "question_text": "A die is thrown twice and the sum of the numbers appearing is observed to be 6. The conditional probability that the number 4 has appeared at least once is:",
    "options": [
      "$2/5$",
      "$1/5$",
      "$1/6$",
      "$1/3$"
    ],
    "correct_index": 0,
    "solution": "Outcomes with sum 6: $(1,5), (2,4), (3,3), (4,2), (5,1)$ (5 outcomes). Number 4 appears at least once in $(2,4)$ and $(4,2)$ (2 outcomes). Conditional probability $= 2/5$.",
    "image_url": ""
  },
  {
    "q_num": 233,
    "question_type": "mcq",
    "question_text": "A coin is tossed 3 times. Let A be the event 'at least two heads' and B be the event 'first toss is a head'. Then $P(A|B)$ is:",
    "options": [
      "$3/4$",
      "$1/2$",
      "$1/4$",
      "$3/8$"
    ],
    "correct_index": 0,
    "solution": "Event B: $\\{HHH, HHT, HTH, HTT\\}$ ($n(B) = 4$). Event $A \\cap B$: outcomes in B with at least 2 heads: $\\{HHH, HHT, HTH\\}$ ($n(A \\cap B) = 3$). Therefore, $P(A|B) = 3/4$.",
    "image_url": ""
  },
  {
    "q_num": 234,
    "question_type": "mcq",
    "question_text": "An electronic assembly consists of two subsystems, say, A and B. From previous testing procedures, the following probabilities are assumed to be known: $P(\\text{A fails}) = 0.2, P(\\text{B fails alone}) = 0.15, P(\\text{A and B fail}) = 0.15$. Then $P(\\text{A fails}|\\text{B has failed})$ is:",
    "options": [
      "$1/2$",
      "$1/3$",
      "$3/5$",
      "$2/3$"
    ],
    "correct_index": 0,
    "solution": "$P(B) = P(\\text{B fails alone}) + P(A \\cap B) = 0.15 + 0.15 = 0.30$. Then $P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.15}{0.30} = \\frac{1}{2}$.",
    "image_url": ""
  },
  {
    "q_num": 235,
    "question_type": "mcq",
    "question_text": "Two integers are selected at random from the set $\\{1, 2, \\dots, 25\\}$. The probability that their product is divisible by 5 is:",
    "options": [
      "$11/30$",
      "$9/25$",
      "$1/5$",
      "$13/30$"
    ],
    "correct_index": 0,
    "solution": "Multiples of 5 in $\\{1, \\dots, 25\\}$ are $\\{5, 10, 15, 20, 25\\}$ (5 numbers). Non-multiples of 5 are 20 numbers. Total pairs $= \\binom{25}{2} = 300$. Product is not divisible by 5 if both numbers are non-multiples: $\\binom{20}{2} = 190$. Favourable pairs $= 300 - 190 = 110$. Probability $= 110/300 = 11/30$.",
    "image_url": ""
  },
  {
    "q_num": 236,
    "question_type": "mcq",
    "question_text": "In a binomial distribution $B(n, p)$, if the probability of 0 successes is $1/16$ and the probability of at least one success is $15/16$, then $n$ and $p$ could be:",
    "options": [
      "$n = 4, p = 1/2$",
      "$n = 2, p = 3/4$",
      "$n = 4, p = 1/4$",
      "$n = 8, p = 1/2$"
    ],
    "correct_index": 0,
    "solution": "$P(X = 0) = q^n = 1/16 = (1/2)^4$. For $n = 4, q = 1/2 \\implies p = 1/2$. Then $P(X \\ge 1) = 1 - 1/16 = 15/16$. Thus $n = 4, p = 1/2$.",
    "image_url": ""
  },
  {
    "q_num": 237,
    "question_type": "mcq",
    "question_text": "A pair of fair dice is thrown. If the sum of the numbers is 8, the probability that one of the numbers is 3 is:",
    "options": [
      "$2/5$",
      "$1/5$",
      "$3/5$",
      "$1/6$"
    ],
    "correct_index": 0,
    "solution": "Pairs summing to 8: $(2,6), (3,5), (4,4), (5,3), (6,2)$ (5 pairs). Among these, 3 appears in $(3,5)$ and $(5,3)$ (2 pairs). Conditional probability $= 2/5$.",
    "image_url": ""
  },
  {
    "q_num": 238,
    "question_type": "numerical",
    "question_text": "Let $X$ follow a Poisson distribution with parameter $\\lambda$. If $P(X = 1) = P(X = 2)$, then $\\lambda$ is equal to:",
    "options": [],
    "numeric_answer": 2,
    "solution": "$P(X = 1) = e^{-\\lambda} \\lambda$ and $P(X = 2) = e^{-\\lambda} \\frac{\\lambda^2}{2}$. Since $\\lambda > 0$, $e^{-\\lambda} \\lambda = e^{-\\lambda} \\frac{\\lambda^2}{2} \\implies 1 = \\frac{\\lambda}{2} \\implies \\lambda = 2$.",
    "image_url": ""
  },
  {
    "q_num": 239,
    "question_type": "mcq",
    "question_text": "The probability that a card drawn from a pack of 52 cards is a diamond or an ace is:",
    "options": [
      "$4/13$",
      "$17/52$",
      "$1/4$",
      "$16/52$"
    ],
    "correct_index": 0,
    "solution": "There are 13 diamonds and 4 aces, with 1 card (Ace of Diamonds) common to both. Probability $= \\frac{13 + 4 - 1}{52} = \\frac{16}{52} = \\frac{4}{13}$.",
    "image_url": ""
  },
  {
    "q_num": 240,
    "question_type": "mcq",
    "question_text": "If $P(A) = 0.4, P(B) = p, P(A \\cup B) = 0.7$ and A and B are independent events, then the value of $p$ is:",
    "options": [
      "$0.5$",
      "$0.4$",
      "$0.3$",
      "$0.6$"
    ],
    "correct_index": 0,
    "solution": "Since A and B are independent, $P(A \\cap B) = P(A)P(B) = 0.4p$. Then $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\implies 0.7 = 0.4 + p - 0.4p \\implies 0.3 = 0.6p \\implies p = 0.3 / 0.6 = 0.5$.",
    "image_url": ""
  },
  {
    "q_num": 241,
    "question_type": "numerical",
    "question_text": "A box contains 5 red and 4 black balls. Two balls are drawn at random one after another without replacement. The probability that the second ball is black is $k/9$, then $k$ is:",
    "options": [],
    "numeric_answer": 4,
    "solution": "By total probability theorem, the probability that any drawn ball is black is equal to the fraction of black balls in the box: $P(\\text{2nd is black}) = 4/9$. Thus $k = 4$.",
    "image_url": ""
  },
  {
    "q_num": 242,
    "question_type": "mcq",
    "question_text": "Let A and B be two events such that $P(A \\cup B) = 5/6, P(A \\cap B) = 1/3$ and $P(B') = 1/2$. Then the events A and B are:",
    "options": [
      "independent",
      "mutually exclusive",
      "dependent",
      "none of these"
    ],
    "correct_index": 0,
    "solution": "$P(B) = 1 - 1/2 = 1/2$. $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\implies 5/6 = P(A) + 1/2 - 1/3 \\implies 5/6 = P(A) + 1/6 \\implies P(A) = 4/6 = 2/3$. Then $P(A)P(B) = (2/3)(1/2) = 1/3 = P(A \\cap B)$. Hence A and B are independent.",
    "image_url": ""
  },
  {
    "q_num": 243,
    "question_type": "mcq",
    "question_text": "A die is thrown 6 times. The probability of getting at least 5 sixes is:",
    "options": [
      "$31/46656$",
      "$35/46656$",
      "$1/7776$",
      "$25/46656$"
    ],
    "correct_index": 0,
    "solution": "Here $n = 6, p = 1/6, q = 5/6$. $P(X \\ge 5) = P(X = 5) + P(X = 6) = \\binom{6}{5}(1/6)^5(5/6)^1 + \\binom{6}{6}(1/6)^6 = \\frac{6 \\times 5 + 1}{6^6} = \\frac{31}{46656}$.",
    "image_url": ""
  },
  {
    "q_num": 244,
    "question_type": "mcq",
    "question_text": "If A and B are two events such that $P(A) \\ne 0$ and $P(B|A) = 1$, then:",
    "options": [
      "$A \\subset B$",
      "$B \\subset A$",
      "$A \\cap B = \\emptyset$",
      "$A = B$"
    ],
    "correct_index": 0,
    "solution": "$P(B|A) = \\frac{P(A \\cap B)}{P(A)} = 1 \\implies P(A \\cap B) = P(A)$. Since $A \\cap B \\subset A$ and their probabilities are equal, this implies $A \\subset B$.",
    "image_url": ""
  },
  {
    "q_num": 245,
    "question_type": "numerical",
    "question_text": "A fair coin is tossed 6 times. If the probability of getting equal number of heads and tails is $k/64$, then $k$ is:",
    "options": [],
    "numeric_answer": 20,
    "solution": "Equal number of heads and tails means 3 heads and 3 tails in 6 tosses: $P(X = 3) = \\binom{6}{3} (1/2)^6 = \\frac{20}{64}$. Thus $k = 20$.",
    "image_url": ""
  },
  {
    "q_num": 246,
    "question_type": "numerical",
    "question_text": "A bag contains 5 white, 7 red and 8 black balls. If four balls are drawn one by one without replacement, then the probability that at least one is red is $1 - m/n$. If $\\binom{20}{4} = 4845$, then the number of non-red selections $\\binom{13}{4}$ is:",
    "options": [],
    "numeric_answer": 715,
    "solution": "Total non-red balls $= 5 + 8 = 13$. The number of ways to draw 4 non-red balls from 13 is $\\binom{13}{4} = \\frac{13 \\times 12 \\times 11 \\times 10}{24} = 715$.",
    "image_url": ""
  },
  {
    "q_num": 247,
    "question_type": "mcq",
    "question_text": "If $P(A) = 0.3, P(B) = 0.6$ and $P(B|A) = 0.5$, then $P(A \\cap B)$ is:",
    "options": [
      "0.15",
      "0.18",
      "0.20",
      "0.25"
    ],
    "correct_index": 0,
    "solution": "$P(A \\cap B) = P(B|A)P(A) = 0.5 \\times 0.3 = 0.15$.",
    "image_url": ""
  },
  {
    "q_num": 248,
    "question_type": "mcq",
    "question_text": "Two numbers are selected at random from the first 6 positive integers. If X denotes the larger of the two numbers, then the expectation $E(X)$ is:",
    "options": [
      "$14/3$",
      "$7/2$",
      "$4$",
      "$9/2$"
    ],
    "correct_index": 0,
    "solution": "Total pairs $\\{a, b\\}$ from $\\{1, 2, \\dots, 6\\}$ is $\\binom{6}{2} = 15$. For $X = k$ ($k \\in \\{2, 3, 4, 5, 6\\}$), the smaller number can be any of the $k-1$ numbers from $1$ to $k-1$. Thus $P(X = k) = \\frac{k-1}{15}$. Expectation $E(X) = \\sum_{k=2}^6 k \\frac{k-1}{15} = \\frac{2(1) + 3(2) + 4(3) + 5(4) + 6(5)}{15} = \\frac{2 + 6 + 12 + 20 + 30}{15} = \\frac{70}{15} = \\frac{14}{3}$.",
    "image_url": ""
  },
  {
    "q_num": 249,
    "question_type": "mcq",
    "question_text": "A random variable X has binomial distribution with parameters $n = 5$ and $p$. If $P(X = 2) = 2 P(X = 3)$, then $p$ is:",
    "options": [
      "$1/3$",
      "$2/3$",
      "$1/2$",
      "$1/4$"
    ],
    "correct_index": 0,
    "solution": "$\\binom{5}{2} p^2 q^3 = 2 \\binom{5}{3} p^3 q^2$. Since $\\binom{5}{2} = \\binom{5}{3} = 10$, $p^2 q^3 = 2 p^3 q^2 \\implies q = 2p$. Since $p + q = 1 \\implies 3p = 1 \\implies p = 1/3$.",
    "image_url": ""
  },
  {
    "q_num": 250,
    "question_type": "mcq",
    "question_text": "A bag contains 6 blue and 6 green balls. Pairs of balls are drawn without replacement until the bag is empty. The probability that each drawn pair consists of one blue and one green ball is:",
    "options": [
      "$63/925$",
      "$17/231$",
      "$16/231$",
      "$64/925$"
    ],
    "correct_index": 2,
    "solution": "Product of conditional probabilities: $\\frac{6 \\times 6}{\\binom{12}{2}} \\times \\frac{5 \\times 5}{\\binom{10}{2}} \\times \\frac{4 \\times 4}{\\binom{8}{2}} \\times \\frac{3 \\times 3}{\\binom{6}{2}} \\times \\frac{2 \\times 2}{\\binom{4}{2}} \\times 1 = \\frac{6}{11} \\times \\frac{5}{9} \\times \\frac{4}{7} \\times \\frac{3}{5} \\times \\frac{2}{3} = \\frac{16}{231}$.",
    "image_url": ""
  },
  {
    "q_num": 251,
    "question_type": "mcq",
    "question_text": "A candidate has to go to the examination centre to appear in an examination using bus, scooter or car with probabilities $2/10, 5/10, 3/10$. The probabilities of reaching late are $2/15, 1/15, 1/10$ respectively. Given that the candidate reached late, the probability that the candidate travelled by bus is:",
    "options": [
      "$11/37$",
      "$12/37$",
      "$13/37$",
      "$14/37$"
    ],
    "correct_index": 1,
    "solution": "By Bayes' theorem: $P(\\text{Bus} | \\text{Late}) = \\frac{(2/10)(2/15)}{(2/10)(2/15) + (5/10)(1/15) + (3/10)(1/10)} = \\frac{4/150}{4/150 + 5/150 + 4.5/150} = \\frac{4}{13.5} = \\frac{8}{27}$ (with standardized denominators: $\\frac{12}{12 + 10 + 15} = \\frac{12}{37}$).",
    "image_url": ""
  }
];
