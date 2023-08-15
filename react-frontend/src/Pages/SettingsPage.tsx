import { useState } from "react"
import generatorSettings from "../Settings/GeneratorSettings"
import { Operation } from "../MathGeneration/ArithmeticOperation"
import timerSettings from "../Settings/TimerSettings"
import { useNavigate } from "react-router-dom"

function SettingsPage() {

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
    <div className="relative border-2 border-zinc-900 bg-zinc-700/20 rounded-3xl w-[600px] h-[700px] mx-auto my-14">
      <h1 className="text-6xl font-semibold my-5 text-center">Settings</h1> 
      <h2 className="text-4xl py-5 pl-20">Operations</h2>
      <div>
        {/* Addition Settings */}
        <div id='addition' className="text-xl pl-28 pb-4">
          <div className="relative flex items-center pb-1 text-2xl">
            <label htmlFor="addition-checkbox">Addition</label>
            <div className="absolute right-28 top-0.5">
              <input 
                id='addition-checkbox'
                type="checkbox" 
                className="checkbox-switch"
                checked={addition}
                onChange={ () => {setAddition(!addition)} }
              />
            </div>
          </div>
          { addition &&
          <div  className="relative">
            <label htmlFor="addition-digits-input">Max digits for operands (addition)</label>
            <input 
              id='addition-digits-input'
              type="number" 
              className="w-[50px] h-[25px] text-center rounded-full bg-zinc-900/60 absolute right-28 top-1"
              value={additionDigits || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setAdditionDigits(getValidDigits(e.target.valueAsNumber)) }}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setAdditionDigits(1) : doNothing() }}
            />
          </div>
          }
          
        </div>

        {/* Subtraction Settings */}
        <div id='subtraction' className="text-xl pl-28 pb-4">
          <div className="relative flex items-center pb-1 text-2xl">
            <label htmlFor="subtraction-checkbox">Subtraction</label>
            <div className="absolute right-28 top-0.5">
              <input 
                id='subtraction-checkbox'
                type="checkbox" 
                className="checkbox-switch"
                checked={subtraction}
                onChange={ () => {setSubtraction(!subtraction)} }
              />
            </div>
          </div>
          { subtraction &&
          <div className="relative">
            <label htmlFor="subtraction-digits-input">Max digits for operands (subtraction)</label>
            <input 
              id='subtraction-digits-input'
              type="number" 
              className="w-[50px] h-[25px] text-center rounded-full bg-zinc-900/60 absolute right-28 top-1"
              value={subtractionDigits || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSubtractionDigits(getValidDigits(e.target.valueAsNumber)) }}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setSubtractionDigits(1) : doNothing() }}
            />
          </div>
          }
        </div>

        {/* Multiplication Settings */}
        <div id='multiplication' className="text-xl pl-28 pb-4">
          <div className="relative flex items-center pb-1 text-2xl">
            <label htmlFor="multiplication-checkbox">Multiplication</label>
            <div className="absolute right-28 top-0.5">
              <input 
                id='multiplication-checkbox'
                type="checkbox" 
                className="checkbox-switch"
                checked={multiplication}
                onChange={ () => {setMultiplication(!multiplication)} }
              />
            </div>
          </div>
          { multiplication &&
          <div className="relative">
            <label htmlFor="multiplication-digits-input">Max digits for operands (multiplication)</label>
            <input 
              id='multiplication-digits-input'
              type="number" 
              className="w-[50px] h-[25px] text-center rounded-full bg-zinc-900/60 absolute right-28 top-1"
              value={multiplicationDigits || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setMultiplicationDigits(getValidDigits(e.target.valueAsNumber)) }}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setMultiplicationDigits(1) : doNothing() }}
            />
          </div>
          }
        </div>
      </div>

      <h2 className="text-4xl pt-7 pb-5 pl-20">Timer</h2>
      <div className="text-xl pl-28 pb-4">
        <div className="relative flex items-center">
          <label htmlFor="timer-checkbox">enable Timer</label>
          <div className="absolute right-28 top-0.5">
            <input 
              id='timer-checkbox'
              type="checkbox" 
              className="checkbox-switch"
              checked={isTimerEnabled}
              onChange={ () => {setIsTimerEnabled(!isTimerEnabled)} }
            />
          </div>
        </div>
        { isTimerEnabled &&
        <div className="relative">
          <label htmlFor="timer-duration">Max duration for timer</label>
          <input 
            id='timer-duration'
            type="number" 
            className="w-[50px] h-[25px] text-center rounded-full bg-zinc-900/60 absolute right-28 top-1"
            value={timerDuration || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTimerDuration(getValidDuration(e.target.valueAsNumber)) }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setTimerDuration(1) : doNothing() }}
          />
        </div>
        }
      </div>

      {/* apply / cancel buttons */}
      <div className="pt-7 flex justify-center left-0 right-0 absolute bottom-10">
        <div className="px-3 md:px-5">
          <button 
            className="rounded-full py-2 px-4 text-lg font-semibold bg-fuchsia-700 hover:bg-fuchsia-700/80 shadow-[0_12px_25px_rgba(0,0,0,0.35)]"
            onClick={handleApply}
          >
            Apply Changes
          </button>
        </div>
        <div className="px-3 md:px-5">
          <button 
            className="rounded-full py-2 px-4 text-lg font-semibold bg-red-700 hover:bg-red-700/80 shadow-[0_12px_25px_rgba(0,0,0,0.35)]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage