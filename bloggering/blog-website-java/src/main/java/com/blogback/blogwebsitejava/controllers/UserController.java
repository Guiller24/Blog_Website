package com.blogback.blogwebsitejava.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.blogback.blogwebsitejava.exceptions.NotFoundException;
import com.blogback.blogwebsitejava.models.Users;
import com.blogback.blogwebsitejava.repositories.UserRepository;
import com.blogback.blogwebsitejava.services.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "{*}" )
@RestController
@RequestMapping("api/users")
public class UserController {
    private UserService userService;
    private UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Users> getallUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("{email}")
    public Users getUserByEmail(@PathVariable String email){
        Optional<Users> user = userRepository.findByEmail(email);

        if(user.isEmpty()){
            throw new NotFoundException("404 Not Found");        
        }
        return user.get();
    }

    @GetMapping("/id/{userId}")
    public Users getUserById(@PathVariable Integer userId){
        Optional<Users> user = userRepository.findById(userId);

        if(user.isEmpty()){
            throw new NotFoundException("404 Not Found");
        }
        return user.get();
    }


    @PostMapping
    public ResponseEntity<Users> createUser(@Valid @RequestBody Users user){
        Users savedUser = userRepository.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(savedUser.getUserId())
            .toUri();

        return ResponseEntity.created(location).build();
    }
    
    @PutMapping("{userId}")
    public void updateUser(@PathVariable("userId") Integer userId, @RequestBody Users userDetails){
        userService.updateUser(userId, userDetails);
    }

    @DeleteMapping("{userId}")
    public void deleteUserById(@PathVariable Integer userId){
        userService.deleteUserById(userId);
    }
}
