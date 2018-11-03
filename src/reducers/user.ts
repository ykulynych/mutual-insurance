import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as Actions from '../actions'
import { User } from 'src/types'

const initState = (): User => ({
  isRegistered: false,
  hasPolicy: false,
  canWithdraw: false,
  name: '',
  birthDate: '',
  city: '',
  gender: ''
})

export const user = reducerWithInitialState<User>(
  initState()
)  
  .case(Actions.initProfile, (state, user) => ({
    ...state,
    isRegistered: true,
    name: user.name,
    birthDate: new Date(parseInt(user.birthDate as string, 10)).toISOString().slice(0, 10),
    city: user.city,
    gender: user.gender
  }))
  .case(Actions.initPolicy, (state) => ({
    ...state,
    hasPolicy: true
  }))
  .case(Actions.submitCancelledPolicy, (state) => ({
    ...state,
    hasPolicy: false
  }))
  .cases([Actions.submitReportedEvent, Actions.canWithdrawCompensation], (state) => ({
    ...state,
    canWithdraw: true,
    hasPolicy: false
  }))
  .case(Actions.gotCompensation, (state) => ({
    ...state,
    canWithdraw: false
  }))