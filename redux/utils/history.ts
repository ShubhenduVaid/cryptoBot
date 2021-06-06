import { PayloadAction } from "@reduxjs/toolkit";
import { isTransactionProfitable } from ".";

import {
  averageSlotLength,
  historyAvgDataLimit,
  historyDataLimit,
} from "../../config";
import { cryptoType } from "../types";

const setCryptoHistory = (state: cryptoType, action: PayloadAction<number>) => {
  if (state.history.length >= historyDataLimit) {
    state.history.splice(0, averageSlotLength);
  }
  state.history.push(action.payload);
};

const setCryptoAvgHistory = (state: cryptoType) => {
  const historyLength = state.history.length;
  if (
    historyLength > averageSlotLength - 1 &&
    historyLength % averageSlotLength === 0
  ) {
    if (state.historyAverage.length >= historyAvgDataLimit) {
      state.historyAverage.splice(0, 1);
    }
    const historyAccumulated = state.history
      .slice(historyLength - averageSlotLength, historyLength)
      .reduce((acc, curVal) => acc + curVal);
    const historyAverage = Number(
      (historyAccumulated / averageSlotLength).toFixed(2)
    );
    state.historyAverage.push(historyAverage);
    setProjection(state);
  }
};

const setProjection = (state: cryptoType) => {
  const historyAvgLength = state.historyAverage.length;
  if (historyAvgLength > 1) {
    if (state.projection.length >= historyAvgDataLimit - 1) {
      state.projection.splice(0, 1);
    }
    const curr = state.historyAverage[historyAvgLength - 1];
    const prev = state.historyAverage[historyAvgLength - 2];
    if (curr > prev) {
      state.projection.push(1);
    } else if (curr < prev) {
      state.projection.push(-1);
    } else {
      state.projection.push(0);
    }
    if (state.projection.length > 1 && (curr > prev || curr < prev)) {
      isTransactionProfitable(state);
    }
  }
};

export { setCryptoAvgHistory, setCryptoHistory };
