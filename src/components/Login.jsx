import React, { useState } from 'react'
import { login } from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import Sppiner from './Sppiner'

function Login({setIsLogin}) {

    // Navigation
    const navigate = useNavigate()

    // Input fields
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    // Error & Loading
    const [error, setError] = useState("")
    const [loading , setLoading] = useState(false)

  return (
    <div className='bg-zinc-950 w-full h-screen flex justify-center items-center'>
        <div className='h-5/6 w-3/5 bg-gray-100 flex p-2 rounded-3xl [@media(max-width:600px)]:p-0 [@media(max-width:600px)]:w-[100vw] [@media(max-width:600px)]:h-[100vh] [@media(max-width:600px)]:bg-zinc-950 [@media(max-width:600px)]:text-gray-100 [@media(max-width:600px)]:text-[#FFAA80]'>
            <div className='w-1/2 flex flex-col items-center [@media(max-width:600px)]:w-[100vw]'>
                <h1 className='mt-20 font-bold text-3xl'>Welcome Back</h1>
                <p className='text-xs mt-20'>Don't have an account? <Link className="text-blue-700" to="/Signup">Signup</Link> </p>
                <div className='flex flex-col mt-3 w-full items-center'>
                    <input 
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className='mb-3 h-10  w-1/2 border-2  border-gray-300 rounded-3xl p-2 text-xs hover:border-[#FFAA80] [@media(max-width:600px)]:bg-zinc-950'>

                    </input>
                    <input 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        className='mb-3 h-10  w-1/2 border-2  border-gray-300 rounded-3xl p-2 text-xs hover:border-[#FFAA80] [@media(max-width:600px)]:bg-zinc-950'>

                    </input>
                    <button 
                        className='h-10  w-1/2 bg-[#FFAA80] rounded-3xl p-2 active:bg-zinc-900 active:text-[#FFAA80] hover:bg-rose-400 flex justify-center items-center [@media(max-width:600px)]:text-zinc-900' 
                        onClick={() => {
                            setError("")
                            if(email.length > 0 && password.length > 0){
                                setLoading(true)
                                login({email, password})
                                .then(() => {
                                    
                                    navigate("/Home")
                                    
                                }).catch((error) => {
                                    setLoading(false)
                                    setError(error.message) 
                                })
                            }else {
                                setError("Please enter Email and Passsword ")
                            }
                            
                        }}>{loading && <Sppiner/>} {!loading && "Login"}</button>

                    <div className='text-[1vw] text-red-800 font-semibold mt-4 w-full flex justify-center items-center text-center'>{error}</div>
                </div>
            </div>
            <div className="w-1/2 bg-orange-700 rounded-3xl bg-[url('https://i.pinimg.com/564x/a4/3c/6e/a43c6e30850f07eab5717efe67c0e65e.jpg')] bg-cover bg-center [@media(max-width:600px)]:w-0"></div>
        </div>
    </div>
  )
}

export default Login