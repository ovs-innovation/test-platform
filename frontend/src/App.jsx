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
import StaticPage from './pages/public/StaticPage.jsx';

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

const Shell = ({ children }) => <Layout>{children}</Layout>;

function AppHome() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  return <Home />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<AppHome />} />
        <Route path="/test-series" element={<TestSeriesCatalog />} />
        <Route path="/test-series/:slug" element={<TestSeriesDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/free-mock" element={<FreeMock />} />
        <Route path="/pricing" element={<StaticPage title="Pricing"><p>Flexible plans for every aspirant. Free diagnostic mock available. Premium series from ₹499.</p></StaticPage>} />
        <Route path="/about" element={<StaticPage title="About AssessPro CBT"><p>India&apos;s NTA-style computer-based testing platform for JEE, NEET UG, NEET PG and medical entrance preparation.</p></StaticPage>} />
        <Route path="/contact" element={<StaticPage title="Contact"><p>Email: support@assesspro.io</p></StaticPage>} />
        <Route path="/privacy" element={<StaticPage title="Privacy Policy"><p>Your data is encrypted and never shared with third parties.</p></StaticPage>} />
        <Route path="/terms" element={<StaticPage title="Terms of Service"><p>By using AssessPro CBT you agree to our fair examination policies.</p></StaticPage>} />
        <Route path="/refund" element={<StaticPage title="Refund Policy"><p>Refunds within 7 days if no test has been attempted.</p></StaticPage>} />
      </Route>

      <Route path="/admin-login" element={<Login />} />
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
  );
}
