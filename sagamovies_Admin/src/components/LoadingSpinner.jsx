function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-soft">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" />
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default LoadingSpinner;
