import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, postUser } from "../api";

export const createUser = createAsyncThunk(
  "users/createUser",
  async ( values, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await postUser(values);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ page, amount }, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await getAllUsers(page, amount);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    isPending: false,
  },
  reducers: {}, //якісь дії,які можна зробити на клієнті не звертаючись до сервера
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.users.push (action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.payload;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isPending = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isPending = false;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;

/**
createAsyncThunk — це функція з бібліотеки Redux Toolkit, яка спрощує роботу з асинхронними операціями в Redux. Вона дозволяє створювати асинхронні дії (thunk), які можуть відправляти запити на сервер (наприклад, отримання даних з API) і автоматично обробляти стани завантаження, успішної відповіді або помилки.
dispatch використовується для запуску дій в Redux. Наприклад, щоб викликати асинхронну дію fetchUserById і отримати дані
Таким чином, createAsyncThunk дозволяє легко працювати з асинхронними запитами, а dispatch викликає дію і змінює стан Redux.
 * pending — коли запит починається.
fulfilled — коли запит успішно завершено.
rejected — коли запит завершився помилкою.
 */
