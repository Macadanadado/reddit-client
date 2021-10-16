import { configureStore } from '@reduxjs/toolkit';
import { searchBarReducer } from '../components/searchBarSlice';


export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer
  },
});
