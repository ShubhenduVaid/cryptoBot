import fs from "fs";

import store, { Actions, Selectors } from "./redux";

fs.writeFile("./ledger.txt", "", () => {});
const stream = fs.createWriteStream("./ledger.txt", { flags: "a" });

const buyRequest = (diff: number) => {
  const gbpCoeff = Selectors.getGBPPurchaseCoeff(store.getState());
  const gbpBalance = Selectors.getGBPBalance(store.getState());
  const coeffList = Object.keys(gbpCoeff).filter(
    (coeff) => Number(coeff) < diff
  );
  const coeff = coeffList[coeffList.length - 1];
  const buyAmount = gbpCoeff[coeff as string];
  if (gbpBalance > buyAmount) {
    store.dispatch(Actions.decrementGBP(buyAmount));
    const lastBTCPricelist = Selectors.getBTCHistory(store.getState());
    const lastBTCPrice = lastBTCPricelist[lastBTCPricelist.length - 1];
    const btcToBuy = buyAmount / lastBTCPrice;
    store.dispatch(Actions.incrementBTC(btcToBuy));
    writeLogs(
      `Bought BTC with GBP. GBP ${buyAmount} spent. BTC ${btcToBuy} bought.`
    );
  }
};

const sellRequest = (diff: number) => {
  const btcCoeff = Selectors.getBTCPurchaseCoeff(store.getState());
  const btcBalance = Selectors.getBTCBalance(store.getState());
  const coeffList = Object.keys(btcCoeff).filter(
    (coeff) => Number(coeff) < diff
  );
  const coeff = coeffList[coeffList.length - 1];
  const sellAmount = btcCoeff[coeff as string];
  const lastBTCPricelist = Selectors.getBTCHistory(store.getState());
  const lastBTCPrice = lastBTCPricelist[lastBTCPricelist.length - 1];
  const btcToSell = sellAmount / lastBTCPrice;
  if (btcBalance > btcToSell) {
    store.dispatch(Actions.incrementtGBP(sellAmount));
    store.dispatch(Actions.decrementtBTC(btcToSell));
    writeLogs(
      `Sold BTC for GBP. BTC ${btcToSell} sold. GBP ${sellAmount} gained.`
    );
  }
};

const writeLogs = (data: string) => {
  try {
    stream.write(data + "\n");
  } catch (error) {
    console.error("Write to file failed with error :: ", error);
  }
};

export { buyRequest, sellRequest };
