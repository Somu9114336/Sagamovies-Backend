import { useState, useEffect } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import toast, { Toaster } from 'react-hot-toast';

const DeleteMovie = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [movies, searchTerm]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/movie/get');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movie) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${movie.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(movie.id);
      await api.delete(`/movie/${movie.id}`);

      toast.success('Movie deleted successfully!');
      fetchMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
      toast.error('Failed to delete movie. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-900">Delete Movie</h1>

      {/* Search Bar */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Search movies by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No movies found matching your search.' : 'No movies available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={handleDelete}
              showActions={true}
              disabled={deletingId === movie.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeleteMovie;