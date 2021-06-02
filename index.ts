import { getBTC, getETH } from "./ticker";
import { genericAction } from "./store";
import { interval } from "./config";

const startBot = async () => {
  const btc = await getBTC();
  const eth = await getETH();
  genericAction({ type: "btc", payload: btc });
  genericAction({ type: "eth", payload: eth });
};

(async () => {
  await startBot();
  setInterval(async () => {
    await startBot();
  }, interval);
})();
