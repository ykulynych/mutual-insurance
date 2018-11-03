import { Effect, call, put, getContext, takeEvery } from 'redux-saga/effects'
import * as Actions from '../actions'

// Set Fund data

function canSetFundData(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'InsuranceFund')
}

function getFundData(InsuranceFundContract: any): string {
  return InsuranceFundContract.methods.getFund().call()
    .then((fFund: string) => ({ fFund }))
    .catch((fError: string) => ({ fError }))
}

function getCompensationsData(InsuranceFundContract: any): string {
  return InsuranceFundContract.methods.getCompensationsPaid().call()
    .then((compensations: string) => ({ compensations }))
    .catch((cError: string) => ({ cError }))
}

function* setFundData(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  const { fFund, fError } = yield call(getFundData, drizzle.contracts.InsuranceFund)

  if (fund) {
    yield put(Actions.setFund(fFund))
  } else {
    console.error(fError)
  }

  const { compensations, cError } = yield call(getCompensationsData, drizzle.contracts.InsuranceFund)

  if (compensations) {
    yield put(Actions.setCompensations(compensations))
  } else {
    console.error(cError)
  }
}

// Update Fund data

function canUpdateFundData(payload: any): boolean {
  return (payload.type === 'EVENT_FIRED' && payload.name === 'InsuranceFund' && payload.event.event === 'FundUpdated') ||
    (payload.type === 'EVENT_FIRED' && payload.name === 'InsuranceFund' && payload.event.event === 'CompensationPaid')
}

function* updateFundData(payload: any): IterableIterator<Effect> {
  if (payload.event.event === 'FundUpdated') {
    yield put(Actions.updateFund(payload.event.returnValues.value))
  } else {
    yield put(Actions.updateCompensations(payload.event.returnValues.compensation))
  }
}

export function* fund(): IterableIterator<Effect> {
  yield takeEvery(canSetFundData, setFundData)
  yield takeEvery(canUpdateFundData, updateFundData)
}
