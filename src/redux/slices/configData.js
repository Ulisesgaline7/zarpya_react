import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  configData: null,
  language: "es",
  countryCode: "es",
  modules: [],
  landingPageData: null,
};

export const configDataSlice = createSlice({
  name: "config-data",
  initialState,
  reducers: {
    setConfigData: (state, action) => {
      state.configData = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    setModules: (state, action) => {
      state.modules = action.payload.map((item) => item);
    },
    setLandingPageData: (state, action) => {
      state.landingPageData = action.payload;
    },
  },
});

export const {
  setLandingPageData,
  setConfigData,
  setCountryCode,
  setLanguage,
  setModules,
} = configDataSlice.actions;

export default configDataSlice.reducer;