import { getBTC, getETH } from "./ticker";
import store, { Actions, Selectors } from "./redux";
import { interval } from "./config";

setInterval(() => {
  store.subscribe(() => {
    try {
      const btcHistory = Selectors.getBTCHistory(store.getState());
      const ethHistory = Selectors.getETHHistory(store.getState());
      console.log(btcHistory, ethHistory);
    } catch (error) {
      console.error(error);
    }
  });
}, interval);

const startBot = async () => {
  try {
    const btc = await getBTC();
    const eth = await getETH();
    store.dispatch(Actions.storeBTCPrice(btc));
    store.dispatch(Actions.storeETHPrice(eth));
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await startBot();
  setInterval(async () => {
    await startBot();
  }, interval);
})();
