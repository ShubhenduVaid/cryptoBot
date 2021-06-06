import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { storeConfig } from "../../config";
import { cryptoType } from "../";
import {
  isTransactionProfitable,
  setCryptoAvgHistory,
  setCryptoHistory,
} from "../utils";

const initialState: cryptoType = {
  ...storeConfig.eth,
};

const ethSlice = createSlice({
  name: "eth",
  initialState,
  reducers: {
    storeETHPrice: (state, action: PayloadAction<number>) => {
      setCryptoHistory(state, action);
      setCryptoAvgHistory(state);
    },
  },
});

export const { storeETHPrice } = ethSlice.actions;
export default ethSlice.reducer;
