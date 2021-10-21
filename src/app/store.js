import { configureStore } from '@reduxjs/toolkit';
import myCustomValueReduces from '../features/counter/myCustomValueSlice';

export const store = configureStore({
  reducer: {
    myCustomValue: myCustomValueReduces,
  },
});
