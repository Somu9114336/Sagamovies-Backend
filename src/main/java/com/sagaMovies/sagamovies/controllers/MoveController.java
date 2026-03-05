package com.sagaMovies.sagamovies.controllers;

import com.sagaMovies.sagamovies.dto.MovieDto;
import com.sagaMovies.sagamovies.entity.Movie;
import com.sagaMovies.sagamovies.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/movie")
public class MoveController {

    @Autowired
    private MovieService movieService;

    @PostMapping("/add")
    public ResponseEntity<Movie> addMovie(@ModelAttribute MovieDto request) throws IOException {
        Movie savedMovie = movieService.addMovie(request);
        return ResponseEntity.ok(savedMovie);
    }

    @GetMapping("/get")
        public ResponseEntity<List<MovieDto>> getAllMovies(){
       return ResponseEntity.ok(movieService.getAllMovie());
    }
}
