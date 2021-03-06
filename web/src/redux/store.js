import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import history from "./history";

// import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
import { serverEvents } from "./client";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["api"]
};

// const loggerMiddleware = createLogger();
const persistedReducer = persistReducer(persistConfig, reducers);
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f;

// const middlewares = [thunkMiddleware, loggerMiddleware];
const middlewares = [thunkMiddleware, routerMiddleware(history)];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = compose(
  ...enhancers,
  devTools
);

export const store = createStore(persistedReducer, composedEnhancers);
export const persistor = persistStore(store);

serverEvents(store);
