import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addPost } from './searchBarSlice';
import { useDispatch } from 'react-redux';

export default function SearchBar(){
    const [searchVal, setSearchVal] = useState('')
    const dispatch = useDispatch()
    
    const searchReddit = async (searchVal) => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${searchVal}&type=link`
        );
        const jsonResponse = await response.json();
        
        return jsonResponse.data.children.map(post => {
            const data = post.data;
            return {
                title: data.title,
                poster: data.author,
                timePosted: data.created,
                id: uuidv4()
            };
        });
    }

    const handleSubmit = async () => {
        const data = await searchReddit(searchVal)
        dispatch(addPost(data))
        /*data.forEach(obj => {
            dispatch(addPost(obj))
        })*/
    }

    return(
        <div>
            <input placeholder='Search' onChange={(e) => setSearchVal(e.target.value)}/>
            <button className='SearchButton' onClick={() => {handleSubmit()}}>Sumbit</button>
        </div>
    )
}