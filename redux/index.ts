import store, { RootState, AppDispatch } from "./store";
import { storeBTCPrice } from "./reducers/btc";
import { storeETHPrice } from "./reducers/eth";
import { updateGBPBalance } from "./reducers/gbp";
import { getBTCBalance, getBTCHistory, getBTCSellCoeff } from "./accessor/btc";
import { getETHBalance, getETHHistory, getETHSellCoeff } from "./accessor/eth";
import { getGBPBalance, getGBPPurchaseCoeff } from "./accessor/gbp";

const Actions = {
  storeBTCPrice,
  storeETHPrice,
  updateGBPBalance,
};

const Selectors = {
  getBTCBalance,
  getBTCHistory,
  getBTCSellCoeff,
  getETHBalance,
  getETHHistory,
  getETHSellCoeff,
  getGBPBalance,
  getGBPPurchaseCoeff,
};

export { RootState, AppDispatch, Actions, Selectors };
export default store;
