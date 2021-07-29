import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authStatus: true,
    authState: "sign-in",
    loggedInId: "",
  },
  reducers: {
    updateState(state, action) {
      state.authState = "sign-up";
    },
    login(state, action) {
      state.authStatus = false;
      state.loggedInId = action.payload.id;
    },
    logout(state) {
      state.authStatus = true;
      state.loggedInId = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
