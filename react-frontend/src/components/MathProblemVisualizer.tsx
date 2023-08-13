type Props = {
  firstOperand: number,
  secondOperand: number,
  operation: string
}

function MathProblemVisualizer({firstOperand, secondOperand, operation}: Props) {
  return (
    <div className="text-center text-3xl">
      {firstOperand} {operation === "*" ? "×" : operation} {secondOperand}
    </div>
  )
}

export default MathProblemVisualizer