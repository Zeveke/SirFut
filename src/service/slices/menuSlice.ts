import { createSlice } from "@reduxjs/toolkit";
import { IHeaderMenu } from "../types";

const initialState: IHeaderMenu = {
  isMenuOpen: false,
};

const headerMenuSlice = createSlice({
  name: "headerMenu",
  initialState,
  reducers: {
    openHeaderMenu(state) {
      state.isMenuOpen = true;
    },
    closeHeaderMenu(state) {
      state.isMenuOpen = false;
    },
  },
});

export const { openHeaderMenu, closeHeaderMenu } = headerMenuSlice.actions;

export default headerMenuSlice.reducer;
