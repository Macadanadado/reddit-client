import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchPostData } from "../../app/Reddit"
import { selectActivePost, selectActivePostComments, setActivePostComments } from '../posts/postsSlice';

export default function Comments(){
  const post = useSelector(selectActivePost)
  const comments = useSelector(selectActivePostComments)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function fetchFunction(){
      const jsonResponse = await fetchPostData(post.permalink);
      const yes = jsonResponse[1].data.children.map(user=>{
        const userComment = user.data;
        return {
          poster: userComment.author,
          comment: userComment.body,
          id: userComment.id
        }
      })
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