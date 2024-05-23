import React, { useEffect, useState } from 'react'
import { getImage, getPosts, getUserData } from '../appwrite/service'
import PostCard from './PostCard'
import { getUser } from '../appwrite/auth'
import Sppiner from './Sppiner'



function Grid() {

  // To get all the posts
  const [posts, setPosts] = useState([])

  // Array of 5 array of posts
  const [AllPost, setAllpost] = useState([])

  // To collect User Data
  const [userData, setUserdata] = useState()

  // Loading 
  const [loading, setLoading] = useState(true)
  const [postLoading, setPostloading] = useState(true)
  
  useEffect(() => {
    
    // API Call to get all the posts

    getPosts().then((data) => {

      // get all the posts in posts
      setPosts(data.documents)
      
    }).then(() => {

      // get array of 5 array of posts in Allpost

      let chunks = Array.from({ length: 5 }, () => []); // Create an array of 5 empty arrays

      for (let i = 0; i < posts.length; i++) {
        chunks[i % 5].push(posts[i]); // Distribute elements in a round-robin manner
      }

      setAllpost(chunks)
      setPostloading(false)
    })

    // API call to get user Data
    getUser().then((data) => {
      
      return getUserData({id: data.$id})

    }).then((data) => {
      
      setUserdata(data)
      setLoading(false)
    })
   
  })

  if(!loading && !postLoading){
    return (
      <div className='w-[94%]  h-full flex  flex-wrap justify-around [@media(max-width:600px)]:w-[90%]'>
        <div className='w-[19vw] h-full [@media(max-width:600px)]:w-full'>
          {AllPost[0] && AllPost[0].map((post) => {
              // post is object of posts
              return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData={true}/>
          })}
        </div>
        <div className='w-[17vw] h-full [@media(max-width:600px)]:w-full'>
          {AllPost[1] && AllPost[1].map((post) => {
              
              return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} Caption={post.Caption} presentData={true}/>
          })}
        </div>
        <div className='w-[17vw] h-full [@media(max-width:600px)]:w-full'>
          {AllPost[2] && AllPost[2].map((post) => {
              
              return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData={true}/>
          })}
        </div>
        <div className='w-[17vw] h-full [@media(max-width:600px)]:w-full'>
          {AllPost[3] && AllPost[3].map((post) => {
              
              return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData={true}/>
          })}
        </div>
        <div className='w-[17vw] h-full [@media(max-width:600px)]:w-full'>
          {AllPost[4] && AllPost[4].map((post) => {
              
              return <PostCard key={post.featuredImage} user={userData} Likes={post.Likes} userID={post.userID} Grids={post.Grids} featuredImage = {post.featuredImage} postId={post.$id} presentData={true}/>
          })}
        </div>
      </div>
    )
  }

  return (
    <div className='w-[40vw] h-[10vh] flex items-center justify-center'> <Sppiner/> </div>
  )
  
}

export default Grid