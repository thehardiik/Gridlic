import React from 'react'
import {useLocation} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { getUserPosts, getUserData} from '../appwrite/service'
import { getUser  } from '../appwrite/auth'
import PostCard from './PostCard'
import { motion } from "framer-motion"
import Sppiner from './Sppiner'

function Profile() {
    const location = useLocation()
    const [AllPost, setAllpost] = useState([])
    const [posts, setPosts] = useState([])
    const [userData, setUserdata] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        getUserPosts({id: location.state.creatorData.userID}).then((data) => {
            setPosts(data.documents)
        }).then(() => {
            let chunks = Array.from({ length: 5 }, () => []); // Create an array of 5 empty arrays

            for (let i = 0; i < posts.length; i++) {
            chunks[i % 5].push(posts[i]); // Distribute elements in a round-robin manner
            }       
            
            setAllpost(chunks)
        })

        getUser().then((data) => {
      
            return getUserData({id: data.$id})
      
          }).then((data) => {
            console.log(data)
            setUserdata(data)
            setLoading(false)
          })
          console.log(loading)
          console.log(userData)
          
        
    })
    
    if(!loading){

        return (
            <div className='min-h-[88vh] w-full flex  flex-col items-center'>
                <div className='h-[45vh] w-[94vw]  flex flex-col justify-center items-center border-b-[1px] [@media(max-width:600px)]:h-[30vh]'>
                    <motion.div 
                        className='w-[10vw] h-[10vw] rounded-full p-1 bg-gradient-to-r  from-indigo-500 to-pink-400 hover:bg-gradient-to-b hover:to-indigo-500 hover:from-pink-400 [@media(max-width:600px)]:h-[30vw] [@media(max-width:600px)]:w-[30vw]'
                        animate={{ rotate: 360 }}
                        >
                        <img className='h-full w-full rounded-full' src={location.state.profile}/>
                    </motion.div>
                    <h1 className='text-[4vw] font-semibold text-gray-100 tracking-wide'>{location.state.creatorData.name}</h1>
                </div>
                <div className='bg-zinc-900  mt-10 w-full min-h-screen items-center flex flex-col'>
                    <div className='w-[94%]  h-full flex flex-wrap justify-around'>
                        <div className='w-[19vw] h-full [@media(max-width:600px)]:w-full'>
                        {AllPost[0] && AllPost[0].map((post) => {
                            
                            return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData = {false} Caption={post.Caption}/>
                        })}
                        </div>
                        <div className='w-[17vw] h-full [@media(max-width:600px)]:w-full'>
                        {AllPost[1] && AllPost[1].map((post) => {
                            
                            return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData = {false} Caption={post.Caption}/>
                        })}
                        </div>
                        <div className='w-[17vw] h-full [@media(max-width:600px)]:w-full'>
                        {AllPost[2] && AllPost[2].map((post) => {
                            
                            return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData = {false} Caption={post.Caption}/>
                        })}
                        </div>
                        <div className='w-[17vw] h-full [@media(max-width:600px)]:w-full'>
                        {AllPost[3] && AllPost[3].map((post) => {
                            
                            return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData = {false} Caption={post.Caption}/>
                        })}
                        </div>
                        <div className='w-[17vw] h-full [@media(max-width:600px)]:w-full'>
                        {AllPost[4] && AllPost[4].map((post) => {
                            
                            return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData = {false} Caption={post.Caption}/>
                        })}
                        </div>
                    </div>
                </div>
            </div>
          )

    } else {
        return (
            <div className='text-gray-50 w-full flex justify-center items-center'>
                <div className='w-1/3 flex justify-center items-center'><Sppiner/></div>
            </div>
        )
    }
  
}

export default Profile
