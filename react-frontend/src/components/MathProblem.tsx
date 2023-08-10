import { useState } from "react"
import MathProblemGenerator from "../MathGeneration/MathProblemGenerator"

function MathProblem() {
  const [userInput, setUserInput] = useState<number>(0)
  const [mathProblem, setMathProblem] = useState(MathProblemGenerator.generateProblem())

  function handleSubmitResult(e: React.FormEvent) {
    e.preventDefault()

    if(userInput === mathProblem.result) {
      generateNewProblem()
      return
    }
  }

  function generateNewProblem() {
    const problem = MathProblemGenerator.generateProblem()
    setMathProblem({
      firstOperand: problem.firstOperand,
      secondOperand: problem.secondOperand,
      operation: problem.operation,
      result: problem.result
    })
  }

  return(
    <div className="">
      <div className="">
        {mathProblem.firstOperand} {mathProblem.operation} {mathProblem.secondOperand} = {mathProblem.result}
      </div>
      <form onSubmit={handleSubmitResult}>
        <input 
          id="user-input" 
          type="number" 
          value={userInput} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserInput(e.target.valueAsNumber)
          }}  
        />
      </form>
    </div>
  )
}

export default MathProblem