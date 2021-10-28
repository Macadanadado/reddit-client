import { useSelector } from 'react-redux';
//import { useEffect } from 'react';

import Comments from '../comments/comments'
import { selectActivePost } from '../posts/postsSlice';
import { dateCalculator } from './posts';
import './post.css';


export default function Post() {
  const post = useSelector(selectActivePost);

  return(
    <div id='postWithComments'>
      <div id='post'>
        <h2 id='title'>{post.title}</h2>
          <img 
          src={post.url} 
          alt=''
          style={{width: '30%', height: '30%'}} 
          onError={(e)=> e.target.style.display = 'none'}
        />
          <p id='content'>{post.content}</p>
          <div className='postData'>
             <p className='data'>{post.upVotes - post.downVotes} upvotes</p>
              <p className='data'>{dateCalculator(post.timePosted)}</p>
              <p className='data'>{post.numComments}</p>
          </div>
      </div>
      <Comments />
    </div>
  )
}





