package com.sagaMovies.sagamovies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieResponseDto {

    private Long id;
    private String title;
    private String cast;
    private Double rating;
    private String language;
    private String summary;
    private String category;
    private List<String> genres;
    private Integer releaseYear;
    private String posterPath;
    private String moviePath;
}
