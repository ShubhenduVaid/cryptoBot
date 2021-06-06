import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { storeConfig } from "../../config";
import { currencyType } from "../";

const initialState: currencyType = {
  ...storeConfig.gbp,
};

const gbpSlice = createSlice({
  name: "gbp",
  initialState,
  reducers: {
    decrementGBP: (state, action: PayloadAction<number>) => {
      state.balance = state.balance - action.payload;
      console.log(`GBP ${action.payload} spent. Balance ${state.balance}`);
    },
    incrementtGBP: (state, action: PayloadAction<number>) => {
      state.balance = state.balance + action.payload;
      console.log(`GBP ${action.payload} added. Balance ${state.balance}`);
    },
  },
});

export const { decrementGBP, incrementtGBP } = gbpSlice.actions;
export default gbpSlice.reducer;
