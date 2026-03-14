package com.sagaMovies.sagamovies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponseDto {

    private Long id;
    private String email;
    private String password;
    private String phoneNumber;
}
