import { RootState } from "../";

const getBTCHistory = (state: RootState) => state.btc.history;
const getBTCBalance = (state: RootState) => state.btc.balance;
const getBTCSellCoeff = (state: RootState) => state.btc.sellCoeff;

export { getBTCBalance, getBTCHistory, getBTCSellCoeff };
