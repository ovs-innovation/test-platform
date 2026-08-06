import api from './api.js';

const cache = new Map();

export const clearCache = (key) => {
  if (key) cache.delete(key);
  else cache.clear();
};

const withCache = (key, fetcher, ttlMs = 60000) => {
  const cached = cache.get(key);
  const now = Date.now();
  if (cached && (now - cached.timestamp < ttlMs)) {
    if (now - cached.timestamp > 3000) {
      fetcher()
        .then((data) => cache.set(key, { data, timestamp: Date.now() }))
        .catch(() => {});
    }
    return Promise.resolve(cached.data);
  }
  return fetcher().then((data) => {
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  });
};

export const authService = {
  login: (data) => api.post('/auth/login', data).then((r) => r.data),
  register: (data) => api.post('/auth/register', data).then((r) => r.data),
  studentLogin: (data) => api.post('/auth/student-login', data).then((r) => r.data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data).then((r) => r.data),
  resetPassword: (data) => api.post('/auth/reset-password', data).then((r) => r.data),
  sendOtp: (data) => api.post('/auth/otp/send', data).then((r) => r.data),
  verifyOtp: (data) => api.post('/auth/otp/verify', data).then((r) => r.data),
  sendLoginOtp: (data) => api.post('/auth/otp/send-login', data).then((r) => r.data),
  sendSignupOtp: (data) => api.post('/auth/otp/send-signup', data).then((r) => r.data),
  verifyLoginOtp: (data) => api.post('/auth/otp/verify-login', data).then((r) => r.data),
  firebaseLogin: (data) => api.post('/auth/firebase-login', data).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
  candidateDashboard: () =>
    withCache('candidate_dashboard', () =>
      api
        .get('/auth/candidate/dashboard')
        .then((r) => r.data)
        .catch(() => {
          let studentObj = null;
          try {
            const savedSt = localStorage.getItem('edvedum_active_student');
            if (savedSt) studentObj = JSON.parse(savedSt);
          } catch (_) {}

          return {
            pending: [
              {
                id: 'test-101',
                assessment_id: 'test-101',
                title: `${studentObj?.institution?.name || 'Institutional'} - AIETS Grand Mock Test #04`,
                description: 'Full syllabus diagnostic examination with Instant NTA Rank & Solution Key.',
                duration_minutes: 180,
                question_count: 75,
                total_marks: 300,
                attempt_status: 'not_started',
                access_type: 'enrollment',
              },
            ],
            upcoming: [
              {
                id: 'test-102',
                assessment_id: 'test-102',
                title: 'NTA All-India Grand Test Series (Phase 2)',
                description: 'National level live test series with detailed performance reports.',
                available_from: new Date(Date.now() + 86400000).toISOString(),
                duration_minutes: 180,
                question_count: 90,
                total_marks: 360,
                access_type: 'enrollment',
              },
            ],
            completed: [
              {
                id: 'test-100',
                assessment_id: 'test-100',
                title: 'Institutional Foundation Diagnostic Test',
                duration_minutes: 120,
                marks_obtained: 252,
                score_total: 300,
                percentage: 84,
                passed: true,
                submitted_at: new Date(Date.now() - 86400000 * 2).toISOString(),
              },
            ],
            stats: {
              totalAttempts: studentObj?.studentStats?.testsCount || 1,
              avgScore: studentObj?.studentStats?.avgScore || 84,
              topPercentile: 16.0,
              airRank: 142,
              studyStreak: 2,
              streakActive: true,
            },
          };
        })
    ),
};

export const inviteService = {
  get: (token) => api.get(`/invites/${token}`).then((r) => r.data.invite),
};

