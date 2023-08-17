package dev.chartkopf.springbackend.models;

import java.sql.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "users")
public class User {
  @Id
  private String id;
  @Field
  private String email;
  @Field
  private String password;
  @Field
  private String username;
  @Field
  private Date joinDate;
  @Field
  private Stats stats;
  @Field
  private Settings settings;


}
