import type { RootState } from "./store";

export const selectAuthCredentials = (state: RootState) => state.auth;

export const selectSettings = (state: RootState) => state.settings;
