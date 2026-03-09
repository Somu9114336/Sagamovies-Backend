package com.sagaMovies.sagamovies.dto;

import com.sagaMovies.sagamovies.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {

    private String title;

    private String summary;

    private String cast;

    private Double rating;

    private Integer releaseYear;

    private String language;

    private String category;

    private List<String> genres;

    private MultipartFile poster;

    private MultipartFile movie;




//    public MovieDto() {}

//    public MovieDto(String title, String cast, double rating, String language, String summary, Integer releaseYear, String posterPath, String moviePath) {
//        this.title = title;
//        this.cast=cast;
//        this.summary=summary;
//        this.rating=rating;
//        this.releaseYear=releaseYear;
//        this.language=language;
//        this.poster = poster;
//        this.movie = movie;
//
//    }
}
