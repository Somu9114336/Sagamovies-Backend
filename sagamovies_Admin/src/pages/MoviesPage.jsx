import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../lib/axios';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState('');
  const navigate = useNavigate();

  const fetchMovies = async () => {
    setLoading(true);

    try {
      const { data } = await api.get('/movie/get');
      setMovies(Array.isArray(data) ? data : data?.movies || data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to fetch movies.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this movie permanently?');

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await api.delete(`/movie/admin/${id}`);
      setMovies((prev) => prev.filter((movie) => String(movie.id) !== String(id)));
      toast.success('Movie deleted successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed.');
    } finally {
      setDeletingId('');
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading movies..." />;
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white/85 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-600">
            Movies Library
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">Manage your movie list</h2>
        </div>

        <Link
          to="/movies/add"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          <PlusCircle size={18} />
          Add Movie
        </Link>
      </section>

      <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 shadow-soft">
        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {movies.map((movie) => (
                <tr key={movie.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{movie.title}</p>
                      <p className="text-sm text-slate-500">{movie.language || 'Unknown language'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{movie.category || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                      {movie.rating || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/movies/${movie.id}/edit`, {
                            state: { movie }
                          })
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(movie.id)}
                        disabled={deletingId === movie.id}
                        className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100 disabled:opacity-70"
                      >
                        <Trash2 size={16} />
                        {deletingId === movie.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 p-4 lg:hidden">
          {movies.map((movie) => (
            <article key={movie.id} className="rounded-3xl border border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{movie.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{movie.category || 'Uncategorized'}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  {movie.rating || 'N/A'}
                </span>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/movies/${movie.id}/edit`, {
                      state: { movie }
                    })
                  }
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(movie.id)}
                  disabled={deletingId === movie.id}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600"
                >
                  <Trash2 size={16} />
                  {deletingId === movie.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MoviesPage;
