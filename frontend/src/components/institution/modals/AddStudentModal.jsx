import { useState } from 'react';
import { UserPlus, X, Key, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { Spinner } from '../../ui.jsx';

export default function AddStudentModal({
  isOpen,
  onClose,
  onSubmit,
  batches = [],
  availableLicenses = 50,
  isDarkMode = true,
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    class: 'Class 12',
    target_exam: 'NEET',
    batch_id: '',
    roll_number: '',
    password: '',
    gender: 'Male',
    dob: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createdCredential, setCreatedCredential] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Please enter student full name.');
      return;
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (availableLicenses <= 0) {
      setError('Licence Limit Reached: All allocated student seats are in use. Please request additional licences.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await onSubmit(form);
      if (res?.generatedPassword) {
        setCreatedCredential({
          name: form.name.trim(),
          email: form.email.trim(),
          rollNumber: res.enrollmentId || form.roll_number || 'Auto-generated',
          password: res.generatedPassword,
        });
      } else {
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Failed to enroll student. Please check input details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyCredentials = () => {
    if (!createdCredential) return;
    const text = `EDVEDUM Student Credentials:\nName: ${createdCredential.name}\nRoll No: ${createdCredential.rollNumber}\nEmail: ${createdCredential.email}\nPassword: ${createdCredential.password}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 relative my-8 ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Enroll New Student</h3>
              <p className="text-xs text-slate-400">Available Licences: <span className="font-bold text-cyan-400">{availableLicenses} Seats</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Credential Generated Success Card */}
        {createdCredential ? (
          <div className="space-y-5 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-1">
              <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto" />
              <h4 className="font-extrabold text-sm text-white">Student Account Created Successfully!</h4>
              <p className="text-xs text-slate-300">Issue these initial sign-in credentials to the student.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Enrollment ID / Roll No:</span>
                <span className="font-bold text-cyan-400">{createdCredential.rollNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Student Email:</span>
                <span className="font-bold text-white">{createdCredential.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Temporary Password:</span>
                <span className="font-bold text-amber-400">{createdCredential.password}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyCredentials}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white hover:bg-blue-500 transition cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Credentials Copied!' : 'Copy Credentials'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Enrollment Form */
          <form onSubmit={handleFormSubmit} className="space-y-4">

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-200 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3.5 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Student Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="aarav@student.edu.in"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3.5 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3.5 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Roll No / Enrollment ID
                </label>
                <input
                  type="text"
                  name="roll_number"
                  placeholder="Leave empty for auto-generation"
                  value={form.roll_number}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3.5 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Batch
                </label>
                <select
                  name="batch_id"
                  value={form.batch_id}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-slate-200 focus:border-cyan-500 focus:outline-none cursor-pointer"
                >
                  <option value="">General Batch</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.batch_name || b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Target Exam
                </label>
                <select
                  name="target_exam"
                  value={form.target_exam}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-slate-200 focus:border-cyan-500 focus:outline-none cursor-pointer"
                >
                  <option value="NEET">NEET UG</option>
                  <option value="JEE Main & Advanced">JEE Main & Advanced</option>
                  <option value="Foundation">Class 9-10 Foundation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Class Level
                </label>
                <select
                  name="class"
                  value={form.class}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-slate-200 focus:border-cyan-500 focus:outline-none cursor-pointer"
                >
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="Class 12 Pass">Class 12 Pass / Dropper</option>
                  <option value="Class 9-10">Class 9-10</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Temporary Password (Optional)
              </label>
              <input
                type="text"
                name="password"
                placeholder="Leave blank for secure auto-generation"
                value={form.password}
                onChange={handleChange}
                className="w-full py-2.5 px-3.5 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="h-4 w-4 text-white" />
                    <span>Enrolling...</span>
                  </span>
                ) : (
                  'Enroll Student & Issue Credentials'
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
