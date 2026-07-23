import { useEffect, useState, useRef } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

function initials(name) {
  return (name || 'U').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function Profile() {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ name: '', phone: '', city: '', state: '', target_exam: '', class: '' });
  const [email, setEmail] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [state, setState] = useState('loading');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    studentService.profile().then((d) => {
      setEmail(d.user.email);
      setForm({
        name: d.user.name || '',
        phone: d.profile?.phone || '',
        city: d.profile?.city || '',
        state: d.profile?.state || '',
        target_exam: d.profile?.target_exam || '',
        class: d.profile?.class || '',
      });
      setState('done');
    }).catch(() => setState('error'));
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image file size must be under 5MB');
        return;
      }
      setAvatarPreview(URL.createObjectURL(file));
      toast.success('Avatar preview updated! Click Save Profile to persist.');
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await studentService.updateProfile(form);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error') return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Student Profile" subtitle="Name, phone number, class, and target exam details for your account and certificates." />

      {/* Avatar Showcase & Upload Box */}
      <div className="flex items-center gap-5 rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl max-w-2xl">
        {/* Interactive Avatar Upload Circle */}
        <div className="relative group shrink-0">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-blue-500/50 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-2xl font-black text-white shadow-xl shadow-blue-500/25 transition group-hover:border-blue-400 group-hover:brightness-110"
            title="Click to change photo"
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
            ) : (
              <span>{initials(form.name)}</span>
            )}
          </div>

          {/* Camera Icon Overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2563eb] text-xs text-white border-2 border-[#0b1430] shadow-md transition group-hover:scale-110 hover:bg-blue-600"
            title="Change photo"
          >
            📷
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">{form.name || 'Student'}</h2>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[10px] font-bold text-blue-300 underline hover:text-white"
            >
              Change photo
            </button>
          </div>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">{email}</p>
          {(form.class || form.target_exam) && (
            <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-0.5 text-xs font-bold text-cyan-300">
              {form.class && <span>{form.class}</span>}
              {form.class && form.target_exam && <span>·</span>}
              {form.target_exam && <span>Preparing for {form.target_exam}</span>}
            </p>
          )}
        </div>
      </div>

      <form onSubmit={save} className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 sm:p-8 shadow-xl max-w-2xl space-y-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Email Address</label>
          <input className="w-full rounded-xl border border-slate-800 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-400 cursor-not-allowed" value={email} disabled />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Full Name</label>
          <input className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:outline-none" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Phone Number</label>
          <input className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:outline-none" placeholder="e.g. 9876543210" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">City</label>
            <input className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:outline-none" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">State</label>
            <input className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:outline-none" value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Class</label>
            <select className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-[#2563eb] focus:outline-none" value={form.class} onChange={(e) => setForm((f) => ({ ...f, class: e.target.value }))}>
              <option value="">Select class</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
              <option value="Dropper (12th Pass)">Dropper (12th Pass)</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Target Exam</label>
            <select className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-[#2563eb] focus:outline-none" value={form.target_exam} onChange={(e) => setForm((f) => ({ ...f, target_exam: e.target.value }))}>
              <option value="">Select exam</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
            </select>
          </div>
        </div>
        <button type="submit" className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-7 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105 disabled:opacity-50" disabled={saving}>
          {saving ? <Spinner className="h-4 w-4" /> : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}
