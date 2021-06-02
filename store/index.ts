import { dataLimit, storeConfig } from "../config";

type StateType = {
  btc: string[];
  eth: string[];
};

const state: StateType = {
  btc: [],
  eth: [],
  ...storeConfig,
};

const reducer = ({ type, payload }: Action) => {
  switch (type) {
    case "btc":
      if (state.btc.length >= dataLimit) {
        state.btc.splice(0, 1);
      }
      state.btc.push(payload);
      break;

    case "eth":
      if (state.eth.length >= dataLimit) {
        state.eth.splice(0, 1);
      }
      state.eth.push(payload);

    default:
      console.log("STORE :: ", state);
      break;
  }
};

// Accessors

const getBtcAccesor = () => state.btc;

const getEthAccesor = () => state.eth;

// Actions
type Action = { type: string; payload: string };

const genericAction = (action: Action) => reducer(action);

export { genericAction, getBtcAccesor, getEthAccesor };
