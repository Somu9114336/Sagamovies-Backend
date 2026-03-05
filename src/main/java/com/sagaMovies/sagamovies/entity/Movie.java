package com.sagaMovies.sagamovies.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String summary;

    @Column(length = 2000)
    private String cast;

    private double rating;
    @Column(length = 2000)
    private String language;

    private Integer releaseYear;

    private String moviePath;

    private String posterPath;


}
