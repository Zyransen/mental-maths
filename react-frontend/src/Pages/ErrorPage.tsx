import { useNavigate } from "react-router-dom"

function ErrorPage() {
  const navigate = useNavigate()

  function goHome() {
    navigate('/')
  }

  return (
    <div>
      <p>
        Sorry, the page you are trying to access does not exist.
      </p>

      <button onClick={goHome}>
        Take me back home
      </button>
    </div>
  )
}

export default ErrorPage