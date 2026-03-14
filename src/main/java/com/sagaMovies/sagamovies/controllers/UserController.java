package com.sagaMovies.sagamovies.controllers;

import com.sagaMovies.sagamovies.dto.RegisterResponseDto;
import com.sagaMovies.sagamovies.entity.User;
import com.sagaMovies.sagamovies.repository.UserRepository;
import com.sagaMovies.sagamovies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> Register(@RequestBody RegisterResponseDto request) {

        User user = userService.RegisterUser(request);
        return ResponseEntity.ok(user);
    }
}
