import { useState } from "react"
import MathProblemGenerator from "../MathGeneration/MathProblemGenerator"

function MathProblem() {
  const [userInput, setUserInput] = useState<number>(0)
  const [score, setScore] = useState<number>(0)  
  const [mathProblem, setMathProblem] = useState(MathProblemGenerator.generateProblem())

  function handleSubmitResult(e: React.FormEvent) {
    e.preventDefault()

    if(userInput === mathProblem.result) {
      generateNewProblem()
      // increase score, if correct result is submitted
      setScore(score + 1)
      return
    }
    // set score to 0, if the submitted result is incorrect
    setScore(0)
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
      <div>
        Current Score: {score}
      </div>
    </div>
  )
}

export default MathProblem