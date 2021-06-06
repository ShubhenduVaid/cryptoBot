import { RootState } from "./redux";

/**
 *  timer to query api
 *  interval * seconds * minutes
 */
const interval = 2 * 1000 * 60;

const coeff = {
  "4": 4,
  "20": 15,
  "35": 30,
  "50": 50,
  "70": 70,
  "100": 100,
  "200": 250,
  "500": 500,
  "1000": 1000,
};

/**
 *  currency configs
 */
// TBD buying via crypto
const storeConfig: RootState = {
  gbp: {
    type: "gbp",
    balance: 1000,
    coeff, // priceDiff : currency amount
  },
  btc: {
    type: "btc",
    balance: 0,
    history: [],
    historyAverage: [],
    projection: [],
    coeff, // crypto price Diff : currency amount
    buyDiff: 0,
    sellDiff: 0,
  },
  eth: {
    type: "eth",
    balance: 0,
    history: [],
    historyAverage: [],
    projection: [],
    coeff, // crypto price Diff : currency amount,
    buyDiff: 0,
    sellDiff: 0,
  },
};

/**
 * 1 hr = 15 min * 4
 */
const averageSlotLength = 4;

/**
 * hours
 * storage limit for history average
 */
const historyAvgDataLimit = 10;

/**
 *  storage limit for history
 */
const historyDataLimit = historyAvgDataLimit * averageSlotLength; // hours * interval

export {
  interval,
  storeConfig,
  historyDataLimit,
  averageSlotLength,
  historyAvgDataLimit,
};
