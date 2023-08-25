package com.blogback.blogwebsitejava.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.blogback.blogwebsitejava.exceptions.NotFoundException;
import com.blogback.blogwebsitejava.models.Users;
import com.blogback.blogwebsitejava.repositories.UserRepository;

import jakarta.validation.Valid;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }
    
    public Optional<Users> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public boolean isValidUser(String email, String password){
        Optional<Users> user = getUserByEmail(email);

        if(user.isPresent()){
            Users storedUser = user.get();
            if(storedUser.getPassword() != null){
                return storedUser.getPassword().equals(password);
            }
        }
        return false;
    }

    public void updateUser(Integer id, @Valid Users userDetails){
        Users updatedUser = userRepository.findById(id).orElseThrow(() -> 
            new NotFoundException("User does not Exist"));

        updatedUser.setFirstName(userDetails.getFirstName());
        updatedUser.setLastName(userDetails.getLastName());
        updatedUser.setEmail(userDetails.getEmail());
        updatedUser.setContactNum(userDetails.getContactNum());
        updatedUser.setAddress(userDetails.getAddress());
        updatedUser.setPassword(userDetails.getPassword());

        userRepository.save(updatedUser);
    }

    public void deleteUserById(Integer id){
        userRepository.deleteById(id);
    }
}
