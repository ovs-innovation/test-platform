export const heightsBatch2 = [
  {
    question_number: 24,
    question_text: "ABC is a triangular park with AB = AC = 100 metres. A vertical tower is situated at the mid-point of BC. If the angles of elevation of the top of the tower at A and B are cot⁻¹(3√2) and cosec⁻¹(2√2) respectively, then the height of the tower (in metres) is",
    options: [
      "100 / (3√3)",
      "20",
      "25",
      "10√5"
    ],
    correct_index: 1,
    solution: "Let D be the mid-point of BC and DE = h be the vertical tower. In right △ADE, cot A = 3√2 ⇒ AD = y = 3√2 h ⇒ y² = 18h². In right △BDE, cosec B = 2√2 ⇒ sin B = 1/(2√2) ⇒ tan B = 1/√7 ⇒ BD = x = √7 h ⇒ x² = 7h². Since AB = AC = 100 and D is the mid-point of BC, AD ⊥ BC. In right △ABD, AB² = AD² + BD² ⇒ 100² = 18h² + 7h² = 25h² ⇒ h² = 10000 / 25 = 400 ⇒ h = 20 metres.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 25,
    question_text: "The angle of elevation of the top of a vertical tower standing on a horizontal plane is observed to be 45° from a point A on the plane. Let B be the point 30 m vertically above the point A. If the angle of elevation of the top of the tower from B be 30°, then the distance (in m) of the foot of the tower from the point A is:",
    options: [
      "15(3 + √3)",
      "15(1 + √3)",
      "15(5 - √3)",
      "15(3 - √3)"
    ],
    correct_index: 0,
    solution: "Let the foot of the tower be C and the top be P. Let PC = h and AC = y. From A: tan 45° = h / y ⇒ h = y. From B (30 m vertically above A): the height of P above B is h - 30 = y - 30. tan 30° = (y - 30) / y ⇒ 1/√3 = (y - 30) / y ⇒ y = √3(y - 30) ⇒ y(√3 - 1) = 30√3 ⇒ y = 30√3 / (√3 - 1) = 15(3 + √3) m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 26,
    question_text: "Two vertical poles AB = 15 m and CD = 10 m are standing apart on a horizontal ground with points A and C on the ground. If P is the point of intersection of BC and AD, then the height of P (in m) above the line AC is :",
    options: [
      "20/3",
      "5",
      "10/3",
      "6"
    ],
    correct_index: 3,
    solution: "Let h be the height of P above AC. By the property of intersecting lines between two vertical poles: 1/h = 1/AB + 1/CD ⇒ 1/h = 1/15 + 1/10 = (2 + 3)/30 = 5/30 = 1/6 ⇒ h = 6 m.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 27,
    question_text: "The angle of elevation of a cloud C from a point P, 200 m above a still lake is 30°. If the angle of depression of the image of C in the lake from the point P is 60°, then PC (in m) is equal to",
    options: [
      "100",
      "200√3",
      "400",
      "400√3"
    ],
    correct_index: 2,
    solution: "Let H be the height of the cloud C above the surface of the lake. Point P is 200 m above the lake, so the height of C above P is H - 200, and the depth of the reflection of C below P is H + 200. Let d be the horizontal distance from P to C. tan 30° = (H - 200) / d ⇒ d = √3(H - 200). tan 60° = (H + 200) / d ⇒ d = (H + 200) / √3. Equating d: √3(H - 200) = (H + 200) / √3 ⇒ 3(H - 200) = H + 200 ⇒ 2H = 800 ⇒ H = 400 m. In right triangle for PC: sin 30° = (H - 200) / PC = 200 / PC ⇒ 1/2 = 200 / PC ⇒ PC = 400 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 28,
    question_text: "The angle of elevation of the top of a hill from a point on the horizontal plane passing through the foot of the hill is found to be 45°. After walking a distance of 80 meters towards the top, up a slope inclined at angle of 30° to the horizontal plane the angle of elevation of the top of the hill becomes 75°. Then the height of the hill (in meters) is",
    options: [],
    correct_index: 80,
    question_type: "integer",
    solution: "Let the foot of the hill be C and top be D with height CD = h. From initial point A on ground, angle of elevation is 45°, so AC = h. Walking 80 m along a 30° slope brings one to point B with horizontal displacement = 80 cos 30° = 40√3 m and vertical displacement = 80 sin 30° = 40 m. From B, remaining horizontal distance to hill = h - 40√3 and vertical height to top = h - 40. Angle of elevation is 75°: tan 75° = (h - 40) / (h - 40√3). Since tan 75° = 2 + √3: (2 + √3)(h - 40√3) = h - 40 ⇒ (2 + √3)h - 80√3 - 120 = h - 40 ⇒ (1 + √3)h = 80(1 + √3) ⇒ h = 80 meters.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 29,
    question_text: "The angle of elevation of the summit of a mountain from a point on the ground is 45°. After climbing up one km towards the summit at an inclination of 30° from the ground, the angle of elevation of the summit is found to be 60°. Then the height (in km) of the summit from the ground is :",
    options: [
      "(√3 - 1) / (√3 + 1)",
      "(√3 + 1) / (√3 - 1)",
      "1 / (√3 - 1)",
      "1 / (√3 + 1)"
    ],
    correct_index: 2,
    solution: "Let the height of summit be h km. Initially from ground, angle of elevation is 45°, so horizontal distance = h. After climbing 1 km at 30° inclination, horizontal displacement = 1 · cos 30° = √3/2 km, and vertical displacement = 1 · sin 30° = 1/2 km. New horizontal distance = h - √3/2, new vertical height = h - 1/2. Angle of elevation is 60°: tan 60° = (h - 1/2) / (h - √3/2) ⇒ √3(h - √3/2) = h - 1/2 ⇒ √3 h - 3/2 = h - 1/2 ⇒ (√3 - 1)h = 1 ⇒ h = 1 / (√3 - 1) km.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 30,
    question_text: "Two vertical poles are 150 m apart and the height of one is three times that of the other. If from the middle point of the line joining their feet, an observer finds the angles of elevation of their tops to be complementary, then the height of the shorter pole (in meters) is:",
    options: [
      "25",
      "30",
      "20√3",
      "25√3"
    ],
    correct_index: 3,
    solution: "Let the shorter pole have height h and the taller pole 3h. Distance between them is 150 m, so the midpoint is 75 m from each pole. The angles of elevation are θ and 90° - θ. tan θ = h / 75 and tan(90° - θ) = cot θ = 3h / 75. Since tan θ · cot θ = 1: (h / 75) · (3h / 75) = 1 ⇒ 3h² / 75² = 1 ⇒ h² = 75² / 3 = 1875 ⇒ h = 25√3 metres.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 31,
    question_text: "The angle of elevation of a jet plane from a point A on the ground is 60°. After a flight of 20 seconds at the speed of 432 km/hour, the angle of elevation changes to 30°. If the jet plane is flying at a constant height, then its height is:",
    options: [
      "1200√3 m",
      "2400√3 m",
      "1800√3 m",
      "3600√3 m"
    ],
    correct_index: 0,
    solution: "Speed of jet plane = 432 km/h = 432 × (5/18) = 120 m/s. Distance travelled in 20 s = 120 × 20 = 2400 m. Let h be the constant height. Initially tan 60° = h / y ⇒ y = h / √3. After 20 s: tan 30° = h / (y + 2400) ⇒ y + 2400 = √3 h. Substituting y: √3 h - h / √3 = 2400 ⇒ (2 / √3) h = 2400 ⇒ h = 1200√3 metres.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 32,
    question_text: "A man is observing, from the top of a tower, a boat speeding towards the tower from a certain point A, with uniform speed. At that point, angle of depression of the boat with the man's eye is 30° (ignore man's height). After sailing for 20 seconds, towards the base of the tower (which is at the level of water), the boat has reached a point B, where the angle of depression is 45°. Then the time taken (in seconds) by the boat from B to reach the base of the tower is :",
    options: [
      "10",
      "10(√3 - 1)",
      "10√3",
      "10(√3 + 1)"
    ],
    correct_index: 3,
    solution: "Let h be the height of the tower and C be its base. At A: AC = h cot 30° = √3 h. At B: BC = h cot 45° = h. Distance AB = AC - BC = h(√3 - 1). Speed of boat v = AB / 20 = h(√3 - 1) / 20. Remaining distance to base is BC = h. Time taken = BC / v = h / [h(√3 - 1) / 20] = 20 / (√3 - 1) = 10(√3 + 1) seconds.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 33,
    question_text: "A pole stands vertically inside a triangular park ABC. Let the angle of elevation of the top of the pole from each corner of the park be π/3. If the radius of the circumcircle of △ABC is 2, then the height of the pole is equal to",
    options: [
      "3√3",
      "2√3",
      "√3",
      "1/√3"
    ],
    correct_index: 1,
    solution: "Since the angle of elevation of the top of the pole from all three vertices A, B, and C is the same (π/3), the foot of the pole must be equidistant from A, B, and C. Hence, the foot of the pole is the circumcentre of △ABC, and its distance to each vertex is the circumradius R = 2. Let h be the height of the pole: tan(π/3) = h / R ⇒ √3 = h / 2 ⇒ h = 2√3.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 34,
    question_text: "A spherical gas balloon of radius 16 meter subtends an angle 60° at the eye of the observer A while the angle of elevation of its center from the eye of A is 75°. Then the height (in meter) of the top most point of the balloon from the level of the observer's eye is :",
    options: [
      "8(2 + 2√3 + √2)",
      "8(√6 + √2 + 2)",
      "8(√2 + 2 + √3)",
      "8(√6 - √2 + 2)"
    ],
    correct_index: 1,
    solution: "Let O be the centre of the balloon of radius r = 16 m. Tangents from eye A subtend 60°, so half-angle is 30°. In the tangent triangle: sin 30° = r / OA ⇒ OA = 16 / sin 30° = 32 m. The angle of elevation of the centre O is 75°. Vertical height of centre O = OA sin 75° = 32 × [(√6 + √2) / 4] = 8(√6 + √2) m. The topmost point is at height r = 16 m above O. Total height = 8(√6 + √2) + 16 = 8(√6 + √2 + 2) metres.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 35,
    question_text: "Two poles AB of length a metres and CD of length a + b (b ≠ a) metres are erected at the same horizontal level with bases at B and D. If BD = x and tan ∠ACB = 1/2, then:",
    options: [
      "x² + 2(a + 2b)x - b(a + b) = 0",
      "x² + 2(a + 2b)x + a(a + b) = 0",
      "x² - 2ax + b(a + b) = 0",
      "x² - 2ax + a(a + b) = 0"
    ],
    correct_index: 2,
    solution: "With B as origin (0,0), A is at (0, a) and C is at (x, a + b). Slope of line BC = (a + b) / x. Slope of line AC = [(a + b) - a] / (x - 0) = b / x. The angle between BC and AC is ∠ACB = θ with tan θ = 1/2. tan θ = |(m_BC - m_AC) / (1 + m_BC · m_AC)| = [(a / x)] / [1 + b(a + b)/x²] = ax / [x² + b(a + b)]. Thus, 1/2 = ax / [x² + b(a + b)] ⇒ x² + b(a + b) = 2ax ⇒ x² - 2ax + b(a + b) = 0.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 36,
    question_text: "A vertical pole fixed to the horizontal ground is divided in the ratio 3 : 7 by a mark on it with lower part shorter than the upper part. If the two parts subtend equal angles at a point on the ground 18 m away from the base of the pole, then the height of the pole (in meters) is :",
    options: [
      "8√10",
      "6√10",
      "12√10",
      "4√10"
    ],
    correct_index: 2,
    solution: "Let lower part be 3x and upper part 7x, so total height = 10x. Let point P be at distance 18 m. If each part subtends angle θ at P, then tan θ = 3x / 18 = x / 6 and tan 2θ = 10x / 18 = 5x / 9. Using tan 2θ = 2 tan θ / (1 - tan² θ): 5x / 9 = (x / 3) / [1 - x²/36] ⇒ 5/9 = 12 / (36 - x²) ⇒ 5(36 - x²) = 108 ⇒ 180 - 5x² = 108 ⇒ 5x² = 72 ⇒ x = √(72/5) = 6√2 / √5. Height of pole = 10x = 10 × 6√2 / √5 = 60√10 / 5 = 12√10 metres.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 37,
    question_text: "Let AB and PQ be two vertical poles, 160 m apart from each other. Let C be the middle point of B and Q, which are feet of these two poles. Let π/8 and θ be the angles of elevation from C to P and A, respectively. If the height of pole PQ is twice the height of pole AB, then tan² θ is equal to",
    options: [
      "(3 - 2√2) / 2",
      "(3 + 2√2) / 2",
      "(3 - 2√2) / 4",
      "(3 - √2) / 4"
    ],
    correct_index: 2,
    solution: "Let BC = CQ = x = 80 m. Let AB = h and PQ = 2h. From C to P: tan(π/8) = PQ / CQ = 2h / x ⇒ tan(π/8) = 2(h / x). From C to A: tan θ = AB / BC = h / x. Therefore, tan θ = (1/2) tan(π/8). Since tan(π/8) = √2 - 1: tan θ = (√2 - 1) / 2 ⇒ tan² θ = (√2 - 1)² / 4 = (3 - 2√2) / 4.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 38,
    question_text: "From the base of a pole of height 20 meter, the angle of elevation of the top of a tower is 60°. The pole subtends an angle 30° at the top of the tower. Then the height of the tower is:",
    options: [
      "15√3",
      "50√3",
      "20 + 10√3",
      "30"
    ],
    correct_index: 3,
    solution: "Let the pole be AB = 20 m and the tower be CD of height H = 20 + y with base D and top C. From base B of pole: tan 60° = (20 + y) / x ⇒ x = (20 + y) / √3. From top A of pole, horizontal line meets CD at E such that ED = 20 and CE = y. The pole AB subtends 30° at C, so ∠ACE = 30°: tan 30° = x / y ⇒ 1/√3 = x / y ⇒ x = y / √3. Equating x: (20 + y) / √3 = y / √3... wait: in △AEC, tan 30° = AE / CE = x / y (or y/x, where x is horizontal and y is vertical: tan 30° = y / x ⇒ x = y√3). Then (20 + y) / √3 = y√3 ⇒ 20 + y = 3y ⇒ 2y = 20 ⇒ y = 10 m. Height of tower = 20 + y = 30 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 39,
    question_text: "A tower PQ stands on a horizontal ground with base Q on the ground. The point R divides the tower in two parts such that QR = 15 m. If from a point A on the ground the angle of elevation of R is 60° and the part PR of the tower subtends an angle of 15° at A, then the height of the tower is",
    options: [
      "5(2√3 + 3) m",
      "5(√3 + 3) m",
      "10(√3 + 1) m",
      "10(2√3 + 1) m"
    ],
    correct_index: 0,
    solution: "In right △AQR: tan 60° = QR / AQ = 15 / AQ ⇒ AQ = 15 / √3 = 5√3 m. The part PR subtends 15° at A, so the angle of elevation of top P from A is ∠PAQ = 60° + 15° = 75°. In right △AQP: tan 75° = PQ / AQ ⇒ PQ = AQ · tan 75° = 5√3(2 + √3) = 10√3 + 15 = 5(2√3 + 3) m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 40,
    question_text: "Let a vertical tower AB of height 2h stands on a horizontal ground. Let from a point P on the ground a man can see upto height h of the tower with an angle of elevation 2α. When from P, he moves a distance d in the direction of AP, he can see the top B of the tower with an angle of elevation α. If d = √7 h, then tan α is equal to",
    options: [
      "√7 - √5",
      "√3 - 1",
      "√7 - 2",
      "√7 - √3"
    ],
    correct_index: 2,
    solution: "From point P: tan 2α = h / AP ⇒ AP = h cot 2α. Moving distance d = √7 h further to point P': AP' = AP + d = h(cot 2α + √7). From P', angle of elevation of top B (height 2h) is α: tan α = 2h / AP' = 2 / (cot 2α + √7) ⇒ cot 2α + √7 = 2 / tan α. Let t = tan α: (1 - t²) / (2t) + √7 = 2 / t ⇒ 1 - t² + 2√7 t = 4 ⇒ t² - 2√7 t + 3 = 0. Solving quadratic: t = [2√7 ± √(28 - 12)] / 2 = √7 ± 2. Since α < 45° (as 2α < 90°), tan α < 1. Hence, tan α = √7 - 2.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 41,
    question_text: "The angle of elevation of the top P of a vertical tower PQ of height 10 from a point A on the horizontal ground is 45°. Let R be a point on AQ and from a point B, vertically above R, the angle of elevation of P is 60°. If ∠BAQ = 30°, AB = d and the area of the trapezium PQRB is α, then the ordered pair (d, α) is",
    options: [
      "(10(√3 - 1), 25)",
      "(10(√3 - 1), 25/2)",
      "(10(√3 + 1), 25)",
      "(10(√3 + 1), 25/2)"
    ],
    correct_index: 0,
    solution: "In right △APQ: tan 45° = PQ / AQ = 10 / AQ ⇒ AQ = 10. In right △ABR: AR = d cos 30° = (√3/2)d, BR = d sin 30° = d/2. Then QR = AQ - AR = 10 - (√3/2)d. From B, angle of elevation of P is 60°: tan 60° = (PQ - BR) / QR ⇒ √3 = (10 - d/2) / [10 - (√3/2)d] ⇒ √3[10 - (√3/2)d] = 10 - d/2 ⇒ 10√3 - (3/2)d = 10 - d/2 ⇒ d = 10(√3 - 1). Then BR = 5(√3 - 1) and QR = 5(√3 - 1). Area of trapezium PQRB = (1/2)(PQ + BR) · QR = (1/2)[10 + 5(√3 - 1)] · 5(√3 - 1) = (1/2)(5√3 + 5)(5√3 - 5) = (25/2)(3 - 1) = 25. Thus, (d, α) = (10(√3 - 1), 25).",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 42,
    question_text: "A horizontal park is in the shape of a triangle OAB with AB = 16. A vertical lamp post OP is erected at the point O such that ∠PAO = ∠PBO = 15° and ∠PCO = 45°, where C is the midpoint of AB. Then (OP)² is equal to",
    options: [
      "(32 / √3)(√3 - 1)",
      "(32 / √3)(2 - √3)",
      "(16 / √3)(√3 - 1)",
      "(16 / √3)(2 - √3)"
    ],
    correct_index: 1,
    solution: "Let OP = h. In right △PAO and △PBO: OA = OB = h cot 15°. Since OA = OB and C is the midpoint of AB, OC ⊥ AB and AC = 8. In right △OCA: OA² = OC² + AC² = OC² + 64. In right △PCO: ∠PCO = 45° ⇒ OC = h cot 45° = h. Thus, h² cot² 15° = h² + 64 ⇒ h²(cot² 15° - 1) = 64. Since cot 15° = 2 + √3: cot² 15° - 1 = (7 + 4√3) - 1 = 6 + 4√3 = 2√3(2 + √3). Therefore, h² = 64 / [2√3(2 + √3)] = 32 / [√3(2 + √3)] = (32 / √3)(2 - √3).",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 43,
    question_text: "The angle of elevation of the top of a tower from a point A due north of it is α and from a point B at a distance of 9 units due west of A is cos⁻¹(3/√13). If the distance of the point B from the tower is 15 units, then cot α is equal to",
    options: [
      "6/5",
      "9/5",
      "4/3",
      "7/3"
    ],
    correct_index: 0,
    solution: "Let O be the base of tower of height h. A is due north of O and B is 9 units due west of A, so △OAB is right-angled at A with AB = 9 and OB = 15. OA = √(OB² - AB²) = √(225 - 81) = √144 = 12 units. From B, angle of elevation is β with cos β = 3/√13 ⇒ tan β = 2/3. In right △OPB: tan β = h / OB ⇒ 2/3 = h / 15 ⇒ h = 10 units. From A, angle of elevation is α: tan α = h / OA = 10 / 12 = 5/6 ⇒ cot α = 6/5.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 44,
    question_text: "From the top A of a vertical wall AB of height 30 m, the angles of depression of the top P and bottom Q of a vertical tower PQ are 15° and 60° respectively, B and Q are on the same horizontal level. If C is a point on AB such that CB = PQ, then the area (in m²) of the quadrilateral BCPQ is equal to",
    options: [
      "300(√3 - 1)",
      "300(√3 + 1)",
      "600(√3 - 1)",
      "200(√3 - 1)"
    ],
    correct_index: 2,
    solution: "In right △ABQ: tan 60° = AB / BQ ⇒ √3 = 30 / BQ ⇒ BQ = 10√3 m. Let tower height PQ = h. Since CB = PQ = h, CP = BQ = 10√3 m and AC = 30 - h. From A, angle of depression of P is 15°: tan 15° = AC / CP = (30 - h) / (10√3). Since tan 15° = 2 - √3: 30 - h = 10√3(2 - √3) = 20√3 - 30 ⇒ h = 60 - 20√3 m. The quadrilateral BCPQ is a rectangle of dimensions h × BQ: Area = (60 - 20√3) × 10√3 = 600√3 - 600 = 600(√3 - 1) m².",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 45,
    question_text: "The angle of elevation of the top P of a tower from the feet of one person standing due south of the tower is 45° and from the feet of another person standing due west of the tower is 30°. If the height of the tower is 5 meters, then the distance (in meters) between the two persons is equal to",
    options: [
      "5/2",
      "10",
      "5",
      "5√5"
    ],
    correct_index: 1,
    solution: "Let O be the base of the tower and P be its top with OP = 5 m. Person A is due south: tan 45° = OP / OA ⇒ OA = 5 m. Person B is due west: tan 30° = OP / OB ⇒ OB = 5 / (1/√3) = 5√3 m. Since South and West directions are perpendicular, ∠AOB = 90°. Distance AB = √(OA² + OB²) = √(5² + (5√3)²) = √(25 + 75) = √100 = 10 metres.",
    marks: 4,
    difficulty: "easy"
  }
];

