import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const AddMovie = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    cast: '',
    rating: '',
    releaseYear: '',
    language: '',
    category: '',
    genres: '',
    poster: null,
    movieFile: null
  });
  const [posterPreview, setPosterPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenreChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      genres: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));

    if (name === 'poster' && file) {
      const reader = new FileReader();
      reader.onload = (e) => setPosterPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = ['title', 'summary', 'cast', 'rating', 'releaseYear', 'language', 'category'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    if (!formData.poster || !formData.movieFile) {
      toast.error('Please upload both poster and movie file');
      return;
    }

    if (!formData.genres.trim()) {
      toast.error('Please provide at least one genre');
      return;
    }

    const genreArray = formData.genres
      .split(',')
      .map((g) => g.trim())
      .filter(Boolean);

    try {
      setLoading(true);

      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'genres') {
          genreArray.forEach((genre) => submitData.append('genres', genre));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      await api.post('/movie/add', submitData);

      toast.success('Movie added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding movie:', error);
      toast.error('Failed to add movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Movie</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Release Year *
            </label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language *
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cast *
            </label>
            <textarea
              name="cast"
              value={formData.cast}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary *
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genres *
          </label>
          <input
            type="text"
            name="genres"
            value={formData.genres}
            onChange={handleGenreChange}
            placeholder="Comma-separated, e.g. Action, Drama"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">Separate genres with commas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poster Image *
            </label>
            <input
              type="file"
              name="poster"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              required
            />
            {posterPreview && (
              <img
                src={posterPreview}
                alt="Poster preview"
                className="mt-2 w-32 h-48 object-cover rounded"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Movie File *
            </label>
            <input
              type="file"
              name="movieFile"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Movie'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;