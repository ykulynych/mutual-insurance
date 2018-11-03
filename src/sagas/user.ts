import { Effect, call, put, getContext, takeEvery } from 'redux-saga/effects'
import * as Actions from '../actions'

// Init User Profile

function canInitUserProfile(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'User')
}

function getUserProfile(UserContract: any): any {
  return UserContract.methods.getProfileInfo().call()
    .then((profile: any) => ({ profile }))
    .catch((error: any) => ({ error }))
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

function* updateUserProfile({ payload }: any): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.User.methods.setProfileInfo(...payload).send()
}

// Register User
function* registerUser(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  drizzle.contracts.UserRegistry.methods.register().send()
}

export function* user(): IterableIterator<Effect> {
  yield takeEvery(canInitUserProfile, initUserProfile)
  yield takeEvery(canGetUserProfileUpdate, getUserProfileUpdate)
  yield takeEvery(Actions.updateProfile, updateUserProfile)
  yield takeEvery(Actions.register, registerUser)
}