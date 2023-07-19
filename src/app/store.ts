import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import authReducer from "../pages/Login/authSlice";
import settingsReducer from "../pages/Home/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
