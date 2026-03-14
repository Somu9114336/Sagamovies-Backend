package com.sagaMovies.sagamovies.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/posters/**")
                .addResourceLocations("file:C:/Downloads/poster/");

        registry.addResourceHandler("/movies/**")
                .addResourceLocations("file:C:/Downloads/movies/");
    }
}