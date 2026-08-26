import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import Layout from './components/Layout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { LoadingScreen } from './components/ui.jsx';

import Home from './pages/public/Home.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import InstitutionProtectedRoute from './components/institution/InstitutionProtectedRoute.jsx';

// Lazy-loaded routes for code splitting & bundle size optimization
const Login = lazy(() => import('./pages/Login.jsx'));
const InvitePage = lazy(() => import('./pages/InvitePage.jsx'));
const TestSeriesCatalog = lazy(() => import('./pages/public/TestSeriesCatalog.jsx'));
const TestSeriesDetail = lazy(() => import('./pages/public/TestSeriesDetail.jsx'));
const Signup = lazy(() => import('./pages/public/Signup.jsx'));
const StudentLogin = lazy(() => import('./pages/public/StudentLogin.jsx'));
const ForgotPassword = lazy(() => import('./pages/public/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./pages/public/ResetPassword.jsx'));
const Blog = lazy(() => import('./pages/public/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/public/BlogPost.jsx'));
const FAQs = lazy(() => import('./pages/public/FAQs.jsx'));
const FreeMock = lazy(() => import('./pages/public/FreeMock.jsx'));
const About = lazy(() => import('./pages/public/About.jsx'));
const Contact = lazy(() => import('./pages/public/Contact.jsx'));
const Careers = lazy(() => import('./pages/public/Careers.jsx'));
const SchoolsB2B = lazy(() => import('./pages/public/SchoolsB2B.jsx'));
const InstitutionLogin = lazy(() => import('./pages/public/InstitutionLogin.jsx'));
const EdvedumLegalPage = lazy(() => import('./components/edvedum/EdvedumLegalPage.jsx'));

// Candidate Portal pages
const CandidateDashboard = lazy(() => import('./pages/candidate/Dashboard.jsx'));
const MyTests = lazy(() => import('./pages/candidate/MyTests.jsx'));
const MyEbooks = lazy(() => import('./pages/candidate/MyEbooks.jsx'));
const MySeriesTests = lazy(() => import('./pages/candidate/MySeriesTests.jsx'));
const AietsCalendarPage = lazy(() => import('./pages/candidate/AietsCalendarPage.jsx'));
const Analytics = lazy(() => import('./pages/candidate/Analytics.jsx'));
const PostTestAnalytics = lazy(() => import('./pages/candidate/PostTestAnalytics.jsx'));
const Notifications = lazy(() => import('./pages/candidate/Notifications.jsx'));
const PaymentHistory = lazy(() => import('./pages/candidate/PaymentHistory.jsx'));
const Profile = lazy(() => import('./pages/candidate/Profile.jsx'));
const Settings = lazy(() => import('./pages/candidate/Settings.jsx'));
const Leaderboard = lazy(() => import('./pages/candidate/Leaderboard.jsx'));
const Certificate = lazy(() => import('./pages/candidate/Certificate.jsx'));
const Forum = lazy(() => import('./pages/candidate/Forum.jsx'));
const AssessmentList = lazy(() => import('./pages/candidate/AssessmentList.jsx'));
const AssessmentInstructions = lazy(() => import('./pages/candidate/AssessmentInstructions.jsx'));
const ExamScreen = lazy(() => import('./pages/candidate/ExamScreen.jsx'));
const ResultPage = lazy(() => import('./pages/candidate/ResultPage.jsx'));

// Admin Command Center pages
const AdminOverview = lazy(() => import('./pages/admin/Overview.jsx'));
const AdminAssessments = lazy(() => import('./pages/admin/Assessments.jsx'));
const AdminAssessmentEditor = lazy(() => import('./pages/admin/AssessmentEditor.jsx'));
const AdminTestSeries = lazy(() => import('./pages/admin/TestSeries.jsx'));
const AdminPayments = lazy(() => import('./pages/admin/Payments.jsx'));
const AdminQuestionBank = lazy(() => import('./pages/admin/QuestionBank.jsx'));
const AdminSubjects = lazy(() => import('./pages/admin/Subjects.jsx'));
const AdminCoupons = lazy(() => import('./pages/admin/Coupons.jsx'));
const AdminCMS = lazy(() => import('./pages/admin/CMS.jsx'));
const AdminFaculty = lazy(() => import('./pages/admin/Faculty.jsx'));
const AdminSettings = lazy(() => import('./pages/admin/Settings.jsx'));
const AdminCandidates = lazy(() => import('./pages/admin/Candidates.jsx'));
const AdminReports = lazy(() => import('./pages/admin/Reports.jsx'));
const AdminAttemptDetail = lazy(() => import('./pages/admin/AttemptDetail.jsx'));
const AdminSchools = lazy(() => import('./pages/admin/Schools.jsx'));
const AdminSchoolDetail = lazy(() => import('./pages/admin/SchoolDetail.jsx'));

