import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { admissionService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';
import Modal from '../Modal.jsx';

const INITIAL_FORM = {
  name: '',
  mobile: '',
  email: '',
  studentClass: '',
  exam: '',
};

const CLASS_OPTIONS = ['Class 9', 'Class 10', 'Class 11', 'Class 12', '12th Pass / Dropper'];
const EXAM_OPTIONS = ['NEET', 'JEE Main', 'JEE Advanced', 'Foundation', 'Other'];
const FirstVisitStudentFormContext = createContext(null);

function storageKeyFor(user) {
  const identity = user?.id || user?.email || 'guest';
  return `edvedum_first_visit_student_form_${identity}`;
}

export function useFirstVisitStudentForm() {
  const context = useContext(FirstVisitStudentFormContext);
  if (!context) throw new Error('useFirstVisitStudentForm must be used within FirstVisitStudentForm');
  return context;
}

export default function FirstVisitStudentForm({ loading, user, children }) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const key = storageKeyFor(user);
  const isGuest = !user;

  useEffect(() => {
    if (loading || !isGuest) {
      setOpen(false);
      return;
    }

    setForm({
      ...INITIAL_FORM,
      name: user?.name || '',
      email: user?.email || '',
    });

    try {
      setOpen(localStorage.getItem(key) !== 'dismissed' && localStorage.getItem(key) !== 'submitted');
    } catch (error) {
      console.error('Unable to check first-visit student form status:', error);
      setOpen(true);
    }
  }, [isGuest, key, loading, user?.email, user?.name]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(key, 'dismissed');
    } catch (error) {
      console.error('Unable to save first-visit student form status:', error);
    }
  };

  const requestDetails = () => {
    if (!isGuest) return true;
    if (loading) {
      setOpen(true);
      return false;
    }
    try {
      if (localStorage.getItem(key) === 'submitted') return true;
      setOpen(true);
      return false;
    } catch (error) {
      console.error('Unable to check first-visit student form status:', error);
      setOpen(true);
      return false;
    }
  };

  const contextValue = useMemo(() => ({ requestDetails }), [loading, isGuest, key]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const studentName = form.name.trim();
    const mobile = form.mobile.trim();
    const email = form.email.trim();
    const formData = {
      fullName: studentName,
      studentMobile: mobile,
      email,
      currentClass: form.studentClass,
      targetExam: form.exam,
      source: 'first_visit_popup',
    };

    try {
      await admissionService.submitAdmission({
        studentName,
        fatherName: '',
        contactNumber: mobile,
        email,
        courseName: form.exam,
        formData,
        documents: [],
      });
      try {
        localStorage.setItem(key, 'submitted');
      } catch (error) {
        console.error('Unable to save first-visit student form status:', error);
      }
      setOpen(false);
      toast.success('Thanks! Your student details have been submitted.');
    } catch (error) {
      toast.error(error?.message || 'Unable to submit your details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <FirstVisitStudentFormContext.Provider value={contextValue}>
      {children}
      <Modal
        open={open}
        onClose={close}
        title="Tell us about your study goals"
        size="md"
        centered
        closeOnBackdrop
      >
        <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Share your details so we can show you the most relevant classes and exam preparation.
        </p>

        <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="first-visit-name" className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">
            Student name
          </label>
          <input
            id="first-visit-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={updateField('name')}
            required
            maxLength={120}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="first-visit-mobile" className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">
              Mobile number
            </label>
            <input
              id="first-visit-mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit mobile number"
              value={form.mobile}
              onChange={updateField('mobile')}
              required
              maxLength={10}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label htmlFor="first-visit-email" className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">
              Email address
            </label>
            <input
              id="first-visit-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={updateField('email')}
              required
              maxLength={254}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="first-visit-class" className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">
              Current class
            </label>
            <select
              id="first-visit-class"
              name="studentClass"
              value={form.studentClass}
              onChange={updateField('studentClass')}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="">Select your class</option>
              {CLASS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="first-visit-exam" className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-200">
              Target exam
            </label>
            <select
              id="first-visit-exam"
              name="exam"
              value={form.exam}
              onChange={updateField('exam')}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="">Select your exam</option>
              {EXAM_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
          Your details will be handled according to our <Link to="/privacy" onClick={close} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link>.
        </p>

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
        >
          {saving ? 'Submitting…' : 'Submit details'}
        </button>
        </form>
      </Modal>
    </FirstVisitStudentFormContext.Provider>
  );
}