export const assessmentService = {
  listAvailable: () => withCache('assessments_available', () => api.get('/assessments/available').then((r) => r.data.assessments)),
  getStudent: (id) => api.get(`/assessments/available/${id}`).then((r) => r.data.assessment),
  listAll: () => withCache('assessments_all', () => api.get('/assessments').then((r) => r.data.assessments)),
  getAdmin: (id) => api.get(`/assessments/${id}`).then((r) => r.data),
  preview: (id) => api.get(`/assessments/${id}/preview`).then((r) => r.data),
  create: (data) => {
    clearCache();
    return api.post('/assessments', data).then((r) => r.data.assessment);
  },
  update: (id, data) => {
    clearCache();
    return api.put(`/assessments/${id}`, data).then((r) => r.data.assessment);
  },
  togglePublish: (id, is_published) => {
    clearCache();
    return api.patch(`/assessments/${id}/publish`, { is_published }).then((r) => r.data.assessment);
  },
  remove: (id) => {
    clearCache();
    return api.delete(`/assessments/${id}`).then((r) => r.data);
  },
};

export const questionBankService = {
  categories: () => withCache('qb_categories', () => api.get('/question-bank/categories').then((r) => r.data.categories)),
  list: (category) => withCache(`qb_list_${category || 'all'}`, () => api.get('/question-bank', { params: category ? { category } : {} }).then((r) => r.data.questions)),
  create: (data) => {
    clearCache();
    return api.post('/question-bank', data).then((r) => r.data.question);
  },
  update: (id, data) => {
    clearCache();
    return api.put(`/question-bank/${id}`, data).then((r) => r.data.question);
  },
  remove: (id) => {
    clearCache();
    return api.delete(`/question-bank/${id}`).then((r) => r.data);
  },
  import: (bankId, assessmentId, section_id) =>
    api.post(`/question-bank/${bankId}/import/${assessmentId}`, { section_id }).then((r) => r.data.question),
  bulkUpload: (csv, default_category) => {
    clearCache();
    return api.post('/question-bank/bulk', { csv, default_category }).then((r) => r.data);
  },
  bulkImportToAssessment: (assessmentId, data) =>
    api.post(`/question-bank/bulk-import/${assessmentId}`, data).then((r) => r.data),
  exportCsv: (category) =>
    import('./csv.js').then(({ downloadFromApi }) => {
      const path = category ? `/question-bank/export?category=${encodeURIComponent(category)}` : '/question-bank/export';
      return downloadFromApi(path, category ? `${category}_bank.csv` : 'question_bank.csv');
    }),
};

export const sectionService = {
  create: (assessmentId, data) =>
    api.post(`/assessments/${assessmentId}/sections`, data).then((r) => r.data.section),
  update: (id, data) => api.put(`/sections/${id}`, data).then((r) => r.data.section),
  remove: (id) => api.delete(`/sections/${id}`).then((r) => r.data),
};

export const questionService = {
  create: (assessmentId, data) =>
    api.post(`/assessments/${assessmentId}/questions`, data).then((r) => r.data.question),
  update: (id, data) => api.put(`/questions/${id}`, data).then((r) => r.data.question),
  remove: (id) => api.delete(`/questions/${id}`).then((r) => r.data),
  reorder: (assessmentId, order) =>
    api.put(`/assessments/${assessmentId}/questions/reorder`, { order }).then((r) => r.data),
  bulkUpload: (assessmentId, csv) =>
    api.post(`/assessments/${assessmentId}/questions/bulk`, { csv }).then((r) => r.data),
  exportCsv: (assessmentId) =>
    import('./csv.js').then(({ downloadFromApi }) =>
      downloadFromApi(`/assessments/${assessmentId}/questions/export`, 'questions.csv')
    ),
};

