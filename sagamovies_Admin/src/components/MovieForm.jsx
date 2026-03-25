import { Upload } from 'lucide-react';
import { useRef, useState } from 'react';

const MAX_TEXTAREA_LENGTH = 3000;
const MAX_LANGUAGE_LENGTH = 2000;

const initialFormState = {
  title: '',
  cast: '',
  language: '',
  rating: '',
  summary: '',
  releaseYear: '',
  category: '',
  genresText: '',
  poster: null,
  movie: null
};

function isFileLike(value) {
  return typeof File !== 'undefined' && value instanceof File;
}

function getAssetLabel(value) {
  if (!value) {
    return '';
  }

  if (isFileLike(value)) {
    return value.name;
  }

  if (typeof value === 'string') {
    const normalizedValue = value.split('?')[0];
    const segments = normalizedValue.split(/[\\/]/);
    return segments[segments.length - 1] || value;
  }

  return '';
}

function normalizeText(value) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseList(value) {
  return normalizeText(value)
    .split(/[;,\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(items) {
  return [...new Set(items.map((item) => item.toLowerCase()))].map((lowered) =>
    items.find((item) => item.toLowerCase() === lowered)
  );
}

function buildFormData(values) {
  const formData = new FormData();

  const normalizedGenres = unique(parseList(values.genresText));
  const normalizedLanguages = unique(parseList(values.language));

  const normalizedValues = {
    ...values,
    title: values.title.trim(),
    language: normalizedLanguages.join(', ').slice(0, MAX_LANGUAGE_LENGTH),
    category: values.category.trim(),
    genresText: normalizedGenres.join(', '),
    summary: normalizeText(values.summary).slice(0, MAX_TEXTAREA_LENGTH),
    cast: normalizeText(values.cast).slice(0, MAX_TEXTAREA_LENGTH)
  };

  Object.entries(normalizedValues).forEach(([key, value]) => {
    if (key === 'genresText') {
      normalizedGenres.forEach((genre) => formData.append('genres', genre));
      return;
    }

    if (key === 'poster' || key === 'movie') {
      if (!isFileLike(value)) {
        return;
      }
    }

    if (value !== '' && value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  return formData;
}

function MovieForm({ initialValues, onSubmit, submitLabel, submitting }) {
  const posterInputRef = useRef(null);
  const movieInputRef = useRef(null);
  const existingPosterLabel = getAssetLabel(initialValues?.poster);
  const existingMovieLabel = getAssetLabel(initialValues?.movie || initialValues?.movieFile);
  const [formValues, setFormValues] = useState({
    ...initialFormState,
    ...initialValues,
    genresText: Array.isArray(initialValues?.genres)
      ? initialValues.genres.join(', ')
      : initialValues?.genresText || '',
    language: Array.isArray(initialValues?.language)
      ? initialValues.language.join(', ')
      : initialValues?.language || '',
    movie: initialValues?.movie || initialValues?.movieFile || null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: files?.[0] || null }));
  };

  const resetFileInputs = () => {
    setFormValues((prev) => ({ ...prev, poster: null, movie: null }));

    if (posterInputRef.current) {
      posterInputRef.current.value = '';
    }

    if (movieInputRef.current) {
      movieInputRef.current.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await onSubmit(buildFormData(formValues));
    } catch {
      resetFileInputs();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Field label="Title">
          <Input name="title" value={formValues.title} onChange={handleChange} required />
        </Field>
        <Field label="Genres">
          <Input
            name="genresText"
            value={formValues.genresText}
            onChange={handleChange}
            placeholder="Action, Drama, Thriller"
            required
          />
        </Field>
        <Field label="Language">
          <Input
            name="language"
            value={formValues.language}
            onChange={handleChange}
            placeholder="English, Hindi, Telugu"
            required
          />
        </Field>
        <Field label="Rating">
          <Input
            name="rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formValues.rating}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Release Year">
          <Input
            name="releaseYear"
            type="number"
            min="1900"
            max="2099"
            value={formValues.releaseYear}
            onChange={handleChange}
            required
          />
        </Field>
        <Field label="Category">
          <Input
            name="category"
            value={formValues.category}
            onChange={handleChange}
            placeholder="Hollywood, Bollywood, Telugu"
            required
          />
        </Field>
      </div>

      <Field label="Summary">
        <textarea
          name="summary"
          value={formValues.summary}
          onChange={handleChange}
          rows="5"
          maxLength={MAX_TEXTAREA_LENGTH}
          required
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
        <p className="text-xs text-slate-500">{formValues.summary.length}/{MAX_TEXTAREA_LENGTH}</p>
      </Field>

      <Field label="Cast">
        <textarea
          name="cast"
          value={formValues.cast}
          onChange={handleChange}
          rows="5"
          maxLength={MAX_TEXTAREA_LENGTH}
          required
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
        <p className="text-xs text-slate-500">{formValues.cast.length}/{MAX_TEXTAREA_LENGTH}</p>
      </Field>

      <div className="grid gap-6 lg:grid-cols-2">
        <FileField
          label="Poster Upload"
          name="poster"
          accept="image/*"
          file={formValues.poster || existingPosterLabel}
          onChange={handleFileChange}
          inputRef={posterInputRef}
        />
        <FileField
          label="Movie File Upload"
          name="movie"
          accept="video/*"
          file={formValues.movie || existingMovieLabel}
          onChange={handleFileChange}
          inputRef={movieInputRef}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-w-40 items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Submitting...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
    />
  );
}

function FileField({ label, name, accept, file, onChange, inputRef }) {
  const fileLabel = getAssetLabel(file);

  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-brand-400 hover:bg-brand-50/60">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <Upload size={18} />
          </div>
          <div>
            <p className="text-sm font-medium">{fileLabel || 'Choose a file'}</p>
            <p className="text-xs text-slate-500">Accepted: {accept}</p>
          </div>
        </div>
        <input
          ref={inputRef}
          name={name}
          type="file"
          accept={accept}
          onChange={onChange}
          className="mt-4 block w-full text-sm text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:font-medium file:text-white hover:file:bg-brand-600"
        />
      </div>
    </label>
  );
}

export default MovieForm;

