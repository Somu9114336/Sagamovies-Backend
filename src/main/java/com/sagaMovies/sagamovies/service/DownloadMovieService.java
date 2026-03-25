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

    private static final Path DOWNLOAD_ROOT = Paths.get("C:\\Downloads");

    @Autowired
    private MovieRepository movieRepository;

    public ResponseEntity<Resource> downloadMovie(Long id) throws IOException {

        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        Path storedPath = Paths.get(movie.getMoviePath());
        Path resolvedPath = storedPath.isAbsolute()
                ? storedPath
                : DOWNLOAD_ROOT.resolve(storedPath).normalize();

        Resource resource = new UrlResource(resolvedPath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("File not found");
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resolvedPath.getFileName() + "\""
                )
                .body(resource);
    }
}
