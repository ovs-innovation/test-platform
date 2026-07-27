import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner } from '../../components/ui.jsx';
import ActionDropdown from '../../components/ActionDropdown.jsx';
import { useToast } from '../../context/ToastContext.jsx';

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

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title="Content Management System (CMS)" subtitle="Manage blog posts, FAQs, announcements, and static landing pages." />
      <form onSubmit={save} className="card mb-6 space-y-3 p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <div className="grid gap-3 sm:grid-cols-3">
          <input className="input" placeholder="slug-url" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
          <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          <select className="input" value={form.page_type} onChange={(e) => setForm((f) => ({ ...f, page_type: e.target.value }))}>
            <option value="blog">Blog Post</option>
            <option value="faq">FAQ</option>
            <option value="page">Static Page</option>
          </select>
        </div>
        <input className="input" placeholder="Excerpt / Short Summary" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
        <textarea className="input font-mono text-xs" rows={5} placeholder="Content (HTML or Markdown supported)" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} />
        <div className="flex justify-end pt-2">
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? <Spinner className="h-4 w-4" /> : 'Publish / Save Page'}</button>
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

