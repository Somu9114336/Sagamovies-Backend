import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieForm from '../components/MovieForm';
import api from '../lib/axios';

function mapMovieToForm(movie) {
  return {
    title: movie?.title || '',
    cast: Array.isArray(movie?.cast) ? movie.cast.join(', ') : movie?.cast || '',
    language: Array.isArray(movie?.language) ? movie.language.join(', ') : movie?.language || '',
    rating: movie?.rating || '',
    summary: movie?.summary || '',
    releaseYear: movie?.releaseYear || movie?.year || '',
    category: movie?.category || '',
    genres: movie?.genres || [],
    poster: movie?.poster || movie?.posterUrl || '',
    movie: movie?.movie || movie?.movieUrl || movie?.movieFile || ''
  };
}

function EditMoviePage() {
  const [movie, setMovie] = useState(() => null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedMovie = location.state?.movie;

    if (selectedMovie) {
      setMovie(selectedMovie);
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        const { data } = await api.get('/movie/get');
        const list = Array.isArray(data) ? data : data?.movies || data?.data || [];
        const matchedMovie = list.find((item) => String(item.id) === String(id));

        if (!matchedMovie) {
          throw new Error('Movie not found.');
        }

        setMovie(matchedMovie);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Unable to load movie.');
        navigate('/movies', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, location.state, navigate]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);

    try {
      await api.patch(`/movie/admin/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Movie updated successfully.');
      navigate('/movies');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update movie.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner label="Loading movie details..." />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200 bg-white/85 p-6 shadow-soft sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-600">
          Edit Movie
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">Update movie information</h2>
        <p className="mt-2 text-sm text-slate-500">
          Adjust content, metadata, and media files for this title.
        </p>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-soft sm:p-8">
        <MovieForm
          initialValues={mapMovieToForm(movie)}
          onSubmit={handleSubmit}
          submitLabel="Update Movie"
          submitting={submitting}
        />
      </section>
    </div>
  );
}

export default EditMoviePage;

