package com.sagaMovies.sagamovies.config;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MultipartConfigLogger {

    private static final Logger log = LoggerFactory.getLogger(MultipartConfigLogger.class);

    @Value("${spring.servlet.multipart.max-file-size}")
    private String maxFileSize;

    @Value("${spring.servlet.multipart.max-request-size}")
    private String maxRequestSize;

    @PostConstruct
    public void logLimits() {
        log.info("Active multipart limits: max-file-size={}, max-request-size={}", maxFileSize, maxRequestSize);
    }
}
