import { getBTC } from "./ticker";
import store, { Actions, RootState, Selectors } from "./redux";
import { interval } from "./config";
import { buyRequest, sellRequest } from "./utils";

let currState: RootState;

setInterval(() => {
  const unsubscribe = store.subscribe(() => {
    try {
      console.log(
        "Price average :: ",
        Selectors.getBTCHistoryAverage(store.getState())
      );
      console.log(
        "Projection :: ",
        Selectors.getBTCProjection(store.getState())
      );
      console.log("Buy Diff ::", Selectors.getBTCBuyDiff(store.getState()));
      console.log("Sell Diff :: ", Selectors.getBTCSellDiff(store.getState()));
      console.log("BTC balance :: ", Selectors.getBTCBalance(store.getState()));
      console.log("GBP balance :: ", Selectors.getGBPBalance(store.getState()));
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
