import { fork, Effect, all, getContext } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'

import { routes } from './routes'
import { loadContracts } from './loadContracts'
import { fund } from './fund'
import { user } from './user'
import { policySaga } from './policy'

export default function* sagas(): IterableIterator<Effect> {
  yield all(drizzleSagas.map(fork))
  yield fork(routes)
  yield fork(loadContracts)
  yield fork(fund)
  yield fork(user)
  yield fork(policySaga)
}
