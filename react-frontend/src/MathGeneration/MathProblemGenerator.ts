import { Operation } from "./ArithmeticOperation";
import generatorSettings from "../Settings/GeneratorSettings";

export type MathProblem = {
  firstOperand: number,
  secondOperand: number,
  operation: string,
  result: number
}

class MathProblemGenerator {
  /**
   * Randomly generates an object of type MathProblem, consisting of two operands, an operation, aswell as the result of the generated arithmetic problem
   * @returns a newly generated MathProblem
   */
  generateProblem(): MathProblem {
    const randomOperation = this.generateOperation();
    let firstOperand = this.generateOperand(randomOperation)
    let secondOperand = this.generateOperand(randomOperation)

    while(!this.checkOperandValidity(firstOperand, secondOperand, randomOperation)) {
      firstOperand = this.generateOperand(randomOperation)
      secondOperand = this.generateOperand(randomOperation)
    }

    // avoid negative results from substractions
    if(firstOperand < secondOperand) {
      const temp = firstOperand
      firstOperand = secondOperand
      secondOperand = temp
    }

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

  /**
   * Checks if a generated operand is valid for use in a math problem.
   * @param firstOperand the first operand to be checked
   * @param secondOperand the second operand to be checked
   * @param operation the operation used in the generated math problem
   * @returns an object of type Operands, containing either the operands passed to the function as parameters, if both of them were valid, or newly generated and optimised operands
   */
  private checkOperandValidity(firstOperand: number, secondOperand: number, operation: Operation): boolean {
    // 0 as an operand is trivial (no matter the operation)
    if(firstOperand === 0 || secondOperand === 0) {
      return false
    }
    
    // multiplication with 1 is trivial
    if(operation === Operation.Multiplication && (firstOperand === 1 || secondOperand === 1)) {
      return false
    }

    // avoid 0 as a result from subtractions
    if(operation === Operation.Subtraction && firstOperand === secondOperand) {
      return false
    }

    return true
  }

  /**
   * Determines a maximum that each generated operand must be less than or equal to, depending on the number of digits specified in the generator settings.
   * @param operation operation for which the maximum is to be determined
   * @returns maximum as a number
   */
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
   * Returns the largest natural number with the specified number of digits (+1).
   * @param digits the amount of digits the returned number should have
   * @return largest number with {@link digits} digits plus 1
   */
  private digitsToMax(digits: number): number {
    if(digits < 0) {
      throw new RangeError('Number of digits must not be less than 0.')
    }
    return Math.pow(10, digits)
  }

  private calculateResult(firstOperand: number, secondOperand: number, operation: string): number {
    return new Function('return ' + firstOperand + operation + secondOperand)()
  }
}

export default new MathProblemGenerator()
