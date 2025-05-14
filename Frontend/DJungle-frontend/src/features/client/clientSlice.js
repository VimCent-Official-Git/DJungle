import { createSlice } from '@reduxjs/toolkit';
import { getClientProfile, createEvent } from './clientThunks';

const initialState = {
  profile: null,
  events: [],
  status: 'idle',
  error: null
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    resetClientState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Get Client Profile
      .addCase(getClientProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getClientProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.user;
        state.events = action.payload.events || [];
      })
      .addCase(getClientProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { resetClientState } = clientSlice.actions;
export default clientSlice.reducer;