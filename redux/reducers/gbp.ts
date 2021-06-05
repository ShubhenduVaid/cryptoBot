import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { storeConfig } from "../../config";

type gbpState = {
  balance: number;
  purchaseCoeff: Record<number, number>;
};

const initialState: gbpState = {
  ...storeConfig.gbp,
};

const gbpSlice = createSlice({
  name: "gbp",
  initialState,
  reducers: {
    updateGBPBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const { updateGBPBalance } = gbpSlice.actions;
export default gbpSlice.reducer;
