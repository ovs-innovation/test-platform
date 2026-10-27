// ================= B2B INSTITUTIONAL CONFIGURATION =================
// Centralized configuration for AIETS packages, pricing rules, tax rates, and options.

export const B2B_PACKAGES = [
  {
    id: 'neet-2027-1yr',
    dbId: 20,
    code: 'AIETS-NEET-2027-1Y',
    slug: 'neet-ug-2027-aiets-comprehensive-test-series',
    title: 'AIETS Package Pricing • One-Year Program',
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
    baseRetailPrice: 2000,
    regularPrice: 2999,
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
    title: 'AIETS Package Pricing • Two-Year Program',
    target: 'NEET-UG 2028',
    suitableFor: 'Classes XI and XII students',
    duration: '24 Months',
    totalTests: 78,
    breakdown: {
      aiets: 28,
      unitTests: 24,
      partTests: 8,
      cumulativeTests: 4,
      fullMocks: 14,
    },
    baseRetailPrice: 4000,
    regularPrice: 6000,
    popular: false,
    features: [
      '78 NEET UG-Pattern Full CBT Tests across 2 Years',
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

// Volume discounts apply to the institute price, not the regular price.
export const PRICING_TIERS = [
  { minStudents: 50, maxStudents: 100, discountPercent: 10, label: '10% discount · 50–100 students' },
  { minStudents: 101, maxStudents: 200, discountPercent: 15, label: '15% discount · 101–200 students' },
  { minStudents: 201, maxStudents: 300, discountPercent: 20, label: '20% discount · 201–300 students' },
  { minStudents: 301, maxStudents: 500, discountPercent: 25, label: '25% discount · 301–500 students' },
  { minStudents: 501, maxStudents: 1000, discountPercent: 30, label: '30% discount · 501–1,000 students' },
  { minStudents: 1001, maxStudents: Infinity, discountPercent: 30, label: '30% discount · above 1,000 students' },
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
  'AIETS Package Pricing • One-Year Program',
  'AIETS Package Pricing • Two-Year Program',
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
    a: 'Yes. Institutional discounts range from 10% to 30% based on your student batch size and selected AIETS program.',
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

  const tier = PRICING_TIERS.find(
    ({ minStudents, maxStudents }) => count >= minStudents && count <= maxStudents
  );
  const discountPercent = tier?.discountPercent || 0;
  const tierLabel = tier?.label || 'Below minimum batch size';

  const retailPricePerStudent = pkg.regularPrice;
  const institutePricePerStudent = pkg.baseRetailPrice;
  const discountedPricePerStudent = Math.round(institutePricePerStudent * (1 - discountPercent / 100));

  const retailSubtotal = count * retailPricePerStudent;
  const instituteSubtotal = count * institutePricePerStudent;
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
    institutePricePerStudent,
    discountedPricePerStudent,
    retailSubtotal,
    instituteSubtotal,
    subtotal,
    totalSavings,
    taxAmount,
    grandTotal,
  };
}
