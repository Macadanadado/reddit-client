import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchPostComments } from "../../app/Reddit"
import { selectActivePost, selectActivePostComments, setActivePostComments } from '../posts/postsSlice';

export default function Comments(){
  const post = useSelector(selectActivePost)
  const comments = useSelector(selectActivePostComments)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function fetchFunction(){
      const yes = await fetchPostComments(post.permalink);
      dispatch(setActivePostComments(yes));
    }

    fetchFunction()
  },[])
  

  return(
    <section className='comments'>
      {Object.values(comments).map(comment=>(
        <div key={comment.id} className='comment'>
          <p className='poster'>{comment.poster}</p>
          <p className='content'>{comment.comment}</p>
        </div>
    ))}
    </section>
  )
}