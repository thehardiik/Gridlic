import React, {useEffect, useState} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import logo from "./one.png"
import { getUser, logout } from '../appwrite/auth'
import Sppiner from './Sppiner'


function Screen() {

    const [user, setUser] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getUser().then((data) => {
          setUser(data)
          setLoader(false)
        }).finally(() => {
            setLoader(false)
        })
        
      }, [user])
    

    if(!loader){
        return (
            <div className='bg-zinc-950 w-full h-screen flex flex-col overflow-hidden'>
                <div className='h-[12vh] w-full flex flex-row'>
                    <div className='w-1/2  flex flex-row items-center'>
                        <Link to="/">
                            <h1 className='ml-10 text-2xl font-bold text-gray-100 [@media(max-width:600px)]:text-[#FFAA80]  [@media(max-width:600px)]:ml-5'>Gridlic.</h1>

                        </Link>
                    </div>
                    <div className='w-1/2 flex  flex-row items-center [@media(max-width:600px)]:text-sm text-gray-100 justify-end font-bold '>
                        <div className='border-gray-100 border-[1px] p-1 flex pl-4 pr-4 items-center mr-5 rounded-full hover:text-[#FFAA80] hover:border-[#FFAA80]'>
                            {!user && <Link className="" to="Login">Login</Link>}
                            {user && <Link className="" to="/Home">Login</Link>}
                        </div>
        
                        <div className='border-gray-100 border-[1px] p-1 flex pl-4 pr-4 items-center mr-10 rounded-full hover:text-[#FFAA80] hover:border-[#FFAA80] [@media(max-width:600px)]:mr-5 [@media(max-width:600px)]:border-[#FFAA80] [@media(max-width:600px)]:text-[#FFAA80]'>
                            <Link className=" " to="Signup">Signup</Link>
                        </div>
                        
                        
                    </div>
                </div>
                <div className='h-[88vh] flex flex-wrap'>
                    <div className='h-full w-1/2 flex flex-col justify-center 
                                    [@media(max-width:600px)]:w-full'>
                        <div className='ml-[10vw]'>
                            <h1 className='ml-20 text-[7vw] hover:text-[#FFAA80] text-gray-100 leading-12 [@media(max-width:600px)]:ml-10 [@media(max-width:600px)]:text-[15vw]'>Click.</h1>
                            <h1 className='ml-10 text-[7vw] hover:text-[#FFAA80] text-gray-100 leading-10 [@media(max-width:600px)]:ml-5 [@media(max-width:600px)]:text-[15vw] [@media(max-width:600px)]:text-[#FFAA80]'>Grid.</h1>
                            <h1 className='ml-20 text-[7vw] hover:text-[#FFAA80] text-gray-100 [@media(max-width:600px)]:ml-10 [@media(max-width:600px)]:text-[15vw] '>Project.</h1>
                        </div>
                    </div>
                    <div className='h-full w-1/2 flex justify-center'>
                        <img src={logo} alt='text'></img>
                    </div>
                </div>
            </div>
          )

    }else {
        return (
            <div className='flex justify-center items-center bg-zinc-900 h-[100vh] w-full'>
                <div className='w-1/3 flex justify-center items-center'>
                    <Sppiner/>
                </div>
                
            </div>
        )
    }
  
}

export default Screen