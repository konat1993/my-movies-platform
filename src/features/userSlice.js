import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    emailForRegistry: "",
    isSubscribed: null
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
    },
    updateSubscriber: (state, action) => {
      state.isSubscribed = action.payload
    }
  },
});

export const { login, logout, emailType, updateSubscriber } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectEmail = (state) => state.user.emailForRegistry;
export const selectIsSubscribed = (state) => state.user.isSubscribed;

export default userSlice.reducer;
