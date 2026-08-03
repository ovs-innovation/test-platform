import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function InstitutionProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1. Check local session storage for active institution login
  let hasLocalInstSession = false;
  try {
    const token = localStorage.getItem('token');
    const instData = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
    if (token && instData) {
      hasLocalInstSession = true;
    } else if (instData) {
      hasLocalInstSession = true;
    }
  } catch (_) {}

  // 2. Role validation if user object exists in AuthContext
  const isInstRole =
    user?.role === 'institution_admin' ||
    user?.role === 'institution' ||
    user?.role === 'school' ||
    user?.role === 'admin'; // Platform admin permitted for inspection

  if (loading && !hasLocalInstSession) {
    return null; // Wait for initial auth restoration
  }

  if (!hasLocalInstSession && user && !isInstRole) {
    // If authenticated as a regular candidate/student, block access to institution portal
    return <Navigate to="/dashboard" replace />;
  }

  if (!hasLocalInstSession && !user) {
    // Unauthenticated user attempting to access protected institution route
    return <Navigate to="/institution-login" state={{ from: location }} replace />;
  }

  return children;
}
