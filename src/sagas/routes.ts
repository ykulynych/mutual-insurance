import { SagaIterator } from 'redux-saga'
import { select, spawn, take } from 'redux-saga/effects'
import { Routes } from '../pages/routes/types'

const routesMap: { [key: string]: () => SagaIterator } = {
  // [Routes.HOME]: home,
}

export function* routes() {
  const initialRoute = yield select<any>(state => state.route)
  if (routesMap[initialRoute]) {
    yield spawn(routesMap[initialRoute])
  }
  while (true) {
    const { type } = yield take(Object.keys(routesMap))
    yield spawn(routesMap[type])
  }
}
