import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts/postsSlice';
import { subRedditReducer } from '../components/subredditsSlice';


export const store = configureStore({
  reducer: {
    posts: postsReducer,
    subReddits: subRedditReducer
  },
});
