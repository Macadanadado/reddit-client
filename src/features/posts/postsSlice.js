import { createSlice } from "@reduxjs/toolkit";

export const PostsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {
          /* yourMom: {
            title: "Your Mom",
            poster: "Your Mom",
            timePosted: 'lateLastNight',
            id: 1234
          } */
        },
        activePost: {}
    },
    reducers: {
        addPost: (state, action) =>{//passed object {title, poster, timeposted,downVotes, upvotes id} from searchbar.js || passed array[{obj1}, {obj2},...]
          state.posts = {}
          action.payload.forEach(obj => {
            const {title, poster, timePosted, downVotes, upVotes, numComments, permalink, url, id} = obj
            state.posts[id] = {
                title,
                poster,
                timePosted,
                downVotes,
                upVotes,
                numComments,
                permalink,
                url,
                id
            }
          })  
        },
        setActivePost: (state, action) => {
          state.activePost = action.payload
        }
    }
})

export const selectPosts = state=> state.posts.posts;
export const selectActivePost = state => state.posts.activePost;
export const { addPost, setActivePost } = PostsSlice.actions;
export const postsReducer =  PostsSlice.reducer