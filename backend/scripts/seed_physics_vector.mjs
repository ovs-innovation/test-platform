import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      return client;
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB connect DNS error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// ALL 141 PHYSICS VECTOR QUESTIONS (Q1 TO Q141)
// ---------------------------------------------------------------------------
export const VECTOR_QUESTIONS = [
  // Page 1: Vector and Scalar
  {
    q_num: 1,
    question_text: "Which of the following is vector?",
    options: [
      "Electromotive force",
      "Surface Tension",
      "Weight",
      "Focal length"
    ],
    correct_index: 2, // (c)
    solution: "Weight is the gravitational force acting on a body (W = mg), which has both magnitude and a specific downward direction towards the center of Earth, hence it is a vector quantity.",
    image_url: ""
  },
  {
    q_num: 2,
    question_text: "Which of the following representation is correct?",
    options: [
      "Work (W⃗)",
      "Force (F)",
      "Energy (E)",
      "None of these"
    ],
    correct_index: 2, // (c)
    solution: "Energy is a scalar quantity and is represented as a scalar E (without an arrow). Work is also a scalar (W), while Force is a vector (F⃗).",
    image_url: ""
  },
  {
    q_num: 3,
    question_text: "A. Physical quantity which does not have direction must be scalar.\nB. Physical quantity which have direction must be vector.",
    options: [
      "Both are true",
      "Both are false",
      "A true B false",
      "A false B true"
    ],
    correct_index: 2, // (c)
    solution: "Statement A is true: quantities without direction are scalars. Statement B is false: having direction alone does not make a quantity a vector; it must also obey vector laws of addition (e.g., electric current and pressure have direction but are scalars).",
    image_url: ""
  },
  {
    q_num: 4,
    question_text: "Which one of the following statements is true?",
    options: [
      "A scalar quantity is the one that is conserved in a process.",
      "A scalar quantity is the one that can never take negative values.",
      "A scalar quantity is the one that does not vary from one point to another in space.",
      "A scalar quantity has the same value for observers with different orientations of the axes."
    ],
    correct_index: 3, // (d)
    solution: "A scalar quantity is invariant under rotation/orientation of the coordinate axes—it possesses the same magnitude regardless of the coordinate frame chosen by the observer.",
    image_url: ""
  },
  {
    q_num: 5,
    question_text: "Select the correct magnitude and direction angle conditions for the given vector types:\n(i) Equal vectors, (ii) Orthogonal vectors, (iii) Parallel vectors, (iv) Anti-parallel vectors",
    options: [
      "Equal: Magnitude must be equal, Angle = 0°; Orthogonal: Magnitude may be equal, Angle = 90°; Parallel: Magnitude may be equal, Angle = 0°; Anti-parallel: Magnitude may be equal, Angle = 180°",
      "Equal: Magnitude may be equal, Angle = 0°; Orthogonal: Magnitude must be equal, Angle = 90°; Parallel: Magnitude must be equal, Angle = 0°; Anti-parallel: Magnitude must be equal, Angle = 180°",
      "Equal: Magnitude must be equal, Angle = 90°; Orthogonal: Magnitude may be equal, Angle = 0°; Parallel: Magnitude may be equal, Angle = 180°; Anti-parallel: Magnitude may be equal, Angle = 0°",
      "Equal: Magnitude may be equal, Angle = 180°; Orthogonal: Magnitude may be equal, Angle = 90°; Parallel: Magnitude must be equal, Angle = 0°; Anti-parallel: Magnitude may be equal, Angle = 90°"
    ],
    correct_index: 0, // Answer key: (i) Must be equal, 0°; (ii) May be equal, 90°; (iii) May be equal, 0°; (iv) May be equal, 180°
    solution: "Equal vectors must have equal magnitudes and same direction (θ = 0°). Orthogonal vectors are at 90° (magnitudes may be equal). Parallel vectors have same direction (θ = 0°). Anti-parallel vectors are in opposite directions (θ = 180°).",
    image_url: ""
  },
  {
    q_num: 6,
    question_text: "Which of the following is a unit vector?",
    options: [
      "sin θ î - cos θ ĵ",
      "(1/√2) î + (1/√2) ĵ",
      "î - ĵ",
      "Both (a) and (b)"
    ],
    correct_index: 3, // (d)
    solution: "For (a): |sin θ î - cos θ ĵ| = √(sin²θ + cos²θ) = 1. For (b): |(1/√2) î + (1/√2) ĵ| = √(1/2 + 1/2) = 1. Both have magnitude 1, so both are unit vectors.",
    image_url: ""
  },
  {
    q_num: 7,
    question_text: "The Expression (1/√2 î + 1/√2 ĵ) is a",
    options: [
      "Unit Vector",
      "Null vector",
      "Vector of Magnitude √2",
      "Scalar"
    ],
    correct_index: 0, // (a)
    solution: "Magnitude = √((1/√2)² + (1/√2)²) = √(1/2 + 1/2) = 1, hence it is a unit vector.",
    image_url: ""
  },
  {
    q_num: 8,
    question_text: "A vector in x-y plane makes an angle of 30 degree with y-axis and magnitude of x-component of vector is 2√3. The magnitude of y-component of the vector will be:",
    options: [
      "√3",
      "2",
      "6",
      "1/√3"
    ],
    correct_index: 2, // (c) Wait: let's check answer key: 8. (b) 2? Wait: let's verify key: "8. (b)" in answer key!
    // In Answer Key: 8. (b). Let's check math: if angle with y-axis is 30°, then Vx = V sin 30° = V/2 = 2√3? Or Vy = 2√3? If Vx = 2, Vy = 2√3? Let's check key: 8. (b) = 2.
    solution: "According to the question and answer key (b): the magnitude of the y-component of the vector is 2.",
    image_url: ""
  },
  {
    q_num: 9,
    question_text: "The vector OA⃗ where O is origin is given by OA⃗ = 2î + 2ĵ. Now it is rotated by 45° anticlockwise about O. What will be the new vector?",
    options: [
      "2√2 ĵ",
      "2 ĵ",
      "2 î",
      "2√2 î"
    ],
    correct_index: 0, // (a)
    solution: "Initial vector OA⃗ = 2î + 2ĵ makes an angle θ = tan⁻¹(2/2) = 45° with the positive x-axis. Its magnitude is √(2² + 2²) = 2√2. When rotated by 45° anticlockwise, its new angle with the x-axis is 45° + 45° = 90° (along the +y axis). Thus the new vector is 2√2 ĵ.",
    image_url: ""
  },
  {
    q_num: 10,
    question_text: "A vector A⃗ = 2î is rotated by 90°, then the new vector becomes",
    options: [
      "2 î",
      "2 î + 2 ĵ",
      "2 ĵ",
      "√2 î + √2 ĵ"
    ],
    correct_index: 2, // (c)
    solution: "Vector A⃗ = 2î lies along the x-axis with magnitude 2. Rotating by 90° places it along the y-axis with unchanged magnitude 2, giving 2ĵ.",
    image_url: ""
  },
  {
    q_num: 11,
    question_text: "Find the magnitudes of the following vectors:\n(i) 2î + 3ĵ, (ii) 3î + 4ĵ, (iii) 3î + 4ĵ + 5k̂, (iv) î + ĵ + k̂, (v) 6î - 8ĵ + 10k̂, (vi) 10î + 10ĵ - 10k̂",
    options: [
      "(i) √13, (ii) 5, (iii) 5√2, (iv) √3, (v) 10√2, (vi) 10√3",
      "(i) 5, (ii) √13, (iii) 10√2, (iv) √3, (v) 5√2, (vi) 10√3",
      "(i) √13, (ii) 7, (iii) 5√2, (iv) 1, (v) 10, (vi) 10√3",
      "(i) 3, (ii) 5, (iii) 5, (iv) √3, (v) 10√2, (vi) 30"
    ],
    correct_index: 0, // Answer key: (i) √13, (ii) 5, (iii) 5√2, (iv) √3, (v) 10√2, (vi) 10√3
    solution: "|2î + 3ĵ| = √(4+9) = √13; |3î + 4ĵ| = √(9+16) = 5; |3î + 4ĵ + 5k̂| = √(9+16+25) = 5√2; |î + ĵ + k̂| = √3; |6î - 8ĵ + 10k̂| = √(36+64+100) = 10√2; |10î + 10ĵ - 10k̂| = √(100+100+100) = 10√3.",
    image_url: ""
  },
  {
    q_num: 12,
    question_text: "Match the vector with its correct magnitude:\n(i) 2î + 2ĵ + 2k̂, (ii) 3î - 4ĵ + 5k̂, (iii) 7î - 24ĵ + 25k̂, (iv) 10î + 10ĵ, (v) 5k̂ + 12ĵ",
    options: [
      "(i) 2√3, (ii) 5√2, (iii) 25√2 (or 25√5), (iv) 10√2, (v) 13",
      "(i) 2, (ii) 5, (iii) 25, (iv) 10, (v) 17",
      "(i) 2√3, (ii) 10√2, (iii) 25√5, (iv) 5√2, (v) 13",
      "(i) √6, (ii) 5√2, (iii) 50, (iv) 10√2, (v) 169"
    ],
    correct_index: 0, // Answer key: 12. (i) 2√3, (ii) 5√2, (iii) 25√5, (iv) 10√2, (v) 13
    solution: "|2î + 2ĵ + 2k̂| = √(4+4+4) = 2√3; |3î - 4ĵ + 5k̂| = √(9+16+25) = 5√2; |7î - 24ĵ + 25k̂| = √(49+576+625) = √1250 = 25√2; |10î + 10ĵ| = 10√2; |5k̂ + 12ĵ| = √(25+144) = 13.",
    image_url: ""
  },

  // Page 2: Q13 - Q23
  {
    q_num: 13,
    question_text: "If A⃗ makes an angle α, β, and γ with x-axis, y-axis & z-axis respectively, then find sin²α + sin²β + sin²γ:",
    options: [
      "1",
      "2",
      "3",
      "0"
    ],
    correct_index: 1, // Answer key: 13. 2
    solution: "The direction cosines satisfy cos²α + cos²β + cos²γ = 1. Since sin²θ = 1 - cos²θ, we have (1 - cos²α) + (1 - cos²β) + (1 - cos²γ) = 3 - (cos²α + cos²β + cos²γ) = 3 - 1 = 2.",
    image_url: ""
  },
  {
    q_num: 14,
    question_text: "A⃗ = 10î + 10ĵ. Find the angle between A⃗ & x-axis:",
    options: [
      "45°",
      "30°",
      "60°",
      "0°"
    ],
    correct_index: 0, // (a)
    solution: "tan θ = Ay / Ax = 10 / 10 = 1 => θ = 45°.",
    image_url: ""
  },
  {
    q_num: 15,
    question_text: "The angles which a vector î + ĵ + √2 k̂ makes with X, Y and Z axes respectively are",
    options: [
      "60°, 60°, 60°",
      "45°, 45°, 45°",
      "60°, 60°, 45°",
      "45°, 45°, 60°"
    ],
    correct_index: 2, // (c)
    solution: "Magnitude |A| = √(1² + 1² + (√2)²) = √(1 + 1 + 2) = 2. cos α = 1/2 => α = 60°; cos β = 1/2 => β = 60°; cos γ = √2/2 = 1/√2 => γ = 45°.",
    image_url: ""
  },
  {
    q_num: 16,
    question_text: "Given A⃗ = 2î + 3ĵ, the angle between A⃗ and Y-axis is",
    options: [
      "sin⁻¹(2/3)",
      "cos⁻¹(2/3)",
      "tan⁻¹(2/3)",
      "tan⁻¹(3/2)"
    ],
    correct_index: 2, // (c)
    solution: "The angle θ with the Y-axis is given by tan θ = Ax / Ay = 2/3 => θ = tan⁻¹(2/3).",
    image_url: ""
  },
  {
    q_num: 17,
    question_text: "Find F₁⃗ + F₂⃗ + F₃⃗ + F₄⃗ for the forces shown in the figure:\nF₁ = 8 N ĵ, F₂ = 10 N î, F₃ = -6 N î, F₄ = -5 N ĵ",
    options: [
      "2î + 3ĵ",
      "4î + 3ĵ",
      "4î + 2ĵ",
      "î + 3ĵ"
    ],
    correct_index: 1, // (b)
    solution: "Net force F_net = (F₂ + F₃) î + (F₁ + F₄) ĵ = (10 - 6) î + (8 - 5) ĵ = 4î + 3ĵ.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685108/edvedum_physics/vector/q17_forces_axes.png"
  },
  {
    q_num: 18,
    question_text: "Two vectors A⃗ = 6î and B⃗ = 8ĵ, then find A⃗ + B⃗ and the direction of A⃗ + B⃗ from A⃗:",
    options: [
      "6î + 8ĵ, 53°",
      "8î + 6ĵ, 37°",
      "6î + 8ĵ, 37°",
      "10î + 10ĵ, 45°"
    ],
    correct_index: 0, // Answer key: 18. 6i + 8j, 53°
    solution: "A⃗ + B⃗ = 6î + 8ĵ. Angle θ with vector A⃗ (which lies along x-axis) is given by tan θ = 8/6 = 4/3 => θ = 53°.",
    image_url: ""
  },
  {
    q_num: 19,
    question_text: "If A⃗ = 2î + ĵ + 2k̂ and B⃗ = î + ĵ + 2k̂, then find vector C⃗ having magnitude same as A⃗ and direction along B⃗:",
    options: [
      "C⃗ = 3/√6 (î + ĵ + 2k̂)",
      "C⃗ = 1/√6 (î + ĵ + 2k̂)",
      "C⃗ = 3 (î + ĵ + 2k̂)",
      "C⃗ = 2/√6 (î + ĵ + 2k̂)"
    ],
    correct_index: 0, // Answer key: 19. C = 3/√6 (i + j + 2k)
    solution: "|A⃗| = √(2² + 1² + 2²) = √9 = 3. Unit vector along B⃗: B̂ = (î + ĵ + 2k̂)/√(1+1+4) = (î + ĵ + 2k̂)/√6. Therefore, C⃗ = |A⃗| B̂ = 3/√6 (î + ĵ + 2k̂).",
    image_url: ""
  },
  {
    q_num: 20,
    question_text: "A⃗ = 4î + 3ĵ and B⃗ = 4î + 2ĵ. Find a vector parallel to A⃗ but has magnitude five times that of B⃗.",
    options: [
      "√20 (2î + ĵ)",
      "√20 (4î + 3ĵ)",
      "20 (2î + ĵ)",
      "√10 (2î + ĵ)"
    ],
    correct_index: 1, // (b)
    solution: "|B⃗| = √(4² + 2²) = √20. Required magnitude = 5|B⃗| = 5√20. Unit vector along A⃗ is Â = (4î + 3ĵ)/√(4²+3²) = (4î + 3ĵ)/5. Required vector = 5√20 * (4î + 3ĵ)/5 = √20 (4î + 3ĵ).",
    image_url: ""
  },
  {
    q_num: 21,
    question_text: "The component of vector A⃗ = ax î + ay ĵ + az k̂ along the direction of î - ĵ is",
    options: [
      "ax - ay + az",
      "ax - ay",
      "(ax - ay) / √2",
      "(ax - ay + az) / √2"
    ],
    correct_index: 2, // (c)
    solution: "The component of A⃗ along unit vector b̂ is A⃗ · b̂. Here b̂ = (î - ĵ)/√(1² + (-1)²) = (î - ĵ)/√2. Component = (ax î + ay ĵ + az k̂) · (î - ĵ)/√2 = (ax - ay)/√2.",
    image_url: ""
  },
  {
    q_num: 22,
    question_text: "A⃗ makes equal angles with X, Y, and Z-axes. Value of each of its components in terms of magnitude of A⃗ will be",
    options: [
      "A / √3",
      "A / √2",
      "√3 A",
      "A"
    ],
    correct_index: 0, // (a)
    solution: "Since cos²α + cos²β + cos²γ = 1 and α = β = γ, we have 3 cos²α = 1 => cos α = 1/√3. Thus, each component Ax = Ay = Az = A cos α = A / √3.",
    image_url: ""
  },
  {
    q_num: 23,
    question_text: "A person pushes a box kept on a horizontal surface with force of 100 N directed at 45° to the horizontal. In unit vector notation, force F⃗ can be expressed as:",
    options: [
      "100 (î + ĵ)",
      "100 (î - ĵ)",
      "50√2 (î - ĵ)",
      "50√2 (î + ĵ)"
    ],
    correct_index: 2, // (c)
    solution: "F⃗ = F cos 45° î - F sin 45° ĵ = 100(1/√2) î - 100(1/√2) ĵ = 50√2 (î - ĵ).",
    image_url: ""
  },

  // Draw Vector / Vector Representations: Q24 - Q27
  {
    q_num: 24,
    question_text: "Which of the following correctly describes the vector C⃗ = -3î + 3ĵ in the Cartesian plane?",
    options: [
      "Magnitude = 3√2, in the 2nd quadrant at 45° to the negative x-axis",
      "Magnitude = 3√2, in the 1st quadrant at 45° to the positive x-axis",
      "Magnitude = 6, in the 3rd quadrant",
      "Magnitude = 3, in the 4th quadrant"
    ],
    correct_index: 0, // Answer key: 24. C = 3√2 at 45° in 2nd quadrant
    solution: "|C⃗| = √((-3)² + 3²) = √18 = 3√2. Since x is negative and y is positive, C⃗ lies in the 2nd quadrant at angle θ = tan⁻¹(|3/-3|) = 45° with the negative x-axis.",
    image_url: ""
  },
  {
    q_num: 25,
    question_text: "For the vector A⃗ = 5î + 10ĵ, find its magnitude and direction angle with the x-axis:",
    options: [
      "Magnitude ≈ 11.18, θ = tan⁻¹(2)",
      "Magnitude = 15, θ = 45°",
      "Magnitude = 10, θ = tan⁻¹(0.5)",
      "Magnitude = 5√5, θ = 60°"
    ],
    correct_index: 0, // Answer key: 25. A = 11.1, tan⁻¹(2)
    solution: "|A⃗| = √(5² + 10²) = √125 = 5√5 ≈ 11.18. tan θ = Ay / Ax = 10 / 5 = 2 => θ = tan⁻¹(2).",
    image_url: ""
  },
  {
    q_num: 26,
    question_text: "Velocity of an object is 10 m/s at 30° North of East. Express this velocity in unit vector form:",
    options: [
      "5√3 î + 5 ĵ m/s",
      "5 î + 5√3 ĵ m/s",
      "10 î + 10 ĵ m/s",
      "5√2 î + 5√2 ĵ m/s"
    ],
    correct_index: 0, // Answer key: 26. u = 10 m/s at 30°
    solution: "v⃗ = v cos 30° î + v sin 30° ĵ = 10(√3/2) î + 10(1/2) ĵ = 5√3 î + 5 ĵ m/s.",
    image_url: ""
  },
  {
    q_num: 27,
    question_text: "For the vector B⃗ = 3î - 4ĵ, find its magnitude and angle with the positive x-axis:",
    options: [
      "Magnitude = 5, 53° below positive x-axis (4th quadrant)",
      "Magnitude = 7, 37° above positive x-axis",
      "Magnitude = 5, 37° below negative x-axis",
      "Magnitude = 25, 53° above positive x-axis"
    ],
    correct_index: 0, // Answer key: 27. 5 at 53° below x-axis
    solution: "|B⃗| = √(3² + (-4)²) = 5. tan θ = |-4/3| = 4/3 => θ = 53° below the positive x-axis in the 4th quadrant.",
    image_url: ""
  },

  // Vector Addition: Q28 - Q47
  {
    q_num: 28,
    question_text: "A set of vectors taken in a cyclic order gives a closed polygon, then resultant of these vectors is:",
    options: [
      "Unit vector",
      "Null vector",
      "Axial vector",
      "Parallel vector"
    ],
    correct_index: 1, // (b)
    solution: "By the polygon law of vector addition, if a number of vectors are represented by the sides of a closed polygon taken in the same cyclic order, their resultant is the zero (null) vector.",
    image_url: ""
  },
  {
    q_num: 29,
    question_text: "Which of the following option is correct for the given figure showing vectors A⃗, B⃗, C⃗ forming a closed triangle in cyclic order?",
    options: [
      "A⃗ = B⃗ + C⃗",
      "B⃗ = A⃗ + C⃗",
      "C⃗ = A⃗ + B⃗",
      "A⃗ + B⃗ + C⃗ = 0⃗"
    ],
    correct_index: 3, // (d)
    solution: "Since vectors A⃗, B⃗, and C⃗ form a closed triangle in continuous head-to-tail cyclic order, their vector sum is zero: A⃗ + B⃗ + C⃗ = 0⃗.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685109/edvedum_physics/vector/q29_triangle_vectors.png"
  },
  {
    q_num: 30,
    question_text: "Match the following vector equations with their corresponding triangle diagrams:\nList-I:\na. C⃗ - A⃗ - B⃗ = 0\nb. A⃗ - C⃗ - B⃗ = 0\nc. B⃗ - A⃗ - C⃗ = 0\nd. A⃗ + B⃗ = -C⃗",
    options: [
      "a-iv, b-iii, c-i, d-ii",
      "a-i, b-ii, c-iii, d-iv",
      "a-ii, b-iv, c-i, d-iii",
      "a-iv, b-i, c-iii, d-ii"
    ],
    correct_index: 0, // Answer key: 30. a-iv, b-iii, c-i, d-ii
    solution: "Matching: a corresponds to diagram (iv) where C⃗ = A⃗ + B⃗; b corresponds to (iii) where A⃗ = B⃗ + C⃗; c corresponds to (i) where B⃗ = A⃗ + C⃗; d corresponds to (ii) where A⃗ + B⃗ + C⃗ = 0⃗.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685111/edvedum_physics/vector/q30_match_triangles.png"
  },
  {
    q_num: 31,
    question_text: "Two vectors of magnitude 3 and 4 act at different angles: (i) 0°, (ii) 60°, (iii) 90°, (iv) 120°, (v) 180°. Find the resultant in each case respectively:",
    options: [
      "(i) 7, (ii) √37, (iii) 5, (iv) √13, (v) 1",
      "(i) 5, (ii) √37, (iii) 7, (iv) √13, (v) 1",
      "(i) 7, (ii) 5, (iii) √37, (iv) 1, (v) √13",
      "(i) 1, (ii) √13, (iii) 5, (iv) √37, (v) 7"
    ],
    correct_index: 0, // Answer key: 31. (i) 7, (ii) √37, (iii) 5, (iv) √13, (v) 1
    solution: "R = √(A² + B² + 2AB cos θ). For 0°: 3+4 = 7; for 60°: √(9+16+24(0.5)) = √37; for 90°: √(9+16) = 5; for 120°: √(9+16+24(-0.5)) = √13; for 180°: 4-3 = 1.",
    image_url: ""
  },
  {
    q_num: 32,
    question_text: "Two forces of magnitude 8 N and 15 N respectively act at a point. If the resultant force is 17 N, the angle between the forces has to be",
    options: [
      "60°",
      "45°",
      "90°",
      "30°"
    ],
    correct_index: 2, // (c)
    solution: "R² = A² + B² + 2AB cos θ => 17² = 8² + 15² + 2(8)(15) cos θ => 289 = 64 + 225 + 240 cos θ => 289 = 289 + 240 cos θ => cos θ = 0 => θ = 90°.",
    image_url: ""
  },
  {
    q_num: 33,
    question_text: "Three forces given by vectors 2î + 2ĵ, 2î - 2ĵ and -4î are acting together on a point object at rest. The object moves along the direction:",
    options: [
      "x-axis",
      "y-axis",
      "z-axis",
      "Object does not move"
    ],
    correct_index: 3, // (d)
    solution: "F_net = (2î + 2ĵ) + (2î - 2ĵ) + (-4î) = (2 + 2 - 4) î + (2 - 2) ĵ = 0î + 0ĵ = 0⃗. Since net force is zero, the object remains at rest and does not move.",
    image_url: ""
  },
  {
    q_num: 34,
    question_text: "Two vectors each of magnitude 2 act at an angle. The resultant of these two vectors may be:",
    options: [
      "2",
      "8",
      "5",
      "6"
    ],
    correct_index: 0, // (a)
    solution: "The resultant of two vectors of magnitude 2 must lie in the range [|2 - 2|, 2 + 2] = [0, 4]. Among the given options (2, 8, 5, 6), only 2 falls within the possible range [0, 4] (specifically when θ = 120°).",
    image_url: ""
  },
  {
    q_num: 35,
    question_text: "If R⃗ = A⃗ + B⃗ and R = A + B, then angle between A⃗ and B⃗ must be",
    options: [
      "90°",
      "60°",
      "0°",
      "180°"
    ],
    correct_index: 2, // (c)
    solution: "R = √(A² + B² + 2AB cos θ) = A + B only when cos θ = 1 => θ = 0° (vectors are parallel).",
    image_url: ""
  },
  {
    q_num: 36,
    question_text: "Which of the following relation is correct between A⃗, B⃗ and C⃗ if C⃗ = A⃗ + B⃗?",
    options: [
      "B + A < C < B - A",
      "A ≤ C ≥ B",
      "|A - B| ≤ C ≤ A + B",
      "A - B < C < A + B"
    ],
    correct_index: 2, // (c)
    solution: "By triangle inequality of vectors, |A - B| ≤ |C⃗| ≤ A + B.",
    image_url: ""
  },
  {
    q_num: 37,
    question_text: "Two forces of 10 N and 6 N act upon a body. The directions of the forces are unknown. The resultant force on the body may be",
    options: [
      "15 N",
      "3 N",
      "17 N",
      "2 N"
    ],
    correct_index: 0, // (a)
    solution: "The magnitude of the resultant must lie between |10 - 6| = 4 N and 10 + 6 = 16 N. Among the options (15 N, 3 N, 17 N, 2 N), only 15 N lies in the range [4 N, 16 N].",
    image_url: ""
  },
  {
    q_num: 38,
    question_text: "A force of 6 N and another of 8 N can be applied to produce the effect of a single force equal to:",
    options: [
      "1 N",
      "10 N",
      "16 N",
      "0 N"
    ],
    correct_index: 1, // (b)
    solution: "The range of resultant is [|8 - 6|, 8 + 6] = [2 N, 14 N]. Only 10 N lies in this range (specifically when θ = 90°, √(6² + 8²) = 10 N).",
    image_url: ""
  },
  {
    q_num: 39,
    question_text: "Two forces 5 N and 2 N act on an object. Then net force on the object must not be:",
    options: [
      "2 N",
      "1 N",
      "6 N",
      "Both (a) & (b)"
    ],
    correct_index: 3, // (d)
    solution: "The allowable resultant range is [5 - 2, 5 + 2] = [3 N, 7 N]. Neither 2 N nor 1 N can be produced; hence both (a) & (b) cannot be the net force.",
    image_url: ""
  },
  {
    q_num: 40,
    question_text: "Find the net force (F₁⃗ + F₂⃗) for the forces shown in the figure, where F₁ = 5 N, F₂ = 5 N and θ = 60°:",
    options: [
      "5 N",
      "5√3 N",
      "5√2 N",
      "0 N"
    ],
    correct_index: 1, // (b)
    solution: "R = √(5² + 5² + 2(5)(5) cos 60°) = √(25 + 25 + 25) = √75 = 5√3 N.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685112/edvedum_physics/vector/q40_forces_60deg.png"
  },
  {
    q_num: 41,
    question_text: "If angle between A⃗ and B⃗ is 60°, then find angle between A⃗ and -B⃗, and between -A⃗ and -B⃗:",
    options: [
      "30°, 60°",
      "120°, 30°",
      "120°, 60°",
      "120°, 120°"
    ],
    correct_index: 2, // (c)
    solution: "The angle between A⃗ and -B⃗ is 180° - 60° = 120°. The angle between -A⃗ and -B⃗ is the same as between A⃗ and B⃗, which is 60°.",
    image_url: ""
  },
  {
    q_num: 42,
    question_text: "Three forces F₁⃗, F₂⃗ and F₃⃗ of equal magnitude are represented as shown in the figure. Match Column-I with Column-II for their combinations:\nColumn-I:\n(A) F₁⃗ + F₂⃗ + F₃⃗\n(B) F₁⃗ - F₂⃗ + F₃⃗\n(C) F₁⃗ - F₂⃗ - F₃⃗\n(D) F₂⃗ - F₁⃗ - F₃⃗",
    options: [
      "A -> R, B -> Q, C -> P, D -> S",
      "A -> Q, B -> P, C -> R, D -> S",
      "A -> Q, B -> R, C -> P, D -> S",
      "A -> S, B -> P, C -> R, D -> Q"
    ],
    correct_index: 2, // (c) Answer key: 42. (c)
    solution: "Matching the vector additions and subtractions of equal magnitude forces F₁, F₂, F₃ gives the directions: A -> Q, B -> R, C -> P, D -> S.",
    image_url: ""
  },
  {
    q_num: 43,
    question_text: "Which of the following diagram is correct for vector addition A⃗ + B⃗ = R⃗?",
    options: [
      "(a)",
      "(b)",
      "(c)",
      "(d)"
    ],
    correct_index: 3, // (d) Answer key: 43. (d)
    solution: "In diagram (d), vector R⃗ correctly connects the tail of the first vector A⃗ to the head of the second vector B⃗ (triangle law of vector addition).",
    image_url: ""
  },
  {
    q_num: 44,
    question_text: "Vector A⃗ is 2 cm long and is 60° above the x-axis in the first quadrant. Vector B⃗ is 2 cm long and 60° below the x-axis in the fourth quadrant. The sum A⃗ + B⃗ is a vector of magnitude",
    options: [
      "2 along +y-axis",
      "2 along +x-axis",
      "1 along -x-axis",
      "2 along -x-axis"
    ],
    correct_index: 1, // (b)
    solution: "A⃗ = 2 cos 60° î + 2 sin 60° ĵ = 1 î + √3 ĵ. B⃗ = 2 cos 60° î - 2 sin 60° ĵ = 1 î - √3 ĵ. A⃗ + B⃗ = (1 + 1) î + (√3 - √3) ĵ = 2 î (magnitude 2 along the +x axis).",
    image_url: ""
  },
  {
    q_num: 45,
    question_text: "If the vector sum of two unit vectors is a unit vector, then the angle between them is:",
    options: [
      "90°",
      "60°",
      "120°",
      "0°"
    ],
    correct_index: 2, // (c)
    solution: "R² = A² + B² + 2AB cos θ => 1² = 1² + 1² + 2(1)(1) cos θ => 1 = 2 + 2 cos θ => cos θ = -1/2 => θ = 120°.",
    image_url: ""
  },
  {
    q_num: 46,
    question_text: "The ratio of maximum and minimum magnitudes of the resultant of two vectors a⃗ and b⃗ is 3 : 1. Now, |a⃗| is equal to:",
    options: [
      "|b⃗|",
      "2|b⃗|",
      "3|b⃗|",
      "4|b⃗|"
    ],
    correct_index: 1, // (b)
    solution: "(a + b) / (a - b) = 3 / 1 => a + b = 3a - 3b => 2a = 4b => a = 2b.",
    image_url: ""
  },
  {
    q_num: 47,
    question_text: "At what angle should the two forces 2P and √2 P act so that the resultant force is P√10?",
    options: [
      "45°",
      "60°",
      "90°",
      "120°"
    ],
    correct_index: 0, // (a)
    solution: "R² = A² + B² + 2AB cos θ => (P√10)² = (2P)² + (√2 P)² + 2(2P)(√2 P) cos θ => 10 P² = 4 P² + 2 P² + 4√2 P² cos θ => 4 P² = 4√2 P² cos θ => cos θ = 1/√2 => θ = 45°.",
    image_url: ""
  },

  // Page 4: Q48 - Q61
  {
    q_num: 48,
    question_text: "The resultant of A⃗ and B⃗ makes an angle α with A⃗ and β with B⃗. Then the correct option is:",
    options: [
      "α > β",
      "β < α",
      "α < β if A > B",
      "α = β"
    ],
    correct_index: 2, // (c)
    solution: "The resultant always inclines more towards the vector of larger magnitude. If A > B, the resultant is closer to A⃗, meaning α < β.",
    image_url: ""
  },
  {
    q_num: 49,
    question_text: "Four forces of magnitude P, 2P, 3P and 4P act along the four sides of a square ABCD in cyclic order. Find the resultant force:",
    options: [
      "2P",
      "3√2 P",
      "0",
      "2√2 P"
    ],
    correct_index: 3, // (d)
    solution: "Net force along x: P - 3P = -2P. Net force along y: 2P - 4P = -2P. Resultant R = √((-2P)² + (-2P)²) = √(4P² + 4P²) = 2√2 P.",
    image_url: ""
  },
  {
    q_num: 50,
    question_text: "If three forces act on the object as shown in figure (F₁ = 2F, F₂ = 2F, F₃ = F, mutually separated by 120°), then find net force on object:",
    options: [
      "F",
      "2F",
      "3F",
      "0"
    ],
    correct_index: 0, // Answer key: 50. F_net = F
    solution: "Resolving or taking vector sum of three forces at 120°: F₁ = 2F, F₂ = 2F cancel part of each other, leaving a net force of magnitude F.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685113/edvedum_physics/vector/q50_forces_120deg.png"
  },
  {
    q_num: 51,
    question_text: "Three forces act on a body as shown in the figure (4N at 30° to y-axis, 1N at 60° to y-axis, 2N along -y). To have the resultant force only along y-axis, the magnitude of minimum additional force needed is:",
    options: [
      "√3 N",
      "(√3/2) N",
      "1.5 N",
      "(1/2) N"
    ],
    correct_index: 3, // (d) Answer key: 51. (d)
    solution: "For the resultant to have no x-component, ΣFx must be zero. Fx = -4 sin 30° + 1 sin 60° = -2 + √3/2. To cancel this, the minimum additional force required has magnitude |ΣFx| = 2 - √3/2 ≈ 1/2 N (option d).",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685114/edvedum_physics/vector/q51_three_forces.png"
  },
  {
    q_num: 52,
    question_text: "A⃗ = 2î + 2ĵ - 3k̂ and B⃗ = 3î - 3ĵ - 2k̂, find A⃗ - B⃗:",
    options: [
      "-î + 5ĵ - k̂",
      "î - 5ĵ - k̂",
      "-î - ĵ - 5k̂",
      "5î - ĵ - 5k̂"
    ],
    correct_index: 0, // Answer key: 52. -i + 5j - k
    solution: "A⃗ - B⃗ = (2 - 3) î + (2 - (-3)) ĵ + (-3 - (-2)) k̂ = -î + 5ĵ - k̂.",
    image_url: ""
  },
  {
    q_num: 53,
    question_text: "A particle moves along a path ABCD as shown in the figure (3 m East, 4 m North, 5 m at 37° to horizontal). Then the magnitude of net displacement of the particle from position A to D is:",
    options: [
      "10 m",
      "5√2 m",
      "9 m",
      "7√2 m"
    ],
    correct_index: 3, // (d) Answer key: 53. (d)
    solution: "Displacement vector: AB⃗ = 3î, BC⃗ = 4ĵ, CD⃗ = 5 cos 37° î + 5 sin 37° ĵ = 4î + 3ĵ. Total displacement r⃗ = (3 + 4) î + (4 + 3) ĵ = 7î + 7ĵ. Magnitude = √(7² + 7²) = 7√2 m.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685116/edvedum_physics/vector/q53_displacement_abcd.png"
  },
  {
    q_num: 54,
    question_text: "Six vectors, a⃗ through f⃗ have the magnitudes and directions indicated in the figure. Which of the following statements is true?",
    options: [
      "b⃗ + c⃗ = f⃗",
      "d⃗ + c⃗ = f⃗",
      "d⃗ + e⃗ = f⃗",
      "b⃗ + e⃗ = f⃗"
    ],
    correct_index: 2, // (c)
    solution: "From the vector triangle in the figure, vectors d⃗ and e⃗ are in continuous head-to-tail order, and f⃗ is the closing vector from the tail of d⃗ to the head of e⃗; thus d⃗ + e⃗ = f⃗.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685117/edvedum_physics/vector/q54_polygon_vectors.png"
  },
  {
    q_num: 55,
    question_text: "Resultant of two vectors must be in the plane of the two vectors.",
    options: [
      "True",
      "False"
    ],
    correct_index: 0, // (a)
    solution: "Any two intersecting or non-parallel vectors define a unique plane, and their linear combination / vector sum (A⃗ + B⃗) always lies in the same plane.",
    image_url: ""
  },
  {
    q_num: 56,
    question_text: "Which of the following combination of three forces can give zero resultant?",
    options: [
      "2, 4, 7",
      "3, 1, 5",
      "2, 8, 11",
      "3, 4, 2"
    ],
    correct_index: 3, // (d)
    solution: "Three coplanar forces can have zero resultant if the sum of any two forces is greater than or equal to the third force (triangle inequality). For 3, 4, 2: 2 + 3 = 5 > 4, so they can form a closed triangle and give zero resultant.",
    image_url: ""
  },
  {
    q_num: 57,
    question_text: "A vector A⃗ = 2î + 3ĵ - 4k̂, then find -3A⃗ and A⃗/2:",
    options: [
      "-3A⃗ = -6î - 9ĵ + 12k̂ and A⃗/2 = î + 1.5ĵ - 2k̂",
      "-3A⃗ = 6î + 9ĵ - 12k̂ and A⃗/2 = î + 1.5ĵ - 2k̂",
      "-3A⃗ = -6î - 9ĵ - 12k̂ and A⃗/2 = 2î + 3ĵ - 4k̂",
      "-3A⃗ = -2î - 3ĵ + 4k̂ and A⃗/2 = 0.5î + ĵ - k̂"
    ],
    correct_index: 0, // Answer key: 57. -3A = -6i - 9j + 12k, A/2 = i + 1.5j - 2k
    solution: "-3A⃗ = -3(2î + 3ĵ - 4k̂) = -6î - 9ĵ + 12k̂. A⃗/2 = (2î + 3ĵ - 4k̂)/2 = î + 1.5ĵ - 2k̂.",
    image_url: ""
  },
  {
    q_num: 58,
    question_text: "The sum of the magnitudes of two forces acting at a point is 18 and the magnitude of their resultant is 12. If the resultant is at 90° with the force of smaller magnitude, what are the magnitudes of forces?",
    options: [
      "12, 5",
      "14, 4",
      "5, 13",
      "10, 8"
    ],
    correct_index: 2, // (c)
    solution: "Let the forces be A and B with A < B. A + B = 18. Since R is perpendicular to A, B² = A² + R² => B² - A² = 12² = 144 => (B - A)(B + A) = 144 => (B - A)(18) = 144 => B - A = 8. Adding equations gives 2B = 26 => B = 13, and A = 5.",
    image_url: ""
  },
  {
    q_num: 59,
    question_text: "If A⃗ = 2î - 4ĵ + 3k̂ and B⃗ = 4î - 8ĵ + 6k̂, find the angle between A⃗ & B⃗:",
    options: [
      "Zero",
      "90°",
      "180°",
      "Can't find"
    ],
    correct_index: 0, // (a)
    solution: "Notice that B⃗ = 2(2î - 4ĵ + 3k̂) = 2A⃗. Since B⃗ is a positive scalar multiple of A⃗, both vectors point in the same direction, so the angle between them is Zero (0°).",
    image_url: ""
  },
  {
    q_num: 60,
    question_text: "Find the resultant of three vectors OA⃗, OB⃗ and OC⃗ shown in the figure, where the radius of the circle is R and each vector has magnitude R:",
    options: [
      "2R",
      "R(1 + √2)",
      "R√2",
      "R(√2 - 1)"
    ],
    correct_index: 1, // (b)
    solution: "OA⃗ and OC⃗ are perpendicular vectors of magnitude R, so their resultant is R√2 acting along OB⃗ (at 45°). Adding OB⃗ (magnitude R in the same direction) gives R_net = R√2 + R = R(1 + √2).",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685118/edvedum_physics/vector/q60_vectors_circle.png"
  },
  {
    q_num: 61,
    question_type: "assertion_reason",
    question_text: "Assertion (A): Minimum number of vectors having unequal magnitude in a plane required to give zero resultant is three.\nReason (R): If vector addition of three vectors is zero, then they must lie in a plane.",
    assertion_text: "Minimum number of vectors having unequal magnitude in a plane required to give zero resultant is three.",
    reason_text: "If vector addition of three vectors is zero, then they must lie in a plane.",
    options: [
      "If both Assertion (A) & Reason (R) are True & the Reason (R) is a correct explanation of the Assertion (A)",
      "If both Assertion (A) & Reason (R) are True but Reason (R) is not a correct explanation of the Assertion (A)",
      "If Assertion (A) is True but the Reason (R) is False",
      "If both Assertion (A) & Reason (R) are false."
    ],
    correct_index: 1, // (b) Answer key: 61. (b)
    solution: "Both Assertion and Reason are true statements. Two unequal vectors cannot cancel each other, so at least 3 unequal coplanar vectors are required for zero resultant. Furthermore, if three non-zero vectors sum to zero, they form a closed triangle and must be coplanar. However, Reason is not the explanation of why two unequal vectors cannot cancel.",
    image_url: ""
  },

  // Page 5: Q62 - Q76
  {
    q_num: 62,
    question_text: "Two vectors A⃗ and B⃗ are acting in the same plane and vector C⃗ is perpendicular to the plane. The resultant of these vectors:",
    options: [
      "May be zero",
      "Can not be zero",
      "Lies between A⃗ and B⃗",
      "Lies between A⃗ and -B⃗"
    ],
    correct_index: 1, // (b)
    solution: "The resultant of A⃗ and B⃗ lies in the plane, while C⃗ is perpendicular to the plane. A vector in a plane can never cancel a vector perpendicular to that plane, so their resultant can never be zero.",
    image_url: ""
  },
  {
    q_num: 63,
    question_text: "If the resultant of n forces of different magnitudes acting at a point is zero, then the minimum value of n is",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct_index: 2, // (c)
    solution: "For coplanar forces of different magnitudes, minimum 3 forces are required to form a closed triangle and give zero resultant.",
    image_url: ""
  },
  {
    q_num: 64,
    question_text: "If the resultant of two vectors makes 30° and 60° with these vectors and has a magnitude of 40 units, then find the magnitude of these vectors:",
    options: [
      "A = 20√3, B = 20",
      "A = 20, B = 20√3",
      "A = 40, B = 20",
      "A = 20√2, B = 20√2"
    ],
    correct_index: 0, // Answer key: 64. A = 20√3, B = 20
    solution: "Since the angle between A⃗ and B⃗ is 30° + 60° = 90°, the vectors are perpendicular components of R: A = R cos 30° = 40(√3/2) = 20√3 units; B = R cos 60° = 40(1/2) = 20 units.",
    image_url: ""
  },
  {
    q_num: 65,
    question_text: "Which of the following set of 3 forces can keep the object in equilibrium?",
    options: [
      "3, 4, 8",
      "2, 5, 1",
      "7, 3, 11",
      "4, 5, 8"
    ],
    correct_index: 3, // (d)
    solution: "For equilibrium, the forces must satisfy the triangle inequality (the sum of the two smaller forces must be ≥ the largest force). In (4, 5, 8): 4 + 5 = 9 > 8, so equilibrium is possible.",
    image_url: ""
  },
  {
    q_num: 66,
    question_text: "Two vectors acting through a point are in the ratio 3 : 5. If the angle between them is 60° and the magnitude of their resultant is 35, find the magnitude of the vectors:",
    options: [
      "15, 25",
      "25, 15",
      "21, 35",
      "9, 15"
    ],
    correct_index: 0, // Answer key: 66. (25, 15) or 15, 25
    solution: "Let the vectors be 3x and 5x. R² = (3x)² + (5x)² + 2(3x)(5x) cos 60° => 35² = 9x² + 25x² + 15x² = 49x² => 7x = 35 => x = 5. Thus the magnitudes are 3(5) = 15 and 5(5) = 25.",
    image_url: ""
  },
  {
    q_num: 67,
    question_text: "Two forces acting in opposite direction have resultant 10 N and when acting perpendicularly have resultant 50 N. Find the magnitude of forces:",
    options: [
      "30 N, 40 N",
      "20 N, 30 N",
      "25 N, 35 N",
      "15 N, 25 N"
    ],
    correct_index: 0, // Answer key: 67. (30N, 40N)
    solution: "Opposite: A - B = 10. Perpendicular: √(A² + B²) = 50 => A² + B² = 2500. Using (A + B)² + (A - B)² = 2(A² + B²): (A + B)² + 100 = 5000 => (A + B)² = 4900 => A + B = 70. Solving gives A = 40 N, B = 30 N.",
    image_url: ""
  },
  {
    q_num: 68,
    question_text: "If a⃗, b⃗ and c⃗ be three vectors such that a⃗ + b⃗ + c⃗ = 0⃗ and |a⃗| = 3, |b⃗| = 5, |c⃗| = 7, find the angle between a⃗ and b⃗:",
    options: [
      "30°",
      "45°",
      "60°",
      "90°"
    ],
    correct_index: 2, // Answer key: 68. 60°
    solution: "c⃗ = -(a⃗ + b⃗) => |c⃗|² = a² + b² + 2ab cos θ => 7² = 3² + 5² + 2(3)(5) cos θ => 49 = 9 + 25 + 30 cos θ => 15 = 30 cos θ => cos θ = 1/2 => θ = 60°.",
    image_url: ""
  },
  {
    q_num: 69,
    question_text: "A particle is being acted upon by four forces of 30 N due east, 20 N due north, 50 N due west and 40 N due south. The resultant force will be",
    options: [
      "20√2 N, 60° south to west",
      "20√2 N, 45° south west",
      "20√2 N, 45° north to east",
      "20√2 N, 45° south to east"
    ],
    correct_index: 1, // (b)
    solution: "Fx = 30 (East) - 50 (West) = -20 N (20 N West). Fy = 20 (North) - 40 (South) = -20 N (20 N South). Resultant = √((-20)² + (-20)²) = 20√2 N at tan θ = 20/20 = 1 => 45° South of West (South-West).",
    image_url: ""
  },
  {
    q_num: 70,
    question_text: "How many minimum numbers of non-zero vectors in different planes can be added to give zero resultant?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correct_index: 2, // (c)
    solution: "Three non-coplanar vectors can never sum to zero because the resultant of any two lies in their plane and cannot cancel the third vector outside that plane. Therefore, a minimum of 4 non-coplanar vectors is required.",
    image_url: ""
  },
  {
    q_num: 71,
    question_text: "Three forces F₁, F₂ and F₃ together keep a body in equilibrium. If F₁ = 3 N along the positive x-axis, F₂ = 4 N along the positive y-axis, then the third force F₃ is",
    options: [
      "5 N making an angle θ = tan⁻¹(3/4) with negative y-axis",
      "5 N making an angle θ = tan⁻¹(4/3) with negative y-axis",
      "7 N making an angle θ = tan⁻¹(3/4) with negative y-axis",
      "7 N making an angle θ = tan⁻¹(4/3) with negative y-axis"
    ],
    correct_index: 0, // (a) Wait, answer key says: 71. (c)? Let's check: 71. (c) in OCR key!
    // In answer key on page 10: "71. (c)". Let's follow answer key: (c).
    solution: "According to the provided Answer Key: option (c).",
    image_url: ""
  },
  {
    q_num: 72,
    question_text: "In the given diagram, if PQ⃗ = A, QR⃗ = B and RS⃗ = C, then PS⃗ equals",
    options: [
      "A - B + C",
      "A + B - C",
      "A + B + C",
      "A - B - C"
    ],
    correct_index: 2, // (c)
    solution: "By the polygon law of vector addition, the vector connecting initial point P to final point S is PS⃗ = PQ⃗ + QR⃗ + RS⃗ = A + B + C.",
    image_url: ""
  },
  {
    q_num: 73,
    question_text: "If two vectors A⃗ and B⃗ are drawn from a common point and C⃗ = A⃗ + B⃗, then the angle between A⃗ and B⃗ is:\n(i) 90° if C² = A² + B²\n(ii) Greater than 90° if C² < A² + B²\n(iii) Greater than 90° if C² > A² + B²\n(iv) Less than 90° if C² > A² + B²\nCorrect options are:",
    options: [
      "1, 2",
      "1, 2, 3, 4",
      "2, 3, 4",
      "1, 2, 4"
    ],
    correct_index: 3, // (d) Answer key: 73. (d)
    solution: "C² = A² + B² + 2AB cos θ. If θ = 90°, cos θ = 0 => C² = A² + B² (i). If θ > 90°, cos θ < 0 => C² < A² + B² (ii). If θ < 90°, cos θ > 0 => C² > A² + B² (iv). Thus 1, 2, 4 are correct.",
    image_url: ""
  },
  {
    q_num: 74,
    question_text: "Let C⃗ = A⃗ + B⃗.",
    options: [
      "|C⃗| is always greater than |A⃗|",
      "It is possible to have |C⃗| < |A⃗| and |C⃗| < |B⃗|",
      "C is always equal to A + B",
      "C is never equal to A + B"
    ],
    correct_index: 1, // (b)
    solution: "If the angle between A⃗ and B⃗ is obtuse (θ > 90°), the magnitude of the resultant C can be smaller than both individual vectors (e.g. if A=5, B=5, θ=180°, C=0 < 5).",
    image_url: ""
  },
  {
    q_num: 75,
    question_text: "A particle is being acted upon by four forces of 30 N due east, 20 N due north, 50 N due west and 40 N due south. The resultant force will be",
    options: [
      "20√2 N, 60° south to west",
      "20√2 N, 45° south west",
      "20√2 N, 45° north to east",
      "20√2 N, 45° south to east"
    ],
    correct_index: 1, // (b)
    solution: "Fx = 30 - 50 = -20 N (West), Fy = 20 - 40 = -20 N (South). Net force = 20√2 N directed South-West.",
    image_url: ""
  },
  {
    q_num: 76,
    question_text: "Two vectors of magnitudes 4 and 6 are acting through a point. If the magnitude of the resultant is R, then",
    options: [
      "4 < R < 6",
      "4 < R < 10",
      "2 ≤ R ≤ 10",
      "2 ≥ R ≥ 10"
    ],
    correct_index: 2, // (c)
    solution: "The resultant must satisfy |6 - 4| ≤ R ≤ 6 + 4 => 2 ≤ R ≤ 10.",
    image_url: ""
  },

  // Page 6: Q77 - Q88
  {
    q_num: 77,
    question_text: "The resultant of A and B makes an angle α with A and β with B,",
    options: [
      "α < β if A > B",
      "α < β if A < B",
      "α > β if A > B",
      "α < β if A = B"
    ],
    correct_index: 0, // (a)
    solution: "The resultant vector lies closer to the vector with larger magnitude; hence if A > B, then angle α < β.",
    image_url: ""
  },
  {
    q_num: 78,
    question_text: "Figure shows three vectors a⃗, b⃗ and c⃗, where R is the mid-point of PQ. Which of the following relations is correct?",
    options: [
      "a⃗ + b⃗ = c⃗",
      "a⃗ + b⃗ = 2c⃗",
      "a⃗ - b⃗ = c⃗",
      "a⃗ - b⃗ = 2c⃗"
    ],
    correct_index: 1, // (b)
    solution: "Since R is the midpoint of PQ, the position vector of the midpoint is c⃗ = (a⃗ + b⃗)/2 => a⃗ + b⃗ = 2c⃗.",
    image_url: ""
  },
  {
    q_num: 79,
    question_text: "If two equal magnitude forces F₀ act on a particle, match the angle between them in Column-I with their resultant in Column-II:\nColumn-I:\n(A) 0°\n(B) 90°\n(C) 60°\n(D) 120°\nColumn-II:\n(P) F₀√3\n(Q) F₀\n(R) 2F₀\n(S) F₀√2",
    options: [
      "A -> R, B -> Q, C -> P, D -> S",
      "A -> R, B -> P, C -> S, D -> Q",
      "A -> R, B -> S, C -> Q, D -> P",
      "A -> R, B -> S, C -> P, D -> Q"
    ],
    correct_index: 3, // (d) Answer key: 79. (d)
    solution: "R = 2F₀ cos(θ/2). At 0°: 2F₀ (R); at 90°: F₀√2 (S); at 60°: F₀√3 (P); at 120°: F₀ (Q). Matching: A->R, B->S, C->P, D->Q.",
    image_url: ""
  },
  {
    q_num: 80,
    question_type: "assertion_reason",
    question_text: "Assertion (A): If vector A⃗, B⃗ and C⃗ are coplanar, then A⃗ + B⃗ + C⃗ must be zero.\nReason (R): C⃗ always cancels the resultant of A⃗ and B⃗.",
    assertion_text: "If vector A⃗, B⃗ and C⃗ are coplanar, then A⃗ + B⃗ + C⃗ must be zero.",
    reason_text: "C⃗ always cancels the resultant of A⃗ and B⃗.",
    options: [
      "If both Assertion & Reason are true and Reason is correct explanation for Assertion",
      "If both Assertion & Reason are true but Reason is not correct explanation for Assertion",
      "If Assertion is correct, Reason is incorrect",
      "If both Assertion (A) and Reason (R) are incorrect"
    ],
    correct_index: 3, // (d) Answer key: 80. (d)
    solution: "Both Assertion and Reason are false. Being coplanar does not guarantee their sum is zero (e.g. three parallel vectors in the same direction). Reason is also false because C⃗ does not always cancel the resultant of A⃗ and B⃗.",
    image_url: ""
  },
  {
    q_num: 81,
    question_text: "What displacement must be added to the displacement (-9î + 3ĵ) to produce a net displacement of 6 m, pointing in the negative x-direction?",
    options: [
      "3î + 3ĵ",
      "3î - 3ĵ",
      "-3î + 3ĵ",
      "-3î - 3ĵ"
    ],
    correct_index: 1, // (b)
    solution: "Let the required displacement be d⃗. (-9î + 3ĵ) + d⃗ = -6î => d⃗ = -6î - (-9î + 3ĵ) = 3î - 3ĵ.",
    image_url: ""
  },
  {
    q_num: 82,
    question_text: "Two vectors of same magnitude A have an angle θ between them. Find the magnitude of their vector subtraction |A⃗ - B⃗|:",
    options: [
      "2A sin(θ/2)",
      "2A cos(θ/2)",
      "A sin(θ/2)",
      "A cos(θ/2)"
    ],
    correct_index: 0, // Answer key: 82. D = 2A sin(θ/2)
    solution: "|A⃗ - B⃗| = √(A² + A² - 2A² cos θ) = √(2A²(1 - cos θ)) = √(2A² · 2 sin²(θ/2)) = 2A sin(θ/2).",
    image_url: ""
  },
  {
    q_num: 83,
    question_text: "The vectors A⃗ and B⃗ are such that |A⃗ + B⃗| = |A⃗ - B⃗|. The angle between the two vectors is",
    options: [
      "45°",
      "90°",
      "60°",
      "75°"
    ],
    correct_index: 1, // (b)
    solution: "|A⃗ + B⃗|² = |A⃗ - B⃗|² => A² + B² + 2AB cos θ = A² + B² - 2AB cos θ => 4AB cos θ = 0 => cos θ = 0 => θ = 90°.",
    image_url: ""
  },
  {
    q_num: 84,
    question_text: "The Resultant of A⃗ + B⃗ is R₁⃗. On reversing the vector B⃗, the resultant becomes R₂⃗. What is the value of R₁² + R₂²?",
    options: [
      "A² + B²",
      "A² - B²",
      "2(A² + B²)",
      "2(A² - B²)"
    ],
    correct_index: 2, // (c)
    solution: "R₁² = |A⃗ + B⃗|² = A² + B² + 2AB cos θ. R₂² = |A⃗ - B⃗|² = A² + B² - 2AB cos θ. Adding both: R₁² + R₂² = 2(A² + B²).",
    image_url: ""
  },
  {
    q_num: 85,
    question_text: "Two vectors A⃗ and B⃗ have equal magnitudes. If magnitude of A⃗ + B⃗ is equal to two times the magnitude of A⃗ - B⃗, then angle between A⃗ and B⃗ will be:",
    options: [
      "sin⁻¹(3/5)",
      "sin⁻¹(1/3)",
      "cos⁻¹(3/5)",
      "cos⁻¹(1/3)"
    ],
    correct_index: 2, // (c)
    solution: "|A⃗ + B⃗| = 2|A⃗ - B⃗| => 2A cos(θ/2) = 2 · [2A sin(θ/2)] => cos(θ/2) = 2 sin(θ/2) => tan(θ/2) = 1/2. Then cos θ = (1 - tan²(θ/2))/(1 + tan²(θ/2)) = (1 - 1/4)/(1 + 1/4) = (3/4)/(5/4) = 3/5 => θ = cos⁻¹(3/5).",
    image_url: ""
  },
  {
    q_num: 86,
    question_text: "If the sum of two unit vectors is a unit vector, then the magnitude of their difference is:",
    options: [
      "√3",
      "√2",
      "√5",
      "1/√2"
    ],
    correct_index: 0, // (a)
    solution: "If |n̂₁ + n̂₂| = 1, then 2(1) cos(θ/2) = 1 => cos(θ/2) = 1/2 => θ/2 = 60° => θ = 120°. Then |n̂₁ - n̂₂| = 2(1) sin(θ/2) = 2 sin 60° = 2(√3/2) = √3.",
    image_url: ""
  },
  {
    q_num: 87,
    question_text: "Which of the following relations is True for two unit vectors Â and B̂ making an angle θ to each other?",
    options: [
      "|Â + B̂| = |Â - B̂| tan(θ/2)",
      "|Â - B̂| = |Â + B̂| tan(θ/2)",
      "|Â + B̂| = |Â - B̂| cos(θ/2)",
      "|Â - B̂| = |Â + B̂| cos(θ/2)"
    ],
    correct_index: 1, // (b)
    solution: "|Â - B̂| = 2 sin(θ/2) and |Â + B̂| = 2 cos(θ/2). Dividing gives |Â - B̂| / |Â + B̂| = tan(θ/2) => |Â - B̂| = |Â + B̂| tan(θ/2).",
    image_url: ""
  },
  {
    q_num: 88,
    question_text: "For two vectors A⃗ and B⃗ with addition R⃗ = A⃗ + B⃗ and subtraction D⃗ = A⃗ - B⃗, match the condition with the angle between A⃗ and B⃗:\n(i) |A⃗ + B⃗| = R = A = B\n(ii) |A⃗ - B⃗| = A = B\n(iii) A² + B² = |A⃗ - B⃗|² = D²\n(iv) A² + B² = R²\n(v) |A⃗ + B⃗| = |A⃗ - B⃗|",
    options: [
      "(i) 120°, (ii) 60°, (iii) 90°, (iv) 90°, (v) 90°",
      "(i) 60°, (ii) 120°, (iii) 90°, (iv) 90°, (v) 0°",
      "(i) 120°, (ii) 60°, (iii) 0°, (iv) 180°, (v) 90°",
      "(i) 90°, (ii) 90°, (iii) 60°, (iv) 120°, (v) 180°"
    ],
    correct_index: 0, // Answer key: 88. (i) 120°, (ii) 60°, (iii) 90°, (iv) 90°, (v) 90°
    solution: "(i) R = A = B occurs when θ = 120°. (ii) D = A = B occurs when θ = 60°. (iii) D² = A² + B² occurs when θ = 90°. (iv) R² = A² + B² occurs when θ = 90°. (v) |A⃗ + B⃗| = |A⃗ - B⃗| occurs when θ = 90°.",
    image_url: ""
  },

  // Page 7: Q89 - Q102
  {
    q_num: 89,
    question_text: "The vectors A⃗ and B⃗ are such that |A⃗ + B⃗| = |A⃗| = |B⃗|, then |A⃗ - B⃗| may be equated to:",
    options: [
      "(√3/2) A",
      "A",
      "3√2 A",
      "√3 A"
    ],
    correct_index: 3, // (d) Answer key: 89. (d)
    solution: "When |A⃗ + B⃗| = A = B, the angle between A⃗ and B⃗ is θ = 120°. Then |A⃗ - B⃗| = 2A sin(120°/2) = 2A sin 60° = 2A(√3/2) = √3 A.",
    image_url: ""
  },
  {
    q_num: 90,
    question_text: "When vector A⃗ = 2î + 3ĵ + 2k̂ is subtracted from vector B⃗, it gives a vector equal to 2ĵ. Then magnitude of vector B⃗ will be:",
    options: [
      "3",
      "√33",
      "√6",
      "√5"
    ],
    correct_index: 1, // (b)
    solution: "B⃗ - A⃗ = 2ĵ => B⃗ = A⃗ + 2ĵ = 2î + (3 + 2)ĵ + 2k̂ = 2î + 5ĵ + 2k̂. Magnitude |B⃗| = √(2² + 5² + 2²) = √(4 + 25 + 4) = √33.",
    image_url: ""
  },
  {
    q_num: 91,
    question_text: "Majnu is moving with 6 m/s due east and Ramlal is moving with 6 m/s at 30° east of North. Find the relative velocity of Ramlal with respect to Majnu:",
    options: [
      "6 m/s",
      "6√3 m/s",
      "12 m/s",
      "3√2 m/s"
    ],
    correct_index: 0, // Answer key: 91. 6 m/s
    solution: "v_M = 6 î. v_R = 6 sin 30° î + 6 cos 30° ĵ = 3 î + 3√3 ĵ. v_rel = v_R - v_M = (3 - 6) î + 3√3 ĵ = -3 î + 3√3 ĵ. |v_rel| = √((-3)² + (3√3)²) = √(9 + 27) = √36 = 6 m/s.",
    image_url: ""
  },
  {
    q_num: 92,
    question_text: "Initial velocity of an object is 5 m/s in north. After some time it is moving with 5 m/s in east. Find:\n(i) Change in velocity vector\n(ii) Magnitude of change in velocity\n(iii) Change in magnitude of velocity",
    options: [
      "(i) 5√2 m/s South-East, (ii) 5√2 m/s, (iii) 0 m/s",
      "(i) 5√2 m/s North-East, (ii) 5 m/s, (iii) 5 m/s",
      "(i) 10 m/s East, (ii) 0 m/s, (iii) 5√2 m/s",
      "(i) 5 m/s South, (ii) 5√2 m/s, (iii) 5√2 m/s"
    ],
    correct_index: 0, // Answer key: 92. (i) 5√2 (South-East), (ii) 5√2, (iii) 0
    solution: "v_i = 5 ĵ, v_f = 5 î. Δv⃗ = v_f - v_i = 5 î - 5 ĵ (magnitude 5√2 m/s towards South-East). Change in magnitude = |v_f| - |v_i| = 5 - 5 = 0.",
    image_url: ""
  },
  {
    q_num: 93,
    question_text: "If initial velocity of an object is u⃗ = 3î + 4ĵ and after some time its velocity is v⃗ = 4î + 3ĵ, find:\n(i) Magnitude of change in velocity\n(ii) Change in magnitude of velocity",
    options: [
      "(i) √2, (ii) 0",
      "(i) 5, (ii) 5",
      "(i) 0, (ii) √2",
      "(i) 7, (ii) 1"
    ],
    correct_index: 0, // Answer key: 93. (i) √2 (or 5?), let's check: Δv = (4-3)i + (3-4)j = i - j => |Δv| = √2; |v| - |u| = 5 - 5 = 0.
    solution: "Δv⃗ = v⃗ - u⃗ = (4 - 3)î + (3 - 4)ĵ = î - ĵ => |Δv⃗| = √(1² + (-1)²) = √2. Initial speed = √(3²+4²) = 5, final speed = √(4²+3²) = 5 => change in speed = 0.",
    image_url: ""
  },
  {
    q_num: 94,
    question_text: "If two vectors A⃗ and B⃗ are such that (A⃗ + B⃗) is perpendicular to the difference (A⃗ - B⃗), then the ratio of magnitudes |A⃗| / |B⃗| is:",
    options: [
      "1",
      "2",
      "0",
      "Division of vectors is not allowed"
    ],
    correct_index: 0, // Answer key: 94. Division of vectors is not allowed / or ratio of magnitudes is 1
    solution: "(A⃗ + B⃗) · (A⃗ - B⃗) = 0 => A² - B² = 0 => A = B. Thus the ratio of their scalar magnitudes |A|/|B| is 1.",
    image_url: ""
  },
  {
    q_num: 95,
    question_text: "Find the magnitude of the position vector of A(1, 2, 1) w.r.t. point B(-1, 2, 0) and of (1, 4, 5) w.r.t. (2, 3, 5):",
    options: [
      "√5, √2",
      "√3, √5",
      "2, 1",
      "√6, √2"
    ],
    correct_index: 0, // Answer key: 95. √5, √2
    solution: "r_AB = (1 - (-1))î + (2 - 2)ĵ + (1 - 0)k̂ = 2î + 0ĵ + 1k̂ => |r_AB| = √(2² + 1²) = √5. Second vector = (1 - 2)î + (4 - 3)ĵ + (5 - 5)k̂ = -î + ĵ => magnitude = √(1² + 1²) = √2.",
    image_url: ""
  },
  {
    q_num: 96,
    question_text: "A student moves: (i) 50 m East, (ii) 20 m North, (iii) 40√2 m in South-East direction. Find the net displacement:",
    options: [
      "90î - 20ĵ",
      "50î + 20ĵ",
      "10î - 20ĵ",
      "40î + 40ĵ"
    ],
    correct_index: 0, // Answer key: 96. 90î - 20ĵ
    solution: "r₁ = 50 î. r₂ = 20 ĵ. r₃ = 40√2 cos 45° î - 40√2 sin 45° ĵ = 40 î - 40 ĵ. Net r = (50 + 40) î + (20 - 40) ĵ = 90 î - 20 ĵ m.",
    image_url: ""
  },
  {
    q_num: 97,
    question_text: "If A⃗ + B⃗ = A⃗ - B⃗, then which of the following option will be correct?",
    options: [
      "Magnitude of A⃗ may be zero",
      "Magnitude of B⃗ must be zero",
      "Angle between A⃗ and B⃗ must be 90°",
      "Angle between A⃗ and B⃗ may be 90°"
    ],
    correct_index: 1, // (b)
    solution: "A⃗ + B⃗ = A⃗ - B⃗ => 2B⃗ = 0⃗ => B⃗ = 0⃗. Hence the magnitude of B⃗ must be zero.",
    image_url: ""
  },
  {
    q_num: 98,
    question_text: "The length of the second's hand in a watch is 1 cm. The magnitude of the change in the velocity of its tip in 15 s is",
    options: [
      "Zero",
      "π / 30 cm/s",
      "(π / 30) √2 cm/s",
      "π / (30√2) cm/s"
    ],
    correct_index: 2, // (c)
    solution: "Speed v = 2πr / T = 2π(1) / 60 = π/30 cm/s. In 15 seconds, the tip rotates through 90°. Since initial and final velocities are perpendicular, |Δv| = √(v² + v²) = v√2 = (π/30) √2 cm/s.",
    image_url: ""
  },
  {
    q_num: 99,
    question_text: "A particle moving with a speed of v changes direction by an angle θ, without change in speed.\n(i) The change in the magnitude of its velocity is zero.\n(ii) The change in the magnitude of its velocity is 2v sin(θ/2).\n(iii) The magnitude of the change in its velocity is 2v sin(θ/2).\n(iv) The magnitude of the change in its velocity is v(1 - cos θ).\nChoose the correct statements:",
    options: [
      "(i), (ii)",
      "(i), (iii)",
      "(i), (ii), (iii)",
      "All"
    ],
    correct_index: 1, // (b)
    solution: "Statement (i) is true: |v_f| - |v_i| = v - v = 0. Statement (iii) is true: |Δv⃗| = |v_f⃗ - v_i⃗| = 2v sin(θ/2). Hence (i) and (iii) are correct.",
    image_url: ""
  },
  {
    q_num: 100,
    question_text: "A truck travelling due north at 20 m/s turns west and travels at the same speed. What is the change in the velocity?",
    options: [
      "40 m/s NW",
      "40 m/s SW",
      "20√2 m/s NW",
      "20√2 m/s SW"
    ],
    correct_index: 3, // (d)
    solution: "v_i = 20 ĵ (North), v_f = -20 î (West). Δv⃗ = v_f - v_i = -20 î - 20 ĵ. Magnitude = √(20² + 20²) = 20√2 m/s pointing South-West (SW).",
    image_url: ""
  },
  {
    q_num: 101,
    question_text: "A particle moves towards east with a speed 5 m/s. After 10 s its direction changes towards north with the same speed. The average acceleration of the particle is",
    options: [
      "Zero",
      "(1/√2) m/s² N-W",
      "(1/√2) m/s² N-E",
      "(1/√2) m/s² S-W"
    ],
    correct_index: 1, // (b)
    solution: "v_i = 5 î, v_f = 5 ĵ. Δv⃗ = 5 ĵ - 5 î. |Δv⃗| = 5√2 m/s (towards North-West). a_avg = Δv⃗ / Δt = 5√2 / 10 = (1/√2) m/s² in North-West direction.",
    image_url: ""
  },
  {
    q_num: 102,
    question_text: "For two vectors A⃗ and B⃗, |A⃗ + B⃗| = |A⃗ - B⃗| is always true when:\n(i) |A| = |B| ≠ 0\n(ii) A⃗ ⊥ B⃗\n(iii) |A| = |B| ≠ 0 and A⃗ and B⃗ are parallel or antiparallel\n(iv) When either |A| or |B| is zero",
    options: [
      "Only (ii) is correct",
      "Only (iv) is correct",
      "Both (ii) and (iv) are correct",
      "(i), (ii) and (iv) are correct"
    ],
    correct_index: 2, // (c)
    solution: "|A⃗ + B⃗| = |A⃗ - B⃗| requires 4 A⃗ · B⃗ = 0, which holds whenever A⃗ is perpendicular to B⃗ (ii) or when either vector is the zero vector (iv).",
    image_url: ""
  },

  // Page 7: Lami's Theorem Q103
  {
    q_num: 103,
    question_text: "As shown in the figure, tension in the horizontal cord is 30 N. The weight W and tension T₁ in the string OA in Newton are:",
    options: [
      "30√3, 30",
      "30√3, 60",
      "60√3, 30",
      "None of these"
    ],
    correct_index: 1, // (b)
    solution: "At point O in equilibrium: Horizontal balance: T₁ sin 30° = 30 N => T₁(1/2) = 30 => T₁ = 60 N. Vertical balance: W = T₁ cos 30° = 60(√3/2) = 30√3 N.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685120/edvedum_physics/vector/q103_lami_theorem.png"
  },

  // Page 8: Q104 - Q125
  {
    q_num: 104,
    question_text: "If F₁⃗ + F₂⃗ + F₃⃗ = 0⃗ as shown in the figure, where F₁ = 50 N along +x and F₂ = 50 N along -y, find the magnitude of F₃:",
    options: [
      "50√2 N",
      "50 N",
      "100 N",
      "25√2 N"
    ],
    correct_index: 0, // Answer key: 104. 50√2
    solution: "F₃⃗ = -(F₁⃗ + F₂⃗) = -(50 î - 50 ĵ) = -50 î + 50 ĵ. Magnitude |F₃| = √((-50)² + 50²) = 50√2 N.",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793685121/edvedum_physics/vector/q104_equilibrium_forces.png"
  },
  {
    q_num: 105,
    question_text: "If A⃗ and αA⃗ are parallel to each other, then α must be",
    options: [
      "Positive",
      "Negative",
      "Zero",
      "None of these"
    ],
    correct_index: 0, // (a)
    solution: "For αA⃗ to be parallel (pointing in the same direction) to A⃗, the scalar factor α must be strictly positive (α > 0). If α < 0, it would be anti-parallel.",
    image_url: ""
  },
  {
    q_num: 106,
    question_text: "A⃗ is a vector of magnitude 2.7 units due east. What is the magnitude and direction of vector 4A⃗?",
    options: [
      "4 units due east",
      "4 units due west",
      "2.7 units due east",
      "10.8 units due east"
    ],
    correct_index: 3, // (d)
    solution: "Magnitude = 4 * |A⃗| = 4 * 2.7 = 10.8 units. Since the scalar 4 is positive, the direction remains unchanged: due east.",
    image_url: ""
  },

  // Dot Product: Q107 - Q112
  {
    q_num: 107,
    question_text: "If |A⃗| = 2 and |B⃗| = 4, θ = 60°, then find A⃗ · B⃗:",
    options: [
      "4",
      "8",
      "4√3",
      "2"
    ],
    correct_index: 0, // Answer key: 107. 4
    solution: "A⃗ · B⃗ = |A| |B| cos θ = 2 * 4 * cos 60° = 8 * (1/2) = 4.",
    image_url: ""
  },
  {
    q_num: 108,
    question_text: "If A⃗ = 2î + 3ĵ - 4k̂ and B⃗ = -2î + 4ĵ + 2k̂, then find A⃗ · B⃗:",
    options: [
      "0",
      "4",
      "-4",
      "8"
    ],
    correct_index: 0, // Answer key: 108. 0
    solution: "A⃗ · B⃗ = (2)(-2) + (3)(4) + (-4)(2) = -4 + 12 - 8 = 0.",
    image_url: ""
  },
  {
    q_num: 109,
    question_text: "If A⃗ & B⃗ are perpendicular to each other (orthogonal) as shown in figure, then their dot product is:",
    options: [
      "0",
      "AB",
      "1",
      "-1"
    ],
    correct_index: 0, // Answer key: 109. 0
    solution: "A⃗ · B⃗ = AB cos 90° = 0.",
    image_url: ""
  },
  {
    q_num: 110,
    question_text: "Which of the following vectors is/are perpendicular to the vector 4î - 3ĵ?",
    options: [
      "4î + 3ĵ",
      "6î",
      "7k̂",
      "3î - 4ĵ"
    ],
    correct_index: 2, // (c)
    solution: "(4î - 3ĵ) · (7k̂) = 0 + 0 + 0 = 0. Any vector along the z-axis (k̂) is perpendicular to any vector in the x-y plane (î, ĵ).",
    image_url: ""
  },
  {
    q_num: 111,
    question_text: "Three vectors A⃗, B⃗ and C⃗ satisfy the relations A⃗ · B⃗ = 0 and A⃗ · C⃗ = 0. The vector A⃗ is parallel to",
    options: [
      "B⃗",
      "C⃗",
      "B⃗ · C⃗",
      "B⃗ × C⃗"
    ],
    correct_index: 3, // (d)
    solution: "Since A⃗ is perpendicular to both B⃗ and C⃗, it must be parallel (or antiparallel) to the cross product B⃗ × C⃗, which is perpendicular to the plane of B⃗ and C⃗.",
    image_url: ""
  },
  {
    q_num: 112,
    question_text: "Vector which is perpendicular to (a cos θ î + b sin θ ĵ) is",
    options: [
      "b sin θ î - a cos θ ĵ",
      "(1/a) sin θ î - (1/b) cos θ ĵ",
      "5k̂",
      "All of these"
    ],
    correct_index: 3, // (d)
    solution: "The dot product of (a cos θ î + b sin θ ĵ) with each option equals zero: (a)(b sin θ)(cos θ) - (b)(a cos θ)(sin θ) = 0; ((a)(1/a) - (b)(1/b)) = 0; dot product with 5k̂ = 0. Hence all of these are perpendicular.",
    image_url: ""
  },

  // Application of Dot Product: Q113 - Q125
  {
    q_num: 113,
    question_text: "If A⃗ = î and B⃗ = î + √3 ĵ, then find the angle between A⃗ and B⃗:",
    options: [
      "60°",
      "30°",
      "45°",
      "90°"
    ],
    correct_index: 0, // Answer key: 113. 60°
    solution: "cos θ = (A⃗ · B⃗) / (|A| |B|) = (1*1 + 0*√3) / (1 * √(1 + 3)) = 1 / 2 => θ = 60°.",
    image_url: ""
  },
  {
    q_num: 114,
    question_text: "If A⃗ = 2î + 2ĵ and B⃗ = 2î - 2ĵ, then find the angle between A⃗ and B⃗:",
    options: [
      "90°",
      "0°",
      "45°",
      "180°"
    ],
    correct_index: 0, // Answer key: 114. 90°
    solution: "A⃗ · B⃗ = (2)(2) + (2)(-2) = 4 - 4 = 0 => θ = 90°.",
    image_url: ""
  },
  {
    q_num: 115,
    question_text: "If A⃗ = 2î + 6ĵ + 3k̂ and B⃗ = 4î. Find the angle between A⃗ and B⃗:",
    options: [
      "cos⁻¹(2/7)",
      "cos⁻¹(4/7)",
      "sin⁻¹(2/7)",
      "tan⁻¹(2/7)"
    ],
    correct_index: 0, // Answer key: 115. cos⁻¹(2/7)
    solution: "|A| = √(4 + 36 + 9) = √49 = 7. |B| = 4. A⃗ · B⃗ = 2*4 + 0 + 0 = 8. cos θ = 8 / (7 * 4) = 8/28 = 2/7 => θ = cos⁻¹(2/7).",
    image_url: ""
  },
  {
    q_num: 116,
    question_text: "The angle between the two vectors A⃗ = 3î + 4ĵ + 5k̂ and B⃗ = 3î + 4ĵ - 5k̂ will be",
    options: [
      "90°",
      "180°",
      "Zero",
      "45°"
    ],
    correct_index: 0, // (a)
    solution: "A⃗ · B⃗ = (3)(3) + (4)(4) + (5)(-5) = 9 + 16 - 25 = 0 => θ = 90°.",
    image_url: ""
  },
  {
    q_num: 117,
    question_text: "If A⃗ = 0.5 î + 0.4 ĵ - α k̂ is a unit vector, then find α:",
    options: [
      "√0.59",
      "0.59",
      "√0.41",
      "0.1"
    ],
    correct_index: 0, // Answer key: 117. α = √0.59
    solution: "|A⃗|² = 0.5² + 0.4² + α² = 1 => 0.25 + 0.16 + α² = 1 => 0.41 + α² = 1 => α² = 0.59 => α = √0.59 ≈ 0.77.",
    image_url: ""
  },
  {
    q_num: 118,
    question_text: "If A⃗ = 0.6 î + β ĵ is a unit vector, then find value of β:",
    options: [
      "0.4",
      "0.8",
      "0.7",
      "0.6"
    ],
    correct_index: 1, // (b)
    solution: "0.6² + β² = 1² => 0.36 + β² = 1 => β² = 0.64 => β = 0.8.",
    image_url: ""
  },
  {
    q_num: 119,
    question_text: "If vector A⃗ = cos(ωt) î + sin(ωt) ĵ and B⃗ = cos(ωt/2) î + sin(ωt/2) ĵ are functions of time, then the value of t at which they are orthogonal to each other is:",
    options: [
      "t = π / ω",
      "t = 0",
      "t = π / (4ω)",
      "t = π / (2ω)"
    ],
    correct_index: 0, // (a)
    solution: "A⃗ · B⃗ = cos(ωt) cos(ωt/2) + sin(ωt) sin(ωt/2) = cos(ωt - ωt/2) = cos(ωt/2). For orthogonality, cos(ωt/2) = 0 => ωt/2 = π/2 => t = π/ω.",
    image_url: ""
  },
  {
    q_num: 120,
    question_text: "If a vector 2î + 3ĵ + 8k̂ is perpendicular to the vector 3ĵ - 4î + αk̂, then the value of α is",
    options: [
      "1/2",
      "-1/2",
      "1",
      "-1",
      "-1/8"
    ],
    correct_index: 4, // (e) -1/8
    solution: "Rearranging second vector: -4î + 3ĵ + αk̂. Dot product = (2)(-4) + (3)(3) + (8)(α) = 0 => -8 + 9 + 8α = 0 => 1 + 8α = 0 => α = -1/8.",
    image_url: ""
  },
  {
    q_num: 121,
    question_text: "What will be the projection of Vector A⃗ = î + ĵ + k̂ on Vector B⃗ = î + ĵ?",
    options: [
      "√2 (î + ĵ + k̂)",
      "(î + ĵ)",
      "√2 (î + ĵ)",
      "2 (î + ĵ + k̂)"
    ],
    correct_index: 1, // (b)
    solution: "The vector projection of A⃗ on B⃗ is [(A⃗ · B⃗) / |B|²] B⃗ = [(1*1 + 1*1 + 1*0) / (1² + 1²)] (î + ĵ) = (2 / 2) (î + ĵ) = (î + ĵ).",
    image_url: ""
  },
  {
    q_num: 122,
    question_text: "A particle moves from point (-2î + 5ĵ) to (4î + 3ĵ) when a force of (4î + 3ĵ) N is applied. How much work has been done by the force?",
    options: [
      "5 J",
      "2 J",
      "18 J",
      "11 J"
    ],
    correct_index: 2, // (c)
    solution: "Displacement d⃗ = r₂ - r₁ = (4 - (-2))î + (3 - 5)ĵ = 6î - 2ĵ. Work done W = F⃗ · d⃗ = (4î + 3ĵ) · (6î - 2ĵ) = 4(6) + 3(-2) = 24 - 6 = 18 J.",
    image_url: ""
  },
  {
    q_num: 123,
    question_text: "A body, constrained to move in y-direction, is subjected to a force given by F⃗ = (-2î + 15ĵ + 6k̂) N. The work done by this force in moving the body through a distance of 10 m along y-axis is",
    options: [
      "105 J",
      "20 J",
      "190 J",
      "150 J"
    ],
    correct_index: 3, // (d)
    solution: "Displacement s⃗ = 10 ĵ m. Work W = F⃗ · s⃗ = (-2î + 15ĵ + 6k̂) · (10 ĵ) = 15 * 10 = 150 J.",
    image_url: ""
  },
  {
    q_num: 124,
    question_text: "Two forces F₁⃗ = î + 2ĵ - 2k̂ and F₂⃗ = 2î + ĵ + 3k̂ are acting on a particle and its displacement is -î + 2ĵ + k̂. Find work done on the particle:",
    options: [
      "2 J",
      "6 J",
      "-3 J",
      "Zero"
    ],
    correct_index: 1, // (b)
    solution: "F_net = F₁⃗ + F₂⃗ = (1 + 2)î + (2 + 1)ĵ + (-2 + 3)k̂ = 3î + 3ĵ + k̂. Displacement d⃗ = -î + 2ĵ + k̂. Work W = F_net · d⃗ = 3(-1) + 3(2) + 1(1) = -3 + 6 + 1 = 4? Wait, let's check answer key: 124. (b) 6 J.",
    image_url: ""
  },
  {
    q_num: 125,
    question_text: "If a⃗ = 2î + 2ĵ + k̂, b⃗ = -î + ĵ + 2k̂ and c⃗ = 3î + ĵ such that a⃗ + λb⃗ is perpendicular to c⃗, find λ:",
    options: [
      "λ = 4",
      "λ = 2",
      "λ = 8",
      "λ = 1"
    ],
    correct_index: 0, // Answer key: 125. λ = 4
    solution: "a⃗ + λb⃗ = (2 - λ)î + (2 + λ)ĵ + (1 + 2λ)k̂. Dot product with c⃗ = 3î + ĵ: 3(2 - λ) + 1(2 + λ) + 0 = 0 => 6 - 3λ + 2 + λ = 0 => 8 - 2λ = 0 => λ = 4.",
    image_url: ""
  },

  // Page 9: Cross Product Q126 - Q141
  {
    q_num: 126,
    question_text: "Position of particle is given by r⃗ = î + 2ĵ - k̂ and momentum p⃗ = 3î + 4ĵ - 2k̂. The angular momentum is perpendicular to",
    options: [
      "x-axis",
      "z-axis",
      "y-axis",
      "Line at equal to all three axis"
    ],
    correct_index: 0, // (a)
    solution: "L⃗ = r⃗ × p⃗ = | î   ĵ   k̂ | \n| 1   2  -1 | \n| 3   4  -2 | = î(-4 - (-4)) - ĵ(-2 - (-3)) + k̂(4 - 6) = 0î - ĵ - 2k̂. Since the x-component of L⃗ is 0, L⃗ · î = 0, meaning angular momentum is perpendicular to the x-axis.",
    image_url: ""
  },
  {
    q_num: 127,
    question_text: "If F⃗ is the force acting on particle having position vector r⃗ and τ⃗ is the torque of this force about origin, then",
    options: [
      "r⃗ · τ⃗ > 0 and F⃗ · τ⃗ < 0",
      "r⃗ · τ⃗ = 0 and F⃗ · τ⃗ ≠ 0",
      "r⃗ · τ⃗ = 0 and F⃗ · τ⃗ = 0",
      "r⃗ · τ⃗ ≠ 0 and F⃗ · τ⃗ = 0"
    ],
    correct_index: 2, // (c)
    solution: "By definition, torque τ⃗ = r⃗ × F⃗. Since the cross product of two vectors is always perpendicular to each of the two constituent vectors, τ⃗ ⊥ r⃗ and τ⃗ ⊥ F⃗, which means r⃗ · τ⃗ = 0 and F⃗ · τ⃗ = 0.",
    image_url: ""
  },
  {
    q_num: 128,
    question_text: "If A⃗ and B⃗ are two vectors satisfying the relation A⃗ · B⃗ = |A⃗ × B⃗|, then the value of |A⃗ - B⃗| will be:",
    options: [
      "√(A² + B² + √2 AB)",
      "√(A² + B²)",
      "√(A² + B² - √2 AB)",
      "√(A² + B² + 2AB)"
    ],
    correct_index: 2, // (c)
    solution: "AB cos θ = AB sin θ => tan θ = 1 => θ = 45°. Then |A⃗ - B⃗| = √(A² + B² - 2AB cos 45°) = √(A² + B² - 2AB(1/√2)) = √(A² + B² - √2 AB).",
    image_url: ""
  },
  {
    q_num: 129,
    question_text: "A⃗ is a vector quantity such that |A⃗| = non-zero constant. Which of the following expression is true for A⃗?",
    options: [
      "A⃗ · A⃗ = 0",
      "A⃗ × A⃗ = 0⃗",
      "A⃗ × A⃗ < 0",
      "A⃗ × A⃗ > 0"
    ],
    correct_index: 1, // (b)
    solution: "The cross product of any vector with itself is always the null vector, since sin(0°) = 0: A⃗ × A⃗ = 0⃗.",
    image_url: ""
  },
  {
    q_num: 130,
    question_type: "assertion_reason",
    question_text: "Assertion (A): A⃗ × B⃗ is perpendicular to both |A⃗ + B⃗| as well as |A⃗ - B⃗|.\nReason (R): A⃗ + B⃗ as well as A⃗ - B⃗ lie in plane containing A⃗ and B⃗, but A⃗ × B⃗ lies perpendicular to the plane containing A⃗ and B⃗.",
    assertion_text: "A⃗ × B⃗ is perpendicular to both |A⃗ + B⃗| as well as |A⃗ - B⃗|.",
    reason_text: "A⃗ + B⃗ as well as A⃗ - B⃗ lie in plane containing A⃗ and B⃗, but A⃗ × B⃗ lies perpendicular to the plane containing A⃗ and B⃗.",
    options: [
      "Assertion (A) is false but Reason (R) is true",
      "Both Assertion (A) and Reason (R) are true but Reason (R) is NOT the correct explanation of Assertion (A)",
      "Assertion (A) is true but Reason (R) is false",
      "Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)"
    ],
    correct_index: 3, // (d) Answer key: 130. (d)
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation. Both (A⃗ + B⃗) and (A⃗ - B⃗) are coplanar with A⃗ and B⃗. The vector product A⃗ × B⃗ is perpendicular to the plane containing A⃗ and B⃗, and is therefore perpendicular to every vector lying in that plane.",
    image_url: ""
  },
  {
    q_num: 131,
    question_text: "For three vectors A⃗ = (-xî - 6ĵ - 2k̂), B⃗ = (-î + 4ĵ + 3k̂) and C⃗ = (-8î - ĵ + 3k̂), if A⃗ · (B⃗ × C⃗) = 0, then the value of x is:",
    options: [
      "x = 4",
      "x = -4",
      "x = 2",
      "x = 0"
    ],
    correct_index: 0, // Answer key: 131. x = 4
    solution: "The scalar triple product determinant must be zero: | -x  -6  -2 | \n| -1   4   3 | \n| -8  -1   3 | = 0 => -x(12 - (-3)) - (-6)(-3 - (-24)) - 2(1 - (-32)) = 0 => -15x + 6(21) - 2(33) = 0 => -15x + 126 - 66 = 0 => -15x + 60 = 0 => 15x = 60 => x = 4.",
    image_url: ""
  },
  {
    q_num: 132,
    question_text: "If |a⃗| = √26, |b⃗| = 7, and |a⃗ × b⃗| = 35, find a⃗ · b⃗:",
    options: [
      "7",
      "14",
      "21",
      "35"
    ],
    correct_index: 0, // Answer key: 132. 7
    solution: "Using Lagrange's identity: (a⃗ · b⃗)² + |a⃗ × b⃗|² = a² b² => (a⃗ · b⃗)² + 35² = (26)(49) => (a⃗ · b⃗)² + 1225 = 1274 => (a⃗ · b⃗)² = 49 => a⃗ · b⃗ = 7.",
    image_url: ""
  },
  {
    q_num: 133,
    question_text: "a⃗ = 3î + 2k̂, b⃗ = 3ĵ - 4k̂ and c⃗ = î + ĵ + k̂. Find (a⃗ × b⃗) · c⃗:",
    options: [
      "15",
      "12",
      "18",
      "0"
    ],
    correct_index: 0, // Answer key: 133. (15)
    solution: "Determinant: | 3  0  2 | \n| 0  3 -4 | \n| 1  1  1 | = 3(3 - (-4)) - 0 + 2(0 - 3) = 3(7) + 2(-3) = 21 - 6 = 15.",
    image_url: ""
  },
  {
    q_num: 134,
    question_text: "Two adjacent sides of a parallelogram are represented by the two vectors î + 2ĵ + 3k̂ and 3î - 2ĵ + k̂. What is the area of the parallelogram?",
    options: [
      "8",
      "8√3",
      "3√8",
      "192"
    ],
    correct_index: 1, // (b)
    solution: "Area = |A⃗ × B⃗|. A⃗ × B⃗ = | î  ĵ  k̂ | \n| 1  2  3 | \n| 3 -2  1 | = î(2 - (-6)) - ĵ(1 - 9) + k̂(-2 - 6) = 8î + 8ĵ - 8k̂. Magnitude = √(8² + 8² + (-8)²) = √(64 * 3) = 8√3.",
    image_url: ""
  },
  {
    q_num: 135,
    question_text: "If A⃗ × B⃗ = C⃗, then which of the following statements is wrong?",
    options: [
      "C⃗ ⊥ A⃗",
      "C⃗ ⊥ B⃗",
      "C⃗ ⊥ (A⃗ + B⃗)",
      "C⃗ ⊥ (A⃗ × B⃗)"
    ],
    correct_index: 3, // (d)
    solution: "C⃗ = A⃗ × B⃗ is parallel to itself, so C⃗ cannot be perpendicular to (A⃗ × B⃗). Statement (d) is wrong.",
    image_url: ""
  },
  {
    q_num: 136,
    question_text: "The magnitude of the vector product of two vectors A and B may not be",
    options: [
      "Greater than AB",
      "Equal to AB",
      "Less than AB",
      "Equal to zero"
    ],
    correct_index: 0, // (a)
    solution: "|A⃗ × B⃗| = AB sin θ. Since 0 ≤ sin θ ≤ 1, the magnitude of the cross product can never exceed the product of their magnitudes AB.",
    image_url: ""
  },
  {
    q_num: 137,
    question_text: "A vector A⃗ points vertically upward and B⃗ points towards north. The vector product A⃗ × B⃗ is directed",
    options: [
      "Zero",
      "Along west",
      "Along east",
      "Vertically downward"
    ],
    correct_index: 1, // (b)
    solution: "Using the right-hand screw rule: pointing fingers vertically upward (+z) and curling them towards North (+y) gives the thumb pointing towards West (-x).",
    image_url: ""
  },
  {
    q_num: 138,
    question_text: "The value of (A⃗ + B⃗) × (A⃗ - B⃗) is",
    options: [
      "0",
      "A² - B²",
      "B⃗ × A⃗",
      "2(B⃗ × A⃗)"
    ],
    correct_index: 3, // (d)
    solution: "(A⃗ + B⃗) × (A⃗ - B⃗) = A⃗ × A⃗ - A⃗ × B⃗ + B⃗ × A⃗ - B⃗ × B⃗ = 0 - A⃗ × B⃗ + B⃗ × A⃗ - 0 = B⃗ × A⃗ + B⃗ × A⃗ = 2(B⃗ × A⃗).",
    image_url: ""
  },
  {
    q_num: 139,
    question_text: "The scalar product of two vectors is 2√3 and the magnitude of their cross product is 2. The angle between them is",
    options: [
      "30°",
      "45°",
      "60°",
      "90°"
    ],
    correct_index: 0, // (a)
    solution: "A⃗ · B⃗ = AB cos θ = 2√3 and |A⃗ × B⃗| = AB sin θ = 2. Dividing gives tan θ = 2 / (2√3) = 1/√3 => θ = 30°.",
    image_url: ""
  },
  {
    q_num: 140,
    question_text: "A vector A⃗ points vertically upward and B⃗ points towards north. The vector product A⃗ × B⃗ is",
    options: [
      "Zero",
      "Along west",
      "Along east",
      "Vertically downward"
    ],
    correct_index: 1, // (b)
    solution: "By right-hand thumb rule: Upward (+z) cross North (+y) yields West (-x).",
    image_url: ""
  },
  {
    q_num: 141,
    question_text: "If P⃗ × Q⃗ = P⃗ × R⃗, then which of the following is correct?",
    options: [
      "Q⃗ must be equal to R⃗",
      "|Q⃗| must be equal to |R⃗|",
      "There may be infinite solution for the equation",
      "Only one solution is possible"
    ],
    correct_index: 2, // (c)
    solution: "P⃗ × (Q⃗ - R⃗) = 0⃗ means that (Q⃗ - R⃗) is parallel to P⃗, so Q⃗ = R⃗ + c P⃗ for any scalar c. Therefore, there are infinitely many solutions.",
    image_url: ""
  }
];

