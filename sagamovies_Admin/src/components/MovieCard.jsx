const MovieCard = ({ movie, onEdit, onDelete, showActions = false, disabled = false }) => {

  const posterUrl = movie.posterPath
    ? `http://localhost:8080/${movie.posterPath}`
    : null;

  const fallbackPoster =
    "https://dummyimage.com/320x180/cccccc/000000&text=No+Poster";

  console.log("Movie:", movie.title, "Poster URL:", posterUrl);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 w-full max-w-[210px] flex flex-col overflow-hidden">

      {/* Poster */}
      <img
        src={posterUrl || fallbackPoster}
        alt={movie.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackPoster;
        }}
        className="w-full h-64 object-cover"
      />

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 justify-between">

        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {movie.title}
          </h3>

          <p className="text-xs text-gray-600">
            <span className="font-medium">Year:</span>{" "}
            {movie.releaseYear || "N/A"}
          </p>
        </div>

        {showActions && (
          <div className="mt-3 flex gap-2">

            {onEdit && (
              <button
                onClick={() => onEdit(movie)}
                disabled={disabled}
                className="flex-1 bg-blue-500 text-white py-1.5 rounded-md hover:bg-blue-600 transition disabled:opacity-50 text-xs"
              >
                Edit
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(movie)}
                disabled={disabled}
                className="flex-1 bg-red-500 text-white py-1.5 rounded-md hover:bg-red-600 transition disabled:opacity-50 text-xs"
              >
                Delete
              </button>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default MovieCard;