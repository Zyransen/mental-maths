import { useState } from "react"
import generatorSettings from "../Settings/GeneratorSettings"
import { Operation } from "../MathGeneration/ArithmeticOperation"
import timerSettings from "../Settings/TimerSettings"
import { useNavigate } from "react-router-dom"
import OperationSetting from "./../components/OperationSetting"

function SettingsPage() {

  // enabled operations
  const [addition, setAddition] = useState<boolean>(generatorSettings.operations.includes(Operation.Addition))
  const [subtraction, setSubtraction] = useState<boolean>(generatorSettings.operations.includes(Operation.Subtraction))
  const [multiplication, setMultiplication] = useState<boolean>(generatorSettings.operations.includes(Operation.Multiplication))
  const [division, setDivision] = useState<boolean>(generatorSettings.operations.includes(Operation.Division))

  // max amount of digits for operands of respective operations
  const [additionDigits, setAdditionDigits] = useState<number>(generatorSettings.additionDigits)
  const [subtractionDigits, setSubtractionDigits] = useState<number>(generatorSettings.subtractionDigits)
  const [multiplicationDigits, setMultiplicationDigits] = useState<number>(generatorSettings.multiplicationDigits)
  const [divisionDigits, setDivisionDigits] = useState<number>(generatorSettings.divisionDigits)

  // timer settings
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(timerSettings.isTimerEnabled)
  const [timerDuration, setTimerDuration] = useState<number>(timerSettings.timeToSolve)

  // navigation
  const navigate = useNavigate()

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
    if(division) {operations.push(Operation.Division)}

    // if no operations are enabled, enable addition as a default
    if(operations.length === 0) {
      operations.push(Operation.Addition)
    }

    generatorSettings.operations = operations

    generatorSettings.additionDigits = additionDigits
    generatorSettings.subtractionDigits = subtractionDigits
    generatorSettings.multiplicationDigits = multiplicationDigits
    generatorSettings.divisionDigits = divisionDigits

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
    <div className="sm:relative sm:border-2 sm:border-zinc-900 sm:bg-zinc-700/20 sm:rounded-3xl sm:w-[600px] sm:h-[700px] sm:mx-auto sm:my-14">
      <h1 className="text-5xl sm:text-6xl font-semibold my-5 text-center drop-shadow-[0_10px_15px_rgba(0,0,0,0.65)]">Settings</h1> 
      <h2 className="text-3xl sm:text-4xl py-5 pl-6 sm:pl-20 drop-shadow-[0_10px_15px_rgba(0,0,0,0.45)]">Operations</h2>
      <div>
        {/* Addition Settings */}
        <OperationSetting 
          operationName="Addition" 
          operation={addition} 
          setOperation={setAddition} 
          operationDigits={additionDigits} 
          setOperationDigits={setAdditionDigits}
        />

        {/* Subtraction Settings */}
        <OperationSetting 
          operationName="Subtraction" 
          operation={subtraction} 
          setOperation={setSubtraction} 
          operationDigits={subtractionDigits} 
          setOperationDigits={setSubtractionDigits}
        />

        {/* Multiplication Settings */}
        <OperationSetting 
          operationName="Multiplication" 
          operation={multiplication} 
          setOperation={setMultiplication} 
          operationDigits={multiplicationDigits} 
          setOperationDigits={setMultiplicationDigits}
        />

        {/* Division Settings */}
        <OperationSetting 
          operationName="Division" 
          operation={division} 
          setOperation={setDivision} 
          operationDigits={divisionDigits} 
          setOperationDigits={setDivisionDigits}
        />
      </div>

      <h2 className="text-3xl sm:text-4xl pt-7 pb-5 pl-6 sm:pl-20 drop-shadow-[0_10px_15px_rgba(0,0,0,0.45)]">Timer</h2>
      <div className="text-lg sm:text-xl pl-10 sm:pl-28 pb-3 sm:pb-4">
        <div className="relative flex items-center">
          <label htmlFor="timer-checkbox">Enable timer</label>
          <div className="absolute right-10 sm:right-28 top-1 sm:top-0.5">
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
          <label htmlFor="timer-duration">Maximum timer duration (in s)</label>
          <input 
            id='timer-duration'
            type="number" 
            className="w-[50px] h-[25px] text-center rounded-full bg-zinc-900/60 absolute right-10 sm:right-28 top-0.5 sm:top-1"
            value={timerDuration || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTimerDuration(getValidDuration(e.target.valueAsNumber)) }}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setTimerDuration(1) : doNothing() }}
          />
        </div>
        }
      </div>

      {/* apply / cancel buttons */}
      <div className="pt-7 flex justify-center left-0 right-0 absolute bottom-12 sm:bottom-10">
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