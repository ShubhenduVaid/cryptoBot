import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { dataLimit, storeConfig } from "../../config";

type btcState = {
  balance: number;
  history: number[];
  sellCoeff: Record<number, number>;
};

const initialState: btcState = {
  ...storeConfig.btc,
};

const btcSlice = createSlice({
  name: "btc",
  initialState,
  reducers: {
    storeBTCPrice: (state, action: PayloadAction<number>) => {
      if (state.history.length >= dataLimit) {
        state.history.splice(0, 1);
      }
      state.history.push(action.payload);
    },
  },
});

export const { storeBTCPrice } = btcSlice.actions;
export default btcSlice.reducer;
