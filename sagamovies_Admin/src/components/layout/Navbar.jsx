import { LogOut, Menu } from 'lucide-react';

function Navbar({ onToggleSidebar, onLogout }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur xl:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
            SagaMovies
          </p>
          <h1 className="text-lg font-semibold text-slate-900">Admin Control Center</h1>
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
}

export default Navbar;
