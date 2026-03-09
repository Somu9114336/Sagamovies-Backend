package com.sagaMovies.sagamovies.repository;

import com.sagaMovies.sagamovies.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category>findByName(String name);
}
