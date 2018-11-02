import { Effect, select } from 'redux-saga/effects'

export function* profile(): IterableIterator<Effect> {
  console.log('HI im profilin')
  const contracts = yield select<any>(state => state.contracts)
  console.log(contracts)
}
