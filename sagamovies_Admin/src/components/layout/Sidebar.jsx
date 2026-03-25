import { Clapperboard, Film, LayoutDashboard, PlusCircle, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Movies', to: '/movies', icon: Film },
  { label: 'Add Movie', to: '/movies/add', icon: PlusCircle }
];

function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/45 transition lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-slate-200 bg-slate-950 text-slate-100 transition duration-300 lg:static lg:w-72 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/20 text-brand-300">
              <Clapperboard size={24} />
            </div>
            <div>
              <p className="text-lg font-semibold">SagaMovies</p>
              <p className="text-sm text-slate-400">Admin Panel</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-soft'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 px-6 py-5 text-sm text-slate-400">
          Manage titles, uploads, and updates from one responsive workspace.
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
