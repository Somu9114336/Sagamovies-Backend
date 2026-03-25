import { Film, FolderKanban, PlusCircle, Star, Tags } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../lib/axios';

function formatRating(value) {
  return Number.isFinite(value) ? value.toFixed(1) : '0.0';
}

function DashboardPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const { data } = await api.get('/movie/get');
        setMovies(Array.isArray(data) ? data : data?.movies || data?.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load dashboard details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <LoadingSpinner label="Loading dashboard details..." />;
  }

  const totalMovies = movies.length;
  const uniqueCategories = new Set(
    movies.map((movie) => movie.category?.trim()).filter(Boolean)
  ).size;
  const uniqueGenres = new Set(
    movies
      .flatMap((movie) => (Array.isArray(movie.genres) ? movie.genres : []))
      .map((genre) => genre?.trim())
      .filter(Boolean)
  ).size;
  const ratedMovies = movies
    .map((movie) => Number(movie.rating))
    .filter((rating) => Number.isFinite(rating));
  const averageRating = ratedMovies.length
    ? ratedMovies.reduce((sum, rating) => sum + rating, 0) / ratedMovies.length
    : 0;
  const recentMovies = [...movies]
    .sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
    .slice(0, 5);

  const stats = [
    {
      title: 'Movies In Site',
      value: String(totalMovies),
      description: 'Total movies currently available in the admin library.',
      icon: Film
    },
    {
      title: 'Categories In Use',
      value: String(uniqueCategories),
      description: 'Distinct categories attached to the current movie list.',
      icon: FolderKanban
    },
    {
      title: 'Genres In Use',
      value: String(uniqueGenres),
      description: 'Unique genres currently present across all movies.',
      icon: Tags
    },
    {
      title: 'Average Rating',
      value: formatRating(averageRating),
      description: 'Average rating calculated from the movies already in the site.',
      icon: Star
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200 bg-white/85 p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-600">
              Dashboard
            </p>
            <h2 className="text-3xl font-semibold text-slate-950">SagaMovies site overview</h2>
            <p className="max-w-2xl text-sm text-slate-500">
              This dashboard shows what is currently inside your site based on the movies already
              stored in the backend.
            </p>
          </div>

          <Link
            to="/movies/add"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            <PlusCircle size={18} />
            Add New Movie
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-[28px] border border-slate-200 bg-white/85 p-6 shadow-soft transition hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="mt-3 text-4xl font-semibold text-slate-950">{stat.value}</h3>
                  <p className="mt-3 text-sm text-slate-500">{stat.description}</p>
                </div>
                <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
                  <Icon size={20} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-soft sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Latest Titles
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">Recently added movies</h3>
          </div>
          <Link to="/movies" className="text-sm font-semibold text-brand-600 transition hover:text-brand-700">
            View all
          </Link>
        </div>

        {recentMovies.length ? (
          <div className="mt-6 grid gap-4">
            {recentMovies.map((movie) => (
              <article
                key={movie.id}
                className="flex flex-col gap-3 rounded-3xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{movie.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {movie.category || 'Uncategorized'}
                    {' • '}
                    {Array.isArray(movie.genres) && movie.genres.length
                      ? movie.genres.join(', ')
                      : 'No genres'}
                  </p>
                </div>
                <div className="text-sm font-medium text-slate-600">
                  Rating: {movie.rating ?? 'N/A'}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">
            No movies are available yet. Add a movie to populate the dashboard.
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
