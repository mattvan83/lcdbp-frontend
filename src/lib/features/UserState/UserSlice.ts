import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    token: string | null;
    username: string | null;
    firstname: string | null;
    activeKey: string;
  };
};

export type LoginPayload = {
  token: string;
  username: string;
  firstname: string;
};

const initialState: UserState = {
  value: { token: null, username: null, firstname: null, activeKey: "home" },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<LoginPayload>) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
    },
    logout: (state: UserState) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
    },
    updateActiveKey: (state: UserState, action: PayloadAction<string>) => {
      state.value.activeKey = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateActiveKey } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
