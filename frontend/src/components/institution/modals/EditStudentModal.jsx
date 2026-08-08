import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Edit3, X, Save, AlertCircle } from 'lucide-react';
import { Spinner } from '../../ui.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

export default function EditStudentModal({
  isOpen,
  student,
  onClose,
  onSubmit,
  batches = [],
  isDarkMode = true,
}) {
  const toast = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    class: 'Class 12',
    target_exam: 'NEET',
    batch_id: '',
    roll_number: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name || '',
        email: student.email || '',
        mobile: student.mobile || student.phone || '',
        class: student.class_level || student.class || 'Class 12',
        target_exam: student.target_exam || student.target || 'NEET',
        batch_id: student.batch_id ? String(student.batch_id) : '',
        roll_number: student.roll_number || student.rollNo || '',
      });
      setError('');
    }
  }, [student]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !student) return null;

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

    setSubmitting(true);

    try {
      await onSubmit(student.id, {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),
        class: form.class,
        target_exam: form.target_exam,
        batch_id: form.batch_id ? Number(form.batch_id) : null,
        roll_number: form.roll_number.trim(),
      });
      toast.success(`Student profile for "${form.name.trim()}" updated successfully.`);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update student profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden ${
          isDarkMode
            ? 'bg-[#0B1730] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b px-6 py-4 border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Edit3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-white">Edit Student Details</h3>
              <p className="text-xs text-slate-400">Update academic profile and credentials</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Arjun Nair"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Roll / Reg Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Roll / Enrollment ID</label>
              <input
                type="text"
                name="roll_number"
                value={form.roll_number}
                onChange={handleChange}
                placeholder="e.g. VEDANTU-2026-01"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Contact Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="student@example.com"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Target Exam */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Target Exam *</label>
              <select
                name="target_exam"
                value={form.target_exam}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="NEET">NEET UG</option>
                <option value="JEE">JEE Main & Advanced</option>
                <option value="Foundation">Foundation (Class 9/10)</option>
                <option value="CUET">CUET</option>
                <option value="Other">Other Assessment</option>
              </select>
            </div>

            {/* Academic Class */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Class / Grade *</label>
              <select
                name="class"
                value={form.class}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="Class 12">Class 12 (Passing Year 2026)</option>
                <option value="Class 11">Class 11 (Passing Year 2027)</option>
                <option value="Dropper / Repeater">Dropper / Repeater</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 9">Class 9</option>
              </select>
            </div>
          </div>

          {/* Batch Allocation */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-slate-300">Batch Allocation</label>
            <select
              name="batch_id"
              value={form.batch_id}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">General Batch (Unassigned)</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.batch_name || b.name} ({b.target_exam || 'General'} - {b.class_level || 'Class 12'})
                </option>
              ))}
            </select>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-lg hover:scale-105 transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Spinner className="h-4 w-4 text-white" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Student Details</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
