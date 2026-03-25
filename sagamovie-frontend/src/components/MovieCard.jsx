import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import fallbackPoster from "../assets/poster-fallback.svg";
import { buildPosterUrl } from "../lib/api";

function MovieCard({ movie }) {
  const posterUrl = buildPosterUrl(movie.posterPath);
  const subtitle = `${movie.language ?? "Hindi"} ${movie.category ?? "Dual Audio"} WEB-DL 720p - 480p - 1080p`;
  const releaseLabel = movie.releaseYear ?? movie.year ?? "N/A";

  return (
    <Link
      to={`/movie/${movie.id}`}
      state={{ movie }}
      className="group relative block overflow-hidden rounded-[14px] border border-white/10 bg-black shadow-[0_14px_28px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-red-700/60 hover:shadow-[0_0_24px_rgba(185,28,28,0.22)]"
    >
      <div className="relative aspect-[10/13] overflow-hidden bg-black">
        <img
          src={posterUrl || fallbackPoster}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackPoster;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-100 backdrop-blur-sm">
          <CalendarDays className="h-3.5 w-3.5 text-red-400" />
          {releaseLabel}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-white sm:text-lg">{movie.title}</h3>
          <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-stone-200/90">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
