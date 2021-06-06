import fs from "fs";

import { getBTC } from "./ticker";
import store, { Actions, RootState, Selectors } from "./redux";
import { interval } from "./config";

let currState: RootState;
const stream = fs.createWriteStream("./ledger.txt", { flags: "a" });

setInterval(() => {
  const unsubscribe = store.subscribe(() => {
    try {
      console.log("Price average :: ", store.getState().btc.historyAverage);
      console.log("Projection :: ", store.getState().btc.projection);
      console.log("Buy Diff ::", store.getState().btc.buyDiff);
      console.log("Sell Diff :: ", store.getState().btc.sellDiff);
      console.log("BTC balance :: ", store.getState().btc.balance);
      console.log("GBP balance :: ", store.getState().gbp.balance);
      unsubscribe();
    } catch (error) {
      console.error(error);
      unsubscribe();
    }
  });
}, interval);

const startBot = async () => {
  try {
    let count = 0;
    const btc = await getBTC();
    store.dispatch(Actions.storeBTCPrice(btc));
    const unsubscribe = store.subscribe(() => {
      try {
        count++;
        const prevState = currState;
        currState = store.getState();
        if (prevState !== currState && count === 1) {
          const buyDiff = Selectors.getBTCBuyDiff(store.getState());
          const sellDiff = Selectors.getBTCSellDiff(store.getState());
          if (buyDiff > 0) {
            buyRequest(buyDiff);
          } else if (sellDiff > 0) {
            sellRequest(sellDiff);
          }
        } else {
          unsubscribe();
        }
      } catch (error) {
        unsubscribe();
        console.error(error);
      }
    });
  } catch (error) {
    console.error("ERROR", error);
  }
};

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

(async () => {
  await startBot();
  setInterval(async () => {
    await startBot();
  }, interval);
})();
