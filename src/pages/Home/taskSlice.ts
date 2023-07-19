import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "../../types/task.type";

interface TaskSlice {
  current: Task | null;
  todoList: Task[];
  history: Task[];
}

const initialState: TaskSlice = {
  current: null,
  todoList: [],
  history: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setCurrent: (state, { payload }: PayloadAction<string>) => {
      state.current =
        state.todoList.find((task) => task.id === payload) ?? null;
    },
    updateTask: (state, { payload }: PayloadAction<Task>) => {
      if (state.current?.id === payload.id) {
        state.current = payload;
      }
      const ind = state.todoList.findIndex((task) => task.id === payload.id);
      if (ind > -1) {
        state.todoList[ind] = payload;
      }
    },
    deleteTask: (state, { payload }: PayloadAction<string>) => {
      if (state.current?.id === payload) {
        state.current = null;
      }
      const ind = state.todoList.findIndex((task) => task.id === payload);
      if (ind > -1) {
        state.todoList.splice(ind, 1);
      }
    },
  },
});

export const { deleteTask, setCurrent, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
