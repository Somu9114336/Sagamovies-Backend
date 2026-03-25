package com.sagaMovies.sagamovies.controllers;

import com.sagaMovies.sagamovies.dto.MovieDto;
import com.sagaMovies.sagamovies.dto.MovieResponseDto;
import com.sagaMovies.sagamovies.service.DownloadMovieService;
import com.sagaMovies.sagamovies.service.MovieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174","http://localhost:5175","http://localhost:5176"})
@RestController
@RequestMapping("/movie")
public class MoveController {

    private static final Logger log = LoggerFactory.getLogger(MoveController.class);

    @Autowired
    private MovieService movieService;

    @Autowired
    private DownloadMovieService downloadMovieService;

    @PostMapping("/admin/add")
    public ResponseEntity<MovieResponseDto> addMovie(@ModelAttribute MovieDto request) throws IOException {
        int providedFileCount = 0;
        if (request.getPoster() != null && !request.getPoster().isEmpty()) {
            providedFileCount++;
        }
        if (request.getMovie() != null && !request.getMovie().isEmpty()) {
            providedFileCount++;
        }

        if (providedFileCount != 2) {
            throw new IllegalArgumentException("Exactly two files are required: one poster and one movie.");
        }

        log.info("Received addMovie request: title='{}', poster='{}', movie='{}'",
                request.getTitle(),
                request.getPoster() != null ? request.getPoster().getOriginalFilename() : null,
                request.getMovie() != null ? request.getMovie().getOriginalFilename() : null);

        try {
            MovieResponseDto savedMovie = movieService.addMovie(request);
            log.info("Movie added successfully: id={}, title='{}'", savedMovie.getId(), savedMovie.getTitle());
            return ResponseEntity.ok(savedMovie);
        } catch (Exception ex) {
            log.error("addMovie failed for title='{}'", request.getTitle(), ex);
            throw ex;
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<MovieResponseDto>> getAllMovies() {

        return ResponseEntity.ok(movieService.getAllMovie());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieResponseDto> getMovieById(@PathVariable Long id) {

        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<String> deleteByid(@PathVariable Long id) {

        String message = movieService.deleteMovieById(id);

        return ResponseEntity.ok(message);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<MovieResponseDto> updateMovie(
            @PathVariable Long id,
            @ModelAttribute MovieDto request) throws IOException {

        MovieResponseDto updatedMovie = movieService.updateMovie(id, request);

        return ResponseEntity.ok(updatedMovie);
    }

    @GetMapping("/title")
    public ResponseEntity<MovieResponseDto> geMovieByTitle(@RequestParam String title) {

        MovieResponseDto movie = movieService.searchMovieByTitle(title);

        return ResponseEntity.ok(movie);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadMovie(@PathVariable Long id) throws IOException {

        return downloadMovieService.downloadMovie(id);
    }
}

