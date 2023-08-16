import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface themeMode {
  themeMode: boolean;
  openSiderbarMenu: boolean;
}
const initialState: themeMode = {
  themeMode: true,
  openSiderbarMenu: false,
};

const stateVaribalesSlice = createSlice({
  name: "stateVaribales",
  initialState: initialState,
  reducers: {
    changeTheme: (state) => {
      state.themeMode = !state.themeMode;
    },

    changeOpenSiderbarMenu: (state) => {
      state.openSiderbarMenu = !state.openSiderbarMenu;
    },
  },
});

export const { changeTheme, changeOpenSiderbarMenu } = stateVaribalesSlice.actions;
export default stateVaribalesSlice.reducer;
