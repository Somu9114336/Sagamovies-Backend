package com.sagaMovies.sagamovies.config;

import com.sagaMovies.sagamovies.entity.User;
import com.sagaMovies.sagamovies.repository.UserRepository;
import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.tomcat.servlet.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomcatCustomizer() {
        return (factory) -> factory.addConnectorCustomizers((connector) -> {
            connector.setMaxPostSize(-1);

            if (connector.getProtocolHandler() instanceof AbstractHttp11Protocol<?> protocol) {
                protocol.setMaxSwallowSize(-1);
                protocol.setConnectionTimeout(600_000);
            }
        });
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/posters/**")
                .addResourceLocations("file:C:/Downloads/poster/");

        registry.addResourceHandler("/movies/**")
                .addResourceLocations("file:C:/Downloads/movies/");
    }

    @Configuration
    class AdminInitializer {

        @Bean
        CommandLineRunner init(UserRepository repo, PasswordEncoder encoder) {
            return (args) -> {
                if (repo.findByEmail("admin@gmail.com").isEmpty()) {
                    User admin = new User();
                    admin.setEmail("admin@gmail.com");
                    admin.setPassword(encoder.encode("admin123"));
                    admin.setRole("ADMIN");
                    repo.save(admin);
                }
            };
        }
    }
}
