import { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Users,
  Layers,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { downloadCsv } from '../../../lib/csv.js';

export default function AttendanceTab({
  students = [],
  batches = [],
  availableTests = [],
  isDarkMode = true,
}) {
  const safeStudents = Array.isArray(students) ? students : [];
  const safeBatches = Array.isArray(batches) ? batches : [];
  const safeTests = Array.isArray(availableTests) ? availableTests : [];

  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample or API attendance records
  const participationData = useMemo(() => {
    const defaultRecords = [
      { id: 1, name: 'Aarav Sharma', rollNo: 'APX-2026-01', batch: 'JEE Main & Advanced 2027', testName: 'AIETS Mock Test #04', status: 'Completed', score: '685/720', attemptedAt: '02 Aug 2026, 10:15 AM', timeTaken: '168 mins' },
      { id: 2, name: 'Ananya Verma', rollNo: 'APX-2026-02', batch: 'NEET UG Super 30', testName: 'AIETS Mock Test #04', status: 'Completed', score: '672/720', attemptedAt: '02 Aug 2026, 09:40 AM', timeTaken: '174 mins' },
      { id: 3, name: 'Rohan Gupta', rollNo: 'APX-2026-03', batch: 'JEE Main & Advanced 2027', testName: 'AIETS Mock Test #04', status: 'Missed', score: '—', attemptedAt: '—', timeTaken: '—' },
      { id: 4, name: 'Priya Iyer', rollNo: 'APX-2026-04', batch: 'NEET UG Super 30', testName: 'AIETS Mock Test #04', status: 'Completed', score: '640/720', attemptedAt: '02 Aug 2026, 11:10 AM', timeTaken: '172 mins' },
      { id: 5, name: 'Siddharth Nair', rollNo: 'APX-2026-05', batch: 'Class 10 Foundation', testName: 'AIETS Foundation #01', status: 'Pending', score: '—', attemptedAt: 'Scheduled', timeTaken: '—' },
    ];

    return defaultRecords.filter((st) => {
      const matchesSearch =
        (st.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (st.rollNo || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBatch = selectedBatch === 'All' || st.batch === selectedBatch;
      const matchesStatus = selectedStatus === 'All' || st.status === selectedStatus;
      return matchesSearch && matchesBatch && matchesStatus;
    });
  }, [searchQuery, selectedBatch, selectedStatus]);

  const handleExportCSV = () => {
    const csvData = participationData.map((row) => ({
      'Student Name': row.name,
      'Roll Number': row.rollNo,
      'Batch': row.batch,
      'Test Name': row.testName,
      'Status': row.status,
      'Score': row.score,
      'Attempt Date': row.attemptedAt,
      'Time Spent': row.timeTaken,
    }));
    downloadCsv(csvData, 'institution_test_attendance.csv');
  };

  const completedCount = participationData.filter((r) => r.status === 'Completed').length;
  const missedCount = participationData.filter((r) => r.status === 'Missed').length;
  const pendingCount = participationData.filter((r) => r.status === 'Pending').length;
  const totalCount = participationData.length || 1;
  const attendanceRate = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* HEADER STRIP */}
      <div className={`p-6 rounded-3xl border ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Test Participation Audit</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Test Attendance & Student Participation</h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Monitor student test presence, completion rates, missed examinations, and attempt timestamps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-xs font-bold text-white shadow-md hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Export Attendance CSV</span>
            </button>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-800/40">
          <div className={`p-3 rounded-2xl border text-center ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Attendance Rate</span>
            <span className="text-lg font-black text-emerald-400">{attendanceRate}%</span>
          </div>

          <div className={`p-3 rounded-2xl border text-center ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
            <span className="text-lg font-black text-cyan-400">{completedCount}</span>
          </div>

          <div className={`p-3 rounded-2xl border text-center ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Missed / Absent</span>
            <span className="text-lg font-black text-rose-400">{missedCount}</span>
          </div>

          <div className={`p-3 rounded-2xl border text-center ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming / Scheduled</span>
            <span className="text-lg font-black text-amber-400">{pendingCount}</span>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border transition ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={`px-3 py-2 text-xs rounded-xl border transition ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* ATTENDANCE TABLE */}
      <div className={`rounded-3xl border overflow-hidden ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <tr>
                <th className="py-3.5 px-4 font-bold">Student Name</th>
                <th className="py-3.5 px-4 font-bold">Roll Number</th>
                <th className="py-3.5 px-4 font-bold">Batch</th>
                <th className="py-3.5 px-4 font-bold">Assigned Test</th>
                <th className="py-3.5 px-4 font-bold">Participation Status</th>
                <th className="py-3.5 px-4 font-bold">Score</th>
                <th className="py-3.5 px-4 font-bold">Attempt Timestamp</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
              {participationData.map((row) => (
                <tr key={row.id} className="hover:bg-blue-500/5 transition">
                  <td className="py-3.5 px-4 font-bold">{row.name}</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400 font-semibold">{row.rollNo}</td>
                  <td className="py-3.5 px-4 text-slate-400">{row.batch}</td>
                  <td className="py-3.5 px-4 font-semibold">{row.testName}</td>
                  <td className="py-3.5 px-4">
                    {row.status === 'Completed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Completed</span>
                      </span>
                    )}
                    {row.status === 'Missed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <XCircle className="h-3 w-3" />
                        <span>Missed</span>
                      </span>
                    )}
                    {row.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock className="h-3 w-3" />
                        <span>Scheduled</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-cyan-400">{row.score}</td>
                  <td className="py-3.5 px-4 text-slate-400">{row.attemptedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
