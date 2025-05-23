import { createSlice } from '@reduxjs/toolkit';

const likeSlice = createSlice({
  name: 'like',
  initialState: [],
  reducers: {
    toggleLike: (state, action) => {
      const id = action.payload;
      const index = state.indexOf(id);
      if (index === -1) {
        state.push(id);
      } else {
        state.splice(index, 1);
      }
    }
  }
});

export const { toggleLike } = likeSlice.actions;
export default likeSlice.reducer;
