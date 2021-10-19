import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectPosts } from "./postsSlice" 
//import { selectComments } from "../comments/commentsSlice"

export default function Posts() {
  const posts = useSelector(selectPosts)
  const [yes, setYes] = useState(posts)

  useEffect(()=>{
    setYes(posts)
  })

    return (
      yes ? <h2>Changed</h2> : <h2>Loading...</h2>
      /*Object.values(posts).map((post) => (
      <div id='post'>
          <h2 id='title'>{post.title}</h2>
          <div className='postData'>
              <p className='data'>{post.timePosted}</p>
              <p className='data'>{post.poster}</p>
          </div>
      </div>
      ))*/
    )
}