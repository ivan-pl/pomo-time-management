import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { AppThunk } from "../../app/store";
import { getSettings } from "../../services/firebase/getSettings";
import { setSettings as setSettingsApi } from "../../services/firebase/setSettings";

export interface SettingsSlice {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
}

const initialState: SettingsSlice = {
  longBreakInterval: 0,
  longBreakTime: 0,
  shortBreakTime: 0,
  workTime: 0,
};

const defaultSettings: SettingsSlice = {
  longBreakInterval: 4,
  longBreakTime: 15,
  shortBreakTime: 5,
  workTime: 25,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (_, { payload }: PayloadAction<SettingsSlice>) => {
      return payload;
    },
  },
});

export const fetchSettings = (): AppThunk => async (dispatch) => {
  try {
    const fetchedSettings = await getSettings();
    if (!fetchedSettings) {
      dispatch(setSettings(defaultSettings));
      setSettingsApi(defaultSettings);
      return;
    }
    dispatch(setSettings(fetchedSettings));
  } catch {
    dispatch(setSettings(defaultSettings));
  }
};

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
