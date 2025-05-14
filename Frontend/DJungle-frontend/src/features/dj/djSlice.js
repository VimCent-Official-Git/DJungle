import { createSlice } from '@reduxjs/toolkit';
import { getDJProfile, createPost } from './djThunks';

const initialState = {
  profile: null,
  posts: [],
  status: 'idle',
  error: null
};

const djSlice = createSlice({
  name: 'dj',
  initialState,
  reducers: {
    resetDJState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Get DJ Profile
      .addCase(getDJProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDJProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.user;
        state.posts = action.payload.posts || [];
      })
      .addCase(getDJProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { resetDJState } = djSlice.actions;
export default djSlice.reducer;