export const heightsBatch1 = [
  {
    question_number: 1,
    question_text: "The upper 3/4 th portion of a vertical pole subtends an angle tan⁻¹(3/5) at a point in the horizontal plane through its foot and at a distance 40 m from the foot. The possible height of the pole is",
    options: [
      "80 m",
      "20 m",
      "40 m",
      "80 m"
    ],
    correct_index: 0,
    solution: "Let total height of pole be h. The lower 1/4th portion has height h/4 and the upper 3/4th portion has height 3h/4. Let α be the angle subtended by lower portion and θ by the whole pole. tan α = (h/4)/40 = h/160, tan θ = h/40. The upper portion subtends angle β = θ - α with tan β = 3/5. tan β = (tan θ - tan α) / (1 + tan θ tan α) ⇒ 3/5 = (3h/160) / (1 + h²/6400) ⇒ h² - 200h + 6400 = 0 ⇒ (h - 40)(h - 160) = 0. Hence h = 40 m or 160 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 2,
    question_text: "A particle moves towards east from a point A to a point B at the rate of 4 km/h and then towards north from B to C at the rate of 5 km/h. If AB = 12 km and BC = 5 km, then its average speed for its journey from A to C and resultant average velocity direct from A to C are respectively",
    options: [
      "17/4 km/h and 13/4 km/h",
      "13/4 km/h and 17/4 km/h",
      "17/9 km/h and 13/9 km/h",
      "13/9 km/h and 17/9 km/h"
    ],
    correct_index: 0,
    solution: "Time taken from A to B: T₁ = 12/4 = 3 hrs. Time taken from B to C: T₂ = 5/5 = 1 hr. Total time = 4 hrs. Total distance = 12 + 5 = 17 km. Average speed = 17/4 km/h. Displacement AC = √(12² + 5²) = 13 km. Resultant average velocity = 13/4 km/h.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 3,
    question_text: "A person standing on the bank of a river observes that the angle of elevation of the top of a tree on the opposite bank of the river is 60° and when he retires 40 meter away from the tree the angle of elevation becomes 30°. The breadth of the river is",
    options: [
      "20 m",
      "30 m",
      "40 m",
      "60 m"
    ],
    correct_index: 0,
    solution: "Let the breadth of the river be b and height of the tree be h. In right triangle at the bank: tan 60° = h/b ⇒ h = √3b. When retiring 40 m away: tan 30° = h / (40 + b) ⇒ 1/√3 = √3b / (40 + b) ⇒ 3b = 40 + b ⇒ 2b = 40 ⇒ b = 20 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 4,
    question_text: "A tower stands at the centre of a circular park. A and B are two points on the boundary of the park such that AB(= a) subtends an angle of 60° at the foot of the tower, and the angle of elevation of the top of the tower from A or B is 30°. The height of the tower is",
    options: [
      "2a / √3",
      "2a√3",
      "a / √3",
      "a√3"
    ],
    correct_index: 2,
    solution: "Let O be the centre of the circular park (foot of the tower). OA = OB = radius r. Since ∠AOB = 60° and OA = OB, ΔOAB is equilateral, so OA = OB = AB = a. Let h be the height of the tower. In right triangle formed by tower and OA: tan 30° = h / OA = h / a ⇒ h = a tan 30° = a / √3.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 5,
    question_text: "AB is a vertical pole with B at the ground level and A at the top. A man finds that the angle of elevation of the point A from a certain point C on the ground is 60°. He moves away from the pole along the line BC to a point D such that CD = 7 m. From D the angle of elevation of the point A is 45°. Then the height of the pole is",
    options: [
      "(7√3 / 2) · (1 / (√3 - 1)) m",
      "(7√3 / 2) · (√3 + 1) m",
      "(7√3 / 2) · (√3 - 1) m",
      "(7√3 / 2) · (1 / (√3 + 1)) m"
    ],
    correct_index: 1,
    solution: "Let BC = x and height AB = h. In ΔABC: AB = x tan 60° = x√3 ⇒ x = h / √3. In ΔABD: AB = (x + 7) tan 45° = x + 7 ⇒ h = x + 7 ⇒ h - h/√3 = 7 ⇒ h(√3 - 1)/√3 = 7 ⇒ h = 7√3 / (√3 - 1) = (7√3/2)(√3 + 1) m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 6,
    question_text: "If two vertical poles 20 m and 80 m high stand apart on a horizontal plane, then the height (in m) of the point of intersection of the lines joining the top of each pole to the foot of other is",
    options: [
      "16",
      "18",
      "50",
      "15"
    ],
    correct_index: 0,
    solution: "For two poles of heights h₁ and h₂, the height of the intersection of cross-lines to their bases is given by h = (h₁ · h₂) / (h₁ + h₂). Here h = (20 × 80) / (20 + 80) = 1600 / 100 = 16 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 7,
    question_text: "ABCD is a trapezium such that AB and CD are parallel and BC ⊥ CD. If ∠ADB = θ, BC = p and CD = q, then AB is equal to",
    options: [
      "(p² + q²) / (p² cos θ + q² sin θ)",
      "((p² + q²) sin θ) / (p cos θ + q sin θ)²",
      "((p² + q²) sin θ) / (p cos θ + q sin θ)",
      "(p² + q² cos θ) / (p cos θ + q sin θ)"
    ],
    correct_index: 2,
    solution: "Let ∠BDC = α, so tan α = BC/CD = p/q. Draw AE ⊥ CD. AE = BC = p, and ∠ADE = α + θ. In right triangle ΔAED: ED = p / tan(α + θ). AB = q - ED = q - p / tan(α + θ). Substituting tan(α + θ) and simplifying yields AB = ((p² + q²) sin θ) / (p cos θ + q sin θ).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 8,
    question_text: "A bird is sitting on the top of a vertical pole 20m high and its elevation from a point O on the ground is 45°. It flies off horizontally straight away from the point O. After one second, the elevation of the bird from O is reduced to 30°. Then the speed (in m/s) of the bird is",
    options: [
      "20√2",
      "20(√3 - 1)",
      "40(√2 - 1)",
      "40(√3 - √2)"
    ],
    correct_index: 1,
    solution: "Initial distance AO = 20 / tan 45° = 20 m. After 1 second, the bird is at distance BO = 20 / tan 30° = 20√3 m. Distance covered in 1 second = BO - AO = 20√3 - 20 = 20(√3 - 1) m. Hence speed = 20(√3 - 1) m/s.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 9,
    question_text: "The angle of elevation of the top of a vertical tower from a point P on the horizontal ground was observed to be α. After moving a distance 2 metres from P towards the foot of the tower, the angle of elevation changes to β. Then the height (in metres) of the tower is:",
    options: [
      "(2 sin α sin β) / sin(β - α)",
      "(sin α sin β) / cos(β - α)",
      "(2 sin(β - α)) / (sin α sin β)",
      "cos(β - α) / (sin α sin β)"
    ],
    correct_index: 0,
    solution: "Let height of tower be h. Distance from P to foot is h cot α. After moving 2 m towards the foot, distance is h cot β. Then h cot α - h cot β = 2 ⇒ h[(cos α / sin α) - (cos β / sin β)] = 2 ⇒ h sin(β - α) / (sin α sin β) = 2 ⇒ h = (2 sin α sin β) / sin(β - α).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 10,
    question_text: "If the angles of elevation of the top of a tower from three collinear points A, B and C on a line leading to the foot of the tower are 30°, 45° and 60° respectively, then the ratio AB : BC, is",
    options: [
      "2 : 3",
      "√3 : 1",
      "√3 : √2",
      "1 : √3"
    ],
    correct_index: 1,
    solution: "Let height of tower be h. Distance from foot D: AD = h cot 30° = √3h, BD = h cot 45° = h, CD = h cot 60° = h/√3. Then AB = AD - BD = (√3 - 1)h, and BC = BD - CD = h - h/√3 = ((√3 - 1)/√3)h. Ratio AB : BC = (√3 - 1)h / [((√3 - 1)/√3)h] = √3 : 1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 11,
    question_text: "Let 10 vertical poles standing at equal distances on a straight line, subtend the same angle of elevation α at a point O on this line and all the poles are on the same side of O. If the height of the longest pole is h and the distance of the foot of the smallest pole from O is a; then the distance between two consecutive poles, is",
    options: [
      "(h sin α + a cos α) / (9 cos α)",
      "(h cos α - a sin α) / (9 sin α)",
      "(h sin α + a cos α) / (9 sin α)",
      "(h cos α - a sin α) / (9 cos α)"
    ],
    correct_index: 1,
    solution: "Let b be the distance between consecutive poles. The distance from O to the 10th (longest) pole is a + 9b. Since it subtends angle α and has height h: tan α = h / (a + 9b) ⇒ a + 9b = h cot α = h cos α / sin α ⇒ 9b = (h cos α - a sin α) / sin α ⇒ b = (h cos α - a sin α) / (9 sin α).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 12,
    question_text: "A man is walking towards a vertical pillar in a straight path, at a uniform speed. At a certain point A on the path, he observes that the angle of elevation of the top of the pillar is 30°. After walking for 10 minutes from A in the same direction, at a point B, he observes that the angle of elevation of the top of the pillar is 60°. Then the time taken (in minutes) by him, from B to reach the pillar, is",
    options: [
      "20",
      "5",
      "6",
      "10"
    ],
    correct_index: 1,
    solution: "Let pillar height be h. Distance AP = h cot 30° = √3h. Distance BP = h cot 60° = h/√3. Distance walked AB = x = √3h - h/√3 = 2h/√3. Remaining distance BP = y = h/√3 = x/2. Since distance BP is half of AB and speed is uniform, time taken from B to pillar is 10 / 2 = 5 minutes.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 13,
    question_text: "The angle of elevation of the top of a vertical tower from a point A, due east of it is 45°. The angle of elevation of the top of the same tower from a point B, due south of A is 30°. If the distance between A and B is 54√2 m, then the height of the tower (in meters), is:",
    options: [
      "108",
      "36√3",
      "54√3",
      "54"
    ],
    correct_index: 3,
    solution: "Let foot of tower be P and height be H. PA = H cot 45° = H. B is due south of A, so in right triangle ΔPAB, PB² = PA² + AB² = H² + (54√2)². From B, angle of elevation is 30°, so PB = H cot 30° = √3H ⇒ PB² = 3H². Thus H² + (54√2)² = 3H² ⇒ 2H² = 2 × 54² ⇒ H = 54 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 14,
    question_text: "Let a vertical tower AB have its end A on the level ground. Let C be the mid-point of AB and P be a point on the ground such that AP = 2AB. If ∠BPC = β, then tan β is equal to:",
    options: [
      "6/7",
      "1/4",
      "2/9",
      "4/9"
    ],
    correct_index: 2,
    solution: "Let AB = 2h, so AC = h. Given AP = 2AB = 4h. Let ∠APC = α. tan α = AC / AP = h / (4h) = 1/4. In right triangle ΔPAB: tan(α + β) = AB / AP = 2h / (4h) = 1/2. tan β = tan((α + β) - α) = (1/2 - 1/4) / (1 + (1/2)(1/4)) = (1/4) / (9/8) = 2/9.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 15,
    question_text: "PQR is a triangular park with PQ = PR = 200m. A T.V. tower stands at the mid-point of QR. If the angles of elevation of the top of the tower at P, Q and R are respectively, 45°, 30° and 30°, then the height of the tower (in m) is:",
    options: [
      "50√2",
      "100",
      "50",
      "100√3"
    ],
    correct_index: 1,
    solution: "Let M be the midpoint of QR and h be the height of the tower. PM = h cot 45° = h, and QM = RM = h cot 30° = √3h. Since ΔPQR is isosceles with PQ = PR = 200m, median PM is perpendicular to QR. In right triangle ΔPMQ: PQ² = PM² + QM² ⇒ 200² = h² + 3h² = 4h² ⇒ h² = 10000 ⇒ h = 100 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 16,
    question_text: "An aeroplane flying at a constant speed, parallel to the horizontal ground, √3km above it is observed at an elevation of 60° from a point on the ground. If after five seconds, its elevation from the same point is 30°, then the speed (in km/hr) of the aeroplane is",
    options: [
      "720",
      "1500",
      "750",
      "1440"
    ],
    correct_index: 3,
    solution: "Height h = √3 km. Initial distance AC = h cot 60° = √3 · (1/√3) = 1 km. After 5 seconds, distance A'C = h cot 30° = √3 · √3 = 3 km. Horizontal distance travelled = 3 - 1 = 2 km in 5 seconds. Speed = 2 km / (5/3600 hr) = 1440 km/hr.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 17,
    question_text: "An aeroplane flying at a constant speed, parallel to the horizontal ground, √3 km above it, is observed at an elevation of 60° from a point on the ground. If, after five seconds, its elevation from the same point, is 30°, then the speed (in km/hr) of the aeroplane is",
    options: [
      "1500",
      "750",
      "720",
      "1440"
    ],
    correct_index: 3,
    solution: "Height h = √3 km. Distance covered in 5 sec = √3 cot 30° - √3 cot 60° = 3 - 1 = 2 km. Speed = 2 km / 5 s = (2 / 5) × 3600 km/hr = 1440 km/hr.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 18,
    question_text: "A tower T₁ of height 60 m is located exactly opposite to a tower T₂ of height 80 m on a straight road. From the top of T₁, if the angle of depression of the foot of T₂ is twice the angle of elevation of the top of T₂, then the width (in m) of the road between the feet of the towers T₁ and T₂ is",
    options: [
      "20√2",
      "10√2",
      "10√3",
      "20√3"
    ],
    correct_index: 3,
    solution: "Let road width be x. Height difference = 80 - 60 = 20 m. Let angle of elevation of top of T₂ from top of T₁ be θ. tan θ = 20/x. Angle of depression of foot of T₂ is 2θ. tan 2θ = 60/x. Using tan 2θ = 2 tan θ / (1 - tan²θ): 60/x = (40/x) / (1 - 400/x²) ⇒ 3/2 = 1 / (1 - 400/x²) ⇒ 1 - 400/x² = 2/3 ⇒ 400/x² = 1/3 ⇒ x² = 1200 ⇒ x = 20√3 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 19,
    question_text: "A man on the top of a vertical tower observes a car moving at a uniform speed towards the tower on a horizontal road. If it takes 18 min for the angle of depression of the car to change from 30° to 45°, then the time taken (in min) by the car to reach the foot of the tower is",
    options: [
      "(9/2)(√3 - 1)",
      "18(1 + √3)",
      "18(√3 - 1)",
      "9(1 + √3)"
    ],
    correct_index: 3,
    solution: "Let tower height be h. At 45°, distance to foot is h. At 30°, distance is √3h. Distance travelled in 18 min is (√3 - 1)h. Speed = (√3 - 1)h / 18. Remaining distance to foot = h. Time to reach foot = h / speed = 18 / (√3 - 1) = 9(√3 + 1) min.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 20,
    question_text: "Consider a triangular plot ABC with sides AB = 7m, BC = 5m and CA = 6m. A vertical lamp-post at the mid-point D of AC subtends an angle 30° at B. The height (in m) of the lamp-post is:",
    options: [
      "2√21",
      "(2/3)√21",
      "(3/2)√21",
      "7√3"
    ],
    correct_index: 1,
    solution: "By Apollonius theorem on median BD to side AC: AB² + BC² = 2(BD² + AD²). 49 + 25 = 2(BD² + 9) ⇒ 74 = 2(BD² + 9) ⇒ BD² = 28 ⇒ BD = 2√7 m. In right triangle formed by lamp-post of height h at D: tan 30° = h / BD ⇒ h = 2√7 / √3 = (2/3)√21 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 21,
    question_text: "If the angle of elevation of a cloud from a point P which is 25m above a lake be 30° and the angle of depression of reflection of the cloud in the lake from P be 60°, then the height of the cloud (in meters) from the surface of the lake is :",
    options: [
      "50",
      "60",
      "45",
      "42"
    ],
    correct_index: 0,
    solution: "Let x be the height of the cloud above the lake. Distance above P is x - 25. Depth of reflection below P is x + 25. Horizontal distance d = (x - 25) / tan 30° = (x + 25) / tan 60° ⇒ (x - 25)√3 = (x + 25)/√3 ⇒ 3(x - 25) = x + 25 ⇒ 2x = 100 ⇒ x = 50 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 22,
    question_text: "Two vertical poles of height, 20m and 80m stand apart on a horizontal plane. The height (in meters) of the point of intersection of the lines joining the top of each pole to the foot of the other, from this horizontal plane is:",
    options: [
      "16",
      "12",
      "18",
      "15"
    ],
    correct_index: 0,
    solution: "The height of intersection h = (h₁ · h₂) / (h₁ + h₂) = (20 × 80) / (20 + 80) = 1600 / 100 = 16 m.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 23,
    question_text: "Two poles standing on a horizontal ground are of heights 5m and 10m respectively. The line joining their tops makes an angle of 15° with the ground. Then the distance (in m) between the poles, is",
    options: [
      "10(√3 - 1)",
      "(5/2)(2 + √3)",
      "5(2 + √3)",
      "5(√3 + 1)"
    ],
    correct_index: 2,
    solution: "Difference in height = 10 - 5 = 5 m. Let distance between poles be d. tan 15° = 5 / d ⇒ d = 5 / tan 15° = 5 / (2 - √3) = 5(2 + √3) m.",
    marks: 4,
    difficulty: "medium"
  }
];

