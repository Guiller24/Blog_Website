package com.blogback.blogwebsitejava.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blogback.blogwebsitejava.exceptions.NotFoundException;
import com.blogback.blogwebsitejava.models.Posts;
import com.blogback.blogwebsitejava.repositories.PostRepository;

import jakarta.validation.Valid;

@Service
public class PostService {
    private PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public List<Posts> getAllPosts(){
        return postRepository.findAll();
    }

    public void updatePost(Integer id, @Valid Posts postDetails){
        Posts updatedPost = postRepository.findById(id).orElseThrow(() -> 
            new NotFoundException("Post Does not Exist"));

        updatedPost.setTitle(postDetails.getTitle());
        updatedPost.setPost(postDetails.getPost());
        updatedPost.setCreatedAt(postDetails.getCreatedAt());

        postRepository.save(updatedPost);
    }

    public void deletePostById(Integer id){
        postRepository.deleteById(id);
    }
}
