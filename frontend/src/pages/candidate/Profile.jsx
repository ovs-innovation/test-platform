import { useEffect, useState, useRef } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, Spinner } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { Camera, User, CheckCircle2 } from 'lucide-react';

function initials(name) {
  return (name || 'U').split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function Profile() {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ name: '', phone: '', city: '', state: '', target_exam: '', class: '', avatar_url: '' });
  const [email, setEmail] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [state, setState] = useState('loading');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    studentService.profile().then((d) => {
      setEmail(d.user.email);
      const url = d.profile?.avatar_url || d.user?.avatar_url || null;
      if (url) setAvatarPreview(url);
      setForm({
        name: d.user.name || '',
        phone: d.profile?.phone || '',
        city: d.profile?.city || '',
        state: d.profile?.state || '',
        target_exam: d.profile?.target_exam || '',
        class: d.profile?.class || '',
        avatar_url: url || '',
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
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target.result;
        setAvatarPreview(base64);
        setForm((f) => ({ ...f, avatar_url: base64 }));
        toast.success('Avatar photo updated! Click Save Profile to persist changes.');
      };
      reader.readAsDataURL(file);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await studentService.updateProfile(form);
      const userRaw = localStorage.getItem('user');
      if (userRaw) {
        try {
          const u = JSON.parse(userRaw);
          u.avatar_url = form.avatar_url;
          u.name = form.name;
          localStorage.setItem('user', JSON.stringify(u));
        } catch { /* ignore */ }
      }
      toast.success('Profile updated successfully!');
      setTimeout(() => window.location.reload(), 400);
    } catch (err) {
      toast.error(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (state === 'loading') return <LoadingScreen label="Loading profile..." />;
  if (state === 'error') return <ErrorState onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12">
      <PageHeader title="Student Profile" subtitle="Name, phone number, class, and target exam details for your account and certificates." />

      {/* Avatar Showcase & Upload Box */}
      <div className="saas-card p-4 sm:p-5 flex items-center gap-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl max-w-2xl">
        <div className="relative group shrink-0">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-blue-500/40 bg-gradient-to-r from-blue-600 to-indigo-600 text-xl font-black text-white shadow-2xs transition hover:scale-105"
            title="Click to change photo"
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
            ) : (
              <span>{initials(form.name)}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white border-2 border-white dark:border-[#111827] shadow-xs"
            title="Change photo"
          >
            <Camera className="h-3 w-3" />
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
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">{form.name || 'Student'}</h2>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Change photo
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{email}</p>
          {(form.class || form.target_exam) && (
            <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-blue-500/10 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-cyan-300 border border-blue-500/20">
              {form.class && <span>{form.class}</span>}
              {form.class && form.target_exam && <span>·</span>}
              {form.target_exam && <span>Preparing for {form.target_exam}</span>}
            </p>
          )}
        </div>
      </div>

      <form onSubmit={save} className="saas-card p-5 sm:p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl max-w-2xl space-y-3.5">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Email Address</label>
          <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 cursor-not-allowed" value={email} disabled />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
          <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
          <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none" placeholder="e.g. 9876543210" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">City</label>
            <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">State</label>
            <input className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none" value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Class</label>
            <select className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none" value={form.class} onChange={(e) => setForm((f) => ({ ...f, class: e.target.value }))}>
              <option value="">Select class</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
              <option value="Dropper (12th Pass)">Dropper (12th Pass)</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 9">Class 9</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Target Exam</label>
            <select className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none" value={form.target_exam} onChange={(e) => setForm((f) => ({ ...f, target_exam: e.target.value }))}>
              <option value="">Select exam</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
            </select>
          </div>
        </div>
        <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-black text-white shadow-2xs hover:bg-blue-500 transition disabled:opacity-50" disabled={saving}>
          {saving ? <Spinner className="h-4 w-4" /> : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}
