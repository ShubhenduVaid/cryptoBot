/**
 *  timer to query api
 *  interval * seconds * minutes
 */
const interval: number = 15 * 1000 * 60;

/**
 *  currency configs
 */
// TBD buying via crypto
const storeConfig = {
  gbp: {
    balance: 1000,
    purchaseCoeff: { 10: 25, 20: 50, 30: 75, 40: 100 }, // priceDiff : buy amount
  },
  btc: {
    balance: 0,
    history: [],
    sellCoeff: { 10: 0.25, 20: 0.5, 30: 0.75, 40: 1 }, // priceDiff : % amount
  },
  eth: {
    balance: 0,
    history: [],
    sellCoeff: { 10: 0.25, 20: 0.5, 30: 0.75, 40: 1 }, // priceDiff : % amount
  },
};

/**
 *  storage limit
 *  interval = 1 hour = 15 minutes * 4
 */
const dataLimit: number = 10 * 4; // hours * interval

export { interval, storeConfig, dataLimit };
