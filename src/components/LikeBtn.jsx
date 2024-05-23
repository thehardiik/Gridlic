import React from 'react'
import { updateLikedPost, updateLikes } from '../appwrite/service'
import { FaHeart } from 'react-icons/fa'

function LikeBtn({isLiked, setIsliked, likeCount, setLikecount, user, postId, size = ""}) {
  return (
    <>
        <div 
            className={`flex ${size} items-start gap-1 hover:text-pink-500 hover:cursor-pointer ${isLiked && "text-pink-500"} [@media(max-width:600px)]:test-ss`}
            onClick={() => {
                if(!isLiked){
                    setLikecount((value) => value + 1)
                    setIsliked((value) => !value)

                    updateLikes({postId, likes: likeCount}).then(() => {
                        user.documents[0].liked.push(postId)
                        return updateLikedPost({arr: user.documents[0].liked, id: user.documents[0].$id})
                    }).then(() => {
                                                
                    }).catch(() => {
                        setLikecount((value) => value - 1)
                        setIsliked((value) => !value)
                    })
                } else {
                    setLikecount((value) => value - 1)
                    setIsliked((value) => !value)
                    updateLikes({postId, likes: likeCount-2}).then(() => {
                        const result = user.documents[0].liked.filter((id) => {
                            return id !== postId
                        })
                        return updateLikedPost({arr: result, id: user.documents[0].$id})
                    }).then(() => {
                                                
                    }).catch(() => {
                        setLikecount((value) => value + 1)
                        setIsliked((value) => !value)
                    })

                }
                                       
            }}>
            <FaHeart/>
            {likeCount}
        </div>
    </>
  )
}

export default LikeBtn