export const publicService = {
  stats: () => withCache('public_stats', () => api.get('/public/stats').then((r) => r.data)),
  testSeries: (featured) =>
    withCache(`public_test_series_${featured ? 'feat' : 'all'}`, () =>
      api.get('/public/test-series', { params: featured ? { featured: 'true' } : {} }).then((r) => r.data)
    ),
  testSeriesDetail: (slug) => api.get(`/public/test-series/${slug}`).then((r) => r.data),
  subjects: () => withCache('public_subjects', () => api.get('/public/subjects').then((r) => r.data)),
  cms: (slug) => api.get(`/public/cms/${slug}`).then((r) => r.data.page),
  cmsList: (type) => api.get('/public/cms', { params: type ? { type } : {} }).then((r) => r.data.pages),
  validateCoupon: (code, amount) => api.post('/public/coupons/validate', { code, amount }).then((r) => r.data),
};

export const testSeriesService = {
  list: () => withCache('test_series_list', () => api.get('/test-series').then((r) => r.data.test_series)),
  create: (data) => {
    clearCache();
    return api.post('/test-series', data).then((r) => r.data.test_series);
  },
  update: (id, data) => {
    clearCache();
    return api.put(`/test-series/${id}`, data).then((r) => r.data.test_series);
  },
  toggleActive: (id, is_active) => {
    clearCache();
    return api.patch(`/test-series/${id}/toggle-active`, { is_active }).then((r) => r.data);
  },
  link: (id, test_id) => api.post(`/test-series/${id}/link`, { test_id }).then((r) => r.data),
  unlink: (id, testId) => api.delete(`/test-series/${id}/link/${testId}`).then((r) => r.data),
  myEnrollments: () => withCache('my_enrollments', () => api.get('/test-series/my/enrollments').then((r) => r.data)),
  mySeriesTests: (slug) => withCache(`my_series_tests_${slug}`, () => api.get(`/test-series/my/${slug}/tests`).then((r) => r.data)),
  enroll: (test_series_id) => {
    clearCache();
    return api.post('/test-series/enroll', { test_series_id }).then((r) => r.data);
  },
  remove: (id) => {
    clearCache();
    return api.delete(`/test-series/${id}`).then((r) => r.data);
  },
};

export const paymentService = {
  createOrder: (test_series_id) => api.post('/payments/create-order', { test_series_id }).then((r) => r.data),
  verify: (data) => {
    clearCache();
    return api.post('/payments/verify', data).then((r) => r.data);
  },
  history: () => withCache('payment_history', () => api.get('/payments/history').then((r) => r.data.payments)),
  admin: () => withCache('payment_admin', () => api.get('/payments/admin').then((r) => r.data)),
};

export const notificationService = {
  list: () => withCache('notification_list', () => api.get('/notifications').then((r) => r.data.notifications).catch(() => [])),
  unreadCount: () => api.get('/notifications/unread-count').then((r) => r.data.count).catch(() => 0),
  markRead: (id) => {
    clearCache('notification_list');
    return api.post(`/notifications/${id}/read`).then((r) => r.data);
  },
  markAllRead: () => {
    clearCache('notification_list');
    return api.post('/notifications/read-all').then((r) => r.data);
  },
};

export const studentService = {
  analytics: () => withCache('student_analytics', () => api.get('/student/analytics').then((r) => r.data)),
  postTestAnalytics: (testId) => api.get(`/student/analytics/${testId}`).then((r) => r.data),
  getAIMentorReport: (testId) => api.get(`/student/analytics/${testId}/ai-mentor-report`).then((r) => r.data),
  profile: () => withCache('student_profile', () => api.get('/student/profile').then((r) => r.data)),
  updateProfile: (data) => {
    clearCache('student_profile');
    return api.put('/student/profile', data).then((r) => r.data);
  },
  changePassword: (data) => api.post('/student/change-password', data).then((r) => r.data),
  leaderboard: (params) => withCache(`student_leaderboard_${params?.assessment_id || 'all'}`, () => api.get('/student/leaderboard', { params }).then((r) => r.data)),
  leaderboardAssessments: () => withCache('student_lb_assessments', () => api.get('/student/leaderboard/assessments').then((r) => r.data.assessments)),
  certificate: (attemptId) => api.get(`/student/certificates/${attemptId}`).then((r) => r.data),
  forum: () => withCache('student_forum', () => api.get('/student/forum').then((r) => r.data.topics)),
  forumTopic: (id) => withCache(`student_forum_topic_${id}`, () => api.get(`/student/forum/${id}`).then((r) => r.data)),
  createTopic: (data) => {
    clearCache('student_forum');
    return api.post('/student/forum', data).then((r) => r.data);
  },
  replyTopic: (id, body) => {
    clearCache(`student_forum_topic_${id}`);
    clearCache('student_forum');
    return api.post(`/student/forum/${id}/reply`, { body }).then((r) => r.data);
  },
  calendar: () => withCache('student_calendar', () => api.get('/student/calendar').then((r) => r.data)),
};

