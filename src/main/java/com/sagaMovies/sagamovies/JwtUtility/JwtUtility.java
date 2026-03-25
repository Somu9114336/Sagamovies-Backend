package com.sagaMovies.sagamovies.JwtUtility;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtUtility {

    // Must be at least 256 bits (32 chars)
    private static final String SECRET = "mysecretmysecretmysecretmysecret";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());


    public String generateToken(String username,String role) {

        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(3600); // 1 hour

        return Jwts.builder()
                .subject(username)
                .claim("role",role)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(key)
                .compact();
    }

    public String extractRole(String token){
        return extractAllClaims(token).get("role",String.class);
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    public boolean isTokenValid(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }
}