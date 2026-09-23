import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Tactical Error Boundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-[#121624] border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                ESTADO: INCIDENCIA TÁCTICA
              </span>
              <h2 className="text-xl sm:text-2xl font-rajdhani font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Interrupción en el Módulo
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-inter leading-relaxed">
                Se detectó una excepción en la carga de la vista. Puedes reintentar la conexión o volver a la central de evaluación.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-gray-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 text-left overflow-x-auto">
                <code>{this.state.error.message}</code>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neon-cyan text-night-deep font-rajdhani font-black text-xs uppercase tracking-wider shadow-cyan-glow hover:bg-cyan-300 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reintentar Carga</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#141518] hover:border-neon-cyan text-slate-700 dark:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Centro Principal</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