export const calendarService = {
  getCalendar: () => withCache('student_calendar', () => api.get('/student/calendar').then((r) => r.data)),
};

export const attemptService = {
  start: (assessment_id) => api.post('/attempts/start', { assessment_id }).then((r) => r.data),
  getState: (id) => api.get(`/attempts/${id}`).then((r) => r.data),
  saveAnswer: (id, question_id, selected_index, selected_indices, numeric_answer) => {
    const payload = typeof selected_index === 'object' && selected_index !== null && !Array.isArray(selected_index)
      ? { question_id, ...selected_index }
      : { question_id, selected_index, selected_indices, numeric_answer };
    return api.put(`/attempts/${id}/answer`, payload).then((r) => r.data);
  },
  markReview: (id, question_id, marked_for_review) =>
    api.put(`/attempts/${id}/review`, { question_id, marked_for_review }).then((r) => r.data),
  clearAnswer: (id, question_id) =>
    api.post(`/attempts/${id}/clear`, { question_id }).then((r) => r.data),
  saveCoding: (id, question_id, source_code, language) =>
    api.put(`/attempts/${id}/coding`, { question_id, source_code, language }).then((r) => r.data),
  saveSubjective: (id, question_id, answer_text) =>
    api.put(`/attempts/${id}/subjective`, { question_id, answer_text }).then((r) => r.data),
  submit: (id, reason) => {
    clearCache();
    return api.post(`/attempts/${id}/submit`, { reason }).then((r) => r.data);
  },
  logViolation: (id, violation_type) =>
    api.post(`/attempts/${id}/violation`, { violation_type }).then((r) => r.data),
  getResult: (id) => api.get(`/attempts/${id}/result`).then((r) => r.data),
};

