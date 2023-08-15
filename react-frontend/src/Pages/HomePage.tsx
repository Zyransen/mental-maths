import MathProblemWrapper from "../components/MathProblemWrapper"

function HomePage() {
  return(
    <div className='h-screen grid grid-rows-3'>
      <div className='text-center text-5xl md:text-6xl lg:text-7xl font-mono font-semibold mt-[20%] md:mt-[12%] lg:mt-[5%] text-neutral-200 drop-shadow-[0_12px_25px_rgba(0,0,0,0.75)]'>
        Mental Maths Trainer
      </div>
      <div className='flex items-center justify-center'>
        <MathProblemWrapper/>
      </div>
    </div>
  )
}

export default HomePage