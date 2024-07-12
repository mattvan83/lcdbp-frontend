import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StringExpressionOperatorReturningString } from "mongoose";

export type UserState = {
  value: {
    token: string | null;
    username: string | null;
    activeKey: string;
  };
};

export type LoginPayload = {
  token: string;
  username: string;
};

const initialState: UserState = {
  value: { token: null, username: null, activeKey: "home" },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<LoginPayload>) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },
    logout: (state: UserState) => {
      state.value.token = null;
      state.value.username = null;
    },
    updateActiveKey: (state: UserState, action: PayloadAction<string>) => {
      state.value.activeKey = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateActiveKey } = UserSlice.actions;
export default UserSlice.reducer;
