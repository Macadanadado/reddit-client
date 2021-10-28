import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";

import { setActiveSubReddit, selectSubReddits, selectAvtiveSubReddit, addSubReddit } from "./subredditsSlice";
import redditLogo from '../images/reddit-logo.png'
import { fetchSubReddits, fetchSubRedditPosts } from "../app/Reddit";
import { useEffect } from "react";
import { addPost } from "../features/posts/postsSlice";



export default function SubReddits() {
  const subReddits = useSelector(selectSubReddits)
  const activeSub = useSelector(selectAvtiveSubReddit)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function myFunction(){
      const subRedditsArr = await fetchSubReddits();
      dispatch(addSubReddit(subRedditsArr))
    }
    myFunction()
  },[])

  return(
    <section>
      <ul>
        {Object.values(subReddits).map(sub=> (
          <li key={sub.id} style={{listStyleType: 'none'}}>
            <Link 
            to='/' 
            onClick={()=>{
              async function myFunction(){
                dispatch(setActiveSubReddit(sub.url));  
                const newPosts = await fetchSubRedditPosts(sub.url);
                dispatch(addPost(newPosts));
              }
              myFunction()
            }}>
              <div>
                <img 
                src={sub.icon} 
                alt=''
                style={{width: '30px', height: '30px', borderRadius: '50%'}}
                onError={(e)=> e.target.src = redditLogo}
                />
                <p>{sub.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>  
    </section>
  )
}