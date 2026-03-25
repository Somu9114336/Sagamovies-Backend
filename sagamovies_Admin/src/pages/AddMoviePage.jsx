import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import api from '../lib/axios';

function AddMoviePage() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setSubmitting(true);

    try {
      await api.post('/movie/admin/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Movie added successfully.');
      navigate('/movies');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to add movie.');
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-slate-200 bg-white/85 p-6 shadow-soft sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-600">
          Add Movie
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">Publish a new movie entry</h2>
        <p className="mt-2 text-sm text-slate-500">
          Fill in the movie details and upload the required assets using multipart form data.
        </p>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-soft sm:p-8">
        <MovieForm onSubmit={handleSubmit} submitLabel="Add Movie" submitting={submitting} />
      </section>
    </div>
  );
}

export default AddMoviePage;
