import { pool } from '../src/config/db.js';

const FOUNDATION_SERIES = [
  {
    title: 'AIETS Foundation Class 10 Comprehensive CBT Series',
    slug: 'aiets-foundation-class-10-comprehensive',
    description: 'Comprehensive CBT assessments for Class 10 Foundation students covering Science, Mathematics and Mental Ability. Builds strong basics for JEE & NEET with All India Rank and solutions.',
    price: 1499.00,
    is_free: false,
    validity_days: 365,
    exam_type: 'Foundation',
    target_class: 'Class 10',
    program_type: 'Foundation',
    target_year: '2027',
    is_featured: true,
    test_count: 20,
    planned_tests: 20,
    display_order: 14,
    image_url: '/edvedum/student-foundation.png',
  },
  {
    title: 'AIETS Foundation Class 9 Comprehensive CBT Series',
    slug: 'aiets-foundation-class-9-comprehensive',
    description: 'Foundation CBT mock tests for Class 9 students covering Physics, Chemistry, Biology, Mathematics and Mental Ability to develop competitive exam temperament early.',
    price: 1499.00,
    is_free: false,
    validity_days: 365,
    exam_type: 'Foundation',
    target_class: 'Class 9',
    program_type: 'Foundation',
    target_year: '2028',
    is_featured: false,
    test_count: 16,
    planned_tests: 16,
    display_order: 15,
    image_url: '/edvedum/student-foundation.png',
  },
  {
    title: 'AIETS Foundation Class 8 Comprehensive CBT Series',
    slug: 'aiets-foundation-class-8-comprehensive',
    description: 'Early-stage foundation tests for Class 8 students with Olympiad, NTSE, and strong STEM conceptual focus.',
    price: 1299.00,
    is_free: false,
    validity_days: 365,
    exam_type: 'Foundation',
    target_class: 'Class 8',
    program_type: 'Foundation',
    target_year: '2029',
    is_featured: false,
    test_count: 12,
    planned_tests: 12,
    display_order: 16,
    image_url: '/edvedum/student-foundation.png',
  },
  {
    title: 'AIETS Foundation Class 7 Test Series',
    slug: 'aiets-foundation-class-7-test-series',
    description: 'Conceptual foundation drills in Science & Mathematics for Class 7 young aspirants.',
    price: 999.00,
    is_free: false,
    validity_days: 365,
    exam_type: 'Foundation',
    target_class: 'Class 7',
    program_type: 'Foundation',
    target_year: '2030',
    is_featured: false,
    test_count: 10,
    planned_tests: 10,
    display_order: 17,
    image_url: '/edvedum/student-foundation.png',
  },
  {
    title: 'AIETS Foundation Class 6 Test Series',
    slug: 'aiets-foundation-class-6-test-series',
    description: 'Introductory foundation testing and aptitude exercises for Class 6 young learners.',
    price: 999.00,
    is_free: false,
    validity_days: 365,
    exam_type: 'Foundation',
    target_class: 'Class 6',
    program_type: 'Foundation',
    target_year: '2031',
    is_featured: false,
    test_count: 10,
    planned_tests: 10,
    display_order: 18,
    image_url: '/edvedum/student-foundation.png',
  },
  {
    title: 'Foundation Science & Maths Diagnostic Mock',
    slug: 'foundation-diagnostic-free',
    description: 'Free diagnostic mock for Foundation students (Classes 6-10) to evaluate Science and Mathematical aptitude with instant score report and rank.',
    price: 0.00,
    is_free: true,
    validity_days: 365,
    exam_type: 'Foundation',
    target_class: 'Class 10',
    program_type: 'Foundation',
    target_year: '2027',
    is_featured: false,
    test_count: 1,
    planned_tests: 1,
    display_order: 19,
    image_url: '/edvedum/banners/banner-free-mock.png',
  },
];

async function seedFoundationSeries() {
  const client = await pool.connect();
  try {
    console.log('Seeding Foundation test series into database...');
    for (const s of FOUNDATION_SERIES) {
      const existing = await client.query('SELECT id FROM test_series WHERE slug = $1', [s.slug]);
      if (existing.rowCount > 0) {
        await client.query(
          `UPDATE test_series SET
             title = $1,
             description = $2,
             price = $3,
             is_free = $4,
             validity_days = $5,
             exam_type = $6,
             target_class = $7,
             program_type = $8,
             target_year = $9,
             is_featured = $10,
             test_count = $11,
             planned_tests = $12,
             image_url = $13,
             display_order = $14,
             is_active = true
           WHERE slug = $15`,
          [
            s.title,
            s.description,
            s.price,
            s.is_free,
            s.validity_days,
            s.exam_type,
            s.target_class,
            s.program_type,
            s.target_year,
            s.is_featured,
            s.test_count,
            s.planned_tests,
            s.image_url,
            s.display_order,
            s.slug,
          ]
        );
        console.log(`Updated existing series: ${s.title}`);
      } else {
        await client.query(
          `INSERT INTO test_series (
             title, slug, description, price, is_free, validity_days, exam_type,
             target_class, program_type, target_year, is_featured, test_count,
             planned_tests, image_url, display_order, is_active
           )
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, true)`,
          [
            s.title,
            s.slug,
            s.description,
            s.price,
            s.is_free,
            s.validity_days,
            s.exam_type,
            s.target_class,
            s.program_type,
            s.target_year,
            s.is_featured,
            s.test_count,
            s.planned_tests,
            s.image_url,
            s.display_order,
          ]
        );
        console.log(`Inserted new series: ${s.title}`);
      }
    }
    console.log('Foundation test series seeded successfully!');
  } finally {
    client.release();
    process.exit(0);
  }
}

seedFoundationSeries().catch((err) => {
  console.error('Failed to seed Foundation test series:', err);
  process.exit(1);
});
