import React, { useEffect, useState } from 'react'
import { createAvatar, createUser } from '../appwrite/service'
import { getUser } from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'

function Signupprofile() {
    const [available, setAvailable] = useState(false)
    const [file, setFile] = useState()
    const [url, setUrl] = useState("")
    const [userData, setUserdata] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState("")

    useEffect(() => {
        getUser().then((data) => {
            setUserdata(data)
        })
    })

  return (
    <>
        <div className='w-[15vw] h-[15vw] mt-[25%] rounded-full border-4 border-[#FFAA80] flex justify-center items-center [@media(max-width:600px)]:w-[30vw] [@media(max-width:600px)]:h-[30vw] [@media(max-width:600px)]:border-[2px] [@media(max-width:600px)]:mt-[35vh]'>

            {available && <img src={url} className='w-[15vw] h-[15vw] rounded-full p-1 [@media(max-width:600px)]:w-[30vw] [@media(max-width:600px)]:h-[30vw]'></img>}

            {!available &&  <input 
                type="file"
                className='flex justify-center text-bold text-1xl items-center text-[0vw]
                           file:bg-[#FFAA80] file:border-0 file:text-sm file:p-2 file:rounded-full file:mr-10 hover:cursor-pointer'
                onChange={(e) => {
                    setFile(e.target.files[0])
                    const src = URL.createObjectURL(e.target.files[0])
                    setAvailable(true)
                    setUrl(src)
                }}
                />}

                   
        </div>
        <button 
            className='h-10  w-1/3 bg-[#FFAA80] mt-5 text-sm rounded-3xl p-2 [@media(max-width:600px)]:text-zinc-900'
            onClick={() => {
                if(file){
                    createAvatar({file}).then((data) => {
                    
                        const profile = data.$id
    
                        if(profile){
                            createUser({name: userData.name , profile: profile, userID: userData.$id})
                            navigate("/Home")
                        }
                    }).catch(() => {
                        setError("Something Went Wrong")
                    })
                }else{
                    setError("Please select a file")
                }
            }}>Upload Avatar</button>
        <p className='mt-10 text-sx font-semibold [@media(max-width:600px)]:text-gray-100'>Upload Avatar to mover forward</p>
        <p className='mt-5 text-sx font-bold text-red-700'>{error}</p>
        
        
    </>
  )
}

export default Signupprofile