import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as Actions from '../actions'

const initState = (): any => ({
  fund: 0,
  compensations: 0
})

export const insuranceFund = reducerWithInitialState<any>(
  initState()
)  
  .case(Actions.setFund, (state, data) => ({
    ...state,
    fund: parseInt(data, 10) / 1e18
  }))
  .case(Actions.setCompensations, (state, data) => ({
    ...state,
    compensations: parseInt(data, 10) / 1e18
  }))
  .case(Actions.updateFund, (state, data) => ({
    ...state,
    fund: state.fund + parseInt(data, 10) / 1e18
  }))
  .case(Actions.updateCompensations, (state, data) => ({
    ...state,
    compensations: state.copmensations + parseInt(data, 10) / 1e18,
    fund: state.fund - parseInt(data, 10) / 1e18
  }))