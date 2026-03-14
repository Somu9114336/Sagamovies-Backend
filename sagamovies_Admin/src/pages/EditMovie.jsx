import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import toast, { Toaster } from 'react-hot-toast';

const EditMovie = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    cast: '',
    rating: '',
    releaseYear: '',
    language: '',
    category: '',
    genres: []
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

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

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.title || '',
      summary: movie.summary || '',
      cast: movie.cast || '',
      rating: movie.rating || '',
      releaseYear: movie.releaseYear || '',
      language: movie.language || '',
      category: movie.category?.name || '',
      genres: movie.genres?.map(g => g.name) || []
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      genres: checked
        ? [...prev.genres, value]
        : prev.genres.filter(g => g !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMovie) {
      toast.error('Please select a movie to edit');
      return;
    }

    try {
      setUpdating(true);

      const updateData = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== (selectedMovie[key] || selectedMovie[key]?.name || '')) {
          if (key === 'genres') {
            updateData.genres = formData.genres;
          } else {
            updateData[key] = formData[key];
          }
        }
      });

      if (Object.keys(updateData).length === 0) {
        toast.info('No changes detected');
        return;
      }

      await api.patch(`/movie/${selectedMovie.id}`, updateData);

      toast.success('Movie updated successfully!');
      setSelectedMovie(null);
      fetchMovies();
      navigate('/');
    } catch (error) {
      console.error('Error updating movie:', error);
      toast.error('Failed to update movie. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <h1 className="text-3xl font-bold text-gray-900">Edit Movie</h1>

      {!selectedMovie ? (
        <div>
          <div className="max-w-md mb-6">
            <input
              type="text"
              placeholder="Search movies by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <div key={movie.id} onClick={() => handleMovieSelect(movie)} className="cursor-pointer">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setSelectedMovie(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              ← Back to Movies
            </button>
            <h2 className="text-xl font-semibold">Editing: {selectedMovie.title}</h2>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Release Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Release Year
                </label>
                <input
                  type="number"
                  name="releaseYear"
                  value={formData.releaseYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Genres */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genres
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Fantasy'].map((genre) => (
                    <label key={genre} className="flex items-center">
                      <input
                        type="checkbox"
                        value={genre}
                        checked={formData.genres.includes(genre)}
                        onChange={handleGenreChange}
                        className="mr-2"
                      />
                      {genre}
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cast */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cast
                </label>
                <textarea
                  type="text"
                  name="cast"
                  value={formData.cast}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update Movie'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditMovie;