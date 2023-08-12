import { useEffect, useState } from "react"
import MathProblemGenerator from "../MathGeneration/MathProblemGenerator"
import timerSettings from "../Settings/TimerSettings"

function MathProblem() {
  const [userInput, setUserInput] = useState<number>(0)
  const [score, setScore] = useState<number>(0)   
  const [mathProblem, setMathProblem] = useState(MathProblemGenerator.generateProblem())
  const [timeLeft, setTimeLeft] = useState<number>(timerSettings.timeToSolve)

  function handleSubmitResult(e: React.FormEvent) {
    e.preventDefault()
    
    // generate a new math problem, increase the users score and reset timer, if correct result is submitted
    if(userInput === mathProblem.result) {
      generateNewProblem()
      setTimeLeft(timerSettings.timeToSolve)
      setScore(score + 1)
      return
    }
    // set score to 0, if the submitted result is incorrect
    setScore(0)
  }

  // decrements the time the user has left for the current math problem by 1 second each second
  useEffect(() => {
    const interval = setInterval(() => {
      if(!timerSettings.isTimerEnabled) {
        return
      }
      if(timeLeft > 1){
        setTimeLeft(timeLeft => timeLeft - 1)
      } else {
        generateNewProblem()
        setTimeLeft(timerSettings.timeToSolve)
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
      <div className="text-center text-3xl">
        {mathProblem.firstOperand} {mathProblem.operation === "*" ? "×" : mathProblem.operation} {mathProblem.secondOperand} {/* = mathProblem.result */}
      </div>
      <form onSubmit={handleSubmitResult} className="py-4">
        <input 
          id="user-input" 
          className="text-center rounded-3xl w-52 border border-zinc-800 bg-zinc-600 shadow-[0_12px_25px_rgba(0,0,0,0.25)] py-2 text-2xl"
          type="number" 
          value={userInput} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserInput(e.target.valueAsNumber)
          }}  
        />
      </form>
      <div className="text-center">
        Current Score: {score}
      </div>
      { timerSettings.isTimerEnabled &&
      <div className="text-center">
        Time left: {timeLeft}
      </div>
      }
    </div>
  )
}

export default MathProblem