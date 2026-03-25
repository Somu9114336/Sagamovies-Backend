import { Film, LogOut, Search, UserCircle2, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovies } from "../context/MoviesContext";

const navLinkClass = ({ isActive }) =>
  `rounded-sm border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${
    isActive
      ? "border-red-700 bg-red-700 text-white"
      : "border-white/10 bg-white/5 text-stone-300 hover:border-red-700/60 hover:text-white"
  }`;

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { clearSearch, searchInput, setSearchInput } = useMovies();

  const handleLogout = () => {
    logout();
    clearSearch();
    navigate("/");
  };

  const handleHomeClick = () => {
    clearSearch();
  };

  return (
    <header className="border-b border-white/10 bg-[#090909] shadow-[0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-3 px-3 py-4 sm:px-4 lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" onClick={handleHomeClick} className="flex items-center gap-3 text-white">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-red-800 bg-red-700/90 text-white shadow-[0_0_18px_rgba(185,28,28,0.22)]">
                <Film className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold uppercase tracking-[0.18em] text-white">SagaMovies</p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">
                  Fast movie catalogue and downloads
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[620px] lg:flex-row lg:items-center lg:justify-end">
            <div className="flex items-center gap-2 border border-white/10 bg-[#121212] px-3 py-2 lg:w-[360px]">
              <Search className="h-4 w-4 shrink-0 text-red-500" />
              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search titles, genres, language"
                className="w-full bg-transparent text-sm text-stone-200 outline-none placeholder:text-stone-500"
              />
              {searchInput ? (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-stone-500 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <NavLink to="/" onClick={handleHomeClick} className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-200">
                    <UserCircle2 className="h-4 w-4 text-red-400" />
                    <span>{user?.name ?? user?.email ?? "User"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 border border-red-700 bg-red-700/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-300 hover:border-red-700/60 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-sm border border-red-700 bg-red-700 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-red-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
