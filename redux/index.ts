import store from "./store";
import { storeBTCPrice, incrementBTC, decrementtBTC } from "./reducers/btc";
import { storeETHPrice } from "./reducers/eth";
import { incrementtGBP, decrementGBP } from "./reducers/gbp";
import {
  getBTCBalance,
  getBTCHistory,
  getBTCPurchaseCoeff,
  getBTCBuyDiff,
  getBTCSellDiff,
} from "./accessor/btc";
import { getETHBalance, getETHHistory, getETHSellCoeff } from "./accessor/eth";
import { getGBPBalance, getGBPPurchaseCoeff } from "./accessor/gbp";
import { RootState, AppDispatch, cryptoType, currencyType } from "./types";

const Actions = {
  storeBTCPrice,
  incrementBTC,
  decrementtBTC,
  storeETHPrice,
  incrementtGBP,
  decrementGBP,
};

const Selectors = {
  getBTCBalance,
  getBTCHistory,
  getBTCPurchaseCoeff,
  getBTCBuyDiff,
  getBTCSellDiff,
  getETHBalance,
  getETHHistory,
  getETHSellCoeff,
  getGBPBalance,
  getGBPPurchaseCoeff,
};

export { RootState, AppDispatch, Actions, Selectors, cryptoType, currencyType };
export default store;