import InstitutionDashboard, {
  InstOverviewTabWrapper,
  InstStudentsTabWrapper,
  InstBatchesTabWrapper,
  InstTestSeriesTabWrapper,
  InstTestAssignmentsTabWrapper,
  InstEbooksTabWrapper,
  InstAnalyticsTabWrapper,
  InstRankingsTabWrapper,
  InstReportsTabWrapper,
  InstAttendanceTabWrapper,
  InstPaymentsTabWrapper,
  InstNotificationsTabWrapper,
  InstProfileTabWrapper,
  InstSettingsTabWrapper,
  InstBatchDetailTabWrapper,
} from './pages/institution/InstitutionDashboard.jsx';

import { COMPANY, CONTACT } from './data/edvedumContent.js';

const Shell = ({ children }) => <Layout>{children}</Layout>;

function AppHome() {
  return <Home />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen label="Loading..." />}>
        <Routes>
        {/* PUBLIC WEBSITE ROUTES - Rendered inside PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<AppHome />} />
          <Route path="/test-series" element={<TestSeriesCatalog />} />
          <Route path="/test-series/:slug" element={<TestSeriesDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/*" element={<BlogPost />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/free-mock" element={<FreeMock />} />
          <Route path="/pricing" element={<EdvedumLegalPage title="Pricing"><p>Flexible plans for every aspirant. Free diagnostic mock available. Premium test series for JEE & NEET preparation.</p><p className="mt-4">Contact <a href={`mailto:${CONTACT.businessEmail}`} className="text-[#2563eb]">{CONTACT.businessEmail}</a> for institute & bulk pricing.</p></EdvedumLegalPage>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/for-schools" element={<SchoolsB2B />} />
          <Route path="/for-institutions" element={<SchoolsB2B />} />
          <Route path="/schools" element={<SchoolsB2B />} />
          <Route path="/institution-login" element={<InstitutionLogin />} />

          <Route path="/privacy" element={<EdvedumLegalPage title="Privacy Policy"><p>{COMPANY.name} is committed to protecting your personal data. Information collected during registration, test attempts, and payments is encrypted and used solely to deliver our educational services.</p><p className="mt-4">We do not sell or share student data with third parties without consent, except as required by law.</p></EdvedumLegalPage>} />
          <Route path="/terms" element={<EdvedumLegalPage title="Terms & Conditions"><p>By using {COMPANY.name} platform you agree to fair examination policies, honest attempt guidelines, and acceptable use of our CBT test interface.</p><p className="mt-4">Misuse of the platform, sharing of credentials, or attempt to circumvent proctoring may result in account suspension.</p></EdvedumLegalPage>} />
          <Route path="/refund" element={<EdvedumLegalPage title="Refund Policy"><p>Refunds are available within 7 days of purchase if no test has been attempted. Partial refunds may apply for unused portions of multi-test series at management discretion.</p></EdvedumLegalPage>} />
          <Route path="/cancellation" element={<EdvedumLegalPage title="Cancellation Policy"><p>You may cancel an enrollment before attempting any test for a full refund within the refund window. After a test attempt, cancellation is not applicable.</p></EdvedumLegalPage>} />
          <Route path="/disclaimer" element={<EdvedumLegalPage title="Disclaimer"><p>Test scores and rank predictions are indicative tools for practice. {COMPANY.name} does not guarantee selection in any competitive examination. Results depend on individual effort and preparation.</p></EdvedumLegalPage>} />
          <Route path="/cookies" element={<EdvedumLegalPage title="Cookie Policy"><p>We use essential cookies for authentication and session management. Analytics cookies help us improve the platform experience. You can manage cookie preferences in your browser settings.</p></EdvedumLegalPage>} />
          <Route path="/copyright" element={<EdvedumLegalPage title="Copyright Notice"><p>All content, test materials, branding, and platform software on {COMPANY.website} are owned by {COMPANY.legalName} unless otherwise stated. Unauthorized reproduction or distribution is prohibited.</p></EdvedumLegalPage>} />
          <Route path="/data-protection" element={<EdvedumLegalPage title="Data Protection Policy"><p>{COMPANY.name} processes student data in accordance with applicable data protection laws. We collect only information required for registration, examination delivery, analytics, and support.</p></EdvedumLegalPage>} />
          <Route path="/acceptable-use" element={<EdvedumLegalPage title="Acceptable Use Policy"><p>Users must not share login credentials, attempt to cheat in proctored exams, scrape platform content, or misuse the CBT interface. Violations may lead to account suspension.</p></EdvedumLegalPage>} />
          <Route path="/digital-delivery" element={<EdvedumLegalPage title="Digital Delivery Policy"><p>Test series, mock exams, reports, and digital study resources are delivered electronically upon enrollment. Access remains available for the validity period stated at purchase.</p></EdvedumLegalPage>} />
        </Route>

        {/* PROTECTED INSTITUTION PORTAL ROUTES - Rendered inside InstitutionPortalLayout (No Public Header/Footer) */}
        <Route
          path="/institution"
          element={
            <InstitutionProtectedRoute>
              <InstitutionDashboard />
            </InstitutionProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/institution/dashboard" replace />} />
          <Route path="dashboard" element={<InstOverviewTabWrapper />} />
          <Route path="students" element={<InstStudentsTabWrapper />} />
          <Route path="batches" element={<InstBatchesTabWrapper />} />
          <Route path="batches/:batchId" element={<InstBatchDetailTabWrapper />} />
          <Route path="test-series" element={<InstTestSeriesTabWrapper />} />
          <Route path="test-assignments" element={<Navigate to="/institution/test-series" replace />} />
          <Route path="ebooks" element={<InstEbooksTabWrapper />} />
          <Route path="analytics" element={<InstAnalyticsTabWrapper />} />
          <Route path="rankings" element={<InstRankingsTabWrapper />} />
          <Route path="reports" element={<InstReportsTabWrapper />} />
          <Route path="attendance" element={<InstAttendanceTabWrapper />} />
          <Route path="payments" element={<InstPaymentsTabWrapper />} />
          <Route path="notifications" element={<InstNotificationsTabWrapper />} />
          <Route path="profile" element={<InstProfileTabWrapper />} />
          <Route path="settings" element={<InstSettingsTabWrapper />} />
          <Route path=":id/dashboard" element={<Navigate to="/institution/dashboard" replace />} />
        </Route>

        {/* ADMIN & AUTHENTICATION FALLBACK ROUTES */}
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin/login" element={<Navigate to="/admin-login" replace />} />
        <Route path="/center-login" element={<Navigate to="/institution-login" replace />} />
        <Route path="/login" element={<Navigate to="/student-login" replace />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/invite/:token" element={<InvitePage />} />

        {/* CANDIDATE PROTECTED ROUTES */}
        <Route path="/exam/:attemptId" element={<ProtectedRoute role="candidate"><ExamScreen /></ProtectedRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute role="candidate"><Shell><CandidateDashboard /></Shell></ProtectedRoute>} />
        <Route path="/aiets-calendar" element={<ProtectedRoute role="candidate"><Shell><AietsCalendarPage /></Shell></ProtectedRoute>} />
        <Route path="/my-tests" element={<ProtectedRoute role="candidate"><Shell><MyTests /></Shell></ProtectedRoute>} />
        <Route path="/my-ebooks" element={<ProtectedRoute role="candidate"><Shell><MyEbooks /></Shell></ProtectedRoute>} />
        <Route path="/my-tests/:slug" element={<ProtectedRoute role="candidate"><Shell><MySeriesTests /></Shell></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute role="candidate"><Shell><Analytics /></Shell></ProtectedRoute>} />
        <Route path="/analytics/test/:testId" element={<ProtectedRoute role="candidate"><Shell><PostTestAnalytics /></Shell></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute role="candidate"><Shell><Analytics /></Shell></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute role="candidate"><Shell><Leaderboard /></Shell></ProtectedRoute>} />
        <Route path="/discussion-hub" element={<ProtectedRoute role="candidate"><Shell><Forum /></Shell></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute role="candidate"><Shell><Notifications /></Shell></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute role="candidate"><Shell><PaymentHistory /></Shell></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute role="candidate"><Shell><Profile /></Shell></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute role="candidate"><Shell><Settings /></Shell></ProtectedRoute>} />
        <Route path="/certificates/:attemptId" element={<ProtectedRoute role="candidate"><Shell><Certificate /></Shell></ProtectedRoute>} />
        <Route path="/assessments" element={<ProtectedRoute role="candidate"><Shell><AssessmentList /></Shell></ProtectedRoute>} />
        <Route path="/assessments/:assessmentId/instructions" element={<ProtectedRoute role="candidate"><AssessmentInstructions /></ProtectedRoute>} />
        <Route path="/results/:attemptId" element={<ProtectedRoute role="candidate"><ResultPage /></ProtectedRoute>} />

        {/* PLATFORM ADMIN PROTECTED ROUTES */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout><AdminOverview /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/tests" element={<Navigate to="/admin/assessments" replace />} />
        <Route path="/admin/assessments" element={<ProtectedRoute role="admin"><AdminLayout><AdminAssessments /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/assessments/:assessmentId" element={<ProtectedRoute role="admin"><AdminLayout><AdminAssessmentEditor /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/test-series" element={<ProtectedRoute role="admin"><AdminLayout><AdminTestSeries /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/question-bank" element={<ProtectedRoute role="admin"><AdminLayout><AdminQuestionBank /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/subjects" element={<ProtectedRoute role="admin"><AdminLayout><AdminSubjects /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/coupons" element={<ProtectedRoute role="admin"><AdminLayout><AdminCoupons /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/cms" element={<ProtectedRoute role="admin"><AdminLayout><AdminCMS /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/faculty" element={<ProtectedRoute role="admin"><AdminLayout><AdminFaculty /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute role="admin"><AdminLayout><AdminPayments /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/candidates" element={<ProtectedRoute role="admin"><AdminLayout><AdminCandidates /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminLayout><AdminReports /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/schools" element={<ProtectedRoute role="admin"><AdminLayout><AdminSchools /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/schools/:schoolId" element={<ProtectedRoute role="admin"><AdminLayout><AdminSchoolDetail /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/attempts/:attemptId" element={<ProtectedRoute role="admin"><AdminLayout><AdminAttemptDetail /></AdminLayout></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </>
  );
}
