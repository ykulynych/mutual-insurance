import { fork, Effect, all } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
import { routes } from './routes'
import { fund } from './fund'
import { user } from './user'
import { policySaga } from './policy'

export default function* sagas(): IterableIterator<Effect> {
  yield all(drizzleSagas.map(fork))
  yield fork(routes)
  yield fork(fund)
  yield fork(user)
  yield fork(policySaga)
}
