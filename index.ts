import { getBTC } from "./ticker";
import store, { Actions, RootState, Selectors } from "./redux";
import { interval } from "./config";
import { buyRequest, sellRequest } from "./utils";

let currState: RootState;

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

(async () => {
  await startBot();
  setInterval(async () => {
    await startBot();
  }, interval);
})();
