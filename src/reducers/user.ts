import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as Actions from '../actions'

const initState = (): any => ({
  isRegistered: false,
  hasPolicy: false,
  name: '',
  birthDate: '',
  city: '',
  gender: ''
})

export const user = reducerWithInitialState<any>(
  initState()
)  
  .case(Actions.initProfile, (state, data) => ({
    ...state,
    isRegistered: true,
    name: data.name,
    birthDate: new Date(parseInt(data.birthDate, 10)).toISOString().slice(0, 10),
    city: data.city,
    gender: data.gender
  }))
  .case(Actions.initPolicy, (state, data) => ({
    ...state,
    hasPolicy: true
  }))