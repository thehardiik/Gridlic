import React, { useEffect, useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import {getUser, logout} from "../appwrite/auth"
import { Outlet } from 'react-router-dom'
import { getAvatar, getUserData } from '../appwrite/service'


function Home() {
  const [user, setUser] = useState()
  const [showMenu , setShowmenu] = useState(false)
  const [src, setSrc] = useState("https://i.pinimg.com/564x/47/ba/71/47ba71f457434319819ac4a7cbd9988e.jpg")
  const navigate = useNavigate()

  useEffect(() => {
    getUser().then((data) => {
      setUser(data)
      getUserData({id: data.$id}).then((udata) => {
        return getAvatar({fileId: udata.documents[0].profile})
      }).then((adata) => {
          console.log(adata)
          if(adata) setSrc(adata.href)
      })
    })

    

    
  }, [user])
  
  return (
    <div 
      className='bg-zinc-900 w-full min-h-screen flex flex-col '
      onClick={() => {
        setShowmenu(false)
      }}>
        <div className='h-[15vh] w-full flex flex-row'>
            <div className='w-1/3  flex flex-row items-center'>
                <Link to="/Home/Grid">
                  <h1 className='ml-10 text-2xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-400  hover:to-indigo-500 hover:from-pink-400 [@media(max-width:600px)]:ml-5'>Gridlic.</h1>
                </Link>
            </div>
            <div className='w-1/3 flex flex-row items-center  text-zinx-900 justify-center font-bold'>
                <div className='flex bg-gradient-to-r  from-indigo-500 to-pink-400 w-[15vw] h-[60%] gap-2 rounded-full p-[2px]  hover:to-indigo-500 hover:from-pink-400 [@media(max-width:600px)]:fixed [@media(max-width:600px)]:w-[50vw] [@media(max-width:600px)]:h-[10vh] [@media(max-width:600px)]:top-[85vh] '>
                  <div className='flex justify-around items-center text-gray-100 bg-zinc-900 w-[100%] rounded-full h-[100%]'>
                    <NavLink 
                      className={({isActive}) => {
                        if(isActive){
                          return "inline-block text-transparent bg-clip-text bg-gradient-to-r  from-indigo-500 to-pink-400"
                        }
                      }} 
                      to="Create">Create</NavLink>
                    <NavLink 
                      className={({isActive}) => {
                        if(isActive){
                          return "inline-block text-transparent bg-clip-text bg-gradient-to-r  from-indigo-500 to-pink-400"
                        }
                      }} 
                      to="Grid">Grid</NavLink>
                  </div>
                  
                  
                </div>
                
            </div>
            <div className='w-1/3 flex flex-row items-center  text-gray-100 justify-end font-bold'>
            <div className={`absolute w-[20vw] h-[20vw] bg-zinc-900 z-40 right-6 rounded-xl top-2 shadow-2xl shadow-zinc-950 ${!showMenu && "hidden"} flex justify-center items-end [@media(max-width:600px)]:top-3 [@media(max-width:600px)]:w-[50vw] [@media(max-width:600px)]:h-[40vh] [@media(max-width:600px)]:right-3`}>
                  <button 
                    className='border-[2px] border-gray-100 pl-4 pr-4 mb-10 rounded-full p-2 font-semibold'
                    onClick={() => {
                      logout().then(() => {
                        navigate("/")
                      })
                    }}>Logout</button>
            </div>
              <div className='mr-10 z-50 bg-gradient-to-r hover:cursor-pointer h-[60%] from-indigo-500 to-pink-400 flex flex-row justify-center items-center rounded-full p-[2px] [@media(max-width:600px)]:mr-5 [@media(max-width:600px)]:w-[40px] [@media(max-width:600px)]:h-[40px] [@media(max-width:600px)]:p-0'>
                <div  
                  className='rounded-full p-[2px] h-[100%] bg-zinc-900 flex flex-row justify-center items-center pl-5  [@media(max-width:600px)]:pl-0 [@media(max-width:600px)]:pr-0 [@media(max-width:600px)]:w-[40px] [@media(max-width:600px)]:h-[40px] '
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowmenu(true)
                  }}>
                    <p className='mr-5 text-xl font-semibold [@media(max-width:600px)]:hidden '>{user && user.name.split(" ")[0]}</p>
                    <img className='h-[100%] w-[8vh] rounded-full [@media(max-width:600px)]:w-[40px] [@media(max-width:600px)]:h-[40px]' src={src}></img>
                </div>
              </div>
              
                
                
            </div>
        </div>
        <div className='min-h-[88vh] flex justify-center items-center'>
                <Outlet/>
        </div>
    </div>
  )
}

export default Home