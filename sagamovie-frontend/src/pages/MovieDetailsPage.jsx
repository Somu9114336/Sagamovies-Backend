import { CalendarDays, Download, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import fallbackPoster from "../assets/poster-fallback.svg";
import api, { buildPosterUrl } from "../lib/api";

const getDownloadFilename = (contentDisposition, fallbackTitle) => {
  const match = contentDisposition?.match(/filename\*?=(?:UTF-8''|"?)([^";]+)/i);

  if (match?.[1]) {
    return decodeURIComponent(match[1].replace(/"/g, "").trim());
  }

  return `${fallbackTitle || "movie"}.mp4`;
};

function MovieDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie ?? null;
  const [downloadError, setDownloadError] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!location.state?.movie) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  const handleDownload = async () => {
    if (!movie?.id || isDownloading) {
      return;
    }

    setDownloadError("");
    setIsDownloading(true);

    try {
      const response = await api.get(`/movie/download/${movie.id}`, {
        responseType: "blob",
      });
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      const filename = getDownloadFilename(response.headers["content-disposition"], movie.title);

      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setDownloadError(err.response?.data?.message ?? "Unable to download this movie right now.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!movie) {
    return null;
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <div className="overflow-hidden border border-white/10 bg-[#101010]">
        <img
          src={buildPosterUrl(movie.posterPath) || fallbackPoster}
          alt={movie.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackPoster;
          }}
        />
      </div>

      <div className="border border-white/10 bg-[#101010] p-5 sm:p-6">
        <Link to="/" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400 hover:text-red-300">
          Back to catalogue
        </Link>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500">Download page</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">{movie.title}</h1>

        <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-300">
          <span className="inline-flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-2">
            <CalendarDays className="h-4 w-4 text-red-400" />
            {movie.releaseYear ?? movie.year ?? "N/A"}
          </span>
          <span className="inline-flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-2 text-amber-200">
            <Star className="h-4 w-4 fill-current" />
            {movie.rating ?? "N/A"}
          </span>
          <span className="inline-flex items-center gap-2 border border-white/10 bg-black/40 px-3 py-2">
            {movie.language ?? "Hindi / Dual Audio"}
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_220px]">
          <div className="space-y-3">
            <div className="border border-white/10 bg-black/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">Casts</p>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {movie.cast ?? "Cast information is not available for this movie yet."}
              </p>
            </div>

            <div className="border border-white/10 bg-black/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">Story line</p>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {movie.description ?? movie.summary ?? "Description is not available for this movie yet."}
              </p>
            </div>
          </div>

          <div className="border border-white/10 bg-black/40 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">Movie info</p>
            <div className="mt-3 space-y-3 text-sm text-stone-300">
              <p><span className="text-stone-500">Category:</span> {movie.category ?? "Latest Upload"}</p>
              <p><span className="text-stone-500">Genre:</span> {movie.genre ?? movie.genres?.join(", ") ?? "N/A"}</p>
              <p><span className="text-stone-500">Quality:</span> WEB-DL / 480p / 720p / 1080p</p>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-red-800/60 bg-red-950/20 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-400">Download now</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2 border border-red-700 bg-red-700 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download movie"}
            </button>
            {/* <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Single click browser download</p> */}
          </div>
        </div>

        {downloadError ? (
          <div className="mt-4 border border-rose-700/40 bg-rose-950/20 px-4 py-3 text-sm text-rose-100">
            {downloadError}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default MovieDetailsPage;
