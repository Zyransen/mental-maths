package dev.chartkopf.springbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.chartkopf.springbackend.exceptions.UserNotFoundException;
import dev.chartkopf.springbackend.models.User;
import dev.chartkopf.springbackend.repositories.UserRepository;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/")
@AllArgsConstructor
public class UserController {

  @Autowired
  private UserRepository userRepository;

  // get all users
  @GetMapping("/users")
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // get user by id
  @GetMapping("/users/{id}")
  public ResponseEntity<User> getUserById(@PathVariable String id) {
    User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("No user could be found with this id: " + id));
    return ResponseEntity.ok(user);
  }
}
