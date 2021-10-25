import { configureStore } from '@reduxjs/toolkit';
import userReduce from '../features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReduce,
  },
});
