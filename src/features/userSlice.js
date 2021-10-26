import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    emailForRegistry: ""
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null
    },
    emailType: (state, action) => {
      state.emailForRegistry = action.payload
    }
  },
});

export const { login, logout, emailType } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectEmail = (state) => state.user.emailForRegistry;

export default userSlice.reducer;
