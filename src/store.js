import * as reduxModule from "redux";

import thunk from "redux-thunk";
import reducers from "./mRedux/reducers";
import { applyMiddleware, compose, createStore } from "redux";

reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default createStore(reducers, enhancer);