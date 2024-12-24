import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

// States
import CarbonfootprintReducer from "./state/carbon";
import PledgeReducer from "./state/pledge";

// Storage
import storage from "redux-persist/lib/storage";

const CarbonfootprintConfig = {
  key: "carbonfootprint-state",
  storage,
};

const PledgeConfig = {
  key: "pledge-state",
  storage,
}

const persistedCarbonfootprintReducer = persistReducer(CarbonfootprintConfig, CarbonfootprintReducer);
const persistedPledgeReducer = persistReducer(PledgeConfig, PledgeReducer);

export const store = configureStore({
  reducer: {
    carbon: persistedCarbonfootprintReducer,
    pledge: persistedPledgeReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: false
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;