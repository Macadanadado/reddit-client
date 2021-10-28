import { createSlice } from "@reduxjs/toolkit";

export const subRedditSlice = createSlice({
  name: 'subReddits',
  initialState: {
    subReddits: {},
    activeSubReddit: '/r/Home'
  },
  reducers: {
    addSubReddit: (state, action) => { 
      action.payload.forEach(obj=>{
        const {name, url, icon, id} = obj
        state.subReddits[id] = {
          name,
          url,
          icon,
          id
        }
      })
    },
    setActiveSubReddit: (state, action) => {
      state.activeSubReddit = action.payload
    }
  }
})

export const selectSubReddits = state => state.subReddits.subReddits;
export const selectAvtiveSubReddit = state => state.subReddits.activeSubReddit;
export const { addSubReddit, setActiveSubReddit } = subRedditSlice.actions;
export const subRedditReducer = subRedditSlice.reducer