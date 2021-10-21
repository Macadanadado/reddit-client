import './post.css';
import { useSelector } from 'react-redux';
// import { selectComments } from '../comments/commentsSlice.js'
import { selectActivePost } from '../posts/postsSlice';
import { dateCalculator } from './posts';


export default function Post() {
  // const comments = useSelector(selectComments);
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
          <p id='content'>postContent</p>
          <div className='postData'>
             <p className='data'>{post.upVotes - post.downVotes} upvotes</p>
              <p className='data'>{dateCalculator(post.timePosted)}</p>
              <p className='data'>{post.numComments}</p>
          </div>
      </div>
      
    </div>
  )
}





