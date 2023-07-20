import type { RootState } from "./store";

export const selectAuthCredentials = (state: RootState) => state.auth;

export const selectSettings = (state: RootState) => state.settings;

export const selectCurrentTask = (state: RootState) => state.task.current;

export const selectTodoList = (state: RootState) => state.task.todoList;

export const selectHistory = (state: RootState) => state.task.history;
