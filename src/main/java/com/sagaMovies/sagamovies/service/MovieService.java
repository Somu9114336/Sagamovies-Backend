package com.sagaMovies.sagamovies.service;

import com.sagaMovies.sagamovies.dto.MovieDto;
import com.sagaMovies.sagamovies.dto.MovieResponseDto;
import com.sagaMovies.sagamovies.entity.Category;
import com.sagaMovies.sagamovies.entity.Genre;
import com.sagaMovies.sagamovies.entity.Movie;
import com.sagaMovies.sagamovies.repository.CategoryRepository;
import com.sagaMovies.sagamovies.repository.GenreRepository;
import com.sagaMovies.sagamovies.repository.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MovieService {

    private static final Logger log = LoggerFactory.getLogger(MovieService.class);

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private GenreRepository genreRepository;


    public MovieResponseDto addMovie(MovieDto request) throws IOException {
        log.info("addMovie start: title='{}', rating={}, releaseYear={}, category='{}'",
                request.getTitle(), request.getRating(), request.getReleaseYear(), request.getCategory());

        if (movieRepository.findByTitle(request.getTitle()).isPresent()) {
            log.warn("addMovie rejected because title already exists: '{}'", request.getTitle());
            throw new RuntimeException("Movie already exists");
        }

        log.info("Uploading poster for title='{}'", request.getTitle());
        String posterPath = fileStorageService.uploadPoster(request.getPoster());
        log.info("Poster uploaded for title='{}' to {}", request.getTitle(), posterPath);

        log.info("Uploading movie file for title='{}'", request.getTitle());
        String moviePath = fileStorageService.uploadMovie(request.getMovie());
        log.info("Movie uploaded for title='{}' to {}", request.getTitle(), moviePath);

        Movie movie = new Movie();

        movie.setTitle(request.getTitle());
        movie.setCast(request.getCast());
        movie.setLanguage(request.getLanguage());
        movie.setRating(request.getRating());
        movie.setSummary(request.getSummary());
        movie.setReleaseYear(request.getReleaseYear());
        movie.setMoviePath(moviePath);
        movie.setPosterPath(posterPath);

        Category category = categoryRepository
                .findByName(request.getCategory())
                .orElseGet(() -> {
                    log.info("Creating new category '{}'", request.getCategory());
                    Category newCategory = new Category();
                    newCategory.setName(request.getCategory());
                    return categoryRepository.save(newCategory);
                });

        movie.setCategory(category);

        List<Genre> genres = request.getGenres().stream()
                .map(name -> genreRepository.findByName(name)
                        .orElseGet(() -> {
                            log.info("Creating new genre '{}'", name);
                            Genre newGenre = new Genre();
                            newGenre.setName(name);
                            return genreRepository.save(newGenre);
                        }))
                .toList();

        movie.setGenres(genres);

        Movie savedMovie = movieRepository.save(movie);
        log.info("Movie entity saved: id={}, title='{}'", savedMovie.getId(), savedMovie.getTitle());

        return new MovieResponseDto(
                savedMovie.getId(),
                savedMovie.getTitle(),
                savedMovie.getCast(),
                savedMovie.getRating(),
                savedMovie.getLanguage(),
                savedMovie.getSummary(),
                savedMovie.getCategory().getName(),
                savedMovie.getGenres().stream()
                        .map(Genre::getName)
                        .toList(),
                savedMovie.getReleaseYear(),
                savedMovie.getPosterPath(),
                savedMovie.getMoviePath()
        );
    }


    public List<MovieResponseDto> getAllMovie() {

        return movieRepository.findAll().stream()
                .map(movie -> new MovieResponseDto(
                        movie.getId(),
                        movie.getTitle(),
                        movie.getCast(),
                        movie.getRating(),
                        movie.getLanguage(),
                        movie.getSummary(),
                        movie.getCategory().getName(),
                        movie.getGenres().stream()
                                .map(Genre::getName)
                                .toList(),
                        movie.getReleaseYear(),
                        movie.getPosterPath(),
                        movie.getMoviePath()
                )).toList();
    }


    public MovieResponseDto getMovieById(long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("movie not found with this id : " + id));

        return new MovieResponseDto(
                movie.getId(),
                movie.getTitle(),
                movie.getCast(),
                movie.getRating(),
                movie.getLanguage(),
                movie.getSummary(),
                movie.getCategory().getName(),
                movie.getGenres().stream()
                        .map(Genre::getName)
                        .toList(),
                movie.getReleaseYear(),
                movie.getPosterPath(),
                movie.getMoviePath()
        );
    }


    public String deleteMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Movie not exits"));
        movieRepository.delete(movie);
        return "deleted successfully";
    }


    public MovieResponseDto updateMovie(Long id, MovieDto request) throws IOException {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found"));

        if (request.getTitle() != null) movie.setTitle(request.getTitle());
        if (request.getCast() != null) movie.setCast(request.getCast());
        if (request.getLanguage() != null) movie.setLanguage(request.getLanguage());
        if (request.getRating() != null) movie.setRating(request.getRating());
        if (request.getSummary() != null) movie.setSummary(request.getSummary());
        if (request.getReleaseYear() != null) movie.setReleaseYear(request.getReleaseYear());

        if (request.getCategory() != null && !request.getCategory().isBlank()) {
            Category category = categoryRepository
                    .findByName(request.getCategory())
                    .orElseGet(() -> {
                        log.info("Creating new category '{}' during update", request.getCategory());
                        Category newCategory = new Category();
                        newCategory.setName(request.getCategory());
                        return categoryRepository.save(newCategory);
                    });

            movie.setCategory(category);
        }

        if (request.getGenres() != null && !request.getGenres().isEmpty()) {
            List<Genre> genres = request.getGenres().stream()
                    .map(String::trim)
                    .filter(name -> !name.isBlank())
                    .distinct()
                    .map(name -> genreRepository.findByName(name)
                            .orElseGet(() -> {
                                log.info("Creating new genre '{}' during update", name);
                                Genre newGenre = new Genre();
                                newGenre.setName(name);
                                return genreRepository.save(newGenre);
                            }))
                    .toList();

            movie.setGenres(genres);
        }

        if (request.getPoster() != null && !request.getPoster().isEmpty()) {
            movie.setPosterPath(fileStorageService.uploadPoster(request.getPoster()));
        }

        if (request.getMovie() != null && !request.getMovie().isEmpty()) {
            movie.setMoviePath(fileStorageService.uploadMovie(request.getMovie()));
        }

        Movie updatedMovie = movieRepository.save(movie);

        return new MovieResponseDto(
                updatedMovie.getId(),
                updatedMovie.getTitle(),
                updatedMovie.getCast(),
                updatedMovie.getRating(),
                updatedMovie.getLanguage(),
                updatedMovie.getSummary(),
                updatedMovie.getCategory().getName(),
                updatedMovie.getGenres().stream()
                        .map(Genre::getName)
                        .toList(),
                updatedMovie.getReleaseYear(),
                updatedMovie.getPosterPath(),
                updatedMovie.getMoviePath()
        );
    }


    public MovieResponseDto searchMovieByTitle(String title) {

        Movie movie = movieRepository.findByTitle(title)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));

        return new MovieResponseDto(
                movie.getId(),
                movie.getTitle(),
                movie.getCast(),
                movie.getRating(),
                movie.getLanguage(),
                movie.getSummary(),
                movie.getCategory().getName(),
                movie.getGenres().stream()
                        .map(Genre::getName)
                        .toList(),
                movie.getReleaseYear(),
                movie.getPosterPath(),
                movie.getMoviePath()
        );
    }
}

