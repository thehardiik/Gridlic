import React, { useEffect, useState } from 'react'
import { createFile, createPost } from '../appwrite/service'
import { getUser } from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import Sppiner from './Sppiner'



function Create({userId}) {
    const [file, setFile] = useState()
    const [url, setUrl] = useState("")
    const [Caption, setCaption] = useState("")
    const [userData, setUserdata] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUser().then((data) => {
            setUserdata(data.$id)
            
        })
    }, [userData])
    
  return (
     
        

        
        <div className='h-[88vh] flex flex-col justify-center items-center '>

            <div className='w-[35vw]  bg-[#212538] p-4 rounded-2xl [@media(max-width:600px)]:w-[80%] [@media(max-width:600px)]:translate-y-[-8vh]'>

                <div className='h-[10vh]  mb-2 flex items-center justify-between w-full [@media(max-width:600px)]:h-[7vh]'>

                    <input className="rounded-2xl" type='file' onChange={(e) => {
                        setError("")
                        setFile(e.target.files[0])
                        const src = URL.createObjectURL(e.target.files[0])
                        setUrl(src)
                    }}/>

                    <button onClick={() => {
                        setError("")
                        if(!file){
                            setError("Please Upload The file")
                        }else{
                            setLoading(true)
                            createFile({file}).then((data) => {
                                const id = data.$id
                                if(file){
                                    return createPost({Caption, Likes: 0, Grids: 0, featuredImage: id,userID: userData})
                                }
                            }).then(() => {
                                    navigate("/Home/Grid")
                            }).catch(() => {
                                setLoading(false)
                                setError("Something Went wrong")
                            })
                        }
                        
                    }} className='bg-gray-100 text-[#020617] p-2 rounded-lg [@media(max-width:600px)]:h-[90%] [@media(max-width:600px)]:p-[5px]'>Create</button>

                </div>

                <div className='min-h-[40vh]  border-[1px] border-[#020617] flex justify-center rounded-2xl mb-4 [@media(max-width:600px)]:min-h-[35vh]'>
                    <p className='text-red-700 text-sm absolute font-semibold'>{error}</p>
                    <div  className='flex w-[35vw] min-h-[50vh] justify-center items-center absolute'>
                        {loading && <Sppiner/>}
                    </div>
                    <img className='max-h-[50vh] rounded-2xl' src={url}></img>
                </div>
                
                <input 
                    type="text" 
                    className='w-full h-[10vh] p-4 bg-gray-200 text-[#020617] rounded-2xl [@media(max-width:600px)]:h-[7vh]' 
                    placeholder='Enter Caption'
                    value={Caption}
                    onChange={(e) => setCaption(e.target.value)}/>
                
            </div>
            
        </div>
        
        
       
    
  )
}

export default Create
