import { configureStore } from "@reduxjs/toolkit";
import btcReducer from "./reducers/btc";
import ethReducer from "./reducers/eth";
import gbpReducer from "./reducers/gbp";

const store = configureStore({
  reducer: {
    btc: btcReducer,
    eth: ethReducer,
    gbp: gbpReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
