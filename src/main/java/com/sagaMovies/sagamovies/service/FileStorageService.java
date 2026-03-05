package com.sagaMovies.sagamovies.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    String movie_DIR = "C:\\Downloads\\movies";
    String poster_DIR = "C:\\Downloads\\poster";

    public String uploadMovie(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Movie file is missing");
        }
        String originalfile= file.getOriginalFilename();
        String extension=" ";
        int i=originalfile.lastIndexOf('.');
        if(i>0){
            extension=originalfile.substring(i+1).toLowerCase();
        }

        if(!extension.matches("mp4|mkv|avi")){
            throw  new IllegalArgumentException("file type not supported");
        }

        String name = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(movie_DIR,name);

        Files.copy(file.getInputStream(), path);

        return path.toString();
    }

    public String uploadPoster(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Movie file is missing");
        }
        String originalfile= file.getOriginalFilename();
        String extension=" ";
        int i=originalfile.lastIndexOf('.');
        if(i>0){
            extension=originalfile.substring(i+1).toLowerCase();
        }

        if(!extension.matches("jpg|jpeg|png")){
            throw  new IllegalArgumentException("file type not supported");
        }


        String name = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(poster_DIR,name);

        Files.copy(file.getInputStream(), path);

        return path.toString();
    }
}

