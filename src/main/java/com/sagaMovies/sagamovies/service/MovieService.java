package com.sagaMovies.sagamovies.service;

import com.sagaMovies.sagamovies.dto.MovieDto;
import com.sagaMovies.sagamovies.dto.MovieResponseDto;
import com.sagaMovies.sagamovies.entity.Category;
import com.sagaMovies.sagamovies.entity.Genre;
import com.sagaMovies.sagamovies.entity.Movie;
import com.sagaMovies.sagamovies.repository.CategoryRepository;
import com.sagaMovies.sagamovies.repository.GenreRepository;
import com.sagaMovies.sagamovies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private FileStorageService fileStorageService;


    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private GenreRepository genreRepository;


//1️⃣ addMovie()

    public Movie addMovie(MovieDto request) throws IOException {

        if (movieRepository.findByTitle(request.getTitle()).isPresent()) {
            throw new RuntimeException("Movie already exists");
        }

        String posterPath = fileStorageService.uploadPoster(request.getPoster());
        String moviePath = fileStorageService.uploadMovie(request.getMovie());

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
                    Category newCategory = new Category();
                    newCategory.setName(request.getCategory());
                    return categoryRepository.save(newCategory);
                });

        movie.setCategory(category);

        List<Genre> genres = request.getGenres().stream()
                .map(name -> genreRepository.findByName(name)
                        .orElseGet(() -> {
                            Genre newGenre = new Genre();
                            newGenre.setName(name);
                            return genreRepository.save(newGenre);
                        }))
                .toList();

        movie.setGenres(genres);


        return movieRepository.save(movie);
    }

    //2️⃣ getAllMovies()

    public List<MovieResponseDto> getAllMovie() {

        return movieRepository.findAll().stream()
                .map(movie -> new MovieResponseDto(
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
    //3️⃣ getMovieById()

    public MovieResponseDto getMovieById(long id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("movie not found with this id : " + id));

        return new MovieResponseDto(
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

    //4️⃣ deleteMovie()
    public String deleteMovieById(Long id) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Movie not exits"));
        movieRepository.delete(movie);
        return "deleted successfully";
    }


    public Movie updateMovie(Long id, MovieResponseDto request) {
        Movie movie = movieRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("not found"));


        if (request.getTitle() != null) movie.setTitle(request.getTitle());
        if (request.getCast() != null) movie.setCast(request.getCast());
        if (request.getLanguage() != null) movie.setLanguage(request.getLanguage());
        if (request.getRating() != null) movie.setRating(request.getRating());
        if (request.getSummary() != null) movie.setSummary(request.getSummary());
        if (request.getReleaseYear() != null) movie.setReleaseYear(request.getReleaseYear());
        if (request.getMoviePath() != null) movie.setMoviePath(request.getMoviePath());
        if (request.getPosterPath() != null) movie.setPosterPath(request.getPosterPath());


        return movieRepository.save(movie);
    }

    public MovieResponseDto searchMovieByTitle(String title) {
        Movie movie = movieRepository.findByTitle(title).orElseThrow(() -> new IllegalArgumentException("Movie not found"));
        return new MovieResponseDto(
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







