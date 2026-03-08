package com.sagaMovies.sagamovies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieResponseDto {

    private String title;
    private String cast;
    private Double rating;
    private String language;
    private String summary;
    private Integer releaseYear;
    private String posterPath;
    private String moviePath;
}