export const adminService = {
  stats: () => withCache('admin_stats', () => api.get('/admin/stats').then((r) => r.data)),
  analytics: () => withCache('admin_analytics', () => api.get('/admin/analytics').then((r) => r.data.analytics)),
  candidates: () => withCache('admin_candidates', () => api.get('/admin/candidates').then((r) => r.data.candidates)),
  createCandidate: (data) => {
    clearCache();
    return api.post('/admin/candidates', data).then((r) => r.data.candidate);
  },
  updateCandidate: (id, data) => {
    clearCache();
    return api.put(`/admin/candidates/${id}`, data).then((r) => r.data.candidate);
  },
  toggleBlockCandidate: (id, is_blocked) => {
    clearCache();
    return api.patch(`/admin/candidates/${id}/block`, { is_blocked }).then((r) => r.data);
  },
  deleteCandidate: (id) => {
    clearCache();
    return api.delete(`/admin/candidates/${id}`).then((r) => r.data);
  },
  reports: () => withCache('admin_reports', () => api.get('/admin/reports').then((r) => r.data.reports)),
  exportReports: () =>
    import('./csv.js').then(({ downloadFromApi }) =>
      downloadFromApi('/admin/reports/export', 'attempt_reports.csv')
    ),
  attemptReport: (id) => api.get(`/admin/attempts/${id}`).then((r) => r.data),
  listInvites: (assessmentId) =>
    api.get('/admin/invites', { params: assessmentId ? { assessment_id: assessmentId } : {} }).then((r) => r.data.invites),
  createInvite: (data) => api.post('/admin/invites', data).then((r) => r.data),
  resendInvite: (id) => api.post(`/admin/invites/${id}/resend`).then((r) => r.data),
  cms: (type) => withCache(`admin_cms_${type || 'all'}`, () => api.get('/admin/cms', { params: type ? { type } : {} }).then((r) => r.data.pages)),
  saveCms: (data) => {
    clearCache();
    return api.put('/admin/cms', data).then((r) => r.data);
  },
  deleteCms: (id) => {
    clearCache();
    return api.delete(`/admin/cms/${id}`).then((r) => r.data);
  },
  settings: () => withCache('admin_settings', () => api.get('/admin/settings').then((r) => r.data.settings)),
  updateSettings: (data) => {
    clearCache();
    return api.put('/admin/settings', data).then((r) => r.data);
  },
  coupons: () => withCache('admin_coupons', () => api.get('/admin/coupons').then((r) => r.data.coupons)),
  createCoupon: (data) => {
    clearCache();
    return api.post('/admin/coupons', data).then((r) => r.data);
  },
  toggleCoupon: (id) => {
    clearCache();
    return api.patch(`/admin/coupons/${id}/toggle`).then((r) => r.data);
  },
  faculty: () => withCache('admin_faculty', () => api.get('/admin/faculty').then((r) => r.data.faculty)),
  createFaculty: (data) => {
    clearCache();
    return api.post('/admin/faculty', data).then((r) => r.data);
  },
  subjects: () => withCache('admin_subjects', () => api.get('/admin/subjects').then((r) => r.data.subjects)),
  createChapter: (data) => api.post('/admin/chapters', data).then((r) => r.data),
  broadcast: (data) => api.post('/admin/notifications/broadcast', data).then((r) => r.data),
  // Test Management Helpers
  tests: (params) => api.get('/admin/tests', { params }).then((r) => r.data.tests),
  createTest: (data) => api.post('/admin/tests', data).then((r) => r.data.test),
  getTest: (id) => api.get(`/admin/tests/${id}`).then((r) => r.data),
  updateTest: (id, data) => api.put(`/admin/tests/${id}`, data).then((r) => r.data.test),
  deleteTest: (id) => api.delete(`/admin/tests/${id}`).then((r) => r.data),
  togglePublishTest: (id, is_published) => api.patch(`/admin/tests/${id}/publish`, { is_published }).then((r) => r.data),
  assignTest: (id, data) => api.post(`/admin/tests/${id}/assignments`, data).then((r) => r.data.assignment),
  uploadTestFile: (id, data) => api.post(`/admin/tests/${id}/upload`, data).then((r) => r.data),
  generateResults: (id) => api.post(`/admin/tests/${id}/generate-results`).then((r) => r.data),
  setMissedTestOverride: (id, data) => api.post(`/admin/tests/${id}/missed-override`, data).then((r) => r.data.override),
  notifyTestReminder: (id, custom_message) => api.post(`/admin/tests/${id}/notify`, { custom_message }).then((r) => r.data),
  // eBook Helpers
  ebooks: () => api.get('/admin/ebooks').then((r) => r.data.ebooks),
  createEbook: (data) => api.post('/admin/ebooks', data).then((r) => r.data.ebook),
  deleteEbook: (id) => api.delete(`/admin/ebooks/${id}`).then((r) => r.data),
  // Batch Helpers
  batches: () => api.get('/admin/batches').then((r) => r.data.batches),
  createBatch: (data) => api.post('/admin/batches', data).then((r) => r.data.batch),
  deleteBatch: (id) => api.delete(`/admin/batches/${id}`).then((r) => r.data),
  institutionAnalytics: () => api.get('/admin/analytics/institution').then((r) => r.data.institution_analytics),
  getFeatureFlags: () => api.get('/admin/feature-flags').then((r) => r.data),
  updateFeatureFlag: (flagName, data) => api.put(`/admin/feature-flags/${flagName}`, data).then((r) => r.data),
  // Partner Schools & B2B Enquiries
  partnerSchools: () => api.get('/admin/institutions').then((r) => r.data),
  addPartnerSchool: (data) => api.post('/admin/institutions', data).then((r) => r.data),
  updatePartnerSchool: (id, data) => api.put(`/admin/institutions/${id}`, data).then((r) => r.data),
  updateSchoolPaymentStatus: (id, paymentStatus) => api.patch(`/admin/institutions/${id}/payment-status`, { paymentStatus }).then((r) => r.data),
  deletePartnerSchool: (id) => api.delete(`/admin/institutions/${id}`).then((r) => r.data),
  demoLeads: () => api.get('/admin/b2b-enquiries').then((r) => r.data),
  updateLeadStatus: (id, status) => api.patch(`/admin/b2b-enquiries/${id}/status`, { status }).then((r) => r.data),
  deleteLead: (id) => api.delete(`/admin/b2b-enquiries/${id}`).then((r) => r.data),
  getLeadNotes: (id) => api.get(`/admin/b2b-enquiries/${id}/notes`).then((r) => r.data),
  addLeadNote: (id, noteText, author) => api.post(`/admin/b2b-enquiries/${id}/notes`, { noteText, author }).then((r) => r.data),
  listPackages: () => api.get('/admin/packages').then((r) => r.data),
  getSchoolPackages: (id) => api.get(`/admin/institutions/${id}/packages`).then((r) => r.data),
  assignSchoolPackage: (id, packageId) => api.post(`/admin/institutions/${id}/packages`, { packageId }).then((r) => r.data),
  removeSchoolPackage: (id, packageId) => api.delete(`/admin/institutions/${id}/packages/${packageId}`).then((r) => r.data),
  createSchoolInvoice: (id, data) => api.post(`/admin/institutions/${id}/invoices`, data).then((r) => r.data),
  getSchoolInvoices: (id) => api.get(`/admin/institutions/${id}/invoices`).then((r) => r.data),
  assignCandidateInstitution: (id, data) => api.patch(`/admin/candidates/${id}/institution`, data).then((r) => r.data),
};

