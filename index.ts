import { getBTC, getETH } from "./ticker";
import { genericAction } from "./store";
import { interval } from "./config";

const startEngine = async () => {
  const btc = await getBTC();
  const eth = await getETH();
  genericAction({ type: "btc", payload: btc });
  genericAction({ type: "eth", payload: eth });
};

(async () => {
  await startEngine();
  setInterval(async () => {
    await startEngine();
  }, interval);
})();
