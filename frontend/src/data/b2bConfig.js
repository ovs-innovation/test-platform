// ================= B2B INSTITUTIONAL CONFIGURATION =================
// Centralized configuration for AIETS packages, pricing rules, tax rates, and options.

export const B2B_PACKAGES = [
  {
    id: 'neet-2027-1yr',
    dbId: 20,
    code: 'AIETS-NEET-2027-1Y',
    slug: 'neet-ug-2027-aiets-comprehensive-test-series',
    title: 'NEET-UG 2027 Comprehensive Test Series',
    target: 'NEET-UG 2027',
    suitableFor: 'Class XII and Class XII-pass/dropper students',
    duration: 'October 2026 to April 2027',
    totalTests: 39,
    breakdown: {
      aiets: 14,
      unitTests: 12,
      partTests: 4,
      cumulativeTests: 2,
      fullMocks: 7,
    },
    baseRetailPrice: 1999,
    popular: true,
    features: [
      '39 NEET UG-Pattern Full CBT Tests',
      'All India Student Ranking & State Benchmark',
      'Detailed Subject-Wise & Chapter-Wise Reports',
      'Curated eBooks & Digital Solution PDFs',
      'Personalized Time & Accuracy Analytics',
      'Mentoring sessions as included in the selected package',
    ],
  },
  {
    id: 'neet-2028-2yr',
    dbId: 21,
    code: 'AIETS-NEET-2028-2Y',
    slug: 'aiets-neet-ug-2028-two-year-online-cbt-program',
    title: 'AIETS Two-Year Online CBT Program',
    target: 'NEET-UG 2028',
    suitableFor: 'Classes XI and XII students',
    duration: '24 Months',
    totalTests: 60,
    breakdown: {
      aiets: 22,
      unitTests: 15,
      partTests: 12,
      cumulativeTests: 2,
      fullMocks: 9,
    },
    baseRetailPrice: 3999,
    popular: false,
    features: [
      '60 NEET UG-Pattern Full CBT Tests across 2 Years',
      'Continuous 24-Month Progress Tracking',
      'Chapter-by-Chapter Foundation Drills',
      'All India & Regional Peer Benchmarking',
      'Curated eBooks, Formula Guides & Solutions',
      'Mentoring sessions as included in the selected package',
    ],
  },
];

export function getB2BPackageBySlug(slug) {
  if (!slug) return B2B_PACKAGES[0];
  const s = String(slug).toLowerCase().trim();
  return (
    B2B_PACKAGES.find(
      (p) =>
        p.slug === s ||
        p.id === s ||
        p.code.toLowerCase() === s ||
        String(p.dbId) === s
    ) || B2B_PACKAGES[0]
  );
}

export function getB2BPackageById(id) {
  if (!id) return B2B_PACKAGES[0];
  const searchId = String(id).toLowerCase().trim();
  return (
    B2B_PACKAGES.find(
      (p) =>
        p.id === searchId ||
        String(p.dbId) === searchId ||
        p.slug === searchId ||
        p.code.toLowerCase() === searchId
    ) || B2B_PACKAGES[0]
  );
}

// Volume discount tiers applied to standard retail price
export const PRICING_TIERS = [
  { minStudents: 50, maxStudents: 199, discountPercent: 0, label: 'Standard Rate' },
  { minStudents: 200, maxStudents: 499, discountPercent: 25, label: '25% Volume Savings' },
  { minStudents: 500, maxStudents: 999, discountPercent: 40, label: '40% Bulk Tier' },
  { minStudents: 1000, maxStudents: 5000, discountPercent: 50, label: '50% Maximum Volume Tier' },
];

export const TAX_CONFIG = {
  gstRate: 0.18, // 18% GST
  taxLabel: '18% GST (HSN 9992)',
};

export const INSTITUTION_TYPES = [
  'School',
  'Coaching Institute',
  'College',
  'Educational Organization',
  'Other',
];

export const TARGET_EXAMINATIONS = [
  'NEET',
  'JEE',
  'Both',
];

export const INTERESTED_PACKAGES = [
  'NEET-UG 2027 One-Year Program',
  'NEET-UG 2028 Two-Year Program',
  'Custom Institutional Package',
  'Not Sure',
];

export const B2B_FAQS = [
  {
    q: 'What is AIETS and how does it benefit our institution?',
    a: 'AIETS (All India Edvedum Test Series) is Edvedum’s national-level testing program designed to provide structured assessments, realistic NEET / JEE-pattern CBT practice, national rankings, subject-wise analytics, detailed solution PDFs, and personalized improvement insights for NEET aspirants.',
  },
  {
    q: 'How does bulk student onboarding work for partner institutions?',
    a: 'Once your institution is onboarded, you get access to your Institution Admin Dashboard. You can upload student rosters via CSV/Excel in seconds, auto-generate login credentials, assign test series, and track batch performance in real time.',
  },
  {
    q: 'Can we receive custom institutional pricing for large student batches?',
    a: 'Yes. We offer bulk volume discounts ranging from 25% up to 50% off retail pricing based on your student batch size and selected AIETS program.',
  },
  {
    q: 'How are student login credentials created and distributed?',
    a: 'Credentials can be generated automatically in bulk through your Institution Dashboard or issued by our onboarding team. Students log in using their unique Student ID or registered email.',
  },
  {
    q: 'What analytics and reports are provided to institutional admins?',
    a: 'Institution admins receive real-time dashboard analytics including student participation rates, test completion percentages, batch average scores, subject-wise performance breakdowns, and downloadable Excel/PDF summary reports.',
  },
  {
    q: 'Are mentoring sessions included for all students?',
    a: 'Mentoring sessions are provided as included in the selected package. Custom institutional packages can also be configured with dedicated faculty review sessions.',
  },
  {
    q: 'How long does implementation and setup take?',
    a: 'Institutional onboarding is completed within 24 hours of agreement confirmation. Your institution dashboard and student accounts will be ready for immediate test deployment.',
  },
  {
    q: 'Will we receive official GST tax invoices for institutional payments?',
    a: 'Yes. All institutional partnerships include GST tax invoices with standard HSN code classification and clear pricing breakdowns.',
  },
  {
    q: 'What technical support is provided to partner institutions?',
    a: 'Partner institutions receive dedicated institutional support, an assigned onboarding specialist, priority technical help, and guidance for conducting CBT mock tests smoothly.',
  },
];

/**
 * Calculates volume pricing for a given package and student count.
 */
export function calculateInstitutionalQuote(packageId, studentCount) {
  const pkg = getB2BPackageById(packageId);
  const count = Math.max(1, Number(studentCount) || 50);

  let discountPercent = 0;
  let tierLabel = 'Standard Rate';

  for (const tier of PRICING_TIERS) {
    if (count >= tier.minStudents) {
      discountPercent = tier.discountPercent;
      tierLabel = tier.label;
    }
  }

  const retailPricePerStudent = pkg.baseRetailPrice;
  const discountedPricePerStudent = Math.round(retailPricePerStudent * (1 - discountPercent / 100));

  const retailSubtotal = count * retailPricePerStudent;
  const subtotal = count * discountedPricePerStudent;
  const totalSavings = retailSubtotal - subtotal;
  const taxAmount = Math.round(subtotal * TAX_CONFIG.gstRate);
  const grandTotal = subtotal + taxAmount;

  return {
    package: pkg,
    studentCount: count,
    discountPercent,
    tierLabel,
    retailPricePerStudent,
    discountedPricePerStudent,
    retailSubtotal,
    subtotal,
    totalSavings,
    taxAmount,
    grandTotal,
  };
}
