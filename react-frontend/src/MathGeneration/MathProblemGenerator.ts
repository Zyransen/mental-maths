import { Operation } from "./ArithmeticOperation";
import generatorSettings from "./GeneratorSettings";

export type MathProblem = {
  firstOperand: number,
  secondOperand: number,
  operation: string,
  result: number
};

class MathProblemGenerator {
  generateProblem(): MathProblem {
    const randomOperation = this.generateOperation();
    const firstOperand = this.generateOperand(randomOperation)
    const secondOperand = this.generateOperand(randomOperation)

    return {
      firstOperand: firstOperand,
      secondOperand: secondOperand,
      operation: randomOperation.toString(),
      result: this.calculateResult(firstOperand, secondOperand, randomOperation.toString()),
    }
  }

  private generateOperation(): Operation {
    const numberOfOperations = generatorSettings.operations.length
    const operationIndex = Math.floor(Math.random() * numberOfOperations)
    return generatorSettings.operations[operationIndex]
  }

  private generateOperand(operation: Operation): number {
    const max = this.getMax(operation)
    return Math.floor(Math.random() * max)
  }

  private getMax(operation: Operation): number {
    let digits = 0

    switch (operation) {
      case Operation.Addition: {
        digits = generatorSettings.additionDigits
        break
      }
      case Operation.Subtraction: {
        digits = generatorSettings.subtractionDigits
        break
      }
      case Operation.Multiplication: {
        digits = generatorSettings.multiplicationDigits
        break
      }
      default:
        throw new Error("The specified arithmetic operation is not defined.")
    }
    return this.digitsToMax(digits)
  }

  /**
   * Returns the largest natural number with the specified amount of digits.
   * @param digits the amount of digits the returned number should have
   * @return largest number with {@link digits} digits
   */
  private digitsToMax(digits: number): number {
    return Math.pow(10, digits)
  }

  private calculateResult(firstOperand: number, secondOperand: number, operation: string): number {
    return new Function('return ' + firstOperand + operation + secondOperand)()
  }
}

export default new MathProblemGenerator()
