import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addPost } from '../features/posts/postsSlice';
import { searchReddit } from '../app/Reddit';

export default function SearchBar(){
  const [searchVal, setSearchVal] = useState('')
  const dispatch = useDispatch()

  useEffect(async ()=> {
    const data = await searchReddit('halloween')
    dispatch(addPost(data))
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
    <div>
      <input placeholder='Search' onChange={(e) => setSearchVal(e.target.value)} onKeyPress={(e) => handleKeyPress(e)}/>
      <button className='SearchButton' onClick={() => {handleSubmit()}/*just pass handleSubmit for constant update of state? */}>Sumbit</button>
    </div>
  )
}