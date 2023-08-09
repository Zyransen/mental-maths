import { useState } from "react"

function MathProblem() {
  const [userInput, setUserInput] = useState(0)
  
  // const [firstOperand, setFirstOperand] = useState(0)
  // const [secondOperand, setSecondOperand] = useState(0)
  // const [operation, setOperation] = useState('')

  function handleSubmitResult(e: React.FormEvent) {
    e.preventDefault()

  }

  return(
    <div className="MathProblem">
      <form onSubmit={handleSubmitResult}>
        <label htmlFor="user-input">User Input</label>
        <input 
          id="user-input" 
          type="number" 
          value={userInput} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserInput(e.target.valueAsNumber)
          }}  
        />
        <button>Submit Answer</button>
      </form>
    </div>
  )
}

export default MathProblem