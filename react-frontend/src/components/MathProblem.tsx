import { useEffect, useState } from "react"
import MathProblemGenerator from "../MathGeneration/MathProblemGenerator"

function MathProblem() {
  const [userInput, setUserInput] = useState<number>(0)
  const [score, setScore] = useState<number>(0)   
  const [mathProblem, setMathProblem] = useState(MathProblemGenerator.generateProblem())
  
  // maximum amount of time (seconds) the user has to solve a math problem
  const TIME_TO_SOLVE = 10
  const [timeLeft, setTimeLeft] = useState<number>(TIME_TO_SOLVE)

  function handleSubmitResult(e: React.FormEvent) {
    e.preventDefault()
    
    // generate a new math problem, increase the users score and reset timer, if correct result is submitted
    if(userInput === mathProblem.result) {
      generateNewProblem()
      setTimeLeft(TIME_TO_SOLVE)
      setScore(score + 1)
      return
    }
    // set score to 0, if the submitted result is incorrect
    setScore(0)
  }

  // decrements the time the user has left for the current math problem by 1 second each second
  useEffect(() => {
    const interval = setInterval(() => {
      if(timeLeft > 1){
        setTimeLeft(timeLeft => timeLeft - 1)
      } else {
        generateNewProblem()
        setTimeLeft(TIME_TO_SOLVE)
        setScore(0)
      }
    }, 1000)
    return () => clearInterval(interval)
  })

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
      <div>
        Time left: {timeLeft}
      </div>
    </div>
  )
}

export default MathProblem