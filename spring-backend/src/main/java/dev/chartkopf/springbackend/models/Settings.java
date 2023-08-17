package dev.chartkopf.springbackend.models;

import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
public class Settings {
  @Field
  private String[] operations;
  @Field
  private int additionDigits;
  @Field
  private int subtractionDigits;
  @Field
  private int multiplicationDigits;
  @Field
  private int divisionDigits;
  @Field
  private int rootDigits;
}
