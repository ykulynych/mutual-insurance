import { Effect, call, put, getContext, takeEvery } from 'redux-saga/effects'
import * as Actions from '../actions'

// Set Fund data

function canSetFundData(payload: any): boolean {
  return (payload.type === 'CONTRACT_INITIALIZED' && payload.name === 'InsuranceFund')
}

function getFundData(InsuranceFundContract: any): any {
  return InsuranceFundContract.methods.getFund().call()
    .then((fund: any) => ({ fund }))
    .catch((fError: any) => ({ fError }))
}

function getCompensationsData(InsuranceFundContract: any): any {
  return InsuranceFundContract.methods.getCompensationsPaid().call()
    .then((compensations: any) => ({ compensations }))
    .catch((cError: any) => ({ cError }))
}

function* setFundData(): IterableIterator<Effect> {
  const drizzle = yield getContext('drizzle')
  const { fund, fError } = yield call(getFundData, drizzle.contracts.InsuranceFund)

  if (fund) {
    yield put(Actions.setFund(fund))
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

export function* insuranceFund(): IterableIterator<Effect> {
  yield takeEvery(canSetFundData, setFundData)
  yield takeEvery(canUpdateFundData, updateFundData)
}
