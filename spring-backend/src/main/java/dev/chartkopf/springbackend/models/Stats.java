package dev.chartkopf.springbackend.models;

import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
public class Stats {

  @Field
  private int highscore;
  @Field
  private int additionCorrect;
  @Field
  private int subtractionCorrect;
  @Field
  private int multiplicationCorrect;
  @Field
  private int divisionCorrect;
  @Field
  private int rootCorrect;
}
