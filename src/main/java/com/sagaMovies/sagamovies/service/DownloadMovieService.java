package com.sagaMovies.sagamovies.service;

import com.sagaMovies.sagamovies.entity.Movie;
import com.sagaMovies.sagamovies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class DownloadMovieService {

    @Autowired
    private MovieRepository movieRepository;

    public ResponseEntity<Resource> downloadMovie(Long id) throws IOException {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        Path path = Paths.get(movie.getMoviePath());

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found");
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + path.getFileName().toString() + "\"")
                .body(resource);
    }
}
