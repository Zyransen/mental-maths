import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'

import HomePage from './Pages/HomePage'
import SettingsPage from './Pages/SettingsPage'
import ErrorPage from './Pages/ErrorPage'

import './css/index.css'
import Footer from './components/Footer';


const router = createHashRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/settings",
    element: <SettingsPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <div className=''>
      <Footer/>
    </div>
  </React.StrictMode>,
)
