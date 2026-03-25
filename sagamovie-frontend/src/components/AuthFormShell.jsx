function AuthFormShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto grid max-w-6xl overflow-hidden border border-white/10 bg-[#101010] shadow-[0_22px_45px_rgba(0,0,0,0.35)] lg:grid-cols-[1fr_1.05fr]">
      <div className="border-b border-white/10 bg-[linear-gradient(180deg,_rgba(127,29,29,0.34),_rgba(10,10,10,0.96)),repeating-linear-gradient(135deg,_rgba(255,255,255,0.03)_0,_rgba(255,255,255,0.03)_2px,_transparent_2px,_transparent_10px)] p-8 sm:p-10 lg:border-b-0 lg:border-r">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-300">SagaMovies</p>
        <h1 className="mt-5 max-w-md text-4xl font-bold leading-tight text-white">{title}</h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-stone-300">{subtitle}</p>
        <div className="mt-8 space-y-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
          <div className="border border-white/10 bg-black/30 px-4 py-3">Dark catalog inspired layout</div>
          <div className="border border-white/10 bg-black/30 px-4 py-3">Fast auth flow with existing backend</div>
          <div className="border border-white/10 bg-black/30 px-4 py-3">Movie pages and direct downloads</div>
        </div>
      </div>

      <div className="p-6 sm:p-10">{children}</div>
    </div>
  );
}

export default AuthFormShell;
