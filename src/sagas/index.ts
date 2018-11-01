import { fork, Effect, all } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

import { routes } from './routes'

export default function* sagas(): IterableIterator<Effect> {
  yield all(drizzleSagas.map(fork))
  // yield fork(routes)
}
