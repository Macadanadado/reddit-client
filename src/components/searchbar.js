import { useState, useEffect } from 'react';
import { addPost } from '../features/posts/postsSlice';
import { useDispatch } from 'react-redux';

export default function SearchBar(){
    const [searchVal, setSearchVal] = useState('')
    const dispatch = useDispatch()

    useEffect(async ()=> {
        const data = await searchReddit('halloween')
      dispatch(addPost(data))
    },[])
    
    const searchReddit = async (searchVal) => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${searchVal}&type=link`
        );
        const jsonResponse = await response.json();
        console.log(jsonResponse)
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
                id: data.id
            };
        });
    }

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