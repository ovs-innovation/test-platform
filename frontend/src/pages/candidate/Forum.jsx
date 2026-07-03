import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function Forum() {
  const toast = useToast();
  const [topics, setTopics] = useState([]);
  const [active, setActive] = useState(null);
  const [detail, setDetail] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const load = () => studentService.forum().then(setTopics).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openTopic = async (id) => {
    setActive(id);
    setDetail(await studentService.forumTopic(id));
  };

  const create = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      await studentService.createTopic({ title, body });
      setTitle(''); setBody('');
      toast.success('Topic created');
      load();
    } catch (err) { toast.error(err.message); }
    finally { setPosting(false); }
  };

  const sendReply = async () => {
    if (!reply.trim()) return;
    setPosting(true);
    try {
      await studentService.replyTopic(active, reply);
      setReply('');
      setDetail(await studentService.forumTopic(active));
    } catch (err) { toast.error(err.message); }
    finally { setPosting(false); }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <PageHeader title="Discussion forum" subtitle="Ask doubts and help fellow aspirants." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <form onSubmit={create} className="card mb-4 space-y-3 p-4">
            <input className="input" placeholder="Topic title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea className="input" rows={3} placeholder="Your question..." value={body} onChange={(e) => setBody(e.target.value)} required />
            <button type="submit" className="btn-primary" disabled={posting}>{posting ? <Spinner className="h-4 w-4" /> : 'Post topic'}</button>
          </form>
          <div className="space-y-2">
            {topics.map((t) => (
              <button key={t.id} type="button" onClick={() => openTopic(t.id)}
                className={`card w-full p-4 text-left transition ${active === t.id ? 'ring-2 ring-brand-500' : 'hover:shadow-card'}`}>
                <p className="font-medium text-slate-900 dark:text-white">{t.title}</p>
                <p className="mt-1 text-xs text-muted">{t.author_name} · {t.reply_count} replies</p>
              </button>
            ))}
          </div>
        </div>
        <div className="card p-4">
          {!detail ? <p className="text-sm text-muted">Select a topic to view discussion</p> : (
            <>
              <h2 className="font-semibold text-slate-900 dark:text-white">{detail.topic.title}</h2>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{detail.topic.body}</p>
              <p className="mt-1 text-xs text-muted">{detail.topic.author_name} · {formatDateTime(detail.topic.created_at)}</p>
              <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                {detail.replies.map((r) => (
                  <div key={r.id} className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800/60">
                    <p className="font-medium text-slate-800">{r.author_name}</p>
                    <p className="mt-1">{r.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input className="input flex-1" placeholder="Write a reply..." value={reply} onChange={(e) => setReply(e.target.value)} />
                <button type="button" className="btn-primary" onClick={sendReply} disabled={posting}>Reply</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
