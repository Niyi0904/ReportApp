import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/authSlice";
import onboardingReducer from "./features/onboarding/onboardingSlice"
import tenantReducer from "./features/tenant/tenantSlice"
import uiReducer from "./features/ui/uiSlice"

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

// const persistedAuthReducer = persistReducer(
//   authPersistConfig,
//   authReducer
// );

export const store = configureStore({
  reducer: {
    auth: authReducer, // persistedAuthReducer,
    onboarding: onboardingReducer,
    tenant: tenantReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

// export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
