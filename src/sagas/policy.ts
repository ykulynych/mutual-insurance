import { Effect, call, select, put, getContext, takeEvery } from 'redux-saga/effects'
import * as Policy from '../contracts/Policy.json'
import * as Actions from '../actions'
import { Policy as PolicyType, PolicyShort } from 'src/types/index.js'
import { Action } from 'typescript-fsa'

// Load Policy Contract
function canLoadPolicyContract(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'User') ||
    (payload.type === 'EVENT_FIRED' && payload.name === 'User' && payload.event.event === 'PolicyCreated')
}

function getPolicyContract(drizzle: any, account: any, UserContract: any): boolean {
  return UserContract.methods.getPolicy().call()
    .then((policy: PolicyType) => {
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
    .catch((error: string) => {
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
function* createPolicy({ payload }: Action<PolicyShort>): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.User.methods.createPolicy(
    Date.now(),
    payload.duration * 31557600000, // ms in year
    (payload.premium * 1e18).toString(),
    (payload.compensation * 1e18).toString()
  ).send()
}

// Init Policy
function canInitPolicy(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'Policy')
}

function getPolicy(PolicyContract: any): PolicyType | string {
  return PolicyContract.methods.getPolicyInfo().call()
    .then((policy: PolicyType) => ({ policy }))
    .catch((error: string) => ({ error }))
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

// Pay premium
function* payPremium({ payload }: Action<number>): IterableIterator<Effect> {
  const account = yield select<any>(state => state.accounts[0])
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.User.methods.payPremium().send({
    from: account,
    value: drizzle.web3.utils.toWei(payload.toString(), 'ether')}
  )
}

// Update time of next payement
function canUpdateTimeOfNextPayement(payload: any): boolean {
  return payload.type === 'EVENT_FIRED' && payload.name === 'Policy' && payload.event.event === 'PremiumPaid'
}

function* updateTimeOfNextPayement(payload: any): IterableIterator<Effect> {
  yield put(Actions.updateTimeOfNextPayement(payload.event.returnValues.timeOfNextPayement))
}

// Cancel policy
function* cancelPolicy(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.User.methods.cancelPolicy().send()
}

// Check if policy cancelled
function canSubmitCancelledPolicy(payload: any): boolean {
  return payload.type === 'EVENT_FIRED' && payload.name === 'Policy' && payload.event.event === 'PolicyCancelled'
}

function* submitCancelledPolicy(): IterableIterator<Effect> {
  yield put(Actions.submitCancelledPolicy({}))
}

// Report insurance event
function* reportEvent(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.User.methods.reportInsuredEvent().send()
}

// Check if compensation paid
function canSubmitReportedEvent(payload: any): boolean {
  return payload.type === 'EVENT_FIRED' &&
    payload.name === 'InsuranceFund' &&
    payload.event.event === 'CompensationPaid'
}

function* submitReportedEvent(payload: any): IterableIterator<Effect> {
  yield put(Actions.submitReportedEvent(payload.event.returnValues.compensation))
}

export function* policySaga(): IterableIterator<Effect> {
  yield takeEvery(canLoadPolicyContract, loadPolicyContract)
  yield takeEvery(Actions.createPolicy, createPolicy)
  yield takeEvery(canInitPolicy, initPolicy)
  yield takeEvery(Actions.payPremium, payPremium)
  yield takeEvery(canUpdateTimeOfNextPayement, updateTimeOfNextPayement)
  yield takeEvery(Actions.cancelPolicy, cancelPolicy)
  yield takeEvery(canSubmitCancelledPolicy, submitCancelledPolicy)
  yield takeEvery(Actions.reportEvent, reportEvent)
  yield takeEvery(canSubmitReportedEvent, submitReportedEvent)
}