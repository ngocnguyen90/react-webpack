import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/reducer';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer,
  preloadedState: [],
  devTools: window.devToolsExtension
    ? window.devToolsExtension()
    : (f) => f,
});

// We use this store to allow axios middleware to access the store state
// without have circle dependency
window.bookingReduxStore = store;

export const persistor = persistStore(store);
