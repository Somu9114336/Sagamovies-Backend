package com.sagaMovies.sagamovies.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Order(1)
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (request.getRequestURI().startsWith("/movie") || request.getRequestURI().startsWith("/auth")) {
            log.info("Incoming request: method={}, uri={}, contentType={}, contentLength={}, origin={}",
                    request.getMethod(),
                    request.getRequestURI(),
                    request.getContentType(),
                    request.getContentLengthLong(),
                    request.getHeader("Origin"));
        }

        filterChain.doFilter(request, response);

        if (request.getRequestURI().startsWith("/movie") || request.getRequestURI().startsWith("/auth")) {
            log.info("Completed request: method={}, uri={}, status={}",
                    request.getMethod(),
                    request.getRequestURI(),
                    response.getStatus());
        }
    }
}
