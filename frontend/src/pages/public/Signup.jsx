import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function Signup() {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', class: '', target_exam: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      toast.success('Account created! Enroll in a free mock to begin.');
      navigate('/free-mock', { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Create student account" subtitle="Register to enroll in test series and track your results.">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <div>
          <label className="label">Full name</label>
          <input className="input" required placeholder="e.g. John Doe" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Mobile number</label>
            <input className="input" type="tel" required placeholder="e.g. 9876543210" minLength={10} maxLength={15} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" required placeholder="name@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Class</label>
            <select className="input" required value={form.class} onChange={(e) => setForm((f) => ({ ...f, class: e.target.value }))}>
              <option value="">Select class</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
              <option value="Dropper (12th Pass)">Dropper (12th Pass)</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
            </select>
          </div>
          <div>
            <label className="label">Target Exam</label>
            <select className="input" required value={form.target_exam} onChange={(e) => setForm((f) => ({ ...f, target_exam: e.target.value }))}>
              <option value="">Select exam</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" minLength={6} required placeholder="At least 6 characters" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up free'}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account? <Link to="/student-login" className="font-semibold text-brand-600">Login</Link>
      </p>
    </AuthShell>
  );
}
