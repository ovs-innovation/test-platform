import { query, withTransaction } from '../config/db.js';

export const seedAietsProducts = async () => {
  try {
    await withTransaction(async (client) => {
      // 1. Product A: NEET-UG 2027 Comprehensive Test Series (1-Year)
      const prodA = {
        title: 'NEET-UG 2027 Comprehensive Test Series',
        code: 'AIETS-NEET-2027-1Y',
        slug: 'neet-ug-2027-comprehensive-test-series',
        description: 'All India Edvedum Test Series (AIETS) 1-Year Program for Class XII & Droppers. Authentic NEET UG-pattern CBT test series with All India Ranks, detailed step-by-step solution PDFs, and subject analytics.',
        price: 1999.00,
        validity_days: 365,
        exam_type: 'NEET',
        target_year: '2027',
        target_class: 'Class XII & Dropper',
        program_type: 'one-year',
        planned_tests: 39,
        start_date: '2026-10-01',
        end_date: '2027-04-30',
        duration_months: 7,
        languages: JSON.stringify(['English']),
        individual_available: true,
        b2b_available: true,
        is_featured: true,
        is_active: true,
        highlights: JSON.stringify([
          '39 Authentic NEET UG-Pattern CBT Assessments',
          '14 AIETS + 12 Unit + 4 Part + 2 Cumulative + 7 Full Mocks',
          'All India Rank & State Level Peer Benchmarking',
          'Subject-Wise Speed & Accuracy Analytics',
          'Curated eBooks & Digital Solution PDFs'
        ]),
        learning_outcomes: JSON.stringify([
          'Master NEET UG time allocation and section navigation',
          'Identify chapter-wise knowledge gaps and weak areas',
          'Improve problem-solving accuracy in Physics, Chemistry, Botany & Zoology'
        ]),
        included_resources: JSON.stringify([
          'Step-by-step solution PDFs for all 39 tests',
          'Curated NCERT digital formula eBooks',
          'Batch performance reports'
        ]),
        feature_flags: JSON.stringify({
          air_rank: true,
          analytics: true,
          ebooks: true,
          video_solutions: false,
          ai_mentor: false
        })
      };

      await client.query(
        `INSERT INTO test_series (
          title, code, slug, description, price, validity_days, exam_type, target_year, target_class, program_type,
          planned_tests, start_date, end_date, duration_months, languages, individual_available, b2b_available,
          is_featured, is_active, highlights, learning_outcomes, included_resources, feature_flags, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,NOW())
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          code = EXCLUDED.code,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          target_year = EXCLUDED.target_year,
          target_class = EXCLUDED.target_class,
          program_type = EXCLUDED.program_type,
          planned_tests = EXCLUDED.planned_tests,
          start_date = EXCLUDED.start_date,
          end_date = EXCLUDED.end_date,
          duration_months = EXCLUDED.duration_months,
          languages = EXCLUDED.languages,
          highlights = EXCLUDED.highlights,
          learning_outcomes = EXCLUDED.learning_outcomes,
          included_resources = EXCLUDED.included_resources,
          feature_flags = EXCLUDED.feature_flags,
          updated_at = NOW()`,
        [
          prodA.title, prodA.code, prodA.slug, prodA.description, prodA.price, prodA.validity_days, prodA.exam_type,
          prodA.target_year, prodA.target_class, prodA.program_type, prodA.planned_tests, prodA.start_date, prodA.end_date,
          prodA.duration_months, prodA.languages, prodA.individual_available, prodA.b2b_available, prodA.is_featured,
          prodA.is_active, prodA.highlights, prodA.learning_outcomes, prodA.included_resources, prodA.feature_flags
        ]
      );

      // 2. Product B: AIETS Two-Year Online CBT Program (2-Year)
      const prodB = {
        title: 'AIETS Two-Year Online CBT Program',
        code: 'AIETS-NEET-2028-2Y',
        slug: 'aiets-two-year-online-cbt-program',
        description: 'Comprehensive 24-month testing and assessment curriculum for Class XI & XII NEET 2028 aspirants. Includes 60 CBT assessments, phased syllabus coverage, multi-language support, and institutional reporting.',
        price: 3999.00,
        validity_days: 730,
        exam_type: 'NEET',
        target_year: '2028',
        target_class: 'Classes XI & XII',
        program_type: 'two-year',
        planned_tests: 60,
        start_date: '2026-06-01',
        end_date: '2028-05-31',
        duration_months: 24,
        languages: JSON.stringify(['English', 'Hindi', 'Bilingual']),
        individual_available: true,
        b2b_available: true,
        is_featured: true,
        is_active: true,
        highlights: JSON.stringify([
          '60 NEET UG-Pattern CBT Assessments over 24 Months',
          '22 AIETS + 15 Unit + 12 Part + 2 Cumulative + 9 Full Mocks',
          'Multilingual Support: English, Hindi & Bilingual',
          '2-Year Phased Syllabus Progression (Class 11 & Class 12)',
          'All India Peer Ranking & Performance Tracking'
        ]),
        learning_outcomes: JSON.stringify([
          'Build strong Class 11 and 12 NCERT conceptual foundations',
          'Track continuous academic growth across 24 months',
          'Prepare systematically for NEET 2028 with national-level benchmarking'
        ]),
        included_resources: JSON.stringify([
          'Comprehensive eBook library for Class 11 & 12',
          'Detailed explanation PDFs for all tests',
          'Institutional batch reports'
        ]),
        feature_flags: JSON.stringify({
          air_rank: true,
          analytics: true,
          ebooks: true,
          video_solutions: false,
          ai_mentor: false
        })
      };

      await client.query(
        `INSERT INTO test_series (
          title, code, slug, description, price, validity_days, exam_type, target_year, target_class, program_type,
          planned_tests, start_date, end_date, duration_months, languages, individual_available, b2b_available,
          is_featured, is_active, highlights, learning_outcomes, included_resources, feature_flags, updated_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,NOW())
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          code = EXCLUDED.code,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          target_year = EXCLUDED.target_year,
          target_class = EXCLUDED.target_class,
          program_type = EXCLUDED.program_type,
          planned_tests = EXCLUDED.planned_tests,
          start_date = EXCLUDED.start_date,
          end_date = EXCLUDED.end_date,
          duration_months = EXCLUDED.duration_months,
          languages = EXCLUDED.languages,
          highlights = EXCLUDED.highlights,
          learning_outcomes = EXCLUDED.learning_outcomes,
          included_resources = EXCLUDED.included_resources,
          feature_flags = EXCLUDED.feature_flags,
          updated_at = NOW()`,
        [
          prodB.title, prodB.code, prodB.slug, prodB.description, prodB.price, prodB.validity_days, prodB.exam_type,
          prodB.target_year, prodB.target_class, prodB.program_type, prodB.planned_tests, prodB.start_date, prodB.end_date,
          prodB.duration_months, prodB.languages, prodB.individual_available, prodB.b2b_available, prodB.is_featured,
          prodB.is_active, prodB.highlights, prodB.learning_outcomes, prodB.included_resources, prodB.feature_flags
        ]
      );
    });

    console.log('[seed] AIETS Products A and B seeded successfully.');
  } catch (err) {
    console.error('[seed] Error seeding AIETS products:', err.message);
  }
};
