package com.ss_be.ss_be.controllers;

import com.ss_be.ss_be.models.User;
import com.ss_be.ss_be.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserRepository userRespository;

    @GetMapping("/user/{email}")
    ResponseEntity<User> getUser(
            @PathVariable String email
    ) {
        List<User> usersFound = userRespository.findUserByEmail(email);
        if (!usersFound.isEmpty()) {
            return ResponseEntity.ok(usersFound.get(0));
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @PostMapping("/user")
    ResponseEntity<User> postUser(
            @RequestBody User user
    ) {
        User userCreated = userRespository.save(new User(user.getFirstName(), user.getLastName(), user.getEmail()));
        return ResponseEntity.ok(userCreated);
    }
}
