package com.sagaMovies.sagamovies.controllers;

import com.sagaMovies.sagamovies.dto.MovieDto;
import com.sagaMovies.sagamovies.dto.MovieResponseDto;
import com.sagaMovies.sagamovies.entity.Movie;
import com.sagaMovies.sagamovies.service.DownloadMovieService;
import com.sagaMovies.sagamovies.service.MovieService;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/movie")
public class MoveController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private DownloadMovieService downloadMovieService;

    @PostMapping("/add")
    public ResponseEntity<Movie> addMovie(@ModelAttribute MovieDto request) throws IOException {
        Movie savedMovie = movieService.addMovie(request);
        return ResponseEntity.ok(savedMovie);
    }

    @GetMapping("/get")
        public ResponseEntity<List<MovieResponseDto>> getAllMovies(){
       return ResponseEntity.ok(movieService.getAllMovie());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieResponseDto>getMovieById(@PathVariable  Long id){
        return  ResponseEntity.ok(movieService.getMovieById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteByid(@PathVariable Long id){
        String message= movieService.deleteMovieById(id);

        return  ResponseEntity.ok(message);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(
            @PathVariable Long id,
            @RequestBody MovieResponseDto request) throws IOException {

        Movie updatedMovie = movieService.updateMovie(id, request);
        return ResponseEntity.ok(updatedMovie);
    }

    @GetMapping("/title")
    public ResponseEntity<MovieResponseDto>geMovieByTitle(@RequestParam String title){
        MovieResponseDto movie = movieService.searchMovieByTitle(title);
        return ResponseEntity.ok(movie);


    }
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadMovie(@PathVariable Long id) throws IOException {
        return downloadMovieService.downloadMovie(id);
    }

}