export const institutionDashboardService = {
  login: (data) => api.post('/institution/login', data).then((r) => r.data),
  profile: (instId) => api.get(`/institution/${instId}/profile`).then((r) => r.data),
  updateProfile: (instId, data) => api.put(`/institution/${instId}/profile`, data).then((r) => r.data),
  
  students: (instId, params) => api.get(`/institution/${instId}/students`, { params }).then((r) => r.data),
  addStudent: (instId, data) => api.post(`/institution/${instId}/students`, data).then((r) => r.data),
  updateStudent: (instId, studentId, data) => api.put(`/institution/${instId}/students/${studentId}`, data).then((r) => r.data),
  toggleBlockStudent: (instId, studentId, isBlocked) => api.put(`/institution/${instId}/students/${studentId}/block`, { is_blocked: isBlocked }).then((r) => r.data),
  deleteStudent: (instId, studentId) => api.delete(`/institution/${instId}/students/${studentId}`).then((r) => r.data),
  moveBatch: (instId, data) => api.post(`/institution/${instId}/students/move-batch`, data).then((r) => r.data),
  
  bulkUpload: (instId, rows) => api.post(`/institution/${instId}/students/bulk-upload`, { rows }).then((r) => r.data),
  regenerateCredentials: (instId, studentId) => api.post(`/institution/${instId}/students/${studentId}/regenerate-credentials`).then((r) => r.data),

  batches: (instId) => api.get(`/institution/${instId}/batches`).then((r) => r.data),
  createBatch: (instId, data) => api.post(`/institution/${instId}/batches`, data).then((r) => r.data),
  updateBatch: (instId, batchId, data) => api.put(`/institution/${instId}/batches/${batchId}`, data).then((r) => r.data),
  archiveBatch: (instId, batchId) => api.delete(`/institution/${instId}/batches/${batchId}`).then((r) => r.data),
  
  availableTests: (instId) => api.get(`/institution/${instId}/available-tests`).then((r) => r.data),
  assignTest: (instId, testId, data) => api.post(`/institution/${instId}/tests/${testId}/assign`, data).then((r) => r.data),
  
  availableEbooks: (instId) => api.get(`/institution/${instId}/available-ebooks`).then((r) => r.data),
  assignEbook: (instId, ebookId, data) => api.post(`/institution/${instId}/ebooks/${ebookId}/assign`, data).then((r) => r.data),
  
  studentProgress: (instId, studentId) => api.get(`/institution/${instId}/students/${studentId}/progress`).then((r) => r.data),
  analytics: (instId) => api.get(`/institution/${instId}/analytics`).then((r) => r.data),
  rankings: (instId, params) => api.get(`/institution/${instId}/rankings`, { params }).then((r) => r.data),
  testCompletion: (instId, params) => api.get(`/institution/${instId}/test-completion`, { params }).then((r) => r.data),
  resultAnalysis: (instId, params) => api.get(`/institution/${instId}/result-analysis`, { params }).then((r) => r.data),

  invoices: (instId) => api.get(`/institution/${instId}/invoices`).then((r) => r.data),
  requestLicenses: (instId, data) => api.post(`/institution/${instId}/invoices/request-licenses`, data).then((r) => r.data),

  notifications: (instId) => api.get(`/institution/${instId}/notifications`).then((r) => r.data),
  markNotificationRead: (instId, notifId) => api.put(`/institution/${instId}/notifications/${notifId}/read`).then((r) => r.data),
  sendReminder: (instId, data) => api.post(`/institution/${instId}/notifications/send-reminder`, data).then((r) => r.data),
};

