import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import { Link, Outlet } from 'react-router-dom'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  
  useEffect(() => {
    console.log(isLogin)
  }, [isLogin])

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
