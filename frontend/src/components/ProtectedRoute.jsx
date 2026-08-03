import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LoadingScreen } from './ui.jsx';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingScreen label="Checking your session…" />;

  if (!user) {
    const path = location.pathname;
    const reqRole = String(role || '').toLowerCase();
    const isAdminRoute = reqRole === 'admin' || path.startsWith('/admin');
    const isInstRoute =
      reqRole.includes('institution') ||
      reqRole.includes('school') ||
      path.startsWith('/institution') ||
      path.startsWith('/school');

    const redirectTarget = isAdminRoute
      ? '/admin-login'
      : isInstRoute
      ? '/institution-login'
      : '/student-login';

    return <Navigate to={redirectTarget} state={{ from: location }} replace />;
  }

  if (role) {
    const requested = String(role).toLowerCase();
    const userRole = String(user.role || 'candidate').toLowerCase();
    const isCandidateMatch =
      (requested === 'candidate' || requested === 'student') &&
      (userRole === 'candidate' || userRole === 'student');
    const isExactMatch = userRole === requested;

    if (!isCandidateMatch && !isExactMatch) {
      return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
    }
  }

  return children;
}
