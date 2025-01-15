import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
  name: 'count',
  initialState: {
    count: 0,
  },
  reducers: {
    //methods
    add(state, action) {
      const { step } = action.payload;
      state.count += step;
    },
    sub(state, action) {
      const { step } = action.payload;
      state.count -= step;
    },
  },
});

export const { add, sub } = countSlice.actions;
export default countSlice.reducer;
