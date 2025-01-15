import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: [{ id: v4(), content: 'test task', date: Date.now().toString(), isDone: false }],
  },
  reducers: {
    addTask(state, action) {
      const {
        payload: { content, date },
      } = action;
      state.tasks.push({ id: v4(), content, date, isDone: false });
    },
    removeTask(state, action) {
      const {
        payload: { id },
      } = action;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    setDoneTask(state, action) {
      const {
        payload: { id },
      } = action;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      );
    }, //eslint-disable-next-line
    sortByDate(state, action){
      state.tasks.sort()
    }
  },
});

export const {addTask, removeTask, setDoneTask, sortByDate} = todoSlice.actions;
export default todoSlice.reducer;
