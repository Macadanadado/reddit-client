import { createSlice } from "@reduxjs/toolkit";

export const PostsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {
          yourMom: {
            title: "Your Mom",
            poster: "Your Mom",
            timePosted: 'lateLastNight',
            id: 1234
          }
        }
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
        }
    }
})

export const selectPosts = state=> state.posts.posts;
export const { addPost } = PostsSlice.actions;
export const postsReducer =  PostsSlice.reducer