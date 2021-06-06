import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { storeConfig } from "../../config";
import { cryptoType } from "../";
import { setCryptoAvgHistory, setCryptoHistory } from "../utils";

const initialState: cryptoType = {
  ...storeConfig.btc,
};

const btcSlice = createSlice({
  name: "btc",
  initialState,
  reducers: {
    storeBTCPrice: (state, action: PayloadAction<number>) => {
      setCryptoHistory(state, action);
      setCryptoAvgHistory(state);
    },
    incrementBTC: (state, action: PayloadAction<number>) => {
      state.balance = state.balance + action.payload;
      console.log(`BTC ${action.payload} added. Balance ${state.balance}`);
    },
    decrementtBTC: (state, action: PayloadAction<number>) => {
      state.balance = state.balance - action.payload;
      console.log(`BTC ${action.payload} spent. Balance ${state.balance}`);
    },
  },
});

export const { storeBTCPrice, incrementBTC, decrementtBTC } = btcSlice.actions;
export default btcSlice.reducer;
