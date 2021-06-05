import { RootState } from "../";

const getETHHistory = (state: RootState) => state.eth.history;
const getETHBalance = (state: RootState) => state.eth.balance;
const getETHSellCoeff = (state: RootState) => state.eth.sellCoeff;

export { getETHBalance, getETHHistory, getETHSellCoeff };
