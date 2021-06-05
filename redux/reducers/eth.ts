import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { dataLimit, storeConfig } from "../../config";

type ethState = {
  balance: number;
  history: number[];
  sellCoeff: Record<number, number>;
};

const initialState: ethState = {
  ...storeConfig.eth,
};

const ethSlice = createSlice({
  name: "eth",
  initialState,
  reducers: {
    storeETHPrice: (state, action: PayloadAction<number>) => {
      if (state.history.length >= dataLimit) {
        state.history.splice(0, 1);
      }
      state.history.push(action.payload);
    },
  },
});

export const { storeETHPrice } = ethSlice.actions;
export default ethSlice.reducer;
