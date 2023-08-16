import { createSlice } from "@reduxjs/toolkit";

interface userAuth {
  isAuthenticated: boolean;
  userName: string | null;
  _id?: string | null;
  role: string | null;
}

let isAuthenticated = false;
let userName;
let _id;
let role;
if (typeof window !== "undefined") {
  isAuthenticated = localStorage.getItem("authToken") ? true : false;
  userName = localStorage.getItem("userName") ? localStorage.getItem("userName") : "";
  _id = localStorage.getItem("_id") ? localStorage.getItem("_id") : "";
  role = localStorage.getItem("role") ? localStorage.getItem("role") : "";
}

const initialState: userAuth = {
  isAuthenticated: isAuthenticated,
  userName: userName || null,
  _id: _id || null,
  role: role || null,
};

const userAuth = createSlice({
  name: "userAuth",
  initialState: initialState,
  reducers: {
    loginAuth: (state, action) => {
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("userName", action.payload.name);
        localStorage.setItem("_id", action.payload._id);
        localStorage.setItem("role", action.payload.role);
      }
    },

    logoutAuth: (state) => {
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("_id");
        localStorage.removeItem("role");
      }
    },
  },
});

export const { loginAuth, logoutAuth } = userAuth.actions;
export default userAuth.reducer;
