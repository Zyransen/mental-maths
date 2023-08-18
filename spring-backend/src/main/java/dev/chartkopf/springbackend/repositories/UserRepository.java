package dev.chartkopf.springbackend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.chartkopf.springbackend.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
  
}
