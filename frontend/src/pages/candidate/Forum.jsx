import { useEffect, useState } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, PageHeader, Spinner } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';
import { useToast } from '../../context/ToastContext.jsx';
import { MessageSquare, Send, User, Sparkles } from 'lucide-react';

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
      toast.success('Question topic created successfully');
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

  if (loading) return <LoadingScreen label="Loading forum..." />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Discussion Hub & Peer Q&A</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Ask doubts, discuss mock test questions, and share problem-solving techniques with fellow aspirants.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Post Topic Form & Thread List (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <form onSubmit={create} className="p-5 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-3 shadow-xs">
            <h2 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Ask a Question</span>
            </h2>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Question Title</label>
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                placeholder="e.g. How to solve Integration by parts in JEE Math?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Question Description</label>
              <textarea
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                rows={3}
                placeholder="Describe your question or difficulty in detail..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-500 transition cursor-pointer disabled:opacity-50"
              disabled={posting}
            >
              {posting ? <Spinner className="h-4 w-4" /> : 'Post Question'}
            </button>
          </form>

          {/* Topics List Cards */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Discussions</h3>
            {topics.length === 0 ? (
              <div className="saas-card p-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl">
                No discussion topics created yet. Be the first to ask a question above!
              </div>
            ) : (
              topics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => openTopic(t.id)}
                  className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
                    active === t.id
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-slate-900 dark:text-white shadow-xs'
                      : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className="font-extrabold text-slate-900 dark:text-white text-xs leading-snug">{t.title}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>Asked by <strong className="text-slate-700 dark:text-slate-300">{t.author_name}</strong></span>
                    <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-cyan-300 border border-blue-500/20">
                      {t.reply_count} Replies
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Discussion Details (6 Cols) */}
        <div className="lg:col-span-6 saas-card p-5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl flex flex-col justify-between min-h-[440px]">
          {!detail ? (
            <div className="my-auto flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 mb-3">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Select a Topic to View Discussion</h3>
              <p className="mt-1 max-w-xs text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Select a topic from the list on the left to view the discussion, or post a new question.
              </p>
            </div>
          ) : (
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-300">Discussion Thread</span>
                  <span className="text-[10.5px] text-slate-400">{formatDateTime(detail.topic.created_at)}</span>
                </div>

                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-2">{detail.topic.title}</h2>
                <div className="mt-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                  {detail.topic.body}
                </div>
                <p className="mt-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Asked by <strong className="text-slate-900 dark:text-slate-200">{detail.topic.author_name}</strong>
                </p>

                <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">Replies ({detail.replies.length})</h4>
                  {detail.replies.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-1">No replies yet. Be the first to answer!</p>
                  ) : (
                    detail.replies.map((r) => (
                      <div key={r.id} className="rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/80 dark:bg-slate-900/40 p-3 text-xs text-slate-800 dark:text-slate-200">
                        <span className="font-bold text-blue-600 dark:text-cyan-300 block mb-0.5">{r.author_name}</span>
                        <p className="leading-relaxed">{r.body}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-3 flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                <input
                  className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Write your answer or explanation..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-500 transition"
                  onClick={sendReply}
                  disabled={posting}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
