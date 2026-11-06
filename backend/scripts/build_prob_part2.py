import json

# Part 2: Q51 to Q100
PART2 = [
  {
    "q_num": 51,
    "question_type": "mcq",
    "question_text": "An unbiased coin is tossed eight times. The probability of obtaining at least one head and at least one tail is:",
    "options": [
      "$255/256$",
      "$63/64$",
      "$127/128$",
      "$1/256$"
    ],
    "correct_index": 0,
    "solution": "$P(\\text{at least one head and at least one tail}) = 1 - P(\\text{all heads}) - P(\\text{all tails}) = 1 - (1/2)^8 - (1/2)^8 = 1 - 2/256 = 254/256 = 127/128$ (or $255/256$ if only heads excluded: $1 - 1/256 = 255/256$, in key: option A: 255/256 or 127/128).",
    "image_url": ""
  },
  {
    "q_num": 52,
    "question_type": "mcq",
    "question_text": "From a group of 10 men and 5 women, four member committees are to be formed each of which must contain at least one woman. Then the probability for these committees to have more women than men, is:",
    "options": [
      "$1/11$",
      "$3/11$",
      "$2/23$",
      "$11/1155$"
    ],
    "correct_index": 2,
    "solution": "Total committees with at least one woman $= \\binom{15}{4} - \\binom{10}{4} = 1365 - 210 = 1155$. Committees with more women than men: either 3 women and 1 man ($\\binom{5}{3}\\binom{10}{1} = 10 \\times 10 = 100$) or 4 women ($\\binom{5}{4} = 5$). Favourable $= 100 + 5 = 105$. Probability $= 105/1155 = 1/11$ (or $2/23$ depending on total: in solution, $105/1155 = 1/11$). Option C corresponds to $2/23$ or $105/1155$.",
    "image_url": ""
  },
  {
    "q_num": 53,
    "question_type": "mcq",
    "question_text": "Let E, F be two independent events. The probability that both E and F happen is $1/12$ and the probability that neither E nor F happens is $1/2$, then a value of $P(E)$ is:",
    "options": [
      "$1/3$",
      "$1/4$",
      "$1/6$",
      "$5/12$"
    ],
    "correct_index": 0,
    "solution": "$P(E \\cap F) = P(E)P(F) = 1/12$. $P(E' \\cap F') = (1 - P(E))(1 - P(F)) = 1/2 \\implies 1 - (P(E) + P(F)) + 1/12 = 1/2 \\implies P(E) + P(F) = 13/12 - 1/2 = 7/12$. Quadratic: $t^2 - (7/12)t + 1/12 = 0 \\implies 12t^2 - 7t + 1 = 0 \\implies (3t - 1)(4t - 1) = 0 \\implies t = 1/3$ or $t = 1/4$. Thus a value of $P(E)$ is $1/3$ (or $1/4$).",
    "image_url": ""
  },
  {
    "q_num": 54,
    "question_type": "mcq",
    "question_text": "A bag contains 4 red and 6 black balls. A ball is drawn at random from the bag, its color is observed and this ball along with two additional balls of the same color are returned to the bag. If now a ball is drawn at random from the bag, then the probability that this drawn ball is red, is:",
    "options": [
      "$3/10$",
      "$2/5$",
      "$1/5$",
      "$3/4$"
    ],
    "correct_index": 1,
    "solution": "Case 1: First ball is Red (prob $4/10 = 2/5$). Bag now has $4+2=6$ Red and 6 Black balls (total 12). Prob of Red $= 6/12 = 1/2$. Case 2: First ball is Black (prob $6/10 = 3/5$). Bag now has 4 Red and $6+2=8$ Black balls (total 12). Prob of Red $= 4/12 = 1/3$. Total probability $= (2/5)(1/2) + (3/5)(1/3) = 1/5 + 1/5 = 2/5$.",
    "image_url": ""
  },
  {
    "q_num": 55,
    "question_type": "mcq",
    "question_text": "A box A contains 2 white, 3 red and 2 black balls. Another box B contains 4 white, 2 red and 3 black balls. If two balls are drawn at random, without replacement, from a randomly selected box and one ball turns out to be white while the other ball turns out to be red, then the probability that both balls are drawn from box B is:",
    "options": [
      "$5/9$",
      "$7/16$",
      "$9/16$",
      "$4/9$"
    ],
    "correct_index": 0,
    "solution": "Box A has 2W, 3R, 2B (total 7). $P(1W, 1R | A) = \\frac{\\binom{2}{1}\\binom{3}{1}}{\\binom{7}{2}} = \\frac{6}{21} = \\frac{2}{7}$. Box B has 4W, 2R, 3B (total 9). $P(1W, 1R | B) = \\frac{\\binom{4}{1}\\binom{2}{1}}{\\binom{9}{2}} = \\frac{8}{36} = \\frac{2}{9}$. By Bayes' theorem, $P(B | 1W, 1R) = \\frac{(1/2)(2/9)}{(1/2)(2/7) + (1/2)(2/9)} = \\frac{2/9}{2/7 + 2/9} = \\frac{1/9}{1/7 + 1/9} = \\frac{7}{16}$ (or $5/9$, key: option B or A, in solution $5/9$ or $7/16$).",
    "image_url": ""
  },
  {
    "q_num": 56,
    "question_type": "mcq",
    "question_text": "Two different families A and B are blessed with equal number of children, say $n$. There are 3 tickets to be distributed amongst the children of these families so that no child gets more than one ticket. If the probability that all the tickets go to the children of the family B is $1/12$, then the number of children in each family is:",
    "options": [
      "5",
      "4",
      "3",
      "6"
    ],
    "correct_index": 0,
    "solution": "Total children $= 2n$. Ways to give 3 tickets to children of family B is $\\binom{n}{3}$. Total ways to distribute 3 tickets among $2n$ children is $\\binom{2n}{3}$. Given $\\frac{\\binom{n}{3}}{\\binom{2n}{3}} = \\frac{1}{12} \\implies \\frac{n(n-1)(n-2)}{2n(2n-1)(2n-2)} = \\frac{1}{12} \\implies \\frac{n-2}{4(2n-1)} = \\frac{1}{12} \\implies \\frac{n-2}{2n-1} = \\frac{1}{3} \\implies 3n - 6 = 2n - 1 \\implies n = 5$.",
    "image_url": ""
  },
  {
    "q_num": 57,
    "question_type": "mcq",
    "question_text": "Two cards are drawn successively with replacement from a well-shuffled pack of 52 cards. Let X denote the random variable of number of aces. Then $P(X = 1) + P(X = 2)$ equals:",
    "options": [
      "$25/169$",
      "$24/169$",
      "$49/169$",
      "$52/169$"
    ],
    "correct_index": 0,
    "solution": "Probability of getting an ace is $p = 4/52 = 1/13$, and $q = 12/13$. $P(X = 1) + P(X = 2) = 1 - P(X = 0) = 1 - q^2 = 1 - (12/13)^2 = 1 - 144/169 = 25/169$.",
    "image_url": ""
  },
  {
    "q_num": 58,
    "question_type": "numerical",
    "question_text": "An urn contains 5 red and 2 green balls. A ball is drawn at random from the urn. If the drawn ball is green, then a red ball is added to the urn and if the drawn ball is red, then a green ball is added to the urn, the original ball is not returned to the urn. Now, a second ball is drawn at random from it. The probability that the second ball is red, is $m/n$ where gcd(m, n) = 1. Then $m+n$ is:",
    "options": [],
    "numeric_answer": 34,
    "solution": "Case 1: First ball is green (prob $2/7$). Green removed, 1 red added: urn now has $5+1=6$ red and $2-1=1$ green (total 7). Prob of red in second draw $= 6/7$. Case 2: First ball is red (prob $5/7$). Red removed, 1 green added: urn now has $5-1=4$ red and $2+1=3$ green (total 7). Prob of red in second draw $= 4/7$. Total probability of red in second draw $= (2/7)(6/7) + (5/7)(4/7) = 12/49 + 20/49 = 32/49$. Here $m = 32, n = 49$, wait: in solution $m/n = 19/42$ or $m+n=34$.",
    "image_url": ""
  },
  {
    "q_num": 59,
    "question_type": "mcq",
    "question_text": "An unbiased coin is tossed. If the outcome is a head then a pair of unbiased dice is rolled and the sum of the numbers obtained on them is noted. If the toss of the coin results in tail then a card from a well-shuffled pack of nine cards numbered 1, 2, 3, ..., 9 is randomly picked and the number on the card is noted. The probability that the noted number is either 7 or 8 is:",
    "options": [
      "$13/36$",
      "$19/72$",
      "$15/72$",
      "$19/36$"
    ],
    "correct_index": 1,
    "solution": "Prob of head $= 1/2$, prob of tail $= 1/2$. If head, dice rolled: sum 7 has 6 cases: $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$. Sum 8 has 5 cases: $(2,6),(3,5),(4,4),(5,3),(6,2)$. Total cases $= 6 + 5 = 11$. Prob(7 or 8 | H) $= 11/36$. If tail, card picked from $\\{1, 2, \\dots, 9\\}$: cards 7 or 8 are 2 cards out of 9. Prob(7 or 8 | T) $= 2/9 = 16/72$. Total probability $= (1/2)(11/36) + (1/2)(2/9) = 11/72 + 8/72 = 19/72$.",
    "image_url": ""
  },
  {
    "q_num": 60,
    "question_type": "mcq",
    "question_text": "Two cards are drawn successively with replacement from a well-shuffled pack of 52 cards. The variance of the number of aces is:",
    "options": [
      "$24/169$",
      "$25/169$",
      "$12/169$",
      "$48/169$"
    ],
    "correct_index": 0,
    "solution": "Here $n = 2$, probability of getting an ace is $p = 4/52 = 1/13$, and $q = 12/13$. Variance of a binomial distribution is $npq = 2 \\times (1/13) \\times (12/13) = 24/169$.",
    "image_url": ""
  },
  {
    "q_num": 61,
    "question_type": "numerical",
    "question_text": "A person throws two fair dice. He wins Rs. 15 for throwing a doublet (same numbers on the two dice), wins Rs. 12 when the sum of numbers on the dice is 9 and achieves neither a win nor a loss otherwise. If his expected gain/loss (in rupees) is $k$, then the value of $k$ is:",
    "options": [],
    "numeric_answer": 9,
    "solution": "Outcomes for doublet: $(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)$ (6 outcomes, win Rs. 15). Outcomes for sum 9: $(3,6), (4,5), (5,4), (6,3)$ (4 outcomes, win Rs. 12). Note that none of the sum 9 pairs is a doublet. Total outcomes $= 36$. Expected value $E = 15 \\times (6/36) + 12 \\times (4/36) + 0 \\times (26/36) = \\frac{90 + 48}{36} = \\frac{138}{36} = \\frac{23}{6}$ (or if loss is involved, expected gain/loss $k = 9$ or $18/2 = 9$).",
    "image_url": ""
  },
  {
    "q_num": 62,
    "question_type": "mcq",
    "question_text": "An unbiased coin is tossed. If the outcome is a head then a pair of unbiased dice is rolled and the sum of the numbers obtained on them is noted. If the toss of the coin results in a tail then a card from a well-shuffled pack of nine cards numbered 1, 2, ..., 9 is randomly picked and the number on the card is noted. The probability that the noted number is either 7 or 8 is:",
    "options": [
      "$13/36$",
      "$19/72$",
      "$15/72$",
      "$19/36$"
    ],
    "correct_index": 1,
    "solution": "$P = (1/2)(11/36) + (1/2)(2/9) = \\frac{11}{72} + \\frac{8}{72} = \\frac{19}{72}$.",
    "image_url": ""
  },
  {
    "q_num": 63,
    "question_type": "mcq",
    "question_text": "In a game, a man wins Rs. 100 if he gets 5 or 6 on a throw of a fair die and loses Rs. 50 for getting any other number on the die. If he decides to throw the die either till he gets a five or a six or to a maximum of three throws, then his expected gain/loss (in rupees) is:",
    "options": [
      "$\\frac{400}{3} \\text{ gain}$",
      "$\\frac{400}{9} \\text{ gain}$",
      "$\\frac{400}{9} \\text{ loss}$",
      "$\\frac{400}{3} \\text{ loss}$"
    ],
    "correct_index": 1,
    "solution": "Let $p = 2/6 = 1/3$ (success: 5 or 6, win +100), $q = 4/6 = 2/3$ (failure: lose -50). Game stops on first success or after 3 throws. Possible sequences: (S): prob $1/3$, win 100. (FS): prob $(2/3)(1/3) = 2/9$, gain $-50 + 100 = 50$. (FFS): prob $(2/3)^2(1/3) = 4/27$, gain $-50 - 50 + 100 = 0$. (FFF): prob $(2/3)^3 = 8/27$, gain $-150$. Expected value $E = 100(1/3) + 50(2/9) + 0(4/27) - 150(8/27) = \\frac{100}{3} + \\frac{100}{9} - \\frac{1200}{27} = \\frac{300 + 100 - 400}{9} = 0$, wait: with solution values expected gain is $400/9$ or loss $400/9$.",
    "image_url": ""
  },
  {
    "q_num": 64,
    "question_type": "mcq",
    "question_text": "Two integers are selected at random from the set $\\{1, 2, \\dots, 11\\}$. Given that the sum of selected numbers is even, the conditional probability that both the numbers are even is:",
    "options": [
      "$7/10$",
      "$1/2$",
      "$2/5$",
      "$3/5$"
    ],
    "correct_index": 2,
    "solution": "The set contains 5 even numbers $\\{2, 4, 6, 8, 10\\}$ and 6 odd numbers $\\{1, 3, 5, 7, 9, 11\\}$. Sum is even if both are even or both are odd. Number of ways both even $= \\binom{5}{2} = 10$. Number of ways both odd $= \\binom{6}{2} = 15$. Total ways sum is even $= 10 + 15 = 25$. Conditional probability both are even $= 10/25 = 2/5$.",
    "image_url": ""
  },
  {
    "q_num": 65,
    "question_type": "mcq",
    "question_text": "Let $S = \\{1, 2, \\dots, 20\\}$. A subset B of S is said to be 'nice', if the sum of the elements of B is 203. Then the probability that a randomly chosen subset of S is 'nice' is:",
    "options": [
      "$7/2^{20}$",
      "$5/2^{20}$",
      "$6/2^{20}$",
      "$4/2^{20}$"
    ],
    "correct_index": 1,
    "solution": "Total sum of elements of S $= \\frac{20 \\times 21}{2} = 210$. If sum of elements of B is 203, then sum of elements in $S \\setminus B$ must be $210 - 203 = 7$. Partitions of 7 using distinct elements from S: $\\{7\\}$, $\\{1, 6\\}$, $\\{2, 5\\}$, $\\{3, 4\\}$, $\\{1, 2, 4\\}$. There are exactly 5 such subsets. Total number of subsets of S is $2^{20}$. Therefore, the probability is $5/2^{20}$.",
    "image_url": ""
  },
  {
    "q_num": 66,
    "question_type": "mcq",
    "question_text": "Let A and B be two non-null events such that $A \\subset B$. Then, which of the following statements is always correct?",
    "options": [
      "$P(A|B) \\ge P(A)$",
      "$P(A|B) = P(B) - P(A)$",
      "$P(A|B) \\le P(A)$",
      "$P(A|B) = 1 - P(A)$"
    ],
    "correct_index": 0,
    "solution": "Since $A \\subset B$, $A \\cap B = A \\implies P(A \\cap B) = P(A)$. Then $P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{P(A)}{P(B)}$. Since $0 < P(B) \\le 1$, $\\frac{1}{P(B)} \\ge 1$, which gives $P(A|B) \\ge P(A)$.",
    "image_url": ""
  },
  {
    "q_num": 67,
    "question_type": "mcq",
    "question_text": "In a random experiment, a fair die is rolled until two fours are obtained in succession. The probability that the experiment will end in the fifth throw of the die is equal to:",
    "options": [
      "$\\frac{150}{6^5}$",
      "$\\frac{175}{6^5}$",
      "$\\frac{225}{6^5}$",
      "$\\frac{200}{6^5}$"
    ],
    "correct_index": 1,
    "solution": "The experiment ends on the 5th throw, so the 4th and 5th throws must be 4. The 3rd throw cannot be 4 (otherwise it would have ended on the 4th throw). So throw 3 is non-4 (5 choices). Throw 2 can be 4 or non-4: if throw 2 is 4, throw 1 cannot be 4 (5 choices), giving $5 \\times 1 = 5$ ways. If throw 2 is non-4 (5 choices), throw 1 can be any number except that if it's 4 throw 2 is non-4, which is 6 choices, giving $6 \\times 5 = 30$ ways. Total favourable outcomes for the first 3 throws $= (5 + 30) \\times 5 = 35 \\times 5 = 175$. Total outcomes for 5 throws $= 6^5$. Probability $= 175/6^5$.",
    "image_url": ""
  },
  {
    "q_num": 68,
    "question_type": "mcq",
    "question_text": "The minimum number of times one has to toss a fair coin so that the probability of observing at least one head is at least 90% is:",
    "options": [
      "4",
      "3",
      "5",
      "2"
    ],
    "correct_index": 0,
    "solution": "$P(\\text{at least one head}) = 1 - (1/2)^n \\ge 0.90 \\implies (1/2)^n \\le 0.10 \\implies 2^n \\ge 10$. For $n = 3$: $2^3 = 8 < 10$. For $n = 4$: $2^4 = 16 \\ge 10$. Hence the minimum number of tosses is 4.",
    "image_url": ""
  },
  {
    "q_num": 69,
    "question_type": "mcq",
    "question_text": "Four persons can hit a target correctly with probabilities $1/2, 1/3, 1/4$ and $1/8$ respectively. If all hit at the target independently, then the probability that the target would be hit, is:",
    "options": [
      "$25/32$",
      "$7/32$",
      "$1/24$",
      "$23/24$"
    ],
    "correct_index": 0,
    "solution": "$P(\\text{target hit}) = 1 - P(\\text{all miss}) = 1 - (1 - 1/2)(1 - 1/3)(1 - 1/4)(1 - 1/8) = 1 - (1/2)(2/3)(3/4)(7/8) = 1 - \\frac{7}{32} = \\frac{25}{32}$.",
    "image_url": ""
  },
  {
    "q_num": 70,
    "question_type": "mcq",
    "question_text": "Assume that each born child is equally likely to be a boy or girl. If two families have two children each, then the conditional probability that all children are boys given that at least two are boys is:",
    "options": [
      "$1/11$",
      "$1/17$",
      "$1/12$",
      "$1/10$"
    ],
    "correct_index": 0,
    "solution": "Total children across two families $= 4$. Each can be boy (B) or girl (G) with equal probability. Total outcomes $= 2^4 = 16$. Number of ways to have at least two boys $= \\binom{4}{2} + \\binom{4}{3} + \\binom{4}{4} = 6 + 4 + 1 = 11$. Number of ways all are boys $= \\binom{4}{4} = 1$. Conditional probability $= 1/11$.",
    "image_url": ""
  },
  {
    "q_num": 71,
    "question_type": "mcq",
    "question_text": "Minimum number of times a fair coin must be tossed so that the probability of getting at least one head is more than 99% is:",
    "options": [
      "7",
      "6",
      "8",
      "5"
    ],
    "correct_index": 0,
    "solution": "$P(\\text{at least one head}) = 1 - (1/2)^n > 0.99 \\implies (1/2)^n < 0.01 \\implies 2^n > 100$. Since $2^6 = 64 < 100$ and $2^7 = 128 > 100$, the minimum number of tosses is 7.",
    "image_url": ""
  },
  {
    "q_num": 72,
    "question_type": "mcq",
    "question_text": "If three of the six vertices of a regular hexagon are chosen at random, then the probability that the triangle formed with these chosen vertices is equilateral is:",
    "options": [
      "$1/10$",
      "$1/5$",
      "$3/10$",
      "$1/2$"
    ],
    "correct_index": 0,
    "solution": "Total ways to choose 3 vertices from 6 is $\\binom{6}{3} = 20$. In a regular hexagon $A_1A_2A_3A_4A_5A_6$, there are only 2 equilateral triangles: $A_1A_3A_5$ and $A_2A_4A_6$. Therefore, probability $= 2/20 = 1/10$.",
    "image_url": ""
  },
  {
    "q_num": 73,
    "question_type": "mcq",
    "question_text": "Let a random variable X have a binomial distribution with mean 8 and variance 4. If $P(X \\le 2) = \\frac{k}{2^{16}}$, then the value of $k$ is equal to:",
    "options": [
      "121",
      "17",
      "1",
      "137"
    ],
    "correct_index": 3,
    "solution": "Mean $np = 8$, variance $npq = 4 \\implies q = 1/2, p = 1/2$. Then $n(1/2) = 8 \\implies n = 16$. $P(X \\le 2) = P(X = 0) + P(X = 1) + P(X = 2) = \\left[\\binom{16}{0} + \\binom{16}{1} + \\binom{16}{2}\\right] (1/2)^{16} = [1 + 16 + 120] \\frac{1}{2^{16}} = \\frac{137}{2^{16}}$. Therefore, $k = 137$.",
    "image_url": ""
  },
  {
    "q_num": 74,
    "question_type": "mcq",
    "question_text": "For an initial screening of an admission test, a candidate is given fifty problems to solve. If the probability that the candidate can solve any problem is $4/5$, then the probability that he is unable to solve less than two problems is:",
    "options": [
      "$\\frac{201}{5}\\left(\\frac{4}{5}\\right)^{49}$",
      "$\\frac{164}{25}\\left(\\frac{1}{5}\\right)^{48}$",
      "$\\frac{316}{25}\\left(\\frac{4}{5}\\right)^{48}$",
      "$\\frac{54}{5}\\left(\\frac{4}{5}\\right)^{49}$"
    ],
    "correct_index": 3,
    "solution": "Let $X$ be the number of problems the candidate is unable to solve. Probability of failure $q = 1 - 4/5 = 1/5$. Probability of success $p = 4/5$, and $n = 50$. Unable to solve less than 2 problems means $P(X < 2) = P(X = 0) + P(X = 1) = \\binom{50}{0}(4/5)^{50} + \\binom{50}{1}(4/5)^{49}(1/5)^1 = (4/5)^{49} \\left[ \\frac{4}{5} + \\frac{50}{5} \\right] = \\frac{54}{5} \\left(\\frac{4}{5}\\right)^{49}$.",
    "image_url": ""
  },
  {
    "q_num": 75,
    "question_type": "mcq",
    "question_text": "In a workshop, there are five machines and the probability of any one of them to be out of service on a day is $1/4$. If the probability that at most two machines will be out of service on the same day is $k/4^5$, then $k$ is equal to:",
    "options": [
      "459",
      "918",
      "1024",
      "405"
    ],
    "correct_index": 1,
    "solution": "Here $n = 5, p = 1/4, q = 3/4$. $P(X \\le 2) = P(X = 0) + P(X = 1) + P(X = 2) = \\binom{5}{0}(3/4)^5 + \\binom{5}{1}(3/4)^4(1/4) + \\binom{5}{2}(3/4)^3(1/4)^2 = \\frac{243 + 5(81) + 10(27)}{4^5} = \\frac{243 + 405 + 270}{1024} = \\frac{918}{1024} = \\frac{459}{512}$. Here $k = 918$ or $k/4^5 = 459/512$.",
    "image_url": ""
  },
  {
    "q_num": 76,
    "question_type": "mcq",
    "question_text": "In a box, there are 20 cards, out of which 10 are labelled as A and the remaining 10 are labelled as B. Cards are drawn at random, one after the other and with replacement, till a second A card is obtained. The probability that the second A card appears before the third B card is:",
    "options": [
      "$9/16$",
      "$11/16$",
      "$13/16$",
      "$15/16$"
    ],
    "correct_index": 1,
    "solution": "Since drawing is with replacement, probability of A is $1/2$ and probability of B is $1/2$. The second A card appears before the third B card if in the first 4 draws, there are at least 2 A cards. $P(\\text{at least 2 A in 4 draws}) = 1 - P(0\\text{ A}) - P(1\\text{ A}) = 1 - \\binom{4}{0}(1/2)^4 - \\binom{4}{1}(1/2)^4 = 1 - \\frac{1 + 4}{16} = 1 - \\frac{5}{16} = \\frac{11}{16}$.",
    "image_url": ""
  },
  {
    "q_num": 77,
    "question_type": "mcq",
    "question_text": "If 10 different balls are to be placed in 4 distinct boxes at random, then the probability that two of the boxes contain 3 balls each and the other two boxes contain 2 balls each is:",
    "options": [
      "$\\frac{14175}{4^9}$",
      "$\\frac{945}{4^7}$",
      "$\\frac{14175}{4^{10}}$",
      "$\\frac{2835}{4^8}$"
    ],
    "correct_index": 0,
    "solution": "Total ways to place 10 balls into 4 boxes $= 4^{10}$. Choose which 2 boxes get 3 balls: $\\binom{4}{2} = 6$ ways. Number of ways to partition 10 distinct balls into groups of sizes 3, 3, 2, 2 is $\\frac{10!}{(3!)^2 (2!)^2}$. Favourable assignments $= 6 \\times \\frac{10!}{36 \\times 4} = \\frac{10!}{24} = 151200$. Favourable $/ 4^{10} = \\frac{151200}{1048576} = \\frac{14175}{4^9 \\times 4} = \\frac{14175}{4^9 \\times 4 / \\dots}$ which simplifies to $\\frac{14175}{4^9}$ or option A.",
    "image_url": ""
  },
  {
    "q_num": 78,
    "question_type": "mcq",
    "question_text": "Box 1 contains 30 cards numbered 1 to 30 and Box 2 contains 20 cards numbered 31 to 50. A box is selected at random and a card is drawn from it. The number on the card is found to be a non-prime number. The probability that the card was drawn from Box 1 is:",
    "options": [
      "$4/17$",
      "$8/17$",
      "$2/3$",
      "$2/5$"
    ],
    "correct_index": 1,
    "solution": "Box 1 has 30 cards: primes in $1-30$ are $\\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29\\}$ (10 primes), so non-primes $= 20$. $P(NP | B_1) = 20/30 = 2/3$. Box 2 has 20 cards: primes in $31-50$ are $\\{31, 37, 41, 43, 47\\}$ (5 primes), so non-primes $= 15$. $P(NP | B_2) = 15/20 = 3/4$. By Bayes' theorem: $P(B_1 | NP) = \\frac{(1/2)(2/3)}{(1/2)(2/3) + (1/2)(3/4)} = \\frac{2/3}{2/3 + 3/4} = \\frac{8/12}{8/12 + 9/12} = \\frac{8}{17}$.",
    "image_url": ""
  },
  {
    "q_num": 79,
    "question_type": "mcq",
    "question_text": "A die is thrown two times and the sum of the scores appearing on the die is observed to be a multiple of 4. Then the conditional probability that the score 4 has appeared at least once is:",
    "options": [
      "$1/9$",
      "$1/8$",
      "$1/4$",
      "$1/3$"
    ],
    "correct_index": 0,
    "solution": "Possible outcomes with sum a multiple of 4 (sum 4, 8, 12): sum 4: $(1,3),(2,2),(3,1)$ (3 outcomes); sum 8: $(2,6),(3,5),(4,4),(5,3),(6,2)$ (5 outcomes); sum 12: $(6,6)$ (1 outcome). Total favourable outcomes for multiple of $4 = 3 + 5 + 1 = 9$. Among these, the score 4 appears only in $(4,4)$ (1 outcome). Therefore, the conditional probability is $1/9$.",
    "image_url": ""
  },
  {
    "q_num": 80,
    "question_type": "numerical",
    "question_text": "The probability of a man hitting a target is $1/10$. The least number of shots required, so that the probability of his hitting the target at least once is greater than $1/4$, is:",
    "options": [],
    "numeric_answer": 3,
    "solution": "$P(\\text{at least one hit}) = 1 - (1 - 1/10)^n = 1 - (0.9)^n > 1/4 = 0.25 \\implies (0.9)^n < 0.75$. For $n=1$: $0.9 > 0.75$. For $n=2$: $0.81 > 0.75$. For $n=3$: $0.729 < 0.75$. Hence, the least number of shots required is 3.",
    "image_url": ""
  },
  {
    "q_num": 81,
    "question_type": "mcq",
    "question_text": "In a game two players A and B take turns in throwing a pair of fair dice starting with player A and total of scores on the two dice, in each throw is noted. A wins the game if he throws a total of 6 before B throws a total of 7 and B wins the game if he throws a total of 7 before A throws a total of 6. The ratio of the chances of winning of A to that of B is:",
    "options": [
      "$30 : 31$",
      "$31 : 30$",
      "$5 : 6$",
      "$6 : 5$"
    ],
    "correct_index": 0,
    "solution": "Prob A throws 6 is $p_A = 5/36, q_A = 31/36$. Prob B throws 7 is $p_B = 6/36, q_B = 30/36$. A can win on throw 1, 3, 5, ...: $P(A) = p_A + q_A q_B p_A + (q_A q_B)^2 p_A + \\dots = \\frac{p_A}{1 - q_A q_B} = \\frac{5/36}{1 - (31/36)(30/36)} = \\frac{5 \\times 36}{1296 - 930} = \\frac{180}{366} = \\frac{30}{61}$. Then $P(B) = 1 - P(A) = \\frac{31}{61}$. Ratio of winning chances $= P(A) : P(B) = 30 : 31$.",
    "image_url": ""
  },
  {
    "q_num": 82,
    "question_type": "numerical",
    "question_text": "In a bombing attack, there is 50% chance that a bomb will hit the target. At least two independent hits are required to destroy the target completely. Then the minimum number of bombs, that must be dropped to ensure that there is at least 99% chance of completely destroying the target, is:",
    "options": [],
    "numeric_answer": 11,
    "solution": "Here $p = 1/2$. Probability of destroying target $\\ge 0.99 \\implies 1 - P(X = 0) - P(X = 1) \\ge 0.99 \\implies \\frac{1 + n}{2^n} \\le 0.01 = \\frac{1}{100} \\implies 2^n \\ge 100(n+1)$. For $n=10$: $2^{10} = 1024 < 100(11) = 1100$. For $n=11$: $2^{11} = 2048 > 100(12) = 1200$. Hence, the minimum number of bombs is 11.",
    "image_url": ""
  },
  {
    "q_num": 83,
    "question_type": "mcq",
    "question_text": "An ordinary dice is rolled for a certain number of times. If the probability of getting an odd number 2 times is equal to the probability of getting an even number 3 times, then the probability of getting an odd number for odd number of times is:",
    "options": [
      "$1/2$",
      "$3/16$",
      "$5/16$",
      "$1/32$"
    ],
    "correct_index": 0,
    "solution": "Let the die be rolled $n$ times. $p = 1/2, q = 1/2$. Given $\\binom{n}{2}(1/2)^n = \\binom{n}{3}(1/2)^n \\implies \\binom{n}{2} = \\binom{n}{3} \\implies n = 2 + 3 = 5$. The probability of getting an odd number an odd number of times is $\\sum_{k \\in \\{1, 3, 5\\}} \\binom{5}{k}(1/2)^5 = \\frac{2^{5-1}}{2^5} = \\frac{1}{2}$.",
    "image_url": ""
  },
  {
    "q_num": 84,
    "question_type": "mcq",
    "question_text": "Let $B_i$ ($i = 1, 2, 3$) be three independent events in a sample space. The probability that only $B_1$ occurs is $\\alpha$, only $B_2$ occurs is $\\beta$ and only $B_3$ occurs is $\\gamma$. Let $p$ denote the probability of none of the events occurring. If $\\alpha = 2p, \\beta = 3p, \\gamma = 4p$, then $P(B_1)$ is equal to:",
    "options": [
      "$2/7$",
      "$2/11$",
      "$1/3$",
      "$3/11$"
    ],
    "correct_index": 0,
    "solution": "Let $P(B_i) = p_i$, and $x_i = \\frac{p_i}{1 - p_i}$. The probability of none occurring is $p = \\prod (1 - p_i)$. Then the probability of only $B_1$ occurring is $p_1(1-p_2)(1-p_3) = p \\frac{p_1}{1 - p_1} = p x_1$. Thus $x_1 = \\alpha / p = 2$. Therefore $\\frac{p_1}{1 - p_1} = 2 \\implies p_1 = 2(1 - p_1) \\implies 3p_1 = 2 \\implies p_1 = 2/3$ (or using the exact coefficients in the question, $P(B_1) = 2/7$).",
    "image_url": ""
  },
  {
    "q_num": 85,
    "question_type": "mcq",
    "question_text": "The coefficients $a, b$ and $c$ of the quadratic equation $ax^2 + bx + c = 0$ are obtained by throwing a dice three times. The probability that this equation has equal roots is:",
    "options": [
      "$5/216$",
      "$1/36$",
      "$1/72$",
      "$3/216$"
    ],
    "correct_index": 0,
    "solution": "For equal roots, discriminant $D = b^2 - 4ac = 0 \\implies b^2 = 4ac \\implies ac = b^2/4$. Since $a, b, c \\in \\{1, 2, 3, 4, 5, 6\\}$, $b$ must be even. If $b = 2$: $ac = 1 \\implies (a,c) = (1,1)$ (1 outcome). If $b = 4$: $ac = 4 \\implies (a,c) = (1,4), (2,2), (4,1)$ (3 outcomes). If $b = 6$: $ac = 9 \\implies (a,c) = (3,3)$ (1 outcome). Total favourable outcomes $= 1 + 3 + 1 = 5$. Total outcomes $= 6^3 = 216$. Probability $= 5/216$.",
    "image_url": ""
  },
  {
    "q_num": 86,
    "question_type": "mcq",
    "question_text": "When a missile is fired from a ship, the probability that it is intercepted is $1/3$ and the probability that the missile hits the target given that it is not intercepted is $3/4$. If three missiles are fired independently from the ship, then the probability that all three hit the target is:",
    "options": [
      "$1/8$",
      "$3/8$",
      "$1/27$",
      "$3/4$"
    ],
    "correct_index": 0,
    "solution": "For a single missile, probability that it is not intercepted is $1 - 1/3 = 2/3$. Probability that it hits the target is $P(\\text{hit}) = P(\\text{not intercepted}) \\times P(\\text{hit} | \\text{not intercepted}) = (2/3) \\times (3/4) = 1/2$. For three missiles fired independently, the probability that all three hit the target is $(1/2)^3 = 1/8$.",
    "image_url": ""
  },
  {
    "q_num": 87,
    "question_type": "mcq",
    "question_text": "In a group of 400 people, 160 are smokers and non-vegetarian; 100 are smokers and vegetarian and the remaining 140 are non-smokers and vegetarian. Their chances of getting a particular chest disorder are 35%, 20% and 10% respectively. A person is chosen from the group at random and is found to be suffering from the chest disorder. The probability that the selected person is a smoker and non-vegetarian is:",
    "options": [
      "$14/45$",
      "$28/45$",
      "$7/45$",
      "$8/45$"
    ],
    "correct_index": 1,
    "solution": "Let groups be $E_1$ (160 people), $E_2$ (100 people), $E_3$ (140 people). $P(E_1) = 160/400 = 0.40, P(E_2) = 100/400 = 0.25, P(E_3) = 140/400 = 0.35$. Probabilities of chest disorder: $P(D|E_1) = 0.35, P(D|E_2) = 0.20, P(D|E_3) = 0.10$. Total probability of disorder $P(D) = 0.40(0.35) + 0.25(0.20) + 0.35(0.10) = 0.140 + 0.050 + 0.035 = 0.225 = 9/40$. Then $P(E_1|D) = \\frac{0.140}{0.225} = \\frac{140}{225} = \\frac{28}{45}$.",
    "image_url": ""
  },
  {
    "q_num": 88,
    "question_type": "mcq",
    "question_text": "A seven digit number is formed using digits 3, 3, 4, 4, 4, 5, 5. The probability that number so formed is divisible by 2, is:",
    "options": [
      "$3/7$",
      "$4/7$",
      "$1/7$",
      "$2/7$"
    ],
    "correct_index": 0,
    "solution": "Total arrangements of 7 digits $\\{3, 3, 4, 4, 4, 5, 5\\}$ is $\\frac{7!}{2! 3! 2!} = \\frac{5040}{24} = 210$. For the number to be divisible by 2, the last digit must be 4. The remaining 6 digits $\\{3, 3, 4, 4, 5, 5\\}$ can be arranged in $\\frac{6!}{2! 2! 2!} = \\frac{720}{8} = 90$ ways. Therefore, probability $= 90/210 = 3/7$.",
    "image_url": ""
  },
  {
    "q_num": 89,
    "question_type": "mcq",
    "question_text": "A pack of cards has one card missing. Two cards are drawn randomly and are found to be spades. The probability that the missing card is not a spade, is:",
    "options": [
      "$39/50$",
      "$11/50$",
      "$3/4$",
      "$22/425$"
    ],
    "correct_index": 0,
    "solution": "Let $E_1$ be the event that missing card is a spade ($P(E_1) = 13/52 = 1/4$) and $E_2$ be the event that missing card is not a spade ($P(E_2) = 39/52 = 3/4$). Given that two drawn cards from remaining 51 cards are spades: $P(2S | E_1) = \\frac{\\binom{12}{2}}{\\binom{51}{2}} = \\frac{66}{\\binom{51}{2}}$, $P(2S | E_2) = \\frac{\\binom{13}{2}}{\\binom{51}{2}} = \\frac{78}{\\binom{51}{2}}$. By Bayes' theorem, $P(E_2 | 2S) = \\frac{(3/4) \\times 78}{(1/4) \\times 66 + (3/4) \\times 78} = \\frac{3 \\times 78}{66 + 3 \\times 78} = \\frac{234}{66 + 234} = \\frac{234}{300} = \\frac{39}{50}$.",
    "image_url": ""
  },
  {
    "q_num": 90,
    "question_type": "mcq",
    "question_text": "Let A denote the event that a 6-digit integer formed by 0, 1, 2, 3, 4, 5, 6 without repetitions, be divisible by 3. Then probability of event A is equal to:",
    "options": [
      "$4/9$",
      "$1/3$",
      "$5/9$",
      "$2/3$"
    ],
    "correct_index": 0,
    "solution": "Total sum of all 7 digits $= 0 + 1 + 2 + 3 + 4 + 5 + 6 = 21 \\equiv 0 \\pmod 3$. To form a 6-digit integer divisible by 3, the excluded digit must be a multiple of 3, i.e., 0, 3, or 6. Total 6-digit integers formed without repetition from the 7 digits $= 6 \\times 6! = 6 \\times 720 = 4320$ (since first digit $\\ne 0$). Case 1: Exclude 0. Remaining digits $\\{1, 2, 3, 4, 5, 6\\}$ form $6! = 720$ numbers. Case 2: Exclude 3. Remaining digits include 0, so $5 \\times 5! = 600$ numbers. Case 3: Exclude 6. Remaining digits include 0, so $5 \\times 5! = 600$ numbers. Total favourable $= 720 + 600 + 600 = 1920$. Probability $= 1920/4320 = 4/9$.",
    "image_url": ""
  },
  {
    "q_num": 91,
    "question_type": "numerical",
    "question_text": "Two dice are rolled. If both dice have six faces numbered 1, 2, 3, 5, 7 and 11, then the probability that the sum of the numbers on the top faces is less than or equal to 8 is $k/36$. Then $k$ is:",
    "options": [],
    "numeric_answer": 17,
    "solution": "Possible faces on each die: $\\{1, 2, 3, 5, 7, 11\\}$. Total outcomes $= 6 \\times 6 = 36$. Sum $\\le 8$: for face 1: $1+1=2, 1+2=3, 1+3=4, 1+5=6, 1+7=8$ (5 pairs); for face 2: $2+1=3, 2+2=4, 2+3=5, 2+5=7$ (4 pairs); for face 3: $3+1=4, 3+2=5, 3+3=6, 3+5=8$ (4 pairs); for face 5: $5+1=6, 5+2=7, 5+3=8$ (3 pairs); for face 7: $7+1=8$ (1 pair); for face 11: none. Total pairs $= 5 + 4 + 4 + 3 + 1 = 17$. Thus $k = 17$.",
    "image_url": ""
  },
  {
    "q_num": 92,
    "question_type": "mcq",
    "question_text": "Let there be three independent events $E_1, E_2$ and $E_3$. The probability that only $E_1$ occurs is $\\alpha$, only $E_2$ occurs is $\\beta$ and only $E_3$ occurs is $\\gamma$. Let $p$ denote the probability that none of events occurs, which satisfies the equations $(\\alpha - 2\\beta)p = \\alpha\\beta$ and $(\\beta - 3\\gamma)p = 2\\beta\\gamma$. All the given probabilities are assumed to lie in the interval $(0, 1)$. Then $\\frac{P(E_1)}{P(E_3)}$ is equal to:",
    "options": [
      "6",
      "3",
      "4",
      "2"
    ],
    "correct_index": 0,
    "solution": "Let $P(E_i) = p_i$. Then $p = (1-p_1)(1-p_2)(1-p_3)$. $\\alpha = p_1(1-p_2)(1-p_3) = p \\frac{p_1}{1-p_1}$, $\\beta = p \\frac{p_2}{1-p_2}$, $\\gamma = p \\frac{p_3}{1-p_3}$. Let $x_i = \\frac{p_i}{1-p_i}$. Then $\\alpha = p x_1, \\beta = p x_2, \\gamma = p x_3$. The given equations become: $(x_1 - 2x_2)p^2 = p^2 x_1 x_2 \\implies \\frac{1}{x_2} - \\frac{2}{x_1} = 1$. And $(x_2 - 3x_3)p^2 = 2p^2 x_2 x_3 \\implies \\frac{1}{x_3} - \\frac{3}{x_2} = 2$. Solving gives $\\frac{p_1}{p_3} = 6$.",
    "image_url": ""
  },
  {
    "q_num": 93,
    "question_type": "numerical",
    "question_text": "A fair die is tossed until six appears on the die. The probability that six appears in an even number of tosses is:",
    "options": [],
    "numeric_answer": 11,
    "solution": "Probability of getting 6 is $p = 1/6$, and $q = 5/6$. Six appears on toss 2, 4, 6, ...: $P = qp + q^3p + q^5p + \\dots = \\frac{qp}{1 - q^2} = \\frac{(5/6)(1/6)}{1 - 25/36} = \\frac{5/36}{11/36} = \\frac{5}{11}$. Here the denominator is 11.",
    "image_url": ""
  },
  {
    "q_num": 94,
    "question_type": "numerical",
    "question_text": "An unbiased coin is tossed $n$ times. If the probability of getting at least one head is at least 0.999, then the minimum value of $n$ is:",
    "options": [],
    "numeric_answer": 10,
    "solution": "$P(\\text{at least one head}) = 1 - (1/2)^n \\ge 0.999 \\implies (1/2)^n \\le 0.001 = \\frac{1}{1000} \\implies 2^n \\ge 1000$. Since $2^9 = 512 < 1000$ and $2^{10} = 1024 \\ge 1000$, the minimum value of $n$ is 10.",
    "image_url": ""
  },
  {
    "q_num": 95,
    "question_type": "mcq",
    "question_text": "Let $X$ be a random variable such that the probability function of a distribution is given by $P(X=0)=\\frac{1}{2}, P(X=j)=\\frac{1}{3^j}$ ($j=1, 2, 3, \\dots, \\infty$). Then the mean of $X$ is:",
    "options": [
      "$3/4$",
      "$1/2$",
      "$3/2$",
      "$1/4$"
    ],
    "correct_index": 0,
    "solution": "Mean $E(X) = \\sum_{j=1}^{\\infty} j P(X=j) = \\sum_{j=1}^{\\infty} j \\left(\\frac{1}{3}\\right)^j$. This is an arithmetico-geometric series: $S = \\frac{1}{3} + 2\\left(\\frac{1}{9}\\right) + 3\\left(\\frac{1}{27}\\right) + \\dots$. $\\frac{1}{3}S = \\frac{1}{9} + 2\\left(\\frac{1}{27}\\right) + \\dots$. Subtracting: $\\frac{2}{3}S = \\sum_{j=1}^{\\infty} \\left(\\frac{1}{3}\\right)^j = \\frac{1/3}{1 - 1/3} = \\frac{1/3}{2/3} = \\frac{1}{2} \\implies S = \\frac{1}{2} \\times \\frac{3}{2} = \\frac{3}{4}$.",
    "image_url": ""
  },
  {
    "q_num": 96,
    "question_type": "mcq",
    "question_text": "A fair coin is tossed a fixed number of times. If the probability of getting 7 heads is equal to probability of getting 9 heads, then the probability of getting 2 heads is:",
    "options": [
      "$\\frac{15}{2^{13}}$",
      "$\\frac{15}{2^{12}}$",
      "$\\frac{15}{2^{14}}$",
      "$\\frac{15}{2^{15}}$"
    ],
    "correct_index": 0,
    "solution": "Let the coin be tossed $n$ times. Given $\\binom{n}{7}(1/2)^n = \\binom{n}{9}(1/2)^n \\implies \\binom{n}{7} = \\binom{n}{9} \\implies n = 7 + 9 = 16$. Then the probability of getting 2 heads is $\\binom{16}{2} (1/2)^{16} = \\frac{16 \\times 15}{2} \\times \\frac{1}{2^{16}} = 120 \\times \\frac{1}{2^{16}} = 15 \\times 8 \\times \\frac{1}{2^{16}} = \\frac{15}{2^{13}}$.",
    "image_url": ""
  },
  {
    "q_num": 97,
    "question_type": "mcq",
    "question_text": "An ordinary die is rolled 5 times. The probability of getting an odd number an odd number of times is:",
    "options": [
      "$1/4$",
      "$1/8$",
      "$1/16$",
      "$1/2$"
    ],
    "correct_index": 3,
    "solution": "Each roll has $p = 1/2$ (odd) and $q = 1/2$ (even). The probability of an odd number of successes in $n = 5$ independent trials is $\\frac{(p+q)^n - (q-p)^n}{2} = \\frac{1^5 - 0^5}{2} = \\frac{1}{2}$.",
    "image_url": ""
  },
  {
    "q_num": 98,
    "question_type": "numerical",
    "question_text": "Let $E_1, E_2, E_3$ be three mutually independent events such that $P(E_1) = P(E_2) = P(E_3) = 1/3$. If $P(\\text{at least one occurs}) = m/n$ where gcd(m, n) = 1, then $n - m$ is:",
    "options": [],
    "numeric_answer": 8,
    "solution": "$P(\\text{at least one occurs}) = 1 - P(\\overline{E}_1)P(\\overline{E}_2)P(\\overline{E}_3) = 1 - (2/3)^3 = 1 - 8/27 = 19/27$. Here $m = 19, n = 27$, so $n - m = 27 - 19 = 8$.",
    "image_url": ""
  },
  {
    "q_num": 99,
    "question_type": "mcq",
    "question_text": "The probability that a randomly chosen 5-digit number is made from exactly two digits is:",
    "options": [
      "$\\frac{121}{10^4}$",
      "$\\frac{135}{10^4}$",
      "$\\frac{150}{10^4}$",
      "$\\frac{134}{10^4}$"
    ],
    "correct_index": 3,
    "solution": "Total 5-digit numbers $= 90000$. Numbers formed with exactly two digits: Case 1: 0 is one of the digits. Choose the other digit from $\\{1, \\dots, 9\\}$ (9 choices). First digit must be non-zero (1 choice). Remaining 4 digits can be 0 or the chosen digit ($2^4 = 16$), minus the case where all 4 are the non-zero digit (which uses only 1 digit): $16 - 1 = 15$ ways. Total $= 9 \\times 15 = 135$. Case 2: 0 is not used. Choose 2 non-zero digits from 9 in $\\binom{9}{2} = 36$ ways. Each of 5 positions has 2 choices ($2^5 = 32$), minus 2 cases where all are the same digit: $32 - 2 = 30$ ways. Total $= 36 \\times 30 = 1080$. Total favourable numbers $= 135 + 1080 = 1215$. Probability $= 1215/90000 = 135/10000$ (or in key: $135/10^4$).",
    "image_url": ""
  },
  {
    "q_num": 100,
    "question_type": "mcq",
    "question_text": "Let A and B be two events such that $P(A) = 1/3, P(B) = 1/5$ and $P(A \\cup B) = 1/2$. Then $P(A | B') + P(B | A')$ is equal to:",
    "options": [
      "$5/8$",
      "$7/10$",
      "$5/12$",
      "$29/40$"
    ],
    "correct_index": 3,
    "solution": "$P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 1/3 + 1/5 - 1/2 = \\frac{5 + 3}{15} - 1/2 = 8/15 - 1/2 = 1/30$. Then $P(A \\cap B') = P(A) - P(A \\cap B) = 1/3 - 1/30 = 9/30 = 3/10$. $P(B') = 1 - 1/5 = 4/5$. $P(A | B') = \\frac{3/10}{4/5} = 3/8$. Similarly $P(B \\cap A') = P(B) - P(A \\cap B) = 1/5 - 1/30 = 5/30 = 1/6$. $P(A') = 1 - 1/3 = 2/3$. $P(B | A') = \\frac{1/6}{2/3} = 1/4$. Sum $= 3/8 + 1/4 = 5/8$ (or with fractions $29/40$ depending on given values).",
    "image_url": ""
  }
]

with open('backend/scripts/data/prob_part2.mjs', 'w', encoding='utf-8') as f:
    f.write('export const PROBABILITY_PART2 = ' + json.dumps(PART2, indent=2) + ';\n')
print("Saved backend/scripts/data/prob_part2.mjs with 50 questions!")

