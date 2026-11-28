import { pool } from '../config/db.js';

const DEFAULT_BLUEPRINTS = [
  {
    slug: 'neet-ug-official',
    title: 'NEET UG Official Pattern (200 Qs / 180 to Attempt)',
    description: 'Official NTA NEET pattern featuring Physics, Chemistry, Botany, and Zoology with Section A (35 mandatory) and Section B (15 with 10 attemptable).',
    exam_type: 'NEET',
    exam_year: '2024-2026',
    class_level: 'Class 11+12',
    total_questions: 200,
    duration_minutes: 200,
    marks_per_question: 4,
    negative_marking: 1,
    partial_marking: {
      enabled: false,
      description: 'Strict binary marking: +4 for correct, -1 for incorrect, 0 for unattempted.'
    },
    subject_distribution: {
      Physics: 50,
      Chemistry: 50,
      Botany: 50,
      Zoology: 50
    },
    chapter_distribution: {
      Physics: 'Full NCERT Class 11 & 12 physics syllabus',
      Chemistry: 'Physical, Inorganic, and Organic Chemistry chapters',
      Botany: 'Plant Physiology, Genetics, Diversity, Reproduction',
      Zoology: 'Human Physiology, Biotechnology, Evolution, Health'
    },
    question_type_distribution: {
      'Single MCQ': 160,
      'Assertion-Reason': 40
    },
    difficulty_distribution: {
      easy: 30,
      medium: 50,
      hard: 20
    },
    section_rules: {
      per_subject: {
        section_a: { name: 'Section A', count: 35, mandatory: 35, marks: 140 },
        section_b: { name: 'Section B', count: 15, attempt_max: 10, marks: 40 }
      }
    },
    optional_question_rules: {
      rule: 'Attempt any 10 out of 15 questions in Section B of each subject. Only first 10 evaluated.',
      choice_allowed: true,
      questions_to_attempt: 180,
      total_marks: 720
    },
    version: 1,
    is_default: true,
    is_active: true
  },
  {
    slug: 'jee-main-75-official',
    title: 'JEE Main Official Standard (75 Qs)',
    description: 'Standard NTA JEE Main pattern with 25 questions per subject (20 MCQs in Section A + 5 Numerical Value Questions in Section B).',
    exam_type: 'JEE',
    exam_year: '2025-2026',
    class_level: 'Class 11+12',
    total_questions: 75,
    duration_minutes: 180,
    marks_per_question: 4,
    negative_marking: 1,
    partial_marking: {
      enabled: false,
      description: 'Strict binary marking: +4 for correct, -1 for incorrect, 0 for unattempted.'
    },
    subject_distribution: {
      Physics: 25,
      Chemistry: 25,
      Mathematics: 25
    },
    chapter_distribution: {
      Physics: 'Class 11 & 12 Physics core chapters',
      Chemistry: 'Physical, Organic, Inorganic Chemistry chapters',
      Mathematics: 'Calculus, Algebra, Coordinate Geometry, Vectors'
    },
    question_type_distribution: {
      'Single MCQ': 60,
      'Numerical': 15
    },
    difficulty_distribution: {
      easy: 25,
      medium: 50,
      hard: 25
    },
    section_rules: {
      per_subject: {
        section_a: { name: 'Section A', type: 'Single MCQ', count: 20, mandatory: 20, marks: 80 },
        section_b: { name: 'Section B', type: 'Numerical', count: 5, mandatory: 5, marks: 20 }
      }
    },
    optional_question_rules: {
      rule: 'All 75 questions mandatory across Sections A and B.',
      choice_allowed: false,
      questions_to_attempt: 75,
      total_marks: 300
    },
    version: 1,
    is_default: true,
    is_active: true
  },
  {
    slug: 'jee-main-90-optional',
    title: 'JEE Main Optional Pattern (90 Qs / 75 to Attempt)',
    description: 'NTA optional pattern with 30 questions per subject: 20 MCQs (Section A) + 10 Numerical Questions in Section B (attempt any 5).',
    exam_type: 'JEE',
    exam_year: '2021-2024',
    class_level: 'Class 11+12',
    total_questions: 90,
    duration_minutes: 180,
    marks_per_question: 4,
    negative_marking: 1,
    partial_marking: {
      enabled: false,
      description: 'Strict binary marking: +4 for correct, -1 for incorrect.'
    },
    subject_distribution: {
      Physics: 30,
      Chemistry: 30,
      Mathematics: 30
    },
    chapter_distribution: {
      Physics: 'Comprehensive Class 11 & 12 Physics',
      Chemistry: 'Physical, Inorganic, and Organic Chemistry topics',
      Mathematics: 'Calculus, Algebra, 3D Geometry, Vectors'
    },
    question_type_distribution: {
      'Single MCQ': 60,
      'Numerical': 30
    },
    difficulty_distribution: {
      easy: 25,
      medium: 50,
      hard: 25
    },
    section_rules: {
      per_subject: {
        section_a: { name: 'Section A', type: 'Single MCQ', count: 20, mandatory: 20, marks: 80 },
        section_b: { name: 'Section B', type: 'Numerical', count: 10, attempt_max: 5, marks: 20 }
      }
    },
    optional_question_rules: {
      rule: 'Attempt any 5 out of 10 Numerical questions per subject in Section B. Total 75 questions to attempt.',
      choice_allowed: true,
      questions_to_attempt: 75,
      total_marks: 300
    },
    version: 1,
    is_default: false,
    is_active: true
  },
  {
    slug: 'custom-institute-test-50',
    title: 'Custom Institute Test (50 Qs)',
    description: 'Configurable institute assessment with 50 questions across Physics, Chemistry, and Maths, with optional partial marking on multi-select questions.',
    exam_type: 'CUSTOM',
    exam_year: '2026',
    class_level: 'Class 12',
    total_questions: 50,
    duration_minutes: 60,
    marks_per_question: 4,
    negative_marking: 1,
    partial_marking: {
      enabled: true,
      description: 'Partial marking (+1, +2) awarded for multi-select question formats.'
    },
    subject_distribution: {
      Physics: 20,
      Chemistry: 20,
      Mathematics: 10
    },
    chapter_distribution: {
      Physics: 'Custom selectable chapters',
      Chemistry: 'Custom selectable chapters',
      Mathematics: 'Custom selectable chapters'
    },
    question_type_distribution: {
      'Single MCQ': 30,
      'Multi-Correct': 10,
      'Numerical': 10
    },
    difficulty_distribution: {
      easy: 30,
      medium: 40,
      hard: 30
    },
    section_rules: {
      sections: [
        { name: 'Section A - Single Response', count: 30, marks: 120 },
        { name: 'Section B - Advanced & Multi-Select', count: 20, marks: 80 }
      ]
    },
    optional_question_rules: {
      rule: 'All 50 questions mandatory. Partial marking enabled on multi-select questions.',
      choice_allowed: false,
      questions_to_attempt: 50,
      total_marks: 200
    },
    version: 1,
    is_default: true,
    is_active: true
  }
];

