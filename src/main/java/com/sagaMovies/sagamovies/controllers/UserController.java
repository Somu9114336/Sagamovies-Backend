package com.sagaMovies.sagamovies.controllers;

import com.sagaMovies.sagamovies.dto.LoginRequestDto;
import com.sagaMovies.sagamovies.dto.LoginResponseDto;
import com.sagaMovies.sagamovies.dto.RegisterResponseDto;
import com.sagaMovies.sagamovies.entity.User;
import com.sagaMovies.sagamovies.repository.UserRepository;
import com.sagaMovies.sagamovies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {


    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> Register(@RequestBody RegisterResponseDto request) {

        User user = userService.registerUser(request);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto request) {
        return userService.login(request.getEmail(), request.getPassword());
    }



}
