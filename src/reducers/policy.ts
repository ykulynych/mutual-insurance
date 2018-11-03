import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as Actions from '../actions'

const initState = (): any => ({
  startTime: '',
  endTime: '',
  premium: 0,
  compensation: 0,
  timeOfNextPayement: ''
})

export const policy = reducerWithInitialState<any>(
  initState()
)  
  .case(Actions.initPolicy, (state, data) => ({
    ...state,
    startTime: new Date(parseInt(data.startTime, 10)).toISOString().slice(0, 10),
    endTime: new Date(parseInt(data.endTime, 10)).toISOString().slice(0, 10),
    timeOfNextPayement: new Date(parseInt(data.endTime, 10)).toISOString().slice(0, 10),
    premium: data.premium,
    compensation: data.compensation
  }))