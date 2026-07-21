import api from './api.js';

export const authService = {
  login: (data) => api.post('/auth/login', data).then((r) => r.data),
  register: (data) => api.post('/auth/register', data).then((r) => r.data),
  studentLogin: (data) => api.post('/auth/student-login', data).then((r) => r.data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data).then((r) => r.data),
  resetPassword: (data) => api.post('/auth/reset-password', data).then((r) => r.data),
  sendOtp: (data) => api.post('/auth/otp/send', data).then((r) => r.data),
  verifyOtp: (data) => api.post('/auth/otp/verify', data).then((r) => r.data),
  sendLoginOtp: (data) => api.post('/auth/otp/send-login', data).then((r) => r.data),
  verifyLoginOtp: (data) => api.post('/auth/otp/verify-login', data).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
  candidateDashboard: () => api.get('/auth/candidate/dashboard').then((r) => r.data),
};

export const inviteService = {
  get: (token) => api.get(`/invites/${token}`).then((r) => r.data.invite),
};

export const assessmentService = {
  listAvailable: () => api.get('/assessments/available').then((r) => r.data.assessments),
  getStudent: (id) => api.get(`/assessments/available/${id}`).then((r) => r.data.assessment),
  listAll: () => api.get('/assessments').then((r) => r.data.assessments),
  getAdmin: (id) => api.get(`/assessments/${id}`).then((r) => r.data),
  preview: (id) => api.get(`/assessments/${id}/preview`).then((r) => r.data),
  create: (data) => api.post('/assessments', data).then((r) => r.data.assessment),
  update: (id, data) => api.put(`/assessments/${id}`, data).then((r) => r.data.assessment),
  togglePublish: (id, is_published) =>
    api.patch(`/assessments/${id}/publish`, { is_published }).then((r) => r.data.assessment),
  remove: (id) => api.delete(`/assessments/${id}`).then((r) => r.data),
};

export const questionBankService = {
  categories: () => api.get('/question-bank/categories').then((r) => r.data.categories),
  list: (category) => api.get('/question-bank', { params: category ? { category } : {} }).then((r) => r.data.questions),
  create: (data) => api.post('/question-bank', data).then((r) => r.data.question),
  update: (id, data) => api.put(`/question-bank/${id}`, data).then((r) => r.data.question),
  remove: (id) => api.delete(`/question-bank/${id}`).then((r) => r.data),
  import: (bankId, assessmentId, section_id) =>
    api.post(`/question-bank/${bankId}/import/${assessmentId}`, { section_id }).then((r) => r.data.question),
  bulkUpload: (csv, default_category) =>
    api.post('/question-bank/bulk', { csv, default_category }).then((r) => r.data),
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
  stats: () => api.get('/public/stats').then((r) => r.data),
  testSeries: (featured) =>
    api.get('/public/test-series', { params: featured ? { featured: 'true' } : {} }).then((r) => r.data),
  testSeriesDetail: (slug) => api.get(`/public/test-series/${slug}`).then((r) => r.data),
  subjects: () => api.get('/public/subjects').then((r) => r.data),
  cms: (slug) => api.get(`/public/cms/${slug}`).then((r) => r.data.page),
  cmsList: (type) => api.get('/public/cms', { params: type ? { type } : {} }).then((r) => r.data.pages),
  validateCoupon: (code, amount) => api.post('/public/coupons/validate', { code, amount }).then((r) => r.data),
};

export const testSeriesService = {
  list: () => api.get('/test-series').then((r) => r.data.test_series),
  create: (data) => api.post('/test-series', data).then((r) => r.data.test_series),
  update: (id, data) => api.put(`/test-series/${id}`, data).then((r) => r.data.test_series),
  link: (id, data) => api.post(`/test-series/${id}/link`, data).then((r) => r.data),
  parsePdf: (pdf_base64) => api.post('/test-series/parse-pdf', { pdf_base64 }).then((r) => r.data),
  importFromPdf: (data) => api.post('/test-series/import-pdf', data).then((r) => r.data),
  myEnrollments: () => api.get('/test-series/my/enrollments').then((r) => r.data),
  mySeriesTests: (slug) => api.get(`/test-series/my/${slug}/tests`).then((r) => r.data),
  enroll: (test_series_id) => api.post('/test-series/enroll', { test_series_id }).then((r) => r.data),
  remove: (id) => api.delete(`/test-series/${id}`).then((r) => r.data),
  unlink: (id, assessmentId) => api.delete(`/test-series/${id}/link/${assessmentId}`).then((r) => r.data),
};

export const paymentService = {
  createOrder: (test_series_id) => api.post('/payments/create-order', { test_series_id }).then((r) => r.data),
  verify: (data) => api.post('/payments/verify', data).then((r) => r.data),
  history: () => api.get('/payments/history').then((r) => r.data.payments),
  admin: () => api.get('/payments/admin').then((r) => r.data),
};

export const notificationService = {
  list: () => api.get('/notifications').then((r) => r.data.notifications),
  unreadCount: () => api.get('/notifications/unread-count').then((r) => r.data.count),
  markRead: (id) => api.post(`/notifications/${id}/read`).then((r) => r.data),
  markAllRead: () => api.post('/notifications/read-all').then((r) => r.data),
};