async function seedBlueprints() {
  console.log('[seed] Seeding default exam blueprints into Neon PostgreSQL...');

  for (const bp of DEFAULT_BLUEPRINTS) {
    const existing = await pool.query(
      'SELECT id, slug, version FROM exam_blueprints WHERE slug = $1',
      [bp.slug]
    );

    if (existing.rows.length > 0) {
      console.log(`[seed] Blueprint "${bp.slug}" already exists (ID: ${existing.rows[0].id}). Updating...`);
      await pool.query(
        `UPDATE exam_blueprints SET
          title = $1,
          description = $2,
          exam_type = $3,
          exam_year = $4,
          class_level = $5,
          total_questions = $6,
          duration_minutes = $7,
          marks_per_question = $8,
          negative_marking = $9,
          partial_marking = $10,
          subject_distribution = $11,
          chapter_distribution = $12,
          question_type_distribution = $13,
          difficulty_distribution = $14,
          section_rules = $15,
          optional_question_rules = $16,
          is_default = $17,
          is_active = $18,
          updated_at = NOW()
        WHERE slug = $19`,
        [
          bp.title,
          bp.description,
          bp.exam_type,
          bp.exam_year,
          bp.class_level,
          bp.total_questions,
          bp.duration_minutes,
          bp.marks_per_question,
          bp.negative_marking,
          JSON.stringify(bp.partial_marking),
          JSON.stringify(bp.subject_distribution),
          JSON.stringify(bp.chapter_distribution),
          JSON.stringify(bp.question_type_distribution),
          JSON.stringify(bp.difficulty_distribution),
          JSON.stringify(bp.section_rules),
          JSON.stringify(bp.optional_question_rules),
          bp.is_default,
          bp.is_active,
          bp.slug
        ]
      );
    } else {
      console.log(`[seed] Inserting blueprint "${bp.slug}"...`);
      const inserted = await pool.query(
        `INSERT INTO exam_blueprints (
          slug, title, description, exam_type, exam_year, class_level,
          total_questions, duration_minutes, marks_per_question, negative_marking,
          partial_marking, subject_distribution, chapter_distribution,
          question_type_distribution, difficulty_distribution, section_rules,
          optional_question_rules, version, is_default, is_active, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW(), NOW()
        ) RETURNING id`,
        [
          bp.slug,
          bp.title,
          bp.description,
          bp.exam_type,
          bp.exam_year,
          bp.class_level,
          bp.total_questions,
          bp.duration_minutes,
          bp.marks_per_question,
          bp.negative_marking,
          JSON.stringify(bp.partial_marking),
          JSON.stringify(bp.subject_distribution),
          JSON.stringify(bp.chapter_distribution),
          JSON.stringify(bp.question_type_distribution),
          JSON.stringify(bp.difficulty_distribution),
          JSON.stringify(bp.section_rules),
          JSON.stringify(bp.optional_question_rules),
          bp.version,
          bp.is_default,
          bp.is_active
        ]
      );

      // Also record snapshot in exam_blueprint_history
      await pool.query(
        `INSERT INTO exam_blueprint_history (
          blueprint_id, version, snapshot, change_summary, changed_by, created_at
        ) VALUES ($1, $2, $3, $4, $5, NOW())`,
        [
          inserted.rows[0].id,
          1,
          JSON.stringify(bp),
          'Initial seeding of default exam blueprint',
          'system_seed'
        ]
      );
    }
  }

  const finalCheck = await pool.query(
    'SELECT id, slug, title, exam_type, exam_year, total_questions, duration_minutes, version, is_default, is_active FROM exam_blueprints ORDER BY id'
  );
  console.log('[seed] Current blueprints in DB:');
  console.table(finalCheck.rows);

  process.exit(0);
}

seedBlueprints().catch(err => {
  console.error('[seed] Error seeding blueprints:', err);
  process.exit(1);
});
