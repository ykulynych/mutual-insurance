import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { generateContractsInitialState, drizzleReducers, Drizzle } from 'drizzle'
import drizzleOptions from './drizzleOptions'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import reducers from './reducers'
import routes from './routes'

const {
  reducer: routeReducer,
  middleware: routeMiddleware,
  enhancer: routeEnhancer,
} = routes

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  location: routeReducer,
  ...drizzleReducers,
  ...reducers
})

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  sagaMiddleware,
  routeMiddleware
]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(require('redux-logger').default)
}

const initialState = {
  contracts: generateContractsInitialState(drizzleOptions),
}

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    routeEnhancer,
    applyMiddleware(...middleware)
  )
)

export const drizzle = new Drizzle(drizzleOptions, store)

sagaMiddleware.setContext({ drizzle })
sagaMiddleware.run(sagas)
