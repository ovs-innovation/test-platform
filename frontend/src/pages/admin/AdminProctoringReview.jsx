import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { adminService, assessmentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState, Badge, StatCard } from '../../components/ui.jsx';
import { formatDateTime, formatCompactDateTime } from '../../lib/format.js';
import {
  Shield,
  Video,
  Play,
  Pause,
  Image as ImageIcon,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Eye,
  Trash2,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
  Info,
  Download,
  X
} from 'lucide-react';

const STATE_FILTERS = [
  { id: 'all', label: 'All Sessions' },
  { id: 'recording_in_progress', label: 'In Progress' },
  { id: 'upload_pending', label: 'Upload Pending' },
  { id: 'finalized', label: 'Finalized' },
  { id: 'incomplete', label: 'Incomplete / Stopped' },
  { id: 'failed_upload', label: 'Failed Uploads' },
  { id: 'purged', label: 'Purged / Expired' },
];

function formatDuration(totalSeconds) {
  if (totalSeconds == null || isNaN(totalSeconds) || totalSeconds < 0) return '—';
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

function formatBytes(bytes) {
  if (bytes == null || isNaN(bytes) || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function formatChunkTime(chunkIndex, intervalSeconds = 5) {
  const totalSeconds = Math.max(0, ((chunkIndex || 1) - 1) * intervalSeconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const hrs = Math.floor(mins / 60);
  if (hrs > 0) {
    const remMins = mins % 60;
    return `${hrs}:${String(remMins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function AdminProctoringReview() {
  const [searchParams, setSearchParams] = useSearchParams();
  const attemptIdParam = searchParams.get('attempt_id') || '';

  // Data states
  const [sessions, setSessions] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(attemptIdParam);
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Evidence modal / drawer state
  const [activeSession, setActiveSession] = useState(null);
  const [manifestData, setManifestData] = useState(null);
  const [loadingManifest, setLoadingManifest] = useState(false);
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'screenshots' | 'events'
  const [selectedChunk, setSelectedChunk] = useState(null);
  const [videoPlaybackUrl, setVideoPlaybackUrl] = useState('');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Purge modal state
  const [purging, setPurging] = useState(false);
  const [purgeResult, setPurgeResult] = useState(null);

  const videoRef = useRef(null);
  const pendingSeekTimeRef = useRef(null);

  // Load assessments for filter dropdown
  useEffect(() => {
    assessmentService
      .listAll()
      .then((data) => setAssessments(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  // Fetch proctoring sessions
  const fetchSessions = async (page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 10,
        ...(searchQuery.trim() ? { search: searchQuery.trim() } : {}),
        ...(selectedAssessment ? { assessment_id: selectedAssessment } : {}),
        ...(selectedState !== 'all' ? { status: selectedState } : {}),
        ...(dateFrom ? { date_from: dateFrom } : {}),
        ...(dateTo ? { date_to: dateTo } : {}),
      };

      const res = await adminService.proctoringSessions(params);
      setSessions(res.sessions || []);
      setPagination(res.pagination || { page: 1, limit: 10, total: 0, total_pages: 1 });

      // If user came with attempt_id parameter and there is a match, auto-open evidence
      if (attemptIdParam && res.sessions?.length > 0 && !activeSession) {
        const matched = res.sessions.find((s) => String(s.attempt_id) === String(attemptIdParam));
        if (matched) {
          openEvidenceModal(matched);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch proctoring sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedAssessment, selectedState, dateFrom, dateTo]);

  // Open evidence modal and fetch fresh manifest with signed URLs
  const openEvidenceModal = async (session) => {
    setActiveSession(session);
    setManifestData(null);
    setSelectedChunk(null);
    setVideoPlaybackUrl('');
    setLoadingManifest(true);
    setActiveTab('video');
    pendingSeekTimeRef.current = null;

    try {
      const manifest = await adminService.proctoringManifest(session.attempt_id, session.session_id);
      setManifestData(manifest);

      // Default video playback URL: prefer continuous stream, else first chunk
      if (manifest.session?.final_video_playback_url) {
        setVideoPlaybackUrl(manifest.session.final_video_playback_url);
        if (manifest.chunks?.length > 0) {
          setSelectedChunk(manifest.chunks[0]);
        }
      } else if (manifest.chunks?.length > 0 && manifest.chunks[0].playback_url) {
        setSelectedChunk(manifest.chunks[0]);
        setVideoPlaybackUrl(manifest.chunks[0].playback_url);
      }
    } catch (err) {
      alert(err.message || 'Failed to load playback manifest');
    } finally {
      setLoadingManifest(false);
    }
  };

  const closeEvidenceModal = () => {
    setActiveSession(null);
    setManifestData(null);
    setSelectedChunk(null);
    setVideoPlaybackUrl('');
    setLightboxImage(null);
    pendingSeekTimeRef.current = null;
  };

  const handleSelectChunk = (chunk) => {
    setSelectedChunk(chunk);
    const targetSeconds = Math.max(0, (chunk.chunk_index - 1) * 5);

    if (manifestData?.session?.final_video_playback_url) {
      if (videoPlaybackUrl !== manifestData.session.final_video_playback_url) {
        pendingSeekTimeRef.current = targetSeconds;
        setVideoPlaybackUrl(manifestData.session.final_video_playback_url);
      } else if (videoRef.current) {
        if (videoRef.current.readyState >= 1) {
          videoRef.current.currentTime = targetSeconds;
          videoRef.current.play().catch(() => {});
        } else {
          pendingSeekTimeRef.current = targetSeconds;
        }
      }
    } else if (chunk.playback_url) {
      setVideoPlaybackUrl(chunk.playback_url);
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleSelectFinalVideo = () => {
    if (manifestData?.session?.final_video_playback_url) {
      if (videoPlaybackUrl !== manifestData.session.final_video_playback_url) {
        setVideoPlaybackUrl(manifestData.session.final_video_playback_url);
      }
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
      if (manifestData.chunks?.length > 0) {
        setSelectedChunk(manifestData.chunks[0]);
      }
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (pendingSeekTimeRef.current !== null && videoRef.current) {
      videoRef.current.currentTime = pendingSeekTimeRef.current;
      pendingSeekTimeRef.current = null;
      videoRef.current.play().catch(() => {});
    }
    if (playbackSpeed && videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  };

  const handleVideoTimeUpdate = (e) => {
    if (!manifestData?.chunks?.length) return;
    const curTime = e.target.currentTime;
    const chunkIdx = Math.floor(curTime / 5) + 1;
    setSelectedChunk((prev) => {
      if (prev?.chunk_index === chunkIdx) return prev;
      const match = manifestData.chunks.find((c) => c.chunk_index === chunkIdx);
      return match || prev;
    });
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Retention Purge Action
  const handlePurgeExpired = async () => {
    if (!window.confirm('Are you sure you want to purge media for all expired proctoring sessions (older than retention window)?\n\nMetadata records and violation logs will be preserved.')) {
      return;
    }
    setPurging(true);
    try {
      const res = await adminService.purgeProctoringMedia();
      setPurgeResult(res);
      alert(`Purge Complete: Removed ${res.purgedFilesCount || 0} media file(s) across ${res.purgedSessionsCount || 0} expired session(s).`);
      fetchSessions(currentPage);
    } catch (err) {
      alert(err.message || 'Failed to purge expired media');
    } finally {
      setPurging(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAssessment('');
    setSelectedState('all');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
    setSearchParams({});
    fetchSessions(1);
  };

  // KPI Metrics calculation
  const metrics = useMemo(() => {
    const total = pagination.total || 0;
    const inProgress = sessions.filter((s) => s.computed_state === 'recording_in_progress').length;
    const finalized = sessions.filter((s) => s.computed_state === 'finalized').length;
    const interrupted = sessions.filter((s) => s.computed_state === 'incomplete' || (s.interruption_count || 0) > 0).length;
    const totalScreenshots = sessions.reduce((acc, s) => acc + (s.screenshot_count || 0), 0);

    return { total, inProgress, finalized, interrupted, totalScreenshots };
  }, [sessions, pagination]);

  // Color-coded badge for state
  const renderStateBadge = (state) => {
    switch (state) {
      case 'recording_in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            Recording Active
          </span>
        );
      case 'upload_pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="h-3 w-3" />
            Upload Pending
          </span>
        );
      case 'finalized':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Finalized
          </span>
        );
      case 'failed_upload':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <AlertTriangle className="h-3 w-3" />
            Failed Upload
          </span>
        );
      case 'incomplete':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            <AlertCircle className="h-3 w-3" />
            Incomplete
          </span>
        );
      case 'purged':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-500/10 text-slate-500 dark:text-slate-400 border border-slate-500/20">
            <Trash2 className="h-3 w-3" />
            Purged (Retention)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            Stopped
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Proctoring & Integrity Review
            </h1>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Inspect private screen recordings, 15-minute screenshots, and examination telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchSessions(currentPage)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handlePurgeExpired}
            disabled={purging}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/40 transition"
            title="Clean up video and screenshot media files that have passed their 30-day retention date"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {purging ? 'Purging Media...' : 'Purge Expired Media'}
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Total Sessions" value={metrics.total} accent="text-slate-900 dark:text-white" />
        <StatCard label="Finalized Recordings" value={metrics.finalized} accent="text-emerald-600 dark:text-emerald-400" />
        <StatCard label="Recording Active" value={metrics.inProgress} accent="text-blue-600 dark:text-blue-400" />
        <StatCard label="Interruptions / Flags" value={metrics.interrupted} accent="text-amber-600 dark:text-amber-400" />
        <StatCard label="Screenshots Logged" value={metrics.totalScreenshots} accent="text-indigo-600 dark:text-indigo-400" />
      </div>

      {/* Filter Bar */}
      <div className="card p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-4 rounded-2xl shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name, email, attempt ID, assessment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchSessions(1)}
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Assessment Filter */}
          <select
            value={selectedAssessment}
            onChange={(e) => {
              setSelectedAssessment(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="">All Assessments</option>
            {assessments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>

          {/* Date Range: From */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">From:</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Date Range: To */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">To:</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <button
            onClick={() => fetchSessions(1)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-xl transition shadow-xs"
          >
            Apply Filters
          </button>

          {(searchQuery || selectedAssessment || selectedState !== 'all' || dateFrom || dateTo) && (
            <button
              onClick={handleResetFilters}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
            >
              Reset
            </button>
          )}
        </div>

        {/* State Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {STATE_FILTERS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedState(tab.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                selectedState === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sessions Table */}
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorState message={error} onRetry={() => fetchSessions(currentPage)} />
      ) : sessions.length === 0 ? (
        <EmptyState
          title="No Proctoring Evidence Found"
          description="No recording sessions match your selected filters. Adjust your search criteria or date range."
        />
      ) : (
        <div className="card overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3.5">Candidate</th>
                  <th className="px-4 py-3.5">Assessment & Attempt</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Timeline & Duration</th>
                  <th className="px-4 py-3.5">Recording Chunks</th>
                  <th className="px-4 py-3.5">Screenshots</th>
                  <th className="px-4 py-3.5">Interruptions</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                {sessions.map((s) => (
                  <tr
                    key={s.session_id || s.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition group"
                  >
                    {/* Candidate */}
                    <td className="px-4 py-3.5">
                      <p className="font-extrabold text-slate-900 dark:text-white">
                        {s.candidate_name || 'Anonymous Student'}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {s.candidate_email || '—'}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400">ID: {s.candidate_id}</span>
                    </td>

                    {/* Assessment & Attempt */}
                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="font-extrabold text-slate-800 dark:text-slate-200 truncate" title={s.assessment_title}>
                        {s.assessment_title || 'Assessment'}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                          Attempt #{s.attempt_id}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="text-[10px] font-semibold text-slate-500 capitalize">
                          {s.attempt_status}
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3.5 whitespace-nowrap">{renderStateBadge(s.computed_state)}</td>

                    {/* Timeline & Duration */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {formatDuration(s.duration_seconds)}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {s.started_at ? formatCompactDateTime(s.started_at) : '—'}
                      </p>
                    </td>

                    {/* Chunks */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Video className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {s.chunk_count || 0} chunk(s)
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                        {formatBytes(s.total_bytes)}
                      </p>
                      {s.failed_chunk_count > 0 && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-rose-600 dark:text-rose-400">
                          ⚠ {s.failed_chunk_count} chunk(s) failed
                        </span>
                      )}
                    </td>

                    {/* Screenshots */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {s.screenshot_count || 0} / 12
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">15-min intervals</p>
                    </td>

                    {/* Interruptions */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {s.interruption_count > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <AlertTriangle className="h-2.5 w-2.5" />
                          {s.interruption_count} event(s)
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold text-[11px]">—</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEvidenceModal(s)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-xl transition border border-indigo-200 dark:border-indigo-900/50"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Review Evidence
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{' '}
              of <span className="font-bold text-slate-900 dark:text-white">{pagination.total}</span> sessions
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={pagination.page <= 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
              </button>
              <span className="font-bold text-slate-700 dark:text-slate-300 px-2">
                {pagination.page} / {pagination.total_pages || 1}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(pagination.total_pages, p + 1))}
                disabled={pagination.page >= pagination.total_pages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Inspection Modal / Drawer */}
      {activeSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs">
          <div className="relative flex flex-col w-full max-w-6xl max-h-[92vh] bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-black text-slate-900 dark:text-white">
                      Proctoring Evidence: {activeSession.candidate_name}
                    </h2>
                    {renderStateBadge(activeSession.computed_state)}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeSession.assessment_title} · Attempt #{activeSession.attempt_id} · Session{' '}
                    <span className="font-mono text-[11px]">{activeSession.session_id}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {activeSession.assessment_id && (
                  <Link
                    to={`/admin/simulator/${activeSession.assessment_id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 hover:bg-amber-100 text-xs font-bold transition shadow-xs"
                    title="Open live test screen in student simulator to compare questions/options"
                  >
                    <Eye className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                    <span>View Test as Student</span>
                  </Link>
                )}
                <Link
                  to={`/admin/attempts/${activeSession.attempt_id}`}
                  target="_blank"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <FileText className="h-3.5 w-3.5" />
                  View Attempt Score
                </Link>
                <button
                  onClick={closeEvidenceModal}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Architecture Distinction Alert */}
            <div className="px-6 py-3 bg-amber-500/10 dark:bg-amber-500/5 border-b border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
              <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <div>
                <span className="font-extrabold">Saved Evidence Playback Notice:</span> Screen recordings and
                scheduled screenshots represent cryptographically signed, persisted examination evidence. Saved
                recordings are <strong>not</strong> a real-time live feed. (Live screen viewing requires dedicated
                WebRTC infrastructure with media servers such as Mediasoup or LiveKit).
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                  activeTab === 'video'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Video className="h-4 w-4" />
                Screen Recording Playback ({manifestData?.chunks?.length || activeSession.chunk_count || 0} Chunks)
              </button>
              <button
                onClick={() => setActiveTab('screenshots')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                  activeTab === 'screenshots'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                Scheduled Screenshots ({manifestData?.screenshots?.length || activeSession.screenshot_count || 0})
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition ${
                  activeTab === 'events'
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Clock className="h-4 w-4" />
                Interruption & Telemetry Logs ({manifestData?.events?.length || 0})
              </button>
            </div>

            {/* Modal Body with Lazy Loading & Scroll */}
            <div className="flex-1 overflow-y-auto p-6">
              {loadingManifest ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                  <p className="text-xs font-bold text-slate-500">Generating secure signed playback tokens...</p>
                </div>
              ) : (
                <>
                  {/* TAB 1: SCREEN RECORDING */}
                  {activeTab === 'video' && (
                    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                      {/* Video Player Display */}
                      <div className="space-y-4">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black border border-slate-800 flex items-center justify-center">
                          {videoPlaybackUrl ? (
                            <video
                              ref={videoRef}
                              key={videoPlaybackUrl}
                              src={videoPlaybackUrl}
                              controls
                              playsInline
                              preload="metadata"
                              onLoadedMetadata={handleVideoLoadedMetadata}
                              onTimeUpdate={handleVideoTimeUpdate}
                              className="h-full w-full object-contain"
                            >
                              Your browser does not support HTML5 video playback.
                            </video>
                          ) : (
                            <div className="text-center p-6 space-y-2 text-slate-400">
                              <Video className="h-10 w-10 mx-auto text-slate-600" />
                              <p className="text-xs font-bold">No playable video available for this session</p>
                              {activeSession.is_purged && (
                                <p className="text-[11px] text-rose-400">
                                  Media files have been purged in accordance with data retention policy.
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Player Controls Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-500">Now Playing:</span>
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {selectedChunk
                                ? `Chunk #${selectedChunk.chunk_index} (${formatBytes(selectedChunk.file_size_bytes)}) · ${formatChunkTime(selectedChunk.chunk_index)}`
                                : manifestData?.session?.final_video_playback_url
                                ? 'Continuous Video Stream'
                                : 'No Track Selected'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-500">Playback Speed:</span>
                            {[1, 1.25, 1.5, 2].map((speed) => (
                              <button
                                key={speed}
                                onClick={() => handlePlaybackSpeedChange(speed)}
                                className={`px-2 py-1 text-[11px] font-extrabold rounded-lg transition ${
                                  playbackSpeed === speed
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                                }`}
                              >
                                {speed}x
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Technical Metadata Note */}
                        <div className="card p-4 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 text-xs space-y-1">
                          <p className="font-bold text-slate-700 dark:text-slate-300">
                            Browser Format & Streaming Architecture:
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                            Continuous examination video stream is rendered with precise segment seeking. Selecting any chunk in the sequence instantly navigates the stream to that exact moment.
                          </p>
                        </div>
                      </div>

                      {/* Segmented Chunk Playlist */}
                      <div className="flex flex-col h-[520px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex items-center justify-between">
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Layers className="h-4 w-4 text-indigo-500" />
                            Segmented Chunk Sequence
                          </h3>
                          <span className="text-[10px] font-bold text-slate-400 font-mono">
                            {manifestData?.chunks?.length || 0} chunks
                          </span>
                        </div>

                        {/* Full consolidated track button if available */}
                        {manifestData?.session?.final_video_playback_url && (
                          <div className="p-2 border-b border-slate-100 dark:border-slate-800/80 bg-indigo-50/40 dark:bg-indigo-950/20">
                            <button
                              onClick={handleSelectFinalVideo}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition ${
                                !selectedChunk || selectedChunk?.chunk_index === 1
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30'
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                <Play className="h-3.5 w-3.5" />
                                Full Stream (From 00:00)
                              </span>
                              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-white/20">
                                Continuous
                              </span>
                            </button>
                          </div>
                        )}

                        {/* Chunks List with Lazy Scrolling */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                          {manifestData?.chunks?.length === 0 ? (
                            <p className="p-4 text-center text-xs text-slate-400">No recording chunks found.</p>
                          ) : (
                            manifestData?.chunks?.map((chunk) => {
                              const isSelected = selectedChunk?.chunk_index === chunk.chunk_index;
                              return (
                                <button
                                  key={chunk.chunk_index}
                                  onClick={() => handleSelectChunk(chunk)}
                                  disabled={!chunk.playback_url && !manifestData?.session?.final_video_playback_url}
                                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition ${
                                    isSelected
                                      ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50'
                                  } ${!chunk.playback_url && !manifestData?.session?.final_video_playback_url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                                        isSelected ? 'bg-white text-indigo-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                      }`}
                                    >
                                      {chunk.chunk_index}
                                    </span>
                                    <div>
                                      <p className="font-bold flex items-center gap-1.5">
                                        <span>Chunk #{chunk.chunk_index}</span>
                                        <span
                                          className={`text-[10px] font-mono px-1 rounded ${
                                            isSelected
                                              ? 'bg-indigo-700/70 text-white'
                                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                          }`}
                                        >
                                          {formatChunkTime(chunk.chunk_index)}
                                        </span>
                                      </p>
                                      <p
                                        className={`text-[10px] ${
                                          isSelected ? 'text-indigo-100' : 'text-slate-400'
                                        }`}
                                      >
                                        {formatBytes(chunk.file_size_bytes)} · {chunk.duration_ms ? `${chunk.duration_ms / 1000}s` : '5s'}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="text-right flex items-center gap-1.5">
                                    {chunk.playback_url && !chunk.is_purged && (
                                      <a
                                        href={chunk.playback_url}
                                        download={`chunk_${String(chunk.chunk_index).padStart(5, '0')}.webm`}
                                        onClick={(e) => e.stopPropagation()}
                                        title={`Download raw chunk #${chunk.chunk_index}`}
                                        className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition ${
                                          isSelected ? 'text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                        }`}
                                      >
                                        <Download className="h-3 w-3" />
                                      </a>
                                    )}
                                    {chunk.is_purged ? (
                                      <span className="text-[10px] font-bold text-rose-400">Purged</span>
                                    ) : (
                                      <Play className={`h-3.5 w-3.5 ${isSelected ? 'opacity-100 fill-current' : 'opacity-60'}`} />
                                    )}
                                  </div>
                                </button>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CHRONOLOGICAL SCREENSHOTS */}
                  {activeTab === 'screenshots' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Scheduled periodic captures. Click any screenshot to enlarge.
                        </p>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {manifestData?.screenshots?.filter((s) => s.status !== 'missed').length || 0} / 12 Captured
                        </span>
                      </div>

                      {manifestData?.screenshots?.length === 0 ? (
                        <p className="py-12 text-center text-xs font-semibold text-slate-400">
                          No screenshots scheduled or recorded for this attempt.
                        </p>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          {manifestData?.screenshots?.map((shot) => {
                            const isCaptured = shot.status !== 'missed' && shot.playback_url;
                            return (
                              <div
                                key={shot.sequence_number}
                                className={`card overflow-hidden rounded-2xl border transition ${
                                  isCaptured
                                    ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-indigo-500/50'
                                    : 'border-dashed border-rose-200 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10'
                                }`}
                              >
                                {/* Header */}
                                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 text-xs">
                                  <span className="font-extrabold text-slate-800 dark:text-slate-200">
                                    Capture #{shot.sequence_number}
                                  </span>
                                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                                    Min {shot.scheduled_minute}
                                  </span>
                                </div>

                                {/* Thumbnail Area with Lazy Loading */}
                                <div
                                  className={`relative aspect-video w-full bg-slate-900 flex items-center justify-center cursor-pointer ${
                                    !isCaptured ? 'cursor-not-allowed opacity-60' : 'group'
                                  }`}
                                  onClick={() => isCaptured && setLightboxImage(shot)}
                                >
                                  {isCaptured ? (
                                    <>
                                      <img
                                        src={shot.playback_url}
                                        alt={`Screenshot #${shot.sequence_number}`}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition group-hover:scale-105 duration-200"
                                      />
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                        <Maximize2 className="h-6 w-6 text-white" />
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-center p-4">
                                      <XCircle className="h-6 w-6 mx-auto text-rose-400 mb-1" />
                                      <p className="text-[11px] font-bold text-rose-500">Missed Capture</p>
                                    </div>
                                  )}
                                </div>

                                {/* Footer & Timing */}
                                <div className="p-3 text-[11px] space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-slate-400">Captured At:</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                                      {shot.captured_at ? formatDateTime(shot.captured_at) : '—'}
                                    </span>
                                  </div>
                                  {shot.is_delayed && (
                                    <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold">
                                      <span>Delay:</span>
                                      <span>+{shot.delay_seconds}s</span>
                                    </div>
                                  )}
                                  {shot.notes && (
                                    <p className="text-[10px] text-slate-400 italic truncate" title={shot.notes}>
                                      {shot.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: TELEMETRY & INTERRUPTION LOGS */}
                  {activeTab === 'events' && (
                    <div className="card p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] rounded-2xl">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                        Chronological Event Telemetry
                      </h3>

                      {manifestData?.events?.length === 0 ? (
                        <p className="py-8 text-center text-xs font-semibold text-slate-400">
                          No interruption or telemetry events recorded for this session.
                        </p>
                      ) : (
                        <ol className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-4">
                          {manifestData?.events?.map((ev) => {
                            const isAlert = [
                              'stream_inactive',
                              'hidden_tab',
                              'permission_revoked',
                              'stream_ended_prematurely',
                              'chunk_upload_failed',
                            ].includes(ev.event_type);

                            return (
                              <li key={ev.id} className="ml-4">
                                <div
                                  className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-[#111827] ${
                                    isAlert ? 'bg-rose-500' : 'bg-emerald-500'
                                  }`}
                                ></div>
                                <div className="card p-3 border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl">
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`text-xs font-extrabold capitalize ${
                                        isAlert ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'
                                      }`}
                                    >
                                      {ev.event_type.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-[10px] font-semibold text-slate-400">
                                      {formatDateTime(ev.occurred_at)}
                                    </span>
                                  </div>
                                  {ev.payload && (
                                    <pre className="mt-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800 overflow-x-auto">
                                      {typeof ev.payload === 'object' ? JSON.stringify(ev.payload, null, 2) : ev.payload}
                                    </pre>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ol>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal for Screenshots */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.playback_url}
              alt={`Full screenshot #${lightboxImage.sequence_number}`}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl border border-slate-800"
            />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-white border border-white/20">
                Min {lightboxImage.scheduled_minute} ({formatDateTime(lightboxImage.captured_at)})
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
