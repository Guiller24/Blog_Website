package com.blogback.blogwebsitejava.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogback.blogwebsitejava.models.Posts;

public interface PostRepository extends JpaRepository<Posts, Integer> {
    
}
