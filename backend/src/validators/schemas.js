import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('A valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().trim().toLowerCase().email('A valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  phone: z.string().trim().min(10, 'Mobile number must be at least 10 digits').max(15),
  class: z.string().trim().min(1, 'Class is required'),
  target_exam: z.enum(['JEE', 'NEET'], { required_error: 'Target exam must be JEE or NEET' }),
  otp: z.string().length(6, 'OTP must be 6 digits').optional().or(z.literal('')),
});

export const otpSendSignupSchema = z.object({
  email: z.string().trim().toLowerCase().email('A valid email is required'),
  phone: z.string().trim().min(10, 'Mobile number must be at least 10 digits').max(15).optional().or(z.literal('')),
});

export const adminCreateCandidateSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().trim().toLowerCase().email('A valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().trim().min(10, 'Mobile number must be at least 10 digits').max(15).optional().nullable(),
  class: z.string().trim().min(1, 'Class is required').optional().nullable(),
  target_exam: z.enum(['JEE', 'NEET'], { required_error: 'Target exam must be JEE or NEET' }).optional().nullable(),
});

export const adminUpdateCandidateSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120).optional(),
  email: z.string().trim().toLowerCase().email('A valid email is required').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  phone: z.string().trim().min(10, 'Mobile number must be at least 10 digits').max(15).optional().nullable(),
  class: z.string().trim().min(1, 'Class is required').optional().nullable(),
  target_exam: z.enum(['JEE', 'NEET']).optional().nullable(),
});

export const testSeriesSchema = z.object({
  title: z.string().trim().min(3).max(200),
  description: z.string().max(5000).optional().default(''),
  price: z.number().min(0).default(0),
  validity_days: z.number().int().min(1).max(730).default(365),
  exam_type: z.string().max(60).default('General'),
  test_count: z.number().int().min(0).default(0),
  is_featured: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true),
  image_url: z.string().max(2000).optional().default(''),
});

export const testSeriesUpdateSchema = testSeriesSchema.partial();

export const parsePdfSchema = z.object({
  pdf_base64: z.string().min(100, 'PDF data is required'),
});

export const importPdfTestSeriesSchema = z.object({
  pdf_base64: z.string().min(100, 'PDF data is required'),
  title: z.string().trim().min(3).max(200),
  description: z.string().max(5000).optional().default(''),
  price: z.number().min(0).default(0),
  validity_days: z.number().int().min(1).max(730).default(365),
  exam_type: z.string().max(60).default('General'),
  duration_minutes: z.number().int().min(5).max(600).default(180),
  is_featured: z.boolean().optional().default(false),
  image_url: z.string().max(2000).optional().default(''),
  publish: z.boolean().optional().default(true),
  assessment_label: z.string().max(120).optional().default('Mock 1'),
});

export const enrollSchema = z.object({
  test_series_id: z.number().int().positive(),
});

export const verifyPaymentSchema = z.object({
  test_series_id: z.number().int().positive(),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
});

export const resetPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  token: z.string().min(10),
  password: z.string().min(6),
});

export const bulkUploadSchema = z.object({
  csv: z.string().min(10),
  default_category: z.string().max(60).optional(),
});

export const bankBulkImportSchema = z.object({
  category: z.string().max(60).optional(),
  ids: z.array(z.number().int().positive()).optional(),
  section_id: z.number().int().positive().nullable().optional(),
}).refine((d) => d.category || (d.ids && d.ids.length > 0), {
  message: 'Provide category or ids array',
});

export const linkTestSchema = z.object({
  assessment_id: z.number().int().positive(),
  label: z.string().max(120).optional().default(''),
  position: z.number().int().min(0).optional().default(0),
});

export const markReviewSchema = z.object({
  question_id: z.number().int().positive(),
  marked_for_review: z.boolean().optional(),
});

export const clearAnswerSchema = z.object({
  question_id: z.number().int().positive(),
});

export const otpSendSchema = z.object({
  email: z.string().trim().toLowerCase().email('A valid email is required'),
  invite_token: z.string().uuid('Invalid invitation token'),
});

export const otpVerifySchema = z.object({
  email: z.string().trim().toLowerCase().email('A valid email is required'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
  invite_token: z.string().uuid('Invalid invitation token'),
});

export const otpSendLoginSchema = z.object({
  identifier: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().optional(),
}).refine((d) => d.identifier || d.phone || d.email, {
  message: 'Mobile number or Email is required',
});

export const otpVerifyLoginSchema = z.object({
  identifier: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().optional(),
  otp: z.string().length(6, 'OTP must be 6 digits'),
}).refine((d) => d.identifier || d.phone || d.email, {
  message: 'Mobile number or Email is required',
});

export const firebaseLoginSchema = z.object({
  idToken: z.string().min(1, 'Firebase ID token is required'),
});

export const inviteSchema = z.object({
  assessment_id: z.number().int().positive(),
  candidate_name: z.string().trim().min(2).max(120),
  candidate_email: z.string().trim().toLowerCase().email(),
});

export const sectionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  section_type: z.enum(['aptitude', 'technical_mcq', 'coding', 'subjective']),
  description: z.string().trim().max(2000).optional().default(''),
  position: z.number().int().min(0).optional(),
});

