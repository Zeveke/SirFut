import { createSlice } from "@reduxjs/toolkit";
import { ILang } from "../types";

const initialState: ILang = {
  currentLang: "RU",
};

const headerMenuSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLangEng(state) {
      state.currentLang = "EN";
    },
    toggleLangRu(state) {
      state.currentLang = "RU";
    },
  },
});

export const { toggleLangEng, toggleLangRu } = headerMenuSlice.actions;

export default headerMenuSlice.reducer;