export const studentService = {
  analytics: () => api.get('/student/analytics').then((r) => r.data),
  profile: () => api.get('/student/profile').then((r) => r.data),
  updateProfile: (data) => api.put('/student/profile', data).then((r) => r.data),
  changePassword: (data) => api.post('/student/change-password', data).then((r) => r.data),
  leaderboard: (params) => api.get('/student/leaderboard', { params }).then((r) => r.data),
  leaderboardAssessments: () => api.get('/student/leaderboard/assessments').then((r) => r.data.assessments),
  certificate: (attemptId) => api.get(`/student/certificates/${attemptId}`).then((r) => r.data),
  forum: () => api.get('/student/forum').then((r) => r.data.topics),
  forumTopic: (id) => api.get(`/student/forum/${id}`).then((r) => r.data),
  createTopic: (data) => api.post('/student/forum', data).then((r) => r.data),
  replyTopic: (id, body) => api.post(`/student/forum/${id}/reply`, { body }).then((r) => r.data),
};

export const attemptService = {
  start: (assessment_id) => api.post('/attempts/start', { assessment_id }).then((r) => r.data),
  getState: (id) => api.get(`/attempts/${id}`).then((r) => r.data),
  saveAnswer: (id, question_id, selected_index, selected_indices) =>
    api.put(`/attempts/${id}/answer`, { question_id, selected_index, selected_indices }).then((r) => r.data),
  markReview: (id, question_id, marked_for_review) =>
    api.put(`/attempts/${id}/review`, { question_id, marked_for_review }).then((r) => r.data),
  clearAnswer: (id, question_id) =>
    api.post(`/attempts/${id}/clear`, { question_id }).then((r) => r.data),
  saveCoding: (id, question_id, source_code, language) =>
    api.put(`/attempts/${id}/coding`, { question_id, source_code, language }).then((r) => r.data),
  saveSubjective: (id, question_id, answer_text) =>
    api.put(`/attempts/${id}/subjective`, { question_id, answer_text }).then((r) => r.data),
  submit: (id, reason) => api.post(`/attempts/${id}/submit`, { reason }).then((r) => r.data),
  logViolation: (id, violation_type) =>
    api.post(`/attempts/${id}/violation`, { violation_type }).then((r) => r.data),
  getResult: (id) => api.get(`/attempts/${id}/result`).then((r) => r.data),
};

export const adminService = {
  stats: () => api.get('/admin/stats').then((r) => r.data),
  analytics: () => api.get('/admin/analytics').then((r) => r.data.analytics),
  candidates: () => api.get('/admin/candidates').then((r) => r.data.candidates),
  createCandidate: (data) => api.post('/admin/candidates', data).then((r) => r.data.candidate),
  updateCandidate: (id, data) => api.put(`/admin/candidates/${id}`, data).then((r) => r.data.candidate),
  deleteCandidate: (id) => api.delete(`/admin/candidates/${id}`).then((r) => r.data),
  reports: () => api.get('/admin/reports').then((r) => r.data.reports),
  exportReports: () =>
    import('./csv.js').then(({ downloadFromApi }) =>
      downloadFromApi('/admin/reports/export', 'attempt_reports.csv')
    ),
  attemptReport: (id) => api.get(`/admin/attempts/${id}`).then((r) => r.data),
  listInvites: (assessmentId) =>
    api.get('/admin/invites', { params: assessmentId ? { assessment_id: assessmentId } : {} }).then((r) => r.data.invites),
  createInvite: (data) => api.post('/admin/invites', data).then((r) => r.data),
  resendInvite: (id) => api.post(`/admin/invites/${id}/resend`).then((r) => r.data),
  cms: (type) => api.get('/admin/cms', { params: type ? { type } : {} }).then((r) => r.data.pages),
  saveCms: (data) => api.put('/admin/cms', data).then((r) => r.data),
  deleteCms: (id) => api.delete(`/admin/cms/${id}`).then((r) => r.data),
  settings: () => api.get('/admin/settings').then((r) => r.data.settings),
  updateSettings: (data) => api.put('/admin/settings', data).then((r) => r.data),
  coupons: () => api.get('/admin/coupons').then((r) => r.data.coupons),
  createCoupon: (data) => api.post('/admin/coupons', data).then((r) => r.data),
  toggleCoupon: (id) => api.patch(`/admin/coupons/${id}/toggle`).then((r) => r.data),
  faculty: () => api.get('/admin/faculty').then((r) => r.data.faculty),
  createFaculty: (data) => api.post('/admin/faculty', data).then((r) => r.data),
  subjects: () => api.get('/admin/subjects').then((r) => r.data.subjects),
  createSubject: (data) => api.post('/admin/subjects', data).then((r) => r.data),
  chapters: (subjectId) => api.get(`/admin/subjects/${subjectId}/chapters`).then((r) => r.data.chapters),
  createChapter: (data) => api.post('/admin/chapters', data).then((r) => r.data),
  broadcast: (data) => api.post('/admin/notifications/broadcast', data).then((r) => r.data),
};
