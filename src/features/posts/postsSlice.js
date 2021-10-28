import { createSlice } from "@reduxjs/toolkit";

export const PostsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {},
        activePost: {},
        activePostComments: {}
    },
    reducers: {
        addPost: (state, action) =>{//passed object {title, poster, timeposted,downVotes, upvotes id} from searchbar.js || passed array[{obj1}, {obj2},...]
          state.posts = {}
          action.payload.forEach(obj => {
            //const {title, poster, timePosted, downVotes, upVotes, numComments, permalink, url, content id} = obj
            state.posts[obj.id] = obj
            //{
            //     title,
            //     poster,
            //     timePosted,
            //     downVotes,
            //     upVotes,
            //     numComments,
            //     permalink,
            //     url,
            //     id
            // }
          })  
        },
        setActivePost: (state, action) => {//passed object {title, poster, timeposted,downVotes, upvotes id}
          state.activePost = action.payload
        },
        setActivePostComments: (state, action) => {
          state.activePostComments = {}
          action.payload.forEach(obj => {
            const {poster, comment, id} = obj
            state.activePostComments[id] = {
              poster,
              comment,
              id
            }
          })
          }
        }
})

export const selectPosts = state=> state.posts.posts;
export const selectActivePost = state => state.posts.activePost;
export const selectActivePostComments = state => state.posts.activePostComments
export const { addPost, setActivePost, setActivePostComments } = PostsSlice.actions;
export const postsReducer =  PostsSlice.reducer