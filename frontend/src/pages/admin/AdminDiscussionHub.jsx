import React, { useEffect, useState, useRef } from 'react';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, Spinner } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';
import { useToast } from '../../context/ToastContext.jsx';
import {
  MessageSquare,
  Send,
  User,
  Sparkles,
  Search,
  ShieldCheck,
  Lock,
  Unlock,
  Trash2,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Filter,
  Check,
  GraduationCap,
  Paperclip,
  X,
  ImageIcon,
  ZoomIn
} from 'lucide-react';

export default function AdminDiscussionHub() {
  const toast = useToast();
  const [topics, setTopics] = useState([]);
  const [stats, setStats] = useState({ total_topics: 0, unanswered_count: 0, faculty_answered_count: 0, locked_count: 0 });
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [topicDetail, setTopicDetail] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'unanswered' | 'answered' | 'locked'
  const [searchQuery, setSearchQuery] = useState('');
  const [facultyReply, setFacultyReply] = useState('');
  const [facultyImage, setFacultyImage] = useState(null); // base64
  const [previewModalUrl, setPreviewModalUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const res = await adminService.forumTopics(filter, searchQuery);
      if (res.success) {
        setTopics(res.topics || []);
        if (res.stats) setStats(res.stats);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load discussion topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [filter]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    fetchTopics();
  };

  const openTopic = async (id) => {
    setActiveTopicId(id);
    setDetailLoading(true);
    try {
      const res = await adminService.forumTopic(id);
      if (res.success) {
        setTopicDetail(res);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load topic detail');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WebP)');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error('Image size should be less than 8MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFacultyImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSendFacultyReply = async () => {
    if ((!facultyReply.trim() && !facultyImage) || !activeTopicId) return;
    setSubmitting(true);
    try {
      await adminService.replyForumTopic(activeTopicId, facultyReply, facultyImage);
      setFacultyReply('');
      setFacultyImage(null);
      toast.success('Official Faculty Answer posted successfully!');
      // Refresh thread detail & topics list metrics
      const updated = await adminService.forumTopic(activeTopicId);
      if (updated.success) setTopicDetail(updated);
      fetchTopics();
    } catch (err) {
      toast.error(err.message || 'Failed to post faculty answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleLock = async () => {
    if (!activeTopicId) return;
    try {
      const res = await adminService.lockForumTopic(activeTopicId);
      toast.success(res.message);
      setTopicDetail((prev) => (prev ? { ...prev, topic: { ...prev.topic, is_locked: res.is_locked } } : prev));
      fetchTopics();
    } catch (err) {
      toast.error(err.message || 'Failed to update lock status');
    }
  };

  const handleDeleteTopic = async () => {
    if (!activeTopicId || !window.confirm('Are you sure you want to delete this student question topic and all its replies?')) return;
    try {
      await adminService.deleteForumTopic(activeTopicId);
      toast.success('Question topic deleted successfully.');
      setActiveTopicId(null);
      setTopicDetail(null);
      fetchTopics();
    } catch (err) {
      toast.error(err.message || 'Failed to delete topic');
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!window.confirm('Delete this reply?')) return;
    try {
      await adminService.deleteForumReply(replyId);
      toast.success('Reply removed.');
      const updated = await adminService.forumTopic(activeTopicId);
      if (updated.success) setTopicDetail(updated);
      fetchTopics();
    } catch (err) {
      toast.error(err.message || 'Failed to delete reply');
    }
  };

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
            <img src={previewModalUrl} alt="Zoomed view" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/90 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Admin Discussion Hub & Faculty Q&A</h1>
            <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-amber-500/20">
              <GraduationCap className="w-3.5 h-3.5" /> Faculty Console
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Answer student doubts with text/image proofs, provide official solutions, moderate questions, and lock resolved threads.
          </p>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Total Questions</span>
            <MessageSquare className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.total_topics}</p>
        </div>

        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Needs Faculty Answer</span>
            <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-950 dark:text-amber-300">{stats.unanswered_count}</p>
        </div>

        <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Faculty Answered</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-950 dark:text-emerald-300">{stats.faculty_answered_count}</p>
        </div>

        <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Locked Threads</span>
            <Lock className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.locked_count}</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 p-3 rounded-2xl shadow-xs">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'unanswered', label: '⚠️ Needs Faculty Answer' },
            { id: 'answered', label: '✅ Answered by Faculty' },
            { id: 'locked', label: '🔒 Locked Threads' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                filter === item.id
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doubt or student name..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-2xs transition cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Main Grid Content */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Doubts Topic List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Student Questions ({topics.length})</h3>
          </div>

          {loading ? (
            <div className="p-8 text-center bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl">
              <Spinner className="w-6 h-6 mx-auto text-blue-600" />
              <p className="text-xs text-slate-400 mt-2 font-medium">Loading student doubts...</p>
            </div>
          ) : topics.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">No questions found</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Try changing the filter or search query above.</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[700px] overflow-y-auto custom-scrollbar pr-0.5">
              {topics.map((t) => {
                const isSelected = activeTopicId === t.id;
                const hasFacultyReply = t.faculty_reply_count > 0;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => openTopic(t.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-slate-900 dark:text-white shadow-xs ring-1 ring-blue-500/50'
                        : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className="font-extrabold text-slate-900 dark:text-white text-xs leading-snug line-clamp-2">{t.title}</p>
                      <div className="flex items-center gap-1 shrink-0">
                        {t.image_url && (
                          <span className="p-1 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded" title="Includes photo attachment">
                            <ImageIcon className="w-3 h-3" />
                          </span>
                        )}
                        {t.is_locked && (
                          <span className="p-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded" title="Locked thread">
                            <Lock className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-2">
                      <span className="truncate">By <strong className="text-slate-700 dark:text-slate-300">{t.author_name}</strong></span>
                      <span className="text-[10px] text-slate-400 shrink-0">{formatDateTime(t.created_at)}</span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-2 text-[10.5px]">
                      {hasFacultyReply ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/60">
                          <ShieldCheck className="w-3 h-3" /> Faculty Answered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/60">
                          <AlertCircle className="w-3 h-3" /> Needs Answer
                        </span>
                      )}

                      <span className="font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {t.reply_count} Replies
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Thread Detail & Faculty Answer Console (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[600px]">
          {!topicDetail || !activeTopicId ? (
            <div className="my-auto flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 mb-3">
                <MessageSquare className="h-7 w-7" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Select a Student Question</h3>
              <p className="mt-1 max-w-xs text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Select any doubt from the left list to view details, inspect question photo proofs, post official faculty answers, or manage the discussion.
              </p>
            </div>
          ) : detailLoading ? (
            <div className="my-auto flex flex-col items-center justify-center py-16">
              <Spinner className="w-6 h-6 text-blue-600" />
              <p className="text-xs text-slate-400 mt-2 font-medium">Fetching question details...</p>
            </div>
          ) : (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {/* Thread Header & Admin Action Controls */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60">
                      Topic #{topicDetail.topic.id}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{formatDateTime(topicDetail.topic.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleToggleLock}
                      className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                        topicDetail.topic.is_locked
                          ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                      }`}
                      title={topicDetail.topic.is_locked ? 'Unlock thread' : 'Lock thread'}
                    >
                      {topicDetail.topic.is_locked ? (
                        <>
                          <Unlock className="w-3.5 h-3.5" /> Unlock Thread
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" /> Lock Thread
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDeleteTopic}
                      className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                      title="Delete entire question"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>

                {/* Question Title & Description Box */}
                <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl space-y-3">
                  <h2 className="text-sm font-black text-slate-900 dark:text-white leading-snug">{topicDetail.topic.title}</h2>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{topicDetail.topic.body}</p>

                  {/* Student Question Image Attachment */}
                  {topicDetail.topic.image_url && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block mb-1">Uploaded Question Photo</span>
                      <div className="relative inline-block group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-w-full">
                        <img
                          src={topicDetail.topic.image_url}
                          alt="Doubt photo"
                          className="max-h-56 w-auto object-cover rounded-xl cursor-pointer hover:opacity-95"
                          onClick={() => setPreviewModalUrl(topicDetail.topic.image_url)}
                        />
                        <div
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition cursor-pointer"
                          onClick={() => setPreviewModalUrl(topicDetail.topic.image_url)}
                        >
                          <ZoomIn className="w-4 h-4 mr-1" /> Click to enlarge
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Student: <strong className="text-slate-900 dark:text-slate-200 font-bold">{topicDetail.topic.author_name}</strong> ({topicDetail.topic.author_email})</span>
                  </div>
                </div>

                {/* Replies Thread Stream */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                    <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Replies & Faculty Solutions ({topicDetail.replies.length})
                    </h4>
                  </div>

                  {topicDetail.replies.length === 0 ? (
                    <div className="p-4 text-center bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl text-xs text-amber-900 dark:text-amber-300 font-semibold">
                      ⚠️ No replies yet. Use the Faculty Answer Console below to post an official solution!
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[340px] overflow-y-auto custom-scrollbar pr-0.5">
                      {topicDetail.replies.map((r) => {
                        const isFaculty = r.author_role === 'admin';
                        return (
                          <div
                            key={r.id}
                            className={`rounded-2xl p-4 text-xs space-y-2 border transition-all ${
                              isFaculty
                                ? 'bg-gradient-to-r from-amber-50/90 to-orange-50/90 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-300 dark:border-amber-800/80 shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 dark:text-white">{r.author_name}</span>
                                {isFaculty && (
                                  <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black tracking-wide uppercase shadow-2xs">
                                    <ShieldCheck className="w-3 h-3" /> Official Faculty Answer
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400 font-mono">{formatDateTime(r.created_at)}</span>
                                <button
                                  onClick={() => handleDeleteReply(r.id)}
                                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                                  title="Delete reply"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            
                            <p className="leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{r.body}</p>

                            {/* Reply Image Attachment */}
                            {r.image_url && (
                              <div className="pt-1">
                                <img
                                  src={r.image_url}
                                  alt="Solution attachment"
                                  className="max-h-48 w-auto object-cover rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-95"
                                  onClick={() => setPreviewModalUrl(r.image_url)}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Faculty Answer Console (Reply Form) */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span>Faculty Answer Console</span>
                  </label>
                  {topicDetail.topic.is_locked && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                      🔒 Thread is locked
                    </span>
                  )}
                </div>

                {facultyImage && (
                  <div className="relative inline-block border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-w-xs">
                    <img src={facultyImage} alt="Faculty solution preview" className="h-20 w-auto object-cover" />
                    <button
                      type="button"
                      onClick={() => setFacultyImage(null)}
                      className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImagePick}
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 rounded-xl cursor-pointer transition shrink-0 self-end mb-0.5"
                    title="Attach handwritten solution image / proof photo"
                    disabled={submitting || topicDetail.topic.is_locked}
                  >
                    <Paperclip className="w-4.5 h-4.5" />
                  </button>

                  <textarea
                    rows={3}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-colors"
                    placeholder="Write detailed official step-by-step solution or faculty guidance for the student..."
                    value={facultyReply}
                    onChange={(e) => setFacultyReply(e.target.value)}
                    disabled={submitting || topicDetail.topic.is_locked}
                  />
                  <button
                    type="button"
                    onClick={handleSendFacultyReply}
                    disabled={submitting || (!facultyReply.trim() && !facultyImage) || topicDetail.topic.is_locked}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all flex flex-col items-center justify-center gap-1 shrink-0 cursor-pointer self-end mb-0.5"
                  >
                    {submitting ? (
                      <Spinner className="w-4 h-4 text-slate-950" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Post</span>
                      </>
                    )}
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