const optionsSchema = z
  .array(z.string().trim().min(1))
  .min(2)
  .max(6);

const questionBaseSchema = z.object({
  question_text: z.string().trim().min(3),
  question_type: z
    .enum(['mcq', 'single_choice', 'multi_select', 'integer', 'numerical', 'assertion_reason', 'coding', 'subjective'])
    .default('mcq'),
  section_id: z.number().int().positive().nullable().optional(),
  options: optionsSchema.optional(),
  correct_index: z.number().int().min(0).optional(),
  correct_indices: z.array(z.number().int().min(0)).optional(),
  numeric_answer: z.number().optional().nullable(),
  numerical_tolerance: z.number().min(0).optional().nullable(),
  assertion_text: z.string().optional().nullable(),
  reason_text: z.string().optional().nullable(),
  marks: z.number().int().min(1).max(100).default(1),
  position: z.number().int().min(0).optional(),
  starter_code: z.string().max(20000).optional(),
  test_cases: z.array(z.object({ input: z.string(), expected: z.string() })).optional(),
  language: z.string().max(30).optional(),
  bank_category: z.string().max(60).optional(),
  solution: z.string().max(10000).optional().nullable(),
  image_url: z.string().max(2000).optional().nullable(),
});

export const questionSchema = questionBaseSchema.superRefine((data, ctx) => {
  if (data.question_type === 'mcq' || data.question_type === 'single_choice' || data.question_type === 'assertion_reason') {
    if ((data.question_type === 'mcq' || data.question_type === 'single_choice') && (!data.options || data.options.length < 2)) {
      ctx.addIssue({ code: 'custom', message: 'MCQ requires at least 2 options', path: ['options'] });
    }
    if (data.correct_index === undefined || (data.options && data.correct_index >= data.options.length)) {
      ctx.addIssue({ code: 'custom', message: 'Invalid correct_index', path: ['correct_index'] });
    }
  }
  if (data.question_type === 'multi_select') {
    if (!data.options || data.options.length < 2) {
      ctx.addIssue({ code: 'custom', message: 'Multi-select requires at least 2 options', path: ['options'] });
    }
    const indices = data.correct_indices || [];
    if (indices.length < 1) {
      ctx.addIssue({ code: 'custom', message: 'Select at least one correct option', path: ['correct_indices'] });
    }
  }
  if (data.question_type === 'integer' || data.question_type === 'numerical') {
    if (data.numeric_answer === undefined || data.numeric_answer === null || Number.isNaN(data.numeric_answer)) {
      ctx.addIssue({ code: 'custom', message: 'Numeric answer is required', path: ['numeric_answer'] });
    }
  }
});

export const questionUpdateSchema = questionBaseSchema.partial();

export const reorderQuestionsSchema = z.object({
  order: z.array(z.object({ id: z.number().int().positive(), position: z.number().int().min(0) })).min(1),
});

export const assessmentSchema = z.object({
  title: z.string().trim().min(3).max(200),
  description: z.string().trim().max(2000).optional().default(''),
  instructions: z.string().trim().max(5000).optional().default(''),
  duration_minutes: z.number().int().min(1).max(600),
  passing_marks: z.number().int().min(0).default(0),
  max_violations: z.number().int().min(0).max(50).default(3),
  result_visible: z.boolean().default(true),
  negative_marking: z.boolean().default(false),
  negative_marks_per_wrong: z.number().min(0).max(10).default(0.25),
  available_from: z.string().trim().optional().nullable(),
  available_until: z.string().trim().optional().nullable(),
});

export const assessmentUpdateSchema = assessmentSchema.partial();

export const saveAnswerSchema = z.object({
  question_id: z.number().int().positive(),
  selected_index: z.number().int().min(0).nullable().optional(),
  selected_indices: z.array(z.number().int().min(0)).optional(),
}).refine((d) => d.selected_index !== undefined || d.selected_indices !== undefined, {
  message: 'Provide selected_index or selected_indices',
});

export const saveCodingSchema = z.object({
  question_id: z.number().int().positive(),
  source_code: z.string().max(50000),
  language: z.string().max(30).default('javascript'),
});

export const saveSubjectiveSchema = z.object({
  question_id: z.number().int().positive(),
  answer_text: z.string().max(10000),
});

export const violationSchema = z.object({
  violation_type: z.string().trim().min(1).max(60),
});
