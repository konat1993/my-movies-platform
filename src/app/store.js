import { configureStore } from '@reduxjs/toolkit';
import myCustomValueReduces from '../features/myCustomValueSlice';

export const store = configureStore({
  reducer: {
    myCustomValue: myCustomValueReduces,
  },
});
