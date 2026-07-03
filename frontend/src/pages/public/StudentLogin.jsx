import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function StudentLogin() {
  const { studentLogin } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await studentLogin(form);
      toast.success('Welcome back!');
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Student login" subtitle="Access your tests, results and analytics.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" required value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          <Link to="/forgot-password" className="mt-1 inline-block text-xs text-brand-600 hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Signing in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        New here? <Link to="/signup" className="font-semibold text-brand-600">Create account</Link>
        {' · '}
        <Link to="/admin-login" className="text-slate-500 hover:text-brand-600">Admin</Link>
      </p>
    </AuthShell>
  );
}
