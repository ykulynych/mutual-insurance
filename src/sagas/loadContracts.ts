import { Effect, call, select, getContext, takeEvery } from 'redux-saga/effects'
import * as User from '../contracts/User.json'
import * as Policy from '../contracts/Policy.json'

// User Contract

function canLoadUserContract(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'UserRegistry') ||
    (payload.type === 'EVENT_FIRED' && payload.name === 'UserRegistry' && payload.event.event === 'UserRegistered')
}

function getUserContract(drizzle: any, account: any, UserRegistryContract: any): boolean {
  return UserRegistryContract.methods.me().call()
    .then((me: any) => {
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

// Policy Contract

function canLoadPolicyContract(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'User') ||
    (payload.type === 'EVENT_FIRED' && payload.name === 'User' && payload.event.event === 'PolicyCreated')
}

function getPolicyContract(drizzle: any, account: any, UserContract: any): boolean {
  return UserContract.methods.getPolicy().call()
    .then((policy: any) => {
        var contractConfig = {
          contractName: 'Policy',
          web3Contract: new drizzle.web3.eth.Contract(
            Policy.abi,
            policy,
            { from: account, data: Policy.deployedBytecode }
          )
        }
        drizzle.addContract(contractConfig, ['InsuredEvent', 'PolicyCancelled', 'PolicyFinished', 'PremiumPaid'])
        return true
      }
    )
    .catch((error: any) => {
      console.error(error)
      return false
    })
}

function* loadPolicyContract(): IterableIterator<Effect> {
  const account = yield select<any>(state => state.accounts[0])
  const drizzle = yield getContext('drizzle')
  const res = yield call(getPolicyContract, drizzle, account, drizzle.contracts.User)
  console.log('Load Policy contract', res)
}

export function* loadContracts(): IterableIterator<Effect> {
  yield takeEvery(canLoadUserContract, loadUserContract)
  yield takeEvery(canLoadPolicyContract, loadPolicyContract)
}
