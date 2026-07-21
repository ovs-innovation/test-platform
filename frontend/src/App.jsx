import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import Layout from './components/Layout.jsx';
import { useAuth } from './context/AuthContext.jsx';

import Login from './pages/Login.jsx';
import InvitePage from './pages/InvitePage.jsx';
import Home from './pages/public/Home.jsx';
import TestSeriesCatalog from './pages/public/TestSeriesCatalog.jsx';
import TestSeriesDetail from './pages/public/TestSeriesDetail.jsx';
import Signup from './pages/public/Signup.jsx';
import StudentLogin from './pages/public/StudentLogin.jsx';
import ForgotPassword from './pages/public/ForgotPassword.jsx';
import ResetPassword from './pages/public/ResetPassword.jsx';
import Blog from './pages/public/Blog.jsx';
import BlogPost from './pages/public/BlogPost.jsx';
import FAQs from './pages/public/FAQs.jsx';
import FreeMock from './pages/public/FreeMock.jsx';
import About from './pages/public/About.jsx';
import Contact from './pages/public/Contact.jsx';
import Careers from './pages/public/Careers.jsx';
import EdvedumLegalPage from './components/edvedum/EdvedumLegalPage.jsx';
import { COMPANY, CONTACT } from './data/edvedumContent.js';

import CandidateDashboard from './pages/candidate/Dashboard.jsx';
import MyTests from './pages/candidate/MyTests.jsx';
import MySeriesTests from './pages/candidate/MySeriesTests.jsx';
import Analytics from './pages/candidate/Analytics.jsx';
import Notifications from './pages/candidate/Notifications.jsx';
import PaymentHistory from './pages/candidate/PaymentHistory.jsx';
import Profile from './pages/candidate/Profile.jsx';
import Settings from './pages/candidate/Settings.jsx';
import Leaderboard from './pages/candidate/Leaderboard.jsx';
import Certificate from './pages/candidate/Certificate.jsx';
import Forum from './pages/candidate/Forum.jsx';
import AssessmentList from './pages/candidate/AssessmentList.jsx';
import AssessmentInstructions from './pages/candidate/AssessmentInstructions.jsx';
import ExamScreen from './pages/candidate/ExamScreen.jsx';
import ResultPage from './pages/candidate/ResultPage.jsx';

import AdminOverview from './pages/admin/Overview.jsx';
import AdminAssessments from './pages/admin/Assessments.jsx';
import AdminAssessmentEditor from './pages/admin/AssessmentEditor.jsx';
import AdminTestSeries from './pages/admin/TestSeries.jsx';
import AdminPayments from './pages/admin/Payments.jsx';
import AdminQuestionBank from './pages/admin/QuestionBank.jsx';
import AdminSubjects from './pages/admin/Subjects.jsx';
import AdminCoupons from './pages/admin/Coupons.jsx';
import AdminCMS from './pages/admin/CMS.jsx';
import AdminFaculty from './pages/admin/Faculty.jsx';
import AdminSettings from './pages/admin/Settings.jsx';
import AdminCandidates from './pages/admin/Candidates.jsx';
import AdminReports from './pages/admin/Reports.jsx';
import AdminAttemptDetail from './pages/admin/AttemptDetail.jsx';

import ScrollToTop from './components/ScrollToTop.jsx';

const Shell = ({ children }) => <Layout>{children}</Layout>;

