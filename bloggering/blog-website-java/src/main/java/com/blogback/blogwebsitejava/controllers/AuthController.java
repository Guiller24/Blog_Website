// package com.blogback.blogwebsitejava.controllers;

// import java.util.Date;

// import javax.crypto.SecretKey;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;

// import com.blogback.blogwebsitejava.models.LoginRequest;
// import com.blogback.blogwebsitejava.repositories.UserRepository;
// import com.blogback.blogwebsitejava.services.UserService;

// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;

// @RestController
// public class AuthController {
//     private UserRepository userRepository;
//     private UserService userService;

//     public AuthController(UserRepository userRepository, UserService userService){
//         this.userRepository =userRepository;
//         this.userService = userService;
//     }
    
//     @PostMapping("/login")
//     public ResponseEntity<String> userLogin(@RequestBody LoginRequest loginRequest){
//         String email = loginRequest.getEmail();
//         String password = loginRequest.getPassword();

//             if(userService.isValidUser(email, password)){
//                 String authToken = generateAuthToken(email);
//                 return ResponseEntity.ok(authToken);
//             }else{
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
//             }
//     }

//     public String generateAuthToken(String email){
//         SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

//         long expirationTimeInMillis = 18000000; // token expiration time 5 hour

//         // Generate Token
//         String token = Jwts.builder()
//             .setSubject(email)
//             .setIssuedAt(new Date())
//             .setExpiration(new Date(System.currentTimeMillis() + expirationTimeInMillis))
//             .signWith(SignatureAlgorithm.HS256, secretKey)
//             .compact();

//         return token;
//     }
// }
