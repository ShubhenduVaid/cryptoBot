import { RootState } from "../";

const getBTCHistory = (state: RootState) => state.btc.history;
const getBTCBalance = (state: RootState) => state.btc.balance;
const getBTCPurchaseCoeff = (state: RootState) => state.btc.coeff;
const getBTCHistoryAverage = (state: RootState) => state.btc.historyAverage;
const getBTCProjection = (state: RootState) => state.btc.projection;
const getBTCBuyDiff = (state: RootState) => state.btc.buyDiff;
const getBTCSellDiff = (state: RootState) => state.btc.sellDiff;

export {
  getBTCBalance,
  getBTCHistory,
  getBTCPurchaseCoeff,
  getBTCHistoryAverage,
  getBTCProjection,
  getBTCBuyDiff,
  getBTCSellDiff,
};
