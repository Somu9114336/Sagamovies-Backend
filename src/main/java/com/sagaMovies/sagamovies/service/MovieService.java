package com.sagaMovies.sagamovies.service;

import com.sagaMovies.sagamovies.dto.MovieDto;
import com.sagaMovies.sagamovies.entity.Movie;
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

        return movieRepository.save(movie);
    }

    //2️⃣ getAllMovies()

    public List<MovieDto> getAllMovie() {

        return movieRepository.findAll().stream()
                .map(movie -> new MovieDto(
                        movie.getTitle(),
                        movie.getCast(),
                        movie.getRating(),
                        movie.getLanguage(),
                        movie.getSummary(),
                        movie.getReleaseYear(),
                        movie.getPosterPath(),
                        movie.getMoviePath()
                )).toList();
    }
    //3️⃣ getMovieById()


    //4️⃣ deleteMovie()


    //5️⃣ updateMovie()

}
