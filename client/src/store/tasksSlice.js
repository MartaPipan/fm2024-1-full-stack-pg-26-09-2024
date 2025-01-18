import { createSlice } from "@reduxjs/toolkit";
import {
    getAllTasks, postTask, getOneTask, updateOneTask, deleteOneTask
} from "../api";
import { decorateAsyncThunk, pedingReducer, rejectedReducer } from "./helpers";

export const createTask = decorateAsyncThunk({
  type: "users/createTask",
  asyncThunk: postTask,
});

export const getTasks = decorateAsyncThunk({
  type: "users/getTasks",
  asyncThunk: getAllTasks,
});

export const getTask = decorateAsyncThunk({
  type: "users/getTask",
  asyncThunk: getOneTask,
});

export const updateTask = decorateAsyncThunk({
  type: "users/updateTask",
  asyncThunk: updateOneTask,
});

export const deleteTask = decorateAsyncThunk({
  type: "users/deleteTask",
  asyncThunk: deleteOneTask,
});


const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [], // Список завдань
    error: null,
    isPending: false,
    taskAuth: null, // Нове завдання після створення
    taskCurrent: null, // Поточне завдання
  },
  reducers: {}, // Локальні дії
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, pedingReducer);
    builder.addCase(getTasks.pending, pedingReducer);
    //builder.addCase(getTasks.pending, (state) => {pedingReducer(state);state.tasks = []; }); // Limpa os dados específicos de tasks
    builder.addCase(getTask.pending, pedingReducer);
    builder.addCase(updateTask.pending, pedingReducer);
    builder.addCase(deleteTask.pending, pedingReducer);

    builder.addCase(createTask.rejected, rejectedReducer);
    builder.addCase(getTasks.rejected, rejectedReducer);
    builder.addCase(getTask.rejected, rejectedReducer);
    builder.addCase(updateTask.rejected, rejectedReducer);
    builder.addCase(deleteTask.rejected, rejectedReducer);

    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.tasks.push(action.payload); // Додаємо нове завдання
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.tasks = action.payload; // Зберігаємо список завдань
    });

    builder.addCase(getTask.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.taskCurrent = action.payload; // Зберігаємо поточне завдання
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      ); // Оновлюємо список завдань
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isPending = false;
      state.error = null;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id); // Видаляємо завдання
    });
  },
});

export default tasksSlice.reducer;
