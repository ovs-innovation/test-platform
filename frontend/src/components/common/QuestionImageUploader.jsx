import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, ZoomIn } from 'lucide-react';
import { adminService } from '../../lib/services.js';
import { getMediaUrl } from '../../lib/media.js';

export default function QuestionImageUploader({
  value = '',
  onChange,
  label = 'Question Diagram / Image (Optional)',
  folder = 'edvedum/questions',
  className = '',
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showZoom, setShowZoom] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be under 10MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUri = reader.result;
        try {
          // Upload to server / Cloudinary CDN
          const res = await adminService.uploadImage(dataUri, folder);
          if (res?.url) {
            onChange(res.url);
          } else {
            // Fallback to data URI if upload response is empty
            onChange(dataUri);
          }
        } catch (err) {
          console.warn('[QuestionImageUploader] Upload failed, falling back to data URI:', err);
          // Fallback to local Data URI if backend is offline/error
          onChange(dataUri);
        } finally {
          setUploading(false);
        }
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Image upload failed');
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Remove Diagram
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {value ? (
        <div className="relative group rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700 max-h-36 max-w-full sm:max-w-xs bg-white dark:bg-slate-950 flex items-center justify-center p-1">
            <img
              src={getMediaUrl(value)}
              alt="Question Diagram Preview"
              className="max-h-32 object-contain rounded cursor-pointer"
              onClick={() => setShowZoom(true)}
            />
            <button
              type="button"
              onClick={() => setShowZoom(true)}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xs gap-1"
            >
              <ZoomIn className="w-4 h-4" /> Click to enlarge
            </button>
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left w-full">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
              ✓ Diagram attached successfully
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              This image will be displayed on the student CBT test page with zoom capability.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" /> : <Upload className="w-3.5 h-3.5 text-blue-600" />}
                <span>{uploading ? 'Uploading...' : 'Change Image File'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900 transition flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Upload Diagram or Figure
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Upload physics/chem diagrams, ray diagrams, or question screenshots (PNG, JPG, WEBP)
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-500 active:scale-95 disabled:opacity-50 transition shrink-0"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Image File</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">OR PASTE URL:</span>
            <input
              type="text"
              className="input py-1.5 text-xs font-mono"
              placeholder="https://example.com/diagram.png or /images/prism.png"
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-1">
          {error}
        </p>
      )}

      {/* Enlarged Modal Preview */}
      {showZoom && value && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-700 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowZoom(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 self-start">
              Question Diagram Preview
            </h4>
            <img
              src={getMediaUrl(value)}
              alt="Enlarged Diagram"
              className="max-h-[75vh] max-w-full object-contain rounded-lg border border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
}
