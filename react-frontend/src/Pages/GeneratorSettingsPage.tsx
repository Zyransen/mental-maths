import { useState } from "react"
import generatorSettings from "../Settings/GeneratorSettings"
import { Operation } from "../MathGeneration/ArithmeticOperation"
import timerSettings from "../Settings/TimerSettings"
import { useNavigate } from "react-router-dom"

function GeneratorSettingsPage() {

  // enabled operations
  const [addition, setAddition] = useState<boolean>(generatorSettings.operations.includes(Operation.Addition))
  const [subtraction, setSubtraction] = useState<boolean>(generatorSettings.operations.includes(Operation.Subtraction))
  const [multiplication, setMultiplication] = useState<boolean>(generatorSettings.operations.includes(Operation.Multiplication))

  // max amount of digits for operands of respective operations
  const [additionDigits, setAdditionDigits] = useState<number>(generatorSettings.additionDigits)
  const [subtractionDigits, setSubtractionDigits] = useState<number>(generatorSettings.subtractionDigits)
  const [multiplicationDigits, setMultiplicationDigits] = useState<number>(generatorSettings.multiplicationDigits)

  // timer settings
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(timerSettings.isTimerEnabled)
  const [timerDuration, setTimerDuration] = useState<number>(timerSettings.timeToSolve)

  // navigation
  const navigate = useNavigate()

  function getValidDigits(userInput: number) {
    // number of digits of an operand must be greater than 1 and less than MAX_DIGITS
    const MIN_DIGITS = 1
    const MAX_DIGITS = 5

    if(userInput < MIN_DIGITS) { return MIN_DIGITS }
    if(userInput > MAX_DIGITS) { return MAX_DIGITS }

    return userInput
  } 

  function getValidDuration(userInput: number) {
    // timer duration must  be greater than 1 and less than MAX_DURATION
    const MIN_DURATION = 1
    const MAX_DURATION = 300

    if(userInput < MIN_DURATION) { return MIN_DURATION }
    if(userInput > MAX_DURATION) { return MAX_DURATION }

    return userInput
  }

  function handleApply() {
    const operations: Operation[] = []

    if(addition) { operations.push(Operation.Addition) }
    if(subtraction) { operations.push(Operation.Subtraction) }
    if(multiplication) { operations.push(Operation.Multiplication) }

    // if no operations are enabled, enable addition as a default
    if(operations.length === 0) {
      operations.push(Operation.Addition)
    }

    generatorSettings.operations = operations

    generatorSettings.additionDigits = additionDigits
    generatorSettings.subtractionDigits = subtractionDigits
    generatorSettings.multiplicationDigits = multiplicationDigits

    timerSettings.isTimerEnabled = isTimerEnabled
    timerSettings.timeToSolve = timerDuration

    navigate('/')
  }

  function handleCancel() {
    navigate('/')
  }

  // does nothing (for 2nd part of in line conditional statements)
  function doNothing() { return }

  return (
    <div>
      <h1>Settings</h1> 
      <h2>Operations</h2>
      <div>
        {/* Addition Settings */}
        <div id='addition'>
          <label htmlFor="addition-checkbox">Addition</label>
          <input 
            id='addition-checkbox'
            type="checkbox" 
            checked={addition}
            onChange={ () => {setAddition(!addition)} }
          />
          { addition &&
          <div>
            <label htmlFor="addition-digits-input">Max digits for operands (addition)</label>
            <input 
              id='addition-digits-input'
              type="number" 
              value={additionDigits || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdditionDigits(getValidDigits(e.target.valueAsNumber)) }}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setAdditionDigits(1) : doNothing() }}
            />
          </div>
          }
          
        </div>

        {/* Subtraction Settings */}
        <div id='subtraction'>
          <label htmlFor="subtraction-checkbox">Subtraction</label>
          <input 
            id='subtraction-checkbox'
            type="checkbox" 
            checked={subtraction}
            onChange={ () => {setSubtraction(!subtraction)} }
          />
          { subtraction &&
          <div>
            <label htmlFor="subtraction-digits-input">Max digits for operands (subtraction)</label>
            <input 
              id='subtraction-digits-input'
              type="number" 
              value={subtractionDigits || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSubtractionDigits(getValidDigits(e.target.valueAsNumber)) }}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setSubtractionDigits(1) : doNothing() }}
            />
          </div>
          }
        </div>

        {/* Multiplication Settings */}
        <div id='multiplication'>
          <label htmlFor="multiplication-checkbox">Multiplication</label>
          <input 
            id='multiplication-checkbox'
            type="checkbox" 
            checked={multiplication}
            onChange={ () => {setMultiplication(!multiplication)} }
          />
          { multiplication &&
          <div>
            <label htmlFor="multiplication-digits-input">Max digits for operands (multiplication)</label>
            <input 
              id='multiplication-digits-input'
              type="number" 
              value={multiplicationDigits || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMultiplicationDigits(getValidDigits(e.target.valueAsNumber)) }}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setMultiplicationDigits(1) : doNothing() }}
            />
          </div>
          }
        </div>
      </div>

      <h2>Timer</h2>
      <div>
        <label htmlFor="timer-checkbox">enable Timer</label>
        <input 
          id='timer-checkbox'
          type="checkbox" 
          checked={isTimerEnabled}
          onChange={ () => {setIsTimerEnabled(!isTimerEnabled)} }
        />
        { isTimerEnabled &&
        <div>
          <label htmlFor="timer-duration">Max duration for timer</label>
          <input 
            id='timer-duration'
            type="number" 
            value={timerDuration || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTimerDuration(getValidDuration(e.target.valueAsNumber)) }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setTimerDuration(1) : doNothing() }}
          />
        </div>
        }
      </div>

      {/* apply / cancel buttons */}
      <div>
        <button onClick={handleApply}>
          Apply Changes
        </button>
        <button onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default GeneratorSettingsPage