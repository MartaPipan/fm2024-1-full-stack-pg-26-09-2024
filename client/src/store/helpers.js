import { createAsyncThunk } from "@reduxjs/toolkit";

export const decorateAsyncThunk = ({ type, asyncThunk }) => {
    return createAsyncThunk(
        type,   
        async (values, thunkAPI) => {
            try {
                const {
                    data: { data },
                } = await asyncThunk(values);
                return data;
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    );
};
    
//eslint-disable-next-line
export const pedingReducer = (state, action) => {
  state.isPending = true;
  state.error = null;
};

export const rejectedReducer = (state, action) => {
  state.isPending = false;
  state.error = action.payload;
};
