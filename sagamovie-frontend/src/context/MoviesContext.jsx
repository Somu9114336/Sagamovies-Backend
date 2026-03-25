import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const MoviesContext = createContext(null);
const DUAL_AUDIO_QUERY = "__dual_audio__";

const normalizeText = (value) => (value || "").toString().toLowerCase();

const hasMultipleLanguages = (language) => {
  const normalized = normalizeText(language);

  if (!normalized) {
    return false;
  }

  if (
    normalized.includes("dual audio") ||
    normalized.includes("multi audio") ||
    normalized.includes("hindi dubbed")
  ) {
    return true;
  }

  const parts = normalized
    .split(/,|\/|\||&| and /)
    .map((part) => part.trim())
    .filter(Boolean);

  return new Set(parts).size > 1;
};

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await api.get("/movie/get");

        if (!isMounted) {
          return;
        }

        setMovies(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err.response?.data?.message ?? "Unable to fetch movies right now.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredMovies = useMemo(() => {
    const query = normalizeText(activeQuery).trim();

    if (!query) {
      return movies;
    }

    if (query === DUAL_AUDIO_QUERY) {
      return movies.filter((movie) => hasMultipleLanguages(movie.language));
    }

    return movies.filter((movie) => {
      const genres = Array.isArray(movie.genres) ? movie.genres.join(" ") : movie.genre;
      const haystack = [
        movie.title,
        movie.summary,
        movie.description,
        movie.language,
        movie.category,
        genres,
        movie.releaseYear,
        movie.year,
      ]
        .map(normalizeText)
        .join(" ");

      return haystack.includes(query);
    });
  }, [activeQuery, movies]);

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
    setActiveQuery(value);
  };

  const applyFilterQuery = (value) => {
    setActiveQuery(value);
  };

  const clearSearch = () => {
    setSearchInput("");
    setActiveQuery("");
  };

  const value = useMemo(
    () => ({
      activeQuery,
      applyFilterQuery,
      clearSearch,
      error,
      filteredMovies,
      isLoading,
      movies,
      searchInput,
      setSearchInput: handleSearchInputChange,
    }),
    [activeQuery, error, filteredMovies, isLoading, movies, searchInput]
  );

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}

export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }

  return context;
}
