import { configureStore } from "@reduxjs/toolkit";
import reducer from '../reducers/reducer';

const store = (props) => (
  configureStore({
    reducer,
    preloadedState: props,
    devTools: window.devToolsExtension ? window.devToolsExtension() : f => f
  })
)

export default store
