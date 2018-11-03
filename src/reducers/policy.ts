import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as Actions from '../actions'
import { Policy } from 'src/types'

const initState = (): Policy => ({
  startTime: '',
  endTime: '',
  timeOfNextPayement: '',
  premium: 0,
  compensation: 0
})

export const policy = reducerWithInitialState<Policy>(
  initState()
)  
  .case(Actions.initPolicy, (state, policy) => ({
    ...state,
    startTime: new Date(parseInt(policy.startTime, 10)).toISOString().slice(0, 10),
    endTime: new Date(parseInt(policy.endTime, 10)).toISOString().slice(0, 10),
    timeOfNextPayement: new Date(parseInt(policy.timeOfNextPayement, 10)).toISOString().slice(0, 10),
    premium: policy.premium,
    compensation: policy.compensation
  }))
  .case(Actions.updateTimeOfNextPayement, (state, timeOfNextPayement) => ({
    ...state,
    timeOfNextPayement: new Date(parseInt(timeOfNextPayement, 10)).toISOString().slice(0, 10),
  }))
  .case(Actions.submitCancelledPolicy, initState)