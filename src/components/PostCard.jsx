import React, { useEffect, useState } from 'react'
import { getAvatar, getImage, getUserData} from '../appwrite/service'
import { IoGrid } from "react-icons/io5";
import {Link} from "react-router-dom"
import LikeBtn from './LikeBtn';
import Sppiner from './Sppiner';



function PostCard({featuredImage, Likes = 0, Grids = 0, user, postId = 0, userID, Caption="", presentData = true}) {

    // link to image of post
    const [src, setSrc] = useState("")

    // To check if user has already liked the post
    const [isLiked, setIsliked] = useState()

    // to store the number of likes
    const [likeCount, setLikecount] = useState(Likes)

    // to store the creator data
    const [creatorData, setCreatorData] = useState()

    // link to profile photo of creator
    const [profile, setProfile] = useState("https://i.pinimg.com/564x/47/ba/71/47ba71f457434319819ac4a7cbd9988e.jpg")
    
    // Loading 
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {

        // TO get link of a post
        getImage({fileId: featuredImage}).then((data) => {
            setSrc(data.href)
            
                setLoading(false)
            
        })

        // To get data about creator of Post and his profile photo
        getUserData({id: userID}).then((udata) => {
            setCreatorData(udata.documents[0])
            return getAvatar({fileId: udata.documents[0].profile})
        
        }).then((hdata) => {
                
            if(hdata.href) setProfile(hdata.href)
                
        })
    
        
    
        // Check the status of liked and 
        if(user && user.documents[0].liked.includes(postId)){  
            setIsliked(true)       
        }
            
        setLikecount(Likes)


    }, [])

   
    if(!loading){

        return (
            <>  
                <div className='flex flex-col mb-4 w-[100%]'>

                    <div className='w-[100%] mb-2'>
                        
                        <Link to="/Home/Post" state={{Likes, src, profile, creatorData, Caption, isLiked, postId, likedPost: user.documents[0].liked, id: user.documents[0].$id, Grids, featuredImage , user: user}}>
                            <img className="w-[100%] h-auto rounded-lg hover:shadow-2xl hover:shadow-zinc-950 hover:border-[2px] hover:border-zinc-900" src={src}></img>
                        </Link>  

                    </div>

                    {presentData && <div className='w-[100%] flex flex-row justify-between'>
                                        <div className={`ml-1 h-4 w-4 rounded-full`}>
                                            <Link to="/Home/User" state={{profile, creatorData, userData : user.documents[0]}}>
                                                <img src={profile} className='w-full h-full rounded-full'></img>
                                            </Link>
                    
                                        </div>
                                        <div className='mr-2 flex flex-row gap-3 text-sm text-gray-100'>
                                            <LikeBtn isLiked={isLiked} setIsliked={setIsliked} likeCount={likeCount} setLikecount={setLikecount} user={user} postId={postId}/>
                                            <div className='flex items-start gap-1 hover:text-pink-500 hover:cursor-pointer'>
                                                <IoGrid />
                                                {Grids}
                                            </div>
                                        </div>
                                    </div>}
                    
        
                </div>
                
            </>
          )

    } else {
        <div className='text-gray-100'>
            <Sppiner/>
        </div>
    }
  
}

export default PostCard