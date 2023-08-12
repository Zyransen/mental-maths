import { Operation } from "./ArithmeticOperation";
import generatorSettings from "../Settings/GeneratorSettings";

export type MathProblem = {
  firstOperand: number,
  secondOperand: number,
  operation: string,
  result: number
};

class MathProblemGenerator {
  /**
   * Randomly generates an object of type MathProblem, consisting of two operands, an operation, aswell as the result of the generated arithmetic problem
   * @returns a newly generated MathProblem
   */
  generateProblem(): MathProblem {
    const randomOperation = this.generateOperation();
    let firstOperand = this.generateOperand(randomOperation)
    let secondOperand = this.generateOperand(randomOperation)

    // avoid negative results in subtractions
    if(randomOperation === Operation.Subtraction && firstOperand < secondOperand){
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
    let operand = Math.floor(Math.random() * max)

    // regenerate operand if its not valid
    if(!this.checkOperandValidity(operand, operation)) {
      operand = this.generateOperand(operation)
    }

    return operand
  }

  /**
   * Checks if a generated operand is valid for use in a math problem.
   * @param operand the operand to be checked
   * @param operation the operation used in the generated math problem
   * @returns true, if the operand is valid
   */
  private checkOperandValidity(operand: number, operation: Operation): boolean {
    // 0 as an operand is trivial (no matter the operation)
    if(operand === 0){
      return false
    }
    // multiplication with 1 is trivial
    if(operation === Operation.Multiplication && operand === 1){
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
