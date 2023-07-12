import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export const setAuthCredentials = createAsyncThunk(
  "auth/setAuthCredentials",
  async (user: User) => {
    const uid = user.uid;
    const token = await user.getIdToken();
    localStorage.setItem("uid", uid);
    localStorage.setItem("token", token);
    return { uid, token };
  },
);

export const clearAuthCredentials = createAsyncThunk(
  "auth/clearAuthCredentials",
  async () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
  },
);

interface AuthSlice {
  uid: string | null;
  token: string | null;
}

const initialState: AuthSlice = {
  uid: localStorage.getItem("uid"),
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setAuthCredentials.fulfilled, (_, { payload }) => {
      return payload;
    });
    builder.addCase(clearAuthCredentials.fulfilled, (state) => {
      state.uid = null;
      state.token = null;
    });
  },
});

export default authSlice.reducer;
