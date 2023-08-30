import { Operation } from "../MathGeneration/ArithmeticOperation"

const generatorSettings = {
  operations: [Operation.Addition, Operation.Subtraction, Operation.Multiplication, Operation.Division],
  additionDigits: 1,
  subtractionDigits: 1,
  multiplicationDigits: 1,
  divisionDigits: 1
}

export default generatorSettings