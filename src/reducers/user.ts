import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    token: string | null;
    username: string | null;
    activeKey: string | null;
  };
};

const initialState: UserState = {
  value: { token: null, username: null, activeKey: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // updateEmail: (state: UserState, action: PayloadAction<string>) => {
    //   state.value.email = action.payload;
    // },
  },
});

// export const { updateEmail } = userSlice.actions;
export default userSlice.reducer;
