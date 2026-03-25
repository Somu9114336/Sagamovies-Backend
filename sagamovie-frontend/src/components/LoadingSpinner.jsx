function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-slate-300">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-sky-400" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default LoadingSpinner;
