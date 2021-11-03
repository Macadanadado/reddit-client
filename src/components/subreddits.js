import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";

import { setActiveSubReddit, selectSubReddits, selectActiveSubReddit, addSubReddit } from "./subredditsSlice";
import redditLogo from '../images/reddit-logo.png'
import { fetchSubReddits, fetchPostData } from "../app/Reddit";
import { useEffect } from "react";
import { addPost } from "../features/posts/postsSlice";

import './navbar.css'



export default function SubReddits() {
  const subReddits = useSelector(selectSubReddits)
  const activeSub = useSelector(selectActiveSubReddit)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function myFunction(){
      const subRedditsArr = await fetchSubReddits();
      dispatch(addSubReddit(subRedditsArr))
    }
    myFunction()
  },[])


  async function helperFunction(url){
    const jsonResponse = await fetchPostData(url)
    return jsonResponse.data.children.map(post => {
      const data = post.data;
       return {
        title: data.title,
        poster: data.author,
        timePosted: data.created,
        downVotes: data.downs,
        upVotes: data.ups,
        numComments: data.num_comments,
        permalink: data.permalink,
        url: data.url,
        content: data.selftext,
        id: data.id
      }
    })
  }

  return(
    <section id='subreddits'>
      <ul>
        {Object.values(subReddits).map(sub=> (
          <li key={sub.id} className={sub.url === activeSub.url ? 'activeSub' : 'undefined'}>
            <Link 
            to='/' 
            className='sub'
            onClick={()=>{
              async function myFunction(){
                dispatch(setActiveSubReddit(sub));  
                const newPosts = await helperFunction(sub.url);
                dispatch(addPost(newPosts));
              }
              myFunction()
            }}>
              <div>
                <img 
                src={sub.icon} 
                alt=''
                onError={(e)=> e.target.src = redditLogo}
                />
                <p className='subName'>{sub.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>  
    </section>
  )
}