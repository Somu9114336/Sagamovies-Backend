package com.sagaMovies.sagamovies.service;

import com.sagaMovies.sagamovies.JwtUtility.JwtUtility;
import com.sagaMovies.sagamovies.dto.LoginResponseDto;
import com.sagaMovies.sagamovies.dto.RegisterResponseDto;
import com.sagaMovies.sagamovies.entity.User;
import com.sagaMovies.sagamovies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterResponseDto request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("email already exists");
        }
        User user = new User();

        user.setEmail(request.getEmail());
        String encodedPassword=passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);
        user.setPhoneNumber(request.getPhoneNumber());

            user.setRole("ROLE_ADMIN");

        return userRepository.save(user);

    }

    @Autowired
    private JwtUtility jwtUtil;

    public LoginResponseDto login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = userOpt.get();

        if (! passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new LoginResponseDto(user.getEmail(), token);
    }

}
