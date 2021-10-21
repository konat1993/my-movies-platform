import { createSlice } from '@reduxjs/toolkit';

export const myCustomValueSlice = createSlice({
  name: 'counter',
  initialState: {
    myCustomValue: 0
  },
  reducers: {
    increment: (state) => {
      state.myCustomValue += 1;
    }
  },
});

export const { increment  } = myCustomValueSlice.actions;

export const selectMyCustomValue = (state) => state.counter.myCustomValue;

export default myCustomValueSlice.reducer;
