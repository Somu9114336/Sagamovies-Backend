import { useMemo } from "react";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MoviesContext";

const primaryCategories = [
  { label: "Bollywood Movies", query: "Bollywood", className: "bg-emerald-600 hover:bg-emerald-500" },
  { label: "Dual Audio Content", query: "__dual_audio__", className: "bg-red-600 hover:bg-red-500" },
  { label: "Hollywood Movies", query: "Hollywood", className: "bg-amber-500 hover:bg-amber-400" },
  { label: "Web-Series", query: "Web-Series", className: "bg-purple-500 hover:bg-purple-400" },
];

function HomePage() {
  const { applyFilterQuery, filteredMovies, isLoading, error, movies } = useMovies();

  const genres = useMemo(() => {
    const values = movies.flatMap((movie) => {
      if (Array.isArray(movie.genres) && movie.genres.length > 0) {
        return movie.genres;
      }

      if (movie.genre) {
        return movie.genre.split(",");
      }

      return [];
    });

    return [...new Set(values.map((genre) => genre.trim()).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [movies]);

  return (
    <section className="space-y-6">
      {!isLoading && !error ? (
        <div className="space-y-5 border border-white/10 bg-[#101010] px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryCategories.map((item) => (
              <button
                key={item.query}
                type="button"
                onClick={() => applyFilterQuery(item.query)}
                className={`rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition duration-200 hover:scale-105 hover:brightness-110 ${item.className}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {genres.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => applyFilterQuery(genre)}
                  className="rounded-md bg-gray-800 px-3 py-1 text-sm text-gray-200 transition hover:bg-gray-700"
                >
                  {genre}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {isLoading ? <LoadingSpinner label="Loading movie uploads..." /> : null}
      {!isLoading && error ? <ErrorState message={error} /> : null}
      {!isLoading && !error && filteredMovies.length === 0 ? (
        <EmptyState description="No movie uploads are available right now." />
      ) : null}

      {!isLoading && !error && filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default HomePage;
