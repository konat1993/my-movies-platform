import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    emailForRegistry: "",
    user: null,
    isSubscribed: null,
    productList: null,
    isLoading: true,
    isError: {
      status: false,
      message: ""
    },
    moviesData: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null
    },
    setProducts: (state, action) => {
      state.productList = action.payload
    },
    emailType: (state, action) => {
      state.emailForRegistry = action.payload
    },
    updateSubscriber: (state, action) => {
      state.isSubscribed = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.isError = action.payload
    },
    setMoviesData: (state, action) => {
      state.moviesData = { ...state.moviesData, ...action.payload }
    }
  },
});

export const { login, logout, emailType, updateSubscriber, setLoading, setError, setMoviesData, setProducts } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectEmail = (state) => state.user.emailForRegistry;
export const selectIsSubscribed = (state) => state.user.isSubscribed;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;
export const selectMoviesData = (state) => state.user.moviesData;
export const selectProductList = (state) => state.user.productList;

export default userSlice.reducer;
