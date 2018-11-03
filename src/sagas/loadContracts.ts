import { Effect, call, select, getContext, takeLatest } from 'redux-saga/effects'
import * as User from '../contracts/User.json'

// User Contract

function canLoadUserContract(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'UserRegistry') ||
    (payload.type === 'EVENT_FIRED' && payload.name === 'UserRegistry' && payload.event.event === 'UserRegistered')
}

function getUserContract(drizzle: any, account: any, UserRegistryContract: any): boolean {
  return UserRegistryContract.methods.me().call()
    .then((me: any) => {
        if (me === '0x0000000000000000000000000000000000000000') {
          return false
        }
        console.log('MEEE', me)
        var contractConfig = {
          contractName: 'User',
          web3Contract: new drizzle.web3.eth.Contract(
            User.abi,
            me,
            { from: account, data: User.deployedBytecode }
          )
        }
        drizzle.addContract(contractConfig, ['UserProfileUpdated', 'PolicyCreated'])
        return true
      }
    )
    .catch((error: any) => {
      console.error(error)
      return false
    })
}

function* loadUserContract(): IterableIterator<Effect> {
  const account = yield select<any>(state => state.accounts[0])
  const drizzle = yield getContext('drizzle')
  const res = yield call(getUserContract, drizzle, account, drizzle.contracts.UserRegistry)
  console.log('Load User contract', res)
}

export function* loadContracts(): IterableIterator<Effect> {
  yield takeLatest(canLoadUserContract, loadUserContract)
}
