import { RootState } from "../";

const getGBPBalance = (state: RootState) => state.gbp.balance;
const getGBPPurchaseCoeff = (state: RootState) => state.gbp.coeff;

export { getGBPBalance, getGBPPurchaseCoeff };
