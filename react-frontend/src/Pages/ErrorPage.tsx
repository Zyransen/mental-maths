import { useNavigate } from "react-router-dom"

function ErrorPage() {
  const navigate = useNavigate()

  function goHome() {
    navigate('/')
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center rows row-2">
      <p className="text-xl md:text-3xl  text-center px-3">
        Sorry, the page you are trying to access does not exist.
      </p>
      <div className="pt-7">
        <button 
          className="rounded-full py-2 px-5 text-2xl bg-fuchsia-800 hover:bg-fuchsia-800/80 shadow-[0_12px_25px_rgba(0,0,0,0.35)]"
          onClick={goHome}
        >
          Take Me Home
        </button>
      </div>
      
    </div>
  )
}

export default ErrorPage