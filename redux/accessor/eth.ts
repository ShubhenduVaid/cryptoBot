import { RootState } from "../";

const getETHHistory = (state: RootState) => state.eth.history;
const getETHBalance = (state: RootState) => state.eth.balance;
const getETHSellCoeff = (state: RootState) => state.eth.coeff;
const getETHHistoryAverage = (state: RootState) => state.eth.historyAverage;
const getETHProjection = (state: RootState) => state.eth.projection;

export {
  getETHBalance,
  getETHHistory,
  getETHSellCoeff,
  getETHHistoryAverage,
  getETHProjection,
};
