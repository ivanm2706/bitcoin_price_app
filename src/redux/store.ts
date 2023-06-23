import { configureStore, AnyAction } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer, { RootState } from './rootState';

type RootStateWithPersist = RootState & {
  _persist?: {
    version: number;
    rehydrated: boolean;
  };
};

const persistConfig = {
  key: 'reducer',
  storage,
};

const persistedReducer = persistReducer<RootStateWithPersist, AnyAction>(
  persistConfig,
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;

export default store;
