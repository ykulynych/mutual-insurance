import { Effect, call, select, put, getContext, takeEvery } from 'redux-saga/effects'
import * as Policy from '../contracts/Policy.json'
import * as Actions from '../actions'

// Load Policy Contract

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

// Create policy
function* createPolicy({ payload }: any): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.User.methods.createPolicy(...payload).send()
}

// Init Policy
function canInitPolicy(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'Policy')
}

function getPolicy(PolicyContract: any): any {
  return PolicyContract.methods.getPolicyInfo().call()
    .then((policy: any) => ({ policy }))
    .catch((error: any) => ({ error }))
}

function* initPolicy(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  const { policy, error } = yield call(getPolicy, drizzle.contracts.Policy)

  if (policy) {
    yield put(Actions.initPolicy(policy))
  } else {
    console.error(error)
  }
}

export function* policySaga(): IterableIterator<Effect> {
  yield takeEvery(canLoadPolicyContract, loadPolicyContract)
  yield takeEvery(Actions.createPolicy, createPolicy)
  yield takeEvery(canInitPolicy, initPolicy)
}