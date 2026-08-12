import { useEffect, useState, useRef } from 'react';
import { Trash2, ChevronDown, Check, FileText } from 'lucide-react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, Spinner } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import ActionDropdown from '../../components/ActionDropdown.jsx';
import { useToast } from '../../context/ToastContext.jsx';

function CustomPageTypeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: 'blog', label: 'Blog Post', desc: 'Articles & tutorials' },
    { value: 'faq', label: 'FAQ', desc: 'Frequently Asked Questions' },
    { value: 'page', label: 'Static Page', desc: 'Landing & info pages' },
  ];

  const selected = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2.5 px-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-blue-500/80 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate">{selected.label}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${open ? 'rotate-180 text-blue-600' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-full z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-2xl p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold border border-blue-200 dark:border-blue-800/80 shadow-2xs'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold'
                }`}
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="text-xs font-bold leading-tight">{opt.label}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">{opt.desc}</p>
                </div>
                {isSelected && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminCMS() {
  const toast = useToast();
  const [pages, setPages] = useState([]);
  const [form, setForm] = useState({ slug: '', title: '', content: '', page_type: 'blog', excerpt: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => adminService.cms().then(setPages).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.saveCms(form);
      toast.success('Saved');
      setForm({ slug: '', title: '', content: '', page_type: 'blog', excerpt: '' });
      load();
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
  };

  if (loading) return <LoadingScreen label="Loading CMS articles..." />;

  return (
    <div className="w-full max-w-full space-y-6">
      <AdminHeader
        title="Content Management System (CMS)"
        subtitle="Manage blog posts, FAQs, announcements, and static landing page content."
        breadcrumbs={['CMS Content & Ticker']}
      />
      <form onSubmit={save} className="rounded-2xl mb-6 space-y-3 p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
        <div className="grid gap-3 sm:grid-cols-3">
          <input className="input rounded-xl" placeholder="slug-url" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
          <input className="input rounded-xl" placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          <CustomPageTypeDropdown
            value={form.page_type}
            onChange={(val) => setForm((f) => ({ ...f, page_type: val }))}
          />
        </div>
        <input className="input rounded-xl" placeholder="Excerpt / Short Summary" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
        <textarea className="input font-mono text-xs rounded-xl" rows={5} placeholder="Content (HTML or Markdown supported)" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} />
        <div className="flex justify-end pt-2">
          <button type="submit" className="btn-primary rounded-xl font-extrabold cursor-pointer" disabled={saving}>{saving ? <Spinner className="h-4 w-4 text-white" /> : 'Publish / Save Page'}</button>
        </div>
      </form>
      <div className="space-y-2.5">
        {pages.map((p) => (
          <div key={p.id} className="card flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-2.5 py-0.5 text-xs font-black text-blue-600 dark:text-blue-400 border border-blue-500/20 uppercase">{p.page_type}</span>
              <strong className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">{p.title}</strong>
              <span className="text-xs font-semibold text-slate-400 font-mono">/{p.slug}</span>
            </div>
            <ActionDropdown
              items={[
                {
                  label: 'Delete Page',
                  icon: Trash2,
                  onClick: async () => {
                    await adminService.deleteCms(p.id);
                    load();
                  },
                  danger: true,
                },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