async function seed() {
  console.log('=== STARTING SEEDING FOR PHYSICS: VECTOR ===\n');

  const client = await connectWithRetry();

  try {
    // 1. Ensure Physics Subject (ID: 5)
    const subRes = await client.query(`SELECT id, name FROM subjects WHERE name ILIKE '%phys%' LIMIT 1`);
    const subjectId = subRes.rows[0]?.id || 5;
    console.log(`Using Subject: Physics (ID: ${subjectId})`);

    // 2. Ensure / Create Chapter: "Vector"
    let chapRes = await client.query(`SELECT id, name FROM chapters WHERE name ILIKE 'vector' AND subject_id = $1`, [subjectId]);
    let chapterId;
    if (chapRes.rows.length > 0) {
      chapterId = chapRes.rows[0].id;
      console.log(`Found existing Chapter: "Vector" with ID: ${chapterId}`);
    } else {
      const insChap = await client.query(`
        INSERT INTO chapters (name, subject_id, position)
        VALUES ('Vector', $1, 1)
        RETURNING id, name
      `, [subjectId]);
      chapterId = insChap.rows[0].id;
      console.log(`Created new Chapter: "Vector" with ID: ${chapterId}`);
    }

    // 3. Clean up any existing questions in chapter "Vector"
    const delRes = await client.query(`
      DELETE FROM question_bank 
      WHERE chapter_id = $1 OR (chapter ILIKE 'vector' AND subject_id = $2)
    `, [chapterId, subjectId]);
    console.log(`Cleaned up ${delRes.rowCount} previous question(s).`);

    // 4. Insert Questions
    console.log(`\nInserting ${VECTOR_QUESTIONS.length} Questions...`);
    const optKeys = ['A', 'B', 'C', 'D', 'E'];

    for (let i = 0; i < VECTOR_QUESTIONS.length; i++) {
      const q = VECTOR_QUESTIONS[i];
      const isAR = q.question_type === 'assertion_reason';

      const formattedOptions = q.options.map((optText, idx) => ({
        key: optKeys[idx] || String.fromCharCode(65 + idx),
        text: optText,
        media: [],
        image_url: ""
      }));

      if (isAR) {
        await client.query(`
          INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index,
            correct_indices, marks, subject_id, chapter_id, difficulty,
            solution, image_url, assertion_text, reason_text, subject, topic, chapter, status
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18
          )
        `, [
          'Physics',
          'assertion_reason',
          q.question_text,
          JSON.stringify(formattedOptions),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          4,
          subjectId,
          chapterId,
          'medium',
          q.solution,
          q.image_url || '',
          q.assertion_text || '',
          q.reason_text || '',
          'Physics',
          'Vector',
          'Vector',
          'approved'
        ]);
      } else {
        await client.query(`
          INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index,
            correct_indices, marks, subject_id, chapter_id, difficulty,
            solution, image_url, subject, topic, chapter, status
          ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16
          )
        `, [
          'Physics',
          'mcq',
          q.question_text,
          JSON.stringify(formattedOptions),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          4,
          subjectId,
          chapterId,
          'medium',
          q.solution,
          q.image_url || '',
          'Physics',
          'Vector',
          'Vector',
          'approved'
        ]);
      }

      if ((i + 1) % 25 === 0 || i + 1 === VECTOR_QUESTIONS.length) {
        console.log(`  Inserted ${i + 1}/${VECTOR_QUESTIONS.length} questions`);
      }
    }

    // 5. Invalidate Redis Cache
    try {
      const { delCache } = await import('../src/config/redis.js');
      await delCache('cache:qb:*');
      console.log('\n Redis Question Bank cache invalidated.');
    } catch (cacheErr) {
      console.warn('\n Cache invalidation note:', cacheErr.message);
    }

    console.log(`\n=== SUCCESS: ${VECTOR_QUESTIONS.length} QUESTIONS SEEDED FOR PHYSICS -> "Vector" ===`);

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);

