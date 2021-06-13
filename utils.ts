import fs from "fs";

import store, { Actions, Selectors } from "./redux";

fs.writeFile("./ledger.txt", "", () => {});
const stream = fs.createWriteStream("./ledger.txt", { flags: "a" });

const buyRequest = (diff: number) => {
  const gbpCoeff = Selectors.getGBPPurchaseCoeff(store.getState());
  const gbpBalance = Selectors.getGBPBalance(store.getState());
  const btcBalance = Selectors.getBTCBalance(store.getState());
  const coeffList = Object.keys(gbpCoeff).filter(
    (coeff) => Number(coeff) < diff
  );
  const coeff = coeffList[coeffList.length - 1];
  let buyAmount = gbpCoeff[coeff as string];
  if (gbpBalance > 0) {
    if (gbpBalance < buyAmount) {
      buyAmount = gbpBalance;
    }
    store.dispatch(Actions.decrementGBP(buyAmount));
    const lastBTCPricelist = Selectors.getBTCHistory(store.getState());
    const lastBTCPrice = lastBTCPricelist[lastBTCPricelist.length - 1];
    const btcToBuy = buyAmount / lastBTCPrice;
    store.dispatch(Actions.incrementBTC(btcToBuy));
    writeLogs(
      `Bought BTC with GBP. GBP ${buyAmount} spent. BTC ${btcToBuy} bought. GBP balance ${
        gbpBalance - buyAmount
      }. BTC balance ${btcBalance + btcToBuy}`
    );
  } else {
    writeLogs(
      `Low GBP balance. GBP ${buyAmount} needed. Have GBP ${gbpBalance}.`
    );
  }
};

const sellRequest = (diff: number) => {
  const btcCoeff = Selectors.getBTCPurchaseCoeff(store.getState());
  const btcBalance = Selectors.getBTCBalance(store.getState());
  const gbpBalance = Selectors.getGBPBalance(store.getState());
  const coeffList = Object.keys(btcCoeff).filter(
    (coeff) => Number(coeff) < diff
  );
  const coeff = coeffList[coeffList.length - 1];
  let sellAmount = btcCoeff[coeff as string];
  const lastBTCPricelist = Selectors.getBTCHistory(store.getState());
  const lastBTCPrice = lastBTCPricelist[lastBTCPricelist.length - 1];
  let btcToSell = sellAmount / lastBTCPrice;
  if (btcBalance > 0) {
    if (btcBalance < btcToSell) {
      btcToSell = btcBalance;
      sellAmount = btcToSell * lastBTCPrice;
    }
    store.dispatch(Actions.incrementtGBP(sellAmount));
    store.dispatch(Actions.decrementtBTC(btcToSell));
    writeLogs(
      `Sold BTC for GBP. BTC ${btcToSell} sold. GBP ${sellAmount} gained. GBP balance ${
        gbpBalance + sellAmount
      }. BTC balance ${btcBalance - btcToSell}`
    );
  } else {
    writeLogs(
      `Low BTC balance. BTC ${btcToSell} needed. Have BTC ${btcBalance}.`
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
