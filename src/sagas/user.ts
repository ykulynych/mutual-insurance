import { Effect, call, select, put, getContext, takeEvery } from 'redux-saga/effects'
import * as Actions from '../actions'
import { Profile } from 'src/types'
import { Action } from 'typescript-fsa'
import * as User from '../contracts/User.json'

// Load User contract

function canLoadUserContract(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'UserRegistry') ||
    (payload.type === 'EVENT_FIRED' && payload.name === 'UserRegistry' && payload.event.event === 'UserRegistered')
}

function getUserContract(drizzle: any, account: any, UserRegistryContract: any): boolean {
  return UserRegistryContract.methods.me().call()
    .then((me: string) => {
        if (me === '0x0000000000000000000000000000000000000000') {
          return false
        }
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
    .catch((error: string) => {
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

// Init User Profile

function canInitUserProfile(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'User')
}

function getUserProfile(UserContract: any): Profile | string {
  return UserContract.methods.getProfileInfo().call()
    .then((profile: Profile) => ({ profile }))
    .catch((error: string) => ({ error }))
}

function* initUserProfile(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  const { profile, error } = yield call(getUserProfile, drizzle.contracts.User)

  if (profile) {
    yield put(Actions.initProfile(profile))
  } else {
    console.error(error)
  }
}

// Get updated User profile

function canGetUserProfileUpdate(payload: any): boolean {
  return (payload.type === 'EVENT_FIRED' && payload.name === 'User' && payload.event.event === 'UserProfileUpdated')
}

function* getUserProfileUpdate(payload: any): IterableIterator<Effect> {
  yield put(Actions.initProfile(payload.event.returnValues))
}

// Update User profile

function* updateUserProfile({ payload }: Action<Profile>): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.User.methods.setProfileInfo(
    payload.name,
    payload.city,
    payload.gender,
    Date.parse(payload.birthDate)
  ).send()
}

// Register User
function* registerUser({ payload }: Action<Profile>): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.UserRegistry.methods.register(
    payload.name,
    payload.city,
    payload.gender,
    Date.parse(payload.birthDate)
  ).send()
}

// Check for compensation
function canCheckForCompensation(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'InsuranceFund')
}

function checkForCompensation(InsuranceFundContract: any): boolean {
  return InsuranceFundContract.methods.checkCompensation().call()
    .then((isCompensation: boolean) => ({ isCompensation }))
    .catch((error: string) => ({ error }))
}

function* canWithdrawCompensation(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  const { isCompensation, error } = yield call(checkForCompensation, drizzle.contracts.InsuranceFund)

  if (isCompensation) {
    yield put(Actions.canWithdrawCompensation({}))
  } else {
    console.error(error)
  }
}

// Withdraw money
function* withdrawCompensation(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.InsuranceFund.methods.withdrawCompensation().send()
  yield put(Actions.gotCompensation({}))
}

export function* user(): IterableIterator<Effect> {
  yield takeEvery(canLoadUserContract, loadUserContract)
  yield takeEvery(canInitUserProfile, initUserProfile)
  yield takeEvery(canGetUserProfileUpdate, getUserProfileUpdate)
  yield takeEvery(Actions.updateProfile, updateUserProfile)
  yield takeEvery(Actions.register, registerUser)
  yield takeEvery(Actions.withdrawCompensation, withdrawCompensation)
  yield takeEvery(canCheckForCompensation, canWithdrawCompensation)
}