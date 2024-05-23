import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useLocation} from "react-router-dom"
import { FaHeart } from 'react-icons/fa'
import { updateLikedPost, updateLikes, updateGrids, downloadPost } from '../appwrite/service'
import LikeBtn from './LikeBtn'

function PostPage() {
    // state management 
    const location = useLocation()
    
    // To store whether the post is liked
    const [isLiked, setIsliked] = useState(location.state.isLiked)

    // Number of Likes
    const [likeCount, setLikecount] = useState(location.state.Likes)
   
   

  return (
    <div className='min-h-[88vh] w-full flex justify-center items-center'>
        <div className='w-[60%] min-h-[55vh] mt-2 flex flex-row flex-wrap mb-5 bg-gray-100 rounded-3xl [@media(max-width:600px)]:min-h-[100vh] [@media(max-width:600px)]:bg-zinc-900 [@media(max-width:600px)]:mt-2 [@media(max-width:600px)]:ml-0 [@media(max-width:600px)]:w-[80vw]'>
            <div className='w-[55%] h-full  p-2 rounded-3xl [@media(max-width:600px)]:w-full [@media(max-width:600px)]:h-1/2 [@media(max-width:600px)]:bg-gray-100 '>
                <img src={location.state.src} className='rounded-3xl'></img>
                <div className='w-full flex flex-row justify-between mt-2 mb-2 [@media(max-width:600px)]:mb-0'>
                    <p className='text-lg ml-4  '>{location.state.Caption}</p>
                    <div className='flex flex-row mr-3'>
        
                    <LikeBtn isLiked={isLiked} setIsliked={setIsliked} likeCount={likeCount} setLikecount={setLikecount} user={location.state.user} postId={location.state.postId} size='text-3xl [@media(max-width:600px)]:text-[7vw]'/>
                    
                    
                    </div>
                </div>
                
            </div>
            <div className='w-[45%] min-h-[55vh] p-2 rounded-3xl [@media(max-width:600px)]:w-full'>
                <div className='flex flex-row mt-4'>
                    <div className='w-[7vh] h-[7vh] rounded-full bg-green-600 [@media(max-width:600px)]:hidden'>
                        <img src={location.state.profile} className='h-full w-full rounded-full'></img>
                        
                    </div>
                    <div className='text-slate-700  flex flex-col  ml-2  h-[7vh] [@media(max-width:600px)]:hidden'>
                        <p className='text-xs leading-1'>Post By</p>
                        <p className='font-semibold tracking-wide text-xl'>{location.state.creatorData.name}</p>
                    </div>
                </div>
                <div className='w-full mt-[45%] [@media(max-width:600px)]:mt-2'>
                    <div className='w-full  flex justify-center text-justify items-center text-xs  [@media(max-width:600px)]:text-gray-100'>
                            <p>Help {location.state.creatorData.name} gain Grid Points! <br/>Copy the link or download the photo.</p>
                    </div>

                    <div className='mt-4 gap-5 flex justify-center items-center w-full '>
                            <button 
                                className='bg-slate-900 text-white text-sm w-[35%] p-2 rounded-xl [@media(max-width:600px)]:bg-gray-100 [@media(max-width:600px)]:text-zinc-900'
                                onClick={() => {
                                    navigator.clipboard.writeText(location.state.src)
                                    updateGrids({postId: location.state.postId, grids: location.state.Grids}).then(() => {
                                        console.log('success')
                                    })
                                }}>Copy</button>
                            <button   
                                className='bg-slate-900 text-white text-sm w-[35%] p-2 rounded-xl [@media(max-width:600px)]:bg-gray-100 [@media(max-width:600px)]:text-zinc-900'
                                onClick={() => {
                                    downloadPost({fileId: location.state.featuredImage}).then((data) => {
                                        window.open(data.href)
                                        return updateGrids({postId: location.state.postId, grids: location.state.Grids}).then(() => {
                                            
                                        })
                                    }).then(() => {
                                        console.log('success')
                                    })
                                }}>Download</button>
                    </div>
                </div>
                
                
                
            </div>
        </div>
    </div>
    
  )
}

export default PostPage