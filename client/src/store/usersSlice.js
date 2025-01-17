import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, postUser } from "../api";
import { decorateAsyncThunk, pedingReducer, rejectedReducer } from "./helpers";

export const createUser = decorateAsyncThunk({
  type: "users/createUser",
  asyncThunk: postUser,
});

export const getUsers = decorateAsyncThunk({
  type: "users/getUsers",
  asyncThunk: getAllUsers,
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    isPending: false,
  },
  reducers: {}, //якісь дії,які можна зробити на клієнті не звертаючись до сервера
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, pedingReducer);
    builder.addCase(getUsers.pending, pedingReducer);

    builder.addCase(createUser.rejected, rejectedReducer);
    builder.addCase(getUsers.rejected, rejectedReducer);

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.users.push(action.payload);
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isPending = false;
      state.users = action.payload;
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
