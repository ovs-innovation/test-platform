import React from 'react';
import { AlertTriangle, RefreshCw, LifeBuoy } from 'lucide-react';

export class ExamErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.reporter && typeof this.props.reporter.reportIncident === 'function') {
      try {
        this.props.reporter.reportIncident({
          category: 'APPLICATION_ERROR',
          questionId: this.props.currentQuestionId || null,
          description: `React render failure: ${error?.message || 'Component crash'}`,
          diagnostics: {
            componentStack: errorInfo?.componentStack ? errorInfo.componentStack.slice(0, 300) : null,
            name: error?.name,
          },
        });
      } catch (_) {}
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-6 text-center dark:border-rose-900/50 dark:bg-rose-950/20 my-4 shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400 mb-3">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Question Display Issue Detected
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            A temporary formatting or rendering issue occurred with this item. Your exam progress, timer, and saved answers remain 100% secure.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition cursor-pointer shadow-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Rendering
            </button>
            {this.props.onReportIssue && (
              <button
                type="button"
                onClick={this.props.onReportIssue}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition cursor-pointer shadow-xs"
              >
                <LifeBuoy className="h-3.5 w-3.5 text-amber-500" />
                Report to Invigilator
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ExamErrorBoundary;
