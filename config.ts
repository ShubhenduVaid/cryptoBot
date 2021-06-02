/**
 *  timer to query api
 *  interval * seconds * minutes
 */
const interval: number = 15 * 1000 * 1000;

/**
 *  currency configs
 */
const storeConfig = {
  myGBP: {
    balance: 1000,
    purchaseCoeff: { 10: 25, 20: 50, 30: 75, 40: 100 }, // priceDiff : buy amount
  },
  myBTC: {
    balance: 0,
    sellCoeff: { 10: 0.25, 20: 0.5, 30: 0.75, 40: 1 }, // priceDiff : % amount
  },
  myETH: {
    balance: 0,
    sellCoeff: { 10: 0.25, 20: 0.5, 30: 0.75, 40: 1 }, // priceDiff : % amount
  },
};

/**
 *  storage limit
 */
const dataLimit: number = 10 * 4; // hours * interval

export { interval, storeConfig, dataLimit };
