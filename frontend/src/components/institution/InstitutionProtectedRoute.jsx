import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export function isInstitutionRole(role) {
  if (!role) return false;
  const r = String(role).trim().toLowerCase();
  return [
    'institution_admin',
    'center_admin',
    'school_admin',
    'partner_admin',
    'institution',
    'school',
    'admin',
  ].includes(r);
}

export default function InstitutionProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  let activeInstitution = null;
  try {
    const raw = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
    if (raw) activeInstitution = JSON.parse(raw);
  } catch (_) {}

  // 1. Hydration State: Show loading spinner while AuthContext is verifying session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#071126] text-white flex flex-col items-center justify-center space-y-4">
        <div className="h-10 w-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold tracking-wider text-cyan-300 uppercase">
          Verifying Institution Session...
        </p>
      </div>
    );
  }

  // 2. Validate role if user object exists in AuthContext
  const isAuthorizedRole = isInstitutionRole(user?.role);

  // 3. Block candidates/students attempting to open institution portal
  if (user && !isAuthorizedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // 4. Unauthenticated access: Redirect to Center Login (/institution-login)
  if (!user && !activeInstitution) {
    return <Navigate to="/institution-login" state={{ from: location }} replace />;
  }

  return children;
}