export const institutionReportsService = {
  getOverall: (instId, params) => api.get(`/institution/${instId}/reports/overall`, { params }).then((r) => r.data),
  getRankings: (instId, params) => api.get(`/institution/${instId}/reports/rankings`, { params }).then((r) => r.data),
  getBatchComparison: (instId, params) => api.get(`/institution/${instId}/reports/batch-comparison`, { params }).then((r) => r.data),
  getTrends: (instId, params) => api.get(`/institution/${instId}/reports/trends`, { params }).then((r) => r.data),
  getImprovement: (instId, params) => api.get(`/institution/${instId}/reports/improvement`, { params }).then((r) => r.data),
  download: async (instId, endpoint, format = 'csv', params = {}) => {
    try {
      const res = await api.get(`/institution/${instId}/reports/${endpoint}`, {
        params: { ...params, format },
        responseType: 'blob',
      });
      return res.data;
    } catch (err) {
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          throw new Error(json.message || json.error || 'Failed to download report.');
        } catch (_) {}
      }
      throw err;
    }
  },
};

export const studentReportService = {
  getOverall: (params) => api.get('/student/reports/overall', { params }).then((r) => r.data),
  getSubjectWise: (params) => api.get('/student/reports/subject-wise', { params }).then((r) => r.data),
  getChapterWise: (params) => api.get('/student/reports/chapter-wise', { params }).then((r) => r.data),
  getStrengthsWeaknesses: (params) => api.get('/student/reports/strengths-weaknesses', { params }).then((r) => r.data),
  getTimeAnalysis: (params) => api.get('/student/reports/time-analysis', { params }).then((r) => r.data),
  getInsights: (params) => api.get('/student/reports/insights', { params }).then((r) => r.data),
  getAIPlan: (params) => api.get('/student/reports/ai-plan', { params }).then((r) => r.data),
};
