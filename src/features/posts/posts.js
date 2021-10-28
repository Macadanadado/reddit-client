import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectPosts, setActivePost } from "./postsSlice" 

export const dateCalculator = (created) => {
  const currentDate = Date.now();
  const postDate = new Date(created * 1000);

  const dateDifferenceInTime = currentDate - postDate;

  const dateDifferenceInMonths = dateDifferenceInTime / (1000 * 3600 * 24 * 30.4);
  const dateDifferenceInDays = dateDifferenceInTime / (1000 * 3600 * 24);
  const dateDifferenceInHours = dateDifferenceInTime / (1000 * 3600);
  const dateDifferenceInMinutes = dateDifferenceInTime / (1000 * 60);

  if (dateDifferenceInMonths > 12) {
      return "more than a year ago";
  } else if (dateDifferenceInMonths >= 1) {
      return Math.round(dateDifferenceInMonths) + " months ago";
  } else if (dateDifferenceInDays >= 1) {
      return Math.round(dateDifferenceInDays) + " days ago";
  } else if (dateDifferenceInHours >= 1) {
      return Math.round(dateDifferenceInHours) + " hours ago";
  } else if (dateDifferenceInMinutes >= 1) {
      return Math.round(dateDifferenceInMinutes) + " minutes ago";
  } else {
      return "less than a minute ago";
  }
}

 export default function Posts() {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const postStyle = {
    color: 'black',
    textDecoration: 'none',
  };

    return (
      Object.values(posts).map((post) => (
        <Link to='/post' key={post.id} style={postStyle} onClick={()=> dispatch(setActivePost(post))}>
          <div id='post'>
              <h2 id='title'>{post.title}</h2>
              <img 
                src={post.url} 
                alt=''
                style={{width: '30%', height: '30%'}} 
                onError={(e)=> e.target.style.display = 'none'}
              />
              <p>{post.content}</p>
              <div className='postData'>
                  <p className='data'>{post.upVotes - post.downVotes} upvotes</p>
                  <p className='data'>{dateCalculator(post.timePosted)}</p>
                  <p className='data'>{post.poster}</p>
                  <p className='data'>{post.numComments}</p>
              </div>
          </div>
        </Link>
      ))
    )
}