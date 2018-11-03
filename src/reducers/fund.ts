import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as Actions from '../actions'
import { Fund } from 'src/types'

const initState = (): Fund => ({
  fund: 0,
  compensations: 0
})

export const fund = reducerWithInitialState<Fund>(
  initState()
)  
  .case(Actions.setFund, (state, fund) => ({
    ...state,
    fund: parseInt(fund, 10) / 1e18
  }))
  .case(Actions.setCompensations, (state, compensations) => ({
    ...state,
    compensations: parseInt(compensations, 10) / 1e18
  }))
  .case(Actions.updateFund, (state, premium) => ({
    ...state,
    fund: state.fund + parseInt(premium, 10) / 1e18
  }))
  .case(Actions.updateCompensations, (state, compensation) => ({
    ...state,
    compensations: state.compensations + parseInt(compensation, 10) / 1e18,
    fund: state.fund - parseInt(compensation, 10) / 1e18
  }))