import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Upload, Download, FileSpreadsheet, CheckCircle2, AlertTriangle, X, FileText, Check } from 'lucide-react';
import { Spinner } from '../../ui.jsx';
import { downloadStudentCsvTemplate } from '../../../lib/csv.js';

export default function BulkUploadModal({
  isOpen = true,
  onClose,
  onUploadSubmit,
  onSubmit,
  onDownloadTemplate,
  availableLicenses = 50,
  isDarkMode = true,
}) {
  const submitHandler = onUploadSubmit || onSubmit;
  const downloadTemplateHandler = onDownloadTemplate || downloadStudentCsvTemplate;

  const [step, setStep] = useState(1); // 1: Select File -> 2: Validate & Preview -> 3: Import Results
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsedRows, setParsedRows] = useState([]);
  const [validRows, setValidRows] = useState([]);
  const [failedRows, setFailedRows] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [importSummary, setImportSummary] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Robust CSV Parser
  const parseCSV = (text) => {
    const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
    if (lines.length <= 1) return [];

    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    };

    const headers = parseLine(lines[0]);
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const currentline = parseLine(lines[i]);
      if (currentline.some((cell) => cell.length > 0)) {
        const obj = {};
        headers.forEach((h, index) => {
          const key = h.trim();
          const lowerKey = key.toLowerCase().replace(/[^a-z0-9_]/g, '_');
          obj[key] = currentline[index] || '';
          obj[lowerKey] = currentline[index] || '';
        });
        rows.push(obj);
      }
    }
    return rows;
  };

  const processSelectedFile = (selected) => {
    if (!selected) return;

    if (!selected.name.endsWith('.csv') && !selected.name.endsWith('.txt')) {
      setError('Please select a valid .csv file.');
      return;
    }

    setFile(selected);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const rows = parseCSV(String(text));

        if (rows.length === 0) {
          setError('CSV file is empty or formatted incorrectly.');
          return;
        }

        setParsedRows(rows);

        // Pre-validate rows
        const valid = [];
        const failed = [];
        const seenEmails = new Set();

        rows.forEach((r, idx) => {
          const name = r.name || r.Name || r['Full Name'];
          const email = r.email || r.Email || r['Email Address'];
          const roll = r.roll_number || r.RollNo || r['Roll Number'];

          if (!name || !email) {
            failed.push({ rowNumber: idx + 2, data: r, reason: 'Missing Name or Email' });
          } else if (!email.includes('@')) {
            failed.push({ rowNumber: idx + 2, data: r, reason: 'Invalid email format' });
          } else if (seenEmails.has(email.toLowerCase())) {
            failed.push({ rowNumber: idx + 2, data: r, reason: 'Duplicate email in CSV' });
          } else {
            seenEmails.add(email.toLowerCase());
            valid.push({
              name: String(name).trim(),
              email: String(email).trim().toLowerCase(),
              mobile: r.mobile || r.Mobile || r.phone || r.Phone || '',
              roll_number: roll ? String(roll).trim() : '',
              batch_name: r.batch_name || r.batch || r['batch_name'] || r['batch'] || r['Batch Name'] || '',
              class: r.class || r.Class || 'Class 12',
              target_exam: r.target_exam || r.TargetExam || r['target_exam'] || 'NEET',
            });
          }
        });

        setValidRows(valid);
        setFailedRows(failed);
        setStep(2);
      } catch (err) {
        setError('Failed to parse CSV file. Please verify CSV syntax.');
      }
    };
    reader.readAsText(selected);
  };

  const handleFileChange = (e) => {
    setError('');
    const selected = e.target.files?.[0];
    if (selected) {
      processSelectedFile(selected);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError('');
    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) {
      processSelectedFile(dropped);
    }
  };

  const handleConfirmImport = async () => {
    if (validRows.length === 0) {
      setError('No valid rows to import.');
      return;
    }

    if (validRows.length > availableLicenses) {
      setError(`Licence Limit Exceeded: You have ${availableLicenses} available licences, but tried to import ${validRows.length} students.`);
      return;
    }

    setUploading(true);
    setError('');

    try {
      const res = await submitHandler(validRows);
      const summary = res?.summary || {
        total_submitted: validRows.length,
        success_count: typeof res?.inserted === 'number' ? res.inserted : validRows.length,
        failed_count: res?.failed_rows?.length || 0,
      };
      if (res?.failed_rows && res.failed_rows.length > 0) {
        setFailedRows((prev) => [...prev, ...res.failed_rows.map((f) => ({ rowNumber: f.row, data: f.data, reason: f.reason }))]);
      }
      setImportSummary(summary);
      setStep(3);
    } catch (err) {
      setError(err.message || 'Failed to complete bulk import.');
    } finally {
      setUploading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 relative my-auto ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>

        {/* Modal Header */}
        <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Bulk Student CSV Import</h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Step {step} of 3 • Available Licences: <span className="font-bold text-cyan-400">{availableLicenses} Seats</span></p>
            </div>
          </div>
          <button onClick={onClose} className={`p-1.5 rounded-xl transition ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-200 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: SELECT FILE & TEMPLATE */}
        {step === 1 && (
          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className="text-xs font-extrabold text-cyan-500 uppercase tracking-wider">CSV Upload Instructions</h4>
              <ul className={`text-xs space-y-1.5 list-disc list-inside ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>Ensure columns match standard headers: <code className={`font-mono ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700 font-bold'}`}>name, email, mobile, batch_name, roll_number, class, target_exam</code>.</li>
                <li>Email address must be unique for each student.</li>
                <li>Duplicate roll numbers in the same institution will be flagged.</li>
                <li>Downloaded template includes sample valid student rows.</li>
              </ul>

              <button
                onClick={downloadTemplateHandler}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-500 hover:text-cyan-400 hover:underline pt-1 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download Sample CSV Template</span>
              </button>
            </div>

            {/* FULLY CLICKABLE & DRAGGABLE CONTAINER AREA */}
            <label
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group relative block p-8 border-2 border-dashed rounded-3xl text-center space-y-4 transition cursor-pointer ${
                file
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : isDragging
                    ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                    : isDarkMode
                      ? 'border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 hover:bg-slate-900/80'
                      : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-slate-100'
              }`}
            >
              <input type="file" accept=".csv,.txt" onChange={handleFileChange} className="hidden" />

              <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto transition-transform group-hover:scale-110 shadow-md">
                <Upload className="h-7 w-7" />
              </div>

              <div className="space-y-1">
                <p className={`text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {file ? file.name : 'Click anywhere in this box or drop CSV file'}
                </p>
                <p className="text-xs text-slate-400 font-medium">Supports .csv or .txt files up to 5MB</p>
              </div>

              <div className="pt-1">
                <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-xs font-bold text-white shadow-md transition pointer-events-none">
                  <Upload className="h-4 w-4" />
                  <span>Browse File</span>
                </span>
              </div>
            </label>
          </div>
        )}

        {/* STEP 2: VALIDATE & PREVIEW */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Parsed Rows Preview ({parsedRows.length})</span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-extrabold">{validRows.length} Valid</span>
                {failedRows.length > 0 && <span className="text-rose-400 font-extrabold">{failedRows.length} Failed</span>}
              </div>
            </div>

            {/* Preview Table */}
            <div className={`max-h-60 overflow-y-auto rounded-2xl border ${isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-slate-50'}`}>
              <table className="w-full text-left text-xs border-collapse">
                <thead className={`sticky top-0 border-b text-[10px] font-bold uppercase ${isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
                  <tr>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">Email</th>
                    <th className="p-2.5">Mobile</th>
                    <th className="p-2.5">Roll No</th>
                    <th className="p-2.5">Batch</th>
                    <th className="p-2.5">Target</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-200 text-slate-800'}`}>
                  {validRows.slice(0, 50).map((row, i) => (
                    <tr key={i} className={isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-100'}>
                      <td className="p-2.5 font-bold">{row.name}</td>
                      <td className="p-2.5 font-mono text-cyan-400">{row.email}</td>
                      <td className="p-2.5 font-mono text-slate-400">{row.mobile || '—'}</td>
                      <td className="p-2.5 font-mono">{row.roll_number || '—'}</td>
                      <td className="p-2.5">{row.batch_name || 'General'}</td>
                      <td className="p-2.5 font-bold text-blue-400">{row.target_exam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {failedRows.length > 0 && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1 text-rose-300">
                <p className="font-bold flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5 text-rose-400" /> {failedRows.length} Row(s) Skipped Due to Formatting / Duplicate Errors:</p>
                <div className="max-h-24 overflow-y-auto space-y-1 text-[11px] font-mono">
                  {failedRows.map((f, idx) => (
                    <p key={idx}>• Row {f.rowNumber}: {f.reason} ({f.data?.email || f.data?.name || 'Unknown'})</p>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => { setStep(1); setFile(null); }}
                className={`px-4 py-2 rounded-xl border text-xs font-bold ${isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Choose Different File
              </button>

              <button
                type="button"
                disabled={uploading || validRows.length === 0}
                onClick={handleConfirmImport}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs text-white shadow-md hover:scale-105 transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
              >
                {uploading ? <Spinner className="h-4 w-4 text-white" /> : <Check className="h-4 w-4" />}
                <span>{uploading ? 'Importing Students...' : `Confirm Import (${validRows.length} Students)`}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESSFUL IMPORT SUMMARY */}
        {step === 3 && importSummary && (
          <div className="text-center space-y-5 py-4">
            <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <h4 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Bulk Import Completed!</h4>
              <p className="text-xs text-slate-400">Student accounts created & credential notifications queued.</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs max-w-md mx-auto pt-2">
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400 font-extrabold uppercase text-[10px] block">Submitted</span>
                <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{importSummary.total_submitted}</span>
              </div>
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400 font-extrabold uppercase text-[10px] block">Enrolled</span>
                <span className="text-lg font-black text-emerald-400">{importSummary.success_count}</span>
              </div>
              <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400 font-extrabold uppercase text-[10px] block">Failed</span>
                <span className="text-lg font-black text-rose-400">{importSummary.failed_count}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs text-white shadow-md hover:scale-105 transition cursor-pointer"
              >
                Return to Student Directory
              </button>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
