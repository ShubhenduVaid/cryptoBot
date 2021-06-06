import { cryptoType } from "../types";

const isTransactionProfitable = (state: cryptoType) => {
  // if n >< n-1 by coeff[0] buy/sell
  const projectionLength = state.projection.length;
  const historyAvgLength = state.historyAverage.length;
  const currProj = state.projection[projectionLength - 1];
  const prevProj = state.projection[projectionLength - 2];
  const currHist = state.historyAverage[historyAvgLength - 1];
  const prevHist = state.historyAverage[historyAvgLength - 2];
  const coeff = Number(Object.keys(state.coeff)[0]);
  state.sellDiff = 0;
  state.buyDiff = 0;
  if (currProj > prevProj) {
    if (currHist - prevHist >= coeff) {
      // sell
      state.sellDiff = Number((currHist - prevHist).toFixed(2));
    }
  } else if (currProj < prevProj && prevHist - currHist >= coeff) {
    // buy
    state.buyDiff = Number((prevHist - currHist).toFixed(2));
  } else {
    state.sellDiff = 0;
    state.buyDiff = 0;
  }
};

const buyCrypto = (state: cryptoType) => {};

const sellCrypto = (state: cryptoType) => {};

export { isTransactionProfitable };
