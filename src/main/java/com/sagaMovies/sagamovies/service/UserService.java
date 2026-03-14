package com.sagaMovies.sagamovies.service;

import com.sagaMovies.sagamovies.dto.RegisterResponseDto;
import com.sagaMovies.sagamovies.entity.User;
import com.sagaMovies.sagamovies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User RegisterUser(RegisterResponseDto request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("email already exists");
        }
        User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole("User");

        return userRepository.save(user);

    }
}
