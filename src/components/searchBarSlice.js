import { createSlice } from "@reduxjs/toolkit";

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        posts: {}
    },
    reducers: {
        addPost: (state, action) =>{//passed object {title, poster, timeposted, id} from searchbar.js || passed array[{obj1}, {obj2},...]
          state.posts = {}
          action.payload.forEach(obj => {
            const {title, poster, timePosted, id} = obj
            state.posts[id] = {
                title,
                poster,
                timePosted,
                id
            }
          })  
          /*const {title, poster, timePosted, id} = action.payload
            state.posts[id] = {
                title,
                poster,
                timePosted,
                id
            }*/
        }
    }
})

export const selectPosts = state=> state.searchBar.posts;
export const { addPost, resetStore } = searchBarSlice.actions;
export const searchBarReducer =  searchBarSlice.reducer