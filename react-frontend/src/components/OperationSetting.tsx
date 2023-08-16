
type Props = {
  operationName: string,
  operation: boolean,
  setOperation: (operation: boolean) => void,
  operationDigits: number,
  setOperationDigits: (digits: number) => void,
}

function OperationSetting({ operationName, operation, setOperation, operationDigits, setOperationDigits }: Props) {

  function getValidDigits(userInput: number) {
    // number of digits of an operand must be greater than 1 and less than MAX_DIGITS
    const MIN_DIGITS = 1
    const MAX_DIGITS = 5

    if(userInput < MIN_DIGITS) { return MIN_DIGITS }
    if(userInput > MAX_DIGITS) { return MAX_DIGITS }

    return userInput
  } 
  
  // does nothing (for 2nd part of in line conditional statements)
  function doNothing() { return }

  return(
    <div id='addition' className="text-lg sm:text-xl pl-10 sm:pl-28 pb-3 sm:pb-4">
      <div className="relative flex items-center pb-0.5 sm:pb-1 text-xl sm:text-2xl">
        <label htmlFor="operation-checkbox">{operationName}</label>          
        <div className="absolute right-10 sm:right-28 top-1 sm:top-0.5">
          <input 
            id='operation-checkbox'                            
            type="checkbox" 
            className="checkbox-switch"
            checked={operation}
            onChange={ () => {setOperation(!operation)} }
          />
        </div>
      </div>
      { operation &&
      <div  className="relative">
        <label htmlFor="operation-digits-input">Digits per operand (max)</label>
        <input 
          id='operation-digits-input'
          type="number" 
          className="w-[50px] h-[25px] text-center rounded-full bg-zinc-900/60 absolute right-10 sm:right-28 top-0.5 sm:top-1"
          value={operationDigits || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setOperationDigits(getValidDigits(e.target.valueAsNumber)) }}            
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value === '' ? setOperationDigits(1) : doNothing() }}
        />
      </div>
      }
    </div>
  )
}

export default OperationSetting