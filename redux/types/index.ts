import store from "..";

type cryptoType = {
  type: string;
  balance: number;
  history: number[];
  historyAverage: number[];
  projection: number[];
  coeff: Record<string, number>;
  buyDiff: number;
  sellDiff: number;
};

type currencyType = {
  type: string;
  balance: number;
  coeff: Record<string, number>;
};

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { cryptoType, currencyType, RootState, AppDispatch };
