import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addPost } from '../features/posts/postsSlice';
import { searchReddit } from '../app/Reddit';
import { fetchSubRedditPosts } from '../app/Reddit';

import './navbar.css'

export default function SearchBar(){
  const [searchVal, setSearchVal] = useState('')
  const dispatch = useDispatch()

  // const terms = ['halloween', 'candy', 'costumes', 'halloween decorations', 'haunted house'];
  // const randomSearch = terms[Math.floor(Math.random() * terms.length)]

  useEffect(()=>{
      async function myFunction(){ 
        const newPosts = await fetchSubRedditPosts('/r/Home');
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
      <button className='SearchButton' onClick={() => {handleSubmit()}}>Search</button>
    </div>
  )
}