import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, postUser, getOneUser, updateOneUser, deleteOneUser } from "../api";
import { decorateAsyncThunk, pedingReducer, rejectedReducer } from "./helpers";

export const createUser = decorateAsyncThunk({
  type: "users/createUser",
  asyncThunk: postUser,
});

export const getUsers = decorateAsyncThunk({
  type: "users/getUsers",
  asyncThunk: getAllUsers,
});

export const getUser = decorateAsyncThunk({
  type: "users/getUser",
  asyncThunk: getOneUser,
});

export const updateUser = decorateAsyncThunk({
  type: "users/updateUser",
  asyncThunk: updateOneUser,
});

export const deleteUser = decorateAsyncThunk({
  type: "users/deleteUser",
  asyncThunk: deleteOneUser,
});


const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    isPending: false,
    userAuth: null,
    userCurrent: null,
  },
  reducers: {}, //якісь дії,які можна зробити на клієнті не звертаючись до сервера
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, pedingReducer);
    builder.addCase(getUsers.pending, pedingReducer);
    builder.addCase(getUser.pending, pedingReducer);
    builder.addCase(updateUser.pending, pedingReducer);
    builder.addCase(deleteUser.pending, pedingReducer);

    builder.addCase(createUser.rejected, rejectedReducer);
    builder.addCase(getUsers.rejected, rejectedReducer);
    builder.addCase(getUser.rejected, rejectedReducer);
    builder.addCase(updateUser.rejected, rejectedReducer);
    builder.addCase(deleteUser.rejected, rejectedReducer);

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.userAuth = action.payload;//state.users.push(action.payload)>>> dou um nome para user que ja se registro
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.users = action.payload;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.userCurrent = action.payload;
    });
   
      // Оновлюємо список користувачів:
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.users = state.users.map((user) => user.id === action.payload.id ? action.payload : user);
    });
    /**
     * Після успішного виконання updateUser оновлюємо список користувачів у стані state.users.
Знаходимо користувача за id, який був оновлений (user.id === action.payload.id).
Замінюємо його новими даними з action.payload (які повертає сервер після оновлення).
     */
    
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });/**Використовуємо метод filter, щоб залишити всіх користувачів, чий id не збігається з id користувача, який потрібно видалити. */
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
