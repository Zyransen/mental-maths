type Props = {
  currentScore: number
}

function Score({currentScore}: Props) {

  return (
    <div className="text-center">
      Current Score: {currentScore}
    </div>
  )
}

export default Score