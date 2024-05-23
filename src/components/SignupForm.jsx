import React,{useState} from 'react'
import { signup } from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import Sppiner from './Sppiner'

function SignupForm() {

    // Navigation
    const navigate = useNavigate()

    // Input Fields
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")

    // Error & Loading
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

  return (
    <>
            <h1 className='mt-10 font-bold text-3xl'>Welcome To</h1>
                <h1 className='mt-2 font-bold text-3xl'>Gridlic!</h1>
                <p className='text-xs mt-10'>Already have an account? <Link className="text-blue-700" to="/Login">Login</Link> </p>
                <div className='flex flex-col mt-3 w-full items-center'>
                    <input 
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Full Name'
                        className='mb-3 h-10  w-1/2 border-2  border-gray-300 rounded-3xl p-2 text-xs hover:border-[#FFAA80] [@media(max-width:600px)]:bg-zinc-950'>

                    </input>
                    <input 
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        className='mb-5 h-10  w-1/2 border-2  border-gray-300 rounded-3xl p-2 text-xs hover:border-[#FFAA80] [@media(max-width:600px)]:bg-zinc-950'>

                    </input>
                    <input 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        className='mb-3 h-10  w-1/2 border-2  border-gray-300 rounded-3xl p-2 text-xs hover:border-[#FFAA80] [@media(max-width:600px)]:bg-zinc-950'>

                    </input>
                    <input 
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        className='mb-3 h-10  w-1/2 border-2  border-gray-300 rounded-3xl p-2 text-xs hover:border-[#FFAA80] [@media(max-width:600px)]:bg-zinc-950'>

                    </input>
                    <button 
                        className='h-10  w-1/2 bg-[#FFAA80] rounded-3xl p-2 text-sm active:bg-zinc-900 active:text-[#FFAA80] hover:bg-rose-400 flex justify-center items-center [@media(max-width:600px)]:text-zinc-900'
                        onClick={() => {
                            
                            if(password !== confirmPassword){
                                setError("Incorrect password in Confirm Password")
                                setConfirmPassword("")
                            }

                            if(password.length < 8){
                                setError("Password must be more than 8 characters")
                                setPassword("")
                                setConfirmPassword("")
                            }

                            if(email < 1){
                                setError("Please Enter Email")
                            }

                            if(name < 1){
                                setError("Please Enter Name")
                            }

                            if(password.length > 7 && password === confirmPassword){
                                setLoading(true)
                                signup({email, password, name}).then((data) => {
                                    if(data){
                                        navigate("/Signup/profile")
                                    }  
                                }).catch((error) => {
                                    setLoading(false)
                                    setError(error.message)
                                })
                            }
                        }}>{loading && <Sppiner/>} {!loading && "Signup"}</button>
                    <div className='text-[1vw] text-red-800 font-semibold mt-4 w-full flex justify-center items-center text-center'>{error}</div>
                </div>
    </>
  )
}

export default SignupForm