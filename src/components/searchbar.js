import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addPost } from '../features/posts/postsSlice';
import { searchReddit } from '../app/Reddit';
import { fetchPostData } from '../app/Reddit';

import './navbar.css'

export default function SearchBar(){
  const [searchVal, setSearchVal] = useState('')
  const dispatch = useDispatch()

  // const terms = ['halloween', 'candy', 'costumes', 'halloween decorations', 'haunted house'];
  // const randomSearch = terms[Math.floor(Math.random() * terms.length)]

  useEffect(()=>{
      async function myFunction(){ 
        const jsonResponse = await fetchPostData('/r/Home');
        const newPosts = jsonResponse.data.children.map(post => {
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
        dispatch(addPost(newPosts));
    }
    // async function fetchFunction(){
    //   const data = await searchReddit(randomSearch);
    //   dispatch(addPost(data));
    //fetchFunction()
    myFunction();
  },[])

  const handleSubmit = async () => {
    const data = await searchReddit(searchVal)
    dispatch(addPost(data))
  }

  const handleKeyPress = e => {
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }

  return(
    <div className='searchBar'>
      <input placeholder='Search' 
      onChange={(e) => setSearchVal(e.target.value)} 
      onKeyPress={(e) => handleKeyPress(e)}/>
      <button className='searchButton' onClick={() => {handleSubmit()}}>Search</button>
    </div>
  )
}