function AppHome() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  return <Home />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<AppHome />} />
        <Route path="/test-series" element={<TestSeriesCatalog />} />
        <Route path="/test-series/:slug" element={<TestSeriesDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/free-mock" element={<FreeMock />} />
        <Route path="/pricing" element={<EdvedumLegalPage title="Pricing"><p>Flexible plans for every aspirant. Free diagnostic mock available. Premium test series for JEE & NEET preparation.</p><p className="mt-4">Contact <a href={`mailto:${CONTACT.businessEmail}`} className="text-[#2563eb]">{CONTACT.businessEmail}</a> for institute & bulk pricing.</p></EdvedumLegalPage>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
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

      <Route path="/admin-login" element={<Login />} />
      <Route path="/admin/login" element={<Navigate to="/admin-login" replace />} />
      <Route path="/center-login" element={<Navigate to="/admin-login" replace />} />
      <Route path="/login" element={<Navigate to="/student-login" replace />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/invite/:token" element={<InvitePage />} />

      <Route path="/exam/:attemptId" element={<ProtectedRoute role="candidate"><ExamScreen /></ProtectedRoute>} />

      <Route path="/dashboard" element={<ProtectedRoute role="candidate"><Shell><CandidateDashboard /></Shell></ProtectedRoute>} />
      <Route path="/my-tests" element={<ProtectedRoute role="candidate"><Shell><MyTests /></Shell></ProtectedRoute>} />
      <Route path="/my-tests/:slug" element={<ProtectedRoute role="candidate"><Shell><MySeriesTests /></Shell></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute role="candidate"><Shell><Analytics /></Shell></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute role="candidate"><Shell><Analytics /></Shell></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute role="candidate"><Shell><Leaderboard /></Shell></ProtectedRoute>} />
      <Route path="/forum" element={<ProtectedRoute role="candidate"><Shell><Forum /></Shell></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute role="candidate"><Shell><Notifications /></Shell></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute role="candidate"><Shell><PaymentHistory /></Shell></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute role="candidate"><Shell><Profile /></Shell></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute role="candidate"><Shell><Settings /></Shell></ProtectedRoute>} />
      <Route path="/certificates/:attemptId" element={<ProtectedRoute role="candidate"><Shell><Certificate /></Shell></ProtectedRoute>} />
      <Route path="/assessments" element={<ProtectedRoute role="candidate"><Shell><AssessmentList /></Shell></ProtectedRoute>} />
      <Route path="/assessments/:assessmentId/instructions" element={<ProtectedRoute role="candidate"><AssessmentInstructions /></ProtectedRoute>} />
      <Route path="/results/:attemptId" element={<ProtectedRoute role="candidate"><ResultPage /></ProtectedRoute>} />

      <Route path="/admin" element={<ProtectedRoute role="admin"><Shell><AdminOverview /></Shell></ProtectedRoute>} />
      <Route path="/admin/assessments" element={<ProtectedRoute role="admin"><Shell><AdminAssessments /></Shell></ProtectedRoute>} />
      <Route path="/admin/assessments/:assessmentId" element={<ProtectedRoute role="admin"><Shell><AdminAssessmentEditor /></Shell></ProtectedRoute>} />
      <Route path="/admin/test-series" element={<ProtectedRoute role="admin"><Shell><AdminTestSeries /></Shell></ProtectedRoute>} />
      <Route path="/admin/question-bank" element={<ProtectedRoute role="admin"><Shell><AdminQuestionBank /></Shell></ProtectedRoute>} />
      <Route path="/admin/subjects" element={<ProtectedRoute role="admin"><Shell><AdminSubjects /></Shell></ProtectedRoute>} />
      <Route path="/admin/coupons" element={<ProtectedRoute role="admin"><Shell><AdminCoupons /></Shell></ProtectedRoute>} />
      <Route path="/admin/cms" element={<ProtectedRoute role="admin"><Shell><AdminCMS /></Shell></ProtectedRoute>} />
      <Route path="/admin/faculty" element={<ProtectedRoute role="admin"><Shell><AdminFaculty /></Shell></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute role="admin"><Shell><AdminSettings /></Shell></ProtectedRoute>} />
      <Route path="/admin/payments" element={<ProtectedRoute role="admin"><Shell><AdminPayments /></Shell></ProtectedRoute>} />
      <Route path="/admin/candidates" element={<ProtectedRoute role="admin"><Shell><AdminCandidates /></Shell></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute role="admin"><Shell><AdminReports /></Shell></ProtectedRoute>} />
      <Route path="/admin/attempts/:attemptId" element={<ProtectedRoute role="admin"><Shell><AdminAttemptDetail /></Shell></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);
}
