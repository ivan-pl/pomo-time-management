import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Task } from "../../types/task.type";
import { AppThunk } from "../../app/store";
import { selectCurrentTask } from "../../app/selectors";
import { updateTask as updateTaskApi } from "../../services/firebase/updateTask";

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
    setCurrentTask: (state, { payload }: PayloadAction<string>) => {
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
    addNewTask: (state, { payload }: PayloadAction<Task>) => {
      state.todoList.unshift(payload);
    },
    setTodoList: (state, { payload }: PayloadAction<Task[]>) => {
      state.todoList = payload;
    },
    setHistory: (state, { payload }: PayloadAction<Task[]>) => {
      state.history = payload;
    },
  },
});

export const increaseCurrentTask =
  (): AppThunk => async (dispatch, getState) => {
    const currentTask = selectCurrentTask(getState());
    if (currentTask) {
      const updatedTask: Task = {
        ...currentTask,
        actPomodoros: currentTask.actPomodoros + 1,
      };
      dispatch(updateTask(updatedTask));
      updateTaskApi(updatedTask).catch();
    }
  };

export const {
  deleteTask,
  setCurrentTask,
  updateTask,
  addNewTask,
  setTodoList,
  setHistory,
} = taskSlice.actions;
export default taskSlice.reducer;
