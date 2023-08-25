package com.blogback.blogwebsitejava.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.blogback.blogwebsitejava.exceptions.NotFoundException;
import com.blogback.blogwebsitejava.models.Posts;
import com.blogback.blogwebsitejava.repositories.PostRepository;
import com.blogback.blogwebsitejava.services.PostService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "{*}")
@RestController
@RequestMapping("api/posts")
public class PostController {
    private PostService postService;
    private PostRepository postRepository;

    public PostController(PostService postService, PostRepository postRepository){
        this.postService = postService;
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<Posts> getAllPosts(){
        return postService.getAllPosts();
    }

    @GetMapping("{postId}")
    public Posts getPostById(@PathVariable Integer postId){
        Optional<Posts> post = postRepository.findById(postId);

        if(post.isEmpty()){
            throw new NotFoundException("404 Not Found");
        }

        return post.get();
    }

    @PostMapping
    public ResponseEntity<Posts> createPost(@Valid @RequestBody Posts post){
        Posts savedPost = postRepository.save(post);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedPost.getPostId()).toUri();

        return ResponseEntity.created(location).build();

    }
}
