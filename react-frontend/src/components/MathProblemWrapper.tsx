import { useEffect, useState } from "react"
import MathProblemGenerator from "../MathGeneration/MathProblemGenerator"
import timerSettings from "../Settings/TimerSettings"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import MathProblemVisualizer from "./MathProblemVisualizer"
import Score from "./Score"


function MathProblemWrapper() {
  const [userInput, setUserInput] = useState<number>(0)
  const [score, setScore] = useState<number>(0)   
  const [mathProblem, setMathProblem] = useState(MathProblemGenerator.generateProblem())
  const [timeLeft, setTimeLeft] = useState<number>(timerSettings.timeToSolve)
  const [key, setKey] = useState<number>(0)
  // 3 states: 0 -> neutral, 1 -> correct, 2 -> incorrect
  const [correctness, setCorrectness] = useState<string>("neutral")

  function handleSubmitResult(e: React.FormEvent) {
    e.preventDefault()

    // empty input field
    setUserInput(0)
    // generate a new math problem, increase the users score and reset timer, if correct result is submitted
    if(userInput === mathProblem.result) {
      generateNewProblem()
      setTimeLeft(timerSettings.timeToSolve)
      setScore(score + 1)
      
      // trigger animation for 'submitted answer was correct', reset afterwards
      triggerCorrectnessAnimation("correct")

      return
    }

    // set score to 0, if the submitted result is incorrect
    setScore(0)
    // trigger animation for 'submitted answer was incorrect', reset afterwards
    triggerCorrectnessAnimation("incorrect")
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
        triggerCorrectnessAnimation("incorrect")
        generateNewProblem()
        setTimeLeft(timerSettings.timeToSolve)
        setScore(0)
      }
    }, 1000)
    return () => clearInterval(interval)
  })

  function triggerCorrectnessAnimation(correctnessState: string) {
    setCorrectness(correctnessState)
    setTimeout(function() {
      setCorrectness("neutral")
    }, 700)
  }

  function generateNewProblem() {
    const problem = MathProblemGenerator.generateProblem()
    setMathProblem({
      firstOperand: problem.firstOperand,
      secondOperand: problem.secondOperand,
      operation: problem.operation,
      result: problem.result
    })
    // reset timer animation
    setKey(key+1)
  }

  return(
    <div className="">
      <MathProblemVisualizer firstOperand={mathProblem.firstOperand} secondOperand={mathProblem.secondOperand} operation={mathProblem.operation}/>
      <div className="relative py-4 flex justify-center items-center w-80">
        <form onSubmit={handleSubmitResult} data-correctness={correctness} className="data-[correctness=incorrect]:animate-shake">
          <label htmlFor="user-input-result" className="sr-only">User Input</label>
          <input 
            id="user-input-result" 
            data-correctness={correctness}
            className="text-center w-52 py-2 text-2xl rounded-3xl  border border-zinc-800 bg-zinc-600  placeholder:italic shadow-[0_12px_25px_rgba(0,0,0,0.25)] data-[correctness=incorrect]:border-red-600 data-[correctness=correct]:border-green-600 focus:outline-none focus:border-zinc-400"
            type="number"
            placeholder="result"
            value={userInput || ''} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserInput(e.target.valueAsNumber)
            }}  
          />
        </form>
        { timerSettings.isTimerEnabled &&
          <div className="absolute right-0 my-auto">
            <CountdownCircleTimer
              key={key}
              isPlaying={timerSettings.isTimerEnabled}
              duration={timerSettings.timeToSolve}
              colors={['#84cc16', '#dc2626']}
              colorsTime={[timerSettings.timeToSolve, 0]}
              trailColor="#3f3f46"
              size={50}
              strokeWidth={5}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>
        }
      </div>
      <Score currentScore={score}/>
    </div>
  )
}

export default MathProblemWrapper