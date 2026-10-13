import { useEffect, useState, useRef } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, Spinner } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  MessageSquare,
  Send,
  User,
  Sparkles,
  Paperclip,
  X,
  ImageIcon,
  ZoomIn,
  ShieldCheck,
  BookOpen,
  Filter,
  Check,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function Forum() {
  const toast = useToast();
  const [topics, setTopics] = useState([]);
  const [scope, setScope] = useState({ testSeriesList: [], examTypes: [], targetExam: null });
  const [selectedChannel, setSelectedChannel] = useState('all'); // 'all' or test_series_id
  const [active, setActive] = useState(null);
  const [detail, setDetail] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [topicSeriesId, setTopicSeriesId] = useState('');
  const [topicImage, setTopicImage] = useState(null); // base64
  const [reply, setReply] = useState('');
  const [replyImage, setReplyImage] = useState(null); // base64
  const [previewModalUrl, setPreviewModalUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const topicFileRef = useRef(null);
  const replyFileRef = useRef(null);

  const load = async (filterId = selectedChannel) => {
    try {
      const params = {};
      if (filterId && filterId !== 'all') {
        params.testSeriesId = filterId;
      }
      const res = await studentService.forum(params);
      const topicList = res.topics || (Array.isArray(res) ? res : []);
      setTopics(topicList);

      if (res.scope) {
        setScope(res.scope);
        // Default the post form to the first available test series if not yet set
        if (!topicSeriesId && res.scope.testSeriesList?.length > 0) {
          setTopicSeriesId(String(res.scope.testSeriesList[0].test_series_id));
        }
      }

      // If active topic is no longer in list, deselect
      if (active && !topicList.some((t) => t.id === active)) {
        setActive(null);
        setDetail(null);
      }
    } catch (err) {
      toast.error('Unable to load discussion topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(selectedChannel);
  }, [selectedChannel]);

  const openTopic = async (id) => {
    setActive(id);
    try {
      const topicRes = await studentService.forumTopic(id);
      setDetail(topicRes);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Unable to open discussion');
    }
  };

  const handleImagePick = (e, setImgState) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WebP)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image size must be less than 8MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImgState(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const create = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error('Please enter both title and question description.');
      return;
    }

    setPosting(true);
    try {
      const matchedSeries = scope.testSeriesList?.find(
        (s) => String(s.test_series_id) === String(topicSeriesId)
      );

      await studentService.createTopic({
        title: title.trim(),
        body: body.trim(),
        imageUrl: topicImage,
        testSeriesId: topicSeriesId ? parseInt(topicSeriesId, 10) : undefined,
        examType: matchedSeries?.exam_type || scope.targetExam || undefined,
      });

      setTitle('');
      setBody('');
      setTopicImage(null);
      toast.success('Question posted to peer discussion group!');
      load(selectedChannel);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to post question');
    } finally {
      setPosting(false);
    }
  };

  const sendReply = async () => {
    if (!reply.trim() && !replyImage) return;
    setPosting(true);
    try {
      await studentService.replyTopic(active, reply.trim(), replyImage);
      setReply('');
      setReplyImage(null);
      const updated = await studentService.forumTopic(active);
      setDetail(updated);
      toast.success('Your solution/answer has been posted!');
      load(selectedChannel);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to post reply');
    } finally {
      setPosting(false);
    }
  };

  if (loading) return <LoadingScreen label="Connecting to your peer discussion hub..." />;

  const activeChannelObj =
    selectedChannel === 'all'
      ? null
      : scope.testSeriesList?.find((s) => String(s.test_series_id) === String(selectedChannel));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Modal Image Zoom Viewer */}
      {previewModalUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <button
              onClick={() => setPreviewModalUrl(null)}
              className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewModalUrl}
              alt="Zoomed view"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* 1. Header Banner & Scoped Community Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Discussion Hub & Peer Q&A
            </h1>
            <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <ShieldCheck className="h-3 w-3" />
              <span>Peer Isolated</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Resolve doubts and discuss formulas exclusively with fellow aspirants enrolled in your test series and exam.
          </p>
        </div>

        {/* Status Chip */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Active Community:
          </span>
          <span className="rounded-xl border border-blue-200 bg-blue-50/80 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
            {activeChannelObj
              ? `${activeChannelObj.test_series_title} (${activeChannelObj.exam_type})`
              : scope.examTypes?.length > 0
              ? `All My Enrolled Channels (${scope.examTypes.join(', ')})`
              : 'Enrolled Peer Channels'}
          </span>
        </div>
      </div>

      {/* 2. Channel & Test Series Room Selector Bar */}
      {scope.testSeriesList?.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-[#0F172A]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 ml-1">
              Select Room:
            </span>

            {/* All Enrolled Channels */}
            <button
              type="button"
              onClick={() => setSelectedChannel('all')}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                selectedChannel === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>All Enrolled Rooms</span>
            </button>

            {/* Individual Test Series Rooms */}
            {scope.testSeriesList.map((ts) => {
              const isSelected = String(selectedChannel) === String(ts.test_series_id);
              return (
                <button
                  key={ts.test_series_id}
                  type="button"
                  onClick={() => setSelectedChannel(String(ts.test_series_id))}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>{ts.test_series_title}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.2 text-[9px] font-black ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                    }`}
                  >
                    {ts.exam_type || 'Exam'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Post Doubt Form & Active Discussions (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <form
            onSubmit={create}
            className="p-5 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-3 shadow-xs"
          >
            <h2 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Ask a Question / Upload Doubt</span>
            </h2>

            {/* Enrolled Test Series Selector Dropdown */}
            {scope.testSeriesList?.length > 0 && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Discussion Room / Test Series
                </label>
                <select
                  value={topicSeriesId}
                  onChange={(e) => setTopicSeriesId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none cursor-pointer"
                  required
                >
                  {scope.testSeriesList.map((s) => (
                    <option key={s.test_series_id} value={s.test_series_id}>
                      {s.test_series_title} ({s.exam_type || 'Exam'})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Question Title
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                placeholder="e.g. Prove Theorem or Solve Integration numerical formula..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Question Description
              </label>
              <textarea
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                rows={3}
                placeholder="Describe your doubt, step difficulty, or theorem in detail..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>

            {/* Hidden File Picker & Attachment Preview */}
            <input
              type="file"
              ref={topicFileRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImagePick(e, setTopicImage)}
            />

            {topicImage && (
              <div className="relative inline-block border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-w-xs">
                <img src={topicImage} alt="Doubt Preview" className="h-24 w-auto object-cover" />
                <button
                  type="button"
                  onClick={() => setTopicImage(null)}
                  className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-black text-white rounded-full cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => topicFileRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                <span>{topicImage ? 'Change Image' : 'Attach Question Photo'}</span>
              </button>

              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-500 transition cursor-pointer disabled:opacity-50"
                disabled={posting}
              >
                {posting ? <Spinner className="h-4 w-4" /> : 'Post Question'}
              </button>
            </div>
          </form>

          {/* Topics List Cards */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Discussions
              </h3>
              <span className="text-[11px] font-semibold text-slate-500">
                {topics.length} {topics.length === 1 ? 'topic' : 'topics'} in this room
              </span>
            </div>

            {topics.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  No discussions found in this room yet
                </p>
                <p className="text-[11px] max-w-sm mx-auto">
                  Be the first student to ask a question! All doubts asked here are shared with peers in the same enrolled test series.
                </p>
              </div>
            ) : (
              topics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => openTopic(t.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                    active === t.id
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-slate-900 dark:text-white shadow-xs ring-1 ring-blue-500/20'
                      : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-extrabold text-slate-900 dark:text-white text-xs leading-snug">
                      {t.title}
                    </p>
                    {t.image_url && (
                      <span
                        className="p-1 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded shrink-0"
                        title="Has image attachment"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Scoped Badges: Test Series & Exam Type */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {t.exam_type && (
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                        {t.exam_type}
                      </span>
                    )}
                    {t.test_series_title && (
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 truncate max-w-[220px]">
                        {t.test_series_title}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>
                      Asked by <strong className="text-slate-700 dark:text-slate-300">{t.author_name}</strong>
                    </span>
                    <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-cyan-300 border border-blue-500/20">
                      {t.reply_count} {t.reply_count === 1 ? 'Reply' : 'Replies'}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Discussion Details & Solutions (6 Cols) */}
        <div className="lg:col-span-6 p-5 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl flex flex-col justify-between min-h-[460px] shadow-xs">
          {!detail ? (
            <div className="my-auto flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 mb-3">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Select a Question to View Discussion
              </h3>
              <p className="mt-1 max-w-xs text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Click any doubt from your enrolled room on the left to read responses and discuss solutions with your peers.
              </p>
            </div>
          ) : (
            <div className="space-y-3 flex-1 flex flex-col justify-between">
              <div>
                {/* Thread Header */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 gap-2">
                  <div className="flex items-center gap-1.5">
                    {detail.topic.exam_type && (
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                        {detail.topic.exam_type}
                      </span>
                    )}
                    {detail.topic.test_series_title && (
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {detail.topic.test_series_title}
                      </span>
                    )}
                  </div>
                  <span className="text-[10.5px] text-slate-400">
                    {formatDateTime(detail.topic.created_at)}
                  </span>
                </div>

                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white mt-2.5">
                  {detail.topic.title}
                </h2>

                <div className="mt-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <p className="whitespace-pre-wrap">{detail.topic.body}</p>

                  {detail.topic.image_url && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <div className="relative inline-block group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-w-full">
                        <img
                          src={detail.topic.image_url}
                          alt="Question attachment"
                          className="max-h-60 w-auto object-cover rounded-xl cursor-pointer hover:opacity-95"
                          onClick={() => setPreviewModalUrl(detail.topic.image_url)}
                        />
                        <div
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition cursor-pointer"
                          onClick={() => setPreviewModalUrl(detail.topic.image_url)}
                        >
                          <ZoomIn className="w-4 h-4 mr-1" /> Click to enlarge
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <p className="mt-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Asked by{' '}
                  <strong className="text-slate-900 dark:text-slate-200">
                    {detail.topic.author_name}
                  </strong>
                </p>

                {/* Replies & Peer Solutions Section */}
                <div className="mt-4 space-y-2.5 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <h4 className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    Replies & Peer Solutions ({detail.replies.length})
                  </h4>

                  {detail.replies.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-1">
                      No replies yet. Be the first to answer this question!
                    </p>
                  ) : (
                    detail.replies.map((r) => (
                      <div
                        key={r.id}
                        className={`rounded-xl p-3.5 text-xs space-y-2 border transition-all ${
                          r.author_role === 'admin' || r.author_role === 'faculty'
                            ? 'bg-gradient-to-r from-amber-50/90 to-orange-50/90 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-300 dark:border-amber-800/80 text-slate-900 dark:text-amber-200 shadow-xs'
                            : 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/60 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 dark:text-white">
                              {r.author_name}
                            </span>
                            {(r.author_role === 'admin' || r.author_role === 'faculty') && (
                              <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[9.5px] px-2 py-0.5 rounded-full font-black tracking-wide uppercase shadow-2xs">
                                🎓 Official Faculty Answer
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {formatDateTime(r.created_at)}
                          </span>
                        </div>

                        <p className="leading-relaxed whitespace-pre-wrap">{r.body}</p>

                        {/* Reply Image Attachment */}
                        {r.image_url && (
                          <div className="pt-1">
                            <img
                              src={r.image_url}
                              alt="Solution step"
                              className="max-h-48 w-auto object-cover rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-95"
                              onClick={() => setPreviewModalUrl(r.image_url)}
                            />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Reply Input Form */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {replyImage && (
                  <div className="relative inline-block border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-w-xs">
                    <img
                      src={replyImage}
                      alt="Reply Image Preview"
                      className="h-20 w-auto object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setReplyImage(null)}
                      className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  ref={replyFileRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImagePick(e, setReplyImage)}
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => replyFileRef.current?.click()}
                    className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 rounded-xl cursor-pointer transition shrink-0"
                    title="Attach solution image / proof photo"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Write your answer or explanation for fellow peers..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendReply();
                      }
                    }}
                  />

                  <button
                    type="button"
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-blue-500 transition cursor-pointer disabled:opacity-50"
                    onClick={sendReply}
                    disabled={posting}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
