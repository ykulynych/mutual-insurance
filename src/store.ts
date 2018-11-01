import { createStore, applyMiddleware, compose } from "redux"
import reducer from "./reducer"

import { generateContractsInitialState } from "drizzle"
import drizzleOptions from "./drizzleOptions"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./rootSaga"
import logger from "redux-logger"

// Redux DevTools
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions),
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware, logger))
)

sagaMiddleware.run(rootSaga)

export default store
