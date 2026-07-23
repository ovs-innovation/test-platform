import { useEffect, useState } from 'react';
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

  if (loading) return <LoadingScreen />;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Discussion Forum & Peer Q&A" subtitle="Ask doubts, share problem-solving strategies, and discuss mock test questions with aspirants." />
      
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Post Topic Form & Thread List (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <form onSubmit={create} className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>✍️</span> Post a New Question Topic
            </h2>
            
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Topic Title</label>
              <input
                className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
                placeholder="e.g. How to solve Integration by parts in JEE Math?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Question Description</label>
              <textarea
                className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
                rows={3}
                placeholder="Describe your question or difficulty in detail..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-7 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105 disabled:opacity-50"
              disabled={posting}
            >
              {posting ? <Spinner className="h-4 w-4" /> : 'Post Question Topic'}
            </button>
          </form>

          {/* Topics List Cards */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Active Discussions</h3>
            {topics.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-[#0b1430] p-6 text-center text-xs text-slate-400">
                No discussion topics created yet. Be the first to ask a question above!
              </div>
            ) : (
              topics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => openTopic(t.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                    active === t.id
                      ? 'border-blue-500 bg-[#0e193c] text-white shadow-md ring-1 ring-blue-500/50'
                      : 'border-slate-800/80 bg-[#0b1430] text-slate-300 hover:border-slate-700 hover:bg-[#0e193c]'
                  }`}
                >
                  <p className="font-extrabold text-white text-sm leading-snug">{t.title}</p>
                  <div className="mt-2.5 flex items-center justify-between text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1.5">👤 <strong className="text-slate-300">{t.author_name}</strong></span>
                    <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-300 border border-blue-500/30">
                      💬 {t.reply_count} Replies
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Discussion Details or Structured Empty State (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl flex flex-col justify-between min-h-[460px]">
          {!detail ? (
            <div className="my-auto flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-3xl text-blue-400 border border-blue-500/30 mb-4 shadow-lg shadow-blue-500/10">
                💬
              </div>
              <h3 className="text-base font-extrabold text-white">Select a Topic to View Discussion</h3>
              <p className="mt-2 max-w-xs text-xs font-medium text-slate-400 leading-relaxed">
                Select a topic from the list on the left to view the discussion, or post a new question to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Discussion Thread</span>
                  <span className="text-[11px] font-semibold text-slate-400">{formatDateTime(detail.topic.created_at)}</span>
                </div>

                <h2 className="text-lg font-black text-white mt-3">{detail.topic.title}</h2>
                <div className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#070c18] p-4 rounded-2xl border border-slate-800">
                  {detail.topic.body}
                </div>
                <p className="mt-2 text-[11px] font-semibold text-slate-400">
                  Asked by <strong className="text-slate-200">{detail.topic.author_name}</strong>
                </p>

                <div className="mt-6 space-y-3 border-t border-slate-800 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Student & Faculty Replies ({detail.replies.length})</h4>
                  {detail.replies.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-2">No replies yet. Be the first to answer!</p>
                  ) : (
                    detail.replies.map((r) => (
                      <div key={r.id} className="rounded-2xl border border-slate-800/80 bg-[#070e24] p-3.5 text-xs text-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-cyan-300">{r.author_name}</span>
                        </div>
                        <p className="leading-relaxed text-slate-300">{r.body}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-800">
                <input
                  className="flex-1 rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
                  placeholder="Write your answer or explanation..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <button
                  type="button"
                  className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:scale-105 transition"
                  onClick={sendReply}
                  disabled={posting}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
